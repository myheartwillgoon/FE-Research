function callApp(schema) {
   if (lib.env.isApp) return
   if (lib.env.isAndroid) {
       $('body').append('<iframe src="'+schema+'" style="width:0;height:0;display:none;">')
   } else if (lib.env.isIos) {
       var b = document.createElement('a');
           b.setAttribute('href', schema),
           b.style.display = 'none',
           document.body.appendChild(b);
           var c = document.createEvent('HTMLEvents');
           c.initEvent('click', !1, !1),
           b.dispatchEvent(c);
   }
}
