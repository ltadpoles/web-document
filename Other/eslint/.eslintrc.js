/**
 * 1."off"或者0，不启用这个规则
   2."warn"或者1，出现问题会有警告
   3."error"或者2，出现问题会报错
 */
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
    rules: {
        "no-console": 2, //不允许出现console语句
        "no-debugger": 2, //不允许出现debugger语句
        "no-dupe-args": 2, //函数定义的时候不允许出现重复的参数
        "no-dupe-keys": 2, //对象中不允许出现重复的键
        "no-duplicate-case": 2, //switch语句中不允许出现重复的case标签
        "no-func-assign": 2, //不允许重新分配函数声明
        "no-obj-calls": 2, //不允许把全局对象属性当做函数来调用
        "no-sparse-arrays": 2, //数组中不允许出现空位置
        "use-isnan": 2, //要求检查NaN的时候使用isNaN()
        "no-eval": 2, //不允许使用eval()
        "no-with": 2, //不允许使用with语句
        "no-loop-func": 2, //不允许在循环语句中进行函数声明
        "no-redeclare": 2, //不允许变量重复声明
        "no-self-compare": 2, //不允许自己和自己比较
        "no-label-var": 2, //不允许标签和变量同名
        "no-undef": 2, //不允许未声明的变量
        "no-undef-init": 2, //不允许初始化变量时给变量赋值undefined
        eqeqeq: ["error", "smart"], //比较的时候使用严格等于 ===
        curly: ["error", "all"], //强制使用花括号的风格
        "no-unused-vars": [2, { vars: "all", args: "after-used" }], //不允许有声明后未使用的变量或者参数
        "new-cap": [2, { newIsCap: true, capIsNew: false }], //构造函数名字首字母要大写
        "new-parens": 2, //new时构造函数必须有小括号
        "no-lone-blocks": 2, // 禁止不必要的嵌套块
        "no-throw-literal": 2, // 禁止抛出字面量错误 throw "error"
        "no-empty": 1, //不允许出现空的代码块
        "no-multi-spaces": 1, //不允许出现多余的空格
        "no-empty-character-class": 1, //正则表达式中不允许出现空的字符组
        "no-extra-semi": 1 //不允许出现不必要的分号
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};
