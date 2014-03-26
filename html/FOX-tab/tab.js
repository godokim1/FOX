/**
 * [description]
 * @return {[type]} [description]
 */
(function($){
	/**
	 * tab
	 * @param  {Object} opt -> tabListsWrap, : ul || div, tabLists : li, tabContsWrap, tabConts : div, idx : StartNumber
	 * @return {jQuery} this
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
	 * @stylesheet language
	 * @JavaScript language
	 |	$("#tab").tab({
	 |		idx : 1
	 |	});
	 * @note
	 */
	$.fn.tab = function(opt){
		if (!this.length) {
			return this;
		}

		var o = $.extend({
			tabListsWrap : ".tab_list_wrap",
			tabLists : ".tab_lists",
			tabContsWrap : ".tab_cont_wrap",
			tabConts : ".tab_conts",
			auto : false,
			idx : 0
		}, opt);

		return this.each(function(){
			var Tab = function(){},
				tab = null,
				$this = $(this),
				$tabListsWrap = $this.find(o.tabListsWrap),
				$tabLists = $tabListsWrap.find(o.tabLists),
				$tabListsA = $tabLists.find("> a"),
				$tabContsWrap = $this.find(o.tabContsWrap),
				$tabConts = $tabContsWrap.find(o.tabConts),
				$tabContsA = $tabConts.find("> a"),
				tabListLeg = null,
				storageIdx = null,
				timer = null;

			Tab.fn = Tab.prototype;
			Tab.fn.init = function(){
				this.FunTabInit();
				this.FunAutoStart();
				this.EventAddlistener({selecter : $this, type : "mouseenter.tab", event : this.EventTab});
				this.EventAddlistener({selecter : $this, type : "mouseleave.tab", event : this.FunAutoStart});
				this.EventAddlistener({selecter : $tabListsA, type : "click.tabListsA", event : this.EventTabListsA});
			};
			/**
			 * Addlistener
			 * @param {Object} o -> selecter : "이벤트 종류"
			 *					 -> type : "이벤트 종류"
			 *					 -> event : "호출 이벤트"
			 * @note -> Event 경우 param값을 넘기지 않는다.
			 */
			Tab.fn.EventAddlistener = function(o){
				o.selecter.on(o.type, o.event);
			};
			Tab.fn.EventRemovelistener = function(o){
				o.selecter.off(o.type);
			};
			Tab.fn.EventTab = function(){
				tab.FunAutoStop();
			};
			Tab.fn.EventTabListsA = function(e){
				var _idx = $tabListsA.index(this);

				if (_idx === storageIdx) {
					return false;
				}

				tab.FunList({idx : _idx});
				storageIdx = _idx;
				e.preventDefault();
			};

			// Fun : init
			Tab.fn.FunTabInit = function(){
				tabListLeg = $tabLists.length;
				$tabLists.eq(o.idx).addClass("on");
				$tabConts.eq(o.idx).siblings().hide();
				storageIdx = o.idx;
			};
			// Fun : auto
			Tab.fn.FunAutoStart = function(){
				timer = setInterval(tab.FunTabListsIncrease, 5000);
			};
			// Fun : autoStop
			Tab.fn.FunAutoStop = function(){
				clearInterval(timer);
				timer = null;
			};
			// Fun : list++
			Tab.fn.FunTabListsIncrease = function(){
				if (++storageIdx >= tabListLeg) {
					storageIdx = 0;
				}
				tab.FunList({idx : storageIdx});
			};
			// Fun : list
			Tab.fn.FunList = function(o){
				this.MetContsClear();
				this.MetListsClear();
				this.MetContsAdd({idx : o.idx});
				this.MetListsAdd({idx : o.idx});
			};
			// Method : add
			Tab.fn.MetContsAdd = function(o){
				if ($tabConts.eq(o.idx).is(":hidden")) {
					// $tabConts.eq(o.idx).show();
					$tabConts.eq(o.idx)
						.css({"display" : "block", "left" : "100%"})
						.animate({"left" : 0});
				}
			};
			Tab.fn.MetListsAdd = function(o){
				if (!$tabLists.eq(o.idx).hasClass("on")) {
					$tabLists.eq(o.idx).show().addClass("on");
				}
			};
			// Method : clear
			Tab.fn.MetContsClear = function(){
				$.each($tabConts, function(){
					if ($(this).is(":visible")) {
						// $(this).hide();
						$(this).animate({"left" : "-100%"}, function(){$(this).css({"display" : "none"})});
					}
				});
			};
			Tab.fn.MetListsClear = function(){
				$.each($tabLists, function(){
					if ($(this).hasClass("on")) {
						$(this).removeClass("on");
					}
				});
			};

			this["Tab"] = new Tab();
			tab = this.Tab;
			tab.init();
		});
	};
}(jQuery));