# Vue TypeScript


```js
    //定义一个接口，用于限制person对象的具体属性
    export interface Person {
        id : string,
        name : string,
        age : number,
        x? : number // x可有可无
    }

    // 一个自定义类型
    export type Persons = Array<Person> // 或者 Person[]
```

```html
    <script lang="ts" setup>
    import { ref, reactive, withDefaults } from 'vue'
    import { type Persons } from '@/types'
    
    let personList = reactive<Persons>([
        {
            id : 'dsa01',
            name : 'zhang',
            age : 18
        }
    ])

    // 只接受list
    defineProps(['list'])

    const props = defineProps<{
        foo: string
        bar?: number
    }>()

    // 接受list + 限制类型
    defineProps<{list:Persons}>() // TS里这样是必修要传list   如果可不穿 defineProps<{list?:Persons}>()
    
    // 接受list + 限制类型 + 限制必要性 + 指定默认值
    withDefaults(defineProps<{list?:Persons}>(),{
        list : ()=> []
    })

    </script>
```

## TypeScript中的数据类型
除了JS类型，新增6个类型
**object**：存储的类型是【非原始类型】, 实际开发用的少，太宽泛了；
```js
    let a: object
    a = {}
    a = []
    a = function(){}
    class Person {}
    a = new Person()
```
一般使用**声明对象类型**
```js
    let person : {
        name: string
        age: number   // age?: number 表示可以没有age
        [key: string]: any // 索引签名，可以追加其他属性；完全可以不用key这个单词，换成其他的也可以
    }
```

**声明函数类型**
```js
    // TS里的 => 在函数类型声明时表示函数类型
    let count: (a:number, b:number) => number // 这个是TS语法
    
```

**声明数组类型**
```js
    let arr1: string[]
    let arr2: Array<number> // 泛型
```

-   any
```js
    let a: any  // 显式的any
    let b  // 隐式的any

    // any类型的变量，可以赋值给任意类型的变量
    let c: any 
    c = 9
    let x:string
    x = c // 无警告
```
-   unknown
```js
    // 可以理解为一个类型安全的any,适用于：不确定数据具体类型

    // 不可以赋值给任意类型的变量（有例外）
    let a: unknown
    let x: string
    x = a //报错

    // 第一种可赋值
    if(typeof a === 'string'){
        x = a
    }
    // 第二种可赋值 (断言)
    x = a as string  // 另一种写法 x = <string>a


    let str: any
    str = '11'
    str.toUpperCase() // 无警告

    let str2: unknown
    str2 = '11'
    str2.toUpperCase() // 警告：str2的类型为未知；  (str2 as string).toUpperCase() 可以断言，无警告
```
-   never
```js
    // 任何值都不是，简言之就是不能有值，undefined、null、''、0都不行
    // 用来限制函数的返回类型

    // 限制throwError函数不需要有任何返回值
    function throwError():never {
        throw new Error('异常')
    }
```
-   void
```js
    // 通常用于函数返回值声明；不需要被人关心函数的返回值，函数也不会主动返回值
    // 函数不返回任何值，调用者也不依赖其返回值进行任何操作
    
    function logMessage(msg:string):void{
        console.log(msg);
    }

    /**
     * 注意，编码者没有编写return去指定函数的返回值，所以logMessage函数是没有显式返回值的
     * 但会有一个隐式返回值，就是undefined；即：虽然函数返回类型为void，但也可以接受undefined
     * 简单记：undefined 是 void 可以接受的一种 “空”
     */

    function demo():void {
        console.log('111');
    }
    let res = demo()
    if(res){ // 警告；    如果demo():void 换成 demo():undefined 就可以

    }

```
-   tuple
元组是一种特殊的**数据类型**，可以存储**固定数量**的元素，并且每个元素的类型是已知的
且可以不同。
```js
    let arr1 = [string,number]
    let arr2 = [number,boolean?] // 第二个元素可选，如果存在，必是boolean类型
    let arr3 = [number,...string[]] // 后面的元素可以是任意数量的string类型
    
    arr3 = [100,'11']
    arr3 = [100]
``` 
-   enum
枚举可以定义**一组命名常量**，它能增强代码的可读性，也让代码更好维护
```js
    // 减少犯错机率，只读
    enum Direction {
        Up,
        Down,
        Left,
        Right
    }
    function walk(data:Direction){
        if(data == Direction.Up){

        }else if(data == Direction.Down){

        }
    }
```
**常量枚举** ： 它使用`const`关键字定义，在编译时会被内联，避免生成一些额外的代码
何为编译时内联：   
所谓“内联”其实就是TS在编译时，会将枚举**成员引用**替换为它们**实际值**，而不是生成额外的枚举对象。
减少JS代码量，提高性能
```js
    const enum Direction {
        Up,
        Down,
        Left,
        Right
    }
    let x = Direction.Up

    // 编译后
    "use strict"
    let x = 0
```

