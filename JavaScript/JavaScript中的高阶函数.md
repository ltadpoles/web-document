### 前言

在 `JavaScript` 的学习过程中，我们可能或多或少地接触过高阶函数。那么，我们自己对此是否有一个明确的定义，或者说很熟练的掌握这些用法呢

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

> 简单来说，高阶函数是一个函数，它接收函数作为参数或将函数作为输出返回

看到这样的概念，在你的脑海中会出现哪些函数呢

其实，像我们经常会使用到的一些数组方法，比如：`map`、`filter` 等等都是高阶函数的范畴

当然，这些 `JavaScript` 内置的方法不在本文的讨论范围之内，下面会列举一些在我们实际开发或者面试过程中可能会遇到的函数高阶用法

### 防抖

> 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行

实现方式就是如果任务触发的频率比我们设定的时间要小，那么我们就清除掉上一个任务重新计时

```js
function debounce(fn, interval) {
    let timer = null
    return function() {
        // 如果用户在设定的时间内再次触发,就清除掉
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, interval);
    }
}
```

### 节流

> 指定时间间隔内只会执行一次任务

```js
function throttle(fn, interval) {
    let timer,
        firstTime = true // 是否是第一次执行
    return function () {
        let _this = this
        if (firstTime) {
            fn.apply(_this, arguments) // 第一次不需要延迟执行
            return firstTime = false
        }
        if (timer) { // 如果定时器还在 说明前一次还没有执行完
            return false
        }
        timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null
            fn.apply(_this, arguments)
        }, interval || 500);
    }
}

// 不考虑定时器的情况 直接加一个节流阀
function throttle(fn, interval) {
    let canRun = true //节流阀
    return function() {
        if(!canRun) {
            return
        }
        canRun = false
        setTimeout(() => {
            fn.apply(this, arguments)
            canRun = true
        }, interval);
    }
}
```

无论是防抖还是节流，我们都可以使用下面的这种方式去验证一下

```js
window.onresize = throttle(function () {
    console.log(1)
}, 1000)
```

通过上面两种方式的实现，相信小伙伴们也都了解了所谓防抖和节流我们都是借助 `setTimeOut` 来实现，不同的地方就是 **清除定时器的位置**


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
        createXHR = function() {
            return new XMLHttpRequest()
        }
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

使用场景：
- 频繁使用同一判断逻辑
- 只需要判断一次，后续使用环境稳定

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

优点：简化了函数调用的步骤，我们不需要再写一些重复的东西

缺点：占用了函数的返回值

### 柯里化

> 收集参数，延后执行，也可以称之为部分求值

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
一个典型的通用型 `curry` 封装
```js
Function.prototype.mybind = function(fn) {
    let args = Array.prototype.slice(arguments, 1)
    let _this = this
    return function() {
        let _args = Array.prototype.slice(arguments)
        let final = args.concat(_args)
        return _this.apply(fn, final)
    }
}
```
通过 `curry` 函数的这种模式，我们就能实现一个简单的 `bind`
```js
Function.prototype.mybind = function(fn) {
    let _this = this
    return function() {
        return _this.apply(fn, arguments)
    }
}
```
函数柯里化也是我们在面试过程中可能会经常碰到的问题，比如：
```js
// 编写一个 add 函数，实现以下功能
add(1)(2)(3) // 6
add(1)(2, 3)(4) //10
add(1, 2)(3) (4, 5) // 15

function add() {
    let args = Array.prototype.slice.call(arguments)
    let adder =  function() {
        // 利用闭包的特性保存 args 并且收集参数
        args = args.concat(Array.prototype.slice.call(arguments))
        return adder
    }
    // 利用 toString 隐式转换的的特性返回最终计算的值
    adder.toString = function() {
        return args.reduce((a, b) => {
            return a + b
        })
    }
    return adder
}
add(1)(2)(3) // 6
add(1)(2, 3)(4) // 10
add(1, 2)(3)(4, 5) // 15

// 当然，我们也可以借助ES6的方法简化这个函数
function add1(...args) {
    let adder = (..._args) => {
        args = [...args, ..._args]
        return adder
    }
    adder.toString = () => args.reduce((a, b) => a + b)
    return adder
}
```
想要实现上面函数的效果，我觉得有两点是我们必须理解和掌握的：
- 闭包，使用闭包的特性去保存和收集我们需要的参数
- 利用 `toString` 的隐式转换特性，最终拿到我们想要的结果

### 后记

看完以上几个函数高阶用法的实例，你的第一感觉是什么呢

闭包啊！作为一位合格的前端，闭包是我们必须去征服的一个知识点

最后，推荐一波前端学习历程，不定期分享一些前端问题和有意思的东西欢迎 `star` 关注 [传送门](https://github.com/ltadpoles/web-document)

