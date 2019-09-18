### 前言

从零开始撸 `React-native`

相信前端的小伙伴们对 `react-native` 都有着或多或少的了解。那么，当我们要开始一个 `RN` 项目的时候,应该怎么开始呢

对了，**搭建环境**

以下是我的搭建环境实践，分享给有需要的小伙伴，也是留一个笔记(基于 `Windows` 系统)

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### 开始

首先，我们需要知道都需要哪些东西

- Node
- Python2.x
- Java JDK
- Android Studio
- react-native-cli

这里需要注意的地方就是 `Node` 的版本最好是大于等于 `10` ;还有一个就是 `Python` 的版本，必须是 `2.x`

[Node官网下载传送门](https://nodejs.org/en/) 

[Python官网下载传送门](https://www.python.org/downloads/windows/)

`Python` 的安装基本可以使用软件给定的设置，一直点下一步就可以了，只有在这个地方

![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/React/images/Python.png)

注意点 `x` 的我们需要将它更改为第一个选项，这样我们就不需要后期手动去将它添加到环境变量了


### Java JDK 

[下载地址](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/React/images/Java-JDK.png)

这个时候我们需要先同意协议，然后下载相应的文件版本，当然下载的时候可能先注册一个 `Oracle` 账号

`Java JDK` 的安装也是直接按照软件的配置一直安装就可以了，这里要说一下的是它的环境变量配置

> 环境变量配置入口： 此电脑(右击)=>属性=>高级系统设置=>高级=>环境变量=>系统变量

具体配置过程：

1. 点击 `系统变量` 下面的 `新建` 选项,在 `变量名` 处填上 `Java_Home`, `变量值` 为 `JDK` 安装路径，我自己的路径是 `C:\Program Files\Java\jdk1.8.0_121` ,点击 `确定` 选项
2. 在 `系统变量` 中找到 `Path` ,选中 `Path`点击 `新增`,将 `%Java_Home%\bin;%Java_Home%\jre\bin;` 添加进去，点击 `确定` 选项(这里 `win7` 和 `win10` 会有一点小差异)
3. 在 `系统变量` 栏，`新建`，`变量名` 为 `CLASSPATH` ，`变量值` 为 `.;%Java_Home%\bin;%Java_Home%\lib\dt.jar;%Java_Home%\lib\tools.jar`，`确定`
4. 点击 `环境变量` 最下面的 `确定` 选项
5. 打开命令窗口，输入 `java` 或者 `java -version`，成功输出，则表示配置成功

### Android 开发环境

关于 `Android` 开发环境的配置，这一部分在 `RN` 官网上面有详细的介绍，可以关注 [这里](https://reactnative.cn/docs/getting-started/)

需要关注的可能就是，需要翻墙环境。当然，有需要的小伙伴也可以点击 [这里](https://pan.baidu.com/s/1MuSDC5iHOtyOGP8YV1DlDw) 下载软件，提取码 `xg76`

### 创建新项目

接下来，我们就可以创建一个 `RN` 项目了

只是，在这之前我们还有几件事需要完成一下

首先，将 `npm` 设置为 `taobao` 源，初始化项目需要下载很多东西，网络不稳定特别容易失败

```npm
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```
然后，下载 `react-native-cli` 和 `yarn`

```npm
npm install -g yarn react-native-cli
```

安装完 `yarn` 后同理也要设置镜像源：

```npm
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

准备就绪，可以开始创建新项目了

```npm
react-native init HelloRN
```

这样，我们的一个 `RN` 项目就创建完成了，现在就需要进行真机或者模拟器的调试了。不要慌，官网也给了我们详细的教程，[传送门](https://reactnative.cn/docs/getting-started/)

### 运行

一切前期工作准备妥当，这个时候，我们只需要在命令行输入下面命令，就可以看到我们的项目了，美滋滋

```npm 
react-native run-android
```

### 后记

很幸运的是，通过之前的一系列配置，项目第一次就成功运行起来了，并没有出现问题。当然许多常见的问题，我们都可以在文档中找到它的解决方法

关注前端技术，每天进步一点点

有兴趣的小伙伴可以[点击这里](https://github.com/ltadpoles/web-document)，了解更多前端学习历程，欢迎 `star` 关注

