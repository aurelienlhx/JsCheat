(function($,document){
	$(document).ready(function(){
		$('a[href^="#"]').on('click',function(e){
			e.preventDefault();
			var anchor=this.href.substring(this.href.indexOf('#'),this.href.length);
			var $target = $(anchor);
			if($target.length>0){
				$('html,body').animate({
					scrollTop:$target.offset().top-100
				},1000)
			}
		})
	})
})(jQuery,document)
