---
title: JavaScript中的原型和类（八）
date: 2019-05-06
prev: /views/relearn_front_end/7/
next: /views/relearn_front_end/9/
tags:
 - JavaScript
categories:
 - 重学前端专栏
---

## 一、什么是原型？

### 1.0、定义

> 原型是指一个词语或一个类型意义的所有典型模型或原形象，是一个类型的组典型特征

### 1.1、基于类的编程语言

> 诸如 C++、Java 等流行的编程语言是使用类的方式来描述对象，`基于类`的编程提倡使用一个关注分类和类之间关系开发模型。

### 1.2、基于原型的编程语言

> 如 JavaScript 编程语言是利用原型来描述对象，`基于原型`的编程看起来更为提倡程序员去关注一系列对象实例的行为，而后才去关心如何将这些对象，划分到最近的使用方式相似的原型对象，而不是将它们分成类。

### 1.3、原型系统的“复制操作”有两种实现思路

- 一个是并不真的去复制一个原型对象，而是使得新对象持有一个原型的引用
- 另一个是切实地复制对象，从此两个对象再无关联。

javaScript选择了第一种方式。

## 二、JavaScript 的原型

### 2.0、原型系统的两条概括

- 如果所有对象都有私有字段 `[[prototype]]`，就是对象的原型
- 读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止。

### 2.1、三个内置函数

可以利用下面三个方法，更直接地访问操纵原型，来实现抽象和复用。

- `Object.create` 根据指定的原型创建新对象，原型可以是 `null`
- `Object.getPrototypeOf` 获得一个对象的原型
- `Object.setPrototypeOf` 设置一个对象的原型

winter举了用原型来抽象猫和虎的例子：

```js
var cat = {
    say() {
        console.log("meow~");
    },
    jump() {
        console.log("jump");
    }
}

var tiger = Object.create(cat,  {
    say: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: function(){
            console.log("roar!");
        }
    }
})


var anotherCat = Object.create(cat);

anotherCat.say(); // meow~

var anotherTiger = Object.create(tiger);

anotherTiger.say(); // roar!

```

## 三、早期版本中的类与原型

### 3.0、“类”的定义是一个私有属性 [[class]]

所有具有内置 class 属性的对象:（ES3和之前版本）

```js
var o = new Object;
var n = new Number;
var s = new String;
var b = new Boolean;
var d = new Date;
var arg = function(){ return arguments }();
var r = new RegExp;
var f = new Function;
var arr = new Array;
var e = new Error;
console.log(
    [o, n, s, b, d, arg, r, f, arr, e].map(v =>   Object.prototype.toString.call(v)
  )
)

```

语言使用者唯一可以访问 [[class]] 属性的方式是 `Object.prototype.toString`。

### 3.1、`[[class]]` 私有属性被 `Symbol.toStringTag` 代替

可以查看MDN文档[Symbol.toStringTag](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)以及[Object.prototype.toString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)的介绍：（ES5开始）

```js
var o = { [Symbol.toStringTag]: "MyObject" }
console.log(o + ""); // [object MyObject]
```

上面这段代码创建了一个新对象，并且给它唯一的一个属性 `Symbol.toStringTag`，用字符串加法触发了`Object.prototype.toString` 的调用，发现这个属性最终对 `Object.prototype.toString` 的结果产生了影响。

### 3.2、new运算做了什么？

- 1、以构造器的 `prototype` 属性（注意与私有字段 `[[prototype]]` 的区分）为原型，创建新对象
- 2、将 `this` 和调用参数传给构造器，执行
- 3、如果构造器返回的是对象，则返回，否则返回第一步创建的对象。

用构造器模拟类的两种方法:

```js
// 1、在构造器中修改 this，给 this 添加属性

function c1() {
    this.p1 = 1;
    this.p2 = function(){
        console.log(this.p1);
    }
}
var o1 = new c1;
o1.p2(); // 1

// 2、修改构造器的 prototype 属性指向的对象，它是从这个构造器构造出来的所有对象的原型。

function c2() {
}
c2.prototype.p1 = 1;
c2.prototype.p2 = function() {
    console.log(this.p1);
}

var o2 = new c2;
o2.p2(); // 1

```

## 四、ES6 中的类

### 4.0、类的基本写法

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}


```

### 4.1、类的继承能力

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(this.name + ' barks.');
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.

```

上面代码调用子类的 speak 方法获取了父类的 name。如果对于`class`还想了解更多，可以查看[MDN文档Classes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)部分。
