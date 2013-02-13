/*!
 * jQuery.lineUp 
 * -------------
 * Just fix heights of the cols in the same row.
 *
 * @version 1.0.1
 * @author mach3ss
 * @require jQuery
 */
 

(function($){

	var selector;

	$.fn.extend({
		lineUp : function(){
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

			this.each(function(){
				var node = $(this);

				if(currentTop !== null && node.position().top !== currentTop){
					fixHeight();
				}
				currentTop = node.position().top;
				items.push(node);
			});
			fixHeight();
		}
	});

	selector = $("script:last").data("lineupSelector");
	if(selector){
		$(function(){
			$(selector).lineUp();
		});
	}

}(jQuery));
