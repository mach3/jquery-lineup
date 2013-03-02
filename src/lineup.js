(function($){

	/**
	 * LineUp
	 * ------
	 * Fix heights of the cols in the same row
	 *
	 * @class
	 * @param String selector
	 * @param Object option
	 */
	var LineUp = function(selector, option){

		var my = this;

		my.option = {
			onFontResize : true,
			checkFontInterval : 10,
			fontSamplerName : "#lineup-font-size-sampler",
			onResize : true
		};

		my.nodes = null;
		my.checkFontTimer = null;
		my.sampler = null;

		/**
		 * Initialize with selector
		 *
		 * @constructor
		 * @param String selector
		 * @param Object option
		 * @return LineUp
		 */
		my.init = function(selector, option){
			this.nodes = $(selector);
			this.config(option);
			this.refresh();

			if(this.option.onResize){
				$(window).on("resize", $.proxy(this.refresh, this));
			}
			if(this.option.onFontResize){
				this.onFontResize($.proxy(this.refresh, this));
			}

			return this;
		};

		/**
		 * Configure option
		 *
		 * @param Object option
		 */
		my.config = function(option){
			console.log(option);
			this.option = $.extend({}, this.option, option);

			console.log(this.option);
		};

		/**
		 * Refresh the heights of elements for the selector
		 *
		 * @return LineUp
		 */
		my.refresh = function(){
			var items, currentTop, fixHeight;

			console.log("refresh");

			items = [];
			currentTop = null;
			fixHeight = function(){
				var max = 0;

				$(items).each(function(){
					max = Math.max(max, $(this).height());
				})
				.each(function(){
					$(this).height(max);
				});
				items = [];
			};
			this.reset();
			this.nodes.each(function(){
				var node = $(this);

				if(currentTop !== null && node.position().top !== currentTop){
					fixHeight();
				}
				currentTop = node.position().top;
				items.push(this);
			});
			fixHeight();

			return this;
		};

		/**
		 * Reset all the heights of elements for the selector
		 * 
		 * @return LineUp
		 */
		my.reset = function(){
			my.nodes.css("height", "");
			return this;
		};

		/**
		 * Run callback on font size changed
		 * 
		 * @param Function callback
		 * @return LineUp
		 */
		my.onFontResize = function(callback){
			var self, check;

			self = this;
			this.sampler = $(this.option.fontSamplerName);
			check = function(){
				var height = self.sampler.height();
				if(self.sampler.data("size") !== height){
					callback();
					self.sampler.data("size", height);
				}
			};

			if(! this.sampler.length){
				this.sampler = $("<span>")
				.text("M")
				.css({
					position : "absolute",
					visibility : "hidden"
				})
				.attr("id", this.option.fontSamplerName)
				.appendTo($("body"));
			}
			this.sampler.data("size", this.sampler.height());
			this.checkFontTimer = setInterval(check, this.option.checkFontInterval);
		};

		my.init.apply(this, arguments);
	};

	/**
	 * jquery.fn.lineUp
	 */
	$.fn.extend({
		lineUp : function(option){
			var node, lineup;

			node = $(this);
			lineup = node.data("lineUp");

			if(lineup instanceof LineUp){
				lineup.config(option);
				lineup.refresh();
			} else {
				node.data("lineUp", new LineUp(this.selector, option));
			}
		}
	});

	/**
	 * Run with parameter
	 *
	 * @example
	 *   <script src="lineup.js" data-selector=".item-a, .item-b"></script>
	 */
	(function(){
		var selector = $("script:last").data("lineupSelector");

		if(selector){
			$.each(selector.split(","), function(index, value){
				$(value).lineUp();
			});
		}
	}());

}(jQuery));