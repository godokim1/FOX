(function($){
	"use strict";
	/**
	 * tab
	 *
	 * @param  {String}	 tabListsWrap	 => list ul을 감싸고 있는 박스 네이밍
	 * @param  {String}	 tabLists		 => list 클래스나 엘리먼트
	 * @param  {String}	 tabContsWrap	 => contens를 감싸고 있는 박스 네이밍
	 * @param  {String}	 tabConts		 => contens 엘리먼트
	 * @param  {Boolean} auto			 => true : 실행, false : 멈춤
	 * @param  {Number}	 idx			 => 시작 위치
	 * @return {jQuery}	 this
	 *
	 * @markup language
	 |	<div id="tab">
	 |		<div class="tab_list_wrap">
	 |			<ul>
	 |			<li class="tab_lists"><a href="#">list01</a></li>
	 |			</ul>
	 |		</div>
	 |		<div class="tab_cont_wrap">
	 |			<div class="tab_conts">나는내용이다.1</div>
	 |		</div>
	 |	</div>
	 *
	 * @stylesheet language
	 *
	 * @JavaScript language
	 |	$("#tab").tab({
	 |		idx : 1
	 |	});
	 *
	 */
	$.fn.tab = function(options){

		if (!this.length) {
			return this;
		}

		var opt = $.extend({
			tabListsWrap : ".tab_list_wrap",
			tabLists : ".tab_lists",
			tabContsWrap : ".tab_cont_wrap",
			tabConts : ".tab_conts",
			auto : false,
			idx : 0
		}, options);

		return this.each(function(){
			// sele
			var self = this,
				$this = $(self),
				$tabListsWrap = $this.find(opt.tabListsWrap),
				$tabLists = $tabListsWrap.find(opt.tabLists),
				$tabListsA = $tabLists.find("> a"),
				$tabContsWrap = $this.find(opt.tabContsWrap),
				$tabConts = $tabContsWrap.find(opt.tabConts),
				$tabContsA = $tabConts.find("> a");

			var tabListLeg = null,
				storageIdx = null,
				timer = null;

			function init(){
				// setting
				$tabLists.eq(opt.idx).addClass("on");
				$tabConts.eq(opt.idx).siblings().hide();
				storageIdx = opt.idx;
				tabListLeg = $tabLists.length;
				// action event
				autoStart();
				// event add
				$this.on($.data(self, "mouseenter.tab", "mouseenter.tab"), autoStop);
				$this.on($.data(self, "mouseleave.tab", "mouseleave.tab"), autoStart);
				$tabListsA.on($.data(self, "click.tabListsA", "click.tabListsA"), tabListsA);
			}
			/**
			 * Event) tabListsA
			 * @param  {event} e => event
			 * @return {Undefined}
			 */
			function tabListsA(e){
				var _idx = $tabListsA.index(this);
				if (_idx === storageIdx) {
					return false;
				}

				_List({idx : _idx});
				storageIdx = _idx;
				e.preventDefault();
			}
			/**
			 * Event) autoStart
			 * @return {Undefined}
			 */
			function autoStart(){
				if (opt.auto) {
					timer = setInterval(_listsIncrease, 5000);
				}
			}
			/**
			 * Event) autoStop
			 * @return {Undefined}
			 */
			function autoStop(){
				clearInterval(timer);
				timer = null;
			}
			/**
			 * Function) _listsIncrease
			 * @return {Undefined}
			 */
			function _listsIncrease(){
				if (++storageIdx >= tabListLeg) {
					storageIdx = 0;
				}
				_List({idx : storageIdx});
			}
			/**
			 * Function) _List
			 * @param  {Number} o.idx => targeting index
			 * @return {Undefined}
			 */
			function _List(o){
				_listsClear();
				_listsAdd({idx : o.idx});
				_contsClear();
				_contsAdd({idx : o.idx});
			}
			/**
			 * Function) _contsAdd
			 * @param  {Number} o.idx => targeting index
			 * @return {Undefined}
			 */
			function _contsAdd(o){
				if ($tabConts.eq(o.idx).is(":hidden")) {
					$tabConts.eq(o.idx)
						.css({"display" : "block", "left" : "100%"})
						.animate({"left" : 0});
				}
			}
			/**
			 * Function) _listsAdd
			 * @param  {Number} o.idx => targeting index
			 * @return {Undefined}
			 */
			function _listsAdd(o){
				if (!$tabLists.eq(o.idx).hasClass("on")) {
					$tabLists.eq(o.idx).show().addClass("on");
				}
			}
			/**
			 * Function) _contsClear
			 * @return {Undefined}
			 */
			function _contsClear(){
				$.each($tabConts, function(){
					if ($(this).is(":visible")) {
						$(this).animate({"left" : "-100%"}, function(){$(this).css({"display" : "none"})});
					}
				});
			}
			/**
			 * Function) _listsClear
			 * @return {Undefined}
			 */
			function _listsClear(){
				$.each($tabLists, function(){
					if ($(this).hasClass("on")) {
						$(this).removeClass("on");
					}
				});
			}

			init();
		});
	};
}(jQuery));