# CSS 注意点



## form
* 去掉type number的上下箭头
```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"] {
    -moz-appearance: textfield;
}
```

## 移动端
* 移动端a标签 or button类点击出现 在元算上面显示高光现象.`html { -webkit-tap-highlight-color: transparent;}`




## IE
* IE7/8 支持first-child,但不支持last-child伪类.
* IE6,7的hasLayout特性触发,设置width,height,float,zoom.
