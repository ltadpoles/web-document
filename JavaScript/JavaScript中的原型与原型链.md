[前言](#start)

[原型](#prototype)

[原型特点](#aboutPro)

[原型链](#prototypeList)

[class类](#class)

[关系判断](#and)

[原型链的问题](#question)

[后记](#end)

[参考文档](#reference)

<h3 id='start'>前言</h3>

作为前端高频面试题之一，相信很多小伙伴都有遇到过这个问题。那么你是否清楚完整的了解它呢？ 

国际惯例，让我们先抛出问题：
- 什么是原型、原型链
- 它们有什么特点
- 它们能做什么
- 怎么确定它们的关系

或许你已经有答案，或许你开始有点疑惑，无论是 `get` 新技能或是简单的温习一次，让我们一起去探究一番吧

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

<h3 id='prototype'>原型</h3>

> JavaScript是基于原型的

> 我们创建的每个函数都有一个 `prototype(原型)` 属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

简单来说，就是当我们创建一个函数的时候，系统就会自动分配一个 `prototype`属性，可以用来存储可以让所有实例共享的属性和方法

用一张图来表示就更加清晰了：
![原型](https://raw.githubusercontent.com/ltadpoles/web-document/master/images/%E5%8E%9F%E5%9E%8B%E5%9B%BE%E7%A4%BA.jpg)

图解：
- 每一个构造函数都拥有一个 `prototype` 属性，这个属性指向一个对象，也就是原型对象
- 原型对象默认拥有一个 `constructor` 属性，指向指向它的那个构造函数
- 每个对象都拥有一个隐藏的属性 `__proto__`，指向它的原型对象

```js
function Person(){}

var person = new Person();

person.__proto__ === Person.prototype // true

Person.prototype.constructor === Person // true
```

那么，原型对象都有哪些特点呢

<h3 id='aboutPro'>原型特点</h3>

```js
function Person(){}
Person.prototype.name = 'tt';
Person.prototype.age = 18;
Person.prototype.sayHi = function() {
    alert('Hi');
}
var person = new Person();
var person1 = new Person();
person.name = 'oo';
person.name // oo
person.age // 18
perosn.sayHi() // Hi
person1.age // 18
person1.sayHi() // Hi
```
从这段代码我们不难看出：
- 实例可以共享原型上面的属性和方法
- 实例自身的属性会屏蔽原型上面的同名属性，实例上面没有的属性会去原型上面找

既然原型也是对象，那我们可不可以重写这个对象呢？答案是肯定的

```js
function Person() {}
Person.prototype = {
    name: 'tt',
    age: 18,
    sayHi() {
        console.log('Hi');
    }
}

var person = new Person()
```
只是当我们在重写原型链的时候需要注意以下的问题:

```js
function Person(){}
var person = new Person();
Person.prototype = {
    name: 'tt',
    age: 18
}

Person.prototype.constructor == Person // false

person.name // undefined
```

一图胜过千言万语

![重写原型链](https://raw.githubusercontent.com/ltadpoles/web-document/master/images/%E9%87%8D%E5%86%99%E5%8E%9F%E5%9E%8B%E5%AF%B9%E8%B1%A1.jpg)

- 在已经创建了实例的情况下重写原型，会切断现有实例与新原型之间的联系
- 重写原型对象，会导致原型对象的 `constructor` 属性指向 `Object` ，导致原型链关系混乱，所以我们应该在重写原型对象的时候指定 `constructor`( `instanceof` 仍然会返回正确的值)

```js
Person.prototype = {
    constructor: Person
}
```
注意：以这种方式重设 `constructor` 属性会导致它的 `Enumerable` 特性被设置成 `true`(默认为`false`)

既然现在我们知道了什么是 `prototype(原型)`以及它的特点，那么原型链又是什么呢？

<h3 id='prototypeList'>原型链</h3>

> `JavaScript` 中所有的对象都是由它的原型对象继承而来。而原型对象自身也是一个对象，它也有自己的原型对象，这样层层上溯，就形成了一个类似链表的结构，这就是原型链

同样的，我们使用一张图来描述
![原型链](https://raw.githubusercontent.com/ltadpoles/web-document/master/images/%E5%8E%9F%E5%9E%8B%E9%93%BE.png)

- 所有原型链的终点都是 `Object` 函数的 `prototype` 属性
- `Objec.prototype` 指向的原型对象同样拥有原型，不过它的原型是 `null` ，而 `null` 则没有原型

清楚了原型链的概念，我们就能更清楚地知道属性的查找规则，比如前面的 `person` 实例属性.如果自身和原型链上都不存在这个属性，那么属性最终的值就是 `undefined` ，如果是方法就会抛出错误

<h3 id='class'>class类</h3>

> `ES6` 提供了 `Class(类)` 这个概念，作为对象的模板，通过 `class` 关键字，可以定义类

为什么会提到 `class` ：

`ES6` 的 `class` 可以看作只是一个语法糖，它的绝大部分功能，`ES5` 都可以做到，新的 `class` 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

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

// 可以这么改写
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
```
 `class` 里面定义的方法，其实都是定义在构造函数的原型上面实现实例共享,属性定义在构造函数中，所以 `ES6` 中的类完全可以看作构造函数的另一种写法
 
 除去 `class` 类中的一些行为可能与 `ES5` 存在一些不同，本质上都是通过原型、原型链去定义方法、实现共享。所以，还是文章开始那句话  **JavaScript是基于原型的**
 
 更多 `class` 问题，参考[这里](https://es6.ruanyifeng.com/#docs/class)

<h3 id='and'>关系判断</h3>

> instanceof

最常用的确定原型指向关系的关键字，检测的是原型,但是只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型

```js
function Person(){}
var person = new Person();

person instanceof Person // true
person instanceof Object // true
```
> hasOwnProperty

通过使用 `hasOwnProperty` 可以确定访问的属性是来自于实例还是原型对象

```js
function Person() {}
Person.prototype = {
    name: 'tt'
}
var person = new Person();
person.age = 15;

person.hasOwnProperty('age') // true
person.hasOwnProperty('name') // false
```

<h3 id='question'>原型链的问题</h3>

由于原型链的存在，我们可以让很多实例去共享原型上面的方法和属性，方便了我们的很多操作。但是原型链并非是十分完美的

```js
function Person(){}
Person.prototype.arr = [1, 2, 3, 4];

var person1 = new Person();
var person2 = new Person();

person1.arr.push(5) 
person2.arr // [1, 2, 3, 4, 5]
```
引用类型，变量保存的就是一个内存中的一个指针。所以，当原型上面的属性是一个引用类型的值时，我们通过其中某一个实例对原型属性的更改，结果会反映在所有实例上面，这也是原型 `共享` 属性造成的最大问题

另一个问题就是我们在创建子类型（比如上面的 `person`）时，没有办法向超类型（ `Person` ）的构造函数中传递参数

<h3 id='end'>后记</h3>

鉴于原型的特点和存在的问题，所以我们在实际开发中一般不会单独使用原型链。一般会使用构造函数和原型相配合的模式，当然这也就牵扯出了 `JavaScript` 中另一个有意思的领域：`继承`

那么，什么又是继承呢

且听下回分解

最后，推荐一波前端学习历程，不定期分享一些前端问题和有意思的东西欢迎 `star` 关注 [传送门](https://github.com/ltadpoles/web-document)

<h3 id='start'>参考文档</h3>

JavaScript高级程序设计

[ECMAScript6入门](https://es6.ruanyifeng.com/)