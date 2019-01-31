"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Date.prototype.format = function (fmt) {
  //author: meizz 
  var o = {
    "M+": this.getMonth() + 1,
    //月份 
    "d+": this.getDate(),
    //日 
    "h+": this.getHours(),
    //小时 
    "m+": this.getMinutes(),
    //分 
    "s+": this.getSeconds(),
    //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3),
    //季度 
    "S": this.getMilliseconds() //毫秒 

  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }

  return fmt;
}; // 增强code的健壮性，主要是其他用不到dhtml插件的文件，不再需要引入这个插件了


if (!(typeof dhtmlXCalendarObject === 'undefined' || !dhtmlXCalendarObject)) {
  dhtmlXCalendarObject.prototype.langData["ch"] = {
    dateformat: '%Y-%m-%d',
    monthesFNames: ["1月", '2月', '3月', "4月", '5月', '6月', "7月", '8月', '9月', "10月", '11月', '12月'],
    monthesSNames: ["1月", '2月', '3月', "4月", '5月', '6月', "7月", '8月', '9月', "10月", '11月', '12月'],
    daysFNames: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    daysSNames: ["日", "一", "二", "三", "四", "五", "六"],
    weekstart: "周日",
    weekname: "星期",
    today: "今天",
    clear: "清除"
  };
  dhtmlXCalendarObject.prototype.lang = "ch";
}

;
var Prolog = {};
var GridBasePath = "/prologui/components/PlgGrid/codebase/images";
var token = localStorage.getItem("authorization"); //获取元素的纵坐标 

Prolog.getTop = function (e) {
  var offset = e.offsetTop;

  if (e.offsetParent != null) {
    offset += Prolog.getTop(e.offsetParent);
  }

  ;
  return offset;
}; // 获取元素的横坐标


Prolog.getLeft = function (e) {
  var offset = e.offsetLeft;

  if (e.offsetParent != null) {
    offset += Prolog.getLeft(e.offsetParent);
  }

  ;
  return offset;
};

Prolog.hasJson = function (jsonArray, json) {
  for (var i = 0; i < jsonArray.length; i++) {
    var b = true;

    for (var key in jsonArray[i]) {
      if (jsonArray[i][key] != json[key]) {
        b = false;
        break;
      }
    }

    if (b) return i;
  }

  return -1;
};

Prolog.ajax = function (options) {
  var pdefault = {
    timeout: 30000,
    dataType: "json"
  };
  var opt = $.extend(true, pdefault, options);

  opt.error = function (XMLHttpRequest, textStatus, errorThrown) {
    layer.msg(textStatus);
    if (options.error) options.error(XMLHttpRequest, textStatus, errorThrown);
  };

  opt.beforeSend = function (xhr) {
    xhr.setRequestHeader("Authorization", token);

    if (options.beforeSend) {
      options.beforeSend(xhr);
    }
  };

  $.ajax(opt);
};

Prolog.syncAjax = function (options) {
  var pdefault = {
    timeout: 30000
  };
  var opt = $.extend(true, pdefault, options);

  opt.error = function (XMLHttpRequest, textStatus, errorThrown) {
    layer.msg(textStatus);
    if (options.error) options.error(XMLHttpRequest, textStatus, errorThrown);
  };

  opt.async = false;

  opt.beforeSend = function (xhr) {
    xhr.setRequestHeader("Authorization", token);

    if (options.beforeSend) {
      options.beforeSend(xhr);
    }
  };

  $.ajax(opt);
};

Prolog.getFormById = function (systemId, menuId, formId) {
  var myform = null;
  var data = Prolog.getJsonData("/japi/sysform2/form", "GET", {
    systemId: systemId,
    menuId: menuId,
    formId: formId,
    id: systemId + "_" + menuId + "_" + formId
  });

  if (data != null && data.success == true) {
    if (data.data != null && data.data.fields != null) {
      myform = new PrologForm();
      var formdata = JSON.parse(data.data.fields);
      myform.init(formdata);
    } else {
      layer.msg("未定义表单内容");
    }
  }

  return myform;
};

Prolog.createRandomId = function () {
  return new Date().getTime() + Math.random().toString().substr(2, 5);
};

Prolog.loading = function (el) {
  var loading = PlgDialog.loading(); //layui-layer14

  $("#layui-layer-shade" + loading).appendTo("#" + el);
  $("#layui-layer" + loading).appendTo("#" + el);
  $("#layui-layer" + loading).css("left", "50%");
  $("#layui-layer" + loading).css("margin-left", "-90px");
  $("#layui-layer" + loading).css("top", 200 + "px");
  return loading;
};

Prolog.closeLoading = function (id) {
  layer.close(id);
};

Prolog.loading2 = function () {
  var index = PlgDialog.load(2, {
    shade: [0.6, '#fff'] //0.1透明度的白色背景

  });
  return function () {
    PlgDialog.close(index);
  };
};
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


Prolog.delGridRowData = function (grid, url, type, contenttype, param, multiselect) {
  if (multiselect === false) {
    if (grid.getSelectedRowId() == null && param.length < 1) {
      PlgDialog.msg("请选择行!");
      return;
    }
  } else {
    if (grid.getCheckedIds() == null) {
      PlgDialog.msg("请选择行!");
      return;
    }
  }

  PlgDialog.confirm('是否删除吗？', {
    title: '删除提示',
    btn: ['确定', '取消'],
    zIndex: layer.zIndex
  }, function (index) {
    PlgDialog.close(index);
    if (type === "") type = "post";
    if (contenttype === "") contenttype = "application/x-www-form-urlencoded";
    layer.msg("数据处理中...");
    Prolog.ajax({
      url: url,
      type: type,
      contentType: contenttype,
      data: param,
      success: function success(data) {
        if (_typeof(data) != "object") data = JSON.parse(data);

        if (data.success) {
          grid.reload();
          layer.closeAll();
        } else {
          layer.open({
            type: 1,
            offset: "auto",
            id: 'layerError',
            area: ["500px"],
            title: "错误提示",
            content: '<div style="padding: 10px;">' + $.parseJSON(data).message + '</div>',
            btn: '关闭',
            btnAlign: 'r',
            shade: 0,
            yes: function yes() {
              layer.closeAll();
            }
          });
        }
      },
      error: function error() {}
    });
  });
};
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

(function ($) {
  $.fn.initPlgCard = function (options) {
    var pg = new PlgCard(options);
    var id = $(this).attr("id");
    pg.renderTo(id);
    return pg;
  };

  var PlgCard = function PlgCard(options) {
    var _factory;

    if (!options || !options.renderer) return;
    /**
     * htmlFragment  html代码片段
     * config 默认的配置文件
     */

    var htmlFragment, config;
    config = {}; // config = Object.assign(config, options.config);

    config = $.extend({}, config, options.config);
    var factory = (_factory = {
      _style: config.style,
      _data: config.data || '',
      _strTitle: function _strTitle() {
        return '<div class="plg-card-components"> \
                  <div class="plg-card-header-container">\
                  <fieldset><legend>';
      },
      _strHead: function _strHead() {
        return '<div class="plg-card-group">';
      },
      _strTitleHead: function _strTitleHead() {
        return '</legend></fieldset></div><div class="plg-card-group">';
      },
      _strFooter: function _strFooter() {
        return '</div>';
      }
    }, _defineProperty(_factory, "_strFooter", function _strFooter() {
      return '</div></div>';
    }), _defineProperty(_factory, "generateOneTemplate", function generateOneTemplate(data) {
      var self = this,
          temFragment = '';
      data.forEach(function (val) {
        temFragment += "\n                <div class=\"plg-card\">\n                  <div class=\"plg-card-body\">\n                    <div class=\"plg-card-no\">".concat(val.cardNo, "</div>\n                    <div class=\"plg-card-main\">").concat(val.cardName, "</div>\n                   </div>\n  \n                   <ul class=\"plg-card-btn-group\">\n              ");
        var temBtns = '';
        val.btn.forEach(function (value) {
          temBtns += "\n                <li>".concat(value.text, "</li>\n              ");
        });
        temFragment += temBtns;
        temFragment += "\n                </ul>\n              </div>\n            ";
      });
      return temFragment;
    }), _defineProperty(_factory, "oneTemplate", function oneTemplate() {
      var self = this,
          temFragment = '';

      self._data.forEach(function (val) {
        temFragment += "\n                <div class=\"plg-card\">\n                  <div class=\"plg-card-body\">\n                    <div class=\"plg-card-no\">".concat(val.cardNo, "</div>\n                    <div class=\"plg-card-main\">").concat(val.cardName, "</div>\n                   </div>\n  \n                   <ul class=\"plg-card-btn-group\">\n              ");
        var temBtns = '';
        val.btn.forEach(function (value) {
          temBtns += "\n                <li>".concat(value.text, "</li>\n              ");
        });
        temFragment += temBtns;
        temFragment += "\n                </ul>\n              </div>\n            ";
      });

      return self._strHead() + temFragment + self._strFooter();
    }), _defineProperty(_factory, "twoTemplate", function twoTemplate() {
      // return 'twoTemplate';
      var self = this,
          temFragment = '';

      self._data.forEach(function (val) {
        temFragment += "\n                <div class=\"plg-card\">\n                  <div class=\"plg-card-body primary\">\n                    ".concat(val.cardName, "\n                   </div>\n  \n                   <ul class=\"plg-card-btn-group\">\n              ");
        var temBtns = '';
        val.btn.forEach(function (value) {
          temBtns += "\n                <li>".concat(value.text, "</li>\n              ");
        });
        temFragment += temBtns;
        temFragment += "\n                </ul>\n              </div>\n            ";
      });

      return self._strHead() + temFragment + self._strFooter();
    }), _defineProperty(_factory, "threeTemplate", function threeTemplate() {
      // return 'threeTemplate';
      var self = this,
          temFragment = '';

      self._data.forEach(function (val) {
        temFragment += "\n                <div class=\"plg-card\">\n                  <div class=\"plg-card-body primary\">\n                    ".concat(val.cardName, "\n                   </div>\n  \n                   <ul class=\"plg-card-btn-group\">\n              ");
        var temBtns = '';
        val.btn.forEach(function (value) {
          temBtns += "\n                <li>".concat(value.text, "</li>\n              ");
        });
        temFragment += temBtns;
        temFragment += "\n                </ul>\n              </div>\n            ";
      });

      return self._strHead() + temFragment + self._strFooter();
    }), _defineProperty(_factory, "addTemplate", function addTemplate() {
      return "<div class=\"plg-card plg-add\">\n                  <div class=\"layui-icon layui-icon-add-1 \"></div>\n                </div>";
    }), _defineProperty(_factory, "oneTitleTemplate", function oneTitleTemplate() {
      var self = this,
          temFragment = '';

      self._data.forEach(function (val) {
        temFragment += "<div class=\"plg-card-components\"><div class=\"plg-card-header-container\">\n                <fieldset><legend>\n                ".concat(val.title, "\n                <legend><fieldset></div>");
        temFragment += self._strHead();
        temFragment += self.generateOneTemplate(val.dataList);
        temFragment += self._strFooter();
        temFragment += "</div>";
      });

      return temFragment;
    }), _defineProperty(_factory, "oneTitleAddTemplate", function oneTitleAddTemplate() {
      var self = this,
          temFragment = '';

      if (!self._data || self._data.length < 1) {
        return false;
      }

      self._data.forEach(function (val) {
        temFragment += "<div class=\"plg-card-components\"><div class=\"plg-card-header-container\">\n                <fieldset><legend>\n                ".concat(val.title, "\n                <legend><fieldset></div>");
        temFragment += self._strHead();
        temFragment += self.generateOneTemplate(val.dataList);
        temFragment += self.addTemplate();
        temFragment += self._strFooter();
        temFragment += "</div>";
      });

      return temFragment;
    }), _defineProperty(_factory, "getHtmlFragment", function getHtmlFragment() {
      var self = this;
      var attrName = self._style + 'Template';
      return self[attrName] ? self[attrName]() : new Error('不存在这个方法');
    }), _factory); // //console.log(factory.getHtmlFragment());

    this.on = function (eventname, callback) {
      var ROUTINE_OPERATION = ['one', 'two', 'three'],
          COMPLEX_OPERATION = ['oneTitle', 'twoTitle', 'threeTitle', 'oneTitleAdd', 'twoTitleAdd', 'threeTitleAdd']; // 此处多了一个oneTitle类型

      if (config && config.style !== 'add' && eventname && eventname == 'click') {
        if (ROUTINE_OPERATION.includes(config.style)) {
          $('#' + options.renderer).on('click', 'li', function (e) {
            var temIndex = $(this).closest(".plg-card").index();
            var cardNo = config.data[temIndex].cardNo;
            var call_back_fn = config.data[temIndex].btn[$(this).index()].fn;
            callback && callback(cardNo, call_back_fn);
          });
        }

        if (COMPLEX_OPERATION.includes(config.style)) {
          $('#' + options.renderer).off('click').on('click', 'li', function (e) {
            var groupIndex = $(this).closest(".plg-card-components").index(),
                temIndex = $(this).closest(".plg-card").index(),
                currentData = config.data[groupIndex].dataList[temIndex],
                cardNo,
                call_back_fn;
            cardNo = currentData.cardNo;
            call_back_fn = currentData.btn[$(this).index()].fn;
            var title = config.data[groupIndex].title;

            if (title) {
              callback && callback(cardNo, call_back_fn, title);
            } else {
              callback && callback(cardNo, call_back_fn);
            }
          });
          $('#' + options.renderer).on('click', '.plg-add', function (e) {
            var groupIndex = $(this).closest(".plg-card-components").index();
            var title = config.data[groupIndex].title; // 需要获取当前的title

            if (title) {
              callback && callback(undefined, undefined, title);
            } else {
              callback && callback(undefined, undefined);
            }
          });
        }
      }

      if (config && config.style === 'add' && eventname && eventname == 'click') {
        $('#' + options.renderer).on('click', '.plg-card', function (e) {
          callback && callback();
        });
      }
    };

    this.renderTo = function (id) {
      $('#' + id).append(factory.getHtmlFragment());
    };

    if (options.renderer) {
      this.renderTo(options.renderer);
    }
  };

  window.PlgCard = PlgCard;
})(jQuery);
"use strict";

;

(function ($) {
  $.fn.initPlgCardList = function (options) {
    var pg = new PlgCardList(options);
    var id = $(this).attr("id");
    pg.renderTo(id);
    return pg;
  };

  var PlgCardList = function PlgCardList(options) {
    if (!options) {
      return false;
    }

    ;
    /**
     * htmlFragment  html代码片段
     * config 默认的配置文件
     */

    var htmlFragment, config;
    config = {
      isShowAdd: true // 默认显示

    };
    config = Object.assign({}, config, options.data);
    var factory = {
      _data: config || '',
      _strTitle: function _strTitle() {
        var self = this;
        var temStr = '';
        temStr += "<div class=\"plg-zone-container\">\n        <div class=\"plg-zone-header\">\n          <div class=\"plg-title\"><i class=\"layui-icon layui-icon-location\"></i>\n          ".concat(self._data.zoneName, "</div>");

        if (self._data.isShowAdd) {
          temStr += "<div class=\"plg-add\">\n            <button class=\"layui-btn layui-btn-normal\" data-zoneid=".concat(self._data.zoneId, " name=\"plg-add\">\n              <i class=\"layui-icon\">&#xe654;</i>\n              \u6DFB\u52A0\n            </button>\n          </div>");
        }

        temStr += "</div>\n          <div class=\"plg-customer-list\">\n          <ul class=\"layui-row\">";
        return temStr;
      },
      _strCellStart: function _strCellStart() {
        return "<li class=\"layui-col-lg3 layui-col-md4 layui-col-sm6 \n        layui-col-xs12\">\n        <div class=\"plg-cell\">";
      },
      _strCellHead: function _strCellHead(head) {
        return "<div class=\"plg-customer-name\">\n          <i class=\"plg-badge-dot\"></i>".concat(head, "\n        </div>");
      },
      _strCellBody: function _strCellBody(des) {
        return "<div class=\"plg-customer-des\">".concat(des, "</div>");
      },
      _strCellFooter: function _strCellFooter(obj) {
        // console.log(obj);
        // debugger;
        var temFragment = '';
        temFragment += "<div class=\"plg-customer-other\">\n          <div class=\"plg-cutomer-no\">\u7F16\u53F7:<span>".concat(obj.useNo, "</span></div>");
        var operatFnLength = Object.keys(obj.btns).length;
        var temStr = '';

        if (operatFnLength > 0) {
          temStr += "<div class=\"plg-cutomer-operating\" data-id=".concat(obj.id, ">");
          var item;

          for (item in obj.btns) {
            temStr += "<span class=\"plg-".concat(item, "\">").concat(obj.btns[item], "</span>");
          }

          temStr += "</div>";
        } else {
          console.error('用户配置的操作为空');
        }

        temFragment += temStr;
        temFragment += '</div>';
        return temFragment;
      },
      _strCellEnd: function _strCellEnd() {
        return "</div>\n        </li>";
      },
      _strFooter: function _strFooter() {
        return "</ul>\n          </div>\n        </div>";
      },
      // 向外暴露出最后的模版样式
      getHtmlFragment: function getHtmlFragment() {
        var self = this;
        var temFragment = '';

        if (self._data.customerList && self._data.customerList.length > 0) {
          self._data.customerList.map(function (val) {
            var temObj = {
              id: val.id,
              useNo: val.useNo,
              btns: val.btns
            };
            temFragment += self._strCellStart();
            temFragment += self._strCellHead(val.name);
            temFragment += self._strCellBody(val.description);
            temFragment += self._strCellFooter(temObj);
            temFragment += self._strCellEnd();
          });
        }

        return $(self._strTitle() + temFragment + self._strFooter());
      }
    };

    PlgCardList.prototype.cuson = function () {}; // 当eventName为add的时候，index 是一个function，callback为空


    this.on = function (eventname, callback) {
      var self = this;

      if (eventname === 'add') {
        self.event.find('.plg-add').eq(0).on('click', function () {
          var currentId = $(this).find('.layui-btn').eq(0).data('zoneid');
          callback && callback(currentId);
        });
        return;
      } else {
        if (self.event.find('.plg-' + eventname).length) {
          self.event.find('.plg-' + eventname).on('click', function () {
            var currentId = $(this).closest('.plg-cutomer-operating').data('id');
            callback && callback(currentId);
          });
        } else {
          console.error('绑定的事件不存在::' + eventname);
        }
      }
    };

    this.renderTo = function (id) {
      this.event = factory.getHtmlFragment();
      $('#' + id).append(this.event);
    };

    if (options.renderer) {
      this.renderTo(options.renderer);
    }
  };

  window.PlgCardList = PlgCardList;
})(jQuery);
"use strict";

;

(function ($, layui) {
  //PlgTabs.js
  layui.use(["laydate"], function () {
    var plgDate = layui.laydate;
    window.plgDate = plgDate;

    $.fn.plgDateRender = function (options) {
      var config = {
        value: ""
      };

      var _this = this;

      var opts = $.extend(true, config, options);

      if (this.length > 1) {
        $(this).each(function (index, value) {
          opts.elem = this;
          _this.otps = plgDate.render(opts);
        });
      } else {
        opts.elem = this.selector;
        _this.otps = plgDate.render(opts);
      }

      return _this;
    };
  });
})(jQuery, layui);
"use strict";

;

(function ($, layui) {
  //PlgTabs.js
  layui.use(["layer"], function () {
    var layer = layui.layer;
    layer.config({
      anim: 0,
      //默认动画风格
      zIndex: 10000,
      //skin: 'layui-layer-lan',
      shade: 0.5,
      btnAlign: 'r',
      fixed: false
    });
    var plgDialog = layer;

    plgDialog.showUploadDialog = function (url) {
      var winoptions = {
        title: "上传文件",
        skin: 'layui-layer-lan',
        closeBtn: 1,
        type: 1,
        resize: true,
        btn: ["上传", "取消"],
        btn1: function btn1(index, layero) {
          PlgDialog.close(index);
        },
        btn2: function btn2(index, layero) {
          PlgDialog.close(index);
        },
        area: ['300px', '300px'],
        content: '<div id="xx-win-dd-1"></div>',
        success: function success(layero, index) {
          var formdata = [{
            type: "upload",
            name: "files",
            url: url
          }];
          var mf = new PlgForm({
            items: formdata
          });
          mf.renderTo("xx-win-dd-1");
        }
      };
      layer.open(winoptions);
    };

    plgDialog.showGridDialog = function (plgGrid, callback, opts) {
      var winoptions = {
        title: opts.title ? opts.title : "",
        skin: 'layui-layer-lan',
        closeBtn: 1,
        type: 1,
        resize: true,
        tipsMore: true,
        btn: ["选择", "取消"],
        btn1: function btn1(index, layero) {
          var id = plgGrid.getSelectedRowId();

          if (!id) {
            layer.msg("为选择数据");
            return;
          }

          var record = plgGrid.getSelectedRowData();
          if (callback) callback(id, record);
          PlgDialog.close(index);
        },
        btn2: function btn2(index, layero) {
          PlgDialog.close(index);
        },
        area: [opts.width + 'px', opts.height + 'px'],
        content: '<div id="' + panelId + '-win-grid-1"></div>',
        success: function success(layero, index) {
          plgGrid.renderTo(panelId + '-win-grid-1');
          plgGrid.loadData();
          plgGrid.on("onRowDblClicked", function (rid, ind) {
            var record = plgGrid.getUserData(rid, "data");
            ;
            if (callback) callback(rid, record);
            PlgDialog.close(index);
          });
        }
      };

      if (type == 1) {
        winoptions.btn = ["保存", "取消"];
        winoptions.btn2 = winoptions.btn3;
        winoptions.btn3 = null;
      }

      PlgDialog.open(winoptions);
    };

    plgDialog.loading2 = function () {
      var index = PlgDialog.load(2, {
        shade: [0.6, '#fff'] //0.1透明度的白色背景

      });
      return function () {
        PlgDialog.close(index);
      };
    };

    window.PlgDialog = plgDialog;
  });
})(jQuery, layui);
"use strict";

(function ($, layui) {
  $.fn.initPlgInputTags = function (options) {
    var pg = new plgInputTags(options);
    var id = $(this).attr("id");
    pg.renderTo(id);
    return pg;
  };

  var plgInputTags = function plgInputTags(params) {
    var self = this;
    var classMain = {
      checkboxName: '',
      layFilter: '',
      data: null,
      dom: null,
      tagsId: 'tags-' + Prolog.createRandomId(),
      meunPanelThis: null,
      setDefaultValue: function setDefaultValue(data) {
        if (!(data && data.length > 0)) {
          console.error('用户传递进来的数据不是数组');
          return false;
        }

        data.map(function (val) {
          if (!val.hasOwnProperty('checked')) {
            val.checked = false;
          }
        });
        this.data = data;
      },
      wrapTemplate: function wrapTemplate() {
        var self = this;
        var temTemplate = '';
        temTemplate += "<div class=\"layui-form-item\">\n        <label class=\"layui-form-label\">\u539F\u59CB\u590D\u9009\u6846</label>\n        <div class=\"layui-input-block\">";
        self.data.forEach(function (val) {
          temTemplate += "<input type=\"checkbox\" \n          name=\"".concat(self.checkboxName, "[").concat(val.alias, "]\" \n          lay-skin=\"primary\" lay-filter=\"").concat(self.layFilter, "\" \n          title=\"").concat(val.text, "\" ").concat(val.checked ? 'checked=""' : '', " />\n          <div class=\"layui-unselect layui-form-checkbox ").concat(val.checked ? 'layui-form-checked' : '', "\" \n          lay-skin=\"primary\"><span>").concat(val.text, "</span>\n          <i class=\"layui-icon layui-icon-ok\"></i></div>\n          ");
        });
        temTemplate += "</div>\n          </div>\n          <div class=\"layui-form-item\">\n          <label class=\"layui-form-label\">\u5DF2\u7ECF\u9009\u4E2D</label>\n          <div class=\"layui-input-block tags\" id=\"".concat(self.tagsId, "\"></div>\n          </div>\n        ");
        return temTemplate;
      } // 设置默认值, checked, 默认false
      // var data = params.data;

    };

    if (!params.checkboxName || !params.layFilter) {
      console.error('请设置checkout的名字,该名字将会是您获取form名称的key');
      return false;
    }

    classMain.checkboxName = params.checkboxName; // classMain.layFilter = params.layFilter;

    classMain.setDefaultValue(params.data);
    this.tagsId = classMain.tagsId;
    this.layFilter = classMain.layFilter = params.layFilter || 'plg-' + Prolog.createRandomId();
    this.wrapTamplate = $(classMain.wrapTemplate());

    if (params.renderer) {
      self.renderTo(params.renderer);
    }
  };

  plgInputTags.prototype.renderTo = function (targetId) {
    var self = this;
    var $targetId = $('#' + targetId);
    var $tagsId = $targetId.find("#" + self.tagsId);
    $targetId.append(self.wrapTamplate);
    var form = layui.form;
    form.render();
    var tagList = []; // 用户标签列表

    var inputTags = {
      init: function init() {
        var temObj = {};
        var checkboxList = $targetId.find(".layui-form-checked");

        if (checkboxList.length) {
          temObj = {
            value: checkboxList.siblings("input").attr("title"),
            name: checkboxList.siblings("input").attr("name")
          };
        }

        if (JSON.stringify(temObj) !== "{}") {
          tagList.push(temObj);
          tagList.forEach(function (v) {
            inputTags.add(v);
          });
        }
      },
      add: function add(temObj) {
        var temTempalte = "<span>\n          <em name=\"".concat(temObj.name, "\">").concat(temObj.value, "</em>\n          <button type=\"button\" class=\"close\">\xD7</button>\n        </span>");
        $('#' + self.tagsId).append(temTempalte);
        var temInputHidden = "<input type=\"hidden\" name=\"".concat(temObj.name, "\" \n          value=\"").concat(temObj.value, "\"/>");
        $targetId.after(temInputHidden);

        if (tagList.indexOf(temObj) === -1) {
          tagList.push(temObj);
        }
      },
      del: function del(temObj) {
        // console.log('del temObj before');
        // console.log(tagList);
        // console.log('del temObj before');
        // console.log('del tagList event');
        // console.log(temObj);
        // console.log('del temObj event');
        // 从tagList删除temObj
        if (tagList && tagList.length > 0) {
          tagList.forEach(function (val, ind) {
            if (val.name === temObj.name) {
              tagList.splice(ind, 1);
            }
          });
        } // 操作完成之后就启动重新渲染
        // 2. 删除tags中的标签  TODO:: 此做法有点对DOM的重新渲染影响比较大
        // $('#inputTags').find('name='+ temObj.name).parent('span').remove();


        $("#" + self.tagsId).empty();
        var temTempalte = "";

        if (tagList && tagList.length > 0) {
          tagList.forEach(function (val, ind) {
            temTempalte += "<span><em name=\"".concat(val.name, "\">").concat(val.value, "</em><button type=\"button\" class=\"close\">\xD7</button></span>");
          });
        }

        $("#" + self.tagsId).append(temTempalte); // 3. 删除input hidden中的标签节点

        $("#" + self.targetId).find('input[name="' + temObj.name + '"]').remove();
      }
    };
    inputTags.init();
    form.on("checkbox(" + self.layFilter + ")", function (data) {
      var isChecked = data.elem.checked;
      var jqueryElem = $(data.elem);
      var temObj = {
        value: jqueryElem.attr("title"),
        name: jqueryElem.attr("name")
      };

      if (isChecked) {
        inputTags.add(temObj);
      }

      if (!isChecked) {
        inputTags.del(temObj);
      } // <span><em>标题一</em><button type="button" class="close">×</button></span>

    });
    $targetId.find("#" + self.tagsId).on("click", ".close", function (e) {
      var temJqueryObj = $(this).siblings("em");
      var temObj = {
        value: temJqueryObj.html(),
        name: temJqueryObj.attr("name")
      };
      inputTags.del(temObj); // 1. 清空checkbox 中选中的，修改状态。重新触发被删除的tags

      var checkedList = self.wrapTamplate.find(".layui-form-checkbox"); // 将类数组转化为数组

      checkedList = Array.prototype.slice.call(checkedList);

      if (checkedList && checkedList.length > 0) {
        checkedList.forEach(function (val, ind) {
          var temHtml = $($(val).find("span")[0]).html();

          if (temObj.value === temHtml) {
            self.wrapTamplate.find('.layui-form-checkbox').eq(ind).trigger("click");
          }
        });
      }
    });
  };

  window.PlgInputTags = plgInputTags;
})(jQuery, layui);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * hdw
 * 2019.01.28
 * 面板组件
 */
;

(function ($, layui) {
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
      var html = "<div class=\"layui-card PlgPanel ".concat(skinOBJ[salf.skin], " ").concat(salf.className ? salf.className : "", "\" ").concat(salf.id ? "id=".concat(salf.id) : "", "  ").concat(salf.style ? "style=\"".concat(salf.style, "\"") : "", ">\n                       ").concat(salf.header.isShow ? "<div class=\"layui-card-header\">                \n                            <div class=\"title io\">".concat(salf.header.title, "</div>\n                            ").concat(salf.header.moreBtn && salf.header.moreBtn.length > 0 ? "<div class=\"more_group\">\n                                ".concat(salf.header.moreBtn.map(function (item) {
        return "<a class=\"layui-btn layui-btn-sm layui-btn-normal ".concat(item.className ? "".concat(item.className) : "", "\" href=\"javascript:;\"> ").concat(item.icon ? "<i class=\"".concat(item.icon, "\"></i>") : "").concat(item.name, "</a>");
      }), "\n                         </div>") : "", "       \n                        </div>\n                       ") : "", "\n                        <div class=\"layui-card-body\">\n              \n                        </div>\n                    </div>");
      return $(html);
    }

    ;

    function PanelForm() {
      var salf = this;
      if (!salf.defaultBody) return;
      var data = salf.defaultBody,
          html = null;

      if (data.layoutCol < 0 || data.layoutCol > 12) {
        console.error("layoutCol:不能小于0或不能大于12");
      }

      function inputBlock(item, valueBj) {
        if (!item.type) item.type = "text";

        switch (item.type) {
          case "text":
            if (!item.value) {
              item.value = "<span style='color:#c3c3c3'>暂无数据</span>";
            }

            return "<div class=\"text-info ".concat(valueBj ? "bj" : "", "\">").concat(item.value, "</div>");

          case "input":
            if (!item.value) item.value = "";
            return "<input type=\"text\" placeholder=\"\u8BF7\u8F93\u5165\u4FE1\u606F\"\n                        autocomplete=\"off\" class=\"layui-input\" value=\"".concat(item.value, "\">");
        }
      }

      if (data.cols) {
        html = "<form class=\"layui-form cl\" style=\"padding:5px\" lay-filter=\"\">   \n                            ".concat(data.cols.map(function (arr) {
          return "<div class=\"layui-row layui-col-space10\">\n                                    ".concat(arr.map(function (item) {
            return "<div class=\"layui-col-md".concat(item.layoutCol || data.layoutCol, " ").concat(item.offset ? "layui-col-md-offset".concat(item.offset) : "", "\">\n                                            <div class=\"layui-form-item\">\n                                            <label class=\"layui-form-label\">").concat(item.label, "\uFF1A</label>       \n                                            <div class=\"layui-input-block\">\n                                                        ").concat(inputBlock(item, data.valueBj), "\n                                                </div>\n                                            </div>                               \n                                        </div>");
          }).join(""), " \n                        \n                            </div>");
        }).join(""), "\n\n                        </form>");
      } else {
        return;
      }

      return $(html);
    }

    function plgPanel(ele, options) {
      var _this = this;

      _this.id = "PlgPanel" + new Date().valueOf(); //选择器

      var ele, opt; //获取数据入口

      if (arguments.length === 1) {
        opt = arguments[0];

        if (_typeof(opt) === "object") {
          var config = {
            renderer: "",
            className: "",
            style: "",
            skin: 0,
            title: "",
            moreBtn: null,
            empyt: true,
            header: {
              isShow: true,
              title: "",
              moreBtn: null
            },
            defaultBody: null
          };
          Object.assign(_this, config, opt);
          _this.getElement = template.call(_this); //判断是否有defaultBody配置           

          if (_this.defaultBody != null && _this.defaultBody.cols && _this.defaultBody.cols.length > 0) {
            _this.appendPanelBody(PanelForm.call(_this));
          }

          _this.renderTo(_this.renderer);
        }
      } else if (arguments.length === 2) {
        ele = arguments[0];
        opt = arguments[1];

        if (_typeof(opt) === "object") {
          _this.opts = $.extend(true, config, opt);
          _this.getElement = template(_this.opts);

          _this.renderTo(ele);
        }
      }
    }

    ;

    plgPanel.prototype.renderTo = function (ele) {
      if (this.empyt) {
        $("#" + ele).empty();
      }

      $("#" + ele).append(this.getElement);
      return this;
    };

    plgPanel.prototype.appendPanelBody = function (ElementObjcet) {
      var isEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var ele = this.getElement.find(".layui-card-body");

      if (isEmpty) {
        ele.empty();
      }

      console.dir(Object.prototype.toString.call(ElementObjcet));
      console.dir(ElementObjcet[0].nodeType === 1);
      console.dir(typeof ElementObjcet[0].nodeName === 'string'); // console.dir(typeof ElementObjcet )

      console.dir(ElementObjcet[0] instanceof HTMLElement);
      console.dir(ElementObjcet instanceof jQuery);
      console.dir("defaultBody:" + Object.prototype.toString.call(this.defaultBody));
      console.dir("defaultBody:" + Array.isArray(this.defaultBody));
      console.dir(this.defaultBody instanceof HTMLElement);
      ele.append(ElementObjcet);
      return this;
    };

    window.PlgPanel = plgPanel;
    /*         $.fn.PlgPanel = function (options) {
                return new plgPanel(this, options);
              };
     */
  });
})(jQuery, layui);
"use strict";

;

(function ($, layui) {
  $.fn.PlgSelectPlusTags = function (options) {
    return new plgSelectPlusTags(options);
  };

  var temp = function temp() {
    return "<div class=\"layui-input-block plg-select-tags\"></div>";
  };

  var plgSelectPlusTags = function plgSelectPlusTags(options) {
    this.render(options);
  };

  plgSelectPlusTags.prototype.render = function (options) {
    $('#' + options.renderer).after(temp());
    options.el = '#' + options.renderer;
    delete options.renderer;
    return layui.selectPlus.render(options);
  };

  window.PlgSelectPlusTags = plgSelectPlusTags;
})(jQuery, layui);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

(function ($) {
  var _oMultiDiff;

  var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY"; //此处收录了375个多音字

  var oMultiDiff = (_oMultiDiff = {
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
    "20911": "PF"
  }, _defineProperty(_oMultiDiff, "20504", "TC"), _defineProperty(_oMultiDiff, "20608", "KG"), _defineProperty(_oMultiDiff, "20854", "QJ"), _defineProperty(_oMultiDiff, "20857", "ZC"), _defineProperty(_oMultiDiff, "20911", "PF"), _defineProperty(_oMultiDiff, "20985", "AW"), _defineProperty(_oMultiDiff, "21032", "PB"), _defineProperty(_oMultiDiff, "21048", "XQ"), _defineProperty(_oMultiDiff, "21049", "SC"), _defineProperty(_oMultiDiff, "21089", "YS"), _defineProperty(_oMultiDiff, "21119", "JC"), _defineProperty(_oMultiDiff, "21242", "SB"), _defineProperty(_oMultiDiff, "21273", "SC"), _defineProperty(_oMultiDiff, "21305", "YP"), _defineProperty(_oMultiDiff, "21306", "QO"), _defineProperty(_oMultiDiff, "21330", "ZC"), _defineProperty(_oMultiDiff, "21333", "SDC"), _defineProperty(_oMultiDiff, "21345", "QK"), _defineProperty(_oMultiDiff, "21378", "CA"), _defineProperty(_oMultiDiff, "21397", "SC"), _defineProperty(_oMultiDiff, "21414", "XS"), _defineProperty(_oMultiDiff, "21442", "SC"), _defineProperty(_oMultiDiff, "21477", "JG"), _defineProperty(_oMultiDiff, "21480", "TD"), _defineProperty(_oMultiDiff, "21484", "ZS"), _defineProperty(_oMultiDiff, "21494", "YX"), _defineProperty(_oMultiDiff, "21505", "YX"), _defineProperty(_oMultiDiff, "21512", "HG"), _defineProperty(_oMultiDiff, "21523", "XH"), _defineProperty(_oMultiDiff, "21537", "PB"), _defineProperty(_oMultiDiff, "21542", "PF"), _defineProperty(_oMultiDiff, "21549", "KH"), _defineProperty(_oMultiDiff, "21571", "E"), _defineProperty(_oMultiDiff, "21574", "DA"), _defineProperty(_oMultiDiff, "21588", "TD"), _defineProperty(_oMultiDiff, "21589", "O"), _defineProperty(_oMultiDiff, "21618", "ZC"), _defineProperty(_oMultiDiff, "21621", "KHA"), _defineProperty(_oMultiDiff, "21632", "ZJ"), _defineProperty(_oMultiDiff, "21654", "KG"), _defineProperty(_oMultiDiff, "21679", "LKG"), _defineProperty(_oMultiDiff, "21683", "KH"), _defineProperty(_oMultiDiff, "21710", "A"), _defineProperty(_oMultiDiff, "21719", "YH"), _defineProperty(_oMultiDiff, "21734", "WOE"), _defineProperty(_oMultiDiff, "21769", "A"), _defineProperty(_oMultiDiff, "21780", "WN"), _defineProperty(_oMultiDiff, "21804", "XH"), _defineProperty(_oMultiDiff, "21834", "A"), _defineProperty(_oMultiDiff, "21899", "ZD"), _defineProperty(_oMultiDiff, "21903", "RN"), _defineProperty(_oMultiDiff, "21908", "WO"), _defineProperty(_oMultiDiff, "21939", "ZC"), _defineProperty(_oMultiDiff, "21956", "SA"), _defineProperty(_oMultiDiff, "21964", "YA"), _defineProperty(_oMultiDiff, "21970", "TD"), _defineProperty(_oMultiDiff, "22003", "A"), _defineProperty(_oMultiDiff, "22031", "JG"), _defineProperty(_oMultiDiff, "22040", "XS"), _defineProperty(_oMultiDiff, "22060", "ZC"), _defineProperty(_oMultiDiff, "22066", "ZC"), _defineProperty(_oMultiDiff, "22079", "MH"), _defineProperty(_oMultiDiff, "22129", "XJ"), _defineProperty(_oMultiDiff, "22179", "XA"), _defineProperty(_oMultiDiff, "22237", "NJ"), _defineProperty(_oMultiDiff, "22244", "TD"), _defineProperty(_oMultiDiff, "22280", "JQ"), _defineProperty(_oMultiDiff, "22300", "YH"), _defineProperty(_oMultiDiff, "22313", "XW"), _defineProperty(_oMultiDiff, "22331", "YQ"), _defineProperty(_oMultiDiff, "22343", "YJ"), _defineProperty(_oMultiDiff, "22351", "PH"), _defineProperty(_oMultiDiff, "22395", "DC"), _defineProperty(_oMultiDiff, "22412", "TD"), _defineProperty(_oMultiDiff, "22484", "PB"), _defineProperty(_oMultiDiff, "22500", "PB"), _defineProperty(_oMultiDiff, "22534", "ZD"), _defineProperty(_oMultiDiff, "22549", "DH"), _defineProperty(_oMultiDiff, "22561", "PB"), _defineProperty(_oMultiDiff, "22612", "TD"), _defineProperty(_oMultiDiff, "22771", "KQ"), _defineProperty(_oMultiDiff, "22831", "HB"), _defineProperty(_oMultiDiff, "22841", "JG"), _defineProperty(_oMultiDiff, "22855", "QJ"), _defineProperty(_oMultiDiff, "22865", "XQ"), _defineProperty(_oMultiDiff, "23013", "ML"), _defineProperty(_oMultiDiff, "23081", "WM"), _defineProperty(_oMultiDiff, "23487", "SX"), _defineProperty(_oMultiDiff, "23558", "QJ"), _defineProperty(_oMultiDiff, "23561", "YW"), _defineProperty(_oMultiDiff, "23586", "YW"), _defineProperty(_oMultiDiff, "23614", "YW"), _defineProperty(_oMultiDiff, "23615", "SN"), _defineProperty(_oMultiDiff, "23631", "PB"), _defineProperty(_oMultiDiff, "23646", "ZS"), _defineProperty(_oMultiDiff, "23663", "ZT"), _defineProperty(_oMultiDiff, "23673", "YG"), _defineProperty(_oMultiDiff, "23762", "TD"), _defineProperty(_oMultiDiff, "23769", "ZS"), _defineProperty(_oMultiDiff, "23780", "QJ"), _defineProperty(_oMultiDiff, "23884", "QK"), _defineProperty(_oMultiDiff, "24055", "XH"), _defineProperty(_oMultiDiff, "24113", "DC"), _defineProperty(_oMultiDiff, "24162", "ZC"), _defineProperty(_oMultiDiff, "24191", "GA"), _defineProperty(_oMultiDiff, "24273", "QJ"), _defineProperty(_oMultiDiff, "24324", "NL"), _defineProperty(_oMultiDiff, "24377", "TD"), _defineProperty(_oMultiDiff, "24378", "QJ"), _defineProperty(_oMultiDiff, "24439", "PF"), _defineProperty(_oMultiDiff, "24554", "ZS"), _defineProperty(_oMultiDiff, "24683", "TD"), _defineProperty(_oMultiDiff, "24694", "WE"), _defineProperty(_oMultiDiff, "24733", "LK"), _defineProperty(_oMultiDiff, "24925", "TN"), _defineProperty(_oMultiDiff, "25094", "ZG"), _defineProperty(_oMultiDiff, "25100", "XQ"), _defineProperty(_oMultiDiff, "25103", "XH"), _defineProperty(_oMultiDiff, "25153", "PB"), _defineProperty(_oMultiDiff, "25170", "PB"), _defineProperty(_oMultiDiff, "25179", "KG"), _defineProperty(_oMultiDiff, "25203", "PB"), _defineProperty(_oMultiDiff, "25240", "ZS"), _defineProperty(_oMultiDiff, "25282", "FB"), _defineProperty(_oMultiDiff, "25303", "NA"), _defineProperty(_oMultiDiff, "25324", "KG"), _defineProperty(_oMultiDiff, "25341", "ZY"), _defineProperty(_oMultiDiff, "25373", "WZ"), _defineProperty(_oMultiDiff, "25375", "XJ"), _defineProperty(_oMultiDiff, "25384", "A"), _defineProperty(_oMultiDiff, "25457", "A"), _defineProperty(_oMultiDiff, "25528", "SD"), _defineProperty(_oMultiDiff, "25530", "SC"), _defineProperty(_oMultiDiff, "25552", "TD"), _defineProperty(_oMultiDiff, "25774", "ZC"), _defineProperty(_oMultiDiff, "25874", "ZC"), _defineProperty(_oMultiDiff, "26044", "YW"), _defineProperty(_oMultiDiff, "26080", "WM"), _defineProperty(_oMultiDiff, "26292", "PB"), _defineProperty(_oMultiDiff, "26333", "PB"), _defineProperty(_oMultiDiff, "26355", "ZY"), _defineProperty(_oMultiDiff, "26366", "CZ"), _defineProperty(_oMultiDiff, "26397", "ZC"), _defineProperty(_oMultiDiff, "26399", "QJ"), _defineProperty(_oMultiDiff, "26415", "ZS"), _defineProperty(_oMultiDiff, "26451", "SB"), _defineProperty(_oMultiDiff, "26526", "ZC"), _defineProperty(_oMultiDiff, "26552", "JG"), _defineProperty(_oMultiDiff, "26561", "TD"), _defineProperty(_oMultiDiff, "26588", "JG"), _defineProperty(_oMultiDiff, "26597", "CZ"), _defineProperty(_oMultiDiff, "26629", "ZS"), _defineProperty(_oMultiDiff, "26638", "YL"), _defineProperty(_oMultiDiff, "26646", "XQ"), _defineProperty(_oMultiDiff, "26653", "KG"), _defineProperty(_oMultiDiff, "26657", "XJ"), _defineProperty(_oMultiDiff, "26727", "HG"), _defineProperty(_oMultiDiff, "26894", "ZC"), _defineProperty(_oMultiDiff, "26937", "ZS"), _defineProperty(_oMultiDiff, "26946", "ZC"), _defineProperty(_oMultiDiff, "26999", "KJ"), _defineProperty(_oMultiDiff, "27099", "KJ"), _defineProperty(_oMultiDiff, "27449", "YQ"), _defineProperty(_oMultiDiff, "27481", "XS"), _defineProperty(_oMultiDiff, "27542", "ZS"), _defineProperty(_oMultiDiff, "27663", "ZS"), _defineProperty(_oMultiDiff, "27748", "TS"), _defineProperty(_oMultiDiff, "27784", "SC"), _defineProperty(_oMultiDiff, "27788", "ZD"), _defineProperty(_oMultiDiff, "27795", "TD"), _defineProperty(_oMultiDiff, "27812", "O"), _defineProperty(_oMultiDiff, "27850", "PB"), _defineProperty(_oMultiDiff, "27852", "MB"), _defineProperty(_oMultiDiff, "27895", "SL"), _defineProperty(_oMultiDiff, "27898", "PL"), _defineProperty(_oMultiDiff, "27973", "QJ"), _defineProperty(_oMultiDiff, "27981", "KH"), _defineProperty(_oMultiDiff, "27986", "HX"), _defineProperty(_oMultiDiff, "27994", "XJ"), _defineProperty(_oMultiDiff, "28044", "YC"), _defineProperty(_oMultiDiff, "28065", "WG"), _defineProperty(_oMultiDiff, "28177", "SM"), _defineProperty(_oMultiDiff, "28267", "QJ"), _defineProperty(_oMultiDiff, "28291", "KH"), _defineProperty(_oMultiDiff, "28337", "ZQ"), _defineProperty(_oMultiDiff, "28463", "TL"), _defineProperty(_oMultiDiff, "28548", "DC"), _defineProperty(_oMultiDiff, "28601", "TD"), _defineProperty(_oMultiDiff, "28689", "PB"), _defineProperty(_oMultiDiff, "28805", "JG"), _defineProperty(_oMultiDiff, "28820", "QG"), _defineProperty(_oMultiDiff, "28846", "PB"), _defineProperty(_oMultiDiff, "28952", "TD"), _defineProperty(_oMultiDiff, "28975", "ZC"), _defineProperty(_oMultiDiff, "29100", "A"), _defineProperty(_oMultiDiff, "29325", "QJ"), _defineProperty(_oMultiDiff, "29575", "SL"), _defineProperty(_oMultiDiff, "29602", "FB"), _defineProperty(_oMultiDiff, "30010", "TD"), _defineProperty(_oMultiDiff, "30044", "CX"), _defineProperty(_oMultiDiff, "30058", "PF"), _defineProperty(_oMultiDiff, "30091", "YSP"), _defineProperty(_oMultiDiff, "30111", "YN"), _defineProperty(_oMultiDiff, "30229", "XJ"), _defineProperty(_oMultiDiff, "30427", "SC"), _defineProperty(_oMultiDiff, "30465", "SX"), _defineProperty(_oMultiDiff, "30631", "YQ"), _defineProperty(_oMultiDiff, "30655", "QJ"), _defineProperty(_oMultiDiff, "30684", "QJG"), _defineProperty(_oMultiDiff, "30707", "SD"), _defineProperty(_oMultiDiff, "30729", "XH"), _defineProperty(_oMultiDiff, "30796", "LG"), _defineProperty(_oMultiDiff, "30917", "PB"), _defineProperty(_oMultiDiff, "31074", "NM"), _defineProperty(_oMultiDiff, "31085", "JZ"), _defineProperty(_oMultiDiff, "31109", "SC"), _defineProperty(_oMultiDiff, "31181", "ZC"), _defineProperty(_oMultiDiff, "31192", "MLB"), _defineProperty(_oMultiDiff, "31293", "JQ"), _defineProperty(_oMultiDiff, "31400", "YX"), _defineProperty(_oMultiDiff, "31584", "YJ"), _defineProperty(_oMultiDiff, "31896", "ZN"), _defineProperty(_oMultiDiff, "31909", "ZY"), _defineProperty(_oMultiDiff, "31995", "XJ"), _defineProperty(_oMultiDiff, "32321", "PF"), _defineProperty(_oMultiDiff, "32327", "ZY"), _defineProperty(_oMultiDiff, "32418", "HG"), _defineProperty(_oMultiDiff, "32420", "XQ"), _defineProperty(_oMultiDiff, "32421", "HG"), _defineProperty(_oMultiDiff, "32438", "LG"), _defineProperty(_oMultiDiff, "32473", "GJ"), _defineProperty(_oMultiDiff, "32488", "TD"), _defineProperty(_oMultiDiff, "32521", "QJ"), _defineProperty(_oMultiDiff, "32527", "PB"), _defineProperty(_oMultiDiff, "32562", "ZSQ"), _defineProperty(_oMultiDiff, "32564", "JZ"), _defineProperty(_oMultiDiff, "32735", "ZD"), _defineProperty(_oMultiDiff, "32793", "PB"), _defineProperty(_oMultiDiff, "33071", "PF"), _defineProperty(_oMultiDiff, "33098", "XL"), _defineProperty(_oMultiDiff, "33100", "YA"), _defineProperty(_oMultiDiff, "33152", "PB"), _defineProperty(_oMultiDiff, "33261", "CX"), _defineProperty(_oMultiDiff, "33324", "BP"), _defineProperty(_oMultiDiff, "33333", "TD"), _defineProperty(_oMultiDiff, "33406", "YA"), _defineProperty(_oMultiDiff, "33426", "WM"), _defineProperty(_oMultiDiff, "33432", "PB"), _defineProperty(_oMultiDiff, "33445", "JG"), _defineProperty(_oMultiDiff, "33486", "ZN"), _defineProperty(_oMultiDiff, "33493", "TS"), _defineProperty(_oMultiDiff, "33507", "QJ"), _defineProperty(_oMultiDiff, "33540", "QJ"), _defineProperty(_oMultiDiff, "33544", "ZC"), _defineProperty(_oMultiDiff, "33564", "XQ"), _defineProperty(_oMultiDiff, "33617", "YT"), _defineProperty(_oMultiDiff, "33632", "QJ"), _defineProperty(_oMultiDiff, "33636", "XH"), _defineProperty(_oMultiDiff, "33637", "YX"), _defineProperty(_oMultiDiff, "33694", "WG"), _defineProperty(_oMultiDiff, "33705", "PF"), _defineProperty(_oMultiDiff, "33728", "YW"), _defineProperty(_oMultiDiff, "33882", "SR"), _defineProperty(_oMultiDiff, "34067", "WM"), _defineProperty(_oMultiDiff, "34074", "YW"), _defineProperty(_oMultiDiff, "34121", "QJ"), _defineProperty(_oMultiDiff, "34255", "ZC"), _defineProperty(_oMultiDiff, "34259", "XL"), _defineProperty(_oMultiDiff, "34425", "JH"), _defineProperty(_oMultiDiff, "34430", "XH"), _defineProperty(_oMultiDiff, "34485", "KH"), _defineProperty(_oMultiDiff, "34503", "YS"), _defineProperty(_oMultiDiff, "34532", "HG"), _defineProperty(_oMultiDiff, "34552", "XS"), _defineProperty(_oMultiDiff, "34558", "YE"), _defineProperty(_oMultiDiff, "34593", "ZL"), _defineProperty(_oMultiDiff, "34660", "YQ"), _defineProperty(_oMultiDiff, "34892", "XH"), _defineProperty(_oMultiDiff, "34928", "SC"), _defineProperty(_oMultiDiff, "34999", "QJ"), _defineProperty(_oMultiDiff, "35048", "PB"), _defineProperty(_oMultiDiff, "35059", "SC"), _defineProperty(_oMultiDiff, "35098", "ZC"), _defineProperty(_oMultiDiff, "35203", "TQ"), _defineProperty(_oMultiDiff, "35265", "JX"), _defineProperty(_oMultiDiff, "35299", "JX"), _defineProperty(_oMultiDiff, "35782", "SZ"), _defineProperty(_oMultiDiff, "35828", "YS"), _defineProperty(_oMultiDiff, "35830", "E"), _defineProperty(_oMultiDiff, "35843", "TD"), _defineProperty(_oMultiDiff, "35895", "YG"), _defineProperty(_oMultiDiff, "35977", "MH"), _defineProperty(_oMultiDiff, "36158", "JG"), _defineProperty(_oMultiDiff, "36228", "QJ"), _defineProperty(_oMultiDiff, "36426", "XQ"), _defineProperty(_oMultiDiff, "36466", "DC"), _defineProperty(_oMultiDiff, "36710", "JC"), _defineProperty(_oMultiDiff, "36711", "ZYG"), _defineProperty(_oMultiDiff, "36767", "PB"), _defineProperty(_oMultiDiff, "36866", "SK"), _defineProperty(_oMultiDiff, "36951", "YW"), _defineProperty(_oMultiDiff, "37034", "YX"), _defineProperty(_oMultiDiff, "37063", "XH"), _defineProperty(_oMultiDiff, "37218", "ZC"), _defineProperty(_oMultiDiff, "37325", "ZC"), _defineProperty(_oMultiDiff, "38063", "PB"), _defineProperty(_oMultiDiff, "38079", "TD"), _defineProperty(_oMultiDiff, "38085", "QY"), _defineProperty(_oMultiDiff, "38107", "DC"), _defineProperty(_oMultiDiff, "38116", "TD"), _defineProperty(_oMultiDiff, "38123", "YD"), _defineProperty(_oMultiDiff, "38224", "HG"), _defineProperty(_oMultiDiff, "38241", "XTC"), _defineProperty(_oMultiDiff, "38271", "ZC"), _defineProperty(_oMultiDiff, "38415", "YE"), _defineProperty(_oMultiDiff, "38426", "KH"), _defineProperty(_oMultiDiff, "38461", "YD"), _defineProperty(_oMultiDiff, "38463", "AE"), _defineProperty(_oMultiDiff, "38466", "PB"), _defineProperty(_oMultiDiff, "38477", "XJ"), _defineProperty(_oMultiDiff, "38518", "YT"), _defineProperty(_oMultiDiff, "38551", "WK"), _defineProperty(_oMultiDiff, "38585", "ZC"), _defineProperty(_oMultiDiff, "38704", "XS"), _defineProperty(_oMultiDiff, "38739", "LJ"), _defineProperty(_oMultiDiff, "38761", "GJ"), _defineProperty(_oMultiDiff, "38808", "SQ"), _defineProperty(_oMultiDiff, "39048", "JG"), _defineProperty(_oMultiDiff, "39049", "XJ"), _defineProperty(_oMultiDiff, "39052", "HG"), _defineProperty(_oMultiDiff, "39076", "CZ"), _defineProperty(_oMultiDiff, "39271", "XT"), _defineProperty(_oMultiDiff, "39534", "TD"), _defineProperty(_oMultiDiff, "39552", "TD"), _defineProperty(_oMultiDiff, "39584", "PB"), _defineProperty(_oMultiDiff, "39647", "SB"), _defineProperty(_oMultiDiff, "39730", "LG"), _defineProperty(_oMultiDiff, "39748", "TPB"), _defineProperty(_oMultiDiff, "40109", "ZQ"), _defineProperty(_oMultiDiff, "40479", "ND"), _defineProperty(_oMultiDiff, "40516", "HG"), _defineProperty(_oMultiDiff, "40536", "HG"), _defineProperty(_oMultiDiff, "40583", "QJ"), _defineProperty(_oMultiDiff, "40765", "YQ"), _defineProperty(_oMultiDiff, "40784", "QJ"), _defineProperty(_oMultiDiff, "40840", "YK"), _defineProperty(_oMultiDiff, "40863", "QJG"), _oMultiDiff); //参数,中文字符串
  //返回值:拼音首字母串数组

  function makePy(str) {
    if (typeof str != "string") throw new Error(-1, "函数makePy需要字符串类型参数!");
    var arrResult = new Array(); //保存中间结果的数组

    for (var i = 0, len = str.length; i < len; i++) {
      //获得unicode码
      var ch = str.charAt(i); //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理

      arrResult.push(checkCh(ch));
    } //处理arrResult,返回所有可能的拼音首字母串数组


    return mkRslt(arrResult);
  }

  function checkCh(ch) {
    var uni = ch.charCodeAt(0); //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数

    if (uni > 40869 || uni < 19968) return ch; //dealWithOthers(ch);
    //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母

    return oMultiDiff[uni] ? oMultiDiff[uni] : strChineseFirstPY.charAt(uni - 19968);
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
          var tmp = tmpArr.slice(0); //把当前字符str[k]添加到每个元素末尾

          for (var j = 0; j < tmp.length; j++) {
            tmp[j] += str.charAt(k);
          } //把复制并修改后的数组连接到arrRslt上


          arrRslt = arrRslt.concat(tmp);
        }
      }
    }

    return arrRslt;
  } //两端去空格函数


  String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  };

  var pinyin = {};
  pinyin.makePy = makePy; //var mainpanel;
  //var opts;

  var element = layui.element,
      win = window,
      doc = document;

  function loading() {
    var index = layer.load(2, {
      shade: [0.6, '#fff'] //0.1透明度的白色背景

    });
    return function () {
      layer.close(index);
    };
  }

  var plgSidebar = function plgSidebar(ele, options) {
    var _this = this;

    var ClassMain = {
      dom: null,
      documentPanel: null,
      meunPanelThis: null,
      template: function template(meunPanelThis) {
        var _getData = this.meunPanelThis.getData.parentData;

        if (!_getData) {
          _getData = [];
          console.error("没有数据");
        }

        var renderNav = this.mainNav(_getData);
        var opts = this.opes;
        var tml = $("<div class=\"plg-sidebar\">\n                  \n    <div class=\"main-nav\">\n        <div id=\"meunSoroll\" class=\"layui-side-scroll\">\n\n                <div class=\"plg-logo\" >\n                <a class=\"logo-path ".concat(opts.logo == 'plg' && 'plg-logo', "\" ></a>\n                \n                <i id=\"plg-logo-fold\" class=\"anticon layui-icon layui-icon-shrink-right\"></i>\n                \n                </div>    \n            <!-- \u5DE6\u4FA7\u5BFC\u822A\u533A\u57DF\uFF08\u53EF\u914D\u5408layui\u5DF2\u6709\u7684\u5782\u76F4\u5BFC\u822A\uFF09 -->\n            <div class=\"pr-open\" data-type=\"hoot-click\">\n                <div class=\"layui-layer-setwin\">\n                    <a class=\"layui-icon layui-icon-close\" href=\"javascript:;\"></a>\n                </div>\n                <div class=\"pr-search\">\n                       <span class=\"pr-icon-search-wrapper\"><i class=\"layui-icon layui-icon-search\n\"></i></span>\n\n                    <input type=\"text\" id=\"selectInput\" class=\"pr-search-input\" placeholder=\"\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\">\n\n                    <div class=\"search-tip\">\n                        <p><span>\u4EE5\u4E0B\u662F\u4E0E\u201C<strong></strong>\u201D\u76F8\u5173\u7684\u4EA7\u54C1\uFF1A</span></p></div>\n\n                </div>\n                <div class=\"pr-left\">\n                    <div id=\"keyUpList\" class=\"keyUpList\"></div>\n                    <div class=\"pr-meungroup-list\">\n                    </div>\n                </div>\n                <div class=\"pr-right\">\n                    <div class=\"scroll-nav\">\n                        <ul class=\"right-sidebar\">\n\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"product-all\" data-type=\"hoot-click\">\n                          <span class=\"icon-box\">\n                                 <i class=\"icon iconfont p-icon-all\"></i>\n                          </span>\n                <span class=\"meun-name\">\n                             <a class=\"\" href=\"javascript:;\">\u6240\u6709\u670D\u52A1</a>\n                             <i class=\"right-mover layui-icon layui-icon-right\n\"></i>\n                         </span>\n            </div>\n            <div class=\"nav-last\" data-type=\"hoot-click\">\n                <ul id=\"sidebar\" class=\"sidebar\">\n                    ").concat(renderNav, "\n                </ul>\n                <div class=\"nav-hover-child\" >\n                <!-- \u4E8C\u7EA7\u83DC\u5355 -->\n                <div class=\"layui-side\">\n                        <!--<div class=\"nav-title\"></div>-->\n                        <ul class=\"body-nav\" lay-filter=\"test\"></ul>\n                \n                     </div>\n                 </div>\n\n            </div>\n\n        </div>\n    </div>\n   \n</div>\n"));
        return tml;
      },
      mainNav: function mainNav(parentData) {
        var _this = this;

        var ele = ""; // !item.leaf

        if (!parentData[0]) {
          parentData[0] = [];
          console.error("数据加载失败");
        }

        parentData[0].filter(function (item) {
          if (item.parentMenuId === "0") {
            // language=HTML
            ele += "\n                        <li class=\"s-item\" id=".concat(item.id, " menu-id=").concat(item.menuId, ">\n                               <span class=\"icon-box\">\n                                 <i class=\"").concat(item.imagePath, "\"></i>\n                             </span>\n                              <span class=\"meun-name\"><a href=\"").concat(!item.leaf ? "javascript:;" : item.path, "\">").concat(item.name, "</a></span>\n                         </li>                    \n                            \n                      ");
          }
        });
        return ele;
      },
      resetOpenMenuList: function resetOpenMenuList(ele, data) {
        var _this = this;

        var group = $("<div class=\"pr-meun-group\"></div><div class=\"pr-meun-group\"></div><div class=\"pr-meun-group\"></div>"); //插入右边的导航

        $(_this.documentPanel[0]).find(".right-sidebar").html("").append(_this.mainNav(data));
        data[0].forEach(function (item, inxex) {
          var ele = "<div class=\"list-item\" id=".concat(item.menuId, "><a href=\"").concat(!item.leaf ? 'javascript:;' : item.path, "\" menu-id=").concat(item.menuId, " parentmenuid=").concat(item.parentMenuId, " class=\"list-title\">").concat(item.name, "</a>");
          data[item.menuId] && data[item.menuId].forEach(function (citem) {
            ele += "<div class=\"menu-text\">\n                                            <a href=".concat(citem.path || "javascript:;", "\n                                             menu-id=").concat(citem.menuId, "\n                                             parentmenuid=").concat(citem.parentMenuId, "\n                                             leaf=").concat(citem.leaf, "                                     \n                                             >\n                                             ").concat(citem.name, "\n                                            </a>\n                        </div>");

            if (data[citem.menuId]) {
              data[citem.menuId].forEach(function (ditem) {
                ele += "<div class=\"menu-text\">\n                                                 <a href=".concat(ditem.path || "javascript:;", " \n                                                  menu-id=").concat(ditem.menuId, " \n                                                  parentmenuid=").concat(ditem.parentMenuId, "\n                                                  leaf=").concat(ditem.leaf, ">\n                                                    ").concat(ditem.name, "\n                                                    </a>\n                                                 </div>");
              });
            }
          });
          ele += "</div>";

          if (inxex % 3 === 0) {
            group.eq(0).append(ele);
          } else if (inxex % 3 === 1) {
            group.eq(1).append(ele);
          } else if (inxex % 3 === 2) {
            group.eq(2).append(ele);
          }
        });
        group.find(".menu-text>a[leaf='false']").hide();
        ele.append(group);
      },
      setOpenAll: function setOpenAll(getData) {
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
              ele += "<div class=\"pr-meun-group\">\n                                    <div class=\"list-item\">\n                                        <div class=\"menu-text\">\n                                            <a href=".concat(item.path || "javascript:;", " >\n                                             ").concat(item.name, "\n                                            </a>\n                                         </div>\n                                         </div>\n                                    </div>");
            }
          }

          list.hide();
          keyUpList.html("").show().append(ele);
        });
      },
      //获取菜单top值
      meunTopObj: function meunTopObj(obj) {
        var _this = this;

        var list = _this.dom.meungroupList.find(".list-item");

        obj = {};
        list.each(function (index, item) {
          var key = item.id;
          obj[key] = parseInt(item.offsetTop);
        });
        return obj;
      },
      removerShowList: function removerShowList() {
        var _this = this,
            list = _this.dom.meungroupList,
            _getData = _this.meunPanelThis.getData,
            parentDatas = _getData.parentData;

        _this.dom && this.dom.meunSoroll.removeClass("showList");
      },
      clickChild: function clickChild(callbakc) {
        var _this = this;

        var othis;
        var bodyNav = _this.dom.bodyNav; //ul

        var _getData = _this.meunPanelThis.getData; //点击二级菜单列表

        _this.dom.bodyNav.on("click", "a", function (e) {
          e.stopPropagation(); //阻止事件冒泡

          e.preventDefault();
          othis = $(this); //a

          var mid = othis.attr("menu-id");

          _this.dom.meungroupList.find("a[menu-id='" + mid + "']").trigger("click");
        }); //点击给展开所以菜单列表


        _this.dom.meungroupList.on("click", "a", function (e) {
          e.stopPropagation(); //阻止事件冒泡x

          e.preventDefault();
          othis = $(this);
          var mid = $(this).attr("menu-id");
          var bodyNav_this = bodyNav.find("a[menu-id='" + mid + "']"),
              //parents = $this.parents(".body-nav"),
          bodyNav_parent = bodyNav_this.parent(),
              //li
          bodyNav_child = bodyNav_this.siblings('.nav-child'),
              callbakcData = {
            getCurrent: _getData.mapAll[mid]
          };
          var pid = othis.parents(".list-item").attr("id"),
              leaf = _getData.mapAll[mid].leaf,
              href = othis.attr("href"); //右边的导航

          othis.parents(".pr-open").find(".right-sidebar .s-item[menu-id=" + pid + "] a").trigger("click");

          _this.updateChildMeun(pid, mid);

          if (leaf) {
            _this.dom.meunSoroll.find(".nav-last").attr("data-show", "");

            _this.removerShowList();
          }

          callbakc && callbakc(callbakcData, e);
        });
      },
      EventHanlder: function EventHanlder() {
        var _this = this;

        $(document).on("click", function () {
          _this.dom.meunSoroll.hasClass("showList") && _this.removerShowList();
        }); //控制菜单展开收缩

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

          if (_this.dom.bodyNav.find("li").length > 0) {
            $(this).attr("data-show", "show-child");
          }

          return;
        }, function () {
          $(this).attr("data-show", "");
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
              if ($(eve).parents(".pr-left").length > 0 || eve.nodeName != "A") return;

              if (eve.parentNode.className == "layui-layer-setwin") {
                _this.removerShowList();

                return;
              }

              var meunTop = _this.meunTopObj();

              var sItem = $(eve).parents(".s-item");
              var thisHref = sItem.attr("menu-id"),
                  list = $(".pr-meungroup-list").find(".list-item");
              sItem.addClass("active").siblings().removeClass("active");
              list.each(function () {
                $(this)[0].id == thisHref ? $(this).addClass("select") : $(this).removeClass("select");
              });

              for (var key in meunTop) {
                if (key == thisHref) {
                  $(".pr-left").animate({
                    scrollTop: meunTop[key]
                  });
                }
              }

              break;

            case "nav-last":
              //点一级菜单加载二级菜单
              var parents = $(eve).parents(".s-item"),
                  menuid = parents.attr("menu-id");
              if (!menuid) return;
              var leaf = Boolean(_this.meunPanelThis.getData.mapAll[menuid].leaf);

              _this.dom.meunSoroll.find(".nav-last").attr("data-show", "");

              _this.removerShowList();

              if ($(eve).parents("#sidebar").length > 0) {
                _this.dom.meungroupList.find("a[menu-id='" + menuid + "']").trigger("click");
              }

              if (leaf) {
                return;
              }

              ;
              setTimeout(function () {
                _this.dom.meunSoroll.find(".nav-last").attr("data-show", "show-child");
              }, 200);
              break;

            default:
              return false;
          }
        });

        var tabArray = [];
      },
      updateChildMeun: function updateChildMeun(pid, mid) {
        var _this = this,
            pid = pid,
            parNav = $("[menu-id=" + pid + "]");

        parNav.addClass("active").siblings().removeClass("active");
        var _getData = _this.meunPanelThis.getData;

        _this.dom.bodyNav.empty();

        if (pid) {
          if (_getData.mapAll[pid].leaf && _getData.mapAll[mid].parentMenuId == 0) {
            return;
          }

          var parentData = _getData.parentData;
          parentData[pid] && parentData[pid].forEach(function (item) {
            var oliClass = "item h-link";

            if (mid) {
              if (item.menuId == mid) {
                oliClass = "item h-link active-this itemeds";
              }
            }

            ;
            var oli = $("<li>", {
              "class": oliClass
            });
            var oa = $("<a>", {
              "href": item.path || "javascript:;",
              "menu-id": item.menuId,
              "leaf": item.leaf,
              "level": item.level,
              "id": item.id,
              "parentMenuId": item.parentMenuId
            }).text(item.name);
            oli.append(oa);

            if (!item.leaf && parentData[item.parentMenuId] && parentData[item.parentMenuId].length > 0) {
              var navchild = '<dl class="nav-child">';
              parentData[item.menuId] && parentData[item.menuId].forEach(function (citem) {
                navchild += "<dd class= ".concat(mid && citem.menuId == mid ? "active-this" : "", " ><a href=").concat(citem.path || "javascript:;", " leaf=").concat(citem.leaf, " \nmain-id=").concat(item.parentMenuId, " parentMenuId=").concat(citem.parentMenuId, " menu-id=").concat(citem.menuId, ">").concat(citem.name, "</a></dd>");
              });
              navchild += "</dl>";
              oa.append("<i class=\"right-mover layui-icon layui-icon-right\"></i>");
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
          });
        }

        ;
      },
      initPanel: function initPanel(meunPanelThis, opes) {
        var _this = this;

        _this.meunPanelThis = meunPanelThis;
        var _getData = _this.meunPanelThis.getData;
        _this.opes = opes;
        _this.documentPanel = _this.template(_this);
        if (_this.documentPanel) _this.dom = {
          documentPanel: _this.documentPanel,
          meunSoroll: _this.documentPanel.find("#meunSoroll"),
          bodyNav: _this.documentPanel.find(".body-nav"),
          meungroupList: _this.documentPanel.find(".pr-meungroup-list"),
          prLeft: _this.documentPanel.find(".pr-left"),
          $tabli: $(".layui-tab-title li"),
          $nav_hover_child: _this.documentPanel.find(".nav-hover-child")
        };

        _this.setOpenAll(_getData); //事件注册


        _this.EventHanlder();

        return _this.documentPanel;
      }
    };

    var getFun = function getFun() {
      return ClassMain;
    };

    _this.getFun = getFun();
    var config = {
      url: null,
      route: false,
      menuClick: null //获取数据入口

    };

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
    logo: null
  };

  plgSidebar.prototype.setMapData = function (url) {
    var closeLoad = loading();
    var dataAll,
        mapAll = null,
        parentData = null;

    function mapdata(dataAll) {
      /*  layer.load(0, {
           shade: true
       }); */
      var map = {};
      dataAll.forEach(function (item) {
        var parent = "";

        if (!map[item.parentMenuId]) {
          map[item.parentMenuId] = [];
        }

        map[item.parentMenuId].push(item);
      });
      return map;
    }

    var mapAll = {}; //    var token = window.localStorage.getItem("token");

    Prolog.syncAjax({
      type: 'get',
      url: url,

      /*     beforeSend: function (request) {
              if (token != null) {
                  request.setRequestHeader("Authorization", token);
              }
          }, */
      success: function success(res) {
        if (res.success) {
          dataAll = res.data;
          dataAll.forEach(function (item) {
            item.PY_code = pinyin.makePy(item.name)[0];
          });
          parentData = mapdata(dataAll);
          dataAll.forEach(function (item) {
            mapAll[item.menuId] = item;
          });
        }
      },
      error: function error(err) {
        //  closeLoad()
        //console.log(err)
        layer.msg("数据加载失败!");
      },
      dataType: 'json'
    });
    closeLoad();
    return {
      dataAll: dataAll,
      mapAll: mapAll,
      parentData: parentData
    };
  };
  /*    var closeLoad= loading();
  
     setTimeout(function(){
         closeLoad()
       //  layer.close(closeLoad)
     },2000) */


  plgSidebar.prototype.init = function (options) {
    var _this = this;

    var _class = this.getFun;

    if (_typeof(_this.options) === "object") {
      _this.opts = $.extend(true, _this.config, _this.options);

      if (_this.opts.url != "") {
        _this.getData = _this.setMapData(_this.opts.url);
        _this.getElement = _class.initPanel(_this, _this.opts);

        if (typeof _this.opts.menuClick === 'function') {
          _class.clickChild(_this.opts.menuClick);
        } else {
          _class.clickChild();
        }
      }
    }

    return this;
  }; //熏染模板到节点


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
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

(function ($) {
  var _oMultiDiff;

  var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY"; //此处收录了375个多音字

  var oMultiDiff = (_oMultiDiff = {
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
    "20911": "PF"
  }, _defineProperty(_oMultiDiff, "20504", "TC"), _defineProperty(_oMultiDiff, "20608", "KG"), _defineProperty(_oMultiDiff, "20854", "QJ"), _defineProperty(_oMultiDiff, "20857", "ZC"), _defineProperty(_oMultiDiff, "20911", "PF"), _defineProperty(_oMultiDiff, "20985", "AW"), _defineProperty(_oMultiDiff, "21032", "PB"), _defineProperty(_oMultiDiff, "21048", "XQ"), _defineProperty(_oMultiDiff, "21049", "SC"), _defineProperty(_oMultiDiff, "21089", "YS"), _defineProperty(_oMultiDiff, "21119", "JC"), _defineProperty(_oMultiDiff, "21242", "SB"), _defineProperty(_oMultiDiff, "21273", "SC"), _defineProperty(_oMultiDiff, "21305", "YP"), _defineProperty(_oMultiDiff, "21306", "QO"), _defineProperty(_oMultiDiff, "21330", "ZC"), _defineProperty(_oMultiDiff, "21333", "SDC"), _defineProperty(_oMultiDiff, "21345", "QK"), _defineProperty(_oMultiDiff, "21378", "CA"), _defineProperty(_oMultiDiff, "21397", "SC"), _defineProperty(_oMultiDiff, "21414", "XS"), _defineProperty(_oMultiDiff, "21442", "SC"), _defineProperty(_oMultiDiff, "21477", "JG"), _defineProperty(_oMultiDiff, "21480", "TD"), _defineProperty(_oMultiDiff, "21484", "ZS"), _defineProperty(_oMultiDiff, "21494", "YX"), _defineProperty(_oMultiDiff, "21505", "YX"), _defineProperty(_oMultiDiff, "21512", "HG"), _defineProperty(_oMultiDiff, "21523", "XH"), _defineProperty(_oMultiDiff, "21537", "PB"), _defineProperty(_oMultiDiff, "21542", "PF"), _defineProperty(_oMultiDiff, "21549", "KH"), _defineProperty(_oMultiDiff, "21571", "E"), _defineProperty(_oMultiDiff, "21574", "DA"), _defineProperty(_oMultiDiff, "21588", "TD"), _defineProperty(_oMultiDiff, "21589", "O"), _defineProperty(_oMultiDiff, "21618", "ZC"), _defineProperty(_oMultiDiff, "21621", "KHA"), _defineProperty(_oMultiDiff, "21632", "ZJ"), _defineProperty(_oMultiDiff, "21654", "KG"), _defineProperty(_oMultiDiff, "21679", "LKG"), _defineProperty(_oMultiDiff, "21683", "KH"), _defineProperty(_oMultiDiff, "21710", "A"), _defineProperty(_oMultiDiff, "21719", "YH"), _defineProperty(_oMultiDiff, "21734", "WOE"), _defineProperty(_oMultiDiff, "21769", "A"), _defineProperty(_oMultiDiff, "21780", "WN"), _defineProperty(_oMultiDiff, "21804", "XH"), _defineProperty(_oMultiDiff, "21834", "A"), _defineProperty(_oMultiDiff, "21899", "ZD"), _defineProperty(_oMultiDiff, "21903", "RN"), _defineProperty(_oMultiDiff, "21908", "WO"), _defineProperty(_oMultiDiff, "21939", "ZC"), _defineProperty(_oMultiDiff, "21956", "SA"), _defineProperty(_oMultiDiff, "21964", "YA"), _defineProperty(_oMultiDiff, "21970", "TD"), _defineProperty(_oMultiDiff, "22003", "A"), _defineProperty(_oMultiDiff, "22031", "JG"), _defineProperty(_oMultiDiff, "22040", "XS"), _defineProperty(_oMultiDiff, "22060", "ZC"), _defineProperty(_oMultiDiff, "22066", "ZC"), _defineProperty(_oMultiDiff, "22079", "MH"), _defineProperty(_oMultiDiff, "22129", "XJ"), _defineProperty(_oMultiDiff, "22179", "XA"), _defineProperty(_oMultiDiff, "22237", "NJ"), _defineProperty(_oMultiDiff, "22244", "TD"), _defineProperty(_oMultiDiff, "22280", "JQ"), _defineProperty(_oMultiDiff, "22300", "YH"), _defineProperty(_oMultiDiff, "22313", "XW"), _defineProperty(_oMultiDiff, "22331", "YQ"), _defineProperty(_oMultiDiff, "22343", "YJ"), _defineProperty(_oMultiDiff, "22351", "PH"), _defineProperty(_oMultiDiff, "22395", "DC"), _defineProperty(_oMultiDiff, "22412", "TD"), _defineProperty(_oMultiDiff, "22484", "PB"), _defineProperty(_oMultiDiff, "22500", "PB"), _defineProperty(_oMultiDiff, "22534", "ZD"), _defineProperty(_oMultiDiff, "22549", "DH"), _defineProperty(_oMultiDiff, "22561", "PB"), _defineProperty(_oMultiDiff, "22612", "TD"), _defineProperty(_oMultiDiff, "22771", "KQ"), _defineProperty(_oMultiDiff, "22831", "HB"), _defineProperty(_oMultiDiff, "22841", "JG"), _defineProperty(_oMultiDiff, "22855", "QJ"), _defineProperty(_oMultiDiff, "22865", "XQ"), _defineProperty(_oMultiDiff, "23013", "ML"), _defineProperty(_oMultiDiff, "23081", "WM"), _defineProperty(_oMultiDiff, "23487", "SX"), _defineProperty(_oMultiDiff, "23558", "QJ"), _defineProperty(_oMultiDiff, "23561", "YW"), _defineProperty(_oMultiDiff, "23586", "YW"), _defineProperty(_oMultiDiff, "23614", "YW"), _defineProperty(_oMultiDiff, "23615", "SN"), _defineProperty(_oMultiDiff, "23631", "PB"), _defineProperty(_oMultiDiff, "23646", "ZS"), _defineProperty(_oMultiDiff, "23663", "ZT"), _defineProperty(_oMultiDiff, "23673", "YG"), _defineProperty(_oMultiDiff, "23762", "TD"), _defineProperty(_oMultiDiff, "23769", "ZS"), _defineProperty(_oMultiDiff, "23780", "QJ"), _defineProperty(_oMultiDiff, "23884", "QK"), _defineProperty(_oMultiDiff, "24055", "XH"), _defineProperty(_oMultiDiff, "24113", "DC"), _defineProperty(_oMultiDiff, "24162", "ZC"), _defineProperty(_oMultiDiff, "24191", "GA"), _defineProperty(_oMultiDiff, "24273", "QJ"), _defineProperty(_oMultiDiff, "24324", "NL"), _defineProperty(_oMultiDiff, "24377", "TD"), _defineProperty(_oMultiDiff, "24378", "QJ"), _defineProperty(_oMultiDiff, "24439", "PF"), _defineProperty(_oMultiDiff, "24554", "ZS"), _defineProperty(_oMultiDiff, "24683", "TD"), _defineProperty(_oMultiDiff, "24694", "WE"), _defineProperty(_oMultiDiff, "24733", "LK"), _defineProperty(_oMultiDiff, "24925", "TN"), _defineProperty(_oMultiDiff, "25094", "ZG"), _defineProperty(_oMultiDiff, "25100", "XQ"), _defineProperty(_oMultiDiff, "25103", "XH"), _defineProperty(_oMultiDiff, "25153", "PB"), _defineProperty(_oMultiDiff, "25170", "PB"), _defineProperty(_oMultiDiff, "25179", "KG"), _defineProperty(_oMultiDiff, "25203", "PB"), _defineProperty(_oMultiDiff, "25240", "ZS"), _defineProperty(_oMultiDiff, "25282", "FB"), _defineProperty(_oMultiDiff, "25303", "NA"), _defineProperty(_oMultiDiff, "25324", "KG"), _defineProperty(_oMultiDiff, "25341", "ZY"), _defineProperty(_oMultiDiff, "25373", "WZ"), _defineProperty(_oMultiDiff, "25375", "XJ"), _defineProperty(_oMultiDiff, "25384", "A"), _defineProperty(_oMultiDiff, "25457", "A"), _defineProperty(_oMultiDiff, "25528", "SD"), _defineProperty(_oMultiDiff, "25530", "SC"), _defineProperty(_oMultiDiff, "25552", "TD"), _defineProperty(_oMultiDiff, "25774", "ZC"), _defineProperty(_oMultiDiff, "25874", "ZC"), _defineProperty(_oMultiDiff, "26044", "YW"), _defineProperty(_oMultiDiff, "26080", "WM"), _defineProperty(_oMultiDiff, "26292", "PB"), _defineProperty(_oMultiDiff, "26333", "PB"), _defineProperty(_oMultiDiff, "26355", "ZY"), _defineProperty(_oMultiDiff, "26366", "CZ"), _defineProperty(_oMultiDiff, "26397", "ZC"), _defineProperty(_oMultiDiff, "26399", "QJ"), _defineProperty(_oMultiDiff, "26415", "ZS"), _defineProperty(_oMultiDiff, "26451", "SB"), _defineProperty(_oMultiDiff, "26526", "ZC"), _defineProperty(_oMultiDiff, "26552", "JG"), _defineProperty(_oMultiDiff, "26561", "TD"), _defineProperty(_oMultiDiff, "26588", "JG"), _defineProperty(_oMultiDiff, "26597", "CZ"), _defineProperty(_oMultiDiff, "26629", "ZS"), _defineProperty(_oMultiDiff, "26638", "YL"), _defineProperty(_oMultiDiff, "26646", "XQ"), _defineProperty(_oMultiDiff, "26653", "KG"), _defineProperty(_oMultiDiff, "26657", "XJ"), _defineProperty(_oMultiDiff, "26727", "HG"), _defineProperty(_oMultiDiff, "26894", "ZC"), _defineProperty(_oMultiDiff, "26937", "ZS"), _defineProperty(_oMultiDiff, "26946", "ZC"), _defineProperty(_oMultiDiff, "26999", "KJ"), _defineProperty(_oMultiDiff, "27099", "KJ"), _defineProperty(_oMultiDiff, "27449", "YQ"), _defineProperty(_oMultiDiff, "27481", "XS"), _defineProperty(_oMultiDiff, "27542", "ZS"), _defineProperty(_oMultiDiff, "27663", "ZS"), _defineProperty(_oMultiDiff, "27748", "TS"), _defineProperty(_oMultiDiff, "27784", "SC"), _defineProperty(_oMultiDiff, "27788", "ZD"), _defineProperty(_oMultiDiff, "27795", "TD"), _defineProperty(_oMultiDiff, "27812", "O"), _defineProperty(_oMultiDiff, "27850", "PB"), _defineProperty(_oMultiDiff, "27852", "MB"), _defineProperty(_oMultiDiff, "27895", "SL"), _defineProperty(_oMultiDiff, "27898", "PL"), _defineProperty(_oMultiDiff, "27973", "QJ"), _defineProperty(_oMultiDiff, "27981", "KH"), _defineProperty(_oMultiDiff, "27986", "HX"), _defineProperty(_oMultiDiff, "27994", "XJ"), _defineProperty(_oMultiDiff, "28044", "YC"), _defineProperty(_oMultiDiff, "28065", "WG"), _defineProperty(_oMultiDiff, "28177", "SM"), _defineProperty(_oMultiDiff, "28267", "QJ"), _defineProperty(_oMultiDiff, "28291", "KH"), _defineProperty(_oMultiDiff, "28337", "ZQ"), _defineProperty(_oMultiDiff, "28463", "TL"), _defineProperty(_oMultiDiff, "28548", "DC"), _defineProperty(_oMultiDiff, "28601", "TD"), _defineProperty(_oMultiDiff, "28689", "PB"), _defineProperty(_oMultiDiff, "28805", "JG"), _defineProperty(_oMultiDiff, "28820", "QG"), _defineProperty(_oMultiDiff, "28846", "PB"), _defineProperty(_oMultiDiff, "28952", "TD"), _defineProperty(_oMultiDiff, "28975", "ZC"), _defineProperty(_oMultiDiff, "29100", "A"), _defineProperty(_oMultiDiff, "29325", "QJ"), _defineProperty(_oMultiDiff, "29575", "SL"), _defineProperty(_oMultiDiff, "29602", "FB"), _defineProperty(_oMultiDiff, "30010", "TD"), _defineProperty(_oMultiDiff, "30044", "CX"), _defineProperty(_oMultiDiff, "30058", "PF"), _defineProperty(_oMultiDiff, "30091", "YSP"), _defineProperty(_oMultiDiff, "30111", "YN"), _defineProperty(_oMultiDiff, "30229", "XJ"), _defineProperty(_oMultiDiff, "30427", "SC"), _defineProperty(_oMultiDiff, "30465", "SX"), _defineProperty(_oMultiDiff, "30631", "YQ"), _defineProperty(_oMultiDiff, "30655", "QJ"), _defineProperty(_oMultiDiff, "30684", "QJG"), _defineProperty(_oMultiDiff, "30707", "SD"), _defineProperty(_oMultiDiff, "30729", "XH"), _defineProperty(_oMultiDiff, "30796", "LG"), _defineProperty(_oMultiDiff, "30917", "PB"), _defineProperty(_oMultiDiff, "31074", "NM"), _defineProperty(_oMultiDiff, "31085", "JZ"), _defineProperty(_oMultiDiff, "31109", "SC"), _defineProperty(_oMultiDiff, "31181", "ZC"), _defineProperty(_oMultiDiff, "31192", "MLB"), _defineProperty(_oMultiDiff, "31293", "JQ"), _defineProperty(_oMultiDiff, "31400", "YX"), _defineProperty(_oMultiDiff, "31584", "YJ"), _defineProperty(_oMultiDiff, "31896", "ZN"), _defineProperty(_oMultiDiff, "31909", "ZY"), _defineProperty(_oMultiDiff, "31995", "XJ"), _defineProperty(_oMultiDiff, "32321", "PF"), _defineProperty(_oMultiDiff, "32327", "ZY"), _defineProperty(_oMultiDiff, "32418", "HG"), _defineProperty(_oMultiDiff, "32420", "XQ"), _defineProperty(_oMultiDiff, "32421", "HG"), _defineProperty(_oMultiDiff, "32438", "LG"), _defineProperty(_oMultiDiff, "32473", "GJ"), _defineProperty(_oMultiDiff, "32488", "TD"), _defineProperty(_oMultiDiff, "32521", "QJ"), _defineProperty(_oMultiDiff, "32527", "PB"), _defineProperty(_oMultiDiff, "32562", "ZSQ"), _defineProperty(_oMultiDiff, "32564", "JZ"), _defineProperty(_oMultiDiff, "32735", "ZD"), _defineProperty(_oMultiDiff, "32793", "PB"), _defineProperty(_oMultiDiff, "33071", "PF"), _defineProperty(_oMultiDiff, "33098", "XL"), _defineProperty(_oMultiDiff, "33100", "YA"), _defineProperty(_oMultiDiff, "33152", "PB"), _defineProperty(_oMultiDiff, "33261", "CX"), _defineProperty(_oMultiDiff, "33324", "BP"), _defineProperty(_oMultiDiff, "33333", "TD"), _defineProperty(_oMultiDiff, "33406", "YA"), _defineProperty(_oMultiDiff, "33426", "WM"), _defineProperty(_oMultiDiff, "33432", "PB"), _defineProperty(_oMultiDiff, "33445", "JG"), _defineProperty(_oMultiDiff, "33486", "ZN"), _defineProperty(_oMultiDiff, "33493", "TS"), _defineProperty(_oMultiDiff, "33507", "QJ"), _defineProperty(_oMultiDiff, "33540", "QJ"), _defineProperty(_oMultiDiff, "33544", "ZC"), _defineProperty(_oMultiDiff, "33564", "XQ"), _defineProperty(_oMultiDiff, "33617", "YT"), _defineProperty(_oMultiDiff, "33632", "QJ"), _defineProperty(_oMultiDiff, "33636", "XH"), _defineProperty(_oMultiDiff, "33637", "YX"), _defineProperty(_oMultiDiff, "33694", "WG"), _defineProperty(_oMultiDiff, "33705", "PF"), _defineProperty(_oMultiDiff, "33728", "YW"), _defineProperty(_oMultiDiff, "33882", "SR"), _defineProperty(_oMultiDiff, "34067", "WM"), _defineProperty(_oMultiDiff, "34074", "YW"), _defineProperty(_oMultiDiff, "34121", "QJ"), _defineProperty(_oMultiDiff, "34255", "ZC"), _defineProperty(_oMultiDiff, "34259", "XL"), _defineProperty(_oMultiDiff, "34425", "JH"), _defineProperty(_oMultiDiff, "34430", "XH"), _defineProperty(_oMultiDiff, "34485", "KH"), _defineProperty(_oMultiDiff, "34503", "YS"), _defineProperty(_oMultiDiff, "34532", "HG"), _defineProperty(_oMultiDiff, "34552", "XS"), _defineProperty(_oMultiDiff, "34558", "YE"), _defineProperty(_oMultiDiff, "34593", "ZL"), _defineProperty(_oMultiDiff, "34660", "YQ"), _defineProperty(_oMultiDiff, "34892", "XH"), _defineProperty(_oMultiDiff, "34928", "SC"), _defineProperty(_oMultiDiff, "34999", "QJ"), _defineProperty(_oMultiDiff, "35048", "PB"), _defineProperty(_oMultiDiff, "35059", "SC"), _defineProperty(_oMultiDiff, "35098", "ZC"), _defineProperty(_oMultiDiff, "35203", "TQ"), _defineProperty(_oMultiDiff, "35265", "JX"), _defineProperty(_oMultiDiff, "35299", "JX"), _defineProperty(_oMultiDiff, "35782", "SZ"), _defineProperty(_oMultiDiff, "35828", "YS"), _defineProperty(_oMultiDiff, "35830", "E"), _defineProperty(_oMultiDiff, "35843", "TD"), _defineProperty(_oMultiDiff, "35895", "YG"), _defineProperty(_oMultiDiff, "35977", "MH"), _defineProperty(_oMultiDiff, "36158", "JG"), _defineProperty(_oMultiDiff, "36228", "QJ"), _defineProperty(_oMultiDiff, "36426", "XQ"), _defineProperty(_oMultiDiff, "36466", "DC"), _defineProperty(_oMultiDiff, "36710", "JC"), _defineProperty(_oMultiDiff, "36711", "ZYG"), _defineProperty(_oMultiDiff, "36767", "PB"), _defineProperty(_oMultiDiff, "36866", "SK"), _defineProperty(_oMultiDiff, "36951", "YW"), _defineProperty(_oMultiDiff, "37034", "YX"), _defineProperty(_oMultiDiff, "37063", "XH"), _defineProperty(_oMultiDiff, "37218", "ZC"), _defineProperty(_oMultiDiff, "37325", "ZC"), _defineProperty(_oMultiDiff, "38063", "PB"), _defineProperty(_oMultiDiff, "38079", "TD"), _defineProperty(_oMultiDiff, "38085", "QY"), _defineProperty(_oMultiDiff, "38107", "DC"), _defineProperty(_oMultiDiff, "38116", "TD"), _defineProperty(_oMultiDiff, "38123", "YD"), _defineProperty(_oMultiDiff, "38224", "HG"), _defineProperty(_oMultiDiff, "38241", "XTC"), _defineProperty(_oMultiDiff, "38271", "ZC"), _defineProperty(_oMultiDiff, "38415", "YE"), _defineProperty(_oMultiDiff, "38426", "KH"), _defineProperty(_oMultiDiff, "38461", "YD"), _defineProperty(_oMultiDiff, "38463", "AE"), _defineProperty(_oMultiDiff, "38466", "PB"), _defineProperty(_oMultiDiff, "38477", "XJ"), _defineProperty(_oMultiDiff, "38518", "YT"), _defineProperty(_oMultiDiff, "38551", "WK"), _defineProperty(_oMultiDiff, "38585", "ZC"), _defineProperty(_oMultiDiff, "38704", "XS"), _defineProperty(_oMultiDiff, "38739", "LJ"), _defineProperty(_oMultiDiff, "38761", "GJ"), _defineProperty(_oMultiDiff, "38808", "SQ"), _defineProperty(_oMultiDiff, "39048", "JG"), _defineProperty(_oMultiDiff, "39049", "XJ"), _defineProperty(_oMultiDiff, "39052", "HG"), _defineProperty(_oMultiDiff, "39076", "CZ"), _defineProperty(_oMultiDiff, "39271", "XT"), _defineProperty(_oMultiDiff, "39534", "TD"), _defineProperty(_oMultiDiff, "39552", "TD"), _defineProperty(_oMultiDiff, "39584", "PB"), _defineProperty(_oMultiDiff, "39647", "SB"), _defineProperty(_oMultiDiff, "39730", "LG"), _defineProperty(_oMultiDiff, "39748", "TPB"), _defineProperty(_oMultiDiff, "40109", "ZQ"), _defineProperty(_oMultiDiff, "40479", "ND"), _defineProperty(_oMultiDiff, "40516", "HG"), _defineProperty(_oMultiDiff, "40536", "HG"), _defineProperty(_oMultiDiff, "40583", "QJ"), _defineProperty(_oMultiDiff, "40765", "YQ"), _defineProperty(_oMultiDiff, "40784", "QJ"), _defineProperty(_oMultiDiff, "40840", "YK"), _defineProperty(_oMultiDiff, "40863", "QJG"), _oMultiDiff); //参数,中文字符串
  //返回值:拼音首字母串数组

  function makePy(str) {
    if (typeof str != "string") throw new Error(-1, "函数makePy需要字符串类型参数!");
    var arrResult = new Array(); //保存中间结果的数组

    for (var i = 0, len = str.length; i < len; i++) {
      //获得unicode码
      var ch = str.charAt(i); //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理

      arrResult.push(checkCh(ch));
    } //处理arrResult,返回所有可能的拼音首字母串数组


    return mkRslt(arrResult);
  }

  function checkCh(ch) {
    var uni = ch.charCodeAt(0); //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数

    if (uni > 40869 || uni < 19968) return ch; //dealWithOthers(ch);
    //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母

    return oMultiDiff[uni] ? oMultiDiff[uni] : strChineseFirstPY.charAt(uni - 19968);
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
          var tmp = tmpArr.slice(0); //把当前字符str[k]添加到每个元素末尾

          for (var j = 0; j < tmp.length; j++) {
            tmp[j] += str.charAt(k);
          } //把复制并修改后的数组连接到arrRslt上


          arrRslt = arrRslt.concat(tmp);
        }
      }
    }

    return arrRslt;
  } //两端去空格函数


  String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  };

  var pinyin = {};
  pinyin.makePy = makePy;
  var element = layui.element,
      win = window,
      doc = document;

  function filterData(pid, Data) {
    return Object.values(Data).filter(function (item) {
      return item.parentMenuId == pid;
    });
  }

  function mapResetOpenMenuList(mapData) {
    var index = 0;
    var group = $("<div class=\"pr-meun-group\"></div><div class=\"pr-meun-group\"></div><div class=\"pr-meun-group\"></div>");
    var treeData = filterData("0", mapData); //递归

    var recursive = function recursive(pid) {
      var str = "";
      var child = filterData(pid, mapData);
      child.forEach(function (ditem) {
        str += "<div class=\"menu-text\" py-code=".concat(ditem.PY_code, ">\n                  <a href=").concat(ditem.hash ? "#" + ditem.hash : "javascript:;", "\n                   parentmenu-id=").concat(ditem.parentMenuId, "\n                   menu-id=").concat(ditem.menuId, "\n                   leaf=").concat(ditem.leaf, ">\n                   ").concat(ditem.name, "</a>\n                 </div>");
        if (!ditem.leaf) str += recursive(ditem.menuId);
      });
      return str;
    };

    for (var key in treeData) {
      var ele = "<div class=\"list-item ".concat(treeData[key].isActive ? "select" : '', "\" id=").concat(treeData[key].menuId, ">\n                    <a menu-id=").concat(treeData[key].menuId, " parentmenu-id=").concat(treeData[key].parentMenuId, " class=\"list-title\">\n                      ").concat(treeData[key].name, "</a>"); //遍历二级菜单

      ele += recursive(treeData[key].menuId);
      ele += "</div>";

      if (index % 3 === 0) {
        group.eq(0).append(ele);
      } else if (index % 3 === 1) {
        group.eq(1).append(ele);
      } else if (index % 3 === 2) {
        group.eq(2).append(ele);
      }

      index++;
    }

    $(group).find(".menu-text>a[leaf='false']").hide();
    return $(group);
  } //渲染一级菜单
  //渲染二级和三级菜单


  function mapUpdateChildrenNan(id, mapData, dom) {
    //  vipspa.indexId=id;
    var parent = mapData[mapData[id].parentMenuId];

    if (parent) {
      if (parent.parentMenuId !== "0") {
        parent = mapData[parent.parentMenuId];
      }
    } else {
      parent = mapData[id];
    }

    function tree(pid) {
      var data = [];
      Object.values(mapData).forEach(function (item) {
        if (pid == item.parentMenuId) {
          data.push(item);

          if (!item.leaf) {
            return item.children = tree(item.menuId);
          }
        }
      });
      return data;
    }

    parent.children = tree(parent.menuId);
    var treeData = parent;
    var sidebarLi = "<ul class=\"body-nav\" parentmenu-id=".concat(parent.menuId, " name=").concat(parent.name, ">");
    treeData = treeData.children;

    for (var key in treeData) {
      sidebarLi += "<li class=\"item h-link ".concat(treeData[key].isActive ? "active-this" : '', " ").concat(treeData[key].isActive && treeData[key].children ? "itemeds" : '', "\">\n            <a href=\"").concat(treeData[key].blank ? treeData[key].path : treeData[key].hash ? "#" + treeData[key].hash : "javascript:;", "\"  ").concat(treeData[key].blank ? "target=_blank" : "", " menu-id=").concat(treeData[key].menuId, " leaf=\"").concat(treeData[key].leaf, "\" level=\"").concat(treeData[key].level, "\">").concat(treeData[key].name, "\n            ").concat(treeData[key].children && !treeData[key].leaf ? "<i class=\"right-mover layui-icon layui-icon-right\"></i>" : '', " \n            </a>\n            ").concat(treeData[key].children && !treeData[key].leaf ? "<dl class=\"nav-child\" parentmenu-id=".concat(treeData[key].menuId, ">            \n                        ").concat(treeData[key].children.map(function (childItem, index, arr) {
        return "<dd ".concat(childItem.isActive ? "class=\"active-this\"" : '', ">\n                            <a href=").concat(childItem.blank ? childItem.path : childItem.hash ? "#" + childItem.hash : "javascript:;", "\n                            ").concat(childItem.blank ? "target=_blank" : "", " leaf=").concat(childItem.leaf, " menu-id=").concat(childItem.menuId, "  level=").concat(childItem.level, ">").concat(childItem.name, "</a></dd>");
      }).join(""), "          \n                  </dl>") : '', " \n            </li>");
    }

    sidebarLi += "</ul>";
    dom && dom.bodyNav.html(sidebarLi);
    return sidebarLi;
  } //摸版
  //渲染一级菜单


  function mapUpdateMainNav(mapData) {
    var sidebarLi = "";
    Object.values(mapData).filter(function (item) {
      if (item.parentMenuId == "0") {
        sidebarLi += "<li class=\"s-item ".concat(item.isActive ? "active" : '', "\">\n                <span class=\"icon-box\"><i class=\"").concat(item.imagePath, "\"></i></span>\n                <span class=\"meun-name\"><a href=\"").concat(item.leaf ? "#" + item.hash : "javascript:;", "\"  menu-id=").concat(item.menuId, ">").concat(item.name, "</a></span>\n                </li>");
      } else {
        return;
      }
    });
    return sidebarLi;
  }

  function TemplateMap(mapData, opts) {
    if (!mapData) {
      mapData = [];
    } //一级菜单


    var sidebarLi = mapUpdateMainNav(mapData); //打开全部的菜单

    var group = mapResetOpenMenuList(mapData); //   console.log(vipspa.indexId)

    var tpl = $("<div class=\"plg-sidebar\">                          \n            <div class=\"main-nav\">\n                <div id=\"meunSoroll\" class=\"layui-side-scroll\">\n                        <div class=\"plg-logo\" >\n                        <a class=\"logo-path ".concat(opts.logo == 'plg' && 'plg-logo', "\" ></a>            \n                        <i id=\"plg-logo-fold\" class=\"anticon layui-icon layui-icon-shrink-right\"></i>          \n                        </div>    \n                    <!-- \u5DE6\u4FA7\u6253\u5F00\u5168\u90E8\u5BFC\u822A\u533A\u57DF -->\n                    <div class=\"pr-open\" data-type=\"hoot-click\">\n                        <div class=\"layui-layer-setwin\">\n                            <a class=\"layui-icon layui-icon-close\" href=\"javascript:;\"></a>\n                        </div>\n                        <div class=\"pr-search\">\n                            <span class=\"pr-icon-search-wrapper\"><i class=\"layui-icon layui-icon-search\n            \"></i></span>\n\n                            <input type=\"text\" id=\"selectInput\" class=\"pr-search-input\" placeholder=\"\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\">\n                            <div class=\"search-tip\">\n                                <p><span>\u4EE5\u4E0B\u662F\u4E0E\u201C<strong></strong>\u201D\u76F8\u5173\u7684\u4EA7\u54C1\uFF1A</span></p></div>\n\n                        </div>\n                        <div class=\"pr-left\">\n                            <div id=\"keyUpList\" class=\"keyUpList\"></div>\n                            <div class=\"pr-meungroup-list\">\n                                <!-- \u5168\u90E8\u83DC\u5355\u5217\u8868--->\n                         \n                                \n                            </div>\n                        </div>\n                        <div class=\"pr-right\">\n                            <div class=\"scroll-nav\">\n                                <ul class=\"right-sidebar\">\n                                     ").concat(sidebarLi, "\n\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"product-all\" data-type=\"hoot-click\">\n                                <span class=\"icon-box\">\n                                        <i class=\"icon iconfont p-icon-all\"></i>\n                                </span>\n                        <span class=\"meun-name\">\n                                    <a  href=\"javascript:;\">\u6240\u6709\u670D\u52A1</a>\n                                    <i class=\"right-mover layui-icon layui-icon-right\n            \"></i>\n                                </span>\n                    </div>\n                    <div class=\"nav-last\" data-show=\"\">\n                        <ul id=\"sidebar\" class=\"sidebar\">\n                           <!--\u4E00\u7EA7\u83DC\u5355-->\n                           ").concat(sidebarLi, "\n                        </ul>\n                     <div class=\"nav-hover-child\" >\n                        <!-- \u4E8C\u7EA7\u83DC\u5355 -->\n                        <div class=\"layui-side\">                 \n                        \n                                      <!-- \u5F53\u524Dhover\u4E8C\u7EA7\u83DC\u5355\u5217\u8868--->\n                                      ").concat(vipspa.indexId ? mapUpdateChildrenNan(vipspa.indexId, mapData) : "", "\n                                                                   \n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            </div>\n            ")); //       

    tpl.find(".pr-meungroup-list").append(group);
    return $(tpl);
  }

  var plgSidebar = function plgSidebar(options) {
    var _this = this;

    _this.options = options;
    var config = {
      renderer: null,
      url: null,
      ajaxInit: {
        url: null,
        type: "get",
        dataType: "json"
      },
      logo: "",
      route: false,
      menuClick: null //获取数据入口

    };
    _this.options = $.extend(true, config, _this.options); //获取数据

    var loaddata = LoadData.call(this, _this.options.ajaxInit); //   vipspa.treeData = loaddata.treeData;

    Object.defineProperties(vipspa, {
      mapData: {
        get: function get(val) {
          return loaddata.mapData;
        },
        set: function set(newValue) {
          try {
            vipspa.indexId = vipspa.routerMap[vipspa.parse(location.hash).url].menuId;
          } catch (e) {
            console.error(e);
            console.error("vipspa.router.defaults:hash of error"); // ...
          } finally {
            _this.document = TemplateMap(newValue, _this.options);

            _this.init(_this.document);

            if (_this.options.renderer) {
              _this.renderTo(_this.options.renderer);
            }
          }
        }
      }
    }); // loaddata.treeData[_this.options.index].isActive=true;
    // vipspa.treeData=loaddata.treeData ;
    //   vipspa.mapData=loaddata.mapData;
  }; //事件监听


  function EventHanlder(dom) {
    var _this = this;

    var opts = this.options; //   var treeData= vipspa.treeData;

    var mapData = vipspa.mapData;
    $(document).on("click", function () {
      dom.meunSoroll.hasClass("showList") && removerShowList(dom.meunSoroll);
    }); //控制菜单展开收缩

    dom.logoFold.click(function (event) {
      if ($(this).hasClass("layui-icon-shrink-right")) {
        $(this).removeClass("layui-icon-shrink-right").addClass("layui-icon-spread-left");
        $("body").addClass("plg-open-hover");
      } else {
        $(this).removeClass("layui-icon-spread-left").addClass("layui-icon-shrink-right");
        $("body").removeClass("plg-open-hover");
      }
    }); //控制菜单hover

    dom.navLast.hover(function (event) {
      var id = $(this).find("li.s-item.active a").attr("menu-id");

      if (id && vipspa.mapData[id].leaf) {
        dom.navLast.attr("data-show", "");
        return;
      }

      removerShowList(dom.meunSoroll);
      $(this).attr("data-show", "show-child");
    }, function () {
      $(this).attr("data-show", "");
    }); //打开所有菜单点击事件

    dom.prLeft.on("click", ".menu-text > a", function (event) {
      event.preventDefault();
      location.hash = $(this).attr("href");
      var id = $(this).attr("menu-id");
      var pid = $(this).attr("parentmenu-id");

      function result(pid) {
        var obj = mapData[pid];

        if (obj.parentMenuId !== "0") {
          return result(obj.parentMenuId);
        }

        ;
        mapUpdateChildrenNan(id, mapData, dom);
        var slfe = dom.bodyNav.find("a[menu-id='".concat(id, "']")); // arr.unshift(slfe.text().replace(/[\ \r\n]/g,""));

        if (slfe.parent().is("dd")) {
          //arr.unshift(slfe.parents("dl.nav-child").prev().text().replace(/[\ \r\n]/g,""))
          slfe.parents("li.item ").addClass("itemeds");
          slfe.parents("dl.nav-child").show();
        } //arr.unshift(slfe.parents(".body-nav").attr("name").replace(/[\ \r\n]/g,""))  


        slfe.parent().addClass("active-this").siblings().removeClass("active-this");
        return pid;
      }

      pid = result(pid);
      removerShowList(dom.meunSoroll);
    }); //一级菜单事件

    dom.sidebar.on("click", "li", function (event) {
      var id = $(this).find("a").attr("menu-id");
      var i = $(this).index(); // dom.sidebar.empty().append(updateMainNav(treeData))

      $(this).addClass("active").siblings().removeClass("active");
      opts.index = i;

      if (vipspa.mapData[id].leaf) {
        dom.navLast.attr("data-show", "");
        location.hash = $(this).find("a").attr("href");
        return;
      }

      event.preventDefault();
      dom.navLast.attr("data-show", "");
      mapUpdateChildrenNan(id, mapData, dom);
      setTimeout(function () {
        dom.navLast.attr("data-show", "show-child");
      }, 200);
    }); //点击二级hover菜单事件

    dom.bodyNav.on("click", "li>a", function (event) {
      event.stopPropagation(); //阻止事件冒泡

      var slfe = $(this),
          leaf = slfe.attr("leaf") == "true",
          child = slfe.siblings("dl.nav-child");
      slfe.parent().addClass("active-this").siblings().removeClass("active-this").find('dd').removeClass("active-this").removeClass("itemeds");
      opts.menuClick && opts.menuClick(slfe);

      if (slfe.parent().is("dd")) {
        slfe.parents("li.item").addClass("active-this").siblings().removeClass("active-this").removeClass("itemeds");
      } //如果是二级菜单


      if (!leaf && child.length > 0) {
        slfe.parent().addClass("active-this").siblings().removeClass("active-this").removeClass("itemeds");
        child.slideToggle("fast");
        slfe.parent().toggleClass("itemeds").siblings().children('.nav-child').slideUp();
        return false;
      }

      if ($(this).attr("target") == "_blank") {
        return;
      }

      if ($(this).attr("href") !== "javascript:;") {
        location.hash = $(this).attr("href"); //  vipspa.indexId=slfe.attr("menu-id");
      } else {
        event.preventDefault();
      } //  var arr=[];itemeds

    });
    dom.meunSoroll.on("click", "[data-type='hoot-click']", function (event) {
      event.stopPropagation(); //阻止事件冒泡

      event.preventDefault();
      var eve = event.target;

      switch ($(this).attr("class")) {
        case "product-all":
          //关闭 小X
          dom.meunSoroll.toggleClass("showList");
          break;

        case "pr-open":
          //滚动
          eve.parentNode.className == "layui-layer-setwin" && removerShowList(dom.meunSoroll);
          var meunTop = meunTopObj(dom.meungroupList);
          var sItem = $(eve).parents(".s-item");
          var thisHref = sItem.find("a").attr("menu-id"),
              list = dom.meungroupList.find(".list-item");
          sItem.addClass("active").siblings().removeClass("active");
          list.each(function () {
            $(this)[0].id == thisHref ? $(this).addClass("select") : $(this).removeClass("select");
          });

          for (var key in meunTop) {
            if (key == thisHref) {
              $(".pr-left").animate({
                scrollTop: meunTop[key]
              });
            }
          }

          break;

        default:
          return false;
      }
    });
  } //搜索条事件


  function setOpenKeyup(dom) {
    var regCH = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    var keyUpList = dom.prLeft.find("#keyUpList");
    var list = dom.meungroupList.find(".menu-text");
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
          keyUpList.append("<div class=\"pr-meun-group\"><div class=\"list-item\">".concat(item.outerHTML, "</div></div>"));
        }
      });
    });
  }

  ; //获取菜单top值

  function meunTopObj(meungroupList) {
    var _this = this;

    var list = meungroupList.find(".list-item");
    var obj = {};
    list.each(function (index, item) {
      var key = item.id;
      obj[key] = parseInt(item.offsetTop);
    });
    return obj;
  }

  ;

  function removerShowList(dom, className) {
    if (!className) {
      className = "showList";
    }

    dom.removeClass(className);
  }

  plgSidebar.prototype.init = function (document) {
    var _this = this;

    var $dom = {
      sidebar: document.find("#sidebar"),
      logoFold: document.find("#plg-logo-fold"),
      meunSoroll: document.find("#meunSoroll"),
      navLast: document.find("#meunSoroll .nav-last"),
      bodyNav: document.find(".nav-hover-child .layui-side"),
      meungroupList: document.find(".pr-meungroup-list"),
      prLeft: document.find(".pr-left"),
      nav_hover_child: document.find(".nav-hover-child") //事件注册

    };
    EventHanlder.call(_this, $dom);
    setOpenKeyup($dom);
    return _this;
  }; //熏染模板到节点


  plgSidebar.prototype.renderTo = function (domId) {
    this.options.renderer = domId;
    $("#" + this.options.renderer).empty().append(this.document);
    return this;
  }; //请求数据


  function LoadData(object) {
    var _this = this;

    var routeSetting = {};
    var close = PlgDialog.loading2();
    var treedata;
    object.success = function (response) {
      if (response.success) {
        var resultName = function resultName(mid) {
          var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var idarr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
          var mapData = treedata.mapData;
          var item = mapData[mid];
          arr.unshift(item.name);
          idarr.unshift(item.menuId);

          if (item.parentMenuId != 0) {
            return resultName(item.parentMenuId, arr, idarr);
          }

          return {
            arr: arr,
            idarr: idarr
          };
        }; //路由配置


        treedata = toTree(response.data);
        response.data.forEach(function (item) {
          if (item.blank) {
            return;
          }

          item.PY_code = pinyin.makePy(item.name)[0]; // item.isActive=false;

          if (item.leaf && item.path) {
            //去首字母
            //如果没有配hash
            if (!item.hash) {
              item.hash = item.path.substr(1).split("/");
              item.hash = item.hash[item.hash.length - 2] + "/" + item.hash[item.hash.length - 1];

              if (item.hash.indexOf("=") != -1) {
                item.hash = item.hash.match("([^=]+)$")[0];
              }
            }

            ;
            var obj = resultName(item.menuId);
            routeSetting[item.hash] = {
              templateUrl: item.iframe ? item.path : item.path + ".html",
              iframe: item.iframe || false,
              controller: item.srcPath ? item.srcPath + ".js" : null,
              name: item.name,
              menuId: item.menuId,
              parent_name: obj.arr,
              stateArr: obj.idarr
            };
            obj = null;
          }
        });
        vipspa.routerMap = routeSetting; //Object.assign( vipspa.routerMap,routeSetting);
      } else {
        layer.msg("数据加载失败!");
      }

      close();
    }, object.error = function (XMLHttpRequest, textStatus, errorThrown) {
      console.error(XMLHttpRequest, textStatus, errorThrown);
      close();
    };
    Prolog.syncAjax(object);
    return treedata;
  }

  ; //返加树型结构对象

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
    }); // 将数据存储为 以 menuId 为 KEY 的 map 索引数据列

    var map = {};
    data.forEach(function (item) {
      map[item.menuId] = item;
    });
    return {
      mapData: map
    };
  }

  window.PlgSideAccordionRoute = plgSidebar;

  $.fn.initPlgSideAccordion = function (options) {
    /*  var closeLoad= loading(); */
    return new plgSidebar(this, options);
  };
})(jQuery);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function ($, layui) {
  //PlgTabs.js
  layui.use(["element"], function () {
    var element = layui.element;

    var template = function template(opts) {
      var skinArr = {
        normal: "layui-tab",
        brief: "layui-tab layui-tab-brief",
        card: "layui-tab layui-tab-card",
        plgtabs: "layui-tab layui-tab-brief plgtabs "
      };

      var itemlist = function itemlist(content) {
        if (content) {
          var rp = "";
          var ra = "";
          content.forEach(function (item, inxex) {
            rp += "<li lay-id = ".concat(item.id, " class=\"").concat(opts.indexActive === inxex ? "layui-this" : "", "\" >").concat(item.title, "</li>");
            ra += "<div class=\"layui-tab-item  ".concat(opts.indexActive === inxex ? "layui-show" : "", "\" data-fade=\"\">").concat(item.template, "</div>");
          });
          return {
            title: rp,
            content: ra
          };
        } else {
          return "";
        }
      };

      itemlist = itemlist(opts.content);
      var closeBtn = "\n            <ul class=\"plg-tab-close-all\" lay-filter=\"plg-tab-close-all\">\n              <div class=\"plg-tab-close-item\">\n                  <a href=\"javascript:;\" class=\"layui-icon layui-icon-more\"></a>\n                 <dl class=\"child\">\n                  <dd><a href=\"javascript:;\">\u5173\u95ED\u5176\u5B83\u6807\u7B7E\u9875</a></dd>\n                  <dd><a href=\"javascript:;\">\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u9875</a></dd>\n                  <dd><a href=\"javascript:;\">\u5173\u95ED\u6240\u6709\u6807\u7B7E\u9875</a></dd>\n                </dl>   \n                </li>\n            </ul>";
      var tp = "\n                <div class=\"".concat(skinArr[opts.skin], "\" ").concat(opts.allowClose ? "lay-allowClose=\"true\"" : "", " \n                    ").concat(opts.filter ? "lay-filter=\"" + opts.filter + "\"" : "", ">\n                    ").concat(opts.closeAll ? closeBtn : "", "\n                    <ul class=\"layui-tab-title\">\n                    </ul>\n                    <div class=\"layui-tab-content\"></div>\n                </div>");
      return $(tp);
    };

    var plgTabs = function plgTabs(options) {
      var _this = this;

      _this.preIndex = -1;
      var config = {
        time: 100,
        renderer: null,
        filter: "plgTabs-" + Prolog.createRandomId(),
        //选择器
        indexActive: 0,
        closeAll: false,
        //是否显示关闭全部按钮
        skin: "brief",
        fadeIn: false,
        //是否开启滑动切换
        allowClose: false,
        //是否带删除
        content: [
          /* {
                              title:null,
                              template:null,
                              id:"lay-"+ Prolog.createRandomId(),
                              url:null          
                          } */
        ]
      };
      var ele, opt; //获取数据入口

      opt = arguments[0];

      if (_typeof(opt) === "object") {
        _this.opts = $.extend(true, config, opt);
        _this.getElement = template(_this.opts); //显示右边可关闭按钮

        if (_this.opts.closeAll) {
          _this.getElement.find(".plg-tab-close-all").hover(function () {
            $(this).find(".child").show();
          }, function () {
            $(this).find(".child").hide();
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
            });
            $(this).parents(".child").hide();
          });
        }
      }

      _this.opts.renderer && _this.renderTo(this.opts.renderer);
    };

    plgTabs.prototype.renderTo = function (ele) {
      $("#" + ele).append(this.getElement);

      var _this = this;

      this.opts.content.forEach(function (item, index) {
        var yes = false;

        if (_this.opts.indexActive === index) {
          yes = true;
        }

        console.log(yes);

        _this.addTabs(item, yes);
      });
      var oli = this.getElement.find(".layui-tab-title > li");
      var layid = oli.eq(_this.opts.indexActive).attr("lay-id");

      _this.changeTabs(layid);

      this.element.render("nav"); //渲染到页面

      this.element.render("tab", this.opts.filter); //计算总宽度得到li的数量

      this.on();
      return this;
    };

    function getNum(titleObj) {
      var count = titleObj.width() - 15;
      var count01 = titleObj.find("li").eq(0).outerWidth();
      var count02 = titleObj.prev() ? titleObj.prev().outerWidth() : 0;
      var liw = 140;
      var liNum = Math.floor(count - count01 - count02) / liw; /// //console.log('count :',Math.floor(liNum) );

      return Math.floor(liNum);
    }

    ;
    var pindex = -1; //动态添加tabss

    plgTabs.prototype.addTabs = function (obj, boole) {
      var closeLoad = PlgDialog.loading2();
      obj.title = "<span class=\"name\">".concat(obj.title, "</span>");

      var _this = this;

      if (!boole) {
        boole = null;
      }

      var isChange = boole; //将上次的选中的下标存下来  

      this.preIndex = this.getElement.find(".layui-tab-title li.layui-this").index();
      var oli = this.getElement.find(".layui-tab-title li"); //获取当前的li数量

      var curLi = Number(oli.length);
      var define = {
        title: "<span class=\"name\">\u65B0\u6807\u9898</span>",
        content: "",
        id: "lay-" + Prolog.createRandomId(),
        iframe: false
      };
      var opts = $.extend(true, define, obj);

      if (opts.url && !opts.iframe) {
        Prolog.ajax({
          type: "get",
          url: opts.url,
          dataType: "html",
          success: reandTpl,
          error: function error(XMLHttpRequest, textStatus, errorThrown) {
            layer.msg("数据请求失败");
            closeLoad();
          }
        });
      } else if (opts.template && !opts.iframe) {
        reandTpl(opts.template);
      } else {
        //iframe为true
        opts.template = "<iframe class=\"plg-iframeClass\" frameborder=\"no\" src=\"".concat(opts.url, "\"></iframe>");
        reandTpl(opts.template);
        closeLoad();
        return;
      }

      _this.preIndex = pindex = _this.getElement.find(".layui-tab-title>.layui-this").index();

      function reandTpl(data) {
        try {
          opts.content = data;

          _this.element.tabAdd(_this.opts.filter, opts);

          isChange && _this.changeTabs(opts.id);
        } catch (e) {
          console.error(e.name + ": " + e.message);
          console.error(e.stack);
        } finally {
          _this.getElement.find(".layui-tab-content .layui-tab-item").attr("data-fade", "");

          var liNum = getNum(_this.getElement.find(".layui-tab-title"));
          curLi > liNum && oli.eq(1) && _this.deleteTabs(oli.eq(1).attr("lay-id"));
          closeLoad();
        }
      } //  layer.close(loading);

    }; //切换到指定tabss


    plgTabs.prototype.changeTabs = function (layid, callback) {
      var id;
      var reg = /^[0-9]+.?[0-9]*$/;
      var eleObj;

      if (reg.test(layid)) {
        //通过下标找到layid
        eleObj = this.getElement.find(".layui-tab-title>li").eq(layid);
        id = eleObj.attr("lay-id");
      } else {
        id = layid;
        eleObj = this.getElement.find(".layui-tab-title>li[lay-id='" + id + "']");
      }

      pindex = this.getElement.find(".layui-tab-title>.layui-this").index();
      this.element.tabChange(this.opts.filter, id); //记录上一次下标

      this.preIndex = pindex; //是否开启滑动切换

      if (this.opts.fadeIn) {
        this.getElement.find(".layui-tab-content >.layui-tab-item").attr("data-fade", "");
        var itme = this.getElement.find(".layui-tab-content >.layui-tab-item.layui-show");

        if (itme.index() > this.preIndex) {
          //console.log("=>")
          itme.attr("data-fade", "left");
          ;
        } else if (itme.index() == this.preIndex) {
          return false;
        } else {
          //console.log("<=")
          this.element.tabChange(this.opts.filter, id);
          itme.attr("data-fade", "right");
        }

        setTimeout(function () {
          itme.attr("data-fade", "");
        }, this.opts.time);
      }

      ;

      if (typeof callback === "function") {
        callback(eleObj);
      }

      ;
      return this;
    }; //删除指定tabss


    plgTabs.prototype.deleteTabs = function (layid) {
      this.element.tabDelete(this.opts.filter, layid); //删除：

      return this;
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

      return _this;
    };

    window.PlgTabs = plgTabs;

    $.fn.initPlgTabs = function (options) {
      var id = $(this).attr("id");
      return new plgTabs(options).renderTo(id);
    };
  });
})(jQuery, layui);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function ($) {
  //PlgZtree.js
  var tree = $.fn.zTree;

  var getData = function getData(opts) {
    var close = Prolog.loading2();
    var obj = {}; //配置tree

    opts.success = function (res) {
      //console.log(res)
      if (res.success) {
        //只把父节点拿出来
        obj = res.data.map(function (item) {
          item.isParent = true;
          return item;
        });
      } else {
        layer.msg("数据加载失败!");
      }

      close();
    };

    opts.error = function () {
      close();
    };

    Prolog.syncAjax(opts);
    return obj;
  };

  function Expand(event, treeId, treeNode) {
    //如果是一级父菜单
    console.log(treeId);

    if (!treeNode.tId) {
      var obj = this.getZTreeObj(treeId);
      var NOdes = obj.getNodes();

      for (var key in NOdes) {
        var td = NOdes[key];

        if (td.tId != treeNode.tId) {
          obj.expandNode(td, false, false, false);
        } else {
          obj.expandNode(td, true);
        }
      }
    }

    ;
  }

  var plgZtree = function plgZtree(ele, options) {
    var _this = this;

    var config = {
      initAjax: null,
      skin: "",
      toolBar: false,
      toolBar2: {
        isShow: false,
        btn: null
      },
      renderer: null,
      setData: null,
      isExpand: false,
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
            id: 'id'
          }
        },
        callback: {// onExpand: Expand,
        }
      }
    };
    var ele, opt, object; //获取数据入口

    if (arguments.length === 1) {
      opt = arguments[0];

      if (_typeof(opt) === "object") {
        _this.opts = $.extend(true, config, opt);

        if (opt.setting && opt.setting.callback) {
          if (typeof opt.setting.callback.onExpand === "function") {
            _this.opts.setting.callback.onExpand = function (event, treeId, treeNode) {
              Expand.bind(_this)(event, treeId, treeNode);
              opt.setting.callback.onExpand(event, treeId, treeNode);
            };
          }

          ;
        }

        ;

        if (!_this.opts.setDate && _this.opts.initAjax) {
          _this.opts.setData = getData(_this.opts.initAjax);
        }
      }
    } else if (arguments.length === 2) {
      ele = arguments[0];
      opt = arguments[1];
    }

    _this.opts.renderer && _this.renderTo(this.opts.renderer); //求父级div的高度值

    setTimeout(window.onresize = function () {
      var pObj = $("#" + _this.opts.renderer);
      var toolbarBtnHeight = 0;

      if (_this.toolbarBtn2) {
        toolbarBtnHeight = _this.toolbarBtn2.height();
      }

      var parentHeight = parseInt(pObj.parent().height() - toolbarBtnHeight);
      pObj.find(".ztree").css({
        "width": "100%",
        "height": parentHeight,
        "overflow-y": "auto",
        "pading-bottom": "20px"
      });
    }, 0);
  }; //克隆tree 的方法


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
    this.treeObj = this.init(objUl, this.opts.setting, this.opts.setData); //默认展开第一个菜单

    this.opts.isExpand && this.treeObj.expandNode(this.treeObj.getNodes()[0], true, false, true, true);

    if (this.opts.toolBar) {
      _this.toolbarBtn = btnGroup(_this);
      $("#" + ele).append(_this.toolbarBtn);
    }

    if (this.opts.toolBar2.isShow && this.opts.toolBar2.btn && this.opts.toolBar2.btn.length > 0) {
      _this.toolbarBtn2 = btnGroup2(_this);
      $("#" + ele).append(_this.toolbarBtn2);
    }

    $("#" + ele).append(objUl);
    return this;
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
    sort: 0
  };

  function btnGroup2(_this) {
    var obj = _this.opts.toolBar2.btn;
    var btn = $("\n        <div class=\"toolbar layui-row layui-col-space10 cl\">\n         ".concat(obj.map(function (item) {
      return "<div class=\"hook layui-col-md".concat(12 / obj.length, "\">\n            <a class=\"layui-btn ").concat(item.skin ? item.skin : '', "\" href=\"javascript:void(0)\">\n            <i class=\"").concat(item.icon, "\"></i>").concat(item.text, "</a>\n          </div>");
    }).join(""), "   \n        \n      </div>"));
    var zTree = _this.treeObj;
    obj.forEach(function (item, index) {
      btn.find(".hook").eq(index).find('a').click(function (event) {
        var nodes = zTree.getSelectedNodes();
        var treeNode = nodes;
        item.EventCallback && item.EventCallback(event, zTree, treeNode);
      });
    });
    return btn;
  }

  function btnGroup(_this) {
    var btn = $("\n\n                 <div class=\"toolbar layui-row layui-col-space10 cl\">\n\n\n                 <div class=\"layui-col-md4\">\n                 <a class=\"layui-btn layui-btn-primary\" href=\"javascript:void(0)\">\n                 <i class=\"layui-icon layui-icon-delete\"></i>\u5220\u9664\n                 </a>\n             </div>\n             <div class=\"layui-col-md4\">\n               \n             <a class=\"layui-btn layui-btn-primary\" href=\"javascript:void(0)\" >\n                 <i class=\"layui-icon layui-icon-edit\"></i>\u7F16\u8F91</a>\n          </div>\n                 <div class=\"layui-col-md4\">\n            \n                     <a class=\"layui-btn  layui-btn-normal\"  href=\"javascript:void(0)\">\n                           <i class=\"layui-icon layui-icon-add-1\"></i>\u589E\u52A0\n                   </a>\n                 </div>\n       \n               </div>\n        \n               \n               \n             \n             ");
    return btn;
  } //添加菜单


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

  window.PlgZtree = plgZtree;
})(jQuery);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

layui.define('form', function (exports) {
  var $ = layui.$,
      form = layui.form,
      hint = layui.hint(),
      // 字符常量
  MOD_NAME = 'selectPlus',
      SELECT = 'layui-form-select',
      SELECTED = 'layui-form-selected',
      selectPlus = {
    index: layui.selectPlus ? layui.selectPlus.index : 0,
    // 设置全局项
    set: function set(options) {
      var that = this;
      that.config = $.extend({}, that.config, options);
      return that;
    },
    // 事件监听
    on: function on(events, callback) {
      return layui.onevent.call(this, MOD_NAME, events, callback);
    }
  },
      // 操作当前实例
  thisIns = function thisIns() {
    var that = this,
        options = that.config;
    return {
      // 获取数据
      getChecked: function getChecked() {
        return that.getChecked.call(that);
      },
      // 配置数据
      config: options
    };
  },
      // 构造器
  Class = function Class(options) {
    var that = this;
    that.index = ++selectPlus.index;
    that.config = $.extend({}, that.config, selectPlus.config, options);
    that.render();
  },
      // 渲染inputTags
  renderInputTags = function renderInputTags(el, data) {
    var temStr = '';
    data.forEach(function (val) {
      temStr += "<span>\n          <em>".concat(val, "</em>\n          <button type=\"button\" class=\"close\">\xD7</button>\n        </span>");
    });
    $(el).siblings('.plg-select-tags').html(temStr);
  }; //默认配置


  Class.prototype.config = {
    type: 'checkbox',
    valueSeparator: '/',
    labelSeparator: '  ---  ',
    data: [],
    valueName: 'title',
    label: [],
    values: [],
    url: '',
    method: 'get',
    where: '',
    contentType: '',
    headers: '',
    response: 'data',
    parseData: null,
    config: {
      checkedName: 'SELECTPLUS_CHECKED',
      indexName: 'SELECTPLUS_INDEX'
    },
    error: ''
  }; //渲染视图

  Class.prototype.render = function () {
    var that = this,
        options = that.config;
    typeof options.el === 'string' ? options.el = $(options.el) : options.el; // 渲染元素

    options.reElem = $('<div class="layui-unselect layui-form-select">' + '<div class="layui-select-title">' + '<input type="text" placeholder="请选择" value="" readonly="" class="layui-input layui-unselect">' + '<i class="layui-edge"></i>' + '</div>' + '<dl class="layui-anim layui-anim-upbit">' + '<dd lay-value="" class="layui-select-tips layui-hide">请选择</dd>' + '</dl>' + '</div>'); // 事件

    options.reElem.find('.layui-select-title').on('click', function (e) {
      !$(this).parent().hasClass(SELECTED) ? $(document).find('.' + SELECT).removeClass(SELECTED) : "";
      $(this).parent().toggleClass(SELECTED);
    });
    $(document).on('click', function (e) {
      $(e.target).parents('.' + SELECT).length <= 0 && options.reElem.hasClass(SELECTED) ? options.reElem.removeClass(SELECTED) : "";
    });
    !Array.isArray(options.values) ? options.values = [options.values] : ""; // 查找 表单的 filter

    options.filter = options.el.parents('.layui-form').attr('lay-filter');
    options.el.append(options.reElem);

    if (options.url) {
      // 获取后端数据
      this.pullData();
    } else {
      that.renderData(); // 数据渲染
    }

    options.el.on('click', '.layui-select-title', function () {
      // console.log('在此处开始')
      var $title = $(this),
          $dd0 = $title.next().find('dd').eq(0);

      if (!$dd0.hasClass('layui-hide')) {
        $dd0.addClass('layui-hide');
      }

      $title.find('input').val(options.values.join(options.valueSeparator));
    });
  };

  Class.prototype.pullData = function () {
    var that = this,
        options = that.config;
    $.ajax({
      type: options.method || 'get',
      url: options.url,
      contentType: options.contentType,
      data: options.where || {},
      dataType: 'json',
      headers: options.headers || {},
      success: function success(res) {
        //如果有数据解析的回调，则获得其返回的数据
        if (typeof options.parseData === 'function') {
          res = options.parseData(res) || res[options.response];
        } // 如果是数组，则覆盖options.data


        if (Array.isArray(res)) {
          options.data = that.formatData(res);
          options.error = '';
          that.renderData();
        } else {
          options.error = '数据格式不对';
        }
      },
      error: function error(e, m) {
        options.error = '数据接口请求异常：' + m;
      }
    });
  }; // 格式化数据


  Class.prototype.formatData = function (data) {
    var that = this,
        options = that.config,
        valueName = options.valueName,
        values = options.values,
        checkedName = options.config.checkedName,
        indexName = options.config.indexName;
    layui.each(data, function (i, item) {
      if (_typeof(item) !== 'object') {
        data[i] = {
          title: item
        };
      }

      data[i][indexName] = i;
      if (!data[i][checkedName]) data[i][checkedName] = false;
      layui.each(values, function (index, value) {
        if (data[i][valueName] === value) {
          data[i][checkedName] = true;
        }
      });
    });
    values.splice(0);
    return data;
  }; // 渲染数据


  Class.prototype.renderData = function (data) {
    var that = this,
        options = that.config,
        type = options.type,
        id = that.index,
        data = data ? that.formatData(data) : that.formatData(options.data),
        items = {
      // 多选
      checkbox: function checkbox(config, data, id) {
        var CLASSNAME = 'layui-form-checkbox',
            CHECKED = 'layui-form-checked',
            el = config.reElem.find('dl'),
            valueName = config.valueName,
            checkedName = config.config.checkedName,
            indexName = config.config.indexName,
            values = config.values,
            label = config.label,
            filter = config.filter,
            labelSeparator = config.labelSeparator,
            valueSeparator = config.valueSeparator,
            sum = 0; // 添加选项   XXX, 此处可以使用一次str，可以节省一次dom的操作

        el.append($('<dd lay-value="全选"></dd>'));
        layui.each(data, function (i, item) {
          el.append($('<dd lay-value="' + item[valueName] + '"></dd>'));
        });
        var allEle = el.find('dd').eq(1); // 添加多选框

        allEle.nextAll().each(function (index) {
          var $dd = $(this),
              item = data[index],
              layuiValue = item[valueName],
              title = layuiValue;

          if (label.length > 0) {
            title = "";
            layui.each(label, function (i, n) {
              title += item[n];
              i < label.length - 1 ? title += labelSeparator : ''; // i < (label.length - 1) ? (title +=  (labelSeparator + '</span>')): '';
            });
          }

          var checkbox = $('<input type="checkbox" name="' + MOD_NAME + 'checkbox' + id + '"  yw-index="' + item[indexName] + '" lay-skin="primary" title="' + title + '" layui-value="' + layuiValue + '">');

          if (item[checkedName]) {
            checkbox.prop('checked', true);
            values.push(layuiValue);
            sum++;
          }

          $dd.html(checkbox);
        });
        var allcheckbox = $('<input type="checkbox"  selectplus-all  lay-skin="primary" title="全选" layui-value="全选">');
        sum === data.length ? allcheckbox.prop('checked', true) : "";
        allEle.html(allcheckbox); // console.log('开启了初始化模式');
        // console.log('config.tagsContainer');
        // console.log(config);
        // console.log('config.tagsContainer');

        renderInputTags(config.el, values);
        allEle.parent().prev().find('input').val(values.join(valueSeparator)); // 添加事件

        allEle.on('click', function (event) {
          var $all = $(this),
              checked = event.target.nodeName === 'DD' ? $all.find('.' + CLASSNAME).toggleClass(CHECKED).hasClass(CHECKED) : $all.find('input').prop('checked'); // 禁止下拉框收回

          $all.parents('.' + SELECT).addClass(SELECTED); // 设置选中状态 

          $all.find('input').prop('checked', checked);
          $all.nextAll().each(function () {
            var dd = $(this);
            checked ? dd.find('.' + CLASSNAME).addClass(CHECKED) : dd.find('.' + CLASSNAME).removeClass(CHECKED);
            dd.find('input').prop('checked', checked);
          }); // 显示选中数据

          layui.event.call($all, MOD_NAME, 'checkbox' + '(' + MOD_NAME + ')', {
            type: "checkbox",
            ele: $all,
            eleChecked: checked,
            isAll: checked
          });
        }); // console.log('事件的监听....');

        config.el.siblings('.plg-select-tags').on('click', '.close', function (e) {
          // console.log('触发点击事件...');
          // console.log(this);
          // console.log('触发点击事件...')
          // console.log($(this).siblings('em').html());
          // if(el.find('.layui-form-select').hasClass('layui-form-selected')){
          // }
          // 此处需要判断当前的select checkbox是否展开，如果展开则，第一次点击的是关闭
          var currentHtml = $(this).siblings('em').html(); // console.log( typeof allEle.nextAll());
          // console.log(allEle.nextAll());

          var selectList = Array.prototype.slice.call(allEle.nextAll());
          selectList.forEach(function (val, ind) {
            if (val.innerText === currentHtml) {
              // console.log('currentHtml::' + currentHtml);
              // console.log('ind::' + ind);
              // console.log('立即执行的事件....');
              el.find('dd').eq(ind + 2).off().on('click', function (event) {
                // console.log(event.target);
                // event.stopPropagation();
                // console.log('立即执行的事件');
                // console.log('index::' + $(this).index());
                if ($(this).index() === ind + 2) {
                  var $dd = $(this),
                      checked = event.target.nodeName === 'DD' ? $dd.find('.' + CLASSNAME).toggleClass(CHECKED).hasClass(CHECKED) : $dd.find('input').prop('checked'); // console.log('出发点击事件');
                  // 禁止下拉框收回

                  $dd.parents('.' + SELECT).addClass(SELECTED); // 设置选中状态

                  $dd.find('input').prop('checked', checked); // console.log('2222');
                  // 判断全选

                  var $all = $dd.parents('dl').find('dd').eq(1),
                      $dds = $all.nextAll(),
                      sum = 0;
                  $dds.each(function () {
                    $(this).find('input').prop('checked') ? sum++ : '';
                  }); // console.log('1111');

                  if (sum === $dds.length) {
                    // console.log('全选');
                    $all.find('input').prop('checked', true);
                    $all.find('.' + CLASSNAME).addClass(CHECKED);
                  } else {
                    // console.log('非全选');
                    $all.find('input').prop('checked', false);
                    $all.find('.' + CLASSNAME).removeClass(CHECKED);
                  } // console.log('00000');
                  // 显示选中数据


                  layui.event.call($all, MOD_NAME, 'checkbox' + '(' + MOD_NAME + ')', {
                    type: "checkbox",
                    ele: $dd,
                    eleChecked: checked,
                    isAll: sum === $dds.length
                  }); // console.log('aaaaa');
                }
              }).trigger('click');
            }
          });
        });
        allEle.nextAll().on('click', function (e) {
          // console.log('nextAll()此处是点击事件');
          // console.log(this);
          // console.log($(this));
          // console.log('nextAll()此处是点击事件');
          var $dd = $(this),
              checked = event.target.nodeName === 'DD' ? $dd.find('.' + CLASSNAME).toggleClass(CHECKED).hasClass(CHECKED) : $dd.find('input').prop('checked'); // 禁止下拉框收回

          $dd.parents('.' + SELECT).addClass(SELECTED); // 设置选中状态

          $dd.find('input').prop('checked', checked); // 判断全选

          var $all = $dd.parents('dl').find('dd').eq(1),
              $dds = $all.nextAll(),
              sum = 0;
          $dds.each(function () {
            $(this).find('input').prop('checked') ? sum++ : '';
          });

          if (sum === $dds.length) {
            $all.find('input').prop('checked', true);
            $all.find('.' + CLASSNAME).addClass(CHECKED);
          } else {
            $all.find('input').prop('checked', false);
            $all.find('.' + CLASSNAME).removeClass(CHECKED);
          } // 显示选中数据


          layui.event.call($all, MOD_NAME, 'checkbox' + '(' + MOD_NAME + ')', {
            type: "checkbox",
            ele: $dd,
            eleChecked: checked,
            isAll: sum === $dds.length
          });
        }); // 渲染多选框
        // el.next().find('dl').addClass('yw-selectPlus');

        form.render('checkbox', filter);
      },
      // 单选
      radio: function radio(config, data, id) {
        var CLASSNAME = 'layui-form-radio',
            CHECKED = 'layui-form-radioed',
            ICON = ['&#xe643;', '&#xe63f;'],
            CHECKED_ICON = 'layui-anim-scaleSpring',
            elID = config.el,
            el = config.reElem.find('dl'),
            valueName = config.valueName,
            checkedName = config.config.checkedName,
            indexName = config.config.indexName,
            checkedData = data.filter(function (item) {
          return item[checkedName] === true;
        }),
            values = config.values,
            label = config.label,
            filter = config.filter,
            labelSeparator = config.labelSeparator,
            valueSeparator = config.valueSeparator; // 添加选项

        layui.each(data, function (i, item) {
          el.append('<dd lay-value="' + item[valueName] + '"></dd>');
        });
        form.render('select', options.filter); // 渲染单选框

        el.find('dd').eq(0).nextAll().each(function (index) {
          var $dd = $(this),
              item = data[index],
              layuiValue = item[valueName],
              title = layuiValue;

          if (label.length > 0) {
            title = "";
            layui.each(label, function (i, n) {
              title += item[n];
              i < label.length - 1 ? title += labelSeparator : '';
            });
          }

          var dd = $('<input type="radio" name="' + MOD_NAME + 'radio' + id + '"  yw-index="' + item[indexName] + '" lay-skin="primary" title="' + title + '" layui-value="' + layuiValue + '">');

          if (checkedData.length > 0 && checkedData[0][indexName] === item[indexName]) {
            dd.prop('checked', true);
            values.push(layuiValue);
            $dd.parent().prev().find('input').val(values.join(valueSeparator));
          }

          $dd.html(dd);
        }); // el.next().find('dl').addClass('yw-selectPlus');

        form.render('radio', filter); // 事件

        el.find('dd').on('click', function (event) {
          var $dd = $(this);
          $dd.find('.' + CLASSNAME).addClass(CHECKED).find('i').addClass(CHECKED_ICON).html(ICON[0]);
          $dd.find('input').prop('checked', true);
          $dd.siblings().find('.' + CLASSNAME).removeClass(CHECKED).find('i').removeClass(CHECKED_ICON).html(ICON[1]);
          $dd.siblings().find('input').prop('checked', false); // 显示选中数据

          layui.event.call($dd, MOD_NAME, 'radio' + '(' + MOD_NAME + ')', {
            type: "radio",
            ele: $dd,
            eleChecked: true,
            isAll: false
          });
        });
      }
    }; // 选择时触发的事件

    layui.onevent.call(that, MOD_NAME, type + '(' + MOD_NAME + ')', that.checked.bind(that));
    items[type] ? items[type](options, data, id) : hint.error('不支持的' + type + '表单渲染');
  }; // 选中数据处理


  Class.prototype.checked = function (res) {
    var that = this,
        options = that.config,
        data = options.data,
        checkedName = options.config.checkedName,
        type = res.type,
        isAll = res.isAll,
        ele = res.ele,
        eleChecked = res.eleChecked,
        filter = options.el.attr('lay-filter');

    if (type === 'checkbox') {
      options.values = [];
      ele.parents('dl').find('[type="checkbox"]').each(function (i) {
        var $dd = $(this),
            ywIndex = $dd.attr('yw-index'),
            checked = $dd.prop('checked');
        ywIndex ? data[ywIndex][checkedName] = checked : "";
        checked && ywIndex ? options.values.push($dd.attr('layui-value')) : "";
      }); // 此处做input框的渲染功能

      renderInputTags(config.el, options.values);
      ele.parent().prev().find('input').val(options.values.join(options.valueSeparator));
      layui.event.call(ele, MOD_NAME, MOD_NAME + '(' + filter + ')', {
        checked: eleChecked,
        isAll: isAll,
        values: options.values,
        checkedData: data.filter(function (item) {
          return item[checkedName] === true;
        }),
        ele: ele
      });
    } else if (type === 'radio') {
      var index = ele.find('input').attr('yw-index'),
          value = ele.find('input').attr('layui-value');
      options.values = [value];
      ele.parent().prev().find('input').val(value);
      layui.each(data, function (i, item) {
        item[checkedName] = false;
      });
      data[index][checkedName] = true;
      layui.event.call(ele, MOD_NAME, MOD_NAME + '(' + filter + ')', {
        value: value,
        checkedData: data[index],
        ele: ele
      });
    }
  }; // 获取选中数据


  Class.prototype.getChecked = function () {
    var that = this,
        options = that.config,
        data = options.data,
        checkedName = options.config.checkedName;
    return {
      values: options.values,
      data: data.filter(function (item) {
        return item[checkedName] === true;
      })
    };
  }; // 核心入口


  selectPlus.render = function (options, tagsContainer) {
    var ins = new Class(options, tagsContainer);
    return thisIns.call(ins);
  };

  exports('selectPlus', selectPlus);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUuanMiLCJQbGdDYXJkLmpzIiwiUGxnQ2FyZExpc3QuanMiLCJQbGdEYXRlLmpzIiwiUGxnRGlhbG9nLmpzIiwiUGxnSW5wdXRUYWdzLmpzIiwiUGxnUGFuZWwuanMiLCJQbGdTZWxlY3RUYWdzLmpzIiwiUGxnU2lkZUFjY29yZGlvbi5qcyIsIlBsZ1NpZGVBY2NvcmRpb25Sb3V0ZS5qcyIsIlBsZ1RhYnMuanMiLCJQbGdadHJlZS5qcyIsInNlbGVjdFBsdXMuanMiXSwibmFtZXMiOlsiRGF0ZSIsInByb3RvdHlwZSIsImZvcm1hdCIsImZtdCIsIm8iLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwiTWF0aCIsImZsb29yIiwiZ2V0TWlsbGlzZWNvbmRzIiwidGVzdCIsInJlcGxhY2UiLCJSZWdFeHAiLCIkMSIsImdldEZ1bGxZZWFyIiwic3Vic3RyIiwibGVuZ3RoIiwiayIsImRodG1sWENhbGVuZGFyT2JqZWN0IiwibGFuZ0RhdGEiLCJkYXRlZm9ybWF0IiwibW9udGhlc0ZOYW1lcyIsIm1vbnRoZXNTTmFtZXMiLCJkYXlzRk5hbWVzIiwiZGF5c1NOYW1lcyIsIndlZWtzdGFydCIsIndlZWtuYW1lIiwidG9kYXkiLCJjbGVhciIsImxhbmciLCJQcm9sb2ciLCJHcmlkQmFzZVBhdGgiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXRUb3AiLCJlIiwib2Zmc2V0Iiwib2Zmc2V0VG9wIiwib2Zmc2V0UGFyZW50IiwiZ2V0TGVmdCIsIm9mZnNldExlZnQiLCJoYXNKc29uIiwianNvbkFycmF5IiwianNvbiIsImkiLCJiIiwia2V5IiwiYWpheCIsIm9wdGlvbnMiLCJwZGVmYXVsdCIsInRpbWVvdXQiLCJkYXRhVHlwZSIsIm9wdCIsIiQiLCJleHRlbmQiLCJlcnJvciIsIlhNTEh0dHBSZXF1ZXN0IiwidGV4dFN0YXR1cyIsImVycm9yVGhyb3duIiwibGF5ZXIiLCJtc2ciLCJiZWZvcmVTZW5kIiwieGhyIiwic2V0UmVxdWVzdEhlYWRlciIsInN5bmNBamF4IiwiYXN5bmMiLCJnZXRGb3JtQnlJZCIsInN5c3RlbUlkIiwibWVudUlkIiwiZm9ybUlkIiwibXlmb3JtIiwiZGF0YSIsImdldEpzb25EYXRhIiwiaWQiLCJzdWNjZXNzIiwiZmllbGRzIiwiUHJvbG9nRm9ybSIsImZvcm1kYXRhIiwiSlNPTiIsInBhcnNlIiwiaW5pdCIsImNyZWF0ZVJhbmRvbUlkIiwiZ2V0VGltZSIsInJhbmRvbSIsInRvU3RyaW5nIiwibG9hZGluZyIsImVsIiwiUGxnRGlhbG9nIiwiYXBwZW5kVG8iLCJjc3MiLCJjbG9zZUxvYWRpbmciLCJjbG9zZSIsImxvYWRpbmcyIiwiaW5kZXgiLCJsb2FkIiwic2hhZGUiLCJkZWxHcmlkUm93RGF0YSIsImdyaWQiLCJ1cmwiLCJ0eXBlIiwiY29udGVudHR5cGUiLCJwYXJhbSIsIm11bHRpc2VsZWN0IiwiZ2V0U2VsZWN0ZWRSb3dJZCIsImdldENoZWNrZWRJZHMiLCJjb25maXJtIiwidGl0bGUiLCJidG4iLCJ6SW5kZXgiLCJjb250ZW50VHlwZSIsInJlbG9hZCIsImNsb3NlQWxsIiwib3BlbiIsImFyZWEiLCJjb250ZW50IiwicGFyc2VKU09OIiwibWVzc2FnZSIsImJ0bkFsaWduIiwieWVzIiwiZm4iLCJpbml0UGxnQ2FyZCIsInBnIiwiUGxnQ2FyZCIsImF0dHIiLCJyZW5kZXJUbyIsInJlbmRlcmVyIiwiaHRtbEZyYWdtZW50IiwiY29uZmlnIiwiZmFjdG9yeSIsIl9zdHlsZSIsInN0eWxlIiwiX2RhdGEiLCJfc3RyVGl0bGUiLCJfc3RySGVhZCIsIl9zdHJUaXRsZUhlYWQiLCJfc3RyRm9vdGVyIiwic2VsZiIsInRlbUZyYWdtZW50IiwiZm9yRWFjaCIsInZhbCIsImNhcmRObyIsImNhcmROYW1lIiwidGVtQnRucyIsInZhbHVlIiwidGV4dCIsImdlbmVyYXRlT25lVGVtcGxhdGUiLCJkYXRhTGlzdCIsImFkZFRlbXBsYXRlIiwiYXR0ck5hbWUiLCJFcnJvciIsIm9uIiwiZXZlbnRuYW1lIiwiY2FsbGJhY2siLCJST1VUSU5FX09QRVJBVElPTiIsIkNPTVBMRVhfT1BFUkFUSU9OIiwiaW5jbHVkZXMiLCJ0ZW1JbmRleCIsImNsb3Nlc3QiLCJjYWxsX2JhY2tfZm4iLCJvZmYiLCJncm91cEluZGV4IiwiY3VycmVudERhdGEiLCJ1bmRlZmluZWQiLCJhcHBlbmQiLCJnZXRIdG1sRnJhZ21lbnQiLCJ3aW5kb3ciLCJqUXVlcnkiLCJpbml0UGxnQ2FyZExpc3QiLCJQbGdDYXJkTGlzdCIsImlzU2hvd0FkZCIsIk9iamVjdCIsImFzc2lnbiIsInRlbVN0ciIsInpvbmVOYW1lIiwiem9uZUlkIiwiX3N0ckNlbGxTdGFydCIsIl9zdHJDZWxsSGVhZCIsImhlYWQiLCJfc3RyQ2VsbEJvZHkiLCJkZXMiLCJfc3RyQ2VsbEZvb3RlciIsIm9iaiIsInVzZU5vIiwib3BlcmF0Rm5MZW5ndGgiLCJrZXlzIiwiYnRucyIsIml0ZW0iLCJjb25zb2xlIiwiX3N0ckNlbGxFbmQiLCJjdXN0b21lckxpc3QiLCJtYXAiLCJ0ZW1PYmoiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJjdXNvbiIsImV2ZW50IiwiZmluZCIsImVxIiwiY3VycmVudElkIiwibGF5dWkiLCJ1c2UiLCJwbGdEYXRlIiwibGF5ZGF0ZSIsInBsZ0RhdGVSZW5kZXIiLCJfdGhpcyIsIm9wdHMiLCJlYWNoIiwiZWxlbSIsIm90cHMiLCJyZW5kZXIiLCJzZWxlY3RvciIsImFuaW0iLCJmaXhlZCIsInBsZ0RpYWxvZyIsInNob3dVcGxvYWREaWFsb2ciLCJ3aW5vcHRpb25zIiwic2tpbiIsImNsb3NlQnRuIiwicmVzaXplIiwiYnRuMSIsImxheWVybyIsImJ0bjIiLCJtZiIsIlBsZ0Zvcm0iLCJpdGVtcyIsInNob3dHcmlkRGlhbG9nIiwicGxnR3JpZCIsInRpcHNNb3JlIiwicmVjb3JkIiwiZ2V0U2VsZWN0ZWRSb3dEYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJwYW5lbElkIiwibG9hZERhdGEiLCJyaWQiLCJpbmQiLCJnZXRVc2VyRGF0YSIsImJ0bjMiLCJpbml0UGxnSW5wdXRUYWdzIiwicGxnSW5wdXRUYWdzIiwicGFyYW1zIiwiY2xhc3NNYWluIiwiY2hlY2tib3hOYW1lIiwibGF5RmlsdGVyIiwiZG9tIiwidGFnc0lkIiwibWV1blBhbmVsVGhpcyIsInNldERlZmF1bHRWYWx1ZSIsImhhc093blByb3BlcnR5IiwiY2hlY2tlZCIsIndyYXBUZW1wbGF0ZSIsInRlbVRlbXBsYXRlIiwiYWxpYXMiLCJ3cmFwVGFtcGxhdGUiLCJ0YXJnZXRJZCIsIiR0YXJnZXRJZCIsIiR0YWdzSWQiLCJmb3JtIiwidGFnTGlzdCIsImlucHV0VGFncyIsImNoZWNrYm94TGlzdCIsInNpYmxpbmdzIiwic3RyaW5naWZ5IiwicHVzaCIsInYiLCJhZGQiLCJ0ZW1UZW1wYWx0ZSIsInRlbUlucHV0SGlkZGVuIiwiYWZ0ZXIiLCJpbmRleE9mIiwiZGVsIiwic3BsaWNlIiwiZW1wdHkiLCJyZW1vdmUiLCJpc0NoZWNrZWQiLCJqcXVlcnlFbGVtIiwidGVtSnF1ZXJ5T2JqIiwiaHRtbCIsImNoZWNrZWRMaXN0IiwiQXJyYXkiLCJzbGljZSIsImNhbGwiLCJ0ZW1IdG1sIiwidHJpZ2dlciIsIlBsZ0lucHV0VGFncyIsInRlbXBsYXRlIiwic2FsZiIsInNraW5PQkoiLCJjbGFzc05hbWUiLCJoZWFkZXIiLCJpc1Nob3ciLCJtb3JlQnRuIiwiaWNvbiIsIlBhbmVsRm9ybSIsImRlZmF1bHRCb2R5IiwibGF5b3V0Q29sIiwiaW5wdXRCbG9jayIsInZhbHVlQmoiLCJjb2xzIiwiYXJyIiwibGFiZWwiLCJqb2luIiwicGxnUGFuZWwiLCJlbGUiLCJ2YWx1ZU9mIiwiYXJndW1lbnRzIiwiZW1weXQiLCJnZXRFbGVtZW50IiwiYXBwZW5kUGFuZWxCb2R5IiwiRWxlbWVudE9iamNldCIsImlzRW1wdHkiLCJkaXIiLCJub2RlVHlwZSIsIm5vZGVOYW1lIiwiSFRNTEVsZW1lbnQiLCJpc0FycmF5IiwiUGxnUGFuZWwiLCJQbGdTZWxlY3RQbHVzVGFncyIsInBsZ1NlbGVjdFBsdXNUYWdzIiwidGVtcCIsInNlbGVjdFBsdXMiLCJzdHJDaGluZXNlRmlyc3RQWSIsIm9NdWx0aURpZmYiLCJtYWtlUHkiLCJzdHIiLCJhcnJSZXN1bHQiLCJsZW4iLCJjaCIsImNoYXJBdCIsImNoZWNrQ2giLCJta1JzbHQiLCJ1bmkiLCJjaGFyQ29kZUF0IiwiYXJyUnNsdCIsInN0cmxlbiIsInRtcEFyciIsInRtcCIsImoiLCJjb25jYXQiLCJTdHJpbmciLCJ0cmltIiwicGlueWluIiwiZWxlbWVudCIsIndpbiIsImRvYyIsImRvY3VtZW50IiwicGxnU2lkZWJhciIsIkNsYXNzTWFpbiIsImRvY3VtZW50UGFuZWwiLCJfZ2V0RGF0YSIsImdldERhdGEiLCJwYXJlbnREYXRhIiwicmVuZGVyTmF2IiwibWFpbk5hdiIsIm9wZXMiLCJ0bWwiLCJsb2dvIiwiZmlsdGVyIiwicGFyZW50TWVudUlkIiwiaW1hZ2VQYXRoIiwibGVhZiIsInBhdGgiLCJyZXNldE9wZW5NZW51TGlzdCIsImdyb3VwIiwiaW54ZXgiLCJjaXRlbSIsImRpdGVtIiwiaGlkZSIsInNldE9wZW5BbGwiLCJsaXN0IiwibWV1bmdyb3VwTGlzdCIsInBhcmVudERhdGFzIiwia2V5VXBMaXN0IiwicmVnQ0giLCJrZXl1cCIsInRvVXBwZXJDYXNlIiwibmV4dCIsInNob3ciLCJtYXBBbGwiLCJQWV9jb2RlIiwibWV1blRvcE9iaiIsInBhcnNlSW50IiwicmVtb3ZlclNob3dMaXN0IiwibWV1blNvcm9sbCIsInJlbW92ZUNsYXNzIiwiY2xpY2tDaGlsZCIsImNhbGxiYWtjIiwib3RoaXMiLCJib2R5TmF2Iiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJtaWQiLCJib2R5TmF2X3RoaXMiLCJib2R5TmF2X3BhcmVudCIsInBhcmVudCIsImJvZHlOYXZfY2hpbGQiLCJjYWxsYmFrY0RhdGEiLCJnZXRDdXJyZW50IiwicGlkIiwicGFyZW50cyIsImhyZWYiLCJ1cGRhdGVDaGlsZE1ldW4iLCJFdmVudEhhbmxkZXIiLCJoYXNDbGFzcyIsImNsaWNrIiwiYWRkQ2xhc3MiLCJob3ZlciIsImV2ZSIsInRhcmdldCIsInRvZ2dsZUNsYXNzIiwicGFyZW50Tm9kZSIsIm1ldW5Ub3AiLCJzSXRlbSIsInRoaXNIcmVmIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm1lbnVpZCIsIkJvb2xlYW4iLCJzZXRUaW1lb3V0IiwidGFiQXJyYXkiLCJwYXJOYXYiLCJvbGlDbGFzcyIsIm9saSIsIm9hIiwibGV2ZWwiLCJuYXZjaGlsZCIsImluaXRQYW5lbCIsInByTGVmdCIsIiR0YWJsaSIsIiRuYXZfaG92ZXJfY2hpbGQiLCJnZXRGdW4iLCJyb3V0ZSIsIm1lbnVDbGljayIsImlzVHJpZ2dlciIsInNldE1hcERhdGEiLCJjbG9zZUxvYWQiLCJkYXRhQWxsIiwibWFwZGF0YSIsInJlcyIsImVyciIsIl9jbGFzcyIsImRvbUlkIiwiUGxnU2lkZUFjY29yZGlvbiIsImluaXRQbGdTaWRlQWNjb3JkaW9uIiwiZmlsdGVyRGF0YSIsIkRhdGEiLCJ2YWx1ZXMiLCJtYXBSZXNldE9wZW5NZW51TGlzdCIsIm1hcERhdGEiLCJ0cmVlRGF0YSIsInJlY3Vyc2l2ZSIsImNoaWxkIiwiaGFzaCIsImlzQWN0aXZlIiwibWFwVXBkYXRlQ2hpbGRyZW5OYW4iLCJ0cmVlIiwiY2hpbGRyZW4iLCJzaWRlYmFyTGkiLCJibGFuayIsImNoaWxkSXRlbSIsIm1hcFVwZGF0ZU1haW5OYXYiLCJUZW1wbGF0ZU1hcCIsInRwbCIsInZpcHNwYSIsImluZGV4SWQiLCJhamF4SW5pdCIsImxvYWRkYXRhIiwiTG9hZERhdGEiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZ2V0Iiwic2V0IiwibmV3VmFsdWUiLCJyb3V0ZXJNYXAiLCJsb2NhdGlvbiIsImxvZ29Gb2xkIiwibmF2TGFzdCIsInJlc3VsdCIsInNsZmUiLCJpcyIsInNpZGViYXIiLCJzbGlkZVRvZ2dsZSIsInNsaWRlVXAiLCJzZXRPcGVuS2V5dXAiLCJ0aXAiLCJvdXRlckhUTUwiLCIkZG9tIiwibmF2X2hvdmVyX2NoaWxkIiwib2JqZWN0Iiwicm91dGVTZXR0aW5nIiwidHJlZWRhdGEiLCJyZXNwb25zZSIsInJlc3VsdE5hbWUiLCJpZGFyciIsInVuc2hpZnQiLCJ0b1RyZWUiLCJzcGxpdCIsIm1hdGNoIiwidGVtcGxhdGVVcmwiLCJpZnJhbWUiLCJjb250cm9sbGVyIiwic3JjUGF0aCIsInBhcmVudF9uYW1lIiwic3RhdGVBcnIiLCJxdWVyeUlkIiwib3BlcmF0ZVR5cGUiLCJsYXN0TW9kaWZ5VGltZSIsImhlbHBDb2RlIiwiY3JlYXRvck5hbWUiLCJjcmVhdG9ySWQiLCJjcmVhdGVUaW1lIiwibW9kaWZpZXJJZCIsIm1vZGlmaWVyTmFtZSIsInNvcnQiLCJQbGdTaWRlQWNjb3JkaW9uUm91dGUiLCJza2luQXJyIiwibm9ybWFsIiwiYnJpZWYiLCJjYXJkIiwicGxndGFicyIsIml0ZW1saXN0IiwicnAiLCJyYSIsImluZGV4QWN0aXZlIiwidHAiLCJhbGxvd0Nsb3NlIiwicGxnVGFicyIsInByZUluZGV4IiwidGltZSIsImZhZGVJbiIsIiR0aGlzIiwiZGVsZXRlVGFicyIsImxvZyIsImFkZFRhYnMiLCJsYXlpZCIsImNoYW5nZVRhYnMiLCJnZXROdW0iLCJ0aXRsZU9iaiIsImNvdW50IiwiY291bnQwMSIsIm91dGVyV2lkdGgiLCJjb3VudDAyIiwicHJldiIsImxpdyIsImxpTnVtIiwicGluZGV4IiwiYm9vbGUiLCJpc0NoYW5nZSIsImN1ckxpIiwiTnVtYmVyIiwiZGVmaW5lIiwicmVhbmRUcGwiLCJ0YWJBZGQiLCJzdGFjayIsInJlZyIsImVsZU9iaiIsInRhYkNoYW5nZSIsIml0bWUiLCJ0YWJEZWxldGUiLCJldmVudE5hbWUiLCJQbGdUYWJzIiwiaW5pdFBsZ1RhYnMiLCJ6VHJlZSIsImlzUGFyZW50IiwiRXhwYW5kIiwidHJlZUlkIiwidHJlZU5vZGUiLCJ0SWQiLCJnZXRaVHJlZU9iaiIsIk5PZGVzIiwiZ2V0Tm9kZXMiLCJ0ZCIsImV4cGFuZE5vZGUiLCJwbGdadHJlZSIsImluaXRBamF4IiwidG9vbEJhciIsInRvb2xCYXIyIiwic2V0RGF0YSIsImlzRXhwYW5kIiwic2V0dGluZyIsInZpZXciLCJzZWxlY3RlZE11bHRpIiwic2ltcGxlRGF0YSIsImVuYWJsZSIsImlkS2V5IiwicElkS2V5Iiwicm9vdFBJZCIsIm9uRXhwYW5kIiwiYmluZCIsInNldERhdGUiLCJvbnJlc2l6ZSIsInBPYmoiLCJ0b29sYmFyQnRuSGVpZ2h0IiwidG9vbGJhckJ0bjIiLCJwYXJlbnRIZWlnaHQiLCJvYmpVbCIsImNsYXNzIiwidHJlZU9iaiIsInRvb2xiYXJCdG4iLCJidG5Hcm91cCIsImJ0bkdyb3VwMiIsIm5ld0NvdW50Iiwibm9kZU9iaiIsIm5vZGVzIiwiZ2V0U2VsZWN0ZWROb2RlcyIsIkV2ZW50Q2FsbGJhY2siLCJhZGROb2RlcyIsInNlbGVjdE5vZGUiLCJQbGdadHJlZSIsImV4cG9ydHMiLCJoaW50IiwiTU9EX05BTUUiLCJTRUxFQ1QiLCJTRUxFQ1RFRCIsInRoYXQiLCJldmVudHMiLCJvbmV2ZW50IiwidGhpc0lucyIsImdldENoZWNrZWQiLCJDbGFzcyIsInJlbmRlcklucHV0VGFncyIsInZhbHVlU2VwYXJhdG9yIiwibGFiZWxTZXBhcmF0b3IiLCJ2YWx1ZU5hbWUiLCJtZXRob2QiLCJ3aGVyZSIsImhlYWRlcnMiLCJwYXJzZURhdGEiLCJjaGVja2VkTmFtZSIsImluZGV4TmFtZSIsInJlRWxlbSIsInB1bGxEYXRhIiwicmVuZGVyRGF0YSIsIiR0aXRsZSIsIiRkZDAiLCJmb3JtYXREYXRhIiwibSIsImNoZWNrYm94IiwiQ0xBU1NOQU1FIiwiQ0hFQ0tFRCIsInN1bSIsImFsbEVsZSIsIm5leHRBbGwiLCIkZGQiLCJsYXl1aVZhbHVlIiwibiIsInByb3AiLCJhbGxjaGVja2JveCIsIiRhbGwiLCJkZCIsImVsZUNoZWNrZWQiLCJpc0FsbCIsImN1cnJlbnRIdG1sIiwic2VsZWN0TGlzdCIsImlubmVyVGV4dCIsIiRkZHMiLCJyYWRpbyIsIklDT04iLCJDSEVDS0VEX0lDT04iLCJlbElEIiwiY2hl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OWZzQyxDQXlqQnRDOzs7QUFDQTJULEVBQUFBLEtBQUssQ0FBQzdtQixTQUFOLENBQWdCNG1CLFVBQWhCLEdBQTZCLFlBQVk7QUFDdkMsUUFBSUosSUFBSSxHQUFHLElBQVg7QUFBQSxRQUNFcmpCLE9BQU8sR0FBR3FqQixJQUFJLENBQUN0ZSxNQURqQjtBQUFBLFFBRUV4RCxJQUFJLEdBQUd2QixPQUFPLENBQUN1QixJQUZqQjtBQUFBLFFBR0U0aUIsV0FBVyxHQUFHbmtCLE9BQU8sQ0FBQytFLE1BQVIsQ0FBZW9mLFdBSC9CO0FBS0EsV0FBTztBQUNMckwsTUFBQUEsTUFBTSxFQUFFOVksT0FBTyxDQUFDOFksTUFEWDtBQUVMdlgsTUFBQUEsSUFBSSxFQUFFQSxJQUFJLENBQUM4UixNQUFMLENBQVksVUFBVTNLLElBQVYsRUFBZ0I7QUFDaEMsZUFBT0EsSUFBSSxDQUFDeWIsV0FBRCxDQUFKLEtBQXNCLElBQTdCO0FBQ0QsT0FGSztBQUZELEtBQVA7QUFNRCxHQVpELENBMWpCc0MsQ0F3a0J0Qzs7O0FBQ0FuVCxFQUFBQSxVQUFVLENBQUMvRyxNQUFYLEdBQW9CLFVBQVVqSyxPQUFWLEVBQW1CcW1CLGFBQW5CLEVBQWtDO0FBRXBELFFBQUlDLEdBQUcsR0FBRyxJQUFJNUMsS0FBSixDQUFVMWpCLE9BQVYsRUFBbUJxbUIsYUFBbkIsQ0FBVjtBQUNBLFdBQU83QyxPQUFPLENBQUMvVSxJQUFSLENBQWE2WCxHQUFiLENBQVA7QUFDRCxHQUpEOztBQU1BdEQsRUFBQUEsT0FBTyxDQUFDLFlBQUQsRUFBZWhTLFVBQWYsQ0FBUDtBQUVELENBamxCRCIsImZpbGUiOiJwbGcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJEYXRlLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiAoZm10KSB7IC8vYXV0aG9yOiBtZWl6eiBcclxuICB2YXIgbyA9IHtcclxuICAgIFwiTStcIjogdGhpcy5nZXRNb250aCgpICsgMSwgLy/mnIjku70gXHJcbiAgICBcImQrXCI6IHRoaXMuZ2V0RGF0ZSgpLCAvL+aXpSBcclxuICAgIFwiaCtcIjogdGhpcy5nZXRIb3VycygpLCAvL+Wwj+aXtiBcclxuICAgIFwibStcIjogdGhpcy5nZXRNaW51dGVzKCksIC8v5YiGIFxyXG4gICAgXCJzK1wiOiB0aGlzLmdldFNlY29uZHMoKSwgLy/np5IgXHJcbiAgICBcInErXCI6IE1hdGguZmxvb3IoKHRoaXMuZ2V0TW9udGgoKSArIDMpIC8gMyksIC8v5a2j5bqmIFxyXG4gICAgXCJTXCI6IHRoaXMuZ2V0TWlsbGlzZWNvbmRzKCkgLy/mr6vnp5IgXHJcbiAgfTtcclxuICBpZiAoLyh5KykvLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAodGhpcy5nZXRGdWxsWWVhcigpICsgXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7XHJcbiAgZm9yICh2YXIgayBpbiBvKVxyXG4gICAgaWYgKG5ldyBSZWdFeHAoXCIoXCIgKyBrICsgXCIpXCIpLnRlc3QoZm10KSkgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoUmVnRXhwLiQxLmxlbmd0aCA9PSAxKSA/IChvW2tdKSA6ICgoXCIwMFwiICsgb1trXSkuc3Vic3RyKChcIlwiICsgb1trXSkubGVuZ3RoKSkpO1xyXG4gIHJldHVybiBmbXQ7XHJcbn07XHJcblxyXG4vLyDlop7lvLpjb2Rl55qE5YGl5aOu5oCn77yM5Li76KaB5piv5YW25LuW55So5LiN5YiwZGh0bWzmj5Lku7bnmoTmlofku7bvvIzkuI3lho3pnIDopoHlvJXlhaXov5nkuKrmj5Lku7bkuoZcclxuaWYoISggdHlwZW9mIGRodG1sWENhbGVuZGFyT2JqZWN0ID09PSAndW5kZWZpbmVkJyB8fCAhZGh0bWxYQ2FsZW5kYXJPYmplY3QpKXtcdFx0XHJcbiAgZGh0bWxYQ2FsZW5kYXJPYmplY3QucHJvdG90eXBlLmxhbmdEYXRhW1wiY2hcIl0gPSB7XHJcbiAgICBkYXRlZm9ybWF0OiAnJVktJW0tJWQnLFxyXG4gICAgbW9udGhlc0ZOYW1lczogW1wiMeaciFwiLCcy5pyIJywnM+aciCcsXCI05pyIXCIsJzXmnIgnLCc25pyIJyxcIjfmnIhcIiwnOOaciCcsJznmnIgnLFwiMTDmnIhcIiwnMTHmnIgnLCcxMuaciCddLFxyXG4gICAgbW9udGhlc1NOYW1lczogW1wiMeaciFwiLCcy5pyIJywnM+aciCcsXCI05pyIXCIsJzXmnIgnLCc25pyIJyxcIjfmnIhcIiwnOOaciCcsJznmnIgnLFwiMTDmnIhcIiwnMTHmnIgnLCcxMuaciCddLFxyXG4gICAgZGF5c0ZOYW1lczogW1wi5pif5pyf5aSpXCIsXCLmmJ/mnJ/kuIBcIixcIuaYn+acn+S6jFwiLFwi5pif5pyf5LiJXCIsXCLmmJ/mnJ/lm5tcIixcIuaYn+acn+S6lFwiLFwi5pif5pyf5YWtXCJdLFxyXG4gICAgZGF5c1NOYW1lczogW1wi5pelXCIsXCLkuIBcIixcIuS6jFwiLFwi5LiJXCIsXCLlm5tcIixcIuS6lFwiLFwi5YWtXCJdLFxyXG4gICAgd2Vla3N0YXJ0Olwi5ZGo5pelXCIsXHJcbiAgICB3ZWVrbmFtZTogXCLmmJ/mnJ9cIixcclxuICAgIHRvZGF5OiBcIuS7iuWkqVwiLFxyXG4gICAgY2xlYXI6IFwi5riF6ZmkXCJcclxuICB9XHJcbiAgZGh0bWxYQ2FsZW5kYXJPYmplY3QucHJvdG90eXBlLmxhbmcgPSBcImNoXCI7XHJcbn07XHJcblxyXG5cclxuXHJcbnZhciBQcm9sb2cgPSB7fTtcclxudmFyIEdyaWRCYXNlUGF0aD1cIi9wcm9sb2d1aS9jb21wb25lbnRzL1BsZ0dyaWQvY29kZWJhc2UvaW1hZ2VzXCI7XHJcbnZhciB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYXV0aG9yaXphdGlvblwiKTtcclxuXHJcbi8v6I635Y+W5YWD57Sg55qE57q15Z2Q5qCHIFxyXG5Qcm9sb2cuZ2V0VG9wID0gZnVuY3Rpb24oZSkge1xyXG5cdHZhciBvZmZzZXQgPSBlLm9mZnNldFRvcDtcclxuXHRpZiAoZS5vZmZzZXRQYXJlbnQgIT0gbnVsbCkge1xyXG5cdFx0b2Zmc2V0ICs9IFByb2xvZy5nZXRUb3AoZS5vZmZzZXRQYXJlbnQpO1xyXG5cdH1cclxuXHQ7XHJcblx0cmV0dXJuIG9mZnNldDtcclxufVxyXG4vLyDojrflj5blhYPntKDnmoTmqKrlnZDmoIdcclxuUHJvbG9nLmdldExlZnQgPSBmdW5jdGlvbihlKSB7XHJcblx0dmFyIG9mZnNldCA9IGUub2Zmc2V0TGVmdDtcclxuXHRpZiAoZS5vZmZzZXRQYXJlbnQgIT0gbnVsbCkge1xyXG5cdFx0b2Zmc2V0ICs9IFByb2xvZy5nZXRMZWZ0KGUub2Zmc2V0UGFyZW50KTtcclxuXHR9XHJcblx0O1xyXG5cdHJldHVybiBvZmZzZXQ7XHJcbn1cclxuXHJcblByb2xvZy5oYXNKc29uID0gZnVuY3Rpb24oanNvbkFycmF5LGpzb24pe1xyXG5cdGZvcih2YXIgaT0wO2k8anNvbkFycmF5Lmxlbmd0aDtpKyspe1xyXG5cdFx0dmFyIGIgPSB0cnVlO1xyXG5cdFx0Zm9yKHZhciBrZXkgaW4ganNvbkFycmF5W2ldKXtcclxuXHRcdFx0XHRpZihqc29uQXJyYXlbaV1ba2V5XSAhPSBqc29uW2tleV0pe1xyXG5cdFx0XHRcdFx0YiA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYoYilcclxuXHRcdFx0cmV0dXJuIGk7XHJcblx0fVxyXG5cdHJldHVybiAtMTtcclxufVxyXG5cclxuXHJcblByb2xvZy5hamF4ID0gZnVuY3Rpb24ob3B0aW9ucyl7XHJcblx0dmFyIHBkZWZhdWx0ID0ge1xyXG5cdFx0dGltZW91dDozMDAwMCxcclxuXHRcdGRhdGFUeXBlOlwianNvblwiXHJcblx0fVxyXG5cdHZhciBvcHQgPSAkLmV4dGVuZCh0cnVlLHBkZWZhdWx0LG9wdGlvbnMpO1xyXG5cdG9wdC5lcnJvciA9IGZ1bmN0aW9uKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bil7XHJcblx0XHRsYXllci5tc2codGV4dFN0YXR1cyk7XHJcblx0XHRpZihvcHRpb25zLmVycm9yKVxyXG5cdFx0XHRvcHRpb25zLmVycm9yKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bik7XHJcblx0fVxyXG5cdG9wdC5iZWZvcmVTZW5kID0gZnVuY3Rpb24gKHhocikge1xyXG5cdCAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgdG9rZW4pOyBcclxuXHQgICAgICAgaWYob3B0aW9ucy5iZWZvcmVTZW5kKXtcclxuXHQgICAgXHQgICBvcHRpb25zLmJlZm9yZVNlbmQoeGhyKTtcclxuXHQgICAgICAgfVxyXG5cdH1cclxuXHQkLmFqYXgob3B0KTtcclxufVxyXG5cclxuUHJvbG9nLnN5bmNBamF4ID0gZnVuY3Rpb24ob3B0aW9ucyl7XHJcblx0dmFyIHBkZWZhdWx0ID0ge1xyXG5cdFx0XHR0aW1lb3V0OjMwMDAwXHRcclxuXHRcdH1cclxuXHR2YXIgb3B0ID0gJC5leHRlbmQodHJ1ZSwgcGRlZmF1bHQsIG9wdGlvbnMpO1xyXG5cdG9wdC5lcnJvciA9IGZ1bmN0aW9uKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bil7XHJcblx0XHRsYXllci5tc2codGV4dFN0YXR1cyk7XHJcblx0XHRpZihvcHRpb25zLmVycm9yKVxyXG5cdFx0XHRvcHRpb25zLmVycm9yKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bik7XHJcblx0fVxyXG5cdG9wdC5hc3luYyA9IGZhbHNlO1xyXG5cdG9wdC5iZWZvcmVTZW5kID0gZnVuY3Rpb24gKHhocikge1xyXG5cdCAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgdG9rZW4pOyBcclxuXHQgICAgICAgaWYob3B0aW9ucy5iZWZvcmVTZW5kKXtcclxuXHQgICAgXHQgICBvcHRpb25zLmJlZm9yZVNlbmQoeGhyKTtcclxuXHQgICAgICAgfVxyXG5cdH1cclxuXHQgICBcclxuXHQkLmFqYXgob3B0KTtcclxufVxyXG5cclxuUHJvbG9nLmdldEZvcm1CeUlkID0gZnVuY3Rpb24oc3lzdGVtSWQsbWVudUlkLGZvcm1JZCkge1xyXG5cdFxyXG5cdHZhciBteWZvcm0gPW51bGw7XHJcblx0XHJcblx0dmFyIGRhdGEgPSBQcm9sb2cuZ2V0SnNvbkRhdGEoXCIvamFwaS9zeXNmb3JtMi9mb3JtXCIsXCJHRVRcIix7c3lzdGVtSWQ6c3lzdGVtSWQsbWVudUlkOm1lbnVJZCxmb3JtSWQ6Zm9ybUlkLGlkOnN5c3RlbUlkK1wiX1wiK21lbnVJZCtcIl9cIitmb3JtSWR9KTtcclxuXHRpZihkYXRhIT1udWxsICYmIGRhdGEuc3VjY2Vzcz09dHJ1ZSl7XHJcblx0XHRcclxuXHRcdGlmKGRhdGEuZGF0YSE9bnVsbCAmJiBkYXRhLmRhdGEuZmllbGRzIT1udWxsKXtcclxuXHRcdFx0bXlmb3JtID0gbmV3IFByb2xvZ0Zvcm0oKTtcclxuXHRcdFx0dmFyIGZvcm1kYXRhID0gSlNPTi5wYXJzZShkYXRhLmRhdGEuZmllbGRzKTtcclxuXHRcdFx0bXlmb3JtLmluaXQoZm9ybWRhdGEpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGxheWVyLm1zZyhcIuacquWumuS5ieihqOWNleWGheWuuVwiKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHRyZXR1cm4gbXlmb3JtO1xyXG59O1xyXG5cclxuUHJvbG9nLmNyZWF0ZVJhbmRvbUlkID0gZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKStNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIsNSk7XHJcbn1cclxuXHJcblByb2xvZy5sb2FkaW5nID0gZnVuY3Rpb24oZWwpe1xyXG4gICAgXHJcblx0dmFyIGxvYWRpbmcgPSBQbGdEaWFsb2cubG9hZGluZygpO1xyXG5cdC8vbGF5dWktbGF5ZXIxNFxyXG5cdCQoXCIjbGF5dWktbGF5ZXItc2hhZGVcIitsb2FkaW5nKS5hcHBlbmRUbyhcIiNcIitlbCk7XHJcblx0JChcIiNsYXl1aS1sYXllclwiK2xvYWRpbmcpLmFwcGVuZFRvKFwiI1wiK2VsKTtcclxuXHQkKFwiI2xheXVpLWxheWVyXCIrbG9hZGluZykuY3NzKFwibGVmdFwiLFwiNTAlXCIpO1xyXG5cdCQoXCIjbGF5dWktbGF5ZXJcIitsb2FkaW5nKS5jc3MoXCJtYXJnaW4tbGVmdFwiLFwiLTkwcHhcIik7XHJcblx0JChcIiNsYXl1aS1sYXllclwiK2xvYWRpbmcpLmNzcyhcInRvcFwiLDIwMCtcInB4XCIpO1xyXG5cdHJldHVybiBsb2FkaW5nO1xyXG59XHJcblxyXG5Qcm9sb2cuY2xvc2VMb2FkaW5nID0gZnVuY3Rpb24oaWQpe1xyXG5cdGxheWVyLmNsb3NlKGlkKTtcclxufVxyXG5cclxuUHJvbG9nLmxvYWRpbmcyPWZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGluZGV4ID0gUGxnRGlhbG9nLmxvYWQoMiwge1xyXG4gICAgICAgIHNoYWRlOiBbMC42LCAnI2ZmZiddIC8vMC4x6YCP5piO5bqm55qE55m96Imy6IOM5pmvXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICBQbGdEaWFsb2cuY2xvc2UoaW5kZXgpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qXHJcbiogQG1ldGhvZCDliKDpmaQgUGxnR3JpZCDooYzmlbDmja5cclxuKiBAcGFyYW0gZ3JpZCAtIGdyaWTmjqfku7ZcclxuKiBAcGFyYW0gdXJsIHtzdHJpbmd9IC0g5pWw5o2u5o6l5Y+j5Zyw5Z2AXHJcbiogQHBhcmFtIHR5cGUge3N0cmluZ30gLSDmlbDmja7mjqXlj6Por7fmsYLnsbvlnovvvIzkuLrnqbrml7bpu5jorqRwb3N0XHJcbiogQHBhcmFtIGNvbnRlbnR0eXBlIHtzdHJpbmd9IC0g5pWw5o2u5o6l5Y+j6K+35rGCIGNvbnRlbnRUeXBlIOexu+Wei++8jOS4uuepuuaXtum7mOiupGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxyXG4qIEBwYXJhbSBwYXJhbSB7b2JqZWN0fSAtIOivt+axguWPguaVsOWQjSB7XCJpZFwiOjB9XHJcbiogQGF1dGhvciBqaXdcclxuKiBAZGVwcmVjYXRlZCDliKDpmaRQbGdHcmlk6YCJ5Lit6KGM5pWw5o2u77yM5Yig6Zmk5oiQ5Yqf5ZCOcmVsb2FkXHJcbiovXHJcblxyXG5Qcm9sb2cuZGVsR3JpZFJvd0RhdGEgPSBmdW5jdGlvbiAoZ3JpZCx1cmwsdHlwZSxjb250ZW50dHlwZSxwYXJhbSxtdWx0aXNlbGVjdCl7XHJcbiAgICBpZihtdWx0aXNlbGVjdD09PWZhbHNlKSB7XHJcbiAgICAgICAgaWYgKGdyaWQuZ2V0U2VsZWN0ZWRSb3dJZCgpID09IG51bGwgJiYgcGFyYW0ubGVuZ3RoPDEpIHtcclxuICAgICAgICAgICAgUGxnRGlhbG9nLm1zZyhcIuivt+mAieaLqeihjCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBpZihncmlkLmdldENoZWNrZWRJZHMoKSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIFBsZ0RpYWxvZy5tc2coXCLor7fpgInmi6nooYwhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFBsZ0RpYWxvZy5jb25maXJtKCfmmK/lkKbliKDpmaTlkJfvvJ8nLCB7XHJcbiAgICAgICAgdGl0bGU6ICfliKDpmaTmj5DnpLonLFxyXG4gICAgICAgIGJ0bjogWyfnoa7lrponLCAn5Y+W5raIJ10sXHJcbiAgICAgICAgekluZGV4OmxheWVyLnpJbmRleFxyXG4gICAgfSwgZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgUGxnRGlhbG9nLmNsb3NlKGluZGV4KTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGU9PT1cIlwiKSB0eXBlPVwicG9zdFwiO1xyXG4gICAgICAgIGlmIChjb250ZW50dHlwZT09PVwiXCIpIGNvbnRlbnR0eXBlPVwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCI7XHJcblxyXG4gICAgICAgIGxheWVyLm1zZyhcIuaVsOaNruWkhOeQhuS4rS4uLlwiKTtcclxuICAgICAgICBQcm9sb2cuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDp1cmwsXHJcbiAgICAgICAgICAgIHR5cGU6dHlwZSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGNvbnRlbnR0eXBlLFxyXG4gICAgICAgICAgICBkYXRhOnBhcmFtLFxyXG4gICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGlmKHR5cGVvZiBkYXRhICE9IFwib2JqZWN0XCIpIGRhdGE9SlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuc3VjY2Vzcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsYXllci5jbG9zZUFsbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsb2Zmc2V0OiBcImF1dG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsaWQ6ICdsYXllckVycm9yJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAsYXJlYTpbXCI1MDBweFwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsdGl0bGU6XCLplJnor6/mj5DnpLpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsY29udGVudDogJzxkaXYgc3R5bGU9XCJwYWRkaW5nOiAxMHB4O1wiPicrJC5wYXJzZUpTT04oZGF0YSkubWVzc2FnZSsnPC9kaXY+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAsYnRuOiAn5YWz6ZetJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAsYnRuQWxpZ246ICdyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAsc2hhZGU6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLHllczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNsb3NlQWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24oKXsgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59IiwiO1xyXG4oZnVuY3Rpb24oJCkge1xyXG5cclxuICAgICQuZm4uaW5pdFBsZ0NhcmQgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHBnID0gbmV3IFBsZ0NhcmQob3B0aW9ucyk7XHJcbiAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgcGcucmVuZGVyVG8oaWQpO1xyXG4gICAgICAgIHJldHVybiBwZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgUGxnQ2FyZCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucmVuZGVyZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaHRtbEZyYWdtZW50ICBodG1s5Luj56CB54mH5q61XHJcbiAgICAgICAgICogY29uZmlnIOm7mOiupOeahOmFjee9ruaWh+S7tlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBodG1sRnJhZ21lbnQsIGNvbmZpZztcclxuXHJcbiAgICAgICAgY29uZmlnID0ge307XHJcbiAgICAgICAgLy8gY29uZmlnID0gT2JqZWN0LmFzc2lnbihjb25maWcsIG9wdGlvbnMuY29uZmlnKTtcclxuICAgICAgICBjb25maWcgPSAkLmV4dGVuZCh7fSwgY29uZmlnLCBvcHRpb25zLmNvbmZpZyk7XHJcblxyXG4gICAgICAgIHZhciBmYWN0b3J5ID0ge1xyXG4gICAgICAgICAgICBfc3R5bGU6IGNvbmZpZy5zdHlsZSxcclxuICAgICAgICAgICAgX2RhdGE6IGNvbmZpZy5kYXRhIHx8ICcnLFxyXG4gICAgICAgICAgICBfc3RyVGl0bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwicGxnLWNhcmQtY29tcG9uZW50c1wiPiBcXFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmQtaGVhZGVyLWNvbnRhaW5lclwiPlxcXHJcbiAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD48bGVnZW5kPic7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9zdHJIZWFkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cInBsZy1jYXJkLWdyb3VwXCI+JztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX3N0clRpdGxlSGVhZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwvbGVnZW5kPjwvZmllbGRzZXQ+PC9kaXY+PGRpdiBjbGFzcz1cInBsZy1jYXJkLWdyb3VwXCI+JztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX3N0ckZvb3RlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9zdHJGb290ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZW5lcmF0ZU9uZVRlbXBsYXRlOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkLW5vXCI+JHt2YWwuY2FyZE5vfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1tYWluXCI+JHt2YWwuY2FyZE5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICBcclxuICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInBsZy1jYXJkLWJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbUJ0bnMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB2YWwuYnRuLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtQnRucyArPSBgXHJcbiAgICAgICAgICAgICAgICA8bGk+JHt2YWx1ZS50ZXh0fTwvbGk+XHJcbiAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHRlbUJ0bnM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbUZyYWdtZW50O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbmVUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5fZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1ub1wiPiR7dmFsLmNhcmROb308L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmQtbWFpblwiPiR7dmFsLmNhcmROYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgXHJcbiAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJwbGctY2FyZC1idG4tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1CdG5zID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsLmJ0bi5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbUJ0bnMgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGxpPiR7dmFsdWUudGV4dH08L2xpPlxyXG4gICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSB0ZW1CdG5zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IGBcclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLl9zdHJIZWFkKCkgKyB0ZW1GcmFnbWVudCArIHNlbGYuX3N0ckZvb3RlcigpO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHdvVGVtcGxhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuICd0d29UZW1wbGF0ZSc7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1ib2R5IHByaW1hcnlcIj5cclxuICAgICAgICAgICAgICAgICAgICAke3ZhbC5jYXJkTmFtZX1cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gIFxyXG4gICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicGxnLWNhcmQtYnRuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtQnRucyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5idG4uZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1CdG5zICs9IGBcclxuICAgICAgICAgICAgICAgIDxsaT4ke3ZhbHVlLnRleHR9PC9saT5cclxuICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gdGVtQnRucztcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBgXHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5fc3RySGVhZCgpICsgdGVtRnJhZ21lbnQgKyBzZWxmLl9zdHJGb290ZXIoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGhyZWVUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gJ3RocmVlVGVtcGxhdGUnO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5fZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmQtYm9keSBwcmltYXJ5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJHt2YWwuY2FyZE5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICBcclxuICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInBsZy1jYXJkLWJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbUJ0bnMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB2YWwuYnRuLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtQnRucyArPSBgXHJcbiAgICAgICAgICAgICAgICA8bGk+JHt2YWx1ZS50ZXh0fTwvbGk+XHJcbiAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHRlbUJ0bnM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuX3N0ckhlYWQoKSArIHRlbUZyYWdtZW50ICsgc2VsZi5fc3RyRm9vdGVyKCk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhZGRUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicGxnLWNhcmQgcGxnLWFkZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLWFkZC0xIFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25lVGl0bGVUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYDxkaXYgY2xhc3M9XCJwbGctY2FyZC1jb21wb25lbnRzXCI+PGRpdiBjbGFzcz1cInBsZy1jYXJkLWhlYWRlci1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxmaWVsZHNldD48bGVnZW5kPlxyXG4gICAgICAgICAgICAgICAgJHt2YWwudGl0bGV9XHJcbiAgICAgICAgICAgICAgICA8bGVnZW5kPjxmaWVsZHNldD48L2Rpdj5gO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLl9zdHJIZWFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5nZW5lcmF0ZU9uZVRlbXBsYXRlKHZhbC5kYXRhTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5fc3RyRm9vdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYDwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbUZyYWdtZW50O1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25lVGl0bGVBZGRUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBpZighc2VsZi5fZGF0YSB8fCBzZWxmLl9kYXRhLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYDxkaXYgY2xhc3M9XCJwbGctY2FyZC1jb21wb25lbnRzXCI+PGRpdiBjbGFzcz1cInBsZy1jYXJkLWhlYWRlci1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxmaWVsZHNldD48bGVnZW5kPlxyXG4gICAgICAgICAgICAgICAgJHt2YWwudGl0bGV9XHJcbiAgICAgICAgICAgICAgICA8bGVnZW5kPjxmaWVsZHNldD48L2Rpdj5gO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLl9zdHJIZWFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5nZW5lcmF0ZU9uZVRlbXBsYXRlKHZhbC5kYXRhTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5hZGRUZW1wbGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHNlbGYuX3N0ckZvb3RlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IGA8L2Rpdj5gO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZW1GcmFnbWVudDtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIOWQkeWkluaatOmcsuWHuuacgOWQjueahOaooeeJiOagt+W8j1xyXG4gICAgICAgICAgICBnZXRIdG1sRnJhZ21lbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJOYW1lID0gc2VsZi5fc3R5bGUgKyAnVGVtcGxhdGUnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGZbYXR0ck5hbWVdID8gc2VsZlthdHRyTmFtZV0oKSA6IG5ldyBFcnJvcign5LiN5a2Y5Zyo6L+Z5Liq5pa55rOVJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gLy9jb25zb2xlLmxvZyhmYWN0b3J5LmdldEh0bWxGcmFnbWVudCgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbiA9IGZ1bmN0aW9uKGV2ZW50bmFtZSwgY2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBST1VUSU5FX09QRVJBVElPTiA9IFsnb25lJywgJ3R3bycsICd0aHJlZSddLFxyXG4gICAgICAgICAgICAgICAgQ09NUExFWF9PUEVSQVRJT04gPSBbJ29uZVRpdGxlJywgJ3R3b1RpdGxlJywgJ3RocmVlVGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdvbmVUaXRsZUFkZCcsICd0d29UaXRsZUFkZCcsICd0aHJlZVRpdGxlQWRkJ107XHJcblxyXG4gICAgICAgICAgICAvLyDmraTlpITlpJrkuobkuIDkuKpvbmVUaXRsZeexu+Wei1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5zdHlsZSAhPT0gJ2FkZCdcclxuICAgICAgICAgICAgICAgICYmIGV2ZW50bmFtZSAmJiBldmVudG5hbWUgPT0gJ2NsaWNrJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChST1VUSU5FX09QRVJBVElPTi5pbmNsdWRlcyhjb25maWcuc3R5bGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBvcHRpb25zLnJlbmRlcmVyKS5vbignY2xpY2snLCAnbGknLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVtSW5kZXggPSAkKHRoaXMpLmNsb3Nlc3QoXCIucGxnLWNhcmRcIikuaW5kZXgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmRObyA9IGNvbmZpZy5kYXRhW3RlbUluZGV4XS5jYXJkTm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxsX2JhY2tfZm4gPSBjb25maWcuZGF0YVt0ZW1JbmRleF0uYnRuWyQodGhpcykuaW5kZXgoKV0uZm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYXJkTm8sIGNhbGxfYmFja19mbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoQ09NUExFWF9PUEVSQVRJT04uaW5jbHVkZXMoY29uZmlnLnN0eWxlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBvcHRpb25zLnJlbmRlcmVyKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgJ2xpJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwSW5kZXggPSAkKHRoaXMpLmNsb3Nlc3QoXCIucGxnLWNhcmQtY29tcG9uZW50c1wiKS5pbmRleCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtSW5kZXggPSAkKHRoaXMpLmNsb3Nlc3QoXCIucGxnLWNhcmRcIikuaW5kZXgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnREYXRhID0gY29uZmlnLmRhdGFbZ3JvdXBJbmRleF0uZGF0YUxpc3RbdGVtSW5kZXhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE5vLCBjYWxsX2JhY2tfZm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTm8gPSBjdXJyZW50RGF0YS5jYXJkTm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxfYmFja19mbiA9IGN1cnJlbnREYXRhLmJ0blskKHRoaXMpLmluZGV4KCldLmZuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gY29uZmlnLmRhdGFbZ3JvdXBJbmRleF0udGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soY2FyZE5vLCBjYWxsX2JhY2tfZm4sIHRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGNhcmRObywgY2FsbF9iYWNrX2ZuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBvcHRpb25zLnJlbmRlcmVyKS5vbignY2xpY2snLCAnLnBsZy1hZGQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBJbmRleCA9ICQodGhpcykuY2xvc2VzdChcIi5wbGctY2FyZC1jb21wb25lbnRzXCIpLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IGNvbmZpZy5kYXRhW2dyb3VwSW5kZXhdLnRpdGxlOyAvLyDpnIDopoHojrflj5blvZPliY3nmoR0aXRsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh1bmRlZmluZWQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuc3R5bGUgPT09ICdhZGQnXHJcbiAgICAgICAgICAgICAgICAmJiBldmVudG5hbWUgJiYgZXZlbnRuYW1lID09ICdjbGljaycpIHtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgb3B0aW9ucy5yZW5kZXJlcikub24oJ2NsaWNrJywgJy5wbGctY2FyZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJUbyA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgICAgICQoJyMnICsgaWQpLmFwcGVuZChmYWN0b3J5LmdldEh0bWxGcmFnbWVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLnJlbmRlcmVyKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRvKG9wdGlvbnMucmVuZGVyZXIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5QbGdDYXJkID0gUGxnQ2FyZDtcclxuXHJcbn0gKGpRdWVyeSkpOyIsIjtcclxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gICQuZm4uaW5pdFBsZ0NhcmRMaXN0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHZhciBwZyA9IG5ldyBQbGdDYXJkTGlzdChvcHRpb25zKTtcclxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgcGcucmVuZGVyVG8oaWQpO1xyXG4gICAgcmV0dXJuIHBnO1xyXG4gIH1cclxuXHJcbiAgdmFyIFBsZ0NhcmRMaXN0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIGlmICghb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaHRtbEZyYWdtZW50ICBodG1s5Luj56CB54mH5q61XHJcbiAgICAgKiBjb25maWcg6buY6K6k55qE6YWN572u5paH5Lu2XHJcbiAgICAgKi9cclxuICAgIHZhciBodG1sRnJhZ21lbnQsIGNvbmZpZztcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgaXNTaG93QWRkOiB0cnVlICAgLy8g6buY6K6k5pi+56S6XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLCBvcHRpb25zLmRhdGEpO1xyXG5cclxuICAgIHZhciBmYWN0b3J5ID0ge1xyXG4gICAgICBfZGF0YTogY29uZmlnIHx8ICcnLFxyXG4gICAgICBfc3RyVGl0bGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRlbVN0ciA9ICcnO1xyXG5cclxuICAgICAgICB0ZW1TdHIgKz0gYDxkaXYgY2xhc3M9XCJwbGctem9uZS1jb250YWluZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLXpvbmUtaGVhZGVyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLXRpdGxlXCI+PGkgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLWljb24tbG9jYXRpb25cIj48L2k+XHJcbiAgICAgICAgICAkeyBzZWxmLl9kYXRhLnpvbmVOYW1lIH08L2Rpdj5gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHNlbGYuX2RhdGEuaXNTaG93QWRkKXtcclxuICAgICAgICAgIHRlbVN0ciArPSBgPGRpdiBjbGFzcz1cInBsZy1hZGRcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImxheXVpLWJ0biBsYXl1aS1idG4tbm9ybWFsXCIgZGF0YS16b25laWQ9JHtzZWxmLl9kYXRhLnpvbmVJZH0gbmFtZT1cInBsZy1hZGRcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImxheXVpLWljb25cIj4mI3hlNjU0OzwvaT5cclxuICAgICAgICAgICAgICDmt7vliqBcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGVtU3RyICs9IGA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY3VzdG9tZXItbGlzdFwiPlxyXG4gICAgICAgICAgPHVsIGNsYXNzPVwibGF5dWktcm93XCI+YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRlbVN0cjtcclxuICAgICAgfSxcclxuICAgICAgX3N0ckNlbGxTdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwibGF5dWktY29sLWxnMyBsYXl1aS1jb2wtbWQ0IGxheXVpLWNvbC1zbTYgXHJcbiAgICAgICAgbGF5dWktY29sLXhzMTJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNlbGxcIj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBfc3RyQ2VsbEhlYWQ6IGZ1bmN0aW9uIChoZWFkKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicGxnLWN1c3RvbWVyLW5hbWVcIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwicGxnLWJhZGdlLWRvdFwiPjwvaT4keyBoZWFkIH1cclxuICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBfc3RyQ2VsbEJvZHk6IGZ1bmN0aW9uIChkZXMpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJwbGctY3VzdG9tZXItZGVzXCI+JHsgZGVzIH08L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBfc3RyQ2VsbEZvb3RlcjogZnVuY3Rpb24gKG9iaikge1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmopO1xyXG4gICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgIHZhciB0ZW1GcmFnbWVudCA9Jyc7XHJcbiAgICAgICAgdGVtRnJhZ21lbnQgKz0gYDxkaXYgY2xhc3M9XCJwbGctY3VzdG9tZXItb3RoZXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY3V0b21lci1ub1wiPue8luWPtzo8c3Bhbj4keyBvYmoudXNlTm8gfTwvc3Bhbj48L2Rpdj5gO1xyXG5cclxuICAgICAgICB2YXIgb3BlcmF0Rm5MZW5ndGggPSBPYmplY3Qua2V5cyhvYmouYnRucykubGVuZ3RoO1xyXG4gICAgICAgIHZhciB0ZW1TdHIgPSAnJztcclxuICAgICAgICBpZihvcGVyYXRGbkxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgdGVtU3RyICs9IGA8ZGl2IGNsYXNzPVwicGxnLWN1dG9tZXItb3BlcmF0aW5nXCIgZGF0YS1pZD0ke29iai5pZH0+YDtcclxuICAgICAgICAgIHZhciBpdGVtO1xyXG4gICAgICAgICAgZm9yKGl0ZW0gaW4gb2JqLmJ0bnMpe1xyXG4gICAgICAgICAgICB0ZW1TdHIgKz0gYDxzcGFuIGNsYXNzPVwicGxnLSR7aXRlbX1cIj4ke29iai5idG5zW2l0ZW1dfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGVtU3RyICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCfnlKjmiLfphY3nva7nmoTmk43kvZzkuLrnqbonKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGVtRnJhZ21lbnQgKz0gdGVtU3RyO1xyXG4gICAgICAgIHRlbUZyYWdtZW50ICs9ICc8L2Rpdj4nO1xyXG4gICAgICBcclxuICAgICAgICByZXR1cm4gdGVtRnJhZ21lbnQ7XHJcbiAgICAgIH0sXHJcbiAgICAgIF9zdHJDZWxsRW5kOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBgPC9kaXY+XHJcbiAgICAgICAgPC9saT5gO1xyXG4gICAgICB9LFxyXG4gICAgICBfc3RyRm9vdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8L3VsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgICAgfSxcclxuICAgICAgLy8g5ZCR5aSW5pq06Zyy5Ye65pyA5ZCO55qE5qih54mI5qC35byPXHJcbiAgICAgIGdldEh0bWxGcmFnbWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgaWYoc2VsZi5fZGF0YS5jdXN0b21lckxpc3QgJiYgc2VsZi5fZGF0YS5jdXN0b21lckxpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICBzZWxmLl9kYXRhLmN1c3RvbWVyTGlzdC5tYXAoZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGVtT2JqID0ge1xyXG4gICAgICAgICAgICAgIGlkOiB2YWwuaWQsXHJcbiAgICAgICAgICAgICAgdXNlTm86IHZhbC51c2VObyxcclxuICAgICAgICAgICAgICBidG5zOiB2YWwuYnRuc1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5fc3RyQ2VsbFN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHNlbGYuX3N0ckNlbGxIZWFkKHZhbC5uYW1lKTtcclxuICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5fc3RyQ2VsbEJvZHkodmFsLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5fc3RyQ2VsbEZvb3Rlcih0ZW1PYmopO1xyXG4gICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLl9zdHJDZWxsRW5kKCk7XHJcblxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkKHNlbGYuX3N0clRpdGxlKCkgKyB0ZW1GcmFnbWVudCArIHNlbGYuX3N0ckZvb3RlcigpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFBsZ0NhcmRMaXN0LnByb3RvdHlwZS5jdXNvbiA9ZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcbiAgICAvLyDlvZNldmVudE5hbWXkuLphZGTnmoTml7blgJnvvIxpbmRleCDmmK/kuIDkuKpmdW5jdGlvbu+8jGNhbGxiYWNr5Li656m6XHJcbiAgICB0aGlzLm9uID0gZnVuY3Rpb24gKGV2ZW50bmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICBpZihldmVudG5hbWUgPT09ICdhZGQnKXtcclxuICAgICAgIFxyXG4gICAgICAgIHNlbGYuZXZlbnQuZmluZCgnLnBsZy1hZGQnKS5lcSgwKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB2YXIgY3VycmVudElkID0gJCh0aGlzKS5maW5kKCcubGF5dWktYnRuJykuZXEoMCkuZGF0YSgnem9uZWlkJyk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soY3VycmVudElkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYoc2VsZi5ldmVudC5maW5kKCcucGxnLScgKyBldmVudG5hbWUpLmxlbmd0aCl7XHJcbiAgICAgICAgICBzZWxmLmV2ZW50LmZpbmQoJy5wbGctJyArIGV2ZW50bmFtZSkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50SWQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5wbGctY3V0b21lci1vcGVyYXRpbmcnKS5kYXRhKCdpZCcpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjdXJyZW50SWQpO1xyXG5cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+e7keWumueahOS6i+S7tuS4jeWtmOWcqDo6JyArIGV2ZW50bmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlclRvID0gZnVuY3Rpb24gKGlkKSB7XHJcblxyXG4gICAgICB0aGlzLmV2ZW50ID0gZmFjdG9yeS5nZXRIdG1sRnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICQoJyMnICsgaWQpLmFwcGVuZCh0aGlzLmV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5yZW5kZXJlcikge1xyXG4gICAgICB0aGlzLnJlbmRlclRvKG9wdGlvbnMucmVuZGVyZXIpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHdpbmRvdy5QbGdDYXJkTGlzdCA9IFBsZ0NhcmRMaXN0O1xyXG5cclxufShqUXVlcnkpKTsiLCI7KGZ1bmN0aW9uICgkLCBsYXl1aSkge1xuXG4gICAgLy9QbGdUYWJzLmpzXG4gICAgbGF5dWkudXNlKFtcImxheWRhdGVcIl0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBsZ0RhdGU9bGF5dWkubGF5ZGF0ZTtcblxuICAgICAgICAgICAgd2luZG93LnBsZ0RhdGUgPSBwbGdEYXRlO1xuXG5cbiAgICAgICAgICAgICQuZm4ucGxnRGF0ZVJlbmRlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZz17XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOlwiXCIsICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgIHZhciBfdGhpcz10aGlzXG4gICAgICAgICAgICAgICAgdmFyIG9wdHM9JC5leHRlbmQodHJ1ZSxjb25maWcsb3B0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sZW5ndGg+MSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmVhY2goZnVuY3Rpb24oaW5kZXgsdmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZWxlbT10aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm90cHM9cGxnRGF0ZS5yZW5kZXIob3B0cylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5lbGVtPXRoaXMuc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdHBzPXBsZ0RhdGUucmVuZGVyKG9wdHMpIFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgIHJldHVybiBfdGhpc1xuICAgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgXG4gICAgfSk7XG5cblxufSkoalF1ZXJ5LCBsYXl1aSk7IiwiO1xyXG4oZnVuY3Rpb24gKCQsIGxheXVpKSB7XHJcblxyXG4gIC8vUGxnVGFicy5qc1xyXG4gIGxheXVpLnVzZShbXCJsYXllclwiXSwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGxheWVyID0gbGF5dWkubGF5ZXI7XHJcblxyXG4gICAgbGF5ZXIuY29uZmlnKHtcclxuICAgICAgYW5pbTogMCwgLy/pu5jorqTliqjnlLvpo47moLxcclxuICAgICAgekluZGV4OiAxMDAwMCxcclxuICAgICAgLy9za2luOiAnbGF5dWktbGF5ZXItbGFuJyxcclxuICAgICAgc2hhZGU6IDAuNSxcclxuICAgICAgYnRuQWxpZ246ICdyJyxcclxuICAgICAgZml4ZWQ6IGZhbHNlXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgdmFyIHBsZ0RpYWxvZyA9IGxheWVyO1xyXG5cclxuICAgIHBsZ0RpYWxvZy5zaG93VXBsb2FkRGlhbG9nID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICB2YXIgd2lub3B0aW9ucyA9IHtcclxuICAgICAgICB0aXRsZTogXCLkuIrkvKDmlofku7ZcIixcclxuICAgICAgICBza2luOiAnbGF5dWktbGF5ZXItbGFuJyxcclxuICAgICAgICBjbG9zZUJ0bjogMSxcclxuICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgIHJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICBidG46IFtcIuS4iuS8oFwiLCBcIuWPlua2iFwiXSxcclxuICAgICAgICBidG4xOiBmdW5jdGlvbiAoaW5kZXgsIGxheWVybykge1xyXG4gICAgICAgICAgUGxnRGlhbG9nLmNsb3NlKGluZGV4KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0bjI6IGZ1bmN0aW9uIChpbmRleCwgbGF5ZXJvKSB7XHJcbiAgICAgICAgICBQbGdEaWFsb2cuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXJlYTogWyczMDBweCcsICczMDBweCddLFxyXG4gICAgICAgIGNvbnRlbnQ6ICc8ZGl2IGlkPVwieHgtd2luLWRkLTFcIj48L2Rpdj4nLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChsYXllcm8sIGluZGV4KSB7XHJcbiAgICAgICAgICB2YXIgZm9ybWRhdGEgPSBbe1xyXG4gICAgICAgICAgICB0eXBlOiBcInVwbG9hZFwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcImZpbGVzXCIsXHJcbiAgICAgICAgICAgIHVybDogdXJsXHJcbiAgICAgICAgICB9XTtcclxuICAgICAgICAgIHZhciBtZiA9IG5ldyBQbGdGb3JtKHtcclxuICAgICAgICAgICAgaXRlbXM6IGZvcm1kYXRhXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIG1mLnJlbmRlclRvKFwieHgtd2luLWRkLTFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGF5ZXIub3Blbih3aW5vcHRpb25zKTtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBwbGdEaWFsb2cuc2hvd0dyaWREaWFsb2cgPSBmdW5jdGlvbiAocGxnR3JpZCwgY2FsbGJhY2ssIG9wdHMpIHtcclxuICAgICAgdmFyIHdpbm9wdGlvbnMgPSB7XHJcbiAgICAgICAgdGl0bGU6IG9wdHMudGl0bGUgPyBvcHRzLnRpdGxlIDogXCJcIixcclxuICAgICAgICBza2luOiAnbGF5dWktbGF5ZXItbGFuJyxcclxuICAgICAgICBjbG9zZUJ0bjogMSxcclxuICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgIHJlc2l6ZTogdHJ1ZSxcclxuICAgICAgICB0aXBzTW9yZTogdHJ1ZSxcclxuICAgICAgICBidG46IFtcIumAieaLqVwiLCBcIuWPlua2iFwiXSxcclxuICAgICAgICBidG4xOiBmdW5jdGlvbiAoaW5kZXgsIGxheWVybykge1xyXG4gICAgICAgICAgdmFyIGlkID0gcGxnR3JpZC5nZXRTZWxlY3RlZFJvd0lkKCk7XHJcbiAgICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgIGxheWVyLm1zZyhcIuS4uumAieaLqeaVsOaNrlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciByZWNvcmQgPSBwbGdHcmlkLmdldFNlbGVjdGVkUm93RGF0YSgpO1xyXG5cclxuICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgY2FsbGJhY2soaWQsIHJlY29yZCk7XHJcblxyXG4gICAgICAgICAgUGxnRGlhbG9nLmNsb3NlKGluZGV4KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ0bjI6IGZ1bmN0aW9uIChpbmRleCwgbGF5ZXJvKSB7XHJcbiAgICAgICAgICBQbGdEaWFsb2cuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXJlYTogW29wdHMud2lkdGggKyAncHgnLCBvcHRzLmhlaWdodCArICdweCddLFxyXG4gICAgICAgIGNvbnRlbnQ6ICc8ZGl2IGlkPVwiJyArIHBhbmVsSWQgKyAnLXdpbi1ncmlkLTFcIj48L2Rpdj4nLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChsYXllcm8sIGluZGV4KSB7XHJcbiAgICAgICAgICBwbGdHcmlkLnJlbmRlclRvKHBhbmVsSWQgKyAnLXdpbi1ncmlkLTEnKTtcclxuICAgICAgICAgIHBsZ0dyaWQubG9hZERhdGEoKTtcclxuICAgICAgICAgIHBsZ0dyaWQub24oXCJvblJvd0RibENsaWNrZWRcIiwgZnVuY3Rpb24gKHJpZCwgaW5kKSB7XHJcbiAgICAgICAgICAgIHZhciByZWNvcmQgPSBwbGdHcmlkLmdldFVzZXJEYXRhKHJpZCwgXCJkYXRhXCIpOztcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgIGNhbGxiYWNrKHJpZCwgcmVjb3JkKTtcclxuXHJcbiAgICAgICAgICAgIFBsZ0RpYWxvZy5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICAgICAgd2lub3B0aW9ucy5idG4gPSBbXCLkv53lrZhcIiwgXCLlj5bmtohcIl07XHJcbiAgICAgICAgd2lub3B0aW9ucy5idG4yID0gd2lub3B0aW9ucy5idG4zO1xyXG4gICAgICAgIHdpbm9wdGlvbnMuYnRuMyA9IG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFBsZ0RpYWxvZy5vcGVuKHdpbm9wdGlvbnMpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgcGxnRGlhbG9nLmxvYWRpbmcyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgaW5kZXggPSBQbGdEaWFsb2cubG9hZCgyLCB7XHJcbiAgICAgICAgc2hhZGU6IFswLjYsICcjZmZmJ10gLy8wLjHpgI/mmI7luqbnmoTnmb3oibLog4zmma9cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFBsZ0RpYWxvZy5jbG9zZShpbmRleClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgXHJcbiAgICB3aW5kb3cuUGxnRGlhbG9nID0gcGxnRGlhbG9nO1xyXG5cclxuICB9KTtcclxuXHJcblxyXG5cclxufSkoalF1ZXJ5LCBsYXl1aSk7IiwiKGZ1bmN0aW9uKCQsIGxheXVpKXtcclxuICAkLmZuLmluaXRQbGdJbnB1dFRhZ3MgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgdmFyIHBnID0gbmV3IHBsZ0lucHV0VGFncyhvcHRpb25zKTtcclxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgcGcucmVuZGVyVG8oaWQpO1xyXG4gICAgcmV0dXJuIHBnO1xyXG4gIH1cclxuXHJcbiAgdmFyIHBsZ0lucHV0VGFncyA9IGZ1bmN0aW9uIChwYXJhbXMpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICBcclxuICAgIHZhciBjbGFzc01haW4gPSB7XHJcbiAgICAgIGNoZWNrYm94TmFtZTogJycsXHJcbiAgICAgIGxheUZpbHRlcjogJycsXHJcbiAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgIGRvbTogbnVsbCxcclxuICAgICAgdGFnc0lkOiAndGFncy0nICsgUHJvbG9nLmNyZWF0ZVJhbmRvbUlkKCksXHJcbiAgICAgIG1ldW5QYW5lbFRoaXM6IG51bGwsXHJcbiAgICAgIHNldERlZmF1bHRWYWx1ZTogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICBpZighKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwKSl7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCfnlKjmiLfkvKDpgJLov5vmnaXnmoTmlbDmja7kuI3mmK/mlbDnu4QnKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEubWFwKGZ1bmN0aW9uKHZhbCl7XHJcblxyXG4gICAgICAgICAgaWYoIXZhbC5oYXNPd25Qcm9wZXJ0eSgnY2hlY2tlZCcpKXtcclxuICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIHdyYXBUZW1wbGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRlbVRlbXBsYXRlID0gJyc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGVtVGVtcGxhdGUgKz0gYDxkaXYgY2xhc3M9XCJsYXl1aS1mb3JtLWl0ZW1cIj5cclxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYXl1aS1mb3JtLWxhYmVsXCI+5Y6f5aeL5aSN6YCJ5qGGPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktaW5wdXQtYmxvY2tcIj5gO1xyXG5cclxuICAgICAgICBzZWxmLmRhdGEuZm9yRWFjaChmdW5jdGlvbih2YWwpe1xyXG4gICAgICAgICAgdGVtVGVtcGxhdGUgKz0gYDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBcclxuICAgICAgICAgIG5hbWU9XCIke3NlbGYuY2hlY2tib3hOYW1lfVske3ZhbC5hbGlhc31dXCIgXHJcbiAgICAgICAgICBsYXktc2tpbj1cInByaW1hcnlcIiBsYXktZmlsdGVyPVwiJHtzZWxmLmxheUZpbHRlcn1cIiBcclxuICAgICAgICAgIHRpdGxlPVwiJHt2YWwudGV4dH1cIiAkeyB2YWwuY2hlY2tlZCA/ICdjaGVja2VkPVwiXCInIDogJyd9IC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktdW5zZWxlY3QgbGF5dWktZm9ybS1jaGVja2JveCAkeyB2YWwuY2hlY2tlZCA/ICdsYXl1aS1mb3JtLWNoZWNrZWQnIDogJyd9XCIgXHJcbiAgICAgICAgICBsYXktc2tpbj1cInByaW1hcnlcIj48c3Bhbj4ke3ZhbC50ZXh0fTwvc3Bhbj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLW9rXCI+PC9pPjwvZGl2PlxyXG4gICAgICAgICAgYDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGVtVGVtcGxhdGUgKz0gYDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktZm9ybS1pdGVtXCI+XHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYXl1aS1mb3JtLWxhYmVsXCI+5bey57uP6YCJ5LitPC9sYWJlbD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1pbnB1dC1ibG9jayB0YWdzXCIgaWQ9XCIke3NlbGYudGFnc0lkfVwiPjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRlbVRlbXBsYXRlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIOiuvue9rum7mOiupOWAvCwgY2hlY2tlZCwg6buY6K6kZmFsc2VcclxuICAgIC8vIHZhciBkYXRhID0gcGFyYW1zLmRhdGE7XHJcbiAgICBpZighcGFyYW1zLmNoZWNrYm94TmFtZSB8fCAhcGFyYW1zLmxheUZpbHRlcil7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ+ivt+iuvue9rmNoZWNrb3V055qE5ZCN5a2XLOivpeWQjeWtl+WwhuS8muaYr+aCqOiOt+WPlmZvcm3lkI3np7DnmoRrZXknKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY2xhc3NNYWluLmNoZWNrYm94TmFtZSA9IHBhcmFtcy5jaGVja2JveE5hbWU7XHJcbiAgICAvLyBjbGFzc01haW4ubGF5RmlsdGVyID0gcGFyYW1zLmxheUZpbHRlcjtcclxuICAgIGNsYXNzTWFpbi5zZXREZWZhdWx0VmFsdWUocGFyYW1zLmRhdGEpO1xyXG4gICAgdGhpcy50YWdzSWQgPSBjbGFzc01haW4udGFnc0lkO1xyXG4gICAgdGhpcy5sYXlGaWx0ZXIgPSBjbGFzc01haW4ubGF5RmlsdGVyID0gcGFyYW1zLmxheUZpbHRlciB8fCAncGxnLScgKyBQcm9sb2cuY3JlYXRlUmFuZG9tSWQoKTtcclxuICAgIFxyXG4gICAgdGhpcy53cmFwVGFtcGxhdGUgPSAkKGNsYXNzTWFpbi53cmFwVGVtcGxhdGUoKSk7XHJcblxyXG4gICAgaWYocGFyYW1zLnJlbmRlcmVyKSB7XHJcbiAgICAgIHNlbGYucmVuZGVyVG8ocGFyYW1zLnJlbmRlcmVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsZ0lucHV0VGFncy5wcm90b3R5cGUucmVuZGVyVG8gPSBmdW5jdGlvbih0YXJnZXRJZCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgJHRhcmdldElkID0gJCgnIycgKyB0YXJnZXRJZCk7XHJcbiAgICB2YXIgJHRhZ3NJZCA9ICR0YXJnZXRJZC5maW5kKFwiI1wiICsgc2VsZi50YWdzSWQpO1xyXG5cclxuICAgICR0YXJnZXRJZC5hcHBlbmQoc2VsZi53cmFwVGFtcGxhdGUpO1xyXG4gICAgXHJcbiAgICB2YXIgZm9ybSA9IGxheXVpLmZvcm07XHJcbiAgICBmb3JtLnJlbmRlcigpO1xyXG4gIFxyXG4gICAgdmFyIHRhZ0xpc3QgPSBbXTsgLy8g55So5oi35qCH562+5YiX6KGoXHJcbiAgICBcclxuICAgIHZhciBpbnB1dFRhZ3MgPSB7XHJcbiAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0ZW1PYmogPSB7fTtcclxuICAgICAgICB2YXIgY2hlY2tib3hMaXN0ID0gJHRhcmdldElkLmZpbmQoXHJcbiAgICAgICAgICBcIi5sYXl1aS1mb3JtLWNoZWNrZWRcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGNoZWNrYm94TGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHRlbU9iaiA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IGNoZWNrYm94TGlzdC5zaWJsaW5ncyhcImlucHV0XCIpLmF0dHIoXCJ0aXRsZVwiKSxcclxuICAgICAgICAgICAgbmFtZTogY2hlY2tib3hMaXN0LnNpYmxpbmdzKFwiaW5wdXRcIikuYXR0cihcIm5hbWVcIilcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh0ZW1PYmopICE9PSBcInt9XCIpIHtcclxuICAgICAgICAgIHRhZ0xpc3QucHVzaCh0ZW1PYmopO1xyXG4gICAgICAgICAgdGFnTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcclxuICAgICAgICAgICAgaW5wdXRUYWdzLmFkZCh2KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgYWRkOiBmdW5jdGlvbih0ZW1PYmopIHtcclxuICAgICAgICB2YXIgdGVtVGVtcGFsdGUgPSBgPHNwYW4+XHJcbiAgICAgICAgICA8ZW0gbmFtZT1cIiR7dGVtT2JqLm5hbWV9XCI+JHt0ZW1PYmoudmFsdWV9PC9lbT5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIj7DlzwvYnV0dG9uPlxyXG4gICAgICAgIDwvc3Bhbj5gO1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoJyMnICsgc2VsZi50YWdzSWQpLmFwcGVuZCh0ZW1UZW1wYWx0ZSk7XHJcbiAgXHJcbiAgICAgICAgdmFyIHRlbUlucHV0SGlkZGVuID0gYDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIiR7dGVtT2JqLm5hbWV9XCIgXHJcbiAgICAgICAgICB2YWx1ZT1cIiR7dGVtT2JqLnZhbHVlfVwiLz5gO1xyXG4gICAgICAgICAgJHRhcmdldElkLmFmdGVyKHRlbUlucHV0SGlkZGVuKTtcclxuICBcclxuICAgICAgICBpZiAodGFnTGlzdC5pbmRleE9mKHRlbU9iaikgPT09IC0xKSB7XHJcbiAgICAgICAgICB0YWdMaXN0LnB1c2godGVtT2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIFxyXG4gICAgICBkZWw6IGZ1bmN0aW9uKHRlbU9iaikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdkZWwgdGVtT2JqIGJlZm9yZScpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRhZ0xpc3QpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdkZWwgdGVtT2JqIGJlZm9yZScpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdkZWwgdGFnTGlzdCBldmVudCcpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbU9iaik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RlbCB0ZW1PYmogZXZlbnQnKTtcclxuXHJcbiAgICAgICAgLy8g5LuOdGFnTGlzdOWIoOmZpHRlbU9ialxyXG4gICAgICAgIGlmICh0YWdMaXN0ICYmIHRhZ0xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGFnTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaW5kKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWwubmFtZSA9PT0gdGVtT2JqLm5hbWUpIHtcclxuICAgICAgICAgICAgICB0YWdMaXN0LnNwbGljZShpbmQsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5pON5L2c5a6M5oiQ5LmL5ZCO5bCx5ZCv5Yqo6YeN5paw5riy5p+TXHJcbiAgXHJcbiAgICAgICAgLy8gMi4g5Yig6ZmkdGFnc+S4reeahOagh+etviAgVE9ETzo6IOatpOWBmuazleacieeCueWvuURPTeeahOmHjeaWsOa4suafk+W9seWTjeavlOi+g+Wkp1xyXG4gICAgICAgIC8vICQoJyNpbnB1dFRhZ3MnKS5maW5kKCduYW1lPScrIHRlbU9iai5uYW1lKS5wYXJlbnQoJ3NwYW4nKS5yZW1vdmUoKTtcclxuICAgICAgICAkKFwiI1wiICsgc2VsZi50YWdzSWQpLmVtcHR5KCk7XHJcbiAgICAgICAgdmFyIHRlbVRlbXBhbHRlID0gXCJcIjtcclxuICAgICAgICBpZiAodGFnTGlzdCAmJiB0YWdMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRhZ0xpc3QuZm9yRWFjaChmdW5jdGlvbih2YWwsIGluZCkge1xyXG4gICAgICAgICAgICB0ZW1UZW1wYWx0ZSArPSBgPHNwYW4+PGVtIG5hbWU9XCIke3ZhbC5uYW1lfVwiPiR7XHJcbiAgICAgICAgICAgICAgdmFsLnZhbHVlXHJcbiAgICAgICAgICAgIH08L2VtPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIj7DlzwvYnV0dG9uPjwvc3Bhbj5gO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoXCIjXCIgKyBzZWxmLnRhZ3NJZCkuYXBwZW5kKHRlbVRlbXBhbHRlKTtcclxuICBcclxuICAgICAgICAvLyAzLiDliKDpmaRpbnB1dCBoaWRkZW7kuK3nmoTmoIfnrb7oioLngrlcclxuICAgICAgICAkKFwiI1wiICsgc2VsZi50YXJnZXRJZClcclxuICAgICAgICAgIC5maW5kKCdpbnB1dFtuYW1lPVwiJyArIHRlbU9iai5uYW1lICsgJ1wiXScpXHJcbiAgICAgICAgICAucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgXHJcbiAgICBpbnB1dFRhZ3MuaW5pdCgpO1xyXG4gICAgXHJcbiAgICBmb3JtLm9uKFwiY2hlY2tib3goXCIrIHNlbGYubGF5RmlsdGVyICtcIilcIiwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICB2YXIgaXNDaGVja2VkID0gZGF0YS5lbGVtLmNoZWNrZWQ7XHJcbiAgICAgIHZhciBqcXVlcnlFbGVtID0gJChkYXRhLmVsZW0pO1xyXG4gICAgICB2YXIgdGVtT2JqID0ge1xyXG4gICAgICAgIHZhbHVlOiBqcXVlcnlFbGVtLmF0dHIoXCJ0aXRsZVwiKSxcclxuICAgICAgICBuYW1lOiBqcXVlcnlFbGVtLmF0dHIoXCJuYW1lXCIpXHJcbiAgICAgIH07XHJcbiAgXHJcbiAgICAgIGlmIChpc0NoZWNrZWQpIHtcclxuICAgICAgICBpbnB1dFRhZ3MuYWRkKHRlbU9iaik7XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgaWYgKCFpc0NoZWNrZWQpIHtcclxuICBcclxuICAgICAgICBpbnB1dFRhZ3MuZGVsKHRlbU9iaik7XHJcbiAgICAgIH1cclxuICAgICAgLy8gPHNwYW4+PGVtPuagh+mimOS4gDwvZW0+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiPsOXPC9idXR0b24+PC9zcGFuPlxyXG4gICAgfSk7XHJcbiAgXHJcbiAgICAkdGFyZ2V0SWQuZmluZChcIiNcIiArIHNlbGYudGFnc0lkKS5vbihcImNsaWNrXCIsIFwiLmNsb3NlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdmFyIHRlbUpxdWVyeU9iaiA9ICQodGhpcykuc2libGluZ3MoXCJlbVwiKTtcclxuICAgICAgdmFyIHRlbU9iaiA9IHtcclxuICAgICAgICB2YWx1ZTogdGVtSnF1ZXJ5T2JqLmh0bWwoKSxcclxuICAgICAgICBuYW1lOiB0ZW1KcXVlcnlPYmouYXR0cihcIm5hbWVcIilcclxuICAgICAgfTtcclxuICAgICBcclxuICAgICAgaW5wdXRUYWdzLmRlbCh0ZW1PYmopO1xyXG4gIFxyXG4gICAgICAvLyAxLiDmuIXnqbpjaGVja2JveCDkuK3pgInkuK3nmoTvvIzkv67mlLnnirbmgIHjgILph43mlrDop6blj5HooqvliKDpmaTnmoR0YWdzXHJcbiAgICAgIHZhciBjaGVja2VkTGlzdCA9IHNlbGYud3JhcFRhbXBsYXRlLmZpbmQoXHJcbiAgICAgICAgXCIubGF5dWktZm9ybS1jaGVja2JveFwiXHJcbiAgICAgICk7XHJcbiAgICAgIC8vIOWwhuexu+aVsOe7hOi9rOWMluS4uuaVsOe7hFxyXG4gICAgICBjaGVja2VkTGlzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGNoZWNrZWRMaXN0KTtcclxuICBcclxuICAgICAgaWYgKGNoZWNrZWRMaXN0ICYmIGNoZWNrZWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjaGVja2VkTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaW5kKSB7XHJcbiAgICAgICAgICB2YXIgdGVtSHRtbCA9ICQoJCh2YWwpLmZpbmQoXCJzcGFuXCIpWzBdKS5odG1sKCk7XHJcbiAgICAgICAgICBpZiAodGVtT2JqLnZhbHVlID09PSB0ZW1IdG1sKSB7XHJcbiAgICAgICAgICAgIHNlbGYud3JhcFRhbXBsYXRlLmZpbmQoJy5sYXl1aS1mb3JtLWNoZWNrYm94JylcclxuICAgICAgICAgICAgICAuZXEoaW5kKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgd2luZG93LlBsZ0lucHV0VGFncyA9IHBsZ0lucHV0VGFncztcclxufShqUXVlcnksIGxheXVpKSk7IiwiLyoqXHJcbiAqIGhkd1xyXG4gKiAyMDE5LjAxLjI4XHJcbiAqIOmdouadv+e7hOS7tlxyXG4gKi9cclxuXHJcbjsoZnVuY3Rpb24gKCQsIGxheXVpKSB7XHJcblxyXG4gICAgLy9QbGdQYW5lbC5qc1xyXG4gICAgbGF5dWkudXNlKFtcImVsZW1lbnRcIl0sIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdGVtcGxhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzYWxmID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNraW5PQkogPSB7XHJcbiAgICAgICAgICAgICAgICAwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgMTogXCJza2luXzFcIixcclxuICAgICAgICAgICAgICAgIDI6IFwic2tpbl8yXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKCFza2luT0JKW3NhbGYuc2tpbl0pIHNhbGYuc2tpbiA9IDA7XHJcbiAgICAgICAgICAgIHZhciBodG1sID0gYDxkaXYgY2xhc3M9XCJsYXl1aS1jYXJkIFBsZ1BhbmVsICR7c2tpbk9CSltzYWxmLnNraW5dfSAke3NhbGYuY2xhc3NOYW1lP3NhbGYuY2xhc3NOYW1lOlwiXCJ9XCIgJHtzYWxmLmlkP2BpZD0ke3NhbGYuaWR9YDpcIlwifSAgJHtzYWxmLnN0eWxlP2BzdHlsZT1cIiR7c2FsZi5zdHlsZX1cImA6XCJcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgJHtzYWxmLmhlYWRlci5pc1Nob3c/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwibGF5dWktY2FyZC1oZWFkZXJcIj4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGUgaW9cIj4ke3NhbGYuaGVhZGVyLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtzYWxmLmhlYWRlci5tb3JlQnRuJiZzYWxmLmhlYWRlci5tb3JlQnRuLmxlbmd0aD4wP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwibW9yZV9ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7c2FsZi5oZWFkZXIubW9yZUJ0bi5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGEgY2xhc3M9XCJsYXl1aS1idG4gbGF5dWktYnRuLXNtIGxheXVpLWJ0bi1ub3JtYWwgJHtpdGVtLmNsYXNzTmFtZT9gJHtpdGVtLmNsYXNzTmFtZX1gOlwiXCJ9XCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPiAke2l0ZW0uaWNvbj9gPGkgY2xhc3M9XCIke2l0ZW0uaWNvbn1cIj48L2k+YDpcIlwifSR7aXRlbS5uYW1lfTwvYT5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gOlwiXCJ9ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICBgOlwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1jYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gJChodG1sKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBQYW5lbEZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciBzYWxmID0gdGhpcztcclxuICAgICAgICAgICAgaWYoIXNhbGYuZGVmYXVsdEJvZHkpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBzYWxmLmRlZmF1bHRCb2R5LGh0bWwgPSBudWxsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGRhdGEubGF5b3V0Q29sIDwgMCB8fCBkYXRhLmxheW91dENvbCA+IDEyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibGF5b3V0Q29sOuS4jeiDveWwj+S6jjDmiJbkuI3og73lpKfkuo4xMlwiKTtcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlucHV0QmxvY2soaXRlbSwgdmFsdWVCaikge1xyXG4gICAgICAgICAgICAgICAgaWYoIWl0ZW0udHlwZSkgaXRlbS50eXBlPVwidGV4dFwiO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGV4dFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighaXRlbS52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsdWU9XCI8c3BhbiBzdHlsZT0nY29sb3I6I2MzYzNjMyc+5pqC5peg5pWw5o2uPC9zcGFuPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInRleHQtaW5mbyAke3ZhbHVlQmo/XCJialwiOlwiXCJ9XCI+JHtpdGVtLnZhbHVlfTwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFpdGVtLnZhbHVlKSBpdGVtLnZhbHVlPVwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXkv6Hmga9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cImxheXVpLWlucHV0XCIgdmFsdWU9XCIke2l0ZW0udmFsdWV9XCI+YDtcclxuICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmNvbHMpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBgPGZvcm0gY2xhc3M9XCJsYXl1aS1mb3JtIGNsXCIgc3R5bGU9XCJwYWRkaW5nOjVweFwiIGxheS1maWx0ZXI9XCJcIj4gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5jb2xzLm1hcChmdW5jdGlvbihhcnIpeyAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImxheXVpLXJvdyBsYXl1aS1jb2wtc3BhY2UxMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2Fyci5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJsYXl1aS1jb2wtbWQke2l0ZW0ubGF5b3V0Q29sfHxkYXRhLmxheW91dENvbH0gJHtpdGVtLm9mZnNldD9gbGF5dWktY29sLW1kLW9mZnNldCR7aXRlbS5vZmZzZXR9YDpcIlwifVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1mb3JtLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYXl1aS1mb3JtLWxhYmVsXCI+JHtpdGVtLmxhYmVsfe+8mjwvbGFiZWw+ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1pbnB1dC1ibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aW5wdXRCbG9jayhpdGVtLGRhdGEudmFsdWVCail9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oXCJcIil9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5qb2luKFwiXCIpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPmA7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICQoaHRtbClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBsZ1BhbmVsKGVsZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBfdGhpcy5pZCA9IFwiUGxnUGFuZWxcIiArIG5ldyBEYXRlKCkudmFsdWVPZigpOyAvL+mAieaLqeWZqFxyXG5cclxuICAgICAgICAgICAgdmFyIGVsZSwgb3B0O1xyXG4gICAgICAgICAgICAvL+iOt+WPluaVsOaNruWFpeWPo1xyXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgb3B0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlcjpcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraW4gOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6XCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9yZUJ0biA6bnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1weXQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9yZUJ0bjogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Qm9keSA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKF90aGlzLGNvbmZpZyxvcHQpO1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ2V0RWxlbWVudCA9IHRlbXBsYXRlLmNhbGwoX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5pyJZGVmYXVsdEJvZHnphY3nva4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKF90aGlzLmRlZmF1bHRCb2R5IT1udWxsICYmIF90aGlzLmRlZmF1bHRCb2R5LmNvbHMmJl90aGlzLmRlZmF1bHRCb2R5LmNvbHMubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXBwZW5kUGFuZWxCb2R5KFBhbmVsRm9ybS5jYWxsKF90aGlzKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbmRlclRvKF90aGlzLnJlbmRlcmVyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGVsZSA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgICAgIG9wdCA9IGFyZ3VtZW50c1sxXTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0ID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3B0cyA9ICQuZXh0ZW5kKHRydWUsIGNvbmZpZywgb3B0KTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nZXRFbGVtZW50ID0gdGVtcGxhdGUoX3RoaXMub3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVuZGVyVG8oZWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGxnUGFuZWwucHJvdG90eXBlLnJlbmRlclRvID0gZnVuY3Rpb24gKGVsZSkge1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5lbXB5dCl7XHJcbiAgICAgICAgICAgICAgICQoXCIjXCIgKyBlbGUpLmVtcHR5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcIiNcIiArIGVsZSkuYXBwZW5kKHRoaXMuZ2V0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcGxnUGFuZWwucHJvdG90eXBlLmFwcGVuZFBhbmVsQm9keSA9IGZ1bmN0aW9uIChFbGVtZW50T2JqY2V0LCBpc0VtcHR5ID0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdmFyIGVsZT10aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS1jYXJkLWJvZHlcIik7XHJcbiAgICAgICAgICAgIGlmKGlzRW1wdHkpe1xyXG4gICAgICAgICAgICAgICAgZWxlLmVtcHR5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBjb25zb2xlLmRpciggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKEVsZW1lbnRPYmpjZXQpICApXHJcbiAgICAgICAgICAgY29uc29sZS5kaXIoRWxlbWVudE9iamNldFswXS5ub2RlVHlwZSA9PT0gMSAgIClcclxuICAgICAgICAgICBjb25zb2xlLmRpcih0eXBlb2YgRWxlbWVudE9iamNldFswXS5ub2RlTmFtZSA9PT0gJ3N0cmluZycgKVxyXG4gICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHR5cGVvZiBFbGVtZW50T2JqY2V0IClcclxuICAgICAgICAgICBjb25zb2xlLmRpciggRWxlbWVudE9iamNldFswXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KTtcclxuICAgICAgICAgICBjb25zb2xlLmRpciggRWxlbWVudE9iamNldCBpbnN0YW5jZW9mIGpRdWVyeSlcclxuICAgICAgICAgICBjb25zb2xlLmRpcihcImRlZmF1bHRCb2R5OlwiKyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcy5kZWZhdWx0Qm9keSkgIClcclxuICAgICAgICAgICBjb25zb2xlLmRpcihcImRlZmF1bHRCb2R5OlwiK0FycmF5LmlzQXJyYXkodGhpcy5kZWZhdWx0Qm9keSkpXHJcbiAgICAgICAgICAgY29uc29sZS5kaXIodGhpcy5kZWZhdWx0Qm9keSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxyXG4gICAgICAgICAgICBlbGUuYXBwZW5kKEVsZW1lbnRPYmpjZXQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHdpbmRvdy5QbGdQYW5lbCA9IHBsZ1BhbmVsO1xyXG5cclxuICAgICAgICAvKiAgICAgICAgICQuZm4uUGxnUGFuZWwgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgcGxnUGFuZWwodGhpcywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgKi9cclxuXHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxufSkoalF1ZXJ5LCBsYXl1aSk7IiwiOyhmdW5jdGlvbiAoJCwgbGF5dWkpIHtcclxuICAkLmZuLlBsZ1NlbGVjdFBsdXNUYWdzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBuZXcgcGxnU2VsZWN0UGx1c1RhZ3Mob3B0aW9ucyk7XHJcblxyXG59O1xyXG5cclxuICB2YXIgdGVtcCA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJsYXl1aS1pbnB1dC1ibG9jayBwbGctc2VsZWN0LXRhZ3NcIj48L2Rpdj5gXHJcbiAgfVxyXG5cclxuICB2YXIgcGxnU2VsZWN0UGx1c1RhZ3MgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgXHJcbiAgICB0aGlzLnJlbmRlcihvcHRpb25zKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcGxnU2VsZWN0UGx1c1RhZ3MucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgJCgnIycgKyBvcHRpb25zLnJlbmRlcmVyKS5hZnRlcih0ZW1wKCkpO1xyXG4gICAgb3B0aW9ucy5lbCA9ICcjJyArIG9wdGlvbnMucmVuZGVyZXI7XHJcbiAgICBkZWxldGUgb3B0aW9ucy5yZW5kZXJlcjtcclxuICAgIHJldHVybiBsYXl1aS5zZWxlY3RQbHVzLnJlbmRlcihvcHRpb25zKTtcclxuICB9XHJcbiAgXHJcbiAgd2luZG93LlBsZ1NlbGVjdFBsdXNUYWdzID0gcGxnU2VsZWN0UGx1c1RhZ3M7XHJcbiAgXHJcblxyXG59KShqUXVlcnksIGxheXVpKTsiLCI7KGZ1bmN0aW9uICgkKSB7XHJcbiAgICB2YXIgc3RyQ2hpbmVzZUZpcnN0UFkgPSBcIllEWVFTWE1XWlNTWEpCWU1HQ0NaUVBTU1FCWUNEU0NEUUxEWUxZQlNTSkdZWlpKSkZLQ0NMWkRIV0RXWkpMSlBGWVlOV0pKVE1ZSFpXWkhGTFpQUFFIR1NDWVlZTkpRWVhYR0pISFNEU0pOS0tUTU9NTENSWFlQU05RU0VDQ1FaR0dMTFlKTE1ZWlpTRUNZS1lZSFFXSlNTR0dZWFlaWUpXV0tESkhZQ0hNWVhKVExYSllRQllYWkxEV1JESlJXWVNSTERaSlBDQlpKSkJSQ0ZUTEVDWlNUWkZYWFpIVFJRSFlCRExZQ1pTU1lNTVJGTVlRWlBXV0pKWUZDUldGREZaUVBZRERXWVhLWUpBV0pGRlhZUFNGVFpZSEhZWllTV0NKWVhTQ0xDWFhXWlpYTkJHTk5YQlhMWlNaU0JTR1BZU1laREhNRFpCUUJaQ1dEWlpZWVRaSEJUU1lZQlpHTlROWFFZV1FTS0JQSEhMWEdZQkZNSkVCSkhIR1FUSkNZU1hTVEtaSExZQ0tHTFlTTVpYWUFMTUVMRENDWEdaWVJKWFNETFRZWkNRS0NOTkpXSEpUWlpDUUxKU1RTVEJOWEJUWVhDRVFYR0tXSllGTFpRTFlIWVhTUFNGWExNUEJZU1hYWFlESkNaWUxMTFNKWEZISlhQSkJURkZZQUJZWEJIWlpCSllaTFdMQ1pHR0JUU1NNRFRKWlhQVEhZUVRHTEpTQ1FGWktKWkpRTkxaV0xTTEhEWkJXSk5DSlpZWlNRUVlDUVlSWkNKSldZQlJUV1BZRlRXRVhDU0tEWkNUQlpIWVpaWVlKWFpDRkZaWk1KWVhYU0RaWk9UVEJaTFFXRkNLU1pTWEZZUkxOWUpNQkRUSEpYU1FRQ0NTQlhZWVRTWUZCWERaVEdCQ05TTENZWlpQU0FaWVpaU0NKQ1NIWlFZRFhMQlBKTExNUVhUWURaWFNRSlRaUFhMQ0dMUVRaV0pCSENUU1lKU0ZYWUVKSlRMQkdYU1hKTVlKUVFQRlpBU1lKTlRZREpYS0pDREpTWkNCQVJURENMWUpRTVdOUU5DTExMS0JZQlpaU1lIUVFMVFdMQ0NYVFhMTFpOVFlMTkVXWVpZWENaWFhHUktSTVRDTkROSlRTWVlTU0RRREdIU0RCSkdIUldSUUxZQkdMWEhMR1RHWEJRSkRaUFlKU0pZSkNUTVJOWU1HUlpKQ1pHSk1aTUdYTVBSWVhLSk5ZTVNHTVpKWU1LTUZYTUxEVEdGQkhDSkhLWUxQRk1EWExRSkpTTVRRR1pTSkxRRExER0pZQ0FMQ01aQ1NESkxMTlhESkZGRkZKQ1pGTVpGRlBGS0hLR0RQU1hLVEFDSkRISFpERENSUkNGUVlKS1FDQ1dKRFhIV0pMWUxMWkdDRkNRRFNNTFpQQkpKUExTQkNKR0dEQ0tLREVaU1FDQ0tKR0NHS0RKVEpETFpZQ1hLTFFTQ0dKQ0xURlBDUUNaR1dQSkRRWVpKSkJZSkhTSkRaV0dGU0pHWktRQ0NaTExQU1BLSkdRSkhaWkxKUExHSkdKSlRISkpZSlpDWk1MWkxZUUJHSldNTEpLWFpEWk5KUVNZWk1MSkxMSktZV1hNS0pMSFNLSkdCTUNMWVlNS1hKUUxCTUxMS01EWFhLV1lYWVNMTUxQU0pRUUpRWFlYRkpUSkRYTVhYTExDWFFCU1lKQkdXWU1CR0dCQ1lYUEpZR1BFUEZHREpHQkhCTlNRSllaSktKS0hYUUZHUVpLRkhZR0tIREtMTFNESlFYUFFZS1lCTlFTWFFOU1pTV0hCU1hXSFhXQlpaWERNTlNKQlNCS0JCWktMWUxYR1dYRFJXWVFaTVlXU0pRTENKWFhKWEtKRVFYU0NZRVRMWkhMWVlZU0RaUEFRWVpDTVRMU0hUWkNGWVpZWFlMSlNEQ0pRQUdZU0xDUUxZWVlTSE1SUVFLTERYWlNDU1NTWURZQ0pZU0ZTSkJGUlNTWlFTQlhYUFhKWVNEUkNLR0pMR0RLWkpaQkRLVENTWVFQWUhTVENMREpESE1YTUNHWFlaSEpERFRNSExUWFpYWUxZTU9IWUpDTFRZRkJRUVhQRkJERkhIVEtTUUhaWVlXQ05YWENSV0hPV0dZSkxFR1dEUUNXR0ZKWUNTTlRNWVRPTEJZR1dRV0VTSlBXTk1MUllEWlNaVFhZUVBaR0NXWEhOR1BZWFNITVlRSlhaVERQUEJGWUhaSFRKWUZEWldLR0taQkxETlRTWEhRRUVHWlpZTFpNTVpZSlpHWFpYS0hLU1RYTlhYV1lMWUFQU1RIWERXSFpZTVBYQUdLWURYQkhOSFhLRFBKTk1ZSFlMUE1HT0NTTE5aSEtYWExQWlpMQk1MU0ZCSEhHWUdZWUdHQkhTQ1lBUVRZV0xYVFpRQ0VaWURRRFFNTUhUS0xMU1pITFNKWldGWUhRU1dTQ1dMUUFaWU5ZVExTWFRIQVpOS1paU1paTEFYWFpXV0NUR1FRVEREWVpUQ0NIWVFaRkxYUFNMWllHUFpTWk5HTE5EUVRCRExYR1RDVEFKREtZV05TWVpMSkhIWlpDV05ZWVpZV01IWUNISFlYSEpLWldTWEhaWVhMWVNLUVlTUFNMWVpXTVlQUEtCWUdMS1pIVFlYQVhRU1lTSFhBU01DSEtEU0NSU1dKUFdYU0daSkxXV1NDSFNKSFNRTkhDU0VHTkRBUVRCQUFMWlpNU1NURFFKQ0pLVFNDSkFYUExHR1hISEdYWFpDWFBETU1ITERHVFlCWVNKTVhITVJDUFhYSlpDS1pYU0hNTFFYWFRUSFhXWkZLSENDWkRZVENKWVhRSExYREhZUEpRWFlMU1lZRFpPWkpOWVhRRVpZU1FZQVlYV1lQREdYRERYU1BQWVpORExUV1JIWFlEWFpaSkhUQ1hNQ1pMSFBZWVlZTUhaTExITlhNWUxMTE1EQ1BQWEhNWERLWUNZUkRMVFhKQ0hIWlpYWkxDQ0xZTE5aU0haSlpaTE5OUkxXSFlRU05KSFhZTlRUVEtZSlBZQ0hIWUVHS0NUVFdMR1FSTEdHVEdUWUdZSFBZSFlMUVlRR0NXWVFLUFlZWVRUVFRMSFlITExUWVRUU1BMS1laWEdaV0dQWURTU1paRFFYU0tDUU5NSkpaWkJYWVFNSlJURkZCVEtIWktCWExKSktEWEpUTEJXRlpQUFRLUVRaVEdQREdOVFBKWUZBTFFNS0dYQkRDTFpGSFpDTExMTEFEUE1YREpITENDTEdZSERaRkdZRERHQ1lZRkdZRFhLU1NFQkRIWUtES0RLSE5BWFhZQlBCWVlIWFpRR0FGRlFZSlhETUxKQ1NRWkxMUENIQlNYR0pZTkRZQllRU1BaV0pMWktTRERUQUNUQlhaRFlaWVBKWlFTSk5LS1RLTkpESkdZWVBHVExGWVFLQVNETlRDWUhCTFdEWkhCQllEV0pSWUdLWllIRVlZRkpNU0RUWUZaSkpIR0NYUExYSExEV1hYSktZVENZS1NTU01UV0NUVFFaTFBCU1pEWldaWEdaQUdZS1RZV1hMSExTUEJDTExPUU1NWlNTTENNQkpDU1paS1lEQ1pKR1FRRFNNQ1lUWlFRTFdaUVpYU1NGUFRURlFNRERaRFNIRFREV0ZIVERZWkpZUUpRS1lQQkRKWVlYVExKSERSUVhYWEhBWURIUkpMS0xZVFdITExSTExSQ1hZTEJXU1JTWlpTWU1LWlpISEtZSFhLU01EU1lEWUNKUEJaQlNRTEZDWFhYTlhLWFdZV1NEWllRT0dHUU1NWUhDRFpUVEZKWVlCR1NUVFRZQllLSkRIS1lYQkVMSFRZUEpRTkZYRkRZS1pIUUtaQllKVFpCWEhGRFhLREFTV1RBV0FKTERZSlNGSEJMRE5OVE5RSlRKTkNIWEZKU1JGV0haRk1EUllKWUpXWlBESktaWUpZTVBDWVpOWU5YRkJZVEZZRldZR0RCTlpaWkROWVRYWkVNTVFCU1FFSFhGWk1CTUZMWlpTUlhZTUpHU1hXWkpTUFJZREpTSkdYSEpKR0xKSllOWlpKWEhHWEtZTUxQWVlZQ1hZVFdRWlNXSFdMWVJKTFBYU0xTWE1GU1dXS0xDVE5YTllOUFNKU1pIRFpFUFRYTVlZV1hZWVNZV0xYSlFaUVhaRENMRUVFTE1DUEpQQ0xXQlhTUUhGV1dURkZKVE5RSkhKUURYSFdMQllaTkZKTEFMS1lZSkxEWEhIWUNTVFlZV05SSllYWVdUUk1EUlFIV1FDTUZKRFlaTUhNWVlYSldNWVpRWlhUTE1SU1BXV0NIQVFCWFlHWllQWFlZUlJDTE1QWU1HS1NKU1pZU1JNWUpTTlhUUExOQkFQUFlQWUxYWVlaS1lOTERaWUpaQ1pOTkxNWkhIQVJRTVBHV1FUWk1YWE1MTEhHRFpYWUhYS1lYWUNKTUZGWVlISkZTQlNTUUxYWE5EWUNBTk5NVENKQ1lQUlJOWVRZUU5ZWU1CTVNYTkRMWUxZU0xKUkxYWVNYUU1MTFlaTFpKSkpLWVpaQ1NGQlpYWE1TVEJKR05YWVpITFhOTUNXU0NZWllGWkxYQlJOTk5ZTEJOUlRHWlFZU0FUU1dSWUhZSlpNWkRIWkdaRFdZQlNTQ1NLWFNZSFlUWFhHQ1FHWFpaU0hZWEpTQ1JITUtLQlhDWkpZSllNS1FIWkpGTkJITVFIWVNOSk5aWUJLTlFNQ0xHUUhXTFpOWlNXWEtITEpIWVlCUUxCRkNEU1hETERTUEZaUFNLSllaV1pYWkREWEpTTU1FR0pTQ1NTTUdDTFhYS1lZWUxOWVBXV1dHWURLWkpHR0daR0dTWUNLTkpXTkpQQ1hCSkpUUVRKV0RTU1BKWFpYTlpYVU1FTFBYRlNYVExMWENMSlhKSkxKWlhDVFBTV1hMWURITFlRUldIU1lDU1FZWUJZQVlXSkpKUUZXUUNRUUNKUUdYQUxEQlpaWUpHS0dYUExUWllGWEpMVFBBREtZUUhQTUFUTENQRENLQk1UWFlCSEtMRU5YRExFRUdRRFlNU0FXSFpNTEpUV1lHWExZUVpMSkVFWVlCUVFGRk5MWVhSRFNDVEdKR1hZWU5LTExZUUtDQ1RMSEpMUU1LS1pHQ1lZR0xMTEpEWkdZREhaV1hQWVNKQlpLRFpHWVpaSFlXWUZRWVRZWlNaWUVaWkxZTUhKSkhUU01RV1laTEtZWVdaQ1NSS1FZVExURFhXQ1RZSktMV1NRWldCRENRWU5DSlNSU1pKTEtDRENEVExaWlpBQ1FRWlpERFhZUExYWkJRSllMWkxMTFFERFpRSllKWUpaWVhOWVlZTllKWEtYREFaV1lSRExKWVlZUkpMWExMRFlYSkNZV1lXTlFDQ0xERE5ZWVlOWUNLQ1pIWFhDQ0xHWlFKR0tXUFBDUVFKWVNCWlpYWUpTUVBYSlBaQlNCRFNGTlNGUFpYSERXWlREV1BQVEZMWlpCWkRNWVlQUUpSU0RaU1FaU1FYQkRHQ1BaU1dEV0NTUVpHTURIWlhNV1dGWUJQREdQSFRNSlRIWlNNTUJHWk1CWkpDRlpXRlpCQlpNUUNGTUJETUNKWExHUE5KQkJYR1lIWVlKR1BUWkdaTVFCUVRDR1lYSlhMV1pLWURQRFlNR0NGVFBGWFlaVFpYRFpYVEdLTVRZQkJDTEJKQVNLWVRTU1FZWU1TWlhGSkVXTFhMTFNaQlFKSkpBS0xZTFhMWUNDVFNYTUNXRktLS0JTWExMTExKWVhUWUxUSllZVERQSkhOSE5OS0JZUU5GUVlZWkJZWUVTU0VTU0dEWUhGSFdUQ0pCU0RaWlRGRE1YSENOSlpZTVFXU1JZSkRaSlFQRFFCQlNUSkdHRkJLSkJYVEdRSE5HV0pYSkdETExUSFpISFlZWVlZWVNYV1RZWVlDQ0JEQlBZUFpZQ0NaWUpQWllXQ0JETEZXWkNXSkRYWEhZSExIV1paWEpUQ1pMQ0RQWFVKQ1paWkxZWEpKVFhQSEZYV1BZV1haUFREWlpCRFpDWUhKSE1MWEJRWFNCWUxSRFRHSlJSQ1RUVEhZVENaV01YRllUV1daQ1dKV1hKWVdDU0tZQlpTQ0NUWlFOSFhOV1hYS0hLRkhUU1dPQ0NKWUJDTVBaWllLQk5OWlBCWkhIWkRMU1lERFlUWUZKUFhZTkdGWEJZUVhDQkhYQ1BTWFRZWkRNS1lTTlhTWExIS01aWExZSERIS1dIWFhTU0tRWUhIQ0pZWEdMSFpYQ1NOSEVLRFRHWlhRWVBLREhFWFRZS0NOWU1ZWVlQS1FZWVlLWFpMVEhKUVRCWVFIWEJNWUhTUUNLV1dZTExIQ1lZTE5ORVFYUVdNQ0ZCRENDTUxKR0dYRFFLVExYS0dOUUNER1pKV1lKSkxZSEhRVFRUTldDSE1YQ1hXSFdTWkpZREpDQ0RCUUNER0ROWVhaVEhDUVJYQ0JIWlRRQ0JYV0dRV1lZQlhITUJZTVlRVFlFWE1RS1lBUVlSR1laU0xGWUtLUUhZU1NRWVNISkdKQ05YS1pZQ1hTQlhZWEhZWUxTVFlDWFFUSFlTTUdTQ1BNTUdDQ0NDQ01UWlRBU01HUVpKSEtMT1NRWUxTV1RNWFNZUUtEWkxKUVFZUExTWUNaVENRUVBCQlFKWkNMUEtIUVpZWVhYRFRERFRTSkNYRkZMTENIUVhNSkxXQ0pDWFRTUFlDWE5EVEpTSEpXWERRUUpTS1hZQU1ZTFNKSE1MQUxZS1hDWVlETU5NRFFNWE1DWk5OQ1lCWktLWUZMTUNIQ01MSFhSQ0pKSFNZTE5NVEpaR1pHWVdKWFNSWENXSkdKUUhRWkRRSkRDSkpaS0pLR0RaUUdKSllKWUxYWlhYQ0RRSEhIRVlUTUhMRlNCREpTWVlTSEZZU1RDWlFMUEJEUkZSWlRaWUtZV0hTWllRS1dEUVpSS01TWU5CQ1JYUUJKWUZBWlBaWkVEWkNKWVdCQ0pXSFlKQlFTWllXUllTWlBUREtaUEZQQk5aVEtMUVlIQkJaUE5QUFRZWlpZQlFOWURDUEpNTUNZQ1FNQ1lGWlpEQ01OTEZQQlBMTkdRSlRCVFROSlpQWkJCWk5KS0xKUVlMTkJaUUhLU0paTkdHUVNaWktZWFNIUFpTTkJDR1pLRERaUUFOWkhKS0RSVExaTFNXSkxKWkxZV1RKTkRKWkpIWFlBWU5DQkdUWkNTU1FNTkpQSllUWVNXWFpGS1dKUVRLSFRaUExCSFNOSlpTWVpCV1paWlpMU1lMU0JKSERXV1FQU0xNTUZCSkRXQVFZWlRDSlRCTk5XWlhRWENEU0xRR0RTRFBEWkhKVFFRUFNXTFlZSlpMR1lYWVpMQ1RDQkpUS1RZQ1pKVFFLQlNKTEdNR1pETUNTR1BZTkpaWVFZWUtOWFJQV1NaWE1UTkNTWlpZWFlCWUhZWkFYWVdRQ0pUTExDS0pKVEpIR0RYRFhZUVlaWkJZV0RMV1FDR0xaR0pHUVJRWkNaU1NCQ1JQQ1NLWURaTlhKU1FHWFNTSk1ZRE5TVFpUUEJETFRLWldYUVdRVFpFWE5RQ1pHV0VaS1NTQllCUlRTU1NMQ0NHQlBTWlFTWkxDQ0dMTExaWEhaUVRIQ1pNUUdZWlFaTk1DT0NTWkpNTVpTUVBKWUdRTEpZSlBQTERYUkdaWVhDQ1NYSFNIR1RaTkxaV1pLSkNYVENGQ0pYTEJNUUJDWlpXUFFETkhYTEpDVEhZWkxHWUxOTFNaWlBDWERTQ1FRSEpRS1NYWlBCQUpZRU1TTUpUWkRYTENKWVJZWU5XSkJOR1paVE1KWExUQlNMWVJaUFlMU1NDTlhQSExMSFlMTFFRWlFMWFlNUlNZQ1haTE1NQ1pMVFpTRFdUSkpMTE5aR0dRWFBGU0tZR1lHSEJGWlBES01XR0hDWE1TR0RYSk1DSlpEWUNBQlhKRExOQkNEUVlHU0tZRFFUWERKSllYTVNaUUFaRFpGU0xRWFlKU0paWUxCVFhYV1hRUVpCSlpVRkJCTFlMV0RTTEpIWEpZWkpXVERKQ1pGUVpRWlpEWlNYWlpRTFpDRFpGSkhZU1BZTVBRWk1MUFBMRkZYSkpOWlpZTFNKRVlRWkZQRlpLU1lXSkpKSFJESlpaWFRYWEdMR0hZRFhDU0tZU1dNTVpDV1lCQVpCSktTSEZISkNYTUhGUUhZWFhZWkZUU0pZWkZYWVhQWkxDSE1aTUJYSFpaU1hZRllNTkNXREFCQVpMWEtUQ1NISFhLWEpKWkpTVEhZR1hTWFlZSEhISldYS1pYU1NCWlpXSEhIQ1dUWlpaUEpYU05YUVFKR1pZWllXTExDV1haRlhYWVhZSFhNS1lZU1dTUU1OTE5BWUNZU1BNSktIV0NRSFlMQUpKTVpYSE1NQ05aSEJIWENMWFRKUExUWFlKSERZWUxUVFhGU1pIWVhYU0pCSllBWVJTTVhZUExDS0RVWUhMWFJMTkxMU1RZWllZUVlHWUhIU0NDU01aQ1RaUVhLWVFGUFlZUlBGRkxLUVVOVFNaTExaTVdXVENRUVlaV1RMTE1MTVBXTUJaU1NUWlJCUEREVExRSkpCWFpDU1JaUVFZR1dDU1hGV1pMWENDUlNaRFpNQ1lHR0RaUVNHVEpTV0xKTVlNTVpZSEZCSkRHWVhDQ1BTSFhOWkNTQlNKWUpHSk1QUFdBRkZZRk5YSFlaWFpZTFJFTVpHWkNZWlNTWkRMTEpDU1FGTlhaS1BUWFpHWEpKR0ZNWVlZU05CVFlMQk5MSFBGWkRDWUZCTUdRUlJTU1NaWFlTR1RaUk5ZRFpaQ0RHUEpBRkpGWktOWkJMQ1pTWlBTR0NZQ0pTWkxNTFJTWkJaWkxETFNMTFlTWFNRWlFMWVhaTFNLS0JSWEJSQlpDWUNYWlpaRUVZRkdLTFpMWVlIR1pTR1pMRkpIR1RHV0tSQUFKWVpLWlFUU1NISkpYRENZWlVZSkxaWVJaRFFRSEdKWlhTU1pCWUtKUEJGUlRKWExMRlFXSkhZTFFUWU1CTFBaRFhUWllHQkRIWlpSQkdYSFdOSlRKWExLU0NGU01XTFNEUVlTSlRYS1pTQ0ZXSkxCWEZUWkxMSlpMTFFCTFNRTVFRQ0dDWkZQQlBIWkNaSkxQWVlHR0RUR1dEQ0ZDWlFZWVlRWVNTQ0xYWlNLTFpaWkdGRkNRTldHTEhRWVpKSkNaTFFaWllKUEpaWkJQRENDTUhKR1hEUURHRExaUU1GR1BTWVRTRFlGV1dESlpKWVNYWVlDWkNZSFpXUEJZS1hSWUxZQkhLSktTRlhUWkpNTUNLSExMVE5ZWU1TWVhZWlBZSlFZQ1NZQ1dNVEpKS1FZUkhMTFFYUFNHVExZWUNMSlNDUFhKWVpGTk1MUkdKSlRZWkJYWVpNU0pZSkhIRlpRTVNZWFJTWkNXVExSVFFaU1NUS1hHUUtHU1BUR0NaTkpTSkNRQ1hITVhHR1pUUVlESktaRExCWlNYSkxIWVFHR0dUSFFTWlBZSEpISEdZWUdLR0dDV0paWllMQ1pMWFFTRlRHWlNMTExNTEpTS0NUQkxMWlpTWk1NTllUUFpTWFFISkNKWVFYWVpYWlFaQ1BTSEtaWllTWENERkdNV1FSTExRWFJGWlRMWVNUQ1RNSkNYSkpYSEpOWFROUlpUWkZRWUhRR0xMR0NYU1pTSkRKTEpDWURTSlRMTllYSFNaWENHSlpZUVBZTEZIREpTQlBDQ1pISkpKUVpKUURZQlNTTExDTVlUVE1RVEJISlFOTllHS1lSUVlRTVpHQ0pLUERDR01ZWkhRTExTTExDTE1IT0xaR0RZWUZaU0xKQ1FaTFlMWlFKRVNITllMTEpYR0pYTFlTWVlZWE5CWkxKU1NaQ1FRQ0pZTExaTFRKWUxMWkxMQk5ZTEdRQ0hYWVlYT1hDWFFLWUpYWFhZS0xYU1hYWVFYQ1lLUVhRQ1NHWVhYWVFYWUdZVFFPSFhIWFBZWFhYVUxDWUVZQ0haWkNCV1FCQldKUVpTQ1NaU1NMWllMS0RFU0paV01ZTUNZVFNEU1hYU0NKUFFRU1FZTFlZWllDTURKRFpZV0NCVEpTWURKS0NZRERKTEJESkpTT0RaWVNZWFFRWVhESEhHUVFZUUhEWVhXR01NTUFKRFlCQkJQUEJDTVVVUExKWlNNVFhFUlhKTUhRTlVUUEpEQ0JTU01TU1NUS0pUU1NNTVRSQ1BMWlNaTUxRRFNETUpNUVBOUURYQ0ZZTkJGU0RRWFlYSFlBWUtRWURETFFZWVlTU1pCWURTTE5URlFUWlFQWk1DSERIQ1pDV0ZEWFRNWVFTUEhRWVlYU1JHSkNXVEpUWlpRTUdXSkpUSkhUUUpCQkhXWlBYWEhZUUZYWFFZV1lZSFlTQ0RZREhIUU1OTVRNV0NQQlNaUFBaWkdMTVpGT0xMQ0ZXSE1NU0paVFRESFpaWUZGWVRaWkdaWVNLWUpYUVlKWlFCSE1CWlpMWUdIR0ZNU0hQWkZaU05DTFBCUVNOSlhaU0xYWEZQTVRZSllHQlhMTERMWFBaSllaSllISFpDWVdISllMU0pFWEZTWlpZV1hLWkpMVVlEVE1MWU1RSlBXWFlIWFNLVFFKRVpSUFhYWkhITUhXUVBXUUxZSkpRSkpaU1pDUEhKTENISE5YSkxRV1pKSEJNWllYQkRISFlQWkxITEhMR0ZXTENIWVlUTEhKWENKTVNDUFhTVEtQTkhRWFNSVFlYWFRFU1lKQ1RMU1NMU1RETExMV1dZSERIUkpaU0ZHWFRTWUNaWU5ZSFRESFdKU0xIVFpEUURKWlhYUUhHWUxUWlBIQ1NRRkNMTkpUQ0xaUEZTVFBEWU5ZTEdNSkxMWUNRSFlTU0hDSFlMSFFZUVRNWllQQllXUkZRWUtRU1lTTFpEUUpNUFhZWVNTUkhaSk5ZV1RRREZaQldXVFdXUlhDV0hHWUhYTUtNWVlZUU1TTVpITkdDRVBNTFFRTVRDV0NUTU1QWEpQSkpIRlhZWVpTWFpIVFlCTVNUU1lKVFRRUVFZWUxIWU5QWVFaTENZWkhaV1NNWUxLRkpYTFdHWFlQSllUWVNZWFlNWkNLVFRXTEtTTVpTWUxNUFdMWldYV1FaU1NBUVNZWFlSSFNTTlRTUkFQWENQV0NNR0RYSFhaRFpZRkpIR1pUVFNCSkhHWVpTWllTTVlDTExMWEJUWVhIQkJaSktTU0RNQUxYSFlDRllHTVFZUEpZQ1FYSkxMTEpHU0xaR1FMWUNKQ0NaT1RZWE1UTVRUTExXVEdQWFlNWk1LTFBTWlpaWEhLUVlTWENUWUpaWUhYU0hZWFpLWExaV1BTUVBZSEpXUEpQV1hRUVlMWFNESE1SU0xaWllaV1RUQ1lYWVNaWlNIQlNDQ1NUUExXU1NDSkNITkxDR0NIU1NQSFlMSEZISFhKU1hZTExOWUxTWkRIWlhZTFNYTFdaWUtDTERZQVhaQ01ERFlTUEpUUUpaTE5XUVBTU1NXQ1RTVFNaTEJMTlhTTU5ZWU1KUUJRSFJaV1RZWURDSFFMWEtQWldCR1FZQktGQ01aV1BaTExZWUxTWllEV0hYUFNCQ01MSkJTQ0dCSFhMUUhZUkxKWFlTV1hXWFpTTERGSExTTFlOSkxaWUZMWUpZQ0RSSkxGU1laRlNMTENRWVFGR0pZSFlYWkxZTE1TVERKQ1lIQlpMTE5XTFhYWUdZWUhTTUdESFhYSEhMWlpKWlhDWlpaQ1lRWkZOR1dQWUxDUEtQWVlQTUNMUUtER1haR0dXUUJEWFpaS1pGQlhYTFpYSlRQSlBUVEJZVFNaWkRXU0xDSFpIU0xUWVhIUUxIWVhYWFlZWllTV1RYWktITFhaWFpQWUhHQ0hLQ0ZTWUhVVEpSTFhGSlhQVFpUV0hQTFlYRkNSSFhTSFhLWVhYWUhaUURYUVdVTEhZSE1KVEJGTEtIVFhDV0hKRldKQ0ZQUVJZUVhDWVlZUVlHUlBZV1NHU1VOR1dDSEtaRFhZRkxYWEhKSkJZWldUU1hYTkNZSkpZTVNXWkpRUk1IWFpXRlFTWUxaSlpHQkhZTlNMQkdUVENTWUJZWFhXWFlIWFlZWE5TUVlYTVFZV1JHWVFMWEJCWkxKU1lMUFNZVEpaWUhZWkFXTFJPUkpNS1NDWkpYWFhZWENIRFlYUllYWEpEVFNRRlhMWUxUU0ZGWVhMTVRZSk1KVVlZWVhMVFpDU1hRWlFIWlhMWVlYWkhETkJSWFhYSkNUWUhMQlJMTUJSTExBWEtZTExMSkxZWFhMWUNSWUxDSlRHSkNNVExaTExDWVpaUFpQQ1lBV0hKSkZZQkRZWVpTTVBDS1pEUVlRUEJQQ0pQRENZWk1EUEJDWVlEWUNOTlBMTVRNTFJNRk1NR1dZWkJTSkdZR1NNWlFRUVpUWE1LUVdHWExMUEpHWkJRQ0RKSkpGUEtKS0NYQkxKTVNXTURUUUpYTERMUFBCWENXUkNRRkJGUUpDWkFIWkdNWUtQSFlZSFpZS05ES1pNQlBKWVhQWFlITEZQTllZR1hKREJLWE5YSEpNWkpYU1RSU1RMRFhTS1pZU1lCWlhKTFhZU0xCWllTTEhYSlBGWFBRTkJZTExKUUtZR1pNQ1laWllNQ0NTTENMSFpGV0ZXWVhaTVdTWFRZTlhKSFBZWU1DWVNQTUhZU01ZRFlTSFFZWkNITUpKTVpDQUFHQ0ZKQkJIUExZWllMWFhTREpHWERIS1hYVFhYTkJIUk1MWUpTTFRYTVJITkxYUUpYWVpMTFlTV1FHRExCSkhEQ0dKWVFZQ01IV0ZNSllCTUJZSllKV1lNRFBXSFhRTERZR1BERlhYQkNHSlNQQ0tSU1NZWkpNU0xCWlpKRkxKSkpMR1haR1lYWVhMU1pRWVhCRVhZWEhHQ1hCUExEWUhXRVRUV1dDSk1CVFhDSFhZUVhMTFhGTFlYTExKTFNTRldEUFpTTVlKQ0xNV1lUQ1pQQ0hRRUtDUUJXTENRWURQTFFQUFFaUUZKUURKSFlNTUNYVFhEUk1KV1JIWENKWllMUVhEWVlOSFlZSFJTTFNSU1lXV1pKWU1UTFRMTEdUUUNKWllBQlRDS1pDSllDQ1FMSlpRWEFMTVpZSFlXTFdEWFpYUURMTFFTSEdQSkZKTEpISkFCQ1FaREpHVEtIU1NUQ1lKTFBTV1pMWFpYUldHTERMWlJMWlhUR1NMTExMWkxZWFhXR0RaWUdCRFBIWlBCUkxXU1hRQlBGRFdPRk1XSExZUENCSkNDTERNQlpQQlpaTENZUVhMRE9NWkJMWldQRFdZWUdEU1RUSENTUVNDQ1JTU1NZU0xGWUJGTlRZSlNaREZORFBESERaWk1CQkxTTENNWUZGR1RKSlFXRlRNVFBKV0ZOTEJaQ01NSlRHQkRaTFFMUFlGSFlZTUpZTFNEQ0hEWkpXSkNDVExKQ0xEVExKSkNQRERTUURTU1pZQk5EQkpMR0dKWlhTWE5MWUNZQkpYUVlDQllMWkNGWlBQR0tDWFpEWkZaVEpKRkpTSlhaQk5aWUpRVFRZSllIVFlDWkhZTURKWFRUTVBYU1BMWkNEV1NMU0hYWVBaR1RGTUxDSlRZQ0JQTUdES1dZQ1laQ0RTWlpZSEZMWUNUWUdXSEtKWVlMU0pDWEdZV0pDQkxMQ1NORERCVFpCU0NMWVpDWlpTU1FETExNUVlZSEZTTFFMTFhGVFlIQUJYR1dOWVdZWVBMTFNETERMTEJKQ1lYSlpNTEhMSkRYWVlRWVRETExMQlVHQkZERkJCUUpaWk1EUEpIR0NMR01KSlBHQUVISEJXQ1FYQVhISEhaQ0hYWVBISkFYSExQSEpQR1BaSlFDUVpHSkpaWlVaRE1RWVlCWlpQSFlIWUJXSEFaWUpIWUtGR0RQRlFTRExaTUxKWEtYR0FMWFpEQUdMTURHWE1XWlFZWFhEWFhQRkRNTVNTWU1QRk1ETU1LWEtTWVpZU0hEWktYU1lTTU1aWlpNU1lETlpaQ1pYRlBMU1RNWkROTVhDS0pNWlRZWU1aTVpaTVNYSEhEQ1pKRU1YWEtMSlNUTFdMU1FMWUpaTExaSlNTRFBQTUhOTFpKQ1pZSE1YWEhHWkNKTURIWFRLR1JNWEZXTUNHTVdLRFRLU1hRTU1NRlpaWURLTVNDTENNUENHTUhTUFhRUFpEU1NMQ1hLWVhUV0xXSllBSFpKR1pRTUNTTlhZWU1NUE1MS0pYTUhMTUxRTVhDVEtaTUpRWVNaSlNZU1pIU1lKWkpDREFKWllCU0RRSlpHV1pRUVhGS0RNU0RKTEZXRUhLWlFLSlBFWVBaWVNaQ0RXWUpGRk1aWllMVFREWlpFRk1aTEJOUFBMUExQRVBTWkFMTFRZTEtDS1FaS0dFTlFMV0FHWVhZRFBYTEhTWFFRV1FDUVhRQ0xIWVhYTUxZQ0NXTFlNUVlTS0dDSExDSk5TWktQWVpLQ1FaUUxKUERNRFpITEFTWExCWURXUUxXRE5CUUNSWUREWlRKWUJLQldTWkRYRFROUEpEVENUUURGWFFRTUdOWEVDTFRUQktQV1NMQ1RZUUxQV1laWktMUFlHWkNRUVBMTEtDQ1lMUFFNWkNaUUNMSlNMUVpESlhMRERIUFpRRExKSlhaUURYWVpRS1pMSkNZUURZSlBQWVBRWUtKWVJNUENCWU1DWEtMTFpMTEZRUFlMTExNQlNHTENZU1NMUlNZU1FUTVhZWFpRWkZEWlVZU1laVEZGTVpaU01aUUhaU1NDQ01MWVhXVFBaR1haSkdaR1NKU0dLRERIVFFHR1pMTEJKRFpMQ0JDSFlYWVpIWkZZV1hZWllNU0RCWlpZSkdUU01URlhRWVhRU1RER1NMTlhETFJZWlpMUllZTFhRSFRYU1JUWk5HWlhCTlFRWkZNWUtNWkpCWllNS0JQTkxZWlBCTE1DTlFZWlpaU0paSEpDVFpLSFlaWkpSRFlaSE5QWEdMRlpUTEtHSlRDVFNTWUxMR1pSWkJCUVpaS0xQS0xDWllTU1VZWEJKRlBOSlpaWENEV1haWUpYWlpESkpLR0dSU1JKS01TTVpKTFNKWVdRU0tZSFFKU1hQSlpaWkxTTlNIUk5ZUFpUV0NIS0xQU1JaTFpYWUpRWFFLWVNKWUNaVExRWllCQllCV1pQUURXV1laQ1lUSkNKWENLQ1dES0taWFNHS0RaWFdXWVlKUVlZVENZVERMTFhXS0NaS0tMQ0NMWkNRUURaTFFMQ1NGUUNIUUhTRlNNUVpaTE5CSkpaQlNKSFRTWkRZU0pRSlBETFpDRENXSktKWlpMUFlDR01aV0RKSkJTSlFaU1laWUhIWEpQQkpZRFNTWERaTkNHTFFNQlRTRlNCUERaRExaTkZHRkpHRlNNUFhKUUxNQkxHUUNZWVhCUUtESkpRWVJGS1pUSkRIQ1pLTEJTRFpDRkpUUExMSkdYSFlYWkNTU1paWFNUSllHS0dDS0dZT1FYSlBMWlBCUEdUR1lKWkdIWlFaWkxCSkxTUUZaR0tRUUpaR1lDWkJaUVRMRFhSSlhCU1hYUFpYSFlaWUNMV0RYSkpIWE1GRFpQRlpIUUhRTVFHS1NMWUhUWUNHRlJaR05RWENMUERMQlpDU0NaUUxMSkJMSEJaQ1lQWlpQUERZTVpaU0dZSENLQ1BaSkdTTEpMTlNDRFNMRExYQk1TVExEREZKTUtESkRIWkxaWExTWlFQUVBHSkxMWUJEU1pHUUxCWkxTTEtZWUhaVFROVEpZUVRaWlBTWlFaVExMSlRZWUxMUUxMUVlaUUxCRFpMU0xZWVpZTURGU1pTTkhMWFpOQ1pRWlBCV1NLUkZCU1laTVRIQkxHSlBNQ1paTFNUTFhTSFRDU1laTFpCTEZFUUhMWEZMQ0pMWUxKUUNCWkxaSkhIU1NUQlJNSFhaSEpaQ0xYRk5CR1hHVFFKQ1pUTVNGWktKTVNTTlhMSktCSFNKWE5UTkxaRE5UTE1TSlhHWkpZSkNaWFlKWUpXUldXUU5aVE5GSlNaUFpTSFpKRllSREpTRlNaSlpCSkZaUVpaSFpMWEZZU0JaUUxaU0dZRlRaRENTWlhaSkJRTVNaS0pSSFlKWkNLTUpLSENIR1RYS1hRR0xYUFhGWFRSVFlMWEpYSERUU0pYSEpaSlhaV1pMQ1FTQlRYV1hHWFRYWEhYRlRTREtGSkhaWUpGSlhSWlNETExMVFFTUVFaUVdaWFNZUVRXR1dCWkNHWkxMWVpCQ0xNUVFUWkhaWFpYTEpGUk1ZWkZMWFlTUVhYSktYUk1RRFpETU1ZWUJTUUJIR1pNV0ZXWEdNWExaUFlZVEdaWUNDRFhZWlhZV0dTWUpZWk5CSFBaSlNRU1lYU1hSVEZZWkdSSFpUWFNaWlRIQ0JGQ0xTWVhaTFpRTVpMTVBMTVhaSlhTRkxCWVpNWVFIWEpTWFJYU1FaWlpTU0xZRlJDWkpSQ1JYSEhaWFFZRFlIWFNKSkhaQ1haQlRZTlNZU1hKQlFMUFhaUVBZTUxYWktZWExYQ0pMQ1lTWFhaWkxYRExMTEpKWUhaWEdZSldLSlJXWUhDUFNHTlJaTEZaV0ZaWk5TWEdYRkxaU1haWlpCRkNTWUpEQlJKS1JESEhHWEpMSkpUR1hKWFhTVEpUSlhMWVhRRkNTR1NXTVNCQ1RMUVpaV0xaWktYSk1MVE1KWUhTRERCWEdaSERMQk1ZSkZSWkZTR0NMWUpCUE1MWVNNU1hMU1pKUVFISlpGWEdGUUZRQlBYWkdZWVFYR1pUQ1FXWUxUTEdXU0dXSFJMRlNGR1pKTUdNR0JHVEpGU1laWkdaWVpBRkxTU1BNTFBGTENXQkpaQ0xKSk1aTFBKSkxZTVFETVlZWUZCR1lHWVpNTFlaRFhRWVhSUVFRSFNZWVlRWFlMSlRZWEZTRlNMTEdOUUNZSFlDV0ZIQ0NDRlhQWUxZUExMWllYWFhYWEtRSEhYU0hKWkNGWlNDWkpYQ1BaV0hISEhIQVBZTFFBTFBRQUZZSFhEWUxVS01aUUdHR0RERVNSTk5aTFRaR0NIWVBQWVNRSkpIQ0xMSlRPTE5KUFpMSkxIWU1IRVlEWURTUVlDRERIR1pVTkRaQ0xaWVpMTFpOVE5ZWkdTTEhTTFBKSkJER1dYUENEVVRKQ0tMS0NMV0tMTENBU1NUS1paRE5RTlRUTFlZWlNTWVNTWlpSWUxKUUtDUURISENSWFJaWURHUkdDV0NHWlFGRkZQUEpGWllOQUtSR1lXWVFQUVhYRktKVFNaWlhTV1pEREZCQlhUQkdUWktaTlBaWlBaWFpQSlNaQk1RSEtDWVhZTERLTEpOWVBLWUdIR0RaSlhYRUFIUE5aS1pUWkNNWENYTU1KWE5LU1pRTk1OTFdCV1dYSktZSENQU1RNQ1NRVFpKWVhUUENUUERUTk5QR0xMTFpTSkxTUEJMUExRSERUTkpOTFlZUlNaRkZKRlFXRFBIWkRXTVJaQ0NMT0RBWE5TU05ZWlJFU1RZSldKWUpEQkNGWE5NV1RUQllMV1NUU1pHWUJMSlBYR0xCT0NMSFBDQkpMVE1YWkxKWUxaWENMVFBOQ0xDS1hUUFpKU1dDWVhTRllTWkRLTlRMQllKQ1lKTExTVEdRQ0JYUllaWEJYS0xZTEhaTFFaTE5aQ1hXSlpMSlpKTkNKSFhNTlpaR0paWlhUWkpYWUNZWUNYWEpZWVhKSlhTU1NKU1RTU1RUUFBHUVRDU1hXWkRDU1lGUFRGQkZIRkJCTFpKQ0xaWkRCWEdDWExRUFhLRlpGTFNZTFRVV0JNUUpIU1pCTUREQkNZU0NDTERYWUNERFFMWUpKV01RTExDU0dMSkpTWUZQWVlDQ1lMVEpBTlRKSlBXWUNNTUdRWVlTWERYUU1aSFNaWFBGVFdXWlFTV1FSRktKTFpKUVFZRkJSWEpISEZXSkpaWVFBWk1ZRlJIQ1lZQllRV0xQRVhDQ1pTVFlSTFRURE1RTFlLTUJCR01ZWUpQUktaTlBCU1hZWEJIWVpESkROR0hQTUZTR01XRlpNRlFNTUJDTVpaQ0pKTENOVVhZUUxNTFJZR1FaQ1lYWkxXSkdDSkNHR01DSk5GWVpaSkhZQ1BSUkNNVFpRWlhIRlFHVEpYQ0NKRUFRQ1JKWUhQTFFMU1pESlJCQ1FIUURZUkhZTFlYSlNZTUhaWURXTERGUllIQlBZRFRTU0NOV0JYR0xQWk1MWlpUUVNTQ1BKTVhYWUNTSllUWUNHSFlDSldZUlhYTEZFTVdKTk1LTExTV1RYSFlZWU5DTU1DV0pEUURKWkdMTEpXSlJLSFBaR0dGTENDU0NaTUNCTFRCSEJRSlhRRFNQREpaWkdLR0xGUVlXQlpZWkpMVFNUREhRSENUQ0JDSEZMUU1QV0RTSFlZVFFXQ05aWkpUTEJZTUJQRFlZWVhTUUtYV1lZRkxYWE5DV0NYWVBNQUVMWUtLSk1aWlpCUlhZWVFKRkxKUEZISEhZVFpaWFNHUVFNSFNQR0RaUVdCV1BKSFpKRFlTQ1FXWktUWFhTUUxaWVlNWVNEWkdSWENLS1VKTFdQWVNZU0NTWVpMUk1MUVNZTEpYQkNYVExXRFFaUENZQ1lLUFBQTlNYRllaSkpSQ0VNSFNaTVNYTFhHTFJXR0NTVExSU1hCWkdCWkdaVENQTFVKTFNMWUxZTVRYTVRaUEFMWlhQWEpUSldUQ1lZWkxCTFhCWkxRTVlMWFBHSERTTFNTRE1YTUJEWlpTWFdIQU1MQ1pDUEpNQ05ISllTTlNZR0NIU0tRTVpaUURMTEtBQkxXSlhTRk1PQ0RYSlJSTFlRWktKTVlCWVFMWUhFVEZKWkZSRktTUllYRkpUV0RTWFhTWVNRSllTTFlYV0pIU05MWFlZWEhCSEFXSEhKWlhXTVlMSkNTU0xLWURaVFhCWlNZRkRYR1haSktIU1hYWUJTU1hEUFlOWldSUFRRWkNaRU5ZR0NYUUZKWUtKQlpNTEpDTVFRWFVPWFNMWVhYTFlMTEpEWkJUWU1IUEZTVFRRUVdMSE9LWUJMWlpBTFpYUUxIWldSUlFITFNUTVlQWVhKSlhNUVNKRk5CWFlYWUpYWFlRWUxUSFlMUVlGTUxLTEpUTUxMSFNaV0taSExKTUxITEpLTEpTVExRWFlMTUJISExOTFpYUUpIWENGWFhMSFlISkpHQllaWktCWFNDUURKUURTVUpaWVlIWkhITUdTWENTWU1YRkVCQ1FXV1JCUFlZSlFUWVpDWVFZUVFaWUhNV0ZGSEdaRlJKRkNEUFhOVFFZWlBEWUtISkxGUlpYUFBYWkRCQkdaUVNUTEdER1lMQ1FNTENISE1GWVdMWllYS0pMWVBRSFNZV01RUUdRWk1MWkpOU1FYSlFTWUpZQ0JFSFNYRlNaUFhaV0ZMTEJDWVlKRFlURFRIV1pTRkpNUVFZSkxNUVhYTExEVFRLSEhZQkZQV1RZWVNRUVdOUVdMR1dERUJaV0NNWUdDVUxLSlhUTVhNWUpTWEhZQlJXRllNV0ZSWFlRTVhZU1pUWlpURllLTUxESFFEWFdZWU5MQ1JZSkJMUFNYQ1hZV0xTUFJSSldYSFFZUEhUWUROWEhITU1ZV1lUWkNTUU1UU1NDQ0RBTFdaVENQUVBZSkxMUVpZSlNXWE1aWk1NWUxNWENMTVhDWk1YTVpTUVRaUFBRUUJMUEdYUVpIRkxKSkhZVEpTUlhXWlhTQ0NETFhUWUpEQ1FKWFNMUVlDTFpYTFpaWE1YUVJKTUhSSFpKQkhNRkxKTE1MQ0xRTkxEWFpMTExQWVBTWUpZU1hDUVFEQ01RSlpaWEhOUE5YWk1FS01YSFlLWVFMWFNYVFhKWVlIV0RDV0RaSFFZWUJHWUJDWVNDRkdQU0pOWkRZWlpKWlhSWlJRSkpZTUNBTllSSlRMRFBQWVpCU1RKS1hYWllQRkRXRkdaWlJQWU1UTkdYWlFCWVhOQlVGTlFLUkpRWk1KRUdSWkdZQ0xLWFpEU0tLTlNYS0NMSlNQSllZWkxRUUpZQlpTU1FMTExLSlhUQktUWUxDQ0REQkxTUFBGWUxHWURUWkpZUUdHS1FUVEZaWEJES1RZWUhZQkJGWVRZWUJDTFBEWVRHREhSWVJOSlNQVENTTllKUUhLTExMWlNMWURYWFdCQ0pRU1BYQlBKWkpDSkRaRkZYWEJSTUxBWkhDU05ETEJKRFNaQkxQUlpUU1dTQlhCQ0xMWFhMWkRKWlNKUFlMWVhYWUZURkZGQkhKSlhHQllYSlBNTU1QU1NKWkpNVExZWkpYU1dYVFlMRURRUEpNWUdRWkpHREpMUUpXSlFMTFNKR0pHWUdNU0NMSkpYRFRZR0pRSlFKQ0paQ0pHRFpaU1hRR1NKR0dDWEhRWFNOUUxaWkJYSFNHWlhDWFlMSlhZWFlZREZRUUpISkZYREhDVFhKWVJYWVNRVEpYWUVGWVlTU1lZSlhOQ1laWEZYTVNZU1pYWVlTQ0hTSFhaWlpHWlpaR0ZKRExUWUxOUFpHWUpZWllZUVpQQlhRQkRaVFpDWllYWFlISFNRWFNIREhHUUhKSEdZV1NaVE1aTUxIWVhHRUJUWUxaS1FXWVRKWlJDTEVLWVNUREJDWUtRUVNBWVhDSlhXV0dTQkhKWVpZREhDU0pLUUNYU1dYRkxUWU5ZWlBaQ0NaSlFUWldKUURaWlpRWkxKSlhMU0JIUFlYWFBTWFNISEVaVFhGUFRMUVlaWlhIWVRYTkNGWllZSFhHTlhNWVdYVFpTSlBUSEhHWU1YTVhRWlhUU0JDWllKWVhYVFlZWllQQ1FMTU1TWk1KWlpMTFpYR1haQUFKWllYSk1aWFdEWFpTWFpEWlhMRVlKSlpRQkhaV1paWlFUWlBTWFpURFNYSkpKWk5ZQVpQSFhZWVNSTlFEVEhaSFlZS1lKSERaWFpMU1dDTFlCWllFQ1dDWUNSWUxDWE5IWllEWllEWUpERlJKSkhUUlNRVFhZWEpSSkhPSllOWEVMWFNGU0ZKWkdIUFpTWFpTWkRaQ1FaQllZS0xTR1NKSENaU0hER1FHWFlaR1hDSFhaSldZUVdHWUhLU1NFUVpaTkRaRktXWVNTVENMWlNUU1lNQ0RISlhYWVdFWVhDWkFZRE1QWE1EU1hZQlNRTUpNWkpNVFpRTFBKWVFaQ0dRSFhKSEhMWFhITEhETERKUUNMRFdCU1hGWlpZWVNDSFRZVFlZQkhFQ1hIWUtHSlBYSEhZWkpGWEhXSEJEWkZZWkJDQVBOUEdOWURNU1hITU1NTUFNWU5CWUpUTVBYWVlNQ1RISkJaWUZDR1RZSFdQSEZUV1paRVpTQlpFR1BGTVRTS0ZUWUNNSEZMTEhHUFpKWFpKR1pKWVhaU0JCUVNDWlpMWkNDU1RQR1hNSlNGVENDWkpaREpYQ1lCWkxGQ0pTWVpGR1NaTFlCQ1daWkJZWkRaWVBTV1lKWlhaQkRTWVVYTFpaQlpGWUdDWlhCWkhaRlRQQkdaR0VKQlNUR0tETUZIWVpaSkhaTExaWkdKUVpMU0ZESlNTQ0JaR1BETEZaRlpTWllaWVpTWUdDWFNOWFhDSENaWFRaWkxKRlpHUVNRWVhaSlFEQ0NaVFFDRFhaSllRSlFDSFhaVERMR1NDWFpTWVFKUVRaV0xRRFFaVFFDSFFRSlpZRVpaWlBCV0tESkZDSlBaVFlQUVlRVFRZTkxNQkRLVEpaUFFaUVpaRlBaU0JOSkxHWUpEWEpEWlpLWkdRS1hETFBaSlRDSkRRQlhESlFKU1RDS05YQlhaTVNMWUpDUU1USlFXV0NKUU5KTkxMTEhKQ1dRVEJaUVlEWkNaUFpaRFpZRERDWVpaWkNDSlRUSkZaRFBSUlRaVEpEQ1FUUVpEVEpOUExaQkNMTENUWlNYS0paUVpQWkxCWlJCVEpEQ1hGQ1pEQkNDSkpMVFFRUExEQ0daREJCWkpDUURDSldZTkxMWllaQ0NEV0xMWFdaTFhSWE5UUVFDWlhLUUxTR0RGUVREREdMUkxBSkpUS1VZTUtRTExUWllURFlZQ1pHSldZWERYRlJTS1NUUVRFTlFNUktRWkhIUUtETERBWkZLWVBCR0dQWlJFQlpaWUtaWlNQRUdKWEdZS1FaWlpTTFlTWVlZWldGUVpZTFpaTFpIV0NIS1lQUUdOUEdCTFBMUlJKWVhDQ1NZWUhTRlpGWUJaWVlUR1pYWUxYQ1pXWFhaSlpCTEZGTEdTS0hZSlpFWUpITFBMTExMQ1pHWERSWkVMUkhHS0xaWllIWkxZUVNaWkpaUUxKWkZMTkJIR1dMQ1pDRkpZU1BZWFpMWkxYR0NDUFpCTExDWUJCQkJVQkJDQlBDUk5OWkNaWVJCRlNSTERDR1FZWVFYWUdNUVpXVFpZVFlKWFlGV1RFSFpaSllXTENDTlRaWUpKWkRFRFBaRFpUU1lRSkhEWU1CSk5ZSlpMWFRTU1RQSE5ESlhYQllYUVRaUUREVEpURFlZVEdXU0NTWlFGTFNITEdMQkNaUEhETFlaSllDS1dUWVRZTEJOWVRTRFNZQ0NUWVNaWVlFQkhFWEhRRFRXTllHWUNMWFRTWllTVFFNWUdaQVpDQ1NaWkRTTFpDTFpSUVhZWUVMSlNCWU1YU1haVEVNQkJMTFlZTExZVERRWVNIWU1SUVdLRktCRlhOWFNCWUNIWEJXSllIVFFCUEJTQldEWllMS0daU0tZSFhRWkpYSFhKWEdOTEpLWkxZWUNEWExGWUZHSExKR0pZQlhRTFlCWFFQUUdaVFpQTE5DWVBYREpZUVlEWU1SQkVTSllZSEtYWFNUTVhSQ1paWVdYWVFZQk1DTExZWkhRWVpXUVhEQlhCWldaTVNMUERNWVNLRk1aS0xaQ1lRWUNaTFFYRlpaWURRWlBaWUdZSllaTVpYRFpGWUZZVFRRVFpIR1NQQ1pNTENDWVRaWEpDWVRKTUtTTFBaSFlTTlpMTFlUUFpDVFpaQ0tUWERIWFhUUUNZRktTTVFDQ1lZQVpIVEpQQ1lMWkxZSkJKWFRQTllMSllZTlJYU1lMTU1OWEpTTVlCQ1NZU1lMWllMWEpKUVlMRFpMUFFCRlpaQkxGTkRYUUtDWkZZV0hHUU1SRFNYWUNZVFhOUVFKWllZUEZaWERZWkZQUlhFSkRHWVFCWFJDTkZZWVFQR0hZSkRZWlhHUkhUS1lMTldEWk5UU01QS0xCVEhCUFlTWkJaVEpaU1paSlRZWVhaUEhTU1paQlpDWlBUUUZaTVlGTFlQWUJCSlFYWk1YWERKTVRTWVNLS0JKWlhISkNLTFBTTUtZSlpDWFRNTEpZWFJaWlFTTFhYUVBZWlhNS1lYWFhKQ0xKUFJNWVlHQURZU0tRTFNOREhZWktRWFpZWlRDR0haVExNTFdaWUJXU1lDVEJISkhKRkNXWlRYV1lUS1pMWFFTSExZSlpKWFRNUExQWUNHTFRCWlpUTFpKQ1lKR0RUQ0xLTFBMTFFQSk1aUEFQWFlaTEtLVEtEWkNaWkJOWkRZRFlRWkpZSkdNQ1RYTFRHWFNaTE1MSEJHTEtGV05XWkhEWFVITEZNS1lTTEdYRFRXV0ZSSkVKWlRaSFlEWFlLU0hXRlpDUVNIS1RNUVFIVFpIWU1KREpTS0hYWkpaQlpaWFlNUEFHUU1TVFBYTFNLTFpZTldSVFNRTFNaQlBTUFNHWldZSFRMS1NTU1dIWlpMWVlUTlhKR01KU1pTVUZXTkxTT1pUWEdYTFNBTU1MQldMRFNaWUxBS1FDUUNUTVlDRkpCU0xYQ0xaWkNMWFhLU0JaUUNMSEpQU1FQTFNYWENLU0xOSFBTRlFRWVRYWUpaTFFMRFhaUUpaRFlZREpOWlBUVVpEU0tKRlNMSkhZTFpTUVpMQlRYWURHVFFGREJZQVpYRFpIWkpOSEhRQllLTlhKSlFDWk1MTEpaS1NQTERZQ0xCQkxYS0xFTFhKTEJRWUNYSlhHQ05MQ1FQTFpMWllKVFpMSkdZWkRaUExUUUNTWEZETU5ZQ1hHQlRKRENaTkJHQlFZUUpXR0tGSFROUFlRWlFHQktQQkJZWk1USkRZVEJMU1FNUFNYVEJOUERYS0xFTVlZQ0pZTlpDVExEWUtaWlhERFhIUVNIREdNWlNKWUNDVEFZUlpMUFlMVExLWFNMWkNHR0VYQ0xGWExLSlJUTFFKQVFaTkNNQllES0tDWEdMQ1pKWlhKSFBUREpKTVpRWUtRU0VDUVpEU0hIQURNTFpGTU1aQkdOVEpOTkxHQllKQlJCVE1MQllKRFpYTENKTFBMRExQQ1FESExYWkxZQ0JMQ1haWkpBREpMTlpNTVNTU01ZQkhCU1FLQkhSU1hYSk1YU0RaTlpQWExHQlJIV0dHRkNYR01TS0xMVFNKWVlDUUxUU0tZV1lZSFlXWEJYUVlXUFlXWUtRTFNRUFROVEtIUUNXRFFLVFdQWFhIQ1BUSFRXVU1TU1lIQldDUldYSEpNS01aTkdXVE1MS0ZHSEtKWUxTWVlDWFdIWUVDTFFIS1FIVFRRS0hGWkxEWFFXWVpZWURFU0JQS1lSWlBKRllZWkpDRVFEWlpETEFUWkJCRkpMTENYRExNSlNTWEVHWUdTSlFYQ1dCWFNTWlBEWVpDWEROWVhQUFpZRExZSkNaUExUWExTWFlaWVJYQ1lZWURZTFdXTlpTQUhKU1lRWUhHWVdXQVhUSlpEQVhZU1JMVERQU1NZWUZORUpEWFlaSExYTExMWlFaU0pOWVFZUVFYWUpHSFpHWkNZSkNIWkxZQ0RTSFdTSEpaWUpYQ0xMTlhaSkpZWVhORlhNV0ZQWUxDWUxMQUJXRERIV0RYSk1DWFpUWlBNTFFaSFNGSFpZTlpUTExEWVdMU0xYSFlNTVlMTUJXV0tZWFlBRFRYWUxMREpQWUJQV1VYSk1XTUxMU0FGRExMWUZMQkhISEJRUUxUWkpDUUpMREpURkZLTU1NQllUSFlHRENRUkREV1JRSlhOQllTTldaREJZWVRCSkhQWUJZVFRKWEFBSEdRRFFUTVlTVFFYS0JUWlBLSkxaUkJFUVFTU01KSkJESk9UR1RCWFBHQktUTEhRWEpKSkNUSFhRRFdKTFdSRldRR1dTSENLUllTV0dGVEdZR0JYU0RXRFdSRkhXWVRKSlhYWEpZWllTTFBZWVlQQVlYSFlEUUtYU0hYWVhHU0tRSFlXRkRERFBQTENKTFFRRUVXWEtTWVlLRFlQTFRKVEhLSkxUQ1lZSEhKVFRQTFRaWkNETFRIUUtaWFFZU1RFRVlXWVlaWVhYWVlTVFRKS0xMUFpNQ1lIUUdYWUhTUk1CWFBMTE5RWURRSFhTWFhXR0RRQlNIWUxMUEpKSlRIWUpLWVBQVEhZWUtUWUVaWUVOTURTSExDUlBRRkRHRlhaUFNGVExKWFhKQlNXWVlTS1NGTFhMUFBMQkJCTEJTRlhGWVpCU0pTU1lMUEJCRkZGRlNTQ0pEU1RaU1haUllZU1lGRlNZWllaQkpUQkNUU0JTREhSVEpKQllUQ1hZSkVZTFhDQk5FQkpEU1lYWUtHU0paQlhCWVRGWldHRU5ZSEhUSFpISFhGV0dDU1RCR1hLTFNYWVdNVE1CWVhKU1RaU0NEWVFSQ1lUV1haRkhNWU1DWExaTlNESlRUVFhSWUNGWUpTQlNEWUVSWEpMSlhCQkRFWU5KR0hYR0NLR1NDWU1CTFhKTVNaTlNLR1hGQk5CUFRIRkpBQUZYWVhGUFhNWVBRRFRaQ1haWlBYUlNZV1pETFlCQktUWVFQUUpQWllQWkpaTkpQWkpMWlpGWVNCVFRTTE1QVFpSVERYUVNKRUhCWllMWkRITEpTUU1MSFRYVEpFQ1hTTFpaU1BLVExaS1FRWUZTWUdZV1BDUFFGSFFIWVRRWFpLUlNHVFRTUUNaTFBUWENEWVlaWFNRWlNMWExaTVlDUENRQlpZWEhCU1hMWkRMVENEWFRZTFpKWVlaUFpZWkxUWEpTSlhITFBNWVRYQ1FSQkxaU1NGSlpaVE5KWVRYTVlKSExIUFBMQ1lYUUpRUUtaWlNDUFpLU1dBTFFTQkxDQ1pKU1hHV1dXWUdZS1RKQkJaVERLSFhIS0dUR1BCS1FZU0xQWFBKQ0tCTUxMWERaU1RCS0xHR1FLUUxTQktLVEZYUk1ES0JGVFBaRlJUQkJSRkVSUUdYWUpQWlNTVExCWlRQU1pRWlNKREhMSlFMWkJQTVNNTVNYTFFRTkhLTkJMUkRETlhYREhEREpDWVlHWUxYR1pMWFNZR01RUUdLSEJQTVhZWExZVFFXTFdHQ1BCTVFYQ1laWURSSkJIVERKWUhRU0hUTUpTQllQTFdITFpGRk5ZUE1IWFhIUExUQlFQRkJKV1FEQllHUE5aVFBGWkpHU0REVFFTSFpFQVdaWllMTFRZWUJXSktYWEdITEZLWERKVE1TWlNRWU5aR0dTV1FTUEhUTFNTS01DTFpYWVNaUVpYTkNKRFFHWkRMRk5ZS0xKQ0pMTFpMTVpaTkhZRFNTSFRIWlpMWlpCQkhRWldXWUNSWkhMWVFRSkJFWUZYWFhXSFNSWFdRSFdQU0xNU1NLWlRUWUdZUVFXUlNMQUxITUpUUUpTTVhRQkpKWkpYWllaS1hCWVFYQkpYU0haVFNGSkxYTVhaWEZHSEtaU1pHR1lMQ0xTQVJKWUhTTExMTVpYRUxHTFhZREpZVExGQkhCUE5MWVpGQkJIUFRHSktXRVRaSEtKSlhaWFhHTExKTFNUR1NISkpZUUxRWkZLQ0dOTkRKU1NaRkRCQ1RXV1NFUUZIUUpCU0FRVEdZUFFMQlhCTU1ZV1hHU0xaSEdMWkdRWUZMWkJZRlpKRlJZU0ZNQllaSFFHRldaU1lGWUpKUEhaQllZWkZGV09ER1JMTUZUV0xCWkdZQ1FYQ0RKWUdaWVlZWVRZVFlEV0VHQVpZSFhKTFpZWUhMUk1HUlhYWkNMSE5FTEpKVEpUUFdKWUJKSkJYSkpUSlRFRUtIV1NMSlBMUFNGWVpQUVFCRExRSkpUWVlRTFlaS0RLU1FKWVlRWkxEUVRHSlFZWkpTVUNNUllRVEhURUpNRkNUWUhZUEtNSFlaV0pEUUZIWVlYV1NIQ1RYUkxKSFFYSENDWVlZSkxUS1RUWVRNWEdUQ0pUWkFZWU9DWkxZTEJTWllXSllUU0pZSEJZU0hGSkxZR0pYWFRNWllZTFRYWFlQWkxYWUpaWVpZWVBOSE1ZTURZWUxCTEhMU1lZUVFMTE5KSllNU09ZUUJaR0RMWVhZTENRWVhUU1pFR1hIWkdMSFdCTEpIRVlYVFdRTUFLQlBRQ0dZU0hIRUdRQ01XWVlXTEpZSkhZWVpMTEpKWUxIWllITUdTTEpMSlhDSkpZQ0xZQ0pQQ1BaSlpKTU1ZTENRTE5RTEpRSlNYWUpNTFNaTEpRTFlDTU1IQ0ZNTUZQUVFNRllMUU1DRkZRTU1NTUhNWk5GSEhKR1RUSEhLSFNMTkNISFlRRFhUTU1RRENZWllYWVFNWVFZTFREQ1lZWVpBWlpDWU1aWURMWkZGRk1NWUNRWldaWk1BQlRCWVpURE1OWlpHR0RGVFlQQ0dRWVRUU1NGRldGRFRaUVNTWVNUV1hKSFhZVFNYWFlMQllRSFdXS1hIWlhXWk5OWlpKWkpKUUpDQ0NIWVlYQlpYWkNZWlRMTENRWFlOSllDWVlDWU5aWlFZWVlFV1lDWkRDSllDQ0hZSkxCVFpZWUNRV01QV1BZTUxHS0RMRExHS1FRQkdZQ0hKWFlcIjtcclxuICAgIC8v5q2k5aSE5pS25b2V5LqGMzc15Liq5aSa6Z+z5a2XXHJcbiAgIHZhciBvTXVsdGlEaWZmPXtcIjE5OTY5XCI6XCJEWlwiLFwiMTk5NzVcIjpcIldNXCIsXCIxOTk4OFwiOlwiUUpcIixcIjIwMDQ4XCI6XCJZTFwiLFwiMjAwNTZcIjpcIlNDXCIsXCIyMDA2MFwiOlwiTk1cIixcIjIwMDk0XCI6XCJRR1wiLFwiMjAxMjdcIjpcIlFKXCIsXCIyMDE2N1wiOlwiUUNcIixcIjIwMTkzXCI6XCJZR1wiLFwiMjAyNTBcIjpcIktIXCIsXCIyMDI1NlwiOlwiWkNcIixcIjIwMjgyXCI6XCJTQ1wiLFwiMjAyODVcIjpcIlFKR1wiLFwiMjAyOTFcIjpcIlREXCIsXCIyMDMxNFwiOlwiWURcIixcIjIwMzQwXCI6XCJORVwiLFwiMjAzNzVcIjpcIlREXCIsXCIyMDM4OVwiOlwiWUpcIixcIjIwMzkxXCI6XCJDWlwiLFwiMjA0MTVcIjpcIlBCXCIsXCIyMDQ0NlwiOlwiWVNcIixcIjIwNDQ3XCI6XCJTUVwiLFwiMjA1MDRcIjpcIlRDXCIsXCIyMDYwOFwiOlwiS0dcIixcIjIwODU0XCI6XCJRSlwiLFwiMjA4NTdcIjpcIlpDXCIsXCIyMDkxMVwiOlwiUEZcIixcIjIwNTA0XCI6XCJUQ1wiLFwiMjA2MDhcIjpcIktHXCIsXCIyMDg1NFwiOlwiUUpcIixcIjIwODU3XCI6XCJaQ1wiLFwiMjA5MTFcIjpcIlBGXCIsXCIyMDk4NVwiOlwiQVdcIixcIjIxMDMyXCI6XCJQQlwiLFwiMjEwNDhcIjpcIlhRXCIsXCIyMTA0OVwiOlwiU0NcIixcIjIxMDg5XCI6XCJZU1wiLFwiMjExMTlcIjpcIkpDXCIsXCIyMTI0MlwiOlwiU0JcIixcIjIxMjczXCI6XCJTQ1wiLFwiMjEzMDVcIjpcIllQXCIsXCIyMTMwNlwiOlwiUU9cIixcIjIxMzMwXCI6XCJaQ1wiLFwiMjEzMzNcIjpcIlNEQ1wiLFwiMjEzNDVcIjpcIlFLXCIsXCIyMTM3OFwiOlwiQ0FcIixcIjIxMzk3XCI6XCJTQ1wiLFwiMjE0MTRcIjpcIlhTXCIsXCIyMTQ0MlwiOlwiU0NcIixcIjIxNDc3XCI6XCJKR1wiLFwiMjE0ODBcIjpcIlREXCIsXCIyMTQ4NFwiOlwiWlNcIixcIjIxNDk0XCI6XCJZWFwiLFwiMjE1MDVcIjpcIllYXCIsXCIyMTUxMlwiOlwiSEdcIixcIjIxNTIzXCI6XCJYSFwiLFwiMjE1MzdcIjpcIlBCXCIsXCIyMTU0MlwiOlwiUEZcIixcIjIxNTQ5XCI6XCJLSFwiLFwiMjE1NzFcIjpcIkVcIixcIjIxNTc0XCI6XCJEQVwiLFwiMjE1ODhcIjpcIlREXCIsXCIyMTU4OVwiOlwiT1wiLFwiMjE2MThcIjpcIlpDXCIsXCIyMTYyMVwiOlwiS0hBXCIsXCIyMTYzMlwiOlwiWkpcIixcIjIxNjU0XCI6XCJLR1wiLFwiMjE2NzlcIjpcIkxLR1wiLFwiMjE2ODNcIjpcIktIXCIsXCIyMTcxMFwiOlwiQVwiLFwiMjE3MTlcIjpcIllIXCIsXCIyMTczNFwiOlwiV09FXCIsXCIyMTc2OVwiOlwiQVwiLFwiMjE3ODBcIjpcIldOXCIsXCIyMTgwNFwiOlwiWEhcIixcIjIxODM0XCI6XCJBXCIsXCIyMTg5OVwiOlwiWkRcIixcIjIxOTAzXCI6XCJSTlwiLFwiMjE5MDhcIjpcIldPXCIsXCIyMTkzOVwiOlwiWkNcIixcIjIxOTU2XCI6XCJTQVwiLFwiMjE5NjRcIjpcIllBXCIsXCIyMTk3MFwiOlwiVERcIixcIjIyMDAzXCI6XCJBXCIsXCIyMjAzMVwiOlwiSkdcIixcIjIyMDQwXCI6XCJYU1wiLFwiMjIwNjBcIjpcIlpDXCIsXCIyMjA2NlwiOlwiWkNcIixcIjIyMDc5XCI6XCJNSFwiLFwiMjIxMjlcIjpcIlhKXCIsXCIyMjE3OVwiOlwiWEFcIixcIjIyMjM3XCI6XCJOSlwiLFwiMjIyNDRcIjpcIlREXCIsXCIyMjI4MFwiOlwiSlFcIixcIjIyMzAwXCI6XCJZSFwiLFwiMjIzMTNcIjpcIlhXXCIsXCIyMjMzMVwiOlwiWVFcIixcIjIyMzQzXCI6XCJZSlwiLFwiMjIzNTFcIjpcIlBIXCIsXCIyMjM5NVwiOlwiRENcIixcIjIyNDEyXCI6XCJURFwiLFwiMjI0ODRcIjpcIlBCXCIsXCIyMjUwMFwiOlwiUEJcIixcIjIyNTM0XCI6XCJaRFwiLFwiMjI1NDlcIjpcIkRIXCIsXCIyMjU2MVwiOlwiUEJcIixcIjIyNjEyXCI6XCJURFwiLFwiMjI3NzFcIjpcIktRXCIsXCIyMjgzMVwiOlwiSEJcIixcIjIyODQxXCI6XCJKR1wiLFwiMjI4NTVcIjpcIlFKXCIsXCIyMjg2NVwiOlwiWFFcIixcIjIzMDEzXCI6XCJNTFwiLFwiMjMwODFcIjpcIldNXCIsXCIyMzQ4N1wiOlwiU1hcIixcIjIzNTU4XCI6XCJRSlwiLFwiMjM1NjFcIjpcIllXXCIsXCIyMzU4NlwiOlwiWVdcIixcIjIzNjE0XCI6XCJZV1wiLFwiMjM2MTVcIjpcIlNOXCIsXCIyMzYzMVwiOlwiUEJcIixcIjIzNjQ2XCI6XCJaU1wiLFwiMjM2NjNcIjpcIlpUXCIsXCIyMzY3M1wiOlwiWUdcIixcIjIzNzYyXCI6XCJURFwiLFwiMjM3NjlcIjpcIlpTXCIsXCIyMzc4MFwiOlwiUUpcIixcIjIzODg0XCI6XCJRS1wiLFwiMjQwNTVcIjpcIlhIXCIsXCIyNDExM1wiOlwiRENcIixcIjI0MTYyXCI6XCJaQ1wiLFwiMjQxOTFcIjpcIkdBXCIsXCIyNDI3M1wiOlwiUUpcIixcIjI0MzI0XCI6XCJOTFwiLFwiMjQzNzdcIjpcIlREXCIsXCIyNDM3OFwiOlwiUUpcIixcIjI0NDM5XCI6XCJQRlwiLFwiMjQ1NTRcIjpcIlpTXCIsXCIyNDY4M1wiOlwiVERcIixcIjI0Njk0XCI6XCJXRVwiLFwiMjQ3MzNcIjpcIkxLXCIsXCIyNDkyNVwiOlwiVE5cIixcIjI1MDk0XCI6XCJaR1wiLFwiMjUxMDBcIjpcIlhRXCIsXCIyNTEwM1wiOlwiWEhcIixcIjI1MTUzXCI6XCJQQlwiLFwiMjUxNzBcIjpcIlBCXCIsXCIyNTE3OVwiOlwiS0dcIixcIjI1MjAzXCI6XCJQQlwiLFwiMjUyNDBcIjpcIlpTXCIsXCIyNTI4MlwiOlwiRkJcIixcIjI1MzAzXCI6XCJOQVwiLFwiMjUzMjRcIjpcIktHXCIsXCIyNTM0MVwiOlwiWllcIixcIjI1MzczXCI6XCJXWlwiLFwiMjUzNzVcIjpcIlhKXCIsXCIyNTM4NFwiOlwiQVwiLFwiMjU0NTdcIjpcIkFcIixcIjI1NTI4XCI6XCJTRFwiLFwiMjU1MzBcIjpcIlNDXCIsXCIyNTU1MlwiOlwiVERcIixcIjI1Nzc0XCI6XCJaQ1wiLFwiMjU4NzRcIjpcIlpDXCIsXCIyNjA0NFwiOlwiWVdcIixcIjI2MDgwXCI6XCJXTVwiLFwiMjYyOTJcIjpcIlBCXCIsXCIyNjMzM1wiOlwiUEJcIixcIjI2MzU1XCI6XCJaWVwiLFwiMjYzNjZcIjpcIkNaXCIsXCIyNjM5N1wiOlwiWkNcIixcIjI2Mzk5XCI6XCJRSlwiLFwiMjY0MTVcIjpcIlpTXCIsXCIyNjQ1MVwiOlwiU0JcIixcIjI2NTI2XCI6XCJaQ1wiLFwiMjY1NTJcIjpcIkpHXCIsXCIyNjU2MVwiOlwiVERcIixcIjI2NTg4XCI6XCJKR1wiLFwiMjY1OTdcIjpcIkNaXCIsXCIyNjYyOVwiOlwiWlNcIixcIjI2NjM4XCI6XCJZTFwiLFwiMjY2NDZcIjpcIlhRXCIsXCIyNjY1M1wiOlwiS0dcIixcIjI2NjU3XCI6XCJYSlwiLFwiMjY3MjdcIjpcIkhHXCIsXCIyNjg5NFwiOlwiWkNcIixcIjI2OTM3XCI6XCJaU1wiLFwiMjY5NDZcIjpcIlpDXCIsXCIyNjk5OVwiOlwiS0pcIixcIjI3MDk5XCI6XCJLSlwiLFwiMjc0NDlcIjpcIllRXCIsXCIyNzQ4MVwiOlwiWFNcIixcIjI3NTQyXCI6XCJaU1wiLFwiMjc2NjNcIjpcIlpTXCIsXCIyNzc0OFwiOlwiVFNcIixcIjI3Nzg0XCI6XCJTQ1wiLFwiMjc3ODhcIjpcIlpEXCIsXCIyNzc5NVwiOlwiVERcIixcIjI3ODEyXCI6XCJPXCIsXCIyNzg1MFwiOlwiUEJcIixcIjI3ODUyXCI6XCJNQlwiLFwiMjc4OTVcIjpcIlNMXCIsXCIyNzg5OFwiOlwiUExcIixcIjI3OTczXCI6XCJRSlwiLFwiMjc5ODFcIjpcIktIXCIsXCIyNzk4NlwiOlwiSFhcIixcIjI3OTk0XCI6XCJYSlwiLFwiMjgwNDRcIjpcIllDXCIsXCIyODA2NVwiOlwiV0dcIixcIjI4MTc3XCI6XCJTTVwiLFwiMjgyNjdcIjpcIlFKXCIsXCIyODI5MVwiOlwiS0hcIixcIjI4MzM3XCI6XCJaUVwiLFwiMjg0NjNcIjpcIlRMXCIsXCIyODU0OFwiOlwiRENcIixcIjI4NjAxXCI6XCJURFwiLFwiMjg2ODlcIjpcIlBCXCIsXCIyODgwNVwiOlwiSkdcIixcIjI4ODIwXCI6XCJRR1wiLFwiMjg4NDZcIjpcIlBCXCIsXCIyODk1MlwiOlwiVERcIixcIjI4OTc1XCI6XCJaQ1wiLFwiMjkxMDBcIjpcIkFcIixcIjI5MzI1XCI6XCJRSlwiLFwiMjk1NzVcIjpcIlNMXCIsXCIyOTYwMlwiOlwiRkJcIixcIjMwMDEwXCI6XCJURFwiLFwiMzAwNDRcIjpcIkNYXCIsXCIzMDA1OFwiOlwiUEZcIixcIjMwMDkxXCI6XCJZU1BcIixcIjMwMTExXCI6XCJZTlwiLFwiMzAyMjlcIjpcIlhKXCIsXCIzMDQyN1wiOlwiU0NcIixcIjMwNDY1XCI6XCJTWFwiLFwiMzA2MzFcIjpcIllRXCIsXCIzMDY1NVwiOlwiUUpcIixcIjMwNjg0XCI6XCJRSkdcIixcIjMwNzA3XCI6XCJTRFwiLFwiMzA3MjlcIjpcIlhIXCIsXCIzMDc5NlwiOlwiTEdcIixcIjMwOTE3XCI6XCJQQlwiLFwiMzEwNzRcIjpcIk5NXCIsXCIzMTA4NVwiOlwiSlpcIixcIjMxMTA5XCI6XCJTQ1wiLFwiMzExODFcIjpcIlpDXCIsXCIzMTE5MlwiOlwiTUxCXCIsXCIzMTI5M1wiOlwiSlFcIixcIjMxNDAwXCI6XCJZWFwiLFwiMzE1ODRcIjpcIllKXCIsXCIzMTg5NlwiOlwiWk5cIixcIjMxOTA5XCI6XCJaWVwiLFwiMzE5OTVcIjpcIlhKXCIsXCIzMjMyMVwiOlwiUEZcIixcIjMyMzI3XCI6XCJaWVwiLFwiMzI0MThcIjpcIkhHXCIsXCIzMjQyMFwiOlwiWFFcIixcIjMyNDIxXCI6XCJIR1wiLFwiMzI0MzhcIjpcIkxHXCIsXCIzMjQ3M1wiOlwiR0pcIixcIjMyNDg4XCI6XCJURFwiLFwiMzI1MjFcIjpcIlFKXCIsXCIzMjUyN1wiOlwiUEJcIixcIjMyNTYyXCI6XCJaU1FcIixcIjMyNTY0XCI6XCJKWlwiLFwiMzI3MzVcIjpcIlpEXCIsXCIzMjc5M1wiOlwiUEJcIixcIjMzMDcxXCI6XCJQRlwiLFwiMzMwOThcIjpcIlhMXCIsXCIzMzEwMFwiOlwiWUFcIixcIjMzMTUyXCI6XCJQQlwiLFwiMzMyNjFcIjpcIkNYXCIsXCIzMzMyNFwiOlwiQlBcIixcIjMzMzMzXCI6XCJURFwiLFwiMzM0MDZcIjpcIllBXCIsXCIzMzQyNlwiOlwiV01cIixcIjMzNDMyXCI6XCJQQlwiLFwiMzM0NDVcIjpcIkpHXCIsXCIzMzQ4NlwiOlwiWk5cIixcIjMzNDkzXCI6XCJUU1wiLFwiMzM1MDdcIjpcIlFKXCIsXCIzMzU0MFwiOlwiUUpcIixcIjMzNTQ0XCI6XCJaQ1wiLFwiMzM1NjRcIjpcIlhRXCIsXCIzMzYxN1wiOlwiWVRcIixcIjMzNjMyXCI6XCJRSlwiLFwiMzM2MzZcIjpcIlhIXCIsXCIzMzYzN1wiOlwiWVhcIixcIjMzNjk0XCI6XCJXR1wiLFwiMzM3MDVcIjpcIlBGXCIsXCIzMzcyOFwiOlwiWVdcIixcIjMzODgyXCI6XCJTUlwiLFwiMzQwNjdcIjpcIldNXCIsXCIzNDA3NFwiOlwiWVdcIixcIjM0MTIxXCI6XCJRSlwiLFwiMzQyNTVcIjpcIlpDXCIsXCIzNDI1OVwiOlwiWExcIixcIjM0NDI1XCI6XCJKSFwiLFwiMzQ0MzBcIjpcIlhIXCIsXCIzNDQ4NVwiOlwiS0hcIixcIjM0NTAzXCI6XCJZU1wiLFwiMzQ1MzJcIjpcIkhHXCIsXCIzNDU1MlwiOlwiWFNcIixcIjM0NTU4XCI6XCJZRVwiLFwiMzQ1OTNcIjpcIlpMXCIsXCIzNDY2MFwiOlwiWVFcIixcIjM0ODkyXCI6XCJYSFwiLFwiMzQ5MjhcIjpcIlNDXCIsXCIzNDk5OVwiOlwiUUpcIixcIjM1MDQ4XCI6XCJQQlwiLFwiMzUwNTlcIjpcIlNDXCIsXCIzNTA5OFwiOlwiWkNcIixcIjM1MjAzXCI6XCJUUVwiLFwiMzUyNjVcIjpcIkpYXCIsXCIzNTI5OVwiOlwiSlhcIixcIjM1NzgyXCI6XCJTWlwiLFwiMzU4MjhcIjpcIllTXCIsXCIzNTgzMFwiOlwiRVwiLFwiMzU4NDNcIjpcIlREXCIsXCIzNTg5NVwiOlwiWUdcIixcIjM1OTc3XCI6XCJNSFwiLFwiMzYxNThcIjpcIkpHXCIsXCIzNjIyOFwiOlwiUUpcIixcIjM2NDI2XCI6XCJYUVwiLFwiMzY0NjZcIjpcIkRDXCIsXCIzNjcxMFwiOlwiSkNcIixcIjM2NzExXCI6XCJaWUdcIixcIjM2NzY3XCI6XCJQQlwiLFwiMzY4NjZcIjpcIlNLXCIsXCIzNjk1MVwiOlwiWVdcIixcIjM3MDM0XCI6XCJZWFwiLFwiMzcwNjNcIjpcIlhIXCIsXCIzNzIxOFwiOlwiWkNcIixcIjM3MzI1XCI6XCJaQ1wiLFwiMzgwNjNcIjpcIlBCXCIsXCIzODA3OVwiOlwiVERcIixcIjM4MDg1XCI6XCJRWVwiLFwiMzgxMDdcIjpcIkRDXCIsXCIzODExNlwiOlwiVERcIixcIjM4MTIzXCI6XCJZRFwiLFwiMzgyMjRcIjpcIkhHXCIsXCIzODI0MVwiOlwiWFRDXCIsXCIzODI3MVwiOlwiWkNcIixcIjM4NDE1XCI6XCJZRVwiLFwiMzg0MjZcIjpcIktIXCIsXCIzODQ2MVwiOlwiWURcIixcIjM4NDYzXCI6XCJBRVwiLFwiMzg0NjZcIjpcIlBCXCIsXCIzODQ3N1wiOlwiWEpcIixcIjM4NTE4XCI6XCJZVFwiLFwiMzg1NTFcIjpcIldLXCIsXCIzODU4NVwiOlwiWkNcIixcIjM4NzA0XCI6XCJYU1wiLFwiMzg3MzlcIjpcIkxKXCIsXCIzODc2MVwiOlwiR0pcIixcIjM4ODA4XCI6XCJTUVwiLFwiMzkwNDhcIjpcIkpHXCIsXCIzOTA0OVwiOlwiWEpcIixcIjM5MDUyXCI6XCJIR1wiLFwiMzkwNzZcIjpcIkNaXCIsXCIzOTI3MVwiOlwiWFRcIixcIjM5NTM0XCI6XCJURFwiLFwiMzk1NTJcIjpcIlREXCIsXCIzOTU4NFwiOlwiUEJcIixcIjM5NjQ3XCI6XCJTQlwiLFwiMzk3MzBcIjpcIkxHXCIsXCIzOTc0OFwiOlwiVFBCXCIsXCI0MDEwOVwiOlwiWlFcIixcIjQwNDc5XCI6XCJORFwiLFwiNDA1MTZcIjpcIkhHXCIsXCI0MDUzNlwiOlwiSEdcIixcIjQwNTgzXCI6XCJRSlwiLFwiNDA3NjVcIjpcIllRXCIsXCI0MDc4NFwiOlwiUUpcIixcIjQwODQwXCI6XCJZS1wiLFwiNDA4NjNcIjpcIlFKR1wifTtcclxuICAgIC8v5Y+C5pWwLOS4reaWh+Wtl+espuS4slxyXG4gICAgLy/ov5Tlm57lgLw65ou86Z+z6aaW5a2X5q+N5Liy5pWw57uEXHJcbiAgICBmdW5jdGlvbiBtYWtlUHkoc3RyKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoc3RyKSAhPSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoLTEsIFwi5Ye95pWwbWFrZVB56ZyA6KaB5a2X56ym5Liy57G75Z6L5Y+C5pWwIVwiKTtcclxuICAgICAgICB2YXIgYXJyUmVzdWx0ID0gbmV3IEFycmF5KCk7IC8v5L+d5a2Y5Lit6Ze057uT5p6c55qE5pWw57uEXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAvL+iOt+W+l3VuaWNvZGXnoIFcclxuICAgICAgICAgICAgdmFyIGNoID0gc3RyLmNoYXJBdChpKTtcclxuICAgICAgICAgICAgLy/mo4Dmn6Xor6V1bmljb2Rl56CB5piv5ZCm5Zyo5aSE55CG6IyD5Zu05LmL5YaFLOWcqOWImei/lOWbnuivpeeggeWvueaYoOaxieWtl+eahOaLvOmfs+mmluWtl+avjSzkuI3lnKjliJnosIPnlKjlhbblroPlh73mlbDlpITnkIZcclxuICAgICAgICAgICAgYXJyUmVzdWx0LnB1c2goY2hlY2tDaChjaCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WkhOeQhmFyclJlc3VsdCzov5Tlm57miYDmnInlj6/og73nmoTmi7zpn7PpppblrZfmr43kuLLmlbDnu4RcclxuICAgICAgICByZXR1cm4gbWtSc2x0KGFyclJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tDaChjaCkge1xyXG4gICAgICAgIHZhciB1bmkgPSBjaC5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIC8v5aaC5p6c5LiN5Zyo5rGJ5a2X5aSE55CG6IyD5Zu05LmL5YaFLOi/lOWbnuWOn+Wtl+espizkuZ/lj6/ku6XosIPnlKjoh6rlt7HnmoTlpITnkIblh73mlbBcclxuICAgICAgICBpZiAodW5pID4gNDA4NjkgfHwgdW5pIDwgMTk5NjgpXHJcbiAgICAgICAgICAgIHJldHVybiBjaDsgLy9kZWFsV2l0aE90aGVycyhjaCk7XHJcbiAgICAgICAgLy/mo4Dmn6XmmK/lkKbmmK/lpJrpn7PlrZcs5piv5oyJ5aSa6Z+z5a2X5aSE55CGLOS4jeaYr+WwseebtOaOpeWcqHN0ckNoaW5lc2VGaXJzdFBZ5a2X56ym5Liy5Lit5om+5a+55bqU55qE6aaW5a2X5q+NXHJcbiAgICAgICAgcmV0dXJuIChvTXVsdGlEaWZmW3VuaV0gPyBvTXVsdGlEaWZmW3VuaV0gOiAoc3RyQ2hpbmVzZUZpcnN0UFkuY2hhckF0KHVuaSAtIDE5OTY4KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1rUnNsdChhcnIpIHtcclxuICAgICAgICB2YXIgYXJyUnNsdCA9IFtcIlwiXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSBhcnJbaV07XHJcbiAgICAgICAgICAgIHZhciBzdHJsZW4gPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAoc3RybGVuID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYXJyUnNsdC5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyclJzbHRba10gKz0gc3RyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRtcEFyciA9IGFyclJzbHQuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgICAgICBhcnJSc2x0ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgc3RybGVuOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WkjeWItuS4gOS4quebuOWQjOeahGFyclJzbHRcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gdG1wQXJyLnNsaWNlKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5oqK5b2T5YmN5a2X56ymc3RyW2td5re75Yqg5Yiw5q+P5Liq5YWD57Sg5pyr5bC+XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHN0ci5jaGFyQXQoayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5oqK5aSN5Yi25bm25L+u5pS55ZCO55qE5pWw57uE6L+e5o6l5YiwYXJyUnNsdOS4ilxyXG4gICAgICAgICAgICAgICAgICAgIGFyclJzbHQgPSBhcnJSc2x0LmNvbmNhdCh0bXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJSc2x0O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lik56uv5Y6756m65qC85Ye95pWwXHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKF5cXHMqKXwoXFxzKiQpL2csIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YXIgcGlueWluID0ge307XHJcbiAgICBwaW55aW4ubWFrZVB5ID0gbWFrZVB5O1xyXG5cclxuXHJcbiAgICAvL3ZhciBtYWlucGFuZWw7XHJcbiAgICAvL3ZhciBvcHRzO1xyXG4gICAgdmFyIGVsZW1lbnQgPSBsYXl1aS5lbGVtZW50LFxyXG4gICAgICAgIHdpbiA9IHdpbmRvdyxcclxuICAgICAgICBkb2MgPSBkb2N1bWVudDtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkaW5nKCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IGxheWVyLmxvYWQoMiwge1xyXG4gICAgICAgICAgICBzaGFkZTogWzAuNiwgJyNmZmYnXSAvLzAuMemAj+aYjuW6pueahOeZveiJsuiDjOaZr1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxheWVyLmNsb3NlKGluZGV4KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgcGxnU2lkZWJhciA9IGZ1bmN0aW9uIChlbGUsIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBDbGFzc01haW4gPSB7XHJcbiAgICAgICAgICAgIGRvbTogbnVsbCxcclxuICAgICAgICAgICAgZG9jdW1lbnRQYW5lbDogbnVsbCxcclxuICAgICAgICAgICAgbWV1blBhbmVsVGhpczogbnVsbCxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IGZ1bmN0aW9uIChtZXVuUGFuZWxUaGlzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2dldERhdGEgPSB0aGlzLm1ldW5QYW5lbFRoaXMuZ2V0RGF0YS5wYXJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYoIV9nZXREYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICBfZ2V0RGF0YT1bXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5rKh5pyJ5pWw5o2uXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVuZGVyTmF2ID0gdGhpcy5tYWluTmF2KF9nZXREYXRhKTtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRzID0gdGhpcy5vcGVzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRtbCA9XHJcbiAgICAgICAgICAgICAgICAgICAgJChgPGRpdiBjbGFzcz1cInBsZy1zaWRlYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgPGRpdiBjbGFzcz1cIm1haW4tbmF2XCI+XHJcbiAgICAgICAgPGRpdiBpZD1cIm1ldW5Tb3JvbGxcIiBjbGFzcz1cImxheXVpLXNpZGUtc2Nyb2xsXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1sb2dvXCIgPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsb2dvLXBhdGggJHtvcHRzLmxvZ289PSdwbGcnJiYncGxnLWxvZ28nfVwiID48L2E+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxpIGlkPVwicGxnLWxvZ28tZm9sZFwiIGNsYXNzPVwiYW50aWNvbiBsYXl1aS1pY29uIGxheXVpLWljb24tc2hyaW5rLXJpZ2h0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgXHJcbiAgICAgICAgICAgIDwhLS0g5bem5L6n5a+86Iiq5Yy65Z+f77yI5Y+v6YWN5ZCIbGF5dWnlt7LmnInnmoTlnoLnm7Tlr7zoiKrvvIkgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1vcGVuXCIgZGF0YS10eXBlPVwiaG9vdC1jbGlja1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWxheWVyLXNldHdpblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLWNsb3NlXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPjwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByLXNlYXJjaFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHItaWNvbi1zZWFyY2gtd3JhcHBlclwiPjxpIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLXNlYXJjaFxyXG5cIj48L2k+PC9zcGFuPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInNlbGVjdElucHV0XCIgY2xhc3M9XCJwci1zZWFyY2gtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeWFs+mUruivjVwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXRpcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Bhbj7ku6XkuIvmmK/kuI7igJw8c3Ryb25nPjwvc3Ryb25nPuKAneebuOWFs+eahOS6p+WTge+8mjwvc3Bhbj48L3A+PC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJrZXlVcExpc3RcIiBjbGFzcz1cImtleVVwTGlzdFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1tZXVuZ3JvdXAtbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsLW5hdlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJyaWdodC1zaWRlYmFyXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1hbGxcIiBkYXRhLXR5cGU9XCJob290LWNsaWNrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnQgcC1pY29uLWFsbFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1ldW4tbmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPuaJgOacieacjeWKoTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInJpZ2h0LW1vdmVyIGxheXVpLWljb24gbGF5dWktaWNvbi1yaWdodFxyXG5cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWxhc3RcIiBkYXRhLXR5cGU9XCJob290LWNsaWNrXCI+XHJcbiAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzaWRlYmFyXCIgY2xhc3M9XCJzaWRlYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtyZW5kZXJOYXZ9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdi1ob3Zlci1jaGlsZFwiID5cclxuICAgICAgICAgICAgICAgIDwhLS0g5LqM57qn6I+c5Y2VIC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLXNpZGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJuYXYtdGl0bGVcIj48L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiYm9keS1uYXZcIiBsYXktZmlsdGVyPVwidGVzdFwiPjwvdWw+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgXHJcbjwvZGl2PlxyXG5gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bWxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFpbk5hdjogZnVuY3Rpb24gKHBhcmVudERhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vICFpdGVtLmxlYWZcclxuICAgICAgICAgICAgICAgIGlmKCFwYXJlbnREYXRhWzBdKXtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnREYXRhWzBdPVtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmlbDmja7liqDovb3lpLHotKVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcmVudERhdGFbMF0uZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucGFyZW50TWVudUlkID09PSBcIjBcIiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFuZ3VhZ2U9SFRNTFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUgKz0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzLWl0ZW1cIiBpZD0ke2l0ZW0uaWR9IG1lbnUtaWQ9JHtpdGVtLm1lbnVJZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiJHtpdGVtLmltYWdlUGF0aH1cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1ldW4tbmFtZVwiPjxhIGhyZWY9XCIkeyFpdGVtLmxlYWY/XCJqYXZhc2NyaXB0OjtcIjppdGVtLnBhdGh9XCI+JHtpdGVtLm5hbWV9PC9hPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNldE9wZW5NZW51TGlzdDogZnVuY3Rpb24gKGVsZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBncm91cCA9ICQoYDxkaXYgY2xhc3M9XCJwci1tZXVuLWdyb3VwXCI+PC9kaXY+PGRpdiBjbGFzcz1cInByLW1ldW4tZ3JvdXBcIj48L2Rpdj48ZGl2IGNsYXNzPVwicHItbWV1bi1ncm91cFwiPjwvZGl2PmApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v5o+S5YWl5Y+z6L6555qE5a+86IiqXHJcbiAgICAgICAgICAgICAgICAkKF90aGlzLmRvY3VtZW50UGFuZWxbMF0pLmZpbmQoXCIucmlnaHQtc2lkZWJhclwiKS5odG1sKFwiXCIpLmFwcGVuZChfdGhpcy5tYWluTmF2KGRhdGEpKTtcclxuICAgICAgICAgICAgICAgIGRhdGFbMF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW54ZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlID0gYDxkaXYgY2xhc3M9XCJsaXN0LWl0ZW1cIiBpZD0ke2l0ZW0ubWVudUlkfT48YSBocmVmPVwiJHshaXRlbS5sZWFmPydqYXZhc2NyaXB0OjsnOml0ZW0ucGF0aH1cIiBtZW51LWlkPSR7aXRlbS5tZW51SWR9IHBhcmVudG1lbnVpZD0ke2l0ZW0ucGFyZW50TWVudUlkfSBjbGFzcz1cImxpc3QtdGl0bGVcIj4ke2l0ZW0ubmFtZX08L2E+YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpdGVtLm1lbnVJZF0gJiYgZGF0YVtpdGVtLm1lbnVJZF0uZm9yRWFjaChmdW5jdGlvbiAoY2l0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZSArPSBgPGRpdiBjbGFzcz1cIm1lbnUtdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JHtjaXRlbS5wYXRoIHx8IFwiamF2YXNjcmlwdDo7XCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUtaWQ9JHtjaXRlbS5tZW51SWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudG1lbnVpZD0ke2NpdGVtLnBhcmVudE1lbnVJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhZj0ke2NpdGVtLmxlYWZ9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Y2l0ZW0ubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtjaXRlbS5tZW51SWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2NpdGVtLm1lbnVJZF0uZm9yRWFjaChmdW5jdGlvbiAoZGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUgKz0gYDxkaXYgY2xhc3M9XCJtZW51LXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JHtkaXRlbS5wYXRoIHx8IFwiamF2YXNjcmlwdDo7XCJ9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUtaWQ9JHtkaXRlbS5tZW51SWR9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudG1lbnVpZD0ke2RpdGVtLnBhcmVudE1lbnVJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWFmPSR7ZGl0ZW0ubGVhZn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2RpdGVtLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUgKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlueGV4ICUgMyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5lcSgwKS5hcHBlbmQoZWxlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW54ZXggJSAzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmVxKDEpLmFwcGVuZChlbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbnhleCAlIDMgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZXEoMikuYXBwZW5kKGVsZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdyb3VwLmZpbmQoXCIubWVudS10ZXh0PmFbbGVhZj0nZmFsc2UnXVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKGdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldE9wZW5BbGw6IGZ1bmN0aW9uIChnZXREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBfdGhpcy5kb20ubWV1bmdyb3VwTGlzdCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnREYXRhcyA9IGdldERhdGEucGFyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIHZhciBrZXlVcExpc3QgPSAkKF90aGlzLmRvY3VtZW50UGFuZWxbMF0pLmZpbmQoXCIja2V5VXBMaXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVzZXRPcGVuTWVudUxpc3QobGlzdCwgcGFyZW50RGF0YXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZWdDSCA9IG5ldyBSZWdFeHAoXCJbXFxcXHU0RTAwLVxcXFx1OUZGRl0rXCIsIFwiZ1wiKTtcclxuICAgICAgICAgICAgICAgICQoX3RoaXMuZG9jdW1lbnRQYW5lbFswXSkuZmluZChcIiNzZWxlY3RJbnB1dFwiKS5rZXl1cChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpc3QuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5uZXh0KFwiLnNlYXJjaC10aXBcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5VXBMaXN0Lmh0bWwoXCJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8v6L6T5YWl5qGG5Lit5rKh5pyJ5YaF5a6577yM5YiZ6YCA5Ye6XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykubmV4dChcIi5zZWFyY2gtdGlwXCIpLnNob3coKS5maW5kKFwic3Ryb25nXCIpLnRleHQodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZ2V0RGF0YS5tYXBBbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBnZXREYXRhLm1hcEFsbFtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gcmVnQ0gudGVzdCh2YWwpID8gaXRlbS5uYW1lLmluZGV4T2YodmFsKSA6IGl0ZW0uUFlfY29kZS5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHIgPj0gMCAmJiBpdGVtLmxlYWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZSArPSBgPGRpdiBjbGFzcz1cInByLW1ldW4tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JHtpdGVtLnBhdGggfHwgXCJqYXZhc2NyaXB0OjtcIn0gPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2l0ZW0ubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5VXBMaXN0Lmh0bWwoXCJcIikuc2hvdygpLmFwcGVuZChlbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvL+iOt+WPluiPnOWNlXRvcOWAvFxyXG4gICAgICAgICAgICBtZXVuVG9wT2JqOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBfdGhpcy5kb20ubWV1bmdyb3VwTGlzdC5maW5kKFwiLmxpc3QtaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIG9iaiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbGlzdC5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBpdGVtLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialtrZXldID0gcGFyc2VJbnQoaXRlbS5vZmZzZXRUb3ApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZW1vdmVyU2hvd0xpc3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IF90aGlzLmRvbS5tZXVuZ3JvdXBMaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIF9nZXREYXRhID0gX3RoaXMubWV1blBhbmVsVGhpcy5nZXREYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudERhdGFzID0gX2dldERhdGEucGFyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRvbSAmJiB0aGlzLmRvbS5tZXVuU29yb2xsLnJlbW92ZUNsYXNzKFwic2hvd0xpc3RcIik7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY2xpY2tDaGlsZDogZnVuY3Rpb24gKGNhbGxiYWtjKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIG90aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvZHlOYXYgPSBfdGhpcy5kb20uYm9keU5hdiAvL3VsXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIF9nZXREYXRhID0gX3RoaXMubWV1blBhbmVsVGhpcy5nZXREYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v54K55Ye75LqM57qn6I+c5Y2V5YiX6KGoXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kb20uYm9keU5hdi5vbihcImNsaWNrXCIsIFwiYVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8v6Zi75q2i5LqL5Lu25YaS5rOhXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG90aGlzID0gJCh0aGlzKSAvL2FcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWlkID0gb3RoaXMuYXR0cihcIm1lbnUtaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9tLm1ldW5ncm91cExpc3QuZmluZChcImFbbWVudS1pZD0nXCIgKyBtaWQgKyBcIiddXCIpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8v54K55Ye757uZ5bGV5byA5omA5Lul6I+c5Y2V5YiX6KGoXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1bmdyb3VwTGlzdC5vbihcImNsaWNrXCIsIFwiYVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8v6Zi75q2i5LqL5Lu25YaS5rOheFxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBvdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pZCA9ICQodGhpcykuYXR0cihcIm1lbnUtaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvZHlOYXZfdGhpcyA9IGJvZHlOYXYuZmluZChcImFbbWVudS1pZD0nXCIgKyBtaWQgKyBcIiddXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3BhcmVudHMgPSAkdGhpcy5wYXJlbnRzKFwiLmJvZHktbmF2XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5TmF2X3BhcmVudCA9IGJvZHlOYXZfdGhpcy5wYXJlbnQoKSwgLy9saVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5TmF2X2NoaWxkID0gYm9keU5hdl90aGlzLnNpYmxpbmdzKCcubmF2LWNoaWxkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWtjRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Q3VycmVudDogX2dldERhdGEubWFwQWxsW21pZF1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwaWQ9b3RoaXMucGFyZW50cyhcIi5saXN0LWl0ZW1cIikuYXR0cihcImlkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWFmPSBfZ2V0RGF0YS5tYXBBbGxbbWlkXS5sZWFmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmID0gb3RoaXMuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Y+z6L6555qE5a+86IiqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGlzLnBhcmVudHMoXCIucHItb3BlblwiKS5maW5kKFwiLnJpZ2h0LXNpZGViYXIgLnMtaXRlbVttZW51LWlkPVwiK3BpZCtcIl0gYVwiKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnVwZGF0ZUNoaWxkTWV1bihwaWQsIG1pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxlYWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC5maW5kKFwiLm5hdi1sYXN0XCIpLmF0dHIoXCJkYXRhLXNob3dcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZXJTaG93TGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFrYyAmJiBjYWxsYmFrYyhjYWxsYmFrY0RhdGEsIGUpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBFdmVudEhhbmxkZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC5oYXNDbGFzcyhcInNob3dMaXN0XCIpICYmIF90aGlzLnJlbW92ZXJTaG93TGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL+aOp+WItuiPnOWNleWxleW8gOaUtue8qVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuZG9tLmRvY3VtZW50UGFuZWwuZmluZChcIiNwbGctbG9nby1mb2xkXCIpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwibGF5dWktaWNvbi1zaHJpbmstcmlnaHRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImxheXVpLWljb24tc2hyaW5rLXJpZ2h0XCIpLmFkZENsYXNzKFwibGF5dWktaWNvbi1zcHJlYWQtbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJwbGctb3Blbi1ob3ZlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImxheXVpLWljb24tc3ByZWFkLWxlZnRcIikuYWRkQ2xhc3MoXCJsYXl1aS1pY29uLXNocmluay1yaWdodFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJwbGctb3Blbi1ob3ZlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZG9tLm1ldW5Tb3JvbGwuZmluZChcIi5uYXYtbGFzdFwiKS5ob3ZlcihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVyU2hvd0xpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5kb20uYm9keU5hdi5maW5kKFwibGlcIikubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXNob3dcIiwgXCJzaG93LWNoaWxkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtc2hvd1wiLCBcIlwiKVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC5vbihcImNsaWNrXCIsIFwiW2RhdGEtdHlwZT0naG9vdC1jbGljayddXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy/pmLvmraLkuovku7blhpLms6FcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZSA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb2R1Y3QtYWxsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC50b2dnbGVDbGFzcyhcInNob3dMaXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwci1vcGVuXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkKGV2ZSkucGFyZW50cyhcIi5wci1sZWZ0XCIpLmxlbmd0aD4wfHxldmUubm9kZU5hbWUhPVwiQVwiKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggZXZlLnBhcmVudE5vZGUuY2xhc3NOYW1lID09IFwibGF5dWktbGF5ZXItc2V0d2luXCIpeyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVyU2hvd0xpc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldW5Ub3AgPSBfdGhpcy5tZXVuVG9wT2JqKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc0l0ZW0gPSAkKGV2ZSkucGFyZW50cyhcIi5zLWl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhpc0hyZWYgPSBzSXRlbS5hdHRyKFwibWVudS1pZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ID0gJChcIi5wci1tZXVuZ3JvdXAtbGlzdFwiKS5maW5kKFwiLmxpc3QtaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNJdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpWzBdLmlkID09IHRoaXNIcmVmID8gJCh0aGlzKS5hZGRDbGFzcyhcInNlbGVjdFwiKSA6ICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzZWxlY3RcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWV1blRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoa2V5KSA9PSB0aGlzSHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnByLWxlZnRcIikuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG1ldW5Ub3Bba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5hdi1sYXN0XCI6ICAgICAgLy/ngrnkuIDnuqfoj5zljZXliqDovb3kuoznuqfoj5zljZVcclxuICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50cyA9ICQoZXZlKS5wYXJlbnRzKFwiLnMtaXRlbVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51aWQgPSBwYXJlbnRzLmF0dHIoXCJtZW51LWlkXCIpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbWVudWlkKSByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVhZj1Cb29sZWFuKF90aGlzLm1ldW5QYW5lbFRoaXMuZ2V0RGF0YS5tYXBBbGxbbWVudWlkXS5sZWFmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC5maW5kKFwiLm5hdi1sYXN0XCIpLmF0dHIoXCJkYXRhLXNob3dcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlclNob3dMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoJChldmUpLnBhcmVudHMoXCIjc2lkZWJhclwiKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRvbS5tZXVuZ3JvdXBMaXN0LmZpbmQoXCJhW21lbnUtaWQ9J1wiKyBtZW51aWQgKyBcIiddXCIpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobGVhZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRvbS5tZXVuU29yb2xsLmZpbmQoXCIubmF2LWxhc3RcIikuYXR0cihcImRhdGEtc2hvd1wiLCBcInNob3ctY2hpbGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHZhciB0YWJBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBkYXRlQ2hpbGRNZXVuOiBmdW5jdGlvbiAocGlkLCBtaWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGlkID0gcGlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhck5hdiA9ICQoXCJbbWVudS1pZD1cIiArIHBpZCArIFwiXVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJOYXYuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICBcclxuICAgICAgICAgICAgICAgIHZhciBfZ2V0RGF0YSA9IF90aGlzLm1ldW5QYW5lbFRoaXMuZ2V0RGF0YTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRvbS5ib2R5TmF2LmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChwaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfZ2V0RGF0YS5tYXBBbGxbcGlkXS5sZWFmJiZfZ2V0RGF0YS5tYXBBbGxbbWlkXS5wYXJlbnRNZW51SWQ9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudERhdGEgPSBfZ2V0RGF0YS5wYXJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudERhdGFbcGlkXSAmJiBwYXJlbnREYXRhW3BpZF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2xpQ2xhc3M9XCJpdGVtIGgtbGlua1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWlkKSB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5tZW51SWQgPT0gbWlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGlDbGFzcz1cIml0ZW0gaC1saW5rIGFjdGl2ZS10aGlzIGl0ZW1lZHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9saSA9ICQoXCI8bGk+XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjpvbGlDbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYSA9ICQoXCI8YT5cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IGl0ZW0ucGF0aCB8fCBcImphdmFzY3JpcHQ6O1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZW51LWlkXCI6IGl0ZW0ubWVudUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsZWFmXCI6IGl0ZW0ubGVhZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGV2ZWxcIjogaXRlbS5sZXZlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogaXRlbS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50TWVudUlkXCI6IGl0ZW0ucGFyZW50TWVudUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50ZXh0KGl0ZW0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGkuYXBwZW5kKG9hKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtLmxlYWYgJiYgcGFyZW50RGF0YVtpdGVtLnBhcmVudE1lbnVJZF0gJiYgcGFyZW50RGF0YVtpdGVtLnBhcmVudE1lbnVJZF0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hdmNoaWxkID0gJzxkbCBjbGFzcz1cIm5hdi1jaGlsZFwiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnREYXRhW2l0ZW0ubWVudUlkXSAmJiBwYXJlbnREYXRhW2l0ZW0ubWVudUlkXS5mb3JFYWNoKGZ1bmN0aW9uIChjaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmNoaWxkICs9IGA8ZGQgY2xhc3M9ICR7KG1pZCAmJiBjaXRlbS5tZW51SWQgPT0gbWlkKSA/IFwiYWN0aXZlLXRoaXNcIiA6IFwiXCJ9ID48YSBocmVmPSR7Y2l0ZW0ucGF0aCB8fCBcImphdmFzY3JpcHQ6O1wifSBsZWFmPSR7Y2l0ZW0ubGVhZn0gXHJcbm1haW4taWQ9JHtpdGVtLnBhcmVudE1lbnVJZH0gcGFyZW50TWVudUlkPSR7Y2l0ZW0ucGFyZW50TWVudUlkfSBtZW51LWlkPSR7Y2l0ZW0ubWVudUlkfT4ke2NpdGVtLm5hbWV9PC9hPjwvZGQ+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2Y2hpbGQgKz0gXCI8L2RsPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2EuYXBwZW5kKGA8aSBjbGFzcz1cInJpZ2h0LW1vdmVyIGxheXVpLWljb24gbGF5dWktaWNvbi1yaWdodFwiPjwvaT5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9saS5hcHBlbmQobmF2Y2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9saS5maW5kKFwiZGRcIikuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoaXRlbSkuYXR0cihcImNsYXNzXCIpID09IFwiYWN0aXZlLXRoaXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xpLmFkZENsYXNzKFwiYWN0aXZlLXRoaXNcIikuYWRkQ2xhc3MoXCJpdGVtZWRzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9saS5maW5kKFwiLm5hdi1jaGlsZFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20uYm9keU5hdi5hcHBlbmQob2xpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXRQYW5lbDogZnVuY3Rpb24gKG1ldW5QYW5lbFRoaXMsIG9wZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5tZXVuUGFuZWxUaGlzID0gbWV1blBhbmVsVGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBfZ2V0RGF0YSA9IF90aGlzLm1ldW5QYW5lbFRoaXMuZ2V0RGF0YTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMub3BlcyA9IG9wZXM7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kb2N1bWVudFBhbmVsID0gX3RoaXMudGVtcGxhdGUoX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmRvY3VtZW50UGFuZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9tID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudFBhbmVsOiBfdGhpcy5kb2N1bWVudFBhbmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXVuU29yb2xsOiBfdGhpcy5kb2N1bWVudFBhbmVsLmZpbmQoXCIjbWV1blNvcm9sbFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keU5hdjogX3RoaXMuZG9jdW1lbnRQYW5lbC5maW5kKFwiLmJvZHktbmF2XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXVuZ3JvdXBMaXN0OiBfdGhpcy5kb2N1bWVudFBhbmVsLmZpbmQoXCIucHItbWV1bmdyb3VwLWxpc3RcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByTGVmdDogX3RoaXMuZG9jdW1lbnRQYW5lbC5maW5kKFwiLnByLWxlZnRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0YWJsaTogJChcIi5sYXl1aS10YWItdGl0bGUgbGlcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRuYXZfaG92ZXJfY2hpbGQ6IF90aGlzLmRvY3VtZW50UGFuZWwuZmluZChcIi5uYXYtaG92ZXItY2hpbGRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldE9wZW5BbGwoX2dldERhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy/kuovku7bms6jlhoxcclxuICAgICAgICAgICAgICAgIF90aGlzLkV2ZW50SGFubGRlcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmRvY3VtZW50UGFuZWxcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBnZXRGdW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDbGFzc01haW47XHJcbiAgICAgICAgfTtcclxuICAgICAgICBfdGhpcy5nZXRGdW4gPSBnZXRGdW4oKTtcclxuICAgICAgICB2YXIgY29uZmlnPXtcclxuICAgICAgICAgICAgdXJsOm51bGwsXHJcbiAgICAgICAgICAgIHJvdXRlOmZhbHNlLFxyXG4gICAgICAgICAgICBtZW51Q2xpY2s6bnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ojrflj5bmlbDmja7lhaXlj6NcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCBjb25maWcsIF90aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICBfdGhpcy5pbml0KF90aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICBfdGhpcy5lbGUgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMgPSBhcmd1bWVudHNbMV07XHJcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCBjb25maWcsIF90aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICBfdGhpcy5pbml0KF90aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgX3RoaXMucmVuZGVyVG8oX3RoaXMuZWxlKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIHBsZ1NpZGViYXIucHJvdG90eXBlLmNvbmZpZyA9IHtcclxuICAgICAgICBpc1RyaWdnZXI6IGZhbHNlLFxyXG4gICAgICAgIHVybDogXCJcIixcclxuICAgICAgICBsb2dvOiBudWxsLFxyXG5cclxuICAgIH07XHJcblxyXG4gICAgcGxnU2lkZWJhci5wcm90b3R5cGUuc2V0TWFwRGF0YSA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICB2YXIgY2xvc2VMb2FkPWxvYWRpbmcoKTtcclxuXHJcbiAgICAgICAgdmFyIGRhdGFBbGwsIG1hcEFsbCA9IG51bGwsXHJcbiAgICAgICAgICAgIHBhcmVudERhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBtYXBkYXRhKGRhdGFBbGwpIHtcclxuICAgICAgICAgICAvKiAgbGF5ZXIubG9hZCgwLCB7XHJcbiAgICAgICAgICAgICAgICBzaGFkZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTsgKi9cclxuICAgICAgICAgICAgbGV0IG1hcCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZGF0YUFsbC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghbWFwW2l0ZW0ucGFyZW50TWVudUlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcFtpdGVtLnBhcmVudE1lbnVJZF0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1hcFtpdGVtLnBhcmVudE1lbnVJZF0ucHVzaChpdGVtKVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtYXBBbGwgPSB7fTtcclxuICAgIC8vICAgIHZhciB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpO1xyXG4gICAgICAgIFByb2xvZy5zeW5jQWpheChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgLyogICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgKi9cclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUFsbCA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQWxsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uUFlfY29kZSA9IHBpbnlpbi5tYWtlUHkoaXRlbS5uYW1lKVswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RGF0YSA9IG1hcGRhdGEoZGF0YUFsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBbGwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwQWxsW2l0ZW0ubWVudUlkXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gIGNsb3NlTG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIubXNnKFwi5pWw5o2u5Yqg6L295aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIGNsb3NlTG9hZCgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGFBbGw6IGRhdGFBbGwsXHJcbiAgICAgICAgICAgIG1hcEFsbDogbWFwQWxsLFxyXG4gICAgICAgICAgICBwYXJlbnREYXRhOiBwYXJlbnREYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBcclxuXHJcbiAvKiAgICB2YXIgY2xvc2VMb2FkPSBsb2FkaW5nKCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNsb3NlTG9hZCgpXHJcbiAgICAgIC8vICBsYXllci5jbG9zZShjbG9zZUxvYWQpXHJcbiAgICB9LDIwMDApICovXHJcblxyXG4gICAgcGxnU2lkZWJhci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgX2NsYXNzID0gdGhpcy5nZXRGdW47XHJcbiAgICAgICAgaWYgKHR5cGVvZiBfdGhpcy5vcHRpb25zID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm9wdHMgPSAkLmV4dGVuZCh0cnVlLCBfdGhpcy5jb25maWcsIF90aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0cy51cmwgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RGF0YSA9IF90aGlzLnNldE1hcERhdGEoX3RoaXMub3B0cy51cmwpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RWxlbWVudCA9IF9jbGFzcy5pbml0UGFuZWwoX3RoaXMsIF90aGlzLm9wdHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgX3RoaXMub3B0cy5tZW51Q2xpY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2xhc3MuY2xpY2tDaGlsZChfdGhpcy5vcHRzLm1lbnVDbGljaylcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF9jbGFzcy5jbGlja0NoaWxkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcblxyXG5cclxuICAgIH07XHJcbiAgICAvL+eGj+afk+aooeadv+WIsOiKgueCuVxyXG4gICAgcGxnU2lkZWJhci5wcm90b3R5cGUucmVuZGVyVG8gPSBmdW5jdGlvbiAoZG9tSWQpIHtcclxuICAgICBcclxuICAgICAgICB2YXIgZG9jdW1lbnRQYW5lbCA9IHRoaXMuZ2V0RnVuLmRvY3VtZW50UGFuZWw7XHJcbiAgICAgICAgJChcIiNcIiArIGRvbUlkKS5hcHBlbmQoZG9jdW1lbnRQYW5lbCk7XHJcbiBcclxuICAgICAgICBpZiAodGhpcy5vcHRzLmlzVHJpZ2dlcikge1xyXG4gICAgICAgICAgICB2YXIgbWVudWlkID0gJChcIiNcIiArIGRvbUlkKS5maW5kKFwiLnNpZGViYXIgbGk6Zmlyc3QtY2hpbGRcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIikuYXR0cihcIm1lbnUtaWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RnVuLnVwZGF0ZUNoaWxkTWV1bihtZW51aWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB3aW5kb3cuUGxnU2lkZUFjY29yZGlvbiA9IHBsZ1NpZGViYXI7XHJcblxyXG4gICAgJC5mbi5pbml0UGxnU2lkZUFjY29yZGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgIC8qICB2YXIgY2xvc2VMb2FkPSBsb2FkaW5nKCk7ICovXHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgcGxnU2lkZWJhcih0aGlzLCBvcHRpb25zKTtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbn0pKGpRdWVyeSk7IiwiO1xyXG4oZnVuY3Rpb24gKCQpIHtcclxuXHJcblxyXG4gICAgdmFyIHN0ckNoaW5lc2VGaXJzdFBZID0gXCJZRFlRU1hNV1pTU1hKQllNR0NDWlFQU1NRQllDRFNDRFFMRFlMWUJTU0pHWVpaSkpGS0NDTFpESFdEV1pKTEpQRllZTldKSlRNWUhaV1pIRkxaUFBRSEdTQ1lZWU5KUVlYWEdKSEhTRFNKTktLVE1PTUxDUlhZUFNOUVNFQ0NRWkdHTExZSkxNWVpaU0VDWUtZWUhRV0pTU0dHWVhZWllKV1dLREpIWUNITVlYSlRMWEpZUUJZWFpMRFdSREpSV1lTUkxEWkpQQ0JaSkpCUkNGVExFQ1pTVFpGWFhaSFRSUUhZQkRMWUNaU1NZTU1SRk1ZUVpQV1dKSllGQ1JXRkRGWlFQWUREV1lYS1lKQVdKRkZYWVBTRlRaWUhIWVpZU1dDSllYU0NMQ1hYV1paWE5CR05OWEJYTFpTWlNCU0dQWVNZWkRITURaQlFCWkNXRFpaWVlUWkhCVFNZWUJaR05UTlhRWVdRU0tCUEhITFhHWUJGTUpFQkpISEdRVEpDWVNYU1RLWkhMWUNLR0xZU01aWFlBTE1FTERDQ1hHWllSSlhTRExUWVpDUUtDTk5KV0hKVFpaQ1FMSlNUU1RCTlhCVFlYQ0VRWEdLV0pZRkxaUUxZSFlYU1BTRlhMTVBCWVNYWFhZREpDWllMTExTSlhGSEpYUEpCVEZGWUFCWVhCSFpaQkpZWkxXTENaR0dCVFNTTURUSlpYUFRIWVFUR0xKU0NRRlpLSlpKUU5MWldMU0xIRFpCV0pOQ0paWVpTUVFZQ1FZUlpDSkpXWUJSVFdQWUZUV0VYQ1NLRFpDVEJaSFlaWllZSlhaQ0ZGWlpNSllYWFNEWlpPVFRCWkxRV0ZDS1NaU1hGWVJMTllKTUJEVEhKWFNRUUNDU0JYWVlUU1lGQlhEWlRHQkNOU0xDWVpaUFNBWllaWlNDSkNTSFpRWURYTEJQSkxMTVFYVFlEWlhTUUpUWlBYTENHTFFUWldKQkhDVFNZSlNGWFlFSkpUTEJHWFNYSk1ZSlFRUEZaQVNZSk5UWURKWEtKQ0RKU1pDQkFSVERDTFlKUU1XTlFOQ0xMTEtCWUJaWlNZSFFRTFRXTENDWFRYTExaTlRZTE5FV1laWVhDWlhYR1JLUk1UQ05ETkpUU1lZU1NEUURHSFNEQkpHSFJXUlFMWUJHTFhITEdUR1hCUUpEWlBZSlNKWUpDVE1STllNR1JaSkNaR0pNWk1HWE1QUllYS0pOWU1TR01aSllNS01GWE1MRFRHRkJIQ0pIS1lMUEZNRFhMUUpKU01UUUdaU0pMUURMREdKWUNBTENNWkNTREpMTE5YREpGRkZGSkNaRk1aRkZQRktIS0dEUFNYS1RBQ0pESEhaRERDUlJDRlFZSktRQ0NXSkRYSFdKTFlMTFpHQ0ZDUURTTUxaUEJKSlBMU0JDSkdHRENLS0RFWlNRQ0NLSkdDR0tESlRKRExaWUNYS0xRU0NHSkNMVEZQQ1FDWkdXUEpEUVlaSkpCWUpIU0pEWldHRlNKR1pLUUNDWkxMUFNQS0pHUUpIWlpMSlBMR0pHSkpUSEpKWUpaQ1pNTFpMWVFCR0pXTUxKS1haRFpOSlFTWVpNTEpMTEpLWVdYTUtKTEhTS0pHQk1DTFlZTUtYSlFMQk1MTEtNRFhYS1dZWFlTTE1MUFNKUVFKUVhZWEZKVEpEWE1YWExMQ1hRQlNZSkJHV1lNQkdHQkNZWFBKWUdQRVBGR0RKR0JIQk5TUUpZWkpLSktIWFFGR1FaS0ZIWUdLSERLTExTREpRWFBRWUtZQk5RU1hRTlNaU1dIQlNYV0hYV0JaWlhETU5TSkJTQktCQlpLTFlMWEdXWERSV1lRWk1ZV1NKUUxDSlhYSlhLSkVRWFNDWUVUTFpITFlZWVNEWlBBUVlaQ01UTFNIVFpDRllaWVhZTEpTRENKUUFHWVNMQ1FMWVlZU0hNUlFRS0xEWFpTQ1NTU1lEWUNKWVNGU0pCRlJTU1pRU0JYWFBYSllTRFJDS0dKTEdES1pKWkJES1RDU1lRUFlIU1RDTERKREhNWE1DR1hZWkhKRERUTUhMVFhaWFlMWU1PSFlKQ0xUWUZCUVFYUEZCREZISFRLU1FIWllZV0NOWFhDUldIT1dHWUpMRUdXRFFDV0dGSllDU05UTVlUT0xCWUdXUVdFU0pQV05NTFJZRFpTWlRYWVFQWkdDV1hITkdQWVhTSE1ZUUpYWlREUFBCRllIWkhUSllGRFpXS0dLWkJMRE5UU1hIUUVFR1paWUxaTU1aWUpaR1haWEtIS1NUWE5YWFdZTFlBUFNUSFhEV0haWU1QWEFHS1lEWEJITkhYS0RQSk5NWUhZTFBNR09DU0xOWkhLWFhMUFpaTEJNTFNGQkhIR1lHWVlHR0JIU0NZQVFUWVdMWFRaUUNFWllEUURRTU1IVEtMTFNaSExTSlpXRllIUVNXU0NXTFFBWllOWVRMU1hUSEFaTktaWlNaWkxBWFhaV1dDVEdRUVRERFlaVENDSFlRWkZMWFBTTFpZR1BaU1pOR0xORFFUQkRMWEdUQ1RBSkRLWVdOU1laTEpISFpaQ1dOWVlaWVdNSFlDSEhZWEhKS1pXU1hIWllYTFlTS1FZU1BTTFlaV01ZUFBLQllHTEtaSFRZWEFYUVNZU0hYQVNNQ0hLRFNDUlNXSlBXWFNHWkpMV1dTQ0hTSkhTUU5IQ1NFR05EQVFUQkFBTFpaTVNTVERRSkNKS1RTQ0pBWFBMR0dYSEhHWFhaQ1hQRE1NSExER1RZQllTSk1YSE1SQ1BYWEpaQ0taWFNITUxRWFhUVEhYV1pGS0hDQ1pEWVRDSllYUUhMWERIWVBKUVhZTFNZWURaT1pKTllYUUVaWVNRWUFZWFdZUERHWEREWFNQUFlaTkRMVFdSSFhZRFhaWkpIVENYTUNaTEhQWVlZWU1IWkxMSE5YTVlMTExNRENQUFhITVhES1lDWVJETFRYSkNISFpaWFpMQ0NMWUxOWlNIWkpaWkxOTlJMV0hZUVNOSkhYWU5UVFRLWUpQWUNISFlFR0tDVFRXTEdRUkxHR1RHVFlHWUhQWUhZTFFZUUdDV1lRS1BZWVlUVFRUTEhZSExMVFlUVFNQTEtZWlhHWldHUFlEU1NaWkRRWFNLQ1FOTUpKWlpCWFlRTUpSVEZGQlRLSFpLQlhMSkpLRFhKVExCV0ZaUFBUS1FUWlRHUERHTlRQSllGQUxRTUtHWEJEQ0xaRkhaQ0xMTExBRFBNWERKSExDQ0xHWUhEWkZHWURER0NZWUZHWURYS1NTRUJESFlLREtES0hOQVhYWUJQQllZSFhaUUdBRkZRWUpYRE1MSkNTUVpMTFBDSEJTWEdKWU5EWUJZUVNQWldKTFpLU0REVEFDVEJYWkRZWllQSlpRU0pOS0tUS05KREpHWVlQR1RMRllRS0FTRE5UQ1lIQkxXRFpIQkJZRFdKUllHS1pZSEVZWUZKTVNEVFlGWkpKSEdDWFBMWEhMRFdYWEpLWVRDWUtTU1NNVFdDVFRRWkxQQlNaRFpXWlhHWkFHWUtUWVdYTEhMU1BCQ0xMT1FNTVpTU0xDTUJKQ1NaWktZRENaSkdRUURTTUNZVFpRUUxXWlFaWFNTRlBUVEZRTUREWkRTSERURFdGSFREWVpKWVFKUUtZUEJESllZWFRMSkhEUlFYWFhIQVlESFJKTEtMWVRXSExMUkxMUkNYWUxCV1NSU1paU1lNS1paSEhLWUhYS1NNRFNZRFlDSlBCWkJTUUxGQ1hYWE5YS1hXWVdTRFpZUU9HR1FNTVlIQ0RaVFRGSllZQkdTVFRUWUJZS0pESEtZWEJFTEhUWVBKUU5GWEZEWUtaSFFLWkJZSlRaQlhIRkRYS0RBU1dUQVdBSkxEWUpTRkhCTEROTlROUUpUSk5DSFhGSlNSRldIWkZNRFJZSllKV1pQREpLWllKWU1QQ1laTllOWEZCWVRGWUZXWUdEQk5aWlpETllUWFpFTU1RQlNRRUhYRlpNQk1GTFpaU1JYWU1KR1NYV1pKU1BSWURKU0pHWEhKSkdMSkpZTlpaSlhIR1hLWU1MUFlZWUNYWVRXUVpTV0hXTFlSSkxQWFNMU1hNRlNXV0tMQ1ROWE5ZTlBTSlNaSERaRVBUWE1ZWVdYWVlTWVdMWEpRWlFYWkRDTEVFRUxNQ1BKUENMV0JYU1FIRldXVEZGSlROUUpISlFEWEhXTEJZWk5GSkxBTEtZWUpMRFhISFlDU1RZWVdOUkpZWFlXVFJNRFJRSFdRQ01GSkRZWk1ITVlZWEpXTVlaUVpYVExNUlNQV1dDSEFRQlhZR1pZUFhZWVJSQ0xNUFlNR0tTSlNaWVNSTVlKU05YVFBMTkJBUFBZUFlMWFlZWktZTkxEWllKWkNaTk5MTVpISEFSUU1QR1dRVFpNWFhNTExIR0RaWFlIWEtZWFlDSk1GRllZSEpGU0JTU1FMWFhORFlDQU5OTVRDSkNZUFJSTllUWVFOWVlNQk1TWE5ETFlMWVNMSlJMWFlTWFFNTExZWkxaSkpKS1laWkNTRkJaWFhNU1RCSkdOWFlaSExYTk1DV1NDWVpZRlpMWEJSTk5OWUxCTlJUR1pRWVNBVFNXUllIWUpaTVpESFpHWkRXWUJTU0NTS1hTWUhZVFhYR0NRR1haWlNIWVhKU0NSSE1LS0JYQ1pKWUpZTUtRSFpKRk5CSE1RSFlTTkpOWllCS05RTUNMR1FIV0xaTlpTV1hLSExKSFlZQlFMQkZDRFNYRExEU1BGWlBTS0pZWldaWFpERFhKU01NRUdKU0NTU01HQ0xYWEtZWVlMTllQV1dXR1lES1pKR0dHWkdHU1lDS05KV05KUENYQkpKVFFUSldEU1NQSlhaWE5aWFVNRUxQWEZTWFRMTFhDTEpYSkpMSlpYQ1RQU1dYTFlESExZUVJXSFNZQ1NRWVlCWUFZV0pKSlFGV1FDUVFDSlFHWEFMREJaWllKR0tHWFBMVFpZRlhKTFRQQURLWVFIUE1BVExDUERDS0JNVFhZQkhLTEVOWERMRUVHUURZTVNBV0haTUxKVFdZR1hMWVFaTEpFRVlZQlFRRkZOTFlYUkRTQ1RHSkdYWVlOS0xMWVFLQ0NUTEhKTFFNS0taR0NZWUdMTExKRFpHWURIWldYUFlTSkJaS0RaR1laWkhZV1lGUVlUWVpTWllFWlpMWU1ISkpIVFNNUVdZWkxLWVlXWkNTUktRWVRMVERYV0NUWUpLTFdTUVpXQkRDUVlOQ0pTUlNaSkxLQ0RDRFRMWlpaQUNRUVpaRERYWVBMWFpCUUpZTFpMTExRRERaUUpZSllKWllYTllZWU5ZSlhLWERBWldZUkRMSllZWVJKTFhMTERZWEpDWVdZV05RQ0NMREROWVlZTllDS0NaSFhYQ0NMR1pRSkdLV1BQQ1FRSllTQlpaWFlKU1FQWEpQWkJTQkRTRk5TRlBaWEhEV1pURFdQUFRGTFpaQlpETVlZUFFKUlNEWlNRWlNRWEJER0NQWlNXRFdDU1FaR01ESFpYTVdXRllCUERHUEhUTUpUSFpTTU1CR1pNQlpKQ0ZaV0ZaQkJaTVFDRk1CRE1DSlhMR1BOSkJCWEdZSFlZSkdQVFpHWk1RQlFUQ0dZWEpYTFdaS1lEUERZTUdDRlRQRlhZWlRaWERaWFRHS01UWUJCQ0xCSkFTS1lUU1NRWVlNU1pYRkpFV0xYTExTWkJRSkpKQUtMWUxYTFlDQ1RTWE1DV0ZLS0tCU1hMTExMSllYVFlMVEpZWVREUEpITkhOTktCWVFORlFZWVpCWVlFU1NFU1NHRFlIRkhXVENKQlNEWlpURkRNWEhDTkpaWU1RV1NSWUpEWkpRUERRQkJTVEpHR0ZCS0pCWFRHUUhOR1dKWEpHRExMVEhaSEhZWVlZWVlTWFdUWVlZQ0NCREJQWVBaWUNDWllKUFpZV0NCRExGV1pDV0pEWFhIWUhMSFdaWlhKVENaTENEUFhVSkNaWlpMWVhKSlRYUEhGWFdQWVdYWlBURFpaQkRaQ1lISkhNTFhCUVhTQllMUkRUR0pSUkNUVFRIWVRDWldNWEZZVFdXWkNXSldYSllXQ1NLWUJaU0NDVFpRTkhYTldYWEtIS0ZIVFNXT0NDSllCQ01QWlpZS0JOTlpQQlpISFpETFNZRERZVFlGSlBYWU5HRlhCWVFYQ0JIWENQU1hUWVpETUtZU05YU1hMSEtNWlhMWUhESEtXSFhYU1NLUVlISENKWVhHTEhaWENTTkhFS0RUR1pYUVlQS0RIRVhUWUtDTllNWVlZUEtRWVlZS1haTFRISlFUQllRSFhCTVlIU1FDS1dXWUxMSENZWUxOTkVRWFFXTUNGQkRDQ01MSkdHWERRS1RMWEtHTlFDREdaSldZSkpMWUhIUVRUVE5XQ0hNWENYV0hXU1pKWURKQ0NEQlFDREdETllYWlRIQ1FSWENCSFpUUUNCWFdHUVdZWUJYSE1CWU1ZUVRZRVhNUUtZQVFZUkdZWlNMRllLS1FIWVNTUVlTSEpHSkNOWEtaWUNYU0JYWVhIWVlMU1RZQ1hRVEhZU01HU0NQTU1HQ0NDQ0NNVFpUQVNNR1FaSkhLTE9TUVlMU1dUTVhTWVFLRFpMSlFRWVBMU1lDWlRDUVFQQkJRSlpDTFBLSFFaWVlYWERURERUU0pDWEZGTExDSFFYTUpMV0NKQ1hUU1BZQ1hORFRKU0hKV1hEUVFKU0tYWUFNWUxTSkhNTEFMWUtYQ1lZRE1OTURRTVhNQ1pOTkNZQlpLS1lGTE1DSENNTEhYUkNKSkhTWUxOTVRKWkdaR1lXSlhTUlhDV0pHSlFIUVpEUUpEQ0pKWktKS0dEWlFHSkpZSllMWFpYWENEUUhISEVZVE1ITEZTQkRKU1lZU0hGWVNUQ1pRTFBCRFJGUlpUWllLWVdIU1pZUUtXRFFaUktNU1lOQkNSWFFCSllGQVpQWlpFRFpDSllXQkNKV0hZSkJRU1pZV1JZU1pQVERLWlBGUEJOWlRLTFFZSEJCWlBOUFBUWVpaWUJRTllEQ1BKTU1DWUNRTUNZRlpaRENNTkxGUEJQTE5HUUpUQlRUTkpaUFpCQlpOSktMSlFZTE5CWlFIS1NKWk5HR1FTWlpLWVhTSFBaU05CQ0daS0REWlFBTlpISktEUlRMWkxTV0pMSlpMWVdUSk5ESlpKSFhZQVlOQ0JHVFpDU1NRTU5KUEpZVFlTV1haRktXSlFUS0hUWlBMQkhTTkpaU1laQldaWlpaTFNZTFNCSkhEV1dRUFNMTU1GQkpEV0FRWVpUQ0pUQk5OV1pYUVhDRFNMUUdEU0RQRFpISlRRUVBTV0xZWUpaTEdZWFlaTENUQ0JKVEtUWUNaSlRRS0JTSkxHTUdaRE1DU0dQWU5KWllRWVlLTlhSUFdTWlhNVE5DU1paWVhZQllIWVpBWFlXUUNKVExMQ0tKSlRKSEdEWERYWVFZWlpCWVdETFdRQ0dMWkdKR1FSUVpDWlNTQkNSUENTS1lEWk5YSlNRR1hTU0pNWUROU1RaVFBCRExUS1pXWFFXUVRaRVhOUUNaR1dFWktTU0JZQlJUU1NTTENDR0JQU1pRU1pMQ0NHTExMWlhIWlFUSENaTVFHWVpRWk5NQ09DU1pKTU1aU1FQSllHUUxKWUpQUExEWFJHWllYQ0NTWEhTSEdUWk5MWldaS0pDWFRDRkNKWExCTVFCQ1paV1BRRE5IWExKQ1RIWVpMR1lMTkxTWlpQQ1hEU0NRUUhKUUtTWFpQQkFKWUVNU01KVFpEWExDSllSWVlOV0pCTkdaWlRNSlhMVEJTTFlSWlBZTFNTQ05YUEhMTEhZTExRUVpRTFhZTVJTWUNYWkxNTUNaTFRaU0RXVEpKTExOWkdHUVhQRlNLWUdZR0hCRlpQREtNV0dIQ1hNU0dEWEpNQ0paRFlDQUJYSkRMTkJDRFFZR1NLWURRVFhESkpZWE1TWlFBWkRaRlNMUVhZSlNKWllMQlRYWFdYUVFaQkpaVUZCQkxZTFdEU0xKSFhKWVpKV1RESkNaRlFaUVpaRFpTWFpaUUxaQ0RaRkpIWVNQWU1QUVpNTFBQTEZGWEpKTlpaWUxTSkVZUVpGUEZaS1NZV0pKSkhSREpaWlhUWFhHTEdIWURYQ1NLWVNXTU1aQ1dZQkFaQkpLU0hGSEpDWE1IRlFIWVhYWVpGVFNKWVpGWFlYUFpMQ0hNWk1CWEhaWlNYWUZZTU5DV0RBQkFaTFhLVENTSEhYS1hKSlpKU1RIWUdYU1hZWUhISEpXWEtaWFNTQlpaV0hISENXVFpaWlBKWFNOWFFRSkdaWVpZV0xMQ1dYWkZYWFlYWUhYTUtZWVNXU1FNTkxOQVlDWVNQTUpLSFdDUUhZTEFKSk1aWEhNTUNOWkhCSFhDTFhUSlBMVFhZSkhEWVlMVFRYRlNaSFlYWFNKQkpZQVlSU01YWVBMQ0tEVVlITFhSTE5MTFNUWVpZWVFZR1lISFNDQ1NNWkNUWlFYS1lRRlBZWVJQRkZMS1FVTlRTWkxMWk1XV1RDUVFZWldUTExNTE1QV01CWlNTVFpSQlBERFRMUUpKQlhaQ1NSWlFRWUdXQ1NYRldaTFhDQ1JTWkRaTUNZR0dEWlFTR1RKU1dMSk1ZTU1aWUhGQkpER1lYQ0NQU0hYTlpDU0JTSllKR0pNUFBXQUZGWUZOWEhZWlhaWUxSRU1aR1pDWVpTU1pETExKQ1NRRk5YWktQVFhaR1hKSkdGTVlZWVNOQlRZTEJOTEhQRlpEQ1lGQk1HUVJSU1NTWlhZU0dUWlJOWURaWkNER1BKQUZKRlpLTlpCTENaU1pQU0dDWUNKU1pMTUxSU1pCWlpMRExTTExZU1hTUVpRTFlYWkxTS0tCUlhCUkJaQ1lDWFpaWkVFWUZHS0xaTFlZSEdaU0daTEZKSEdUR1dLUkFBSllaS1pRVFNTSEpKWERDWVpVWUpMWllSWkRRUUhHSlpYU1NaQllLSlBCRlJUSlhMTEZRV0pIWUxRVFlNQkxQWkRYVFpZR0JESFpaUkJHWEhXTkpUSlhMS1NDRlNNV0xTRFFZU0pUWEtaU0NGV0pMQlhGVFpMTEpaTExRQkxTUU1RUUNHQ1pGUEJQSFpDWkpMUFlZR0dEVEdXRENGQ1pRWVlZUVlTU0NMWFpTS0xaWlpHRkZDUU5XR0xIUVlaSkpDWkxRWlpZSlBKWlpCUERDQ01ISkdYRFFER0RMWlFNRkdQU1lUU0RZRldXREpaSllTWFlZQ1pDWUhaV1BCWUtYUllMWUJIS0pLU0ZYVFpKTU1DS0hMTFROWVlNU1lYWVpQWUpRWUNTWUNXTVRKSktRWVJITExRWFBTR1RMWVlDTEpTQ1BYSllaRk5NTFJHSkpUWVpCWFlaTVNKWUpISEZaUU1TWVhSU1pDV1RMUlRRWlNTVEtYR1FLR1NQVEdDWk5KU0pDUUNYSE1YR0daVFFZREpLWkRMQlpTWEpMSFlRR0dHVEhRU1pQWUhKSEhHWVlHS0dHQ1dKWlpZTENaTFhRU0ZUR1pTTExMTUxKU0tDVEJMTFpaU1pNTU5ZVFBaU1hRSEpDSllRWFlaWFpRWkNQU0hLWlpZU1hDREZHTVdRUkxMUVhSRlpUTFlTVENUTUpDWEpKWEhKTlhUTlJaVFpGUVlIUUdMTEdDWFNaU0pESkxKQ1lEU0pUTE5ZWEhTWlhDR0paWVFQWUxGSERKU0JQQ0NaSEpKSlFaSlFEWUJTU0xMQ01ZVFRNUVRCSEpRTk5ZR0tZUlFZUU1aR0NKS1BEQ0dNWVpIUUxMU0xMQ0xNSE9MWkdEWVlGWlNMSkNRWkxZTFpRSkVTSE5ZTExKWEdKWExZU1lZWVhOQlpMSlNTWkNRUUNKWUxMWkxUSllMTFpMTEJOWUxHUUNIWFlZWE9YQ1hRS1lKWFhYWUtMWFNYWFlRWENZS1FYUUNTR1lYWFlRWFlHWVRRT0hYSFhQWVhYWFVMQ1lFWUNIWlpDQldRQkJXSlFaU0NTWlNTTFpZTEtERVNKWldNWU1DWVRTRFNYWFNDSlBRUVNRWUxZWVpZQ01ESkRaWVdDQlRKU1lESktDWURESkxCREpKU09EWllTWVhRUVlYREhIR1FRWVFIRFlYV0dNTU1BSkRZQkJCUFBCQ01VVVBMSlpTTVRYRVJYSk1IUU5VVFBKRENCU1NNU1NTVEtKVFNTTU1UUkNQTFpTWk1MUURTRE1KTVFQTlFEWENGWU5CRlNEUVhZWEhZQVlLUVlERExRWVlZU1NaQllEU0xOVEZRVFpRUFpNQ0hESENaQ1dGRFhUTVlRU1BIUVlZWFNSR0pDV1RKVFpaUU1HV0pKVEpIVFFKQkJIV1pQWFhIWVFGWFhRWVdZWUhZU0NEWURISFFNTk1UTVdDUEJTWlBQWlpHTE1aRk9MTENGV0hNTVNKWlRUREhaWllGRllUWlpHWllTS1lKWFFZSlpRQkhNQlpaTFlHSEdGTVNIUFpGWlNOQ0xQQlFTTkpYWlNMWFhGUE1UWUpZR0JYTExETFhQWkpZWkpZSEhaQ1lXSEpZTFNKRVhGU1paWVdYS1pKTFVZRFRNTFlNUUpQV1hZSFhTS1RRSkVaUlBYWFpISE1IV1FQV1FMWUpKUUpKWlNaQ1BISkxDSEhOWEpMUVdaSkhCTVpZWEJESEhZUFpMSExITEdGV0xDSFlZVExISlhDSk1TQ1BYU1RLUE5IUVhTUlRZWFhURVNZSkNUTFNTTFNURExMTFdXWUhESFJKWlNGR1hUU1lDWllOWUhUREhXSlNMSFRaRFFESlpYWFFIR1lMVFpQSENTUUZDTE5KVENMWlBGU1RQRFlOWUxHTUpMTFlDUUhZU1NIQ0hZTEhRWVFUTVpZUEJZV1JGUVlLUVNZU0xaRFFKTVBYWVlTU1JIWkpOWVdUUURGWkJXV1RXV1JYQ1dIR1lIWE1LTVlZWVFNU01aSE5HQ0VQTUxRUU1UQ1dDVE1NUFhKUEpKSEZYWVlaU1haSFRZQk1TVFNZSlRUUVFRWVlMSFlOUFlRWkxDWVpIWldTTVlMS0ZKWExXR1hZUEpZVFlTWVhZTVpDS1RUV0xLU01aU1lMTVBXTFpXWFdRWlNTQVFTWVhZUkhTU05UU1JBUFhDUFdDTUdEWEhYWkRaWUZKSEdaVFRTQkpIR1laU1pZU01ZQ0xMTFhCVFlYSEJCWkpLU1NETUFMWEhZQ0ZZR01RWVBKWUNRWEpMTExKR1NMWkdRTFlDSkNDWk9UWVhNVE1UVExMV1RHUFhZTVpNS0xQU1paWlhIS1FZU1hDVFlKWllIWFNIWVhaS1hMWldQU1FQWUhKV1BKUFdYUVFZTFhTREhNUlNMWlpZWldUVENZWFlTWlpTSEJTQ0NTVFBMV1NTQ0pDSE5MQ0dDSFNTUEhZTEhGSEhYSlNYWUxMTllMU1pESFpYWUxTWExXWllLQ0xEWUFYWkNNRERZU1BKVFFKWkxOV1FQU1NTV0NUU1RTWkxCTE5YU01OWVlNSlFCUUhSWldUWVlEQ0hRTFhLUFpXQkdRWUJLRkNNWldQWkxMWVlMU1pZRFdIWFBTQkNNTEpCU0NHQkhYTFFIWVJMSlhZU1dYV1haU0xERkhMU0xZTkpMWllGTFlKWUNEUkpMRlNZWkZTTExDUVlRRkdKWUhZWFpMWUxNU1RESkNZSEJaTExOV0xYWFlHWVlIU01HREhYWEhITFpaSlpYQ1paWkNZUVpGTkdXUFlMQ1BLUFlZUE1DTFFLREdYWkdHV1FCRFhaWktaRkJYWExaWEpUUEpQVFRCWVRTWlpEV1NMQ0haSFNMVFlYSFFMSFlYWFhZWVpZU1dUWFpLSExYWlhaUFlIR0NIS0NGU1lIVVRKUkxYRkpYUFRaVFdIUExZWEZDUkhYU0hYS1lYWFlIWlFEWFFXVUxIWUhNSlRCRkxLSFRYQ1dISkZXSkNGUFFSWVFYQ1lZWVFZR1JQWVdTR1NVTkdXQ0hLWkRYWUZMWFhISkpCWVpXVFNYWE5DWUpKWU1TV1pKUVJNSFhaV0ZRU1lMWkpaR0JIWU5TTEJHVFRDU1lCWVhYV1hZSFhZWVhOU1FZWE1RWVdSR1lRTFhCQlpMSlNZTFBTWVRKWllIWVpBV0xST1JKTUtTQ1pKWFhYWVhDSERZWFJZWFhKRFRTUUZYTFlMVFNGRllYTE1UWUpNSlVZWVlYTFRaQ1NYUVpRSFpYTFlZWFpIRE5CUlhYWEpDVFlITEJSTE1CUkxMQVhLWUxMTEpMWVhYTFlDUllMQ0pUR0pDTVRMWkxMQ1laWlBaUENZQVdISkpGWUJEWVlaU01QQ0taRFFZUVBCUENKUERDWVpNRFBCQ1lZRFlDTk5QTE1UTUxSTUZNTUdXWVpCU0pHWUdTTVpRUVFaVFhNS1FXR1hMTFBKR1pCUUNESkpKRlBLSktDWEJMSk1TV01EVFFKWExETFBQQlhDV1JDUUZCRlFKQ1pBSFpHTVlLUEhZWUhaWUtOREtaTUJQSllYUFhZSExGUE5ZWUdYSkRCS1hOWEhKTVpKWFNUUlNUTERYU0taWVNZQlpYSkxYWVNMQlpZU0xIWEpQRlhQUU5CWUxMSlFLWUdaTUNZWlpZTUNDU0xDTEhaRldGV1lYWk1XU1hUWU5YSkhQWVlNQ1lTUE1IWVNNWURZU0hRWVpDSE1KSk1aQ0FBR0NGSkJCSFBMWVpZTFhYU0RKR1hESEtYWFRYWE5CSFJNTFlKU0xUWE1SSE5MWFFKWFlaTExZU1dRR0RMQkpIRENHSllRWUNNSFdGTUpZQk1CWUpZSldZTURQV0hYUUxEWUdQREZYWEJDR0pTUENLUlNTWVpKTVNMQlpaSkZMSkpKTEdYWkdZWFlYTFNaUVlYQkVYWVhIR0NYQlBMRFlIV0VUVFdXQ0pNQlRYQ0hYWVFYTExYRkxZWExMSkxTU0ZXRFBaU01ZSkNMTVdZVENaUENIUUVLQ1FCV0xDUVlEUExRUFBRWlFGSlFESkhZTU1DWFRYRFJNSldSSFhDSlpZTFFYRFlZTkhZWUhSU0xTUlNZV1daSllNVExUTExHVFFDSlpZQUJUQ0taQ0pZQ0NRTEpaUVhBTE1aWUhZV0xXRFhaWFFETExRU0hHUEpGSkxKSEpBQkNRWkRKR1RLSFNTVENZSkxQU1daTFhaWFJXR0xETFpSTFpYVEdTTExMTFpMWVhYV0dEWllHQkRQSFpQQlJMV1NYUUJQRkRXT0ZNV0hMWVBDQkpDQ0xETUJaUEJaWkxDWVFYTERPTVpCTFpXUERXWVlHRFNUVEhDU1FTQ0NSU1NTWVNMRllCRk5UWUpTWkRGTkRQREhEWlpNQkJMU0xDTVlGRkdUSkpRV0ZUTVRQSldGTkxCWkNNTUpUR0JEWkxRTFBZRkhZWU1KWUxTRENIRFpKV0pDQ1RMSkNMRFRMSkpDUEREU1FEU1NaWUJOREJKTEdHSlpYU1hOTFlDWUJKWFFZQ0JZTFpDRlpQUEdLQ1haRFpGWlRKSkZKU0pYWkJOWllKUVRUWUpZSFRZQ1pIWU1ESlhUVE1QWFNQTFpDRFdTTFNIWFlQWkdURk1MQ0pUWUNCUE1HREtXWUNZWkNEU1paWUhGTFlDVFlHV0hLSllZTFNKQ1hHWVdKQ0JMTENTTkREQlRaQlNDTFlaQ1paU1NRRExMTVFZWUhGU0xRTExYRlRZSEFCWEdXTllXWVlQTExTRExETExCSkNZWEpaTUxITEpEWFlZUVlURExMTEJVR0JGREZCQlFKWlpNRFBKSEdDTEdNSkpQR0FFSEhCV0NRWEFYSEhIWkNIWFlQSEpBWEhMUEhKUEdQWkpRQ1FaR0pKWlpVWkRNUVlZQlpaUEhZSFlCV0hBWllKSFlLRkdEUEZRU0RMWk1MSlhLWEdBTFhaREFHTE1ER1hNV1pRWVhYRFhYUEZETU1TU1lNUEZNRE1NS1hLU1laWVNIRFpLWFNZU01NWlpaTVNZRE5aWkNaWEZQTFNUTVpETk1YQ0tKTVpUWVlNWk1aWk1TWEhIRENaSkVNWFhLTEpTVExXTFNRTFlKWkxMWkpTU0RQUE1ITkxaSkNaWUhNWFhIR1pDSk1ESFhUS0dSTVhGV01DR01XS0RUS1NYUU1NTUZaWllES01TQ0xDTVBDR01IU1BYUVBaRFNTTENYS1lYVFdMV0pZQUhaSkdaUU1DU05YWVlNTVBNTEtKWE1ITE1MUU1YQ1RLWk1KUVlTWkpTWVNaSFNZSlpKQ0RBSlpZQlNEUUpaR1daUVFYRktETVNESkxGV0VIS1pRS0pQRVlQWllTWkNEV1lKRkZNWlpZTFRURFpaRUZNWkxCTlBQTFBMUEVQU1pBTExUWUxLQ0tRWktHRU5RTFdBR1lYWURQWExIU1hRUVdRQ1FYUUNMSFlYWE1MWUNDV0xZTVFZU0tHQ0hMQ0pOU1pLUFlaS0NRWlFMSlBETURaSExBU1hMQllEV1FMV0ROQlFDUllERFpUSllCS0JXU1pEWERUTlBKRFRDVFFERlhRUU1HTlhFQ0xUVEJLUFdTTENUWVFMUFdZWlpLTFBZR1pDUVFQTExLQ0NZTFBRTVpDWlFDTEpTTFFaREpYTERESFBaUURMSkpYWlFEWFlaUUtaTEpDWVFEWUpQUFlQUVlLSllSTVBDQllNQ1hLTExaTExGUVBZTExMTUJTR0xDWVNTTFJTWVNRVE1YWVhaUVpGRFpVWVNZWlRGRk1aWlNNWlFIWlNTQ0NNTFlYV1RQWkdYWkpHWkdTSlNHS0RESFRRR0daTExCSkRaTENCQ0hZWFlaSFpGWVdYWVpZTVNEQlpaWUpHVFNNVEZYUVlYUVNUREdTTE5YRExSWVpaTFJZWUxYUUhUWFNSVFpOR1pYQk5RUVpGTVlLTVpKQlpZTUtCUE5MWVpQQkxNQ05RWVpaWlNKWkhKQ1RaS0hZWlpKUkRZWkhOUFhHTEZaVExLR0pUQ1RTU1lMTEdaUlpCQlFaWktMUEtMQ1pZU1NVWVhCSkZQTkpaWlhDRFdYWllKWFpaREpKS0dHUlNSSktNU01aSkxTSllXUVNLWUhRSlNYUEpaWlpMU05TSFJOWVBaVFdDSEtMUFNSWkxaWFlKUVhRS1lTSllDWlRMUVpZQkJZQldaUFFEV1dZWkNZVEpDSlhDS0NXREtLWlhTR0tEWlhXV1lZSlFZWVRDWVRETExYV0tDWktLTENDTFpDUVFEWkxRTENTRlFDSFFIU0ZTTVFaWkxOQkpKWkJTSkhUU1pEWVNKUUpQRExaQ0RDV0pLSlpaTFBZQ0dNWldESkpCU0pRWlNZWllISFhKUEJKWURTU1hEWk5DR0xRTUJUU0ZTQlBEWkRMWk5GR0ZKR0ZTTVBYSlFMTUJMR1FDWVlYQlFLREpKUVlSRktaVEpESENaS0xCU0RaQ0ZKVFBMTEpHWEhZWFpDU1NaWlhTVEpZR0tHQ0tHWU9RWEpQTFpQQlBHVEdZSlpHSFpRWlpMQkpMU1FGWkdLUVFKWkdZQ1pCWlFUTERYUkpYQlNYWFBaWEhZWllDTFdEWEpKSFhNRkRaUEZaSFFIUU1RR0tTTFlIVFlDR0ZSWkdOUVhDTFBETEJaQ1NDWlFMTEpCTEhCWkNZUFpaUFBEWU1aWlNHWUhDS0NQWkpHU0xKTE5TQ0RTTERMWEJNU1RMRERGSk1LREpESFpMWlhMU1pRUFFQR0pMTFlCRFNaR1FMQlpMU0xLWVlIWlRUTlRKWVFUWlpQU1pRWlRMTEpUWVlMTFFMTFFZWlFMQkRaTFNMWVlaWU1ERlNaU05ITFhaTkNaUVpQQldTS1JGQlNZWk1USEJMR0pQTUNaWkxTVExYU0hUQ1NZWkxaQkxGRVFITFhGTENKTFlMSlFDQlpMWkpISFNTVEJSTUhYWkhKWkNMWEZOQkdYR1RRSkNaVE1TRlpLSk1TU05YTEpLQkhTSlhOVE5MWkROVExNU0pYR1pKWUpDWlhZSllKV1JXV1FOWlRORkpTWlBaU0haSkZZUkRKU0ZTWkpaQkpGWlFaWkhaTFhGWVNCWlFMWlNHWUZUWkRDU1pYWkpCUU1TWktKUkhZSlpDS01KS0hDSEdUWEtYUUdMWFBYRlhUUlRZTFhKWEhEVFNKWEhKWkpYWldaTENRU0JUWFdYR1hUWFhIWEZUU0RLRkpIWllKRkpYUlpTRExMTFRRU1FRWlFXWlhTWVFUV0dXQlpDR1pMTFlaQkNMTVFRVFpIWlhaWExKRlJNWVpGTFhZU1FYWEpLWFJNUURaRE1NWVlCU1FCSEdaTVdGV1hHTVhMWlBZWVRHWllDQ0RYWVpYWVdHU1lKWVpOQkhQWkpTUVNZWFNYUlRGWVpHUkhaVFhTWlpUSENCRkNMU1lYWkxaUU1aTE1QTE1YWkpYU0ZMQllaTVlRSFhKU1hSWFNRWlpaU1NMWUZSQ1pKUkNSWEhIWlhRWURZSFhTSkpIWkNYWkJUWU5TWVNYSkJRTFBYWlFQWU1MWFpLWVhMWENKTENZU1hYWlpMWERMTExKSllIWlhHWUpXS0pSV1lIQ1BTR05SWkxGWldGWlpOU1hHWEZMWlNYWlpaQkZDU1lKREJSSktSREhIR1hKTEpKVEdYSlhYU1RKVEpYTFlYUUZDU0dTV01TQkNUTFFaWldMWlpLWEpNTFRNSllIU0REQlhHWkhETEJNWUpGUlpGU0dDTFlKQlBNTFlTTVNYTFNaSlFRSEpaRlhHRlFGUUJQWFpHWVlRWEdaVENRV1lMVExHV1NHV0hSTEZTRkdaSk1HTUdCR1RKRlNZWlpHWllaQUZMU1NQTUxQRkxDV0JKWkNMSkpNWkxQSkpMWU1RRE1ZWVlGQkdZR1laTUxZWkRYUVlYUlFRUUhTWVlZUVhZTEpUWVhGU0ZTTExHTlFDWUhZQ1dGSENDQ0ZYUFlMWVBMTFpZWFhYWFhLUUhIWFNISlpDRlpTQ1pKWENQWldISEhISEFQWUxRQUxQUUFGWUhYRFlMVUtNWlFHR0dEREVTUk5OWkxUWkdDSFlQUFlTUUpKSENMTEpUT0xOSlBaTEpMSFlNSEVZRFlEU1FZQ0RESEdaVU5EWkNMWllaTExaTlROWVpHU0xIU0xQSkpCREdXWFBDRFVUSkNLTEtDTFdLTExDQVNTVEtaWkROUU5UVExZWVpTU1lTU1paUllMSlFLQ1FESEhDUlhSWllER1JHQ1dDR1pRRkZGUFBKRlpZTkFLUkdZV1lRUFFYWEZLSlRTWlpYU1daRERGQkJYVEJHVFpLWk5QWlpQWlhaUEpTWkJNUUhLQ1lYWUxES0xKTllQS1lHSEdEWkpYWEVBSFBOWktaVFpDTVhDWE1NSlhOS1NaUU5NTkxXQldXWEpLWUhDUFNUTUNTUVRaSllYVFBDVFBEVE5OUEdMTExaU0pMU1BCTFBMUUhEVE5KTkxZWVJTWkZGSkZRV0RQSFpEV01SWkNDTE9EQVhOU1NOWVpSRVNUWUpXSllKREJDRlhOTVdUVEJZTFdTVFNaR1lCTEpQWEdMQk9DTEhQQ0JKTFRNWFpMSllMWlhDTFRQTkNMQ0tYVFBaSlNXQ1lYU0ZZU1pES05UTEJZSkNZSkxMU1RHUUNCWFJZWlhCWEtMWUxIWkxRWkxOWkNYV0paTEpaSk5DSkhYTU5aWkdKWlpYVFpKWFlDWVlDWFhKWVlYSkpYU1NTSlNUU1NUVFBQR1FUQ1NYV1pEQ1NZRlBURkJGSEZCQkxaSkNMWlpEQlhHQ1hMUVBYS0ZaRkxTWUxUVVdCTVFKSFNaQk1EREJDWVNDQ0xEWFlDRERRTFlKSldNUUxMQ1NHTEpKU1lGUFlZQ0NZTFRKQU5USkpQV1lDTU1HUVlZU1hEWFFNWkhTWlhQRlRXV1pRU1dRUkZLSkxaSlFRWUZCUlhKSEhGV0pKWllRQVpNWUZSSENZWUJZUVdMUEVYQ0NaU1RZUkxUVERNUUxZS01CQkdNWVlKUFJLWk5QQlNYWVhCSFlaREpETkdIUE1GU0dNV0ZaTUZRTU1CQ01aWkNKSkxDTlVYWVFMTUxSWUdRWkNZWFpMV0pHQ0pDR0dNQ0pORllaWkpIWUNQUlJDTVRaUVpYSEZRR1RKWENDSkVBUUNSSllIUExRTFNaREpSQkNRSFFEWVJIWUxZWEpTWU1IWllEV0xERlJZSEJQWURUU1NDTldCWEdMUFpNTFpaVFFTU0NQSk1YWFlDU0pZVFlDR0hZQ0pXWVJYWExGRU1XSk5NS0xMU1dUWEhZWVlOQ01NQ1dKRFFESlpHTExKV0pSS0hQWkdHRkxDQ1NDWk1DQkxUQkhCUUpYUURTUERKWlpHS0dMRlFZV0JaWVpKTFRTVERIUUhDVENCQ0hGTFFNUFdEU0hZWVRRV0NOWlpKVExCWU1CUERZWVlYU1FLWFdZWUZMWFhOQ1dDWFlQTUFFTFlLS0pNWlpaQlJYWVlRSkZMSlBGSEhIWVRaWlhTR1FRTUhTUEdEWlFXQldQSkhaSkRZU0NRV1pLVFhYU1FMWllZTVlTRFpHUlhDS0tVSkxXUFlTWVNDU1laTFJNTFFTWUxKWEJDWFRMV0RRWlBDWUNZS1BQUE5TWEZZWkpKUkNFTUhTWk1TWExYR0xSV0dDU1RMUlNYQlpHQlpHWlRDUExVSkxTTFlMWU1UWE1UWlBBTFpYUFhKVEpXVENZWVpMQkxYQlpMUU1ZTFhQR0hEU0xTU0RNWE1CRFpaU1hXSEFNTENaQ1BKTUNOSEpZU05TWUdDSFNLUU1aWlFETExLQUJMV0pYU0ZNT0NEWEpSUkxZUVpLSk1ZQllRTFlIRVRGSlpGUkZLU1JZWEZKVFdEU1hYU1lTUUpZU0xZWFdKSFNOTFhZWVhIQkhBV0hISlpYV01ZTEpDU1NMS1lEWlRYQlpTWUZEWEdYWkpLSFNYWFlCU1NYRFBZTlpXUlBUUVpDWkVOWUdDWFFGSllLSkJaTUxKQ01RUVhVT1hTTFlYWExZTExKRFpCVFlNSFBGU1RUUVFXTEhPS1lCTFpaQUxaWFFMSFpXUlJRSExTVE1ZUFlYSkpYTVFTSkZOQlhZWFlKWFhZUVlMVEhZTFFZRk1MS0xKVE1MTEhTWldLWkhMSk1MSExKS0xKU1RMUVhZTE1CSEhMTkxaWFFKSFhDRlhYTEhZSEpKR0JZWlpLQlhTQ1FESlFEU1VKWllZSFpISE1HU1hDU1lNWEZFQkNRV1dSQlBZWUpRVFlaQ1lRWVFRWllITVdGRkhHWkZSSkZDRFBYTlRRWVpQRFlLSEpMRlJaWFBQWFpEQkJHWlFTVExHREdZTENRTUxDSEhNRllXTFpZWEtKTFlQUUhTWVdNUVFHUVpNTFpKTlNRWEpRU1lKWUNCRUhTWEZTWlBYWldGTExCQ1lZSkRZVERUSFdaU0ZKTVFRWUpMTVFYWExMRFRUS0hIWUJGUFdUWVlTUVFXTlFXTEdXREVCWldDTVlHQ1VMS0pYVE1YTVlKU1hIWUJSV0ZZTVdGUlhZUU1YWVNaVFpaVEZZS01MREhRRFhXWVlOTENSWUpCTFBTWENYWVdMU1BSUkpXWEhRWVBIVFlETlhISE1NWVdZVFpDU1FNVFNTQ0NEQUxXWlRDUFFQWUpMTFFaWUpTV1hNWlpNTVlMTVhDTE1YQ1pNWE1aU1FUWlBQUVFCTFBHWFFaSEZMSkpIWVRKU1JYV1pYU0NDRExYVFlKRENRSlhTTFFZQ0xaWExaWlhNWFFSSk1IUkhaSkJITUZMSkxNTENMUU5MRFhaTExMUFlQU1lKWVNYQ1FRRENNUUpaWlhITlBOWFpNRUtNWEhZS1lRTFhTWFRYSllZSFdEQ1dEWkhRWVlCR1lCQ1lTQ0ZHUFNKTlpEWVpaSlpYUlpSUUpKWU1DQU5ZUkpUTERQUFlaQlNUSktYWFpZUEZEV0ZHWlpSUFlNVE5HWFpRQllYTkJVRk5RS1JKUVpNSkVHUlpHWUNMS1haRFNLS05TWEtDTEpTUEpZWVpMUVFKWUJaU1NRTExMS0pYVEJLVFlMQ0NEREJMU1BQRllMR1lEVFpKWVFHR0tRVFRGWlhCREtUWVlIWUJCRllUWVlCQ0xQRFlUR0RIUllSTkpTUFRDU05ZSlFIS0xMTFpTTFlEWFhXQkNKUVNQWEJQSlpKQ0pEWkZGWFhCUk1MQVpIQ1NORExCSkRTWkJMUFJaVFNXU0JYQkNMTFhYTFpESlpTSlBZTFlYWFlGVEZGRkJISkpYR0JZWEpQTU1NUFNTSlpKTVRMWVpKWFNXWFRZTEVEUVBKTVlHUVpKR0RKTFFKV0pRTExTSkdKR1lHTVNDTEpKWERUWUdKUUpRSkNKWkNKR0RaWlNYUUdTSkdHQ1hIUVhTTlFMWlpCWEhTR1pYQ1hZTEpYWVhZWURGUVFKSEpGWERIQ1RYSllSWFlTUVRKWFlFRllZU1NZWUpYTkNZWlhGWE1TWVNaWFlZU0NIU0hYWlpaR1paWkdGSkRMVFlMTlBaR1lKWVpZWVFaUEJYUUJEWlRaQ1pZWFhZSEhTUVhTSERIR1FISkhHWVdTWlRNWk1MSFlYR0VCVFlMWktRV1lUSlpSQ0xFS1lTVERCQ1lLUVFTQVlYQ0pYV1dHU0JISllaWURIQ1NKS1FDWFNXWEZMVFlOWVpQWkNDWkpRVFpXSlFEWlpaUVpMSkpYTFNCSFBZWFhQU1hTSEhFWlRYRlBUTFFZWlpYSFlUWE5DRlpZWUhYR05YTVlXWFRaU0pQVEhIR1lNWE1YUVpYVFNCQ1pZSllYWFRZWVpZUENRTE1NU1pNSlpaTExaWEdYWkFBSlpZWEpNWlhXRFhaU1haRFpYTEVZSkpaUUJIWldaWlpRVFpQU1haVERTWEpKSlpOWUFaUEhYWVlTUk5RRFRIWkhZWUtZSkhEWlhaTFNXQ0xZQlpZRUNXQ1lDUllMQ1hOSFpZRFpZRFlKREZSSkpIVFJTUVRYWVhKUkpIT0pZTlhFTFhTRlNGSlpHSFBaU1haU1pEWkNRWkJZWUtMU0dTSkhDWlNIREdRR1hZWkdYQ0hYWkpXWVFXR1lIS1NTRVFaWk5EWkZLV1lTU1RDTFpTVFNZTUNESEpYWFlXRVlYQ1pBWURNUFhNRFNYWUJTUU1KTVpKTVRaUUxQSllRWkNHUUhYSkhITFhYSExIRExESlFDTERXQlNYRlpaWVlTQ0hUWVRZWUJIRUNYSFlLR0pQWEhIWVpKRlhIV0hCRFpGWVpCQ0FQTlBHTllETVNYSE1NTU1BTVlOQllKVE1QWFlZTUNUSEpCWllGQ0dUWUhXUEhGVFdaWkVaU0JaRUdQRk1UU0tGVFlDTUhGTExIR1BaSlhaSkdaSllYWlNCQlFTQ1paTFpDQ1NUUEdYTUpTRlRDQ1pKWkRKWENZQlpMRkNKU1laRkdTWkxZQkNXWlpCWVpEWllQU1dZSlpYWkJEU1lVWExaWkJaRllHQ1pYQlpIWkZUUEJHWkdFSkJTVEdLRE1GSFlaWkpIWkxMWlpHSlFaTFNGREpTU0NCWkdQRExGWkZaU1pZWllaU1lHQ1hTTlhYQ0hDWlhUWlpMSkZaR1FTUVlYWkpRRENDWlRRQ0RYWkpZUUpRQ0hYWlRETEdTQ1haU1lRSlFUWldMUURRWlRRQ0hRUUpaWUVaWlpQQldLREpGQ0pQWlRZUFFZUVRUWU5MTUJES1RKWlBRWlFaWkZQWlNCTkpMR1lKRFhKRFpaS1pHUUtYRExQWkpUQ0pEUUJYREpRSlNUQ0tOWEJYWk1TTFlKQ1FNVEpRV1dDSlFOSk5MTExISkNXUVRCWlFZRFpDWlBaWkRaWUREQ1laWlpDQ0pUVEpGWkRQUlJUWlRKRENRVFFaRFRKTlBMWkJDTExDVFpTWEtKWlFaUFpMQlpSQlRKRENYRkNaREJDQ0pKTFRRUVBMRENHWkRCQlpKQ1FEQ0pXWU5MTFpZWkNDRFdMTFhXWkxYUlhOVFFRQ1pYS1FMU0dERlFURERHTFJMQUpKVEtVWU1LUUxMVFpZVERZWUNaR0pXWVhEWEZSU0tTVFFURU5RTVJLUVpISFFLRExEQVpGS1lQQkdHUFpSRUJaWllLWlpTUEVHSlhHWUtRWlpaU0xZU1lZWVpXRlFaWUxaWkxaSFdDSEtZUFFHTlBHQkxQTFJSSllYQ0NTWVlIU0ZaRllCWllZVEdaWFlMWENaV1hYWkpaQkxGRkxHU0tIWUpaRVlKSExQTExMTENaR1hEUlpFTFJIR0tMWlpZSFpMWVFTWlpKWlFMSlpGTE5CSEdXTENaQ0ZKWVNQWVhaTFpMWEdDQ1BaQkxMQ1lCQkJCVUJCQ0JQQ1JOTlpDWllSQkZTUkxEQ0dRWVlRWFlHTVFaV1RaWVRZSlhZRldURUhaWkpZV0xDQ05UWllKSlpERURQWkRaVFNZUUpIRFlNQkpOWUpaTFhUU1NUUEhOREpYWEJZWFFUWlFERFRKVERZWVRHV1NDU1pRRkxTSExHTEJDWlBIRExZWkpZQ0tXVFlUWUxCTllUU0RTWUNDVFlTWllZRUJIRVhIUURUV05ZR1lDTFhUU1pZU1RRTVlHWkFaQ0NTWlpEU0xaQ0xaUlFYWVlFTEpTQllNWFNYWlRFTUJCTExZWUxMWVREUVlTSFlNUlFXS0ZLQkZYTlhTQllDSFhCV0pZSFRRQlBCU0JXRFpZTEtHWlNLWUhYUVpKWEhYSlhHTkxKS1pMWVlDRFhMRllGR0hMSkdKWUJYUUxZQlhRUFFHWlRaUExOQ1lQWERKWVFZRFlNUkJFU0pZWUhLWFhTVE1YUkNaWllXWFlRWUJNQ0xMWVpIUVlaV1FYREJYQlpXWk1TTFBETVlTS0ZNWktMWkNZUVlDWkxRWEZaWllEUVpQWllHWUpZWk1aWERaRllGWVRUUVRaSEdTUENaTUxDQ1lUWlhKQ1lUSk1LU0xQWkhZU05aTExZVFBaQ1RaWkNLVFhESFhYVFFDWUZLU01RQ0NZWUFaSFRKUENZTFpMWUpCSlhUUE5ZTEpZWU5SWFNZTE1NTlhKU01ZQkNTWVNZTFpZTFhKSlFZTERaTFBRQkZaWkJMRk5EWFFLQ1pGWVdIR1FNUkRTWFlDWVRYTlFRSlpZWVBGWlhEWVpGUFJYRUpER1lRQlhSQ05GWVlRUEdIWUpEWVpYR1JIVEtZTE5XRFpOVFNNUEtMQlRIQlBZU1pCWlRKWlNaWkpUWVlYWlBIU1NaWkJaQ1pQVFFGWk1ZRkxZUFlCQkpRWFpNWFhESk1UU1lTS0tCSlpYSEpDS0xQU01LWUpaQ1hUTUxKWVhSWlpRU0xYWFFQWVpYTUtZWFhYSkNMSlBSTVlZR0FEWVNLUUxTTkRIWVpLUVhaWVpUQ0dIWlRMTUxXWllCV1NZQ1RCSEpISkZDV1pUWFdZVEtaTFhRU0hMWUpaSlhUTVBMUFlDR0xUQlpaVExaSkNZSkdEVENMS0xQTExRUEpNWlBBUFhZWkxLS1RLRFpDWlpCTlpEWURZUVpKWUpHTUNUWExUR1hTWkxNTEhCR0xLRldOV1pIRFhVSExGTUtZU0xHWERUV1dGUkpFSlpUWkhZRFhZS1NIV0ZaQ1FTSEtUTVFRSFRaSFlNSkRKU0tIWFpKWkJaWlhZTVBBR1FNU1RQWExTS0xaWU5XUlRTUUxTWkJQU1BTR1pXWUhUTEtTU1NXSFpaTFlZVE5YSkdNSlNaU1VGV05MU09aVFhHWExTQU1NTEJXTERTWllMQUtRQ1FDVE1ZQ0ZKQlNMWENMWlpDTFhYS1NCWlFDTEhKUFNRUExTWFhDS1NMTkhQU0ZRUVlUWFlKWkxRTERYWlFKWkRZWURKTlpQVFVaRFNLSkZTTEpIWUxaU1FaTEJUWFlER1RRRkRCWUFaWERaSFpKTkhIUUJZS05YSkpRQ1pNTExKWktTUExEWUNMQkJMWEtMRUxYSkxCUVlDWEpYR0NOTENRUExaTFpZSlRaTEpHWVpEWlBMVFFDU1hGRE1OWUNYR0JUSkRDWk5CR0JRWVFKV0dLRkhUTlBZUVpRR0JLUEJCWVpNVEpEWVRCTFNRTVBTWFRCTlBEWEtMRU1ZWUNKWU5aQ1RMRFlLWlpYRERYSFFTSERHTVpTSllDQ1RBWVJaTFBZTFRMS1hTTFpDR0dFWENMRlhMS0pSVExRSkFRWk5DTUJZREtLQ1hHTENaSlpYSkhQVERKSk1aUVlLUVNFQ1FaRFNISEFETUxaRk1NWkJHTlRKTk5MR0JZSkJSQlRNTEJZSkRaWExDSkxQTERMUENRREhMWFpMWUNCTENYWlpKQURKTE5aTU1TU1NNWUJIQlNRS0JIUlNYWEpNWFNEWk5aUFhMR0JSSFdHR0ZDWEdNU0tMTFRTSllZQ1FMVFNLWVdZWUhZV1hCWFFZV1BZV1lLUUxTUVBUTlRLSFFDV0RRS1RXUFhYSENQVEhUV1VNU1NZSEJXQ1JXWEhKTUtNWk5HV1RNTEtGR0hLSllMU1lZQ1hXSFlFQ0xRSEtRSFRUUUtIRlpMRFhRV1laWVlERVNCUEtZUlpQSkZZWVpKQ0VRRFpaRExBVFpCQkZKTExDWERMTUpTU1hFR1lHU0pRWENXQlhTU1pQRFlaQ1hETllYUFBaWURMWUpDWlBMVFhMU1hZWllSWENZWVlEWUxXV05aU0FISlNZUVlIR1lXV0FYVEpaREFYWVNSTFREUFNTWVlGTkVKRFhZWkhMWExMTFpRWlNKTllRWVFRWFlKR0haR1pDWUpDSFpMWUNEU0hXU0hKWllKWENMTE5YWkpKWVlYTkZYTVdGUFlMQ1lMTEFCV0RESFdEWEpNQ1haVFpQTUxRWkhTRkhaWU5aVExMRFlXTFNMWEhZTU1ZTE1CV1dLWVhZQURUWFlMTERKUFlCUFdVWEpNV01MTFNBRkRMTFlGTEJISEhCUVFMVFpKQ1FKTERKVEZGS01NTUJZVEhZR0RDUVJERFdSUUpYTkJZU05XWkRCWVlUQkpIUFlCWVRUSlhBQUhHUURRVE1ZU1RRWEtCVFpQS0pMWlJCRVFRU1NNSkpCREpPVEdUQlhQR0JLVExIUVhKSkpDVEhYUURXSkxXUkZXUUdXU0hDS1JZU1dHRlRHWUdCWFNEV0RXUkZIV1lUSkpYWFhKWVpZU0xQWVlZUEFZWEhZRFFLWFNIWFlYR1NLUUhZV0ZERERQUExDSkxRUUVFV1hLU1lZS0RZUExUSlRIS0pMVENZWUhISlRUUExUWlpDRExUSFFLWlhRWVNURUVZV1lZWllYWFlZU1RUSktMTFBaTUNZSFFHWFlIU1JNQlhQTExOUVlEUUhYU1hYV0dEUUJTSFlMTFBKSkpUSFlKS1lQUFRIWVlLVFlFWllFTk1EU0hMQ1JQUUZER0ZYWlBTRlRMSlhYSkJTV1lZU0tTRkxYTFBQTEJCQkxCU0ZYRllaQlNKU1NZTFBCQkZGRkZTU0NKRFNUWlNYWlJZWVNZRkZTWVpZWkJKVEJDVFNCU0RIUlRKSkJZVENYWUpFWUxYQ0JORUJKRFNZWFlLR1NKWkJYQllURlpXR0VOWUhIVEhaSEhYRldHQ1NUQkdYS0xTWFlXTVRNQllYSlNUWlNDRFlRUkNZVFdYWkZITVlNQ1hMWk5TREpUVFRYUllDRllKU0JTRFlFUlhKTEpYQkJERVlOSkdIWEdDS0dTQ1lNQkxYSk1TWk5TS0dYRkJOQlBUSEZKQUFGWFlYRlBYTVlQUURUWkNYWlpQWFJTWVdaRExZQkJLVFlRUFFKUFpZUFpKWk5KUFpKTFpaRllTQlRUU0xNUFRaUlREWFFTSkVIQlpZTFpESExKU1FNTEhUWFRKRUNYU0xaWlNQS1RMWktRUVlGU1lHWVdQQ1BRRkhRSFlUUVhaS1JTR1RUU1FDWkxQVFhDRFlZWlhTUVpTTFhMWk1ZQ1BDUUJaWVhIQlNYTFpETFRDRFhUWUxaSllZWlBaWVpMVFhKU0pYSExQTVlUWENRUkJMWlNTRkpaWlROSllUWE1ZSkhMSFBQTENZWFFKUVFLWlpTQ1BaS1NXQUxRU0JMQ0NaSlNYR1dXV1lHWUtUSkJCWlRES0hYSEtHVEdQQktRWVNMUFhQSkNLQk1MTFhEWlNUQktMR0dRS1FMU0JLS1RGWFJNREtCRlRQWkZSVEJCUkZFUlFHWFlKUFpTU1RMQlpUUFNaUVpTSkRITEpRTFpCUE1TTU1TWExRUU5IS05CTFJERE5YWERIRERKQ1lZR1lMWEdaTFhTWUdNUVFHS0hCUE1YWVhMWVRRV0xXR0NQQk1RWENZWllEUkpCSFRESllIUVNIVE1KU0JZUExXSExaRkZOWVBNSFhYSFBMVEJRUEZCSldRREJZR1BOWlRQRlpKR1NERFRRU0haRUFXWlpZTExUWVlCV0pLWFhHSExGS1hESlRNU1pTUVlOWkdHU1dRU1BIVExTU0tNQ0xaWFlTWlFaWE5DSkRRR1pETEZOWUtMSkNKTExaTE1aWk5IWURTU0hUSFpaTFpaQkJIUVpXV1lDUlpITFlRUUpCRVlGWFhYV0hTUlhXUUhXUFNMTVNTS1pUVFlHWVFRV1JTTEFMSE1KVFFKU01YUUJKSlpKWFpZWktYQllRWEJKWFNIWlRTRkpMWE1YWlhGR0hLWlNaR0dZTENMU0FSSllIU0xMTE1aWEVMR0xYWURKWVRMRkJIQlBOTFlaRkJCSFBUR0pLV0VUWkhLSkpYWlhYR0xMSkxTVEdTSEpKWVFMUVpGS0NHTk5ESlNTWkZEQkNUV1dTRVFGSFFKQlNBUVRHWVBRTEJYQk1NWVdYR1NMWkhHTFpHUVlGTFpCWUZaSkZSWVNGTUJZWkhRR0ZXWlNZRllKSlBIWkJZWVpGRldPREdSTE1GVFdMQlpHWUNRWENESllHWllZWVlUWVRZRFdFR0FaWUhYSkxaWVlITFJNR1JYWFpDTEhORUxKSlRKVFBXSllCSkpCWEpKVEpURUVLSFdTTEpQTFBTRllaUFFRQkRMUUpKVFlZUUxZWktES1NRSllZUVpMRFFUR0pRWVpKU1VDTVJZUVRIVEVKTUZDVFlIWVBLTUhZWldKRFFGSFlZWFdTSENUWFJMSkhRWEhDQ1lZWUpMVEtUVFlUTVhHVENKVFpBWVlPQ1pMWUxCU1pZV0pZVFNKWUhCWVNIRkpMWUdKWFhUTVpZWUxUWFhZUFpMWFlKWllaWVlQTkhNWU1EWVlMQkxITFNZWVFRTExOSkpZTVNPWVFCWkdETFlYWUxDUVlYVFNaRUdYSFpHTEhXQkxKSEVZWFRXUU1BS0JQUUNHWVNISEVHUUNNV1lZV0xKWUpIWVlaTExKSllMSFpZSE1HU0xKTEpYQ0pKWUNMWUNKUENQWkpaSk1NWUxDUUxOUUxKUUpTWFlKTUxTWkxKUUxZQ01NSENGTU1GUFFRTUZZTFFNQ0ZGUU1NTU1ITVpORkhISkdUVEhIS0hTTE5DSEhZUURYVE1NUURDWVpZWFlRTVlRWUxURENZWVlaQVpaQ1lNWllETFpGRkZNTVlDUVpXWlpNQUJUQllaVERNTlpaR0dERlRZUENHUVlUVFNTRkZXRkRUWlFTU1lTVFdYSkhYWVRTWFhZTEJZUUhXV0tYSFpYV1pOTlpaSlpKSlFKQ0NDSFlZWEJaWFpDWVpUTExDUVhZTkpZQ1lZQ1lOWlpRWVlZRVdZQ1pEQ0pZQ0NIWUpMQlRaWVlDUVdNUFdQWU1MR0tETERMR0tRUUJHWUNISlhZXCI7XHJcbiAgICAvL+atpOWkhOaUtuW9leS6hjM3NeS4quWkmumfs+Wtl1xyXG4gICB2YXIgb011bHRpRGlmZj17XCIxOTk2OVwiOlwiRFpcIixcIjE5OTc1XCI6XCJXTVwiLFwiMTk5ODhcIjpcIlFKXCIsXCIyMDA0OFwiOlwiWUxcIixcIjIwMDU2XCI6XCJTQ1wiLFwiMjAwNjBcIjpcIk5NXCIsXCIyMDA5NFwiOlwiUUdcIixcIjIwMTI3XCI6XCJRSlwiLFwiMjAxNjdcIjpcIlFDXCIsXCIyMDE5M1wiOlwiWUdcIixcIjIwMjUwXCI6XCJLSFwiLFwiMjAyNTZcIjpcIlpDXCIsXCIyMDI4MlwiOlwiU0NcIixcIjIwMjg1XCI6XCJRSkdcIixcIjIwMjkxXCI6XCJURFwiLFwiMjAzMTRcIjpcIllEXCIsXCIyMDM0MFwiOlwiTkVcIixcIjIwMzc1XCI6XCJURFwiLFwiMjAzODlcIjpcIllKXCIsXCIyMDM5MVwiOlwiQ1pcIixcIjIwNDE1XCI6XCJQQlwiLFwiMjA0NDZcIjpcIllTXCIsXCIyMDQ0N1wiOlwiU1FcIixcIjIwNTA0XCI6XCJUQ1wiLFwiMjA2MDhcIjpcIktHXCIsXCIyMDg1NFwiOlwiUUpcIixcIjIwODU3XCI6XCJaQ1wiLFwiMjA5MTFcIjpcIlBGXCIsXCIyMDUwNFwiOlwiVENcIixcIjIwNjA4XCI6XCJLR1wiLFwiMjA4NTRcIjpcIlFKXCIsXCIyMDg1N1wiOlwiWkNcIixcIjIwOTExXCI6XCJQRlwiLFwiMjA5ODVcIjpcIkFXXCIsXCIyMTAzMlwiOlwiUEJcIixcIjIxMDQ4XCI6XCJYUVwiLFwiMjEwNDlcIjpcIlNDXCIsXCIyMTA4OVwiOlwiWVNcIixcIjIxMTE5XCI6XCJKQ1wiLFwiMjEyNDJcIjpcIlNCXCIsXCIyMTI3M1wiOlwiU0NcIixcIjIxMzA1XCI6XCJZUFwiLFwiMjEzMDZcIjpcIlFPXCIsXCIyMTMzMFwiOlwiWkNcIixcIjIxMzMzXCI6XCJTRENcIixcIjIxMzQ1XCI6XCJRS1wiLFwiMjEzNzhcIjpcIkNBXCIsXCIyMTM5N1wiOlwiU0NcIixcIjIxNDE0XCI6XCJYU1wiLFwiMjE0NDJcIjpcIlNDXCIsXCIyMTQ3N1wiOlwiSkdcIixcIjIxNDgwXCI6XCJURFwiLFwiMjE0ODRcIjpcIlpTXCIsXCIyMTQ5NFwiOlwiWVhcIixcIjIxNTA1XCI6XCJZWFwiLFwiMjE1MTJcIjpcIkhHXCIsXCIyMTUyM1wiOlwiWEhcIixcIjIxNTM3XCI6XCJQQlwiLFwiMjE1NDJcIjpcIlBGXCIsXCIyMTU0OVwiOlwiS0hcIixcIjIxNTcxXCI6XCJFXCIsXCIyMTU3NFwiOlwiREFcIixcIjIxNTg4XCI6XCJURFwiLFwiMjE1ODlcIjpcIk9cIixcIjIxNjE4XCI6XCJaQ1wiLFwiMjE2MjFcIjpcIktIQVwiLFwiMjE2MzJcIjpcIlpKXCIsXCIyMTY1NFwiOlwiS0dcIixcIjIxNjc5XCI6XCJMS0dcIixcIjIxNjgzXCI6XCJLSFwiLFwiMjE3MTBcIjpcIkFcIixcIjIxNzE5XCI6XCJZSFwiLFwiMjE3MzRcIjpcIldPRVwiLFwiMjE3NjlcIjpcIkFcIixcIjIxNzgwXCI6XCJXTlwiLFwiMjE4MDRcIjpcIlhIXCIsXCIyMTgzNFwiOlwiQVwiLFwiMjE4OTlcIjpcIlpEXCIsXCIyMTkwM1wiOlwiUk5cIixcIjIxOTA4XCI6XCJXT1wiLFwiMjE5MzlcIjpcIlpDXCIsXCIyMTk1NlwiOlwiU0FcIixcIjIxOTY0XCI6XCJZQVwiLFwiMjE5NzBcIjpcIlREXCIsXCIyMjAwM1wiOlwiQVwiLFwiMjIwMzFcIjpcIkpHXCIsXCIyMjA0MFwiOlwiWFNcIixcIjIyMDYwXCI6XCJaQ1wiLFwiMjIwNjZcIjpcIlpDXCIsXCIyMjA3OVwiOlwiTUhcIixcIjIyMTI5XCI6XCJYSlwiLFwiMjIxNzlcIjpcIlhBXCIsXCIyMjIzN1wiOlwiTkpcIixcIjIyMjQ0XCI6XCJURFwiLFwiMjIyODBcIjpcIkpRXCIsXCIyMjMwMFwiOlwiWUhcIixcIjIyMzEzXCI6XCJYV1wiLFwiMjIzMzFcIjpcIllRXCIsXCIyMjM0M1wiOlwiWUpcIixcIjIyMzUxXCI6XCJQSFwiLFwiMjIzOTVcIjpcIkRDXCIsXCIyMjQxMlwiOlwiVERcIixcIjIyNDg0XCI6XCJQQlwiLFwiMjI1MDBcIjpcIlBCXCIsXCIyMjUzNFwiOlwiWkRcIixcIjIyNTQ5XCI6XCJESFwiLFwiMjI1NjFcIjpcIlBCXCIsXCIyMjYxMlwiOlwiVERcIixcIjIyNzcxXCI6XCJLUVwiLFwiMjI4MzFcIjpcIkhCXCIsXCIyMjg0MVwiOlwiSkdcIixcIjIyODU1XCI6XCJRSlwiLFwiMjI4NjVcIjpcIlhRXCIsXCIyMzAxM1wiOlwiTUxcIixcIjIzMDgxXCI6XCJXTVwiLFwiMjM0ODdcIjpcIlNYXCIsXCIyMzU1OFwiOlwiUUpcIixcIjIzNTYxXCI6XCJZV1wiLFwiMjM1ODZcIjpcIllXXCIsXCIyMzYxNFwiOlwiWVdcIixcIjIzNjE1XCI6XCJTTlwiLFwiMjM2MzFcIjpcIlBCXCIsXCIyMzY0NlwiOlwiWlNcIixcIjIzNjYzXCI6XCJaVFwiLFwiMjM2NzNcIjpcIllHXCIsXCIyMzc2MlwiOlwiVERcIixcIjIzNzY5XCI6XCJaU1wiLFwiMjM3ODBcIjpcIlFKXCIsXCIyMzg4NFwiOlwiUUtcIixcIjI0MDU1XCI6XCJYSFwiLFwiMjQxMTNcIjpcIkRDXCIsXCIyNDE2MlwiOlwiWkNcIixcIjI0MTkxXCI6XCJHQVwiLFwiMjQyNzNcIjpcIlFKXCIsXCIyNDMyNFwiOlwiTkxcIixcIjI0Mzc3XCI6XCJURFwiLFwiMjQzNzhcIjpcIlFKXCIsXCIyNDQzOVwiOlwiUEZcIixcIjI0NTU0XCI6XCJaU1wiLFwiMjQ2ODNcIjpcIlREXCIsXCIyNDY5NFwiOlwiV0VcIixcIjI0NzMzXCI6XCJMS1wiLFwiMjQ5MjVcIjpcIlROXCIsXCIyNTA5NFwiOlwiWkdcIixcIjI1MTAwXCI6XCJYUVwiLFwiMjUxMDNcIjpcIlhIXCIsXCIyNTE1M1wiOlwiUEJcIixcIjI1MTcwXCI6XCJQQlwiLFwiMjUxNzlcIjpcIktHXCIsXCIyNTIwM1wiOlwiUEJcIixcIjI1MjQwXCI6XCJaU1wiLFwiMjUyODJcIjpcIkZCXCIsXCIyNTMwM1wiOlwiTkFcIixcIjI1MzI0XCI6XCJLR1wiLFwiMjUzNDFcIjpcIlpZXCIsXCIyNTM3M1wiOlwiV1pcIixcIjI1Mzc1XCI6XCJYSlwiLFwiMjUzODRcIjpcIkFcIixcIjI1NDU3XCI6XCJBXCIsXCIyNTUyOFwiOlwiU0RcIixcIjI1NTMwXCI6XCJTQ1wiLFwiMjU1NTJcIjpcIlREXCIsXCIyNTc3NFwiOlwiWkNcIixcIjI1ODc0XCI6XCJaQ1wiLFwiMjYwNDRcIjpcIllXXCIsXCIyNjA4MFwiOlwiV01cIixcIjI2MjkyXCI6XCJQQlwiLFwiMjYzMzNcIjpcIlBCXCIsXCIyNjM1NVwiOlwiWllcIixcIjI2MzY2XCI6XCJDWlwiLFwiMjYzOTdcIjpcIlpDXCIsXCIyNjM5OVwiOlwiUUpcIixcIjI2NDE1XCI6XCJaU1wiLFwiMjY0NTFcIjpcIlNCXCIsXCIyNjUyNlwiOlwiWkNcIixcIjI2NTUyXCI6XCJKR1wiLFwiMjY1NjFcIjpcIlREXCIsXCIyNjU4OFwiOlwiSkdcIixcIjI2NTk3XCI6XCJDWlwiLFwiMjY2MjlcIjpcIlpTXCIsXCIyNjYzOFwiOlwiWUxcIixcIjI2NjQ2XCI6XCJYUVwiLFwiMjY2NTNcIjpcIktHXCIsXCIyNjY1N1wiOlwiWEpcIixcIjI2NzI3XCI6XCJIR1wiLFwiMjY4OTRcIjpcIlpDXCIsXCIyNjkzN1wiOlwiWlNcIixcIjI2OTQ2XCI6XCJaQ1wiLFwiMjY5OTlcIjpcIktKXCIsXCIyNzA5OVwiOlwiS0pcIixcIjI3NDQ5XCI6XCJZUVwiLFwiMjc0ODFcIjpcIlhTXCIsXCIyNzU0MlwiOlwiWlNcIixcIjI3NjYzXCI6XCJaU1wiLFwiMjc3NDhcIjpcIlRTXCIsXCIyNzc4NFwiOlwiU0NcIixcIjI3Nzg4XCI6XCJaRFwiLFwiMjc3OTVcIjpcIlREXCIsXCIyNzgxMlwiOlwiT1wiLFwiMjc4NTBcIjpcIlBCXCIsXCIyNzg1MlwiOlwiTUJcIixcIjI3ODk1XCI6XCJTTFwiLFwiMjc4OThcIjpcIlBMXCIsXCIyNzk3M1wiOlwiUUpcIixcIjI3OTgxXCI6XCJLSFwiLFwiMjc5ODZcIjpcIkhYXCIsXCIyNzk5NFwiOlwiWEpcIixcIjI4MDQ0XCI6XCJZQ1wiLFwiMjgwNjVcIjpcIldHXCIsXCIyODE3N1wiOlwiU01cIixcIjI4MjY3XCI6XCJRSlwiLFwiMjgyOTFcIjpcIktIXCIsXCIyODMzN1wiOlwiWlFcIixcIjI4NDYzXCI6XCJUTFwiLFwiMjg1NDhcIjpcIkRDXCIsXCIyODYwMVwiOlwiVERcIixcIjI4Njg5XCI6XCJQQlwiLFwiMjg4MDVcIjpcIkpHXCIsXCIyODgyMFwiOlwiUUdcIixcIjI4ODQ2XCI6XCJQQlwiLFwiMjg5NTJcIjpcIlREXCIsXCIyODk3NVwiOlwiWkNcIixcIjI5MTAwXCI6XCJBXCIsXCIyOTMyNVwiOlwiUUpcIixcIjI5NTc1XCI6XCJTTFwiLFwiMjk2MDJcIjpcIkZCXCIsXCIzMDAxMFwiOlwiVERcIixcIjMwMDQ0XCI6XCJDWFwiLFwiMzAwNThcIjpcIlBGXCIsXCIzMDA5MVwiOlwiWVNQXCIsXCIzMDExMVwiOlwiWU5cIixcIjMwMjI5XCI6XCJYSlwiLFwiMzA0MjdcIjpcIlNDXCIsXCIzMDQ2NVwiOlwiU1hcIixcIjMwNjMxXCI6XCJZUVwiLFwiMzA2NTVcIjpcIlFKXCIsXCIzMDY4NFwiOlwiUUpHXCIsXCIzMDcwN1wiOlwiU0RcIixcIjMwNzI5XCI6XCJYSFwiLFwiMzA3OTZcIjpcIkxHXCIsXCIzMDkxN1wiOlwiUEJcIixcIjMxMDc0XCI6XCJOTVwiLFwiMzEwODVcIjpcIkpaXCIsXCIzMTEwOVwiOlwiU0NcIixcIjMxMTgxXCI6XCJaQ1wiLFwiMzExOTJcIjpcIk1MQlwiLFwiMzEyOTNcIjpcIkpRXCIsXCIzMTQwMFwiOlwiWVhcIixcIjMxNTg0XCI6XCJZSlwiLFwiMzE4OTZcIjpcIlpOXCIsXCIzMTkwOVwiOlwiWllcIixcIjMxOTk1XCI6XCJYSlwiLFwiMzIzMjFcIjpcIlBGXCIsXCIzMjMyN1wiOlwiWllcIixcIjMyNDE4XCI6XCJIR1wiLFwiMzI0MjBcIjpcIlhRXCIsXCIzMjQyMVwiOlwiSEdcIixcIjMyNDM4XCI6XCJMR1wiLFwiMzI0NzNcIjpcIkdKXCIsXCIzMjQ4OFwiOlwiVERcIixcIjMyNTIxXCI6XCJRSlwiLFwiMzI1MjdcIjpcIlBCXCIsXCIzMjU2MlwiOlwiWlNRXCIsXCIzMjU2NFwiOlwiSlpcIixcIjMyNzM1XCI6XCJaRFwiLFwiMzI3OTNcIjpcIlBCXCIsXCIzMzA3MVwiOlwiUEZcIixcIjMzMDk4XCI6XCJYTFwiLFwiMzMxMDBcIjpcIllBXCIsXCIzMzE1MlwiOlwiUEJcIixcIjMzMjYxXCI6XCJDWFwiLFwiMzMzMjRcIjpcIkJQXCIsXCIzMzMzM1wiOlwiVERcIixcIjMzNDA2XCI6XCJZQVwiLFwiMzM0MjZcIjpcIldNXCIsXCIzMzQzMlwiOlwiUEJcIixcIjMzNDQ1XCI6XCJKR1wiLFwiMzM0ODZcIjpcIlpOXCIsXCIzMzQ5M1wiOlwiVFNcIixcIjMzNTA3XCI6XCJRSlwiLFwiMzM1NDBcIjpcIlFKXCIsXCIzMzU0NFwiOlwiWkNcIixcIjMzNTY0XCI6XCJYUVwiLFwiMzM2MTdcIjpcIllUXCIsXCIzMzYzMlwiOlwiUUpcIixcIjMzNjM2XCI6XCJYSFwiLFwiMzM2MzdcIjpcIllYXCIsXCIzMzY5NFwiOlwiV0dcIixcIjMzNzA1XCI6XCJQRlwiLFwiMzM3MjhcIjpcIllXXCIsXCIzMzg4MlwiOlwiU1JcIixcIjM0MDY3XCI6XCJXTVwiLFwiMzQwNzRcIjpcIllXXCIsXCIzNDEyMVwiOlwiUUpcIixcIjM0MjU1XCI6XCJaQ1wiLFwiMzQyNTlcIjpcIlhMXCIsXCIzNDQyNVwiOlwiSkhcIixcIjM0NDMwXCI6XCJYSFwiLFwiMzQ0ODVcIjpcIktIXCIsXCIzNDUwM1wiOlwiWVNcIixcIjM0NTMyXCI6XCJIR1wiLFwiMzQ1NTJcIjpcIlhTXCIsXCIzNDU1OFwiOlwiWUVcIixcIjM0NTkzXCI6XCJaTFwiLFwiMzQ2NjBcIjpcIllRXCIsXCIzNDg5MlwiOlwiWEhcIixcIjM0OTI4XCI6XCJTQ1wiLFwiMzQ5OTlcIjpcIlFKXCIsXCIzNTA0OFwiOlwiUEJcIixcIjM1MDU5XCI6XCJTQ1wiLFwiMzUwOThcIjpcIlpDXCIsXCIzNTIwM1wiOlwiVFFcIixcIjM1MjY1XCI6XCJKWFwiLFwiMzUyOTlcIjpcIkpYXCIsXCIzNTc4MlwiOlwiU1pcIixcIjM1ODI4XCI6XCJZU1wiLFwiMzU4MzBcIjpcIkVcIixcIjM1ODQzXCI6XCJURFwiLFwiMzU4OTVcIjpcIllHXCIsXCIzNTk3N1wiOlwiTUhcIixcIjM2MTU4XCI6XCJKR1wiLFwiMzYyMjhcIjpcIlFKXCIsXCIzNjQyNlwiOlwiWFFcIixcIjM2NDY2XCI6XCJEQ1wiLFwiMzY3MTBcIjpcIkpDXCIsXCIzNjcxMVwiOlwiWllHXCIsXCIzNjc2N1wiOlwiUEJcIixcIjM2ODY2XCI6XCJTS1wiLFwiMzY5NTFcIjpcIllXXCIsXCIzNzAzNFwiOlwiWVhcIixcIjM3MDYzXCI6XCJYSFwiLFwiMzcyMThcIjpcIlpDXCIsXCIzNzMyNVwiOlwiWkNcIixcIjM4MDYzXCI6XCJQQlwiLFwiMzgwNzlcIjpcIlREXCIsXCIzODA4NVwiOlwiUVlcIixcIjM4MTA3XCI6XCJEQ1wiLFwiMzgxMTZcIjpcIlREXCIsXCIzODEyM1wiOlwiWURcIixcIjM4MjI0XCI6XCJIR1wiLFwiMzgyNDFcIjpcIlhUQ1wiLFwiMzgyNzFcIjpcIlpDXCIsXCIzODQxNVwiOlwiWUVcIixcIjM4NDI2XCI6XCJLSFwiLFwiMzg0NjFcIjpcIllEXCIsXCIzODQ2M1wiOlwiQUVcIixcIjM4NDY2XCI6XCJQQlwiLFwiMzg0NzdcIjpcIlhKXCIsXCIzODUxOFwiOlwiWVRcIixcIjM4NTUxXCI6XCJXS1wiLFwiMzg1ODVcIjpcIlpDXCIsXCIzODcwNFwiOlwiWFNcIixcIjM4NzM5XCI6XCJMSlwiLFwiMzg3NjFcIjpcIkdKXCIsXCIzODgwOFwiOlwiU1FcIixcIjM5MDQ4XCI6XCJKR1wiLFwiMzkwNDlcIjpcIlhKXCIsXCIzOTA1MlwiOlwiSEdcIixcIjM5MDc2XCI6XCJDWlwiLFwiMzkyNzFcIjpcIlhUXCIsXCIzOTUzNFwiOlwiVERcIixcIjM5NTUyXCI6XCJURFwiLFwiMzk1ODRcIjpcIlBCXCIsXCIzOTY0N1wiOlwiU0JcIixcIjM5NzMwXCI6XCJMR1wiLFwiMzk3NDhcIjpcIlRQQlwiLFwiNDAxMDlcIjpcIlpRXCIsXCI0MDQ3OVwiOlwiTkRcIixcIjQwNTE2XCI6XCJIR1wiLFwiNDA1MzZcIjpcIkhHXCIsXCI0MDU4M1wiOlwiUUpcIixcIjQwNzY1XCI6XCJZUVwiLFwiNDA3ODRcIjpcIlFKXCIsXCI0MDg0MFwiOlwiWUtcIixcIjQwODYzXCI6XCJRSkdcIn07XHJcbiAgICAvL+WPguaVsCzkuK3mloflrZfnrKbkuLJcclxuICAgIC8v6L+U5Zue5YC8OuaLvOmfs+mmluWtl+avjeS4suaVsOe7hFxyXG4gICAgZnVuY3Rpb24gbWFrZVB5KHN0cikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHN0cikgIT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKC0xLCBcIuWHveaVsG1ha2VQeemcgOimgeWtl+espuS4suexu+Wei+WPguaVsCFcIik7XHJcbiAgICAgICAgdmFyIGFyclJlc3VsdCA9IG5ldyBBcnJheSgpOyAvL+S/neWtmOS4remXtOe7k+aenOeahOaVsOe7hFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgLy/ojrflvpd1bmljb2Rl56CBXHJcbiAgICAgICAgICAgIHZhciBjaCA9IHN0ci5jaGFyQXQoaSk7XHJcbiAgICAgICAgICAgIC8v5qOA5p+l6K+ldW5pY29kZeeggeaYr+WQpuWcqOWkhOeQhuiMg+WbtOS5i+WGhSzlnKjliJnov5Tlm57or6XnoIHlr7nmmKDmsYnlrZfnmoTmi7zpn7PpppblrZfmr40s5LiN5Zyo5YiZ6LCD55So5YW25a6D5Ye95pWw5aSE55CGXHJcbiAgICAgICAgICAgIGFyclJlc3VsdC5wdXNoKGNoZWNrQ2goY2gpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpITnkIZhcnJSZXN1bHQs6L+U5Zue5omA5pyJ5Y+v6IO955qE5ou86Z+z6aaW5a2X5q+N5Liy5pWw57uEXHJcbiAgICAgICAgcmV0dXJuIG1rUnNsdChhcnJSZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrQ2goY2gpIHtcclxuICAgICAgICB2YXIgdW5pID0gY2guY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAvL+WmguaenOS4jeWcqOaxieWtl+WkhOeQhuiMg+WbtOS5i+WGhSzov5Tlm57ljp/lrZfnrKYs5Lmf5Y+v5Lul6LCD55So6Ieq5bex55qE5aSE55CG5Ye95pWwXHJcbiAgICAgICAgaWYgKHVuaSA+IDQwODY5IHx8IHVuaSA8IDE5OTY4KVxyXG4gICAgICAgICAgICByZXR1cm4gY2g7IC8vZGVhbFdpdGhPdGhlcnMoY2gpO1xyXG4gICAgICAgIC8v5qOA5p+l5piv5ZCm5piv5aSa6Z+z5a2XLOaYr+aMieWkmumfs+Wtl+WkhOeQhizkuI3mmK/lsLHnm7TmjqXlnKhzdHJDaGluZXNlRmlyc3RQWeWtl+espuS4suS4reaJvuWvueW6lOeahOmmluWtl+avjVxyXG4gICAgICAgIHJldHVybiAob011bHRpRGlmZlt1bmldID8gb011bHRpRGlmZlt1bmldIDogKHN0ckNoaW5lc2VGaXJzdFBZLmNoYXJBdCh1bmkgLSAxOTk2OCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBta1JzbHQoYXJyKSB7XHJcbiAgICAgICAgdmFyIGFyclJzbHQgPSBbXCJcIl07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3RyID0gYXJyW2ldO1xyXG4gICAgICAgICAgICB2YXIgc3RybGVuID0gc3RyLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKHN0cmxlbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGFyclJzbHQubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJSc2x0W2tdICs9IHN0cjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciB0bXBBcnIgPSBhcnJSc2x0LnNsaWNlKDApO1xyXG4gICAgICAgICAgICAgICAgYXJyUnNsdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IHN0cmxlbjsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpI3liLbkuIDkuKrnm7jlkIznmoRhcnJSc2x0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHRtcEFyci5zbGljZSgwKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+aKiuW9k+WJjeWtl+espnN0cltrXea3u+WKoOWIsOavj+S4quWFg+e0oOacq+WwvlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSBzdHIuY2hhckF0KGspO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+aKiuWkjeWItuW5tuS/ruaUueWQjueahOaVsOe7hOi/nuaOpeWIsGFyclJzbHTkuIpcclxuICAgICAgICAgICAgICAgICAgICBhcnJSc2x0ID0gYXJyUnNsdC5jb25jYXQodG1wKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyUnNsdDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S4pOerr+WOu+epuuagvOWHveaVsFxyXG4gICAgU3RyaW5nLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyheXFxzKil8KFxccyokKS9nLCBcIlwiKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIHBpbnlpbiA9IHt9O1xyXG4gICAgcGlueWluLm1ha2VQeSA9IG1ha2VQeTtcclxuXHJcbiAgICB2YXIgZWxlbWVudCA9IGxheXVpLmVsZW1lbnQsXHJcbiAgICAgICAgd2luID0gd2luZG93LFxyXG4gICAgICAgIGRvYyA9IGRvY3VtZW50O1xyXG5cclxuICAgIFxyXG4gICAgIGZ1bmN0aW9uIGZpbHRlckRhdGEocGlkLERhdGEpe1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhEYXRhKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5wYXJlbnRNZW51SWQ9PXBpZCAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICBmdW5jdGlvbiBtYXBSZXNldE9wZW5NZW51TGlzdChtYXBEYXRhKXtcclxuICAgICAgICB2YXIgaW5kZXg9MDtcclxuICAgICAgICB2YXIgZ3JvdXAgPSAkKGA8ZGl2IGNsYXNzPVwicHItbWV1bi1ncm91cFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJwci1tZXVuLWdyb3VwXCI+PC9kaXY+PGRpdiBjbGFzcz1cInByLW1ldW4tZ3JvdXBcIj48L2Rpdj5gKTtcclxuICAgICBcclxuICAgICAgICB2YXIgdHJlZURhdGE9IGZpbHRlckRhdGEoXCIwXCIsbWFwRGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/pgJLlvZJcclxuICAgICAgICB2YXIgcmVjdXJzaXZlID0gZnVuY3Rpb24ocGlkKXtcclxuICAgICAgICAgICAgdmFyIHN0cj1cIlwiXHJcbiAgICAgICAgICAgIHZhciBjaGlsZD1maWx0ZXJEYXRhKHBpZCxtYXBEYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNoaWxkLmZvckVhY2goZnVuY3Rpb24oZGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBgPGRpdiBjbGFzcz1cIm1lbnUtdGV4dFwiIHB5LWNvZGU9JHtkaXRlbS5QWV9jb2RlfT5cclxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj0ke2RpdGVtLmhhc2g/XCIjXCIrZGl0ZW0uaGFzaDpcImphdmFzY3JpcHQ6O1wifVxyXG4gICAgICAgICAgICAgICAgICAgcGFyZW50bWVudS1pZD0ke2RpdGVtLnBhcmVudE1lbnVJZH1cclxuICAgICAgICAgICAgICAgICAgIG1lbnUtaWQ9JHtkaXRlbS5tZW51SWR9XHJcbiAgICAgICAgICAgICAgICAgICBsZWFmPSR7ZGl0ZW0ubGVhZn0+XHJcbiAgICAgICAgICAgICAgICAgICAke2RpdGVtLm5hbWV9PC9hPlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICBpZighZGl0ZW0ubGVhZikgXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IHJlY3Vyc2l2ZShkaXRlbS5tZW51SWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgIHJldHVybiBzdHIgIFxyXG4gICAgICAgIH0gXHJcblxyXG5cclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0cmVlRGF0YSApe1xyXG4gICAgICAgICAgICB2YXIgZWxlID0gYDxkaXYgY2xhc3M9XCJsaXN0LWl0ZW0gJHt0cmVlRGF0YVtrZXldLmlzQWN0aXZlP2BzZWxlY3RgOicnfVwiIGlkPSR7dHJlZURhdGFba2V5XS5tZW51SWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIG1lbnUtaWQ9JHt0cmVlRGF0YVtrZXldLm1lbnVJZH0gcGFyZW50bWVudS1pZD0ke3RyZWVEYXRhW2tleV0ucGFyZW50TWVudUlkfSBjbGFzcz1cImxpc3QtdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICR7dHJlZURhdGFba2V5XS5uYW1lfTwvYT5gO1xyXG4gICAgIFxyXG4gICAgICAgICAgICAvL+mBjeWOhuS6jOe6p+iPnOWNlVxyXG4gICAgICAgICAgICBlbGUgKz0gcmVjdXJzaXZlKHRyZWVEYXRhW2tleV0ubWVudUlkKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWxlICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggJSAzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cC5lcSgwKS5hcHBlbmQoZWxlKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ICUgMyA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAuZXEoMSkuYXBwZW5kKGVsZSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCAlIDMgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGdyb3VwLmVxKDIpLmFwcGVuZChlbGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKGdyb3VwKS5maW5kKFwiLm1lbnUtdGV4dD5hW2xlYWY9J2ZhbHNlJ11cIikuaGlkZSgpO1xyXG4gICAgICAgIHJldHVybiAkKGdyb3VwKVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLy/muLLmn5PkuIDnuqfoj5zljZVcclxuICAgXHJcbiAgICBcclxuICAgICAvL+a4suafk+S6jOe6p+WSjOS4iee6p+iPnOWNlVxyXG4gICAgIFxyXG4gICAgIGZ1bmN0aW9uIG1hcFVwZGF0ZUNoaWxkcmVuTmFuKGlkLG1hcERhdGEsZG9tKXtcclxuICAgICAgIC8vICB2aXBzcGEuaW5kZXhJZD1pZDtcclxuICAgICAgICAgdmFyIHBhcmVudD1tYXBEYXRhW21hcERhdGFbaWRdLnBhcmVudE1lbnVJZF07IFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgIGlmKHBhcmVudCl7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJlbnQucGFyZW50TWVudUlkIT09XCIwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudD1tYXBEYXRhW3BhcmVudC5wYXJlbnRNZW51SWRdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcGFyZW50PSBtYXBEYXRhW2lkXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICAgIGZ1bmN0aW9uIHRyZWUocGlkKXsgIFxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGE9W11cclxuICAgICAgICAgICAgICAgICBPYmplY3QudmFsdWVzKG1hcERhdGEpLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICBpZihwaWQgPT1pdGVtLnBhcmVudE1lbnVJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgIGlmKCFpdGVtLmxlYWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jaGlsZHJlbj0gdHJlZShpdGVtLm1lbnVJZClcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwYXJlbnQuY2hpbGRyZW49IHRyZWUocGFyZW50Lm1lbnVJZCk7XHJcblxyXG4gICAgICAgIHZhciB0cmVlRGF0YT1wYXJlbnRcclxuICAgICAgICB2YXIgc2lkZWJhckxpPWA8dWwgY2xhc3M9XCJib2R5LW5hdlwiIHBhcmVudG1lbnUtaWQ9JHtwYXJlbnQubWVudUlkfSBuYW1lPSR7cGFyZW50Lm5hbWV9PmBcclxuICAgICAgICBcclxuICAgICAgICB0cmVlRGF0YT10cmVlRGF0YS5jaGlsZHJlbjtcclxuICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRyZWVEYXRhKXsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzaWRlYmFyTGkgKz0gYDxsaSBjbGFzcz1cIml0ZW0gaC1saW5rICR7dHJlZURhdGFba2V5XS5pc0FjdGl2ZT9gYWN0aXZlLXRoaXNgOicnfSAke3RyZWVEYXRhW2tleV0uaXNBY3RpdmUmJnRyZWVEYXRhW2tleV0uY2hpbGRyZW4/YGl0ZW1lZHNgOicnfVwiPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiJHt0cmVlRGF0YVtrZXldLmJsYW5rP3RyZWVEYXRhW2tleV0ucGF0aDoodHJlZURhdGFba2V5XS5oYXNoP1wiI1wiK3RyZWVEYXRhW2tleV0uaGFzaDpcImphdmFzY3JpcHQ6O1wiKX1cIiAgJHt0cmVlRGF0YVtrZXldLmJsYW5rP2B0YXJnZXQ9X2JsYW5rYDpcIlwifSBtZW51LWlkPSR7dHJlZURhdGFba2V5XS5tZW51SWR9IGxlYWY9XCIke3RyZWVEYXRhW2tleV0ubGVhZn1cIiBsZXZlbD1cIiR7dHJlZURhdGFba2V5XS5sZXZlbH1cIj4ke3RyZWVEYXRhW2tleV0ubmFtZX1cclxuICAgICAgICAgICAgJHsodHJlZURhdGFba2V5XS5jaGlsZHJlbiYmIXRyZWVEYXRhW2tleV0ubGVhZik/YDxpIGNsYXNzPVwicmlnaHQtbW92ZXIgbGF5dWktaWNvbiBsYXl1aS1pY29uLXJpZ2h0XCI+PC9pPmA6Jyd9IFxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICR7KHRyZWVEYXRhW2tleV0uY2hpbGRyZW4mJiF0cmVlRGF0YVtrZXldLmxlYWYpP1xyXG4gICAgICAgICAgICAgICAgICBgPGRsIGNsYXNzPVwibmF2LWNoaWxkXCIgcGFyZW50bWVudS1pZD0ke3RyZWVEYXRhW2tleV0ubWVudUlkfT4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHsgdHJlZURhdGFba2V5XS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24oY2hpbGRJdGVtLGluZGV4LGFycil7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGQgJHtjaGlsZEl0ZW0uaXNBY3RpdmU/YGNsYXNzPVwiYWN0aXZlLXRoaXNcImA6Jyd9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj0ke2NoaWxkSXRlbS5ibGFuaz9jaGlsZEl0ZW0ucGF0aDooY2hpbGRJdGVtLmhhc2g/XCIjXCIrY2hpbGRJdGVtLmhhc2g6XCJqYXZhc2NyaXB0OjtcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2NoaWxkSXRlbS5ibGFuaz9gdGFyZ2V0PV9ibGFua2A6XCJcIn0gbGVhZj0ke2NoaWxkSXRlbS5sZWFmfSBtZW51LWlkPSR7Y2hpbGRJdGVtLm1lbnVJZH0gIGxldmVsPSR7Y2hpbGRJdGVtLmxldmVsfT4ke2NoaWxkSXRlbS5uYW1lfTwvYT48L2RkPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuam9pbihcIlwiKSB9ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICA8L2RsPmAgICAgICAgICBcclxuICAgICAgICAgICAgOicnfSBcclxuICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaWRlYmFyTGkrPWA8L3VsPmBcclxuICAgICAgICBkb20mJmRvbS5ib2R5TmF2Lmh0bWwoc2lkZWJhckxpKTtcclxuICAgICAgICByZXR1cm4gc2lkZWJhckxpXHJcblxyXG4gICAgIH1cclxuXHJcblxyXG4gICAgLy/mkbjniYhcclxuICAgIC8v5riy5p+T5LiA57qn6I+c5Y2VXHJcbiAgICBmdW5jdGlvbiBtYXBVcGRhdGVNYWluTmF2KG1hcERhdGEpe1xyXG4gICAgICAgIHZhciBzaWRlYmFyTGk9XCJcIlxyXG4gICAgICAgICAgT2JqZWN0LnZhbHVlcyhtYXBEYXRhKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50TWVudUlkPT1cIjBcIil7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyTGkrPSAgIGA8bGkgY2xhc3M9XCJzLWl0ZW0gJHtpdGVtLmlzQWN0aXZlP2BhY3RpdmVgOicnfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWJveFwiPjxpIGNsYXNzPVwiJHtpdGVtLmltYWdlUGF0aH1cIj48L2k+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZXVuLW5hbWVcIj48YSBocmVmPVwiJHtpdGVtLmxlYWY/XCIjXCIraXRlbS5oYXNoOmBqYXZhc2NyaXB0OjtgfVwiICBtZW51LWlkPSR7aXRlbS5tZW51SWR9PiR7aXRlbS5uYW1lfTwvYT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2xpPmBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBzaWRlYmFyTGlcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBUZW1wbGF0ZU1hcChtYXBEYXRhLG9wdHMpe1xyXG4gICAgICAgIGlmKCFtYXBEYXRhKXtcclxuICAgICAgICAgICAgbWFwRGF0YT1bXSAgICBcclxuICAgICAgICB9ICAgXHJcblxyXG5cclxuICAgICAgICAgICAgLy/kuIDnuqfoj5zljZVcclxuICAgICAgICAgICAgdmFyIHNpZGViYXJMaT1tYXBVcGRhdGVNYWluTmF2KG1hcERhdGEpO1xyXG4gICAgICAgICAgICAvL+aJk+W8gOWFqOmDqOeahOiPnOWNlVxyXG4gICAgICAgICAgICAgdmFyIGdyb3VwPW1hcFJlc2V0T3Blbk1lbnVMaXN0KG1hcERhdGEpO1xyXG4gIFxyXG4gICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHZpcHNwYS5pbmRleElkKVxyXG5cclxuICAgICAgICAgICAgdmFyIHRwbD0kKGA8ZGl2IGNsYXNzPVwicGxnLXNpZGViYXJcIj4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbi1uYXZcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtZXVuU29yb2xsXCIgY2xhc3M9XCJsYXl1aS1zaWRlLXNjcm9sbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWxvZ29cIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibG9nby1wYXRoICR7b3B0cy5sb2dvPT0ncGxnJyYmJ3BsZy1sb2dvJ31cIiA+PC9hPiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBpZD1cInBsZy1sb2dvLWZvbGRcIiBjbGFzcz1cImFudGljb24gbGF5dWktaWNvbiBsYXl1aS1pY29uLXNocmluay1yaWdodFwiPjwvaT4gICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgICBcclxuICAgICAgICAgICAgICAgICAgICA8IS0tIOW3puS+p+aJk+W8gOWFqOmDqOWvvOiIquWMuuWfnyAtLT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItb3BlblwiIGRhdGEtdHlwZT1cImhvb3QtY2xpY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWxheWVyLXNldHdpblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLWljb24tY2xvc2VcIiBocmVmPVwiamF2YXNjcmlwdDo7XCI+PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByLXNlYXJjaFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwci1pY29uLXNlYXJjaC13cmFwcGVyXCI+PGkgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLWljb24tc2VhcmNoXHJcbiAgICAgICAgICAgIFwiPjwvaT48L3NwYW4+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJzZWxlY3RJbnB1dFwiIGNsYXNzPVwicHItc2VhcmNoLWlucHV0XCIgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXlhbPplK7or41cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtdGlwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHNwYW4+5Lul5LiL5piv5LiO4oCcPHN0cm9uZz48L3N0cm9uZz7igJ3nm7jlhbPnmoTkuqflk4HvvJo8L3NwYW4+PC9wPjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwia2V5VXBMaXN0XCIgY2xhc3M9XCJrZXlVcExpc3RcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1tZXVuZ3JvdXAtbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0g5YWo6YOo6I+c5Y2V5YiX6KGoLS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjcm9sbC1uYXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJyaWdodC1zaWRlYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3NpZGViYXJMaX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1hbGxcIiBkYXRhLXR5cGU9XCJob290LWNsaWNrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250IHAtaWNvbi1hbGxcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1ldW4tbmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSAgaHJlZj1cImphdmFzY3JpcHQ6O1wiPuaJgOacieacjeWKoTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJyaWdodC1tb3ZlciBsYXl1aS1pY29uIGxheXVpLWljb24tcmlnaHRcclxuICAgICAgICAgICAgXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWxhc3RcIiBkYXRhLXNob3c9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic2lkZWJhclwiIGNsYXNzPVwic2lkZWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0t5LiA57qn6I+c5Y2VLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICR7c2lkZWJhckxpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWhvdmVyLWNoaWxkXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIOS6jOe6p+iPnOWNlSAtLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLXNpZGVcIj4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIOW9k+WJjWhvdmVy5LqM57qn6I+c5Y2V5YiX6KGoLS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dmlwc3BhLmluZGV4SWQ/bWFwVXBkYXRlQ2hpbGRyZW5OYW4odmlwc3BhLmluZGV4SWQsbWFwRGF0YSk6XCJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCApO1xyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICBcclxuICAgICAgICAgIHRwbC5maW5kKFwiLnByLW1ldW5ncm91cC1saXN0XCIpLmFwcGVuZChncm91cCk7ICAgICBcclxuICAgICAgICByZXR1cm4gJCh0cGwpXHJcbiAgICAgICAgXHJcbiAgICAgfVxyXG4gXHJcblxyXG5cclxuICAgIHZhciBwbGdTaWRlYmFyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLm9wdGlvbnM9b3B0aW9ucztcclxuICAgICAgICB2YXIgY29uZmlnPXtcclxuICAgICAgICAgICAgcmVuZGVyZXI6bnVsbCxcclxuICAgICAgICAgICAgdXJsOm51bGwsXHJcbiAgICAgICAgICAgIGFqYXhJbml0OntcclxuICAgICAgICAgICAgICAgIHVybDpudWxsLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcImdldFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxvZ286XCJcIixcclxuICAgICAgICAgICAgcm91dGU6ZmFsc2UsXHJcbiAgICAgICAgICAgIG1lbnVDbGljazpudWxsLFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluaVsOaNruWFpeWPo1xyXG4gICAgICAgIF90aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCBjb25maWcsIF90aGlzLm9wdGlvbnMpO1xyXG5cclxuXHJcbiAgICAgICAgLy/ojrflj5bmlbDmja5cclxuICAgICAgICB2YXIgbG9hZGRhdGE9TG9hZERhdGEuY2FsbCh0aGlzLF90aGlzLm9wdGlvbnMuYWpheEluaXQpO1xyXG4gICAgIC8vICAgdmlwc3BhLnRyZWVEYXRhID0gbG9hZGRhdGEudHJlZURhdGE7XHJcbiAgXHJcbiAgXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModmlwc3BhLCB7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgbWFwRGF0YTp7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAgbG9hZGRhdGEubWFwRGF0YVxyXG4gICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgc2V0OmZ1bmN0aW9uKG5ld1ZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHsgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpcHNwYS5pbmRleElkID12aXBzcGEucm91dGVyTWFwW3ZpcHNwYS5wYXJzZShsb2NhdGlvbi5oYXNoKS51cmxdLm1lbnVJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvciggXCJ2aXBzcGEucm91dGVyLmRlZmF1bHRzOmhhc2ggb2YgZXJyb3JcIiApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb2N1bWVudCA9IFRlbXBsYXRlTWFwKG5ld1ZhbHVlLF90aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbml0KF90aGlzLmRvY3VtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMub3B0aW9ucy5yZW5kZXJlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbmRlclRvKF90aGlzLm9wdGlvbnMucmVuZGVyZXIpO1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgLy8gbG9hZGRhdGEudHJlZURhdGFbX3RoaXMub3B0aW9ucy5pbmRleF0uaXNBY3RpdmU9dHJ1ZTtcclxuICAgICAgLy8gdmlwc3BhLnRyZWVEYXRhPWxvYWRkYXRhLnRyZWVEYXRhIDtcclxuICAgICAvLyAgIHZpcHNwYS5tYXBEYXRhPWxvYWRkYXRhLm1hcERhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5LqL5Lu255uR5ZCsXHJcbiAgICBmdW5jdGlvbiBFdmVudEhhbmxkZXIoZG9tKXtcclxuICAgICAgICB2YXIgX3RoaXM9dGhpc1xyXG4gICAgICAgIHZhciBvcHRzPXRoaXMub3B0aW9ucztcclxuICAgICAvLyAgIHZhciB0cmVlRGF0YT0gdmlwc3BhLnRyZWVEYXRhO1xyXG4gICAgICAgIHZhciBtYXBEYXRhPSB2aXBzcGEubWFwRGF0YTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9tLm1ldW5Tb3JvbGwuaGFzQ2xhc3MoXCJzaG93TGlzdFwiKSAmJiByZW1vdmVyU2hvd0xpc3QoZG9tLm1ldW5Tb3JvbGwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgIC8v5o6n5Yi26I+c5Y2V5bGV5byA5pS257ypXHJcbiAgICAgICAgIGRvbS5sb2dvRm9sZC5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJsYXl1aS1pY29uLXNocmluay1yaWdodFwiKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImxheXVpLWljb24tc2hyaW5rLXJpZ2h0XCIpLmFkZENsYXNzKFwibGF5dWktaWNvbi1zcHJlYWQtbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwicGxnLW9wZW4taG92ZXJcIik7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImxheXVpLWljb24tc3ByZWFkLWxlZnRcIikuYWRkQ2xhc3MoXCJsYXl1aS1pY29uLXNocmluay1yaWdodFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwicGxnLW9wZW4taG92ZXJcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgIC8v5o6n5Yi26I+c5Y2VaG92ZXJcclxuICAgICAgICBkb20ubmF2TGFzdC5ob3ZlcihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGlkPSAkKHRoaXMpLmZpbmQoXCJsaS5zLWl0ZW0uYWN0aXZlIGFcIikuYXR0cihcIm1lbnUtaWRcIik7XHJcbiAgICAgICAgICAgIGlmKGlkJiZ2aXBzcGEubWFwRGF0YVtpZF0ubGVhZil7XHJcbiAgICAgICAgICAgICAgICBkb20ubmF2TGFzdC5hdHRyKFwiZGF0YS1zaG93XCIsIFwiXCIpXHJcbiAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgcmVtb3ZlclNob3dMaXN0KGRvbS5tZXVuU29yb2xsKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1zaG93XCIsIFwic2hvdy1jaGlsZFwiKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXNob3dcIiwgXCJcIilcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8v5omT5byA5omA5pyJ6I+c5Y2V54K55Ye75LqL5Lu2XHJcbiAgICAgICAgZG9tLnByTGVmdC5vbihcImNsaWNrXCIsXCIubWVudS10ZXh0ID4gYVwiLGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIGxvY2F0aW9uLmhhc2g9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgICAgIHZhciBpZD0gJCh0aGlzKS5hdHRyKFwibWVudS1pZFwiKTtcclxuICAgICAgICAgICAgdmFyIHBpZD0gJCh0aGlzKS5hdHRyKFwicGFyZW50bWVudS1pZFwiKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc3VsdChwaWQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iaj1tYXBEYXRhW3BpZF1cclxuICAgICAgICAgICAgICAgIGlmKG9iai5wYXJlbnRNZW51SWQhPT1cIjBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQob2JqLnBhcmVudE1lbnVJZClcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgXHJcbiAgICAgICAgICAgICBtYXBVcGRhdGVDaGlsZHJlbk5hbihpZCxtYXBEYXRhLGRvbSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBzbGZlPSBkb20uYm9keU5hdi5maW5kKGBhW21lbnUtaWQ9JyR7aWR9J11gKTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgIC8vIGFyci51bnNoaWZ0KHNsZmUudGV4dCgpLnJlcGxhY2UoL1tcXCBcXHJcXG5dL2csXCJcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzbGZlLnBhcmVudCgpLmlzKFwiZGRcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Fyci51bnNoaWZ0KHNsZmUucGFyZW50cyhcImRsLm5hdi1jaGlsZFwiKS5wcmV2KCkudGV4dCgpLnJlcGxhY2UoL1tcXCBcXHJcXG5dL2csXCJcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsZmUucGFyZW50cyhcImxpLml0ZW0gXCIpLmFkZENsYXNzKFwiaXRlbWVkc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGZlLnBhcmVudHMoXCJkbC5uYXYtY2hpbGRcIikuc2hvdygpXHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIC8vYXJyLnVuc2hpZnQoc2xmZS5wYXJlbnRzKFwiLmJvZHktbmF2XCIpLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoL1tcXCBcXHJcXG5dL2csXCJcIikpICBcclxuICAgICAgICAgICAgICAgICBzbGZlLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlLXRoaXNcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS10aGlzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpZFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwaWQ9cmVzdWx0KHBpZCk7XHJcbiAgICAgICAgICAgIHJlbW92ZXJTaG93TGlzdChkb20ubWV1blNvcm9sbCk7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5LiA57qn6I+c5Y2V5LqL5Lu2XHJcbiAgICAgICAgZG9tLnNpZGViYXIub24oXCJjbGlja1wiLFwibGlcIixmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgdmFyIGlkPSAkKHRoaXMpLmZpbmQoXCJhXCIpLmF0dHIoXCJtZW51LWlkXCIpO1xyXG4gICAgICAgICAgIHZhciBpPSQodGhpcykuaW5kZXgoKTtcclxuICAgICAgICAgIC8vIGRvbS5zaWRlYmFyLmVtcHR5KCkuYXBwZW5kKHVwZGF0ZU1haW5OYXYodHJlZURhdGEpKVxyXG4gICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgb3B0cy5pbmRleD1pO1xyXG4gICAgICAgICAgIGlmKHZpcHNwYS5tYXBEYXRhW2lkXS5sZWFmKXtcclxuICAgICAgICAgICAgZG9tLm5hdkxhc3QuYXR0cihcImRhdGEtc2hvd1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaD0kKHRoaXMpLmZpbmQoXCJhXCIpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgfSBcclxuICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIGRvbS5uYXZMYXN0LmF0dHIoXCJkYXRhLXNob3dcIixcIlwiKTtcclxuICAgICAgICAgICBtYXBVcGRhdGVDaGlsZHJlbk5hbihpZCxtYXBEYXRhLGRvbSk7XHJcbiAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgIGRvbS5uYXZMYXN0LmF0dHIoXCJkYXRhLXNob3dcIixcInNob3ctY2hpbGRcIik7XHJcbiAgICAgICAgICAgfSwgMjAwKVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pICBcclxuXHJcbiAgICAgICAgICAgLy/ngrnlh7vkuoznuqdob3ZlcuiPnOWNleS6i+S7tlxyXG4gICAgICAgIGRvbS5ib2R5TmF2Lm9uKFwiY2xpY2tcIiwgXCJsaT5hXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy/pmLvmraLkuovku7blhpLms6FcclxuICAgICAgICAgICAgdmFyIHNsZmUgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBsZWFmID0gKHNsZmUuYXR0cihcImxlYWZcIikpID09IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICBjaGlsZCA9IHNsZmUuc2libGluZ3MoXCJkbC5uYXYtY2hpbGRcIik7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2xmZS5wYXJlbnQoKS5hZGRDbGFzcyhcImFjdGl2ZS10aGlzXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmUtdGhpc1wiKS5maW5kKCdkZCcpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLXRoaXNcIikucmVtb3ZlQ2xhc3MoXCJpdGVtZWRzXCIpO1xyXG4gICAgICAgICAgICBvcHRzLm1lbnVDbGljayYmb3B0cy5tZW51Q2xpY2soc2xmZSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChzbGZlLnBhcmVudCgpLmlzKFwiZGRcIikpIHtcclxuICAgICAgICAgICAgICAgIHNsZmUucGFyZW50cyhcImxpLml0ZW1cIikuYWRkQ2xhc3MoXCJhY3RpdmUtdGhpc1wiKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLXRoaXNcIikucmVtb3ZlQ2xhc3MoXCJpdGVtZWRzXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v5aaC5p6c5piv5LqM57qn6I+c5Y2VXHJcbiAgICAgICAgICAgIGlmICghbGVhZiAmJiBjaGlsZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzbGZlLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlLXRoaXNcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS10aGlzXCIpLnJlbW92ZUNsYXNzKFwiaXRlbWVkc1wiKVxyXG4gICAgICAgICAgICAgICAgY2hpbGQuc2xpZGVUb2dnbGUoXCJmYXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgc2xmZS5wYXJlbnQoKS50b2dnbGVDbGFzcyhcIml0ZW1lZHNcIikuc2libGluZ3MoKS5jaGlsZHJlbignLm5hdi1jaGlsZCcpLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZigkKHRoaXMpLmF0dHIoXCJ0YXJnZXRcIik9PVwiX2JsYW5rXCIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoICQodGhpcykuYXR0cihcImhyZWZcIikhPT1cImphdmFzY3JpcHQ6O1wiKXtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICAgIC8vICB2aXBzcGEuaW5kZXhJZD1zbGZlLmF0dHIoXCJtZW51LWlkXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgLy8gIHZhciBhcnI9W107aXRlbWVkc1xyXG4gICAgICAgICAgXHJcbiAgIFxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICBkb20ubWV1blNvcm9sbC5vbihcImNsaWNrXCIsIFwiW2RhdGEtdHlwZT0naG9vdC1jbGljayddXCIsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy/pmLvmraLkuovku7blhpLms6FcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGV2ZSA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgc3dpdGNoICgkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicHJvZHVjdC1hbGxcIjovL+WFs+mXrSDlsI9YXHJcbiAgICAgICAgICAgICAgICBkb20ubWV1blNvcm9sbC50b2dnbGVDbGFzcyhcInNob3dMaXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicHItb3BlblwiOi8v5rua5YqoXHJcbiAgICAgICAgICAgICAgICBldmUucGFyZW50Tm9kZS5jbGFzc05hbWUgPT0gXCJsYXl1aS1sYXllci1zZXR3aW5cIiAmJiByZW1vdmVyU2hvd0xpc3QoZG9tLm1ldW5Tb3JvbGwpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1ldW5Ub3AgPSBtZXVuVG9wT2JqKGRvbS5tZXVuZ3JvdXBMaXN0KTtcclxuICAgICAgICAgICAgICAgIHZhciBzSXRlbSA9ICQoZXZlKS5wYXJlbnRzKFwiLnMtaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzSHJlZiA9IHNJdGVtLmZpbmQoXCJhXCIpLmF0dHIoXCJtZW51LWlkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBkb20ubWV1bmdyb3VwTGlzdC5maW5kKFwiLmxpc3QtaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIHNJdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKCkgXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbGlzdC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpWzBdLmlkID09IHRoaXNIcmVmID8gJCh0aGlzKS5hZGRDbGFzcyhcInNlbGVjdFwiKSA6ICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzZWxlY3RcIik7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtZXVuVG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChrZXkpID09IHRoaXNIcmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIucHItbGVmdFwiKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogbWV1blRvcFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pCc57Si5p2h5LqL5Lu2XHJcbiAgICBmdW5jdGlvbiBzZXRPcGVuS2V5dXAoZG9tKXtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcmVnQ0ggPSBuZXcgUmVnRXhwKFwiW1xcXFx1NEUwMC1cXFxcdTlGRkZdK1wiLCBcImdcIik7XHJcbiAgICAgICAgIHZhciBrZXlVcExpc3QgPWRvbS5wckxlZnQuZmluZChcIiNrZXlVcExpc3RcIik7XHJcbiAgICAgICAgIHZhciBsaXN0PWRvbS5tZXVuZ3JvdXBMaXN0LmZpbmQoXCIubWVudS10ZXh0XCIpO1xyXG4gICAgICAgICAgZG9tLm1ldW5Tb3JvbGwuZmluZChcIiNzZWxlY3RJbnB1dFwiKS5rZXl1cChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHRpcCA9ICQodGhpcykubmV4dChcIi5zZWFyY2gtdGlwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGlwLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkb20ubWV1bmdyb3VwTGlzdC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5VXBMaXN0Lmh0bWwoXCJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy/ovpPlhaXmoYbkuK3msqHmnInlhoXlrrnvvIzliJnpgIDlh7pcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXAuc2hvdygpLmZpbmQoXCJzdHJvbmdcIikudGV4dCh2YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGRvbS5tZXVuZ3JvdXBMaXN0LmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBrZXlVcExpc3QuaHRtbChcIlwiKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgbGlzdC5lYWNoKGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSByZWdDSC50ZXN0KHZhbCkgPyAkKGl0ZW0pLmZpbmQoXCJhXCIpLnRleHQoKS5pbmRleE9mKHZhbCkgOiAkKGl0ZW0pLmF0dHIoXCJweS1jb2RlXCIpLmluZGV4T2YodmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ciA+PSAwICYmICQoaXRlbSkuZmluZChcImFcIikuYXR0cihcImxlYWZcIikgPT0gXCJ0cnVlXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVVwTGlzdC5hcHBlbmQoYDxkaXYgY2xhc3M9XCJwci1tZXVuLWdyb3VwXCI+PGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiPiR7aXRlbS5vdXRlckhUTUx9PC9kaXY+PC9kaXY+YClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAgIC8v6I635Y+W6I+c5Y2VdG9w5YC8XHJcbiAgICBmdW5jdGlvbiBtZXVuVG9wT2JqIChtZXVuZ3JvdXBMaXN0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbGlzdCA9IG1ldW5ncm91cExpc3QuZmluZChcIi5saXN0LWl0ZW1cIik7XHJcbiAgICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICBsaXN0LmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBpdGVtLmlkO1xyXG4gICAgICAgICAgICBvYmpba2V5XSA9IHBhcnNlSW50KGl0ZW0ub2Zmc2V0VG9wKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVyU2hvd0xpc3QoZG9tLGNsYXNzTmFtZSl7XHJcbiAgICAgICAgICAgIGlmKCFjbGFzc05hbWUpe1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2hvd0xpc3RcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwbGdTaWRlYmFyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKGRvY3VtZW50KSB7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciAkZG9tPXtcclxuICAgICAgICAgICAgc2lkZWJhcjogZG9jdW1lbnQuZmluZChcIiNzaWRlYmFyXCIpLFxyXG4gICAgICAgICAgICBsb2dvRm9sZDogZG9jdW1lbnQuZmluZChcIiNwbGctbG9nby1mb2xkXCIpLFxyXG4gICAgICAgICAgICBtZXVuU29yb2xsOiBkb2N1bWVudC5maW5kKFwiI21ldW5Tb3JvbGxcIiksXHJcbiAgICAgICAgICAgIG5hdkxhc3Q6IGRvY3VtZW50LmZpbmQoXCIjbWV1blNvcm9sbCAubmF2LWxhc3RcIiksXHJcbiAgICAgICAgICAgIGJvZHlOYXY6IGRvY3VtZW50LmZpbmQoXCIubmF2LWhvdmVyLWNoaWxkIC5sYXl1aS1zaWRlXCIpLFxyXG4gICAgICAgICAgICBtZXVuZ3JvdXBMaXN0OiBkb2N1bWVudC5maW5kKFwiLnByLW1ldW5ncm91cC1saXN0XCIpLFxyXG4gICAgICAgICAgICBwckxlZnQ6IGRvY3VtZW50LmZpbmQoXCIucHItbGVmdFwiKSxcclxuICAgICAgICAgICAgbmF2X2hvdmVyX2NoaWxkOiBkb2N1bWVudC5maW5kKFwiLm5hdi1ob3Zlci1jaGlsZFwiKSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LqL5Lu25rOo5YaMXHJcbiAgICAgICAgRXZlbnRIYW5sZGVyLmNhbGwoX3RoaXMsJGRvbSk7XHJcbiAgICAgICAgc2V0T3BlbktleXVwKCRkb20pXHJcbiAgICAgICAgcmV0dXJuIF90aGlzXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8v54aP5p+T5qih5p2/5Yiw6IqC54K5XHJcbiAgICBwbGdTaWRlYmFyLnByb3RvdHlwZS5yZW5kZXJUbyA9IGZ1bmN0aW9uIChkb21JZCkge1xyXG5cclxuICAgICAgICAgICB0aGlzLm9wdGlvbnMucmVuZGVyZXI9ZG9tSWQ7XHJcbiAgICAgICAgICAkKFwiI1wiKyB0aGlzLm9wdGlvbnMucmVuZGVyZXIpLmVtcHR5KCkuYXBwZW5kKHRoaXMuZG9jdW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9O1xyXG5cclxuICBcclxuICAgICAvL+ivt+axguaVsOaNrlxyXG4gICAgIGZ1bmN0aW9uIExvYWREYXRhKG9iamVjdCkge1xyXG4gICAgICAgICB2YXIgX3RoaXM9dGhpcztcclxuICAgICAgICAgdmFyIHJvdXRlU2V0dGluZz17fTtcclxuICAgICAgICB2YXIgY2xvc2U9UGxnRGlhbG9nLmxvYWRpbmcyKCk7XHJcbiAgICAgICAgdmFyIHRyZWVkYXRhO1xyXG4gICAgICAgIG9iamVjdC5zdWNjZXNzPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmVlZGF0YT10b1RyZWUocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLmJsYW5rKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uUFlfY29kZSA9IHBpbnlpbi5tYWtlUHkoaXRlbS5uYW1lKVswXVxyXG4gICAgICAgICAgICAgICAgICAgLy8gaXRlbS5pc0FjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmxlYWYmJml0ZW0ucGF0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Y676aaW5a2X5q+NXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJ6YWNaGFzaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighaXRlbS5oYXNoKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc2g9aXRlbS5wYXRoLnN1YnN0cigxKS5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc2g9aXRlbS5oYXNoW2l0ZW0uaGFzaC5sZW5ndGgtMl0rXCIvXCIraXRlbS5oYXNoW2l0ZW0uaGFzaC5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uaGFzaC5pbmRleE9mKFwiPVwiKSE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGFzaD0gaXRlbS5oYXNoLm1hdGNoKFwiKFtePV0rKSRcIilbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaj1yZXN1bHROYW1lKGl0ZW0ubWVudUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVTZXR0aW5nW2l0ZW0uaGFzaF09e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOml0ZW0uaWZyYW1lP2l0ZW0ucGF0aDppdGVtLnBhdGgrXCIuaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmcmFtZTppdGVtLmlmcmFtZXx8ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjppdGVtLnNyY1BhdGg/aXRlbS5zcmNQYXRoK1wiLmpzXCI6bnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOml0ZW0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51SWQ6aXRlbS5tZW51SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50X25hbWU6b2JqLmFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZUFycjpvYmouaWRhcnIgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqPW51bGw7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc3VsdE5hbWUobWlkLGFycj1bXSxpZGFycj1bXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcERhdGE9IHRyZWVkYXRhLm1hcERhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW09bWFwRGF0YVttaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICBhcnIudW5zaGlmdChpdGVtLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICBpZGFyci51bnNoaWZ0KGl0ZW0ubWVudUlkKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnBhcmVudE1lbnVJZCE9MCl7ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHROYW1lKGl0ZW0ucGFyZW50TWVudUlkLGFycixpZGFycilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7YXJyOmFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRhcnI6aWRhcnIgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgLy/ot6/nlLHphY3nva5cclxuICAgICAgICAgICAgICAgICAgIHZpcHNwYS5yb3V0ZXJNYXAgPXJvdXRlU2V0dGluZyBcclxuICAgICAgICAgICAgICAgICAgIC8vT2JqZWN0LmFzc2lnbiggdmlwc3BhLnJvdXRlck1hcCxyb3V0ZVNldHRpbmcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxheWVyLm1zZyhcIuaVsOaNruWKoOi9veWksei0pSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLFxyXG4gICAgICAgIG9iamVjdC5lcnJvcj0gZnVuY3Rpb24gKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQcm9sb2cuc3luY0FqYXgob2JqZWN0KVxyXG4gICAgICAgIHJldHVybiB0cmVlZGF0YVxyXG4gICAgfTtcclxuXHJcbiAgICAvL+i/lOWKoOagkeWei+e7k+aehOWvueixoVxyXG4gICAgZnVuY3Rpb24gdG9UcmVlKGRhdGEpIHtcclxuICAgICAgICAvLyDliKDpmaQg5omA5pyJIGNoaWxkcmVuLOS7pemYsuatouWkmuasoeiwg+eUqFxyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBkZWxldGUgaXRlbS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHlwZTtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0ucXVlcnlJZDtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0ub3BlcmF0ZVR5cGU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLmxhc3RNb2RpZnlUaW1lO1xyXG4gICAgICAgICAgICBkZWxldGUgaXRlbS5oZWxwQ29kZTtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0uY3JlYXRvck5hbWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLmNyZWF0b3JJZDtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0uY3JlYXRlVGltZTtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0ubW9kaWZpZXJJZDtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0ubW9kaWZpZXJOYW1lO1xyXG4gICAgICAgICAgICBkZWxldGUgaXRlbS5zb3J0O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlsIbmlbDmja7lrZjlgqjkuLog5LulIG1lbnVJZCDkuLogS0VZIOeahCBtYXAg57Si5byV5pWw5o2u5YiXXHJcbiAgICAgICAgdmFyIG1hcCA9IHt9O1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBtYXBbaXRlbS5tZW51SWRdID0gaXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWFwRGF0YTptYXBcclxuXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHdpbmRvdy5QbGdTaWRlQWNjb3JkaW9uUm91dGUgPSBwbGdTaWRlYmFyO1xyXG5cclxuICAgICQuZm4uaW5pdFBsZ1NpZGVBY2NvcmRpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAvKiAgdmFyIGNsb3NlTG9hZD0gbG9hZGluZygpOyAqL1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IHBsZ1NpZGViYXIodGhpcywgb3B0aW9ucyk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG59KShqUXVlcnkpOyIsIjtcclxuKGZ1bmN0aW9uICgkLCBsYXl1aSkge1xyXG5cclxuICAgIC8vUGxnVGFicy5qc1xyXG4gICAgbGF5dWkudXNlKFtcImVsZW1lbnRcIl0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGxheXVpLmVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24gKG9wdHMpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBza2luQXJyID0ge1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsOiBcImxheXVpLXRhYlwiLFxyXG4gICAgICAgICAgICAgICAgYnJpZWY6IFwibGF5dWktdGFiIGxheXVpLXRhYi1icmllZlwiLFxyXG4gICAgICAgICAgICAgICAgY2FyZDogXCJsYXl1aS10YWIgbGF5dWktdGFiLWNhcmRcIixcclxuICAgICAgICAgICAgICAgIHBsZ3RhYnM6IFwibGF5dWktdGFiIGxheXVpLXRhYi1icmllZiBwbGd0YWJzIFwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGl0ZW1saXN0ID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJwID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmEgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW54ZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnAgKz0gYDxsaSBsYXktaWQgPSAke2l0ZW0uaWR9IGNsYXNzPVwiJHtvcHRzLmluZGV4QWN0aXZlPT09aW54ZXggP1wibGF5dWktdGhpc1wiOlwiXCJ9XCIgPiR7aXRlbS50aXRsZX08L2xpPmA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYSArPSBgPGRpdiBjbGFzcz1cImxheXVpLXRhYi1pdGVtICAke29wdHMuaW5kZXhBY3RpdmU9PT1pbnhleCA/XCJsYXl1aS1zaG93XCI6XCJcIn1cIiBkYXRhLWZhZGU9XCJcIj4ke2l0ZW0udGVtcGxhdGV9PC9kaXY+YFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBycCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogcmFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGl0ZW1saXN0ID0gaXRlbWxpc3Qob3B0cy5jb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbG9zZUJ0biA9IGBcclxuICAgICAgICAgICAgPHVsIGNsYXNzPVwicGxnLXRhYi1jbG9zZS1hbGxcIiBsYXktZmlsdGVyPVwicGxnLXRhYi1jbG9zZS1hbGxcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLXRhYi1jbG9zZS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBjbGFzcz1cImxheXVpLWljb24gbGF5dWktaWNvbi1tb3JlXCI+PC9hPlxyXG4gICAgICAgICAgICAgICAgIDxkbCBjbGFzcz1cImNoaWxkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkZD48YSBocmVmPVwiamF2YXNjcmlwdDo7XCI+5YWz6Zet5YW25a6D5qCH562+6aG1PC9hPjwvZGQ+XHJcbiAgICAgICAgICAgICAgICAgIDxkZD48YSBocmVmPVwiamF2YXNjcmlwdDo7XCI+5YWz6Zet5b2T5YmN5qCH562+6aG1PC9hPjwvZGQ+XHJcbiAgICAgICAgICAgICAgICAgIDxkZD48YSBocmVmPVwiamF2YXNjcmlwdDo7XCI+5YWz6Zet5omA5pyJ5qCH562+6aG1PC9hPjwvZGQ+XHJcbiAgICAgICAgICAgICAgICA8L2RsPiAgIFxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5gO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRwID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c2tpbkFycltvcHRzLnNraW5dfVwiICR7b3B0cy5hbGxvd0Nsb3NlP2BsYXktYWxsb3dDbG9zZT1cInRydWVcImA6XCJcIn0gXHJcbiAgICAgICAgICAgICAgICAgICAgJHtvcHRzLmZpbHRlcj9gbGF5LWZpbHRlcj1cImArb3B0cy5maWx0ZXIrYFwiYDpcIlwifT5cclxuICAgICAgICAgICAgICAgICAgICAke29wdHMuY2xvc2VBbGw/Y2xvc2VCdG46XCJcIn1cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJsYXl1aS10YWItdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS10YWItY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgICAgcmV0dXJuICQodHApXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHZhciBwbGdUYWJzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgX3RoaXMucHJlSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgIHRpbWU6IDEwMCxcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBcInBsZ1RhYnMtXCIgKyBQcm9sb2cuY3JlYXRlUmFuZG9tSWQoKSwgLy/pgInmi6nlmahcclxuICAgICAgICAgICAgICAgIGluZGV4QWN0aXZlOiAwLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VBbGw6IGZhbHNlLCAvL+aYr+WQpuaYvuekuuWFs+mXreWFqOmDqOaMiemSrlxyXG4gICAgICAgICAgICAgICAgc2tpbjogXCJicmllZlwiLFxyXG4gICAgICAgICAgICAgICAgZmFkZUluOiBmYWxzZSwgLy/mmK/lkKblvIDlkK/mu5HliqjliIfmjaJcclxuICAgICAgICAgICAgICAgIGFsbG93Q2xvc2U6IGZhbHNlLCAvL+aYr+WQpuW4puWIoOmZpFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogW1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOm51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6XCJsYXktXCIrIFByb2xvZy5jcmVhdGVSYW5kb21JZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOm51bGwgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZWxlLCBvcHQ7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5pWw5o2u5YWl5Y+jXHJcbiAgICAgICAgICAgIG9wdCA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQgPT09IFwib2JqZWN0XCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vcHRzID0gJC5leHRlbmQodHJ1ZSwgY29uZmlnLCBvcHQpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RWxlbWVudCA9IHRlbXBsYXRlKF90aGlzLm9wdHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v5pi+56S65Y+z6L655Y+v5YWz6Zet5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMub3B0cy5jbG9zZUFsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIucGxnLXRhYi1jbG9zZS1hbGxcIikuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoXCIuY2hpbGRcIikuc2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKFwiLmNoaWxkXCIpLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIucGxnLXRhYi1jbG9zZS1hbGwgLmNoaWxkXCIpLm9uKCdjbGljaycsIFwiZGRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2EgPSAkKHRoaXMpLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGkgPSAkKHRoaXMpLnBhcmVudHMoXCIucGxnLXRhYi1jbG9zZS1hbGxcIikubmV4dCgpLmNoaWxkcmVuKCdsaScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGkuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHRoaXMuaW5kZXgoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJHRoaXMuaGFzQ2xhc3MoXCJsYXl1aS10aGlzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlVGFicygkdGhpcy5hdHRyKFwibGF5LWlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlVGFicygkdGhpcy5hdHRyKFwibGF5LWlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9hID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRlbGV0ZVRhYnMoJHRoaXMuYXR0cihcImxheS1pZFwiKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cyhcIi5jaGlsZFwiKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3RoaXMub3B0cy5yZW5kZXJlciAmJiBfdGhpcy5yZW5kZXJUbyh0aGlzLm9wdHMucmVuZGVyZXIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHBsZ1RhYnMucHJvdG90eXBlLnJlbmRlclRvID0gZnVuY3Rpb24gKGVsZSkge1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgZWxlKS5hcHBlbmQodGhpcy5nZXRFbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpc1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMuY29udGVudC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHllcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLm9wdHMuaW5kZXhBY3RpdmUgPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeWVzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeWVzKVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWRkVGFicyhpdGVtLCB5ZXMpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdmFyIG9saSA9IHRoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLXRhYi10aXRsZSA+IGxpXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBsYXlpZCA9IG9saS5lcShfdGhpcy5vcHRzLmluZGV4QWN0aXZlKS5hdHRyKFwibGF5LWlkXCIpO1xyXG4gICAgICAgICAgICBfdGhpcy5jaGFuZ2VUYWJzKGxheWlkKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW5kZXIoXCJuYXZcIik7XHJcbiAgICAgICAgICAgIC8v5riy5p+T5Yiw6aG16Z2iXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW5kZXIoXCJ0YWJcIiwgdGhpcy5vcHRzLmZpbHRlcik7XHJcbiAgICAgICAgICAgIC8v6K6h566X5oC75a695bqm5b6X5YiwbGnnmoTmlbDph49cclxuICAgICAgICAgICAgdGhpcy5vbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXROdW0odGl0bGVPYmopIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gdGl0bGVPYmoud2lkdGgoKSAtIDE1O1xyXG4gICAgICAgICAgICB2YXIgY291bnQwMSA9IHRpdGxlT2JqLmZpbmQoXCJsaVwiKS5lcSgwKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIHZhciBjb3VudDAyID0gdGl0bGVPYmoucHJldigpID8gdGl0bGVPYmoucHJldigpLm91dGVyV2lkdGgoKSA6IDA7XHJcbiAgICAgICAgICAgIHZhciBsaXcgPSAxNDA7XHJcbiAgICAgICAgICAgIHZhciBsaU51bSA9IE1hdGguZmxvb3IoY291bnQgLSBjb3VudDAxIC0gY291bnQwMikgLyBsaXc7XHJcbiAgICAgICAgICAgIC8vLyAvL2NvbnNvbGUubG9nKCdjb3VudCA6JyxNYXRoLmZsb29yKGxpTnVtKSApO1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihsaU51bSlcclxuICAgICAgICB9O1xyXG5cclxuIFxyXG5cclxuICAgICAgICB2YXIgcGluZGV4ID0gLTE7XHJcblxyXG4gICAgICAgIC8v5Yqo5oCB5re75YqgdGFic3NcclxuICAgICAgICBwbGdUYWJzLnByb3RvdHlwZS5hZGRUYWJzID0gZnVuY3Rpb24gKG9iaiwgYm9vbGUpIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlTG9hZCA9IFBsZ0RpYWxvZy5sb2FkaW5nMigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgb2JqLnRpdGxlID0gYDxzcGFuIGNsYXNzPVwibmFtZVwiPiR7b2JqLnRpdGxlfTwvc3Bhbj5gXHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZighYm9vbGUpe1xyXG4gICAgICAgICAgICAgICAgYm9vbGU9bnVsbFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXNDaGFuZ2UgPSBib29sZSA7XHJcblxyXG5cclxuICAgICAgICAgICAgLy/lsIbkuIrmrKHnmoTpgInkuK3nmoTkuIvmoIflrZjkuIvmnaUgIFxyXG4gICAgICAgICAgICB0aGlzLnByZUluZGV4ID0gdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLXRpdGxlIGxpLmxheXVpLXRoaXNcIikuaW5kZXgoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBvbGkgPSB0aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItdGl0bGUgbGlcIik7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN55qEbGnmlbDph49cclxuICAgICAgICAgICAgdmFyIGN1ckxpID0gTnVtYmVyKG9saS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmluZSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBgPHNwYW4gY2xhc3M9XCJuYW1lXCI+5paw5qCH6aKYPC9zcGFuPmAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibGF5LVwiICsgUHJvbG9nLmNyZWF0ZVJhbmRvbUlkKCksXHJcbiAgICAgICAgICAgICAgICBpZnJhbWU6ZmFsc2UsXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBvcHRzID0gJC5leHRlbmQodHJ1ZSwgZGVmaW5lLCBvYmopO1xyXG5cclxuICAgIFxyXG4gICAgICAgICAgICBpZiAob3B0cy51cmwmJiFvcHRzLmlmcmFtZSkgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFByb2xvZy5hamF4KHtcclxuXHQgICAgICAgICAgICAgICAgdHlwZTogXCJnZXRcIixcclxuXHQgICAgICAgICAgICAgICAgdXJsOiBvcHRzLnVybCxcclxuXHQgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwiaHRtbFwiLFxyXG5cdCAgICAgICAgICAgICAgICBzdWNjZXNzOiByZWFuZFRwbCxcclxuXHQgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuXHQgICAgICAgICAgICAgICAgICAgbGF5ZXIubXNnKFwi5pWw5o2u6K+35rGC5aSx6LSlXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAgICBjbG9zZUxvYWQoKVxyXG5cdCAgICAgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYob3B0cy50ZW1wbGF0ZSYmIW9wdHMuaWZyYW1lKXtcclxuICAgICAgICAgICAgICAgIHJlYW5kVHBsKG9wdHMudGVtcGxhdGUpXHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vaWZyYW1l5Li6dHJ1ZVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgb3B0cy50ZW1wbGF0ZT1gPGlmcmFtZSBjbGFzcz1cInBsZy1pZnJhbWVDbGFzc1wiIGZyYW1lYm9yZGVyPVwibm9cIiBzcmM9XCIke29wdHMudXJsfVwiPjwvaWZyYW1lPmBcclxuICAgICAgICAgICAgICAgIHJlYW5kVHBsKG9wdHMudGVtcGxhdGUpXHJcbiAgICAgICAgICAgICAgICBjbG9zZUxvYWQoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgX3RoaXMucHJlSW5kZXggPSBwaW5kZXggPSBfdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLXRpdGxlPi5sYXl1aS10aGlzXCIpLmluZGV4KCk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVhbmRUcGwgKGRhdGEpIHtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuY29udGVudD1kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmVsZW1lbnQudGFiQWRkKF90aGlzLm9wdHMuZmlsdGVyLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2hhbmdlICYmIF90aGlzLmNoYW5nZVRhYnMob3B0cy5pZCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUubmFtZSArIFwiOiBcIiArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgIF90aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItY29udGVudCAubGF5dWktdGFiLWl0ZW1cIikuYXR0cihcImRhdGEtZmFkZVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpTnVtID0gZ2V0TnVtKF90aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItdGl0bGVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAoY3VyTGkgPiBsaU51bSAmJiBvbGkuZXEoMSkpICYmIF90aGlzLmRlbGV0ZVRhYnMob2xpLmVxKDEpLmF0dHIoXCJsYXktaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICBjbG9zZUxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgIC8vICBsYXllci5jbG9zZShsb2FkaW5nKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL+WIh+aNouWIsOaMh+WumnRhYnNzXHJcbiAgICAgICAgcGxnVGFicy5wcm90b3R5cGUuY2hhbmdlVGFicyA9IGZ1bmN0aW9uIChsYXlpZCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBpZFxyXG4gICAgICAgICAgICB2YXIgcmVnID0gL15bMC05XSsuP1swLTldKiQvO1xyXG4gICAgICAgICAgICB2YXIgZWxlT2JqXHJcbiAgICAgICAgICAgIGlmIChyZWcudGVzdChsYXlpZCkpIHtcclxuICAgICAgICAgICAgICAgIC8v6YCa6L+H5LiL5qCH5om+5YiwbGF5aWRcclxuICAgICAgICAgICAgICAgIGVsZU9iaiA9IHRoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLXRhYi10aXRsZT5saVwiKS5lcShsYXlpZCk7XHJcbiAgICAgICAgICAgICAgICBpZCA9IGVsZU9iai5hdHRyKFwibGF5LWlkXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWQgPSBsYXlpZDtcclxuICAgICAgICAgICAgICAgIGVsZU9iaiA9IHRoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLXRhYi10aXRsZT5saVtsYXktaWQ9J1wiICsgaWQgKyBcIiddXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGluZGV4ID0gdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLXRpdGxlPi5sYXl1aS10aGlzXCIpLmluZGV4KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50YWJDaGFuZ2UodGhpcy5vcHRzLmZpbHRlciwgaWQpO1xyXG5cclxuICAgICAgICAgICAgLy/orrDlvZXkuIrkuIDmrKHkuIvmoIdcclxuICAgICAgICAgICAgdGhpcy5wcmVJbmRleCA9IHBpbmRleDtcclxuICAgICAgICAgICAgLy/mmK/lkKblvIDlkK/mu5HliqjliIfmjaJcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZmFkZUluKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLWNvbnRlbnQgPi5sYXl1aS10YWItaXRlbVwiKS5hdHRyKFwiZGF0YS1mYWRlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0bWUgPSB0aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItY29udGVudCA+LmxheXVpLXRhYi1pdGVtLmxheXVpLXNob3dcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpdG1lLmluZGV4KCkgPiB0aGlzLnByZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIj0+XCIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0bWUuYXR0cihcImRhdGEtZmFkZVwiLCBcImxlZnRcIik7O1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRtZS5pbmRleCgpID09IHRoaXMucHJlSW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCI8PVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC50YWJDaGFuZ2UodGhpcy5vcHRzLmZpbHRlciwgaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0bWUuYXR0cihcImRhdGEtZmFkZVwiLCBcInJpZ2h0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdG1lLmF0dHIoXCJkYXRhLWZhZGVcIiwgXCJcIilcclxuXHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLm9wdHMudGltZSlcclxuXHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVsZU9iailcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/liKDpmaTmjIflrpp0YWJzc1xyXG4gICAgICAgIHBsZ1RhYnMucHJvdG90eXBlLmRlbGV0ZVRhYnMgPSBmdW5jdGlvbiAobGF5aWQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRhYkRlbGV0ZSh0aGlzLm9wdHMuZmlsdGVyLCBsYXlpZCk7IC8v5Yig6Zmk77yaXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHBsZ1RhYnMucHJvdG90eXBlLmVsZW1lbnQgPSBsYXl1aS5lbGVtZW50O1xyXG5cclxuICAgICAgICBwbGdUYWJzLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZXZlbnROYW1lKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbihldmVudE5hbWUgKyBcIihcIiArIHRoaXMub3B0cy5maWx0ZXIgKyBcIilcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnByZUluZGV4ID0gZGF0YS5pbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbihcInRhYihcIiArIHRoaXMub3B0cy5maWx0ZXIgKyBcIilcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wcmVJbmRleCA9IGRhdGEuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpc1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgd2luZG93LlBsZ1RhYnMgPSBwbGdUYWJzO1xyXG5cclxuICAgICAgICAkLmZuLmluaXRQbGdUYWJzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcGxnVGFicyhvcHRpb25zKS5yZW5kZXJUbyhpZCk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxufSkoalF1ZXJ5LCBsYXl1aSk7IiwiO1xyXG4oZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgICAvL1BsZ1p0cmVlLmpzXHJcblxyXG5cclxuICAgIHZhciB0cmVlID0gJC5mbi56VHJlZTtcclxuXHJcbiAgICAgICAgIFxyXG4gICAgdmFyIGdldERhdGEgPSBmdW5jdGlvbiAob3B0cykge1xyXG4gICAgICAgIHZhciBjbG9zZSA9IFByb2xvZy5sb2FkaW5nMigpO1xyXG4gICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICAvL+mFjee9rnRyZWVcclxuICAgICAgICBvcHRzLnN1Y2Nlc3M9ZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Y+q5oqK54i26IqC54K55ou/5Ye65p2lXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gcmVzLmRhdGEubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNQYXJlbnQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXllci5tc2coXCLmlbDmja7liqDovb3lpLHotKUhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2xvc2UoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRzLmVycm9yPWZ1bmN0aW9uKCl7ICAgICAgXHJcbiAgICAgICAgICAgIGNsb3NlKClcclxuICAgICAgICAgfVxyXG4gICAgICAgIFByb2xvZy5zeW5jQWpheChvcHRzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9ialxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBFeHBhbmQoZXZlbnQsIHRyZWVJZCwgdHJlZU5vZGUpIHtcclxuICAgICAgICAvL+WmguaenOaYr+S4gOe6p+eItuiPnOWNlVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRyZWVJZClcclxuICAgICAgICBpZiAoIXRyZWVOb2RlLnRJZCkge1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmdldFpUcmVlT2JqKHRyZWVJZCk7XHJcbiAgICAgICAgICAgIHZhciBOT2RlcyA9IG9iai5nZXROb2RlcygpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gTk9kZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZCA9IE5PZGVzW2tleV1cclxuICAgICAgICAgICAgICAgIGlmICh0ZC50SWQgIT0gdHJlZU5vZGUudElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmV4cGFuZE5vZGUodGQsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmV4cGFuZE5vZGUodGQsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIHBsZ1p0cmVlID0gZnVuY3Rpb24gKGVsZSwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgaW5pdEFqYXg6bnVsbCxcclxuICAgICAgICAgICAgc2tpbjogXCJcIixcclxuICAgICAgICAgICAgdG9vbEJhcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2xCYXIyOntcclxuICAgICAgICAgICAgICAgIGlzU2hvdzpmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJ0bjpudWxsLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZW5kZXJlcjogbnVsbCxcclxuICAgICAgICAgICAgc2V0RGF0YTpudWxsLFxyXG4gICAgICAgICAgICBpc0V4cGFuZDpmYWxzZSxcclxuICAgICAgICAgICAgc2V0dGluZzoge1xyXG4gICAgICAgICAgICAgICAgdHJlZUlkOiBQcm9sb2cuY3JlYXRlUmFuZG9tSWQoKSxcclxuICAgICAgICAgICAgICAgIHZpZXc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE11bHRpOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJuYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZEtleTogXCJtZW51SWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcElkS2V5OiBcInBhcmVudE1lbnVJZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290UElkOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdpZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgLy8gb25FeHBhbmQ6IEV4cGFuZCxcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBlbGUsIG9wdCwgb2JqZWN0O1xyXG4gICAgICAgIC8v6I635Y+W5pWw5o2u5YWl5Y+jXHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgb3B0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub3B0cyA9ICQuZXh0ZW5kKHRydWUsIGNvbmZpZywgb3B0KTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHQuc2V0dGluZyAmJiBvcHQuc2V0dGluZy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0LnNldHRpbmcuY2FsbGJhY2sub25FeHBhbmQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcHRzLnNldHRpbmcuY2FsbGJhY2sub25FeHBhbmQgPSBmdW5jdGlvbiAoZXZlbnQsIHRyZWVJZCwgdHJlZU5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV4cGFuZC5iaW5kKF90aGlzKShldmVudCwgdHJlZUlkLCB0cmVlTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHQuc2V0dGluZy5jYWxsYmFjay5vbkV4cGFuZChldmVudCwgdHJlZUlkLCB0cmVlTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgaWYoICFfdGhpcy5vcHRzLnNldERhdGUgJiZfdGhpcy5vcHRzLmluaXRBamF4ICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF90aGlzLm9wdHMuc2V0RGF0YSA9IGdldERhdGEoX3RoaXMub3B0cy5pbml0QWpheCk7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGVsZSA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgb3B0ID0gYXJndW1lbnRzWzFdO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgX3RoaXMub3B0cy5yZW5kZXJlciAmJiBfdGhpcy5yZW5kZXJUbyh0aGlzLm9wdHMucmVuZGVyZXIpXHJcblxyXG4gICAgICAgIC8v5rGC54i257qnZGl255qE6auY5bqm5YC8XHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQod2luZG93Lm9ucmVzaXplPWZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBwT2JqPSAkKFwiI1wiK190aGlzLm9wdHMucmVuZGVyZXIpO1xyXG4gICAgICAgICAgICB2YXIgdG9vbGJhckJ0bkhlaWdodD0wO1xyXG4gICAgICAgICAgICBpZihfdGhpcy50b29sYmFyQnRuMil7XHJcbiAgICAgICAgICAgICAgICB0b29sYmFyQnRuSGVpZ2h0PSBfdGhpcy50b29sYmFyQnRuMi5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcGFyZW50SGVpZ2h0PSBwYXJzZUludChwT2JqLnBhcmVudCgpLmhlaWdodCgpLXRvb2xiYXJCdG5IZWlnaHQpO1xyXG4gICAgICAgICAgICBwT2JqLmZpbmQoXCIuenRyZWVcIikuY3NzKHtcIndpZHRoXCI6XCIxMDAlXCIsXCJoZWlnaHRcIjpwYXJlbnRIZWlnaHQsXCJvdmVyZmxvdy15XCI6IFwiYXV0b1wiLFwicGFkaW5nLWJvdHRvbVwiOlwiMjBweFwifSlcclxuICAgICAgICB9LDApXHJcbiAgICAgICAgXHJcbiAgIFxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy/lhYvpmoZ0cmVlIOeahOaWueazlVxyXG4gICAgZm9yICh2YXIga2V5IGluIHRyZWUpIHtcclxuICAgICAgICBwbGdadHJlZS5wcm90b3R5cGVba2V5XSA9IHRyZWVba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBwbGdadHJlZS5wcm90b3R5cGUucmVuZGVyVG8gPSBmdW5jdGlvbiAoZWxlKSB7XHJcbiAgICBcdCQoXCIjXCIgKyBlbGUpLmVtcHR5KCk7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLm9wdHMuc2tpbiAmJiAkKFwiI1wiICsgZWxlKS5hZGRDbGFzcyh0aGlzLm9wdHMuc2tpbik7XHJcblxyXG4gICAgICAgIHZhciBvYmpVbCA9ICQoXCI8dWw+XCIsIHtcclxuICAgICAgICAgICAgY2xhc3M6IFwienRyZWVcIixcclxuICAgICAgICAgICAgaWQ6IF90aGlzLm9wdHMuc2V0dGluZy50cmVlSWRcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudHJlZU9iaiA9IHRoaXMuaW5pdChvYmpVbCwgdGhpcy5vcHRzLnNldHRpbmcsIHRoaXMub3B0cy5zZXREYXRhKTtcclxuICAgICAgICAvL+m7mOiupOWxleW8gOesrOS4gOS4quiPnOWNlVxyXG4gICAgICAgIHRoaXMub3B0cy5pc0V4cGFuZCYmIHRoaXMudHJlZU9iai5leHBhbmROb2RlKHRoaXMudHJlZU9iai5nZXROb2RlcygpWzBdLCB0cnVlLCBmYWxzZSwgdHJ1ZSx0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy50b29sQmFyKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnRvb2xiYXJCdG4gPSBidG5Hcm91cChfdGhpcyk7XHJcbiAgICAgICAgICAgICQoXCIjXCIgKyBlbGUpLmFwcGVuZChfdGhpcy50b29sYmFyQnRuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy50b29sQmFyMi5pc1Nob3cgJiYgdGhpcy5vcHRzLnRvb2xCYXIyLmJ0biYmdGhpcy5vcHRzLnRvb2xCYXIyLmJ0bi5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICBfdGhpcy50b29sYmFyQnRuMiA9IGJ0bkdyb3VwMihfdGhpcyk7XHJcbiAgICAgICAgICAgICQoXCIjXCIgKyBlbGUpLmFwcGVuZChfdGhpcy50b29sYmFyQnRuMik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjXCIgKyBlbGUpLmFwcGVuZChvYmpVbCk7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfTtcclxuICAgIHZhciBuZXdDb3VudCA9IDE7XHJcblxyXG4gICAvKiAgcGxnWnRyZWUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgLy8gIHZhciB0b29sYmFyQnRuID0gYnRuR3JvdXAoKTtcclxuICAgICAgICB2YXIgelRyZWUgPSB0aGlzLnRyZWVPYmo7XHJcbiAgICAgICAgaWYoZXZlbnROYW1lPT1cImFkZFRyZWVOb2RlQ2xpY2tcIil7XHJcbiAgICAgICAgICAgIHZhciBhZGRCdG4gPSB0aGlzLnRvb2xiYXJCdG4uY2hpbGRyZW4oKS5lcSgyKTtcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgYWRkQnRuLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSB6VHJlZS5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgICAgIHZhciB0cmVlTm9kZSA9IG5vZGVzO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhldmVudCwgelRyZWUsIHRyZWVOb2RlKVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB9ZWxzZSBpZihldmVudE5hbWU9PVwiZGVsVHJlZU5vZGVDbGlja1wiKXtcclxuICAgICAgICAgICAgdmFyIGRlbEJ0biA9IHRoaXMudG9vbGJhckJ0bi5jaGlsZHJlbigpLmVxKDApO1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBkZWxCdG4uY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlcyA9IHpUcmVlLmdldFNlbGVjdGVkTm9kZXMoKTtcclxuICAgICAgICAgICAgdmFyIHRyZWVOb2RlID0gbm9kZXM7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50LCB6VHJlZSwgdHJlZU5vZGUpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1lbHNlIGlmKGV2ZW50TmFtZT09XCJlZGl0VHJlZU5vZGVDbGlja1wiKXtcclxuICAgICAgICAgICAgdmFyIGRlbEJ0biA9IHRoaXMudG9vbGJhckJ0bi5jaGlsZHJlbigpLmVxKDEpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBkZWxCdG4uY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZXMgPSB6VHJlZS5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJlZU5vZGUgPSBub2RlcztcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50LCB6VHJlZSwgdHJlZU5vZGUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfTsgKi9cclxuXHJcbiAgICB2YXIgbm9kZU9iaiA9IHtcclxuICAgICAgICBpZDogUHJvbG9nLmNyZWF0ZVJhbmRvbUlkKCksXHJcbiAgICAgICAgbmFtZTogXCLmlrDoj5zljZVcIixcclxuICAgICAgICBzeXN0ZW1JZDogbnVsbCxcclxuICAgICAgICBtZW51SWQ6IFwibTAwXCIgKyBQcm9sb2cuY3JlYXRlUmFuZG9tSWQoKSxcclxuICAgICAgICBwYXJlbnRNZW51SWQ6IG51bGwsXHJcbiAgICAgICAgb3BlcmF0ZVR5cGU6IDAsXHJcbiAgICAgICAgbGV2ZWw6IDEsXHJcbiAgICAgICAgZW5hYmxlOiB0cnVlLFxyXG4gICAgICAgIGxlYWY6IGZhbHNlLFxyXG4gICAgICAgIHBhdGg6IFwiXCIsXHJcbiAgICAgICAgc29ydDogMCxcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGJ0bkdyb3VwMihfdGhpcyl7XHJcbiAgICAgICAgdmFyIG9iaj1fdGhpcy5vcHRzLnRvb2xCYXIyLmJ0bjtcclxuICAgICAgICB2YXIgYnRuID0gJChgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvb2xiYXIgbGF5dWktcm93IGxheXVpLWNvbC1zcGFjZTEwIGNsXCI+XHJcbiAgICAgICAgICR7b2JqLm1hcChmdW5jdGlvbihpdGVtKXtcclxuXHJcbiAgICAgICAgICAgcmV0dXJuYDxkaXYgY2xhc3M9XCJob29rIGxheXVpLWNvbC1tZCR7MTIvb2JqLmxlbmd0aH1cIj5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJsYXl1aS1idG4gJHtpdGVtLnNraW4/aXRlbS5za2luOicnfVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCIke2l0ZW0uaWNvbn1cIj48L2k+JHtpdGVtLnRleHR9PC9hPlxyXG4gICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgICB9KS5qb2luKFwiXCIpfSAgIFxyXG4gICAgICAgIFxyXG4gICAgICA8L2Rpdj5gKTtcclxuICAgICAgdmFyIHpUcmVlID0gX3RoaXMudHJlZU9iajtcclxuXHJcbiAgICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xyXG4gICAgICAgIGJ0bi5maW5kKFwiLmhvb2tcIikuZXEoaW5kZXgpLmZpbmQoJ2EnKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGVzID0gelRyZWUuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgICAgICAgICB2YXIgdHJlZU5vZGUgPSBub2RlcztcclxuICAgICAgICAgICAgaXRlbS5FdmVudENhbGxiYWNrICYmaXRlbS5FdmVudENhbGxiYWNrKGV2ZW50LCB6VHJlZSwgdHJlZU5vZGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICBcclxuXHJcbiAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gYnRuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJ0bkdyb3VwKF90aGlzKSB7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICB2YXIgYnRuID0gJChgXHJcblxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sYmFyIGxheXVpLXJvdyBsYXl1aS1jb2wtc3BhY2UxMCBjbFwiPlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWNvbC1tZDRcIj5cclxuICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxheXVpLWJ0biBsYXl1aS1idG4tcHJpbWFyeVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5cclxuICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImxheXVpLWljb24gbGF5dWktaWNvbi1kZWxldGVcIj48L2k+5Yig6ZmkXHJcbiAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktY29sLW1kNFwiPlxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIDxhIGNsYXNzPVwibGF5dWktYnRuIGxheXVpLWJ0bi1wcmltYXJ5XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiID5cclxuICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImxheXVpLWljb24gbGF5dWktaWNvbi1lZGl0XCI+PC9pPue8lui+kTwvYT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1jb2wtbWQ0XCI+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxheXVpLWJ0biAgbGF5dWktYnRuLW5vcm1hbFwiICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLWFkZC0xXCI+PC9pPuWinuWKoFxyXG4gICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgXHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGApO1xyXG5cclxuICAgICAgICByZXR1cm4gYnRuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5re75Yqg6I+c5Y2VXHJcbiAgICBmdW5jdGlvbiBhZGQoZXZlbnQpIHtcclxuICAgICAgICB2YXIgelRyZWUgPSB0aGlzLnRyZWVPYmo7XHJcbiAgICAgICAgdmFyIG5vZGVzID0gelRyZWUuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgICAgIHZhciB0cmVlTm9kZSA9IG5vZGVzWzBdO1xyXG4gICAgICAgIG5vZGVPYmoucGFyZW50TWVudUlkID0gdHJlZU5vZGUubWVudUlkO1xyXG4gICAgICAgIHRyZWVOb2RlID0gelRyZWUuYWRkTm9kZXModHJlZU5vZGUsIG5vZGVPYmopO1xyXG4gICAgICAgIHpUcmVlLnNlbGVjdE5vZGUodHJlZU5vZGVbMF0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWwoZXZlbnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMpXHJcbiAgICAgICAgdmFyIHpUcmVlID0gdGhpcy50cmVlT2JqO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuUGxnWnRyZWUgPSBwbGdadHJlZVxyXG5cclxuXHJcbn0pKGpRdWVyeSk7IiwibGF5dWkuZGVmaW5lKCdmb3JtJywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcclxuICB2YXIgJCA9IGxheXVpLiQsXHJcbiAgICBmb3JtID0gbGF5dWkuZm9ybSxcclxuICAgIGhpbnQgPSBsYXl1aS5oaW50KCksXHJcbiAgICAvLyDlrZfnrKbluLjph49cclxuICAgIE1PRF9OQU1FID0gJ3NlbGVjdFBsdXMnLFxyXG4gICAgU0VMRUNUID0gJ2xheXVpLWZvcm0tc2VsZWN0JyxcclxuICAgIFNFTEVDVEVEID0gJ2xheXVpLWZvcm0tc2VsZWN0ZWQnLFxyXG5cclxuICAgIHNlbGVjdFBsdXMgPSB7XHJcbiAgICAgIGluZGV4OiBsYXl1aS5zZWxlY3RQbHVzID8gbGF5dWkuc2VsZWN0UGx1cy5pbmRleCA6IDAsXHJcblxyXG4gICAgICAvLyDorr7nva7lhajlsYDpoblcclxuICAgICAgc2V0OiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGF0LmNvbmZpZyA9ICQuZXh0ZW5kKHt9LCB0aGF0LmNvbmZpZywgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDkuovku7bnm5HlkKxcclxuICAgICAgb246IGZ1bmN0aW9uIChldmVudHMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIGxheXVpLm9uZXZlbnQuY2FsbCh0aGlzLCBNT0RfTkFNRSwgZXZlbnRzLCBjYWxsYmFjayk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g5pON5L2c5b2T5YmN5a6e5L6LXHJcbiAgICB0aGlzSW5zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgb3B0aW9ucyA9IHRoYXQuY29uZmlnO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAvLyDojrflj5bmlbDmja5cclxuICAgICAgICBnZXRDaGVja2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhhdC5nZXRDaGVja2VkLmNhbGwodGhhdCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDphY3nva7mlbDmja5cclxuICAgICAgICBjb25maWc6IG9wdGlvbnNcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmnoTpgKDlmahcclxuICAgIENsYXNzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGF0LmluZGV4ID0gKytzZWxlY3RQbHVzLmluZGV4O1xyXG4gICAgICB0aGF0LmNvbmZpZyA9ICQuZXh0ZW5kKHt9LCB0aGF0LmNvbmZpZywgc2VsZWN0UGx1cy5jb25maWcsIG9wdGlvbnMpO1xyXG4gICAgICB0aGF0LnJlbmRlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmuLLmn5NpbnB1dFRhZ3NcclxuICAgIHJlbmRlcklucHV0VGFncyA9IGZ1bmN0aW9uKGVsLCBkYXRhKXtcclxuICAgICAgXHJcbiAgICAgIHZhciB0ZW1TdHIgPSAnJztcclxuICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCl7XHJcbiAgICAgICAgdGVtU3RyICs9IGA8c3Bhbj5cclxuICAgICAgICAgIDxlbT4ke3ZhbH08L2VtPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiPsOXPC9idXR0b24+XHJcbiAgICAgICAgPC9zcGFuPmA7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJChlbCkuc2libGluZ3MoJy5wbGctc2VsZWN0LXRhZ3MnKS5odG1sKHRlbVN0cik7XHJcbiAgICB9O1xyXG5cclxuICAvL+m7mOiupOmFjee9rlxyXG4gIENsYXNzLnByb3RvdHlwZS5jb25maWcgPSB7XHJcbiAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgdmFsdWVTZXBhcmF0b3I6ICcvJyxcclxuICAgIGxhYmVsU2VwYXJhdG9yOiAnICAtLS0gICcsXHJcblxyXG4gICAgZGF0YTogW10sXHJcbiAgICB2YWx1ZU5hbWU6ICd0aXRsZScsXHJcbiAgICBsYWJlbDogW10sXHJcbiAgICB2YWx1ZXM6IFtdLFxyXG5cclxuICAgIHVybDogJycsXHJcbiAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgd2hlcmU6ICcnLFxyXG4gICAgY29udGVudFR5cGU6ICcnLFxyXG4gICAgaGVhZGVyczogJycsXHJcbiAgICByZXNwb25zZTogJ2RhdGEnLFxyXG4gICAgcGFyc2VEYXRhOiBudWxsLFxyXG5cclxuICAgIGNvbmZpZzoge1xyXG4gICAgICBjaGVja2VkTmFtZTogJ1NFTEVDVFBMVVNfQ0hFQ0tFRCcsXHJcbiAgICAgIGluZGV4TmFtZTogJ1NFTEVDVFBMVVNfSU5ERVgnXHJcbiAgICB9LFxyXG5cclxuICAgIGVycm9yOiAnJ1xyXG5cclxuICB9O1xyXG4gIC8v5riy5p+T6KeG5Zu+XHJcbiAgQ2xhc3MucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgb3B0aW9ucyA9IHRoYXQuY29uZmlnO1xyXG4gICAgXHJcbiAgICB0eXBlb2YgKG9wdGlvbnMuZWwpID09PSAnc3RyaW5nJyA/IG9wdGlvbnMuZWwgPSAkKG9wdGlvbnMuZWwpOiBvcHRpb25zLmVsO1xyXG4gICAgLy8g5riy5p+T5YWD57SgXHJcbiAgICBvcHRpb25zLnJlRWxlbSA9ICQoJzxkaXYgY2xhc3M9XCJsYXl1aS11bnNlbGVjdCBsYXl1aS1mb3JtLXNlbGVjdFwiPicgK1xyXG4gICAgICAnPGRpdiBjbGFzcz1cImxheXVpLXNlbGVjdC10aXRsZVwiPicgK1xyXG4gICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCLor7fpgInmi6lcIiB2YWx1ZT1cIlwiIHJlYWRvbmx5PVwiXCIgY2xhc3M9XCJsYXl1aS1pbnB1dCBsYXl1aS11bnNlbGVjdFwiPicgK1xyXG4gICAgICAnPGkgY2xhc3M9XCJsYXl1aS1lZGdlXCI+PC9pPicgK1xyXG4gICAgICAnPC9kaXY+JyArXHJcbiAgICAgICc8ZGwgY2xhc3M9XCJsYXl1aS1hbmltIGxheXVpLWFuaW0tdXBiaXRcIj4nICtcclxuICAgICAgJzxkZCBsYXktdmFsdWU9XCJcIiBjbGFzcz1cImxheXVpLXNlbGVjdC10aXBzIGxheXVpLWhpZGVcIj7or7fpgInmi6k8L2RkPicgK1xyXG4gICAgICAnPC9kbD4nICtcclxuICAgICAgJzwvZGl2PicpO1xyXG5cclxuICAgIC8vIOS6i+S7tlxyXG4gICAgb3B0aW9ucy5yZUVsZW0uZmluZCgnLmxheXVpLXNlbGVjdC10aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICEkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKFNFTEVDVEVEKSA/ICQoZG9jdW1lbnQpLmZpbmQoJy4nICsgU0VMRUNUKS5yZW1vdmVDbGFzcyhTRUxFQ1RFRCkgOiBcIlwiO1xyXG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKFNFTEVDVEVEKTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgKCQoZS50YXJnZXQpLnBhcmVudHMoJy4nICsgU0VMRUNUKS5sZW5ndGggPD0gMCkgJiYgKG9wdGlvbnMucmVFbGVtLmhhc0NsYXNzKFNFTEVDVEVEKSkgPyBvcHRpb25zLnJlRWxlbS5yZW1vdmVDbGFzcyhTRUxFQ1RFRCk6IFwiXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAhQXJyYXkuaXNBcnJheShvcHRpb25zLnZhbHVlcykgPyBvcHRpb25zLnZhbHVlcyA9IFtvcHRpb25zLnZhbHVlc10gOiBcIlwiO1xyXG5cclxuICAgIC8vIOafpeaJviDooajljZXnmoQgZmlsdGVyXHJcbiAgICBvcHRpb25zLmZpbHRlciA9IG9wdGlvbnMuZWwucGFyZW50cygnLmxheXVpLWZvcm0nKS5hdHRyKCdsYXktZmlsdGVyJyk7XHJcblxyXG4gICAgb3B0aW9ucy5lbC5hcHBlbmQob3B0aW9ucy5yZUVsZW0pO1xyXG5cclxuICAgIGlmIChvcHRpb25zLnVybCkgeyAvLyDojrflj5blkI7nq6/mlbDmja5cclxuICAgICAgdGhpcy5wdWxsRGF0YSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhhdC5yZW5kZXJEYXRhKCk7IC8vIOaVsOaNrua4suafk1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbnMuZWwub24oJ2NsaWNrJywgJy5sYXl1aS1zZWxlY3QtdGl0bGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCflnKjmraTlpITlvIDlp4snKVxyXG4gICAgICB2YXIgJHRpdGxlID0gJCh0aGlzKSxcclxuICAgICAgICAkZGQwID0gJHRpdGxlLm5leHQoKS5maW5kKCdkZCcpLmVxKDApO1xyXG5cclxuICAgICAgaWYgKCEkZGQwLmhhc0NsYXNzKCdsYXl1aS1oaWRlJykpIHtcclxuICAgICAgICAkZGQwLmFkZENsYXNzKCdsYXl1aS1oaWRlJyk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICR0aXRsZS5maW5kKCdpbnB1dCcpLnZhbChvcHRpb25zLnZhbHVlcy5qb2luKG9wdGlvbnMudmFsdWVTZXBhcmF0b3IpKTtcclxuICAgIH0pXHJcblxyXG4gIH1cclxuXHJcbiAgQ2xhc3MucHJvdG90eXBlLnB1bGxEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICBvcHRpb25zID0gdGhhdC5jb25maWc7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiBvcHRpb25zLm1ldGhvZCB8fCAnZ2V0JyxcclxuICAgICAgdXJsOiBvcHRpb25zLnVybCxcclxuICAgICAgY29udGVudFR5cGU6IG9wdGlvbnMuY29udGVudFR5cGUsXHJcbiAgICAgIGRhdGE6IG9wdGlvbnMud2hlcmUgfHwge30sXHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyB8fCB7fSxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgIC8v5aaC5p6c5pyJ5pWw5o2u6Kej5p6Q55qE5Zue6LCD77yM5YiZ6I635b6X5YW26L+U5Zue55qE5pWw5o2uXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnBhcnNlRGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgcmVzID0gb3B0aW9ucy5wYXJzZURhdGEocmVzKSB8fCByZXNbb3B0aW9ucy5yZXNwb25zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWmguaenOaYr+aVsOe7hO+8jOWImeimhueblm9wdGlvbnMuZGF0YVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpIHtcclxuICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IHRoYXQuZm9ybWF0RGF0YShyZXMpO1xyXG4gICAgICAgICAgb3B0aW9ucy5lcnJvciA9ICcnO1xyXG4gICAgICAgICAgdGhhdC5yZW5kZXJEYXRhKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9wdGlvbnMuZXJyb3IgPSAn5pWw5o2u5qC85byP5LiN5a+5JztcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSwgbSkge1xyXG4gICAgICAgIG9wdGlvbnMuZXJyb3IgPSAn5pWw5o2u5o6l5Y+j6K+35rGC5byC5bi477yaJyArIG07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIOagvOW8j+WMluaVsOaNrlxyXG4gIENsYXNzLnByb3RvdHlwZS5mb3JtYXREYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgb3B0aW9ucyA9IHRoYXQuY29uZmlnLFxyXG4gICAgICB2YWx1ZU5hbWUgPSBvcHRpb25zLnZhbHVlTmFtZSxcclxuICAgICAgdmFsdWVzID0gb3B0aW9ucy52YWx1ZXMsXHJcbiAgICAgIGNoZWNrZWROYW1lID0gb3B0aW9ucy5jb25maWcuY2hlY2tlZE5hbWUsXHJcbiAgICAgIGluZGV4TmFtZSA9IG9wdGlvbnMuY29uZmlnLmluZGV4TmFtZTtcclxuXHJcbiAgICBsYXl1aS5lYWNoKGRhdGEsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBkYXRhW2ldID0ge1xyXG4gICAgICAgICAgdGl0bGU6IGl0ZW1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZGF0YVtpXVtpbmRleE5hbWVdID0gaTtcclxuICAgICAgaWYgKCFkYXRhW2ldW2NoZWNrZWROYW1lXSkgZGF0YVtpXVtjaGVja2VkTmFtZV0gPSBmYWxzZTtcclxuICAgICAgbGF5dWkuZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICBpZiAoZGF0YVtpXVt2YWx1ZU5hbWVdID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgZGF0YVtpXVtjaGVja2VkTmFtZV0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgdmFsdWVzLnNwbGljZSgwKTtcclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG5cclxuICAvLyDmuLLmn5PmlbDmja5cclxuICBDbGFzcy5wcm90b3R5cGUucmVuZGVyRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgIG9wdGlvbnMgPSB0aGF0LmNvbmZpZyxcclxuICAgICAgdHlwZSA9IG9wdGlvbnMudHlwZSxcclxuICAgICAgaWQgPSB0aGF0LmluZGV4LFxyXG4gICAgICBkYXRhID0gZGF0YSA/IHRoYXQuZm9ybWF0RGF0YShkYXRhKSA6IHRoYXQuZm9ybWF0RGF0YShvcHRpb25zLmRhdGEpLFxyXG5cclxuICAgIGl0ZW1zID0ge1xyXG5cclxuICAgICAgLy8g5aSa6YCJXHJcbiAgICAgIGNoZWNrYm94OiBmdW5jdGlvbiAoY29uZmlnLCBkYXRhLCBpZCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBDTEFTU05BTUUgPSAnbGF5dWktZm9ybS1jaGVja2JveCcsXHJcbiAgICAgICAgICBDSEVDS0VEID0gJ2xheXVpLWZvcm0tY2hlY2tlZCcsXHJcblxyXG4gICAgICAgICAgZWwgPSBjb25maWcucmVFbGVtLmZpbmQoJ2RsJyksXHJcbiAgICAgICAgICB2YWx1ZU5hbWUgPSBjb25maWcudmFsdWVOYW1lLFxyXG4gICAgICAgICAgY2hlY2tlZE5hbWUgPSBjb25maWcuY29uZmlnLmNoZWNrZWROYW1lLFxyXG4gICAgICAgICAgaW5kZXhOYW1lID0gY29uZmlnLmNvbmZpZy5pbmRleE5hbWUsXHJcbiAgICAgICAgICB2YWx1ZXMgPSBjb25maWcudmFsdWVzLFxyXG4gICAgICAgICAgbGFiZWwgPSBjb25maWcubGFiZWwsXHJcbiAgICAgICAgICBmaWx0ZXIgPSBjb25maWcuZmlsdGVyLFxyXG4gICAgICAgICAgbGFiZWxTZXBhcmF0b3IgPSBjb25maWcubGFiZWxTZXBhcmF0b3IsXHJcbiAgICAgICAgICB2YWx1ZVNlcGFyYXRvciA9IGNvbmZpZy52YWx1ZVNlcGFyYXRvcixcclxuXHJcbiAgICAgICAgICBzdW0gPSAwO1xyXG5cclxuXHJcbiAgICAgICAgLy8g5re75Yqg6YCJ6aG5ICAgWFhYLCDmraTlpITlj6/ku6Xkvb/nlKjkuIDmrKFzdHLvvIzlj6/ku6XoioLnnIHkuIDmrKFkb23nmoTmk43kvZxcclxuICAgICAgICBlbC5hcHBlbmQoJCgnPGRkIGxheS12YWx1ZT1cIuWFqOmAiVwiPjwvZGQ+JykpO1xyXG4gICAgICAgIGxheXVpLmVhY2goZGF0YSwgZnVuY3Rpb24gKGksIGl0ZW0pIHtcclxuICAgICAgICAgIGVsLmFwcGVuZCgkKCc8ZGQgbGF5LXZhbHVlPVwiJyArIGl0ZW1bdmFsdWVOYW1lXSArICdcIj48L2RkPicpKTtcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgdmFyIGFsbEVsZSA9IGVsLmZpbmQoJ2RkJykuZXEoMSk7XHJcblxyXG4gICAgICAgIC8vIOa3u+WKoOWkmumAieahhlxyXG5cclxuICAgICAgICBhbGxFbGUubmV4dEFsbCgpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICB2YXIgJGRkID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgaXRlbSA9IGRhdGFbaW5kZXhdLFxyXG4gICAgICAgICAgICBsYXl1aVZhbHVlID0gaXRlbVt2YWx1ZU5hbWVdLFxyXG4gICAgICAgICAgICB0aXRsZSA9IGxheXVpVmFsdWU7XHJcbiAgICAgICAgICBpZiAobGFiZWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aXRsZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxheXVpLmVhY2gobGFiZWwsIGZ1bmN0aW9uIChpLCBuKSB7XHJcbiAgICAgICAgICAgICAgdGl0bGUgKz0gaXRlbVtuXTtcclxuICAgICAgICAgICAgICBpIDwgKGxhYmVsLmxlbmd0aCAtIDEpID8gdGl0bGUgKz0gIGxhYmVsU2VwYXJhdG9yOiAnJztcclxuICAgICAgICAgICAgICAvLyBpIDwgKGxhYmVsLmxlbmd0aCAtIDEpID8gKHRpdGxlICs9ICAobGFiZWxTZXBhcmF0b3IgKyAnPC9zcGFuPicpKTogJyc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgY2hlY2tib3ggPSAkKCc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cIicgKyBNT0RfTkFNRSArICdjaGVja2JveCcgKyBpZCArICdcIiAgeXctaW5kZXg9XCInICsgaXRlbVtpbmRleE5hbWVdICsgJ1wiIGxheS1za2luPVwicHJpbWFyeVwiIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiIGxheXVpLXZhbHVlPVwiJyArIGxheXVpVmFsdWUgKyAnXCI+Jyk7XHJcblxyXG4gICAgICAgICAgaWYgKGl0ZW1bY2hlY2tlZE5hbWVdKSB7XHJcbiAgICAgICAgICAgIGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgdmFsdWVzLnB1c2gobGF5dWlWYWx1ZSk7XHJcbiAgICAgICAgICAgIHN1bSsrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgJGRkLmh0bWwoY2hlY2tib3gpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHZhciBhbGxjaGVja2JveCA9ICQoJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAgc2VsZWN0cGx1cy1hbGwgIGxheS1za2luPVwicHJpbWFyeVwiIHRpdGxlPVwi5YWo6YCJXCIgbGF5dWktdmFsdWU9XCLlhajpgIlcIj4nKTtcclxuICAgICAgICBzdW0gPT09IGRhdGEubGVuZ3RoID8gYWxsY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIHRydWUpIDogXCJcIjtcclxuICAgICAgICBhbGxFbGUuaHRtbChhbGxjaGVja2JveCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCflvIDlkK/kuobliJ3lp4vljJbmqKHlvI8nKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY29uZmlnLnRhZ3NDb250YWluZXInKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb25maWcpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb25maWcudGFnc0NvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICByZW5kZXJJbnB1dFRhZ3MoY29uZmlnLmVsLCB2YWx1ZXMpO1xyXG4gICAgICAgIGFsbEVsZS5wYXJlbnQoKS5wcmV2KCkuZmluZCgnaW5wdXQnKS52YWwodmFsdWVzLmpvaW4odmFsdWVTZXBhcmF0b3IpKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyDmt7vliqDkuovku7ZcclxuICAgICAgICBhbGxFbGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICB2YXIgJGFsbCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGNoZWNrZWQgPSBldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdERCcgPyAkYWxsLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS50b2dnbGVDbGFzcyhDSEVDS0VEKS5oYXNDbGFzcyhDSEVDS0VEKSA6ICRhbGwuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgLy8g56aB5q2i5LiL5ouJ5qGG5pS25ZueXHJcbiAgICAgICAgICAkYWxsLnBhcmVudHMoJy4nICsgU0VMRUNUKS5hZGRDbGFzcyhTRUxFQ1RFRCk7XHJcblxyXG4gICAgICAgICAgLy8g6K6+572u6YCJ5Lit54q25oCBIFxyXG4gICAgICAgICAgJGFsbC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBjaGVja2VkKTtcclxuXHJcbiAgICAgICAgICAkYWxsLm5leHRBbGwoKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRkID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgY2hlY2tlZCA/IGRkLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS5hZGRDbGFzcyhDSEVDS0VEKSA6IGRkLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS5yZW1vdmVDbGFzcyhDSEVDS0VEKTtcclxuICAgICAgICAgICAgZGQuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgY2hlY2tlZCk7XHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIC8vIOaYvuekuumAieS4reaVsOaNrlxyXG4gICAgICAgICAgbGF5dWkuZXZlbnQuY2FsbCgkYWxsLCBNT0RfTkFNRSwgJ2NoZWNrYm94JyArICcoJyArIE1PRF9OQU1FICsgJyknLCB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcclxuICAgICAgICAgICAgZWxlOiAkYWxsLFxyXG4gICAgICAgICAgICBlbGVDaGVja2VkOiBjaGVja2VkLFxyXG4gICAgICAgICAgICBpc0FsbDogY2hlY2tlZFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygn5LqL5Lu255qE55uR5ZCsLi4uLicpO1xyXG4gICAgICAgIGNvbmZpZy5lbC5zaWJsaW5ncygnLnBsZy1zZWxlY3QtdGFncycpLm9uKCdjbGljaycsICcuY2xvc2UnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfop6blj5Hngrnlh7vkuovku7YuLi4nKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ+inpuWPkeeCueWHu+S6i+S7ti4uLicpXHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygkKHRoaXMpLnNpYmxpbmdzKCdlbScpLmh0bWwoKSk7XHJcbiAgICAgICAgICAvLyBpZihlbC5maW5kKCcubGF5dWktZm9ybS1zZWxlY3QnKS5oYXNDbGFzcygnbGF5dWktZm9ybS1zZWxlY3RlZCcpKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAvLyDmraTlpITpnIDopoHliKTmlq3lvZPliY3nmoRzZWxlY3QgY2hlY2tib3jmmK/lkKblsZXlvIDvvIzlpoLmnpzlsZXlvIDliJnvvIznrKzkuIDmrKHngrnlh7vnmoTmmK/lhbPpl61cclxuXHJcbiAgICAgICAgICB2YXIgY3VycmVudEh0bWwgPSAkKHRoaXMpLnNpYmxpbmdzKCdlbScpLmh0bWwoKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCB0eXBlb2YgYWxsRWxlLm5leHRBbGwoKSk7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhbGxFbGUubmV4dEFsbCgpKTtcclxuICAgICAgICAgIHZhciBzZWxlY3RMaXN0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsRWxlLm5leHRBbGwoKSk7XHJcbiAgICAgICAgICBzZWxlY3RMaXN0LmZvckVhY2goZnVuY3Rpb24odmFsLCBpbmQpe1xyXG4gICAgICAgICAgICBpZih2YWwuaW5uZXJUZXh0ID09PSBjdXJyZW50SHRtbCl7XHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1cnJlbnRIdG1sOjonICsgY3VycmVudEh0bWwpO1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdpbmQ6OicgKyBpbmQpO1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfnq4vljbPmiafooYznmoTkuovku7YuLi4uJyk7XHJcbiAgICAgICAgICAgICAgZWwuZmluZCgnZGQnKS5lcShpbmQgKyAyKS5vZmYoKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfnq4vljbPmiafooYznmoTkuovku7YnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdpbmRleDo6JyArICQodGhpcykuaW5kZXgoKSk7XHJcbiAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmluZGV4KCkgPT09IChpbmQgKyAyKSl7XHJcbiAgICAgICAgICAgICAgICAgIHZhciAkZGQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICBjaGVja2VkID0gZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnREQnID8gJGRkLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS50b2dnbGVDbGFzcyhDSEVDS0VEKS5oYXNDbGFzcyhDSEVDS0VEKSA6ICRkZC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnKTtcclxuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+WHuuWPkeeCueWHu+S6i+S7ticpO1xyXG4gICAgICAgICAgICAgICAgICAvLyDnpoHmraLkuIvmi4nmoYbmlLblm55cclxuICAgICAgICAgICAgICAgICAgJGRkLnBhcmVudHMoJy4nICsgU0VMRUNUKS5hZGRDbGFzcyhTRUxFQ1RFRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyDorr7nva7pgInkuK3nirbmgIFcclxuICAgICAgICAgICAgICAgICAgJGRkLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWQpO1xyXG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnMjIyMicpO1xyXG4gICAgICAgICAgICAgICAgICAvLyDliKTmlq3lhajpgIlcclxuICAgICAgICAgICAgICAgICAgdmFyICRhbGwgPSAkZGQucGFyZW50cygnZGwnKS5maW5kKCdkZCcpLmVxKDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICRkZHMgPSAkYWxsLm5leHRBbGwoKSxcclxuICAgICAgICAgICAgICAgICAgICBzdW0gPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgJGRkcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcpID8gc3VtKysgOiAnJztcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJzExMTEnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT09ICRkZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+WFqOmAiScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRhbGwuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFsbC5maW5kKCcuJyArIENMQVNTTkFNRSkuYWRkQ2xhc3MoQ0hFQ0tFRCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+mdnuWFqOmAiScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRhbGwuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICRhbGwuZmluZCgnLicgKyBDTEFTU05BTUUpLnJlbW92ZUNsYXNzKENIRUNLRUQpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCcwMDAwMCcpO1xyXG4gICAgICAgICAgICAgICAgICAvLyDmmL7npLrpgInkuK3mlbDmja5cclxuICAgICAgICAgICAgICAgICAgbGF5dWkuZXZlbnQuY2FsbCgkYWxsLCBNT0RfTkFNRSwgJ2NoZWNrYm94JyArICcoJyArIE1PRF9OQU1FICsgJyknLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZTogJGRkLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZUNoZWNrZWQ6IGNoZWNrZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBbGw6IChzdW0gPT09ICRkZHMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhYWFhYScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgIH0pLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGFsbEVsZS5uZXh0QWxsKCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCduZXh0QWxsKCnmraTlpITmmK/ngrnlh7vkuovku7YnKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJCh0aGlzKSk7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbmV4dEFsbCgp5q2k5aSE5piv54K55Ye75LqL5Lu2Jyk7XHJcblxyXG4gICAgICAgICAgdmFyICRkZCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGNoZWNrZWQgPSBldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdERCcgPyAkZGQuZmluZCgnLicgKyBDTEFTU05BTUUpLnRvZ2dsZUNsYXNzKENIRUNLRUQpLmhhc0NsYXNzKENIRUNLRUQpIDogJGRkLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgIC8vIOemgeatouS4i+aLieahhuaUtuWbnlxyXG4gICAgICAgICAgJGRkLnBhcmVudHMoJy4nICsgU0VMRUNUKS5hZGRDbGFzcyhTRUxFQ1RFRCk7XHJcblxyXG4gICAgICAgICAgLy8g6K6+572u6YCJ5Lit54q25oCBXHJcbiAgICAgICAgICAkZGQuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgY2hlY2tlZCk7XHJcblxyXG4gICAgICAgICAgLy8g5Yik5pat5YWo6YCJXHJcbiAgICAgICAgICB2YXIgJGFsbCA9ICRkZC5wYXJlbnRzKCdkbCcpLmZpbmQoJ2RkJykuZXEoMSksXHJcbiAgICAgICAgICAgICRkZHMgPSAkYWxsLm5leHRBbGwoKSxcclxuICAgICAgICAgICAgc3VtID0gMDtcclxuICAgICAgICAgICRkZHMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJykgPyBzdW0rKyA6ICcnO1xyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICBpZiAoc3VtID09PSAkZGRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkYWxsLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkYWxsLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS5hZGRDbGFzcyhDSEVDS0VEKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRhbGwuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkYWxsLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS5yZW1vdmVDbGFzcyhDSEVDS0VEKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyDmmL7npLrpgInkuK3mlbDmja5cclxuICAgICAgICAgIGxheXVpLmV2ZW50LmNhbGwoJGFsbCwgTU9EX05BTUUsICdjaGVja2JveCcgKyAnKCcgKyBNT0RfTkFNRSArICcpJywge1xyXG4gICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCIsXHJcbiAgICAgICAgICAgIGVsZTogJGRkLFxyXG4gICAgICAgICAgICBlbGVDaGVja2VkOiBjaGVja2VkLFxyXG4gICAgICAgICAgICBpc0FsbDogKHN1bSA9PT0gJGRkcy5sZW5ndGgpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDmuLLmn5PlpJrpgInmoYZcclxuICAgICAgICAvLyBlbC5uZXh0KCkuZmluZCgnZGwnKS5hZGRDbGFzcygneXctc2VsZWN0UGx1cycpO1xyXG4gICAgICAgIGZvcm0ucmVuZGVyKCdjaGVja2JveCcsIGZpbHRlcik7XHJcblxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g5Y2V6YCJXHJcbiAgICAgIHJhZGlvOiBmdW5jdGlvbiAoY29uZmlnLCBkYXRhLCBpZCkge1xyXG4gICAgICAgIHZhciBDTEFTU05BTUUgPSAnbGF5dWktZm9ybS1yYWRpbycsXHJcbiAgICAgICAgICBDSEVDS0VEID0gJ2xheXVpLWZvcm0tcmFkaW9lZCcsXHJcbiAgICAgICAgICBJQ09OID0gWycmI3hlNjQzOycsICcmI3hlNjNmOyddLFxyXG4gICAgICAgICAgQ0hFQ0tFRF9JQ09OID0gJ2xheXVpLWFuaW0tc2NhbGVTcHJpbmcnLFxyXG5cclxuICAgICAgICAgIGVsSUQgPSBjb25maWcuZWwsXHJcbiAgICAgICAgICBlbCA9IGNvbmZpZy5yZUVsZW0uZmluZCgnZGwnKSxcclxuICAgICAgICAgIHZhbHVlTmFtZSA9IGNvbmZpZy52YWx1ZU5hbWUsXHJcbiAgICAgICAgICBjaGVja2VkTmFtZSA9IGNvbmZpZy5jb25maWcuY2hlY2tlZE5hbWUsXHJcbiAgICAgICAgICBpbmRleE5hbWUgPSBjb25maWcuY29uZmlnLmluZGV4TmFtZSxcclxuICAgICAgICAgIGNoZWNrZWREYXRhID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1bY2hlY2tlZE5hbWVdID09PSB0cnVlO1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICB2YWx1ZXMgPSBjb25maWcudmFsdWVzLFxyXG4gICAgICAgICAgbGFiZWwgPSBjb25maWcubGFiZWwsXHJcbiAgICAgICAgICBmaWx0ZXIgPSBjb25maWcuZmlsdGVyLFxyXG4gICAgICAgICAgbGFiZWxTZXBhcmF0b3IgPSBjb25maWcubGFiZWxTZXBhcmF0b3IsXHJcbiAgICAgICAgICB2YWx1ZVNlcGFyYXRvciA9IGNvbmZpZy52YWx1ZVNlcGFyYXRvcjtcclxuXHJcblxyXG4gICAgICAgIC8vIOa3u+WKoOmAiemhuVxyXG4gICAgICAgIGxheXVpLmVhY2goZGF0YSwgZnVuY3Rpb24gKGksIGl0ZW0pIHtcclxuICAgICAgICAgIGVsLmFwcGVuZCgnPGRkIGxheS12YWx1ZT1cIicgKyBpdGVtW3ZhbHVlTmFtZV0gKyAnXCI+PC9kZD4nKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGZvcm0ucmVuZGVyKCdzZWxlY3QnLCBvcHRpb25zLmZpbHRlcik7XHJcblxyXG5cclxuICAgICAgICAvLyDmuLLmn5PljZXpgInmoYZcclxuICAgICAgICBlbC5maW5kKCdkZCcpLmVxKDApLm5leHRBbGwoKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgdmFyICRkZCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGl0ZW0gPSBkYXRhW2luZGV4XSxcclxuICAgICAgICAgICAgbGF5dWlWYWx1ZSA9IGl0ZW1bdmFsdWVOYW1lXSxcclxuICAgICAgICAgICAgdGl0bGUgPSBsYXl1aVZhbHVlO1xyXG4gICAgICAgICAgaWYgKGxhYmVsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGl0bGUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsYXl1aS5lYWNoKGxhYmVsLCBmdW5jdGlvbiAoaSwgbikge1xyXG4gICAgICAgICAgICAgIHRpdGxlICs9IGl0ZW1bbl07XHJcbiAgICAgICAgICAgICAgaSA8IChsYWJlbC5sZW5ndGggLSAxKSA/IHRpdGxlICs9IGxhYmVsU2VwYXJhdG9yIDogJyc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIGRkID0gJCgnPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCInICsgTU9EX05BTUUgKyAncmFkaW8nICsgaWQgKyAnXCIgIHl3LWluZGV4PVwiJyArIGl0ZW1baW5kZXhOYW1lXSArICdcIiBsYXktc2tpbj1cInByaW1hcnlcIiB0aXRsZT1cIicgKyB0aXRsZSArICdcIiBsYXl1aS12YWx1ZT1cIicgKyBsYXl1aVZhbHVlICsgJ1wiPicpO1xyXG5cclxuICAgICAgICAgIGlmIChjaGVja2VkRGF0YS5sZW5ndGggPiAwICYmIGNoZWNrZWREYXRhWzBdW2luZGV4TmFtZV0gPT09IGl0ZW1baW5kZXhOYW1lXSkge1xyXG4gICAgICAgICAgICBkZC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKGxheXVpVmFsdWUpO1xyXG4gICAgICAgICAgICAkZGQucGFyZW50KCkucHJldigpLmZpbmQoJ2lucHV0JykudmFsKHZhbHVlcy5qb2luKHZhbHVlU2VwYXJhdG9yKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICRkZC5odG1sKGRkKTtcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy8gZWwubmV4dCgpLmZpbmQoJ2RsJykuYWRkQ2xhc3MoJ3l3LXNlbGVjdFBsdXMnKTtcclxuICAgICAgICBmb3JtLnJlbmRlcigncmFkaW8nLCBmaWx0ZXIpO1xyXG5cclxuICAgICAgICAvLyDkuovku7ZcclxuICAgICAgICBlbC5maW5kKCdkZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgdmFyICRkZCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAkZGQuZmluZCgnLicgKyBDTEFTU05BTUUpLmFkZENsYXNzKENIRUNLRUQpLmZpbmQoJ2knKS5hZGRDbGFzcyhDSEVDS0VEX0lDT04pLmh0bWwoSUNPTlswXSk7XHJcbiAgICAgICAgICAkZGQuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAkZGQuc2libGluZ3MoKS5maW5kKCcuJyArIENMQVNTTkFNRSkucmVtb3ZlQ2xhc3MoQ0hFQ0tFRCkuZmluZCgnaScpLnJlbW92ZUNsYXNzKENIRUNLRURfSUNPTikuaHRtbChJQ09OWzFdKTtcclxuICAgICAgICAgICRkZC5zaWJsaW5ncygpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgIC8vIOaYvuekuumAieS4reaVsOaNrlxyXG4gICAgICAgICAgbGF5dWkuZXZlbnQuY2FsbCgkZGQsIE1PRF9OQU1FLCAncmFkaW8nICsgJygnICsgTU9EX05BTUUgKyAnKScsIHtcclxuICAgICAgICAgICAgdHlwZTogXCJyYWRpb1wiLFxyXG4gICAgICAgICAgICBlbGU6ICRkZCxcclxuICAgICAgICAgICAgZWxlQ2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgaXNBbGw6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8g6YCJ5oup5pe26Kem5Y+R55qE5LqL5Lu2XHJcbiAgICBsYXl1aS5vbmV2ZW50LmNhbGwodGhhdCwgTU9EX05BTUUsIHR5cGUgKyAnKCcgKyBNT0RfTkFNRSArICcpJywgdGhhdC5jaGVja2VkLmJpbmQodGhhdCkpO1xyXG5cclxuICAgIGl0ZW1zW3R5cGVdID8gaXRlbXNbdHlwZV0ob3B0aW9ucywgZGF0YSwgaWQpIDogaGludC5lcnJvcign5LiN5pSv5oyB55qEJyArIHR5cGUgKyAn6KGo5Y2V5riy5p+TJyk7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8g6YCJ5Lit5pWw5o2u5aSE55CGXHJcbiAgQ2xhc3MucHJvdG90eXBlLmNoZWNrZWQgPSBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgIG9wdGlvbnMgPSB0aGF0LmNvbmZpZyxcclxuICAgICAgZGF0YSA9IG9wdGlvbnMuZGF0YSxcclxuICAgICAgY2hlY2tlZE5hbWUgPSBvcHRpb25zLmNvbmZpZy5jaGVja2VkTmFtZSxcclxuICAgICAgdHlwZSA9IHJlcy50eXBlLFxyXG4gICAgICBpc0FsbCA9IHJlcy5pc0FsbCxcclxuICAgICAgZWxlID0gcmVzLmVsZSxcclxuICAgICAgZWxlQ2hlY2tlZCA9IHJlcy5lbGVDaGVja2VkLFxyXG4gICAgICBmaWx0ZXIgPSBvcHRpb25zLmVsLmF0dHIoJ2xheS1maWx0ZXInKTtcclxuXHJcbiAgICBpZiAodHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICBvcHRpb25zLnZhbHVlcyA9IFtdO1xyXG4gICAgICBlbGUucGFyZW50cygnZGwnKS5maW5kKCdbdHlwZT1cImNoZWNrYm94XCJdJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIHZhciAkZGQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgeXdJbmRleCA9ICRkZC5hdHRyKCd5dy1pbmRleCcpLFxyXG4gICAgICAgICAgY2hlY2tlZCA9ICRkZC5wcm9wKCdjaGVja2VkJyk7XHJcbiAgICAgICAgeXdJbmRleCA/IGRhdGFbeXdJbmRleF1bY2hlY2tlZE5hbWVdID0gY2hlY2tlZCA6IFwiXCI7XHJcbiAgICAgICAgY2hlY2tlZCAmJiB5d0luZGV4ID8gb3B0aW9ucy52YWx1ZXMucHVzaCgkZGQuYXR0cignbGF5dWktdmFsdWUnKSkgOiBcIlwiO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8g5q2k5aSE5YGaaW5wdXTmoYbnmoTmuLLmn5Plip/og71cclxuICAgICAgcmVuZGVySW5wdXRUYWdzKGNvbmZpZy5lbCwgb3B0aW9ucy52YWx1ZXMpO1xyXG4gICAgICBlbGUucGFyZW50KCkucHJldigpLmZpbmQoJ2lucHV0JykudmFsKG9wdGlvbnMudmFsdWVzLmpvaW4ob3B0aW9ucy52YWx1ZVNlcGFyYXRvcikpO1xyXG5cclxuXHJcbiAgICAgIGxheXVpLmV2ZW50LmNhbGwoZWxlLCBNT0RfTkFNRSwgTU9EX05BTUUgKyAnKCcgKyBmaWx0ZXIgKyAnKScsIHtcclxuICAgICAgICBjaGVja2VkOiBlbGVDaGVja2VkLFxyXG4gICAgICAgIGlzQWxsOiBpc0FsbCxcclxuICAgICAgICB2YWx1ZXM6IG9wdGlvbnMudmFsdWVzLFxyXG4gICAgICAgIGNoZWNrZWREYXRhOiBkYXRhLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgcmV0dXJuIGl0ZW1bY2hlY2tlZE5hbWVdID09PSB0cnVlO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGVsZTogZWxlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JhZGlvJykge1xyXG5cclxuICAgICAgdmFyIGluZGV4ID0gZWxlLmZpbmQoJ2lucHV0JykuYXR0cigneXctaW5kZXgnKSxcclxuICAgICAgICB2YWx1ZSA9IGVsZS5maW5kKCdpbnB1dCcpLmF0dHIoJ2xheXVpLXZhbHVlJyk7XHJcblxyXG4gICAgICBvcHRpb25zLnZhbHVlcyA9IFt2YWx1ZV07XHJcbiAgICAgIGVsZS5wYXJlbnQoKS5wcmV2KCkuZmluZCgnaW5wdXQnKS52YWwodmFsdWUpO1xyXG5cclxuICAgICAgbGF5dWkuZWFjaChkYXRhLCBmdW5jdGlvbiAoaSwgaXRlbSkge1xyXG4gICAgICAgIGl0ZW1bY2hlY2tlZE5hbWVdID0gZmFsc2U7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBkYXRhW2luZGV4XVtjaGVja2VkTmFtZV0gPSB0cnVlO1xyXG5cclxuICAgICAgbGF5dWkuZXZlbnQuY2FsbChlbGUsIE1PRF9OQU1FLCBNT0RfTkFNRSArICcoJyArIGZpbHRlciArICcpJywge1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICBjaGVja2VkRGF0YTogZGF0YVtpbmRleF0sXHJcbiAgICAgICAgZWxlOiBlbGVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLy8g6I635Y+W6YCJ5Lit5pWw5o2uXHJcbiAgQ2xhc3MucHJvdG90eXBlLmdldENoZWNrZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgIG9wdGlvbnMgPSB0aGF0LmNvbmZpZyxcclxuICAgICAgZGF0YSA9IG9wdGlvbnMuZGF0YSxcclxuICAgICAgY2hlY2tlZE5hbWUgPSBvcHRpb25zLmNvbmZpZy5jaGVja2VkTmFtZTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWx1ZXM6IG9wdGlvbnMudmFsdWVzLFxyXG4gICAgICBkYXRhOiBkYXRhLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtW2NoZWNrZWROYW1lXSA9PT0gdHJ1ZTtcclxuICAgICAgfSlcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyDmoLjlv4PlhaXlj6NcclxuICBzZWxlY3RQbHVzLnJlbmRlciA9IGZ1bmN0aW9uIChvcHRpb25zLCB0YWdzQ29udGFpbmVyKSB7XHJcblxyXG4gICAgdmFyIGlucyA9IG5ldyBDbGFzcyhvcHRpb25zLCB0YWdzQ29udGFpbmVyKTtcclxuICAgIHJldHVybiB0aGlzSW5zLmNhbGwoaW5zKTtcclxuICB9O1xyXG5cclxuICBleHBvcnRzKCdzZWxlY3RQbHVzJywgc2VsZWN0UGx1cyk7XHJcblxyXG59KSJdfQ==
