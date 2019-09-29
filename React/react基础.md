### 前言

作为前端现行主流 `JS` 库之一，`React` 受到越来越多的开发者以及项目团队的青睐。我们可以使用它很高效地开发出一系列前端项目，或者使用 `React-native` 开发原生应用

上一篇 [RN环境搭建](https://github.com/ltadpoles/web-document/blob/master/React/RN%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA.md)，简单地介绍了一下 `React-Native` 开发所需要的环境配置。然而想要使用 `React-native` 进行原生开发，我们就必须先了解 `React` 的使用。从这一篇开始，我将记录下来 `React` 学习的点滴，分享给有需要的小伙伴，也留作笔记

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### 初识

接触一种新的技术，在我的学习认知中，首先有这么三个东西需要先去了解：
- 它是什么
- 我们可以使用它做什么
- 它有什么样的特点

`React` 是一个用于构建用户界面的 `JavaScript` 库。主要用于构建 `UI` ，很多人认为 `Reatc `是 `MVC` 中的 `V（视图）`

我们可以使用 `React` 高效地开发出一个前端项目，还可以使用 `Node` 进行服务器渲染，或使用 `React-native` 开发原生移动应用

`React` 具有以下特点：

- 声明式设计
- 组件化：组件化设计，更易复用
- 高效：`React` 通过对 `Dom` 的模拟，最大限度的减少与 `Dom` 的交互
- 灵活：可以与已知的框架或库很好的配合
- JSX：是 `js` 语法的扩展，不一定使用，但建议用
- 单向响应的数据流：`React` 实现了单向响应的数据流，从而减少了重复代码，这也是解释了它为什么比传统数据绑定更简单

初步了解了 `React` 之后，其实我们现在不必对它的每一个特点去深究，通过一些具体的实例和项目，相信你就会慢慢地了解并掌握它

下面，就让我们一起通过一些具体的实例，去了解 `React` 中的一些概念吧

### 准备工作

首先，我们需要创建一个简单的项目结构，大概是长这个样子的

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-01.png)

- `main.js`: 书写我们的 `JS` 逻辑
- `.babelrc`: 对 `React` 语法以及 `JSX` 进行转义
- `webpack.config.js`: 书写 `webpack` 逻辑

我们还需要下载一些项目所必须的依赖：

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-02.png)

- `react`：`React` 中的核心库
- `react-dom`: 提供与 `DOM` 相关的功能
- `babel`相关：对 `react` 以及 `JSX` 语法进行转义
- `webpack`以及 `webpack-cli`：`webpack` 配置相关

对于依赖相关，需要注意的是 `babel-loader` 最新为 `8.x` 版本，与 `babel-preset-react` 以及 `babel-preset-env` 版本有冲突，这里需要使用 `7.x `的版本

`.babelrc` 配置:

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-03.png)

至于 `webpack` 的简单配置，想要了解的小伙伴可以看一下这里 [webpack基本配置](https://github.com/ltadpoles/web-document/issues/18)，也可以查看 [完整demo](https://github.com/ltadpoles/react/tree/master/hello-react)

在这里我们需要添加的地方就是

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-04.png)

### Round 1 

首先，我们不使用 `JSX` 的方式来创建一个简单的 `react` 页面

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-05.png)

`React` 中提供了 `React.createElement()` 方法来创建一个 `react` 元素，然后通过 `react-dom` 提供的 `render` 方法将元素渲染到页面

运行项目，应该可以看到成功的效果了

### Round 2 JSX

想象一下，如果我们直接使用前面原生的方式去生成 `react` 元素，对于简单的嵌套元素来说，前一种方式完全可以满足我们的需求。但是，当我们的项目元素嵌套比较复杂的时候，虽然也可以通过前一种方式去实现，可以这样很不直观，对于我们之后的开发或者维护无疑增加了难度

所以，我们知道了 `JSX`

`JSX`，是一个 `JavaScript` 的语法扩展。我们建议在 `React` 中配合使用 `JSX`，`JSX` 可以很好地描述 `UI` 应该呈现出它应有交互的本质形式

`React` 不强制要求使用 `JSX`，使用 `JSX` 会在视觉上有辅助作用。它还可以使 `React` 显示更多有用的错误和警告消息

实际上，`JSX` 仅仅只是 `React.createElement()` 函数的语法糖,也就是说，我们所写的 JSX 最终也会被 React 转义为 `React.createElement()` 的方式

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-06.png)

### Round 3 普通组件

我们也可以通过普通函数去创建 `react` 元素

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-07.png)

### Round 4 props
 
使用普通函数创建 `JSX` 元素，那么，如果我们需要进行组件传递数据应该怎么操作呢

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-08.png)

### Round 5 有状态组件

我们也可以使用 `class` 去创建一个有状态的组件,在 `class` 中的 `render` 函数中直接使用 `this.props` 的方式获取组件传递的数据

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-09.png)

### Round 6 state

之所以说普通函数创建的组件是无状态组件，而通过 `class` 创建的组件是有状态组件，就是因为在 `class` 中 `state` 的存在

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-10.png)


### Round 7 设置样式

看着我们所完成的 `React` 项目，是不是还缺少点什么呢

对的，你没有看错，它至今是没有样式的

下面，我们尝试着给它添加一些样式：

在 `React` 中，我们可以使用 `style` 行内样式和 `class` 的方式来完成

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/c-11.jpg)

这里需要注意的就是 `class` 引入的关键字是 `className`

