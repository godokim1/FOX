/**
 * [description]
 * @return {[type]} [description]
 */
(function($){
	/**
	 * FoxSelectBox
	 * @param  {Object} opt -> depth01~03 : a, depthIdx01~03 : startNumber
	 * @return {jQuery} this
	 * @markup language
	 |	<div id='foxSelectBox" + idx + "' class='Dselect_box'>
	 |		<div id='foxSelectBoxToggle" + idx + "' class='Dselect_toggle'>
	 |			<div id='foxSelectBoxVal" + idx + "' class='Dselect_value'><a href='#'>값</a></div>
	 |			<div id='foxSelectBoxBtn" + idx + "' class='Dselect_btn'><a href='#'>닫기</a></div>
	 |		</div>
	 |		<div id='foxSelectBoxOption" + idx + "' class='Dselect_option'>
	 |			<ul></ul>
	 |		</div>
	 |	</div>
	 * @stylesheet language
	 * @JavaScript language
	 |	$(".fox_selectBox").FoxSelectBox();
	 * @note
	 */
	$.fn.FoxSelectBox = function(opt){
		if (!this.length) {
			return this;
		}

		var o = $.extend({
			wrapId : "foxSelectBox",
			wrapCl : "Dselect_box",
			selectToggleId : "foxSelectBoxToggle",
			selectToggleCl : "Dselect_toggle",
			selectValId : "foxSelectBoxVal",
			selectValCl : "Dselect_value",
			selectBtnId : "foxSelectBoxBtn",
			selectBtnCl : "Dselect_btn",
			optionBoxId : "foxSelectBoxOption",
			optionBoxCl : "Dselect_option"
		}, opt);

		return this.each(function(idx){
			var SelectBox = function(){},
				selectBox = null,
				$this = $(this),
				$selectBox = $this.find("select"),
				$selectValue = null,
				$selectBtn = null,
				$selectOption = null,
				$selectList = null,
				flag = false

			SelectBox.fn = SelectBox.prototype;
			SelectBox.fn.init = function(){
				// dom draw setting
				var _clone = this.FunClone();
				var _draw = this.FunDraw(_clone);
				this.FunAppend(_draw);
				// selecter setting
				$selectValue = $this.find("." + o.selectValCl +" a");
				$selectBtn = $this.find("." + o.selectBtnCl +" a");
				$selectOption = $this.find("." + o.optionBoxCl);
				$selectList = $this.find("li > a");
				// select toggle text setting
				$selectValue.text("항목을선택해주세요");
				// event add
				this.EventAddlistener({selecter : $selectValue,	type : "click.selectValue",	event : this.EventSelectValue});
				this.EventAddlistener({selecter : $selectBtn,	type : "click.selectBtn",	event : this.EventSelectBtn});
				this.EventAddlistener({selecter : $selectList,	type : "click.selectList",	event : this.EventSelectList});
			};
			//-------------------------- Event Group (S) --------------------------//
			/**
			 * Event Append
			 * @param {String} type => event type : ex) "click.target", "mouseenter.target"
			 * @param {Function} event => Closures Function : ex) EventSelectValue
			 */
			SelectBox.fn.EventAddlistener = function(o){
				o.selecter.on(o.type, o.event);
			};
			/**
			 * Event Remove
			 * @param {String} o.type => event type : ex) "click.target", "mouseenter.target"
			 */
			SelectBox.fn.EventRemovelistener = function(o){
				o.selecter.off(o.type);
			};
			/**
			 * Event Value Click
			 */
			SelectBox.fn.EventSelectValue = function(){
				MetToggle();
				return false;
			}
			/**
			 * Event Btn Click
			 */
			SelectBox.fn.EventSelectBtn = function(){
				MetToggle();
				return false;
			}
			/**
			 * Event List Click
			 */
			SelectBox.fn.EventSelectList = function(){
				var _val = $(this).attr("val");
				var _txt = $(this).text();
				MetToggle();
				$selectValue.text(_txt);
				$selectBox[0].value = _val;
				return false;
			}
			//-------------------------- Event Group (E) --------------------------//
			//-------------------------- Function Group (S) --------------------------//
			/**
			 * clone => selectbox dom에 있는 value, text 값을 가져와 저장하는 function
			 * @return {Array} _data => 배열 안에 json
			 */
			SelectBox.fn.FunClone = function(){
				var _child = $selectBox.children();
				var _data = [];
				var _parent = 1;

				$.each(_child, function(){
					// optiongroup
					if (!$(this).val()) {
						// optiongroup data
						_data.push({
							"parent" : _parent,
							"text" : $(this).attr("label")
						});
						// optiongroup(children) option data
						$.each($(this).children(), function(){
							_data.push({
								"value" : $(this).val(),
								"text" : $(this).text(),
								"parent" : _parent
							});
							// optiongroup(children) option disabled check
							if ($(this).is(":disabled") === true) {
								_data[_data.length - 1].disabled = true;
							}
						});
						// optiongroup number increase
						_parent++;
					// option
					} else {
						// single option data
						_data.push({
							"value" : $(this).val(),
							"text" : $(this).text(),
							"parent" : false
						});
						// single option disabled check
						if ($(this).is(":disabled") === true) {
							_data[_data.length - 1].disabled = true;
						}
					}
				});

				return _data;
			};
			/**
			 * draw => clone에 저장한 data를 바탕으로 그려주는 공간
			 * @param  {Array} clone => clone에서 저장한 값
			 * @return {josn} => dom에 추가 하기 위한 _DselectOptionHtml, _DselectBox 값을 전달
			 */
			SelectBox.fn.FunDraw = function(clone){
				var _data = clone;
				var _DselectOptionHtml = [];
				var _DselectBox = "";
				// design select wrap html
				_DselectBox += "<div id='" + o.wrapId + idx + "' class='" + o.wrapCl + "'>";
				_DselectBox += "	<div id='" + o.selectToggleId + idx + "' class='" + o.selectToggleCl + "'>";
				_DselectBox += "		<div id='" + o.selectValId + idx + "' class='" + o.selectValCl + "'><a href='#'>값</a></div>";
				_DselectBox += "		<div id='" + o.selectBtnId + idx + "' class='" + o.selectBtnCl + "'><a href='#'>닫기</a></div>";
				_DselectBox += "	</div>";
				_DselectBox += "	<div id='" + o.optionBoxId + idx + "' class='" + o.optionBoxCl + "'>";
				_DselectBox += "		<ul></ul>";
				_DselectBox += "	</div>";
				_DselectBox += "</div>";

				// design select option html
				$.each(_data, function(){
					if (!this.parent) {
						if (this.disabled) {
							_DselectOptionHtml.push("<li class=\"disabled Dselect_singleLists\">" + this.text + "</li>");
						} else {
							_DselectOptionHtml.push("<li class=\"Dselect_singleLists\"><a href=\"#\" val=\"" + this.value + "\">" + this.text + "</a></li>");
						}
					} else {
						if (!this.value) {
							var __parent = this.parent;
							var __text = "";

							$.each(_data, function(){
								if (this.value !== undefined && this.parent === __parent) {
									if (this.disabled) {
										__text += "<li class=\"disabled Dselect_groupLists\">" + this.text + "</li>";
									} else {
										__text += "<li class=\"Dselect_groupLists\"><a href=\"#\" val=\"" + this.value + "\">" + this.text + "</a></li>";
									}
								}
							});

							_DselectOptionHtml.push(
								"<li>"										+
								"	<div class=\"Dselect_group\">"			+
								"		<strong class=\"Dselect_groupTitle\">" + this.text + "</strong>"	+
								"		<ul>" + __text + "</ul>"			+
								"	</div>"									+
								"</li>"
							);
						}
					}
				});

				return {
					"option" : _DselectOptionHtml,
					"box" : _DselectBox
				}
			};
			/**
			 * FunAppend => dom에 drow로 그린 html 추가해주는 공간
			 * @param  {json} html => drow에서 생성한 box, option
			 * @return {undefined} 전달할 값이 없기 때문에 return 값이 필요하지 않다.
			 */
			SelectBox.fn.FunAppend = function(html){
				$this.append(html.box);
				$("#foxSelectBox" + idx).find("ul").append(html.option);
			};
			//-------------------------- Function Group (E) --------------------------//
			//-------------------------- Method Group (S) --------------------------//
			function MetToggle(){
				if (flag) {
					$selectOption.hide();
					flag = false;
				} else {
					$selectOption.show();
					flag = true;
				}
			};
			//-------------------------- Method Group (E) --------------------------//
			// init();
			this["SelectBox"] = new SelectBox();
			selectBox = this.SelectBox;
			selectBox.init();
		});
	};
}(jQuery));