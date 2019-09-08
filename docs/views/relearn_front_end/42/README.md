---
title: 用代码挖掘W3C中的CSS属性（四十二）
date: 2019-08-05
tags:
 - Css
categories:
 - 重学前端专栏
prev: /views/relearn_front_end/41/
next: /views/relearn_front_end/43/
---

## 一、浏览器中已经实现的属性

```js
Object.keys(document.body.style).filter(e => !e.match(/^webkit/))
```

这段代码枚举出了 `document.body.style `上的所有属性，并且去掉 `webkit` 前缀的私有属性。

```js
alignContent, alignItems, alignSelf, alignmentBaseline, all, animation, animationDelay, animationDirection, animationDuration, animationFillMode, animationIterationCount, animationName, animationPlayState, animationTimingFunction, backfaceVisibility, background, backgroundAttachment, backgroundBlendMode, backgroundClip, backgroundColor, backgroundImage, backgroundOrigin, backgroundPosition, backgroundPositionX, backgroundPositionY, backgroundRepeat, backgroundRepeatX, backgroundRepeatY, backgroundSize, baselineShift, blockSize, border, borderBlockEnd, borderBlockEndColor, borderBlockEndStyle, borderBlockEndWidth, borderBlockStart, borderBlockStartColor, borderBlockStartStyle, borderBlockStartWidth, borderBottom, borderBottomColor, borderBottomLeftRadius, borderBottomRightRadius, borderBottomStyle, borderBottomWidth, borderCollapse, borderColor, borderImage, borderImageOutset, borderImageRepeat, borderImageSlice, borderImageSource, borderImageWidth, borderInlineEnd, borderInlineEndColor, borderInlineEndStyle, borderInlineEndWidth, borderInlineStart, borderInlineStartColor, borderInlineStartStyle, borderInlineStartWidth, borderLeft, borderLeftColor, borderLeftStyle, borderLeftWidth, borderRadius, borderRight, borderRightColor, borderRightStyle, borderRightWidth, borderSpacing, borderStyle, borderTop, borderTopColor, borderTopLeftRadius, borderTopRightRadius, borderTopStyle, borderTopWidth, borderWidth, bottom, boxShadow, boxSizing, breakAfter, breakBefore, breakInside, bufferedRendering, captionSide, caretColor, clear, clip, clipPath, clipRule, color, colorInterpolation, colorInterpolationFilters, colorRendering, columnCount, columnFill, columnGap, columnRule, columnRuleColor, columnRuleStyle, columnRuleWidth, columnSpan, columnWidth, columns, contain, content, counterIncrement, counterReset, cursor, cx, cy, d, direction, display, dominantBaseline, emptyCells, fill, fillOpacity, fillRule, filter, flex, flexBasis, flexDirection, flexFlow, flexGrow, flexShrink, flexWrap, float, floodColor, floodOpacity, font, fontDisplay, fontFamily, fontFeatureSettings, fontKerning, fontSize, fontStretch, fontStyle, fontVariant, fontVariantCaps, fontVariantEastAsian, fontVariantLigatures, fontVariantNumeric, fontVariationSettings, fontWeight, gap, grid, gridArea, gridAutoColumns, gridAutoFlow, gridAutoRows, gridColumn, gridColumnEnd, gridColumnGap, gridColumnStart, gridGap, gridRow, gridRowEnd, gridRowGap, gridRowStart, gridTemplate, gridTemplateAreas, gridTemplateColumns, gridTemplateRows, height, hyphens, imageRendering, inlineSize, isolation, justifyContent, justifyItems, justifySelf, left, letterSpacing, lightingColor, lineBreak, lineHeight, listStyle, listStyleImage, listStylePosition, listStyleType, margin, marginBlockEnd, marginBlockStart, marginBottom, marginInlineEnd, marginInlineStart, marginLeft, marginRight, marginTop, marker, markerEnd, markerMid, markerStart, mask, maskType, maxBlockSize, maxHeight, maxInlineSize, maxWidth, maxZoom, minBlockSize, minHeight, minInlineSize, minWidth, minZoom, mixBlendMode, objectFit, objectPosition, offset, offsetDistance, offsetPath, offsetRotate, opacity, order, orientation, orphans, outline, outlineColor, outlineOffset, outlineStyle, outlineWidth, overflow, overflowAnchor, overflowWrap, overflowX, overflowY, overscrollBehavior, overscrollBehaviorX, overscrollBehaviorY, padding, paddingBlockEnd, paddingBlockStart, paddingBottom, paddingInlineEnd, paddingInlineStart, paddingLeft, paddingRight, paddingTop, page, pageBreakAfter, pageBreakBefore, pageBreakInside, paintOrder, perspective, perspectiveOrigin, placeContent, placeItems, placeSelf, pointerEvents, position, quotes, r, resize, right, rowGap, rx, ry, scrollBehavior, scrollMargin, scrollMarginBlock, scrollMarginBlockEnd, scrollMarginBlockStart, scrollMarginBottom, scrollMarginInline, scrollMarginInlineEnd, scrollMarginInlineStart, scrollMarginLeft, scrollMarginRight, scrollMarginTop, scrollPadding, scrollPaddingBlock, scrollPaddingBlockEnd, scrollPaddingBlockStart, scrollPaddingBottom, scrollPaddingInline, scrollPaddingInlineEnd, scrollPaddingInlineStart, scrollPaddingLeft, scrollPaddingRight, scrollPaddingTop, scrollSnapAlign, scrollSnapStop, scrollSnapType, shapeImageThreshold, shapeMargin, shapeOutside, shapeRendering, size, speak, src, stopColor, stopOpacity, stroke, strokeDasharray, strokeDashoffset, strokeLinecap, strokeLinejoin, strokeMiterlimit, strokeOpacity, strokeWidth, tabSize, tableLayout, textAlign, textAlignLast, textAnchor, textCombineUpright, textDecoration, textDecorationColor, textDecorationLine, textDecorationSkipInk, textDecorationStyle, textIndent, textOrientation, textOverflow, textRendering, textShadow, textSizeAdjust, textTransform, textUnderlinePosition, top, touchAction, transform, transformBox, transformOrigin, transformStyle, transition, transitionDelay, transitionDuration, transitionProperty, transitionTimingFunction, unicodeBidi, unicodeRange, userSelect, userZoom, vectorEffect, verticalAlign, visibility, whiteSpace, widows, width, willChange, wordBreak, wordSpacing, wordWrap, writingMode, x, y, zIndex, zoom
```

