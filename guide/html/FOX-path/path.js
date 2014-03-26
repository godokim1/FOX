/**
 * [description]
 * @return {[type]} [description]
 */
(function($){
	/**
	 * path
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
	$.fn.path = function(opt){
		if (!this.length) {
			return this;
		}

		var o = $.extend({
			depth01 : ".depth01",
			depth02 : ".depth02",
			depth03 : ".depth03",
			depth01Idx : null,
			depth02Idx : null,
			depth03Idx : null
		}, opt);

		return this.each(function(){
			var Path = function(){},
				path = null,
				$this = $(this),
				$depth01 = $this.find(o.depth01),
				$depth02 = $this.find(o.depth02),
				$depth03 = $this.find(o.depth03),
				depth01Data, depth02Data, depth03Data;

			Path.fn = Path.prototype;
			Path.fn.init = function(){
				this.EventPathInit();
			};
			Path.fn.EventPathInit = function(){
				// dpeth data have check
				var _depth01Idx = this.FunDepthCheck({depthIdx : o.depth01Idx});
				var _depth02Idx = this.FunDepthCheck({depthIdx : o.depth02Idx});
				var _depth03Idx = this.FunDepthCheck({depthIdx : o.depth03Idx});

				// depth01 data input
				if (_depth01Idx !== null) {
					depth01Data = this.FunDataDepth01();
					this.FunDepth01Add();
				} else {
					this.MetDepthRemove({selecter : $depth01.parent()});
				}

				// depth02 data input
				if (_depth02Idx !== null) {
					depth02Data = this.FunDataDepth02();
					this.FunDepth02Add();
				} else {
					this.MetDepthRemove({selecter : $depth02.parent()});
				}

				// depth03 data input
				if (_depth03Idx !== null) {
					depth03Data = this.FunDataDepth03();
					this.FunDepth03Add();
				} else {
					this.MetDepthRemove({selecter : $depth03.parent()});
				}

				return this;
			};
			// path.js data
			Path.fn.FunDataDepth01 = function(){
				return path01Data;
			};
			Path.fn.FunDataDepth02 = function(){
				return path02Data;
			};
			Path.fn.FunDataDepth03 = function(){
				return path03Data;
			};
			Path.fn.FunDepth01Add = function(){
				this.MetDepthAdd({selecter : $depth01, depthData : depth01Data[o.depth01Idx]});
			};
			Path.fn.FunDepth02Add = function(){
				this.MetDepthAdd({selecter : $depth02, depthData : depth02Data[o.depth02Idx]});
			};
			Path.fn.FunDepth03Add = function(){
				this.MetDepthAdd({selecter : $depth03, depthData : depth03Data[o.depth03Idx]});
			};
			Path.fn.FunDepthCheck = function(o){
				if (o.depthIdx !== null && typeof o.depthIdx === "number") {
					return o.depthIdx;
				} else {
					return null;
				}
			};
			Path.fn.MetDepthAdd = function(o){
				o.selecter
					.html(o.depthData.name)
					.attr("href", o.depthData.href);
			};
			Path.fn.MetDepthRemove = function(o){
				o.selecter
					.hide();
			};

			// init();
			this["Path"] = new Path();
			path = this.Path;
			path.init();
		});
	};
}(jQuery));