var Prolog={},layer=layui.layer;Prolog.ajaxDefault={timeout:3e3,async:!0,dataType:"json"},Prolog.ajax=function(a,e,o,r,l){o=null==o?{}:o,l=null==l?{}:l;var n=$.extend(!0,Prolog.ajaxDefault,l);n.url=a,n.type=e,n.async=!0,n.data=o,n.success=function(a){r&&r(a)},n.error?n.error=function(a,e,o){layer.close(loading),layer.msg(e),n.error(a,e,o)}:n.error=function(a,e,o){layer.close(loading),layer.msg(e)},$.ajax(n)},Prolog.syncAjax=function(a,e,o,r){var l=layer.msg("数据加载中...",{icon:16,shade:.01,time:0});r=null==r?{}:r;var n=$.extend(!0,Prolog.ajaxDefault,r),t=null;return n.url=a,n.type=e,n.data=o,n.async=!1,n.success=function(){layer.close(l),t=da},n.error=function(a,e,o){layer.close(l),console.log(e),t=null},$.ajax(n),t},Prolog.getFormById=function(a,e,o){var r=null,l=Prolog.getJsonData("/japi/sysform2/form","GET",{systemId:a,menuId:e,formId:o,id:a+"_"+e+"_"+o});if(null!=l&&1==l.success)if(null!=l.data&&null!=l.data.fields){r=new PrologForm;var n=JSON.parse(l.data.fields);r.init(n)}else layer.msg("未定义表单内容");return r},Prolog.createRandomId=function(){return(new Date).getTime()+Math.random().toString().substr(2,5)},Prolog.load=function(a){var e=layer.msg("数据加载中...",{icon:16,shade:.8,time:0});return $("#layui-layer-shade"+e).appendTo("#"+a),$("#layui-layer"+e).appendTo("#"+a),e},Prolog.closeLoading=function(a){layer.close(a)};
var Prolog = {};
var layer = layui.layer;
Prolog.ajaxDefault={
	timeout:3000,
	async:true,
	dataType:"json"
}
Prolog.ajax = function(url,type,params,successCallback,options){
	
	
	params = params==null?{}:params;
	options = options==null?{}:options;
	var opt = $.extend(true, Prolog.ajaxDefault, options);
	opt.url = url;
	opt.type = type;
	opt.async = true;
	opt.data = params;
	opt.success = function(data){
		//layer.close(loading);
    	if(successCallback)
    		successCallback(data);
	};
	if(opt.error){
		opt.error=function(XMLHttpRequest, textStatus, errorThrown){
			layer.close(loading);
			layer.msg(textStatus);
			opt.error(XMLHttpRequest, textStatus, errorThrown);
		}
	}else{
		opt.error=function(XMLHttpRequest, textStatus, errorThrown){
			layer.close(loading);
			layer.msg(textStatus);
		}
	}
	
	$.ajax(opt);
}

