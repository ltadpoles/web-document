### 惰性函数

> 当我们需要重复使用一个逻辑的时候，优化逻辑判断，提高 `JavaScript` 性能
> 原理：同名函数覆盖

```js
function createXHR() {
    var xhr
    try {
        xhr = new XMLHttpRequest()
    } catch (e) {
        handleErr(e)
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP')
        } catch (e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP')
            } catch (e) {
                xhr = null
            }
        }
    }
    return xhr
}

function handleErr(e) {
    // do sth
}
```

惰性函数修改版：

```js
function createXHR() {
    var xhr
    if(typeof XMLHttpRequest !== 'undefined') {
        xhr = new XMLHttpRequest()
    }
    createXHR = function() {
        return new XMLHttpRequest()
    } else {
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP')
            createXHR = function() {
                return new ActiveXObject('Msxml2.XMLHTTP')
            }
        } catch(e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP')
                createXHR = function() {
                    return new ActiveXObject('Microsoft.XMLHTTP')
                }
            } catch(e) {
                createXHR = function() {
                    return null
                }
            }
        }
    }
    return xhr
}
```

通过上面修改之后，当我们在第一次调用这个函数的时候就会去判断当前的环境，进而将函数优化简写，不需要再进行后续的判断

比如，上述代码中的 `XMLHTTPRequest` 如果是存在的，那么当我们第二次调用这个函数的时候已经是这样了

```js
function createXHR() {
    return new XMLHttpRequest()
}
```

### 级联函数

其实就是链式调用，所以原理也就很简单：在每个方法中将对象本身 `return` 出去

假设我们有一个 `Person` 模板

```js
function Person() {}
// 添加几个方法
Person.prototype = {
    setName: function (name) {
        this.name = name
        return this //
    },
    setAge: function (age) {
        this.age = age
        return this
    },
    setSex: function (sex) {
        this.sex = sex
    },
}
// 别忘了重新指定一下构造函数
Person.constructor = Person
let person = new Person()
// 这样看起来做了很多重复的事情，稍微修改一下，在每个方法中将 this return 出来就可以达到 链式调用的效果
person.setName('游荡de蝌蚪')
person.setAge(18)
person.setSex('male')
// 修改之后
person.setName('游荡de蝌蚪').setAge(18).setSex('male')
console.log(person)
```

### 柯里化

> 收集参数，延后执行

```js
function add(a, b) {
    return a + b
}

// 简单的通用封装
function curry(fn) {
    let args = Array.prototype.slice.call(arguments, 1)
    return function() {
        let _args = Array.prototype.slice.call(arguments)
        let final = args.concat(_args)
        return fn.apply(null, final)
    }
}

// 对函数 add 柯里化
let adder = curry(add)
adder(1, 2)
// 或者
let adder = curry(add, 1)(2)
let adder = curry(add)(1, 2)
```
通过 `curry` 函数的这种模式，我们就能实现 `bind`
```js
Function.prototype.mybind = function(fn) {
    let args = Array.prototype.slice.call(arguments, 1)
    let _this = this
    return function() {
        return _this.apply(fn, args)
    }
}
```
