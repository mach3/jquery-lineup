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
    var LineUp = function(/* selector, options */){
        this.init.apply(this, arguments);
    };

    $.extend(LineUp.prototype, {

        EVENT_FONT_RESIZE: "lineup.fontresize",

        /**
         * Defaults Options
         *
         * - onFontResize      :Boolean  ... Refresh when font resized or not
         * - onResize          :Boolean  ... Refresh when window resized or not
         * - checkFontInterval :Integer  ... Interval time for checking font size
         * - fontSamplerName   :String   ... ID name for font sampler element
         * - hook              :Function ... Function called when columns' height refreshed
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
        sampler: null,

        /**
         * Initialize with selector
         *
         * @constructor
         * @param String selector
         * @param Object options
         */
        init: function(selector, options){
            // configure, initialize
            this.nodes = $(selector);
            this.options = {};
            this.config(this.defaults).config(options);
            this.refresh();

            // handlers
            if(this.get("onResize")){
                $(window).on("resize", $.proxy(this.refresh, this));
            }
            if(this.get("onFontResize")){
                this.sampler = this.getFontSampler();
                this.sampler.on(this.EVENT_FONT_RESIZE, $.proxy(this.refresh, this));
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
            var nodes, items, currentTop, hook, fixHeight;

            nodes = this.nodes.toArray();
            items = [];
            currentTop = null;
            hook = this.get("hook");
            
            // sort by offset
            nodes.sort(function(a, b){
                return $(a).offset().top - $(b).offset().top;
            });

            // fix column size by row
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
         * Get font sampler node
         *
         * @return jQuery
         */
        getFontSampler: function(){
            var name, node, process;

            name = this.get("fontSamplerName");
            node = $("#" + name);

            // already created ?
            if(node.length){
                return node;
            }

            // create sampler node
            node = $("<span>").text("M").css({
                position: "absolute",
                visibility: "hidden"
            })
            .attr("id", name)
            .appendTo("body");
            node.data("height", node.height());

            // check by interval
            process = function(eventName){
                var height = this.height();
                if(this.data("height") !== height){
                    this.trigger(eventName);
                    this.data("height", height);
                }
            };

            node.data(
                setInterval(
                    $.proxy(process, node, this.EVENT_FONT_RESIZE),
                    this.get("checkFontInterval")
                )
            );

            return node;
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