import getPaymentSystem from "./pay-systems.js";
/**
 * Форматирует номер карты в виде XXXX XXXX XXXX XXXX.
 *
 * @param {string} number - Строка, содержащая цифры номера карты (может содержать пробелы или символы).
 * @returns {string} - Отформатированный номер карты в виде "XXXX XXXX XXXX XXXX".
 */
export function formatCardNumber(number) {
    if (typeof number !== 'string') return '';
    return number
      .replace(/\D/g, '') // Удаляем всё, кроме цифр
      .replace(/(.{4})/g, '$1 ') // Добавляем пробелы после каждой группы из 4 цифр
      .trim(); // Убираем лишний пробел в конце
}

/**
  * Определяет тип кредитной карты по её номеру
   * @param {string} number - Номер карты
   * @returns {string|null} - Тип карты (visa, mastercard и т.д.) 
   * или null,если не определён
   */
export function getCardType(number) {
  const types = {
    visa: /^4[0-9]{6,}$/,
    mastercard: /^5[1-5][0-9]{5,}$/,
    mir: /^220[0-4][0-9]{6,}$/,
    amex: /^3[47][0-9]{5,}$/,
    unionpay: /^(62|88)[0-9]{14,17}$/,
    discover: /^6011|65|64[4-9]|622$/,
    jcb: /^35(28|3[0-8][0-9]|2[0-9])/, // JCB
  };
  
  // Проверяем каждую регулярку и возвращаем тип
  for (const [type, pattern] of Object.entries(types)) {
    if (pattern.test(number)) {
      return type;
    }
  }
  return null;
}
  
/**
   * Проверяет валидность номера карты по алгоритму Луна
   * @param {string} number - Номер карты
   * @returns {boolean} - true, если валиден, иначе false
   */
  
export function isValidLuhn(value) {
  let sum = 0;
  let isSecond = false; // Парные или непарные цифры

  if (value && +value) {
    const number = String(value); // Преобразуем в строку
    const digits = number.replace(/\D/g, '').split('').map(Number);
    // Удаляем все нецифровые символы и преобразуем в массив цифр
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      // Переводим в двоичную систему
      if (isSecond) {
        digit *= 2; // Умножаем на 2

        if (digit > 9) {
          digit -= 9;
        }
        // Если результат больше 9 (например, 8 * 2 = 16), то вычитаем 9
      }

      sum += digit; // Добавляем цифру к сумме
      isSecond = !isSecond; // Переключаем между парными и непарными цифрами
    }

    return sum % 10 === 0;
  }

  return false;
}
  
/**
   * Возвращает URL к SVG-иконке по типу карты.
   *
   * @param {string} type - Тип карты ('visa', 'mastercard', 'mir', 'amex', 'discover', 'jcb').
   * @returns {string} - Путь к SVG-файлу или пустая строка.
   */
export function getCardIconSVG(type) {
  const icons = {
    visa: '../images/visa.svg',
    mastercard: '../images/mastercard.svg',
    mir: '../images/mir.svg',
    amex: '../images/amex.svg',
    unionpay: '../images/unionpay.svg',
    discover: '../images/discover.svg',
    jcb: '../images/jcb.svg'
  };
  
  return icons[type] || '';
}

export function isValidCard(value, cardInfo) {
  const regex = new RegExp(
    `^${cardInfo.start}[0-9]{${cardInfo.length - String(cardInfo.start).length}}$`,
  ); // Создаем регулярное выражение для проверки номера карты 
  //Он должен начинаться с cardInfo.start и иметь cardInfo.length цифр

  return regex.test(value);
}
// пример использования:
// const cardInfo = {
//   start: '4', // начало номера карты
//   length: 16, // длина номера карты
// };
// const cardNumber = '4242424242424242';
// const isValid = isValidCard(cardNumber, cardInfo);
// console.log(isValid);

