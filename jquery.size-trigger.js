/**
 * jquery.size-trigger 0.1.0
 * jquery.size-trigger is a simple jQuery plugin for detecting ALL changes in a size of ANY positioned element.
 *
 * Usage: $("#element").sizetrigger({onResize: noArgFunction});
 *
 * Copyright 2014, RB Software Robert Bar (http://rbsoftware.pl)
 * Licensed under the MIT license.
 *
 */
; (function ($, window, document, undefined) {
	"use strict";

    var pluginName  = "sizetrigger"
	    , defaults    = { onResize: undefined };
	
	function Plugin(element, options) {
		this.element = element;
		this.$element = $(element);
		this.settings = $.extend(true, {}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {

			var iframes		    = [$('<iframe src="about:blank" style="position:absolute; top:-50000px; left:0px; width:100%;"></iframe>'), $('<iframe src="about:blank" style="position:absolute; top:0; left:-50000px; height:100%;"></iframe>')]
			  , frameContent  = "<!DOCTYPE html><html><head><title>jquery.sizetrigger</title></head><body><script>window.onresize = resize;function resize() { var plugin = parent.$(this.frameElement).data('plugin_sizetrigger'); plugin.fireResizeFunction(); }</script></body></html>";

			for (var i = 0; i < iframes.length; i++) {
				var $iframe = iframes[i];				
				this.$element.append($iframe);
				$iframe.data("plugin_" + pluginName, this);
				$iframe[0].contentWindow.emitcontent = frameContent;
				$iframe[0].src = "javascript:window.emitcontent";
			}

			this.fireResizeFunction();
		},

		fireResizeFunction: function () {
			var fn = this.settings["onResize"];

			if ($.isFunction(fn)) {
				fn();
			}
		}
	});

	$.fn[pluginName] = function (options) {
		this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
		return this;
	};

})(jQuery, window, document);
