<html>
<h2>目录</h2>
</html>

[前言](#start)

&emsp;[1. JavaScript 有哪些数据类型](#j1)

&emsp;[2. 怎么判断不同的JS数据类型](#j2)

&emsp;[3. undefined 和 null 有什么区别](#j3)

&emsp;[4. 数组对象有哪些常用方法](#j4)

&emsp;[5. Js 有哪几种创建对象的方式](#j5)

&emsp;[6. 怎么实现对对象的拷贝(浅拷贝与深拷贝)](#j6)

&emsp;[7. 什么是闭包，为什么要用它](#j7)

&emsp;[8. 介绍一下 JavaScript 原型，原型链，它们有何特点](#j8)

&emsp;[9. JavaScript 如何实现继承](#j9)

&emsp;[10. new 操作符具体干了什么](#j10)

&emsp;[11. 同步和异步的区别，怎么异步加载 JavaScript](#j11)

&emsp;[12. 跨域问题的产生，怎么解决它](#j12)

&emsp;[13. 对 this 的理解](#j13)

&emsp;[14. apply()、call()和 bind() 是做什么的，它们有什么区别](#j14)

&emsp;[15. 什么是内存泄漏，哪些操作会造成内存泄漏](#j15)

&emsp;[16. 什么是事件代理，它的原理是什么](#j16)

&emsp;[17. 对AMD和CMD的理解，它们有什么区别](#j17)

&emsp;[18. 对ES6的了解](#j18)

&emsp;[19. 箭头函数有什么特点](#j19)

&emsp;[20. Promise 对象的了解](#j20)

&emsp;[21. async 函数以及 awit 命令](#j21)

&emsp;[22. export 与 export default有什么区别](#j22)

&emsp;[23. 怎么编写高性能的 JavaScript](#j23)

&emsp;[24. 对JS引擎执行机制的理解](#j24)

&emsp;[25. 对JS事件机制的理解](#j25)


<h4 id='start'>前言</h4>


<h5 id='j1'>1. JavaScript 有哪些数据类型</h5>

6种原始数据类型：
- Boolean: 布尔表示一个逻辑实体，可以有两个值：`true` 和 `false`
- Number: 用于表示数字类型
- String: 用于表示文本数据
- Null: `Null` 类型只有一个值： `null`,特指对象的值未设置
- Undefined: 一个没有被赋值的变量会有个默认值 `undefined`
- Symbol: 符号(Symbols)是ECMAScript第6版新定义的。符号类型是唯一的并且是不可修改的

引用类型：`Object`

详见 [JavaScript的数据类型-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

<h5 id='j2'>2. 怎么判断不同的JS数据类型 </h5>

- `typeof`操作符：返回一个字符串，表示未经计算的操作数的类型

> `typeof` 操作符对于简单数据类型，返回其本身的数据类型，函数对象返回 `function` ，其他对象均返回 `Object`

> `null` 返回 `Object`

- instanceof: 用来判断A 是否是 B的实例，表达式为 `A instanceof B`，返回一个`Boolean`类型的值

> `instanceof` **检测的是原型,只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型**

```js
let a = [];
a instanceof Array  // true
a instanceof Object // true
```
> 变量a 的 `__proto__`  直接指向`Array.prototype`，间接指向 `Object.prototype`，所以按照 `instanceof` 的判断规则，a 就是`Object`的实例.针对数组的这个问题，ES5 提供了 `Array.isArray()` 方法 。该方法用以确认某个对象本身是否为 Array 类型

- constructor: 当一个函数被定义时，JS引擎会为其添加`prototype`原型，然后再在 `prototype`上添加一个 `constructor` 属性，并让其指向该函数的引用

> `null`和`undefined`是无效的对象，因此是不会有`constructor`存在的，这两种类型的数据需要通过其他方式来判断

> 函数的`constructor`是不稳定的，这个主要体现在自定义对象上，当开发者重写`prototype`后，原有的`constructor`引用会丢失，`constructor`会默认为 `Object`

```js
function F() {};
var f = new F;
f.constructor == F // true

F.prototype = {a: 1}
var f = new F
f.constructor == F // false 
```
> 在构造函数 `F.prototype` 没有被重写之前，构造函数 `F` 就是新创建的对象 `f` 的数据类型。当 `F.prototype` 被重写之后，原有的 `constructor` 引用丢失, 默认为 Object

> 因此，为了规范开发，在重写对象原型时一般都需要重新给 `constructor` 赋值，以保证对象实例的类型不被篡改

- toString: `Object` 的原型方法，调用该方法，默认返回当前对象的 `[[Class]]` 。这是一个内部属性，其格式为 `[object Xxx]` ，其中 `Xxx` 就是对象的类型

```js
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(11) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call([]) ; // [object Array]
```

<h5 id='j3'>3. undefined 和 null 有什么区别</h5>

> `null`表示"没有对象"，即该处不应该有值

典型用法：

1. 作为函数的参数，表示该函数的参数不是对象
2. 作为对象原型链的终点

> `undefined`表示"缺少值"，就是此处应该有一个值，但是还没有定义

典型用法：

1. 变量被声明了，但没有赋值时，就等于`undefined`
2. 调用函数时，应该提供的参数没有提供，该参数等于`undefined`
3. 对象没有赋值的属性，该属性的值为`undefined`
4. 函数没有返回值时，默认返回`undefined`

详见： [undefined和null的区别-阮一峰](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

<h5 id='j4'>4. 数组对象有哪些常用方法</h5>

> 修改器方法：

- pop(): 删除数组的最后一个元素，并返回这个元素
- push()：在数组的末尾增加一个或多个元素，并返回数组的新长度
- reverse(): 颠倒数组中元素的排列顺序
- shift(): 删除数组的第一个元素，并返回这个元素
- unshift(): 在数组的开头增加一个或多个元素，并返回数组的新长度
- sort(): 对数组元素进行排序，并返回当前数组
- splice(): 在任意的位置给数组添加或删除任意个元素

> 访问方法：

- concat(): 返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组
- join(): 连接所有数组元素组成一个字符串
- slice(): 抽取当前数组中的一段元素组合成一个新数组
- indeOf(): 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1
- lastIndexOf(): 返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1

> 迭代方法：

- forEach(): 为数组中的每个元素执行一次回调函数,最终返回 `undefined`
- every(): 如果数组中的每个元素都满足测试函数，则返回 `true`，否则返回 false
- some(): 如果数组中至少有一个元素满足测试函数，则返回 `true`，否则返回 false
- filter(): 将所有在过滤函数中返回 `true` 的数组元素放进一个新数组中并返回
- map(): 返回一个由回调函数的返回值组成的新数组

更多方法请参考 MDN [传送门](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)


<h5 id='j5'>5. Js 有哪几种创建对象的方式</h5>

> 对象字面量
```js
var obj = {}
```
> Object 构造函数
```js
var obj = new Object()
```

> 工厂模式
```js
function Person(name, age) {
    var o = new Object()
    o.name = name;
    o.age = age;
    o.say = function() {
        console.log(name)
    }
    return o
}
```
缺点： 每次通过`Person`创建对象的时候，所有的`say`方法都是一样的，但是却存储了多次，浪费资源

> 构造函数模式
```js
function Person(name, age) {
    this.name = name
    this.age = age
    this.say = function() {
        console.log(name)
    }
}
var person = new Person('hello', 18)
```
构造函数模式隐试的在最后返回`return this` 所以在缺少`new`的情况下，会将属性和方法添加给全局对象，浏览器端就会添加给`window`对象,可以根据`return this` 的特性调用`call`或者`apply`指定`this`

> 原型模式
```js
function Person() {}
Person.prototype.name = 'hanmeimei';
Person.prototype.say = function() {
  alert(this.name);
}
Person.prototype.friends = ['lilei'];
var person = new Person();
```
实现了方法与属性的共享，可以动态添加对象的属性和方法。但是没有办法创建实例自己的属性和方法，也没有办法传递参数

> 构造函数和原型组合
```js
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.say = function() {
    console.log(this.name)
}
var person = new Person('hello')
```

还有好几种模式，感兴趣的小伙伴可以参考 **红宝书**，你们肯定知道的了！

<h5 id='j6'>6. 怎么实现对对象的拷贝(浅拷贝与深拷贝)</h5>

> 浅拷贝

- 拷贝原对象引用
- 可以使用`Array.prototype.slice()`也可以完成对一个数组或者对象的浅拷贝
- `Object.assign()`方法

> 深拷贝

- 最常用的方式就是 `JSON.parse(JSON.stringify(目标对象)`，缺点就是只能拷贝符合`JSON`数据标准类型的对象

<h5 id='j7'>7. 什么是闭包，为什么要用它</h5>

<h5 id='j8'>8. 介绍一下 JavaScript 原型，原型链，它们有何特点</h5>

<h5 id='j9'>9. JavaScript 如何实现继承</h5>

<h5 id='j10'>10. new 操作符具体干了什么</h5>

<h5 id='j11'>11. 同步和异步的区别，怎么异步加载 JavaScript</h5>

<h5 id='j12'>12. 跨域问题的产生，怎么解决它</h5>

<h5 id='j13'>13. 对 this 的理解</h5>

<h5 id='j14'>14. apply()、call()和 bind() 是做什么的，它们有什么区别</h5>

<h5 id='j15'>15. 什么是内存泄漏，哪些操作会造成内存泄漏</h5>

<h5 id='j16'>16. 什么是事件代理，它的原理是什么</h5>

<h5 id='j17'>17. 对AMD和CMD的理解，它们有什么区别</h5>

<h5 id='j18'>18. 对ES6的了解</h5>

<h5 id='j19'>19. 箭头函数有什么特点</h5>

<h5 id='j20'>20. Promise 对象的了解</h5>

<h5 id='j21'>21. async 函数以及 awit 命令</h5>

<h5 id='j22'>22. export 与 export default有什么区别</h5>

<h5 id='j23'>23. 怎么编写高性能的 JavaScript</h5>

<h5 id='j24'>24. 对JS引擎执行机制的理解</h5>

<h5 id='j25'>25. 对JS事件机制的理解</h5>
