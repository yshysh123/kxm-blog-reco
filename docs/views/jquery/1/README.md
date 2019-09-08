---
title: Jquery相关方法总结
date: 2019-09-08
tags:
 - Jquery
 - JavaScript
categories:
 - Jquery专栏
---

::: warning
本文是我从事qui表单个性化开发关于Jquery方面的总结。
:::

## 1、获取链接参数方法

```js
// 获取当前链接的参数
function LGetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
}
// 获取父链接的参数
function PGetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.parent.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
}
```

## 2、ajax的通用函数

```js
function commonAjax(url, dataJson, callback, errorcb) {
    $.ajax({
        url: url,
        type: "post",
        // async: false,
        dataType: "json",
        data: dataJson,
        success: function(res) {
            if (+res.status === 200) {
                callback(res);
            } else {
                errorcb(res);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}
```

## 3、判断当前父级是否存在某个方法

```js
// 比如有个方法叫做：isAPI
if(typeof window.parent.isAPI === 'function') {
    window.parent.isAPI(); // 当前层级执行
}
```

## 4、关于xml数据的拼接问题

### 4.1、将获取到的xml数据转为dom元素

```js
$("#xml").html(xml);
```

### 4.2、假设要删除某条id 为 asdfghjkl 的xml子数据

```js
// 在上面的基础上，遍历xml数据里的col标签找到唯一的uuid与之匹配
$("col").each(function(index, value) {
    if($("col").eq(index).text() == 'asdfghjkl') {
        // 匹配到了就删掉包裹这一条数据的parentcols
        $("col").eq(index).parents('parentcols').remove();
    }
})
```

### 4.3、对获取的到的dom数据进行xml化

```js
// 删掉之后获取数据
var xml_pre = $("#xml").html();
// 然后恢复成xml之前的样子
var xml_new = xml_pre.replace('<!--?xml version="1.0" encoding="GBK"?-->', '<?xml version="1.0" encoding="GBK"?>');
xml_new = xml_new.replace(/parentlist/g, 'ParentList');
xml_new = xml_new.replace(/parentcols/g, 'ParentCols');
xml_new = xml_new.replace(/col/g, 'Col');
...
// 在赋值回去
$("#xml").text(xml_new);
```

### 4.4、获取保存xml数据

```js
$("#xml").text();
```

## 5、关于类跟属性的添加删除

```js
if ($('#checked').prop("checked")) {
    $('input[name*="abc"]').addClass('class').removeAttr("attr");
} else {
    $('input[name*="abc"]').removeClass('class').attr("attr",'attrValue');
}
```

## 6、encode64加密

```js
var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
function encode64(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
            + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
}
```

## 7、随机生成UUID

```js
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    uuid = uuid.split("-").join("");
    return uuid;
}
```
