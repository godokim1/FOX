(function($){
	/**
	 * path
	 *
	 * @param  {String} depth01Class => depth01 class name
	 * @param  {String} depth02Class => depth02 class name
	 * @param  {String} depth03Class => depth03 class name
	 * @param  {Array} depthIdx => index 번호 depth 순서대로 입력
	 *
	 * @return {jQuery} this
	 *
	 * @markup language
	 *	<div id="path"></div>
	 *
	 * @stylesheet language
	 *
	 * @JavaScript language
	 *	$("#path").path({
	 *		depthIdx : [0,1]
	 *	});
	 *
	 */
	$.fn.path = function(options){
		if (!this.length) {
			return this;
		}

		var opt = $.extend({
			depth01Class : "depth01",
			depth02Class : "depth02",
			depth03Class : "depth03",
			depthIdx : []
		}, options);

		return this.each(function(){
			var self = this,
				$self = $(self),
				dom = [];

			function init(){
				var depth01 = pathData[opt.depthIdx[0]];
				var depth02 = depth01.child[opt.depthIdx[1]];
				var depth03 = depth02.child[opt.depthIdx[2]];

				if (typeof opt.depthIdx[0] !== "undefined") {
					txt({name : depth01.name, href : depth01.href, cls : opt.depth01Class});
				}
				if (typeof opt.depthIdx[1] !== "undefined") {
					txt({name : depth02.name, href : depth02.href, cls : opt.depth02Class});
				}
				if (typeof opt.depthIdx[2] !== "undefined") {
					txt({name : depth03.name, href : depth03.href, cls : opt.depth03Class});
				}

				$self.append(dom);
			}

			function txt(o){
				var _txt = "";
					_txt += "<span class=\"path_lists " + o.cls + "\">";
					_txt += "	<a href=\"" + o.href + "\">" + o.name + "</a>";
					_txt += "</span>";

				dom.push(_txt);
			}

			init();
		});
	};
}(jQuery));