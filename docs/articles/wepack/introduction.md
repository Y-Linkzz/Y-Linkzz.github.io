# webpack的使用法



## require()

-   webpack本身是一个**预编译路径** 不能require**纯变量**的打包工具，无法预测未知变量路径
-   require(path) ; `path` 至少要有三部分组成, `目录`,`文件名`和`后缀`
-   `目录`：webpack 才知道从哪里开始查找
-   `后缀`: 文件后缀，必须要加上，不然会报错
-   `文件名`：可用变量表示

### 错误引用
webpack找不到具体是哪个模块（图片）被引入，故而无法将图片hash并输出到dist文件下。
```js
    let imgUrlStr = '../images/a.png'; 
    let imgUrl = require(imgUrlStr);
```

## import()
与require参数类似，不能通过纯参数的方式引入模块