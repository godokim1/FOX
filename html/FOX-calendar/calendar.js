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
			var self = this,
				$self = $(self);
			var date = new Date();

			function init(){
				// date setting
				opt.today.y = date.getFullYear();
				opt.today.m = date.getMonth() + 1;
				opt.today.d = date.getDate();
				$.data(self, "dateY", opt.today.y);
				$.data(self, "dateM", opt.today.m);

				// dom draw
				_headDraw(opt.today.y, opt.today.m);
				_bodyDraw(opt.today.y, opt.today.m);

				// event add
				$("#"+opt.yearPrev).on($.data(self, "click.yearPrev", "click.yearPrev"), yearPrev);
				$("#"+opt.monthPrev).on($.data(self, "click.monthPrev", "click.monthPrev"), monthPrev);
				$("#"+opt.yearNext).on($.data(self, "click.yearNext", "click.yearNext"), yearNext);
				$("#"+opt.monthNext).on($.data(self, "click.monthNext", "click.monthNext"), monthNext);
			};
			/**
			 * Function) _headDraw > __head
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * @return {String} __text => _headDraw 에서 그려줄 dom을 넘겨줌
			 */
			function __head(pY, pM){
				var __text =
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
				return __text;
			}
			/**
			 * Function) _headDraw
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * @return {Undefined}
			 */
			function _headDraw(pY, pM){
				var _txt = __head(pY, pM);
				$self.append(_txt);
			}
			/**
			 * Function) _bodyDraw > __body
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * @return {String} __text => _bodyDraw 에서 그려줄 dom을 넘겨줌
			 */
			function __body(pY, pM){
				var __text = "";
				var __d = (pY+(pY-pY%4)/4-(pY-pY%100)/100+(pY-pY%400)/400+pM*2+(pM*5-pM*5%9)/9-(pM<3?pY%4||pY%100==0&&pY%400?2:3:4))%7;

				for (var i = 0; i < 42; i++) {
					if (i%7==0) __text += '</tr>\n<tr>';
					if (i < __d || i >= __d+(pM*9-pM*9%8)/8%2+(pM==2?pY%4||pY%100==0&&pY%400?28:29:30)) __text += '<td></td>';
					else {
						var ___d = i+1-__d;
						if (___d === opt.today.d && pY === opt.today.y && opt.today.m === pM) {
							if (isSchedule({y : pY, m : pM, d : ___d})) {
								__text += '<td class="c_today"><span>' + ___d + '</span><p>'+getSchedule(___d)+'</p></td>';
							} else {
								__text += '<td class="c_today"><span>' + ___d + '</span></td>';
							}
						} else {
							if (isSchedule({y : pY, m : pM, d : ___d})) {
								__text += '<td' + (i%7 ? '' : ' class="c_sunday"') + '><span>' + ___d + '</span><p>'+getSchedule(___d)+'</p></td>';
							} else {
								__text += '<td' + (i%7 ? '' : ' class="c_sunday"') + '><span>' + ___d + '</span></td>';
							}
						}
					}
				}
				__text += '</tr>';
				return __text;
			}
			/**
			 * Function) _bodyDraw > __viewDate
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * @return {Undefined}
			 */
			function __viewDate(pY, pM){
				$("#viewDate").html(pY + "/" + pM);
			}
			/**
			 * Function) _bodyDraw
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * @return {Undefined}
			 */
			function _bodyDraw(pY, pM){
				$.data(self, "dateY", pY);
				$.data(self, "dateM", pM);

				__viewDate(pY, pM);
				var _txt = __body(pY, pM);

				$self.find("tbody").html(_txt);
			}
			/**
			 * Event) yearPrev
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * @return {Undefined}
			 */
			function yearPrev(pY, pM){
				_bodyDraw($.data(self, "dateY") - 1, $.data(self, "dateM"));
			}
			/**
			 * Event) monthPrev
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * @return {Undefined}
			 */
			function monthPrev(){
				var _y = $.data(self, "dateY"),
					_m = $.data(self, "dateM");

				if (_m == 1) {
					_y = _y-1;
					_m = 12;
				} else {
					_y = _y;
					_m = _m-1;
				}
				_bodyDraw(_y, _m);
			}
			/**
			 * Event) monthNext
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * @return {Undefined}
			 */
			function monthNext(pY, pM){
				var _y = $.data(self, "dateY"),
					_m = $.data(self, "dateM");

				if (_m == 12) {
					_y = _y+1;
					_m = 1;
				} else {
					_y = _y;
					_m = _m+1;
				}
				_bodyDraw(_y, _m);
			}
			/**
			 * Event) yearNext
			 * @param  {Number} pY => Year
			 * @param  {Number} pM => Month
			 * @return {Undefined}
			 */
			function yearNext(pY, pM){
				_bodyDraw($.data(self, "dateY") + 1, $.data(self, "dateM"));
			}
			/**
			 * Method) isSchedule => 이번달이 맞는지 확인하는 method 이번달일 경우에만 text를 뿌려주기 위한 Function
			 * @param  {Number}  o.y => Year
			 * @param  {Number}  o.m => Month
			 * @param  {Number}  o.d => Date
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
			 * Method) getSchedule => 이번달에 해당하는 스큐쥴만 보여주기위한 Function
			 * @param  {Number} date => for Date
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

			init();
		});
	};
}(jQuery));