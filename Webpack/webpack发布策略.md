### 前言

前一篇文章 [Webapck基础搭建](https://github.com/ltadpoles/web-document/blob/master/Webpack/webpack基础配置.md) 我们了解了一下 `Webpack` 的基本配置,已经可以使用它简单的搭建一个打包环境。但是，`Webpack` 的功能不仅仅就这么简单，不然也不会成为前端最流行的模块化打包工具

那么，它还有哪些我们需要了解的功能呢，下面，我们一点点去了解一下吧

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

好了，废话不多说，以下 ↓

### 准备工作

既然我们要使用 `Webpack` 进行项目打包，那么首先我们肯定需要有一个这样的项目。

了解了 `Webpack` 的基本配置，我们就可以试着搭建一个简单的 `vue-cli` 了，根据官网需要的 `loader` 还有一些简单的插件，以及对 `.babelrc` 文件的修改，还是比较容易的

这里踩到的坑：
- `babel-loader` 升级到 `8.x` 版本之后可能需要简单的配合，为了便捷，所以 `demo` 中直接使用的7.x版本
- `vue-loader` 在升级到 `5.x` 之后 必须引入 `vue-loader/lib/plugin` 插件，否则会报错

具体 `DOME` 请 [点击这里](https://github.com/ltadpoles/example/tree/master/Webpack/demo2)，查看配置


### 分离第三方包

项目基本配置完成，接下来我们先打包一次看看效果：

![image](https://raw.githubusercontent.com/ltadpoles/example/master/Webpack/images/w-01.jpg)

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

![image](https://raw.githubusercontent.com/ltadpoles/example/master/Webpack/images/w-02.jpg)

很明显，已经成功分离出了第三方代码

### 图片字体的处理

现在，我们已经成功分离出了 `js` 文件，再来看我们打包出来的 `dist` 目录。可以看到，我们所打包出来的文件中还有很多字体文件，图片是看不到的

由于我们使用 `url-loader` 对图片进行了处理，所以在默认情况下，所有的图片都会转化为 `base64` 的格式保存在我们的 `bundle.js` 文件当中

`url-loader` 与 `file-loader` 所实现的功能基本是相同的，可以说 `url-loader` 是 `file-loader` 的一个拓展，我们可以在 `url-loader` 的配置选项当中设置文件大小，从而使图片按照大小转换成 `base64` 的格式或者直接以路径引用

所以，我们可以在 url-laoder 中添加一个这样的限制

```js
{ test: /\.(jpg|png|gif|jpeg|bmp)$/, use: [{
    loader: 'url-loader',
    options: {
        // 限制图片大小 10240 表示10kb
        limit: 10240
        }
    }]
},
```

这样设置之后，所有小于 `10kb` 的图片还是会以 `base64` 的格式添加，大于 `10kb` 的则会以路径的形式引用

再来看我们的 `dist` 文件夹里面的内容，里面的内容分布不是很明显。所以接下来，我们将它们分类到不同的文件夹当中去

```js
{ test: /\.(jpg|png|gif|jpeg|bmp)$/, use: [{
    loader: 'url-loader',
    options: {
        // 限制图片大小 10240 表示10kb
        limit: 10240,
        name: 'images/img-[hash:5].[ext]'
    }
}]},
{ test: /\.(svg|eot|ttf|woff|woff2)$/, use: [{
    loader: 'file-loader',
    options: {
        name: 'font/[hash:7].[ext]'
    }
}]}
```

添加到文件夹中的方式都是一样，还是在 `options` 选项中添加 `name` 属性，其中 `ext` 表示以文件之前的格式后缀命名

接下来，我们重新打包一次：

![image](https://raw.githubusercontent.com/ltadpoles/example/master/Webpack/images/w-03.jpg)

是不是美观了很多

### 分离样式文件 

在 `Webpack4.x` 之前，我们都是使用 `extract-text-webpack-plugin` 这个插件来分离样式文件

自从 `webpack4` 之后，官方推荐的分离插件就是 `mini-css-extract-plugin`

首先，我们需要下载这个插件

```npm 
npm install --save-dev mini-css-extract-plugin
```

在webpack的配置文件中是这样的

```js
// 第一步：引入插件，在plugins中使用

new MiniCssExtractPlugin({
    filename: 'css/[name].css', // 打包文件名称
    ignoreOrder: false // 移除警告
})

// 第二步：修改style-loader 为 MiniCssExtractPlugin.loader

{ test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader'] },
{ test: /\.(sass|scss)$/, use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'] },

```

这样，我们就已经成功分离出了样式文件

### 按需加载

我们都知道，利用 `webpack` 的模块化功能，就可以实现模块的按需加载，那么，我们该怎么在项目中做一些配置呢

`webpack4.x` 以上版本实现了默认分包策略，也就是说在默认情况下，`webpack` 会智能区分我们的模块，实现按需加载的功能

默认分包策略具有以下规则：

- 新的 `chunk` 是否被共享或者是来自 `node_modules` 的模块
- 新的 `chunk` 体积在压缩之前是否大于 `30kb`
- 按需加载 `chunk` 的并发请求数量小于等于 `5` 个
- 页面初始加载时的并发请求数量小于等于 `3` 个

由于这样的一些内置规则，也就是为什么我们在前面的项目打包过程中会出现 `2.js`、`3.js` 这样的文件

拿我们现在这个 `Demo` 来说，对于这样的文件名称，很明显不是那么友好。所以，我们可以自定义一下这些文件名称，最简单的方式：

在 `router` 定义文件中：

![image](https://raw.githubusercontent.com/ltadpoles/example/master/Webpack/images/w-04.jpg)

使用 `webpackChunkName` 关键字直接定义名称就可以了,这样，当我们重新打包就可以看到定义的名称已经显示在 `dist` 文件夹当中了

### 其他

现在我们已经完成了 `webapck` 打包发布的基本功能，可是我们可能会发现这样一个问题：就是我们每次在打包之前都要手动删除掉 `dist` 文件夹。很明显，不友好

我们可以使用 `clean-webpack-plugin` 来删除它

插件的使用方式也是很简单：

- 下载 `clean-webpack-plugin` 插件 
- 在配置文件中引入
```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
```
这里有一个小小的坑，插件版本的不同，在`3.0` 版本我们需要这样引入 这个插件
- 在插件中直接使用
```js
new cleanWebpackPlugin()
```

这样在我们每次打包之前，它都会先去删除 `dist` 文件，然后再打包，再也不用我们手动去操作它了

### 后记

到这里，这篇文章也就基本结束了

完整 `Demo`，请 [点击这里](https://github.com/ltadpoles/example/tree/master/Webpack/demo2) 查看

当然，关于 `webpack` 我们需要深入研究的还有很多很多，比如 `mode` 模式、`resolve` 解析、按需加载自定义模式、各种优化等等东西。`webpack` 里面的配置很复杂，但是当我们熟悉了里面的各种配置，再来构建一个项目就很简单了

我一直认为，模仿也是一种很有效的进步方式，有兴趣的小伙伴可以看一看 `vue` 或者 `react` 中的 `webpack` 配置，相信一定会对你有所启发

想要了解更多前端内容，有兴趣的小伙伴可以 [点击这里](https://github.com/ltadpoles/web-document) 欢迎关注 `star `

### 参考

[Webpack 官网](https://www.webpackjs.com/concepts/)
