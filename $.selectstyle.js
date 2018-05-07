(function($){


jQuery.fn.selectstyle = function(){

	return $(this).each(function(){
		if(this.tagName !== "SELECT")
			throw new Error('Select style enhancement must be used on a select tag only');

		var $this=$(this);
		var ns = $this.attr('data-selectstyle-ns') || null;
		var placeholder = $this.attr('data-selectstyle-placeholder') || '';
		var select = new selectStyle(this,ns,placeholder);

		$this.data('selectstyle',select);
		select.$element.insertBefore(this);
		select.$element.trigger('ready');

	})
}

var selectStyle = (function(){

	function selectStyle(original,ns,placeholder){
		var self=this;
		this.placeholder = placeholder;
		this.ns = ns;
		this.disabled=false;

		this.template_select='<div class="selectstyle__select'+(ns?' '+ns+'__select':'')+'"></div>';
		this.template_trigger = '<div class="selectstyle__trigger'+(ns?' '+ns+'__trigger':'')+'"></div>';
		this.template_placeholder = '<span class="selectstyle__placeholder'+(ns?' '+ns+'__placeholder':'')+'">&nbsp;'+placeholder+'</span>';
		this.template_selected = '<span class="selectstyle__selected'+(ns?' '+ns+'__selected':'')+'"></span>';
		this.template_list='<ul class="selectstyle__list'+(ns?' '+ns+'__list':'')+'"></ul>';
		this.template_option='<li class="selectstyle__option'+(ns?' '+ns+'__option':'')+'"></li>';
		
		this.original = original;
		this.selectedIndex = this.original.selectedIndex;
		
		//observe changing html/option and auto update selectstyle
		var mutationObserver = new MutationObserver(function(records,observer){
			for (var index = 0; index < records.length; index++) {
		    var record = records[index];
		    if (record.type === 'childList' && record.addedNodes.length) { 
		      hasUpdates = true;
		      break;
		    }
		  }
		  if (hasUpdates) self.update();
		});
		mutationObserver.observe(this.original,{childList:true,characterData:false});

		this.$element=$('<div class="selectstyle'+(ns?' '+ns:'')+'" tabindex="-1"></div>');
		this.$element.on('trigger:click',function(){
			if(self.disabled)
				return;
			self.$element.toggleClass('is-open');

		});
		this.$element.on('option:click',function(){
			self.close();
		});

		//blur is possible thanks to the tabindex attr
		this.$element.on('blur',function(e){
			self.close();
		})

		$(this.original).on('disable',function(e){
			self.disable();
		})

		$(this.original).on('enable',function(e){
			self.enable();
		})

		build.call(this);

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

	function build(){
		var $select = buildSelect.call(this);
		var $trigger = buildTrigger.call(this);
		var $list = buildList.call(this);
		
		$select.append($trigger).append($list);
		this.$element.append($select);
	}
		
	function buildSelect(){
		var $select = $(this.template_select);
		copyAttributes(this.original,$select[0],["id"]);
		return $select;
	}

	function buildTrigger(){
		var self=this;
		var $trigger=$(this.template_trigger);
		var $placeholder = $(this.template_placeholder);
		var $selected = $(this.template_selected);
		
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
		var $list=$(this.template_list);
		for(var i=0; i<options.length;i++){
			var option=options[i];
			if(option.disabled)
				continue;

			var $option = buildOption.call(this,option,i);
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

		if(options.length==1){
			self.$element.trigger('option:click',[$option,0]);
		}

		return $list;
	}

	function buildOption(option,num){
		var self =this;

		var $option = $(this.template_option);
		copyAttributes(option,$option[0],['name','value','selected','data-selectstyle-option']);

		var custom_content = $(option).attr('data-selectstyle-option');
		if(custom_content)
			$option.html(custom_content);
		else
			$option.text(option.textContent);

		$option.on('click',function(){
			var $this = $(this);
			if(self.$option)
				self.$option.removeClass('is-selected');
			self.$option = $this;
			self.$option.addClass('is-selected');
			self.original.selectedIndex = num;
			$this.trigger('option:click',[$option,num]);
			$(self.original).change();
		})

		return $option;
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
	selectStyle.prototype.disable = function(){
		this.disabled = true;
		this.$element.addClass('is-disabled');
		$(this.original).attr('disabled','disabled');
	}
	selectStyle.prototype.enable = function(){
		this.disabled = false;
		this.$element.removeClass('is-disabled');
		$(this.original).removeAttr('disabled');
	}
	selectStyle.prototype.update = function(){
		this.$element.html("");
		build.call(this);
		this.$element.trigger('ready');
	}

	return selectStyle;
})()

})(jQuery)
