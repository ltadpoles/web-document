<html>
<h2>目录</h2>
</html>

[HTML部分](#html)

&emsp;[1. Doctype作用，HTML5 为什么只需要写`<!DOCTYPE HTML>`](#l1)

&emsp;[2. 行内元素有哪些，块级元素有哪些，空(void)元素有那些](#l2)

&emsp;[3. 简述一下你对HTML语义化的理解](#l3)

&emsp;[4. 常见的浏览器内核有哪些，介绍一下你对浏览器内核的理解](#l4)

&emsp;[5. html5有哪些新特性](#l5)

&emsp;[6. 描述一下 cookies，sessionStorage 和 localStorage 的区别](#l6)

&emsp;[7. 如何实现浏览器内多个标签页之间的通信](#l7)

&emsp;[8. HTML5的离线存储怎么使用，解释一下工作原理](#l8)

&emsp;[9. src与href的区别](#l9)

&emsp;[10. 表单提交中Get和Post方式的区别](#l10)

[CSS部分](#css)

&emsp;[1. css盒子模型，box-sizing属性的理解](#c1)

&emsp;[2. 清除浮动，什么时候需要清除浮动，清除浮动都有哪些方法](#c2)

&emsp;[3. 如何让一个不定宽高的盒子水平垂直居中](#c3)

&emsp;[4. px和em和rem的区别](#c4)

&emsp;[5. position的值有哪些](#c5)

&emsp;[6. display:none与visibility：hidden的区别](#c6)

&emsp;[7. CSS中link 和@import的区别](#c7)

&emsp;[8. 什么是响应式设计，响应式设计的基本原理是什么](#c8)

&emsp;[9. 为什么要初始化CSS样式](#c9)

&emsp;[10. CSS3有哪些新特性](#c10)

&emsp;[11. ::before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用](#c11)

&emsp;[12. CSS优化、提高性能的方法有哪些](#c12)

&emsp;[13. 重绘和回流，浏览器是怎样解析CSS的](#c13)

&emsp;[14. flex布局css预处理器](#c14)

&emsp;[15. css预处理器](#c15)

<h3 id='start'>前言</h3>

貌似又到了一年一度跑路跳槽的时刻，由于个人的一些原因最近也参加了很多面试，发现有很多基础性的东西掌握程度还是不够，故此想总结一下最近面试遇到的问题以及个人认为比较重要的东西，留给自己消化，也分享给有需要的小伙伴

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

好了，废话不多说，以下 ↓

### HTML

<h5 id='l1'>1. Doctype作用，HTML5 为什么只需要写 <!DOCTYPE HTML></h5>

> doctype是一种标准通用标记语言的文档类型声明，目的是告诉标准通用标记语言解析器要使用什么样的文档类型定义（DTD）来解析文档.`<!DOCTYPE>`声明必须是HTML文档的第一行，位于html标签之前

> HTML5不基于SGML，所以不需要引用DTD。在HTML5中<!DOCTYPE>只有一种

> SGML: 标准通用标记语言,是现时常用的超文本格式的最高层次标准

<h5 id='l2'>2. 行内元素有哪些，块级元素有哪些，空(void)元素有那些</h5>

行内元素：`a` `span` `i` `img` `input` `select` `b` 等

块级元素：`div` `ul` `ol` `li` `h1~h6` `p` `table` 等

空元素：`br` `hr` `link` 等

<h5 id='l3'>3. 简述一下你对HTML语义化的理解</h5>

简单来说，就是合适的标签做合适的事情，这样具有以下好处：
- 有助于构架良好的HTML结构，有利于搜索引擎的建立索引、抓取，利于SEO
- 有利于不同设备的解析
- 有利于构建清晰的机构，有利于团队的开发、维护

<h5 id='l4'>4. 常见的浏览器内核有哪些，介绍一下你对浏览器内核的理解</h5>

> Trident内核：IE

> Gecko内核：NETSCAPE6及以上版本，火狐

> Presto内核：Opera7及以上。[Opera内核原为：Presto，现为：Blink;]

> Webkit内核：Safari，Chrome等。[Chrome的：Blink（WebKit的分支）] 

浏览器内核又可以分成两部分：**渲染引擎和JS引擎。** 渲染引擎主要负责取得网页的内容、整理讯息、计算网页的显示方式等，JS引擎则是解析Javascript语言，执行javascript语言来实现网页的动态效果。

<h5 id='l5'>5. html5有哪些新特性</h5>

- 语义化标签: `header` `footer` `nav` `section` `article` `aside` 等
- 增强型表单：`date`(从一个日期选择器选择一个日期) `email`(包含 e-mail 地址的输入域) `number`(数值的输入域) `range`(一定范围内数字值的输入域) `search`(用于搜索域) `tel`(定义输入电话号码字段) 等
- 视频和音频：`audio` `video`
- Canvas绘图 SVG绘图
- 地理定位：`Geolocation`
- 拖放API：`drag`
- web worker：是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能
- web storage: `localStorage` `sessionStorage` 
- WebSocket: HTML5开始提供的一种在单个 TCP 连接上进行全双工通讯的协议

<h5 id='l6'>6. 描述一下 cookie，sessionStorage 和 localStorage 的区别</h5>

<table>
   <tr>
        <th width=20%>特性</th>
        <th width=25% style="text-align:center">Cookie</th>
        <th widht=25% style="text-align:center">localStorage</th>
        <th widht=25% style="text-align:center">sessionStorage</th>
   </tr>
   <tr>
        <td >生命周期</td>
        <td>可设置失效时间，没有设置的话，默认是关闭浏览器后失效</td>
        <td>除非被手动清除，否则将会永久保存</td>
        <td>仅在当前网页会话下有效，关闭页面或浏览器后就会被清除</td>
   </tr>
   <tr>
        <td>存放数据大小</td>
        <td>4KB左右</td>
        <td colspan=2 align=center>可以保存5MB的信息</td>
   </tr>
   <tr>
        <td rowspan=3>http请求</td>
        <td>每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题</td>
        <td colspan=2>仅在客户端（即浏览器）中保存，不参与和服务器的通信</td>
   </tr>
</table>


<h5 id='l7'>7. 如何实现浏览器内多个标签页之间的通信</h5>

- 使用localStorage: `localStorage.setItem(key,value)`、`localStorage.getItem(key)`
- websocket协议
- webworker

[多个标签页之间的通信](https://juejin.im/post/5acdba01f265da23826e5633)

<h5 id='l8'>8. HTML5的离线存储怎么使用，解释一下工作原理</h5>

[HTML5的离线存储](https://segmentfault.com/a/1190000006984353)

<h5 id='l9'>9. src与href的区别</h5>

区别：src用于替代这个元素，而href用于建立这个标签与外部资源之间的关系

`<link href="style.css" rel="stylesheet" />`浏览器加载到这里的时候，html的渲染和解析不会暂停，css文件的加载是同时进行的

`<script src="script.js"></script>`当浏览器解析到这句代码时，页面的加载和解析都会暂停直到浏览器拿到并执行完这个js文件

<h5 id='l10'>10. 表单提交中Get和Post方式的区别</h5>

- Get一般用于从服务器上获取数据，Post向服务器传送数据
- Get传输的数据是拼接在Url之后的，对用户是可见的；Post的传输数据对用户是不可见的
- Get传送的数据量较小，不能大于2KB。Post传送的数据量较大，一般被默认为不受限制
- Get安全性非常低，Post安全性较高
- 在FORM提交的时候，如果不指定Method，则默认为Get请求

### CSS

<h5 id='c1'>1. css盒子模型，box-sizing属性的理解</h5>

css的盒模型由content(内容)、padding(内边距)、border(边框)、margin(外边距)组成。但盒子的大小由content+padding+border这几部分决定

box-sizing是一个CSS3属性，与盒子模型有着密切联系。即决定元素的宽高如何计算，box-sizing有三个属性：
```css
box-sizing: content-box|border-box|inherit:
```
- content-box 使得元素的宽高即为内容区的宽高(默认模式)
- border-box: 计算方式content + padding + border = 本身元素大小，即缩小了content大小
- inherit 指定box-sizing属性的值，应该从父元素继承

<h5 id='c2'>2. 清除浮动，什么时候需要清除浮动，清除浮动都有哪些方法</h5>

浮动的元素是脱离文档标准流的，如果我们不清楚浮动，那么就会造成**父元素高度塌陷**，影响页面布局。

清除浮动的方式：
- 为父元素设置高度
- 为父元素添加`overflow:hidden`
- 伪元素
```css
.fix::after { 
     content:""; 
     display:block; 
     clear:both;
}
```
使用伪元素的好处：不增加冗余的DOM节点，符合语义化

> overflow:hidden可以触发BFC机制。BFC：块级格式化上下文，创建了 BFC的元素就是一个独立的盒子，它规定了内部如何布局，并且与这个独立盒子里的布局不受外部影响，当然它也不会影响到外面的元素，**计算BFC的高度时，浮动元素也参与计算**


<h5 id='c3'>3. 如何让一个不定宽高的盒子水平垂直居中</h5>

> 定位的方式

```css 
.father {
    position: relative;
}
.son {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
```
> css3属性

```css
.father {
    position: relative;
}
.son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
> flex布局

```css
.father {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

<h5 id='c4'>4. px和em和rem的区别</h5>

> `px`: 像素，相对长度单位。像素`px`是相对于显示器屏幕分辨率而言的

> `em`的值并不是固定的，会继承父级元素的字体大小，代表倍数

> `rem`的值并不是固定的，始终是基于根元素 `<html>` 的，也代表倍数

<h5 id='c5'>5. position的值有哪些</h5>

> static： 默认值。没有定位，元素出现在正常的流中

> relative（相对定位）：生成相对定位的元素,相对于其正常（原先本身）位置进行定位

> absolute（绝对定位）：生成绝对定位的元素，相对于static定位以外的第一个父元素进行定位

> fixed（固定定位）：生成绝对定位的元素，相对于浏览器窗口进行定位

<h5 id='c6'>6. display:none与visibility：hidden的区别</h5>

区别 | display:none | visibility：hidden的
---|---|---
是否占据空间 | 不占据任何空间，在文档渲染时，该元素如同不存在（但依然存在文档对象模型树中）| 该元素空间依旧存在
是否渲染 | 会触发reflow（回流），进行渲染 | 只会触发repaint（重绘），因为没有发现位置变化，不进行渲染
是否是继承属性 | 不是继承属性，元素及其子元素都会消失 | 是继承属性，若子元素使用了visibility:visible，则不继承，这个子孙元素又会显现出

<h5 id='c7'>7. CSS中link 和@import的区别</h5>

> link属于XHTML标签，@import完全是CSS提供的一种方式,只能加载CSS

> 加载顺序的差别，当一个页面被加载的时候，link引用的CSS会同时被加载，而@import引用的CSS 会等到页面全部被下载完再被加载

> 兼容性的差别。由于@import是CSS2.1提出的所以老的浏览器不支持，而link标签无此问题

> 当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的

<h5 id='c8'>8. 什么是响应式设计，响应式设计的基本原理是什么</h5>

> 响应式网站设计是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理

<h5 id='c9'>9. 为什么要初始化CSS样式</h5>

> 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异

> 初始化样式会对 SEO 有一定的影响

<h5 id='c10'>10. CSS3有哪些新特性</h5>

- 实现圆角`border-radius`，阴影`box-shadow`，边框图片`border-image`
- 对文字加特效`text-shadow`，强制文本换行`word-wrap`，线性渐变`linear-gradient`
- 实现旋转`transform:rotate(90deg)`,缩放`scale(0.85,0.90)`,`translate(0px,-30px)`定位,倾斜`skew(-9deg,0deg)`;
- 增加了更多的CSS选择器、多背景、`rgba()`
- 唯一引入的伪元素是`::selection`；
- 实现媒体查询`@media`，多栏布局`flex`
- 过渡`transition` 动画`animation`

<h5 id='c11'>11. ::before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用</h5>

> 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。（伪元素由双冒号和伪元素名称组成）,双冒号是在当前规范中引入的，用于区分伪类和伪元素

<h5 id='c12'>12. CSS优化、提高性能的方法有哪些</h5>

- 移除空的css规则（Remove empty rules）
- 正确使用display的属性
- 不滥用浮动、web字体
- 不声明过多的font-size
- 不在选择符中使用ID标识符
- 遵守盒模型规则
- 尽量减少页面重排、重绘
- 抽象提取公共样式，减少代码量

<h5 id='c13'>13. 重绘和回流</h5>

[重绘和回流](https://juejin.im/post/5a9923e9518825558251c96a)

<h5 id='c14'>14. flex布局</h5>

[flex布局教程--阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

<h5 id='c15'>15. css预处理器</h5>

提供了一种css的书写方式，常见的就是 [SAAS文档](http://sass.bootcss.com/docs/sass-reference/) 和 [LESS文档](https://less.bootcss.com/)