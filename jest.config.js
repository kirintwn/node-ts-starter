module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.(j|t)s'],
  transform: {
    '^.+\\.(j|t)s$': 'ts-jest',
  },
  verbose: true,
};
