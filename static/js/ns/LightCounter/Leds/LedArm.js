/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 18:38
 * To change this template use File | Settings | File Templates.
 */

(function($, C, Leds) {
    "use strict";

    Leds.LedArm = C.Widget({
        fail : false

    }, function(settings, self){
        settings.sprite = settings.fail? "arm-fail": "arm-ok";
        var led = Leds.LedBase(settings);

        led.$element.hover(function() {
            led.$icon.removeClass(settings.sprite);
            led.$icon.addClass("arm-selected");
        }, function() {
            led.$icon.addClass(settings.sprite);
            led.$icon.removeClass("arm-selected");
        });

        self.$element = led.$element;
    });

})(jQuery, ns("Common"), ns("LightCounter.Leds"));