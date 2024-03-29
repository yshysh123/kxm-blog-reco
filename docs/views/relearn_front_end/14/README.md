---
title: 浏览器工作解析四（十四）
date: 2019-05-13
tags:
 - 浏览器
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/13/
next: /views/relearn_front_end/15/
---

## 一、概括

> 本文主要聊聊浏览器是怎样确定每一个元素的位置的

## 二、基本概念

### 2.1、排版

> 浏览器把排版的内容（文字、图片、图形、表格等等）确定它们位置的过程，叫作`排版`。浏览器最基本的排版方案是`正常流排版`。

### 2.2、盒模型

> 浏览器又可以支持元素和文字的混排（元素被定义为占据长方形的区域），还允许边框、边距和留白，这个就是所谓的`盒模型`。

#### 2.2.1、绝对定位元素

> 绝对定位元素把自身从正常流抽出，直接由 `top` 和 `left` 等属性确定自身的位置，不参加排版计算，也不影响其它元素。完全跟正常流无关的一种独立排版模式。

#### 2.2.2、浮动元素

> 浮动元素则是使得自己在正常流的位置向左或者向右移动到边界，并且占据一块排版空间。 `float` 元素非常特别，浏览器对 `float` 的处理是先排入正常流，再移动到排版宽度的最左 / 最右（主轴的最前和最后）。

## 三、正常流文字排版

### 3.1、字体解析库（freetype）

来自`freetype`的两张图片关于获取某个特定的文字相关信息：

![freetype图一](https://static001.geekbang.org/resource/image/06/01/0619d38f00d539f7b6773e541ce6fa01.png)

纵向版本：

![freetype图二](https://static001.geekbang.org/resource/image/c3/96/c361c7ff3a11216c139ed462b9d5f196.png)

`advance`：每一个文字排布后在主轴上的前进距离。

### 3.2、css属性影响

> 除了字体提供的字形本身包含的信息，文字排版还受到一些 `CSS` 属性影响，如 `line-height、letter-spacing、word-spacing` 等。`display` 值为 `inline` 的元素中的文字排版时会被直接排入文字流中，`inline` 元素主轴方向的 `margin` 属性和 `border` 属性也会被计算进排版前进距离当中。

即使没有元素包裹，混合书写方向的文字也可以形成一个盒结构，在排版时，遇到这样的`双向文字盒`，会先排完盒内再排盒外。

## 四、正常流中的盒

- 多数 `display` 属性都可以分成两部分：内部的排版和是否 `inline`，带有 `inline-` 前缀的盒，被称作`行内级盒`。
- `vertical-align` 属性决定了盒在交叉轴方向的位置，也会影响实际行高。
- 浏览器对行的排版，一般是先行内布局，再确定行的位置，根据行的位置计算出行内盒和文字的排版位置。
- 块级盒比较简单，它总是单独占据一整行，计算出交叉轴方向的高度即可。

## 五、其他排版

> 比如: `flex` 排版，支持了 `flex` 属性，`flex` 属性将每一行排版后的剩余空间平均分配给主轴方向的 `width/height` 属性。

浏览器支持的每一种排版方式，都是按照对应的标准来实现的。
