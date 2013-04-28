/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 18:27
 * To change this template use File | Settings | File Templates.
 */

(function($, C) {
    "use strict";

    /**
     * Переписать контекст вызова функции. Заменяет содержимое this функции на context.
     * Выполняет рекурсию по словарю dict
     * @param dict словарь
     * @param context объект, который будет выступать в роли this
     */
    function rewriteCallContext(dict, context){
        $.each(dict, function(k, v) {
            if ($.isPlainObject(v)){
                rewriteCallContext(dict[k], context);
            }

            if ($.isFunction(v)){
                dict[k] = function() {
                    return v.apply(context, arguments);
                }
            }
        });
    }

    /**
     * Внутренняя реализация виджетов, как в jQuery.
     * @param params параметры по-умолчанию
     * @param constructor функция-конструктор
     */
    C.Widget = function(params, constructor) {
        var w = function MetaWidget(options) {
            if (!(this instanceof MetaWidget)) {
                return new MetaWidget(options);
            }
            var
                settings = $.extend(true, {}, params, options),
                internals = {},
                _self = {
                    internals : internals,
                    settings : settings,
                    instance : this
                };

            rewriteCallContext(settings, _self);
            constructor.call(internals, settings, this);
        };

        w.prototype.destroy = function() {
            throw new Error("Need to be override!");
        };
        w.prototype.update = function(params) {
            throw new Error("Need to be override!");
        };
        w.prototype.$element = null;

        return w;
    };

    $.fn.applyWidget = function(widget, options) {
        return this.each(function() {
            $(this).append(widget(options).$element)
        })
    }

})(jQuery, ns("Common"));