Prolog.syncAjax = function(url,type,params,options){
	var loading = layer.msg('数据加载中...', {icon: 16,shade: 0.01,time:0});
		options = options==null?{}:options;
	var opt = $.extend(true, Prolog.ajaxDefault, options);
	var result=null;
	opt.url = url;
	opt.type = type;
	opt.data = params;
	opt.async = false;
	opt.success = function(){
		layer.close(loading);
    	result = da;
	};
	
	opt.error=function(XMLHttpRequest, textStatus, errorThrown){
    	layer.close(loading);
    	console.log(textStatus);
    	result=null;
	}
	$.ajax(opt);
	return result;
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

Prolog.load = function(el){
	var loading = layer.msg('数据加载中...', {icon: 16,shade: 0.8,time:0});
	$("#layui-layer-shade"+loading).appendTo("#"+el);
	$("#layui-layer"+loading).appendTo("#"+el);
	return loading;
}

Prolog.closeLoading = function(id){
	layer.close(id);
}

!function(e){e.fn.initPlgBreadCrumb=function(n){var a=new r(n),t=e(this).attr("id");return a.renderTo(t),a};var r=function(r){var n={separator:"--"};if(r&&r.renderer){n=e.extend({},n,r);var a,t="",i=n.items;!function(e,r){t+=e?`<span class="layui-breadcrumb" lay-separator="${e}">`:'<span class="layui-breadcrumb">';r.forEach(function(e,n){t+=`<a href="${e.href}">${e.name}</a>`,r.length-1===n&&(t+=`<a href="${e.href}"><cite>${e.name}</cite></a>`)}),t+="</span>",(a=document.createElement("div")).innerHTML=t}(n.separator,i),this.renderTo=function(r){e("#"+r).append(a)},n.renderer&&(this.renderTo(n.renderer),layui.element.render())}};window.PlgBreadCrumb=r}(jQuery);
;(function($){

    $.fn.initPlgBreadCrumb = function(options){
		var pg = new plgBreadCrumb(options);
        var id = $(this).attr("id");
        pg.renderTo(id);
		return pg;
	}

    var plgBreadCrumb = function(options){
        var config = {
            separator: '--',  // 此处的分隔符默认是‘/’
        }
        // console.log('进入到这里来');
        // console.log(options);

        if(!options || !options.renderer) return;

        config =  $.extend({},config ,options); //合并成新对象，则是新的属性列表
    
        var template = '';   // 被渲染的模版
        var mdoc;   // element片段

        // 判断当前是按钮组还是单个的按钮
        var navItems = config.items;   
        
        _generateTemplate(config.separator, navItems);
       
        function _generateTemplate(separator, arr){
            if (separator) {
                template += `<span class="layui-breadcrumb" lay-separator="${ separator }">`;
            } else {
                template += `<span class="layui-breadcrumb">`;
            }

            arr.forEach(function(val, ind){
                template += `<a href="${ val.href }">${ val.name }</a>`;
                if (arr.length - 1 === ind){
                    template += `<a href="${ val.href }"><cite>${ val.name }</cite></a>`;
                }

            })

            template += '</span>';
            mdoc = document.createElement("div");
            mdoc.innerHTML = template;
        }

        this.renderTo = function(id){
            $('#' + id).append(mdoc);
        }

        if(config.renderer){
            this.renderTo(config.renderer);
            layui.element.render();
        }

    }

    window.PlgBreadCrumb = plgBreadCrumb;

}(jQuery));

!function(e){e.fn.initPlgCollapse=function(n){var i=new l(n),t=e(this).attr("id");return i.renderTo(t),i};var l=function(l){if(l&&l.renderer&&!(l.items.length<1)){var n,i,t,o,r={filter:"layui-collapse-"+Prolog.createRandomId(),model:"accordion",items:[{title:"",content:"",show:!0}]};r=e.extend({},r,l),o="",o+=`<div class="layui-collapse" lay-filter="${(t=r).filter}" ${"accordion"===t.model?"lay-accordion":""}>`,t.items.forEach(function(e){o+=`<div class="layui-colla-item">\n                        <h2 class="layui-colla-title">${e.title}</h2>\n                        <div class="layui-colla-content ${e.show?"layui-show":""} ">${e.content}</div>\n                    </div>`}),n=o+="</div>",(i=document.createElement("div")).innerHTML=n,this.renderTo=function(l){e("#"+l).append(i),layui.element.render("collapse")},r.renderer&&this.renderTo(r.renderer)}};window.PlgCollapse=l}(jQuery);
;(function($){

    $.fn.initPlgCollapse = function(options){
		var pg = new plgCollapse(options);
		var id = $(this).attr("id");
		pg.renderTo(id);
		return pg;
	}

    var plgCollapse = function(options){

        // 检测用户使用的配置参数是否合法
        if(!options || !options.renderer || (options.items.length < 1)) return;

        var config = {
            filter: 'layui-collapse-' + Prolog.createRandomId(),   // 默认添加一个唯一识别码
            model: 'accordion',  // 【lay-accordion  -- 手风情模式】【collapse--折叠面板模式】
            items: [
              {
                title: '',
                content: '',
                show: true,    // 【true--展示】【false--隐藏】
              }
            ]
        }
        var template, mdoc;  // 模版
        
        
        config =  $.extend({},config ,options); //合并成新对象，则是新的属性列表
        template = _generateTemplate(config);  // 生成对应的模版
        

        mdoc = document.createElement('div');
        mdoc.innerHTML = template;
        
        function _generateTemplate(obj){
            
            var tem = '';
            tem += `<div class="layui-collapse" lay-filter="${ obj.filter }" ${ obj.model === 'accordion' ? 'lay-accordion': '' }>`;
            obj.items.forEach(function(val){
                tem += `<div class="layui-colla-item">
                        <h2 class="layui-colla-title">${ val.title }</h2>
                        <div class="layui-colla-content ${ val.show ? 'layui-show' : ''} ">${ val.content }</div>
                    </div>`
            });

            tem += `</div>`;

            return tem;
        }

        this.renderTo = function(id){
            $('#' + id).append(mdoc);
            layui.element.render('collapse');   // 此处使用lay的laypage的组件
        }
        
        if(config.renderer){
            this.renderTo(config.renderer);
        }
       
    }

    window.PlgCollapse = plgCollapse;
}(jQuery));

!function(n){n.fn.initPlgButton=function(e){var i=new t(e),r=n(this).attr("id");return i.renderTo(r),i};var t=function(t){if(t&&t.renderer){var e={items:[{text:"",type:"",size:""}],size:"",type:"",radius:""};e=n.extend({},e,t);var i,r="",o=["type","big","radius"],u=e.items.length;if(1===u){var c={};Object.keys(e.items[0]).forEach(function(n){c[n]=e.items[0][n]}),o.forEach(function(n){(e.items[0][n]||e[n])&&(c[n]=e.items[0][n]?e.items[0][n]:e[n])}),a(c)}if(u>1){var s=[];c={};e.items.forEach(function(n){s.push(n)}),s.map(function(n){o.forEach(function(t){(n[t]||e[t])&&(n[t]=n[t]||e[t])})}),function(n){r='<div class="layui-btn-group">',n.forEach(function(n){a(n)}),r+="</div>"}(s)}this.on=function(e,i){"click"==e&&n("#"+t.renderer).on("click","button",function(){i&&i(n(this).index())})},this.renderTo=function(t){n("#"+t).append(i)},e.renderer&&this.renderTo(e.renderer)}function a(n){var t=["layui-btn"];Object.keys(n).forEach(function(e){"size"!==e&&"type"!==e&&"radius"!==e||t.push("layui-btn-"+n[e]),"class"===e&&t.push(n[e])}),r+=`<button class="${t.join(" ")}">${n.text}</button>`,(i=document.createElement("div")).innerHTML=r}};window.PlgButton=t}(jQuery);
;(function($){

    $.fn.initPlgButton = function(options){
		var pg = new plgButton(options);
        var id = $(this).attr("id");
        pg.renderTo(id);
		return pg;
	}



    var plgButton = function(options){

        if(!options || !options.renderer) return;

        var config = {
            items:[
                {text:"", type:"", size:""}   // 局部设置size
            ],
            size: '',
            type: '',
            radius: ''
        }

        config =  $.extend({},config ,options); //合并成新对象，则是新的属性列表
        
        var template = '';   // 被渲染的模版
        var globalAttr = ['type', 'big', 'radius'];   // 默认全局属性的list
        // var globalAttr = ['type', 'big', 'radius'];   // 默认全局属性的list

        // 判断当前是按钮组还是单个的按钮
        var btnLength = config.items.length;

        if(btnLength === 1){
            var obj = {};

            Object.keys(config.items[0]).forEach(function(val){
                obj[val] = config.items[0][val];
            });

            globalAttr.forEach(function(val){
                if(config.items[0][val] || config[val]){
                    obj[val] = config.items[0][val] ? config.items[0][val] : config[val];
                }
            })

            _generateAloneTemplate(obj);  // 生成对应的模版
        }

        if(btnLength > 1){
            var arr = [], obj = {};

            config.items.forEach(function(val){
                arr.push(val);
            })
            
            arr.map(function(val){
                globalAttr.forEach(function(value){
                    
                    if(val[value] || config[value]){
                        val[value] = val[value] || config[value];
                    }

                });
            });

            _generateMultipleTemplate(arr);
        }

        function _generateMultipleTemplate(arr){
            
            template = '<div class="layui-btn-group">'
            arr.forEach(function(val){
                _generateAloneTemplate(val);
            })

            template += '</div>';

        }
        var mdoc;
        function _generateAloneTemplate(obj){
            var _classArr = ['layui-btn'];  // 默认值
            
            Object.keys(obj).forEach(function(key){
                if(key === 'size' || key === 'type' || key === 'radius'){
                    
                    _classArr.push('layui-btn-' + obj[key]);
                }

                if(key === 'class'){
                    _classArr.push(obj[key]);
                }

            });

            template += `<button class="${ _classArr.join(' ') }">${ obj.text }</button>`;
            
            mdoc = document.createElement("div");
            mdoc.innerHTML = template;
        }

        var click_callback;

        this.on = function(eventname, callback){
            if(eventname == 'click'){
                $('#' + options.renderer).on('click', 'button', function(){
                    callback && callback($(this).index());
                })
            }

        }

        this.renderTo = function(id){
            $('#' + id).append(mdoc);
        }

        
        if(config.renderer){
            this.renderTo(config.renderer);
        }
    }

    window.PlgButton = plgButton;

}(jQuery));

!function(a,n){n.use(["layer"],function(){var a=n.layer;a.config({anim:0,shade:.5,btnAlign:"c",fixed:!0,id:"plgDialog"+(new Date).valueOf()});var i=a;i.loading=function(){return a.load(0,{shade:.1})},window.plgDialog=i})}(jQuery,layui);
;(function ($, layui) {

    //PlgTabs.js
    layui.use(["layer"], function () {
        var layer=layui.layer;

        layer.config({
         anim: 0, //默认动画风格
      //  skin: 'layui-layer-molv' //默认皮肤
         shade: 0.5,
         btnAlign: 'c',
         fixed:true,
         id:"plgDialog"+new Date().valueOf(),
      

      });
    
 
      var plgDialog=layer
        plgDialog.loading = function(){
            return  layer.load(0, {shade:  0.1}); 
        }
    
      window.plgDialog=  plgDialog
    
          
    });



})(jQuery, layui);
!function(e){e.fn.initPlgEdit=function(n){var i=new t(n),r=e(this).attr("id");return i.renderTo(r),i};var t=function(t){var n,i,r=layui.layedit,o="",d={height:80,tool:["strong","italic","underline","del","|","left","center","right","link","unlink","face","image","help"],hideTool:[],uploadImage:null};t&&t.renderer&&(n=`<textarea id="${(d=e.extend({},d,t)).renderer}" style="display: none;"></textarea>`,(i=document.createElement("div")).innerHTML=n,this.plgEditgethander=function(){return o},this.plgEditgetContent=function(e=o){return r.getContent(e)},this.plgEditgetText=function(e=o){return r.getText(e)},this.plgEditsync=function(e=o){return r.sync(e)},this.plgEditgetSelection=function(e=o){return r.getSelection(e)},this.renderTo=function(t){e("#"+t).append(i),function(e,t){d.uploadImage&&r.set({uploadImage:d.uploadImage}),o=r.build(e,t)}(d.renderer,{height:d.height,tool:d.tool,hideTool:d.hideTool})},d.renderer&&this.renderTo(d.renderer))};window.PlgEdit=t}(jQuery);
;(function($){

    $.fn.initPlgEdit = function(options){
		var pg = new plgEdit(options);
        var id = $(this).attr("id");
        pg.renderTo(id);
		return pg;
	}



var plgEdit= function(options){
        var layedit = layui.layedit;  
        var layeditIndex = '';   // 获取编辑器的句柄
        var template = '';   // 被渲染的模版
        var mdoc;   // element片段
        var config = {
            height: 80,
            tool: [
                'strong' //加粗
                ,'italic' //斜体
                ,'underline' //下划线
                ,'del' //删除线
                
                ,'|' //分割线
                
                ,'left' //左对齐
                ,'center' //居中对齐
                ,'right' //右对齐
                ,'link' //超链接
                ,'unlink' //清除链接
                ,'face' //表情
                ,'image' //插入图片
                ,'help' //帮助
            ],
            hideTool: [],
            uploadImage: null
        }

        if(!options || !options.renderer) return;

        config =  $.extend({},config ,options); //合并成新对象，则是新的属性列表

        template = `<textarea id="${ config.renderer }" style="display: none;"></textarea>`;
        mdoc = document.createElement('div');
        mdoc.innerHTML = template;

        function mount(targetId, obj){
            // uploadImage
            // 判断是否启用了图片上传的功能
            // 此处对后端有要求，需要提供图片是否上传成功的会回参，数据格式如下
            /**
            {
                "code": 0 //0表示成功，其它失败
                ,"msg": "" //提示信息 //一般上传失败后返回
                ,"data": {
                    "src": "图片路径"
                    ,"title": "图片名称" //可选
                }
            }
            */
            if(config.uploadImage) {
                layedit.set({
                    uploadImage: config.uploadImage
                });
            }

            layeditIndex = layedit.build(targetId, obj); //建立编辑器
        }

        /**
         * 获得当前编辑器的句柄
         * 获取全局参数并且返回
         */
        this.plgEditgethander = function(){
            return layeditIndex;
        }

        /**
         * 获得编辑器的内容 
         * 参数 index： 即执行layedit.build返回的值
         */
        this.plgEditgetContent = function(Ind = layeditIndex){
            return layedit.getContent(Ind);
        }

        /**
         * 获得编辑器的纯文本内容 
         * 参数 index： 同上
         */
        this.plgEditgetText = function(Ind = layeditIndex){
            return layedit.getText(Ind);
        }
        
        /**
         * 用于同步编辑器内容到textarea（一般用于异步提交） 
         * 参数 index： 同上
         */
        this.plgEditsync = function(Ind = layeditIndex){
            return layedit.sync(Ind);
        }

        /**
         * 获取编辑器选中的文本 
         * 参数 index： 同上
         */
        this.plgEditgetSelection = function(Ind = layeditIndex){
            return layedit.getSelection(Ind);
        }

        this.renderTo = function(id){
            $('#' + id).append(mdoc);
            var targetId = config.renderer;
            var obj = {
                height: config.height,
                tool: config.tool,
                hideTool: config.hideTool
            }

            mount(targetId, obj);

        }

        
        if(config.renderer){
            this.renderTo(config.renderer);
        }
       
    }

    window.PlgEdit = plgEdit;

}(jQuery));

!function(e,t){t.use(["laydate"],function(){var n=t.laydate;window.plgDate=n,e.fn.plgDateRender=function(t){var a=this,i=e.extend(!0,{value:""},t);return this.length>1?e(this).each(function(e,t){i.elem=this,a.otps=n.render(i)}):(i.elem=this.selector,a.otps=n.render(i)),a}})}(jQuery,layui);
;(function ($, layui) {

    //PlgTabs.js
    layui.use(["laydate"], function () {
        var plgDate=layui.laydate;

            window.plgDate = plgDate;


            $.fn.plgDateRender = function (options) {
                var config={
                    value:"",               
              };

               var _this=this
                var opts=$.extend(true,config,options)
                    if(this.length>1){
                        $(this).each(function(index,value){
                            opts.elem=this;
                            _this.otps=plgDate.render(opts)
                        })
                    }else{
                        opts.elem=this.selector;
                        _this.otps=plgDate.render(opts) 
                    }

               return _this
    
            };
        
    });


})(jQuery, layui);
!function(t){t.fn.initPlgForm=function(n){var i=new e(n),o=t(this).attr("id");return i.renderTo(o),i};var e=function(n){var i,o,s;function u(t){o=new dhtmlXForm(t,s),console.dir(o)}i=t.extend({},e.default,n),s=i.items,this.getFormData=function(){return o.getFormData()},this.getDForm=function(){return o},this.getInput=function(t){return o.getInput()},this.getItemWidth=function(t){return o.getItemWidth(t)},this.getOptions=function(t){return o.getOptions(t)},this.getSelect=function(t){return o.getSelect(t)},this.getCheckedValue=function(t){return o.getCheckedValue(t)},this.getCombo=function(t){return o.getCombo(t)},this.hideItem=function(t,e){o.hideItem(t,e)},this.showItem=function(t,e){o.showItem(t,e)},this.disableItem=function(t){o.disableItem(t)},this.enableItem=function(t){o.enableItem(t)},this.clear=function(){o.clear()},this.addItem=function(t,e,n,i){o.addItem(pId,e,n,i)},this.reset=function(){o.reset()},this.getItemLabel=function(t,e){return 2==arguments.length?o.getItemLabel(t,e):o.getItemLabel(t)},this.getItemValue=function(t){return o.getItemValue(t)},this.setFormData=function(t){o.setFormData(t)},this.setItemFocus=function(t){o.setItemFocus(t)},this.setItemHeight=function(t,e){o.setItemHeight(t,e)},this.setItemWidth=function(t,e){o.setItemWidth(t,e)},this.setItemLabel=function(t,e){o.setItemLabel(t,e)},this.setItemValue=function(t,e){o.setItemValue(t,e)},this.setItemReadonly=function(t,e){o.setReadonly(t,e)},this.setItemRequired=function(t,e){o.setRequired(t,e)},this.setItemValidation=function(t,e){o.setValidation(t,e)},this.validateItem=function(t){o.validateItem(t)},this.validate=function(){o.validate()},this.forEachItem=function(t){o.forEachItem(t(name))},this.renderTo=function(t){u(t)},this.on=function(t,e){o.attachEvent(t,e)},i.renderer&&u(i.renderer)};e.default={items:[]},window.PlgForm=e}(jQuery);
;(function($){
	
	$.fn.initPlgForm = function(options){
		var pg = new plgForm(options);
		var id = $(this).attr("id");
		pg.renderTo(id);
		return pg;
	}
	
	var plgForm = function(options){
		var opts;
		var myForm;
		var formStructure;
		
		opts =  $.extend({},plgForm.default ,options); //合并成新对象，则是新的属性列表
		formStructure = opts.items;
		
		function renderTo(id){
			myForm = new dhtmlXForm(id,formStructure);
			console.dir(myForm)
		
		}
	
		this.getFormData = function(){
			return myForm.getFormData();
		}
		
		
		this.getDForm = function(){
			return myForm;
		}
		this.getInput = function(name){
			return myForm.getInput();
		}
		this.getItemWidth = function(name){
			return myForm.getItemWidth(name);
		}
		this.getOptions = function(name){
			return myForm.getOptions(name);
		}
		this.getSelect = function(name){
			return myForm.getSelect(name);
		}
		this.getCheckedValue = function(name){
			return myForm.getCheckedValue(name);
		}
		this.getCombo = function(name){
			return myForm.getCombo(name);
		}
		this.hideItem = function(name,value){
			myForm.hideItem(name,value);
		}
		this.showItem = function(name,value){
			myForm.showItem(name,value);
		}
		this.disableItem = function(name){
			myForm.disableItem(name);
		}
		this.enableItem = function(name){
			myForm.enableItem(name);
		}
		this.clear = function(){
			myForm.clear();
		}
		
		
		
		this.addItem = function(pid,itemData,pos,insertAfter){
			myForm.addItem(pId, itemData, pos, insertAfter);
		}
		
		this.reset = function(){
			myForm.reset()
		};
		
		this.getItemLabel = function(name,value){
			if(arguments.length==2){
				return myForm.getItemLabel(name,value);
			}else{
				return myForm.getItemLabel(name);
			}
		}
		this.getItemValue = function(name){
			return myForm.getItemValue(name);
		}
		this.setFormData = function(jsonData){
			myForm.setFormData(jsonData);
		}
		
		this.setItemFocus = function(name){
			myForm.setItemFocus(name);
		}
		this.setItemHeight = function(name,height){
			myForm.setItemHeight(name,height);
		}
		this.setItemWidth = function(name,width){
			myForm.setItemWidth(name,width);
		}
		this.setItemLabel = function(name,label){
			myForm.setItemLabel(name,label);
		}
		this.setItemValue = function(name,value){
			myForm.setItemValue(name,value);	
		}
		
		this.setItemReadonly = function(name,state){
			myForm.setReadonly(name,state);
		}
		this.setItemRequired = function(name,state){
			myForm.setRequired(name,state);
		}
		
		this.setItemValidation = function(name,rule){
			myForm.setValidation(name,rule);
		}
		
		this.validateItem = function(name){
			myForm.validateItem(name);
		}
		this.validate = function(){
			myForm.validate();
		}
		this.forEachItem=function(callback){
			myForm.forEachItem(callback(name));
		}
		
		this.renderTo = function(id){
			renderTo(id);
		}
		
		this.on = function(eventName,callback){
			myForm.attachEvent(eventName, callback);
		}
		if(opts.renderer){
			renderTo(opts.renderer);
		}
	}
	
	plgForm.default = {
   		//renderer:"",
   		items:[]
　　	}
	
	window.PlgForm = plgForm;
})(jQuery);

!function(e){e.fn.initPlgGrid=function(n){var r=new t(n),a=e(this).attr("id");return r.renderTo(a),r};var t=function(n){var r,a,l,i,u,s,o,c;r=e.extend({},t.default,n);var d=!1,p=Prolog.createRandomId(),h=r.params.pageNum?r.params.pageNum:t.default.params.pageNum,g=r.params.pageSize?r.params.pageSize:t.default.params.pageSize,m=1;function f(t){l=t+"-panel-"+p,s=t+"-toolbar-"+p,i=t+"-panel-pagebar-"+p,u=t+"-panel-grid-"+p,function(){if((a=document.createElement("div")).className="plg-grid-panel",a.setAttribute("id",l),r.toolbar&&r.toolbar.length){var e=document.createElement("div");e.setAttribute("id",s),e.className="plg-toolbar",a.appendChild(e)}var t=document.createElement("div");t.setAttribute("id",u),t.className="plg-grid",a.appendChild(t);var n=document.createElement("div");n.setAttribute("id",i),n.className="plg-grid-pagebar",a.appendChild(n)}(),e("#"+t).append(a),function(e){o=new dhtmlXGridObject(e);var t=r.imagePath;t&&t.length>0&&(t="/"!=t.substr(t.length-1,1)?t+"/":t,o.setImagePath(t));var n=r.columns.slice(0),a=new Array,l=new Array,i=new Array,u=new Array,s=new Array,c=new Array,c=new Array,d=new Array;r.multiselect?(a.push("chbx000"),l.push("&nbsp"),i.push("30"),u.push("center"),s.push("center"),c.push("ro"),d.push("int"),a.push("chbx001"),l.push("ch"),i.push("30"),u.push("center"),c.push("ch"),d.push("str")):(a.push("chbx000"),l.push("&nbsp"),i.push("30"),u.push("center"),s.push("center"),c.push("ro"),d.push("int"));d.push("str");for(var p=0;p<n.length;p++)a.push(n[p].id),l.push(null==n[p].name?n[p].id:n[p].name),i.push(null==n[p].width?"*":n[p].width),u.push(null==n[p].align?"center":n[p].align),s.push(null==n[p].align?"text-align:center":"text-align:"+n[p].align),c.push(null==n[p].type?"ro":n[p].type),d.push(null==n[p].sort?"str":n[p].sort),n[p].hidden&&(r.multiselect?o.setColumnHidden(p+2,!0):o.setColumnHidden(p+1,!0));o.setColumnIds(a.toString()),o.setHeader(l.toString(),null,s),o.setInitWidths(i.toString()),o.setColAlign(u.toString()),o.setColTypes(c.toString()),o.setColSorting(d.toString()),r.filters&&o.attachHeader(","+r.filters.toString());o.enableMultiselect(r.multiselect)}(u),r.toolbar&&r.toolbar.length&&(c=new dhtmlXForm(s,r.toolbar)),o.init()}function C(){var t=Prolog.load(l);if(null!=r.url&&""!=r.url){var n=r.params;r.page&&(n[r.pageNum]=h,n[r.pageSize]=g),Prolog.ajax(r.url,r.type,n,function(n){if("object"!=typeof n&&(n=JSON.parse(n)),null!=n.success&&0==n.success)return layer.close(t),void layer.msg(n.msg);var a,l,u;m=(h-1)*g+1,o.parse(function(e){for(var t,n=new Array,a=r.columns,l=0;l<e.length;l++){var i=e[l],u=new Array;r.multiselect?(u.push(m),u.push(0)):u.push(m),m+=1;for(var s=0;s<a.length;s++){var o=a[s].id;a[s].render&&(t=a[s].render(i[o],i))?u.push(t):u.push(i[o])}n.push({id:i[a[0].id],data:u,userdata:{data:i}})}return{rows:n}}(n.data.list),"json"),r.page&&(d=!1,a=i,l=n.data[r.totalCount],u=h,0!=r.page&&(g=null==g?0:g,l=null==l?0:l,e("#"+a).empty(),layui.laypage.render({elem:a,count:l,limit:g,curr:u,prev:'<i class="layui-icon layui-icon-left"></i>',next:'<i class="layui-icon layui-icon-right"></i>',layout:["prev","page","next","limit","refresh","skip","count"],jump:function(e){h=e.curr,g=e.limit,d&&w(),d=!0}}))),layer.close(t)})}}function w(){o.clearAll(),C()}this.getToolBarForm=function(){return c},this.getElement=function(){return a},this.renderTo=function(e){return f(e),this},this.getGrid=function(e){return o},this.loadData=function(){C()},this.getParams=function(){return r.params},this.setParams=function(e){r.params=e},this.reload=function(){w()},this.getCheckedIds=function(){return o.getCheckedRows(1)},this.getSelectedRowId=function(){return o.getSelectedRowId()},this.getSelectedRowData=function(e){var t=o.getSelectedRowId();return e?o.getUserData(t,"data")[e]:o.getUserData(t,"data")},this.getSelectedCellIndex=function(){return o.getSelectedCellIndex()},this.getRowId=function(e){return o.getRowId(e)},this.getRowIndex=function(e){return o.getRowIndex(e)},this.getCellObject=function(e,t){return o.cells(e,t)},this.getCellVaule=function(e,t){return o.cells(e,t).getValue()},this.getCellObject2=function(e,t){return o.cells2(e,t)},this.getCellVaule2=function(e,t){return o.cells2(e,t).getValue()},this.getColumnsNum=function(){return o.getColumnsNum()},this.setColWidth=function(e,t){o.setColWidth(e,t.toString())},this.setColumnColor=function(e){o.setColumnColor(e.toString())},this.setColumnHidden=function(e,t){o.setColumnHidden(e,t)},this.setRowHidden=function(e,t){o.setRowHidden(colIndex,t)},this.on=function(e,t){o.attachEvent(e,t)},this.attachToolBarEvent=function(e,t){c.attachEvent(e,t)},r.renderer&&""!=r.renderer&&f(r.renderer)};t.default={renderer:"",columns:[],multiselect:!1,url:"data.json",type:"get",pageNum:"pageNum",pageSize:"pageSize",params:{pageSize:20,pageNum:1},page:!0,imagePath:"../codebase/imgs/",totalCount:"totalCount"},window.PlgGrid=t}(jQuery);
;(function($){
	
	$.fn.initPlgGrid = function(options){
		var pg = new plgGrid(options);
		var id = $(this).attr("id");
		pg.renderTo(id);
		return pg;
	}
	
	var plgGrid = function(options){
		var opts;
		opts =  $.extend({},plgGrid.default ,options); //合并成新对象，则是新的属性列表
		
		var panel;
		var laypage;
		var panelId,pageBarId,gridId,toolBarId;
		var mygrid;
		var toolBarForm;
		
		var isInitPage = false;
		var rand= Prolog.createRandomId();
		var pageNum = opts.params.pageNum?opts.params.pageNum:plgGrid.default.params.pageNum;
		var pageSize = opts.params.pageSize?opts.params.pageSize:plgGrid.default.params.pageSize;
		var rownum=1;
		
		this.getToolBarForm = function(){
			return toolBarForm;
		}
		function renderTo(id){
			panelId = id+"-panel-"+rand;
			toolBarId = id +"-toolbar-"+rand;
			pageBarId = id+"-panel-pagebar-"+rand;
			gridId = id+"-panel-grid-"+rand;
			createPanel();

		
			
			$("#"+id).append(panel);
			createGrid(gridId);
			createToolBar(panel);
			
			mygrid.init();      //finishes initialization and renders the grid on the page 
			
			
		}
		
		/**
		 * 创建面板
		 */
		function createPanel(){
			panel = document.createElement("div");
			panel.className="plg-grid-panel";
			panel.setAttribute("id",panelId);
			/*
			if(opts.toolbar && opts.toolbar.length>0){
				var toolBarDiv = document.createElement("div");
				toolBarDiv.setAttribute("id",toolBarId);
				toolBarDiv.className="plg-toolbar";
				
				var tt='';
				for(var i=0;i<opts.toolbar.length;i++){
					var nd = opts.toolbar[i];
					var icon='';
					if(nd.icon){
						icon = '<i class="'+nd.icon+'"></i>';
					}
					var btn = document.createElement("button");
					btn.className=nd.cls;
					btn.innerHTML= icon+nd.text;
					if(nd.click)
						btn.onclick = nd.click;
					
					toolBarDiv.appendChild(btn);
				}
				panel.appendChild(toolBarDiv);
			}
			*/
			
			if(opts.toolbar && opts.toolbar.length){
				var toolBarDiv = document.createElement("div");
				toolBarDiv.setAttribute("id",toolBarId);
				toolBarDiv.className="plg-toolbar";
				panel.appendChild(toolBarDiv);
			}
			
			var gridDiv = document.createElement("div");
			gridDiv.setAttribute("id",gridId);
			gridDiv.className="plg-grid";
			panel.appendChild(gridDiv);
			
			var pageBarDiv = document.createElement("div");
			pageBarDiv.setAttribute("id",pageBarId);
			pageBarDiv.className="plg-grid-pagebar";
			panel.appendChild(pageBarDiv);
			
		}
		
		function createToolBar(panel){
			if(opts.toolbar && opts.toolbar.length){
				toolBarForm = new dhtmlXForm(toolBarId,opts.toolbar);
			}
		}
		/**
		 * 创建分页组件
		 * @param {Object} id
		 */
		function createPageBar(id,totalCount,curr){
			if(opts.page==false)
				return;
			pageSize = pageSize==null?0:pageSize;
			totalCount = totalCount==null?0:totalCount;
			$("#"+id).empty();
			laypage = layui.laypage;
			//完整功能
			laypage.render({
			    elem: id,
			    count: totalCount,
			    limit:pageSize,
			    curr:curr,
			    prev:'<i class="layui-icon layui-icon-left"></i>',
			    next:'<i class="layui-icon layui-icon-right"></i>',
			    layout: [ 'prev', 'page', 'next', 'limit', 'refresh', 'skip','count'],
			    jump: function(obj){
			    	pageNum = obj.curr;
			    	pageSize = obj.limit;
			    	if(isInitPage)
			    		reload();
			    	isInitPage=true;
			    }
			});
		}
		
		function createGrid(id){
			
			mygrid = new dhtmlXGridObject(id);
			//mygrid.setSkin("web");
			var imp = opts.imagePath;
			if(imp && imp.length>0){
				imp = imp.substr(imp.length-1,1)!="/"?imp+"/":imp;
				mygrid.setImagePath(imp);
			}
				
			
   		
   			//[{id:"",name:"",type:'',sort:'',align:'',width:'',hidden:false,default:"",renderer:}]
   			var cdata = opts.columns.slice(0);
   			
   			var columnArray = new Array();
   			var headerArray = new Array();
			var widthArray = new Array();
			var alignArray = new Array();
			var headerAlignArray = new Array();
			var typeArray = new Array();
			var typeArray = new Array();
			var sortArray = new Array();
			
			
			if(opts.multiselect){
				columnArray.push("chbx000");
				headerArray.push("&nbsp");
				widthArray.push("30");
				alignArray.push("center");
				headerAlignArray.push("center");
				typeArray.push("ro");
				sortArray.push("int");
				
				columnArray.push("chbx001");
				headerArray.push("ch");
				widthArray.push("30");
				alignArray.push("center");
				typeArray.push("ch");
				sortArray.push("str");
			}else{
				columnArray.push("chbx000");
				headerArray.push("&nbsp");
				widthArray.push("30");
				alignArray.push("center");
				headerAlignArray.push("center");
				typeArray.push("ro");
				sortArray.push("int");
			}
				
				
			sortArray.push("str");
			//unshift()
			
			for(var i=0;i<cdata.length;i++){
				columnArray.push(cdata[i].id);
				headerArray.push(cdata[i].name==null?cdata[i].id:cdata[i].name);
				widthArray.push(cdata[i].width == null ? "*":cdata[i].width);
				
				alignArray.push(cdata[i].align==null ? "center":cdata[i].align);
				headerAlignArray.push(cdata[i].align==null ? "text-align:center":"text-align:"+cdata[i].align);
				
				typeArray.push(cdata[i].type==null?"ro":cdata[i].type);
				sortArray.push(cdata[i].sort==null?"str":cdata[i].sort);
				if(cdata[i].hidden){
					if(opts.multiselect)
						mygrid.setColumnHidden(i+2,true);
					else
						mygrid.setColumnHidden(i+1,true);
				}
			}
			
			
			mygrid.setColumnIds(columnArray.toString());
			
			mygrid.setHeader(headerArray.toString(),null,headerAlignArray);
			
			mygrid.setInitWidths(widthArray.toString());          //the widths of columns
	        
	        mygrid.setColAlign(alignArray.toString());       //the alignment of columns
	        
	        mygrid.setColTypes(typeArray.toString());                //the types of columns
	       	mygrid.setColSorting(sortArray.toString());          //the sorting types
	       	
	       	if(opts.filters){
	       		mygrid.attachHeader(","+opts.filters.toString());
	       	}
	       	
	       	mygrid.enableMultiselect(opts.multiselect);
		}
		
		function loadData(){
			var loading = Prolog.load(panelId);
			
			if(opts.url==null || opts.url=="")
				return;
			
			var pp = opts.params;
			if(opts.page){
				pp[opts.pageNum]=pageNum;
				pp[opts.pageSize]=pageSize
			}
			Prolog.ajax(opts.url,opts.type,pp,function(da){
				if(typeof da != "object")
					da = JSON.parse(da);
				
				if(da.success!=null && da.success==false){
						layer.close(loading);
			    		layer.msg(da.msg);
			    		return;
				}
			
		    	rownum = (pageNum-1)*pageSize+1;
				mygrid.parse(converData(da.data.list),"json");
				
				if(opts.page){
					isInitPage = false
					createPageBar(pageBarId,da.data[opts.totalCount],pageNum);
				}
				layer.close(loading);
			});
		}
		
		function converData(data){
			var gridrows = new Array();
    		var colArray = opts.columns;
    		var v;
    		for(var i=0;i<data.length;i++){
	    		var rd = data[i];
	    		var row = new Array();
	    		
	    		if(opts.multiselect){
	    			row.push(rownum);
	    			row.push(0);
	    		}else{
	    			row.push(rownum);
	    		}
	    		rownum = rownum+1;	
	    		
	    		for(var j=0;j<colArray.length;j++){
					var col = colArray[j].id;
					if(colArray[j].render){
						v = colArray[j].render(rd[col],rd);
						if(v)
							row.push(v);
						else
							row.push(rd[col]);
					}else
						row.push(rd[col]);
	    		}
	    		
	    		gridrows.push({id:rd[colArray[0].id],data:row,userdata:{data:rd}});
	    		
	    		
	    	}
	    	return {rows:gridrows};
		}
		
		function reload(){
			mygrid.clearAll();
			loadData();
		}
		
		
		this.getElement = function(){
			return panel;
		}
		
		this.renderTo = function(id){
			renderTo(id);
		

			return this;
		}
		
		this.getGrid = function(id){
			return mygrid;
		}
		this.loadData = function(){
			loadData();
		}
		this.getParams = function(){
			return opts.params;
		}
		this.setParams = function(params){
			opts.params = params;
		}
		this.reload = function(){
			reload();
		}
		
		this.getCheckedIds = function(){
			return mygrid.getCheckedRows(1);
		}
		
		this.getSelectedRowId = function(){
			return mygrid.getSelectedRowId();
		}
		
		this.getSelectedRowData = function(name){
			var rid = mygrid.getSelectedRowId();
			if(!name)
				return mygrid.getUserData(rid,"data");
			else{
				return mygrid.getUserData(rid,"data")[name];
			}
		}
		
		this.getSelectedCellIndex = function(){
			return mygrid.getSelectedCellIndex();
		}
		this.getRowId = function(rowIndex){
			return mygrid.getRowId(rowIndex);
		}
		this.getRowIndex = function(rowId){
			return mygrid.getRowIndex(rowId);
		}
		
		this.getCellObject = function(rowId,colIndex){
			return mygrid.cells(rowId, colIndex);
		}
		this.getCellVaule = function(rowId,colIndex){
			return mygrid.cells(rowId, colIndex).getValue();
		}
		
		this.getCellObject2 = function(rowIndex,colIndex){
			return mygrid.cells2(rowIndex, colIndex);
		}
		this.getCellVaule2 = function(rowIndex,colIndex){
			return mygrid.cells2(rowIndex, colIndex).getValue();
		}
		this.getColumnsNum = function(){
			return mygrid.getColumnsNum();
		}
		
		this.setColWidth = function(colIndex,width){
			mygrid.setColWidth(colIndex,width.toString());
		}
		
		
		this.setColumnColor = function(array){
			mygrid.setColumnColor(array.toString());
		}
		
		this.setColumnHidden = function(colIndex,isHidden){
			mygrid.setColumnHidden(colIndex,isHidden);
		}
		
		this.setRowHidden = function(rowId,isHidden){
			mygrid.setRowHidden(colIndex,isHidden);
		}
		
		this.on = function(eventName,callback){
			mygrid.attachEvent(eventName, callback);
		}
		this.attachToolBarEvent = function(eventName,callback){
			toolBarForm.attachEvent(eventName, callback);
		}
	
		if(opts.renderer && opts.renderer!=""){
			renderTo(opts.renderer);
		}
		
	}
	
	//columns:[{id:"",name:"",type:'',sort:'',align:'',width:'',hidden:false,default:"",renderer:}]
	plgGrid.default = {
   		renderer:"",
   		columns:[],
   		multiselect:false,
   		url:"data.json",
   		type:"get",
   		pageNum:"pageNum",
   		pageSize:"pageSize",
		params:{pageSize:20,pageNum:1},
		page:true,
		imagePath:"../codebase/imgs/",
		totalCount:"totalCount"
　　	}
	
	
	window.PlgGrid = plgGrid;
	
})(jQuery);

!function(e){e.fn.initPlgNav=function(n){var i=new a(n),r=e(this).attr("id");return i.renderTo(r),i};var a=function(a){var n={skin:"layui-bg-cyan"};if(a&&a.renderer){n=e.extend({},n,a);var i,r,l="",d=n.items;i=d,l+=`<ul class="layui-nav ${n.skin}">`,i.forEach(function(e,a){var n,i;e.defatuleSelected||(l+=`<li class="layui-nav-item"><a href="${e.href}">${e.name}</a></li>`),e.defatuleSelected&&(l+=`<li class="layui-nav-item layui-this">\n                        <a href="javascript:;">${e.name}</a>`,l+=(n=e.childItems,i='<dl class="layui-nav-child">',n.forEach(function(e,a){e.isSelected||(i+=`<dd><a href="${e.href}">${e.name}</a></dd>`),e.isSelected&&(i+=`<dd class="layui-this"><a href="${e.href}">${e.name}</a></dd>`)}),i+="</dl>"),l+="</li>")}),l+="</ul>",(r=document.createElement("div")).innerHTML=l,this.renderTo=function(a){e("#"+a).append(r)},n.renderer&&(this.renderTo(n.renderer),layui.element.render())}};window.PlgNav=a}(jQuery);
;(function($){

    $.fn.initPlgNav = function(options){
		var pg = new plgNav(options);
        var id = $(this).attr("id");
        pg.renderTo(id);
		return pg;
	}



    var plgNav = function(options){
        var config = {
            skin: 'layui-bg-cyan',  // layui-bg-cyan（藏青）、layui-bg-molv（墨绿）、layui-bg-blue（艳蓝） 
        }

        if(!options || !options.renderer) return;

        config =  $.extend({},config ,options); //合并成新对象，则是新的属性列表
        
        var template = '';   // 被渲染的模版

        // 判断当前是按钮组还是单个的按钮
        var navItems = config.items;   

        _generateTemplate(navItems);
        
        var mdoc;
        function _generateTemplate(arr){

            template += `<ul class="layui-nav ${ config.skin }">`;

            arr.forEach(function(val, ind){
                if (!val.defatuleSelected){
                    template += `<li class="layui-nav-item"><a href="${ val.href }">${ val.name }</a></li>`;
                }

                if(val.defatuleSelected) {
                    template += `<li class="layui-nav-item layui-this">
                        <a href="javascript:;">${ val.name }</a>`;
                    template += childTempalta(val.childItems);
                    template += `</li>`;
                }
                
            })
           
            template += `</ul>`;
            mdoc = document.createElement("div");
            mdoc.innerHTML = template;
        }

        function childTempalta(items){
            var temTemplate = `<dl class="layui-nav-child">`;

            items.forEach(function(val, ind){
                if(!val.isSelected){
                    temTemplate += `<dd><a href="${ val.href }">${ val.name }</a></dd>`;
                }
                if(val.isSelected) {
                    temTemplate += `<dd class="layui-this"><a href="${ val.href }">${ val.name }</a></dd>`;
                }
            });
            temTemplate += `</dl>`;

            return temTemplate;
        }

        this.renderTo = function(id){
            $('#' + id).append(mdoc);
        }

        
        if(config.renderer){
            this.renderTo(config.renderer);
            layui.element.render();
        }

    }

    window.PlgNav = plgNav;

}(jQuery));

!function(e){e.fn.initPlgPages=function(r){var t=new n(r);e(this).attr("id");return t.renderTo(),t};var n=function(n){var r;this.default={count:""},n&&n.renderer&&(n.count&&n.count!==parseInt(n.count)||(delete(r=e.extend({},this.default,n)).renderer,r.elem=n.renderer,this.renderTo=function(){layui.laypage.render(r)},r.elem&&this.renderTo()))};window.PlgPages=n}(jQuery);
;(function($){

    $.fn.initPlgPages = function(options){
		var pg = new plgPages(options);
        var id = $(this).attr("id");
        pg.renderTo();
		return pg;
	}

    var plgPages = function(options){
        var config;

        this.default = {
            count: ''
        }
        // 检测用户使用的配置参数是否合法
        if(!options || !options.renderer) return;
        
        if(options.count && options.count !== parseInt(options.count)) return;
        
        config =  $.extend({}, this.default, options); //合并成新对象，则是新的属性列表

        // 当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
        // config.jump = function(obj, first){
        //     if(this.click){
        //         // console.log('用户点击');
        //         this.click(obj, first);
        //     }
        // }
        
        delete config.renderer;
        config.elem = options.renderer;

        this.renderTo = function(){
            layui.laypage.render(config);   // 此处使用lay的laypage的组件
        }
        
        if(config.elem){
            this.renderTo();
        }
       
    }

    window.PlgPages = plgPages;
}(jQuery));

!function(t,n){n.use(["element"],function(){var n=function(n){var e=`<div class="layui-card" ${n.id?' id ="'+n.id+'"':""} ${n.style?`style="${n.style}"`:""}>\n                        <div class="layui-card-header" >${n.title}</div>\n                        <div class="layui-card-body">\n                                ${n.content}\n                        </div>\n                    </div>`;return t(e)},e=function(e,i){var o,s={title:"标题",content:"暂无数据",style:null,id:"plgTabs"+(new Date).valueOf()};1===arguments.length?"object"==typeof(o=arguments[0])&&(this.opts=t.extend(!0,s,o),this.document=n(this.opts)):2===arguments.length&&(e=arguments[0],"object"==typeof(o=arguments[1])&&(this.opts=t.extend(!0,s,o),this.document=n(this.opts),this.renderTo(e)))};e.prototype.renderTo=function(n){return t(n).append(this.document),this},window.plgPanel=function(t){return new e(t)},t.fn.plgPanel=function(t){return new e(this,t)}})}(jQuery,layui);
; (function ($, layui) {

    //PlgPanel.js
    layui.use(["element"], function () {
     
        var template = function (opts) {
            var html = `<div class="layui-card" ${opts.id?` id ="`+ opts.id+`"`:""} ${opts.style ? `style="${opts.style}"`:""}>
                        <div class="layui-card-header" >${opts.title}</div>
                        <div class="layui-card-body">
                                ${opts.content}
                        </div>
                    </div>`;          
            return $(html)
        };

        var plgPanel = function (ele, options) {
            var _this = this;
            var config = {      
                    title:"标题",
                    content:`暂无数据`,
                    style:null,
                    id:"plgTabs"+new Date().valueOf(),//选择器
                    
            };
            var ele, opt;
            //获取数据入口
            if (arguments.length === 1) {
                opt = arguments[0];
                if (typeof opt === "object") {
                    _this.opts = $.extend(true, config, opt);

                    _this.document = template(_this.opts);
                }

            } else if (arguments.length === 2) {
                ele = arguments[0];
                opt = arguments[1];
                if (typeof opt === "object") {
                    _this.opts = $.extend(true, config, opt);
                    _this.document = template(_this.opts);
                    _this.renderTo(ele);
                }
            }
        };
        


        plgPanel.prototype.renderTo = function (ele) {
            $(ele).append(this.document);
            return this
        };
        



   

        window.plgPanel = function (options) {
            return new plgPanel(options)

        };

        $.fn.plgPanel = function (options) {
            return new plgPanel(this, options);

        };



    });


})(jQuery, layui);
!function(Y){var Z="YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY",L={19969:"DZ",19975:"WM",19988:"QJ",20048:"YL",20056:"SC",20060:"NM",20094:"QG",20127:"QJ",20167:"QC",20193:"YG",20250:"KH",20256:"ZC",20282:"SC",20285:"QJG",20291:"TD",20314:"YD",20340:"NE",20375:"TD",20389:"YJ",20391:"CZ",20415:"PB",20446:"YS",20447:"SQ",20504:"TC",20608:"KG",20854:"QJ",20857:"ZC",20911:"PF",20504:"TC",20608:"KG",20854:"QJ",20857:"ZC",20911:"PF",20985:"AW",21032:"PB",21048:"XQ",21049:"SC",21089:"YS",21119:"JC",21242:"SB",21273:"SC",21305:"YP",21306:"QO",21330:"ZC",21333:"SDC",21345:"QK",21378:"CA",21397:"SC",21414:"XS",21442:"SC",21477:"JG",21480:"TD",21484:"ZS",21494:"YX",21505:"YX",21512:"HG",21523:"XH",21537:"PB",21542:"PF",21549:"KH",21571:"E",21574:"DA",21588:"TD",21589:"O",21618:"ZC",21621:"KHA",21632:"ZJ",21654:"KG",21679:"LKG",21683:"KH",21710:"A",21719:"YH",21734:"WOE",21769:"A",21780:"WN",21804:"XH",21834:"A",21899:"ZD",21903:"RN",21908:"WO",21939:"ZC",21956:"SA",21964:"YA",21970:"TD",22003:"A",22031:"JG",22040:"XS",22060:"ZC",22066:"ZC",22079:"MH",22129:"XJ",22179:"XA",22237:"NJ",22244:"TD",22280:"JQ",22300:"YH",22313:"XW",22331:"YQ",22343:"YJ",22351:"PH",22395:"DC",22412:"TD",22484:"PB",22500:"PB",22534:"ZD",22549:"DH",22561:"PB",22612:"TD",22771:"KQ",22831:"HB",22841:"JG",22855:"QJ",22865:"XQ",23013:"ML",23081:"WM",23487:"SX",23558:"QJ",23561:"YW",23586:"YW",23614:"YW",23615:"SN",23631:"PB",23646:"ZS",23663:"ZT",23673:"YG",23762:"TD",23769:"ZS",23780:"QJ",23884:"QK",24055:"XH",24113:"DC",24162:"ZC",24191:"GA",24273:"QJ",24324:"NL",24377:"TD",24378:"QJ",24439:"PF",24554:"ZS",24683:"TD",24694:"WE",24733:"LK",24925:"TN",25094:"ZG",25100:"XQ",25103:"XH",25153:"PB",25170:"PB",25179:"KG",25203:"PB",25240:"ZS",25282:"FB",25303:"NA",25324:"KG",25341:"ZY",25373:"WZ",25375:"XJ",25384:"A",25457:"A",25528:"SD",25530:"SC",25552:"TD",25774:"ZC",25874:"ZC",26044:"YW",26080:"WM",26292:"PB",26333:"PB",26355:"ZY",26366:"CZ",26397:"ZC",26399:"QJ",26415:"ZS",26451:"SB",26526:"ZC",26552:"JG",26561:"TD",26588:"JG",26597:"CZ",26629:"ZS",26638:"YL",26646:"XQ",26653:"KG",26657:"XJ",26727:"HG",26894:"ZC",26937:"ZS",26946:"ZC",26999:"KJ",27099:"KJ",27449:"YQ",27481:"XS",27542:"ZS",27663:"ZS",27748:"TS",27784:"SC",27788:"ZD",27795:"TD",27812:"O",27850:"PB",27852:"MB",27895:"SL",27898:"PL",27973:"QJ",27981:"KH",27986:"HX",27994:"XJ",28044:"YC",28065:"WG",28177:"SM",28267:"QJ",28291:"KH",28337:"ZQ",28463:"TL",28548:"DC",28601:"TD",28689:"PB",28805:"JG",28820:"QG",28846:"PB",28952:"TD",28975:"ZC",29100:"A",29325:"QJ",29575:"SL",29602:"FB",30010:"TD",30044:"CX",30058:"PF",30091:"YSP",30111:"YN",30229:"XJ",30427:"SC",30465:"SX",30631:"YQ",30655:"QJ",30684:"QJG",30707:"SD",30729:"XH",30796:"LG",30917:"PB",31074:"NM",31085:"JZ",31109:"SC",31181:"ZC",31192:"MLB",31293:"JQ",31400:"YX",31584:"YJ",31896:"ZN",31909:"ZY",31995:"XJ",32321:"PF",32327:"ZY",32418:"HG",32420:"XQ",32421:"HG",32438:"LG",32473:"GJ",32488:"TD",32521:"QJ",32527:"PB",32562:"ZSQ",32564:"JZ",32735:"ZD",32793:"PB",33071:"PF",33098:"XL",33100:"YA",33152:"PB",33261:"CX",33324:"BP",33333:"TD",33406:"YA",33426:"WM",33432:"PB",33445:"JG",33486:"ZN",33493:"TS",33507:"QJ",33540:"QJ",33544:"ZC",33564:"XQ",33617:"YT",33632:"QJ",33636:"XH",33637:"YX",33694:"WG",33705:"PF",33728:"YW",33882:"SR",34067:"WM",34074:"YW",34121:"QJ",34255:"ZC",34259:"XL",34425:"JH",34430:"XH",34485:"KH",34503:"YS",34532:"HG",34552:"XS",34558:"YE",34593:"ZL",34660:"YQ",34892:"XH",34928:"SC",34999:"QJ",35048:"PB",35059:"SC",35098:"ZC",35203:"TQ",35265:"JX",35299:"JX",35782:"SZ",35828:"YS",35830:"E",35843:"TD",35895:"YG",35977:"MH",36158:"JG",36228:"QJ",36426:"XQ",36466:"DC",36710:"JC",36711:"ZYG",36767:"PB",36866:"SK",36951:"YW",37034:"YX",37063:"XH",37218:"ZC",37325:"ZC",38063:"PB",38079:"TD",38085:"QY",38107:"DC",38116:"TD",38123:"YD",38224:"HG",38241:"XTC",38271:"ZC",38415:"YE",38426:"KH",38461:"YD",38463:"AE",38466:"PB",38477:"XJ",38518:"YT",38551:"WK",38585:"ZC",38704:"XS",38739:"LJ",38761:"GJ",38808:"SQ",39048:"JG",39049:"XJ",39052:"HG",39076:"CZ",39271:"XT",39534:"TD",39552:"TD",39584:"PB",39647:"SB",39730:"LG",39748:"TPB",40109:"ZQ",40479:"ND",40516:"HG",40536:"HG",40583:"QJ",40765:"YQ",40784:"QJ",40840:"YK",40863:"QJG"};function X(Y){var X=Y.charCodeAt(0);return X>40869||X<19968?Y:L[X]?L[X]:Z.charAt(X-19968)}String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};var J={};J.makePy=function(Y){if("string"!=typeof Y)throw new Error(-1,"函数makePy需要字符串类型参数!");for(var Z=new Array,L=0,J=Y.length;L<J;L++){var S=Y.charAt(L);Z.push(X(S))}return function(Y){for(var Z=[""],L=0,X=Y.length;L<X;L++){var J=Y[L],S=J.length;if(1==S)for(var C=0;C<Z.length;C++)Z[C]+=J;else{var Q=Z.slice(0);for(Z=[],C=0;C<S;C++){for(var H=Q.slice(0),T=0;T<H.length;T++)H[T]+=J.charAt(C);Z=Z.concat(H)}}}return Z}(Z)};layui.element,window,document;var S=function(Z,L){var X={dom:null,documentPanel:null,meunPanelThis:null,template:function(Z){var L=this.meunPanelThis.getData.parentData,X=this.mainNav(L);return Y(`<div class="plg-sidebar">\n    <div class="main-nav">\n        <div id="meunSoroll" class="layui-side-scroll ">\n            \x3c!-- 左侧导航区域（可配合layui已有的垂直导航） --\x3e\n            <div class="pr-open" data-type="hoot-click">\n                <div class="layui-layer-setwin">\n                    <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>\n                </div>\n                <div class="pr-search">\n                       <span class="pr-icon-search-wrapper"><i class="layui-icon layui-icon-search\n"></i></span>\n\n                    <input type="text" id="selectInput" class="pr-search-input" placeholder="请输入关键词">\n\n                    <div class="search-tip">\n                        <p><span>以下是与“<strong></strong>”相关的产品：</span></p></div>\n\n                </div>\n                <div class="pr-left">\n                    <div id="keyUpList" class="keyUpList"></div>\n                    <div class="pr-meungroup-list">\n                    </div>\n                </div>\n                <div class="pr-right">\n                    <div class="scroll-nav">\n                        <ul class="right-sidebar">\n\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class="product-all" data-type="hoot-click">\n                          <span class="icon-box">\n                                 <i class="icon iconfont p-icon-all"></i>\n                          </span>\n                <span class="meun-name">\n                             <a class="" href="javascript:;">所有服务</a>\n                             <i class="right-mover layui-icon layui-icon-right\n"></i>\n                         </span>\n            </div>\n            <div class="nav-last" data-type="hoot-click">\n                <ul id="sidebar" class="sidebar">\n                    ${X}\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div class="layui-body">\n        \x3c!-- 二级菜单 --\x3e\n        <div class="layui-side">\n            <div class="layui-side-scroll">\n                <div class="nav-title"></div>\n                <ul class="body-nav" lay-filter="test">\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>\n`)},mainNav:function(Y){var Z="";return Y[0].filter(function(Y){"0"!==Y.parentMenuId||Y.leaf||(Z+=`\n                        <li class="s-item" id=${Y.id} menu-id=${Y.menuId}>\n                               <span class="icon-box">\n                                 <i class="${Y.imagePath}"></i>\n                             </span>\n                              <span class="meun-name"><a href="javascript:;">${Y.name}</a></span>\n                         </li>                    \n                            \n                      `)}),Z},resetOpenMenuList:function(Z,L){var X=Y('<div class="pr-meun-group"></div><div class="pr-meun-group"></div><div class="pr-meun-group"></div>');Y(this.documentPanel[0]).find(".right-sidebar").html("").append(this.mainNav(L)),L[0].forEach(function(Y,Z){var J=`<div class="list-item" id=${Y.menuId}><a menu-id=${Y.menuId} parentmenuid=${Y.parentMenuId} class="list-title">${Y.name}</a>`;L[Y.menuId]&&L[Y.menuId].forEach(function(Y){J+=`<div class="menu-text">\n                                            <a href=${Y.path||"javascript:;"}\n                                             menu-id=${Y.menuId}\n                                             parentmenuid=${Y.parentMenuId}\n                                             leaf=${Y.leaf}                                     \n                                             >\n                                             ${Y.name}\n                                            </a>\n                        </div>`,L[Y.menuId]&&L[Y.menuId].forEach(function(Y){J+=`<div class="menu-text">\n                                                 <a href=${Y.path||"javascript:;"} \n                                                  menu-id=${Y.menuId} \n                                                  parentmenuid=${Y.parentMenuId}\n                                                  leaf=${Y.leaf}>\n                                                    ${Y.name}\n                                                    </a>\n                                                 </div>`})}),J+="</div>",Z%3==0?X.eq(0).append(J):Z%3==1?X.eq(1).append(J):Z%3==2&&X.eq(2).append(J)}),X.find(".menu-text>a[leaf='false']").hide(),Z.append(X)},setOpenAll:function(Z){var L=this.dom.meungroupList,X=Z.parentData,J=Y(this.documentPanel[0]).find("#keyUpList");this.resetOpenMenuList(L,X);var S=new RegExp("[\\u4E00-\\u9FFF]+","g");Y(this.documentPanel[0]).find("#selectInput").keyup(function(X){var C=Y(this).val();if(!(C=C.toUpperCase()))return Y(this).next(".search-tip").hide(),L.show(),void J.html("").hide();Y(this).next(".search-tip").show().find("strong").text(C),L.hide();var Q="";for(var H in Z.mapAll){var T=Z.mapAll[H];(S.test(C)?T.name.indexOf(C):T.PY_code.indexOf(C))>=0&&T.leaf&&(Q+=`<div class="pr-meun-group">\n                                    <div class="list-item">\n                                        <div class="menu-text">\n                                            <a href=${T.path||"javascript:;"} >\n                                             ${T.name}\n                                            </a>\n                                         </div>\n                                         </div>\n                                    </div>`)}L.hide(),J.html("").show().append(Q)})},meunTopObj:function(Y){var Z=this.dom.meungroupList.find(".list-item");return Y={},Z.each(function(Z,L){var X=L.id;Y[X]=parseInt(L.offsetTop)}),Y},removerShowList:function(){this.dom.meungroupList,this.meunPanelThis.getData.parentData;this.dom&&this.dom.meunSoroll.removeClass("showList")},clickChild:function(Z){var L,X=this,J=X.dom.bodyNav,S=X.meunPanelThis.getData;X.dom.bodyNav.on("click","a",function(Z){Z.stopPropagation(),Z.preventDefault();var J=(L=Y(this)).attr("menu-id");X.dom.meungroupList.find("a[menu-id='"+J+"']").trigger("click")}),X.dom.prLeft.on("click",".menu-text > a",function(C){C.stopPropagation(),C.preventDefault(),L=Y(this);var Q=Y(this).attr("menu-id"),H=J.find("a[menu-id='"+Q+"']"),T=H.parents(".body-nav"),D=H.parent(),M=H.siblings(".nav-child"),B=(L.attr("href"),{getCurrent:S.mapAll[Q]});if(H.length>0)"javascript:;"!==L.attr("href")&&"_blank"===L.attr("target")||(M[0]?M[0]?(D.toggleClass("itemeds").siblings().removeClass("itemeds"),M.slideToggle("fast"),L.parent().siblings().children(".nav-child").slideUp()):H.parents(".nav-child")&&(H.parents(".item").addClass("itemeds").siblings().removeClass("itemeds"),M.slideToggle("fast"),L.parent().siblings().children(".nav-child").slideUp()):(T.find(".active-this").removeClass("active-this"),D.addClass("active-this"))),"active-this"==H.parent("dd").attr("class")&&H.parents(".nav-child").slideDown("fast");else{var P=S.mapAll[Q].parentMenuId;if(0!=S.mapAll[P].parentMenuId){D=S.mapAll[P].parentMenuId;P=S.mapAll[D].menuId}X.updateChildMeun(P,Q)}X.removerShowList(),Z&&Z(B,C)})},EventHanlder:function(){var Z=this;Y(document).on("click",function(){Z.dom.meunSoroll.hasClass("showList")&&Z.removerShowList()}),Z.dom.meunSoroll.on("click","[data-type='hoot-click']",function(L){L.stopPropagation(),L.preventDefault();var X=L.target;switch(Y(this).attr("class")){case"product-all":Z.dom.meunSoroll.toggleClass("showList");break;case"pr-open":"layui-layer-setwin"==X.parentNode.className&&Z.removerShowList();var J=Z.meunTopObj();console.log(J);Y(X).parents(".pr-meungroup-list");var S=Y(X).parents(".s-item"),C=S.attr("menu-id"),Q=Y(".pr-meungroup-list").find(".list-item");for(var H in S.addClass("nav-item-active").siblings().removeClass("nav-item-active"),Q.each(function(){Y(this)[0].id==C?Y(this).addClass("select"):Y(this).removeClass("select")}),J)H==C&&Y(".pr-left").animate({scrollTop:J[H]});break;case"nav-last":layer.close(layer.load()),layer.load(0,{shade:!0});var T=Y(X).parents(".s-item").attr("menu-id");Z.updateChildMeun(T),Z.removerShowList(),layer.close(layer.load())}})},updateChildMeun:function(Z,L){var X=this,J=Z;Y("[menu-id="+J+"]").addClass("active").siblings().removeClass("active"),X.dom.bodyNav.empty();var S=X.meunPanelThis.getData;if(J){if(0!=S.mapAll[J].parentMenuId){var C=S.mapAll[J].parentMenuId;J=S.mapAll[C].menuId}var Q=S.parentData;Y(".nav-title").html(`<i class='${S.mapAll[J].imagePath}'></i>`+S.mapAll[J].name),Q[J]&&Q[J].forEach(function(Z){var J=Y("<li>",{class:"item h-link"}),S=Y("<a>",{href:Z.path||"javascript:;","menu-id":Z.menuId,leaf:Z.leaf,level:Z.level,id:Z.id,parentMenuId:Z.parentMenuId}).text(Z.name);if(L&&S.attr("menu-id")==L&&J.addClass("active-this"),J.append(S),!Z.leaf&&Q[Z.parentMenuId]&&Q[Z.parentMenuId].length>0){var C='<dl class="nav-child" >';Q[Z.menuId]&&Q[Z.menuId].forEach(function(Y){C+=`<dd class= ${L&&Y.menuId==L?"active-this":""} ><a href=${Y.path||"javascript:;"} leaf=${Y.leaf} \nmain-id=${Z.parentMenuId} parentMenuId=${Y.parentMenuId} menu-id=${Y.menuId} >${Y.name}</a></dd>`}),C+="</dl>",S.append('<i class="right-mover layui-icon layui-icon-right"></i>'),J.append(C),L&&J.find("dd").each(function(Z,L){if("active-this"==Y(L).attr("class"))return J.find(".nav-child").slideDown("fast")})}else;X.dom.bodyNav.append(J)})}},initPanel:function(Z){this.meunPanelThis=Z;var L=this.meunPanelThis.getData;return this.documentPanel=this.template(Z),this.documentPanel&&(this.dom={meunSoroll:this.documentPanel.find("#meunSoroll"),bodyNav:this.documentPanel.find(".body-nav"),meungroupList:this.documentPanel.find(".pr-meungroup-list"),prLeft:this.documentPanel.find(".pr-left"),$tabli:Y(".layui-tab-title li")}),this.setOpenAll(L),this.EventHanlder(),this.documentPanel}};this.getFun=X,1==arguments.length?(this.options=arguments[0],this.init(this.options)):2==arguments.length&&(this.ele=arguments[0],this.options=arguments[1],this.init(this.options),this.renderTo(this.ele))};S.prototype.config={isTrigger:!0,url:""},S.prototype.setMapData=function(Z){var L,X=null,S=null;layer.close(layer.load()),layer.load(0,{shade:!0});X={};return Y.ajax({type:"get",async:!1,url:Z,success:function(Y){Y.success&&((L=Y.data).forEach(function(Y){Y.PY_code=J.makePy(Y.name)[0]}),S=function(Y){layer.close(layer.load()),layer.load(0,{shade:!0});let Z={};return Y.forEach(function(Y){Z[Y.parentMenuId]||(Z[Y.parentMenuId]=[]),Z[Y.parentMenuId].push(Y)}),Z}(L),L.forEach(function(Y){X[Y.menuId]=Y}))},error:function(Y){console.log(Y),layer.msg("数据加载失败!")},dataType:"json"}),layer.close(layer.load()),{dataAll:L,mapAll:X,parentData:S}},S.prototype.init=function(Z){var L=this.getFun;return"object"==typeof this.options&&(this.opts=Y.extend(!0,this.config,this.options),""!=this.opts.url&&(this.getData=this.setMapData(this.opts.url),this.getElement=L.initPanel(this),"function"==typeof this.opts.menuClick?L.clickChild(this.opts.menuClick):L.clickChild())),this},S.prototype.renderTo=function(Z){var L=this.getFun.documentPanel;return Y("#"+Z).append(L),this.opts.isTrigger&&Y("#"+Z).find(".sidebar li:first-child a").trigger("click"),this},window.plgSidebar=S,Y.fn.initSidebar=function(Y){return new S(this,Y)}}(jQuery);
;(function ($) {


    var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
//此处收录了375个多音字
    var oMultiDiff = {
        "19969": "DZ",
        "19975": "WM",
        "19988": "QJ",
        "20048": "YL",
        "20056": "SC",
        "20060": "NM",
        "20094": "QG",
        "20127": "QJ",
        "20167": "QC",
        "20193": "YG",
        "20250": "KH",
        "20256": "ZC",
        "20282": "SC",
        "20285": "QJG",
        "20291": "TD",
        "20314": "YD",
        "20340": "NE",
        "20375": "TD",
        "20389": "YJ",
        "20391": "CZ",
        "20415": "PB",
        "20446": "YS",
        "20447": "SQ",
        "20504": "TC",
        "20608": "KG",
        "20854": "QJ",
        "20857": "ZC",
        "20911": "PF",
        "20504": "TC",
        "20608": "KG",
        "20854": "QJ",
        "20857": "ZC",
        "20911": "PF",
        "20985": "AW",
        "21032": "PB",
        "21048": "XQ",
        "21049": "SC",
        "21089": "YS",
        "21119": "JC",
        "21242": "SB",
        "21273": "SC",
        "21305": "YP",
        "21306": "QO",
        "21330": "ZC",
        "21333": "SDC",
        "21345": "QK",
        "21378": "CA",
        "21397": "SC",
        "21414": "XS",
        "21442": "SC",
        "21477": "JG",
        "21480": "TD",
        "21484": "ZS",
        "21494": "YX",
        "21505": "YX",
        "21512": "HG",
        "21523": "XH",
        "21537": "PB",
        "21542": "PF",
        "21549": "KH",
        "21571": "E",
        "21574": "DA",
        "21588": "TD",
        "21589": "O",
        "21618": "ZC",
        "21621": "KHA",
        "21632": "ZJ",
        "21654": "KG",
        "21679": "LKG",
        "21683": "KH",
        "21710": "A",
        "21719": "YH",
        "21734": "WOE",
        "21769": "A",
        "21780": "WN",
        "21804": "XH",
        "21834": "A",
        "21899": "ZD",
        "21903": "RN",
        "21908": "WO",
        "21939": "ZC",
        "21956": "SA",
        "21964": "YA",
        "21970": "TD",
        "22003": "A",
        "22031": "JG",
        "22040": "XS",
        "22060": "ZC",
        "22066": "ZC",
        "22079": "MH",
        "22129": "XJ",
        "22179": "XA",
        "22237": "NJ",
        "22244": "TD",
        "22280": "JQ",
        "22300": "YH",
        "22313": "XW",
        "22331": "YQ",
        "22343": "YJ",
        "22351": "PH",
        "22395": "DC",
        "22412": "TD",
        "22484": "PB",
        "22500": "PB",
        "22534": "ZD",
        "22549": "DH",
        "22561": "PB",
        "22612": "TD",
        "22771": "KQ",
        "22831": "HB",
        "22841": "JG",
        "22855": "QJ",
        "22865": "XQ",
        "23013": "ML",
        "23081": "WM",
        "23487": "SX",
        "23558": "QJ",
        "23561": "YW",
        "23586": "YW",
        "23614": "YW",
        "23615": "SN",
        "23631": "PB",
        "23646": "ZS",
        "23663": "ZT",
        "23673": "YG",
        "23762": "TD",
        "23769": "ZS",
        "23780": "QJ",
        "23884": "QK",
        "24055": "XH",
        "24113": "DC",
        "24162": "ZC",
        "24191": "GA",
        "24273": "QJ",
        "24324": "NL",
        "24377": "TD",
        "24378": "QJ",
        "24439": "PF",
        "24554": "ZS",
        "24683": "TD",
        "24694": "WE",
        "24733": "LK",
        "24925": "TN",
        "25094": "ZG",
        "25100": "XQ",
        "25103": "XH",
        "25153": "PB",
        "25170": "PB",
        "25179": "KG",
        "25203": "PB",
        "25240": "ZS",
        "25282": "FB",
        "25303": "NA",
        "25324": "KG",
        "25341": "ZY",
        "25373": "WZ",
        "25375": "XJ",
        "25384": "A",
        "25457": "A",
        "25528": "SD",
        "25530": "SC",
        "25552": "TD",
        "25774": "ZC",
        "25874": "ZC",
        "26044": "YW",
        "26080": "WM",
        "26292": "PB",
        "26333": "PB",
        "26355": "ZY",
        "26366": "CZ",
        "26397": "ZC",
        "26399": "QJ",
        "26415": "ZS",
        "26451": "SB",
        "26526": "ZC",
        "26552": "JG",
        "26561": "TD",
        "26588": "JG",
        "26597": "CZ",
        "26629": "ZS",
        "26638": "YL",
        "26646": "XQ",
        "26653": "KG",
        "26657": "XJ",
        "26727": "HG",
        "26894": "ZC",
        "26937": "ZS",
        "26946": "ZC",
        "26999": "KJ",
        "27099": "KJ",
        "27449": "YQ",
        "27481": "XS",
        "27542": "ZS",
        "27663": "ZS",
        "27748": "TS",
        "27784": "SC",
        "27788": "ZD",
        "27795": "TD",
        "27812": "O",
        "27850": "PB",
        "27852": "MB",
        "27895": "SL",
        "27898": "PL",
        "27973": "QJ",
        "27981": "KH",
        "27986": "HX",
        "27994": "XJ",
        "28044": "YC",
        "28065": "WG",
        "28177": "SM",
        "28267": "QJ",
        "28291": "KH",
        "28337": "ZQ",
        "28463": "TL",
        "28548": "DC",
        "28601": "TD",
        "28689": "PB",
        "28805": "JG",
        "28820": "QG",
        "28846": "PB",
        "28952": "TD",
        "28975": "ZC",
        "29100": "A",
        "29325": "QJ",
        "29575": "SL",
        "29602": "FB",
        "30010": "TD",
        "30044": "CX",
        "30058": "PF",
        "30091": "YSP",
        "30111": "YN",
        "30229": "XJ",
        "30427": "SC",
        "30465": "SX",
        "30631": "YQ",
        "30655": "QJ",
        "30684": "QJG",
        "30707": "SD",
        "30729": "XH",
        "30796": "LG",
        "30917": "PB",
        "31074": "NM",
        "31085": "JZ",
        "31109": "SC",
        "31181": "ZC",
        "31192": "MLB",
        "31293": "JQ",
        "31400": "YX",
        "31584": "YJ",
        "31896": "ZN",
        "31909": "ZY",
        "31995": "XJ",
        "32321": "PF",
        "32327": "ZY",
        "32418": "HG",
        "32420": "XQ",
        "32421": "HG",
        "32438": "LG",
        "32473": "GJ",
        "32488": "TD",
        "32521": "QJ",
        "32527": "PB",
        "32562": "ZSQ",
        "32564": "JZ",
        "32735": "ZD",
        "32793": "PB",
        "33071": "PF",
        "33098": "XL",
        "33100": "YA",
        "33152": "PB",
        "33261": "CX",
        "33324": "BP",
        "33333": "TD",
        "33406": "YA",
        "33426": "WM",
        "33432": "PB",
        "33445": "JG",
        "33486": "ZN",
        "33493": "TS",
        "33507": "QJ",
        "33540": "QJ",
        "33544": "ZC",
        "33564": "XQ",
        "33617": "YT",
        "33632": "QJ",
        "33636": "XH",
        "33637": "YX",
        "33694": "WG",
        "33705": "PF",
        "33728": "YW",
        "33882": "SR",
        "34067": "WM",
        "34074": "YW",
        "34121": "QJ",
        "34255": "ZC",
        "34259": "XL",
        "34425": "JH",
        "34430": "XH",
        "34485": "KH",
        "34503": "YS",
        "34532": "HG",
        "34552": "XS",
        "34558": "YE",
        "34593": "ZL",
        "34660": "YQ",
        "34892": "XH",
        "34928": "SC",
        "34999": "QJ",
        "35048": "PB",
        "35059": "SC",
        "35098": "ZC",
        "35203": "TQ",
        "35265": "JX",
        "35299": "JX",
        "35782": "SZ",
        "35828": "YS",
        "35830": "E",
        "35843": "TD",
        "35895": "YG",
        "35977": "MH",
        "36158": "JG",
        "36228": "QJ",
        "36426": "XQ",
        "36466": "DC",
        "36710": "JC",
        "36711": "ZYG",
        "36767": "PB",
        "36866": "SK",
        "36951": "YW",
        "37034": "YX",
        "37063": "XH",
        "37218": "ZC",
        "37325": "ZC",
        "38063": "PB",
        "38079": "TD",
        "38085": "QY",
        "38107": "DC",
        "38116": "TD",
        "38123": "YD",
        "38224": "HG",
        "38241": "XTC",
        "38271": "ZC",
        "38415": "YE",
        "38426": "KH",
        "38461": "YD",
        "38463": "AE",
        "38466": "PB",
        "38477": "XJ",
        "38518": "YT",
        "38551": "WK",
        "38585": "ZC",
        "38704": "XS",
        "38739": "LJ",
        "38761": "GJ",
        "38808": "SQ",
        "39048": "JG",
        "39049": "XJ",
        "39052": "HG",
        "39076": "CZ",
        "39271": "XT",
        "39534": "TD",
        "39552": "TD",
        "39584": "PB",
        "39647": "SB",
        "39730": "LG",
        "39748": "TPB",
        "40109": "ZQ",
        "40479": "ND",
        "40516": "HG",
        "40536": "HG",
        "40583": "QJ",
        "40765": "YQ",
        "40784": "QJ",
        "40840": "YK",
        "40863": "QJG"
    };
//参数,中文字符串
//返回值:拼音首字母串数组
    function makePy(str) {
        if (typeof(str) != "string")
            throw new Error(-1, "函数makePy需要字符串类型参数!");
        var arrResult = new Array(); //保存中间结果的数组
        for (var i = 0, len = str.length; i < len; i++) {
            //获得unicode码
            var ch = str.charAt(i);
            //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
            arrResult.push(checkCh(ch));
        }
        //处理arrResult,返回所有可能的拼音首字母串数组
        return mkRslt(arrResult);
    }

    function checkCh(ch) {
        var uni = ch.charCodeAt(0);
        //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
        if (uni > 40869 || uni < 19968)
            return ch; //dealWithOthers(ch);
        //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
        return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)));
    }

    function mkRslt(arr) {
        var arrRslt = [""];
        for (var i = 0, len = arr.length; i < len; i++) {
            var str = arr[i];
            var strlen = str.length;
            if (strlen == 1) {
                for (var k = 0; k < arrRslt.length; k++) {
                    arrRslt[k] += str;
                }
            } else {
                var tmpArr = arrRslt.slice(0);
                arrRslt = [];
                for (k = 0; k < strlen; k++) {
                    //复制一个相同的arrRslt
                    var tmp = tmpArr.slice(0);
                    //把当前字符str[k]添加到每个元素末尾
                    for (var j = 0; j < tmp.length; j++) {
                        tmp[j] += str.charAt(k);
                    }
                    //把复制并修改后的数组连接到arrRslt上
                    arrRslt = arrRslt.concat(tmp);
                }
            }
        }
        return arrRslt;
    }

