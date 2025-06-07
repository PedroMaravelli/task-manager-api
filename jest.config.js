/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Opcional: transformar node_modules específicos se necessário
  transformIgnorePatterns: ['node_modules/(?!(module-to-transform)/)'],
};
