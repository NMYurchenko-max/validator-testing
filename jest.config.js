module.exports = {
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '\\.(png)$': '<rootDir>/src/__mocks__/fileMock.js',
      },
      testMatch: ['<rootDir>/src/**/*.test.js'],
    },
    {
      displayName: 'e2e',
      testEnvironment: 'node',
      // Если у вас отдельные файлы для e2e-тестов, например, в папке /e2e
      testMatch: ['<rootDir>/e2e/**/*.test.js'],
    },
  ],
};
