;(function($) {

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
			
			//继承dhtmlXForm的原型Api方法
			for(var key in myForm){
				if(key.indexOf('_') < 0 && typeof myForm[key] === 'function'){
					//console.log(key);
					if(!_m_this[key]){
						_m_this.__proto__[key] = myForm[key];
					}
				}
			}


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
      
			callback && myForm.forEachItem(callback);
		}

		this.renderTo = function(id) {
         renderTo(id);
      return this
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
