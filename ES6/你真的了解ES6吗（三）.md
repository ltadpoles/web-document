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

**为什么建议在 promise 最后调用 catch 方法**

<details>

<summary>答案</summary>

首先，来看一下下面的例子

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

