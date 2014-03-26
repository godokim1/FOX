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
	$.fn.gnb = function(opt){
		if (!this.length) {
			return this;
		}

		var o = $.extend({
			depth01 : ".depth01",
			depth02 : ".depth02",
			depth03 : ".depth03",
			depth01List : ".depth01Lists",
			depth02List : ".depth02Lists",
			depth03List : ".depth03Lists",
			depth01Idx : null,
			depth02Idx : null,
			depth03Idx : null
		}, opt);

		return this.each(function(){
			var Gnb = function(){},
				gnb = null;

			var $this = $(this),
				$depth01 = $this.find(o.depth01),
				$depth02 = $this.find(o.depth02),
				$depth03 = $this.find(o.depth03),
				$depth01List = $depth01.find(o.depth01List),
				$depth02List = $depth01.find(o.depth02List),
				$depth03List = $depth01.find(o.depth03List);

			var storageDep01Idx = null,
				storageDep02Idx = null,
				storageDep03Idx = null,
				mainPage = null;

			Gnb.fn = Gnb.prototype;
			Gnb.fn.init = function(){
				this.EventAddlistener({selecter : $this, type : "mouseleave.gnb", event : this.EventGnb});
				this.EventAddlistener({selecter : $depth01List, type : "mouseenter.depth01", event : this.EventDepth01List});
				this.EventAddlistener({selecter : $depth02List, type : "mouseenter.depth02", event : this.EventDepth02List});
				mainPage = this.FunMainPageCheck();
				// Main Gnb initialization
				if (mainPage) {
					this.FunMainInit();
				} else {
				// Sub Gnb initialization
					this.FunSubInit();
				}
			};

			/**
			 * Addlistener
			 * @param {Object} o -> selecter : "이벤트 종류"
			 *					 -> type : "이벤트 종류"
			 *					 -> event : "호출 이벤트"
			 * @note -> Event 경우 param값을 넘기지 않는다.
			 */
			Gnb.fn.EventAddlistener = function(o){
				o.selecter.on(o.type, o.event);
			};
			Gnb.fn.EventRemovelistener = function(o){
				o.selecter.off(o.type);
			};

			Gnb.fn.EventGnb = function(){
				var _this = gnb;

				_this.FunGnbClear();

				if (mainPage) {
					_this.FunMainInit();
				} else {
					_this.FunSubInit();
				}
			};
			Gnb.fn.EventDepth01List = function(){
				var _this = gnb;
				var _idx = $(this).index();

				if (_idx === storageDep01Idx) {
					return false;
				}

				_this.FunGnbClear();
				_this.FunDepth02Open({selecter : $(this).find($depth02)});

				storageDep01Idx = _idx;
				return false;
			};
			Gnb.fn.EventDepth02List = function(){
				var _this = gnb;
				var _idx = $(this).index();

				if (_idx === storageDep02Idx) {
					return false;
				}

				_this.FunDepth03Close();
				_this.FunDepth03Open({selecter : $(this).find($depth03)});

				storageDep02Idx = _idx;
				return false;
			};

			Gnb.fn.FunMainPageCheck = function(){
				if (o.depth01Idx === null &&
					o.depth02Idx === null &&
					o.depth03Idx === null) return true;
				else return false;
			};

			Gnb.fn.FunMainInit = function(){};
			Gnb.fn.FunSubInit = function(){
				this.MetOpen({selecter : $depth02.eq(o.depth01Idx)});
				this.MetOpen({selecter : $depth02.eq(o.depth01Idx).find($depth03)});
				this.MetAddClass({selecter : $depth01List.eq(o.depth01Idx), clsName: "on"});
				this.MetAddClass({selecter : $depth01List.eq(o.depth01Idx).find($depth02List).eq(o.depth02Idx), clsName: "on"});
				this.MetAddClass({selecter : $depth01List.eq(o.depth01Idx).find($depth02List).eq(o.depth02Idx).find($depth03List).eq(o.depth03Idx), clsName: "on"});
				storageDep01Idx = o.depth01Idx;
				storageDep02Idx = o.depth02Idx;
				storageDep03Idx = o.depth03Idx;
			};
			// add
			Gnb.fn.FunDepth02Open = function(o){
				this.MetOpen({selecter : o.selecter});
				return this;
			};
			Gnb.fn.FunDepth03Open = function(o){
				this.MetOpen({selecter : o.selecter});
				return this;
			};
			// clear
			Gnb.fn.FunGnbClear = function(){
				this.FunDepth03Close();
				this.FunDepth02Close();
				return this;
			};
			Gnb.fn.FunDepth02Close = function(){
				_this = this;
				$.each($depth01List.eq(storageDep01Idx).find($depth02), function(){
					if ($(this).is(":visible")) {
						_this.MetClose({selecter : $(this)});
					}
				});
				return this;
			};
			Gnb.fn.FunDepth03Close = function(){
				_this = this;
				$.each($depth01List.eq(storageDep01Idx).find($depth03), function(){
					if ($(this).is(":visible")) {
						_this.MetClose({selecter : $(this)});
					}
				});
				return this;
			};
			// common
			Gnb.fn.MetOpen = function(o){
				o.selecter.show();
				return this;
			};
			Gnb.fn.MetClose = function(o){
				o.selecter.hide();
				return this;
			};
			Gnb.fn.MetAddClass = function(o){
				o.selecter.addClass(o.clsName);
				return this;
			};

			// init();
			this["Gnb"] = new Gnb();
			gnb = this.Gnb;
			gnb.init();
		});
	};
}(jQuery));