/**
 * Explanation
 *
 * Function - Method를 실행 시키기 위한 행위들
 * Method - Function으로 작업된 내용을 적용시켜 주는 작업
 * Global Variable - ex) var explain;
 * Local Variable - ex) var _explain;
 * return - return 시 Undefined는 표시하지 않는다.
 * 
 * depth표시 이미지 숨김은 css로 컨트롤 한다.
 *
 */
(function($){
	"use strict";
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
	 |	<div id="path"></div>
	 *
	 * @stylesheet language
	 *
	 * @JavaScript language
	 *	$("#path").path({
	 |		depthIdx : [0,1]
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
			// selecter
			var self = this,
				$self = $(self);
			// control
			var dom = [],
				depth01 = null,
				depth02 = null,
				depth03 = null;

			function init(){
				// setting
				setting();

				// depth01
				if (typeof opt.depthIdx[0] !== "undefined") {
					txt({name : depth01.name, href : depth01.href, cls : opt.depth01Class});
				}
				// depth02
				if (typeof opt.depthIdx[1] !== "undefined") {
					txt({name : depth02.name, href : depth02.href, cls : opt.depth02Class});
				}
				// depth03
				if (typeof opt.depthIdx[2] !== "undefined") {
					txt({name : depth03.name, href : depth03.href, cls : opt.depth03Class});
				}

				draw();
			}
			/**
			 * Method) setting =>  => 초기화 작업
			 */
			function setting(){
				depth01 = pathData[opt.depthIdx[0]];
				depth02 = depth01.child[opt.depthIdx[1]];
				depth03 = depth02.child[opt.depthIdx[2]];
			}
			/**
			 * Method) draw => 그려주기 위한 역할
			 */
			function draw(){
				$self.append(dom);
			}
			/**
			 * Function) txt => dom을 그려주기 전 html 태그 생성
			 *
			 * @param  {String} o.name => dpeth name
			 * @param  {String} o.href => depth link href
			 * @param  {String} o.cls => depth class name
			 */
			function txt(o){
				var _txt = "";
					_txt += "<span class=\"path_lists " + o.cls + "\">";
					_txt += "	<a href=\"" + o.href + "\">" + o.name + "</a> &gt";
					_txt += "</span>";

				dom.push(_txt);
			}

			init();
		});
	};
}(jQuery));