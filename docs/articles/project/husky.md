#   husky
利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行pnpm run format来自动化格式化我们的代码

## 安装
`pnpm i -D husky`

## 初始
`npx husky-init`

## .husky/pre-commit 
#!/usr/bin/env sh  
. "$(dirname -- "$0")/_/husky.sh"  
  
pnpm run format