//两端去空格函数
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }


    var pinyin = {};
    pinyin.makePy = makePy;


    var mainpanel;
    var opts;
    var element = layui.element
        , win = window
        , doc = document;


    var plgSidebar = function (ele, options) {
        var _this = this;
        var ClassMain = {
            dom: null,
            documentPanel: null,
            meunPanelThis: null,
            template: function (meunPanelThis) {

                var _getData = this.meunPanelThis.getData.parentData;
                var renderNav = this.mainNav(_getData);
                var tml =
                    $(`<div class="plg-sidebar">
    <div class="main-nav">
        <div id="meunSoroll" class="layui-side-scroll ">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <div class="pr-open" data-type="hoot-click">
                <div class="layui-layer-setwin">
                    <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
                </div>
                <div class="pr-search">
                       <span class="pr-icon-search-wrapper"><i class="layui-icon layui-icon-search
"></i></span>

                    <input type="text" id="selectInput" class="pr-search-input" placeholder="请输入关键词">

                    <div class="search-tip">
                        <p><span>以下是与“<strong></strong>”相关的产品：</span></p></div>

                </div>
                <div class="pr-left">
                    <div id="keyUpList" class="keyUpList"></div>
                    <div class="pr-meungroup-list">
                    </div>
                </div>
                <div class="pr-right">
                    <div class="scroll-nav">
                        <ul class="right-sidebar">

                        </ul>
                    </div>
                </div>
            </div>
            <div class="product-all" data-type="hoot-click">
                          <span class="icon-box">
                                 <i class="icon iconfont p-icon-all"></i>
                          </span>
                <span class="meun-name">
                             <a class="" href="javascript:;">所有服务</a>
                             <i class="right-mover layui-icon layui-icon-right
"></i>
                         </span>
            </div>
            <div class="nav-last" data-type="hoot-click">
                <ul id="sidebar" class="sidebar">
                    ${renderNav}
                </ul>
            </div>
        </div>
    </div>
    <div class="layui-body">
        <!-- 二级菜单 -->
        <div class="layui-side">
            <div class="layui-side-scroll">
                <div class="nav-title"></div>
                <ul class="body-nav" lay-filter="test">
                </ul>
            </div>
        </div>
    </div>
</div>
`);
                return tml
            },
            mainNav: function (parentData) {
                var _this = this;
                var ele = "";
                parentData[0].filter(function (item) {
                    if (item.parentMenuId === "0" && !item.leaf) {
                        // language=HTML
                        ele += `
                        <li class="s-item" id=${item.id} menu-id=${item.menuId}>
                               <span class="icon-box">
                                 <i class="${item.imagePath}"></i>
                             </span>
                              <span class="meun-name"><a href="javascript:;">${item.name}</a></span>
                         </li>                    
                            
                      `
                    }
                });
                return ele
            },
            resetOpenMenuList: function (ele, data) {
                var _this = this;
                var group = $(`<div class="pr-meun-group"></div><div class="pr-meun-group"></div><div class="pr-meun-group"></div>`);

                //插入右边的导航
                $(_this.documentPanel[0]).find(".right-sidebar").html("").append(_this.mainNav(data));
                data[0].forEach(function (item, inxex) {
                    var ele = `<div class="list-item" id=${item.menuId}><a menu-id=${item.menuId} parentmenuid=${item.parentMenuId} class="list-title">${item.name}</a>`;

                    data[item.menuId]&& data[item.menuId].forEach(function (citem) {

                        ele += `<div class="menu-text">
                                            <a href=${citem.path || "javascript:;"}
                                             menu-id=${citem.menuId}
                                             parentmenuid=${citem.parentMenuId}
                                             leaf=${citem.leaf}                                     
                                             >
                                             ${citem.name}
                                            </a>
                        </div>`;

                        if (data[citem.menuId]) {
                            data[citem.menuId].forEach(function (ditem) {
                                ele += `<div class="menu-text">
                                                 <a href=${ditem.path || "javascript:;"} 
                                                  menu-id=${ditem.menuId} 
                                                  parentmenuid=${ditem.parentMenuId}
                                                  leaf=${ditem.leaf}>
                                                    ${ditem.name}
                                                    </a>
                                                 </div>`
                            });

                        }
                    });
                    ele += `</div>`;
                    if (inxex % 3 === 0) {
                        group.eq(0).append(ele)
                    } else if (inxex % 3 === 1) {
                        group.eq(1).append(ele)
                    } else if (inxex % 3 === 2) {
                        group.eq(2).append(ele)
                    }
                });
                group.find(".menu-text>a[leaf='false']").hide();
                ele.append(group);

            },
            setOpenAll: function (getData) {
                var _this = this;
                var list = _this.dom.meungroupList, parentDatas = getData.parentData;
                var keyUpList = $(_this.documentPanel[0]).find("#keyUpList");
                _this.resetOpenMenuList(list, parentDatas);

                var regCH = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                $(_this.documentPanel[0]).find("#selectInput").keyup(function (e) {
                    var val = $(this).val();
                    val = val.toUpperCase();
                    if (!val) {
                        // list.html("");
                        $(this).next(".search-tip").hide();
                        list.show();
                        keyUpList.html("").hide();
                        return;  //输入框中没有内容，则退出
                    }
                    $(this).next(".search-tip").show().find("strong").text(val);
                    list.hide();
                    var ele = "";
                    for (var key in getData.mapAll) {
                        var item = getData.mapAll[key];
                        var str = regCH.test(val) ? item.name.indexOf(val) : item.PY_code.indexOf(val);
                        if (str >= 0 && item.leaf) {
                            ele += `<div class="pr-meun-group">
                                    <div class="list-item">
                                        <div class="menu-text">
                                            <a href=${item.path || "javascript:;"} >
                                             ${item.name}
                                            </a>
                                         </div>
                                         </div>
                                    </div>`;
                        }
                    }
                    list.hide();
                    keyUpList.html("").show().append(ele);

                })
            },

            //获取菜单top值
            meunTopObj: function (obj) {
                var _this = this;
                var list = _this.dom.meungroupList.find(".list-item");
                obj = {};
                list.each(function (index, item) {
                    var key = item.id;
                    obj[key] = parseInt(item.offsetTop);
                });
                return obj;
            },
            removerShowList: function () {
                var _this = this, list = _this.dom.meungroupList,
                    _getData = _this.meunPanelThis.getData,
                    parentDatas = _getData.parentData;
                _this.dom && this.dom.meunSoroll.removeClass("showList");

            },

            clickChild: function (callbakc) {
                var _this = this;
                var othis;
                var bodyNav = _this.dom.bodyNav//ul

                var _getData = _this.meunPanelThis.getData;

                //点击二级菜单列表
                _this.dom.bodyNav.on("click", "a", function (e) {
                    e.stopPropagation();//阻止事件冒泡
                    e.preventDefault();
                    othis = $(this)//a

                    var mid = othis.attr("menu-id");
                    _this.dom.meungroupList.find("a[menu-id='" + mid + "']").trigger("click");

                });

                //点击展开所以菜单列表
                _this.dom.prLeft.on("click", ".menu-text > a", function (e) {
                    e.stopPropagation();//阻止事件冒泡
                    e.preventDefault();
                    othis = $(this);

                    var mid = $(this).attr("menu-id");
                    var $this = bodyNav.find("a[menu-id='" + mid + "']"),
                        parents = $this.parents(".body-nav")
                        , parent = $this.parent()//li
                        , child = $this.siblings('.nav-child');


                    var href = othis.attr("href");
                    var callbakcData = {
                      /*  event: e,
                        $this: othis,
                        menuId: mid,
                        requestData: _getData,*/
                        getCurrent:_getData.mapAll[mid]


                    };
                    //如果当前有菜单
                    if ($this.length > 0) {
                        if (!(othis.attr('href') !== 'javascript:;' && othis.attr('target') === '_blank')) {
                            if (!child[0]) {
                                parents.find('.active-this').removeClass("active-this");
                                parent.addClass("active-this");
                            } else {
                                //如果有子菜单，则展开

                                if (child[0]) {

                                    parent.toggleClass("itemeds").siblings().removeClass("itemeds");

                                    child.slideToggle("fast");
                                    othis.parent().siblings().children('.nav-child').slideUp();


                                } else {
                                    if ($this.parents(".nav-child")) {
                                        $this.parents(".item").addClass("itemeds").siblings().removeClass("itemeds")
                                        child.slideToggle("fast");
                                        othis.parent().siblings().children('.nav-child').slideUp();
                                    }
                                }

                            }
                        }
                        if ($this.parent("dd").attr("class") == "active-this") {
                            $this.parents(".nav-child").slideDown("fast");
                        }
                    } else {

                        var pid = _getData.mapAll[mid].parentMenuId;
                        //如果父级的pid不是0，就要继续向上找
                        if (_getData.mapAll[pid].parentMenuId != 0) {
                            var parent = _getData.mapAll[pid].parentMenuId;
                            pid = _getData.mapAll[parent].menuId

                        }
                        _this.updateChildMeun(pid, mid);
                    }
                    _this.removerShowList();
                    callbakc && callbakc(callbakcData,e);

                });


            },
            EventHanlder: function () {
                var _this = this;
                $(document).on("click", function () {
                    _this.dom.meunSoroll.hasClass("showList") && _this.removerShowList();
                });
                _this.dom.meunSoroll.on("click", "[data-type='hoot-click']", function (e) {
                    e.stopPropagation();//阻止事件冒泡
                    e.preventDefault();
                    var eve = e.target;
                    switch ($(this).attr("class")) {
                        case "product-all":
                            _this.dom.meunSoroll.toggleClass("showList");
                            break;
                        case "pr-open":
                            eve.parentNode.className == "layui-layer-setwin" && _this.removerShowList();
                            var meunTop = _this.meunTopObj();
                            console.log(meunTop);
                            var listNav = $(eve).parents(".pr-meungroup-list");
                            var sItem = $(eve).parents(".s-item");
                            var thisHref = sItem.attr("menu-id")
                                , list = $(".pr-meungroup-list").find(".list-item");
                            sItem.addClass("nav-item-active")
                                .siblings()
                                .removeClass("nav-item-active");
                            list.each(function () {
                                $(this)[0].id == thisHref ? $(this).addClass("select") : $(this).removeClass("select");

                            });
                            for (var key in meunTop) {
                                if ((key) == thisHref) {
                                    $(".pr-left").animate({scrollTop: meunTop[key]});
                                }
                            }
                            break;

                        case "nav-last":
                            layer.close(layer.load());
                            layer.load(0, {shade: true});
                            //点一级菜单加载二级菜单
                            var parents = $(eve).parents(".s-item")
                                , menuid = parents.attr("menu-id");
                            _this.updateChildMeun(menuid);

                            _this.removerShowList();
                            layer.close(layer.load());

                            break;
                    }
                });
                var tabArray = [];

            },
            updateChildMeun: function (pid, mid) {
                var _this = this;

                var menuid = pid,
                    html = [];
                var par = $("[menu-id=" + menuid + "]");

                par.addClass("active").siblings().removeClass("active");
                _this.dom.bodyNav.empty();
                var _getData = _this.meunPanelThis.getData;

                if (menuid) {
                    if (_getData.mapAll[menuid].parentMenuId != 0) {
                        var parent = _getData.mapAll[menuid].parentMenuId;
                        menuid = _getData.mapAll[parent].menuId
                    }
                    ;
                    var parentData = _getData.parentData;
                    //$(".nav-title").text(_getData.mapAll[menuid].name);
                    $(".nav-title").html(`<i class='${_getData.mapAll[menuid].imagePath}'></i>` + _getData.mapAll[menuid].name);

                    parentData[menuid]&&parentData[menuid].forEach(function (item) {

                        var oli = $("<li>", {"class": "item h-link"});

                        var oa = $("<a>", {
                             "href": item.path || "javascript:;",
                          //  "href":"#"+item.menuId || "javascript:;",
                            "menu-id": item.menuId,
                            "leaf": item.leaf,
                            "level": item.level,
                            "id": item.id,
                            "parentMenuId": item.parentMenuId,
                        }).text(item.name);
                        if (mid) {
                            if (oa.attr("menu-id") == mid) oli.addClass("active-this")
                        }
                        oli.append(oa);
                        if (!(!item.leaf && parentData[item.parentMenuId] && parentData[item.parentMenuId].length > 0)) {
                        } else {
                            var navchild = '<dl class="nav-child" >';
                            parentData[item.menuId] && parentData[item.menuId].forEach(function (citem) {
                                navchild += `<dd class= ${(mid && citem.menuId == mid) ? "active-this" : ""} ><a href=${citem.path || "javascript:;"} leaf=${citem.leaf} 
main-id=${item.parentMenuId} parentMenuId=${citem.parentMenuId} menu-id=${citem.menuId} >${citem.name}</a></dd>`;
                            });
                            navchild += "</dl>";
                            oa.append(`<i class="right-mover layui-icon layui-icon-right"></i>`);
                            oli.append(navchild);
                            if (mid) {
                                oli.find("dd").each(function (index, item) {
                                    if ($(item).attr("class") == "active-this") {
                                        return oli.find(".nav-child").slideDown("fast");
                                    }
                                });
                            }
                        }
                        _this.dom.bodyNav.append(oli);

                    })
                }
                ;
            },
            initPanel: function (meunPanelThis) {
                var _this = this;
                _this.meunPanelThis = meunPanelThis;
                var _getData = _this.meunPanelThis.getData;

                _this.documentPanel = _this.template(meunPanelThis);
                if (_this.documentPanel)
                    _this.dom = {
                        meunSoroll: _this.documentPanel.find("#meunSoroll"),
                        bodyNav: _this.documentPanel.find(".body-nav"),
                        meungroupList: _this.documentPanel.find(".pr-meungroup-list"),
                        prLeft: _this.documentPanel.find(".pr-left"),
                        $tabli: $(".layui-tab-title li"),
                    };
                _this.setOpenAll(_getData);
                //事件注册
                _this.EventHanlder();
                return _this.documentPanel
            }

        };
        var getFun = function () {
            return ClassMain;
        };
        _this.getFun = getFun();
        //获取数据入口
        if (arguments.length == 1) {
            _this.options = arguments[0];
            _this.init(_this.options);

        } else if (arguments.length == 2) {
            _this.ele = arguments[0];
            _this.options = arguments[1];
            _this.init(_this.options);

            _this.renderTo(_this.ele);
        }

    };


    plgSidebar.prototype.config = {
        isTrigger: true,
        url: ""
    };

    plgSidebar.prototype.setMapData = function (url) {
        var dataAll, mapAll = null, parentData = null;
        layer.close(layer.load());
        layer.load(0, {shade: true});

        function mapdata(dataAll) {
            layer.close(layer.load());
            layer.load(0, {shade: true});
            let map = {};
            dataAll.forEach(function (item) {
                var parent = "";
                if (!map[item.parentMenuId]) {
                    map[item.parentMenuId] = [];
                }
                map[item.parentMenuId].push(item)

            });
            return map
        }

        var mapAll = {};
        $.ajax({
            type: 'get',
            async: false,
            url: url,
            success: function (res) {
                if (res.success) {
                    dataAll = res.data;
                    dataAll.forEach(function (item) {
                        item.PY_code = pinyin.makePy(item.name)[0]
                    });
                    parentData = mapdata(dataAll);

                    dataAll.forEach(function (item) {
                        mapAll[item.menuId] = item;
                    });

                }
            },
            error: function (err) {
                console.log(err)
                layer.msg("数据加载失败!");
            },
            dataType: 'json'
        });
        layer.close(layer.load());

        return {
            dataAll: dataAll,
            mapAll: mapAll,
            parentData: parentData
        }

    };


    plgSidebar.prototype.init = function (options) {
        var _this = this;
        var _class = this.getFun;


        if (typeof _this.options === "object") {
            _this.opts = $.extend(true, _this.config, _this.options);
            if (_this.opts.url != "") {

                _this.getData = _this.setMapData(_this.opts.url);
                _this.getElement = _class.initPanel(_this);

                if (typeof _this.opts.menuClick === 'function') {

                    _class.clickChild(_this.opts.menuClick)

                } else {
                    _class.clickChild();
                }


            }

        }


        return this


    };
    //熏染模板到节点
    plgSidebar.prototype.renderTo = function (domId) {
        var documentPanel = this.getFun.documentPanel;
        $("#"+domId).append(documentPanel);
        if (this.opts.isTrigger) {
            $("#"+domId).find(".sidebar li:first-child a").trigger("click");

        }
        return this;

    };


    window.plgSidebar =  plgSidebar;
  

    $.fn.initSidebar = function (options) {
        return new plgSidebar(this, options);

    };


})(jQuery);
!function(e){e.fn.initPlgProgress=function(n){var t=new r(n);e(this).attr("id");return t.renderTo(),t};var r=function(r){var n,t="",s="mdoc"+Prolog.createRandomId(),i={showPercent:!1,percent:"",thickness:"",startBgColor:"",endBgColor:"#1E9FFF",time:4};r&&r.renderer&&(!function(e){e.showPercent&&(t+=`<div class="layui-progress ${e.thickness||""}" lay-showPercent="true" id="${s}"}>\n                <div class="layui-progress-bar" lay-percent="${e.percent}" data-percent = " ${e.percent} ">\n                    <span class="layui-progress-text">${e.percent}</span>\n                </div>\n            </div>`);e.showPercent||(t+=`<div class="layui-progress ${e.thickness||""}" id="${s}">\n                    <div class="layui-progress-bar" lay-percent="${e.percent}" data-percent =" ${e.percent} "></div>\n                </div>`);(n=document.createElement("div")).innerHTML=t}({showPercent:(i=e.extend({},i,r)).showPercent,percent:100*i.percent+"%",thickness:i.thickness}),this.on=function(n,t){"click"==n&&e("#"+r.renderer).on("click",".layui-progress-bar",function(){t&&t()})},this.renderTo=function(r){e("#"+r).append(n).on("load",function(){if(i.startBgColor){var r=document.createElement("style");r.innerHTML=".layui-progress .layui-progress-bar { background-color: "+i.startBgColor+"; }",e("head").append(r)}var n=e(this).width(),t=n*i.percent,s=e(this).find(".layui-progress-bar").eq(0);if(!(t>n)){var o=0,a=n/100,c=setInterval(function(){o+=a,s.find(".layui-progress-text").eq(0).html(parseInt(o/n*100)+"%"),t<=o&&clearInterval(c),s.width(o)},1e3*i.time);s.animate({backgroundColor:i.endBgColor},1e3*i.time)}}).trigger("load")},i.renderer&&this.renderTo(i.renderer))};window.PlgProgress=r}(jQuery);
;(function($){
    
    $.fn.initPlgProgress = function(options){
		var pg = new plgProgress(options);
        var id = $(this).attr("id");
        pg.renderTo();
		return pg;
	}

    var plgProgress = function(options){
        var template = '';   // 被渲染的模版
        var mdoc;   // template element对象
        var mdocId = 'mdoc' + Prolog.createRandomId(); // 上传图片预览图的box的id

        var config = {
            showPercent: false,
            percent: '',
            thickness: '',
            startBgColor: '',  // 设置背景颜色
            endBgColor: '#1E9FFF',  // 设置背景颜色
            time: 4  // 设置速度
        }

        if(!options || !options.renderer) return;

        config =  $.extend({}, config, options); //合并成新对象，则是新的属性列表
        
        var temObj = {
            showPercent: config.showPercent,
            percent: config.percent * 100 + '%',
            thickness: config.thickness
        }
        _generateTemplate(temObj);
        
        function _generateTemplate(obj){
            // <div class="layui-progress layui-progress-big" lay-showPercent="true">
            //   <div class="layui-progress-bar layui-bg-blue" lay-percent="80%">
            //      <span class="layui-progress-text">80%</span>
            //   </div>
            // </div>

            if(obj.showPercent){
                template += `<div class="layui-progress ${ obj.thickness || '' }" lay-showPercent="true" id="${ mdocId }"}>
                <div class="layui-progress-bar" lay-percent="${ obj.percent }" data-percent = " ${ obj.percent } ">
                    <span class="layui-progress-text">${ obj.percent }</span>
                </div>
            </div>`; 
            }

            if(!obj.showPercent){
                template += `<div class="layui-progress ${ obj.thickness || '' }" id="${ mdocId }">
                    <div class="layui-progress-bar" lay-percent="${ obj.percent }" data-percent =" ${ obj.percent } "></div>
                </div>`; 
            }

            mdoc = document.createElement("div");
            mdoc.innerHTML = template;
        }

        // 当前只支持点击事件
        this.on = function(eventname, callback){

            if(eventname == 'click'){
                $('#' + options.renderer).on('click', '.layui-progress-bar', function(){
                    callback && callback();
                })
            }
        }

        this.renderTo = function(id){
            $('#' + id).append(mdoc).on('load', function(){
                // console.log('config.startBgColor::' + config.startBgColor);
                // 设置默认颜色
                if(config.startBgColor){
                    var style = document.createElement('style');
                    // console.log('config.startBgColor::' + config.startBgColor);
                    style.innerHTML = ".layui-progress .layui-progress-bar { background-color: " + config.startBgColor + "; }";
                    $('head').append(style);
                }

                var totalW = $(this).width();
                var targetW = totalW * config.percent;
                
                var barW = $(this).find('.layui-progress-bar').eq(0);

                if (targetW > totalW) { return; }
                var temW = 0;
                var step = totalW / 100;

                var autoProgress = setInterval(function(){
                    temW += step;
                    
                    barW.find('.layui-progress-text').eq(0).html( parseInt((temW / totalW)*100) + '%');
                    if(targetW <= temW ){
                        clearInterval(autoProgress);
                    }
                    barW.width(temW);
                }, config.time * 1000);
                // console.log('time::' + config.time * 1000);
                barW.animate({
                    backgroundColor: config.endBgColor
                }, config.time * 1000);

            }).trigger('load');;
            
        }
        
        if(config.renderer){
            this.renderTo(config.renderer);
        }

    }

    window.PlgProgress = plgProgress;

}(jQuery));

