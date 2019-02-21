// selectTable 对应 type:"selectTable", name:"authNumber2", label:"权限编号:"
/**
 * 多选控件
 * {
 * 	type:"blockSelect",
 * 	disabled:true,
 * 	data:[{text,"",value:""},{text:"",value:""}],
 *  url:'',//默认get方式
 *  params:{},
 *  valueField:"",
 *  textField:"",
 *  requestMethod:"Get",
 * 	className:'layui-col-xs6',
 *  name:"authNumber2",
 *  label:"权限编号:",
 *  listener:function(data){}
 * }
 * 
 */
dhtmlXForm.prototype.items.blockSelect = {
	render : function(item, data) {
		item._type = "blockSelect";
		item._idd = data.name;
		item._value="";
		item._eable=true;
		// 1、渲染div，div_label:标签
		var _self = this;
		var cid = "dhxId_blockSelect_" + Prolog.createRandomId();
		item._cid = cid;
		console.log(data);
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
		var selectList = document.createElement("div");
		selectList.setAttribute("class", "plg-form-multiSelect");
		selectList.setAttribute("id", cid);
		selectList.style.width = data.width + "px";
		
		var ul = document.createElement("ul");
		
		data.params = data.params==null?{}:data.params;
		data.requestMethod = data.requestMethod==null?"GET":data.requestMethod;
		data.valueField =  data.valueField==null?"value":data.valueField;
		data.textField = data.textField==null?"text":data.textField;
		
		if(data.url!=null && data.url!=""){
			Prolog.ajax({
				url:data.url,
				type:data.requestMethod,
				data:data.params,
				success:function(da){
					console.log(da);
					if(da.success){
						var cdata = da.data.list?da.data.list:da.data;
						for(var i=0;i<cdata.length;i++){
							var li = document.createElement("li");
							li.innerHTML = "<span>"+cdata[i][data.textField]+"</span>";
							li.setAttribute("value", cdata[i][data.valueField]);
							ul.appendChild(li);
						}
						selectList.appendChild(ul);
						control.appendChild(selectList);
						item.appendChild(control);
						
						if(data.disabled){
							this.disable(item);
							return this;
						}
						_self.bindClickEvent(item,data);
					}
				}
			});
		}else{
			if(data.data && data.data.length>0){
				for(var i=0;i<data.data.length;i++){
					var li = document.createElement("li");
					li.innerHTML = "<span>"+data.data[i][data.textField]+"</span>";
					li.setAttribute("value", data.data[i][data.valueField]);
					ul.appendChild(li);
				}
			}
			selectList.appendChild(ul);
			control.appendChild(selectList);
			item.appendChild(control);
			
			if(data.disabled){
				this.disable(item);
				return this;
			}
			this.bindClickEvent(item,data);
		}
		
		
		
		if(data.hidden){
			item.style.display = "none";
		}
		
		
		return this;
	},
	bindClickEvent:function(item,data){
		var cid = item._cid;
		$("#"+cid).on("click","li",function(){
			if($(this).hasClass("disabled"))
				return;
			
			if(data.multiSelect==null || data.multiSelect==false){
				if(!$(this).hasClass("active")){
					$("#"+cid+" li").removeClass("active");
					$(this).addClass("active");
				}else
					$(this).removeClass("active");
			}else{
				if(!$(this).hasClass("active")){
					$(this).addClass("active");
				}else
					$(this).removeClass("active");
			}
				
			var values=[];
			var selecteds = $("#"+cid+" .active");
			for(var k=0;k<selecteds.length;k++){
				values.push($(selecteds[k]).attr("value"));
			}
			item._value = values.join(",");
			
			if(data.listener){
				_callback = data.listener;
				_callback(item._value);
			}
		});
	},
	destruct : function(item) {
		$("#"+item._cid+" li").unbind('click');
		item.innerHTML = "";
	},
	// //sets the value of the 根据name来设置值
	setValue : function(item, value) {
		item._value = value;
		var values = value.split(",");
		values.forEach(function(v){  
		    $("#"+item._cid+" li[value="+v+"]").addClass("active");
		});
	},
	getValue : function(item) {
		return item._value;
	},
	enable : function(item) {
		$("#"+item._cid+" li").removeClass("disabled");
		item._eable=true;
	},
	disable : function(item) {
		item._eable=false;
		console.log($("#"+item._cid+" li"));
		$("#"+item._cid+" li").addClass("disabled");
	},
	reset:function(item){
		$("#"+item._cid+" li").removeClass("active");
		item._value="";
	},
	clear:function(item){
		this.reset(item);
	},
	showItem:function(item){
		
	},
	hideItem:function(item){
		item.style.display="none";
	}
};

