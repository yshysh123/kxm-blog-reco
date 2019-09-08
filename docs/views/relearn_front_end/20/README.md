---
title: try里面放return，finally还会执行吗？（二十）
date: 2019-05-19
tags:
 - JavaScript
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/19/
next: /views/relearn_front_end/21/
---

## 一、引言

> 本文讲一讲 `JavaScript` 语句。

![语句](https://static001.geekbang.org/resource/image/98/d5/98ce53be306344c018cddd6c083392d5.jpg)

## 二、Completion 类型

```js
// return 执行了但是没有立即返回，而是先执行了finally
function kaimo(){
  try{
    return 0;
  } catch(err) {
    console.log(err)
  } finally {
    console.log("a")
  }
}

console.log(kaimo()); // a 0
```

```js
// finally 中的 return 覆盖了 try 中的 return。
function kaimo(){
  try{
    return 0;
  } catch(err) {
    console.log(err)
  } finally {
    return 1;
  }
}

console.log(kaimo()); // 1
```

### 2.1、Completion Record

> `Completion Record` 用于描述异常、跳出等语句执行过程。表示一个语句执行完之后的结果，它有三个字段。

- `[[type]]`：表示完成的类型，有 `break、continue、return、throw、normal` 几种类型
- `[[value]]`：表示语句的返回值，如果语句没有，则是 `empty`
- `[[target]]`：表示语句的目标，通常是一个 `JavaScript` 标签

**`JavaScript` 使用 `Completion Record` 类型，控制语句执行的过程。**

## 三、普通语句

> 在 `JavaScript` 中，把不带控制能力的语句称为普通语句。种类可以参考引言的图片。

1、这些语句在执行时，从前到后顺次执行（这里先忽略 var 和函数声明的预处理机制），没有任何分支或者重复执行逻辑。

2、普通语句执行后，会得到 `[[type]]` 为 `normal` 的 `Completion Record`，`JavaScript 引擎`遇到这样的 `Completion Record`，会继续执行下一条语句。

3、在 `Chrome` 控制台输入一个表达式，可以得到结果，但是在前面加上 `var`，就变成了 `undefined`。`Chrome` 控制台显示的正是语句的 `Completion Record` 的 `[[value]]`。

![Chrome 控制台代码](https://static001.geekbang.org/resource/image/a3/67/a35801b1b82654d17e413e51b340d767.png)

## 四、语句块

> `语句块`就是拿大括号括起来的一组语句，它是一种语句的复合结构，可以嵌套。

**语句块内部的语句的 `Completion Record` 的 `[[type]]` 如果不为 `normal`，会打断语句块后续的语句执行。**

1、内部为普通语句的一个语句块：

```js
// 在每一行的注释中为 Completion Record
{
    var i = 1; // normal, empty, empty
    i ++; // normal, 1, empty
    console.log(i) //normal, undefined, empty
} // normal, undefined, empty
```

在这个block中都是 `normal` 类型的话，该程序会按顺序执行。

2、加入 `return`

```js
// 在每一行的注释中为 Completion Record
{
  var i = 1; // normal, empty, empty
  return i; // return, 1, empty
  i ++;
  console.log(i)
} // return, 1, empty
```

在 `block` 中产生的`非 normal` 的完成类型可以穿透复杂的语句嵌套结构，产生控制效果。

## 五、控制型语句

> 控制型语句带有 `if、switch` 关键字，它们会对不同类型的 `Completion Record` 产生反应。

控制类语句分成两部分：

- 对其内部造成影响：如 `if、switch、while/for、try`。
- 对外部造成影响：如 `break、continue、return、throw`。

![组合](https://static001.geekbang.org/resource/image/77/d3/7760027d7ee09bdc8ec140efa9caf1d3.png)

> `穿透`就是去上一层的作用域或者控制语句找可以消费`break，continue`的执行环境，`消费`就是在这一层就执行了这个`break或者continue`
  
这两类语句的配合，会产生控制代码执行顺序和执行逻辑的效果。

## 六、带标签的语句

1、任何 `JavaScript` 语句是可以加标签的，在语句前加冒号即可`：`。

```js
    firstStatement: var i = 1;
```

2、类似于注释，基本没有任何用处。唯一有作用的时候是：与完成`记录类型中的 target` 相配合，用于跳出多层循环。

```js
    outer: while(true) {
        console.log("outer")
        inner: while(true) {
            console.log("inner1")
            break outer;
            console.log("inner2")
        }
    }
    console.log("finished")

    // outer  inner1  finished
```

## 拓展

[https://tc39.github.io/ecma262/#sec-runtime-semantics](https://tc39.github.io/ecma262/#sec-runtime-semantics)