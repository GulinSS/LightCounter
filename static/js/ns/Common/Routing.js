/**
 * Created with PyCharm.
 * User: Гулин Сергей
 * Date: 12.06.12
 * Time: 17:48
 * To change this template use File | Settings | File Templates.
 */

(function($, R) {

    R.url = function(url, positionParams, queryParams) {
        var paramString = "";

        if (positionParams !== undefined)
            $.each(positionParams, function(k, v) {
                paramString += "/" + v;
            });

        if (queryParams === undefined)
            return url + paramString;

        return url + paramString + "/?" + $.param(queryParams);
    };

    R.callback = function(url, positionParams, queryParams){
        return function() {
            document.location.href = R.url(url, positionParams, queryParams);
        }
    }

})(jQuery, ns("Common.Routing"));