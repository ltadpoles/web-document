### 前言

无论是我们日常开发还是面试跳坑， `ES6` 已经变的越来越重要，那么你是否对它足够熟悉呢

`ES6` 将会是专栏接下来的一个系列，从最基础的概念或者有趣的问题开始逐渐深入，探究 `ES6` 常用的特性以及实际开发中遇到的问题。有些问题可能会比较奇葩，工作中根本不会写出这样的代码，但正是这些问题可以看出你的了解程度

本文的 `答案` 不一定是最优解释，如果你有更好的想法或更优雅的写法，欢迎留言讨论

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### 正文

1. 下面代码会打印什么
```js
function bar(x = y, y = 2) {
  return [x, y];
}

bar();
```

<details>

<summary>答案</summary>

报错 

`y` 在没赋值之前使用，隐藏的 **暂时性死区**

暂时性死区的本质：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

</details>

---

2. 下面代码会打印什么
```js
function f() { console.log('I am outside!') }

(function () {
    if (false) {
        function f() { console.log('I am inside!') }
    }
    f();
}());
```

<details>

<summary>答案</summary>

在 `ES5` 的执行环境(比如 `IE8` )，会打印 `I am inside`，执行方式类似下面这样
```js
function f() { console.log('I am outside!') }

(function () {
    function f() { console.log('I am inside!') }
    if (false) {}
    f();
}())
```

在 `ES6` 的执行环境会报错.这是因为在 `ES6` 环境中，`if` 语句这里形成了块级作用域，在块级作用域中的函数声明类似使用 `var` 声明一个变量，只会将声明提升到所在作用域头部。所以，执行方式就类似下面这样
```js
function f() { console.log('I am outside!') }

(function () {
    var f;
    if (false) {
        function f() { console.log('I am inside!') }
    }
    f(); // 由于 f 是 undefined，所以就导致了错误
}())
```
</details>

---

3. 以下代码为什么会报错
```js
let { prop: x } = undefined;
let { prop: y } = null;
```

<details>

<summary>答案</summary>

解构赋值的规则是：只要等号右边的值不是对象或数组，就先将其转为对象。由于 `undefined` 和 `null` 无法转为对象，所以对它们进行解构赋值，都会报错

</details>

---

4. 如何交换下面的两个变量（至少写出三种）
```js
let a = 'abc'
let b = 'xyz'
```

<details>

<summary>答案</summary>

- 解构赋值
```js
[a, b] = [b, a]
```
- 变成一个对象
```js
a = {a: b, b: a}
b = a.b
a = a.a
```
- 变成一个数组
```js
a = [a, b]
b = a[0]
a = a[1]
```
- 比较骚的方式
```js
a = [b, b = a][0]
```

......

</details>

---

5. 下面两种写法有什么不同
```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```

<details>

<summary>答案</summary>

上面的两种写法都对函数的参数设定了默认值

区别是 写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个具体的对象，但是没有设置对象解构赋值的默认值

测试方式：
```js
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({ z: 3 }) // [undefined, undefined]
```

</details>

--- 

6. 下面的代码输出什么
```js
(function (a, b, c = 5) { }.length

(function (a, ...b) { }).length) 
```

<details>

<summary>答案</summary>

2   1

函数参数的默认值以及 `reset` 参数 不计算在函数的 `length` 当中

</details>

--- 

7. 下面的代码输出什么
```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() 
console.log(x)
```

<details>

<summary>答案</summary>

3 1

- 函数参数和函数内部是两个不同的作用域
- 函数执行的时候，先执行函数参数，然后再执行函数体

正是由于它们是不同的作用域，而且在函数体中使用 `var` 重新声明了变量，所以后面的打印结果就是 `3`；如果没有使用 `var` 声明，而是直接这样 `x = 3` ，那么最终的打印结果就是 2

`x` 的打印结果是 `1`，作用域问题

</details>

---

8. 下面的代码输出什么
```js
const cat = {
    lives: 9,
    jumps: () => {
        console.log(this)
    }
}
cat.jumps() 
```

<details>

<summary>答案</summary>

`this` 指向全局

- 箭头函数没有 `this`
- 对象不能构成单独的作用域

