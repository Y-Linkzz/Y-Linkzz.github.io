# 项目集成

## src别名的配置
开发项目文件与文件关系复杂，需要给src文件夹配置别名  

vite.config.ts
```js
    import { defineConfig } from 'vite';
    import path from 'path';
    export default defineConfig({
        resolve: { alias: { '@': path.resolve('./src') } },
    });
```

tsconfig.json
```js
    "compilerOptions": {
        "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
        "paths": {
            //路径映射，相对于baseUrl
            "@/*": ["src/*"]
        },
    }
```

## 环境变量
`.env.development`
```
    NODE_ENV = 'development'
    VITE_APP_TITLE = 'vue-admin'
    VITE_APP_BASE_API = '/api'
    VITE_SERVE = 'http://sph-api.atguigu.cn'
```

`.env.production`
```
    NODE_ENV = 'production'
    VITE_APP_TITLE = 'vue-admin'
    VITE_APP_BASE_API = 'http://sph-api.atguigu.cn'
    VITE_SERVE = 'http://sph-api.atguigu.cn'
```

`.env.test`
```
    NODE_ENV = 'test'
    VITE_APP_TITLE = 'vue-admin'
    VITE_APP_BASE_API = '/test-api'
    VITE_SERVE = 'http://sph-api.atguigu.cn'
```

`package.json`
```js
    "scripts": {
        "build:test": "vue-tsc && vite build --mode test",
        "build:pro": "vue-tsc && vite build --mode production",
    }
```

`通过import.meta.env获取环境变量`

## SVG图标配置

### 安装SVG依赖插件
`pnpm i -D vite-plugin-svg-icons`

### 入口文件（main.ts）
`import 'virtual:svg-icons-register';`

### vite.config.ts
```js
    plugins: [
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]',
        }),
    ]
```

### svg组件
```vue
    <script setup lang="ts">
    defineProps({
        prefix: {
            type: String,
            default: '#icon-',
        },
        name: String,
        color: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '16px',
        },
        height: {
            type: String,
            default: '16px',
        },
    });
    </script>
    <template>
        <svg :style="{ width, height }" class="svg-icon">
            <use :xlink:href="prefix + name" :fill="color"></use>
        </svg>
    </template>
    <style lang="scss" scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        overflow: hidden;
        font-size: 1.2em;
        vertical-align: -0.15em;
        fill: currentColor;
    }
    </style>
```

## 集成SASS
将全局变量放在`variable.scss`文件
vite.config.ts
```js
    css: {
        preprocessorOptions: {
        scss: {
            javascriptEnabled: true,
            additionalData: '@import "./src/styles/variable.scss";', // ;不要漏了
        },
        },
    },
```

## [mock数据](https://github.com/vbenjs/vite-plugin-mock)
`pnpm i -D vite-plugin-mock mockjs`

vite.config.ts
```js
    // command === 'serve' dev 独有配置
    // command === 'build' build 独有配置
    export default defineConfig(({ command }) => {
        return {
            plugins: [
                viteMockServe({
                    // @ts-ignore
                    enable: command === 'serve', // 保证开发阶段可以使用mock接口
                }),
            ]
        }
    }
```