# Vue Api [學習源碼](https://github.com/cuixiaorui/mini-vue)

## nextTick()
当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。


## setup()  组合式 API
通常只在以下情况下使用：
1. 需要在非单文件组件中使用组合式 API 时。
2. 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时。

```html
    <script>
    import { ref } from 'vue'

    export default {
    setup() {
        const count = ref(0)

        // 返回值会暴露给模板和其他的选项式 API 钩子
        return {
        count
        }
    },

    mounted() {
        console.log(this.count) // 0
    }
    }
    </script>

    <template>
    <button @click="count++">{{ count }}</button>
    </template>
```
在模板中访问从 `setup` 返回的 `ref` 时，它会`自动浅层解包`，因此你无须**再在模板中为它写 .value**。当通过 this 访问时也会同样如此解包。

`setup()` **自身并不含对组件实例的访问权**，即在 `setup()` 中访问 `this` 会是 `undefined`。你可以在选项式 API 中访问组合式 API 暴露的值，但反过来则不行。

`setup()` **应该同步地返回一个对象**。唯一可以使用 async setup() 的情况是，该组件是 Suspense 组件的后裔。

### 访问 Props

`setup` 函数的第一个参数是组件的 `props`。和标准的组件一致，一个 `setup` 函数的 `props` 是**响应式的**，并且会在传入新的 props 时同步更新。

请注意如果你解构了 `props` 对象，**解构出的变量将会丢失响应性**。因此我们推荐通过 props.xxx 的形式来使用其中的 props。

### Setup 上下文
```js
    export default {
        setup(props, context) {
            // 透传 Attributes（非响应式的对象，等价于 $attrs）
            console.log(context.attrs)

            // 插槽（非响应式的对象，等价于 $slots）
            console.log(context.slots)

            // 触发事件（函数，等价于 $emit）
            console.log(context.emit)

            // 暴露公共属性（函数）
            console.log(context.expose)
        }
    }

    // 该上下文对象是非响应式的，可以安全地解构：
    export default {
        setup(props, { attrs, slots, emit, expose }) {
            ...
        }
    }
```
`attrs` 和 `slots` 都是有状态的对象，它们总是会随着组件自身的更新而更新。这意味着你**应当避免解构它们**，并始终通过 `attrs.x` 或 `slots.x` 的形式使用其中的属性。此外还需注意，和 props 不同，**attrs 和 slots 的属性都不是响应式的**。如果你想要基于 attrs 或 slots 的改变来执行副作用，那么你应该在 `onBeforeUpdate` 生命周期钩子中编写相关逻辑。

### 暴露公共属性
`expose` 函数用于显式地限制该组件暴露出的属性，当父组件通过模板引用访问该组件的实例时，将仅能访问 `expose` 函数暴露出的内容
```js
    export default {
        setup(props, { expose }) {
            // 让组件实例处于 “关闭状态”
            // 即不向父组件暴露任何东西
            expose()

            const publicCount = ref(0)
            const privateCount = ref(0)
            // 有选择地暴露局部状态
            expose({ count: publicCount })
        }
    }
```

### 与渲染函数一起使用
`setup` 也可以返回一个**渲染函数**，此时在渲染函数中可以直接使用在同一作用域下声明的响应式状态：
```js
    import { h, ref } from 'vue'

    export default {
        setup() {
            const count = ref(0)
            return () => h('div', count.value)
        }
    }
```
返回一个渲染函数将会阻止我们返回其他东西。对于组件内部来说，这样没有问题，但**如果我们想通过模板引用将这个组件的方法暴露给父组件，那就有问题了**。

我们可以通过调用 `expose()` 解决这个问题：
```js
    import { h, ref } from 'vue'

    export default {
        setup(props, { expose }) {
            const count = ref(0)
            const increment = () => ++count.value

            expose({
                increment
            })

            return () => h('div', count.value)
        }
    }
```

## ref()
`ref` 对象是可更改的，也就是说你可以为 .value 赋予新的值。它也是响应式的，即所有对 .value 的操作都将被追踪，并且写操作会触发与之相关的副作用。  

如果将一个`对象`赋值给 `ref`，那么这个`对象`将通过 **reactive() 转为具有深层次响应式的对象**。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包。  

