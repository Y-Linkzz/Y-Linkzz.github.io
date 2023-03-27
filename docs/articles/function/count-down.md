# 倒计时 （秒杀）

## [减少使用setInterval、setTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout)
-    js 是单线程执行，由于宏任务与微任务，会推迟定时器的执行，倒计时的时间越长，误差就会越大
-    虽然可以通过上次执行的时间来校准，但是使用的是本地时间，用户可更改

## [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)
requestAnimationFrame也属于执行是异步执行的方法，但该方法既不属于宏任务，也不属于微任务
屏幕刷新率是 60Hz,那么回调函数就每 16.7ms 被执行一次。刷新率是 75Hz，那么这个时间间隔就变成了 1000/75=13.3ms。
它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

**为了提高性能和电池寿命，因此在大多数浏览器里，当requestAnimationFrame() 运行在后台标签页或者隐藏的`<iframe>` 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。**

## [当前标签页或移动端被置于后台时，计时器均会被挂起或者变慢，导致重新回来后的计时器出错](https://developer.chrome.com/blog/background_tabs/)

-   **减慢其计时器以节省性能** ：未被激活的 tab 中定时器的最小延时限制为 1S(1000ms) ，比如：setInterval / setTimeout 大约 5-50 毫秒的精度运行时，切换 TAB 或最小化浏览器窗口，这些计时器会减慢很多，会变为每 1000 毫秒左右运行一次。requestAnimationFrame 不会再调用。**特殊例子：播放音频的页面被认为是用户可见的，并且不受后台计时器限制**

### 解决方案：document.visibilityState

监听document.visibilityState，重新获取最新的时间来倒计时

## setTimeout() / setInterval() 的每调用一次定时器的最小间隔是 4ms 
最大延时值 : 包括 IE、Chrome、Safari、Firefox 在内的浏览器其内部以 32 位带符号整数存储延时。这就会导致如果一个延时 (delay) 大于 2147483647 毫秒 (大约 24.8 天) 时就会溢出，导致定时器将会被立即执行。
