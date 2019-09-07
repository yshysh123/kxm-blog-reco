---
title: JavaScript对象：面向对象还是基于对象？（七）
date: 2019-05-05
prev: /views/relearn_front_end/6/
next: /views/relearn_front_end/8/
tags:
 - JavaScript
categories:
 - 重学前端专栏
---

## 1、学习JavaScript面向对象时是否有这样的疑惑？

- 为什么 JavaScript（直到 ES6）有对象的概念，但是却没有像其他的语言那样，有类的概念呢？
- 为什么在 JavaScript 对象里可以自由添加属性，而其他的语言却不能呢？

## 2、什么是面向对象？

### 2.1、JavaScript 对象的特征

#### 2.1.1、对象的特征（来自《面向对象分析与设计》一书）

- 对象具有唯一标识性：即使完全相同的两个对象，也并非同一个对象。
- 对象有状态：对象具有状态，同一对象可能处于不同状态之下。
- 对象具有行为：即对象的状态，可能因为它的行为产生变迁。

关于第一点：

```js
var a1 = { a: 1 };
var a2 = { a: 1 };
console.log(a1 == a2); // false
```

关于第二、三点:

- `c++`中称"状态和行为"为`成员变量`和`成员函数`
- `java`中则称它们为`属性`和`方法`
- `javaScript`中将状态和行为统一抽象为`属性`

winter举了个例子，代码如下：

```js
var o = {
    d: 1,
    f() {
        console.log(this.d);
    }
};
```

上面代码中，o是对象，d是一个属性，而函数f也是一个属性，只是写法不一样，总结来说，在JavaScript中，对象的状态和行为其实都被抽象为了属性。

#### 2.1.2、JavaScript 中对象独有的特色

> 对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力。

举例说明运行时如何向一个对象添加属性：

```js
var o = { a: 1 };
o.b = 2;
console.log(o.a, o.b); //1 2
```

为了提高抽象能力，JavaScript的属性被设计成比别的语言更加复杂的形式，它提供了数据属性和访问器属性（getter/setter）两类。

### 2.2、JavaScript 对象的两类属性

#### 2.2.1、数据属性

4个特征：

- `value`：就是属性的值.
- `writable`：决定属性能否被赋值.
- `enumerable`：决定 for in 能否枚举该属性.
- `configurable`：决定该属性能否被删除或者改变特征值.

#### 2.2.2、访问器（getter/setter）属性

2.2.2.1、4个特征：

- `getter`：函数或 undefined，在取属性值时被调用.
- `setter`：函数或 undefined，在设置属性值时被调用.
- `enumerable`：决定 for in 能否枚举该属性.
- `configurable`：决定该属性能否被删除或者改变特征值.

2.2.2.2、[Object.getOwnPropertyDescripter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) 和 [Object​.define​Property()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

```js
var o, d;

o = { get foo() { return 17; } };
d = Object.getOwnPropertyDescriptor(o, "foo");
// d {
//   configurable: true,
//   enumerable: true,
//   get: /*the getter function*/,
//   set: undefined
// }

o = { bar: 42 };
d = Object.getOwnPropertyDescriptor(o, "bar");
// d {
//   configurable: true,
//   enumerable: true,
//   value: 42,
//   writable: true
// }

o = {};
Object.defineProperty(o, "baz", {
  value: 8675309,
  writable: false,
  enumerable: false
});
d = Object.getOwnPropertyDescriptor(o, "baz");
// d {
//   value: 8675309,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

实际上 JavaScript 对象的运行时是一个“属性的集合”，属性以字符串或者 Symbol 为 key，以数据属性特征值或者访问器属性特征值为 value。

### 2.3、小结

- 由于 JavaScript 的对象设计跟目前主流基于类的面向对象差异非常大，导致有“JavaScript 不是面向对象”这样的说法。
- JavaScript 语言标准也已经明确说明，JavaScript 是一门面向对象的语言，跟JavaScript 的高度动态性的对象系统密不可分。
