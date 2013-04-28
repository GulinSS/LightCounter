/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 18:48
 * To change this template use File | Settings | File Templates.
 */

(function($, C, Leds) {
    "use strict";

    function setSettingsSprite(settings) {
        if (settings.fail === false) {
            settings.sprite = "counter-ok";
        } else if (settings.fail === null) {
            settings.sprite = "counter-off";
        } else {
            settings.sprite = "counter-fail";
        }
    }

    Leds.LedCounter = C.Widget({
        fail : false
    }, function(settings, self){

        setSettingsSprite(settings);

        var led = Leds.LedBase(settings);

        led.$element.hover(function() {
            led.$icon.removeClass(settings.sprite);
            led.$icon.addClass("counter-selected");
        }, function() {
            led.$icon.addClass(settings.sprite);
            led.$icon.removeClass("counter-selected");
        });

        self.$element = led.$element;
    });

})(jQuery, ns("Common"), ns("LightCounter.Leds"));
