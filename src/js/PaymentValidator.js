// PaymentValidator.js
import PAYMENT_SYSTEMS from './pay-systems'; // Укажите правильный путь к вашему файлу
import { isValidLuhn } from './utils'; // Укажите правильный путь к вашему файлу с функцией Луна
export default class PaymentValidator {
  constructor(cardNumber) {
    this.cardNumber = cardNumber.replace(/\s+/g, ''); // Убираем пробелы
  }
  validate() {
    for (const system of PAYMENT_SYSTEMS) {
      if (this.isValidForSystem(system)) {
        return {
          isValid: true,
          system: system.value,
          label: system.label,
        };
      }
    }
    return { isValid: false, system: null };
  }
  isValidForSystem(system) {
    const isCorrectLength = system.lengths.includes(this.cardNumber.length);
    const matchesPattern = system.pattern.test(this.cardNumber);
    const isValidByLuhn = isValidLuhn(this.cardNumber); // Проверка по алгоритму Луна
    return isCorrectLength && matchesPattern && isValidByLuhn; // Все три условия должны быть истинны
  }
}