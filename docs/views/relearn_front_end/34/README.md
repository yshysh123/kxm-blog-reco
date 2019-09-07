---
prev: /views/relearn_front_end/33/
next: /views/relearn_front_end/35/
---
# 什么是替换型元素？（三十四）

## 一、介绍

> 替换型元素，就是链接方式外另一种引入文件的方式。替换型元素是把文件的内容引入，替换掉自身位置的一类标签。

## 二、script 标签

> `script 标签`：是为数不多的既可以作为替换型标签，又可以不作为替换型标签的元素。

### 2.1、两种用法

> 凡是替换型元素，都是使用 `src` 属性来引用文件的，而链接型元素是使用 `href` 标签的。

```html
<script type="text/javascript">
console.log("Hello world!");
</script>

<script type="text/javascript" src="kaimo.js"></script>
```

## 三、img 标签

具体可以参考[MDN文档关于img标签的描述](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)

```html
// 1、使用data uri 可以加width，height，alt
 <img src='data:image/svg+xml;charset=utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/></svg>'/>

// 2、srcset和sizes
<img src="clock-demo-thumb-200.png"
     alt="Clock"
     srcset="clock-demo-thumb-200.png 200w,
             clock-demo-thumb-400.png 400w"
     sizes="(min-width: 600px) 200px, 50vw">
```

`srcset` 提供了根据屏幕条件选取图片的能力，但是其实更好的做法，是使用 `picture` 元素。

## 四、picture 标签

参考MDN文档[`<picture>：picture 元素`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture)

> HTML `<picture>` 元素通过包含零或多个 `<source>` 元素和一个 `<img>` 元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子 `<source>` 元素，如果没有匹配的，就选择 `<img>`元素的 `src` 属性中的URL。然后，所选图像呈现在`<img>`元素占据的空间中。

```html
<picture>
    <source srcset="/media/examples/surfer-240-200.jpg"
            media="(min-width: 800px)">
    <img src="/media/examples/painted-hand-298-332.jpg" />
</picture>
```

要决定加载哪个URL，user agent 检查每个 `<source>` 的 srcset、media 和 type 属性，来选择最匹配页面当前布局、显示设备特征等的兼容图像。

## 五、video 标签

### 5.1、古典的video用法

```html
<video controls="controls" src="movie.ogg"></video>
```

### 5.2、使用 source 标签来指定接入多个视频源

```html
<video controls="controls">
  <source src="movie.webm" type="video/webm">
  <source src="movie.ogg" type="video/ogg">
  <source src="movie.mp4" type="video/mp4">
  You browser does not support video.
</video>
```

### 5.3、`<track> 标签`

> 定义和用法：`<track>` 标签为诸如 video 元素之类的媒介规定外部文本轨道。用于规定字幕文件或其他包含文本的文件，当媒介播放时，这些文件是可见的。是一种播放时序相关的标签，它最常见的用途就是字幕。([track标签](http://www.w3school.com.cn/tags/tag_track.asp))

```html
<video width="320" height="240" controls="controls">
  <source src="forrest_gump.mp4" type="video/mp4" />
  <source src="forrest_gump.ogg" type="video/ogg" />
  <track kind="subtitles" src="subs_chi.srt" srclang="zh" label="Chinese">
  <track kind="subtitles" src="subs_eng.srt" srclang="en" label="English">
</video>
```

**track 属性**：track 标签中，必须使用 srclang 来指定语言。

- **kind**：表示轨道属于什么文本类型。
- **label**：轨道的标签或标题。
- **src**：轨道的 URL。
- **srclang**：轨道的语言，若 kind 属性值是 "subtitles"，则该属性必需的。
- **subtitles**：就是字幕了，不一定是翻译，也可能是补充性说明。
- **captions**：报幕内容，可能包含演职员表等元信息，适合听障人士或者没有打开声音的人了解音频内容。
- **descriptions**：视频描述信息，适合视障人士或者没有视频播放功能的终端打开视频时了解视频内容。
- **chapters**：用于浏览器视频内容。
- **metadata**：给代码提供的元信息，对普通用户不可见。

## 六、audio 标签

具体可以看看[`<audio>` 标签](https://www.runoob.com/tags/tag-audio.html)，audio 也可以使用 source 元素来指定源文件。

```html
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  您的浏览器不支持 audio 元素。
</audio>
```

## 七、iframe 标签

1、在移动端，iframe 受到了相当多的限制，它无法指定大小，里面的内容会被完全平铺到父级页面上。

2、同时很多网页也会通过 http 协议头禁止自己被放入 iframe 中。

3、新的标准中，iframe 使用 srcdoc 属性创建了一个新的文档，嵌入在 iframe 中展示，并且使用了 sandbox 来隔离。这样，这个 iframe 就不涉及任何跨域问题。

```html
<iframe sandbox srcdoc="<p>hello <a href='/kaimo.html'>kaimo</a>"></iframe>
```

[关于sandbox可以参考MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)

`sandbox`：如果指定了空字符串，该属性对呈现在iframe框架中的内容启用一些额外的限制条件。

有效的值有：

- `allow-forms`: 允许嵌入的浏览上下文可以提交表单。如果该关键字未使用，该操作将不可用。
- `allow-modals`: 允许内嵌浏览环境打开模态窗口。
- `allow-orientation-lock`: 允许内嵌浏览环境禁用屏幕朝向锁定。
- `allow-pointer-lock`: 允许内嵌浏览环境使用 Pointer Lock API.
- `allow-popups`: 允许弹窗。如果没有设置该属性，相应的功能将静默失效。
- `allow-popups-to-escape-sandbox`: 允许沙箱文档打开新窗口，并且不强制要求新窗口设置沙箱标记。
- `allow-presentation`: 允许嵌入者控制是否iframe启用一个展示会话。
- `allow-same-origin`: 允许将内容作为普通来源对待。如果未使用该关键字，嵌入的内容将被视为一个独立的源。
- `allow-scripts`: 允许嵌入的浏览上下文运行脚本（但不能window创建弹窗）。如果该关键字未使用，这项操作不可用。
- `allow-top-navigation`: 嵌入的页面的上下文可以导航（加载）内容到顶级的浏览上下文环境（browsing context）。如果未使用该关键字，这个操作将不可用。
