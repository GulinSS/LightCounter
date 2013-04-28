/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 18:30
 * To change this template use File | Settings | File Templates.
 */

(function($, C, Leds) {
    "use strict";

    Leds.LedBase = C.Widget({
        click : function(e) {
            location.href = this.settings.href;
            e.preventDefault();
        },
        text : null,
        href : "#",
        sprite : null

    }, function(settings, self) {
        var
            $container = $("<div class='scoreboard-led'></div>").click(settings.click),
            $icon = $("<div class='scoreboard-led-icon'></div>").addClass(settings.sprite).appendTo($container);

        $("<a class='scoreboard-led-label'></a>").text(settings.text).attr("href", settings.href).appendTo($container);

        self.text = settings.text;
        self.$icon = $icon;
        self.$element = $container;

        self.destroy = function() {

        }
    });

})(jQuery, ns("Common"), ns("LightCounter.Leds"));