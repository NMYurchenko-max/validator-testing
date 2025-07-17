/**
   * @jest-environment jsdom
   */

  if (!window.matchMedia) {
    window.matchMedia = function (query) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: function () {},
        // хотя deprecated, но часто используется
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () {
          return false;
        },
      };
    };
  }

  import '@testing-library/jest-dom'; 
  // Ensure jest-dom is imported for toHaveClass
  import CardValidatorWidget from '../CardValidatorWidget.js';

  describe('CardValidatorWidget', () => {
    let container;
    let widget;

    beforeEach(() => {
      document.body.innerHTML = '<div id="widget-container"></div>';
      container = document.getElementById('widget-container');
      widget = new CardValidatorWidget(container);
    });

    test('should render title, input, button, card icons, message and buyer icon', () => {
      const title = container.querySelector('.widget-title');
      expect(title).not.toBeNull();
      expect(title.textContent).toBe('Валидатор кредитных карт');

      const input = container.querySelector('input#card-number');
      expect(input).not.toBeNull();

      const button = container.querySelector('button#validate-button');
      expect(button).not.toBeNull();

      const cardTypesContainer = container.querySelector('.card-types');
      expect(cardTypesContainer).not.toBeNull();

      const cardImages = cardTypesContainer.querySelectorAll('div.card');
      expect(cardImages.length).toBeGreaterThan(0);
      expect(cardImages[0]).toHaveClass('visa');
      expect(cardImages[1]).toHaveClass('mastercard');
      expect(cardImages[2]).toHaveClass('amex');
      expect(cardImages[3]).toHaveClass('discover');
      expect(cardImages[4]).toHaveClass('jcb');
      expect(cardImages[5]).toHaveClass('mir');
      expect(cardImages[6]).toHaveClass('unionpay');

      const message = container.querySelector('.message');
      expect(message).not.toBeNull();

      const buyerIcon = container.querySelector('.buyer-icon');
      expect(buyerIcon).not.toBeNull();
    });
  });

