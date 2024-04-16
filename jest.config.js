/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist"],
  rootDir: ".",
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    // Define your mappings here
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@validators/(.*)$": "<rootDir>/src/helpers/$1",
    "^@enums/(.*)$": "<rootDir>/src/enums/$1",
    "^@schemas/(.*)$": "<rootDir>/src/schemas/$1",
    "^src/helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^src/functions/(.*)$": "<rootDir>/src/functions/$1",

    // Add more mappings as needed
  },
};
