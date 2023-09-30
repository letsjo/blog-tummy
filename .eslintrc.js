module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint-config-prettier',
    'next/core-web-vitals',
  ],
  globals: {
    NodeJS: true,
  },
  env: {
    browser: true,
    jasmine: true,
    jest: true,
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'arrow-body-style': 'off',
    'no-plusplus': 'off',
    'react/display-name': 'off',
    'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/lib/**',
            group: 'external',
          },
          {
            pattern:
              '{hooks,@/hooks/**/*,./hooks/**,./use**,../use**,../../use**,../../../use**,,../../hooks/**,./_hooks/**,../../../_hooks/**}',
            group: 'internal',
          },
          {
            pattern:
              '{components,components/_common/**,@/components,@/components/**,svgs,@/assets/**/*,@/app/**,routes/**,public/**}',
            group: 'index',
          },
          {
            pattern: '{styles,./*.scss,../*.scss,../*.module.scss}',
            group: 'index',
          },
        ],
        groups: [
          ['external', 'builtin'],
          ['internal', 'object'],
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-anonymous-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.tsx', '**/*.stories.*', '**/.storybook/**/*.*', 'setupTests.ts'],
        peerDependencies: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-param-reassign': ['error', { props: false }],
    'no-unused-expressions': ['warn'],
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'lines-between-class-members': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: ['label'],
        labelAttributes: ['htmlFor'],
        controlComponents: ['input'],
      },
    ],
  },
  globals: { navigation: 'readonly', globalThis: false, NodeJS: true },
};
