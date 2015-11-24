// detect IE version
var IE={
	ies:"",ie6:"",ie7:"",ie8:"",ie9:"",iel7:"",iel8:"",iel9:"",
	init:function(){
		IE.ies=IE.isIEs()
		IE.ie6=IE.isIE(6)
		IE.ie7=IE.isIE(7)
		IE.ie8=IE.isIE(8)
		IE.ie9=IE.isIE(9)
		IE.iel7=IE.lteIE(7)
		IE.iel8=IE.lteIE(8)
		IE.iel9=IE.lteIE(9)
	},
	isIE:function(v){
		var tester = document.createElement('div');
		v=Boolean(v)?v:"";
		tester.innerHTML = '<!--[if  IE '+v+']><i></i><![endif]-->';
		IEs = tester.getElementsByTagName('i')[0];
		return IEs;
	},
	isIEs:function(){
		var tester = document.createElement('div');

		tester.innerHTML = '<!--[if  IE]><i></i><![endif]-->';
		IEs = tester.getElementsByTagName('i')[0];
		return IEs;
	},
	lteIE:function(v){
		var tester = document.createElement('div');
		v=Boolean(v)?v:"";
		tester.innerHTML = '<!--[if lte IE '+v+']><i></i><![endif]-->';
		IEs = tester.getElementsByTagName('i')[0];
		return IEs;
	}

};
IE.init()
