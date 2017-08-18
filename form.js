
/**
 * Add hack on browser which do not support placeholder attribute
 * @require jQuery
 * @param jQuery $
 * 
 */
(function($){
	$(document).ready(function(){
		
		if(!('placeholder' in  document.createElement('input'))))
		{
			$("input[type=text],textarea").each(function(i){
				var placeholder = $(this).attr("placeholder") || false;
				if(!placeholder) return;

				if(!$(this).val()) $(this).val(placeholder);
				$(this).focus(function(){if($(this).val()==placeholder || $(this).val()=="")$(this).val("")})
				$(this).blur(function(){if($(this).val()==placeholder || $(this).val()=="")$(this).val(placeholder)})
			});
		}
	});
})(jQuery);
