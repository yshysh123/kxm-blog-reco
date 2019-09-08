---
title: CSSOM（二十六）
date: 2019-05-30
tags:
 - Css
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/25/
next: /views/relearn_front_end/27/
---

## 一、介绍

> CSSOM 是 CSS 的对象模型，在 W3C 标准中，它包含两个部分：描述样式表和规则等 CSS 的模型部分（CSSOM），和跟元素视图相关的 View 部分（CSSOM View）。

## 二、CSSOM

### 2.1、创建样式表

> 用 style 标签和 link 标签创建样式表

```html
<style title="Hello">
a {
  color:red;
}
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
```

### 2.2、CSSOM API 的基本用法

```js
// 获取文档中所有的样式表
document.styleSheets
```

```js
// 虽然无法用 CSSOM API 来创建样式表，但是可以修改样式表中的内容
document.styleSheets[0].insertRule("p { color:pink; }", 0)
document.styleSheets[0].removeRule(0)
```

```js
// 获取样式表中特定的规则（Rule），(使用它的 cssRules 属性来实现)
document.styleSheets[0].cssRules
```

### 2.3、CSSStyleRule 的两个属性

> selectorText 和 style，分别表示一个规则的选择器部分和样式部分。

1、**selector 部分**：是一个字符串，按照选择器语法设置即可。

2、**style 部分**：是一个样式表，它跟元素的 style 属性是一样的类型，所以可以像修改内联样式一样，直接改变属性修改规则中的具体 CSS 属性定义，也可以使用 cssText 这样的工具属性。

```js
// 获取一个元素最终经过 CSS 计算得到的属性的方法
window.getComputedStyle(elt, pseudoElt);
```

## 三、CSSOM View

> `CSSOM View` 这一部分的 `API`，可以视为 `DOM API` 的扩展，它在原本的 `Element 接口`上，添加了显示相关的功能，可以分成三个部分：`窗口部分，滚动部分和布局部分`。

### 3.1、窗口 API

> 用于操作浏览器窗口的位置、尺寸等。

- `moveTo(x, y)`：窗口移动到屏幕的特定坐标
- `moveBy(x, y)`：窗口移动特定距离
- `resizeTo(x, y)`：改变窗口大小到特定尺寸
- `resizeBy(x, y)`：改变窗口大小特定尺寸

```js
// 窗口 API 还规定了 window.open() 的第三个参数：
window.open("about:blank", "_blank" ,"width=100,height=100,left=100,right=100" )
```

### 3.2、滚动 API

#### 1、视口滚动 API

> 可视区域（视口）滚动行为由 window 对象上的一组 API 控制

- `scrollX`：是视口的属性，表示 X 方向上的当前滚动距离，有别名 `pageXOffset`
- `scrollY`：是视口的属性，表示 Y 方向上的当前滚动距离，有别名 `pageYOffset`
- `scroll(x, y)`：使得页面滚动到特定的位置，有别名 `scrollTo`，支持传入配置型参数 `{top, left}`
- `scrollBy(x, y)`：使得页面滚动特定的距离，支持传入配置型参数 `{top, left}`

 通过这些属性和方法，可以读取视口的滚动位置和操纵视口滚动。

```js
// 监听视口滚动事件，需要在 document 对象上绑定事件监听函数
document.addEventListener("scroll", function(event){
  //......
})
```

#### 2、元素滚动 API

在 Element 类，为了支持滚动，加入了以下 API。

- `scrollTop`：元素的属性，表示 Y 方向上的当前滚动距离。
- `scrollLeft`：元素的属性，表示 X 方向上的当前滚动距离。
- `scrollWidth`：元素的属性，表示元素内部的滚动内容的宽度，一般来说会大于等于元素宽度。
- `scrollHeight`：元素的属性，表示元素内部的滚动内容的高度，一般来说会大于等于元素高度。
- `scroll(x, y)`：使得元素滚动到特定的位置，有别名 `scrollTo`，支持传入配置型参数 `{top, left}`。
- `scrollBy(x, y)`：使得元素滚动到特定的位置，支持传入配置型参数 `{top, left}`。
- `scrollIntoView(arg)`：滚动元素所在的父元素，使得元素滚动到可见区域，可以通过 `arg` 来指定滚到中间、开始或者就近。

```js
// 可滚动的元素也支持 scroll 事件，在元素上监听它的事件即可
element.addEventListener("scroll", function(event){
  //......
})
```

### 3.3、布局 API

#### 1、全局尺寸信息

![全局尺寸信息](https://static001.geekbang.org/resource/image/b6/10/b6c7281d86eb7214edf17069f95ae610.png)

#### 2、元素的布局信息

> 有些元素可能产生多个盒，事实上，只有盒有宽和高，元素是没有的。

1、获取宽高的对象应该是`盒`

> `CSSOM View` 为 `Element 类`添加了两个方法：`getClientRects()和getBoundingClientRect()。`

**getClientRects**：会返回一个列表，里面包含元素对应的每一个盒所占据的客户端矩形区域，这里每一个矩形区域可以用 x, y, width, height 来获取它的位置和尺寸。

**getBoundingClientRect**：返回元素对应的所有盒的包裹的矩形区域，需要注意，这个 API 获取的区域会包括当 overflow 为 visible 时的子元素区域。

## 拓展

最后面两个API兼容性非常好，定义又非常清晰。实现视觉效果超级棒。。。

```js
// 大家可以试一试在控制台输出下面3个
document.documentElement
// >>> <html>...</html>

document.documentElement.getClientRects()
// >>> DOMRectList

document.documentElement.getBoundingClientRect()
// >>> DOMRect
```
