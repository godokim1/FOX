/**
 * [description]
 * @return {[type]} [description]
 */
(function($){
	/**
	 * FoxCalendar
	 * @param  {Object} opt -> depth01~03 : a, depthIdx01~03 : startNumber
	 * @return {jQuery} this
	 * @markup language
	 |	<div id="path">
	 |		<span><a href="#" class="depth01"></a></span>
	 |		<span><a href="#" class="depth02"></a></span>
	 |		<span><a href="#" class="depth03"></a></span>
	 |	</div>
	 * @stylesheet language
	 * @JavaScript language
	 |	$("#path").path({
	 |		depth01Idx : 1,
	 |		depth02Idx : 0,
	 |		depth03Idx : 2
	 |	});
	 * @note
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
			schedule : [
				{
					y : 2014,
					m : 4,
					d : 3,
					t : "놀자"
				} , {
					y : 2014,
					m : 3,
					d : 7,
					t : "신나게 멍청하게 지난단달ㅇ망ㄻㄴ"
				}
			]
		}, options);

		return this.each(function(){
			var FoxCalendar = function(){},
				foxCalendar = null,
				self = this,
				$self = $(self),
				date = new Date();

			FoxCalendar.fn = FoxCalendar.prototype;
			FoxCalendar.fn.init = function(){
				opt.today.y = date.getFullYear();
				opt.today.m = date.getMonth() + 1;
				opt.today.d = date.getDate();
				// this.EventPathInit();
				this.showCalendar(opt.today.y, opt.today.m);


			};
			FoxCalendar.fn.showCalendar = function(y, m){
				var text = '<div class="c_controll">';
				text += '	<button onclick="showCalendar('+(y-1)+','+m+')"> Y- </button>';
				text += '	<button onclick="showCalendar('+(m==1?(y-1)+','+12:y+','+(m-1))+')"> M- </button>';
				text += '	[' + y + '/' + ((m < 10) ? ('0' + m) : m) + ']';
				text += '	<button onclick="showCalendar('+(m==12?(y+1)+','+1:y+','+(m+1))+')"> M+ </button>';
				text += '	<button onclick="showCalendar('+(y+1)+','+m+')"> Y+ </button>';
				text += '</div>';
				text += '<table>';
				text += '	<colgroup>';
				text += '		<col style="width:100px" />';
				text += '		<col style="width:100px" />';
				text += '		<col style="width:100px" />';
				text += '		<col style="width:100px" />';
				text += '		<col style="width:100px" />';
				text += '		<col style="width:100px" />';
				text += '		<col style="width:100px" />';
				text += '	</colgroup>';
				text += '	<thead>';
				text += '		<tr>';
				text += '		<th scope="col" class="c_sunday">일</th>';
				text += '		<th scope="col">월</th>';
				text += '		<th scope="col">화</th>';
				text += '		<th scope="col">수</th>';
				text += '		<th scope="col">목</th>';
				text += '		<th scope="col">금</th>';
				text += '		<th scope="col">토</th>';
				text += '		</tr>';
				text += '	</thead>';

				var _d = (y+(y-y%4)/4-(y-y%100)/100+(y-y%400)/400+m*2+(m*5-m*5%9)/9-(m<3?y%4||y%100==0&&y%400?2:3:4))%7;

				for (i = 0; i < 42; i++) {
					if (i%7==0) text += '</tr>\n<tr>';
					if (i < _d || i >= _d+(m*9-m*9%8)/8%2+(m==2?y%4||y%100==0&&y%400?28:29:30)) text += '<td></td>';
					else {
						var __d = i+1-_d;
						if (__d === opt.today.d && y === opt.today.y && opt.today.m === m) {
							if (this.isSchedule({y : y, m : m, d : __d})) {
								text += '<td class="c_today"><span>' + __d + '</span><p>'+this.getSchedule(__d)+'</p></td>';
							} else {
								text += '<td class="c_today"><span>' + __d + '</span></td>';
							}
						} else {
							if (this.isSchedule({y : y, m : m, d : __d})) {
								text += '<td' + (i%7 ? '' : ' class="c_sunday"') + '><span>' + __d + '</span><p>'+this.getSchedule(__d)+'</p></td>';
							} else {
								text += '<td' + (i%7 ? '' : ' class="c_sunday"') + '><span>' + __d + '</span></td>';
							}
						}
					}
				}
				text += '</tr>\n</table>';
				$self.html(text);
			}
			/**
			 * isSchedule => 이번달이 맞는지 확인하는 method 이번달일 경우에만 text를 뿌려주기 위한 Function
			 * @param  {Number}  o.y => Year
			 * @param  {Number}  o.m => Month
			 * @param  {Number}  o.d => Date
			 * @return {Boolean} => 초기 설정 schedule 값 중 y,m,d 모두 일치하면 true
			 */
			FoxCalendar.fn.isSchedule = function(o){
				var _leg = opt.schedule.length;
				for (var i = 0; i < _leg; i++) {
					if (o.y === opt.schedule[i].y && o.m === opt.schedule[i].m && o.d === opt.schedule[i].d) {
						return true;
					}
				}
				return false;
			}
			/**
			 * getSchedule => 이번달에 해당하는 스큐쥴만 보여주기위한 Function
			 * @param  {Number} date => for Date
			 * @return {Number} => 초기설정 schedule 값 d 와 일치하면 해당 스케쥴 반환
			 */
			FoxCalendar.fn.getSchedule = function(date){
				var _leg = opt.schedule.length;
				for (var i = 0; i < _leg; i++) {
					if (date === opt.schedule[i].d) {
						return opt.schedule[i].t;
					}
				}
			}

			// init();
			this["FoxCalendar"] = new FoxCalendar();
			foxCalendar = this.FoxCalendar;
			foxCalendar.init();
		});
	};
}(jQuery));