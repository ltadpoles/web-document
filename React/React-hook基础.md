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
