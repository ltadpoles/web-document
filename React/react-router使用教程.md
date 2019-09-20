### 前言

作为 `React` 全家桶的一员，如果我们想要开发一个 `React` 应用，那么 `react-router` 基本上是我们绕不过去的基础。基于此，对它的了解和使用也是必不可少的一步

本文将重点介绍实际应用中常用的一些 `API` 以及实践过程中遇到的一些问题，目标很简单：**会用**

> 基于 `react-router` `v5.0.1`，`WEB` 应用程序

### 安装

国际惯例，首先我们需要安装

```js
npm install --save react-router-dom 
```

从这一步开始，已经有同学有疑问了 我们明明在说 `react-router` 怎么要下载安装 `react-router-dom` 呢

`React Router` 现在已经被划分成了三个包：`react-router`，`react-router-dom`，`react-router-native`

> `react-router` 为 `React Router` 应用提供了核心的路由组件和函数，另外两个包提供了特定环境的组件（浏览器和 `react-native` 对应的平台），不过他们也是将 `react-router` 导出的模块再次导出

因为我们需要开发一个 `web` 应用，所以直接安装 `react-router-dom` 就可以了

### 初体验

首先，让我们通过一个小小的示例来感知一下 `react-router`

```html
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

const Index = () => <div>Index页面</div>

const About = () => <div>About页面</div>

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <div>
                    <ul>
                        <li><Link to='/'>Index</Link></li>
                        <li><Link to='/about'>About</Link></li>
                    </ul>
                </div>
                <div>
                    <Switch>
                        <Route path='/' exact component={Index}></Route>
                        <Route path='/about' exact component={About}></Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}

ReactDom.render(<App />, document.getElementById('app'))
```

通过上面的代码我们已经实现了路由的基本功能，匹配不同的路径，渲染不同的组件。下面，我们就上面的示例，认识一些 `react-router` 中高频率出现的概念

### 常用组件

#### Router 组件

`React Router` 应用程序的核心，每个 `router` 都会创建一个 `history` 对象，用来保持对当前位置的追踪

在 `web` 项目中，`react-router-dom` 提供了 `BrowserRouter` 和 `HashRouter` 路由。这两个路由都会为你创建一个专门的 `history` 对象。至于使用场景，一般情况下如果我们使用的是一个非静态的站点、要处理不同的 `url` 就使用 `BrowserRouter`，相反如果只处理静态的 `url`，则使用 `HashRouter`

#### Route 组件

> `Route` 组件的主要职责：当链接符合匹配规则时，渲染组件

路由匹配是通过比较 `Route` 的 `path` 属性和当前地址的 `pathname` 来实现的。当一个 `Route` 匹配成功时，它将渲染其内容，当它不匹配时就会渲染 `null`。没有路径的 `Route` 将始终被匹配

`Route` 组件常用属性：

- `path`: 字符串类型，用来匹配 `ulr`
- `exact`: `boolean` 类型，如果为 `true`，则只有在路径完全匹配 `location.pathname` 时才匹配
- `component`: 只有当位置匹配时才会渲染的 `React` 组件

注意点： 

> `Route` 组件属性都不是必须的，如果缺少 `path` 属性，那么将会匹配到任意 `url`

```html
<Route path='/' exact component={Index} />
<Route component={About} />
```
> 使用 `render` 或者 `children` 属性可以替代 `component` 属性，由于 `render` 与 `children` 都是函数的形式，所以可以在它们当中做一些比较复杂的逻辑

> `render` 函数也是在匹配 `url` 的时候渲染，而 `children` 函数 **任何时候** 都渲染，当路由匹配的时候 `match` 是一个对象，否则为 `null`

> 当三者一起使用的时候，优先级为 `children` > `component` > `render`

```html
<!-- 使用 render 属性 -->
<Route path='/about' render={() => <div>这个是render渲染的about页面</div>} />

<Route path='/about' render={(props) => <About {...props} />} />

<!-- 使用 children 属性 -->
<Route path='/about' children={() => <div>这是一个children渲染的about页面</div>}

<Route path='/about' children={({match}) => match ? <div>1</div> : <div>2</div> }
```

#### Switch 组件

> 渲染与该地址匹配的第一个子节点 `Route` 或者 `Redirect`

这个组件最重要的作用是可以将 `Route` 组件分组

```html
<Switch>
    <Route path='/user' render={()=><div>user页面</div>} />
    <Route path='/:id' render={()=><div>子成员</div>} />
    <Route render={()=><div>about页面</div>} />
</Switch>
```
在上面这个示例中，在没有 `Switch` 组件包裹的情况下，如果 `ulr` 是 `/user`，那么三个页面将会全部匹配到。这样的设计在一定程度上给我们提供了便利，比如说一个公共页面需要渲染好几个组件的情况。但是有时候我们并不想访问到全部的匹配组件，这个时候就可以将这些 `Route` 组件使用 `Switch` 包裹起来，它将永远渲染符合匹配项的第一个组件

