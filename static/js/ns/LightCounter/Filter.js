/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 18:53
 * To change this template use File | Settings | File Templates.
 */

(function($, C, LC, undefined){
    "use strict";

    function applyActive(internals, active) {
        internals.$li_all.removeClass("active");
        internals.$li_error.removeClass("active");
        internals.$li_success.removeClass("active");
        internals["$li" + "_" + active].addClass("active");
    }

    LC.Filter = C.Widget({
        active : "",
        all : {
            click : $.noop
        },
        success : {
            number : null,
            click : function() {
                this.instance.update({ active : "success"});
            }
        },
        error : {
            number : null,
            click : $.noop
        }
    }, function(settings, self) {
        var that = this;
        self.$element = $("<ul class='nav nav-pills pull-right'></ul>");

        this.$li_all = $("<li></li>").appendTo(self.$element);
        this.$li_success = $("<li></li>").appendTo(self.$element);
        this.$li_error = $("<li></li>").appendTo(self.$element);

        $("<a href='#'></a>")
            .html("Все&nbsp;<span class='badge'></span>")
            .click(settings.all.click)
            .appendTo(this.$li_all);

        $("<a href='#'></a>")
            .html("Исправно&nbsp;<span class='badge badge-success'></span>")
            .click(settings.success.click)
            .appendTo(this.$li_success);

        $("<a href='#'></a>")
            .html("С&nbsp;ошибками&nbsp;<span class='badge badge-important'></span>")
            .click(settings.error.click)
            .appendTo(this.$li_error);

        $(".badge", this.$li_success).text(settings.success.number);
        $(".badge", this.$li_error).text(settings.error.number);
        $(".badge", this.$li_all).text(settings.success.number+settings.error.number);

        applyActive(this, settings.active);

        self.update = function(params) {
            if (params.active !== undefined)
                applyActive(that, params.active);
        }
    });

})(jQuery, ns("Common"), ns("LightCounter"), undefined);
