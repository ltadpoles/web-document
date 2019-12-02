### 前言

本文主要记录 `Hook` 中比较重要的知识点以及实际应用中遇到的问题，还有查阅相关文档使用的一些心得

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### 初识

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

虽然在学习 `Hook` 的过程中了解 `class` 组件并不是必须的，但是如果你想更快更容易地理解 `Hook` 还是需要先了解 `class` 组件的，因为无论是 [官网](https://zh-hans.reactjs.org/) 还是其他大部分文档在介绍 `Hook` 的时候都是通过与 `class` 组件对比的

至于为什么会有 `Hook`，它解决了我们开发中的什么问题，这不在本文的记录范围内，感兴趣的朋友可以 [参考这里](https://zh-hans.reactjs.org/docs/hooks-intro.html)

#### 基本

```
import React, { useState, useEffect } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);
  
  useEffect(()=> {
      console.log('加载了…')
      return () => {
          console.log('解绑了…')
      }
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

上面是一个简单的 `Hook`，当我们点击按钮的时候，页面上的数字书递增，同时控制台也会打印出不同的信息

最直观的感觉，我们再也不需要定义 `class` 类来使用 `state` 维护组件自身的状态了，而是使用 `useState` 来生成组件的 `state` 和控制它的方法。同样的没有借助组件的生命周期，我们注册在 `useEffect` 中的方法在首次加载和 `state` 更新的时候也执行了

在这里，`useState` 与 `useEffect` 就是 不同的 `Hook`。通过在函数中调用不同的 `Hook` ，就可以实现使用 `class` 实现的一些功能

#### 注意点

- `Hook` 是一些可以在函数组件里钩入`React state` 及生命周期等特性的函数。不能在 `class` 组件中使用
- 只能在函数最外层调用 `Hook` 。不要在循环、条件判断或者子函数中调用
- 只能在 `React` 的函数组件或自定义 `Hook` 中调用 `Hook`
- `Hook` 是一种复用状态逻辑的方式，它不复用 `state` 本身,`Hook` 的每次调用都有一个完全独立的 `state`,简单来说就是一个新的 `state`
- `Hook` 使用了 `JavaScript` 的闭包机制

了解 `Hook` 的这些特性，对于我们熟悉并使用 `Hook` 会有很大的帮助

推荐阅读 [为什么 顺序调用对 React Hook 很重要](https://overreacted.io/zh-hans/why-do-hooks-rely-on-call-order/)

### 基础 Hook

#### useState

```js
const [state, setState] = useState(initialState)
```

特性： 

- `useState` 是一个函数，返回值是一个数组(当前 `state` 以及更新 `state` 的函数), 唯一的参数就是初始 `state`
- 初始渲染期间，返回的状态 (`state`) 与传入的第一个参数值相同
- `setState` 函数用于更新 `state`。它接收一个新的 `state` 值并将组件的一次重新渲染加入队列
- `initialState` 只会在初识渲染中起作用，后续会被忽略，如果传入一个函数就只会在初始渲染时被调用,如果为空，变量的值就是 `undefined`
```js
const [name, setName] = useState()

name // undefined

// 这个函数只会执行一次
const [count, setCount] =useState(()=> {
    const initialState = someExpensiveComputation(props);
    return initialState;
})
```
- 更新 `state` 变量总是替换它而不是合并它，`this.setstate()`会自动合并
```js
// 比如我们修改 state 中的某一个属性

const [state, setState] = useState({
    name: '游荡de蝌蚪',
    age: 18,
    hobby: 'play game'
})

// 使用 class
this.setstate({
    age: 17
})

// 使用 Hook
setState(prevState => {
    return {...prevState, age: 17}
})
```
- 可以多次声明

另外，在使用 `useState` 声明变量的时候，我们可以单独声明每一个变量，也可以直接使用一个对象或数组

```js
// 单独声明
const [height, setHeight] = useState(10)
const [width, setWidth] = useState(20)
const [left, setLeft] = useState(10)
const [top, setTop] = useState(10)

// 也可以直接使用一个对象
const [state, setState] = useState({
    height: 10,
    width: 20,
    left: 10,
    top: 10
})
```
在实际的使用中，按照逻辑将 `state` 分组是最佳实践，避免了 `state` 对象过于臃肿也很好地将有关联的 `state` 进行了分组维护。比如，上面声明的几个变量我们可以这样进行分类

```js
const [box, setBox] = useState({
    height: 10,
    width: 20
})

const [position, setPosition] = useState({
    left: 10,
    top: 10
})
```

#### useEffect

```js
useEffect(() => {
    effect
    return () => {
        cleanup
    };
}, [input])
```

特性：
- 默认情况下，它在第一次渲染之后和每次更新之后都会执行
- 可以把 `useEffect Hook` 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合
```js
// 这个函数会在首次加载、state更新以及组件卸载的时候执行
useEffect(() => {
    console.log('方法执行了')
    return () => {
        console.log('解绑了')
    }
})
```
- 与 `componentDidMount` 或 `componentDidUpdate` 不同，使用 `useEffect` 调度的 `effect` 不会阻塞浏览器更新屏幕,也就是说它是异步的
- 可以使用多个 `effect` 用来分离不同的逻辑（比如按照不同的用途），也就是说我们可以添加多个 `effect`
- 可以配置 effect 的第二个参数来设置依赖项，当这个依赖项改变的时候再去执行这个函数，从而实现性能优化，如果我们只想让这个函数在首次加载和卸载的时候执行，那么可以传一个空数组
```js
// 只有在 count 变化的时候，函数才会执行
useEffect(() => {
    console.log('方法执行了')
    return () => {
        console.log('解绑了')
    }
}, [count]) 

// 只在首次加载和卸载的时候执行
useEffect(() => {
    console.log('方法执行了')
    return () => {
        console.log('解绑了')
    }
}, []) 
```
- 必须在依赖中包含所有 `effect` 中用到的组件内的值
- 清除函数会在组件卸载前执行。如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除
- 如果只想在更新的时候运行 `effect` ，那么可以使用一个可变的 `ref` 手动存储一个 `boolean` 值来判断
- `effect` 拿到的总是定义它的那次渲染中的 `props` 和 `state`

推荐阅读 [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/) 以及 [如何在Effect中发送请求](https://www.robinwieruch.de/react-hooks-fetch-data)

#### useContext

```js
const value = useContext(MyContext)
```

如果对于 `context` 并不是十分熟悉，可以先点击 [这里](https://zh-hans.reactjs.org/docs/context.html)，了解 `context` 的内容

特性：
- 接收一个 `context` 对象（`React.createContext` 的返回值）并返回该 `context` 的当前值
- `useContext` 的参数必须是 `context` 对象本身
- 当前的 `context` 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value prop` 决定
- 调用了 `useContext` 的组件总会在 `context` 值变化时重新渲染

```
 // 官方文档的案例，省去中间组件
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
}

const ThemeContext = React.createContext(themes.light);

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  )
}

```

### 其他 Hook

#### useReducer

`useState` 的替代方案，如果熟悉 `Redux` ，那么理解 `Reducer` 就很容易了

- 接收一个形如 `(state, action) => newState` 的 `reducer`，并返回当前的 `state` 以及与其配套的 `dispatch` 方法

```
const initialState = {count: 0};

// action 用来表示触发的行为
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
- `reducer` 本质是一个纯函数，每次只返回一个值，那个值可以是数字，字符串，对象，数组或者对象，但是它总是一个值
- `React` 会确保 `dispatch` 函数的标识是稳定的，并且不会在组件重新渲染时改变
- `useReducer` 还能给那些会触发深更新的组件做性能优化，因为可以向子组件传递 `dispatch` 而不是回调函数 
- `reducer` 更适合去处理比较复杂的 `state`，来维护组件的状态

上面示例是一种基础初始化 `state` 的方式，我们也可以选择 `惰性初始化` 的方式

```
// init 是一个函数，返回值就是 state
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

如果使用这种方式初始化，`state` 的值就是 `init(initialArg)`

#### useRef

```
const refContainer = useRef(initialValue)
```

- `useRef` 返回一个可变的 `ref` 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。
- 返回的 `ref` 对象在组件的整个生命周期内保持不变，可以很方便地保存任何可变值
- 变更 `.current` 属性不会引发组件重新渲染
- `useRef()` 创建的是一个普通的 `Javascript` 对象，并且每次渲染返回的都是同一个对象

注意点：

在理解 `useRef` 之前，我们一定要清楚的是对于函数组件而言，每一次状态的改变都是会重新触发 `render`。也就是说，我们在组件状态变化的时候拿到的值已经是一个全新的数据，只是 `react` 帮我们记住了之前的数据

利用 `ref` 对象的这个特性，我们可以实现：

- 比如之前说过的 只在更新时运行 `effect`
- 获取上一轮的 `props` 或 `state`
- 访问子组件变得很容易

#### useCallback

```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
)
```
函数组件的每一次调用都会执行内部的所有逻辑，带来较大的性能损耗，所以 `useCallback` 出现了，它的作用就是解决性能问题。需要使用到缓存函数的地方，都是 `useCallback` 的应用场景

最常见的场景就是父组件传递给子组件的函数，`props` 中的某个依赖项不发生变化的情况下，使用 `useCallback` 使子组件不必执行更新

将内联函数和依赖项数组作为参数传入 `useCallback`，该回调函数仅在某个依赖项改变时才会更新，从而实现性能优化

- 会在组件第一次渲染和依赖项更新的时候执行
- 返回一个缓存的函数
- 不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作
- 如果没有提供依赖项数组，`useCallback` 在每次渲染是都会执行；如果是一个空数组，那么就只会在首次渲染的时候计算一次

#### useMemo

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

与 `useCallback` 一样，作为性能优化的方式存在。与 `useCallback` 不同的是：**`useMemo` 返回的是一个缓存的值**

- 会在组件第一次渲染和依赖项更新的时候去重新计算缓存的值
- 返回一个缓存的值
- 不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作
- 如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值，如果是一个空数组，那么就只会在首次渲染的时候计算一次

### 自定义 Hook

> 通过自定义 Hook，可以将组件逻辑提取到可重用的函数中

在 `hook` 之前，我们一般会使用 `render props` 和 高阶函数来共享组件之间的状态逻辑

现在，我们可以使用自定义 `Hook` 的方式来实现同样的功能，而且可以使逻辑条理更加清晰

- 自定义 `Hook` 是一个函数，其名称以 `use` 开头，函数内部可以调用其他的 `Hook`
- 不需要具有特殊的标识。我们可以自由的决定它的参数是什么，以及它应该返回什么
- 自定义 `Hook` 是一种重用状态逻辑的机制，并不会共享数据

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

### 后记

以上主要介绍了 `Hook` 的一些重要特性以及经常会使用到的 `Hook`，文章大部分内容以及示例都来自官网，然后就是自己整理总结的一点东西，知识点的整合

本文所有的示例，都可以在 [这里](https://github.com/ltadpoles/example/tree/master/React/hooks) 找到