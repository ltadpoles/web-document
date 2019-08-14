### 前言

作为前端现行主流 `JS` 库之一，`React` 受到越来越多的开发者以及项目团队的青睐。我们可以使用它很高效地开发出一系列前端项目，或者使用 `React-native` 开发原生应用

上一篇 [RN环境搭建](https://github.com/Roamen/web-document/issues/16)，简单地介绍了一下 `React-Native` 开发所需要的环境配置。然而想要使用 `React-native` 进行原生开发，我们就必须先了解 `React` 的使用。从这一篇开始，我将记录下来 `React` 学习的点滴，分享给有需要的小伙伴，也留作笔记

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

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-01.png)

- `main.js`: 书写我们的 `JS` 逻辑
- `.babelrc`: 对 `React` 语法以及 `JSX` 进行转义
- `webpack.config.js`: 书写 `webpack` 逻辑

我们还需要下载一些项目所必须的依赖：

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-02.png)

- `react`：`React` 中的核心库
- `react-dom`: 提供与 `DOM` 相关的功能
- `babel`相关：对 `react` 以及 `JSX` 语法进行转义
- `webpack`以及 `webpack-cli`：`webpack` 配置相关

对于依赖相关，需要注意的是 `babel-loader` 最新为 `8.x` 版本，与 `babel-preset-react` 以及 `babel-preset-env` 版本有冲突，这里需要使用 `7.x `的版本

`.babelrc` 配置:

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-03.png)

至于 `webpack` 的简单配置，想要了解的小伙伴可以看一下这里 [webpack基本配置](https://github.com/Roamen/web-document/issues/18)，也可以查看 [完整demo](https://github.com/Roamen/react/tree/master/hello-react)

在这里我们需要添加的地方就是

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-04.png)

### Round 1

首先，我们不使用 `JSX` 的方式来创建一个简单的 `react` 页面

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-05.png)

`React` 中提供了 `React.createElement()` 方法来创建一个 `react` 元素，然后通过 `react-dom` 提供的 `render` 方法将元素渲染到页面

运行项目，应该可以看到成功的效果了

### Round 2

想象一下，如果我们直接使用前面原生的方式去生成 `react` 元素，对于简单的嵌套元素来说，前一种方式完全可以满足我们的需求。但是，当我们的项目元素嵌套比较复杂的时候，虽然也可以通过前一种方式去实现，可以这样很不直观，对于我们之后的开发或者维护无疑增加了难度

所以，我们知道了 `JSX`

`JSX`，是一个 `JavaScript` 的语法扩展。我们建议在 `React` 中配合使用 `JSX`，`JSX` 可以很好地描述 `UI` 应该呈现出它应有交互的本质形式

`React` 不强制要求使用 `JSX`，使用 `JSX` 会在视觉上有辅助作用。它还可以使 `React` 显示更多有用的错误和警告消息

实际上，`JSX` 仅仅只是 `React.createElement()` 函数的语法糖,也就是说，我们所写的 JSX 最终也会被 React 转义为 `React.createElement()` 的方式

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-06.png)

### Round 3

我们也可以通过普通函数去创建 `react` 元素

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-07.png)

### Round 4

使用普通函数创建 `JSX` 元素，那么，如果我们需要进行组件传递数据应该怎么操作呢

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-08.png)

### Round 5

我们也可以使用 `class` 去创建一个有状态的组件,在 `class` 中的 `render` 函数中直接使用 `this.props` 的方式获取组件传递的数据

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-09.png)

### Round 6

之所以说普通函数创建的组件是无状态组件，而通过 `class` 创建的组件是有状态组件，就是因为在 `class` 中 `state` 的存在

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-10.png)


### Round 7

看着我们所完成的 `React` 项目，是不是还缺少点什么呢

对的，你没有看错，它至今是没有样式的

下面，我们尝试着给它添加一些样式：

在 `React` 中，我们可以使用 `style` 行内样式和 `class` 的方式来完成

![image](https://raw.githubusercontent.com/Roamen/example/master/React/images/c-11.jpg)

这里需要注意的就是 `class` 引入的关键字是 `className`

最后，别忘了下载引入 `style-loader` 和 `css-loader`

### 后记

以上就是 `React` 运行的基本配置以及它当中的一些基础概念，有兴趣的小伙伴可以 [点击这里](https://github.com/Roamen/react/tree/master/hello-react)查看完整实例 `DEMO`

关于 `React` 的内容还有很多很多，感兴趣的小伙伴可以关注一波。当然，如果你想了解更多前端问题，也可以[点击这里](https://github.com/Roamen/web-document)，欢迎 `star` 关注

技术路漫漫，做一个善学者，每天进步一点点
