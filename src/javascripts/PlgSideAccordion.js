;(function ($) {
   


    //var mainpanel;
    //var opts;
    var element = layui.element,
        win = window,
        doc = document;

    function loading() {
        var index = layer.load(2, {
            shade: [0.6, '#fff'] //0.1透明度的白色背景
        });

      
        return function(){
            layer.close(index)
        }
    }

    var plgSidebar = function (ele, options) {
        var _this = this;
        var ClassMain = {
            dom: null,
            documentPanel: null,
            meunPanelThis: null,
            template: function (meunPanelThis) {
                var _getData = this.meunPanelThis.getData.parentData;
                if(!_getData){
                    _getData=[];
                    console.error("没有数据")
                }
                var renderNav = this.mainNav(_getData);
                var opts = this.opes;
                var tml =
                    $(`<div class="plg-sidebar">
                  
    <div class="main-nav">
        <div id="meunSoroll" class="layui-side-scroll">

                <div class="plg-logo" >
                <a class="logo-path ${opts.logo=='plg'&&'plg-logo'}" ></a>
                
                <i id="plg-logo-fold" class="anticon layui-icon layui-icon-shrink-right"></i>
                
                </div>    
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <div class="pr-open" data-type="hoot-click">
                <div class="layui-layer-setwin">
                    <a class="layui-icon layui-icon-close" href="javascript:;"></a>
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
                <div class="nav-hover-child" >
                <!-- 二级菜单 -->
                <div class="layui-side">
                        <!--<div class="nav-title"></div>-->
                        <ul class="body-nav" lay-filter="test"></ul>
                
                     </div>
                 </div>

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
                // !item.leaf
                if(!parentData[0]){
                    parentData[0]=[];
                    console.error("数据加载失败")
                }
                parentData[0].filter(function (item) {
                    if (item.parentMenuId === "0" ) {
                        // language=HTML
                        ele += `
                        <li class="s-item" id=${item.id} menu-id=${item.menuId}>
                               <span class="icon-box">
                                 <i class="${item.imagePath}"></i>
                             </span>
                              <span class="meun-name"><a href="${!item.leaf?"javascript:;":item.path}">${item.name}</a></span>
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
                    var ele = `<div class="list-item" id=${item.menuId}><a href="${!item.leaf?'javascript:;':item.path}" menu-id=${item.menuId} parentmenuid=${item.parentMenuId} class="list-title">${item.name}</a>`;

                    data[item.menuId] && data[item.menuId].forEach(function (citem) {

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
                var list = _this.dom.meungroupList,
                    parentDatas = getData.parentData;
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
                        return; //输入框中没有内容，则退出
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
                var _this = this,
                    list = _this.dom.meungroupList,
                    _getData = _this.meunPanelThis.getData,
                    parentDatas = _getData.parentData;
                _this.dom && this.dom.meunSoroll.removeClass("showList");

            },

            clickChild: function (callbakc) {
                var _this = this;
                var othis;
                var bodyNav = _this.dom.bodyNav //ul

                var _getData = _this.meunPanelThis.getData;

                //点击二级菜单列表
                _this.dom.bodyNav.on("click", "a", function (e) {
                    e.stopPropagation(); //阻止事件冒泡
                    e.preventDefault();
                    othis = $(this) //a
                    var mid = othis.attr("menu-id");
                    _this.dom.meungroupList.find("a[menu-id='" + mid + "']").trigger("click");

                });
                //点击给展开所以菜单列表
                _this.dom.meungroupList.on("click", "a", function (e) {
                    e.stopPropagation(); //阻止事件冒泡x
                    e.preventDefault();
                    othis = $(this);
                    var mid = $(this).attr("menu-id");
                    var bodyNav_this = bodyNav.find("a[menu-id='" + mid + "']"),
                        //parents = $this.parents(".body-nav"),
                        bodyNav_parent = bodyNav_this.parent(), //li
                        bodyNav_child = bodyNav_this.siblings('.nav-child'),
                        callbakcData = {
                        getCurrent: _getData.mapAll[mid]
                    };
                    var pid=othis.parents(".list-item").attr("id"),
                        leaf= _getData.mapAll[mid].leaf,
                        href = othis.attr("href");
                        //右边的导航
                        othis.parents(".pr-open").find(".right-sidebar .s-item[menu-id="+pid+"] a").trigger("click");
                        _this.updateChildMeun(pid, mid);

                    if(leaf){
                        _this.dom.meunSoroll.find(".nav-last").attr("data-show", "");
                        _this.removerShowList();
                    }
                    callbakc && callbakc(callbakcData, e);
               
                
                  
                });
            },
            EventHanlder: function () {
                var _this = this;
                $(document).on("click", function () {
                    _this.dom.meunSoroll.hasClass("showList") && _this.removerShowList();
                });
                //控制菜单展开收缩
                _this.dom.documentPanel.find("#plg-logo-fold").click(function (event) {
                    if ($(this).hasClass("layui-icon-shrink-right")) {
                        $(this).removeClass("layui-icon-shrink-right").addClass("layui-icon-spread-left");
                        $("body").addClass("plg-open-hover");

                    } else {
                        $(this).removeClass("layui-icon-spread-left").addClass("layui-icon-shrink-right");
                        $("body").removeClass("plg-open-hover");

                    }

                });
                _this.dom.meunSoroll.find(".nav-last").hover(function (event) {
                    _this.removerShowList();
                    if(_this.dom.bodyNav.find("li").length>0){
                        $(this).attr("data-show", "show-child")
                    }
                    return
                 
                }, function () {
                    
                    $(this).attr("data-show", "")

                });
                
                _this.dom.meunSoroll.on("click", "[data-type='hoot-click']", function (e) {
                    e.stopPropagation(); //阻止事件冒泡
                    e.preventDefault();
                    var eve = e.target;
                    switch ($(this).attr("class")) {
                        case "product-all":
                            _this.dom.meunSoroll.toggleClass("showList");
                            break;
                        case "pr-open":
                            if($(eve).parents(".pr-left").length>0||eve.nodeName!="A") return;
                            if( eve.parentNode.className == "layui-layer-setwin"){                            
                                _this.removerShowList()
                                 return;

                            }
                    
                            var meunTop = _this.meunTopObj();
                            var sItem = $(eve).parents(".s-item");
                            var thisHref = sItem.attr("menu-id"),
                                list = $(".pr-meungroup-list").find(".list-item");
                            sItem.addClass("active")
                                .siblings()
                                .removeClass("active");    
                                
                           
                           list.each(function () {
                                $(this)[0].id == thisHref ? $(this).addClass("select") : $(this).removeClass("select");

                            });
                            for (var key in meunTop) {
                                if ((key) == thisHref) {
                                    $(".pr-left").animate({
                                        scrollTop: meunTop[key]
                                    });
                                }
                            }
                            
                            break;

                        case "nav-last":      //点一级菜单加载二级菜单
      
                            var parents = $(eve).parents(".s-item"),
                                menuid = parents.attr("menu-id"); 
                                if(!menuid) return
                                var leaf=Boolean(_this.meunPanelThis.getData.mapAll[menuid].leaf);
                                
                                _this.dom.meunSoroll.find(".nav-last").attr("data-show", "");
                                _this.removerShowList();
                                if($(eve).parents("#sidebar").length>0){
                                    _this.dom.meungroupList.find("a[menu-id='"+ menuid + "']").trigger("click");
                                }
                                if(leaf){
                                    return
                                };
                                
                                setTimeout(function () {
                                    _this.dom.meunSoroll.find(".nav-last").attr("data-show", "show-child");
                                }, 200)
                              break;

                        default:
                            return false
                    }



                });
                var tabArray = [];

            },
            updateChildMeun: function (pid, mid) {
                var _this = this,
                    pid = pid,
                    parNav = $("[menu-id=" + pid + "]");
                    parNav.addClass("active").siblings().removeClass("active");
  
                var _getData = _this.meunPanelThis.getData;
                _this.dom.bodyNav.empty();
                
                if (pid) {
                    if(_getData.mapAll[pid].leaf&&_getData.mapAll[mid].parentMenuId==0){
                        return
                    }
                    
                    var parentData = _getData.parentData;
                    
                    parentData[pid] && parentData[pid].forEach(function (item) {
                        var oliClass="item h-link";
                        if (mid) {                        
                            if (item.menuId == mid){
                                oliClass="item h-link active-this itemeds"
                            }
                        };
                        
                        var oli = $("<li>", {
                            "class":oliClass
                        });

                        var oa = $("<a>", {
                            "href": item.path || "javascript:;",
                            "menu-id": item.menuId,
                            "leaf": item.leaf,
                            "level": item.level,
                            "id": item.id,
                            "parentMenuId": item.parentMenuId,
                        }).text(item.name);
                     
                        oli.append(oa);
                        if (!item.leaf && parentData[item.parentMenuId] && parentData[item.parentMenuId].length > 0) {
                            var navchild = '<dl class="nav-child">';
                            parentData[item.menuId] && parentData[item.menuId].forEach(function (citem) {
                                navchild += `<dd class= ${(mid && citem.menuId == mid) ? "active-this" : ""} ><a href=${citem.path || "javascript:;"} leaf=${citem.leaf} 
main-id=${item.parentMenuId} parentMenuId=${citem.parentMenuId} menu-id=${citem.menuId}>${citem.name}</a></dd>`;
                            });
                            navchild += "</dl>";
                            oa.append(`<i class="right-mover layui-icon layui-icon-right"></i>`);
                            oli.append(navchild);
                            if (mid) {
                                oli.find("dd").each(function (index, item) {
                                    if ($(item).attr("class") == "active-this") {
                                        oli.addClass("active-this").addClass("itemeds");
                                        return oli.find(".nav-child").show();
                                    }
                                });
                            }
                        }
                        _this.dom.bodyNav.append(oli);

                    })
                };
            },
            initPanel: function (meunPanelThis, opes) {
                var _this = this;
                _this.meunPanelThis = meunPanelThis;
                var _getData = _this.meunPanelThis.getData;
            

                _this.opes = opes;
                _this.documentPanel = _this.template(_this);
                if (_this.documentPanel)
                    _this.dom = {
                        documentPanel: _this.documentPanel,
                        meunSoroll: _this.documentPanel.find("#meunSoroll"),
                        bodyNav: _this.documentPanel.find(".body-nav"),
                        meungroupList: _this.documentPanel.find(".pr-meungroup-list"),
                        prLeft: _this.documentPanel.find(".pr-left"),
                        $tabli: $(".layui-tab-title li"),
                        $nav_hover_child: _this.documentPanel.find(".nav-hover-child"),
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
        var config={
            url:null,
            route:false,
            menuClick:null
        }

        //获取数据入口
        if (arguments.length == 1) {
            _this.options = arguments[0];
            _this.options = $.extend(true, config, _this.options);
            _this.init(_this.options);

        } else if (arguments.length == 2) {
            _this.ele = arguments[0];
            _this.options = arguments[1];
            _this.options = $.extend(true, config, _this.options);
            _this.init(_this.options);

            _this.renderTo(_this.ele);

        }

    };


    plgSidebar.prototype.config = {
        isTrigger: false,
        url: "",
        logo: null,

    };

    plgSidebar.prototype.setMapData = function (url) {
        var closeLoad=loading();

        var dataAll, mapAll = null,
            parentData = null;

        function mapdata(dataAll) {
           /*  layer.load(0, {
                shade: true
            }); */
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
    //    var token = window.localStorage.getItem("token");
        Prolog.syncAjax(
            {
                type: 'get',
                url: url,
            /*     beforeSend: function (request) {
                    if (token != null) {
                        request.setRequestHeader("Authorization", token);
                    }
                }, */
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
                  //  closeLoad()
                    //console.log(err)
                    layer.msg("数据加载失败!");
                },
                dataType: 'json'
            }
        )




        closeLoad();
        return {
            dataAll: dataAll,
            mapAll: mapAll,
            parentData: parentData
        }
    };

    

 /*    var closeLoad= loading();

    setTimeout(function(){
        closeLoad()
      //  layer.close(closeLoad)
    },2000) */

    plgSidebar.prototype.init = function (options) {
        var _this = this;
        var _class = this.getFun;
        if (typeof _this.options === "object") {
            _this.opts = $.extend(true, _this.config, _this.options);
            if (_this.opts.url != "") {
                _this.getData = _this.setMapData(_this.opts.url);
                _this.getElement = _class.initPanel(_this, _this.opts);

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
        $("#" + domId).append(documentPanel);
 
        if (this.opts.isTrigger) {
            var menuid = $("#" + domId).find(".sidebar li:first-child").addClass("active").attr("menu-id");
            this.getFun.updateChildMeun(menuid);
        }
        return this;

    };


    window.PlgSideAccordion = plgSidebar;

    $.fn.initPlgSideAccordion = function (options) {
               /*  var closeLoad= loading(); */

        return new plgSidebar(this, options);

    };


})(jQuery);