### 用于自定义的类型方式
-   type
可以为任意类型创建别名，让代码更简洁，可读性更强，同时能更方便复用和扩展
```js
    type Status = number | string
    type Gender = '男' | '女'
    function demo(data:Status):void{

    }


    // 交叉类型
    type Area = {
        height: number
    }
    type Address = {
        cell: number
    }
    type House = Area & Address

    // 特殊情况：使用类型声明限制返回值为void时，TS并不会严格要求函数返回空
    type LogFunc = () => void
    const f1: LogFunc = () =>{
        return 100 // 允许返回非空值
    }
    // 为什么会有特殊情况：TS为了满足以下代码成立
    const arr = [1,2]
    const dst = [0]
    // Array.prototype.forEach方法期望回调的返回类型是void
    arr.forEach(el => dst.push(el)); //dst.push会返回数组，return可以简写
```
-   interface（接口）
是一种**定义结构**的方式，主要作用是为：类、对象、函数等规定一种契约，这样可以确保代码
的一致性和类型安全。注意：**interface**只能定义格式，不能包含任何实现


何时使用接口
-   定义对象的格式：描述数据模型、API响应格式、配置对象等。开发用的最多
-   类的契约：规定一个类需要实现哪些属性和方法
-   自动合并：一般用于扩展第三方库的类型，这种特性在大型项目中可能会用到

```js
    // 定义类结构
    interface PersonInterface {
        name: string
        age: number
        speak(n: number): void
    }

    class Person implements PersonInterface { //implements 实现的意思

    }

    // 定义对象
    interface UserInterface {
        name: string
        readonly gender: string //只读属性
        age?: number
        run: (n: number) => void
    }
    const user: User = {
        name : '张三',
        gender : '男',
        age : 18,
        run(n){

        }
    }

    // 定义函数
    interface CountInterface {
        (a: number, b: number): number
    }
    const count: CountInterface = (x,y) => {
        return x + y
    }

    // 接口继承
    interface StudentInterface extends PersonInterface {
        grade: string
    }

    // 接口可合并性
    interface PersonInterface {
        name: string
        age: number
    }
    interface PersonInterface {
        grade: string
    }
```

## interface 和 type 的区别
**相同点**： interface 和 type 都可以用于定义对象结构，两者在许多场景中可以互换的。   
**不同点**：        
`interface`： 更专注于定义对象和类的结构，支持继承、合并    
`type`： 可以定义类型别名、联合类型、交叉类型，但不支持继承和自动合并


## 类（属性修饰符）
-   **public**: 可以被：类内部、子类、类外部访问
-   **protexted**:  类内部、子类访问
-   **private**: 类内部访问
-   **readonly**: 只读，属性不发修改
```js
    // 简写前
    class Person {
        public name: string
        age: number // 默认是public，可以不写public
        constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }
        public speak(){

        }
    }

    // 简写后
    class Person {
        constructor(public name: string, public age: number) {
            
        }
        speak(){

        }
    }

    // 子类
    class Student extends Person {
        study(){

        }
    }

    class Person {
        constructor(
            public name: string, 
            public readonly age: number
        ) {
            
        }
        speak(){

        }
    }
```

## 抽象类
简记：抽象类**不能实例化**，其意义是**可以被继承**，抽象类里可以有**普通方法**、也可以有**抽象方法**

理解类：        
我们定义一个抽象类**Package**,表示所有包裹的基本结构，任何包裹都有重量属性**weight**，包裹都需要计算运费。
但不同类型的包裹都有不同的运费计算，因此用于计算运费**calculate**方法是一个抽象方法，必须由具体的子类来实现


```js
    abstract class Package {
        constructor(
            public weight: number
        ){

        }
        abstract calculate(): number // 子类必须要有
        // 抽象方法
        // abstract calculate(x: number, y: string): void

        // 具体方法
        printPackage(){
            console.log(`${this.calculate()}元`)
        }
    }
    
    // 标准包裹
    class StandardPackage extends Package {
        constructor(
            weight: number, // 不用写public，父类已经定了
            public unitPrice: number
        ){
            super(weight) // 子类要调用
        }
        calculate(): number{
            return this.weight * this.unitPrice
        }
    }
    const s1 = new StandardPackage(10,5)
    s1.printPackage()

    // 快速包裹
    class ExperssPackage extends Package {
        constructor(
            weight: number, 
            public unitPrice: number,
            public additional: number
        ){
            super(weight) // 子类要调用
        }
        calculate(): number{
            if(this.weight > 10){
                return 10 * this.unitPrice + (this.weight - 10) * this.additional
            }else{
                return this.weight * this.unitPrice
            }
        }
    }
```

