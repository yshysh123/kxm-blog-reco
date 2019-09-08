---
title: Promise里的代码为什么比setTimeout先执行？（十七）
date: 2019-05-16
tags:
 - JavaScript
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/16/
next: /views/relearn_front_end/18/
---

## 一、引言

> 一个 `JavaScript` 引擎会常驻于内存中，它等待着 `宿主` 把 `JavaScript` 代码或者函数传递给它执行。

1、`ES3`版本以及之前，`JavaScript` 本身还没有异步执行代码的能力，`宿主环境`传递给 `JavaScript` 引擎，然后按顺序执行，由宿主发起任务。

2、`ES5`之后，`JavaScript` 引入了 `Promise`，不需要浏览器的安排，`JavaScript` 引擎本身也可以发起任务。

3、采纳`JSC`引擎术语，把宿主发起的任务称为`宏观任务`，把`JavaScript`引擎发起的任务称为`微观任务`。

## 二、宏观和微观任务

> `JavaScript` 引擎等待宿主环境分配宏观任务，在 Node 术语中，把这个部分称为`事件循环`。

1、用伪代码来表示：跑在独立线程中的循环

```js
while(TRUE) {
    r = wait();
    execute(r);
}
```

2、整个循环做的事情基本上就是反复 `等待 - 执行`，这里的执行过程，其实都是一个宏观任务。可以大致理解为：宏观任务的队列就相当于时间循环。

3、在宏观任务中，`JavaScript` 的 `Promise` 还会产生`异步代码`，`JavaScript` 必须保证这些异步代码在一个宏观任务中完成，因此，每个宏观任务中又包含了一个微观任务队列：如下图所示

![宏观任务中的微观任务队列](https://static001.geekbang.org/resource/image/16/65/16f70a9a51a65d5302166b0d78414d65.jpg)

例如：`Promise` 永远在队列尾部添加微观任务。`setTimeout` 等宿主 `API`，则会添加宏观任务。

## 三、Promise

> `JavaScript` 语言提供的一种`标准化的异步管理`方式，当进行 io、等待或者其它异步操作的函数，不返回真实结果，而返回一个`承诺`，函数的调用方可以在合适的时机，选择等待这个`承诺兑现`。

### 3.1、基本用法示例

```js
    function sleep(duration) {
        return new Promise(function(resolve, reject) {
            setTimeout(resolve,duration);
        })
    }
    sleep(1000).then( ()=> console.log("finished"));
```

`Promise` 的 `then` 回调是一个`异步`的执行过程。

### 3.2、`Promise` 函数中的执行顺序

```js
    var r = new Promise(function(resolve, reject){
        console.log("a");
        resolve()
    });
    r.then(() => console.log("c"));
    console.log("b")

    // 输出顺序：a  b  c
```

### 3.3、`setTimeout` 混用的 `Promise`

```js
    var r = new Promise(function(resolve, reject){
        console.log("a");
        resolve()
    });
    setTimeout(()=>console.log("d"), 0)
    r.then(() => console.log("c"));
    console.log("b")

    // 输出顺序：a  b  c  d
```

`Promise` 产生的是 `JavaScript` 引擎内部的`微任务`，而 `setTimeout` 是浏览器 `API`，它产生`宏任务`。所以`d` 必定在 `c` 之后输出。

### 3.4、一个耗时 `1` 秒的 `Promise`

```js
    setTimeout(()=>console.log("d"), 0)
    var r = new Promise(function(resolve, reject){
        resolve()
    });
    r.then(() => {
        var begin = Date.now();
        while(Date.now() - begin < 1000);
        console.log("c1")
        new Promise(function(resolve, reject){
            resolve()
        }).then(() => console.log("c2"))
    });

    // 输出顺序：c1  c2  d
```

这个例子很好的解释了`微任务优先的原理`。

### 3.5、如何分析异步执行的顺序

+ 1、首先我们分析有多少个宏任务
+ 2、在每个宏任务中，分析有多少个微任务
+ 3、根据调用次序，确定宏任务中的微任务执行次序
+ 4、根据宏任务的触发规则和调用次序，确定宏任务的执行次序
+ 5、确定整个顺序

```js
    function sleep(duration) {
        return new Promise(function(resolve, reject) {
            console.log("b");
            setTimeout(resolve,duration);
        })
    }
    console.log("a");
    sleep(5000).then(()=>console.log("c"));

    // 输出顺序：a  b  c（c要等5秒）
```

第一个宏观任务中，包含了先后同步执行的 `console.log("a")`; 和 `console.log("b")`;。

`setTimeout` 后，第二个宏观任务执行调用了 `resolve`，然后 `then` 中的代码异步得到执行，调用了 `console.log("c")`。

## 四、新特性：async/await

> `async/await` 是 `ES2016` 新加入的特性，它提供了用 `for、if` 等代码结构来编写异步的方式，并且运行时基础是 `Promise`。

1、`async` 函数是在 `function` 关键字之前加上 `async` 关键字，这样就定义了一个 `async` 函数，可以在其中使用 `await` 来等待一个 `Promise`。

```js
function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
async function foo(){
    console.log("a")
    await sleep(2000)
    console.log("b")
}

foo();

// 输出顺序：a  b（b要等两秒）
```

2、`async` 嵌套

```js
function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
async function foo(name){
    await sleep(2000)
    console.log(name)
}
async function foo2(){
    await foo("a");
    await foo("b");
}

foo2();

// 输出顺序：a（a等两秒） b（b也等两秒）
```
