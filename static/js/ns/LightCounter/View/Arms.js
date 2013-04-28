/**
 * Created by JetBrains WebStorm.
 * User: Гулин Сергей
 * Date: 04.06.12
 * Time: 22:31
 * To change this template use File | Settings | File Templates.
 */

(function($, params, Source, Breadcrumbs, Filter, Paging, Board, LedArm) {

    var initBoard = function(arms, armRange) {
        var board = Board(), leds = [];
        $.each(arms, function(k, v) {
            leds.push(LedArm({
                id : v.id,
                state :v.state,
                armRange: armRange
            }));
        });

        board.fill(leds);

        $("#scoreboard").append(board.$element);
    };

    $(function() {

        $("#breadcrumbs").applyWidget(Breadcrumbs, {
            level : params.level
        });

        $("#filter").applyWidget(Filter, {
            current : params.filter.current,
            success : params.filter.success,
            error : params.filter.error,
            range : params.range,
            page : params.page
        });

        Source(params.filter.current, params.page).success(function(data) {
            $("#paging").applyWidget(Paging, {
                current : data.paging.current,
                max : data.paging.max,
                range : params.range,
                filter : params.filter.current
            });

            initBoard(data.arms, params.range);
        })
    });

})(jQuery,
    ns("Page.Params"),
    ns("LightCounter.ViewModels.Source.Loaders.Arms"),
    ns("LightCounter.ViewModels.Breadcrumbs.Arms"),
    ns("LightCounter.ViewModels.Filter.Arms"),
    ns("LightCounter.ViewModels.Paging.Arms"),
    ns("LightCounter.Board"),
    ns("LightCounter.ViewModels.Leds.LedArm.Led"));
