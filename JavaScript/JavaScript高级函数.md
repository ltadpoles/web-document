### 惰性函数

> 当我们需要重复使用一个逻辑的时候，优化逻辑判断，提高 `JavaScript` 性能
> 原理：同名函数覆盖

```js
function createXHR() {
    var xhr
    try {
        xhr = new XMLHttpRequest()
    } catch (e) {
        handleErr(e)
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP')
        } catch (e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP')
            } catch(e) {
                xhr = null
            }
        }
    }
    return xhr
}

function handleErr(e) {
    // do sth
}
```

惰性函数修改版：
```js
function createXHR() {
    var xhr
    if(typeof XMLHttpRequest !== 'undefined') {
        xhr = new XMLHttpRequest()
    }
    createXHR = function() {
        return new XMLHttpRequest()
    } else {
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP')
            createXHR = function() {
                return new ActiveXObject('Msxml2.XMLHTTP') 
            }
        } catch(e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP')
                createXHR = function() {
                    return new ActiveXObject('Microsoft.XMLHTTP')
                }
            } catch(e) {
                createXHR = function() {
                    return null
                }
            }
        }
    }
    return xhr
}
```
通过上面修改之后，当我们在第一次调用这个函数的时候就会去判断当前的环境，进而将函数优化简写，不需要再进行后续的判断

比如，上述代码中的 `XMLHTTPRequest` 如果是存在的，那么当我们第二次调用这个函数的时候已经是这样了

```js
function createXHR() {
    return new XMLHttpRequest()
}
```
