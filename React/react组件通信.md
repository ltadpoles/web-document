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