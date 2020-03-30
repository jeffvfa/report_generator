module.exports = {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: '/spec/.*\\.(test|spec)?\\.(ts|tsx)$',
    setupFilesAfterEnv: ['jest-extended'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
