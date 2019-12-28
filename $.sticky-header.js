(function($,window,document,header){
	$(document).ready(function(){
		var $header = $(header);
        if($header.length==0)
            return;
		var $window = $(window);
		var start = $header.offset().top + $header.height();
		$window.on('scroll',function(){
			if($window.scrollTop()>start)
				$header.addClass('is-sticky');
			else
				$header.removeClass('is-sticky');
		})
	})
})(jQuery,window,document,'[data-sticky=true]');
