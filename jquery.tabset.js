/*
 * tabset
 *
 * A very simple jQuery tabset widget
 *
 * Will turn every even item within the container element
 * into a tab and every odd item into a content page.
 * When tabs are clicked, tabs display (and the others hide).
 * By default the first tab will be selected.
 *
 * Usage: <div class="tabset">[...]</div>
 *
 * Copyright (c) 2019 Dave McCall (http://dave-mccall.com)
 *
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function ($) {
    $.fn.tabset = function (method) {
        var methods = {
            init: function (options) {
                if (options == null) options = {};
                this.each(function () {
                    var $this = $(this);
                    if ($this.hasClass("initialized")) return $this;
                    $this.addClass("initialized");
                    var index = 0;
                    var $tabs = $("<div>").addClass("tabset-tabs");
                    var $contents = $("<div>").addClass("tabset-contents");
                    $this.children().each(function () {
                        var $child = $(this);
                        if (index % 2 == 0) {
                            $child.appendTo($tabs).bind("click", function (e) {
                                e.preventDefault();
                                var index = $(this).index();
                                console.log(index);
                                var $tabset = $(this).closest(".tabset");
                                $tabset.find(".tabset-tabs > div").removeClass("selected");
                                $tabset.find(".tabset-contents > div").removeClass("selected").hide();
                                $(this).addClass("selected");
                                $tabset.find(".tabset-contents > div:eq(" + index + ")").addClass("selected").show();
                            });
                            if (index == 0) $child.addClass("selected");
                        }
                        else {
                            $child.appendTo($contents);
                            if (index == 1) 
                                $child.addClass("selected").show();
                            else
                                $child.hide();
                        }
                        index++;
                    });
                    $this.append($tabs, $contents);
                });
                return $(this);
            }
        }
        if (methods[method])
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof method === 'object' || !method)
            return methods["init"].apply(this, arguments);
        else
            $.error("Method " + method + " does not exist");
    }
	$(document).ready(function () {
		$(".tabset").tabset();
	});
})(jQuery);