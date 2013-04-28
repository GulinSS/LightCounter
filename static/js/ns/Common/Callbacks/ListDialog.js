/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 04.06.12
 * Time: 23:55
 * To change this template use File | Settings | File Templates.
 */

(function($, CB, Gens) {

    /**
     * Сгенерировать диалог выбора
     * @param choices { "имя" : "url", "имя" : function() {}, ... }
     */
    CB.listDialog = function(title, choices) {
        var $content = $("<div></div>").append(Gens.menu(choices));
        $content.dialog({
            title: title,
            width : 350,
            modal : true,
            close : function() {
                $(this).dialog("destroy");
                $content.remove();
            },
            open : function() {
                $(".ui-menu", this).css({
                    border : "none",
                    width : "100%"
                })
            }
        });
    };

})(jQuery, ns("Common.Callbacks"), ns("Common.Generators"));