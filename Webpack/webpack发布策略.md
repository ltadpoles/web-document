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


### 分离第三方包

项目基本配置完成，接下来我们先打包一次看看效果：

![image](https://raw.githubusercontent.com/Roamen/web-document/master/images/w-01.jpg)

如果先前配置没有问题，基本就是上图的样子

从打包好的文件中我们可以看到有 `html` 页面，字体文件以及 `bundle.js` 文件( `Webapck4` 之后，会有默认分包策略，所以会出现好几个 `bundle.js` 文件)

不难看出，其中 `bundle.js` 文件的体积还是比较大的，现在，我们首先将之前项目引入的第三方包分离出来

分离第三方包在 `Webapck4.x` 版本之前，我们都是使用 `CommonsChunkPlugin` 去做分离，进入 `webpack4.x` 版本，这种方式被移除，至于两者之间有怎样的区别，小伙伴们可以在官网查看详细信息

现在进行第三方包的分离工作：

在 `webpack4.x` 之前的时代，我们需要指定需要分离的第三方包、指定出口、添加插件这三个步骤

现在我们需要做的：

- 指定出口
```js
output: {
    path: path.resolve(__dirname, './dist'),
    // 指定分离出来包的名称
    filename: 'js/[name].js'
},
```
- 引入配置
```js
optimization:{   
    splitChunks:{
        cacheGroups:{//缓存组，一个对象。它的作用在于，可以对不同的文件做不同的处理
            commonjs:{
                name:'vender',        //输出的名字（提出来的第三方库）
                test: /\.js/,        //通过条件找到要提取的文件
                chunks:'initial'    //只对入口文件进行处理
            }
        }
    }
}
```
至于 `optimization` 这个对象的配置，小伙伴们可以 [点击这里](https://webpack.js.org/plugins/split-chunks-plugin/) 查看完整配置说明

至此，我们在打包一次看看效果：

![image](https://raw.githubusercontent.com/Roamen/web-document/master/images/w-02.jpg)

很明显，已经成功分离出了第三方代码

