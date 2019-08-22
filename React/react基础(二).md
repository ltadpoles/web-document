### 前言

前一篇 [React基础(一)](https://github.com/Roamen/web-document/issues/19) 简单地了解了 `React` 的一些基本知识点，怎么搭建一个简单的 `React` 项目、怎么创建 `React` 元素、组件以及怎么给项目添加样式这些基础功能。下面，在通过一些示例来了解 `React` 中的事件处理、生命周期、条件渲染等功能

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

### Round 1

首先，我们看一下怎么给元素绑定事件

> `React` 事件的命名采用小驼峰式

```js

<button onClick={ function() { console.log('事件触发了')} }>点我这里</button>

```


`onClick` 后面可以直接是一个函数或者函数名

在这里我们需要注意的是

> 在 `React` 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault`

```js
<a href="#" onClick={function(e){e.preventDefault();console.log('事件触发了')}}>
  Click me
</a>
```
在我们没有添加 `e.preventDefault()` 之前，很明显看到了页面的刷新，阻止默认行为之后就不会再出现那种情况了

`return false` 也是没有效果的

