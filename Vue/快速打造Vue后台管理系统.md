> [预览地址](https://vue.yddekd.com/#/)

## 前言

相信开发的小伙伴们在工作中都不可避免的接触过后台管理系统，那么，在初次接手一个后台管理系统项目的时候我们都该做些什么？考虑哪些东西呢？

本文将以 `Vue` 为切入点，结合自己工作实践，梳理了在后台管理系统中我们都应该集成或者考虑到的基础配置，希望对大家开发后台管理系统有所帮助

废话不多说，以下↓

## 项目简介

`vue-admin` 是使用 `Vite` 脚手架快速搭建，基于 `Vue` 生态系统搭建的后台管理系统模板。实现了登录、路由配置、主题配置、字体配置、国际化、axios封装等功能，它可以帮助你快速生成管理系统模板，你只需要添加具体业务代码即可

> [源码地址](https://github.com/ltadpoles/vue-admin)

### 技术栈

  [![Vue](https://img.shields.io/badge/Vue-3.5.16-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/) [![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/) [![Element Plus](https://img.shields.io/badge/Element%20Plus-2.10.1-409EFF?style=flat-square&logo=element)](https://element-plus.org/) [![Axios](https://img.shields.io/badge/Axios-1.9.0-646CFF?style=flat-square&logo=axios)](https://axios-http.com/) [![Pinia](https://img.shields.io/badge/Pinia-3.0.3-ffd859?style=flat-square&logo=pinia&logoColor=000)](https://pinia.vuejs.org/) [![Vue Router](https://img.shields.io/badge/Vue_Router-4.5.1-42b883?style=flat-square&logo=vue.js&logoColor=fff)](https://router.vuejs.org/)

### 基础功能

- [x] 登录/注销功能
- [x] 路由懒加载
- [x] 动态面包屑
- [x] 组件缓存/tab页
- [x] 全屏/字体大小/主题/国际化
- [x] 常用组件封装

### 目录结构

```
vue-admin/
├── public/                 # 静态资源目录
│   └── logo.svg           # 项目Logo
├── src/                   # 源码目录
│   ├── api/              # API接口
│   ├── assets/           # 资源文件
│   │   ├── images/       # 图片资源
│   │   ├── styles/       # 全局样式
│   │   └── svg/          # SVG图标
│   ├── components/       # 公共组件
│   │   ├── dialog/       # 对话框组件
│   │   ├── drawer/       # 抽屉组件
│   │   └── svgIcon/      # SVG图标组件
│   ├── config/           # 配置文件
│   │   └── index.js      # 全局配置
│   ├── hooks/            # 自定义Hooks
│   │   └── useCommon.js  # 通用Hooks
│   ├── i18n/             # 国际化配置
│   │   ├── en.js         # 英文语言包
│   │   ├── zhCN.js       # 中文语言包
│   │   └── index.js      # 国际化配置
│   ├── layout/           # 布局组件
│   │   ├── components/   # 布局子组件
│   │   │   ├── header/   # 头部组件
│   │   │   ├── sidebar/  # 侧边栏组件
│   │   │   ├── tags/     # 标签栏组件
│   │   │   └── footer/   # 底部组件
│   │   └── index.vue     # 主布局组件
│   ├── router/           # 路由配置
│   │   ├── modules/      # 路由模块
│   │   ├── index.js      # 路由主文件
│   │   ├── static.js     # 静态路由
│   │   └── utils.js      # 路由工具
│   ├── stores/           # 状态管理
│   │   ├── modules/      # 状态模块
│   │   │   ├── user.js   # 用户状态
│   │   │   ├── setting.js # 系统设置
│   │   │   └── tag.js    # 标签状态
│   │   ├── index.js      # Store主文件
│   │   └── reset.js      # 状态重置
│   ├── utils/            # 工具函数
│   │   ├── http/         # HTTP请求封装
│   │   ├── index.js      # 通用工具
│   │   └── theme.js      # 主题工具
│   ├── views/            # 页面组件
│   │   ├── dashboard/    # 仪表盘
│   │   ├── components/   # 功能组件页面
│   │   ├── system/       # 系统管理
│   │   ├── login/        # 登录页面
│   │   ├── error/        # 错误页面
│   │   └── about/        # 关于页面
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── index.html            # HTML模板
├── vite.config.js        # Vite配置
├── eslint.config.js      # ESLint配置
├── package.json          # 项目依赖
└── README.md             # 项目说明
```

## 项目解析

### 路由

> 基于 `vue-router@4.5.1`

在后台管理系统类型的项目中，路由是我认为很重要的功能点

此项目路由模块分为静态路由和动态路由，静态路由通过 `staticRoute` 提前注册，动态路由配合 `Vite` 自动注册

```js
// 获取前端注册所有动态路由
const modules = import.meta.glob('./modules/*.js', { eager: true })
const routes = []
for (const path in modules) {
  routes.push(...modules[path].default)
}
```

路由模式采用 `hash` 模式，也就是我们常见的 `#` 的模式，当然也可以换成 `HTML5` 模式，两者在部署阶段有所不同。官方还提供了另外一种 `Memory` 模式，适用于 `Node` 和 `SSR`，作为一个后台管理系统，基本不用考虑这些，感兴趣的可以点击 [这里](https://router.vuejs.org/zh/guide/essentials/history-mode.html#Memory-%E6%A8%A1%E5%BC%8F)

接下来，就是路由跳转的逻辑了，这部分逻辑主要在 `beforeEach` 中完成

1. 首先，判断跳转的页面是不是登录页，如果本地存在 `token`，那么不能跳转停留在当前页面，如果没有 `token`，那么直接跳转
2. 如果跳转的页面是白名单页面，直接跳转
3. 判断本地没有 `token`，携带当前路径跳转到登录页
4. 判断用户信息和菜单，如果不存在的话请求接口获取
5. 设置动态路由，添加控制是否使用动态路由，添加默认通配路由，跳转 `404`
6. 不符合以上所有条件，直接跳转

路由的设计，其实只要思路没有问题，代码实现还是很简单的

### http请求

`http` 请求基于 `axios` 封装

```js
const http = axios.create({
  timeout: 3000,
  baseURL: config.HTTPBASEURL
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    const token = 'Bearer ' + userStore.token.token

    // 添加 header 请求头
    if (token) {
      config.headers.Authorization = token
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code !== '0') {
      ElMessage({
        message: response.data.msg || '操作失败',
        type: 'error'
      })
      return Promise.reject(response.data.msg || '操作失败')
    }
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    try {
      switch (error.response.status) {
        case 400:
          ElMessage({
            message: error.response.data.msg || '请求错误',
            type: 'error'
          })
          return Promise.reject(error.response.data.msg || '请求错误')
        case 401:
          if (config.ISREFRESHTOKEN) {
            refresh(http, error.response.config)
          } else {
            ElMessage({
              message: '登录已过期，请重新登录',
              type: 'error'
            })
            RESETSTORE()
            router.replace(config.LOGIN_URL)
          }
          break
        case 403:
          ElMessage({
            message: '您没有相关权限',
            type: 'error'
          })
          return Promise.reject('您没有相关权限')
        case 404:
          ElMessage({
            message: '请求链接不存在',
            type: 'error'
          })
          return Promise.reject('请求链接不存在')
        case 500:
          ElMessage({
            message: '服务器错误，请稍后再试',
            type: 'error'
          })
          return Promise.reject('服务器错误，请稍后再试')
        default:
          ElMessage({
            message: '系统异常，请稍后再试',
            type: 'error'
          })
          return Promise.reject('系统异常，请稍后再试')
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
)

export default http
```

请求中集成刷新接口功能，一般情况下如果有刷新接口的操作，后端会返回一个 `refresh_token` 来获取新的 `token`，具体实现逻辑可以参考 [refresh_token.js](https://github.com/ltadpoles/vue-admin/blob/main/src/utils/http/refresh-token.js) 文件

### SVG

关于 SVG 在 Vue 项目中的使用方式，网上有很多种方案，感兴趣的小伙伴可以 [参考这里](https://juejin.cn/post/6844903998563024910)，这里主要还是介绍此项目采用的方式，为什么最终会采用 `vite-plugin-svg-icons` 插件的方式呢，一个是因为 `Vite` 集成很方便，第二个也是最重要的一点： `UI` 都有自己的想法~

[官方文档](https://github.com/vbenjs/vite-plugin-svg-icons)

使用方式也很简单，主要的步骤就以下几步：

- Vite 插件配置

```js
createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')], // icon 图标位置
    symbolId: 'icon-[dir]-[name]'
})
```

- main.js 引入

```js
import 'virtual:svg-icons-register'
import svgIcon from './components/svgIcon/index.vue'
```

`svgIcon` 为封装的一个 `svg` 组件，使用方式

```html
// name 就是icon的名称
<SvgIcon name="message" />
```

### 国际化

国际化使用 `vue-i18n` ，主要针对菜单等固定配置

主要的配置就这些，导出的 `i18n` 在main.js中使用即可

```js
const messages = {
  zhCN: {
    ...localZhCN,
    ...zhCN
  },
  en: {
    ...localEn,
    ...en
  }
}

const i18n = createI18n({
  locale: 'zhCN', // 设置当前语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages
})
```

模板字符串中的使用方式 `$t('messages.themeColor')`，路由采用了 `i18nName` 字段提前配置的方式，动态渲染

### Menu菜单

因为模板项目是单纯的前端项目，所以菜单数据全是本地预定义的，数据结构也是标准的 `JSON` 结构，后续接入后端数据也非常容易兼容，配合路由模块的动态加载，也很容易实现动态菜单功能

菜单支持多级渲染，只需要有一点需要注意， **组件中引用自身需要通过组件名称**

```html
<menu-tree :menu="item.children" />

defineOptions({
  name: 'menuTree'
})
```

### 主题配置

主题配置主要通过动态计算主题色之后的色调，主要通过此方法获取颜色变量覆盖 `Element` 样式

```js
setPrimaryColor(color = this.primaryColor) {
  this.primaryColor = color
  const el = document.documentElement
  // 获取 css 变量
  getComputedStyle(el).getPropertyValue('--el-color-primary')
  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color)

  // 获取其他色调的颜色
  for (let i = 1; i <= 9; i++) {
    el.style.setProperty(`--el-color-primary-light-${i}`, lighten(color, i / 10))
    el.style.setProperty(`--el-color-primary-dark-${i}`, darken(color, i / 10))
  }
}
```

### 深色模式

深色模式的实现，`Element` 已经提供了很简单的方式，就是添加 `dark` 类名，说到底就是样式覆盖

观察过 `Element` 官网的小伙伴可能会发现他的深色模式有一个好玩的动画，那么这个是怎么实现的呢？

主要就是通过 `CSS` 的 `clip-path`，具体文档可以参考 [这里](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)

实现代码：

```js
const darkClick = e => {
  const transition = document.startViewTransition(() => {
    document.documentElement.classList.toggle('dark')
  })
  transition.ready.then(() => {
    const { clientX, clientY } = e
    const radius = Math.hypot(Math.max(clientX, innerWidth - clientX), Math.max(clientY, innerHeight - clientY))
    const clipPath = [`circle(0% at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`]
    const isDark = document.documentElement.classList.contains('dark')
    document.documentElement.animate(
      {
        clipPath: !isDark ? clipPath.reverse() : clipPath
      },
      {
        duration: 500,
        pseudoElement: !isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
      }
    )
  })
}
```

```css
::view-transition-new(root),
::view-transition-old(root) {
  /* 关闭默认动画，否则影响自定义动画的执行 */
  animation: none;
}

::view-transition-old(root) {
  z-index: 1;
}

.dark::view-transition-new(root) {
  z-index: 100;
}
```

### Tag标签

项目使用 `keep-alive` 动态缓存路由，通过维护 include 数组实现页面的动态缓存，需要注意的是，**如果是需要缓存的组件，那么必须设置它的组件名称**

组件切换的这个 tag 标签，着实费了我不少的脑细胞，主要是路由定位和一些边界情况的判定，感兴趣的可以直接 [点击这里](https://github.com/ltadpoles/vue-admin/blob/main/src/layout/components/tags/index.vue) 查看组件

## 其他

项目中也集成了比较常用的一些功能，比如 `Echarts`、图片裁剪、全屏、文字大小、二维码功能、视频播放、富文本/`markdown`编辑器、地图、`pdf` 展示等

### Echarts

`Echarts` 功能没有什么可说的，官方文档都标注的很清楚。

视口变化的时候，我们需要动态调整 `Echarts` 的渲染，可以注册 `resize` 事件

```js
window.addEventListener('resize', chartResize)

const chartResize = () => {
  chartRef && chartRef.resize({ animation: { duration: 200 } })
}
```

一般情况下，我们的窗口大小不会发生变化，主要是侧边栏收起和展开导致的，我们只需要给这个 `resize` 事件添加一个延迟触发就可以了

```js
timer = setTimeout(() => {
  chartResize()
}, 300)
```

别忘了在组件卸载的时候清除这个定时器

### 地图

地图使用的是高德 `Api`，主要是使用方式的变化，推荐的使用方式：**代理服务器转发**

使用方式也很简单：

```html
<div id="container"></div>
<script type="text/javascript">
  window._AMapSecurityConfig = {
    serviceHost: "你的代理服务器域名或地址/_AMapService",
    //例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
  };
</script>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=2.0&key=你申请的key值"
></script>
<script type="text/javascript">
  //地图初始化应该在地图容器div已经添加到DOM树之后
  var map = new AMap.Map("container", {
    zoom: 12,
  });
</script>
```

`ng` 代理配置

```js
server {
  listen       80;             #nginx端口设置，可按实际端口修改
  server_name  127.0.0.1;      #nginx server_name 对应进行配置，可按实际添加或修改
  # 自定义地图如果没有使用到相关功能可以不设置，但是如果需要设置顺序要与示例一致
  # 自定义地图服务代理
  location /_AMapService/v4/map/styles {
    set $args "$args&jscode=你的安全密钥";
    proxy_pass https://webapi.amap.com/v4/map/styles;
  }
  # Web服务API 代理
  location /_AMapService/ {
    set $args "$args&jscode=你的安全密钥";
    proxy_pass https://restapi.amap.com/;
  }
}
```

本地开发也完全可以使用这种方式，防止和生产环境造成差异

### 代码风格

代码风格统一主要使用的是 `eslint` 配合 `prettierrc`

`eslint` 自从升级到 `9` 版本之后，使用方式发生了很大的变化，不过规则方面完全可以沿用之前的，具体的配置规则 [参考这里](https://github.com/ltadpoles/vue-admin/blob/main/eslint.config.js)，大家完全可以修改自己项目的适用规则

### 项目优化

项目优化这一块主要是首屏的加载、路由懒加载、打包优化

首屏主要就是创建一个加载动画，提升用户的体验

路由懒加载方面直接使用 `import` 的方式导入组件

```js
component: () => import('@/layout/index.vue')
```

打包优化主要有模块分包以及资源压缩，资源压缩主要使用 `vite-plugin-compression` 插件，配置如下：

```js
viteCompression({
    filter: /\.(js|css|json|svg|ico|png|jpg|jpeg|gif|webp)$/i, // 排除HTML文件
    verbose: true,
    disable: false,
    threshold: 1024,
    algorithm: 'gzip',
    deleteOriginFile: true
})
```

具体配置参考 [这里](https://github.com/ltadpoles/vue-admin/blob/main/vite.config.js)

## 最后

暂时能想到的就这么多了，还有很多细节可能也没有涉及到，感兴趣的小伙伴可以 [点击这里](https://github.com/ltadpoles/vue-admin) 查看源码

如果觉得不错或者对你有些许的帮助，欢迎 `star`，或者你有更好的实现方式、有趣的 `idea`，也欢迎留言交流