module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  };  