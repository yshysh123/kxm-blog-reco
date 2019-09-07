---
prev: /views/relearn_front_end/36/
next: /views/relearn_front_end/38/
---
# 浏览器事件（三十七）

## 一、介绍

> 这一篇主要学习一下浏览器部分的事件。

## 二、事件概述

### 2.1、pointer 设备

> 所谓 pointer 设备，是指它的输入最终会被抽象成屏幕上面的一个点。比如触摸屏和鼠标。

### 2.2、WIMP 系统

> 现代的 UI 系统，都源自 WIMP 系统。WIMP 即 Window Icon Menu Pointer 四个要素，它最初由施乐公司研发，后来被微软和苹果两家公司应用在了自己的操作系统上。

## 三、捕获与冒泡

### 3.1、简述

> 实际上鼠标点击时并没有位置信息，但是一般操作系统会根据位移的累积计算出来，跟触摸屏一样，提供一个坐标给浏览器。把这个坐标转换为具体的元素上事件的过程，就是捕获过程。而冒泡过程，则是符合人类理解逻辑的：比如你摸了我的手时，你也摸了我到了我这个人。可以认为，**捕获是计算机处理事件的逻辑，而冒泡是人类处理事件的逻辑**。

### 3.2、事件传播顺序

> 在一个事件发生时，捕获过程跟冒泡过程总是先后发生，跟你是否监听毫无关联。

```html
<body>
  <input id="i"/>
</body>
```

```js
document.body.addEventListener("click", () => {
    console.log(1)
}, true)

document.getElementById("i").addEventListener("click", () => {
    console.log(2)
}, true)

document.body.addEventListener("click", () => {
    console.log(3)
}, false)

document.getElementById("i").addEventListener("click", () => {
    console.log(4)
}, false)

// 输出顺序
1 2 4 3
```

### 3.3、监听事件 API

> **`addEventListener`** 有三个参数：事件名称、事件处理函数、捕获还是冒泡。

1、事件处理函数不一定是函数

```js
// 具有 handleEvent 方法的对象
var o = {
  handleEvent: event => console.log(event)
}
document.body.addEventListener("keydown", o, false);
```

2、第三个值可以是个对象，它提供了更多选项

- once：只执行一次。
- passive：承诺此事件监听不会调用 preventDefault，这有助于性能。
- useCapture：是否捕获（否则冒泡）。

## 四、焦点

### 4.1、键盘事件

> 键盘事件是由焦点系统控制的，一般来说，操作系统也会提供一套焦点系统，但是现代浏览器一般都选择在自己的系统内覆盖原本的焦点系统。

1、焦点系统认为整个 UI 系统中，有且仅有一个“聚焦”的元素，所有的键盘事件的目标元素都是这个聚焦元素。

2、Tab 键被用来切换到下一个可聚焦的元素，焦点系统占用了 Tab 键，但是可以用 JavaScript 来阻止这个行为。

3、浏览器 API 还提供了 API 来操作焦点，如：

```js
document.body.focus();

document.body.blur();
```

## 五、自定义事件

[参考MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events)

Events 可以使用 Event 构造函数创建如下：

```js
var event = new Event('build');

// Listen for the event.
elem.addEventListener('build', function (e) { ... }, false);

// Dispatch the event.
elem.dispatchEvent(event);
```