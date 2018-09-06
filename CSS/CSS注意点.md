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
