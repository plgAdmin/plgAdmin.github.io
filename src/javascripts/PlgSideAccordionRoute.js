;
(function ($) {


    var element = layui.element,
        win = window,
        doc = document;

    
     function filterData(pid,Data){
            return Object.values(Data).filter(function(item){
                return item.parentMenuId==pid    
            })
        }
  
    function mapResetOpenMenuList(mapData){
        var index=0;
        var group = $(`<div class="pr-meun-group"></div><div class="pr-meun-group"></div><div class="pr-meun-group"></div>`);
     
        var treeData= filterData("0",mapData);
        
        //递归
        var recursive = function(pid){
            var str=""
            var child=filterData(pid,mapData);
            
            child.forEach(function(ditem){
                 
                    str += `<div class="menu-text" py-code=${ditem.PY_code}>
                  <a href=${ditem.hash?"#"+ditem.hash:"javascript:;"}
                   parentmenu-id=${ditem.parentMenuId}
                   menu-id=${ditem.menuId}
                   leaf=${ditem.leaf}>
                   ${ditem.name}</a>
                 </div>`;
                   if(!ditem.leaf) 
                    str += recursive(ditem.menuId);
                })
    
        
           return str  
        } 


        for(var key in treeData ){
            var ele = `<div class="list-item ${treeData[key].isActive?`select`:''}" id=${treeData[key].menuId}>
                    <a menu-id=${treeData[key].menuId} parentmenu-id=${treeData[key].parentMenuId} class="list-title">
                      ${treeData[key].name}</a>`;
     
            //遍历二级菜单
            ele += recursive(treeData[key].menuId)
            
            ele += `</div>`;
            if (index % 3 === 0) {
                group.eq(0).append(ele)
            } else if (index % 3 === 1) {
                group.eq(1).append(ele)
            } else if (index % 3 === 2) {
                group.eq(2).append(ele)
            }
            index++
        }
        $(group).find(".menu-text>a[leaf='false']").hide();
        return $(group)
    }

    
    //渲染一级菜单
   
    
     //渲染二级和三级菜单
     
     function mapUpdateChildrenNan(id,mapData,dom){
       //  vipspa.indexId=id;
         var parent=mapData[mapData[id].parentMenuId]; 
                
         if(parent){
                if(parent.parentMenuId!=="0"){
                    parent=mapData[parent.parentMenuId]
                }
            }else{
                parent= mapData[id]
            }
       
          function tree(pid){  
                var data=[]
                 Object.values(mapData).forEach(function(item){
                   if(pid ==item.parentMenuId){
                      data.push(item)
                      if(!item.leaf){
                        return item.children= tree(item.menuId)


                    
                      }
                      
                   }
                })
            return data
        }
        
        parent.children= tree(parent.menuId);

        var treeData=parent
        var sidebarLi=`<ul class="body-nav" parentmenu-id=${parent.menuId} name=${parent.name}>`
        
        treeData=treeData.children;
       
        for(var key in treeData){                 
            sidebarLi += `<li class="item h-link ${treeData[key].isActive?`active-this`:''} ${treeData[key].isActive&&treeData[key].children?`itemeds`:''}">
            <a href="${treeData[key].blank?treeData[key].path:(treeData[key].hash?"#"+treeData[key].hash:"javascript:;")}"  ${treeData[key].blank?`target=_blank`:""} menu-id=${treeData[key].menuId} leaf="${treeData[key].leaf}" level="${treeData[key].level}">${treeData[key].name}
            ${(treeData[key].children&&!treeData[key].leaf)?`<i class="right-mover layui-icon layui-icon-right"></i>`:''} 
            </a>
            ${(treeData[key].children&&!treeData[key].leaf)?
                  `<dl class="nav-child" parentmenu-id=${treeData[key].menuId}>            
                        ${ treeData[key].children.map(function(childItem,index,arr){                            
                            return `<dd ${childItem.isActive?`class="active-this"`:''}>
                            <a href=${childItem.blank?childItem.path:(childItem.hash?"#"+childItem.hash:"javascript:;")}
                            ${childItem.blank?`target=_blank`:""} leaf=${childItem.leaf} menu-id=${childItem.menuId}  level=${childItem.level}>${childItem.name}</a></dd>`
                        }).join("") }          
                  </dl>`         
            :''} 
            </li>`;
        }
        sidebarLi+=`</ul>`
        dom&&dom.bodyNav.html(sidebarLi);
        return sidebarLi

     }


    //摸版
    //渲染一级菜单
    function mapUpdateMainNav(mapData){
        var sidebarLi=""
          Object.values(mapData).filter(function(item){
            if(item.parentMenuId=="0"){
                sidebarLi+=   `<li class="s-item ${item.isActive?`active`:''}">
                <span class="icon-box"><i class="${item.imagePath}"></i></span>
                <span class="meun-name"><a href="${item.leaf?"#"+item.hash:`javascript:;`}"  menu-id=${item.menuId}>${item.name}</a></span>
                </li>`
            }else{
                return
            }
        })

        return sidebarLi
     
    }

    function TemplateMap(mapData,opts){
        if(!mapData){
            mapData=[]    
        }   


            //一级菜单
            var sidebarLi=mapUpdateMainNav(mapData);
            //打开全部的菜单
             var group=mapResetOpenMenuList(mapData);
  
         //   console.log(vipspa.indexId)

            var tpl=$(`<div class="plg-sidebar">                          
            <div class="main-nav">
                <div id="meunSoroll" class="layui-side-scroll">
                        <div class="plg-logo" >
                        <a class="logo-path ${opts.logo=='plg'&&'plg-logo'}" ></a>            
                        <i id="plg-logo-fold" class="anticon layui-icon layui-icon-shrink-right"></i>          
                        </div>    
                    <!-- 左侧打开全部导航区域 -->
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
                                <!-- 全部菜单列表--->
                         
                                
                            </div>
                        </div>
                        <div class="pr-right">
                            <div class="scroll-nav">
                                <ul class="right-sidebar">
                                     ${sidebarLi}

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="product-all" data-type="hoot-click">
                                <span class="icon-box">
                                        <i class="icon iconfont p-icon-all"></i>
                                </span>
                        <span class="meun-name">
                                    <a  href="javascript:;">所有服务</a>
                                    <i class="right-mover layui-icon layui-icon-right
            "></i>
                                </span>
                    </div>
                    <div class="nav-last" data-show="">
                        <ul id="sidebar" class="sidebar">
                           <!--一级菜单-->
                           ${sidebarLi}
                        </ul>
                     <div class="nav-hover-child" >
                        <!-- 二级菜单 -->
                        <div class="layui-side">                 
                        
                                      <!-- 当前hover二级菜单列表--->
                                      ${vipspa.indexId?mapUpdateChildrenNan(vipspa.indexId,mapData):""}
                                                                   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            ` );
          

            //       
          tpl.find(".pr-meungroup-list").append(group);     
        return $(tpl)
        
     }
 


    var plgSidebar = function (options) {
        var _this = this;
        _this.options=options;
        var config={
            renderer:null,
            url:null,
            ajaxInit:{
                url:null,
                type:"get",
                dataType:"json",
            },
            logo:"",
            route:false,
            menuClick:null,
        }
        //获取数据入口
        _this.options = $.extend(true, config, _this.options);


        //获取数据
        var loaddata=LoadData.call(this,_this.options.ajaxInit);
     //   vipspa.treeData = loaddata.treeData;
  
  
        Object.defineProperties(vipspa, {
       
            mapData:{
                get: function(val) {
                    return  loaddata.mapData
                 },
                 set:function(newValue){
                        try {   
                            vipspa.indexId =vipspa.routerMap[vipspa.parse(location.hash).url].menuId;
                                    } catch (e) {
                                        console.error(e)
                                        console.error( "vipspa.router.defaults:hash of error" )
                                    // ...
                                }
                                finally{
                                    _this.document = TemplateMap(newValue,_this.options);
                                    _this.init(_this.document);
                                    if(_this.options.renderer){
                                    _this.renderTo(_this.options.renderer);
                

                                }

                                
               

               
                   
                    }       
                 }
            }

        })
       // loaddata.treeData[_this.options.index].isActive=true;
      // vipspa.treeData=loaddata.treeData ;
     //   vipspa.mapData=loaddata.mapData;
    };

    //事件监听
    function EventHanlder(dom){
        var _this=this
        var opts=this.options;
     //   var treeData= vipspa.treeData;
        var mapData= vipspa.mapData;
        $(document).on("click", function () {
            dom.meunSoroll.hasClass("showList") && removerShowList(dom.meunSoroll);
        });


         //控制菜单展开收缩
         dom.logoFold.click(function (event) {
            if ($(this).hasClass("layui-icon-shrink-right")) {
                $(this).removeClass("layui-icon-shrink-right").addClass("layui-icon-spread-left");
                $("body").addClass("plg-open-hover");

            } else {
                $(this).removeClass("layui-icon-spread-left").addClass("layui-icon-shrink-right");
                $("body").removeClass("plg-open-hover");

            }
        });
         //控制菜单hover
        dom.navLast.hover(function (event) {
            var id= $(this).find("li.s-item.active a").attr("menu-id");
            if(id&&vipspa.mapData[id].leaf){
                dom.navLast.attr("data-show", "")
               return 
            } 
            removerShowList(dom.meunSoroll);
            $(this).attr("data-show", "show-child");
        }, function () {
             $(this).attr("data-show", "")
        });

        

        //打开所有菜单点击事件
        dom.prLeft.on("click",".menu-text > a",function(event){
           event.preventDefault();
           location.hash= $(this).attr("href");
            var id= $(this).attr("menu-id");
            var pid= $(this).attr("parentmenu-id");
           
             function result(pid){
                var obj=mapData[pid]
                if(obj.parentMenuId!=="0"){

                    return result(obj.parentMenuId)
                };
            
                
     
             mapUpdateChildrenNan(id,mapData,dom);
                
                var slfe= dom.bodyNav.find(`a[menu-id='${id}']`);
                

                   // arr.unshift(slfe.text().replace(/[\ \r\n]/g,""));

                    if(slfe.parent().is("dd")){
                        //arr.unshift(slfe.parents("dl.nav-child").prev().text().replace(/[\ \r\n]/g,""))
                        slfe.parents("li.item ").addClass("itemeds")
                        slfe.parents("dl.nav-child").show()
    
                    }

                 //arr.unshift(slfe.parents(".body-nav").attr("name").replace(/[\ \r\n]/g,""))  
                 slfe.parent().addClass("active-this").siblings().removeClass("active-this");
                    
                return pid
                    
            }

            pid=result(pid);
            removerShowList(dom.meunSoroll);

        })

        
        //一级菜单事件
        dom.sidebar.on("click","li",function(event){
           var id= $(this).find("a").attr("menu-id");
           var i=$(this).index();
          // dom.sidebar.empty().append(updateMainNav(treeData))
           $(this).addClass("active").siblings().removeClass("active");
            opts.index=i;
           if(vipspa.mapData[id].leaf){
            dom.navLast.attr("data-show", "");
            location.hash=$(this).find("a").attr("href");
            return
         } 
           event.preventDefault();
           dom.navLast.attr("data-show","");
           mapUpdateChildrenNan(id,mapData,dom);
           setTimeout(function () {
               dom.navLast.attr("data-show","show-child");
           }, 200)
           
        })  

           //点击二级hover菜单事件
        dom.bodyNav.on("click", "li>a", function (event) {
            event.stopPropagation(); //阻止事件冒泡
            var slfe = $(this),
            leaf = (slfe.attr("leaf")) == "true",
            child = slfe.siblings("dl.nav-child");

            
            slfe.parent().addClass("active-this").siblings().removeClass("active-this").find('dd').removeClass("active-this").removeClass("itemeds");
            opts.menuClick&&opts.menuClick(slfe);



            if (slfe.parent().is("dd")) {
                slfe.parents("li.item").addClass("active-this").siblings().removeClass("active-this").removeClass("itemeds")
            }

            //如果是二级菜单
            if (!leaf && child.length > 0) {
                slfe.parent().addClass("active-this").siblings().removeClass("active-this").removeClass("itemeds")
                child.slideToggle("fast");
                slfe.parent().toggleClass("itemeds").siblings().children('.nav-child').slideUp();
                return false
            }

            if($(this).attr("target")=="_blank"){
                return
            }
            if( $(this).attr("href")!=="javascript:;"){
                location.hash = $(this).attr("href");
              //  vipspa.indexId=slfe.attr("menu-id");


            } else{
                event.preventDefault();

            } 
          //  var arr=[];itemeds
          
   
        })


        dom.meunSoroll.on("click", "[data-type='hoot-click']",function(event){
            event.stopPropagation(); //阻止事件冒泡
            event.preventDefault();
            var eve = event.target;
            switch ($(this).attr("class")){
                case "product-all"://关闭 小X
                dom.meunSoroll.toggleClass("showList");
                break;
                case "pr-open"://滚动
                eve.parentNode.className == "layui-layer-setwin" && removerShowList(dom.meunSoroll);
                var meunTop = meunTopObj(dom.meungroupList);
                var sItem = $(eve).parents(".s-item");
                var thisHref = sItem.find("a").attr("menu-id"),
                    list = dom.meungroupList.find(".list-item");
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
                default:
                         return false

            }
        })
    }

    //搜索条事件
    function setOpenKeyup(dom){
        
        var regCH = new RegExp("[\\u4E00-\\u9FFF]+", "g");
         var keyUpList =dom.prLeft.find("#keyUpList");
         var list=dom.meungroupList.find(".menu-text");
          dom.meunSoroll.find("#selectInput").keyup(function (e) {
                      var tip = $(this).next(".search-tip");
                      var val = $(this).val();
                      val = val.toUpperCase();
                      if (!val) {
                          tip.hide();
                          dom.meungroupList.show();
                          keyUpList.html("").hide();
                          return; //输入框中没有内容，则退出
                      }

                      tip.show().find("strong").text(val);

                      dom.meungroupList.hide();

                      keyUpList.html("").show();

                      list.each(function (i, item) {

                          var str = regCH.test(val) ? $(item).find("a").text().indexOf(val) : $(item).attr("py-code").indexOf(val);

                          if (str >= 0 && $(item).find("a").attr("leaf") == "true") {

                              keyUpList.append(`<div class="pr-meun-group"><div class="list-item">${item.outerHTML}</div></div>`)

                          }
                      })

        })


    };

      //获取菜单top值
    function meunTopObj (meungroupList) {
        var _this = this;
        var list = meungroupList.find(".list-item");
         var obj = {};
        list.each(function (index, item) {
            var key = item.id;
            obj[key] = parseInt(item.offsetTop);
        });
        return obj;
    };

    function removerShowList(dom,className){
            if(!className){
                className="showList"
            }
            dom.removeClass(className);
    }


    plgSidebar.prototype.init = function (document) {

        var _this = this;

        var $dom={
            sidebar: document.find("#sidebar"),
            logoFold: document.find("#plg-logo-fold"),
            meunSoroll: document.find("#meunSoroll"),
            navLast: document.find("#meunSoroll .nav-last"),
            bodyNav: document.find(".nav-hover-child .layui-side"),
            meungroupList: document.find(".pr-meungroup-list"),
            prLeft: document.find(".pr-left"),
            nav_hover_child: document.find(".nav-hover-child"),
        }

        //事件注册
        EventHanlder.call(_this,$dom);
        setOpenKeyup($dom)
        return _this
    };




    //熏染模板到节点
    plgSidebar.prototype.renderTo = function (domId) {

           this.options.renderer=domId;
          $("#"+ this.options.renderer).empty().append(this.document);

        return this;

    };

  
     //请求数据
     function LoadData(object) {
         var _this=this;
         var routeSetting={};
        var close=PlgDialog.loading2();
        var treedata;
        object.success= function (response) {
            if (response.success) {

                treedata=toTree(response.data);
              
                response.data.forEach(function (item) {
                    if(item.blank){
                        return
                    }
                    item.PY_code = pinyin.makePy(item.name)[0]
                   // item.isActive=false;
                   
                    if (item.leaf&&item.path){
                        //去首字母
                        //如果没有配hash
                        if(!item.hash){

                         item.hash=item.path.substr(1).split("/");
                         item.hash=item.hash[item.hash.length-2]+"/"+item.hash[item.hash.length-1];
                      
                            if(item.hash.indexOf("=")!=-1){
                                item.hash= item.hash.match("([^=]+)$")[0]
                            }

                        };  
                              var obj=resultName(item.menuId);
                              routeSetting[item.hash]={
                                templateUrl:item.iframe?item.path:item.path+".html",
                                iframe:item.iframe||false,
                                controller:item.srcPath?item.srcPath+".js":null,
                                name:item.name,
                                menuId:item.menuId,
                                parent_name:obj.arr,
                                stateArr:obj.idarr   
                            }  
                            obj=null;    
                    }
                });

                function resultName(mid,arr=[],idarr=[]){
                    var mapData= treedata.mapData;
                    var item=mapData[mid];
                     arr.unshift(item.name);
                     idarr.unshift(item.menuId);
                    
                    if(item.parentMenuId!=0){                       
                         return resultName(item.parentMenuId,arr,idarr)

                    }
                    return {arr:arr,
                           idarr:idarr  
                        }

                }

             
                   //路由配置
                   vipspa.routerMap =routeSetting 
                   //Object.assign( vipspa.routerMap,routeSetting);

            } else {
                layer.msg("数据加载失败!");
            }
            close();
        }
        ,
        object.error= function (XMLHttpRequest, textStatus, errorThrown) {
            console.error(XMLHttpRequest, textStatus, errorThrown);
            close();
        }

        Prolog.syncAjax(object)
        return treedata
    };

    //返加树型结构对象
    function toTree(data) {
        // 删除 所有 children,以防止多次调用
        data.forEach(function (item) {
            delete item.children;
            delete item.type;
            delete item.queryId;
            delete item.operateType;
            delete item.lastModifyTime;
            delete item.helpCode;
            delete item.creatorName;
            delete item.creatorId;
            delete item.createTime;
            delete item.modifierId;
            delete item.modifierName;
            delete item.sort;
        });

        // 将数据存储为 以 menuId 为 KEY 的 map 索引数据列
        var map = {};
        data.forEach(function (item) {
            map[item.menuId] = item;
        });
              

        return {
            mapData:map

        };
    }
    
  
    window.PlgSideAccordionRoute = plgSidebar;

    $.fn.initPlgSideAccordion = function (options) {
               /*  var closeLoad= loading(); */

        return new plgSidebar(this, options);

    };


})(jQuery);