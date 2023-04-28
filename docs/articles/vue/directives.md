# 指令

## v-model

**修饰符**:
-   `.lazy` - 监听 change 事件而不是 input
-   `.number` - 将输入的合法字符串转为数字(该值无法被 parseFloat() 处理，那么将返回原始值;`number` 修饰符会在输入框有 `type="number"` 时自动启用)
-   `.trim` - 移除输入内容两端空格

原生元素
```html
    <input v-model="searchText" />

    <!-- 编译后 -->
    <input
        :value="searchText"
        @input="searchText = $event.target.value"
    />
```

组件上:
```html
    <!-- vue3 --> <!-- 和vue2 `.sync` 修饰符一样 -->
    <CustomInput
        :modelValue="searchText"
        @update:modelValue="newValue => searchText = newValue"
    />
    
    <!-- 更改名字 将 modelValue 改为 title -->
    <MyComponent v-model:title="bookTitle" />

    <!-- vue3内部 -->
    <!-- CustomInput.vue -->
    <script setup>
        import { computed } from 'vue'

        const props = defineProps(['modelValue'])
        const emit = defineEmits(['update:modelValue'])

        // 另一种方式
        const value = computed({
            get() {
                return props.modelValue
            },
            set(value) {
                emit('update:modelValue', value)
            }
        })
    </script>

    <template>
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />

        <!-- 另一种方式 -->
        <input v-model="value" />
    </template>


    <!-- vue2 -->
    <!-- 默认会利用名为 value 的 prop 和名为 input 的事件 -->
    <CustomInput
        :value="searchText"
        @input="searchText = $event.target.value"
    />

    <!-- vue2内部 -->
    <script>
        export default {
            model: {
                prop: 'checked', // 将prop的value换成checked
                event: 'change' // 将input事件换成change
            },
            props: {
                checked: Boolean
            },
            template: `
                <input
                type="checkbox"
                v-bind:checked="checked"
                v-on:change="$emit('change', $event.target.checked)"
                >
            `
        }
    </script>
```

### 多个 v-model 绑定
```html
    <UserName
        v-model:first-name="first"
        v-model:last-name="last"
    />
    
    <!-- 在vue2里 -->
    <UserName
        first-name.sync="first"
        last-name.sync="last"
    />
```

### 自定义 v-model 修饰符
组件的 `v-mode`l 上所添加的`修饰符`，可以通过 `modelModifiers` `prop` 在组件内访问到
```html
    <!-- 输入的字符串值第一个字母转为大写 -->
    <MyComponent v-model.capitalize="myText" />

    <!-- 更换名字 arg + "Modifiers" -->
    <MyComponent v-model:title.capitalize="myText">

    <script setup>
        // title
        // const props = defineProps(['title', 'titleModifiers'])
        const props = defineProps({
            modelValue: String,
            modelModifiers: { default: () => ({}) }
        })

        defineEmits(['update:modelValue'])

        function emitValue(e) {
            let value = e.target.value
            if (props.modelModifiers.capitalize) {
                value = value.charAt(0).toUpperCase() + value.slice(1)
            }
            emit('update:modelValue', value)
        }
    </script>

    <template>
     <input type="text" :value="modelValue" @input="emitValue" />
    </template>
```


## v-pre
跳过该元素及其所有子元素的编译  
元素内具有 `v-pre`，所有 Vue 模板语法都会被**保留并按原样渲染**。最常见的用例就是显示原始双大括号标签及内容。


## v-once
仅渲染元素和组件一次，并跳过之后的更新

在随后的`重新渲染`，元素/组件及其所有子项将被当作静态内容并跳过渲染。这可以用来优化`更新时的性能`。

一些静态数据, 切换tab。
```html
    <!-- 单个元素 -->
    <span v-once>This will never change: {{msg}}</span>
    <!-- 带有子元素的元素 -->
    <div v-once>
        <h1>comment</h1>
        <p>{{msg}}</p>
    </div>
    <!-- 组件 -->
    <MyComponent v-once :comment="msg" />
    <!-- `v-for` 指令 -->
    <ul>
        <li v-for="i in list" v-once>{{i}}</li>
    </ul>
```

## v-memo (3.2+)
**有助于渲染海量 v-for 列表**  
缓存一个模板的子树。`v-memo="[]"与 v-once 效果相同`
```html
    <!-- 当搭配 v-for 使用 v-memo，确保两者都绑定在同一个元素上。v-memo 不能用在 v-for 内部。 -->
    <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
        <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
        <p>...more child nodes</p>
    </div>
```

## v-cloak
“未编译模板闪现”的情况：用户可能**先看到**的是还没编译完成的**双大括号标签**，直到挂载的组件将它们替换为实际渲染的内容。  

`v-cloak` 会保留在所绑定的元素上，直到相关组件**实例被挂载后才移除**。  
`[v-cloak] { display: none }` 这样的 CSS 规则，它可以在组件**编译完毕前隐藏原始模板**。

