/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 06.06.12
 * Time: 20:57
 * To change this template use File | Settings | File Templates.
 */

$(function() {
    ns("Common.Ajax.Modal").complete();

    var
        Common = ns("Common"),
        LightCounter = ns("LightCounter"),
        paging = Common.Paging({
            current : 1,
            min : 1,
            max : 5
        }),
        breadcrumbs = Common.Breadcrumbs({
            previous: {
                "Общий вид" : "desk.html",
                "Выбор области" : function() {
                    ns("Common.Callbacks").listDialog("Выбор области", {
                        "Область 1" : "arms.html",
                        "Область 2" : "arms.html",
                        "Область 3" : "arms.html",
                        "Область 4" : "arms.html",
                        "Область 5" : "arms.html",
                        "Область 6" : "arms.html"
                    });
                },
                "Северная область" : "arms.html",
                "ARM #12345" : function(e) {
                    var table = Common.Generators.tableFields({
                        "Ключ 1" : "Значение 1",
                        "Ключ 2" : "Значение 2"
                    });

                    Common.Callbacks.contextDialog(e, table,"ARM #12345", {
                        "Команды" : {
                            "Команда 1" : function() { console.log("1") },
                            "Команда 2" : "#",
                            "Команда 3" : "#"
                        },
                        "Настройки" : $.noop,
                        "Этажники" : function() {
                            ns("Common.Callbacks").listDialog("Выбор района", {
                                "Район 1" : "floorers.html",
                                "Район 2" : "floorers.html",
                                "Район 3" : "floorers.html",
                                "Район 4" : "floorers.html",
                                "Район 5" : "floorers.html",
                                "Район 6" : "floorers.html"
                            });
                        }
                    });
                },
                "Этажник #123123" : function(e) {
                    var board = LightCounter.Board(), leds = [];

                    for (var k = 0; k < 2; k++) {
                        leds.push(LightCounter.Leds.LedCounter({	text : k, fail : false, href: "counter.html" }));
                    }
                    leds.push(LightCounter.Leds.LedCounter({	text : 3, fail : null, href: "counter.html" }));
                    leds.push(LightCounter.Leds.LedCounter({	text : 4, fail : true, href: "counter.html" }));

                    board.fill(leds);

                    Common.Callbacks.contextDialog(e, board.$element,"Этажник #123123", {
                        "Команды" : {
                            "Команда 1" : function() { console.log("1") }
                        },
                        "Настройки" : $.noop
                    });

                }
            },
            current: "Центральный район"
        });

    $("#breadcrumbs").append(breadcrumbs.$element);
    $("#paging").append(paging.$element);
});