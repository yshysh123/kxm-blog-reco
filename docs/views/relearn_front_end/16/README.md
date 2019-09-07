---
prev: /views/relearn_front_end/15/
next: /views/relearn_front_end/17/
---
# HTML元信息类标签（十六）

## 一、什么是元信息类标签

> `元信息`，是指描述自身的信息。`元信息类标签`，就是 `HTML` 用于描述文档自身的一类标签。

## 二、head 标签

> 作为盛放其它语义类标签的容器使用。

### 2.1、注意

1、`head 标签`规定了自身必须是 `html 标签`中的第一个标签，它的内容必须包含一个 `title`，并且最多只能包含一个 `base`。

2、如果文档作为 `iframe`，或者有其他方式指定了文档标题时，可以允许不包含 `title 标签`。

## 三、title 标签

> `title 标签`表示文档的标题，`title` 应该完整地概括整个网页内容的。

## 四、base 标签

> `base 标签`作用是给页面上`所有的 URL` 相对地址提供一个基础。

```html
<html>
    <head>
        <base href="https://time.geekbang.org" target="_blank"/>
    </head>
    <body>
        <a href="">极客时间</a>
    </body>
</html>
```

上面的代码里面`a标签`的属性`href`没有值，但是当你点击`极客时间`，它就会新开一个页面打开`base标签`里的`href`。

## 五、meta 标签

> `meta 标签`是一组键值对，它是一种通用的元信息表示标签。

### 5.1、具有 charset 属性的 meta

> `HTML5`开始 `meta`标签新增 `charset` 属性的 `meta` 标签无需再有 `name 和 content`。

`charset 型 meta 标签非常关键`，它描述了 HTML 文档自身的编码形式。建议放在 `head` 的第一个。

```html
<html>
    <head>
        <meta charset="UTF-8">
……
```

### 5.2、具有 http-equiv 属性的 meta

> 具有 `http-equiv` 属性的 `meta` 标签，表示执行一个命令，可以不需要 `name` 属性。

```html
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```

其他命令：
  
- `content-language`：指定内容的语言
- `default-style`：指定默认样式表
- `refresh`：刷新
- `set-cookie`：模拟 http 头 `set-cookie`，设置 `cookie`
- `x-ua-compatible`：模拟 http 头 `x-ua-compatible`，声明 `ua` 兼容性
- `content-security-policy`：模拟 http 头 `content-security-policy`，声明内容安全策略

### 5.3、name 为 viewport 的 meta

```html
<meta name="viewport" content="width=500, initial-scale=1">
```

- `width`：页面宽度，可以取值具体的数字，也可以是 `device-width`，表示跟设备宽度相等。
- `height`：页面高度，可以取值具体的数字，也可以是 `device-height`，表示跟设备高度相等。
- `initial-scale`：初始缩放比例
- `minimum-scale`：最小缩放比例
- `maximum-scale`：最大缩放比例
- `user-scalable`：是否允许用户缩放

做好了移动端适配的网页，应该把用户缩放功能禁止掉，宽度设为设备宽度

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

### 5.4、其它预定义的 meta

`application-name`：如果页面是 `Web application`，用这个标签表示应用名称。

- `author`: 页面作者
- `description`：页面描述，用于搜索引擎或者其它场合
- `generator`: 生成页面所使用的工具，主要用于可视化编辑器，如果是手写 HTML 的网页，不需要加这个 `meta`
- `keywords`: 页面关键字，对于 `SEO` 场景`非常关键`
- `referrer`: 跳转策略，是一种安全考量
- `theme-color`: 页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）

补充：

```html
<head>
    <!-- 默认使用最新浏览器 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <!-- 不被网页(加速)转码 -->
    <meta http-equiv="Cache-Control" content="no-siteapp">

    <!-- 搜索引擎抓取 -->
    <meta name="robots" content="index,follow">

    <!-- 删除苹果默认的工具栏和菜单栏 -->
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
    <meta name="apple-mobile-web-app-capable" content="yes">

    <!-- 设置苹果工具栏颜色 -->
    <meta  name="apple-mobile-web-app-status-bar-style" content="black-translucent">

</head>
```
