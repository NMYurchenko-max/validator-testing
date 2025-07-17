import PaymentValidator from '../PaymentValidator.js';
describe('PaymentValidator', () => {
  // Массив тестовых данных: [номер карты, ожидаемый результат: валидная система или null]
  test.each([
    ['4111 1111 1111 1111', 'visa'],
    ['5500 0000 0000 0004', 'mastercard'],
    ['3400 0000 0000 009', 'amex'],
    ['6011 0000 0000 0004', 'discover'],
    ['1234 5678 9012 3456', null],
    ['4111 1111 1111', null],
  ])('для номера "%s" ожидается система "%s"', (cardNumber, expectedSystem) => {
    const validator = new PaymentValidator(cardNumber);
    const result = validator.validate();
    const expected =
      expectedSystem
        ? { isValid: true, system: expectedSystem }
        : { isValid: false, system: null };
    expect(result).toEqual(expect.objectContaining(expected));
  });
});
