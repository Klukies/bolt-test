import eslint from '@eslint/js';
import react from '@eslint-react/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import importX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const core = tseslint.config({
  files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  extends: [eslint.configs.recommended],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2022,
      ...globals.node,
    },
  },
  rules: {
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
  },
});

const typescript = tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  extends: [...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylistic],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-object-type': [
      'error',
      { allowInterfaces: 'with-single-extends' },
    ],
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
    '@typescript-eslint/only-throw-error': 'off',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    'no-return-await': 'off',
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
  },
});

const reactConfig = tseslint.config({
  files: ['**/*.jsx', '**/*.tsx'],
  plugins: {
    '@eslint-react': react.configs.all.plugins['@eslint-react'],
    '@eslint-react/dom': react.configs.all.plugins['@eslint-react/dom'],
    '@eslint-react/web-api': react.configs.all.plugins['@eslint-react/web-api'],
    'react-hooks': reactHooks,
    '@eslint-react/hooks-extra': react.configs.all.plugins['@eslint-react/hooks-extra'],
    '@eslint-react/naming-convention': react.configs.all.plugins['@eslint-react/naming-convention'],
    'jsx-a11y': jsxA11y,
  },
  languageOptions: {
    parser: tseslintParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    ...react.configs['recommended-type-checked'].rules,
    ...jsxA11y.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    '@eslint-react/no-leaked-conditional-rendering': 'error',
    '@eslint-react/prefer-read-only-props': 'off',
    '@eslint-react/hooks-extra/no-redundant-custom-hook': 'off',
  },
});

const formatting = tseslint.config({
  extends: [prettierRecommended],
  plugins: { 'import-x': importX, 'unused-imports': unusedImports },
  rules: {
    curly: 'error',
    'import-x/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'import-x/first': 'error',
    'import-x/newline-after-import': 'error',
    'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
    'import-x/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
  settings: {
    'import-x/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
});

const ignores = tseslint.config({
  ignores: [
    '.react-router',
    'app/modules/api/agora/*',
    'build/*',
    'playwright/*',
    'playwright-report/*',
    'playwright-test-results/*',
    'vitest-coverage/*',
    'vitest-test-results/*',
  ],
});

const config = tseslint.config(...core, ...typescript, ...reactConfig, ...formatting, ...ignores);

export default config;
