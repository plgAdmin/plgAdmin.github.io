;
(function ($, layui) {

    //PlgTabs.js
    layui.use(["element"], function () {
        var element = layui.element;
        var template = function (opts) {

            var skinArr = {
                normal: "layui-tab",
                brief: "layui-tab layui-tab-brief",
                card: "layui-tab layui-tab-card",
                plgtabs: "layui-tab layui-tab-brief plgtabs "
            };


            var itemlist = function (content) {
                if (content) {
                    var rp = "";
                    var ra = "";
                    content.forEach(function (item, inxex) {
                        rp += `<li lay-id = ${item.id} class="${opts.indexActive===inxex ?"layui-this":""}" >${item.title}</li>`;

                        ra += `<div class="layui-tab-item  ${opts.indexActive===inxex ?"layui-show":""}" data-fade="">${item.template}</div>`
                    });
                    return {
                        title: rp,
                        content: ra
                    }
                } else {
                    return ""
                }
            };
            itemlist = itemlist(opts.content);

            var closeBtn = `
            <ul class="plg-tab-close-all" lay-filter="plg-tab-close-all">
              <div class="plg-tab-close-item">
                  <a href="javascript:;" class="layui-icon layui-icon-more"></a>
                 <dl class="child">
                  <dd><a href="javascript:;">关闭其它标签页</a></dd>
                  <dd><a href="javascript:;">关闭当前标签页</a></dd>
                  <dd><a href="javascript:;">关闭所有标签页</a></dd>
                </dl>   
                </li>
            </ul>`;

            var tp = `
                <div class="${skinArr[opts.skin]}" ${opts.allowClose?`lay-allowClose="true"`:""} 
                    ${opts.filter?`lay-filter="`+opts.filter+`"`:""}>
                    ${opts.closeAll?closeBtn:""}
                    <ul class="layui-tab-title">
                    </ul>
                    <div class="layui-tab-content"></div>
                </div>`;
            return $(tp)
        };


        var plgTabs = function (options) {
            var _this = this;
            _this.preIndex = -1;
            var config = {
                time: 100,
                renderer: null,
                filter: "plgTabs-" + Prolog.createRandomId(), //选择器
                indexActive: 0,
                closeAll: false, //是否显示关闭全部按钮
                skin: "brief",
                fadeIn: false, //是否开启滑动切换
                allowClose: false, //是否带删除
                content: [
                    /* {
                                        title:null,
                                        template:null,
                                        id:"lay-"+ Prolog.createRandomId(),
                                        url:null          
                                    } */
                                    
                ],
            };
            var ele, opt;
            //获取数据入口
            opt = arguments[0];
            if (typeof opt === "object") {

                _this.opts = $.extend(true, config, opt);
                _this.getElement = template(_this.opts);

                //显示右边可关闭按钮
                if (_this.opts.closeAll) {

                    _this.getElement.find(".plg-tab-close-all").hover(function () {
                        $(this).find(".child").show()

                    }, function () {
                        $(this).find(".child").hide()
                    });

                    _this.getElement.find(".plg-tab-close-all .child").on('click', "dd", function (e) {
                        e.preventDefault();
                        var oa = $(this).index();
                        var oli = $(this).parents(".plg-tab-close-all").next().children('li');
                        oli.each(function (index, item) {
                            var $this = $(item);
                            if ($this.index() !== 0) {
                                if (!$this.hasClass("layui-this")) {
                                    if (oa === 0) {
                                        _this.deleteTabs($this.attr("lay-id"));
                                    }
                                } else {
                                    if (oa === 1) {
                                        _this.deleteTabs($this.attr("lay-id"));
                                    }

                                }
                                if (oa === 2) {
                                    _this.deleteTabs($this.attr("lay-id"));

                                }
                            }
                        })

                        $(this).parents(".child").hide();

                    });

                }

            }
            _this.opts.renderer && _this.renderTo(this.opts.renderer);



        };

        
        plgTabs.prototype.renderTo = function (ele) {
            $("#" + ele).append(this.getElement);
            var _this = this
            this.opts.content.forEach(function (item, index) {
                var yes = false;
                if (_this.opts.indexActive === index) {
                    yes = true
                }
                console.log(yes)
                _this.addTabs(item, yes);

            })
            var oli = this.getElement.find(".layui-tab-title > li");


            var layid = oli.eq(_this.opts.indexActive).attr("lay-id");
            _this.changeTabs(layid);

            this.element.render("nav");
            //渲染到页面
            this.element.render("tab", this.opts.filter);
            //计算总宽度得到li的数量
            this.on();
            return this
        };


        function getNum(titleObj) {
            var count = titleObj.width() - 15;
            var count01 = titleObj.find("li").eq(0).outerWidth();
            var count02 = titleObj.prev() ? titleObj.prev().outerWidth() : 0;
            var liw = 140;
            var liNum = Math.floor(count - count01 - count02) / liw;
            /// //console.log('count :',Math.floor(liNum) );
            return Math.floor(liNum)
        };

 

        var pindex = -1;

        //动态添加tabss
        plgTabs.prototype.addTabs = function (obj, boole) {
            var closeLoad = PlgDialog.loading2();
            
            obj.title = `<span class="name">${obj.title}</span>`
            var _this = this;

            if(!boole){
                boole=null

            }
            var isChange = boole ;


            //将上次的选中的下标存下来  
            this.preIndex = this.getElement.find(".layui-tab-title li.layui-this").index();

            var oli = this.getElement.find(".layui-tab-title li");
            //获取当前的li数量
            var curLi = Number(oli.length);

            var define = {
                title: `<span class="name">新标题</span>`,
                content: "",
                id: "lay-" + Prolog.createRandomId(),
                iframe:false,

            }
            var opts = $.extend(true, define, obj);

    
            if (opts.url&&!opts.iframe) {               
              Prolog.ajax({
	                type: "get",
	                url: opts.url,
	                dataType: "html",
	                success: reandTpl,
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                   layer.msg("数据请求失败");
	                   closeLoad()
	                }
	            });


                

            }else if(opts.template&&!opts.iframe){
                reandTpl(opts.template)

            }else{
                //iframe为true
              
                opts.template=`<iframe class="plg-iframeClass" frameborder="no" src="${opts.url}"></iframe>`
                reandTpl(opts.template)
                closeLoad()
                return 
            }
          
            _this.preIndex = pindex = _this.getElement.find(".layui-tab-title>.layui-this").index();

            
            function reandTpl (data) {
              
                 try {
                    opts.content=data;
                    _this.element.tabAdd(_this.opts.filter, opts);
                   
                    isChange && _this.changeTabs(opts.id);
                  } catch (e) {
                    console.error(e.name + ": " + e.message);
                    console.error(e.stack);
                  }
                   finally {
                  _this.getElement.find(".layui-tab-content .layui-tab-item").attr("data-fade", "");
                  var liNum = getNum(_this.getElement.find(".layui-tab-title"));
                  (curLi > liNum && oli.eq(1)) && _this.deleteTabs(oli.eq(1).attr("lay-id"));
                  closeLoad();
                }
            }
              







          //  layer.close(loading);

        };



        //切换到指定tabss
        plgTabs.prototype.changeTabs = function (layid, callback) {

            var id
            var reg = /^[0-9]+.?[0-9]*$/;
            var eleObj
            if (reg.test(layid)) {
                //通过下标找到layid
                eleObj = this.getElement.find(".layui-tab-title>li").eq(layid);
                id = eleObj.attr("lay-id");
            } else {
                id = layid;
                eleObj = this.getElement.find(".layui-tab-title>li[lay-id='" + id + "']")
            }
            pindex = this.getElement.find(".layui-tab-title>.layui-this").index();
            this.element.tabChange(this.opts.filter, id);

            //记录上一次下标
            this.preIndex = pindex;
            //是否开启滑动切换

            if (this.opts.fadeIn) {

                this.getElement.find(".layui-tab-content >.layui-tab-item").attr("data-fade", "");
                var itme = this.getElement.find(".layui-tab-content >.layui-tab-item.layui-show");


                if (itme.index() > this.preIndex) {
                    //console.log("=>")

                    itme.attr("data-fade", "left");;

                } else if (itme.index() == this.preIndex) {

                    return false
                } else {
                    //console.log("<=")
                    this.element.tabChange(this.opts.filter, id);
                    itme.attr("data-fade", "right");

                }



                setTimeout(function () {

                    itme.attr("data-fade", "")

                }, this.opts.time)


            };
            if (typeof callback === "function") {
                callback(eleObj)
            };

            return this
        };

        //删除指定tabss
        plgTabs.prototype.deleteTabs = function (layid) {
            this.element.tabDelete(this.opts.filter, layid); //删除：
            return this
        };


        plgTabs.prototype.element = layui.element;

        plgTabs.prototype.on = function (callback, eventName) {

            var _this = this;
            if (eventName != null) {
                this.element.on(eventName + "(" + this.opts.filter + ")", function (data) {
                    if (typeof callback === "function") {
                        callback(data);
                    }
                    _this.preIndex = data.index;

                });
            } else {
                this.element.on("tab(" + this.opts.filter + ")", function (data) {

                    if (typeof callback === "function") {
                        callback(data);
                    }
                    _this.preIndex = data.index;
                });

            }

            return _this
        };



        
        window.PlgTabs = plgTabs;

        $.fn.initPlgTabs = function (options) {
            var id = $(this).attr("id");
            return new plgTabs(options).renderTo(id);

        };

    });


})(jQuery, layui);