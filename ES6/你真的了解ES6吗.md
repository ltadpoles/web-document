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

`y` 在没赋值之前使用，隐藏的 `暂时性死区`

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
cat.jump() 
```

<details>

<summary>答案</summary>

报错 

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

`扩展运算符` 背后调用的是遍历器接口（`Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换
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

> `super`: 指向当前对象的原型对象

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
14. 对 `Object.assign()` 的了解
15. 什么是尾调用及其优化



