# Credit Card Validator JSDOM & E2E Tests (Тема: Организация тестирования)

![CI](https://github.com/NMYurchenko-max/validator-testing/actions/workflows/web.yml/badge.svg)

[deploy](https://nmyurchenko-max.github.io/validator-testing/)

[![Build status](https://ci.appveyor.com/api/projects/status/d8rr84db9bgr47y3?svg=true)](https://ci.appveyor.com/project/NMYurchenko-max/validator-testing)

## Описание

Проект представляет собой валидатор номеров банковских карт,
который использует JSDOM и E2E тесты в разработке.
DOM-тесты — это тесты, которые проверяют, как работает ваш код в браузере.
E2E-тесты — это тесты, которые проверяют, как работает ваш код в реальном браузере.

## Ресурсы

- [Jest](https://jestjs.io/)
- [Webpack](https://webpack.js.org/)
- [ESLint](https://eslint.org/)
- [jest-environment-jsdom](https://github.com/testing-library/jest-dom)
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)
- [Puppeteer](https://pptr.dev/)

В качестве источника номеров карт для тестирования при разрабртке использованы:
  [FreeFormatter](https://www.freeformatter.com/credit-card-number-generator-validator.html)
  [Генератор случайных номеров кредитных карт](https://namso-gen.com/?tab=basic&network=UnionPay&action=generate)

## Использование

Клонируйте репозиторий:
`git clone https://github.com/NMYurchenko-max/validator-testing.git`

Установите зависимости:
`yarn install`
Соберите и запустите приложение:
`yarn build`
`yarn start`

## Тестовый кейс (пример поведения приложения)

Тестовый кейс — это набор действий, которые вы хотите проверить в вашем приложении.
Валидатор номеров банковских карт должен проверять, что введенный номер карты соответствует одному из известных типов карт - всплывает на передний план иконка платежной системы и окно с сообщением о валидности номера карты и её принадлежность данной системе, в случае если номер карты не соответствует ни одному из известных типов карт, всплывает на передний план иконка платежной системы и окно с сообщением о невалидности номера карты.

## Автотесты в проекте

`yarn test` — запуск (unit и jsdom) тестов в консоли с помощью Jest.

`yarn e2e` — запуск тестов в браузере, используя Puppeteer.
