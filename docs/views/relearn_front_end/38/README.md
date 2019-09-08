---
title: 浏览器API（三十八）
date: 2019-07-03
tags:
 - JavaScript
 - 浏览器
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/37/
next: /views/relearn_front_end/39/
---

## 一、介绍

> 这一篇主要学习一下浏览器的API。

## 二、JavaScript 中规定的 API

### 2.1、window 对象的属性

> 通过`Object.getOwnPropertyNames(window)`可以获取。

```js
// 输出结果
["Object", "Function", "Array", "Number", "parseFloat", "parseInt", "Infinity", "NaN", "undefined", "Boolean", "String", "Symbol", "Date", "Promise", "RegExp", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "JSON", "Math", "console", "Intl", "ArrayBuffer", "Uint8Array", "Int8Array", …]
```

### 2.2、过滤 JavaScript 标准规定的属性

```js
{
    let js = new Set();
    let objects = ["BigInt", "BigInt64Array", "BigUint64Array", "Infinity", "NaN", "undefined", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Array", "Date", "RegExp", "Promise", "Proxy", "Map", "WeakMap", "Set", "WeakSet", "Function", "Boolean", "String", "Number", "Symbol", "Object", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Atomics", "JSON", "Math", "Reflect", "escape", "unescape"];
    objects.forEach(o => js.add(o));
    let names = Object.getOwnPropertyNames(window)
    names = names.filter(e => !js.has(e));
}
```

```js
// 输出结果
["console", "Intl", "ByteLengthQueuingStrategy", "CountQueuingStrategy", "webkitRTCPeerConnection", "webkitMediaStream", "WebSocket", "WebGLContextEvent", "WaveShaperNode", "TextEncoderStream", "TextEncoder", "TextDecoderStream", …]
```

## 三、DOM 中的元素构造器

### 3.1、用JavaScript的prototype来过滤构造器

```js
// 把所有Node的子类都过滤掉，Node本身也过滤掉
names = names.filter( e => {
    try {
        return !(window[e].prototype instanceof Node)
    } catch(err) {
        return true;
    }
}).filter( e => e != "Node")
```

## 四、Window 对象上的属性

### 4.1、window对象的定义