## interface 和 抽象类 的区别
**相同点**： 都用于定义一个类的格式     
**不同点**：        
`interface`： 只能描述结构，不能有任何实现代码，一个类可以实现多个接口
```js
    interface FlyTnterface {
        fly(): void
    }
    interface SwimTnterface {
        swim(): void
    }
    class Duck implements FlyTnterface, SwimTnterface{
        fly(){

        }
        swim(){

        }
    }
``` 
`抽象类`： 既可以包含抽象方法，也可以包含具体方法，一个类只能继承一个抽象类


## 泛型
泛型允许我们定义函数、类或接口时，使用类型参数来表示**未指定的类型**，这些参数在具体使用时，
才被指定具体的类型，泛型能让同一段代码使用于多种类型，同时仍然保持类型的安全性

```js
    function logData<T>(data: T): T { // 不一定非叫T
        console.log(data)
        return data
    }
    logData<number>(100)
    logData<string>('hello')


    // 泛型可以有多个
    function logData<T, U>(data1: T, data2: U): T | U { // 不一定非叫T
        console.log(data1,data2)
        return Data.now() % 2 ? data1 : data2
    }
    logData<number,string>(100,'hello')


    // 泛型接口
    interface PersonInterface<T> {
        name: string 
        age: number
        extraInfo: T
    }
    let p: PersonInterface<number> = {
        name: 'tom',
        age: 18,
        extraInfo: 250
    }

    // 泛型类
    class Person<T> {
        constructor(
            public name: string,
            public age: number,
            public extraInfo: T
        ){
            
        }
    }
    const p1 = new Person<number>("tom",30,250)
```


## 类型声明文件
类型声明文件是TS中的一种特殊文件，通常以`.d.ts`作为扩展名。主要作用是
为**现有的JS代码提供类型信息**，使得TS能够使用这些JS库或模块进行**类型检查和提示**

```js
    // demo.js
    export function add(a,b){
        return a + b
    }

    // demo.d.ts
    declare function add(a: number,b: number): number

    //index.ts
    import { add } from './demo'
```


## 装饰器
装饰器本质是一种特殊的函数，它可以对：类、属性、方法、参数进行扩展，同时能让代码更简洁

### 类装饰器
类装饰器是一个应用在`类声明`上的`函数`，可以为类添加额外的功能，或添加额外的逻辑
```js
    /**
     * Demo函数会在Person类定义时执行
     * 参数说明：
     * target参数是被装饰的类，即：Person
     */
    function Demo(target: Function){
        console.log(target)  // 打印 Person类
    }

    // 使用装饰器
    @Demo
    class Person {

    }
```


**应用举例**：
```js
    function CustomString(target: Function){
        // 向被装饰类的原型上添加自定义的 toString 方法
        target.prototype.toString = function () {
            return JSON.stringify(this)
        }
        // 封闭其原型对象，禁止随意操作其原型对象
        Object.seal(target.prototype)
    }

    @CustomString
    class Person {
        constructor(
            public name: string
        ){}
    }
    let p1 = new Person('11',18)
    console.log(p1.toString())  // 原本是[object,object]   现在可以打印{"name": "11"}
```

`关于返回值`      
类装饰器有返回值，若类装饰器返回一个新的类，那这个新类将替换被装饰的类


`关于构造类型`    
TS中的 `Function` 定义太广泛，包括：普通函数、箭头函数、方法等。但并非 `Function`类型的函数都可以被 `new`
关键字实例化。例如箭头函数不能被实例化。
```js
    // 仅声明构造类型
    /**
     * new : 该类型是可以用new操作符调用
     * ...args : 构造器可以接受【任意数量】的参数
     * any[] ： 构造器可以接受【任意类型】的参数
     * {} ： 返回类型是对象（非null、非undefined的对象）
     */
    type Constructor = new (...args:any[]) => {}

    function test(fn: Constructor){}


    // 声明构造类型 + 指定静态的属性
    type Constructor = {
        new (...args:any[]): {}
        wife: string 
    }
    function test(fn: Constructor){}
    class Person {
        static wife = 'ss'
    }
    test(Person)

```

