# Stylelint
是一个用于检查和维护 CSS、SCSS 等样式表的工具。它的主要功能是确保代码风格的一致性，并检查样式表是否符合预设的规范； 
检查CSS的语法错误和不合理的写法，指定CSS书写顺序

## prettier 与 stylelint 的区别
-   `Prettier` 是一个代码格式化工具，它支持多种语言，包括 JavaScript1。Prettier 的主要目标是确保代码的一致性，无论多少人参与项目，它都能自动格式化代码以确保代码的一致性。
-   `Stylelint` 则是一个强大的现代 CSS 检查工具。它的主要目标是避免错误和强制实施一致的样式。Stylelint 可以和 Prettier 结合使用，其中 `stylelint-config-prettier` 可以解决 `StyleLint` 和 `Prettier` 之间的规则冲突问题。

## 插件
-   `stylelint-config-standard`：StyleLint 官方推荐的配置规则
-   `stylelint-config-prettier`：该配置用于解决 StyleLint 和 Prettier 之间的规则冲突问题。将其放在 extends 数组的最后位置，可以确保覆盖 Prettier 的配置
-   `stylelint-scss`：该插件是 StyleLint 的 SCSS 扩展，增加了对 SCSS 语法的支持，允许检查和验证 SCSS 文件
-   `stylelint-order`: 规范 CSS 书写顺序, 提高代码的可读性和可维护性

## 安装
`pnpm add -D stylelint postcss postcss-html postcss-scss stylelint-config-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-vue stylelint-config-standard stylelint-config-standard-scss stylelint-config-standard-vue stylelint-order stylelint-scss`

## 配置.stylelintrc.cjs
`stylelint-config-recommended-vue`插件里面它包含了一些针对 SCSS 的规则；所以`stylelint-config-recommended-vue/scss`表示包含了 Vue 和一些针对 SCSS 的规则的推荐配置；  

但是，如果你的项目中使用了大量的 SCSS，并且你想要更严格的 SCSS 规则，那么你可能会想要考虑安装 `stylelint-config-recommended-scss`。这个配置包含了一些额外的 SCSS 规则，可以帮助你更好地管理你的 SCSS 代码
```js
    // @see https://stylelint.bootcss.com/
    module.exports = {
        extends: [
            'stylelint-config-standard', // 配置stylelint拓展插件
            'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
            'stylelint-config-standard-scss', // 配置stylelint scss插件
            'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
            'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
            'stylelint-config-prettier', // 配置stylelint和prettier兼容
        ],
        overrides: [
            {
            files: ['**/*.(scss|css|vue|html)'],
            customSyntax: 'postcss-scss',
            },
            {
            files: ['**/*.(html|vue)'],
            customSyntax: 'postcss-html',
            },
        ],
        ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md', '**/*.yaml'],
        /**
         * null  => 关闭该规则
         * always => 必须
         */
        rules: {
            'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
            'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
            'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
            'no-empty-source': null, // 关闭禁止空源码
            'selector-class-pattern': null, // 关闭强制选择器类名的格式
            'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
            'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
            'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
            'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
            'selector-pseudo-class-no-unknown': [
            // 不允许未知的选择器
            true,
            {
                ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
            },
            ],
        },
    };
```

## stylelint-config-recess-order 与 stylelint-order 的区别
-   `stylelint-order` 是一个 `stylelint` 插件，它的作用是强制你按照某个顺序编写 CSS
-   `stylelint-config-recess-order` 是一个 `stylelint` 配置，它基于 `stylelint-order` 插件，提供了一种特定的 CSS 属性排序方式
总的来说，`stylelint-order` 提供了一种机制来强制 CSS 属性的排序，而 `stylelint-config-recess-order` 则提供了一种具体的排序方式。

## vscode

### 错误 Error [ERR_REQUIRE_ESM]: require() of ES Module
`.stylelintrc.js` 使用js后缀名，vscode的stylelint插件会出现这个错误  
改为`.stylelintrc.cjs`就可以了

### setting.json
```json
    {
        "files.eol": "\n",
        "editor.tabSize": 2,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "[jsonc]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        },
        "eslint.run": "onSave",
        "editor.formatOnSave": true,
        "eslint.format.enable": true,
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
            "source.fixAll.stylelint": true // 开启stylelint自动修复
        },
        "vetur.format.defaultFormatter.js": "vscode-typescript", // 防止ESLint和vetur会发生冲突
        // 关闭编辑器内置样式检查（避免与stylelint冲突）
        "css.validate": false,
        "less.validate": false,
        "scss.validate": false,
        // 配置stylelint检查的文件类型范围
        "stylelint.validate": ["css", "less", "postcss", "scss", "sass", "vue"]
    }
```

