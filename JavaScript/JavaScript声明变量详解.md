[前言](#前言)

[var 声明](#var声明)

[function 关键字声明](#function关键字声明)

[let 声明](#let声明)

[const 声明](#const声明)

[class 声明](#class声明)

[全局变量](#全局变量)

[隐式声明](#隐式声明)

[最后](#最后)

[参考文档](#参考文档)


## 前言

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

在`ES5`阶段，`JavaScript` 使用 `var` 和 `function` 来声明变量， `ES6` 中又添加了`let`、`const`、`import`、  `Class` 这几种声明变量的方式。那么，他们各自都有什么样的特点呢？

下面，就让我们一起去探究一下吧

以下↓

> 变量就是存储信息的容器。 `ECMAScript` 的变量是松散类型的，所谓松散类型就是可以用来保存任何类型的数据

### var声明

一直以来，我们都是使用 `var` 关键字来声明变量

```js
var a = 1;
var b;

console.log(a) // 1
console.log(b) // undefined
console.log(c) // undefined

var b = 2;
var c = 3;
console.log(b) // 2
console.log(c) // 3

function f() {
    var c = 4;
    console.log(c) // 4
    c = 5;
    console.log(c) // 5
}
f();
console.log(c) // 3

function fun() {
    c = 6
}
fun();
console.log(c) // 6

```

从上面的结果我们不难看出，使用var声明的变量具有以下特点：

- 变量可以没有初始值，会保存一个特殊的值 `undefined`
- 变量可以重复定义，且可以修改值
- 变量声明语句从自动提升到所在作用域的顶端
- 函数内重复定义对函数外无影响(局部变量)
- 函数内重新赋值对函数外有影响

### function关键字声明

在 `ES5` 中，除了使用 `var` 声明变量，我们也可以使用 `function` 关键字声明变量

```js

f();
function f() {console.log(1)}
var f;

console.log(f) // function f
```

特点：

- 使用 `function` 声明的是函数对象，也存在声明提升
- 函数声明要优于变量声明

### let声明

由于 `ES5` 中使用 `var` 声明变量存在着一些很让人迷惑的特性（比如变量提升，重复定义等），`ES6` 中新增 `let` 命令，用来声明变量。它的用法类似于 `var` ，但是所声明的变量，只在 `let` 命令所在的代码块内有效

```js
{
    var a = 1;
    let b = 2;
}
console.log(a) // 1
console.log(b) // Uncaught ReferenceError: b is not defined

console.log(c) // Uncaught ReferenceError: c is not defined

let c = 3

let a = 4

console.log(a) // Identifier 'a' has already been declared
```

通过以上的代码，我们很容易发现使用 `let` 声明变量的特点：

- `let` 声明的变量只在它所在的代码块有效
- 不存在变量提升
- 不可以重复声明

由于 `let` 声明变量的这些特点，所以 `for` 循环的计数器，就很合适使用 `let` 命令

```js
for(let i = 0; i < 10; i++) {
    //
}

console.log(i) // Uncaught ReferenceError: c is not defined

// 如果使用var声明，则在这里输出的就是10
```

> `let` 实际上为 `JavaScript` 新增了块级作用域

### const声明

`const` 也是 `ES6` 新增的声明变量的方式，`const` 声明一个只读的常量。一旦声明，常量的值就不能改变

```js
const API;

console.log(API) // SyntaxError: Missing initializer in const declaration

console.log(MAX); // Uncaught ReferenceError: MAX is not defined
const MAX = 1;

const MAX = 2;

console.log(MAX); // Identifier 'MAX' has already been declared

const PI = 3.1415;

console.log(PI) // 3.1415

PI = 3; // TypeError: Assignment to constant variable.

const f = {}
f.name = 'HELLO' // 正常执行

f = {name: 'World'} // 报错
```

所以，使用 `const` 声明的变量具有以下特点：

- `const` 一旦声明变量，就必须立即初始化，不能留到以后赋值
- 不允许重复声明
- 不存在变量提升
- `const` 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动

> 如果真的想将对象冻结，应该使用 `Object.freeze` 方法

### import声明

`ES6` 新增的模块的概念。

> 模块功能主要由两个命令构成：`export` 和 `import`。 `export` 命令用于规定模块的对外接口，`import` 命令用于输入其他模块提供的功能

所以在一定程度上来说，`import` 也具有声明变量的功能。只是在使用 `import` 的时候，具有一些限制

```js
export { first, last } 

import { first, last } from './xxx'

first = {} // Syntax Error : 'a' is read-only;

first.name = 'Hello' // 成功执行，但是不建议这样使用

export default function(){} // a.js

import xxx from 'a.js'

import { New as $ } from './xxx'
```

特点：

- `import` 命令接受一对大括号，大括号里面的变量名，必须与被导入模块对外接口的名称相同
- `import` 命令输入的变量都是只读的，因为它的本质是输入接口
- 当使用 `export default` 命令，为模块指定默认输出的时候，`import` 命令可以为该匿名函数指定任意名字
- `import` 命令具有提升效果，会提升到整个模块的头部，首先执行
- 如果想为输入的变量重新取一个名字，`import` 命令要使用 `as` 关键字，将输入的变量重命名

> 本质上，`export default` 就是输出一个叫做 `default` 的变量或方法，然后系统允许你为它取任意名字

### class声明

`ES6` 引入了类的概念，有了 `class` 这个关键字，作为对象的模板。通过 `class` 关键字，可以定义类

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

> `ES6` 的 `class` 可以看作只是一个语法糖，它的绝大部分功能，`ES5` 都可以做到，类的实质还是函数对象，类中的方法和对象其实都是挂在对应的函数对象的 `prototype` 属性下

所以就可以改写成下面这种ES5的方式

```js
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
}
```

特点：

- 所有类都有 `constructor` 函数，如果没有显式定义，一个空的 `constructor` 方法会被默认添加。当然所有函数对象都必须有个主体
- 生成类的实例对象的写法，与 `ES5` 通过构造函数生成对象完全一样，也是使用 `new` 命令

```js
class B {}

let b = new B();
```
- 在类的实例上面调用方法，其实就是调用原型上的方法
- 与函数对象一样，`Class` 也可以使用表达式的形式定义
- `Class` 其实就是一个 `function` ，但是有一点不同，`Class` 不存在变量提升，也就是说 `Class` 声明定义必须在使用之前

### 全局变量

> 在浏览器环境指的是 `window` 对象，在 `Node` 指的是 `global` 对象。`ES5` 之中，顶层对象的属性与全局变量是等价的

> `var` 命令和 `function` 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let` 命令、`const` 命令、`class` 命令声明的全局变量，不属于顶层对象的属性。也就是说，从 `ES6` 开始，全局变量将逐步与顶层对象的属性脱钩

```js
var a = 1;

window.a // 1

let b = 2;

window.b // undefined
```

### 隐式声明

在 `JavaScript` 中还存在着隐式声明。

```js
a = 1;
console.log(a) // 1
```

> 当没有声明，直接给变量赋值时，会隐式地给变量声明，此时这个变量作为全局变量存在。这个时候就不存在声明提前的问题了

### 最后

其实只要我们理解并掌握了这几种声明变量的方式，记住它们的特点，那么在实际使用的过程当中就很容易能够找到最合适的方式去定义

每天学习分享，不定期更新

最后，推荐一波前端学习历程，这段时间总结的一些面试相关，分享给有需要的小伙伴，欢迎 `star` 关注 [传送门](https://github.com/ltadpoles/web-document)

### 参考文档

[ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/let)

[ES6变量声明](https://www.jianshu.com/p/f56af9d7abc6)