module.exports = {
    extends: [
        // use the recommended rule set for both plain javascript and vue
        'plugin:vue/essential',
        '@vue/prettier',
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 'off',
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
