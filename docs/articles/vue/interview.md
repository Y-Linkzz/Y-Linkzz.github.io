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


## [getter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)（Vue3 的 ref)
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
Getters 给你一种方法来定义一个对象的属性，但是在访问它们之前不会计算属性的值。getter 延迟计算值的成本，直到需要此值，如果不需要，您就不用支付成本

一种额外的优化技术是用智能 (或称记忆化)getters 延迟属性值的计算并将其缓存以备以后访问。该值是在第一次调用 getter 时计算的，然后被缓存，因此后续访问返回缓存值而不重新计算它。这在以下情况下很有用：

-   如果属性值的计算是昂贵的（占用大量 RAM 或 CPU 时间，产生工作线程，检索远程文件等）。
-   如果现在不需要该值。它将在稍后使用，或在某些情况下它根本不使用。
-   如果被使用，它将被访问几次，并且不需要重新计算，该值将永远不会被改变，或者不应该被重新计算。

## get 与 defineProperty 的区别
在classes中使用时，二者有细微的差别；当使用 get 关键字时，属性将被定义在实例的原型上，当使用Object.defineProperty()时，属性将被定义在实例自身上。

## [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 给现有对象添加 getter setter

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


## 枚举是什么
-   **枚举指对象的属性是否可以遍历出来**，简单点说就是是否可以被列举出来。可枚举性决定了这个属性能否被for…in(Object.keys(o))查找遍历到
-   js中基本包装类型的原型属性是不可枚举的

```js
    var num = new Number();
    for(var pro in num) {
        console.log("num." + pro + " = " + num[pro]);
    }
    // 结果为空，因为Number中内置的属性是不可枚举的
```
-   判断一个属性是否可枚举，用Object.propertyIsEnumerable()来判断，但需要注意的一点是如果需要判断的属性在object的原型链上，不管它是否可枚举，Object.propertyIsEnumerable()都会返回false

```js
    function enumer(){
        this.a = '我是对象本身就有的属性'
    }
    enumer.prototype.b = '我是通过对象原型挂载的属性'
    let fn = new enumer()
    Object.defineProperty(fn,'c',{
        value:'我是通过Object.defineProperty方法添加的可枚举属性',
        enumerable:true
    })
```
1.  for…in循环可以枚举(遍历)出对象本身具有的属性，通过Object.defineProperty()方法加的可枚举属性，或者通过原型对象绑定的可以枚举属性
```js
    for(let pro in fn){
        console.log(pro)
    }  
    /*输出*/
    //a
    //b
    //c
```
2.  Object.keys()方法可以枚举**实例**对象本身的属性和通过Object.defineProperty()添加的可枚举属性，即不会枚举原型链上的属性
```js
    console.log(Object.keys(fn))
    /*输出*/
    //['a','c']
```
3.  JSON.stringify()方法只能序列化**实例**对象本身的属性和通过Object.defineProperty()添加的可枚举属性为JSON对象，即不会序化原型链上的属性
```js
    console.log(JSON.stringify(fn))
    //{"a":"我是对象本身就有的属性","c":"我是通过Object.defineProperty方法添加的可枚举属性"}
```

### js的标准中是没有枚举这一说的,但在typescript中是有这个类型的 

枚举的意思是把所有相关的子数据，都收集起来。例如一个星期里的每一天:
```js
    enum Weekday {
        Monday,
        Tuseday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }
```

## [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) （Vue3 的reactive）

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）