`替换被装饰的类` 
```js
    type Constructor = new (...args:any[]) => {}
    interface Person {  // 接口和类同名，TS会自动合并
        getTime(): string
    }
    // <T extends Constructor> 解释：泛型是必须可以被new关键字调用的类
    function LogTime<T extends Constructor>(target: T){
        return class extends target {
            createdTime: Date
            constructor(...args:any[]){
                super(...args)
                this.createdTime = new Date()
            }
        }
        getTime(){
            return `${this.createdTime}`
        }
    }

    @LogTime
    class Person {
        constructor(
            public name: string
        ){

        }
    }

    const p1 = new Person('as',18)

    console.log(p1.getTime())  // 如果没有添加interface Person 接口，getTime会报错
```

  
### 装饰器工厂
为了传参
```js
    interface Person {
        introduce: () => void
    }
    // 定义一个装饰器工厂，接受参数，返回一个类装饰器
    function LogInfo(n: number){
        return function(target: Function) {
            target.prototype.introduce = function () {
                for(let i = 0; i < n; i++){
                    console.log(11)
                }
            }
        }
    }

    @LogInfo(1)
    class Person {

    }
```



### 装饰器组合
装饰器可以组合使用，执行顺序：先【由上到下】的执行所有装饰器工厂，依次获取装饰器，然后再【由下到上】
执行所有装饰器
```js
    function test1(target: Function) {
        console.log('test1')
    }
    function test2() {
        console.log('test2工厂')
        return function(target: Function) {
            console.log('test2')
        }
    }
    function test3() {
        console.log('test3工厂')
        return function(target: Function) {
            console.log('test3')
        }
    }
    function test4(target: Function) {
        console.log(test4)
    }

    @test1
    @test2()
    @test3()
    @test4
    class Person {}

    // 一开始从上到下抽出工厂先执行，工厂执行完，再从下到上可以执行装饰器
    // 打印结果：test2工厂 test3工厂 test4 test3 test2 test1
```


### 属性装饰器
响应式属性
```js
    /**
     * target: 对于静态属性(static)来说值是类, 对于实例属性来说是类的原型对象
     * @Demo static age: number
     * properKey: 属性名
     */


    // 声明一个装饰器函数State，用于捕获数据的修改
    function State(target: object, properKey: string){
        // 存储属性的内布值
        let key - `__${properKey}`

        // 使用 Object.defineProperty 替换类的原始属性
        // 重新定义属性,使其使用自定义的 getter 和 setter
        Object.defineProperty(target, properKey, {
            get(){
                return this[key]
            }
            set(newVal: string){
                // 一些响应式操作在这实现
                this[key] = newVal
            },
            enumerabel: true,  //枚举,可参与循环遍历
            configurable: true // 是否允许删除
        })
    }

    class Person {
        name: string
        @State age: number
        constructor(name: string){
            this.name = name
            this.age = age 
        }
    }
```

### 方法装饰器
例子: 生命周期
```js
    /**
     * target: 对于静态方法(static)来说值是类, 对于实例方法来说是类的原型对象
     * properKey: 方法的名称
     * descriptor: 方法的描述对象,其中value属性是被装饰的方法
     * 描述对象 { configurable: true, enumerabel : false, ...}
     */

    function Logger(target: object, properKey: string, descriptor: PropertyDescriptor){
        // 保存原始方法
        const original = descriptor.value
        // 替换原始方法
        descriptor.value = function (...args: any[]){
            console.log(`${properKey}开始执行`)
            // call只能一个个传所以用了...args
            const result = original.call(this,...args)
            console.log(`${properKey}执行完毕`)
            return result
        }
    }
    function Validate(maxValue: number){
        return function (target: object, properKey: string, descriptor: PropertyDescriptor){
            const original = descriptor.value
            descriptor.value = function (...args: any[]){
                if(args[0] > maxValue){
                    throw new Error('年龄非法')
                }
                return original.apply(this,args) // apply可以传数组
            }
        }
    }

    class Person {
        name: string
        constructor(name: string){
            this.name = name
        },
        @Logger speak(){
            console.log(`speak`)
        }
        @Validate(120)
        static isAdult(age: number){
            return age >= 18
        }
    }
```


### 访问器装饰器
set  get  访问器
```js
    /**
     * target: 
     *    1.对于实例访问器来说值是[所属类的原型对象]
     *    2.对于静态访问器来说值是[所属类]
     * properKey: 访问器的名称
     * descriptor: 描述对象
     */

    function RangeValidate(min: number, max: number){
        return function (target: object, properKey: string, descriptor: PropertyDescriptor){
            // 保存原始的setter
            const originalSetter = descriptor.set
            // 重写setter
            descriptor.set = function(value){
                if(value < min || value > max){
                    throw new Error('报错')
                }
                if(originalSetter){
                    originalSetter.call(this,value)
                }
            }
        }
    }

    // 天气
    class Weather {
        private _temp: number // 温度
        constructor(_temp: string){
            this._temp = _temp
        },
        @RangeValidate(-50,50)
        set temp(value){
            this._temp = value
        }
        get temp(){
            return this._temp
        }
    }

    const p1 = new Weather()
    p1.temp = 9000  // 会报错
```

### 参数装饰器