注意点：

- `Switch` 匹配的规则是同一个组中渲染第一个匹配组件，也就是说如果是包裹在两个不同的 `Switch` 组件中的，会分别渲染匹配到的第一个组件
- `Switch` 组件中不能嵌套内置标签元素，比如 `div` `span`，但是可以嵌套组件，甚至可以添加 `path` 属性进行匹配， 实际上 `Route` 本身就是组件，但是建议还是只嵌套 `Route` 或者 `Redirect` 组件

#### Link 与 NavLink

相信小伙伴们看过前面的示例之后，应该对 `Link` 不会陌生了。它的作用就是提供声明式的可访问导航

> `Link` 常用属性：

- `to`：可以是 `String` 类型或者具有 `pathname`、`search`、`hash`、`state`任何属性的对象
    
    `pathname`: 表示要链接到的路径的字符串

    `search`: 表示查询参数的字符串形式
    
    `hash`: 放入网址的 `hash`
    
    `state`: 状态持续到 `location`
    
- `replace`：`boolean` 类型，如果为 `true`，点击链接将替换当前历史记录

> `NavLink` 一个特殊版本的 `Link`，当它与当前 `URL` 匹配时，为其渲染元素添加样式属性，其用法与 `Link` 基本相同

注意点：

- 给渲染元素添加属性可以使用 `activeClassName` 或者 `activeStyle` 属性进行添加，简单来说就是使用 `class` 类或者行内样式
- `NavLink` 有一个 `exact` 属性，如果为 `true`，则仅在位置完全匹配时才应用 `active` 的类/样式

#### Redirect 组件

顾名思义，重定向组件，组件中的 `to` 属性是必须的

属性：

- `to`：`string` 类型或者一个对象（`pathname` 属性是重定向到的 `URL`）
- `push`：`boolean` 类型，当 `true` 时，重定向会将新地址推入 `history` 中，而不是替换当前地址，就是通过 `history.push` 或者 `history.replace` 实现
- `from`：重定向 `from` 的路径名，简单说就是将要进入的 `url`
- `exact`：完全匹配 `from`；相当于 `Route.exact`

这个组件在一些场景中有很好的效果，比如我们登录场景，前面我们介绍过的 `Route` 组件渲染属性使用 `render` 或者 `children` 的时候，就完全可以根据判断条件执行不同的路由跳转

```html
<!-- 官网示例代码 -->
<Route exact path='/' render={()=>(
    loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)} />

<!--或者-->
<Route path='/about' children={({match})=>(
    match ? (
        <About />
    ) : (
        <User />
    )
)} />
```

前面介绍 `Switch` 组件时，有过它的身影，实际上它可以和 `Switch` 组件很好的配合，比如：

```html
<Switch>
    <Redirect from='/user' to='/about' />
    <Route path='/user' render={()=><div>User页面</div>} />
</Switch>
```
需要注意的地方：

- `from` 属性只能用于在 `Redirect` 内部渲染 `Switch` 时匹配地址
- `Redirect` 组件中 `from` 匹配的 `Route` 要在前面定义

```html
<!--错误姿势，这样是没有效果的-->
<Route path='/user' render={()=><div>User页面</div>} />
<Redirect from='/user' to='/about' />
```

#### withRouter

默认情况下，经过路由匹配的组件才拥有路由参数，我们就可以在其中使用 编程式导航，比如：

```js
this.props.history.push('/about')
```

然而，不是所有的组件都是与路由相连的，比如直接在浏览器输入地址打开的。这个时候我们访问组件 `props` 的时候，它是一个空对象，就没办法访问 `props` 中的 `history`、`match`、`location` 等对象

所以这个时候 `withRouter` 闪亮登场

`withRouter` 的用法很简单：

```html
import React, { Component } from 'react';
<!--引入-->
import { Route, Link, Switch, withRouter } from 'react-router-dom' 

class App extends Component {
    render() { 
    <!-- 没有使用 withRouter 的时候，是一个空对象-->
        console.log(this.props)
        return ( 
            <div>
                <Link to='/'>Index</Link>
                <Link to='/about'>About</Link>
                <Switch>
                    <Route path='/' exact render={()=> <div>Index页面</div>} />
                    <Route path='/about' render={()=> <div>About页面</div>} />
                </Switch>
            </div>
         );
    }
}
 
<!--执行-->
export default withRouter(App)
```
当然，还有很多种使用方式，比如通过 `withRouter` 监听 `loaction` 对象改变文档标题或者配合 `redux` 使用等等

详见 [示例demo](https://github.com/ltadpoles/example/tree/master/React/router/router-1)