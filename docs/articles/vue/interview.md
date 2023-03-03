# Vue的知识分享

## Vue2 与 Vue3
-   **更好的逻辑复用**: 在选项式 API 中我们主要的逻辑复用机制是 mixins, 组合式 API 解决了 [mixins 的所有缺陷](https://cn.vuejs.org/guide/reusability/composables.html#comparisons-with-other-techniques)
-   **更灵活的代码组织**: 在多个逻辑关注点中，选项式 API 将相同逻辑关注点的代码被强制拆分在了不同的选项中，在一个几百行的大组件中，要读懂代码中的一个逻辑关注点，需要在文件中反复上下滚动；组合式 API 可将一个逻辑关注点抽取重构到一个可复用的工具函数中，一个逻辑关注点相关的代码被归为了一组。如果需要重构，不再需要为了抽象而重新组织代码，大大降低了重构成本，这在长期维护的大型项目中非常关键。(适合大项目)
-   **更好的类型推导**: 选项式 API 需要通过复杂的类型体操或者Class API 来实现类型推导；组合式 API 主要利用基本的变量和函数，它们本身就是类型友好的；
-   **更小的生产包体积**： 选项式 API 需要依赖 this 上下文对象访问属性；组合式 API 因为`<script setup>` 形式书写的组件模板被编译为了一个内联函数，和 `<script setup>` 中的代码位于同一作用域。 被编译的模板可以直接访问 `<script setup>` 中定义的变量，无需从实例中代理。这对代码压缩更友好，因为本地变量的名字可以被压缩，但对象的属性名则不能。


## [组合式 API 与 React Hooks 的对比](https://cn.vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks)
React Hooks 是组合式 API 的一个主要灵感来源


## 什么是响应性
本质上，响应性是一种可以使我们声明式地处理变化的编程范式


## [getter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)
get 语法将 **对象属性** 绑定到 **查询该属性时** 将 **被调用的函数**。

描述: 有时需要允许访问返回动态计算值的属性，或者你可能需要反映内部变量的状态，而不需要使用显式方法调用

```js
    const obj = {
    log: ['a', 'b', 'c'],
    get latest() {
        return this.log[this.log.length - 1];
    }
    };

    console.log(obj.latest);
    // Expected output: "c"
```

## [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

Object.defineProperty(obj, prop, descriptor)

参数
-   obj: 要定义属性的对象。
-   prop: 要定义或修改的属性的名称或 Symbol 。
-   descriptor: 要定义或修改的**属性描述符**。

属性描述符有两种主要形式: **数据描述符**和**存取描述符**

**一个描述符只能是这两者其中之一；不能同时是两者。**

-   **数据描述符**: 是一个具有值的属性，该值可以是可写的，也可以是不可写的。
可选键值： value （该属性对应的值）； writable （是否可以被更改）
-   **存取描述符**：是由 getter 函数和 setter 函数所描述的属性
可选键值: get； set

这些选项不一定是自身属性，也要考虑继承来的属性。为了确认保留这些默认值，在设置之前，可能要冻结(Object.freeze) `Object.prototype`，明确指定所有的选项，或者通过 `Object.create(null)` 将 `Object.prototype.__proto__` 属性指向 null

**Object.freeze 可以防止后续代码添加或删除对象原型的属性。Vue运用场景：不想让某个对象有响应式，减少性能的消耗**
