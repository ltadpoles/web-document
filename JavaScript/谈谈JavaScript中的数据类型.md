[前言](#前言)

[原始值](#原始值)

- [String类型](#string类型)

- [Boolean类型](#boolean类型)

- [Number类型](#number类型)

- [Undefined类型](#undefined类型)

- [Null类型](#null类型)

- [Symbol类型](#symbol类型)

[引用类型](#引用类型)

[基本包装类型](#基本包装类型)

[后记](#后记)

## 前言

> `ECMAScript` 迄今为止标准定义了 `7` 种数据类型：`6` 种原始类型-- `String`、`Number`、 `Boolean`、 `Undefined`、`Null` 和 `Symbol`；`1` 种引用类型-- `Object`

看到这里，你是否已经对它们了如指掌呢。如果你还对它们之间的定义、转换、检测等方面并不是那么清楚，或者已经有些模糊。那么，下面就让我们一起去重新探索、温习一遍吧

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

## 原始值

> 除 `Object` 以外的所有类型都是不可变的（值本身无法被改变），我们称这些类型的值为 `原始值`

### String类型

> `JavaScript` 的字符串类型用于表示文本数据.`JavaScript` 字符串是不可更改的。这意味着字符串一旦被创建，就不能被修改。但是，可以基于对原始字符串的操作来创建新的字符串

```js
var a = 'hello'
```

类型转换:

- `toString()`

```js
var num = 2;
num.toString() // '2'
var found = true;
found.toString() // 'true'

```
> 除去 `null` 与 `undefined` 之外，其余数据类型都存在 `toString` 方法，使用会报错

- `String()`

```js
var sym = Symbol(1);
String(sym) // 'Symbol'
var num = 10;
String(num)  // '10'
var str;
String(str) // 'undefined'
```

> 如果值有 `toString` 方法，则调用该方法并返回响应的结果

> 如果是 `null` 返回 `'null'`

> 如果是 `undefined` 返回 `'undefined'`

- 隐式转换

```js
var a = 3;
a + ''  // '3'
var obj = {a: 3};

obj + '' // [object object]
```

> 转换规则和 `String` 方法一致



### Number类型

> 根据 `ECMAScript` 标准，`JavaScript` 中只有一种数字类型：基于 `IEEE 754` 标准的双精度 `64` 位二进制格式的值（`-(263 -1)` 到 `263 -1`）

特殊的数值类型：

> 无穷大：`+Infinity()`，`-Infinity()` 和 `NaN` (非数值，`Not-a-Number`)

`NaN`，非数值。是一个特殊的 `Number` 类型，用来表示一个本来要返回数值的操作未返回数值的情况

- 任何涉及 `NaN` 的操作都返回 `NaN`
- `NaN` 与任何值都不相等，包括 `NaN` 本身

```js
40 / NaN  // NaN
NaN === NaN // false
```

> 最基本的数值字面量格式是十进制整数，还可以通过八进制或十六进制来表示。八进制字面值的第一位必须是 `0`，然后是八进制数字序列`（0 ~ 7）`。十六进制字面量的前两位必须是 `0x`，后跟任何十六进制数字`（0 ~ 9 以及 a ~ f）`。其中字母可以是大写也可以是小写

```js
var num1 = 070; // 八进制的56
var num1 = 079; // 无效的八进制，会解析为十进制的79
var num2 = 56; // 十进制的56
var num3 = 0x38; // 十六进制的56
```

> 类型转化方式：`Number()`、`parseInt()`、`parseFloat()` 以及操作符隐式转换

#### Boolean类型

> 表示一个逻辑实体，可以有两个值：`true` 和 `false`

```js
var suc = true;
var los = false;
```

类型转化方式：`Boolean()`以及操作符隐式转换

### Undefined类型

> `Undefined` 类型只有一个值，即特殊的 `undefined` 。一个  声明但没有被赋值的变量会有个默认值 `undefined`

```js
var a;  // undefined
```

### Null类型

> `Null` 类型也只有一个值，即特殊的 `null` 表示一个空对象指针

```js
var foo = null;
```

### Symbol类型

> 符号 `(Symbols)` 是 `ECMAScript` 第 `6` 版新定义的。符号类型是唯一的并且是不可修改的

```js
var s = Symbol()
```
> `Symbol` 函数前不能使用 `new` 命令，否则会报错。这是因为生成的 `Symbol` 是一个原始类型的值，不是对象

> `Symbol` 函数可以接受一个字符串作为参数，表示对 `Symbol` 实例的描述

## 引用类型

> 在 `ECMAScript` 中，引用类型是一种数据结构，用于将数据和功能组织在一起

最常见的引用类型：对象`（Object）`、数组`（Array）`、函数`（Function）`、正则`（RegExp）`和日期`（Date）`等

> 引用类型与基本类型之间最大的不同

**基本数据类型的值是按值访问的**，基本类型的值是不可变的

```js
var a = 1;
var b = 1;

a === b  // true

b = a 
b = 2;

a // 1
```

**引用类型的值是按引用访问的**，引用类型的值是可变的

```js
var a = {};
var b = {};

a === b  // false

var a = {};
var b = a
b.name = 'hello'

a.name // hello
```

## 基本包装类型

> 为了便于操作基本类型值， `ECMAScript` 还提供了 `3` 个特殊的引用类型：`Boolean`、`Number` 和 `String`

```js
var a = new String('hello')
typeof a // object 
```

> 引用类型与基本包装类型的主要区别就是对象的生存期。使用 `new` 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存当中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即销毁。这意味着我们不能在运行时给基本类型值添加属性和方法

```js
var s1 = 'some text';
s1.color = 'red';
s1.color // undefined

// 但是这样是可以的

var s1 = new String('some text');
s1.color = 'red';
s1.color // red 
```

> 不建议显式的创建基本包装类型的对象,因为在很多时候会造成一些让人很迷惑的东西

```js
var b = new Boolean(false)
var c = b && true
c // true
```

这样的情况下，`b` 这个变量就是 `Boolean` 对象，所以无论在什么情况下，它都是 `true`

记得之前看到过这样一个问题：

```js
var str = 'hello'

typeof str // String

str instanceof String // false
```

这里的结果为 `false` 的原因就是 `str` 本质上是一个原始值，并不存在 `prototype` 属性

当然，这里也涉及到了数据类型的判断，有兴趣的小伙伴可以 [点击这里](https://segmentfault.com/a/1190000018536392#articleHeader2) 查看如何判断 `JavaScript` 中的数据类型

## 后记

不断总结温习前端方面的知识点以及有趣的东西，感兴趣的小伙伴可以 [点击这里](https://github.com/ltadpoles/web-document)，查看完整版前端总结知识点，欢迎 `star` 关注

期待同行

以上



