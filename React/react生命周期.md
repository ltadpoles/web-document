### 前言

前面两篇文章简单地介绍了 `React` 中的 `JSX` 语法、状态组件、绑定事件、设置 `state` 等基本操作，这篇文章将继续通过一些实例介绍 `React` 中的基础知识点生命周期

本文基于 `React 16.9.0` 版本 

`弃`表示会在后期版本中移除的生命周期

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### 概念

什么是生命周期

> 简单来说：一个组件从创建到最后消亡所经历的各种状态，就是一个组件的生命周期

> 从组件被创建，到组件挂载到页面上运行，再到页面关闭组件被卸载，这三个阶段总是伴随着组件各种各样的事件，那么这些事件，统称为组件的生命周期函数


在 `React` 中，我们可以将其生命周期分为三个阶段：
- 挂载阶段
- 更新阶段
- 卸载阶段

不同的阶段将对应不同的钩子函数来处理组件的状态

### 挂载阶段

首先是挂载阶段，当组件实例被创建并插入 `DOM` 中时,将依次调用以下生命周期函数

- `constructor`
- `static getSerivedStateFromProps`
- `render`
- `componentDidMount`

#### constructor(props)

> 在 `React` 组件挂载之前，会调用它的构造函数，在这个函数中我们可以拿到组件传递的 `props`

通常，在 `React` 中，构造函数仅用于以下两种情况：

> 通过给 this.state 赋值对象来初始化内部 state

> 为事件处理函数绑定实例

需要注意的地方：

- 在 `constructor()` 函数中不要调用 `setState()` 方法
- 避免将 `props` 的值复制给 `state`

#### static getDerivedStateFromProps(props, state)

> `getDerivedStateFromProps` 会在调用 `render` 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 `state`，如果返回 `null` 则不更新任何内容

在这个函数中，我们可以拿到组件传递的 `props` 和 `state`，它存在最重要的目的就是：**让组件在 `props` 变化时更新 `state`**

比如说，这样：

```js
static getDerivedStateFromProps(props, state) {
    console.warn('组件生命周期：getDerivedStateFromProps')
    if (props.age !== state.age) {
        return {
            age: props.age
        }
    }
    return null
}
```

使用该生命周期函数需要注意的地方：

- 该函数会在 `render` 方法之前调用，会调用**多次**
- 必须有返回值，返回一个对象来更新 `state` 或者返回 `null` 不更新 `state`

#### render()

> `render()` 方法是 `class` 组件中唯一必须实现的方法

使用该函数需要注意的地方：

