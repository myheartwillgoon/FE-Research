# JavaScript 注意点

* 连等赋值,后面的变量都是全局变量. var a=b=c=1 ,b,c都是全局变量,因为是从右至左计算赋值的.
* Promise then(resolve,reject)只能传递一个参数值,finally无参数传递.


### DOM
* 滚动加载判断,Mac chrome 是documentElement.scrollTop, webview是document.body.scrollTop

### webview
* 一个webview打开另一个webview, sessionStorage是不能读取的.localStorage则可以.
