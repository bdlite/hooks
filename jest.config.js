module.exports = {
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'es', 'src'],
    moduleFileExtensions: [
      'js',
      'jsx',
      'ts',
      'tsx',
      'json',
      'node'
    ],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
      '^es/(.*)$': '<rootDir>/es/$1',
    },
    coveragePathIgnorePatterns: [
      "/node_modules/",
    ],
    transform: {
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.tsx$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest',
    },
    globals: {
      'window': true,
    },
    testMatch: [
      '<rootDir>/\_\_tests\_\_/\*\*/\*.test.js?(x)'
    ],
  };