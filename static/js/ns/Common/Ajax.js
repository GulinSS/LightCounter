/**
 * Created with PyCharm.
 * User: Гулин Сергей
 * Date: 12.06.12
 * Time: 11:39
 * To change this template use File | Settings | File Templates.
 */

(function($, Modal) {

    Modal.onLoad = function() {
        $("body").addClass("loading");
    };

    Modal.complete = function() {
        $(".modalAjax").fadeOut("slow", function() {
            $("body").removeClass("loading");
        });
    };

})(jQuery, ns("Common.Ajax.Modal"));

(function($, Part) {

    Part.begin = function(text) {
        return Notifier.notify(text, "Передача данных", "../img/ajax-loader-small.gif", -1)
    };

    Part.complete = function(notifier) {
        return function() {
            return notifier.setOk().hide();
        }
    };

})(jQuery, ns("Common.Ajax.Part"));