### 前言

前一篇 [React基础(一)](https://github.com/Roamen/web-document/issues/19) 简单地了解了 `React` 的一些基本知识点，怎么搭建一个简单的 `React` 项目、怎么创建 `React` 元素、组件以及怎么给项目添加样式这些基础功能。下面，在通过一些示例来了解 `React` 中的事件处理、生命周期、条件渲染等功能

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### Round 1 事件处理

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

### Round 2 setState

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

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/two-01.jpg)

细心地小伙伴可能发现了 这么一行代码：

```js
this.addAge = this.addAge.bind(this)
```

这一步的作用其实就是给这个方法绑定 `this` ，在 `JavaScript` 中，`class` 的方法默认不会绑定 `this` ，如果我们没有这一步操作，那么 `this` 的值就会是 `undefined`

还有两种方式去解决这个问题：

>  `public class fields` 语法

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/two-02.jpg)

这里需要注意的一点，如果我们要使用这个语法，那么你的 `babel`  版本必须是 `7.x` 以上，相应的 `babel-loader` 必须是 `8.x` 以上版本，否则会报错 具体配置可以 [参考这里](https://github.com/Roamen/example/tree/master/React/react-two)

> 使用箭头函数

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/two-03.jpg)

箭头函数默认绑定定义时的 `this`

### Round 3 条件渲染

很多时候，用户可能会有多种操作需求，这个时候就需要我们对不同的操作选择不同的执行逻辑

> 在 `React` 中，你可以创建不同的组件来封装各种你需要的行为

> `React` 中的条件渲染和 `JavaScript` 中的一样，使用 `JavaScript` 运算符 `if` 或者条件运算符去创建元素来表现当前的状态，然后让 `React` 根据它们来更新 `UI`

比如，我们创建一个十分简单的登陆注册切换

首先，创建两个组件来展示登陆或者注册

```js
function Login(props) {
    return (
        <button onClick={props.onClick}>去登陆</button>
    )
}

function Registered(props) {
    return (
        <button onClick={props.onClick}>去注册</button>
    )
}
```

接着，创建一个有状态的组件 `LoginControl`，在 `state` 中维护一个中间变量控制渲染哪一个组件，创建两个方法去改变这个中间变量的值

```js
this.state = {isLogin: false}

handelLogin() {
    this.setState({isLogin: true})
}

handelReginstered() {
    this.setState({isLogin: false})
}
```

最终，在 `render` 函数中，我们通过 `if` 判断中间变量 `isLogin` 的值去决定渲染哪个组件

```js
const isLogin = this.state.isLogin
let button 

if(isLogin) {
    button = <Login onClick={this.handelReginstered}></Login>
} else {
    button = <Registered onClick={this.handelLogin}></Registered>
}
```

这样通过将中间变量的值传递给组件的方式就实现了按照不同条件渲染不同组件的需求

当然，我们也可以使用更为简单的一种方式，比如 三目运算符。通过中间变量的值，来选择需要显示的 `placeholder`

```js
<input placeholder={isLogin ? '注册用户名': '登陆用户名'}></input>
```

具体 `Demo` 可以 参考这里 `main-3.js`