最后，别忘了下载引入 `style-loader` 和 `css-loader`

### Round 8 事件处理

首先，我们看一下怎么给元素绑定事件

> `React` 事件的命名采用小驼峰式

```html
<button onClick={ function() { console.log('事件触发了')} }>点我这里</button>
```


`onClick` 后面可以直接是一个函数或者函数名

在这里我们需要注意的是

> 在 `React` 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault`

```html
<a href="#" onClick={function(e){e.preventDefault();console.log('事件触发了')}}>
  Click me
</a>
```
在我们没有添加 `e.preventDefault()` 之前，很明显看到了页面的刷新，阻止默认行为之后就不会再出现那种情况了

`return false` 也是没有效果的

### Round 9 setState

在之前一篇文章中，我们大概知道了可以通过 `state` 去管理组件内部的数据，那么应该怎么正确地使用它呢、或者说我们怎么通过 `state` 去修改组件内部的数据

- 首先，不要直接去修改 `state`

```js
this.state.age = 18 // 这是错误的
```
在 `React` 中我们通过 `setState()` 去修改数据，这个和小程序的修改数据方式有点类似

```js
this.setState({age: 18})
```

通过一个点击事件再来感受一下 `setState()`

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/two-01.jpg)

细心地小伙伴可能发现了 这么一行代码：

```js
this.addAge = this.addAge.bind(this)
```

这一步的作用其实就是给这个方法绑定 `this` ，在 `JavaScript` 中，`class` 的方法默认不会绑定 `this` ，如果我们没有这一步操作，那么 `this` 的值就会是 `undefined`

还有两种方式去解决这个问题：

>  `public class fields` 语法

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/two-02.jpg)

这里需要注意的一点，如果我们要使用这个语法，那么你的 `babel`  版本必须是 `7.x` 以上，相应的 `babel-loader` 必须是 `8.x` 以上版本，否则会报错 具体配置可以 [参考这里](https://github.com/ltadpoles/example/tree/master/React/react-two)

> 使用箭头函数

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/two-03.jpg)

箭头函数默认绑定定义时的 `this`

### Round 10 条件渲染

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

```html
<input placeholder={isLogin ? '注册用户名': '登陆用户名'}></input>
```

具体 `Demo` 可以 [参考这里](https://github.com/ltadpoles/example/tree/master/React/react-two) `main-3.js`

### Round 11 循环处理

在实际的开发中，我们不可避免地会碰到列表这类数据的渲染。该怎么去处理这类数据，我相信你们脑海中浮现的第一种方式肯定就是循环

在 `React` 中处理数组转化为元素列表的方式基本就是这样

我们做一个 `li` 元素的遍历效果

```
const numbers = [1, 2, 3, 4, 5]

function NumberList(props) {
    let numbers = props.numbers
    let numberLists = numbers.map(res => <li>{ res }</li>)
    return ( <ul>{ numberLists }</ul> )
}
ReactDom.render(<NumberList numbers={ numbers } />, document.getElementById('app'))
```

使用 `map` 方法遍历数组，生成 `li` 元素，插入到 `ul` 元素中，最后在页面渲染.可以看到元素已经成功渲染到了页面

完全按照上面的方式创建 `ul li` 元素，毫无悬念我们会收获一个警告，大概长这样

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/two-04.jpg)

很明显，我们缺少一个 `key` 元素

> `key` 帮助 `React` 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识

简单修改一下应该是这样的

```js
let numberLists = numbers.map(res => <li key={res.toString()}>{ res }</li>)
```

`key` 元素的存在提高了组件变化、比对的效率，合理使用 `key` 需要注意以下几点：

- 一个元素的 `key` 最好是这个元素在列表中拥有的一个独一无二的字符串,比如 `id`
- 元素的 `key` 只有放在就近的数组上下文中才有意义(简单来说，哪里循环在哪里定义 `key` )
- `key` 只是在兄弟节点之间必须唯一,它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 `key` 值

### Round 12 受控组件

在 `React` 中，可变的状态一般都保存在 `state` 中，如果我们想要去改变这个状态，就要通过 `setState` 的方式进行更新。但是，用户可输入的表单元素会维持自身状态，根据用户输入进行更新，这样 就引出了 **受控组件** 的概念

受控组件的特点：
- 表单元素
- 由 `React` 渲染出来
- 由 `React` 控制值的改变，也就是说想要改变元素的值，只能通过 `React` 提供的方法来修改

```html
<!-- 只读: 只能读取的input框 只展示 -->
<input value={this.state.data} readOnly></input>

<!--change事件-->
<input value={this.state.data} onChange={this.inputChange}></input>

<!-- defaultValue 非受控组件 -->
<input defaultValue={this.state.data}></input>
```

`React`提供了三种方式来处理表单元素
- 可以添加 `readOnly` 设置为只读
- 添加 `change` 事件，通过 `setState` 处理表单状态
- 设置 `value` 为 `defaultValue` 只执行第一次渲染

### 后记

以上就是 `React` 运行的基本配置以及它当中的一些基础概念，有兴趣的小伙伴可以 [点击这里](https://github.com/ltadpoles/example/tree/master/React/hello-react)查看完整实例 `DEMO`

关于 `React` 的内容还有很多很多，感兴趣的小伙伴可以关注一波。当然，如果你想了解更多前端问题，也可以[点击这里](https://github.com/ltadpoles/web-document)，欢迎 `star` 关注
