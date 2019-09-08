---
title: JavaScript的表达式语句（三十二）
date: 2019-06-10
tags:
 - JavaScript
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/31/
next: /views/relearn_front_end/33/
---

## 一、什么是表达式语句

> **表达式语句**：就是一个表达式，它是由运算符连接变量或者直接量构成的。从语法上看，任何合法的表达式都可以当做表达式语句使用。

## 二、PrimaryExpression 主要表达式

> 表达式的原子项：`Primary Expression`。它是表达式的最小单位，它所涉及的语法结构也是优先级最高的。

### 2.1、直接量（Literal）

> **直接量**：就是直接用某种语法写出来的具有特定类型的值。通俗地讲，直接量就是在代码中把它们写出来的语法。

```js
"abc";
123;
null;
true;
false;

/* 还能够直接量的形式定义对象，有函数、类、数组、正则表达式等特殊对象类型。*/

({});
(function(){});
(class{ });
// function、{ 和 class 开头的表达式语句与声明语句有语法冲突，使用需加上括号来回避语法冲突。
[];
/abc/g;
```

### 2.2、其他

1、`Primary Expression` 还可以是 this 或者变量，在语法上，把变量称作`标识符引用`。

```js
this;
myVar;
```

2、任何表达式加上圆括号，都被认为是 `Primary Expression`，这个机制使得圆括号成为改变运算优先顺序的手段。

```js
(a + b)*c;
```

## 三、MemberExpression 成员表达式

> Member Expression 通常是用于访问对象成员的。

### 3.1、几种形式

- 用标识符的属性访问和用字符串的属性访问。
- `new.target` 是个新加入的语法，用于判断函数是否是被 `new` 调用。
- `super` 则是构造函数中，用于访问父类的属性的语法。

```js
a.b;
a["b"];
new.target;
super.b;
```

### 3.2、带函数的模板

> 表示把模板的各个部分算好后传递给一个函数。

```js
f`a${b}c`;
```

### 3.3、带参数列表的 new 运算

> 不带参数列表的 `new` 运算优先级更低，不属于 `Member Expression`。

```js
new Cls();
```

## 四、NewExpression NEW 表达式

> `Member Expression` 加上 new 就是 `New Expression`，（不加 new 也可以构成 New Expression，JavaScript 中默认独立的高优先级表达式都可以构成低优先级表达式）。

```js
// 看个例子
new new Kaimo(666);

// 直观上可能有两种意思
new (new Kaimo(666)); or new (new Kaimo)(666);

// 实际上等价于第一种，可以验证一下

class Kaimo{
  constructor(n){
    console.log("kaimo", n);
    return class {
      constructor(n) {
        console.log("returned", n);
      }
    }
  }
}

new new Kaimo(666);
// kaimo 666
// returned undefined

new (new Kaimo(666));
// kaimo 666
// returned undefined

new (new Kaimo)(666);
// kaimo undefined
// returned 666
```

## 五、CallExpression 函数调用表达式

> `Member Expression` 还能构成 `Call Expression`。它的基本形式是 `Member Expression` 后加一个括号里的参数列表，或者可以用上 `super` 关键字代替 `Member Expression`。

```js
a.b(c);
super();

// 变体  可以理解为，Member Expression 中的某一子结构具有函数调用，那么整个表达式就成为了一个 Call Expression。
a.b(c)(d)(e);
a.b(c)[3];
a.b(c).d;
a.b(c)`xyz`;
```

## 六、LeftHandSideExpression 左值表达式

> `New Expression` 和 `Call Expression` 统称 `LeftHandSideExpression，左值表达式`。直观地讲，左值表达式就是可以放到等号左边的表达式。

```js
a() = b;

// 原生的 JavaScript 函数，返回的值都不能被赋值。多数赋值将会是 Call Expression 的其它形式

a().c = b;
```

**左值表达式最经典的用法是用于`构成赋值表达式`**。

## 七、AssignmentExpression 赋值表达式

> 有多种形态，最基本的当然是使用等号赋值。

```js
a = b
```

### 7.1、嵌套

```js
a = b = c = d 等价于 a = (b = (c = d))
```

### 7.2、结合运算符

```js
// *=、 /=、 %=、+=、-=、...
a += b; 等价于 a = a + b;
```

## 八、Expression 表达式

> 赋值表达式可以构成 Expression 表达式的一部分。在 JavaScript 中，表达式就是用逗号运算符连接的赋值表达式。

```js
// 比赋值运算优先级更低的就是逗号运算符（可以把逗号理解为一种小型的分号）
var a,b;
a = b, b = 1, null; // null

null,null+null  // 0
```

逗号分隔的表达式会顺次执行，就像不同的表达式语句一样。整个表达式的结果就是最后一个逗号后的表达式结果。
