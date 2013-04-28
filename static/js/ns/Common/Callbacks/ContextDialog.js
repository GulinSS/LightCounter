/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 19:11
 * To change this template use File | Settings | File Templates.
 */

(function($, CB, G){
    "use strict";
    CB.contextDialog = (function() {
        var $dialog = undefined;

        return function(event, content, title, buttons) {
            if ($dialog !== undefined){
                $dialog.dialog("close");
            }
            var
                settings = {
                    close : function() {
                        $(this).dialog("destroy");
                        $content.remove();
                    },
                    position : [event.clientX+5, event.clientY+5],
                    buttons : buttons === undefined ? undefined : {
                        "" : $.noop //хак для вставки своих кнопок
                    },
                    width : 350,
                    title : title
                },
                $content = $("<div class='clearfix'></div>").append(content);

            $dialog = $content.dialog(settings);
            $(".ui-dialog-titlebar", $dialog.parent()).removeClass("ui-widget-header");

            if (buttons !== undefined) {
                var $buttonset = $(".ui-dialog-buttonset", $dialog.parent()).addClass("btn-toolbar").empty(); //хак для вставки своих кнопок
                $.each(buttons, function(k, v) {
                    $buttonset.append(G.button(k, v));
                })
            }

            return $dialog;
        }
    })();
})(jQuery, ns("Common.Callbacks"), ns("Common.Generators"));