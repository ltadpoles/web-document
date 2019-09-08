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

[实例 Demo](https://github.com/Roamen/example/blob/master/React/react-communication/src/main-1.js)

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

[实例 Demo](https://github.com/Roamen/example/blob/master/React/react-communication/src/main-2.js)

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

[实例 Demo](https://github.com/Roamen/example/blob/master/React/react-communication/src/main-3.js)

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