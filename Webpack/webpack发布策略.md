### 前言

前一篇文章 [Webapck基础搭建](https://github.com/Roamen/web-document/issues/18) 我们了解了一下 `Webpack` 的基本配置,已经可以使用它简单的搭建一个打包环境。但是，`Webpack` 的功能不仅仅就这么简单，不然也不会成为前端最流行的模块化打包工具

那么，它还有哪些我们需要了解的功能呢，下面，我们一点点去了解一下吧

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

好了，废话不多说，以下 ↓

### 准备工作

既然我们要使用 `Webpack` 进行项目打包，那么首先我们肯定需要有一个这样的项目。

了解了 `Webpack` 的基本配置，我们就可以试着搭建一个简单的 `vue-cli` 了，根据官网需要的 `loader` 还有一些简单的插件，以及对 `.babelrc` 文件的修改，还是比较容易的

这里踩到的坑：
- `babel-loader` 升级到 `8.x` 版本之后可能需要简单的配合，为了便捷，所以 `demo` 中直接使用的7.x版本
- `vue-loader` 在升级到 `5.x` 之后 必须引入 `vue-loader/lib/plugin` 插件，否则会报错

具体 `DOME` 请 [点击这里](https://github.com/Roamen/webpack/tree/master/demo2)，查看配置
