module.exports = {
    root: true,
    env: {
        // this section will be used to determine which APIs are available to us
        // (i.e are we running in a browser environment or a node.js env)
        node: true,
        browser: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
        // specifying a module sourcetype prevent eslint from marking import statements as errors
        sourceType: 'module',
    },
    extends: [
        // use the recommended rule set for both plain javascript and vue
        'plugin:vue/essential',
        '@vue/prettier',
    ],
    // https://stackoverflow.com/questions/39510736/eslint-dollar-is-not-defined-no-undef/39511584
    globals: {
        $: true,
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 'off',
        "vue/no-use-v-if-with-v-for": "off",
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                printWidth: 120,
                trailingComma: 'es5',
                endOfLine: 'auto',
                tabWidth: 4,
                semi: false,
            },
        ],
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'fetch',
                    'asyncData',
                    'data',
                    'computed',
                    'watch',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    'head',
                    ['template', 'render'],
                    'renderError',
                ],
            },
        ],
    },
}
