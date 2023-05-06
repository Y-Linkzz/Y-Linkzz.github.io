# Promises Async Await

## Promises

## [面试](https://juejin.cn/post/6850037281206566919)
1. Promise 解决了什么问题？
2. Promise 的业界实现都有哪些？
3. Promise 常用的 API 有哪些？
4. 能不能手写一个符合 Promise/A+ 规范的 Promise?
5. Promise 在事件循环中的执行过程是怎样的？
6. Promise 有什么缺陷，可以如何解决？

### Promise 出现的原因

在传统的异步编程中，如果**异步之间存在依赖关系**，就需要**通过层层嵌套回调的方式满足这种依赖**，如果**嵌套层数过多**，**可读性和可以维护性都会变得很差**，产生所谓的“**回调地狱**”，而 Promise 将嵌套调用改为**链式调用**，增加了**可阅读性和可维护性**。也就是说，Promise 解决的是**异步编码风格的问题**。

### Promise 的业界实现都有哪些呢
实现 Promise 的类库有 `bluebird`、`Q`、`ES6-Promise`。

### 手写 Promise
Promise 的基本特征：
1.  promise 有三个状态：`pending`，`fulfilled`，or `rejected` 「规范 Promise/A+ 2.1」
2.  `new promise`时， 需要传递一个`executor()`执行器，**执行器立即执行**；
3.  executor接受两个参数，分别是resolve和reject；
4.  promise 的默认状态是 `pending`；
5.  promise 有一个`value`保存成功状态的值，可以是`undefined`/`thenable`/`promise`；「规范 Promise/A+ 1.3」
6.  promise 有一个`reason`保存**失败状态的值**；「规范 Promise/A+ 1.5」
7.  promise 只能从`pending`到`rejected`, 或者从`pending`到`fulfilled`，状态一旦确认，就**不会再改变**；
8.  promise 必须有一个`then`方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」
9.  如果调用 `then` 时，promise 已经成功，则执行`onFulfilled`，参数是`promise`的`value`；
10. 如果调用 `then` 时，promise 已经失败，那么执行`onRejected`, 参数是`promise`的`reason`；
11. 如果 `then` 中**抛出了异常**，那么就会把**这个异常作为参数**，传递给**下一个** `then` 的失败的回调`onRejected`；

```js
    // 三个状态：PENDING、FULFILLED、REJECTED
    const PENDING = 'PENDING';
    const FULFILLED = 'FULFILLED';
    const REJECTED = 'REJECTED';
    class Promise {
        constructor(executor) {
            // 默认状态为 PENDING
            this.status = PENDING;
            // 存放成功状态的值，默认为 undefined
            this.value = undefined;
            // 存放失败状态的值，默认为 undefined
            this.reason = undefined;
            // 存放成功的回调
            this.onResolvedCallbacks = [];
            // 存放失败的回调
            this.onRejectedCallbacks= [];

            // 调用此方法就是成功
            let resolve = (value) => {
                // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次   
                // resovle/reject 方法
                if(this.status ===  PENDING) {
                    this.status = FULFILLED;
                    this.value = value;
                    // 依次将对应的函数执行
                    this.onResolvedCallbacks.forEach(fn=>fn());
                }
            } 

            // 调用此方法就是失败
            let reject = (reason) => {
                // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 
                // resovle/reject 方法
                if(this.status ===  PENDING) {
                    this.status = REJECTED;
                    this.reason = reason;
                    // 依次将对应的函数执行
                    this.onRejectedCallbacks.forEach(fn=>fn());
                }
            }

            try {
                // 立即执行，将 resolve 和 reject 函数传给使用者  
                executor(resolve,reject)
            } catch (error) {
                // 发生异常时执行失败逻辑
                reject(error)
            }
        }

        // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
        then(onFulfilled, onRejected) {
            if (this.status === FULFILLED) {
                onFulfilled(this.value)
            }

            if (this.status === REJECTED) {
                onRejected(this.reason)
            }

            if (this.status === PENDING) {
                // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
                this.onResolvedCallbacks.push(() => {
                    onFulfilled(this.value)
                });

                // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
                this.onRejectedCallbacks.push(()=> {
                    onRejected(this.reason);
                })
            }
        }
    }
```

### then 的链式调用&值穿透特性
在我们使用 Promise 的时候，当 then 函数中 return 了一个值，不管是什么值，我们都能在下一个 then 中获取到，这就是所谓的**then 的链式调用**。



```js
    new Promise(res => res('Yay'))  
    // 等价于 
    Promise.resolve('Yay')
```



## Async Await


![](AsyncAwait.gif)

遇到`await`关键字时,`async`函数会暂停。函数体的执行被暂停，**异步函数的其余部分在微任务**而不是常规任务中运行。  
异步函数myFunc在遇到await关键字时被挂起，引擎跳出异步函数并继续在调用异步函数的执行上下文中执行代码

