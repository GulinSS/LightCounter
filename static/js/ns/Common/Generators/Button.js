/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 19:09
 * To change this template use File | Settings | File Templates.
 */

(function($, G) {
    "use strict";
    G.button = function(name, value) {
        if ($.isFunction(value)) {
            return  $("<button class='btn'></button>").text(name).click(value);
        } else if (typeof(value) === "string") {
            return  $("<a class='btn'></a>").text(name).attr("href", value);
        } else {
            var $button = $("<button class='btn'></button>").html(name + "&nbsp;<span class='caret'></span>");
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

})(jQuery, ns("Common.Generators"));