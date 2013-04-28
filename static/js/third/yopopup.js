/**
 * Yet anOther Popup
 */

(function($) {

	"use strict";

	var registered = [];
	var popupArea = null;
	var checker = true;

	function getZ(element) {
		var tmp = $(element).css('z-index');
		// Бывает так, что z-index возвращает "auto", тогда, дабы наш попап не появлялся с z-index = 1 под диалогами с z-index over 9000, честно посчитаем максимальный z-index у родителей
		if (isNaN(tmp) || tmp == 0) {	// tmp == 0 - фикс для 7 ИЕ
			tmp = Math.max.apply(null, $.map($(element).parents(), function (e, n) {
				if ($(e).css('position') == 'absolute')
					return parseInt($(e).css('z-index')) || 1;
			}));
		}
		return tmp;
	}

	$(function() {
		popupArea = (function() {
			var popupDiv = $("<div class='popup-area'></div>").appendTo(document.body).hide();
			return {
				hide: function() {
					popupDiv.hide();
				},
				show: function(zIndex, position, content) {
					/* TODO: сделать автоматический отступ от края документа */
					popupDiv.children().detach();
					popupDiv.append(content);
					popupDiv.show();

					popupDiv.css({ top: position.y, left: position.x, "z-index": zIndex });
				}
			}
		})();

		$(document.body).bind("mouseup.yopopup", function() {
			popupArea.hide();
			checker = true;
		})
	});

	$.fn.yopopup = function(options) {
		var opts = $.extend({}, $.fn.yopopup.defaults, options);
		if (popupArea === null)
			throw new Error("Вызов yopopup до инициализации")
		popupArea.hide();



		document.body.oncontextmenu = function() {
			return checker;
		}

		return this.each(function() {
			var $elem = $(this);
			$elem.unbind("mouseup.yopopup");
			$elem.unbind("show.yopopup");
			if (opts.content === "") //Очистить события
				return;

			$elem.bind("mouseup.yopopup", function(e) {
				checker = false;
				if (e.which === opts.mousebutton) {
					$elem.trigger("show.yopopup");
					popupArea.show(getZ(e.target) + 1, { x: e.pageX + opts.offset.x, y: e.pageY + opts.offset.y }, opts.content);
					return false; //кросс-браузерный stopPropogation через jQuery
				}
			}).addClass("popup-actor")
		});
	}

	$.fn.yopopup.defaults = { offset: { x: 0, y: 0 }, content: "", mousebutton: 1 };

})(jQuery);
