;(function($) {

    var PluginName = 'imageWatch',
        defaults = {
            callback : $.noop,
            classIsLoading : 'img-isLoading'
        };

    function Plugin(el, opt) {
        this.o = $.extend({}, defaults, opt);
        this.$el = $(el);
        this.el = el;
    }

    Plugin.prototype = {

        prefixClass : function() {
            var out = this.o.classIsLoading;
            if( this.o.classIsLoading.indexOf('.') !== 0 ) {
                out = '.' + this.o.classIsLoading;
            }
            return out;
        },

        run : function() {
            this.checkImageStatus();
        },

        checkImageStatus : function() {
            var imgTestArray = [],
                self = this;
            this.$el.each(function(index) {
                var elem = $(this);
                    elem.addClass(self.o.classIsLoading);
                var img = $(this).find('img'),
                    imgSrc = img.attr('src'),
                    testImg = new Image();

                    testImg.onload = function(e) {
                        elem.removeClass(self.o.classIsLoading);
                    }
                    testImg.src = imgSrc;
                    imgTestArray.push(testImg);
            });
            this.countImageStillLoading();
        },

        countImageStillLoading : function() {
            var self = this;
            delay(function() {
                if( $( self.prefixClass(self.o.classIsLoading) ).length !== 0 ) {
                    self.countImageStillLoading();
                } else {
                    self.o.callback.call(this.$el);
                }
            },500);
        },
    };


    $.fn[PluginName] = function(options) {
        if( !this.data(PluginName) ) {
            return $.data(this, PluginName, new Plugin(this, options));
        }
    };

})(jQuery);
