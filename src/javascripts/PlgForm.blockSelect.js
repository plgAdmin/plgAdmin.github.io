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
