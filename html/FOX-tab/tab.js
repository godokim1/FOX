/**
 * Explanation
 *
 * Event - 클릭등 함수를 발생시키는 작업
 * Method - Function으로 작업된 내용을 적용시켜 주는 작업
 * Function - Method를 실행 시키기 위한 행위들
 * 
 * Global Variable - ex) var explain;
 * Local Variable - ex) var _explain;
 * Data Variable - ex) $.data(self) : 지워야하는 함수는 사용하지 않는다
 * 
 * return - return 시 Undefined는 표시하지 않는다.
 * 
 */
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
			// selecter
			var self = this,
				$self = $(self),
				$tabListsWrap = $self.find(opt.tabListsWrap),
				$tabLists = $tabListsWrap.find(opt.tabLists),
				$tabListsA = $tabLists.find("> a"),
				$tabContsWrap = $self.find(opt.tabContsWrap),
				$tabConts = $tabContsWrap.find(opt.tabConts),
				$tabContsA = $tabConts.find("> a");
			// control
			var tabListLeg = null,
				storageIdx = null,
				timer = null;

			function init(){
				// setting
				setting();
				// action event
				autoStart();
				// event add
				$self.on($.data(self, "mouseenter.tab", "mouseenter.tab"), autoStop);
				$self.on($.data(self, "mouseleave.tab", "mouseleave.tab"), autoStart);
				$tabListsA.on($.data(self, "click.tabListsA", "click.tabListsA"), tabListsA);
			}
			/**
			 * Method) setting => 초기화 작업
			 */
			function setting(){
				$tabLists.eq(opt.idx).addClass("on");
				$tabConts.eq(opt.idx).siblings().hide();
				storageIdx = opt.idx;
				tabListLeg = $tabLists.length;
			}
			/**
			 * Event) tabListsA => 리스트에서 A태그 클릭시 발생하는 이벤트
			 * 
			 * @param  {event} e => event
			 */
			function tabListsA(e){
				var _idx = $tabListsA.index(this);

				if (_idx === storageIdx) {
					return false;
				}

				listMove({idx : _idx});
				storageIdx = _idx;
				e.preventDefault();
			}
			/**
			 * Event) autoStart => 초기 auto가 true 라면 자동 실행
			 */
			function autoStart(){
				if (opt.auto) {
					timer = setInterval(listsIncrease, 5000);
				}
			}
			/**
			 * Event) autoStop => 마우스가 tab영역 안에 있다면 auto기능을 제거
			 */
			function autoStop(){
				clearInterval(timer);
				timer = null;
			}
			/**
			 * Method) _listsIncrease => auto 기능 활성화시 자동으로 한칸씩 이동시키는 메소드
			 */
			function listsIncrease(){
				if (++storageIdx >= tabListLeg) {
					storageIdx = 0;
				}
				listMove({idx : storageIdx});
			}
			/**
			 * Method) listMove => 이벤트 발생시 list 이동시키는 메소드
			 * 
			 * @param  {Number} o.idx => targeting index
			 */
			function listMove(o){
				listsClear();
				listsExecute({idx : o.idx});
				contsClear();
				contsExecute({idx : o.idx});
			}
			/**
			 * Function) contsExecute => 컨텐츠영역 이동(다음)
			 * 
			 * @param  {Number} o.idx => targeting index
			 */
			function contsExecute(o){
				if ($tabConts.eq(o.idx).is(":hidden")) {
					$tabConts.eq(o.idx)
						.css({"display" : "block", "left" : "100%"})
						.animate({"left" : 0});
				}
			}
			/**
			 * Function) listsExecute => 리스트영역 클래스 추가
			 * 
			 * @param  {Number} o.idx => targeting index
			 */
			function listsExecute(o){
				if (!$tabLists.eq(o.idx).hasClass("on")) {
					$tabLists.eq(o.idx).show().addClass("on");
				}
			}
			/**
			 * Function) contsClear => 컨텐츠영역 이동(이전)
			 */
			function contsClear(){
				$.each($tabConts, function(){
					if ($(this).is(":visible")) {
						$(this).animate({"left" : "-100%"}, function(){
							$(this).css({"display" : "none"});
						});
					}
				});
			}
			/**
			 * Function) listsClear => 리스트영역 클래스 제거
			 */
			function listsClear(){
				$.each($tabLists, function(){
					if ($(this).hasClass("on")) {
						$(this).removeClass("on");
					}
				});
			}

			// Execute
			init();
		});
	};
}(jQuery));