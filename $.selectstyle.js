jQuery.fn.selectstyle = function(){

	return $(this).each(function(){
		if(this.tagName !== "SELECT")
			throw new Error('Select style enhancement must be used on a select tag only');

		var ns = $(this).attr('data-selectstyle-ns') || null;
		var placeholder = $(this).attr('data-selectstyle-placeholder') || '';
		var select = new selectStyle(this,ns,placeholder);

		select.$element.insertBefore(this);
		select.$element.trigger('ready');

	})
}

var selectStyle = (function(){

	var template_select;
	var template_trigger;
	var template_placeholder;
	var template_selected;
	var template_list;
	var template_option;

	function selectStyle(original,ns,placeholder){
		var self=this;
		this.placeholder = placeholder;
		this.ns = ns;

		template_select='<div class="selectstyle__select'+(ns?' '+ns+'__select':'')+'"></div>';
		template_trigger = '<div class="selectstyle__trigger'+(ns?' '+ns+'__trigger':'')+'"></div>';
		template_placeholder = '<span class="selectstyle__placeholder'+(ns?' '+ns+'__placeholder':'')+'">&nbsp;'+placeholder+'</span>';
		template_selected = '<span class="selectstyle__selected'+(ns?' '+ns+'__selected':'')+'"></span>';
		template_list='<ul class="selectstyle__list'+(ns?' '+ns+'__list':'')+'"></ul>';
		template_option='<li class="selectstyle__option'+(ns?' '+ns+'__option':'')+'"></li>';
		
		this.original = original;
		this.selectedIndex = this.original.selectedIndex;

		this.$element=$('<div class="selectstyle'+(ns?' '+ns:'')+'" tabindex=""></div>');
		this.$element.on('trigger:click',function(){
			self.$element.toggleClass('is-open');

		});
		this.$element.on('option:click',function(){
			self.close();
		});
		//blur is possible thanks to the tabindex attr
		this.$element.on('blur',function(e){
			self.close();
		})

		var $select = buildSelect.call(this);
		var $trigger = buildTrigger.call(this);
		var $list = buildList.call(this);
		
		$select.append($trigger).append($list);
		this.$element.append($select);

		// this.$element.on('ready',function(){
		// 	var maxOptionWidth=0;
		
		// 	console.log(self.$options);
		// 	for(var i in self.$options){
		// 		(function(i){

		// 			var $option = self.$options[i];
		// 			var optionWidth = $option.width();
		// 			console.log(i,$option,optionWidth);
		// 			if(optionWidth>maxOptionWidth)
		// 				maxOptionWidth = optionWidth;
		// 		})(i)
		// 	}
		// 	// console.log(maxOptionWidth);
		// 	self.$element.width(maxOptionWidth || 'auto');
		// })
	}
		

	function buildSelect(){
		var $select = $(template_select);
		copyAttributes(this.original,$select[0]);
		return $select;
	}

	function buildTrigger(){
		var self=this;
		var $trigger=$(template_trigger);
		var $placeholder = $(template_placeholder);
		var $selected = $(template_selected);
		
		$trigger.on('click',function(){$trigger.trigger('trigger:click');});
		$trigger.append($placeholder).append($selected);
		
		this.$element.on('option:click',function(e,$option,selectedIndex){
			this.selectedIndex=selectedIndex;
			$placeholder.hide();
			$selected.html($option.html());
		});
		return $trigger;
	}

	function buildList(){
		var self=this;
		self.$options = [];
		var options = this.original.children;
		var $list=$(template_list);
		for(var i=0; i<options.length;i++){
			var option=options[i];
			if(option.disabled)
				continue;

			var $option = $(template_option);
			copyAttributes(option,$option[0],['name','value','selected','data-selectstyle-option']);

			var custom_content = $(option).attr('data-selectstyle-option');
			if(custom_content)
				$option.html(custom_content);
			else
				$option.text(option.textContent);

			(function(selectedIndex,$option){
				$option.on('click',function(){
					var $this = $(this);
					if(self.$option)
						self.$option.removeClass('is-selected');
					self.$option = $this;
					self.$option.addClass('is-selected');
					self.original.selectedIndex = selectedIndex;
					$this.trigger('option:click',[$option,selectedIndex]);
					$(self.original).change();
				})
				
			})(i,$option);
			$list.append($option);

			if(option.selected && !this.placeholder){
				(function(selectedIndex,$option){
					self.$element.on('ready',function(){
						var $this = $(this);
						$this.trigger('option:click',[$option,selectedIndex]);
					})
				})(i,$option)
			}

			self.$options.push($option);
		}
		return $list;
	}

	function copyAttributes(from,to,except){
		var except = typeof except == "object" ? except : [];

		for(var i=0; i<from.attributes.length;i++){
			var att = from.attributes[i];

			if(-1 < except.indexOf(att.name))
				continue;

			if(to.attributes[att.name]){
				to.setAttribute(att.name, (to.attributes[att.name].value+" "+att.value));
			}
			else
				to.setAttribute(att.name,att.value);
		}
	}

	selectStyle.prototype.close = function(){
		this.$element.removeClass('is-open');
	}
	selectStyle.prototype.open = function(){
		this.$element.addClass('is-open');
	}

	return selectStyle;
})()
