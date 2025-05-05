module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', 'react-hooks', 'prettier', '@typescript-eslint', 'react-perf'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:react-perf/recommended',
    ],
    rules: {
        'import/no-unresolved': 'off',
        'consistent-return': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'react/prop-types': 0,
        'no-unused-vars': 'error',
        // General Code Quality
        'max-statements-per-line': ['error', { max: 1 }],
        // Typing
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],
        // React
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies, move to err
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-perf/jsx-no-new-function-as-prop': 'warn', // Warn for new function as prop
        'react-perf/jsx-no-new-array-as-prop': 'warn', // Warn for new array as prop
        'react-perf/jsx-no-new-object-as-prop': 'warn', // Warn for new object as prop
    },
    globals: {
        Edit: 'writable',
        console: 'writable',
        _: 'writable',
        $: 'writable',
    },
}
