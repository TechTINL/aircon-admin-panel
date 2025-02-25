module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020, // Use the latest ecmascript standard
        sourceType: 'module', // Allows using import/export statements
        ecmaFeatures: {
            jsx: true, // Enable JSX since we're using React
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            alias: {
                map: [['@', './resources/js']],
                extensions: ['.js', '.jsx']
            }
        }
    },
    env: {
        browser: true,
        amd: true,
        node: true,
    },
    extends: [
        'airbnb',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    globals: {
        route: 'readonly',
    },
    plugins: ['prettier'],
    rules: {
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],
        'react/jsx-indent-props': [2, 2],
        'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
        'prettier/prettier': [
            'error',
            {},
            {
                usePrettierrc: true,
            },
        ],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'no-console': 2,
    },
};
