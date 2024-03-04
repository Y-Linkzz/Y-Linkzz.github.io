# pnpm

## 统一包管理器

在根目录创建scripts/preinstall.js
```js
    if (!/pnpm/.test(process.env.npm_execpath || '')) {
        console.warn(
            `\u001b[33mThis repository must using pnpm as the package manager ` +
            ` for scripts to work properly.\u001b[39m\n`,
        )
        process.exit(1)
    }
```

## package.json
```js
    "scripts": {
        "preinstall": "node ./scripts/preinstall.js",
    },
```
原理：install的时候会触发preinstall（npm提供的生命周期钩子）