---
title: JavaScript类型有哪些你不知道的细节？（六）
date: 2019-04-29
prev: /views/relearn_front_end/5/
next: /views/relearn_front_end/7/
tags:
 - JavaScript
categories:
 - 重学前端专栏
---

## winter提了几个问题测试：能回答对几个？

- 1、为什么有的编程规范要求用 void 0 代替 undefined？
- 2、字符串有最大长度吗？
- 3、0.1 + 0.2 不是等于 0.3 么？为什么 JavaScript 里不是这样的？
- 4、ES6 新加入的 Symbol 是个什么东西？
- 5、为什么给对象添加的方法能用在基本类型上？
  
> 如果有点犹豫，不妨看看下面的介绍，或者找找资料温习一下。

### 类型

1. Undefined
2. Null
3. Boolean
4. String
5. Number
6. Symbol
7. Object

### 1、Undefined、Null

Undefined：

- Undefined 类型表示未定义，它的类型只有一个值，就是 undefined
- 任何变量在赋值前是 Undefined 类型、值为 undefined
- JavaScript 的代码 undefined 是一个变量，而并非是一个关键字，这是 JavaScript 语言公认的设计失误之一
- 为了避免无意中被篡改，可以使用 void 0 来获取 undefined 值。

Null：

- Null 类型也只有一个值，就是 null，它的语义表示空值
- 与 undefined 不同，null 是 JavaScript 关键字
- 在任何代码中，都可以用 null 关键字来获取null值

### 2、String

- String 用于表示文本数据
- String 有最大长度是 2^53 - 1
- 字符串的最大长度，实际上是受字符串的编码长度影响的。
  
> Note: 现行的字符集国际标准，字符是以 Unicode 的方式表示的，每一个 Unicode 的码点表示一个字符，理论上，Unicode 的范围是无限的。UTF 是 Unicode 的编码方式，规定了码点在计算机中的表示方法，常见的有 UTF16 和 UTF8。Unicode 的码点通常用 U+??? 来表示，其中 ??? 是十六进制的码点值。0-65536（U+0000 - U+FFFF）的码点被称为基本字符区域（BMP）。

### 3、Number

