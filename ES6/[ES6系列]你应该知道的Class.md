### 起源

一直以来，我们生成实例对象的方法都是通过构造函数

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
Person.prototype.say = {
    constructor(){},
    say(){},
    run(){}
    ...
}

let p = new Person()

p.say == Person.prototype.say // true
```

#### 特点

- 严格模式
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
- `constructor` 是类的默认方法，就算不定义，也会有一个空的 `constructor`
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