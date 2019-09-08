---
title: JavaScript中的函数（十九）
date: 2019-05-18
tags:
 - JavaScript
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/18/
next: /views/relearn_front_end/20/
---

## 一、函数

### 1.1、普通函数

> 用 `function` 关键字定义的函数。

```js
function kaimo(){
    // code
}
```

### 1.2、箭头函数

> 用 `=>` 运算符定义的函数。

```js
const kaimo = () => {
    // code
}
```

### 1.3、方法

> 在 `class` 中定义的函数。

```js
class KK {
    kaimo(){
        //code
    }
}
```

### 1.4、生成器函数

> 用 `function*` 定义的函数。这种声明方式会定义一个生成器函数 ([generator function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*))，它返回一个  `Generator`  对象。

```js
function* kaimo(){
    // code
}
```

### 1.5、类

> 用 `class` 定义的类，实际上也是函数。

```js
class KK {
    constructor(){
        //code
    }
}
```

### 1.6、异步函数

> 普通函数、箭头函数和生成器函数加上 async 关键字。

```js
async function kaimo(){
    // code
}

const kaimo = async () => {
    // code
}

async function kaimo*(){
    // code
}
```

## 二、this关键字

> `this` 是执行上下文中很重要的一个组成部分。同一个函数调用方式不同，得到的 `this` 值也不

### 2.1、普通函数情况下

```js
function showThis(){
    console.log(this);
}

var o = {
    showThis: showThis
}

showThis(); // global
o.showThis(); // o

```

> 普通函数的 `this` 值由`调用它所使用的引用`决定。获取函数的表达式，返回的是一个 `Reference` 类型。`Reference` 类型由两部分组成：一个对象和一个属性值。

上面代码里 `o.showThis` 产生的 `Reference` 类型，即由对象 `o` 和属性`showThis`构成。

**调用函数时使用的引用，决定了函数执行时刻的 `this` 值。**

### 2.2、箭头函数情况下

```js
const showThis = () => {
    console.log(this);
}

var o = {
    showThis: showThis
}

showThis(); // global
o.showThis(); // global
```

**改为箭头函数后，不论用什么引用来调用它，都不影响它的 `this` 值。**

### 2.3、方法情况下

```js
// 这一个没怎么弄明白，mark一下
class C {
    showThis() {
        console.log(this);
    }
}
var o = new C();
var showThis = o.showThis;

showThis(); // undefined
o.showThis(); // o
```

首先创建了一个类 `C`，并且实例化出对象 `o`，再把 `o` 的方法赋值给了变量 `showThis`。

## 三、this 关键字的机制

1、在 `JavaScript` 标准中，为函数规定了用来保存定义时上下文的私有属性 `[[Environment]]`。

2、当一个函数执行时，会创建一条新的执行环境记录，记录的外层词法环境（`outer lexical environment`）会被设置成函数的 `[[Environment]]`。

```js
/* 执行上下文的切换机制 */

var a = 1;
foo();

// 在别处定义了 foo：

var b = 2;
function foo(){
    console.log(b); // 2
    console.log(a); // error
}
```

`foo` 能够访问 `b`（定义时词法环境），却不能访问 `a`（执行时的词法环境）

3、`JavaScript` 用一个 `栈` 来管理执行上下文，这个栈中的每一项又包含一个链表。

![链表](https://static001.geekbang.org/resource/image/e8/31/e8d8e96c983a832eb646d6c17ff3df31.jpg)

当函数调用时，会入栈一个新的执行上下文，函数调用结束时，执行上下文被出栈。

4、`[[thisMode]]` 私有属性。

- `lexical`：表示从上下文中找 `this`，这对应了箭头函数。
- `global`：表示当 `this` 为 `undefined` 时，取全局对象，对应了普通函数。
- `strict`：当严格模式时使用，`this` 严格按照调用时传入的值，可能为 `null` 或者 `undefined`。

```js
"use strict"
function showThis(){
    console.log(this);
}

var o = {
    showThis: showThis
}

showThis(); // undefined
o.showThis(); // o
```

## 四、操作 this 的内置函数

> `Function.prototype.call` 和 `Function.prototype.apply` 可以指定函数调用时传入的 `this` 值。

```js
function foo(a, b, c){
    console.log(this);
    console.log(a, b, c);
}

//call 和 apply 作用一样，只是传参方式有区别
foo.call({}, 1, 2, 3); // {} 1 2 3
foo.apply({}, [1, 2, 3]); // {} 1 2 3
```

> `Function.prototype.bind` 它可以生成一个绑定过的函数，这个函数的 `this` 值固定了参数

```js
function foo(a, b, c){
    console.log(this);
    console.log(a, b, c);
}
foo.bind({}, 1, 2, 3)(); // {} 1 2 3
```
