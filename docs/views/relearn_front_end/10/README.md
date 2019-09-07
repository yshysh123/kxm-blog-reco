---
title: CSS语法关于带@的规则（十）
date: 2019-05-09
prev: /views/relearn_front_end/9/
next: /views/relearn_front_end/11/
tags:
 - Css
categories:
 - 重学前端专栏
---

## 一、CSS相关标准文档

### 1.0、[W3C的网站关于CSS相关的标准链接](https://www.w3.org/TR/?title=css)

### 1.2、[CSS语法的最新标准链接](https://www.w3.org/TR/css-syntax-3/)

### 1.3、CSS规则

> CSS 的顶层样式表由两种规则组成的规则列表构成，一种被称为 `at-rule`，也就是 `at 规则`，另一种是 `qualified rule`，也就是`普通规则`。

#### 1.3.0、at-rule

> 由一个 `@` 关键字和后续的一个区块组成，如果没有区块，则以分号结束。

#### 1.3.1、qualified rule

> 指普通的 `CSS` 规则，由选择器和属性指定构成的规则。

## 二、at 规则

### 2.0、CSS 标准里的 `at-rule`

- `@charset`： [https://www.w3.org/TR/css-syntax-3/](https://www.w3.org/TR/css-syntax-3/)
- `@import`：[https://www.w3.org/TR/css-cascade-4/](https://www.w3.org/TR/css-cascade-4/)
- `@media`：[https://www.w3.org/TR/css3-conditional/](https://www.w3.org/TR/css3-conditional/)
- `@page`：[https://www.w3.org/TR/css-page-3/](https://www.w3.org/TR/css-page-3/)
- `@counter-style`：[https://www.w3.org/TR/css-counter-styles-3](https://www.w3.org/TR/css-counter-styles-3)
- `@keyframes`：[https://www.w3.org/TR/css-animations-1/](https://www.w3.org/TR/css-animations-1/)
- `@fontface`：[https://www.w3.org/TR/css-fonts-3/](https://www.w3.org/TR/css-fonts-3/)
- `@supports`：[https://www.w3.org/TR/css3-conditional/](https://www.w3.org/TR/css3-conditional/)
- `@namespace`：[https://www.w3.org/TR/css-namespaces-3/](https://www.w3.org/TR/css-namespaces-3/)

上面由winter整理（winter原话：不用谢，我已经帮你找好了，如果页面定位不准，你可以打开页面搜索关键字）大笑。

### 2.1、@charset

> `@charset` 用于提示 CSS 文件使用的字符编码方式，它如果被使用，必须出现在最前面。这个规则只在给出语法解析阶段前使用，并不影响页面上的展示效果。

```css
@charset "utf-8";
```

### 2.2、@import

```css
@import "index.css";
@import url("index.css");
```

`import` 还支持 `supports` 和 `media query` 形式。（这一点不怎么理解）

```css
@import [ <url> | <string> ]
        [ supports( [ <supports-condition> | <declaration> ] ) ]?
        <media-query-list>? ;
```

### 2.3、@media

`media` 是 `media query` 使用的规则，能够对设备的类型进行一些判断

```css
@media print {
    body { font-size: 10px }
}
```

### 2.4、@page

`page` 用于分页媒体访问网页时的表现设置（这个我还没有用过`_(:3」∠)_`）

```css
@page {
  margin: 10%;

  @top-left {
    content: "Hamlet";
  }

  @top-right {
    content: "Page " counter(page);
  }
}
```

### 2.5、@ counter-style

`counter-style` 产生一种数据，用于定义列表项的表现。

```css
@counter-style triangle {
  system: cyclic;
  symbols: ‣;
  suffix: " ";
}
```

### 2.6、@ key-frames

`keyframes` 产生一种数据，用于定义动画关键帧。

```css
@keyframes diagonal-slide {
  from {
    left: 0;
    top: 0;
  }
  to {
    left: 100px;
    top: 100px;
  }
}
```

### 2.7、@ fontface

`fontface` 用于定义一种字体，`icon font` 技术就是利用这个特性来实现的。

```css
@font-face {
  font-family: Gentium;
  src: url(http://example.com/fonts/Gentium.woff);
}
```

### 2.8、@ support

> `support` 检查环境的特性，它与 `media` 比较类似。

### 2.9、@ namespace

> 用于跟 `XML` 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。

### 2.10、@ viewport

> 用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 `html` 的 `meta` 代替。

### 2.11、其他不太推荐的at规则

> `@color-profile、@document、@font-feature-values`

上面部分很多规则，winter已经很精炼的解释了，下面看看普通规则

## 三、普通规则

### 3.0、选择器

1、任何选择器，都是由几个符号结构连接的：空格、大于号、加号、波浪线、双竖线，这里需要注意一下，空格，即为后代选择器的优先级较低。

2、如果选择器不是伪元素，由几个可选的部分组成，标签类型选择器，id、class、属性和伪类，它们中只要出现一个，就构成了选择器。

3、如果选择器是伪元素，则在这个结构之后追加伪元素。只有伪类可以出现在伪元素之后。
  
winter整理了一个列表（不太严谨地）选择器的语法结构：

![选择器的语法结构](https://static001.geekbang.org/resource/image/4f/67/4fa32e5cf47c72a58f7a8211d4e8fc67.png)

可以参考语法分析示例图：

![语法分析示例](https://static001.geekbang.org/resource/image/d5/00/d56974c0265982b9ac84b067cd623e00.png)

### 3.1、声明列表

> 声明部分是一个由 `属性: 值` 组成的序列。

#### 3.1.0、属性

> 是由中划线、下划线、字母等组成的标识符，CSS 还支持使用反斜杠转义。

注意：属性不允许使用连续的两个中划线开头，否则会被认为是 CSS 变量。

以双中划线开头的属性被当作变量，与之配合的则是 var 函数：（具体可以参考[CSS Variables 标准](https://www.w3.org/TR/css-variables/)）

```css
:root {
  --main-color: #06c;
  --accent-color: #006;
}
/* The rest of the CSS file */
#foo h1 {
  color: var(--main-color);
}

```

#### 3.1.1、值

1、CSS 属性值类型（[在标准 CSS Values and Unit](https://www.w3.org/TR/css-values-4/)）

- CSS 范围的关键字：`initial，unset，inherit`，任何属性都可以的关键字
- 字符串：比如 `content` 属性
- `URL`：使用 `url()` 函数的 `URL` 值
- 整数 / 实数：比如 flex 属性
- 维度：单位的整数 `/` 实数，比如 `width` 属性
- 百分比：大部分维度都支持
- 颜色：比如 `background-color` 属性
- 图片：比如 `background-image` 属性
- `2D` 位置：比如 `background-position` 属性
- 函数：来自函数的值，比如 `transform` 属性

2、CSS 计算型函数

- `calc()`函数是基本的表达式计算，它支持加减乘除四则运算
- `max()`表示取两数中较大的一个
- `min()`表示取两数之中较小的一个
- `clamp()`则是给一个值限定一个范围，超出范围外则使用范围的最大或者最小值
- `toggle()`函数在规则选中多于一个元素时生效，它会在几个值之间来回切换
- `attr()`函数允许 CSS 接受属性值的控制
  
比如`calc()`的例子：

```css
section {
  float: left;
  margin: 1em; border: solid 1px;
  width: calc(100%/3 - 2*1em - 2*1px);
}
```
  
比如`toggle()`的例子：列表项的样式圆点和方点间隔出现

```css
ul {
  list-style-type: toggle(circle, square);
}

```
