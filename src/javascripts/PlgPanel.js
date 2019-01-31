/**
 * hdw
 * 2019.01.28
 * 面板组件
 */

;(function ($, layui) {

    //PlgPanel.js
    layui.use(["element"], function () {

        function template() {
            var salf = this;
            var skinOBJ = {
                0: "",
                1: "skin_1",
                2: "skin_2"
            };
            if (!skinOBJ[salf.skin]) salf.skin = 0;
            var html = `<div class="layui-card PlgPanel ${skinOBJ[salf.skin]} ${salf.className?salf.className:""}" ${salf.id?`id=${salf.id}`:""}  ${salf.style?`style="${salf.style}"`:""}>
                       ${salf.header.isShow?
                        `<div class="layui-card-header">                
                            <div class="title io">${salf.header.title}</div>
                            ${salf.header.moreBtn&&salf.header.moreBtn.length>0?
                                `<div class="more_group">
                                ${salf.header.moreBtn.map(function(item){
                                    return `<a class="layui-btn layui-btn-sm layui-btn-normal ${item.className?`${item.className}`:""}" href="javascript:;"> ${item.icon?`<i class="${item.icon}"></i>`:""}${item.name}</a>`
                                })}
                         </div>`:""}       
                        </div>
                       `:""}
                        <div class="layui-card-body">
              
                        </div>
                    </div>`;
          
            return $(html);

        };



        function PanelForm() {
            var salf = this;
            if(!salf.defaultBody) return;
            var data = salf.defaultBody,html = null;
            
            if (data.layoutCol < 0 || data.layoutCol > 12) {
                console.error("layoutCol:不能小于0或不能大于12");
            } 

            function inputBlock(item, valueBj) {
                if(!item.type) item.type="text";
                switch (item.type) {
                    case "text":
                        if(!item.value){
                           item.value="<span style='color:#c3c3c3'>暂无数据</span>";
                        }
                        return `<div class="text-info ${valueBj?"bj":""}">${item.value}</div>`;
                    case "input":
                        if(!item.value) item.value="";
                        return `<input type="text" placeholder="请输入信息"
                        autocomplete="off" class="layui-input" value="${item.value}">`;
                  

                }
            }
            if (data.cols) {
                html = `<form class="layui-form cl" style="padding:5px" lay-filter="">   
                            ${data.cols.map(function(arr){                  
                          return `<div class="layui-row layui-col-space10">
                                    ${arr.map(function(item){
                                        return `<div class="layui-col-md${item.layoutCol||data.layoutCol} ${item.offset?`layui-col-md-offset${item.offset}`:""}">
                                            <div class="layui-form-item">
                                            <label class="layui-form-label">${item.label}：</label>       
                                            <div class="layui-input-block">
                                                        ${inputBlock(item,data.valueBj)}
                                                </div>
                                            </div>                               
                                        </div>`
                                        }).join("")} 
                        
                            </div>`
                          }).join("")}

                        </form>`;

            } else {
                return
            }
            return $(html)
        }

        function plgPanel(ele, options) {
            var _this = this;
            _this.id = "PlgPanel" + new Date().valueOf(); //选择器

            var ele, opt;
            //获取数据入口
            if (arguments.length === 1) {
                opt = arguments[0];
                if (typeof opt === "object") {
                    var config = {
                        renderer:"",
                        className : "",
                        style : "",
                        skin : 0,
                        title :"",
                        moreBtn :null,
                        empyt:true,
                        header:{
                            isShow: true,
                            title: "",
                            moreBtn: null
                        },
                        defaultBody : null,
                    }
                     Object.assign(_this,config,opt);
                   
                    _this.getElement = template.call(_this);
                    //判断是否有defaultBody配置           
                    if(_this.defaultBody!=null && _this.defaultBody.cols&&_this.defaultBody.cols.length>0){
                            _this.appendPanelBody(PanelForm.call(_this));                          

                    }
                    _this.renderTo(_this.renderer)
                }
            } else if (arguments.length === 2) {
                ele = arguments[0];
                opt = arguments[1];
                if (typeof opt === "object") {
                    _this.opts = $.extend(true, config, opt);
                    _this.getElement = template(_this.opts);
                    _this.renderTo(ele);
                }
            }
        };
        plgPanel.prototype.renderTo = function (ele) {

            if(this.empyt){
               $("#" + ele).empty();
            }
            $("#" + ele).append(this.getElement);
            return this
        };

        plgPanel.prototype.appendPanelBody = function (ElementObjcet, isEmpty = false) {
            var ele=this.getElement.find(".layui-card-body");
            if(isEmpty){
                ele.empty();
            }
           console.dir( Object.prototype.toString.call(ElementObjcet)  )
           console.dir(ElementObjcet[0].nodeType === 1   )
           console.dir(typeof ElementObjcet[0].nodeName === 'string' )
           // console.dir(typeof ElementObjcet )
           console.dir( ElementObjcet[0] instanceof HTMLElement);
           console.dir( ElementObjcet instanceof jQuery)
           console.dir("defaultBody:"+ Object.prototype.toString.call(this.defaultBody)  )
           console.dir("defaultBody:"+Array.isArray(this.defaultBody))
           console.dir(this.defaultBody instanceof HTMLElement)
            ele.append(ElementObjcet);
            return this

        }







        window.PlgPanel = plgPanel;

        /*         $.fn.PlgPanel = function (options) {
                    return new plgPanel(this, options);

                };
         */


    });


})(jQuery, layui);