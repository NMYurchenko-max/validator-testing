import PaymentValidator from './PaymentValidator.js';
import { formatCardNumber } from './utils.js';
import Swal from 'sweetalert2'; // Импортируем sweetalert2
export default class CardValidatorWidget {
  constructor(container) {
    this.container = container;
    this.createWidget();
  }
  createWidget() {
    // Заголовок (перенесла в body)
    const title = document.createElement('h2');
    title.textContent = 'Валидатор кредитных карт';
    title.className = 'widget-title';
    // Создание элементов виджета
    this.cardTypesContainer = document.createElement('div');
    this.cardTypesContainer.className = 'card-types';
    this.cardImages = {};
    [
      'visa',
      'mastercard',
      'amex',
      'discover',
      'jcb',
      'mir',
      'unionpay',
    ].forEach((type) => {
      const cardDiv = document.createElement('div');
      cardDiv.className = `card ${type}`;
      cardDiv.id = type;
      //cardDiv.hidden = true; // Скрываем все карты изначально (было)
      cardDiv.classList.add('blurred'); // Добавляем блюр для начального состояния
      this.cardTypesContainer.appendChild(cardDiv);
      this.cardImages[type] = cardDiv;
    });
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Введите номер карты';
    this.input.id = 'card-number';
    this.button = document.createElement('button');
    this.button.textContent = 'Нажмите, чтобы проверить';
    this.button.id = 'validate-button';
    this.button.addEventListener('click', () => this.validateCard());
    this.message = document.createElement('div');
    this.message.className = 'message';
    // Создаем контейнер для input и кнопки
    this.inputButtonGroup = document.createElement('div');
    this.inputButtonGroup.className = 'input-button-group';
    this.inputButtonGroup.appendChild(this.input);
    this.inputButtonGroup.appendChild(this.button);
    // Создаем общий контейнер для виджета
    this.widgetContainer = document.createElement('div');
    this.widgetContainer.className = 'validator-widget';
    // Добавляем элементы в общий контейнер
    this.widgetContainer.appendChild(title); // Добавляем заголовок
    // Иконка покупателя - заменена на div с классом buyer-icon для использования background-image из CSS
    const buyerIcon = document.createElement('div');
    buyerIcon.className = 'buyer-icon';
    this.cardTypesContainer.appendChild(buyerIcon);
    this.widgetContainer.appendChild(this.cardTypesContainer);
    this.widgetContainer.appendChild(this.inputButtonGroup);
    this.widgetContainer.appendChild(this.message);
    // Добавляем общий контейнер в основной контейнер
    this.container.appendChild(this.widgetContainer);
    // Добавляем обработчик события ввода
    this.input.addEventListener('input', this.handleInput.bind(this));
  }
  handleInput() {
    const formattedNumber = formatCardNumber(this.input.value);
    // Форматируем номер карты
    this.input.value = formattedNumber;
  }
  validateCard() {
    const cardNumberInput = this.input.value.replace(/\s+/g, '');
    // Убираем пробелы для валидации
    const validator = new PaymentValidator(cardNumberInput);
    const result = validator.validate();
    // Сбрасываем состояние всех карточек
    Object.values(this.cardImages).forEach((card) => {
      //card.hidden = true;
      //card.classList.remove("visible");
      card.classList.add('blurred'); // Возвращаем блюрованное состояние
      card.classList.remove('visible');
    });
    if (result.isValid) {
      // Показываем соответствующую карту
      if (this.cardImages[result.system]) {
        //this.cardImages[result.system].hidden = false;
        //this.cardImages[result.system].classList.add("visible");
        this.cardImages[result.system].classList.remove('blurred'); // Убираем блюр
        this.cardImages[result.system].classList.add('visible');
      }
      // Сообщение об успехе с указанием системы карты
      this.message.textContent = `Карта валидна. Система: ${result.label}`;
      this.message.classList.add('valid');
      this.message.classList.remove('invalid');
      Swal.fire({
        target: this.widgetContainer,
        title: 'Успех!',
        text: `Карта валидна. Система: ${result.label}`,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          // Очистка поля ввода при закрытии сообщения
          this.input.value = '';
          // Сбрасываем состояние всех карточек
          Object.values(this.cardImages).forEach((card) => {
            //card.hidden = true;
            //card.classList.remove("visible");
            card.classList.add('blurred');
            card.classList.remove('visible');
          });
          // Очищаем сообщение
          this.message.textContent = '';
          this.message.classList.remove('valid');
        },
        didOpen: () => {
          const popup = this.widgetContainer.querySelector('.swal2-popup');
          if (popup) {
            popup.style.color = 'green';
          }
        },
      });
    } else {
      // Сообщение об ошибке
      this.message.textContent = 'Карта не валидна';
      this.message.classList.add('invalid');
      this.message.classList.remove('valid');
      Swal.fire({
        target: this.widgetContainer,
        title: 'Ошибка!',
        text: 'Карта не валидна',
        icon: 'error',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          // Очистка поля ввода при закрытии сообщения
          this.input.value = '';
          // Сбрасываем состояние всех карточек
          Object.values(this.cardImages).forEach((card) => {
            //card.hidden = true;
            //card.classList.remove("visible");
            card.classList.add('blurred');
            card.classList.remove('visible');
          });
          // Очищаем сообщение
          this.message.textContent = '';
          this.message.classList.remove('invalid');
        },
        didOpen: () => {
          const popup = this.widgetContainer.querySelector('.swal2-popup');
          if (popup) {
            popup.style.color = 'red';
          }
        },
      });
    }
  }
}
