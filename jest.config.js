module.exports = {
  // 设置测试环境为jsdom
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup.js', '@testing-library/jest-dom'],
  // 设置模块目录
  moduleDirectories: ['node_modules', 'es', 'src'],
  // 设置模块文件扩展名
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node'
  ],
  // 设置模块名称映射
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^es/(.*)$': '<rootDir>/es/$1',
  },
  // 设置忽略测试覆盖率的路径
  coveragePathIgnorePatterns: [
    "/node_modules/",
  ],
  // 设置转换器
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  // 设置全局变量
  // globals: {
  //   'window': true,
  // },
  // 设置测试文件匹配规则
  testMatch: [
    '<rootDir>/\_\_tests\_\_/\*\*/\*.test.js?(x)'
  ],
};
