import puppeteer from 'puppeteer';
import { fork } from 'child_process';

// Устанавливаем общий таймаут для всех тестов в файле
jest.setTimeout(50000);

// Описываем группу тестов для e2e тестирования валидатора кредитных карт
describe('Credit Card Validator E2E Tests', () => {
  let browser;
  let serverProcess;
  const baseUrl = 'http://localhost:8080';

  // Функция, которая выполняется перед всеми тестами
  beforeAll(async () => {
    // Запускаем серверное приложение
    serverProcess = fork('e2e/e2e.server.js'); // Убедитесь, что путь правильный

    // Определяем, в каком режиме запускать браузер
    const isCI = process.env.CI === 'true';
    browser = await puppeteer.launch({
      headless: isCI, // Используем headless режим в CI
      slowMo: isCI ? 0 : 200, // Замедление только для локальной разработки
      args: isCI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [], // Аргументы для CI/CD
    });
  });

  // Функция, которая выполняется после всех тестов
  afterAll(async () => {
    // Закрываем браузер
    await browser.close();
    // Завершаем серверное приложение
    serverProcess.kill();
  });

  // Функция, которая выполняется перед каждым тестом
  beforeEach(async () => {
    const page = await browser.newPage();
    await page.goto(baseUrl); // Переходим на страницу вашего приложения
    // Очищаем кэш, куки и локальное хранилище
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
  });

  // Тестируем валидацию корректного номера карты
  test('Valid card number validation', async () => {
    const page = await browser.newPage();
    await page.goto(baseUrl);
    await page.screenshot({ path: 'screenshots/1-homepage.png' });
    await page.waitForSelector('#card-number');
    await page.waitForSelector('#validate-button');

    // Вводим номер карты
    await page.type('#card-number', '5586200023405365');

    // Ожидаем, пока значение в поле ввода не станет ожидаемым
    await page.waitForFunction(
      () =>
        document.querySelector('#card-number').value === '5586 2000 2340 5365'
    );

    await page.screenshot({ path: 'screenshots/2-card-number-entered.png' });
    await page.click('#validate-button');

    // Ожидаем, пока появится сообщение о валидности карты
    await page.waitForSelector('.message.valid', {
      visible: true,
      timeout: 20000,
    });
    await page.screenshot({ path: 'screenshots/3-valid-message.png' });

    // Проверяем, существует ли элемент перед извлечением текста
    const message = await page.$eval('.message.valid', (el) => el.textContent);
    expect(message).toBe('Карта валидна. Система: MasterCard');
  });

  // Тестируем валидацию некорректного номера карты
  test('Invalid card number validation', async () => {
    const page = await browser.newPage();
    await page.goto(baseUrl);

    // Вводим номер карты
    await page.type('#card-number', '5586200023405366');

    // Ожидаем, пока значение в поле ввода не станет ожидаемым
    await page.waitForFunction(
      () =>
        document.querySelector('#card-number').value === '5586 2000 2340 5366'
    );

    await page.screenshot({ path: 'screenshots/5-card-number-entered.png' });
    await page.click('#validate-button');

    // Ожидаем, пока появится сообщение о невалидности карты
    await page.waitForSelector('.message.invalid', {
      visible: true,
      timeout: 10000,
    });
    await page.screenshot({ path: 'screenshots/6-invalid-message.png' });

    const message = await page.$eval(
      '.message.invalid',
      (el) => el.textContent
    );
    expect(message).toBe('Карта не валидна');
  });
});
