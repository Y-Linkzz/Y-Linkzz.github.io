# 响应式系统

```js
    let A0 = 1
    let A1 = 2
    let A2
    function update() {
        A2 = A0 + A1
    }
```
-   `update()` 函数会产生一个**副作用**，或者简称为**作用** (effect),因为它会更改程序里的状态。
-   `A0` 和 `A1` 被视为这个作用的**依赖** (dependency)，因为它们的值被用来执行这个作用。因此这次作用也可以说是一个它依赖的**订阅者** (subscriber)。

`whenDepsChange(update)` : 我们需要一个魔法函数，能够在 `A0` 或 `A1` (这两个**依赖**) 变化时调用 `update()` (产生**作用**)

`whenDepsChange()` 函数有如下的任务: 
1.  **当一个变量被读取时进行追踪**。例如我们执行了表达式 A0 + A1 的计算，则 A0 和 A1 都被读取到了。
2.  **如果一个变量在当前运行的副作用中被读取了，就将该副作用设为此变量的一个订阅者**。例如由于 `A0` 和 `A1` 在 `update()` 执行时被访问到了，则 `update()` 需要在第一次调用之后成为 A0 和 A1 的订阅者。
3.  **探测一个变量的变化**。例如当我们给 `A0` 赋了一个新的值后，应该通知其所有订阅了的副作用重新执行。

## 响应性是如何工作的
我们**无法直接追踪对上述示例中局部变量的读写**，原生 JavaScript 没有提供任何机制能做到这一点。但是，我们是可以追踪**对象属性的读写的**。

```js
    function reactive(obj) {
        return new Proxy(obj, {
            get(target, key) {
            track(target, key)
            return target[key]
            },
            set(target, key, value) {
            target[key] = value
            trigger(target, key)
            }
        })
    }

    function ref(value) {
        const refObject = {
            get value() {
            track(refObject, 'value')
            return value
            },
            set value(newValue) {
            value = newValue
            trigger(refObject, 'value')
            }
        }
        return refObject
    }
```

在 `track()`(**追踪**) 内部，我们会**检查当前是否有正在运行的副作用**。如果有，我们会查找到一个存储了所有追踪了该属性的订阅者的 Set，然后将当前这个副作用作为新订阅者添加到该 Set 中。
```js
    // 这会在一个副作用就要运行之前被设置
    // 我们会在后面处理它
    let activeEffect

    function track(target, key) {
        if (activeEffect) {
            const effects = getSubscribersForProperty(target, key)
            effects.add(activeEffect)
        }
    }
```

在 `trigger()`(**触发**) 之中，我们会再查找到该属性的所有订阅副作用。但这一次我们需要执行它们：

```js
    function trigger(target, key) {
        const effects = getSubscribersForProperty(target, key)
        effects.forEach((effect) => effect())
    }
```


**响应式副作用**： 一个能自动跟踪其依赖的副作用，它会在任意依赖被改动时重新运行
```js
    // watchEffect() 的简化版
    function whenDepsChange(update) {
        // update 要运行的函数

        // 创建一个副作用
        const effect = () => {
            activeEffect = effect // 存放当前的副作用
            update() 
            // 当执行函数时，变量被读取时进行追踪，track（）会被执行  
            // 根据 activeEffect，定位到这个当前活跃的副作用，然后被存储在副作用集合里
            activeEffect = null
        }
        effect()
    }

    // 例子
    import { ref, watchEffect } from 'vue'
    const A0 = ref(0)
    const A1 = ref(1)
    const A2 = ref()

    watchEffect(() => {
        // 追踪 A0 和 A1
        A2.value = A0.value + A1.value
    })

    // 将触发副作用
    A0.value = 2
```


## [运行时 vs. 编译时响应性](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#runtime-vs-compile-time-reactivity)

Vue 的响应式系统基本是基于运行时的。追踪和触发都是在浏览器中运行时进行的。运行时响应性的优点是，它可以在没有构建步骤的情况下工作，而且边界情况较少。另一方面，这使得它**受到了 JavaScript 语法的制约**，导致需要使用一些例如 Vue `ref` 这样的值的容器。  

(已废弃)响应性语法糖: 编译时响应性  

一些框架，如 Svelte，选择通过编译时实现响应性来克服这种限制。它**对代码进行分析和转换，以模拟响应性**。该编译步骤允许框架改变 JavaScript 本身的语义——例如，隐式地注入执行依赖性分析的代码，以及围绕对本地定义的变量的访问进行作用触发。这样做的**缺点是，该转换需要一个构建步骤**，而改变 JavaScript 的语义实质上是在创造一种新语言，看起来像 JavaScript 但编译出来的东西是另外一回事。


下面的ref，不需要通过.value进行设值，不受JavaScript 语法的制约
```html
    <script setup>
    let count = $ref(0)

    console.log(count)

    function increment() {
        count++
    }
    </script>
```

## 响应性调试
Vue 的响应性系统可以自动跟踪依赖关系，但在某些情况下，我们可能希望确切地知道正在跟踪什么，或者是什么导致了组件重新渲染。

### 组件调试钩子
`onRenderTracked` 查看哪些依赖正在被使用  
`onRenderTriggered` 确定哪个依赖正在触发更新  
**组件调试钩子仅会在开发模式下工作**
```html
    <script setup>
    import { onRenderTracked, onRenderTriggered } from 'vue'

    onRenderTracked((event) => {
        debugger
    })

    onRenderTriggered((event) => {
        debugger
    })
    </script>
```

### 计算属性调试
```js
    const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
        // 当 count.value 被追踪为依赖时触发
        debugger
    },
    onTrigger(e) {
        // 当 count.value 被更改时触发
        debugger
    }
    })

    // 访问 plusOne，会触发 onTrack
    console.log(plusOne.value)

    // 更改 count.value，应该会触发 onTrigger
    count.value++
```

## 响应式的本质
``函数与数据的关联``

`函数`: 被监控的函数（vue2的watcher; vue3的render[模板里]、watchEffect、computed、watch）  
`数据`：响应式数据 && 必须在函数中用到

```js

    const doubleCount = ref(0)
    watchEffect(()=>{
        doubleCount.value = props.count * 2   
        // props是响应式数据，当它改变时，会重新调用函数
    })


    function useDouble(count){
        const doubleCount = ref(count * 2)
        watchEffect(()=>{
            doubleCount.value = count * 2   
            // props才是响应式数据，count不是响应式数据
        })
        return doubleCount
    }
    const doubleCount = useDouble(props.count)   
    // doubleCount 不会改变； 改法：将整个props传入
```