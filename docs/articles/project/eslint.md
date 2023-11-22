# eslint配置
主要用于检查代码质量并给出提示，它在格式化方面的功能有限；

## 安装eslint
`pnpm i eslint -D`

## 安装插件
https://github.com/AlloyTeam/eslint-config-alloy  
`npm install --save-dev eslint @babel/core @babel/eslint-parser eslint-config-alloy`

## 配置文件.eslintrc.js
https://github.com/AlloyTeam/eslint-config-alloy  
```js
    module.exports = {
    extends: ['alloy', 'alloy/vue', 'alloy/typescript'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: {
        js: '@babel/eslint-parser',
        jsx: '@babel/eslint-parser',

        ts: '@typescript-eslint/parser',
        tsx: '@typescript-eslint/parser',

        // Leave the template parser unspecified, so that it could be determined by `<script lang="...">`
        },
    },
    env: {
        // Your environments (which contains several predefined global variables)
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    globals: {
        // Your global variables (setting to false means it's not allowed to be reassigned)
        //
        // myGlobal: false
    },
    rules: {
        // Customize your rules
    },
    };
```

## vscode settings
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
        "source.fixAll.eslint": true
    },
    "vetur.format.defaultFormatter.js": "vscode-typescript" // 防止ESLint和vetur会发生冲突
}
```
