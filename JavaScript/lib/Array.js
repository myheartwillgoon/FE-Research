// 随机化/混排数组
Array.prototype.shuffle = function(){
  return this.sort(function(a,b){
    return Math.random() > 0.5 ? 1:-1
  })
}
// 获取指定位数的,可以随机整个数组后,再slice指定数.
Array.prototype.shuffle = function(){
  
}
