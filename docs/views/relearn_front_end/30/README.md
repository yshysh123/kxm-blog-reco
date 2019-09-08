---
title: JavaScript语法的基本规则（三十）
date: 2019-06-08
tags:
 - JavaScript
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/29/
next: /views/relearn_front_end/31/
---

## 一、脚本和模块

> JavaScript 有两种源文件，一种叫做脚本，一种叫做模块。在 ES5 和之前的版本中，就只有一种源文件类型（就只有脚本），ES6 引入了模块机制。

### 1.1、区别

1、**脚本**：是可以由浏览器或者 node 环境引入执行的；**模块**：只能由 JavaScript 代码用 import 引入执行。

2、从概念上，**脚本**：具有主动性的 JavaScript 代码段，是控制宿主完成一定任务的代码；**模块**：是被动性的 JavaScript 代码段，是等待被调用的库。

3、如果要引入模块，必须给 script 标签添加 `type="module"`。如果引入脚本，则不需要 type。

```js
<script type="module" src="xxx.js"></script>
```

![JavaScript程序](https://static001.geekbang.org/resource/image/43/44/43fdb35c0300e73bb19c143431f50a44.jpg)

### 1.2、import 声明

> import 声明有两种用法，一个是直接 import 一个模块，另一个是带 from 的 import，它能引入模块里的一些信息。

```js
import "mod"; // 引入一个模块
import v from "mod";  // 把模块默认的导出值放入变量 v
```

1、带 from 的 import 细分有三种用法

- `import x from "./a.js"` 引入模块中导出的默认值。
- `import {a as x, modify} from "./a.js";` 引入模块中的变量。
- `import * as x from "./a.js"` 把模块中所有的变量以类似对象属性的方式引入。

第一种方式可以跟后两种组合使用。

- `import d, {a as x, modify} from "./a.js"`
- `import d, * as x from "./a.js"`

2、例子

> 假设有两个模块 a 和 b。我们在模块 a 中声明了变量和一个修改变量的函数，并且把它们导出。用 b 模块导入了变量和修改变量的函数。

**模块 a**：

```js
export var a = 1;

export function modify(){
    a = 2;
}
```

**模块 b**：

```js
import {a, modify} from "./a.js";

console.log(a); // 1

modify();

console.log(a); // 2
```

### 1.3、export 声明

> 与 import 相对，export 声明承担的是导出的任务。模块中导出变量的方式有两种，一种是独立使用 export 声明，另一种是直接在声明型语句前添加 export 关键字。

1、独立使用 export 声明

> 一个 export 关键字加上变量名列表.

```js
export {a, b, c};
```

2、export 可以加在任何声明性质的语句之前

- var
- function (含 async 和 generator)
- class
- let
- const

3、export default 表示导出一个默认变量值，它可以用于 function 和 class。这里导出的变量是没有名称的，可以使用 `import x from "./a.js"` 这样的语法，在模块中引入。

4、export default 还支持一种语法，后面跟一个表达式

```js
// 注意：a 的变化与导出的值就无关，修改变量 a，不会使得其他模块中引入的 default 值发生改变。
var a = {};
export default a;
```

5、在 import 语句前无法加入 export，但是可以直接使用 export from 语法。

```js
export a from "a.js"
```

## 二、函数体

> **执行函数的行为**通常是：在 JavaScript 代码执行时，注册宿主环境的某些事件触发的，**执行的过程**：就是执行函数体（函数的花括号中间的部分）。**函数体**：其实也是一个语句的列表。跟脚本和模块比起来，函数体中的语句列表中多了 return 语句可以用。

### 2.1、普通函数体

```js
function foo(){
    //Function body
}
```

### 2.2、异步函数体

```js
async function foo(){
    //Function body
}
```

### 2.3、生成器函数体

```js
function *foo(){
    //Function body
}
```

### 2.4、异步生成器函数体

```js
async function *foo(){
    //Function body
}
```

### 2.5、上面四种函数体的区别

> 区别在于：能否使用 await 或者 yield 语句。

![区别](https://static001.geekbang.org/resource/image/0b/50/0b24e78625beb70e3346aad1e8cfff50.jpg)

## 三、预处理

> JavaScript 执行前，会对脚本、模块和函数体中的语句进行预处理。预处理过程将会提前处理 var、函数声明、class、const 和 let 这些语句，以确定其中变量的意义。

### 3.1、var 声明

> var 声明永远作用于脚本、模块和函数体这个级别，在预处理阶段，不关心赋值的部分，只管在当前作用域声明这个变量。

#### 3.1.1、例子一

```js
var a = 1;

function foo() {
    console.log(a);
    var a = 2;
}

foo(); // undefined
```

**预处理过程在执行之前**，所以有函数体级的变量 a，就不会去访问外层作用域中的变量 a 了，而函数体级的变量 a 此时还没有赋值，所以是 undefined。

#### 3.1.2、例子二

```js
var a = 1;

function foo() {
    console.log(a);
    if(false) {
        var a = 2;
    }
}

foo(); // undefined
```

首先 if(false) 中的代码永远不会被执行，但是预处理阶段并不管这个，var 的作用能够穿透一切语句结构，它只认脚本、模块和函数体三种语法结构。

#### 3.1.3、例子三

```js
var a = 1;

function foo() {
    var o= {a:3}
    with(o) {
        var a = 2;
    }
    console.log(o.a);
    console.log(a);
}

foo(); // 2  undefine
```

#### 3.1.4、例子四

> 早年 JavaScript 没有 let 和 const，只能用 var，而 var 除了脚本和函数体都会穿透，可用`立即执行的函数表达式（IIFE）`来产生作用域。

```js
for(var i = 0; i < 20; i ++) {
    void function(i){
        var div = document.createElement("div");
        div.innerHTML = i;
        div.onclick = function(){
            console.log(i);
        }
        document.body.appendChild(div);
    }(i);
}
// 点击div对应的序号

for(var i = 0; i < 20; i ++) {
    var div = document.createElement("div");
    div.innerHTML = i;
    div.onclick = function(){
        console.log(i);
    }
    document.body.appendChild(div);
}
// 点击div全是20
```

### 3.2、function 声明

> 在全局（脚本、模块和函数体），function 声明表现跟 var 相似，不同之处在于，function 声明不但在作用域中加入变量，还会给它赋值。

#### 3.2.1、例子一

```js
console.log(foo);
function foo(){

}

// ƒ foo(){}
```

#### 3.2.2、例子二

```js
console.log(foo);
if(true) {
    function foo(){

    }
}
// undefined
```

### 3.3、class 声明

> class 声明在全局的行为跟 function 和 var 都不一样。

#### 3.3.1、例子一

```js
console.log(c);
class c{

}
// 报错
```

#### 3.3.2、例子二

```js
var c = 1;
function foo(){
    console.log(c);
    class c {}
}
foo();

// 还是报错，这说明，class 声明也是会被预处理的，它会在作用域中创建变量，并且要求访问它时抛出错误。
```

## 四、指令序言机制

> 脚本和模块都支持一种特别的语法，叫做`指令序言（Directive Prologs）`。最早是为了 use strict 设计的，它规定了一种给 JavaScript 代码添加元信息的方式。

```js
"use strict"; // 单引号也不影响它是指令序言。
function f(){
    console.log(this);
};
"use strict"; // 没有出现在最前，所以不是指令序言。
f.call(null);

// null
```
