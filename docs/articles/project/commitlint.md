# commitlint
对于commit信息，也需要统一的规范

## 安装
`pnpm add -D @commitlint/config-conventional @commitlint/cli`

## 配置husky
npx husky add .husky/commit-msg

## commit-msg
#!/usr/bin/env sh  
. "$(dirname -- "$0")/_/husky.sh"  
  
pnpm commitlint


## 配置文件 commitlint.config.cjs
```js
    module.exports = {
        ignores: [(commit) => commit.includes('init')],
        extends: ['@commitlint/config-conventional'],
        rules: {
            'body-leading-blank': [2, 'always'],
            'footer-leading-blank': [1, 'always'],
            'header-max-length': [2, 'always', 108],
            'subject-empty': [2, 'never'],
            'type-empty': [2, 'never'],
            'subject-case': [0],
        },
    }
```

## package.json
```js
    "scripts": {
        "commitlint": "commitlint --config commitlint.config.cjs -e -V",
    },
```

## header的规则
Commit message格式，注意冒号后面有空格
```html
    <type>: <subject>
```
`subject`是 commit 的简短描述，不能超过50个字符，且结尾不加英文句号

## type: 用于说明 commit 的类别
-   feat：新功能（feature）
-   fix：修补bug
-   docs：文档（documentation）
-   style： 格式方面的优化,注意不是CSS修改
-   refactor：代码重构
-   perf: 优化相关，比如性能提升、体验
-   test：测试用例修改
-   chore：其他修改：比如改变构建流程、或者添加依赖库、工具等
-   revert: 回滚到上一个版本
-   build: 编译相关的修改，例如发布版本、对项目构建或者依赖的改动

`git commit -a -m "feat: XXX"`