## 二、找出 W3C 标准中的 CSS 属性

> 爬虫的思路是：用 `iframe` 来加载所有标准的网页，然后用 `JavaScript` 找出它们中间定义的属性。

### 2.1、第一步：找到 CSS 相关的标准

[参考网址：https://www.w3.org/TR/?tag=css](https://www.w3.org/TR/?tag=css)

从参考网址页面里抓取所有的标准名称和链接。

```js
// 可以得到一个Nodelist
document.querySelectorAll("#container li[data-tag~=css] h2:not(.Retired):not(.GroupNote)")
```

![css链接列表](https://static001.geekbang.org/resource/image/3b/be/3bc9ec8fad753e4a7af9db27bb1e25be.png)

### 2.2、第二步：分析每个标准中的 CSS 属性

打开第一个标准，[https://www.w3.org/TR/2019/WD-css-lists-3-20190425/](https://www.w3.org/TR/2019/WD-css-lists-3-20190425/)，找出属性定义：

> 经过分析发现，属性总是在一个具有 `propdef` 的容器中，有属性 `data-dfn-type` 值为 `property`。

```js
document.querySelectorAll(".propdef [data-dfn-type=property]")
```

对于第一个标准 `CSS  Lists  Module  Level 3` 得到了这个列表：

```
list-style-image
list-style-type
list-style-position
list-style
marker-side
counter-reset
counter-set
counter-increment
```

用`iframe`打开这些标准：

```js

var iframe = document.createElement("iframe");

document.body.appendChild(iframe);

iframe.src = "https://www.w3.org/TR/2019/WD-css-lists-3-20190425/"

function happen(element, type){
  return new Promise(resolve => {
    element.addEventListener(type, resolve, {once: true})
  })
}

happen(iframe, "load").then(function(){
  //Array.prototype.map.call(document.querySelectorAll("#container li[data-tag~=css] h2"), e=> e.children[0].href + " |\t" + e.children[0].textContent).join("\n")
  console.log(iframe.contentWindow);
})
async function start(){
  var output = []
  for(let standard of  Array.prototype.slice.call(document.querySelectorAll("#container li[data-tag~=css] h2:not(.Retired):not(.GroupNote)"))) {
    console.log(standard.children[0].href);
    iframe.src = standard.children[0].href;
    await happen(iframe, "load");
    var properties = Array.prototype.map.call(iframe.contentWindow.document.querySelectorAll(".propdef [data-dfn-type=property]"), e => e.childNodes[0].textContent);
    if(properties.length)
        output.push(standard.children[0].textContent + " | " + properties.join(", "));
  }
  console.log(output.join("\n"))
}
start();
```

winter帮我们整理成了一张列表图：

![standard-properties列表图](https://static001.geekbang.org/resource/image/ab/71/ab03527b7b40b594bb55f6bfd523d271.jpg)
