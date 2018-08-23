// 随机化/混排数组
export function shuffle(arr) {
  return arr.sort(function(a,b){
    return Math.random() > 0.5 ? 1:-1
  })
}

export function uniqeByKey(arr, key) {
    // arr = arr.concat(arr);
    if (Array.isArray(arr) && arr.length > 1) {
        const keys = arr.map(item => item[key]);
        let pos, i = 0;
        keys.forEach((item, index)=> {
            pos = keys.indexOf(item, index+1)
            while (pos > 0) {
                arr.splice(pos - i, 1);
                ++i;
                pos = keys.indexOf(item, pos+1);
            }
        })
    } 
    return arr;
}
