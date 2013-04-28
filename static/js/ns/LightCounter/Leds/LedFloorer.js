/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 18:39
 * To change this template use File | Settings | File Templates.
 */


(function($, C, Leds) {
    "use strict";

    Leds.LedFloorer = C.Widget({
        fail : false
    }, function(settings, self){
        settings.sprite = settings.fail? "floorer-fail": "floorer-ok";

        var led = Leds.LedBase(settings);

        led.$element.hover(function() {
            led.$icon.removeClass(settings.sprite);
            led.$icon.addClass("floorer-selected");
        }, function() {
            led.$icon.addClass(settings.sprite);
            led.$icon.removeClass("floorer-selected");
        });

        self.$element = led.$element;
    });

})(jQuery, ns("Common"), ns("LightCounter.Leds"));