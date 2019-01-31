Date.prototype.format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

// 增强code的健壮性，主要是其他用不到dhtml插件的文件，不再需要引入这个插件了
if(!( typeof dhtmlXCalendarObject === 'undefined' || !dhtmlXCalendarObject)){		
  dhtmlXCalendarObject.prototype.langData["ch"] = {
    dateformat: '%Y-%m-%d',
    monthesFNames: ["1月",'2月','3月',"4月",'5月','6月',"7月",'8月','9月',"10月",'11月','12月'],
    monthesSNames: ["1月",'2月','3月',"4月",'5月','6月',"7月",'8月','9月',"10月",'11月','12月'],
    daysFNames: ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],
    daysSNames: ["日","一","二","三","四","五","六"],
    weekstart:"周日",
    weekname: "星期",
    today: "今天",
    clear: "清除"
  }
  dhtmlXCalendarObject.prototype.lang = "ch";
};



var Prolog = {};
var GridBasePath="/prologui/components/PlgGrid/codebase/images";
var token = localStorage.getItem("authorization");

//获取元素的纵坐标 
Prolog.getTop = function(e) {
	var offset = e.offsetTop;
	if (e.offsetParent != null) {
		offset += Prolog.getTop(e.offsetParent);
	}
	;
	return offset;
}
// 获取元素的横坐标
Prolog.getLeft = function(e) {
	var offset = e.offsetLeft;
	if (e.offsetParent != null) {
		offset += Prolog.getLeft(e.offsetParent);
	}
	;
	return offset;
}

Prolog.hasJson = function(jsonArray,json){
	for(var i=0;i<jsonArray.length;i++){
		var b = true;
		for(var key in jsonArray[i]){
				if(jsonArray[i][key] != json[key]){
					b = false;
					break;
				}
		}
		if(b)
			return i;
	}
	return -1;
}


Prolog.ajax = function(options){
	var pdefault = {
		timeout:30000,
		dataType:"json"
	}
	var opt = $.extend(true,pdefault,options);
	opt.error = function(XMLHttpRequest, textStatus, errorThrown){
		layer.msg(textStatus);
		if(options.error)
			options.error(XMLHttpRequest, textStatus, errorThrown);
	}
	opt.beforeSend = function (xhr) {
	       xhr.setRequestHeader("Authorization", token); 
	       if(options.beforeSend){
	    	   options.beforeSend(xhr);
	       }
	}
	$.ajax(opt);
}

Prolog.syncAjax = function(options){
	var pdefault = {
			timeout:30000	
		}
	var opt = $.extend(true, pdefault, options);
	opt.error = function(XMLHttpRequest, textStatus, errorThrown){
		layer.msg(textStatus);
		if(options.error)
			options.error(XMLHttpRequest, textStatus, errorThrown);
	}
	opt.async = false;
	opt.beforeSend = function (xhr) {
	       xhr.setRequestHeader("Authorization", token); 
	       if(options.beforeSend){
	    	   options.beforeSend(xhr);
	       }
	}
	   
	$.ajax(opt);
}

Prolog.getFormById = function(systemId,menuId,formId) {
	
	var myform =null;
	
	var data = Prolog.getJsonData("/japi/sysform2/form","GET",{systemId:systemId,menuId:menuId,formId:formId,id:systemId+"_"+menuId+"_"+formId});
	if(data!=null && data.success==true){
		
		if(data.data!=null && data.data.fields!=null){
			myform = new PrologForm();
			var formdata = JSON.parse(data.data.fields);
			myform.init(formdata);
		}else{
			layer.msg("未定义表单内容");
		}
		
	}
	return myform;
};

Prolog.createRandomId = function(){
	return (new Date()).getTime()+Math.random().toString().substr(2,5);
}

Prolog.loading = function(el){
    
	var loading = PlgDialog.loading();
	//layui-layer14
	$("#layui-layer-shade"+loading).appendTo("#"+el);
	$("#layui-layer"+loading).appendTo("#"+el);
	$("#layui-layer"+loading).css("left","50%");
	$("#layui-layer"+loading).css("margin-left","-90px");
	$("#layui-layer"+loading).css("top",200+"px");
	return loading;
}

Prolog.closeLoading = function(id){
	layer.close(id);
}

Prolog.loading2=function() {
    var index = PlgDialog.load(2, {
        shade: [0.6, '#fff'] //0.1透明度的白色背景
    });

    return function(){
        PlgDialog.close(index)
    }
}

/*
* @method 删除 PlgGrid 行数据
* @param grid - grid控件
* @param url {string} - 数据接口地址
* @param type {string} - 数据接口请求类型，为空时默认post
* @param contenttype {string} - 数据接口请求 contentType 类型，为空时默认application/x-www-form-urlencoded
* @param param {object} - 请求参数名 {"id":0}
* @author jiw
* @deprecated 删除PlgGrid选中行数据，删除成功后reload
*/

Prolog.delGridRowData = function (grid,url,type,contenttype,param,multiselect){
    if(multiselect===false) {
        if (grid.getSelectedRowId() == null && param.length<1) {
            PlgDialog.msg("请选择行!");
            return;
        }
    }else{
        if(grid.getCheckedIds() == null) {
            PlgDialog.msg("请选择行!");
            return;
        }
    }

    PlgDialog.confirm('是否删除吗？', {
        title: '删除提示',
        btn: ['确定', '取消'],
        zIndex:layer.zIndex
    }, function (index) {
        PlgDialog.close(index);

        if (type==="") type="post";
        if (contenttype==="") contenttype="application/x-www-form-urlencoded";

        layer.msg("数据处理中...");
        Prolog.ajax({
            url:url,
            type:type,
            contentType: contenttype,
            data:param,
            success:function(data){
				if(typeof data != "object") data=JSON.parse(data);
                if(data.success){
                    grid.reload();
                    layer.closeAll();
                }
                else{
                    layer.open({
                        type: 1
                        ,offset: "auto"
                        ,id: 'layerError'
                        ,area:["500px"]
                        ,title:"错误提示"
                        ,content: '<div style="padding: 10px;">'+$.parseJSON(data).message+'</div>'
                        ,btn: '关闭'
                        ,btnAlign: 'r'
                        ,shade: 0
                        ,yes: function(){
                            layer.closeAll();
                        }
                    });
                }
            },
            error:function(){ }
        });

    });
}