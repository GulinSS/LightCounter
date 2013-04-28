/**
 * Created with PyCharm.
 * User: Гулин Сергей
 * Date: 24.06.12
 * Time: 10:12
 * To change this template use File | Settings | File Templates.
 */

(function($, Leds, LedArm, tableFields, contextDialog, ResourceArmInfo, RangeFloorers) {

    Leds.LedArm = {
        Information : function(id, range) {
            return function(e) {
                ResourceArmInfo(id).then(function(data) {
                    var table = tableFields(data.info), commands = {};
                    $.each(data.commands, function(k, v) {
                        commands[v] = "#";
                    });

                    contextDialog(e, table,"ARM #"+ data.id, {
                        "Команды" : commands,
                        "Настройки" : $.noop,
                        "Этажники" : RangeFloorers(data.id, range)
                    });
                });
            }
        },
        Led : function(options) {
            options = $.extend({
                id : null,
                state : null,
                armRange : null
            }, options);

            return LedArm({
                text : options.id,
                fail : options.state == "error",
                click : Leds.LedArm.Information(options.id, options.armRange)
            })
        }
    };

})(jQuery,
    ns("LightCounter.ViewModels.Leds"),
    ns("LightCounter.Leds.LedArm"),
    ns("Common.Generators.tableFields"),
    ns("Common.Callbacks.contextDialog"),
    ns("LightCounter.ViewModels.Source.Resources.Arm.Info"),
    ns("LightCounter.ViewModels.Range.Floorers"));