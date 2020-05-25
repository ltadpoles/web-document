### 前言

文章开始之前，让我们先思考一下这几个问题：

- 为什么会有浅拷贝与深拷贝
- 什么是浅拷贝与深拷贝
- 如何实现浅拷贝与深拷贝

好了，问题出来了，那么下面就让我们带着这几个问题去探究一下吧！

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### 数据类型

在开始了解 `浅拷贝` 与 `深拷贝` 之前，让我们先来回顾一下 `JavaScript` 的数据类型（可以参考这里 [JavaScript中的数据类型](https://segmentfault.com/a/1190000018764693)）

在 `JavaScript` 中，我们将数据分为 `基本数据类型(原始值)` 与 `引用类型` 

- 基本数据类型的值是按值访问的，基本类型的值是不可变的
- 引用类型的值是按引用访问的，引用类型的值是动态可变的

由于数据类型的访问方式不同，它们的比较方式也是不一样的

```js
var a = 100;
var b = 100;

a === b // true

var c = {a: 1, b: 2};
var d = {a: 1, b: 2};

c == d // false 两个不同的对象
```
- 基本数据类型的比较是值得比较
- 引用类型的比较是引用地址的比较

鉴于以上数据类型的特点，我们可以初步想到：**所谓 `浅拷贝` 与 `深拷贝` 可能就是对于值的拷贝和引用的拷贝**（简单数据类型都是对值的拷贝，不进行区分）

一般来说，我们所涉及的拷贝对象，也都是针对引用类型的。由于引用类型属性层级可能也会有多层，这样也就引出了我们所要去了解的 `浅拷贝` 与 `深拷贝`

### 浅拷贝

顾名思义，所谓浅拷贝就是对对象进行浅层次的复制，只复制一层对象的属性，并不包括对象里面的引用类型数据

想象一下，如果让你自己去实现这个功能，又会有怎么的思路呢

首先，我们需要知道被拷贝对象有哪些属性吧，然后还需要知道这些属性都对应了那些值或者地址的引用吧。那么，答案已经呼之欲出了，是的，循环

```js
var person = {
    name: 'tt',
    age: 18,
    friends: ['oo', 'cc', 'yy']
}

function shallowCopy(source) {
    if (!source || typeof source !== 'object') {
        throw new Error('error');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            targetObj[keys] = source[keys];
        }
    }
    return targetObj;
}

var p1 = shallowCopy(person);

console.log(p1)
```

在上面的代码中，我们创建了一个 `shallowCopy` 函数，它接收一个参数也就是被拷贝的对象。

- 首先创建了一个对象
- 然后 `for...in` 循环传进去的对象，为了避免循环到原型上面会被遍历到的属性，使用 `hasOwnProperty` 限制循环只在对象自身，将被拷贝对象的每一个属性和值添加到创建的对象当中
- 最后返回这个对象

通过测试，我们拿到了和 `person` 对象几乎一致的对象 `p1`。看到这里，你是不是会想那这个结果和 `var p1 = person` 这样的赋值操作又有什么区别呢？

我们再来测试一波

```js
var p2 = person;

// 这个时候我们修改person对象的数据
person.name = 'tadpole';
person.age = 19; 
person.friends.push('tt')

p2.name // tadpole
p2.age // 19
p2.friends // ["oo", "cc", "yy", "tt"]

p1.name // tt
p1.age // 18
p1.friends // ["oo", "cc", "yy", "tt"]
```

上面我们创建了一个新的变量 `p2` ，将 `person` 赋值给 `p2` ，然后比较两个变量

-- | 和原数据是否指向同一对象 | 第一层数据为基本数据类型 | 原数据中包含子对象
---|--- |--- | ---
赋值 | 是 | 改变会使原数据一同改变 | 改变会使原数据一同改变 
浅拷贝 | 否 | 改变不会使原数据一同改变 | 改变会使原数据一同改变

### 深拷贝

了解完浅拷贝，相信小伙伴们对于深拷贝也应该了然于胸了

浅拷贝由于只是复制一层对象的属性，当遇到有子对象的情况时，子对象就会互相影响。所以，**深拷贝是对对象以及对象的所有子对象进行拷贝**

实现方式就是递归调用浅拷贝

```js
function deepCopy(source){
   if(!source || typeof source !== 'object'){
     throw new Error('error');
   }
   var targetObj = source.constructor === Array ? [] : {};
   for(var keys in source){
      if(source.hasOwnProperty(keys)){
         if(source[keys] && typeof source[keys] === 'object'){
           targetObj[keys] = source[keys].constructor === Array ? [] : {};
           targetObj[keys] = deepCopy(source[keys]);
         }else{
           targetObj[keys] = source[keys];
         }
      } 
   }
   return targetObj;
}
var obj1 = {
    arr: [1, 2, 3],
    key: {
        id: 22
    },
    func: function() {
        console.log(123)
    }
}

var obj2 = deepCopy(obj1);

obj1.arr.push(4);

obj1.arr // [1, 2, 3, 4]
obj2.arr // [1, 2, 3]
obj1.key === obj2.key // false
obj1.func === obj2.func // true
```

对于深拷贝的对象，改变源对象不会对得到的对象有影响。只是在拷贝的过程中源对象的方法丢失了，这是因为在序列化 `JavaScript` 对象时，所有函数和原型成员会被有意忽略

还有一种实现深拷贝的方式是利用 `JSON` 对象中的 `parse` 和 `stringify`，`JOSN` 对象中的 `stringify` 可以把一个 `js` 对象序列化为一个 `JSON` 字符串，`parse` 可以把 `JSON` 字符串反序列化为一个 `js` 对象，通过这两个方法，也可以实现对象的深复制

```js
// 利用JSON序列化实现一个深拷贝
function deepCopy(source){
  return JSON.parse(JSON.stringify(source));
}
var o1 = {
  arr: [1, 2, 3],
  obj: {
    key: 'value'
  },
  func: function(){
    return 1;
  }
};
var o2 = deepCopy(o1);
console.log(o2); // => {arr: [1,2,3], obj: {key: 'value'}}
```

### 实现拷贝的其他方式

#### 浅拷贝

- `Array.prototype.slice()`
- `Array.prototype.concat()`
- `Object.assign`
- 拓展操作符`...`
- ...

#### 深拷贝

很多框架或者库都提供了深拷贝的方式，比如 `jQuery` 、 `lodash` 函数库等等，基本实现方式也就和我们前面介绍的大同小异

### 后记

根据需求的不同，比如有时候我们需要一个全新的对象，在修改它的时候不去影响到源对象，那么这个时候我们就可能需要深拷贝；反之，浅拷贝就能实现我们的需求

只是，我们需要注意到一点，那就是因为实现深拷贝使用递归的方式，就增加了性能的消耗

相信在不断使用的过程中，你一定会对它越来越熟悉

最后，推荐一波前端学习历程，不定期分享一些前端问题和有意思的东西欢迎 `star` 关注 [传送门](https://github.com/ltadpoles/web-document)
