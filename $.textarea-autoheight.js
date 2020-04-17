(function(){
  $(document).on('input paste cut change drop keydown','.js-textarea-autoheight',function(e){
			resize(this.children[0]);
		});

		function resizeTextareas(){
			$('.js-textarea-autoheight').each(function(){
				resize(this.children[0]);
			})
		}

		function resize(textarea){
			setTimeout(function(){
				textarea.style.height = 'auto';
				if(textarea.scrollHeight>0)
					textarea.style.height = textarea.scrollHeight+'px';
			},0);
		}
})()
