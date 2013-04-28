/**
 * Created with PyCharm.
 * User: Гулин Сергей
 * Date: 23.06.12
 * Time: 11:03
 * To change this template use File | Settings | File Templates.
 */

(function($, Callbacks, ViewModels, Source) {

    var _selectorBuilder = function(options) {
        var settings = $.extend({
            source : null,
            title : "Выбор области"
        }, options);

        return function() {
            settings.source().then(function(data) {
                ns("Common.Callbacks").listDialog(settings.title, data);
            })
        }
    };

    ViewModels.Range = {
        Arms : {
            failed : _selectorBuilder({
                source : Source.Arm.OnlyFailed
            }),
            success : _selectorBuilder({
                source : Source.Arm.OnlySuccess
            }),
            all : _selectorBuilder({
                source : Source.Arm.All
            })
        },
        Floorers : function(arm, range) {
            return function() {
                Source.Floorer(arm, range).then(function(range) {
                    ns("Common.Callbacks").listDialog("Выбор региона для ARM #"+arm, range);
                })
            }
        }
    };

})(jQuery,
    ns("Common.Callbacks"),
    ns("LightCounter.ViewModels"),
    ns("LightCounter.ViewModels.Source.Resources.Range"));