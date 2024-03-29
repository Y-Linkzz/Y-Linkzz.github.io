# 防抖 和 节流
针对一些 **`执行频率非常高`** 的交互或事件，做性能优化。

## debounce （防抖） 
在一段时间内，函数多次调用，`只执行最后的一次`， `每次调用都新建定时器 `   
有一个等待时长，如果在这个等待时长内，再次调用了函数，就取消上一个定时器，并新建一个定时器

### 常用场景
`input, keyup, keydown` 等事件  
用户搜索  
防止用户按钮多次点击


## throttle （节流）
在一段时间内，函数多次调用，`只执行第一次`，`每次调用不会新建定时器`   
有一个等待时长，每隔一段这个等待时长，函数必须执行一次。如果在这个等待时长内，当前延迟执行没有完成，它会忽略接下来调用该函数的请求，不会去取消上一个定时器

### 常用场景
`scroll, mousemove` 等事件

## resize 事件
-   `debounce` : 用户停止改变浏览器窗口大小时触发，也就是只是在`最后触发一次`
-   `throttle` : 用户改变浏览器窗口大小的过程中，`每隔一段时间触发一次`

## 区别
`throttle` 相对于 `debounce` 的最大区别就是它不会 `取消` 上一次函数的执行


<!-- https://juejin.cn/post/6844903760334946312 -->