- 必须有返回值，可以有多种类型，详细可以 [参考这里](https://zh-hans.reactjs.org/docs/react-component.html#render)，如果不需要返回任何结构，可以直接返回 `null`
- `render()` 函数应该为纯函数
- 不能在函数中调用 `this.setState()` 方法
- 该函数会调用多次

#### componentDidMount()

> `componentDidMount()` 会在组件挂载后（插入 `DOM` 树中）立即调用。依赖于 `DOM` 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方

在该函数中常有的操作：

- 操作 `DOM` 
- 进行 `ajax` 操作来完成数据的交互
- 使用 `setState()` 来修改 `state`

#### UNSAFE_componentWillMount() `弃`

> 此生命周期之前名为 `componentWillMount`。该名称将继续使用至 `React 17`

此生命周期函数现在已经不被官方推荐使用，将会在后期版本中移除，它具有以下特点：

- `UNSAFE_componentWillMount()` 在挂载之前被调用。
- 它在 `render()` 之前调用,在此方法中同步调用 `setState()` 不会触发额外渲染
- 与现有的新生命周期不能同时使用，只会调用一次

让我们通过一个实例来整体感受一下挂载阶段 [Dome地址](https://github.com/ltadpoles/example/tree/master/React/react-three)

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/three-01.jpg)

这里，我们可以更加直观的感受到生命周期中钩子函数的调用顺序以及触发的次数

### 更新阶段

> 当组件的 `props` 或 `state` 发生变化时会触发更新

更新阶段会依次触发以下生命周期函数：

- `static getDerivedStateFromProps()`
- `shouldComponentUpdate()`
- `render()`
- `getSnapshotBeforeUpdate()`
- `componentDidUpdate()`

在生命周期函数执行阶段，有一些钩子函数是多次触发，比如更新阶段的 `static getDerivedStateFromProps()` 与 `render()` 函数也会在挂载阶段触发

#### shouldComponentUpdate(nextProps, nextState)

> 当 `props` 或 `state` 发生变化时，`shouldComponentUpdate()` 会在渲染执行之前被调用。根据 `shouldComponentUpdate()` 的返回值，判断 `React` 组件的输出是否受当前 `state` 或 `props` 更改的影响。默认行为是 `state` 每次发生变化组件都会重新渲染

使用该函数需要注意的地方：

- 在组件首次渲染的时候是不会调用这个生命周期函数的
- 在该函数中我们可以通过 `this.state` 和 `this.props` 拿到更新之前的 `state` 与 `props` 的值；通过 `nextProps` 与 `nextState` 拿到 `props` 与 `state` 更新之后的值
- 该函数必须提供一个返回值，`true` 或者 `false`。 默认返回 `true`
- 最好不要企图依靠此方法来阻止渲染 ( 返回 `false` )

#### getSnapshotBeforeUpdate(prevProps, prevState)

> `getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 `DOM` 节点）之前调用 

简单来说，这个函数会在 `componentDidUpdate()` 函数执行之前调用，一般会用于一些UI的处理
需要注意的点：
- 在这个函数中我们可以拿到组件更新之前的 `props` 与 `state` 的值
- 必须与 `componentDidUpdate()` 一起使用
- 必须提供返回值 `snapshot` 的值( 在`componentDidUpdate()`中接收 )或 `null`

#### componentDidUpdate(prevProps, prevState, snapshot)

> `componentDidUpdate()` 会在更新后会被立即调用。首次渲染不会执行此方法

使用该函数需要注意的点：

- 当组件更新后，可以在此处对 `DOM` 进行操作
- 可以选择在此处进行网络请求
- 可以直接调用 `setState()`，但是必须将它包裹在一个条件语句中
- 如果 `shouldComponentUpdate()` 返回值为 `false`，则不会调用 `componentDidUpdate()`
- 在该函数中可以拿到 更新之前的 `state` 与 `props` 值，也可以拿到 `getSnapshotBeforeUpdate()` 传递过来的值,如果并没有传递值，则第三个参数的值为 `undefined`

#### UNSAFE_componentWillUpdate(nextProps, nextState) `弃`

> 此生命周期之前名为 `componentWillUpdate`。该名称将继续使用至 `React 17`

使用该函数需要注意的地方：

- 当组件收到新的 `props` 或 `state` 时，会在渲染之前调用 `UNSAFE_componentWillUpdate()`
- 不能此方法中调用 `this.setState()`
- 如果 `shouldComponentUpdate()` 返回 `false`，则不会调用 `UNSAFE_componentWillUpdate()`
- 不要与新的生命周期一起使用(会出现警告)

#### UNSAFE_componentWillReceiveProps(nextProps) `弃`

> 此生命周期之前名为 `componentWillReceiveProps`。该名称将继续使用至 `React 17`

> `UNSAFE_componentWillReceiveProps()` 会在已挂载的组件接收新的 `props` 之前被调用

使用该函数需要注意的地方：

- `React` 不会针对初始 `props` 调用 `UNSAFE_componentWillReceiveProps()`，只会在组件的 `props` 更新时调用此方法
- 调用 `this.setState()` 通常不会触发 `UNSAFE_componentWillReceiveProps()`
- 不要与新的生命周期函数一起使用

还是让我们通过一个实例来整体感受一下挂载更新阶段 [Dome地址](https://github.com/ltadpoles/example/tree/master/React/react-three)

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/three-02.jpg)

### 卸载阶段

`React` 在卸载阶段只有一个生命周期函数

#### componentWillUnmount()

> componentWillUnmount() 会在组件卸载及销毁之前直接调用

使用该函数的注意点：

- 可以在该函数中执行必要的清理工作，比如 定时器
- `componentWillUnmount()` 中不应调用 `setState()`，因为该组件将永远不会重新渲染

通过点击事件，控制子组件的挂载与卸载，演示 `Demo` 可以 [参见这里](https://github.com/ltadpoles/example/tree/master/React/react-three)

下面就是一个基本完整的 `React` 组件从挂载到 子组件卸载的完整过程

![image](https://raw.githubusercontent.com/ltadpoles/example/master/React/images/three-03.jpg)

### 总结

一个组件从开始挂载到最终卸载生命周期(主要)

生命周期 | 调用次数 | 是否可以使用 setState
---|---|---|---
`constructor()` | 1 | 否 
`render()` | >= 1 | 否 | 
`componentDidMount()` | 1 | 是
`componentDidUpdate()` | >=1 | 是(必须被包裹在一个条件语件里) 
`componentWillUnmount()` | 1 | 否

- `React` 中必须实现的生命周期只有 `render`
- 在 `constructor` 中进行 `state` 的初始化与事件绑定
- 在 `componentDidMount` 与 `componentDidUpdate` 中进行一些 `DOM` 操作和数据交互，使用 `setState`
- 在 `componentWillUnmount` 中处理一些清理工作

### 后记

以上就是 `React` 中生命周期的一些基本用法，这篇文章大部分都是参考官网而来，其中夹杂了一些个人的实践

[点击这里](https://github.com/ltadpoles/example/tree/master/React/react-three) 查看完整 `Demo`

感兴趣的小伙伴也可以 [点击这里](https://github.com/ltadpoles/web-document) 查看更多前端小片段，欢迎关注 `star`