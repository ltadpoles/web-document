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
- `Switch` 组件中不能嵌套内置标签元素，比如 `div` `span`，但是可以嵌套组件，甚至可以添加 `path` 属性进行匹配， 实际上 `Route` 本身就是组件，但是建议还是只嵌套 `Route` 组件

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