module.exports = {
  collectCoverage: true,
  coverageReporters: ['html'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'react-native',
  setupFiles: ['dotenv/config', '<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['node_modules', '__tests__/fixtures']
}
