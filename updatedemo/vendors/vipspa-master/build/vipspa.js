(function () {
    function Vipspa() {

    }

    //面包穴

    function renderBreadcrumb(arrTpl = []) {
        window.timeWrok && clearTimeout(timeWrok), window.timeWrok = null, delete window.timeWrok;
        window.onresize = null;
            
        var defaults = vipspa.routerMap[vipspa.routerMap.defaults];
        if (arrTpl[0] == defaults.name) {
            arrTpl.splice(0, 1)
        }
        var tpl = `<div class="plg-breadcrumb">
               <span class="layui-breadcrumb">
                  <a href="#${vipspa.routerMap.defaults}">${defaults.name}</a>
                          ${arrTpl.length>0?arrTpl.map(function(item){
                                return `<a><cite>${item}</cite></a>`
                          }).join(""):""}              
             </div>`;

        $("#ui-breadcrumb").empty().append(tpl);
        return layui.element.render("breadcrumb");
    }


    Vipspa.prototype.start = function (config) {
        var self = this;

      
        self.routerMap = Object.assign(self.routerMap,config.router);

     
        self.mainView = config.view;
        self.errorTemplateId = config.errorTemplateId;
        self.catchHtmls = [];
  
          
    
        
        startRouter();
        window.onhashchange = function () {
            startRouter();
            

        };
   

    };
    var messageStack = [];
    // {
    //     'id': 'home_bindcard',
    //     'content': {
    //     }
    // }
    Vipspa.prototype.getMessage = function (id) {
        var msg = {};
        $.each(messageStack, function (i, e) {
            if (e.id === id) {
                msg = e;
            }
        });
        return msg;
    };

    Vipspa.prototype.setMessage = function (obj) {
        var _obj = JSON.parse(JSON.stringify(obj));
        $.each(messageStack, function (i, e) {
            if (e.id === _obj.id) {
                e = _obj;
                return false;
            }
        });
        messageStack.push(_obj);
    };
    Vipspa.prototype.delMessage = function (id) {
        if (typeof id === 'undefined') {
            return false;
        }
        var index = 0;
        $.each(messageStack, function (i, e) {
            if (e.id === id) {
                index = i;
            }
        });
        $.each(messageStack, function (i, e) {
            if (i > index) {
                messageStack[i - 1] = e;
            }
        });
    };
    Vipspa.prototype.clearMessage = function (id) {
        var index = 0;
        messageStack = [];
    };

    Vipspa.prototype.stringify = function (routerUrl, paramObj) {
        var paramStr = '',
            hash;
        for (var i in paramObj) {
            paramStr += i + '=' + encodeURIComponent(paramObj[i]) + '&';
        }
        if (paramStr === '') {
            hash = routerUrl;
        } else {
            paramStr = paramStr.substring(0, paramStr.length - 1);
            hash = routerUrl + '?' + paramStr;
        }
        return hash;
    };
    Vipspa.prototype.parse = function (routerHash) {
        var hash = typeof routerHash === 'undefined' ? location.hash : routerHash;
        var obj = {
            url: '',
            param: {}
        };
        var param = {},
            url = '';
        var pIndex = hash.indexOf('?');
        if (hash === '') {
            return obj;
        }

        if (pIndex > -1) {
            url = hash.substring(1, pIndex);
            var paramStr = hash.substring(pIndex + 1);
            var paramArr = paramStr.split('&');

            $.each(paramArr, function (i, e) {
                var item = e.split('='),
                    key,
                    val;
                key = item[0];
                val = item[1];
                if (key !== '') {
                    param[key] = decodeURIComponent(val);
                }


            });
        } else {
            url = hash.substring(1);
            param = {};
        }
        return {
            url: url,
            param: param
        };
    };

    function routerAction(routeObj) {
        var close = PlgDialog.loading2();


        var routerItem = vipspa.routerMap[routeObj.url];
        if (typeof routerItem === 'undefined') {
            var defaultsRoute = vipspa.routerMap.defaults;
            routerItem = vipspa.routerMap[defaultsRoute];
            location.hash = defaultsRoute;
            return false;
        }
        var isExitCatch = isRouterUrlExitsInCatchHtmls(routerItem.templateUrl);


        if (isExitCatch) {
            //读取缓存
            loadPageHtmlFromCatch(routerItem, close);


        } else {
            //加载数据

            fetchHtmlFromServer(routerItem, close);
        }

        var arr = []
        if (routerItem.parent_name) {
            arr = routerItem.parent_name
        };

        var filterData = function (pid) {
            return Object.values(mapData).filter(function (item) {
                return item.parentMenuId == pid
            })
        }

        renderBreadcrumb(arr);

        //状态
        if (routerItem.stateArr && routerItem.stateArr.length > 0) {
            //清除
               var objdata=vipspa.mapData;
               for(var key in vipspa.mapData ){
                  objdata[key].isActive = false;
               }
            routerItem.stateArr.forEach(function (id) {
                objdata[id].isActive=true;

            })
            vipspa.mapData = objdata;
            objdata=null;
            
        }


    }

    function fetchHtmlFromServer(routerItem, close) {
        //var close=PlgDialog.loading2();
        if (routerItem.iframe) {
            var htmls = $(`<iframe class="plg-iframeClass" frameborder="no" src="${routerItem.templateUrl}"></iframe>`);
            $(vipspa.mainView).empty().append(htmls);
            saveHtmlsToCatch(routerItem.templateUrl, htmls);
            close();
            return
        }
        Prolog.ajax({
            type: 'GET',
            url: routerItem.templateUrl,
            dataType: 'html',
            success: function (data, status, xhr) {
                var htmls = data;

                $(vipspa.mainView).empty().append(htmls);
                loadScript(routerItem.controller);
                saveHtmlsToCatch(routerItem.templateUrl, htmls);


                close();
            },
            error: function (xhr, errorType, error) {
                if ($(vipspa.errorTemplateId).length === 0) {
                    close();
                    return false;
                }
                var errHtml = $(vipspa.errorTemplateId).html();
                errHtml = errHtml.replace(/{{errStatus}}/, xhr.status);
                errHtml = errHtml.replace(/{{errContent}}/, xhr.responseText);
                $(vipspa.mainView).empty().append(errHtml);
                close();
            }
        });


    }

    function loadPageHtmlFromCatch(routerItem, close) {
        var htmls = getHtmlsFromCatch(routerItem.templateUrl);
             //console.log(vipspa.catchHtmls)

        $(vipspa.mainView).empty().append(htmls);
        $(".layui-layer-loading2").parent().removeClass("layer-anim-close")

        //routerItem.controller&&loadScript(routerItem.controller);

        loadScript(routerItem.controller);
        close()




    }

    function getHtmlsFromCatch(routerUrl) {
        for (var i = 0, e; i < vipspa.catchHtmls.length; i++) {
            e = vipspa.catchHtmls[i];
            if (e.routerUrl === routerUrl) {
                return e.htmls;
            }
        }
        return '';
    }

    function saveHtmlsToCatch(routerUrl, htmls) {
        var obj = {
            routerUrl: routerUrl,
            htmls: htmls,
        };
        vipspa.catchHtmls.push(obj);
    }

    function isRouterUrlExitsInCatchHtmls(routerUrl) {
        for (var i = 0, e; i < vipspa.catchHtmls.length; i++) {
            e = vipspa.catchHtmls[i];
            if (e.routerUrl === routerUrl) {
                return true;
            }
        }
        return false;
    }

    function startRouter() {
        var hash = location.hash;
        var routeObj = vipspa.parse(hash);

       
        routerAction(routeObj);

    }
    var scriptId
    var script

    function loadScript(src, callback) {
        //   var oid =document.getElementById(scriptId)
        //   oid&&document.documentElement.removeChild(oid);


        if (!src) {
            return
        }
        var close = PlgDialog.loading2()

        var script = document.createElement('script'),
            loaded;
        // scriptId=Prolog.createRandomId ()
        script.setAttribute('src', src);
        // script.id=scriptId
        //当script的属性改变时触发事件

        script.onreadystatechange = script.onload = function () {
            script.onreadystatechange = null;

            document.documentElement.removeChild(script);
            script = null;
            if (!loaded) {
                if (typeof callback === 'function')
                    callback();
            }
            loaded = true;
            close()
        };
        script && document.documentElement.appendChild(script);

    }
    window.vipspa = new Vipspa();


})();