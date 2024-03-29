# 位运算
从现代计算机中所有的数据二进制的形式存储在设备中。即 0、1 两种状态，计算机对二进制数据进行的运算(+、-、*、/)都是叫位运算，即**将符号位共同参与运算的运算**。（简化为：将一个整数的二进制格式进行运算）

## JS中的位运算
JavaScript 将数字存储为 64 位浮点数，但所有按位运算都以 32 位二进制数执行。

在执行位运算之前，J**avaScript 将数字转换为 32 位有符号整数**。

执行按位操作后，结果将转换回 64 位 JavaScript 数。

在JS中规定，对于特殊的数字，如果进行位运算，全部看作0 （NaN、infinity、-infinity）

**第一个0表示符号位，1为负数，0为正数**

1000 0000 0000 0000 0000 0000 0000 0001  （-1）

 


## 位运算 AND （&）（与运算）
数位均为 1 则返回 1。

1 & 2 （结果就为0）

1 对应的二进制是--0000 0000 0000 0000 0000 0000 0000 0001

2 对应的二进制是--0000 0000 0000 0000 0000 0000 0000 0010

## 位运算 OR （|）（或运算）
如果其中一位是 1 则返回 1 

## 位运算 XOR （^）（异或运算）
当对一对数位进行位运算 XOR 时，如果数位是不同的则返回 1

0 ^ 0	0  
0 ^ 1	1

**交换变量的方法**  
```js
    let a = 1,b = 2;
    //方式一
    let temp = a;
    a = b;
    b = temp;
    console.log(a,b)  //输出2 1
    
    //方式二
    a = a + b;
    b = a - b;
    a = a - b;
    console.log(a,b)  //输出2 1
    
    //方式三
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    console.log(a,b)  //输出2 1
```

## 非运算 (~)
将这个整数全部二进制位按位取反，0变成1，1变成0

反码：**正数的反码还是等于原码；负数的反码就是它的原码除符号位外，按位取反**    
补码：**正数的补码等于它的原码；负数的补码等于反码+1**

-1  
真码    --> 1000 0000 0000 0000 0000 0000 0000 0001  // 也叫原码  
反码    --> 1111 1111 1111 1111 1111 1111 1111 1110  // 真码取反  (符号位不变，其余全部取反)
补码    --> 1111 1111 1111 1111 1111 1111 1111 1111  // 反码加1   
**负数在计算机存储的就是补码**

~1  
1 对应的二进制是            --> 0000 0000 0000 0000 0000 0000 0000 0001  
~1  对1的二进制序列进行取反  --> 1111 1111 1111 1111 1111 1111 1111 1110  
**这是得到的是存储在计算机中的补码，需要转换成真码，然后才能传换成十进制**  
> 取出补码  --> 1111 1111 1111 1111 1111 1111 1111 1110  
> 得到反码  --> 1111 1111 1111 1111 1111 1111 1111 1101  //补码-1就得到反码
> 得到真码  --> 1000 0000 0000 0000 0000 0000 0000 0010  //符号位不变，其余全部取反，得到真码
> 转换成十进制 ----得到-2

### 快速计算  
~x：-x - 1    // 取反某个数字，先让这个数字变成负数，然后减去1，就得到非运算结果  
~2 = -2 - 1 = -3  
~-2 = 2 - 1 = 1

**JS中最快速取整的方式**  
~~3.1415926  
首先对3.1415926进行非运算  --> ~3.1415926  -->取出整数部分3，结果为-4  
然后再对-4进行非运算  --> ~-4  --> 结果为3  
**不太容易阅读，可以拿来炫炫技巧**

## 位运算的应用场景

### 管理所有权限

```js
    let  AllPermission = {
        read:0b001, //读权限
        write:0b010, //修改权限
        create:0b100, //创建权限
    }
    
    //权限1表示可读可写
    
    let permission1 = AllPermission.read | AllPermission.write
    
    //判断权限：权限1中是否有可读权限
    
    permission1 & AllPermission === AllPermission ? console.log("可读") : console.log("不可读") 
    //输出可读
```

## 位移运算
1 << 2  
**左位移**：将数字1的二进制位（除符号外），左位移数字2的次数  
左移运算的规律：数字1 乘以 2的数字2次方  
`3 << 1 = 3 * 2 ^ 1 = 6`  

**右位移**: 将数字1的二进制位（除符号外），右位移数字2的次数  
右移运算，是整个32位向右移动，最后移动多少位，符号位不变，前面补多少0  

::: danger
    右位移有可能会丢失精度，请谨慎使用
:::

`5 >> 1 = 5 * 2 ^ -1 = 2`  取整数部分，结果为2  

**全右位移**: 同右位移，区别在于，符号位会跟着移动  
-1 >>> 1  
```js
    -1 对应的二进制是 --> 1111 1111 1111 1111 1111 1111 1111 1110
    全右移后是        --> 0111 1111 1111 1111 1111 1111 1111 1111
    所以-1 >>> 1 的结果为 0111 1111 1111 1111 1111 1111 1111 1111 ，转换为十进制为2147483647
```




https://blog.csdn.net/snsHL9db69ccu1aIKl9r/article/details/121709608  
**十六进制**  
0x开头表示16进制，浏览器都会将其转换为10进制输出。

**八进制**  
0开头表示8进制，浏览器都会将其转换为10进制输出。  

**二进制**  
0b开头表示2进制，浏览器都会将其转换为10进制输出。

https://zhuanlan.zhihu.com/p/99082236   

[浮点精度](https://blog.csdn.net/hjb2722404/article/details/120514744)      

https://blog.csdn.net/m0_67502005/article/details/128036344  



