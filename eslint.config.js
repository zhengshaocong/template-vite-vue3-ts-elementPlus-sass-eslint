import js from '@eslint/js';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
    {
    // 基础配置
        files: ['**/*.{js,ts,vue}'],
        ignores: ['**/dist/*', '**/node_modules/*'], // 替代 .eslintignore
        ...js.configs.recommended,
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                sourceType: 'module',
            },
        },
        plugins: {
            vue: vuePlugin,
            '@typescript-eslint': tsPlugin,// 注意，这里的名称必须和parserOptions.parser.@typescript-eslint/package.json中name字段一致
        },

        rules: {
        // 代码格式相关
            'indent': ['error', 4, { 'SwitchCase': 1 }], // 强制使用 4 个空格缩进，case 语句缩进 1 级
            'quotes': ['error', 'single', { 'avoidEscape': true }], // 强制使用单引号
            'semi': ['error', 'always'], // 强制使用分号结尾
            'comma-dangle': ['error', 'always-multiline'], // 多行对象和数组时，最后一个元素必须有逗号
            'space-before-function-paren': ['error', {
                'anonymous': 'always',
                'named': 'always',
                'asyncArrow': 'always',
            }], // 函数括号前必须有空格
            'arrow-spacing': ['error', { 'before': true, 'after': true }], // 箭头函数箭头前后必须有空格
            'keyword-spacing': ['error', { 'before': true, 'after': true }], // 关键字前后必须有空格

            // 变量和作用域相关
            'no-var': 'error', // 禁止使用 var 声明变量
            'prefer-const': 'error', // 如果变量声明后不再重新赋值，必须使用 const
            'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }], // 禁止未使用的变量
            'no-use-before-define': ['error', { 'functions': false, 'classes': true, 'variables': true }], // 禁止在变量定义之前使用

            // Vue 相关
            'vue/attribute-hyphenation': ['error', 'always'], // 强制属性名使用连字符命名
            // 'vue/html-closing-bracket-newline': ['error', {
            //     'singleline': 'never',
            //     'multiline': 'always',
            // }], // 强制 HTML 闭合标签换行规则
            'vue/html-closing-bracket-spacing': ['error', {
                'startTag': 'never',
                'endTag': 'never',
                'selfClosingTag': 'always',
            }], // 强制 HTML 闭合标签前后空格规则
            'vue/html-indent': ['error', 4], // 强制 HTML 缩进为 4 个空格
            'vue/html-self-closing': ['error', {
                'html': {
                    'void': 'always',
                    'normal': 'never',
                    'component': 'always',
                },
                'svg': 'always',
                'math': 'always',
            }], // 强制自闭合标签规则
            // 'vue/max-attributes-per-line': 1, // 强制每行属性数量
            'vue/multiline-html-element-content-newline': ['error', {
                'ignoreWhenEmpty': true,
                'ignores': ['pre', 'textarea'],
                'allowEmptyLines': false,
            }], // 强制多行 HTML 元素内容换行
            'vue/no-spaces-around-equal-signs-in-attribute': 'error', // 禁止属性赋值符号周围有空格
            'vue/no-template-shadow': 'error', // 禁止模板中变量名与父作用域变量名冲突
            'vue/prop-name-casing': ['error', 'camelCase'], // 强制 prop 名使用驼峰命名法
            'vue/require-default-prop': 'error', // 强制 prop 有默认值
            'vue/require-prop-types': 'error', // 强制 prop 定义类型
            // 'vue/singleline-html-element-content-newline': ['error', {
            //     'ignoreWhenNoAttributes': true,
            //     'ignoreWhenEmpty': true,
            //     'ignores': ['pre', 'textarea'],
            // }], // 强制单行 HTML 元素内容换行

            // TypeScript 相关
            '@typescript-eslint/no-explicit-any': 'error', // 禁止使用 any 类型
            '@typescript-eslint/no-non-null-assertion': 'error', // 禁止使用非空断言
            '@typescript-eslint/explicit-module-boundary-types': 'error', // 强制函数返回类型明确
            'no-trailing-spaces': ['error', {
            // 允许注释结尾有空格
                'skipBlankLines': false,
                'ignoreComments': false,
            }],
            'space-infix-ops': 'error', // 强制二元运算符前后有空格
            // 禁止多个连续空格，除了在注释和标记中
            'no-multi-spaces': ['error', {
                'ignoreEOLComments': true,
            }],
            'vue/multi-word-component-names': 0,
        },
    },
    // 新增 SCSS 文件处理配置
    {
        files: ['**/*.scss'],
        plugins: {
            '@stylistic/scss': stylisticJs,
        },
        rules: {
            // 基础格式规则
            'scss/indentation': ['error', 2, { baseIndentLevel: 0 }],
            'scss/dollar-variable-colon-space-after': 'error',
            'scss/dollar-variable-colon-space-before': 'never',
            
            // 括号与运算符
            'scss/operator-no-newline-after': 'error',
            'scss/operator-no-newline-before': 'error',
            'scss/operator-space-after': 'always',
            'scss/operator-space-before': 'always',
            
            // 选择器与嵌套
            'scss/selector-no-redundant-nesting-selector': 'error',
            'scss/no-duplicate-mixins': 'error',
            'scss/at-rule-no-unknown': 'error',
            
            // 变量与混合
            'scss/dollar-variable-pattern': ['error', '^_?[a-z][a-z0-9-]*$'],
            'scss/at-mixin-pattern': ['error', '^[a-z][a-z0-9-]*$'],
            
            // 严格空行控制
            'scss/empty-line-between-blocks': ['error', { ignore: ['after-comment'] }],
            'scss/at-else-empty-line-before': 'never',
            
            // 引号与分号
            'scss/double-quotes': 'error',
            'scss/semicolon-style': ['error', 'last']
        },
    },
    // 集成 Prettier 配置
    eslintPluginPrettier,
    eslintConfigPrettier,
];