module.exports = {
    testEnvironment: 'jsdom', // 使用 jsdom 作为测试环境
    // setupFilesAfterEnv: [
    //   '<rootDir>/setup.js'
    // ],
    setupFilesAfterEnv: ['<rootDir>/setup.js', '@testing-library/jest-dom'],
    moduleDirectories: ['node_modules', 'es', 'src'], // 指定搜索模块的目录
    moduleFileExtensions: [ // 指定解析模块时要查找的文件扩展名
      'js',
      'jsx',
      'ts',
      'tsx',
      'json',
      'node'
    ],
    moduleNameMapper: { // 将特定的文件扩展名映射到模拟文件
      '^src/(.*)$': '<rootDir>/src/$1', // 将 src 目录下的文件映射到根目录下
      '^es/(.*)$': '<rootDir>/es/$1', // 将 es 目录下的文件映射到根目录下
    },
    coveragePathIgnorePatterns: [ // 指定计算代码覆盖率时要忽略的目录
      "/node_modules/",
    ],
    // extensionsToTreatAsEsm: ['.ts'], // 将 TypeScript 文件视为 ES 模块
    transform: { // 指定要使用的转换器以处理不同类型的文件
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.tsx$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest',
    },
    // transformIgnorePatterns: ['/node_modules/'],
    // testPathIgnorePatterns: ['<rootDir>/es/'],
    // transformIgnorePatterns: ['<rootDir>/es','/node_modules/(?!(query-string|react)/)'],
    // globals: { // 指定在测试期间要使用的全局变量
    //   'window': true,
    // },
    testMatch: [ // 指定要运行的测试文件
      '<rootDir>/\_\_tests\_\_/\*\*/\*.test.js?(x)'
    ],
  };