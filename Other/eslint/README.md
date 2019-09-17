> 常见代码规范

这里是配合 `vs-code` 定制的一份常用代码规则( `vue-cli3` 同步)

使用 `Eslint`(侧重代码质量) 与 `prettier`(侧重代码格式) 让代码看起来更加优雅

找到 `package.json` 文件中的 `eslintConfig` 删掉它(当然也可以不删，我有强迫症),将 `.eslintrc.js` 文件添加到项目根目录(如果根目录有这个文件，将里面的内容覆盖掉就可以了)

主要就是为了添加这个规则，本身的校验规则在 `rules` 中添加修改就好, 完整 `Eslint`规则 参考 [这里](https://eslint.org/docs/rules/)
![原型链](https://raw.githubusercontent.com/ltadpoles/web-document/master/Other/images/lint.jpg)

接下来将 `prettier` 添加到项目的根目录中,完整 `prettier`规则 参考 [这里](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

这个时候其实是已经可以进行代码规范的校验了，我们运行 `npm run lint` 就会提示有错误的地方，并且格式化

但是存在的问题是，现在每次校验错误，都必须先运行一次 `npm run lint`，并且在 .vue 文件中不能实时显示错误或者警告，这样就很不友好

解决方法：

`Ctrl + Shift + P` 搜索 `setting` 设置选项，打开 `setting.json` 文件，在里面添加：

```js
"editor.formatOnSave": true,
"eslint.autoFixOnSave": true,
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
        "language": "vue",
        "autoFix": true
    }
]
```

这样，当我们书写完代码 只需要 `Ctrl + S` 保存一下，就可以自动格式化单个文件，并且能够实时检查 `.vue` 文件中的错误和警告

好了，开始愉快地开发！
