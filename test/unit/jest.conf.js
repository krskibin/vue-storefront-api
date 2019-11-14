module.exports = {
  rootDir: '../../',
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
  ],
  testMatch: [
    '<rootDir>/test/unit/**/*.spec.(js|ts)',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest',
  },
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
  }
}