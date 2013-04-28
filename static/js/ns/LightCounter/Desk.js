/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 05.06.12
 * Time: 2:06
 * To change this template use File | Settings | File Templates.
 */

(function($, C, LC) {
    "use strict";

    function _buildIndicator(success, params) // { number, click }
    {
        var span2 = $("<div class='span2' style='text-align: center'>")
            .append("<div class='scoreboard-led-icon'></div>")
            .append("<p></p>")
            .append("<button class='btn btn-large'></button>");

        if (success === true){
            $(".scoreboard-led-icon", span2).addClass("arm-ok");
        } else {
            $(".scoreboard-led-icon", span2).addClass("arm-fail");
            $(".btn", span2).addClass("btn-danger");
        }

        $(".btn", span2).text(params.number).click(params.click);

        return span2
    }

    /**
     * Отображение табло общего вида
     */
    LC.Desk = C.Widget({
        success : {
            number : 0,
            click : $.noop
        },
        fail : {
            number : 0,
            click: $.noop
        }
    }, function(settings, self) {
        self.$element = $("<div class='row'></div>");

        var
            $hero = $("<div class='span4 offset3 hero-unit'></div>").appendTo(self.$element),
            $hero_row = $("<div class='row'></div>").appendTo($hero),
            $success = _buildIndicator(true, settings.success).appendTo($hero_row),
            $fail = _buildIndicator(false, settings.fail).appendTo($hero_row);

        //this.$success_btn = $(".btn", $success);
        //this.$fail_btn = $(".btn", $success);

        self.destroy = function() {

        }
    });

})(jQuery, ns("Common"), ns("LightCounter"));