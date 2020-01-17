### 前言

本文是 `ES6` 系列的第三篇，可以在 [这里](https://github.com/ltadpoles/web-document) 查看 往期所有内容

本文的 `答案` 不一定是最优解释，如果你有更好的想法或更优雅的写法，欢迎留言讨论

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下

### 正文

**下面的代码输出什么**
```js
let promise = new Promise((resolve, reject) => {
    console.log(1)
    setTimeout(() => {
        resolve(2)
        console.log(3)
    }, 2000);
    reject('error')
})

promise
.then(res => {
    console.log(5)
})
.catch(err => {
    console.log(err)
})
```

<details>

<summary>答案</summary>
1   error   3

要点解析：
- `promise` 创建之后会立即执行
- 状态一旦改变就不会再变，也就是 `reject` 与 `resolve` 只会执行其中的一个
- 异步队列的执行顺序

推荐阅读 [Js 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

</details>

---

**下面代码输出什么**
```js
const first = () => (new Promise((resolve,reject)=>{
    console.log(1);
    let p = new Promise((resolve, reject)=>{
         console.log(2);
        setTimeout(()=>{
           console.log(3);
           resolve(4); 
        },0)
        resolve(5);
    }); 
    resolve(6);
    p.then((arg)=>{
        console.log(arg);
    });

}));

first().then((arg)=>{
    console.log(arg);
});
console.log(7);
```

<details>

<summary>答案</summary>

1   2   7   5   6   3

同样是 `promise` 结合 `js` 执行机制的问题
- `promise` 创建立即执行，依次输出 `1 2`
- 执行同步任务，输出 `7`
- 在执行上一步的时候已经将 `p.then` 以及 `first.then` 加入微任务执行队列，所以依次输出 `5  6`
- 最后执行宏任务 `setTimeout`， 输出 `3`

</details>

---

**下面的代码输出什么**
```js
Promise.resolve(1)
.then(2)
.then(Promise.resolve(3))
.then(console.log)
```

<details>

<summary>答案</summary>
1

- 如果参数是一个原始值，或者是一个不具有 `then` 方法的对象，则 `Promise.resolve` 方法返回一个新的 `Promise` 对象，状态为 `resolved`
- `then` 方法接受的参数是函数，而如果传递的并非是一个函数,就会导致前一个 `Promise` 的结果穿透到下面

</details>

---

**为什么建议在 promise 最后调用 catch 方法**

<details>

<summary>答案</summary>

首先，来看一个例子

```js
Promise.resolve().then(res => {
    throw new Error('error')
}, err => {
    console.log(err)
}).then(res => {
    console.log(1)
})
```

上面的代码中，我们在 `then` 函数中抛出一个错误，想使用 `then` 中的第二个参数来捕获这个错误。很显然，错误在 `Promise` 函数体外抛出，冒泡到了最外层，成了未捕获的错误，因为这里捕获的总是 `之前的 Promise 产生的错误`

所以，一般总是建议，`Promise` 对象后面要跟 `catch` 方法，这样可以处理 `Promise` 内部发生的错误

只是我们需要注意的是 `catch` 方法也会返回一个新的 `Promise` 对象，可以继续使用 `Promise` 的方法，同样也意味着 `catch` 方法中也可能产生错误

</details>

---

**实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中**

```js
const timeout = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});

const ajax1 = () => timeout(2000).then(() => {
    console.log('1');
    return 1;
});

const ajax2 = () => timeout(1000).then(() => {
    console.log('2');
    return 2;
});

const ajax3 = () => timeout(2000).then(() => {
    console.log('3');
    return 3;
});

const mergePromise = ajaxArray => {
    // 在这里实现你的代码

};

mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log('done');
    console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
```

<details>

<summary>答案</summary>

这个问题主要考察的就是我们使用 `Promise` 对异步操作的控制

```js
const mergePromise = ajaxArray => {
    // 保存数组在函数执行之后的结果
    let data = []
    
    // 创建一个 Promise 对象控制异步流程
    let p = Promise.resolve()

    // 遍历数组按次序执行数组中的每一项
    // 将数组中每一项的执行结果保存起来到一个新数组
    ajaxArray.forEach(item => {
        p = p.then(item).then(res => {
            data.push(res)
            return data
        })
    })
    
    // 最终得到的结果：返回一个新的 Promise 对象
    // return 的结果作为参数传递到下次调用的 then 方法中
    return p
}
```

</details>

---

**下面的代码输出什么**

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

let b = foo(5);
b.next()
b.next(15)
b.return('tadpole')
b.next(12)
```

<details>

<summary>答案</summary>

```js
// {value: 6, done: false}
// {value: 10, done: false}
// {value: 'tadpole', done: true}
// {value: undefined, done: true}
```

- `next` 的参数是上一次表达式的值
- `return` 方法，可以返回给定的值，并且终结遍历 `Generator` 函数

</details>

---

**下面的代码输出什么**

```js
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
    return 'async return';
}

async function async2() {
    console.log("async2");
}

console.log("script start");

setTimeout(function() {
    console.log("setTimeout");
}, 0);

async1().then(function (message) { console.log(message) });

new Promise(function(resolve) {
    console.log("promise1");
    resolve();
}).then(function() {
    console.log("promise2");
});

console.log("script end")
```

<details>

<summary>答案</summary>

```js
// 执行同步代码，遇到 setTimeout 将其加入到宏任务队列
script start
// 执行 async1()
async1 start
// 遇到await 执行右侧表达式后让出线程，阻塞后面代码
async2
// 执行 Promise 中的同步代码 将 .then 推入到微任务队列
promise1
// 执行同步代码
script end
// 继续执行 await 后面的代码
// 这里需要注意 async 函数返回的是 Promise 对象
// 将 async1后面的 .then 加入到微任务队列
async1 end
// 执行前一轮添加到微任务队列的代码
promise2
// 后一轮微任务队列的代码
async return
// 开始下一轮evenloop，执行宏任务队列中的任务
setTimeout
```

</details>

---

**使用不同的方式实现下面的需求**

```js
// 红灯三秒亮一次，绿灯两秒亮一次，黄灯一秒亮一次；如何让三个灯不断交替重复亮灯
// 使用 Callback/Promise/Genertor/async 分别实现
// 亮灯函数如下

function red(){
    console.log('red');
}

function green(){
    console.log('green');
}

function yellow(){
    console.log('yellow');
}
```

<details>

<summary>答案</summary>

```js
// callback
function loop() {
    setTimeout(() => {
        red()
        setTimeout(() => {
            green()
            setTimeout(() => {
                yellow()
                loop()
            }, 1000)
        }, 2000)
    }, 3000)
}
loop()

// Promise
function fn(timer, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            cb()
            resolve()
        }, timer);
    })
}

