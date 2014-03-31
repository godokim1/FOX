/**
 * [description]
 * @return {[type]} [description]
 */
(function($){
	/**
	 * gnb
	 * @param  {Object} opt -> depth01~03 : ul || div, depthList01~03 : li, depthIdx01~03 : StartNumber
	 * @return {jQuery} this
	 * @markup language
	 | 	<div id="gnb">
	 |		<div class="depth01">
	 |			<ul>
	 |			<li class="EventDepth01Lists">
	 |				<a href="#">list01</a>
	 |				<div class="depth02">
	 |					<ul>
	 |					<li class="depth02Lists">
	 |						<a href="#">list01</a>
	 |						<div class="depth03">
	 |							<ul>
	 |							<li class="depth03Lists"><a href="#">list01</a></li>
	 |							</ul>
	 |						</div>
	 |					</li>
	 |					</ul>
	 |				</div>
	 |			</li>
	 |			</ul>
	 |		</div>
	 |	</div>
	 * @stylesheet language
	 * @JavaScript language
	 |	$("#gnb").gnb({
	 |		depth01Idx : 1,
	 |		depth02Idx : 0,
	 |		depth03Idx : 2
	 |	});
	 * @note
	 */
	$.fn.gnb = function(options){
		if (!this.length) {
			return this;
		}

		var opt = $.extend({
			depth01 : ".depth01",
			depth02 : ".depth02",
			depth03 : ".depth03",
			depth01List : ".depth01Lists",
			depth02List : ".depth02Lists",
			depth03List : ".depth03Lists",
			depth01Idx : null,
			depth02Idx : null,
			depth03Idx : null
		}, options);

		return this.each(function(){
			// selecter
			var self = this,
				$self = $(self),
				$depth01 = $self.find(opt.depth01),
				$depth02 = $self.find(opt.depth02),
				$depth03 = $self.find(opt.depth03),
				$depth01List = $depth01.find(opt.depth01List),
				$depth02List = $depth01.find(opt.depth02List),
				$depth03List = $depth01.find(opt.depth03List);
			// control
			var storageDep01Idx = null,
				storageDep02Idx = null,
				storageDep03Idx = null,
				mainPage = null;

			//-------------------------- Initialization --------------------------//

			function init(){
				mainPage = mainPageCheck();
				// Main Gnb setting
				if (mainPage) mainSetting();
				// Sub Gnb setting
				else subSetting();

				// event add
				$self.on($.data(self,"mouseleave.gnb","mouseleave.gnb"), gnb);
				$depth01List.on($.data(self,"mouseenter.depth01","mouseenter.depth01"), depth01List);
				$depth02List.on($.data(self,"mouseenter.depth02","mouseenter.depth02"), depth02List);
			}

			//-------------------------- Event --------------------------//
			
			/**
			 * Event) gnb => gnb 영역 벗어날경우 발생
			 */
			function gnb(){
				gnbClear();

				if (mainPage) mainSetting();
				else subSetting();
			}
			/**
			 * Event) depth01List => depth01에 마우스 오버시 발생
			 */
			function depth01List(){
				var _idx = $(this).index();

				if (_idx === storageDep01Idx) {
					return false;
				}

				gnbClear();
				$(this).find($depth02).show();

				storageDep01Idx = _idx;
				return false;
			}
			/**
			 * Event) depth02List => depth02에 마우스 오버시 발생
			 */
			function depth02List(){
				var _idx = $(this).index();

				if (_idx === storageDep02Idx) {
					return false;
				}

				depth03Clear();
				$(this).find($depth03).show();

				storageDep02Idx = _idx;
				return false;
			}

			//-------------------------- Method --------------------------//
			/**
			 * Method) mainPageCheck => 메인인지 서브인 체크
			 *
			 * @return {Boolean} main : true, sub : false
			 */
			function mainPageCheck(){
				if (opt.depth01Idx === null &&
					opt.depth02Idx === null &&
					opt.depth03Idx === null) return true;
				else return false;
			}
			/**
			 * Method) 메인 초기화
			 */
			function mainSetting(){
				storageDep01Idx = null;
				storageDep02Idx = null;
				storageDep03Idx = null;
			}
			/**
			 * Method) 서브 초기화
			 */
			function subSetting(){
				storageDep01Idx = opt.depth01Idx;
				storageDep02Idx = opt.depth02Idx;
				storageDep03Idx = opt.depth03Idx;

				$depth01List
					.eq(storageDep01Idx).addClass("on")
					.find($depth02).show()
					.find($depth02List).eq(storageDep02Idx).addClass("on")
					.find($depth03).show()
					.find($depth03List).eq(storageDep03Idx).addClass("on");
			}
			/**
			 * Method) depth02Clear => depth02 내용 숨기기
			 */
			function depth02Clear(){
				$.each($depth01List.eq(storageDep01Idx).find($depth02), function(){
					if ($(this).is(":visible")) {
						$(this).hide();
					}
				});
			}
			/**
			 * Method) depth03Clear => depth03 내용 숨기기
			 */
			function depth03Clear(){
				$.each($depth01List.eq(storageDep01Idx).find($depth03), function(){
					if ($(this).is(":visible")) {
						$(this).hide();
					}
				});
			}

			//-------------------------- Function --------------------------//
			/**
			 * Function) gnbClear => gnb 내용 숨기기
			 */
			function gnbClear(){
				depth03Clear();
				depth02Clear();
			}
			

			init();
		});
	};
}(jQuery));