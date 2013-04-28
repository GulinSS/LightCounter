/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 05.06.12
 * Time: 2:07
 * To change this template use File | Settings | File Templates.
 */

(function($, Desk, Source, Range) {

    $(function() {
        Source().success(function(data) {
            $("#desk").applyWidget(Desk, {
                success : {
                    number : data.success,
                    click: Range.success
                },
                fail : {
                    number : data.error,
                    click: Range.failed
                }
            });
        });
    });

})(jQuery,
    ns("LightCounter.Desk"),
    ns("LightCounter.ViewModels.Source.Loaders.Desk"),
    ns("LightCounter.ViewModels.Range.Arms"));