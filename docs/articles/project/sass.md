# sass (Dart Sass)
https://github.com/sass/dart-sass

## 安装
`pnpm add -D sass sass-loader`

## sass 与 sass-loader 的关系
-   `sass` 是一个用于将 Sass/SCSS 文件编译为 CSS 的库。它提供了将 Sass/SCSS 语法转换为 CSS 的功能。
-   `sass-loader` 是一个 webpack loader，它的作用是在 webpack 构建过程中，将 Sass/SCSS 文件转换为 CSS。`sass-loader` 依赖于 `sass` 来完成这个转换过程

因此，你可以把 `sass` 看作是一个工具，它能够将 Sass/SCSS 语法转换为 CSS，而 `sass-loader` 则是一个桥梁，它将 `sass` 的这个功能集成到了 webpack 的构建过程中。这就是 `sass` 和 `sass-loader` 之间的关系。

## sass(Dart Sass) 与 node-sass 的区别
-   `node-sass` 是一个 Node.js 库，它将 Sass 编译为 CSS。它依赖于 LibSass，LibSass 是 Sass 的 C++ 实现。然而，node-sass 需要 node-gyp，在安装的时候需要进行编译，所以可能会遇到一些安装问题1。此外，node-sass 已经被标记为弃用1。
-   `sass`（也被称为 Dart Sass）是 Sass 的官方版本，由 Dart 编写。它是一个纯 JavaScript 的 npm 包，是从 Dart 转译来的，类似 TypeScript 转译成 JavaScript1。由于它是纯 JavaScript，所以在安装时不需要编译，也就没有了 node-sass 安装时常见的一堆问题。

因此，除非你正在维护一个老项目，否则建议使用 `sass` 而不是 `node-sass`。这也是为什么一些工具，如 Vite 和 webpack 的 sass-loader，已经转用 sass。总的来说，sass 提供了更好的安装体验和更广泛的兼容性。