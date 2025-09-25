    // jest.config.cjs
    module.exports = {
      testEnvironment: 'jest-environment-jsdom',
      transform: {
        '^.+\\.jsx?$': 'babel-jest', // Transforms JavaScript and JSX files using Babel.
      },
      moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy', // Mock CSS imports.
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Optional setup file for Jest DOM
    };