所以上面代码中的 `this` 是指向全局的

</details>

---

9. `isNaN()` 与 `Number.isNaN` 有什么区别

<details>

<summary>答案</summary>

都可以用来检查一个值是否为 `NaN`

区别是 `Number.isNaN()` 不会对值进行转换，如果值不是 `Number` 类型，就直接返回 `false`

```js
isNaN(123)  // false
Number.isNaN(123) // false

isNaN(NaN) // true
Number.isNaN(NaN) // true

isNaN('abc') // true
Number.isNaN('abc') // false

```

</details>

---

10. `Array.from` 与 拓展运算符`...`有什么区别

<details>

<summary>答案</summary>

两者都可以将某些数据结构转换为数组

扩展运算符 背后调用的是遍历器接口（`Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换
> 它的主要使用场景包括函数调用、复制、合并数组以及结合解构赋值生成新的数组等

`Array.from` 方法还支持类似数组的对象(任何有 `length` 属性的对象，都可以通过 `Array.from` 方法转为数组，而此时扩展运算符就无法转换)
> 它的使用场景主要是将两类对象转换为真正的数组：类似数组的对象和可遍历（`iterable`）的对象（包括 `ES6` 新增的数据结构 `Set` 和 `Map`）

另外，`Array.from` 还接收第二个参数，类似于 `map` 操作

```js
let obj = {length: 3}

Array.from(obj) // [undefined, undefined, undefined]
[...obj] // 报错：object is not iterable
```

```js
let arr = [1, 2, 3]

add(...arr) // 相当于 add(1, 2, 3)
Array.from(arr, v=> v * 2) // [2, 4, 6]
```

</details>

---

11. `super` 关键字的了解

<details>

<summary>答案</summary>

`super` 有两种使用方式

> 作为对象时：在普通方法中，指向父类的原型对象。表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错

```js
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto); // 指定原型对象
obj.find() // "hello"
```

> 作为函数调用时：代表父类的构造函数，只能用在子类的构造函数之中，用在其他地方就会报错

在 `class` 继承时，我们需要手动指定子类的 `constructor` ，这时候 `super` 就派上了用场

```js
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

`ES6` 规定，子类的构造函数必须执行一次 `super` 函数

`super` 代表了父类 `A` 的构造函数，返回的是子类 `B` 的实例，即 `super` 内部的 `this` 指的是 `B` 的实例，因此 `super()` 在这里相当于 `A.prototype.constructor.call(this)`

</details>

---

12. 对 `Object.assign()` 的了解

<details>

<summary>答案</summary>

> `Object.assign` 方法用于**对象的合并**，将源对象(`scource`)的所有**可枚举属性**，复制到目标对象(`target`)

```js
Object.assign(target, source1, source2)
```

特点：

- 浅拷贝
- 拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性
- 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制
```js
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source) // { foo: 1 }
```
- 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
```js
let obj = {a: 1, b: 2}
let obj1 = {a: 10}

Object.assign(obj, obj1) // {a: 10, b: 2}
```
- 如果只有一个参数，`Object.assign` 会直接返回该参数
- 如果该参数不是对象，则会先转成对象，然后返回
- `undefined` 和 `null` 无法转成对象，所以如果它们作为参数，就会报错.但是如果 `undefined` 和 `null` 不在首参数，就不会报错
```js
Object.assign(undefined) // 报错
Object.assign(null) // 报错

Object.assign({}, undefined) // {}
Object.assign({}, null) // {}
```

更多用法，可参考阮大大的作品 [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/object-methods#Object-assign)

</details>

### 参考

[ECMAScript 6 入门 ](http://es6.ruanyifeng.com/)

[MDN](https://developer.mozilla.org/zh-CN/)

### 后记

以上就是本期 `ES6` 相关的全部内容，其实都是一些很简单的问题，考验的就是你的了解程度以及细心程度，希望对小伙伴们更好的掌握这方面的知识点有些许帮助

感兴趣的小伙伴可以 [点击这里](https://github.com/ltadpoles/web-document) ，也可以扫描下方二维码关注我的微信公众号，查看更多前端小片段，欢迎 `star` 关注


![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/Other/images/weChat.jpg)
