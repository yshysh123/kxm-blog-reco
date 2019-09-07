---
prev: /views/relearn_front_end/30/
next: /views/relearn_front_end/32/
---
# JavaScript的语句（三十一）

## 一、介绍

> 在 JavaScript 标准中，把语句分成了两种：普通语句和声明型语句。

### 1.1、普通语句

![普通语句](https://static001.geekbang.org/resource/image/81/55/8186219674547691cf59e5c095304d55.png)

### 1.2、声明型语句

![声明型语句](https://static001.geekbang.org/resource/image/0e/38/0e5327528df12d1eaad52c4005efff38.jpg)

## 二、语句块

> 语句块就是一对大括号。

```js
{
    var x, y;
    x = 10;
    y = 20;
}
```

**语句块的意义和好处在于**：让我们可以把多行语句视为同一行语句。

```js
// 语句块会产生作用域
{
    let x = 1;
}
console.log(x); // Uncaught ReferenceError: x is not defined
```

## 三、空语句

> 空语句就是一个独立的分号，实际上没什么大用。

```js
;
```

## 四、if 语句

```js
if(a < b)
    console.log(a);
```

 if 和 else 连写成多分支条件

 ```js
if(a < 10) {
    //...
} else if(a < 20) {
    //...
} else if(a < 30) {
    //...
} else {
    //...
}
 ```

## 五、switch 语句

```js
switch(num) {
case 1:
    console.log(1);
case 2:
    console.log(2);
case 3:
    console.log(3);
}
// num等于1，输出：1 2 3
// num等于2，输出：2 3
// num等于3，输出：3

switch(num) {
case 1:
    console.log(1);
    break;
case 2:
    console.log(2);
    break;
case 3:
    console.log(3);
    break;
}
// num等于1，输出：1
// num等于2，输出：2
// num等于3，输出：3
```

winter 的看法是：“ switch 已经完全没有必要使用了，应该用 if else 结构代替。”。

## 六、循环语句

### 6.1、while 循环和 do while 循环

```js
let a = 5;
while(a--) {
    console.log("*");
}
// 输出：* * * * *
```

```js
let a = 6;
do {
    console.log(a);
} while(a < 6)
// 6
```

### 6.2、普通 for 循环

```js

for(i = 0; i < 6; i++)
    console.log(i);
// 0 1 2 3 4 5

for(var i = 0; i < 6; i++)
    console.log(i);
// 0 1 2 3 4 5

for(let i = 0; i < 6; i++)
    console.log(i);
// 0 1 2 3 4 5

for(const i = 0; i < 6; i++)
    console.log(i);
// 0 Uncaught TypeError: Assignment to constant variable.

var j = 0;
for(const i = 0; j < 6; j++)
    console.log(i);
// 0 0 0 0 0 0
```

### 6.3、for in 循环

> `for in` 循环枚举对象的属性，体现了属性的 `enumerable` 特征。

```js
let o = { a: 10, b: 20}
Object.defineProperty(o, "c", {enumerable: false, value: 30})

for(let p in o)
    console.log(p);
// 输出：a b
// enumerable为true，输出：a b c
```

### 6.4、for of 循环和 for await of 循环

> **`for of 循环是非常棒的语法特性`**。背后的机制是 `iterator` 机制。

1、用于数组

```js
for(let e of [1, 2, 3, 4, 5])
    console.log(e);
// 1 2 3 4 5
```

2、如何为一个对象添加 `iterator`。

```js
let o = {  
    [Symbol.iterator]:() => ({
        _value: 0,
        next(){
            if(this._value == 10)
                return {
                    done: true
                }
            else return {
                value: this._value++,
                done: false
            };
        }
    })
}
for(let e of o)
    console.log(e);
// 0 1 2 3 4 5 6 7 8 9
```

3、使用 `generator function`。

```js
function* foo(){
    yield 0;
    yield 1;
    yield 2;
    yield 3;
}
for(let e of foo())
    console.log(e);
// 0 1 2 3
```

4、JavaScript 还为异步生成器函数配备了异步的 for of

```js
function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
async function* foo(){
    i = 0;
    while(true) {
        await sleep(1000);
        yield i++;
    }
}
for await(let e of foo())
    console.log(e);
// 从0开始，每隔1s加1，输出：0 1 2 3 4 5....
```

## 七、return

> return 语句用于函数中，它终止函数的执行，并且指定函数的返回值。

```js
function squre(x){
    return x * x;
}
```

## 八、break 语句和 continue 语句

> break 语句用于跳出循环语句或者 switch 语句，continue 语句用于结束本次循环并继续循环。

```js
for(let i = 0; i < 2; i++){
    console.log(i)
    if( i == 0){
        break;
    }
}
// 0

for(let i = 0; i < 2; i++){
    console.log(i)
    if( i == 0){
        continue;
    }
}
// 0 1
```

## 九、with 语句

> with 语句把对象的属性在它内部的作用域内变成变量。

```js
let o = {a:1, b:2}
with(o){
    console.log(a, b);
}
// 1 2
```

## 十、try 语句和 throw 语句

> try 语句和 throw 语句用于处理异常。try 语句用于捕获异常，用 throw 抛出的异常。

- `try` 部分用于标识捕获异常的代码段
- `catch` 部分则用于捕获异常后做一些处理（`catch结构`会创建一个局部的作用域，不能再声明变量 e ，否则会出错。）
- `finally` 语句一般用于释放资源，它一定会被执行

```js
try {
    throw new Error("error");
} catch(e) {
    console.log(e);
} finally {
    console.log("finally");
}
// Error: error at <anonymous>:2:1  
// finally
```

## 十一、debugger 语句

> **`debugger 语句的作用是`**：通知调试器在此断点。在没有调试器挂载时，它不产生任何效果。

## 十二、var

1、var 声明语句是古典的 JavaScript 中声明变量的方式。而现在，基本使用 let 和 const 。

2、如果仍然想要使用 var，**winter建议**：把它当做一种`保障变量是局部`的逻辑，遵循以下三条规则：

- 声明同时必定初始化
- 尽可能在离使用的位置近处声明
- 不要在意重复声明

```js
// 下面这里x声明了两次
function add(x,y) {
    console.log(x + y);
}
function multiply(x,y) {
    console.log(x * y);
}

var x = 1, y = 2;
add(x, y);

for(var x = 0; x < 2; x++)
    multiply(x,y);
// 3
// 0
// 2

// 使用let改造，用代码块限制了第一个 x 的作用域，这样就更难发生变量命名冲突引起的错误。
{
    let x = 1, y = 2;
    add(x, y);
}

for(let x = 0; x < 2; x++)
    multiply(x);
```

## 十三、let 和 const

```js
const a = 2;
if(true){
    const a = 1;
    console.log(a);
}
console.log(a);
// 1 2
```

1、**const 和 let 语句在重复声明时会抛错**，这能够有效地避免变量名无意中冲突。

```js
let a = 2
const a = 1;
// Uncaught SyntaxError: Identifier 'a' has already been declared
```

2、**let 和 const 声明还是会被预处理**。如果当前作用域内有声明，就无法访问到外部的变量。

```js
const a = 2;
if(true){
    console.log(a); // 抛错
    const a = 1;
}
// Uncaught ReferenceError: Cannot access 'a' before initialization

if(true){
    console.log(a);
   var a = 1;
}
// undefined

// 上面的对比就说明 const 声明仍然是有预处理机制的。
```

## 十四、class 声明

> `class` 最基本的用法只需要 `class` 关键字、名称和一对大括号。

1、`class` 的声明特征跟 `const` 和 `let` 类似，都是作用于块级作用域，预处理阶段则会屏蔽外部变量。

```js
const a = 2;
if(true){
    console.log(a); // 抛错
    class a {

    }
}
// Uncaught ReferenceError: Cannot access 'a' before initialization
```

2、`class` 内部，可以使用 `constructor` 关键字来定义构造函数。

```js
// 这个例子来自 MDN，它展示了构造函数、getter 和方法的定义。
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

## 十五、函数声明

> 函数声明使用 function 关键字。

1、带 * 的函数是 `generator`。生成器函数可以理解为返回一个序列的函数，它的底层是 `iterator` 机制。

2、`async` 函数是可以暂停执行，等待异步操作的函数，它的底层是 `Promise` 机制。

```js

function foo(){

}

function* foo(){
    yield 1;
    yield 2;
    yield 3;
}

async function foo(){
    await sleep(3000);
}

async function* foo(){
    await sleep(3000);
    yield 1;
}
```

3、函数的参数，可以只写形参名，还可以写默认参数和指定多个参数

```js
function foo(a = 1, ...other) {
    console.log(a, other)
}

foo();
// 1 []

foo(3,4);
// 3 [4]
```
