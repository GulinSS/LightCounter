/**
 * Created with PyCharm.
 * User: Гулин Сергей
 * Date: 24.06.12
 * Time: 12:37
 * To change this template use File | Settings | File Templates.
 */

(function($, ViewModels, Breadcrumbs, Routing, RoutesDesk, Range, LedArm) {

    var Baker = function() {
        var _basePrevious = {
            "Общий вид" : RoutesDesk.index,
            "Выбор области ARM" : Range.Arms.all
        };

        var that = {
            addFloorerPart : function(options) {
                options = $.extend({
                    range : {
                        arm : {
                            name : null,
                            id : null
                        }
                    },
                    arm : null
                }, options);

                _basePrevious[options.range.arm.name] = Routing.url(RoutesDesk.details, [options.range.arm.id]);
                _basePrevious["ARM #"+options.arm] = LedArm(options.arm, options.range.arm.id);
                _basePrevious["Выбор области этажника"] = Range.Floorers(options.arm, options.range.arm.id);

                return that;
            },
            bake : function(level) {
                return Breadcrumbs({
                    previous: _basePrevious,
                    current: level
                });
            }
        };

        return that;
    };

    ViewModels.Breadcrumbs = {
        Arms : function(options) {
            options = $.extend({
                level : null
            }, options);

            return Baker().bake(options.level);
        },
        Floorers : function(options) {
            options = $.extend({
                range : {
                    arm : {
                        name : null,
                        id : null
                    }
                },
                arm : null,
                level : null
            }, options);

            return Baker()
                .addFloorerPart({
                    range : options.range,
                    arm : options.arm
                })
                .bake(options.level);
        }
    }

})(jQuery,
    ns("LightCounter.ViewModels"),
    ns("Common.Breadcrumbs"),
    ns("Common.Routing"),
    ns("Routes.Desk"),
    ns("LightCounter.ViewModels.Range"),
    ns("LightCounter.ViewModels.Leds.LedArm.Information"));