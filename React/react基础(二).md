### 前言

前一篇 [React基础(一)](https://github.com/Roamen/web-document/issues/19) 简单地了解了 `React` 的一些基本知识点，怎么搭建一个简单的 `React` 项目、怎么创建 `React` 元素、组件以及怎么给项目添加样式这些基础功能。下面，在通过一些示例来了解 `React` 中的事件处理、生命周期、条件渲染等功能

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### Round 1

首先，我们看一下怎么给元素绑定事件

> `React` 事件的命名采用小驼峰式

```js

<button onClick={ function() { console.log('事件触发了')} }>点我这里</button>

```


`onClick` 后面可以直接是一个函数或者函数名

在这里我们需要注意的是

> 在 `React` 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault`

```js
<a href="#" onClick={function(e){e.preventDefault();console.log('事件触发了')}}>
  Click me
</a>
```
在我们没有添加 `e.preventDefault()` 之前，很明显看到了页面的刷新，阻止默认行为之后就不会再出现那种情况了

`return false` 也是没有效果的

### Round 2

在之前一篇文章中，我们大概知道了可以通过 `state` 去管理组件内部的数据，那么应该怎么正确地使用它呢、或者说我们怎么通过 `state` 去修改组件内部的数据

首先，不要直接去修改 `state`

```js
this.state.age = 18 // 这是错误的
```
在 `React` 中我们通过 `setState()` 去修改数据，这个和小程序的修改数据方式有点类似

```js
this.setState({age: 18})
```

通过一个点击事件再来感受一下 `setState()`

![image](https://note.youdao.com/favicon.ico)

细心地小伙伴可能发现了 这么一行代码：

```js
this.addAge = this.addAge.bind(this)
```

这一步的作用其实就是给这个方法绑定 `this` ，在 `JavaScript` 中，`class` 的方法默认不会绑定 `this` ，如果我们没有这一步操作，那么 `this` 的值就会是 `undefined`

还有两种方式去解决这个问题：

>  `public class fields` 语法

![image](https://note.youdao.com/favicon.ico)

这里需要注意的一点，如果我们要使用这个语法，那么你的 `babel`  版本必须是 `7.x` 以上，相应的 `babel-loader` 必须是 `8.x` 以上版本，否则会报错 具体配置可以 [参考这里](https://github.com/Roamen/example/tree/master/React/react-two)

> 使用箭头函数

![image](https://note.youdao.com/favicon.ico)

箭头函数默认绑定定义时的 `this`


