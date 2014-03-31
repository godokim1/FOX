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
	$.fn.FoxSelectBox = function(options){

		if (!this.length) {
			return this;
		}

		var opt = $.extend({
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
		}, options);

		return this.each(function(idx){
			// selecter
			var self = this,
				$self = $(self),
				$selectBox = $self.find("select"),
				$selectValue = null,
				$selectBtn = null,
				$selectOption = null,
				$selectList = null;
			// control
			var flag = false;

			function init(){
				// dom selectTxt setting
				var _clone = clone();
				var _selectTxt = selectTxt(_clone);
				append(_selectTxt);
				// selecter setting
				$selectValue = $self.find("." + opt.selectValCl +" a");
				$selectBtn = $self.find("." + opt.selectBtnCl +" a");
				$selectOption = $self.find("." + opt.optionBoxCl);
				$selectList = $self.find("li > a");
				// select toggle text setting
				$selectValue.text("항목을선택해주세요");
				// event add
				$selectValue.on($.data(self,"click.selectValue","click.selectValue"), selectValue);
				$selectBtn.on($.data(self,"click.selectBtn","click.selectBtn"), selectBtn);
				$selectList.on($.data(self,"click.selectList","click.selectList"), selectList);
			}

			//-------------------------- Event --------------------------//

			/**
			 * Event) selectValue
			 */
			function selectValue(){
				toggle();
				return false;
			}
			/**
			 * Event) selectBtn
			 */
			function selectBtn(){
				toggle();
				return false;
			}
			/**
			 * Event) selectList
			 */
			function selectList(){
				var _val = $(this).attr("val"),
					_txt = $(this).text();

				toggle();

				$selectValue.text(_txt);
				$selectBox[0].value = _val;
			}

			//-------------------------- Method --------------------------//

			/**
			 * Method) append => dom에 drow로 그린 html 추가해주는 공간
			 * 
			 * @param  {String} html.box => drow에서 생성한 box
			 * @param  {String} html.option => drow에서 생성한 option
			 * 
			 * @return {undefined} 전달할 값이 없기 때문에 return 값이 필요하지 않다.
			 */
			function append(html){
				$self.append(html.box);
				$("#foxSelectBox" + idx).find("ul").append(html.option);
			}
			/**
			 * Method) toggle => 열고 닫기
			 */
			function toggle(){
				if (flag) {
					$selectOption.hide();
					flag = false;
				} else {
					$selectOption.show();
					flag = true;
				}
			}

			//-------------------------- Function --------------------------//

			/**
			 * Function) clone => selectbox dom에 있는 value, text 값을 가져와 저장하는 function
			 * 
			 * @return {Array} _data => 배열 안에 json
			 */
			function clone(){
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
			}
			/**
			 * Function) selectTxt => clone에 저장한 data를 바탕으로 그려주는 공간
			 * 
			 * @param  {Array} clone => clone에서 저장한 값
			 * 
			 * @return {josn} => dom에 추가 하기 위한 _DselectOptionHtml, _DselectBox 값을 전달
			 */
			function selectTxt(clone){
				var _data = clone;
				var _DselectOptionHtml = [];
				// design select wrap html
				var _DselectBox	= "" +
				"<div id='" + opt.wrapId + idx + "' class='" + opt.wrapCl + "'>" +
				"	<div id='" + opt.selectToggleId + idx + "' class='" + opt.selectToggleCl + "'>" +
				"		<div id='" + opt.selectValId + idx + "' class='" + opt.selectValCl + "'><a href='#'>값</a></div>" +
				"		<div id='" + opt.selectBtnId + idx + "' class='" + opt.selectBtnCl + "'><a href='#'>닫기</a></div>" +
				"	</div>" +
				"	<div id='" + opt.optionBoxId + idx + "' class='" + opt.optionBoxCl + "'>" +
				"		<ul></ul>" +
				"	</div>" +
				"</div>";

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
								"<li>" +
								"	<div class=\"Dselect_group\">" +
								"		<strong class=\"Dselect_groupTitle\">" + this.text + "</strong>" +
								"		<ul>" + __text + "</ul>" +
								"	</div>" +
								"</li>"
							);
						}
					}
				});

				return {
					"option" : _DselectOptionHtml,
					"box" : _DselectBox
				};
			}

			// Execute
			init();
		});
	};
}(jQuery));