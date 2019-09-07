---
prev: /views/relearn_front_end/17/
next: /views/relearn_front_end/19/
---
# JavaScript的闭包和执行上下文（十八）

## 一、函数执行过程相关知识

![函数执行过程](https://static001.geekbang.org/resource/image/68/52/68f50c00d475a7d6d8c7eef6a91b2152.png)

## 二、闭包（closure）

> 闭包其实只是一个`绑定了执行环境`的函数，闭包与普通函数的区别是，它携带了执行的环境，就像人在外星中需要自带吸氧的装备一样，这个函数也带有在程序中生存的环境。

### 2.1、古典的闭包

- 环境部分
  + 环境
  + 标识符列表
- 表达式部分

### 2.2、`JavaScript` 中闭包

- 环境部分
  + 环境：函数的词法环境（执行上下文的一部分）
  + 标识符列表：函数中用到的未申明的变量
- 表达式部分：函数体

## 三、执行上下文（执行的基础设施）

> 定义：`JavaScript` 标准把一段代码（包括函数），执行所需的所有信息定义为执行上下文。

### 3.1、在 `ES3` 中

- `scope`：作用域，也常常被叫做作用域链
- `variable object`：变量对象，用于存储变量的对象
- `this value`：this 值

### 3.2、在 `ES5` 中

- `lexical environment`：词法环境，当获取变量时使用
- `variable environment`：变量环境，当声明变量时使用
- `this value`：this 值

### 3.3、在 `ES2018` 中

- `lexical environment`：词法环境，当获取变量或者 `this` 值时使用
- `variable environment`：变量环境，当声明变量时使用
- `code evaluation state`：用于恢复代码执行位置
- `Function`：执行的任务是函数时使用，表示正在被执行的函数
- `ScriptOrModule`：执行的任务是脚本或者模块时使用，表示正在被执行的代码
- `Realm`：使用的基础库和内置对象实例
- `Generator`：仅生成器上下文有这个属性，表示当前生成器

### 3.4、函数执行过程所需信息

```js
var b = {}
let c = 1
this.a = 2;
```

正确执行上面代码需知道的信息：

- 1、`var` 把 `b` 声明到哪里
- 2、`b` 表示哪个变量
- 3、`b` 的原型是哪个对象
- 4、`let` 把 `c` 声明到哪里
- 5、`this` 指向哪个对象

而这些信息就是执行上下文给出来的，下面用 `var` 声明与赋值，`let`，`realm`分析执行上下文提供的信息。

### 3.5、var 申明与赋值

1、立即执行的函数表达式（[IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)），通过创建一个函数，并且立即执行，来构造一个新的域，从而控制 `var` 的范围。

```js
var b = 1
```

2、加括号让函数变成函数表达式

```js
(function(){
    var a;
    //code
}());


(function(){
    var a;
    //code
})();
```

**注意**：括号有个缺点，那就是如果上一行代码不写分号，括号会被解释为上一行代码最末的函数调用。

一些不加分号的代码风格规范，会要求在括号前面加上分号。

```js
;(function(){
    var a;
    //code
}())


;(function(){
    var a;
    //code
})()
```

`winter` 推荐用 `void` 关键字，语义上 `void` 运算表示忽略后面表达式的值，变成 `undefined`。

```js
void function(){
    var a;
    //code
}();
```

**特别注意**：`var` 的特性会导致声明的变量和被赋值的变量是两个 `b`，`JavaScript` 中有特例，那就是使用 `with` 的时候，如代码块二，我们先讲一下代码一

> `with` 语句的原本用意是为逐级的对象访问提供命名空间式的速写方式. 也就是在指定的代码区域, 直接通过节点名称调用对象。

```js
// 代码块一
var obj = {
    a: 1,
    b: 2,
    c: 3
};

// 比如要改对应的值，一般的写法是重复写了3次obj
obj.a = 5;
obj.b = 6;
obj.c = 7;

console.log(obj) // {a: 5, b: 6, c: 7}

// 用 with 快捷方式

with (obj) {
    a = 5;
    b = 6;
    c = 7;
}

console.log(obj) // {a: 5, b: 6, c: 7}

// 接下来看一下 with 导致的数据泄露
function kaimo(obj) {
    with (obj) {
        a = 1;
    }
}

var k1 = {
    a: 2
};

var k2 = {
    b: 3
}

kaimo(k1);
console.log(k1.a); // 1

kaimo(k2);
console.log(k2.a); // undefined

console.log(a); // 1 （a被泄漏到全局作用域上）
```

**上述代码分析：**

- 1、创建了 `k1 、k2` 两个对象。其中一个有 `a` 属性，另外一个没有。
- 2、`kaimo(obj)` 函数接受一个 `obj` 的形参，该参数是一个对象引用，并执行了 `with(obj) {...}`。
- 3、在 `with` 块内部，将 `2` 赋值给了 `a`。
- 4、将 `k1` 传递进去，`a = 2` 赋值操作找到了 `k1.a` 并将 `2` 赋值给它。
- 5、当 `k2` 传递进去，`k2` 并没有 `a` 的属性，因此不会创建这个属性，`k2.a` 保持 `undefined`。

**问题：为什么对 k2 的操作会导致数据的泄漏呢？**

首先稍微讲一下：`JavaScript`中的 `LHS` 和 `RHS` 查询

> `LHS`（`Left-hand Side`）引用和 `RHS`（`Right-hand Side`）引用。通常是指等号（赋值运算）的左右边的引用。

```js
console.log(gg)
```

比如上面这个打印，先查找并取得 `gg` 的值，然后将它打印出来 `gg` 的引用是一个 `RHS` 引用，没有赋予操作

```js
gg = 666;
```

上面是对 `gg` 的引用是一个 `LHS` 引用，为赋值操作找到目标

**综上**：

1、当传递 `k2` 给 `with` 时，`with` 所声明的作用域是 `k2`, 从这个作用域开始对 `a` 进行 `LHS` 查询。

2、`k2` 的作用域、`kaimo(…)` 的作用域和全局作用域中都没有找到标识符 `a`，因此在非严格模式下，会自动在全局作用域创建一个全局变量），在严格模式下，会抛出 `ReferenceError` 异常。

```js
// 代码块二
var b;
void function(){
    var env = {b:1};
    b = 2;
    console.log("In function b:", b);
    with(env) {
        var b = 3;
        console.log("In with b:", b);
    }
}();
console.log("Global b:", b);

// 输出结果如下：
// In function b: 2
// In with b: 3
// Global b: undefined

```

### 3.6、let

> `let` 是 `ES6` 开始引入的新的变量声明模式。

winter 简单统计了下，以下语句会产生 let 使用的作用域：

> `for、 if、 switch、 try/catch/finally。`

### 3.7、Realm

> 在最新的标准（9.0）中，`JavaScript` 引入了一个新概念 `Realm`。有道词典上的意思是："领域，范围；王国"。`Realm` 中包含一组完整的内置对象，而且是复制关系。

```js
var iframe = document.createElement('iframe')
document.documentElement.appendChild(iframe)
iframe.src="javascript:var b = {};"

var b1 = iframe.contentWindow.b;
var b2 = {};

console.log(b1, b2);

// {} {}

console.log(typeof b1, typeof b2);

// 谷歌输出： object object   火狐输出：undefined object

console.log(b1 instanceof Object, b2 instanceof Object);

//false true
```

上面代码可以看到，在浏览器环境中获取来自两个 `Realm` 的对象，由于 `b1、 b2` 由同样的代码 `{}` 在不同的 `Realm` 中执行，所以表现出了不同的行为。
