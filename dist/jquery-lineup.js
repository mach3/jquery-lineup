/*!
 * jQuery.lineUp 
 * -------------
 * Just fix heights of the cols in the same row.
 *
 * @version 1.1.0
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
	 * @param String selector
	 * @param Object option
	 */
	var LineUp = function(selector, options){
		this.init.apply(this, arguments);
	};

	$.extend(true, LineUp.prototype, {

		/**
		 * Defaults Options
		 *
		 * - onFontResize :Boolean ... Refresh when font resized or not
		 * - onResize :Boolean Refresh when window resized or not
		 * - checkFontInterval :Integer ... Interval time for checking font size
		 * - fontSamplerName :String ... ID name for font sampler element
		 * - hook :Function ... Function called when columns' height refreshed
		 */
		defaults: {
			onFontResize : true,
			onResize : true,
			checkFontInterval : 10,
			fontSamplerName : "lineup-font-size-sampler",
			hook: $.noop
		},

		options: {},
		nodes: null,
		checkFontTimer: null,
		sampler: null,

		/**
		 * Initialize with selector
		 *
		 * @constructor
		 * @param String selector
		 * @param Object options
		 */
		init: function(selector, options){
			this.nodes = $(selector);
			this.config(this.defaults).config(options);
			this.refresh();
			if(this.get("onResize")){
				$(window).on("resize", $.proxy(this.refresh, this));
			}
			if(this.get("onFontResize")){
				this.onFontResize($.proxy(this.refresh, this));
			}
		},

		/**
		 * Configure options
		 *
		 * @param Object option
		 */
		config: function(options){
			$.extend(this.options, options);
			return this;
		},

		/**
		 * Getter for options
		 *
		 * @param String key
		 */
		get: function(key){
			return this.options[key];
		},

		/**
		 * Refresh the heights of elements for the selector
		 *
		 * @return LineUp
		 */
		refresh: function(){
			var nodes, items, currentTop, fixHeight;

			nodes = this.nodes.toArray();
			items = [];
			currentTop = null;
			hook = this.get("hook");
			
			nodes.sort(function(a, b){
				return $(a).offset().top - $(b).offset().top;
			});

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

			$.each(nodes, function(){
				var node = $(this);

				if(currentTop !== null && node.offset().top !== currentTop){
					fixHeight();
				}
				currentTop = node.offset().top;
				items.push(this);
			});
			fixHeight();

			hook = this.get("hook");
			if($.isFunction(hook)){
				hook(this);
			}
			return this;
		},

		/**
		 * Reset all the heights of elements for the selector
		 * 
		 * @return LineUp
		 */
		reset: function(){
			this.nodes.css("height", "");
			return this;
		},

		/**
		 * Run callback when font size changed
		 * 
		 * @param Function callback
		 * @return LineUp
		 */
		onFontResize: function(callback){
			var name, check, my = this;

			name = this.get("fontSamplerName");
			this.sampler = $("#" + name);

			check = function(){
				var height = my.sampler.height();
				if(my.sampler.data("size") !== height){
					callback();
					my.sampler.data("size", height);
				}
			};

			if(! this.sampler.length){
				this.sampler = $("<span>")
				.text("M")
				.css({
					position : "absolute",
					visibility : "hidden"
				})
				.attr("id", this.get("fontSamplerName"))
				.appendTo($("body"));
			}
			this.sampler.data("size", this.sampler.height());
			this.checkFontTimer = setInterval(check, this.get("checkFontInterval"));
			return this;
		}

	});


	/**
	 * jquery.fn.lineUp
	 */
	$.fn.extend({
		lineUp: function(option){
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