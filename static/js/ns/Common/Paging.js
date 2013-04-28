/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 18:51
 * To change this template use File | Settings | File Templates.
 */

(function ($, C, undefined){
    "use strict";

    C.Paging = C.Widget({
        current : 1,
        min : 1,
        max : 5,
        select : function(page) {

        }
    }, function(settings, self){
        function click(get_page) {
            return function() {
                var value = $.isFunction(get_page) ? get_page() : get_page;
                if (value === null)
                    return;

                settings.select(value);
            }
        }

        function get_prev() {
            if (settings.current === settings.min)
                return null;

            return settings.current - 1;
        }

        function get_next() {
            if (settings.current === settings.max)
                return null;

            return settings.current + 1;
        }

        function preventDefault(e) {
            e.preventDefault();
        }

        self.$element = $("<div></div>").addClass("pagination");
        this.$ul = $("<ul></ul>").appendTo(self.$element);

        if (get_prev() !== null)
            $("<li></li>")
                .append($("<a href='#'>Назад</a>")
                .click(preventDefault))
                .click(click(get_prev))
                .appendTo(this.$ul);

        for(var i = settings.min; i <= settings.max; i++){
            var $li = $("<li></li>")
                .append($("<a href='#'></a>")
                .text(i)
                .click(preventDefault))
                .click(click(i))
                .appendTo(this.$ul);

            if (i === settings.current){
                $li.addClass("active");
            }
        }

        if (get_next() !== null)
            $("<li></li>")
                .append($("<a href='#'>Вперед</a>")
                .click(preventDefault))
                .click(click(get_next))
                .appendTo(this.$ul);
    });

})(jQuery, ns("Common"), undefined);