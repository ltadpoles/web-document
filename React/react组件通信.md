### 前言

前面几篇文章介绍了 `React` 中的基础知识点，这篇文章将还是通过实例的方式记录一下 `React` 中组件之间的通信方式

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

在 `React` 中，需要组件通信的情况一般有以下几种：

- 父组件向子组件通信
- 子组件向父组件通信
- 跨级组件通信
- 非嵌套组件通信

### 父组件向子组件通信

`React` 中采用数据单向流动的方式，父组件向子组件传递数据也是很常见的情况，父组件通过 `props` 向子组件传递数据

[实例 Demo](https://github.com/ltadpoles/example/blob/master/React/react-communication/src/main-1.js)

```js
// 父组件
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Child name='tadpole' />
        )
    }
}

// 子组件
function Child(props) {
    return (
        <div>{props.name}</div>
    )
}
```

### 子组件向父组件通信

利用自定义事件，触发回调

[实例 Demo](https://github.com/ltadpoles/example/blob/master/React/react-communication/src/main-2.js)

```js
// 父组件
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {data: ''}
    }
    // 自定义的回调事件
    childValue = data => {
        this.setState({data})
    }
    render() {
        return (
            <div>
                子组件传递过来的值：{this.state.data}
                <Child transferValue={this.childValue}/>
            </div>
        )
    }
}

// 子组件
class Child extends React.Component {
    constructor(props) {
        super(props)
        this.state = {data: ''}
    }
    valueChange = data => {
        // 保证子组件中的值和传递过去的值一致
        this.setState({
            data: data.target.value
        })
        // 触发回调 传递给父组件
        this.props.transferValue(data.target.value)
    }
    render() {
        return (
            <div>
                子组件： <input vlaue={this.state.data} onChange={this.valueChange} />
            </div>
        )
    }
}
```

### 跨级组件通信

- 一层一层传递 `props`
- `Context`

`React` 中遵循数据单向流动（自上而下）的规则，其实我们完全可以通过每级组件传递 `props` 的方式来实现跨级通信的目的。但是，在这个过程中，有些组件是不需要使用上级传递过来的 `props` 的，这种操作无疑是显得多余的，这个时候就引入了 `Context`

> `Context` 提供了一个无需为每层组件手动添加 `props`，就能在组件树间进行数据传递的方法，它设计目的就是为了共享那些对于一个组件树而言是“全局”的数据

[实例 Demo](https://github.com/ltadpoles/example/blob/master/React/react-communication/src/main-3.js)

```js
// 创建一个Context对象
const InitContext = React.createContext()

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            // 使用一个 Provider 来将当前的 context 传递给以下的组件树
            <InitContext.Provider value='tadpole'>
                <Child />
            </InitContext.Provider>
        )
    }
}

function Child(props) {
    return (
            <LastComponent />
        )
}

class LastComponent extends React.Component {
    // 指定 contextType 读取当前的  context
    static contextType = InitContext
    render() {
        return (
            <div>name: {this.context}</div>
        )
    }
}
```
使用 `Context` 的注意点：
- 每个 `Context` 对象都会返回一个 `Provider React` 组件
- 只有当组件所处的树中没有匹配到 `Provider` 时，其 `defaultValue` 参数才会生效,默认值为 `undefined`
- 多个 `Provider` 也可以嵌套使用，里层的会覆盖外层的数据 `Provider` 接收一个 `value` 属性，传递给消费组件(`React` 会往上找到最近的 `Provider`，然后使用它的值)
- 可以在任何生命周期中访问到，包括 `render` 函数中

更多参考 [Context API](https://zh-hans.reactjs.org/docs/context.html#api)

### 非嵌套组件通信

非嵌套组件通信的思路一般有以下几种：

- 找到组件共同的父组件 (可以参考这个 [评论组件](https://github.com/ltadpoles/example/blob/master/React/react-communication/src/main-4.js)既有父子组件通信也有兄弟组件通信)

- 利用 `Context API` 进行通信，创建一个 `全局` 可访问的值
- 利用 `events` 创建自定义事件

一般情况下，第一种方式找到共同的父组件可能存在很多级的情况，不是很友好，第二种方式对于后期维护或者说对于组件的可复用性不是很友好，所以，我们试一下自定义事件这种方式

[实例 Demo](https://github.com/ltadpoles/example/blob/master/React/react-communication/src/main.js)

首先，我们需要一个 `events` 这个包

```npm 
npm install events -S
```
通过注册、触发事件来实现组件通信
```js
import { EventEmitter } from 'events'

const emitter = new EventEmitter()

// 组件A
class ComponentA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {msg: ''}
    }
    componentDidMount() {
        // 组件挂载完毕的时候注册事件
        this.eventEmitter = emitter.addListener('outputValue', msg => {
            this.setState({msg})
        })
    }
    componentWillUnMount() {
        // 组件销毁之前移除事件
        emitter.removeListener(this.eventEmitter)
    }
    render() {
        return (
            <div>
                这是组件A
                <div>组件B传递过来的数据：{ this.state.msg }</div>
            </div>
        )
    }
}

// 组件B
class ComponentB extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}
    }
    valueChange = data => {
        this.setState({
            value: data.target.value
        })
    }
    btnClick = () => {
        // 触发自定义事件
        emitter.emit('outputValue', this.state.value)
    }
    render() {
        return (
            <div>
                这是组件B
                <input value={this.state.value} onChange={this.valueChange}></input>
                <button onClick={this.btnClick}>点击我传递信息</button>
            </div>
            
        )
    }
}
```

### 后记

以上就是 `React` 组件之间通信的常用方式，其实在我们实践的过程中肯定也发现了有些方式可以用于多种组件关系的通信，关键在于**使用最合适的方式**

当然，对于一些比较复杂的组件通信来说，我们也可以选择使用状态管理工具，比如 `flux` 、`redux` 等，使我们的组件通信更加容易、更好管理

最后，感兴趣的小伙伴可以 [点击这里](https://github.com/ltadpoles/web-document) 了解更多前端片段，欢迎关注 `star`
