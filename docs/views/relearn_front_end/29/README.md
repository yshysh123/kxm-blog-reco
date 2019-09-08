---
title: JavaScript中要不要加分号？（二十九）
date: 2019-06-07
tags:
 - JavaScript
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/28/
next: /views/relearn_front_end/30/
---

## 一、自动插入分号规则

### 1.1、三条规则

- 要有换行符，且下一个符号是不符合语法的，那么就尝试插入分号。
- 有换行符，且语法中规定此处不能有换行符，那么就自动插入分号。
- 源代码结束处，不能形成完整的脚本或者模块结构，那么就自动插入分号。

### 1.2、例子

```js
//第一行的结尾处有换行符，接下来 void 关键字接在 1 之后是不合法的，根据第一条规则，会在 void 前插入换行符。
let a = 1
void function(a){
    console.log(a);
}(a);
```

```js
// 根据no LineTerminator here 规则, a 的后面就要插入一个分号。
var a = 1, b = 1, c = 1;
a
++
b
++
c
// a ==> 1  b,c ==> 2
```

### 1.3、例子 no LineTerminator here 规则展示

```js
UpdateExpression[Yield, Await]:
    LeftHandSideExpression[?Yield, ?Await]
    LeftHandSideExpression[?Yield, ?Await][no LineTerminator here]++
    LeftHandSideExpression[?Yield, ?Await][no LineTerminator here]--
    ++UnaryExpression[?Yield, ?Await]
    --UnaryExpression[?Yield, ?Await]
```

### 1.4、IIFE（立即执行的函数表达式）

```js
(function(){
    console.log(1);
})()
(function(){
    console.log(2);
})()

// 不加分号，输出结果
// 1   Uncaught TypeError: (intermediate value)(...) is not a function

(function(){
    console.log(1);
})();
(function(){
    console.log(2);
})()

// 加分号，输出结果
// 1  2

// 关于这个问题，遇到过，当时排查几十分钟 _(:3」∠)_ ， 由于我之前的是有换行，还有注释，当时一直不理解，类似下面这样
(function(){
    console.log(1);
})()

// 处理。。。业务
(function(){
    console.log(2);
})()
```

### 1.5、带换行符的注释

```js
// 带换行符的注释也被认为是有换行符，return 也有 [no LineTerminator here] 规则的要求，这里会自动插入分号
function f(){
    return/*
        This is a return value.
    */1;
}
f();

// undefined
```

## 二、no LineTerminator here 规则

> `no LineTerminator here` 规则表示它所在的结构中的这一位置不能插入换行符。

![no LineTerminator here 规则](https://static001.geekbang.org/resource/image/c3/ad/c3ffbc89e049ad1901d4108c8ad88aad.jpg)

### 2.1、带标签的 continue 语句

```js
// 不能在 continue 后插入换行。
outer:for(var j = 0; j < 10; j++)
    for(var i = 0; i < j; i++)
        continue /*no LineTerminator here*/ outter
```

### 2.2、return

```js
function f(){
    return /*no LineTerminator here*/1;
}
```

### 2.3、后自增、后自减运算符

```js
i/*no LineTerminator here*/++
i/*no LineTerminator here*/--
```

### 2.4、throw 和 Exception 之间

```js
throw/*no LineTerminator here*/new Exception("error")
```

### 2.5、async 关键字

```js
// 后面都不能插入换行符
async/*no LineTerminator here*/function f(){

}
const f = async/*no LineTerminator here*/x => x*x
```

### 2.6、箭头函数

```js
// 箭头函数的箭头前，也不能插入换行
const f = x/*no LineTerminator here*/=> x*x
```

### 2.7、yield

```js
// yield 之后，不能插入换行
function *g(){
    var i = 0;
    while(true)
        yield/*no LineTerminator here*/i++;
}
```

## 三、不写分号需要注意的情况

### 3.1、以括号开头的语句

```js
(function(a){
    console.log(a);
})()/* 这里没有被自动插入分号 */
(function(a){
    console.log(a);
})()
```

### 3.2、以数组开头的语句

```js
var a = [[]]/* 这里没有被自动插入分号 */
[3, 2, 1, 0].forEach(e => console.log(e))
```

### 3.3、以正则表达式开头的语句

```js
// 正则边除号
var x = 1, g = {test:()=>0}, b = 1/* 这里没有被自动插入分号 */
/(a)/g.test("abc")
console.log(RegExp.$1)
```

### 3.4、以 Template 开头的语句

```js
// 没有自动插入分号，函数 f 被认为跟 Template 一体的，会被执行。
var f = function(){
  return "";
}
var g = f/* 这里没有被自动插入分号 */
`Template`.match(/(a)/);
console.log(RegExp.$1)
```
