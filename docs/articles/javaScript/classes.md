# 类


## ES6之前

类是ES6提出来的  
在 ES6之前 ，对象不是基于类创建的，而是用一种称为**构造函数**的特殊函数来定义对象和它们的特征。

## [构造函数](https://segmentfault.com/a/1190000022776150)

**构造函数**是一种特殊的函数，主要用来**初始化对象**，即为对象成员变量赋初始值，它总与 `new` 一起使用。我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里面。

```js
    // 创建对象可以通过以下三种方式：
    // 1 对象字面量
    var obj = {}
    
    // 2 new Object()
    var obj = new Object();

    // 3 自定义构造函数
    function Star(name, age) {
        this.name = name;
        this.age = age;
        this.sing = function(){
            console.log('sing')
        }
    }
    let ldh = new Star('刘德华', 18);
```

**构造函数时要注意以下两点**：

1.  构造函数用于创建某一类对象，其**首字母要大写**
2.  构造函数要和 **new 一起使用**才有意义

**new 在执行时会做四件事情**：  

1.  在内存中创建一个新的空对象
2.  让 this 指向这个新的对象
3.  执行构造函数里面的代码，给这个新对象添加属性和方法
4.  返回这个新对象（所以构造函数里面不需要 return ）

**两种方式添加的成员**:  

1.  **静态成员**：在构造函数**本上添加的成员**称为**静态成员**，只能由**构造函数本身来访问**
2.  **实例成员**：在构造函数**内部创建的对象成员**称为**实例成员**，只能由**实例化的对象来访问**

```js
    function Star(name, age) {
        this.name = name;
        this.age = age;
        this.sing = function(){
            console.log('sing')
        }
    }
    // 实例成员就是构造函数内部通过 this 添加的成员 name age sing 就是实例成员。
    // 实例成员只能通过实例化的对象来访问
    let ldh = new Star('刘德华', 18);
    ldh.sing();
    ​
    // 静态成员 在构造函数本身上添加的成员 gender 就是静态成员
    Star.gender = 'male';
    console.log(Star.gender); // 静态成员只能通过构造函数来访问
    console.log(ldh.gender); // 不能通过对象来访问
```

**存在浪费内存的问题**

```js
    function Star(uname, age) {
        this.uname = uname;
        this.age = age;
        this.sing = function() {
            console.log('我会唱歌');
        }
    }
    var ldh = new Star('刘德华', 18);
    var zxy = new Star('张学友', 19);

    console.log(ldh.sing === zxy.sing);   // false

```

![](Constructor.png)

当创建实例对象的时候，对于简单的数据类型，直接赋值就可以。  
但对于复杂数据类型，当创建 ldh 这个实例对象的时候，会单独的开辟一块儿空间来存放复杂数据类型 sing 这个方法，创建 zxy 对象的时候，也去开辟一块儿空间来存放 sing 方法。**开辟了两个空间来存放同一个函数**。

### 构造函数原型 prototype
构造函数通过原型分配的函数是所有对象所**共享的**。

JavaScript 规定，**每一个构造函数都有一个 prototype 属性**，指向另一个对象。这个 `prototype` 就是**一个对象**，这个对象的**所有属性和方法**，都会**被构造函数所拥有**。

**我们可以把那些不变的方法，直接定义在 prototype 对象上，这样所有对象的实例就可以共享这些方法。**

一般情况下，**公共的属性**定义到**构造函数里面**，**公共的方法**放在**原型对象身上**

```js
    function Star(name, age){
        this.name = name;
        this.age = age;
    }
    Star.prototype.sing = function() {
        console.log('sing');
    }
    var ldh = new Star('刘德华', 18);
    var zxy = new Star('张学友', 19);
    ldh.sing();
    zxy.sing();
    console.log(ldh.sing === zxy.sing)  // true
```

问答：  
1.  原型是什么 ？  
一个对象，我们也称为 `prototype` 为**原型对象**。
2.  原型的作用是什么 ？  
**共享方法**

### 对象原型 __proto__







