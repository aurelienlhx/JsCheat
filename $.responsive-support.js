(function($,document){
	$(document).ready(function(){
		var w = $(window).outerWidth();
		var lastW=null;
		$(window).on('resize',function(e){
			w = $(window).outerWidth();
			if(w<=768 && (lastW>768||!lastW)){
				$(document).trigger('mobileView');
			}
			else if(w>768 && (lastW<=768||!lastW)){
				$(document).trigger('desktopView');
			}else{
				// console.log('none');
			}
			lastW=w;
		})
		$(window).trigger('resize');
	});
})(jQuery,document);
