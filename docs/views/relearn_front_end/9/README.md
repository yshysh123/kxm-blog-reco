---
title: JavaScript中的对象分类（九）
date: 2019-05-08
prev: /views/relearn_front_end/8/
next: /views/relearn_front_end/10/
tags:
 - JavaScript
categories:
 - 重学前端专栏
---

## 一、javaScript对象分类介绍

### 1.0、宿主对象（host Objects）

> 由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。

### 1.1、内置对象（Built-in Objects）

> 由 JavaScript 语言提供的对象。

#### 1.1.0、固有对象（Intrinsic Objects ）

> 由标准规定，随着 `JavaScript` 运行时创建而自动创建的对象实例。

#### 1.1.1、原生对象（Native Objects）

> 可以由用户通过 `Array、RegExp` 等内置构造器或者特殊语法创建的对象。

#### 1.1.2、普通对象（Ordinary Objects）

> 由 `{}` 语法、`Object` 构造器或者 `class` 关键字定义类创建的对象，它能够被原型继承。

下面winter主要介绍了普通对象之外的对象原型（刚好都是我不太懂的，mark一下）

## 二、宿主对象

### 2.0、window对象

- 全局对象 `window` 上的属性，一部分来自 `JavaScript` 语言，一部分来自浏览器环境
- 宿主也会提供一些构造器，比如使用 `new Image`来创建 `img` 元素（winter下次会讲浏览器的API，到时再详细的mark一下）

## 三、内置对象·固有对象

### 3.0、简单介绍

- 固有对象在任何 JS 代码执行前就已经被创建出来，类似基础库的角色
- ECMA 标准为我们提供了[一份固有对象表](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-well-known-intrinsic-objects)，里面含有 150+ 个固有对象（链接打开比较慢，稍等一下就好）

### 3.1、小实验：获取全部 JavaScript 固有对象

#### 3.1.0、三个值

> `Infinity、NaN、undefined`

#### 3.1.1、九个函数

> `eval、isFinite、isNaN、parseFloat、parseInt、decodeURI decodeURIComponent、encodeURI、encodeURIComponent`

#### 3.1.2、一些构造器

> `Array、Date、RegExp、Promise、Proxy、Map、WeakMap、Set、WeapSet、Function、Boolean、String、Number、Symbol、Object、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError URIError、ArrayBuffer、SharedArrayBuffer、DataView、Typed Array、Float32Array、Float64Array、Int8Array、Int16Array、Int32Array、UInt8Array、UInt16Array、UInt32Array、UInt8ClampedArray`

#### 3.1.3、四个用于当作命名空间的对象

> `Atomics、JSON、Math、Reflect`

#### 3.1.4、处理方法

1、winter的做法：使用广度优先搜索，查找这些对象所有的属性和 `Getter/Setter`，就可以获得 JavaScript 中所有的固有对象。

2、下面代码可以研究一下看看，`new Set()`不懂的可以看看[MDN关于set的介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)，（我现在还没有看明白，我去不同网页打开运行输出set不一样，感觉有点懵逼`_(:3」∠)_`，理解的大佬可以留言告诉我，不胜感激）

```js
var set = new Set();
var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect];
objects.forEach(o => set.add(o));

for(var i = 0; i < objects.length; i++) {
    var o = objects[i]
    for(var p of Object.getOwnPropertyNames(o)) {
        var d = Object.getOwnPropertyDescriptor(o, p)
        if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
            if(!set.has(d.value))
                set.add(d.value), objects.push(d.value);
        if( d.get )
            if(!set.has(d.get))
                set.add(d.get), objects.push(d.get);
        if( d.set )
            if(!set.has(d.set))
                set.add(d.set), objects.push(d.set);
    }
}
```

## 四、内置对象·原生对象

### 4.0、分类

> winter按照不同应用场景，将原生对象分成了以下几个种类

![原生对象种类](https://static001.geekbang.org/resource/image/6c/d0/6cb1df319bbc7c7f948acfdb9ffd99d0.png)

### 4.1、注意的几个点

- 可以用 new 运算创建新的对象
- 几乎所有这些构造器的能力都是无法用纯 JavaScript 代码实现
- 也无法用 `class/extend` 语法来继承
- 创建的对象多数使用了私有字段，比如：`Error: [[ErrorData]]`...这些字段使得原型继承方法无法正常工作
- 所有这些原生对象都是为了特定能力或者性能，而设计出来的`特权对象`

## 五、用对象来模拟函数与构造器：函数对象与构造器对象

### 5.0、函数对象的定义

> 具有 `[[call]]` 私有字段的对象

`[[call]]` 私有字段必须是一个引擎中定义的函数，需要接受 `this` 值和调用参数，并且会产生域的切换

### 5.1、构造器对象的定义

> 具有 `[[construct]]` 私有字段的对象

#### 5.1.0、`[[construct]]` 的大致执行过程

1、以 `Object.protoype` 为原型创建一个新对象
2、以新对象为 `this`，执行函数的 `[[call]]`
3、如果 `[[call]]` 的返回值是对象，那么，否则返回第一步创建的新对象

### 5.2、例子

1、内置对象 Date 在作为构造器调用时产生新的对象，作为函数时，则产生字符串，见以下代码：

```js
console.log(new Date);
console.log(Date())
```

2、浏览器宿主环境中，提供的 Image 构造器，则根本不允许被作为函数调用。

```js
console.log(new Image);
console.log(Image()); // 抛出错误 Uncaught TypeError: Failed to construct 'Image': Please use the 'new' operator, this DOM object constructor cannot be called as a function.'Image'
```

3、基本类型（String、Number、Boolean），它们的构造器被当作函数调用，则产生类型转换的效果

4、在 ES6 之后 `=>` 语法创建的函数仅仅是函数，它们无法被当作构造器使用，见以下代码：

```js
new (a => 0) // 报错：Uncaught TypeError: (intermediate value) is not a constructor
```

5、使用 `function` 语法或者 `Function` 构造器创建的对象来说，`[[call]]` 和 `[[construct]]` 行为总是相似的，它们执行同一段代码。

```js
function f(){
    return 1;
}
var v = f(); // 把 f 作为函数调用
var o = new f(); // 把 f 作为构造器调用
```

6、如果构造器返回了一个新的对象，那么 `new` 创建的新对象就变成了一个构造函数之外完全无法访问的对象，这一定程度上可以实现`私有`

```js
function cls(){
    this.a = 100;
    return {
        getValue: () => this.a
    }
}
var o = new cls;
o.getValue(); //100
//a 在外面永远无法访问到
```

## 六、特殊行为的对象

### 6.0、行为不大一样的对象

> winter总结了常见的下标运算（就是使用中括号或者点来做属性访问）或者设置原型跟普通对象不同的对象，如下：

- `Array`：`Array` 的 `length` 属性根据最大的下标自动发生变化。
- `Object.prototype`：作为所有正常对象的默认原型，不能再给它设置原型了。
- `String`：为了支持下标运算，`String` 的正整数属性访问会去字符串里查找。
- `Arguments`：`arguments` 的非负整数型下标属性跟对应的变量联动。
- 模块的 `namespace` 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 `import`
- 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊
- `bind` 后的 `function`：跟原来的函数相关联
