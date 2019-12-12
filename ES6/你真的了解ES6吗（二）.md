### 前言

本文是 `ES6` 系列的第二篇，可以在 [这里](https://github.com/ltadpoles/web-document) 查看 往期所有内容

本文的 `答案` 不一定是最优解释，如果你有更好的想法或更优雅的写法，欢迎留言讨论

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### 正文

##### const 与 Object.freeze 有什么区别

<details>

<summary>答案</summary>

> `const` 声明一个常量，一旦声明，常量的值就不能改变

```js
const num = 2
num = 3 //TypeError: Assignment to constant variable.

const obj = {name: '游荡de蝌蚪', age: 18}
obj = {} // TypeError: Assignment to constant variable.
```

但是，如果使用 `const` 声明的是一个复杂数据类型，比如一个对象，修改其属性值是可以成功的

```js
const obj = {name: '游荡de蝌蚪', age: 18}
obj.age = 19

obj // {name: '游荡de蝌蚪', age: 19}
```

> `const` 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动

> `Object.freeze` 适用于值，更具体地说，适用于对象值，它使对象不可变，即不能更改其属性

```js
const obj = {
  name: '游荡de蝌蚪',
  age: 18
}
Object.freeze(obj)
obj.age = 19
delete obj.name

obj // { name: '游荡de蝌蚪', age: 18 }
```
如果在严格模式下，试图修改或者删除使用 `Object.freeze` 冻结的对象时， 会直接报错

需要注意的是，使用 `Object.freeze` 冻结的对象只能保证这个对象的属性不变，如果对象属性的值还是一个复杂数据类型，那么是可以修改成功的

```js
const person = {
    name: '游荡de蝌蚪',
    hobby: ['game', 'coding']
}
Object.freeze(person)

person.hobby[1] = 'eat'

person // { name: '游荡de蝌蚪', hobby: [ 'game', 'eat' ] }
```

</details>

##### 如何实现数组扁平化(至少三种)

<details>

<summary>答案</summary>

所谓数组扁平化，其实就是多维数组的降维方式。通过 `ES5` 和 `ES6` 新增的方式可以很简单的实现，当然我们也可以借助现有的库去完成

```js
// 1. 递归
function flatten(arr) {
    let result = []
    for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result
}

// 2. 借助 reduce
function flatten(arr) {
    return arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) ? flatten(cur) : cur)
    }, [])
}

// 3. 借助 apply/call
function flatten(arr) {
    while(arr.some(res => Array.isArray(res))) {
        arr = Function.apply.call([].concat, [], arr)
    }
    return arr
}

// 4. ES6 拓展运算符
function flatten(arr) {
    while(arr.some(res => Array.isArray(res))) {
        arr = [].concat(...arr)
    }
    return arr
}

// 5. ES6 flat 方法
[1, 2, [3, , [4, 5]]].flat(Infinity)
```

</details>

##### for...in 与 for...of 有什么区别

<details>

<summary>答案</summary>

先说结论：

- `for...in` 语句以任意顺序迭代对象的可枚举属性； `for...of` 语句遍历可迭代对象定义要迭代的数据
- `for...in` 循环出的是 `key` ， `for...of` 循环出的是 `value`
- `for ... in` 循环不仅可以遍历数字键名,还会遍历原型上的值和手动添加的其他键
- `for...of` 可用于遍历所有部署了 `Symbol.iterator` 属性的数据(`Map` `Set` `NodeList` 等等)，`for...of` 循环内部调用的是数据结构的 `Symbol.iterator` 方法
- 推荐在循环对象属性的时候，使用 `for...in` ,在遍历数组的时候的时候使用 `for...of` 
- `for...of` 不能循环普通的对象，可以通过和 `Object.keys()` 搭配使用

如果想使用 `for...of` 循环普通对象，可以对其添加 `iterator` 属性

```js
let obj = {
    name: '游荡de蝌蚪',
    age: 18
}

obj[Symbol.iterator] = function*(){
    var keys = Object.keys(obj);
    for(var k of keys){
        yield obj[k]
    }
};

for(let i of obj) {
    console.log(i)
}
```

推荐阅读：[看，for..in和for..of在那里吵架](https://www.zhangxinxu.com/wordpress/2018/08/for-in-es6-for-of/)
</details>

##### 下面的代码是否属于尾调用，尾调用有什么优点

```js
function f(x){
    g(x)
}
```

<details>

<summary>答案</summary>

> 尾调用：指某个函数的**最后一步**是调用另一个函数

不属于尾调用

上面的代码等同于下面这样

```js
function f(x){
    g(x);
    return undefined;
}
```

> 如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存

推荐阅读： [尾调用优化](https://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96)

</details>

##### 如何来检测数组中是否包含某个元素

<details>

<summary>答案</summary>

判断数组中是否包含某个元素的时候，我们有很多种方法去完成这个需求

但是，几种方法检测的结果是有差异性的，我们在使用的时候还是需要灵活运用

```js
// 比如检测 arr 中是否存在 num
let arr = [1, 2, 3, 4, 5]
let num = 2

arr.indexOf(num) // 1
arr.find(item => item === num) // 2
arr.findIndex(item => item === num) // 1
arr.some(item => item === num) // true
arr.includes(num) // true

// 如果 num 的值是 undefined
let arr = [1, 2, 3, 4, 5]
let num

arr.indexOf(num) // -1
arr.find(item => item === num) // undefined
arr.findIndex(item => item === num) // -1
arr.some(item => item === num) // false
arr.includes(num) // false

// 如果 num 的值是 undefined，并且数组中存在 undefined
let arr = [1, 2, 3, 4, undefined, 5]
let num

arr.indexOf(num) // 4
arr.find(item => item === num) // undefined
arr.findIndex(item => item === num) // 4
arr.some(item => item === num) // true
arr.includes(num) // true

// 如果 num 的值是 undefined，并且数组中存在空位
let arr = [1, 2, 3, 4, , 5]
let num

arr.indexOf(num) // -1
arr.find(item => item === num) // undefined
arr.findIndex(item => item === num) // 4
arr.some(item => item === num) // false
arr.includes(num) // true

// ES6 的方法在判断之前会将空位转为 undefined 再进行比较
```


</details>

##### 有一本书的属性为：`{name: ES6基础, price：56 }`；要求使用 `Proxy` 对象对其进行拦截处理，`name` 属性对外为 `ES6入门到放弃` ,`price` 属性为只读

<details>

<summary>答案</summary>

```js
let book = { name: 'ES6基础', price: 56 }

let proxy = new Proxy(book, {
    get: function(target, prop) {
        if (prop === 'name') {
            return 'ES6从入门到放弃'
        } else {
            return target[prop]
        }
    },
    set: function(target, prop, val) {
        if (prop === 'price') {
            target[prop] = 56
        }
    }
})
```

</details>

##### 如何去除下列数组的重复项
```js
let arr = [1, 5, 8, 'ac', 1, 'ab', NaN, 5, 'ac', NaN]
```
<details>

<summary>答案</summary>

> `ES5` 比较两个值是否相等，只有两个运算符：相等运算符 `==` 和严格相等运算符 `===`。它们都有缺点，前者会自动转换数据类型，后者的 `NaN` 不等于自身，以及 `+0` 等于 `-0`

所以，我们可以借助 `Object.is` 来完成需求.只要是通过 `Object.is` 来判断的方法都是可以的

```js
let arr = [1, 5, 8, 'ac', 1, 'ab', NaN, 5, 'ac', NaN]

// 传统方式
let newArr = []
for(let item of arr) {
    if(!newArr.includes(item)) {
        newArr.push(item)
    }
}

// 最简单的方式
arr = [...new Set(arr)]

```

</details>

##### 如何将下列 `Map` 结构转化为对象
```js
let map = new Map([
    ['a', 'one'],
    ['b', 'two'],
    ['c', 'three'],
]);

// 期望
{a: 'one', b: 'two', c: 'three'}
```
<details>

<summary>答案</summary>

一行代码搞定

```js
let map = new Map([
    ['a', 'one'],
    ['b', 'two'],
    ['c', 'three'],
]);

let obj = Object.fromEntries(map)
```

推荐 [对象的新增方法](https://es6.ruanyifeng.com/#docs/object-methods#Object-fromEntries)
</details>

### 后记

以上就是本期 `ES6` 相关的所有内容，都是一些基础问题以及常见的概念性东西，做一个笔记也希望可以对看到的的小伙伴有些许帮助

感兴趣的小伙伴可以 [点击这里](https://github.com/ltadpoles/web-document) ，也可以扫描下方二维码关注我的微信公众号，查看更多前端小片段，欢迎 `star` 关注


![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/Other/images/weChat.jpg)