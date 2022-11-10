/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */

// module.exports = {
//   preset: 'ts-jest',
//   testEvironment: 'jsdom'
// }

import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(customJestConfig)