- JavaScript 中的 Number 类型有 18437736874454810627(即 2^64-2^53+3) 个值
- NaN，占用了 9007199254740990，这原本是符合 IEEE 规则的数字
- Infinity，无穷大
- -Infinity，负无穷大
- 根据[双精度浮点数的定义](https://baike.baidu.com/item/%E5%8F%8C%E7%B2%BE%E5%BA%A6%E6%B5%AE%E7%82%B9%E6%95%B0/4502803?fr=aladdin)，Number 类型中有效的整数范围是-0x1fffffffffffff 至 0x1fffffffffffff，所以 Number 无法精确表示此范围外的整数
- 根据[浮点数的定义](https://baike.baidu.com/item/%E6%B5%AE%E7%82%B9%E6%95%B0/6162520?fr=aladdin)，非整数的 Number 类型无法用 `==`（=== 也不行）来比较

关于javaScript中 `0.1 + 0.2 == 0.3 ?` 这个问题的解释：

```js
console.log( 0.1 + 0.2 == 0.3);
>> false
```

输出结果为`false`，说明两边不相等，这是浮点运算特点导致的，实际上，这里错误的不是结论，而是比较的方法，正确的比较方法是使用javaScript提供的最小精度值：

可以查找[MDN文档的Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)可以找到属性`EPSILON`

> `Number.EPSILON`：两个可表示数字之间的最小间隔

```js
console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);
>> true
```

这样的比较输出结果为`true`，`检查等式左右两边差的绝对值是否小于最小精度，才是正确的比较浮点数的方法`。

### 4、Symbol

关于Symbol的介绍，我准备用[ES6文档-阮一峰](http://es6.ruanyifeng.com/)来做一些介绍，具体的可以参考文档

#### 4.1、ES6 引入Symbol的原因

> ES5 的对象属性名都是字符串，这容易造成属性名的冲突。ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。从根本上防止属性名的冲突。

#### 4.2、介绍

> 凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

4.2.1、Symbol 值通过Symbol函数生成，先来一段代码：

```js
let s = Symbol();
typeof s
>> "symbol"
```

上面代码中，变量`s`就是一个独一无二的值。`s`是`Symbol`数据类型。

4.2.2、Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述

```js
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1
>> Symbol(foo)
s2
>> Symbol(bar)

s1.toString()
>> "Symbol(foo)"

s2.toString()
>> "Symbol(bar)"
```

上面代码中，`s1`和`s2`是两个 `Symbol` 值。如果不加参数，它们在控制台的输出都是`Symbol()`，不利于区分。有了参数以后，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值。

4.2.3、如果 `Symbol` 的参数是一个对象，就会调用该对象的`toString`方法，将其转为字符串，然后才生成一个 `Symbol` 值。

```js
const obj = {
    a: '123123',
    toString() {
        return 'iuoisigud';
    }
};
const sym = Symbol(obj);

sym // Symbol(iuoisigud)
```

4.2.4、`Symbol`函数的参数只是表示对当前 `Symbol` 值的描述，因此相同参数的`Symbol`函数的返回值是不相等的。

```js
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```

4.2.5、`Symbol` 值不能与其他类型的值进行运算，会报错。

```js
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
```

4.2.6、`Symbol` 值可以显式转为字符串，也可以转为布尔值，但是不能转为数值。

```js
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'

let sym = Symbol();
Boolean(sym) // true
!sym  // false

Number(sym) // TypeError
sym + 2 // TypeError
```

4.2.7、其他的一些属性可以去看[ES6文档-阮一峰](http://es6.ruanyifeng.com/)

#### 4.3、注意

> `Symbol`函数前不能使用`new`命令，否则会报错。这是因为生成的 `Symbol` 是一个原始类型的值，不是对象。也就是说，由于 `Symbol` 值不是对象，所以不能添加属性。基本上，它是一种类似于`字符串的数据类型`。

### 5、Object

> Object 是 JavaScript 中最复杂的类型，也是 JavaScript 的核心机制之一。

#### 为什么给对象添加的方法能用在基本类型上？

回答：“运算符提供了装箱操作，它会根据基础类型构造一个临时对象，使得我们能在基础类型上调用对应对象的方法。”

比如原型上添加方法，也可以应用于基本类型:

```js
Symbol.prototype.hello = () => console.log("hello");

var a = Symbol("a");
console.log(typeof a); //symbol，a 并非对象
a.hello(); //hello，有效
```

### 6、类型转换

#### 6.1、臭名昭著的“ == ”运算

- 因为 JS 是弱类型语言，所以类型转换发生非常频繁
- “ == ”试图实现跨类型的比较，它的规则复杂到几乎没人可以记住。

#### 6.2、转换规则

![转换规则](https://static001.geekbang.org/resource/image/71/20/71bafbd2404dc3ffa5ccf5d0ba077720.jpg)

#### 6.3、StringToNumber

> 字符串到数字的类型转换，存在一个语法结构，类型转换支持十进制、二进制、八进制和十六进制

比如：

```js
Number('0xFF')
>> 255
```

#### 6.4、装箱转换

> [装箱(boxing)](https://baike.baidu.com/item/%E8%A3%85%E7%AE%B1/2881560?fr=aladdin)：值类型实例到对象的转换，它暗示在运行时实例将携带完整的类型信息，并在堆中分配。

 每一种基本类型 `Number`、`String`、`Boolean`、`Symbol` 在对象中都有对应的类，所谓装箱转换，正是把基本类型转换为对应的对象，它是类型转换中一种相当重要的种类。

> 例子：利用一个函数的 `call` 方法来强迫产生`Symbol`装箱

```js
var symbolObject = (function() {
    return this;
}).call(Symbol("a"));

console.log(typeof symbolObject); //object
console.log(symbolObject instanceof Symbol); //true
console.log(symbolObject.constructor == Symbol); //true
```

> 例子：使用内置的 Object 函数，我们可以在 JavaScript 代码中显式调用装箱能力。

```js
var symbolObject = Object(Symbol("a"));

console.log(typeof symbolObject); //object
console.log(symbolObject instanceof Symbol); //true
console.log(symbolObject.constructor == Symbol); //true
```

> 每一类装箱对象皆有私有的 `Class` 属性，这些属性可以用 `Object.prototype.toString` 获取：

```js
var symbolObject = Object(Symbol("a"));

console.log(Object.prototype.toString.call(symbolObject));
>> [object Symbol]
```

#### 6.5、拆箱转换

> [拆箱(unboxing)](https://baike.baidu.com/item/%E6%8B%86%E7%AE%B1)：是将引用类型转换为值类型

6.5.1、在 JavaScript 标准中，规定了 [ToPrimitive](http://es5.github.io/#x9.1) 函数，它是对象类型到基本类型的转换

```js
toPrimitive(input, preferedType)
```

input是输入的值，preferedType是期望转换的类型，它可以是字符串，也可以是数字。

|  inputType | Result |
| :------ | :------ |
| Undefined | input argument |
| Null | input argument |
| Boolean | input argument |
| Number | input argument |
| String | input argument |
| Object | 忽略 第二个参数 hint PreferredType 直接调用内置方法 [[DefaultValue]] |

6.5.2、如果转换的类型是number，会执行以下步骤：[参考博客](https://blog.csdn.net/suxuelengyin/article/details/82759437)

1. 如果input是原始值，直接返回这个值；
2. 否则，如果input是对象，调用`input.valueOf()`，如果结果是原始值，返回结果；
3. 否则，调用`input.toString()`。如果结果是原始值，返回结果；
4. 否则，抛出错误。

6.5.3、如果转换的类型是String，2和3会交换执行，即先执行`toString()`方法。

例子1：先将两个操作数转换为string，然后进行拼接

```js
[] + []
>> ""

[] -----> ''
[] -----> ''

[] + [] = ''
```

例子2：先将两个操作数转换为string，然后进行拼接

```js
[] + {}
>> "[object Object]"

// 解释
[] -----> ''
{} -----> '[object Object]'

[] + {} = '[object Object]'
```

例子3：js解释器会将开头的 {} 看作一个代码块，而不是一个js对象

```js
{} + []
>> 0

// 真正参与运算的是 + []
// {} + [] 等价于 + []
```

### 7、规范类型

- List 和 Record： 用于描述函数传参过程。
- Set：主要用于解释字符集等。
- Completion Record：用于描述异常、跳出等语句执行过程。
- Reference：用于描述对象属性访问、delete 等。
- Property Descriptor：用于描述对象的属性。
- Lexical Environment 和 Environment Record：用于描述变量和作用域。
- Data Block：用于描述二进制数据。

### 8、补充阅读

#### typeof 的运算结果，与运行时类型的规定有很多不一致的地方(typeof 的设计是有缺陷的)

![补充阅读](https://static001.geekbang.org/resource/image/ec/6b/ec4299a73fb84c732efcd360fed6e16b.png)
