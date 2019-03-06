
/**
 * 下拉表格
 * 
 * 参数配置
 * {
 * 	type:"selectTable",
 * 	disabled:true,
 * 	table: PopupsData,//参考grid配置
 * 	tableWidth:600,
 * 	tableHeight:700,
 * 	className:'layui-col-xs6',
 *  fieldText: "serviceName",
 *  fieldValue: ["serviceName","source"], 
 *  name:"authNumber2",
 *  label:"权限编号:",
 *  placeholder:'请输入权限编号',
 *  listener:function(plgGrid){}
 * }
 * 
 * 值：显示值为逗号分隔字符串，实际值为json数组字符串
 */
dhtmlXForm.prototype.items.selectTable = {
	
	render : function(item, data) {
		item._type = "selectTable";
		item._idd = data.name;
		item._value="";
		item._table = data.table;
		item._active=false;
		// 1、渲染div，div_label:标签，div_control(div_mainInput:显示输入框,div_hiddenInput:值输入框)
		// 2、div_mainInput onfocus弹出表格
		var _self = this;
		var sgrid; // 渲染的表格
		var cid = "dhxId_selectTable_" + Prolog.createRandomId();

		var label = document.createElement("div");
		label.setAttribute("class", "dhxform_label "+data.labelAlign);
		label.innerHTML = '<label for="' + cid + '">' + data.label + '</label>';
		if(data.labelWidth){
			label.style.width = data.labelWidth +"px";
		}
		item.appendChild(label);

		var control = document.createElement("div");
		control.setAttribute("class", "dhxform_control");

		// input
		var mainInput = document.createElement("input");
		mainInput.setAttribute("type", "text");
		mainInput.setAttribute("class", "dhxform_textarea plg-input");
		mainInput.style.width = data.width + "px";
		mainInput.setAttribute("placeholder", data.placeholder);
		mainInput.setAttribute("readonly", "readonly");
		// mainInput.setAttribute("id",cid);
		control.appendChild(mainInput);

		// hidden
		var hiddenInput = document.createElement("input");
		hiddenInput.setAttribute("type", "hidden");
		hiddenInput.setAttribute("name", data.name);
		control.appendChild(hiddenInput);
		item.appendChild(control);
		
		if (data.disabled == true) {
			mainInput.setAttribute("disabled", "disabled");
			hiddenInput.setAttribute("disabled", "disabled");
			item._enabled = false;
			return this;
		}
		
		mainInput.onclick = function(e) {
			var left = Prolog.getLeft(this);
			var top = Prolog.getTop(this) + $(this).parent().height();
			var _width = $(this).width();
			var _height = $(this).height();

			var fieldText = data.fieldText; // 用户在页面上显示的值
			var fieldName = data.fieldValue; // 用户实际传给后台的值

			layerId = 'layer' + Prolog.createRandomId();
			
			var tableWidth = data.tableWidth?data.tableWidth:600;
			var tableHeight = data.tableHeight?data.tableHeight:500;

			if((left+_width)>document.body.clientWidth){
				left = document.body.clientWidth-tableWidth-30;
			}else if((left+tableWidth)>document.body.clientWidth){
				left = left-tableWidth+_width+10;
			}

			if((top+tableHeight)>window.innerHeight){
				if(top>tableHeight){
					top-tableHeight-_height;
				}
			}
			

			layer.open({
				type : 1,
				id : layerId,
				title : false,
				resize:false,
				offset : [ top + "px", left + "px" ],
				btn : [],
				closeBtn : 0,
				area : [tableWidth+'px',tableHeight+'px'],
				shadeClose : true,
				shade : 0.000001,
				content : '<div id="' + cid + '_grid" style="width:100%;height:'+(tableHeight-30)+'px;"></div>',
				end:function(){
					item._active=false;
					if(typeof data.listener=="object" && data.listener.afterClose!=null){
						var _callback = data.listener.afterClose;
						_callback(item._textValue,item._value,sgrid);
					}
				},
				success : function(layero, index) {
					item._active=true;
					$("#layui-layer"+index+" .layui-layer-btn").hide();
					$("#layui-layer"+index).height($("#layui-layer"+index).height()-23);
					$("#layui-layer"+index+" .layui-layer-content").css("padding","0px");
					
					// 默认参数
					sgrid = new PlgGrid(item._table);
					sgrid.renderTo(cid + '_grid');
					$("#layui-layer"+index+" .grid-container-full").css("margin-top","8px");
					sgrid.loadData(null, function() {
						var rownum = sgrid.getGrid().getRowsNum();
						for ( var i = 0; i < rownum; i++) {
							var rid = sgrid.getGrid().getRowId(i);
							var jo = sgrid.getRowData(rid,data.fieldValue);
							var valueArray = (item._value!=null && item._value!="")?JSON.parse(item._value):[];
							if (Prolog.hasJson(valueArray,jo)>-1) {
								if(item._table.multiselect)
									sgrid.setCellValue(rid, 1, 1);
								else
									sgrid.selectRowById(rid);
							}
						}
					});

					if(item._table.multiselect){
						sgrid.on("onCheck", function(rId, cInd, state) {
							if (cInd == 1) {
								if (state) {
									setSelectedValue(rId);
								} else {
									setUnSelectedValue(rId);
								}
							}
						});
						
						sgrid.on("onHeaderClick", function(ind, obj) {
							if (ind == 1) {
								var ch = $("#" + cid + "_grid"
										+ " .plg-grid-second-col");
								var cstr = ch.attr("src");
								if (cstr.indexOf("chk0") > -1) {
									var rownum = sgrid.getGrid().getRowsNum();
									for ( var i = 0; i < rownum; i++) {
										var rid = sgrid.getGrid().getRowId(i);
										setUnSelectedValue(rid);
									}
								} else {
									var ids = sgrid.getCheckedIds();
									ids.split(',').forEach(function(val) {
										setSelectedValue(val);
									});
								}
								return true;
							} else {
								return true;
							}
						});
						
					}else{
						sgrid.on("onRowSelect", function(rId, cInd) {
							setSelectedValue(rId);
							PlgDialog.close(index);
						});
					}
					
					
					if(data.listener){
						if(typeof data.listener=="function"){
							var _callback = data.listener;
							_callback(sgrid);
						}else if(typeof data.listener=="object" && data.listener.init!=null){
							var _callback2 = data.listener.init;
							_callback2(sgrid);
						}
						
					}
				}
			});
		}

		// 反选
		function setUnSelectedValue(selectId) {
			if (selectId) {
				var jo = sgrid.getRowData(selectId,data.fieldValue);
				var valueArray = (item._value!=null && item._value!="")?JSON.parse(item._value):[];
				if (Prolog.hasJson(valueArray,jo)==-1) {
					return;
				}

				// 显示值
				var showText = mainInput.getAttribute("value") ? mainInput.getAttribute("value").split(",") : [];

				var textField = data.fieldText;
				var valueFields = data.fieldValue;
				
				var vData = sgrid.getRowData(selectId,valueFields);
				var index = Prolog.hasJson(valueArray,vData);
				if(index>-1)
					valueArray.splice(index,1);
				var tData = sgrid.getRowData(selectId,textField);
				showText.splice(showText.indexOf(tData), 1);
				
				mainInput.setAttribute("value", showText.toString());
				hiddenInput.setAttribute("value", JSON.stringify(valueArray));
				item._textValue = showText.toString();
				item._value = JSON.stringify(valueArray);
				if(typeof data.listener=="object" && data.listener.afterSelect!=null){
					var _callback = data.listener.afterSelect;
					_callback(false,selectId,sgrid);
				}
			}
		}

		// 设置选中值
		function setSelectedValue(selectId) {

			if (selectId) {

				var jo = sgrid.getRowData(selectId,data.fieldValue);
				var valueArray = (item._value!=null && item._value!="")?JSON.parse(item._value):[];
				if (Prolog.hasJson(valueArray,jo)>-1) {
					return;
				}
				// 显示值
				var showText = mainInput.getAttribute("value") ? mainInput.getAttribute("value").split(",") : [];
				
				if(item._table.multiselect==false){
					valueArray=[];
					showText=[];
				}
				

				var textField = data.fieldText;
				var valueFields = data.fieldValue;

				var vData = sgrid.getRowData(selectId,valueFields);
				valueArray.push(vData);
				var tData = sgrid.getRowData(selectId,textField);
				showText.push(tData);
				
				mainInput.setAttribute("value", showText.toString());
				hiddenInput.setAttribute("value", JSON.stringify(valueArray));
				item._textValue = showText.toString();
				item._value = JSON.stringify(valueArray);

				if(typeof data.listener=="object" && data.listener.afterSelect!=null){
					var _callback = data.listener.afterSelect;
					_callback(true,selectId,sgrid);
				}
			}
		}

		
		if(data.hidden){
			item.style.display = "none";
		}
		return this;
	},
	// //destructor
	destruct : function(item) {
		var inputs = item.getElementsByTagName("input");
		inputs[0].onclick = null;
		item.innerHTML = "";
	},
	// //sets the value of the 根据name来设置值
	setValue : function(item, value) {
		var hinput = item.getElementsByTagName("input")[1];
		hinput.setAttribute("value", value);
		item._value = value;
	},
	getValue : function(item) {
		//console.log(item);
		//var hinput = item.getElementsByTagName("input")[1];
		//return hinput.getAttribute("value");
		return item._value;
	},
	enable : function(item) {
		var inputs = item.getElementsByTagName("input");
		inputs[0].removeAttribute("disabled");
		inputs[1].removeAttribute("disabled");
	},
	disable : function(item) {
		var inputs = item.getElementsByTagName("input");
		inputs[0].setAttribute("disabled", "disabled");
		inputs[1].setAttribute("disabled", "disabled");
	},
	getText : function(item) {
		return item._textValue;
	},
	setText : function(item,value) {
		item._textValue = value;
		var inputs = item.getElementsByTagName("input");
		inputs[0].setAttribute("value", value);
		
	},
	reset:function(item){
		var inputs = item.getElementsByTagName("input");
		inputs[0].setAttribute("value", "");
		inputs[1].setAttribute("value", "");
		c="";
		item._value="";
	},
	clear:function(item){
		this.reset(item);
	},
	setTableConfig:function(item,data){
		item._table = data;
	},
	showItem:function(item){
		
	},
	hideItem:function(item){
		item.style.display="none";
	},
	active:function(item){
		var inputs = item.getElementsByTagName("input");
		$(inputs[0]).trigger("click");
	},
	isActive:function(item){
		return item._active;
	},
	setData:function(item,txt,value){
		this.setText(item,txt);
		this.setValue(item,value);
	}
};

dhtmlXForm.prototype.setData = function(name,txt,value){
	this.doWithItem(name, "setData",txt,value)
};
dhtmlXForm.prototype.active = function(name){
	this.doWithItem(name, "active")
};
dhtmlXForm.prototype.isActive = function(name){
	return this.doWithItem(name, "isActive")
};
dhtmlXForm.prototype.getText = function(name){
	return this.doWithItem(name, "getText")
};
dhtmlXForm.prototype.setText = function(name,value){
	return this.doWithItem(name, "setText",value);
};
dhtmlXForm.prototype.clearSelectTable = function(name){
	return this.doWithItem(name, "clear");
};
dhtmlXForm.prototype.setTableConfig = function(name,data){
	return this.doWithItem(name, "setTableConfig",data);
};
dhtmlXForm.prototype.getFormData_selectTable = function(name){
	return this.doWithItem(name, "getValue");
};
dhtmlXForm.prototype.setFormData_selectTable = function(name,value){
	return this.doWithItem(name, "setValue", value)
};