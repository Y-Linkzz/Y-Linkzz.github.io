# bind()、call()、apply()

改变函数内部 this 指向


## call() 

`fun.call(thisArg, arg1, arg2, ...)`

调用一个对象，即**调用函数的方式**，**改变函数的 this 指向**。主要作用可以实现继承。

## apply() 

`fun.apply(thisArg, [argsArray])`

调用一个函数，即调用函数的方式，改变函数的 this 指向。

-   `thisArg`：在 fun 函数运行时指定的 this 值
-   `argsArray`：传递的值，必须包含在数组里面
-   返回值就是函数的返回值，因为它就是调用函数

```js
    // 利用 apply 借助于数学内置对象求最大最小值
    var arr = [1, 63, 25, 89, 12, 7];
    var max = Math.max.apply(Math, arr);
    console.log(max); // 89

    // 正常使用
    Math.max(1, 3, 2)
```


## bind()

`fun.bind(thisArg, arg1, arg2, ...)`

**不会调用函数**，但是能改变函数内部 this 指向

-   `thisArg`：在 fun 函数运行时指定的 this 值
-   `arg1, arg2`：传递的其他参数
-   返回由指定的 `this` 值和初始化参数改造的`_原函数拷贝_`，即原函数改变 this 之后**产生的新函数**


```js
    // bind() 不会调用函数
    function abc(key){
        console.log(key);
    }
    for(let i=0;i<oInput.length;i++){
        oInput[i].addEventListener('focus',abc.bind(this,i));
    } 


    var btn = document.querySelector('button');
    btn.onclick = function() {
        this.diabled = true; //这个 this 指向 btn 按钮
        // var that = this;
        setTimeout(function() { //定时器里面的 this 指向的是 window
            // that.disabled = false;
            this.disabled = false;
        }.bind(this), 3000); //这个 this 指向 btn 这个对象
    }
```

## 总结
-   `call()` 经常做继承；
-   `apply()` 经常跟数组有关系；
-   ` bind()` 不立即调用函数，如果有的函数我们**不需要立即调用**，但是又想改变这个函数内部 this 指向，此时用 `bind()`

