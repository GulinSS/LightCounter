/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 04.06.12
 * Time: 22:32
 * To change this template use File | Settings | File Templates.
 */

(function($, params, Source, Breadcrumbs, Filter, Paging, Board, LedFloorer) {

    $(function() {
        //params.arm, params.armRange.name, params.armRange.id, params.level

        $("#breadcrumbs").applyWidget(Breadcrumbs, {
            range : {
                arm : {
                    name : params.armRange.name,
                    id : params.armRange.id
                }
            },
            arm : params.arm,
            level : params.level
        });

        $("#filter").applyWidget(Filter, {
            armRangeId : params.armRange.id,
            arm : params.arm,
            current : params.filter.current,
            success : params.filter.success,
            error : params.filter.error,
            range : params.range,
            page : params.page
        });
    });

})(jQuery,
    ns("Page.Params"),
    ns("LightCounter.ViewModels.Source.Loaders.Floorers"),
    ns("LightCounter.ViewModels.Breadcrumbs.Floorers"),
    ns("LightCounter.ViewModels.Filter.Floorers"),
    ns("LightCounter.ViewModels.Paging.Floorers"),
    ns("LightCounter.Board"),
    ns("LightCounter.ViewModels.Leds.LedFloorer"));

$(function () {
    var dataSource = {
        load : function(arm, filter, page) {
            return $.get(ns("Routes.Desk").get_floorers, {
                arm : arm,
                page : page,
                filter : filter
            }).success(ns("Common.Ajax.Modal").complete);
        },
        get_info : function(floorer) {
            var Part = ns("Common.Ajax.Part");

            return $.get(ns("Routes.Resources.Floorer").get_info, {
                floorer : floorer
            }).success(Part.complete(Part.begin("Запрос информации об этажнике #"+floorer)));
        }
    };

    var controller = function(source, params) {
        var
            Routes = ns("Routes"),
            Routing = ns("Common.Routing"),
            LightCounter = ns("LightCounter"),
            Generators = ns("Common.Generators"),
            Callbacks = ns("Common.Callbacks");

        var initPaging = function(options) {
            var paging = Common.Paging({
                current : options.current,
                min : 1,
                max : options.max,
                select : function(page) {
                    Routing.callback(Routes.Desk.details,
                        [params.armRange.id, params.arm, params.range], {
                        page : page,
                        filter : params.filter.current
                    })()
                }
            });

            $("#paging").append(paging.$element);
        };

        var initFloorers = function(floorers) {
            var
                Common = ns("Common"),
                Leds = ns("LightCounter.Leds"),
                board = LightCounter.Board(),
                leds = [];

            $.each(floorers, function(k, v) {
                leds.push(Leds.LedFloorer({
                    text : v.id,
                    fail : v.state == "error",
                    click : function(e) {
                        source.get_info(v.id).then(function(data) {
                            var board = LightCounter.Board(), leds = [];

                            $.each(data.counters, function(k, v) {
                                switch(v.state){
                                    case "success":
                                        leds.push(Leds.LedCounter({ text :v.id, fail : false, href: Routing.url(Routes.Counter.index, [v.id]) }));
                                        break;
                                    case "error":
                                        leds.push(Leds.LedCounter({ text :v.id, fail : true, href: Routing.url(Routes.Counter.index, [v.id]) }));
                                        break;
                                    case "off":
                                        leds.push(Leds.LedCounter({ text :v.id, fail : null, href: Routing.url(Routes.Counter.index, [v.id]) }));
                                        break;
                                }
                            });

                            board.fill(leds);

                            Common.Callbacks.contextDialog(e, board.$element,"Этажник #"+ v.id, {
                                "Команды" : {
                                    "Команда 1" :$.noop
                                },
                                "Настройки" : $.noop
                            });
                        });
                    }
                }))
            });

            board.fill(leds);

            $("#scoreboard").append(board.$element);
        };

        function onLoad(data) {
            initPaging(data.paging);
            initFloorers(data.floorers);
        }

        source.load(params.arm, params.filter.current, params.page).success(onLoad);
    };

    controller(dataSource, ns("Page.Params"));
});