若要避免这种深层次的转换，请使用 [shallowRef()](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 来替代。

**什么是解包**：被访问或更改时, 不需要使用 .value

### ref 在模板中的解包
```html
    <script setup>
    import { ref } from 'vue'

    const count = ref(0)

    function increment() {
        count.value++
    }
    </script>

    <template>
        <button @click="increment">
            {{ count }} <!-- 无需 .value -->
        </button>
    </template>
```

请注意，仅当 `ref` 是**模板渲染上下文**的**顶层属性**时才适用自动“**解包**”。 例如， `object` 是**顶层属性**，但 `object.foo` 不是。
```html
    <script setup>
    import { ref } from 'vue'

    const object = { foo: ref(1) }

    // 我们可以通过将 foo 改成顶层属性来解决这个问题：
    const { foo } = object

    </script>

    <template>
        <p>
            <!-- 不会像预期的那样工作，渲染的结果会是一个 [object Object]1，  
            因为 object.foo 是一个 ref 对象。 -->
            {{ object.foo + 1 }} 

            <!-- 如果一个 ref 是文本插值（即一个 {{ }} 符号）计算的最终值，  
            它也将被解包。因此下面的渲染结果将为 1： -->
            {{ object.foo }}  // 相当于 {{ object.foo.value }}

            {{ foo + 1 }} // 结果为 2
        </p>
    </template>
```

### ref 响应式对象中的解包
当一个 `ref` 被**嵌套在一个响应式对象中**，作为**属性被访问或更改时**，它会**自动解包**，因此会表现得和一般的属性一样：
```js
    const count = ref(0)
    const state = reactive({
        count
    })

    console.log(state.count) // 0

    state.count = 1
    console.log(count.value) // 1
```
只有当**嵌套在一个深层响应式对象内时**，才会发生 `ref` **解包**。当其作为**浅层响应式对象**(`shallowReactive`)的属性被访问时不会解包。

### 数组和集合类型的 ref 解包
当 `ref` 作为`响应式数组`或像 `Map` 这种原生集合类型的元素被访问时，**不会进行解包**。
```js
    const books = reactive([ref('Vue 3 Guide')])
    // 这里需要 .value
    console.log(books[0].value)

    const map = reactive(new Map([['count', ref(0)]]))
    // 这里需要 .value
    console.log(map.get('count').value)
```


## reactive()
返回一个对象的响应式代理。  
响应式转换是“深层”的：**它会影响到所有嵌套的属性**。一个响应式对象也将深层地`解包任何 ref 属性`，同时保持响应性。  

访问到`某个响应式数组`或 `Map` 这样的原生集合类型中的 `ref` 元素时，**不会执行 ref 的解包**。

若要**避免深层响应式转换**，只想**保留对这个对象顶层次访问的响应性**，请使用 `shallowReactive()` 作替代。 

返回的对象以及其中嵌套的对象都会通过 `ES Proxy` 包裹，因此**不等于源对象**，**建议只使用响应式代理**，避免使用原始对象。

## readonly()
接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回**一个原值的只读代理**。  
**只读代理是深层的**：对任何嵌套属性的访问都将是只读的。它的 `ref` 解包行为与 `reactive()` 相同，但解包得到的值是**只读**的  
要避免深层级的转换行为，请使用 `shallowReadonly()` 作替代。


## computed()
接受一个 getter 函数，**返回一个只读的响应式 `ref`对象**。它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。


只读的计算属性 ref：
```js
    const count = ref(1)
    const plusOne = computed(() => count.value + 1)

    console.log(plusOne.value) // 2

    plusOne.value++ // 错误
```

可写的计算属性 ref：
```js
    const count = ref(1)
    const plusOne = computed({
        get: () => count.value + 1,
        set: (val) => {
            count.value = val - 1
        }
    })

    plusOne.value = 1
    console.log(count.value) // 0
```

## watch()
侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。  
`watch()` 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。
第一个参数是侦听器的源。这个来源可以是以下几种：
-   一个函数(getter 函数)，返回一个值
-   一个 ref (包括计算属性)
-   一个响应式对象
-   或是由以上类型的值组成的数组

**你不能直接侦听响应式对象的属性值**，例如:
```js
    const obj = reactive({ count: 0 })

    // 错误，因为 watch() 得到的参数是一个 number
    watch(obj.count, (count) => {
    console.log(`count is: ${count}`)
    })
```

直接给 `watch()` 传入一个**响应式对象**，会**隐式地创建一个深层侦听器**——该回调函数在所有嵌套的变更时都会被触发：
```js
    const obj = reactive({ count: 0 })

    watch(obj, (newValue, oldValue) => {
    // 在嵌套的属性变更时触发
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // 因为它们是同一个对象！
    })

    obj.count++

    // 相比之下，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调：
    watch(
        () => state.someObject,
        () => {
            // 仅当 state.someObject 被替换时触发
        }
    )

    watch(
        () => state.someObject,
        (newValue, oldValue) => {
            // 侦听的是对象 newValue === oldValue
            // 注意：`newValue` 此处和 `oldValue` 是相等的
            // *除非* state.someObject 被整个替换了
        },
        { deep: true } // 强制转成深层侦听器, 谨慎使用
    )
    // 深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。  
    // 因此请只在必要时才使用它，并且要留意性能。

    // 当直接侦听一个响应式对象时，侦听器会自动启用深层模式：
    const state = reactive({ count: 0 })
    watch(state, () => {
    /* 深层级变更状态所触发的回调 */
    })

    // 当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值：
    watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
    })

    // 副作用清理：
    watch(id, async (newId, oldId, onCleanup) => {
        const { response, cancel } = doAsyncWork(newId)
        // 当 `id` 变化时，`cancel` 将被调用，
        // 取消之前的未完成的请求
        onCleanup(cancel)
        data.value = await response
    })
```

## watchEffect() 
立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。(立即执行是为了追踪依赖)
-   **多个依赖项**时，使用；
-   **需要侦听一个嵌套数据结构中的几个属性**（比深度侦听器更有效，它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。）
-   如果在**异步回调**创建一个侦听器，它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如下方这个例子：
```html
    <script setup>
    import { watchEffect } from 'vue'

    // 它会自动停止
    watchEffect(() => {})

    // ...这个则不会！
    setTimeout(() => {
    watchEffect(() => {})
    }, 100)


    // 需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，  
    // 你可以使用条件式的侦听逻辑：

    // 需要异步请求得到的数据
    const data = ref(null)

    watchEffect(() => {
        if (data.value) {
            // 数据加载后执行某些操作...
        }
    })
    </script>
```

::: tip
`watchEffect` 仅会在其同步执行期间，才追踪依赖。在使用**异步回调**时，  
只有在**第一个 await 正常工作前**访问到的属性才会被追踪。（即异步里的属性不会被追踪）
:::


**第一个参数就是要运行的副作用函数**。这个副作用函数的参数也是一个函数，用来注册清理回调。
`清理回调`会在该`副作用下一次执行前被调用`，可以**用来清理无效的副作用**   

**第二个参数是一个可选的选项**，可以用来**调整副作用的刷新时机**或**调试副作用的依赖**。  

副作用清除：
```js
    watchEffect(async (onCleanup) => {
        const { response, cancel } = doAsyncWork(id.value)
        // `cancel` 会在 `id` 更改时调用
        // 以便取消之前
        // 未完成的请求
        onCleanup(cancel) // 第一次执行不会调用，下一次执行前被调用
        data.value = await response
    })
```

停止侦听器：
```js
    const stop = watchEffect(() => {})

    // 当不再需要此侦听器时:
    stop()
```

**回调的触发时机**: 当你更改了响应式状态，它可能会**同时触发** `Vue 组件更新`和`侦听器回调`。
默认情况下，用户创建的`侦听器回调`，都会在 `Vue 组件更新`之前被调用。
选项：
```js
    watchEffect(() => {}, {
        flush: 'post', // 使侦听器延迟到组件渲染之后再执行
        flush: 'sync', // 响应式依赖发生改变时立即触发侦听器
        onTrack(e) {
            debugger
        },
        onTrigger(e) {
            debugger
        }
    })

    watchPostEffect(() => {
        /* 在 Vue 更新后执行 */
    })

    watchSyncEffect(() => {
        /* 响应式依赖发生改变时立即触发侦听器 */
    })
```
## watch vs. watchEffect
watch 和 watchEffect 都能**响应式地执行有副作用的回调**，都享有相同的刷新时机和调试选项

-   watch默认是懒侦听的（侦听源发生变化时才执行回调函数），watchEffect是立即执行的（这么做事为了追踪响应式属性）
-   watch可以更明确是哪个状态触发的侦听器；watchEffect 不那么明确
-   watch可以访问所侦听状态的新值和旧值


## 响应式 API：工具函数

### isRef() : 检查某个值是否为 ref。

### unref()
如果参数是 ref，则返回内部值，否则返回参数本身;  
这是 `val = isRef(val) ? val.value : val` 计算的一个**语法糖**

### toRef()
基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

**即使源属性当前不存在**，`toRef()` 也会返回一个**可用的** `ref`。这让它在处理**可选 props 的时候格外实用**，相比之下 `toRefs` 就不会为可选 props 创建对应的 refs。
```js
    const state = reactive({
        foo: 1,
        bar: 2
    })

    const fooRef = toRef(state, 'foo')

    // 更改该 ref 会更新源属性
    fooRef.value++
    console.log(state.foo) // 2

    // 更改源属性也会更新该 ref
    state.foo++
    console.log(fooRef.value) // 3


    // 请注意，这不同于：
    const fooRef = ref(state.foo)
    // 上面这个 ref 不会和 state.foo 保持同步，因为这个 ref() 接收到的是一个纯数值。
```

### toRefs()  ： `响应式对象` 可以解构/展开返回的对象而不会失去响应性 (组合式函数)
将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。  

`toRefs` 在调用时只会为源对象上**可以枚举的属性**创建 ref。如果要为可能还**不存在的属性**创建 `ref`，请改用 `toRef`。

```js
    const state = reactive({
        foo: 1,
        bar: 2
    })

    const stateAsRefs = toRefs(state)
    /*
    stateAsRefs 的类型：{
    foo: Ref<number>,
    bar: Ref<number>
    }
    */

    // 这个 ref 和源属性已经“链接上了”
    state.foo++
    console.log(stateAsRefs.foo.value) // 2

    stateAsRefs.foo.value++
    console.log(state.foo) // 3
```

组合式函数例子:
```js
    function useFeatureX() {
        const state = reactive({
            foo: 1,
            bar: 2
        })

        // ...基于状态的操作逻辑

        // 在返回时都转为 ref
        return toRefs(state)
    }

    // 可以解构而不会失去响应性
    const { foo, bar } = useFeatureX()
```

### isProxy()
检查一个对象是否是由 `reactive()`、`readonly()`、`shallowReactive()` 或 `shallowReadonly()` 创建的代理。

### isReactive()
检查一个对象是否是由 `reactive()` 或 `shallowReactive()` 创建的代理。

### isReadonly()
通过 `readonly()` 和 `shallowReadonly()` 创建的代理都是只读的，因为他们是没有 `set` 函数的 `computed()` ref。

### shallowRef()  用于处理庞大的列表数据
`浅层ref` 的**内部值将会原样存储和暴露**，并且**不会被深层递归地转为响应式**。只有对 `.value` 的访问是响应式的。

```js
    const state = shallowRef({ count: 1 })

    // 不会触发更改
    state.value.count = 2

    // 会触发更改
    state.value = { count: 2 }
```

### triggerRef()
强制触发依赖于一个`浅层 ref` 的副作用，这通常在对浅引用的内部值进行深度变更后使用。
```js
    const shallow = shallowRef({
        greet: 'Hello, world'
    })

    // 触发该副作用第一次应该会打印 "Hello, world"
    watchEffect(() => {
        console.log(shallow.value.greet)
    })

    // 这次变更不应触发副作用，因为这个 ref 是浅层的
    shallow.value.greet = 'Hello, universe'

    // 打印 "Hello, universe"
    triggerRef(shallow)
```

### customRef() 防抖
创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

```js
    import { customRef } from 'vue'

    export function useDebouncedRef(value, delay = 200) {
        let timeout
        return customRef((track, trigger) => {
            return {
                get() {
                    track()
                    return value
                },
                set(newValue) {
                    clearTimeout(timeout)
                    timeout = setTimeout(() => {
                        value = newValue
                        trigger()
                    }, delay)
                }
            }
        })
    }
```
在组件中使用：
```html
    <script setup>
    import { useDebouncedRef } from './debouncedRef'
    const text = useDebouncedRef('hello')
    </script>

    <template>
        <input v-model="text" />
    </template>
```

### shallowReactive()
`reactive()` 的浅层作用形式。  
一个浅层响应式对象里**只有根级别的属性是响应式的**。属性的值会被原样存储和暴露，这也意味着值为 `ref` 的属性**不会被自动解包了**。


### markRaw()  例如复杂的第三方类实例或 Vue 组件对象，不需要代理
将一个对象标记为不可被转为代理。返回该对象本身。  

### effectScope()
**创建一个 effect 作用域**，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样**捕获到的副作用可以一起处理**。
```js
    const scope = effectScope()

    scope.run(() => {
        const doubled = computed(() => counter.value * 2)

        watch(doubled, () => console.log(doubled.value))

        watchEffect(() => console.log('Count: ', doubled.value))
    })

    // 处理掉当前作用域内的所有 effect
    scope.stop()
```

## 生命周期钩子

### onServerPrefetch()
如果这个钩子返回了一个 Promise，服务端渲染会在渲染该组件前等待该 Promise 完成。  
这个钩子仅会在**服务端渲染中执行**，可以用于执行一些仅存在于**服务端的数据抓**取过程。

## 依赖注入

### provide() 依赖
当使用 TypeScript 时，key 可以是一个被类型断言为 InjectionKey 的 symbol。
```js
    import { provide, inject } from 'vue'
    import type { InjectionKey } from 'vue'

    const key = Symbol() as InjectionKey<string>

    provide(key, 'foo') // 若提供的是非字符串值会导致错误

    const foo = inject(key) // foo 的类型：string | undefined
```

### inject()

第一个参数是注入的 key。**Vue 会遍历父组件链，通过匹配 key 来确定所提供的值**。如果父组件链上**多个组件对同一个 key 提供了值**，那么离得**更近的组件**将会“**覆盖**”链上更远的**组件所提供的值**。如果没有能通过 key 匹配到值，inject() 将返回 undefined，除非提供了一个默认值。

```js
    import { inject } from 'vue'
    import { fooSymbol } from './injectionSymbols'
    // 注入值的默认方式
    const foo = inject('foo')

    // 注入响应式的值
    const count = inject('count')

    // 通过 Symbol 类型的 key 注入
    const foo2 = inject(fooSymbol)

    // 注入一个值，若为空则使用提供的默认值
    const bar = inject('foo', 'default value')

    // 注入一个值，若为空则使用提供的工厂函数
    const baz = inject('foo', () => new Map())

    // 注入时为了表明提供的默认值是个函数，需要传入第三个参数
    const fn = inject('function', () => {}, false)
```

## 状态选项 this.$data
该函数应当返回一个普通 JavaScript 对象，Vue 会将它转换为响应式对象。实例创建后，可以通过 `this.$data` 访问该响应式对象。组件实例也代理了该数据对象上所有的属性，因此 `this.a` 等价于 `this.$data.a`。

以 `_` 或 `$` 开头的属性将**不会**被组件实例代理，因为它们可能和 Vue 的内置属性、API 方法冲突。你必须以 `this.$data._property` 的方式访问它们。  

**不**推荐返回一个可能改变自身状态的对象，如浏览器 API 原生对象或是带原型的类实例等。理想情况下，返回的对象应是一个纯粹代表组件状态的普通对象。

## Boolean 类型转换
为了更贴近原生 boolean attributes 的行为，声明为 `Boolean` 类型的 props 有特别的类型转换规则。

```js
    <!-- 等同于传入 :disabled="true" -->
    <MyComponent disabled /> // 例子1

    <!-- 等同于传入 :disabled="false" -->
    <MyComponent />

    defineProps({
        disabled: [Boolean, Number]
    })
    // 无论声明类型的顺序如何，Boolean 类型的特殊转换规则都会被应用。(这个是官网写的)


    defineProps({
        disabled: [String, Boolean]
    })
    // 例子1 结果为 ''

    defineProps({
        disabled: [Boolean, String]
    })
    // 例子1 结果为 true

    // 可以看出如果有String类型，顺序还是有关系的
    
```
<Demo disabled />

<script setup>
import Demo from '../../../compoment/demo.vue'
</script>
