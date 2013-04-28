/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 03.06.12
 * Time: 18:59
 * To change this template use File | Settings | File Templates.
 */

(function($, G){
    "use strict";

    /**
     * Генерирует таблицу с полями объекта
     * @param dictionary { 'имя поля' : 'значение поля' }
     */
    G.tableFields = function(dictionary) {
        var $table = $("<table class='table'></table>");
        var $body = $("<tbody></tbody>").appendTo($table);
        $.each(dictionary, function(k, v) {
            var $field = $("<td></td>").text(k);
            var $value = $("<td></td>").text(v);
            $("<tr></tr>").append($field).append($value).appendTo($body);
        });
        return $table[0];
    };

})(jQuery, ns("Common.Generators"));