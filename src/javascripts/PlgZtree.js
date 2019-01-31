;
(function ($) {

    //PlgZtree.js


    var tree = $.fn.zTree;

         
    var getData = function (opts) {
        var close = Prolog.loading2();
        var obj = {};
        //配置tree
        opts.success=function (res) {
            //console.log(res)
                if (res.success) {
                    //只把父节点拿出来
                    obj = res.data.map(function (item) {
                        item.isParent = true
                        return item

                    })

                } else {
                    layer.msg("数据加载失败!");
                }
                close()
        }
        opts.error=function(){      
            close()
         }
        Prolog.syncAjax(opts);

        return obj
    }

    


    function Expand(event, treeId, treeNode) {
        //如果是一级父菜单
        console.log(treeId)
        if (!treeNode.tId) {
            

            var obj = this.getZTreeObj(treeId);
            var NOdes = obj.getNodes();
            for (var key in NOdes) {
                var td = NOdes[key]
                if (td.tId != treeNode.tId) {
                    obj.expandNode(td, false, false, false);

                } else {
                    obj.expandNode(td, true)
                }
            }
        };

    }


    var plgZtree = function (ele, options) {
        var _this = this;
        var config = {
            initAjax:null,
            skin: "",
            toolBar: false,
            toolBar2:{
                isShow:false,
                btn:null,
            },
            renderer: null,
            setData:null,
            isExpand:false,
            setting: {
                treeId: Prolog.createRandomId(),
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
                 // onExpand: Expand,
                   
                }

            }

        };
        var ele, opt, object;
        //获取数据入口
        if (arguments.length === 1) {
            opt = arguments[0];
            if (typeof opt === "object") {
                _this.opts = $.extend(true, config, opt);
                if (opt.setting && opt.setting.callback) {
                    if (typeof opt.setting.callback.onExpand === "function") {
                        _this.opts.setting.callback.onExpand = function (event, treeId, treeNode) {
                            Expand.bind(_this)(event, treeId, treeNode);
                            opt.setting.callback.onExpand(event, treeId, treeNode);
                        }
                    };
                };
               if( !_this.opts.setDate &&_this.opts.initAjax ){
                                              
                _this.opts.setData = getData(_this.opts.initAjax);

                
               } 
               
            }
        } else if (arguments.length === 2) {
            ele = arguments[0];
            opt = arguments[1];

        }
        _this.opts.renderer && _this.renderTo(this.opts.renderer)

        //求父级div的高度值
    
    
        setTimeout(window.onresize=function(){
            var pObj= $("#"+_this.opts.renderer);
            var toolbarBtnHeight=0;
            if(_this.toolbarBtn2){
                toolbarBtnHeight= _this.toolbarBtn2.height();

            } 
            
            var parentHeight= parseInt(pObj.parent().height()-toolbarBtnHeight);
            pObj.find(".ztree").css({"width":"100%","height":parentHeight,"overflow-y": "auto","pading-bottom":"20px"})
        },0)
        
   

    };

    //克隆tree 的方法
    for (var key in tree) {
        plgZtree.prototype[key] = tree[key];
    }

    plgZtree.prototype.renderTo = function (ele) {
    	$("#" + ele).empty();
        var _this = this;
        this.opts.skin && $("#" + ele).addClass(this.opts.skin);

        var objUl = $("<ul>", {
            class: "ztree",
            id: _this.opts.setting.treeId

        });

        this.treeObj = this.init(objUl, this.opts.setting, this.opts.setData);
        //默认展开第一个菜单
        this.opts.isExpand&& this.treeObj.expandNode(this.treeObj.getNodes()[0], true, false, true,true);

        if (this.opts.toolBar) {
            _this.toolbarBtn = btnGroup(_this);
            $("#" + ele).append(_this.toolbarBtn);
        }
        if (this.opts.toolBar2.isShow && this.opts.toolBar2.btn&&this.opts.toolBar2.btn.length>0) {
            _this.toolbarBtn2 = btnGroup2(_this);
            $("#" + ele).append(_this.toolbarBtn2);
        }


            $("#" + ele).append(objUl);


        return this
    };
    var newCount = 1;

   /*  plgZtree.prototype.on = function (eventName, callback) {

        var _this = this;
      //  var toolbarBtn = btnGroup();
        var zTree = this.treeObj;
        if(eventName=="addTreeNodeClick"){
            var addBtn = this.toolbarBtn.children().eq(2);
            callback && addBtn.click(function (event) {
            var nodes = zTree.getSelectedNodes();
            var treeNode = nodes;
            callback(event, zTree, treeNode)

        })

        }else if(eventName=="delTreeNodeClick"){
            var delBtn = this.toolbarBtn.children().eq(0);
            callback && delBtn.click(function (event) {
            var nodes = zTree.getSelectedNodes();
            var treeNode = nodes;
            callback(event, zTree, treeNode);
        })

        }else if(eventName=="editTreeNodeClick"){
            var delBtn = this.toolbarBtn.children().eq(1);
            callback && delBtn.click(function (event) {
                var nodes = zTree.getSelectedNodes();
                var treeNode = nodes;
                callback(event, zTree, treeNode);
            })
        }


    }; */

    var nodeObj = {
        id: Prolog.createRandomId(),
        name: "新菜单",
        systemId: null,
        menuId: "m00" + Prolog.createRandomId(),
        parentMenuId: null,
        operateType: 0,
        level: 1,
        enable: true,
        leaf: false,
        path: "",
        sort: 0,

    };

    function btnGroup2(_this){
        var obj=_this.opts.toolBar2.btn;
        var btn = $(`
        <div class="toolbar layui-row layui-col-space10 cl">
         ${obj.map(function(item){

           return`<div class="hook layui-col-md${12/obj.length}">
            <a class="layui-btn ${item.skin?item.skin:''}" href="javascript:void(0)">
            <i class="${item.icon}"></i>${item.text}</a>
          </div>`
         }).join("")}   
        
      </div>`);
      var zTree = _this.treeObj;

      obj.forEach(function(item,index){
        btn.find(".hook").eq(index).find('a').click(function (event) {
            var nodes = zTree.getSelectedNodes();
            var treeNode = nodes;
            item.EventCallback &&item.EventCallback(event, zTree, treeNode);
        })
          

      })
          return btn

    }

    function btnGroup(_this) {
    
                 var btn = $(`

                 <div class="toolbar layui-row layui-col-space10 cl">


                 <div class="layui-col-md4">
                 <a class="layui-btn layui-btn-primary" href="javascript:void(0)">
                 <i class="layui-icon layui-icon-delete"></i>删除
                 </a>
             </div>
             <div class="layui-col-md4">
               
             <a class="layui-btn layui-btn-primary" href="javascript:void(0)" >
                 <i class="layui-icon layui-icon-edit"></i>编辑</a>
          </div>
                 <div class="layui-col-md4">
            
                     <a class="layui-btn  layui-btn-normal"  href="javascript:void(0)">
                           <i class="layui-icon layui-icon-add-1"></i>增加
                   </a>
                 </div>
       
               </div>
        
               
               
             
             `);

        return btn
    }


    //添加菜单
    function add(event) {
        var zTree = this.treeObj;
        var nodes = zTree.getSelectedNodes();
        var treeNode = nodes[0];
        nodeObj.parentMenuId = treeNode.menuId;
        treeNode = zTree.addNodes(treeNode, nodeObj);
        zTree.selectNode(treeNode[0]);

    }

    function del(event) {
        //console.log(this)
        var zTree = this.treeObj;

    }

    window.PlgZtree = plgZtree


})(jQuery);