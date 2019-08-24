### 前言

前面两篇文章简单地介绍了 `React` 中的 `JSX` 语法、状态组件、绑定事件、设置 `state` 等基本操作，这篇文章将继续通过一些实例介绍 `React` 中的基础知识点生命周期、受控组件等

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### 生命周期

什么是声明周期

> 简单来说：一个组件从创建到最后消亡所经历的各种状态，就是一个组件的生命周期

> 从组件被创建，到组件挂载到页面上运行，再到页面关闭组件被卸载，这三个阶段总是伴随着组件各种各样的事件，那么这些事件，统称为组件的生命周期函数

本文基于 `React 16.9.0` 版本

在 `React` 中，我们可以将其生命周期分为三个阶段：
- 挂载阶段
- 更新阶段
- 卸载阶段

不同的阶段将对应不同的钩子函数来处理组件的状态

#### 挂载阶段

首先是挂载阶段，当组件实例被创建并插入 `DOM` 中时,将以此调用以下生命周期函数

##### constructor(props)

> 在 `React` 组件挂载之前，会调用它的构造函数，在这个函数中我们可以拿到组件传递的 `props`

通常，在 `React` 中，构造函数仅用于以下两种情况：

> 通过给 this.state 赋值对象来初始化内部 state

> 为事件处理函数绑定实例

需要注意的地方：

- 在 `constructor()` 函数中不要调用 `setState()` 方法
- 避免将 `props` 的值复制给 `state`

##### static getDerivedStateFromProps(props, state)

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
- 与 `UNSAFE_componentWillMount()` 不能同时出现，会报错

##### render()

> `render()` 方法是 `class` 组件中唯一必须实现的方法

使用该函数需要注意的地方：

- 必须有返回值，可以有多种类型，详细可以 [参考这里](https://zh-hans.reactjs.org/docs/react-component.html#render)，如果不需要返回任何结构，可以直接返回 `null`
- `render()` 函数应该为纯函数
- 不能在函数中调用 `this.setState()` 方法
- 该函数会调用多次

##### componentDidMount()

> `componentDidMount()` 会在组件挂载后（插入 `DOM` 树中）立即调用。依赖于 `DOM` 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方

在该函数中常有的操作：

- 操作 `DOM` 
- 进行 `ajax` 操作来完成数据的交互
- 使用 `setState()` 来修改 `state`

##### UNSAFE_componentWillMount()

> 此生命周期之前名为 `componentWillMount`。该名称将继续使用至 `React 17`

此生命周期函数现在已经不被官方推荐使用，将会在后期版本中移除，它具有以下特点：

- `UNSAFE_componentWillMount()` 在挂载之前被调用。
- 它在 `render()` 之前调用,在此方法中同步调用 `setState()` 不会触发额外渲染
- 与现有的 `static getDerivedStateFromProps()` 不能同时使用，只会调用一次

让我们通过一个实例来整体感受以下挂载阶段 [Dome地址](https://github.com/Roamen/example/tree/master/React/react-three)

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/three-01.jpg)

这里，我们可以更加直观的感受到生命周期中钩子函数的调用顺序以及触发的次数