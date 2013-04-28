/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 18:49
 * To change this template use File | Settings | File Templates.
 */

(function($, C, LC){
    "use strict";

    /**
     * Виджет списка индикаторов
     */
    LC.Board = C.Widget({}, function(settings, self) {
        self.$element = $("<div class='scoreboard thumbnail'></div>");

        self.fill = function(leds) {
            $.each(leds, function(k, v) {
                self.$element.append(v.$element);
            });
        };

        self.empty = function() {
            self.$element.empty();
        }
    });

})(jQuery, ns("Common"), ns("LightCounter"));
