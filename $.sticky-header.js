(function($,window,document,header){
	$(document).ready(function(){
		var $header = $(header);
		var $window = $(window);
		var start = $header.offset().top + $header.height();
		$window.on('scroll',function(){
			if($window.scrollTop()>start)
				$header.addClass('is-sticky');
			else
				$header.removeClass('is-sticky');
		})
	})
})(jQuery,window,document,'#header');