!function(t,e){e.use(["element"],function(){e.element;var n=function(e){var n,l={renderer:null,filter:"plgTabs-"+Prolog.createRandomId(),indexActive:0,skin:"brief",allowClose:!1,content:[{title:null,template:null,id:"lay-"+Prolog.createRandomId(),url:null}]};"object"==typeof(n=arguments[0])&&(n.content.length>0&&n.content.forEach(function(t,e){t.url&&(t.template=i(t.url))}),this.opts=t.extend(!0,l,n),this.getElement=function(e){var n=function(t){if(t){var n="",i="";return t.forEach(function(t,l){n+=`<li lay-id = ${t.layId?`${t.layId}`:"lay-"+Prolog.createRandomId()} class="${e.indexActive===l?"layui-this":""}" >${t.title}</li>`,i+=`<div class="layui-tab-item ${e.indexActive===l?"layui-show":""}">${t.template}</div>`}),{title:n,content:i}}return""};n=n(e.content);var i=`\n                <div class="${{normal:"layui-tab",brief:"layui-tab layui-tab-brief",card:"layui-tab layui-tab-card",plgtabs:"layui-tab layui-tab-brief plgtabs "}[e.skin]}" ${e.allowClose?'lay-allowClose="true"':""} ${e.filter?'lay-filter="'+e.filter+'"':""} >\n                    <ul class="layui-tab-title">${n&&n.title}</ul>\n                    <div class="layui-tab-content">${n&&n.content}</div>\n                </div>`;return t(i)}(this.opts)),this.opts.renderer&&this.renderTo(this.opts.renderer)};function i(e){var n="",i=layer.msg("数据加载中...",{icon:16,shade:.01,time:0});return t.ajax({type:"get",url:e,dataType:"html",async:!1,success:function(t){n=t,layer.close(i)},error:function(t,e,n){layer.close(i),layer.msg(e)}}),n}n.prototype.setContent=function(t){},n.prototype.renderTo=function(e){return t("#"+e).append(this.getElement),this.element.render("tab",this.opts.filter),this},n.prototype.addTabs=function(e,n){var l=n||!0,a={title:"新标题",content:"",id:"lay-"+Prolog.createRandomId()},r=t.extend(!0,a,e);r.url&&(r.content=i(r.url)),this.element.tabAdd(this.opts.filter,r),l&&this.changeTabs(r.id)},n.prototype.changeTabs=function(t){return this.element.tabChange(this.opts.filter,t),this},n.prototype.deleteTabs=function(t){return this.element.tabDelete(this.opts.filter,t),this},n.prototype.element=e.element,n.prototype.on=function(t){return"function"==typeof t&&this.element.on("tab("+this.opts.filter+")",t),this},window.PlgTabs=n,t.fn.initPlgTabs=function(e){var i=t(this).attr("id");return new n(e).renderTo(i)}})}(jQuery,layui);
;(function ($, layui) {

    //PlgTabs.js
    layui.use(["element"], function () {
        var element=layui.element;
        var template = function (opts) {

            var skinArr={normal:"layui-tab",brief:"layui-tab layui-tab-brief",card:"layui-tab layui-tab-card",plgtabs:"layui-tab layui-tab-brief plgtabs "};
            var itemlist= function (content) {
                if(content){
                    var rp="";
                    var ra="";
                    content.forEach(function (item,inxex)
                    {
                        rp+=`<li lay-id = ${item.layId?`${item.layId}`:"lay-"+ Prolog.createRandomId()} class="${opts.indexActive===inxex ?"layui-this":""}" >${item.title}</li>`;

                        ra+=`<div class="layui-tab-item ${opts.indexActive===inxex ?"layui-show":""}">${item.template}</div>`
                    });
                    return {
                        title:rp,
                        content:ra
                    }
                }else {
                    return ""
                }
            };
            itemlist= itemlist(opts.content);
            var tp=`
                <div class="${skinArr[opts.skin]}" ${opts.allowClose?`lay-allowClose="true"`:""} ${opts.filter?`lay-filter="`+opts.filter+`"`:""} >
                    <ul class="layui-tab-title">${ itemlist && itemlist.title}</ul>
                    <div class="layui-tab-content">${itemlist&&itemlist.content}</div>
                </div>`;
            return $(tp)
        };

        
        var plgTabs = function (options) {
            var _this = this;
            var config={
                renderer:null,
                filter:"plgTabs-"+Prolog.createRandomId(),//选择器
                indexActive:0,
                skin:"brief",
                allowClose:false, //是否带删除
                content:[{
                    title:null,
                    template:null,
                    id:"lay-"+ Prolog.createRandomId(),
                    url:null          
                }],
            };

            var ele,opt;
            //获取数据入口
              opt = arguments[0];
                if(typeof opt ==="object"){
                    if(opt.content.length>0){
                        opt.content.forEach(function(item,index){
                            if(item.url){
                                item.template=getData(item.url)
                            }
                        })
                    }
                    _this.opts = $.extend(true,config, opt);
                    
                    
                    _this.getElement = template(_this.opts);
                }
            _this.opts.renderer && _this.renderTo(this.opts.renderer);
        };

        plgTabs.prototype.setContent=function(url){



        },

        plgTabs.prototype.renderTo=function (ele) {
            $("#"+ele).append(this.getElement);
            this.element.render("tab",this.opts.filter);
            return this
        };

        function getData(url){


                var tpl=""
                var loading = layer.msg('数据加载中...', {icon: 16,shade: 0.01,time:0});
                $.ajax({
                    type: "get",
                    url: url,
                    dataType: "html",
                    async :false,
                    success: function (response) {
                        tpl = response
                        layer.close(loading);
        
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        layer.close(loading);
                        layer.msg(textStatus);
                    }
                    
                });       
              return   tpl    
            };

        


        //动态添加tabss
        plgTabs.prototype.addTabs=function(obj,boole){
            var _this=this;
            var isChange=boole || true;

            

            var define={
                title:"新标题",
                content:"",
                id:"lay-"+ Prolog.createRandomId()
            }

               var opts=$.extend(true,define,obj);
                if(opts.url){                   
                    opts.content=getData(opts.url);
                   
                }
                _this.element.tabAdd( _this.opts.filter ,opts);
                isChange && _this.changeTabs(opts.id);
             
           
        };

          //切换到指定tabss
          plgTabs.prototype.changeTabs=function(id){
            this.element.tabChange(this.opts.filter, id);
            return this
        };

          //删除指定tabss
          plgTabs.prototype.deleteTabs=function(layid){
            this.element.tabDelete(this.opts.filter ,layid); //删除：
            return this
        };



        plgTabs.prototype.element=layui.element;

        plgTabs.prototype.on=function (callback) {
            if(typeof callback==="function"){
                  this.element.on("tab("+this.opts.filter+")",callback);
            }
            return this
        };

       

        window.PlgTabs = plgTabs;

        $.fn.initPlgTabs = function (options) {

            var id = $(this).attr("id");
            return new plgTabs(options).renderTo(id); 

        };

    });


})(jQuery, layui);
!function(e){var t=e.fn.zTree,n=function(t,n){var i,o,r,s;1===arguments.length?"object"==typeof(i=arguments[0])&&(this.opts=e.extend(!0,{url:"",renderer:null,onClick:function(){}},i),r=this.opts,(s={}).setting={view:{selectedMulti:!1},data:{key:{title:"name"},simpleData:{enable:!0,idKey:"menuId",pIdKey:"parentMenuId",rootPId:"0",id:"id"}},callback:{onClick:function(e,t,n){r.onClick&&r.onClick(e,t,n)},onExpand:function(e,t,n){if(!n.parentTId){var i=this.getZTreeObj(t),o=i.getNodes();for(var r in o){var s=o[r];console.log("getPreNode :",s.getPreNode),s.id!=n.id?i.expandNode(s,!1,!1,!1):i.expandNode(s,!0)}}}}},e.ajax({url:r.url,type:"get",async:!1,success:function(e){e.success?s.getDate=e.data:layer.msg("数据加载失败!")}}),o=s):2===arguments.length&&(t=arguments[0],i=arguments[1]),this.opts=e.extend(!0,this.opts,o),this.opts.renderer&&this.renderTo(this.opts.renderer)};for(var i in t)n.prototype[i]=t[i];n.prototype.renderTo=function(t){return e("#"+t).addClass("ztree"),this.treeObj=this.init(e("#"+t),this.opts.setting,this.opts.getDate),this.treeObj.expandNode(this.treeObj.getNodes()[0],!0),this},window.plgZtree=function(e){return new n(e)}}(jQuery);
; (function ($) {

    //PlgZtree.js


    var tree=$.fn.zTree;
    

    var getData = function (opts) {
        var zTreeObj;
        var obj = {};

        //配置tree
        obj.setting = {
            view: {
                selectedMulti: false
            },
            data: {
                key: {
                    title: "name"
                },
                simpleData: {
                    enable: true,
                    idKey: "menuId",
                    pIdKey: "parentMenuId",
                    rootPId: "0",
                    id: 'id',
                }
            },
             callback: {
                 onClick:function (event, treeId, treeNode){
                     
                
                    opts.onClick && opts.onClick(event, treeId, treeNode)
                                    
             },
             onExpand:function (event, treeId, treeNode){
                //如果是一级父菜单
                if(!treeNode.parentTId){
                    var obj =  this.getZTreeObj(treeId);
                    var NOdes=obj.getNodes();
                    for(var key in NOdes){
                        var td=NOdes[key] 
                        
                            console.log('getPreNode :',td.getPreNode);
                            if(td.id!=treeNode.id){
                                obj.expandNode(td,false,false,false);
                    
                            }else{
                                obj.expandNode(td,true)
                            }
                    }
                }
            }
                 
             
             
             
             }
            
        };
        $.ajax({
            url: opts.url,
            type: 'get',
            async: false,
            success: function (res) {
                if (res.success) {
                    obj.getDate = res.data;                  
                } else {
                    layer.msg("数据加载失败!");
                }

            }
        });

        return obj
    }
        
    var plgZtree = function (ele, options) {
        var _this = this;
        var config = {
                url:"",
                renderer:null,
                onClick:function(){ }
        };
        var ele, opt,object;
        //获取数据入口
        if (arguments.length === 1) {
            opt = arguments[0];
            if (typeof opt === "object") {
                _this.opts = $.extend(true, config, opt,);
                object=getData(_this.opts);
                             
            }
        } else if (arguments.length === 2) {
            ele = arguments[0];
            opt = arguments[1];
          
        }   
             _this.opts = $.extend(true, _this.opts, object,); 
            _this.opts.renderer && _this.renderTo(this.opts.renderer);
            
    };

     //克隆tree 的方法
     for(var key in tree){
        plgZtree.prototype[key]=tree[key];
    }
  
    plgZtree.prototype.renderTo = function (ele) {
        var _this=this;
        $("#"+ele).addClass("ztree");
        this.treeObj=this.init($("#"+ele),this.opts.setting , this.opts.getDate);
        this.treeObj.expandNode(this.treeObj.getNodes()[0],true);
        return  this
    };

    window.plgZtree = function (options) {
        return new plgZtree(options)

    };


})(jQuery);
!function(n){n.fn.initPlgUpload=function(t){var i=new e(t),l=n(this).attr("id");return i.renderTo(l),i};var e=function(e){var t={accept:"images",acceptMime:"image/*",exts:"jpg|png|gif|bmp|jpeg",auto:!0,field:"file",size:1e4,multiple:!1,number:3,drag:!1,choose:null,before:null,done:null,error:null};if(e&&e.renderer){var i,l="btn"+Prolog.createRandomId(),o="containe"+Prolog.createRandomId(),a="error"+Prolog.createRandomId(),d="listAction"+Prolog.createRandomId(),u="upload"+Prolog.createRandomId(),r=e.type,s={},c="",p=layui.upload;s.single=`\n            <div class="layui-upload">\n                <button type="button" class="layui-btn" id="${l}">上传图片</button>\n            \n                <div class="layui-upload-list">\n                    <img class="layui-upload-img" id="${o}">\n                    <p id="${a}"></p>\n                </div>\n            </div>\n        `,s.multiple=`\n            <div class="layui-upload">\n                <button type="button" class="layui-btn" id="${l}">多图片上传</button>\n                <div class="layui-upload-list" id="${o}"></div>\n            </div>\n        `,s.multipleTable=`\n            <div class="layui-upload">\n                <button type="button" class="layui-btn layui-btn-normal" id="${l}">选择多文件</button>\n                <div class="layui-upload-list">\n                    <table class="layui-table">\n                        <thead>\n                            <th>文件名</th>\n                            <th>大小</th>\n                            <th>状态</th>\n                            <th>操作</th>\n                        </thead>\n                        <tbody id="${o}"></tbody>\n                    </table>\n                </div>\n                <button type="button" class="layui-btn" id="${d}">开始上传</button>\n            </div>\n        `,s.multimedia=`\n            <button type="button" class="layui-btn" id="${l}"><i class="layui-icon">&#xe67c;</i>${e.testdes}</button>\n        `,s.manualOperation=`\n            <div class="layui-upload">\n                <button type="button" class="layui-btn layui-btn-normal" id="${l}">选择文件</button>\n                <button type="button" class="layui-btn" id="${u}">开始上传</button>\n            </div>\n        `,s.drag=`\n            <div class="layui-upload-drag" id="${l}">\n                <i class="layui-icon">&#xe67c;</i>\n                <p>点击上传</p>\n            </div>\n        `,s.origin=`\n            绑定原始文件域：<input type="file" name="file" id="${l}">\n        `,t=n.extend({},t,e.uploadParams),c+=s[r],(i=document.createElement("div")).innerHTML=c,this.renderTo=function(e){n("#"+e).append(i)},e.renderer&&(this.renderTo(e.renderer),function(){t.elem="#"+l,"manualOperation"===r&&(t.bindAction="#"+u),"multipleTable"===r&&(t.bindAction="#"+d),t.choose=e.chooseFn?function(t){if("single"!==r&&"multiple"!==r||t.preview(function(n,e,t){}),"multipleTable"===r){var l=this.files=t.pushFile();t.preview(function(e,a,d){var u=n(['<tr id="upload-'+e+'">',"<td>"+a.name+"</td>","<td>"+(a.size/1014).toFixed(1)+"kb</td>","<td>等待上传</td>","<td>",'<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>','<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>',"</td>","</tr>"].join(""));u.find(".demo-reload").on("click",function(){t.upload(e,a)}),u.find(".demo-delete").on("click",function(){delete l[e],u.remove(),i.config.elem.next()[0].value=""}),n("#"+o).append(u)})}"manualOperation"===r&&t.preview(function(n,e){t.resetFile(n,e,"123.jpg")}),e.chooseFn(t)}:"",t.before=e.beforeFn?function(t){console.log("type::"+r),"single"===r&&t.preview(function(e,t,i){n("#"+o).attr("src",i)}),"multiple"===r&&t.preview(function(e,t,i){n("#"+o).append('<img src="'+i+'" alt="'+t.name+'" class="layui-upload-img">')}),e.beforeFn(t)}:"",t.done=e.doneFn?function(t,i,l){if("multipleTable"===r){if(0==t.code){var a=n("#"+o).find("tr#upload-"+i),d=a.children();return d.eq(2).html('<span style="color: #5FB878;">上传成功</span>'),d.eq(3).html(""),void delete this.files[i]}this.error(i,l)}if(t.code>0)return layer.msg("上传失败");e.doneFn(t)}:"",t.error=e.errorFn?function(t,l){if("single"===r){var d=n("#"+a);d.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>'),d.find(".demo-reload").on("click",function(){i.upload()})}if("multipleTable"===r){var u=n("#"+o).find("tr#upload-"+t),s=u.children();s.eq(2).html('<span style="color: #FF5722;">上传失败</span>'),s.eq(3).find(".demo-reload").removeClass("layui-hide")}e.errorFn(t,l)}:"",t.multiple&&(t.allDone=function(n){console.log(n),e.doneFn(n)});var i=p.render(t)}())}};window.PlgUpload=e}(jQuery);
;
(function ($) {

    $.fn.initPlgUpload = function (options) {
        var pg = new plgUpload(options);
        var id = $(this).attr("id");
        pg.renderTo(id);
        return pg;
    }

    var plgUpload = function (options) {
        var config = {
            accept: 'images', //指定允许上传时校验的文件类型，可选值有：images（图片）、file（所有文件）、video（视频）、audio（音频）
            // 规定打开文件选择框时，筛选出的文件类型，值为用逗号隔开的 MIME 类型列表。如： 
            // acceptMime: 'image/*'（只显示图片文件）
            // acceptMime: 'image/jpg, image/png'（只显示 jpg 和 png 文件）  
            acceptMime: 'image/*',
            // 允许上传的文件后缀。一般结合 accept 参数类设定。
            exts: 'jpg|png|gif|bmp|jpeg',
            auto: true, // 选定文件后自动上传,如果设定 false，那么需要设置 bindAction 参数来指向一个其它按钮提交上传
            field: 'file', // 设定文件域的字段名
            size: 10000, // 单位是kb,
            multiple: false, // 是否支持多文件上传
            number: 3, // 设置同时可上传的文件数量，一般配合 multiple 参数出现。
            drag: false, // 是否接受拖拽的文件上传，设置 false 可禁用。不支持ie8/9
            choose: null,
            before: null,
            done: null,
            error: null
        }

        if (!options || !options.renderer) return;

        var
            btnId = 'btn' + Prolog.createRandomId(), // 上传按钮
            containerId = 'containe' + Prolog.createRandomId(), // 上传图片预览图的box的id
            errorId = 'error' + Prolog.createRandomId(), // 上传图片提示报错的box
            listAction = 'listAction' + Prolog.createRandomId(), // 上传图片提示报错的box
            uploadId = 'upload' + Prolog.createRandomId(), // 手动上传图片的按钮
            type = options.type,
            templateMap = {}, // 当前模版map
            template = '',   // 模版
            mdoc,            // element Object
            upload = layui.upload;
        // console.log('>>>>>>>>>');
        // 'single', 'multiple', multipleTable', 'multimedia', 'manualOperation', 'drag', 'origin'
        templateMap.single = `
            <div class="layui-upload">
                <button type="button" class="layui-btn" id="${ btnId }">上传图片</button>
            
                <div class="layui-upload-list">
                    <img class="layui-upload-img" id="${ containerId }">
                    <p id="${ errorId }"></p>
                </div>
            </div>
        `;

        templateMap.multiple = `
            <div class="layui-upload">
                <button type="button" class="layui-btn" id="${ btnId }">多图片上传</button>
                <div class="layui-upload-list" id="${ containerId }"></div>
            </div>
        `;


       
        templateMap.multipleTable = `
            <div class="layui-upload">
                <button type="button" class="layui-btn layui-btn-normal" id="${ btnId }">选择多文件</button>
                <div class="layui-upload-list">
                    <table class="layui-table">
                        <thead>
                            <th>文件名</th>
                            <th>大小</th>
                            <th>状态</th>
                            <th>操作</th>
                        </thead>
                        <tbody id="${ containerId }"></tbody>
                    </table>
                </div>
                <button type="button" class="layui-btn" id="${ listAction }">开始上传</button>
            </div>
        `;

        templateMap.multimedia = `
            <button type="button" class="layui-btn" id="${ btnId }"><i class="layui-icon">&#xe67c;</i>${ options.testdes }</button>
        `;

        templateMap.manualOperation = `
            <div class="layui-upload">
                <button type="button" class="layui-btn layui-btn-normal" id="${ btnId }">选择文件</button>
                <button type="button" class="layui-btn" id="${ uploadId }">开始上传</button>
            </div>
        `;

        // 点击上传，或将文件拖拽到此处
        templateMap.drag = `
            <div class="layui-upload-drag" id="${ btnId }">
                <i class="layui-icon">&#xe67c;</i>
                <p>点击上传</p>
            </div>
        `;

        templateMap.origin = `
            绑定原始文件域：<input type="file" name="file" id="${ btnId }">
        `;

        config = $.extend({}, config, options.uploadParams); //合并成新对象，则是新的属性列表

        template += templateMap[type];

        mdoc = document.createElement("div");
        mdoc.innerHTML = template;

        this.renderTo = function (id) {
            $('#' + id).append(mdoc);
        }

        function cusUpload() {
            config.elem = '#' + btnId;
            if('manualOperation' === type){
                config.bindAction = '#' + uploadId;
            }

            if( 'multipleTable' === type ) {
                config.bindAction = '#' + listAction;
            }

            config.choose = options.chooseFn ? cusChoose : '';
            config.before = options.beforeFn ? cusBefore : '';
            config.done = options.doneFn ? cusDone : '';
            config.error = options.errorFn ? cusError : '';
            
            if (config.multiple) {
                config.allDone = cusAllDone;
            }

            // 封装layui中的chose函数，在选择上传前的动作
            function cusChoose(obj) {
                // console.log('到达这里了啊');
                //将每次选择的文件追加到文件队列
                
                if('single' === type ||  'multiple' === type ){
                    //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                    obj.preview(function (index, file, result) {
                    });
                }
                if( 'multipleTable' === type ) {
                    var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                    //读取本地文件
                    obj.preview(function (index, file, result) {

                        var tr = $(['<tr id="upload-' + index + '">', '<td>' + file.name +
                            '</td>', '<td>' + (file.size / 1014).toFixed(1) +
                            'kb</td>', '<td>等待上传</td>', '<td>',
                            '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>',
                            '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>',
                            '</td>', '</tr>'
                        ].join(''));

                        //单个重传
                        tr.find('.demo-reload').on('click', function () {
                            obj.upload(index, file);
                        });

                        //删除
                        tr.find('.demo-delete').on('click', function () {
                            delete files[index]; //删除对应的文件
                            tr.remove();
                            uploadInst.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        });

                        $('#' + containerId).append(tr);   // 随机生成的ID坑人啊
                    });
                }

                if('manualOperation' === type){
                    var that = this;
                    obj.preview(function (index, file) {
                        obj.resetFile(index, file, '123.jpg');
                    });
                }

                options.chooseFn(obj);

            }
            // 封装layui中的before函数，在选择上传前的动作
            function cusBefore(obj) {
                console.log('type::' + type);
                if ('single' === type){
                    obj.preview(function (index, file, result) {
                        $('#' + containerId).attr('src', result); //图片链接（base64）
                    });
                }

                if('multiple' === type){
                    obj.preview(function (index, file, result) {
                        $('#' + containerId).append('<img src="' + result + '" alt="' + file.name +
                            '" class="layui-upload-img">')
                    });
                }

                options.beforeFn(obj);
            }

            // 上传产生结果的时候触发这个函数
            function cusDone(res, index, upload) {

                if( 'multipleTable' === type ) {
                    if (res.code == 0) { //上传成功
                        var tr = $('#' + containerId).find('tr#upload-' + index),
                            tds = tr.children();
                        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                        tds.eq(3).html(''); //清空操作
                        delete this.files[index]; //删除文件队列已经上传成功的文件
                        return;
                    }
                    this.error(index, upload);
                }

                //     //如果上传失败
                if (res.code > 0) {
                    return layer.msg('上传失败');
                }
                //上传成功  res.code  === 0 成功
                options.doneFn(res);
            }

            function cusAllDone(obj){
                console.log(obj)
                options.doneFn(obj);
            }

            // 上传产生错误的时候触发这个函数
            function cusError(index, upload) {
                if('single' === type ) {
                    var demoText = $('#' + errorId);
                    demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
                    demoText.find('.demo-reload').on('click', function () {
                        uploadInst.upload();
                    });
                }

                if( 'multipleTable' === type ) {
                    var tr = $('#' + containerId).find('tr#upload-' + index),
                        tds = tr.children();
                    tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                    tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                }


                options.errorFn(index, upload);
            }

            var uploadInst = upload.render(config);

        }

        if (options.renderer) {
            this.renderTo(options.renderer);
            cusUpload();
        }

    }

    window.PlgUpload = plgUpload;

}(jQuery));
!function(e){function t(){}t.prototype.scope={},t.prototype.start=function(e){this.routerMap=e.router,this.mainView=e.view,this.errorTemplateId=e.errorTemplateId,n(),window.onhashchange=function(){n()}};var r=[];function n(){var t=location.hash;!function(t){var r=route.routerMap[t.url];if(void 0===r){var n=route.routerMap.defaults;return r=route.routerMap[n],location.hash=n,!1}if(void 0!==r.homeId)return $(route.mainView).empty().append($(r.homeId).html()),void o(r.controller);var a=r.templateUrl;e.ajax(a,"GET",null,function(e,n,a){var i=route.scope;$.each(i,function(t,r){e=e.replace("{{"+t+"}}",i[t])}),$(route.mainView).empty().append(e),o(r.controller),-1!=t.url.indexOf("List")&&(route.scope.returnUrl=t.url)},{dataType:"html",error:function(e,t,r){if(0===$(route.errorTemplateId).length)return!1;var n=$(route.errorTemplateId).html();n=(n=n.replace(/{{errStatus}}/,e.status)).replace(/{{errContent}}/,e.responseText),$(route.mainView).empty().append(n)}})}(route.parse(t))}function o(e,t){var r,n=document.createElement("script");n.setAttribute("src",e),n.onreadystatechange=n.onload=function(){n.onreadystatechange=null,document.documentElement.removeChild(n),n=null,r||"function"==typeof t&&t(),r=!0},document.documentElement.appendChild(n)}t.prototype.getMessage=function(e){var t={};return $.each(r,function(r,n){n.id===e&&(t=n)}),t},t.prototype.setMessage=function(e){var t=JSON.parse(JSON.stringify(e));$.each(r,function(e,r){if(r.id===t.id)return r=t,!1}),r.push(t)},t.prototype.delMessage=function(e){if(void 0===e)return!1;var t=0;$.each(r,function(r,n){n.id===e&&(t=r)}),$.each(r,function(e,n){e>t&&(r[e-1]=n)})},t.prototype.clearMessage=function(e){r=[]},t.prototype.stringify=function(e,t){var r="";for(var n in t)r+=n+"="+encodeURIComponent(t[n])+"&";return""===r?e:e+"?"+(r=r.substring(0,r.length-1))},t.prototype.parse=function(e){var t=void 0===e?location.hash:e,r={},n="",o=t.indexOf("?");if(""===t)return{url:"",param:{}};if(o>-1){n=t.substring(1,o);var a=t.substring(o+1).split("&");$.each(a,function(e,t){var n,o,a=t.split("=");n=a[0],o=a[1],""!==n&&(r[n]=decodeURIComponent(o))})}else n=t.substring(1),r={};return{url:n,param:r}},window.route=new t}(Prolog);
(function(Prolog){
    function Route(){

    }
    Route.prototype.scope={

        
    };
    Route.prototype.start = function(config){
   
        var self = this;
        self.routerMap = config.router;
        self.mainView = config.view;
        self.errorTemplateId = config.errorTemplateId;
        startRouter();
        window.onhashchange = function(){
            startRouter();
        };
        
    };
    var messageStack = [];
    Route.prototype.getMessage = function(id){
        var msg = {};
        $.each(messageStack,function(i,e){
            if(e.id===id){
                msg = e;
            }
        });
        return msg;
    };

    Route.prototype.setMessage = function(obj){
        var _obj = JSON.parse(JSON.stringify(obj));
        $.each(messageStack,function(i,e){
            if(e.id===_obj.id){
                e = _obj;
                return false;
            }
        });
        messageStack.push(_obj);
    };
    Route.prototype.delMessage = function(id){
        if(typeof id==='undefined'){
            return false;
        }
        var index = 0;
        $.each(messageStack,function(i,e){
            if(e.id===id){
                index = i;
            }
        });
        $.each(messageStack,function(i,e){
            if(i>index){
                messageStack[i-1] = e;
            }
        });
    };
    Route.prototype.clearMessage = function(id){
        var index = 0;
        messageStack = [];
    };

    Route.prototype.stringify = function(routerUrl,paramObj){
        var paramStr='' ,hash;
        for(var i in  paramObj){
            paramStr += i + '=' + encodeURIComponent(paramObj[i]) + '&';
        }
        if(paramStr === ''){
            hash = routerUrl;
        }
        else{
            paramStr = paramStr.substring(0,paramStr.length-1);
            hash = routerUrl + '?' + paramStr;
        }
        return hash;
    };
    Route.prototype.parse = function(routerHash){
        var hash = typeof routerHash ==='undefined'?location.hash:routerHash;
        var obj = {
            url:'',
            param: {}
        };
        var param = {},url='';
        var pIndex = hash.indexOf('?');
        if(hash===''){
            return obj;
        }

        if(pIndex>-1){
            url = hash.substring(1,pIndex);
            var paramStr = hash.substring(pIndex+1);
            var paramArr = paramStr.split('&');

            $.each(paramArr,function(i,e){
                var item = e.split('='),
                    key,
                    val;
                key = item[0];
                val = item[1];
                if(key!==''){
                    param[key] = decodeURIComponent(val);
                }


            });
        }
        else{
            url = hash.substring(1);
            param = {};
        }
        return {
            url:url,
            param: param
        };
    };
    function routerAction (routeObj){

        var routerItem = route.routerMap[routeObj.url];
        if(typeof routerItem==='undefined'){
            var defaultsRoute = route.routerMap.defaults;
            routerItem = route.routerMap[defaultsRoute];
            location.hash = defaultsRoute;
            return false;
        }
         if(typeof routerItem.homeId!='undefined')
         {
             $(route.mainView).empty().append($(routerItem.homeId).html());
             loadScript(routerItem.controller);
             return;
         }
        var url=routerItem.templateUrl;

        

        Prolog.ajax(url,"GET",null,function(data, status, xhr){
            var scope=route.scope;
            $.each(scope, function(key, val) {
                data = data.replace("{{"+key+"}}",scope[key]);
            });

           var getViewData=data;

            $(route.mainView).empty().append(data);

            loadScript(routerItem.controller);
            if(routeObj.url.indexOf("List")!=-1)
            route.scope.returnUrl=routeObj.url;

        }
        ,{
            dataType: 'html' ,
            error: function(xhr, errorType, error){
                if($(route.errorTemplateId).length===0){
                    return false;
                }
                var errHtml = $(route.errorTemplateId).html();
                errHtml = errHtml.replace(/{{errStatus}}/,xhr.status);
                errHtml = errHtml.replace(/{{errContent}}/,xhr.responseText);
                $(route.mainView).empty().append(errHtml);

            }
        })

	/*    $.ajax({
            type: 'GET',
            url:url,
            dataType: 'html',
            success: function(data, status, xhr){
                var scope=route.scope;
                $.each(scope, function(key, val) {
                    data = data.replace("{{"+key+"}}",scope[key]);
                });

               var getViewData=data;

				$(route.mainView).empty().append(data);

                loadScript(routerItem.controller);
				if(routeObj.url.indexOf("List")!=-1)
				route.scope.returnUrl=routeObj.url;




            },
            error: function(xhr, errorType, error){
                if($(route.errorTemplateId).length===0){
                    return false;
                }
                var errHtml = $(route.errorTemplateId).html();
                errHtml = errHtml.replace(/{{errStatus}}/,xhr.status);
                errHtml = errHtml.replace(/{{errContent}}/,xhr.responseText);
                $(route.mainView).empty().append(errHtml);

            }
        }); */
    }

    function startRouter  () {
        var hash = location.hash;
        var routeObj = route.parse(hash);
        routerAction(routeObj);
    }

    function loadScript(src, callback) {

        var script = document.createElement('script'),
            loaded;
        script.setAttribute('src', src);
        script.onreadystatechange = script.onload = function() {
            script.onreadystatechange = null;
            document.documentElement.removeChild(script);
            script = null;
            if (!loaded) {
                if(typeof callback==='function')
                    callback();
            }
            loaded = true;
        };
        
        document.documentElement.appendChild(script);
    }
    

    window.route = new Route();
})(Prolog);
