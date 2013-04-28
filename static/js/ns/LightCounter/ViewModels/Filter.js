/**
 * Created with PyCharm.
 * User: Гулин Сергей
 * Date: 23.06.12
 * Time: 23:36
 * To change this template use File | Settings | File Templates.
 */

(function($, ViewModels, Filter, Routing, Routes) {

    var callbackPart = function(paramsArray, page, filter) {
        var options = {
            page : page
        };

        if (filter !== undefined) {
            options["filter"] = filter;
        }

        return Routing.callback(Routes.Desk.details, paramsArray, options);
    };

    var filterFactory = function(paramsArray, options) {
        options = $.extend({
            page : null,
            current : null,
            success : null,
            error : null
        }, options);

        return Filter({
            active: options.current,
            all : {
                click : callbackPart(paramsArray, options.page)
            },
            success : {
                number : options.success,
                click : callbackPart(paramsArray, options.page, "success")
            },
            error : {
                number : options.error,
                click : callbackPart(paramsArray, options.page, "error")
            }
        });
    };

    ViewModels.Filter = {
        Arms : function(options) {
            options = $.extend({
                range : null,
                page : null,
                current : null,
                success : null,
                error : null
            }, options);

            return filterFactory([options.range], options);
        },
        Floorers: function(options) {
            options = $.extend({
                armRangeId : null,
                arm : null,
                range : null,
                page : null,
                current : null,
                success : null,
                error : null
            }, options);

            return filterFactory([options.armRangeId, options.arm, options.range], options);
        }
    }

})(jQuery,
    ns("LightCounter.ViewModels"),
    ns("LightCounter.Filter"),
    ns("Common.Routing"),
    ns("Routes"));