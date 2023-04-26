# 生命周期

## 生命周期图示
![](lifecycle.png)

## beforeCreate
在组件实例初始化完成之后立即调用。

会在**实例初始化完成**、**props 解析之后**、data() 和 computed 等选项处理之前立即调用。

`注意`，组合式 `API` 中的 `setup()` 钩子会在`所有选项式 API 钩子之前调用`，beforeCreate() 也不例外。

## created / 
当这个钩子被调用时，以下内容已经设置完成：`响应式数据`、`计算属性`、`方法和侦听器`。然而，此时挂载阶段还未开始，因此 `$el` 属性仍不可用。

## beforeMount / onBeforeMount()
**这个钩子在服务端渲染时不会被调用**  

## mounted / onMounted()
**这个钩子在服务端渲染时不会被调用**

## beforeUpdate / onBeforeUpdate()
**这个钩子在服务端渲染时不会被调用**
