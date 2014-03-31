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
	 * FoxCalendar
	 *
	 * @param  {Number} today.y		=> today Yaer
	 * @param  {Number} today.m		=> today Month
	 * @param  {Number} today.d		=> today day
	 * @param  {Number} schedule.y	=> schedule Yaer
	 * @param  {Number} schedule.m	=> schedule Month
	 * @param  {Number} schedule.d	=> schedule day
	 * @param  {String} schedule.t	=> schedule Text
	 * @param  {String} yearPrev	=> yearPrev Btn Id
	 * @param  {String} monthPrev	=> monthPrev Btn Id
	 * @param  {String} monthNext	=> monthNext Btn Id
	 * @param  {String} yearNext	=> yearNext Btn Id
	 * 
	 * @return {jQuery} this
	 *
	 * @markup language
	 |	<div id="calendarDiv" class="calendarDiv"></div>
	 *
	 * @stylesheet language
	 *
	 * @JavaScript language
	 |	$("#calendarDiv").FoxCalendar({
	 |		schedule : [{
	 |			y : 2014,
	 |			m : 3,
	 |			d : 3,
	 |			t : "놀자"
	 |		}]
	 |	});
	 *
	 */
	$.fn.FoxCalendar = function(options){

		if (!this.length) {
			return this;
		}

		var opt = $.extend({
			today : {
				y : null,
				m : null,
				d : null
			},
			yearPrev : "yearPrev",
			monthPrev : "monthPrev",
			monthNext : "monthNext",
			yearNext : "yearNext"
		}, options);

		return this.each(function(){
			// selecter
			var self = this,
				$self = $(self);
			// control
			var date, todayY, todayM, todayD;
			// this data
			$.data(self, "click.yearPrev");
			$.data(self, "click.monthPrev");
			$.data(self, "click.yearNext");
			$.data(self, "click.monthNext");
			$.data(self, "param.dateY");
			$.data(self, "param.dateM");

			//-------------------------- Initialization --------------------------//

			function init(){
				// setting
				setting();

				// dom draw
				headDraw(todayY, todayM);
				bodyDraw(todayY, todayM);

				// event add
				$("#"+opt.yearPrev).on($.data(self, "click.yearPrev", "click.yearPrev"), yearPrev);
				$("#"+opt.monthPrev).on($.data(self, "click.monthPrev", "click.monthPrev"), monthPrev);
				$("#"+opt.yearNext).on($.data(self, "click.yearNext", "click.yearNext"), yearNext);
				$("#"+opt.monthNext).on($.data(self, "click.monthNext", "click.monthNext"), monthNext);
			}

			//-------------------------- Event --------------------------//

			/**
			 * Event) yearPrev => 이전년도 이벤트
			 * 
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 */
			function yearPrev(pY, pM){
				bodyDraw($.data(self, "param.dateY") - 1, $.data(self, "param.dateM"));
			}
			/**
			 * Event) monthPrev => 이전달 이벤트
			 * 
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 */
			function monthPrev(){
				var _y = $.data(self, "param.dateY"),
					_m = $.data(self, "param.dateM");

				if (_m == 1) {
					_y = _y-1;
					_m = 12;
				} else {
					_y = _y;
					_m = _m-1;
				}
				bodyDraw(_y, _m);
			}
			/**
			 * Event) monthNext => 다음달 이벤트
			 * 
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 */
			function monthNext(pY, pM){
				var _y = $.data(self, "param.dateY"),
					_m = $.data(self, "param.dateM");

				if (_m == 12) {
					_y = _y+1;
					_m = 1;
				} else {
					_y = _y;
					_m = _m+1;
				}
				bodyDraw(_y, _m);
			}
			/**
			 * Event) yearNext => 다음년도 이벤트
			 * 
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 */
			function yearNext(pY, pM){
				bodyDraw($.data(self, "param.dateY") + 1, $.data(self, "param.dateM"));
			}

			//-------------------------- Method --------------------------//

			/**
			 * Method) setting => 초기화 설정
			 */
			function setting(){
				date = new Date();
				todayY = date.getFullYear();
				todayM = date.getMonth() + 1;
				todayD = date.getDate();
				$.data(self, "param.dateY", todayY);
				$.data(self, "param.dateM", todayM);
			}
			/**
			 * Method) headDraw => 날짜와 요일을 그려줌
			 * 
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 */
			function headDraw(pY, pM){
				var _txt = headTxt(pY, pM);
				$self.append(_txt);
			}
			/**
			 * Method) bodyDraw = 달력을 그려줌
			 * 
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 */
			function bodyDraw(pY, pM){
				var _txt = bodyTxt(pY, pM);
				$.data(self, "param.dateY", pY);
				$.data(self, "param.dateM", pM);

				viewDateExecute(pY, pM);
				
				$self.find("tbody").html(_txt);
			}

			//-------------------------- Function --------------------------//

			/**
			 * Function) headTxt => headDraw 에서 그려줄 String
			 * 
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * 
			 * @return {String} _text
			 */
			function headTxt(pY, pM){
				var _text =
				  '<div class="c_controll">'
				+ '	<strong id="viewDate">' + pY + '/' + ((pM < 10) ? ('0' + pM) : pM) + '</strong>'
				+ '	<button id="' + opt.yearPrev + '"> Y- </button>'
				+ '	<button id="' + opt.monthPrev + '"> M- </button>'
				+ '	<button id="' + opt.monthNext + '"> M+ </button>'
				+ '	<button id="' + opt.yearNext + '"> Y+ </button>'
				+ '</div>'
				+ '<table>'
				+ '	<colgroup>'
				+ '		<col style="width:100px" />'
				+ '		<col style="width:100px" />'
				+ '		<col style="width:100px" />'
				+ '		<col style="width:100px" />'
				+ '		<col style="width:100px" />'
				+ '		<col style="width:100px" />'
				+ '		<col style="width:100px" />'
				+ '	</colgroup>'
				+ '	<thead>'
				+ '		<tr>'
				+ '		<th scope="col" class="c_sunday">일</th>'
				+ '		<th scope="col">월</th>'
				+ '		<th scope="col">화</th>'
				+ '		<th scope="col">수</th>'
				+ '		<th scope="col">목</th>'
				+ '		<th scope="col">금</th>'
				+ '		<th scope="col">토</th>'
				+ '		</tr>'
				+ '	</thead>'
				+ '	<tbody>'
				+ '	</tbody>'
				+ '</table>';
				return _text;
			}
			/**
			 * Function) viewDateExecute => 이벤트 발생시 년도 변경
			 * 
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 */
			function viewDateExecute(pY, pM){
				$("#viewDate").html(pY + "/" + pM);
			}
			/**
			 * Function) bodyTxt => bodyDraw 에서 그려줄 String
			 * 
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * 
			 * @return {String} _text
			 */
			function bodyTxt(pY, pM){
				var _text = "";
				var _d = (pY+(pY-pY%4)/4-(pY-pY%100)/100+(pY-pY%400)/400+pM*2+(pM*5-pM*5%9)/9-(pM<3?pY%4||pY%100==0&&pY%400?2:3:4))%7;

				for (var i = 0; i < 42; i++) {
					if (i%7==0) _text += '</tr>\n<tr>';
					if (i < _d || i >= _d+(pM*9-pM*9%8)/8%2+(pM==2?pY%4||pY%100==0&&pY%400?28:29:30)) _text += '<td></td>';
					else {
						var __d = i+1-_d;
						if (__d === todayD && pY === todayY && todayM === pM) {
							if (isSchedule({y : pY, m : pM, d : __d})) {
								_text += '<td class="c_today"><span>' + __d + '</span><p>'+getSchedule(__d)+'</p></td>';
							} else {
								_text += '<td class="c_today"><span>' + __d + '</span></td>';
							}
						} else {
							if (isSchedule({y : pY, m : pM, d : __d})) {
								_text += '<td' + (i%7 ? '' : ' class="c_sunday"') + '><span>' + __d + '</span><p>'+getSchedule(__d)+'</p></td>';
							} else {
								_text += '<td' + (i%7 ? '' : ' class="c_sunday"') + '><span>' + __d + '</span></td>';
							}
						}
					}
				}
				_text += '</tr>';
				return _text;
			}
			/**
			 * Function) isSchedule => 이번달이 맞는지 확인하는 Function 이번달일 경우에만 text를 뿌려주기 위한 Function
			 * 
			 * @param  {Number}  o.y => Year
			 * @param  {Number}  o.m => Month
			 * @param  {Number}  o.d => Date
			 * 
			 * @return {Boolean} => 초기 설정 schedule 값 중 y,m,d 모두 일치하면 true
			 */
			function isSchedule(o){
				var leg = opt.schedule.length;
				for (var i = 0; i < leg; i++) {
					if (o.y === opt.schedule[i].y && o.m === opt.schedule[i].m && o.d === opt.schedule[i].d) {
						return true;
					}
				}
				return false;
			}
			/**
			 * Function) getSchedule => 이번달에 해당하는 스큐쥴만 보여주기위한 Function
			 * 
			 * @param  {Number} date => for Date
			 * 
			 * @return {Number} => 초기설정 schedule 값 d 와 일치하면 해당 스케쥴 반환
			 */
			function getSchedule(date){
				var leg = opt.schedule.length;
				for (var i = 0; i < leg; i++) {
					if (date === opt.schedule[i].d) {
						return opt.schedule[i].t;
					}
				}
			}

			// Execute
			init();
		});
	};
}(jQuery));