let promise = Promise.resolve()

function loop() {
    promise.then(res => {
        return fn(3000, red)
    }).then(res => {
        return fn(2000, green)
    }).then(res => {
        return fn(1000, yellow)
    }).then(res => {
        loop()
    })
}

// Generator
function fn(timer, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            cb()
            resolve()
        }, timer)
    })
}

function* gen() {
    yield fn(3000, red)
    yield fn(2000, green)
    yield fn(1000, yellow)
}

function loop(iterator, gen) {
    // 执行 Generator 函数
    let result = iterator.next()

    if (result.done) {
        // 这里需要重新开始执行
        loop(gen(), gen)
    } else {
        result.value.then(res => {
            loop(iterator, gen)
        })
    }
}

loop(gen(), gen)

// Async
function fn(timer, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            cb()
            resolve()
        }, timer)
    })
}

async function loop() {
    while (true) {
        await fn(3000, red)
        await fn(2000, green)
        await fn(1000, yellow)
    }
}

loop()
```

</details>

### 后记

以上就是本期 `ES6` 相关的所有内容，主要涉及的是 `Promise` `Generator` 以及 `Async` 函数相关的内容，通过几个常见的面试题以及需求考察对 `ES6` 相关知识的了解程度

留一个笔记，也希望对看到的小伙伴能有些许帮助

感兴趣的小伙伴可以 [点击这里](https://github.com/ltadpoles/web-document) ，也可以扫描下方二维码关注我的微信公众号，查看往期更多内容，欢迎 `star` 关注


![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/Other/images/weChat.jpg)

### 参考

[ECMAScript 6 入门](https://es6.ruanyifeng.com/)

[MDN](https://developer.mozilla.org/zh-CN/)

[一道JavaScript面试题, 考察多种回调写法](https://www.jianshu.com/p/288b9f1807dd)
