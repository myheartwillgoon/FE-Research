# JavaScript 注意点

* 连等赋值,后面的变量都是全局变量. var a=b=c=1 ,b,c都是全局变量,因为是从右至左计算赋值的.
* Promise then(resolve,reject)只能传递一个参数值,finally无参数传递.

### BOM
* location.origin

### DOM
* 滚动加载判断,Mac chrome 是documentElement.scrollTop, webview是document.body.scrollTop

### Event
* 用zepto的on代理绑定非a标签的click事件,在IOS上不起作用

### webview
* 一个webview打开另一个webview, sessionStorage是不能读取的.localStorage则可以.

## 兼容性
* IE8及其以下不支持console.log
* IE10 不支持console.log.apply方法
* safari唤醒app会出现弹层提示(安装和非安装都提示)
* safari无痕模式会删除非回话cookie
