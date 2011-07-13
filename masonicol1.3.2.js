;(function($) { 
	
	$.fn.masonicol = function(args){

		var defaults = {
		    'pageHeight'    : $(window).height(),
			'pageMargin'	: 20,
		    'colMargin'		: 20,
		    'padding'		: '20 20 20 20',
		    'targetElement'	: '*'
		   	// columnWidth
		};
		
		var setting = $.extend(defaults, args);
		
	    return this.each(function(){

			var element			= {},
				previousBottom	= 0,
				_columnNum		= 0,
				appearanceColumnNum = 0,
				page			= 0,
				padding			= {
					'top'	: 0,
					'right'	: 0,
					'bottom': 0,
					'left'	: 0
				},
				targetElement
					= $("#" + $(this).attr('id') + ">" + setting.targetElement);
			
			targetElement.css({
				'width':		setting.columnWidth
			});
				
			var calculatePadding = function() {
				var a = setting.padding.split(" ");
				padding.top		= a[0]-0;
				padding.right	= a[1]-0;
				padding.bottom	= a[2]-0;
				padding.left	= a[3]-0;	
			}();
	
			//横幅を一律に設定する。
			//横幅変更後の各要素の縦幅を取得し、配列に入れる。
			var inputArray = function(_this, callback) {
				var i, al;
				for (i = 0, al = targetElement.length; i < al; ++i) {
					var _t	= $([
						"#", $(_this).attr('id'),
						">", setting.targetElement,
						":eq(", i, ")"
					].join(''));	
					
					element[i]	= {
						jobj:		_t,
						height:		_t.outerHeight(true),
						top:		0,
						columnNum:	1
					};
						
					if (callback) { callback(element[i]); }
				}
			};

			inputArray(this, function(el){ //ページの高さにあわせて、要素のtopを適宜0にリセットする。
				if (setting.pageHeight <= previousBottom + el.height) {	
					el.top	= 0;
					++_columnNum;
				} else {
					el.top	= previousBottom;
				}
		
				previousBottom	= el.top + el.height;
				el.columnNum	= _columnNum;
			});

			var arrange	= function(){
				var	i, al;
				for (i = 0, al = targetElement.length; i < al; ++i) {

					var left, top;

					page	= 	Math.floor( element[i].columnNum / setting.columnNum ); 

					top		= 	(setting.pageHeight * page) +	//ページのtop位置
								element[i].top +				//要素ごとのtop
								(setting.pageMargin * page) +	//ページのマージン分
								padding.top;					//padding
				
					appearanceColumnNum //表示上のカラム番号
							= 	element[i].columnNum % setting.columnNum; 
							
					left	= 	(setting.columnWidth + setting.colMargin) * appearanceColumnNum +
								padding.left;
								
					$(element[i].jobj).css({
						'position'	: 'absolute',
						'top'		: top,
						'left'		: left	
					});
				}
			}();

			$(this).css({
				'height':	setting.pageHeight * (page + 1) +
							setting.pageMargin * page +
							padding.top + padding.bottom ,
					
				'width':	setting.columnWidth * setting.columnNum +
							setting.colMargin * (setting.columnNum - 1) +
							padding.left + padding.right
			});

	    }); //end of return
	};
}(jQuery));