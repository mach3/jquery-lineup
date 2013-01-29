/*!
 * jQuery.lineUp 
 * -------------
 * Just fix heights of the cols in the same row.
 *
 * @version 1.0.0
 * @author mach3ss
 * @require jQuery
 */
 

(function($){

	$.fn.extend({
		lineUp : function(){
			var items, currentTop, fixHeight;

			items = [];
			currentTop = 0;
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

				if(node.position().top !== currentTop){
					fixHeight();
				}
				currentTop = node.position().top;
				items.push(node);
			});
			fixHeight();
		}
	});

}(jQuery));