[具体参考地址](https://html.spec.whatwg.org/#window)

> [IDL](https://baike.baidu.com/item/IDL/34727?fr=aladdin)是Interface description language的缩写，指接口描述语言，是CORBA规范的一部分，是跨平台开发的基础。IDL建立起了两个不同操作系统间通信的桥梁。CORBA接口作为服务对象功能的详细描述，封装了服务对象提供服务方法的全部信息，客户对象利用该接口获取服务对象的属性、访问服务对象中的方法。

```IDL
// The Window object
[Global=Window,
 Exposed=Window,
 LegacyUnenumerableNamedProperties]
interface Window : EventTarget {
  // the current browsing context
  [Unforgeable] readonly attribute WindowProxy window;
  [Replaceable] readonly attribute WindowProxy self;
  [Unforgeable] readonly attribute Document document;
  attribute DOMString name; 
  [PutForwards=href, Unforgeable] readonly attribute Location location;
  readonly attribute History history;
  readonly attribute CustomElementRegistry customElements;
  [Replaceable] readonly attribute BarProp locationbar;
  [Replaceable] readonly attribute BarProp menubar;
  [Replaceable] readonly attribute BarProp personalbar;
  [Replaceable] readonly attribute BarProp scrollbars;
  [Replaceable] readonly attribute BarProp statusbar;
  [Replaceable] readonly attribute BarProp toolbar;
  attribute DOMString status;
  void close();
  readonly attribute boolean closed;
  void stop();
  void focus();
  void blur();

  // other browsing contexts
  [Replaceable] readonly attribute WindowProxy frames;
  [Replaceable] readonly attribute unsigned long length;
  [Unforgeable] readonly attribute WindowProxy? top;
  attribute any opener;
  [Replaceable] readonly attribute WindowProxy? parent;
  readonly attribute Element? frameElement;
  WindowProxy? open(optional USVString url = "about:blank", optional DOMString target = "_blank", optional [TreatNullAs=EmptyString] DOMString features = "");
  getter object (DOMString name);
  // Since this is the global object, the IDL named getter adds a NamedPropertiesObject exotic
  // object on the prototype chain. Indeed, this does not make the global object an exotic object.
  // Indexed access is taken care of by the WindowProxy exotic object.

  // the user agent
  readonly attribute Navigator navigator; 
  [SecureContext] readonly attribute ApplicationCache applicationCache;

  // user prompts
  void alert();
  void alert(DOMString message);
  boolean confirm(optional DOMString message = "");
  DOMString? prompt(optional DOMString message = "", optional DOMString default = "");
  void print();

  void postMessage(any message, USVString targetOrigin, optional sequence<object> transfer = []);
  void postMessage(any message, optional WindowPostMessageOptions options);
};
Window includes GlobalEventHandlers;
Window includes WindowEventHandlers;

dictionary WindowPostMessageOptions : PostMessageOptions {
  USVString targetOrigin = "/";
};
```

```js
// 这个 window 接口中的函数和属性
 window,self,document,name,location,history,
 customElements,locationbar,menubar, personalbar,
 scrollbars,statusbar,toolbar,status,close,closed,
 stop,focus, blur,frames,length,top,opener,parent,
 frameElement,open,navigator,applicationCache,alert,
 confirm,prompt,print,postMessage
```

### 4.2、过滤window的属性和函数

1、过滤上面4.1提到的函数和属性

```js
{
    let names = Object.getOwnPropertyNames(window)
    let js = new Set();
    let objects = ["BigInt", "BigInt64Array", "BigUint64Array", "Infinity", "NaN", "undefined", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Array", "Date", "RegExp", "Promise", "Proxy", "Map", "WeakMap", "Set", "WeakSet", "Function", "Boolean", "String", "Number", "Symbol", "Object", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Atomics", "JSON", "Math", "Reflect", "escape", "unescape"];
    objects.forEach(o => js.add(o));
    names = names.filter(e => !js.has(e));

    names = names.filter( e => {
        try {
            return !(window[e].prototype instanceof Node)
        } catch(err) {
            return true;
        }
    }).filter( e => e != "Node")

    let windowprops = new Set();
    objects = ["window", "self", "document", "name", "location", "history", "customElements", "locationbar", "menubar", " personalbar", "scrollbars", "statusbar", "toolbar", "status", "close", "closed", "stop", "focus", " blur", "frames", "length", "top", "opener", "parent", "frameElement", "open", "navigator", "applicationCache", "alert", "confirm", "prompt", "print", "postMessage", "console"];
    objects.forEach(o => windowprops.add(o));
    names = names.filter(e => !windowprops.has(e));
}
```

2、过滤掉所有事件（也就是 on 开头的属性）

```js
names = names.filter( e => !e.match(/^on/))
```

3、过滤掉webkit前缀的私有属性

```js
names = names.filter( e => !e.match(/^webkit/))
```

4、过滤掉html标准中还能找到的所有接口

```js
let interfaces = new Set();
objects = ["ApplicationCache", "AudioTrack", "AudioTrackList", "BarProp", "BeforeUnloadEvent", "BroadcastChannel", "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D", "CloseEvent", "CustomElementRegistry", "DOMStringList", "DOMStringMap", "DataTransfer", "DataTransferItem", "DataTransferItemList", "DedicatedWorkerGlobalScope", "Document", "DragEvent", "ErrorEvent", "EventSource", "External", "FormDataEvent", "HTMLAllCollection", "HashChangeEvent", "History", "ImageBitmap", "ImageBitmapRenderingContext", "ImageData", "Location", "MediaError", "MessageChannel", "MessageEvent", "MessagePort", "MimeType", "MimeTypeArray", "Navigator", "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "PageTransitionEvent", "Path2D", "Plugin", "PluginArray", "PopStateEvent", "PromiseRejectionEvent", "RadioNodeList", "SharedWorker", "SharedWorkerGlobalScope", "Storage", "StorageEvent", "TextMetrics", "TextTrack", "TextTrackCue", "TextTrackCueList", "TextTrackList", "TimeRanges", "TrackEvent", "ValidityState", "VideoTrack", "VideoTrackList", "WebSocket", "Window", "Worker", "WorkerGlobalScope", "WorkerLocation", "WorkerNavigator"];
objects.forEach(o => interfaces.add(o));
names = names.filter(e => !interfaces.has(e));
```

## 五、其它属性

> 这些既不属于 Window 对象，又不属于 JavaScript 语言的 Global 对象的属性，它们究竟是什么呢？

```js
// 抽象过滤代码
function filterOut(names, props) {
    let set = new Set();
    props.forEach(o => set.add(o));
    return names.filter(e => !set.has(e));
}
```

### 5.1、ECMAScript 2018 Internationalization API

[ECMA402相关参考内容](http://www.ecma-international.org/ecma-402/5.0/index.html#Title)

ECMA402 中，只有一个全局属性 Intl，也把它过滤掉：

```js
names = names.filter(e => e != "Intl")
```

### 5.2、Streams 标准

**属性： ByteLengthQueuingStrategy。**

[WHATWG 的 Streams 标准](https://streams.spec.whatwg.org/#blqs-class)

Streams标准中还有一些其他属性，把它跟`ByteLengthQueuingStrategy`一起过滤掉

```js
names = filterOut(names, ["ReadableStream", "ReadableStreamDefaultReader", "ReadableStreamBYOBReader", "ReadableStreamDefaultController", "ReadableByteStreamController", "ReadableStreamBYOBRequest", "WritableStream", "WritableStreamDefaultWriter", "WritableStreamDefaultController", "TransformStream", "TransformStreamDefaultController", "ByteLengthQueuingStrategy", "CountQueuingStrategy"]);
```

### 5.3、WebGL

**属性： WebGLContext​Event。**

[WebGL标准](https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15)

同样的过滤操作：

```js
names = filterOut(names, ["WebGLContextEvent","WebGLObject", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLTexture", "WebGLUniformLocation", "WebGLActiveInfo", "WebGLShaderPrecisionFormat", "WebGLRenderingContext"]);
```

### 5.4、Web Audio API

**属性： WebGLConteWeb Audio API。**

[Web Audio API标准](https://www.w3.org/TR/webaudio/)

其中有大量属性，过滤掉

```js
names = filterOut(names, ["AudioContext", "AudioNode", "AnalyserNode", "AudioBuffer", "AudioBufferSourceNode", "AudioDestinationNode", "AudioParam", "AudioListener", "AudioWorklet", "AudioWorkletGlobalScope", "AudioWorkletNode", "AudioWorkletProcessor", "BiquadFilterNode", "ChannelMergerNode", "ChannelSplitterNode", "ConstantSourceNode", "ConvolverNode", "DelayNode", "DynamicsCompressorNode", "GainNode", "IIRFilterNode", "MediaElementAudioSourceNode", "MediaStreamAudioSourceNode", "MediaStreamTrackAudioSourceNode", "MediaStreamAudioDestinationNode", "PannerNode", "PeriodicWave", "OscillatorNode", "StereoPannerNode", "WaveShaperNode", "ScriptProcessorNode", "AudioProcessingEvent"]);
```

### 5.5、Encoding 标准

**属性： TextDecoder。**

[WHATWG 的标准，Encoding](https://encoding.spec.whatwg.org/#dom-textencoder)

```js
names = filterOut(names, ["TextDecoder", "TextEncoder", "TextDecoderStream", "TextEncoderStream"]);
```

### 5.6、Web Background Synchronization

**属性： SyncManager。**

它并没有被标准化，[来源文档](https://wicg.github.io/BackgroundSync/spec/#sync-manager-interface)

### 5.7、Web Cryptography API

**属性：SubtleCrypto。**

[Web Cryptography API，也是 W3C 的标准](https://www.w3.org/TR/WebCryptoAPI/)

```js
// crypto为window的拓展
names = filterOut(names, ["CryptoKey", "SubtleCrypto", "Crypto", "crypto"]);
```

### 5.8、Media Source Extensions

**属性：SourceBufferList。**

[参考网址](https://www.w3.org/TR/media-source/)

```js
names = filterOut(names, ["MediaSource", "SourceBuffer", "SourceBufferList"]);
```

### 5.9、The Screen Orientation API

**属性：ScreenOrientation。**

[参考网址](https://www.w3.org/TR/screen-orientation/)

## 拓展

- ECMA402 标准来自 ECMA
- Encoding 标准来自 WHATWG
- WebGL 标准来自 Khronos
- Web Cryptography 标准来自 W3C
- 还有些 API，根本没有被标准化