dhtmlXForm.prototype.clearBlockSelect = function(name){
	return this.doWithItem(name, "clear")
};

dhtmlXForm.prototype.getFormData_blockSelect = function(name){
	return this.doWithItem(name, "getValue")
};
dhtmlXForm.prototype.setFormData_blockSelect = function(name,value){
	return this.doWithItem(name, "setValue", value)
};

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


;
(function($) {

	$.fn.initPlgForm = function(options) {
		var pg = new plgForm(options);
		var id = $(this).attr("id");
		pg.renderTo(id);
		return pg;
	}

	var plgForm = function(options) {
		var _m_this = this;
		var opts;
		var myForm;
		var formStructure; // dhxform需要的数据
		var hiddenItems = new Array(); // 此处最好不要使用这样的声明方式
		var m_parentId;
		var _default = {
			renderer : null,
			items : []
		}

		opts = $.extend({}, _default, options); // 合并成新对象，则是新的属性列表

		formStructure = opts.items;

		function renderTo(id) {
			m_parentId = id;
			$("#" + id).empty();
			// 初始化dhmlxform
			myForm = new dhtmlXForm(id, formStructure);

			for ( var i = 0; i < opts.items.length; i++) {
				var item = opts.items[i];
				setPlaceholder(id, item);
				setHiddenItems(item);
				setComboWidth(item);
				setToggleBtn(item);
			}

			$(".plg-toolbar-right").parent().css("float", "right");
			$(".plg-toolbar-left").parent().css("float", "left");
			$("#" + id + " input").addClass("plg-input");
			$("#" + id + " textarea").addClass("plg-input");
			$("#" + id + " select").addClass("plg-input");

			$("#" + id).find(".layui-row").parent().css("width","100%");
			//$("#" + id).addClass("layui-form");
			//setTimeout(function() {
			//	layui.form.render();
			//}, 200);

		}

		/**
		 * setComboWidth
		 * 
		 * @param {*}
		 *            item
		 */
		function setComboWidth(item) {
			if (item.type == "combo") {
				var dhxCombo = myForm.getCombo(item.name);
				dhxCombo.conf.combo_width=item.width;
				$(dhxCombo.list).appendTo("#" + m_parentId);
				myForm.setItemWidth(item.name, item.width);
			}
			if (item.list && item.list.length > 0) {
				for ( var i = 0; i < item.list.length; i++) {
					setComboWidth(item.list[i]);
				}
			}
		}

		/**
		 * 渲染显示隐藏按钮
		 * 
		 * @param item
		 * @returns
		 */
		function setToggleBtn(item) {
			if (item.type == "button" && item.className
					&& item.className.indexOf("toggle") > -1) {
				_m_this.renderHiddenToggleItem(item.name);
			}
			if (item.list && item.list.length > 0) {
				for ( var i = 0; i < item.list.length; i++) {
					setToggleBtn(item.list[i]);
				}
			}
		}
		/**
		 * setHiddenItems
		 * 
		 * @param {*}
		 *            item
		 */
		function setHiddenItems(item) {
			if (item.hidden && item.name) {
				hiddenItems.push(item.name);
			}
			if (item.list && item.list.length > 0) {
				for ( var i = 0; i < item.list.length; i++) {
					setHiddenItems(item.list[i]);
				}
			}
		}

		/**
		 * setPlaceholder 设置input中的联系方式
		 * 
		 * @param {*}
		 *            id 当前容器的id
		 * @param {*}
		 *            item 当前记录
		 */
		function setPlaceholder(id, item) {
			if (item && item.placeholder) {
				if (item.type == "input")
					$("#" + id + " input[name='" + item.name + "']").attr(
							"placeholder", item.placeholder);
				else if (item.type == "select")
					$("#" + id + " select[name='" + item.name + "']").attr(
							"placeholder", item.placeholder);
				else if (item.type == "combo")
					$("#" + id + " input[name='" + item.name + "']").parent()
							.children("input").attr("placeholder",
									item.placeholder);
			}

			if (item.list && item.list.length > 0) {
				for ( var i = 0; i < item.list.length; i++) {
					setPlaceholder(id, item.list[i]);
				}
			}
		}

		this.loadComboData = function(name, cfg) {
			var item = getOptsByName(name, opts.items);
			if (item == null) {
				PlgDialog.msg("找不到组件");
			} else {
				var myCombo = myForm.getCombo(item.name);
				var myconfig = item.remote ? item.remote : {};
				var opss = myconfig ? myconfig.success : null;

				if (cfg) {
					var myconfig = $.extend(true, item.remote, cfg);
				}

				myCombo.clearAll(false);
				var lind = PlgDialog.load(1);
				var success = function(da) {

					if (da.success == false) {
						PlgDialog.msg("数据加载失败，" + da.message);
						PlgDialog.close(lind);
						return;
					}

					var obj = null;
					if (da.data.list) {
						obj = da.data.list;
					} else {
						obj = da.data;
					}
					obj = parseComboData(obj, myconfig);
					myCombo.load(obj, function() {
						PlgDialog.close(lind);
					})
					if (opss) {
						opss(da);
					}
				};
				myconfig.error = function() {
					PlgDialog.close(lind);
				}
				myconfig.success = success;
				Prolog.ajax(myconfig);
			}

		}

		function parseComboData(obj, cfg) {
			var data = {
				options : []
			};
			for ( var i = 0; i < obj.length; i++) {
				var d = obj[i];
				if (cfg.valueField)
					d["value"] = d[cfg.valueField];

				if (cfg.textField)
					d["text"] = d[cfg.textField];

				data.options.push(d);
			}
			return data;
		}

		function getOptsByName(name, array) {
			for ( var i = 0; i < array.length; i++) {
				var item = array[i];
				if (item.name == name)
					return item;

				if (item.list) {
					var re = getOptsByName(name, item.list);
					if (re != null)
						return re;
				}
			}
			return null;
		}

		this.getFormData = function() {
			return myForm.getFormData();
		}

		this.getDForm = function() {
			return myForm;
		}
		this.getInput = function(name) {
			return myForm.getInput(name);
		}
		this.getItemWidth = function(name) {
			return myForm.getItemWidth(name);
		}
		this.getOptions = function(name) {
			return myForm.getOptions(name);
		}
		this.getSelect = function(name) {
			return myForm.getSelect(name);
		}
		this.getCheckedValue = function(name) {
			return myForm.getCheckedValue(name);
		}
		this.getCombo = function(name) {
			return myForm.getCombo(name);
		}
		this.hideItem = function(name, value) {
			myForm.hideItem(name, value);
		}
		this.showItem = function(name, value) {
			myForm.showItem(name, value);
		}

		// 显示所有隐藏字段
		this.showAllHItems = function() {
			for ( var i = 0; i < hiddenItems.length; i++) {
				myForm.showItem(hiddenItems[i]);
			}
			hh = false;
		}
		// 隐藏所有隐藏字段
		this.hideAllHItems = function() {
			for ( var i = 0; i < hiddenItems.length; i++) {
				myForm.hideItem(hiddenItems[i]);
			}
			hh = true;
		}
		// 显示隐藏隐藏字段
		var hh = true;
		this.toggleHItems = function() {
			if (hh) {
				this.showAllHItems();
				hh = false;
			} else {
				this.hideAllHItems();
				hh = true;
			}
			return !hh;
		}
		/**
		 * 添加展开收缩按钮
		 */
		this.addHiddenToggleItem = function(pId, pos, insertAfter) {
			var _this = this;
			myForm.addItem(pId, {
				type : "button",
				name : "plg-more-001",
				value : "展开<i class='layui-icon layui-icon-down'></i>",
				className : "link"
			}, pos, insertAfter);
			myForm
					.attachEvent(
							"onButtonClick",
							function(name) {
								if (name == "plg-more-001") {
									if (_this.toggleHItems()) {
										_this
												.setItemLabel("plg-more-001",
														"收起<i class='layui-icon layui-icon-up'></i>");
									} else {
										_this
												.setItemLabel("plg-more-001",
														"展开<i class='layui-icon layui-icon-down'></i>");
									}
								}
							});
		}

		this.renderHiddenToggleItem = function(name) {
			var _this = this;
			_this.setItemLabel(name,
					"展开<i class='layui-icon layui-icon-down'></i>");
			myForm
					.attachEvent(
							"onButtonClick",
							function(na) {
								if (name == na) {
									if (_this.toggleHItems()) {
										_this
												.setItemLabel(name,
														"收起<i class='layui-icon layui-icon-up'></i>");
									} else {
										_this
												.setItemLabel(name,
														"展开<i class='layui-icon layui-icon-down'></i>");
									}
								}
							});
		}

		this.disableItem = function(name) {
			myForm.disableItem(name);
		}

		this.disableAllItem = function() {
			myForm.forEachItem(function(name) {
				myForm.disableItem(name);
			});
		}

		this.enableItem = function(name) {
			myForm.enableItem(name);
		}

		this.enableAllItem = function(name) {
			myForm.forEachItem(function(name) {
				myForm.enableItem(name);
			});
		}

		this.clear = function() {
			myForm.clear();
		}

		this.addItem = function(pid, itemData, pos, insertAfter) {
			myForm.addItem(pId, itemData, pos, insertAfter);
		}
		this.removeItem = function(name, value) {
			myForm.removeItem(name, value);
		}
		this.reset = function() {
			myForm.reset()
		};

		this.getItemLabel = function(name, value) {
			if (arguments.length == 2) {
				return myForm.getItemLabel(name, value);
			} else {
				return myForm.getItemLabel(name);
			}
		}
		this.getItemValue = function(name) {
			return myForm.getItemValue(name);
		}
		this.setFormData = function(jsonData) {
			myForm.setFormData(jsonData);
		}
		this.setFormItemData = function(name, value) {
			var item = {};
			item[name] = value;
			myForm.setFormData(item);
		}

		this.setItemFocus = function(name) {
			myForm.setItemFocus(name);
		}
		this.setItemHeight = function(name, height) {
			myForm.setItemHeight(name, height);
		}
		this.setItemWidth = function(name, width) {
			myForm.setItemWidth(name, width);
		}
		this.setItemLabel = function(name, label) {
			myForm.setItemLabel(name, label);
		}
		this.setItemValue = function(name, value) {
			myForm.setItemValue(name, value);
		}

		this.setItemReadonly = function(name, state) {
			myForm.setReadonly(name, state);
		}
		this.setItemRequired = function(name, state) {
			myForm.setRequired(name, state);
		}

		this.setItemValidation = function(name, rule) {
			myForm.setValidation(name, rule);
		}

		this.validateItem = function(name) {
			return myForm.validateItem(name);
		}
		this.validate = function() {
			return myForm.validate();
		}
		this.forEachItem = function(callback) {
			myForm.forEachItem(callback(name));
		}

		this.renderTo = function(id) {
			renderTo(id);
		}

		this.on = function(eventName, callback) {
			myForm.attachEvent(eventName, callback);
		}

		this.attachEvent = this.on;

		this.attachComboEvent = function(name, eventName, callback) {
			myForm.getCombo(name).attachEvent(eventName, callback);
		}

		if (opts.renderer) {
			renderTo(opts.renderer);
		}

	}

	window.PlgForm = plgForm;
})(jQuery);
