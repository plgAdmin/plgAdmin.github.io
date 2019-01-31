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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmQuanMiLCJjYXJkTGlzdC5qcyIsImNvcmUuanMiLCJkaWFsb2cuanMiLCJpbnB1dFRhZ3MuanMiLCJQbGdQYW5lbC5qcyIsIlBsZ1NpZGVBY2NvcmRpb24uanMiLCJQbGdTaWRlQWNjb3JkaW9uUm91dGUuanMiLCJQbGdUYWJzLmpzIiwiUGxnWnRyZWUuanMiLCJzZWxlY3RQbHVzLmpzIiwic2VsZWN0VGFncy5qcyJdLCJuYW1lcyI6WyIkIiwiZm4iLCJpbml0UGxnQ2FyZCIsIm9wdGlvbnMiLCJwZyIsIlBsZ0NhcmQiLCJpZCIsImF0dHIiLCJyZW5kZXJUbyIsInJlbmRlcmVyIiwiaHRtbEZyYWdtZW50IiwiY29uZmlnIiwiZXh0ZW5kIiwiZmFjdG9yeSIsIl9zdHlsZSIsInN0eWxlIiwiX2RhdGEiLCJkYXRhIiwiX3N0clRpdGxlIiwiX3N0ckhlYWQiLCJfc3RyVGl0bGVIZWFkIiwiX3N0ckZvb3RlciIsInNlbGYiLCJ0ZW1GcmFnbWVudCIsImZvckVhY2giLCJ2YWwiLCJjYXJkTm8iLCJjYXJkTmFtZSIsInRlbUJ0bnMiLCJidG4iLCJ2YWx1ZSIsInRleHQiLCJ0aXRsZSIsImdlbmVyYXRlT25lVGVtcGxhdGUiLCJkYXRhTGlzdCIsImxlbmd0aCIsImFkZFRlbXBsYXRlIiwiYXR0ck5hbWUiLCJFcnJvciIsIm9uIiwiZXZlbnRuYW1lIiwiY2FsbGJhY2siLCJST1VUSU5FX09QRVJBVElPTiIsIkNPTVBMRVhfT1BFUkFUSU9OIiwiaW5jbHVkZXMiLCJlIiwidGVtSW5kZXgiLCJjbG9zZXN0IiwiaW5kZXgiLCJjYWxsX2JhY2tfZm4iLCJvZmYiLCJncm91cEluZGV4IiwiY3VycmVudERhdGEiLCJ1bmRlZmluZWQiLCJhcHBlbmQiLCJnZXRIdG1sRnJhZ21lbnQiLCJ3aW5kb3ciLCJqUXVlcnkiLCJpbml0UGxnQ2FyZExpc3QiLCJQbGdDYXJkTGlzdCIsImlzU2hvd0FkZCIsIk9iamVjdCIsImFzc2lnbiIsInRlbVN0ciIsInpvbmVOYW1lIiwiem9uZUlkIiwiX3N0ckNlbGxTdGFydCIsIl9zdHJDZWxsSGVhZCIsImhlYWQiLCJfc3RyQ2VsbEJvZHkiLCJkZXMiLCJfc3RyQ2VsbEZvb3RlciIsIm9iaiIsInVzZU5vIiwib3BlcmF0Rm5MZW5ndGgiLCJrZXlzIiwiYnRucyIsIml0ZW0iLCJjb25zb2xlIiwiZXJyb3IiLCJfc3RyQ2VsbEVuZCIsImN1c3RvbWVyTGlzdCIsIm1hcCIsInRlbU9iaiIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInByb3RvdHlwZSIsImN1c29uIiwiZXZlbnQiLCJmaW5kIiwiZXEiLCJjdXJyZW50SWQiLCJEYXRlIiwiZm9ybWF0IiwiZm10IiwibyIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJNYXRoIiwiZmxvb3IiLCJnZXRNaWxsaXNlY29uZHMiLCJ0ZXN0IiwicmVwbGFjZSIsIlJlZ0V4cCIsIiQxIiwiZ2V0RnVsbFllYXIiLCJzdWJzdHIiLCJrIiwiZGh0bWxYQ2FsZW5kYXJPYmplY3QiLCJsYW5nRGF0YSIsImRhdGVmb3JtYXQiLCJtb250aGVzRk5hbWVzIiwibW9udGhlc1NOYW1lcyIsImRheXNGTmFtZXMiLCJkYXlzU05hbWVzIiwid2Vla3N0YXJ0Iiwid2Vla25hbWUiLCJ0b2RheSIsImNsZWFyIiwibGFuZyIsIlByb2xvZyIsIkdyaWRCYXNlUGF0aCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldFRvcCIsIm9mZnNldCIsIm9mZnNldFRvcCIsIm9mZnNldFBhcmVudCIsImdldExlZnQiLCJvZmZzZXRMZWZ0IiwiaGFzSnNvbiIsImpzb25BcnJheSIsImpzb24iLCJpIiwiYiIsImtleSIsImFqYXgiLCJwZGVmYXVsdCIsInRpbWVvdXQiLCJkYXRhVHlwZSIsIm9wdCIsIlhNTEh0dHBSZXF1ZXN0IiwidGV4dFN0YXR1cyIsImVycm9yVGhyb3duIiwibGF5ZXIiLCJtc2ciLCJiZWZvcmVTZW5kIiwieGhyIiwic2V0UmVxdWVzdEhlYWRlciIsInN5bmNBamF4IiwiYXN5bmMiLCJnZXRGb3JtQnlJZCIsInN5c3RlbUlkIiwibWVudUlkIiwiZm9ybUlkIiwibXlmb3JtIiwiZ2V0SnNvbkRhdGEiLCJzdWNjZXNzIiwiZmllbGRzIiwiUHJvbG9nRm9ybSIsImZvcm1kYXRhIiwiSlNPTiIsInBhcnNlIiwiaW5pdCIsImNyZWF0ZVJhbmRvbUlkIiwiZ2V0VGltZSIsInJhbmRvbSIsInRvU3RyaW5nIiwibG9hZGluZyIsImVsIiwiUGxnRGlhbG9nIiwiYXBwZW5kVG8iLCJjc3MiLCJjbG9zZUxvYWRpbmciLCJjbG9zZSIsImxvYWRpbmcyIiwibG9hZCIsInNoYWRlIiwiZGVsR3JpZFJvd0RhdGEiLCJncmlkIiwidXJsIiwidHlwZSIsImNvbnRlbnR0eXBlIiwicGFyYW0iLCJtdWx0aXNlbGVjdCIsImdldFNlbGVjdGVkUm93SWQiLCJnZXRDaGVja2VkSWRzIiwiY29uZmlybSIsInpJbmRleCIsImNvbnRlbnRUeXBlIiwicmVsb2FkIiwiY2xvc2VBbGwiLCJvcGVuIiwiYXJlYSIsImNvbnRlbnQiLCJwYXJzZUpTT04iLCJtZXNzYWdlIiwiYnRuQWxpZ24iLCJ5ZXMiLCJsYXl1aSIsInVzZSIsImFuaW0iLCJmaXhlZCIsInBsZ0RpYWxvZyIsInNob3dVcGxvYWREaWFsb2ciLCJ3aW5vcHRpb25zIiwic2tpbiIsImNsb3NlQnRuIiwicmVzaXplIiwiYnRuMSIsImxheWVybyIsImJ0bjIiLCJtZiIsIlBsZ0Zvcm0iLCJpdGVtcyIsInNob3dHcmlkRGlhbG9nIiwicGxnR3JpZCIsIm9wdHMiLCJ0aXBzTW9yZSIsInJlY29yZCIsImdldFNlbGVjdGVkUm93RGF0YSIsIndpZHRoIiwiaGVpZ2h0IiwicGFuZWxJZCIsImxvYWREYXRhIiwicmlkIiwiaW5kIiwiZ2V0VXNlckRhdGEiLCJidG4zIiwiaW5pdFBsZ0lucHV0VGFncyIsInBsZ0lucHV0VGFncyIsInBhcmFtcyIsImNsYXNzTWFpbiIsImNoZWNrYm94TmFtZSIsImxheUZpbHRlciIsImRvbSIsInRhZ3NJZCIsIm1ldW5QYW5lbFRoaXMiLCJzZXREZWZhdWx0VmFsdWUiLCJoYXNPd25Qcm9wZXJ0eSIsImNoZWNrZWQiLCJ3cmFwVGVtcGxhdGUiLCJ0ZW1UZW1wbGF0ZSIsImFsaWFzIiwid3JhcFRhbXBsYXRlIiwidGFyZ2V0SWQiLCIkdGFyZ2V0SWQiLCIkdGFnc0lkIiwiZm9ybSIsInJlbmRlciIsInRhZ0xpc3QiLCJpbnB1dFRhZ3MiLCJjaGVja2JveExpc3QiLCJzaWJsaW5ncyIsInN0cmluZ2lmeSIsInB1c2giLCJ2IiwiYWRkIiwidGVtVGVtcGFsdGUiLCJ0ZW1JbnB1dEhpZGRlbiIsImFmdGVyIiwiaW5kZXhPZiIsImRlbCIsInNwbGljZSIsImVtcHR5IiwicmVtb3ZlIiwiaXNDaGVja2VkIiwiZWxlbSIsImpxdWVyeUVsZW0iLCJ0ZW1KcXVlcnlPYmoiLCJodG1sIiwiY2hlY2tlZExpc3QiLCJBcnJheSIsInNsaWNlIiwiY2FsbCIsInRlbUh0bWwiLCJ0cmlnZ2VyIiwiUGxnSW5wdXRUYWdzIiwidGVtcGxhdGUiLCJzYWxmIiwic2tpbk9CSiIsImNsYXNzTmFtZSIsImhlYWRlciIsImlzU2hvdyIsIm1vcmVCdG4iLCJpY29uIiwiUGFuZWxGb3JtIiwiZGVmYXVsdEJvZHkiLCJsYXlvdXRDb2wiLCJpbnB1dEJsb2NrIiwidmFsdWVCaiIsImNvbHMiLCJhcnIiLCJsYWJlbCIsImpvaW4iLCJwbGdQYW5lbCIsImVsZSIsIl90aGlzIiwidmFsdWVPZiIsImFyZ3VtZW50cyIsImVtcHl0IiwiZ2V0RWxlbWVudCIsImFwcGVuZFBhbmVsQm9keSIsIkVsZW1lbnRPYmpjZXQiLCJpc0VtcHR5IiwiZGlyIiwibm9kZVR5cGUiLCJub2RlTmFtZSIsIkhUTUxFbGVtZW50IiwiaXNBcnJheSIsIlBsZ1BhbmVsIiwic3RyQ2hpbmVzZUZpcnN0UFkiLCJvTXVsdGlEaWZmIiwibWFrZVB5Iiwic3RyIiwiYXJyUmVzdWx0IiwibGVuIiwiY2giLCJjaGFyQXQiLCJjaGVja0NoIiwibWtSc2x0IiwidW5pIiwiY2hhckNvZGVBdCIsImFyclJzbHQiLCJzdHJsZW4iLCJ0bXBBcnIiLCJ0bXAiLCJqIiwiY29uY2F0IiwiU3RyaW5nIiwidHJpbSIsInBpbnlpbiIsImVsZW1lbnQiLCJ3aW4iLCJkb2MiLCJkb2N1bWVudCIsInBsZ1NpZGViYXIiLCJDbGFzc01haW4iLCJkb2N1bWVudFBhbmVsIiwiX2dldERhdGEiLCJnZXREYXRhIiwicGFyZW50RGF0YSIsInJlbmRlck5hdiIsIm1haW5OYXYiLCJvcGVzIiwidG1sIiwibG9nbyIsImZpbHRlciIsInBhcmVudE1lbnVJZCIsImltYWdlUGF0aCIsImxlYWYiLCJwYXRoIiwicmVzZXRPcGVuTWVudUxpc3QiLCJncm91cCIsImlueGV4IiwiY2l0ZW0iLCJkaXRlbSIsImhpZGUiLCJzZXRPcGVuQWxsIiwibGlzdCIsIm1ldW5ncm91cExpc3QiLCJwYXJlbnREYXRhcyIsImtleVVwTGlzdCIsInJlZ0NIIiwia2V5dXAiLCJ0b1VwcGVyQ2FzZSIsIm5leHQiLCJzaG93IiwibWFwQWxsIiwiUFlfY29kZSIsIm1ldW5Ub3BPYmoiLCJlYWNoIiwicGFyc2VJbnQiLCJyZW1vdmVyU2hvd0xpc3QiLCJtZXVuU29yb2xsIiwicmVtb3ZlQ2xhc3MiLCJjbGlja0NoaWxkIiwiY2FsbGJha2MiLCJvdGhpcyIsImJvZHlOYXYiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsIm1pZCIsImJvZHlOYXZfdGhpcyIsImJvZHlOYXZfcGFyZW50IiwicGFyZW50IiwiYm9keU5hdl9jaGlsZCIsImNhbGxiYWtjRGF0YSIsImdldEN1cnJlbnQiLCJwaWQiLCJwYXJlbnRzIiwiaHJlZiIsInVwZGF0ZUNoaWxkTWV1biIsIkV2ZW50SGFubGRlciIsImhhc0NsYXNzIiwiY2xpY2siLCJhZGRDbGFzcyIsImhvdmVyIiwiZXZlIiwidGFyZ2V0IiwidG9nZ2xlQ2xhc3MiLCJwYXJlbnROb2RlIiwibWV1blRvcCIsInNJdGVtIiwidGhpc0hyZWYiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwibWVudWlkIiwiQm9vbGVhbiIsInNldFRpbWVvdXQiLCJ0YWJBcnJheSIsInBhck5hdiIsIm9saUNsYXNzIiwib2xpIiwib2EiLCJsZXZlbCIsIm5hdmNoaWxkIiwiaW5pdFBhbmVsIiwicHJMZWZ0IiwiJHRhYmxpIiwiJG5hdl9ob3Zlcl9jaGlsZCIsImdldEZ1biIsInJvdXRlIiwibWVudUNsaWNrIiwiaXNUcmlnZ2VyIiwic2V0TWFwRGF0YSIsImNsb3NlTG9hZCIsImRhdGFBbGwiLCJtYXBkYXRhIiwicmVzIiwiZXJyIiwiX2NsYXNzIiwiZG9tSWQiLCJQbGdTaWRlQWNjb3JkaW9uIiwiaW5pdFBsZ1NpZGVBY2NvcmRpb24iLCJmaWx0ZXJEYXRhIiwiRGF0YSIsInZhbHVlcyIsIm1hcFJlc2V0T3Blbk1lbnVMaXN0IiwibWFwRGF0YSIsInRyZWVEYXRhIiwicmVjdXJzaXZlIiwiY2hpbGQiLCJoYXNoIiwiaXNBY3RpdmUiLCJtYXBVcGRhdGVDaGlsZHJlbk5hbiIsInRyZWUiLCJjaGlsZHJlbiIsInNpZGViYXJMaSIsImJsYW5rIiwiY2hpbGRJdGVtIiwibWFwVXBkYXRlTWFpbk5hdiIsIlRlbXBsYXRlTWFwIiwidHBsIiwidmlwc3BhIiwiaW5kZXhJZCIsImFqYXhJbml0IiwibG9hZGRhdGEiLCJMb2FkRGF0YSIsImRlZmluZVByb3BlcnRpZXMiLCJnZXQiLCJzZXQiLCJuZXdWYWx1ZSIsInJvdXRlck1hcCIsImxvY2F0aW9uIiwibG9nb0ZvbGQiLCJuYXZMYXN0IiwicmVzdWx0Iiwic2xmZSIsImlzIiwic2lkZWJhciIsInNsaWRlVG9nZ2xlIiwic2xpZGVVcCIsInNldE9wZW5LZXl1cCIsInRpcCIsIm91dGVySFRNTCIsIiRkb20iLCJuYXZfaG92ZXJfY2hpbGQiLCJvYmplY3QiLCJyb3V0ZVNldHRpbmciLCJ0cmVlZGF0YSIsInJlc3BvbnNlIiwicmVzdWx0TmFtZSIsImlkYXJyIiwidW5zaGlmdCIsInRvVHJlZSIsInNwbGl0IiwibWF0Y2giLCJ0ZW1wbGF0ZVVybCIsImlmcmFtZSIsImNvbnRyb2xsZXIiLCJzcmNQYXRoIiwicGFyZW50X25hbWUiLCJzdGF0ZUFyciIsInF1ZXJ5SWQiLCJvcGVyYXRlVHlwZSIsImxhc3RNb2RpZnlUaW1lIiwiaGVscENvZGUiLCJjcmVhdG9yTmFtZSIsImNyZWF0b3JJZCIsImNyZWF0ZVRpbWUiLCJtb2RpZmllcklkIiwibW9kaWZpZXJOYW1lIiwic29ydCIsIlBsZ1NpZGVBY2NvcmRpb25Sb3V0ZSIsInNraW5BcnIiLCJub3JtYWwiLCJicmllZiIsImNhcmQiLCJwbGd0YWJzIiwiaXRlbWxpc3QiLCJycCIsInJhIiwiaW5kZXhBY3RpdmUiLCJ0cCIsImFsbG93Q2xvc2UiLCJwbGdUYWJzIiwicHJlSW5kZXgiLCJ0aW1lIiwiZmFkZUluIiwiJHRoaXMiLCJkZWxldGVUYWJzIiwibG9nIiwiYWRkVGFicyIsImxheWlkIiwiY2hhbmdlVGFicyIsImdldE51bSIsInRpdGxlT2JqIiwiY291bnQiLCJjb3VudDAxIiwib3V0ZXJXaWR0aCIsImNvdW50MDIiLCJwcmV2IiwibGl3IiwibGlOdW0iLCJwaW5kZXgiLCJib29sZSIsImlzQ2hhbmdlIiwiY3VyTGkiLCJOdW1iZXIiLCJkZWZpbmUiLCJyZWFuZFRwbCIsInRhYkFkZCIsInN0YWNrIiwicmVnIiwiZWxlT2JqIiwidGFiQ2hhbmdlIiwiaXRtZSIsInRhYkRlbGV0ZSIsImV2ZW50TmFtZSIsIlBsZ1RhYnMiLCJpbml0UGxnVGFicyIsInpUcmVlIiwiaXNQYXJlbnQiLCJFeHBhbmQiLCJ0cmVlSWQiLCJ0cmVlTm9kZSIsInRJZCIsImdldFpUcmVlT2JqIiwiTk9kZXMiLCJnZXROb2RlcyIsInRkIiwiZXhwYW5kTm9kZSIsInBsZ1p0cmVlIiwiaW5pdEFqYXgiLCJ0b29sQmFyIiwidG9vbEJhcjIiLCJzZXREYXRhIiwiaXNFeHBhbmQiLCJzZXR0aW5nIiwidmlldyIsInNlbGVjdGVkTXVsdGkiLCJzaW1wbGVEYXRhIiwiZW5hYmxlIiwiaWRLZXkiLCJwSWRLZXkiLCJyb290UElkIiwib25FeHBhbmQiLCJiaW5kIiwic2V0RGF0ZSIsIm9ucmVzaXplIiwicE9iaiIsInRvb2xiYXJCdG5IZWlnaHQiLCJ0b29sYmFyQnRuMiIsInBhcmVudEhlaWdodCIsIm9ialVsIiwiY2xhc3MiLCJ0cmVlT2JqIiwidG9vbGJhckJ0biIsImJ0bkdyb3VwIiwiYnRuR3JvdXAyIiwibmV3Q291bnQiLCJub2RlT2JqIiwibm9kZXMiLCJnZXRTZWxlY3RlZE5vZGVzIiwiRXZlbnRDYWxsYmFjayIsImFkZE5vZGVzIiwic2VsZWN0Tm9kZSIsIlBsZ1p0cmVlIiwiZXhwb3J0cyIsImhpbnQiLCJNT0RfTkFNRSIsIlNFTEVDVCIsIlNFTEVDVEVEIiwic2VsZWN0UGx1cyIsInRoYXQiLCJldmVudHMiLCJvbmV2ZW50IiwidGhpc0lucyIsImdldENoZWNrZWQiLCJDbGFzcyIsInJlbmRlcklucHV0VGFncyIsInZhbHVlU2VwYXJhdG9yIiwibGFiZWxTZXBhcmF0b3IiLCJ2YWx1ZU5hbWUiLCJtZXRob2QiLCJ3aGVyZSIsImhlYWRlcnMiLCJwYXJzZURhdGEiLCJjaGVja2VkTmFtZSIsImluZGV4TmFtZSIsInJlRWxlbSIsInB1bGxEYXRhIiwicmVuZGVyRGF0YSIsIiR0aXRsZSIsIiRkZDAiLCJmb3JtYXREYXRhIiwibSIsImNoZWNrYm94IiwiQ0xBU1NOQU1FIiwiQ0hFQ0tFRCIsInN1bSIsImFsbEVsZSIsIm5leHRBbGwiLCIkZGQiLCJsYXl1aVZhbHVlIiwibiIsInByb3AiLCJhbGxjaGVja2JveCIsIiRhbGwiLCJkZCIsImVsZUNoZWNrZWQiLCJpc0FsbCIsImN1cnJlbnRIdG1sIiwic2VsZWN0TGlzdCIsImlubmVyVGV4dCIsIiRkZHMiLCJyYWRpbyIsIklDT04iLCJDSEVDS0VEX0lDT04iLCJlbElEIiwiY2hlY2tlZERhdGEiLCJ5d0luZGV4IiwidGFnc0NvbnRhaW5lciIsImlucyIsIlBsZ1NlbGVjdFBsdXNUYWdzIiwicGxnU2VsZWN0UGx1c1RhZ3MiLCJ0ZW1wIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0MsV0FBU0EsQ0FBVCxF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Q0FBQyxVQUFVaG1CLENBQVYsRUFBYTJNLEtBQWIsRUFBb0I7QUFDcEIzTSxFQUFBQSxDQUFDLENBQUNDLEVBQUYsQ0FBS2twQixpQkFBTCxHQUF5QixVQUFVaHBCLE9BQVYsRUFBbUI7QUFDMUMsV0FBTyxJQUFJaXBCLGlCQUFKLENBQXNCanBCLE9BQXRCLENBQVA7QUFFSCxHQUhDOztBQUtBLE1BQUlrcEIsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBVTtBQUNuQjtBQUNELEdBRkQ7O0FBSUEsTUFBSUQsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFVanBCLE9BQVYsRUFBbUI7QUFFekMsU0FBSzBQLE1BQUwsQ0FBWTFQLE9BQVo7QUFFRCxHQUpEOztBQU1BaXBCLEVBQUFBLGlCQUFpQixDQUFDOWpCLFNBQWxCLENBQTRCdUssTUFBNUIsR0FBcUMsVUFBUzFQLE9BQVQsRUFBaUI7QUFDcERILElBQUFBLENBQUMsQ0FBQyxNQUFNRyxPQUFPLENBQUNNLFFBQWYsQ0FBRCxDQUEwQitQLEtBQTFCLENBQWdDNlksSUFBSSxFQUFwQztBQUNBbHBCLElBQUFBLE9BQU8sQ0FBQzBLLEVBQVIsR0FBYSxNQUFNMUssT0FBTyxDQUFDTSxRQUEzQjtBQUNBLFdBQU9OLE9BQU8sQ0FBQ00sUUFBZjtBQUNBLFdBQU9rTSxLQUFLLENBQUNxWixVQUFOLENBQWlCblcsTUFBakIsQ0FBd0IxUCxPQUF4QixDQUFQO0FBQ0QsR0FMRDs7QUFPQXFELEVBQUFBLE1BQU0sQ0FBQzJsQixpQkFBUCxHQUEyQkMsaUJBQTNCO0FBR0QsQ0ExQkEsRUEwQkUzbEIsTUExQkYsRUEwQlVrSixLQTFCViIsImZpbGUiOiJwbGcuanMiLCJzb3VyY2VzQ29udGVudCI6WyI7XHJcbihmdW5jdGlvbigkKSB7XHJcblxyXG4gICAgJC5mbi5pbml0UGxnQ2FyZCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgcGcgPSBuZXcgUGxnQ2FyZChvcHRpb25zKTtcclxuICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICBwZy5yZW5kZXJUbyhpZCk7XHJcbiAgICAgICAgcmV0dXJuIHBnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBQbGdDYXJkID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5yZW5kZXJlcikgcmV0dXJuO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBodG1sRnJhZ21lbnQgIGh0bWzku6PnoIHniYfmrrVcclxuICAgICAgICAgKiBjb25maWcg6buY6K6k55qE6YWN572u5paH5Lu2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIGh0bWxGcmFnbWVudCwgY29uZmlnO1xyXG5cclxuICAgICAgICBjb25maWcgPSB7fTtcclxuICAgICAgICAvLyBjb25maWcgPSBPYmplY3QuYXNzaWduKGNvbmZpZywgb3B0aW9ucy5jb25maWcpO1xyXG4gICAgICAgIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCBjb25maWcsIG9wdGlvbnMuY29uZmlnKTtcclxuXHJcbiAgICAgICAgdmFyIGZhY3RvcnkgPSB7XHJcbiAgICAgICAgICAgIF9zdHlsZTogY29uZmlnLnN0eWxlLFxyXG4gICAgICAgICAgICBfZGF0YTogY29uZmlnLmRhdGEgfHwgJycsXHJcbiAgICAgICAgICAgIF9zdHJUaXRsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJwbGctY2FyZC1jb21wb25lbnRzXCI+IFxcXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1oZWFkZXItY29udGFpbmVyXCI+XFxcclxuICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0PjxsZWdlbmQ+JztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX3N0ckhlYWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwicGxnLWNhcmQtZ3JvdXBcIj4nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBfc3RyVGl0bGVIZWFkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnPC9sZWdlbmQ+PC9maWVsZHNldD48L2Rpdj48ZGl2IGNsYXNzPVwicGxnLWNhcmQtZ3JvdXBcIj4nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBfc3RyRm9vdGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnPC9kaXY+JztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX3N0ckZvb3RlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdlbmVyYXRlT25lVGVtcGxhdGU6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmQtbm9cIj4ke3ZhbC5jYXJkTm99PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkLW1haW5cIj4ke3ZhbC5jYXJkTmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gIFxyXG4gICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicGxnLWNhcmQtYnRuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtQnRucyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5idG4uZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1CdG5zICs9IGBcclxuICAgICAgICAgICAgICAgIDxsaT4ke3ZhbHVlLnRleHR9PC9saT5cclxuICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gdGVtQnRucztcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBgXHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVtRnJhZ21lbnQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uZVRlbXBsYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkLW5vXCI+JHt2YWwuY2FyZE5vfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1tYWluXCI+JHt2YWwuY2FyZE5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICBcclxuICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInBsZy1jYXJkLWJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbUJ0bnMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB2YWwuYnRuLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtQnRucyArPSBgXHJcbiAgICAgICAgICAgICAgICA8bGk+JHt2YWx1ZS50ZXh0fTwvbGk+XHJcbiAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHRlbUJ0bnM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuX3N0ckhlYWQoKSArIHRlbUZyYWdtZW50ICsgc2VsZi5fc3RyRm9vdGVyKCk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0d29UZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gJ3R3b1RlbXBsYXRlJztcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuX2RhdGEuZm9yRWFjaChmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkLWJvZHkgcHJpbWFyeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICR7dmFsLmNhcmROYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgXHJcbiAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJwbGctY2FyZC1idG4tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1CdG5zID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsLmJ0bi5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbUJ0bnMgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGxpPiR7dmFsdWUudGV4dH08L2xpPlxyXG4gICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSB0ZW1CdG5zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IGBcclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLl9zdHJIZWFkKCkgKyB0ZW1GcmFnbWVudCArIHNlbGYuX3N0ckZvb3RlcigpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aHJlZVRlbXBsYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiAndGhyZWVUZW1wbGF0ZSc7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1ib2R5IHByaW1hcnlcIj5cclxuICAgICAgICAgICAgICAgICAgICAke3ZhbC5jYXJkTmFtZX1cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gIFxyXG4gICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicGxnLWNhcmQtYnRuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtQnRucyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5idG4uZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1CdG5zICs9IGBcclxuICAgICAgICAgICAgICAgIDxsaT4ke3ZhbHVlLnRleHR9PC9saT5cclxuICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gdGVtQnRucztcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBgXHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5fc3RySGVhZCgpICsgdGVtRnJhZ21lbnQgKyBzZWxmLl9zdHJGb290ZXIoKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFkZFRlbXBsYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJwbGctY2FyZCBwbGctYWRkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLWljb24tYWRkLTEgXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbmVUaXRsZVRlbXBsYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuX2RhdGEuZm9yRWFjaChmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBgPGRpdiBjbGFzcz1cInBsZy1jYXJkLWNvbXBvbmVudHNcIj48ZGl2IGNsYXNzPVwicGxnLWNhcmQtaGVhZGVyLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGZpZWxkc2V0PjxsZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICAke3ZhbC50aXRsZX1cclxuICAgICAgICAgICAgICAgIDxsZWdlbmQ+PGZpZWxkc2V0PjwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHNlbGYuX3N0ckhlYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLmdlbmVyYXRlT25lVGVtcGxhdGUodmFsLmRhdGFMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLl9zdHJGb290ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBgPC9kaXY+YDtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVtRnJhZ21lbnQ7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbmVUaXRsZUFkZFRlbXBsYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFzZWxmLl9kYXRhIHx8IHNlbGYuX2RhdGEubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuX2RhdGEuZm9yRWFjaChmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBgPGRpdiBjbGFzcz1cInBsZy1jYXJkLWNvbXBvbmVudHNcIj48ZGl2IGNsYXNzPVwicGxnLWNhcmQtaGVhZGVyLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGZpZWxkc2V0PjxsZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICAke3ZhbC50aXRsZX1cclxuICAgICAgICAgICAgICAgIDxsZWdlbmQ+PGZpZWxkc2V0PjwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHNlbGYuX3N0ckhlYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLmdlbmVyYXRlT25lVGVtcGxhdGUodmFsLmRhdGFMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLmFkZFRlbXBsYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5fc3RyRm9vdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYDwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbUZyYWdtZW50O1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8g5ZCR5aSW5pq06Zyy5Ye65pyA5ZCO55qE5qih54mI5qC35byPXHJcbiAgICAgICAgICAgIGdldEh0bWxGcmFnbWVudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0ck5hbWUgPSBzZWxmLl9zdHlsZSArICdUZW1wbGF0ZSc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZlthdHRyTmFtZV0gPyBzZWxmW2F0dHJOYW1lXSgpIDogbmV3IEVycm9yKCfkuI3lrZjlnKjov5nkuKrmlrnms5UnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAvL2NvbnNvbGUubG9nKGZhY3RvcnkuZ2V0SHRtbEZyYWdtZW50KCkpO1xyXG5cclxuICAgICAgICB0aGlzLm9uID0gZnVuY3Rpb24oZXZlbnRuYW1lLCBjYWxsYmFjaykge1xyXG5cclxuICAgICAgICAgICAgdmFyIFJPVVRJTkVfT1BFUkFUSU9OID0gWydvbmUnLCAndHdvJywgJ3RocmVlJ10sXHJcbiAgICAgICAgICAgICAgICBDT01QTEVYX09QRVJBVElPTiA9IFsnb25lVGl0bGUnLCAndHdvVGl0bGUnLCAndGhyZWVUaXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ29uZVRpdGxlQWRkJywgJ3R3b1RpdGxlQWRkJywgJ3RocmVlVGl0bGVBZGQnXTtcclxuXHJcbiAgICAgICAgICAgIC8vIOatpOWkhOWkmuS6huS4gOS4qm9uZVRpdGxl57G75Z6LXHJcbiAgICAgICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLnN0eWxlICE9PSAnYWRkJ1xyXG4gICAgICAgICAgICAgICAgJiYgZXZlbnRuYW1lICYmIGV2ZW50bmFtZSA9PSAnY2xpY2snKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFJPVVRJTkVfT1BFUkFUSU9OLmluY2x1ZGVzKGNvbmZpZy5zdHlsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIG9wdGlvbnMucmVuZGVyZXIpLm9uKCdjbGljaycsICdsaScsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1JbmRleCA9ICQodGhpcykuY2xvc2VzdChcIi5wbGctY2FyZFwiKS5pbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZE5vID0gY29uZmlnLmRhdGFbdGVtSW5kZXhdLmNhcmRObztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxfYmFja19mbiA9IGNvbmZpZy5kYXRhW3RlbUluZGV4XS5idG5bJCh0aGlzKS5pbmRleCgpXS5mbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGNhcmRObywgY2FsbF9iYWNrX2ZuKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChDT01QTEVYX09QRVJBVElPTi5pbmNsdWRlcyhjb25maWcuc3R5bGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIG9wdGlvbnMucmVuZGVyZXIpLm9mZignY2xpY2snKS5vbignY2xpY2snLCAnbGknLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBJbmRleCA9ICQodGhpcykuY2xvc2VzdChcIi5wbGctY2FyZC1jb21wb25lbnRzXCIpLmluZGV4KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1JbmRleCA9ICQodGhpcykuY2xvc2VzdChcIi5wbGctY2FyZFwiKS5pbmRleCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudERhdGEgPSBjb25maWcuZGF0YVtncm91cEluZGV4XS5kYXRhTGlzdFt0ZW1JbmRleF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJkTm8sIGNhbGxfYmFja19mbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRObyA9IGN1cnJlbnREYXRhLmNhcmRObztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbF9iYWNrX2ZuID0gY3VycmVudERhdGEuYnRuWyQodGhpcykuaW5kZXgoKV0uZm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGl0bGUgPSBjb25maWcuZGF0YVtncm91cEluZGV4XS50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYXJkTm8sIGNhbGxfYmFja19mbiwgdGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soY2FyZE5vLCBjYWxsX2JhY2tfZm4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIG9wdGlvbnMucmVuZGVyZXIpLm9uKCdjbGljaycsICcucGxnLWFkZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncm91cEluZGV4ID0gJCh0aGlzKS5jbG9zZXN0KFwiLnBsZy1jYXJkLWNvbXBvbmVudHNcIikuaW5kZXgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gY29uZmlnLmRhdGFbZ3JvdXBJbmRleF0udGl0bGU7IC8vIOmcgOimgeiOt+WPluW9k+WJjeeahHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sodW5kZWZpbmVkLCB1bmRlZmluZWQsIHRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5zdHlsZSA9PT0gJ2FkZCdcclxuICAgICAgICAgICAgICAgICYmIGV2ZW50bmFtZSAmJiBldmVudG5hbWUgPT0gJ2NsaWNrJykge1xyXG4gICAgICAgICAgICAgICAgJCgnIycgKyBvcHRpb25zLnJlbmRlcmVyKS5vbignY2xpY2snLCAnLnBsZy1jYXJkJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclRvID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgJCgnIycgKyBpZCkuYXBwZW5kKGZhY3RvcnkuZ2V0SHRtbEZyYWdtZW50KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMucmVuZGVyZXIpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVG8ob3B0aW9ucy5yZW5kZXJlcik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LlBsZ0NhcmQgPSBQbGdDYXJkO1xyXG5cclxufSAoalF1ZXJ5KSk7IiwiO1xyXG4oZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgJC5mbi5pbml0UGxnQ2FyZExpc3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgdmFyIHBnID0gbmV3IFBsZ0NhcmRMaXN0KG9wdGlvbnMpO1xyXG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICBwZy5yZW5kZXJUbyhpZCk7XHJcbiAgICByZXR1cm4gcGc7XHJcbiAgfVxyXG5cclxuICB2YXIgUGxnQ2FyZExpc3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgaWYgKCFvcHRpb25zKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBodG1sRnJhZ21lbnQgIGh0bWzku6PnoIHniYfmrrVcclxuICAgICAqIGNvbmZpZyDpu5jorqTnmoTphY3nva7mlofku7ZcclxuICAgICAqL1xyXG4gICAgdmFyIGh0bWxGcmFnbWVudCwgY29uZmlnO1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBpc1Nob3dBZGQ6IHRydWUgICAvLyDpu5jorqTmmL7npLpcclxuICAgIH1cclxuXHJcbiAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcsIG9wdGlvbnMuZGF0YSk7XHJcblxyXG4gICAgdmFyIGZhY3RvcnkgPSB7XHJcbiAgICAgIF9kYXRhOiBjb25maWcgfHwgJycsXHJcbiAgICAgIF9zdHJUaXRsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgdGVtU3RyID0gJyc7XHJcblxyXG4gICAgICAgIHRlbVN0ciArPSBgPGRpdiBjbGFzcz1cInBsZy16b25lLWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwbGctem9uZS1oZWFkZXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctdGl0bGVcIj48aSBjbGFzcz1cImxheXVpLWljb24gbGF5dWktaWNvbi1sb2NhdGlvblwiPjwvaT5cclxuICAgICAgICAgICR7IHNlbGYuX2RhdGEuem9uZU5hbWUgfTwvZGl2PmA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc2VsZi5fZGF0YS5pc1Nob3dBZGQpe1xyXG4gICAgICAgICAgdGVtU3RyICs9IGA8ZGl2IGNsYXNzPVwicGxnLWFkZFwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibGF5dWktYnRuIGxheXVpLWJ0bi1ub3JtYWxcIiBkYXRhLXpvbmVpZD0ke3NlbGYuX2RhdGEuem9uZUlkfSBuYW1lPVwicGxnLWFkZFwiPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwibGF5dWktaWNvblwiPiYjeGU2NTQ7PC9pPlxyXG4gICAgICAgICAgICAgIOa3u+WKoFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZW1TdHIgKz0gYDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jdXN0b21lci1saXN0XCI+XHJcbiAgICAgICAgICA8dWwgY2xhc3M9XCJsYXl1aS1yb3dcIj5gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGVtU3RyO1xyXG4gICAgICB9LFxyXG4gICAgICBfc3RyQ2VsbFN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8bGkgY2xhc3M9XCJsYXl1aS1jb2wtbGczIGxheXVpLWNvbC1tZDQgbGF5dWktY29sLXNtNiBcclxuICAgICAgICBsYXl1aS1jb2wteHMxMlwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2VsbFwiPmA7XHJcbiAgICAgIH0sXHJcbiAgICAgIF9zdHJDZWxsSGVhZDogZnVuY3Rpb24gKGhlYWQpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJwbGctY3VzdG9tZXItbmFtZVwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJwbGctYmFkZ2UtZG90XCI+PC9pPiR7IGhlYWQgfVxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICAgIH0sXHJcbiAgICAgIF9zdHJDZWxsQm9keTogZnVuY3Rpb24gKGRlcykge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInBsZy1jdXN0b21lci1kZXNcIj4keyBkZXMgfTwvZGl2PmA7XHJcbiAgICAgIH0sXHJcbiAgICAgIF9zdHJDZWxsRm9vdGVyOiBmdW5jdGlvbiAob2JqKSB7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG9iaik7XHJcbiAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgdmFyIHRlbUZyYWdtZW50ID0nJztcclxuICAgICAgICB0ZW1GcmFnbWVudCArPSBgPGRpdiBjbGFzcz1cInBsZy1jdXN0b21lci1vdGhlclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jdXRvbWVyLW5vXCI+57yW5Y+3OjxzcGFuPiR7IG9iai51c2VObyB9PC9zcGFuPjwvZGl2PmA7XHJcblxyXG4gICAgICAgIHZhciBvcGVyYXRGbkxlbmd0aCA9IE9iamVjdC5rZXlzKG9iai5idG5zKS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHRlbVN0ciA9ICcnO1xyXG4gICAgICAgIGlmKG9wZXJhdEZuTGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICB0ZW1TdHIgKz0gYDxkaXYgY2xhc3M9XCJwbGctY3V0b21lci1vcGVyYXRpbmdcIiBkYXRhLWlkPSR7b2JqLmlkfT5gO1xyXG4gICAgICAgICAgdmFyIGl0ZW07XHJcbiAgICAgICAgICBmb3IoaXRlbSBpbiBvYmouYnRucyl7XHJcbiAgICAgICAgICAgIHRlbVN0ciArPSBgPHNwYW4gY2xhc3M9XCJwbGctJHtpdGVtfVwiPiR7b2JqLmJ0bnNbaXRlbV19PC9zcGFuPmA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0ZW1TdHIgKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eUqOaIt+mFjee9rueahOaTjeS9nOS4uuepuicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZW1GcmFnbWVudCArPSB0ZW1TdHI7XHJcbiAgICAgICAgdGVtRnJhZ21lbnQgKz0gJzwvZGl2Pic7XHJcbiAgICAgIFxyXG4gICAgICAgIHJldHVybiB0ZW1GcmFnbWVudDtcclxuICAgICAgfSxcclxuICAgICAgX3N0ckNlbGxFbmQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGA8L2Rpdj5cclxuICAgICAgICA8L2xpPmA7XHJcbiAgICAgIH0sXHJcbiAgICAgIF9zdHJGb290ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gYDwvdWw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgICAvLyDlkJHlpJbmmrTpnLLlh7rmnIDlkI7nmoTmqKHniYjmoLflvI9cclxuICAgICAgZ2V0SHRtbEZyYWdtZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0ZW1GcmFnbWVudCA9ICcnO1xyXG5cclxuICAgICAgICBpZihzZWxmLl9kYXRhLmN1c3RvbWVyTGlzdCAmJiBzZWxmLl9kYXRhLmN1c3RvbWVyTGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIHNlbGYuX2RhdGEuY3VzdG9tZXJMaXN0Lm1hcChmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0ZW1PYmogPSB7XHJcbiAgICAgICAgICAgICAgaWQ6IHZhbC5pZCxcclxuICAgICAgICAgICAgICB1c2VObzogdmFsLnVzZU5vLFxyXG4gICAgICAgICAgICAgIGJ0bnM6IHZhbC5idG5zXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLl9zdHJDZWxsU3RhcnQoKTtcclxuICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5fc3RyQ2VsbEhlYWQodmFsLm5hbWUpO1xyXG4gICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLl9zdHJDZWxsQm9keSh2YWwuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLl9zdHJDZWxsRm9vdGVyKHRlbU9iaik7XHJcbiAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHNlbGYuX3N0ckNlbGxFbmQoKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICQoc2VsZi5fc3RyVGl0bGUoKSArIHRlbUZyYWdtZW50ICsgc2VsZi5fc3RyRm9vdGVyKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgUGxnQ2FyZExpc3QucHJvdG90eXBlLmN1c29uID1mdW5jdGlvbigpe1xyXG5cclxuICAgIH1cclxuICAgIC8vIOW9k2V2ZW50TmFtZeS4umFkZOeahOaXtuWAme+8jGluZGV4IOaYr+S4gOS4qmZ1bmN0aW9u77yMY2FsbGJhY2vkuLrnqbpcclxuICAgIHRoaXMub24gPSBmdW5jdGlvbiAoZXZlbnRuYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgIGlmKGV2ZW50bmFtZSA9PT0gJ2FkZCcpe1xyXG4gICAgICAgXHJcbiAgICAgICAgc2VsZi5ldmVudC5maW5kKCcucGxnLWFkZCcpLmVxKDApLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHZhciBjdXJyZW50SWQgPSAkKHRoaXMpLmZpbmQoJy5sYXl1aS1idG4nKS5lcSgwKS5kYXRhKCd6b25laWQnKTtcclxuICAgICAgICAgXHJcbiAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjdXJyZW50SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZihzZWxmLmV2ZW50LmZpbmQoJy5wbGctJyArIGV2ZW50bmFtZSkubGVuZ3RoKXtcclxuICAgICAgICAgIHNlbGYuZXZlbnQuZmluZCgnLnBsZy0nICsgZXZlbnRuYW1lKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRJZCA9ICQodGhpcykuY2xvc2VzdCgnLnBsZy1jdXRvbWVyLW9wZXJhdGluZycpLmRhdGEoJ2lkJyk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGN1cnJlbnRJZCk7XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcign57uR5a6a55qE5LqL5Lu25LiN5a2Y5ZyoOjonICsgZXZlbnRuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyVG8gPSBmdW5jdGlvbiAoaWQpIHtcclxuXHJcbiAgICAgIHRoaXMuZXZlbnQgPSBmYWN0b3J5LmdldEh0bWxGcmFnbWVudCgpO1xyXG5cclxuICAgICAgJCgnIycgKyBpZCkuYXBwZW5kKHRoaXMuZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLnJlbmRlcmVyKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyVG8ob3B0aW9ucy5yZW5kZXJlcik7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgd2luZG93LlBsZ0NhcmRMaXN0ID0gUGxnQ2FyZExpc3Q7XHJcblxyXG59KGpRdWVyeSkpOyIsIkRhdGUucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uIChmbXQpIHsgLy9hdXRob3I6IG1laXp6IFxyXG4gIHZhciBvID0ge1xyXG4gICAgXCJNK1wiOiB0aGlzLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vSBcclxuICAgIFwiZCtcIjogdGhpcy5nZXREYXRlKCksIC8v5pelIFxyXG4gICAgXCJoK1wiOiB0aGlzLmdldEhvdXJzKCksIC8v5bCP5pe2IFxyXG4gICAgXCJtK1wiOiB0aGlzLmdldE1pbnV0ZXMoKSwgLy/liIYgXHJcbiAgICBcInMrXCI6IHRoaXMuZ2V0U2Vjb25kcygpLCAvL+enkiBcclxuICAgIFwicStcIjogTWF0aC5mbG9vcigodGhpcy5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqYgXHJcbiAgICBcIlNcIjogdGhpcy5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enkiBcclxuICB9O1xyXG4gIGlmICgvKHkrKS8udGVzdChmbXQpKSBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsICh0aGlzLmdldEZ1bGxZZWFyKCkgKyBcIlwiKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTtcclxuICBmb3IgKHZhciBrIGluIG8pXHJcbiAgICBpZiAobmV3IFJlZ0V4cChcIihcIiArIGsgKyBcIilcIikudGVzdChmbXQpKSBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIChSZWdFeHAuJDEubGVuZ3RoID09IDEpID8gKG9ba10pIDogKChcIjAwXCIgKyBvW2tdKS5zdWJzdHIoKFwiXCIgKyBvW2tdKS5sZW5ndGgpKSk7XHJcbiAgcmV0dXJuIGZtdDtcclxufTtcclxuXHJcbi8vIOWinuW8umNvZGXnmoTlgaXlo67mgKfvvIzkuLvopoHmmK/lhbbku5bnlKjkuI3liLBkaHRtbOaPkuS7tueahOaWh+S7tu+8jOS4jeWGjemcgOimgeW8leWFpei/meS4quaPkuS7tuS6hlxyXG5pZighKCB0eXBlb2YgZGh0bWxYQ2FsZW5kYXJPYmplY3QgPT09ICd1bmRlZmluZWQnIHx8ICFkaHRtbFhDYWxlbmRhck9iamVjdCkpe1x0XHRcclxuICBkaHRtbFhDYWxlbmRhck9iamVjdC5wcm90b3R5cGUubGFuZ0RhdGFbXCJjaFwiXSA9IHtcclxuICAgIGRhdGVmb3JtYXQ6ICclWS0lbS0lZCcsXHJcbiAgICBtb250aGVzRk5hbWVzOiBbXCIx5pyIXCIsJzLmnIgnLCcz5pyIJyxcIjTmnIhcIiwnNeaciCcsJzbmnIgnLFwiN+aciFwiLCc45pyIJywnOeaciCcsXCIxMOaciFwiLCcxMeaciCcsJzEy5pyIJ10sXHJcbiAgICBtb250aGVzU05hbWVzOiBbXCIx5pyIXCIsJzLmnIgnLCcz5pyIJyxcIjTmnIhcIiwnNeaciCcsJzbmnIgnLFwiN+aciFwiLCc45pyIJywnOeaciCcsXCIxMOaciFwiLCcxMeaciCcsJzEy5pyIJ10sXHJcbiAgICBkYXlzRk5hbWVzOiBbXCLmmJ/mnJ/lpKlcIixcIuaYn+acn+S4gFwiLFwi5pif5pyf5LqMXCIsXCLmmJ/mnJ/kuIlcIixcIuaYn+acn+Wbm1wiLFwi5pif5pyf5LqUXCIsXCLmmJ/mnJ/lha1cIl0sXHJcbiAgICBkYXlzU05hbWVzOiBbXCLml6VcIixcIuS4gFwiLFwi5LqMXCIsXCLkuIlcIixcIuWbm1wiLFwi5LqUXCIsXCLlha1cIl0sXHJcbiAgICB3ZWVrc3RhcnQ6XCLlkajml6VcIixcclxuICAgIHdlZWtuYW1lOiBcIuaYn+acn1wiLFxyXG4gICAgdG9kYXk6IFwi5LuK5aSpXCIsXHJcbiAgICBjbGVhcjogXCLmuIXpmaRcIlxyXG4gIH1cclxuICBkaHRtbFhDYWxlbmRhck9iamVjdC5wcm90b3R5cGUubGFuZyA9IFwiY2hcIjtcclxufTtcclxuXHJcblxyXG5cclxudmFyIFByb2xvZyA9IHt9O1xyXG52YXIgR3JpZEJhc2VQYXRoPVwiL3Byb2xvZ3VpL2NvbXBvbmVudHMvUGxnR3JpZC9jb2RlYmFzZS9pbWFnZXNcIjtcclxudmFyIHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhdXRob3JpemF0aW9uXCIpO1xyXG5cclxuLy/ojrflj5blhYPntKDnmoTnurXlnZDmoIcgXHJcblByb2xvZy5nZXRUb3AgPSBmdW5jdGlvbihlKSB7XHJcblx0dmFyIG9mZnNldCA9IGUub2Zmc2V0VG9wO1xyXG5cdGlmIChlLm9mZnNldFBhcmVudCAhPSBudWxsKSB7XHJcblx0XHRvZmZzZXQgKz0gUHJvbG9nLmdldFRvcChlLm9mZnNldFBhcmVudCk7XHJcblx0fVxyXG5cdDtcclxuXHRyZXR1cm4gb2Zmc2V0O1xyXG59XHJcbi8vIOiOt+WPluWFg+e0oOeahOaoquWdkOagh1xyXG5Qcm9sb2cuZ2V0TGVmdCA9IGZ1bmN0aW9uKGUpIHtcclxuXHR2YXIgb2Zmc2V0ID0gZS5vZmZzZXRMZWZ0O1xyXG5cdGlmIChlLm9mZnNldFBhcmVudCAhPSBudWxsKSB7XHJcblx0XHRvZmZzZXQgKz0gUHJvbG9nLmdldExlZnQoZS5vZmZzZXRQYXJlbnQpO1xyXG5cdH1cclxuXHQ7XHJcblx0cmV0dXJuIG9mZnNldDtcclxufVxyXG5cclxuUHJvbG9nLmhhc0pzb24gPSBmdW5jdGlvbihqc29uQXJyYXksanNvbil7XHJcblx0Zm9yKHZhciBpPTA7aTxqc29uQXJyYXkubGVuZ3RoO2krKyl7XHJcblx0XHR2YXIgYiA9IHRydWU7XHJcblx0XHRmb3IodmFyIGtleSBpbiBqc29uQXJyYXlbaV0pe1xyXG5cdFx0XHRcdGlmKGpzb25BcnJheVtpXVtrZXldICE9IGpzb25ba2V5XSl7XHJcblx0XHRcdFx0XHRiID0gZmFsc2U7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZihiKVxyXG5cdFx0XHRyZXR1cm4gaTtcclxuXHR9XHJcblx0cmV0dXJuIC0xO1xyXG59XHJcblxyXG5cclxuUHJvbG9nLmFqYXggPSBmdW5jdGlvbihvcHRpb25zKXtcclxuXHR2YXIgcGRlZmF1bHQgPSB7XHJcblx0XHR0aW1lb3V0OjMwMDAwLFxyXG5cdFx0ZGF0YVR5cGU6XCJqc29uXCJcclxuXHR9XHJcblx0dmFyIG9wdCA9ICQuZXh0ZW5kKHRydWUscGRlZmF1bHQsb3B0aW9ucyk7XHJcblx0b3B0LmVycm9yID0gZnVuY3Rpb24oWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcclxuXHRcdGxheWVyLm1zZyh0ZXh0U3RhdHVzKTtcclxuXHRcdGlmKG9wdGlvbnMuZXJyb3IpXHJcblx0XHRcdG9wdGlvbnMuZXJyb3IoWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKTtcclxuXHR9XHJcblx0b3B0LmJlZm9yZVNlbmQgPSBmdW5jdGlvbiAoeGhyKSB7XHJcblx0ICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCB0b2tlbik7IFxyXG5cdCAgICAgICBpZihvcHRpb25zLmJlZm9yZVNlbmQpe1xyXG5cdCAgICBcdCAgIG9wdGlvbnMuYmVmb3JlU2VuZCh4aHIpO1xyXG5cdCAgICAgICB9XHJcblx0fVxyXG5cdCQuYWpheChvcHQpO1xyXG59XHJcblxyXG5Qcm9sb2cuc3luY0FqYXggPSBmdW5jdGlvbihvcHRpb25zKXtcclxuXHR2YXIgcGRlZmF1bHQgPSB7XHJcblx0XHRcdHRpbWVvdXQ6MzAwMDBcdFxyXG5cdFx0fVxyXG5cdHZhciBvcHQgPSAkLmV4dGVuZCh0cnVlLCBwZGVmYXVsdCwgb3B0aW9ucyk7XHJcblx0b3B0LmVycm9yID0gZnVuY3Rpb24oWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKXtcclxuXHRcdGxheWVyLm1zZyh0ZXh0U3RhdHVzKTtcclxuXHRcdGlmKG9wdGlvbnMuZXJyb3IpXHJcblx0XHRcdG9wdGlvbnMuZXJyb3IoWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKTtcclxuXHR9XHJcblx0b3B0LmFzeW5jID0gZmFsc2U7XHJcblx0b3B0LmJlZm9yZVNlbmQgPSBmdW5jdGlvbiAoeGhyKSB7XHJcblx0ICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCB0b2tlbik7IFxyXG5cdCAgICAgICBpZihvcHRpb25zLmJlZm9yZVNlbmQpe1xyXG5cdCAgICBcdCAgIG9wdGlvbnMuYmVmb3JlU2VuZCh4aHIpO1xyXG5cdCAgICAgICB9XHJcblx0fVxyXG5cdCAgIFxyXG5cdCQuYWpheChvcHQpO1xyXG59XHJcblxyXG5Qcm9sb2cuZ2V0Rm9ybUJ5SWQgPSBmdW5jdGlvbihzeXN0ZW1JZCxtZW51SWQsZm9ybUlkKSB7XHJcblx0XHJcblx0dmFyIG15Zm9ybSA9bnVsbDtcclxuXHRcclxuXHR2YXIgZGF0YSA9IFByb2xvZy5nZXRKc29uRGF0YShcIi9qYXBpL3N5c2Zvcm0yL2Zvcm1cIixcIkdFVFwiLHtzeXN0ZW1JZDpzeXN0ZW1JZCxtZW51SWQ6bWVudUlkLGZvcm1JZDpmb3JtSWQsaWQ6c3lzdGVtSWQrXCJfXCIrbWVudUlkK1wiX1wiK2Zvcm1JZH0pO1xyXG5cdGlmKGRhdGEhPW51bGwgJiYgZGF0YS5zdWNjZXNzPT10cnVlKXtcclxuXHRcdFxyXG5cdFx0aWYoZGF0YS5kYXRhIT1udWxsICYmIGRhdGEuZGF0YS5maWVsZHMhPW51bGwpe1xyXG5cdFx0XHRteWZvcm0gPSBuZXcgUHJvbG9nRm9ybSgpO1xyXG5cdFx0XHR2YXIgZm9ybWRhdGEgPSBKU09OLnBhcnNlKGRhdGEuZGF0YS5maWVsZHMpO1xyXG5cdFx0XHRteWZvcm0uaW5pdChmb3JtZGF0YSk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGF5ZXIubXNnKFwi5pyq5a6a5LmJ6KGo5Y2V5YaF5a65XCIpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cdHJldHVybiBteWZvcm07XHJcbn07XHJcblxyXG5Qcm9sb2cuY3JlYXRlUmFuZG9tSWQgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiAobmV3IERhdGUoKSkuZ2V0VGltZSgpK01hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMiw1KTtcclxufVxyXG5cclxuUHJvbG9nLmxvYWRpbmcgPSBmdW5jdGlvbihlbCl7XHJcbiAgICBcclxuXHR2YXIgbG9hZGluZyA9IFBsZ0RpYWxvZy5sb2FkaW5nKCk7XHJcblx0Ly9sYXl1aS1sYXllcjE0XHJcblx0JChcIiNsYXl1aS1sYXllci1zaGFkZVwiK2xvYWRpbmcpLmFwcGVuZFRvKFwiI1wiK2VsKTtcclxuXHQkKFwiI2xheXVpLWxheWVyXCIrbG9hZGluZykuYXBwZW5kVG8oXCIjXCIrZWwpO1xyXG5cdCQoXCIjbGF5dWktbGF5ZXJcIitsb2FkaW5nKS5jc3MoXCJsZWZ0XCIsXCI1MCVcIik7XHJcblx0JChcIiNsYXl1aS1sYXllclwiK2xvYWRpbmcpLmNzcyhcIm1hcmdpbi1sZWZ0XCIsXCItOTBweFwiKTtcclxuXHQkKFwiI2xheXVpLWxheWVyXCIrbG9hZGluZykuY3NzKFwidG9wXCIsMjAwK1wicHhcIik7XHJcblx0cmV0dXJuIGxvYWRpbmc7XHJcbn1cclxuXHJcblByb2xvZy5jbG9zZUxvYWRpbmcgPSBmdW5jdGlvbihpZCl7XHJcblx0bGF5ZXIuY2xvc2UoaWQpO1xyXG59XHJcblxyXG5Qcm9sb2cubG9hZGluZzI9ZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaW5kZXggPSBQbGdEaWFsb2cubG9hZCgyLCB7XHJcbiAgICAgICAgc2hhZGU6IFswLjYsICcjZmZmJ10gLy8wLjHpgI/mmI7luqbnmoTnmb3oibLog4zmma9cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgIFBsZ0RpYWxvZy5jbG9zZShpbmRleClcclxuICAgIH1cclxufVxyXG5cclxuLypcclxuKiBAbWV0aG9kIOWIoOmZpCBQbGdHcmlkIOihjOaVsOaNrlxyXG4qIEBwYXJhbSBncmlkIC0gZ3JpZOaOp+S7tlxyXG4qIEBwYXJhbSB1cmwge3N0cmluZ30gLSDmlbDmja7mjqXlj6PlnLDlnYBcclxuKiBAcGFyYW0gdHlwZSB7c3RyaW5nfSAtIOaVsOaNruaOpeWPo+ivt+axguexu+Wei++8jOS4uuepuuaXtum7mOiupHBvc3RcclxuKiBAcGFyYW0gY29udGVudHR5cGUge3N0cmluZ30gLSDmlbDmja7mjqXlj6Por7fmsYIgY29udGVudFR5cGUg57G75Z6L77yM5Li656m65pe26buY6K6kYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXHJcbiogQHBhcmFtIHBhcmFtIHtvYmplY3R9IC0g6K+35rGC5Y+C5pWw5ZCNIHtcImlkXCI6MH1cclxuKiBAYXV0aG9yIGppd1xyXG4qIEBkZXByZWNhdGVkIOWIoOmZpFBsZ0dyaWTpgInkuK3ooYzmlbDmja7vvIzliKDpmaTmiJDlip/lkI5yZWxvYWRcclxuKi9cclxuXHJcblByb2xvZy5kZWxHcmlkUm93RGF0YSA9IGZ1bmN0aW9uIChncmlkLHVybCx0eXBlLGNvbnRlbnR0eXBlLHBhcmFtLG11bHRpc2VsZWN0KXtcclxuICAgIGlmKG11bHRpc2VsZWN0PT09ZmFsc2UpIHtcclxuICAgICAgICBpZiAoZ3JpZC5nZXRTZWxlY3RlZFJvd0lkKCkgPT0gbnVsbCAmJiBwYXJhbS5sZW5ndGg8MSkge1xyXG4gICAgICAgICAgICBQbGdEaWFsb2cubXNnKFwi6K+36YCJ5oup6KGMIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1lbHNle1xyXG4gICAgICAgIGlmKGdyaWQuZ2V0Q2hlY2tlZElkcygpID09IG51bGwpIHtcclxuICAgICAgICAgICAgUGxnRGlhbG9nLm1zZyhcIuivt+mAieaLqeihjCFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgUGxnRGlhbG9nLmNvbmZpcm0oJ+aYr+WQpuWIoOmZpOWQl++8nycsIHtcclxuICAgICAgICB0aXRsZTogJ+WIoOmZpOaPkOekuicsXHJcbiAgICAgICAgYnRuOiBbJ+ehruWumicsICflj5bmtognXSxcclxuICAgICAgICB6SW5kZXg6bGF5ZXIuekluZGV4XHJcbiAgICB9LCBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBQbGdEaWFsb2cuY2xvc2UoaW5kZXgpO1xyXG5cclxuICAgICAgICBpZiAodHlwZT09PVwiXCIpIHR5cGU9XCJwb3N0XCI7XHJcbiAgICAgICAgaWYgKGNvbnRlbnR0eXBlPT09XCJcIikgY29udGVudHR5cGU9XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIjtcclxuXHJcbiAgICAgICAgbGF5ZXIubXNnKFwi5pWw5o2u5aSE55CG5LitLi4uXCIpO1xyXG4gICAgICAgIFByb2xvZy5hamF4KHtcclxuICAgICAgICAgICAgdXJsOnVybCxcclxuICAgICAgICAgICAgdHlwZTp0eXBlLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogY29udGVudHR5cGUsXHJcbiAgICAgICAgICAgIGRhdGE6cGFyYW0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0aWYodHlwZW9mIGRhdGEgIT0gXCJvYmplY3RcIikgZGF0YT1KU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5zdWNjZXNzKXtcclxuICAgICAgICAgICAgICAgICAgICBncmlkLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLmNsb3NlQWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxvZmZzZXQ6IFwiYXV0b1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxpZDogJ2xheWVyRXJyb3InXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxhcmVhOltcIjUwMHB4XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICx0aXRsZTpcIumUmeivr+aPkOekulwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxjb250ZW50OiAnPGRpdiBzdHlsZT1cInBhZGRpbmc6IDEwcHg7XCI+JyskLnBhcnNlSlNPTihkYXRhKS5tZXNzYWdlKyc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxidG46ICflhbPpl60nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxidG5BbGlnbjogJ3InXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxzaGFkZTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAseWVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xvc2VBbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjpmdW5jdGlvbigpeyB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbn0iLCI7XHJcbihmdW5jdGlvbiAoJCwgbGF5dWkpIHtcclxuXHJcbiAgLy9QbGdUYWJzLmpzXHJcbiAgbGF5dWkudXNlKFtcImxheWVyXCJdLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbGF5ZXIgPSBsYXl1aS5sYXllcjtcclxuXHJcbiAgICBsYXllci5jb25maWcoe1xyXG4gICAgICBhbmltOiAwLCAvL+m7mOiupOWKqOeUu+mjjuagvFxyXG4gICAgICB6SW5kZXg6IDEwMDAwLFxyXG4gICAgICAvL3NraW46ICdsYXl1aS1sYXllci1sYW4nLFxyXG4gICAgICBzaGFkZTogMC41LFxyXG4gICAgICBidG5BbGlnbjogJ3InLFxyXG4gICAgICBmaXhlZDogZmFsc2VcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgcGxnRGlhbG9nID0gbGF5ZXI7XHJcblxyXG4gICAgcGxnRGlhbG9nLnNob3dVcGxvYWREaWFsb2cgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgIHZhciB3aW5vcHRpb25zID0ge1xyXG4gICAgICAgIHRpdGxlOiBcIuS4iuS8oOaWh+S7tlwiLFxyXG4gICAgICAgIHNraW46ICdsYXl1aS1sYXllci1sYW4nLFxyXG4gICAgICAgIGNsb3NlQnRuOiAxLFxyXG4gICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgcmVzaXplOiB0cnVlLFxyXG4gICAgICAgIGJ0bjogW1wi5LiK5LygXCIsIFwi5Y+W5raIXCJdLFxyXG4gICAgICAgIGJ0bjE6IGZ1bmN0aW9uIChpbmRleCwgbGF5ZXJvKSB7XHJcbiAgICAgICAgICBQbGdEaWFsb2cuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuMjogZnVuY3Rpb24gKGluZGV4LCBsYXllcm8pIHtcclxuICAgICAgICAgIFBsZ0RpYWxvZy5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcmVhOiBbJzMwMHB4JywgJzMwMHB4J10sXHJcbiAgICAgICAgY29udGVudDogJzxkaXYgaWQ9XCJ4eC13aW4tZGQtMVwiPjwvZGl2PicsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGxheWVybywgaW5kZXgpIHtcclxuICAgICAgICAgIHZhciBmb3JtZGF0YSA9IFt7XHJcbiAgICAgICAgICAgIHR5cGU6IFwidXBsb2FkXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiZmlsZXNcIixcclxuICAgICAgICAgICAgdXJsOiB1cmxcclxuICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgdmFyIG1mID0gbmV3IFBsZ0Zvcm0oe1xyXG4gICAgICAgICAgICBpdGVtczogZm9ybWRhdGFcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgbWYucmVuZGVyVG8oXCJ4eC13aW4tZGQtMVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBsYXllci5vcGVuKHdpbm9wdGlvbnMpO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIHBsZ0RpYWxvZy5zaG93R3JpZERpYWxvZyA9IGZ1bmN0aW9uIChwbGdHcmlkLCBjYWxsYmFjaywgb3B0cykge1xyXG4gICAgICB2YXIgd2lub3B0aW9ucyA9IHtcclxuICAgICAgICB0aXRsZTogb3B0cy50aXRsZSA/IG9wdHMudGl0bGUgOiBcIlwiLFxyXG4gICAgICAgIHNraW46ICdsYXl1aS1sYXllci1sYW4nLFxyXG4gICAgICAgIGNsb3NlQnRuOiAxLFxyXG4gICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgcmVzaXplOiB0cnVlLFxyXG4gICAgICAgIHRpcHNNb3JlOiB0cnVlLFxyXG4gICAgICAgIGJ0bjogW1wi6YCJ5oupXCIsIFwi5Y+W5raIXCJdLFxyXG4gICAgICAgIGJ0bjE6IGZ1bmN0aW9uIChpbmRleCwgbGF5ZXJvKSB7XHJcbiAgICAgICAgICB2YXIgaWQgPSBwbGdHcmlkLmdldFNlbGVjdGVkUm93SWQoKTtcclxuICAgICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgbGF5ZXIubXNnKFwi5Li66YCJ5oup5pWw5o2uXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIHJlY29yZCA9IHBsZ0dyaWQuZ2V0U2VsZWN0ZWRSb3dEYXRhKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICBjYWxsYmFjayhpZCwgcmVjb3JkKTtcclxuXHJcbiAgICAgICAgICBQbGdEaWFsb2cuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnRuMjogZnVuY3Rpb24gKGluZGV4LCBsYXllcm8pIHtcclxuICAgICAgICAgIFBsZ0RpYWxvZy5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhcmVhOiBbb3B0cy53aWR0aCArICdweCcsIG9wdHMuaGVpZ2h0ICsgJ3B4J10sXHJcbiAgICAgICAgY29udGVudDogJzxkaXYgaWQ9XCInICsgcGFuZWxJZCArICctd2luLWdyaWQtMVwiPjwvZGl2PicsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGxheWVybywgaW5kZXgpIHtcclxuICAgICAgICAgIHBsZ0dyaWQucmVuZGVyVG8ocGFuZWxJZCArICctd2luLWdyaWQtMScpO1xyXG4gICAgICAgICAgcGxnR3JpZC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgcGxnR3JpZC5vbihcIm9uUm93RGJsQ2xpY2tlZFwiLCBmdW5jdGlvbiAocmlkLCBpbmQpIHtcclxuICAgICAgICAgICAgdmFyIHJlY29yZCA9IHBsZ0dyaWQuZ2V0VXNlckRhdGEocmlkLCBcImRhdGFcIik7O1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgY2FsbGJhY2socmlkLCByZWNvcmQpO1xyXG5cclxuICAgICAgICAgICAgUGxnRGlhbG9nLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0eXBlID09IDEpIHtcclxuICAgICAgICB3aW5vcHRpb25zLmJ0biA9IFtcIuS/neWtmFwiLCBcIuWPlua2iFwiXTtcclxuICAgICAgICB3aW5vcHRpb25zLmJ0bjIgPSB3aW5vcHRpb25zLmJ0bjM7XHJcbiAgICAgICAgd2lub3B0aW9ucy5idG4zID0gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgUGxnRGlhbG9nLm9wZW4od2lub3B0aW9ucyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBwbGdEaWFsb2cubG9hZGluZzIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBpbmRleCA9IFBsZ0RpYWxvZy5sb2FkKDIsIHtcclxuICAgICAgICBzaGFkZTogWzAuNiwgJyNmZmYnXSAvLzAuMemAj+aYjuW6pueahOeZveiJsuiDjOaZr1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgUGxnRGlhbG9nLmNsb3NlKGluZGV4KVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHdpbmRvdy5QbGdEaWFsb2cgPSBwbGdEaWFsb2c7XHJcblxyXG4gIH0pO1xyXG5cclxuXHJcblxyXG59KShqUXVlcnksIGxheXVpKTsiLCIoZnVuY3Rpb24oJCwgbGF5dWkpe1xyXG4gICQuZm4uaW5pdFBsZ0lucHV0VGFncyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICB2YXIgcGcgPSBuZXcgcGxnSW5wdXRUYWdzKG9wdGlvbnMpO1xyXG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICBwZy5yZW5kZXJUbyhpZCk7XHJcbiAgICByZXR1cm4gcGc7XHJcbiAgfVxyXG5cclxuICB2YXIgcGxnSW5wdXRUYWdzID0gZnVuY3Rpb24gKHBhcmFtcyl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgIFxyXG4gICAgdmFyIGNsYXNzTWFpbiA9IHtcclxuICAgICAgY2hlY2tib3hOYW1lOiAnJyxcclxuICAgICAgbGF5RmlsdGVyOiAnJyxcclxuICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgZG9tOiBudWxsLFxyXG4gICAgICB0YWdzSWQ6ICd0YWdzLScgKyBQcm9sb2cuY3JlYXRlUmFuZG9tSWQoKSxcclxuICAgICAgbWV1blBhbmVsVGhpczogbnVsbCxcclxuICAgICAgc2V0RGVmYXVsdFZhbHVlOiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgIGlmKCEoZGF0YSAmJiBkYXRhLmxlbmd0aCA+IDApKXtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eUqOaIt+S8oOmAkui/m+adpeeahOaVsOaNruS4jeaYr+aVsOe7hCcpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YS5tYXAoZnVuY3Rpb24odmFsKXtcclxuXHJcbiAgICAgICAgICBpZighdmFsLmhhc093blByb3BlcnR5KCdjaGVja2VkJykpe1xyXG4gICAgICAgICAgICB2YWwuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgfSxcclxuICAgICAgd3JhcFRlbXBsYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgdGVtVGVtcGxhdGUgPSAnJztcclxuICAgICAgICBcclxuICAgICAgICB0ZW1UZW1wbGF0ZSArPSBgPGRpdiBjbGFzcz1cImxheXVpLWZvcm0taXRlbVwiPlxyXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImxheXVpLWZvcm0tbGFiZWxcIj7ljp/lp4vlpI3pgInmoYY8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1pbnB1dC1ibG9ja1wiPmA7XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCl7XHJcbiAgICAgICAgICB0ZW1UZW1wbGF0ZSArPSBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFxyXG4gICAgICAgICAgbmFtZT1cIiR7c2VsZi5jaGVja2JveE5hbWV9WyR7dmFsLmFsaWFzfV1cIiBcclxuICAgICAgICAgIGxheS1za2luPVwicHJpbWFyeVwiIGxheS1maWx0ZXI9XCIke3NlbGYubGF5RmlsdGVyfVwiIFxyXG4gICAgICAgICAgdGl0bGU9XCIke3ZhbC50ZXh0fVwiICR7IHZhbC5jaGVja2VkID8gJ2NoZWNrZWQ9XCJcIicgOiAnJ30gLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS11bnNlbGVjdCBsYXl1aS1mb3JtLWNoZWNrYm94ICR7IHZhbC5jaGVja2VkID8gJ2xheXVpLWZvcm0tY2hlY2tlZCcgOiAnJ31cIiBcclxuICAgICAgICAgIGxheS1za2luPVwicHJpbWFyeVwiPjxzcGFuPiR7dmFsLnRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLWljb24tb2tcIj48L2k+PC9kaXY+XHJcbiAgICAgICAgICBgO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0ZW1UZW1wbGF0ZSArPSBgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1mb3JtLWl0ZW1cIj5cclxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxheXVpLWZvcm0tbGFiZWxcIj7lt7Lnu4/pgInkuK08L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWlucHV0LWJsb2NrIHRhZ3NcIiBpZD1cIiR7c2VsZi50YWdzSWR9XCI+PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICByZXR1cm4gdGVtVGVtcGxhdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8g6K6+572u6buY6K6k5YC8LCBjaGVja2VkLCDpu5jorqRmYWxzZVxyXG4gICAgLy8gdmFyIGRhdGEgPSBwYXJhbXMuZGF0YTtcclxuICAgIGlmKCFwYXJhbXMuY2hlY2tib3hOYW1lIHx8ICFwYXJhbXMubGF5RmlsdGVyKXtcclxuICAgICAgY29uc29sZS5lcnJvcign6K+36K6+572uY2hlY2tvdXTnmoTlkI3lrZcs6K+l5ZCN5a2X5bCG5Lya5piv5oKo6I635Y+WZm9ybeWQjeensOeahGtleScpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjbGFzc01haW4uY2hlY2tib3hOYW1lID0gcGFyYW1zLmNoZWNrYm94TmFtZTtcclxuICAgIC8vIGNsYXNzTWFpbi5sYXlGaWx0ZXIgPSBwYXJhbXMubGF5RmlsdGVyO1xyXG4gICAgY2xhc3NNYWluLnNldERlZmF1bHRWYWx1ZShwYXJhbXMuZGF0YSk7XHJcbiAgICB0aGlzLnRhZ3NJZCA9IGNsYXNzTWFpbi50YWdzSWQ7XHJcbiAgICB0aGlzLmxheUZpbHRlciA9IGNsYXNzTWFpbi5sYXlGaWx0ZXIgPSBwYXJhbXMubGF5RmlsdGVyIHx8ICdwbGctJyArIFByb2xvZy5jcmVhdGVSYW5kb21JZCgpO1xyXG4gICAgXHJcbiAgICB0aGlzLndyYXBUYW1wbGF0ZSA9ICQoY2xhc3NNYWluLndyYXBUZW1wbGF0ZSgpKTtcclxuXHJcbiAgICBpZihwYXJhbXMucmVuZGVyZXIpIHtcclxuICAgICAgc2VsZi5yZW5kZXJUbyhwYXJhbXMucmVuZGVyZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxnSW5wdXRUYWdzLnByb3RvdHlwZS5yZW5kZXJUbyA9IGZ1bmN0aW9uKHRhcmdldElkKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHZhciAkdGFyZ2V0SWQgPSAkKCcjJyArIHRhcmdldElkKTtcclxuICAgIHZhciAkdGFnc0lkID0gJHRhcmdldElkLmZpbmQoXCIjXCIgKyBzZWxmLnRhZ3NJZCk7XHJcblxyXG4gICAgJHRhcmdldElkLmFwcGVuZChzZWxmLndyYXBUYW1wbGF0ZSk7XHJcbiAgICBcclxuICAgIHZhciBmb3JtID0gbGF5dWkuZm9ybTtcclxuICAgIGZvcm0ucmVuZGVyKCk7XHJcbiAgXHJcbiAgICB2YXIgdGFnTGlzdCA9IFtdOyAvLyDnlKjmiLfmoIfnrb7liJfooahcclxuICAgIFxyXG4gICAgdmFyIGlucHV0VGFncyA9IHtcclxuICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRlbU9iaiA9IHt9O1xyXG4gICAgICAgIHZhciBjaGVja2JveExpc3QgPSAkdGFyZ2V0SWQuZmluZChcclxuICAgICAgICAgIFwiLmxheXVpLWZvcm0tY2hlY2tlZFwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoY2hlY2tib3hMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgdGVtT2JqID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogY2hlY2tib3hMaXN0LnNpYmxpbmdzKFwiaW5wdXRcIikuYXR0cihcInRpdGxlXCIpLFxyXG4gICAgICAgICAgICBuYW1lOiBjaGVja2JveExpc3Quc2libGluZ3MoXCJpbnB1dFwiKS5hdHRyKFwibmFtZVwiKVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRlbU9iaikgIT09IFwie31cIikge1xyXG4gICAgICAgICAgdGFnTGlzdC5wdXNoKHRlbU9iaik7XHJcbiAgICAgICAgICB0YWdMaXN0LmZvckVhY2goZnVuY3Rpb24odikge1xyXG4gICAgICAgICAgICBpbnB1dFRhZ3MuYWRkKHYpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBhZGQ6IGZ1bmN0aW9uKHRlbU9iaikge1xyXG4gICAgICAgIHZhciB0ZW1UZW1wYWx0ZSA9IGA8c3Bhbj5cclxuICAgICAgICAgIDxlbSBuYW1lPVwiJHt0ZW1PYmoubmFtZX1cIj4ke3RlbU9iai52YWx1ZX08L2VtPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiPsOXPC9idXR0b24+XHJcbiAgICAgICAgPC9zcGFuPmA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnIycgKyBzZWxmLnRhZ3NJZCkuYXBwZW5kKHRlbVRlbXBhbHRlKTtcclxuICBcclxuICAgICAgICB2YXIgdGVtSW5wdXRIaWRkZW4gPSBgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiJHt0ZW1PYmoubmFtZX1cIiBcclxuICAgICAgICAgIHZhbHVlPVwiJHt0ZW1PYmoudmFsdWV9XCIvPmA7XHJcbiAgICAgICAgICAkdGFyZ2V0SWQuYWZ0ZXIodGVtSW5wdXRIaWRkZW4pO1xyXG4gIFxyXG4gICAgICAgIGlmICh0YWdMaXN0LmluZGV4T2YodGVtT2JqKSA9PT0gLTEpIHtcclxuICAgICAgICAgIHRhZ0xpc3QucHVzaCh0ZW1PYmopO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgXHJcbiAgICAgIGRlbDogZnVuY3Rpb24odGVtT2JqKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RlbCB0ZW1PYmogYmVmb3JlJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGFnTGlzdCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RlbCB0ZW1PYmogYmVmb3JlJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RlbCB0YWdMaXN0IGV2ZW50Jyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVtT2JqKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnZGVsIHRlbU9iaiBldmVudCcpO1xyXG5cclxuICAgICAgICAvLyDku450YWdMaXN05Yig6ZmkdGVtT2JqXHJcbiAgICAgICAgaWYgKHRhZ0xpc3QgJiYgdGFnTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0YWdMaXN0LmZvckVhY2goZnVuY3Rpb24odmFsLCBpbmQpIHtcclxuICAgICAgICAgICAgaWYgKHZhbC5uYW1lID09PSB0ZW1PYmoubmFtZSkge1xyXG4gICAgICAgICAgICAgIHRhZ0xpc3Quc3BsaWNlKGluZCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmk43kvZzlrozmiJDkuYvlkI7lsLHlkK/liqjph43mlrDmuLLmn5NcclxuICBcclxuICAgICAgICAvLyAyLiDliKDpmaR0YWdz5Lit55qE5qCH562+ICBUT0RPOjog5q2k5YGa5rOV5pyJ54K55a+5RE9N55qE6YeN5paw5riy5p+T5b2x5ZON5q+U6L6D5aSnXHJcbiAgICAgICAgLy8gJCgnI2lucHV0VGFncycpLmZpbmQoJ25hbWU9JysgdGVtT2JqLm5hbWUpLnBhcmVudCgnc3BhbicpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoXCIjXCIgKyBzZWxmLnRhZ3NJZCkuZW1wdHkoKTtcclxuICAgICAgICB2YXIgdGVtVGVtcGFsdGUgPSBcIlwiO1xyXG4gICAgICAgIGlmICh0YWdMaXN0ICYmIHRhZ0xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGFnTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaW5kKSB7XHJcbiAgICAgICAgICAgIHRlbVRlbXBhbHRlICs9IGA8c3Bhbj48ZW0gbmFtZT1cIiR7dmFsLm5hbWV9XCI+JHtcclxuICAgICAgICAgICAgICB2YWwudmFsdWVcclxuICAgICAgICAgICAgfTwvZW0+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiPsOXPC9idXR0b24+PC9zcGFuPmA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJChcIiNcIiArIHNlbGYudGFnc0lkKS5hcHBlbmQodGVtVGVtcGFsdGUpO1xyXG4gIFxyXG4gICAgICAgIC8vIDMuIOWIoOmZpGlucHV0IGhpZGRlbuS4reeahOagh+etvuiKgueCuVxyXG4gICAgICAgICQoXCIjXCIgKyBzZWxmLnRhcmdldElkKVxyXG4gICAgICAgICAgLmZpbmQoJ2lucHV0W25hbWU9XCInICsgdGVtT2JqLm5hbWUgKyAnXCJdJylcclxuICAgICAgICAgIC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICBcclxuICAgIGlucHV0VGFncy5pbml0KCk7XHJcbiAgICBcclxuICAgIGZvcm0ub24oXCJjaGVja2JveChcIisgc2VsZi5sYXlGaWx0ZXIgK1wiKVwiLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgIHZhciBpc0NoZWNrZWQgPSBkYXRhLmVsZW0uY2hlY2tlZDtcclxuICAgICAgdmFyIGpxdWVyeUVsZW0gPSAkKGRhdGEuZWxlbSk7XHJcbiAgICAgIHZhciB0ZW1PYmogPSB7XHJcbiAgICAgICAgdmFsdWU6IGpxdWVyeUVsZW0uYXR0cihcInRpdGxlXCIpLFxyXG4gICAgICAgIG5hbWU6IGpxdWVyeUVsZW0uYXR0cihcIm5hbWVcIilcclxuICAgICAgfTtcclxuICBcclxuICAgICAgaWYgKGlzQ2hlY2tlZCkge1xyXG4gICAgICAgIGlucHV0VGFncy5hZGQodGVtT2JqKTtcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICBpZiAoIWlzQ2hlY2tlZCkge1xyXG4gIFxyXG4gICAgICAgIGlucHV0VGFncy5kZWwodGVtT2JqKTtcclxuICAgICAgfVxyXG4gICAgICAvLyA8c3Bhbj48ZW0+5qCH6aKY5LiAPC9lbT48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCI+w5c8L2J1dHRvbj48L3NwYW4+XHJcbiAgICB9KTtcclxuICBcclxuICAgICR0YXJnZXRJZC5maW5kKFwiI1wiICsgc2VsZi50YWdzSWQpLm9uKFwiY2xpY2tcIiwgXCIuY2xvc2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICB2YXIgdGVtSnF1ZXJ5T2JqID0gJCh0aGlzKS5zaWJsaW5ncyhcImVtXCIpO1xyXG4gICAgICB2YXIgdGVtT2JqID0ge1xyXG4gICAgICAgIHZhbHVlOiB0ZW1KcXVlcnlPYmouaHRtbCgpLFxyXG4gICAgICAgIG5hbWU6IHRlbUpxdWVyeU9iai5hdHRyKFwibmFtZVwiKVxyXG4gICAgICB9O1xyXG4gICAgIFxyXG4gICAgICBpbnB1dFRhZ3MuZGVsKHRlbU9iaik7XHJcbiAgXHJcbiAgICAgIC8vIDEuIOa4heepumNoZWNrYm94IOS4remAieS4reeahO+8jOS/ruaUueeKtuaAgeOAgumHjeaWsOinpuWPkeiiq+WIoOmZpOeahHRhZ3NcclxuICAgICAgdmFyIGNoZWNrZWRMaXN0ID0gc2VsZi53cmFwVGFtcGxhdGUuZmluZChcclxuICAgICAgICBcIi5sYXl1aS1mb3JtLWNoZWNrYm94XCJcclxuICAgICAgKTtcclxuICAgICAgLy8g5bCG57G75pWw57uE6L2s5YyW5Li65pWw57uEXHJcbiAgICAgIGNoZWNrZWRMaXN0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY2hlY2tlZExpc3QpO1xyXG4gIFxyXG4gICAgICBpZiAoY2hlY2tlZExpc3QgJiYgY2hlY2tlZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNoZWNrZWRMaXN0LmZvckVhY2goZnVuY3Rpb24odmFsLCBpbmQpIHtcclxuICAgICAgICAgIHZhciB0ZW1IdG1sID0gJCgkKHZhbCkuZmluZChcInNwYW5cIilbMF0pLmh0bWwoKTtcclxuICAgICAgICAgIGlmICh0ZW1PYmoudmFsdWUgPT09IHRlbUh0bWwpIHtcclxuICAgICAgICAgICAgc2VsZi53cmFwVGFtcGxhdGUuZmluZCgnLmxheXVpLWZvcm0tY2hlY2tib3gnKVxyXG4gICAgICAgICAgICAgIC5lcShpbmQpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB3aW5kb3cuUGxnSW5wdXRUYWdzID0gcGxnSW5wdXRUYWdzO1xyXG59KGpRdWVyeSwgbGF5dWkpKTsiLCIvKipcclxuICogaGR3XHJcbiAqIDIwMTkuMDEuMjhcclxuICog6Z2i5p2/57uE5Lu2XHJcbiAqL1xyXG5cclxuOyhmdW5jdGlvbiAoJCwgbGF5dWkpIHtcclxuXHJcbiAgICAvL1BsZ1BhbmVsLmpzXHJcbiAgICBsYXl1aS51c2UoW1wiZWxlbWVudFwiXSwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0ZW1wbGF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHNhbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc2tpbk9CSiA9IHtcclxuICAgICAgICAgICAgICAgIDA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAxOiBcInNraW5fMVwiLFxyXG4gICAgICAgICAgICAgICAgMjogXCJza2luXzJcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoIXNraW5PQkpbc2FsZi5za2luXSkgc2FsZi5za2luID0gMDtcclxuICAgICAgICAgICAgdmFyIGh0bWwgPSBgPGRpdiBjbGFzcz1cImxheXVpLWNhcmQgUGxnUGFuZWwgJHtza2luT0JKW3NhbGYuc2tpbl19ICR7c2FsZi5jbGFzc05hbWU/c2FsZi5jbGFzc05hbWU6XCJcIn1cIiAke3NhbGYuaWQ/YGlkPSR7c2FsZi5pZH1gOlwiXCJ9ICAke3NhbGYuc3R5bGU/YHN0eWxlPVwiJHtzYWxmLnN0eWxlfVwiYDpcIlwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAke3NhbGYuaGVhZGVyLmlzU2hvdz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJsYXl1aS1jYXJkLWhlYWRlclwiPiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZSBpb1wiPiR7c2FsZi5oZWFkZXIudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3NhbGYuaGVhZGVyLm1vcmVCdG4mJnNhbGYuaGVhZGVyLm1vcmVCdG4ubGVuZ3RoPjA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJtb3JlX2dyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtzYWxmLmhlYWRlci5tb3JlQnRuLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8YSBjbGFzcz1cImxheXVpLWJ0biBsYXl1aS1idG4tc20gbGF5dWktYnRuLW5vcm1hbCAke2l0ZW0uY2xhc3NOYW1lP2Ake2l0ZW0uY2xhc3NOYW1lfWA6XCJcIn1cIiBocmVmPVwiamF2YXNjcmlwdDo7XCI+ICR7aXRlbS5pY29uP2A8aSBjbGFzcz1cIiR7aXRlbS5pY29ufVwiPjwvaT5gOlwiXCJ9JHtpdGVtLm5hbWV9PC9hPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA6XCJcIn0gICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgIGA6XCJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiAkKGh0bWwpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIFBhbmVsRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHNhbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZighc2FsZi5kZWZhdWx0Qm9keSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHNhbGYuZGVmYXVsdEJvZHksaHRtbCA9IG51bGw7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sYXlvdXRDb2wgPCAwIHx8IGRhdGEubGF5b3V0Q29sID4gMTIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJsYXlvdXRDb2w65LiN6IO95bCP5LqOMOaIluS4jeiDveWkp+S6jjEyXCIpO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaW5wdXRCbG9jayhpdGVtLCB2YWx1ZUJqKSB7XHJcbiAgICAgICAgICAgICAgICBpZighaXRlbS50eXBlKSBpdGVtLnR5cGU9XCJ0ZXh0XCI7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZXh0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFpdGVtLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS52YWx1ZT1cIjxzcGFuIHN0eWxlPSdjb2xvcjojYzNjM2MzJz7mmoLml6DmlbDmja48L3NwYW4+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwidGV4dC1pbmZvICR7dmFsdWVCaj9cImJqXCI6XCJcIn1cIj4ke2l0ZW0udmFsdWV9PC9kaXY+YDtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW5wdXRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWl0ZW0udmFsdWUpIGl0ZW0udmFsdWU9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeS/oeaBr1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGNsYXNzPVwibGF5dWktaW5wdXRcIiB2YWx1ZT1cIiR7aXRlbS52YWx1ZX1cIj5gO1xyXG4gICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEuY29scykge1xyXG4gICAgICAgICAgICAgICAgaHRtbCA9IGA8Zm9ybSBjbGFzcz1cImxheXVpLWZvcm0gY2xcIiBzdHlsZT1cInBhZGRpbmc6NXB4XCIgbGF5LWZpbHRlcj1cIlwiPiAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtkYXRhLmNvbHMubWFwKGZ1bmN0aW9uKGFycil7ICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibGF5dWktcm93IGxheXVpLWNvbC1zcGFjZTEwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7YXJyLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImxheXVpLWNvbC1tZCR7aXRlbS5sYXlvdXRDb2x8fGRhdGEubGF5b3V0Q29sfSAke2l0ZW0ub2Zmc2V0P2BsYXl1aS1jb2wtbWQtb2Zmc2V0JHtpdGVtLm9mZnNldH1gOlwiXCJ9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWZvcm0taXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImxheXVpLWZvcm0tbGFiZWxcIj4ke2l0ZW0ubGFiZWx977yaPC9sYWJlbD4gICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWlucHV0LWJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbnB1dEJsb2NrKGl0ZW0sZGF0YS52YWx1ZUJqKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuam9pbihcIlwiKX0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oXCJcIil9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+YDtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJChodG1sKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcGxnUGFuZWwoZWxlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIF90aGlzLmlkID0gXCJQbGdQYW5lbFwiICsgbmV3IERhdGUoKS52YWx1ZU9mKCk7IC8v6YCJ5oup5ZmoXHJcblxyXG4gICAgICAgICAgICB2YXIgZWxlLCBvcHQ7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5pWw5o2u5YWl5Y+jXHJcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBvcHQgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyOlwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpbiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlIDpcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JlQnRuIDpudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXB5dDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JlQnRuOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRCb2R5IDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oX3RoaXMsY29uZmlnLG9wdCk7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nZXRFbGVtZW50ID0gdGVtcGxhdGUuY2FsbChfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKbmnIlkZWZhdWx0Qm9keemFjee9riAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuZGVmYXVsdEJvZHkhPW51bGwgJiYgX3RoaXMuZGVmYXVsdEJvZHkuY29scyYmX3RoaXMuZGVmYXVsdEJvZHkuY29scy5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5hcHBlbmRQYW5lbEJvZHkoUGFuZWxGb3JtLmNhbGwoX3RoaXMpKTsgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVuZGVyVG8oX3RoaXMucmVuZGVyZXIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgZWxlID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICAgICAgb3B0ID0gYXJndW1lbnRzWzFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcHRzID0gJC5leHRlbmQodHJ1ZSwgY29uZmlnLCBvcHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmdldEVsZW1lbnQgPSB0ZW1wbGF0ZShfdGhpcy5vcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXJUbyhlbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwbGdQYW5lbC5wcm90b3R5cGUucmVuZGVyVG8gPSBmdW5jdGlvbiAoZWxlKSB7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmVtcHl0KXtcclxuICAgICAgICAgICAgICAgJChcIiNcIiArIGVsZSkuZW1wdHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKFwiI1wiICsgZWxlKS5hcHBlbmQodGhpcy5nZXRFbGVtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwbGdQYW5lbC5wcm90b3R5cGUuYXBwZW5kUGFuZWxCb2R5ID0gZnVuY3Rpb24gKEVsZW1lbnRPYmpjZXQsIGlzRW1wdHkgPSBmYWxzZSkge1xyXG4gICAgICAgICAgICB2YXIgZWxlPXRoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLWNhcmQtYm9keVwiKTtcclxuICAgICAgICAgICAgaWYoaXNFbXB0eSl7XHJcbiAgICAgICAgICAgICAgICBlbGUuZW1wdHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGNvbnNvbGUuZGlyKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoRWxlbWVudE9iamNldCkgIClcclxuICAgICAgICAgICBjb25zb2xlLmRpcihFbGVtZW50T2JqY2V0WzBdLm5vZGVUeXBlID09PSAxICAgKVxyXG4gICAgICAgICAgIGNvbnNvbGUuZGlyKHR5cGVvZiBFbGVtZW50T2JqY2V0WzBdLm5vZGVOYW1lID09PSAnc3RyaW5nJyApXHJcbiAgICAgICAgICAgLy8gY29uc29sZS5kaXIodHlwZW9mIEVsZW1lbnRPYmpjZXQgKVxyXG4gICAgICAgICAgIGNvbnNvbGUuZGlyKCBFbGVtZW50T2JqY2V0WzBdIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpO1xyXG4gICAgICAgICAgIGNvbnNvbGUuZGlyKCBFbGVtZW50T2JqY2V0IGluc3RhbmNlb2YgalF1ZXJ5KVxyXG4gICAgICAgICAgIGNvbnNvbGUuZGlyKFwiZGVmYXVsdEJvZHk6XCIrIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLmRlZmF1bHRCb2R5KSAgKVxyXG4gICAgICAgICAgIGNvbnNvbGUuZGlyKFwiZGVmYXVsdEJvZHk6XCIrQXJyYXkuaXNBcnJheSh0aGlzLmRlZmF1bHRCb2R5KSlcclxuICAgICAgICAgICBjb25zb2xlLmRpcih0aGlzLmRlZmF1bHRCb2R5IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXHJcbiAgICAgICAgICAgIGVsZS5hcHBlbmQoRWxlbWVudE9iamNldCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgd2luZG93LlBsZ1BhbmVsID0gcGxnUGFuZWw7XHJcblxyXG4gICAgICAgIC8qICAgICAgICAgJC5mbi5QbGdQYW5lbCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBwbGdQYW5lbCh0aGlzLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAqL1xyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG59KShqUXVlcnksIGxheXVpKTsiLCI7KGZ1bmN0aW9uICgkKSB7XHJcbiAgICB2YXIgc3RyQ2hpbmVzZUZpcnN0UFkgPSBcIllEWVFTWE1XWlNTWEpCWU1HQ0NaUVBTU1FCWUNEU0NEUUxEWUxZQlNTSkdZWlpKSkZLQ0NMWkRIV0RXWkpMSlBGWVlOV0pKVE1ZSFpXWkhGTFpQUFFIR1NDWVlZTkpRWVhYR0pISFNEU0pOS0tUTU9NTENSWFlQU05RU0VDQ1FaR0dMTFlKTE1ZWlpTRUNZS1lZSFFXSlNTR0dZWFlaWUpXV0tESkhZQ0hNWVhKVExYSllRQllYWkxEV1JESlJXWVNSTERaSlBDQlpKSkJSQ0ZUTEVDWlNUWkZYWFpIVFJRSFlCRExZQ1pTU1lNTVJGTVlRWlBXV0pKWUZDUldGREZaUVBZRERXWVhLWUpBV0pGRlhZUFNGVFpZSEhZWllTV0NKWVhTQ0xDWFhXWlpYTkJHTk5YQlhMWlNaU0JTR1BZU1laREhNRFpCUUJaQ1dEWlpZWVRaSEJUU1lZQlpHTlROWFFZV1FTS0JQSEhMWEdZQkZNSkVCSkhIR1FUSkNZU1hTVEtaSExZQ0tHTFlTTVpYWUFMTUVMRENDWEdaWVJKWFNETFRZWkNRS0NOTkpXSEpUWlpDUUxKU1RTVEJOWEJUWVhDRVFYR0tXSllGTFpRTFlIWVhTUFNGWExNUEJZU1hYWFlESkNaWUxMTFNKWEZISlhQSkJURkZZQUJZWEJIWlpCSllaTFdMQ1pHR0JUU1NNRFRKWlhQVEhZUVRHTEpTQ1FGWktKWkpRTkxaV0xTTEhEWkJXSk5DSlpZWlNRUVlDUVlSWkNKSldZQlJUV1BZRlRXRVhDU0tEWkNUQlpIWVpaWVlKWFpDRkZaWk1KWVhYU0RaWk9UVEJaTFFXRkNLU1pTWEZZUkxOWUpNQkRUSEpYU1FRQ0NTQlhZWVRTWUZCWERaVEdCQ05TTENZWlpQU0FaWVpaU0NKQ1NIWlFZRFhMQlBKTExNUVhUWURaWFNRSlRaUFhMQ0dMUVRaV0pCSENUU1lKU0ZYWUVKSlRMQkdYU1hKTVlKUVFQRlpBU1lKTlRZREpYS0pDREpTWkNCQVJURENMWUpRTVdOUU5DTExMS0JZQlpaU1lIUVFMVFdMQ0NYVFhMTFpOVFlMTkVXWVpZWENaWFhHUktSTVRDTkROSlRTWVlTU0RRREdIU0RCSkdIUldSUUxZQkdMWEhMR1RHWEJRSkRaUFlKU0pZSkNUTVJOWU1HUlpKQ1pHSk1aTUdYTVBSWVhLSk5ZTVNHTVpKWU1LTUZYTUxEVEdGQkhDSkhLWUxQRk1EWExRSkpTTVRRR1pTSkxRRExER0pZQ0FMQ01aQ1NESkxMTlhESkZGRkZKQ1pGTVpGRlBGS0hLR0RQU1hLVEFDSkRISFpERENSUkNGUVlKS1FDQ1dKRFhIV0pMWUxMWkdDRkNRRFNNTFpQQkpKUExTQkNKR0dEQ0tLREVaU1FDQ0tKR0NHS0RKVEpETFpZQ1hLTFFTQ0dKQ0xURlBDUUNaR1dQSkRRWVpKSkJZSkhTSkRaV0dGU0pHWktRQ0NaTExQU1BLSkdRSkhaWkxKUExHSkdKSlRISkpZSlpDWk1MWkxZUUJHSldNTEpLWFpEWk5KUVNZWk1MSkxMSktZV1hNS0pMSFNLSkdCTUNMWVlNS1hKUUxCTUxMS01EWFhLV1lYWVNMTUxQU0pRUUpRWFlYRkpUSkRYTVhYTExDWFFCU1lKQkdXWU1CR0dCQ1lYUEpZR1BFUEZHREpHQkhCTlNRSllaSktKS0hYUUZHUVpLRkhZR0tIREtMTFNESlFYUFFZS1lCTlFTWFFOU1pTV0hCU1hXSFhXQlpaWERNTlNKQlNCS0JCWktMWUxYR1dYRFJXWVFaTVlXU0pRTENKWFhKWEtKRVFYU0NZRVRMWkhMWVlZU0RaUEFRWVpDTVRMU0hUWkNGWVpZWFlMSlNEQ0pRQUdZU0xDUUxZWVlTSE1SUVFLTERYWlNDU1NTWURZQ0pZU0ZTSkJGUlNTWlFTQlhYUFhKWVNEUkNLR0pMR0RLWkpaQkRLVENTWVFQWUhTVENMREpESE1YTUNHWFlaSEpERFRNSExUWFpYWUxZTU9IWUpDTFRZRkJRUVhQRkJERkhIVEtTUUhaWVlXQ05YWENSV0hPV0dZSkxFR1dEUUNXR0ZKWUNTTlRNWVRPTEJZR1dRV0VTSlBXTk1MUllEWlNaVFhZUVBaR0NXWEhOR1BZWFNITVlRSlhaVERQUEJGWUhaSFRKWUZEWldLR0taQkxETlRTWEhRRUVHWlpZTFpNTVpZSlpHWFpYS0hLU1RYTlhYV1lMWUFQU1RIWERXSFpZTVBYQUdLWURYQkhOSFhLRFBKTk1ZSFlMUE1HT0NTTE5aSEtYWExQWlpMQk1MU0ZCSEhHWUdZWUdHQkhTQ1lBUVRZV0xYVFpRQ0VaWURRRFFNTUhUS0xMU1pITFNKWldGWUhRU1dTQ1dMUUFaWU5ZVExTWFRIQVpOS1paU1paTEFYWFpXV0NUR1FRVEREWVpUQ0NIWVFaRkxYUFNMWllHUFpTWk5HTE5EUVRCRExYR1RDVEFKREtZV05TWVpMSkhIWlpDV05ZWVpZV01IWUNISFlYSEpLWldTWEhaWVhMWVNLUVlTUFNMWVpXTVlQUEtCWUdMS1pIVFlYQVhRU1lTSFhBU01DSEtEU0NSU1dKUFdYU0daSkxXV1NDSFNKSFNRTkhDU0VHTkRBUVRCQUFMWlpNU1NURFFKQ0pLVFNDSkFYUExHR1hISEdYWFpDWFBETU1ITERHVFlCWVNKTVhITVJDUFhYSlpDS1pYU0hNTFFYWFRUSFhXWkZLSENDWkRZVENKWVhRSExYREhZUEpRWFlMU1lZRFpPWkpOWVhRRVpZU1FZQVlYV1lQREdYRERYU1BQWVpORExUV1JIWFlEWFpaSkhUQ1hNQ1pMSFBZWVlZTUhaTExITlhNWUxMTE1EQ1BQWEhNWERLWUNZUkRMVFhKQ0hIWlpYWkxDQ0xZTE5aU0haSlpaTE5OUkxXSFlRU05KSFhZTlRUVEtZSlBZQ0hIWUVHS0NUVFdMR1FSTEdHVEdUWUdZSFBZSFlMUVlRR0NXWVFLUFlZWVRUVFRMSFlITExUWVRUU1BMS1laWEdaV0dQWURTU1paRFFYU0tDUU5NSkpaWkJYWVFNSlJURkZCVEtIWktCWExKSktEWEpUTEJXRlpQUFRLUVRaVEdQREdOVFBKWUZBTFFNS0dYQkRDTFpGSFpDTExMTEFEUE1YREpITENDTEdZSERaRkdZRERHQ1lZRkdZRFhLU1NFQkRIWUtES0RLSE5BWFhZQlBCWVlIWFpRR0FGRlFZSlhETUxKQ1NRWkxMUENIQlNYR0pZTkRZQllRU1BaV0pMWktTRERUQUNUQlhaRFlaWVBKWlFTSk5LS1RLTkpESkdZWVBHVExGWVFLQVNETlRDWUhCTFdEWkhCQllEV0pSWUdLWllIRVlZRkpNU0RUWUZaSkpIR0NYUExYSExEV1hYSktZVENZS1NTU01UV0NUVFFaTFBCU1pEWldaWEdaQUdZS1RZV1hMSExTUEJDTExPUU1NWlNTTENNQkpDU1paS1lEQ1pKR1FRRFNNQ1lUWlFRTFdaUVpYU1NGUFRURlFNRERaRFNIRFREV0ZIVERZWkpZUUpRS1lQQkRKWVlYVExKSERSUVhYWEhBWURIUkpMS0xZVFdITExSTExSQ1hZTEJXU1JTWlpTWU1LWlpISEtZSFhLU01EU1lEWUNKUEJaQlNRTEZDWFhYTlhLWFdZV1NEWllRT0dHUU1NWUhDRFpUVEZKWVlCR1NUVFRZQllLSkRIS1lYQkVMSFRZUEpRTkZYRkRZS1pIUUtaQllKVFpCWEhGRFhLREFTV1RBV0FKTERZSlNGSEJMRE5OVE5RSlRKTkNIWEZKU1JGV0haRk1EUllKWUpXWlBESktaWUpZTVBDWVpOWU5YRkJZVEZZRldZR0RCTlpaWkROWVRYWkVNTVFCU1FFSFhGWk1CTUZMWlpTUlhZTUpHU1hXWkpTUFJZREpTSkdYSEpKR0xKSllOWlpKWEhHWEtZTUxQWVlZQ1hZVFdRWlNXSFdMWVJKTFBYU0xTWE1GU1dXS0xDVE5YTllOUFNKU1pIRFpFUFRYTVlZV1hZWVNZV0xYSlFaUVhaRENMRUVFTE1DUEpQQ0xXQlhTUUhGV1dURkZKVE5RSkhKUURYSFdMQllaTkZKTEFMS1lZSkxEWEhIWUNTVFlZV05SSllYWVdUUk1EUlFIV1FDTUZKRFlaTUhNWVlYSldNWVpRWlhUTE1SU1BXV0NIQVFCWFlHWllQWFlZUlJDTE1QWU1HS1NKU1pZU1JNWUpTTlhUUExOQkFQUFlQWUxYWVlaS1lOTERaWUpaQ1pOTkxNWkhIQVJRTVBHV1FUWk1YWE1MTEhHRFpYWUhYS1lYWUNKTUZGWVlISkZTQlNTUUxYWE5EWUNBTk5NVENKQ1lQUlJOWVRZUU5ZWU1CTVNYTkRMWUxZU0xKUkxYWVNYUU1MTFlaTFpKSkpLWVpaQ1NGQlpYWE1TVEJKR05YWVpITFhOTUNXU0NZWllGWkxYQlJOTk5ZTEJOUlRHWlFZU0FUU1dSWUhZSlpNWkRIWkdaRFdZQlNTQ1NLWFNZSFlUWFhHQ1FHWFpaU0hZWEpTQ1JITUtLQlhDWkpZSllNS1FIWkpGTkJITVFIWVNOSk5aWUJLTlFNQ0xHUUhXTFpOWlNXWEtITEpIWVlCUUxCRkNEU1hETERTUEZaUFNLSllaV1pYWkREWEpTTU1FR0pTQ1NTTUdDTFhYS1lZWUxOWVBXV1dHWURLWkpHR0daR0dTWUNLTkpXTkpQQ1hCSkpUUVRKV0RTU1BKWFpYTlpYVU1FTFBYRlNYVExMWENMSlhKSkxKWlhDVFBTV1hMWURITFlRUldIU1lDU1FZWUJZQVlXSkpKUUZXUUNRUUNKUUdYQUxEQlpaWUpHS0dYUExUWllGWEpMVFBBREtZUUhQTUFUTENQRENLQk1UWFlCSEtMRU5YRExFRUdRRFlNU0FXSFpNTEpUV1lHWExZUVpMSkVFWVlCUVFGRk5MWVhSRFNDVEdKR1hZWU5LTExZUUtDQ1RMSEpMUU1LS1pHQ1lZR0xMTEpEWkdZREhaV1hQWVNKQlpLRFpHWVpaSFlXWUZRWVRZWlNaWUVaWkxZTUhKSkhUU01RV1laTEtZWVdaQ1NSS1FZVExURFhXQ1RZSktMV1NRWldCRENRWU5DSlNSU1pKTEtDRENEVExaWlpBQ1FRWlpERFhZUExYWkJRSllMWkxMTFFERFpRSllKWUpaWVhOWVlZTllKWEtYREFaV1lSRExKWVlZUkpMWExMRFlYSkNZV1lXTlFDQ0xERE5ZWVlOWUNLQ1pIWFhDQ0xHWlFKR0tXUFBDUVFKWVNCWlpYWUpTUVBYSlBaQlNCRFNGTlNGUFpYSERXWlREV1BQVEZMWlpCWkRNWVlQUUpSU0RaU1FaU1FYQkRHQ1BaU1dEV0NTUVpHTURIWlhNV1dGWUJQREdQSFRNSlRIWlNNTUJHWk1CWkpDRlpXRlpCQlpNUUNGTUJETUNKWExHUE5KQkJYR1lIWVlKR1BUWkdaTVFCUVRDR1lYSlhMV1pLWURQRFlNR0NGVFBGWFlaVFpYRFpYVEdLTVRZQkJDTEJKQVNLWVRTU1FZWU1TWlhGSkVXTFhMTFNaQlFKSkpBS0xZTFhMWUNDVFNYTUNXRktLS0JTWExMTExKWVhUWUxUSllZVERQSkhOSE5OS0JZUU5GUVlZWkJZWUVTU0VTU0dEWUhGSFdUQ0pCU0RaWlRGRE1YSENOSlpZTVFXU1JZSkRaSlFQRFFCQlNUSkdHRkJLSkJYVEdRSE5HV0pYSkdETExUSFpISFlZWVlZWVNYV1RZWVlDQ0JEQlBZUFpZQ0NaWUpQWllXQ0JETEZXWkNXSkRYWEhZSExIV1paWEpUQ1pMQ0RQWFVKQ1paWkxZWEpKVFhQSEZYV1BZV1haUFREWlpCRFpDWUhKSE1MWEJRWFNCWUxSRFRHSlJSQ1RUVEhZVENaV01YRllUV1daQ1dKV1hKWVdDU0tZQlpTQ0NUWlFOSFhOV1hYS0hLRkhUU1dPQ0NKWUJDTVBaWllLQk5OWlBCWkhIWkRMU1lERFlUWUZKUFhZTkdGWEJZUVhDQkhYQ1BTWFRZWkRNS1lTTlhTWExIS01aWExZSERIS1dIWFhTU0tRWUhIQ0pZWEdMSFpYQ1NOSEVLRFRHWlhRWVBLREhFWFRZS0NOWU1ZWVlQS1FZWVlLWFpMVEhKUVRCWVFIWEJNWUhTUUNLV1dZTExIQ1lZTE5ORVFYUVdNQ0ZCRENDTUxKR0dYRFFLVExYS0dOUUNER1pKV1lKSkxZSEhRVFRUTldDSE1YQ1hXSFdTWkpZREpDQ0RCUUNER0ROWVhaVEhDUVJYQ0JIWlRRQ0JYV0dRV1lZQlhITUJZTVlRVFlFWE1RS1lBUVlSR1laU0xGWUtLUUhZU1NRWVNISkdKQ05YS1pZQ1hTQlhZWEhZWUxTVFlDWFFUSFlTTUdTQ1BNTUdDQ0NDQ01UWlRBU01HUVpKSEtMT1NRWUxTV1RNWFNZUUtEWkxKUVFZUExTWUNaVENRUVBCQlFKWkNMUEtIUVpZWVhYRFRERFRTSkNYRkZMTENIUVhNSkxXQ0pDWFRTUFlDWE5EVEpTSEpXWERRUUpTS1hZQU1ZTFNKSE1MQUxZS1hDWVlETU5NRFFNWE1DWk5OQ1lCWktLWUZMTUNIQ01MSFhSQ0pKSFNZTE5NVEpaR1pHWVdKWFNSWENXSkdKUUhRWkRRSkRDSkpaS0pLR0RaUUdKSllKWUxYWlhYQ0RRSEhIRVlUTUhMRlNCREpTWVlTSEZZU1RDWlFMUEJEUkZSWlRaWUtZV0hTWllRS1dEUVpSS01TWU5CQ1JYUUJKWUZBWlBaWkVEWkNKWVdCQ0pXSFlKQlFTWllXUllTWlBUREtaUEZQQk5aVEtMUVlIQkJaUE5QUFRZWlpZQlFOWURDUEpNTUNZQ1FNQ1lGWlpEQ01OTEZQQlBMTkdRSlRCVFROSlpQWkJCWk5KS0xKUVlMTkJaUUhLU0paTkdHUVNaWktZWFNIUFpTTkJDR1pLRERaUUFOWkhKS0RSVExaTFNXSkxKWkxZV1RKTkRKWkpIWFlBWU5DQkdUWkNTU1FNTkpQSllUWVNXWFpGS1dKUVRLSFRaUExCSFNOSlpTWVpCV1paWlpMU1lMU0JKSERXV1FQU0xNTUZCSkRXQVFZWlRDSlRCTk5XWlhRWENEU0xRR0RTRFBEWkhKVFFRUFNXTFlZSlpMR1lYWVpMQ1RDQkpUS1RZQ1pKVFFLQlNKTEdNR1pETUNTR1BZTkpaWVFZWUtOWFJQV1NaWE1UTkNTWlpZWFlCWUhZWkFYWVdRQ0pUTExDS0pKVEpIR0RYRFhZUVlaWkJZV0RMV1FDR0xaR0pHUVJRWkNaU1NCQ1JQQ1NLWURaTlhKU1FHWFNTSk1ZRE5TVFpUUEJETFRLWldYUVdRVFpFWE5RQ1pHV0VaS1NTQllCUlRTU1NMQ0NHQlBTWlFTWkxDQ0dMTExaWEhaUVRIQ1pNUUdZWlFaTk1DT0NTWkpNTVpTUVBKWUdRTEpZSlBQTERYUkdaWVhDQ1NYSFNIR1RaTkxaV1pLSkNYVENGQ0pYTEJNUUJDWlpXUFFETkhYTEpDVEhZWkxHWUxOTFNaWlBDWERTQ1FRSEpRS1NYWlBCQUpZRU1TTUpUWkRYTENKWVJZWU5XSkJOR1paVE1KWExUQlNMWVJaUFlMU1NDTlhQSExMSFlMTFFRWlFMWFlNUlNZQ1haTE1NQ1pMVFpTRFdUSkpMTE5aR0dRWFBGU0tZR1lHSEJGWlBES01XR0hDWE1TR0RYSk1DSlpEWUNBQlhKRExOQkNEUVlHU0tZRFFUWERKSllYTVNaUUFaRFpGU0xRWFlKU0paWUxCVFhYV1hRUVpCSlpVRkJCTFlMV0RTTEpIWEpZWkpXVERKQ1pGUVpRWlpEWlNYWlpRTFpDRFpGSkhZU1BZTVBRWk1MUFBMRkZYSkpOWlpZTFNKRVlRWkZQRlpLU1lXSkpKSFJESlpaWFRYWEdMR0hZRFhDU0tZU1dNTVpDV1lCQVpCSktTSEZISkNYTUhGUUhZWFhZWkZUU0pZWkZYWVhQWkxDSE1aTUJYSFpaU1hZRllNTkNXREFCQVpMWEtUQ1NISFhLWEpKWkpTVEhZR1hTWFlZSEhISldYS1pYU1NCWlpXSEhIQ1dUWlpaUEpYU05YUVFKR1pZWllXTExDV1haRlhYWVhZSFhNS1lZU1dTUU1OTE5BWUNZU1BNSktIV0NRSFlMQUpKTVpYSE1NQ05aSEJIWENMWFRKUExUWFlKSERZWUxUVFhGU1pIWVhYU0pCSllBWVJTTVhZUExDS0RVWUhMWFJMTkxMU1RZWllZUVlHWUhIU0NDU01aQ1RaUVhLWVFGUFlZUlBGRkxLUVVOVFNaTExaTVdXVENRUVlaV1RMTE1MTVBXTUJaU1NUWlJCUEREVExRSkpCWFpDU1JaUVFZR1dDU1hGV1pMWENDUlNaRFpNQ1lHR0RaUVNHVEpTV0xKTVlNTVpZSEZCSkRHWVhDQ1BTSFhOWkNTQlNKWUpHSk1QUFdBRkZZRk5YSFlaWFpZTFJFTVpHWkNZWlNTWkRMTEpDU1FGTlhaS1BUWFpHWEpKR0ZNWVlZU05CVFlMQk5MSFBGWkRDWUZCTUdRUlJTU1NaWFlTR1RaUk5ZRFpaQ0RHUEpBRkpGWktOWkJMQ1pTWlBTR0NZQ0pTWkxNTFJTWkJaWkxETFNMTFlTWFNRWlFMWVhaTFNLS0JSWEJSQlpDWUNYWlpaRUVZRkdLTFpMWVlIR1pTR1pMRkpIR1RHV0tSQUFKWVpLWlFUU1NISkpYRENZWlVZSkxaWVJaRFFRSEdKWlhTU1pCWUtKUEJGUlRKWExMRlFXSkhZTFFUWU1CTFBaRFhUWllHQkRIWlpSQkdYSFdOSlRKWExLU0NGU01XTFNEUVlTSlRYS1pTQ0ZXSkxCWEZUWkxMSlpMTFFCTFNRTVFRQ0dDWkZQQlBIWkNaSkxQWVlHR0RUR1dEQ0ZDWlFZWVlRWVNTQ0xYWlNLTFpaWkdGRkNRTldHTEhRWVpKSkNaTFFaWllKUEpaWkJQRENDTUhKR1hEUURHRExaUU1GR1BTWVRTRFlGV1dESlpKWVNYWVlDWkNZSFpXUEJZS1hSWUxZQkhLSktTRlhUWkpNTUNLSExMVE5ZWU1TWVhZWlBZSlFZQ1NZQ1dNVEpKS1FZUkhMTFFYUFNHVExZWUNMSlNDUFhKWVpGTk1MUkdKSlRZWkJYWVpNU0pZSkhIRlpRTVNZWFJTWkNXVExSVFFaU1NUS1hHUUtHU1BUR0NaTkpTSkNRQ1hITVhHR1pUUVlESktaRExCWlNYSkxIWVFHR0dUSFFTWlBZSEpISEdZWUdLR0dDV0paWllMQ1pMWFFTRlRHWlNMTExNTEpTS0NUQkxMWlpTWk1NTllUUFpTWFFISkNKWVFYWVpYWlFaQ1BTSEtaWllTWENERkdNV1FSTExRWFJGWlRMWVNUQ1RNSkNYSkpYSEpOWFROUlpUWkZRWUhRR0xMR0NYU1pTSkRKTEpDWURTSlRMTllYSFNaWENHSlpZUVBZTEZIREpTQlBDQ1pISkpKUVpKUURZQlNTTExDTVlUVE1RVEJISlFOTllHS1lSUVlRTVpHQ0pLUERDR01ZWkhRTExTTExDTE1IT0xaR0RZWUZaU0xKQ1FaTFlMWlFKRVNITllMTEpYR0pYTFlTWVlZWE5CWkxKU1NaQ1FRQ0pZTExaTFRKWUxMWkxMQk5ZTEdRQ0hYWVlYT1hDWFFLWUpYWFhZS0xYU1hYWVFYQ1lLUVhRQ1NHWVhYWVFYWUdZVFFPSFhIWFBZWFhYVUxDWUVZQ0haWkNCV1FCQldKUVpTQ1NaU1NMWllMS0RFU0paV01ZTUNZVFNEU1hYU0NKUFFRU1FZTFlZWllDTURKRFpZV0NCVEpTWURKS0NZRERKTEJESkpTT0RaWVNZWFFRWVhESEhHUVFZUUhEWVhXR01NTUFKRFlCQkJQUEJDTVVVUExKWlNNVFhFUlhKTUhRTlVUUEpEQ0JTU01TU1NUS0pUU1NNTVRSQ1BMWlNaTUxRRFNETUpNUVBOUURYQ0ZZTkJGU0RRWFlYSFlBWUtRWURETFFZWVlTU1pCWURTTE5URlFUWlFQWk1DSERIQ1pDV0ZEWFRNWVFTUEhRWVlYU1JHSkNXVEpUWlpRTUdXSkpUSkhUUUpCQkhXWlBYWEhZUUZYWFFZV1lZSFlTQ0RZREhIUU1OTVRNV0NQQlNaUFBaWkdMTVpGT0xMQ0ZXSE1NU0paVFRESFpaWUZGWVRaWkdaWVNLWUpYUVlKWlFCSE1CWlpMWUdIR0ZNU0hQWkZaU05DTFBCUVNOSlhaU0xYWEZQTVRZSllHQlhMTERMWFBaSllaSllISFpDWVdISllMU0pFWEZTWlpZV1hLWkpMVVlEVE1MWU1RSlBXWFlIWFNLVFFKRVpSUFhYWkhITUhXUVBXUUxZSkpRSkpaU1pDUEhKTENISE5YSkxRV1pKSEJNWllYQkRISFlQWkxITEhMR0ZXTENIWVlUTEhKWENKTVNDUFhTVEtQTkhRWFNSVFlYWFRFU1lKQ1RMU1NMU1RETExMV1dZSERIUkpaU0ZHWFRTWUNaWU5ZSFRESFdKU0xIVFpEUURKWlhYUUhHWUxUWlBIQ1NRRkNMTkpUQ0xaUEZTVFBEWU5ZTEdNSkxMWUNRSFlTU0hDSFlMSFFZUVRNWllQQllXUkZRWUtRU1lTTFpEUUpNUFhZWVNTUkhaSk5ZV1RRREZaQldXVFdXUlhDV0hHWUhYTUtNWVlZUU1TTVpITkdDRVBNTFFRTVRDV0NUTU1QWEpQSkpIRlhZWVpTWFpIVFlCTVNUU1lKVFRRUVFZWUxIWU5QWVFaTENZWkhaV1NNWUxLRkpYTFdHWFlQSllUWVNZWFlNWkNLVFRXTEtTTVpTWUxNUFdMWldYV1FaU1NBUVNZWFlSSFNTTlRTUkFQWENQV0NNR0RYSFhaRFpZRkpIR1pUVFNCSkhHWVpTWllTTVlDTExMWEJUWVhIQkJaSktTU0RNQUxYSFlDRllHTVFZUEpZQ1FYSkxMTEpHU0xaR1FMWUNKQ0NaT1RZWE1UTVRUTExXVEdQWFlNWk1LTFBTWlpaWEhLUVlTWENUWUpaWUhYU0hZWFpLWExaV1BTUVBZSEpXUEpQV1hRUVlMWFNESE1SU0xaWllaV1RUQ1lYWVNaWlNIQlNDQ1NUUExXU1NDSkNITkxDR0NIU1NQSFlMSEZISFhKU1hZTExOWUxTWkRIWlhZTFNYTFdaWUtDTERZQVhaQ01ERFlTUEpUUUpaTE5XUVBTU1NXQ1RTVFNaTEJMTlhTTU5ZWU1KUUJRSFJaV1RZWURDSFFMWEtQWldCR1FZQktGQ01aV1BaTExZWUxTWllEV0hYUFNCQ01MSkJTQ0dCSFhMUUhZUkxKWFlTV1hXWFpTTERGSExTTFlOSkxaWUZMWUpZQ0RSSkxGU1laRlNMTENRWVFGR0pZSFlYWkxZTE1TVERKQ1lIQlpMTE5XTFhYWUdZWUhTTUdESFhYSEhMWlpKWlhDWlpaQ1lRWkZOR1dQWUxDUEtQWVlQTUNMUUtER1haR0dXUUJEWFpaS1pGQlhYTFpYSlRQSlBUVEJZVFNaWkRXU0xDSFpIU0xUWVhIUUxIWVhYWFlZWllTV1RYWktITFhaWFpQWUhHQ0hLQ0ZTWUhVVEpSTFhGSlhQVFpUV0hQTFlYRkNSSFhTSFhLWVhYWUhaUURYUVdVTEhZSE1KVEJGTEtIVFhDV0hKRldKQ0ZQUVJZUVhDWVlZUVlHUlBZV1NHU1VOR1dDSEtaRFhZRkxYWEhKSkJZWldUU1hYTkNZSkpZTVNXWkpRUk1IWFpXRlFTWUxaSlpHQkhZTlNMQkdUVENTWUJZWFhXWFlIWFlZWE5TUVlYTVFZV1JHWVFMWEJCWkxKU1lMUFNZVEpaWUhZWkFXTFJPUkpNS1NDWkpYWFhZWENIRFlYUllYWEpEVFNRRlhMWUxUU0ZGWVhMTVRZSk1KVVlZWVhMVFpDU1hRWlFIWlhMWVlYWkhETkJSWFhYSkNUWUhMQlJMTUJSTExBWEtZTExMSkxZWFhMWUNSWUxDSlRHSkNNVExaTExDWVpaUFpQQ1lBV0hKSkZZQkRZWVpTTVBDS1pEUVlRUEJQQ0pQRENZWk1EUEJDWVlEWUNOTlBMTVRNTFJNRk1NR1dZWkJTSkdZR1NNWlFRUVpUWE1LUVdHWExMUEpHWkJRQ0RKSkpGUEtKS0NYQkxKTVNXTURUUUpYTERMUFBCWENXUkNRRkJGUUpDWkFIWkdNWUtQSFlZSFpZS05ES1pNQlBKWVhQWFlITEZQTllZR1hKREJLWE5YSEpNWkpYU1RSU1RMRFhTS1pZU1lCWlhKTFhZU0xCWllTTEhYSlBGWFBRTkJZTExKUUtZR1pNQ1laWllNQ0NTTENMSFpGV0ZXWVhaTVdTWFRZTlhKSFBZWU1DWVNQTUhZU01ZRFlTSFFZWkNITUpKTVpDQUFHQ0ZKQkJIUExZWllMWFhTREpHWERIS1hYVFhYTkJIUk1MWUpTTFRYTVJITkxYUUpYWVpMTFlTV1FHRExCSkhEQ0dKWVFZQ01IV0ZNSllCTUJZSllKV1lNRFBXSFhRTERZR1BERlhYQkNHSlNQQ0tSU1NZWkpNU0xCWlpKRkxKSkpMR1haR1lYWVhMU1pRWVhCRVhZWEhHQ1hCUExEWUhXRVRUV1dDSk1CVFhDSFhZUVhMTFhGTFlYTExKTFNTRldEUFpTTVlKQ0xNV1lUQ1pQQ0hRRUtDUUJXTENRWURQTFFQUFFaUUZKUURKSFlNTUNYVFhEUk1KV1JIWENKWllMUVhEWVlOSFlZSFJTTFNSU1lXV1pKWU1UTFRMTEdUUUNKWllBQlRDS1pDSllDQ1FMSlpRWEFMTVpZSFlXTFdEWFpYUURMTFFTSEdQSkZKTEpISkFCQ1FaREpHVEtIU1NUQ1lKTFBTV1pMWFpYUldHTERMWlJMWlhUR1NMTExMWkxZWFhXR0RaWUdCRFBIWlBCUkxXU1hRQlBGRFdPRk1XSExZUENCSkNDTERNQlpQQlpaTENZUVhMRE9NWkJMWldQRFdZWUdEU1RUSENTUVNDQ1JTU1NZU0xGWUJGTlRZSlNaREZORFBESERaWk1CQkxTTENNWUZGR1RKSlFXRlRNVFBKV0ZOTEJaQ01NSlRHQkRaTFFMUFlGSFlZTUpZTFNEQ0hEWkpXSkNDVExKQ0xEVExKSkNQRERTUURTU1pZQk5EQkpMR0dKWlhTWE5MWUNZQkpYUVlDQllMWkNGWlBQR0tDWFpEWkZaVEpKRkpTSlhaQk5aWUpRVFRZSllIVFlDWkhZTURKWFRUTVBYU1BMWkNEV1NMU0hYWVBaR1RGTUxDSlRZQ0JQTUdES1dZQ1laQ0RTWlpZSEZMWUNUWUdXSEtKWVlMU0pDWEdZV0pDQkxMQ1NORERCVFpCU0NMWVpDWlpTU1FETExNUVlZSEZTTFFMTFhGVFlIQUJYR1dOWVdZWVBMTFNETERMTEJKQ1lYSlpNTEhMSkRYWVlRWVRETExMQlVHQkZERkJCUUpaWk1EUEpIR0NMR01KSlBHQUVISEJXQ1FYQVhISEhaQ0hYWVBISkFYSExQSEpQR1BaSlFDUVpHSkpaWlVaRE1RWVlCWlpQSFlIWUJXSEFaWUpIWUtGR0RQRlFTRExaTUxKWEtYR0FMWFpEQUdMTURHWE1XWlFZWFhEWFhQRkRNTVNTWU1QRk1ETU1LWEtTWVpZU0hEWktYU1lTTU1aWlpNU1lETlpaQ1pYRlBMU1RNWkROTVhDS0pNWlRZWU1aTVpaTVNYSEhEQ1pKRU1YWEtMSlNUTFdMU1FMWUpaTExaSlNTRFBQTUhOTFpKQ1pZSE1YWEhHWkNKTURIWFRLR1JNWEZXTUNHTVdLRFRLU1hRTU1NRlpaWURLTVNDTENNUENHTUhTUFhRUFpEU1NMQ1hLWVhUV0xXSllBSFpKR1pRTUNTTlhZWU1NUE1MS0pYTUhMTUxRTVhDVEtaTUpRWVNaSlNZU1pIU1lKWkpDREFKWllCU0RRSlpHV1pRUVhGS0RNU0RKTEZXRUhLWlFLSlBFWVBaWVNaQ0RXWUpGRk1aWllMVFREWlpFRk1aTEJOUFBMUExQRVBTWkFMTFRZTEtDS1FaS0dFTlFMV0FHWVhZRFBYTEhTWFFRV1FDUVhRQ0xIWVhYTUxZQ0NXTFlNUVlTS0dDSExDSk5TWktQWVpLQ1FaUUxKUERNRFpITEFTWExCWURXUUxXRE5CUUNSWUREWlRKWUJLQldTWkRYRFROUEpEVENUUURGWFFRTUdOWEVDTFRUQktQV1NMQ1RZUUxQV1laWktMUFlHWkNRUVBMTEtDQ1lMUFFNWkNaUUNMSlNMUVpESlhMRERIUFpRRExKSlhaUURYWVpRS1pMSkNZUURZSlBQWVBRWUtKWVJNUENCWU1DWEtMTFpMTEZRUFlMTExNQlNHTENZU1NMUlNZU1FUTVhZWFpRWkZEWlVZU1laVEZGTVpaU01aUUhaU1NDQ01MWVhXVFBaR1haSkdaR1NKU0dLRERIVFFHR1pMTEJKRFpMQ0JDSFlYWVpIWkZZV1hZWllNU0RCWlpZSkdUU01URlhRWVhRU1RER1NMTlhETFJZWlpMUllZTFhRSFRYU1JUWk5HWlhCTlFRWkZNWUtNWkpCWllNS0JQTkxZWlBCTE1DTlFZWlpaU0paSEpDVFpLSFlaWkpSRFlaSE5QWEdMRlpUTEtHSlRDVFNTWUxMR1pSWkJCUVpaS0xQS0xDWllTU1VZWEJKRlBOSlpaWENEV1haWUpYWlpESkpLR0dSU1JKS01TTVpKTFNKWVdRU0tZSFFKU1hQSlpaWkxTTlNIUk5ZUFpUV0NIS0xQU1JaTFpYWUpRWFFLWVNKWUNaVExRWllCQllCV1pQUURXV1laQ1lUSkNKWENLQ1dES0taWFNHS0RaWFdXWVlKUVlZVENZVERMTFhXS0NaS0tMQ0NMWkNRUURaTFFMQ1NGUUNIUUhTRlNNUVpaTE5CSkpaQlNKSFRTWkRZU0pRSlBETFpDRENXSktKWlpMUFlDR01aV0RKSkJTSlFaU1laWUhIWEpQQkpZRFNTWERaTkNHTFFNQlRTRlNCUERaRExaTkZHRkpHRlNNUFhKUUxNQkxHUUNZWVhCUUtESkpRWVJGS1pUSkRIQ1pLTEJTRFpDRkpUUExMSkdYSFlYWkNTU1paWFNUSllHS0dDS0dZT1FYSlBMWlBCUEdUR1lKWkdIWlFaWkxCSkxTUUZaR0tRUUpaR1lDWkJaUVRMRFhSSlhCU1hYUFpYSFlaWUNMV0RYSkpIWE1GRFpQRlpIUUhRTVFHS1NMWUhUWUNHRlJaR05RWENMUERMQlpDU0NaUUxMSkJMSEJaQ1lQWlpQUERZTVpaU0dZSENLQ1BaSkdTTEpMTlNDRFNMRExYQk1TVExEREZKTUtESkRIWkxaWExTWlFQUVBHSkxMWUJEU1pHUUxCWkxTTEtZWUhaVFROVEpZUVRaWlBTWlFaVExMSlRZWUxMUUxMUVlaUUxCRFpMU0xZWVpZTURGU1pTTkhMWFpOQ1pRWlBCV1NLUkZCU1laTVRIQkxHSlBNQ1paTFNUTFhTSFRDU1laTFpCTEZFUUhMWEZMQ0pMWUxKUUNCWkxaSkhIU1NUQlJNSFhaSEpaQ0xYRk5CR1hHVFFKQ1pUTVNGWktKTVNTTlhMSktCSFNKWE5UTkxaRE5UTE1TSlhHWkpZSkNaWFlKWUpXUldXUU5aVE5GSlNaUFpTSFpKRllSREpTRlNaSlpCSkZaUVpaSFpMWEZZU0JaUUxaU0dZRlRaRENTWlhaSkJRTVNaS0pSSFlKWkNLTUpLSENIR1RYS1hRR0xYUFhGWFRSVFlMWEpYSERUU0pYSEpaSlhaV1pMQ1FTQlRYV1hHWFRYWEhYRlRTREtGSkhaWUpGSlhSWlNETExMVFFTUVFaUVdaWFNZUVRXR1dCWkNHWkxMWVpCQ0xNUVFUWkhaWFpYTEpGUk1ZWkZMWFlTUVhYSktYUk1RRFpETU1ZWUJTUUJIR1pNV0ZXWEdNWExaUFlZVEdaWUNDRFhZWlhZV0dTWUpZWk5CSFBaSlNRU1lYU1hSVEZZWkdSSFpUWFNaWlRIQ0JGQ0xTWVhaTFpRTVpMTVBMTVhaSlhTRkxCWVpNWVFIWEpTWFJYU1FaWlpTU0xZRlJDWkpSQ1JYSEhaWFFZRFlIWFNKSkhaQ1haQlRZTlNZU1hKQlFMUFhaUVBZTUxYWktZWExYQ0pMQ1lTWFhaWkxYRExMTEpKWUhaWEdZSldLSlJXWUhDUFNHTlJaTEZaV0ZaWk5TWEdYRkxaU1haWlpCRkNTWUpEQlJKS1JESEhHWEpMSkpUR1hKWFhTVEpUSlhMWVhRRkNTR1NXTVNCQ1RMUVpaV0xaWktYSk1MVE1KWUhTRERCWEdaSERMQk1ZSkZSWkZTR0NMWUpCUE1MWVNNU1hMU1pKUVFISlpGWEdGUUZRQlBYWkdZWVFYR1pUQ1FXWUxUTEdXU0dXSFJMRlNGR1pKTUdNR0JHVEpGU1laWkdaWVpBRkxTU1BNTFBGTENXQkpaQ0xKSk1aTFBKSkxZTVFETVlZWUZCR1lHWVpNTFlaRFhRWVhSUVFRSFNZWVlRWFlMSlRZWEZTRlNMTEdOUUNZSFlDV0ZIQ0NDRlhQWUxZUExMWllYWFhYWEtRSEhYU0hKWkNGWlNDWkpYQ1BaV0hISEhIQVBZTFFBTFBRQUZZSFhEWUxVS01aUUdHR0RERVNSTk5aTFRaR0NIWVBQWVNRSkpIQ0xMSlRPTE5KUFpMSkxIWU1IRVlEWURTUVlDRERIR1pVTkRaQ0xaWVpMTFpOVE5ZWkdTTEhTTFBKSkJER1dYUENEVVRKQ0tMS0NMV0tMTENBU1NUS1paRE5RTlRUTFlZWlNTWVNTWlpSWUxKUUtDUURISENSWFJaWURHUkdDV0NHWlFGRkZQUEpGWllOQUtSR1lXWVFQUVhYRktKVFNaWlhTV1pEREZCQlhUQkdUWktaTlBaWlBaWFpQSlNaQk1RSEtDWVhZTERLTEpOWVBLWUdIR0RaSlhYRUFIUE5aS1pUWkNNWENYTU1KWE5LU1pRTk1OTFdCV1dYSktZSENQU1RNQ1NRVFpKWVhUUENUUERUTk5QR0xMTFpTSkxTUEJMUExRSERUTkpOTFlZUlNaRkZKRlFXRFBIWkRXTVJaQ0NMT0RBWE5TU05ZWlJFU1RZSldKWUpEQkNGWE5NV1RUQllMV1NUU1pHWUJMSlBYR0xCT0NMSFBDQkpMVE1YWkxKWUxaWENMVFBOQ0xDS1hUUFpKU1dDWVhTRllTWkRLTlRMQllKQ1lKTExTVEdRQ0JYUllaWEJYS0xZTEhaTFFaTE5aQ1hXSlpMSlpKTkNKSFhNTlpaR0paWlhUWkpYWUNZWUNYWEpZWVhKSlhTU1NKU1RTU1RUUFBHUVRDU1hXWkRDU1lGUFRGQkZIRkJCTFpKQ0xaWkRCWEdDWExRUFhLRlpGTFNZTFRVV0JNUUpIU1pCTUREQkNZU0NDTERYWUNERFFMWUpKV01RTExDU0dMSkpTWUZQWVlDQ1lMVEpBTlRKSlBXWUNNTUdRWVlTWERYUU1aSFNaWFBGVFdXWlFTV1FSRktKTFpKUVFZRkJSWEpISEZXSkpaWVFBWk1ZRlJIQ1lZQllRV0xQRVhDQ1pTVFlSTFRURE1RTFlLTUJCR01ZWUpQUktaTlBCU1hZWEJIWVpESkROR0hQTUZTR01XRlpNRlFNTUJDTVpaQ0pKTENOVVhZUUxNTFJZR1FaQ1lYWkxXSkdDSkNHR01DSk5GWVpaSkhZQ1BSUkNNVFpRWlhIRlFHVEpYQ0NKRUFRQ1JKWUhQTFFMU1pESlJCQ1FIUURZUkhZTFlYSlNZTUhaWURXTERGUllIQlBZRFRTU0NOV0JYR0xQWk1MWlpUUVNTQ1BKTVhYWUNTSllUWUNHSFlDSldZUlhYTEZFTVdKTk1LTExTV1RYSFlZWU5DTU1DV0pEUURKWkdMTEpXSlJLSFBaR0dGTENDU0NaTUNCTFRCSEJRSlhRRFNQREpaWkdLR0xGUVlXQlpZWkpMVFNUREhRSENUQ0JDSEZMUU1QV0RTSFlZVFFXQ05aWkpUTEJZTUJQRFlZWVhTUUtYV1lZRkxYWE5DV0NYWVBNQUVMWUtLSk1aWlpCUlhZWVFKRkxKUEZISEhZVFpaWFNHUVFNSFNQR0RaUVdCV1BKSFpKRFlTQ1FXWktUWFhTUUxaWVlNWVNEWkdSWENLS1VKTFdQWVNZU0NTWVpMUk1MUVNZTEpYQkNYVExXRFFaUENZQ1lLUFBQTlNYRllaSkpSQ0VNSFNaTVNYTFhHTFJXR0NTVExSU1hCWkdCWkdaVENQTFVKTFNMWUxZTVRYTVRaUEFMWlhQWEpUSldUQ1lZWkxCTFhCWkxRTVlMWFBHSERTTFNTRE1YTUJEWlpTWFdIQU1MQ1pDUEpNQ05ISllTTlNZR0NIU0tRTVpaUURMTEtBQkxXSlhTRk1PQ0RYSlJSTFlRWktKTVlCWVFMWUhFVEZKWkZSRktTUllYRkpUV0RTWFhTWVNRSllTTFlYV0pIU05MWFlZWEhCSEFXSEhKWlhXTVlMSkNTU0xLWURaVFhCWlNZRkRYR1haSktIU1hYWUJTU1hEUFlOWldSUFRRWkNaRU5ZR0NYUUZKWUtKQlpNTEpDTVFRWFVPWFNMWVhYTFlMTEpEWkJUWU1IUEZTVFRRUVdMSE9LWUJMWlpBTFpYUUxIWldSUlFITFNUTVlQWVhKSlhNUVNKRk5CWFlYWUpYWFlRWUxUSFlMUVlGTUxLTEpUTUxMSFNaV0taSExKTUxITEpLTEpTVExRWFlMTUJISExOTFpYUUpIWENGWFhMSFlISkpHQllaWktCWFNDUURKUURTVUpaWVlIWkhITUdTWENTWU1YRkVCQ1FXV1JCUFlZSlFUWVpDWVFZUVFaWUhNV0ZGSEdaRlJKRkNEUFhOVFFZWlBEWUtISkxGUlpYUFBYWkRCQkdaUVNUTEdER1lMQ1FNTENISE1GWVdMWllYS0pMWVBRSFNZV01RUUdRWk1MWkpOU1FYSlFTWUpZQ0JFSFNYRlNaUFhaV0ZMTEJDWVlKRFlURFRIV1pTRkpNUVFZSkxNUVhYTExEVFRLSEhZQkZQV1RZWVNRUVdOUVdMR1dERUJaV0NNWUdDVUxLSlhUTVhNWUpTWEhZQlJXRllNV0ZSWFlRTVhZU1pUWlpURllLTUxESFFEWFdZWU5MQ1JZSkJMUFNYQ1hZV0xTUFJSSldYSFFZUEhUWUROWEhITU1ZV1lUWkNTUU1UU1NDQ0RBTFdaVENQUVBZSkxMUVpZSlNXWE1aWk1NWUxNWENMTVhDWk1YTVpTUVRaUFBRUUJMUEdYUVpIRkxKSkhZVEpTUlhXWlhTQ0NETFhUWUpEQ1FKWFNMUVlDTFpYTFpaWE1YUVJKTUhSSFpKQkhNRkxKTE1MQ0xRTkxEWFpMTExQWVBTWUpZU1hDUVFEQ01RSlpaWEhOUE5YWk1FS01YSFlLWVFMWFNYVFhKWVlIV0RDV0RaSFFZWUJHWUJDWVNDRkdQU0pOWkRZWlpKWlhSWlJRSkpZTUNBTllSSlRMRFBQWVpCU1RKS1hYWllQRkRXRkdaWlJQWU1UTkdYWlFCWVhOQlVGTlFLUkpRWk1KRUdSWkdZQ0xLWFpEU0tLTlNYS0NMSlNQSllZWkxRUUpZQlpTU1FMTExLSlhUQktUWUxDQ0REQkxTUFBGWUxHWURUWkpZUUdHS1FUVEZaWEJES1RZWUhZQkJGWVRZWUJDTFBEWVRHREhSWVJOSlNQVENTTllKUUhLTExMWlNMWURYWFdCQ0pRU1BYQlBKWkpDSkRaRkZYWEJSTUxBWkhDU05ETEJKRFNaQkxQUlpUU1dTQlhCQ0xMWFhMWkRKWlNKUFlMWVhYWUZURkZGQkhKSlhHQllYSlBNTU1QU1NKWkpNVExZWkpYU1dYVFlMRURRUEpNWUdRWkpHREpMUUpXSlFMTFNKR0pHWUdNU0NMSkpYRFRZR0pRSlFKQ0paQ0pHRFpaU1hRR1NKR0dDWEhRWFNOUUxaWkJYSFNHWlhDWFlMSlhZWFlZREZRUUpISkZYREhDVFhKWVJYWVNRVEpYWUVGWVlTU1lZSlhOQ1laWEZYTVNZU1pYWVlTQ0hTSFhaWlpHWlpaR0ZKRExUWUxOUFpHWUpZWllZUVpQQlhRQkRaVFpDWllYWFlISFNRWFNIREhHUUhKSEdZV1NaVE1aTUxIWVhHRUJUWUxaS1FXWVRKWlJDTEVLWVNUREJDWUtRUVNBWVhDSlhXV0dTQkhKWVpZREhDU0pLUUNYU1dYRkxUWU5ZWlBaQ0NaSlFUWldKUURaWlpRWkxKSlhMU0JIUFlYWFBTWFNISEVaVFhGUFRMUVlaWlhIWVRYTkNGWllZSFhHTlhNWVdYVFpTSlBUSEhHWU1YTVhRWlhUU0JDWllKWVhYVFlZWllQQ1FMTU1TWk1KWlpMTFpYR1haQUFKWllYSk1aWFdEWFpTWFpEWlhMRVlKSlpRQkhaV1paWlFUWlBTWFpURFNYSkpKWk5ZQVpQSFhZWVNSTlFEVEhaSFlZS1lKSERaWFpMU1dDTFlCWllFQ1dDWUNSWUxDWE5IWllEWllEWUpERlJKSkhUUlNRVFhZWEpSSkhPSllOWEVMWFNGU0ZKWkdIUFpTWFpTWkRaQ1FaQllZS0xTR1NKSENaU0hER1FHWFlaR1hDSFhaSldZUVdHWUhLU1NFUVpaTkRaRktXWVNTVENMWlNUU1lNQ0RISlhYWVdFWVhDWkFZRE1QWE1EU1hZQlNRTUpNWkpNVFpRTFBKWVFaQ0dRSFhKSEhMWFhITEhETERKUUNMRFdCU1hGWlpZWVNDSFRZVFlZQkhFQ1hIWUtHSlBYSEhZWkpGWEhXSEJEWkZZWkJDQVBOUEdOWURNU1hITU1NTUFNWU5CWUpUTVBYWVlNQ1RISkJaWUZDR1RZSFdQSEZUV1paRVpTQlpFR1BGTVRTS0ZUWUNNSEZMTEhHUFpKWFpKR1pKWVhaU0JCUVNDWlpMWkNDU1RQR1hNSlNGVENDWkpaREpYQ1lCWkxGQ0pTWVpGR1NaTFlCQ1daWkJZWkRaWVBTV1lKWlhaQkRTWVVYTFpaQlpGWUdDWlhCWkhaRlRQQkdaR0VKQlNUR0tETUZIWVpaSkhaTExaWkdKUVpMU0ZESlNTQ0JaR1BETEZaRlpTWllaWVpTWUdDWFNOWFhDSENaWFRaWkxKRlpHUVNRWVhaSlFEQ0NaVFFDRFhaSllRSlFDSFhaVERMR1NDWFpTWVFKUVRaV0xRRFFaVFFDSFFRSlpZRVpaWlBCV0tESkZDSlBaVFlQUVlRVFRZTkxNQkRLVEpaUFFaUVpaRlBaU0JOSkxHWUpEWEpEWlpLWkdRS1hETFBaSlRDSkRRQlhESlFKU1RDS05YQlhaTVNMWUpDUU1USlFXV0NKUU5KTkxMTEhKQ1dRVEJaUVlEWkNaUFpaRFpZRERDWVpaWkNDSlRUSkZaRFBSUlRaVEpEQ1FUUVpEVEpOUExaQkNMTENUWlNYS0paUVpQWkxCWlJCVEpEQ1hGQ1pEQkNDSkpMVFFRUExEQ0daREJCWkpDUURDSldZTkxMWllaQ0NEV0xMWFdaTFhSWE5UUVFDWlhLUUxTR0RGUVREREdMUkxBSkpUS1VZTUtRTExUWllURFlZQ1pHSldZWERYRlJTS1NUUVRFTlFNUktRWkhIUUtETERBWkZLWVBCR0dQWlJFQlpaWUtaWlNQRUdKWEdZS1FaWlpTTFlTWVlZWldGUVpZTFpaTFpIV0NIS1lQUUdOUEdCTFBMUlJKWVhDQ1NZWUhTRlpGWUJaWVlUR1pYWUxYQ1pXWFhaSlpCTEZGTEdTS0hZSlpFWUpITFBMTExMQ1pHWERSWkVMUkhHS0xaWllIWkxZUVNaWkpaUUxKWkZMTkJIR1dMQ1pDRkpZU1BZWFpMWkxYR0NDUFpCTExDWUJCQkJVQkJDQlBDUk5OWkNaWVJCRlNSTERDR1FZWVFYWUdNUVpXVFpZVFlKWFlGV1RFSFpaSllXTENDTlRaWUpKWkRFRFBaRFpUU1lRSkhEWU1CSk5ZSlpMWFRTU1RQSE5ESlhYQllYUVRaUUREVEpURFlZVEdXU0NTWlFGTFNITEdMQkNaUEhETFlaSllDS1dUWVRZTEJOWVRTRFNZQ0NUWVNaWVlFQkhFWEhRRFRXTllHWUNMWFRTWllTVFFNWUdaQVpDQ1NaWkRTTFpDTFpSUVhZWUVMSlNCWU1YU1haVEVNQkJMTFlZTExZVERRWVNIWU1SUVdLRktCRlhOWFNCWUNIWEJXSllIVFFCUEJTQldEWllMS0daU0tZSFhRWkpYSFhKWEdOTEpLWkxZWUNEWExGWUZHSExKR0pZQlhRTFlCWFFQUUdaVFpQTE5DWVBYREpZUVlEWU1SQkVTSllZSEtYWFNUTVhSQ1paWVdYWVFZQk1DTExZWkhRWVpXUVhEQlhCWldaTVNMUERNWVNLRk1aS0xaQ1lRWUNaTFFYRlpaWURRWlBaWUdZSllaTVpYRFpGWUZZVFRRVFpIR1NQQ1pNTENDWVRaWEpDWVRKTUtTTFBaSFlTTlpMTFlUUFpDVFpaQ0tUWERIWFhUUUNZRktTTVFDQ1lZQVpIVEpQQ1lMWkxZSkJKWFRQTllMSllZTlJYU1lMTU1OWEpTTVlCQ1NZU1lMWllMWEpKUVlMRFpMUFFCRlpaQkxGTkRYUUtDWkZZV0hHUU1SRFNYWUNZVFhOUVFKWllZUEZaWERZWkZQUlhFSkRHWVFCWFJDTkZZWVFQR0hZSkRZWlhHUkhUS1lMTldEWk5UU01QS0xCVEhCUFlTWkJaVEpaU1paSlRZWVhaUEhTU1paQlpDWlBUUUZaTVlGTFlQWUJCSlFYWk1YWERKTVRTWVNLS0JKWlhISkNLTFBTTUtZSlpDWFRNTEpZWFJaWlFTTFhYUVBZWlhNS1lYWFhKQ0xKUFJNWVlHQURZU0tRTFNOREhZWktRWFpZWlRDR0haVExNTFdaWUJXU1lDVEJISkhKRkNXWlRYV1lUS1pMWFFTSExZSlpKWFRNUExQWUNHTFRCWlpUTFpKQ1lKR0RUQ0xLTFBMTFFQSk1aUEFQWFlaTEtLVEtEWkNaWkJOWkRZRFlRWkpZSkdNQ1RYTFRHWFNaTE1MSEJHTEtGV05XWkhEWFVITEZNS1lTTEdYRFRXV0ZSSkVKWlRaSFlEWFlLU0hXRlpDUVNIS1RNUVFIVFpIWU1KREpTS0hYWkpaQlpaWFlNUEFHUU1TVFBYTFNLTFpZTldSVFNRTFNaQlBTUFNHWldZSFRMS1NTU1dIWlpMWVlUTlhKR01KU1pTVUZXTkxTT1pUWEdYTFNBTU1MQldMRFNaWUxBS1FDUUNUTVlDRkpCU0xYQ0xaWkNMWFhLU0JaUUNMSEpQU1FQTFNYWENLU0xOSFBTRlFRWVRYWUpaTFFMRFhaUUpaRFlZREpOWlBUVVpEU0tKRlNMSkhZTFpTUVpMQlRYWURHVFFGREJZQVpYRFpIWkpOSEhRQllLTlhKSlFDWk1MTEpaS1NQTERZQ0xCQkxYS0xFTFhKTEJRWUNYSlhHQ05MQ1FQTFpMWllKVFpMSkdZWkRaUExUUUNTWEZETU5ZQ1hHQlRKRENaTkJHQlFZUUpXR0tGSFROUFlRWlFHQktQQkJZWk1USkRZVEJMU1FNUFNYVEJOUERYS0xFTVlZQ0pZTlpDVExEWUtaWlhERFhIUVNIREdNWlNKWUNDVEFZUlpMUFlMVExLWFNMWkNHR0VYQ0xGWExLSlJUTFFKQVFaTkNNQllES0tDWEdMQ1pKWlhKSFBUREpKTVpRWUtRU0VDUVpEU0hIQURNTFpGTU1aQkdOVEpOTkxHQllKQlJCVE1MQllKRFpYTENKTFBMRExQQ1FESExYWkxZQ0JMQ1haWkpBREpMTlpNTVNTU01ZQkhCU1FLQkhSU1hYSk1YU0RaTlpQWExHQlJIV0dHRkNYR01TS0xMVFNKWVlDUUxUU0tZV1lZSFlXWEJYUVlXUFlXWUtRTFNRUFROVEtIUUNXRFFLVFdQWFhIQ1BUSFRXVU1TU1lIQldDUldYSEpNS01aTkdXVE1MS0ZHSEtKWUxTWVlDWFdIWUVDTFFIS1FIVFRRS0hGWkxEWFFXWVpZWURFU0JQS1lSWlBKRllZWkpDRVFEWlpETEFUWkJCRkpMTENYRExNSlNTWEVHWUdTSlFYQ1dCWFNTWlBEWVpDWEROWVhQUFpZRExZSkNaUExUWExTWFlaWVJYQ1lZWURZTFdXTlpTQUhKU1lRWUhHWVdXQVhUSlpEQVhZU1JMVERQU1NZWUZORUpEWFlaSExYTExMWlFaU0pOWVFZUVFYWUpHSFpHWkNZSkNIWkxZQ0RTSFdTSEpaWUpYQ0xMTlhaSkpZWVhORlhNV0ZQWUxDWUxMQUJXRERIV0RYSk1DWFpUWlBNTFFaSFNGSFpZTlpUTExEWVdMU0xYSFlNTVlMTUJXV0tZWFlBRFRYWUxMREpQWUJQV1VYSk1XTUxMU0FGRExMWUZMQkhISEJRUUxUWkpDUUpMREpURkZLTU1NQllUSFlHRENRUkREV1JRSlhOQllTTldaREJZWVRCSkhQWUJZVFRKWEFBSEdRRFFUTVlTVFFYS0JUWlBLSkxaUkJFUVFTU01KSkJESk9UR1RCWFBHQktUTEhRWEpKSkNUSFhRRFdKTFdSRldRR1dTSENLUllTV0dGVEdZR0JYU0RXRFdSRkhXWVRKSlhYWEpZWllTTFBZWVlQQVlYSFlEUUtYU0hYWVhHU0tRSFlXRkRERFBQTENKTFFRRUVXWEtTWVlLRFlQTFRKVEhLSkxUQ1lZSEhKVFRQTFRaWkNETFRIUUtaWFFZU1RFRVlXWVlaWVhYWVlTVFRKS0xMUFpNQ1lIUUdYWUhTUk1CWFBMTE5RWURRSFhTWFhXR0RRQlNIWUxMUEpKSlRIWUpLWVBQVEhZWUtUWUVaWUVOTURTSExDUlBRRkRHRlhaUFNGVExKWFhKQlNXWVlTS1NGTFhMUFBMQkJCTEJTRlhGWVpCU0pTU1lMUEJCRkZGRlNTQ0pEU1RaU1haUllZU1lGRlNZWllaQkpUQkNUU0JTREhSVEpKQllUQ1hZSkVZTFhDQk5FQkpEU1lYWUtHU0paQlhCWVRGWldHRU5ZSEhUSFpISFhGV0dDU1RCR1hLTFNYWVdNVE1CWVhKU1RaU0NEWVFSQ1lUV1haRkhNWU1DWExaTlNESlRUVFhSWUNGWUpTQlNEWUVSWEpMSlhCQkRFWU5KR0hYR0NLR1NDWU1CTFhKTVNaTlNLR1hGQk5CUFRIRkpBQUZYWVhGUFhNWVBRRFRaQ1haWlBYUlNZV1pETFlCQktUWVFQUUpQWllQWkpaTkpQWkpMWlpGWVNCVFRTTE1QVFpSVERYUVNKRUhCWllMWkRITEpTUU1MSFRYVEpFQ1hTTFpaU1BLVExaS1FRWUZTWUdZV1BDUFFGSFFIWVRRWFpLUlNHVFRTUUNaTFBUWENEWVlaWFNRWlNMWExaTVlDUENRQlpZWEhCU1hMWkRMVENEWFRZTFpKWVlaUFpZWkxUWEpTSlhITFBNWVRYQ1FSQkxaU1NGSlpaVE5KWVRYTVlKSExIUFBMQ1lYUUpRUUtaWlNDUFpLU1dBTFFTQkxDQ1pKU1hHV1dXWUdZS1RKQkJaVERLSFhIS0dUR1BCS1FZU0xQWFBKQ0tCTUxMWERaU1RCS0xHR1FLUUxTQktLVEZYUk1ES0JGVFBaRlJUQkJSRkVSUUdYWUpQWlNTVExCWlRQU1pRWlNKREhMSlFMWkJQTVNNTVNYTFFRTkhLTkJMUkRETlhYREhEREpDWVlHWUxYR1pMWFNZR01RUUdLSEJQTVhZWExZVFFXTFdHQ1BCTVFYQ1laWURSSkJIVERKWUhRU0hUTUpTQllQTFdITFpGRk5ZUE1IWFhIUExUQlFQRkJKV1FEQllHUE5aVFBGWkpHU0REVFFTSFpFQVdaWllMTFRZWUJXSktYWEdITEZLWERKVE1TWlNRWU5aR0dTV1FTUEhUTFNTS01DTFpYWVNaUVpYTkNKRFFHWkRMRk5ZS0xKQ0pMTFpMTVpaTkhZRFNTSFRIWlpMWlpCQkhRWldXWUNSWkhMWVFRSkJFWUZYWFhXSFNSWFdRSFdQU0xNU1NLWlRUWUdZUVFXUlNMQUxITUpUUUpTTVhRQkpKWkpYWllaS1hCWVFYQkpYU0haVFNGSkxYTVhaWEZHSEtaU1pHR1lMQ0xTQVJKWUhTTExMTVpYRUxHTFhZREpZVExGQkhCUE5MWVpGQkJIUFRHSktXRVRaSEtKSlhaWFhHTExKTFNUR1NISkpZUUxRWkZLQ0dOTkRKU1NaRkRCQ1RXV1NFUUZIUUpCU0FRVEdZUFFMQlhCTU1ZV1hHU0xaSEdMWkdRWUZMWkJZRlpKRlJZU0ZNQllaSFFHRldaU1lGWUpKUEhaQllZWkZGV09ER1JMTUZUV0xCWkdZQ1FYQ0RKWUdaWVlZWVRZVFlEV0VHQVpZSFhKTFpZWUhMUk1HUlhYWkNMSE5FTEpKVEpUUFdKWUJKSkJYSkpUSlRFRUtIV1NMSlBMUFNGWVpQUVFCRExRSkpUWVlRTFlaS0RLU1FKWVlRWkxEUVRHSlFZWkpTVUNNUllRVEhURUpNRkNUWUhZUEtNSFlaV0pEUUZIWVlYV1NIQ1RYUkxKSFFYSENDWVlZSkxUS1RUWVRNWEdUQ0pUWkFZWU9DWkxZTEJTWllXSllUU0pZSEJZU0hGSkxZR0pYWFRNWllZTFRYWFlQWkxYWUpaWVpZWVBOSE1ZTURZWUxCTEhMU1lZUVFMTE5KSllNU09ZUUJaR0RMWVhZTENRWVhUU1pFR1hIWkdMSFdCTEpIRVlYVFdRTUFLQlBRQ0dZU0hIRUdRQ01XWVlXTEpZSkhZWVpMTEpKWUxIWllITUdTTEpMSlhDSkpZQ0xZQ0pQQ1BaSlpKTU1ZTENRTE5RTEpRSlNYWUpNTFNaTEpRTFlDTU1IQ0ZNTUZQUVFNRllMUU1DRkZRTU1NTUhNWk5GSEhKR1RUSEhLSFNMTkNISFlRRFhUTU1RRENZWllYWVFNWVFZTFREQ1lZWVpBWlpDWU1aWURMWkZGRk1NWUNRWldaWk1BQlRCWVpURE1OWlpHR0RGVFlQQ0dRWVRUU1NGRldGRFRaUVNTWVNUV1hKSFhZVFNYWFlMQllRSFdXS1hIWlhXWk5OWlpKWkpKUUpDQ0NIWVlYQlpYWkNZWlRMTENRWFlOSllDWVlDWU5aWlFZWVlFV1lDWkRDSllDQ0hZSkxCVFpZWUNRV01QV1BZTUxHS0RMRExHS1FRQkdZQ0hKWFlcIjtcclxuICAgIC8v5q2k5aSE5pS25b2V5LqGMzc15Liq5aSa6Z+z5a2XXHJcbiAgIHZhciBvTXVsdGlEaWZmPXtcIjE5OTY5XCI6XCJEWlwiLFwiMTk5NzVcIjpcIldNXCIsXCIxOTk4OFwiOlwiUUpcIixcIjIwMDQ4XCI6XCJZTFwiLFwiMjAwNTZcIjpcIlNDXCIsXCIyMDA2MFwiOlwiTk1cIixcIjIwMDk0XCI6XCJRR1wiLFwiMjAxMjdcIjpcIlFKXCIsXCIyMDE2N1wiOlwiUUNcIixcIjIwMTkzXCI6XCJZR1wiLFwiMjAyNTBcIjpcIktIXCIsXCIyMDI1NlwiOlwiWkNcIixcIjIwMjgyXCI6XCJTQ1wiLFwiMjAyODVcIjpcIlFKR1wiLFwiMjAyOTFcIjpcIlREXCIsXCIyMDMxNFwiOlwiWURcIixcIjIwMzQwXCI6XCJORVwiLFwiMjAzNzVcIjpcIlREXCIsXCIyMDM4OVwiOlwiWUpcIixcIjIwMzkxXCI6XCJDWlwiLFwiMjA0MTVcIjpcIlBCXCIsXCIyMDQ0NlwiOlwiWVNcIixcIjIwNDQ3XCI6XCJTUVwiLFwiMjA1MDRcIjpcIlRDXCIsXCIyMDYwOFwiOlwiS0dcIixcIjIwODU0XCI6XCJRSlwiLFwiMjA4NTdcIjpcIlpDXCIsXCIyMDkxMVwiOlwiUEZcIixcIjIwNTA0XCI6XCJUQ1wiLFwiMjA2MDhcIjpcIktHXCIsXCIyMDg1NFwiOlwiUUpcIixcIjIwODU3XCI6XCJaQ1wiLFwiMjA5MTFcIjpcIlBGXCIsXCIyMDk4NVwiOlwiQVdcIixcIjIxMDMyXCI6XCJQQlwiLFwiMjEwNDhcIjpcIlhRXCIsXCIyMTA0OVwiOlwiU0NcIixcIjIxMDg5XCI6XCJZU1wiLFwiMjExMTlcIjpcIkpDXCIsXCIyMTI0MlwiOlwiU0JcIixcIjIxMjczXCI6XCJTQ1wiLFwiMjEzMDVcIjpcIllQXCIsXCIyMTMwNlwiOlwiUU9cIixcIjIxMzMwXCI6XCJaQ1wiLFwiMjEzMzNcIjpcIlNEQ1wiLFwiMjEzNDVcIjpcIlFLXCIsXCIyMTM3OFwiOlwiQ0FcIixcIjIxMzk3XCI6XCJTQ1wiLFwiMjE0MTRcIjpcIlhTXCIsXCIyMTQ0MlwiOlwiU0NcIixcIjIxNDc3XCI6XCJKR1wiLFwiMjE0ODBcIjpcIlREXCIsXCIyMTQ4NFwiOlwiWlNcIixcIjIxNDk0XCI6XCJZWFwiLFwiMjE1MDVcIjpcIllYXCIsXCIyMTUxMlwiOlwiSEdcIixcIjIxNTIzXCI6XCJYSFwiLFwiMjE1MzdcIjpcIlBCXCIsXCIyMTU0MlwiOlwiUEZcIixcIjIxNTQ5XCI6XCJLSFwiLFwiMjE1NzFcIjpcIkVcIixcIjIxNTc0XCI6XCJEQVwiLFwiMjE1ODhcIjpcIlREXCIsXCIyMTU4OVwiOlwiT1wiLFwiMjE2MThcIjpcIlpDXCIsXCIyMTYyMVwiOlwiS0hBXCIsXCIyMTYzMlwiOlwiWkpcIixcIjIxNjU0XCI6XCJLR1wiLFwiMjE2NzlcIjpcIkxLR1wiLFwiMjE2ODNcIjpcIktIXCIsXCIyMTcxMFwiOlwiQVwiLFwiMjE3MTlcIjpcIllIXCIsXCIyMTczNFwiOlwiV09FXCIsXCIyMTc2OVwiOlwiQVwiLFwiMjE3ODBcIjpcIldOXCIsXCIyMTgwNFwiOlwiWEhcIixcIjIxODM0XCI6XCJBXCIsXCIyMTg5OVwiOlwiWkRcIixcIjIxOTAzXCI6XCJSTlwiLFwiMjE5MDhcIjpcIldPXCIsXCIyMTkzOVwiOlwiWkNcIixcIjIxOTU2XCI6XCJTQVwiLFwiMjE5NjRcIjpcIllBXCIsXCIyMTk3MFwiOlwiVERcIixcIjIyMDAzXCI6XCJBXCIsXCIyMjAzMVwiOlwiSkdcIixcIjIyMDQwXCI6XCJYU1wiLFwiMjIwNjBcIjpcIlpDXCIsXCIyMjA2NlwiOlwiWkNcIixcIjIyMDc5XCI6XCJNSFwiLFwiMjIxMjlcIjpcIlhKXCIsXCIyMjE3OVwiOlwiWEFcIixcIjIyMjM3XCI6XCJOSlwiLFwiMjIyNDRcIjpcIlREXCIsXCIyMjI4MFwiOlwiSlFcIixcIjIyMzAwXCI6XCJZSFwiLFwiMjIzMTNcIjpcIlhXXCIsXCIyMjMzMVwiOlwiWVFcIixcIjIyMzQzXCI6XCJZSlwiLFwiMjIzNTFcIjpcIlBIXCIsXCIyMjM5NVwiOlwiRENcIixcIjIyNDEyXCI6XCJURFwiLFwiMjI0ODRcIjpcIlBCXCIsXCIyMjUwMFwiOlwiUEJcIixcIjIyNTM0XCI6XCJaRFwiLFwiMjI1NDlcIjpcIkRIXCIsXCIyMjU2MVwiOlwiUEJcIixcIjIyNjEyXCI6XCJURFwiLFwiMjI3NzFcIjpcIktRXCIsXCIyMjgzMVwiOlwiSEJcIixcIjIyODQxXCI6XCJKR1wiLFwiMjI4NTVcIjpcIlFKXCIsXCIyMjg2NVwiOlwiWFFcIixcIjIzMDEzXCI6XCJNTFwiLFwiMjMwODFcIjpcIldNXCIsXCIyMzQ4N1wiOlwiU1hcIixcIjIzNTU4XCI6XCJRSlwiLFwiMjM1NjFcIjpcIllXXCIsXCIyMzU4NlwiOlwiWVdcIixcIjIzNjE0XCI6XCJZV1wiLFwiMjM2MTVcIjpcIlNOXCIsXCIyMzYzMVwiOlwiUEJcIixcIjIzNjQ2XCI6XCJaU1wiLFwiMjM2NjNcIjpcIlpUXCIsXCIyMzY3M1wiOlwiWUdcIixcIjIzNzYyXCI6XCJURFwiLFwiMjM3NjlcIjpcIlpTXCIsXCIyMzc4MFwiOlwiUUpcIixcIjIzODg0XCI6XCJRS1wiLFwiMjQwNTVcIjpcIlhIXCIsXCIyNDExM1wiOlwiRENcIixcIjI0MTYyXCI6XCJaQ1wiLFwiMjQxOTFcIjpcIkdBXCIsXCIyNDI3M1wiOlwiUUpcIixcIjI0MzI0XCI6XCJOTFwiLFwiMjQzNzdcIjpcIlREXCIsXCIyNDM3OFwiOlwiUUpcIixcIjI0NDM5XCI6XCJQRlwiLFwiMjQ1NTRcIjpcIlpTXCIsXCIyNDY4M1wiOlwiVERcIixcIjI0Njk0XCI6XCJXRVwiLFwiMjQ3MzNcIjpcIkxLXCIsXCIyNDkyNVwiOlwiVE5cIixcIjI1MDk0XCI6XCJaR1wiLFwiMjUxMDBcIjpcIlhRXCIsXCIyNTEwM1wiOlwiWEhcIixcIjI1MTUzXCI6XCJQQlwiLFwiMjUxNzBcIjpcIlBCXCIsXCIyNTE3OVwiOlwiS0dcIixcIjI1MjAzXCI6XCJQQlwiLFwiMjUyNDBcIjpcIlpTXCIsXCIyNTI4MlwiOlwiRkJcIixcIjI1MzAzXCI6XCJOQVwiLFwiMjUzMjRcIjpcIktHXCIsXCIyNTM0MVwiOlwiWllcIixcIjI1MzczXCI6XCJXWlwiLFwiMjUzNzVcIjpcIlhKXCIsXCIyNTM4NFwiOlwiQVwiLFwiMjU0NTdcIjpcIkFcIixcIjI1NTI4XCI6XCJTRFwiLFwiMjU1MzBcIjpcIlNDXCIsXCIyNTU1MlwiOlwiVERcIixcIjI1Nzc0XCI6XCJaQ1wiLFwiMjU4NzRcIjpcIlpDXCIsXCIyNjA0NFwiOlwiWVdcIixcIjI2MDgwXCI6XCJXTVwiLFwiMjYyOTJcIjpcIlBCXCIsXCIyNjMzM1wiOlwiUEJcIixcIjI2MzU1XCI6XCJaWVwiLFwiMjYzNjZcIjpcIkNaXCIsXCIyNjM5N1wiOlwiWkNcIixcIjI2Mzk5XCI6XCJRSlwiLFwiMjY0MTVcIjpcIlpTXCIsXCIyNjQ1MVwiOlwiU0JcIixcIjI2NTI2XCI6XCJaQ1wiLFwiMjY1NTJcIjpcIkpHXCIsXCIyNjU2MVwiOlwiVERcIixcIjI2NTg4XCI6XCJKR1wiLFwiMjY1OTdcIjpcIkNaXCIsXCIyNjYyOVwiOlwiWlNcIixcIjI2NjM4XCI6XCJZTFwiLFwiMjY2NDZcIjpcIlhRXCIsXCIyNjY1M1wiOlwiS0dcIixcIjI2NjU3XCI6XCJYSlwiLFwiMjY3MjdcIjpcIkhHXCIsXCIyNjg5NFwiOlwiWkNcIixcIjI2OTM3XCI6XCJaU1wiLFwiMjY5NDZcIjpcIlpDXCIsXCIyNjk5OVwiOlwiS0pcIixcIjI3MDk5XCI6XCJLSlwiLFwiMjc0NDlcIjpcIllRXCIsXCIyNzQ4MVwiOlwiWFNcIixcIjI3NTQyXCI6XCJaU1wiLFwiMjc2NjNcIjpcIlpTXCIsXCIyNzc0OFwiOlwiVFNcIixcIjI3Nzg0XCI6XCJTQ1wiLFwiMjc3ODhcIjpcIlpEXCIsXCIyNzc5NVwiOlwiVERcIixcIjI3ODEyXCI6XCJPXCIsXCIyNzg1MFwiOlwiUEJcIixcIjI3ODUyXCI6XCJNQlwiLFwiMjc4OTVcIjpcIlNMXCIsXCIyNzg5OFwiOlwiUExcIixcIjI3OTczXCI6XCJRSlwiLFwiMjc5ODFcIjpcIktIXCIsXCIyNzk4NlwiOlwiSFhcIixcIjI3OTk0XCI6XCJYSlwiLFwiMjgwNDRcIjpcIllDXCIsXCIyODA2NVwiOlwiV0dcIixcIjI4MTc3XCI6XCJTTVwiLFwiMjgyNjdcIjpcIlFKXCIsXCIyODI5MVwiOlwiS0hcIixcIjI4MzM3XCI6XCJaUVwiLFwiMjg0NjNcIjpcIlRMXCIsXCIyODU0OFwiOlwiRENcIixcIjI4NjAxXCI6XCJURFwiLFwiMjg2ODlcIjpcIlBCXCIsXCIyODgwNVwiOlwiSkdcIixcIjI4ODIwXCI6XCJRR1wiLFwiMjg4NDZcIjpcIlBCXCIsXCIyODk1MlwiOlwiVERcIixcIjI4OTc1XCI6XCJaQ1wiLFwiMjkxMDBcIjpcIkFcIixcIjI5MzI1XCI6XCJRSlwiLFwiMjk1NzVcIjpcIlNMXCIsXCIyOTYwMlwiOlwiRkJcIixcIjMwMDEwXCI6XCJURFwiLFwiMzAwNDRcIjpcIkNYXCIsXCIzMDA1OFwiOlwiUEZcIixcIjMwMDkxXCI6XCJZU1BcIixcIjMwMTExXCI6XCJZTlwiLFwiMzAyMjlcIjpcIlhKXCIsXCIzMDQyN1wiOlwiU0NcIixcIjMwNDY1XCI6XCJTWFwiLFwiMzA2MzFcIjpcIllRXCIsXCIzMDY1NVwiOlwiUUpcIixcIjMwNjg0XCI6XCJRSkdcIixcIjMwNzA3XCI6XCJTRFwiLFwiMzA3MjlcIjpcIlhIXCIsXCIzMDc5NlwiOlwiTEdcIixcIjMwOTE3XCI6XCJQQlwiLFwiMzEwNzRcIjpcIk5NXCIsXCIzMTA4NVwiOlwiSlpcIixcIjMxMTA5XCI6XCJTQ1wiLFwiMzExODFcIjpcIlpDXCIsXCIzMTE5MlwiOlwiTUxCXCIsXCIzMTI5M1wiOlwiSlFcIixcIjMxNDAwXCI6XCJZWFwiLFwiMzE1ODRcIjpcIllKXCIsXCIzMTg5NlwiOlwiWk5cIixcIjMxOTA5XCI6XCJaWVwiLFwiMzE5OTVcIjpcIlhKXCIsXCIzMjMyMVwiOlwiUEZcIixcIjMyMzI3XCI6XCJaWVwiLFwiMzI0MThcIjpcIkhHXCIsXCIzMjQyMFwiOlwiWFFcIixcIjMyNDIxXCI6XCJIR1wiLFwiMzI0MzhcIjpcIkxHXCIsXCIzMjQ3M1wiOlwiR0pcIixcIjMyNDg4XCI6XCJURFwiLFwiMzI1MjFcIjpcIlFKXCIsXCIzMjUyN1wiOlwiUEJcIixcIjMyNTYyXCI6XCJaU1FcIixcIjMyNTY0XCI6XCJKWlwiLFwiMzI3MzVcIjpcIlpEXCIsXCIzMjc5M1wiOlwiUEJcIixcIjMzMDcxXCI6XCJQRlwiLFwiMzMwOThcIjpcIlhMXCIsXCIzMzEwMFwiOlwiWUFcIixcIjMzMTUyXCI6XCJQQlwiLFwiMzMyNjFcIjpcIkNYXCIsXCIzMzMyNFwiOlwiQlBcIixcIjMzMzMzXCI6XCJURFwiLFwiMzM0MDZcIjpcIllBXCIsXCIzMzQyNlwiOlwiV01cIixcIjMzNDMyXCI6XCJQQlwiLFwiMzM0NDVcIjpcIkpHXCIsXCIzMzQ4NlwiOlwiWk5cIixcIjMzNDkzXCI6XCJUU1wiLFwiMzM1MDdcIjpcIlFKXCIsXCIzMzU0MFwiOlwiUUpcIixcIjMzNTQ0XCI6XCJaQ1wiLFwiMzM1NjRcIjpcIlhRXCIsXCIzMzYxN1wiOlwiWVRcIixcIjMzNjMyXCI6XCJRSlwiLFwiMzM2MzZcIjpcIlhIXCIsXCIzMzYzN1wiOlwiWVhcIixcIjMzNjk0XCI6XCJXR1wiLFwiMzM3MDVcIjpcIlBGXCIsXCIzMzcyOFwiOlwiWVdcIixcIjMzODgyXCI6XCJTUlwiLFwiMzQwNjdcIjpcIldNXCIsXCIzNDA3NFwiOlwiWVdcIixcIjM0MTIxXCI6XCJRSlwiLFwiMzQyNTVcIjpcIlpDXCIsXCIzNDI1OVwiOlwiWExcIixcIjM0NDI1XCI6XCJKSFwiLFwiMzQ0MzBcIjpcIlhIXCIsXCIzNDQ4NVwiOlwiS0hcIixcIjM0NTAzXCI6XCJZU1wiLFwiMzQ1MzJcIjpcIkhHXCIsXCIzNDU1MlwiOlwiWFNcIixcIjM0NTU4XCI6XCJZRVwiLFwiMzQ1OTNcIjpcIlpMXCIsXCIzNDY2MFwiOlwiWVFcIixcIjM0ODkyXCI6XCJYSFwiLFwiMzQ5MjhcIjpcIlNDXCIsXCIzNDk5OVwiOlwiUUpcIixcIjM1MDQ4XCI6XCJQQlwiLFwiMzUwNTlcIjpcIlNDXCIsXCIzNTA5OFwiOlwiWkNcIixcIjM1MjAzXCI6XCJUUVwiLFwiMzUyNjVcIjpcIkpYXCIsXCIzNTI5OVwiOlwiSlhcIixcIjM1NzgyXCI6XCJTWlwiLFwiMzU4MjhcIjpcIllTXCIsXCIzNTgzMFwiOlwiRVwiLFwiMzU4NDNcIjpcIlREXCIsXCIzNTg5NVwiOlwiWUdcIixcIjM1OTc3XCI6XCJNSFwiLFwiMzYxNThcIjpcIkpHXCIsXCIzNjIyOFwiOlwiUUpcIixcIjM2NDI2XCI6XCJYUVwiLFwiMzY0NjZcIjpcIkRDXCIsXCIzNjcxMFwiOlwiSkNcIixcIjM2NzExXCI6XCJaWUdcIixcIjM2NzY3XCI6XCJQQlwiLFwiMzY4NjZcIjpcIlNLXCIsXCIzNjk1MVwiOlwiWVdcIixcIjM3MDM0XCI6XCJZWFwiLFwiMzcwNjNcIjpcIlhIXCIsXCIzNzIxOFwiOlwiWkNcIixcIjM3MzI1XCI6XCJaQ1wiLFwiMzgwNjNcIjpcIlBCXCIsXCIzODA3OVwiOlwiVERcIixcIjM4MDg1XCI6XCJRWVwiLFwiMzgxMDdcIjpcIkRDXCIsXCIzODExNlwiOlwiVERcIixcIjM4MTIzXCI6XCJZRFwiLFwiMzgyMjRcIjpcIkhHXCIsXCIzODI0MVwiOlwiWFRDXCIsXCIzODI3MVwiOlwiWkNcIixcIjM4NDE1XCI6XCJZRVwiLFwiMzg0MjZcIjpcIktIXCIsXCIzODQ2MVwiOlwiWURcIixcIjM4NDYzXCI6XCJBRVwiLFwiMzg0NjZcIjpcIlBCXCIsXCIzODQ3N1wiOlwiWEpcIixcIjM4NTE4XCI6XCJZVFwiLFwiMzg1NTFcIjpcIldLXCIsXCIzODU4NVwiOlwiWkNcIixcIjM4NzA0XCI6XCJYU1wiLFwiMzg3MzlcIjpcIkxKXCIsXCIzODc2MVwiOlwiR0pcIixcIjM4ODA4XCI6XCJTUVwiLFwiMzkwNDhcIjpcIkpHXCIsXCIzOTA0OVwiOlwiWEpcIixcIjM5MDUyXCI6XCJIR1wiLFwiMzkwNzZcIjpcIkNaXCIsXCIzOTI3MVwiOlwiWFRcIixcIjM5NTM0XCI6XCJURFwiLFwiMzk1NTJcIjpcIlREXCIsXCIzOTU4NFwiOlwiUEJcIixcIjM5NjQ3XCI6XCJTQlwiLFwiMzk3MzBcIjpcIkxHXCIsXCIzOTc0OFwiOlwiVFBCXCIsXCI0MDEwOVwiOlwiWlFcIixcIjQwNDc5XCI6XCJORFwiLFwiNDA1MTZcIjpcIkhHXCIsXCI0MDUzNlwiOlwiSEdcIixcIjQwNTgzXCI6XCJRSlwiLFwiNDA3NjVcIjpcIllRXCIsXCI0MDc4NFwiOlwiUUpcIixcIjQwODQwXCI6XCJZS1wiLFwiNDA4NjNcIjpcIlFKR1wifTtcclxuICAgIC8v5Y+C5pWwLOS4reaWh+Wtl+espuS4slxyXG4gICAgLy/ov5Tlm57lgLw65ou86Z+z6aaW5a2X5q+N5Liy5pWw57uEXHJcbiAgICBmdW5jdGlvbiBtYWtlUHkoc3RyKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoc3RyKSAhPSBcInN0cmluZ1wiKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoLTEsIFwi5Ye95pWwbWFrZVB56ZyA6KaB5a2X56ym5Liy57G75Z6L5Y+C5pWwIVwiKTtcclxuICAgICAgICB2YXIgYXJyUmVzdWx0ID0gbmV3IEFycmF5KCk7IC8v5L+d5a2Y5Lit6Ze057uT5p6c55qE5pWw57uEXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAvL+iOt+W+l3VuaWNvZGXnoIFcclxuICAgICAgICAgICAgdmFyIGNoID0gc3RyLmNoYXJBdChpKTtcclxuICAgICAgICAgICAgLy/mo4Dmn6Xor6V1bmljb2Rl56CB5piv5ZCm5Zyo5aSE55CG6IyD5Zu05LmL5YaFLOWcqOWImei/lOWbnuivpeeggeWvueaYoOaxieWtl+eahOaLvOmfs+mmluWtl+avjSzkuI3lnKjliJnosIPnlKjlhbblroPlh73mlbDlpITnkIZcclxuICAgICAgICAgICAgYXJyUmVzdWx0LnB1c2goY2hlY2tDaChjaCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WkhOeQhmFyclJlc3VsdCzov5Tlm57miYDmnInlj6/og73nmoTmi7zpn7PpppblrZfmr43kuLLmlbDnu4RcclxuICAgICAgICByZXR1cm4gbWtSc2x0KGFyclJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tDaChjaCkge1xyXG4gICAgICAgIHZhciB1bmkgPSBjaC5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIC8v5aaC5p6c5LiN5Zyo5rGJ5a2X5aSE55CG6IyD5Zu05LmL5YaFLOi/lOWbnuWOn+Wtl+espizkuZ/lj6/ku6XosIPnlKjoh6rlt7HnmoTlpITnkIblh73mlbBcclxuICAgICAgICBpZiAodW5pID4gNDA4NjkgfHwgdW5pIDwgMTk5NjgpXHJcbiAgICAgICAgICAgIHJldHVybiBjaDsgLy9kZWFsV2l0aE90aGVycyhjaCk7XHJcbiAgICAgICAgLy/mo4Dmn6XmmK/lkKbmmK/lpJrpn7PlrZcs5piv5oyJ5aSa6Z+z5a2X5aSE55CGLOS4jeaYr+WwseebtOaOpeWcqHN0ckNoaW5lc2VGaXJzdFBZ5a2X56ym5Liy5Lit5om+5a+55bqU55qE6aaW5a2X5q+NXHJcbiAgICAgICAgcmV0dXJuIChvTXVsdGlEaWZmW3VuaV0gPyBvTXVsdGlEaWZmW3VuaV0gOiAoc3RyQ2hpbmVzZUZpcnN0UFkuY2hhckF0KHVuaSAtIDE5OTY4KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1rUnNsdChhcnIpIHtcclxuICAgICAgICB2YXIgYXJyUnNsdCA9IFtcIlwiXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSBhcnJbaV07XHJcbiAgICAgICAgICAgIHZhciBzdHJsZW4gPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAoc3RybGVuID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYXJyUnNsdC5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyclJzbHRba10gKz0gc3RyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRtcEFyciA9IGFyclJzbHQuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgICAgICBhcnJSc2x0ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgc3RybGVuOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WkjeWItuS4gOS4quebuOWQjOeahGFyclJzbHRcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gdG1wQXJyLnNsaWNlKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5oqK5b2T5YmN5a2X56ymc3RyW2td5re75Yqg5Yiw5q+P5Liq5YWD57Sg5pyr5bC+XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0bXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2pdICs9IHN0ci5jaGFyQXQoayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5oqK5aSN5Yi25bm25L+u5pS55ZCO55qE5pWw57uE6L+e5o6l5YiwYXJyUnNsdOS4ilxyXG4gICAgICAgICAgICAgICAgICAgIGFyclJzbHQgPSBhcnJSc2x0LmNvbmNhdCh0bXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJSc2x0O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lik56uv5Y6756m65qC85Ye95pWwXHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKF5cXHMqKXwoXFxzKiQpL2csIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YXIgcGlueWluID0ge307XHJcbiAgICBwaW55aW4ubWFrZVB5ID0gbWFrZVB5O1xyXG5cclxuXHJcbiAgICAvL3ZhciBtYWlucGFuZWw7XHJcbiAgICAvL3ZhciBvcHRzO1xyXG4gICAgdmFyIGVsZW1lbnQgPSBsYXl1aS5lbGVtZW50LFxyXG4gICAgICAgIHdpbiA9IHdpbmRvdyxcclxuICAgICAgICBkb2MgPSBkb2N1bWVudDtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkaW5nKCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IGxheWVyLmxvYWQoMiwge1xyXG4gICAgICAgICAgICBzaGFkZTogWzAuNiwgJyNmZmYnXSAvLzAuMemAj+aYjuW6pueahOeZveiJsuiDjOaZr1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxheWVyLmNsb3NlKGluZGV4KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgcGxnU2lkZWJhciA9IGZ1bmN0aW9uIChlbGUsIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBDbGFzc01haW4gPSB7XHJcbiAgICAgICAgICAgIGRvbTogbnVsbCxcclxuICAgICAgICAgICAgZG9jdW1lbnRQYW5lbDogbnVsbCxcclxuICAgICAgICAgICAgbWV1blBhbmVsVGhpczogbnVsbCxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IGZ1bmN0aW9uIChtZXVuUGFuZWxUaGlzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2dldERhdGEgPSB0aGlzLm1ldW5QYW5lbFRoaXMuZ2V0RGF0YS5wYXJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYoIV9nZXREYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICBfZ2V0RGF0YT1bXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5rKh5pyJ5pWw5o2uXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVuZGVyTmF2ID0gdGhpcy5tYWluTmF2KF9nZXREYXRhKTtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRzID0gdGhpcy5vcGVzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRtbCA9XHJcbiAgICAgICAgICAgICAgICAgICAgJChgPGRpdiBjbGFzcz1cInBsZy1zaWRlYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgPGRpdiBjbGFzcz1cIm1haW4tbmF2XCI+XHJcbiAgICAgICAgPGRpdiBpZD1cIm1ldW5Tb3JvbGxcIiBjbGFzcz1cImxheXVpLXNpZGUtc2Nyb2xsXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1sb2dvXCIgPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsb2dvLXBhdGggJHtvcHRzLmxvZ289PSdwbGcnJiYncGxnLWxvZ28nfVwiID48L2E+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxpIGlkPVwicGxnLWxvZ28tZm9sZFwiIGNsYXNzPVwiYW50aWNvbiBsYXl1aS1pY29uIGxheXVpLWljb24tc2hyaW5rLXJpZ2h0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgXHJcbiAgICAgICAgICAgIDwhLS0g5bem5L6n5a+86Iiq5Yy65Z+f77yI5Y+v6YWN5ZCIbGF5dWnlt7LmnInnmoTlnoLnm7Tlr7zoiKrvvIkgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1vcGVuXCIgZGF0YS10eXBlPVwiaG9vdC1jbGlja1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWxheWVyLXNldHdpblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLWNsb3NlXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPjwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByLXNlYXJjaFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHItaWNvbi1zZWFyY2gtd3JhcHBlclwiPjxpIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLXNlYXJjaFxyXG5cIj48L2k+PC9zcGFuPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInNlbGVjdElucHV0XCIgY2xhc3M9XCJwci1zZWFyY2gtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeWFs+mUruivjVwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXRpcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Bhbj7ku6XkuIvmmK/kuI7igJw8c3Ryb25nPjwvc3Ryb25nPuKAneebuOWFs+eahOS6p+WTge+8mjwvc3Bhbj48L3A+PC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJrZXlVcExpc3RcIiBjbGFzcz1cImtleVVwTGlzdFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1tZXVuZ3JvdXAtbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsLW5hdlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJyaWdodC1zaWRlYmFyXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1hbGxcIiBkYXRhLXR5cGU9XCJob290LWNsaWNrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnQgcC1pY29uLWFsbFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1ldW4tbmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPuaJgOacieacjeWKoTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInJpZ2h0LW1vdmVyIGxheXVpLWljb24gbGF5dWktaWNvbi1yaWdodFxyXG5cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWxhc3RcIiBkYXRhLXR5cGU9XCJob290LWNsaWNrXCI+XHJcbiAgICAgICAgICAgICAgICA8dWwgaWQ9XCJzaWRlYmFyXCIgY2xhc3M9XCJzaWRlYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtyZW5kZXJOYXZ9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdi1ob3Zlci1jaGlsZFwiID5cclxuICAgICAgICAgICAgICAgIDwhLS0g5LqM57qn6I+c5Y2VIC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLXNpZGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJuYXYtdGl0bGVcIj48L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiYm9keS1uYXZcIiBsYXktZmlsdGVyPVwidGVzdFwiPjwvdWw+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgXHJcbjwvZGl2PlxyXG5gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bWxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFpbk5hdjogZnVuY3Rpb24gKHBhcmVudERhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vICFpdGVtLmxlYWZcclxuICAgICAgICAgICAgICAgIGlmKCFwYXJlbnREYXRhWzBdKXtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnREYXRhWzBdPVtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmlbDmja7liqDovb3lpLHotKVcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcmVudERhdGFbMF0uZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucGFyZW50TWVudUlkID09PSBcIjBcIiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFuZ3VhZ2U9SFRNTFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUgKz0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzLWl0ZW1cIiBpZD0ke2l0ZW0uaWR9IG1lbnUtaWQ9JHtpdGVtLm1lbnVJZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiJHtpdGVtLmltYWdlUGF0aH1cIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1ldW4tbmFtZVwiPjxhIGhyZWY9XCIkeyFpdGVtLmxlYWY/XCJqYXZhc2NyaXB0OjtcIjppdGVtLnBhdGh9XCI+JHtpdGVtLm5hbWV9PC9hPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNldE9wZW5NZW51TGlzdDogZnVuY3Rpb24gKGVsZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBncm91cCA9ICQoYDxkaXYgY2xhc3M9XCJwci1tZXVuLWdyb3VwXCI+PC9kaXY+PGRpdiBjbGFzcz1cInByLW1ldW4tZ3JvdXBcIj48L2Rpdj48ZGl2IGNsYXNzPVwicHItbWV1bi1ncm91cFwiPjwvZGl2PmApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v5o+S5YWl5Y+z6L6555qE5a+86IiqXHJcbiAgICAgICAgICAgICAgICAkKF90aGlzLmRvY3VtZW50UGFuZWxbMF0pLmZpbmQoXCIucmlnaHQtc2lkZWJhclwiKS5odG1sKFwiXCIpLmFwcGVuZChfdGhpcy5tYWluTmF2KGRhdGEpKTtcclxuICAgICAgICAgICAgICAgIGRhdGFbMF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW54ZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlID0gYDxkaXYgY2xhc3M9XCJsaXN0LWl0ZW1cIiBpZD0ke2l0ZW0ubWVudUlkfT48YSBocmVmPVwiJHshaXRlbS5sZWFmPydqYXZhc2NyaXB0OjsnOml0ZW0ucGF0aH1cIiBtZW51LWlkPSR7aXRlbS5tZW51SWR9IHBhcmVudG1lbnVpZD0ke2l0ZW0ucGFyZW50TWVudUlkfSBjbGFzcz1cImxpc3QtdGl0bGVcIj4ke2l0ZW0ubmFtZX08L2E+YDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpdGVtLm1lbnVJZF0gJiYgZGF0YVtpdGVtLm1lbnVJZF0uZm9yRWFjaChmdW5jdGlvbiAoY2l0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZSArPSBgPGRpdiBjbGFzcz1cIm1lbnUtdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JHtjaXRlbS5wYXRoIHx8IFwiamF2YXNjcmlwdDo7XCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUtaWQ9JHtjaXRlbS5tZW51SWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudG1lbnVpZD0ke2NpdGVtLnBhcmVudE1lbnVJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhZj0ke2NpdGVtLmxlYWZ9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Y2l0ZW0ubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtjaXRlbS5tZW51SWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2NpdGVtLm1lbnVJZF0uZm9yRWFjaChmdW5jdGlvbiAoZGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUgKz0gYDxkaXYgY2xhc3M9XCJtZW51LXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JHtkaXRlbS5wYXRoIHx8IFwiamF2YXNjcmlwdDo7XCJ9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnUtaWQ9JHtkaXRlbS5tZW51SWR9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudG1lbnVpZD0ke2RpdGVtLnBhcmVudE1lbnVJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWFmPSR7ZGl0ZW0ubGVhZn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2RpdGVtLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBlbGUgKz0gYDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlueGV4ICUgMyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5lcSgwKS5hcHBlbmQoZWxlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW54ZXggJSAzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmVxKDEpLmFwcGVuZChlbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbnhleCAlIDMgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZXEoMikuYXBwZW5kKGVsZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdyb3VwLmZpbmQoXCIubWVudS10ZXh0PmFbbGVhZj0nZmFsc2UnXVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKGdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldE9wZW5BbGw6IGZ1bmN0aW9uIChnZXREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBfdGhpcy5kb20ubWV1bmdyb3VwTGlzdCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnREYXRhcyA9IGdldERhdGEucGFyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIHZhciBrZXlVcExpc3QgPSAkKF90aGlzLmRvY3VtZW50UGFuZWxbMF0pLmZpbmQoXCIja2V5VXBMaXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVzZXRPcGVuTWVudUxpc3QobGlzdCwgcGFyZW50RGF0YXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZWdDSCA9IG5ldyBSZWdFeHAoXCJbXFxcXHU0RTAwLVxcXFx1OUZGRl0rXCIsIFwiZ1wiKTtcclxuICAgICAgICAgICAgICAgICQoX3RoaXMuZG9jdW1lbnRQYW5lbFswXSkuZmluZChcIiNzZWxlY3RJbnB1dFwiKS5rZXl1cChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpc3QuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5uZXh0KFwiLnNlYXJjaC10aXBcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5VXBMaXN0Lmh0bWwoXCJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8v6L6T5YWl5qGG5Lit5rKh5pyJ5YaF5a6577yM5YiZ6YCA5Ye6XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykubmV4dChcIi5zZWFyY2gtdGlwXCIpLnNob3coKS5maW5kKFwic3Ryb25nXCIpLnRleHQodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZ2V0RGF0YS5tYXBBbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBnZXREYXRhLm1hcEFsbFtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gcmVnQ0gudGVzdCh2YWwpID8gaXRlbS5uYW1lLmluZGV4T2YodmFsKSA6IGl0ZW0uUFlfY29kZS5pbmRleE9mKHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHIgPj0gMCAmJiBpdGVtLmxlYWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZSArPSBgPGRpdiBjbGFzcz1cInByLW1ldW4tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JHtpdGVtLnBhdGggfHwgXCJqYXZhc2NyaXB0OjtcIn0gPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2l0ZW0ubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5VXBMaXN0Lmh0bWwoXCJcIikuc2hvdygpLmFwcGVuZChlbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvL+iOt+WPluiPnOWNlXRvcOWAvFxyXG4gICAgICAgICAgICBtZXVuVG9wT2JqOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBfdGhpcy5kb20ubWV1bmdyb3VwTGlzdC5maW5kKFwiLmxpc3QtaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIG9iaiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbGlzdC5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBpdGVtLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialtrZXldID0gcGFyc2VJbnQoaXRlbS5vZmZzZXRUb3ApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZW1vdmVyU2hvd0xpc3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IF90aGlzLmRvbS5tZXVuZ3JvdXBMaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIF9nZXREYXRhID0gX3RoaXMubWV1blBhbmVsVGhpcy5nZXREYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudERhdGFzID0gX2dldERhdGEucGFyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRvbSAmJiB0aGlzLmRvbS5tZXVuU29yb2xsLnJlbW92ZUNsYXNzKFwic2hvd0xpc3RcIik7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY2xpY2tDaGlsZDogZnVuY3Rpb24gKGNhbGxiYWtjKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIG90aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvZHlOYXYgPSBfdGhpcy5kb20uYm9keU5hdiAvL3VsXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIF9nZXREYXRhID0gX3RoaXMubWV1blBhbmVsVGhpcy5nZXREYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v54K55Ye75LqM57qn6I+c5Y2V5YiX6KGoXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kb20uYm9keU5hdi5vbihcImNsaWNrXCIsIFwiYVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8v6Zi75q2i5LqL5Lu25YaS5rOhXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG90aGlzID0gJCh0aGlzKSAvL2FcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWlkID0gb3RoaXMuYXR0cihcIm1lbnUtaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9tLm1ldW5ncm91cExpc3QuZmluZChcImFbbWVudS1pZD0nXCIgKyBtaWQgKyBcIiddXCIpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8v54K55Ye757uZ5bGV5byA5omA5Lul6I+c5Y2V5YiX6KGoXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1bmdyb3VwTGlzdC5vbihcImNsaWNrXCIsIFwiYVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8v6Zi75q2i5LqL5Lu25YaS5rOheFxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBvdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pZCA9ICQodGhpcykuYXR0cihcIm1lbnUtaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvZHlOYXZfdGhpcyA9IGJvZHlOYXYuZmluZChcImFbbWVudS1pZD0nXCIgKyBtaWQgKyBcIiddXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3BhcmVudHMgPSAkdGhpcy5wYXJlbnRzKFwiLmJvZHktbmF2XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5TmF2X3BhcmVudCA9IGJvZHlOYXZfdGhpcy5wYXJlbnQoKSwgLy9saVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5TmF2X2NoaWxkID0gYm9keU5hdl90aGlzLnNpYmxpbmdzKCcubmF2LWNoaWxkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWtjRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Q3VycmVudDogX2dldERhdGEubWFwQWxsW21pZF1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwaWQ9b3RoaXMucGFyZW50cyhcIi5saXN0LWl0ZW1cIikuYXR0cihcImlkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWFmPSBfZ2V0RGF0YS5tYXBBbGxbbWlkXS5sZWFmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmID0gb3RoaXMuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Y+z6L6555qE5a+86IiqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGlzLnBhcmVudHMoXCIucHItb3BlblwiKS5maW5kKFwiLnJpZ2h0LXNpZGViYXIgLnMtaXRlbVttZW51LWlkPVwiK3BpZCtcIl0gYVwiKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnVwZGF0ZUNoaWxkTWV1bihwaWQsIG1pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxlYWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC5maW5kKFwiLm5hdi1sYXN0XCIpLmF0dHIoXCJkYXRhLXNob3dcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZXJTaG93TGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFrYyAmJiBjYWxsYmFrYyhjYWxsYmFrY0RhdGEsIGUpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBFdmVudEhhbmxkZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC5oYXNDbGFzcyhcInNob3dMaXN0XCIpICYmIF90aGlzLnJlbW92ZXJTaG93TGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL+aOp+WItuiPnOWNleWxleW8gOaUtue8qVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuZG9tLmRvY3VtZW50UGFuZWwuZmluZChcIiNwbGctbG9nby1mb2xkXCIpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwibGF5dWktaWNvbi1zaHJpbmstcmlnaHRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImxheXVpLWljb24tc2hyaW5rLXJpZ2h0XCIpLmFkZENsYXNzKFwibGF5dWktaWNvbi1zcHJlYWQtbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJwbGctb3Blbi1ob3ZlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImxheXVpLWljb24tc3ByZWFkLWxlZnRcIikuYWRkQ2xhc3MoXCJsYXl1aS1pY29uLXNocmluay1yaWdodFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJwbGctb3Blbi1ob3ZlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZG9tLm1ldW5Tb3JvbGwuZmluZChcIi5uYXYtbGFzdFwiKS5ob3ZlcihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVyU2hvd0xpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihfdGhpcy5kb20uYm9keU5hdi5maW5kKFwibGlcIikubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXNob3dcIiwgXCJzaG93LWNoaWxkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtc2hvd1wiLCBcIlwiKVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC5vbihcImNsaWNrXCIsIFwiW2RhdGEtdHlwZT0naG9vdC1jbGljayddXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy/pmLvmraLkuovku7blhpLms6FcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZSA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb2R1Y3QtYWxsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC50b2dnbGVDbGFzcyhcInNob3dMaXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwci1vcGVuXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkKGV2ZSkucGFyZW50cyhcIi5wci1sZWZ0XCIpLmxlbmd0aD4wfHxldmUubm9kZU5hbWUhPVwiQVwiKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggZXZlLnBhcmVudE5vZGUuY2xhc3NOYW1lID09IFwibGF5dWktbGF5ZXItc2V0d2luXCIpeyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVyU2hvd0xpc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldW5Ub3AgPSBfdGhpcy5tZXVuVG9wT2JqKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc0l0ZW0gPSAkKGV2ZSkucGFyZW50cyhcIi5zLWl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhpc0hyZWYgPSBzSXRlbS5hdHRyKFwibWVudS1pZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ID0gJChcIi5wci1tZXVuZ3JvdXAtbGlzdFwiKS5maW5kKFwiLmxpc3QtaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNJdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpWzBdLmlkID09IHRoaXNIcmVmID8gJCh0aGlzKS5hZGRDbGFzcyhcInNlbGVjdFwiKSA6ICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzZWxlY3RcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWV1blRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoa2V5KSA9PSB0aGlzSHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnByLWxlZnRcIikuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG1ldW5Ub3Bba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5hdi1sYXN0XCI6ICAgICAgLy/ngrnkuIDnuqfoj5zljZXliqDovb3kuoznuqfoj5zljZVcclxuICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50cyA9ICQoZXZlKS5wYXJlbnRzKFwiLnMtaXRlbVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51aWQgPSBwYXJlbnRzLmF0dHIoXCJtZW51LWlkXCIpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbWVudWlkKSByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVhZj1Cb29sZWFuKF90aGlzLm1ldW5QYW5lbFRoaXMuZ2V0RGF0YS5tYXBBbGxbbWVudWlkXS5sZWFmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC5maW5kKFwiLm5hdi1sYXN0XCIpLmF0dHIoXCJkYXRhLXNob3dcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlclNob3dMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoJChldmUpLnBhcmVudHMoXCIjc2lkZWJhclwiKS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRvbS5tZXVuZ3JvdXBMaXN0LmZpbmQoXCJhW21lbnUtaWQ9J1wiKyBtZW51aWQgKyBcIiddXCIpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobGVhZil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRvbS5tZXVuU29yb2xsLmZpbmQoXCIubmF2LWxhc3RcIikuYXR0cihcImRhdGEtc2hvd1wiLCBcInNob3ctY2hpbGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHZhciB0YWJBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBkYXRlQ2hpbGRNZXVuOiBmdW5jdGlvbiAocGlkLCBtaWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGlkID0gcGlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhck5hdiA9ICQoXCJbbWVudS1pZD1cIiArIHBpZCArIFwiXVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJOYXYuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICBcclxuICAgICAgICAgICAgICAgIHZhciBfZ2V0RGF0YSA9IF90aGlzLm1ldW5QYW5lbFRoaXMuZ2V0RGF0YTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRvbS5ib2R5TmF2LmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChwaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfZ2V0RGF0YS5tYXBBbGxbcGlkXS5sZWFmJiZfZ2V0RGF0YS5tYXBBbGxbbWlkXS5wYXJlbnRNZW51SWQ9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudERhdGEgPSBfZ2V0RGF0YS5wYXJlbnREYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudERhdGFbcGlkXSAmJiBwYXJlbnREYXRhW3BpZF0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2xpQ2xhc3M9XCJpdGVtIGgtbGlua1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWlkKSB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5tZW51SWQgPT0gbWlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGlDbGFzcz1cIml0ZW0gaC1saW5rIGFjdGl2ZS10aGlzIGl0ZW1lZHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9saSA9ICQoXCI8bGk+XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjpvbGlDbGFzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYSA9ICQoXCI8YT5cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJocmVmXCI6IGl0ZW0ucGF0aCB8fCBcImphdmFzY3JpcHQ6O1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZW51LWlkXCI6IGl0ZW0ubWVudUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsZWFmXCI6IGl0ZW0ubGVhZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGV2ZWxcIjogaXRlbS5sZXZlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogaXRlbS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyZW50TWVudUlkXCI6IGl0ZW0ucGFyZW50TWVudUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50ZXh0KGl0ZW0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGkuYXBwZW5kKG9hKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtLmxlYWYgJiYgcGFyZW50RGF0YVtpdGVtLnBhcmVudE1lbnVJZF0gJiYgcGFyZW50RGF0YVtpdGVtLnBhcmVudE1lbnVJZF0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hdmNoaWxkID0gJzxkbCBjbGFzcz1cIm5hdi1jaGlsZFwiPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnREYXRhW2l0ZW0ubWVudUlkXSAmJiBwYXJlbnREYXRhW2l0ZW0ubWVudUlkXS5mb3JFYWNoKGZ1bmN0aW9uIChjaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmNoaWxkICs9IGA8ZGQgY2xhc3M9ICR7KG1pZCAmJiBjaXRlbS5tZW51SWQgPT0gbWlkKSA/IFwiYWN0aXZlLXRoaXNcIiA6IFwiXCJ9ID48YSBocmVmPSR7Y2l0ZW0ucGF0aCB8fCBcImphdmFzY3JpcHQ6O1wifSBsZWFmPSR7Y2l0ZW0ubGVhZn0gXHJcbm1haW4taWQ9JHtpdGVtLnBhcmVudE1lbnVJZH0gcGFyZW50TWVudUlkPSR7Y2l0ZW0ucGFyZW50TWVudUlkfSBtZW51LWlkPSR7Y2l0ZW0ubWVudUlkfT4ke2NpdGVtLm5hbWV9PC9hPjwvZGQ+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2Y2hpbGQgKz0gXCI8L2RsPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2EuYXBwZW5kKGA8aSBjbGFzcz1cInJpZ2h0LW1vdmVyIGxheXVpLWljb24gbGF5dWktaWNvbi1yaWdodFwiPjwvaT5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9saS5hcHBlbmQobmF2Y2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9saS5maW5kKFwiZGRcIikuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoaXRlbSkuYXR0cihcImNsYXNzXCIpID09IFwiYWN0aXZlLXRoaXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xpLmFkZENsYXNzKFwiYWN0aXZlLXRoaXNcIikuYWRkQ2xhc3MoXCJpdGVtZWRzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9saS5maW5kKFwiLm5hdi1jaGlsZFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20uYm9keU5hdi5hcHBlbmQob2xpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXRQYW5lbDogZnVuY3Rpb24gKG1ldW5QYW5lbFRoaXMsIG9wZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5tZXVuUGFuZWxUaGlzID0gbWV1blBhbmVsVGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBfZ2V0RGF0YSA9IF90aGlzLm1ldW5QYW5lbFRoaXMuZ2V0RGF0YTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMub3BlcyA9IG9wZXM7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kb2N1bWVudFBhbmVsID0gX3RoaXMudGVtcGxhdGUoX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmRvY3VtZW50UGFuZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9tID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudFBhbmVsOiBfdGhpcy5kb2N1bWVudFBhbmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXVuU29yb2xsOiBfdGhpcy5kb2N1bWVudFBhbmVsLmZpbmQoXCIjbWV1blNvcm9sbFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keU5hdjogX3RoaXMuZG9jdW1lbnRQYW5lbC5maW5kKFwiLmJvZHktbmF2XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXVuZ3JvdXBMaXN0OiBfdGhpcy5kb2N1bWVudFBhbmVsLmZpbmQoXCIucHItbWV1bmdyb3VwLWxpc3RcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByTGVmdDogX3RoaXMuZG9jdW1lbnRQYW5lbC5maW5kKFwiLnByLWxlZnRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0YWJsaTogJChcIi5sYXl1aS10YWItdGl0bGUgbGlcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRuYXZfaG92ZXJfY2hpbGQ6IF90aGlzLmRvY3VtZW50UGFuZWwuZmluZChcIi5uYXYtaG92ZXItY2hpbGRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldE9wZW5BbGwoX2dldERhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy/kuovku7bms6jlhoxcclxuICAgICAgICAgICAgICAgIF90aGlzLkV2ZW50SGFubGRlcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmRvY3VtZW50UGFuZWxcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBnZXRGdW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDbGFzc01haW47XHJcbiAgICAgICAgfTtcclxuICAgICAgICBfdGhpcy5nZXRGdW4gPSBnZXRGdW4oKTtcclxuICAgICAgICB2YXIgY29uZmlnPXtcclxuICAgICAgICAgICAgdXJsOm51bGwsXHJcbiAgICAgICAgICAgIHJvdXRlOmZhbHNlLFxyXG4gICAgICAgICAgICBtZW51Q2xpY2s6bnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ojrflj5bmlbDmja7lhaXlj6NcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCBjb25maWcsIF90aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICBfdGhpcy5pbml0KF90aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICBfdGhpcy5lbGUgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMgPSBhcmd1bWVudHNbMV07XHJcbiAgICAgICAgICAgIF90aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCBjb25maWcsIF90aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICBfdGhpcy5pbml0KF90aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgX3RoaXMucmVuZGVyVG8oX3RoaXMuZWxlKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIHBsZ1NpZGViYXIucHJvdG90eXBlLmNvbmZpZyA9IHtcclxuICAgICAgICBpc1RyaWdnZXI6IGZhbHNlLFxyXG4gICAgICAgIHVybDogXCJcIixcclxuICAgICAgICBsb2dvOiBudWxsLFxyXG5cclxuICAgIH07XHJcblxyXG4gICAgcGxnU2lkZWJhci5wcm90b3R5cGUuc2V0TWFwRGF0YSA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICB2YXIgY2xvc2VMb2FkPWxvYWRpbmcoKTtcclxuXHJcbiAgICAgICAgdmFyIGRhdGFBbGwsIG1hcEFsbCA9IG51bGwsXHJcbiAgICAgICAgICAgIHBhcmVudERhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBtYXBkYXRhKGRhdGFBbGwpIHtcclxuICAgICAgICAgICAvKiAgbGF5ZXIubG9hZCgwLCB7XHJcbiAgICAgICAgICAgICAgICBzaGFkZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTsgKi9cclxuICAgICAgICAgICAgbGV0IG1hcCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZGF0YUFsbC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghbWFwW2l0ZW0ucGFyZW50TWVudUlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcFtpdGVtLnBhcmVudE1lbnVJZF0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1hcFtpdGVtLnBhcmVudE1lbnVJZF0ucHVzaChpdGVtKVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtYXBBbGwgPSB7fTtcclxuICAgIC8vICAgIHZhciB0b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpO1xyXG4gICAgICAgIFByb2xvZy5zeW5jQWpheChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgLyogICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgKi9cclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUFsbCA9IHJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQWxsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uUFlfY29kZSA9IHBpbnlpbi5tYWtlUHkoaXRlbS5uYW1lKVswXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RGF0YSA9IG1hcGRhdGEoZGF0YUFsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBbGwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwQWxsW2l0ZW0ubWVudUlkXSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gIGNsb3NlTG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIubXNnKFwi5pWw5o2u5Yqg6L295aSx6LSlIVwiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIGNsb3NlTG9hZCgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGFBbGw6IGRhdGFBbGwsXHJcbiAgICAgICAgICAgIG1hcEFsbDogbWFwQWxsLFxyXG4gICAgICAgICAgICBwYXJlbnREYXRhOiBwYXJlbnREYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBcclxuXHJcbiAvKiAgICB2YXIgY2xvc2VMb2FkPSBsb2FkaW5nKCk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNsb3NlTG9hZCgpXHJcbiAgICAgIC8vICBsYXllci5jbG9zZShjbG9zZUxvYWQpXHJcbiAgICB9LDIwMDApICovXHJcblxyXG4gICAgcGxnU2lkZWJhci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgX2NsYXNzID0gdGhpcy5nZXRGdW47XHJcbiAgICAgICAgaWYgKHR5cGVvZiBfdGhpcy5vcHRpb25zID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm9wdHMgPSAkLmV4dGVuZCh0cnVlLCBfdGhpcy5jb25maWcsIF90aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0cy51cmwgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RGF0YSA9IF90aGlzLnNldE1hcERhdGEoX3RoaXMub3B0cy51cmwpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RWxlbWVudCA9IF9jbGFzcy5pbml0UGFuZWwoX3RoaXMsIF90aGlzLm9wdHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgX3RoaXMub3B0cy5tZW51Q2xpY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2xhc3MuY2xpY2tDaGlsZChfdGhpcy5vcHRzLm1lbnVDbGljaylcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF9jbGFzcy5jbGlja0NoaWxkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzXHJcblxyXG5cclxuICAgIH07XHJcbiAgICAvL+eGj+afk+aooeadv+WIsOiKgueCuVxyXG4gICAgcGxnU2lkZWJhci5wcm90b3R5cGUucmVuZGVyVG8gPSBmdW5jdGlvbiAoZG9tSWQpIHtcclxuICAgICBcclxuICAgICAgICB2YXIgZG9jdW1lbnRQYW5lbCA9IHRoaXMuZ2V0RnVuLmRvY3VtZW50UGFuZWw7XHJcbiAgICAgICAgJChcIiNcIiArIGRvbUlkKS5hcHBlbmQoZG9jdW1lbnRQYW5lbCk7XHJcbiBcclxuICAgICAgICBpZiAodGhpcy5vcHRzLmlzVHJpZ2dlcikge1xyXG4gICAgICAgICAgICB2YXIgbWVudWlkID0gJChcIiNcIiArIGRvbUlkKS5maW5kKFwiLnNpZGViYXIgbGk6Zmlyc3QtY2hpbGRcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIikuYXR0cihcIm1lbnUtaWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RnVuLnVwZGF0ZUNoaWxkTWV1bihtZW51aWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB3aW5kb3cuUGxnU2lkZUFjY29yZGlvbiA9IHBsZ1NpZGViYXI7XHJcblxyXG4gICAgJC5mbi5pbml0UGxnU2lkZUFjY29yZGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgIC8qICB2YXIgY2xvc2VMb2FkPSBsb2FkaW5nKCk7ICovXHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgcGxnU2lkZWJhcih0aGlzLCBvcHRpb25zKTtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbn0pKGpRdWVyeSk7IiwiO1xyXG4oZnVuY3Rpb24gKCQpIHtcclxuXHJcblxyXG4gICAgdmFyIHN0ckNoaW5lc2VGaXJzdFBZID0gXCJZRFlRU1hNV1pTU1hKQllNR0NDWlFQU1NRQllDRFNDRFFMRFlMWUJTU0pHWVpaSkpGS0NDTFpESFdEV1pKTEpQRllZTldKSlRNWUhaV1pIRkxaUFBRSEdTQ1lZWU5KUVlYWEdKSEhTRFNKTktLVE1PTUxDUlhZUFNOUVNFQ0NRWkdHTExZSkxNWVpaU0VDWUtZWUhRV0pTU0dHWVhZWllKV1dLREpIWUNITVlYSlRMWEpZUUJZWFpMRFdSREpSV1lTUkxEWkpQQ0JaSkpCUkNGVExFQ1pTVFpGWFhaSFRSUUhZQkRMWUNaU1NZTU1SRk1ZUVpQV1dKSllGQ1JXRkRGWlFQWUREV1lYS1lKQVdKRkZYWVBTRlRaWUhIWVpZU1dDSllYU0NMQ1hYV1paWE5CR05OWEJYTFpTWlNCU0dQWVNZWkRITURaQlFCWkNXRFpaWVlUWkhCVFNZWUJaR05UTlhRWVdRU0tCUEhITFhHWUJGTUpFQkpISEdRVEpDWVNYU1RLWkhMWUNLR0xZU01aWFlBTE1FTERDQ1hHWllSSlhTRExUWVpDUUtDTk5KV0hKVFpaQ1FMSlNUU1RCTlhCVFlYQ0VRWEdLV0pZRkxaUUxZSFlYU1BTRlhMTVBCWVNYWFhZREpDWllMTExTSlhGSEpYUEpCVEZGWUFCWVhCSFpaQkpZWkxXTENaR0dCVFNTTURUSlpYUFRIWVFUR0xKU0NRRlpLSlpKUU5MWldMU0xIRFpCV0pOQ0paWVpTUVFZQ1FZUlpDSkpXWUJSVFdQWUZUV0VYQ1NLRFpDVEJaSFlaWllZSlhaQ0ZGWlpNSllYWFNEWlpPVFRCWkxRV0ZDS1NaU1hGWVJMTllKTUJEVEhKWFNRUUNDU0JYWVlUU1lGQlhEWlRHQkNOU0xDWVpaUFNBWllaWlNDSkNTSFpRWURYTEJQSkxMTVFYVFlEWlhTUUpUWlBYTENHTFFUWldKQkhDVFNZSlNGWFlFSkpUTEJHWFNYSk1ZSlFRUEZaQVNZSk5UWURKWEtKQ0RKU1pDQkFSVERDTFlKUU1XTlFOQ0xMTEtCWUJaWlNZSFFRTFRXTENDWFRYTExaTlRZTE5FV1laWVhDWlhYR1JLUk1UQ05ETkpUU1lZU1NEUURHSFNEQkpHSFJXUlFMWUJHTFhITEdUR1hCUUpEWlBZSlNKWUpDVE1STllNR1JaSkNaR0pNWk1HWE1QUllYS0pOWU1TR01aSllNS01GWE1MRFRHRkJIQ0pIS1lMUEZNRFhMUUpKU01UUUdaU0pMUURMREdKWUNBTENNWkNTREpMTE5YREpGRkZGSkNaRk1aRkZQRktIS0dEUFNYS1RBQ0pESEhaRERDUlJDRlFZSktRQ0NXSkRYSFdKTFlMTFpHQ0ZDUURTTUxaUEJKSlBMU0JDSkdHRENLS0RFWlNRQ0NLSkdDR0tESlRKRExaWUNYS0xRU0NHSkNMVEZQQ1FDWkdXUEpEUVlaSkpCWUpIU0pEWldHRlNKR1pLUUNDWkxMUFNQS0pHUUpIWlpMSlBMR0pHSkpUSEpKWUpaQ1pNTFpMWVFCR0pXTUxKS1haRFpOSlFTWVpNTEpMTEpLWVdYTUtKTEhTS0pHQk1DTFlZTUtYSlFMQk1MTEtNRFhYS1dZWFlTTE1MUFNKUVFKUVhZWEZKVEpEWE1YWExMQ1hRQlNZSkJHV1lNQkdHQkNZWFBKWUdQRVBGR0RKR0JIQk5TUUpZWkpLSktIWFFGR1FaS0ZIWUdLSERLTExTREpRWFBRWUtZQk5RU1hRTlNaU1dIQlNYV0hYV0JaWlhETU5TSkJTQktCQlpLTFlMWEdXWERSV1lRWk1ZV1NKUUxDSlhYSlhLSkVRWFNDWUVUTFpITFlZWVNEWlBBUVlaQ01UTFNIVFpDRllaWVhZTEpTRENKUUFHWVNMQ1FMWVlZU0hNUlFRS0xEWFpTQ1NTU1lEWUNKWVNGU0pCRlJTU1pRU0JYWFBYSllTRFJDS0dKTEdES1pKWkJES1RDU1lRUFlIU1RDTERKREhNWE1DR1hZWkhKRERUTUhMVFhaWFlMWU1PSFlKQ0xUWUZCUVFYUEZCREZISFRLU1FIWllZV0NOWFhDUldIT1dHWUpMRUdXRFFDV0dGSllDU05UTVlUT0xCWUdXUVdFU0pQV05NTFJZRFpTWlRYWVFQWkdDV1hITkdQWVhTSE1ZUUpYWlREUFBCRllIWkhUSllGRFpXS0dLWkJMRE5UU1hIUUVFR1paWUxaTU1aWUpaR1haWEtIS1NUWE5YWFdZTFlBUFNUSFhEV0haWU1QWEFHS1lEWEJITkhYS0RQSk5NWUhZTFBNR09DU0xOWkhLWFhMUFpaTEJNTFNGQkhIR1lHWVlHR0JIU0NZQVFUWVdMWFRaUUNFWllEUURRTU1IVEtMTFNaSExTSlpXRllIUVNXU0NXTFFBWllOWVRMU1hUSEFaTktaWlNaWkxBWFhaV1dDVEdRUVRERFlaVENDSFlRWkZMWFBTTFpZR1BaU1pOR0xORFFUQkRMWEdUQ1RBSkRLWVdOU1laTEpISFpaQ1dOWVlaWVdNSFlDSEhZWEhKS1pXU1hIWllYTFlTS1FZU1BTTFlaV01ZUFBLQllHTEtaSFRZWEFYUVNZU0hYQVNNQ0hLRFNDUlNXSlBXWFNHWkpMV1dTQ0hTSkhTUU5IQ1NFR05EQVFUQkFBTFpaTVNTVERRSkNKS1RTQ0pBWFBMR0dYSEhHWFhaQ1hQRE1NSExER1RZQllTSk1YSE1SQ1BYWEpaQ0taWFNITUxRWFhUVEhYV1pGS0hDQ1pEWVRDSllYUUhMWERIWVBKUVhZTFNZWURaT1pKTllYUUVaWVNRWUFZWFdZUERHWEREWFNQUFlaTkRMVFdSSFhZRFhaWkpIVENYTUNaTEhQWVlZWU1IWkxMSE5YTVlMTExNRENQUFhITVhES1lDWVJETFRYSkNISFpaWFpMQ0NMWUxOWlNIWkpaWkxOTlJMV0hZUVNOSkhYWU5UVFRLWUpQWUNISFlFR0tDVFRXTEdRUkxHR1RHVFlHWUhQWUhZTFFZUUdDV1lRS1BZWVlUVFRUTEhZSExMVFlUVFNQTEtZWlhHWldHUFlEU1NaWkRRWFNLQ1FOTUpKWlpCWFlRTUpSVEZGQlRLSFpLQlhMSkpLRFhKVExCV0ZaUFBUS1FUWlRHUERHTlRQSllGQUxRTUtHWEJEQ0xaRkhaQ0xMTExBRFBNWERKSExDQ0xHWUhEWkZHWURER0NZWUZHWURYS1NTRUJESFlLREtES0hOQVhYWUJQQllZSFhaUUdBRkZRWUpYRE1MSkNTUVpMTFBDSEJTWEdKWU5EWUJZUVNQWldKTFpLU0REVEFDVEJYWkRZWllQSlpRU0pOS0tUS05KREpHWVlQR1RMRllRS0FTRE5UQ1lIQkxXRFpIQkJZRFdKUllHS1pZSEVZWUZKTVNEVFlGWkpKSEdDWFBMWEhMRFdYWEpLWVRDWUtTU1NNVFdDVFRRWkxQQlNaRFpXWlhHWkFHWUtUWVdYTEhMU1BCQ0xMT1FNTVpTU0xDTUJKQ1NaWktZRENaSkdRUURTTUNZVFpRUUxXWlFaWFNTRlBUVEZRTUREWkRTSERURFdGSFREWVpKWVFKUUtZUEJESllZWFRMSkhEUlFYWFhIQVlESFJKTEtMWVRXSExMUkxMUkNYWUxCV1NSU1paU1lNS1paSEhLWUhYS1NNRFNZRFlDSlBCWkJTUUxGQ1hYWE5YS1hXWVdTRFpZUU9HR1FNTVlIQ0RaVFRGSllZQkdTVFRUWUJZS0pESEtZWEJFTEhUWVBKUU5GWEZEWUtaSFFLWkJZSlRaQlhIRkRYS0RBU1dUQVdBSkxEWUpTRkhCTEROTlROUUpUSk5DSFhGSlNSRldIWkZNRFJZSllKV1pQREpLWllKWU1QQ1laTllOWEZCWVRGWUZXWUdEQk5aWlpETllUWFpFTU1RQlNRRUhYRlpNQk1GTFpaU1JYWU1KR1NYV1pKU1BSWURKU0pHWEhKSkdMSkpZTlpaSlhIR1hLWU1MUFlZWUNYWVRXUVpTV0hXTFlSSkxQWFNMU1hNRlNXV0tMQ1ROWE5ZTlBTSlNaSERaRVBUWE1ZWVdYWVlTWVdMWEpRWlFYWkRDTEVFRUxNQ1BKUENMV0JYU1FIRldXVEZGSlROUUpISlFEWEhXTEJZWk5GSkxBTEtZWUpMRFhISFlDU1RZWVdOUkpZWFlXVFJNRFJRSFdRQ01GSkRZWk1ITVlZWEpXTVlaUVpYVExNUlNQV1dDSEFRQlhZR1pZUFhZWVJSQ0xNUFlNR0tTSlNaWVNSTVlKU05YVFBMTkJBUFBZUFlMWFlZWktZTkxEWllKWkNaTk5MTVpISEFSUU1QR1dRVFpNWFhNTExIR0RaWFlIWEtZWFlDSk1GRllZSEpGU0JTU1FMWFhORFlDQU5OTVRDSkNZUFJSTllUWVFOWVlNQk1TWE5ETFlMWVNMSlJMWFlTWFFNTExZWkxaSkpKS1laWkNTRkJaWFhNU1RCSkdOWFlaSExYTk1DV1NDWVpZRlpMWEJSTk5OWUxCTlJUR1pRWVNBVFNXUllIWUpaTVpESFpHWkRXWUJTU0NTS1hTWUhZVFhYR0NRR1haWlNIWVhKU0NSSE1LS0JYQ1pKWUpZTUtRSFpKRk5CSE1RSFlTTkpOWllCS05RTUNMR1FIV0xaTlpTV1hLSExKSFlZQlFMQkZDRFNYRExEU1BGWlBTS0pZWldaWFpERFhKU01NRUdKU0NTU01HQ0xYWEtZWVlMTllQV1dXR1lES1pKR0dHWkdHU1lDS05KV05KUENYQkpKVFFUSldEU1NQSlhaWE5aWFVNRUxQWEZTWFRMTFhDTEpYSkpMSlpYQ1RQU1dYTFlESExZUVJXSFNZQ1NRWVlCWUFZV0pKSlFGV1FDUVFDSlFHWEFMREJaWllKR0tHWFBMVFpZRlhKTFRQQURLWVFIUE1BVExDUERDS0JNVFhZQkhLTEVOWERMRUVHUURZTVNBV0haTUxKVFdZR1hMWVFaTEpFRVlZQlFRRkZOTFlYUkRTQ1RHSkdYWVlOS0xMWVFLQ0NUTEhKTFFNS0taR0NZWUdMTExKRFpHWURIWldYUFlTSkJaS0RaR1laWkhZV1lGUVlUWVpTWllFWlpMWU1ISkpIVFNNUVdZWkxLWVlXWkNTUktRWVRMVERYV0NUWUpLTFdTUVpXQkRDUVlOQ0pTUlNaSkxLQ0RDRFRMWlpaQUNRUVpaRERYWVBMWFpCUUpZTFpMTExRRERaUUpZSllKWllYTllZWU5ZSlhLWERBWldZUkRMSllZWVJKTFhMTERZWEpDWVdZV05RQ0NMREROWVlZTllDS0NaSFhYQ0NMR1pRSkdLV1BQQ1FRSllTQlpaWFlKU1FQWEpQWkJTQkRTRk5TRlBaWEhEV1pURFdQUFRGTFpaQlpETVlZUFFKUlNEWlNRWlNRWEJER0NQWlNXRFdDU1FaR01ESFpYTVdXRllCUERHUEhUTUpUSFpTTU1CR1pNQlpKQ0ZaV0ZaQkJaTVFDRk1CRE1DSlhMR1BOSkJCWEdZSFlZSkdQVFpHWk1RQlFUQ0dZWEpYTFdaS1lEUERZTUdDRlRQRlhZWlRaWERaWFRHS01UWUJCQ0xCSkFTS1lUU1NRWVlNU1pYRkpFV0xYTExTWkJRSkpKQUtMWUxYTFlDQ1RTWE1DV0ZLS0tCU1hMTExMSllYVFlMVEpZWVREUEpITkhOTktCWVFORlFZWVpCWVlFU1NFU1NHRFlIRkhXVENKQlNEWlpURkRNWEhDTkpaWU1RV1NSWUpEWkpRUERRQkJTVEpHR0ZCS0pCWFRHUUhOR1dKWEpHRExMVEhaSEhZWVlZWVlTWFdUWVlZQ0NCREJQWVBaWUNDWllKUFpZV0NCRExGV1pDV0pEWFhIWUhMSFdaWlhKVENaTENEUFhVSkNaWlpMWVhKSlRYUEhGWFdQWVdYWlBURFpaQkRaQ1lISkhNTFhCUVhTQllMUkRUR0pSUkNUVFRIWVRDWldNWEZZVFdXWkNXSldYSllXQ1NLWUJaU0NDVFpRTkhYTldYWEtIS0ZIVFNXT0NDSllCQ01QWlpZS0JOTlpQQlpISFpETFNZRERZVFlGSlBYWU5HRlhCWVFYQ0JIWENQU1hUWVpETUtZU05YU1hMSEtNWlhMWUhESEtXSFhYU1NLUVlISENKWVhHTEhaWENTTkhFS0RUR1pYUVlQS0RIRVhUWUtDTllNWVlZUEtRWVlZS1haTFRISlFUQllRSFhCTVlIU1FDS1dXWUxMSENZWUxOTkVRWFFXTUNGQkRDQ01MSkdHWERRS1RMWEtHTlFDREdaSldZSkpMWUhIUVRUVE5XQ0hNWENYV0hXU1pKWURKQ0NEQlFDREdETllYWlRIQ1FSWENCSFpUUUNCWFdHUVdZWUJYSE1CWU1ZUVRZRVhNUUtZQVFZUkdZWlNMRllLS1FIWVNTUVlTSEpHSkNOWEtaWUNYU0JYWVhIWVlMU1RZQ1hRVEhZU01HU0NQTU1HQ0NDQ0NNVFpUQVNNR1FaSkhLTE9TUVlMU1dUTVhTWVFLRFpMSlFRWVBMU1lDWlRDUVFQQkJRSlpDTFBLSFFaWVlYWERURERUU0pDWEZGTExDSFFYTUpMV0NKQ1hUU1BZQ1hORFRKU0hKV1hEUVFKU0tYWUFNWUxTSkhNTEFMWUtYQ1lZRE1OTURRTVhNQ1pOTkNZQlpLS1lGTE1DSENNTEhYUkNKSkhTWUxOTVRKWkdaR1lXSlhTUlhDV0pHSlFIUVpEUUpEQ0pKWktKS0dEWlFHSkpZSllMWFpYWENEUUhISEVZVE1ITEZTQkRKU1lZU0hGWVNUQ1pRTFBCRFJGUlpUWllLWVdIU1pZUUtXRFFaUktNU1lOQkNSWFFCSllGQVpQWlpFRFpDSllXQkNKV0hZSkJRU1pZV1JZU1pQVERLWlBGUEJOWlRLTFFZSEJCWlBOUFBUWVpaWUJRTllEQ1BKTU1DWUNRTUNZRlpaRENNTkxGUEJQTE5HUUpUQlRUTkpaUFpCQlpOSktMSlFZTE5CWlFIS1NKWk5HR1FTWlpLWVhTSFBaU05CQ0daS0REWlFBTlpISktEUlRMWkxTV0pMSlpMWVdUSk5ESlpKSFhZQVlOQ0JHVFpDU1NRTU5KUEpZVFlTV1haRktXSlFUS0hUWlBMQkhTTkpaU1laQldaWlpaTFNZTFNCSkhEV1dRUFNMTU1GQkpEV0FRWVpUQ0pUQk5OV1pYUVhDRFNMUUdEU0RQRFpISlRRUVBTV0xZWUpaTEdZWFlaTENUQ0JKVEtUWUNaSlRRS0JTSkxHTUdaRE1DU0dQWU5KWllRWVlLTlhSUFdTWlhNVE5DU1paWVhZQllIWVpBWFlXUUNKVExMQ0tKSlRKSEdEWERYWVFZWlpCWVdETFdRQ0dMWkdKR1FSUVpDWlNTQkNSUENTS1lEWk5YSlNRR1hTU0pNWUROU1RaVFBCRExUS1pXWFFXUVRaRVhOUUNaR1dFWktTU0JZQlJUU1NTTENDR0JQU1pRU1pMQ0NHTExMWlhIWlFUSENaTVFHWVpRWk5NQ09DU1pKTU1aU1FQSllHUUxKWUpQUExEWFJHWllYQ0NTWEhTSEdUWk5MWldaS0pDWFRDRkNKWExCTVFCQ1paV1BRRE5IWExKQ1RIWVpMR1lMTkxTWlpQQ1hEU0NRUUhKUUtTWFpQQkFKWUVNU01KVFpEWExDSllSWVlOV0pCTkdaWlRNSlhMVEJTTFlSWlBZTFNTQ05YUEhMTEhZTExRUVpRTFhZTVJTWUNYWkxNTUNaTFRaU0RXVEpKTExOWkdHUVhQRlNLWUdZR0hCRlpQREtNV0dIQ1hNU0dEWEpNQ0paRFlDQUJYSkRMTkJDRFFZR1NLWURRVFhESkpZWE1TWlFBWkRaRlNMUVhZSlNKWllMQlRYWFdYUVFaQkpaVUZCQkxZTFdEU0xKSFhKWVpKV1RESkNaRlFaUVpaRFpTWFpaUUxaQ0RaRkpIWVNQWU1QUVpNTFBQTEZGWEpKTlpaWUxTSkVZUVpGUEZaS1NZV0pKSkhSREpaWlhUWFhHTEdIWURYQ1NLWVNXTU1aQ1dZQkFaQkpLU0hGSEpDWE1IRlFIWVhYWVpGVFNKWVpGWFlYUFpMQ0hNWk1CWEhaWlNYWUZZTU5DV0RBQkFaTFhLVENTSEhYS1hKSlpKU1RIWUdYU1hZWUhISEpXWEtaWFNTQlpaV0hISENXVFpaWlBKWFNOWFFRSkdaWVpZV0xMQ1dYWkZYWFlYWUhYTUtZWVNXU1FNTkxOQVlDWVNQTUpLSFdDUUhZTEFKSk1aWEhNTUNOWkhCSFhDTFhUSlBMVFhZSkhEWVlMVFRYRlNaSFlYWFNKQkpZQVlSU01YWVBMQ0tEVVlITFhSTE5MTFNUWVpZWVFZR1lISFNDQ1NNWkNUWlFYS1lRRlBZWVJQRkZMS1FVTlRTWkxMWk1XV1RDUVFZWldUTExNTE1QV01CWlNTVFpSQlBERFRMUUpKQlhaQ1NSWlFRWUdXQ1NYRldaTFhDQ1JTWkRaTUNZR0dEWlFTR1RKU1dMSk1ZTU1aWUhGQkpER1lYQ0NQU0hYTlpDU0JTSllKR0pNUFBXQUZGWUZOWEhZWlhaWUxSRU1aR1pDWVpTU1pETExKQ1NRRk5YWktQVFhaR1hKSkdGTVlZWVNOQlRZTEJOTEhQRlpEQ1lGQk1HUVJSU1NTWlhZU0dUWlJOWURaWkNER1BKQUZKRlpLTlpCTENaU1pQU0dDWUNKU1pMTUxSU1pCWlpMRExTTExZU1hTUVpRTFlYWkxTS0tCUlhCUkJaQ1lDWFpaWkVFWUZHS0xaTFlZSEdaU0daTEZKSEdUR1dLUkFBSllaS1pRVFNTSEpKWERDWVpVWUpMWllSWkRRUUhHSlpYU1NaQllLSlBCRlJUSlhMTEZRV0pIWUxRVFlNQkxQWkRYVFpZR0JESFpaUkJHWEhXTkpUSlhMS1NDRlNNV0xTRFFZU0pUWEtaU0NGV0pMQlhGVFpMTEpaTExRQkxTUU1RUUNHQ1pGUEJQSFpDWkpMUFlZR0dEVEdXRENGQ1pRWVlZUVlTU0NMWFpTS0xaWlpHRkZDUU5XR0xIUVlaSkpDWkxRWlpZSlBKWlpCUERDQ01ISkdYRFFER0RMWlFNRkdQU1lUU0RZRldXREpaSllTWFlZQ1pDWUhaV1BCWUtYUllMWUJIS0pLU0ZYVFpKTU1DS0hMTFROWVlNU1lYWVpQWUpRWUNTWUNXTVRKSktRWVJITExRWFBTR1RMWVlDTEpTQ1BYSllaRk5NTFJHSkpUWVpCWFlaTVNKWUpISEZaUU1TWVhSU1pDV1RMUlRRWlNTVEtYR1FLR1NQVEdDWk5KU0pDUUNYSE1YR0daVFFZREpLWkRMQlpTWEpMSFlRR0dHVEhRU1pQWUhKSEhHWVlHS0dHQ1dKWlpZTENaTFhRU0ZUR1pTTExMTUxKU0tDVEJMTFpaU1pNTU5ZVFBaU1hRSEpDSllRWFlaWFpRWkNQU0hLWlpZU1hDREZHTVdRUkxMUVhSRlpUTFlTVENUTUpDWEpKWEhKTlhUTlJaVFpGUVlIUUdMTEdDWFNaU0pESkxKQ1lEU0pUTE5ZWEhTWlhDR0paWVFQWUxGSERKU0JQQ0NaSEpKSlFaSlFEWUJTU0xMQ01ZVFRNUVRCSEpRTk5ZR0tZUlFZUU1aR0NKS1BEQ0dNWVpIUUxMU0xMQ0xNSE9MWkdEWVlGWlNMSkNRWkxZTFpRSkVTSE5ZTExKWEdKWExZU1lZWVhOQlpMSlNTWkNRUUNKWUxMWkxUSllMTFpMTEJOWUxHUUNIWFlZWE9YQ1hRS1lKWFhYWUtMWFNYWFlRWENZS1FYUUNTR1lYWFlRWFlHWVRRT0hYSFhQWVhYWFVMQ1lFWUNIWlpDQldRQkJXSlFaU0NTWlNTTFpZTEtERVNKWldNWU1DWVRTRFNYWFNDSlBRUVNRWUxZWVpZQ01ESkRaWVdDQlRKU1lESktDWURESkxCREpKU09EWllTWVhRUVlYREhIR1FRWVFIRFlYV0dNTU1BSkRZQkJCUFBCQ01VVVBMSlpTTVRYRVJYSk1IUU5VVFBKRENCU1NNU1NTVEtKVFNTTU1UUkNQTFpTWk1MUURTRE1KTVFQTlFEWENGWU5CRlNEUVhZWEhZQVlLUVlERExRWVlZU1NaQllEU0xOVEZRVFpRUFpNQ0hESENaQ1dGRFhUTVlRU1BIUVlZWFNSR0pDV1RKVFpaUU1HV0pKVEpIVFFKQkJIV1pQWFhIWVFGWFhRWVdZWUhZU0NEWURISFFNTk1UTVdDUEJTWlBQWlpHTE1aRk9MTENGV0hNTVNKWlRUREhaWllGRllUWlpHWllTS1lKWFFZSlpRQkhNQlpaTFlHSEdGTVNIUFpGWlNOQ0xQQlFTTkpYWlNMWFhGUE1UWUpZR0JYTExETFhQWkpZWkpZSEhaQ1lXSEpZTFNKRVhGU1paWVdYS1pKTFVZRFRNTFlNUUpQV1hZSFhTS1RRSkVaUlBYWFpISE1IV1FQV1FMWUpKUUpKWlNaQ1BISkxDSEhOWEpMUVdaSkhCTVpZWEJESEhZUFpMSExITEdGV0xDSFlZVExISlhDSk1TQ1BYU1RLUE5IUVhTUlRZWFhURVNZSkNUTFNTTFNURExMTFdXWUhESFJKWlNGR1hUU1lDWllOWUhUREhXSlNMSFRaRFFESlpYWFFIR1lMVFpQSENTUUZDTE5KVENMWlBGU1RQRFlOWUxHTUpMTFlDUUhZU1NIQ0hZTEhRWVFUTVpZUEJZV1JGUVlLUVNZU0xaRFFKTVBYWVlTU1JIWkpOWVdUUURGWkJXV1RXV1JYQ1dIR1lIWE1LTVlZWVFNU01aSE5HQ0VQTUxRUU1UQ1dDVE1NUFhKUEpKSEZYWVlaU1haSFRZQk1TVFNZSlRUUVFRWVlMSFlOUFlRWkxDWVpIWldTTVlMS0ZKWExXR1hZUEpZVFlTWVhZTVpDS1RUV0xLU01aU1lMTVBXTFpXWFdRWlNTQVFTWVhZUkhTU05UU1JBUFhDUFdDTUdEWEhYWkRaWUZKSEdaVFRTQkpIR1laU1pZU01ZQ0xMTFhCVFlYSEJCWkpLU1NETUFMWEhZQ0ZZR01RWVBKWUNRWEpMTExKR1NMWkdRTFlDSkNDWk9UWVhNVE1UVExMV1RHUFhZTVpNS0xQU1paWlhIS1FZU1hDVFlKWllIWFNIWVhaS1hMWldQU1FQWUhKV1BKUFdYUVFZTFhTREhNUlNMWlpZWldUVENZWFlTWlpTSEJTQ0NTVFBMV1NTQ0pDSE5MQ0dDSFNTUEhZTEhGSEhYSlNYWUxMTllMU1pESFpYWUxTWExXWllLQ0xEWUFYWkNNRERZU1BKVFFKWkxOV1FQU1NTV0NUU1RTWkxCTE5YU01OWVlNSlFCUUhSWldUWVlEQ0hRTFhLUFpXQkdRWUJLRkNNWldQWkxMWVlMU1pZRFdIWFBTQkNNTEpCU0NHQkhYTFFIWVJMSlhZU1dYV1haU0xERkhMU0xZTkpMWllGTFlKWUNEUkpMRlNZWkZTTExDUVlRRkdKWUhZWFpMWUxNU1RESkNZSEJaTExOV0xYWFlHWVlIU01HREhYWEhITFpaSlpYQ1paWkNZUVpGTkdXUFlMQ1BLUFlZUE1DTFFLREdYWkdHV1FCRFhaWktaRkJYWExaWEpUUEpQVFRCWVRTWlpEV1NMQ0haSFNMVFlYSFFMSFlYWFhZWVpZU1dUWFpLSExYWlhaUFlIR0NIS0NGU1lIVVRKUkxYRkpYUFRaVFdIUExZWEZDUkhYU0hYS1lYWFlIWlFEWFFXVUxIWUhNSlRCRkxLSFRYQ1dISkZXSkNGUFFSWVFYQ1lZWVFZR1JQWVdTR1NVTkdXQ0hLWkRYWUZMWFhISkpCWVpXVFNYWE5DWUpKWU1TV1pKUVJNSFhaV0ZRU1lMWkpaR0JIWU5TTEJHVFRDU1lCWVhYV1hZSFhZWVhOU1FZWE1RWVdSR1lRTFhCQlpMSlNZTFBTWVRKWllIWVpBV0xST1JKTUtTQ1pKWFhYWVhDSERZWFJZWFhKRFRTUUZYTFlMVFNGRllYTE1UWUpNSlVZWVlYTFRaQ1NYUVpRSFpYTFlZWFpIRE5CUlhYWEpDVFlITEJSTE1CUkxMQVhLWUxMTEpMWVhYTFlDUllMQ0pUR0pDTVRMWkxMQ1laWlBaUENZQVdISkpGWUJEWVlaU01QQ0taRFFZUVBCUENKUERDWVpNRFBCQ1lZRFlDTk5QTE1UTUxSTUZNTUdXWVpCU0pHWUdTTVpRUVFaVFhNS1FXR1hMTFBKR1pCUUNESkpKRlBLSktDWEJMSk1TV01EVFFKWExETFBQQlhDV1JDUUZCRlFKQ1pBSFpHTVlLUEhZWUhaWUtOREtaTUJQSllYUFhZSExGUE5ZWUdYSkRCS1hOWEhKTVpKWFNUUlNUTERYU0taWVNZQlpYSkxYWVNMQlpZU0xIWEpQRlhQUU5CWUxMSlFLWUdaTUNZWlpZTUNDU0xDTEhaRldGV1lYWk1XU1hUWU5YSkhQWVlNQ1lTUE1IWVNNWURZU0hRWVpDSE1KSk1aQ0FBR0NGSkJCSFBMWVpZTFhYU0RKR1hESEtYWFRYWE5CSFJNTFlKU0xUWE1SSE5MWFFKWFlaTExZU1dRR0RMQkpIRENHSllRWUNNSFdGTUpZQk1CWUpZSldZTURQV0hYUUxEWUdQREZYWEJDR0pTUENLUlNTWVpKTVNMQlpaSkZMSkpKTEdYWkdZWFlYTFNaUVlYQkVYWVhIR0NYQlBMRFlIV0VUVFdXQ0pNQlRYQ0hYWVFYTExYRkxZWExMSkxTU0ZXRFBaU01ZSkNMTVdZVENaUENIUUVLQ1FCV0xDUVlEUExRUFBRWlFGSlFESkhZTU1DWFRYRFJNSldSSFhDSlpZTFFYRFlZTkhZWUhSU0xTUlNZV1daSllNVExUTExHVFFDSlpZQUJUQ0taQ0pZQ0NRTEpaUVhBTE1aWUhZV0xXRFhaWFFETExRU0hHUEpGSkxKSEpBQkNRWkRKR1RLSFNTVENZSkxQU1daTFhaWFJXR0xETFpSTFpYVEdTTExMTFpMWVhYV0dEWllHQkRQSFpQQlJMV1NYUUJQRkRXT0ZNV0hMWVBDQkpDQ0xETUJaUEJaWkxDWVFYTERPTVpCTFpXUERXWVlHRFNUVEhDU1FTQ0NSU1NTWVNMRllCRk5UWUpTWkRGTkRQREhEWlpNQkJMU0xDTVlGRkdUSkpRV0ZUTVRQSldGTkxCWkNNTUpUR0JEWkxRTFBZRkhZWU1KWUxTRENIRFpKV0pDQ1RMSkNMRFRMSkpDUEREU1FEU1NaWUJOREJKTEdHSlpYU1hOTFlDWUJKWFFZQ0JZTFpDRlpQUEdLQ1haRFpGWlRKSkZKU0pYWkJOWllKUVRUWUpZSFRZQ1pIWU1ESlhUVE1QWFNQTFpDRFdTTFNIWFlQWkdURk1MQ0pUWUNCUE1HREtXWUNZWkNEU1paWUhGTFlDVFlHV0hLSllZTFNKQ1hHWVdKQ0JMTENTTkREQlRaQlNDTFlaQ1paU1NRRExMTVFZWUhGU0xRTExYRlRZSEFCWEdXTllXWVlQTExTRExETExCSkNZWEpaTUxITEpEWFlZUVlURExMTEJVR0JGREZCQlFKWlpNRFBKSEdDTEdNSkpQR0FFSEhCV0NRWEFYSEhIWkNIWFlQSEpBWEhMUEhKUEdQWkpRQ1FaR0pKWlpVWkRNUVlZQlpaUEhZSFlCV0hBWllKSFlLRkdEUEZRU0RMWk1MSlhLWEdBTFhaREFHTE1ER1hNV1pRWVhYRFhYUEZETU1TU1lNUEZNRE1NS1hLU1laWVNIRFpLWFNZU01NWlpaTVNZRE5aWkNaWEZQTFNUTVpETk1YQ0tKTVpUWVlNWk1aWk1TWEhIRENaSkVNWFhLTEpTVExXTFNRTFlKWkxMWkpTU0RQUE1ITkxaSkNaWUhNWFhIR1pDSk1ESFhUS0dSTVhGV01DR01XS0RUS1NYUU1NTUZaWllES01TQ0xDTVBDR01IU1BYUVBaRFNTTENYS1lYVFdMV0pZQUhaSkdaUU1DU05YWVlNTVBNTEtKWE1ITE1MUU1YQ1RLWk1KUVlTWkpTWVNaSFNZSlpKQ0RBSlpZQlNEUUpaR1daUVFYRktETVNESkxGV0VIS1pRS0pQRVlQWllTWkNEV1lKRkZNWlpZTFRURFpaRUZNWkxCTlBQTFBMUEVQU1pBTExUWUxLQ0tRWktHRU5RTFdBR1lYWURQWExIU1hRUVdRQ1FYUUNMSFlYWE1MWUNDV0xZTVFZU0tHQ0hMQ0pOU1pLUFlaS0NRWlFMSlBETURaSExBU1hMQllEV1FMV0ROQlFDUllERFpUSllCS0JXU1pEWERUTlBKRFRDVFFERlhRUU1HTlhFQ0xUVEJLUFdTTENUWVFMUFdZWlpLTFBZR1pDUVFQTExLQ0NZTFBRTVpDWlFDTEpTTFFaREpYTERESFBaUURMSkpYWlFEWFlaUUtaTEpDWVFEWUpQUFlQUVlLSllSTVBDQllNQ1hLTExaTExGUVBZTExMTUJTR0xDWVNTTFJTWVNRVE1YWVhaUVpGRFpVWVNZWlRGRk1aWlNNWlFIWlNTQ0NNTFlYV1RQWkdYWkpHWkdTSlNHS0RESFRRR0daTExCSkRaTENCQ0hZWFlaSFpGWVdYWVpZTVNEQlpaWUpHVFNNVEZYUVlYUVNUREdTTE5YRExSWVpaTFJZWUxYUUhUWFNSVFpOR1pYQk5RUVpGTVlLTVpKQlpZTUtCUE5MWVpQQkxNQ05RWVpaWlNKWkhKQ1RaS0hZWlpKUkRZWkhOUFhHTEZaVExLR0pUQ1RTU1lMTEdaUlpCQlFaWktMUEtMQ1pZU1NVWVhCSkZQTkpaWlhDRFdYWllKWFpaREpKS0dHUlNSSktNU01aSkxTSllXUVNLWUhRSlNYUEpaWlpMU05TSFJOWVBaVFdDSEtMUFNSWkxaWFlKUVhRS1lTSllDWlRMUVpZQkJZQldaUFFEV1dZWkNZVEpDSlhDS0NXREtLWlhTR0tEWlhXV1lZSlFZWVRDWVRETExYV0tDWktLTENDTFpDUVFEWkxRTENTRlFDSFFIU0ZTTVFaWkxOQkpKWkJTSkhUU1pEWVNKUUpQRExaQ0RDV0pLSlpaTFBZQ0dNWldESkpCU0pRWlNZWllISFhKUEJKWURTU1hEWk5DR0xRTUJUU0ZTQlBEWkRMWk5GR0ZKR0ZTTVBYSlFMTUJMR1FDWVlYQlFLREpKUVlSRktaVEpESENaS0xCU0RaQ0ZKVFBMTEpHWEhZWFpDU1NaWlhTVEpZR0tHQ0tHWU9RWEpQTFpQQlBHVEdZSlpHSFpRWlpMQkpMU1FGWkdLUVFKWkdZQ1pCWlFUTERYUkpYQlNYWFBaWEhZWllDTFdEWEpKSFhNRkRaUEZaSFFIUU1RR0tTTFlIVFlDR0ZSWkdOUVhDTFBETEJaQ1NDWlFMTEpCTEhCWkNZUFpaUFBEWU1aWlNHWUhDS0NQWkpHU0xKTE5TQ0RTTERMWEJNU1RMRERGSk1LREpESFpMWlhMU1pRUFFQR0pMTFlCRFNaR1FMQlpMU0xLWVlIWlRUTlRKWVFUWlpQU1pRWlRMTEpUWVlMTFFMTFFZWlFMQkRaTFNMWVlaWU1ERlNaU05ITFhaTkNaUVpQQldTS1JGQlNZWk1USEJMR0pQTUNaWkxTVExYU0hUQ1NZWkxaQkxGRVFITFhGTENKTFlMSlFDQlpMWkpISFNTVEJSTUhYWkhKWkNMWEZOQkdYR1RRSkNaVE1TRlpLSk1TU05YTEpLQkhTSlhOVE5MWkROVExNU0pYR1pKWUpDWlhZSllKV1JXV1FOWlRORkpTWlBaU0haSkZZUkRKU0ZTWkpaQkpGWlFaWkhaTFhGWVNCWlFMWlNHWUZUWkRDU1pYWkpCUU1TWktKUkhZSlpDS01KS0hDSEdUWEtYUUdMWFBYRlhUUlRZTFhKWEhEVFNKWEhKWkpYWldaTENRU0JUWFdYR1hUWFhIWEZUU0RLRkpIWllKRkpYUlpTRExMTFRRU1FRWlFXWlhTWVFUV0dXQlpDR1pMTFlaQkNMTVFRVFpIWlhaWExKRlJNWVpGTFhZU1FYWEpLWFJNUURaRE1NWVlCU1FCSEdaTVdGV1hHTVhMWlBZWVRHWllDQ0RYWVpYWVdHU1lKWVpOQkhQWkpTUVNZWFNYUlRGWVpHUkhaVFhTWlpUSENCRkNMU1lYWkxaUU1aTE1QTE1YWkpYU0ZMQllaTVlRSFhKU1hSWFNRWlpaU1NMWUZSQ1pKUkNSWEhIWlhRWURZSFhTSkpIWkNYWkJUWU5TWVNYSkJRTFBYWlFQWU1MWFpLWVhMWENKTENZU1hYWlpMWERMTExKSllIWlhHWUpXS0pSV1lIQ1BTR05SWkxGWldGWlpOU1hHWEZMWlNYWlpaQkZDU1lKREJSSktSREhIR1hKTEpKVEdYSlhYU1RKVEpYTFlYUUZDU0dTV01TQkNUTFFaWldMWlpLWEpNTFRNSllIU0REQlhHWkhETEJNWUpGUlpGU0dDTFlKQlBNTFlTTVNYTFNaSlFRSEpaRlhHRlFGUUJQWFpHWVlRWEdaVENRV1lMVExHV1NHV0hSTEZTRkdaSk1HTUdCR1RKRlNZWlpHWllaQUZMU1NQTUxQRkxDV0JKWkNMSkpNWkxQSkpMWU1RRE1ZWVlGQkdZR1laTUxZWkRYUVlYUlFRUUhTWVlZUVhZTEpUWVhGU0ZTTExHTlFDWUhZQ1dGSENDQ0ZYUFlMWVBMTFpZWFhYWFhLUUhIWFNISlpDRlpTQ1pKWENQWldISEhISEFQWUxRQUxQUUFGWUhYRFlMVUtNWlFHR0dEREVTUk5OWkxUWkdDSFlQUFlTUUpKSENMTEpUT0xOSlBaTEpMSFlNSEVZRFlEU1FZQ0RESEdaVU5EWkNMWllaTExaTlROWVpHU0xIU0xQSkpCREdXWFBDRFVUSkNLTEtDTFdLTExDQVNTVEtaWkROUU5UVExZWVpTU1lTU1paUllMSlFLQ1FESEhDUlhSWllER1JHQ1dDR1pRRkZGUFBKRlpZTkFLUkdZV1lRUFFYWEZLSlRTWlpYU1daRERGQkJYVEJHVFpLWk5QWlpQWlhaUEpTWkJNUUhLQ1lYWUxES0xKTllQS1lHSEdEWkpYWEVBSFBOWktaVFpDTVhDWE1NSlhOS1NaUU5NTkxXQldXWEpLWUhDUFNUTUNTUVRaSllYVFBDVFBEVE5OUEdMTExaU0pMU1BCTFBMUUhEVE5KTkxZWVJTWkZGSkZRV0RQSFpEV01SWkNDTE9EQVhOU1NOWVpSRVNUWUpXSllKREJDRlhOTVdUVEJZTFdTVFNaR1lCTEpQWEdMQk9DTEhQQ0JKTFRNWFpMSllMWlhDTFRQTkNMQ0tYVFBaSlNXQ1lYU0ZZU1pES05UTEJZSkNZSkxMU1RHUUNCWFJZWlhCWEtMWUxIWkxRWkxOWkNYV0paTEpaSk5DSkhYTU5aWkdKWlpYVFpKWFlDWVlDWFhKWVlYSkpYU1NTSlNUU1NUVFBQR1FUQ1NYV1pEQ1NZRlBURkJGSEZCQkxaSkNMWlpEQlhHQ1hMUVBYS0ZaRkxTWUxUVVdCTVFKSFNaQk1EREJDWVNDQ0xEWFlDRERRTFlKSldNUUxMQ1NHTEpKU1lGUFlZQ0NZTFRKQU5USkpQV1lDTU1HUVlZU1hEWFFNWkhTWlhQRlRXV1pRU1dRUkZLSkxaSlFRWUZCUlhKSEhGV0pKWllRQVpNWUZSSENZWUJZUVdMUEVYQ0NaU1RZUkxUVERNUUxZS01CQkdNWVlKUFJLWk5QQlNYWVhCSFlaREpETkdIUE1GU0dNV0ZaTUZRTU1CQ01aWkNKSkxDTlVYWVFMTUxSWUdRWkNZWFpMV0pHQ0pDR0dNQ0pORllaWkpIWUNQUlJDTVRaUVpYSEZRR1RKWENDSkVBUUNSSllIUExRTFNaREpSQkNRSFFEWVJIWUxZWEpTWU1IWllEV0xERlJZSEJQWURUU1NDTldCWEdMUFpNTFpaVFFTU0NQSk1YWFlDU0pZVFlDR0hZQ0pXWVJYWExGRU1XSk5NS0xMU1dUWEhZWVlOQ01NQ1dKRFFESlpHTExKV0pSS0hQWkdHRkxDQ1NDWk1DQkxUQkhCUUpYUURTUERKWlpHS0dMRlFZV0JaWVpKTFRTVERIUUhDVENCQ0hGTFFNUFdEU0hZWVRRV0NOWlpKVExCWU1CUERZWVlYU1FLWFdZWUZMWFhOQ1dDWFlQTUFFTFlLS0pNWlpaQlJYWVlRSkZMSlBGSEhIWVRaWlhTR1FRTUhTUEdEWlFXQldQSkhaSkRZU0NRV1pLVFhYU1FMWllZTVlTRFpHUlhDS0tVSkxXUFlTWVNDU1laTFJNTFFTWUxKWEJDWFRMV0RRWlBDWUNZS1BQUE5TWEZZWkpKUkNFTUhTWk1TWExYR0xSV0dDU1RMUlNYQlpHQlpHWlRDUExVSkxTTFlMWU1UWE1UWlBBTFpYUFhKVEpXVENZWVpMQkxYQlpMUU1ZTFhQR0hEU0xTU0RNWE1CRFpaU1hXSEFNTENaQ1BKTUNOSEpZU05TWUdDSFNLUU1aWlFETExLQUJMV0pYU0ZNT0NEWEpSUkxZUVpLSk1ZQllRTFlIRVRGSlpGUkZLU1JZWEZKVFdEU1hYU1lTUUpZU0xZWFdKSFNOTFhZWVhIQkhBV0hISlpYV01ZTEpDU1NMS1lEWlRYQlpTWUZEWEdYWkpLSFNYWFlCU1NYRFBZTlpXUlBUUVpDWkVOWUdDWFFGSllLSkJaTUxKQ01RUVhVT1hTTFlYWExZTExKRFpCVFlNSFBGU1RUUVFXTEhPS1lCTFpaQUxaWFFMSFpXUlJRSExTVE1ZUFlYSkpYTVFTSkZOQlhZWFlKWFhZUVlMVEhZTFFZRk1MS0xKVE1MTEhTWldLWkhMSk1MSExKS0xKU1RMUVhZTE1CSEhMTkxaWFFKSFhDRlhYTEhZSEpKR0JZWlpLQlhTQ1FESlFEU1VKWllZSFpISE1HU1hDU1lNWEZFQkNRV1dSQlBZWUpRVFlaQ1lRWVFRWllITVdGRkhHWkZSSkZDRFBYTlRRWVpQRFlLSEpMRlJaWFBQWFpEQkJHWlFTVExHREdZTENRTUxDSEhNRllXTFpZWEtKTFlQUUhTWVdNUVFHUVpNTFpKTlNRWEpRU1lKWUNCRUhTWEZTWlBYWldGTExCQ1lZSkRZVERUSFdaU0ZKTVFRWUpMTVFYWExMRFRUS0hIWUJGUFdUWVlTUVFXTlFXTEdXREVCWldDTVlHQ1VMS0pYVE1YTVlKU1hIWUJSV0ZZTVdGUlhZUU1YWVNaVFpaVEZZS01MREhRRFhXWVlOTENSWUpCTFBTWENYWVdMU1BSUkpXWEhRWVBIVFlETlhISE1NWVdZVFpDU1FNVFNTQ0NEQUxXWlRDUFFQWUpMTFFaWUpTV1hNWlpNTVlMTVhDTE1YQ1pNWE1aU1FUWlBQUVFCTFBHWFFaSEZMSkpIWVRKU1JYV1pYU0NDRExYVFlKRENRSlhTTFFZQ0xaWExaWlhNWFFSSk1IUkhaSkJITUZMSkxNTENMUU5MRFhaTExMUFlQU1lKWVNYQ1FRRENNUUpaWlhITlBOWFpNRUtNWEhZS1lRTFhTWFRYSllZSFdEQ1dEWkhRWVlCR1lCQ1lTQ0ZHUFNKTlpEWVpaSlpYUlpSUUpKWU1DQU5ZUkpUTERQUFlaQlNUSktYWFpZUEZEV0ZHWlpSUFlNVE5HWFpRQllYTkJVRk5RS1JKUVpNSkVHUlpHWUNMS1haRFNLS05TWEtDTEpTUEpZWVpMUVFKWUJaU1NRTExMS0pYVEJLVFlMQ0NEREJMU1BQRllMR1lEVFpKWVFHR0tRVFRGWlhCREtUWVlIWUJCRllUWVlCQ0xQRFlUR0RIUllSTkpTUFRDU05ZSlFIS0xMTFpTTFlEWFhXQkNKUVNQWEJQSlpKQ0pEWkZGWFhCUk1MQVpIQ1NORExCSkRTWkJMUFJaVFNXU0JYQkNMTFhYTFpESlpTSlBZTFlYWFlGVEZGRkJISkpYR0JZWEpQTU1NUFNTSlpKTVRMWVpKWFNXWFRZTEVEUVBKTVlHUVpKR0RKTFFKV0pRTExTSkdKR1lHTVNDTEpKWERUWUdKUUpRSkNKWkNKR0RaWlNYUUdTSkdHQ1hIUVhTTlFMWlpCWEhTR1pYQ1hZTEpYWVhZWURGUVFKSEpGWERIQ1RYSllSWFlTUVRKWFlFRllZU1NZWUpYTkNZWlhGWE1TWVNaWFlZU0NIU0hYWlpaR1paWkdGSkRMVFlMTlBaR1lKWVpZWVFaUEJYUUJEWlRaQ1pZWFhZSEhTUVhTSERIR1FISkhHWVdTWlRNWk1MSFlYR0VCVFlMWktRV1lUSlpSQ0xFS1lTVERCQ1lLUVFTQVlYQ0pYV1dHU0JISllaWURIQ1NKS1FDWFNXWEZMVFlOWVpQWkNDWkpRVFpXSlFEWlpaUVpMSkpYTFNCSFBZWFhQU1hTSEhFWlRYRlBUTFFZWlpYSFlUWE5DRlpZWUhYR05YTVlXWFRaU0pQVEhIR1lNWE1YUVpYVFNCQ1pZSllYWFRZWVpZUENRTE1NU1pNSlpaTExaWEdYWkFBSlpZWEpNWlhXRFhaU1haRFpYTEVZSkpaUUJIWldaWlpRVFpQU1haVERTWEpKSlpOWUFaUEhYWVlTUk5RRFRIWkhZWUtZSkhEWlhaTFNXQ0xZQlpZRUNXQ1lDUllMQ1hOSFpZRFpZRFlKREZSSkpIVFJTUVRYWVhKUkpIT0pZTlhFTFhTRlNGSlpHSFBaU1haU1pEWkNRWkJZWUtMU0dTSkhDWlNIREdRR1hZWkdYQ0hYWkpXWVFXR1lIS1NTRVFaWk5EWkZLV1lTU1RDTFpTVFNZTUNESEpYWFlXRVlYQ1pBWURNUFhNRFNYWUJTUU1KTVpKTVRaUUxQSllRWkNHUUhYSkhITFhYSExIRExESlFDTERXQlNYRlpaWVlTQ0hUWVRZWUJIRUNYSFlLR0pQWEhIWVpKRlhIV0hCRFpGWVpCQ0FQTlBHTllETVNYSE1NTU1BTVlOQllKVE1QWFlZTUNUSEpCWllGQ0dUWUhXUEhGVFdaWkVaU0JaRUdQRk1UU0tGVFlDTUhGTExIR1BaSlhaSkdaSllYWlNCQlFTQ1paTFpDQ1NUUEdYTUpTRlRDQ1pKWkRKWENZQlpMRkNKU1laRkdTWkxZQkNXWlpCWVpEWllQU1dZSlpYWkJEU1lVWExaWkJaRllHQ1pYQlpIWkZUUEJHWkdFSkJTVEdLRE1GSFlaWkpIWkxMWlpHSlFaTFNGREpTU0NCWkdQRExGWkZaU1pZWllaU1lHQ1hTTlhYQ0hDWlhUWlpMSkZaR1FTUVlYWkpRRENDWlRRQ0RYWkpZUUpRQ0hYWlRETEdTQ1haU1lRSlFUWldMUURRWlRRQ0hRUUpaWUVaWlpQQldLREpGQ0pQWlRZUFFZUVRUWU5MTUJES1RKWlBRWlFaWkZQWlNCTkpMR1lKRFhKRFpaS1pHUUtYRExQWkpUQ0pEUUJYREpRSlNUQ0tOWEJYWk1TTFlKQ1FNVEpRV1dDSlFOSk5MTExISkNXUVRCWlFZRFpDWlBaWkRaWUREQ1laWlpDQ0pUVEpGWkRQUlJUWlRKRENRVFFaRFRKTlBMWkJDTExDVFpTWEtKWlFaUFpMQlpSQlRKRENYRkNaREJDQ0pKTFRRUVBMRENHWkRCQlpKQ1FEQ0pXWU5MTFpZWkNDRFdMTFhXWkxYUlhOVFFRQ1pYS1FMU0dERlFURERHTFJMQUpKVEtVWU1LUUxMVFpZVERZWUNaR0pXWVhEWEZSU0tTVFFURU5RTVJLUVpISFFLRExEQVpGS1lQQkdHUFpSRUJaWllLWlpTUEVHSlhHWUtRWlpaU0xZU1lZWVpXRlFaWUxaWkxaSFdDSEtZUFFHTlBHQkxQTFJSSllYQ0NTWVlIU0ZaRllCWllZVEdaWFlMWENaV1hYWkpaQkxGRkxHU0tIWUpaRVlKSExQTExMTENaR1hEUlpFTFJIR0tMWlpZSFpMWVFTWlpKWlFMSlpGTE5CSEdXTENaQ0ZKWVNQWVhaTFpMWEdDQ1BaQkxMQ1lCQkJCVUJCQ0JQQ1JOTlpDWllSQkZTUkxEQ0dRWVlRWFlHTVFaV1RaWVRZSlhZRldURUhaWkpZV0xDQ05UWllKSlpERURQWkRaVFNZUUpIRFlNQkpOWUpaTFhUU1NUUEhOREpYWEJZWFFUWlFERFRKVERZWVRHV1NDU1pRRkxTSExHTEJDWlBIRExZWkpZQ0tXVFlUWUxCTllUU0RTWUNDVFlTWllZRUJIRVhIUURUV05ZR1lDTFhUU1pZU1RRTVlHWkFaQ0NTWlpEU0xaQ0xaUlFYWVlFTEpTQllNWFNYWlRFTUJCTExZWUxMWVREUVlTSFlNUlFXS0ZLQkZYTlhTQllDSFhCV0pZSFRRQlBCU0JXRFpZTEtHWlNLWUhYUVpKWEhYSlhHTkxKS1pMWVlDRFhMRllGR0hMSkdKWUJYUUxZQlhRUFFHWlRaUExOQ1lQWERKWVFZRFlNUkJFU0pZWUhLWFhTVE1YUkNaWllXWFlRWUJNQ0xMWVpIUVlaV1FYREJYQlpXWk1TTFBETVlTS0ZNWktMWkNZUVlDWkxRWEZaWllEUVpQWllHWUpZWk1aWERaRllGWVRUUVRaSEdTUENaTUxDQ1lUWlhKQ1lUSk1LU0xQWkhZU05aTExZVFBaQ1RaWkNLVFhESFhYVFFDWUZLU01RQ0NZWUFaSFRKUENZTFpMWUpCSlhUUE5ZTEpZWU5SWFNZTE1NTlhKU01ZQkNTWVNZTFpZTFhKSlFZTERaTFBRQkZaWkJMRk5EWFFLQ1pGWVdIR1FNUkRTWFlDWVRYTlFRSlpZWVBGWlhEWVpGUFJYRUpER1lRQlhSQ05GWVlRUEdIWUpEWVpYR1JIVEtZTE5XRFpOVFNNUEtMQlRIQlBZU1pCWlRKWlNaWkpUWVlYWlBIU1NaWkJaQ1pQVFFGWk1ZRkxZUFlCQkpRWFpNWFhESk1UU1lTS0tCSlpYSEpDS0xQU01LWUpaQ1hUTUxKWVhSWlpRU0xYWFFQWVpYTUtZWFhYSkNMSlBSTVlZR0FEWVNLUUxTTkRIWVpLUVhaWVpUQ0dIWlRMTUxXWllCV1NZQ1RCSEpISkZDV1pUWFdZVEtaTFhRU0hMWUpaSlhUTVBMUFlDR0xUQlpaVExaSkNZSkdEVENMS0xQTExRUEpNWlBBUFhZWkxLS1RLRFpDWlpCTlpEWURZUVpKWUpHTUNUWExUR1hTWkxNTEhCR0xLRldOV1pIRFhVSExGTUtZU0xHWERUV1dGUkpFSlpUWkhZRFhZS1NIV0ZaQ1FTSEtUTVFRSFRaSFlNSkRKU0tIWFpKWkJaWlhZTVBBR1FNU1RQWExTS0xaWU5XUlRTUUxTWkJQU1BTR1pXWUhUTEtTU1NXSFpaTFlZVE5YSkdNSlNaU1VGV05MU09aVFhHWExTQU1NTEJXTERTWllMQUtRQ1FDVE1ZQ0ZKQlNMWENMWlpDTFhYS1NCWlFDTEhKUFNRUExTWFhDS1NMTkhQU0ZRUVlUWFlKWkxRTERYWlFKWkRZWURKTlpQVFVaRFNLSkZTTEpIWUxaU1FaTEJUWFlER1RRRkRCWUFaWERaSFpKTkhIUUJZS05YSkpRQ1pNTExKWktTUExEWUNMQkJMWEtMRUxYSkxCUVlDWEpYR0NOTENRUExaTFpZSlRaTEpHWVpEWlBMVFFDU1hGRE1OWUNYR0JUSkRDWk5CR0JRWVFKV0dLRkhUTlBZUVpRR0JLUEJCWVpNVEpEWVRCTFNRTVBTWFRCTlBEWEtMRU1ZWUNKWU5aQ1RMRFlLWlpYRERYSFFTSERHTVpTSllDQ1RBWVJaTFBZTFRMS1hTTFpDR0dFWENMRlhMS0pSVExRSkFRWk5DTUJZREtLQ1hHTENaSlpYSkhQVERKSk1aUVlLUVNFQ1FaRFNISEFETUxaRk1NWkJHTlRKTk5MR0JZSkJSQlRNTEJZSkRaWExDSkxQTERMUENRREhMWFpMWUNCTENYWlpKQURKTE5aTU1TU1NNWUJIQlNRS0JIUlNYWEpNWFNEWk5aUFhMR0JSSFdHR0ZDWEdNU0tMTFRTSllZQ1FMVFNLWVdZWUhZV1hCWFFZV1BZV1lLUUxTUVBUTlRLSFFDV0RRS1RXUFhYSENQVEhUV1VNU1NZSEJXQ1JXWEhKTUtNWk5HV1RNTEtGR0hLSllMU1lZQ1hXSFlFQ0xRSEtRSFRUUUtIRlpMRFhRV1laWVlERVNCUEtZUlpQSkZZWVpKQ0VRRFpaRExBVFpCQkZKTExDWERMTUpTU1hFR1lHU0pRWENXQlhTU1pQRFlaQ1hETllYUFBaWURMWUpDWlBMVFhMU1hZWllSWENZWVlEWUxXV05aU0FISlNZUVlIR1lXV0FYVEpaREFYWVNSTFREUFNTWVlGTkVKRFhZWkhMWExMTFpRWlNKTllRWVFRWFlKR0haR1pDWUpDSFpMWUNEU0hXU0hKWllKWENMTE5YWkpKWVlYTkZYTVdGUFlMQ1lMTEFCV0RESFdEWEpNQ1haVFpQTUxRWkhTRkhaWU5aVExMRFlXTFNMWEhZTU1ZTE1CV1dLWVhZQURUWFlMTERKUFlCUFdVWEpNV01MTFNBRkRMTFlGTEJISEhCUVFMVFpKQ1FKTERKVEZGS01NTUJZVEhZR0RDUVJERFdSUUpYTkJZU05XWkRCWVlUQkpIUFlCWVRUSlhBQUhHUURRVE1ZU1RRWEtCVFpQS0pMWlJCRVFRU1NNSkpCREpPVEdUQlhQR0JLVExIUVhKSkpDVEhYUURXSkxXUkZXUUdXU0hDS1JZU1dHRlRHWUdCWFNEV0RXUkZIV1lUSkpYWFhKWVpZU0xQWVlZUEFZWEhZRFFLWFNIWFlYR1NLUUhZV0ZERERQUExDSkxRUUVFV1hLU1lZS0RZUExUSlRIS0pMVENZWUhISlRUUExUWlpDRExUSFFLWlhRWVNURUVZV1lZWllYWFlZU1RUSktMTFBaTUNZSFFHWFlIU1JNQlhQTExOUVlEUUhYU1hYV0dEUUJTSFlMTFBKSkpUSFlKS1lQUFRIWVlLVFlFWllFTk1EU0hMQ1JQUUZER0ZYWlBTRlRMSlhYSkJTV1lZU0tTRkxYTFBQTEJCQkxCU0ZYRllaQlNKU1NZTFBCQkZGRkZTU0NKRFNUWlNYWlJZWVNZRkZTWVpZWkJKVEJDVFNCU0RIUlRKSkJZVENYWUpFWUxYQ0JORUJKRFNZWFlLR1NKWkJYQllURlpXR0VOWUhIVEhaSEhYRldHQ1NUQkdYS0xTWFlXTVRNQllYSlNUWlNDRFlRUkNZVFdYWkZITVlNQ1hMWk5TREpUVFRYUllDRllKU0JTRFlFUlhKTEpYQkJERVlOSkdIWEdDS0dTQ1lNQkxYSk1TWk5TS0dYRkJOQlBUSEZKQUFGWFlYRlBYTVlQUURUWkNYWlpQWFJTWVdaRExZQkJLVFlRUFFKUFpZUFpKWk5KUFpKTFpaRllTQlRUU0xNUFRaUlREWFFTSkVIQlpZTFpESExKU1FNTEhUWFRKRUNYU0xaWlNQS1RMWktRUVlGU1lHWVdQQ1BRRkhRSFlUUVhaS1JTR1RUU1FDWkxQVFhDRFlZWlhTUVpTTFhMWk1ZQ1BDUUJaWVhIQlNYTFpETFRDRFhUWUxaSllZWlBaWVpMVFhKU0pYSExQTVlUWENRUkJMWlNTRkpaWlROSllUWE1ZSkhMSFBQTENZWFFKUVFLWlpTQ1BaS1NXQUxRU0JMQ0NaSlNYR1dXV1lHWUtUSkJCWlRES0hYSEtHVEdQQktRWVNMUFhQSkNLQk1MTFhEWlNUQktMR0dRS1FMU0JLS1RGWFJNREtCRlRQWkZSVEJCUkZFUlFHWFlKUFpTU1RMQlpUUFNaUVpTSkRITEpRTFpCUE1TTU1TWExRUU5IS05CTFJERE5YWERIRERKQ1lZR1lMWEdaTFhTWUdNUVFHS0hCUE1YWVhMWVRRV0xXR0NQQk1RWENZWllEUkpCSFRESllIUVNIVE1KU0JZUExXSExaRkZOWVBNSFhYSFBMVEJRUEZCSldRREJZR1BOWlRQRlpKR1NERFRRU0haRUFXWlpZTExUWVlCV0pLWFhHSExGS1hESlRNU1pTUVlOWkdHU1dRU1BIVExTU0tNQ0xaWFlTWlFaWE5DSkRRR1pETEZOWUtMSkNKTExaTE1aWk5IWURTU0hUSFpaTFpaQkJIUVpXV1lDUlpITFlRUUpCRVlGWFhYV0hTUlhXUUhXUFNMTVNTS1pUVFlHWVFRV1JTTEFMSE1KVFFKU01YUUJKSlpKWFpZWktYQllRWEJKWFNIWlRTRkpMWE1YWlhGR0hLWlNaR0dZTENMU0FSSllIU0xMTE1aWEVMR0xYWURKWVRMRkJIQlBOTFlaRkJCSFBUR0pLV0VUWkhLSkpYWlhYR0xMSkxTVEdTSEpKWVFMUVpGS0NHTk5ESlNTWkZEQkNUV1dTRVFGSFFKQlNBUVRHWVBRTEJYQk1NWVdYR1NMWkhHTFpHUVlGTFpCWUZaSkZSWVNGTUJZWkhRR0ZXWlNZRllKSlBIWkJZWVpGRldPREdSTE1GVFdMQlpHWUNRWENESllHWllZWVlUWVRZRFdFR0FaWUhYSkxaWVlITFJNR1JYWFpDTEhORUxKSlRKVFBXSllCSkpCWEpKVEpURUVLSFdTTEpQTFBTRllaUFFRQkRMUUpKVFlZUUxZWktES1NRSllZUVpMRFFUR0pRWVpKU1VDTVJZUVRIVEVKTUZDVFlIWVBLTUhZWldKRFFGSFlZWFdTSENUWFJMSkhRWEhDQ1lZWUpMVEtUVFlUTVhHVENKVFpBWVlPQ1pMWUxCU1pZV0pZVFNKWUhCWVNIRkpMWUdKWFhUTVpZWUxUWFhZUFpMWFlKWllaWVlQTkhNWU1EWVlMQkxITFNZWVFRTExOSkpZTVNPWVFCWkdETFlYWUxDUVlYVFNaRUdYSFpHTEhXQkxKSEVZWFRXUU1BS0JQUUNHWVNISEVHUUNNV1lZV0xKWUpIWVlaTExKSllMSFpZSE1HU0xKTEpYQ0pKWUNMWUNKUENQWkpaSk1NWUxDUUxOUUxKUUpTWFlKTUxTWkxKUUxZQ01NSENGTU1GUFFRTUZZTFFNQ0ZGUU1NTU1ITVpORkhISkdUVEhIS0hTTE5DSEhZUURYVE1NUURDWVpZWFlRTVlRWUxURENZWVlaQVpaQ1lNWllETFpGRkZNTVlDUVpXWlpNQUJUQllaVERNTlpaR0dERlRZUENHUVlUVFNTRkZXRkRUWlFTU1lTVFdYSkhYWVRTWFhZTEJZUUhXV0tYSFpYV1pOTlpaSlpKSlFKQ0NDSFlZWEJaWFpDWVpUTExDUVhZTkpZQ1lZQ1lOWlpRWVlZRVdZQ1pEQ0pZQ0NIWUpMQlRaWVlDUVdNUFdQWU1MR0tETERMR0tRUUJHWUNISlhZXCI7XHJcbiAgICAvL+atpOWkhOaUtuW9leS6hjM3NeS4quWkmumfs+Wtl1xyXG4gICB2YXIgb011bHRpRGlmZj17XCIxOTk2OVwiOlwiRFpcIixcIjE5OTc1XCI6XCJXTVwiLFwiMTk5ODhcIjpcIlFKXCIsXCIyMDA0OFwiOlwiWUxcIixcIjIwMDU2XCI6XCJTQ1wiLFwiMjAwNjBcIjpcIk5NXCIsXCIyMDA5NFwiOlwiUUdcIixcIjIwMTI3XCI6XCJRSlwiLFwiMjAxNjdcIjpcIlFDXCIsXCIyMDE5M1wiOlwiWUdcIixcIjIwMjUwXCI6XCJLSFwiLFwiMjAyNTZcIjpcIlpDXCIsXCIyMDI4MlwiOlwiU0NcIixcIjIwMjg1XCI6XCJRSkdcIixcIjIwMjkxXCI6XCJURFwiLFwiMjAzMTRcIjpcIllEXCIsXCIyMDM0MFwiOlwiTkVcIixcIjIwMzc1XCI6XCJURFwiLFwiMjAzODlcIjpcIllKXCIsXCIyMDM5MVwiOlwiQ1pcIixcIjIwNDE1XCI6XCJQQlwiLFwiMjA0NDZcIjpcIllTXCIsXCIyMDQ0N1wiOlwiU1FcIixcIjIwNTA0XCI6XCJUQ1wiLFwiMjA2MDhcIjpcIktHXCIsXCIyMDg1NFwiOlwiUUpcIixcIjIwODU3XCI6XCJaQ1wiLFwiMjA5MTFcIjpcIlBGXCIsXCIyMDUwNFwiOlwiVENcIixcIjIwNjA4XCI6XCJLR1wiLFwiMjA4NTRcIjpcIlFKXCIsXCIyMDg1N1wiOlwiWkNcIixcIjIwOTExXCI6XCJQRlwiLFwiMjA5ODVcIjpcIkFXXCIsXCIyMTAzMlwiOlwiUEJcIixcIjIxMDQ4XCI6XCJYUVwiLFwiMjEwNDlcIjpcIlNDXCIsXCIyMTA4OVwiOlwiWVNcIixcIjIxMTE5XCI6XCJKQ1wiLFwiMjEyNDJcIjpcIlNCXCIsXCIyMTI3M1wiOlwiU0NcIixcIjIxMzA1XCI6XCJZUFwiLFwiMjEzMDZcIjpcIlFPXCIsXCIyMTMzMFwiOlwiWkNcIixcIjIxMzMzXCI6XCJTRENcIixcIjIxMzQ1XCI6XCJRS1wiLFwiMjEzNzhcIjpcIkNBXCIsXCIyMTM5N1wiOlwiU0NcIixcIjIxNDE0XCI6XCJYU1wiLFwiMjE0NDJcIjpcIlNDXCIsXCIyMTQ3N1wiOlwiSkdcIixcIjIxNDgwXCI6XCJURFwiLFwiMjE0ODRcIjpcIlpTXCIsXCIyMTQ5NFwiOlwiWVhcIixcIjIxNTA1XCI6XCJZWFwiLFwiMjE1MTJcIjpcIkhHXCIsXCIyMTUyM1wiOlwiWEhcIixcIjIxNTM3XCI6XCJQQlwiLFwiMjE1NDJcIjpcIlBGXCIsXCIyMTU0OVwiOlwiS0hcIixcIjIxNTcxXCI6XCJFXCIsXCIyMTU3NFwiOlwiREFcIixcIjIxNTg4XCI6XCJURFwiLFwiMjE1ODlcIjpcIk9cIixcIjIxNjE4XCI6XCJaQ1wiLFwiMjE2MjFcIjpcIktIQVwiLFwiMjE2MzJcIjpcIlpKXCIsXCIyMTY1NFwiOlwiS0dcIixcIjIxNjc5XCI6XCJMS0dcIixcIjIxNjgzXCI6XCJLSFwiLFwiMjE3MTBcIjpcIkFcIixcIjIxNzE5XCI6XCJZSFwiLFwiMjE3MzRcIjpcIldPRVwiLFwiMjE3NjlcIjpcIkFcIixcIjIxNzgwXCI6XCJXTlwiLFwiMjE4MDRcIjpcIlhIXCIsXCIyMTgzNFwiOlwiQVwiLFwiMjE4OTlcIjpcIlpEXCIsXCIyMTkwM1wiOlwiUk5cIixcIjIxOTA4XCI6XCJXT1wiLFwiMjE5MzlcIjpcIlpDXCIsXCIyMTk1NlwiOlwiU0FcIixcIjIxOTY0XCI6XCJZQVwiLFwiMjE5NzBcIjpcIlREXCIsXCIyMjAwM1wiOlwiQVwiLFwiMjIwMzFcIjpcIkpHXCIsXCIyMjA0MFwiOlwiWFNcIixcIjIyMDYwXCI6XCJaQ1wiLFwiMjIwNjZcIjpcIlpDXCIsXCIyMjA3OVwiOlwiTUhcIixcIjIyMTI5XCI6XCJYSlwiLFwiMjIxNzlcIjpcIlhBXCIsXCIyMjIzN1wiOlwiTkpcIixcIjIyMjQ0XCI6XCJURFwiLFwiMjIyODBcIjpcIkpRXCIsXCIyMjMwMFwiOlwiWUhcIixcIjIyMzEzXCI6XCJYV1wiLFwiMjIzMzFcIjpcIllRXCIsXCIyMjM0M1wiOlwiWUpcIixcIjIyMzUxXCI6XCJQSFwiLFwiMjIzOTVcIjpcIkRDXCIsXCIyMjQxMlwiOlwiVERcIixcIjIyNDg0XCI6XCJQQlwiLFwiMjI1MDBcIjpcIlBCXCIsXCIyMjUzNFwiOlwiWkRcIixcIjIyNTQ5XCI6XCJESFwiLFwiMjI1NjFcIjpcIlBCXCIsXCIyMjYxMlwiOlwiVERcIixcIjIyNzcxXCI6XCJLUVwiLFwiMjI4MzFcIjpcIkhCXCIsXCIyMjg0MVwiOlwiSkdcIixcIjIyODU1XCI6XCJRSlwiLFwiMjI4NjVcIjpcIlhRXCIsXCIyMzAxM1wiOlwiTUxcIixcIjIzMDgxXCI6XCJXTVwiLFwiMjM0ODdcIjpcIlNYXCIsXCIyMzU1OFwiOlwiUUpcIixcIjIzNTYxXCI6XCJZV1wiLFwiMjM1ODZcIjpcIllXXCIsXCIyMzYxNFwiOlwiWVdcIixcIjIzNjE1XCI6XCJTTlwiLFwiMjM2MzFcIjpcIlBCXCIsXCIyMzY0NlwiOlwiWlNcIixcIjIzNjYzXCI6XCJaVFwiLFwiMjM2NzNcIjpcIllHXCIsXCIyMzc2MlwiOlwiVERcIixcIjIzNzY5XCI6XCJaU1wiLFwiMjM3ODBcIjpcIlFKXCIsXCIyMzg4NFwiOlwiUUtcIixcIjI0MDU1XCI6XCJYSFwiLFwiMjQxMTNcIjpcIkRDXCIsXCIyNDE2MlwiOlwiWkNcIixcIjI0MTkxXCI6XCJHQVwiLFwiMjQyNzNcIjpcIlFKXCIsXCIyNDMyNFwiOlwiTkxcIixcIjI0Mzc3XCI6XCJURFwiLFwiMjQzNzhcIjpcIlFKXCIsXCIyNDQzOVwiOlwiUEZcIixcIjI0NTU0XCI6XCJaU1wiLFwiMjQ2ODNcIjpcIlREXCIsXCIyNDY5NFwiOlwiV0VcIixcIjI0NzMzXCI6XCJMS1wiLFwiMjQ5MjVcIjpcIlROXCIsXCIyNTA5NFwiOlwiWkdcIixcIjI1MTAwXCI6XCJYUVwiLFwiMjUxMDNcIjpcIlhIXCIsXCIyNTE1M1wiOlwiUEJcIixcIjI1MTcwXCI6XCJQQlwiLFwiMjUxNzlcIjpcIktHXCIsXCIyNTIwM1wiOlwiUEJcIixcIjI1MjQwXCI6XCJaU1wiLFwiMjUyODJcIjpcIkZCXCIsXCIyNTMwM1wiOlwiTkFcIixcIjI1MzI0XCI6XCJLR1wiLFwiMjUzNDFcIjpcIlpZXCIsXCIyNTM3M1wiOlwiV1pcIixcIjI1Mzc1XCI6XCJYSlwiLFwiMjUzODRcIjpcIkFcIixcIjI1NDU3XCI6XCJBXCIsXCIyNTUyOFwiOlwiU0RcIixcIjI1NTMwXCI6XCJTQ1wiLFwiMjU1NTJcIjpcIlREXCIsXCIyNTc3NFwiOlwiWkNcIixcIjI1ODc0XCI6XCJaQ1wiLFwiMjYwNDRcIjpcIllXXCIsXCIyNjA4MFwiOlwiV01cIixcIjI2MjkyXCI6XCJQQlwiLFwiMjYzMzNcIjpcIlBCXCIsXCIyNjM1NVwiOlwiWllcIixcIjI2MzY2XCI6XCJDWlwiLFwiMjYzOTdcIjpcIlpDXCIsXCIyNjM5OVwiOlwiUUpcIixcIjI2NDE1XCI6XCJaU1wiLFwiMjY0NTFcIjpcIlNCXCIsXCIyNjUyNlwiOlwiWkNcIixcIjI2NTUyXCI6XCJKR1wiLFwiMjY1NjFcIjpcIlREXCIsXCIyNjU4OFwiOlwiSkdcIixcIjI2NTk3XCI6XCJDWlwiLFwiMjY2MjlcIjpcIlpTXCIsXCIyNjYzOFwiOlwiWUxcIixcIjI2NjQ2XCI6XCJYUVwiLFwiMjY2NTNcIjpcIktHXCIsXCIyNjY1N1wiOlwiWEpcIixcIjI2NzI3XCI6XCJIR1wiLFwiMjY4OTRcIjpcIlpDXCIsXCIyNjkzN1wiOlwiWlNcIixcIjI2OTQ2XCI6XCJaQ1wiLFwiMjY5OTlcIjpcIktKXCIsXCIyNzA5OVwiOlwiS0pcIixcIjI3NDQ5XCI6XCJZUVwiLFwiMjc0ODFcIjpcIlhTXCIsXCIyNzU0MlwiOlwiWlNcIixcIjI3NjYzXCI6XCJaU1wiLFwiMjc3NDhcIjpcIlRTXCIsXCIyNzc4NFwiOlwiU0NcIixcIjI3Nzg4XCI6XCJaRFwiLFwiMjc3OTVcIjpcIlREXCIsXCIyNzgxMlwiOlwiT1wiLFwiMjc4NTBcIjpcIlBCXCIsXCIyNzg1MlwiOlwiTUJcIixcIjI3ODk1XCI6XCJTTFwiLFwiMjc4OThcIjpcIlBMXCIsXCIyNzk3M1wiOlwiUUpcIixcIjI3OTgxXCI6XCJLSFwiLFwiMjc5ODZcIjpcIkhYXCIsXCIyNzk5NFwiOlwiWEpcIixcIjI4MDQ0XCI6XCJZQ1wiLFwiMjgwNjVcIjpcIldHXCIsXCIyODE3N1wiOlwiU01cIixcIjI4MjY3XCI6XCJRSlwiLFwiMjgyOTFcIjpcIktIXCIsXCIyODMzN1wiOlwiWlFcIixcIjI4NDYzXCI6XCJUTFwiLFwiMjg1NDhcIjpcIkRDXCIsXCIyODYwMVwiOlwiVERcIixcIjI4Njg5XCI6XCJQQlwiLFwiMjg4MDVcIjpcIkpHXCIsXCIyODgyMFwiOlwiUUdcIixcIjI4ODQ2XCI6XCJQQlwiLFwiMjg5NTJcIjpcIlREXCIsXCIyODk3NVwiOlwiWkNcIixcIjI5MTAwXCI6XCJBXCIsXCIyOTMyNVwiOlwiUUpcIixcIjI5NTc1XCI6XCJTTFwiLFwiMjk2MDJcIjpcIkZCXCIsXCIzMDAxMFwiOlwiVERcIixcIjMwMDQ0XCI6XCJDWFwiLFwiMzAwNThcIjpcIlBGXCIsXCIzMDA5MVwiOlwiWVNQXCIsXCIzMDExMVwiOlwiWU5cIixcIjMwMjI5XCI6XCJYSlwiLFwiMzA0MjdcIjpcIlNDXCIsXCIzMDQ2NVwiOlwiU1hcIixcIjMwNjMxXCI6XCJZUVwiLFwiMzA2NTVcIjpcIlFKXCIsXCIzMDY4NFwiOlwiUUpHXCIsXCIzMDcwN1wiOlwiU0RcIixcIjMwNzI5XCI6XCJYSFwiLFwiMzA3OTZcIjpcIkxHXCIsXCIzMDkxN1wiOlwiUEJcIixcIjMxMDc0XCI6XCJOTVwiLFwiMzEwODVcIjpcIkpaXCIsXCIzMTEwOVwiOlwiU0NcIixcIjMxMTgxXCI6XCJaQ1wiLFwiMzExOTJcIjpcIk1MQlwiLFwiMzEyOTNcIjpcIkpRXCIsXCIzMTQwMFwiOlwiWVhcIixcIjMxNTg0XCI6XCJZSlwiLFwiMzE4OTZcIjpcIlpOXCIsXCIzMTkwOVwiOlwiWllcIixcIjMxOTk1XCI6XCJYSlwiLFwiMzIzMjFcIjpcIlBGXCIsXCIzMjMyN1wiOlwiWllcIixcIjMyNDE4XCI6XCJIR1wiLFwiMzI0MjBcIjpcIlhRXCIsXCIzMjQyMVwiOlwiSEdcIixcIjMyNDM4XCI6XCJMR1wiLFwiMzI0NzNcIjpcIkdKXCIsXCIzMjQ4OFwiOlwiVERcIixcIjMyNTIxXCI6XCJRSlwiLFwiMzI1MjdcIjpcIlBCXCIsXCIzMjU2MlwiOlwiWlNRXCIsXCIzMjU2NFwiOlwiSlpcIixcIjMyNzM1XCI6XCJaRFwiLFwiMzI3OTNcIjpcIlBCXCIsXCIzMzA3MVwiOlwiUEZcIixcIjMzMDk4XCI6XCJYTFwiLFwiMzMxMDBcIjpcIllBXCIsXCIzMzE1MlwiOlwiUEJcIixcIjMzMjYxXCI6XCJDWFwiLFwiMzMzMjRcIjpcIkJQXCIsXCIzMzMzM1wiOlwiVERcIixcIjMzNDA2XCI6XCJZQVwiLFwiMzM0MjZcIjpcIldNXCIsXCIzMzQzMlwiOlwiUEJcIixcIjMzNDQ1XCI6XCJKR1wiLFwiMzM0ODZcIjpcIlpOXCIsXCIzMzQ5M1wiOlwiVFNcIixcIjMzNTA3XCI6XCJRSlwiLFwiMzM1NDBcIjpcIlFKXCIsXCIzMzU0NFwiOlwiWkNcIixcIjMzNTY0XCI6XCJYUVwiLFwiMzM2MTdcIjpcIllUXCIsXCIzMzYzMlwiOlwiUUpcIixcIjMzNjM2XCI6XCJYSFwiLFwiMzM2MzdcIjpcIllYXCIsXCIzMzY5NFwiOlwiV0dcIixcIjMzNzA1XCI6XCJQRlwiLFwiMzM3MjhcIjpcIllXXCIsXCIzMzg4MlwiOlwiU1JcIixcIjM0MDY3XCI6XCJXTVwiLFwiMzQwNzRcIjpcIllXXCIsXCIzNDEyMVwiOlwiUUpcIixcIjM0MjU1XCI6XCJaQ1wiLFwiMzQyNTlcIjpcIlhMXCIsXCIzNDQyNVwiOlwiSkhcIixcIjM0NDMwXCI6XCJYSFwiLFwiMzQ0ODVcIjpcIktIXCIsXCIzNDUwM1wiOlwiWVNcIixcIjM0NTMyXCI6XCJIR1wiLFwiMzQ1NTJcIjpcIlhTXCIsXCIzNDU1OFwiOlwiWUVcIixcIjM0NTkzXCI6XCJaTFwiLFwiMzQ2NjBcIjpcIllRXCIsXCIzNDg5MlwiOlwiWEhcIixcIjM0OTI4XCI6XCJTQ1wiLFwiMzQ5OTlcIjpcIlFKXCIsXCIzNTA0OFwiOlwiUEJcIixcIjM1MDU5XCI6XCJTQ1wiLFwiMzUwOThcIjpcIlpDXCIsXCIzNTIwM1wiOlwiVFFcIixcIjM1MjY1XCI6XCJKWFwiLFwiMzUyOTlcIjpcIkpYXCIsXCIzNTc4MlwiOlwiU1pcIixcIjM1ODI4XCI6XCJZU1wiLFwiMzU4MzBcIjpcIkVcIixcIjM1ODQzXCI6XCJURFwiLFwiMzU4OTVcIjpcIllHXCIsXCIzNTk3N1wiOlwiTUhcIixcIjM2MTU4XCI6XCJKR1wiLFwiMzYyMjhcIjpcIlFKXCIsXCIzNjQyNlwiOlwiWFFcIixcIjM2NDY2XCI6XCJEQ1wiLFwiMzY3MTBcIjpcIkpDXCIsXCIzNjcxMVwiOlwiWllHXCIsXCIzNjc2N1wiOlwiUEJcIixcIjM2ODY2XCI6XCJTS1wiLFwiMzY5NTFcIjpcIllXXCIsXCIzNzAzNFwiOlwiWVhcIixcIjM3MDYzXCI6XCJYSFwiLFwiMzcyMThcIjpcIlpDXCIsXCIzNzMyNVwiOlwiWkNcIixcIjM4MDYzXCI6XCJQQlwiLFwiMzgwNzlcIjpcIlREXCIsXCIzODA4NVwiOlwiUVlcIixcIjM4MTA3XCI6XCJEQ1wiLFwiMzgxMTZcIjpcIlREXCIsXCIzODEyM1wiOlwiWURcIixcIjM4MjI0XCI6XCJIR1wiLFwiMzgyNDFcIjpcIlhUQ1wiLFwiMzgyNzFcIjpcIlpDXCIsXCIzODQxNVwiOlwiWUVcIixcIjM4NDI2XCI6XCJLSFwiLFwiMzg0NjFcIjpcIllEXCIsXCIzODQ2M1wiOlwiQUVcIixcIjM4NDY2XCI6XCJQQlwiLFwiMzg0NzdcIjpcIlhKXCIsXCIzODUxOFwiOlwiWVRcIixcIjM4NTUxXCI6XCJXS1wiLFwiMzg1ODVcIjpcIlpDXCIsXCIzODcwNFwiOlwiWFNcIixcIjM4NzM5XCI6XCJMSlwiLFwiMzg3NjFcIjpcIkdKXCIsXCIzODgwOFwiOlwiU1FcIixcIjM5MDQ4XCI6XCJKR1wiLFwiMzkwNDlcIjpcIlhKXCIsXCIzOTA1MlwiOlwiSEdcIixcIjM5MDc2XCI6XCJDWlwiLFwiMzkyNzFcIjpcIlhUXCIsXCIzOTUzNFwiOlwiVERcIixcIjM5NTUyXCI6XCJURFwiLFwiMzk1ODRcIjpcIlBCXCIsXCIzOTY0N1wiOlwiU0JcIixcIjM5NzMwXCI6XCJMR1wiLFwiMzk3NDhcIjpcIlRQQlwiLFwiNDAxMDlcIjpcIlpRXCIsXCI0MDQ3OVwiOlwiTkRcIixcIjQwNTE2XCI6XCJIR1wiLFwiNDA1MzZcIjpcIkhHXCIsXCI0MDU4M1wiOlwiUUpcIixcIjQwNzY1XCI6XCJZUVwiLFwiNDA3ODRcIjpcIlFKXCIsXCI0MDg0MFwiOlwiWUtcIixcIjQwODYzXCI6XCJRSkdcIn07XHJcbiAgICAvL+WPguaVsCzkuK3mloflrZfnrKbkuLJcclxuICAgIC8v6L+U5Zue5YC8OuaLvOmfs+mmluWtl+avjeS4suaVsOe7hFxyXG4gICAgZnVuY3Rpb24gbWFrZVB5KHN0cikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHN0cikgIT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKC0xLCBcIuWHveaVsG1ha2VQeemcgOimgeWtl+espuS4suexu+Wei+WPguaVsCFcIik7XHJcbiAgICAgICAgdmFyIGFyclJlc3VsdCA9IG5ldyBBcnJheSgpOyAvL+S/neWtmOS4remXtOe7k+aenOeahOaVsOe7hFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgLy/ojrflvpd1bmljb2Rl56CBXHJcbiAgICAgICAgICAgIHZhciBjaCA9IHN0ci5jaGFyQXQoaSk7XHJcbiAgICAgICAgICAgIC8v5qOA5p+l6K+ldW5pY29kZeeggeaYr+WQpuWcqOWkhOeQhuiMg+WbtOS5i+WGhSzlnKjliJnov5Tlm57or6XnoIHlr7nmmKDmsYnlrZfnmoTmi7zpn7PpppblrZfmr40s5LiN5Zyo5YiZ6LCD55So5YW25a6D5Ye95pWw5aSE55CGXHJcbiAgICAgICAgICAgIGFyclJlc3VsdC5wdXNoKGNoZWNrQ2goY2gpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpITnkIZhcnJSZXN1bHQs6L+U5Zue5omA5pyJ5Y+v6IO955qE5ou86Z+z6aaW5a2X5q+N5Liy5pWw57uEXHJcbiAgICAgICAgcmV0dXJuIG1rUnNsdChhcnJSZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrQ2goY2gpIHtcclxuICAgICAgICB2YXIgdW5pID0gY2guY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAvL+WmguaenOS4jeWcqOaxieWtl+WkhOeQhuiMg+WbtOS5i+WGhSzov5Tlm57ljp/lrZfnrKYs5Lmf5Y+v5Lul6LCD55So6Ieq5bex55qE5aSE55CG5Ye95pWwXHJcbiAgICAgICAgaWYgKHVuaSA+IDQwODY5IHx8IHVuaSA8IDE5OTY4KVxyXG4gICAgICAgICAgICByZXR1cm4gY2g7IC8vZGVhbFdpdGhPdGhlcnMoY2gpO1xyXG4gICAgICAgIC8v5qOA5p+l5piv5ZCm5piv5aSa6Z+z5a2XLOaYr+aMieWkmumfs+Wtl+WkhOeQhizkuI3mmK/lsLHnm7TmjqXlnKhzdHJDaGluZXNlRmlyc3RQWeWtl+espuS4suS4reaJvuWvueW6lOeahOmmluWtl+avjVxyXG4gICAgICAgIHJldHVybiAob011bHRpRGlmZlt1bmldID8gb011bHRpRGlmZlt1bmldIDogKHN0ckNoaW5lc2VGaXJzdFBZLmNoYXJBdCh1bmkgLSAxOTk2OCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBta1JzbHQoYXJyKSB7XHJcbiAgICAgICAgdmFyIGFyclJzbHQgPSBbXCJcIl07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3RyID0gYXJyW2ldO1xyXG4gICAgICAgICAgICB2YXIgc3RybGVuID0gc3RyLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKHN0cmxlbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGFyclJzbHQubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJSc2x0W2tdICs9IHN0cjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciB0bXBBcnIgPSBhcnJSc2x0LnNsaWNlKDApO1xyXG4gICAgICAgICAgICAgICAgYXJyUnNsdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IHN0cmxlbjsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpI3liLbkuIDkuKrnm7jlkIznmoRhcnJSc2x0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHRtcEFyci5zbGljZSgwKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+aKiuW9k+WJjeWtl+espnN0cltrXea3u+WKoOWIsOavj+S4quWFg+e0oOacq+WwvlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSBzdHIuY2hhckF0KGspO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+aKiuWkjeWItuW5tuS/ruaUueWQjueahOaVsOe7hOi/nuaOpeWIsGFyclJzbHTkuIpcclxuICAgICAgICAgICAgICAgICAgICBhcnJSc2x0ID0gYXJyUnNsdC5jb25jYXQodG1wKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyUnNsdDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S4pOerr+WOu+epuuagvOWHveaVsFxyXG4gICAgU3RyaW5nLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyheXFxzKil8KFxccyokKS9nLCBcIlwiKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIHBpbnlpbiA9IHt9O1xyXG4gICAgcGlueWluLm1ha2VQeSA9IG1ha2VQeTtcclxuXHJcbiAgICB2YXIgZWxlbWVudCA9IGxheXVpLmVsZW1lbnQsXHJcbiAgICAgICAgd2luID0gd2luZG93LFxyXG4gICAgICAgIGRvYyA9IGRvY3VtZW50O1xyXG5cclxuICAgIFxyXG4gICAgIGZ1bmN0aW9uIGZpbHRlckRhdGEocGlkLERhdGEpe1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhEYXRhKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5wYXJlbnRNZW51SWQ9PXBpZCAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICBmdW5jdGlvbiBtYXBSZXNldE9wZW5NZW51TGlzdChtYXBEYXRhKXtcclxuICAgICAgICB2YXIgaW5kZXg9MDtcclxuICAgICAgICB2YXIgZ3JvdXAgPSAkKGA8ZGl2IGNsYXNzPVwicHItbWV1bi1ncm91cFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJwci1tZXVuLWdyb3VwXCI+PC9kaXY+PGRpdiBjbGFzcz1cInByLW1ldW4tZ3JvdXBcIj48L2Rpdj5gKTtcclxuICAgICBcclxuICAgICAgICB2YXIgdHJlZURhdGE9IGZpbHRlckRhdGEoXCIwXCIsbWFwRGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/pgJLlvZJcclxuICAgICAgICB2YXIgcmVjdXJzaXZlID0gZnVuY3Rpb24ocGlkKXtcclxuICAgICAgICAgICAgdmFyIHN0cj1cIlwiXHJcbiAgICAgICAgICAgIHZhciBjaGlsZD1maWx0ZXJEYXRhKHBpZCxtYXBEYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNoaWxkLmZvckVhY2goZnVuY3Rpb24oZGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBgPGRpdiBjbGFzcz1cIm1lbnUtdGV4dFwiIHB5LWNvZGU9JHtkaXRlbS5QWV9jb2RlfT5cclxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj0ke2RpdGVtLmhhc2g/XCIjXCIrZGl0ZW0uaGFzaDpcImphdmFzY3JpcHQ6O1wifVxyXG4gICAgICAgICAgICAgICAgICAgcGFyZW50bWVudS1pZD0ke2RpdGVtLnBhcmVudE1lbnVJZH1cclxuICAgICAgICAgICAgICAgICAgIG1lbnUtaWQ9JHtkaXRlbS5tZW51SWR9XHJcbiAgICAgICAgICAgICAgICAgICBsZWFmPSR7ZGl0ZW0ubGVhZn0+XHJcbiAgICAgICAgICAgICAgICAgICAke2RpdGVtLm5hbWV9PC9hPlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICBpZighZGl0ZW0ubGVhZikgXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IHJlY3Vyc2l2ZShkaXRlbS5tZW51SWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgIHJldHVybiBzdHIgIFxyXG4gICAgICAgIH0gXHJcblxyXG5cclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0cmVlRGF0YSApe1xyXG4gICAgICAgICAgICB2YXIgZWxlID0gYDxkaXYgY2xhc3M9XCJsaXN0LWl0ZW0gJHt0cmVlRGF0YVtrZXldLmlzQWN0aXZlP2BzZWxlY3RgOicnfVwiIGlkPSR7dHJlZURhdGFba2V5XS5tZW51SWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIG1lbnUtaWQ9JHt0cmVlRGF0YVtrZXldLm1lbnVJZH0gcGFyZW50bWVudS1pZD0ke3RyZWVEYXRhW2tleV0ucGFyZW50TWVudUlkfSBjbGFzcz1cImxpc3QtdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICR7dHJlZURhdGFba2V5XS5uYW1lfTwvYT5gO1xyXG4gICAgIFxyXG4gICAgICAgICAgICAvL+mBjeWOhuS6jOe6p+iPnOWNlVxyXG4gICAgICAgICAgICBlbGUgKz0gcmVjdXJzaXZlKHRyZWVEYXRhW2tleV0ubWVudUlkKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZWxlICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggJSAzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cC5lcSgwKS5hcHBlbmQoZWxlKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ICUgMyA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAuZXEoMSkuYXBwZW5kKGVsZSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCAlIDMgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGdyb3VwLmVxKDIpLmFwcGVuZChlbGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKGdyb3VwKS5maW5kKFwiLm1lbnUtdGV4dD5hW2xlYWY9J2ZhbHNlJ11cIikuaGlkZSgpO1xyXG4gICAgICAgIHJldHVybiAkKGdyb3VwKVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLy/muLLmn5PkuIDnuqfoj5zljZVcclxuICAgXHJcbiAgICBcclxuICAgICAvL+a4suafk+S6jOe6p+WSjOS4iee6p+iPnOWNlVxyXG4gICAgIFxyXG4gICAgIGZ1bmN0aW9uIG1hcFVwZGF0ZUNoaWxkcmVuTmFuKGlkLG1hcERhdGEsZG9tKXtcclxuICAgICAgIC8vICB2aXBzcGEuaW5kZXhJZD1pZDtcclxuICAgICAgICAgdmFyIHBhcmVudD1tYXBEYXRhW21hcERhdGFbaWRdLnBhcmVudE1lbnVJZF07IFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgIGlmKHBhcmVudCl7XHJcbiAgICAgICAgICAgICAgICBpZihwYXJlbnQucGFyZW50TWVudUlkIT09XCIwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudD1tYXBEYXRhW3BhcmVudC5wYXJlbnRNZW51SWRdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcGFyZW50PSBtYXBEYXRhW2lkXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICAgIGZ1bmN0aW9uIHRyZWUocGlkKXsgIFxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGE9W11cclxuICAgICAgICAgICAgICAgICBPYmplY3QudmFsdWVzKG1hcERhdGEpLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICBpZihwaWQgPT1pdGVtLnBhcmVudE1lbnVJZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgIGlmKCFpdGVtLmxlYWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jaGlsZHJlbj0gdHJlZShpdGVtLm1lbnVJZClcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwYXJlbnQuY2hpbGRyZW49IHRyZWUocGFyZW50Lm1lbnVJZCk7XHJcblxyXG4gICAgICAgIHZhciB0cmVlRGF0YT1wYXJlbnRcclxuICAgICAgICB2YXIgc2lkZWJhckxpPWA8dWwgY2xhc3M9XCJib2R5LW5hdlwiIHBhcmVudG1lbnUtaWQ9JHtwYXJlbnQubWVudUlkfSBuYW1lPSR7cGFyZW50Lm5hbWV9PmBcclxuICAgICAgICBcclxuICAgICAgICB0cmVlRGF0YT10cmVlRGF0YS5jaGlsZHJlbjtcclxuICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRyZWVEYXRhKXsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzaWRlYmFyTGkgKz0gYDxsaSBjbGFzcz1cIml0ZW0gaC1saW5rICR7dHJlZURhdGFba2V5XS5pc0FjdGl2ZT9gYWN0aXZlLXRoaXNgOicnfSAke3RyZWVEYXRhW2tleV0uaXNBY3RpdmUmJnRyZWVEYXRhW2tleV0uY2hpbGRyZW4/YGl0ZW1lZHNgOicnfVwiPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiJHt0cmVlRGF0YVtrZXldLmJsYW5rP3RyZWVEYXRhW2tleV0ucGF0aDoodHJlZURhdGFba2V5XS5oYXNoP1wiI1wiK3RyZWVEYXRhW2tleV0uaGFzaDpcImphdmFzY3JpcHQ6O1wiKX1cIiAgJHt0cmVlRGF0YVtrZXldLmJsYW5rP2B0YXJnZXQ9X2JsYW5rYDpcIlwifSBtZW51LWlkPSR7dHJlZURhdGFba2V5XS5tZW51SWR9IGxlYWY9XCIke3RyZWVEYXRhW2tleV0ubGVhZn1cIiBsZXZlbD1cIiR7dHJlZURhdGFba2V5XS5sZXZlbH1cIj4ke3RyZWVEYXRhW2tleV0ubmFtZX1cclxuICAgICAgICAgICAgJHsodHJlZURhdGFba2V5XS5jaGlsZHJlbiYmIXRyZWVEYXRhW2tleV0ubGVhZik/YDxpIGNsYXNzPVwicmlnaHQtbW92ZXIgbGF5dWktaWNvbiBsYXl1aS1pY29uLXJpZ2h0XCI+PC9pPmA6Jyd9IFxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICR7KHRyZWVEYXRhW2tleV0uY2hpbGRyZW4mJiF0cmVlRGF0YVtrZXldLmxlYWYpP1xyXG4gICAgICAgICAgICAgICAgICBgPGRsIGNsYXNzPVwibmF2LWNoaWxkXCIgcGFyZW50bWVudS1pZD0ke3RyZWVEYXRhW2tleV0ubWVudUlkfT4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHsgdHJlZURhdGFba2V5XS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24oY2hpbGRJdGVtLGluZGV4LGFycil7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGQgJHtjaGlsZEl0ZW0uaXNBY3RpdmU/YGNsYXNzPVwiYWN0aXZlLXRoaXNcImA6Jyd9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj0ke2NoaWxkSXRlbS5ibGFuaz9jaGlsZEl0ZW0ucGF0aDooY2hpbGRJdGVtLmhhc2g/XCIjXCIrY2hpbGRJdGVtLmhhc2g6XCJqYXZhc2NyaXB0OjtcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2NoaWxkSXRlbS5ibGFuaz9gdGFyZ2V0PV9ibGFua2A6XCJcIn0gbGVhZj0ke2NoaWxkSXRlbS5sZWFmfSBtZW51LWlkPSR7Y2hpbGRJdGVtLm1lbnVJZH0gIGxldmVsPSR7Y2hpbGRJdGVtLmxldmVsfT4ke2NoaWxkSXRlbS5uYW1lfTwvYT48L2RkPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuam9pbihcIlwiKSB9ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICA8L2RsPmAgICAgICAgICBcclxuICAgICAgICAgICAgOicnfSBcclxuICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaWRlYmFyTGkrPWA8L3VsPmBcclxuICAgICAgICBkb20mJmRvbS5ib2R5TmF2Lmh0bWwoc2lkZWJhckxpKTtcclxuICAgICAgICByZXR1cm4gc2lkZWJhckxpXHJcblxyXG4gICAgIH1cclxuXHJcblxyXG4gICAgLy/mkbjniYhcclxuICAgIC8v5riy5p+T5LiA57qn6I+c5Y2VXHJcbiAgICBmdW5jdGlvbiBtYXBVcGRhdGVNYWluTmF2KG1hcERhdGEpe1xyXG4gICAgICAgIHZhciBzaWRlYmFyTGk9XCJcIlxyXG4gICAgICAgICAgT2JqZWN0LnZhbHVlcyhtYXBEYXRhKS5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0ucGFyZW50TWVudUlkPT1cIjBcIil7XHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyTGkrPSAgIGA8bGkgY2xhc3M9XCJzLWl0ZW0gJHtpdGVtLmlzQWN0aXZlP2BhY3RpdmVgOicnfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWJveFwiPjxpIGNsYXNzPVwiJHtpdGVtLmltYWdlUGF0aH1cIj48L2k+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZXVuLW5hbWVcIj48YSBocmVmPVwiJHtpdGVtLmxlYWY/XCIjXCIraXRlbS5oYXNoOmBqYXZhc2NyaXB0OjtgfVwiICBtZW51LWlkPSR7aXRlbS5tZW51SWR9PiR7aXRlbS5uYW1lfTwvYT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2xpPmBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiBzaWRlYmFyTGlcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBUZW1wbGF0ZU1hcChtYXBEYXRhLG9wdHMpe1xyXG4gICAgICAgIGlmKCFtYXBEYXRhKXtcclxuICAgICAgICAgICAgbWFwRGF0YT1bXSAgICBcclxuICAgICAgICB9ICAgXHJcblxyXG5cclxuICAgICAgICAgICAgLy/kuIDnuqfoj5zljZVcclxuICAgICAgICAgICAgdmFyIHNpZGViYXJMaT1tYXBVcGRhdGVNYWluTmF2KG1hcERhdGEpO1xyXG4gICAgICAgICAgICAvL+aJk+W8gOWFqOmDqOeahOiPnOWNlVxyXG4gICAgICAgICAgICAgdmFyIGdyb3VwPW1hcFJlc2V0T3Blbk1lbnVMaXN0KG1hcERhdGEpO1xyXG4gIFxyXG4gICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHZpcHNwYS5pbmRleElkKVxyXG5cclxuICAgICAgICAgICAgdmFyIHRwbD0kKGA8ZGl2IGNsYXNzPVwicGxnLXNpZGViYXJcIj4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbi1uYXZcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtZXVuU29yb2xsXCIgY2xhc3M9XCJsYXl1aS1zaWRlLXNjcm9sbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWxvZ29cIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibG9nby1wYXRoICR7b3B0cy5sb2dvPT0ncGxnJyYmJ3BsZy1sb2dvJ31cIiA+PC9hPiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBpZD1cInBsZy1sb2dvLWZvbGRcIiBjbGFzcz1cImFudGljb24gbGF5dWktaWNvbiBsYXl1aS1pY29uLXNocmluay1yaWdodFwiPjwvaT4gICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgICBcclxuICAgICAgICAgICAgICAgICAgICA8IS0tIOW3puS+p+aJk+W8gOWFqOmDqOWvvOiIquWMuuWfnyAtLT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItb3BlblwiIGRhdGEtdHlwZT1cImhvb3QtY2xpY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWxheWVyLXNldHdpblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLWljb24tY2xvc2VcIiBocmVmPVwiamF2YXNjcmlwdDo7XCI+PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByLXNlYXJjaFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwci1pY29uLXNlYXJjaC13cmFwcGVyXCI+PGkgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLWljb24tc2VhcmNoXHJcbiAgICAgICAgICAgIFwiPjwvaT48L3NwYW4+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJzZWxlY3RJbnB1dFwiIGNsYXNzPVwicHItc2VhcmNoLWlucHV0XCIgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXlhbPplK7or41cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtdGlwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHNwYW4+5Lul5LiL5piv5LiO4oCcPHN0cm9uZz48L3N0cm9uZz7igJ3nm7jlhbPnmoTkuqflk4HvvJo8L3NwYW4+PC9wPjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwia2V5VXBMaXN0XCIgY2xhc3M9XCJrZXlVcExpc3RcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1tZXVuZ3JvdXAtbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0g5YWo6YOo6I+c5Y2V5YiX6KGoLS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjcm9sbC1uYXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJyaWdodC1zaWRlYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3NpZGViYXJMaX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1hbGxcIiBkYXRhLXR5cGU9XCJob290LWNsaWNrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250IHAtaWNvbi1hbGxcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1ldW4tbmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSAgaHJlZj1cImphdmFzY3JpcHQ6O1wiPuaJgOacieacjeWKoTwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJyaWdodC1tb3ZlciBsYXl1aS1pY29uIGxheXVpLWljb24tcmlnaHRcclxuICAgICAgICAgICAgXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWxhc3RcIiBkYXRhLXNob3c9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGlkPVwic2lkZWJhclwiIGNsYXNzPVwic2lkZWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0t5LiA57qn6I+c5Y2VLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICR7c2lkZWJhckxpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWhvdmVyLWNoaWxkXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIOS6jOe6p+iPnOWNlSAtLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLXNpZGVcIj4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIOW9k+WJjWhvdmVy5LqM57qn6I+c5Y2V5YiX6KGoLS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dmlwc3BhLmluZGV4SWQ/bWFwVXBkYXRlQ2hpbGRyZW5OYW4odmlwc3BhLmluZGV4SWQsbWFwRGF0YSk6XCJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCApO1xyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICBcclxuICAgICAgICAgIHRwbC5maW5kKFwiLnByLW1ldW5ncm91cC1saXN0XCIpLmFwcGVuZChncm91cCk7ICAgICBcclxuICAgICAgICByZXR1cm4gJCh0cGwpXHJcbiAgICAgICAgXHJcbiAgICAgfVxyXG4gXHJcblxyXG5cclxuICAgIHZhciBwbGdTaWRlYmFyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLm9wdGlvbnM9b3B0aW9ucztcclxuICAgICAgICB2YXIgY29uZmlnPXtcclxuICAgICAgICAgICAgcmVuZGVyZXI6bnVsbCxcclxuICAgICAgICAgICAgdXJsOm51bGwsXHJcbiAgICAgICAgICAgIGFqYXhJbml0OntcclxuICAgICAgICAgICAgICAgIHVybDpudWxsLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcImdldFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxvZ286XCJcIixcclxuICAgICAgICAgICAgcm91dGU6ZmFsc2UsXHJcbiAgICAgICAgICAgIG1lbnVDbGljazpudWxsLFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluaVsOaNruWFpeWPo1xyXG4gICAgICAgIF90aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCBjb25maWcsIF90aGlzLm9wdGlvbnMpO1xyXG5cclxuXHJcbiAgICAgICAgLy/ojrflj5bmlbDmja5cclxuICAgICAgICB2YXIgbG9hZGRhdGE9TG9hZERhdGEuY2FsbCh0aGlzLF90aGlzLm9wdGlvbnMuYWpheEluaXQpO1xyXG4gICAgIC8vICAgdmlwc3BhLnRyZWVEYXRhID0gbG9hZGRhdGEudHJlZURhdGE7XHJcbiAgXHJcbiAgXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModmlwc3BhLCB7XHJcbiAgICAgICBcclxuICAgICAgICAgICAgbWFwRGF0YTp7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAgbG9hZGRhdGEubWFwRGF0YVxyXG4gICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgc2V0OmZ1bmN0aW9uKG5ld1ZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHsgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpcHNwYS5pbmRleElkID12aXBzcGEucm91dGVyTWFwW3ZpcHNwYS5wYXJzZShsb2NhdGlvbi5oYXNoKS51cmxdLm1lbnVJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvciggXCJ2aXBzcGEucm91dGVyLmRlZmF1bHRzOmhhc2ggb2YgZXJyb3JcIiApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb2N1bWVudCA9IFRlbXBsYXRlTWFwKG5ld1ZhbHVlLF90aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbml0KF90aGlzLmRvY3VtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMub3B0aW9ucy5yZW5kZXJlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbmRlclRvKF90aGlzLm9wdGlvbnMucmVuZGVyZXIpO1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgLy8gbG9hZGRhdGEudHJlZURhdGFbX3RoaXMub3B0aW9ucy5pbmRleF0uaXNBY3RpdmU9dHJ1ZTtcclxuICAgICAgLy8gdmlwc3BhLnRyZWVEYXRhPWxvYWRkYXRhLnRyZWVEYXRhIDtcclxuICAgICAvLyAgIHZpcHNwYS5tYXBEYXRhPWxvYWRkYXRhLm1hcERhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5LqL5Lu255uR5ZCsXHJcbiAgICBmdW5jdGlvbiBFdmVudEhhbmxkZXIoZG9tKXtcclxuICAgICAgICB2YXIgX3RoaXM9dGhpc1xyXG4gICAgICAgIHZhciBvcHRzPXRoaXMub3B0aW9ucztcclxuICAgICAvLyAgIHZhciB0cmVlRGF0YT0gdmlwc3BhLnRyZWVEYXRhO1xyXG4gICAgICAgIHZhciBtYXBEYXRhPSB2aXBzcGEubWFwRGF0YTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9tLm1ldW5Tb3JvbGwuaGFzQ2xhc3MoXCJzaG93TGlzdFwiKSAmJiByZW1vdmVyU2hvd0xpc3QoZG9tLm1ldW5Tb3JvbGwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgIC8v5o6n5Yi26I+c5Y2V5bGV5byA5pS257ypXHJcbiAgICAgICAgIGRvbS5sb2dvRm9sZC5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoXCJsYXl1aS1pY29uLXNocmluay1yaWdodFwiKSkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImxheXVpLWljb24tc2hyaW5rLXJpZ2h0XCIpLmFkZENsYXNzKFwibGF5dWktaWNvbi1zcHJlYWQtbGVmdFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwicGxnLW9wZW4taG92ZXJcIik7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImxheXVpLWljb24tc3ByZWFkLWxlZnRcIikuYWRkQ2xhc3MoXCJsYXl1aS1pY29uLXNocmluay1yaWdodFwiKTtcclxuICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwicGxnLW9wZW4taG92ZXJcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgIC8v5o6n5Yi26I+c5Y2VaG92ZXJcclxuICAgICAgICBkb20ubmF2TGFzdC5ob3ZlcihmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGlkPSAkKHRoaXMpLmZpbmQoXCJsaS5zLWl0ZW0uYWN0aXZlIGFcIikuYXR0cihcIm1lbnUtaWRcIik7XHJcbiAgICAgICAgICAgIGlmKGlkJiZ2aXBzcGEubWFwRGF0YVtpZF0ubGVhZil7XHJcbiAgICAgICAgICAgICAgICBkb20ubmF2TGFzdC5hdHRyKFwiZGF0YS1zaG93XCIsIFwiXCIpXHJcbiAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgcmVtb3ZlclNob3dMaXN0KGRvbS5tZXVuU29yb2xsKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1zaG93XCIsIFwic2hvdy1jaGlsZFwiKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXNob3dcIiwgXCJcIilcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8v5omT5byA5omA5pyJ6I+c5Y2V54K55Ye75LqL5Lu2XHJcbiAgICAgICAgZG9tLnByTGVmdC5vbihcImNsaWNrXCIsXCIubWVudS10ZXh0ID4gYVwiLGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIGxvY2F0aW9uLmhhc2g9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgICAgIHZhciBpZD0gJCh0aGlzKS5hdHRyKFwibWVudS1pZFwiKTtcclxuICAgICAgICAgICAgdmFyIHBpZD0gJCh0aGlzKS5hdHRyKFwicGFyZW50bWVudS1pZFwiKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc3VsdChwaWQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iaj1tYXBEYXRhW3BpZF1cclxuICAgICAgICAgICAgICAgIGlmKG9iai5wYXJlbnRNZW51SWQhPT1cIjBcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQob2JqLnBhcmVudE1lbnVJZClcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgXHJcbiAgICAgICAgICAgICBtYXBVcGRhdGVDaGlsZHJlbk5hbihpZCxtYXBEYXRhLGRvbSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBzbGZlPSBkb20uYm9keU5hdi5maW5kKGBhW21lbnUtaWQ9JyR7aWR9J11gKTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgIC8vIGFyci51bnNoaWZ0KHNsZmUudGV4dCgpLnJlcGxhY2UoL1tcXCBcXHJcXG5dL2csXCJcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzbGZlLnBhcmVudCgpLmlzKFwiZGRcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Fyci51bnNoaWZ0KHNsZmUucGFyZW50cyhcImRsLm5hdi1jaGlsZFwiKS5wcmV2KCkudGV4dCgpLnJlcGxhY2UoL1tcXCBcXHJcXG5dL2csXCJcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsZmUucGFyZW50cyhcImxpLml0ZW0gXCIpLmFkZENsYXNzKFwiaXRlbWVkc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGZlLnBhcmVudHMoXCJkbC5uYXYtY2hpbGRcIikuc2hvdygpXHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgIC8vYXJyLnVuc2hpZnQoc2xmZS5wYXJlbnRzKFwiLmJvZHktbmF2XCIpLmF0dHIoXCJuYW1lXCIpLnJlcGxhY2UoL1tcXCBcXHJcXG5dL2csXCJcIikpICBcclxuICAgICAgICAgICAgICAgICBzbGZlLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlLXRoaXNcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS10aGlzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpZFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwaWQ9cmVzdWx0KHBpZCk7XHJcbiAgICAgICAgICAgIHJlbW92ZXJTaG93TGlzdChkb20ubWV1blNvcm9sbCk7XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5LiA57qn6I+c5Y2V5LqL5Lu2XHJcbiAgICAgICAgZG9tLnNpZGViYXIub24oXCJjbGlja1wiLFwibGlcIixmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgdmFyIGlkPSAkKHRoaXMpLmZpbmQoXCJhXCIpLmF0dHIoXCJtZW51LWlkXCIpO1xyXG4gICAgICAgICAgIHZhciBpPSQodGhpcykuaW5kZXgoKTtcclxuICAgICAgICAgIC8vIGRvbS5zaWRlYmFyLmVtcHR5KCkuYXBwZW5kKHVwZGF0ZU1haW5OYXYodHJlZURhdGEpKVxyXG4gICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgb3B0cy5pbmRleD1pO1xyXG4gICAgICAgICAgIGlmKHZpcHNwYS5tYXBEYXRhW2lkXS5sZWFmKXtcclxuICAgICAgICAgICAgZG9tLm5hdkxhc3QuYXR0cihcImRhdGEtc2hvd1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaD0kKHRoaXMpLmZpbmQoXCJhXCIpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgfSBcclxuICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgIGRvbS5uYXZMYXN0LmF0dHIoXCJkYXRhLXNob3dcIixcIlwiKTtcclxuICAgICAgICAgICBtYXBVcGRhdGVDaGlsZHJlbk5hbihpZCxtYXBEYXRhLGRvbSk7XHJcbiAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgIGRvbS5uYXZMYXN0LmF0dHIoXCJkYXRhLXNob3dcIixcInNob3ctY2hpbGRcIik7XHJcbiAgICAgICAgICAgfSwgMjAwKVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pICBcclxuXHJcbiAgICAgICAgICAgLy/ngrnlh7vkuoznuqdob3ZlcuiPnOWNleS6i+S7tlxyXG4gICAgICAgIGRvbS5ib2R5TmF2Lm9uKFwiY2xpY2tcIiwgXCJsaT5hXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy/pmLvmraLkuovku7blhpLms6FcclxuICAgICAgICAgICAgdmFyIHNsZmUgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBsZWFmID0gKHNsZmUuYXR0cihcImxlYWZcIikpID09IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICBjaGlsZCA9IHNsZmUuc2libGluZ3MoXCJkbC5uYXYtY2hpbGRcIik7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2xmZS5wYXJlbnQoKS5hZGRDbGFzcyhcImFjdGl2ZS10aGlzXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmUtdGhpc1wiKS5maW5kKCdkZCcpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLXRoaXNcIikucmVtb3ZlQ2xhc3MoXCJpdGVtZWRzXCIpO1xyXG4gICAgICAgICAgICBvcHRzLm1lbnVDbGljayYmb3B0cy5tZW51Q2xpY2soc2xmZSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChzbGZlLnBhcmVudCgpLmlzKFwiZGRcIikpIHtcclxuICAgICAgICAgICAgICAgIHNsZmUucGFyZW50cyhcImxpLml0ZW1cIikuYWRkQ2xhc3MoXCJhY3RpdmUtdGhpc1wiKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLXRoaXNcIikucmVtb3ZlQ2xhc3MoXCJpdGVtZWRzXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v5aaC5p6c5piv5LqM57qn6I+c5Y2VXHJcbiAgICAgICAgICAgIGlmICghbGVhZiAmJiBjaGlsZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzbGZlLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlLXRoaXNcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS10aGlzXCIpLnJlbW92ZUNsYXNzKFwiaXRlbWVkc1wiKVxyXG4gICAgICAgICAgICAgICAgY2hpbGQuc2xpZGVUb2dnbGUoXCJmYXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgc2xmZS5wYXJlbnQoKS50b2dnbGVDbGFzcyhcIml0ZW1lZHNcIikuc2libGluZ3MoKS5jaGlsZHJlbignLm5hdi1jaGlsZCcpLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZigkKHRoaXMpLmF0dHIoXCJ0YXJnZXRcIik9PVwiX2JsYW5rXCIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoICQodGhpcykuYXR0cihcImhyZWZcIikhPT1cImphdmFzY3JpcHQ6O1wiKXtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICAgIC8vICB2aXBzcGEuaW5kZXhJZD1zbGZlLmF0dHIoXCJtZW51LWlkXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgLy8gIHZhciBhcnI9W107aXRlbWVkc1xyXG4gICAgICAgICAgXHJcbiAgIFxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICBkb20ubWV1blNvcm9sbC5vbihcImNsaWNrXCIsIFwiW2RhdGEtdHlwZT0naG9vdC1jbGljayddXCIsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy/pmLvmraLkuovku7blhpLms6FcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIGV2ZSA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgc3dpdGNoICgkKHRoaXMpLmF0dHIoXCJjbGFzc1wiKSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicHJvZHVjdC1hbGxcIjovL+WFs+mXrSDlsI9YXHJcbiAgICAgICAgICAgICAgICBkb20ubWV1blNvcm9sbC50b2dnbGVDbGFzcyhcInNob3dMaXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicHItb3BlblwiOi8v5rua5YqoXHJcbiAgICAgICAgICAgICAgICBldmUucGFyZW50Tm9kZS5jbGFzc05hbWUgPT0gXCJsYXl1aS1sYXllci1zZXR3aW5cIiAmJiByZW1vdmVyU2hvd0xpc3QoZG9tLm1ldW5Tb3JvbGwpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1ldW5Ub3AgPSBtZXVuVG9wT2JqKGRvbS5tZXVuZ3JvdXBMaXN0KTtcclxuICAgICAgICAgICAgICAgIHZhciBzSXRlbSA9ICQoZXZlKS5wYXJlbnRzKFwiLnMtaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aGlzSHJlZiA9IHNJdGVtLmZpbmQoXCJhXCIpLmF0dHIoXCJtZW51LWlkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBkb20ubWV1bmdyb3VwTGlzdC5maW5kKFwiLmxpc3QtaXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIHNJdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKCkgXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgbGlzdC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpWzBdLmlkID09IHRoaXNIcmVmID8gJCh0aGlzKS5hZGRDbGFzcyhcInNlbGVjdFwiKSA6ICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzZWxlY3RcIik7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtZXVuVG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChrZXkpID09IHRoaXNIcmVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIucHItbGVmdFwiKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogbWV1blRvcFtrZXldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pCc57Si5p2h5LqL5Lu2XHJcbiAgICBmdW5jdGlvbiBzZXRPcGVuS2V5dXAoZG9tKXtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcmVnQ0ggPSBuZXcgUmVnRXhwKFwiW1xcXFx1NEUwMC1cXFxcdTlGRkZdK1wiLCBcImdcIik7XHJcbiAgICAgICAgIHZhciBrZXlVcExpc3QgPWRvbS5wckxlZnQuZmluZChcIiNrZXlVcExpc3RcIik7XHJcbiAgICAgICAgIHZhciBsaXN0PWRvbS5tZXVuZ3JvdXBMaXN0LmZpbmQoXCIubWVudS10ZXh0XCIpO1xyXG4gICAgICAgICAgZG9tLm1ldW5Tb3JvbGwuZmluZChcIiNzZWxlY3RJbnB1dFwiKS5rZXl1cChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHRpcCA9ICQodGhpcykubmV4dChcIi5zZWFyY2gtdGlwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGlwLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkb20ubWV1bmdyb3VwTGlzdC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5VXBMaXN0Lmh0bWwoXCJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy/ovpPlhaXmoYbkuK3msqHmnInlhoXlrrnvvIzliJnpgIDlh7pcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXAuc2hvdygpLmZpbmQoXCJzdHJvbmdcIikudGV4dCh2YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGRvbS5tZXVuZ3JvdXBMaXN0LmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBrZXlVcExpc3QuaHRtbChcIlwiKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgbGlzdC5lYWNoKGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSByZWdDSC50ZXN0KHZhbCkgPyAkKGl0ZW0pLmZpbmQoXCJhXCIpLnRleHQoKS5pbmRleE9mKHZhbCkgOiAkKGl0ZW0pLmF0dHIoXCJweS1jb2RlXCIpLmluZGV4T2YodmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ciA+PSAwICYmICQoaXRlbSkuZmluZChcImFcIikuYXR0cihcImxlYWZcIikgPT0gXCJ0cnVlXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleVVwTGlzdC5hcHBlbmQoYDxkaXYgY2xhc3M9XCJwci1tZXVuLWdyb3VwXCI+PGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiPiR7aXRlbS5vdXRlckhUTUx9PC9kaXY+PC9kaXY+YClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAgIC8v6I635Y+W6I+c5Y2VdG9w5YC8XHJcbiAgICBmdW5jdGlvbiBtZXVuVG9wT2JqIChtZXVuZ3JvdXBMaXN0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbGlzdCA9IG1ldW5ncm91cExpc3QuZmluZChcIi5saXN0LWl0ZW1cIik7XHJcbiAgICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICBsaXN0LmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBpdGVtLmlkO1xyXG4gICAgICAgICAgICBvYmpba2V5XSA9IHBhcnNlSW50KGl0ZW0ub2Zmc2V0VG9wKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVyU2hvd0xpc3QoZG9tLGNsYXNzTmFtZSl7XHJcbiAgICAgICAgICAgIGlmKCFjbGFzc05hbWUpe1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2hvd0xpc3RcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwbGdTaWRlYmFyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKGRvY3VtZW50KSB7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciAkZG9tPXtcclxuICAgICAgICAgICAgc2lkZWJhcjogZG9jdW1lbnQuZmluZChcIiNzaWRlYmFyXCIpLFxyXG4gICAgICAgICAgICBsb2dvRm9sZDogZG9jdW1lbnQuZmluZChcIiNwbGctbG9nby1mb2xkXCIpLFxyXG4gICAgICAgICAgICBtZXVuU29yb2xsOiBkb2N1bWVudC5maW5kKFwiI21ldW5Tb3JvbGxcIiksXHJcbiAgICAgICAgICAgIG5hdkxhc3Q6IGRvY3VtZW50LmZpbmQoXCIjbWV1blNvcm9sbCAubmF2LWxhc3RcIiksXHJcbiAgICAgICAgICAgIGJvZHlOYXY6IGRvY3VtZW50LmZpbmQoXCIubmF2LWhvdmVyLWNoaWxkIC5sYXl1aS1zaWRlXCIpLFxyXG4gICAgICAgICAgICBtZXVuZ3JvdXBMaXN0OiBkb2N1bWVudC5maW5kKFwiLnByLW1ldW5ncm91cC1saXN0XCIpLFxyXG4gICAgICAgICAgICBwckxlZnQ6IGRvY3VtZW50LmZpbmQoXCIucHItbGVmdFwiKSxcclxuICAgICAgICAgICAgbmF2X2hvdmVyX2NoaWxkOiBkb2N1bWVudC5maW5kKFwiLm5hdi1ob3Zlci1jaGlsZFwiKSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LqL5Lu25rOo5YaMXHJcbiAgICAgICAgRXZlbnRIYW5sZGVyLmNhbGwoX3RoaXMsJGRvbSk7XHJcbiAgICAgICAgc2V0T3BlbktleXVwKCRkb20pXHJcbiAgICAgICAgcmV0dXJuIF90aGlzXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8v54aP5p+T5qih5p2/5Yiw6IqC54K5XHJcbiAgICBwbGdTaWRlYmFyLnByb3RvdHlwZS5yZW5kZXJUbyA9IGZ1bmN0aW9uIChkb21JZCkge1xyXG5cclxuICAgICAgICAgICB0aGlzLm9wdGlvbnMucmVuZGVyZXI9ZG9tSWQ7XHJcbiAgICAgICAgICAkKFwiI1wiKyB0aGlzLm9wdGlvbnMucmVuZGVyZXIpLmVtcHR5KCkuYXBwZW5kKHRoaXMuZG9jdW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9O1xyXG5cclxuICBcclxuICAgICAvL+ivt+axguaVsOaNrlxyXG4gICAgIGZ1bmN0aW9uIExvYWREYXRhKG9iamVjdCkge1xyXG4gICAgICAgICB2YXIgX3RoaXM9dGhpcztcclxuICAgICAgICAgdmFyIHJvdXRlU2V0dGluZz17fTtcclxuICAgICAgICB2YXIgY2xvc2U9UGxnRGlhbG9nLmxvYWRpbmcyKCk7XHJcbiAgICAgICAgdmFyIHRyZWVkYXRhO1xyXG4gICAgICAgIG9iamVjdC5zdWNjZXNzPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmVlZGF0YT10b1RyZWUocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLmJsYW5rKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uUFlfY29kZSA9IHBpbnlpbi5tYWtlUHkoaXRlbS5uYW1lKVswXVxyXG4gICAgICAgICAgICAgICAgICAgLy8gaXRlbS5pc0FjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmxlYWYmJml0ZW0ucGF0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5Y676aaW5a2X5q+NXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJ6YWNaGFzaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighaXRlbS5oYXNoKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc2g9aXRlbS5wYXRoLnN1YnN0cigxKS5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc2g9aXRlbS5oYXNoW2l0ZW0uaGFzaC5sZW5ndGgtMl0rXCIvXCIraXRlbS5oYXNoW2l0ZW0uaGFzaC5sZW5ndGgtMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uaGFzaC5pbmRleE9mKFwiPVwiKSE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGFzaD0gaXRlbS5oYXNoLm1hdGNoKFwiKFtePV0rKSRcIilbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaj1yZXN1bHROYW1lKGl0ZW0ubWVudUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVTZXR0aW5nW2l0ZW0uaGFzaF09e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOml0ZW0uaWZyYW1lP2l0ZW0ucGF0aDppdGVtLnBhdGgrXCIuaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmcmFtZTppdGVtLmlmcmFtZXx8ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjppdGVtLnNyY1BhdGg/aXRlbS5zcmNQYXRoK1wiLmpzXCI6bnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOml0ZW0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51SWQ6aXRlbS5tZW51SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50X25hbWU6b2JqLmFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZUFycjpvYmouaWRhcnIgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqPW51bGw7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlc3VsdE5hbWUobWlkLGFycj1bXSxpZGFycj1bXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcERhdGE9IHRyZWVkYXRhLm1hcERhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW09bWFwRGF0YVttaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICBhcnIudW5zaGlmdChpdGVtLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICBpZGFyci51bnNoaWZ0KGl0ZW0ubWVudUlkKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnBhcmVudE1lbnVJZCE9MCl7ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHROYW1lKGl0ZW0ucGFyZW50TWVudUlkLGFycixpZGFycilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7YXJyOmFycixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRhcnI6aWRhcnIgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgLy/ot6/nlLHphY3nva5cclxuICAgICAgICAgICAgICAgICAgIHZpcHNwYS5yb3V0ZXJNYXAgPXJvdXRlU2V0dGluZyBcclxuICAgICAgICAgICAgICAgICAgIC8vT2JqZWN0LmFzc2lnbiggdmlwc3BhLnJvdXRlck1hcCxyb3V0ZVNldHRpbmcpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxheWVyLm1zZyhcIuaVsOaNruWKoOi9veWksei0pSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLFxyXG4gICAgICAgIG9iamVjdC5lcnJvcj0gZnVuY3Rpb24gKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQcm9sb2cuc3luY0FqYXgob2JqZWN0KVxyXG4gICAgICAgIHJldHVybiB0cmVlZGF0YVxyXG4gICAgfTtcclxuXHJcbiAgICAvL+i/lOWKoOagkeWei+e7k+aehOWvueixoVxyXG4gICAgZnVuY3Rpb24gdG9UcmVlKGRhdGEpIHtcclxuICAgICAgICAvLyDliKDpmaQg5omA5pyJIGNoaWxkcmVuLOS7pemYsuatouWkmuasoeiwg+eUqFxyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBkZWxldGUgaXRlbS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHlwZTtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0ucXVlcnlJZDtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0ub3BlcmF0ZVR5cGU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLmxhc3RNb2RpZnlUaW1lO1xyXG4gICAgICAgICAgICBkZWxldGUgaXRlbS5oZWxwQ29kZTtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0uY3JlYXRvck5hbWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLmNyZWF0b3JJZDtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0uY3JlYXRlVGltZTtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0ubW9kaWZpZXJJZDtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0ubW9kaWZpZXJOYW1lO1xyXG4gICAgICAgICAgICBkZWxldGUgaXRlbS5zb3J0O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlsIbmlbDmja7lrZjlgqjkuLog5LulIG1lbnVJZCDkuLogS0VZIOeahCBtYXAg57Si5byV5pWw5o2u5YiXXHJcbiAgICAgICAgdmFyIG1hcCA9IHt9O1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBtYXBbaXRlbS5tZW51SWRdID0gaXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWFwRGF0YTptYXBcclxuXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHdpbmRvdy5QbGdTaWRlQWNjb3JkaW9uUm91dGUgPSBwbGdTaWRlYmFyO1xyXG5cclxuICAgICQuZm4uaW5pdFBsZ1NpZGVBY2NvcmRpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAvKiAgdmFyIGNsb3NlTG9hZD0gbG9hZGluZygpOyAqL1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IHBsZ1NpZGViYXIodGhpcywgb3B0aW9ucyk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG59KShqUXVlcnkpOyIsIjtcclxuKGZ1bmN0aW9uICgkLCBsYXl1aSkge1xyXG5cclxuICAgIC8vUGxnVGFicy5qc1xyXG4gICAgbGF5dWkudXNlKFtcImVsZW1lbnRcIl0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGxheXVpLmVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24gKG9wdHMpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBza2luQXJyID0ge1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsOiBcImxheXVpLXRhYlwiLFxyXG4gICAgICAgICAgICAgICAgYnJpZWY6IFwibGF5dWktdGFiIGxheXVpLXRhYi1icmllZlwiLFxyXG4gICAgICAgICAgICAgICAgY2FyZDogXCJsYXl1aS10YWIgbGF5dWktdGFiLWNhcmRcIixcclxuICAgICAgICAgICAgICAgIHBsZ3RhYnM6IFwibGF5dWktdGFiIGxheXVpLXRhYi1icmllZiBwbGd0YWJzIFwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGl0ZW1saXN0ID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJwID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmEgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW54ZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnAgKz0gYDxsaSBsYXktaWQgPSAke2l0ZW0uaWR9IGNsYXNzPVwiJHtvcHRzLmluZGV4QWN0aXZlPT09aW54ZXggP1wibGF5dWktdGhpc1wiOlwiXCJ9XCIgPiR7aXRlbS50aXRsZX08L2xpPmA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYSArPSBgPGRpdiBjbGFzcz1cImxheXVpLXRhYi1pdGVtICAke29wdHMuaW5kZXhBY3RpdmU9PT1pbnhleCA/XCJsYXl1aS1zaG93XCI6XCJcIn1cIiBkYXRhLWZhZGU9XCJcIj4ke2l0ZW0udGVtcGxhdGV9PC9kaXY+YFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBycCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogcmFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGl0ZW1saXN0ID0gaXRlbWxpc3Qob3B0cy5jb250ZW50KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbG9zZUJ0biA9IGBcclxuICAgICAgICAgICAgPHVsIGNsYXNzPVwicGxnLXRhYi1jbG9zZS1hbGxcIiBsYXktZmlsdGVyPVwicGxnLXRhYi1jbG9zZS1hbGxcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLXRhYi1jbG9zZS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiBjbGFzcz1cImxheXVpLWljb24gbGF5dWktaWNvbi1tb3JlXCI+PC9hPlxyXG4gICAgICAgICAgICAgICAgIDxkbCBjbGFzcz1cImNoaWxkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkZD48YSBocmVmPVwiamF2YXNjcmlwdDo7XCI+5YWz6Zet5YW25a6D5qCH562+6aG1PC9hPjwvZGQ+XHJcbiAgICAgICAgICAgICAgICAgIDxkZD48YSBocmVmPVwiamF2YXNjcmlwdDo7XCI+5YWz6Zet5b2T5YmN5qCH562+6aG1PC9hPjwvZGQ+XHJcbiAgICAgICAgICAgICAgICAgIDxkZD48YSBocmVmPVwiamF2YXNjcmlwdDo7XCI+5YWz6Zet5omA5pyJ5qCH562+6aG1PC9hPjwvZGQ+XHJcbiAgICAgICAgICAgICAgICA8L2RsPiAgIFxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5gO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRwID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7c2tpbkFycltvcHRzLnNraW5dfVwiICR7b3B0cy5hbGxvd0Nsb3NlP2BsYXktYWxsb3dDbG9zZT1cInRydWVcImA6XCJcIn0gXHJcbiAgICAgICAgICAgICAgICAgICAgJHtvcHRzLmZpbHRlcj9gbGF5LWZpbHRlcj1cImArb3B0cy5maWx0ZXIrYFwiYDpcIlwifT5cclxuICAgICAgICAgICAgICAgICAgICAke29wdHMuY2xvc2VBbGw/Y2xvc2VCdG46XCJcIn1cclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJsYXl1aS10YWItdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS10YWItY29udGVudFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgICAgcmV0dXJuICQodHApXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHZhciBwbGdUYWJzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgX3RoaXMucHJlSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgIHRpbWU6IDEwMCxcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBcInBsZ1RhYnMtXCIgKyBQcm9sb2cuY3JlYXRlUmFuZG9tSWQoKSwgLy/pgInmi6nlmahcclxuICAgICAgICAgICAgICAgIGluZGV4QWN0aXZlOiAwLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VBbGw6IGZhbHNlLCAvL+aYr+WQpuaYvuekuuWFs+mXreWFqOmDqOaMiemSrlxyXG4gICAgICAgICAgICAgICAgc2tpbjogXCJicmllZlwiLFxyXG4gICAgICAgICAgICAgICAgZmFkZUluOiBmYWxzZSwgLy/mmK/lkKblvIDlkK/mu5HliqjliIfmjaJcclxuICAgICAgICAgICAgICAgIGFsbG93Q2xvc2U6IGZhbHNlLCAvL+aYr+WQpuW4puWIoOmZpFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogW1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOm51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6XCJsYXktXCIrIFByb2xvZy5jcmVhdGVSYW5kb21JZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOm51bGwgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZWxlLCBvcHQ7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5pWw5o2u5YWl5Y+jXHJcbiAgICAgICAgICAgIG9wdCA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQgPT09IFwib2JqZWN0XCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vcHRzID0gJC5leHRlbmQodHJ1ZSwgY29uZmlnLCBvcHQpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RWxlbWVudCA9IHRlbXBsYXRlKF90aGlzLm9wdHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v5pi+56S65Y+z6L655Y+v5YWz6Zet5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMub3B0cy5jbG9zZUFsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIucGxnLXRhYi1jbG9zZS1hbGxcIikuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoXCIuY2hpbGRcIikuc2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKFwiLmNoaWxkXCIpLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIucGxnLXRhYi1jbG9zZS1hbGwgLmNoaWxkXCIpLm9uKCdjbGljaycsIFwiZGRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2EgPSAkKHRoaXMpLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGkgPSAkKHRoaXMpLnBhcmVudHMoXCIucGxnLXRhYi1jbG9zZS1hbGxcIikubmV4dCgpLmNoaWxkcmVuKCdsaScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGkuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHRoaXMuaW5kZXgoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJHRoaXMuaGFzQ2xhc3MoXCJsYXl1aS10aGlzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlVGFicygkdGhpcy5hdHRyKFwibGF5LWlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlVGFicygkdGhpcy5hdHRyKFwibGF5LWlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9hID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRlbGV0ZVRhYnMoJHRoaXMuYXR0cihcImxheS1pZFwiKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cyhcIi5jaGlsZFwiKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3RoaXMub3B0cy5yZW5kZXJlciAmJiBfdGhpcy5yZW5kZXJUbyh0aGlzLm9wdHMucmVuZGVyZXIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHBsZ1RhYnMucHJvdG90eXBlLnJlbmRlclRvID0gZnVuY3Rpb24gKGVsZSkge1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgZWxlKS5hcHBlbmQodGhpcy5nZXRFbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpc1xyXG4gICAgICAgICAgICB0aGlzLm9wdHMuY29udGVudC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHllcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLm9wdHMuaW5kZXhBY3RpdmUgPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeWVzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeWVzKVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWRkVGFicyhpdGVtLCB5ZXMpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdmFyIG9saSA9IHRoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLXRhYi10aXRsZSA+IGxpXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBsYXlpZCA9IG9saS5lcShfdGhpcy5vcHRzLmluZGV4QWN0aXZlKS5hdHRyKFwibGF5LWlkXCIpO1xyXG4gICAgICAgICAgICBfdGhpcy5jaGFuZ2VUYWJzKGxheWlkKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW5kZXIoXCJuYXZcIik7XHJcbiAgICAgICAgICAgIC8v5riy5p+T5Yiw6aG16Z2iXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW5kZXIoXCJ0YWJcIiwgdGhpcy5vcHRzLmZpbHRlcik7XHJcbiAgICAgICAgICAgIC8v6K6h566X5oC75a695bqm5b6X5YiwbGnnmoTmlbDph49cclxuICAgICAgICAgICAgdGhpcy5vbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXROdW0odGl0bGVPYmopIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ID0gdGl0bGVPYmoud2lkdGgoKSAtIDE1O1xyXG4gICAgICAgICAgICB2YXIgY291bnQwMSA9IHRpdGxlT2JqLmZpbmQoXCJsaVwiKS5lcSgwKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIHZhciBjb3VudDAyID0gdGl0bGVPYmoucHJldigpID8gdGl0bGVPYmoucHJldigpLm91dGVyV2lkdGgoKSA6IDA7XHJcbiAgICAgICAgICAgIHZhciBsaXcgPSAxNDA7XHJcbiAgICAgICAgICAgIHZhciBsaU51bSA9IE1hdGguZmxvb3IoY291bnQgLSBjb3VudDAxIC0gY291bnQwMikgLyBsaXc7XHJcbiAgICAgICAgICAgIC8vLyAvL2NvbnNvbGUubG9nKCdjb3VudCA6JyxNYXRoLmZsb29yKGxpTnVtKSApO1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihsaU51bSlcclxuICAgICAgICB9O1xyXG5cclxuIFxyXG5cclxuICAgICAgICB2YXIgcGluZGV4ID0gLTE7XHJcblxyXG4gICAgICAgIC8v5Yqo5oCB5re75YqgdGFic3NcclxuICAgICAgICBwbGdUYWJzLnByb3RvdHlwZS5hZGRUYWJzID0gZnVuY3Rpb24gKG9iaiwgYm9vbGUpIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlTG9hZCA9IFBsZ0RpYWxvZy5sb2FkaW5nMigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgb2JqLnRpdGxlID0gYDxzcGFuIGNsYXNzPVwibmFtZVwiPiR7b2JqLnRpdGxlfTwvc3Bhbj5gXHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZighYm9vbGUpe1xyXG4gICAgICAgICAgICAgICAgYm9vbGU9bnVsbFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXNDaGFuZ2UgPSBib29sZSA7XHJcblxyXG5cclxuICAgICAgICAgICAgLy/lsIbkuIrmrKHnmoTpgInkuK3nmoTkuIvmoIflrZjkuIvmnaUgIFxyXG4gICAgICAgICAgICB0aGlzLnByZUluZGV4ID0gdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLXRpdGxlIGxpLmxheXVpLXRoaXNcIikuaW5kZXgoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBvbGkgPSB0aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItdGl0bGUgbGlcIik7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN55qEbGnmlbDph49cclxuICAgICAgICAgICAgdmFyIGN1ckxpID0gTnVtYmVyKG9saS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmluZSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBgPHNwYW4gY2xhc3M9XCJuYW1lXCI+5paw5qCH6aKYPC9zcGFuPmAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibGF5LVwiICsgUHJvbG9nLmNyZWF0ZVJhbmRvbUlkKCksXHJcbiAgICAgICAgICAgICAgICBpZnJhbWU6ZmFsc2UsXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBvcHRzID0gJC5leHRlbmQodHJ1ZSwgZGVmaW5lLCBvYmopO1xyXG5cclxuICAgIFxyXG4gICAgICAgICAgICBpZiAob3B0cy51cmwmJiFvcHRzLmlmcmFtZSkgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFByb2xvZy5hamF4KHtcclxuXHQgICAgICAgICAgICAgICAgdHlwZTogXCJnZXRcIixcclxuXHQgICAgICAgICAgICAgICAgdXJsOiBvcHRzLnVybCxcclxuXHQgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwiaHRtbFwiLFxyXG5cdCAgICAgICAgICAgICAgICBzdWNjZXNzOiByZWFuZFRwbCxcclxuXHQgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuXHQgICAgICAgICAgICAgICAgICAgbGF5ZXIubXNnKFwi5pWw5o2u6K+35rGC5aSx6LSlXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAgICBjbG9zZUxvYWQoKVxyXG5cdCAgICAgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYob3B0cy50ZW1wbGF0ZSYmIW9wdHMuaWZyYW1lKXtcclxuICAgICAgICAgICAgICAgIHJlYW5kVHBsKG9wdHMudGVtcGxhdGUpXHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vaWZyYW1l5Li6dHJ1ZVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgb3B0cy50ZW1wbGF0ZT1gPGlmcmFtZSBjbGFzcz1cInBsZy1pZnJhbWVDbGFzc1wiIGZyYW1lYm9yZGVyPVwibm9cIiBzcmM9XCIke29wdHMudXJsfVwiPjwvaWZyYW1lPmBcclxuICAgICAgICAgICAgICAgIHJlYW5kVHBsKG9wdHMudGVtcGxhdGUpXHJcbiAgICAgICAgICAgICAgICBjbG9zZUxvYWQoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgX3RoaXMucHJlSW5kZXggPSBwaW5kZXggPSBfdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLXRpdGxlPi5sYXl1aS10aGlzXCIpLmluZGV4KCk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVhbmRUcGwgKGRhdGEpIHtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuY29udGVudD1kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmVsZW1lbnQudGFiQWRkKF90aGlzLm9wdHMuZmlsdGVyLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2hhbmdlICYmIF90aGlzLmNoYW5nZVRhYnMob3B0cy5pZCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUubmFtZSArIFwiOiBcIiArIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgIF90aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItY29udGVudCAubGF5dWktdGFiLWl0ZW1cIikuYXR0cihcImRhdGEtZmFkZVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgdmFyIGxpTnVtID0gZ2V0TnVtKF90aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItdGl0bGVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAoY3VyTGkgPiBsaU51bSAmJiBvbGkuZXEoMSkpICYmIF90aGlzLmRlbGV0ZVRhYnMob2xpLmVxKDEpLmF0dHIoXCJsYXktaWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICBjbG9zZUxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgIC8vICBsYXllci5jbG9zZShsb2FkaW5nKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL+WIh+aNouWIsOaMh+WumnRhYnNzXHJcbiAgICAgICAgcGxnVGFicy5wcm90b3R5cGUuY2hhbmdlVGFicyA9IGZ1bmN0aW9uIChsYXlpZCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBpZFxyXG4gICAgICAgICAgICB2YXIgcmVnID0gL15bMC05XSsuP1swLTldKiQvO1xyXG4gICAgICAgICAgICB2YXIgZWxlT2JqXHJcbiAgICAgICAgICAgIGlmIChyZWcudGVzdChsYXlpZCkpIHtcclxuICAgICAgICAgICAgICAgIC8v6YCa6L+H5LiL5qCH5om+5YiwbGF5aWRcclxuICAgICAgICAgICAgICAgIGVsZU9iaiA9IHRoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLXRhYi10aXRsZT5saVwiKS5lcShsYXlpZCk7XHJcbiAgICAgICAgICAgICAgICBpZCA9IGVsZU9iai5hdHRyKFwibGF5LWlkXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWQgPSBsYXlpZDtcclxuICAgICAgICAgICAgICAgIGVsZU9iaiA9IHRoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLXRhYi10aXRsZT5saVtsYXktaWQ9J1wiICsgaWQgKyBcIiddXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGluZGV4ID0gdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLXRpdGxlPi5sYXl1aS10aGlzXCIpLmluZGV4KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50YWJDaGFuZ2UodGhpcy5vcHRzLmZpbHRlciwgaWQpO1xyXG5cclxuICAgICAgICAgICAgLy/orrDlvZXkuIrkuIDmrKHkuIvmoIdcclxuICAgICAgICAgICAgdGhpcy5wcmVJbmRleCA9IHBpbmRleDtcclxuICAgICAgICAgICAgLy/mmK/lkKblvIDlkK/mu5HliqjliIfmjaJcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZmFkZUluKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLWNvbnRlbnQgPi5sYXl1aS10YWItaXRlbVwiKS5hdHRyKFwiZGF0YS1mYWRlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0bWUgPSB0aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItY29udGVudCA+LmxheXVpLXRhYi1pdGVtLmxheXVpLXNob3dcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpdG1lLmluZGV4KCkgPiB0aGlzLnByZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIj0+XCIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0bWUuYXR0cihcImRhdGEtZmFkZVwiLCBcImxlZnRcIik7O1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRtZS5pbmRleCgpID09IHRoaXMucHJlSW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCI8PVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC50YWJDaGFuZ2UodGhpcy5vcHRzLmZpbHRlciwgaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0bWUuYXR0cihcImRhdGEtZmFkZVwiLCBcInJpZ2h0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdG1lLmF0dHIoXCJkYXRhLWZhZGVcIiwgXCJcIilcclxuXHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLm9wdHMudGltZSlcclxuXHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVsZU9iailcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/liKDpmaTmjIflrpp0YWJzc1xyXG4gICAgICAgIHBsZ1RhYnMucHJvdG90eXBlLmRlbGV0ZVRhYnMgPSBmdW5jdGlvbiAobGF5aWQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRhYkRlbGV0ZSh0aGlzLm9wdHMuZmlsdGVyLCBsYXlpZCk7IC8v5Yig6Zmk77yaXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHBsZ1RhYnMucHJvdG90eXBlLmVsZW1lbnQgPSBsYXl1aS5lbGVtZW50O1xyXG5cclxuICAgICAgICBwbGdUYWJzLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZXZlbnROYW1lKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbihldmVudE5hbWUgKyBcIihcIiArIHRoaXMub3B0cy5maWx0ZXIgKyBcIilcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnByZUluZGV4ID0gZGF0YS5pbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbihcInRhYihcIiArIHRoaXMub3B0cy5maWx0ZXIgKyBcIilcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wcmVJbmRleCA9IGRhdGEuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpc1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgd2luZG93LlBsZ1RhYnMgPSBwbGdUYWJzO1xyXG5cclxuICAgICAgICAkLmZuLmluaXRQbGdUYWJzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcGxnVGFicyhvcHRpb25zKS5yZW5kZXJUbyhpZCk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxufSkoalF1ZXJ5LCBsYXl1aSk7IiwiO1xyXG4oZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgICAvL1BsZ1p0cmVlLmpzXHJcblxyXG5cclxuICAgIHZhciB0cmVlID0gJC5mbi56VHJlZTtcclxuXHJcbiAgICAgICAgIFxyXG4gICAgdmFyIGdldERhdGEgPSBmdW5jdGlvbiAob3B0cykge1xyXG4gICAgICAgIHZhciBjbG9zZSA9IFByb2xvZy5sb2FkaW5nMigpO1xyXG4gICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICAvL+mFjee9rnRyZWVcclxuICAgICAgICBvcHRzLnN1Y2Nlc3M9ZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Y+q5oqK54i26IqC54K55ou/5Ye65p2lXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gcmVzLmRhdGEubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNQYXJlbnQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXllci5tc2coXCLmlbDmja7liqDovb3lpLHotKUhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2xvc2UoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRzLmVycm9yPWZ1bmN0aW9uKCl7ICAgICAgXHJcbiAgICAgICAgICAgIGNsb3NlKClcclxuICAgICAgICAgfVxyXG4gICAgICAgIFByb2xvZy5zeW5jQWpheChvcHRzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9ialxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBFeHBhbmQoZXZlbnQsIHRyZWVJZCwgdHJlZU5vZGUpIHtcclxuICAgICAgICAvL+WmguaenOaYr+S4gOe6p+eItuiPnOWNlVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRyZWVJZClcclxuICAgICAgICBpZiAoIXRyZWVOb2RlLnRJZCkge1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmdldFpUcmVlT2JqKHRyZWVJZCk7XHJcbiAgICAgICAgICAgIHZhciBOT2RlcyA9IG9iai5nZXROb2RlcygpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gTk9kZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZCA9IE5PZGVzW2tleV1cclxuICAgICAgICAgICAgICAgIGlmICh0ZC50SWQgIT0gdHJlZU5vZGUudElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmV4cGFuZE5vZGUodGQsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmV4cGFuZE5vZGUodGQsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIHBsZ1p0cmVlID0gZnVuY3Rpb24gKGVsZSwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgaW5pdEFqYXg6bnVsbCxcclxuICAgICAgICAgICAgc2tpbjogXCJcIixcclxuICAgICAgICAgICAgdG9vbEJhcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2xCYXIyOntcclxuICAgICAgICAgICAgICAgIGlzU2hvdzpmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJ0bjpudWxsLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZW5kZXJlcjogbnVsbCxcclxuICAgICAgICAgICAgc2V0RGF0YTpudWxsLFxyXG4gICAgICAgICAgICBpc0V4cGFuZDpmYWxzZSxcclxuICAgICAgICAgICAgc2V0dGluZzoge1xyXG4gICAgICAgICAgICAgICAgdHJlZUlkOiBQcm9sb2cuY3JlYXRlUmFuZG9tSWQoKSxcclxuICAgICAgICAgICAgICAgIHZpZXc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE11bHRpOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJuYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZEtleTogXCJtZW51SWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcElkS2V5OiBcInBhcmVudE1lbnVJZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb290UElkOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdpZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgLy8gb25FeHBhbmQ6IEV4cGFuZCxcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBlbGUsIG9wdCwgb2JqZWN0O1xyXG4gICAgICAgIC8v6I635Y+W5pWw5o2u5YWl5Y+jXHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgb3B0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub3B0cyA9ICQuZXh0ZW5kKHRydWUsIGNvbmZpZywgb3B0KTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHQuc2V0dGluZyAmJiBvcHQuc2V0dGluZy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0LnNldHRpbmcuY2FsbGJhY2sub25FeHBhbmQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcHRzLnNldHRpbmcuY2FsbGJhY2sub25FeHBhbmQgPSBmdW5jdGlvbiAoZXZlbnQsIHRyZWVJZCwgdHJlZU5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV4cGFuZC5iaW5kKF90aGlzKShldmVudCwgdHJlZUlkLCB0cmVlTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHQuc2V0dGluZy5jYWxsYmFjay5vbkV4cGFuZChldmVudCwgdHJlZUlkLCB0cmVlTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgaWYoICFfdGhpcy5vcHRzLnNldERhdGUgJiZfdGhpcy5vcHRzLmluaXRBamF4ICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF90aGlzLm9wdHMuc2V0RGF0YSA9IGdldERhdGEoX3RoaXMub3B0cy5pbml0QWpheCk7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGVsZSA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgb3B0ID0gYXJndW1lbnRzWzFdO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgX3RoaXMub3B0cy5yZW5kZXJlciAmJiBfdGhpcy5yZW5kZXJUbyh0aGlzLm9wdHMucmVuZGVyZXIpXHJcblxyXG4gICAgICAgIC8v5rGC54i257qnZGl255qE6auY5bqm5YC8XHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQod2luZG93Lm9ucmVzaXplPWZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBwT2JqPSAkKFwiI1wiK190aGlzLm9wdHMucmVuZGVyZXIpO1xyXG4gICAgICAgICAgICB2YXIgdG9vbGJhckJ0bkhlaWdodD0wO1xyXG4gICAgICAgICAgICBpZihfdGhpcy50b29sYmFyQnRuMil7XHJcbiAgICAgICAgICAgICAgICB0b29sYmFyQnRuSGVpZ2h0PSBfdGhpcy50b29sYmFyQnRuMi5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgcGFyZW50SGVpZ2h0PSBwYXJzZUludChwT2JqLnBhcmVudCgpLmhlaWdodCgpLXRvb2xiYXJCdG5IZWlnaHQpO1xyXG4gICAgICAgICAgICBwT2JqLmZpbmQoXCIuenRyZWVcIikuY3NzKHtcIndpZHRoXCI6XCIxMDAlXCIsXCJoZWlnaHRcIjpwYXJlbnRIZWlnaHQsXCJvdmVyZmxvdy15XCI6IFwiYXV0b1wiLFwicGFkaW5nLWJvdHRvbVwiOlwiMjBweFwifSlcclxuICAgICAgICB9LDApXHJcbiAgICAgICAgXHJcbiAgIFxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy/lhYvpmoZ0cmVlIOeahOaWueazlVxyXG4gICAgZm9yICh2YXIga2V5IGluIHRyZWUpIHtcclxuICAgICAgICBwbGdadHJlZS5wcm90b3R5cGVba2V5XSA9IHRyZWVba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBwbGdadHJlZS5wcm90b3R5cGUucmVuZGVyVG8gPSBmdW5jdGlvbiAoZWxlKSB7XHJcbiAgICBcdCQoXCIjXCIgKyBlbGUpLmVtcHR5KCk7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLm9wdHMuc2tpbiAmJiAkKFwiI1wiICsgZWxlKS5hZGRDbGFzcyh0aGlzLm9wdHMuc2tpbik7XHJcblxyXG4gICAgICAgIHZhciBvYmpVbCA9ICQoXCI8dWw+XCIsIHtcclxuICAgICAgICAgICAgY2xhc3M6IFwienRyZWVcIixcclxuICAgICAgICAgICAgaWQ6IF90aGlzLm9wdHMuc2V0dGluZy50cmVlSWRcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudHJlZU9iaiA9IHRoaXMuaW5pdChvYmpVbCwgdGhpcy5vcHRzLnNldHRpbmcsIHRoaXMub3B0cy5zZXREYXRhKTtcclxuICAgICAgICAvL+m7mOiupOWxleW8gOesrOS4gOS4quiPnOWNlVxyXG4gICAgICAgIHRoaXMub3B0cy5pc0V4cGFuZCYmIHRoaXMudHJlZU9iai5leHBhbmROb2RlKHRoaXMudHJlZU9iai5nZXROb2RlcygpWzBdLCB0cnVlLCBmYWxzZSwgdHJ1ZSx0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy50b29sQmFyKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnRvb2xiYXJCdG4gPSBidG5Hcm91cChfdGhpcyk7XHJcbiAgICAgICAgICAgICQoXCIjXCIgKyBlbGUpLmFwcGVuZChfdGhpcy50b29sYmFyQnRuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy50b29sQmFyMi5pc1Nob3cgJiYgdGhpcy5vcHRzLnRvb2xCYXIyLmJ0biYmdGhpcy5vcHRzLnRvb2xCYXIyLmJ0bi5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICBfdGhpcy50b29sYmFyQnRuMiA9IGJ0bkdyb3VwMihfdGhpcyk7XHJcbiAgICAgICAgICAgICQoXCIjXCIgKyBlbGUpLmFwcGVuZChfdGhpcy50b29sYmFyQnRuMik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICQoXCIjXCIgKyBlbGUpLmFwcGVuZChvYmpVbCk7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgfTtcclxuICAgIHZhciBuZXdDb3VudCA9IDE7XHJcblxyXG4gICAvKiAgcGxnWnRyZWUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgLy8gIHZhciB0b29sYmFyQnRuID0gYnRuR3JvdXAoKTtcclxuICAgICAgICB2YXIgelRyZWUgPSB0aGlzLnRyZWVPYmo7XHJcbiAgICAgICAgaWYoZXZlbnROYW1lPT1cImFkZFRyZWVOb2RlQ2xpY2tcIil7XHJcbiAgICAgICAgICAgIHZhciBhZGRCdG4gPSB0aGlzLnRvb2xiYXJCdG4uY2hpbGRyZW4oKS5lcSgyKTtcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgYWRkQnRuLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZXMgPSB6VHJlZS5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgICAgIHZhciB0cmVlTm9kZSA9IG5vZGVzO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhldmVudCwgelRyZWUsIHRyZWVOb2RlKVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB9ZWxzZSBpZihldmVudE5hbWU9PVwiZGVsVHJlZU5vZGVDbGlja1wiKXtcclxuICAgICAgICAgICAgdmFyIGRlbEJ0biA9IHRoaXMudG9vbGJhckJ0bi5jaGlsZHJlbigpLmVxKDApO1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBkZWxCdG4uY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlcyA9IHpUcmVlLmdldFNlbGVjdGVkTm9kZXMoKTtcclxuICAgICAgICAgICAgdmFyIHRyZWVOb2RlID0gbm9kZXM7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50LCB6VHJlZSwgdHJlZU5vZGUpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1lbHNlIGlmKGV2ZW50TmFtZT09XCJlZGl0VHJlZU5vZGVDbGlja1wiKXtcclxuICAgICAgICAgICAgdmFyIGRlbEJ0biA9IHRoaXMudG9vbGJhckJ0bi5jaGlsZHJlbigpLmVxKDEpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBkZWxCdG4uY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZXMgPSB6VHJlZS5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJlZU5vZGUgPSBub2RlcztcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50LCB6VHJlZSwgdHJlZU5vZGUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfTsgKi9cclxuXHJcbiAgICB2YXIgbm9kZU9iaiA9IHtcclxuICAgICAgICBpZDogUHJvbG9nLmNyZWF0ZVJhbmRvbUlkKCksXHJcbiAgICAgICAgbmFtZTogXCLmlrDoj5zljZVcIixcclxuICAgICAgICBzeXN0ZW1JZDogbnVsbCxcclxuICAgICAgICBtZW51SWQ6IFwibTAwXCIgKyBQcm9sb2cuY3JlYXRlUmFuZG9tSWQoKSxcclxuICAgICAgICBwYXJlbnRNZW51SWQ6IG51bGwsXHJcbiAgICAgICAgb3BlcmF0ZVR5cGU6IDAsXHJcbiAgICAgICAgbGV2ZWw6IDEsXHJcbiAgICAgICAgZW5hYmxlOiB0cnVlLFxyXG4gICAgICAgIGxlYWY6IGZhbHNlLFxyXG4gICAgICAgIHBhdGg6IFwiXCIsXHJcbiAgICAgICAgc29ydDogMCxcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGJ0bkdyb3VwMihfdGhpcyl7XHJcbiAgICAgICAgdmFyIG9iaj1fdGhpcy5vcHRzLnRvb2xCYXIyLmJ0bjtcclxuICAgICAgICB2YXIgYnRuID0gJChgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvb2xiYXIgbGF5dWktcm93IGxheXVpLWNvbC1zcGFjZTEwIGNsXCI+XHJcbiAgICAgICAgICR7b2JqLm1hcChmdW5jdGlvbihpdGVtKXtcclxuXHJcbiAgICAgICAgICAgcmV0dXJuYDxkaXYgY2xhc3M9XCJob29rIGxheXVpLWNvbC1tZCR7MTIvb2JqLmxlbmd0aH1cIj5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJsYXl1aS1idG4gJHtpdGVtLnNraW4/aXRlbS5za2luOicnfVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCIke2l0ZW0uaWNvbn1cIj48L2k+JHtpdGVtLnRleHR9PC9hPlxyXG4gICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgICB9KS5qb2luKFwiXCIpfSAgIFxyXG4gICAgICAgIFxyXG4gICAgICA8L2Rpdj5gKTtcclxuICAgICAgdmFyIHpUcmVlID0gX3RoaXMudHJlZU9iajtcclxuXHJcbiAgICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0saW5kZXgpe1xyXG4gICAgICAgIGJ0bi5maW5kKFwiLmhvb2tcIikuZXEoaW5kZXgpLmZpbmQoJ2EnKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGVzID0gelRyZWUuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgICAgICAgICB2YXIgdHJlZU5vZGUgPSBub2RlcztcclxuICAgICAgICAgICAgaXRlbS5FdmVudENhbGxiYWNrICYmaXRlbS5FdmVudENhbGxiYWNrKGV2ZW50LCB6VHJlZSwgdHJlZU5vZGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICBcclxuXHJcbiAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gYnRuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJ0bkdyb3VwKF90aGlzKSB7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICB2YXIgYnRuID0gJChgXHJcblxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sYmFyIGxheXVpLXJvdyBsYXl1aS1jb2wtc3BhY2UxMCBjbFwiPlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWNvbC1tZDRcIj5cclxuICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxheXVpLWJ0biBsYXl1aS1idG4tcHJpbWFyeVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5cclxuICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImxheXVpLWljb24gbGF5dWktaWNvbi1kZWxldGVcIj48L2k+5Yig6ZmkXHJcbiAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktY29sLW1kNFwiPlxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIDxhIGNsYXNzPVwibGF5dWktYnRuIGxheXVpLWJ0bi1wcmltYXJ5XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiID5cclxuICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImxheXVpLWljb24gbGF5dWktaWNvbi1lZGl0XCI+PC9pPue8lui+kTwvYT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1jb2wtbWQ0XCI+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxheXVpLWJ0biAgbGF5dWktYnRuLW5vcm1hbFwiICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLWFkZC0xXCI+PC9pPuWinuWKoFxyXG4gICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgXHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGApO1xyXG5cclxuICAgICAgICByZXR1cm4gYnRuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5re75Yqg6I+c5Y2VXHJcbiAgICBmdW5jdGlvbiBhZGQoZXZlbnQpIHtcclxuICAgICAgICB2YXIgelRyZWUgPSB0aGlzLnRyZWVPYmo7XHJcbiAgICAgICAgdmFyIG5vZGVzID0gelRyZWUuZ2V0U2VsZWN0ZWROb2RlcygpO1xyXG4gICAgICAgIHZhciB0cmVlTm9kZSA9IG5vZGVzWzBdO1xyXG4gICAgICAgIG5vZGVPYmoucGFyZW50TWVudUlkID0gdHJlZU5vZGUubWVudUlkO1xyXG4gICAgICAgIHRyZWVOb2RlID0gelRyZWUuYWRkTm9kZXModHJlZU5vZGUsIG5vZGVPYmopO1xyXG4gICAgICAgIHpUcmVlLnNlbGVjdE5vZGUodHJlZU5vZGVbMF0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWwoZXZlbnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMpXHJcbiAgICAgICAgdmFyIHpUcmVlID0gdGhpcy50cmVlT2JqO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuUGxnWnRyZWUgPSBwbGdadHJlZVxyXG5cclxuXHJcbn0pKGpRdWVyeSk7IiwibGF5dWkuZGVmaW5lKCdmb3JtJywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcclxuICB2YXIgJCA9IGxheXVpLiQsXHJcbiAgICBmb3JtID0gbGF5dWkuZm9ybSxcclxuICAgIGhpbnQgPSBsYXl1aS5oaW50KCksXHJcbiAgICAvLyDlrZfnrKbluLjph49cclxuICAgIE1PRF9OQU1FID0gJ3NlbGVjdFBsdXMnLFxyXG4gICAgU0VMRUNUID0gJ2xheXVpLWZvcm0tc2VsZWN0JyxcclxuICAgIFNFTEVDVEVEID0gJ2xheXVpLWZvcm0tc2VsZWN0ZWQnLFxyXG5cclxuICAgIHNlbGVjdFBsdXMgPSB7XHJcbiAgICAgIGluZGV4OiBsYXl1aS5zZWxlY3RQbHVzID8gbGF5dWkuc2VsZWN0UGx1cy5pbmRleCA6IDAsXHJcblxyXG4gICAgICAvLyDorr7nva7lhajlsYDpoblcclxuICAgICAgc2V0OiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGF0LmNvbmZpZyA9ICQuZXh0ZW5kKHt9LCB0aGF0LmNvbmZpZywgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyDkuovku7bnm5HlkKxcclxuICAgICAgb246IGZ1bmN0aW9uIChldmVudHMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIGxheXVpLm9uZXZlbnQuY2FsbCh0aGlzLCBNT0RfTkFNRSwgZXZlbnRzLCBjYWxsYmFjayk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g5pON5L2c5b2T5YmN5a6e5L6LXHJcbiAgICB0aGlzSW5zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgICAgb3B0aW9ucyA9IHRoYXQuY29uZmlnO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAvLyDojrflj5bmlbDmja5cclxuICAgICAgICBnZXRDaGVja2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhhdC5nZXRDaGVja2VkLmNhbGwodGhhdCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDphY3nva7mlbDmja5cclxuICAgICAgICBjb25maWc6IG9wdGlvbnNcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmnoTpgKDlmahcclxuICAgIENsYXNzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICB0aGF0LmluZGV4ID0gKytzZWxlY3RQbHVzLmluZGV4O1xyXG4gICAgICB0aGF0LmNvbmZpZyA9ICQuZXh0ZW5kKHt9LCB0aGF0LmNvbmZpZywgc2VsZWN0UGx1cy5jb25maWcsIG9wdGlvbnMpO1xyXG4gICAgICB0aGF0LnJlbmRlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmuLLmn5NpbnB1dFRhZ3NcclxuICAgIHJlbmRlcklucHV0VGFncyA9IGZ1bmN0aW9uKGVsLCBkYXRhKXtcclxuICAgICAgXHJcbiAgICAgIHZhciB0ZW1TdHIgPSAnJztcclxuICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCl7XHJcbiAgICAgICAgdGVtU3RyICs9IGA8c3Bhbj5cclxuICAgICAgICAgIDxlbT4ke3ZhbH08L2VtPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiPsOXPC9idXR0b24+XHJcbiAgICAgICAgPC9zcGFuPmA7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJChlbCkuc2libGluZ3MoJy5wbGctc2VsZWN0LXRhZ3MnKS5odG1sKHRlbVN0cik7XHJcbiAgICB9O1xyXG5cclxuICAvL+m7mOiupOmFjee9rlxyXG4gIENsYXNzLnByb3RvdHlwZS5jb25maWcgPSB7XHJcbiAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgdmFsdWVTZXBhcmF0b3I6ICcvJyxcclxuICAgIGxhYmVsU2VwYXJhdG9yOiAnICAtLS0gICcsXHJcblxyXG4gICAgZGF0YTogW10sXHJcbiAgICB2YWx1ZU5hbWU6ICd0aXRsZScsXHJcbiAgICBsYWJlbDogW10sXHJcbiAgICB2YWx1ZXM6IFtdLFxyXG5cclxuICAgIHVybDogJycsXHJcbiAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgd2hlcmU6ICcnLFxyXG4gICAgY29udGVudFR5cGU6ICcnLFxyXG4gICAgaGVhZGVyczogJycsXHJcbiAgICByZXNwb25zZTogJ2RhdGEnLFxyXG4gICAgcGFyc2VEYXRhOiBudWxsLFxyXG5cclxuICAgIGNvbmZpZzoge1xyXG4gICAgICBjaGVja2VkTmFtZTogJ1NFTEVDVFBMVVNfQ0hFQ0tFRCcsXHJcbiAgICAgIGluZGV4TmFtZTogJ1NFTEVDVFBMVVNfSU5ERVgnXHJcbiAgICB9LFxyXG5cclxuICAgIGVycm9yOiAnJ1xyXG5cclxuICB9O1xyXG4gIC8v5riy5p+T6KeG5Zu+XHJcbiAgQ2xhc3MucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgb3B0aW9ucyA9IHRoYXQuY29uZmlnO1xyXG4gICAgXHJcbiAgICB0eXBlb2YgKG9wdGlvbnMuZWwpID09PSAnc3RyaW5nJyA/IG9wdGlvbnMuZWwgPSAkKG9wdGlvbnMuZWwpOiBvcHRpb25zLmVsO1xyXG4gICAgLy8g5riy5p+T5YWD57SgXHJcbiAgICBvcHRpb25zLnJlRWxlbSA9ICQoJzxkaXYgY2xhc3M9XCJsYXl1aS11bnNlbGVjdCBsYXl1aS1mb3JtLXNlbGVjdFwiPicgK1xyXG4gICAgICAnPGRpdiBjbGFzcz1cImxheXVpLXNlbGVjdC10aXRsZVwiPicgK1xyXG4gICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCLor7fpgInmi6lcIiB2YWx1ZT1cIlwiIHJlYWRvbmx5PVwiXCIgY2xhc3M9XCJsYXl1aS1pbnB1dCBsYXl1aS11bnNlbGVjdFwiPicgK1xyXG4gICAgICAnPGkgY2xhc3M9XCJsYXl1aS1lZGdlXCI+PC9pPicgK1xyXG4gICAgICAnPC9kaXY+JyArXHJcbiAgICAgICc8ZGwgY2xhc3M9XCJsYXl1aS1hbmltIGxheXVpLWFuaW0tdXBiaXRcIj4nICtcclxuICAgICAgJzxkZCBsYXktdmFsdWU9XCJcIiBjbGFzcz1cImxheXVpLXNlbGVjdC10aXBzIGxheXVpLWhpZGVcIj7or7fpgInmi6k8L2RkPicgK1xyXG4gICAgICAnPC9kbD4nICtcclxuICAgICAgJzwvZGl2PicpO1xyXG5cclxuICAgIC8vIOS6i+S7tlxyXG4gICAgb3B0aW9ucy5yZUVsZW0uZmluZCgnLmxheXVpLXNlbGVjdC10aXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICEkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKFNFTEVDVEVEKSA/ICQoZG9jdW1lbnQpLmZpbmQoJy4nICsgU0VMRUNUKS5yZW1vdmVDbGFzcyhTRUxFQ1RFRCkgOiBcIlwiO1xyXG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKFNFTEVDVEVEKTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgKCQoZS50YXJnZXQpLnBhcmVudHMoJy4nICsgU0VMRUNUKS5sZW5ndGggPD0gMCkgJiYgKG9wdGlvbnMucmVFbGVtLmhhc0NsYXNzKFNFTEVDVEVEKSkgPyBvcHRpb25zLnJlRWxlbS5yZW1vdmVDbGFzcyhTRUxFQ1RFRCk6IFwiXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAhQXJyYXkuaXNBcnJheShvcHRpb25zLnZhbHVlcykgPyBvcHRpb25zLnZhbHVlcyA9IFtvcHRpb25zLnZhbHVlc10gOiBcIlwiO1xyXG5cclxuICAgIC8vIOafpeaJviDooajljZXnmoQgZmlsdGVyXHJcbiAgICBvcHRpb25zLmZpbHRlciA9IG9wdGlvbnMuZWwucGFyZW50cygnLmxheXVpLWZvcm0nKS5hdHRyKCdsYXktZmlsdGVyJyk7XHJcblxyXG4gICAgb3B0aW9ucy5lbC5hcHBlbmQob3B0aW9ucy5yZUVsZW0pO1xyXG5cclxuICAgIGlmIChvcHRpb25zLnVybCkgeyAvLyDojrflj5blkI7nq6/mlbDmja5cclxuICAgICAgdGhpcy5wdWxsRGF0YSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhhdC5yZW5kZXJEYXRhKCk7IC8vIOaVsOaNrua4suafk1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbnMuZWwub24oJ2NsaWNrJywgJy5sYXl1aS1zZWxlY3QtdGl0bGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCflnKjmraTlpITlvIDlp4snKVxyXG4gICAgICB2YXIgJHRpdGxlID0gJCh0aGlzKSxcclxuICAgICAgICAkZGQwID0gJHRpdGxlLm5leHQoKS5maW5kKCdkZCcpLmVxKDApO1xyXG5cclxuICAgICAgaWYgKCEkZGQwLmhhc0NsYXNzKCdsYXl1aS1oaWRlJykpIHtcclxuICAgICAgICAkZGQwLmFkZENsYXNzKCdsYXl1aS1oaWRlJyk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICR0aXRsZS5maW5kKCdpbnB1dCcpLnZhbChvcHRpb25zLnZhbHVlcy5qb2luKG9wdGlvbnMudmFsdWVTZXBhcmF0b3IpKTtcclxuICAgIH0pXHJcblxyXG4gIH1cclxuXHJcbiAgQ2xhc3MucHJvdG90eXBlLnB1bGxEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICBvcHRpb25zID0gdGhhdC5jb25maWc7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiBvcHRpb25zLm1ldGhvZCB8fCAnZ2V0JyxcclxuICAgICAgdXJsOiBvcHRpb25zLnVybCxcclxuICAgICAgY29udGVudFR5cGU6IG9wdGlvbnMuY29udGVudFR5cGUsXHJcbiAgICAgIGRhdGE6IG9wdGlvbnMud2hlcmUgfHwge30sXHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyB8fCB7fSxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgIC8v5aaC5p6c5pyJ5pWw5o2u6Kej5p6Q55qE5Zue6LCD77yM5YiZ6I635b6X5YW26L+U5Zue55qE5pWw5o2uXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnBhcnNlRGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgcmVzID0gb3B0aW9ucy5wYXJzZURhdGEocmVzKSB8fCByZXNbb3B0aW9ucy5yZXNwb25zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWmguaenOaYr+aVsOe7hO+8jOWImeimhueblm9wdGlvbnMuZGF0YVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpIHtcclxuICAgICAgICAgIG9wdGlvbnMuZGF0YSA9IHRoYXQuZm9ybWF0RGF0YShyZXMpO1xyXG4gICAgICAgICAgb3B0aW9ucy5lcnJvciA9ICcnO1xyXG4gICAgICAgICAgdGhhdC5yZW5kZXJEYXRhKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9wdGlvbnMuZXJyb3IgPSAn5pWw5o2u5qC85byP5LiN5a+5JztcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSwgbSkge1xyXG4gICAgICAgIG9wdGlvbnMuZXJyb3IgPSAn5pWw5o2u5o6l5Y+j6K+35rGC5byC5bi477yaJyArIG07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIOagvOW8j+WMluaVsOaNrlxyXG4gIENsYXNzLnByb3RvdHlwZS5mb3JtYXREYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgb3B0aW9ucyA9IHRoYXQuY29uZmlnLFxyXG4gICAgICB2YWx1ZU5hbWUgPSBvcHRpb25zLnZhbHVlTmFtZSxcclxuICAgICAgdmFsdWVzID0gb3B0aW9ucy52YWx1ZXMsXHJcbiAgICAgIGNoZWNrZWROYW1lID0gb3B0aW9ucy5jb25maWcuY2hlY2tlZE5hbWUsXHJcbiAgICAgIGluZGV4TmFtZSA9IG9wdGlvbnMuY29uZmlnLmluZGV4TmFtZTtcclxuXHJcbiAgICBsYXl1aS5lYWNoKGRhdGEsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBkYXRhW2ldID0ge1xyXG4gICAgICAgICAgdGl0bGU6IGl0ZW1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZGF0YVtpXVtpbmRleE5hbWVdID0gaTtcclxuICAgICAgaWYgKCFkYXRhW2ldW2NoZWNrZWROYW1lXSkgZGF0YVtpXVtjaGVja2VkTmFtZV0gPSBmYWxzZTtcclxuICAgICAgbGF5dWkuZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICBpZiAoZGF0YVtpXVt2YWx1ZU5hbWVdID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgZGF0YVtpXVtjaGVja2VkTmFtZV0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgdmFsdWVzLnNwbGljZSgwKTtcclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG5cclxuICAvLyDmuLLmn5PmlbDmja5cclxuICBDbGFzcy5wcm90b3R5cGUucmVuZGVyRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgIG9wdGlvbnMgPSB0aGF0LmNvbmZpZyxcclxuICAgICAgdHlwZSA9IG9wdGlvbnMudHlwZSxcclxuICAgICAgaWQgPSB0aGF0LmluZGV4LFxyXG4gICAgICBkYXRhID0gZGF0YSA/IHRoYXQuZm9ybWF0RGF0YShkYXRhKSA6IHRoYXQuZm9ybWF0RGF0YShvcHRpb25zLmRhdGEpLFxyXG5cclxuICAgIGl0ZW1zID0ge1xyXG5cclxuICAgICAgLy8g5aSa6YCJXHJcbiAgICAgIGNoZWNrYm94OiBmdW5jdGlvbiAoY29uZmlnLCBkYXRhLCBpZCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBDTEFTU05BTUUgPSAnbGF5dWktZm9ybS1jaGVja2JveCcsXHJcbiAgICAgICAgICBDSEVDS0VEID0gJ2xheXVpLWZvcm0tY2hlY2tlZCcsXHJcblxyXG4gICAgICAgICAgZWwgPSBjb25maWcucmVFbGVtLmZpbmQoJ2RsJyksXHJcbiAgICAgICAgICB2YWx1ZU5hbWUgPSBjb25maWcudmFsdWVOYW1lLFxyXG4gICAgICAgICAgY2hlY2tlZE5hbWUgPSBjb25maWcuY29uZmlnLmNoZWNrZWROYW1lLFxyXG4gICAgICAgICAgaW5kZXhOYW1lID0gY29uZmlnLmNvbmZpZy5pbmRleE5hbWUsXHJcbiAgICAgICAgICB2YWx1ZXMgPSBjb25maWcudmFsdWVzLFxyXG4gICAgICAgICAgbGFiZWwgPSBjb25maWcubGFiZWwsXHJcbiAgICAgICAgICBmaWx0ZXIgPSBjb25maWcuZmlsdGVyLFxyXG4gICAgICAgICAgbGFiZWxTZXBhcmF0b3IgPSBjb25maWcubGFiZWxTZXBhcmF0b3IsXHJcbiAgICAgICAgICB2YWx1ZVNlcGFyYXRvciA9IGNvbmZpZy52YWx1ZVNlcGFyYXRvcixcclxuXHJcbiAgICAgICAgICBzdW0gPSAwO1xyXG5cclxuXHJcbiAgICAgICAgLy8g5re75Yqg6YCJ6aG5ICAgWFhYLCDmraTlpITlj6/ku6Xkvb/nlKjkuIDmrKFzdHLvvIzlj6/ku6XoioLnnIHkuIDmrKFkb23nmoTmk43kvZxcclxuICAgICAgICBlbC5hcHBlbmQoJCgnPGRkIGxheS12YWx1ZT1cIuWFqOmAiVwiPjwvZGQ+JykpO1xyXG4gICAgICAgIGxheXVpLmVhY2goZGF0YSwgZnVuY3Rpb24gKGksIGl0ZW0pIHtcclxuICAgICAgICAgIGVsLmFwcGVuZCgkKCc8ZGQgbGF5LXZhbHVlPVwiJyArIGl0ZW1bdmFsdWVOYW1lXSArICdcIj48L2RkPicpKTtcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgdmFyIGFsbEVsZSA9IGVsLmZpbmQoJ2RkJykuZXEoMSk7XHJcblxyXG4gICAgICAgIC8vIOa3u+WKoOWkmumAieahhlxyXG5cclxuICAgICAgICBhbGxFbGUubmV4dEFsbCgpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICB2YXIgJGRkID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgaXRlbSA9IGRhdGFbaW5kZXhdLFxyXG4gICAgICAgICAgICBsYXl1aVZhbHVlID0gaXRlbVt2YWx1ZU5hbWVdLFxyXG4gICAgICAgICAgICB0aXRsZSA9IGxheXVpVmFsdWU7XHJcbiAgICAgICAgICBpZiAobGFiZWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aXRsZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxheXVpLmVhY2gobGFiZWwsIGZ1bmN0aW9uIChpLCBuKSB7XHJcbiAgICAgICAgICAgICAgdGl0bGUgKz0gaXRlbVtuXTtcclxuICAgICAgICAgICAgICBpIDwgKGxhYmVsLmxlbmd0aCAtIDEpID8gdGl0bGUgKz0gIGxhYmVsU2VwYXJhdG9yOiAnJztcclxuICAgICAgICAgICAgICAvLyBpIDwgKGxhYmVsLmxlbmd0aCAtIDEpID8gKHRpdGxlICs9ICAobGFiZWxTZXBhcmF0b3IgKyAnPC9zcGFuPicpKTogJyc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgY2hlY2tib3ggPSAkKCc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cIicgKyBNT0RfTkFNRSArICdjaGVja2JveCcgKyBpZCArICdcIiAgeXctaW5kZXg9XCInICsgaXRlbVtpbmRleE5hbWVdICsgJ1wiIGxheS1za2luPVwicHJpbWFyeVwiIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiIGxheXVpLXZhbHVlPVwiJyArIGxheXVpVmFsdWUgKyAnXCI+Jyk7XHJcblxyXG4gICAgICAgICAgaWYgKGl0ZW1bY2hlY2tlZE5hbWVdKSB7XHJcbiAgICAgICAgICAgIGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgdmFsdWVzLnB1c2gobGF5dWlWYWx1ZSk7XHJcbiAgICAgICAgICAgIHN1bSsrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgJGRkLmh0bWwoY2hlY2tib3gpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHZhciBhbGxjaGVja2JveCA9ICQoJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAgc2VsZWN0cGx1cy1hbGwgIGxheS1za2luPVwicHJpbWFyeVwiIHRpdGxlPVwi5YWo6YCJXCIgbGF5dWktdmFsdWU9XCLlhajpgIlcIj4nKTtcclxuICAgICAgICBzdW0gPT09IGRhdGEubGVuZ3RoID8gYWxsY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIHRydWUpIDogXCJcIjtcclxuICAgICAgICBhbGxFbGUuaHRtbChhbGxjaGVja2JveCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCflvIDlkK/kuobliJ3lp4vljJbmqKHlvI8nKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY29uZmlnLnRhZ3NDb250YWluZXInKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb25maWcpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb25maWcudGFnc0NvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICByZW5kZXJJbnB1dFRhZ3MoY29uZmlnLmVsLCB2YWx1ZXMpO1xyXG4gICAgICAgIGFsbEVsZS5wYXJlbnQoKS5wcmV2KCkuZmluZCgnaW5wdXQnKS52YWwodmFsdWVzLmpvaW4odmFsdWVTZXBhcmF0b3IpKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyDmt7vliqDkuovku7ZcclxuICAgICAgICBhbGxFbGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICB2YXIgJGFsbCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGNoZWNrZWQgPSBldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdERCcgPyAkYWxsLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS50b2dnbGVDbGFzcyhDSEVDS0VEKS5oYXNDbGFzcyhDSEVDS0VEKSA6ICRhbGwuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJyk7XHJcblxyXG4gICAgICAgICAgLy8g56aB5q2i5LiL5ouJ5qGG5pS25ZueXHJcbiAgICAgICAgICAkYWxsLnBhcmVudHMoJy4nICsgU0VMRUNUKS5hZGRDbGFzcyhTRUxFQ1RFRCk7XHJcblxyXG4gICAgICAgICAgLy8g6K6+572u6YCJ5Lit54q25oCBIFxyXG4gICAgICAgICAgJGFsbC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBjaGVja2VkKTtcclxuXHJcbiAgICAgICAgICAkYWxsLm5leHRBbGwoKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRkID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgY2hlY2tlZCA/IGRkLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS5hZGRDbGFzcyhDSEVDS0VEKSA6IGRkLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS5yZW1vdmVDbGFzcyhDSEVDS0VEKTtcclxuICAgICAgICAgICAgZGQuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgY2hlY2tlZCk7XHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIC8vIOaYvuekuumAieS4reaVsOaNrlxyXG4gICAgICAgICAgbGF5dWkuZXZlbnQuY2FsbCgkYWxsLCBNT0RfTkFNRSwgJ2NoZWNrYm94JyArICcoJyArIE1PRF9OQU1FICsgJyknLCB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcclxuICAgICAgICAgICAgZWxlOiAkYWxsLFxyXG4gICAgICAgICAgICBlbGVDaGVja2VkOiBjaGVja2VkLFxyXG4gICAgICAgICAgICBpc0FsbDogY2hlY2tlZFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygn5LqL5Lu255qE55uR5ZCsLi4uLicpO1xyXG4gICAgICAgIGNvbmZpZy5lbC5zaWJsaW5ncygnLnBsZy1zZWxlY3QtdGFncycpLm9uKCdjbGljaycsICcuY2xvc2UnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfop6blj5Hngrnlh7vkuovku7YuLi4nKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ+inpuWPkeeCueWHu+S6i+S7ti4uLicpXHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygkKHRoaXMpLnNpYmxpbmdzKCdlbScpLmh0bWwoKSk7XHJcbiAgICAgICAgICAvLyBpZihlbC5maW5kKCcubGF5dWktZm9ybS1zZWxlY3QnKS5oYXNDbGFzcygnbGF5dWktZm9ybS1zZWxlY3RlZCcpKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAvLyDmraTlpITpnIDopoHliKTmlq3lvZPliY3nmoRzZWxlY3QgY2hlY2tib3jmmK/lkKblsZXlvIDvvIzlpoLmnpzlsZXlvIDliJnvvIznrKzkuIDmrKHngrnlh7vnmoTmmK/lhbPpl61cclxuXHJcbiAgICAgICAgICB2YXIgY3VycmVudEh0bWwgPSAkKHRoaXMpLnNpYmxpbmdzKCdlbScpLmh0bWwoKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCB0eXBlb2YgYWxsRWxlLm5leHRBbGwoKSk7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhbGxFbGUubmV4dEFsbCgpKTtcclxuICAgICAgICAgIHZhciBzZWxlY3RMaXN0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYWxsRWxlLm5leHRBbGwoKSk7XHJcbiAgICAgICAgICBzZWxlY3RMaXN0LmZvckVhY2goZnVuY3Rpb24odmFsLCBpbmQpe1xyXG4gICAgICAgICAgICBpZih2YWwuaW5uZXJUZXh0ID09PSBjdXJyZW50SHRtbCl7XHJcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2N1cnJlbnRIdG1sOjonICsgY3VycmVudEh0bWwpO1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdpbmQ6OicgKyBpbmQpO1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfnq4vljbPmiafooYznmoTkuovku7YuLi4uJyk7XHJcbiAgICAgICAgICAgICAgZWwuZmluZCgnZGQnKS5lcShpbmQgKyAyKS5vZmYoKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfnq4vljbPmiafooYznmoTkuovku7YnKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdpbmRleDo6JyArICQodGhpcykuaW5kZXgoKSk7XHJcbiAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmluZGV4KCkgPT09IChpbmQgKyAyKSl7XHJcbiAgICAgICAgICAgICAgICAgIHZhciAkZGQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICBjaGVja2VkID0gZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnREQnID8gJGRkLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS50b2dnbGVDbGFzcyhDSEVDS0VEKS5oYXNDbGFzcyhDSEVDS0VEKSA6ICRkZC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnKTtcclxuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+WHuuWPkeeCueWHu+S6i+S7ticpO1xyXG4gICAgICAgICAgICAgICAgICAvLyDnpoHmraLkuIvmi4nmoYbmlLblm55cclxuICAgICAgICAgICAgICAgICAgJGRkLnBhcmVudHMoJy4nICsgU0VMRUNUKS5hZGRDbGFzcyhTRUxFQ1RFRCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyDorr7nva7pgInkuK3nirbmgIFcclxuICAgICAgICAgICAgICAgICAgJGRkLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWQpO1xyXG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnMjIyMicpO1xyXG4gICAgICAgICAgICAgICAgICAvLyDliKTmlq3lhajpgIlcclxuICAgICAgICAgICAgICAgICAgdmFyICRhbGwgPSAkZGQucGFyZW50cygnZGwnKS5maW5kKCdkZCcpLmVxKDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICRkZHMgPSAkYWxsLm5leHRBbGwoKSxcclxuICAgICAgICAgICAgICAgICAgICBzdW0gPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgJGRkcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcpID8gc3VtKysgOiAnJztcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJzExMTEnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT09ICRkZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+WFqOmAiScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRhbGwuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGFsbC5maW5kKCcuJyArIENMQVNTTkFNRSkuYWRkQ2xhc3MoQ0hFQ0tFRCk7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+mdnuWFqOmAiScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRhbGwuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICRhbGwuZmluZCgnLicgKyBDTEFTU05BTUUpLnJlbW92ZUNsYXNzKENIRUNLRUQpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCcwMDAwMCcpO1xyXG4gICAgICAgICAgICAgICAgICAvLyDmmL7npLrpgInkuK3mlbDmja5cclxuICAgICAgICAgICAgICAgICAgbGF5dWkuZXZlbnQuY2FsbCgkYWxsLCBNT0RfTkFNRSwgJ2NoZWNrYm94JyArICcoJyArIE1PRF9OQU1FICsgJyknLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZTogJGRkLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZUNoZWNrZWQ6IGNoZWNrZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBbGw6IChzdW0gPT09ICRkZHMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhYWFhYScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgIH0pLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGFsbEVsZS5uZXh0QWxsKCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCduZXh0QWxsKCnmraTlpITmmK/ngrnlh7vkuovku7YnKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJCh0aGlzKSk7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbmV4dEFsbCgp5q2k5aSE5piv54K55Ye75LqL5Lu2Jyk7XHJcblxyXG4gICAgICAgICAgdmFyICRkZCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGNoZWNrZWQgPSBldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdERCcgPyAkZGQuZmluZCgnLicgKyBDTEFTU05BTUUpLnRvZ2dsZUNsYXNzKENIRUNLRUQpLmhhc0NsYXNzKENIRUNLRUQpIDogJGRkLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgIC8vIOemgeatouS4i+aLieahhuaUtuWbnlxyXG4gICAgICAgICAgJGRkLnBhcmVudHMoJy4nICsgU0VMRUNUKS5hZGRDbGFzcyhTRUxFQ1RFRCk7XHJcblxyXG4gICAgICAgICAgLy8g6K6+572u6YCJ5Lit54q25oCBXHJcbiAgICAgICAgICAkZGQuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgY2hlY2tlZCk7XHJcblxyXG4gICAgICAgICAgLy8g5Yik5pat5YWo6YCJXHJcbiAgICAgICAgICB2YXIgJGFsbCA9ICRkZC5wYXJlbnRzKCdkbCcpLmZpbmQoJ2RkJykuZXEoMSksXHJcbiAgICAgICAgICAgICRkZHMgPSAkYWxsLm5leHRBbGwoKSxcclxuICAgICAgICAgICAgc3VtID0gMDtcclxuICAgICAgICAgICRkZHMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJykgPyBzdW0rKyA6ICcnO1xyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICBpZiAoc3VtID09PSAkZGRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkYWxsLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkYWxsLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS5hZGRDbGFzcyhDSEVDS0VEKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRhbGwuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkYWxsLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS5yZW1vdmVDbGFzcyhDSEVDS0VEKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyDmmL7npLrpgInkuK3mlbDmja5cclxuICAgICAgICAgIGxheXVpLmV2ZW50LmNhbGwoJGFsbCwgTU9EX05BTUUsICdjaGVja2JveCcgKyAnKCcgKyBNT0RfTkFNRSArICcpJywge1xyXG4gICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCIsXHJcbiAgICAgICAgICAgIGVsZTogJGRkLFxyXG4gICAgICAgICAgICBlbGVDaGVja2VkOiBjaGVja2VkLFxyXG4gICAgICAgICAgICBpc0FsbDogKHN1bSA9PT0gJGRkcy5sZW5ndGgpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyDmuLLmn5PlpJrpgInmoYZcclxuICAgICAgICAvLyBlbC5uZXh0KCkuZmluZCgnZGwnKS5hZGRDbGFzcygneXctc2VsZWN0UGx1cycpO1xyXG4gICAgICAgIGZvcm0ucmVuZGVyKCdjaGVja2JveCcsIGZpbHRlcik7XHJcblxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g5Y2V6YCJXHJcbiAgICAgIHJhZGlvOiBmdW5jdGlvbiAoY29uZmlnLCBkYXRhLCBpZCkge1xyXG4gICAgICAgIHZhciBDTEFTU05BTUUgPSAnbGF5dWktZm9ybS1yYWRpbycsXHJcbiAgICAgICAgICBDSEVDS0VEID0gJ2xheXVpLWZvcm0tcmFkaW9lZCcsXHJcbiAgICAgICAgICBJQ09OID0gWycmI3hlNjQzOycsICcmI3hlNjNmOyddLFxyXG4gICAgICAgICAgQ0hFQ0tFRF9JQ09OID0gJ2xheXVpLWFuaW0tc2NhbGVTcHJpbmcnLFxyXG5cclxuICAgICAgICAgIGVsSUQgPSBjb25maWcuZWwsXHJcbiAgICAgICAgICBlbCA9IGNvbmZpZy5yZUVsZW0uZmluZCgnZGwnKSxcclxuICAgICAgICAgIHZhbHVlTmFtZSA9IGNvbmZpZy52YWx1ZU5hbWUsXHJcbiAgICAgICAgICBjaGVja2VkTmFtZSA9IGNvbmZpZy5jb25maWcuY2hlY2tlZE5hbWUsXHJcbiAgICAgICAgICBpbmRleE5hbWUgPSBjb25maWcuY29uZmlnLmluZGV4TmFtZSxcclxuICAgICAgICAgIGNoZWNrZWREYXRhID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1bY2hlY2tlZE5hbWVdID09PSB0cnVlO1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICB2YWx1ZXMgPSBjb25maWcudmFsdWVzLFxyXG4gICAgICAgICAgbGFiZWwgPSBjb25maWcubGFiZWwsXHJcbiAgICAgICAgICBmaWx0ZXIgPSBjb25maWcuZmlsdGVyLFxyXG4gICAgICAgICAgbGFiZWxTZXBhcmF0b3IgPSBjb25maWcubGFiZWxTZXBhcmF0b3IsXHJcbiAgICAgICAgICB2YWx1ZVNlcGFyYXRvciA9IGNvbmZpZy52YWx1ZVNlcGFyYXRvcjtcclxuXHJcblxyXG4gICAgICAgIC8vIOa3u+WKoOmAiemhuVxyXG4gICAgICAgIGxheXVpLmVhY2goZGF0YSwgZnVuY3Rpb24gKGksIGl0ZW0pIHtcclxuICAgICAgICAgIGVsLmFwcGVuZCgnPGRkIGxheS12YWx1ZT1cIicgKyBpdGVtW3ZhbHVlTmFtZV0gKyAnXCI+PC9kZD4nKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGZvcm0ucmVuZGVyKCdzZWxlY3QnLCBvcHRpb25zLmZpbHRlcik7XHJcblxyXG5cclxuICAgICAgICAvLyDmuLLmn5PljZXpgInmoYZcclxuICAgICAgICBlbC5maW5kKCdkZCcpLmVxKDApLm5leHRBbGwoKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgdmFyICRkZCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGl0ZW0gPSBkYXRhW2luZGV4XSxcclxuICAgICAgICAgICAgbGF5dWlWYWx1ZSA9IGl0ZW1bdmFsdWVOYW1lXSxcclxuICAgICAgICAgICAgdGl0bGUgPSBsYXl1aVZhbHVlO1xyXG4gICAgICAgICAgaWYgKGxhYmVsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGl0bGUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsYXl1aS5lYWNoKGxhYmVsLCBmdW5jdGlvbiAoaSwgbikge1xyXG4gICAgICAgICAgICAgIHRpdGxlICs9IGl0ZW1bbl07XHJcbiAgICAgICAgICAgICAgaSA8IChsYWJlbC5sZW5ndGggLSAxKSA/IHRpdGxlICs9IGxhYmVsU2VwYXJhdG9yIDogJyc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIGRkID0gJCgnPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCInICsgTU9EX05BTUUgKyAncmFkaW8nICsgaWQgKyAnXCIgIHl3LWluZGV4PVwiJyArIGl0ZW1baW5kZXhOYW1lXSArICdcIiBsYXktc2tpbj1cInByaW1hcnlcIiB0aXRsZT1cIicgKyB0aXRsZSArICdcIiBsYXl1aS12YWx1ZT1cIicgKyBsYXl1aVZhbHVlICsgJ1wiPicpO1xyXG5cclxuICAgICAgICAgIGlmIChjaGVja2VkRGF0YS5sZW5ndGggPiAwICYmIGNoZWNrZWREYXRhWzBdW2luZGV4TmFtZV0gPT09IGl0ZW1baW5kZXhOYW1lXSkge1xyXG4gICAgICAgICAgICBkZC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKGxheXVpVmFsdWUpO1xyXG4gICAgICAgICAgICAkZGQucGFyZW50KCkucHJldigpLmZpbmQoJ2lucHV0JykudmFsKHZhbHVlcy5qb2luKHZhbHVlU2VwYXJhdG9yKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICRkZC5odG1sKGRkKTtcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy8gZWwubmV4dCgpLmZpbmQoJ2RsJykuYWRkQ2xhc3MoJ3l3LXNlbGVjdFBsdXMnKTtcclxuICAgICAgICBmb3JtLnJlbmRlcigncmFkaW8nLCBmaWx0ZXIpO1xyXG5cclxuICAgICAgICAvLyDkuovku7ZcclxuICAgICAgICBlbC5maW5kKCdkZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgdmFyICRkZCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAkZGQuZmluZCgnLicgKyBDTEFTU05BTUUpLmFkZENsYXNzKENIRUNLRUQpLmZpbmQoJ2knKS5hZGRDbGFzcyhDSEVDS0VEX0lDT04pLmh0bWwoSUNPTlswXSk7XHJcbiAgICAgICAgICAkZGQuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAkZGQuc2libGluZ3MoKS5maW5kKCcuJyArIENMQVNTTkFNRSkucmVtb3ZlQ2xhc3MoQ0hFQ0tFRCkuZmluZCgnaScpLnJlbW92ZUNsYXNzKENIRUNLRURfSUNPTikuaHRtbChJQ09OWzFdKTtcclxuICAgICAgICAgICRkZC5zaWJsaW5ncygpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgIC8vIOaYvuekuumAieS4reaVsOaNrlxyXG4gICAgICAgICAgbGF5dWkuZXZlbnQuY2FsbCgkZGQsIE1PRF9OQU1FLCAncmFkaW8nICsgJygnICsgTU9EX05BTUUgKyAnKScsIHtcclxuICAgICAgICAgICAgdHlwZTogXCJyYWRpb1wiLFxyXG4gICAgICAgICAgICBlbGU6ICRkZCxcclxuICAgICAgICAgICAgZWxlQ2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgaXNBbGw6IGZhbHNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8g6YCJ5oup5pe26Kem5Y+R55qE5LqL5Lu2XHJcbiAgICBsYXl1aS5vbmV2ZW50LmNhbGwodGhhdCwgTU9EX05BTUUsIHR5cGUgKyAnKCcgKyBNT0RfTkFNRSArICcpJywgdGhhdC5jaGVja2VkLmJpbmQodGhhdCkpO1xyXG5cclxuICAgIGl0ZW1zW3R5cGVdID8gaXRlbXNbdHlwZV0ob3B0aW9ucywgZGF0YSwgaWQpIDogaGludC5lcnJvcign5LiN5pSv5oyB55qEJyArIHR5cGUgKyAn6KGo5Y2V5riy5p+TJyk7XHJcblxyXG4gIH1cclxuXHJcbiAgLy8g6YCJ5Lit5pWw5o2u5aSE55CGXHJcbiAgQ2xhc3MucHJvdG90eXBlLmNoZWNrZWQgPSBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgIG9wdGlvbnMgPSB0aGF0LmNvbmZpZyxcclxuICAgICAgZGF0YSA9IG9wdGlvbnMuZGF0YSxcclxuICAgICAgY2hlY2tlZE5hbWUgPSBvcHRpb25zLmNvbmZpZy5jaGVja2VkTmFtZSxcclxuICAgICAgdHlwZSA9IHJlcy50eXBlLFxyXG4gICAgICBpc0FsbCA9IHJlcy5pc0FsbCxcclxuICAgICAgZWxlID0gcmVzLmVsZSxcclxuICAgICAgZWxlQ2hlY2tlZCA9IHJlcy5lbGVDaGVja2VkLFxyXG4gICAgICBmaWx0ZXIgPSBvcHRpb25zLmVsLmF0dHIoJ2xheS1maWx0ZXInKTtcclxuXHJcbiAgICBpZiAodHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICBvcHRpb25zLnZhbHVlcyA9IFtdO1xyXG4gICAgICBlbGUucGFyZW50cygnZGwnKS5maW5kKCdbdHlwZT1cImNoZWNrYm94XCJdJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIHZhciAkZGQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgeXdJbmRleCA9ICRkZC5hdHRyKCd5dy1pbmRleCcpLFxyXG4gICAgICAgICAgY2hlY2tlZCA9ICRkZC5wcm9wKCdjaGVja2VkJyk7XHJcbiAgICAgICAgeXdJbmRleCA/IGRhdGFbeXdJbmRleF1bY2hlY2tlZE5hbWVdID0gY2hlY2tlZCA6IFwiXCI7XHJcbiAgICAgICAgY2hlY2tlZCAmJiB5d0luZGV4ID8gb3B0aW9ucy52YWx1ZXMucHVzaCgkZGQuYXR0cignbGF5dWktdmFsdWUnKSkgOiBcIlwiO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8g5q2k5aSE5YGaaW5wdXTmoYbnmoTmuLLmn5Plip/og71cclxuICAgICAgcmVuZGVySW5wdXRUYWdzKGNvbmZpZy5lbCwgb3B0aW9ucy52YWx1ZXMpO1xyXG4gICAgICBlbGUucGFyZW50KCkucHJldigpLmZpbmQoJ2lucHV0JykudmFsKG9wdGlvbnMudmFsdWVzLmpvaW4ob3B0aW9ucy52YWx1ZVNlcGFyYXRvcikpO1xyXG5cclxuXHJcbiAgICAgIGxheXVpLmV2ZW50LmNhbGwoZWxlLCBNT0RfTkFNRSwgTU9EX05BTUUgKyAnKCcgKyBmaWx0ZXIgKyAnKScsIHtcclxuICAgICAgICBjaGVja2VkOiBlbGVDaGVja2VkLFxyXG4gICAgICAgIGlzQWxsOiBpc0FsbCxcclxuICAgICAgICB2YWx1ZXM6IG9wdGlvbnMudmFsdWVzLFxyXG4gICAgICAgIGNoZWNrZWREYXRhOiBkYXRhLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgcmV0dXJuIGl0ZW1bY2hlY2tlZE5hbWVdID09PSB0cnVlO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGVsZTogZWxlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JhZGlvJykge1xyXG5cclxuICAgICAgdmFyIGluZGV4ID0gZWxlLmZpbmQoJ2lucHV0JykuYXR0cigneXctaW5kZXgnKSxcclxuICAgICAgICB2YWx1ZSA9IGVsZS5maW5kKCdpbnB1dCcpLmF0dHIoJ2xheXVpLXZhbHVlJyk7XHJcblxyXG4gICAgICBvcHRpb25zLnZhbHVlcyA9IFt2YWx1ZV07XHJcbiAgICAgIGVsZS5wYXJlbnQoKS5wcmV2KCkuZmluZCgnaW5wdXQnKS52YWwodmFsdWUpO1xyXG5cclxuICAgICAgbGF5dWkuZWFjaChkYXRhLCBmdW5jdGlvbiAoaSwgaXRlbSkge1xyXG4gICAgICAgIGl0ZW1bY2hlY2tlZE5hbWVdID0gZmFsc2U7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBkYXRhW2luZGV4XVtjaGVja2VkTmFtZV0gPSB0cnVlO1xyXG5cclxuICAgICAgbGF5dWkuZXZlbnQuY2FsbChlbGUsIE1PRF9OQU1FLCBNT0RfTkFNRSArICcoJyArIGZpbHRlciArICcpJywge1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICBjaGVja2VkRGF0YTogZGF0YVtpbmRleF0sXHJcbiAgICAgICAgZWxlOiBlbGVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgLy8g6I635Y+W6YCJ5Lit5pWw5o2uXHJcbiAgQ2xhc3MucHJvdG90eXBlLmdldENoZWNrZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgIG9wdGlvbnMgPSB0aGF0LmNvbmZpZyxcclxuICAgICAgZGF0YSA9IG9wdGlvbnMuZGF0YSxcclxuICAgICAgY2hlY2tlZE5hbWUgPSBvcHRpb25zLmNvbmZpZy5jaGVja2VkTmFtZTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWx1ZXM6IG9wdGlvbnMudmFsdWVzLFxyXG4gICAgICBkYXRhOiBkYXRhLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtW2NoZWNrZWROYW1lXSA9PT0gdHJ1ZTtcclxuICAgICAgfSlcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyDmoLjlv4PlhaXlj6NcclxuICBzZWxlY3RQbHVzLnJlbmRlciA9IGZ1bmN0aW9uIChvcHRpb25zLCB0YWdzQ29udGFpbmVyKSB7XHJcblxyXG4gICAgdmFyIGlucyA9IG5ldyBDbGFzcyhvcHRpb25zLCB0YWdzQ29udGFpbmVyKTtcclxuICAgIHJldHVybiB0aGlzSW5zLmNhbGwoaW5zKTtcclxuICB9O1xyXG5cclxuICBleHBvcnRzKCdzZWxlY3RQbHVzJywgc2VsZWN0UGx1cyk7XHJcblxyXG59KSIsIjsoZnVuY3Rpb24gKCQsIGxheXVpKSB7XHJcbiAgJC5mbi5QbGdTZWxlY3RQbHVzVGFncyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gbmV3IHBsZ1NlbGVjdFBsdXNUYWdzKG9wdGlvbnMpO1xyXG5cclxufTtcclxuXHJcbiAgdmFyIHRlbXAgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibGF5dWktaW5wdXQtYmxvY2sgcGxnLXNlbGVjdC10YWdzXCI+PC9kaXY+YFxyXG4gIH1cclxuXHJcbiAgdmFyIHBsZ1NlbGVjdFBsdXNUYWdzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIFxyXG4gICAgdGhpcy5yZW5kZXIob3B0aW9ucyk7XHJcblxyXG4gIH07XHJcblxyXG4gIHBsZ1NlbGVjdFBsdXNUYWdzLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuICAgICQoJyMnICsgb3B0aW9ucy5yZW5kZXJlcikuYWZ0ZXIodGVtcCgpKTtcclxuICAgIG9wdGlvbnMuZWwgPSAnIycgKyBvcHRpb25zLnJlbmRlcmVyO1xyXG4gICAgZGVsZXRlIG9wdGlvbnMucmVuZGVyZXI7XHJcbiAgICByZXR1cm4gbGF5dWkuc2VsZWN0UGx1cy5yZW5kZXIob3B0aW9ucyk7XHJcbiAgfVxyXG4gIFxyXG4gIHdpbmRvdy5QbGdTZWxlY3RQbHVzVGFncyA9IHBsZ1NlbGVjdFBsdXNUYWdzO1xyXG4gIFxyXG5cclxufSkoalF1ZXJ5LCBsYXl1aSk7Il19
