# HTML相关注意点

* a标签包含块级元素时,注意不能包含交互元素,如嵌套a标签会出现短路.表单button类;
* 低版本IE兼容H5新标签时,打印是不识别的,这也是html5shiv.js那么大的原因;
* input 设置display为block(对其无作用?),宽度不是拉伸模型,需手动设置width:100%;
* check+icons 技术应用后,input宽高已不重要;
* ensp表示1/2个中文字符宽度空格,emsp表示1个中文字符宽度空格;
