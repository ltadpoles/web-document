### 前言

作为 `JavaScript` 中最重要的内容之一，继承问题一直是我们关注的重点。那么你是否清晰地知道它的原理以及各种实现方式呢

阅读这篇文章，你将知道：

- 什么是继承
- 实现继承有哪几种方式
- 它们各有什么特点

这里默认你已经清楚的知道构造函数、实例和原型对象之间的关系，如果并不是那么清晰，那么推荐你先阅读这篇文章 -- [JavaScript 中的原型与原型链](https://segmentfault.com/a/1190000018895543?_ea=9933257)

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### 概念

> 继承（inheritance）是面向对象软件技术当中的一个概念。如果一个类别 `B` `继承自` 另一个类别 `A` ，就把这个 `B` 称为 `A的子类` ，而把 `A` 称为 `B的父类别` 也可以称 `A是B的超类` 。继承可以使得子类具有父类别的各种属性和方法，而不需要再次编写相同的代码 ...[更多](https://zh.wikipedia.org/wiki/%E7%BB%A7%E6%89%BF_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6))

![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/JavaScript/images/%E7%BB%A7%E6%89%BF%E6%A6%82%E5%BF%B5.jpg)

通过这些概念和图示我们不难知道继承可以在我们的开发中带来的便捷，那么在 `JavaScript` 中如何去实现继承呢？

### 继承实现方式

#### 原型链继承

>利用原型让一个引用类型继承另一个引用类型的属性和方法

```js
function SuperType() {
    this.name = 'tt';
}
SuperType.prototype.sayName = function() {
    return this.name
}

function SubType() {
    this.name = 'oo';
}
SubType.prototype = new SuperType()

var instance = new SubType()

instance.sayName() // oo
instance instanceof SubType // true
instance instanceof SuperType // ture
```

以上的试验中，我们创建了两个构造函数 `SuperType` 和 `SubType` ,并且让 `SubType` 的原型指向 `SuperType` ，`SubType` 也就继承了 `SuperType` 原型对象中的方法。所以在创建 `instance` 实例的时候，实例本身也就具有了 `SuperType` 中的方法，并且都处在它们的原型链中

```js
SubType.prototype.constructor == SubType // false
SubType.prototype.constructor == SuperType // true
```
需要注意的是：这个时候 `SubType.prototype.constructor` 是指向 `SuperType` 的，相当于重写了 `SubType` 的原型对象。

用一张图表示：

![image](https://user-gold-cdn.xitu.io/2019/5/5/16a87671d24971de?w=662&h=450&f=jpeg&s=49781)

- `SubType.prototype` 相当于 `SuperType` 的实例存在的，所以 `SubType.prototype.constructor` 就指向 `SuperType`

#### 原型继承的特点

优点：

- 简单、易于实现
- 父类新增原型方法/原型属性，子类都能访问到
- 非常纯粹的继承关系，实例是子类的实例，也是父类的实例

缺点：
- 无法实现多继承
- 想要为子类 `SubType `添加原型方法，就必须在 `new SuperType` 之后添加（会覆盖）
- 来自原型对象的所有属性被所有实例共享(引用类型的值修改会反映在所有实例上面)
- 创建子类实例时，无法向父类构造函数传参

### 借用构造函数

> 在子类构造函数的内部调用超类型构造函数，通过 `apply` 和 `call` 实现

```js
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'orange', 'black'];
}

function SubType() {
    SuperType.call(this, 'tt');
}

var instance = new SubType()
var instance1 = new SubType()

instance.colors // ['red', 'orange', 'black']
instance.name // tt

instance.colors.push('green');
instance.colors // ['red', 'orange', 'black', 'green']
instance1.colors // ['red', 'orange', 'black']
```

#### 借用构造函数的特点

优点：

- 解决了原型链继承不能传参的问题
- 子类实例共享父类引用属性的问题
- 可以实现多继承(`call`可以指定不同的超类)

缺点：

- 实例并不是父类的实例，只是子类的实例
- 只能继承父类的实例属性和方法，不能继承原型属性/方法
- 无法实现函数复用

### 组合继承

> 伪经典继承（最常用的继承模式）：将原型链和借用构造函数的技术组合到一起。使用原型链实现对原型属性和方法的继承，通过构造函数来实现对实例属性的继承

```js
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'orange', 'black'];
}
SuperType.prototype.sayName = function() {
    return this.name
}

function SubType() {
    SuperType.call(this, 'tt');
    this.name = 'oo';
}
// 这里的 SubType.prototype.constructor 还是指向 SuperType
SubType.prototype = new SuperType();

var instance = new SubType();
var instance1 = new SubType();

instance.name // oo
instance.sayName() // oo

instance.colors.push('green');
instance.colors // ['red', 'orange', 'black', 'green']
instance1.colors // ['red', 'orange', 'black']
```

#### 组合继承的特点

优点：

- 可以继承实例属性/方法，也可以继承原型属性/方法
- 不存在引用属性共享问题
- 可传参
- 函数可复用

缺点：

- 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

### 原型式继承

> 借助原型链可以基于已有的对象创建新对象，同时还不必因此创建自定义类型

```js
function obj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}

var person = {
    name: 'tt',
    age: 18,
    colors: ['red', 'green']
}

var instance = obj(person);
var instance1 = obj(person);
instance.colors.push('black');
instance.name // tt
instance.colors // ['red', 'green', 'black']
instance1.colors // ['red', 'green', 'black']
```

创建一个临时的构造函数，然后将传入的对象当做这个构造函数的原型对象，最后返回这个临时构造函数的新实例。实际上，**就是对传入的对象进行了一次浅复制**

`ES5` 通过新增 `Object.create()` 规范化了原型式继承

更多 Object.create()语法请点击 [这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

#### 原型式继承特点

优点：

- 支持多继承（传入的对象不同）
- 不需要兴师动众的创建很多构造函数

缺点： 和原型链继承基本一致，效率较低，内存占用高（因为要拷贝父类的属性）

### 寄生式继承

> 创建一个仅用于封装继承过程的函数，在函数内部对这个对象进行改变，最后返回这个对象

```js
function createAnother(obj) {
    var clone = Object(obj);
    clone.sayHi = function() {
        alert('Hi');
    }
    return clone
}

var person = {
    name: 'tt',
    age: 18,
    friends: ['oo', 'aa', 'cc'],
    sayName() {
        return this.name
    }
}

var instance = createAnother(person)
var instance1 = createAnother(person)

instance.friends.push('yy')

instance.name // 'tt'
instance.sayHi() // Hi
instance.friends // ["oo", "aa", "cc", "yy"]
instance1.friends // ["oo", "aa", "cc", "yy"]
```

#### 寄生式继承的特点

优点： 

- 支持多继承

缺点：

- 实例并不是父类的实例，只是子类的实例
- 不能实现复用（与构造函数相似）
- 实例之间会互相影响

### 寄生组合继承

> 借用构造函数来继承属性，通过原型链的混成形式来继承方法。通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

```js
function inherit(subType, superType) {
    var obj = Object(superType.prototype); // 创建对象
    obj.constructor = subType;  // 指定constructor
    subType.prototype = obj;    // 指定对象
}

function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'orange', 'black'];
}
SuperType.prototype.sayName = function() {
    return this.name
}

function SubType() {
    SuperType.call(this, 'tt');
    this.name = 'oo';
}

inherit(SubType, SuperType)

var instance = new SubType()

instance.name // oo
instance.sayName // oo
instance instanceof SubType // true
instance instanceof SuperType // true
SubType.prototype.constructor == SubType // true
```

#### 寄生组合继承的特点

堪称完美，只是实现稍微复杂一点

### 后记

作为 `JavaScript` 最重要的概念之一，对于继承实现的方式方法以及它们之间的差异我们还是很有必要了解的。

在实现继承的时候，`拷贝` 也是一种很有效的方式，由于 `JavaScript` 简单数据类型与引用类型的存在，衍生出了 `浅拷贝` 与 `深拷贝` 的概念，那么它们又是什么，怎么去实现呢

且听下回分解，哈哈

周末愉快

最后，推荐一波前端学习历程，不定期分享一些前端问题和有意思的东西欢迎 star 关注 [传送门](https://github.com/ltadpoles/web-document)

### 参考文档

JavaScript 高级程序设计

[JavaScript实现继承的几种方式](https://www.cnblogs.com/humin/p/4556820.html)