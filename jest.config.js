module.exports = {
    testEnvironment: 'node',
    testTimeout: 10000,
    collectCoverage: true,
    collectCoverageFrom: ['./src/**/*.ts', '!./src/examples/**/*.ts'],
    coverageThreshold: {
        global: {
            branches: 10,
            functions: 10,
            lines: 10,
            statements: 10,
        },
    },
    modulePathIgnorePatterns: ['dist'],
    preset: 'ts-jest',
    clearMocks: true,
    globalSetup: './jest.setup.js',
};
