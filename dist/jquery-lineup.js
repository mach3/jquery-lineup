/*!
 * jQuery.lineUp 
 * -------------
 * Just fix heights of the cols in the same row.
 *
 * @version 1.0.2
 * @author mach3
 * @url https://github.com/mach3/jquery-lineup
 * @require jquery.js
 */
 (function($){

	/**
	 * LineUp
	 * ------
	 * Fix heights of the cols in the same row
	 *
	 * @class
	 */
	var LineUp = function(){

		var my = this;

		my.nodes = null;

		/**
		 * Initialize with selector
		 *
		 * @constructor
		 * @param String selector
		 * @return LineUp
		 */
		my.init = function(selector){
			this.nodes = $(selector);
			this.refresh();
			return this;
		};

		/**
		 * Refresh the heights of elements for the selector
		 *
		 * @return LineUp
		 */
		my.refresh = function(){
			var items, currentTop, fixHeight;

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

		my.init.apply(this, arguments);
	};

	/**
	 * jquery.fn.lineUp
	 */
	$.fn.extend({
		lineUp : function(){
			$(this).data("lineUp", new LineUp(this.selector));
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