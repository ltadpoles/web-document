### 前言

本文是 `ES6` 系列的第四篇，可以在 [这里](https://github.com/ltadpoles/web-document) 查看 往期所有内容

这篇文章主要记录了一些 `class` 相关的内容，都是我们日常开发中可能会遇到的知识点

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### 起源

`ES6` 之前，我们生成实例对象的方法都是通过构造函数

```js
function Person(name) {
    this.name = name
}
Person.prototype.say = function() {
    console.log(this.name)
}

var p = new Person('游荡de蝌蚪')
```

`ES6` 引入了 `类` 的概念，通过 `class` 关键字来定义。上面的代码就可以这样改写

```js
class Person {
    constructor(name) {
        this.name = name
    }
    say() {
        console.log(this.name)
    }
}

let p = new Person('游荡de蝌蚪')
```

`class` 的这种写法更接近传统语言，无论是对某个属性设置存储函数和取值函数，还是实现继承，都要更加清晰和方便
### 本质及特点

#### 本质

> 类的本质是一个函数，类自身指向的就是构造函数

```js
class Person {}

typeof Person // function

Person.prototype.constructor == Person // true
```

`ES6` 的 `class` 可以看作只是一个**语法糖**，它的绝大部分功能，`ES5` 都可以做到，新的 `class` 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法

类的构造方法 `constructor` 对应的就是构造函数，定义在类中的方法都定义在类的 `prototype` 属性上面

```js
class Person {
    constructor(){},
    say() {},
    run() {}
    ...
}
// 等同于
Person.prototype = {
    constructor(){},
    say(){},
    run(){}
    ...
}

let p = new Person()

p.say == Person.prototype.say // true
```

#### 特点

- 内部默认严格模式
- 不存在变量提升
```js
console.log(Person)
class Person {}
// Uncaught ReferenceError: 
// Cannot access 'Person' before initialization
```
- 不能重复定义
```js
let Person = {}
class Person {}
// Uncaught SyntaxError: 
// Identifier 'Person' has already been declared
```
- `constructor` 是类的默认方法，就算不定义，也会默认添加一个空的 `constructor`
- 实例必须使用 `new` 关键字初始化，否则会报错
- 类的所有实例共享同一个原型对象
```js
class Person {}
let p1 = new Person()
let p2 = new Person()

p1.__proto__ == p2.__proto__ //true
```
- 内部所有定义的方法，都是不可枚举的，并且 `prototype` 默认不可重写
```js
class Person {}

Object.getOwnPropertyDescriptor(Person, 'prototype')
/* 
    configurable: false
    enumerable: false
    value: {constructor: ƒ}
    writable: false
*/
```

### 静态方法

```js
class Person {
    static say() {
        console.log('Hello')
    }
}
```
`class` 中如果一个方法前添加了 `static` 关键字，那么就表示这个方法是静态方法。它不能被实例继承，只能通过类来调用

```js
let p = new Person()
p.say() // Uncaught TypeError: p.say is not a function

Person.say() // Hello
```

需要注意的是：父类的静态方法，可以被子类继承

```js
class Tadpole extends Person {}

Tadpole.say() // Hello
```

### 静态属性

所谓静态属性，就是类本身的属性，也就是说属性不能通过添加在 `this` 上的方式定义
```js
// 属性不能定义在 this 上面，会被实例继承
class Person {
    constructor(name) {
        this.name = name
    }
}
```

> `ES6` 明确规定，`Class` 内部只有静态方法，没有静态属性

一般情况下，我们实现静态属性的方式就是直接将属性添加到类上面：
```js
Person.age = 18
```
可也以用一种变通的方式实现：
```js
// 通过 static 静态方法与 get 方式的结合
class Person {
    static get age() {
        return 18
    }
}
```

类的静态属性和静态方法的表现基本一致：不能被实例继承，只能通过类来使用

[提案](https://github.com/tc39/proposal-class-fields) 提供了一种类静态属性的另一种方式，也是使用 `static` 关键字
```js
class Person {
    static name = 18
}
```

### 私有属性

所谓私有，一般需要具备以下特征：
- 只能在 `class` 内部访问，不能在外部使用
- 不能被子类继承

`ES6` 并没有提供 `class` 的私有属性及方法的实现方式，但是我们可以通过以下几种方式来约定

- 命名上面添加标识：方法名前面添加 `_` ，但是这种方式不是很保险，因为在类的外部还是可以访问到这个方法
```js
class Person {
    // 公有方法
    fn(age) {
        this.age = age
    }
    // 私有方法
    _foo(age){
        return this.age = age
    }
}
```
- 将私有的方法移出模块，利用 `this` 创造出一个相对封闭的空间
```js
class Person{
    foo(age) {
        bar.call(this, age)
    }
}
function bar(age) {
    return this.age = age
}
```

[提案](https://github.com/tc39/proposal-private-methods) 提供了一种实现 `class` 私有属性的方式：使用 `#` 关键字

```js
class Person {
    #age = 18
}
```
如果我们在外部使用这个属性就会报错
```js
let p = new Person()
Person.#age
p.#age
// Uncaught SyntaxError: 
// Private field '#age' must be declared in an enclosing class
```

另外，私有属性也支持 `getter` 和 `setter` 的方式以及静态 `static` 的方式
```js
class Person {
    #age = 18
    get #x() {
        return #age
    }
    set #x(value) {
        this.#age = value
    }
    static #say() {
        console.log(#age)
    }
}
```

### 继承

在 `class` 出现之前，我们一般都会使用原型以及构造函数的方式实现继承，更多实现继承的方式参考 [JavaScript中的继承](https://segmentfault.com/a/1190000018927068)

类的继承也是通过原型实现的

> `ES5` 的继承，实质是先创造子类的实例对象 `this` ，然后再将父类的方法添加到 `this` 上面

> `ES6` 的继承，实质是先将父类实例对象的属性和方法，加到 `this` 上面（所以必须先调用 `super` 方法），然后再用子类的构造函数修改 `this`

#### extends关键字

> `class` 通过 `extends` 关键字实现继承

通过 `extends` 关键字，子类将继承父类的所有属性和方法

```js
class Person {}

class Tadpole extends Person {}
```

`extends` 关键字后面不仅可以跟类，也可以是表达式

```js
function Person(){
    return class {
        say(){
            alert('Hello')
        }
    }
}

class Tadpole extends Person(){}

new Tadpole().say() // Hello
```

`extends` 关键字后面还可以跟任何具有 `prototype` 属性的函数（这个特性可以让我们很轻松的复制一个原生构造函数，比如 `Object`）

```js
function Fn() {
    this.name = 'tadpole'
}
// 注意，这里 constructor 的指向变了
Fn.prototype = {
    say() {
        console.log('My name is tadpole')
    }
}

class Tadpole extends Fn {}

let t = new Tadpole()

t.name // tadpole
t.say() // My name is tadpole
```

#### super 关键字

子类通过继承会获取父类的所有属性和方法，所以下面的写法可以得到正确的结果

```js
class Person {
    constructor() {
        this.name = '游荡de蝌蚪'
    }
}
class Tadpole extends Person{}

let t = new Tadpole()
t.name // 游荡de蝌蚪
```

但是，如果我们在子类中定义了 `constructor` 属性，结果就是报错

```js
class Tadpole extends Person {
    constructor(){}
}

let t = new Tadpole()
// Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

如果我们想要在子类中定义 `constructor` 属性，那么就必须调用 `super` 方法

```js
// 正常
class Tadpole extends Person {
    constructor(){
        super()
    }
}

let t = new Tadpole()
```

super代表了父类的构造函数，返回的是子类的实例，相当于 `Person.prototype.constructor.call(this)`

所以，**上面代码中 `super()` 的作用实际上就是将 `this` 添加到当前类，并且返回**

`super` 有两种使用方式：
##### 作为函数

`super()` 只能用在子类的构造函数之中，用在其他地方就会报错

##### 作为对象

- 在普通方法中，指向父类的原型对象（`super` 指向父类的原型对象，所以定义在父类实例上的方法或属性，无法通过 `super` 调用）
```js
class Person {
    constructor() {
        this.name = '游荡de蝌蚪'
    }
    say() {
        console.log('My name is' + this.name)
    }
}

class Tadpole extends Person {
    constructor() {
        super()
        console.log(super.say()) // My name is 游荡de蝌蚪
        console.log(super.name) // undefined
    }
}
```
- 在静态方法中，指向父类
```js
class Person {
    constructor() {
        this.name = '游荡de蝌蚪'
    }
    say() {
        console.log('My name is' + this.name)
    }
    static say() {
        console.log('My name in tadpole')
    }
}

class Tadpole extends Person {
    static say() {
        super.say()
    }
    say() {
        super.say()
    }
}

Person.say() // My name is tadpole
Tadpole.say() // My name is tadpole
let t = new Tadpole()
t.say() // My name is 游荡de蝌蚪
```

### class 中的this

- 类的方法内部如果含有 `this`，默认指向类的实例
```js
class Person {
    say() {
        this.run()
    }
    run() {
        console.log('Run!')
    }
}
```
- 如果静态方法包含 `this` 关键字，这个 `this` 指的是类，而不是实例
```js
class Person {
    static say() {
        console.log(this) // Person
    }
}
```
- 子类继承父类，子类必须在 `constructor` 中调用 `super()` 之后才能使用 `this`
- `class` 中默认使用严格模式，如果将其中的方法单独调用，那么方法中的 `this` 指向 `undefined` （默认指向全局对象）

### class 的问题

`class` 的出现为我们的编程提供了很多便利，但是 `class` 本身也存在一些问题

- 首先，增加了学习成本有木有。你说说我连原型、原型链还没搞清楚呢，你又让我去学 `class`，竟然还只是 `语法糖`，你说气人不气人
- 其次，基于 `prototype`，所以 `class` 也存在原型所具有的一些问题，比如修改父类上面的属性可能会影响到所有子类（当然，私有属性的出现还是解决了一些问题）
- 并不是所有的环境都支持 `class`，比如那个啥啥啥，当然了也有解决的方式：`babel` 
- ...

尽管 `class` 还是存在些许问题，但它一定会越来越丰富...

### 后记

以上就是关于 `class` 的全部内容，希望对看到的小伙伴有些许帮助

大胆地在你的项目中使用 `class` 吧，相信你绝对会爱上它

感兴趣的小伙伴可以 [点击这里](https://github.com/ltadpoles/web-document) ，也可以扫描下方二维码关注我的微信公众号，查看往期更多内容，欢迎 `star` 关注


![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/Other/images/weChat.jpg)

### 参考

[ECMAScript 6 入门](https://es6.ruanyifeng.com/)

[MDN](https://developer.mozilla.org/zh-CN/)
