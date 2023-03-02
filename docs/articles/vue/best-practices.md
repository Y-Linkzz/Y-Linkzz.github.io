# 最佳实践

## 追踪运行时错误
应用级错误处理 可以用来向追踪服务报告错误;
诸如 [Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) 和 [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) 等服务也为 Vue 提供了官方集成

## 性能优化
web 应用性能的两个主要方面：
-   **页面加载性能**: 首次访问时，应用展示出内容与达到可交互状态的速度。这通常会用 Google 所定义的一系列 [Web 指标](https://web.dev/vitals/#core-web-vitals) (Web Vitals) 来进行衡量，如最大内容绘制 (Largest Contentful Paint，缩写为 LCP) 和首次输入延迟 (First Input Delay，缩写为 FID)。
-   **更新性能**：应用响应用户输入更新的速度。比如当用户在搜索框中输入时结果列表的更新速度，或者用户在一个单页面应用 (SPA) 中点击链接跳转页面时的切换速度。
[web.dev 指南](https://web.dev/fast/)

### 生产部署的负载性能分析
-   [PageSpeed Insights](https://pagespeed.web.dev/)
-   [WebPageTest](https://www.webpagetest.org/)

用于本地开发期间的性能分析：
-   [Chrome 开发者工具“性能”面板](https://developer.chrome.com/docs/devtools/performance/)
    -   [app.config.performance](https://cn.vuejs.org/api/application.html#app-config-performance) 将会开启 Vue 特有的性能标记，标记在 Chrome 开发者工具的性能时间线上
- [Vue 开发者扩展](https://cn.vuejs.org/guide/scaling-up/tooling.html#browser-devtools)也提供了性能分析的功能
  
### 包体积与 Tree-shaking 优化
-   提供 ES 模块格式的依赖，它们对 tree-shaking 更友好。举例来说，选择 lodash-es 比 lodash 更好
-   查看依赖的体积，并评估与其所提供的功能之间的性价比。像 [bundlejs.com](https://bundlejs.com/) 这样的工具可以用来做快速的检查，但是根据实际的构建设置来评估总是最准确的

### 更新优化
1. Props 稳定性: 就是让传给子组件的 props 尽量保持稳定
```js
    <ListItem
    v-for="item in list"
    :id="item.id"
    :active-id="activeId" />
    // 每当 activeId 更新时，列表中的每一个 <ListItem> 都会跟着更新！

    <ListItem
    v-for="item in list"
    :id="item.id"
    :active="item.id === activeId" />
    // 大多数的组件来说，activeId 改变时，它们的 active prop 都会保持不变，因此它们无需再更新
```

### 减少大型不可变数据的响应性开销
Vue 的响应性系统默认是深度的。虽然这让状态管理变得更直观，但在数据量巨大时，深度响应性也会导致不小的性能负担，因为每个属性访问都将触发代理的依赖追踪。好在这种性能负担通常这只有在处理超大型数组或层级很深的对象时，例如一次渲染需要访问 100,000+ 个属性时，才会变得比较明显。

Vue 确实也为此提供了一种解决方案，通过使用 shallowRef() 和 shallowReactive() 来绕开深度响应。浅层式 API 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理。这使得对深层级属性的访问变得更快，但代价是，我们现在必须将所有深层级对象视为不可变的，并且只能通过替换整个根状态来触发更新

```js
    const shallowArray = shallowRef([
    /* 巨大的列表，里面包含深层的对象 */
    ])

    // 这不会触发更新...
    shallowArray.value.push(newObject)
    // 这才会触发更新
    shallowArray.value = [...shallowArray.value, newObject]

    // 这不会触发更新...
    shallowArray.value[0].foo = 1
    // 这才会触发更新
    shallowArray.value = [
    {
        ...shallowArray.value[0],
        foo: 1
    },
    ...shallowArray.value.slice(1)
    ]
```

### 避免不必要的组件抽象

考虑这种优化的最佳场景还是在大型列表中。想象一下一个有 100 项的列表，每项的组件都包含许多子组件。在这里去掉一个不必要的组件抽象，可能会减少数百个组件实例的无谓性能消耗。


## 安全

### 首要规则：不要使用无法信赖的模板
使用 Vue 时最基本的安全规则就是不要将无法信赖的内容作为你的组件模板。使用无法信赖的模板相当于允许任意的 JavaScript 在你的应用中执行。更糟糕的是，如果在服务端渲染时执行了这些代码，可能会导致服务器被攻击

```js
    Vue.createApp({
        template: `<div>` + userProvidedString + `</div>` // 永远不要这样做！
    }).mount('#app')
```

### Vue 自身的安全机制

#### HTML 内容

```html
    <!-- userProvidedString 为 <script>alert("hi")</script> -->
   <h1>{{ userProvidedString }}</h1>
    <!-- 它将被转义为如下的 HTML -->
    &lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;
```

这种转义是使用 textContent 这样的浏览器原生 API 完成的，所以只有当浏览器本身存在漏洞时，才会存在漏洞

```js
    let dom = document.createElement('p')
    dom.textContent = '<script>' // innerText 也是一样的效果
    const { innerHTML, innerText, textContent } = dom
    // innerHTML 为 &lt;script&gt;
    // innerText 为 <script>;
    // textContent 为 <script>;
```

#### Attribute 绑定

转义是使用 setAttribute 这样的浏览器原生 API 完成的

```js
    let dom = document.createElement('p')
    dom.setAttribute('title', '" onclick="alert(\'hi\')')
    const { outerHTML } = dom
    // outerHTML 为 "<p title=\"&quot; onclick=&quot;alert('hi')\"></p>"
```

#### URL 注入

如果这个 URL 允许通过 javascript: 执行 JavaScript，即没有进行无害化处理，那么就会有一些潜在的安全问题。可以使用一些库来解决此类问题，比如 [sanitize-url](https://github.com/braintree/sanitize-url)

#### 样式注入 (用户可修改样式)

恶意用户仍然能利用 CSS 进行“点击劫持”，例如，可以在“登录”按钮上方覆盖一个透明的链接。如果用户控制的页面专门仿造了你应用的登录页，那么他们就有可能捕获用户的真实登录信息


除了上面为处理潜在危险提供的建议，我们也建议你熟读下面这些资源：

-   [HTML5 安全手册](https://html5sec.org/)
-   [OWASP 的跨站脚本攻击 (XSS) 防护手册](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

