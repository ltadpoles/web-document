
[前言](#前言)

[条件语句](#条件语句)

- [if语句](#if语句)

- [switch语句](#switch语句) 

[迭代语句](#迭代语句)

- [do-while语句](#do-while语句)

- [while语句](#while语句)

- [for语句](#for语句)

- [for-in语句](#for-in语句)

- [for-of语句](#for-of语句)

[其他](#其他)

- [break和continue语句](#break和continue语句)

- [label语句](#label语句)
 
- [with语句](#with语句) 
 
- [debugger语句](#debugger语句)
 
- [空语句](#空语句)
 
[后记](#后记)

## 前言

> `JavaScript` 区分表达式和语句。表达式是输出值的，并且可以写在任何需要一个值的地方.笼统来说，一个语句表示执行了一个动作

基本上，我们每天都在和 `JavaScript` 中的各种语句进行着 `沟通` ，那些我们经常见面的 `老朋友`，或者是未曾见面的 `新朋友` ，它们共同维护着 `JavaScript` 的流程，让我们的程序稳步运行。那么，你是否对它们足够了解呢

如果文章中有出现纰漏、错误之处，还请看到的小伙伴多多指教，先行谢过

以下↓

## 条件语句

### if语句

语法：

```js
if (condition) statement1 else statement2

   // condition 值为真或假的表达式
   // statement1 当 condition 为真时执行的语句
   // statement2 当 condition 为假时执行的语句
```

`if` 语句大概是我们接触特别多的条件语句了，根据不同的判断条件执行不同的逻辑

> 多层 `if...else` 语句可使用 `else if` 从句

```js
if (condition1)
   statement1
else if (condition2)
   statement2
...
else
   statementN
```

### switch语句

> `switch` 语句评估一个表达式，将表达式的值与 `case` 子句匹配，并执行与该情况相关联的语句

语法：

```js
switch (expression) {
  case value1:
  // 代码块
  break;
  case value2:
  // 代码块
  ...
  
  default 
  // 代码块
}
```

> `switch` 在比较值时，使用的是全等操作符 `===` ，因此不会发生类型转换

> 如果多个 `case` 与提供的值匹配，则选择匹配的第一个 `case`

> 如果没有 `case` 子句相匹配，程序则会寻找那个可选的 `default` 子句，如果找到了，将控制权交给它，执行相关语句;若没有就执行完 `switch` 语句

> 若 `break` 被省略，程序会继续执行 `switch` 语句中的下一条语句

## 迭代语句

### do-while语句

> `do-while` 是一种后测试循环语句，即只有在循环体中的代码执行之后，才会测试出口条件。换句话说，在对表达式求值之前，循环体内的代码至少会被执行一次

语法：

```js
do {
    statement
} while(expression)
```

### while语句

> `while` 语句属于前测试循环语句，即在循环体内的代码被执行之前，就会测试出口条件

语法：

```js
while(expression) statement
```

> 当测试条件一直为真的情况下，就会形成一个死循环。所以在执行阶段，我们很有必要为循环设定结束条件

### for语句

> `for` 语句也是前测试循环语句,它具有执行循环之前初始化变量和定义循环后要执行的代码的能力

示例：

```js
var count = 10;
for(var i = 1; i < count; i++){
    // 代码块
}
```

`for` 循环的执行顺序是 变量赋值==>判断条件==> (符合就执行代码块，再执行 `++` 操作) == (不符合就直接跳出循环)

> 使用 `while` 循环做不到的，使用 `for` 循环同样也做不到，`for` 循环只是把与循环有关的代码集中在了一个地方

### for-in语句

> `for-in` 语句是一种精准的迭代语句，用来枚举对象的属性

语法：

```js
for (variable in object) {...}
```

> `for...in` 循环只遍历可枚举属性

> `for..in` 循环输出的属性名的顺序是不可预测的。具体来讲，所有属性都会被返回一次，但返回的先后次序可能会因浏览器而异

> `for...in` 会遍历存在于原型对象的可枚举属性

> `for..in` 不适合遍历数组 数组的属性就是它的索引

### for-of语句

> for...of 是 `ES6` 新增的迭代方式，规定了一个数据结构只要部署了 `Symbol.iterator` 属性，就被视为具有 `iterator` 接口，就可以用 `for...of` 循环遍历它的成员,它的出现就是在一定程度上补充了 `for...in` 的不足

语法： 

```js
for (variable of object) {...}
```

具体可以 [点击这里](http://es6.ruanyifeng.com/#docs/iterator#for---of-%E5%BE%AA%E7%8E%AF)

[for...in 与 for...of 的区别](https://www.zhangxinxu.com/wordpress/2018/08/for-in-es6-for-of/)

## 其他

### break和continue语句

> `break` 和 `continue` 语句用于在循环中精确地控制代码的执行

> `break` 语句会立即退出循环，强制执行循环后面的语句；`continue` 语句虽然也是立即退出循环，但是退出循环后会从循环的底部继续执行

```js
var num = 0;
for(var i = 1; i < 10; i++) {
    if(i % 5 === 0 ) {
        break;
    }
    num++;
}

num // 4

for(var i = 1; i < 10; i++) {
    if(i % 5 === 0) {
        continue;
    }
    num++
}

num // 8
```

### label语句

> 使用 `label` 语句可以在代码中添加标签，以便将来使用

语法：

```js
label: statement
```

`label` 语句一般都会配合 `break` 和 `continue` 使用，多用于多重循环

```js
var count = 0;
loop1: 
for(var i = 0; i < 10; i++) {
    loop2:
    for(var j = 0; j < 10; j++) {
        if (i == 5 && j == 5) {
         continue loop1;
      }
      count++
    }
}

count // 95

// 不使用 label 语句的情况下会从里面的循环重新开始，使用 label 标识会从标识的循环重新开始
```

### with语句

> `with` 语句的作用是将代码的作用域设置到一个特定的对象中，主要目的是为了简化多次编写同一个对象的操作

```js
var qs = location.search.substring(1);
var hostName = location.hostname;
var url = location.href;

// 改写如下

with(location) {
    var qs = search.substring(1);
    var hostName = hostname;
    var url = href;
}

// 使用 with 语句关联了 location 对象
```

> 严格模式下不允许使用 `with` 语句

> 大量使用 `with` 语句会造成程序性能下降

### debugger语句

> `debugger` 语句，用来产生一个断点，代码的执行会停在断点的位置，这时使用调试器来输出变量的值

### 空语句

语法：

```js
;
```
一般情况下，空语句会配合 `for` 循环来使用

```js
for(;;;){
    // 产生一个死循环
}
```


## 后记

当然，在 `JavaScript` 中还有其他的一些语句，比如声明语句、复合语句等。了解它们的用法，我们就能在合适的场景去更好地使用它们，让我们的代码更加 `健壮`

如果你也是一个前端爱好者，如果你也想了解、分享更多前端的技能和有趣的东西，[点击这里](https://github.com/ltadpoles/web-document) 你将看到更多分享，欢迎 `star` 关注

期待同行

以上