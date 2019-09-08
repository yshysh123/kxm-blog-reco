---
title: Flex 布局（三十六）
date: 2019-06-30
tags:
 - Css
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/35/
next: /views/relearn_front_end/37/
---

## 一、介绍

> 这一篇主要从设计、原理和应用三个方面来学习一下 Flex 布局。

详细的可以看看下面两篇文章：来自[阮一峰的网络日志](http://www.ruanyifeng.com/blog/)

- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## 二、Flex 的设计

> `Flex` 排版的核心是 `display:flex` 和 `flex` 属性，它们配合使用。具有 `display:flex` 的元素我们称为 `flex` 容器，它的子元素或者盒被称作 `flex` 项。

## 三、Flex 的原理

> winter说 Flex 的实现并不复杂，之前winter[写过一个基本实现提交给 spritejs 项目，代码可以参考](https://github.com/spritejs/sprite-core/commit/8757b4d3888b4f237b1089e94e075ab58ca952a6#diff-677d382da9f8d81f61d50af24f937b32R32)

**如何实现一个 Flex 布局？**

### 3.1、第一步：分行

> 把 flex 项分行，有 Flex 属性的 flex 项可以暂且认为主轴尺寸为 0，所以，它可以一定放进当前行。

### 3.2、第二步：计算主轴

> 计算每个 flex 项主轴尺寸和位置。

### 3.3、第三步：计算交叉轴

> 计算 flex 项的交叉轴尺寸和位置。

## 四、Flex 的应用

### 4.1、垂直居中

```html
<div id="parent">
  <div id="child">
  </div>
</div>
```

```css
#parent {
  display:flex;
  width:300px;
  height:300px;
  outline:solid 1px;
  justify-content:center;
  align-content:center;
  align-items:center;
}
#child {
  width:100px;
  height:100px;
  outline:solid 1px;
}
```

### 4.2、两列等高

```html
<div class="parent">
  <div class="child" style="height:300px;">
  </div>
  <div class="child">
  </div>
</div>
<br/>
<div class="parent">
  <div class="child" >
  </div>
  <div class="child" style="height:300px;">
  </div>
</div>
```

```css
.parent {
  display:flex;
  width:300px;
  justify-content:center;
  align-content:center;
  align-items:stretch;
}
.child {
  width:100px;
  outline:solid 1px;
}
```

### 4.3、自适应宽

```html
<div class="parent">
  <div class="child1">
  </div>
  <div class="child2">
  </div>
</div>
```

```css
.parent {
  display:flex;
  width:300px;
  height:200px;
  background-color:pink;
}
.child1 {
  width:100px;
  background-color:lightblue;
}
.child2 {
  width:100px;
  flex:1;
  outline:solid 1px;
}
```
