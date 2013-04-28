/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 05.06.12
 * Time: 2:10
 * To change this template use File | Settings | File Templates.
 */

(function ($, C, G, undefined){
    "use strict";

    function generateLink(name, value) {
        if ($.isFunction(value)) {
            return  $("<a href='#'></a>").text(name).click(value);
        } else if (typeof(value) === "string") {
            return  $("<a></a>").text(name).attr("href", value);
        } else {
            var $button = $("<a class='btn' href='#'></a>").html(name + "&nbsp;<span class='caret'></span>");
            var $menu = G.menu(value);

            $button.yopopup({
                content : $menu,
                offset : {
                    x : 5,
                    y : 5
                }
            });

            return $button;
        }
    }

    C.Breadcrumbs = C.Widget({
        current : "", //имя,
        previous : {} /* "имя" : "ссылка",  "имя" : function() { }, ... */
    }, function(settings, self) {

        self.$element = $("<ul class='breadcrumb'></ul>");

        $.each(settings.previous, function(k, v) {
            $("<li></li>")
                .append(generateLink(k, v))
                .append("<span class='divider'>&nbsp;/&nbsp;</span>")
                .appendTo(self.$element);
        });

        $("<li></li>").text(settings.current).appendTo(self.$element);
    });

})(jQuery, ns("Common"), ns("Common.Generators"), undefined);