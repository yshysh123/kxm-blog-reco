---
title: CSS的颜色（四十一）
date: 2019-07-12
tags:
 - Css
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/40/
next: /views/relearn_front_end/42/
---

## 一、介绍

> 这一篇来学习一下 CSS 的渲染相关的属性。讲一讲颜色。

## 二、颜色的原理

### 2.1、RGB 颜色

> 计算机中，最常见的颜色表示法是 RGB 颜色，它符合光谱三原色理论：红、绿、蓝三种颜色的光可以构成所有的颜色。多用 0 - 255 的数字表示每一种颜色，这正好占据了一个字节，每一个颜色就占据三个字节。在 RGB 表示法中，三色数值最大表示白色，三色数值为 0 表示黑色。

![RGB](https://static001.geekbang.org/resource/image/7f/a1/7f5bf39cbe44e36758683a674f9fcfa1.png)

### 2.2、CMYK 颜色

> 在印刷行业，使用的就是三原色（品红、黄、青）来调配油墨，这种颜色的表示法叫做 CMYK，它用一个四元组来表示颜色。

![CMYK](https://static001.geekbang.org/resource/image/15/1b/15fefe9f80ec8e1f7bd9ecd223feb61b.png)

### 2.3、HSL 颜色

> HSL 它用一个值来表示人类认知中的颜色，用专业的术语叫做色相（H）。加上颜色的纯度（S）和明度（L），就构成了一种颜色的表示。

![HSL](https://static001.geekbang.org/resource/image/a3/ce/a3016a6ff178870d6dba23f807b0dfce.png)

### 2.4、其它颜色

1、RGBA

> Red（红色）、Green（绿色）、Blue（蓝色）和 Alpha 的色彩空间。RGBA 颜色被用来表示带透明度的颜色，实际上，Alpha 通道类似一种颜色值的保留字。在 CSS 中，Alpha 通道被用于透明度，所以颜色表示被称作 RGBA，而不是 RGBO（Opacity）。

2、为了方便使用，CSS 还规定了名称型的颜色，它内置了大量（140 种）的颜色名称。

## 三、渐变

> 在 CSS 中，`background-image`这样的属性，可以设为渐变。CSS 中支持两种渐变，一种是线性渐变，一种是放射性渐变。

### 3.1、线性渐变

```css
linear-gradient(direction, color-stop1, color-stop2, ...);
```

### 3.2、放射性渐变

```css
radial-gradient(shape size at position, start-color, ..., last-color);
```

### [感兴趣的可以查看文档](https://www.runoob.com/css3/css3-gradients.html)
