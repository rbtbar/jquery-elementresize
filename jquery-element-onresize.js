/**
 * jquery-element-onresize 0.1.1
 * jquery-element-onresize is a simple jQuery plugin for detecting ALL changes in a size of ANY positioned element.
 *
 * Usage: $("#element").detectResizing({onResize: noArgFunction});
 *
 * Copyright 2014, RB Software Robert Bar (http://rbsoftware.pl)
 * Licensed under the MIT license.
 *
 */
; (function ( $, window, document, undefined ) {
    "use strict";

    var pluginName  = "detectResizing"
      , defaults    = { onResize: undefined };

    function Plugin( element, options ) {
        this.element = element;
        this.$element = $( element );
        this.settings = $.extend( true, {}, defaults, options );
        this._defaults = defaults;
        this._init();
    }

    $.extend( Plugin.prototype, {
        _init: function () {

            var frameContent = "<!DOCTYPE html><html><head><title>jquery.detectResizing</title></head><body><script>window.onresize = resize;function resize() { var plugin = parent.$(this.frameElement).data('plugin_detectResizing'); plugin._fireResizeFunction(); }</script></body></html>"
              , iframes = [ $('<iframe src="about:blank" style="position:absolute; top:-50000px; left:0px; width:100%;"></iframe>'), $('<iframe src="about:blank" style="position:absolute; top:0; left:-50000px; height:100%;"></iframe>') ]
              , length  = iframes.length
              , index   = 0
              , $iframe;

            for ( ; index < length; index++ ) {
                $iframe = iframes[ index ];            
                this.$element.append( $iframe );
                $iframe.data( "plugin_" + pluginName, this );
                $iframe[ 0 ].contentWindow.emitcontent = frameContent;
                $iframe[ 0 ].src = "javascript:window.emitcontent";
            }

            this._iframes = iframes;
            this._fireResizeFunction();
        },

        _fireResizeFunction: function() {
            var fn = this.settings.onResize;

            if ( $.isFunction( fn ) ) {
                fn();
            }
        },

        destroy: function() {
            var length = this._iframes.length
              , index  = 0
              , $iframe;
              
            if ( this.$element.data( "plugin_" + pluginName ) ) {
                this.$element.removeData( "plugin_" + pluginName );
                for ( ; index < length; index++ ) {
                    $iframe = this._iframes[ index ];
                    $iframe.removeData( "plugin_" + pluginName );
                    $iframe.remove();
                }
            }
        }
});

$.fn[ pluginName ] = function ( options ) {
    this.each(function () {
        if ( !$.data( this, "plugin_" + pluginName ) ) {
            $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
        }
    });
    return this;
};

})(jQuery, window, document);
