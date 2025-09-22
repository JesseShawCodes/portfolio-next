/** @type {import('jest').Config} */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        'react-markdown': '<rootDir>/mocks/react-markdown.js',
    },
};

module.exports = createJestConfig(customJestConfig);
