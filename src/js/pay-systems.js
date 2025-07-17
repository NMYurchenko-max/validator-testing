export const PAYMENT_SYSTEMS = [
  {
    value: "visa",
    label: "Visa",
    card: "../images/visa.svg",
    pattern: /^4/,
    lengths: [13, 16, 19],
  },
  {
    value: "mastercard",
    label: "MasterCard",
    card: "../images/mastercard.svg",
    pattern: /^(5[1-5]|2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7[0-1][0-9]|720))/,
    lengths: [16],
  },
  {
    value: "amex",
    label: "American Express",
    card: "../images/amex.svg",
    pattern: /^3[47]/,
    lengths: [15],
  },
  {
    value: "discover",
    label: "Discover",
    card: "../images/discover.svg",
    pattern:
      /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5])|64[4-9]|65)/,
    lengths: [16, 19],
  },
  {
    value: "jcb",
    label: "JCB",
    card: "../images/jcb.svg",
    pattern: /^35(2[89]|[3-8][0-9])/,
    lengths: [16, 19],
  },
  {
    value: "mir",
    label: "Mir",
    card: "../images/mir.svg",
    pattern: /^220[0-4]/,
    lengths: [16],
  },
  {
    value: "unionpay",
    label: "UnionPay",
    card: "../images/unionpay.svg",
    pattern: /^(62|88)[0-9]/,
    lengths: [14, 17],
  },
];
// Преобразуем регулярные выражения в объекты RegExp для быстрого поиска
const paymentSystems = PAYMENT_SYSTEMS.map((item) => {
  if (item.pattern instanceof RegExp) {
    return {
      ...item,
      pattern: item.pattern,
    };
  } else {
    return item;
  }
});

// Проверяем номер карты на соответствие регулярным выражениям
export function getPaymentSystem(cardNumber) {
  for (const system of paymentSystems) {
    if (system.pattern.test(cardNumber)) {
      return system;
    }
  }
  return null;
}
export default PAYMENT_SYSTEMS;

// пример применения
const cardNumber = "4111111111111111";
const paymentSystem = getPaymentSystem(cardNumber);
if (paymentSystem) {
  console.log(`Карта ${paymentSystem.value}`);
}
