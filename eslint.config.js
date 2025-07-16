const mastermindzhConfig = require("@mastermindzh/eslint-config");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const reactPlugin = require("eslint-plugin-react");

module.exports = [
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      "dist/**",
      "build/**",
      "public/**",
      ".cache/**",
      "node_modules/**",
      "*.config.js",
      "*.config.ts",
    ],
  },
  ...mastermindzhConfig,
  {
    // Only lint TypeScript files (matching your .eslintignore pattern)
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: importPlugin,
      react: reactPlugin,
    },
    // Your project-specific rules
    rules: {
      // Import rules
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.test.ts", "**/*.test.tsx", "**/internal/**/*.ts"],
        },
      ],
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-use-before-define": "off",
      // Use the correct rule name for quotes
      quotes: ["error", "double"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["camelCase", "UPPER_CASE", "snake_case", "PascalCase"],
          leadingUnderscore: "allow",
          selector: "parameter",
        },
      ],
      // React rules
      "react/static-property-placement": "off",
      "react/prop-types": "off",
      // Shadow rules
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
    },
  },
];
