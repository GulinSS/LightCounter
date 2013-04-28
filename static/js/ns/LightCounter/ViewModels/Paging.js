/**
 * Created with PyCharm.
 * User: Гулин Сергей
 * Date: 24.06.12
 * Time: 9:57
 * To change this template use File | Settings | File Templates.
 */

(function($, ViewModels, Paging, Routing, RouteDesk) {

    ViewModels.Paging = {
        Arms : function(options) {
            options = $.extend({
                current : null,
                max : null,
                min : 1,
                range : null,
                filter : null
            }, options);

            return Paging({
                current : options.current,
                min : options.min,
                max : options.max,
                select : function(page) {
                    Routing.callback(RouteDesk.details,
                        [options.range], {
                        page : page,
                        filter : options.filter
                    })()
                }
            });
        },
        Floorers : function(options) {

        }
    };

})(jQuery,
    ns("LightCounter.ViewModels"),
    ns("Common.Paging"),
    ns("Common.Routing"),
    ns("Common.Routes.Desk"));