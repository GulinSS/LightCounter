/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 19:08
 * To change this template use File | Settings | File Templates.
 */

(function($, G) {
    "use strict";
    function _buildLink(options){
        var settings = $.extend({
            href : '#',
            callback : function(e) {
                document.location.href = settings.href;
                e.preventDefault();
            },
            name : undefined
        }, options);

        var $a = $("<a></a>").text(settings.name).attr("href", settings.href).click(settings.callback);
        return $("<li></li>").wrapInner($a);
    }

    G.menu = function(keyValue) {
        var $element = $("<ul></ul>");
        $.each(keyValue, function(k, v) {
            if ($.isFunction(v)) {
                $element.append(_buildLink({
                    name : k,
                    callback: function(e) {
                        v();
                        e.preventDefault();
                    }
                }));
            } else {
                $element.append(_buildLink({
                    href : v,
                    name : k
                }));
            }
        });

        return $element.menu();
    }

})(jQuery, ns("Common.Generators"));
