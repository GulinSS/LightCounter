/**
 * Created with PyCharm.
 * User: Гулин Сергей
 * Date: 23.06.12
 * Time: 11:14
 * To change this template use File | Settings | File Templates.
 */

(function($, ViewModels, Routes, Modal, Part){

        var loaderFactory = function(path, keys) {
        keys = keys || [];
        var params = {};

        $.each(keys, function(k, v) {
            params[v] = null;
        });

        return function() {
            var currentParams = $.extend({}, params);
            for(var i = 0; i < arguments.length; i++){
                currentParams[keys[i]] = arguments[i];
            }

            return $.get(path, currentParams).success(Modal.complete);
        }
    };

    var partFactory = function(path, message, keys) {
        keys = keys || [];
        var params = {};

        $.each(keys, function(k, v) {
            params[v] = null;
        });

        return function() {
            var currentParams = $.extend({}, params);
            for(var i = 0; i < arguments.length; i++){
                currentParams[keys[i]] = arguments[i];
            }

            if ($.isFunction(message)) {
                message = message.apply(this, arguments);
            }

            return $.get(path, currentParams).success(Part.complete(Part.begin(message)));
        }
    };

    var predefinedPart = function(path, message, parameter) {
        var keys = [];
        var values = [];
        $.each(parameter, function(k, v) {
            keys.push(k);
            values.push(v);
        });

        var factoryResult = partFactory(path, message, keys);
        return function() {
            return factoryResult.apply(this, values);
        }
    };

    //TODO: $.extend(...)

    ViewModels.Source = {
        Loaders : {
            Desk : loaderFactory(Routes.Desk.get_statistics),
            Arms : loaderFactory(Routes.Desk.get_arms, ["filter", "page"]),
            Floorers : loaderFactory(Routes.Desk.get_floorers, ["arm", "page", "filter"])
        },
        Resources : {
            Range : {
                Arm : {
                    OnlyFailed : predefinedPart(Routes.Resources.Range.for_arms, "Получение областей с неудачами", {filter : "error"}),
                    OnlySuccess : predefinedPart(Routes.Resources.Range.for_arms, "Получение успешных областей", {filter : "success"}),
                    All : partFactory(Routes.Resources.Range.for_arms, "Получение всех областей ARM")
                },
                Floorer : partFactory(Routes.Resources.Range.for_floorers, function(arm) {
                    return "Получение всех областей этажников ARM #" + arm;
                }, ["arm", "armRange"])
            },
            Arm : {
                Info : partFactory(Routes.Resources.Arm.get_info, function(arm) {
                    return "Запрос информации об ARM #"+arm
                }, ["arm"])
            }
        }
    }

})(jQuery,
    ns("LightCounter.ViewModels"),
    ns("Routes"),
    ns("Common.Ajax.Modal"),
    ns("Common.Ajax.Part"));