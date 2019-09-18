### 前言

虽然一直在接触 `webpack` ，不过都是在项目开发时遇到问题去看看文档，并没有系统化地学习、消化。这篇文章将从 `webapck` 最基本的配置开始说起，直到成功打包一个简单的项目。分享给需要入门的小伙伴，也是留一个笔记

基于 `webpack 4.x`

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

好了，废话不多说，以下 ↓

### 概念

对于刚接触 `webapck` 的同学来说，可能首先要想知道的是 `webpack是什么，它能做什么`

对于这个问题，`webpack` 的官网给我们的答案：

> 本质上，`webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包工具。当 `webpack` 处理应用程序时，它会在内部构建一个 依赖图(`dependency graph`)，此依赖图会映射项目所需的每个模块，并生成一个或多个 `bundle`

至于 `webpack` 与传统的打包工具，比如 `gulp` 之间有什么样的区别，这里就不细说了，感兴趣的小伙伴可以看看 [这里](https://www.zhihu.com/question/37020798)

### 核心

`webpack` 的核心有四个
- entry 入口
- output 输出
- loader 
- plugin 插件

**entry**
> 指示 `webpack` 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，`webpack` 会找出有哪些模块和库是入口起点（直接和间接）依赖的.默认值是 `./src/index.js`

**output**
> 告诉 `webpack` 在哪里输出它所创建的 `bundle`，以及如何命名这些文件。主要输出文件的默认值是 `./dist/main.js`，其他生成文件默认放置在 `./dist` 文件夹中

**loader**
> `webpack` 只能理解 `JavaScript` 和 `JSON` 文件。`loader` 让 `webpack` 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中

**plugin**
> `loader` 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量

这些概念小伙伴们记住就好，知道每个属性是做什么。下面，让我们进行一些实际操作

### 准备工作

好了，既然我们要使用 `webpack` 对一个项目进行打包，那么首先我们需要创建一个项目，比如使用 `jQuery` 做一个隔行变色案例。项目基本结构可以是这样：

```
│  index.html   //html 页面
│  package.json     // package.json 文件
│
└─ src
    │  main.js      // js 文件
```

很简单的结构有木有，接下来我们先下载需要的东西
- webapck
- webpack-cli
- jquery

> 从 `v4.0.0` 开始，`webpack` 可以不用再引入一个配置文件来打包项目，就是依赖于 `webpack-cli` 。但是，它仍然是高度可配置的

### 命令行模式

首先，我们现在可以直接使用命令的行模式去进行项目打包

语法：
```js
webpack 入口 -o 出口
```

执行成功大概是这个样子的

![image](https://raw.githubusercontent.com/ltadpoles/example/master/Webpack/images/01.png)

更所命令行的操作，有兴趣的小伙伴可以看 [这里](https://webpack.docschina.org/api/cli/#src/components/Sidebar/Sidebar.jsx)

一般情况下我们的项目当中会有很多需要配置的地方，所以都会有一个配置文件去专门设置 `webapck`

### 配置文件

首先，这时候我们的文件目录大概是这个样子的

```
│  index.html   //html 页面
│  package.json     // package.json 文件
│  webpack.config.js // webpack配置相关
│
└─ src
    │  main.js      // js 文件
```

这里的 `webpack.config.js` 就是我们需要配置的文件

我们先需要下载一个 `webpack-dev-server`,它能够快速开发应用程序，我们可以在其中启动本地服务、设置基础页面、端口号、是否打开浏览器、是否启用热更新等一系列功能

下面，就让我们具体看看怎么去做这些配置吧

![image](https://raw.githubusercontent.com/ltadpoles/example/master/Webpack/images/02.jpg)

![image](https://raw.githubusercontent.com/ltadpoles/example/master/Webpack/images/03.jpg)

启用上面这些配置，已经可以简单地构建我们的项目了。



鉴于上图中的笔记，这里补充一些

- `path` 是 `node` 中的一个模块，用来表示路径相关的操作
- 启用热更新的方式可以在 `devServer` 中启用，然后引入 热更新插件的方式。或者，直接在 `package.json` 文件中的 `script` 添加 `webpack-dev-server --hot`
- 解析 `css` 或者 `sass` 的 `loader` 顺序问题呢： 从右向左
- `url-loader` 和 `file-loader` 的功能相类似，不过在文件大小（单位 byte）低于指定的限制时，可以返回一个 `DataURL`，可以这样设置
```js
{
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192 // 小于8kb将被转化为base64的格式，以上返回一个DataURL
        }
      }
    ]
}

```

### 后记

以上就是关于 `webpack` 的一些基本配置，点击这里可以查看 [完整DEMO](https://github.com/ltadpoles/example/tree/master/Webpack/demo1)

当然 `webapck` 还有很多很多的配置，比如说代码压缩、模块化分类、按需加载等等一些列功能，我们慢慢分享

