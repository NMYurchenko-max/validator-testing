import {
  formatCardNumber,
  getCardIconSVG,
  getCardType,
  isValidLuhn,
} from "./utils";

describe("Utils", () => {
  describe("formatCardNumber", () => {
    it("форматирует номер карты в формат XXXX XXXX XXXX XXXX", () => {
      expect(formatCardNumber("4111111111111111")).toBe("4111 1111 1111 1111");
      expect(formatCardNumber("4111 1111 1111 1111")).toBe(
        "4111 1111 1111 1111",
      );
      expect(formatCardNumber("41111111111111112222")).toBe(
        "4111 1111 1111 1111 2222",
      );
    });

    it("удаляет лишние символы и пробелы", () => {
      expect(formatCardNumber("4111-1111-1111-1111")).toBe(
        "4111 1111 1111 1111",
      );
    });

    it("возвращает пустую строку при неправильном входном значении", () => {
      expect(formatCardNumber(null)).toBe("");
      expect(formatCardNumber(undefined)).toBe("");
      expect(formatCardNumber("")).toBe("");
    });
  });

  describe("getCardIconSVG", () => {
    it("возвращает правильный URL SVG-иконки по типу карты", () => {
      expect(getCardIconSVG("visa")).toBe("../images/visa.svg");
      expect(getCardIconSVG("mastercard")).toBe("../images/mastercard.svg");
      expect(getCardIconSVG("jcb")).toBe("../images/jcb.svg");
    });

    it("возвращает пустую строку при неизвестном типе", () => {
      expect(getCardIconSVG("unknown")).toBe("");
    });
  });

  describe("getCardType", () => {
    it("определяет тип Visa", () => {
      expect(getCardType("4111111111111111")).toBe("visa");
    });

    it("определяет тип Mastercard", () => {
      expect(getCardType("5500000000000004")).toBe("mastercard");
    });

    it("определяет тип Mir", () => {
      expect(getCardType("2200000000000009")).toBe("mir");
    });

    it("определяет тип Amex", () => {
      expect(getCardType("378282246310005")).toBe("amex");
    });

    it("определяет тип Discover", () => {
      expect(getCardType("6011111111111117")).toBe("discover");
    });

    it("определяет тип JCB", () => {
      expect(getCardType("3530111111111111")).toBe("jcb");
    });

    it("возвращает null для неизвестного типа", () => {
      expect(getCardType("1234567890123456")).toBeNull();
    });
  });

  describe("isValidLuhn", () => {
    it("валидирует корректный номер карты", () => {
      expect(isValidLuhn("4111111111111111")).toBe(true);
      expect(isValidLuhn("378282246310005")).toBe(true); // Amex
      expect(isValidLuhn("6011111111111117")).toBe(true); // Discover
    });

    it("отклоняет невалидный номер карты", () => {
      expect(isValidLuhn("4111111111111112")).toBe(false);
      expect(isValidLuhn("1234567890123456")).toBe(false);
    });
  });
});
