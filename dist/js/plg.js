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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsZ0NhcmQuanMiLCJQbGdDYXJkTGlzdC5qcyIsIlBsZ0RhdGUuanMiLCJQbGdEaWFsb2cuanMiLCJQbGdJbnB1dFRhZ3MuanMiLCJQbGdQYW5lbC5qcyIsIlBsZ1NlbGVjdFRhZ3MuanMiLCJQbGdTaWRlQWNjb3JkaW9uLmpzIiwiUGxnU2lkZUFjY29yZGlvblJvdXRlLmpzIiwiUGxnVGFicy5qcyIsIlBsZ1p0cmVlLmpzIiwiY29yZS5qcyIsInNlbGVjdFBsdXMuanMiXSwibmFtZXMiOlsiJCIsImZuIiwiaW5pdFBsZ0NhcmQiLCJvcHRpb25zIiwicGciLCJQbGdDYXJkIiwiaWQiLCJhdHRyIiwicmVuZGVyVG8iLCJyZW5kZXJlciIsImh0bWxGcmFnbWVudCIsImNvbmZpZyIsImV4dGVuZCIsImZhY3RvcnkiLCJfc3R5bGUiLCJzdHlsZSIsIl9kYXRhIiwiZGF0YSIsIl9zdHJUaXRsZSIsIl9zdHJIZWFkIiwiX3N0clRpdGxlSGVhZCIsIl9zdHJGb290ZXIiLCJzZWxmIiwidGVtRnJhZ21lbnQiLCJmb3JFYWNoIiwidmFsIiwiY2FyZE5vIiwiY2FyZE5hbWUiLCJ0ZW1CdG5zIiwiYnRuIiwidmFsdWUiLCJ0ZXh0IiwidGl0bGUiLCJnZW5lcmF0ZU9uZVRlbXBsYXRlIiwiZGF0YUxpc3QiLCJsZW5ndGgiLCJhZGRUZW1wbGF0ZSIsImF0dHJOYW1lIiwiRXJyb3IiLCJvbiIsImV2ZW50bmFtZSIsImNhbGxiYWNrIiwiUk9VVElORV9PUEVSQVRJT04iLCJDT01QTEVYX09QRVJBVElPTiIsImluY2x1ZGVzIiwiZSIsInRlbUluZGV4IiwiY2xvc2VzdCIsImluZGV4IiwiY2FsbF9iYWNrX2ZuIiwib2ZmIiwiZ3JvdXBJbmRleCIsImN1cnJlbnREYXRhIiwidW5kZWZpbmVkIiwiYXBwZW5kIiwiZ2V0SHRtbEZyYWdtZW50Iiwid2luZG93IiwialF1ZXJ5IiwiaW5pdFBsZ0NhcmRMaXN0IiwiUGxnQ2FyZExpc3QiLCJpc1Nob3dBZGQiLCJPYmplY3QiLCJhc3NpZ24iLCJ0ZW1TdHIiLCJ6b25lTmFtZSIsInpvbmVJZCIsIl9zdHJDZWxsU3RhcnQiLCJfc3RyQ2VsbEhlYWQiLCJoZWFkIiwiX3N0ckNlbGxCb2R5IiwiZGVzIiwiX3N0ckNlbGxGb290ZXIiLCJvYmoiLCJ1c2VObyIsIm9wZXJhdEZuTGVuZ3RoIiwia2V5cyIsImJ0bnMiLCJpdGVtIiwiY29uc29sZSIsImVycm9yIiwiX3N0ckNlbGxFbmQiLCJjdXN0b21lckxpc3QiLCJtYXAiLCJ0ZW1PYmoiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJwcm90b3R5cGUiLCJjdXNvbiIsImV2ZW50IiwiZmluZCIsImVxIiwiY3VycmVudElkIiwibGF5dWkiLCJ1c2UiLCJwbGdEYXRlIiwibGF5ZGF0ZSIsInBsZ0RhdGVSZW5kZXIiLCJfdGhpcyIsIm9wdHMiLCJlYWNoIiwiZWxlbSIsIm90cHMiLCJyZW5kZXIiLCJzZWxlY3RvciIsImxheWVyIiwiYW5pbSIsInpJbmRleCIsInNoYWRlIiwiYnRuQWxpZ24iLCJmaXhlZCIsInBsZ0RpYWxvZyIsInNob3dVcGxvYWREaWFsb2ciLCJ1cmwiLCJ3aW5vcHRpb25zIiwic2tpbiIsImNsb3NlQnRuIiwidHlwZSIsInJlc2l6ZSIsImJ0bjEiLCJsYXllcm8iLCJQbGdEaWFsb2ciLCJjbG9zZSIsImJ0bjIiLCJhcmVhIiwiY29udGVudCIsInN1Y2Nlc3MiLCJmb3JtZGF0YSIsIm1mIiwiUGxnRm9ybSIsIml0ZW1zIiwib3BlbiIsInNob3dHcmlkRGlhbG9nIiwicGxnR3JpZCIsInRpcHNNb3JlIiwiZ2V0U2VsZWN0ZWRSb3dJZCIsIm1zZyIsInJlY29yZCIsImdldFNlbGVjdGVkUm93RGF0YSIsIndpZHRoIiwiaGVpZ2h0IiwicGFuZWxJZCIsImxvYWREYXRhIiwicmlkIiwiaW5kIiwiZ2V0VXNlckRhdGEiLCJidG4zIiwibG9hZGluZzIiLCJsb2FkIiwiaW5pdFBsZ0lucHV0VGFncyIsInBsZ0lucHV0VGFncyIsInBhcmFtcyIsImNsYXNzTWFpbiIsImNoZWNrYm94TmFtZSIsImxheUZpbHRlciIsImRvbSIsInRhZ3NJZCIsIlByb2xvZyIsImNyZWF0ZVJhbmRvbUlkIiwibWV1blBhbmVsVGhpcyIsInNldERlZmF1bHRWYWx1ZSIsImhhc093blByb3BlcnR5IiwiY2hlY2tlZCIsIndyYXBUZW1wbGF0ZSIsInRlbVRlbXBsYXRlIiwiYWxpYXMiLCJ3cmFwVGFtcGxhdGUiLCJ0YXJnZXRJZCIsIiR0YXJnZXRJZCIsIiR0YWdzSWQiLCJmb3JtIiwidGFnTGlzdCIsImlucHV0VGFncyIsImluaXQiLCJjaGVja2JveExpc3QiLCJzaWJsaW5ncyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdXNoIiwidiIsImFkZCIsInRlbVRlbXBhbHRlIiwidGVtSW5wdXRIaWRkZW4iLCJhZnRlciIsImluZGV4T2YiLCJkZWwiLCJzcGxpY2UiLCJlbXB0eSIsInJlbW92ZSIsImlzQ2hlY2tlZCIsImpxdWVyeUVsZW0iLCJ0ZW1KcXVlcnlPYmoiLCJodG1sIiwiY2hlY2tlZExpc3QiLCJBcnJheSIsInNsaWNlIiwiY2FsbCIsInRlbUh0bWwiLCJ0cmlnZ2VyIiwiUGxnSW5wdXRUYWdzIiwidGVtcGxhdGUiLCJzYWxmIiwic2tpbk9CSiIsImNsYXNzTmFtZSIsImhlYWRlciIsImlzU2hvdyIsIm1vcmVCdG4iLCJpY29uIiwiUGFuZWxGb3JtIiwiZGVmYXVsdEJvZHkiLCJsYXlvdXRDb2wiLCJpbnB1dEJsb2NrIiwidmFsdWVCaiIsImNvbHMiLCJhcnIiLCJvZmZzZXQiLCJsYWJlbCIsImpvaW4iLCJwbGdQYW5lbCIsImVsZSIsIkRhdGUiLCJ2YWx1ZU9mIiwib3B0IiwiYXJndW1lbnRzIiwiZW1weXQiLCJnZXRFbGVtZW50IiwiYXBwZW5kUGFuZWxCb2R5IiwiRWxlbWVudE9iamNldCIsImlzRW1wdHkiLCJkaXIiLCJ0b1N0cmluZyIsIm5vZGVUeXBlIiwibm9kZU5hbWUiLCJIVE1MRWxlbWVudCIsImlzQXJyYXkiLCJQbGdQYW5lbCIsIlBsZ1NlbGVjdFBsdXNUYWdzIiwicGxnU2VsZWN0UGx1c1RhZ3MiLCJ0ZW1wIiwiZWwiLCJzZWxlY3RQbHVzIiwic3RyQ2hpbmVzZUZpcnN0UFkiLCJvTXVsdGlEaWZmIiwibWFrZVB5Iiwic3RyIiwiYXJyUmVzdWx0IiwiaSIsImxlbiIsImNoIiwiY2hhckF0IiwiY2hlY2tDaCIsIm1rUnNsdCIsInVuaSIsImNoYXJDb2RlQXQiLCJhcnJSc2x0Iiwic3RybGVuIiwiayIsInRtcEFyciIsInRtcCIsImoiLCJjb25jYXQiLCJTdHJpbmciLCJ0cmltIiwicmVwbGFjZSIsInBpbnlpbiIsImVsZW1lbnQiLCJ3aW4iLCJkb2MiLCJkb2N1bWVudCIsImxvYWRpbmciLCJwbGdTaWRlYmFyIiwiQ2xhc3NNYWluIiwiZG9jdW1lbnRQYW5lbCIsIl9nZXREYXRhIiwiZ2V0RGF0YSIsInBhcmVudERhdGEiLCJyZW5kZXJOYXYiLCJtYWluTmF2Iiwib3BlcyIsInRtbCIsImxvZ28iLCJmaWx0ZXIiLCJwYXJlbnRNZW51SWQiLCJtZW51SWQiLCJpbWFnZVBhdGgiLCJsZWFmIiwicGF0aCIsInJlc2V0T3Blbk1lbnVMaXN0IiwiZ3JvdXAiLCJpbnhleCIsImNpdGVtIiwiZGl0ZW0iLCJoaWRlIiwic2V0T3BlbkFsbCIsImxpc3QiLCJtZXVuZ3JvdXBMaXN0IiwicGFyZW50RGF0YXMiLCJrZXlVcExpc3QiLCJyZWdDSCIsIlJlZ0V4cCIsImtleXVwIiwidG9VcHBlckNhc2UiLCJuZXh0Iiwic2hvdyIsImtleSIsIm1hcEFsbCIsInRlc3QiLCJQWV9jb2RlIiwibWV1blRvcE9iaiIsInBhcnNlSW50Iiwib2Zmc2V0VG9wIiwicmVtb3ZlclNob3dMaXN0IiwibWV1blNvcm9sbCIsInJlbW92ZUNsYXNzIiwiY2xpY2tDaGlsZCIsImNhbGxiYWtjIiwib3RoaXMiLCJib2R5TmF2Iiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJtaWQiLCJib2R5TmF2X3RoaXMiLCJib2R5TmF2X3BhcmVudCIsInBhcmVudCIsImJvZHlOYXZfY2hpbGQiLCJjYWxsYmFrY0RhdGEiLCJnZXRDdXJyZW50IiwicGlkIiwicGFyZW50cyIsImhyZWYiLCJ1cGRhdGVDaGlsZE1ldW4iLCJFdmVudEhhbmxkZXIiLCJoYXNDbGFzcyIsImNsaWNrIiwiYWRkQ2xhc3MiLCJob3ZlciIsImV2ZSIsInRhcmdldCIsInRvZ2dsZUNsYXNzIiwicGFyZW50Tm9kZSIsIm1ldW5Ub3AiLCJzSXRlbSIsInRoaXNIcmVmIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm1lbnVpZCIsIkJvb2xlYW4iLCJzZXRUaW1lb3V0IiwidGFiQXJyYXkiLCJwYXJOYXYiLCJvbGlDbGFzcyIsIm9saSIsIm9hIiwibGV2ZWwiLCJuYXZjaGlsZCIsImluaXRQYW5lbCIsInByTGVmdCIsIiR0YWJsaSIsIiRuYXZfaG92ZXJfY2hpbGQiLCJnZXRGdW4iLCJyb3V0ZSIsIm1lbnVDbGljayIsImlzVHJpZ2dlciIsInNldE1hcERhdGEiLCJjbG9zZUxvYWQiLCJkYXRhQWxsIiwibWFwZGF0YSIsInN5bmNBamF4IiwicmVzIiwiZXJyIiwiZGF0YVR5cGUiLCJfY2xhc3MiLCJkb21JZCIsIlBsZ1NpZGVBY2NvcmRpb24iLCJpbml0UGxnU2lkZUFjY29yZGlvbiIsImZpbHRlckRhdGEiLCJEYXRhIiwidmFsdWVzIiwibWFwUmVzZXRPcGVuTWVudUxpc3QiLCJtYXBEYXRhIiwidHJlZURhdGEiLCJyZWN1cnNpdmUiLCJjaGlsZCIsImhhc2giLCJpc0FjdGl2ZSIsIm1hcFVwZGF0ZUNoaWxkcmVuTmFuIiwidHJlZSIsImNoaWxkcmVuIiwic2lkZWJhckxpIiwiYmxhbmsiLCJjaGlsZEl0ZW0iLCJtYXBVcGRhdGVNYWluTmF2IiwiVGVtcGxhdGVNYXAiLCJ0cGwiLCJ2aXBzcGEiLCJpbmRleElkIiwiYWpheEluaXQiLCJsb2FkZGF0YSIsIkxvYWREYXRhIiwiZGVmaW5lUHJvcGVydGllcyIsImdldCIsInNldCIsIm5ld1ZhbHVlIiwicm91dGVyTWFwIiwicGFyc2UiLCJsb2NhdGlvbiIsImxvZ29Gb2xkIiwibmF2TGFzdCIsInJlc3VsdCIsInNsZmUiLCJpcyIsInNpZGViYXIiLCJzbGlkZVRvZ2dsZSIsInNsaWRlVXAiLCJzZXRPcGVuS2V5dXAiLCJ0aXAiLCJvdXRlckhUTUwiLCIkZG9tIiwibmF2X2hvdmVyX2NoaWxkIiwib2JqZWN0Iiwicm91dGVTZXR0aW5nIiwidHJlZWRhdGEiLCJyZXNwb25zZSIsInJlc3VsdE5hbWUiLCJpZGFyciIsInVuc2hpZnQiLCJ0b1RyZWUiLCJzdWJzdHIiLCJzcGxpdCIsIm1hdGNoIiwidGVtcGxhdGVVcmwiLCJpZnJhbWUiLCJjb250cm9sbGVyIiwic3JjUGF0aCIsInBhcmVudF9uYW1lIiwic3RhdGVBcnIiLCJYTUxIdHRwUmVxdWVzdCIsInRleHRTdGF0dXMiLCJlcnJvclRocm93biIsInF1ZXJ5SWQiLCJvcGVyYXRlVHlwZSIsImxhc3RNb2RpZnlUaW1lIiwiaGVscENvZGUiLCJjcmVhdG9yTmFtZSIsImNyZWF0b3JJZCIsImNyZWF0ZVRpbWUiLCJtb2RpZmllcklkIiwibW9kaWZpZXJOYW1lIiwic29ydCIsIlBsZ1NpZGVBY2NvcmRpb25Sb3V0ZSIsInNraW5BcnIiLCJub3JtYWwiLCJicmllZiIsImNhcmQiLCJwbGd0YWJzIiwiaXRlbWxpc3QiLCJycCIsInJhIiwiaW5kZXhBY3RpdmUiLCJ0cCIsImFsbG93Q2xvc2UiLCJjbG9zZUFsbCIsInBsZ1RhYnMiLCJwcmVJbmRleCIsInRpbWUiLCJmYWRlSW4iLCIkdGhpcyIsImRlbGV0ZVRhYnMiLCJ5ZXMiLCJsb2ciLCJhZGRUYWJzIiwibGF5aWQiLCJjaGFuZ2VUYWJzIiwiZ2V0TnVtIiwidGl0bGVPYmoiLCJjb3VudCIsImNvdW50MDEiLCJvdXRlcldpZHRoIiwiY291bnQwMiIsInByZXYiLCJsaXciLCJsaU51bSIsIk1hdGgiLCJmbG9vciIsInBpbmRleCIsImJvb2xlIiwiaXNDaGFuZ2UiLCJjdXJMaSIsIk51bWJlciIsImRlZmluZSIsImFqYXgiLCJyZWFuZFRwbCIsInRhYkFkZCIsIm1lc3NhZ2UiLCJzdGFjayIsInJlZyIsImVsZU9iaiIsInRhYkNoYW5nZSIsIml0bWUiLCJ0YWJEZWxldGUiLCJldmVudE5hbWUiLCJQbGdUYWJzIiwiaW5pdFBsZ1RhYnMiLCJ6VHJlZSIsImlzUGFyZW50IiwiRXhwYW5kIiwidHJlZUlkIiwidHJlZU5vZGUiLCJ0SWQiLCJnZXRaVHJlZU9iaiIsIk5PZGVzIiwiZ2V0Tm9kZXMiLCJ0ZCIsImV4cGFuZE5vZGUiLCJwbGdadHJlZSIsImluaXRBamF4IiwidG9vbEJhciIsInRvb2xCYXIyIiwic2V0RGF0YSIsImlzRXhwYW5kIiwic2V0dGluZyIsInZpZXciLCJzZWxlY3RlZE11bHRpIiwic2ltcGxlRGF0YSIsImVuYWJsZSIsImlkS2V5IiwicElkS2V5Iiwicm9vdFBJZCIsIm9uRXhwYW5kIiwiYmluZCIsInNldERhdGUiLCJvbnJlc2l6ZSIsInBPYmoiLCJ0b29sYmFyQnRuSGVpZ2h0IiwidG9vbGJhckJ0bjIiLCJwYXJlbnRIZWlnaHQiLCJjc3MiLCJvYmpVbCIsImNsYXNzIiwidHJlZU9iaiIsInRvb2xiYXJCdG4iLCJidG5Hcm91cCIsImJ0bkdyb3VwMiIsIm5ld0NvdW50Iiwibm9kZU9iaiIsInN5c3RlbUlkIiwibm9kZXMiLCJnZXRTZWxlY3RlZE5vZGVzIiwiRXZlbnRDYWxsYmFjayIsImFkZE5vZGVzIiwic2VsZWN0Tm9kZSIsIlBsZ1p0cmVlIiwiZm9ybWF0IiwiZm10IiwibyIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCIkMSIsImdldEZ1bGxZZWFyIiwiZGh0bWxYQ2FsZW5kYXJPYmplY3QiLCJsYW5nRGF0YSIsImRhdGVmb3JtYXQiLCJtb250aGVzRk5hbWVzIiwibW9udGhlc1NOYW1lcyIsImRheXNGTmFtZXMiLCJkYXlzU05hbWVzIiwid2Vla3N0YXJ0Iiwid2Vla25hbWUiLCJ0b2RheSIsImNsZWFyIiwibGFuZyIsIkdyaWRCYXNlUGF0aCIsInRva2VuIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldFRvcCIsIm9mZnNldFBhcmVudCIsImdldExlZnQiLCJvZmZzZXRMZWZ0IiwiaGFzSnNvbiIsImpzb25BcnJheSIsImpzb24iLCJiIiwicGRlZmF1bHQiLCJ0aW1lb3V0IiwiYmVmb3JlU2VuZCIsInhociIsInNldFJlcXVlc3RIZWFkZXIiLCJhc3luYyIsImdldEZvcm1CeUlkIiwiZm9ybUlkIiwibXlmb3JtIiwiZ2V0SnNvbkRhdGEiLCJmaWVsZHMiLCJQcm9sb2dGb3JtIiwiZ2V0VGltZSIsInJhbmRvbSIsImFwcGVuZFRvIiwiY2xvc2VMb2FkaW5nIiwiZGVsR3JpZFJvd0RhdGEiLCJncmlkIiwiY29udGVudHR5cGUiLCJwYXJhbSIsIm11bHRpc2VsZWN0IiwiZ2V0Q2hlY2tlZElkcyIsImNvbmZpcm0iLCJjb250ZW50VHlwZSIsInJlbG9hZCIsInBhcnNlSlNPTiIsImV4cG9ydHMiLCJoaW50IiwiTU9EX05BTUUiLCJTRUxFQ1QiLCJTRUxFQ1RFRCIsInRoYXQiLCJldmVudHMiLCJvbmV2ZW50IiwidGhpc0lucyIsImdldENoZWNrZWQiLCJDbGFzcyIsInJlbmRlcklucHV0VGFncyIsInZhbHVlU2VwYXJhdG9yIiwibGFiZWxTZXBhcmF0b3IiLCJ2YWx1ZU5hbWUiLCJtZXRob2QiLCJ3aGVyZSIsImhlYWRlcnMiLCJwYXJzZURhdGEiLCJjaGVja2VkTmFtZSIsImluZGV4TmFtZSIsInJlRWxlbSIsInB1bGxEYXRhIiwicmVuZGVyRGF0YSIsIiR0aXRsZSIsIiRkZDAiLCJmb3JtYXREYXRhIiwibSIsImNoZWNrYm94IiwiQ0xBU1NOQU1FIiwiQ0hFQ0tFRCIsInN1bSIsImFsbEVsZSIsIm5leHRBbGwiLCIkZGQiLCJsYXl1aVZhbHVlIiwibiIsInByb3AiLCJhbGxjaGVja2JveCIsIiRhbGwiLCJkZCIsImVsZUNoZWNrZWQiLCJpc0FsbCIsImN1cnJlbnRIdG1sIiwic2VsZWN0TGlzdCIsImlubmVyVGV4dCIsIiRkZHMiLCJyYWRpbyIsIklDT04iLCJDSEVDS0VEX0lDT04iLCJlbElEIiwiY2hlY2tlZERhdGEiLCJ5d0luZGV4IiwidGFnc0NvbnRhaW5lciIsImlucyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNDLFdBQVNBLENBQVQsRUFBWTtBQUVUQSxFQUFBQSxDQUFDLENBQUNDLEVBQUYsQ0FBS0MsV0FBTCxHQUFtQixVQUFTQyxPQUFULEVBQWtCO0FBQ2pDLFFBQUlDLEVBQUUsR0FBRyxJQUFJQyxPQUFKLENBQVlGLE9BQVosQ0FBVDtBQUNBLFFBQUlHLEVBQUUsR0FBR04sQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTyxJQUFSLENBQWEsSUFBYixDQUFUO0FBQ0FILElBQUFBLEVBQUUsQ0FBQ0ksUUFBSCxDQUFZRixFQUFaO0FBQ0EsV0FBT0YsRUFBUDtBQUNILEdBTEQ7O0FBT0EsTUFBSUMsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBU0YsT0FBVCxFQUFrQjtBQUFBOztBQUM1QixRQUFJLENBQUNBLE9BQUQsSUFBWSxDQUFDQSxPQUFPLENBQUNNLFFBQXpCLEVBQW1DO0FBRW5DOzs7OztBQUlBLFFBQUlDLFlBQUosRUFBa0JDLE1BQWxCO0FBRUFBLElBQUFBLE1BQU0sR0FBRyxFQUFULENBVDRCLENBVTVCOztBQUNBQSxJQUFBQSxNQUFNLEdBQUdYLENBQUMsQ0FBQ1ksTUFBRixDQUFTLEVBQVQsRUFBYUQsTUFBYixFQUFxQlIsT0FBTyxDQUFDUSxNQUE3QixDQUFUO0FBRUEsUUFBSUUsT0FBTztBQUNQQyxNQUFBQSxNQUFNLEVBQUVILE1BQU0sQ0FBQ0ksS0FEUjtBQUVQQyxNQUFBQSxLQUFLLEVBQUVMLE1BQU0sQ0FBQ00sSUFBUCxJQUFlLEVBRmY7QUFHUEMsTUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCLGVBQU87O3FDQUFQO0FBR0gsT0FQTTtBQVFQQyxNQUFBQSxRQUFRLEVBQUUsb0JBQVc7QUFDakIsZUFBTyw4QkFBUDtBQUNILE9BVk07QUFXUEMsTUFBQUEsYUFBYSxFQUFFLHlCQUFXO0FBQ3RCLGVBQU8sd0RBQVA7QUFDSCxPQWJNO0FBY1BDLE1BQUFBLFVBQVUsRUFBRSxzQkFBVztBQUNuQixlQUFPLFFBQVA7QUFDSDtBQWhCTSwrQ0FpQkssc0JBQVc7QUFDbkIsYUFBTyxjQUFQO0FBQ0gsS0FuQk0sb0RBb0JjLDZCQUFTSixJQUFULEVBQWU7QUFDaEMsVUFBSUssSUFBSSxHQUFHLElBQVg7QUFBQSxVQUNJQyxXQUFXLEdBQUcsRUFEbEI7QUFHQU4sTUFBQUEsSUFBSSxDQUFDTyxPQUFMLENBQWEsVUFBU0MsR0FBVCxFQUFjO0FBQ3ZCRixRQUFBQSxXQUFXLDBKQUdnQkUsR0FBRyxDQUFDQyxNQUhwQixzRUFJa0JELEdBQUcsQ0FBQ0UsUUFKdEIsZ0hBQVg7QUFTQSxZQUFJQyxPQUFPLEdBQUcsRUFBZDtBQUNBSCxRQUFBQSxHQUFHLENBQUNJLEdBQUosQ0FBUUwsT0FBUixDQUFnQixVQUFTTSxLQUFULEVBQWdCO0FBQzVCRixVQUFBQSxPQUFPLG9DQUNURSxLQUFLLENBQUNDLElBREcsMEJBQVA7QUFHSCxTQUpEO0FBS0FSLFFBQUFBLFdBQVcsSUFBSUssT0FBZjtBQUNBTCxRQUFBQSxXQUFXLGlFQUFYO0FBSUgsT0FyQkQ7QUF1QkEsYUFBT0EsV0FBUDtBQUNILEtBaERNLDRDQWlETSx1QkFBVztBQUVwQixVQUFJRCxJQUFJLEdBQUcsSUFBWDtBQUFBLFVBQ0lDLFdBQVcsR0FBRyxFQURsQjs7QUFHQUQsTUFBQUEsSUFBSSxDQUFDTixLQUFMLENBQVdRLE9BQVgsQ0FBbUIsVUFBU0MsR0FBVCxFQUFjO0FBQzdCRixRQUFBQSxXQUFXLDBKQUdnQkUsR0FBRyxDQUFDQyxNQUhwQixzRUFJa0JELEdBQUcsQ0FBQ0UsUUFKdEIsZ0hBQVg7QUFTQSxZQUFJQyxPQUFPLEdBQUcsRUFBZDtBQUNBSCxRQUFBQSxHQUFHLENBQUNJLEdBQUosQ0FBUUwsT0FBUixDQUFnQixVQUFTTSxLQUFULEVBQWdCO0FBQzVCRixVQUFBQSxPQUFPLG9DQUNURSxLQUFLLENBQUNDLElBREcsMEJBQVA7QUFHSCxTQUpEO0FBS0FSLFFBQUFBLFdBQVcsSUFBSUssT0FBZjtBQUNBTCxRQUFBQSxXQUFXLGlFQUFYO0FBSUgsT0FyQkQ7O0FBdUJBLGFBQU9ELElBQUksQ0FBQ0gsUUFBTCxLQUFrQkksV0FBbEIsR0FBZ0NELElBQUksQ0FBQ0QsVUFBTCxFQUF2QztBQUVILEtBL0VNLDRDQWdGTSx1QkFBVztBQUNwQjtBQUNBLFVBQUlDLElBQUksR0FBRyxJQUFYO0FBQUEsVUFDSUMsV0FBVyxHQUFHLEVBRGxCOztBQUdBRCxNQUFBQSxJQUFJLENBQUNOLEtBQUwsQ0FBV1EsT0FBWCxDQUFtQixVQUFTQyxHQUFULEVBQWM7QUFDN0JGLFFBQUFBLFdBQVcsdUlBR1RFLEdBQUcsQ0FBQ0UsUUFISywwR0FBWDtBQVFBLFlBQUlDLE9BQU8sR0FBRyxFQUFkO0FBQ0FILFFBQUFBLEdBQUcsQ0FBQ0ksR0FBSixDQUFRTCxPQUFSLENBQWdCLFVBQVNNLEtBQVQsRUFBZ0I7QUFDNUJGLFVBQUFBLE9BQU8sb0NBQ1RFLEtBQUssQ0FBQ0MsSUFERywwQkFBUDtBQUdILFNBSkQ7QUFLQVIsUUFBQUEsV0FBVyxJQUFJSyxPQUFmO0FBQ0FMLFFBQUFBLFdBQVcsaUVBQVg7QUFJSCxPQXBCRDs7QUFzQkEsYUFBT0QsSUFBSSxDQUFDSCxRQUFMLEtBQWtCSSxXQUFsQixHQUFnQ0QsSUFBSSxDQUFDRCxVQUFMLEVBQXZDO0FBQ0gsS0E1R00sOENBNkdRLHlCQUFXO0FBQ3RCO0FBQ0EsVUFBSUMsSUFBSSxHQUFHLElBQVg7QUFBQSxVQUNJQyxXQUFXLEdBQUcsRUFEbEI7O0FBR0FELE1BQUFBLElBQUksQ0FBQ04sS0FBTCxDQUFXUSxPQUFYLENBQW1CLFVBQVNDLEdBQVQsRUFBYztBQUM3QkYsUUFBQUEsV0FBVyx1SUFHVEUsR0FBRyxDQUFDRSxRQUhLLDBHQUFYO0FBUUEsWUFBSUMsT0FBTyxHQUFHLEVBQWQ7QUFDQUgsUUFBQUEsR0FBRyxDQUFDSSxHQUFKLENBQVFMLE9BQVIsQ0FBZ0IsVUFBU00sS0FBVCxFQUFnQjtBQUM1QkYsVUFBQUEsT0FBTyxvQ0FDVEUsS0FBSyxDQUFDQyxJQURHLDBCQUFQO0FBR0gsU0FKRDtBQUtBUixRQUFBQSxXQUFXLElBQUlLLE9BQWY7QUFDQUwsUUFBQUEsV0FBVyxpRUFBWDtBQUlILE9BcEJEOztBQXNCQSxhQUFPRCxJQUFJLENBQUNILFFBQUwsS0FBa0JJLFdBQWxCLEdBQWdDRCxJQUFJLENBQUNELFVBQUwsRUFBdkM7QUFFSCxLQTFJTSw0Q0EySU0sdUJBQVc7QUFFcEI7QUFHSCxLQWhKTSxpREFpSlcsNEJBQVc7QUFDekIsVUFBSUMsSUFBSSxHQUFHLElBQVg7QUFBQSxVQUNJQyxXQUFXLEdBQUcsRUFEbEI7O0FBR0FELE1BQUFBLElBQUksQ0FBQ04sS0FBTCxDQUFXUSxPQUFYLENBQW1CLFVBQVNDLEdBQVQsRUFBYztBQUM3QkYsUUFBQUEsV0FBVyxnSkFFYkUsR0FBRyxDQUFDTyxLQUZTLCtDQUFYO0FBS0FULFFBQUFBLFdBQVcsSUFBSUQsSUFBSSxDQUFDSCxRQUFMLEVBQWY7QUFDQUksUUFBQUEsV0FBVyxJQUFJRCxJQUFJLENBQUNXLG1CQUFMLENBQXlCUixHQUFHLENBQUNTLFFBQTdCLENBQWY7QUFDQVgsUUFBQUEsV0FBVyxJQUFJRCxJQUFJLENBQUNELFVBQUwsRUFBZjtBQUNBRSxRQUFBQSxXQUFXLFlBQVg7QUFFSCxPQVhEOztBQWFBLGFBQU9BLFdBQVA7QUFFSCxLQXBLTSxvREFxS2MsK0JBQVc7QUFDNUIsVUFBSUQsSUFBSSxHQUFHLElBQVg7QUFBQSxVQUNJQyxXQUFXLEdBQUcsRUFEbEI7O0FBR0EsVUFBRyxDQUFDRCxJQUFJLENBQUNOLEtBQU4sSUFBZU0sSUFBSSxDQUFDTixLQUFMLENBQVdtQixNQUFYLEdBQW9CLENBQXRDLEVBQXdDO0FBQ3BDLGVBQU8sS0FBUDtBQUNIOztBQUVEYixNQUFBQSxJQUFJLENBQUNOLEtBQUwsQ0FBV1EsT0FBWCxDQUFtQixVQUFTQyxHQUFULEVBQWM7QUFDN0JGLFFBQUFBLFdBQVcsZ0pBRWJFLEdBQUcsQ0FBQ08sS0FGUywrQ0FBWDtBQUtBVCxRQUFBQSxXQUFXLElBQUlELElBQUksQ0FBQ0gsUUFBTCxFQUFmO0FBQ0FJLFFBQUFBLFdBQVcsSUFBSUQsSUFBSSxDQUFDVyxtQkFBTCxDQUF5QlIsR0FBRyxDQUFDUyxRQUE3QixDQUFmO0FBQ0FYLFFBQUFBLFdBQVcsSUFBSUQsSUFBSSxDQUFDYyxXQUFMLEVBQWY7QUFDQWIsUUFBQUEsV0FBVyxJQUFJRCxJQUFJLENBQUNELFVBQUwsRUFBZjtBQUNBRSxRQUFBQSxXQUFXLFlBQVg7QUFFSCxPQVpEOztBQWNBLGFBQU9BLFdBQVA7QUFFSCxLQTdMTSxnREErTFUsMkJBQVc7QUFDeEIsVUFBSUQsSUFBSSxHQUFHLElBQVg7QUFDQSxVQUFJZSxRQUFRLEdBQUdmLElBQUksQ0FBQ1IsTUFBTCxHQUFjLFVBQTdCO0FBQ0EsYUFBT1EsSUFBSSxDQUFDZSxRQUFELENBQUosR0FBaUJmLElBQUksQ0FBQ2UsUUFBRCxDQUFKLEVBQWpCLEdBQW9DLElBQUlDLEtBQUosQ0FBVSxTQUFWLENBQTNDO0FBQ0gsS0FuTU0sWUFBWCxDQWI0QixDQWtONUI7O0FBRUEsU0FBS0MsRUFBTCxHQUFVLFVBQVNDLFNBQVQsRUFBb0JDLFFBQXBCLEVBQThCO0FBRXBDLFVBQUlDLGlCQUFpQixHQUFHLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxPQUFmLENBQXhCO0FBQUEsVUFDSUMsaUJBQWlCLEdBQUcsQ0FBQyxVQUFELEVBQWEsVUFBYixFQUF5QixZQUF6QixFQUNoQixhQURnQixFQUNELGFBREMsRUFDYyxlQURkLENBRHhCLENBRm9DLENBTXBDOztBQUNBLFVBQUloQyxNQUFNLElBQUlBLE1BQU0sQ0FBQ0ksS0FBUCxLQUFpQixLQUEzQixJQUNHeUIsU0FESCxJQUNnQkEsU0FBUyxJQUFJLE9BRGpDLEVBQzBDO0FBRXRDLFlBQUlFLGlCQUFpQixDQUFDRSxRQUFsQixDQUEyQmpDLE1BQU0sQ0FBQ0ksS0FBbEMsQ0FBSixFQUE4QztBQUMxQ2YsVUFBQUEsQ0FBQyxDQUFDLE1BQU1HLE9BQU8sQ0FBQ00sUUFBZixDQUFELENBQTBCOEIsRUFBMUIsQ0FBNkIsT0FBN0IsRUFBc0MsSUFBdEMsRUFBNEMsVUFBU00sQ0FBVCxFQUFZO0FBRXBELGdCQUFJQyxRQUFRLEdBQUc5QyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVErQyxPQUFSLENBQWdCLFdBQWhCLEVBQTZCQyxLQUE3QixFQUFmO0FBQ0EsZ0JBQUl0QixNQUFNLEdBQUdmLE1BQU0sQ0FBQ00sSUFBUCxDQUFZNkIsUUFBWixFQUFzQnBCLE1BQW5DO0FBQ0EsZ0JBQUl1QixZQUFZLEdBQUd0QyxNQUFNLENBQUNNLElBQVAsQ0FBWTZCLFFBQVosRUFBc0JqQixHQUF0QixDQUEwQjdCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWdELEtBQVIsRUFBMUIsRUFBMkMvQyxFQUE5RDtBQUVBd0MsWUFBQUEsUUFBUSxJQUFJQSxRQUFRLENBQUNmLE1BQUQsRUFBU3VCLFlBQVQsQ0FBcEI7QUFFSCxXQVJEO0FBU0g7O0FBQ0QsWUFBSU4saUJBQWlCLENBQUNDLFFBQWxCLENBQTJCakMsTUFBTSxDQUFDSSxLQUFsQyxDQUFKLEVBQThDO0FBRTFDZixVQUFBQSxDQUFDLENBQUMsTUFBTUcsT0FBTyxDQUFDTSxRQUFmLENBQUQsQ0FBMEJ5QyxHQUExQixDQUE4QixPQUE5QixFQUF1Q1gsRUFBdkMsQ0FBMEMsT0FBMUMsRUFBbUQsSUFBbkQsRUFBeUQsVUFBU00sQ0FBVCxFQUFZO0FBRWpFLGdCQUFJTSxVQUFVLEdBQUduRCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVErQyxPQUFSLENBQWdCLHNCQUFoQixFQUF3Q0MsS0FBeEMsRUFBakI7QUFBQSxnQkFDSUYsUUFBUSxHQUFHOUMsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRK0MsT0FBUixDQUFnQixXQUFoQixFQUE2QkMsS0FBN0IsRUFEZjtBQUFBLGdCQUVJSSxXQUFXLEdBQUd6QyxNQUFNLENBQUNNLElBQVAsQ0FBWWtDLFVBQVosRUFBd0JqQixRQUF4QixDQUFpQ1ksUUFBakMsQ0FGbEI7QUFBQSxnQkFHSXBCLE1BSEo7QUFBQSxnQkFHWXVCLFlBSFo7QUFLQXZCLFlBQUFBLE1BQU0sR0FBRzBCLFdBQVcsQ0FBQzFCLE1BQXJCO0FBQ0F1QixZQUFBQSxZQUFZLEdBQUdHLFdBQVcsQ0FBQ3ZCLEdBQVosQ0FBZ0I3QixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFnRCxLQUFSLEVBQWhCLEVBQWlDL0MsRUFBaEQ7QUFFQSxnQkFBSStCLEtBQUssR0FBR3JCLE1BQU0sQ0FBQ00sSUFBUCxDQUFZa0MsVUFBWixFQUF3Qm5CLEtBQXBDOztBQUVBLGdCQUFJQSxLQUFKLEVBQVc7QUFDUFMsY0FBQUEsUUFBUSxJQUFJQSxRQUFRLENBQUNmLE1BQUQsRUFBU3VCLFlBQVQsRUFBdUJqQixLQUF2QixDQUFwQjtBQUNILGFBRkQsTUFFTztBQUNIUyxjQUFBQSxRQUFRLElBQUlBLFFBQVEsQ0FBQ2YsTUFBRCxFQUFTdUIsWUFBVCxDQUFwQjtBQUNIO0FBRUosV0FsQkQ7QUFvQkFqRCxVQUFBQSxDQUFDLENBQUMsTUFBTUcsT0FBTyxDQUFDTSxRQUFmLENBQUQsQ0FBMEI4QixFQUExQixDQUE2QixPQUE3QixFQUFzQyxVQUF0QyxFQUFrRCxVQUFTTSxDQUFULEVBQVk7QUFFMUQsZ0JBQUlNLFVBQVUsR0FBR25ELENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUStDLE9BQVIsQ0FBZ0Isc0JBQWhCLEVBQXdDQyxLQUF4QyxFQUFqQjtBQUNBLGdCQUFJaEIsS0FBSyxHQUFHckIsTUFBTSxDQUFDTSxJQUFQLENBQVlrQyxVQUFaLEVBQXdCbkIsS0FBcEMsQ0FIMEQsQ0FHZjs7QUFDM0MsZ0JBQUlBLEtBQUosRUFBVztBQUNQUyxjQUFBQSxRQUFRLElBQUlBLFFBQVEsQ0FBQ1ksU0FBRCxFQUFZQSxTQUFaLEVBQXVCckIsS0FBdkIsQ0FBcEI7QUFDSCxhQUZELE1BRU87QUFDSFMsY0FBQUEsUUFBUSxJQUFJQSxRQUFRLENBQUNZLFNBQUQsRUFBWUEsU0FBWixDQUFwQjtBQUNIO0FBRUosV0FWRDtBQVdIO0FBQ0o7O0FBQ0QsVUFBSTFDLE1BQU0sSUFBSUEsTUFBTSxDQUFDSSxLQUFQLEtBQWlCLEtBQTNCLElBQ0d5QixTQURILElBQ2dCQSxTQUFTLElBQUksT0FEakMsRUFDMEM7QUFDdEN4QyxRQUFBQSxDQUFDLENBQUMsTUFBTUcsT0FBTyxDQUFDTSxRQUFmLENBQUQsQ0FBMEI4QixFQUExQixDQUE2QixPQUE3QixFQUFzQyxXQUF0QyxFQUFtRCxVQUFTTSxDQUFULEVBQVk7QUFFM0RKLFVBQUFBLFFBQVEsSUFBSUEsUUFBUSxFQUFwQjtBQUVILFNBSkQ7QUFLSDtBQUVKLEtBakVEOztBQW1FQSxTQUFLakMsUUFBTCxHQUFnQixVQUFTRixFQUFULEVBQWE7QUFDekJOLE1BQUFBLENBQUMsQ0FBQyxNQUFNTSxFQUFQLENBQUQsQ0FBWWdELE1BQVosQ0FBbUJ6QyxPQUFPLENBQUMwQyxlQUFSLEVBQW5CO0FBQ0gsS0FGRDs7QUFJQSxRQUFJcEQsT0FBTyxDQUFDTSxRQUFaLEVBQXNCO0FBRWxCLFdBQUtELFFBQUwsQ0FBY0wsT0FBTyxDQUFDTSxRQUF0QjtBQUVIO0FBRUosR0FqU0Q7O0FBbVNBK0MsRUFBQUEsTUFBTSxDQUFDbkQsT0FBUCxHQUFpQkEsT0FBakI7QUFFSCxDQTlTQSxFQThTRW9ELE1BOVNGLENBQUQ7OztBQ0RBOztBQUNDLFdBQVV6RCxDQUFWLEVBQWE7QUFFWkEsRUFBQUEsQ0FBQyxDQUFDQyxFQUFGLENBQUt5RCxlQUFMLEdBQXVCLFVBQVV2RCxPQUFWLEVBQW1CO0FBQ3hDLFFBQUlDLEVBQUUsR0FBRyxJQUFJdUQsV0FBSixDQUFnQnhELE9BQWhCLENBQVQ7QUFDQSxRQUFJRyxFQUFFLEdBQUdOLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLElBQWIsQ0FBVDtBQUNBSCxJQUFBQSxFQUFFLENBQUNJLFFBQUgsQ0FBWUYsRUFBWjtBQUNBLFdBQU9GLEVBQVA7QUFDRCxHQUxEOztBQU9BLE1BQUl1RCxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFVeEQsT0FBVixFQUFtQjtBQUNuQyxRQUFJLENBQUNBLE9BQUwsRUFBYztBQUNaLGFBQU8sS0FBUDtBQUNEOztBQUFBO0FBRUQ7Ozs7O0FBSUEsUUFBSU8sWUFBSixFQUFrQkMsTUFBbEI7QUFDQUEsSUFBQUEsTUFBTSxHQUFHO0FBQ1BpRCxNQUFBQSxTQUFTLEVBQUUsSUFESixDQUNXOztBQURYLEtBQVQ7QUFJQWpELElBQUFBLE1BQU0sR0FBR2tELE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JuRCxNQUFsQixFQUEwQlIsT0FBTyxDQUFDYyxJQUFsQyxDQUFUO0FBRUEsUUFBSUosT0FBTyxHQUFHO0FBQ1pHLE1BQUFBLEtBQUssRUFBRUwsTUFBTSxJQUFJLEVBREw7QUFFWk8sTUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ3JCLFlBQUlJLElBQUksR0FBRyxJQUFYO0FBQ0EsWUFBSXlDLE1BQU0sR0FBRyxFQUFiO0FBRUFBLFFBQUFBLE1BQU0sMExBR0R6QyxJQUFJLENBQUNOLEtBQUwsQ0FBV2dELFFBSFYsV0FBTjs7QUFLQSxZQUFHMUMsSUFBSSxDQUFDTixLQUFMLENBQVc0QyxTQUFkLEVBQXdCO0FBQ3RCRyxVQUFBQSxNQUFNLDRHQUNxRHpDLElBQUksQ0FBQ04sS0FBTCxDQUFXaUQsTUFEaEUsZ0pBQU47QUFNRDs7QUFFREYsUUFBQUEsTUFBTSw2RkFBTjtBQUlBLGVBQU9BLE1BQVA7QUFDRCxPQXpCVztBQTBCWkcsTUFBQUEsYUFBYSxFQUFFLHlCQUFZO0FBQ3pCO0FBR0QsT0E5Qlc7QUErQlpDLE1BQUFBLFlBQVksRUFBRSxzQkFBVUMsSUFBVixFQUFnQjtBQUM1QixxR0FDa0NBLElBRGxDO0FBR0QsT0FuQ1c7QUFvQ1pDLE1BQUFBLFlBQVksRUFBRSxzQkFBVUMsR0FBVixFQUFlO0FBQzNCLHlEQUF5Q0EsR0FBekM7QUFDRCxPQXRDVztBQXVDWkMsTUFBQUEsY0FBYyxFQUFFLHdCQUFVQyxHQUFWLEVBQWU7QUFFN0I7QUFDQTtBQUNBLFlBQUlqRCxXQUFXLEdBQUUsRUFBakI7QUFDQUEsUUFBQUEsV0FBVyw2R0FDK0JpRCxHQUFHLENBQUNDLEtBRG5DLGtCQUFYO0FBR0EsWUFBSUMsY0FBYyxHQUFHYixNQUFNLENBQUNjLElBQVAsQ0FBWUgsR0FBRyxDQUFDSSxJQUFoQixFQUFzQnpDLE1BQTNDO0FBQ0EsWUFBSTRCLE1BQU0sR0FBRyxFQUFiOztBQUNBLFlBQUdXLGNBQWMsR0FBRyxDQUFwQixFQUFzQjtBQUNwQlgsVUFBQUEsTUFBTSwyREFBa0RTLEdBQUcsQ0FBQ2xFLEVBQXRELE1BQU47QUFDQSxjQUFJdUUsSUFBSjs7QUFDQSxlQUFJQSxJQUFKLElBQVlMLEdBQUcsQ0FBQ0ksSUFBaEIsRUFBcUI7QUFDbkJiLFlBQUFBLE1BQU0sZ0NBQXdCYyxJQUF4QixnQkFBaUNMLEdBQUcsQ0FBQ0ksSUFBSixDQUFTQyxJQUFULENBQWpDLFlBQU47QUFDRDs7QUFDRGQsVUFBQUEsTUFBTSxZQUFOO0FBQ0QsU0FQRCxNQU9PO0FBQ0xlLFVBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLFdBQWQ7QUFDRDs7QUFDRHhELFFBQUFBLFdBQVcsSUFBSXdDLE1BQWY7QUFDQXhDLFFBQUFBLFdBQVcsSUFBSSxRQUFmO0FBRUEsZUFBT0EsV0FBUDtBQUNELE9BL0RXO0FBZ0VaeUQsTUFBQUEsV0FBVyxFQUFFLHVCQUFVO0FBQ3JCO0FBRUQsT0FuRVc7QUFvRVozRCxNQUFBQSxVQUFVLEVBQUUsc0JBQVk7QUFDdEI7QUFHRCxPQXhFVztBQXlFWjtBQUNBa0MsTUFBQUEsZUFBZSxFQUFFLDJCQUFZO0FBQzNCLFlBQUlqQyxJQUFJLEdBQUcsSUFBWDtBQUNBLFlBQUlDLFdBQVcsR0FBRyxFQUFsQjs7QUFFQSxZQUFHRCxJQUFJLENBQUNOLEtBQUwsQ0FBV2lFLFlBQVgsSUFBMkIzRCxJQUFJLENBQUNOLEtBQUwsQ0FBV2lFLFlBQVgsQ0FBd0I5QyxNQUF4QixHQUFpQyxDQUEvRCxFQUFpRTtBQUMvRGIsVUFBQUEsSUFBSSxDQUFDTixLQUFMLENBQVdpRSxZQUFYLENBQXdCQyxHQUF4QixDQUE0QixVQUFVekQsR0FBVixFQUFlO0FBRXpDLGdCQUFJMEQsTUFBTSxHQUFHO0FBQ1g3RSxjQUFBQSxFQUFFLEVBQUVtQixHQUFHLENBQUNuQixFQURHO0FBRVhtRSxjQUFBQSxLQUFLLEVBQUVoRCxHQUFHLENBQUNnRCxLQUZBO0FBR1hHLGNBQUFBLElBQUksRUFBRW5ELEdBQUcsQ0FBQ21EO0FBSEMsYUFBYjtBQU1BckQsWUFBQUEsV0FBVyxJQUFJRCxJQUFJLENBQUM0QyxhQUFMLEVBQWY7QUFDQTNDLFlBQUFBLFdBQVcsSUFBSUQsSUFBSSxDQUFDNkMsWUFBTCxDQUFrQjFDLEdBQUcsQ0FBQzJELElBQXRCLENBQWY7QUFDQTdELFlBQUFBLFdBQVcsSUFBSUQsSUFBSSxDQUFDK0MsWUFBTCxDQUFrQjVDLEdBQUcsQ0FBQzRELFdBQXRCLENBQWY7QUFDQTlELFlBQUFBLFdBQVcsSUFBSUQsSUFBSSxDQUFDaUQsY0FBTCxDQUFvQlksTUFBcEIsQ0FBZjtBQUNBNUQsWUFBQUEsV0FBVyxJQUFJRCxJQUFJLENBQUMwRCxXQUFMLEVBQWY7QUFFRCxXQWREO0FBZUQ7O0FBQ0QsZUFBT2hGLENBQUMsQ0FBQ3NCLElBQUksQ0FBQ0osU0FBTCxLQUFtQkssV0FBbkIsR0FBaUNELElBQUksQ0FBQ0QsVUFBTCxFQUFsQyxDQUFSO0FBQ0Q7QUFoR1csS0FBZDs7QUFtR0FzQyxJQUFBQSxXQUFXLENBQUMyQixTQUFaLENBQXNCQyxLQUF0QixHQUE2QixZQUFVLENBRXRDLENBRkQsQ0FuSG1DLENBc0huQzs7O0FBQ0EsU0FBS2hELEVBQUwsR0FBVSxVQUFVQyxTQUFWLEVBQXFCQyxRQUFyQixFQUErQjtBQUN2QyxVQUFJbkIsSUFBSSxHQUFHLElBQVg7O0FBQ0EsVUFBR2tCLFNBQVMsS0FBSyxLQUFqQixFQUF1QjtBQUVyQmxCLFFBQUFBLElBQUksQ0FBQ2tFLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQixVQUFoQixFQUE0QkMsRUFBNUIsQ0FBK0IsQ0FBL0IsRUFBa0NuRCxFQUFsQyxDQUFxQyxPQUFyQyxFQUE4QyxZQUFVO0FBRXRELGNBQUlvRCxTQUFTLEdBQUczRixDQUFDLENBQUMsSUFBRCxDQUFELENBQVF5RixJQUFSLENBQWEsWUFBYixFQUEyQkMsRUFBM0IsQ0FBOEIsQ0FBOUIsRUFBaUN6RSxJQUFqQyxDQUFzQyxRQUF0QyxDQUFoQjtBQUVBd0IsVUFBQUEsUUFBUSxJQUFJQSxRQUFRLENBQUNrRCxTQUFELENBQXBCO0FBQ0QsU0FMRDtBQU1BO0FBQ0QsT0FURCxNQVNPO0FBQ0wsWUFBR3JFLElBQUksQ0FBQ2tFLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQixVQUFVakQsU0FBMUIsRUFBcUNMLE1BQXhDLEVBQStDO0FBQzdDYixVQUFBQSxJQUFJLENBQUNrRSxLQUFMLENBQVdDLElBQVgsQ0FBZ0IsVUFBVWpELFNBQTFCLEVBQXFDRCxFQUFyQyxDQUF3QyxPQUF4QyxFQUFpRCxZQUFVO0FBRXpELGdCQUFJb0QsU0FBUyxHQUFHM0YsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRK0MsT0FBUixDQUFnQix3QkFBaEIsRUFBMEM5QixJQUExQyxDQUErQyxJQUEvQyxDQUFoQjtBQUNBd0IsWUFBQUEsUUFBUSxJQUFJQSxRQUFRLENBQUNrRCxTQUFELENBQXBCO0FBRUQsV0FMRDtBQU1ELFNBUEQsTUFPTztBQUNMYixVQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxlQUFldkMsU0FBN0I7QUFDRDtBQUNGO0FBR0YsS0F6QkQ7O0FBMkJBLFNBQUtoQyxRQUFMLEdBQWdCLFVBQVVGLEVBQVYsRUFBYztBQUU1QixXQUFLa0YsS0FBTCxHQUFhM0UsT0FBTyxDQUFDMEMsZUFBUixFQUFiO0FBRUF2RCxNQUFBQSxDQUFDLENBQUMsTUFBTU0sRUFBUCxDQUFELENBQVlnRCxNQUFaLENBQW1CLEtBQUtrQyxLQUF4QjtBQUNELEtBTEQ7O0FBT0EsUUFBSXJGLE9BQU8sQ0FBQ00sUUFBWixFQUFzQjtBQUNwQixXQUFLRCxRQUFMLENBQWNMLE9BQU8sQ0FBQ00sUUFBdEI7QUFDRDtBQUVGLEdBN0pEOztBQStKQStDLEVBQUFBLE1BQU0sQ0FBQ0csV0FBUCxHQUFxQkEsV0FBckI7QUFFRCxDQTFLQSxFQTBLQ0YsTUExS0QsQ0FBRDs7O0FDREE7O0FBQUMsQ0FBQyxVQUFVekQsQ0FBVixFQUFhNEYsS0FBYixFQUFvQjtBQUVsQjtBQUNBQSxFQUFBQSxLQUFLLENBQUNDLEdBQU4sQ0FBVSxDQUFDLFNBQUQsQ0FBVixFQUF1QixZQUFZO0FBQy9CLFFBQUlDLE9BQU8sR0FBQ0YsS0FBSyxDQUFDRyxPQUFsQjtBQUVJdkMsSUFBQUEsTUFBTSxDQUFDc0MsT0FBUCxHQUFpQkEsT0FBakI7O0FBR0E5RixJQUFBQSxDQUFDLENBQUNDLEVBQUYsQ0FBSytGLGFBQUwsR0FBcUIsVUFBVTdGLE9BQVYsRUFBbUI7QUFDcEMsVUFBSVEsTUFBTSxHQUFDO0FBQ1BtQixRQUFBQSxLQUFLLEVBQUM7QUFEQyxPQUFYOztBQUlELFVBQUltRSxLQUFLLEdBQUMsSUFBVjs7QUFDQyxVQUFJQyxJQUFJLEdBQUNsRyxDQUFDLENBQUNZLE1BQUYsQ0FBUyxJQUFULEVBQWNELE1BQWQsRUFBcUJSLE9BQXJCLENBQVQ7O0FBQ0ksVUFBRyxLQUFLZ0MsTUFBTCxHQUFZLENBQWYsRUFBaUI7QUFDYm5DLFFBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUW1HLElBQVIsQ0FBYSxVQUFTbkQsS0FBVCxFQUFlbEIsS0FBZixFQUFxQjtBQUM5Qm9FLFVBQUFBLElBQUksQ0FBQ0UsSUFBTCxHQUFVLElBQVY7QUFDQUgsVUFBQUEsS0FBSyxDQUFDSSxJQUFOLEdBQVdQLE9BQU8sQ0FBQ1EsTUFBUixDQUFlSixJQUFmLENBQVg7QUFDSCxTQUhEO0FBSUgsT0FMRCxNQUtLO0FBQ0RBLFFBQUFBLElBQUksQ0FBQ0UsSUFBTCxHQUFVLEtBQUtHLFFBQWY7QUFDQU4sUUFBQUEsS0FBSyxDQUFDSSxJQUFOLEdBQVdQLE9BQU8sQ0FBQ1EsTUFBUixDQUFlSixJQUFmLENBQVg7QUFDSDs7QUFFTixhQUFPRCxLQUFQO0FBRUYsS0FuQkQ7QUFxQlAsR0EzQkQ7QUE4QkgsQ0FqQ0EsRUFpQ0V4QyxNQWpDRixFQWlDVW1DLEtBakNWOzs7QUNBRDs7QUFDQSxDQUFDLFVBQVU1RixDQUFWLEVBQWE0RixLQUFiLEVBQW9CO0FBRW5CO0FBQ0FBLEVBQUFBLEtBQUssQ0FBQ0MsR0FBTixDQUFVLENBQUMsT0FBRCxDQUFWLEVBQXFCLFlBQVk7QUFDL0IsUUFBSVcsS0FBSyxHQUFHWixLQUFLLENBQUNZLEtBQWxCO0FBRUFBLElBQUFBLEtBQUssQ0FBQzdGLE1BQU4sQ0FBYTtBQUNYOEYsTUFBQUEsSUFBSSxFQUFFLENBREs7QUFDRjtBQUNUQyxNQUFBQSxNQUFNLEVBQUUsS0FGRztBQUdYO0FBQ0FDLE1BQUFBLEtBQUssRUFBRSxHQUpJO0FBS1hDLE1BQUFBLFFBQVEsRUFBRSxHQUxDO0FBTVhDLE1BQUFBLEtBQUssRUFBRTtBQU5JLEtBQWI7QUFVQSxRQUFJQyxTQUFTLEdBQUdOLEtBQWhCOztBQUVBTSxJQUFBQSxTQUFTLENBQUNDLGdCQUFWLEdBQTZCLFVBQVVDLEdBQVYsRUFBZTtBQUMxQyxVQUFJQyxVQUFVLEdBQUc7QUFDZmpGLFFBQUFBLEtBQUssRUFBRSxNQURRO0FBRWZrRixRQUFBQSxJQUFJLEVBQUUsaUJBRlM7QUFHZkMsUUFBQUEsUUFBUSxFQUFFLENBSEs7QUFJZkMsUUFBQUEsSUFBSSxFQUFFLENBSlM7QUFLZkMsUUFBQUEsTUFBTSxFQUFFLElBTE87QUFNZnhGLFFBQUFBLEdBQUcsRUFBRSxDQUFDLElBQUQsRUFBTyxJQUFQLENBTlU7QUFPZnlGLFFBQUFBLElBQUksRUFBRSxjQUFVdEUsS0FBVixFQUFpQnVFLE1BQWpCLEVBQXlCO0FBQzdCQyxVQUFBQSxTQUFTLENBQUNDLEtBQVYsQ0FBZ0J6RSxLQUFoQjtBQUNELFNBVGM7QUFVZjBFLFFBQUFBLElBQUksRUFBRSxjQUFVMUUsS0FBVixFQUFpQnVFLE1BQWpCLEVBQXlCO0FBQzdCQyxVQUFBQSxTQUFTLENBQUNDLEtBQVYsQ0FBZ0J6RSxLQUFoQjtBQUNELFNBWmM7QUFhZjJFLFFBQUFBLElBQUksRUFBRSxDQUFDLE9BQUQsRUFBVSxPQUFWLENBYlM7QUFjZkMsUUFBQUEsT0FBTyxFQUFFLDhCQWRNO0FBZWZDLFFBQUFBLE9BQU8sRUFBRSxpQkFBVU4sTUFBVixFQUFrQnZFLEtBQWxCLEVBQXlCO0FBQ2hDLGNBQUk4RSxRQUFRLEdBQUcsQ0FBQztBQUNkVixZQUFBQSxJQUFJLEVBQUUsUUFEUTtBQUVkaEMsWUFBQUEsSUFBSSxFQUFFLE9BRlE7QUFHZDRCLFlBQUFBLEdBQUcsRUFBRUE7QUFIUyxXQUFELENBQWY7QUFLQSxjQUFJZSxFQUFFLEdBQUcsSUFBSUMsT0FBSixDQUFZO0FBQ25CQyxZQUFBQSxLQUFLLEVBQUVIO0FBRFksV0FBWixDQUFUO0FBR0FDLFVBQUFBLEVBQUUsQ0FBQ3ZILFFBQUgsQ0FBWSxhQUFaO0FBQ0Q7QUF6QmMsT0FBakI7QUE0QkFnRyxNQUFBQSxLQUFLLENBQUMwQixJQUFOLENBQVdqQixVQUFYO0FBRUQsS0EvQkQ7O0FBa0NBSCxJQUFBQSxTQUFTLENBQUNxQixjQUFWLEdBQTJCLFVBQVVDLE9BQVYsRUFBbUIzRixRQUFuQixFQUE2QnlELElBQTdCLEVBQW1DO0FBQzVELFVBQUllLFVBQVUsR0FBRztBQUNmakYsUUFBQUEsS0FBSyxFQUFFa0UsSUFBSSxDQUFDbEUsS0FBTCxHQUFha0UsSUFBSSxDQUFDbEUsS0FBbEIsR0FBMEIsRUFEbEI7QUFFZmtGLFFBQUFBLElBQUksRUFBRSxpQkFGUztBQUdmQyxRQUFBQSxRQUFRLEVBQUUsQ0FISztBQUlmQyxRQUFBQSxJQUFJLEVBQUUsQ0FKUztBQUtmQyxRQUFBQSxNQUFNLEVBQUUsSUFMTztBQU1mZ0IsUUFBQUEsUUFBUSxFQUFFLElBTks7QUFPZnhHLFFBQUFBLEdBQUcsRUFBRSxDQUFDLElBQUQsRUFBTyxJQUFQLENBUFU7QUFRZnlGLFFBQUFBLElBQUksRUFBRSxjQUFVdEUsS0FBVixFQUFpQnVFLE1BQWpCLEVBQXlCO0FBQzdCLGNBQUlqSCxFQUFFLEdBQUc4SCxPQUFPLENBQUNFLGdCQUFSLEVBQVQ7O0FBQ0EsY0FBSSxDQUFDaEksRUFBTCxFQUFTO0FBQ1BrRyxZQUFBQSxLQUFLLENBQUMrQixHQUFOLENBQVUsT0FBVjtBQUNBO0FBQ0Q7O0FBRUQsY0FBSUMsTUFBTSxHQUFHSixPQUFPLENBQUNLLGtCQUFSLEVBQWI7QUFFQSxjQUFJaEcsUUFBSixFQUNFQSxRQUFRLENBQUNuQyxFQUFELEVBQUtrSSxNQUFMLENBQVI7QUFFRmhCLFVBQUFBLFNBQVMsQ0FBQ0MsS0FBVixDQUFnQnpFLEtBQWhCO0FBQ0QsU0FyQmM7QUFzQmYwRSxRQUFBQSxJQUFJLEVBQUUsY0FBVTFFLEtBQVYsRUFBaUJ1RSxNQUFqQixFQUF5QjtBQUM3QkMsVUFBQUEsU0FBUyxDQUFDQyxLQUFWLENBQWdCekUsS0FBaEI7QUFDRCxTQXhCYztBQXlCZjJFLFFBQUFBLElBQUksRUFBRSxDQUFDekIsSUFBSSxDQUFDd0MsS0FBTCxHQUFhLElBQWQsRUFBb0J4QyxJQUFJLENBQUN5QyxNQUFMLEdBQWMsSUFBbEMsQ0F6QlM7QUEwQmZmLFFBQUFBLE9BQU8sRUFBRSxjQUFjZ0IsT0FBZCxHQUF3QixxQkExQmxCO0FBMkJmZixRQUFBQSxPQUFPLEVBQUUsaUJBQVVOLE1BQVYsRUFBa0J2RSxLQUFsQixFQUF5QjtBQUNoQ29GLFVBQUFBLE9BQU8sQ0FBQzVILFFBQVIsQ0FBaUJvSSxPQUFPLEdBQUcsYUFBM0I7QUFDQVIsVUFBQUEsT0FBTyxDQUFDUyxRQUFSO0FBQ0FULFVBQUFBLE9BQU8sQ0FBQzdGLEVBQVIsQ0FBVyxpQkFBWCxFQUE4QixVQUFVdUcsR0FBVixFQUFlQyxHQUFmLEVBQW9CO0FBQ2hELGdCQUFJUCxNQUFNLEdBQUdKLE9BQU8sQ0FBQ1ksV0FBUixDQUFvQkYsR0FBcEIsRUFBeUIsTUFBekIsQ0FBYjtBQUE4QztBQUM5QyxnQkFBSXJHLFFBQUosRUFDRUEsUUFBUSxDQUFDcUcsR0FBRCxFQUFNTixNQUFOLENBQVI7QUFFRmhCLFlBQUFBLFNBQVMsQ0FBQ0MsS0FBVixDQUFnQnpFLEtBQWhCO0FBQ0QsV0FORDtBQU9EO0FBckNjLE9BQWpCOztBQXdDQSxVQUFJb0UsSUFBSSxJQUFJLENBQVosRUFBZTtBQUNiSCxRQUFBQSxVQUFVLENBQUNwRixHQUFYLEdBQWlCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBakI7QUFDQW9GLFFBQUFBLFVBQVUsQ0FBQ1MsSUFBWCxHQUFrQlQsVUFBVSxDQUFDZ0MsSUFBN0I7QUFDQWhDLFFBQUFBLFVBQVUsQ0FBQ2dDLElBQVgsR0FBa0IsSUFBbEI7QUFDRDs7QUFFRHpCLE1BQUFBLFNBQVMsQ0FBQ1UsSUFBVixDQUFlakIsVUFBZjtBQUNELEtBaEREOztBQW1EQUgsSUFBQUEsU0FBUyxDQUFDb0MsUUFBVixHQUFxQixZQUFZO0FBQy9CLFVBQUlsRyxLQUFLLEdBQUd3RSxTQUFTLENBQUMyQixJQUFWLENBQWUsQ0FBZixFQUFrQjtBQUM1QnhDLFFBQUFBLEtBQUssRUFBRSxDQUFDLEdBQUQsRUFBTSxNQUFOLENBRHFCLENBQ1A7O0FBRE8sT0FBbEIsQ0FBWjtBQUlBLGFBQU8sWUFBWTtBQUNqQmEsUUFBQUEsU0FBUyxDQUFDQyxLQUFWLENBQWdCekUsS0FBaEI7QUFDRCxPQUZEO0FBR0QsS0FSRDs7QUFZQVEsSUFBQUEsTUFBTSxDQUFDZ0UsU0FBUCxHQUFtQlYsU0FBbkI7QUFFRCxHQWxIRDtBQXNIRCxDQXpIRCxFQXlIR3JELE1BekhILEVBeUhXbUMsS0F6SFg7OztBQ0RDLFdBQVM1RixDQUFULEVBQVk0RixLQUFaLEVBQWtCO0FBQ2pCNUYsRUFBQUEsQ0FBQyxDQUFDQyxFQUFGLENBQUttSixnQkFBTCxHQUF3QixVQUFVakosT0FBVixFQUFtQjtBQUN6QyxRQUFJQyxFQUFFLEdBQUcsSUFBSWlKLFlBQUosQ0FBaUJsSixPQUFqQixDQUFUO0FBQ0EsUUFBSUcsRUFBRSxHQUFHTixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFPLElBQVIsQ0FBYSxJQUFiLENBQVQ7QUFDQUgsSUFBQUEsRUFBRSxDQUFDSSxRQUFILENBQVlGLEVBQVo7QUFDQSxXQUFPRixFQUFQO0FBQ0QsR0FMRDs7QUFPQSxNQUFJaUosWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBVUMsTUFBVixFQUFpQjtBQUNsQyxRQUFJaEksSUFBSSxHQUFHLElBQVg7QUFFQSxRQUFJaUksU0FBUyxHQUFHO0FBQ2RDLE1BQUFBLFlBQVksRUFBRSxFQURBO0FBRWRDLE1BQUFBLFNBQVMsRUFBRSxFQUZHO0FBR2R4SSxNQUFBQSxJQUFJLEVBQUUsSUFIUTtBQUlkeUksTUFBQUEsR0FBRyxFQUFFLElBSlM7QUFLZEMsTUFBQUEsTUFBTSxFQUFFLFVBQVVDLE1BQU0sQ0FBQ0MsY0FBUCxFQUxKO0FBTWRDLE1BQUFBLGFBQWEsRUFBRSxJQU5EO0FBT2RDLE1BQUFBLGVBQWUsRUFBRSx5QkFBUzlJLElBQVQsRUFBZTtBQUU5QixZQUFHLEVBQUVBLElBQUksSUFBSUEsSUFBSSxDQUFDa0IsTUFBTCxHQUFjLENBQXhCLENBQUgsRUFBOEI7QUFDNUIyQyxVQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxlQUFkO0FBQ0EsaUJBQU8sS0FBUDtBQUNEOztBQUVEOUQsUUFBQUEsSUFBSSxDQUFDaUUsR0FBTCxDQUFTLFVBQVN6RCxHQUFULEVBQWE7QUFFcEIsY0FBRyxDQUFDQSxHQUFHLENBQUN1SSxjQUFKLENBQW1CLFNBQW5CLENBQUosRUFBa0M7QUFDaEN2SSxZQUFBQSxHQUFHLENBQUN3SSxPQUFKLEdBQWMsS0FBZDtBQUNEO0FBRUYsU0FORDtBQVFBLGFBQUtoSixJQUFMLEdBQVlBLElBQVo7QUFFRCxPQXhCYTtBQXlCZGlKLE1BQUFBLFlBQVksRUFBRSx3QkFBVTtBQUN0QixZQUFJNUksSUFBSSxHQUFHLElBQVg7QUFDQSxZQUFJNkksV0FBVyxHQUFHLEVBQWxCO0FBRUFBLFFBQUFBLFdBQVcsa0tBQVg7QUFJQTdJLFFBQUFBLElBQUksQ0FBQ0wsSUFBTCxDQUFVTyxPQUFWLENBQWtCLFVBQVNDLEdBQVQsRUFBYTtBQUM3QjBJLFVBQUFBLFdBQVcsMERBQ0g3SSxJQUFJLENBQUNrSSxZQURGLGNBQ2tCL0gsR0FBRyxDQUFDMkksS0FEdEIsK0RBRXNCOUksSUFBSSxDQUFDbUksU0FGM0Isb0NBR0ZoSSxHQUFHLENBQUNNLElBSEYsZ0JBR1lOLEdBQUcsQ0FBQ3dJLE9BQUosR0FBYyxZQUFkLEdBQTZCLEVBSHpDLDRFQUl1Q3hJLEdBQUcsQ0FBQ3dJLE9BQUosR0FBYyxvQkFBZCxHQUFxQyxFQUo1RSx1REFLZ0J4SSxHQUFHLENBQUNNLElBTHBCLG9GQUFYO0FBUUQsU0FURDtBQVdBb0ksUUFBQUEsV0FBVyxzTkFJaUM3SSxJQUFJLENBQUNxSSxNQUp0QywwQ0FBWDtBQVFBLGVBQU9RLFdBQVA7QUFDRCxPQXJEYSxDQXdEaEI7QUFDQTs7QUF6RGdCLEtBQWhCOztBQTBEQSxRQUFHLENBQUNiLE1BQU0sQ0FBQ0UsWUFBUixJQUF3QixDQUFDRixNQUFNLENBQUNHLFNBQW5DLEVBQTZDO0FBQzNDM0UsTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsb0NBQWQ7QUFDQSxhQUFPLEtBQVA7QUFDRDs7QUFDRHdFLElBQUFBLFNBQVMsQ0FBQ0MsWUFBVixHQUF5QkYsTUFBTSxDQUFDRSxZQUFoQyxDQWpFa0MsQ0FrRWxDOztBQUNBRCxJQUFBQSxTQUFTLENBQUNRLGVBQVYsQ0FBMEJULE1BQU0sQ0FBQ3JJLElBQWpDO0FBQ0EsU0FBSzBJLE1BQUwsR0FBY0osU0FBUyxDQUFDSSxNQUF4QjtBQUNBLFNBQUtGLFNBQUwsR0FBaUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQkgsTUFBTSxDQUFDRyxTQUFQLElBQW9CLFNBQVNHLE1BQU0sQ0FBQ0MsY0FBUCxFQUFwRTtBQUVBLFNBQUtRLFlBQUwsR0FBb0JySyxDQUFDLENBQUN1SixTQUFTLENBQUNXLFlBQVYsRUFBRCxDQUFyQjs7QUFFQSxRQUFHWixNQUFNLENBQUM3SSxRQUFWLEVBQW9CO0FBQ2xCYSxNQUFBQSxJQUFJLENBQUNkLFFBQUwsQ0FBYzhJLE1BQU0sQ0FBQzdJLFFBQXJCO0FBQ0Q7QUFDRixHQTVFRDs7QUE4RUE0SSxFQUFBQSxZQUFZLENBQUMvRCxTQUFiLENBQXVCOUUsUUFBdkIsR0FBa0MsVUFBUzhKLFFBQVQsRUFBa0I7QUFDbEQsUUFBSWhKLElBQUksR0FBRyxJQUFYO0FBQ0EsUUFBSWlKLFNBQVMsR0FBR3ZLLENBQUMsQ0FBQyxNQUFNc0ssUUFBUCxDQUFqQjtBQUNBLFFBQUlFLE9BQU8sR0FBR0QsU0FBUyxDQUFDOUUsSUFBVixDQUFlLE1BQU1uRSxJQUFJLENBQUNxSSxNQUExQixDQUFkO0FBRUFZLElBQUFBLFNBQVMsQ0FBQ2pILE1BQVYsQ0FBaUJoQyxJQUFJLENBQUMrSSxZQUF0QjtBQUVBLFFBQUlJLElBQUksR0FBRzdFLEtBQUssQ0FBQzZFLElBQWpCO0FBQ0FBLElBQUFBLElBQUksQ0FBQ25FLE1BQUw7QUFFQSxRQUFJb0UsT0FBTyxHQUFHLEVBQWQsQ0FWa0QsQ0FVaEM7O0FBRWxCLFFBQUlDLFNBQVMsR0FBRztBQUNkQyxNQUFBQSxJQUFJLEVBQUUsZ0JBQVc7QUFDZixZQUFJekYsTUFBTSxHQUFHLEVBQWI7QUFDQSxZQUFJMEYsWUFBWSxHQUFHTixTQUFTLENBQUM5RSxJQUFWLENBQ2pCLHFCQURpQixDQUFuQjs7QUFHQSxZQUFJb0YsWUFBWSxDQUFDMUksTUFBakIsRUFBeUI7QUFDdkJnRCxVQUFBQSxNQUFNLEdBQUc7QUFDUHJELFlBQUFBLEtBQUssRUFBRStJLFlBQVksQ0FBQ0MsUUFBYixDQUFzQixPQUF0QixFQUErQnZLLElBQS9CLENBQW9DLE9BQXBDLENBREE7QUFFUDZFLFlBQUFBLElBQUksRUFBRXlGLFlBQVksQ0FBQ0MsUUFBYixDQUFzQixPQUF0QixFQUErQnZLLElBQS9CLENBQW9DLE1BQXBDO0FBRkMsV0FBVDtBQUlEOztBQUVELFlBQUl3SyxJQUFJLENBQUNDLFNBQUwsQ0FBZTdGLE1BQWYsTUFBMkIsSUFBL0IsRUFBcUM7QUFDbkN1RixVQUFBQSxPQUFPLENBQUNPLElBQVIsQ0FBYTlGLE1BQWI7QUFDQXVGLFVBQUFBLE9BQU8sQ0FBQ2xKLE9BQVIsQ0FBZ0IsVUFBUzBKLENBQVQsRUFBWTtBQUMxQlAsWUFBQUEsU0FBUyxDQUFDUSxHQUFWLENBQWNELENBQWQ7QUFDRCxXQUZEO0FBR0Q7QUFDRixPQW5CYTtBQW9CZEMsTUFBQUEsR0FBRyxFQUFFLGFBQVNoRyxNQUFULEVBQWlCO0FBQ3BCLFlBQUlpRyxXQUFXLDBDQUNEakcsTUFBTSxDQUFDQyxJQUROLGdCQUNlRCxNQUFNLENBQUNyRCxLQUR0Qiw0RkFBZjtBQUtBOUIsUUFBQUEsQ0FBQyxDQUFDLE1BQU1zQixJQUFJLENBQUNxSSxNQUFaLENBQUQsQ0FBcUJyRyxNQUFyQixDQUE0QjhILFdBQTVCO0FBRUEsWUFBSUMsY0FBYywyQ0FBaUNsRyxNQUFNLENBQUNDLElBQXhDLG9DQUNQRCxNQUFNLENBQUNyRCxLQURBLFNBQWxCO0FBRUV5SSxRQUFBQSxTQUFTLENBQUNlLEtBQVYsQ0FBZ0JELGNBQWhCOztBQUVGLFlBQUlYLE9BQU8sQ0FBQ2EsT0FBUixDQUFnQnBHLE1BQWhCLE1BQTRCLENBQUMsQ0FBakMsRUFBb0M7QUFDbEN1RixVQUFBQSxPQUFPLENBQUNPLElBQVIsQ0FBYTlGLE1BQWI7QUFDRDtBQUNGLE9BbkNhO0FBcUNkcUcsTUFBQUEsR0FBRyxFQUFFLGFBQVNyRyxNQUFULEVBQWlCO0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsWUFBSXVGLE9BQU8sSUFBSUEsT0FBTyxDQUFDdkksTUFBUixHQUFpQixDQUFoQyxFQUFtQztBQUNqQ3VJLFVBQUFBLE9BQU8sQ0FBQ2xKLE9BQVIsQ0FBZ0IsVUFBU0MsR0FBVCxFQUFjc0gsR0FBZCxFQUFtQjtBQUNqQyxnQkFBSXRILEdBQUcsQ0FBQzJELElBQUosS0FBYUQsTUFBTSxDQUFDQyxJQUF4QixFQUE4QjtBQUM1QnNGLGNBQUFBLE9BQU8sQ0FBQ2UsTUFBUixDQUFlMUMsR0FBZixFQUFvQixDQUFwQjtBQUNEO0FBQ0YsV0FKRDtBQUtELFNBaEJtQixDQWlCcEI7QUFFQTtBQUNBOzs7QUFDQS9JLFFBQUFBLENBQUMsQ0FBQyxNQUFNc0IsSUFBSSxDQUFDcUksTUFBWixDQUFELENBQXFCK0IsS0FBckI7QUFDQSxZQUFJTixXQUFXLEdBQUcsRUFBbEI7O0FBQ0EsWUFBSVYsT0FBTyxJQUFJQSxPQUFPLENBQUN2SSxNQUFSLEdBQWlCLENBQWhDLEVBQW1DO0FBQ2pDdUksVUFBQUEsT0FBTyxDQUFDbEosT0FBUixDQUFnQixVQUFTQyxHQUFULEVBQWNzSCxHQUFkLEVBQW1CO0FBQ2pDcUMsWUFBQUEsV0FBVywrQkFBdUIzSixHQUFHLENBQUMyRCxJQUEzQixnQkFDVDNELEdBQUcsQ0FBQ0ssS0FESyxzRUFBWDtBQUdELFdBSkQ7QUFLRDs7QUFDRDlCLFFBQUFBLENBQUMsQ0FBQyxNQUFNc0IsSUFBSSxDQUFDcUksTUFBWixDQUFELENBQXFCckcsTUFBckIsQ0FBNEI4SCxXQUE1QixFQTlCb0IsQ0FnQ3BCOztBQUNBcEwsUUFBQUEsQ0FBQyxDQUFDLE1BQU1zQixJQUFJLENBQUNnSixRQUFaLENBQUQsQ0FDRzdFLElBREgsQ0FDUSxpQkFBaUJOLE1BQU0sQ0FBQ0MsSUFBeEIsR0FBK0IsSUFEdkMsRUFFR3VHLE1BRkg7QUFHRDtBQXpFYSxLQUFoQjtBQTRFQWhCLElBQUFBLFNBQVMsQ0FBQ0MsSUFBVjtBQUVBSCxJQUFBQSxJQUFJLENBQUNsSSxFQUFMLENBQVEsY0FBYWpCLElBQUksQ0FBQ21JLFNBQWxCLEdBQTZCLEdBQXJDLEVBQTBDLFVBQVN4SSxJQUFULEVBQWU7QUFDdkQsVUFBSTJLLFNBQVMsR0FBRzNLLElBQUksQ0FBQ21GLElBQUwsQ0FBVTZELE9BQTFCO0FBQ0EsVUFBSTRCLFVBQVUsR0FBRzdMLENBQUMsQ0FBQ2lCLElBQUksQ0FBQ21GLElBQU4sQ0FBbEI7QUFDQSxVQUFJakIsTUFBTSxHQUFHO0FBQ1hyRCxRQUFBQSxLQUFLLEVBQUUrSixVQUFVLENBQUN0TCxJQUFYLENBQWdCLE9BQWhCLENBREk7QUFFWDZFLFFBQUFBLElBQUksRUFBRXlHLFVBQVUsQ0FBQ3RMLElBQVgsQ0FBZ0IsTUFBaEI7QUFGSyxPQUFiOztBQUtBLFVBQUlxTCxTQUFKLEVBQWU7QUFDYmpCLFFBQUFBLFNBQVMsQ0FBQ1EsR0FBVixDQUFjaEcsTUFBZDtBQUNEOztBQUVELFVBQUksQ0FBQ3lHLFNBQUwsRUFBZ0I7QUFFZGpCLFFBQUFBLFNBQVMsQ0FBQ2EsR0FBVixDQUFjckcsTUFBZDtBQUNELE9BZnNELENBZ0J2RDs7QUFDRCxLQWpCRDtBQW1CQW9GLElBQUFBLFNBQVMsQ0FBQzlFLElBQVYsQ0FBZSxNQUFNbkUsSUFBSSxDQUFDcUksTUFBMUIsRUFBa0NwSCxFQUFsQyxDQUFxQyxPQUFyQyxFQUE4QyxRQUE5QyxFQUF3RCxVQUFTTSxDQUFULEVBQVk7QUFDbEUsVUFBSWlKLFlBQVksR0FBRzlMLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUThLLFFBQVIsQ0FBaUIsSUFBakIsQ0FBbkI7QUFDQSxVQUFJM0YsTUFBTSxHQUFHO0FBQ1hyRCxRQUFBQSxLQUFLLEVBQUVnSyxZQUFZLENBQUNDLElBQWIsRUFESTtBQUVYM0csUUFBQUEsSUFBSSxFQUFFMEcsWUFBWSxDQUFDdkwsSUFBYixDQUFrQixNQUFsQjtBQUZLLE9BQWI7QUFLQW9LLE1BQUFBLFNBQVMsQ0FBQ2EsR0FBVixDQUFjckcsTUFBZCxFQVBrRSxDQVNsRTs7QUFDQSxVQUFJNkcsV0FBVyxHQUFHMUssSUFBSSxDQUFDK0ksWUFBTCxDQUFrQjVFLElBQWxCLENBQ2hCLHNCQURnQixDQUFsQixDQVZrRSxDQWFsRTs7QUFDQXVHLE1BQUFBLFdBQVcsR0FBR0MsS0FBSyxDQUFDM0csU0FBTixDQUFnQjRHLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkgsV0FBM0IsQ0FBZDs7QUFFQSxVQUFJQSxXQUFXLElBQUlBLFdBQVcsQ0FBQzdKLE1BQVosR0FBcUIsQ0FBeEMsRUFBMkM7QUFDekM2SixRQUFBQSxXQUFXLENBQUN4SyxPQUFaLENBQW9CLFVBQVNDLEdBQVQsRUFBY3NILEdBQWQsRUFBbUI7QUFDckMsY0FBSXFELE9BQU8sR0FBR3BNLENBQUMsQ0FBQ0EsQ0FBQyxDQUFDeUIsR0FBRCxDQUFELENBQU9nRSxJQUFQLENBQVksTUFBWixFQUFvQixDQUFwQixDQUFELENBQUQsQ0FBMEJzRyxJQUExQixFQUFkOztBQUNBLGNBQUk1RyxNQUFNLENBQUNyRCxLQUFQLEtBQWlCc0ssT0FBckIsRUFBOEI7QUFDNUI5SyxZQUFBQSxJQUFJLENBQUMrSSxZQUFMLENBQWtCNUUsSUFBbEIsQ0FBdUIsc0JBQXZCLEVBQ0dDLEVBREgsQ0FDTXFELEdBRE4sRUFDV3NELE9BRFgsQ0FDbUIsT0FEbkI7QUFFRDtBQUNGLFNBTkQ7QUFPRDtBQUNGLEtBekJEO0FBMEJELEdBdklEOztBQXlJQTdJLEVBQUFBLE1BQU0sQ0FBQzhJLFlBQVAsR0FBc0JqRCxZQUF0QjtBQUNELENBaE9BLEVBZ09DNUYsTUFoT0QsRUFnT1NtQyxLQWhPVCxDQUFEOzs7OztBQ0FBOzs7OztBQU1BOztBQUFDLENBQUMsVUFBVTVGLENBQVYsRUFBYTRGLEtBQWIsRUFBb0I7QUFFbEI7QUFDQUEsRUFBQUEsS0FBSyxDQUFDQyxHQUFOLENBQVUsQ0FBQyxTQUFELENBQVYsRUFBdUIsWUFBWTtBQUUvQixhQUFTMEcsUUFBVCxHQUFvQjtBQUNoQixVQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUNBLFVBQUlDLE9BQU8sR0FBRztBQUNWLFdBQUcsRUFETztBQUVWLFdBQUcsUUFGTztBQUdWLFdBQUc7QUFITyxPQUFkO0FBS0EsVUFBSSxDQUFDQSxPQUFPLENBQUNELElBQUksQ0FBQ3RGLElBQU4sQ0FBWixFQUF5QnNGLElBQUksQ0FBQ3RGLElBQUwsR0FBWSxDQUFaO0FBQ3pCLFVBQUk2RSxJQUFJLDhDQUFzQ1UsT0FBTyxDQUFDRCxJQUFJLENBQUN0RixJQUFOLENBQTdDLGNBQTREc0YsSUFBSSxDQUFDRSxTQUFMLEdBQWVGLElBQUksQ0FBQ0UsU0FBcEIsR0FBOEIsRUFBMUYsZ0JBQWlHRixJQUFJLENBQUNsTSxFQUFMLGdCQUFja00sSUFBSSxDQUFDbE0sRUFBbkIsSUFBd0IsRUFBekgsZUFBZ0lrTSxJQUFJLENBQUN6TCxLQUFMLHFCQUFxQnlMLElBQUksQ0FBQ3pMLEtBQTFCLFVBQW1DLEVBQW5LLHVDQUNLeUwsSUFBSSxDQUFDRyxNQUFMLENBQVlDLE1BQVosb0hBRTJCSixJQUFJLENBQUNHLE1BQUwsQ0FBWTNLLEtBRnZDLGlEQUdLd0ssSUFBSSxDQUFDRyxNQUFMLENBQVlFLE9BQVosSUFBcUJMLElBQUksQ0FBQ0csTUFBTCxDQUFZRSxPQUFaLENBQW9CMUssTUFBcEIsR0FBMkIsQ0FBaEQseUVBRUlxSyxJQUFJLENBQUNHLE1BQUwsQ0FBWUUsT0FBWixDQUFvQjNILEdBQXBCLENBQXdCLFVBQVNMLElBQVQsRUFBYztBQUNwQyw0RUFBNERBLElBQUksQ0FBQzZILFNBQUwsYUFBa0I3SCxJQUFJLENBQUM2SCxTQUF2QixJQUFtQyxFQUEvRix1Q0FBMkg3SCxJQUFJLENBQUNpSSxJQUFMLHdCQUF1QmpJLElBQUksQ0FBQ2lJLElBQTVCLGVBQXlDLEVBQXBLLFNBQXlLakksSUFBSSxDQUFDTyxJQUE5SztBQUNILE9BRkMsQ0FGSix5Q0FLRyxFQVJSLHdFQVVBLEVBWEwsMElBQVI7QUFpQkEsYUFBT3BGLENBQUMsQ0FBQytMLElBQUQsQ0FBUjtBQUVIOztBQUFBOztBQUlELGFBQVNnQixTQUFULEdBQXFCO0FBQ2pCLFVBQUlQLElBQUksR0FBRyxJQUFYO0FBQ0EsVUFBRyxDQUFDQSxJQUFJLENBQUNRLFdBQVQsRUFBc0I7QUFDdEIsVUFBSS9MLElBQUksR0FBR3VMLElBQUksQ0FBQ1EsV0FBaEI7QUFBQSxVQUE0QmpCLElBQUksR0FBRyxJQUFuQzs7QUFFQSxVQUFJOUssSUFBSSxDQUFDZ00sU0FBTCxHQUFpQixDQUFqQixJQUFzQmhNLElBQUksQ0FBQ2dNLFNBQUwsR0FBaUIsRUFBM0MsRUFBK0M7QUFDM0NuSSxRQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyx3QkFBZDtBQUNIOztBQUVELGVBQVNtSSxVQUFULENBQW9CckksSUFBcEIsRUFBMEJzSSxPQUExQixFQUFtQztBQUMvQixZQUFHLENBQUN0SSxJQUFJLENBQUN1QyxJQUFULEVBQWV2QyxJQUFJLENBQUN1QyxJQUFMLEdBQVUsTUFBVjs7QUFDZixnQkFBUXZDLElBQUksQ0FBQ3VDLElBQWI7QUFDSSxlQUFLLE1BQUw7QUFDSSxnQkFBRyxDQUFDdkMsSUFBSSxDQUFDL0MsS0FBVCxFQUFlO0FBQ1orQyxjQUFBQSxJQUFJLENBQUMvQyxLQUFMLEdBQVcseUNBQVg7QUFDRjs7QUFDRCxvREFBZ0NxTCxPQUFPLEdBQUMsSUFBRCxHQUFNLEVBQTdDLGdCQUFvRHRJLElBQUksQ0FBQy9DLEtBQXpEOztBQUNKLGVBQUssT0FBTDtBQUNJLGdCQUFHLENBQUMrQyxJQUFJLENBQUMvQyxLQUFULEVBQWdCK0MsSUFBSSxDQUFDL0MsS0FBTCxHQUFXLEVBQVg7QUFDaEIsNktBQ2dEK0MsSUFBSSxDQUFDL0MsS0FEckQ7QUFSUjtBQWFIOztBQUNELFVBQUliLElBQUksQ0FBQ21NLElBQVQsRUFBZTtBQUNYckIsUUFBQUEsSUFBSSxrSEFDVTlLLElBQUksQ0FBQ21NLElBQUwsQ0FBVWxJLEdBQVYsQ0FBYyxVQUFTbUksR0FBVCxFQUFhO0FBQy9CLDRHQUNZQSxHQUFHLENBQUNuSSxHQUFKLENBQVEsVUFBU0wsSUFBVCxFQUFjO0FBQ3BCLHNEQUFrQ0EsSUFBSSxDQUFDb0ksU0FBTCxJQUFnQmhNLElBQUksQ0FBQ2dNLFNBQXZELGNBQW9FcEksSUFBSSxDQUFDeUksTUFBTCxnQ0FBa0N6SSxJQUFJLENBQUN5SSxNQUF2QyxJQUFnRCxFQUFwSCw2S0FFc0N6SSxJQUFJLENBQUMwSSxLQUYzQywyS0FJa0JMLFVBQVUsQ0FBQ3JJLElBQUQsRUFBTTVELElBQUksQ0FBQ2tNLE9BQVgsQ0FKNUI7QUFRQyxXQVRILEVBU0tLLElBVEwsQ0FTVSxFQVRWLENBRFo7QUFhQyxTQWRHLEVBY0RBLElBZEMsQ0FjSSxFQWRKLENBRFYsd0NBQUo7QUFtQkgsT0FwQkQsTUFvQk87QUFDSDtBQUNIOztBQUNELGFBQU94TixDQUFDLENBQUMrTCxJQUFELENBQVI7QUFDSDs7QUFFRCxhQUFTMEIsUUFBVCxDQUFrQkMsR0FBbEIsRUFBdUJ2TixPQUF2QixFQUFnQztBQUM1QixVQUFJOEYsS0FBSyxHQUFHLElBQVo7O0FBQ0FBLE1BQUFBLEtBQUssQ0FBQzNGLEVBQU4sR0FBVyxhQUFhLElBQUlxTixJQUFKLEdBQVdDLE9BQVgsRUFBeEIsQ0FGNEIsQ0FFa0I7O0FBRTlDLFVBQUlGLEdBQUosRUFBU0csR0FBVCxDQUo0QixDQUs1Qjs7QUFDQSxVQUFJQyxTQUFTLENBQUMzTCxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCMEwsUUFBQUEsR0FBRyxHQUFHQyxTQUFTLENBQUMsQ0FBRCxDQUFmOztBQUNBLFlBQUksUUFBT0QsR0FBUCxNQUFlLFFBQW5CLEVBQTZCO0FBQ3pCLGNBQUlsTixNQUFNLEdBQUc7QUFDVEYsWUFBQUEsUUFBUSxFQUFDLEVBREE7QUFFVGlNLFlBQUFBLFNBQVMsRUFBRyxFQUZIO0FBR1QzTCxZQUFBQSxLQUFLLEVBQUcsRUFIQztBQUlUbUcsWUFBQUEsSUFBSSxFQUFHLENBSkU7QUFLVGxGLFlBQUFBLEtBQUssRUFBRSxFQUxFO0FBTVQ2SyxZQUFBQSxPQUFPLEVBQUUsSUFOQTtBQU9Ua0IsWUFBQUEsS0FBSyxFQUFDLElBUEc7QUFRVHBCLFlBQUFBLE1BQU0sRUFBQztBQUNIQyxjQUFBQSxNQUFNLEVBQUUsSUFETDtBQUVINUssY0FBQUEsS0FBSyxFQUFFLEVBRko7QUFHSDZLLGNBQUFBLE9BQU8sRUFBRTtBQUhOLGFBUkU7QUFhVEcsWUFBQUEsV0FBVyxFQUFHO0FBYkwsV0FBYjtBQWVDbkosVUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNtQyxLQUFkLEVBQW9CdEYsTUFBcEIsRUFBMkJrTixHQUEzQjtBQUVENUgsVUFBQUEsS0FBSyxDQUFDK0gsVUFBTixHQUFtQnpCLFFBQVEsQ0FBQ0osSUFBVCxDQUFjbEcsS0FBZCxDQUFuQixDQWxCeUIsQ0FtQnpCOztBQUNBLGNBQUdBLEtBQUssQ0FBQytHLFdBQU4sSUFBbUIsSUFBbkIsSUFBMkIvRyxLQUFLLENBQUMrRyxXQUFOLENBQWtCSSxJQUE3QyxJQUFtRG5ILEtBQUssQ0FBQytHLFdBQU4sQ0FBa0JJLElBQWxCLENBQXVCakwsTUFBdkIsR0FBOEIsQ0FBcEYsRUFBc0Y7QUFDOUU4RCxZQUFBQSxLQUFLLENBQUNnSSxlQUFOLENBQXNCbEIsU0FBUyxDQUFDWixJQUFWLENBQWVsRyxLQUFmLENBQXRCO0FBRVA7O0FBQ0RBLFVBQUFBLEtBQUssQ0FBQ3pGLFFBQU4sQ0FBZXlGLEtBQUssQ0FBQ3hGLFFBQXJCO0FBQ0g7QUFDSixPQTVCRCxNQTRCTyxJQUFJcU4sU0FBUyxDQUFDM0wsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMvQnVMLFFBQUFBLEdBQUcsR0FBR0ksU0FBUyxDQUFDLENBQUQsQ0FBZjtBQUNBRCxRQUFBQSxHQUFHLEdBQUdDLFNBQVMsQ0FBQyxDQUFELENBQWY7O0FBQ0EsWUFBSSxRQUFPRCxHQUFQLE1BQWUsUUFBbkIsRUFBNkI7QUFDekI1SCxVQUFBQSxLQUFLLENBQUNDLElBQU4sR0FBYWxHLENBQUMsQ0FBQ1ksTUFBRixDQUFTLElBQVQsRUFBZUQsTUFBZixFQUF1QmtOLEdBQXZCLENBQWI7QUFDQTVILFVBQUFBLEtBQUssQ0FBQytILFVBQU4sR0FBbUJ6QixRQUFRLENBQUN0RyxLQUFLLENBQUNDLElBQVAsQ0FBM0I7O0FBQ0FELFVBQUFBLEtBQUssQ0FBQ3pGLFFBQU4sQ0FBZWtOLEdBQWY7QUFDSDtBQUNKO0FBQ0o7O0FBQUE7O0FBQ0RELElBQUFBLFFBQVEsQ0FBQ25JLFNBQVQsQ0FBbUI5RSxRQUFuQixHQUE4QixVQUFVa04sR0FBVixFQUFlO0FBRXpDLFVBQUcsS0FBS0ssS0FBUixFQUFjO0FBQ1gvTixRQUFBQSxDQUFDLENBQUMsTUFBTTBOLEdBQVAsQ0FBRCxDQUFhaEMsS0FBYjtBQUNGOztBQUNEMUwsTUFBQUEsQ0FBQyxDQUFDLE1BQU0wTixHQUFQLENBQUQsQ0FBYXBLLE1BQWIsQ0FBb0IsS0FBSzBLLFVBQXpCO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FQRDs7QUFTQVAsSUFBQUEsUUFBUSxDQUFDbkksU0FBVCxDQUFtQjJJLGVBQW5CLEdBQXFDLFVBQVVDLGFBQVYsRUFBMEM7QUFBQSxVQUFqQkMsT0FBaUIsdUVBQVAsS0FBTztBQUMzRSxVQUFJVCxHQUFHLEdBQUMsS0FBS00sVUFBTCxDQUFnQnZJLElBQWhCLENBQXFCLGtCQUFyQixDQUFSOztBQUNBLFVBQUcwSSxPQUFILEVBQVc7QUFDUFQsUUFBQUEsR0FBRyxDQUFDaEMsS0FBSjtBQUNIOztBQUNGNUcsTUFBQUEsT0FBTyxDQUFDc0osR0FBUixDQUFhdkssTUFBTSxDQUFDeUIsU0FBUCxDQUFpQitJLFFBQWpCLENBQTBCbEMsSUFBMUIsQ0FBK0IrQixhQUEvQixDQUFiO0FBQ0FwSixNQUFBQSxPQUFPLENBQUNzSixHQUFSLENBQVlGLGFBQWEsQ0FBQyxDQUFELENBQWIsQ0FBaUJJLFFBQWpCLEtBQThCLENBQTFDO0FBQ0F4SixNQUFBQSxPQUFPLENBQUNzSixHQUFSLENBQVksT0FBT0YsYUFBYSxDQUFDLENBQUQsQ0FBYixDQUFpQkssUUFBeEIsS0FBcUMsUUFBakQsRUFQNEUsQ0FRNUU7O0FBQ0F6SixNQUFBQSxPQUFPLENBQUNzSixHQUFSLENBQWFGLGFBQWEsQ0FBQyxDQUFELENBQWIsWUFBNEJNLFdBQXpDO0FBQ0ExSixNQUFBQSxPQUFPLENBQUNzSixHQUFSLENBQWFGLGFBQWEsWUFBWXpLLE1BQXRDO0FBQ0FxQixNQUFBQSxPQUFPLENBQUNzSixHQUFSLENBQVksaUJBQWdCdkssTUFBTSxDQUFDeUIsU0FBUCxDQUFpQitJLFFBQWpCLENBQTBCbEMsSUFBMUIsQ0FBK0IsS0FBS2EsV0FBcEMsQ0FBNUI7QUFDQWxJLE1BQUFBLE9BQU8sQ0FBQ3NKLEdBQVIsQ0FBWSxpQkFBZW5DLEtBQUssQ0FBQ3dDLE9BQU4sQ0FBYyxLQUFLekIsV0FBbkIsQ0FBM0I7QUFDQWxJLE1BQUFBLE9BQU8sQ0FBQ3NKLEdBQVIsQ0FBWSxLQUFLcEIsV0FBTCxZQUE0QndCLFdBQXhDO0FBQ0NkLE1BQUFBLEdBQUcsQ0FBQ3BLLE1BQUosQ0FBVzRLLGFBQVg7QUFDQSxhQUFPLElBQVA7QUFFSCxLQWpCRDs7QUF5QkExSyxJQUFBQSxNQUFNLENBQUNrTCxRQUFQLEdBQWtCakIsUUFBbEI7QUFFQTs7OztBQU9ILEdBM0tEO0FBOEtILENBakxBLEVBaUxFaEssTUFqTEYsRUFpTFVtQyxLQWpMVjs7O0FDTkQ7O0FBQUMsQ0FBQyxVQUFVNUYsQ0FBVixFQUFhNEYsS0FBYixFQUFvQjtBQUNwQjVGLEVBQUFBLENBQUMsQ0FBQ0MsRUFBRixDQUFLME8saUJBQUwsR0FBeUIsVUFBVXhPLE9BQVYsRUFBbUI7QUFDMUMsV0FBTyxJQUFJeU8saUJBQUosQ0FBc0J6TyxPQUF0QixDQUFQO0FBRUgsR0FIQzs7QUFLQSxNQUFJME8sSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBVTtBQUNuQjtBQUNELEdBRkQ7O0FBSUEsTUFBSUQsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFVek8sT0FBVixFQUFtQjtBQUV6QyxTQUFLbUcsTUFBTCxDQUFZbkcsT0FBWjtBQUVELEdBSkQ7O0FBTUF5TyxFQUFBQSxpQkFBaUIsQ0FBQ3RKLFNBQWxCLENBQTRCZ0IsTUFBNUIsR0FBcUMsVUFBU25HLE9BQVQsRUFBaUI7QUFDcERILElBQUFBLENBQUMsQ0FBQyxNQUFNRyxPQUFPLENBQUNNLFFBQWYsQ0FBRCxDQUEwQjZLLEtBQTFCLENBQWdDdUQsSUFBSSxFQUFwQztBQUNBMU8sSUFBQUEsT0FBTyxDQUFDMk8sRUFBUixHQUFhLE1BQU0zTyxPQUFPLENBQUNNLFFBQTNCO0FBQ0EsV0FBT04sT0FBTyxDQUFDTSxRQUFmO0FBQ0EsV0FBT21GLEtBQUssQ0FBQ21KLFVBQU4sQ0FBaUJ6SSxNQUFqQixDQUF3Qm5HLE9BQXhCLENBQVA7QUFDRCxHQUxEOztBQU9BcUQsRUFBQUEsTUFBTSxDQUFDbUwsaUJBQVAsR0FBMkJDLGlCQUEzQjtBQUdELENBMUJBLEVBMEJFbkwsTUExQkYsRUEwQlVtQyxLQTFCVjs7Ozs7OztBQ0FEOztBQUFDLENBQUMsVUFBVTVGLENBQVYsRUFBYTtBQUFBOztBQUNYLE1BQUlnUCxpQkFBaUIsR0FBRyx3Nm9CQUF4QixDQURXLENBRVg7O0FBQ0QsTUFBSUMsVUFBVTtBQUFFLGFBQVEsSUFBVjtBQUFlLGFBQVEsSUFBdkI7QUFBNEIsYUFBUSxJQUFwQztBQUF5QyxhQUFRLElBQWpEO0FBQXNELGFBQVEsSUFBOUQ7QUFBbUUsYUFBUSxJQUEzRTtBQUFnRixhQUFRLElBQXhGO0FBQTZGLGFBQVEsSUFBckc7QUFBMEcsYUFBUSxJQUFsSDtBQUF1SCxhQUFRLElBQS9IO0FBQW9JLGFBQVEsSUFBNUk7QUFBaUosYUFBUSxJQUF6SjtBQUE4SixhQUFRLElBQXRLO0FBQTJLLGFBQVEsS0FBbkw7QUFBeUwsYUFBUSxJQUFqTTtBQUFzTSxhQUFRLElBQTlNO0FBQW1OLGFBQVEsSUFBM047QUFBZ08sYUFBUSxJQUF4TztBQUE2TyxhQUFRLElBQXJQO0FBQTBQLGFBQVEsSUFBbFE7QUFBdVEsYUFBUSxJQUEvUTtBQUFvUixhQUFRLElBQTVSO0FBQWlTLGFBQVEsSUFBelM7QUFBOFMsYUFBUSxJQUF0VDtBQUEyVCxhQUFRLElBQW5VO0FBQXdVLGFBQVEsSUFBaFY7QUFBcVYsYUFBUSxJQUE3VjtBQUFrVyxhQUFRO0FBQTFXLDJDQUF1WCxJQUF2WCx5Q0FBb1ksSUFBcFkseUNBQWlaLElBQWpaLHlDQUE4WixJQUE5Wix5Q0FBMmEsSUFBM2EsZ0NBQWdiLE9BQWhiLEVBQXdiLElBQXhiLGdDQUE2YixPQUE3YixFQUFxYyxJQUFyYyxnQ0FBMGMsT0FBMWMsRUFBa2QsSUFBbGQsZ0NBQXVkLE9BQXZkLEVBQStkLElBQS9kLGdDQUFvZSxPQUFwZSxFQUE0ZSxJQUE1ZSxnQ0FBaWYsT0FBamYsRUFBeWYsSUFBemYsZ0NBQThmLE9BQTlmLEVBQXNnQixJQUF0Z0IsZ0NBQTJnQixPQUEzZ0IsRUFBbWhCLElBQW5oQixnQ0FBd2hCLE9BQXhoQixFQUFnaUIsSUFBaGlCLGdDQUFxaUIsT0FBcmlCLEVBQTZpQixJQUE3aUIsZ0NBQWtqQixPQUFsakIsRUFBMGpCLElBQTFqQixnQ0FBK2pCLE9BQS9qQixFQUF1a0IsS0FBdmtCLGdDQUE2a0IsT0FBN2tCLEVBQXFsQixJQUFybEIsZ0NBQTBsQixPQUExbEIsRUFBa21CLElBQWxtQixnQ0FBdW1CLE9BQXZtQixFQUErbUIsSUFBL21CLGdDQUFvbkIsT0FBcG5CLEVBQTRuQixJQUE1bkIsZ0NBQWlvQixPQUFqb0IsRUFBeW9CLElBQXpvQixnQ0FBOG9CLE9BQTlvQixFQUFzcEIsSUFBdHBCLGdDQUEycEIsT0FBM3BCLEVBQW1xQixJQUFucUIsZ0NBQXdxQixPQUF4cUIsRUFBZ3JCLElBQWhyQixnQ0FBcXJCLE9BQXJyQixFQUE2ckIsSUFBN3JCLGdDQUFrc0IsT0FBbHNCLEVBQTBzQixJQUExc0IsZ0NBQStzQixPQUEvc0IsRUFBdXRCLElBQXZ0QixnQ0FBNHRCLE9BQTV0QixFQUFvdUIsSUFBcHVCLGdDQUF5dUIsT0FBenVCLEVBQWl2QixJQUFqdkIsZ0NBQXN2QixPQUF0dkIsRUFBOHZCLElBQTl2QixnQ0FBbXdCLE9BQW53QixFQUEyd0IsSUFBM3dCLGdDQUFneEIsT0FBaHhCLEVBQXd4QixHQUF4eEIsZ0NBQTR4QixPQUE1eEIsRUFBb3lCLElBQXB5QixnQ0FBeXlCLE9BQXp5QixFQUFpekIsSUFBanpCLGdDQUFzekIsT0FBdHpCLEVBQTh6QixHQUE5ekIsZ0NBQWswQixPQUFsMEIsRUFBMDBCLElBQTEwQixnQ0FBKzBCLE9BQS8wQixFQUF1MUIsS0FBdjFCLGdDQUE2MUIsT0FBNzFCLEVBQXEyQixJQUFyMkIsZ0NBQTAyQixPQUExMkIsRUFBazNCLElBQWwzQixnQ0FBdTNCLE9BQXYzQixFQUErM0IsS0FBLzNCLGdDQUFxNEIsT0FBcjRCLEVBQTY0QixJQUE3NEIsZ0NBQWs1QixPQUFsNUIsRUFBMDVCLEdBQTE1QixnQ0FBODVCLE9BQTk1QixFQUFzNkIsSUFBdDZCLGdDQUEyNkIsT0FBMzZCLEVBQW03QixLQUFuN0IsZ0NBQXk3QixPQUF6N0IsRUFBaThCLEdBQWo4QixnQ0FBcThCLE9BQXI4QixFQUE2OEIsSUFBNzhCLGdDQUFrOUIsT0FBbDlCLEVBQTA5QixJQUExOUIsZ0NBQSs5QixPQUEvOUIsRUFBdStCLEdBQXYrQixnQ0FBMitCLE9BQTMrQixFQUFtL0IsSUFBbi9CLGdDQUF3L0IsT0FBeC9CLEVBQWdnQyxJQUFoZ0MsZ0NBQXFnQyxPQUFyZ0MsRUFBNmdDLElBQTdnQyxnQ0FBa2hDLE9BQWxoQyxFQUEwaEMsSUFBMWhDLGdDQUEraEMsT0FBL2hDLEVBQXVpQyxJQUF2aUMsZ0NBQTRpQyxPQUE1aUMsRUFBb2pDLElBQXBqQyxnQ0FBeWpDLE9BQXpqQyxFQUFpa0MsSUFBamtDLGdDQUFza0MsT0FBdGtDLEVBQThrQyxHQUE5a0MsZ0NBQWtsQyxPQUFsbEMsRUFBMGxDLElBQTFsQyxnQ0FBK2xDLE9BQS9sQyxFQUF1bUMsSUFBdm1DLGdDQUE0bUMsT0FBNW1DLEVBQW9uQyxJQUFwbkMsZ0NBQXluQyxPQUF6bkMsRUFBaW9DLElBQWpvQyxnQ0FBc29DLE9BQXRvQyxFQUE4b0MsSUFBOW9DLGdDQUFtcEMsT0FBbnBDLEVBQTJwQyxJQUEzcEMsZ0NBQWdxQyxPQUFocUMsRUFBd3FDLElBQXhxQyxnQ0FBNnFDLE9BQTdxQyxFQUFxckMsSUFBcnJDLGdDQUEwckMsT0FBMXJDLEVBQWtzQyxJQUFsc0MsZ0NBQXVzQyxPQUF2c0MsRUFBK3NDLElBQS9zQyxnQ0FBb3RDLE9BQXB0QyxFQUE0dEMsSUFBNXRDLGdDQUFpdUMsT0FBanVDLEVBQXl1QyxJQUF6dUMsZ0NBQTh1QyxPQUE5dUMsRUFBc3ZDLElBQXR2QyxnQ0FBMnZDLE9BQTN2QyxFQUFtd0MsSUFBbndDLGdDQUF3d0MsT0FBeHdDLEVBQWd4QyxJQUFoeEMsZ0NBQXF4QyxPQUFyeEMsRUFBNnhDLElBQTd4QyxnQ0FBa3lDLE9BQWx5QyxFQUEweUMsSUFBMXlDLGdDQUEreUMsT0FBL3lDLEVBQXV6QyxJQUF2ekMsZ0NBQTR6QyxPQUE1ekMsRUFBbzBDLElBQXAwQyxnQ0FBeTBDLE9BQXowQyxFQUFpMUMsSUFBajFDLGdDQUFzMUMsT0FBdDFDLEVBQTgxQyxJQUE5MUMsZ0NBQW0yQyxPQUFuMkMsRUFBMjJDLElBQTMyQyxnQ0FBZzNDLE9BQWgzQyxFQUF3M0MsSUFBeDNDLGdDQUE2M0MsT0FBNzNDLEVBQXE0QyxJQUFyNEMsZ0NBQTA0QyxPQUExNEMsRUFBazVDLElBQWw1QyxnQ0FBdTVDLE9BQXY1QyxFQUErNUMsSUFBLzVDLGdDQUFvNkMsT0FBcDZDLEVBQTQ2QyxJQUE1NkMsZ0NBQWk3QyxPQUFqN0MsRUFBeTdDLElBQXo3QyxnQ0FBODdDLE9BQTk3QyxFQUFzOEMsSUFBdDhDLGdDQUEyOEMsT0FBMzhDLEVBQW05QyxJQUFuOUMsZ0NBQXc5QyxPQUF4OUMsRUFBZytDLElBQWgrQyxnQ0FBcStDLE9BQXIrQyxFQUE2K0MsSUFBNytDLGdDQUFrL0MsT0FBbC9DLEVBQTAvQyxJQUExL0MsZ0NBQSsvQyxPQUEvL0MsRUFBdWdELElBQXZnRCxnQ0FBNGdELE9BQTVnRCxFQUFvaEQsSUFBcGhELGdDQUF5aEQsT0FBemhELEVBQWlpRCxJQUFqaUQsZ0NBQXNpRCxPQUF0aUQsRUFBOGlELElBQTlpRCxnQ0FBbWpELE9BQW5qRCxFQUEyakQsSUFBM2pELGdDQUFna0QsT0FBaGtELEVBQXdrRCxJQUF4a0QsZ0NBQTZrRCxPQUE3a0QsRUFBcWxELElBQXJsRCxnQ0FBMGxELE9BQTFsRCxFQUFrbUQsSUFBbG1ELGdDQUF1bUQsT0FBdm1ELEVBQSttRCxJQUEvbUQsZ0NBQW9uRCxPQUFwbkQsRUFBNG5ELElBQTVuRCxnQ0FBaW9ELE9BQWpvRCxFQUF5b0QsSUFBem9ELGdDQUE4b0QsT0FBOW9ELEVBQXNwRCxJQUF0cEQsZ0NBQTJwRCxPQUEzcEQsRUFBbXFELElBQW5xRCxnQ0FBd3FELE9BQXhxRCxFQUFnckQsSUFBaHJELGdDQUFxckQsT0FBcnJELEVBQTZyRCxJQUE3ckQsZ0NBQWtzRCxPQUFsc0QsRUFBMHNELElBQTFzRCxnQ0FBK3NELE9BQS9zRCxFQUF1dEQsSUFBdnRELGdDQUE0dEQsT0FBNXRELEVBQW91RCxJQUFwdUQsZ0NBQXl1RCxPQUF6dUQsRUFBaXZELElBQWp2RCxnQ0FBc3ZELE9BQXR2RCxFQUE4dkQsSUFBOXZELGdDQUFtd0QsT0FBbndELEVBQTJ3RCxJQUEzd0QsZ0NBQWd4RCxPQUFoeEQsRUFBd3hELElBQXh4RCxnQ0FBNnhELE9BQTd4RCxFQUFxeUQsSUFBcnlELGdDQUEweUQsT0FBMXlELEVBQWt6RCxJQUFsekQsZ0NBQXV6RCxPQUF2ekQsRUFBK3pELElBQS96RCxnQ0FBbzBELE9BQXAwRCxFQUE0MEQsSUFBNTBELGdDQUFpMUQsT0FBajFELEVBQXkxRCxJQUF6MUQsZ0NBQTgxRCxPQUE5MUQsRUFBczJELElBQXQyRCxnQ0FBMjJELE9BQTMyRCxFQUFtM0QsSUFBbjNELGdDQUF3M0QsT0FBeDNELEVBQWc0RCxJQUFoNEQsZ0NBQXE0RCxPQUFyNEQsRUFBNjRELElBQTc0RCxnQ0FBazVELE9BQWw1RCxFQUEwNUQsSUFBMTVELGdDQUErNUQsT0FBLzVELEVBQXU2RCxJQUF2NkQsZ0NBQTQ2RCxPQUE1NkQsRUFBbzdELElBQXA3RCxnQ0FBeTdELE9BQXo3RCxFQUFpOEQsSUFBajhELGdDQUFzOEQsT0FBdDhELEVBQTg4RCxJQUE5OEQsZ0NBQW05RCxPQUFuOUQsRUFBMjlELElBQTM5RCxnQ0FBZytELE9BQWgrRCxFQUF3K0QsSUFBeCtELGdDQUE2K0QsT0FBNytELEVBQXEvRCxJQUFyL0QsZ0NBQTAvRCxPQUExL0QsRUFBa2dFLEdBQWxnRSxnQ0FBc2dFLE9BQXRnRSxFQUE4Z0UsR0FBOWdFLGdDQUFraEUsT0FBbGhFLEVBQTBoRSxJQUExaEUsZ0NBQStoRSxPQUEvaEUsRUFBdWlFLElBQXZpRSxnQ0FBNGlFLE9BQTVpRSxFQUFvakUsSUFBcGpFLGdDQUF5akUsT0FBempFLEVBQWlrRSxJQUFqa0UsZ0NBQXNrRSxPQUF0a0UsRUFBOGtFLElBQTlrRSxnQ0FBbWxFLE9BQW5sRSxFQUEybEUsSUFBM2xFLGdDQUFnbUUsT0FBaG1FLEVBQXdtRSxJQUF4bUUsZ0NBQTZtRSxPQUE3bUUsRUFBcW5FLElBQXJuRSxnQ0FBMG5FLE9BQTFuRSxFQUFrb0UsSUFBbG9FLGdDQUF1b0UsT0FBdm9FLEVBQStvRSxJQUEvb0UsZ0NBQW9wRSxPQUFwcEUsRUFBNHBFLElBQTVwRSxnQ0FBaXFFLE9BQWpxRSxFQUF5cUUsSUFBenFFLGdDQUE4cUUsT0FBOXFFLEVBQXNyRSxJQUF0ckUsZ0NBQTJyRSxPQUEzckUsRUFBbXNFLElBQW5zRSxnQ0FBd3NFLE9BQXhzRSxFQUFndEUsSUFBaHRFLGdDQUFxdEUsT0FBcnRFLEVBQTZ0RSxJQUE3dEUsZ0NBQWt1RSxPQUFsdUUsRUFBMHVFLElBQTF1RSxnQ0FBK3VFLE9BQS91RSxFQUF1dkUsSUFBdnZFLGdDQUE0dkUsT0FBNXZFLEVBQW93RSxJQUFwd0UsZ0NBQXl3RSxPQUF6d0UsRUFBaXhFLElBQWp4RSxnQ0FBc3hFLE9BQXR4RSxFQUE4eEUsSUFBOXhFLGdDQUFteUUsT0FBbnlFLEVBQTJ5RSxJQUEzeUUsZ0NBQWd6RSxPQUFoekUsRUFBd3pFLElBQXh6RSxnQ0FBNnpFLE9BQTd6RSxFQUFxMEUsSUFBcjBFLGdDQUEwMEUsT0FBMTBFLEVBQWsxRSxJQUFsMUUsZ0NBQXUxRSxPQUF2MUUsRUFBKzFFLElBQS8xRSxnQ0FBbzJFLE9BQXAyRSxFQUE0MkUsSUFBNTJFLGdDQUFpM0UsT0FBajNFLEVBQXkzRSxJQUF6M0UsZ0NBQTgzRSxPQUE5M0UsRUFBczRFLElBQXQ0RSxnQ0FBMjRFLE9BQTM0RSxFQUFtNUUsSUFBbjVFLGdDQUF3NUUsT0FBeDVFLEVBQWc2RSxJQUFoNkUsZ0NBQXE2RSxPQUFyNkUsRUFBNjZFLElBQTc2RSxnQ0FBazdFLE9BQWw3RSxFQUEwN0UsSUFBMTdFLGdDQUErN0UsT0FBLzdFLEVBQXU4RSxJQUF2OEUsZ0NBQTQ4RSxPQUE1OEUsRUFBbzlFLElBQXA5RSxnQ0FBeTlFLE9BQXo5RSxFQUFpK0UsSUFBaitFLGdDQUFzK0UsT0FBdCtFLEVBQTgrRSxJQUE5K0UsZ0NBQW0vRSxPQUFuL0UsRUFBMi9FLElBQTMvRSxnQ0FBZ2dGLE9BQWhnRixFQUF3Z0YsSUFBeGdGLGdDQUE2Z0YsT0FBN2dGLEVBQXFoRixHQUFyaEYsZ0NBQXloRixPQUF6aEYsRUFBaWlGLElBQWppRixnQ0FBc2lGLE9BQXRpRixFQUE4aUYsSUFBOWlGLGdDQUFtakYsT0FBbmpGLEVBQTJqRixJQUEzakYsZ0NBQWdrRixPQUFoa0YsRUFBd2tGLElBQXhrRixnQ0FBNmtGLE9BQTdrRixFQUFxbEYsSUFBcmxGLGdDQUEwbEYsT0FBMWxGLEVBQWttRixJQUFsbUYsZ0NBQXVtRixPQUF2bUYsRUFBK21GLElBQS9tRixnQ0FBb25GLE9BQXBuRixFQUE0bkYsSUFBNW5GLGdDQUFpb0YsT0FBam9GLEVBQXlvRixJQUF6b0YsZ0NBQThvRixPQUE5b0YsRUFBc3BGLElBQXRwRixnQ0FBMnBGLE9BQTNwRixFQUFtcUYsSUFBbnFGLGdDQUF3cUYsT0FBeHFGLEVBQWdyRixJQUFockYsZ0NBQXFyRixPQUFyckYsRUFBNnJGLElBQTdyRixnQ0FBa3NGLE9BQWxzRixFQUEwc0YsSUFBMXNGLGdDQUErc0YsT0FBL3NGLEVBQXV0RixJQUF2dEYsZ0NBQTR0RixPQUE1dEYsRUFBb3VGLElBQXB1RixnQ0FBeXVGLE9BQXp1RixFQUFpdkYsSUFBanZGLGdDQUFzdkYsT0FBdHZGLEVBQTh2RixJQUE5dkYsZ0NBQW13RixPQUFud0YsRUFBMndGLElBQTN3RixnQ0FBZ3hGLE9BQWh4RixFQUF3eEYsSUFBeHhGLGdDQUE2eEYsT0FBN3hGLEVBQXF5RixJQUFyeUYsZ0NBQTB5RixPQUExeUYsRUFBa3pGLElBQWx6RixnQ0FBdXpGLE9BQXZ6RixFQUErekYsSUFBL3pGLGdDQUFvMEYsT0FBcDBGLEVBQTQwRixHQUE1MEYsZ0NBQWcxRixPQUFoMUYsRUFBdzFGLElBQXgxRixnQ0FBNjFGLE9BQTcxRixFQUFxMkYsSUFBcjJGLGdDQUEwMkYsT0FBMTJGLEVBQWszRixJQUFsM0YsZ0NBQXUzRixPQUF2M0YsRUFBKzNGLElBQS8zRixnQ0FBbzRGLE9BQXA0RixFQUE0NEYsSUFBNTRGLGdDQUFpNUYsT0FBajVGLEVBQXk1RixJQUF6NUYsZ0NBQTg1RixPQUE5NUYsRUFBczZGLEtBQXQ2RixnQ0FBNDZGLE9BQTU2RixFQUFvN0YsSUFBcDdGLGdDQUF5N0YsT0FBejdGLEVBQWk4RixJQUFqOEYsZ0NBQXM4RixPQUF0OEYsRUFBODhGLElBQTk4RixnQ0FBbTlGLE9BQW45RixFQUEyOUYsSUFBMzlGLGdDQUFnK0YsT0FBaCtGLEVBQXcrRixJQUF4K0YsZ0NBQTYrRixPQUE3K0YsRUFBcS9GLElBQXIvRixnQ0FBMC9GLE9BQTEvRixFQUFrZ0csS0FBbGdHLGdDQUF3Z0csT0FBeGdHLEVBQWdoRyxJQUFoaEcsZ0NBQXFoRyxPQUFyaEcsRUFBNmhHLElBQTdoRyxnQ0FBa2lHLE9BQWxpRyxFQUEwaUcsSUFBMWlHLGdDQUEraUcsT0FBL2lHLEVBQXVqRyxJQUF2akcsZ0NBQTRqRyxPQUE1akcsRUFBb2tHLElBQXBrRyxnQ0FBeWtHLE9BQXprRyxFQUFpbEcsSUFBamxHLGdDQUFzbEcsT0FBdGxHLEVBQThsRyxJQUE5bEcsZ0NBQW1tRyxPQUFubUcsRUFBMm1HLElBQTNtRyxnQ0FBZ25HLE9BQWhuRyxFQUF3bkcsS0FBeG5HLGdDQUE4bkcsT0FBOW5HLEVBQXNvRyxJQUF0b0csZ0NBQTJvRyxPQUEzb0csRUFBbXBHLElBQW5wRyxnQ0FBd3BHLE9BQXhwRyxFQUFncUcsSUFBaHFHLGdDQUFxcUcsT0FBcnFHLEVBQTZxRyxJQUE3cUcsZ0NBQWtyRyxPQUFsckcsRUFBMHJHLElBQTFyRyxnQ0FBK3JHLE9BQS9yRyxFQUF1c0csSUFBdnNHLGdDQUE0c0csT0FBNXNHLEVBQW90RyxJQUFwdEcsZ0NBQXl0RyxPQUF6dEcsRUFBaXVHLElBQWp1RyxnQ0FBc3VHLE9BQXR1RyxFQUE4dUcsSUFBOXVHLGdDQUFtdkcsT0FBbnZHLEVBQTJ2RyxJQUEzdkcsZ0NBQWd3RyxPQUFod0csRUFBd3dHLElBQXh3RyxnQ0FBNndHLE9BQTd3RyxFQUFxeEcsSUFBcnhHLGdDQUEweEcsT0FBMXhHLEVBQWt5RyxJQUFseUcsZ0NBQXV5RyxPQUF2eUcsRUFBK3lHLElBQS95RyxnQ0FBb3pHLE9BQXB6RyxFQUE0ekcsSUFBNXpHLGdDQUFpMEcsT0FBajBHLEVBQXkwRyxJQUF6MEcsZ0NBQTgwRyxPQUE5MEcsRUFBczFHLEtBQXQxRyxnQ0FBNDFHLE9BQTUxRyxFQUFvMkcsSUFBcDJHLGdDQUF5MkcsT0FBejJHLEVBQWkzRyxJQUFqM0csZ0NBQXMzRyxPQUF0M0csRUFBODNHLElBQTkzRyxnQ0FBbTRHLE9BQW40RyxFQUEyNEcsSUFBMzRHLGdDQUFnNUcsT0FBaDVHLEVBQXc1RyxJQUF4NUcsZ0NBQTY1RyxPQUE3NUcsRUFBcTZHLElBQXI2RyxnQ0FBMDZHLE9BQTE2RyxFQUFrN0csSUFBbDdHLGdDQUF1N0csT0FBdjdHLEVBQSs3RyxJQUEvN0csZ0NBQW84RyxPQUFwOEcsRUFBNDhHLElBQTU4RyxnQ0FBaTlHLE9BQWo5RyxFQUF5OUcsSUFBejlHLGdDQUE4OUcsT0FBOTlHLEVBQXMrRyxJQUF0K0csZ0NBQTIrRyxPQUEzK0csRUFBbS9HLElBQW4vRyxnQ0FBdy9HLE9BQXgvRyxFQUFnZ0gsSUFBaGdILGdDQUFxZ0gsT0FBcmdILEVBQTZnSCxJQUE3Z0gsZ0NBQWtoSCxPQUFsaEgsRUFBMGhILElBQTFoSCxnQ0FBK2hILE9BQS9oSCxFQUF1aUgsSUFBdmlILGdDQUE0aUgsT0FBNWlILEVBQW9qSCxJQUFwakgsZ0NBQXlqSCxPQUF6akgsRUFBaWtILElBQWprSCxnQ0FBc2tILE9BQXRrSCxFQUE4a0gsSUFBOWtILGdDQUFtbEgsT0FBbmxILEVBQTJsSCxJQUEzbEgsZ0NBQWdtSCxPQUFobUgsRUFBd21ILElBQXhtSCxnQ0FBNm1ILE9BQTdtSCxFQUFxbkgsSUFBcm5ILGdDQUEwbkgsT0FBMW5ILEVBQWtvSCxJQUFsb0gsZ0NBQXVvSCxPQUF2b0gsRUFBK29ILElBQS9vSCxnQ0FBb3BILE9BQXBwSCxFQUE0cEgsSUFBNXBILGdDQUFpcUgsT0FBanFILEVBQXlxSCxJQUF6cUgsZ0NBQThxSCxPQUE5cUgsRUFBc3JILElBQXRySCxnQ0FBMnJILE9BQTNySCxFQUFtc0gsSUFBbnNILGdDQUF3c0gsT0FBeHNILEVBQWd0SCxJQUFodEgsZ0NBQXF0SCxPQUFydEgsRUFBNnRILElBQTd0SCxnQ0FBa3VILE9BQWx1SCxFQUEwdUgsSUFBMXVILGdDQUErdUgsT0FBL3VILEVBQXV2SCxJQUF2dkgsZ0NBQTR2SCxPQUE1dkgsRUFBb3dILElBQXB3SCxnQ0FBeXdILE9BQXp3SCxFQUFpeEgsSUFBanhILGdDQUFzeEgsT0FBdHhILEVBQTh4SCxJQUE5eEgsZ0NBQW15SCxPQUFueUgsRUFBMnlILElBQTN5SCxnQ0FBZ3pILE9BQWh6SCxFQUF3ekgsSUFBeHpILGdDQUE2ekgsT0FBN3pILEVBQXEwSCxJQUFyMEgsZ0NBQTAwSCxPQUExMEgsRUFBazFILElBQWwxSCxnQ0FBdTFILE9BQXYxSCxFQUErMUgsSUFBLzFILGdDQUFvMkgsT0FBcDJILEVBQTQySCxJQUE1MkgsZ0NBQWkzSCxPQUFqM0gsRUFBeTNILElBQXozSCxnQ0FBODNILE9BQTkzSCxFQUFzNEgsSUFBdDRILGdDQUEyNEgsT0FBMzRILEVBQW01SCxJQUFuNUgsZ0NBQXc1SCxPQUF4NUgsRUFBZzZILElBQWg2SCxnQ0FBcTZILE9BQXI2SCxFQUE2NkgsSUFBNzZILGdDQUFrN0gsT0FBbDdILEVBQTA3SCxJQUExN0gsZ0NBQSs3SCxPQUEvN0gsRUFBdThILElBQXY4SCxnQ0FBNDhILE9BQTU4SCxFQUFvOUgsSUFBcDlILGdDQUF5OUgsT0FBejlILEVBQWkrSCxJQUFqK0gsZ0NBQXMrSCxPQUF0K0gsRUFBOCtILElBQTkrSCxnQ0FBbS9ILE9BQW4vSCxFQUEyL0gsSUFBMy9ILGdDQUFnZ0ksT0FBaGdJLEVBQXdnSSxJQUF4Z0ksZ0NBQTZnSSxPQUE3Z0ksRUFBcWhJLEdBQXJoSSxnQ0FBeWhJLE9BQXpoSSxFQUFpaUksSUFBamlJLGdDQUFzaUksT0FBdGlJLEVBQThpSSxJQUE5aUksZ0NBQW1qSSxPQUFuakksRUFBMmpJLElBQTNqSSxnQ0FBZ2tJLE9BQWhrSSxFQUF3a0ksSUFBeGtJLGdDQUE2a0ksT0FBN2tJLEVBQXFsSSxJQUFybEksZ0NBQTBsSSxPQUExbEksRUFBa21JLElBQWxtSSxnQ0FBdW1JLE9BQXZtSSxFQUErbUksSUFBL21JLGdDQUFvbkksT0FBcG5JLEVBQTRuSSxJQUE1bkksZ0NBQWlvSSxPQUFqb0ksRUFBeW9JLEtBQXpvSSxnQ0FBK29JLE9BQS9vSSxFQUF1cEksSUFBdnBJLGdDQUE0cEksT0FBNXBJLEVBQW9xSSxJQUFwcUksZ0NBQXlxSSxPQUF6cUksRUFBaXJJLElBQWpySSxnQ0FBc3JJLE9BQXRySSxFQUE4ckksSUFBOXJJLGdDQUFtc0ksT0FBbnNJLEVBQTJzSSxJQUEzc0ksZ0NBQWd0SSxPQUFodEksRUFBd3RJLElBQXh0SSxnQ0FBNnRJLE9BQTd0SSxFQUFxdUksSUFBcnVJLGdDQUEwdUksT0FBMXVJLEVBQWt2SSxJQUFsdkksZ0NBQXV2SSxPQUF2dkksRUFBK3ZJLElBQS92SSxnQ0FBb3dJLE9BQXB3SSxFQUE0d0ksSUFBNXdJLGdDQUFpeEksT0FBanhJLEVBQXl4SSxJQUF6eEksZ0NBQTh4SSxPQUE5eEksRUFBc3lJLElBQXR5SSxnQ0FBMnlJLE9BQTN5SSxFQUFtekksSUFBbnpJLGdDQUF3ekksT0FBeHpJLEVBQWcwSSxJQUFoMEksZ0NBQXEwSSxPQUFyMEksRUFBNjBJLEtBQTcwSSxnQ0FBbTFJLE9BQW4xSSxFQUEyMUksSUFBMzFJLGdDQUFnMkksT0FBaDJJLEVBQXcySSxJQUF4MkksZ0NBQTYySSxPQUE3MkksRUFBcTNJLElBQXIzSSxnQ0FBMDNJLE9BQTEzSSxFQUFrNEksSUFBbDRJLGdDQUF1NEksT0FBdjRJLEVBQSs0SSxJQUEvNEksZ0NBQW81SSxPQUFwNUksRUFBNDVJLElBQTU1SSxnQ0FBaTZJLE9BQWo2SSxFQUF5NkksSUFBejZJLGdDQUE4NkksT0FBOTZJLEVBQXM3SSxJQUF0N0ksZ0NBQTI3SSxPQUEzN0ksRUFBbThJLElBQW44SSxnQ0FBdzhJLE9BQXg4SSxFQUFnOUksSUFBaDlJLGdDQUFxOUksT0FBcjlJLEVBQTY5SSxJQUE3OUksZ0NBQWsrSSxPQUFsK0ksRUFBMCtJLElBQTErSSxnQ0FBKytJLE9BQS8rSSxFQUF1L0ksSUFBdi9JLGdDQUE0L0ksT0FBNS9JLEVBQW9nSixJQUFwZ0osZ0NBQXlnSixPQUF6Z0osRUFBaWhKLElBQWpoSixnQ0FBc2hKLE9BQXRoSixFQUE4aEosSUFBOWhKLGdDQUFtaUosT0FBbmlKLEVBQTJpSixJQUEzaUosZ0NBQWdqSixPQUFoakosRUFBd2pKLElBQXhqSixnQ0FBNmpKLE9BQTdqSixFQUFxa0osSUFBcmtKLGdDQUEwa0osT0FBMWtKLEVBQWtsSixJQUFsbEosZ0NBQXVsSixPQUF2bEosRUFBK2xKLElBQS9sSixnQ0FBb21KLE9BQXBtSixFQUE0bUosSUFBNW1KLGdDQUFpbkosT0FBam5KLEVBQXluSixJQUF6bkosZ0NBQThuSixPQUE5bkosRUFBc29KLElBQXRvSixnQ0FBMm9KLE9BQTNvSixFQUFtcEosS0FBbnBKLGdDQUF5cEosT0FBenBKLEVBQWlxSixJQUFqcUosZ0NBQXNxSixPQUF0cUosRUFBOHFKLElBQTlxSixnQ0FBbXJKLE9BQW5ySixFQUEyckosSUFBM3JKLGdDQUFnc0osT0FBaHNKLEVBQXdzSixJQUF4c0osZ0NBQTZzSixPQUE3c0osRUFBcXRKLElBQXJ0SixnQ0FBMHRKLE9BQTF0SixFQUFrdUosSUFBbHVKLGdDQUF1dUosT0FBdnVKLEVBQSt1SixJQUEvdUosZ0NBQW92SixPQUFwdkosRUFBNHZKLElBQTV2SixnQ0FBaXdKLE9BQWp3SixFQUF5d0osS0FBendKLGVBQWQsQ0FIWSxDQUlYO0FBQ0E7O0FBQ0EsV0FBU0MsTUFBVCxDQUFnQkMsR0FBaEIsRUFBcUI7QUFDakIsUUFBSSxPQUFRQSxHQUFSLElBQWdCLFFBQXBCLEVBQ0ksTUFBTSxJQUFJN00sS0FBSixDQUFVLENBQUMsQ0FBWCxFQUFjLG9CQUFkLENBQU47QUFDSixRQUFJOE0sU0FBUyxHQUFHLElBQUluRCxLQUFKLEVBQWhCLENBSGlCLENBR1k7O0FBQzdCLFNBQUssSUFBSW9ELENBQUMsR0FBRyxDQUFSLEVBQVdDLEdBQUcsR0FBR0gsR0FBRyxDQUFDaE4sTUFBMUIsRUFBa0NrTixDQUFDLEdBQUdDLEdBQXRDLEVBQTJDRCxDQUFDLEVBQTVDLEVBQWdEO0FBQzVDO0FBQ0EsVUFBSUUsRUFBRSxHQUFHSixHQUFHLENBQUNLLE1BQUosQ0FBV0gsQ0FBWCxDQUFULENBRjRDLENBRzVDOztBQUNBRCxNQUFBQSxTQUFTLENBQUNuRSxJQUFWLENBQWV3RSxPQUFPLENBQUNGLEVBQUQsQ0FBdEI7QUFDSCxLQVRnQixDQVVqQjs7O0FBQ0EsV0FBT0csTUFBTSxDQUFDTixTQUFELENBQWI7QUFDSDs7QUFFRCxXQUFTSyxPQUFULENBQWlCRixFQUFqQixFQUFxQjtBQUNqQixRQUFJSSxHQUFHLEdBQUdKLEVBQUUsQ0FBQ0ssVUFBSCxDQUFjLENBQWQsQ0FBVixDQURpQixDQUVqQjs7QUFDQSxRQUFJRCxHQUFHLEdBQUcsS0FBTixJQUFlQSxHQUFHLEdBQUcsS0FBekIsRUFDSSxPQUFPSixFQUFQLENBSmEsQ0FJRjtBQUNmOztBQUNBLFdBQVFOLFVBQVUsQ0FBQ1UsR0FBRCxDQUFWLEdBQWtCVixVQUFVLENBQUNVLEdBQUQsQ0FBNUIsR0FBcUNYLGlCQUFpQixDQUFDUSxNQUFsQixDQUF5QkcsR0FBRyxHQUFHLEtBQS9CLENBQTdDO0FBQ0g7O0FBRUQsV0FBU0QsTUFBVCxDQUFnQnJDLEdBQWhCLEVBQXFCO0FBQ2pCLFFBQUl3QyxPQUFPLEdBQUcsQ0FBQyxFQUFELENBQWQ7O0FBQ0EsU0FBSyxJQUFJUixDQUFDLEdBQUcsQ0FBUixFQUFXQyxHQUFHLEdBQUdqQyxHQUFHLENBQUNsTCxNQUExQixFQUFrQ2tOLENBQUMsR0FBR0MsR0FBdEMsRUFBMkNELENBQUMsRUFBNUMsRUFBZ0Q7QUFDNUMsVUFBSUYsR0FBRyxHQUFHOUIsR0FBRyxDQUFDZ0MsQ0FBRCxDQUFiO0FBQ0EsVUFBSVMsTUFBTSxHQUFHWCxHQUFHLENBQUNoTixNQUFqQjs7QUFDQSxVQUFJMk4sTUFBTSxJQUFJLENBQWQsRUFBaUI7QUFDYixhQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLE9BQU8sQ0FBQzFOLE1BQTVCLEVBQW9DNE4sQ0FBQyxFQUFyQyxFQUF5QztBQUNyQ0YsVUFBQUEsT0FBTyxDQUFDRSxDQUFELENBQVAsSUFBY1osR0FBZDtBQUNIO0FBQ0osT0FKRCxNQUlPO0FBQ0gsWUFBSWEsTUFBTSxHQUFHSCxPQUFPLENBQUMzRCxLQUFSLENBQWMsQ0FBZCxDQUFiO0FBQ0EyRCxRQUFBQSxPQUFPLEdBQUcsRUFBVjs7QUFDQSxhQUFLRSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdELE1BQWhCLEVBQXdCQyxDQUFDLEVBQXpCLEVBQTZCO0FBQ3pCO0FBQ0EsY0FBSUUsR0FBRyxHQUFHRCxNQUFNLENBQUM5RCxLQUFQLENBQWEsQ0FBYixDQUFWLENBRnlCLENBR3pCOztBQUNBLGVBQUssSUFBSWdFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELEdBQUcsQ0FBQzlOLE1BQXhCLEVBQWdDK04sQ0FBQyxFQUFqQyxFQUFxQztBQUNqQ0QsWUFBQUEsR0FBRyxDQUFDQyxDQUFELENBQUgsSUFBVWYsR0FBRyxDQUFDSyxNQUFKLENBQVdPLENBQVgsQ0FBVjtBQUNILFdBTndCLENBT3pCOzs7QUFDQUYsVUFBQUEsT0FBTyxHQUFHQSxPQUFPLENBQUNNLE1BQVIsQ0FBZUYsR0FBZixDQUFWO0FBQ0g7QUFDSjtBQUNKOztBQUNELFdBQU9KLE9BQVA7QUFDSCxHQXREVSxDQXdEWDs7O0FBQ0FPLEVBQUFBLE1BQU0sQ0FBQzlLLFNBQVAsQ0FBaUIrSyxJQUFqQixHQUF3QixZQUFZO0FBQ2hDLFdBQU8sS0FBS0MsT0FBTCxDQUFhLGdCQUFiLEVBQStCLEVBQS9CLENBQVA7QUFDSCxHQUZEOztBQUtBLE1BQUlDLE1BQU0sR0FBRyxFQUFiO0FBQ0FBLEVBQUFBLE1BQU0sQ0FBQ3JCLE1BQVAsR0FBZ0JBLE1BQWhCLENBL0RXLENBa0VYO0FBQ0E7O0FBQ0EsTUFBSXNCLE9BQU8sR0FBRzVLLEtBQUssQ0FBQzRLLE9BQXBCO0FBQUEsTUFDSUMsR0FBRyxHQUFHak4sTUFEVjtBQUFBLE1BRUlrTixHQUFHLEdBQUdDLFFBRlY7O0FBSUEsV0FBU0MsT0FBVCxHQUFtQjtBQUNmLFFBQUk1TixLQUFLLEdBQUd3RCxLQUFLLENBQUMyQyxJQUFOLENBQVcsQ0FBWCxFQUFjO0FBQ3RCeEMsTUFBQUEsS0FBSyxFQUFFLENBQUMsR0FBRCxFQUFNLE1BQU4sQ0FEZSxDQUNEOztBQURDLEtBQWQsQ0FBWjtBQUtBLFdBQU8sWUFBVTtBQUNiSCxNQUFBQSxLQUFLLENBQUNpQixLQUFOLENBQVl6RSxLQUFaO0FBQ0gsS0FGRDtBQUdIOztBQUVELE1BQUk2TixVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFVbkQsR0FBVixFQUFldk4sT0FBZixFQUF3QjtBQUNyQyxRQUFJOEYsS0FBSyxHQUFHLElBQVo7O0FBQ0EsUUFBSTZLLFNBQVMsR0FBRztBQUNacEgsTUFBQUEsR0FBRyxFQUFFLElBRE87QUFFWnFILE1BQUFBLGFBQWEsRUFBRSxJQUZIO0FBR1pqSCxNQUFBQSxhQUFhLEVBQUUsSUFISDtBQUlaeUMsTUFBQUEsUUFBUSxFQUFFLGtCQUFVekMsYUFBVixFQUF5QjtBQUMvQixZQUFJa0gsUUFBUSxHQUFHLEtBQUtsSCxhQUFMLENBQW1CbUgsT0FBbkIsQ0FBMkJDLFVBQTFDOztBQUNBLFlBQUcsQ0FBQ0YsUUFBSixFQUFhO0FBQ1RBLFVBQUFBLFFBQVEsR0FBQyxFQUFUO0FBQ0FsTSxVQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxNQUFkO0FBQ0g7O0FBQ0QsWUFBSW9NLFNBQVMsR0FBRyxLQUFLQyxPQUFMLENBQWFKLFFBQWIsQ0FBaEI7QUFDQSxZQUFJOUssSUFBSSxHQUFHLEtBQUttTCxJQUFoQjtBQUNBLFlBQUlDLEdBQUcsR0FDSHRSLENBQUMseU9BTWlCa0csSUFBSSxDQUFDcUwsSUFBTCxJQUFXLEtBQVgsSUFBa0IsVUFObkMsOG9FQW1EQ0osU0FuREQsbWNBREw7QUFzRUEsZUFBT0csR0FBUDtBQUNILE9BbkZXO0FBb0ZaRixNQUFBQSxPQUFPLEVBQUUsaUJBQVVGLFVBQVYsRUFBc0I7QUFDM0IsWUFBSWpMLEtBQUssR0FBRyxJQUFaOztBQUNBLFlBQUl5SCxHQUFHLEdBQUcsRUFBVixDQUYyQixDQUczQjs7QUFDQSxZQUFHLENBQUN3RCxVQUFVLENBQUMsQ0FBRCxDQUFkLEVBQWtCO0FBQ2RBLFVBQUFBLFVBQVUsQ0FBQyxDQUFELENBQVYsR0FBYyxFQUFkO0FBQ0FwTSxVQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxRQUFkO0FBQ0g7O0FBQ0RtTSxRQUFBQSxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNNLE1BQWQsQ0FBcUIsVUFBVTNNLElBQVYsRUFBZ0I7QUFDakMsY0FBSUEsSUFBSSxDQUFDNE0sWUFBTCxLQUFzQixHQUExQixFQUFnQztBQUM1QjtBQUNBL0QsWUFBQUEsR0FBRyxnRUFDcUI3SSxJQUFJLENBQUN2RSxFQUQxQixzQkFDd0N1RSxJQUFJLENBQUM2TSxNQUQ3QyxzSEFHa0I3TSxJQUFJLENBQUM4TSxTQUh2Qiw4SEFLc0MsQ0FBQzlNLElBQUksQ0FBQytNLElBQU4sR0FBVyxjQUFYLEdBQTBCL00sSUFBSSxDQUFDZ04sSUFMckUsZ0JBSzhFaE4sSUFBSSxDQUFDTyxJQUxuRiwwSEFBSDtBQVNIO0FBQ0osU0FiRDtBQWNBLGVBQU9zSSxHQUFQO0FBQ0gsT0EzR1c7QUE0R1pvRSxNQUFBQSxpQkFBaUIsRUFBRSwyQkFBVXBFLEdBQVYsRUFBZXpNLElBQWYsRUFBcUI7QUFDcEMsWUFBSWdGLEtBQUssR0FBRyxJQUFaOztBQUNBLFlBQUk4TCxLQUFLLEdBQUcvUixDQUFDLDZHQUFiLENBRm9DLENBSXBDOztBQUNBQSxRQUFBQSxDQUFDLENBQUNpRyxLQUFLLENBQUM4SyxhQUFOLENBQW9CLENBQXBCLENBQUQsQ0FBRCxDQUEwQnRMLElBQTFCLENBQStCLGdCQUEvQixFQUFpRHNHLElBQWpELENBQXNELEVBQXRELEVBQTBEekksTUFBMUQsQ0FBaUUyQyxLQUFLLENBQUNtTCxPQUFOLENBQWNuUSxJQUFkLENBQWpFO0FBQ0FBLFFBQUFBLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUU8sT0FBUixDQUFnQixVQUFVcUQsSUFBVixFQUFnQm1OLEtBQWhCLEVBQXVCO0FBQ25DLGNBQUl0RSxHQUFHLHlDQUFnQzdJLElBQUksQ0FBQzZNLE1BQXJDLHdCQUF3RCxDQUFDN00sSUFBSSxDQUFDK00sSUFBTixHQUFXLGNBQVgsR0FBMEIvTSxJQUFJLENBQUNnTixJQUF2Rix3QkFBd0doTixJQUFJLENBQUM2TSxNQUE3RywyQkFBb0k3TSxJQUFJLENBQUM0TSxZQUF6SSxtQ0FBNEs1TSxJQUFJLENBQUNPLElBQWpMLFNBQVA7QUFFQW5FLFVBQUFBLElBQUksQ0FBQzRELElBQUksQ0FBQzZNLE1BQU4sQ0FBSixJQUFxQnpRLElBQUksQ0FBQzRELElBQUksQ0FBQzZNLE1BQU4sQ0FBSixDQUFrQmxRLE9BQWxCLENBQTBCLFVBQVV5USxLQUFWLEVBQWlCO0FBRTVEdkUsWUFBQUEsR0FBRyw2RkFDMkJ1RSxLQUFLLENBQUNKLElBQU4sSUFBYyxjQUR6QyxvRUFFNEJJLEtBQUssQ0FBQ1AsTUFGbEMseUVBR2lDTyxLQUFLLENBQUNSLFlBSHZDLGlFQUl5QlEsS0FBSyxDQUFDTCxJQUovQixpSkFNb0JLLEtBQUssQ0FBQzdNLElBTjFCLHVGQUFIOztBQVVBLGdCQUFJbkUsSUFBSSxDQUFDZ1IsS0FBSyxDQUFDUCxNQUFQLENBQVIsRUFBd0I7QUFDcEJ6USxjQUFBQSxJQUFJLENBQUNnUixLQUFLLENBQUNQLE1BQVAsQ0FBSixDQUFtQmxRLE9BQW5CLENBQTJCLFVBQVUwUSxLQUFWLEVBQWlCO0FBQ3hDeEUsZ0JBQUFBLEdBQUcsa0dBQ3dCd0UsS0FBSyxDQUFDTCxJQUFOLElBQWMsY0FEdEMsMEVBRXlCSyxLQUFLLENBQUNSLE1BRi9CLCtFQUc4QlEsS0FBSyxDQUFDVCxZQUhwQyxzRUFJc0JTLEtBQUssQ0FBQ04sSUFKNUIsb0VBS21CTSxLQUFLLENBQUM5TSxJQUx6Qix3SEFBSDtBQVFILGVBVEQ7QUFXSDtBQUNKLFdBekJvQixDQUFyQjtBQTBCQXNJLFVBQUFBLEdBQUcsWUFBSDs7QUFDQSxjQUFJc0UsS0FBSyxHQUFHLENBQVIsS0FBYyxDQUFsQixFQUFxQjtBQUNqQkQsWUFBQUEsS0FBSyxDQUFDck0sRUFBTixDQUFTLENBQVQsRUFBWXBDLE1BQVosQ0FBbUJvSyxHQUFuQjtBQUNILFdBRkQsTUFFTyxJQUFJc0UsS0FBSyxHQUFHLENBQVIsS0FBYyxDQUFsQixFQUFxQjtBQUN4QkQsWUFBQUEsS0FBSyxDQUFDck0sRUFBTixDQUFTLENBQVQsRUFBWXBDLE1BQVosQ0FBbUJvSyxHQUFuQjtBQUNILFdBRk0sTUFFQSxJQUFJc0UsS0FBSyxHQUFHLENBQVIsS0FBYyxDQUFsQixFQUFxQjtBQUN4QkQsWUFBQUEsS0FBSyxDQUFDck0sRUFBTixDQUFTLENBQVQsRUFBWXBDLE1BQVosQ0FBbUJvSyxHQUFuQjtBQUNIO0FBQ0osU0FyQ0Q7QUFzQ0FxRSxRQUFBQSxLQUFLLENBQUN0TSxJQUFOLENBQVcsNEJBQVgsRUFBeUMwTSxJQUF6QztBQUNBekUsUUFBQUEsR0FBRyxDQUFDcEssTUFBSixDQUFXeU8sS0FBWDtBQUVILE9BM0pXO0FBNEpaSyxNQUFBQSxVQUFVLEVBQUUsb0JBQVVuQixPQUFWLEVBQW1CO0FBQzNCLFlBQUloTCxLQUFLLEdBQUcsSUFBWjs7QUFDQSxZQUFJb00sSUFBSSxHQUFHcE0sS0FBSyxDQUFDeUQsR0FBTixDQUFVNEksYUFBckI7QUFBQSxZQUNJQyxXQUFXLEdBQUd0QixPQUFPLENBQUNDLFVBRDFCO0FBRUEsWUFBSXNCLFNBQVMsR0FBR3hTLENBQUMsQ0FBQ2lHLEtBQUssQ0FBQzhLLGFBQU4sQ0FBb0IsQ0FBcEIsQ0FBRCxDQUFELENBQTBCdEwsSUFBMUIsQ0FBK0IsWUFBL0IsQ0FBaEI7O0FBQ0FRLFFBQUFBLEtBQUssQ0FBQzZMLGlCQUFOLENBQXdCTyxJQUF4QixFQUE4QkUsV0FBOUI7O0FBRUEsWUFBSUUsS0FBSyxHQUFHLElBQUlDLE1BQUosQ0FBVyxvQkFBWCxFQUFpQyxHQUFqQyxDQUFaO0FBQ0ExUyxRQUFBQSxDQUFDLENBQUNpRyxLQUFLLENBQUM4SyxhQUFOLENBQW9CLENBQXBCLENBQUQsQ0FBRCxDQUEwQnRMLElBQTFCLENBQStCLGNBQS9CLEVBQStDa04sS0FBL0MsQ0FBcUQsVUFBVTlQLENBQVYsRUFBYTtBQUM5RCxjQUFJcEIsR0FBRyxHQUFHekIsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFReUIsR0FBUixFQUFWO0FBQ0FBLFVBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDbVIsV0FBSixFQUFOOztBQUNBLGNBQUksQ0FBQ25SLEdBQUwsRUFBVTtBQUNOO0FBQ0F6QixZQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVE2UyxJQUFSLENBQWEsYUFBYixFQUE0QlYsSUFBNUI7QUFDQUUsWUFBQUEsSUFBSSxDQUFDUyxJQUFMO0FBQ0FOLFlBQUFBLFNBQVMsQ0FBQ3pHLElBQVYsQ0FBZSxFQUFmLEVBQW1Cb0csSUFBbkI7QUFDQSxtQkFMTSxDQUtFO0FBQ1g7O0FBQ0RuUyxVQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVE2UyxJQUFSLENBQWEsYUFBYixFQUE0QkMsSUFBNUIsR0FBbUNyTixJQUFuQyxDQUF3QyxRQUF4QyxFQUFrRDFELElBQWxELENBQXVETixHQUF2RDtBQUNBNFEsVUFBQUEsSUFBSSxDQUFDRixJQUFMO0FBQ0EsY0FBSXpFLEdBQUcsR0FBRyxFQUFWOztBQUNBLGVBQUssSUFBSXFGLEdBQVQsSUFBZ0I5QixPQUFPLENBQUMrQixNQUF4QixFQUFnQztBQUM1QixnQkFBSW5PLElBQUksR0FBR29NLE9BQU8sQ0FBQytCLE1BQVIsQ0FBZUQsR0FBZixDQUFYO0FBQ0EsZ0JBQUk1RCxHQUFHLEdBQUdzRCxLQUFLLENBQUNRLElBQU4sQ0FBV3hSLEdBQVgsSUFBa0JvRCxJQUFJLENBQUNPLElBQUwsQ0FBVW1HLE9BQVYsQ0FBa0I5SixHQUFsQixDQUFsQixHQUEyQ29ELElBQUksQ0FBQ3FPLE9BQUwsQ0FBYTNILE9BQWIsQ0FBcUI5SixHQUFyQixDQUFyRDs7QUFDQSxnQkFBSTBOLEdBQUcsSUFBSSxDQUFQLElBQVl0SyxJQUFJLENBQUMrTSxJQUFyQixFQUEyQjtBQUN2QmxFLGNBQUFBLEdBQUcsbU9BR3VCN0ksSUFBSSxDQUFDZ04sSUFBTCxJQUFhLGNBSHBDLDhEQUlnQmhOLElBQUksQ0FBQ08sSUFKckIscU1BQUg7QUFTSDtBQUNKOztBQUNEaU4sVUFBQUEsSUFBSSxDQUFDRixJQUFMO0FBQ0FLLFVBQUFBLFNBQVMsQ0FBQ3pHLElBQVYsQ0FBZSxFQUFmLEVBQW1CK0csSUFBbkIsR0FBMEJ4UCxNQUExQixDQUFpQ29LLEdBQWpDO0FBRUgsU0EvQkQ7QUFnQ0gsT0FwTVc7QUFzTVo7QUFDQXlGLE1BQUFBLFVBQVUsRUFBRSxvQkFBVTNPLEdBQVYsRUFBZTtBQUN2QixZQUFJeUIsS0FBSyxHQUFHLElBQVo7O0FBQ0EsWUFBSW9NLElBQUksR0FBR3BNLEtBQUssQ0FBQ3lELEdBQU4sQ0FBVTRJLGFBQVYsQ0FBd0I3TSxJQUF4QixDQUE2QixZQUE3QixDQUFYOztBQUNBakIsUUFBQUEsR0FBRyxHQUFHLEVBQU47QUFDQTZOLFFBQUFBLElBQUksQ0FBQ2xNLElBQUwsQ0FBVSxVQUFVbkQsS0FBVixFQUFpQjZCLElBQWpCLEVBQXVCO0FBQzdCLGNBQUlrTyxHQUFHLEdBQUdsTyxJQUFJLENBQUN2RSxFQUFmO0FBQ0FrRSxVQUFBQSxHQUFHLENBQUN1TyxHQUFELENBQUgsR0FBV0ssUUFBUSxDQUFDdk8sSUFBSSxDQUFDd08sU0FBTixDQUFuQjtBQUNILFNBSEQ7QUFJQSxlQUFPN08sR0FBUDtBQUNILE9BaE5XO0FBaU5aOE8sTUFBQUEsZUFBZSxFQUFFLDJCQUFZO0FBQ3pCLFlBQUlyTixLQUFLLEdBQUcsSUFBWjtBQUFBLFlBQ0lvTSxJQUFJLEdBQUdwTSxLQUFLLENBQUN5RCxHQUFOLENBQVU0SSxhQURyQjtBQUFBLFlBRUl0QixRQUFRLEdBQUcvSyxLQUFLLENBQUM2RCxhQUFOLENBQW9CbUgsT0FGbkM7QUFBQSxZQUdJc0IsV0FBVyxHQUFHdkIsUUFBUSxDQUFDRSxVQUgzQjs7QUFJQWpMLFFBQUFBLEtBQUssQ0FBQ3lELEdBQU4sSUFBYSxLQUFLQSxHQUFMLENBQVM2SixVQUFULENBQW9CQyxXQUFwQixDQUFnQyxVQUFoQyxDQUFiO0FBRUgsT0F4Tlc7QUEwTlpDLE1BQUFBLFVBQVUsRUFBRSxvQkFBVUMsUUFBVixFQUFvQjtBQUM1QixZQUFJek4sS0FBSyxHQUFHLElBQVo7O0FBQ0EsWUFBSTBOLEtBQUo7QUFDQSxZQUFJQyxPQUFPLEdBQUczTixLQUFLLENBQUN5RCxHQUFOLENBQVVrSyxPQUF4QixDQUg0QixDQUdJOztBQUVoQyxZQUFJNUMsUUFBUSxHQUFHL0ssS0FBSyxDQUFDNkQsYUFBTixDQUFvQm1ILE9BQW5DLENBTDRCLENBTzVCOztBQUNBaEwsUUFBQUEsS0FBSyxDQUFDeUQsR0FBTixDQUFVa0ssT0FBVixDQUFrQnJSLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLEdBQTlCLEVBQW1DLFVBQVVNLENBQVYsRUFBYTtBQUM1Q0EsVUFBQUEsQ0FBQyxDQUFDZ1IsZUFBRixHQUQ0QyxDQUN2Qjs7QUFDckJoUixVQUFBQSxDQUFDLENBQUNpUixjQUFGO0FBQ0FILFVBQUFBLEtBQUssR0FBRzNULENBQUMsQ0FBQyxJQUFELENBQVQsQ0FINEMsQ0FHNUI7O0FBQ2hCLGNBQUkrVCxHQUFHLEdBQUdKLEtBQUssQ0FBQ3BULElBQU4sQ0FBVyxTQUFYLENBQVY7O0FBQ0EwRixVQUFBQSxLQUFLLENBQUN5RCxHQUFOLENBQVU0SSxhQUFWLENBQXdCN00sSUFBeEIsQ0FBNkIsZ0JBQWdCc08sR0FBaEIsR0FBc0IsSUFBbkQsRUFBeUQxSCxPQUF6RCxDQUFpRSxPQUFqRTtBQUVILFNBUEQsRUFSNEIsQ0FnQjVCOzs7QUFDQXBHLFFBQUFBLEtBQUssQ0FBQ3lELEdBQU4sQ0FBVTRJLGFBQVYsQ0FBd0IvUCxFQUF4QixDQUEyQixPQUEzQixFQUFvQyxHQUFwQyxFQUF5QyxVQUFVTSxDQUFWLEVBQWE7QUFDbERBLFVBQUFBLENBQUMsQ0FBQ2dSLGVBQUYsR0FEa0QsQ0FDN0I7O0FBQ3JCaFIsVUFBQUEsQ0FBQyxDQUFDaVIsY0FBRjtBQUNBSCxVQUFBQSxLQUFLLEdBQUczVCxDQUFDLENBQUMsSUFBRCxDQUFUO0FBQ0EsY0FBSStULEdBQUcsR0FBRy9ULENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLFNBQWIsQ0FBVjtBQUNBLGNBQUl5VCxZQUFZLEdBQUdKLE9BQU8sQ0FBQ25PLElBQVIsQ0FBYSxnQkFBZ0JzTyxHQUFoQixHQUFzQixJQUFuQyxDQUFuQjtBQUFBLGNBQ0k7QUFDQUUsVUFBQUEsY0FBYyxHQUFHRCxZQUFZLENBQUNFLE1BQWIsRUFGckI7QUFBQSxjQUU0QztBQUN4Q0MsVUFBQUEsYUFBYSxHQUFHSCxZQUFZLENBQUNsSixRQUFiLENBQXNCLFlBQXRCLENBSHBCO0FBQUEsY0FJSXNKLFlBQVksR0FBRztBQUNmQyxZQUFBQSxVQUFVLEVBQUVyRCxRQUFRLENBQUNnQyxNQUFULENBQWdCZSxHQUFoQjtBQURHLFdBSm5CO0FBT0EsY0FBSU8sR0FBRyxHQUFDWCxLQUFLLENBQUNZLE9BQU4sQ0FBYyxZQUFkLEVBQTRCaFUsSUFBNUIsQ0FBaUMsSUFBakMsQ0FBUjtBQUFBLGNBQ0lxUixJQUFJLEdBQUVaLFFBQVEsQ0FBQ2dDLE1BQVQsQ0FBZ0JlLEdBQWhCLEVBQXFCbkMsSUFEL0I7QUFBQSxjQUVJNEMsSUFBSSxHQUFHYixLQUFLLENBQUNwVCxJQUFOLENBQVcsTUFBWCxDQUZYLENBWmtELENBZTlDOztBQUNBb1QsVUFBQUEsS0FBSyxDQUFDWSxPQUFOLENBQWMsVUFBZCxFQUEwQjlPLElBQTFCLENBQStCLG9DQUFrQzZPLEdBQWxDLEdBQXNDLEtBQXJFLEVBQTRFakksT0FBNUUsQ0FBb0YsT0FBcEY7O0FBQ0FwRyxVQUFBQSxLQUFLLENBQUN3TyxlQUFOLENBQXNCSCxHQUF0QixFQUEyQlAsR0FBM0I7O0FBRUosY0FBR25DLElBQUgsRUFBUTtBQUNKM0wsWUFBQUEsS0FBSyxDQUFDeUQsR0FBTixDQUFVNkosVUFBVixDQUFxQjlOLElBQXJCLENBQTBCLFdBQTFCLEVBQXVDbEYsSUFBdkMsQ0FBNEMsV0FBNUMsRUFBeUQsRUFBekQ7O0FBQ0EwRixZQUFBQSxLQUFLLENBQUNxTixlQUFOO0FBQ0g7O0FBQ0RJLFVBQUFBLFFBQVEsSUFBSUEsUUFBUSxDQUFDVSxZQUFELEVBQWV2UixDQUFmLENBQXBCO0FBSUgsU0EzQkQ7QUE0QkgsT0F2UVc7QUF3UVo2UixNQUFBQSxZQUFZLEVBQUUsd0JBQVk7QUFDdEIsWUFBSXpPLEtBQUssR0FBRyxJQUFaOztBQUNBakcsUUFBQUEsQ0FBQyxDQUFDMlEsUUFBRCxDQUFELENBQVlwTyxFQUFaLENBQWUsT0FBZixFQUF3QixZQUFZO0FBQ2hDMEQsVUFBQUEsS0FBSyxDQUFDeUQsR0FBTixDQUFVNkosVUFBVixDQUFxQm9CLFFBQXJCLENBQThCLFVBQTlCLEtBQTZDMU8sS0FBSyxDQUFDcU4sZUFBTixFQUE3QztBQUNILFNBRkQsRUFGc0IsQ0FLdEI7O0FBQ0FyTixRQUFBQSxLQUFLLENBQUN5RCxHQUFOLENBQVVxSCxhQUFWLENBQXdCdEwsSUFBeEIsQ0FBNkIsZ0JBQTdCLEVBQStDbVAsS0FBL0MsQ0FBcUQsVUFBVXBQLEtBQVYsRUFBaUI7QUFDbEUsY0FBSXhGLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTJVLFFBQVIsQ0FBaUIseUJBQWpCLENBQUosRUFBaUQ7QUFDN0MzVSxZQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVF3VCxXQUFSLENBQW9CLHlCQUFwQixFQUErQ3FCLFFBQS9DLENBQXdELHdCQUF4RDtBQUNBN1UsWUFBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVNlUsUUFBVixDQUFtQixnQkFBbkI7QUFFSCxXQUpELE1BSU87QUFDSDdVLFlBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXdULFdBQVIsQ0FBb0Isd0JBQXBCLEVBQThDcUIsUUFBOUMsQ0FBdUQseUJBQXZEO0FBQ0E3VSxZQUFBQSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVV3VCxXQUFWLENBQXNCLGdCQUF0QjtBQUVIO0FBRUosU0FYRDs7QUFZQXZOLFFBQUFBLEtBQUssQ0FBQ3lELEdBQU4sQ0FBVTZKLFVBQVYsQ0FBcUI5TixJQUFyQixDQUEwQixXQUExQixFQUF1Q3FQLEtBQXZDLENBQTZDLFVBQVV0UCxLQUFWLEVBQWlCO0FBQzFEUyxVQUFBQSxLQUFLLENBQUNxTixlQUFOOztBQUNBLGNBQUdyTixLQUFLLENBQUN5RCxHQUFOLENBQVVrSyxPQUFWLENBQWtCbk8sSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNkJ0RCxNQUE3QixHQUFvQyxDQUF2QyxFQUF5QztBQUNyQ25DLFlBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLFdBQWIsRUFBMEIsWUFBMUI7QUFDSDs7QUFDRDtBQUVILFNBUEQsRUFPRyxZQUFZO0FBRVhQLFVBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLFdBQWIsRUFBMEIsRUFBMUI7QUFFSCxTQVhEOztBQWFBMEYsUUFBQUEsS0FBSyxDQUFDeUQsR0FBTixDQUFVNkosVUFBVixDQUFxQmhSLEVBQXJCLENBQXdCLE9BQXhCLEVBQWlDLDBCQUFqQyxFQUE2RCxVQUFVTSxDQUFWLEVBQWE7QUFDdEVBLFVBQUFBLENBQUMsQ0FBQ2dSLGVBQUYsR0FEc0UsQ0FDakQ7O0FBQ3JCaFIsVUFBQUEsQ0FBQyxDQUFDaVIsY0FBRjtBQUNBLGNBQUlpQixHQUFHLEdBQUdsUyxDQUFDLENBQUNtUyxNQUFaOztBQUNBLGtCQUFRaFYsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTyxJQUFSLENBQWEsT0FBYixDQUFSO0FBQ0ksaUJBQUssYUFBTDtBQUNJMEYsY0FBQUEsS0FBSyxDQUFDeUQsR0FBTixDQUFVNkosVUFBVixDQUFxQjBCLFdBQXJCLENBQWlDLFVBQWpDOztBQUNBOztBQUNKLGlCQUFLLFNBQUw7QUFDSSxrQkFBR2pWLENBQUMsQ0FBQytVLEdBQUQsQ0FBRCxDQUFPUixPQUFQLENBQWUsVUFBZixFQUEyQnBTLE1BQTNCLEdBQWtDLENBQWxDLElBQXFDNFMsR0FBRyxDQUFDeEcsUUFBSixJQUFjLEdBQXRELEVBQTJEOztBQUMzRCxrQkFBSXdHLEdBQUcsQ0FBQ0csVUFBSixDQUFleEksU0FBZixJQUE0QixvQkFBaEMsRUFBcUQ7QUFDakR6RyxnQkFBQUEsS0FBSyxDQUFDcU4sZUFBTjs7QUFDQztBQUVKOztBQUVELGtCQUFJNkIsT0FBTyxHQUFHbFAsS0FBSyxDQUFDa04sVUFBTixFQUFkOztBQUNBLGtCQUFJaUMsS0FBSyxHQUFHcFYsQ0FBQyxDQUFDK1UsR0FBRCxDQUFELENBQU9SLE9BQVAsQ0FBZSxTQUFmLENBQVo7QUFDQSxrQkFBSWMsUUFBUSxHQUFHRCxLQUFLLENBQUM3VSxJQUFOLENBQVcsU0FBWCxDQUFmO0FBQUEsa0JBQ0k4UixJQUFJLEdBQUdyUyxDQUFDLENBQUMsb0JBQUQsQ0FBRCxDQUF3QnlGLElBQXhCLENBQTZCLFlBQTdCLENBRFg7QUFFQTJQLGNBQUFBLEtBQUssQ0FBQ1AsUUFBTixDQUFlLFFBQWYsRUFDSy9KLFFBREwsR0FFSzBJLFdBRkwsQ0FFaUIsUUFGakI7QUFLRG5CLGNBQUFBLElBQUksQ0FBQ2xNLElBQUwsQ0FBVSxZQUFZO0FBQ2pCbkcsZ0JBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxDQUFSLEVBQVdNLEVBQVgsSUFBaUIrVSxRQUFqQixHQUE0QnJWLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTZVLFFBQVIsQ0FBaUIsUUFBakIsQ0FBNUIsR0FBeUQ3VSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVF3VCxXQUFSLENBQW9CLFFBQXBCLENBQXpEO0FBRUgsZUFIRjs7QUFJQyxtQkFBSyxJQUFJVCxHQUFULElBQWdCb0MsT0FBaEIsRUFBeUI7QUFDckIsb0JBQUtwQyxHQUFELElBQVNzQyxRQUFiLEVBQXVCO0FBQ25CclYsa0JBQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBY3NWLE9BQWQsQ0FBc0I7QUFDbEJDLG9CQUFBQSxTQUFTLEVBQUVKLE9BQU8sQ0FBQ3BDLEdBQUQ7QUFEQSxtQkFBdEI7QUFHSDtBQUNKOztBQUVEOztBQUVKLGlCQUFLLFVBQUw7QUFBc0I7QUFFbEIsa0JBQUl3QixPQUFPLEdBQUd2VSxDQUFDLENBQUMrVSxHQUFELENBQUQsQ0FBT1IsT0FBUCxDQUFlLFNBQWYsQ0FBZDtBQUFBLGtCQUNJaUIsTUFBTSxHQUFHakIsT0FBTyxDQUFDaFUsSUFBUixDQUFhLFNBQWIsQ0FEYjtBQUVJLGtCQUFHLENBQUNpVixNQUFKLEVBQVk7QUFDWixrQkFBSTVELElBQUksR0FBQzZELE9BQU8sQ0FBQ3hQLEtBQUssQ0FBQzZELGFBQU4sQ0FBb0JtSCxPQUFwQixDQUE0QitCLE1BQTVCLENBQW1Dd0MsTUFBbkMsRUFBMkM1RCxJQUE1QyxDQUFoQjs7QUFFQTNMLGNBQUFBLEtBQUssQ0FBQ3lELEdBQU4sQ0FBVTZKLFVBQVYsQ0FBcUI5TixJQUFyQixDQUEwQixXQUExQixFQUF1Q2xGLElBQXZDLENBQTRDLFdBQTVDLEVBQXlELEVBQXpEOztBQUNBMEYsY0FBQUEsS0FBSyxDQUFDcU4sZUFBTjs7QUFDQSxrQkFBR3RULENBQUMsQ0FBQytVLEdBQUQsQ0FBRCxDQUFPUixPQUFQLENBQWUsVUFBZixFQUEyQnBTLE1BQTNCLEdBQWtDLENBQXJDLEVBQXVDO0FBQ25DOEQsZ0JBQUFBLEtBQUssQ0FBQ3lELEdBQU4sQ0FBVTRJLGFBQVYsQ0FBd0I3TSxJQUF4QixDQUE2QixnQkFBZStQLE1BQWYsR0FBd0IsSUFBckQsRUFBMkRuSixPQUEzRCxDQUFtRSxPQUFuRTtBQUNIOztBQUNELGtCQUFHdUYsSUFBSCxFQUFRO0FBQ0o7QUFDSDs7QUFBQTtBQUVEOEQsY0FBQUEsVUFBVSxDQUFDLFlBQVk7QUFDbkJ6UCxnQkFBQUEsS0FBSyxDQUFDeUQsR0FBTixDQUFVNkosVUFBVixDQUFxQjlOLElBQXJCLENBQTBCLFdBQTFCLEVBQXVDbEYsSUFBdkMsQ0FBNEMsV0FBNUMsRUFBeUQsWUFBekQ7QUFDSCxlQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0Y7O0FBRU47QUFDSSxxQkFBTyxLQUFQO0FBekRSO0FBOERILFNBbEVEOztBQW1FQSxZQUFJb1YsUUFBUSxHQUFHLEVBQWY7QUFFSCxPQTVXVztBQTZXWmxCLE1BQUFBLGVBQWUsRUFBRSx5QkFBVUgsR0FBVixFQUFlUCxHQUFmLEVBQW9CO0FBQ2pDLFlBQUk5TixLQUFLLEdBQUcsSUFBWjtBQUFBLFlBQ0lxTyxHQUFHLEdBQUdBLEdBRFY7QUFBQSxZQUVJc0IsTUFBTSxHQUFHNVYsQ0FBQyxDQUFDLGNBQWNzVSxHQUFkLEdBQW9CLEdBQXJCLENBRmQ7O0FBR0lzQixRQUFBQSxNQUFNLENBQUNmLFFBQVAsQ0FBZ0IsUUFBaEIsRUFBMEIvSixRQUExQixHQUFxQzBJLFdBQXJDLENBQWlELFFBQWpEO0FBRUosWUFBSXhDLFFBQVEsR0FBRy9LLEtBQUssQ0FBQzZELGFBQU4sQ0FBb0JtSCxPQUFuQzs7QUFDQWhMLFFBQUFBLEtBQUssQ0FBQ3lELEdBQU4sQ0FBVWtLLE9BQVYsQ0FBa0JsSSxLQUFsQjs7QUFFQSxZQUFJNEksR0FBSixFQUFTO0FBQ0wsY0FBR3RELFFBQVEsQ0FBQ2dDLE1BQVQsQ0FBZ0JzQixHQUFoQixFQUFxQjFDLElBQXJCLElBQTJCWixRQUFRLENBQUNnQyxNQUFULENBQWdCZSxHQUFoQixFQUFxQnRDLFlBQXJCLElBQW1DLENBQWpFLEVBQW1FO0FBQy9EO0FBQ0g7O0FBRUQsY0FBSVAsVUFBVSxHQUFHRixRQUFRLENBQUNFLFVBQTFCO0FBRUFBLFVBQUFBLFVBQVUsQ0FBQ29ELEdBQUQsQ0FBVixJQUFtQnBELFVBQVUsQ0FBQ29ELEdBQUQsQ0FBVixDQUFnQjlTLE9BQWhCLENBQXdCLFVBQVVxRCxJQUFWLEVBQWdCO0FBQ3ZELGdCQUFJZ1IsUUFBUSxHQUFDLGFBQWI7O0FBQ0EsZ0JBQUk5QixHQUFKLEVBQVM7QUFDTCxrQkFBSWxQLElBQUksQ0FBQzZNLE1BQUwsSUFBZXFDLEdBQW5CLEVBQXVCO0FBQ25COEIsZ0JBQUFBLFFBQVEsR0FBQyxpQ0FBVDtBQUNIO0FBQ0o7O0FBQUE7QUFFRCxnQkFBSUMsR0FBRyxHQUFHOVYsQ0FBQyxDQUFDLE1BQUQsRUFBUztBQUNoQix1QkFBUTZWO0FBRFEsYUFBVCxDQUFYO0FBSUEsZ0JBQUlFLEVBQUUsR0FBRy9WLENBQUMsQ0FBQyxLQUFELEVBQVE7QUFDZCxzQkFBUTZFLElBQUksQ0FBQ2dOLElBQUwsSUFBYSxjQURQO0FBRWQseUJBQVdoTixJQUFJLENBQUM2TSxNQUZGO0FBR2Qsc0JBQVE3TSxJQUFJLENBQUMrTSxJQUhDO0FBSWQsdUJBQVMvTSxJQUFJLENBQUNtUixLQUpBO0FBS2Qsb0JBQU1uUixJQUFJLENBQUN2RSxFQUxHO0FBTWQsOEJBQWdCdUUsSUFBSSxDQUFDNE07QUFOUCxhQUFSLENBQUQsQ0FPTjFQLElBUE0sQ0FPRDhDLElBQUksQ0FBQ08sSUFQSixDQUFUO0FBU0EwUSxZQUFBQSxHQUFHLENBQUN4UyxNQUFKLENBQVd5UyxFQUFYOztBQUNBLGdCQUFJLENBQUNsUixJQUFJLENBQUMrTSxJQUFOLElBQWNWLFVBQVUsQ0FBQ3JNLElBQUksQ0FBQzRNLFlBQU4sQ0FBeEIsSUFBK0NQLFVBQVUsQ0FBQ3JNLElBQUksQ0FBQzRNLFlBQU4sQ0FBVixDQUE4QnRQLE1BQTlCLEdBQXVDLENBQTFGLEVBQTZGO0FBQ3pGLGtCQUFJOFQsUUFBUSxHQUFHLHdCQUFmO0FBQ0EvRSxjQUFBQSxVQUFVLENBQUNyTSxJQUFJLENBQUM2TSxNQUFOLENBQVYsSUFBMkJSLFVBQVUsQ0FBQ3JNLElBQUksQ0FBQzZNLE1BQU4sQ0FBVixDQUF3QmxRLE9BQXhCLENBQWdDLFVBQVV5USxLQUFWLEVBQWlCO0FBQ3hFZ0UsZ0JBQUFBLFFBQVEseUJBQW1CbEMsR0FBRyxJQUFJOUIsS0FBSyxDQUFDUCxNQUFOLElBQWdCcUMsR0FBeEIsR0FBK0IsYUFBL0IsR0FBK0MsRUFBakUsdUJBQWdGOUIsS0FBSyxDQUFDSixJQUFOLElBQWMsY0FBOUYsbUJBQXFISSxLQUFLLENBQUNMLElBQTNILHdCQUM5Qi9NLElBQUksQ0FBQzRNLFlBRHlCLDJCQUNJUSxLQUFLLENBQUNSLFlBRFYsc0JBQ2tDUSxLQUFLLENBQUNQLE1BRHhDLGNBQ2tETyxLQUFLLENBQUM3TSxJQUR4RCxjQUFSO0FBRUgsZUFIMEIsQ0FBM0I7QUFJQTZRLGNBQUFBLFFBQVEsSUFBSSxPQUFaO0FBQ0FGLGNBQUFBLEVBQUUsQ0FBQ3pTLE1BQUg7QUFDQXdTLGNBQUFBLEdBQUcsQ0FBQ3hTLE1BQUosQ0FBVzJTLFFBQVg7O0FBQ0Esa0JBQUlsQyxHQUFKLEVBQVM7QUFDTCtCLGdCQUFBQSxHQUFHLENBQUNyUSxJQUFKLENBQVMsSUFBVCxFQUFlVSxJQUFmLENBQW9CLFVBQVVuRCxLQUFWLEVBQWlCNkIsSUFBakIsRUFBdUI7QUFDdkMsc0JBQUk3RSxDQUFDLENBQUM2RSxJQUFELENBQUQsQ0FBUXRFLElBQVIsQ0FBYSxPQUFiLEtBQXlCLGFBQTdCLEVBQTRDO0FBQ3hDdVYsb0JBQUFBLEdBQUcsQ0FBQ2pCLFFBQUosQ0FBYSxhQUFiLEVBQTRCQSxRQUE1QixDQUFxQyxTQUFyQztBQUNBLDJCQUFPaUIsR0FBRyxDQUFDclEsSUFBSixDQUFTLFlBQVQsRUFBdUJxTixJQUF2QixFQUFQO0FBQ0g7QUFDSixpQkFMRDtBQU1IO0FBQ0o7O0FBQ0Q3TSxZQUFBQSxLQUFLLENBQUN5RCxHQUFOLENBQVVrSyxPQUFWLENBQWtCdFEsTUFBbEIsQ0FBeUJ3UyxHQUF6QjtBQUVILFdBMUNrQixDQUFuQjtBQTJDSDs7QUFBQTtBQUNKLE9BemFXO0FBMGFaSSxNQUFBQSxTQUFTLEVBQUUsbUJBQVVwTSxhQUFWLEVBQXlCdUgsSUFBekIsRUFBK0I7QUFDdEMsWUFBSXBMLEtBQUssR0FBRyxJQUFaOztBQUNBQSxRQUFBQSxLQUFLLENBQUM2RCxhQUFOLEdBQXNCQSxhQUF0QjtBQUNBLFlBQUlrSCxRQUFRLEdBQUcvSyxLQUFLLENBQUM2RCxhQUFOLENBQW9CbUgsT0FBbkM7QUFHQWhMLFFBQUFBLEtBQUssQ0FBQ29MLElBQU4sR0FBYUEsSUFBYjtBQUNBcEwsUUFBQUEsS0FBSyxDQUFDOEssYUFBTixHQUFzQjlLLEtBQUssQ0FBQ3NHLFFBQU4sQ0FBZXRHLEtBQWYsQ0FBdEI7QUFDQSxZQUFJQSxLQUFLLENBQUM4SyxhQUFWLEVBQ0k5SyxLQUFLLENBQUN5RCxHQUFOLEdBQVk7QUFDUnFILFVBQUFBLGFBQWEsRUFBRTlLLEtBQUssQ0FBQzhLLGFBRGI7QUFFUndDLFVBQUFBLFVBQVUsRUFBRXROLEtBQUssQ0FBQzhLLGFBQU4sQ0FBb0J0TCxJQUFwQixDQUF5QixhQUF6QixDQUZKO0FBR1JtTyxVQUFBQSxPQUFPLEVBQUUzTixLQUFLLENBQUM4SyxhQUFOLENBQW9CdEwsSUFBcEIsQ0FBeUIsV0FBekIsQ0FIRDtBQUlSNk0sVUFBQUEsYUFBYSxFQUFFck0sS0FBSyxDQUFDOEssYUFBTixDQUFvQnRMLElBQXBCLENBQXlCLG9CQUF6QixDQUpQO0FBS1IwUSxVQUFBQSxNQUFNLEVBQUVsUSxLQUFLLENBQUM4SyxhQUFOLENBQW9CdEwsSUFBcEIsQ0FBeUIsVUFBekIsQ0FMQTtBQU1SMlEsVUFBQUEsTUFBTSxFQUFFcFcsQ0FBQyxDQUFDLHFCQUFELENBTkQ7QUFPUnFXLFVBQUFBLGdCQUFnQixFQUFFcFEsS0FBSyxDQUFDOEssYUFBTixDQUFvQnRMLElBQXBCLENBQXlCLGtCQUF6QjtBQVBWLFNBQVo7O0FBU0pRLFFBQUFBLEtBQUssQ0FBQ21NLFVBQU4sQ0FBaUJwQixRQUFqQixFQWxCc0MsQ0FtQnRDOzs7QUFDQS9LLFFBQUFBLEtBQUssQ0FBQ3lPLFlBQU47O0FBQ0EsZUFBT3pPLEtBQUssQ0FBQzhLLGFBQWI7QUFDSDtBQWhjVyxLQUFoQjs7QUFtY0EsUUFBSXVGLE1BQU0sR0FBRyxTQUFUQSxNQUFTLEdBQVk7QUFDckIsYUFBT3hGLFNBQVA7QUFDSCxLQUZEOztBQUdBN0ssSUFBQUEsS0FBSyxDQUFDcVEsTUFBTixHQUFlQSxNQUFNLEVBQXJCO0FBQ0EsUUFBSTNWLE1BQU0sR0FBQztBQUNQcUcsTUFBQUEsR0FBRyxFQUFDLElBREc7QUFFUHVQLE1BQUFBLEtBQUssRUFBQyxLQUZDO0FBR1BDLE1BQUFBLFNBQVMsRUFBQyxJQUhILENBTVg7O0FBTlcsS0FBWDs7QUFPQSxRQUFJMUksU0FBUyxDQUFDM0wsTUFBVixJQUFvQixDQUF4QixFQUEyQjtBQUN2QjhELE1BQUFBLEtBQUssQ0FBQzlGLE9BQU4sR0FBZ0IyTixTQUFTLENBQUMsQ0FBRCxDQUF6QjtBQUNBN0gsTUFBQUEsS0FBSyxDQUFDOUYsT0FBTixHQUFnQkgsQ0FBQyxDQUFDWSxNQUFGLENBQVMsSUFBVCxFQUFlRCxNQUFmLEVBQXVCc0YsS0FBSyxDQUFDOUYsT0FBN0IsQ0FBaEI7O0FBQ0E4RixNQUFBQSxLQUFLLENBQUMyRSxJQUFOLENBQVczRSxLQUFLLENBQUM5RixPQUFqQjtBQUVILEtBTEQsTUFLTyxJQUFJMk4sU0FBUyxDQUFDM0wsTUFBVixJQUFvQixDQUF4QixFQUEyQjtBQUM5QjhELE1BQUFBLEtBQUssQ0FBQ3lILEdBQU4sR0FBWUksU0FBUyxDQUFDLENBQUQsQ0FBckI7QUFDQTdILE1BQUFBLEtBQUssQ0FBQzlGLE9BQU4sR0FBZ0IyTixTQUFTLENBQUMsQ0FBRCxDQUF6QjtBQUNBN0gsTUFBQUEsS0FBSyxDQUFDOUYsT0FBTixHQUFnQkgsQ0FBQyxDQUFDWSxNQUFGLENBQVMsSUFBVCxFQUFlRCxNQUFmLEVBQXVCc0YsS0FBSyxDQUFDOUYsT0FBN0IsQ0FBaEI7O0FBQ0E4RixNQUFBQSxLQUFLLENBQUMyRSxJQUFOLENBQVczRSxLQUFLLENBQUM5RixPQUFqQjs7QUFFQThGLE1BQUFBLEtBQUssQ0FBQ3pGLFFBQU4sQ0FBZXlGLEtBQUssQ0FBQ3lILEdBQXJCO0FBRUg7QUFFSixHQS9kRDs7QUFrZUFtRCxFQUFBQSxVQUFVLENBQUN2TCxTQUFYLENBQXFCM0UsTUFBckIsR0FBOEI7QUFDMUI4VixJQUFBQSxTQUFTLEVBQUUsS0FEZTtBQUUxQnpQLElBQUFBLEdBQUcsRUFBRSxFQUZxQjtBQUcxQnVLLElBQUFBLElBQUksRUFBRTtBQUhvQixHQUE5Qjs7QUFPQVYsRUFBQUEsVUFBVSxDQUFDdkwsU0FBWCxDQUFxQm9SLFVBQXJCLEdBQWtDLFVBQVUxUCxHQUFWLEVBQWU7QUFDN0MsUUFBSTJQLFNBQVMsR0FBQy9GLE9BQU8sRUFBckI7QUFFQSxRQUFJZ0csT0FBSjtBQUFBLFFBQWE1RCxNQUFNLEdBQUcsSUFBdEI7QUFBQSxRQUNJOUIsVUFBVSxHQUFHLElBRGpCOztBQUdBLGFBQVMyRixPQUFULENBQWlCRCxPQUFqQixFQUEwQjtBQUN2Qjs7O0FBR0MsVUFBSTFSLEdBQUcsR0FBRyxFQUFWO0FBRUEwUixNQUFBQSxPQUFPLENBQUNwVixPQUFSLENBQWdCLFVBQVVxRCxJQUFWLEVBQWdCO0FBQzVCLFlBQUlxUCxNQUFNLEdBQUcsRUFBYjs7QUFDQSxZQUFJLENBQUNoUCxHQUFHLENBQUNMLElBQUksQ0FBQzRNLFlBQU4sQ0FBUixFQUE2QjtBQUN6QnZNLFVBQUFBLEdBQUcsQ0FBQ0wsSUFBSSxDQUFDNE0sWUFBTixDQUFILEdBQXlCLEVBQXpCO0FBQ0g7O0FBQ0R2TSxRQUFBQSxHQUFHLENBQUNMLElBQUksQ0FBQzRNLFlBQU4sQ0FBSCxDQUF1QnhHLElBQXZCLENBQTRCcEcsSUFBNUI7QUFFSCxPQVBEO0FBUUEsYUFBT0ssR0FBUDtBQUNIOztBQUVELFFBQUk4TixNQUFNLEdBQUcsRUFBYixDQXZCNkMsQ0F3QmpEOztBQUNJcEosSUFBQUEsTUFBTSxDQUFDa04sUUFBUCxDQUNJO0FBQ0kxUCxNQUFBQSxJQUFJLEVBQUUsS0FEVjtBQUVJSixNQUFBQSxHQUFHLEVBQUVBLEdBRlQ7O0FBR0E7Ozs7O0FBS0lhLE1BQUFBLE9BQU8sRUFBRSxpQkFBVWtQLEdBQVYsRUFBZTtBQUNwQixZQUFJQSxHQUFHLENBQUNsUCxPQUFSLEVBQWlCO0FBQ2IrTyxVQUFBQSxPQUFPLEdBQUdHLEdBQUcsQ0FBQzlWLElBQWQ7QUFDQTJWLFVBQUFBLE9BQU8sQ0FBQ3BWLE9BQVIsQ0FBZ0IsVUFBVXFELElBQVYsRUFBZ0I7QUFDNUJBLFlBQUFBLElBQUksQ0FBQ3FPLE9BQUwsR0FBZTNDLE1BQU0sQ0FBQ3JCLE1BQVAsQ0FBY3JLLElBQUksQ0FBQ08sSUFBbkIsRUFBeUIsQ0FBekIsQ0FBZjtBQUNILFdBRkQ7QUFHQThMLFVBQUFBLFVBQVUsR0FBRzJGLE9BQU8sQ0FBQ0QsT0FBRCxDQUFwQjtBQUNBQSxVQUFBQSxPQUFPLENBQUNwVixPQUFSLENBQWdCLFVBQVVxRCxJQUFWLEVBQWdCO0FBQzVCbU8sWUFBQUEsTUFBTSxDQUFDbk8sSUFBSSxDQUFDNk0sTUFBTixDQUFOLEdBQXNCN00sSUFBdEI7QUFDSCxXQUZEO0FBR0g7QUFHSixPQXJCTDtBQXNCSUUsTUFBQUEsS0FBSyxFQUFFLGVBQVVpUyxHQUFWLEVBQWU7QUFDcEI7QUFDRTtBQUNBeFEsUUFBQUEsS0FBSyxDQUFDK0IsR0FBTixDQUFVLFNBQVY7QUFDSCxPQTFCTDtBQTJCSTBPLE1BQUFBLFFBQVEsRUFBRTtBQTNCZCxLQURKO0FBbUNBTixJQUFBQSxTQUFTO0FBQ1QsV0FBTztBQUNIQyxNQUFBQSxPQUFPLEVBQUVBLE9BRE47QUFFSDVELE1BQUFBLE1BQU0sRUFBRUEsTUFGTDtBQUdIOUIsTUFBQUEsVUFBVSxFQUFFQTtBQUhULEtBQVA7QUFLSCxHQWxFRDtBQXNFSDs7Ozs7Ozs7QUFPR0wsRUFBQUEsVUFBVSxDQUFDdkwsU0FBWCxDQUFxQnNGLElBQXJCLEdBQTRCLFVBQVV6SyxPQUFWLEVBQW1CO0FBQzNDLFFBQUk4RixLQUFLLEdBQUcsSUFBWjs7QUFDQSxRQUFJaVIsTUFBTSxHQUFHLEtBQUtaLE1BQWxCOztBQUNBLFFBQUksUUFBT3JRLEtBQUssQ0FBQzlGLE9BQWIsTUFBeUIsUUFBN0IsRUFBdUM7QUFDbkM4RixNQUFBQSxLQUFLLENBQUNDLElBQU4sR0FBYWxHLENBQUMsQ0FBQ1ksTUFBRixDQUFTLElBQVQsRUFBZXFGLEtBQUssQ0FBQ3RGLE1BQXJCLEVBQTZCc0YsS0FBSyxDQUFDOUYsT0FBbkMsQ0FBYjs7QUFDQSxVQUFJOEYsS0FBSyxDQUFDQyxJQUFOLENBQVdjLEdBQVgsSUFBa0IsRUFBdEIsRUFBMEI7QUFDdEJmLFFBQUFBLEtBQUssQ0FBQ2dMLE9BQU4sR0FBZ0JoTCxLQUFLLENBQUN5USxVQUFOLENBQWlCelEsS0FBSyxDQUFDQyxJQUFOLENBQVdjLEdBQTVCLENBQWhCO0FBQ0FmLFFBQUFBLEtBQUssQ0FBQytILFVBQU4sR0FBbUJrSixNQUFNLENBQUNoQixTQUFQLENBQWlCalEsS0FBakIsRUFBd0JBLEtBQUssQ0FBQ0MsSUFBOUIsQ0FBbkI7O0FBRUEsWUFBSSxPQUFPRCxLQUFLLENBQUNDLElBQU4sQ0FBV3NRLFNBQWxCLEtBQWdDLFVBQXBDLEVBQWdEO0FBQzVDVSxVQUFBQSxNQUFNLENBQUN6RCxVQUFQLENBQWtCeE4sS0FBSyxDQUFDQyxJQUFOLENBQVdzUSxTQUE3QjtBQUVILFNBSEQsTUFHTztBQUNIVSxVQUFBQSxNQUFNLENBQUN6RCxVQUFQO0FBQ0g7QUFHSjtBQUVKOztBQUVELFdBQU8sSUFBUDtBQUdILEdBeEJELENBem9CVyxDQWtxQlg7OztBQUNBNUMsRUFBQUEsVUFBVSxDQUFDdkwsU0FBWCxDQUFxQjlFLFFBQXJCLEdBQWdDLFVBQVUyVyxLQUFWLEVBQWlCO0FBRTdDLFFBQUlwRyxhQUFhLEdBQUcsS0FBS3VGLE1BQUwsQ0FBWXZGLGFBQWhDO0FBQ0EvUSxJQUFBQSxDQUFDLENBQUMsTUFBTW1YLEtBQVAsQ0FBRCxDQUFlN1QsTUFBZixDQUFzQnlOLGFBQXRCOztBQUVBLFFBQUksS0FBSzdLLElBQUwsQ0FBVXVRLFNBQWQsRUFBeUI7QUFDckIsVUFBSWpCLE1BQU0sR0FBR3hWLENBQUMsQ0FBQyxNQUFNbVgsS0FBUCxDQUFELENBQWUxUixJQUFmLENBQW9CLHlCQUFwQixFQUErQ29QLFFBQS9DLENBQXdELFFBQXhELEVBQWtFdFUsSUFBbEUsQ0FBdUUsU0FBdkUsQ0FBYjtBQUNBLFdBQUsrVixNQUFMLENBQVk3QixlQUFaLENBQTRCZSxNQUE1QjtBQUNIOztBQUNELFdBQU8sSUFBUDtBQUVILEdBWEQ7O0FBY0FoUyxFQUFBQSxNQUFNLENBQUM0VCxnQkFBUCxHQUEwQnZHLFVBQTFCOztBQUVBN1EsRUFBQUEsQ0FBQyxDQUFDQyxFQUFGLENBQUtvWCxvQkFBTCxHQUE0QixVQUFVbFgsT0FBVixFQUFtQjtBQUNwQztBQUVQLFdBQU8sSUFBSTBRLFVBQUosQ0FBZSxJQUFmLEVBQXFCMVEsT0FBckIsQ0FBUDtBQUVILEdBTEQ7QUFRSCxDQTNyQkEsRUEyckJFc0QsTUEzckJGOzs7OztBQ0FEOztBQUNBLENBQUMsVUFBVXpELENBQVYsRUFBYTtBQUFBOztBQUdWLE1BQUlnUCxpQkFBaUIsR0FBRyx3Nm9CQUF4QixDQUhVLENBSVY7O0FBQ0QsTUFBSUMsVUFBVTtBQUFFLGFBQVEsSUFBVjtBQUFlLGFBQVEsSUFBdkI7QUFBNEIsYUFBUSxJQUFwQztBQUF5QyxhQUFRLElBQWpEO0FBQXNELGFBQVEsSUFBOUQ7QUFBbUUsYUFBUSxJQUEzRTtBQUFnRixhQUFRLElBQXhGO0FBQTZGLGFBQVEsSUFBckc7QUFBMEcsYUFBUSxJQUFsSDtBQUF1SCxhQUFRLElBQS9IO0FBQW9JLGFBQVEsSUFBNUk7QUFBaUosYUFBUSxJQUF6SjtBQUE4SixhQUFRLElBQXRLO0FBQTJLLGFBQVEsS0FBbkw7QUFBeUwsYUFBUSxJQUFqTTtBQUFzTSxhQUFRLElBQTlNO0FBQW1OLGFBQVEsSUFBM047QUFBZ08sYUFBUSxJQUF4TztBQUE2TyxhQUFRLElBQXJQO0FBQTBQLGFBQVEsSUFBbFE7QUFBdVEsYUFBUSxJQUEvUTtBQUFvUixhQUFRLElBQTVSO0FBQWlTLGFBQVEsSUFBelM7QUFBOFMsYUFBUSxJQUF0VDtBQUEyVCxhQUFRLElBQW5VO0FBQXdVLGFBQVEsSUFBaFY7QUFBcVYsYUFBUSxJQUE3VjtBQUFrVyxhQUFRO0FBQTFXLDJDQUF1WCxJQUF2WCx5Q0FBb1ksSUFBcFkseUNBQWlaLElBQWpaLHlDQUE4WixJQUE5Wix5Q0FBMmEsSUFBM2EsZ0NBQWdiLE9BQWhiLEVBQXdiLElBQXhiLGdDQUE2YixPQUE3YixFQUFxYyxJQUFyYyxnQ0FBMGMsT0FBMWMsRUFBa2QsSUFBbGQsZ0NBQXVkLE9BQXZkLEVBQStkLElBQS9kLGdDQUFvZSxPQUFwZSxFQUE0ZSxJQUE1ZSxnQ0FBaWYsT0FBamYsRUFBeWYsSUFBemYsZ0NBQThmLE9BQTlmLEVBQXNnQixJQUF0Z0IsZ0NBQTJnQixPQUEzZ0IsRUFBbWhCLElBQW5oQixnQ0FBd2hCLE9BQXhoQixFQUFnaUIsSUFBaGlCLGdDQUFxaUIsT0FBcmlCLEVBQTZpQixJQUE3aUIsZ0NBQWtqQixPQUFsakIsRUFBMGpCLElBQTFqQixnQ0FBK2pCLE9BQS9qQixFQUF1a0IsS0FBdmtCLGdDQUE2a0IsT0FBN2tCLEVBQXFsQixJQUFybEIsZ0NBQTBsQixPQUExbEIsRUFBa21CLElBQWxtQixnQ0FBdW1CLE9BQXZtQixFQUErbUIsSUFBL21CLGdDQUFvbkIsT0FBcG5CLEVBQTRuQixJQUE1bkIsZ0NBQWlvQixPQUFqb0IsRUFBeW9CLElBQXpvQixnQ0FBOG9CLE9BQTlvQixFQUFzcEIsSUFBdHBCLGdDQUEycEIsT0FBM3BCLEVBQW1xQixJQUFucUIsZ0NBQXdxQixPQUF4cUIsRUFBZ3JCLElBQWhyQixnQ0FBcXJCLE9BQXJyQixFQUE2ckIsSUFBN3JCLGdDQUFrc0IsT0FBbHNCLEVBQTBzQixJQUExc0IsZ0NBQStzQixPQUEvc0IsRUFBdXRCLElBQXZ0QixnQ0FBNHRCLE9BQTV0QixFQUFvdUIsSUFBcHVCLGdDQUF5dUIsT0FBenVCLEVBQWl2QixJQUFqdkIsZ0NBQXN2QixPQUF0dkIsRUFBOHZCLElBQTl2QixnQ0FBbXdCLE9BQW53QixFQUEyd0IsSUFBM3dCLGdDQUFneEIsT0FBaHhCLEVBQXd4QixHQUF4eEIsZ0NBQTR4QixPQUE1eEIsRUFBb3lCLElBQXB5QixnQ0FBeXlCLE9BQXp5QixFQUFpekIsSUFBanpCLGdDQUFzekIsT0FBdHpCLEVBQTh6QixHQUE5ekIsZ0NBQWswQixPQUFsMEIsRUFBMDBCLElBQTEwQixnQ0FBKzBCLE9BQS8wQixFQUF1MUIsS0FBdjFCLGdDQUE2MUIsT0FBNzFCLEVBQXEyQixJQUFyMkIsZ0NBQTAyQixPQUExMkIsRUFBazNCLElBQWwzQixnQ0FBdTNCLE9BQXYzQixFQUErM0IsS0FBLzNCLGdDQUFxNEIsT0FBcjRCLEVBQTY0QixJQUE3NEIsZ0NBQWs1QixPQUFsNUIsRUFBMDVCLEdBQTE1QixnQ0FBODVCLE9BQTk1QixFQUFzNkIsSUFBdDZCLGdDQUEyNkIsT0FBMzZCLEVBQW03QixLQUFuN0IsZ0NBQXk3QixPQUF6N0IsRUFBaThCLEdBQWo4QixnQ0FBcThCLE9BQXI4QixFQUE2OEIsSUFBNzhCLGdDQUFrOUIsT0FBbDlCLEVBQTA5QixJQUExOUIsZ0NBQSs5QixPQUEvOUIsRUFBdStCLEdBQXYrQixnQ0FBMitCLE9BQTMrQixFQUFtL0IsSUFBbi9CLGdDQUF3L0IsT0FBeC9CLEVBQWdnQyxJQUFoZ0MsZ0NBQXFnQyxPQUFyZ0MsRUFBNmdDLElBQTdnQyxnQ0FBa2hDLE9BQWxoQyxFQUEwaEMsSUFBMWhDLGdDQUEraEMsT0FBL2hDLEVBQXVpQyxJQUF2aUMsZ0NBQTRpQyxPQUE1aUMsRUFBb2pDLElBQXBqQyxnQ0FBeWpDLE9BQXpqQyxFQUFpa0MsSUFBamtDLGdDQUFza0MsT0FBdGtDLEVBQThrQyxHQUE5a0MsZ0NBQWtsQyxPQUFsbEMsRUFBMGxDLElBQTFsQyxnQ0FBK2xDLE9BQS9sQyxFQUF1bUMsSUFBdm1DLGdDQUE0bUMsT0FBNW1DLEVBQW9uQyxJQUFwbkMsZ0NBQXluQyxPQUF6bkMsRUFBaW9DLElBQWpvQyxnQ0FBc29DLE9BQXRvQyxFQUE4b0MsSUFBOW9DLGdDQUFtcEMsT0FBbnBDLEVBQTJwQyxJQUEzcEMsZ0NBQWdxQyxPQUFocUMsRUFBd3FDLElBQXhxQyxnQ0FBNnFDLE9BQTdxQyxFQUFxckMsSUFBcnJDLGdDQUEwckMsT0FBMXJDLEVBQWtzQyxJQUFsc0MsZ0NBQXVzQyxPQUF2c0MsRUFBK3NDLElBQS9zQyxnQ0FBb3RDLE9BQXB0QyxFQUE0dEMsSUFBNXRDLGdDQUFpdUMsT0FBanVDLEVBQXl1QyxJQUF6dUMsZ0NBQTh1QyxPQUE5dUMsRUFBc3ZDLElBQXR2QyxnQ0FBMnZDLE9BQTN2QyxFQUFtd0MsSUFBbndDLGdDQUF3d0MsT0FBeHdDLEVBQWd4QyxJQUFoeEMsZ0NBQXF4QyxPQUFyeEMsRUFBNnhDLElBQTd4QyxnQ0FBa3lDLE9BQWx5QyxFQUEweUMsSUFBMXlDLGdDQUEreUMsT0FBL3lDLEVBQXV6QyxJQUF2ekMsZ0NBQTR6QyxPQUE1ekMsRUFBbzBDLElBQXAwQyxnQ0FBeTBDLE9BQXowQyxFQUFpMUMsSUFBajFDLGdDQUFzMUMsT0FBdDFDLEVBQTgxQyxJQUE5MUMsZ0NBQW0yQyxPQUFuMkMsRUFBMjJDLElBQTMyQyxnQ0FBZzNDLE9BQWgzQyxFQUF3M0MsSUFBeDNDLGdDQUE2M0MsT0FBNzNDLEVBQXE0QyxJQUFyNEMsZ0NBQTA0QyxPQUExNEMsRUFBazVDLElBQWw1QyxnQ0FBdTVDLE9BQXY1QyxFQUErNUMsSUFBLzVDLGdDQUFvNkMsT0FBcDZDLEVBQTQ2QyxJQUE1NkMsZ0NBQWk3QyxPQUFqN0MsRUFBeTdDLElBQXo3QyxnQ0FBODdDLE9BQTk3QyxFQUFzOEMsSUFBdDhDLGdDQUEyOEMsT0FBMzhDLEVBQW05QyxJQUFuOUMsZ0NBQXc5QyxPQUF4OUMsRUFBZytDLElBQWgrQyxnQ0FBcStDLE9BQXIrQyxFQUE2K0MsSUFBNytDLGdDQUFrL0MsT0FBbC9DLEVBQTAvQyxJQUExL0MsZ0NBQSsvQyxPQUEvL0MsRUFBdWdELElBQXZnRCxnQ0FBNGdELE9BQTVnRCxFQUFvaEQsSUFBcGhELGdDQUF5aEQsT0FBemhELEVBQWlpRCxJQUFqaUQsZ0NBQXNpRCxPQUF0aUQsRUFBOGlELElBQTlpRCxnQ0FBbWpELE9BQW5qRCxFQUEyakQsSUFBM2pELGdDQUFna0QsT0FBaGtELEVBQXdrRCxJQUF4a0QsZ0NBQTZrRCxPQUE3a0QsRUFBcWxELElBQXJsRCxnQ0FBMGxELE9BQTFsRCxFQUFrbUQsSUFBbG1ELGdDQUF1bUQsT0FBdm1ELEVBQSttRCxJQUEvbUQsZ0NBQW9uRCxPQUFwbkQsRUFBNG5ELElBQTVuRCxnQ0FBaW9ELE9BQWpvRCxFQUF5b0QsSUFBem9ELGdDQUE4b0QsT0FBOW9ELEVBQXNwRCxJQUF0cEQsZ0NBQTJwRCxPQUEzcEQsRUFBbXFELElBQW5xRCxnQ0FBd3FELE9BQXhxRCxFQUFnckQsSUFBaHJELGdDQUFxckQsT0FBcnJELEVBQTZyRCxJQUE3ckQsZ0NBQWtzRCxPQUFsc0QsRUFBMHNELElBQTFzRCxnQ0FBK3NELE9BQS9zRCxFQUF1dEQsSUFBdnRELGdDQUE0dEQsT0FBNXRELEVBQW91RCxJQUFwdUQsZ0NBQXl1RCxPQUF6dUQsRUFBaXZELElBQWp2RCxnQ0FBc3ZELE9BQXR2RCxFQUE4dkQsSUFBOXZELGdDQUFtd0QsT0FBbndELEVBQTJ3RCxJQUEzd0QsZ0NBQWd4RCxPQUFoeEQsRUFBd3hELElBQXh4RCxnQ0FBNnhELE9BQTd4RCxFQUFxeUQsSUFBcnlELGdDQUEweUQsT0FBMXlELEVBQWt6RCxJQUFsekQsZ0NBQXV6RCxPQUF2ekQsRUFBK3pELElBQS96RCxnQ0FBbzBELE9BQXAwRCxFQUE0MEQsSUFBNTBELGdDQUFpMUQsT0FBajFELEVBQXkxRCxJQUF6MUQsZ0NBQTgxRCxPQUE5MUQsRUFBczJELElBQXQyRCxnQ0FBMjJELE9BQTMyRCxFQUFtM0QsSUFBbjNELGdDQUF3M0QsT0FBeDNELEVBQWc0RCxJQUFoNEQsZ0NBQXE0RCxPQUFyNEQsRUFBNjRELElBQTc0RCxnQ0FBazVELE9BQWw1RCxFQUEwNUQsSUFBMTVELGdDQUErNUQsT0FBLzVELEVBQXU2RCxJQUF2NkQsZ0NBQTQ2RCxPQUE1NkQsRUFBbzdELElBQXA3RCxnQ0FBeTdELE9BQXo3RCxFQUFpOEQsSUFBajhELGdDQUFzOEQsT0FBdDhELEVBQTg4RCxJQUE5OEQsZ0NBQW05RCxPQUFuOUQsRUFBMjlELElBQTM5RCxnQ0FBZytELE9BQWgrRCxFQUF3K0QsSUFBeCtELGdDQUE2K0QsT0FBNytELEVBQXEvRCxJQUFyL0QsZ0NBQTAvRCxPQUExL0QsRUFBa2dFLEdBQWxnRSxnQ0FBc2dFLE9BQXRnRSxFQUE4Z0UsR0FBOWdFLGdDQUFraEUsT0FBbGhFLEVBQTBoRSxJQUExaEUsZ0NBQStoRSxPQUEvaEUsRUFBdWlFLElBQXZpRSxnQ0FBNGlFLE9BQTVpRSxFQUFvakUsSUFBcGpFLGdDQUF5akUsT0FBempFLEVBQWlrRSxJQUFqa0UsZ0NBQXNrRSxPQUF0a0UsRUFBOGtFLElBQTlrRSxnQ0FBbWxFLE9BQW5sRSxFQUEybEUsSUFBM2xFLGdDQUFnbUUsT0FBaG1FLEVBQXdtRSxJQUF4bUUsZ0NBQTZtRSxPQUE3bUUsRUFBcW5FLElBQXJuRSxnQ0FBMG5FLE9BQTFuRSxFQUFrb0UsSUFBbG9FLGdDQUF1b0UsT0FBdm9FLEVBQStvRSxJQUEvb0UsZ0NBQW9wRSxPQUFwcEUsRUFBNHBFLElBQTVwRSxnQ0FBaXFFLE9BQWpxRSxFQUF5cUUsSUFBenFFLGdDQUE4cUUsT0FBOXFFLEVBQXNyRSxJQUF0ckUsZ0NBQTJyRSxPQUEzckUsRUFBbXNFLElBQW5zRSxnQ0FBd3NFLE9BQXhzRSxFQUFndEUsSUFBaHRFLGdDQUFxdEUsT0FBcnRFLEVBQTZ0RSxJQUE3dEUsZ0NBQWt1RSxPQUFsdUUsRUFBMHVFLElBQTF1RSxnQ0FBK3VFLE9BQS91RSxFQUF1dkUsSUFBdnZFLGdDQUE0dkUsT0FBNXZFLEVBQW93RSxJQUFwd0UsZ0NBQXl3RSxPQUF6d0UsRUFBaXhFLElBQWp4RSxnQ0FBc3hFLE9BQXR4RSxFQUE4eEUsSUFBOXhFLGdDQUFteUUsT0FBbnlFLEVBQTJ5RSxJQUEzeUUsZ0NBQWd6RSxPQUFoekUsRUFBd3pFLElBQXh6RSxnQ0FBNnpFLE9BQTd6RSxFQUFxMEUsSUFBcjBFLGdDQUEwMEUsT0FBMTBFLEVBQWsxRSxJQUFsMUUsZ0NBQXUxRSxPQUF2MUUsRUFBKzFFLElBQS8xRSxnQ0FBbzJFLE9BQXAyRSxFQUE0MkUsSUFBNTJFLGdDQUFpM0UsT0FBajNFLEVBQXkzRSxJQUF6M0UsZ0NBQTgzRSxPQUE5M0UsRUFBczRFLElBQXQ0RSxnQ0FBMjRFLE9BQTM0RSxFQUFtNUUsSUFBbjVFLGdDQUF3NUUsT0FBeDVFLEVBQWc2RSxJQUFoNkUsZ0NBQXE2RSxPQUFyNkUsRUFBNjZFLElBQTc2RSxnQ0FBazdFLE9BQWw3RSxFQUEwN0UsSUFBMTdFLGdDQUErN0UsT0FBLzdFLEVBQXU4RSxJQUF2OEUsZ0NBQTQ4RSxPQUE1OEUsRUFBbzlFLElBQXA5RSxnQ0FBeTlFLE9BQXo5RSxFQUFpK0UsSUFBaitFLGdDQUFzK0UsT0FBdCtFLEVBQTgrRSxJQUE5K0UsZ0NBQW0vRSxPQUFuL0UsRUFBMi9FLElBQTMvRSxnQ0FBZ2dGLE9BQWhnRixFQUF3Z0YsSUFBeGdGLGdDQUE2Z0YsT0FBN2dGLEVBQXFoRixHQUFyaEYsZ0NBQXloRixPQUF6aEYsRUFBaWlGLElBQWppRixnQ0FBc2lGLE9BQXRpRixFQUE4aUYsSUFBOWlGLGdDQUFtakYsT0FBbmpGLEVBQTJqRixJQUEzakYsZ0NBQWdrRixPQUFoa0YsRUFBd2tGLElBQXhrRixnQ0FBNmtGLE9BQTdrRixFQUFxbEYsSUFBcmxGLGdDQUEwbEYsT0FBMWxGLEVBQWttRixJQUFsbUYsZ0NBQXVtRixPQUF2bUYsRUFBK21GLElBQS9tRixnQ0FBb25GLE9BQXBuRixFQUE0bkYsSUFBNW5GLGdDQUFpb0YsT0FBam9GLEVBQXlvRixJQUF6b0YsZ0NBQThvRixPQUE5b0YsRUFBc3BGLElBQXRwRixnQ0FBMnBGLE9BQTNwRixFQUFtcUYsSUFBbnFGLGdDQUF3cUYsT0FBeHFGLEVBQWdyRixJQUFockYsZ0NBQXFyRixPQUFyckYsRUFBNnJGLElBQTdyRixnQ0FBa3NGLE9BQWxzRixFQUEwc0YsSUFBMXNGLGdDQUErc0YsT0FBL3NGLEVBQXV0RixJQUF2dEYsZ0NBQTR0RixPQUE1dEYsRUFBb3VGLElBQXB1RixnQ0FBeXVGLE9BQXp1RixFQUFpdkYsSUFBanZGLGdDQUFzdkYsT0FBdHZGLEVBQTh2RixJQUE5dkYsZ0NBQW13RixPQUFud0YsRUFBMndGLElBQTN3RixnQ0FBZ3hGLE9BQWh4RixFQUF3eEYsSUFBeHhGLGdDQUE2eEYsT0FBN3hGLEVBQXF5RixJQUFyeUYsZ0NBQTB5RixPQUExeUYsRUFBa3pGLElBQWx6RixnQ0FBdXpGLE9BQXZ6RixFQUErekYsSUFBL3pGLGdDQUFvMEYsT0FBcDBGLEVBQTQwRixHQUE1MEYsZ0NBQWcxRixPQUFoMUYsRUFBdzFGLElBQXgxRixnQ0FBNjFGLE9BQTcxRixFQUFxMkYsSUFBcjJGLGdDQUEwMkYsT0FBMTJGLEVBQWszRixJQUFsM0YsZ0NBQXUzRixPQUF2M0YsRUFBKzNGLElBQS8zRixnQ0FBbzRGLE9BQXA0RixFQUE0NEYsSUFBNTRGLGdDQUFpNUYsT0FBajVGLEVBQXk1RixJQUF6NUYsZ0NBQTg1RixPQUE5NUYsRUFBczZGLEtBQXQ2RixnQ0FBNDZGLE9BQTU2RixFQUFvN0YsSUFBcDdGLGdDQUF5N0YsT0FBejdGLEVBQWk4RixJQUFqOEYsZ0NBQXM4RixPQUF0OEYsRUFBODhGLElBQTk4RixnQ0FBbTlGLE9BQW45RixFQUEyOUYsSUFBMzlGLGdDQUFnK0YsT0FBaCtGLEVBQXcrRixJQUF4K0YsZ0NBQTYrRixPQUE3K0YsRUFBcS9GLElBQXIvRixnQ0FBMC9GLE9BQTEvRixFQUFrZ0csS0FBbGdHLGdDQUF3Z0csT0FBeGdHLEVBQWdoRyxJQUFoaEcsZ0NBQXFoRyxPQUFyaEcsRUFBNmhHLElBQTdoRyxnQ0FBa2lHLE9BQWxpRyxFQUEwaUcsSUFBMWlHLGdDQUEraUcsT0FBL2lHLEVBQXVqRyxJQUF2akcsZ0NBQTRqRyxPQUE1akcsRUFBb2tHLElBQXBrRyxnQ0FBeWtHLE9BQXprRyxFQUFpbEcsSUFBamxHLGdDQUFzbEcsT0FBdGxHLEVBQThsRyxJQUE5bEcsZ0NBQW1tRyxPQUFubUcsRUFBMm1HLElBQTNtRyxnQ0FBZ25HLE9BQWhuRyxFQUF3bkcsS0FBeG5HLGdDQUE4bkcsT0FBOW5HLEVBQXNvRyxJQUF0b0csZ0NBQTJvRyxPQUEzb0csRUFBbXBHLElBQW5wRyxnQ0FBd3BHLE9BQXhwRyxFQUFncUcsSUFBaHFHLGdDQUFxcUcsT0FBcnFHLEVBQTZxRyxJQUE3cUcsZ0NBQWtyRyxPQUFsckcsRUFBMHJHLElBQTFyRyxnQ0FBK3JHLE9BQS9yRyxFQUF1c0csSUFBdnNHLGdDQUE0c0csT0FBNXNHLEVBQW90RyxJQUFwdEcsZ0NBQXl0RyxPQUF6dEcsRUFBaXVHLElBQWp1RyxnQ0FBc3VHLE9BQXR1RyxFQUE4dUcsSUFBOXVHLGdDQUFtdkcsT0FBbnZHLEVBQTJ2RyxJQUEzdkcsZ0NBQWd3RyxPQUFod0csRUFBd3dHLElBQXh3RyxnQ0FBNndHLE9BQTd3RyxFQUFxeEcsSUFBcnhHLGdDQUEweEcsT0FBMXhHLEVBQWt5RyxJQUFseUcsZ0NBQXV5RyxPQUF2eUcsRUFBK3lHLElBQS95RyxnQ0FBb3pHLE9BQXB6RyxFQUE0ekcsSUFBNXpHLGdDQUFpMEcsT0FBajBHLEVBQXkwRyxJQUF6MEcsZ0NBQTgwRyxPQUE5MEcsRUFBczFHLEtBQXQxRyxnQ0FBNDFHLE9BQTUxRyxFQUFvMkcsSUFBcDJHLGdDQUF5MkcsT0FBejJHLEVBQWkzRyxJQUFqM0csZ0NBQXMzRyxPQUF0M0csRUFBODNHLElBQTkzRyxnQ0FBbTRHLE9BQW40RyxFQUEyNEcsSUFBMzRHLGdDQUFnNUcsT0FBaDVHLEVBQXc1RyxJQUF4NUcsZ0NBQTY1RyxPQUE3NUcsRUFBcTZHLElBQXI2RyxnQ0FBMDZHLE9BQTE2RyxFQUFrN0csSUFBbDdHLGdDQUF1N0csT0FBdjdHLEVBQSs3RyxJQUEvN0csZ0NBQW84RyxPQUFwOEcsRUFBNDhHLElBQTU4RyxnQ0FBaTlHLE9BQWo5RyxFQUF5OUcsSUFBejlHLGdDQUE4OUcsT0FBOTlHLEVBQXMrRyxJQUF0K0csZ0NBQTIrRyxPQUEzK0csRUFBbS9HLElBQW4vRyxnQ0FBdy9HLE9BQXgvRyxFQUFnZ0gsSUFBaGdILGdDQUFxZ0gsT0FBcmdILEVBQTZnSCxJQUE3Z0gsZ0NBQWtoSCxPQUFsaEgsRUFBMGhILElBQTFoSCxnQ0FBK2hILE9BQS9oSCxFQUF1aUgsSUFBdmlILGdDQUE0aUgsT0FBNWlILEVBQW9qSCxJQUFwakgsZ0NBQXlqSCxPQUF6akgsRUFBaWtILElBQWprSCxnQ0FBc2tILE9BQXRrSCxFQUE4a0gsSUFBOWtILGdDQUFtbEgsT0FBbmxILEVBQTJsSCxJQUEzbEgsZ0NBQWdtSCxPQUFobUgsRUFBd21ILElBQXhtSCxnQ0FBNm1ILE9BQTdtSCxFQUFxbkgsSUFBcm5ILGdDQUEwbkgsT0FBMW5ILEVBQWtvSCxJQUFsb0gsZ0NBQXVvSCxPQUF2b0gsRUFBK29ILElBQS9vSCxnQ0FBb3BILE9BQXBwSCxFQUE0cEgsSUFBNXBILGdDQUFpcUgsT0FBanFILEVBQXlxSCxJQUF6cUgsZ0NBQThxSCxPQUE5cUgsRUFBc3JILElBQXRySCxnQ0FBMnJILE9BQTNySCxFQUFtc0gsSUFBbnNILGdDQUF3c0gsT0FBeHNILEVBQWd0SCxJQUFodEgsZ0NBQXF0SCxPQUFydEgsRUFBNnRILElBQTd0SCxnQ0FBa3VILE9BQWx1SCxFQUEwdUgsSUFBMXVILGdDQUErdUgsT0FBL3VILEVBQXV2SCxJQUF2dkgsZ0NBQTR2SCxPQUE1dkgsRUFBb3dILElBQXB3SCxnQ0FBeXdILE9BQXp3SCxFQUFpeEgsSUFBanhILGdDQUFzeEgsT0FBdHhILEVBQTh4SCxJQUE5eEgsZ0NBQW15SCxPQUFueUgsRUFBMnlILElBQTN5SCxnQ0FBZ3pILE9BQWh6SCxFQUF3ekgsSUFBeHpILGdDQUE2ekgsT0FBN3pILEVBQXEwSCxJQUFyMEgsZ0NBQTAwSCxPQUExMEgsRUFBazFILElBQWwxSCxnQ0FBdTFILE9BQXYxSCxFQUErMUgsSUFBLzFILGdDQUFvMkgsT0FBcDJILEVBQTQySCxJQUE1MkgsZ0NBQWkzSCxPQUFqM0gsRUFBeTNILElBQXozSCxnQ0FBODNILE9BQTkzSCxFQUFzNEgsSUFBdDRILGdDQUEyNEgsT0FBMzRILEVBQW01SCxJQUFuNUgsZ0NBQXc1SCxPQUF4NUgsRUFBZzZILElBQWg2SCxnQ0FBcTZILE9BQXI2SCxFQUE2NkgsSUFBNzZILGdDQUFrN0gsT0FBbDdILEVBQTA3SCxJQUExN0gsZ0NBQSs3SCxPQUEvN0gsRUFBdThILElBQXY4SCxnQ0FBNDhILE9BQTU4SCxFQUFvOUgsSUFBcDlILGdDQUF5OUgsT0FBejlILEVBQWkrSCxJQUFqK0gsZ0NBQXMrSCxPQUF0K0gsRUFBOCtILElBQTkrSCxnQ0FBbS9ILE9BQW4vSCxFQUEyL0gsSUFBMy9ILGdDQUFnZ0ksT0FBaGdJLEVBQXdnSSxJQUF4Z0ksZ0NBQTZnSSxPQUE3Z0ksRUFBcWhJLEdBQXJoSSxnQ0FBeWhJLE9BQXpoSSxFQUFpaUksSUFBamlJLGdDQUFzaUksT0FBdGlJLEVBQThpSSxJQUE5aUksZ0NBQW1qSSxPQUFuakksRUFBMmpJLElBQTNqSSxnQ0FBZ2tJLE9BQWhrSSxFQUF3a0ksSUFBeGtJLGdDQUE2a0ksT0FBN2tJLEVBQXFsSSxJQUFybEksZ0NBQTBsSSxPQUExbEksRUFBa21JLElBQWxtSSxnQ0FBdW1JLE9BQXZtSSxFQUErbUksSUFBL21JLGdDQUFvbkksT0FBcG5JLEVBQTRuSSxJQUE1bkksZ0NBQWlvSSxPQUFqb0ksRUFBeW9JLEtBQXpvSSxnQ0FBK29JLE9BQS9vSSxFQUF1cEksSUFBdnBJLGdDQUE0cEksT0FBNXBJLEVBQW9xSSxJQUFwcUksZ0NBQXlxSSxPQUF6cUksRUFBaXJJLElBQWpySSxnQ0FBc3JJLE9BQXRySSxFQUE4ckksSUFBOXJJLGdDQUFtc0ksT0FBbnNJLEVBQTJzSSxJQUEzc0ksZ0NBQWd0SSxPQUFodEksRUFBd3RJLElBQXh0SSxnQ0FBNnRJLE9BQTd0SSxFQUFxdUksSUFBcnVJLGdDQUEwdUksT0FBMXVJLEVBQWt2SSxJQUFsdkksZ0NBQXV2SSxPQUF2dkksRUFBK3ZJLElBQS92SSxnQ0FBb3dJLE9BQXB3SSxFQUE0d0ksSUFBNXdJLGdDQUFpeEksT0FBanhJLEVBQXl4SSxJQUF6eEksZ0NBQTh4SSxPQUE5eEksRUFBc3lJLElBQXR5SSxnQ0FBMnlJLE9BQTN5SSxFQUFtekksSUFBbnpJLGdDQUF3ekksT0FBeHpJLEVBQWcwSSxJQUFoMEksZ0NBQXEwSSxPQUFyMEksRUFBNjBJLEtBQTcwSSxnQ0FBbTFJLE9BQW4xSSxFQUEyMUksSUFBMzFJLGdDQUFnMkksT0FBaDJJLEVBQXcySSxJQUF4MkksZ0NBQTYySSxPQUE3MkksRUFBcTNJLElBQXIzSSxnQ0FBMDNJLE9BQTEzSSxFQUFrNEksSUFBbDRJLGdDQUF1NEksT0FBdjRJLEVBQSs0SSxJQUEvNEksZ0NBQW81SSxPQUFwNUksRUFBNDVJLElBQTU1SSxnQ0FBaTZJLE9BQWo2SSxFQUF5NkksSUFBejZJLGdDQUE4NkksT0FBOTZJLEVBQXM3SSxJQUF0N0ksZ0NBQTI3SSxPQUEzN0ksRUFBbThJLElBQW44SSxnQ0FBdzhJLE9BQXg4SSxFQUFnOUksSUFBaDlJLGdDQUFxOUksT0FBcjlJLEVBQTY5SSxJQUE3OUksZ0NBQWsrSSxPQUFsK0ksRUFBMCtJLElBQTErSSxnQ0FBKytJLE9BQS8rSSxFQUF1L0ksSUFBdi9JLGdDQUE0L0ksT0FBNS9JLEVBQW9nSixJQUFwZ0osZ0NBQXlnSixPQUF6Z0osRUFBaWhKLElBQWpoSixnQ0FBc2hKLE9BQXRoSixFQUE4aEosSUFBOWhKLGdDQUFtaUosT0FBbmlKLEVBQTJpSixJQUEzaUosZ0NBQWdqSixPQUFoakosRUFBd2pKLElBQXhqSixnQ0FBNmpKLE9BQTdqSixFQUFxa0osSUFBcmtKLGdDQUEwa0osT0FBMWtKLEVBQWtsSixJQUFsbEosZ0NBQXVsSixPQUF2bEosRUFBK2xKLElBQS9sSixnQ0FBb21KLE9BQXBtSixFQUE0bUosSUFBNW1KLGdDQUFpbkosT0FBam5KLEVBQXluSixJQUF6bkosZ0NBQThuSixPQUE5bkosRUFBc29KLElBQXRvSixnQ0FBMm9KLE9BQTNvSixFQUFtcEosS0FBbnBKLGdDQUF5cEosT0FBenBKLEVBQWlxSixJQUFqcUosZ0NBQXNxSixPQUF0cUosRUFBOHFKLElBQTlxSixnQ0FBbXJKLE9BQW5ySixFQUEyckosSUFBM3JKLGdDQUFnc0osT0FBaHNKLEVBQXdzSixJQUF4c0osZ0NBQTZzSixPQUE3c0osRUFBcXRKLElBQXJ0SixnQ0FBMHRKLE9BQTF0SixFQUFrdUosSUFBbHVKLGdDQUF1dUosT0FBdnVKLEVBQSt1SixJQUEvdUosZ0NBQW92SixPQUFwdkosRUFBNHZKLElBQTV2SixnQ0FBaXdKLE9BQWp3SixFQUF5d0osS0FBendKLGVBQWQsQ0FMVyxDQU1WO0FBQ0E7O0FBQ0EsV0FBU0MsTUFBVCxDQUFnQkMsR0FBaEIsRUFBcUI7QUFDakIsUUFBSSxPQUFRQSxHQUFSLElBQWdCLFFBQXBCLEVBQ0ksTUFBTSxJQUFJN00sS0FBSixDQUFVLENBQUMsQ0FBWCxFQUFjLG9CQUFkLENBQU47QUFDSixRQUFJOE0sU0FBUyxHQUFHLElBQUluRCxLQUFKLEVBQWhCLENBSGlCLENBR1k7O0FBQzdCLFNBQUssSUFBSW9ELENBQUMsR0FBRyxDQUFSLEVBQVdDLEdBQUcsR0FBR0gsR0FBRyxDQUFDaE4sTUFBMUIsRUFBa0NrTixDQUFDLEdBQUdDLEdBQXRDLEVBQTJDRCxDQUFDLEVBQTVDLEVBQWdEO0FBQzVDO0FBQ0EsVUFBSUUsRUFBRSxHQUFHSixHQUFHLENBQUNLLE1BQUosQ0FBV0gsQ0FBWCxDQUFULENBRjRDLENBRzVDOztBQUNBRCxNQUFBQSxTQUFTLENBQUNuRSxJQUFWLENBQWV3RSxPQUFPLENBQUNGLEVBQUQsQ0FBdEI7QUFDSCxLQVRnQixDQVVqQjs7O0FBQ0EsV0FBT0csTUFBTSxDQUFDTixTQUFELENBQWI7QUFDSDs7QUFFRCxXQUFTSyxPQUFULENBQWlCRixFQUFqQixFQUFxQjtBQUNqQixRQUFJSSxHQUFHLEdBQUdKLEVBQUUsQ0FBQ0ssVUFBSCxDQUFjLENBQWQsQ0FBVixDQURpQixDQUVqQjs7QUFDQSxRQUFJRCxHQUFHLEdBQUcsS0FBTixJQUFlQSxHQUFHLEdBQUcsS0FBekIsRUFDSSxPQUFPSixFQUFQLENBSmEsQ0FJRjtBQUNmOztBQUNBLFdBQVFOLFVBQVUsQ0FBQ1UsR0FBRCxDQUFWLEdBQWtCVixVQUFVLENBQUNVLEdBQUQsQ0FBNUIsR0FBcUNYLGlCQUFpQixDQUFDUSxNQUFsQixDQUF5QkcsR0FBRyxHQUFHLEtBQS9CLENBQTdDO0FBQ0g7O0FBRUQsV0FBU0QsTUFBVCxDQUFnQnJDLEdBQWhCLEVBQXFCO0FBQ2pCLFFBQUl3QyxPQUFPLEdBQUcsQ0FBQyxFQUFELENBQWQ7O0FBQ0EsU0FBSyxJQUFJUixDQUFDLEdBQUcsQ0FBUixFQUFXQyxHQUFHLEdBQUdqQyxHQUFHLENBQUNsTCxNQUExQixFQUFrQ2tOLENBQUMsR0FBR0MsR0FBdEMsRUFBMkNELENBQUMsRUFBNUMsRUFBZ0Q7QUFDNUMsVUFBSUYsR0FBRyxHQUFHOUIsR0FBRyxDQUFDZ0MsQ0FBRCxDQUFiO0FBQ0EsVUFBSVMsTUFBTSxHQUFHWCxHQUFHLENBQUNoTixNQUFqQjs7QUFDQSxVQUFJMk4sTUFBTSxJQUFJLENBQWQsRUFBaUI7QUFDYixhQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLE9BQU8sQ0FBQzFOLE1BQTVCLEVBQW9DNE4sQ0FBQyxFQUFyQyxFQUF5QztBQUNyQ0YsVUFBQUEsT0FBTyxDQUFDRSxDQUFELENBQVAsSUFBY1osR0FBZDtBQUNIO0FBQ0osT0FKRCxNQUlPO0FBQ0gsWUFBSWEsTUFBTSxHQUFHSCxPQUFPLENBQUMzRCxLQUFSLENBQWMsQ0FBZCxDQUFiO0FBQ0EyRCxRQUFBQSxPQUFPLEdBQUcsRUFBVjs7QUFDQSxhQUFLRSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdELE1BQWhCLEVBQXdCQyxDQUFDLEVBQXpCLEVBQTZCO0FBQ3pCO0FBQ0EsY0FBSUUsR0FBRyxHQUFHRCxNQUFNLENBQUM5RCxLQUFQLENBQWEsQ0FBYixDQUFWLENBRnlCLENBR3pCOztBQUNBLGVBQUssSUFBSWdFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELEdBQUcsQ0FBQzlOLE1BQXhCLEVBQWdDK04sQ0FBQyxFQUFqQyxFQUFxQztBQUNqQ0QsWUFBQUEsR0FBRyxDQUFDQyxDQUFELENBQUgsSUFBVWYsR0FBRyxDQUFDSyxNQUFKLENBQVdPLENBQVgsQ0FBVjtBQUNILFdBTndCLENBT3pCOzs7QUFDQUYsVUFBQUEsT0FBTyxHQUFHQSxPQUFPLENBQUNNLE1BQVIsQ0FBZUYsR0FBZixDQUFWO0FBQ0g7QUFDSjtBQUNKOztBQUNELFdBQU9KLE9BQVA7QUFDSCxHQXhEUyxDQTBEVjs7O0FBQ0FPLEVBQUFBLE1BQU0sQ0FBQzlLLFNBQVAsQ0FBaUIrSyxJQUFqQixHQUF3QixZQUFZO0FBQ2hDLFdBQU8sS0FBS0MsT0FBTCxDQUFhLGdCQUFiLEVBQStCLEVBQS9CLENBQVA7QUFDSCxHQUZEOztBQUtBLE1BQUlDLE1BQU0sR0FBRyxFQUFiO0FBQ0FBLEVBQUFBLE1BQU0sQ0FBQ3JCLE1BQVAsR0FBZ0JBLE1BQWhCO0FBRUEsTUFBSXNCLE9BQU8sR0FBRzVLLEtBQUssQ0FBQzRLLE9BQXBCO0FBQUEsTUFDSUMsR0FBRyxHQUFHak4sTUFEVjtBQUFBLE1BRUlrTixHQUFHLEdBQUdDLFFBRlY7O0FBS0MsV0FBUzJHLFVBQVQsQ0FBb0JoRCxHQUFwQixFQUF3QmlELElBQXhCLEVBQTZCO0FBQ3RCLFdBQU8xVCxNQUFNLENBQUMyVCxNQUFQLENBQWNELElBQWQsRUFBb0IvRixNQUFwQixDQUEyQixVQUFTM00sSUFBVCxFQUFjO0FBQzVDLGFBQU9BLElBQUksQ0FBQzRNLFlBQUwsSUFBbUI2QyxHQUExQjtBQUNILEtBRk0sQ0FBUDtBQUdIOztBQUVMLFdBQVNtRCxvQkFBVCxDQUE4QkMsT0FBOUIsRUFBc0M7QUFDbEMsUUFBSTFVLEtBQUssR0FBQyxDQUFWO0FBQ0EsUUFBSStPLEtBQUssR0FBRy9SLENBQUMsNkdBQWI7QUFFQSxRQUFJMlgsUUFBUSxHQUFFTCxVQUFVLENBQUMsR0FBRCxFQUFLSSxPQUFMLENBQXhCLENBSmtDLENBTWxDOztBQUNBLFFBQUlFLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQVN0RCxHQUFULEVBQWE7QUFDekIsVUFBSW5GLEdBQUcsR0FBQyxFQUFSO0FBQ0EsVUFBSTBJLEtBQUssR0FBQ1AsVUFBVSxDQUFDaEQsR0FBRCxFQUFLb0QsT0FBTCxDQUFwQjtBQUVBRyxNQUFBQSxLQUFLLENBQUNyVyxPQUFOLENBQWMsVUFBUzBRLEtBQVQsRUFBZTtBQUVyQi9DLFFBQUFBLEdBQUcsK0NBQXNDK0MsS0FBSyxDQUFDZ0IsT0FBNUMsMENBQ0toQixLQUFLLENBQUM0RixJQUFOLEdBQVcsTUFBSTVGLEtBQUssQ0FBQzRGLElBQXJCLEdBQTBCLGNBRC9CLGdEQUVZNUYsS0FBSyxDQUFDVCxZQUZsQiwwQ0FHTVMsS0FBSyxDQUFDUixNQUhaLHVDQUlHUSxLQUFLLENBQUNOLElBSlQsbUNBS0ZNLEtBQUssQ0FBQzlNLElBTEosa0NBQUg7QUFPRCxZQUFHLENBQUM4TSxLQUFLLENBQUNOLElBQVYsRUFDQ3pDLEdBQUcsSUFBSXlJLFNBQVMsQ0FBQzFGLEtBQUssQ0FBQ1IsTUFBUCxDQUFoQjtBQUNILE9BWEw7QUFjRCxhQUFPdkMsR0FBUDtBQUNGLEtBbkJEOztBQXNCQSxTQUFJLElBQUk0RCxHQUFSLElBQWU0RSxRQUFmLEVBQXlCO0FBQ3JCLFVBQUlqSyxHQUFHLG9DQUE0QmlLLFFBQVEsQ0FBQzVFLEdBQUQsQ0FBUixDQUFjZ0YsUUFBZCxjQUFnQyxFQUE1RCxtQkFBc0VKLFFBQVEsQ0FBQzVFLEdBQUQsQ0FBUixDQUFjckIsTUFBcEYsK0NBQ2NpRyxRQUFRLENBQUM1RSxHQUFELENBQVIsQ0FBY3JCLE1BRDVCLDRCQUNvRGlHLFFBQVEsQ0FBQzVFLEdBQUQsQ0FBUixDQUFjdEIsWUFEbEUsMkRBRUtrRyxRQUFRLENBQUM1RSxHQUFELENBQVIsQ0FBYzNOLElBRm5CLFNBQVAsQ0FEcUIsQ0FLckI7O0FBQ0FzSSxNQUFBQSxHQUFHLElBQUlrSyxTQUFTLENBQUNELFFBQVEsQ0FBQzVFLEdBQUQsQ0FBUixDQUFjckIsTUFBZixDQUFoQjtBQUVBaEUsTUFBQUEsR0FBRyxZQUFIOztBQUNBLFVBQUkxSyxLQUFLLEdBQUcsQ0FBUixLQUFjLENBQWxCLEVBQXFCO0FBQ2pCK08sUUFBQUEsS0FBSyxDQUFDck0sRUFBTixDQUFTLENBQVQsRUFBWXBDLE1BQVosQ0FBbUJvSyxHQUFuQjtBQUNILE9BRkQsTUFFTyxJQUFJMUssS0FBSyxHQUFHLENBQVIsS0FBYyxDQUFsQixFQUFxQjtBQUN4QitPLFFBQUFBLEtBQUssQ0FBQ3JNLEVBQU4sQ0FBUyxDQUFULEVBQVlwQyxNQUFaLENBQW1Cb0ssR0FBbkI7QUFDSCxPQUZNLE1BRUEsSUFBSTFLLEtBQUssR0FBRyxDQUFSLEtBQWMsQ0FBbEIsRUFBcUI7QUFDeEIrTyxRQUFBQSxLQUFLLENBQUNyTSxFQUFOLENBQVMsQ0FBVCxFQUFZcEMsTUFBWixDQUFtQm9LLEdBQW5CO0FBQ0g7O0FBQ0QxSyxNQUFBQSxLQUFLO0FBQ1I7O0FBQ0RoRCxJQUFBQSxDQUFDLENBQUMrUixLQUFELENBQUQsQ0FBU3RNLElBQVQsQ0FBYyw0QkFBZCxFQUE0QzBNLElBQTVDO0FBQ0EsV0FBT25TLENBQUMsQ0FBQytSLEtBQUQsQ0FBUjtBQUNILEdBL0hTLENBa0lWO0FBR0M7OztBQUVBLFdBQVNpRyxvQkFBVCxDQUE4QjFYLEVBQTlCLEVBQWlDb1gsT0FBakMsRUFBeUNoTyxHQUF6QyxFQUE2QztBQUMzQztBQUNFLFFBQUl3SyxNQUFNLEdBQUN3RCxPQUFPLENBQUNBLE9BQU8sQ0FBQ3BYLEVBQUQsQ0FBUCxDQUFZbVIsWUFBYixDQUFsQjs7QUFFQSxRQUFHeUMsTUFBSCxFQUFVO0FBQ0gsVUFBR0EsTUFBTSxDQUFDekMsWUFBUCxLQUFzQixHQUF6QixFQUE2QjtBQUN6QnlDLFFBQUFBLE1BQU0sR0FBQ3dELE9BQU8sQ0FBQ3hELE1BQU0sQ0FBQ3pDLFlBQVIsQ0FBZDtBQUNIO0FBQ0osS0FKSixNQUlRO0FBQ0R5QyxNQUFBQSxNQUFNLEdBQUV3RCxPQUFPLENBQUNwWCxFQUFELENBQWY7QUFDSDs7QUFFSCxhQUFTMlgsSUFBVCxDQUFjM0QsR0FBZCxFQUFrQjtBQUNaLFVBQUlyVCxJQUFJLEdBQUMsRUFBVDtBQUNDNEMsTUFBQUEsTUFBTSxDQUFDMlQsTUFBUCxDQUFjRSxPQUFkLEVBQXVCbFcsT0FBdkIsQ0FBK0IsVUFBU3FELElBQVQsRUFBYztBQUMzQyxZQUFHeVAsR0FBRyxJQUFHelAsSUFBSSxDQUFDNE0sWUFBZCxFQUEyQjtBQUN4QnhRLFVBQUFBLElBQUksQ0FBQ2dLLElBQUwsQ0FBVXBHLElBQVY7O0FBQ0EsY0FBRyxDQUFDQSxJQUFJLENBQUMrTSxJQUFULEVBQWM7QUFDWixtQkFBTy9NLElBQUksQ0FBQ3FULFFBQUwsR0FBZUQsSUFBSSxDQUFDcFQsSUFBSSxDQUFDNk0sTUFBTixDQUExQjtBQUlEO0FBRUg7QUFDSCxPQVhBO0FBWUwsYUFBT3pRLElBQVA7QUFDSDs7QUFFRGlULElBQUFBLE1BQU0sQ0FBQ2dFLFFBQVAsR0FBaUJELElBQUksQ0FBQy9ELE1BQU0sQ0FBQ3hDLE1BQVIsQ0FBckI7QUFFQSxRQUFJaUcsUUFBUSxHQUFDekQsTUFBYjtBQUNBLFFBQUlpRSxTQUFTLGtEQUF1Q2pFLE1BQU0sQ0FBQ3hDLE1BQTlDLG1CQUE2RHdDLE1BQU0sQ0FBQzlPLElBQXBFLE1BQWI7QUFFQXVTLElBQUFBLFFBQVEsR0FBQ0EsUUFBUSxDQUFDTyxRQUFsQjs7QUFFQSxTQUFJLElBQUluRixHQUFSLElBQWU0RSxRQUFmLEVBQXdCO0FBQ3BCUSxNQUFBQSxTQUFTLHNDQUE4QlIsUUFBUSxDQUFDNUUsR0FBRCxDQUFSLENBQWNnRixRQUFkLG1CQUFxQyxFQUFuRSxjQUF5RUosUUFBUSxDQUFDNUUsR0FBRCxDQUFSLENBQWNnRixRQUFkLElBQXdCSixRQUFRLENBQUM1RSxHQUFELENBQVIsQ0FBY21GLFFBQXRDLGVBQXlELEVBQWxJLHdDQUNFUCxRQUFRLENBQUM1RSxHQUFELENBQVIsQ0FBY3FGLEtBQWQsR0FBb0JULFFBQVEsQ0FBQzVFLEdBQUQsQ0FBUixDQUFjbEIsSUFBbEMsR0FBd0M4RixRQUFRLENBQUM1RSxHQUFELENBQVIsQ0FBYytFLElBQWQsR0FBbUIsTUFBSUgsUUFBUSxDQUFDNUUsR0FBRCxDQUFSLENBQWMrRSxJQUFyQyxHQUEwQyxjQURwRixpQkFDeUdILFFBQVEsQ0FBQzVFLEdBQUQsQ0FBUixDQUFjcUYsS0FBZCxxQkFBb0MsRUFEN0ksc0JBQzJKVCxRQUFRLENBQUM1RSxHQUFELENBQVIsQ0FBY3JCLE1BRHpLLHFCQUN5TGlHLFFBQVEsQ0FBQzVFLEdBQUQsQ0FBUixDQUFjbkIsSUFEdk0sd0JBQ3VOK0YsUUFBUSxDQUFDNUUsR0FBRCxDQUFSLENBQWNpRCxLQURyTyxnQkFDK08yQixRQUFRLENBQUM1RSxHQUFELENBQVIsQ0FBYzNOLElBRDdQLDJCQUVOdVMsUUFBUSxDQUFDNUUsR0FBRCxDQUFSLENBQWNtRixRQUFkLElBQXdCLENBQUNQLFFBQVEsQ0FBQzVFLEdBQUQsQ0FBUixDQUFjbkIsSUFBeEMsaUVBQXdHLEVBRmpHLDhDQUlOK0YsUUFBUSxDQUFDNUUsR0FBRCxDQUFSLENBQWNtRixRQUFkLElBQXdCLENBQUNQLFFBQVEsQ0FBQzVFLEdBQUQsQ0FBUixDQUFjbkIsSUFBeEMsbURBQzJDK0YsUUFBUSxDQUFDNUUsR0FBRCxDQUFSLENBQWNyQixNQUR6RCxvREFFYWlHLFFBQVEsQ0FBQzVFLEdBQUQsQ0FBUixDQUFjbUYsUUFBZCxDQUF1QmhULEdBQXZCLENBQTJCLFVBQVNtVCxTQUFULEVBQW1CclYsS0FBbkIsRUFBeUJxSyxHQUF6QixFQUE2QjtBQUN2RCw2QkFBY2dMLFNBQVMsQ0FBQ04sUUFBViw2QkFBeUMsRUFBdkQsb0RBQ1VNLFNBQVMsQ0FBQ0QsS0FBVixHQUFnQkMsU0FBUyxDQUFDeEcsSUFBMUIsR0FBZ0N3RyxTQUFTLENBQUNQLElBQVYsR0FBZSxNQUFJTyxTQUFTLENBQUNQLElBQTdCLEdBQWtDLGNBRDVFLDJDQUVFTyxTQUFTLENBQUNELEtBQVYscUJBQWdDLEVBRmxDLG1CQUU2Q0MsU0FBUyxDQUFDekcsSUFGdkQsc0JBRXVFeUcsU0FBUyxDQUFDM0csTUFGakYscUJBRWtHMkcsU0FBUyxDQUFDckMsS0FGNUcsY0FFcUhxQyxTQUFTLENBQUNqVCxJQUYvSDtBQUdILE9BSkUsRUFJQW9JLElBSkEsQ0FJSyxFQUpMLENBRmIsMkNBUUQsRUFaUSx5QkFBVDtBQWNIOztBQUNEMkssSUFBQUEsU0FBUyxXQUFUO0FBQ0F6TyxJQUFBQSxHQUFHLElBQUVBLEdBQUcsQ0FBQ2tLLE9BQUosQ0FBWTdILElBQVosQ0FBaUJvTSxTQUFqQixDQUFMO0FBQ0EsV0FBT0EsU0FBUDtBQUVGLEdBL0xRLENBa01WO0FBQ0E7OztBQUNBLFdBQVNHLGdCQUFULENBQTBCWixPQUExQixFQUFrQztBQUM5QixRQUFJUyxTQUFTLEdBQUMsRUFBZDtBQUNFdFUsSUFBQUEsTUFBTSxDQUFDMlQsTUFBUCxDQUFjRSxPQUFkLEVBQXVCbEcsTUFBdkIsQ0FBOEIsVUFBUzNNLElBQVQsRUFBYztBQUMxQyxVQUFHQSxJQUFJLENBQUM0TSxZQUFMLElBQW1CLEdBQXRCLEVBQTBCO0FBQ3RCMEcsUUFBQUEsU0FBUyxpQ0FBMEJ0VCxJQUFJLENBQUNrVCxRQUFMLGNBQXVCLEVBQWpELHNFQUMwQmxULElBQUksQ0FBQzhNLFNBRC9CLGlGQUUwQjlNLElBQUksQ0FBQytNLElBQUwsR0FBVSxNQUFJL00sSUFBSSxDQUFDaVQsSUFBbkIsaUJBRjFCLHlCQUU4RWpULElBQUksQ0FBQzZNLE1BRm5GLGNBRTZGN00sSUFBSSxDQUFDTyxJQUZsRyx1Q0FBVDtBQUlILE9BTEQsTUFLSztBQUNEO0FBQ0g7QUFDSixLQVRDO0FBV0YsV0FBTytTLFNBQVA7QUFFSDs7QUFFRCxXQUFTSSxXQUFULENBQXFCYixPQUFyQixFQUE2QnhSLElBQTdCLEVBQWtDO0FBQzlCLFFBQUcsQ0FBQ3dSLE9BQUosRUFBWTtBQUNSQSxNQUFBQSxPQUFPLEdBQUMsRUFBUjtBQUNILEtBSDZCLENBTTFCOzs7QUFDQSxRQUFJUyxTQUFTLEdBQUNHLGdCQUFnQixDQUFDWixPQUFELENBQTlCLENBUDBCLENBUTFCOztBQUNDLFFBQUkzRixLQUFLLEdBQUMwRixvQkFBb0IsQ0FBQ0MsT0FBRCxDQUE5QixDQVR5QixDQVc3Qjs7QUFFRyxRQUFJYyxHQUFHLEdBQUN4WSxDQUFDLDZRQUl5QmtHLElBQUksQ0FBQ3FMLElBQUwsSUFBVyxLQUFYLElBQWtCLFVBSjNDLHNyREFnQ2tCNEcsU0FoQ2xCLCs2QkFtRFFBLFNBbkRSLDJZQTBEbUJNLE1BQU0sQ0FBQ0MsT0FBUCxHQUFlVixvQkFBb0IsQ0FBQ1MsTUFBTSxDQUFDQyxPQUFSLEVBQWdCaEIsT0FBaEIsQ0FBbkMsR0FBNEQsRUExRC9FLHlQQUFULENBYjBCLENBa0YxQjs7QUFDRmMsSUFBQUEsR0FBRyxDQUFDL1MsSUFBSixDQUFTLG9CQUFULEVBQStCbkMsTUFBL0IsQ0FBc0N5TyxLQUF0QztBQUNGLFdBQU8vUixDQUFDLENBQUN3WSxHQUFELENBQVI7QUFFRjs7QUFJRixNQUFJM0gsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBVTFRLE9BQVYsRUFBbUI7QUFDaEMsUUFBSThGLEtBQUssR0FBRyxJQUFaOztBQUNBQSxJQUFBQSxLQUFLLENBQUM5RixPQUFOLEdBQWNBLE9BQWQ7QUFDQSxRQUFJUSxNQUFNLEdBQUM7QUFDUEYsTUFBQUEsUUFBUSxFQUFDLElBREY7QUFFUHVHLE1BQUFBLEdBQUcsRUFBQyxJQUZHO0FBR1AyUixNQUFBQSxRQUFRLEVBQUM7QUFDTDNSLFFBQUFBLEdBQUcsRUFBQyxJQURDO0FBRUxJLFFBQUFBLElBQUksRUFBQyxLQUZBO0FBR0w2UCxRQUFBQSxRQUFRLEVBQUM7QUFISixPQUhGO0FBUVAxRixNQUFBQSxJQUFJLEVBQUMsRUFSRTtBQVNQZ0YsTUFBQUEsS0FBSyxFQUFDLEtBVEM7QUFVUEMsTUFBQUEsU0FBUyxFQUFDLElBVkgsQ0FZWDs7QUFaVyxLQUFYO0FBYUF2USxJQUFBQSxLQUFLLENBQUM5RixPQUFOLEdBQWdCSCxDQUFDLENBQUNZLE1BQUYsQ0FBUyxJQUFULEVBQWVELE1BQWYsRUFBdUJzRixLQUFLLENBQUM5RixPQUE3QixDQUFoQixDQWhCZ0MsQ0FtQmhDOztBQUNBLFFBQUl5WSxRQUFRLEdBQUNDLFFBQVEsQ0FBQzFNLElBQVQsQ0FBYyxJQUFkLEVBQW1CbEcsS0FBSyxDQUFDOUYsT0FBTixDQUFjd1ksUUFBakMsQ0FBYixDQXBCZ0MsQ0FxQm5DOztBQUdHOVUsSUFBQUEsTUFBTSxDQUFDaVYsZ0JBQVAsQ0FBd0JMLE1BQXhCLEVBQWdDO0FBRTVCZixNQUFBQSxPQUFPLEVBQUM7QUFDSnFCLFFBQUFBLEdBQUcsRUFBRSxhQUFTdFgsR0FBVCxFQUFjO0FBQ2YsaUJBQVFtWCxRQUFRLENBQUNsQixPQUFqQjtBQUNGLFNBSEU7QUFJSHNCLFFBQUFBLEdBQUcsRUFBQyxhQUFTQyxRQUFULEVBQWtCO0FBQ2YsY0FBSTtBQUNBUixZQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBZ0JELE1BQU0sQ0FBQ1MsU0FBUCxDQUFpQlQsTUFBTSxDQUFDVSxLQUFQLENBQWFDLFFBQVEsQ0FBQ3RCLElBQXRCLEVBQTRCOVEsR0FBN0MsRUFBa0QwSyxNQUFsRTtBQUNTLFdBRmIsQ0FFYyxPQUFPN08sQ0FBUCxFQUFVO0FBQ1JpQyxZQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBY2xDLENBQWQ7QUFDQWlDLFlBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFlLHNDQUFmLEVBRlEsQ0FHWjtBQUNILFdBTlQsU0FPZTtBQUNIa0IsWUFBQUEsS0FBSyxDQUFDMEssUUFBTixHQUFpQjRILFdBQVcsQ0FBQ1UsUUFBRCxFQUFVaFQsS0FBSyxDQUFDOUYsT0FBaEIsQ0FBNUI7O0FBQ0E4RixZQUFBQSxLQUFLLENBQUMyRSxJQUFOLENBQVczRSxLQUFLLENBQUMwSyxRQUFqQjs7QUFDQSxnQkFBRzFLLEtBQUssQ0FBQzlGLE9BQU4sQ0FBY00sUUFBakIsRUFBMEI7QUFDMUJ3RixjQUFBQSxLQUFLLENBQUN6RixRQUFOLENBQWV5RixLQUFLLENBQUM5RixPQUFOLENBQWNNLFFBQTdCO0FBR0g7QUFPWjtBQUNIO0FBM0JFO0FBRm9CLEtBQWhDLEVBeEJnQyxDQXlEakM7QUFDRDtBQUNEO0FBQ0EsR0E1REQsQ0EvU1UsQ0E2V1Y7OztBQUNBLFdBQVNpVSxZQUFULENBQXNCaEwsR0FBdEIsRUFBMEI7QUFDdEIsUUFBSXpELEtBQUssR0FBQyxJQUFWOztBQUNBLFFBQUlDLElBQUksR0FBQyxLQUFLL0YsT0FBZCxDQUZzQixDQUd6Qjs7QUFDRyxRQUFJdVgsT0FBTyxHQUFFZSxNQUFNLENBQUNmLE9BQXBCO0FBQ0ExWCxJQUFBQSxDQUFDLENBQUMyUSxRQUFELENBQUQsQ0FBWXBPLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFlBQVk7QUFDaENtSCxNQUFBQSxHQUFHLENBQUM2SixVQUFKLENBQWVvQixRQUFmLENBQXdCLFVBQXhCLEtBQXVDckIsZUFBZSxDQUFDNUosR0FBRyxDQUFDNkosVUFBTCxDQUF0RDtBQUNILEtBRkQsRUFMc0IsQ0FVckI7O0FBQ0E3SixJQUFBQSxHQUFHLENBQUMyUCxRQUFKLENBQWF6RSxLQUFiLENBQW1CLFVBQVVwUCxLQUFWLEVBQWlCO0FBQ2pDLFVBQUl4RixDQUFDLENBQUMsSUFBRCxDQUFELENBQVEyVSxRQUFSLENBQWlCLHlCQUFqQixDQUFKLEVBQWlEO0FBQzdDM1UsUUFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRd1QsV0FBUixDQUFvQix5QkFBcEIsRUFBK0NxQixRQUEvQyxDQUF3RCx3QkFBeEQ7QUFDQTdVLFFBQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVTZVLFFBQVYsQ0FBbUIsZ0JBQW5CO0FBRUgsT0FKRCxNQUlPO0FBQ0g3VSxRQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVF3VCxXQUFSLENBQW9CLHdCQUFwQixFQUE4Q3FCLFFBQTlDLENBQXVELHlCQUF2RDtBQUNBN1UsUUFBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVd1QsV0FBVixDQUFzQixnQkFBdEI7QUFFSDtBQUNKLEtBVkEsRUFYcUIsQ0FzQnJCOztBQUNEOUosSUFBQUEsR0FBRyxDQUFDNFAsT0FBSixDQUFZeEUsS0FBWixDQUFrQixVQUFVdFAsS0FBVixFQUFpQjtBQUMvQixVQUFJbEYsRUFBRSxHQUFFTixDQUFDLENBQUMsSUFBRCxDQUFELENBQVF5RixJQUFSLENBQWEsb0JBQWIsRUFBbUNsRixJQUFuQyxDQUF3QyxTQUF4QyxDQUFSOztBQUNBLFVBQUdELEVBQUUsSUFBRW1ZLE1BQU0sQ0FBQ2YsT0FBUCxDQUFlcFgsRUFBZixFQUFtQnNSLElBQTFCLEVBQStCO0FBQzNCbEksUUFBQUEsR0FBRyxDQUFDNFAsT0FBSixDQUFZL1ksSUFBWixDQUFpQixXQUFqQixFQUE4QixFQUE5QjtBQUNEO0FBQ0Y7O0FBQ0QrUyxNQUFBQSxlQUFlLENBQUM1SixHQUFHLENBQUM2SixVQUFMLENBQWY7QUFDQXZULE1BQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLFdBQWIsRUFBMEIsWUFBMUI7QUFDSCxLQVJELEVBUUcsWUFBWTtBQUNWUCxNQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFPLElBQVIsQ0FBYSxXQUFiLEVBQTBCLEVBQTFCO0FBQ0osS0FWRCxFQXZCc0IsQ0FxQ3RCOztBQUNBbUosSUFBQUEsR0FBRyxDQUFDeU0sTUFBSixDQUFXNVQsRUFBWCxDQUFjLE9BQWQsRUFBc0IsZ0JBQXRCLEVBQXVDLFVBQVNpRCxLQUFULEVBQWU7QUFDbkRBLE1BQUFBLEtBQUssQ0FBQ3NPLGNBQU47QUFDQXNGLE1BQUFBLFFBQVEsQ0FBQ3RCLElBQVQsR0FBZTlYLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLE1BQWIsQ0FBZjtBQUNDLFVBQUlELEVBQUUsR0FBRU4sQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTyxJQUFSLENBQWEsU0FBYixDQUFSO0FBQ0EsVUFBSStULEdBQUcsR0FBRXRVLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLGVBQWIsQ0FBVDs7QUFFQyxlQUFTZ1osTUFBVCxDQUFnQmpGLEdBQWhCLEVBQW9CO0FBQ2pCLFlBQUk5UCxHQUFHLEdBQUNrVCxPQUFPLENBQUNwRCxHQUFELENBQWY7O0FBQ0EsWUFBRzlQLEdBQUcsQ0FBQ2lOLFlBQUosS0FBbUIsR0FBdEIsRUFBMEI7QUFFdEIsaUJBQU84SCxNQUFNLENBQUMvVSxHQUFHLENBQUNpTixZQUFMLENBQWI7QUFDSDs7QUFBQTtBQUlKdUcsUUFBQUEsb0JBQW9CLENBQUMxWCxFQUFELEVBQUlvWCxPQUFKLEVBQVloTyxHQUFaLENBQXBCO0FBRUcsWUFBSThQLElBQUksR0FBRTlQLEdBQUcsQ0FBQ2tLLE9BQUosQ0FBWW5PLElBQVosc0JBQStCbkYsRUFBL0IsUUFBVixDQVhpQixDQWNkOztBQUVDLFlBQUdrWixJQUFJLENBQUN0RixNQUFMLEdBQWN1RixFQUFkLENBQWlCLElBQWpCLENBQUgsRUFBMEI7QUFDdEI7QUFDQUQsVUFBQUEsSUFBSSxDQUFDakYsT0FBTCxDQUFhLFVBQWIsRUFBeUJNLFFBQXpCLENBQWtDLFNBQWxDO0FBQ0EyRSxVQUFBQSxJQUFJLENBQUNqRixPQUFMLENBQWEsY0FBYixFQUE2QnpCLElBQTdCO0FBRUgsU0FyQlksQ0F1QmhCOzs7QUFDQTBHLFFBQUFBLElBQUksQ0FBQ3RGLE1BQUwsR0FBY1csUUFBZCxDQUF1QixhQUF2QixFQUFzQy9KLFFBQXRDLEdBQWlEMEksV0FBakQsQ0FBNkQsYUFBN0Q7QUFFRCxlQUFPYyxHQUFQO0FBRUg7O0FBRURBLE1BQUFBLEdBQUcsR0FBQ2lGLE1BQU0sQ0FBQ2pGLEdBQUQsQ0FBVjtBQUNBaEIsTUFBQUEsZUFBZSxDQUFDNUosR0FBRyxDQUFDNkosVUFBTCxDQUFmO0FBRUgsS0F2Q0QsRUF0Q3NCLENBZ0Z0Qjs7QUFDQTdKLElBQUFBLEdBQUcsQ0FBQ2dRLE9BQUosQ0FBWW5YLEVBQVosQ0FBZSxPQUFmLEVBQXVCLElBQXZCLEVBQTRCLFVBQVNpRCxLQUFULEVBQWU7QUFDeEMsVUFBSWxGLEVBQUUsR0FBRU4sQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFReUYsSUFBUixDQUFhLEdBQWIsRUFBa0JsRixJQUFsQixDQUF1QixTQUF2QixDQUFSO0FBQ0EsVUFBSThPLENBQUMsR0FBQ3JQLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWdELEtBQVIsRUFBTixDQUZ3QyxDQUd6Qzs7QUFDQ2hELE1BQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTZVLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkIvSixRQUEzQixHQUFzQzBJLFdBQXRDLENBQWtELFFBQWxEO0FBQ0N0TixNQUFBQSxJQUFJLENBQUNsRCxLQUFMLEdBQVdxTSxDQUFYOztBQUNELFVBQUdvSixNQUFNLENBQUNmLE9BQVAsQ0FBZXBYLEVBQWYsRUFBbUJzUixJQUF0QixFQUEyQjtBQUMxQmxJLFFBQUFBLEdBQUcsQ0FBQzRQLE9BQUosQ0FBWS9ZLElBQVosQ0FBaUIsV0FBakIsRUFBOEIsRUFBOUI7QUFDQTZZLFFBQUFBLFFBQVEsQ0FBQ3RCLElBQVQsR0FBYzlYLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXlGLElBQVIsQ0FBYSxHQUFiLEVBQWtCbEYsSUFBbEIsQ0FBdUIsTUFBdkIsQ0FBZDtBQUNBO0FBQ0Y7O0FBQ0NpRixNQUFBQSxLQUFLLENBQUNzTyxjQUFOO0FBQ0FwSyxNQUFBQSxHQUFHLENBQUM0UCxPQUFKLENBQVkvWSxJQUFaLENBQWlCLFdBQWpCLEVBQTZCLEVBQTdCO0FBQ0F5WCxNQUFBQSxvQkFBb0IsQ0FBQzFYLEVBQUQsRUFBSW9YLE9BQUosRUFBWWhPLEdBQVosQ0FBcEI7QUFDQWdNLE1BQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25CaE0sUUFBQUEsR0FBRyxDQUFDNFAsT0FBSixDQUFZL1ksSUFBWixDQUFpQixXQUFqQixFQUE2QixZQUE3QjtBQUNILE9BRlMsRUFFUCxHQUZPLENBQVY7QUFJRixLQWxCRCxFQWpGc0IsQ0FxR25COztBQUNIbUosSUFBQUEsR0FBRyxDQUFDa0ssT0FBSixDQUFZclIsRUFBWixDQUFlLE9BQWYsRUFBd0IsTUFBeEIsRUFBZ0MsVUFBVWlELEtBQVYsRUFBaUI7QUFDN0NBLE1BQUFBLEtBQUssQ0FBQ3FPLGVBQU4sR0FENkMsQ0FDcEI7O0FBQ3pCLFVBQUkyRixJQUFJLEdBQUd4WixDQUFDLENBQUMsSUFBRCxDQUFaO0FBQUEsVUFDQTRSLElBQUksR0FBSTRILElBQUksQ0FBQ2paLElBQUwsQ0FBVSxNQUFWLENBQUQsSUFBdUIsTUFEOUI7QUFBQSxVQUVBc1gsS0FBSyxHQUFHMkIsSUFBSSxDQUFDMU8sUUFBTCxDQUFjLGNBQWQsQ0FGUjtBQUtBME8sTUFBQUEsSUFBSSxDQUFDdEYsTUFBTCxHQUFjVyxRQUFkLENBQXVCLGFBQXZCLEVBQXNDL0osUUFBdEMsR0FBaUQwSSxXQUFqRCxDQUE2RCxhQUE3RCxFQUE0RS9OLElBQTVFLENBQWlGLElBQWpGLEVBQXVGK04sV0FBdkYsQ0FBbUcsYUFBbkcsRUFBa0hBLFdBQWxILENBQThILFNBQTlIO0FBQ0F0TixNQUFBQSxJQUFJLENBQUNzUSxTQUFMLElBQWdCdFEsSUFBSSxDQUFDc1EsU0FBTCxDQUFlZ0QsSUFBZixDQUFoQjs7QUFJQSxVQUFJQSxJQUFJLENBQUN0RixNQUFMLEdBQWN1RixFQUFkLENBQWlCLElBQWpCLENBQUosRUFBNEI7QUFDeEJELFFBQUFBLElBQUksQ0FBQ2pGLE9BQUwsQ0FBYSxTQUFiLEVBQXdCTSxRQUF4QixDQUFpQyxhQUFqQyxFQUFnRC9KLFFBQWhELEdBQTJEMEksV0FBM0QsQ0FBdUUsYUFBdkUsRUFBc0ZBLFdBQXRGLENBQWtHLFNBQWxHO0FBQ0gsT0FkNEMsQ0FnQjdDOzs7QUFDQSxVQUFJLENBQUM1QixJQUFELElBQVNpRyxLQUFLLENBQUMxVixNQUFOLEdBQWUsQ0FBNUIsRUFBK0I7QUFDM0JxWCxRQUFBQSxJQUFJLENBQUN0RixNQUFMLEdBQWNXLFFBQWQsQ0FBdUIsYUFBdkIsRUFBc0MvSixRQUF0QyxHQUFpRDBJLFdBQWpELENBQTZELGFBQTdELEVBQTRFQSxXQUE1RSxDQUF3RixTQUF4RjtBQUNBcUUsUUFBQUEsS0FBSyxDQUFDOEIsV0FBTixDQUFrQixNQUFsQjtBQUNBSCxRQUFBQSxJQUFJLENBQUN0RixNQUFMLEdBQWNlLFdBQWQsQ0FBMEIsU0FBMUIsRUFBcUNuSyxRQUFyQyxHQUFnRG9OLFFBQWhELENBQXlELFlBQXpELEVBQXVFMEIsT0FBdkU7QUFDQSxlQUFPLEtBQVA7QUFDSDs7QUFFRCxVQUFHNVosQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTyxJQUFSLENBQWEsUUFBYixLQUF3QixRQUEzQixFQUFvQztBQUNoQztBQUNIOztBQUNELFVBQUlQLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLE1BQWIsTUFBdUIsY0FBM0IsRUFBMEM7QUFDdEM2WSxRQUFBQSxRQUFRLENBQUN0QixJQUFULEdBQWdCOVgsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRTyxJQUFSLENBQWEsTUFBYixDQUFoQixDQURzQyxDQUV4QztBQUdELE9BTEQsTUFLTTtBQUNGaUYsUUFBQUEsS0FBSyxDQUFDc08sY0FBTjtBQUVILE9BbkM0QyxDQW9DL0M7O0FBR0QsS0F2Q0Q7QUEwQ0FwSyxJQUFBQSxHQUFHLENBQUM2SixVQUFKLENBQWVoUixFQUFmLENBQWtCLE9BQWxCLEVBQTJCLDBCQUEzQixFQUFzRCxVQUFTaUQsS0FBVCxFQUFlO0FBQ2pFQSxNQUFBQSxLQUFLLENBQUNxTyxlQUFOLEdBRGlFLENBQ3hDOztBQUN6QnJPLE1BQUFBLEtBQUssQ0FBQ3NPLGNBQU47QUFDQSxVQUFJaUIsR0FBRyxHQUFHdlAsS0FBSyxDQUFDd1AsTUFBaEI7O0FBQ0EsY0FBUWhWLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLE9BQWIsQ0FBUjtBQUNJLGFBQUssYUFBTDtBQUFtQjtBQUNuQm1KLFVBQUFBLEdBQUcsQ0FBQzZKLFVBQUosQ0FBZTBCLFdBQWYsQ0FBMkIsVUFBM0I7QUFDQTs7QUFDQSxhQUFLLFNBQUw7QUFBZTtBQUNmRixVQUFBQSxHQUFHLENBQUNHLFVBQUosQ0FBZXhJLFNBQWYsSUFBNEIsb0JBQTVCLElBQW9ENEcsZUFBZSxDQUFDNUosR0FBRyxDQUFDNkosVUFBTCxDQUFuRTtBQUNBLGNBQUk0QixPQUFPLEdBQUdoQyxVQUFVLENBQUN6SixHQUFHLENBQUM0SSxhQUFMLENBQXhCO0FBQ0EsY0FBSThDLEtBQUssR0FBR3BWLENBQUMsQ0FBQytVLEdBQUQsQ0FBRCxDQUFPUixPQUFQLENBQWUsU0FBZixDQUFaO0FBQ0EsY0FBSWMsUUFBUSxHQUFHRCxLQUFLLENBQUMzUCxJQUFOLENBQVcsR0FBWCxFQUFnQmxGLElBQWhCLENBQXFCLFNBQXJCLENBQWY7QUFBQSxjQUNJOFIsSUFBSSxHQUFHM0ksR0FBRyxDQUFDNEksYUFBSixDQUFrQjdNLElBQWxCLENBQXVCLFlBQXZCLENBRFg7QUFFQTJQLFVBQUFBLEtBQUssQ0FBQ1AsUUFBTixDQUFlLFFBQWYsRUFDSy9KLFFBREwsR0FFSzBJLFdBRkwsQ0FFaUIsUUFGakI7QUFHQW5CLFVBQUFBLElBQUksQ0FBQ2xNLElBQUwsQ0FBVSxZQUFZO0FBQ2xCbkcsWUFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLENBQVIsRUFBV00sRUFBWCxJQUFpQitVLFFBQWpCLEdBQTRCclYsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRNlUsUUFBUixDQUFpQixRQUFqQixDQUE1QixHQUF5RDdVLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXdULFdBQVIsQ0FBb0IsUUFBcEIsQ0FBekQ7QUFFSCxXQUhEOztBQUlBLGVBQUssSUFBSVQsR0FBVCxJQUFnQm9DLE9BQWhCLEVBQXlCO0FBQ3JCLGdCQUFLcEMsR0FBRCxJQUFTc0MsUUFBYixFQUF1QjtBQUNuQnJWLGNBQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBY3NWLE9BQWQsQ0FBc0I7QUFDbEJDLGdCQUFBQSxTQUFTLEVBQUVKLE9BQU8sQ0FBQ3BDLEdBQUQ7QUFEQSxlQUF0QjtBQUdIO0FBQ0o7O0FBRUQ7O0FBQ0E7QUFDUyxpQkFBTyxLQUFQO0FBM0JiO0FBOEJILEtBbENEO0FBbUNILEdBamlCUyxDQW1pQlY7OztBQUNBLFdBQVM4RyxZQUFULENBQXNCblEsR0FBdEIsRUFBMEI7QUFFdEIsUUFBSStJLEtBQUssR0FBRyxJQUFJQyxNQUFKLENBQVcsb0JBQVgsRUFBaUMsR0FBakMsQ0FBWjtBQUNDLFFBQUlGLFNBQVMsR0FBRTlJLEdBQUcsQ0FBQ3lNLE1BQUosQ0FBVzFRLElBQVgsQ0FBZ0IsWUFBaEIsQ0FBZjtBQUNBLFFBQUk0TSxJQUFJLEdBQUMzSSxHQUFHLENBQUM0SSxhQUFKLENBQWtCN00sSUFBbEIsQ0FBdUIsWUFBdkIsQ0FBVDtBQUNDaUUsSUFBQUEsR0FBRyxDQUFDNkosVUFBSixDQUFlOU4sSUFBZixDQUFvQixjQUFwQixFQUFvQ2tOLEtBQXBDLENBQTBDLFVBQVU5UCxDQUFWLEVBQWE7QUFDM0MsVUFBSWlYLEdBQUcsR0FBRzlaLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTZTLElBQVIsQ0FBYSxhQUFiLENBQVY7QUFDQSxVQUFJcFIsR0FBRyxHQUFHekIsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFReUIsR0FBUixFQUFWO0FBQ0FBLE1BQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDbVIsV0FBSixFQUFOOztBQUNBLFVBQUksQ0FBQ25SLEdBQUwsRUFBVTtBQUNOcVksUUFBQUEsR0FBRyxDQUFDM0gsSUFBSjtBQUNBekksUUFBQUEsR0FBRyxDQUFDNEksYUFBSixDQUFrQlEsSUFBbEI7QUFDQU4sUUFBQUEsU0FBUyxDQUFDekcsSUFBVixDQUFlLEVBQWYsRUFBbUJvRyxJQUFuQjtBQUNBLGVBSk0sQ0FJRTtBQUNYOztBQUVEMkgsTUFBQUEsR0FBRyxDQUFDaEgsSUFBSixHQUFXck4sSUFBWCxDQUFnQixRQUFoQixFQUEwQjFELElBQTFCLENBQStCTixHQUEvQjtBQUVBaUksTUFBQUEsR0FBRyxDQUFDNEksYUFBSixDQUFrQkgsSUFBbEI7QUFFQUssTUFBQUEsU0FBUyxDQUFDekcsSUFBVixDQUFlLEVBQWYsRUFBbUIrRyxJQUFuQjtBQUVBVCxNQUFBQSxJQUFJLENBQUNsTSxJQUFMLENBQVUsVUFBVWtKLENBQVYsRUFBYXhLLElBQWIsRUFBbUI7QUFFekIsWUFBSXNLLEdBQUcsR0FBR3NELEtBQUssQ0FBQ1EsSUFBTixDQUFXeFIsR0FBWCxJQUFrQnpCLENBQUMsQ0FBQzZFLElBQUQsQ0FBRCxDQUFRWSxJQUFSLENBQWEsR0FBYixFQUFrQjFELElBQWxCLEdBQXlCd0osT0FBekIsQ0FBaUM5SixHQUFqQyxDQUFsQixHQUEwRHpCLENBQUMsQ0FBQzZFLElBQUQsQ0FBRCxDQUFRdEUsSUFBUixDQUFhLFNBQWIsRUFBd0JnTCxPQUF4QixDQUFnQzlKLEdBQWhDLENBQXBFOztBQUVBLFlBQUkwTixHQUFHLElBQUksQ0FBUCxJQUFZblAsQ0FBQyxDQUFDNkUsSUFBRCxDQUFELENBQVFZLElBQVIsQ0FBYSxHQUFiLEVBQWtCbEYsSUFBbEIsQ0FBdUIsTUFBdkIsS0FBa0MsTUFBbEQsRUFBMEQ7QUFFdERpUyxVQUFBQSxTQUFTLENBQUNsUCxNQUFWLGlFQUFzRXVCLElBQUksQ0FBQ2tWLFNBQTNFO0FBRUg7QUFDSixPQVREO0FBV2IsS0E1QkM7QUErQkw7O0FBQUEsR0F4a0JTLENBMGtCUjs7QUFDRixXQUFTNUcsVUFBVCxDQUFxQmIsYUFBckIsRUFBb0M7QUFDaEMsUUFBSXJNLEtBQUssR0FBRyxJQUFaOztBQUNBLFFBQUlvTSxJQUFJLEdBQUdDLGFBQWEsQ0FBQzdNLElBQWQsQ0FBbUIsWUFBbkIsQ0FBWDtBQUNDLFFBQUlqQixHQUFHLEdBQUcsRUFBVjtBQUNENk4sSUFBQUEsSUFBSSxDQUFDbE0sSUFBTCxDQUFVLFVBQVVuRCxLQUFWLEVBQWlCNkIsSUFBakIsRUFBdUI7QUFDN0IsVUFBSWtPLEdBQUcsR0FBR2xPLElBQUksQ0FBQ3ZFLEVBQWY7QUFDQWtFLE1BQUFBLEdBQUcsQ0FBQ3VPLEdBQUQsQ0FBSCxHQUFXSyxRQUFRLENBQUN2TyxJQUFJLENBQUN3TyxTQUFOLENBQW5CO0FBQ0gsS0FIRDtBQUlBLFdBQU83TyxHQUFQO0FBQ0g7O0FBQUE7O0FBRUQsV0FBUzhPLGVBQVQsQ0FBeUI1SixHQUF6QixFQUE2QmdELFNBQTdCLEVBQXVDO0FBQy9CLFFBQUcsQ0FBQ0EsU0FBSixFQUFjO0FBQ1ZBLE1BQUFBLFNBQVMsR0FBQyxVQUFWO0FBQ0g7O0FBQ0RoRCxJQUFBQSxHQUFHLENBQUM4SixXQUFKLENBQWdCOUcsU0FBaEI7QUFDUDs7QUFHRG1FLEVBQUFBLFVBQVUsQ0FBQ3ZMLFNBQVgsQ0FBcUJzRixJQUFyQixHQUE0QixVQUFVK0YsUUFBVixFQUFvQjtBQUU1QyxRQUFJMUssS0FBSyxHQUFHLElBQVo7O0FBRUEsUUFBSStULElBQUksR0FBQztBQUNMTixNQUFBQSxPQUFPLEVBQUUvSSxRQUFRLENBQUNsTCxJQUFULENBQWMsVUFBZCxDQURKO0FBRUw0VCxNQUFBQSxRQUFRLEVBQUUxSSxRQUFRLENBQUNsTCxJQUFULENBQWMsZ0JBQWQsQ0FGTDtBQUdMOE4sTUFBQUEsVUFBVSxFQUFFNUMsUUFBUSxDQUFDbEwsSUFBVCxDQUFjLGFBQWQsQ0FIUDtBQUlMNlQsTUFBQUEsT0FBTyxFQUFFM0ksUUFBUSxDQUFDbEwsSUFBVCxDQUFjLHVCQUFkLENBSko7QUFLTG1PLE1BQUFBLE9BQU8sRUFBRWpELFFBQVEsQ0FBQ2xMLElBQVQsQ0FBYyw4QkFBZCxDQUxKO0FBTUw2TSxNQUFBQSxhQUFhLEVBQUUzQixRQUFRLENBQUNsTCxJQUFULENBQWMsb0JBQWQsQ0FOVjtBQU9MMFEsTUFBQUEsTUFBTSxFQUFFeEYsUUFBUSxDQUFDbEwsSUFBVCxDQUFjLFVBQWQsQ0FQSDtBQVFMd1UsTUFBQUEsZUFBZSxFQUFFdEosUUFBUSxDQUFDbEwsSUFBVCxDQUFjLGtCQUFkLENBUlosQ0FXVDs7QUFYUyxLQUFUO0FBWUFpUCxJQUFBQSxZQUFZLENBQUN2SSxJQUFiLENBQWtCbEcsS0FBbEIsRUFBd0IrVCxJQUF4QjtBQUNBSCxJQUFBQSxZQUFZLENBQUNHLElBQUQsQ0FBWjtBQUNBLFdBQU8vVCxLQUFQO0FBQ0gsR0FuQkQsQ0E5bEJVLENBc25CVjs7O0FBQ0E0SyxFQUFBQSxVQUFVLENBQUN2TCxTQUFYLENBQXFCOUUsUUFBckIsR0FBZ0MsVUFBVTJXLEtBQVYsRUFBaUI7QUFFMUMsU0FBS2hYLE9BQUwsQ0FBYU0sUUFBYixHQUFzQjBXLEtBQXRCO0FBQ0RuWCxJQUFBQSxDQUFDLENBQUMsTUFBSyxLQUFLRyxPQUFMLENBQWFNLFFBQW5CLENBQUQsQ0FBOEJpTCxLQUE5QixHQUFzQ3BJLE1BQXRDLENBQTZDLEtBQUtxTixRQUFsRDtBQUVGLFdBQU8sSUFBUDtBQUVILEdBUEQsQ0F2bkJVLENBaW9CVDs7O0FBQ0EsV0FBU2tJLFFBQVQsQ0FBa0JxQixNQUFsQixFQUEwQjtBQUN0QixRQUFJalUsS0FBSyxHQUFDLElBQVY7O0FBQ0EsUUFBSWtVLFlBQVksR0FBQyxFQUFqQjtBQUNELFFBQUkxUyxLQUFLLEdBQUNELFNBQVMsQ0FBQzBCLFFBQVYsRUFBVjtBQUNBLFFBQUlrUixRQUFKO0FBQ0FGLElBQUFBLE1BQU0sQ0FBQ3JTLE9BQVAsR0FBZ0IsVUFBVXdTLFFBQVYsRUFBb0I7QUFDaEMsVUFBSUEsUUFBUSxDQUFDeFMsT0FBYixFQUFzQjtBQUFBLFlBc0NUeVMsVUF0Q1MsR0FzQ2xCLFNBQVNBLFVBQVQsQ0FBb0J2RyxHQUFwQixFQUF3QztBQUFBLGNBQWhCMUcsR0FBZ0IsdUVBQVosRUFBWTtBQUFBLGNBQVRrTixLQUFTLHVFQUFILEVBQUc7QUFDcEMsY0FBSTdDLE9BQU8sR0FBRTBDLFFBQVEsQ0FBQzFDLE9BQXRCO0FBQ0EsY0FBSTdTLElBQUksR0FBQzZTLE9BQU8sQ0FBQzNELEdBQUQsQ0FBaEI7QUFDQzFHLFVBQUFBLEdBQUcsQ0FBQ21OLE9BQUosQ0FBWTNWLElBQUksQ0FBQ08sSUFBakI7QUFDQW1WLFVBQUFBLEtBQUssQ0FBQ0MsT0FBTixDQUFjM1YsSUFBSSxDQUFDNk0sTUFBbkI7O0FBRUQsY0FBRzdNLElBQUksQ0FBQzRNLFlBQUwsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDbkIsbUJBQU82SSxVQUFVLENBQUN6VixJQUFJLENBQUM0TSxZQUFOLEVBQW1CcEUsR0FBbkIsRUFBdUJrTixLQUF2QixDQUFqQjtBQUVKOztBQUNELGlCQUFPO0FBQUNsTixZQUFBQSxHQUFHLEVBQUNBLEdBQUw7QUFDQWtOLFlBQUFBLEtBQUssRUFBQ0E7QUFETixXQUFQO0FBSUgsU0FwRGlCLEVBdURmOzs7QUFyREhILFFBQUFBLFFBQVEsR0FBQ0ssTUFBTSxDQUFDSixRQUFRLENBQUNwWixJQUFWLENBQWY7QUFFQW9aLFFBQUFBLFFBQVEsQ0FBQ3BaLElBQVQsQ0FBY08sT0FBZCxDQUFzQixVQUFVcUQsSUFBVixFQUFnQjtBQUNsQyxjQUFHQSxJQUFJLENBQUN1VCxLQUFSLEVBQWM7QUFDVjtBQUNIOztBQUNEdlQsVUFBQUEsSUFBSSxDQUFDcU8sT0FBTCxHQUFlM0MsTUFBTSxDQUFDckIsTUFBUCxDQUFjckssSUFBSSxDQUFDTyxJQUFuQixFQUF5QixDQUF6QixDQUFmLENBSmtDLENBS25DOztBQUVDLGNBQUlQLElBQUksQ0FBQytNLElBQUwsSUFBVy9NLElBQUksQ0FBQ2dOLElBQXBCLEVBQXlCO0FBQ3JCO0FBQ0E7QUFDQSxnQkFBRyxDQUFDaE4sSUFBSSxDQUFDaVQsSUFBVCxFQUFjO0FBRWJqVCxjQUFBQSxJQUFJLENBQUNpVCxJQUFMLEdBQVVqVCxJQUFJLENBQUNnTixJQUFMLENBQVU2SSxNQUFWLENBQWlCLENBQWpCLEVBQW9CQyxLQUFwQixDQUEwQixHQUExQixDQUFWO0FBQ0E5VixjQUFBQSxJQUFJLENBQUNpVCxJQUFMLEdBQVVqVCxJQUFJLENBQUNpVCxJQUFMLENBQVVqVCxJQUFJLENBQUNpVCxJQUFMLENBQVUzVixNQUFWLEdBQWlCLENBQTNCLElBQThCLEdBQTlCLEdBQWtDMEMsSUFBSSxDQUFDaVQsSUFBTCxDQUFValQsSUFBSSxDQUFDaVQsSUFBTCxDQUFVM1YsTUFBVixHQUFpQixDQUEzQixDQUE1Qzs7QUFFRyxrQkFBRzBDLElBQUksQ0FBQ2lULElBQUwsQ0FBVXZNLE9BQVYsQ0FBa0IsR0FBbEIsS0FBd0IsQ0FBQyxDQUE1QixFQUE4QjtBQUMxQjFHLGdCQUFBQSxJQUFJLENBQUNpVCxJQUFMLEdBQVdqVCxJQUFJLENBQUNpVCxJQUFMLENBQVU4QyxLQUFWLENBQWdCLFVBQWhCLEVBQTRCLENBQTVCLENBQVg7QUFDSDtBQUVKOztBQUFBO0FBQ0ssZ0JBQUlwVyxHQUFHLEdBQUM4VixVQUFVLENBQUN6VixJQUFJLENBQUM2TSxNQUFOLENBQWxCO0FBQ0F5SSxZQUFBQSxZQUFZLENBQUN0VixJQUFJLENBQUNpVCxJQUFOLENBQVosR0FBd0I7QUFDdEIrQyxjQUFBQSxXQUFXLEVBQUNoVyxJQUFJLENBQUNpVyxNQUFMLEdBQVlqVyxJQUFJLENBQUNnTixJQUFqQixHQUFzQmhOLElBQUksQ0FBQ2dOLElBQUwsR0FBVSxPQUR0QjtBQUV0QmlKLGNBQUFBLE1BQU0sRUFBQ2pXLElBQUksQ0FBQ2lXLE1BQUwsSUFBYSxLQUZFO0FBR3RCQyxjQUFBQSxVQUFVLEVBQUNsVyxJQUFJLENBQUNtVyxPQUFMLEdBQWFuVyxJQUFJLENBQUNtVyxPQUFMLEdBQWEsS0FBMUIsR0FBZ0MsSUFIckI7QUFJdEI1VixjQUFBQSxJQUFJLEVBQUNQLElBQUksQ0FBQ08sSUFKWTtBQUt0QnNNLGNBQUFBLE1BQU0sRUFBQzdNLElBQUksQ0FBQzZNLE1BTFU7QUFNdEJ1SixjQUFBQSxXQUFXLEVBQUN6VyxHQUFHLENBQUM2SSxHQU5NO0FBT3RCNk4sY0FBQUEsUUFBUSxFQUFDMVcsR0FBRyxDQUFDK1Y7QUFQUyxhQUF4QjtBQVNGL1YsWUFBQUEsR0FBRyxHQUFDLElBQUo7QUFDUDtBQUNKLFNBaENEO0FBb0RHaVUsUUFBQUEsTUFBTSxDQUFDUyxTQUFQLEdBQWtCaUIsWUFBbEIsQ0F4RGUsQ0F5RGY7QUFFTixPQTNERCxNQTJETztBQUNIM1QsUUFBQUEsS0FBSyxDQUFDK0IsR0FBTixDQUFVLFNBQVY7QUFDSDs7QUFDRGQsTUFBQUEsS0FBSztBQUNSLEtBaEVELEVBa0VBeVMsTUFBTSxDQUFDblYsS0FBUCxHQUFjLFVBQVVvVyxjQUFWLEVBQTBCQyxVQUExQixFQUFzQ0MsV0FBdEMsRUFBbUQ7QUFDN0R2VyxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBY29XLGNBQWQsRUFBOEJDLFVBQTlCLEVBQTBDQyxXQUExQztBQUNBNVQsTUFBQUEsS0FBSztBQUNSLEtBckVEO0FBdUVBbUMsSUFBQUEsTUFBTSxDQUFDa04sUUFBUCxDQUFnQm9ELE1BQWhCO0FBQ0EsV0FBT0UsUUFBUDtBQUNIOztBQUFBLEdBaHRCUyxDQWt0QlY7O0FBQ0EsV0FBU0ssTUFBVCxDQUFnQnhaLElBQWhCLEVBQXNCO0FBQ2xCO0FBQ0FBLElBQUFBLElBQUksQ0FBQ08sT0FBTCxDQUFhLFVBQVVxRCxJQUFWLEVBQWdCO0FBQ3pCLGFBQU9BLElBQUksQ0FBQ3FULFFBQVo7QUFDQSxhQUFPclQsSUFBSSxDQUFDdUMsSUFBWjtBQUNBLGFBQU92QyxJQUFJLENBQUN5VyxPQUFaO0FBQ0EsYUFBT3pXLElBQUksQ0FBQzBXLFdBQVo7QUFDQSxhQUFPMVcsSUFBSSxDQUFDMlcsY0FBWjtBQUNBLGFBQU8zVyxJQUFJLENBQUM0VyxRQUFaO0FBQ0EsYUFBTzVXLElBQUksQ0FBQzZXLFdBQVo7QUFDQSxhQUFPN1csSUFBSSxDQUFDOFcsU0FBWjtBQUNBLGFBQU85VyxJQUFJLENBQUMrVyxVQUFaO0FBQ0EsYUFBTy9XLElBQUksQ0FBQ2dYLFVBQVo7QUFDQSxhQUFPaFgsSUFBSSxDQUFDaVgsWUFBWjtBQUNBLGFBQU9qWCxJQUFJLENBQUNrWCxJQUFaO0FBQ0gsS0FiRCxFQUZrQixDQWlCbEI7O0FBQ0EsUUFBSTdXLEdBQUcsR0FBRyxFQUFWO0FBQ0FqRSxJQUFBQSxJQUFJLENBQUNPLE9BQUwsQ0FBYSxVQUFVcUQsSUFBVixFQUFnQjtBQUN6QkssTUFBQUEsR0FBRyxDQUFDTCxJQUFJLENBQUM2TSxNQUFOLENBQUgsR0FBbUI3TSxJQUFuQjtBQUNILEtBRkQ7QUFLQSxXQUFPO0FBQ0g2UyxNQUFBQSxPQUFPLEVBQUN4UztBQURMLEtBQVA7QUFJSDs7QUFHRDFCLEVBQUFBLE1BQU0sQ0FBQ3dZLHFCQUFQLEdBQStCbkwsVUFBL0I7O0FBRUE3USxFQUFBQSxDQUFDLENBQUNDLEVBQUYsQ0FBS29YLG9CQUFMLEdBQTRCLFVBQVVsWCxPQUFWLEVBQW1CO0FBQ3BDO0FBRVAsV0FBTyxJQUFJMFEsVUFBSixDQUFlLElBQWYsRUFBcUIxUSxPQUFyQixDQUFQO0FBRUgsR0FMRDtBQVFILENBNXZCRCxFQTR2QkdzRCxNQTV2Qkg7Ozs7O0FDREE7O0FBQ0EsQ0FBQyxVQUFVekQsQ0FBVixFQUFhNEYsS0FBYixFQUFvQjtBQUVqQjtBQUNBQSxFQUFBQSxLQUFLLENBQUNDLEdBQU4sQ0FBVSxDQUFDLFNBQUQsQ0FBVixFQUF1QixZQUFZO0FBQy9CLFFBQUkySyxPQUFPLEdBQUc1SyxLQUFLLENBQUM0SyxPQUFwQjs7QUFDQSxRQUFJakUsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBVXJHLElBQVYsRUFBZ0I7QUFFM0IsVUFBSStWLE9BQU8sR0FBRztBQUNWQyxRQUFBQSxNQUFNLEVBQUUsV0FERTtBQUVWQyxRQUFBQSxLQUFLLEVBQUUsMkJBRkc7QUFHVkMsUUFBQUEsSUFBSSxFQUFFLDBCQUhJO0FBSVZDLFFBQUFBLE9BQU8sRUFBRTtBQUpDLE9BQWQ7O0FBUUEsVUFBSUMsUUFBUSxHQUFHLGtCQUFVMVUsT0FBVixFQUFtQjtBQUM5QixZQUFJQSxPQUFKLEVBQWE7QUFDVCxjQUFJMlUsRUFBRSxHQUFHLEVBQVQ7QUFDQSxjQUFJQyxFQUFFLEdBQUcsRUFBVDtBQUNBNVUsVUFBQUEsT0FBTyxDQUFDcEcsT0FBUixDQUFnQixVQUFVcUQsSUFBVixFQUFnQm1OLEtBQWhCLEVBQXVCO0FBQ25DdUssWUFBQUEsRUFBRSwyQkFBb0IxWCxJQUFJLENBQUN2RSxFQUF6QixzQkFBc0M0RixJQUFJLENBQUN1VyxXQUFMLEtBQW1CekssS0FBbkIsR0FBMEIsWUFBMUIsR0FBdUMsRUFBN0UsaUJBQXFGbk4sSUFBSSxDQUFDN0MsS0FBMUYsVUFBRjtBQUVBd2EsWUFBQUEsRUFBRSwyQ0FBbUN0VyxJQUFJLENBQUN1VyxXQUFMLEtBQW1CekssS0FBbkIsR0FBMEIsWUFBMUIsR0FBdUMsRUFBMUUsK0JBQThGbk4sSUFBSSxDQUFDMEgsUUFBbkcsV0FBRjtBQUNILFdBSkQ7QUFLQSxpQkFBTztBQUNIdkssWUFBQUEsS0FBSyxFQUFFdWEsRUFESjtBQUVIM1UsWUFBQUEsT0FBTyxFQUFFNFU7QUFGTixXQUFQO0FBSUgsU0FaRCxNQVlPO0FBQ0gsaUJBQU8sRUFBUDtBQUNIO0FBQ0osT0FoQkQ7O0FBaUJBRixNQUFBQSxRQUFRLEdBQUdBLFFBQVEsQ0FBQ3BXLElBQUksQ0FBQzBCLE9BQU4sQ0FBbkI7QUFFQSxVQUFJVCxRQUFRLG1uQkFBWjtBQVlBLFVBQUl1VixFQUFFLDRDQUNZVCxPQUFPLENBQUMvVixJQUFJLENBQUNnQixJQUFOLENBRG5CLGdCQUNtQ2hCLElBQUksQ0FBQ3lXLFVBQUwsK0JBQXdDLEVBRDNFLG9DQUVJelcsSUFBSSxDQUFDc0wsTUFBTCxHQUFZLGtCQUFldEwsSUFBSSxDQUFDc0wsTUFBcEIsT0FBWixHQUEyQyxFQUYvQyxvQ0FHSXRMLElBQUksQ0FBQzBXLFFBQUwsR0FBY3pWLFFBQWQsR0FBdUIsRUFIM0IseUtBQU47QUFRQSxhQUFPbkgsQ0FBQyxDQUFDMGMsRUFBRCxDQUFSO0FBQ0gsS0FsREQ7O0FBcURBLFFBQUlHLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQVUxYyxPQUFWLEVBQW1CO0FBQzdCLFVBQUk4RixLQUFLLEdBQUcsSUFBWjs7QUFDQUEsTUFBQUEsS0FBSyxDQUFDNlcsUUFBTixHQUFpQixDQUFDLENBQWxCO0FBQ0EsVUFBSW5jLE1BQU0sR0FBRztBQUNUb2MsUUFBQUEsSUFBSSxFQUFFLEdBREc7QUFFVHRjLFFBQUFBLFFBQVEsRUFBRSxJQUZEO0FBR1QrUSxRQUFBQSxNQUFNLEVBQUUsYUFBYTVILE1BQU0sQ0FBQ0MsY0FBUCxFQUhaO0FBR3FDO0FBQzlDNFMsUUFBQUEsV0FBVyxFQUFFLENBSko7QUFLVEcsUUFBQUEsUUFBUSxFQUFFLEtBTEQ7QUFLUTtBQUNqQjFWLFFBQUFBLElBQUksRUFBRSxPQU5HO0FBT1Q4VixRQUFBQSxNQUFNLEVBQUUsS0FQQztBQU9NO0FBQ2ZMLFFBQUFBLFVBQVUsRUFBRSxLQVJIO0FBUVU7QUFDbkIvVSxRQUFBQSxPQUFPLEVBQUU7QUFDTDs7Ozs7O0FBREs7QUFUQSxPQUFiO0FBbUJBLFVBQUk4RixHQUFKLEVBQVNHLEdBQVQsQ0F0QjZCLENBdUI3Qjs7QUFDQUEsTUFBQUEsR0FBRyxHQUFHQyxTQUFTLENBQUMsQ0FBRCxDQUFmOztBQUNBLFVBQUksUUFBT0QsR0FBUCxNQUFlLFFBQW5CLEVBQTZCO0FBRXpCNUgsUUFBQUEsS0FBSyxDQUFDQyxJQUFOLEdBQWFsRyxDQUFDLENBQUNZLE1BQUYsQ0FBUyxJQUFULEVBQWVELE1BQWYsRUFBdUJrTixHQUF2QixDQUFiO0FBQ0E1SCxRQUFBQSxLQUFLLENBQUMrSCxVQUFOLEdBQW1CekIsUUFBUSxDQUFDdEcsS0FBSyxDQUFDQyxJQUFQLENBQTNCLENBSHlCLENBS3pCOztBQUNBLFlBQUlELEtBQUssQ0FBQ0MsSUFBTixDQUFXMFcsUUFBZixFQUF5QjtBQUVyQjNXLFVBQUFBLEtBQUssQ0FBQytILFVBQU4sQ0FBaUJ2SSxJQUFqQixDQUFzQixvQkFBdEIsRUFBNENxUCxLQUE1QyxDQUFrRCxZQUFZO0FBQzFEOVUsWUFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFReUYsSUFBUixDQUFhLFFBQWIsRUFBdUJxTixJQUF2QjtBQUVILFdBSEQsRUFHRyxZQUFZO0FBQ1g5UyxZQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVF5RixJQUFSLENBQWEsUUFBYixFQUF1QjBNLElBQXZCO0FBQ0gsV0FMRDs7QUFPQWxNLFVBQUFBLEtBQUssQ0FBQytILFVBQU4sQ0FBaUJ2SSxJQUFqQixDQUFzQiwyQkFBdEIsRUFBbURsRCxFQUFuRCxDQUFzRCxPQUF0RCxFQUErRCxJQUEvRCxFQUFxRSxVQUFVTSxDQUFWLEVBQWE7QUFDOUVBLFlBQUFBLENBQUMsQ0FBQ2lSLGNBQUY7QUFDQSxnQkFBSWlDLEVBQUUsR0FBRy9WLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWdELEtBQVIsRUFBVDtBQUNBLGdCQUFJOFMsR0FBRyxHQUFHOVYsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRdVUsT0FBUixDQUFnQixvQkFBaEIsRUFBc0MxQixJQUF0QyxHQUE2Q3FGLFFBQTdDLENBQXNELElBQXRELENBQVY7QUFDQXBDLFlBQUFBLEdBQUcsQ0FBQzNQLElBQUosQ0FBUyxVQUFVbkQsS0FBVixFQUFpQjZCLElBQWpCLEVBQXVCO0FBQzVCLGtCQUFJb1ksS0FBSyxHQUFHamQsQ0FBQyxDQUFDNkUsSUFBRCxDQUFiOztBQUNBLGtCQUFJb1ksS0FBSyxDQUFDamEsS0FBTixPQUFrQixDQUF0QixFQUF5QjtBQUNyQixvQkFBSSxDQUFDaWEsS0FBSyxDQUFDdEksUUFBTixDQUFlLFlBQWYsQ0FBTCxFQUFtQztBQUMvQixzQkFBSW9CLEVBQUUsS0FBSyxDQUFYLEVBQWM7QUFDVjlQLG9CQUFBQSxLQUFLLENBQUNpWCxVQUFOLENBQWlCRCxLQUFLLENBQUMxYyxJQUFOLENBQVcsUUFBWCxDQUFqQjtBQUNIO0FBQ0osaUJBSkQsTUFJTztBQUNILHNCQUFJd1YsRUFBRSxLQUFLLENBQVgsRUFBYztBQUNWOVAsb0JBQUFBLEtBQUssQ0FBQ2lYLFVBQU4sQ0FBaUJELEtBQUssQ0FBQzFjLElBQU4sQ0FBVyxRQUFYLENBQWpCO0FBQ0g7QUFFSjs7QUFDRCxvQkFBSXdWLEVBQUUsS0FBSyxDQUFYLEVBQWM7QUFDVjlQLGtCQUFBQSxLQUFLLENBQUNpWCxVQUFOLENBQWlCRCxLQUFLLENBQUMxYyxJQUFOLENBQVcsUUFBWCxDQUFqQjtBQUVIO0FBQ0o7QUFDSixhQWxCRDtBQW9CQVAsWUFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRdVUsT0FBUixDQUFnQixRQUFoQixFQUEwQnBDLElBQTFCO0FBRUgsV0ExQkQ7QUE0Qkg7QUFFSjs7QUFDRGxNLE1BQUFBLEtBQUssQ0FBQ0MsSUFBTixDQUFXekYsUUFBWCxJQUF1QndGLEtBQUssQ0FBQ3pGLFFBQU4sQ0FBZSxLQUFLMEYsSUFBTCxDQUFVekYsUUFBekIsQ0FBdkI7QUFJSCxLQTNFRDs7QUE4RUFvYyxJQUFBQSxPQUFPLENBQUN2WCxTQUFSLENBQWtCOUUsUUFBbEIsR0FBNkIsVUFBVWtOLEdBQVYsRUFBZTtBQUN4QzFOLE1BQUFBLENBQUMsQ0FBQyxNQUFNME4sR0FBUCxDQUFELENBQWFwSyxNQUFiLENBQW9CLEtBQUswSyxVQUF6Qjs7QUFDQSxVQUFJL0gsS0FBSyxHQUFHLElBQVo7O0FBQ0EsV0FBS0MsSUFBTCxDQUFVMEIsT0FBVixDQUFrQnBHLE9BQWxCLENBQTBCLFVBQVVxRCxJQUFWLEVBQWdCN0IsS0FBaEIsRUFBdUI7QUFDN0MsWUFBSW1hLEdBQUcsR0FBRyxLQUFWOztBQUNBLFlBQUlsWCxLQUFLLENBQUNDLElBQU4sQ0FBV3VXLFdBQVgsS0FBMkJ6WixLQUEvQixFQUFzQztBQUNsQ21hLFVBQUFBLEdBQUcsR0FBRyxJQUFOO0FBQ0g7O0FBQ0RyWSxRQUFBQSxPQUFPLENBQUNzWSxHQUFSLENBQVlELEdBQVo7O0FBQ0FsWCxRQUFBQSxLQUFLLENBQUNvWCxPQUFOLENBQWN4WSxJQUFkLEVBQW9Cc1ksR0FBcEI7QUFFSCxPQVJEO0FBU0EsVUFBSXJILEdBQUcsR0FBRyxLQUFLOUgsVUFBTCxDQUFnQnZJLElBQWhCLENBQXFCLHVCQUFyQixDQUFWO0FBR0EsVUFBSTZYLEtBQUssR0FBR3hILEdBQUcsQ0FBQ3BRLEVBQUosQ0FBT08sS0FBSyxDQUFDQyxJQUFOLENBQVd1VyxXQUFsQixFQUErQmxjLElBQS9CLENBQW9DLFFBQXBDLENBQVo7O0FBQ0EwRixNQUFBQSxLQUFLLENBQUNzWCxVQUFOLENBQWlCRCxLQUFqQjs7QUFFQSxXQUFLOU0sT0FBTCxDQUFhbEssTUFBYixDQUFvQixLQUFwQixFQWxCd0MsQ0FtQnhDOztBQUNBLFdBQUtrSyxPQUFMLENBQWFsSyxNQUFiLENBQW9CLEtBQXBCLEVBQTJCLEtBQUtKLElBQUwsQ0FBVXNMLE1BQXJDLEVBcEJ3QyxDQXFCeEM7O0FBQ0EsV0FBS2pQLEVBQUw7QUFDQSxhQUFPLElBQVA7QUFDSCxLQXhCRDs7QUEyQkEsYUFBU2liLE1BQVQsQ0FBZ0JDLFFBQWhCLEVBQTBCO0FBQ3RCLFVBQUlDLEtBQUssR0FBR0QsUUFBUSxDQUFDL1UsS0FBVCxLQUFtQixFQUEvQjtBQUNBLFVBQUlpVixPQUFPLEdBQUdGLFFBQVEsQ0FBQ2hZLElBQVQsQ0FBYyxJQUFkLEVBQW9CQyxFQUFwQixDQUF1QixDQUF2QixFQUEwQmtZLFVBQTFCLEVBQWQ7QUFDQSxVQUFJQyxPQUFPLEdBQUdKLFFBQVEsQ0FBQ0ssSUFBVCxLQUFrQkwsUUFBUSxDQUFDSyxJQUFULEdBQWdCRixVQUFoQixFQUFsQixHQUFpRCxDQUEvRDtBQUNBLFVBQUlHLEdBQUcsR0FBRyxHQUFWO0FBQ0EsVUFBSUMsS0FBSyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV1IsS0FBSyxHQUFHQyxPQUFSLEdBQWtCRSxPQUE3QixJQUF3Q0UsR0FBcEQsQ0FMc0IsQ0FNdEI7O0FBQ0EsYUFBT0UsSUFBSSxDQUFDQyxLQUFMLENBQVdGLEtBQVgsQ0FBUDtBQUNIOztBQUFBO0FBSUQsUUFBSUcsTUFBTSxHQUFHLENBQUMsQ0FBZCxDQTVLK0IsQ0E4Sy9COztBQUNBdEIsSUFBQUEsT0FBTyxDQUFDdlgsU0FBUixDQUFrQitYLE9BQWxCLEdBQTRCLFVBQVU3WSxHQUFWLEVBQWU0WixLQUFmLEVBQXNCO0FBQzlDLFVBQUl6SCxTQUFTLEdBQUduUCxTQUFTLENBQUMwQixRQUFWLEVBQWhCO0FBRUExRSxNQUFBQSxHQUFHLENBQUN4QyxLQUFKLGtDQUFrQ3dDLEdBQUcsQ0FBQ3hDLEtBQXRDOztBQUNBLFVBQUlpRSxLQUFLLEdBQUcsSUFBWjs7QUFFQSxVQUFHLENBQUNtWSxLQUFKLEVBQVU7QUFDTkEsUUFBQUEsS0FBSyxHQUFDLElBQU47QUFFSDs7QUFDRCxVQUFJQyxRQUFRLEdBQUdELEtBQWYsQ0FWOEMsQ0FhOUM7O0FBQ0EsV0FBS3RCLFFBQUwsR0FBZ0IsS0FBSzlPLFVBQUwsQ0FBZ0J2SSxJQUFoQixDQUFxQixnQ0FBckIsRUFBdUR6QyxLQUF2RCxFQUFoQjtBQUVBLFVBQUk4UyxHQUFHLEdBQUcsS0FBSzlILFVBQUwsQ0FBZ0J2SSxJQUFoQixDQUFxQixxQkFBckIsQ0FBVixDQWhCOEMsQ0FpQjlDOztBQUNBLFVBQUk2WSxLQUFLLEdBQUdDLE1BQU0sQ0FBQ3pJLEdBQUcsQ0FBQzNULE1BQUwsQ0FBbEI7QUFFQSxVQUFJcWMsTUFBTSxHQUFHO0FBQ1R4YyxRQUFBQSxLQUFLLGtEQURJO0FBRVQ0RixRQUFBQSxPQUFPLEVBQUUsRUFGQTtBQUdUdEgsUUFBQUEsRUFBRSxFQUFFLFNBQVNzSixNQUFNLENBQUNDLGNBQVAsRUFISjtBQUlUaVIsUUFBQUEsTUFBTSxFQUFDO0FBSkUsT0FBYjtBQU9BLFVBQUk1VSxJQUFJLEdBQUdsRyxDQUFDLENBQUNZLE1BQUYsQ0FBUyxJQUFULEVBQWU0ZCxNQUFmLEVBQXVCaGEsR0FBdkIsQ0FBWDs7QUFHQSxVQUFJMEIsSUFBSSxDQUFDYyxHQUFMLElBQVUsQ0FBQ2QsSUFBSSxDQUFDNFUsTUFBcEIsRUFBNEI7QUFDMUJsUixRQUFBQSxNQUFNLENBQUM2VSxJQUFQLENBQVk7QUFDVHJYLFVBQUFBLElBQUksRUFBRSxLQURHO0FBRVRKLFVBQUFBLEdBQUcsRUFBRWQsSUFBSSxDQUFDYyxHQUZEO0FBR1RpUSxVQUFBQSxRQUFRLEVBQUUsTUFIRDtBQUlUcFAsVUFBQUEsT0FBTyxFQUFFNlcsUUFKQTtBQUtUM1osVUFBQUEsS0FBSyxFQUFFLGVBQVVvVyxjQUFWLEVBQTBCQyxVQUExQixFQUFzQ0MsV0FBdEMsRUFBbUQ7QUFDdkQ3VSxZQUFBQSxLQUFLLENBQUMrQixHQUFOLENBQVUsUUFBVjtBQUNBb08sWUFBQUEsU0FBUztBQUNYO0FBUlEsU0FBWjtBQWNELE9BZkQsTUFlTSxJQUFHelEsSUFBSSxDQUFDcUcsUUFBTCxJQUFlLENBQUNyRyxJQUFJLENBQUM0VSxNQUF4QixFQUErQjtBQUNqQzRELFFBQUFBLFFBQVEsQ0FBQ3hZLElBQUksQ0FBQ3FHLFFBQU4sQ0FBUjtBQUVILE9BSEssTUFHRDtBQUNEO0FBRUFyRyxRQUFBQSxJQUFJLENBQUNxRyxRQUFMLHdFQUF1RXJHLElBQUksQ0FBQ2MsR0FBNUU7QUFDQTBYLFFBQUFBLFFBQVEsQ0FBQ3hZLElBQUksQ0FBQ3FHLFFBQU4sQ0FBUjtBQUNBb0ssUUFBQUEsU0FBUztBQUNUO0FBQ0g7O0FBRUQxUSxNQUFBQSxLQUFLLENBQUM2VyxRQUFOLEdBQWlCcUIsTUFBTSxHQUFHbFksS0FBSyxDQUFDK0gsVUFBTixDQUFpQnZJLElBQWpCLENBQXNCLDhCQUF0QixFQUFzRHpDLEtBQXRELEVBQTFCOztBQUdBLGVBQVMwYixRQUFULENBQW1CemQsSUFBbkIsRUFBeUI7QUFFcEIsWUFBSTtBQUNEaUYsVUFBQUEsSUFBSSxDQUFDMEIsT0FBTCxHQUFhM0csSUFBYjs7QUFDQWdGLFVBQUFBLEtBQUssQ0FBQ3VLLE9BQU4sQ0FBY21PLE1BQWQsQ0FBcUIxWSxLQUFLLENBQUNDLElBQU4sQ0FBV3NMLE1BQWhDLEVBQXdDdEwsSUFBeEM7O0FBRUFtWSxVQUFBQSxRQUFRLElBQUlwWSxLQUFLLENBQUNzWCxVQUFOLENBQWlCclgsSUFBSSxDQUFDNUYsRUFBdEIsQ0FBWjtBQUNELFNBTEYsQ0FLRyxPQUFPdUMsQ0FBUCxFQUFVO0FBQ1ZpQyxVQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBY2xDLENBQUMsQ0FBQ3VDLElBQUYsR0FBUyxJQUFULEdBQWdCdkMsQ0FBQyxDQUFDK2IsT0FBaEM7QUFDQTlaLFVBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjbEMsQ0FBQyxDQUFDZ2MsS0FBaEI7QUFDRCxTQVJGLFNBU1U7QUFDVDVZLFVBQUFBLEtBQUssQ0FBQytILFVBQU4sQ0FBaUJ2SSxJQUFqQixDQUFzQixvQ0FBdEIsRUFBNERsRixJQUE1RCxDQUFpRSxXQUFqRSxFQUE4RSxFQUE5RTs7QUFDQSxjQUFJeWQsS0FBSyxHQUFHUixNQUFNLENBQUN2WCxLQUFLLENBQUMrSCxVQUFOLENBQWlCdkksSUFBakIsQ0FBc0Isa0JBQXRCLENBQUQsQ0FBbEI7QUFDQzZZLFVBQUFBLEtBQUssR0FBR04sS0FBUixJQUFpQmxJLEdBQUcsQ0FBQ3BRLEVBQUosQ0FBTyxDQUFQLENBQWxCLElBQWdDTyxLQUFLLENBQUNpWCxVQUFOLENBQWlCcEgsR0FBRyxDQUFDcFEsRUFBSixDQUFPLENBQVAsRUFBVW5GLElBQVYsQ0FBZSxRQUFmLENBQWpCLENBQWhDO0FBQ0FvVyxVQUFBQSxTQUFTO0FBQ1Y7QUFDSixPQTdFNkMsQ0FzRmhEOztBQUVELEtBeEZELENBL0srQixDQTJRL0I7OztBQUNBa0csSUFBQUEsT0FBTyxDQUFDdlgsU0FBUixDQUFrQmlZLFVBQWxCLEdBQStCLFVBQVVELEtBQVYsRUFBaUI3YSxRQUFqQixFQUEyQjtBQUV0RCxVQUFJbkMsRUFBSjtBQUNBLFVBQUl3ZSxHQUFHLEdBQUcsa0JBQVY7QUFDQSxVQUFJQyxNQUFKOztBQUNBLFVBQUlELEdBQUcsQ0FBQzdMLElBQUosQ0FBU3FLLEtBQVQsQ0FBSixFQUFxQjtBQUNqQjtBQUNBeUIsUUFBQUEsTUFBTSxHQUFHLEtBQUsvUSxVQUFMLENBQWdCdkksSUFBaEIsQ0FBcUIscUJBQXJCLEVBQTRDQyxFQUE1QyxDQUErQzRYLEtBQS9DLENBQVQ7QUFDQWhkLFFBQUFBLEVBQUUsR0FBR3llLE1BQU0sQ0FBQ3hlLElBQVAsQ0FBWSxRQUFaLENBQUw7QUFDSCxPQUpELE1BSU87QUFDSEQsUUFBQUEsRUFBRSxHQUFHZ2QsS0FBTDtBQUNBeUIsUUFBQUEsTUFBTSxHQUFHLEtBQUsvUSxVQUFMLENBQWdCdkksSUFBaEIsQ0FBcUIsaUNBQWlDbkYsRUFBakMsR0FBc0MsSUFBM0QsQ0FBVDtBQUNIOztBQUNENmQsTUFBQUEsTUFBTSxHQUFHLEtBQUtuUSxVQUFMLENBQWdCdkksSUFBaEIsQ0FBcUIsOEJBQXJCLEVBQXFEekMsS0FBckQsRUFBVDtBQUNBLFdBQUt3TixPQUFMLENBQWF3TyxTQUFiLENBQXVCLEtBQUs5WSxJQUFMLENBQVVzTCxNQUFqQyxFQUF5Q2xSLEVBQXpDLEVBZHNELENBZ0J0RDs7QUFDQSxXQUFLd2MsUUFBTCxHQUFnQnFCLE1BQWhCLENBakJzRCxDQWtCdEQ7O0FBRUEsVUFBSSxLQUFLalksSUFBTCxDQUFVOFcsTUFBZCxFQUFzQjtBQUVsQixhQUFLaFAsVUFBTCxDQUFnQnZJLElBQWhCLENBQXFCLHFDQUFyQixFQUE0RGxGLElBQTVELENBQWlFLFdBQWpFLEVBQThFLEVBQTlFO0FBQ0EsWUFBSTBlLElBQUksR0FBRyxLQUFLalIsVUFBTCxDQUFnQnZJLElBQWhCLENBQXFCLGdEQUFyQixDQUFYOztBQUdBLFlBQUl3WixJQUFJLENBQUNqYyxLQUFMLEtBQWUsS0FBSzhaLFFBQXhCLEVBQWtDO0FBQzlCO0FBRUFtQyxVQUFBQSxJQUFJLENBQUMxZSxJQUFMLENBQVUsV0FBVixFQUF1QixNQUF2QjtBQUErQjtBQUVsQyxTQUxELE1BS08sSUFBSTBlLElBQUksQ0FBQ2pjLEtBQUwsTUFBZ0IsS0FBSzhaLFFBQXpCLEVBQW1DO0FBRXRDLGlCQUFPLEtBQVA7QUFDSCxTQUhNLE1BR0E7QUFDSDtBQUNBLGVBQUt0TSxPQUFMLENBQWF3TyxTQUFiLENBQXVCLEtBQUs5WSxJQUFMLENBQVVzTCxNQUFqQyxFQUF5Q2xSLEVBQXpDO0FBQ0EyZSxVQUFBQSxJQUFJLENBQUMxZSxJQUFMLENBQVUsV0FBVixFQUF1QixPQUF2QjtBQUVIOztBQUlEbVYsUUFBQUEsVUFBVSxDQUFDLFlBQVk7QUFFbkJ1SixVQUFBQSxJQUFJLENBQUMxZSxJQUFMLENBQVUsV0FBVixFQUF1QixFQUF2QjtBQUVILFNBSlMsRUFJUCxLQUFLMkYsSUFBTCxDQUFVNlcsSUFKSCxDQUFWO0FBT0g7O0FBQUE7O0FBQ0QsVUFBSSxPQUFPdGEsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNoQ0EsUUFBQUEsUUFBUSxDQUFDc2MsTUFBRCxDQUFSO0FBQ0g7O0FBQUE7QUFFRCxhQUFPLElBQVA7QUFDSCxLQXhERCxDQTVRK0IsQ0FzVS9COzs7QUFDQWxDLElBQUFBLE9BQU8sQ0FBQ3ZYLFNBQVIsQ0FBa0I0WCxVQUFsQixHQUErQixVQUFVSSxLQUFWLEVBQWlCO0FBQzVDLFdBQUs5TSxPQUFMLENBQWEwTyxTQUFiLENBQXVCLEtBQUtoWixJQUFMLENBQVVzTCxNQUFqQyxFQUF5QzhMLEtBQXpDLEVBRDRDLENBQ0s7O0FBQ2pELGFBQU8sSUFBUDtBQUNILEtBSEQ7O0FBTUFULElBQUFBLE9BQU8sQ0FBQ3ZYLFNBQVIsQ0FBa0JrTCxPQUFsQixHQUE0QjVLLEtBQUssQ0FBQzRLLE9BQWxDOztBQUVBcU0sSUFBQUEsT0FBTyxDQUFDdlgsU0FBUixDQUFrQi9DLEVBQWxCLEdBQXVCLFVBQVVFLFFBQVYsRUFBb0IwYyxTQUFwQixFQUErQjtBQUVsRCxVQUFJbFosS0FBSyxHQUFHLElBQVo7O0FBQ0EsVUFBSWtaLFNBQVMsSUFBSSxJQUFqQixFQUF1QjtBQUNuQixhQUFLM08sT0FBTCxDQUFhak8sRUFBYixDQUFnQjRjLFNBQVMsR0FBRyxHQUFaLEdBQWtCLEtBQUtqWixJQUFMLENBQVVzTCxNQUE1QixHQUFxQyxHQUFyRCxFQUEwRCxVQUFVdlEsSUFBVixFQUFnQjtBQUN0RSxjQUFJLE9BQU93QixRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2hDQSxZQUFBQSxRQUFRLENBQUN4QixJQUFELENBQVI7QUFDSDs7QUFDRGdGLFVBQUFBLEtBQUssQ0FBQzZXLFFBQU4sR0FBaUI3YixJQUFJLENBQUMrQixLQUF0QjtBQUVILFNBTkQ7QUFPSCxPQVJELE1BUU87QUFDSCxhQUFLd04sT0FBTCxDQUFhak8sRUFBYixDQUFnQixTQUFTLEtBQUsyRCxJQUFMLENBQVVzTCxNQUFuQixHQUE0QixHQUE1QyxFQUFpRCxVQUFVdlEsSUFBVixFQUFnQjtBQUU3RCxjQUFJLE9BQU93QixRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2hDQSxZQUFBQSxRQUFRLENBQUN4QixJQUFELENBQVI7QUFDSDs7QUFDRGdGLFVBQUFBLEtBQUssQ0FBQzZXLFFBQU4sR0FBaUI3YixJQUFJLENBQUMrQixLQUF0QjtBQUNILFNBTkQ7QUFRSDs7QUFFRCxhQUFPaUQsS0FBUDtBQUNILEtBdkJEOztBQTRCQXpDLElBQUFBLE1BQU0sQ0FBQzRiLE9BQVAsR0FBaUJ2QyxPQUFqQjs7QUFFQTdjLElBQUFBLENBQUMsQ0FBQ0MsRUFBRixDQUFLb2YsV0FBTCxHQUFtQixVQUFVbGYsT0FBVixFQUFtQjtBQUNsQyxVQUFJRyxFQUFFLEdBQUdOLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sSUFBUixDQUFhLElBQWIsQ0FBVDtBQUNBLGFBQU8sSUFBSXNjLE9BQUosQ0FBWTFjLE9BQVosRUFBcUJLLFFBQXJCLENBQThCRixFQUE5QixDQUFQO0FBRUgsS0FKRDtBQU1ILEdBblhEO0FBc1hILENBelhELEVBeVhHbUQsTUF6WEgsRUF5WFdtQyxLQXpYWDs7Ozs7QUNEQTs7QUFDQSxDQUFDLFVBQVU1RixDQUFWLEVBQWE7QUFFVjtBQUdBLE1BQUlpWSxJQUFJLEdBQUdqWSxDQUFDLENBQUNDLEVBQUYsQ0FBS3FmLEtBQWhCOztBQUdBLE1BQUlyTyxPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFVL0ssSUFBVixFQUFnQjtBQUMxQixRQUFJdUIsS0FBSyxHQUFHbUMsTUFBTSxDQUFDVixRQUFQLEVBQVo7QUFDQSxRQUFJMUUsR0FBRyxHQUFHLEVBQVYsQ0FGMEIsQ0FHMUI7O0FBQ0EwQixJQUFBQSxJQUFJLENBQUMyQixPQUFMLEdBQWEsVUFBVWtQLEdBQVYsRUFBZTtBQUN4QjtBQUNJLFVBQUlBLEdBQUcsQ0FBQ2xQLE9BQVIsRUFBaUI7QUFDYjtBQUNBckQsUUFBQUEsR0FBRyxHQUFHdVMsR0FBRyxDQUFDOVYsSUFBSixDQUFTaUUsR0FBVCxDQUFhLFVBQVVMLElBQVYsRUFBZ0I7QUFDL0JBLFVBQUFBLElBQUksQ0FBQzBhLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxpQkFBTzFhLElBQVA7QUFFSCxTQUpLLENBQU47QUFNSCxPQVJELE1BUU87QUFDSDJCLFFBQUFBLEtBQUssQ0FBQytCLEdBQU4sQ0FBVSxTQUFWO0FBQ0g7O0FBQ0RkLE1BQUFBLEtBQUs7QUFDWixLQWREOztBQWVBdkIsSUFBQUEsSUFBSSxDQUFDbkIsS0FBTCxHQUFXLFlBQVU7QUFDakIwQyxNQUFBQSxLQUFLO0FBQ1AsS0FGRjs7QUFHQW1DLElBQUFBLE1BQU0sQ0FBQ2tOLFFBQVAsQ0FBZ0I1USxJQUFoQjtBQUVBLFdBQU8xQixHQUFQO0FBQ0gsR0F6QkQ7O0FBOEJBLFdBQVNnYixNQUFULENBQWdCaGEsS0FBaEIsRUFBdUJpYSxNQUF2QixFQUErQkMsUUFBL0IsRUFBeUM7QUFDckM7QUFDQTVhLElBQUFBLE9BQU8sQ0FBQ3NZLEdBQVIsQ0FBWXFDLE1BQVo7O0FBQ0EsUUFBSSxDQUFDQyxRQUFRLENBQUNDLEdBQWQsRUFBbUI7QUFHZixVQUFJbmIsR0FBRyxHQUFHLEtBQUtvYixXQUFMLENBQWlCSCxNQUFqQixDQUFWO0FBQ0EsVUFBSUksS0FBSyxHQUFHcmIsR0FBRyxDQUFDc2IsUUFBSixFQUFaOztBQUNBLFdBQUssSUFBSS9NLEdBQVQsSUFBZ0I4TSxLQUFoQixFQUF1QjtBQUNuQixZQUFJRSxFQUFFLEdBQUdGLEtBQUssQ0FBQzlNLEdBQUQsQ0FBZDs7QUFDQSxZQUFJZ04sRUFBRSxDQUFDSixHQUFILElBQVVELFFBQVEsQ0FBQ0MsR0FBdkIsRUFBNEI7QUFDeEJuYixVQUFBQSxHQUFHLENBQUN3YixVQUFKLENBQWVELEVBQWYsRUFBbUIsS0FBbkIsRUFBMEIsS0FBMUIsRUFBaUMsS0FBakM7QUFFSCxTQUhELE1BR087QUFDSHZiLFVBQUFBLEdBQUcsQ0FBQ3diLFVBQUosQ0FBZUQsRUFBZixFQUFtQixJQUFuQjtBQUNIO0FBQ0o7QUFDSjs7QUFBQTtBQUVKOztBQUdELE1BQUlFLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQVV2UyxHQUFWLEVBQWV2TixPQUFmLEVBQXdCO0FBQ25DLFFBQUk4RixLQUFLLEdBQUcsSUFBWjs7QUFDQSxRQUFJdEYsTUFBTSxHQUFHO0FBQ1R1ZixNQUFBQSxRQUFRLEVBQUMsSUFEQTtBQUVUaFosTUFBQUEsSUFBSSxFQUFFLEVBRkc7QUFHVGlaLE1BQUFBLE9BQU8sRUFBRSxLQUhBO0FBSVRDLE1BQUFBLFFBQVEsRUFBQztBQUNMeFQsUUFBQUEsTUFBTSxFQUFDLEtBREY7QUFFTC9LLFFBQUFBLEdBQUcsRUFBQztBQUZDLE9BSkE7QUFRVHBCLE1BQUFBLFFBQVEsRUFBRSxJQVJEO0FBU1Q0ZixNQUFBQSxPQUFPLEVBQUMsSUFUQztBQVVUQyxNQUFBQSxRQUFRLEVBQUMsS0FWQTtBQVdUQyxNQUFBQSxPQUFPLEVBQUU7QUFDTGQsUUFBQUEsTUFBTSxFQUFFN1YsTUFBTSxDQUFDQyxjQUFQLEVBREg7QUFFTDJXLFFBQUFBLElBQUksRUFBRTtBQUNGQyxVQUFBQSxhQUFhLEVBQUU7QUFEYixTQUZEO0FBTUx4ZixRQUFBQSxJQUFJLEVBQUU7QUFDRjhSLFVBQUFBLEdBQUcsRUFBRTtBQUNEL1EsWUFBQUEsS0FBSyxFQUFFO0FBRE4sV0FESDtBQUlGMGUsVUFBQUEsVUFBVSxFQUFFO0FBQ1JDLFlBQUFBLE1BQU0sRUFBRSxJQURBO0FBRVJDLFlBQUFBLEtBQUssRUFBRSxRQUZDO0FBR1JDLFlBQUFBLE1BQU0sRUFBRSxjQUhBO0FBSVJDLFlBQUFBLE9BQU8sRUFBRSxHQUpEO0FBS1J4Z0IsWUFBQUEsRUFBRSxFQUFFO0FBTEk7QUFKVixTQU5EO0FBa0JMbUMsUUFBQUEsUUFBUSxFQUFFLENBQ1Q7QUFEUztBQWxCTDtBQVhBLEtBQWI7QUFxQ0EsUUFBSWlMLEdBQUosRUFBU0csR0FBVCxFQUFjcU0sTUFBZCxDQXZDbUMsQ0F3Q25DOztBQUNBLFFBQUlwTSxTQUFTLENBQUMzTCxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCMEwsTUFBQUEsR0FBRyxHQUFHQyxTQUFTLENBQUMsQ0FBRCxDQUFmOztBQUNBLFVBQUksUUFBT0QsR0FBUCxNQUFlLFFBQW5CLEVBQTZCO0FBQ3pCNUgsUUFBQUEsS0FBSyxDQUFDQyxJQUFOLEdBQWFsRyxDQUFDLENBQUNZLE1BQUYsQ0FBUyxJQUFULEVBQWVELE1BQWYsRUFBdUJrTixHQUF2QixDQUFiOztBQUNBLFlBQUlBLEdBQUcsQ0FBQzBTLE9BQUosSUFBZTFTLEdBQUcsQ0FBQzBTLE9BQUosQ0FBWTlkLFFBQS9CLEVBQXlDO0FBQ3JDLGNBQUksT0FBT29MLEdBQUcsQ0FBQzBTLE9BQUosQ0FBWTlkLFFBQVosQ0FBcUJzZSxRQUE1QixLQUF5QyxVQUE3QyxFQUF5RDtBQUNyRDlhLFlBQUFBLEtBQUssQ0FBQ0MsSUFBTixDQUFXcWEsT0FBWCxDQUFtQjlkLFFBQW5CLENBQTRCc2UsUUFBNUIsR0FBdUMsVUFBVXZiLEtBQVYsRUFBaUJpYSxNQUFqQixFQUF5QkMsUUFBekIsRUFBbUM7QUFDdEVGLGNBQUFBLE1BQU0sQ0FBQ3dCLElBQVAsQ0FBWS9hLEtBQVosRUFBbUJULEtBQW5CLEVBQTBCaWEsTUFBMUIsRUFBa0NDLFFBQWxDO0FBQ0E3UixjQUFBQSxHQUFHLENBQUMwUyxPQUFKLENBQVk5ZCxRQUFaLENBQXFCc2UsUUFBckIsQ0FBOEJ2YixLQUE5QixFQUFxQ2lhLE1BQXJDLEVBQTZDQyxRQUE3QztBQUNILGFBSEQ7QUFJSDs7QUFBQTtBQUNKOztBQUFBOztBQUNGLFlBQUksQ0FBQ3paLEtBQUssQ0FBQ0MsSUFBTixDQUFXK2EsT0FBWixJQUFzQmhiLEtBQUssQ0FBQ0MsSUFBTixDQUFXZ2EsUUFBckMsRUFBK0M7QUFFOUNqYSxVQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBV21hLE9BQVgsR0FBcUJwUCxPQUFPLENBQUNoTCxLQUFLLENBQUNDLElBQU4sQ0FBV2dhLFFBQVosQ0FBNUI7QUFHQTtBQUVIO0FBQ0osS0FwQkQsTUFvQk8sSUFBSXBTLFNBQVMsQ0FBQzNMLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDL0J1TCxNQUFBQSxHQUFHLEdBQUdJLFNBQVMsQ0FBQyxDQUFELENBQWY7QUFDQUQsTUFBQUEsR0FBRyxHQUFHQyxTQUFTLENBQUMsQ0FBRCxDQUFmO0FBRUg7O0FBQ0Q3SCxJQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBV3pGLFFBQVgsSUFBdUJ3RixLQUFLLENBQUN6RixRQUFOLENBQWUsS0FBSzBGLElBQUwsQ0FBVXpGLFFBQXpCLENBQXZCLENBbEVtQyxDQW9FbkM7O0FBR0FpVixJQUFBQSxVQUFVLENBQUNsUyxNQUFNLENBQUMwZCxRQUFQLEdBQWdCLFlBQVU7QUFDakMsVUFBSUMsSUFBSSxHQUFFbmhCLENBQUMsQ0FBQyxNQUFJaUcsS0FBSyxDQUFDQyxJQUFOLENBQVd6RixRQUFoQixDQUFYO0FBQ0EsVUFBSTJnQixnQkFBZ0IsR0FBQyxDQUFyQjs7QUFDQSxVQUFHbmIsS0FBSyxDQUFDb2IsV0FBVCxFQUFxQjtBQUNqQkQsUUFBQUEsZ0JBQWdCLEdBQUVuYixLQUFLLENBQUNvYixXQUFOLENBQWtCMVksTUFBbEIsRUFBbEI7QUFFSDs7QUFFRCxVQUFJMlksWUFBWSxHQUFFbE8sUUFBUSxDQUFDK04sSUFBSSxDQUFDak4sTUFBTCxHQUFjdkwsTUFBZCxLQUF1QnlZLGdCQUF4QixDQUExQjtBQUNBRCxNQUFBQSxJQUFJLENBQUMxYixJQUFMLENBQVUsUUFBVixFQUFvQjhiLEdBQXBCLENBQXdCO0FBQUMsaUJBQVEsTUFBVDtBQUFnQixrQkFBU0QsWUFBekI7QUFBc0Msc0JBQWMsTUFBcEQ7QUFBMkQseUJBQWdCO0FBQTNFLE9BQXhCO0FBQ0gsS0FWUyxFQVVSLENBVlEsQ0FBVjtBQWNILEdBckZELENBNURVLENBbUpWOzs7QUFDQSxPQUFLLElBQUl2TyxHQUFULElBQWdCa0YsSUFBaEIsRUFBc0I7QUFDbEJnSSxJQUFBQSxRQUFRLENBQUMzYSxTQUFULENBQW1CeU4sR0FBbkIsSUFBMEJrRixJQUFJLENBQUNsRixHQUFELENBQTlCO0FBQ0g7O0FBRURrTixFQUFBQSxRQUFRLENBQUMzYSxTQUFULENBQW1COUUsUUFBbkIsR0FBOEIsVUFBVWtOLEdBQVYsRUFBZTtBQUM1QzFOLElBQUFBLENBQUMsQ0FBQyxNQUFNME4sR0FBUCxDQUFELENBQWFoQyxLQUFiOztBQUNHLFFBQUl6RixLQUFLLEdBQUcsSUFBWjs7QUFDQSxTQUFLQyxJQUFMLENBQVVnQixJQUFWLElBQWtCbEgsQ0FBQyxDQUFDLE1BQU0wTixHQUFQLENBQUQsQ0FBYW1ILFFBQWIsQ0FBc0IsS0FBSzNPLElBQUwsQ0FBVWdCLElBQWhDLENBQWxCO0FBRUEsUUFBSXNhLEtBQUssR0FBR3hoQixDQUFDLENBQUMsTUFBRCxFQUFTO0FBQ2xCeWhCLE1BQUFBLEtBQUssRUFBRSxPQURXO0FBRWxCbmhCLE1BQUFBLEVBQUUsRUFBRTJGLEtBQUssQ0FBQ0MsSUFBTixDQUFXcWEsT0FBWCxDQUFtQmQ7QUFGTCxLQUFULENBQWI7QUFNQSxTQUFLaUMsT0FBTCxHQUFlLEtBQUs5VyxJQUFMLENBQVU0VyxLQUFWLEVBQWlCLEtBQUt0YixJQUFMLENBQVVxYSxPQUEzQixFQUFvQyxLQUFLcmEsSUFBTCxDQUFVbWEsT0FBOUMsQ0FBZixDQVh5QyxDQVl6Qzs7QUFDQSxTQUFLbmEsSUFBTCxDQUFVb2EsUUFBVixJQUFxQixLQUFLb0IsT0FBTCxDQUFhMUIsVUFBYixDQUF3QixLQUFLMEIsT0FBTCxDQUFhNUIsUUFBYixHQUF3QixDQUF4QixDQUF4QixFQUFvRCxJQUFwRCxFQUEwRCxLQUExRCxFQUFpRSxJQUFqRSxFQUFzRSxJQUF0RSxDQUFyQjs7QUFFQSxRQUFJLEtBQUs1WixJQUFMLENBQVVpYSxPQUFkLEVBQXVCO0FBQ25CbGEsTUFBQUEsS0FBSyxDQUFDMGIsVUFBTixHQUFtQkMsUUFBUSxDQUFDM2IsS0FBRCxDQUEzQjtBQUNBakcsTUFBQUEsQ0FBQyxDQUFDLE1BQU0wTixHQUFQLENBQUQsQ0FBYXBLLE1BQWIsQ0FBb0IyQyxLQUFLLENBQUMwYixVQUExQjtBQUNIOztBQUNELFFBQUksS0FBS3piLElBQUwsQ0FBVWthLFFBQVYsQ0FBbUJ4VCxNQUFuQixJQUE2QixLQUFLMUcsSUFBTCxDQUFVa2EsUUFBVixDQUFtQnZlLEdBQWhELElBQXFELEtBQUtxRSxJQUFMLENBQVVrYSxRQUFWLENBQW1CdmUsR0FBbkIsQ0FBdUJNLE1BQXZCLEdBQThCLENBQXZGLEVBQTBGO0FBQ3RGOEQsTUFBQUEsS0FBSyxDQUFDb2IsV0FBTixHQUFvQlEsU0FBUyxDQUFDNWIsS0FBRCxDQUE3QjtBQUNBakcsTUFBQUEsQ0FBQyxDQUFDLE1BQU0wTixHQUFQLENBQUQsQ0FBYXBLLE1BQWIsQ0FBb0IyQyxLQUFLLENBQUNvYixXQUExQjtBQUNIOztBQUdHcmhCLElBQUFBLENBQUMsQ0FBQyxNQUFNME4sR0FBUCxDQUFELENBQWFwSyxNQUFiLENBQW9Ca2UsS0FBcEI7QUFHSixXQUFPLElBQVA7QUFDSCxHQTdCRDs7QUE4QkEsTUFBSU0sUUFBUSxHQUFHLENBQWY7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtDQyxNQUFJQyxPQUFPLEdBQUc7QUFDVnpoQixJQUFBQSxFQUFFLEVBQUVzSixNQUFNLENBQUNDLGNBQVAsRUFETTtBQUVWekUsSUFBQUEsSUFBSSxFQUFFLEtBRkk7QUFHVjRjLElBQUFBLFFBQVEsRUFBRSxJQUhBO0FBSVZ0USxJQUFBQSxNQUFNLEVBQUUsUUFBUTlILE1BQU0sQ0FBQ0MsY0FBUCxFQUpOO0FBS1Y0SCxJQUFBQSxZQUFZLEVBQUUsSUFMSjtBQU1WOEosSUFBQUEsV0FBVyxFQUFFLENBTkg7QUFPVnZGLElBQUFBLEtBQUssRUFBRSxDQVBHO0FBUVYySyxJQUFBQSxNQUFNLEVBQUUsSUFSRTtBQVNWL08sSUFBQUEsSUFBSSxFQUFFLEtBVEk7QUFVVkMsSUFBQUEsSUFBSSxFQUFFLEVBVkk7QUFXVmtLLElBQUFBLElBQUksRUFBRTtBQVhJLEdBQWQ7O0FBZUEsV0FBUzhGLFNBQVQsQ0FBbUI1YixLQUFuQixFQUF5QjtBQUNyQixRQUFJekIsR0FBRyxHQUFDeUIsS0FBSyxDQUFDQyxJQUFOLENBQVdrYSxRQUFYLENBQW9CdmUsR0FBNUI7QUFDQSxRQUFJQSxHQUFHLEdBQUc3QixDQUFDLHNGQUVSd0UsR0FBRyxDQUFDVSxHQUFKLENBQVEsVUFBU0wsSUFBVCxFQUFjO0FBRXRCLHFEQUFzQyxLQUFHTCxHQUFHLENBQUNyQyxNQUE3QyxtREFDdUIwQyxJQUFJLENBQUNxQyxJQUFMLEdBQVVyQyxJQUFJLENBQUNxQyxJQUFmLEdBQW9CLEVBRDNDLHFFQUVhckMsSUFBSSxDQUFDaUksSUFGbEIsb0JBRStCakksSUFBSSxDQUFDOUMsSUFGcEM7QUFJRCxLQU5DLEVBTUN5TCxJQU5ELENBTU0sRUFOTixDQUZRLGlDQUFYO0FBV0YsUUFBSThSLEtBQUssR0FBR3JaLEtBQUssQ0FBQ3liLE9BQWxCO0FBRUFsZCxJQUFBQSxHQUFHLENBQUNoRCxPQUFKLENBQVksVUFBU3FELElBQVQsRUFBYzdCLEtBQWQsRUFBb0I7QUFDOUJuQixNQUFBQSxHQUFHLENBQUM0RCxJQUFKLENBQVMsT0FBVCxFQUFrQkMsRUFBbEIsQ0FBcUIxQyxLQUFyQixFQUE0QnlDLElBQTVCLENBQWlDLEdBQWpDLEVBQXNDbVAsS0FBdEMsQ0FBNEMsVUFBVXBQLEtBQVYsRUFBaUI7QUFDekQsWUFBSXljLEtBQUssR0FBRzNDLEtBQUssQ0FBQzRDLGdCQUFOLEVBQVo7QUFDQSxZQUFJeEMsUUFBUSxHQUFHdUMsS0FBZjtBQUNBcGQsUUFBQUEsSUFBSSxDQUFDc2QsYUFBTCxJQUFxQnRkLElBQUksQ0FBQ3NkLGFBQUwsQ0FBbUIzYyxLQUFuQixFQUEwQjhaLEtBQTFCLEVBQWlDSSxRQUFqQyxDQUFyQjtBQUNILE9BSkQ7QUFPRCxLQVJEO0FBU0ksV0FBTzdkLEdBQVA7QUFFTDs7QUFFRCxXQUFTK2YsUUFBVCxDQUFrQjNiLEtBQWxCLEVBQXlCO0FBRVosUUFBSXBFLEdBQUcsR0FBRzdCLENBQUMsbzlCQUFYO0FBNkJULFdBQU82QixHQUFQO0FBQ0gsR0FyU1MsQ0F3U1Y7OztBQUNBLFdBQVNzSixHQUFULENBQWEzRixLQUFiLEVBQW9CO0FBQ2hCLFFBQUk4WixLQUFLLEdBQUcsS0FBS29DLE9BQWpCO0FBQ0EsUUFBSU8sS0FBSyxHQUFHM0MsS0FBSyxDQUFDNEMsZ0JBQU4sRUFBWjtBQUNBLFFBQUl4QyxRQUFRLEdBQUd1QyxLQUFLLENBQUMsQ0FBRCxDQUFwQjtBQUNBRixJQUFBQSxPQUFPLENBQUN0USxZQUFSLEdBQXVCaU8sUUFBUSxDQUFDaE8sTUFBaEM7QUFDQWdPLElBQUFBLFFBQVEsR0FBR0osS0FBSyxDQUFDOEMsUUFBTixDQUFlMUMsUUFBZixFQUF5QnFDLE9BQXpCLENBQVg7QUFDQXpDLElBQUFBLEtBQUssQ0FBQytDLFVBQU4sQ0FBaUIzQyxRQUFRLENBQUMsQ0FBRCxDQUF6QjtBQUVIOztBQUVELFdBQVNsVSxHQUFULENBQWFoRyxLQUFiLEVBQW9CO0FBQ2hCO0FBQ0EsUUFBSThaLEtBQUssR0FBRyxLQUFLb0MsT0FBakI7QUFFSDs7QUFFRGxlLEVBQUFBLE1BQU0sQ0FBQzhlLFFBQVAsR0FBa0JyQyxRQUFsQjtBQUdILENBNVRELEVBNFRHeGMsTUE1VEg7Ozs7O0FDREFrSyxJQUFJLENBQUNySSxTQUFMLENBQWVpZCxNQUFmLEdBQXdCLFVBQVVDLEdBQVYsRUFBZTtBQUFFO0FBQ3ZDLE1BQUlDLENBQUMsR0FBRztBQUNOLFVBQU0sS0FBS0MsUUFBTCxLQUFrQixDQURsQjtBQUNxQjtBQUMzQixVQUFNLEtBQUtDLE9BQUwsRUFGQTtBQUVnQjtBQUN0QixVQUFNLEtBQUtDLFFBQUwsRUFIQTtBQUdpQjtBQUN2QixVQUFNLEtBQUtDLFVBQUwsRUFKQTtBQUltQjtBQUN6QixVQUFNLEtBQUtDLFVBQUwsRUFMQTtBQUttQjtBQUN6QixVQUFNN0UsSUFBSSxDQUFDQyxLQUFMLENBQVcsQ0FBQyxLQUFLd0UsUUFBTCxLQUFrQixDQUFuQixJQUF3QixDQUFuQyxDQU5BO0FBTXVDO0FBQzdDLFNBQUssS0FBS0ssZUFBTCxFQVBDLENBT3NCOztBQVB0QixHQUFSO0FBU0EsTUFBSSxPQUFPOVAsSUFBUCxDQUFZdVAsR0FBWixDQUFKLEVBQXNCQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ2xTLE9BQUosQ0FBWW9DLE1BQU0sQ0FBQ3NRLEVBQW5CLEVBQXVCLENBQUMsS0FBS0MsV0FBTCxLQUFxQixFQUF0QixFQUEwQnZJLE1BQTFCLENBQWlDLElBQUloSSxNQUFNLENBQUNzUSxFQUFQLENBQVU3Z0IsTUFBL0MsQ0FBdkIsQ0FBTjs7QUFDdEIsT0FBSyxJQUFJNE4sQ0FBVCxJQUFjMFMsQ0FBZDtBQUNFLFFBQUksSUFBSS9QLE1BQUosQ0FBVyxNQUFNM0MsQ0FBTixHQUFVLEdBQXJCLEVBQTBCa0QsSUFBMUIsQ0FBK0J1UCxHQUEvQixDQUFKLEVBQXlDQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ2xTLE9BQUosQ0FBWW9DLE1BQU0sQ0FBQ3NRLEVBQW5CLEVBQXdCdFEsTUFBTSxDQUFDc1EsRUFBUCxDQUFVN2dCLE1BQVYsSUFBb0IsQ0FBckIsR0FBMkJzZ0IsQ0FBQyxDQUFDMVMsQ0FBRCxDQUE1QixHQUFvQyxDQUFDLE9BQU8wUyxDQUFDLENBQUMxUyxDQUFELENBQVQsRUFBYzJLLE1BQWQsQ0FBcUIsQ0FBQyxLQUFLK0gsQ0FBQyxDQUFDMVMsQ0FBRCxDQUFQLEVBQVk1TixNQUFqQyxDQUEzRCxDQUFOO0FBRDNDOztBQUVBLFNBQU9xZ0IsR0FBUDtBQUNELENBZEQsQyxDQWdCQTs7O0FBQ0EsSUFBRyxFQUFHLE9BQU9VLG9CQUFQLEtBQWdDLFdBQWhDLElBQStDLENBQUNBLG9CQUFuRCxDQUFILEVBQTRFO0FBQzFFQSxFQUFBQSxvQkFBb0IsQ0FBQzVkLFNBQXJCLENBQStCNmQsUUFBL0IsQ0FBd0MsSUFBeEMsSUFBZ0Q7QUFDOUNDLElBQUFBLFVBQVUsRUFBRSxVQURrQztBQUU5Q0MsSUFBQUEsYUFBYSxFQUFFLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVyxJQUFYLEVBQWdCLElBQWhCLEVBQXFCLElBQXJCLEVBQTBCLElBQTFCLEVBQStCLElBQS9CLEVBQW9DLElBQXBDLEVBQXlDLElBQXpDLEVBQThDLEtBQTlDLEVBQW9ELEtBQXBELEVBQTBELEtBQTFELENBRitCO0FBRzlDQyxJQUFBQSxhQUFhLEVBQUUsQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXLElBQVgsRUFBZ0IsSUFBaEIsRUFBcUIsSUFBckIsRUFBMEIsSUFBMUIsRUFBK0IsSUFBL0IsRUFBb0MsSUFBcEMsRUFBeUMsSUFBekMsRUFBOEMsS0FBOUMsRUFBb0QsS0FBcEQsRUFBMEQsS0FBMUQsQ0FIK0I7QUFJOUNDLElBQUFBLFVBQVUsRUFBRSxDQUFDLEtBQUQsRUFBTyxLQUFQLEVBQWEsS0FBYixFQUFtQixLQUFuQixFQUF5QixLQUF6QixFQUErQixLQUEvQixFQUFxQyxLQUFyQyxDQUprQztBQUs5Q0MsSUFBQUEsVUFBVSxFQUFFLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsR0FBYixFQUFpQixHQUFqQixFQUFxQixHQUFyQixFQUF5QixHQUF6QixDQUxrQztBQU05Q0MsSUFBQUEsU0FBUyxFQUFDLElBTm9DO0FBTzlDQyxJQUFBQSxRQUFRLEVBQUUsSUFQb0M7QUFROUNDLElBQUFBLEtBQUssRUFBRSxJQVJ1QztBQVM5Q0MsSUFBQUEsS0FBSyxFQUFFO0FBVHVDLEdBQWhEO0FBV0FWLEVBQUFBLG9CQUFvQixDQUFDNWQsU0FBckIsQ0FBK0J1ZSxJQUEvQixHQUFzQyxJQUF0QztBQUNEOztBQUFBO0FBSUQsSUFBSWphLE1BQU0sR0FBRyxFQUFiO0FBQ0EsSUFBSWthLFlBQVksR0FBQyw4Q0FBakI7QUFDQSxJQUFJQyxLQUFLLEdBQUdDLFlBQVksQ0FBQ0MsT0FBYixDQUFxQixlQUFyQixDQUFaLEMsQ0FFQTs7QUFDQXJhLE1BQU0sQ0FBQ3NhLE1BQVAsR0FBZ0IsVUFBU3JoQixDQUFULEVBQVk7QUFDM0IsTUFBSXlLLE1BQU0sR0FBR3pLLENBQUMsQ0FBQ3dRLFNBQWY7O0FBQ0EsTUFBSXhRLENBQUMsQ0FBQ3NoQixZQUFGLElBQWtCLElBQXRCLEVBQTRCO0FBQzNCN1csSUFBQUEsTUFBTSxJQUFJMUQsTUFBTSxDQUFDc2EsTUFBUCxDQUFjcmhCLENBQUMsQ0FBQ3NoQixZQUFoQixDQUFWO0FBQ0E7O0FBQ0Q7QUFDQSxTQUFPN1csTUFBUDtBQUNBLENBUEQsQyxDQVFBOzs7QUFDQTFELE1BQU0sQ0FBQ3dhLE9BQVAsR0FBaUIsVUFBU3ZoQixDQUFULEVBQVk7QUFDNUIsTUFBSXlLLE1BQU0sR0FBR3pLLENBQUMsQ0FBQ3doQixVQUFmOztBQUNBLE1BQUl4aEIsQ0FBQyxDQUFDc2hCLFlBQUYsSUFBa0IsSUFBdEIsRUFBNEI7QUFDM0I3VyxJQUFBQSxNQUFNLElBQUkxRCxNQUFNLENBQUN3YSxPQUFQLENBQWV2aEIsQ0FBQyxDQUFDc2hCLFlBQWpCLENBQVY7QUFDQTs7QUFDRDtBQUNBLFNBQU83VyxNQUFQO0FBQ0EsQ0FQRDs7QUFTQTFELE1BQU0sQ0FBQzBhLE9BQVAsR0FBaUIsVUFBU0MsU0FBVCxFQUFtQkMsSUFBbkIsRUFBd0I7QUFDeEMsT0FBSSxJQUFJblYsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDa1YsU0FBUyxDQUFDcGlCLE1BQXhCLEVBQStCa04sQ0FBQyxFQUFoQyxFQUFtQztBQUNsQyxRQUFJb1YsQ0FBQyxHQUFHLElBQVI7O0FBQ0EsU0FBSSxJQUFJMVIsR0FBUixJQUFld1IsU0FBUyxDQUFDbFYsQ0FBRCxDQUF4QixFQUE0QjtBQUMxQixVQUFHa1YsU0FBUyxDQUFDbFYsQ0FBRCxDQUFULENBQWEwRCxHQUFiLEtBQXFCeVIsSUFBSSxDQUFDelIsR0FBRCxDQUE1QixFQUFrQztBQUNqQzBSLFFBQUFBLENBQUMsR0FBRyxLQUFKO0FBQ0E7QUFDQTtBQUNGOztBQUNELFFBQUdBLENBQUgsRUFDQyxPQUFPcFYsQ0FBUDtBQUNEOztBQUNELFNBQU8sQ0FBQyxDQUFSO0FBQ0EsQ0FiRDs7QUFnQkF6RixNQUFNLENBQUM2VSxJQUFQLEdBQWMsVUFBU3RlLE9BQVQsRUFBaUI7QUFDOUIsTUFBSXVrQixRQUFRLEdBQUc7QUFDZEMsSUFBQUEsT0FBTyxFQUFDLEtBRE07QUFFZDFOLElBQUFBLFFBQVEsRUFBQztBQUZLLEdBQWY7QUFJQSxNQUFJcEosR0FBRyxHQUFHN04sQ0FBQyxDQUFDWSxNQUFGLENBQVMsSUFBVCxFQUFjOGpCLFFBQWQsRUFBdUJ2a0IsT0FBdkIsQ0FBVjs7QUFDQTBOLEVBQUFBLEdBQUcsQ0FBQzlJLEtBQUosR0FBWSxVQUFTb1csY0FBVCxFQUF5QkMsVUFBekIsRUFBcUNDLFdBQXJDLEVBQWlEO0FBQzVEN1UsSUFBQUEsS0FBSyxDQUFDK0IsR0FBTixDQUFVNlMsVUFBVjtBQUNBLFFBQUdqYixPQUFPLENBQUM0RSxLQUFYLEVBQ0M1RSxPQUFPLENBQUM0RSxLQUFSLENBQWNvVyxjQUFkLEVBQThCQyxVQUE5QixFQUEwQ0MsV0FBMUM7QUFDRCxHQUpEOztBQUtBeE4sRUFBQUEsR0FBRyxDQUFDK1csVUFBSixHQUFpQixVQUFVQyxHQUFWLEVBQWU7QUFDekJBLElBQUFBLEdBQUcsQ0FBQ0MsZ0JBQUosQ0FBcUIsZUFBckIsRUFBc0NmLEtBQXRDOztBQUNBLFFBQUc1akIsT0FBTyxDQUFDeWtCLFVBQVgsRUFBc0I7QUFDckJ6a0IsTUFBQUEsT0FBTyxDQUFDeWtCLFVBQVIsQ0FBbUJDLEdBQW5CO0FBQ0E7QUFDUCxHQUxEOztBQU1BN2tCLEVBQUFBLENBQUMsQ0FBQ3llLElBQUYsQ0FBTzVRLEdBQVA7QUFDQSxDQWxCRDs7QUFvQkFqRSxNQUFNLENBQUNrTixRQUFQLEdBQWtCLFVBQVMzVyxPQUFULEVBQWlCO0FBQ2xDLE1BQUl1a0IsUUFBUSxHQUFHO0FBQ2JDLElBQUFBLE9BQU8sRUFBQztBQURLLEdBQWY7QUFHQSxNQUFJOVcsR0FBRyxHQUFHN04sQ0FBQyxDQUFDWSxNQUFGLENBQVMsSUFBVCxFQUFlOGpCLFFBQWYsRUFBeUJ2a0IsT0FBekIsQ0FBVjs7QUFDQTBOLEVBQUFBLEdBQUcsQ0FBQzlJLEtBQUosR0FBWSxVQUFTb1csY0FBVCxFQUF5QkMsVUFBekIsRUFBcUNDLFdBQXJDLEVBQWlEO0FBQzVEN1UsSUFBQUEsS0FBSyxDQUFDK0IsR0FBTixDQUFVNlMsVUFBVjtBQUNBLFFBQUdqYixPQUFPLENBQUM0RSxLQUFYLEVBQ0M1RSxPQUFPLENBQUM0RSxLQUFSLENBQWNvVyxjQUFkLEVBQThCQyxVQUE5QixFQUEwQ0MsV0FBMUM7QUFDRCxHQUpEOztBQUtBeE4sRUFBQUEsR0FBRyxDQUFDa1gsS0FBSixHQUFZLEtBQVo7O0FBQ0FsWCxFQUFBQSxHQUFHLENBQUMrVyxVQUFKLEdBQWlCLFVBQVVDLEdBQVYsRUFBZTtBQUN6QkEsSUFBQUEsR0FBRyxDQUFDQyxnQkFBSixDQUFxQixlQUFyQixFQUFzQ2YsS0FBdEM7O0FBQ0EsUUFBRzVqQixPQUFPLENBQUN5a0IsVUFBWCxFQUFzQjtBQUNyQnprQixNQUFBQSxPQUFPLENBQUN5a0IsVUFBUixDQUFtQkMsR0FBbkI7QUFDQTtBQUNQLEdBTEQ7O0FBT0E3a0IsRUFBQUEsQ0FBQyxDQUFDeWUsSUFBRixDQUFPNVEsR0FBUDtBQUNBLENBbkJEOztBQXFCQWpFLE1BQU0sQ0FBQ29iLFdBQVAsR0FBcUIsVUFBU2hELFFBQVQsRUFBa0J0USxNQUFsQixFQUF5QnVULE1BQXpCLEVBQWlDO0FBRXJELE1BQUlDLE1BQU0sR0FBRSxJQUFaO0FBRUEsTUFBSWprQixJQUFJLEdBQUcySSxNQUFNLENBQUN1YixXQUFQLENBQW1CLHFCQUFuQixFQUF5QyxLQUF6QyxFQUErQztBQUFDbkQsSUFBQUEsUUFBUSxFQUFDQSxRQUFWO0FBQW1CdFEsSUFBQUEsTUFBTSxFQUFDQSxNQUExQjtBQUFpQ3VULElBQUFBLE1BQU0sRUFBQ0EsTUFBeEM7QUFBK0Mza0IsSUFBQUEsRUFBRSxFQUFDMGhCLFFBQVEsR0FBQyxHQUFULEdBQWF0USxNQUFiLEdBQW9CLEdBQXBCLEdBQXdCdVQ7QUFBMUUsR0FBL0MsQ0FBWDs7QUFDQSxNQUFHaGtCLElBQUksSUFBRSxJQUFOLElBQWNBLElBQUksQ0FBQzRHLE9BQUwsSUFBYyxJQUEvQixFQUFvQztBQUVuQyxRQUFHNUcsSUFBSSxDQUFDQSxJQUFMLElBQVcsSUFBWCxJQUFtQkEsSUFBSSxDQUFDQSxJQUFMLENBQVVta0IsTUFBVixJQUFrQixJQUF4QyxFQUE2QztBQUM1Q0YsTUFBQUEsTUFBTSxHQUFHLElBQUlHLFVBQUosRUFBVDtBQUNBLFVBQUl2ZCxRQUFRLEdBQUdpRCxJQUFJLENBQUNvTyxLQUFMLENBQVdsWSxJQUFJLENBQUNBLElBQUwsQ0FBVW1rQixNQUFyQixDQUFmO0FBQ0FGLE1BQUFBLE1BQU0sQ0FBQ3RhLElBQVAsQ0FBWTlDLFFBQVo7QUFDQSxLQUpELE1BSUs7QUFDSnRCLE1BQUFBLEtBQUssQ0FBQytCLEdBQU4sQ0FBVSxTQUFWO0FBQ0E7QUFFRDs7QUFDRCxTQUFPMmMsTUFBUDtBQUNBLENBakJEOztBQW1CQXRiLE1BQU0sQ0FBQ0MsY0FBUCxHQUF3QixZQUFVO0FBQ2pDLFNBQVEsSUFBSThELElBQUosRUFBRCxDQUFhMlgsT0FBYixLQUF1QnJILElBQUksQ0FBQ3NILE1BQUwsR0FBY2xYLFFBQWQsR0FBeUJxTSxNQUF6QixDQUFnQyxDQUFoQyxFQUFrQyxDQUFsQyxDQUE5QjtBQUNBLENBRkQ7O0FBSUE5USxNQUFNLENBQUNnSCxPQUFQLEdBQWlCLFVBQVM5QixFQUFULEVBQVk7QUFFNUIsTUFBSThCLE9BQU8sR0FBR3BKLFNBQVMsQ0FBQ29KLE9BQVYsRUFBZCxDQUY0QixDQUc1Qjs7QUFDQTVRLEVBQUFBLENBQUMsQ0FBQyx1QkFBcUI0USxPQUF0QixDQUFELENBQWdDNFUsUUFBaEMsQ0FBeUMsTUFBSTFXLEVBQTdDO0FBQ0E5TyxFQUFBQSxDQUFDLENBQUMsaUJBQWU0USxPQUFoQixDQUFELENBQTBCNFUsUUFBMUIsQ0FBbUMsTUFBSTFXLEVBQXZDO0FBQ0E5TyxFQUFBQSxDQUFDLENBQUMsaUJBQWU0USxPQUFoQixDQUFELENBQTBCMlEsR0FBMUIsQ0FBOEIsTUFBOUIsRUFBcUMsS0FBckM7QUFDQXZoQixFQUFBQSxDQUFDLENBQUMsaUJBQWU0USxPQUFoQixDQUFELENBQTBCMlEsR0FBMUIsQ0FBOEIsYUFBOUIsRUFBNEMsT0FBNUM7QUFDQXZoQixFQUFBQSxDQUFDLENBQUMsaUJBQWU0USxPQUFoQixDQUFELENBQTBCMlEsR0FBMUIsQ0FBOEIsS0FBOUIsRUFBb0MsTUFBSSxJQUF4QztBQUNBLFNBQU8zUSxPQUFQO0FBQ0EsQ0FWRDs7QUFZQWhILE1BQU0sQ0FBQzZiLFlBQVAsR0FBc0IsVUFBU25sQixFQUFULEVBQVk7QUFDakNrRyxFQUFBQSxLQUFLLENBQUNpQixLQUFOLENBQVluSCxFQUFaO0FBQ0EsQ0FGRDs7QUFJQXNKLE1BQU0sQ0FBQ1YsUUFBUCxHQUFnQixZQUFXO0FBQ3ZCLE1BQUlsRyxLQUFLLEdBQUd3RSxTQUFTLENBQUMyQixJQUFWLENBQWUsQ0FBZixFQUFrQjtBQUMxQnhDLElBQUFBLEtBQUssRUFBRSxDQUFDLEdBQUQsRUFBTSxNQUFOLENBRG1CLENBQ0w7O0FBREssR0FBbEIsQ0FBWjtBQUlBLFNBQU8sWUFBVTtBQUNiYSxJQUFBQSxTQUFTLENBQUNDLEtBQVYsQ0FBZ0J6RSxLQUFoQjtBQUNILEdBRkQ7QUFHSCxDQVJEO0FBVUE7Ozs7Ozs7Ozs7OztBQVdBNEcsTUFBTSxDQUFDOGIsY0FBUCxHQUF3QixVQUFVQyxJQUFWLEVBQWUzZSxHQUFmLEVBQW1CSSxJQUFuQixFQUF3QndlLFdBQXhCLEVBQW9DQyxLQUFwQyxFQUEwQ0MsV0FBMUMsRUFBc0Q7QUFDMUUsTUFBR0EsV0FBVyxLQUFHLEtBQWpCLEVBQXdCO0FBQ3BCLFFBQUlILElBQUksQ0FBQ3JkLGdCQUFMLE1BQTJCLElBQTNCLElBQW1DdWQsS0FBSyxDQUFDMWpCLE1BQU4sR0FBYSxDQUFwRCxFQUF1RDtBQUNuRHFGLE1BQUFBLFNBQVMsQ0FBQ2UsR0FBVixDQUFjLE9BQWQ7QUFDQTtBQUNIO0FBQ0osR0FMRCxNQUtLO0FBQ0QsUUFBR29kLElBQUksQ0FBQ0ksYUFBTCxNQUF3QixJQUEzQixFQUFpQztBQUM3QnZlLE1BQUFBLFNBQVMsQ0FBQ2UsR0FBVixDQUFjLE9BQWQ7QUFDQTtBQUNIO0FBQ0o7O0FBRURmLEVBQUFBLFNBQVMsQ0FBQ3dlLE9BQVYsQ0FBa0IsUUFBbEIsRUFBNEI7QUFDeEJoa0IsSUFBQUEsS0FBSyxFQUFFLE1BRGlCO0FBRXhCSCxJQUFBQSxHQUFHLEVBQUUsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUZtQjtBQUd4QjZFLElBQUFBLE1BQU0sRUFBQ0YsS0FBSyxDQUFDRTtBQUhXLEdBQTVCLEVBSUcsVUFBVTFELEtBQVYsRUFBaUI7QUFDaEJ3RSxJQUFBQSxTQUFTLENBQUNDLEtBQVYsQ0FBZ0J6RSxLQUFoQjtBQUVBLFFBQUlvRSxJQUFJLEtBQUcsRUFBWCxFQUFlQSxJQUFJLEdBQUMsTUFBTDtBQUNmLFFBQUl3ZSxXQUFXLEtBQUcsRUFBbEIsRUFBc0JBLFdBQVcsR0FBQyxtQ0FBWjtBQUV0QnBmLElBQUFBLEtBQUssQ0FBQytCLEdBQU4sQ0FBVSxVQUFWO0FBQ0FxQixJQUFBQSxNQUFNLENBQUM2VSxJQUFQLENBQVk7QUFDUnpYLE1BQUFBLEdBQUcsRUFBQ0EsR0FESTtBQUVSSSxNQUFBQSxJQUFJLEVBQUNBLElBRkc7QUFHUjZlLE1BQUFBLFdBQVcsRUFBRUwsV0FITDtBQUlSM2tCLE1BQUFBLElBQUksRUFBQzRrQixLQUpHO0FBS1JoZSxNQUFBQSxPQUFPLEVBQUMsaUJBQVM1RyxJQUFULEVBQWM7QUFDOUIsWUFBRyxRQUFPQSxJQUFQLEtBQWUsUUFBbEIsRUFBNEJBLElBQUksR0FBQzhKLElBQUksQ0FBQ29PLEtBQUwsQ0FBV2xZLElBQVgsQ0FBTDs7QUFDaEIsWUFBR0EsSUFBSSxDQUFDNEcsT0FBUixFQUFnQjtBQUNaOGQsVUFBQUEsSUFBSSxDQUFDTyxNQUFMO0FBQ0ExZixVQUFBQSxLQUFLLENBQUNvVyxRQUFOO0FBQ0gsU0FIRCxNQUlJO0FBQ0FwVyxVQUFBQSxLQUFLLENBQUMwQixJQUFOLENBQVc7QUFDUGQsWUFBQUEsSUFBSSxFQUFFLENBREM7QUFFTmtHLFlBQUFBLE1BQU0sRUFBRSxNQUZGO0FBR05oTixZQUFBQSxFQUFFLEVBQUUsWUFIRTtBQUlOcUgsWUFBQUEsSUFBSSxFQUFDLENBQUMsT0FBRCxDQUpDO0FBS04zRixZQUFBQSxLQUFLLEVBQUMsTUFMQTtBQU1ONEYsWUFBQUEsT0FBTyxFQUFFLGlDQUErQjVILENBQUMsQ0FBQ21tQixTQUFGLENBQVlsbEIsSUFBWixFQUFrQjJkLE9BQWpELEdBQXlELFFBTjVEO0FBT04vYyxZQUFBQSxHQUFHLEVBQUUsSUFQQztBQVFOK0UsWUFBQUEsUUFBUSxFQUFFLEdBUko7QUFTTkQsWUFBQUEsS0FBSyxFQUFFLENBVEQ7QUFVTndXLFlBQUFBLEdBQUcsRUFBRSxlQUFVO0FBQ1ozVyxjQUFBQSxLQUFLLENBQUNvVyxRQUFOO0FBQ0g7QUFaTSxXQUFYO0FBY0g7QUFDSixPQTNCTztBQTRCUjdYLE1BQUFBLEtBQUssRUFBQyxpQkFBVSxDQUFHO0FBNUJYLEtBQVo7QUErQkgsR0ExQ0Q7QUEyQ0gsQ0F4REQ7Ozs7O0FDOUtBYSxLQUFLLENBQUM0WSxNQUFOLENBQWEsTUFBYixFQUFxQixVQUFVNEgsT0FBVixFQUFtQjtBQUN0QyxNQUFJcG1CLENBQUMsR0FBRzRGLEtBQUssQ0FBQzVGLENBQWQ7QUFBQSxNQUNFeUssSUFBSSxHQUFHN0UsS0FBSyxDQUFDNkUsSUFEZjtBQUFBLE1BRUU0YixJQUFJLEdBQUd6Z0IsS0FBSyxDQUFDeWdCLElBQU4sRUFGVDtBQUFBLE1BR0U7QUFDQUMsRUFBQUEsUUFBUSxHQUFHLFlBSmI7QUFBQSxNQUtFQyxNQUFNLEdBQUcsbUJBTFg7QUFBQSxNQU1FQyxRQUFRLEdBQUcscUJBTmI7QUFBQSxNQVFFelgsVUFBVSxHQUFHO0FBQ1gvTCxJQUFBQSxLQUFLLEVBQUU0QyxLQUFLLENBQUNtSixVQUFOLEdBQW1CbkosS0FBSyxDQUFDbUosVUFBTixDQUFpQi9MLEtBQXBDLEdBQTRDLENBRHhDO0FBR1g7QUFDQWdXLElBQUFBLEdBQUcsRUFBRSxhQUFVN1ksT0FBVixFQUFtQjtBQUN0QixVQUFJc21CLElBQUksR0FBRyxJQUFYO0FBQ0FBLE1BQUFBLElBQUksQ0FBQzlsQixNQUFMLEdBQWNYLENBQUMsQ0FBQ1ksTUFBRixDQUFTLEVBQVQsRUFBYTZsQixJQUFJLENBQUM5bEIsTUFBbEIsRUFBMEJSLE9BQTFCLENBQWQ7QUFDQSxhQUFPc21CLElBQVA7QUFDRCxLQVJVO0FBVVg7QUFDQWxrQixJQUFBQSxFQUFFLEVBQUUsWUFBVW1rQixNQUFWLEVBQWtCamtCLFFBQWxCLEVBQTRCO0FBQzlCLGFBQU9tRCxLQUFLLENBQUMrZ0IsT0FBTixDQUFjeGEsSUFBZCxDQUFtQixJQUFuQixFQUF5Qm1hLFFBQXpCLEVBQW1DSSxNQUFuQyxFQUEyQ2prQixRQUEzQyxDQUFQO0FBQ0Q7QUFiVSxHQVJmO0FBQUEsTUF3QkU7QUFDQW1rQixFQUFBQSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFZO0FBQ3BCLFFBQUlILElBQUksR0FBRyxJQUFYO0FBQUEsUUFDRXRtQixPQUFPLEdBQUdzbUIsSUFBSSxDQUFDOWxCLE1BRGpCO0FBR0EsV0FBTztBQUNMO0FBQ0FrbUIsTUFBQUEsVUFBVSxFQUFFLHNCQUFZO0FBQ3RCLGVBQU9KLElBQUksQ0FBQ0ksVUFBTCxDQUFnQjFhLElBQWhCLENBQXFCc2EsSUFBckIsQ0FBUDtBQUNELE9BSkk7QUFLTDtBQUNBOWxCLE1BQUFBLE1BQU0sRUFBRVI7QUFOSCxLQUFQO0FBUUQsR0FyQ0g7QUFBQSxNQXVDRTtBQUNBMm1CLEVBQUFBLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQVUzbUIsT0FBVixFQUFtQjtBQUN6QixRQUFJc21CLElBQUksR0FBRyxJQUFYO0FBQ0FBLElBQUFBLElBQUksQ0FBQ3pqQixLQUFMLEdBQWEsRUFBRStMLFVBQVUsQ0FBQy9MLEtBQTFCO0FBQ0F5akIsSUFBQUEsSUFBSSxDQUFDOWxCLE1BQUwsR0FBY1gsQ0FBQyxDQUFDWSxNQUFGLENBQVMsRUFBVCxFQUFhNmxCLElBQUksQ0FBQzlsQixNQUFsQixFQUEwQm9PLFVBQVUsQ0FBQ3BPLE1BQXJDLEVBQTZDUixPQUE3QyxDQUFkO0FBQ0FzbUIsSUFBQUEsSUFBSSxDQUFDbmdCLE1BQUw7QUFDRCxHQTdDSDtBQUFBLE1BK0NFO0FBQ0F5Z0IsRUFBQUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFTalksRUFBVCxFQUFhN04sSUFBYixFQUFrQjtBQUVsQyxRQUFJOEMsTUFBTSxHQUFHLEVBQWI7QUFDQTlDLElBQUFBLElBQUksQ0FBQ08sT0FBTCxDQUFhLFVBQVNDLEdBQVQsRUFBYTtBQUN4QnNDLE1BQUFBLE1BQU0sb0NBQ0V0QyxHQURGLDRGQUFOO0FBS0QsS0FORDtBQVFBekIsSUFBQUEsQ0FBQyxDQUFDOE8sRUFBRCxDQUFELENBQU1oRSxRQUFOLENBQWUsa0JBQWYsRUFBbUNpQixJQUFuQyxDQUF3Q2hJLE1BQXhDO0FBQ0QsR0E1REgsQ0FEc0MsQ0ErRHRDOzs7QUFDQStpQixFQUFBQSxLQUFLLENBQUN4aEIsU0FBTixDQUFnQjNFLE1BQWhCLEdBQXlCO0FBQ3ZCeUcsSUFBQUEsSUFBSSxFQUFFLFVBRGlCO0FBRXZCNGYsSUFBQUEsY0FBYyxFQUFFLEdBRk87QUFHdkJDLElBQUFBLGNBQWMsRUFBRSxTQUhPO0FBS3ZCaG1CLElBQUFBLElBQUksRUFBRSxFQUxpQjtBQU12QmltQixJQUFBQSxTQUFTLEVBQUUsT0FOWTtBQU92QjNaLElBQUFBLEtBQUssRUFBRSxFQVBnQjtBQVF2QmlLLElBQUFBLE1BQU0sRUFBRSxFQVJlO0FBVXZCeFEsSUFBQUEsR0FBRyxFQUFFLEVBVmtCO0FBV3ZCbWdCLElBQUFBLE1BQU0sRUFBRSxLQVhlO0FBWXZCQyxJQUFBQSxLQUFLLEVBQUUsRUFaZ0I7QUFhdkJuQixJQUFBQSxXQUFXLEVBQUUsRUFiVTtBQWN2Qm9CLElBQUFBLE9BQU8sRUFBRSxFQWRjO0FBZXZCaE4sSUFBQUEsUUFBUSxFQUFFLE1BZmE7QUFnQnZCaU4sSUFBQUEsU0FBUyxFQUFFLElBaEJZO0FBa0J2QjNtQixJQUFBQSxNQUFNLEVBQUU7QUFDTjRtQixNQUFBQSxXQUFXLEVBQUUsb0JBRFA7QUFFTkMsTUFBQUEsU0FBUyxFQUFFO0FBRkwsS0FsQmU7QUF1QnZCemlCLElBQUFBLEtBQUssRUFBRTtBQXZCZ0IsR0FBekIsQ0FoRXNDLENBMEZ0Qzs7QUFDQStoQixFQUFBQSxLQUFLLENBQUN4aEIsU0FBTixDQUFnQmdCLE1BQWhCLEdBQXlCLFlBQVk7QUFDbkMsUUFBSW1nQixJQUFJLEdBQUcsSUFBWDtBQUFBLFFBQ0V0bUIsT0FBTyxHQUFHc21CLElBQUksQ0FBQzlsQixNQURqQjtBQUdBLFdBQVFSLE9BQU8sQ0FBQzJPLEVBQWhCLEtBQXdCLFFBQXhCLEdBQW1DM08sT0FBTyxDQUFDMk8sRUFBUixHQUFhOU8sQ0FBQyxDQUFDRyxPQUFPLENBQUMyTyxFQUFULENBQWpELEdBQStEM08sT0FBTyxDQUFDMk8sRUFBdkUsQ0FKbUMsQ0FLbkM7O0FBQ0EzTyxJQUFBQSxPQUFPLENBQUNzbkIsTUFBUixHQUFpQnpuQixDQUFDLENBQUMsbURBQ2pCLGtDQURpQixHQUVqQiwrRkFGaUIsR0FHakIsNEJBSGlCLEdBSWpCLFFBSmlCLEdBS2pCLDBDQUxpQixHQU1qQixnRUFOaUIsR0FPakIsT0FQaUIsR0FRakIsUUFSZ0IsQ0FBbEIsQ0FObUMsQ0FnQm5DOztBQUNBRyxJQUFBQSxPQUFPLENBQUNzbkIsTUFBUixDQUFlaGlCLElBQWYsQ0FBb0IscUJBQXBCLEVBQTJDbEQsRUFBM0MsQ0FBOEMsT0FBOUMsRUFBdUQsVUFBVU0sQ0FBVixFQUFhO0FBQ2xFLE9BQUM3QyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFrVSxNQUFSLEdBQWlCUyxRQUFqQixDQUEwQjZSLFFBQTFCLENBQUQsR0FBdUN4bUIsQ0FBQyxDQUFDMlEsUUFBRCxDQUFELENBQVlsTCxJQUFaLENBQWlCLE1BQU04Z0IsTUFBdkIsRUFBK0IvUyxXQUEvQixDQUEyQ2dULFFBQTNDLENBQXZDLEdBQThGLEVBQTlGO0FBQ0F4bUIsTUFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRa1UsTUFBUixHQUFpQmUsV0FBakIsQ0FBNkJ1UixRQUE3QjtBQUNELEtBSEQ7QUFJQXhtQixJQUFBQSxDQUFDLENBQUMyUSxRQUFELENBQUQsQ0FBWXBPLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQVVNLENBQVYsRUFBYTtBQUNsQzdDLE1BQUFBLENBQUMsQ0FBQzZDLENBQUMsQ0FBQ21TLE1BQUgsQ0FBRCxDQUFZVCxPQUFaLENBQW9CLE1BQU1nUyxNQUExQixFQUFrQ3BrQixNQUFsQyxJQUE0QyxDQUE3QyxJQUFvRGhDLE9BQU8sQ0FBQ3NuQixNQUFSLENBQWU5UyxRQUFmLENBQXdCNlIsUUFBeEIsQ0FBcEQsR0FBeUZybUIsT0FBTyxDQUFDc25CLE1BQVIsQ0FBZWpVLFdBQWYsQ0FBMkJnVCxRQUEzQixDQUF6RixHQUErSCxFQUEvSDtBQUNELEtBRkQ7QUFJQSxLQUFDdmEsS0FBSyxDQUFDd0MsT0FBTixDQUFjdE8sT0FBTyxDQUFDcVgsTUFBdEIsQ0FBRCxHQUFpQ3JYLE9BQU8sQ0FBQ3FYLE1BQVIsR0FBaUIsQ0FBQ3JYLE9BQU8sQ0FBQ3FYLE1BQVQsQ0FBbEQsR0FBcUUsRUFBckUsQ0F6Qm1DLENBMkJuQzs7QUFDQXJYLElBQUFBLE9BQU8sQ0FBQ3FSLE1BQVIsR0FBaUJyUixPQUFPLENBQUMyTyxFQUFSLENBQVd5RixPQUFYLENBQW1CLGFBQW5CLEVBQWtDaFUsSUFBbEMsQ0FBdUMsWUFBdkMsQ0FBakI7QUFFQUosSUFBQUEsT0FBTyxDQUFDMk8sRUFBUixDQUFXeEwsTUFBWCxDQUFrQm5ELE9BQU8sQ0FBQ3NuQixNQUExQjs7QUFFQSxRQUFJdG5CLE9BQU8sQ0FBQzZHLEdBQVosRUFBaUI7QUFBRTtBQUNqQixXQUFLMGdCLFFBQUw7QUFDRCxLQUZELE1BRU87QUFDTGpCLE1BQUFBLElBQUksQ0FBQ2tCLFVBQUwsR0FESyxDQUNjO0FBQ3BCOztBQUVEeG5CLElBQUFBLE9BQU8sQ0FBQzJPLEVBQVIsQ0FBV3ZNLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLHFCQUF2QixFQUE4QyxZQUFZO0FBQ3hEO0FBQ0EsVUFBSXFsQixNQUFNLEdBQUc1bkIsQ0FBQyxDQUFDLElBQUQsQ0FBZDtBQUFBLFVBQ0U2bkIsSUFBSSxHQUFHRCxNQUFNLENBQUMvVSxJQUFQLEdBQWNwTixJQUFkLENBQW1CLElBQW5CLEVBQXlCQyxFQUF6QixDQUE0QixDQUE1QixDQURUOztBQUdBLFVBQUksQ0FBQ21pQixJQUFJLENBQUNsVCxRQUFMLENBQWMsWUFBZCxDQUFMLEVBQWtDO0FBQ2hDa1QsUUFBQUEsSUFBSSxDQUFDaFQsUUFBTCxDQUFjLFlBQWQ7QUFDRDs7QUFFRCtTLE1BQUFBLE1BQU0sQ0FBQ25pQixJQUFQLENBQVksT0FBWixFQUFxQmhFLEdBQXJCLENBQXlCdEIsT0FBTyxDQUFDcVgsTUFBUixDQUFlaEssSUFBZixDQUFvQnJOLE9BQU8sQ0FBQzZtQixjQUE1QixDQUF6QjtBQUNELEtBVkQ7QUFZRCxHQWxERDs7QUFvREFGLEVBQUFBLEtBQUssQ0FBQ3hoQixTQUFOLENBQWdCb2lCLFFBQWhCLEdBQTJCLFlBQVk7QUFDckMsUUFBSWpCLElBQUksR0FBRyxJQUFYO0FBQUEsUUFDRXRtQixPQUFPLEdBQUdzbUIsSUFBSSxDQUFDOWxCLE1BRGpCO0FBRUFYLElBQUFBLENBQUMsQ0FBQ3llLElBQUYsQ0FBTztBQUNMclgsTUFBQUEsSUFBSSxFQUFFakgsT0FBTyxDQUFDZ25CLE1BQVIsSUFBa0IsS0FEbkI7QUFFTG5nQixNQUFBQSxHQUFHLEVBQUU3RyxPQUFPLENBQUM2RyxHQUZSO0FBR0xpZixNQUFBQSxXQUFXLEVBQUU5bEIsT0FBTyxDQUFDOGxCLFdBSGhCO0FBSUxobEIsTUFBQUEsSUFBSSxFQUFFZCxPQUFPLENBQUNpbkIsS0FBUixJQUFpQixFQUpsQjtBQUtMblEsTUFBQUEsUUFBUSxFQUFFLE1BTEw7QUFNTG9RLE1BQUFBLE9BQU8sRUFBRWxuQixPQUFPLENBQUNrbkIsT0FBUixJQUFtQixFQU52QjtBQU9MeGYsTUFBQUEsT0FBTyxFQUFFLGlCQUFVa1AsR0FBVixFQUFlO0FBQ3RCO0FBQ0EsWUFBSSxPQUFPNVcsT0FBTyxDQUFDbW5CLFNBQWYsS0FBNkIsVUFBakMsRUFBNkM7QUFDM0N2USxVQUFBQSxHQUFHLEdBQUc1VyxPQUFPLENBQUNtbkIsU0FBUixDQUFrQnZRLEdBQWxCLEtBQTBCQSxHQUFHLENBQUM1VyxPQUFPLENBQUNrYSxRQUFULENBQW5DO0FBQ0QsU0FKcUIsQ0FLdEI7OztBQUNBLFlBQUlwTyxLQUFLLENBQUN3QyxPQUFOLENBQWNzSSxHQUFkLENBQUosRUFBd0I7QUFDdEI1VyxVQUFBQSxPQUFPLENBQUNjLElBQVIsR0FBZXdsQixJQUFJLENBQUNxQixVQUFMLENBQWdCL1EsR0FBaEIsQ0FBZjtBQUNBNVcsVUFBQUEsT0FBTyxDQUFDNEUsS0FBUixHQUFnQixFQUFoQjtBQUNBMGhCLFVBQUFBLElBQUksQ0FBQ2tCLFVBQUw7QUFDRCxTQUpELE1BSU87QUFDTHhuQixVQUFBQSxPQUFPLENBQUM0RSxLQUFSLEdBQWdCLFFBQWhCO0FBQ0Q7QUFDRixPQXBCSTtBQXFCTEEsTUFBQUEsS0FBSyxFQUFFLGVBQVVsQyxDQUFWLEVBQWFrbEIsQ0FBYixFQUFnQjtBQUNyQjVuQixRQUFBQSxPQUFPLENBQUM0RSxLQUFSLEdBQWdCLGNBQWNnakIsQ0FBOUI7QUFDRDtBQXZCSSxLQUFQO0FBMEJELEdBN0JELENBL0lzQyxDQThLdEM7OztBQUNBakIsRUFBQUEsS0FBSyxDQUFDeGhCLFNBQU4sQ0FBZ0J3aUIsVUFBaEIsR0FBNkIsVUFBVTdtQixJQUFWLEVBQWdCO0FBQzNDLFFBQUl3bEIsSUFBSSxHQUFHLElBQVg7QUFBQSxRQUNFdG1CLE9BQU8sR0FBR3NtQixJQUFJLENBQUM5bEIsTUFEakI7QUFBQSxRQUVFdW1CLFNBQVMsR0FBRy9tQixPQUFPLENBQUMrbUIsU0FGdEI7QUFBQSxRQUdFMVAsTUFBTSxHQUFHclgsT0FBTyxDQUFDcVgsTUFIbkI7QUFBQSxRQUlFK1AsV0FBVyxHQUFHcG5CLE9BQU8sQ0FBQ1EsTUFBUixDQUFlNG1CLFdBSi9CO0FBQUEsUUFLRUMsU0FBUyxHQUFHcm5CLE9BQU8sQ0FBQ1EsTUFBUixDQUFlNm1CLFNBTDdCO0FBT0E1aEIsSUFBQUEsS0FBSyxDQUFDTyxJQUFOLENBQVdsRixJQUFYLEVBQWlCLFVBQVVvTyxDQUFWLEVBQWF4SyxJQUFiLEVBQW1CO0FBQ2xDLFVBQUksUUFBT0EsSUFBUCxNQUFnQixRQUFwQixFQUE4QjtBQUM1QjVELFFBQUFBLElBQUksQ0FBQ29PLENBQUQsQ0FBSixHQUFVO0FBQ1JyTixVQUFBQSxLQUFLLEVBQUU2QztBQURDLFNBQVY7QUFHRDs7QUFDRDVELE1BQUFBLElBQUksQ0FBQ29PLENBQUQsQ0FBSixDQUFRbVksU0FBUixJQUFxQm5ZLENBQXJCO0FBQ0EsVUFBSSxDQUFDcE8sSUFBSSxDQUFDb08sQ0FBRCxDQUFKLENBQVFrWSxXQUFSLENBQUwsRUFBMkJ0bUIsSUFBSSxDQUFDb08sQ0FBRCxDQUFKLENBQVFrWSxXQUFSLElBQXVCLEtBQXZCO0FBQzNCM2hCLE1BQUFBLEtBQUssQ0FBQ08sSUFBTixDQUFXcVIsTUFBWCxFQUFtQixVQUFVeFUsS0FBVixFQUFpQmxCLEtBQWpCLEVBQXdCO0FBQ3pDLFlBQUliLElBQUksQ0FBQ29PLENBQUQsQ0FBSixDQUFRNlgsU0FBUixNQUF1QnBsQixLQUEzQixFQUFrQztBQUNoQ2IsVUFBQUEsSUFBSSxDQUFDb08sQ0FBRCxDQUFKLENBQVFrWSxXQUFSLElBQXVCLElBQXZCO0FBQ0Q7QUFDRixPQUpEO0FBS0QsS0FiRDtBQWNBL1AsSUFBQUEsTUFBTSxDQUFDL0wsTUFBUCxDQUFjLENBQWQ7QUFFQSxXQUFPeEssSUFBUDtBQUNELEdBekJELENBL0tzQyxDQTJNdEM7OztBQUNBNmxCLEVBQUFBLEtBQUssQ0FBQ3hoQixTQUFOLENBQWdCcWlCLFVBQWhCLEdBQTZCLFVBQVUxbUIsSUFBVixFQUFnQjtBQUMzQyxRQUFJd2xCLElBQUksR0FBRyxJQUFYO0FBQUEsUUFDRXRtQixPQUFPLEdBQUdzbUIsSUFBSSxDQUFDOWxCLE1BRGpCO0FBQUEsUUFFRXlHLElBQUksR0FBR2pILE9BQU8sQ0FBQ2lILElBRmpCO0FBQUEsUUFHRTlHLEVBQUUsR0FBR21tQixJQUFJLENBQUN6akIsS0FIWjtBQUFBLFFBSUUvQixJQUFJLEdBQUdBLElBQUksR0FBR3dsQixJQUFJLENBQUNxQixVQUFMLENBQWdCN21CLElBQWhCLENBQUgsR0FBMkJ3bEIsSUFBSSxDQUFDcUIsVUFBTCxDQUFnQjNuQixPQUFPLENBQUNjLElBQXhCLENBSnhDO0FBQUEsUUFNQWdILEtBQUssR0FBRztBQUVOO0FBQ0ErZixNQUFBQSxRQUFRLEVBQUUsa0JBQVVybkIsTUFBVixFQUFrQk0sSUFBbEIsRUFBd0JYLEVBQXhCLEVBQTRCO0FBRXBDLFlBQUkybkIsU0FBUyxHQUFHLHFCQUFoQjtBQUFBLFlBQ0VDLE9BQU8sR0FBRyxvQkFEWjtBQUFBLFlBR0VwWixFQUFFLEdBQUduTyxNQUFNLENBQUM4bUIsTUFBUCxDQUFjaGlCLElBQWQsQ0FBbUIsSUFBbkIsQ0FIUDtBQUFBLFlBSUV5aEIsU0FBUyxHQUFHdm1CLE1BQU0sQ0FBQ3VtQixTQUpyQjtBQUFBLFlBS0VLLFdBQVcsR0FBRzVtQixNQUFNLENBQUNBLE1BQVAsQ0FBYzRtQixXQUw5QjtBQUFBLFlBTUVDLFNBQVMsR0FBRzdtQixNQUFNLENBQUNBLE1BQVAsQ0FBYzZtQixTQU41QjtBQUFBLFlBT0VoUSxNQUFNLEdBQUc3VyxNQUFNLENBQUM2VyxNQVBsQjtBQUFBLFlBUUVqSyxLQUFLLEdBQUc1TSxNQUFNLENBQUM0TSxLQVJqQjtBQUFBLFlBU0VpRSxNQUFNLEdBQUc3USxNQUFNLENBQUM2USxNQVRsQjtBQUFBLFlBVUV5VixjQUFjLEdBQUd0bUIsTUFBTSxDQUFDc21CLGNBVjFCO0FBQUEsWUFXRUQsY0FBYyxHQUFHcm1CLE1BQU0sQ0FBQ3FtQixjQVgxQjtBQUFBLFlBYUVtQixHQUFHLEdBQUcsQ0FiUixDQUZvQyxDQWtCcEM7O0FBQ0FyWixRQUFBQSxFQUFFLENBQUN4TCxNQUFILENBQVV0RCxDQUFDLENBQUMsMEJBQUQsQ0FBWDtBQUNBNEYsUUFBQUEsS0FBSyxDQUFDTyxJQUFOLENBQVdsRixJQUFYLEVBQWlCLFVBQVVvTyxDQUFWLEVBQWF4SyxJQUFiLEVBQW1CO0FBQ2xDaUssVUFBQUEsRUFBRSxDQUFDeEwsTUFBSCxDQUFVdEQsQ0FBQyxDQUFDLG9CQUFvQjZFLElBQUksQ0FBQ3FpQixTQUFELENBQXhCLEdBQXNDLFNBQXZDLENBQVg7QUFDRCxTQUZEO0FBS0EsWUFBSWtCLE1BQU0sR0FBR3RaLEVBQUUsQ0FBQ3JKLElBQUgsQ0FBUSxJQUFSLEVBQWNDLEVBQWQsQ0FBaUIsQ0FBakIsQ0FBYixDQXpCb0MsQ0EyQnBDOztBQUVBMGlCLFFBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxpQixJQUFqQixDQUFzQixVQUFVbkQsS0FBVixFQUFpQjtBQUNyQyxjQUFJc2xCLEdBQUcsR0FBR3RvQixDQUFDLENBQUMsSUFBRCxDQUFYO0FBQUEsY0FDRTZFLElBQUksR0FBRzVELElBQUksQ0FBQytCLEtBQUQsQ0FEYjtBQUFBLGNBRUV1bEIsVUFBVSxHQUFHMWpCLElBQUksQ0FBQ3FpQixTQUFELENBRm5CO0FBQUEsY0FHRWxsQixLQUFLLEdBQUd1bUIsVUFIVjs7QUFJQSxjQUFJaGIsS0FBSyxDQUFDcEwsTUFBTixHQUFlLENBQW5CLEVBQXNCO0FBQ3BCSCxZQUFBQSxLQUFLLEdBQUcsRUFBUjtBQUNBNEQsWUFBQUEsS0FBSyxDQUFDTyxJQUFOLENBQVdvSCxLQUFYLEVBQWtCLFVBQVU4QixDQUFWLEVBQWFtWixDQUFiLEVBQWdCO0FBQ2hDeG1CLGNBQUFBLEtBQUssSUFBSTZDLElBQUksQ0FBQzJqQixDQUFELENBQWI7QUFDQW5aLGNBQUFBLENBQUMsR0FBSTlCLEtBQUssQ0FBQ3BMLE1BQU4sR0FBZSxDQUFwQixHQUF5QkgsS0FBSyxJQUFLaWxCLGNBQW5DLEdBQW1ELEVBQW5ELENBRmdDLENBR2hDO0FBQ0QsYUFKRDtBQUtEOztBQUNELGNBQUllLFFBQVEsR0FBR2hvQixDQUFDLENBQUMsa0NBQWtDc21CLFFBQWxDLEdBQTZDLFVBQTdDLEdBQTBEaG1CLEVBQTFELEdBQStELGVBQS9ELEdBQWlGdUUsSUFBSSxDQUFDMmlCLFNBQUQsQ0FBckYsR0FBbUcsOEJBQW5HLEdBQW9JeGxCLEtBQXBJLEdBQTRJLGlCQUE1SSxHQUFnS3VtQixVQUFoSyxHQUE2SyxJQUE5SyxDQUFoQjs7QUFFQSxjQUFJMWpCLElBQUksQ0FBQzBpQixXQUFELENBQVIsRUFBdUI7QUFDckJTLFlBQUFBLFFBQVEsQ0FBQ1MsSUFBVCxDQUFjLFNBQWQsRUFBeUIsSUFBekI7QUFDQWpSLFlBQUFBLE1BQU0sQ0FBQ3ZNLElBQVAsQ0FBWXNkLFVBQVo7QUFDQUosWUFBQUEsR0FBRztBQUNKOztBQUNERyxVQUFBQSxHQUFHLENBQUN2YyxJQUFKLENBQVNpYyxRQUFUO0FBQ0QsU0FyQkQ7QUF1QkEsWUFBSVUsV0FBVyxHQUFHMW9CLENBQUMsQ0FBQyx5RkFBRCxDQUFuQjtBQUNBbW9CLFFBQUFBLEdBQUcsS0FBS2xuQixJQUFJLENBQUNrQixNQUFiLEdBQXNCdW1CLFdBQVcsQ0FBQ0QsSUFBWixDQUFpQixTQUFqQixFQUE0QixJQUE1QixDQUF0QixHQUEwRCxFQUExRDtBQUNBTCxRQUFBQSxNQUFNLENBQUNyYyxJQUFQLENBQVkyYyxXQUFaLEVBdERvQyxDQXdEcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEzQixRQUFBQSxlQUFlLENBQUNwbUIsTUFBTSxDQUFDbU8sRUFBUixFQUFZMEksTUFBWixDQUFmO0FBQ0E0USxRQUFBQSxNQUFNLENBQUNsVSxNQUFQLEdBQWdCNEosSUFBaEIsR0FBdUJyWSxJQUF2QixDQUE0QixPQUE1QixFQUFxQ2hFLEdBQXJDLENBQXlDK1YsTUFBTSxDQUFDaEssSUFBUCxDQUFZd1osY0FBWixDQUF6QyxFQTlEb0MsQ0FnRXBDOztBQUNBb0IsUUFBQUEsTUFBTSxDQUFDN2xCLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLFVBQVVpRCxLQUFWLEVBQWlCO0FBQ2xDLGNBQUltakIsSUFBSSxHQUFHM29CLENBQUMsQ0FBQyxJQUFELENBQVo7QUFBQSxjQUNFaUssT0FBTyxHQUFHekUsS0FBSyxDQUFDd1AsTUFBTixDQUFhekcsUUFBYixLQUEwQixJQUExQixHQUFpQ29hLElBQUksQ0FBQ2xqQixJQUFMLENBQVUsTUFBTXdpQixTQUFoQixFQUEyQmhULFdBQTNCLENBQXVDaVQsT0FBdkMsRUFBZ0R2VCxRQUFoRCxDQUF5RHVULE9BQXpELENBQWpDLEdBQXFHUyxJQUFJLENBQUNsakIsSUFBTCxDQUFVLE9BQVYsRUFBbUJnakIsSUFBbkIsQ0FBd0IsU0FBeEIsQ0FEakgsQ0FEa0MsQ0FJbEM7O0FBQ0FFLFVBQUFBLElBQUksQ0FBQ3BVLE9BQUwsQ0FBYSxNQUFNZ1MsTUFBbkIsRUFBMkIxUixRQUEzQixDQUFvQzJSLFFBQXBDLEVBTGtDLENBT2xDOztBQUNBbUMsVUFBQUEsSUFBSSxDQUFDbGpCLElBQUwsQ0FBVSxPQUFWLEVBQW1CZ2pCLElBQW5CLENBQXdCLFNBQXhCLEVBQW1DeGUsT0FBbkM7QUFFQTBlLFVBQUFBLElBQUksQ0FBQ04sT0FBTCxHQUFlbGlCLElBQWYsQ0FBb0IsWUFBWTtBQUM5QixnQkFBSXlpQixFQUFFLEdBQUc1b0IsQ0FBQyxDQUFDLElBQUQsQ0FBVjtBQUNBaUssWUFBQUEsT0FBTyxHQUFHMmUsRUFBRSxDQUFDbmpCLElBQUgsQ0FBUSxNQUFNd2lCLFNBQWQsRUFBeUJwVCxRQUF6QixDQUFrQ3FULE9BQWxDLENBQUgsR0FBZ0RVLEVBQUUsQ0FBQ25qQixJQUFILENBQVEsTUFBTXdpQixTQUFkLEVBQXlCelUsV0FBekIsQ0FBcUMwVSxPQUFyQyxDQUF2RDtBQUNBVSxZQUFBQSxFQUFFLENBQUNuakIsSUFBSCxDQUFRLE9BQVIsRUFBaUJnakIsSUFBakIsQ0FBc0IsU0FBdEIsRUFBaUN4ZSxPQUFqQztBQUNELFdBSkQsRUFWa0MsQ0FnQmxDOztBQUNBckUsVUFBQUEsS0FBSyxDQUFDSixLQUFOLENBQVkyRyxJQUFaLENBQWlCd2MsSUFBakIsRUFBdUJyQyxRQUF2QixFQUFpQyxhQUFhLEdBQWIsR0FBbUJBLFFBQW5CLEdBQThCLEdBQS9ELEVBQW9FO0FBQ2xFbGYsWUFBQUEsSUFBSSxFQUFFLFVBRDREO0FBRWxFc0csWUFBQUEsR0FBRyxFQUFFaWIsSUFGNkQ7QUFHbEVFLFlBQUFBLFVBQVUsRUFBRTVlLE9BSHNEO0FBSWxFNmUsWUFBQUEsS0FBSyxFQUFFN2U7QUFKMkQsV0FBcEU7QUFPRCxTQXhCRCxFQWpFb0MsQ0EyRnBDOztBQUNBdEosUUFBQUEsTUFBTSxDQUFDbU8sRUFBUCxDQUFVaEUsUUFBVixDQUFtQixrQkFBbkIsRUFBdUN2SSxFQUF2QyxDQUEwQyxPQUExQyxFQUFtRCxRQUFuRCxFQUE2RCxVQUFTTSxDQUFULEVBQVc7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQSxjQUFJa21CLFdBQVcsR0FBRy9vQixDQUFDLENBQUMsSUFBRCxDQUFELENBQVE4SyxRQUFSLENBQWlCLElBQWpCLEVBQXVCaUIsSUFBdkIsRUFBbEIsQ0FWc0UsQ0FXdEU7QUFDQTs7QUFDQSxjQUFJaWQsVUFBVSxHQUFHL2MsS0FBSyxDQUFDM0csU0FBTixDQUFnQjRHLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQmljLE1BQU0sQ0FBQ0MsT0FBUCxFQUEzQixDQUFqQjtBQUNBVyxVQUFBQSxVQUFVLENBQUN4bkIsT0FBWCxDQUFtQixVQUFTQyxHQUFULEVBQWNzSCxHQUFkLEVBQWtCO0FBQ25DLGdCQUFHdEgsR0FBRyxDQUFDd25CLFNBQUosS0FBa0JGLFdBQXJCLEVBQWlDO0FBQy9CO0FBQ0E7QUFDQTtBQUNBamEsY0FBQUEsRUFBRSxDQUFDckosSUFBSCxDQUFRLElBQVIsRUFBY0MsRUFBZCxDQUFpQnFELEdBQUcsR0FBRyxDQUF2QixFQUEwQjdGLEdBQTFCLEdBQWdDWCxFQUFoQyxDQUFtQyxPQUFuQyxFQUE0QyxVQUFTaUQsS0FBVCxFQUFlO0FBQ3pEO0FBQ0E7QUFFQTtBQUNBO0FBQ0Esb0JBQUd4RixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFnRCxLQUFSLE9BQXFCK0YsR0FBRyxHQUFHLENBQTlCLEVBQWlDO0FBQy9CLHNCQUFJdWYsR0FBRyxHQUFHdG9CLENBQUMsQ0FBQyxJQUFELENBQVg7QUFBQSxzQkFDQWlLLE9BQU8sR0FBR3pFLEtBQUssQ0FBQ3dQLE1BQU4sQ0FBYXpHLFFBQWIsS0FBMEIsSUFBMUIsR0FBaUMrWixHQUFHLENBQUM3aUIsSUFBSixDQUFTLE1BQU13aUIsU0FBZixFQUEwQmhULFdBQTFCLENBQXNDaVQsT0FBdEMsRUFBK0N2VCxRQUEvQyxDQUF3RHVULE9BQXhELENBQWpDLEdBQW9HSSxHQUFHLENBQUM3aUIsSUFBSixDQUFTLE9BQVQsRUFBa0JnakIsSUFBbEIsQ0FBdUIsU0FBdkIsQ0FEOUcsQ0FEK0IsQ0FHL0I7QUFDQTs7QUFDQUgsa0JBQUFBLEdBQUcsQ0FBQy9ULE9BQUosQ0FBWSxNQUFNZ1MsTUFBbEIsRUFBMEIxUixRQUExQixDQUFtQzJSLFFBQW5DLEVBTCtCLENBTy9COztBQUNBOEIsa0JBQUFBLEdBQUcsQ0FBQzdpQixJQUFKLENBQVMsT0FBVCxFQUFrQmdqQixJQUFsQixDQUF1QixTQUF2QixFQUFrQ3hlLE9BQWxDLEVBUitCLENBUy9CO0FBQ0E7O0FBQ0Esc0JBQUkwZSxJQUFJLEdBQUdMLEdBQUcsQ0FBQy9ULE9BQUosQ0FBWSxJQUFaLEVBQWtCOU8sSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNkJDLEVBQTdCLENBQWdDLENBQWhDLENBQVg7QUFBQSxzQkFDRXdqQixJQUFJLEdBQUdQLElBQUksQ0FBQ04sT0FBTCxFQURUO0FBQUEsc0JBRUVGLEdBQUcsR0FBRyxDQUZSO0FBSUFlLGtCQUFBQSxJQUFJLENBQUMvaUIsSUFBTCxDQUFVLFlBQVk7QUFDcEJuRyxvQkFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFReUYsSUFBUixDQUFhLE9BQWIsRUFBc0JnakIsSUFBdEIsQ0FBMkIsU0FBM0IsSUFBd0NOLEdBQUcsRUFBM0MsR0FBZ0QsRUFBaEQ7QUFDRCxtQkFGRCxFQWYrQixDQWtCL0I7O0FBRUEsc0JBQUlBLEdBQUcsS0FBS2UsSUFBSSxDQUFDL21CLE1BQWpCLEVBQXlCO0FBQ3ZCO0FBQ0F3bUIsb0JBQUFBLElBQUksQ0FBQ2xqQixJQUFMLENBQVUsT0FBVixFQUFtQmdqQixJQUFuQixDQUF3QixTQUF4QixFQUFtQyxJQUFuQztBQUNBRSxvQkFBQUEsSUFBSSxDQUFDbGpCLElBQUwsQ0FBVSxNQUFNd2lCLFNBQWhCLEVBQTJCcFQsUUFBM0IsQ0FBb0NxVCxPQUFwQztBQUNELG1CQUpELE1BSU87QUFDTDtBQUNBUyxvQkFBQUEsSUFBSSxDQUFDbGpCLElBQUwsQ0FBVSxPQUFWLEVBQW1CZ2pCLElBQW5CLENBQXdCLFNBQXhCLEVBQW1DLEtBQW5DO0FBQ0FFLG9CQUFBQSxJQUFJLENBQUNsakIsSUFBTCxDQUFVLE1BQU13aUIsU0FBaEIsRUFBMkJ6VSxXQUEzQixDQUF1QzBVLE9BQXZDO0FBQ0QsbUJBNUI4QixDQTZCL0I7QUFDQTs7O0FBQ0F0aUIsa0JBQUFBLEtBQUssQ0FBQ0osS0FBTixDQUFZMkcsSUFBWixDQUFpQndjLElBQWpCLEVBQXVCckMsUUFBdkIsRUFBaUMsYUFBYSxHQUFiLEdBQW1CQSxRQUFuQixHQUE4QixHQUEvRCxFQUFvRTtBQUNsRWxmLG9CQUFBQSxJQUFJLEVBQUUsVUFENEQ7QUFFbEVzRyxvQkFBQUEsR0FBRyxFQUFFNGEsR0FGNkQ7QUFHbEVPLG9CQUFBQSxVQUFVLEVBQUU1ZSxPQUhzRDtBQUlsRTZlLG9CQUFBQSxLQUFLLEVBQUdYLEdBQUcsS0FBS2UsSUFBSSxDQUFDL21CO0FBSjZDLG1CQUFwRSxFQS9CK0IsQ0FzQy9CO0FBQ0Q7QUFJRixlQWpERCxFQWlER2tLLE9BakRILENBaURXLE9BakRYO0FBa0REO0FBQ0YsV0F4REQ7QUF5REQsU0F2RUQ7QUF5RUErYixRQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI5bEIsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsVUFBVU0sQ0FBVixFQUFhO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBRUEsY0FBSXlsQixHQUFHLEdBQUd0b0IsQ0FBQyxDQUFDLElBQUQsQ0FBWDtBQUFBLGNBQ0VpSyxPQUFPLEdBQUd6RSxLQUFLLENBQUN3UCxNQUFOLENBQWF6RyxRQUFiLEtBQTBCLElBQTFCLEdBQWlDK1osR0FBRyxDQUFDN2lCLElBQUosQ0FBUyxNQUFNd2lCLFNBQWYsRUFBMEJoVCxXQUExQixDQUFzQ2lULE9BQXRDLEVBQStDdlQsUUFBL0MsQ0FBd0R1VCxPQUF4RCxDQUFqQyxHQUFvR0ksR0FBRyxDQUFDN2lCLElBQUosQ0FBUyxPQUFULEVBQWtCZ2pCLElBQWxCLENBQXVCLFNBQXZCLENBRGhILENBTndDLENBU3hDOztBQUNBSCxVQUFBQSxHQUFHLENBQUMvVCxPQUFKLENBQVksTUFBTWdTLE1BQWxCLEVBQTBCMVIsUUFBMUIsQ0FBbUMyUixRQUFuQyxFQVZ3QyxDQVl4Qzs7QUFDQThCLFVBQUFBLEdBQUcsQ0FBQzdpQixJQUFKLENBQVMsT0FBVCxFQUFrQmdqQixJQUFsQixDQUF1QixTQUF2QixFQUFrQ3hlLE9BQWxDLEVBYndDLENBZXhDOztBQUNBLGNBQUkwZSxJQUFJLEdBQUdMLEdBQUcsQ0FBQy9ULE9BQUosQ0FBWSxJQUFaLEVBQWtCOU8sSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNkJDLEVBQTdCLENBQWdDLENBQWhDLENBQVg7QUFBQSxjQUNFd2pCLElBQUksR0FBR1AsSUFBSSxDQUFDTixPQUFMLEVBRFQ7QUFBQSxjQUVFRixHQUFHLEdBQUcsQ0FGUjtBQUdBZSxVQUFBQSxJQUFJLENBQUMvaUIsSUFBTCxDQUFVLFlBQVk7QUFDcEJuRyxZQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVF5RixJQUFSLENBQWEsT0FBYixFQUFzQmdqQixJQUF0QixDQUEyQixTQUEzQixJQUF3Q04sR0FBRyxFQUEzQyxHQUFnRCxFQUFoRDtBQUNELFdBRkQ7O0FBSUEsY0FBSUEsR0FBRyxLQUFLZSxJQUFJLENBQUMvbUIsTUFBakIsRUFBeUI7QUFDdkJ3bUIsWUFBQUEsSUFBSSxDQUFDbGpCLElBQUwsQ0FBVSxPQUFWLEVBQW1CZ2pCLElBQW5CLENBQXdCLFNBQXhCLEVBQW1DLElBQW5DO0FBQ0FFLFlBQUFBLElBQUksQ0FBQ2xqQixJQUFMLENBQVUsTUFBTXdpQixTQUFoQixFQUEyQnBULFFBQTNCLENBQW9DcVQsT0FBcEM7QUFDRCxXQUhELE1BR087QUFDTFMsWUFBQUEsSUFBSSxDQUFDbGpCLElBQUwsQ0FBVSxPQUFWLEVBQW1CZ2pCLElBQW5CLENBQXdCLFNBQXhCLEVBQW1DLEtBQW5DO0FBQ0FFLFlBQUFBLElBQUksQ0FBQ2xqQixJQUFMLENBQVUsTUFBTXdpQixTQUFoQixFQUEyQnpVLFdBQTNCLENBQXVDMFUsT0FBdkM7QUFDRCxXQTdCdUMsQ0ErQnhDOzs7QUFDQXRpQixVQUFBQSxLQUFLLENBQUNKLEtBQU4sQ0FBWTJHLElBQVosQ0FBaUJ3YyxJQUFqQixFQUF1QnJDLFFBQXZCLEVBQWlDLGFBQWEsR0FBYixHQUFtQkEsUUFBbkIsR0FBOEIsR0FBL0QsRUFBb0U7QUFDbEVsZixZQUFBQSxJQUFJLEVBQUUsVUFENEQ7QUFFbEVzRyxZQUFBQSxHQUFHLEVBQUU0YSxHQUY2RDtBQUdsRU8sWUFBQUEsVUFBVSxFQUFFNWUsT0FIc0Q7QUFJbEU2ZSxZQUFBQSxLQUFLLEVBQUdYLEdBQUcsS0FBS2UsSUFBSSxDQUFDL21CO0FBSjZDLFdBQXBFO0FBTUQsU0F0Q0QsRUFyS29DLENBNk1wQztBQUNBOztBQUNBc0ksUUFBQUEsSUFBSSxDQUFDbkUsTUFBTCxDQUFZLFVBQVosRUFBd0JrTCxNQUF4QjtBQUVELE9BcE5LO0FBc05OO0FBQ0EyWCxNQUFBQSxLQUFLLEVBQUUsZUFBVXhvQixNQUFWLEVBQWtCTSxJQUFsQixFQUF3QlgsRUFBeEIsRUFBNEI7QUFDakMsWUFBSTJuQixTQUFTLEdBQUcsa0JBQWhCO0FBQUEsWUFDRUMsT0FBTyxHQUFHLG9CQURaO0FBQUEsWUFFRWtCLElBQUksR0FBRyxDQUFDLFVBQUQsRUFBYSxVQUFiLENBRlQ7QUFBQSxZQUdFQyxZQUFZLEdBQUcsd0JBSGpCO0FBQUEsWUFLRUMsSUFBSSxHQUFHM29CLE1BQU0sQ0FBQ21PLEVBTGhCO0FBQUEsWUFNRUEsRUFBRSxHQUFHbk8sTUFBTSxDQUFDOG1CLE1BQVAsQ0FBY2hpQixJQUFkLENBQW1CLElBQW5CLENBTlA7QUFBQSxZQU9FeWhCLFNBQVMsR0FBR3ZtQixNQUFNLENBQUN1bUIsU0FQckI7QUFBQSxZQVFFSyxXQUFXLEdBQUc1bUIsTUFBTSxDQUFDQSxNQUFQLENBQWM0bUIsV0FSOUI7QUFBQSxZQVNFQyxTQUFTLEdBQUc3bUIsTUFBTSxDQUFDQSxNQUFQLENBQWM2bUIsU0FUNUI7QUFBQSxZQVVFK0IsV0FBVyxHQUFHdG9CLElBQUksQ0FBQ3VRLE1BQUwsQ0FBWSxVQUFVM00sSUFBVixFQUFnQjtBQUN4QyxpQkFBT0EsSUFBSSxDQUFDMGlCLFdBQUQsQ0FBSixLQUFzQixJQUE3QjtBQUNELFNBRmEsQ0FWaEI7QUFBQSxZQWFFL1AsTUFBTSxHQUFHN1csTUFBTSxDQUFDNlcsTUFibEI7QUFBQSxZQWNFakssS0FBSyxHQUFHNU0sTUFBTSxDQUFDNE0sS0FkakI7QUFBQSxZQWVFaUUsTUFBTSxHQUFHN1EsTUFBTSxDQUFDNlEsTUFmbEI7QUFBQSxZQWdCRXlWLGNBQWMsR0FBR3RtQixNQUFNLENBQUNzbUIsY0FoQjFCO0FBQUEsWUFpQkVELGNBQWMsR0FBR3JtQixNQUFNLENBQUNxbUIsY0FqQjFCLENBRGlDLENBcUJqQzs7QUFDQXBoQixRQUFBQSxLQUFLLENBQUNPLElBQU4sQ0FBV2xGLElBQVgsRUFBaUIsVUFBVW9PLENBQVYsRUFBYXhLLElBQWIsRUFBbUI7QUFDbENpSyxVQUFBQSxFQUFFLENBQUN4TCxNQUFILENBQVUsb0JBQW9CdUIsSUFBSSxDQUFDcWlCLFNBQUQsQ0FBeEIsR0FBc0MsU0FBaEQ7QUFDRCxTQUZEO0FBR0F6YyxRQUFBQSxJQUFJLENBQUNuRSxNQUFMLENBQVksUUFBWixFQUFzQm5HLE9BQU8sQ0FBQ3FSLE1BQTlCLEVBekJpQyxDQTRCakM7O0FBQ0ExQyxRQUFBQSxFQUFFLENBQUNySixJQUFILENBQVEsSUFBUixFQUFjQyxFQUFkLENBQWlCLENBQWpCLEVBQW9CMmlCLE9BQXBCLEdBQThCbGlCLElBQTlCLENBQW1DLFVBQVVuRCxLQUFWLEVBQWlCO0FBQ2xELGNBQUlzbEIsR0FBRyxHQUFHdG9CLENBQUMsQ0FBQyxJQUFELENBQVg7QUFBQSxjQUNFNkUsSUFBSSxHQUFHNUQsSUFBSSxDQUFDK0IsS0FBRCxDQURiO0FBQUEsY0FFRXVsQixVQUFVLEdBQUcxakIsSUFBSSxDQUFDcWlCLFNBQUQsQ0FGbkI7QUFBQSxjQUdFbGxCLEtBQUssR0FBR3VtQixVQUhWOztBQUlBLGNBQUloYixLQUFLLENBQUNwTCxNQUFOLEdBQWUsQ0FBbkIsRUFBc0I7QUFDcEJILFlBQUFBLEtBQUssR0FBRyxFQUFSO0FBQ0E0RCxZQUFBQSxLQUFLLENBQUNPLElBQU4sQ0FBV29ILEtBQVgsRUFBa0IsVUFBVThCLENBQVYsRUFBYW1aLENBQWIsRUFBZ0I7QUFDaEN4bUIsY0FBQUEsS0FBSyxJQUFJNkMsSUFBSSxDQUFDMmpCLENBQUQsQ0FBYjtBQUNBblosY0FBQUEsQ0FBQyxHQUFJOUIsS0FBSyxDQUFDcEwsTUFBTixHQUFlLENBQXBCLEdBQXlCSCxLQUFLLElBQUlpbEIsY0FBbEMsR0FBbUQsRUFBbkQ7QUFDRCxhQUhEO0FBSUQ7O0FBRUQsY0FBSTJCLEVBQUUsR0FBRzVvQixDQUFDLENBQUMsK0JBQStCc21CLFFBQS9CLEdBQTBDLE9BQTFDLEdBQW9EaG1CLEVBQXBELEdBQXlELGVBQXpELEdBQTJFdUUsSUFBSSxDQUFDMmlCLFNBQUQsQ0FBL0UsR0FBNkYsOEJBQTdGLEdBQThIeGxCLEtBQTlILEdBQXNJLGlCQUF0SSxHQUEwSnVtQixVQUExSixHQUF1SyxJQUF4SyxDQUFWOztBQUVBLGNBQUlnQixXQUFXLENBQUNwbkIsTUFBWixHQUFxQixDQUFyQixJQUEwQm9uQixXQUFXLENBQUMsQ0FBRCxDQUFYLENBQWUvQixTQUFmLE1BQThCM2lCLElBQUksQ0FBQzJpQixTQUFELENBQWhFLEVBQTZFO0FBQzNFb0IsWUFBQUEsRUFBRSxDQUFDSCxJQUFILENBQVEsU0FBUixFQUFtQixJQUFuQjtBQUNBalIsWUFBQUEsTUFBTSxDQUFDdk0sSUFBUCxDQUFZc2QsVUFBWjtBQUNBRCxZQUFBQSxHQUFHLENBQUNwVSxNQUFKLEdBQWE0SixJQUFiLEdBQW9CclksSUFBcEIsQ0FBeUIsT0FBekIsRUFBa0NoRSxHQUFsQyxDQUFzQytWLE1BQU0sQ0FBQ2hLLElBQVAsQ0FBWXdaLGNBQVosQ0FBdEM7QUFDRDs7QUFDRHNCLFVBQUFBLEdBQUcsQ0FBQ3ZjLElBQUosQ0FBUzZjLEVBQVQ7QUFDRCxTQXJCRCxFQTdCaUMsQ0FxRGpDOztBQUNBbmUsUUFBQUEsSUFBSSxDQUFDbkUsTUFBTCxDQUFZLE9BQVosRUFBcUJrTCxNQUFyQixFQXREaUMsQ0F3RGpDOztBQUNBMUMsUUFBQUEsRUFBRSxDQUFDckosSUFBSCxDQUFRLElBQVIsRUFBY2xELEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsVUFBVWlELEtBQVYsRUFBaUI7QUFDekMsY0FBSThpQixHQUFHLEdBQUd0b0IsQ0FBQyxDQUFDLElBQUQsQ0FBWDtBQUNBc29CLFVBQUFBLEdBQUcsQ0FBQzdpQixJQUFKLENBQVMsTUFBTXdpQixTQUFmLEVBQTBCcFQsUUFBMUIsQ0FBbUNxVCxPQUFuQyxFQUE0Q3ppQixJQUE1QyxDQUFpRCxHQUFqRCxFQUFzRG9QLFFBQXRELENBQStEd1UsWUFBL0QsRUFBNkV0ZCxJQUE3RSxDQUFrRnFkLElBQUksQ0FBQyxDQUFELENBQXRGO0FBQ0FkLFVBQUFBLEdBQUcsQ0FBQzdpQixJQUFKLENBQVMsT0FBVCxFQUFrQmdqQixJQUFsQixDQUF1QixTQUF2QixFQUFrQyxJQUFsQztBQUNBSCxVQUFBQSxHQUFHLENBQUN4ZCxRQUFKLEdBQWVyRixJQUFmLENBQW9CLE1BQU13aUIsU0FBMUIsRUFBcUN6VSxXQUFyQyxDQUFpRDBVLE9BQWpELEVBQTBEemlCLElBQTFELENBQStELEdBQS9ELEVBQW9FK04sV0FBcEUsQ0FBZ0Y2VixZQUFoRixFQUE4RnRkLElBQTlGLENBQW1HcWQsSUFBSSxDQUFDLENBQUQsQ0FBdkc7QUFDQWQsVUFBQUEsR0FBRyxDQUFDeGQsUUFBSixHQUFlckYsSUFBZixDQUFvQixPQUFwQixFQUE2QmdqQixJQUE3QixDQUFrQyxTQUFsQyxFQUE2QyxLQUE3QyxFQUx5QyxDQU16Qzs7QUFDQTdpQixVQUFBQSxLQUFLLENBQUNKLEtBQU4sQ0FBWTJHLElBQVosQ0FBaUJtYyxHQUFqQixFQUFzQmhDLFFBQXRCLEVBQWdDLFVBQVUsR0FBVixHQUFnQkEsUUFBaEIsR0FBMkIsR0FBM0QsRUFBZ0U7QUFDOURsZixZQUFBQSxJQUFJLEVBQUUsT0FEd0Q7QUFFOURzRyxZQUFBQSxHQUFHLEVBQUU0YSxHQUZ5RDtBQUc5RE8sWUFBQUEsVUFBVSxFQUFFLElBSGtEO0FBSTlEQyxZQUFBQSxLQUFLLEVBQUU7QUFKdUQsV0FBaEU7QUFNRCxTQWJEO0FBY0Q7QUE5UkssS0FOUixDQUQyQyxDQTBTM0M7O0FBQ0FsakIsSUFBQUEsS0FBSyxDQUFDK2dCLE9BQU4sQ0FBY3hhLElBQWQsQ0FBbUJzYSxJQUFuQixFQUF5QkgsUUFBekIsRUFBbUNsZixJQUFJLEdBQUcsR0FBUCxHQUFha2YsUUFBYixHQUF3QixHQUEzRCxFQUFnRUcsSUFBSSxDQUFDeGMsT0FBTCxDQUFhK1csSUFBYixDQUFrQnlGLElBQWxCLENBQWhFO0FBRUF4ZSxJQUFBQSxLQUFLLENBQUNiLElBQUQsQ0FBTCxHQUFjYSxLQUFLLENBQUNiLElBQUQsQ0FBTCxDQUFZakgsT0FBWixFQUFxQmMsSUFBckIsRUFBMkJYLEVBQTNCLENBQWQsR0FBK0MrbEIsSUFBSSxDQUFDdGhCLEtBQUwsQ0FBVyxTQUFTcUMsSUFBVCxHQUFnQixNQUEzQixDQUEvQztBQUVELEdBL1NELENBNU1zQyxDQTZmdEM7OztBQUNBMGYsRUFBQUEsS0FBSyxDQUFDeGhCLFNBQU4sQ0FBZ0IyRSxPQUFoQixHQUEwQixVQUFVOE0sR0FBVixFQUFlO0FBQ3ZDLFFBQUkwUCxJQUFJLEdBQUcsSUFBWDtBQUFBLFFBQ0V0bUIsT0FBTyxHQUFHc21CLElBQUksQ0FBQzlsQixNQURqQjtBQUFBLFFBRUVNLElBQUksR0FBR2QsT0FBTyxDQUFDYyxJQUZqQjtBQUFBLFFBR0VzbUIsV0FBVyxHQUFHcG5CLE9BQU8sQ0FBQ1EsTUFBUixDQUFlNG1CLFdBSC9CO0FBQUEsUUFJRW5nQixJQUFJLEdBQUcyUCxHQUFHLENBQUMzUCxJQUpiO0FBQUEsUUFLRTBoQixLQUFLLEdBQUcvUixHQUFHLENBQUMrUixLQUxkO0FBQUEsUUFNRXBiLEdBQUcsR0FBR3FKLEdBQUcsQ0FBQ3JKLEdBTlo7QUFBQSxRQU9FbWIsVUFBVSxHQUFHOVIsR0FBRyxDQUFDOFIsVUFQbkI7QUFBQSxRQVFFclgsTUFBTSxHQUFHclIsT0FBTyxDQUFDMk8sRUFBUixDQUFXdk8sSUFBWCxDQUFnQixZQUFoQixDQVJYOztBQVVBLFFBQUk2RyxJQUFJLEtBQUssVUFBYixFQUF5QjtBQUN2QmpILE1BQUFBLE9BQU8sQ0FBQ3FYLE1BQVIsR0FBaUIsRUFBakI7QUFDQTlKLE1BQUFBLEdBQUcsQ0FBQzZHLE9BQUosQ0FBWSxJQUFaLEVBQWtCOU8sSUFBbEIsQ0FBdUIsbUJBQXZCLEVBQTRDVSxJQUE1QyxDQUFpRCxVQUFVa0osQ0FBVixFQUFhO0FBQzVELFlBQUlpWixHQUFHLEdBQUd0b0IsQ0FBQyxDQUFDLElBQUQsQ0FBWDtBQUFBLFlBQ0V3cEIsT0FBTyxHQUFHbEIsR0FBRyxDQUFDL25CLElBQUosQ0FBUyxVQUFULENBRFo7QUFBQSxZQUVFMEosT0FBTyxHQUFHcWUsR0FBRyxDQUFDRyxJQUFKLENBQVMsU0FBVCxDQUZaO0FBR0FlLFFBQUFBLE9BQU8sR0FBR3ZvQixJQUFJLENBQUN1b0IsT0FBRCxDQUFKLENBQWNqQyxXQUFkLElBQTZCdGQsT0FBaEMsR0FBMEMsRUFBakQ7QUFDQUEsUUFBQUEsT0FBTyxJQUFJdWYsT0FBWCxHQUFxQnJwQixPQUFPLENBQUNxWCxNQUFSLENBQWV2TSxJQUFmLENBQW9CcWQsR0FBRyxDQUFDL25CLElBQUosQ0FBUyxhQUFULENBQXBCLENBQXJCLEdBQW9FLEVBQXBFO0FBQ0QsT0FORCxFQUZ1QixDQVV2Qjs7QUFDQXdtQixNQUFBQSxlQUFlLENBQUNwbUIsTUFBTSxDQUFDbU8sRUFBUixFQUFZM08sT0FBTyxDQUFDcVgsTUFBcEIsQ0FBZjtBQUNBOUosTUFBQUEsR0FBRyxDQUFDd0csTUFBSixHQUFhNEosSUFBYixHQUFvQnJZLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDaEUsR0FBbEMsQ0FBc0N0QixPQUFPLENBQUNxWCxNQUFSLENBQWVoSyxJQUFmLENBQW9Cck4sT0FBTyxDQUFDNm1CLGNBQTVCLENBQXRDO0FBR0FwaEIsTUFBQUEsS0FBSyxDQUFDSixLQUFOLENBQVkyRyxJQUFaLENBQWlCdUIsR0FBakIsRUFBc0I0WSxRQUF0QixFQUFnQ0EsUUFBUSxHQUFHLEdBQVgsR0FBaUI5VSxNQUFqQixHQUEwQixHQUExRCxFQUErRDtBQUM3RHZILFFBQUFBLE9BQU8sRUFBRTRlLFVBRG9EO0FBRTdEQyxRQUFBQSxLQUFLLEVBQUVBLEtBRnNEO0FBRzdEdFIsUUFBQUEsTUFBTSxFQUFFclgsT0FBTyxDQUFDcVgsTUFINkM7QUFJN0QrUixRQUFBQSxXQUFXLEVBQUV0b0IsSUFBSSxDQUFDdVEsTUFBTCxDQUFZLFVBQVUzTSxJQUFWLEVBQWdCO0FBQ3ZDLGlCQUFPQSxJQUFJLENBQUMwaUIsV0FBRCxDQUFKLEtBQXNCLElBQTdCO0FBQ0QsU0FGWSxDQUpnRDtBQU83RDdaLFFBQUFBLEdBQUcsRUFBRUE7QUFQd0QsT0FBL0Q7QUFVRCxLQXpCRCxNQXlCTyxJQUFJdEcsSUFBSSxLQUFLLE9BQWIsRUFBc0I7QUFFM0IsVUFBSXBFLEtBQUssR0FBRzBLLEdBQUcsQ0FBQ2pJLElBQUosQ0FBUyxPQUFULEVBQWtCbEYsSUFBbEIsQ0FBdUIsVUFBdkIsQ0FBWjtBQUFBLFVBQ0V1QixLQUFLLEdBQUc0TCxHQUFHLENBQUNqSSxJQUFKLENBQVMsT0FBVCxFQUFrQmxGLElBQWxCLENBQXVCLGFBQXZCLENBRFY7QUFHQUosTUFBQUEsT0FBTyxDQUFDcVgsTUFBUixHQUFpQixDQUFDMVYsS0FBRCxDQUFqQjtBQUNBNEwsTUFBQUEsR0FBRyxDQUFDd0csTUFBSixHQUFhNEosSUFBYixHQUFvQnJZLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDaEUsR0FBbEMsQ0FBc0NLLEtBQXRDO0FBRUE4RCxNQUFBQSxLQUFLLENBQUNPLElBQU4sQ0FBV2xGLElBQVgsRUFBaUIsVUFBVW9PLENBQVYsRUFBYXhLLElBQWIsRUFBbUI7QUFDbENBLFFBQUFBLElBQUksQ0FBQzBpQixXQUFELENBQUosR0FBb0IsS0FBcEI7QUFDRCxPQUZEO0FBSUF0bUIsTUFBQUEsSUFBSSxDQUFDK0IsS0FBRCxDQUFKLENBQVl1a0IsV0FBWixJQUEyQixJQUEzQjtBQUVBM2hCLE1BQUFBLEtBQUssQ0FBQ0osS0FBTixDQUFZMkcsSUFBWixDQUFpQnVCLEdBQWpCLEVBQXNCNFksUUFBdEIsRUFBZ0NBLFFBQVEsR0FBRyxHQUFYLEdBQWlCOVUsTUFBakIsR0FBMEIsR0FBMUQsRUFBK0Q7QUFDN0QxUCxRQUFBQSxLQUFLLEVBQUVBLEtBRHNEO0FBRTdEeW5CLFFBQUFBLFdBQVcsRUFBRXRvQixJQUFJLENBQUMrQixLQUFELENBRjRDO0FBRzdEMEssUUFBQUEsR0FBRyxFQUFFQTtBQUh3RCxPQUEvRDtBQUtEO0FBRUYsR0F6REQsQ0E5ZnNDLENBeWpCdEM7OztBQUNBb1osRUFBQUEsS0FBSyxDQUFDeGhCLFNBQU4sQ0FBZ0J1aEIsVUFBaEIsR0FBNkIsWUFBWTtBQUN2QyxRQUFJSixJQUFJLEdBQUcsSUFBWDtBQUFBLFFBQ0V0bUIsT0FBTyxHQUFHc21CLElBQUksQ0FBQzlsQixNQURqQjtBQUFBLFFBRUVNLElBQUksR0FBR2QsT0FBTyxDQUFDYyxJQUZqQjtBQUFBLFFBR0VzbUIsV0FBVyxHQUFHcG5CLE9BQU8sQ0FBQ1EsTUFBUixDQUFlNG1CLFdBSC9CO0FBS0EsV0FBTztBQUNML1AsTUFBQUEsTUFBTSxFQUFFclgsT0FBTyxDQUFDcVgsTUFEWDtBQUVMdlcsTUFBQUEsSUFBSSxFQUFFQSxJQUFJLENBQUN1USxNQUFMLENBQVksVUFBVTNNLElBQVYsRUFBZ0I7QUFDaEMsZUFBT0EsSUFBSSxDQUFDMGlCLFdBQUQsQ0FBSixLQUFzQixJQUE3QjtBQUNELE9BRks7QUFGRCxLQUFQO0FBTUQsR0FaRCxDQTFqQnNDLENBd2tCdEM7OztBQUNBeFksRUFBQUEsVUFBVSxDQUFDekksTUFBWCxHQUFvQixVQUFVbkcsT0FBVixFQUFtQnNwQixhQUFuQixFQUFrQztBQUVwRCxRQUFJQyxHQUFHLEdBQUcsSUFBSTVDLEtBQUosQ0FBVTNtQixPQUFWLEVBQW1Cc3BCLGFBQW5CLENBQVY7QUFDQSxXQUFPN0MsT0FBTyxDQUFDemEsSUFBUixDQUFhdWQsR0FBYixDQUFQO0FBQ0QsR0FKRDs7QUFNQXRELEVBQUFBLE9BQU8sQ0FBQyxZQUFELEVBQWVyWCxVQUFmLENBQVA7QUFFRCxDQWpsQkQiLCJmaWxlIjoicGxnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiO1xyXG4oZnVuY3Rpb24oJCkge1xyXG5cclxuICAgICQuZm4uaW5pdFBsZ0NhcmQgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHBnID0gbmV3IFBsZ0NhcmQob3B0aW9ucyk7XHJcbiAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgcGcucmVuZGVyVG8oaWQpO1xyXG4gICAgICAgIHJldHVybiBwZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgUGxnQ2FyZCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucmVuZGVyZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaHRtbEZyYWdtZW50ICBodG1s5Luj56CB54mH5q61XHJcbiAgICAgICAgICogY29uZmlnIOm7mOiupOeahOmFjee9ruaWh+S7tlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBodG1sRnJhZ21lbnQsIGNvbmZpZztcclxuXHJcbiAgICAgICAgY29uZmlnID0ge307XHJcbiAgICAgICAgLy8gY29uZmlnID0gT2JqZWN0LmFzc2lnbihjb25maWcsIG9wdGlvbnMuY29uZmlnKTtcclxuICAgICAgICBjb25maWcgPSAkLmV4dGVuZCh7fSwgY29uZmlnLCBvcHRpb25zLmNvbmZpZyk7XHJcblxyXG4gICAgICAgIHZhciBmYWN0b3J5ID0ge1xyXG4gICAgICAgICAgICBfc3R5bGU6IGNvbmZpZy5zdHlsZSxcclxuICAgICAgICAgICAgX2RhdGE6IGNvbmZpZy5kYXRhIHx8ICcnLFxyXG4gICAgICAgICAgICBfc3RyVGl0bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwicGxnLWNhcmQtY29tcG9uZW50c1wiPiBcXFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmQtaGVhZGVyLWNvbnRhaW5lclwiPlxcXHJcbiAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD48bGVnZW5kPic7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9zdHJIZWFkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cInBsZy1jYXJkLWdyb3VwXCI+JztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX3N0clRpdGxlSGVhZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwvbGVnZW5kPjwvZmllbGRzZXQ+PC9kaXY+PGRpdiBjbGFzcz1cInBsZy1jYXJkLWdyb3VwXCI+JztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX3N0ckZvb3RlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzwvZGl2Pic7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9zdHJGb290ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZW5lcmF0ZU9uZVRlbXBsYXRlOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkLW5vXCI+JHt2YWwuY2FyZE5vfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1tYWluXCI+JHt2YWwuY2FyZE5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICBcclxuICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInBsZy1jYXJkLWJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbUJ0bnMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB2YWwuYnRuLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtQnRucyArPSBgXHJcbiAgICAgICAgICAgICAgICA8bGk+JHt2YWx1ZS50ZXh0fTwvbGk+XHJcbiAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHRlbUJ0bnM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbUZyYWdtZW50O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbmVUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5fZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1ub1wiPiR7dmFsLmNhcmROb308L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmQtbWFpblwiPiR7dmFsLmNhcmROYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgXHJcbiAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJwbGctY2FyZC1idG4tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1CdG5zID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsLmJ0bi5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbUJ0bnMgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGxpPiR7dmFsdWUudGV4dH08L2xpPlxyXG4gICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSB0ZW1CdG5zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IGBcclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLl9zdHJIZWFkKCkgKyB0ZW1GcmFnbWVudCArIHNlbGYuX3N0ckZvb3RlcigpO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHdvVGVtcGxhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuICd0d29UZW1wbGF0ZSc7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1jYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZC1ib2R5IHByaW1hcnlcIj5cclxuICAgICAgICAgICAgICAgICAgICAke3ZhbC5jYXJkTmFtZX1cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gIFxyXG4gICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicGxnLWNhcmQtYnRuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtQnRucyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5idG4uZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1CdG5zICs9IGBcclxuICAgICAgICAgICAgICAgIDxsaT4ke3ZhbHVlLnRleHR9PC9saT5cclxuICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gdGVtQnRucztcclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBgXHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5fc3RySGVhZCgpICsgdGVtRnJhZ21lbnQgKyBzZWxmLl9zdHJGb290ZXIoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGhyZWVUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gJ3RocmVlVGVtcGxhdGUnO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5fZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNhcmQtYm9keSBwcmltYXJ5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJHt2YWwuY2FyZE5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICBcclxuICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInBsZy1jYXJkLWJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbUJ0bnMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB2YWwuYnRuLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtQnRucyArPSBgXHJcbiAgICAgICAgICAgICAgICA8bGk+JHt2YWx1ZS50ZXh0fTwvbGk+XHJcbiAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHRlbUJ0bnM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYFxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuX3N0ckhlYWQoKSArIHRlbUZyYWdtZW50ICsgc2VsZi5fc3RyRm9vdGVyKCk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhZGRUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicGxnLWNhcmQgcGxnLWFkZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLWFkZC0xIFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25lVGl0bGVUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYDxkaXYgY2xhc3M9XCJwbGctY2FyZC1jb21wb25lbnRzXCI+PGRpdiBjbGFzcz1cInBsZy1jYXJkLWhlYWRlci1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxmaWVsZHNldD48bGVnZW5kPlxyXG4gICAgICAgICAgICAgICAgJHt2YWwudGl0bGV9XHJcbiAgICAgICAgICAgICAgICA8bGVnZW5kPjxmaWVsZHNldD48L2Rpdj5gO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLl9zdHJIZWFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5nZW5lcmF0ZU9uZVRlbXBsYXRlKHZhbC5kYXRhTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5fc3RyRm9vdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYDwvZGl2PmA7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbUZyYWdtZW50O1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25lVGl0bGVBZGRUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBpZighc2VsZi5fZGF0YSB8fCBzZWxmLl9kYXRhLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gYDxkaXYgY2xhc3M9XCJwbGctY2FyZC1jb21wb25lbnRzXCI+PGRpdiBjbGFzcz1cInBsZy1jYXJkLWhlYWRlci1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxmaWVsZHNldD48bGVnZW5kPlxyXG4gICAgICAgICAgICAgICAgJHt2YWwudGl0bGV9XHJcbiAgICAgICAgICAgICAgICA8bGVnZW5kPjxmaWVsZHNldD48L2Rpdj5gO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLl9zdHJIZWFkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5nZW5lcmF0ZU9uZVRlbXBsYXRlKHZhbC5kYXRhTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5hZGRUZW1wbGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHNlbGYuX3N0ckZvb3RlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IGA8L2Rpdj5gO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZW1GcmFnbWVudDtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIOWQkeWkluaatOmcsuWHuuacgOWQjueahOaooeeJiOagt+W8j1xyXG4gICAgICAgICAgICBnZXRIdG1sRnJhZ21lbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJOYW1lID0gc2VsZi5fc3R5bGUgKyAnVGVtcGxhdGUnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGZbYXR0ck5hbWVdID8gc2VsZlthdHRyTmFtZV0oKSA6IG5ldyBFcnJvcign5LiN5a2Y5Zyo6L+Z5Liq5pa55rOVJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gLy9jb25zb2xlLmxvZyhmYWN0b3J5LmdldEh0bWxGcmFnbWVudCgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbiA9IGZ1bmN0aW9uKGV2ZW50bmFtZSwgY2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBST1VUSU5FX09QRVJBVElPTiA9IFsnb25lJywgJ3R3bycsICd0aHJlZSddLFxyXG4gICAgICAgICAgICAgICAgQ09NUExFWF9PUEVSQVRJT04gPSBbJ29uZVRpdGxlJywgJ3R3b1RpdGxlJywgJ3RocmVlVGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdvbmVUaXRsZUFkZCcsICd0d29UaXRsZUFkZCcsICd0aHJlZVRpdGxlQWRkJ107XHJcblxyXG4gICAgICAgICAgICAvLyDmraTlpITlpJrkuobkuIDkuKpvbmVUaXRsZeexu+Wei1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5zdHlsZSAhPT0gJ2FkZCdcclxuICAgICAgICAgICAgICAgICYmIGV2ZW50bmFtZSAmJiBldmVudG5hbWUgPT0gJ2NsaWNrJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChST1VUSU5FX09QRVJBVElPTi5pbmNsdWRlcyhjb25maWcuc3R5bGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBvcHRpb25zLnJlbmRlcmVyKS5vbignY2xpY2snLCAnbGknLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVtSW5kZXggPSAkKHRoaXMpLmNsb3Nlc3QoXCIucGxnLWNhcmRcIikuaW5kZXgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmRObyA9IGNvbmZpZy5kYXRhW3RlbUluZGV4XS5jYXJkTm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxsX2JhY2tfZm4gPSBjb25maWcuZGF0YVt0ZW1JbmRleF0uYnRuWyQodGhpcykuaW5kZXgoKV0uZm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjYXJkTm8sIGNhbGxfYmFja19mbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoQ09NUExFWF9PUEVSQVRJT04uaW5jbHVkZXMoY29uZmlnLnN0eWxlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBvcHRpb25zLnJlbmRlcmVyKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgJ2xpJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwSW5kZXggPSAkKHRoaXMpLmNsb3Nlc3QoXCIucGxnLWNhcmQtY29tcG9uZW50c1wiKS5pbmRleCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtSW5kZXggPSAkKHRoaXMpLmNsb3Nlc3QoXCIucGxnLWNhcmRcIikuaW5kZXgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnREYXRhID0gY29uZmlnLmRhdGFbZ3JvdXBJbmRleF0uZGF0YUxpc3RbdGVtSW5kZXhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZE5vLCBjYWxsX2JhY2tfZm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkTm8gPSBjdXJyZW50RGF0YS5jYXJkTm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxfYmFja19mbiA9IGN1cnJlbnREYXRhLmJ0blskKHRoaXMpLmluZGV4KCldLmZuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gY29uZmlnLmRhdGFbZ3JvdXBJbmRleF0udGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soY2FyZE5vLCBjYWxsX2JhY2tfZm4sIHRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGNhcmRObywgY2FsbF9iYWNrX2ZuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBvcHRpb25zLnJlbmRlcmVyKS5vbignY2xpY2snLCAnLnBsZy1hZGQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBJbmRleCA9ICQodGhpcykuY2xvc2VzdChcIi5wbGctY2FyZC1jb21wb25lbnRzXCIpLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IGNvbmZpZy5kYXRhW2dyb3VwSW5kZXhdLnRpdGxlOyAvLyDpnIDopoHojrflj5blvZPliY3nmoR0aXRsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh1bmRlZmluZWQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuc3R5bGUgPT09ICdhZGQnXHJcbiAgICAgICAgICAgICAgICAmJiBldmVudG5hbWUgJiYgZXZlbnRuYW1lID09ICdjbGljaycpIHtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgb3B0aW9ucy5yZW5kZXJlcikub24oJ2NsaWNrJywgJy5wbGctY2FyZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJUbyA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgICAgICQoJyMnICsgaWQpLmFwcGVuZChmYWN0b3J5LmdldEh0bWxGcmFnbWVudCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLnJlbmRlcmVyKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRvKG9wdGlvbnMucmVuZGVyZXIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5QbGdDYXJkID0gUGxnQ2FyZDtcclxuXHJcbn0gKGpRdWVyeSkpOyIsIjtcclxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gICQuZm4uaW5pdFBsZ0NhcmRMaXN0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHZhciBwZyA9IG5ldyBQbGdDYXJkTGlzdChvcHRpb25zKTtcclxuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgcGcucmVuZGVyVG8oaWQpO1xyXG4gICAgcmV0dXJuIHBnO1xyXG4gIH1cclxuXHJcbiAgdmFyIFBsZ0NhcmRMaXN0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIGlmICghb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogaHRtbEZyYWdtZW50ICBodG1s5Luj56CB54mH5q61XHJcbiAgICAgKiBjb25maWcg6buY6K6k55qE6YWN572u5paH5Lu2XHJcbiAgICAgKi9cclxuICAgIHZhciBodG1sRnJhZ21lbnQsIGNvbmZpZztcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgaXNTaG93QWRkOiB0cnVlICAgLy8g6buY6K6k5pi+56S6XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLCBvcHRpb25zLmRhdGEpO1xyXG5cclxuICAgIHZhciBmYWN0b3J5ID0ge1xyXG4gICAgICBfZGF0YTogY29uZmlnIHx8ICcnLFxyXG4gICAgICBfc3RyVGl0bGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRlbVN0ciA9ICcnO1xyXG5cclxuICAgICAgICB0ZW1TdHIgKz0gYDxkaXYgY2xhc3M9XCJwbGctem9uZS1jb250YWluZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLXpvbmUtaGVhZGVyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLXRpdGxlXCI+PGkgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLWljb24tbG9jYXRpb25cIj48L2k+XHJcbiAgICAgICAgICAkeyBzZWxmLl9kYXRhLnpvbmVOYW1lIH08L2Rpdj5gO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHNlbGYuX2RhdGEuaXNTaG93QWRkKXtcclxuICAgICAgICAgIHRlbVN0ciArPSBgPGRpdiBjbGFzcz1cInBsZy1hZGRcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImxheXVpLWJ0biBsYXl1aS1idG4tbm9ybWFsXCIgZGF0YS16b25laWQ9JHtzZWxmLl9kYXRhLnpvbmVJZH0gbmFtZT1cInBsZy1hZGRcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImxheXVpLWljb25cIj4mI3hlNjU0OzwvaT5cclxuICAgICAgICAgICAgICDmt7vliqBcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGVtU3RyICs9IGA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY3VzdG9tZXItbGlzdFwiPlxyXG4gICAgICAgICAgPHVsIGNsYXNzPVwibGF5dWktcm93XCI+YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRlbVN0cjtcclxuICAgICAgfSxcclxuICAgICAgX3N0ckNlbGxTdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBgPGxpIGNsYXNzPVwibGF5dWktY29sLWxnMyBsYXl1aS1jb2wtbWQ0IGxheXVpLWNvbC1zbTYgXHJcbiAgICAgICAgbGF5dWktY29sLXhzMTJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGxnLWNlbGxcIj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBfc3RyQ2VsbEhlYWQ6IGZ1bmN0aW9uIChoZWFkKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicGxnLWN1c3RvbWVyLW5hbWVcIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwicGxnLWJhZGdlLWRvdFwiPjwvaT4keyBoZWFkIH1cclxuICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBfc3RyQ2VsbEJvZHk6IGZ1bmN0aW9uIChkZXMpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJwbGctY3VzdG9tZXItZGVzXCI+JHsgZGVzIH08L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBfc3RyQ2VsbEZvb3RlcjogZnVuY3Rpb24gKG9iaikge1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmopO1xyXG4gICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgIHZhciB0ZW1GcmFnbWVudCA9Jyc7XHJcbiAgICAgICAgdGVtRnJhZ21lbnQgKz0gYDxkaXYgY2xhc3M9XCJwbGctY3VzdG9tZXItb3RoZXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctY3V0b21lci1ub1wiPue8luWPtzo8c3Bhbj4keyBvYmoudXNlTm8gfTwvc3Bhbj48L2Rpdj5gO1xyXG5cclxuICAgICAgICB2YXIgb3BlcmF0Rm5MZW5ndGggPSBPYmplY3Qua2V5cyhvYmouYnRucykubGVuZ3RoO1xyXG4gICAgICAgIHZhciB0ZW1TdHIgPSAnJztcclxuICAgICAgICBpZihvcGVyYXRGbkxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgdGVtU3RyICs9IGA8ZGl2IGNsYXNzPVwicGxnLWN1dG9tZXItb3BlcmF0aW5nXCIgZGF0YS1pZD0ke29iai5pZH0+YDtcclxuICAgICAgICAgIHZhciBpdGVtO1xyXG4gICAgICAgICAgZm9yKGl0ZW0gaW4gb2JqLmJ0bnMpe1xyXG4gICAgICAgICAgICB0ZW1TdHIgKz0gYDxzcGFuIGNsYXNzPVwicGxnLSR7aXRlbX1cIj4ke29iai5idG5zW2l0ZW1dfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGVtU3RyICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCfnlKjmiLfphY3nva7nmoTmk43kvZzkuLrnqbonKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGVtRnJhZ21lbnQgKz0gdGVtU3RyO1xyXG4gICAgICAgIHRlbUZyYWdtZW50ICs9ICc8L2Rpdj4nO1xyXG4gICAgICBcclxuICAgICAgICByZXR1cm4gdGVtRnJhZ21lbnQ7XHJcbiAgICAgIH0sXHJcbiAgICAgIF9zdHJDZWxsRW5kOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBgPC9kaXY+XHJcbiAgICAgICAgPC9saT5gO1xyXG4gICAgICB9LFxyXG4gICAgICBfc3RyRm9vdGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8L3VsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgICAgfSxcclxuICAgICAgLy8g5ZCR5aSW5pq06Zyy5Ye65pyA5ZCO55qE5qih54mI5qC35byPXHJcbiAgICAgIGdldEh0bWxGcmFnbWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgdGVtRnJhZ21lbnQgPSAnJztcclxuXHJcbiAgICAgICAgaWYoc2VsZi5fZGF0YS5jdXN0b21lckxpc3QgJiYgc2VsZi5fZGF0YS5jdXN0b21lckxpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICBzZWxmLl9kYXRhLmN1c3RvbWVyTGlzdC5tYXAoZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGVtT2JqID0ge1xyXG4gICAgICAgICAgICAgIGlkOiB2YWwuaWQsXHJcbiAgICAgICAgICAgICAgdXNlTm86IHZhbC51c2VObyxcclxuICAgICAgICAgICAgICBidG5zOiB2YWwuYnRuc1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5fc3RyQ2VsbFN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRlbUZyYWdtZW50ICs9IHNlbGYuX3N0ckNlbGxIZWFkKHZhbC5uYW1lKTtcclxuICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5fc3RyQ2VsbEJvZHkodmFsLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgdGVtRnJhZ21lbnQgKz0gc2VsZi5fc3RyQ2VsbEZvb3Rlcih0ZW1PYmopO1xyXG4gICAgICAgICAgICB0ZW1GcmFnbWVudCArPSBzZWxmLl9zdHJDZWxsRW5kKCk7XHJcblxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkKHNlbGYuX3N0clRpdGxlKCkgKyB0ZW1GcmFnbWVudCArIHNlbGYuX3N0ckZvb3RlcigpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFBsZ0NhcmRMaXN0LnByb3RvdHlwZS5jdXNvbiA9ZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcbiAgICAvLyDlvZNldmVudE5hbWXkuLphZGTnmoTml7blgJnvvIxpbmRleCDmmK/kuIDkuKpmdW5jdGlvbu+8jGNhbGxiYWNr5Li656m6XHJcbiAgICB0aGlzLm9uID0gZnVuY3Rpb24gKGV2ZW50bmFtZSwgY2FsbGJhY2spIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICBpZihldmVudG5hbWUgPT09ICdhZGQnKXtcclxuICAgICAgIFxyXG4gICAgICAgIHNlbGYuZXZlbnQuZmluZCgnLnBsZy1hZGQnKS5lcSgwKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB2YXIgY3VycmVudElkID0gJCh0aGlzKS5maW5kKCcubGF5dWktYnRuJykuZXEoMCkuZGF0YSgnem9uZWlkJyk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soY3VycmVudElkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYoc2VsZi5ldmVudC5maW5kKCcucGxnLScgKyBldmVudG5hbWUpLmxlbmd0aCl7XHJcbiAgICAgICAgICBzZWxmLmV2ZW50LmZpbmQoJy5wbGctJyArIGV2ZW50bmFtZSkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50SWQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5wbGctY3V0b21lci1vcGVyYXRpbmcnKS5kYXRhKCdpZCcpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjdXJyZW50SWQpO1xyXG5cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+e7keWumueahOS6i+S7tuS4jeWtmOWcqDo6JyArIGV2ZW50bmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlclRvID0gZnVuY3Rpb24gKGlkKSB7XHJcblxyXG4gICAgICB0aGlzLmV2ZW50ID0gZmFjdG9yeS5nZXRIdG1sRnJhZ21lbnQoKTtcclxuXHJcbiAgICAgICQoJyMnICsgaWQpLmFwcGVuZCh0aGlzLmV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5yZW5kZXJlcikge1xyXG4gICAgICB0aGlzLnJlbmRlclRvKG9wdGlvbnMucmVuZGVyZXIpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHdpbmRvdy5QbGdDYXJkTGlzdCA9IFBsZ0NhcmRMaXN0O1xyXG5cclxufShqUXVlcnkpKTsiLCI7KGZ1bmN0aW9uICgkLCBsYXl1aSkge1xuXG4gICAgLy9QbGdUYWJzLmpzXG4gICAgbGF5dWkudXNlKFtcImxheWRhdGVcIl0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBsZ0RhdGU9bGF5dWkubGF5ZGF0ZTtcblxuICAgICAgICAgICAgd2luZG93LnBsZ0RhdGUgPSBwbGdEYXRlO1xuXG5cbiAgICAgICAgICAgICQuZm4ucGxnRGF0ZVJlbmRlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZz17XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOlwiXCIsICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgIHZhciBfdGhpcz10aGlzXG4gICAgICAgICAgICAgICAgdmFyIG9wdHM9JC5leHRlbmQodHJ1ZSxjb25maWcsb3B0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5sZW5ndGg+MSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmVhY2goZnVuY3Rpb24oaW5kZXgsdmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuZWxlbT10aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm90cHM9cGxnRGF0ZS5yZW5kZXIob3B0cylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5lbGVtPXRoaXMuc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdHBzPXBsZ0RhdGUucmVuZGVyKG9wdHMpIFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgIHJldHVybiBfdGhpc1xuICAgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgXG4gICAgfSk7XG5cblxufSkoalF1ZXJ5LCBsYXl1aSk7IiwiO1xuKGZ1bmN0aW9uICgkLCBsYXl1aSkge1xuXG4gIC8vUGxnVGFicy5qc1xuICBsYXl1aS51c2UoW1wibGF5ZXJcIl0sIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGF5ZXIgPSBsYXl1aS5sYXllcjtcblxuICAgIGxheWVyLmNvbmZpZyh7XG4gICAgICBhbmltOiAwLCAvL+m7mOiupOWKqOeUu+mjjuagvFxuICAgICAgekluZGV4OiAxMDAwMCxcbiAgICAgIC8vc2tpbjogJ2xheXVpLWxheWVyLWxhbicsXG4gICAgICBzaGFkZTogMC41LFxuICAgICAgYnRuQWxpZ246ICdyJyxcbiAgICAgIGZpeGVkOiBmYWxzZVxuICAgIH0pO1xuXG5cbiAgICB2YXIgcGxnRGlhbG9nID0gbGF5ZXI7XG5cbiAgICBwbGdEaWFsb2cuc2hvd1VwbG9hZERpYWxvZyA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIHZhciB3aW5vcHRpb25zID0ge1xuICAgICAgICB0aXRsZTogXCLkuIrkvKDmlofku7ZcIixcbiAgICAgICAgc2tpbjogJ2xheXVpLWxheWVyLWxhbicsXG4gICAgICAgIGNsb3NlQnRuOiAxLFxuICAgICAgICB0eXBlOiAxLFxuICAgICAgICByZXNpemU6IHRydWUsXG4gICAgICAgIGJ0bjogW1wi5LiK5LygXCIsIFwi5Y+W5raIXCJdLFxuICAgICAgICBidG4xOiBmdW5jdGlvbiAoaW5kZXgsIGxheWVybykge1xuICAgICAgICAgIFBsZ0RpYWxvZy5jbG9zZShpbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIGJ0bjI6IGZ1bmN0aW9uIChpbmRleCwgbGF5ZXJvKSB7XG4gICAgICAgICAgUGxnRGlhbG9nLmNsb3NlKGluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgYXJlYTogWyczMDBweCcsICczMDBweCddLFxuICAgICAgICBjb250ZW50OiAnPGRpdiBpZD1cInh4LXdpbi1kZC0xXCI+PC9kaXY+JyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGxheWVybywgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgZm9ybWRhdGEgPSBbe1xuICAgICAgICAgICAgdHlwZTogXCJ1cGxvYWRcIixcbiAgICAgICAgICAgIG5hbWU6IFwiZmlsZXNcIixcbiAgICAgICAgICAgIHVybDogdXJsXG4gICAgICAgICAgfV07XG4gICAgICAgICAgdmFyIG1mID0gbmV3IFBsZ0Zvcm0oe1xuICAgICAgICAgICAgaXRlbXM6IGZvcm1kYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbWYucmVuZGVyVG8oXCJ4eC13aW4tZGQtMVwiKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgbGF5ZXIub3Blbih3aW5vcHRpb25zKTtcblxuICAgIH07XG5cblxuICAgIHBsZ0RpYWxvZy5zaG93R3JpZERpYWxvZyA9IGZ1bmN0aW9uIChwbGdHcmlkLCBjYWxsYmFjaywgb3B0cykge1xuICAgICAgdmFyIHdpbm9wdGlvbnMgPSB7XG4gICAgICAgIHRpdGxlOiBvcHRzLnRpdGxlID8gb3B0cy50aXRsZSA6IFwiXCIsXG4gICAgICAgIHNraW46ICdsYXl1aS1sYXllci1sYW4nLFxuICAgICAgICBjbG9zZUJ0bjogMSxcbiAgICAgICAgdHlwZTogMSxcbiAgICAgICAgcmVzaXplOiB0cnVlLFxuICAgICAgICB0aXBzTW9yZTogdHJ1ZSxcbiAgICAgICAgYnRuOiBbXCLpgInmi6lcIiwgXCLlj5bmtohcIl0sXG4gICAgICAgIGJ0bjE6IGZ1bmN0aW9uIChpbmRleCwgbGF5ZXJvKSB7XG4gICAgICAgICAgdmFyIGlkID0gcGxnR3JpZC5nZXRTZWxlY3RlZFJvd0lkKCk7XG4gICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgbGF5ZXIubXNnKFwi5Li66YCJ5oup5pWw5o2uXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciByZWNvcmQgPSBwbGdHcmlkLmdldFNlbGVjdGVkUm93RGF0YSgpO1xuXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2soaWQsIHJlY29yZCk7XG5cbiAgICAgICAgICBQbGdEaWFsb2cuY2xvc2UoaW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICBidG4yOiBmdW5jdGlvbiAoaW5kZXgsIGxheWVybykge1xuICAgICAgICAgIFBsZ0RpYWxvZy5jbG9zZShpbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFyZWE6IFtvcHRzLndpZHRoICsgJ3B4Jywgb3B0cy5oZWlnaHQgKyAncHgnXSxcbiAgICAgICAgY29udGVudDogJzxkaXYgaWQ9XCInICsgcGFuZWxJZCArICctd2luLWdyaWQtMVwiPjwvZGl2PicsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChsYXllcm8sIGluZGV4KSB7XG4gICAgICAgICAgcGxnR3JpZC5yZW5kZXJUbyhwYW5lbElkICsgJy13aW4tZ3JpZC0xJyk7XG4gICAgICAgICAgcGxnR3JpZC5sb2FkRGF0YSgpO1xuICAgICAgICAgIHBsZ0dyaWQub24oXCJvblJvd0RibENsaWNrZWRcIiwgZnVuY3Rpb24gKHJpZCwgaW5kKSB7XG4gICAgICAgICAgICB2YXIgcmVjb3JkID0gcGxnR3JpZC5nZXRVc2VyRGF0YShyaWQsIFwiZGF0YVwiKTs7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICAgIGNhbGxiYWNrKHJpZCwgcmVjb3JkKTtcblxuICAgICAgICAgICAgUGxnRGlhbG9nLmNsb3NlKGluZGV4KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKHR5cGUgPT0gMSkge1xuICAgICAgICB3aW5vcHRpb25zLmJ0biA9IFtcIuS/neWtmFwiLCBcIuWPlua2iFwiXTtcbiAgICAgICAgd2lub3B0aW9ucy5idG4yID0gd2lub3B0aW9ucy5idG4zO1xuICAgICAgICB3aW5vcHRpb25zLmJ0bjMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBQbGdEaWFsb2cub3Blbih3aW5vcHRpb25zKTtcbiAgICB9O1xuXG5cbiAgICBwbGdEaWFsb2cubG9hZGluZzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgaW5kZXggPSBQbGdEaWFsb2cubG9hZCgyLCB7XG4gICAgICAgIHNoYWRlOiBbMC42LCAnI2ZmZiddIC8vMC4x6YCP5piO5bqm55qE55m96Imy6IOM5pmvXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUGxnRGlhbG9nLmNsb3NlKGluZGV4KVxuICAgICAgfVxuICAgIH1cbiAgICBcblxuICAgIFxuICAgIHdpbmRvdy5QbGdEaWFsb2cgPSBwbGdEaWFsb2c7XG5cbiAgfSk7XG5cblxuXG59KShqUXVlcnksIGxheXVpKTsiLCIoZnVuY3Rpb24oJCwgbGF5dWkpe1xuICAkLmZuLmluaXRQbGdJbnB1dFRhZ3MgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBwZyA9IG5ldyBwbGdJbnB1dFRhZ3Mob3B0aW9ucyk7XG4gICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XG4gICAgcGcucmVuZGVyVG8oaWQpO1xuICAgIHJldHVybiBwZztcbiAgfVxuXG4gIHZhciBwbGdJbnB1dFRhZ3MgPSBmdW5jdGlvbiAocGFyYW1zKXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICBcbiAgICB2YXIgY2xhc3NNYWluID0ge1xuICAgICAgY2hlY2tib3hOYW1lOiAnJyxcbiAgICAgIGxheUZpbHRlcjogJycsXG4gICAgICBkYXRhOiBudWxsLFxuICAgICAgZG9tOiBudWxsLFxuICAgICAgdGFnc0lkOiAndGFncy0nICsgUHJvbG9nLmNyZWF0ZVJhbmRvbUlkKCksXG4gICAgICBtZXVuUGFuZWxUaGlzOiBudWxsLFxuICAgICAgc2V0RGVmYXVsdFZhbHVlOiBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgaWYoIShkYXRhICYmIGRhdGEubGVuZ3RoID4gMCkpe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eUqOaIt+S8oOmAkui/m+adpeeahOaVsOaNruS4jeaYr+aVsOe7hCcpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEubWFwKGZ1bmN0aW9uKHZhbCl7XG5cbiAgICAgICAgICBpZighdmFsLmhhc093blByb3BlcnR5KCdjaGVja2VkJykpe1xuICAgICAgICAgICAgdmFsLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgICB9LFxuICAgICAgd3JhcFRlbXBsYXRlOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciB0ZW1UZW1wbGF0ZSA9ICcnO1xuICAgICAgICBcbiAgICAgICAgdGVtVGVtcGxhdGUgKz0gYDxkaXYgY2xhc3M9XCJsYXl1aS1mb3JtLWl0ZW1cIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwibGF5dWktZm9ybS1sYWJlbFwiPuWOn+Wni+WkjemAieahhjwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1pbnB1dC1ibG9ja1wiPmA7XG5cbiAgICAgICAgc2VsZi5kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsKXtcbiAgICAgICAgICB0ZW1UZW1wbGF0ZSArPSBgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFxuICAgICAgICAgIG5hbWU9XCIke3NlbGYuY2hlY2tib3hOYW1lfVske3ZhbC5hbGlhc31dXCIgXG4gICAgICAgICAgbGF5LXNraW49XCJwcmltYXJ5XCIgbGF5LWZpbHRlcj1cIiR7c2VsZi5sYXlGaWx0ZXJ9XCIgXG4gICAgICAgICAgdGl0bGU9XCIke3ZhbC50ZXh0fVwiICR7IHZhbC5jaGVja2VkID8gJ2NoZWNrZWQ9XCJcIicgOiAnJ30gLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktdW5zZWxlY3QgbGF5dWktZm9ybS1jaGVja2JveCAkeyB2YWwuY2hlY2tlZCA/ICdsYXl1aS1mb3JtLWNoZWNrZWQnIDogJyd9XCIgXG4gICAgICAgICAgbGF5LXNraW49XCJwcmltYXJ5XCI+PHNwYW4+JHt2YWwudGV4dH08L3NwYW4+XG4gICAgICAgICAgPGkgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLWljb24tb2tcIj48L2k+PC9kaXY+XG4gICAgICAgICAgYDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGVtVGVtcGxhdGUgKz0gYDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1mb3JtLWl0ZW1cIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYXl1aS1mb3JtLWxhYmVsXCI+5bey57uP6YCJ5LitPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktaW5wdXQtYmxvY2sgdGFnc1wiIGlkPVwiJHtzZWxmLnRhZ3NJZH1cIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICByZXR1cm4gdGVtVGVtcGxhdGU7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIOiuvue9rum7mOiupOWAvCwgY2hlY2tlZCwg6buY6K6kZmFsc2VcbiAgICAvLyB2YXIgZGF0YSA9IHBhcmFtcy5kYXRhO1xuICAgIGlmKCFwYXJhbXMuY2hlY2tib3hOYW1lIHx8ICFwYXJhbXMubGF5RmlsdGVyKXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ+ivt+iuvue9rmNoZWNrb3V055qE5ZCN5a2XLOivpeWQjeWtl+WwhuS8muaYr+aCqOiOt+WPlmZvcm3lkI3np7DnmoRrZXknKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2xhc3NNYWluLmNoZWNrYm94TmFtZSA9IHBhcmFtcy5jaGVja2JveE5hbWU7XG4gICAgLy8gY2xhc3NNYWluLmxheUZpbHRlciA9IHBhcmFtcy5sYXlGaWx0ZXI7XG4gICAgY2xhc3NNYWluLnNldERlZmF1bHRWYWx1ZShwYXJhbXMuZGF0YSk7XG4gICAgdGhpcy50YWdzSWQgPSBjbGFzc01haW4udGFnc0lkO1xuICAgIHRoaXMubGF5RmlsdGVyID0gY2xhc3NNYWluLmxheUZpbHRlciA9IHBhcmFtcy5sYXlGaWx0ZXIgfHwgJ3BsZy0nICsgUHJvbG9nLmNyZWF0ZVJhbmRvbUlkKCk7XG4gICAgXG4gICAgdGhpcy53cmFwVGFtcGxhdGUgPSAkKGNsYXNzTWFpbi53cmFwVGVtcGxhdGUoKSk7XG5cbiAgICBpZihwYXJhbXMucmVuZGVyZXIpIHtcbiAgICAgIHNlbGYucmVuZGVyVG8ocGFyYW1zLnJlbmRlcmVyKTtcbiAgICB9XG4gIH1cblxuICBwbGdJbnB1dFRhZ3MucHJvdG90eXBlLnJlbmRlclRvID0gZnVuY3Rpb24odGFyZ2V0SWQpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgJHRhcmdldElkID0gJCgnIycgKyB0YXJnZXRJZCk7XG4gICAgdmFyICR0YWdzSWQgPSAkdGFyZ2V0SWQuZmluZChcIiNcIiArIHNlbGYudGFnc0lkKTtcblxuICAgICR0YXJnZXRJZC5hcHBlbmQoc2VsZi53cmFwVGFtcGxhdGUpO1xuICAgIFxuICAgIHZhciBmb3JtID0gbGF5dWkuZm9ybTtcbiAgICBmb3JtLnJlbmRlcigpO1xuICBcbiAgICB2YXIgdGFnTGlzdCA9IFtdOyAvLyDnlKjmiLfmoIfnrb7liJfooahcbiAgICBcbiAgICB2YXIgaW5wdXRUYWdzID0ge1xuICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZW1PYmogPSB7fTtcbiAgICAgICAgdmFyIGNoZWNrYm94TGlzdCA9ICR0YXJnZXRJZC5maW5kKFxuICAgICAgICAgIFwiLmxheXVpLWZvcm0tY2hlY2tlZFwiXG4gICAgICAgICk7XG4gICAgICAgIGlmIChjaGVja2JveExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGVtT2JqID0ge1xuICAgICAgICAgICAgdmFsdWU6IGNoZWNrYm94TGlzdC5zaWJsaW5ncyhcImlucHV0XCIpLmF0dHIoXCJ0aXRsZVwiKSxcbiAgICAgICAgICAgIG5hbWU6IGNoZWNrYm94TGlzdC5zaWJsaW5ncyhcImlucHV0XCIpLmF0dHIoXCJuYW1lXCIpXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRlbU9iaikgIT09IFwie31cIikge1xuICAgICAgICAgIHRhZ0xpc3QucHVzaCh0ZW1PYmopO1xuICAgICAgICAgIHRhZ0xpc3QuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICBpbnB1dFRhZ3MuYWRkKHYpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWRkOiBmdW5jdGlvbih0ZW1PYmopIHtcbiAgICAgICAgdmFyIHRlbVRlbXBhbHRlID0gYDxzcGFuPlxuICAgICAgICAgIDxlbSBuYW1lPVwiJHt0ZW1PYmoubmFtZX1cIj4ke3RlbU9iai52YWx1ZX08L2VtPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIj7DlzwvYnV0dG9uPlxuICAgICAgICA8L3NwYW4+YDtcbiAgICAgICAgXG4gICAgICAgICQoJyMnICsgc2VsZi50YWdzSWQpLmFwcGVuZCh0ZW1UZW1wYWx0ZSk7XG4gIFxuICAgICAgICB2YXIgdGVtSW5wdXRIaWRkZW4gPSBgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiJHt0ZW1PYmoubmFtZX1cIiBcbiAgICAgICAgICB2YWx1ZT1cIiR7dGVtT2JqLnZhbHVlfVwiLz5gO1xuICAgICAgICAgICR0YXJnZXRJZC5hZnRlcih0ZW1JbnB1dEhpZGRlbik7XG4gIFxuICAgICAgICBpZiAodGFnTGlzdC5pbmRleE9mKHRlbU9iaikgPT09IC0xKSB7XG4gICAgICAgICAgdGFnTGlzdC5wdXNoKHRlbU9iaik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcbiAgICAgIGRlbDogZnVuY3Rpb24odGVtT2JqKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnZGVsIHRlbU9iaiBiZWZvcmUnKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGFnTGlzdCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdkZWwgdGVtT2JqIGJlZm9yZScpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnZGVsIHRhZ0xpc3QgZXZlbnQnKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVtT2JqKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2RlbCB0ZW1PYmogZXZlbnQnKTtcblxuICAgICAgICAvLyDku450YWdMaXN05Yig6ZmkdGVtT2JqXG4gICAgICAgIGlmICh0YWdMaXN0ICYmIHRhZ0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRhZ0xpc3QuZm9yRWFjaChmdW5jdGlvbih2YWwsIGluZCkge1xuICAgICAgICAgICAgaWYgKHZhbC5uYW1lID09PSB0ZW1PYmoubmFtZSkge1xuICAgICAgICAgICAgICB0YWdMaXN0LnNwbGljZShpbmQsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIOaTjeS9nOWujOaIkOS5i+WQjuWwseWQr+WKqOmHjeaWsOa4suafk1xuICBcbiAgICAgICAgLy8gMi4g5Yig6ZmkdGFnc+S4reeahOagh+etviAgVE9ETzo6IOatpOWBmuazleacieeCueWvuURPTeeahOmHjeaWsOa4suafk+W9seWTjeavlOi+g+Wkp1xuICAgICAgICAvLyAkKCcjaW5wdXRUYWdzJykuZmluZCgnbmFtZT0nKyB0ZW1PYmoubmFtZSkucGFyZW50KCdzcGFuJykucmVtb3ZlKCk7XG4gICAgICAgICQoXCIjXCIgKyBzZWxmLnRhZ3NJZCkuZW1wdHkoKTtcbiAgICAgICAgdmFyIHRlbVRlbXBhbHRlID0gXCJcIjtcbiAgICAgICAgaWYgKHRhZ0xpc3QgJiYgdGFnTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGFnTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaW5kKSB7XG4gICAgICAgICAgICB0ZW1UZW1wYWx0ZSArPSBgPHNwYW4+PGVtIG5hbWU9XCIke3ZhbC5uYW1lfVwiPiR7XG4gICAgICAgICAgICAgIHZhbC52YWx1ZVxuICAgICAgICAgICAgfTwvZW0+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiPsOXPC9idXR0b24+PC9zcGFuPmA7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgJChcIiNcIiArIHNlbGYudGFnc0lkKS5hcHBlbmQodGVtVGVtcGFsdGUpO1xuICBcbiAgICAgICAgLy8gMy4g5Yig6ZmkaW5wdXQgaGlkZGVu5Lit55qE5qCH562+6IqC54K5XG4gICAgICAgICQoXCIjXCIgKyBzZWxmLnRhcmdldElkKVxuICAgICAgICAgIC5maW5kKCdpbnB1dFtuYW1lPVwiJyArIHRlbU9iai5uYW1lICsgJ1wiXScpXG4gICAgICAgICAgLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH07XG4gIFxuICAgIGlucHV0VGFncy5pbml0KCk7XG4gICAgXG4gICAgZm9ybS5vbihcImNoZWNrYm94KFwiKyBzZWxmLmxheUZpbHRlciArXCIpXCIsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciBpc0NoZWNrZWQgPSBkYXRhLmVsZW0uY2hlY2tlZDtcbiAgICAgIHZhciBqcXVlcnlFbGVtID0gJChkYXRhLmVsZW0pO1xuICAgICAgdmFyIHRlbU9iaiA9IHtcbiAgICAgICAgdmFsdWU6IGpxdWVyeUVsZW0uYXR0cihcInRpdGxlXCIpLFxuICAgICAgICBuYW1lOiBqcXVlcnlFbGVtLmF0dHIoXCJuYW1lXCIpXG4gICAgICB9O1xuICBcbiAgICAgIGlmIChpc0NoZWNrZWQpIHtcbiAgICAgICAgaW5wdXRUYWdzLmFkZCh0ZW1PYmopO1xuICAgICAgfVxuICBcbiAgICAgIGlmICghaXNDaGVja2VkKSB7XG4gIFxuICAgICAgICBpbnB1dFRhZ3MuZGVsKHRlbU9iaik7XG4gICAgICB9XG4gICAgICAvLyA8c3Bhbj48ZW0+5qCH6aKY5LiAPC9lbT48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCI+w5c8L2J1dHRvbj48L3NwYW4+XG4gICAgfSk7XG4gIFxuICAgICR0YXJnZXRJZC5maW5kKFwiI1wiICsgc2VsZi50YWdzSWQpLm9uKFwiY2xpY2tcIiwgXCIuY2xvc2VcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIHRlbUpxdWVyeU9iaiA9ICQodGhpcykuc2libGluZ3MoXCJlbVwiKTtcbiAgICAgIHZhciB0ZW1PYmogPSB7XG4gICAgICAgIHZhbHVlOiB0ZW1KcXVlcnlPYmouaHRtbCgpLFxuICAgICAgICBuYW1lOiB0ZW1KcXVlcnlPYmouYXR0cihcIm5hbWVcIilcbiAgICAgIH07XG4gICAgIFxuICAgICAgaW5wdXRUYWdzLmRlbCh0ZW1PYmopO1xuICBcbiAgICAgIC8vIDEuIOa4heepumNoZWNrYm94IOS4remAieS4reeahO+8jOS/ruaUueeKtuaAgeOAgumHjeaWsOinpuWPkeiiq+WIoOmZpOeahHRhZ3NcbiAgICAgIHZhciBjaGVja2VkTGlzdCA9IHNlbGYud3JhcFRhbXBsYXRlLmZpbmQoXG4gICAgICAgIFwiLmxheXVpLWZvcm0tY2hlY2tib3hcIlxuICAgICAgKTtcbiAgICAgIC8vIOWwhuexu+aVsOe7hOi9rOWMluS4uuaVsOe7hFxuICAgICAgY2hlY2tlZExpc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjaGVja2VkTGlzdCk7XG4gIFxuICAgICAgaWYgKGNoZWNrZWRMaXN0ICYmIGNoZWNrZWRMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgY2hlY2tlZExpc3QuZm9yRWFjaChmdW5jdGlvbih2YWwsIGluZCkge1xuICAgICAgICAgIHZhciB0ZW1IdG1sID0gJCgkKHZhbCkuZmluZChcInNwYW5cIilbMF0pLmh0bWwoKTtcbiAgICAgICAgICBpZiAodGVtT2JqLnZhbHVlID09PSB0ZW1IdG1sKSB7XG4gICAgICAgICAgICBzZWxmLndyYXBUYW1wbGF0ZS5maW5kKCcubGF5dWktZm9ybS1jaGVja2JveCcpXG4gICAgICAgICAgICAgIC5lcShpbmQpLnRyaWdnZXIoXCJjbGlja1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgd2luZG93LlBsZ0lucHV0VGFncyA9IHBsZ0lucHV0VGFncztcbn0oalF1ZXJ5LCBsYXl1aSkpOyIsIi8qKlxuICogaGR3XG4gKiAyMDE5LjAxLjI4XG4gKiDpnaLmnb/nu4Tku7ZcbiAqL1xuXG47KGZ1bmN0aW9uICgkLCBsYXl1aSkge1xuXG4gICAgLy9QbGdQYW5lbC5qc1xuICAgIGxheXVpLnVzZShbXCJlbGVtZW50XCJdLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gdGVtcGxhdGUoKSB7XG4gICAgICAgICAgICB2YXIgc2FsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgc2tpbk9CSiA9IHtcbiAgICAgICAgICAgICAgICAwOiBcIlwiLFxuICAgICAgICAgICAgICAgIDE6IFwic2tpbl8xXCIsXG4gICAgICAgICAgICAgICAgMjogXCJza2luXzJcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghc2tpbk9CSltzYWxmLnNraW5dKSBzYWxmLnNraW4gPSAwO1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBgPGRpdiBjbGFzcz1cImxheXVpLWNhcmQgUGxnUGFuZWwgJHtza2luT0JKW3NhbGYuc2tpbl19ICR7c2FsZi5jbGFzc05hbWU/c2FsZi5jbGFzc05hbWU6XCJcIn1cIiAke3NhbGYuaWQ/YGlkPSR7c2FsZi5pZH1gOlwiXCJ9ICAke3NhbGYuc3R5bGU/YHN0eWxlPVwiJHtzYWxmLnN0eWxlfVwiYDpcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgJHtzYWxmLmhlYWRlci5pc1Nob3c/XG4gICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cImxheXVpLWNhcmQtaGVhZGVyXCI+ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZSBpb1wiPiR7c2FsZi5oZWFkZXIudGl0bGV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtzYWxmLmhlYWRlci5tb3JlQnRuJiZzYWxmLmhlYWRlci5tb3JlQnRuLmxlbmd0aD4wP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cIm1vcmVfZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtzYWxmLmhlYWRlci5tb3JlQnRuLm1hcChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGEgY2xhc3M9XCJsYXl1aS1idG4gbGF5dWktYnRuLXNtIGxheXVpLWJ0bi1ub3JtYWwgJHtpdGVtLmNsYXNzTmFtZT9gJHtpdGVtLmNsYXNzTmFtZX1gOlwiXCJ9XCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPiAke2l0ZW0uaWNvbj9gPGkgY2xhc3M9XCIke2l0ZW0uaWNvbn1cIj48L2k+YDpcIlwifSR7aXRlbS5uYW1lfTwvYT5gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA6XCJcIn0gICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgYDpcIlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuICQoaHRtbCk7XG5cbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgZnVuY3Rpb24gUGFuZWxGb3JtKCkge1xuICAgICAgICAgICAgdmFyIHNhbGYgPSB0aGlzO1xuICAgICAgICAgICAgaWYoIXNhbGYuZGVmYXVsdEJvZHkpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBkYXRhID0gc2FsZi5kZWZhdWx0Qm9keSxodG1sID0gbnVsbDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRhdGEubGF5b3V0Q29sIDwgMCB8fCBkYXRhLmxheW91dENvbCA+IDEyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImxheW91dENvbDrkuI3og73lsI/kuo4w5oiW5LiN6IO95aSn5LqOMTJcIik7XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpbnB1dEJsb2NrKGl0ZW0sIHZhbHVlQmopIHtcbiAgICAgICAgICAgICAgICBpZighaXRlbS50eXBlKSBpdGVtLnR5cGU9XCJ0ZXh0XCI7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFpdGVtLnZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsdWU9XCI8c3BhbiBzdHlsZT0nY29sb3I6I2MzYzNjMyc+5pqC5peg5pWw5o2uPC9zcGFuPlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwidGV4dC1pbmZvICR7dmFsdWVCaj9cImJqXCI6XCJcIn1cIj4ke2l0ZW0udmFsdWV9PC9kaXY+YDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighaXRlbS52YWx1ZSkgaXRlbS52YWx1ZT1cIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeS/oeaBr1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cImxheXVpLWlucHV0XCIgdmFsdWU9XCIke2l0ZW0udmFsdWV9XCI+YDtcbiAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuY29scykge1xuICAgICAgICAgICAgICAgIGh0bWwgPSBgPGZvcm0gY2xhc3M9XCJsYXl1aS1mb3JtIGNsXCIgc3R5bGU9XCJwYWRkaW5nOjVweFwiIGxheS1maWx0ZXI9XCJcIj4gICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2RhdGEuY29scy5tYXAoZnVuY3Rpb24oYXJyKXsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibGF5dWktcm93IGxheXVpLWNvbC1zcGFjZTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2Fyci5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibGF5dWktY29sLW1kJHtpdGVtLmxheW91dENvbHx8ZGF0YS5sYXlvdXRDb2x9ICR7aXRlbS5vZmZzZXQ/YGxheXVpLWNvbC1tZC1vZmZzZXQke2l0ZW0ub2Zmc2V0fWA6XCJcIn1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWZvcm0taXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYXl1aS1mb3JtLWxhYmVsXCI+JHtpdGVtLmxhYmVsfe+8mjwvbGFiZWw+ICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktaW5wdXQtYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpbnB1dEJsb2NrKGl0ZW0sZGF0YS52YWx1ZUJqKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oXCJcIil9IFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5qb2luKFwiXCIpfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+YDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkKGh0bWwpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwbGdQYW5lbChlbGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBfdGhpcy5pZCA9IFwiUGxnUGFuZWxcIiArIG5ldyBEYXRlKCkudmFsdWVPZigpOyAvL+mAieaLqeWZqFxuXG4gICAgICAgICAgICB2YXIgZWxlLCBvcHQ7XG4gICAgICAgICAgICAvL+iOt+WPluaVsOaNruWFpeWPo1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBvcHQgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2tpbiA6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcmVCdG4gOm51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXB5dDp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Nob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9yZUJ0bjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRCb2R5IDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihfdGhpcyxjb25maWcsb3B0KTtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ2V0RWxlbWVudCA9IHRlbXBsYXRlLmNhbGwoX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWreaYr+WQpuaciWRlZmF1bHRCb2R56YWN572uICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuZGVmYXVsdEJvZHkhPW51bGwgJiYgX3RoaXMuZGVmYXVsdEJvZHkuY29scyYmX3RoaXMuZGVmYXVsdEJvZHkuY29scy5sZW5ndGg+MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXBwZW5kUGFuZWxCb2R5KFBhbmVsRm9ybS5jYWxsKF90aGlzKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbmRlclRvKF90aGlzLnJlbmRlcmVyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGVsZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICBvcHQgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3B0cyA9ICQuZXh0ZW5kKHRydWUsIGNvbmZpZywgb3B0KTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ2V0RWxlbWVudCA9IHRlbXBsYXRlKF90aGlzLm9wdHMpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXJUbyhlbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcGxnUGFuZWwucHJvdG90eXBlLnJlbmRlclRvID0gZnVuY3Rpb24gKGVsZSkge1xuXG4gICAgICAgICAgICBpZih0aGlzLmVtcHl0KXtcbiAgICAgICAgICAgICAgICQoXCIjXCIgKyBlbGUpLmVtcHR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI1wiICsgZWxlKS5hcHBlbmQodGhpcy5nZXRFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH07XG5cbiAgICAgICAgcGxnUGFuZWwucHJvdG90eXBlLmFwcGVuZFBhbmVsQm9keSA9IGZ1bmN0aW9uIChFbGVtZW50T2JqY2V0LCBpc0VtcHR5ID0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciBlbGU9dGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktY2FyZC1ib2R5XCIpO1xuICAgICAgICAgICAgaWYoaXNFbXB0eSl7XG4gICAgICAgICAgICAgICAgZWxlLmVtcHR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIGNvbnNvbGUuZGlyKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoRWxlbWVudE9iamNldCkgIClcbiAgICAgICAgICAgY29uc29sZS5kaXIoRWxlbWVudE9iamNldFswXS5ub2RlVHlwZSA9PT0gMSAgIClcbiAgICAgICAgICAgY29uc29sZS5kaXIodHlwZW9mIEVsZW1lbnRPYmpjZXRbMF0ubm9kZU5hbWUgPT09ICdzdHJpbmcnIClcbiAgICAgICAgICAgLy8gY29uc29sZS5kaXIodHlwZW9mIEVsZW1lbnRPYmpjZXQgKVxuICAgICAgICAgICBjb25zb2xlLmRpciggRWxlbWVudE9iamNldFswXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KTtcbiAgICAgICAgICAgY29uc29sZS5kaXIoIEVsZW1lbnRPYmpjZXQgaW5zdGFuY2VvZiBqUXVlcnkpXG4gICAgICAgICAgIGNvbnNvbGUuZGlyKFwiZGVmYXVsdEJvZHk6XCIrIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLmRlZmF1bHRCb2R5KSAgKVxuICAgICAgICAgICBjb25zb2xlLmRpcihcImRlZmF1bHRCb2R5OlwiK0FycmF5LmlzQXJyYXkodGhpcy5kZWZhdWx0Qm9keSkpXG4gICAgICAgICAgIGNvbnNvbGUuZGlyKHRoaXMuZGVmYXVsdEJvZHkgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcbiAgICAgICAgICAgIGVsZS5hcHBlbmQoRWxlbWVudE9iamNldCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuXG4gICAgICAgIH1cblxuXG5cblxuXG5cblxuICAgICAgICB3aW5kb3cuUGxnUGFuZWwgPSBwbGdQYW5lbDtcblxuICAgICAgICAvKiAgICAgICAgICQuZm4uUGxnUGFuZWwgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHBsZ1BhbmVsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICovXG5cblxuICAgIH0pO1xuXG5cbn0pKGpRdWVyeSwgbGF5dWkpOyIsIjsoZnVuY3Rpb24gKCQsIGxheXVpKSB7XHJcbiAgJC5mbi5QbGdTZWxlY3RQbHVzVGFncyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gbmV3IHBsZ1NlbGVjdFBsdXNUYWdzKG9wdGlvbnMpO1xyXG5cclxufTtcclxuXHJcbiAgdmFyIHRlbXAgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibGF5dWktaW5wdXQtYmxvY2sgcGxnLXNlbGVjdC10YWdzXCI+PC9kaXY+YFxyXG4gIH1cclxuXHJcbiAgdmFyIHBsZ1NlbGVjdFBsdXNUYWdzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIFxyXG4gICAgdGhpcy5yZW5kZXIob3B0aW9ucyk7XHJcblxyXG4gIH07XHJcblxyXG4gIHBsZ1NlbGVjdFBsdXNUYWdzLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuICAgICQoJyMnICsgb3B0aW9ucy5yZW5kZXJlcikuYWZ0ZXIodGVtcCgpKTtcclxuICAgIG9wdGlvbnMuZWwgPSAnIycgKyBvcHRpb25zLnJlbmRlcmVyO1xyXG4gICAgZGVsZXRlIG9wdGlvbnMucmVuZGVyZXI7XHJcbiAgICByZXR1cm4gbGF5dWkuc2VsZWN0UGx1cy5yZW5kZXIob3B0aW9ucyk7XHJcbiAgfVxyXG4gIFxyXG4gIHdpbmRvdy5QbGdTZWxlY3RQbHVzVGFncyA9IHBsZ1NlbGVjdFBsdXNUYWdzO1xyXG4gIFxyXG5cclxufSkoalF1ZXJ5LCBsYXl1aSk7IiwiOyhmdW5jdGlvbiAoJCkge1xyXG4gICAgdmFyIHN0ckNoaW5lc2VGaXJzdFBZID0gXCJZRFlRU1hNV1pTU1hKQllNR0NDWlFQU1NRQllDRFNDRFFMRFlMWUJTU0pHWVpaSkpGS0NDTFpESFdEV1pKTEpQRllZTldKSlRNWUhaV1pIRkxaUFBRSEdTQ1lZWU5KUVlYWEdKSEhTRFNKTktLVE1PTUxDUlhZUFNOUVNFQ0NRWkdHTExZSkxNWVpaU0VDWUtZWUhRV0pTU0dHWVhZWllKV1dLREpIWUNITVlYSlRMWEpZUUJZWFpMRFdSREpSV1lTUkxEWkpQQ0JaSkpCUkNGVExFQ1pTVFpGWFhaSFRSUUhZQkRMWUNaU1NZTU1SRk1ZUVpQV1dKSllGQ1JXRkRGWlFQWUREV1lYS1lKQVdKRkZYWVBTRlRaWUhIWVpZU1dDSllYU0NMQ1hYV1paWE5CR05OWEJYTFpTWlNCU0dQWVNZWkRITURaQlFCWkNXRFpaWVlUWkhCVFNZWUJaR05UTlhRWVdRU0tCUEhITFhHWUJGTUpFQkpISEdRVEpDWVNYU1RLWkhMWUNLR0xZU01aWFlBTE1FTERDQ1hHWllSSlhTRExUWVpDUUtDTk5KV0hKVFpaQ1FMSlNUU1RCTlhCVFlYQ0VRWEdLV0pZRkxaUUxZSFlYU1BTRlhMTVBCWVNYWFhZREpDWllMTExTSlhGSEpYUEpCVEZGWUFCWVhCSFpaQkpZWkxXTENaR0dCVFNTTURUSlpYUFRIWVFUR0xKU0NRRlpLSlpKUU5MWldMU0xIRFpCV0pOQ0paWVpTUVFZQ1FZUlpDSkpXWUJSVFdQWUZUV0VYQ1NLRFpDVEJaSFlaWllZSlhaQ0ZGWlpNSllYWFNEWlpPVFRCWkxRV0ZDS1NaU1hGWVJMTllKTUJEVEhKWFNRUUNDU0JYWVlUU1lGQlhEWlRHQkNOU0xDWVpaUFNBWllaWlNDSkNTSFpRWURYTEJQSkxMTVFYVFlEWlhTUUpUWlBYTENHTFFUWldKQkhDVFNZSlNGWFlFSkpUTEJHWFNYSk1ZSlFRUEZaQVNZSk5UWURKWEtKQ0RKU1pDQkFSVERDTFlKUU1XTlFOQ0xMTEtCWUJaWlNZSFFRTFRXTENDWFRYTExaTlRZTE5FV1laWVhDWlhYR1JLUk1UQ05ETkpUU1lZU1NEUURHSFNEQkpHSFJXUlFMWUJHTFhITEdUR1hCUUpEWlBZSlNKWUpDVE1STllNR1JaSkNaR0pNWk1HWE1QUllYS0pOWU1TR01aSllNS01GWE1MRFRHRkJIQ0pIS1lMUEZNRFhMUUpKU01UUUdaU0pMUURMREdKWUNBTENNWkNTREpMTE5YREpGRkZGSkNaRk1aRkZQRktIS0dEUFNYS1RBQ0pESEhaRERDUlJDRlFZSktRQ0NXSkRYSFdKTFlMTFpHQ0ZDUURTTUxaUEJKSlBMU0JDSkdHRENLS0RFWlNRQ0NLSkdDR0tESlRKRExaWUNYS0xRU0NHSkNMVEZQQ1FDWkdXUEpEUVlaSkpCWUpIU0pEWldHRlNKR1pLUUNDWkxMUFNQS0pHUUpIWlpMSlBMR0pHSkpUSEpKWUpaQ1pNTFpMWVFCR0pXTUxKS1haRFpOSlFTWVpNTEpMTEpLWVdYTUtKTEhTS0pHQk1DTFlZTUtYSlFMQk1MTEtNRFhYS1dZWFlTTE1MUFNKUVFKUVhZWEZKVEpEWE1YWExMQ1hRQlNZSkJHV1lNQkdHQkNZWFBKWUdQRVBGR0RKR0JIQk5TUUpZWkpLSktIWFFGR1FaS0ZIWUdLSERLTExTREpRWFBRWUtZQk5RU1hRTlNaU1dIQlNYV0hYV0JaWlhETU5TSkJTQktCQlpLTFlMWEdXWERSV1lRWk1ZV1NKUUxDSlhYSlhLSkVRWFNDWUVUTFpITFlZWVNEWlBBUVlaQ01UTFNIVFpDRllaWVhZTEpTRENKUUFHWVNMQ1FMWVlZU0hNUlFRS0xEWFpTQ1NTU1lEWUNKWVNGU0pCRlJTU1pRU0JYWFBYSllTRFJDS0dKTEdES1pKWkJES1RDU1lRUFlIU1RDTERKREhNWE1DR1hZWkhKRERUTUhMVFhaWFlMWU1PSFlKQ0xUWUZCUVFYUEZCREZISFRLU1FIWllZV0NOWFhDUldIT1dHWUpMRUdXRFFDV0dGSllDU05UTVlUT0xCWUdXUVdFU0pQV05NTFJZRFpTWlRYWVFQWkdDV1hITkdQWVhTSE1ZUUpYWlREUFBCRllIWkhUSllGRFpXS0dLWkJMRE5UU1hIUUVFR1paWUxaTU1aWUpaR1haWEtIS1NUWE5YWFdZTFlBUFNUSFhEV0haWU1QWEFHS1lEWEJITkhYS0RQSk5NWUhZTFBNR09DU0xOWkhLWFhMUFpaTEJNTFNGQkhIR1lHWVlHR0JIU0NZQVFUWVdMWFRaUUNFWllEUURRTU1IVEtMTFNaSExTSlpXRllIUVNXU0NXTFFBWllOWVRMU1hUSEFaTktaWlNaWkxBWFhaV1dDVEdRUVRERFlaVENDSFlRWkZMWFBTTFpZR1BaU1pOR0xORFFUQkRMWEdUQ1RBSkRLWVdOU1laTEpISFpaQ1dOWVlaWVdNSFlDSEhZWEhKS1pXU1hIWllYTFlTS1FZU1BTTFlaV01ZUFBLQllHTEtaSFRZWEFYUVNZU0hYQVNNQ0hLRFNDUlNXSlBXWFNHWkpMV1dTQ0hTSkhTUU5IQ1NFR05EQVFUQkFBTFpaTVNTVERRSkNKS1RTQ0pBWFBMR0dYSEhHWFhaQ1hQRE1NSExER1RZQllTSk1YSE1SQ1BYWEpaQ0taWFNITUxRWFhUVEhYV1pGS0hDQ1pEWVRDSllYUUhMWERIWVBKUVhZTFNZWURaT1pKTllYUUVaWVNRWUFZWFdZUERHWEREWFNQUFlaTkRMVFdSSFhZRFhaWkpIVENYTUNaTEhQWVlZWU1IWkxMSE5YTVlMTExNRENQUFhITVhES1lDWVJETFRYSkNISFpaWFpMQ0NMWUxOWlNIWkpaWkxOTlJMV0hZUVNOSkhYWU5UVFRLWUpQWUNISFlFR0tDVFRXTEdRUkxHR1RHVFlHWUhQWUhZTFFZUUdDV1lRS1BZWVlUVFRUTEhZSExMVFlUVFNQTEtZWlhHWldHUFlEU1NaWkRRWFNLQ1FOTUpKWlpCWFlRTUpSVEZGQlRLSFpLQlhMSkpLRFhKVExCV0ZaUFBUS1FUWlRHUERHTlRQSllGQUxRTUtHWEJEQ0xaRkhaQ0xMTExBRFBNWERKSExDQ0xHWUhEWkZHWURER0NZWUZHWURYS1NTRUJESFlLREtES0hOQVhYWUJQQllZSFhaUUdBRkZRWUpYRE1MSkNTUVpMTFBDSEJTWEdKWU5EWUJZUVNQWldKTFpLU0REVEFDVEJYWkRZWllQSlpRU0pOS0tUS05KREpHWVlQR1RMRllRS0FTRE5UQ1lIQkxXRFpIQkJZRFdKUllHS1pZSEVZWUZKTVNEVFlGWkpKSEdDWFBMWEhMRFdYWEpLWVRDWUtTU1NNVFdDVFRRWkxQQlNaRFpXWlhHWkFHWUtUWVdYTEhMU1BCQ0xMT1FNTVpTU0xDTUJKQ1NaWktZRENaSkdRUURTTUNZVFpRUUxXWlFaWFNTRlBUVEZRTUREWkRTSERURFdGSFREWVpKWVFKUUtZUEJESllZWFRMSkhEUlFYWFhIQVlESFJKTEtMWVRXSExMUkxMUkNYWUxCV1NSU1paU1lNS1paSEhLWUhYS1NNRFNZRFlDSlBCWkJTUUxGQ1hYWE5YS1hXWVdTRFpZUU9HR1FNTVlIQ0RaVFRGSllZQkdTVFRUWUJZS0pESEtZWEJFTEhUWVBKUU5GWEZEWUtaSFFLWkJZSlRaQlhIRkRYS0RBU1dUQVdBSkxEWUpTRkhCTEROTlROUUpUSk5DSFhGSlNSRldIWkZNRFJZSllKV1pQREpLWllKWU1QQ1laTllOWEZCWVRGWUZXWUdEQk5aWlpETllUWFpFTU1RQlNRRUhYRlpNQk1GTFpaU1JYWU1KR1NYV1pKU1BSWURKU0pHWEhKSkdMSkpZTlpaSlhIR1hLWU1MUFlZWUNYWVRXUVpTV0hXTFlSSkxQWFNMU1hNRlNXV0tMQ1ROWE5ZTlBTSlNaSERaRVBUWE1ZWVdYWVlTWVdMWEpRWlFYWkRDTEVFRUxNQ1BKUENMV0JYU1FIRldXVEZGSlROUUpISlFEWEhXTEJZWk5GSkxBTEtZWUpMRFhISFlDU1RZWVdOUkpZWFlXVFJNRFJRSFdRQ01GSkRZWk1ITVlZWEpXTVlaUVpYVExNUlNQV1dDSEFRQlhZR1pZUFhZWVJSQ0xNUFlNR0tTSlNaWVNSTVlKU05YVFBMTkJBUFBZUFlMWFlZWktZTkxEWllKWkNaTk5MTVpISEFSUU1QR1dRVFpNWFhNTExIR0RaWFlIWEtZWFlDSk1GRllZSEpGU0JTU1FMWFhORFlDQU5OTVRDSkNZUFJSTllUWVFOWVlNQk1TWE5ETFlMWVNMSlJMWFlTWFFNTExZWkxaSkpKS1laWkNTRkJaWFhNU1RCSkdOWFlaSExYTk1DV1NDWVpZRlpMWEJSTk5OWUxCTlJUR1pRWVNBVFNXUllIWUpaTVpESFpHWkRXWUJTU0NTS1hTWUhZVFhYR0NRR1haWlNIWVhKU0NSSE1LS0JYQ1pKWUpZTUtRSFpKRk5CSE1RSFlTTkpOWllCS05RTUNMR1FIV0xaTlpTV1hLSExKSFlZQlFMQkZDRFNYRExEU1BGWlBTS0pZWldaWFpERFhKU01NRUdKU0NTU01HQ0xYWEtZWVlMTllQV1dXR1lES1pKR0dHWkdHU1lDS05KV05KUENYQkpKVFFUSldEU1NQSlhaWE5aWFVNRUxQWEZTWFRMTFhDTEpYSkpMSlpYQ1RQU1dYTFlESExZUVJXSFNZQ1NRWVlCWUFZV0pKSlFGV1FDUVFDSlFHWEFMREJaWllKR0tHWFBMVFpZRlhKTFRQQURLWVFIUE1BVExDUERDS0JNVFhZQkhLTEVOWERMRUVHUURZTVNBV0haTUxKVFdZR1hMWVFaTEpFRVlZQlFRRkZOTFlYUkRTQ1RHSkdYWVlOS0xMWVFLQ0NUTEhKTFFNS0taR0NZWUdMTExKRFpHWURIWldYUFlTSkJaS0RaR1laWkhZV1lGUVlUWVpTWllFWlpMWU1ISkpIVFNNUVdZWkxLWVlXWkNTUktRWVRMVERYV0NUWUpLTFdTUVpXQkRDUVlOQ0pTUlNaSkxLQ0RDRFRMWlpaQUNRUVpaRERYWVBMWFpCUUpZTFpMTExRRERaUUpZSllKWllYTllZWU5ZSlhLWERBWldZUkRMSllZWVJKTFhMTERZWEpDWVdZV05RQ0NMREROWVlZTllDS0NaSFhYQ0NMR1pRSkdLV1BQQ1FRSllTQlpaWFlKU1FQWEpQWkJTQkRTRk5TRlBaWEhEV1pURFdQUFRGTFpaQlpETVlZUFFKUlNEWlNRWlNRWEJER0NQWlNXRFdDU1FaR01ESFpYTVdXRllCUERHUEhUTUpUSFpTTU1CR1pNQlpKQ0ZaV0ZaQkJaTVFDRk1CRE1DSlhMR1BOSkJCWEdZSFlZSkdQVFpHWk1RQlFUQ0dZWEpYTFdaS1lEUERZTUdDRlRQRlhZWlRaWERaWFRHS01UWUJCQ0xCSkFTS1lUU1NRWVlNU1pYRkpFV0xYTExTWkJRSkpKQUtMWUxYTFlDQ1RTWE1DV0ZLS0tCU1hMTExMSllYVFlMVEpZWVREUEpITkhOTktCWVFORlFZWVpCWVlFU1NFU1NHRFlIRkhXVENKQlNEWlpURkRNWEhDTkpaWU1RV1NSWUpEWkpRUERRQkJTVEpHR0ZCS0pCWFRHUUhOR1dKWEpHRExMVEhaSEhZWVlZWVlTWFdUWVlZQ0NCREJQWVBaWUNDWllKUFpZV0NCRExGV1pDV0pEWFhIWUhMSFdaWlhKVENaTENEUFhVSkNaWlpMWVhKSlRYUEhGWFdQWVdYWlBURFpaQkRaQ1lISkhNTFhCUVhTQllMUkRUR0pSUkNUVFRIWVRDWldNWEZZVFdXWkNXSldYSllXQ1NLWUJaU0NDVFpRTkhYTldYWEtIS0ZIVFNXT0NDSllCQ01QWlpZS0JOTlpQQlpISFpETFNZRERZVFlGSlBYWU5HRlhCWVFYQ0JIWENQU1hUWVpETUtZU05YU1hMSEtNWlhMWUhESEtXSFhYU1NLUVlISENKWVhHTEhaWENTTkhFS0RUR1pYUVlQS0RIRVhUWUtDTllNWVlZUEtRWVlZS1haTFRISlFUQllRSFhCTVlIU1FDS1dXWUxMSENZWUxOTkVRWFFXTUNGQkRDQ01MSkdHWERRS1RMWEtHTlFDREdaSldZSkpMWUhIUVRUVE5XQ0hNWENYV0hXU1pKWURKQ0NEQlFDREdETllYWlRIQ1FSWENCSFpUUUNCWFdHUVdZWUJYSE1CWU1ZUVRZRVhNUUtZQVFZUkdZWlNMRllLS1FIWVNTUVlTSEpHSkNOWEtaWUNYU0JYWVhIWVlMU1RZQ1hRVEhZU01HU0NQTU1HQ0NDQ0NNVFpUQVNNR1FaSkhLTE9TUVlMU1dUTVhTWVFLRFpMSlFRWVBMU1lDWlRDUVFQQkJRSlpDTFBLSFFaWVlYWERURERUU0pDWEZGTExDSFFYTUpMV0NKQ1hUU1BZQ1hORFRKU0hKV1hEUVFKU0tYWUFNWUxTSkhNTEFMWUtYQ1lZRE1OTURRTVhNQ1pOTkNZQlpLS1lGTE1DSENNTEhYUkNKSkhTWUxOTVRKWkdaR1lXSlhTUlhDV0pHSlFIUVpEUUpEQ0pKWktKS0dEWlFHSkpZSllMWFpYWENEUUhISEVZVE1ITEZTQkRKU1lZU0hGWVNUQ1pRTFBCRFJGUlpUWllLWVdIU1pZUUtXRFFaUktNU1lOQkNSWFFCSllGQVpQWlpFRFpDSllXQkNKV0hZSkJRU1pZV1JZU1pQVERLWlBGUEJOWlRLTFFZSEJCWlBOUFBUWVpaWUJRTllEQ1BKTU1DWUNRTUNZRlpaRENNTkxGUEJQTE5HUUpUQlRUTkpaUFpCQlpOSktMSlFZTE5CWlFIS1NKWk5HR1FTWlpLWVhTSFBaU05CQ0daS0REWlFBTlpISktEUlRMWkxTV0pMSlpMWVdUSk5ESlpKSFhZQVlOQ0JHVFpDU1NRTU5KUEpZVFlTV1haRktXSlFUS0hUWlBMQkhTTkpaU1laQldaWlpaTFNZTFNCSkhEV1dRUFNMTU1GQkpEV0FRWVpUQ0pUQk5OV1pYUVhDRFNMUUdEU0RQRFpISlRRUVBTV0xZWUpaTEdZWFlaTENUQ0JKVEtUWUNaSlRRS0JTSkxHTUdaRE1DU0dQWU5KWllRWVlLTlhSUFdTWlhNVE5DU1paWVhZQllIWVpBWFlXUUNKVExMQ0tKSlRKSEdEWERYWVFZWlpCWVdETFdRQ0dMWkdKR1FSUVpDWlNTQkNSUENTS1lEWk5YSlNRR1hTU0pNWUROU1RaVFBCRExUS1pXWFFXUVRaRVhOUUNaR1dFWktTU0JZQlJUU1NTTENDR0JQU1pRU1pMQ0NHTExMWlhIWlFUSENaTVFHWVpRWk5NQ09DU1pKTU1aU1FQSllHUUxKWUpQUExEWFJHWllYQ0NTWEhTSEdUWk5MWldaS0pDWFRDRkNKWExCTVFCQ1paV1BRRE5IWExKQ1RIWVpMR1lMTkxTWlpQQ1hEU0NRUUhKUUtTWFpQQkFKWUVNU01KVFpEWExDSllSWVlOV0pCTkdaWlRNSlhMVEJTTFlSWlBZTFNTQ05YUEhMTEhZTExRUVpRTFhZTVJTWUNYWkxNTUNaTFRaU0RXVEpKTExOWkdHUVhQRlNLWUdZR0hCRlpQREtNV0dIQ1hNU0dEWEpNQ0paRFlDQUJYSkRMTkJDRFFZR1NLWURRVFhESkpZWE1TWlFBWkRaRlNMUVhZSlNKWllMQlRYWFdYUVFaQkpaVUZCQkxZTFdEU0xKSFhKWVpKV1RESkNaRlFaUVpaRFpTWFpaUUxaQ0RaRkpIWVNQWU1QUVpNTFBQTEZGWEpKTlpaWUxTSkVZUVpGUEZaS1NZV0pKSkhSREpaWlhUWFhHTEdIWURYQ1NLWVNXTU1aQ1dZQkFaQkpLU0hGSEpDWE1IRlFIWVhYWVpGVFNKWVpGWFlYUFpMQ0hNWk1CWEhaWlNYWUZZTU5DV0RBQkFaTFhLVENTSEhYS1hKSlpKU1RIWUdYU1hZWUhISEpXWEtaWFNTQlpaV0hISENXVFpaWlBKWFNOWFFRSkdaWVpZV0xMQ1dYWkZYWFlYWUhYTUtZWVNXU1FNTkxOQVlDWVNQTUpLSFdDUUhZTEFKSk1aWEhNTUNOWkhCSFhDTFhUSlBMVFhZSkhEWVlMVFRYRlNaSFlYWFNKQkpZQVlSU01YWVBMQ0tEVVlITFhSTE5MTFNUWVpZWVFZR1lISFNDQ1NNWkNUWlFYS1lRRlBZWVJQRkZMS1FVTlRTWkxMWk1XV1RDUVFZWldUTExNTE1QV01CWlNTVFpSQlBERFRMUUpKQlhaQ1NSWlFRWUdXQ1NYRldaTFhDQ1JTWkRaTUNZR0dEWlFTR1RKU1dMSk1ZTU1aWUhGQkpER1lYQ0NQU0hYTlpDU0JTSllKR0pNUFBXQUZGWUZOWEhZWlhaWUxSRU1aR1pDWVpTU1pETExKQ1NRRk5YWktQVFhaR1hKSkdGTVlZWVNOQlRZTEJOTEhQRlpEQ1lGQk1HUVJSU1NTWlhZU0dUWlJOWURaWkNER1BKQUZKRlpLTlpCTENaU1pQU0dDWUNKU1pMTUxSU1pCWlpMRExTTExZU1hTUVpRTFlYWkxTS0tCUlhCUkJaQ1lDWFpaWkVFWUZHS0xaTFlZSEdaU0daTEZKSEdUR1dLUkFBSllaS1pRVFNTSEpKWERDWVpVWUpMWllSWkRRUUhHSlpYU1NaQllLSlBCRlJUSlhMTEZRV0pIWUxRVFlNQkxQWkRYVFpZR0JESFpaUkJHWEhXTkpUSlhMS1NDRlNNV0xTRFFZU0pUWEtaU0NGV0pMQlhGVFpMTEpaTExRQkxTUU1RUUNHQ1pGUEJQSFpDWkpMUFlZR0dEVEdXRENGQ1pRWVlZUVlTU0NMWFpTS0xaWlpHRkZDUU5XR0xIUVlaSkpDWkxRWlpZSlBKWlpCUERDQ01ISkdYRFFER0RMWlFNRkdQU1lUU0RZRldXREpaSllTWFlZQ1pDWUhaV1BCWUtYUllMWUJIS0pLU0ZYVFpKTU1DS0hMTFROWVlNU1lYWVpQWUpRWUNTWUNXTVRKSktRWVJITExRWFBTR1RMWVlDTEpTQ1BYSllaRk5NTFJHSkpUWVpCWFlaTVNKWUpISEZaUU1TWVhSU1pDV1RMUlRRWlNTVEtYR1FLR1NQVEdDWk5KU0pDUUNYSE1YR0daVFFZREpLWkRMQlpTWEpMSFlRR0dHVEhRU1pQWUhKSEhHWVlHS0dHQ1dKWlpZTENaTFhRU0ZUR1pTTExMTUxKU0tDVEJMTFpaU1pNTU5ZVFBaU1hRSEpDSllRWFlaWFpRWkNQU0hLWlpZU1hDREZHTVdRUkxMUVhSRlpUTFlTVENUTUpDWEpKWEhKTlhUTlJaVFpGUVlIUUdMTEdDWFNaU0pESkxKQ1lEU0pUTE5ZWEhTWlhDR0paWVFQWUxGSERKU0JQQ0NaSEpKSlFaSlFEWUJTU0xMQ01ZVFRNUVRCSEpRTk5ZR0tZUlFZUU1aR0NKS1BEQ0dNWVpIUUxMU0xMQ0xNSE9MWkdEWVlGWlNMSkNRWkxZTFpRSkVTSE5ZTExKWEdKWExZU1lZWVhOQlpMSlNTWkNRUUNKWUxMWkxUSllMTFpMTEJOWUxHUUNIWFlZWE9YQ1hRS1lKWFhYWUtMWFNYWFlRWENZS1FYUUNTR1lYWFlRWFlHWVRRT0hYSFhQWVhYWFVMQ1lFWUNIWlpDQldRQkJXSlFaU0NTWlNTTFpZTEtERVNKWldNWU1DWVRTRFNYWFNDSlBRUVNRWUxZWVpZQ01ESkRaWVdDQlRKU1lESktDWURESkxCREpKU09EWllTWVhRUVlYREhIR1FRWVFIRFlYV0dNTU1BSkRZQkJCUFBCQ01VVVBMSlpTTVRYRVJYSk1IUU5VVFBKRENCU1NNU1NTVEtKVFNTTU1UUkNQTFpTWk1MUURTRE1KTVFQTlFEWENGWU5CRlNEUVhZWEhZQVlLUVlERExRWVlZU1NaQllEU0xOVEZRVFpRUFpNQ0hESENaQ1dGRFhUTVlRU1BIUVlZWFNSR0pDV1RKVFpaUU1HV0pKVEpIVFFKQkJIV1pQWFhIWVFGWFhRWVdZWUhZU0NEWURISFFNTk1UTVdDUEJTWlBQWlpHTE1aRk9MTENGV0hNTVNKWlRUREhaWllGRllUWlpHWllTS1lKWFFZSlpRQkhNQlpaTFlHSEdGTVNIUFpGWlNOQ0xQQlFTTkpYWlNMWFhGUE1UWUpZR0JYTExETFhQWkpZWkpZSEhaQ1lXSEpZTFNKRVhGU1paWVdYS1pKTFVZRFRNTFlNUUpQV1hZSFhTS1RRSkVaUlBYWFpISE1IV1FQV1FMWUpKUUpKWlNaQ1BISkxDSEhOWEpMUVdaSkhCTVpZWEJESEhZUFpMSExITEdGV0xDSFlZVExISlhDSk1TQ1BYU1RLUE5IUVhTUlRZWFhURVNZSkNUTFNTTFNURExMTFdXWUhESFJKWlNGR1hUU1lDWllOWUhUREhXSlNMSFRaRFFESlpYWFFIR1lMVFpQSENTUUZDTE5KVENMWlBGU1RQRFlOWUxHTUpMTFlDUUhZU1NIQ0hZTEhRWVFUTVpZUEJZV1JGUVlLUVNZU0xaRFFKTVBYWVlTU1JIWkpOWVdUUURGWkJXV1RXV1JYQ1dIR1lIWE1LTVlZWVFNU01aSE5HQ0VQTUxRUU1UQ1dDVE1NUFhKUEpKSEZYWVlaU1haSFRZQk1TVFNZSlRUUVFRWVlMSFlOUFlRWkxDWVpIWldTTVlMS0ZKWExXR1hZUEpZVFlTWVhZTVpDS1RUV0xLU01aU1lMTVBXTFpXWFdRWlNTQVFTWVhZUkhTU05UU1JBUFhDUFdDTUdEWEhYWkRaWUZKSEdaVFRTQkpIR1laU1pZU01ZQ0xMTFhCVFlYSEJCWkpLU1NETUFMWEhZQ0ZZR01RWVBKWUNRWEpMTExKR1NMWkdRTFlDSkNDWk9UWVhNVE1UVExMV1RHUFhZTVpNS0xQU1paWlhIS1FZU1hDVFlKWllIWFNIWVhaS1hMWldQU1FQWUhKV1BKUFdYUVFZTFhTREhNUlNMWlpZWldUVENZWFlTWlpTSEJTQ0NTVFBMV1NTQ0pDSE5MQ0dDSFNTUEhZTEhGSEhYSlNYWUxMTllMU1pESFpYWUxTWExXWllLQ0xEWUFYWkNNRERZU1BKVFFKWkxOV1FQU1NTV0NUU1RTWkxCTE5YU01OWVlNSlFCUUhSWldUWVlEQ0hRTFhLUFpXQkdRWUJLRkNNWldQWkxMWVlMU1pZRFdIWFBTQkNNTEpCU0NHQkhYTFFIWVJMSlhZU1dYV1haU0xERkhMU0xZTkpMWllGTFlKWUNEUkpMRlNZWkZTTExDUVlRRkdKWUhZWFpMWUxNU1RESkNZSEJaTExOV0xYWFlHWVlIU01HREhYWEhITFpaSlpYQ1paWkNZUVpGTkdXUFlMQ1BLUFlZUE1DTFFLREdYWkdHV1FCRFhaWktaRkJYWExaWEpUUEpQVFRCWVRTWlpEV1NMQ0haSFNMVFlYSFFMSFlYWFhZWVpZU1dUWFpLSExYWlhaUFlIR0NIS0NGU1lIVVRKUkxYRkpYUFRaVFdIUExZWEZDUkhYU0hYS1lYWFlIWlFEWFFXVUxIWUhNSlRCRkxLSFRYQ1dISkZXSkNGUFFSWVFYQ1lZWVFZR1JQWVdTR1NVTkdXQ0hLWkRYWUZMWFhISkpCWVpXVFNYWE5DWUpKWU1TV1pKUVJNSFhaV0ZRU1lMWkpaR0JIWU5TTEJHVFRDU1lCWVhYV1hZSFhZWVhOU1FZWE1RWVdSR1lRTFhCQlpMSlNZTFBTWVRKWllIWVpBV0xST1JKTUtTQ1pKWFhYWVhDSERZWFJZWFhKRFRTUUZYTFlMVFNGRllYTE1UWUpNSlVZWVlYTFRaQ1NYUVpRSFpYTFlZWFpIRE5CUlhYWEpDVFlITEJSTE1CUkxMQVhLWUxMTEpMWVhYTFlDUllMQ0pUR0pDTVRMWkxMQ1laWlBaUENZQVdISkpGWUJEWVlaU01QQ0taRFFZUVBCUENKUERDWVpNRFBCQ1lZRFlDTk5QTE1UTUxSTUZNTUdXWVpCU0pHWUdTTVpRUVFaVFhNS1FXR1hMTFBKR1pCUUNESkpKRlBLSktDWEJMSk1TV01EVFFKWExETFBQQlhDV1JDUUZCRlFKQ1pBSFpHTVlLUEhZWUhaWUtOREtaTUJQSllYUFhZSExGUE5ZWUdYSkRCS1hOWEhKTVpKWFNUUlNUTERYU0taWVNZQlpYSkxYWVNMQlpZU0xIWEpQRlhQUU5CWUxMSlFLWUdaTUNZWlpZTUNDU0xDTEhaRldGV1lYWk1XU1hUWU5YSkhQWVlNQ1lTUE1IWVNNWURZU0hRWVpDSE1KSk1aQ0FBR0NGSkJCSFBMWVpZTFhYU0RKR1hESEtYWFRYWE5CSFJNTFlKU0xUWE1SSE5MWFFKWFlaTExZU1dRR0RMQkpIRENHSllRWUNNSFdGTUpZQk1CWUpZSldZTURQV0hYUUxEWUdQREZYWEJDR0pTUENLUlNTWVpKTVNMQlpaSkZMSkpKTEdYWkdZWFlYTFNaUVlYQkVYWVhIR0NYQlBMRFlIV0VUVFdXQ0pNQlRYQ0hYWVFYTExYRkxZWExMSkxTU0ZXRFBaU01ZSkNMTVdZVENaUENIUUVLQ1FCV0xDUVlEUExRUFBRWlFGSlFESkhZTU1DWFRYRFJNSldSSFhDSlpZTFFYRFlZTkhZWUhSU0xTUlNZV1daSllNVExUTExHVFFDSlpZQUJUQ0taQ0pZQ0NRTEpaUVhBTE1aWUhZV0xXRFhaWFFETExRU0hHUEpGSkxKSEpBQkNRWkRKR1RLSFNTVENZSkxQU1daTFhaWFJXR0xETFpSTFpYVEdTTExMTFpMWVhYV0dEWllHQkRQSFpQQlJMV1NYUUJQRkRXT0ZNV0hMWVBDQkpDQ0xETUJaUEJaWkxDWVFYTERPTVpCTFpXUERXWVlHRFNUVEhDU1FTQ0NSU1NTWVNMRllCRk5UWUpTWkRGTkRQREhEWlpNQkJMU0xDTVlGRkdUSkpRV0ZUTVRQSldGTkxCWkNNTUpUR0JEWkxRTFBZRkhZWU1KWUxTRENIRFpKV0pDQ1RMSkNMRFRMSkpDUEREU1FEU1NaWUJOREJKTEdHSlpYU1hOTFlDWUJKWFFZQ0JZTFpDRlpQUEdLQ1haRFpGWlRKSkZKU0pYWkJOWllKUVRUWUpZSFRZQ1pIWU1ESlhUVE1QWFNQTFpDRFdTTFNIWFlQWkdURk1MQ0pUWUNCUE1HREtXWUNZWkNEU1paWUhGTFlDVFlHV0hLSllZTFNKQ1hHWVdKQ0JMTENTTkREQlRaQlNDTFlaQ1paU1NRRExMTVFZWUhGU0xRTExYRlRZSEFCWEdXTllXWVlQTExTRExETExCSkNZWEpaTUxITEpEWFlZUVlURExMTEJVR0JGREZCQlFKWlpNRFBKSEdDTEdNSkpQR0FFSEhCV0NRWEFYSEhIWkNIWFlQSEpBWEhMUEhKUEdQWkpRQ1FaR0pKWlpVWkRNUVlZQlpaUEhZSFlCV0hBWllKSFlLRkdEUEZRU0RMWk1MSlhLWEdBTFhaREFHTE1ER1hNV1pRWVhYRFhYUEZETU1TU1lNUEZNRE1NS1hLU1laWVNIRFpLWFNZU01NWlpaTVNZRE5aWkNaWEZQTFNUTVpETk1YQ0tKTVpUWVlNWk1aWk1TWEhIRENaSkVNWFhLTEpTVExXTFNRTFlKWkxMWkpTU0RQUE1ITkxaSkNaWUhNWFhIR1pDSk1ESFhUS0dSTVhGV01DR01XS0RUS1NYUU1NTUZaWllES01TQ0xDTVBDR01IU1BYUVBaRFNTTENYS1lYVFdMV0pZQUhaSkdaUU1DU05YWVlNTVBNTEtKWE1ITE1MUU1YQ1RLWk1KUVlTWkpTWVNaSFNZSlpKQ0RBSlpZQlNEUUpaR1daUVFYRktETVNESkxGV0VIS1pRS0pQRVlQWllTWkNEV1lKRkZNWlpZTFRURFpaRUZNWkxCTlBQTFBMUEVQU1pBTExUWUxLQ0tRWktHRU5RTFdBR1lYWURQWExIU1hRUVdRQ1FYUUNMSFlYWE1MWUNDV0xZTVFZU0tHQ0hMQ0pOU1pLUFlaS0NRWlFMSlBETURaSExBU1hMQllEV1FMV0ROQlFDUllERFpUSllCS0JXU1pEWERUTlBKRFRDVFFERlhRUU1HTlhFQ0xUVEJLUFdTTENUWVFMUFdZWlpLTFBZR1pDUVFQTExLQ0NZTFBRTVpDWlFDTEpTTFFaREpYTERESFBaUURMSkpYWlFEWFlaUUtaTEpDWVFEWUpQUFlQUVlLSllSTVBDQllNQ1hLTExaTExGUVBZTExMTUJTR0xDWVNTTFJTWVNRVE1YWVhaUVpGRFpVWVNZWlRGRk1aWlNNWlFIWlNTQ0NNTFlYV1RQWkdYWkpHWkdTSlNHS0RESFRRR0daTExCSkRaTENCQ0hZWFlaSFpGWVdYWVpZTVNEQlpaWUpHVFNNVEZYUVlYUVNUREdTTE5YRExSWVpaTFJZWUxYUUhUWFNSVFpOR1pYQk5RUVpGTVlLTVpKQlpZTUtCUE5MWVpQQkxNQ05RWVpaWlNKWkhKQ1RaS0hZWlpKUkRZWkhOUFhHTEZaVExLR0pUQ1RTU1lMTEdaUlpCQlFaWktMUEtMQ1pZU1NVWVhCSkZQTkpaWlhDRFdYWllKWFpaREpKS0dHUlNSSktNU01aSkxTSllXUVNLWUhRSlNYUEpaWlpMU05TSFJOWVBaVFdDSEtMUFNSWkxaWFlKUVhRS1lTSllDWlRMUVpZQkJZQldaUFFEV1dZWkNZVEpDSlhDS0NXREtLWlhTR0tEWlhXV1lZSlFZWVRDWVRETExYV0tDWktLTENDTFpDUVFEWkxRTENTRlFDSFFIU0ZTTVFaWkxOQkpKWkJTSkhUU1pEWVNKUUpQRExaQ0RDV0pLSlpaTFBZQ0dNWldESkpCU0pRWlNZWllISFhKUEJKWURTU1hEWk5DR0xRTUJUU0ZTQlBEWkRMWk5GR0ZKR0ZTTVBYSlFMTUJMR1FDWVlYQlFLREpKUVlSRktaVEpESENaS0xCU0RaQ0ZKVFBMTEpHWEhZWFpDU1NaWlhTVEpZR0tHQ0tHWU9RWEpQTFpQQlBHVEdZSlpHSFpRWlpMQkpMU1FGWkdLUVFKWkdZQ1pCWlFUTERYUkpYQlNYWFBaWEhZWllDTFdEWEpKSFhNRkRaUEZaSFFIUU1RR0tTTFlIVFlDR0ZSWkdOUVhDTFBETEJaQ1NDWlFMTEpCTEhCWkNZUFpaUFBEWU1aWlNHWUhDS0NQWkpHU0xKTE5TQ0RTTERMWEJNU1RMRERGSk1LREpESFpMWlhMU1pRUFFQR0pMTFlCRFNaR1FMQlpMU0xLWVlIWlRUTlRKWVFUWlpQU1pRWlRMTEpUWVlMTFFMTFFZWlFMQkRaTFNMWVlaWU1ERlNaU05ITFhaTkNaUVpQQldTS1JGQlNZWk1USEJMR0pQTUNaWkxTVExYU0hUQ1NZWkxaQkxGRVFITFhGTENKTFlMSlFDQlpMWkpISFNTVEJSTUhYWkhKWkNMWEZOQkdYR1RRSkNaVE1TRlpLSk1TU05YTEpLQkhTSlhOVE5MWkROVExNU0pYR1pKWUpDWlhZSllKV1JXV1FOWlRORkpTWlBaU0haSkZZUkRKU0ZTWkpaQkpGWlFaWkhaTFhGWVNCWlFMWlNHWUZUWkRDU1pYWkpCUU1TWktKUkhZSlpDS01KS0hDSEdUWEtYUUdMWFBYRlhUUlRZTFhKWEhEVFNKWEhKWkpYWldaTENRU0JUWFdYR1hUWFhIWEZUU0RLRkpIWllKRkpYUlpTRExMTFRRU1FRWlFXWlhTWVFUV0dXQlpDR1pMTFlaQkNMTVFRVFpIWlhaWExKRlJNWVpGTFhZU1FYWEpLWFJNUURaRE1NWVlCU1FCSEdaTVdGV1hHTVhMWlBZWVRHWllDQ0RYWVpYWVdHU1lKWVpOQkhQWkpTUVNZWFNYUlRGWVpHUkhaVFhTWlpUSENCRkNMU1lYWkxaUU1aTE1QTE1YWkpYU0ZMQllaTVlRSFhKU1hSWFNRWlpaU1NMWUZSQ1pKUkNSWEhIWlhRWURZSFhTSkpIWkNYWkJUWU5TWVNYSkJRTFBYWlFQWU1MWFpLWVhMWENKTENZU1hYWlpMWERMTExKSllIWlhHWUpXS0pSV1lIQ1BTR05SWkxGWldGWlpOU1hHWEZMWlNYWlpaQkZDU1lKREJSSktSREhIR1hKTEpKVEdYSlhYU1RKVEpYTFlYUUZDU0dTV01TQkNUTFFaWldMWlpLWEpNTFRNSllIU0REQlhHWkhETEJNWUpGUlpGU0dDTFlKQlBNTFlTTVNYTFNaSlFRSEpaRlhHRlFGUUJQWFpHWVlRWEdaVENRV1lMVExHV1NHV0hSTEZTRkdaSk1HTUdCR1RKRlNZWlpHWllaQUZMU1NQTUxQRkxDV0JKWkNMSkpNWkxQSkpMWU1RRE1ZWVlGQkdZR1laTUxZWkRYUVlYUlFRUUhTWVlZUVhZTEpUWVhGU0ZTTExHTlFDWUhZQ1dGSENDQ0ZYUFlMWVBMTFpZWFhYWFhLUUhIWFNISlpDRlpTQ1pKWENQWldISEhISEFQWUxRQUxQUUFGWUhYRFlMVUtNWlFHR0dEREVTUk5OWkxUWkdDSFlQUFlTUUpKSENMTEpUT0xOSlBaTEpMSFlNSEVZRFlEU1FZQ0RESEdaVU5EWkNMWllaTExaTlROWVpHU0xIU0xQSkpCREdXWFBDRFVUSkNLTEtDTFdLTExDQVNTVEtaWkROUU5UVExZWVpTU1lTU1paUllMSlFLQ1FESEhDUlhSWllER1JHQ1dDR1pRRkZGUFBKRlpZTkFLUkdZV1lRUFFYWEZLSlRTWlpYU1daRERGQkJYVEJHVFpLWk5QWlpQWlhaUEpTWkJNUUhLQ1lYWUxES0xKTllQS1lHSEdEWkpYWEVBSFBOWktaVFpDTVhDWE1NSlhOS1NaUU5NTkxXQldXWEpLWUhDUFNUTUNTUVRaSllYVFBDVFBEVE5OUEdMTExaU0pMU1BCTFBMUUhEVE5KTkxZWVJTWkZGSkZRV0RQSFpEV01SWkNDTE9EQVhOU1NOWVpSRVNUWUpXSllKREJDRlhOTVdUVEJZTFdTVFNaR1lCTEpQWEdMQk9DTEhQQ0JKTFRNWFpMSllMWlhDTFRQTkNMQ0tYVFBaSlNXQ1lYU0ZZU1pES05UTEJZSkNZSkxMU1RHUUNCWFJZWlhCWEtMWUxIWkxRWkxOWkNYV0paTEpaSk5DSkhYTU5aWkdKWlpYVFpKWFlDWVlDWFhKWVlYSkpYU1NTSlNUU1NUVFBQR1FUQ1NYV1pEQ1NZRlBURkJGSEZCQkxaSkNMWlpEQlhHQ1hMUVBYS0ZaRkxTWUxUVVdCTVFKSFNaQk1EREJDWVNDQ0xEWFlDRERRTFlKSldNUUxMQ1NHTEpKU1lGUFlZQ0NZTFRKQU5USkpQV1lDTU1HUVlZU1hEWFFNWkhTWlhQRlRXV1pRU1dRUkZLSkxaSlFRWUZCUlhKSEhGV0pKWllRQVpNWUZSSENZWUJZUVdMUEVYQ0NaU1RZUkxUVERNUUxZS01CQkdNWVlKUFJLWk5QQlNYWVhCSFlaREpETkdIUE1GU0dNV0ZaTUZRTU1CQ01aWkNKSkxDTlVYWVFMTUxSWUdRWkNZWFpMV0pHQ0pDR0dNQ0pORllaWkpIWUNQUlJDTVRaUVpYSEZRR1RKWENDSkVBUUNSSllIUExRTFNaREpSQkNRSFFEWVJIWUxZWEpTWU1IWllEV0xERlJZSEJQWURUU1NDTldCWEdMUFpNTFpaVFFTU0NQSk1YWFlDU0pZVFlDR0hZQ0pXWVJYWExGRU1XSk5NS0xMU1dUWEhZWVlOQ01NQ1dKRFFESlpHTExKV0pSS0hQWkdHRkxDQ1NDWk1DQkxUQkhCUUpYUURTUERKWlpHS0dMRlFZV0JaWVpKTFRTVERIUUhDVENCQ0hGTFFNUFdEU0hZWVRRV0NOWlpKVExCWU1CUERZWVlYU1FLWFdZWUZMWFhOQ1dDWFlQTUFFTFlLS0pNWlpaQlJYWVlRSkZMSlBGSEhIWVRaWlhTR1FRTUhTUEdEWlFXQldQSkhaSkRZU0NRV1pLVFhYU1FMWllZTVlTRFpHUlhDS0tVSkxXUFlTWVNDU1laTFJNTFFTWUxKWEJDWFRMV0RRWlBDWUNZS1BQUE5TWEZZWkpKUkNFTUhTWk1TWExYR0xSV0dDU1RMUlNYQlpHQlpHWlRDUExVSkxTTFlMWU1UWE1UWlBBTFpYUFhKVEpXVENZWVpMQkxYQlpMUU1ZTFhQR0hEU0xTU0RNWE1CRFpaU1hXSEFNTENaQ1BKTUNOSEpZU05TWUdDSFNLUU1aWlFETExLQUJMV0pYU0ZNT0NEWEpSUkxZUVpLSk1ZQllRTFlIRVRGSlpGUkZLU1JZWEZKVFdEU1hYU1lTUUpZU0xZWFdKSFNOTFhZWVhIQkhBV0hISlpYV01ZTEpDU1NMS1lEWlRYQlpTWUZEWEdYWkpLSFNYWFlCU1NYRFBZTlpXUlBUUVpDWkVOWUdDWFFGSllLSkJaTUxKQ01RUVhVT1hTTFlYWExZTExKRFpCVFlNSFBGU1RUUVFXTEhPS1lCTFpaQUxaWFFMSFpXUlJRSExTVE1ZUFlYSkpYTVFTSkZOQlhZWFlKWFhZUVlMVEhZTFFZRk1MS0xKVE1MTEhTWldLWkhMSk1MSExKS0xKU1RMUVhZTE1CSEhMTkxaWFFKSFhDRlhYTEhZSEpKR0JZWlpLQlhTQ1FESlFEU1VKWllZSFpISE1HU1hDU1lNWEZFQkNRV1dSQlBZWUpRVFlaQ1lRWVFRWllITVdGRkhHWkZSSkZDRFBYTlRRWVpQRFlLSEpMRlJaWFBQWFpEQkJHWlFTVExHREdZTENRTUxDSEhNRllXTFpZWEtKTFlQUUhTWVdNUVFHUVpNTFpKTlNRWEpRU1lKWUNCRUhTWEZTWlBYWldGTExCQ1lZSkRZVERUSFdaU0ZKTVFRWUpMTVFYWExMRFRUS0hIWUJGUFdUWVlTUVFXTlFXTEdXREVCWldDTVlHQ1VMS0pYVE1YTVlKU1hIWUJSV0ZZTVdGUlhZUU1YWVNaVFpaVEZZS01MREhRRFhXWVlOTENSWUpCTFBTWENYWVdMU1BSUkpXWEhRWVBIVFlETlhISE1NWVdZVFpDU1FNVFNTQ0NEQUxXWlRDUFFQWUpMTFFaWUpTV1hNWlpNTVlMTVhDTE1YQ1pNWE1aU1FUWlBQUVFCTFBHWFFaSEZMSkpIWVRKU1JYV1pYU0NDRExYVFlKRENRSlhTTFFZQ0xaWExaWlhNWFFSSk1IUkhaSkJITUZMSkxNTENMUU5MRFhaTExMUFlQU1lKWVNYQ1FRRENNUUpaWlhITlBOWFpNRUtNWEhZS1lRTFhTWFRYSllZSFdEQ1dEWkhRWVlCR1lCQ1lTQ0ZHUFNKTlpEWVpaSlpYUlpSUUpKWU1DQU5ZUkpUTERQUFlaQlNUSktYWFpZUEZEV0ZHWlpSUFlNVE5HWFpRQllYTkJVRk5RS1JKUVpNSkVHUlpHWUNMS1haRFNLS05TWEtDTEpTUEpZWVpMUVFKWUJaU1NRTExMS0pYVEJLVFlMQ0NEREJMU1BQRllMR1lEVFpKWVFHR0tRVFRGWlhCREtUWVlIWUJCRllUWVlCQ0xQRFlUR0RIUllSTkpTUFRDU05ZSlFIS0xMTFpTTFlEWFhXQkNKUVNQWEJQSlpKQ0pEWkZGWFhCUk1MQVpIQ1NORExCSkRTWkJMUFJaVFNXU0JYQkNMTFhYTFpESlpTSlBZTFlYWFlGVEZGRkJISkpYR0JZWEpQTU1NUFNTSlpKTVRMWVpKWFNXWFRZTEVEUVBKTVlHUVpKR0RKTFFKV0pRTExTSkdKR1lHTVNDTEpKWERUWUdKUUpRSkNKWkNKR0RaWlNYUUdTSkdHQ1hIUVhTTlFMWlpCWEhTR1pYQ1hZTEpYWVhZWURGUVFKSEpGWERIQ1RYSllSWFlTUVRKWFlFRllZU1NZWUpYTkNZWlhGWE1TWVNaWFlZU0NIU0hYWlpaR1paWkdGSkRMVFlMTlBaR1lKWVpZWVFaUEJYUUJEWlRaQ1pZWFhZSEhTUVhTSERIR1FISkhHWVdTWlRNWk1MSFlYR0VCVFlMWktRV1lUSlpSQ0xFS1lTVERCQ1lLUVFTQVlYQ0pYV1dHU0JISllaWURIQ1NKS1FDWFNXWEZMVFlOWVpQWkNDWkpRVFpXSlFEWlpaUVpMSkpYTFNCSFBZWFhQU1hTSEhFWlRYRlBUTFFZWlpYSFlUWE5DRlpZWUhYR05YTVlXWFRaU0pQVEhIR1lNWE1YUVpYVFNCQ1pZSllYWFRZWVpZUENRTE1NU1pNSlpaTExaWEdYWkFBSlpZWEpNWlhXRFhaU1haRFpYTEVZSkpaUUJIWldaWlpRVFpQU1haVERTWEpKSlpOWUFaUEhYWVlTUk5RRFRIWkhZWUtZSkhEWlhaTFNXQ0xZQlpZRUNXQ1lDUllMQ1hOSFpZRFpZRFlKREZSSkpIVFJTUVRYWVhKUkpIT0pZTlhFTFhTRlNGSlpHSFBaU1haU1pEWkNRWkJZWUtMU0dTSkhDWlNIREdRR1hZWkdYQ0hYWkpXWVFXR1lIS1NTRVFaWk5EWkZLV1lTU1RDTFpTVFNZTUNESEpYWFlXRVlYQ1pBWURNUFhNRFNYWUJTUU1KTVpKTVRaUUxQSllRWkNHUUhYSkhITFhYSExIRExESlFDTERXQlNYRlpaWVlTQ0hUWVRZWUJIRUNYSFlLR0pQWEhIWVpKRlhIV0hCRFpGWVpCQ0FQTlBHTllETVNYSE1NTU1BTVlOQllKVE1QWFlZTUNUSEpCWllGQ0dUWUhXUEhGVFdaWkVaU0JaRUdQRk1UU0tGVFlDTUhGTExIR1BaSlhaSkdaSllYWlNCQlFTQ1paTFpDQ1NUUEdYTUpTRlRDQ1pKWkRKWENZQlpMRkNKU1laRkdTWkxZQkNXWlpCWVpEWllQU1dZSlpYWkJEU1lVWExaWkJaRllHQ1pYQlpIWkZUUEJHWkdFSkJTVEdLRE1GSFlaWkpIWkxMWlpHSlFaTFNGREpTU0NCWkdQRExGWkZaU1pZWllaU1lHQ1hTTlhYQ0hDWlhUWlpMSkZaR1FTUVlYWkpRRENDWlRRQ0RYWkpZUUpRQ0hYWlRETEdTQ1haU1lRSlFUWldMUURRWlRRQ0hRUUpaWUVaWlpQQldLREpGQ0pQWlRZUFFZUVRUWU5MTUJES1RKWlBRWlFaWkZQWlNCTkpMR1lKRFhKRFpaS1pHUUtYRExQWkpUQ0pEUUJYREpRSlNUQ0tOWEJYWk1TTFlKQ1FNVEpRV1dDSlFOSk5MTExISkNXUVRCWlFZRFpDWlBaWkRaWUREQ1laWlpDQ0pUVEpGWkRQUlJUWlRKRENRVFFaRFRKTlBMWkJDTExDVFpTWEtKWlFaUFpMQlpSQlRKRENYRkNaREJDQ0pKTFRRUVBMRENHWkRCQlpKQ1FEQ0pXWU5MTFpZWkNDRFdMTFhXWkxYUlhOVFFRQ1pYS1FMU0dERlFURERHTFJMQUpKVEtVWU1LUUxMVFpZVERZWUNaR0pXWVhEWEZSU0tTVFFURU5RTVJLUVpISFFLRExEQVpGS1lQQkdHUFpSRUJaWllLWlpTUEVHSlhHWUtRWlpaU0xZU1lZWVpXRlFaWUxaWkxaSFdDSEtZUFFHTlBHQkxQTFJSSllYQ0NTWVlIU0ZaRllCWllZVEdaWFlMWENaV1hYWkpaQkxGRkxHU0tIWUpaRVlKSExQTExMTENaR1hEUlpFTFJIR0tMWlpZSFpMWVFTWlpKWlFMSlpGTE5CSEdXTENaQ0ZKWVNQWVhaTFpMWEdDQ1BaQkxMQ1lCQkJCVUJCQ0JQQ1JOTlpDWllSQkZTUkxEQ0dRWVlRWFlHTVFaV1RaWVRZSlhZRldURUhaWkpZV0xDQ05UWllKSlpERURQWkRaVFNZUUpIRFlNQkpOWUpaTFhUU1NUUEhOREpYWEJZWFFUWlFERFRKVERZWVRHV1NDU1pRRkxTSExHTEJDWlBIRExZWkpZQ0tXVFlUWUxCTllUU0RTWUNDVFlTWllZRUJIRVhIUURUV05ZR1lDTFhUU1pZU1RRTVlHWkFaQ0NTWlpEU0xaQ0xaUlFYWVlFTEpTQllNWFNYWlRFTUJCTExZWUxMWVREUVlTSFlNUlFXS0ZLQkZYTlhTQllDSFhCV0pZSFRRQlBCU0JXRFpZTEtHWlNLWUhYUVpKWEhYSlhHTkxKS1pMWVlDRFhMRllGR0hMSkdKWUJYUUxZQlhRUFFHWlRaUExOQ1lQWERKWVFZRFlNUkJFU0pZWUhLWFhTVE1YUkNaWllXWFlRWUJNQ0xMWVpIUVlaV1FYREJYQlpXWk1TTFBETVlTS0ZNWktMWkNZUVlDWkxRWEZaWllEUVpQWllHWUpZWk1aWERaRllGWVRUUVRaSEdTUENaTUxDQ1lUWlhKQ1lUSk1LU0xQWkhZU05aTExZVFBaQ1RaWkNLVFhESFhYVFFDWUZLU01RQ0NZWUFaSFRKUENZTFpMWUpCSlhUUE5ZTEpZWU5SWFNZTE1NTlhKU01ZQkNTWVNZTFpZTFhKSlFZTERaTFBRQkZaWkJMRk5EWFFLQ1pGWVdIR1FNUkRTWFlDWVRYTlFRSlpZWVBGWlhEWVpGUFJYRUpER1lRQlhSQ05GWVlRUEdIWUpEWVpYR1JIVEtZTE5XRFpOVFNNUEtMQlRIQlBZU1pCWlRKWlNaWkpUWVlYWlBIU1NaWkJaQ1pQVFFGWk1ZRkxZUFlCQkpRWFpNWFhESk1UU1lTS0tCSlpYSEpDS0xQU01LWUpaQ1hUTUxKWVhSWlpRU0xYWFFQWVpYTUtZWFhYSkNMSlBSTVlZR0FEWVNLUUxTTkRIWVpLUVhaWVpUQ0dIWlRMTUxXWllCV1NZQ1RCSEpISkZDV1pUWFdZVEtaTFhRU0hMWUpaSlhUTVBMUFlDR0xUQlpaVExaSkNZSkdEVENMS0xQTExRUEpNWlBBUFhZWkxLS1RLRFpDWlpCTlpEWURZUVpKWUpHTUNUWExUR1hTWkxNTEhCR0xLRldOV1pIRFhVSExGTUtZU0xHWERUV1dGUkpFSlpUWkhZRFhZS1NIV0ZaQ1FTSEtUTVFRSFRaSFlNSkRKU0tIWFpKWkJaWlhZTVBBR1FNU1RQWExTS0xaWU5XUlRTUUxTWkJQU1BTR1pXWUhUTEtTU1NXSFpaTFlZVE5YSkdNSlNaU1VGV05MU09aVFhHWExTQU1NTEJXTERTWllMQUtRQ1FDVE1ZQ0ZKQlNMWENMWlpDTFhYS1NCWlFDTEhKUFNRUExTWFhDS1NMTkhQU0ZRUVlUWFlKWkxRTERYWlFKWkRZWURKTlpQVFVaRFNLSkZTTEpIWUxaU1FaTEJUWFlER1RRRkRCWUFaWERaSFpKTkhIUUJZS05YSkpRQ1pNTExKWktTUExEWUNMQkJMWEtMRUxYSkxCUVlDWEpYR0NOTENRUExaTFpZSlRaTEpHWVpEWlBMVFFDU1hGRE1OWUNYR0JUSkRDWk5CR0JRWVFKV0dLRkhUTlBZUVpRR0JLUEJCWVpNVEpEWVRCTFNRTVBTWFRCTlBEWEtMRU1ZWUNKWU5aQ1RMRFlLWlpYRERYSFFTSERHTVpTSllDQ1RBWVJaTFBZTFRMS1hTTFpDR0dFWENMRlhMS0pSVExRSkFRWk5DTUJZREtLQ1hHTENaSlpYSkhQVERKSk1aUVlLUVNFQ1FaRFNISEFETUxaRk1NWkJHTlRKTk5MR0JZSkJSQlRNTEJZSkRaWExDSkxQTERMUENRREhMWFpMWUNCTENYWlpKQURKTE5aTU1TU1NNWUJIQlNRS0JIUlNYWEpNWFNEWk5aUFhMR0JSSFdHR0ZDWEdNU0tMTFRTSllZQ1FMVFNLWVdZWUhZV1hCWFFZV1BZV1lLUUxTUVBUTlRLSFFDV0RRS1RXUFhYSENQVEhUV1VNU1NZSEJXQ1JXWEhKTUtNWk5HV1RNTEtGR0hLSllMU1lZQ1hXSFlFQ0xRSEtRSFRUUUtIRlpMRFhRV1laWVlERVNCUEtZUlpQSkZZWVpKQ0VRRFpaRExBVFpCQkZKTExDWERMTUpTU1hFR1lHU0pRWENXQlhTU1pQRFlaQ1hETllYUFBaWURMWUpDWlBMVFhMU1hZWllSWENZWVlEWUxXV05aU0FISlNZUVlIR1lXV0FYVEpaREFYWVNSTFREUFNTWVlGTkVKRFhZWkhMWExMTFpRWlNKTllRWVFRWFlKR0haR1pDWUpDSFpMWUNEU0hXU0hKWllKWENMTE5YWkpKWVlYTkZYTVdGUFlMQ1lMTEFCV0RESFdEWEpNQ1haVFpQTUxRWkhTRkhaWU5aVExMRFlXTFNMWEhZTU1ZTE1CV1dLWVhZQURUWFlMTERKUFlCUFdVWEpNV01MTFNBRkRMTFlGTEJISEhCUVFMVFpKQ1FKTERKVEZGS01NTUJZVEhZR0RDUVJERFdSUUpYTkJZU05XWkRCWVlUQkpIUFlCWVRUSlhBQUhHUURRVE1ZU1RRWEtCVFpQS0pMWlJCRVFRU1NNSkpCREpPVEdUQlhQR0JLVExIUVhKSkpDVEhYUURXSkxXUkZXUUdXU0hDS1JZU1dHRlRHWUdCWFNEV0RXUkZIV1lUSkpYWFhKWVpZU0xQWVlZUEFZWEhZRFFLWFNIWFlYR1NLUUhZV0ZERERQUExDSkxRUUVFV1hLU1lZS0RZUExUSlRIS0pMVENZWUhISlRUUExUWlpDRExUSFFLWlhRWVNURUVZV1lZWllYWFlZU1RUSktMTFBaTUNZSFFHWFlIU1JNQlhQTExOUVlEUUhYU1hYV0dEUUJTSFlMTFBKSkpUSFlKS1lQUFRIWVlLVFlFWllFTk1EU0hMQ1JQUUZER0ZYWlBTRlRMSlhYSkJTV1lZU0tTRkxYTFBQTEJCQkxCU0ZYRllaQlNKU1NZTFBCQkZGRkZTU0NKRFNUWlNYWlJZWVNZRkZTWVpZWkJKVEJDVFNCU0RIUlRKSkJZVENYWUpFWUxYQ0JORUJKRFNZWFlLR1NKWkJYQllURlpXR0VOWUhIVEhaSEhYRldHQ1NUQkdYS0xTWFlXTVRNQllYSlNUWlNDRFlRUkNZVFdYWkZITVlNQ1hMWk5TREpUVFRYUllDRllKU0JTRFlFUlhKTEpYQkJERVlOSkdIWEdDS0dTQ1lNQkxYSk1TWk5TS0dYRkJOQlBUSEZKQUFGWFlYRlBYTVlQUURUWkNYWlpQWFJTWVdaRExZQkJLVFlRUFFKUFpZUFpKWk5KUFpKTFpaRllTQlRUU0xNUFRaUlREWFFTSkVIQlpZTFpESExKU1FNTEhUWFRKRUNYU0xaWlNQS1RMWktRUVlGU1lHWVdQQ1BRRkhRSFlUUVhaS1JTR1RUU1FDWkxQVFhDRFlZWlhTUVpTTFhMWk1ZQ1BDUUJaWVhIQlNYTFpETFRDRFhUWUxaSllZWlBaWVpMVFhKU0pYSExQTVlUWENRUkJMWlNTRkpaWlROSllUWE1ZSkhMSFBQTENZWFFKUVFLWlpTQ1BaS1NXQUxRU0JMQ0NaSlNYR1dXV1lHWUtUSkJCWlRES0hYSEtHVEdQQktRWVNMUFhQSkNLQk1MTFhEWlNUQktMR0dRS1FMU0JLS1RGWFJNREtCRlRQWkZSVEJCUkZFUlFHWFlKUFpTU1RMQlpUUFNaUVpTSkRITEpRTFpCUE1TTU1TWExRUU5IS05CTFJERE5YWERIRERKQ1lZR1lMWEdaTFhTWUdNUVFHS0hCUE1YWVhMWVRRV0xXR0NQQk1RWENZWllEUkpCSFRESllIUVNIVE1KU0JZUExXSExaRkZOWVBNSFhYSFBMVEJRUEZCSldRREJZR1BOWlRQRlpKR1NERFRRU0haRUFXWlpZTExUWVlCV0pLWFhHSExGS1hESlRNU1pTUVlOWkdHU1dRU1BIVExTU0tNQ0xaWFlTWlFaWE5DSkRRR1pETEZOWUtMSkNKTExaTE1aWk5IWURTU0hUSFpaTFpaQkJIUVpXV1lDUlpITFlRUUpCRVlGWFhYV0hTUlhXUUhXUFNMTVNTS1pUVFlHWVFRV1JTTEFMSE1KVFFKU01YUUJKSlpKWFpZWktYQllRWEJKWFNIWlRTRkpMWE1YWlhGR0hLWlNaR0dZTENMU0FSSllIU0xMTE1aWEVMR0xYWURKWVRMRkJIQlBOTFlaRkJCSFBUR0pLV0VUWkhLSkpYWlhYR0xMSkxTVEdTSEpKWVFMUVpGS0NHTk5ESlNTWkZEQkNUV1dTRVFGSFFKQlNBUVRHWVBRTEJYQk1NWVdYR1NMWkhHTFpHUVlGTFpCWUZaSkZSWVNGTUJZWkhRR0ZXWlNZRllKSlBIWkJZWVpGRldPREdSTE1GVFdMQlpHWUNRWENESllHWllZWVlUWVRZRFdFR0FaWUhYSkxaWVlITFJNR1JYWFpDTEhORUxKSlRKVFBXSllCSkpCWEpKVEpURUVLSFdTTEpQTFBTRllaUFFRQkRMUUpKVFlZUUxZWktES1NRSllZUVpMRFFUR0pRWVpKU1VDTVJZUVRIVEVKTUZDVFlIWVBLTUhZWldKRFFGSFlZWFdTSENUWFJMSkhRWEhDQ1lZWUpMVEtUVFlUTVhHVENKVFpBWVlPQ1pMWUxCU1pZV0pZVFNKWUhCWVNIRkpMWUdKWFhUTVpZWUxUWFhZUFpMWFlKWllaWVlQTkhNWU1EWVlMQkxITFNZWVFRTExOSkpZTVNPWVFCWkdETFlYWUxDUVlYVFNaRUdYSFpHTEhXQkxKSEVZWFRXUU1BS0JQUUNHWVNISEVHUUNNV1lZV0xKWUpIWVlaTExKSllMSFpZSE1HU0xKTEpYQ0pKWUNMWUNKUENQWkpaSk1NWUxDUUxOUUxKUUpTWFlKTUxTWkxKUUxZQ01NSENGTU1GUFFRTUZZTFFNQ0ZGUU1NTU1ITVpORkhISkdUVEhIS0hTTE5DSEhZUURYVE1NUURDWVpZWFlRTVlRWUxURENZWVlaQVpaQ1lNWllETFpGRkZNTVlDUVpXWlpNQUJUQllaVERNTlpaR0dERlRZUENHUVlUVFNTRkZXRkRUWlFTU1lTVFdYSkhYWVRTWFhZTEJZUUhXV0tYSFpYV1pOTlpaSlpKSlFKQ0NDSFlZWEJaWFpDWVpUTExDUVhZTkpZQ1lZQ1lOWlpRWVlZRVdZQ1pEQ0pZQ0NIWUpMQlRaWVlDUVdNUFdQWU1MR0tETERMR0tRUUJHWUNISlhZXCI7XHJcbiAgICAvL+atpOWkhOaUtuW9leS6hjM3NeS4quWkmumfs+Wtl1xyXG4gICB2YXIgb011bHRpRGlmZj17XCIxOTk2OVwiOlwiRFpcIixcIjE5OTc1XCI6XCJXTVwiLFwiMTk5ODhcIjpcIlFKXCIsXCIyMDA0OFwiOlwiWUxcIixcIjIwMDU2XCI6XCJTQ1wiLFwiMjAwNjBcIjpcIk5NXCIsXCIyMDA5NFwiOlwiUUdcIixcIjIwMTI3XCI6XCJRSlwiLFwiMjAxNjdcIjpcIlFDXCIsXCIyMDE5M1wiOlwiWUdcIixcIjIwMjUwXCI6XCJLSFwiLFwiMjAyNTZcIjpcIlpDXCIsXCIyMDI4MlwiOlwiU0NcIixcIjIwMjg1XCI6XCJRSkdcIixcIjIwMjkxXCI6XCJURFwiLFwiMjAzMTRcIjpcIllEXCIsXCIyMDM0MFwiOlwiTkVcIixcIjIwMzc1XCI6XCJURFwiLFwiMjAzODlcIjpcIllKXCIsXCIyMDM5MVwiOlwiQ1pcIixcIjIwNDE1XCI6XCJQQlwiLFwiMjA0NDZcIjpcIllTXCIsXCIyMDQ0N1wiOlwiU1FcIixcIjIwNTA0XCI6XCJUQ1wiLFwiMjA2MDhcIjpcIktHXCIsXCIyMDg1NFwiOlwiUUpcIixcIjIwODU3XCI6XCJaQ1wiLFwiMjA5MTFcIjpcIlBGXCIsXCIyMDUwNFwiOlwiVENcIixcIjIwNjA4XCI6XCJLR1wiLFwiMjA4NTRcIjpcIlFKXCIsXCIyMDg1N1wiOlwiWkNcIixcIjIwOTExXCI6XCJQRlwiLFwiMjA5ODVcIjpcIkFXXCIsXCIyMTAzMlwiOlwiUEJcIixcIjIxMDQ4XCI6XCJYUVwiLFwiMjEwNDlcIjpcIlNDXCIsXCIyMTA4OVwiOlwiWVNcIixcIjIxMTE5XCI6XCJKQ1wiLFwiMjEyNDJcIjpcIlNCXCIsXCIyMTI3M1wiOlwiU0NcIixcIjIxMzA1XCI6XCJZUFwiLFwiMjEzMDZcIjpcIlFPXCIsXCIyMTMzMFwiOlwiWkNcIixcIjIxMzMzXCI6XCJTRENcIixcIjIxMzQ1XCI6XCJRS1wiLFwiMjEzNzhcIjpcIkNBXCIsXCIyMTM5N1wiOlwiU0NcIixcIjIxNDE0XCI6XCJYU1wiLFwiMjE0NDJcIjpcIlNDXCIsXCIyMTQ3N1wiOlwiSkdcIixcIjIxNDgwXCI6XCJURFwiLFwiMjE0ODRcIjpcIlpTXCIsXCIyMTQ5NFwiOlwiWVhcIixcIjIxNTA1XCI6XCJZWFwiLFwiMjE1MTJcIjpcIkhHXCIsXCIyMTUyM1wiOlwiWEhcIixcIjIxNTM3XCI6XCJQQlwiLFwiMjE1NDJcIjpcIlBGXCIsXCIyMTU0OVwiOlwiS0hcIixcIjIxNTcxXCI6XCJFXCIsXCIyMTU3NFwiOlwiREFcIixcIjIxNTg4XCI6XCJURFwiLFwiMjE1ODlcIjpcIk9cIixcIjIxNjE4XCI6XCJaQ1wiLFwiMjE2MjFcIjpcIktIQVwiLFwiMjE2MzJcIjpcIlpKXCIsXCIyMTY1NFwiOlwiS0dcIixcIjIxNjc5XCI6XCJMS0dcIixcIjIxNjgzXCI6XCJLSFwiLFwiMjE3MTBcIjpcIkFcIixcIjIxNzE5XCI6XCJZSFwiLFwiMjE3MzRcIjpcIldPRVwiLFwiMjE3NjlcIjpcIkFcIixcIjIxNzgwXCI6XCJXTlwiLFwiMjE4MDRcIjpcIlhIXCIsXCIyMTgzNFwiOlwiQVwiLFwiMjE4OTlcIjpcIlpEXCIsXCIyMTkwM1wiOlwiUk5cIixcIjIxOTA4XCI6XCJXT1wiLFwiMjE5MzlcIjpcIlpDXCIsXCIyMTk1NlwiOlwiU0FcIixcIjIxOTY0XCI6XCJZQVwiLFwiMjE5NzBcIjpcIlREXCIsXCIyMjAwM1wiOlwiQVwiLFwiMjIwMzFcIjpcIkpHXCIsXCIyMjA0MFwiOlwiWFNcIixcIjIyMDYwXCI6XCJaQ1wiLFwiMjIwNjZcIjpcIlpDXCIsXCIyMjA3OVwiOlwiTUhcIixcIjIyMTI5XCI6XCJYSlwiLFwiMjIxNzlcIjpcIlhBXCIsXCIyMjIzN1wiOlwiTkpcIixcIjIyMjQ0XCI6XCJURFwiLFwiMjIyODBcIjpcIkpRXCIsXCIyMjMwMFwiOlwiWUhcIixcIjIyMzEzXCI6XCJYV1wiLFwiMjIzMzFcIjpcIllRXCIsXCIyMjM0M1wiOlwiWUpcIixcIjIyMzUxXCI6XCJQSFwiLFwiMjIzOTVcIjpcIkRDXCIsXCIyMjQxMlwiOlwiVERcIixcIjIyNDg0XCI6XCJQQlwiLFwiMjI1MDBcIjpcIlBCXCIsXCIyMjUzNFwiOlwiWkRcIixcIjIyNTQ5XCI6XCJESFwiLFwiMjI1NjFcIjpcIlBCXCIsXCIyMjYxMlwiOlwiVERcIixcIjIyNzcxXCI6XCJLUVwiLFwiMjI4MzFcIjpcIkhCXCIsXCIyMjg0MVwiOlwiSkdcIixcIjIyODU1XCI6XCJRSlwiLFwiMjI4NjVcIjpcIlhRXCIsXCIyMzAxM1wiOlwiTUxcIixcIjIzMDgxXCI6XCJXTVwiLFwiMjM0ODdcIjpcIlNYXCIsXCIyMzU1OFwiOlwiUUpcIixcIjIzNTYxXCI6XCJZV1wiLFwiMjM1ODZcIjpcIllXXCIsXCIyMzYxNFwiOlwiWVdcIixcIjIzNjE1XCI6XCJTTlwiLFwiMjM2MzFcIjpcIlBCXCIsXCIyMzY0NlwiOlwiWlNcIixcIjIzNjYzXCI6XCJaVFwiLFwiMjM2NzNcIjpcIllHXCIsXCIyMzc2MlwiOlwiVERcIixcIjIzNzY5XCI6XCJaU1wiLFwiMjM3ODBcIjpcIlFKXCIsXCIyMzg4NFwiOlwiUUtcIixcIjI0MDU1XCI6XCJYSFwiLFwiMjQxMTNcIjpcIkRDXCIsXCIyNDE2MlwiOlwiWkNcIixcIjI0MTkxXCI6XCJHQVwiLFwiMjQyNzNcIjpcIlFKXCIsXCIyNDMyNFwiOlwiTkxcIixcIjI0Mzc3XCI6XCJURFwiLFwiMjQzNzhcIjpcIlFKXCIsXCIyNDQzOVwiOlwiUEZcIixcIjI0NTU0XCI6XCJaU1wiLFwiMjQ2ODNcIjpcIlREXCIsXCIyNDY5NFwiOlwiV0VcIixcIjI0NzMzXCI6XCJMS1wiLFwiMjQ5MjVcIjpcIlROXCIsXCIyNTA5NFwiOlwiWkdcIixcIjI1MTAwXCI6XCJYUVwiLFwiMjUxMDNcIjpcIlhIXCIsXCIyNTE1M1wiOlwiUEJcIixcIjI1MTcwXCI6XCJQQlwiLFwiMjUxNzlcIjpcIktHXCIsXCIyNTIwM1wiOlwiUEJcIixcIjI1MjQwXCI6XCJaU1wiLFwiMjUyODJcIjpcIkZCXCIsXCIyNTMwM1wiOlwiTkFcIixcIjI1MzI0XCI6XCJLR1wiLFwiMjUzNDFcIjpcIlpZXCIsXCIyNTM3M1wiOlwiV1pcIixcIjI1Mzc1XCI6XCJYSlwiLFwiMjUzODRcIjpcIkFcIixcIjI1NDU3XCI6XCJBXCIsXCIyNTUyOFwiOlwiU0RcIixcIjI1NTMwXCI6XCJTQ1wiLFwiMjU1NTJcIjpcIlREXCIsXCIyNTc3NFwiOlwiWkNcIixcIjI1ODc0XCI6XCJaQ1wiLFwiMjYwNDRcIjpcIllXXCIsXCIyNjA4MFwiOlwiV01cIixcIjI2MjkyXCI6XCJQQlwiLFwiMjYzMzNcIjpcIlBCXCIsXCIyNjM1NVwiOlwiWllcIixcIjI2MzY2XCI6XCJDWlwiLFwiMjYzOTdcIjpcIlpDXCIsXCIyNjM5OVwiOlwiUUpcIixcIjI2NDE1XCI6XCJaU1wiLFwiMjY0NTFcIjpcIlNCXCIsXCIyNjUyNlwiOlwiWkNcIixcIjI2NTUyXCI6XCJKR1wiLFwiMjY1NjFcIjpcIlREXCIsXCIyNjU4OFwiOlwiSkdcIixcIjI2NTk3XCI6XCJDWlwiLFwiMjY2MjlcIjpcIlpTXCIsXCIyNjYzOFwiOlwiWUxcIixcIjI2NjQ2XCI6XCJYUVwiLFwiMjY2NTNcIjpcIktHXCIsXCIyNjY1N1wiOlwiWEpcIixcIjI2NzI3XCI6XCJIR1wiLFwiMjY4OTRcIjpcIlpDXCIsXCIyNjkzN1wiOlwiWlNcIixcIjI2OTQ2XCI6XCJaQ1wiLFwiMjY5OTlcIjpcIktKXCIsXCIyNzA5OVwiOlwiS0pcIixcIjI3NDQ5XCI6XCJZUVwiLFwiMjc0ODFcIjpcIlhTXCIsXCIyNzU0MlwiOlwiWlNcIixcIjI3NjYzXCI6XCJaU1wiLFwiMjc3NDhcIjpcIlRTXCIsXCIyNzc4NFwiOlwiU0NcIixcIjI3Nzg4XCI6XCJaRFwiLFwiMjc3OTVcIjpcIlREXCIsXCIyNzgxMlwiOlwiT1wiLFwiMjc4NTBcIjpcIlBCXCIsXCIyNzg1MlwiOlwiTUJcIixcIjI3ODk1XCI6XCJTTFwiLFwiMjc4OThcIjpcIlBMXCIsXCIyNzk3M1wiOlwiUUpcIixcIjI3OTgxXCI6XCJLSFwiLFwiMjc5ODZcIjpcIkhYXCIsXCIyNzk5NFwiOlwiWEpcIixcIjI4MDQ0XCI6XCJZQ1wiLFwiMjgwNjVcIjpcIldHXCIsXCIyODE3N1wiOlwiU01cIixcIjI4MjY3XCI6XCJRSlwiLFwiMjgyOTFcIjpcIktIXCIsXCIyODMzN1wiOlwiWlFcIixcIjI4NDYzXCI6XCJUTFwiLFwiMjg1NDhcIjpcIkRDXCIsXCIyODYwMVwiOlwiVERcIixcIjI4Njg5XCI6XCJQQlwiLFwiMjg4MDVcIjpcIkpHXCIsXCIyODgyMFwiOlwiUUdcIixcIjI4ODQ2XCI6XCJQQlwiLFwiMjg5NTJcIjpcIlREXCIsXCIyODk3NVwiOlwiWkNcIixcIjI5MTAwXCI6XCJBXCIsXCIyOTMyNVwiOlwiUUpcIixcIjI5NTc1XCI6XCJTTFwiLFwiMjk2MDJcIjpcIkZCXCIsXCIzMDAxMFwiOlwiVERcIixcIjMwMDQ0XCI6XCJDWFwiLFwiMzAwNThcIjpcIlBGXCIsXCIzMDA5MVwiOlwiWVNQXCIsXCIzMDExMVwiOlwiWU5cIixcIjMwMjI5XCI6XCJYSlwiLFwiMzA0MjdcIjpcIlNDXCIsXCIzMDQ2NVwiOlwiU1hcIixcIjMwNjMxXCI6XCJZUVwiLFwiMzA2NTVcIjpcIlFKXCIsXCIzMDY4NFwiOlwiUUpHXCIsXCIzMDcwN1wiOlwiU0RcIixcIjMwNzI5XCI6XCJYSFwiLFwiMzA3OTZcIjpcIkxHXCIsXCIzMDkxN1wiOlwiUEJcIixcIjMxMDc0XCI6XCJOTVwiLFwiMzEwODVcIjpcIkpaXCIsXCIzMTEwOVwiOlwiU0NcIixcIjMxMTgxXCI6XCJaQ1wiLFwiMzExOTJcIjpcIk1MQlwiLFwiMzEyOTNcIjpcIkpRXCIsXCIzMTQwMFwiOlwiWVhcIixcIjMxNTg0XCI6XCJZSlwiLFwiMzE4OTZcIjpcIlpOXCIsXCIzMTkwOVwiOlwiWllcIixcIjMxOTk1XCI6XCJYSlwiLFwiMzIzMjFcIjpcIlBGXCIsXCIzMjMyN1wiOlwiWllcIixcIjMyNDE4XCI6XCJIR1wiLFwiMzI0MjBcIjpcIlhRXCIsXCIzMjQyMVwiOlwiSEdcIixcIjMyNDM4XCI6XCJMR1wiLFwiMzI0NzNcIjpcIkdKXCIsXCIzMjQ4OFwiOlwiVERcIixcIjMyNTIxXCI6XCJRSlwiLFwiMzI1MjdcIjpcIlBCXCIsXCIzMjU2MlwiOlwiWlNRXCIsXCIzMjU2NFwiOlwiSlpcIixcIjMyNzM1XCI6XCJaRFwiLFwiMzI3OTNcIjpcIlBCXCIsXCIzMzA3MVwiOlwiUEZcIixcIjMzMDk4XCI6XCJYTFwiLFwiMzMxMDBcIjpcIllBXCIsXCIzMzE1MlwiOlwiUEJcIixcIjMzMjYxXCI6XCJDWFwiLFwiMzMzMjRcIjpcIkJQXCIsXCIzMzMzM1wiOlwiVERcIixcIjMzNDA2XCI6XCJZQVwiLFwiMzM0MjZcIjpcIldNXCIsXCIzMzQzMlwiOlwiUEJcIixcIjMzNDQ1XCI6XCJKR1wiLFwiMzM0ODZcIjpcIlpOXCIsXCIzMzQ5M1wiOlwiVFNcIixcIjMzNTA3XCI6XCJRSlwiLFwiMzM1NDBcIjpcIlFKXCIsXCIzMzU0NFwiOlwiWkNcIixcIjMzNTY0XCI6XCJYUVwiLFwiMzM2MTdcIjpcIllUXCIsXCIzMzYzMlwiOlwiUUpcIixcIjMzNjM2XCI6XCJYSFwiLFwiMzM2MzdcIjpcIllYXCIsXCIzMzY5NFwiOlwiV0dcIixcIjMzNzA1XCI6XCJQRlwiLFwiMzM3MjhcIjpcIllXXCIsXCIzMzg4MlwiOlwiU1JcIixcIjM0MDY3XCI6XCJXTVwiLFwiMzQwNzRcIjpcIllXXCIsXCIzNDEyMVwiOlwiUUpcIixcIjM0MjU1XCI6XCJaQ1wiLFwiMzQyNTlcIjpcIlhMXCIsXCIzNDQyNVwiOlwiSkhcIixcIjM0NDMwXCI6XCJYSFwiLFwiMzQ0ODVcIjpcIktIXCIsXCIzNDUwM1wiOlwiWVNcIixcIjM0NTMyXCI6XCJIR1wiLFwiMzQ1NTJcIjpcIlhTXCIsXCIzNDU1OFwiOlwiWUVcIixcIjM0NTkzXCI6XCJaTFwiLFwiMzQ2NjBcIjpcIllRXCIsXCIzNDg5MlwiOlwiWEhcIixcIjM0OTI4XCI6XCJTQ1wiLFwiMzQ5OTlcIjpcIlFKXCIsXCIzNTA0OFwiOlwiUEJcIixcIjM1MDU5XCI6XCJTQ1wiLFwiMzUwOThcIjpcIlpDXCIsXCIzNTIwM1wiOlwiVFFcIixcIjM1MjY1XCI6XCJKWFwiLFwiMzUyOTlcIjpcIkpYXCIsXCIzNTc4MlwiOlwiU1pcIixcIjM1ODI4XCI6XCJZU1wiLFwiMzU4MzBcIjpcIkVcIixcIjM1ODQzXCI6XCJURFwiLFwiMzU4OTVcIjpcIllHXCIsXCIzNTk3N1wiOlwiTUhcIixcIjM2MTU4XCI6XCJKR1wiLFwiMzYyMjhcIjpcIlFKXCIsXCIzNjQyNlwiOlwiWFFcIixcIjM2NDY2XCI6XCJEQ1wiLFwiMzY3MTBcIjpcIkpDXCIsXCIzNjcxMVwiOlwiWllHXCIsXCIzNjc2N1wiOlwiUEJcIixcIjM2ODY2XCI6XCJTS1wiLFwiMzY5NTFcIjpcIllXXCIsXCIzNzAzNFwiOlwiWVhcIixcIjM3MDYzXCI6XCJYSFwiLFwiMzcyMThcIjpcIlpDXCIsXCIzNzMyNVwiOlwiWkNcIixcIjM4MDYzXCI6XCJQQlwiLFwiMzgwNzlcIjpcIlREXCIsXCIzODA4NVwiOlwiUVlcIixcIjM4MTA3XCI6XCJEQ1wiLFwiMzgxMTZcIjpcIlREXCIsXCIzODEyM1wiOlwiWURcIixcIjM4MjI0XCI6XCJIR1wiLFwiMzgyNDFcIjpcIlhUQ1wiLFwiMzgyNzFcIjpcIlpDXCIsXCIzODQxNVwiOlwiWUVcIixcIjM4NDI2XCI6XCJLSFwiLFwiMzg0NjFcIjpcIllEXCIsXCIzODQ2M1wiOlwiQUVcIixcIjM4NDY2XCI6XCJQQlwiLFwiMzg0NzdcIjpcIlhKXCIsXCIzODUxOFwiOlwiWVRcIixcIjM4NTUxXCI6XCJXS1wiLFwiMzg1ODVcIjpcIlpDXCIsXCIzODcwNFwiOlwiWFNcIixcIjM4NzM5XCI6XCJMSlwiLFwiMzg3NjFcIjpcIkdKXCIsXCIzODgwOFwiOlwiU1FcIixcIjM5MDQ4XCI6XCJKR1wiLFwiMzkwNDlcIjpcIlhKXCIsXCIzOTA1MlwiOlwiSEdcIixcIjM5MDc2XCI6XCJDWlwiLFwiMzkyNzFcIjpcIlhUXCIsXCIzOTUzNFwiOlwiVERcIixcIjM5NTUyXCI6XCJURFwiLFwiMzk1ODRcIjpcIlBCXCIsXCIzOTY0N1wiOlwiU0JcIixcIjM5NzMwXCI6XCJMR1wiLFwiMzk3NDhcIjpcIlRQQlwiLFwiNDAxMDlcIjpcIlpRXCIsXCI0MDQ3OVwiOlwiTkRcIixcIjQwNTE2XCI6XCJIR1wiLFwiNDA1MzZcIjpcIkhHXCIsXCI0MDU4M1wiOlwiUUpcIixcIjQwNzY1XCI6XCJZUVwiLFwiNDA3ODRcIjpcIlFKXCIsXCI0MDg0MFwiOlwiWUtcIixcIjQwODYzXCI6XCJRSkdcIn07XHJcbiAgICAvL+WPguaVsCzkuK3mloflrZfnrKbkuLJcclxuICAgIC8v6L+U5Zue5YC8OuaLvOmfs+mmluWtl+avjeS4suaVsOe7hFxyXG4gICAgZnVuY3Rpb24gbWFrZVB5KHN0cikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHN0cikgIT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKC0xLCBcIuWHveaVsG1ha2VQeemcgOimgeWtl+espuS4suexu+Wei+WPguaVsCFcIik7XHJcbiAgICAgICAgdmFyIGFyclJlc3VsdCA9IG5ldyBBcnJheSgpOyAvL+S/neWtmOS4remXtOe7k+aenOeahOaVsOe7hFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgLy/ojrflvpd1bmljb2Rl56CBXHJcbiAgICAgICAgICAgIHZhciBjaCA9IHN0ci5jaGFyQXQoaSk7XHJcbiAgICAgICAgICAgIC8v5qOA5p+l6K+ldW5pY29kZeeggeaYr+WQpuWcqOWkhOeQhuiMg+WbtOS5i+WGhSzlnKjliJnov5Tlm57or6XnoIHlr7nmmKDmsYnlrZfnmoTmi7zpn7PpppblrZfmr40s5LiN5Zyo5YiZ6LCD55So5YW25a6D5Ye95pWw5aSE55CGXHJcbiAgICAgICAgICAgIGFyclJlc3VsdC5wdXNoKGNoZWNrQ2goY2gpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpITnkIZhcnJSZXN1bHQs6L+U5Zue5omA5pyJ5Y+v6IO955qE5ou86Z+z6aaW5a2X5q+N5Liy5pWw57uEXHJcbiAgICAgICAgcmV0dXJuIG1rUnNsdChhcnJSZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrQ2goY2gpIHtcclxuICAgICAgICB2YXIgdW5pID0gY2guY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAvL+WmguaenOS4jeWcqOaxieWtl+WkhOeQhuiMg+WbtOS5i+WGhSzov5Tlm57ljp/lrZfnrKYs5Lmf5Y+v5Lul6LCD55So6Ieq5bex55qE5aSE55CG5Ye95pWwXHJcbiAgICAgICAgaWYgKHVuaSA+IDQwODY5IHx8IHVuaSA8IDE5OTY4KVxyXG4gICAgICAgICAgICByZXR1cm4gY2g7IC8vZGVhbFdpdGhPdGhlcnMoY2gpO1xyXG4gICAgICAgIC8v5qOA5p+l5piv5ZCm5piv5aSa6Z+z5a2XLOaYr+aMieWkmumfs+Wtl+WkhOeQhizkuI3mmK/lsLHnm7TmjqXlnKhzdHJDaGluZXNlRmlyc3RQWeWtl+espuS4suS4reaJvuWvueW6lOeahOmmluWtl+avjVxyXG4gICAgICAgIHJldHVybiAob011bHRpRGlmZlt1bmldID8gb011bHRpRGlmZlt1bmldIDogKHN0ckNoaW5lc2VGaXJzdFBZLmNoYXJBdCh1bmkgLSAxOTk2OCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBta1JzbHQoYXJyKSB7XHJcbiAgICAgICAgdmFyIGFyclJzbHQgPSBbXCJcIl07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc3RyID0gYXJyW2ldO1xyXG4gICAgICAgICAgICB2YXIgc3RybGVuID0gc3RyLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKHN0cmxlbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGFyclJzbHQubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJSc2x0W2tdICs9IHN0cjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciB0bXBBcnIgPSBhcnJSc2x0LnNsaWNlKDApO1xyXG4gICAgICAgICAgICAgICAgYXJyUnNsdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IHN0cmxlbjsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpI3liLbkuIDkuKrnm7jlkIznmoRhcnJSc2x0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHRtcEFyci5zbGljZSgwKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+aKiuW9k+WJjeWtl+espnN0cltrXea3u+WKoOWIsOavj+S4quWFg+e0oOacq+WwvlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdG1wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSArPSBzdHIuY2hhckF0KGspO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+aKiuWkjeWItuW5tuS/ruaUueWQjueahOaVsOe7hOi/nuaOpeWIsGFyclJzbHTkuIpcclxuICAgICAgICAgICAgICAgICAgICBhcnJSc2x0ID0gYXJyUnNsdC5jb25jYXQodG1wKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyUnNsdDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S4pOerr+WOu+epuuagvOWHveaVsFxyXG4gICAgU3RyaW5nLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyheXFxzKil8KFxccyokKS9nLCBcIlwiKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIHBpbnlpbiA9IHt9O1xyXG4gICAgcGlueWluLm1ha2VQeSA9IG1ha2VQeTtcclxuXHJcblxyXG4gICAgLy92YXIgbWFpbnBhbmVsO1xyXG4gICAgLy92YXIgb3B0cztcclxuICAgIHZhciBlbGVtZW50ID0gbGF5dWkuZWxlbWVudCxcclxuICAgICAgICB3aW4gPSB3aW5kb3csXHJcbiAgICAgICAgZG9jID0gZG9jdW1lbnQ7XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZGluZygpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBsYXllci5sb2FkKDIsIHtcclxuICAgICAgICAgICAgc2hhZGU6IFswLjYsICcjZmZmJ10gLy8wLjHpgI/mmI7luqbnmoTnmb3oibLog4zmma9cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIFxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsYXllci5jbG9zZShpbmRleClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBsZ1NpZGViYXIgPSBmdW5jdGlvbiAoZWxlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgQ2xhc3NNYWluID0ge1xyXG4gICAgICAgICAgICBkb206IG51bGwsXHJcbiAgICAgICAgICAgIGRvY3VtZW50UGFuZWw6IG51bGwsXHJcbiAgICAgICAgICAgIG1ldW5QYW5lbFRoaXM6IG51bGwsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBmdW5jdGlvbiAobWV1blBhbmVsVGhpcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9nZXREYXRhID0gdGhpcy5tZXVuUGFuZWxUaGlzLmdldERhdGEucGFyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgIGlmKCFfZ2V0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgX2dldERhdGE9W107XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuayoeacieaVsOaNrlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHJlbmRlck5hdiA9IHRoaXMubWFpbk5hdihfZ2V0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IHRoaXMub3BlcztcclxuICAgICAgICAgICAgICAgIHZhciB0bWwgPVxyXG4gICAgICAgICAgICAgICAgICAgICQoYDxkaXYgY2xhc3M9XCJwbGctc2lkZWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgIDxkaXYgY2xhc3M9XCJtYWluLW5hdlwiPlxyXG4gICAgICAgIDxkaXYgaWQ9XCJtZXVuU29yb2xsXCIgY2xhc3M9XCJsYXl1aS1zaWRlLXNjcm9sbFwiPlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGctbG9nb1wiID5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibG9nby1wYXRoICR7b3B0cy5sb2dvPT0ncGxnJyYmJ3BsZy1sb2dvJ31cIiA+PC9hPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8aSBpZD1cInBsZy1sb2dvLWZvbGRcIiBjbGFzcz1cImFudGljb24gbGF5dWktaWNvbiBsYXl1aS1pY29uLXNocmluay1yaWdodFwiPjwvaT5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgIFxyXG4gICAgICAgICAgICA8IS0tIOW3puS+p+WvvOiIquWMuuWfn++8iOWPr+mFjeWQiGxheXVp5bey5pyJ55qE5Z6C55u05a+86Iiq77yJIC0tPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItb3BlblwiIGRhdGEtdHlwZT1cImhvb3QtY2xpY2tcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1sYXllci1zZXR3aW5cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxheXVpLWljb24gbGF5dWktaWNvbi1jbG9zZVwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj48L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1zZWFyY2hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByLWljb24tc2VhcmNoLXdyYXBwZXJcIj48aSBjbGFzcz1cImxheXVpLWljb24gbGF5dWktaWNvbi1zZWFyY2hcclxuXCI+PC9pPjwvc3Bhbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJzZWxlY3RJbnB1dFwiIGNsYXNzPVwicHItc2VhcmNoLWlucHV0XCIgcGxhY2Vob2xkZXI9XCLor7fovpPlhaXlhbPplK7or41cIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC10aXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHNwYW4+5Lul5LiL5piv5LiO4oCcPHN0cm9uZz48L3N0cm9uZz7igJ3nm7jlhbPnmoTkuqflk4HvvJo8L3NwYW4+PC9wPjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByLWxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwia2V5VXBMaXN0XCIgY2xhc3M9XCJrZXlVcExpc3RcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItbWV1bmdyb3VwLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjcm9sbC1uYXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicmlnaHQtc2lkZWJhclwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3QtYWxsXCIgZGF0YS10eXBlPVwiaG9vdC1jbGlja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1ib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250IHAtaWNvbi1hbGxcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZXVuLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIlwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj7miYDmnInmnI3liqE8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJyaWdodC1tb3ZlciBsYXl1aS1pY29uIGxheXVpLWljb24tcmlnaHRcclxuXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdi1sYXN0XCIgZGF0YS10eXBlPVwiaG9vdC1jbGlja1wiPlxyXG4gICAgICAgICAgICAgICAgPHVsIGlkPVwic2lkZWJhclwiIGNsYXNzPVwic2lkZWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICR7cmVuZGVyTmF2fVxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXYtaG92ZXItY2hpbGRcIiA+XHJcbiAgICAgICAgICAgICAgICA8IS0tIOS6jOe6p+iPnOWNlSAtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1zaWRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwibmF2LXRpdGxlXCI+PC9kaXY+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cImJvZHktbmF2XCIgbGF5LWZpbHRlcj1cInRlc3RcIj48L3VsPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgIFxyXG48L2Rpdj5cclxuYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG1sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1haW5OYXY6IGZ1bmN0aW9uIChwYXJlbnREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyAhaXRlbS5sZWFmXHJcbiAgICAgICAgICAgICAgICBpZighcGFyZW50RGF0YVswXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RGF0YVswXT1bXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5pWw5o2u5Yqg6L295aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYXJlbnREYXRhWzBdLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnBhcmVudE1lbnVJZCA9PT0gXCIwXCIgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxhbmd1YWdlPUhUTUxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlICs9IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicy1pdGVtXCIgaWQ9JHtpdGVtLmlkfSBtZW51LWlkPSR7aXRlbS5tZW51SWR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIiR7aXRlbS5pbWFnZVBhdGh9XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZXVuLW5hbWVcIj48YSBocmVmPVwiJHshaXRlbS5sZWFmP1wiamF2YXNjcmlwdDo7XCI6aXRlbS5wYXRofVwiPiR7aXRlbS5uYW1lfTwvYT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzZXRPcGVuTWVudUxpc3Q6IGZ1bmN0aW9uIChlbGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKGA8ZGl2IGNsYXNzPVwicHItbWV1bi1ncm91cFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJwci1tZXVuLWdyb3VwXCI+PC9kaXY+PGRpdiBjbGFzcz1cInByLW1ldW4tZ3JvdXBcIj48L2Rpdj5gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+aPkuWFpeWPs+i+ueeahOWvvOiIqlxyXG4gICAgICAgICAgICAgICAgJChfdGhpcy5kb2N1bWVudFBhbmVsWzBdKS5maW5kKFwiLnJpZ2h0LXNpZGViYXJcIikuaHRtbChcIlwiKS5hcHBlbmQoX3RoaXMubWFpbk5hdihkYXRhKSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhWzBdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGlueGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZSA9IGA8ZGl2IGNsYXNzPVwibGlzdC1pdGVtXCIgaWQ9JHtpdGVtLm1lbnVJZH0+PGEgaHJlZj1cIiR7IWl0ZW0ubGVhZj8namF2YXNjcmlwdDo7JzppdGVtLnBhdGh9XCIgbWVudS1pZD0ke2l0ZW0ubWVudUlkfSBwYXJlbnRtZW51aWQ9JHtpdGVtLnBhcmVudE1lbnVJZH0gY2xhc3M9XCJsaXN0LXRpdGxlXCI+JHtpdGVtLm5hbWV9PC9hPmA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaXRlbS5tZW51SWRdICYmIGRhdGFbaXRlbS5tZW51SWRdLmZvckVhY2goZnVuY3Rpb24gKGNpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUgKz0gYDxkaXYgY2xhc3M9XCJtZW51LXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPSR7Y2l0ZW0ucGF0aCB8fCBcImphdmFzY3JpcHQ6O1wifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51LWlkPSR7Y2l0ZW0ubWVudUlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRtZW51aWQ9JHtjaXRlbS5wYXJlbnRNZW51SWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYWY9JHtjaXRlbS5sZWFmfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2NpdGVtLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbY2l0ZW0ubWVudUlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtjaXRlbS5tZW51SWRdLmZvckVhY2goZnVuY3Rpb24gKGRpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlICs9IGA8ZGl2IGNsYXNzPVwibWVudS10ZXh0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPSR7ZGl0ZW0ucGF0aCB8fCBcImphdmFzY3JpcHQ6O1wifSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51LWlkPSR7ZGl0ZW0ubWVudUlkfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRtZW51aWQ9JHtkaXRlbS5wYXJlbnRNZW51SWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhZj0ke2RpdGVtLmxlYWZ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtkaXRlbS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlICs9IGA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnhleCAlIDMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAuZXEoMCkuYXBwZW5kKGVsZSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlueGV4ICUgMyA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cC5lcSgxKS5hcHBlbmQoZWxlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW54ZXggJSAzID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmVxKDIpLmFwcGVuZChlbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBncm91cC5maW5kKFwiLm1lbnUtdGV4dD5hW2xlYWY9J2ZhbHNlJ11cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgZWxlLmFwcGVuZChncm91cCk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRPcGVuQWxsOiBmdW5jdGlvbiAoZ2V0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gX3RoaXMuZG9tLm1ldW5ncm91cExpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50RGF0YXMgPSBnZXREYXRhLnBhcmVudERhdGE7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5VXBMaXN0ID0gJChfdGhpcy5kb2N1bWVudFBhbmVsWzBdKS5maW5kKFwiI2tleVVwTGlzdFwiKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlc2V0T3Blbk1lbnVMaXN0KGxpc3QsIHBhcmVudERhdGFzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVnQ0ggPSBuZXcgUmVnRXhwKFwiW1xcXFx1NEUwMC1cXFxcdTlGRkZdK1wiLCBcImdcIik7XHJcbiAgICAgICAgICAgICAgICAkKF90aGlzLmRvY3VtZW50UGFuZWxbMF0pLmZpbmQoXCIjc2VsZWN0SW5wdXRcIikua2V5dXAoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsaXN0Lmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykubmV4dChcIi5zZWFyY2gtdGlwXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleVVwTGlzdC5odG1sKFwiXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvL+i+k+WFpeahhuS4reayoeacieWGheWuue+8jOWImemAgOWHulxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm5leHQoXCIuc2VhcmNoLXRpcFwiKS5zaG93KCkuZmluZChcInN0cm9uZ1wiKS50ZXh0KHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGdldERhdGEubWFwQWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gZ2V0RGF0YS5tYXBBbGxba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ciA9IHJlZ0NILnRlc3QodmFsKSA/IGl0ZW0ubmFtZS5pbmRleE9mKHZhbCkgOiBpdGVtLlBZX2NvZGUuaW5kZXhPZih2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyID49IDAgJiYgaXRlbS5sZWFmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUgKz0gYDxkaXYgY2xhc3M9XCJwci1tZXVuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZW51LXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPSR7aXRlbS5wYXRoIHx8IFwiamF2YXNjcmlwdDo7XCJ9ID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpdGVtLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtleVVwTGlzdC5odG1sKFwiXCIpLnNob3coKS5hcHBlbmQoZWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy/ojrflj5boj5zljZV0b3DlgLxcclxuICAgICAgICAgICAgbWV1blRvcE9iajogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gX3RoaXMuZG9tLm1ldW5ncm91cExpc3QuZmluZChcIi5saXN0LWl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBvYmogPSB7fTtcclxuICAgICAgICAgICAgICAgIGxpc3QuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gaXRlbS5pZDtcclxuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHBhcnNlSW50KGl0ZW0ub2Zmc2V0VG9wKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVtb3ZlclNob3dMaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBfdGhpcy5kb20ubWV1bmdyb3VwTGlzdCxcclxuICAgICAgICAgICAgICAgICAgICBfZ2V0RGF0YSA9IF90aGlzLm1ldW5QYW5lbFRoaXMuZ2V0RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnREYXRhcyA9IF9nZXREYXRhLnBhcmVudERhdGE7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kb20gJiYgdGhpcy5kb20ubWV1blNvcm9sbC5yZW1vdmVDbGFzcyhcInNob3dMaXN0XCIpO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNsaWNrQ2hpbGQ6IGZ1bmN0aW9uIChjYWxsYmFrYykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBvdGhpcztcclxuICAgICAgICAgICAgICAgIHZhciBib2R5TmF2ID0gX3RoaXMuZG9tLmJvZHlOYXYgLy91bFxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfZ2V0RGF0YSA9IF90aGlzLm1ldW5QYW5lbFRoaXMuZ2V0RGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+eCueWHu+S6jOe6p+iPnOWNleWIl+ihqFxyXG4gICAgICAgICAgICAgICAgX3RoaXMuZG9tLmJvZHlOYXYub24oXCJjbGlja1wiLCBcImFcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvL+mYu+atouS6i+S7tuWGkuazoVxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBvdGhpcyA9ICQodGhpcykgLy9hXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pZCA9IG90aGlzLmF0dHIoXCJtZW51LWlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmRvbS5tZXVuZ3JvdXBMaXN0LmZpbmQoXCJhW21lbnUtaWQ9J1wiICsgbWlkICsgXCInXVwiKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL+eCueWHu+e7meWxleW8gOaJgOS7peiPnOWNleWIl+ihqFxyXG4gICAgICAgICAgICAgICAgX3RoaXMuZG9tLm1ldW5ncm91cExpc3Qub24oXCJjbGlja1wiLCBcImFcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvL+mYu+atouS6i+S7tuWGkuazoXhcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtaWQgPSAkKHRoaXMpLmF0dHIoXCJtZW51LWlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBib2R5TmF2X3RoaXMgPSBib2R5TmF2LmZpbmQoXCJhW21lbnUtaWQ9J1wiICsgbWlkICsgXCInXVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wYXJlbnRzID0gJHRoaXMucGFyZW50cyhcIi5ib2R5LW5hdlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keU5hdl9wYXJlbnQgPSBib2R5TmF2X3RoaXMucGFyZW50KCksIC8vbGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keU5hdl9jaGlsZCA9IGJvZHlOYXZfdGhpcy5zaWJsaW5ncygnLm5hdi1jaGlsZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFrY0RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEN1cnJlbnQ6IF9nZXREYXRhLm1hcEFsbFttaWRdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGlkPW90aGlzLnBhcmVudHMoXCIubGlzdC1pdGVtXCIpLmF0dHIoXCJpZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVhZj0gX2dldERhdGEubWFwQWxsW21pZF0ubGVhZixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZiA9IG90aGlzLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WPs+i+ueeahOWvvOiIqlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhpcy5wYXJlbnRzKFwiLnByLW9wZW5cIikuZmluZChcIi5yaWdodC1zaWRlYmFyIC5zLWl0ZW1bbWVudS1pZD1cIitwaWQrXCJdIGFcIikudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGVDaGlsZE1ldW4ocGlkLCBtaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihsZWFmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9tLm1ldW5Tb3JvbGwuZmluZChcIi5uYXYtbGFzdFwiKS5hdHRyKFwiZGF0YS1zaG93XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVyU2hvd0xpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJha2MgJiYgY2FsbGJha2MoY2FsbGJha2NEYXRhLCBlKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgRXZlbnRIYW5sZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9tLm1ldW5Tb3JvbGwuaGFzQ2xhc3MoXCJzaG93TGlzdFwiKSAmJiBfdGhpcy5yZW1vdmVyU2hvd0xpc3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy/mjqfliLboj5zljZXlsZXlvIDmlLbnvKlcclxuICAgICAgICAgICAgICAgIF90aGlzLmRvbS5kb2N1bWVudFBhbmVsLmZpbmQoXCIjcGxnLWxvZ28tZm9sZFwiKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcImxheXVpLWljb24tc2hyaW5rLXJpZ2h0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJsYXl1aS1pY29uLXNocmluay1yaWdodFwiKS5hZGRDbGFzcyhcImxheXVpLWljb24tc3ByZWFkLWxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwicGxnLW9wZW4taG92ZXJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJsYXl1aS1pY29uLXNwcmVhZC1sZWZ0XCIpLmFkZENsYXNzKFwibGF5dWktaWNvbi1zaHJpbmstcmlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwicGxnLW9wZW4taG92ZXJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmRvbS5tZXVuU29yb2xsLmZpbmQoXCIubmF2LWxhc3RcIikuaG92ZXIoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlclNob3dMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuZG9tLmJvZHlOYXYuZmluZChcImxpXCIpLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1zaG93XCIsIFwic2hvdy1jaGlsZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLXNob3dcIiwgXCJcIilcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgX3RoaXMuZG9tLm1ldW5Tb3JvbGwub24oXCJjbGlja1wiLCBcIltkYXRhLXR5cGU9J2hvb3QtY2xpY2snXVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8v6Zi75q2i5LqL5Lu25YaS5rOhXHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBldmUgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKCQodGhpcykuYXR0cihcImNsYXNzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcm9kdWN0LWFsbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9tLm1ldW5Tb3JvbGwudG9nZ2xlQ2xhc3MoXCJzaG93TGlzdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHItb3BlblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoJChldmUpLnBhcmVudHMoXCIucHItbGVmdFwiKS5sZW5ndGg+MHx8ZXZlLm5vZGVOYW1lIT1cIkFcIikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGV2ZS5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PSBcImxheXVpLWxheWVyLXNldHdpblwiKXsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlclNob3dMaXN0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXVuVG9wID0gX3RoaXMubWV1blRvcE9iaigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNJdGVtID0gJChldmUpLnBhcmVudHMoXCIucy1pdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXNIcmVmID0gc0l0ZW0uYXR0cihcIm1lbnUtaWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9ICQoXCIucHItbWV1bmdyb3VwLWxpc3RcIikuZmluZChcIi5saXN0LWl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzSXRlbS5hZGRDbGFzcyhcImFjdGl2ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpOyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVswXS5pZCA9PSB0aGlzSHJlZiA/ICQodGhpcykuYWRkQ2xhc3MoXCJzZWxlY3RcIikgOiAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VsZWN0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG1ldW5Ub3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGtleSkgPT0gdGhpc0hyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5wci1sZWZ0XCIpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBtZXVuVG9wW2tleV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJuYXYtbGFzdFwiOiAgICAgIC8v54K55LiA57qn6I+c5Y2V5Yqg6L295LqM57qn6I+c5Y2VXHJcbiAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudHMgPSAkKGV2ZSkucGFyZW50cyhcIi5zLWl0ZW1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudWlkID0gcGFyZW50cy5hdHRyKFwibWVudS1pZFwiKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW1lbnVpZCkgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlYWY9Qm9vbGVhbihfdGhpcy5tZXVuUGFuZWxUaGlzLmdldERhdGEubWFwQWxsW21lbnVpZF0ubGVhZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9tLm1ldW5Tb3JvbGwuZmluZChcIi5uYXYtbGFzdFwiKS5hdHRyKFwiZGF0YS1zaG93XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZXJTaG93TGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQoZXZlKS5wYXJlbnRzKFwiI3NpZGViYXJcIikubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1bmdyb3VwTGlzdC5maW5kKFwiYVttZW51LWlkPSdcIisgbWVudWlkICsgXCInXVwiKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxlYWYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kb20ubWV1blNvcm9sbC5maW5kKFwiLm5hdi1sYXN0XCIpLmF0dHIoXCJkYXRhLXNob3dcIiwgXCJzaG93LWNoaWxkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFiQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwZGF0ZUNoaWxkTWV1bjogZnVuY3Rpb24gKHBpZCwgbWlkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpZCA9IHBpZCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJOYXYgPSAkKFwiW21lbnUtaWQ9XCIgKyBwaWQgKyBcIl1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyTmF2LmFkZENsYXNzKFwiYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgXHJcbiAgICAgICAgICAgICAgICB2YXIgX2dldERhdGEgPSBfdGhpcy5tZXVuUGFuZWxUaGlzLmdldERhdGE7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kb20uYm9keU5hdi5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAocGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX2dldERhdGEubWFwQWxsW3BpZF0ubGVhZiYmX2dldERhdGEubWFwQWxsW21pZF0ucGFyZW50TWVudUlkPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnREYXRhID0gX2dldERhdGEucGFyZW50RGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnREYXRhW3BpZF0gJiYgcGFyZW50RGF0YVtwaWRdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9saUNsYXNzPVwiaXRlbSBoLWxpbmtcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pZCkgeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubWVudUlkID09IG1pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xpQ2xhc3M9XCJpdGVtIGgtbGluayBhY3RpdmUtdGhpcyBpdGVtZWRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGkgPSAkKFwiPGxpPlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzXCI6b2xpQ2xhc3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2EgPSAkKFwiPGE+XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHJlZlwiOiBpdGVtLnBhdGggfHwgXCJqYXZhc2NyaXB0OjtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVudS1pZFwiOiBpdGVtLm1lbnVJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGVhZlwiOiBpdGVtLmxlYWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxldmVsXCI6IGl0ZW0ubGV2ZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGl0ZW0uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmVudE1lbnVJZFwiOiBpdGVtLnBhcmVudE1lbnVJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGV4dChpdGVtLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2xpLmFwcGVuZChvYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5sZWFmICYmIHBhcmVudERhdGFbaXRlbS5wYXJlbnRNZW51SWRdICYmIHBhcmVudERhdGFbaXRlbS5wYXJlbnRNZW51SWRdLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYXZjaGlsZCA9ICc8ZGwgY2xhc3M9XCJuYXYtY2hpbGRcIj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50RGF0YVtpdGVtLm1lbnVJZF0gJiYgcGFyZW50RGF0YVtpdGVtLm1lbnVJZF0uZm9yRWFjaChmdW5jdGlvbiAoY2l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZjaGlsZCArPSBgPGRkIGNsYXNzPSAkeyhtaWQgJiYgY2l0ZW0ubWVudUlkID09IG1pZCkgPyBcImFjdGl2ZS10aGlzXCIgOiBcIlwifSA+PGEgaHJlZj0ke2NpdGVtLnBhdGggfHwgXCJqYXZhc2NyaXB0OjtcIn0gbGVhZj0ke2NpdGVtLmxlYWZ9IFxyXG5tYWluLWlkPSR7aXRlbS5wYXJlbnRNZW51SWR9IHBhcmVudE1lbnVJZD0ke2NpdGVtLnBhcmVudE1lbnVJZH0gbWVudS1pZD0ke2NpdGVtLm1lbnVJZH0+JHtjaXRlbS5uYW1lfTwvYT48L2RkPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmNoaWxkICs9IFwiPC9kbD5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9hLmFwcGVuZChgPGkgY2xhc3M9XCJyaWdodC1tb3ZlciBsYXl1aS1pY29uIGxheXVpLWljb24tcmlnaHRcIj48L2k+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGkuYXBwZW5kKG5hdmNoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGkuZmluZChcImRkXCIpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKGl0ZW0pLmF0dHIoXCJjbGFzc1wiKSA9PSBcImFjdGl2ZS10aGlzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9saS5hZGRDbGFzcyhcImFjdGl2ZS10aGlzXCIpLmFkZENsYXNzKFwiaXRlbWVkc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvbGkuZmluZChcIi5uYXYtY2hpbGRcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9tLmJvZHlOYXYuYXBwZW5kKG9saSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbml0UGFuZWw6IGZ1bmN0aW9uIChtZXVuUGFuZWxUaGlzLCBvcGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubWV1blBhbmVsVGhpcyA9IG1ldW5QYW5lbFRoaXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2dldERhdGEgPSBfdGhpcy5tZXVuUGFuZWxUaGlzLmdldERhdGE7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzLm9wZXMgPSBvcGVzO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZG9jdW1lbnRQYW5lbCA9IF90aGlzLnRlbXBsYXRlKF90aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5kb2N1bWVudFBhbmVsKVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmRvbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRQYW5lbDogX3RoaXMuZG9jdW1lbnRQYW5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV1blNvcm9sbDogX3RoaXMuZG9jdW1lbnRQYW5lbC5maW5kKFwiI21ldW5Tb3JvbGxcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlOYXY6IF90aGlzLmRvY3VtZW50UGFuZWwuZmluZChcIi5ib2R5LW5hdlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV1bmdyb3VwTGlzdDogX3RoaXMuZG9jdW1lbnRQYW5lbC5maW5kKFwiLnByLW1ldW5ncm91cC1saXN0XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwckxlZnQ6IF90aGlzLmRvY3VtZW50UGFuZWwuZmluZChcIi5wci1sZWZ0XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGFibGk6ICQoXCIubGF5dWktdGFiLXRpdGxlIGxpXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkbmF2X2hvdmVyX2NoaWxkOiBfdGhpcy5kb2N1bWVudFBhbmVsLmZpbmQoXCIubmF2LWhvdmVyLWNoaWxkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRPcGVuQWxsKF9nZXREYXRhKTtcclxuICAgICAgICAgICAgICAgIC8v5LqL5Lu25rOo5YaMXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5FdmVudEhhbmxkZXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5kb2N1bWVudFBhbmVsXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgZ2V0RnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2xhc3NNYWluO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgX3RoaXMuZ2V0RnVuID0gZ2V0RnVuKCk7XHJcbiAgICAgICAgdmFyIGNvbmZpZz17XHJcbiAgICAgICAgICAgIHVybDpudWxsLFxyXG4gICAgICAgICAgICByb3V0ZTpmYWxzZSxcclxuICAgICAgICAgICAgbWVudUNsaWNrOm51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6I635Y+W5pWw5o2u5YWl5Y+jXHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICBfdGhpcy5vcHRpb25zID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBfdGhpcy5vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwgY29uZmlnLCBfdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgX3RoaXMuaW5pdChfdGhpcy5vcHRpb25zKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgX3RoaXMuZWxlID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBfdGhpcy5vcHRpb25zID0gYXJndW1lbnRzWzFdO1xyXG4gICAgICAgICAgICBfdGhpcy5vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwgY29uZmlnLCBfdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgX3RoaXMuaW5pdChfdGhpcy5vcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIF90aGlzLnJlbmRlclRvKF90aGlzLmVsZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBwbGdTaWRlYmFyLnByb3RvdHlwZS5jb25maWcgPSB7XHJcbiAgICAgICAgaXNUcmlnZ2VyOiBmYWxzZSxcclxuICAgICAgICB1cmw6IFwiXCIsXHJcbiAgICAgICAgbG9nbzogbnVsbCxcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHBsZ1NpZGViYXIucHJvdG90eXBlLnNldE1hcERhdGEgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgdmFyIGNsb3NlTG9hZD1sb2FkaW5nKCk7XHJcblxyXG4gICAgICAgIHZhciBkYXRhQWxsLCBtYXBBbGwgPSBudWxsLFxyXG4gICAgICAgICAgICBwYXJlbnREYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWFwZGF0YShkYXRhQWxsKSB7XHJcbiAgICAgICAgICAgLyogIGxheWVyLmxvYWQoMCwge1xyXG4gICAgICAgICAgICAgICAgc2hhZGU6IHRydWVcclxuICAgICAgICAgICAgfSk7ICovXHJcbiAgICAgICAgICAgIGxldCBtYXAgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGRhdGFBbGwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1hcFtpdGVtLnBhcmVudE1lbnVJZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXBbaXRlbS5wYXJlbnRNZW51SWRdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtYXBbaXRlbS5wYXJlbnRNZW51SWRdLnB1c2goaXRlbSlcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbWFwQWxsID0ge307XHJcbiAgICAvLyAgICB2YXIgdG9rZW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKTtcclxuICAgICAgICBQcm9sb2cuc3luY0FqYXgoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIC8qICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAocmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sICovXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBbGwgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUFsbC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLlBZX2NvZGUgPSBwaW55aW4ubWFrZVB5KGl0ZW0ubmFtZSlbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudERhdGEgPSBtYXBkYXRhKGRhdGFBbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQWxsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcEFsbFtpdGVtLm1lbnVJZF0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vICBjbG9zZUxvYWQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLm1zZyhcIuaVsOaNruWKoOi9veWksei0pSFcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBjbG9zZUxvYWQoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhQWxsOiBkYXRhQWxsLFxyXG4gICAgICAgICAgICBtYXBBbGw6IG1hcEFsbCxcclxuICAgICAgICAgICAgcGFyZW50RGF0YTogcGFyZW50RGF0YVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgXHJcblxyXG4gLyogICAgdmFyIGNsb3NlTG9hZD0gbG9hZGluZygpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICBjbG9zZUxvYWQoKVxyXG4gICAgICAvLyAgbGF5ZXIuY2xvc2UoY2xvc2VMb2FkKVxyXG4gICAgfSwyMDAwKSAqL1xyXG5cclxuICAgIHBsZ1NpZGViYXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIF9jbGFzcyA9IHRoaXMuZ2V0RnVuO1xyXG4gICAgICAgIGlmICh0eXBlb2YgX3RoaXMub3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBfdGhpcy5vcHRzID0gJC5leHRlbmQodHJ1ZSwgX3RoaXMuY29uZmlnLCBfdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKF90aGlzLm9wdHMudXJsICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldERhdGEgPSBfdGhpcy5zZXRNYXBEYXRhKF90aGlzLm9wdHMudXJsKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldEVsZW1lbnQgPSBfY2xhc3MuaW5pdFBhbmVsKF90aGlzLCBfdGhpcy5vcHRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLm9wdHMubWVudUNsaWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NsYXNzLmNsaWNrQ2hpbGQoX3RoaXMub3B0cy5tZW51Q2xpY2spXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfY2xhc3MuY2xpY2tDaGlsZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpc1xyXG5cclxuXHJcbiAgICB9O1xyXG4gICAgLy/nho/mn5PmqKHmnb/liLDoioLngrlcclxuICAgIHBsZ1NpZGViYXIucHJvdG90eXBlLnJlbmRlclRvID0gZnVuY3Rpb24gKGRvbUlkKSB7XHJcbiAgICAgXHJcbiAgICAgICAgdmFyIGRvY3VtZW50UGFuZWwgPSB0aGlzLmdldEZ1bi5kb2N1bWVudFBhbmVsO1xyXG4gICAgICAgICQoXCIjXCIgKyBkb21JZCkuYXBwZW5kKGRvY3VtZW50UGFuZWwpO1xyXG4gXHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5pc1RyaWdnZXIpIHtcclxuICAgICAgICAgICAgdmFyIG1lbnVpZCA9ICQoXCIjXCIgKyBkb21JZCkuZmluZChcIi5zaWRlYmFyIGxpOmZpcnN0LWNoaWxkXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpLmF0dHIoXCJtZW51LWlkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmdldEZ1bi51cGRhdGVDaGlsZE1ldW4obWVudWlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgd2luZG93LlBsZ1NpZGVBY2NvcmRpb24gPSBwbGdTaWRlYmFyO1xyXG5cclxuICAgICQuZm4uaW5pdFBsZ1NpZGVBY2NvcmRpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAvKiAgdmFyIGNsb3NlTG9hZD0gbG9hZGluZygpOyAqL1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IHBsZ1NpZGViYXIodGhpcywgb3B0aW9ucyk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG59KShqUXVlcnkpOyIsIjtcclxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG5cclxuICAgIHZhciBzdHJDaGluZXNlRmlyc3RQWSA9IFwiWURZUVNYTVdaU1NYSkJZTUdDQ1pRUFNTUUJZQ0RTQ0RRTERZTFlCU1NKR1laWkpKRktDQ0xaREhXRFdaSkxKUEZZWU5XSkpUTVlIWldaSEZMWlBQUUhHU0NZWVlOSlFZWFhHSkhIU0RTSk5LS1RNT01MQ1JYWVBTTlFTRUNDUVpHR0xMWUpMTVlaWlNFQ1lLWVlIUVdKU1NHR1lYWVpZSldXS0RKSFlDSE1ZWEpUTFhKWVFCWVhaTERXUkRKUldZU1JMRFpKUENCWkpKQlJDRlRMRUNaU1RaRlhYWkhUUlFIWUJETFlDWlNTWU1NUkZNWVFaUFdXSkpZRkNSV0ZERlpRUFlERFdZWEtZSkFXSkZGWFlQU0ZUWllISFlaWVNXQ0pZWFNDTENYWFdaWlhOQkdOTlhCWExaU1pTQlNHUFlTWVpESE1EWkJRQlpDV0RaWllZVFpIQlRTWVlCWkdOVE5YUVlXUVNLQlBISExYR1lCRk1KRUJKSEhHUVRKQ1lTWFNUS1pITFlDS0dMWVNNWlhZQUxNRUxEQ0NYR1pZUkpYU0RMVFlaQ1FLQ05OSldISlRaWkNRTEpTVFNUQk5YQlRZWENFUVhHS1dKWUZMWlFMWUhZWFNQU0ZYTE1QQllTWFhYWURKQ1pZTExMU0pYRkhKWFBKQlRGRllBQllYQkhaWkJKWVpMV0xDWkdHQlRTU01EVEpaWFBUSFlRVEdMSlNDUUZaS0paSlFOTFpXTFNMSERaQldKTkNKWllaU1FRWUNRWVJaQ0pKV1lCUlRXUFlGVFdFWENTS0RaQ1RCWkhZWlpZWUpYWkNGRlpaTUpZWFhTRFpaT1RUQlpMUVdGQ0tTWlNYRllSTE5ZSk1CRFRISlhTUVFDQ1NCWFlZVFNZRkJYRFpUR0JDTlNMQ1laWlBTQVpZWlpTQ0pDU0haUVlEWExCUEpMTE1RWFRZRFpYU1FKVFpQWExDR0xRVFpXSkJIQ1RTWUpTRlhZRUpKVExCR1hTWEpNWUpRUVBGWkFTWUpOVFlESlhLSkNESlNaQ0JBUlREQ0xZSlFNV05RTkNMTExLQllCWlpTWUhRUUxUV0xDQ1hUWExMWk5UWUxORVdZWllYQ1pYWEdSS1JNVENORE5KVFNZWVNTRFFER0hTREJKR0hSV1JRTFlCR0xYSExHVEdYQlFKRFpQWUpTSllKQ1RNUk5ZTUdSWkpDWkdKTVpNR1hNUFJZWEtKTllNU0dNWkpZTUtNRlhNTERUR0ZCSENKSEtZTFBGTURYTFFKSlNNVFFHWlNKTFFETERHSllDQUxDTVpDU0RKTExOWERKRkZGRkpDWkZNWkZGUEZLSEtHRFBTWEtUQUNKREhIWkREQ1JSQ0ZRWUpLUUNDV0pEWEhXSkxZTExaR0NGQ1FEU01MWlBCSkpQTFNCQ0pHR0RDS0tERVpTUUNDS0pHQ0dLREpUSkRMWllDWEtMUVNDR0pDTFRGUENRQ1pHV1BKRFFZWkpKQllKSFNKRFpXR0ZTSkdaS1FDQ1pMTFBTUEtKR1FKSFpaTEpQTEdKR0pKVEhKSllKWkNaTUxaTFlRQkdKV01MSktYWkRaTkpRU1laTUxKTExKS1lXWE1LSkxIU0tKR0JNQ0xZWU1LWEpRTEJNTExLTURYWEtXWVhZU0xNTFBTSlFRSlFYWVhGSlRKRFhNWFhMTENYUUJTWUpCR1dZTUJHR0JDWVhQSllHUEVQRkdESkdCSEJOU1FKWVpKS0pLSFhRRkdRWktGSFlHS0hES0xMU0RKUVhQUVlLWUJOUVNYUU5TWlNXSEJTWFdIWFdCWlpYRE1OU0pCU0JLQkJaS0xZTFhHV1hEUldZUVpNWVdTSlFMQ0pYWEpYS0pFUVhTQ1lFVExaSExZWVlTRFpQQVFZWkNNVExTSFRaQ0ZZWllYWUxKU0RDSlFBR1lTTENRTFlZWVNITVJRUUtMRFhaU0NTU1NZRFlDSllTRlNKQkZSU1NaUVNCWFhQWEpZU0RSQ0tHSkxHREtaSlpCREtUQ1NZUVBZSFNUQ0xESkRITVhNQ0dYWVpISkREVE1ITFRYWlhZTFlNT0hZSkNMVFlGQlFRWFBGQkRGSEhUS1NRSFpZWVdDTlhYQ1JXSE9XR1lKTEVHV0RRQ1dHRkpZQ1NOVE1ZVE9MQllHV1FXRVNKUFdOTUxSWURaU1pUWFlRUFpHQ1dYSE5HUFlYU0hNWVFKWFpURFBQQkZZSFpIVEpZRkRaV0tHS1pCTEROVFNYSFFFRUdaWllMWk1NWllKWkdYWlhLSEtTVFhOWFhXWUxZQVBTVEhYRFdIWllNUFhBR0tZRFhCSE5IWEtEUEpOTVlIWUxQTUdPQ1NMTlpIS1hYTFBaWkxCTUxTRkJISEdZR1lZR0dCSFNDWUFRVFlXTFhUWlFDRVpZRFFEUU1NSFRLTExTWkhMU0paV0ZZSFFTV1NDV0xRQVpZTllUTFNYVEhBWk5LWlpTWlpMQVhYWldXQ1RHUVFURERZWlRDQ0hZUVpGTFhQU0xaWUdQWlNaTkdMTkRRVEJETFhHVENUQUpES1lXTlNZWkxKSEhaWkNXTllZWllXTUhZQ0hIWVhISktaV1NYSFpZWExZU0tRWVNQU0xZWldNWVBQS0JZR0xLWkhUWVhBWFFTWVNIWEFTTUNIS0RTQ1JTV0pQV1hTR1pKTFdXU0NIU0pIU1FOSENTRUdOREFRVEJBQUxaWk1TU1REUUpDSktUU0NKQVhQTEdHWEhIR1hYWkNYUERNTUhMREdUWUJZU0pNWEhNUkNQWFhKWkNLWlhTSE1MUVhYVFRIWFdaRktIQ0NaRFlUQ0pZWFFITFhESFlQSlFYWUxTWVlEWk9aSk5ZWFFFWllTUVlBWVhXWVBER1hERFhTUFBZWk5ETFRXUkhYWURYWlpKSFRDWE1DWkxIUFlZWVlNSFpMTEhOWE1ZTExMTURDUFBYSE1YREtZQ1lSRExUWEpDSEhaWlhaTENDTFlMTlpTSFpKWlpMTk5STFdIWVFTTkpIWFlOVFRUS1lKUFlDSEhZRUdLQ1RUV0xHUVJMR0dUR1RZR1lIUFlIWUxRWVFHQ1dZUUtQWVlZVFRUVExIWUhMTFRZVFRTUExLWVpYR1pXR1BZRFNTWlpEUVhTS0NRTk1KSlpaQlhZUU1KUlRGRkJUS0haS0JYTEpKS0RYSlRMQldGWlBQVEtRVFpUR1BER05UUEpZRkFMUU1LR1hCRENMWkZIWkNMTExMQURQTVhESkhMQ0NMR1lIRFpGR1lEREdDWVlGR1lEWEtTU0VCREhZS0RLREtITkFYWFlCUEJZWUhYWlFHQUZGUVlKWERNTEpDU1FaTExQQ0hCU1hHSllORFlCWVFTUFpXSkxaS1NERFRBQ1RCWFpEWVpZUEpaUVNKTktLVEtOSkRKR1lZUEdUTEZZUUtBU0ROVENZSEJMV0RaSEJCWURXSlJZR0taWUhFWVlGSk1TRFRZRlpKSkhHQ1hQTFhITERXWFhKS1lUQ1lLU1NTTVRXQ1RUUVpMUEJTWkRaV1pYR1pBR1lLVFlXWExITFNQQkNMTE9RTU1aU1NMQ01CSkNTWlpLWURDWkpHUVFEU01DWVRaUVFMV1pRWlhTU0ZQVFRGUU1ERFpEU0hEVERXRkhURFlaSllRSlFLWVBCREpZWVhUTEpIRFJRWFhYSEFZREhSSkxLTFlUV0hMTFJMTFJDWFlMQldTUlNaWlNZTUtaWkhIS1lIWEtTTURTWURZQ0pQQlpCU1FMRkNYWFhOWEtYV1lXU0RaWVFPR0dRTU1ZSENEWlRURkpZWUJHU1RUVFlCWUtKREhLWVhCRUxIVFlQSlFORlhGRFlLWkhRS1pCWUpUWkJYSEZEWEtEQVNXVEFXQUpMRFlKU0ZIQkxETk5UTlFKVEpOQ0hYRkpTUkZXSFpGTURSWUpZSldaUERKS1pZSllNUENZWk5ZTlhGQllURllGV1lHREJOWlpaRE5ZVFhaRU1NUUJTUUVIWEZaTUJNRkxaWlNSWFlNSkdTWFdaSlNQUllESlNKR1hISkpHTEpKWU5aWkpYSEdYS1lNTFBZWVlDWFlUV1FaU1dIV0xZUkpMUFhTTFNYTUZTV1dLTENUTlhOWU5QU0pTWkhEWkVQVFhNWVlXWFlZU1lXTFhKUVpRWFpEQ0xFRUVMTUNQSlBDTFdCWFNRSEZXV1RGRkpUTlFKSEpRRFhIV0xCWVpORkpMQUxLWVlKTERYSEhZQ1NUWVlXTlJKWVhZV1RSTURSUUhXUUNNRkpEWVpNSE1ZWVhKV01ZWlFaWFRMTVJTUFdXQ0hBUUJYWUdaWVBYWVlSUkNMTVBZTUdLU0pTWllTUk1ZSlNOWFRQTE5CQVBQWVBZTFhZWVpLWU5MRFpZSlpDWk5OTE1aSEhBUlFNUEdXUVRaTVhYTUxMSEdEWlhZSFhLWVhZQ0pNRkZZWUhKRlNCU1NRTFhYTkRZQ0FOTk1UQ0pDWVBSUk5ZVFlRTllZTUJNU1hORExZTFlTTEpSTFhZU1hRTUxMWVpMWkpKSktZWlpDU0ZCWlhYTVNUQkpHTlhZWkhMWE5NQ1dTQ1laWUZaTFhCUk5OTllMQk5SVEdaUVlTQVRTV1JZSFlKWk1aREhaR1pEV1lCU1NDU0tYU1lIWVRYWEdDUUdYWlpTSFlYSlNDUkhNS0tCWENaSllKWU1LUUhaSkZOQkhNUUhZU05KTlpZQktOUU1DTEdRSFdMWk5aU1dYS0hMSkhZWUJRTEJGQ0RTWERMRFNQRlpQU0tKWVpXWlhaRERYSlNNTUVHSlNDU1NNR0NMWFhLWVlZTE5ZUFdXV0dZREtaSkdHR1pHR1NZQ0tOSldOSlBDWEJKSlRRVEpXRFNTUEpYWlhOWlhVTUVMUFhGU1hUTExYQ0xKWEpKTEpaWENUUFNXWExZREhMWVFSV0hTWUNTUVlZQllBWVdKSkpRRldRQ1FRQ0pRR1hBTERCWlpZSkdLR1hQTFRaWUZYSkxUUEFES1lRSFBNQVRMQ1BEQ0tCTVRYWUJIS0xFTlhETEVFR1FEWU1TQVdIWk1MSlRXWUdYTFlRWkxKRUVZWUJRUUZGTkxZWFJEU0NUR0pHWFlZTktMTFlRS0NDVExISkxRTUtLWkdDWVlHTExMSkRaR1lESFpXWFBZU0pCWktEWkdZWlpIWVdZRlFZVFlaU1pZRVpaTFlNSEpKSFRTTVFXWVpMS1lZV1pDU1JLUVlUTFREWFdDVFlKS0xXU1FaV0JEQ1FZTkNKU1JTWkpMS0NEQ0RUTFpaWkFDUVFaWkREWFlQTFhaQlFKWUxaTExMUUREWlFKWUpZSlpZWE5ZWVlOWUpYS1hEQVpXWVJETEpZWVlSSkxYTExEWVhKQ1lXWVdOUUNDTERETllZWU5ZQ0tDWkhYWENDTEdaUUpHS1dQUENRUUpZU0JaWlhZSlNRUFhKUFpCU0JEU0ZOU0ZQWlhIRFdaVERXUFBURkxaWkJaRE1ZWVBRSlJTRFpTUVpTUVhCREdDUFpTV0RXQ1NRWkdNREhaWE1XV0ZZQlBER1BIVE1KVEhaU01NQkdaTUJaSkNGWldGWkJCWk1RQ0ZNQkRNQ0pYTEdQTkpCQlhHWUhZWUpHUFRaR1pNUUJRVENHWVhKWExXWktZRFBEWU1HQ0ZUUEZYWVpUWlhEWlhUR0tNVFlCQkNMQkpBU0tZVFNTUVlZTVNaWEZKRVdMWExMU1pCUUpKSkFLTFlMWExZQ0NUU1hNQ1dGS0tLQlNYTExMTEpZWFRZTFRKWVlURFBKSE5ITk5LQllRTkZRWVlaQllZRVNTRVNTR0RZSEZIV1RDSkJTRFpaVEZETVhIQ05KWllNUVdTUllKRFpKUVBEUUJCU1RKR0dGQktKQlhUR1FITkdXSlhKR0RMTFRIWkhIWVlZWVlZU1hXVFlZWUNDQkRCUFlQWllDQ1pZSlBaWVdDQkRMRldaQ1dKRFhYSFlITEhXWlpYSlRDWkxDRFBYVUpDWlpaTFlYSkpUWFBIRlhXUFlXWFpQVERaWkJEWkNZSEpITUxYQlFYU0JZTFJEVEdKUlJDVFRUSFlUQ1pXTVhGWVRXV1pDV0pXWEpZV0NTS1lCWlNDQ1RaUU5IWE5XWFhLSEtGSFRTV09DQ0pZQkNNUFpaWUtCTk5aUEJaSEhaRExTWUREWVRZRkpQWFlOR0ZYQllRWENCSFhDUFNYVFlaRE1LWVNOWFNYTEhLTVpYTFlIREhLV0hYWFNTS1FZSEhDSllYR0xIWlhDU05IRUtEVEdaWFFZUEtESEVYVFlLQ05ZTVlZWVBLUVlZWUtYWkxUSEpRVEJZUUhYQk1ZSFNRQ0tXV1lMTEhDWVlMTk5FUVhRV01DRkJEQ0NNTEpHR1hEUUtUTFhLR05RQ0RHWkpXWUpKTFlISFFUVFROV0NITVhDWFdIV1NaSllESkNDREJRQ0RHRE5ZWFpUSENRUlhDQkhaVFFDQlhXR1FXWVlCWEhNQllNWVFUWUVYTVFLWUFRWVJHWVpTTEZZS0tRSFlTU1FZU0hKR0pDTlhLWllDWFNCWFlYSFlZTFNUWUNYUVRIWVNNR1NDUE1NR0NDQ0NDTVRaVEFTTUdRWkpIS0xPU1FZTFNXVE1YU1lRS0RaTEpRUVlQTFNZQ1pUQ1FRUEJCUUpaQ0xQS0hRWllZWFhEVEREVFNKQ1hGRkxMQ0hRWE1KTFdDSkNYVFNQWUNYTkRUSlNISldYRFFRSlNLWFlBTVlMU0pITUxBTFlLWENZWURNTk1EUU1YTUNaTk5DWUJaS0tZRkxNQ0hDTUxIWFJDSkpIU1lMTk1USlpHWkdZV0pYU1JYQ1dKR0pRSFFaRFFKRENKSlpLSktHRFpRR0pKWUpZTFhaWFhDRFFISEhFWVRNSExGU0JESlNZWVNIRllTVENaUUxQQkRSRlJaVFpZS1lXSFNaWVFLV0RRWlJLTVNZTkJDUlhRQkpZRkFaUFpaRURaQ0pZV0JDSldIWUpCUVNaWVdSWVNaUFRES1pQRlBCTlpUS0xRWUhCQlpQTlBQVFlaWllCUU5ZRENQSk1NQ1lDUU1DWUZaWkRDTU5MRlBCUExOR1FKVEJUVE5KWlBaQkJaTkpLTEpRWUxOQlpRSEtTSlpOR0dRU1paS1lYU0hQWlNOQkNHWktERFpRQU5aSEpLRFJUTFpMU1dKTEpaTFlXVEpOREpaSkhYWUFZTkNCR1RaQ1NTUU1OSlBKWVRZU1dYWkZLV0pRVEtIVFpQTEJIU05KWlNZWkJXWlpaWkxTWUxTQkpIRFdXUVBTTE1NRkJKRFdBUVlaVENKVEJOTldaWFFYQ0RTTFFHRFNEUERaSEpUUVFQU1dMWVlKWkxHWVhZWkxDVENCSlRLVFlDWkpUUUtCU0pMR01HWkRNQ1NHUFlOSlpZUVlZS05YUlBXU1pYTVROQ1NaWllYWUJZSFlaQVhZV1FDSlRMTENLSkpUSkhHRFhEWFlRWVpaQllXRExXUUNHTFpHSkdRUlFaQ1pTU0JDUlBDU0tZRFpOWEpTUUdYU1NKTVlETlNUWlRQQkRMVEtaV1hRV1FUWkVYTlFDWkdXRVpLU1NCWUJSVFNTU0xDQ0dCUFNaUVNaTENDR0xMTFpYSFpRVEhDWk1RR1laUVpOTUNPQ1NaSk1NWlNRUEpZR1FMSllKUFBMRFhSR1pZWENDU1hIU0hHVFpOTFpXWktKQ1hUQ0ZDSlhMQk1RQkNaWldQUUROSFhMSkNUSFlaTEdZTE5MU1paUENYRFNDUVFISlFLU1haUEJBSllFTVNNSlRaRFhMQ0pZUllZTldKQk5HWlpUTUpYTFRCU0xZUlpQWUxTU0NOWFBITExIWUxMUVFaUUxYWU1SU1lDWFpMTU1DWkxUWlNEV1RKSkxMTlpHR1FYUEZTS1lHWUdIQkZaUERLTVdHSENYTVNHRFhKTUNKWkRZQ0FCWEpETE5CQ0RRWUdTS1lEUVRYREpKWVhNU1pRQVpEWkZTTFFYWUpTSlpZTEJUWFhXWFFRWkJKWlVGQkJMWUxXRFNMSkhYSllaSldUREpDWkZRWlFaWkRaU1haWlFMWkNEWkZKSFlTUFlNUFFaTUxQUExGRlhKSk5aWllMU0pFWVFaRlBGWktTWVdKSkpIUkRKWlpYVFhYR0xHSFlEWENTS1lTV01NWkNXWUJBWkJKS1NIRkhKQ1hNSEZRSFlYWFlaRlRTSllaRlhZWFBaTENITVpNQlhIWlpTWFlGWU1OQ1dEQUJBWkxYS1RDU0hIWEtYSkpaSlNUSFlHWFNYWVlISEhKV1hLWlhTU0JaWldISEhDV1RaWlpQSlhTTlhRUUpHWllaWVdMTENXWFpGWFhZWFlIWE1LWVlTV1NRTU5MTkFZQ1lTUE1KS0hXQ1FIWUxBSkpNWlhITU1DTlpIQkhYQ0xYVEpQTFRYWUpIRFlZTFRUWEZTWkhZWFhTSkJKWUFZUlNNWFlQTENLRFVZSExYUkxOTExTVFlaWVlRWUdZSEhTQ0NTTVpDVFpRWEtZUUZQWVlSUEZGTEtRVU5UU1pMTFpNV1dUQ1FRWVpXVExMTUxNUFdNQlpTU1RaUkJQRERUTFFKSkJYWkNTUlpRUVlHV0NTWEZXWkxYQ0NSU1pEWk1DWUdHRFpRU0dUSlNXTEpNWU1NWllIRkJKREdZWENDUFNIWE5aQ1NCU0pZSkdKTVBQV0FGRllGTlhIWVpYWllMUkVNWkdaQ1laU1NaRExMSkNTUUZOWFpLUFRYWkdYSkpHRk1ZWVlTTkJUWUxCTkxIUEZaRENZRkJNR1FSUlNTU1pYWVNHVFpSTllEWlpDREdQSkFGSkZaS05aQkxDWlNaUFNHQ1lDSlNaTE1MUlNaQlpaTERMU0xMWVNYU1FaUUxZWFpMU0tLQlJYQlJCWkNZQ1haWlpFRVlGR0tMWkxZWUhHWlNHWkxGSkhHVEdXS1JBQUpZWktaUVRTU0hKSlhEQ1laVVlKTFpZUlpEUVFIR0paWFNTWkJZS0pQQkZSVEpYTExGUVdKSFlMUVRZTUJMUFpEWFRaWUdCREhaWlJCR1hIV05KVEpYTEtTQ0ZTTVdMU0RRWVNKVFhLWlNDRldKTEJYRlRaTExKWkxMUUJMU1FNUVFDR0NaRlBCUEhaQ1pKTFBZWUdHRFRHV0RDRkNaUVlZWVFZU1NDTFhaU0tMWlpaR0ZGQ1FOV0dMSFFZWkpKQ1pMUVpaWUpQSlpaQlBEQ0NNSEpHWERRREdETFpRTUZHUFNZVFNEWUZXV0RKWkpZU1hZWUNaQ1lIWldQQllLWFJZTFlCSEtKS1NGWFRaSk1NQ0tITExUTllZTVNZWFlaUFlKUVlDU1lDV01USkpLUVlSSExMUVhQU0dUTFlZQ0xKU0NQWEpZWkZOTUxSR0pKVFlaQlhZWk1TSllKSEhGWlFNU1lYUlNaQ1dUTFJUUVpTU1RLWEdRS0dTUFRHQ1pOSlNKQ1FDWEhNWEdHWlRRWURKS1pETEJaU1hKTEhZUUdHR1RIUVNaUFlISkhIR1lZR0tHR0NXSlpaWUxDWkxYUVNGVEdaU0xMTE1MSlNLQ1RCTExaWlNaTU1OWVRQWlNYUUhKQ0pZUVhZWlhaUVpDUFNIS1paWVNYQ0RGR01XUVJMTFFYUkZaVExZU1RDVE1KQ1hKSlhISk5YVE5SWlRaRlFZSFFHTExHQ1hTWlNKREpMSkNZRFNKVExOWVhIU1pYQ0dKWllRUFlMRkhESlNCUENDWkhKSkpRWkpRRFlCU1NMTENNWVRUTVFUQkhKUU5OWUdLWVJRWVFNWkdDSktQRENHTVlaSFFMTFNMTENMTUhPTFpHRFlZRlpTTEpDUVpMWUxaUUpFU0hOWUxMSlhHSlhMWVNZWVlYTkJaTEpTU1pDUVFDSllMTFpMVEpZTExaTExCTllMR1FDSFhZWVhPWENYUUtZSlhYWFlLTFhTWFhZUVhDWUtRWFFDU0dZWFhZUVhZR1lUUU9IWEhYUFlYWFhVTENZRVlDSFpaQ0JXUUJCV0pRWlNDU1pTU0xaWUxLREVTSlpXTVlNQ1lUU0RTWFhTQ0pQUVFTUVlMWVlaWUNNREpEWllXQ0JUSlNZREpLQ1lEREpMQkRKSlNPRFpZU1lYUVFZWERISEdRUVlRSERZWFdHTU1NQUpEWUJCQlBQQkNNVVVQTEpaU01UWEVSWEpNSFFOVVRQSkRDQlNTTVNTU1RLSlRTU01NVFJDUExaU1pNTFFEU0RNSk1RUE5RRFhDRllOQkZTRFFYWVhIWUFZS1FZRERMUVlZWVNTWkJZRFNMTlRGUVRaUVBaTUNIREhDWkNXRkRYVE1ZUVNQSFFZWVhTUkdKQ1dUSlRaWlFNR1dKSlRKSFRRSkJCSFdaUFhYSFlRRlhYUVlXWVlIWVNDRFlESEhRTU5NVE1XQ1BCU1pQUFpaR0xNWkZPTExDRldITU1TSlpUVERIWlpZRkZZVFpaR1pZU0tZSlhRWUpaUUJITUJaWkxZR0hHRk1TSFBaRlpTTkNMUEJRU05KWFpTTFhYRlBNVFlKWUdCWExMRExYUFpKWVpKWUhIWkNZV0hKWUxTSkVYRlNaWllXWEtaSkxVWURUTUxZTVFKUFdYWUhYU0tUUUpFWlJQWFhaSEhNSFdRUFdRTFlKSlFKSlpTWkNQSEpMQ0hITlhKTFFXWkpIQk1aWVhCREhIWVBaTEhMSExHRldMQ0hZWVRMSEpYQ0pNU0NQWFNUS1BOSFFYU1JUWVhYVEVTWUpDVExTU0xTVERMTExXV1lIREhSSlpTRkdYVFNZQ1pZTllIVERIV0pTTEhUWkRRREpaWFhRSEdZTFRaUEhDU1FGQ0xOSlRDTFpQRlNUUERZTllMR01KTExZQ1FIWVNTSENIWUxIUVlRVE1aWVBCWVdSRlFZS1FTWVNMWkRRSk1QWFlZU1NSSFpKTllXVFFERlpCV1dUV1dSWENXSEdZSFhNS01ZWVlRTVNNWkhOR0NFUE1MUVFNVENXQ1RNTVBYSlBKSkhGWFlZWlNYWkhUWUJNU1RTWUpUVFFRUVlZTEhZTlBZUVpMQ1laSFpXU01ZTEtGSlhMV0dYWVBKWVRZU1lYWU1aQ0tUVFdMS1NNWlNZTE1QV0xaV1hXUVpTU0FRU1lYWVJIU1NOVFNSQVBYQ1BXQ01HRFhIWFpEWllGSkhHWlRUU0JKSEdZWlNaWVNNWUNMTExYQlRZWEhCQlpKS1NTRE1BTFhIWUNGWUdNUVlQSllDUVhKTExMSkdTTFpHUUxZQ0pDQ1pPVFlYTVRNVFRMTFdUR1BYWU1aTUtMUFNaWlpYSEtRWVNYQ1RZSlpZSFhTSFlYWktYTFpXUFNRUFlISldQSlBXWFFRWUxYU0RITVJTTFpaWVpXVFRDWVhZU1paU0hCU0NDU1RQTFdTU0NKQ0hOTENHQ0hTU1BIWUxIRkhIWEpTWFlMTE5ZTFNaREhaWFlMU1hMV1pZS0NMRFlBWFpDTUREWVNQSlRRSlpMTldRUFNTU1dDVFNUU1pMQkxOWFNNTllZTUpRQlFIUlpXVFlZRENIUUxYS1BaV0JHUVlCS0ZDTVpXUFpMTFlZTFNaWURXSFhQU0JDTUxKQlNDR0JIWExRSFlSTEpYWVNXWFdYWlNMREZITFNMWU5KTFpZRkxZSllDRFJKTEZTWVpGU0xMQ1FZUUZHSllIWVhaTFlMTVNUREpDWUhCWkxMTldMWFhZR1lZSFNNR0RIWFhISExaWkpaWENaWlpDWVFaRk5HV1BZTENQS1BZWVBNQ0xRS0RHWFpHR1dRQkRYWlpLWkZCWFhMWlhKVFBKUFRUQllUU1paRFdTTENIWkhTTFRZWEhRTEhZWFhYWVlaWVNXVFhaS0hMWFpYWlBZSEdDSEtDRlNZSFVUSlJMWEZKWFBUWlRXSFBMWVhGQ1JIWFNIWEtZWFhZSFpRRFhRV1VMSFlITUpUQkZMS0hUWENXSEpGV0pDRlBRUllRWENZWVlRWUdSUFlXU0dTVU5HV0NIS1pEWFlGTFhYSEpKQllaV1RTWFhOQ1lKSllNU1daSlFSTUhYWldGUVNZTFpKWkdCSFlOU0xCR1RUQ1NZQllYWFdYWUhYWVlYTlNRWVhNUVlXUkdZUUxYQkJaTEpTWUxQU1lUSlpZSFlaQVdMUk9SSk1LU0NaSlhYWFlYQ0hEWVhSWVhYSkRUU1FGWExZTFRTRkZZWExNVFlKTUpVWVlZWExUWkNTWFFaUUhaWExZWVhaSEROQlJYWFhKQ1RZSExCUkxNQlJMTEFYS1lMTExKTFlYWExZQ1JZTENKVEdKQ01UTFpMTENZWlpQWlBDWUFXSEpKRllCRFlZWlNNUENLWkRRWVFQQlBDSlBEQ1laTURQQkNZWURZQ05OUExNVE1MUk1GTU1HV1laQlNKR1lHU01aUVFRWlRYTUtRV0dYTExQSkdaQlFDREpKSkZQS0pLQ1hCTEpNU1dNRFRRSlhMRExQUEJYQ1dSQ1FGQkZRSkNaQUhaR01ZS1BIWVlIWllLTkRLWk1CUEpZWFBYWUhMRlBOWVlHWEpEQktYTlhISk1aSlhTVFJTVExEWFNLWllTWUJaWEpMWFlTTEJaWVNMSFhKUEZYUFFOQllMTEpRS1lHWk1DWVpaWU1DQ1NMQ0xIWkZXRldZWFpNV1NYVFlOWEpIUFlZTUNZU1BNSFlTTVlEWVNIUVlaQ0hNSkpNWkNBQUdDRkpCQkhQTFlaWUxYWFNESkdYREhLWFhUWFhOQkhSTUxZSlNMVFhNUkhOTFhRSlhZWkxMWVNXUUdETEJKSERDR0pZUVlDTUhXRk1KWUJNQllKWUpXWU1EUFdIWFFMRFlHUERGWFhCQ0dKU1BDS1JTU1laSk1TTEJaWkpGTEpKSkxHWFpHWVhZWExTWlFZWEJFWFlYSEdDWEJQTERZSFdFVFRXV0NKTUJUWENIWFlRWExMWEZMWVhMTEpMU1NGV0RQWlNNWUpDTE1XWVRDWlBDSFFFS0NRQldMQ1FZRFBMUVBQUVpRRkpRREpIWU1NQ1hUWERSTUpXUkhYQ0paWUxRWERZWU5IWVlIUlNMU1JTWVdXWkpZTVRMVExMR1RRQ0paWUFCVENLWkNKWUNDUUxKWlFYQUxNWllIWVdMV0RYWlhRRExMUVNIR1BKRkpMSkhKQUJDUVpESkdUS0hTU1RDWUpMUFNXWkxYWlhSV0dMRExaUkxaWFRHU0xMTExaTFlYWFdHRFpZR0JEUEhaUEJSTFdTWFFCUEZEV09GTVdITFlQQ0JKQ0NMRE1CWlBCWlpMQ1lRWExET01aQkxaV1BEV1lZR0RTVFRIQ1NRU0NDUlNTU1lTTEZZQkZOVFlKU1pERk5EUERIRFpaTUJCTFNMQ01ZRkZHVEpKUVdGVE1UUEpXRk5MQlpDTU1KVEdCRFpMUUxQWUZIWVlNSllMU0RDSERaSldKQ0NUTEpDTERUTEpKQ1BERFNRRFNTWllCTkRCSkxHR0paWFNYTkxZQ1lCSlhRWUNCWUxaQ0ZaUFBHS0NYWkRaRlpUSkpGSlNKWFpCTlpZSlFUVFlKWUhUWUNaSFlNREpYVFRNUFhTUExaQ0RXU0xTSFhZUFpHVEZNTENKVFlDQlBNR0RLV1lDWVpDRFNaWllIRkxZQ1RZR1dIS0pZWUxTSkNYR1lXSkNCTExDU05EREJUWkJTQ0xZWkNaWlNTUURMTE1RWVlIRlNMUUxMWEZUWUhBQlhHV05ZV1lZUExMU0RMRExMQkpDWVhKWk1MSExKRFhZWVFZVERMTExCVUdCRkRGQkJRSlpaTURQSkhHQ0xHTUpKUEdBRUhIQldDUVhBWEhISFpDSFhZUEhKQVhITFBISlBHUFpKUUNRWkdKSlpaVVpETVFZWUJaWlBIWUhZQldIQVpZSkhZS0ZHRFBGUVNETFpNTEpYS1hHQUxYWkRBR0xNREdYTVdaUVlYWERYWFBGRE1NU1NZTVBGTURNTUtYS1NZWllTSERaS1hTWVNNTVpaWk1TWUROWlpDWlhGUExTVE1aRE5NWENLSk1aVFlZTVpNWlpNU1hISERDWkpFTVhYS0xKU1RMV0xTUUxZSlpMTFpKU1NEUFBNSE5MWkpDWllITVhYSEdaQ0pNREhYVEtHUk1YRldNQ0dNV0tEVEtTWFFNTU1GWlpZREtNU0NMQ01QQ0dNSFNQWFFQWkRTU0xDWEtZWFRXTFdKWUFIWkpHWlFNQ1NOWFlZTU1QTUxLSlhNSExNTFFNWENUS1pNSlFZU1pKU1lTWkhTWUpaSkNEQUpaWUJTRFFKWkdXWlFRWEZLRE1TREpMRldFSEtaUUtKUEVZUFpZU1pDRFdZSkZGTVpaWUxUVERaWkVGTVpMQk5QUExQTFBFUFNaQUxMVFlMS0NLUVpLR0VOUUxXQUdZWFlEUFhMSFNYUVFXUUNRWFFDTEhZWFhNTFlDQ1dMWU1RWVNLR0NITENKTlNaS1BZWktDUVpRTEpQRE1EWkhMQVNYTEJZRFdRTFdETkJRQ1JZRERaVEpZQktCV1NaRFhEVE5QSkRUQ1RRREZYUVFNR05YRUNMVFRCS1BXU0xDVFlRTFBXWVpaS0xQWUdaQ1FRUExMS0NDWUxQUU1aQ1pRQ0xKU0xRWkRKWExEREhQWlFETEpKWFpRRFhZWlFLWkxKQ1lRRFlKUFBZUFFZS0pZUk1QQ0JZTUNYS0xMWkxMRlFQWUxMTE1CU0dMQ1lTU0xSU1lTUVRNWFlYWlFaRkRaVVlTWVpURkZNWlpTTVpRSFpTU0NDTUxZWFdUUFpHWFpKR1pHU0pTR0tEREhUUUdHWkxMQkpEWkxDQkNIWVhZWkhaRllXWFlaWU1TREJaWllKR1RTTVRGWFFZWFFTVERHU0xOWERMUllaWkxSWVlMWFFIVFhTUlRaTkdaWEJOUVFaRk1ZS01aSkJaWU1LQlBOTFlaUEJMTUNOUVlaWlpTSlpISkNUWktIWVpaSlJEWVpITlBYR0xGWlRMS0dKVENUU1NZTExHWlJaQkJRWlpLTFBLTENaWVNTVVlYQkpGUE5KWlpYQ0RXWFpZSlhaWkRKSktHR1JTUkpLTVNNWkpMU0pZV1FTS1lIUUpTWFBKWlpaTFNOU0hSTllQWlRXQ0hLTFBTUlpMWlhZSlFYUUtZU0pZQ1pUTFFaWUJCWUJXWlBRRFdXWVpDWVRKQ0pYQ0tDV0RLS1pYU0dLRFpYV1dZWUpRWVlUQ1lURExMWFdLQ1pLS0xDQ0xaQ1FRRFpMUUxDU0ZRQ0hRSFNGU01RWlpMTkJKSlpCU0pIVFNaRFlTSlFKUERMWkNEQ1dKS0paWkxQWUNHTVpXREpKQlNKUVpTWVpZSEhYSlBCSllEU1NYRFpOQ0dMUU1CVFNGU0JQRFpETFpORkdGSkdGU01QWEpRTE1CTEdRQ1lZWEJRS0RKSlFZUkZLWlRKREhDWktMQlNEWkNGSlRQTExKR1hIWVhaQ1NTWlpYU1RKWUdLR0NLR1lPUVhKUExaUEJQR1RHWUpaR0haUVpaTEJKTFNRRlpHS1FRSlpHWUNaQlpRVExEWFJKWEJTWFhQWlhIWVpZQ0xXRFhKSkhYTUZEWlBGWkhRSFFNUUdLU0xZSFRZQ0dGUlpHTlFYQ0xQRExCWkNTQ1pRTExKQkxIQlpDWVBaWlBQRFlNWlpTR1lIQ0tDUFpKR1NMSkxOU0NEU0xETFhCTVNUTERERkpNS0RKREhaTFpYTFNaUVBRUEdKTExZQkRTWkdRTEJaTFNMS1lZSFpUVE5USllRVFpaUFNaUVpUTExKVFlZTExRTExRWVpRTEJEWkxTTFlZWllNREZTWlNOSExYWk5DWlFaUEJXU0tSRkJTWVpNVEhCTEdKUE1DWlpMU1RMWFNIVENTWVpMWkJMRkVRSExYRkxDSkxZTEpRQ0JaTFpKSEhTU1RCUk1IWFpISlpDTFhGTkJHWEdUUUpDWlRNU0ZaS0pNU1NOWExKS0JIU0pYTlROTFpETlRMTVNKWEdaSllKQ1pYWUpZSldSV1dRTlpUTkZKU1pQWlNIWkpGWVJESlNGU1pKWkJKRlpRWlpIWkxYRllTQlpRTFpTR1lGVFpEQ1NaWFpKQlFNU1pLSlJIWUpaQ0tNSktIQ0hHVFhLWFFHTFhQWEZYVFJUWUxYSlhIRFRTSlhISlpKWFpXWkxDUVNCVFhXWEdYVFhYSFhGVFNES0ZKSFpZSkZKWFJaU0RMTExUUVNRUVpRV1pYU1lRVFdHV0JaQ0daTExZWkJDTE1RUVRaSFpYWlhMSkZSTVlaRkxYWVNRWFhKS1hSTVFEWkRNTVlZQlNRQkhHWk1XRldYR01YTFpQWVlUR1pZQ0NEWFlaWFlXR1NZSllaTkJIUFpKU1FTWVhTWFJURllaR1JIWlRYU1paVEhDQkZDTFNZWFpMWlFNWkxNUExNWFpKWFNGTEJZWk1ZUUhYSlNYUlhTUVpaWlNTTFlGUkNaSlJDUlhISFpYUVlEWUhYU0pKSFpDWFpCVFlOU1lTWEpCUUxQWFpRUFlNTFhaS1lYTFhDSkxDWVNYWFpaTFhETExMSkpZSFpYR1lKV0tKUldZSENQU0dOUlpMRlpXRlpaTlNYR1hGTFpTWFpaWkJGQ1NZSkRCUkpLUkRISEdYSkxKSlRHWEpYWFNUSlRKWExZWFFGQ1NHU1dNU0JDVExRWlpXTFpaS1hKTUxUTUpZSFNEREJYR1pIRExCTVlKRlJaRlNHQ0xZSkJQTUxZU01TWExTWkpRUUhKWkZYR0ZRRlFCUFhaR1lZUVhHWlRDUVdZTFRMR1dTR1dIUkxGU0ZHWkpNR01HQkdUSkZTWVpaR1pZWkFGTFNTUE1MUEZMQ1dCSlpDTEpKTVpMUEpKTFlNUURNWVlZRkJHWUdZWk1MWVpEWFFZWFJRUVFIU1lZWVFYWUxKVFlYRlNGU0xMR05RQ1lIWUNXRkhDQ0NGWFBZTFlQTExaWVhYWFhYS1FISFhTSEpaQ0ZaU0NaSlhDUFpXSEhISEhBUFlMUUFMUFFBRllIWERZTFVLTVpRR0dHRERFU1JOTlpMVFpHQ0hZUFBZU1FKSkhDTExKVE9MTkpQWkxKTEhZTUhFWURZRFNRWUNEREhHWlVORFpDTFpZWkxMWk5UTllaR1NMSFNMUEpKQkRHV1hQQ0RVVEpDS0xLQ0xXS0xMQ0FTU1RLWlpETlFOVFRMWVlaU1NZU1NaWlJZTEpRS0NRREhIQ1JYUlpZREdSR0NXQ0daUUZGRlBQSkZaWU5BS1JHWVdZUVBRWFhGS0pUU1paWFNXWkRERkJCWFRCR1RaS1pOUFpaUFpYWlBKU1pCTVFIS0NZWFlMREtMSk5ZUEtZR0hHRFpKWFhFQUhQTlpLWlRaQ01YQ1hNTUpYTktTWlFOTU5MV0JXV1hKS1lIQ1BTVE1DU1FUWkpZWFRQQ1RQRFROTlBHTExMWlNKTFNQQkxQTFFIRFROSk5MWVlSU1pGRkpGUVdEUEhaRFdNUlpDQ0xPREFYTlNTTllaUkVTVFlKV0pZSkRCQ0ZYTk1XVFRCWUxXU1RTWkdZQkxKUFhHTEJPQ0xIUENCSkxUTVhaTEpZTFpYQ0xUUE5DTENLWFRQWkpTV0NZWFNGWVNaREtOVExCWUpDWUpMTFNUR1FDQlhSWVpYQlhLTFlMSFpMUVpMTlpDWFdKWkxKWkpOQ0pIWE1OWlpHSlpaWFRaSlhZQ1lZQ1hYSllZWEpKWFNTU0pTVFNTVFRQUEdRVENTWFdaRENTWUZQVEZCRkhGQkJMWkpDTFpaREJYR0NYTFFQWEtGWkZMU1lMVFVXQk1RSkhTWkJNRERCQ1lTQ0NMRFhZQ0REUUxZSkpXTVFMTENTR0xKSlNZRlBZWUNDWUxUSkFOVEpKUFdZQ01NR1FZWVNYRFhRTVpIU1pYUEZUV1daUVNXUVJGS0pMWkpRUVlGQlJYSkhIRldKSlpZUUFaTVlGUkhDWVlCWVFXTFBFWENDWlNUWVJMVFRETVFMWUtNQkJHTVlZSlBSS1pOUEJTWFlYQkhZWkRKRE5HSFBNRlNHTVdGWk1GUU1NQkNNWlpDSkpMQ05VWFlRTE1MUllHUVpDWVhaTFdKR0NKQ0dHTUNKTkZZWlpKSFlDUFJSQ01UWlFaWEhGUUdUSlhDQ0pFQVFDUkpZSFBMUUxTWkRKUkJDUUhRRFlSSFlMWVhKU1lNSFpZRFdMREZSWUhCUFlEVFNTQ05XQlhHTFBaTUxaWlRRU1NDUEpNWFhZQ1NKWVRZQ0dIWUNKV1lSWFhMRkVNV0pOTUtMTFNXVFhIWVlZTkNNTUNXSkRRREpaR0xMSldKUktIUFpHR0ZMQ0NTQ1pNQ0JMVEJIQlFKWFFEU1BESlpaR0tHTEZRWVdCWllaSkxUU1RESFFIQ1RDQkNIRkxRTVBXRFNIWVlUUVdDTlpaSlRMQllNQlBEWVlZWFNRS1hXWVlGTFhYTkNXQ1hZUE1BRUxZS0tKTVpaWkJSWFlZUUpGTEpQRkhISFlUWlpYU0dRUU1IU1BHRFpRV0JXUEpIWkpEWVNDUVdaS1RYWFNRTFpZWU1ZU0RaR1JYQ0tLVUpMV1BZU1lTQ1NZWkxSTUxRU1lMSlhCQ1hUTFdEUVpQQ1lDWUtQUFBOU1hGWVpKSlJDRU1IU1pNU1hMWEdMUldHQ1NUTFJTWEJaR0JaR1pUQ1BMVUpMU0xZTFlNVFhNVFpQQUxaWFBYSlRKV1RDWVlaTEJMWEJaTFFNWUxYUEdIRFNMU1NETVhNQkRaWlNYV0hBTUxDWkNQSk1DTkhKWVNOU1lHQ0hTS1FNWlpRRExMS0FCTFdKWFNGTU9DRFhKUlJMWVFaS0pNWUJZUUxZSEVURkpaRlJGS1NSWVhGSlRXRFNYWFNZU1FKWVNMWVhXSkhTTkxYWVlYSEJIQVdISEpaWFdNWUxKQ1NTTEtZRFpUWEJaU1lGRFhHWFpKS0hTWFhZQlNTWERQWU5aV1JQVFFaQ1pFTllHQ1hRRkpZS0pCWk1MSkNNUVFYVU9YU0xZWFhMWUxMSkRaQlRZTUhQRlNUVFFRV0xIT0tZQkxaWkFMWlhRTEhaV1JSUUhMU1RNWVBZWEpKWE1RU0pGTkJYWVhZSlhYWVFZTFRIWUxRWUZNTEtMSlRNTExIU1pXS1pITEpNTEhMSktMSlNUTFFYWUxNQkhITE5MWlhRSkhYQ0ZYWExIWUhKSkdCWVpaS0JYU0NRREpRRFNVSlpZWUhaSEhNR1NYQ1NZTVhGRUJDUVdXUkJQWVlKUVRZWkNZUVlRUVpZSE1XRkZIR1pGUkpGQ0RQWE5UUVlaUERZS0hKTEZSWlhQUFhaREJCR1pRU1RMR0RHWUxDUU1MQ0hITUZZV0xaWVhLSkxZUFFIU1lXTVFRR1FaTUxaSk5TUVhKUVNZSllDQkVIU1hGU1pQWFpXRkxMQkNZWUpEWVREVEhXWlNGSk1RUVlKTE1RWFhMTERUVEtISFlCRlBXVFlZU1FRV05RV0xHV0RFQlpXQ01ZR0NVTEtKWFRNWE1ZSlNYSFlCUldGWU1XRlJYWVFNWFlTWlRaWlRGWUtNTERIUURYV1lZTkxDUllKQkxQU1hDWFlXTFNQUlJKV1hIUVlQSFRZRE5YSEhNTVlXWVRaQ1NRTVRTU0NDREFMV1pUQ1BRUFlKTExRWllKU1dYTVpaTU1ZTE1YQ0xNWENaTVhNWlNRVFpQUFFRQkxQR1hRWkhGTEpKSFlUSlNSWFdaWFNDQ0RMWFRZSkRDUUpYU0xRWUNMWlhMWlpYTVhRUkpNSFJIWkpCSE1GTEpMTUxDTFFOTERYWkxMTFBZUFNZSllTWENRUURDTVFKWlpYSE5QTlhaTUVLTVhIWUtZUUxYU1hUWEpZWUhXRENXRFpIUVlZQkdZQkNZU0NGR1BTSk5aRFlaWkpaWFJaUlFKSllNQ0FOWVJKVExEUFBZWkJTVEpLWFhaWVBGRFdGR1paUlBZTVROR1haUUJZWE5CVUZOUUtSSlFaTUpFR1JaR1lDTEtYWkRTS0tOU1hLQ0xKU1BKWVlaTFFRSllCWlNTUUxMTEtKWFRCS1RZTENDRERCTFNQUEZZTEdZRFRaSllRR0dLUVRURlpYQkRLVFlZSFlCQkZZVFlZQkNMUERZVEdESFJZUk5KU1BUQ1NOWUpRSEtMTExaU0xZRFhYV0JDSlFTUFhCUEpaSkNKRFpGRlhYQlJNTEFaSENTTkRMQkpEU1pCTFBSWlRTV1NCWEJDTExYWExaREpaU0pQWUxZWFhZRlRGRkZCSEpKWEdCWVhKUE1NTVBTU0paSk1UTFlaSlhTV1hUWUxFRFFQSk1ZR1FaSkdESkxRSldKUUxMU0pHSkdZR01TQ0xKSlhEVFlHSlFKUUpDSlpDSkdEWlpTWFFHU0pHR0NYSFFYU05RTFpaQlhIU0daWENYWUxKWFlYWVlERlFRSkhKRlhESENUWEpZUlhZU1FUSlhZRUZZWVNTWVlKWE5DWVpYRlhNU1lTWlhZWVNDSFNIWFpaWkdaWlpHRkpETFRZTE5QWkdZSllaWVlRWlBCWFFCRFpUWkNaWVhYWUhIU1FYU0hESEdRSEpIR1lXU1pUTVpNTEhZWEdFQlRZTFpLUVdZVEpaUkNMRUtZU1REQkNZS1FRU0FZWENKWFdXR1NCSEpZWllESENTSktRQ1hTV1hGTFRZTllaUFpDQ1pKUVRaV0pRRFpaWlFaTEpKWExTQkhQWVhYUFNYU0hIRVpUWEZQVExRWVpaWEhZVFhOQ0ZaWVlIWEdOWE1ZV1hUWlNKUFRISEdZTVhNWFFaWFRTQkNaWUpZWFhUWVlaWVBDUUxNTVNaTUpaWkxMWlhHWFpBQUpaWVhKTVpYV0RYWlNYWkRaWExFWUpKWlFCSFpXWlpaUVRaUFNYWlREU1hKSkpaTllBWlBIWFlZU1JOUURUSFpIWVlLWUpIRFpYWkxTV0NMWUJaWUVDV0NZQ1JZTENYTkhaWURaWURZSkRGUkpKSFRSU1FUWFlYSlJKSE9KWU5YRUxYU0ZTRkpaR0hQWlNYWlNaRFpDUVpCWVlLTFNHU0pIQ1pTSERHUUdYWVpHWENIWFpKV1lRV0dZSEtTU0VRWlpORFpGS1dZU1NUQ0xaU1RTWU1DREhKWFhZV0VZWENaQVlETVBYTURTWFlCU1FNSk1aSk1UWlFMUEpZUVpDR1FIWEpISExYWEhMSERMREpRQ0xEV0JTWEZaWllZU0NIVFlUWVlCSEVDWEhZS0dKUFhISFlaSkZYSFdIQkRaRllaQkNBUE5QR05ZRE1TWEhNTU1NQU1ZTkJZSlRNUFhZWU1DVEhKQlpZRkNHVFlIV1BIRlRXWlpFWlNCWkVHUEZNVFNLRlRZQ01IRkxMSEdQWkpYWkpHWkpZWFpTQkJRU0NaWkxaQ0NTVFBHWE1KU0ZUQ0NaSlpESlhDWUJaTEZDSlNZWkZHU1pMWUJDV1paQllaRFpZUFNXWUpaWFpCRFNZVVhMWlpCWkZZR0NaWEJaSFpGVFBCR1pHRUpCU1RHS0RNRkhZWlpKSFpMTFpaR0pRWkxTRkRKU1NDQlpHUERMRlpGWlNaWVpZWlNZR0NYU05YWENIQ1pYVFpaTEpGWkdRU1FZWFpKUURDQ1pUUUNEWFpKWVFKUUNIWFpURExHU0NYWlNZUUpRVFpXTFFEUVpUUUNIUVFKWllFWlpaUEJXS0RKRkNKUFpUWVBRWVFUVFlOTE1CREtUSlpQUVpRWlpGUFpTQk5KTEdZSkRYSkRaWktaR1FLWERMUFpKVENKRFFCWERKUUpTVENLTlhCWFpNU0xZSkNRTVRKUVdXQ0pRTkpOTExMSEpDV1FUQlpRWURaQ1pQWlpEWllERENZWlpaQ0NKVFRKRlpEUFJSVFpUSkRDUVRRWkRUSk5QTFpCQ0xMQ1RaU1hLSlpRWlBaTEJaUkJUSkRDWEZDWkRCQ0NKSkxUUVFQTERDR1pEQkJaSkNRRENKV1lOTExaWVpDQ0RXTExYV1pMWFJYTlRRUUNaWEtRTFNHREZRVERER0xSTEFKSlRLVVlNS1FMTFRaWVREWVlDWkdKV1lYRFhGUlNLU1RRVEVOUU1SS1FaSEhRS0RMREFaRktZUEJHR1BaUkVCWlpZS1paU1BFR0pYR1lLUVpaWlNMWVNZWVlaV0ZRWllMWlpMWkhXQ0hLWVBRR05QR0JMUExSUkpZWENDU1lZSFNGWkZZQlpZWVRHWlhZTFhDWldYWFpKWkJMRkZMR1NLSFlKWkVZSkhMUExMTExDWkdYRFJaRUxSSEdLTFpaWUhaTFlRU1paSlpRTEpaRkxOQkhHV0xDWkNGSllTUFlYWkxaTFhHQ0NQWkJMTENZQkJCQlVCQkNCUENSTk5aQ1pZUkJGU1JMRENHUVlZUVhZR01RWldUWllUWUpYWUZXVEVIWlpKWVdMQ0NOVFpZSkpaREVEUFpEWlRTWVFKSERZTUJKTllKWkxYVFNTVFBITkRKWFhCWVhRVFpRRERUSlREWVlUR1dTQ1NaUUZMU0hMR0xCQ1pQSERMWVpKWUNLV1RZVFlMQk5ZVFNEU1lDQ1RZU1pZWUVCSEVYSFFEVFdOWUdZQ0xYVFNaWVNUUU1ZR1pBWkNDU1paRFNMWkNMWlJRWFlZRUxKU0JZTVhTWFpURU1CQkxMWVlMTFlURFFZU0hZTVJRV0tGS0JGWE5YU0JZQ0hYQldKWUhUUUJQQlNCV0RaWUxLR1pTS1lIWFFaSlhIWEpYR05MSktaTFlZQ0RYTEZZRkdITEpHSllCWFFMWUJYUVBRR1pUWlBMTkNZUFhESllRWURZTVJCRVNKWVlIS1hYU1RNWFJDWlpZV1hZUVlCTUNMTFlaSFFZWldRWERCWEJaV1pNU0xQRE1ZU0tGTVpLTFpDWVFZQ1pMUVhGWlpZRFFaUFpZR1lKWVpNWlhEWkZZRllUVFFUWkhHU1BDWk1MQ0NZVFpYSkNZVEpNS1NMUFpIWVNOWkxMWVRQWkNUWlpDS1RYREhYWFRRQ1lGS1NNUUNDWVlBWkhUSlBDWUxaTFlKQkpYVFBOWUxKWVlOUlhTWUxNTU5YSlNNWUJDU1lTWUxaWUxYSkpRWUxEWkxQUUJGWlpCTEZORFhRS0NaRllXSEdRTVJEU1hZQ1lUWE5RUUpaWVlQRlpYRFlaRlBSWEVKREdZUUJYUkNORllZUVBHSFlKRFlaWEdSSFRLWUxOV0RaTlRTTVBLTEJUSEJQWVNaQlpUSlpTWlpKVFlZWFpQSFNTWlpCWkNaUFRRRlpNWUZMWVBZQkJKUVhaTVhYREpNVFNZU0tLQkpaWEhKQ0tMUFNNS1lKWkNYVE1MSllYUlpaUVNMWFhRUFlaWE1LWVhYWEpDTEpQUk1ZWUdBRFlTS1FMU05ESFlaS1FYWllaVENHSFpUTE1MV1pZQldTWUNUQkhKSEpGQ1daVFhXWVRLWkxYUVNITFlKWkpYVE1QTFBZQ0dMVEJaWlRMWkpDWUpHRFRDTEtMUExMUVBKTVpQQVBYWVpMS0tUS0RaQ1paQk5aRFlEWVFaSllKR01DVFhMVEdYU1pMTUxIQkdMS0ZXTldaSERYVUhMRk1LWVNMR1hEVFdXRlJKRUpaVFpIWURYWUtTSFdGWkNRU0hLVE1RUUhUWkhZTUpESlNLSFhaSlpCWlpYWU1QQUdRTVNUUFhMU0tMWllOV1JUU1FMU1pCUFNQU0daV1lIVExLU1NTV0haWkxZWVROWEpHTUpTWlNVRldOTFNPWlRYR1hMU0FNTUxCV0xEU1pZTEFLUUNRQ1RNWUNGSkJTTFhDTFpaQ0xYWEtTQlpRQ0xISlBTUVBMU1hYQ0tTTE5IUFNGUVFZVFhZSlpMUUxEWFpRSlpEWVlESk5aUFRVWkRTS0pGU0xKSFlMWlNRWkxCVFhZREdUUUZEQllBWlhEWkhaSk5ISFFCWUtOWEpKUUNaTUxMSlpLU1BMRFlDTEJCTFhLTEVMWEpMQlFZQ1hKWEdDTkxDUVBMWkxaWUpUWkxKR1laRFpQTFRRQ1NYRkRNTllDWEdCVEpEQ1pOQkdCUVlRSldHS0ZIVE5QWVFaUUdCS1BCQllaTVRKRFlUQkxTUU1QU1hUQk5QRFhLTEVNWVlDSllOWkNUTERZS1paWEREWEhRU0hER01aU0pZQ0NUQVlSWkxQWUxUTEtYU0xaQ0dHRVhDTEZYTEtKUlRMUUpBUVpOQ01CWURLS0NYR0xDWkpaWEpIUFRESkpNWlFZS1FTRUNRWkRTSEhBRE1MWkZNTVpCR05USk5OTEdCWUpCUkJUTUxCWUpEWlhMQ0pMUExETFBDUURITFhaTFlDQkxDWFpaSkFESkxOWk1NU1NTTVlCSEJTUUtCSFJTWFhKTVhTRFpOWlBYTEdCUkhXR0dGQ1hHTVNLTExUU0pZWUNRTFRTS1lXWVlIWVdYQlhRWVdQWVdZS1FMU1FQVE5US0hRQ1dEUUtUV1BYWEhDUFRIVFdVTVNTWUhCV0NSV1hISk1LTVpOR1dUTUxLRkdIS0pZTFNZWUNYV0hZRUNMUUhLUUhUVFFLSEZaTERYUVdZWllZREVTQlBLWVJaUEpGWVlaSkNFUURaWkRMQVRaQkJGSkxMQ1hETE1KU1NYRUdZR1NKUVhDV0JYU1NaUERZWkNYRE5ZWFBQWllETFlKQ1pQTFRYTFNYWVpZUlhDWVlZRFlMV1dOWlNBSEpTWVFZSEdZV1dBWFRKWkRBWFlTUkxURFBTU1lZRk5FSkRYWVpITFhMTExaUVpTSk5ZUVlRUVhZSkdIWkdaQ1lKQ0haTFlDRFNIV1NISlpZSlhDTExOWFpKSllZWE5GWE1XRlBZTENZTExBQldEREhXRFhKTUNYWlRaUE1MUVpIU0ZIWllOWlRMTERZV0xTTFhIWU1NWUxNQldXS1lYWUFEVFhZTExESlBZQlBXVVhKTVdNTExTQUZETExZRkxCSEhIQlFRTFRaSkNRSkxESlRGRktNTU1CWVRIWUdEQ1FSRERXUlFKWE5CWVNOV1pEQllZVEJKSFBZQllUVEpYQUFIR1FEUVRNWVNUUVhLQlRaUEtKTFpSQkVRUVNTTUpKQkRKT1RHVEJYUEdCS1RMSFFYSkpKQ1RIWFFEV0pMV1JGV1FHV1NIQ0tSWVNXR0ZUR1lHQlhTRFdEV1JGSFdZVEpKWFhYSllaWVNMUFlZWVBBWVhIWURRS1hTSFhZWEdTS1FIWVdGREREUFBMQ0pMUVFFRVdYS1NZWUtEWVBMVEpUSEtKTFRDWVlISEpUVFBMVFpaQ0RMVEhRS1pYUVlTVEVFWVdZWVpZWFhZWVNUVEpLTExQWk1DWUhRR1hZSFNSTUJYUExMTlFZRFFIWFNYWFdHRFFCU0hZTExQSkpKVEhZSktZUFBUSFlZS1RZRVpZRU5NRFNITENSUFFGREdGWFpQU0ZUTEpYWEpCU1dZWVNLU0ZMWExQUExCQkJMQlNGWEZZWkJTSlNTWUxQQkJGRkZGU1NDSkRTVFpTWFpSWVlTWUZGU1laWVpCSlRCQ1RTQlNESFJUSkpCWVRDWFlKRVlMWENCTkVCSkRTWVhZS0dTSlpCWEJZVEZaV0dFTllISFRIWkhIWEZXR0NTVEJHWEtMU1hZV01UTUJZWEpTVFpTQ0RZUVJDWVRXWFpGSE1ZTUNYTFpOU0RKVFRUWFJZQ0ZZSlNCU0RZRVJYSkxKWEJCREVZTkpHSFhHQ0tHU0NZTUJMWEpNU1pOU0tHWEZCTkJQVEhGSkFBRlhZWEZQWE1ZUFFEVFpDWFpaUFhSU1lXWkRMWUJCS1RZUVBRSlBaWVBaSlpOSlBaSkxaWkZZU0JUVFNMTVBUWlJURFhRU0pFSEJaWUxaREhMSlNRTUxIVFhUSkVDWFNMWlpTUEtUTFpLUVFZRlNZR1lXUENQUUZIUUhZVFFYWktSU0dUVFNRQ1pMUFRYQ0RZWVpYU1FaU0xYTFpNWUNQQ1FCWllYSEJTWExaRExUQ0RYVFlMWkpZWVpQWllaTFRYSlNKWEhMUE1ZVFhDUVJCTFpTU0ZKWlpUTkpZVFhNWUpITEhQUExDWVhRSlFRS1paU0NQWktTV0FMUVNCTENDWkpTWEdXV1dZR1lLVEpCQlpUREtIWEhLR1RHUEJLUVlTTFBYUEpDS0JNTExYRFpTVEJLTEdHUUtRTFNCS0tURlhSTURLQkZUUFpGUlRCQlJGRVJRR1hZSlBaU1NUTEJaVFBTWlFaU0pESExKUUxaQlBNU01NU1hMUVFOSEtOQkxSREROWFhESERESkNZWUdZTFhHWkxYU1lHTVFRR0tIQlBNWFlYTFlUUVdMV0dDUEJNUVhDWVpZRFJKQkhUREpZSFFTSFRNSlNCWVBMV0hMWkZGTllQTUhYWEhQTFRCUVBGQkpXUURCWUdQTlpUUEZaSkdTRERUUVNIWkVBV1paWUxMVFlZQldKS1hYR0hMRktYREpUTVNaU1FZTlpHR1NXUVNQSFRMU1NLTUNMWlhZU1pRWlhOQ0pEUUdaRExGTllLTEpDSkxMWkxNWlpOSFlEU1NIVEhaWkxaWkJCSFFaV1dZQ1JaSExZUVFKQkVZRlhYWFdIU1JYV1FIV1BTTE1TU0taVFRZR1lRUVdSU0xBTEhNSlRRSlNNWFFCSkpaSlhaWVpLWEJZUVhCSlhTSFpUU0ZKTFhNWFpYRkdIS1pTWkdHWUxDTFNBUkpZSFNMTExNWlhFTEdMWFlESllUTEZCSEJQTkxZWkZCQkhQVEdKS1dFVFpIS0pKWFpYWEdMTEpMU1RHU0hKSllRTFFaRktDR05OREpTU1pGREJDVFdXU0VRRkhRSkJTQVFUR1lQUUxCWEJNTVlXWEdTTFpIR0xaR1FZRkxaQllGWkpGUllTRk1CWVpIUUdGV1pTWUZZSkpQSFpCWVlaRkZXT0RHUkxNRlRXTEJaR1lDUVhDREpZR1pZWVlZVFlUWURXRUdBWllIWEpMWllZSExSTUdSWFhaQ0xITkVMSkpUSlRQV0pZQkpKQlhKSlRKVEVFS0hXU0xKUExQU0ZZWlBRUUJETFFKSlRZWVFMWVpLREtTUUpZWVFaTERRVEdKUVlaSlNVQ01SWVFUSFRFSk1GQ1RZSFlQS01IWVpXSkRRRkhZWVhXU0hDVFhSTEpIUVhIQ0NZWVlKTFRLVFRZVE1YR1RDSlRaQVlZT0NaTFlMQlNaWVdKWVRTSllIQllTSEZKTFlHSlhYVE1aWVlMVFhYWVBaTFhZSlpZWllZUE5ITVlNRFlZTEJMSExTWVlRUUxMTkpKWU1TT1lRQlpHRExZWFlMQ1FZWFRTWkVHWEhaR0xIV0JMSkhFWVhUV1FNQUtCUFFDR1lTSEhFR1FDTVdZWVdMSllKSFlZWkxMSkpZTEhaWUhNR1NMSkxKWENKSllDTFlDSlBDUFpKWkpNTVlMQ1FMTlFMSlFKU1hZSk1MU1pMSlFMWUNNTUhDRk1NRlBRUU1GWUxRTUNGRlFNTU1NSE1aTkZISEpHVFRISEtIU0xOQ0hIWVFEWFRNTVFEQ1laWVhZUU1ZUVlMVERDWVlZWkFaWkNZTVpZRExaRkZGTU1ZQ1FaV1paTUFCVEJZWlRETU5aWkdHREZUWVBDR1FZVFRTU0ZGV0ZEVFpRU1NZU1RXWEpIWFlUU1hYWUxCWVFIV1dLWEhaWFdaTk5aWkpaSkpRSkNDQ0hZWVhCWlhaQ1laVExMQ1FYWU5KWUNZWUNZTlpaUVlZWUVXWUNaRENKWUNDSFlKTEJUWllZQ1FXTVBXUFlNTEdLRExETEdLUVFCR1lDSEpYWVwiO1xyXG4gICAgLy/mraTlpITmlLblvZXkuoYzNzXkuKrlpJrpn7PlrZdcclxuICAgdmFyIG9NdWx0aURpZmY9e1wiMTk5NjlcIjpcIkRaXCIsXCIxOTk3NVwiOlwiV01cIixcIjE5OTg4XCI6XCJRSlwiLFwiMjAwNDhcIjpcIllMXCIsXCIyMDA1NlwiOlwiU0NcIixcIjIwMDYwXCI6XCJOTVwiLFwiMjAwOTRcIjpcIlFHXCIsXCIyMDEyN1wiOlwiUUpcIixcIjIwMTY3XCI6XCJRQ1wiLFwiMjAxOTNcIjpcIllHXCIsXCIyMDI1MFwiOlwiS0hcIixcIjIwMjU2XCI6XCJaQ1wiLFwiMjAyODJcIjpcIlNDXCIsXCIyMDI4NVwiOlwiUUpHXCIsXCIyMDI5MVwiOlwiVERcIixcIjIwMzE0XCI6XCJZRFwiLFwiMjAzNDBcIjpcIk5FXCIsXCIyMDM3NVwiOlwiVERcIixcIjIwMzg5XCI6XCJZSlwiLFwiMjAzOTFcIjpcIkNaXCIsXCIyMDQxNVwiOlwiUEJcIixcIjIwNDQ2XCI6XCJZU1wiLFwiMjA0NDdcIjpcIlNRXCIsXCIyMDUwNFwiOlwiVENcIixcIjIwNjA4XCI6XCJLR1wiLFwiMjA4NTRcIjpcIlFKXCIsXCIyMDg1N1wiOlwiWkNcIixcIjIwOTExXCI6XCJQRlwiLFwiMjA1MDRcIjpcIlRDXCIsXCIyMDYwOFwiOlwiS0dcIixcIjIwODU0XCI6XCJRSlwiLFwiMjA4NTdcIjpcIlpDXCIsXCIyMDkxMVwiOlwiUEZcIixcIjIwOTg1XCI6XCJBV1wiLFwiMjEwMzJcIjpcIlBCXCIsXCIyMTA0OFwiOlwiWFFcIixcIjIxMDQ5XCI6XCJTQ1wiLFwiMjEwODlcIjpcIllTXCIsXCIyMTExOVwiOlwiSkNcIixcIjIxMjQyXCI6XCJTQlwiLFwiMjEyNzNcIjpcIlNDXCIsXCIyMTMwNVwiOlwiWVBcIixcIjIxMzA2XCI6XCJRT1wiLFwiMjEzMzBcIjpcIlpDXCIsXCIyMTMzM1wiOlwiU0RDXCIsXCIyMTM0NVwiOlwiUUtcIixcIjIxMzc4XCI6XCJDQVwiLFwiMjEzOTdcIjpcIlNDXCIsXCIyMTQxNFwiOlwiWFNcIixcIjIxNDQyXCI6XCJTQ1wiLFwiMjE0NzdcIjpcIkpHXCIsXCIyMTQ4MFwiOlwiVERcIixcIjIxNDg0XCI6XCJaU1wiLFwiMjE0OTRcIjpcIllYXCIsXCIyMTUwNVwiOlwiWVhcIixcIjIxNTEyXCI6XCJIR1wiLFwiMjE1MjNcIjpcIlhIXCIsXCIyMTUzN1wiOlwiUEJcIixcIjIxNTQyXCI6XCJQRlwiLFwiMjE1NDlcIjpcIktIXCIsXCIyMTU3MVwiOlwiRVwiLFwiMjE1NzRcIjpcIkRBXCIsXCIyMTU4OFwiOlwiVERcIixcIjIxNTg5XCI6XCJPXCIsXCIyMTYxOFwiOlwiWkNcIixcIjIxNjIxXCI6XCJLSEFcIixcIjIxNjMyXCI6XCJaSlwiLFwiMjE2NTRcIjpcIktHXCIsXCIyMTY3OVwiOlwiTEtHXCIsXCIyMTY4M1wiOlwiS0hcIixcIjIxNzEwXCI6XCJBXCIsXCIyMTcxOVwiOlwiWUhcIixcIjIxNzM0XCI6XCJXT0VcIixcIjIxNzY5XCI6XCJBXCIsXCIyMTc4MFwiOlwiV05cIixcIjIxODA0XCI6XCJYSFwiLFwiMjE4MzRcIjpcIkFcIixcIjIxODk5XCI6XCJaRFwiLFwiMjE5MDNcIjpcIlJOXCIsXCIyMTkwOFwiOlwiV09cIixcIjIxOTM5XCI6XCJaQ1wiLFwiMjE5NTZcIjpcIlNBXCIsXCIyMTk2NFwiOlwiWUFcIixcIjIxOTcwXCI6XCJURFwiLFwiMjIwMDNcIjpcIkFcIixcIjIyMDMxXCI6XCJKR1wiLFwiMjIwNDBcIjpcIlhTXCIsXCIyMjA2MFwiOlwiWkNcIixcIjIyMDY2XCI6XCJaQ1wiLFwiMjIwNzlcIjpcIk1IXCIsXCIyMjEyOVwiOlwiWEpcIixcIjIyMTc5XCI6XCJYQVwiLFwiMjIyMzdcIjpcIk5KXCIsXCIyMjI0NFwiOlwiVERcIixcIjIyMjgwXCI6XCJKUVwiLFwiMjIzMDBcIjpcIllIXCIsXCIyMjMxM1wiOlwiWFdcIixcIjIyMzMxXCI6XCJZUVwiLFwiMjIzNDNcIjpcIllKXCIsXCIyMjM1MVwiOlwiUEhcIixcIjIyMzk1XCI6XCJEQ1wiLFwiMjI0MTJcIjpcIlREXCIsXCIyMjQ4NFwiOlwiUEJcIixcIjIyNTAwXCI6XCJQQlwiLFwiMjI1MzRcIjpcIlpEXCIsXCIyMjU0OVwiOlwiREhcIixcIjIyNTYxXCI6XCJQQlwiLFwiMjI2MTJcIjpcIlREXCIsXCIyMjc3MVwiOlwiS1FcIixcIjIyODMxXCI6XCJIQlwiLFwiMjI4NDFcIjpcIkpHXCIsXCIyMjg1NVwiOlwiUUpcIixcIjIyODY1XCI6XCJYUVwiLFwiMjMwMTNcIjpcIk1MXCIsXCIyMzA4MVwiOlwiV01cIixcIjIzNDg3XCI6XCJTWFwiLFwiMjM1NThcIjpcIlFKXCIsXCIyMzU2MVwiOlwiWVdcIixcIjIzNTg2XCI6XCJZV1wiLFwiMjM2MTRcIjpcIllXXCIsXCIyMzYxNVwiOlwiU05cIixcIjIzNjMxXCI6XCJQQlwiLFwiMjM2NDZcIjpcIlpTXCIsXCIyMzY2M1wiOlwiWlRcIixcIjIzNjczXCI6XCJZR1wiLFwiMjM3NjJcIjpcIlREXCIsXCIyMzc2OVwiOlwiWlNcIixcIjIzNzgwXCI6XCJRSlwiLFwiMjM4ODRcIjpcIlFLXCIsXCIyNDA1NVwiOlwiWEhcIixcIjI0MTEzXCI6XCJEQ1wiLFwiMjQxNjJcIjpcIlpDXCIsXCIyNDE5MVwiOlwiR0FcIixcIjI0MjczXCI6XCJRSlwiLFwiMjQzMjRcIjpcIk5MXCIsXCIyNDM3N1wiOlwiVERcIixcIjI0Mzc4XCI6XCJRSlwiLFwiMjQ0MzlcIjpcIlBGXCIsXCIyNDU1NFwiOlwiWlNcIixcIjI0NjgzXCI6XCJURFwiLFwiMjQ2OTRcIjpcIldFXCIsXCIyNDczM1wiOlwiTEtcIixcIjI0OTI1XCI6XCJUTlwiLFwiMjUwOTRcIjpcIlpHXCIsXCIyNTEwMFwiOlwiWFFcIixcIjI1MTAzXCI6XCJYSFwiLFwiMjUxNTNcIjpcIlBCXCIsXCIyNTE3MFwiOlwiUEJcIixcIjI1MTc5XCI6XCJLR1wiLFwiMjUyMDNcIjpcIlBCXCIsXCIyNTI0MFwiOlwiWlNcIixcIjI1MjgyXCI6XCJGQlwiLFwiMjUzMDNcIjpcIk5BXCIsXCIyNTMyNFwiOlwiS0dcIixcIjI1MzQxXCI6XCJaWVwiLFwiMjUzNzNcIjpcIldaXCIsXCIyNTM3NVwiOlwiWEpcIixcIjI1Mzg0XCI6XCJBXCIsXCIyNTQ1N1wiOlwiQVwiLFwiMjU1MjhcIjpcIlNEXCIsXCIyNTUzMFwiOlwiU0NcIixcIjI1NTUyXCI6XCJURFwiLFwiMjU3NzRcIjpcIlpDXCIsXCIyNTg3NFwiOlwiWkNcIixcIjI2MDQ0XCI6XCJZV1wiLFwiMjYwODBcIjpcIldNXCIsXCIyNjI5MlwiOlwiUEJcIixcIjI2MzMzXCI6XCJQQlwiLFwiMjYzNTVcIjpcIlpZXCIsXCIyNjM2NlwiOlwiQ1pcIixcIjI2Mzk3XCI6XCJaQ1wiLFwiMjYzOTlcIjpcIlFKXCIsXCIyNjQxNVwiOlwiWlNcIixcIjI2NDUxXCI6XCJTQlwiLFwiMjY1MjZcIjpcIlpDXCIsXCIyNjU1MlwiOlwiSkdcIixcIjI2NTYxXCI6XCJURFwiLFwiMjY1ODhcIjpcIkpHXCIsXCIyNjU5N1wiOlwiQ1pcIixcIjI2NjI5XCI6XCJaU1wiLFwiMjY2MzhcIjpcIllMXCIsXCIyNjY0NlwiOlwiWFFcIixcIjI2NjUzXCI6XCJLR1wiLFwiMjY2NTdcIjpcIlhKXCIsXCIyNjcyN1wiOlwiSEdcIixcIjI2ODk0XCI6XCJaQ1wiLFwiMjY5MzdcIjpcIlpTXCIsXCIyNjk0NlwiOlwiWkNcIixcIjI2OTk5XCI6XCJLSlwiLFwiMjcwOTlcIjpcIktKXCIsXCIyNzQ0OVwiOlwiWVFcIixcIjI3NDgxXCI6XCJYU1wiLFwiMjc1NDJcIjpcIlpTXCIsXCIyNzY2M1wiOlwiWlNcIixcIjI3NzQ4XCI6XCJUU1wiLFwiMjc3ODRcIjpcIlNDXCIsXCIyNzc4OFwiOlwiWkRcIixcIjI3Nzk1XCI6XCJURFwiLFwiMjc4MTJcIjpcIk9cIixcIjI3ODUwXCI6XCJQQlwiLFwiMjc4NTJcIjpcIk1CXCIsXCIyNzg5NVwiOlwiU0xcIixcIjI3ODk4XCI6XCJQTFwiLFwiMjc5NzNcIjpcIlFKXCIsXCIyNzk4MVwiOlwiS0hcIixcIjI3OTg2XCI6XCJIWFwiLFwiMjc5OTRcIjpcIlhKXCIsXCIyODA0NFwiOlwiWUNcIixcIjI4MDY1XCI6XCJXR1wiLFwiMjgxNzdcIjpcIlNNXCIsXCIyODI2N1wiOlwiUUpcIixcIjI4MjkxXCI6XCJLSFwiLFwiMjgzMzdcIjpcIlpRXCIsXCIyODQ2M1wiOlwiVExcIixcIjI4NTQ4XCI6XCJEQ1wiLFwiMjg2MDFcIjpcIlREXCIsXCIyODY4OVwiOlwiUEJcIixcIjI4ODA1XCI6XCJKR1wiLFwiMjg4MjBcIjpcIlFHXCIsXCIyODg0NlwiOlwiUEJcIixcIjI4OTUyXCI6XCJURFwiLFwiMjg5NzVcIjpcIlpDXCIsXCIyOTEwMFwiOlwiQVwiLFwiMjkzMjVcIjpcIlFKXCIsXCIyOTU3NVwiOlwiU0xcIixcIjI5NjAyXCI6XCJGQlwiLFwiMzAwMTBcIjpcIlREXCIsXCIzMDA0NFwiOlwiQ1hcIixcIjMwMDU4XCI6XCJQRlwiLFwiMzAwOTFcIjpcIllTUFwiLFwiMzAxMTFcIjpcIllOXCIsXCIzMDIyOVwiOlwiWEpcIixcIjMwNDI3XCI6XCJTQ1wiLFwiMzA0NjVcIjpcIlNYXCIsXCIzMDYzMVwiOlwiWVFcIixcIjMwNjU1XCI6XCJRSlwiLFwiMzA2ODRcIjpcIlFKR1wiLFwiMzA3MDdcIjpcIlNEXCIsXCIzMDcyOVwiOlwiWEhcIixcIjMwNzk2XCI6XCJMR1wiLFwiMzA5MTdcIjpcIlBCXCIsXCIzMTA3NFwiOlwiTk1cIixcIjMxMDg1XCI6XCJKWlwiLFwiMzExMDlcIjpcIlNDXCIsXCIzMTE4MVwiOlwiWkNcIixcIjMxMTkyXCI6XCJNTEJcIixcIjMxMjkzXCI6XCJKUVwiLFwiMzE0MDBcIjpcIllYXCIsXCIzMTU4NFwiOlwiWUpcIixcIjMxODk2XCI6XCJaTlwiLFwiMzE5MDlcIjpcIlpZXCIsXCIzMTk5NVwiOlwiWEpcIixcIjMyMzIxXCI6XCJQRlwiLFwiMzIzMjdcIjpcIlpZXCIsXCIzMjQxOFwiOlwiSEdcIixcIjMyNDIwXCI6XCJYUVwiLFwiMzI0MjFcIjpcIkhHXCIsXCIzMjQzOFwiOlwiTEdcIixcIjMyNDczXCI6XCJHSlwiLFwiMzI0ODhcIjpcIlREXCIsXCIzMjUyMVwiOlwiUUpcIixcIjMyNTI3XCI6XCJQQlwiLFwiMzI1NjJcIjpcIlpTUVwiLFwiMzI1NjRcIjpcIkpaXCIsXCIzMjczNVwiOlwiWkRcIixcIjMyNzkzXCI6XCJQQlwiLFwiMzMwNzFcIjpcIlBGXCIsXCIzMzA5OFwiOlwiWExcIixcIjMzMTAwXCI6XCJZQVwiLFwiMzMxNTJcIjpcIlBCXCIsXCIzMzI2MVwiOlwiQ1hcIixcIjMzMzI0XCI6XCJCUFwiLFwiMzMzMzNcIjpcIlREXCIsXCIzMzQwNlwiOlwiWUFcIixcIjMzNDI2XCI6XCJXTVwiLFwiMzM0MzJcIjpcIlBCXCIsXCIzMzQ0NVwiOlwiSkdcIixcIjMzNDg2XCI6XCJaTlwiLFwiMzM0OTNcIjpcIlRTXCIsXCIzMzUwN1wiOlwiUUpcIixcIjMzNTQwXCI6XCJRSlwiLFwiMzM1NDRcIjpcIlpDXCIsXCIzMzU2NFwiOlwiWFFcIixcIjMzNjE3XCI6XCJZVFwiLFwiMzM2MzJcIjpcIlFKXCIsXCIzMzYzNlwiOlwiWEhcIixcIjMzNjM3XCI6XCJZWFwiLFwiMzM2OTRcIjpcIldHXCIsXCIzMzcwNVwiOlwiUEZcIixcIjMzNzI4XCI6XCJZV1wiLFwiMzM4ODJcIjpcIlNSXCIsXCIzNDA2N1wiOlwiV01cIixcIjM0MDc0XCI6XCJZV1wiLFwiMzQxMjFcIjpcIlFKXCIsXCIzNDI1NVwiOlwiWkNcIixcIjM0MjU5XCI6XCJYTFwiLFwiMzQ0MjVcIjpcIkpIXCIsXCIzNDQzMFwiOlwiWEhcIixcIjM0NDg1XCI6XCJLSFwiLFwiMzQ1MDNcIjpcIllTXCIsXCIzNDUzMlwiOlwiSEdcIixcIjM0NTUyXCI6XCJYU1wiLFwiMzQ1NThcIjpcIllFXCIsXCIzNDU5M1wiOlwiWkxcIixcIjM0NjYwXCI6XCJZUVwiLFwiMzQ4OTJcIjpcIlhIXCIsXCIzNDkyOFwiOlwiU0NcIixcIjM0OTk5XCI6XCJRSlwiLFwiMzUwNDhcIjpcIlBCXCIsXCIzNTA1OVwiOlwiU0NcIixcIjM1MDk4XCI6XCJaQ1wiLFwiMzUyMDNcIjpcIlRRXCIsXCIzNTI2NVwiOlwiSlhcIixcIjM1Mjk5XCI6XCJKWFwiLFwiMzU3ODJcIjpcIlNaXCIsXCIzNTgyOFwiOlwiWVNcIixcIjM1ODMwXCI6XCJFXCIsXCIzNTg0M1wiOlwiVERcIixcIjM1ODk1XCI6XCJZR1wiLFwiMzU5NzdcIjpcIk1IXCIsXCIzNjE1OFwiOlwiSkdcIixcIjM2MjI4XCI6XCJRSlwiLFwiMzY0MjZcIjpcIlhRXCIsXCIzNjQ2NlwiOlwiRENcIixcIjM2NzEwXCI6XCJKQ1wiLFwiMzY3MTFcIjpcIlpZR1wiLFwiMzY3NjdcIjpcIlBCXCIsXCIzNjg2NlwiOlwiU0tcIixcIjM2OTUxXCI6XCJZV1wiLFwiMzcwMzRcIjpcIllYXCIsXCIzNzA2M1wiOlwiWEhcIixcIjM3MjE4XCI6XCJaQ1wiLFwiMzczMjVcIjpcIlpDXCIsXCIzODA2M1wiOlwiUEJcIixcIjM4MDc5XCI6XCJURFwiLFwiMzgwODVcIjpcIlFZXCIsXCIzODEwN1wiOlwiRENcIixcIjM4MTE2XCI6XCJURFwiLFwiMzgxMjNcIjpcIllEXCIsXCIzODIyNFwiOlwiSEdcIixcIjM4MjQxXCI6XCJYVENcIixcIjM4MjcxXCI6XCJaQ1wiLFwiMzg0MTVcIjpcIllFXCIsXCIzODQyNlwiOlwiS0hcIixcIjM4NDYxXCI6XCJZRFwiLFwiMzg0NjNcIjpcIkFFXCIsXCIzODQ2NlwiOlwiUEJcIixcIjM4NDc3XCI6XCJYSlwiLFwiMzg1MThcIjpcIllUXCIsXCIzODU1MVwiOlwiV0tcIixcIjM4NTg1XCI6XCJaQ1wiLFwiMzg3MDRcIjpcIlhTXCIsXCIzODczOVwiOlwiTEpcIixcIjM4NzYxXCI6XCJHSlwiLFwiMzg4MDhcIjpcIlNRXCIsXCIzOTA0OFwiOlwiSkdcIixcIjM5MDQ5XCI6XCJYSlwiLFwiMzkwNTJcIjpcIkhHXCIsXCIzOTA3NlwiOlwiQ1pcIixcIjM5MjcxXCI6XCJYVFwiLFwiMzk1MzRcIjpcIlREXCIsXCIzOTU1MlwiOlwiVERcIixcIjM5NTg0XCI6XCJQQlwiLFwiMzk2NDdcIjpcIlNCXCIsXCIzOTczMFwiOlwiTEdcIixcIjM5NzQ4XCI6XCJUUEJcIixcIjQwMTA5XCI6XCJaUVwiLFwiNDA0NzlcIjpcIk5EXCIsXCI0MDUxNlwiOlwiSEdcIixcIjQwNTM2XCI6XCJIR1wiLFwiNDA1ODNcIjpcIlFKXCIsXCI0MDc2NVwiOlwiWVFcIixcIjQwNzg0XCI6XCJRSlwiLFwiNDA4NDBcIjpcIllLXCIsXCI0MDg2M1wiOlwiUUpHXCJ9O1xyXG4gICAgLy/lj4LmlbAs5Lit5paH5a2X56ym5LiyXHJcbiAgICAvL+i/lOWbnuWAvDrmi7zpn7PpppblrZfmr43kuLLmlbDnu4RcclxuICAgIGZ1bmN0aW9uIG1ha2VQeShzdHIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIChzdHIpICE9IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigtMSwgXCLlh73mlbBtYWtlUHnpnIDopoHlrZfnrKbkuLLnsbvlnovlj4LmlbAhXCIpO1xyXG4gICAgICAgIHZhciBhcnJSZXN1bHQgPSBuZXcgQXJyYXkoKTsgLy/kv53lrZjkuK3pl7Tnu5PmnpznmoTmlbDnu4RcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8v6I635b6XdW5pY29kZeeggVxyXG4gICAgICAgICAgICB2YXIgY2ggPSBzdHIuY2hhckF0KGkpO1xyXG4gICAgICAgICAgICAvL+ajgOafpeivpXVuaWNvZGXnoIHmmK/lkKblnKjlpITnkIbojIPlm7TkuYvlhoUs5Zyo5YiZ6L+U5Zue6K+l56CB5a+55pig5rGJ5a2X55qE5ou86Z+z6aaW5a2X5q+NLOS4jeWcqOWImeiwg+eUqOWFtuWug+WHveaVsOWkhOeQhlxyXG4gICAgICAgICAgICBhcnJSZXN1bHQucHVzaChjaGVja0NoKGNoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aSE55CGYXJyUmVzdWx0LOi/lOWbnuaJgOacieWPr+iDveeahOaLvOmfs+mmluWtl+avjeS4suaVsOe7hFxyXG4gICAgICAgIHJldHVybiBta1JzbHQoYXJyUmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0NoKGNoKSB7XHJcbiAgICAgICAgdmFyIHVuaSA9IGNoLmNoYXJDb2RlQXQoMCk7XHJcbiAgICAgICAgLy/lpoLmnpzkuI3lnKjmsYnlrZflpITnkIbojIPlm7TkuYvlhoUs6L+U5Zue5Y6f5a2X56ymLOS5n+WPr+S7peiwg+eUqOiHquW3seeahOWkhOeQhuWHveaVsFxyXG4gICAgICAgIGlmICh1bmkgPiA0MDg2OSB8fCB1bmkgPCAxOTk2OClcclxuICAgICAgICAgICAgcmV0dXJuIGNoOyAvL2RlYWxXaXRoT3RoZXJzKGNoKTtcclxuICAgICAgICAvL+ajgOafpeaYr+WQpuaYr+Wkmumfs+WtlyzmmK/mjInlpJrpn7PlrZflpITnkIYs5LiN5piv5bCx55u05o6l5Zyoc3RyQ2hpbmVzZUZpcnN0UFnlrZfnrKbkuLLkuK3mib7lr7nlupTnmoTpppblrZfmr41cclxuICAgICAgICByZXR1cm4gKG9NdWx0aURpZmZbdW5pXSA/IG9NdWx0aURpZmZbdW5pXSA6IChzdHJDaGluZXNlRmlyc3RQWS5jaGFyQXQodW5pIC0gMTk5NjgpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWtSc2x0KGFycikge1xyXG4gICAgICAgIHZhciBhcnJSc2x0ID0gW1wiXCJdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHN0ciA9IGFycltpXTtcclxuICAgICAgICAgICAgdmFyIHN0cmxlbiA9IHN0ci5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChzdHJsZW4gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBhcnJSc2x0Lmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyUnNsdFtrXSArPSBzdHI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG1wQXJyID0gYXJyUnNsdC5zbGljZSgwKTtcclxuICAgICAgICAgICAgICAgIGFyclJzbHQgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBzdHJsZW47IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aSN5Yi25LiA5Liq55u45ZCM55qEYXJyUnNsdFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0bXAgPSB0bXBBcnIuc2xpY2UoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/miorlvZPliY3lrZfnrKZzdHJba13mt7vliqDliLDmr4/kuKrlhYPntKDmnKvlsL5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRtcC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBbal0gKz0gc3RyLmNoYXJBdChrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/miorlpI3liLblubbkv67mlLnlkI7nmoTmlbDnu4Tov57mjqXliLBhcnJSc2x05LiKXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyUnNsdCA9IGFyclJzbHQuY29uY2F0KHRtcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFyclJzbHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuKTnq6/ljrvnqbrmoLzlh73mlbBcclxuICAgIFN0cmluZy5wcm90b3R5cGUudHJpbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8oXlxccyopfChcXHMqJCkvZywgXCJcIik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHZhciBwaW55aW4gPSB7fTtcclxuICAgIHBpbnlpbi5tYWtlUHkgPSBtYWtlUHk7XHJcblxyXG4gICAgdmFyIGVsZW1lbnQgPSBsYXl1aS5lbGVtZW50LFxyXG4gICAgICAgIHdpbiA9IHdpbmRvdyxcclxuICAgICAgICBkb2MgPSBkb2N1bWVudDtcclxuXHJcbiAgICBcclxuICAgICBmdW5jdGlvbiBmaWx0ZXJEYXRhKHBpZCxEYXRhKXtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXMoRGF0YSkuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucGFyZW50TWVudUlkPT1waWQgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgZnVuY3Rpb24gbWFwUmVzZXRPcGVuTWVudUxpc3QobWFwRGF0YSl7XHJcbiAgICAgICAgdmFyIGluZGV4PTA7XHJcbiAgICAgICAgdmFyIGdyb3VwID0gJChgPGRpdiBjbGFzcz1cInByLW1ldW4tZ3JvdXBcIj48L2Rpdj48ZGl2IGNsYXNzPVwicHItbWV1bi1ncm91cFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJwci1tZXVuLWdyb3VwXCI+PC9kaXY+YCk7XHJcbiAgICAgXHJcbiAgICAgICAgdmFyIHRyZWVEYXRhPSBmaWx0ZXJEYXRhKFwiMFwiLG1hcERhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6YCS5b2SXHJcbiAgICAgICAgdmFyIHJlY3Vyc2l2ZSA9IGZ1bmN0aW9uKHBpZCl7XHJcbiAgICAgICAgICAgIHZhciBzdHI9XCJcIlxyXG4gICAgICAgICAgICB2YXIgY2hpbGQ9ZmlsdGVyRGF0YShwaWQsbWFwRGF0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjaGlsZC5mb3JFYWNoKGZ1bmN0aW9uKGRpdGVtKXtcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gYDxkaXYgY2xhc3M9XCJtZW51LXRleHRcIiBweS1jb2RlPSR7ZGl0ZW0uUFlfY29kZX0+XHJcbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JHtkaXRlbS5oYXNoP1wiI1wiK2RpdGVtLmhhc2g6XCJqYXZhc2NyaXB0OjtcIn1cclxuICAgICAgICAgICAgICAgICAgIHBhcmVudG1lbnUtaWQ9JHtkaXRlbS5wYXJlbnRNZW51SWR9XHJcbiAgICAgICAgICAgICAgICAgICBtZW51LWlkPSR7ZGl0ZW0ubWVudUlkfVxyXG4gICAgICAgICAgICAgICAgICAgbGVhZj0ke2RpdGVtLmxlYWZ9PlxyXG4gICAgICAgICAgICAgICAgICAgJHtkaXRlbS5uYW1lfTwvYT5cclxuICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgaWYoIWRpdGVtLmxlYWYpIFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSByZWN1cnNpdmUoZGl0ZW0ubWVudUlkKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICBcclxuICAgICAgICAgICByZXR1cm4gc3RyICBcclxuICAgICAgICB9IFxyXG5cclxuXHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdHJlZURhdGEgKXtcclxuICAgICAgICAgICAgdmFyIGVsZSA9IGA8ZGl2IGNsYXNzPVwibGlzdC1pdGVtICR7dHJlZURhdGFba2V5XS5pc0FjdGl2ZT9gc2VsZWN0YDonJ31cIiBpZD0ke3RyZWVEYXRhW2tleV0ubWVudUlkfT5cclxuICAgICAgICAgICAgICAgICAgICA8YSBtZW51LWlkPSR7dHJlZURhdGFba2V5XS5tZW51SWR9IHBhcmVudG1lbnUtaWQ9JHt0cmVlRGF0YVtrZXldLnBhcmVudE1lbnVJZH0gY2xhc3M9XCJsaXN0LXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAke3RyZWVEYXRhW2tleV0ubmFtZX08L2E+YDtcclxuICAgICBcclxuICAgICAgICAgICAgLy/pgY3ljobkuoznuqfoj5zljZVcclxuICAgICAgICAgICAgZWxlICs9IHJlY3Vyc2l2ZSh0cmVlRGF0YVtrZXldLm1lbnVJZClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsZSArPSBgPC9kaXY+YDtcclxuICAgICAgICAgICAgaWYgKGluZGV4ICUgMyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAuZXEoMCkuYXBwZW5kKGVsZSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCAlIDMgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdyb3VwLmVxKDEpLmFwcGVuZChlbGUpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggJSAzID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cC5lcSgyKS5hcHBlbmQoZWxlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICB9XHJcbiAgICAgICAgJChncm91cCkuZmluZChcIi5tZW51LXRleHQ+YVtsZWFmPSdmYWxzZSddXCIpLmhpZGUoKTtcclxuICAgICAgICByZXR1cm4gJChncm91cClcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8v5riy5p+T5LiA57qn6I+c5Y2VXHJcbiAgIFxyXG4gICAgXHJcbiAgICAgLy/muLLmn5PkuoznuqflkozkuInnuqfoj5zljZVcclxuICAgICBcclxuICAgICBmdW5jdGlvbiBtYXBVcGRhdGVDaGlsZHJlbk5hbihpZCxtYXBEYXRhLGRvbSl7XHJcbiAgICAgICAvLyAgdmlwc3BhLmluZGV4SWQ9aWQ7XHJcbiAgICAgICAgIHZhciBwYXJlbnQ9bWFwRGF0YVttYXBEYXRhW2lkXS5wYXJlbnRNZW51SWRdOyBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICBpZihwYXJlbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYocGFyZW50LnBhcmVudE1lbnVJZCE9PVwiMFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ9bWFwRGF0YVtwYXJlbnQucGFyZW50TWVudUlkXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHBhcmVudD0gbWFwRGF0YVtpZF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgICBmdW5jdGlvbiB0cmVlKHBpZCl7ICBcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhPVtdXHJcbiAgICAgICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyhtYXBEYXRhKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgICAgaWYocGlkID09aXRlbS5wYXJlbnRNZW51SWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZighaXRlbS5sZWFmKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2hpbGRyZW49IHRyZWUoaXRlbS5tZW51SWQpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuPSB0cmVlKHBhcmVudC5tZW51SWQpO1xyXG5cclxuICAgICAgICB2YXIgdHJlZURhdGE9cGFyZW50XHJcbiAgICAgICAgdmFyIHNpZGViYXJMaT1gPHVsIGNsYXNzPVwiYm9keS1uYXZcIiBwYXJlbnRtZW51LWlkPSR7cGFyZW50Lm1lbnVJZH0gbmFtZT0ke3BhcmVudC5uYW1lfT5gXHJcbiAgICAgICAgXHJcbiAgICAgICAgdHJlZURhdGE9dHJlZURhdGEuY2hpbGRyZW47XHJcbiAgICAgICBcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0cmVlRGF0YSl7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgc2lkZWJhckxpICs9IGA8bGkgY2xhc3M9XCJpdGVtIGgtbGluayAke3RyZWVEYXRhW2tleV0uaXNBY3RpdmU/YGFjdGl2ZS10aGlzYDonJ30gJHt0cmVlRGF0YVtrZXldLmlzQWN0aXZlJiZ0cmVlRGF0YVtrZXldLmNoaWxkcmVuP2BpdGVtZWRzYDonJ31cIj5cclxuICAgICAgICAgICAgPGEgaHJlZj1cIiR7dHJlZURhdGFba2V5XS5ibGFuaz90cmVlRGF0YVtrZXldLnBhdGg6KHRyZWVEYXRhW2tleV0uaGFzaD9cIiNcIit0cmVlRGF0YVtrZXldLmhhc2g6XCJqYXZhc2NyaXB0OjtcIil9XCIgICR7dHJlZURhdGFba2V5XS5ibGFuaz9gdGFyZ2V0PV9ibGFua2A6XCJcIn0gbWVudS1pZD0ke3RyZWVEYXRhW2tleV0ubWVudUlkfSBsZWFmPVwiJHt0cmVlRGF0YVtrZXldLmxlYWZ9XCIgbGV2ZWw9XCIke3RyZWVEYXRhW2tleV0ubGV2ZWx9XCI+JHt0cmVlRGF0YVtrZXldLm5hbWV9XHJcbiAgICAgICAgICAgICR7KHRyZWVEYXRhW2tleV0uY2hpbGRyZW4mJiF0cmVlRGF0YVtrZXldLmxlYWYpP2A8aSBjbGFzcz1cInJpZ2h0LW1vdmVyIGxheXVpLWljb24gbGF5dWktaWNvbi1yaWdodFwiPjwvaT5gOicnfSBcclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAkeyh0cmVlRGF0YVtrZXldLmNoaWxkcmVuJiYhdHJlZURhdGFba2V5XS5sZWFmKT9cclxuICAgICAgICAgICAgICAgICAgYDxkbCBjbGFzcz1cIm5hdi1jaGlsZFwiIHBhcmVudG1lbnUtaWQ9JHt0cmVlRGF0YVtrZXldLm1lbnVJZH0+ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7IHRyZWVEYXRhW2tleV0uY2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGNoaWxkSXRlbSxpbmRleCxhcnIpeyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGRkICR7Y2hpbGRJdGVtLmlzQWN0aXZlP2BjbGFzcz1cImFjdGl2ZS10aGlzXCJgOicnfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JHtjaGlsZEl0ZW0uYmxhbms/Y2hpbGRJdGVtLnBhdGg6KGNoaWxkSXRlbS5oYXNoP1wiI1wiK2NoaWxkSXRlbS5oYXNoOlwiamF2YXNjcmlwdDo7XCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGlsZEl0ZW0uYmxhbms/YHRhcmdldD1fYmxhbmtgOlwiXCJ9IGxlYWY9JHtjaGlsZEl0ZW0ubGVhZn0gbWVudS1pZD0ke2NoaWxkSXRlbS5tZW51SWR9ICBsZXZlbD0ke2NoaWxkSXRlbS5sZXZlbH0+JHtjaGlsZEl0ZW0ubmFtZX08L2E+PC9kZD5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oXCJcIikgfSAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgPC9kbD5gICAgICAgICAgXHJcbiAgICAgICAgICAgIDonJ30gXHJcbiAgICAgICAgICAgIDwvbGk+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2lkZWJhckxpKz1gPC91bD5gXHJcbiAgICAgICAgZG9tJiZkb20uYm9keU5hdi5odG1sKHNpZGViYXJMaSk7XHJcbiAgICAgICAgcmV0dXJuIHNpZGViYXJMaVxyXG5cclxuICAgICB9XHJcblxyXG5cclxuICAgIC8v5pG454mIXHJcbiAgICAvL+a4suafk+S4gOe6p+iPnOWNlVxyXG4gICAgZnVuY3Rpb24gbWFwVXBkYXRlTWFpbk5hdihtYXBEYXRhKXtcclxuICAgICAgICB2YXIgc2lkZWJhckxpPVwiXCJcclxuICAgICAgICAgIE9iamVjdC52YWx1ZXMobWFwRGF0YSkuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpZihpdGVtLnBhcmVudE1lbnVJZD09XCIwXCIpe1xyXG4gICAgICAgICAgICAgICAgc2lkZWJhckxpKz0gICBgPGxpIGNsYXNzPVwicy1pdGVtICR7aXRlbS5pc0FjdGl2ZT9gYWN0aXZlYDonJ31cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1ib3hcIj48aSBjbGFzcz1cIiR7aXRlbS5pbWFnZVBhdGh9XCI+PC9pPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWV1bi1uYW1lXCI+PGEgaHJlZj1cIiR7aXRlbS5sZWFmP1wiI1wiK2l0ZW0uaGFzaDpgamF2YXNjcmlwdDo7YH1cIiAgbWVudS1pZD0ke2l0ZW0ubWVudUlkfT4ke2l0ZW0ubmFtZX08L2E+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9saT5gXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gc2lkZWJhckxpXHJcbiAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gVGVtcGxhdGVNYXAobWFwRGF0YSxvcHRzKXtcclxuICAgICAgICBpZighbWFwRGF0YSl7XHJcbiAgICAgICAgICAgIG1hcERhdGE9W10gICAgXHJcbiAgICAgICAgfSAgIFxyXG5cclxuXHJcbiAgICAgICAgICAgIC8v5LiA57qn6I+c5Y2VXHJcbiAgICAgICAgICAgIHZhciBzaWRlYmFyTGk9bWFwVXBkYXRlTWFpbk5hdihtYXBEYXRhKTtcclxuICAgICAgICAgICAgLy/miZPlvIDlhajpg6jnmoToj5zljZVcclxuICAgICAgICAgICAgIHZhciBncm91cD1tYXBSZXNldE9wZW5NZW51TGlzdChtYXBEYXRhKTtcclxuICBcclxuICAgICAgICAgLy8gICBjb25zb2xlLmxvZyh2aXBzcGEuaW5kZXhJZClcclxuXHJcbiAgICAgICAgICAgIHZhciB0cGw9JChgPGRpdiBjbGFzcz1cInBsZy1zaWRlYmFyXCI+ICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW4tbmF2XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibWV1blNvcm9sbFwiIGNsYXNzPVwibGF5dWktc2lkZS1zY3JvbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy1sb2dvXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxvZ28tcGF0aCAke29wdHMubG9nbz09J3BsZycmJidwbGctbG9nbyd9XCIgPjwvYT4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgaWQ9XCJwbGctbG9nby1mb2xkXCIgY2xhc3M9XCJhbnRpY29uIGxheXVpLWljb24gbGF5dWktaWNvbi1zaHJpbmstcmlnaHRcIj48L2k+ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLSDlt6bkvqfmiZPlvIDlhajpg6jlr7zoiKrljLrln58gLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByLW9wZW5cIiBkYXRhLXR5cGU9XCJob290LWNsaWNrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1sYXllci1zZXR3aW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLWNsb3NlXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPjwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwci1zZWFyY2hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHItaWNvbi1zZWFyY2gtd3JhcHBlclwiPjxpIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLXNlYXJjaFxyXG4gICAgICAgICAgICBcIj48L2k+PC9zcGFuPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwic2VsZWN0SW5wdXRcIiBjbGFzcz1cInByLXNlYXJjaC1pbnB1dFwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5YWz6ZSu6K+NXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXRpcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzcGFuPuS7peS4i+aYr+S4juKAnDxzdHJvbmc+PC9zdHJvbmc+4oCd55u45YWz55qE5Lqn5ZOB77yaPC9zcGFuPjwvcD48L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImtleVVwTGlzdFwiIGNsYXNzPVwia2V5VXBMaXN0XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItbWV1bmdyb3VwLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIOWFqOmDqOiPnOWNleWIl+ihqC0tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHItcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY3JvbGwtbmF2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicmlnaHQtc2lkZWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtzaWRlYmFyTGl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3QtYWxsXCIgZGF0YS10eXBlPVwiaG9vdC1jbGlja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1ib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udCBwLWljb24tYWxsXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZXVuLW5hbWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj7miYDmnInmnI3liqE8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwicmlnaHQtbW92ZXIgbGF5dWktaWNvbiBsYXl1aS1pY29uLXJpZ2h0XHJcbiAgICAgICAgICAgIFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdi1sYXN0XCIgZGF0YS1zaG93PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBpZD1cInNpZGViYXJcIiBjbGFzcz1cInNpZGViYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLeS4gOe6p+iPnOWNlS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAke3NpZGViYXJMaX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdi1ob3Zlci1jaGlsZFwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSDkuoznuqfoj5zljZUgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1zaWRlXCI+ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSDlvZPliY1ob3ZlcuS6jOe6p+iPnOWNleWIl+ihqC0tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3ZpcHNwYS5pbmRleElkP21hcFVwZGF0ZUNoaWxkcmVuTmFuKHZpcHNwYS5pbmRleElkLG1hcERhdGEpOlwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGAgKTtcclxuICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgXHJcbiAgICAgICAgICB0cGwuZmluZChcIi5wci1tZXVuZ3JvdXAtbGlzdFwiKS5hcHBlbmQoZ3JvdXApOyAgICAgXHJcbiAgICAgICAgcmV0dXJuICQodHBsKVxyXG4gICAgICAgIFxyXG4gICAgIH1cclxuIFxyXG5cclxuXHJcbiAgICB2YXIgcGxnU2lkZWJhciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfdGhpcy5vcHRpb25zPW9wdGlvbnM7XHJcbiAgICAgICAgdmFyIGNvbmZpZz17XHJcbiAgICAgICAgICAgIHJlbmRlcmVyOm51bGwsXHJcbiAgICAgICAgICAgIHVybDpudWxsLFxyXG4gICAgICAgICAgICBhamF4SW5pdDp7XHJcbiAgICAgICAgICAgICAgICB1cmw6bnVsbCxcclxuICAgICAgICAgICAgICAgIHR5cGU6XCJnZXRcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsb2dvOlwiXCIsXHJcbiAgICAgICAgICAgIHJvdXRlOmZhbHNlLFxyXG4gICAgICAgICAgICBtZW51Q2xpY2s6bnVsbCxcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ojrflj5bmlbDmja7lhaXlj6NcclxuICAgICAgICBfdGhpcy5vcHRpb25zID0gJC5leHRlbmQodHJ1ZSwgY29uZmlnLCBfdGhpcy5vcHRpb25zKTtcclxuXHJcblxyXG4gICAgICAgIC8v6I635Y+W5pWw5o2uXHJcbiAgICAgICAgdmFyIGxvYWRkYXRhPUxvYWREYXRhLmNhbGwodGhpcyxfdGhpcy5vcHRpb25zLmFqYXhJbml0KTtcclxuICAgICAvLyAgIHZpcHNwYS50cmVlRGF0YSA9IGxvYWRkYXRhLnRyZWVEYXRhO1xyXG4gIFxyXG4gIFxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHZpcHNwYSwge1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIG1hcERhdGE6e1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIGxvYWRkYXRhLm1hcERhdGFcclxuICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgIHNldDpmdW5jdGlvbihuZXdWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXBzcGEuaW5kZXhJZCA9dmlwc3BhLnJvdXRlck1hcFt2aXBzcGEucGFyc2UobG9jYXRpb24uaGFzaCkudXJsXS5tZW51SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoIFwidmlwc3BhLnJvdXRlci5kZWZhdWx0czpoYXNoIG9mIGVycm9yXCIgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZG9jdW1lbnQgPSBUZW1wbGF0ZU1hcChuZXdWYWx1ZSxfdGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5pdChfdGhpcy5kb2N1bWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF90aGlzLm9wdGlvbnMucmVuZGVyZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXJUbyhfdGhpcy5vcHRpb25zLnJlbmRlcmVyKTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICBcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgIC8vIGxvYWRkYXRhLnRyZWVEYXRhW190aGlzLm9wdGlvbnMuaW5kZXhdLmlzQWN0aXZlPXRydWU7XHJcbiAgICAgIC8vIHZpcHNwYS50cmVlRGF0YT1sb2FkZGF0YS50cmVlRGF0YSA7XHJcbiAgICAgLy8gICB2aXBzcGEubWFwRGF0YT1sb2FkZGF0YS5tYXBEYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL+S6i+S7tuebkeWQrFxyXG4gICAgZnVuY3Rpb24gRXZlbnRIYW5sZGVyKGRvbSl7XHJcbiAgICAgICAgdmFyIF90aGlzPXRoaXNcclxuICAgICAgICB2YXIgb3B0cz10aGlzLm9wdGlvbnM7XHJcbiAgICAgLy8gICB2YXIgdHJlZURhdGE9IHZpcHNwYS50cmVlRGF0YTtcclxuICAgICAgICB2YXIgbWFwRGF0YT0gdmlwc3BhLm1hcERhdGE7XHJcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRvbS5tZXVuU29yb2xsLmhhc0NsYXNzKFwic2hvd0xpc3RcIikgJiYgcmVtb3ZlclNob3dMaXN0KGRvbS5tZXVuU29yb2xsKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAvL+aOp+WItuiPnOWNleWxleW8gOaUtue8qVxyXG4gICAgICAgICBkb20ubG9nb0ZvbGQuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwibGF5dWktaWNvbi1zaHJpbmstcmlnaHRcIikpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJsYXl1aS1pY29uLXNocmluay1yaWdodFwiKS5hZGRDbGFzcyhcImxheXVpLWljb24tc3ByZWFkLWxlZnRcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInBsZy1vcGVuLWhvdmVyXCIpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJsYXl1aS1pY29uLXNwcmVhZC1sZWZ0XCIpLmFkZENsYXNzKFwibGF5dWktaWNvbi1zaHJpbmstcmlnaHRcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInBsZy1vcGVuLWhvdmVyXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAvL+aOp+WItuiPnOWNlWhvdmVyXHJcbiAgICAgICAgZG9tLm5hdkxhc3QuaG92ZXIoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBpZD0gJCh0aGlzKS5maW5kKFwibGkucy1pdGVtLmFjdGl2ZSBhXCIpLmF0dHIoXCJtZW51LWlkXCIpO1xyXG4gICAgICAgICAgICBpZihpZCYmdmlwc3BhLm1hcERhdGFbaWRdLmxlYWYpe1xyXG4gICAgICAgICAgICAgICAgZG9tLm5hdkxhc3QuYXR0cihcImRhdGEtc2hvd1wiLCBcIlwiKVxyXG4gICAgICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHJlbW92ZXJTaG93TGlzdChkb20ubWV1blNvcm9sbCk7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtc2hvd1wiLCBcInNob3ctY2hpbGRcIik7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1zaG93XCIsIFwiXCIpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvL+aJk+W8gOaJgOacieiPnOWNleeCueWHu+S6i+S7tlxyXG4gICAgICAgIGRvbS5wckxlZnQub24oXCJjbGlja1wiLFwiLm1lbnUtdGV4dCA+IGFcIixmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICBsb2NhdGlvbi5oYXNoPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICB2YXIgaWQ9ICQodGhpcykuYXR0cihcIm1lbnUtaWRcIik7XHJcbiAgICAgICAgICAgIHZhciBwaWQ9ICQodGhpcykuYXR0cihcInBhcmVudG1lbnUtaWRcIik7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBmdW5jdGlvbiByZXN1bHQocGlkKXtcclxuICAgICAgICAgICAgICAgIHZhciBvYmo9bWFwRGF0YVtwaWRdXHJcbiAgICAgICAgICAgICAgICBpZihvYmoucGFyZW50TWVudUlkIT09XCIwXCIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0KG9iai5wYXJlbnRNZW51SWQpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgIFxyXG4gICAgICAgICAgICAgbWFwVXBkYXRlQ2hpbGRyZW5OYW4oaWQsbWFwRGF0YSxkb20pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgc2xmZT0gZG9tLmJvZHlOYXYuZmluZChgYVttZW51LWlkPScke2lkfSddYCk7XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAvLyBhcnIudW5zaGlmdChzbGZlLnRleHQoKS5yZXBsYWNlKC9bXFwgXFxyXFxuXS9nLFwiXCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2xmZS5wYXJlbnQoKS5pcyhcImRkXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hcnIudW5zaGlmdChzbGZlLnBhcmVudHMoXCJkbC5uYXYtY2hpbGRcIikucHJldigpLnRleHQoKS5yZXBsYWNlKC9bXFwgXFxyXFxuXS9nLFwiXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGZlLnBhcmVudHMoXCJsaS5pdGVtIFwiKS5hZGRDbGFzcyhcIml0ZW1lZHNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xmZS5wYXJlbnRzKFwiZGwubmF2LWNoaWxkXCIpLnNob3coKVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAvL2Fyci51bnNoaWZ0KHNsZmUucGFyZW50cyhcIi5ib2R5LW5hdlwiKS5hdHRyKFwibmFtZVwiKS5yZXBsYWNlKC9bXFwgXFxyXFxuXS9nLFwiXCIpKSAgXHJcbiAgICAgICAgICAgICAgICAgc2xmZS5wYXJlbnQoKS5hZGRDbGFzcyhcImFjdGl2ZS10aGlzXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmUtdGhpc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBwaWRcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGlkPXJlc3VsdChwaWQpO1xyXG4gICAgICAgICAgICByZW1vdmVyU2hvd0xpc3QoZG9tLm1ldW5Tb3JvbGwpO1xyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBcclxuICAgICAgICAvL+S4gOe6p+iPnOWNleS6i+S7tlxyXG4gICAgICAgIGRvbS5zaWRlYmFyLm9uKFwiY2xpY2tcIixcImxpXCIsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgIHZhciBpZD0gJCh0aGlzKS5maW5kKFwiYVwiKS5hdHRyKFwibWVudS1pZFwiKTtcclxuICAgICAgICAgICB2YXIgaT0kKHRoaXMpLmluZGV4KCk7XHJcbiAgICAgICAgICAvLyBkb20uc2lkZWJhci5lbXB0eSgpLmFwcGVuZCh1cGRhdGVNYWluTmF2KHRyZWVEYXRhKSlcclxuICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIG9wdHMuaW5kZXg9aTtcclxuICAgICAgICAgICBpZih2aXBzcGEubWFwRGF0YVtpZF0ubGVhZil7XHJcbiAgICAgICAgICAgIGRvbS5uYXZMYXN0LmF0dHIoXCJkYXRhLXNob3dcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2g9JCh0aGlzKS5maW5kKFwiYVwiKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgIH0gXHJcbiAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICBkb20ubmF2TGFzdC5hdHRyKFwiZGF0YS1zaG93XCIsXCJcIik7XHJcbiAgICAgICAgICAgbWFwVXBkYXRlQ2hpbGRyZW5OYW4oaWQsbWFwRGF0YSxkb20pO1xyXG4gICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICBkb20ubmF2TGFzdC5hdHRyKFwiZGF0YS1zaG93XCIsXCJzaG93LWNoaWxkXCIpO1xyXG4gICAgICAgICAgIH0sIDIwMClcclxuICAgICAgICAgICBcclxuICAgICAgICB9KSAgXHJcblxyXG4gICAgICAgICAgIC8v54K55Ye75LqM57qnaG92ZXLoj5zljZXkuovku7ZcclxuICAgICAgICBkb20uYm9keU5hdi5vbihcImNsaWNrXCIsIFwibGk+YVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8v6Zi75q2i5LqL5Lu25YaS5rOhXHJcbiAgICAgICAgICAgIHZhciBzbGZlID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgbGVhZiA9IChzbGZlLmF0dHIoXCJsZWFmXCIpKSA9PSBcInRydWVcIixcclxuICAgICAgICAgICAgY2hpbGQgPSBzbGZlLnNpYmxpbmdzKFwiZGwubmF2LWNoaWxkXCIpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNsZmUucGFyZW50KCkuYWRkQ2xhc3MoXCJhY3RpdmUtdGhpc1wiKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwiYWN0aXZlLXRoaXNcIikuZmluZCgnZGQnKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS10aGlzXCIpLnJlbW92ZUNsYXNzKFwiaXRlbWVkc1wiKTtcclxuICAgICAgICAgICAgb3B0cy5tZW51Q2xpY2smJm9wdHMubWVudUNsaWNrKHNsZmUpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoc2xmZS5wYXJlbnQoKS5pcyhcImRkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBzbGZlLnBhcmVudHMoXCJsaS5pdGVtXCIpLmFkZENsYXNzKFwiYWN0aXZlLXRoaXNcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZS10aGlzXCIpLnJlbW92ZUNsYXNzKFwiaXRlbWVkc1wiKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+WmguaenOaYr+S6jOe6p+iPnOWNlVxyXG4gICAgICAgICAgICBpZiAoIWxlYWYgJiYgY2hpbGQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2xmZS5wYXJlbnQoKS5hZGRDbGFzcyhcImFjdGl2ZS10aGlzXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmUtdGhpc1wiKS5yZW1vdmVDbGFzcyhcIml0ZW1lZHNcIilcclxuICAgICAgICAgICAgICAgIGNoaWxkLnNsaWRlVG9nZ2xlKFwiZmFzdFwiKTtcclxuICAgICAgICAgICAgICAgIHNsZmUucGFyZW50KCkudG9nZ2xlQ2xhc3MoXCJpdGVtZWRzXCIpLnNpYmxpbmdzKCkuY2hpbGRyZW4oJy5uYXYtY2hpbGQnKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5hdHRyKFwidGFyZ2V0XCIpPT1cIl9ibGFua1wiKXtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCAkKHRoaXMpLmF0dHIoXCJocmVmXCIpIT09XCJqYXZhc2NyaXB0OjtcIil7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICAgICAgICAvLyAgdmlwc3BhLmluZGV4SWQ9c2xmZS5hdHRyKFwibWVudS1pZFwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgIC8vICB2YXIgYXJyPVtdO2l0ZW1lZHNcclxuICAgICAgICAgIFxyXG4gICBcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgZG9tLm1ldW5Tb3JvbGwub24oXCJjbGlja1wiLCBcIltkYXRhLXR5cGU9J2hvb3QtY2xpY2snXVwiLGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8v6Zi75q2i5LqL5Lu25YaS5rOhXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBldmUgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInByb2R1Y3QtYWxsXCI6Ly/lhbPpl60g5bCPWFxyXG4gICAgICAgICAgICAgICAgZG9tLm1ldW5Tb3JvbGwudG9nZ2xlQ2xhc3MoXCJzaG93TGlzdFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInByLW9wZW5cIjovL+a7muWKqFxyXG4gICAgICAgICAgICAgICAgZXZlLnBhcmVudE5vZGUuY2xhc3NOYW1lID09IFwibGF5dWktbGF5ZXItc2V0d2luXCIgJiYgcmVtb3ZlclNob3dMaXN0KGRvbS5tZXVuU29yb2xsKTtcclxuICAgICAgICAgICAgICAgIHZhciBtZXVuVG9wID0gbWV1blRvcE9iaihkb20ubWV1bmdyb3VwTGlzdCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc0l0ZW0gPSAkKGV2ZSkucGFyZW50cyhcIi5zLWl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGhpc0hyZWYgPSBzSXRlbS5maW5kKFwiYVwiKS5hdHRyKFwibWVudS1pZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gZG9tLm1ldW5ncm91cExpc3QuZmluZChcIi5saXN0LWl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBzSXRlbS5hZGRDbGFzcyhcImFjdGl2ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygpIFxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgIGxpc3QuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKVswXS5pZCA9PSB0aGlzSHJlZiA/ICQodGhpcykuYWRkQ2xhc3MoXCJzZWxlY3RcIikgOiAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VsZWN0XCIpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWV1blRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoa2V5KSA9PSB0aGlzSHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnByLWxlZnRcIikuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG1ldW5Ub3Bba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+aQnOe0ouadoeS6i+S7tlxyXG4gICAgZnVuY3Rpb24gc2V0T3BlbktleXVwKGRvbSl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHJlZ0NIID0gbmV3IFJlZ0V4cChcIltcXFxcdTRFMDAtXFxcXHU5RkZGXStcIiwgXCJnXCIpO1xyXG4gICAgICAgICB2YXIga2V5VXBMaXN0ID1kb20ucHJMZWZ0LmZpbmQoXCIja2V5VXBMaXN0XCIpO1xyXG4gICAgICAgICB2YXIgbGlzdD1kb20ubWV1bmdyb3VwTGlzdC5maW5kKFwiLm1lbnUtdGV4dFwiKTtcclxuICAgICAgICAgIGRvbS5tZXVuU29yb2xsLmZpbmQoXCIjc2VsZWN0SW5wdXRcIikua2V5dXAoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHZhciB0aXAgPSAkKHRoaXMpLm5leHQoXCIuc2VhcmNoLXRpcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpcC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tLm1ldW5ncm91cExpc3Quc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleVVwTGlzdC5odG1sKFwiXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8v6L6T5YWl5qGG5Lit5rKh5pyJ5YaF5a6577yM5YiZ6YCA5Ye6XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgdGlwLnNob3coKS5maW5kKFwic3Ryb25nXCIpLnRleHQodmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBkb20ubWV1bmdyb3VwTGlzdC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAga2V5VXBMaXN0Lmh0bWwoXCJcIikuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGxpc3QuZWFjaChmdW5jdGlvbiAoaSwgaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gcmVnQ0gudGVzdCh2YWwpID8gJChpdGVtKS5maW5kKFwiYVwiKS50ZXh0KCkuaW5kZXhPZih2YWwpIDogJChpdGVtKS5hdHRyKFwicHktY29kZVwiKS5pbmRleE9mKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHIgPj0gMCAmJiAkKGl0ZW0pLmZpbmQoXCJhXCIpLmF0dHIoXCJsZWFmXCIpID09IFwidHJ1ZVwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlVcExpc3QuYXBwZW5kKGA8ZGl2IGNsYXNzPVwicHItbWV1bi1ncm91cFwiPjxkaXYgY2xhc3M9XCJsaXN0LWl0ZW1cIj4ke2l0ZW0ub3V0ZXJIVE1MfTwvZGl2PjwvZGl2PmApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIH07XHJcblxyXG4gICAgICAvL+iOt+WPluiPnOWNlXRvcOWAvFxyXG4gICAgZnVuY3Rpb24gbWV1blRvcE9iaiAobWV1bmdyb3VwTGlzdCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGxpc3QgPSBtZXVuZ3JvdXBMaXN0LmZpbmQoXCIubGlzdC1pdGVtXCIpO1xyXG4gICAgICAgICB2YXIgb2JqID0ge307XHJcbiAgICAgICAgbGlzdC5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gaXRlbS5pZDtcclxuICAgICAgICAgICAgb2JqW2tleV0gPSBwYXJzZUludChpdGVtLm9mZnNldFRvcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlclNob3dMaXN0KGRvbSxjbGFzc05hbWUpe1xyXG4gICAgICAgICAgICBpZighY2xhc3NOYW1lKXtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNob3dMaXN0XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcGxnU2lkZWJhci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChkb2N1bWVudCkge1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgJGRvbT17XHJcbiAgICAgICAgICAgIHNpZGViYXI6IGRvY3VtZW50LmZpbmQoXCIjc2lkZWJhclwiKSxcclxuICAgICAgICAgICAgbG9nb0ZvbGQ6IGRvY3VtZW50LmZpbmQoXCIjcGxnLWxvZ28tZm9sZFwiKSxcclxuICAgICAgICAgICAgbWV1blNvcm9sbDogZG9jdW1lbnQuZmluZChcIiNtZXVuU29yb2xsXCIpLFxyXG4gICAgICAgICAgICBuYXZMYXN0OiBkb2N1bWVudC5maW5kKFwiI21ldW5Tb3JvbGwgLm5hdi1sYXN0XCIpLFxyXG4gICAgICAgICAgICBib2R5TmF2OiBkb2N1bWVudC5maW5kKFwiLm5hdi1ob3Zlci1jaGlsZCAubGF5dWktc2lkZVwiKSxcclxuICAgICAgICAgICAgbWV1bmdyb3VwTGlzdDogZG9jdW1lbnQuZmluZChcIi5wci1tZXVuZ3JvdXAtbGlzdFwiKSxcclxuICAgICAgICAgICAgcHJMZWZ0OiBkb2N1bWVudC5maW5kKFwiLnByLWxlZnRcIiksXHJcbiAgICAgICAgICAgIG5hdl9ob3Zlcl9jaGlsZDogZG9jdW1lbnQuZmluZChcIi5uYXYtaG92ZXItY2hpbGRcIiksXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S6i+S7tuazqOWGjFxyXG4gICAgICAgIEV2ZW50SGFubGRlci5jYWxsKF90aGlzLCRkb20pO1xyXG4gICAgICAgIHNldE9wZW5LZXl1cCgkZG9tKVxyXG4gICAgICAgIHJldHVybiBfdGhpc1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAvL+eGj+afk+aooeadv+WIsOiKgueCuVxyXG4gICAgcGxnU2lkZWJhci5wcm90b3R5cGUucmVuZGVyVG8gPSBmdW5jdGlvbiAoZG9tSWQpIHtcclxuXHJcbiAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlbmRlcmVyPWRvbUlkO1xyXG4gICAgICAgICAgJChcIiNcIisgdGhpcy5vcHRpb25zLnJlbmRlcmVyKS5lbXB0eSgpLmFwcGVuZCh0aGlzLmRvY3VtZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgXHJcbiAgICAgLy/or7fmsYLmlbDmja5cclxuICAgICBmdW5jdGlvbiBMb2FkRGF0YShvYmplY3QpIHtcclxuICAgICAgICAgdmFyIF90aGlzPXRoaXM7XHJcbiAgICAgICAgIHZhciByb3V0ZVNldHRpbmc9e307XHJcbiAgICAgICAgdmFyIGNsb3NlPVBsZ0RpYWxvZy5sb2FkaW5nMigpO1xyXG4gICAgICAgIHZhciB0cmVlZGF0YTtcclxuICAgICAgICBvYmplY3Quc3VjY2Vzcz0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJlZWRhdGE9dG9UcmVlKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5ibGFuayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLlBZX2NvZGUgPSBwaW55aW4ubWFrZVB5KGl0ZW0ubmFtZSlbMF1cclxuICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0uaXNBY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5sZWFmJiZpdGVtLnBhdGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WOu+mmluWtl+avjVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOayoeaciemFjWhhc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWl0ZW0uaGFzaCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5oYXNoPWl0ZW0ucGF0aC5zdWJzdHIoMSkuc3BsaXQoXCIvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5oYXNoPWl0ZW0uaGFzaFtpdGVtLmhhc2gubGVuZ3RoLTJdK1wiL1wiK2l0ZW0uaGFzaFtpdGVtLmhhc2gubGVuZ3RoLTFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLmhhc2guaW5kZXhPZihcIj1cIikhPS0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhc2g9IGl0ZW0uaGFzaC5tYXRjaChcIihbXj1dKykkXCIpWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9OyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmo9cmVzdWx0TmFtZShpdGVtLm1lbnVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlU2V0dGluZ1tpdGVtLmhhc2hdPXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDppdGVtLmlmcmFtZT9pdGVtLnBhdGg6aXRlbS5wYXRoK1wiLmh0bWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZnJhbWU6aXRlbS5pZnJhbWV8fGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6aXRlbS5zcmNQYXRoP2l0ZW0uc3JjUGF0aCtcIi5qc1wiOm51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTppdGVtLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUlkOml0ZW0ubWVudUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudF9uYW1lOm9iai5hcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVBcnI6b2JqLmlkYXJyICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iaj1udWxsOyAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXN1bHROYW1lKG1pZCxhcnI9W10saWRhcnI9W10pe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXBEYXRhPSB0cmVlZGF0YS5tYXBEYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtPW1hcERhdGFbbWlkXTtcclxuICAgICAgICAgICAgICAgICAgICAgYXJyLnVuc2hpZnQoaXRlbS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgaWRhcnIudW5zaGlmdChpdGVtLm1lbnVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5wYXJlbnRNZW51SWQhPTApeyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0TmFtZShpdGVtLnBhcmVudE1lbnVJZCxhcnIsaWRhcnIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2FycjphcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkYXJyOmlkYXJyICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIC8v6Lev55Sx6YWN572uXHJcbiAgICAgICAgICAgICAgICAgICB2aXBzcGEucm91dGVyTWFwID1yb3V0ZVNldHRpbmcgXHJcbiAgICAgICAgICAgICAgICAgICAvL09iamVjdC5hc3NpZ24oIHZpcHNwYS5yb3V0ZXJNYXAscm91dGVTZXR0aW5nKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsYXllci5tc2coXCLmlbDmja7liqDovb3lpLHotKUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICxcclxuICAgICAgICBvYmplY3QuZXJyb3I9IGZ1bmN0aW9uIChYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBjbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUHJvbG9nLnN5bmNBamF4KG9iamVjdClcclxuICAgICAgICByZXR1cm4gdHJlZWRhdGFcclxuICAgIH07XHJcblxyXG4gICAgLy/ov5TliqDmoJHlnovnu5PmnoTlr7nosaFcclxuICAgIGZ1bmN0aW9uIHRvVHJlZShkYXRhKSB7XHJcbiAgICAgICAgLy8g5Yig6ZmkIOaJgOaciSBjaGlsZHJlbizku6XpmLLmraLlpJrmrKHosIPnlKhcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnR5cGU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnF1ZXJ5SWQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLm9wZXJhdGVUeXBlO1xyXG4gICAgICAgICAgICBkZWxldGUgaXRlbS5sYXN0TW9kaWZ5VGltZTtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0uaGVscENvZGU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLmNyZWF0b3JOYW1lO1xyXG4gICAgICAgICAgICBkZWxldGUgaXRlbS5jcmVhdG9ySWQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLmNyZWF0ZVRpbWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLm1vZGlmaWVySWQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLm1vZGlmaWVyTmFtZTtcclxuICAgICAgICAgICAgZGVsZXRlIGl0ZW0uc29ydDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5bCG5pWw5o2u5a2Y5YKo5Li6IOS7pSBtZW51SWQg5Li6IEtFWSDnmoQgbWFwIOe0ouW8leaVsOaNruWIl1xyXG4gICAgICAgIHZhciBtYXAgPSB7fTtcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgbWFwW2l0ZW0ubWVudUlkXSA9IGl0ZW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1hcERhdGE6bWFwXHJcblxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICB3aW5kb3cuUGxnU2lkZUFjY29yZGlvblJvdXRlID0gcGxnU2lkZWJhcjtcclxuXHJcbiAgICAkLmZuLmluaXRQbGdTaWRlQWNjb3JkaW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgLyogIHZhciBjbG9zZUxvYWQ9IGxvYWRpbmcoKTsgKi9cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBwbGdTaWRlYmFyKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxufSkoalF1ZXJ5KTsiLCI7XHJcbihmdW5jdGlvbiAoJCwgbGF5dWkpIHtcclxuXHJcbiAgICAvL1BsZ1RhYnMuanNcclxuICAgIGxheXVpLnVzZShbXCJlbGVtZW50XCJdLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBsYXl1aS5lbGVtZW50O1xyXG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IGZ1bmN0aW9uIChvcHRzKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2tpbkFyciA9IHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbDogXCJsYXl1aS10YWJcIixcclxuICAgICAgICAgICAgICAgIGJyaWVmOiBcImxheXVpLXRhYiBsYXl1aS10YWItYnJpZWZcIixcclxuICAgICAgICAgICAgICAgIGNhcmQ6IFwibGF5dWktdGFiIGxheXVpLXRhYi1jYXJkXCIsXHJcbiAgICAgICAgICAgICAgICBwbGd0YWJzOiBcImxheXVpLXRhYiBsYXl1aS10YWItYnJpZWYgcGxndGFicyBcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBpdGVtbGlzdCA9IGZ1bmN0aW9uIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBycCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGlueGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJwICs9IGA8bGkgbGF5LWlkID0gJHtpdGVtLmlkfSBjbGFzcz1cIiR7b3B0cy5pbmRleEFjdGl2ZT09PWlueGV4ID9cImxheXVpLXRoaXNcIjpcIlwifVwiID4ke2l0ZW0udGl0bGV9PC9saT5gO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmEgKz0gYDxkaXYgY2xhc3M9XCJsYXl1aS10YWItaXRlbSAgJHtvcHRzLmluZGV4QWN0aXZlPT09aW54ZXggP1wibGF5dWktc2hvd1wiOlwiXCJ9XCIgZGF0YS1mYWRlPVwiXCI+JHtpdGVtLnRlbXBsYXRlfTwvZGl2PmBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcnAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJhXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpdGVtbGlzdCA9IGl0ZW1saXN0KG9wdHMuY29udGVudCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2xvc2VCdG4gPSBgXHJcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInBsZy10YWItY2xvc2UtYWxsXCIgbGF5LWZpbHRlcj1cInBsZy10YWItY2xvc2UtYWxsXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBsZy10YWItY2xvc2UtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgY2xhc3M9XCJsYXl1aS1pY29uIGxheXVpLWljb24tbW9yZVwiPjwvYT5cclxuICAgICAgICAgICAgICAgICA8ZGwgY2xhc3M9XCJjaGlsZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGQ+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiPuWFs+mXreWFtuWug+agh+etvumhtTwvYT48L2RkPlxyXG4gICAgICAgICAgICAgICAgICA8ZGQ+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiPuWFs+mXreW9k+WJjeagh+etvumhtTwvYT48L2RkPlxyXG4gICAgICAgICAgICAgICAgICA8ZGQ+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiPuWFs+mXreaJgOacieagh+etvumhtTwvYT48L2RkPlxyXG4gICAgICAgICAgICAgICAgPC9kbD4gICBcclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+YDtcclxuXHJcbiAgICAgICAgICAgIHZhciB0cCA9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3NraW5BcnJbb3B0cy5za2luXX1cIiAke29wdHMuYWxsb3dDbG9zZT9gbGF5LWFsbG93Q2xvc2U9XCJ0cnVlXCJgOlwiXCJ9IFxyXG4gICAgICAgICAgICAgICAgICAgICR7b3B0cy5maWx0ZXI/YGxheS1maWx0ZXI9XCJgK29wdHMuZmlsdGVyK2BcImA6XCJcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtvcHRzLmNsb3NlQWxsP2Nsb3NlQnRuOlwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibGF5dWktdGFiLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktdGFiLWNvbnRlbnRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgIHJldHVybiAkKHRwKVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB2YXIgcGxnVGFicyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIF90aGlzLnByZUluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgIHZhciBjb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lOiAxMDAsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJlcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIGZpbHRlcjogXCJwbGdUYWJzLVwiICsgUHJvbG9nLmNyZWF0ZVJhbmRvbUlkKCksIC8v6YCJ5oup5ZmoXHJcbiAgICAgICAgICAgICAgICBpbmRleEFjdGl2ZTogMCxcclxuICAgICAgICAgICAgICAgIGNsb3NlQWxsOiBmYWxzZSwgLy/mmK/lkKbmmL7npLrlhbPpl63lhajpg6jmjInpkq5cclxuICAgICAgICAgICAgICAgIHNraW46IFwiYnJpZWZcIixcclxuICAgICAgICAgICAgICAgIGZhZGVJbjogZmFsc2UsIC8v5piv5ZCm5byA5ZCv5ruR5Yqo5YiH5o2iXHJcbiAgICAgICAgICAgICAgICBhbGxvd0Nsb3NlOiBmYWxzZSwgLy/mmK/lkKbluKbliKDpmaRcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFtcclxuICAgICAgICAgICAgICAgICAgICAvKiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTpudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6bnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOlwibGF5LVwiKyBQcm9sb2cuY3JlYXRlUmFuZG9tSWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDpudWxsICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGVsZSwgb3B0O1xyXG4gICAgICAgICAgICAvL+iOt+WPluaVsOaNruWFpeWPo1xyXG4gICAgICAgICAgICBvcHQgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0ID09PSBcIm9iamVjdFwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMub3B0cyA9ICQuZXh0ZW5kKHRydWUsIGNvbmZpZywgb3B0KTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldEVsZW1lbnQgPSB0ZW1wbGF0ZShfdGhpcy5vcHRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+aYvuekuuWPs+i+ueWPr+WFs+mXreaMiemSrlxyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLm9wdHMuY2xvc2VBbGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ2V0RWxlbWVudC5maW5kKFwiLnBsZy10YWItY2xvc2UtYWxsXCIpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKFwiLmNoaWxkXCIpLnNob3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZChcIi5jaGlsZFwiKS5oaWRlKClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ2V0RWxlbWVudC5maW5kKFwiLnBsZy10YWItY2xvc2UtYWxsIC5jaGlsZFwiKS5vbignY2xpY2snLCBcImRkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9hID0gJCh0aGlzKS5pbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2xpID0gJCh0aGlzKS5wYXJlbnRzKFwiLnBsZy10YWItY2xvc2UtYWxsXCIpLm5leHQoKS5jaGlsZHJlbignbGknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2xpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCR0aGlzLmluZGV4KCkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISR0aGlzLmhhc0NsYXNzKFwibGF5dWktdGhpc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2EgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRlbGV0ZVRhYnMoJHRoaXMuYXR0cihcImxheS1pZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2EgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRlbGV0ZVRhYnMoJHRoaXMuYXR0cihcImxheS1pZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZWxldGVUYWJzKCR0aGlzLmF0dHIoXCJsYXktaWRcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoXCIuY2hpbGRcIikuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90aGlzLm9wdHMucmVuZGVyZXIgJiYgX3RoaXMucmVuZGVyVG8odGhpcy5vcHRzLnJlbmRlcmVyKTtcclxuXHJcblxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwbGdUYWJzLnByb3RvdHlwZS5yZW5kZXJUbyA9IGZ1bmN0aW9uIChlbGUpIHtcclxuICAgICAgICAgICAgJChcIiNcIiArIGVsZSkuYXBwZW5kKHRoaXMuZ2V0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXNcclxuICAgICAgICAgICAgdGhpcy5vcHRzLmNvbnRlbnQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB5ZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5vcHRzLmluZGV4QWN0aXZlID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHllcyA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHllcylcclxuICAgICAgICAgICAgICAgIF90aGlzLmFkZFRhYnMoaXRlbSwgeWVzKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHZhciBvbGkgPSB0aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItdGl0bGUgPiBsaVwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgbGF5aWQgPSBvbGkuZXEoX3RoaXMub3B0cy5pbmRleEFjdGl2ZSkuYXR0cihcImxheS1pZFwiKTtcclxuICAgICAgICAgICAgX3RoaXMuY2hhbmdlVGFicyhsYXlpZCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVuZGVyKFwibmF2XCIpO1xyXG4gICAgICAgICAgICAvL+a4suafk+WIsOmhtemdolxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVuZGVyKFwidGFiXCIsIHRoaXMub3B0cy5maWx0ZXIpO1xyXG4gICAgICAgICAgICAvL+iuoeeul+aAu+WuveW6puW+l+WIsGxp55qE5pWw6YePXHJcbiAgICAgICAgICAgIHRoaXMub24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TnVtKHRpdGxlT2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IHRpdGxlT2JqLndpZHRoKCkgLSAxNTtcclxuICAgICAgICAgICAgdmFyIGNvdW50MDEgPSB0aXRsZU9iai5maW5kKFwibGlcIikuZXEoMCkub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICB2YXIgY291bnQwMiA9IHRpdGxlT2JqLnByZXYoKSA/IHRpdGxlT2JqLnByZXYoKS5vdXRlcldpZHRoKCkgOiAwO1xyXG4gICAgICAgICAgICB2YXIgbGl3ID0gMTQwO1xyXG4gICAgICAgICAgICB2YXIgbGlOdW0gPSBNYXRoLmZsb29yKGNvdW50IC0gY291bnQwMSAtIGNvdW50MDIpIC8gbGl3O1xyXG4gICAgICAgICAgICAvLy8gLy9jb25zb2xlLmxvZygnY291bnQgOicsTWF0aC5mbG9vcihsaU51bSkgKTtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobGlOdW0pXHJcbiAgICAgICAgfTtcclxuXHJcbiBcclxuXHJcbiAgICAgICAgdmFyIHBpbmRleCA9IC0xO1xyXG5cclxuICAgICAgICAvL+WKqOaAgea3u+WKoHRhYnNzXHJcbiAgICAgICAgcGxnVGFicy5wcm90b3R5cGUuYWRkVGFicyA9IGZ1bmN0aW9uIChvYmosIGJvb2xlKSB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZUxvYWQgPSBQbGdEaWFsb2cubG9hZGluZzIoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9iai50aXRsZSA9IGA8c3BhbiBjbGFzcz1cIm5hbWVcIj4ke29iai50aXRsZX08L3NwYW4+YFxyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYoIWJvb2xlKXtcclxuICAgICAgICAgICAgICAgIGJvb2xlPW51bGxcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGlzQ2hhbmdlID0gYm9vbGUgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8v5bCG5LiK5qyh55qE6YCJ5Lit55qE5LiL5qCH5a2Y5LiL5p2lICBcclxuICAgICAgICAgICAgdGhpcy5wcmVJbmRleCA9IHRoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLXRhYi10aXRsZSBsaS5sYXl1aS10aGlzXCIpLmluZGV4KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgb2xpID0gdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLXRpdGxlIGxpXCIpO1xyXG4gICAgICAgICAgICAvL+iOt+WPluW9k+WJjeeahGxp5pWw6YePXHJcbiAgICAgICAgICAgIHZhciBjdXJMaSA9IE51bWJlcihvbGkubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZWZpbmUgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogYDxzcGFuIGNsYXNzPVwibmFtZVwiPuaWsOagh+mimDwvc3Bhbj5gLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogXCJcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcImxheS1cIiArIFByb2xvZy5jcmVhdGVSYW5kb21JZCgpLFxyXG4gICAgICAgICAgICAgICAgaWZyYW1lOmZhbHNlLFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIGRlZmluZSwgb2JqKTtcclxuXHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKG9wdHMudXJsJiYhb3B0cy5pZnJhbWUpIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBQcm9sb2cuYWpheCh7XHJcblx0ICAgICAgICAgICAgICAgIHR5cGU6IFwiZ2V0XCIsXHJcblx0ICAgICAgICAgICAgICAgIHVybDogb3B0cy51cmwsXHJcblx0ICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImh0bWxcIixcclxuXHQgICAgICAgICAgICAgICAgc3VjY2VzczogcmVhbmRUcGwsXHJcblx0ICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoWE1MSHR0cFJlcXVlc3QsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcblx0ICAgICAgICAgICAgICAgICAgIGxheWVyLm1zZyhcIuaVsOaNruivt+axguWksei0pVwiKTtcclxuXHQgICAgICAgICAgICAgICAgICAgY2xvc2VMb2FkKClcclxuXHQgICAgICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKG9wdHMudGVtcGxhdGUmJiFvcHRzLmlmcmFtZSl7XHJcbiAgICAgICAgICAgICAgICByZWFuZFRwbChvcHRzLnRlbXBsYXRlKVxyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL2lmcmFtZeS4unRydWVcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG9wdHMudGVtcGxhdGU9YDxpZnJhbWUgY2xhc3M9XCJwbGctaWZyYW1lQ2xhc3NcIiBmcmFtZWJvcmRlcj1cIm5vXCIgc3JjPVwiJHtvcHRzLnVybH1cIj48L2lmcmFtZT5gXHJcbiAgICAgICAgICAgICAgICByZWFuZFRwbChvcHRzLnRlbXBsYXRlKVxyXG4gICAgICAgICAgICAgICAgY2xvc2VMb2FkKClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIF90aGlzLnByZUluZGV4ID0gcGluZGV4ID0gX3RoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLXRhYi10aXRsZT4ubGF5dWktdGhpc1wiKS5pbmRleCgpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlYW5kVHBsIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbnRlbnQ9ZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5lbGVtZW50LnRhYkFkZChfdGhpcy5vcHRzLmZpbHRlciwgb3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5nZSAmJiBfdGhpcy5jaGFuZ2VUYWJzKG9wdHMuaWQpO1xyXG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlLm5hbWUgKyBcIjogXCIgKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZS5zdGFjayk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICBfdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLWNvbnRlbnQgLmxheXVpLXRhYi1pdGVtXCIpLmF0dHIoXCJkYXRhLWZhZGVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBsaU51bSA9IGdldE51bShfdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLXRpdGxlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgKGN1ckxpID4gbGlOdW0gJiYgb2xpLmVxKDEpKSAmJiBfdGhpcy5kZWxldGVUYWJzKG9saS5lcSgxKS5hdHRyKFwibGF5LWlkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgY2xvc2VMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAvLyAgbGF5ZXIuY2xvc2UobG9hZGluZyk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/liIfmjaLliLDmjIflrpp0YWJzc1xyXG4gICAgICAgIHBsZ1RhYnMucHJvdG90eXBlLmNoYW5nZVRhYnMgPSBmdW5jdGlvbiAobGF5aWQsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaWRcclxuICAgICAgICAgICAgdmFyIHJlZyA9IC9eWzAtOV0rLj9bMC05XSokLztcclxuICAgICAgICAgICAgdmFyIGVsZU9ialxyXG4gICAgICAgICAgICBpZiAocmVnLnRlc3QobGF5aWQpKSB7XHJcbiAgICAgICAgICAgICAgICAvL+mAmui/h+S4i+agh+aJvuWIsGxheWlkXHJcbiAgICAgICAgICAgICAgICBlbGVPYmogPSB0aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItdGl0bGU+bGlcIikuZXEobGF5aWQpO1xyXG4gICAgICAgICAgICAgICAgaWQgPSBlbGVPYmouYXR0cihcImxheS1pZFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlkID0gbGF5aWQ7XHJcbiAgICAgICAgICAgICAgICBlbGVPYmogPSB0aGlzLmdldEVsZW1lbnQuZmluZChcIi5sYXl1aS10YWItdGl0bGU+bGlbbGF5LWlkPSdcIiArIGlkICsgXCInXVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBpbmRleCA9IHRoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLXRhYi10aXRsZT4ubGF5dWktdGhpc1wiKS5pbmRleCgpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudGFiQ2hhbmdlKHRoaXMub3B0cy5maWx0ZXIsIGlkKTtcclxuXHJcbiAgICAgICAgICAgIC8v6K6w5b2V5LiK5LiA5qyh5LiL5qCHXHJcbiAgICAgICAgICAgIHRoaXMucHJlSW5kZXggPSBwaW5kZXg7XHJcbiAgICAgICAgICAgIC8v5piv5ZCm5byA5ZCv5ruR5Yqo5YiH5o2iXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmZhZGVJbikge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudC5maW5kKFwiLmxheXVpLXRhYi1jb250ZW50ID4ubGF5dWktdGFiLWl0ZW1cIikuYXR0cihcImRhdGEtZmFkZVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBpdG1lID0gdGhpcy5nZXRFbGVtZW50LmZpbmQoXCIubGF5dWktdGFiLWNvbnRlbnQgPi5sYXl1aS10YWItaXRlbS5sYXl1aS1zaG93XCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXRtZS5pbmRleCgpID4gdGhpcy5wcmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCI9PlwiKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdG1lLmF0dHIoXCJkYXRhLWZhZGVcIiwgXCJsZWZ0XCIpOztcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0bWUuaW5kZXgoKSA9PSB0aGlzLnByZUluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiPD1cIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQudGFiQ2hhbmdlKHRoaXMub3B0cy5maWx0ZXIsIGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpdG1lLmF0dHIoXCJkYXRhLWZhZGVcIiwgXCJyaWdodFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXRtZS5hdHRyKFwiZGF0YS1mYWRlXCIsIFwiXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5vcHRzLnRpbWUpXHJcblxyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlbGVPYmopXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v5Yig6Zmk5oyH5a6adGFic3NcclxuICAgICAgICBwbGdUYWJzLnByb3RvdHlwZS5kZWxldGVUYWJzID0gZnVuY3Rpb24gKGxheWlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50YWJEZWxldGUodGhpcy5vcHRzLmZpbHRlciwgbGF5aWQpOyAvL+WIoOmZpO+8mlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICBwbGdUYWJzLnByb3RvdHlwZS5lbGVtZW50ID0gbGF5dWkuZWxlbWVudDtcclxuXHJcbiAgICAgICAgcGxnVGFicy5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGV2ZW50TmFtZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQub24oZXZlbnROYW1lICsgXCIoXCIgKyB0aGlzLm9wdHMuZmlsdGVyICsgXCIpXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wcmVJbmRleCA9IGRhdGEuaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQub24oXCJ0YWIoXCIgKyB0aGlzLm9wdHMuZmlsdGVyICsgXCIpXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucHJlSW5kZXggPSBkYXRhLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXNcclxuICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHdpbmRvdy5QbGdUYWJzID0gcGxnVGFicztcclxuXHJcbiAgICAgICAgJC5mbi5pbml0UGxnVGFicyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHBsZ1RhYnMob3B0aW9ucykucmVuZGVyVG8oaWQpO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbn0pKGpRdWVyeSwgbGF5dWkpOyIsIjtcbihmdW5jdGlvbiAoJCkge1xuXG4gICAgLy9QbGdadHJlZS5qc1xuXG5cbiAgICB2YXIgdHJlZSA9ICQuZm4uelRyZWU7XG5cbiAgICAgICAgIFxuICAgIHZhciBnZXREYXRhID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgICAgdmFyIGNsb3NlID0gUHJvbG9nLmxvYWRpbmcyKCk7XG4gICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgLy/phY3nva50cmVlXG4gICAgICAgIG9wdHMuc3VjY2Vzcz1mdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lj6rmiorniLboioLngrnmi7/lh7rmnaVcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gcmVzLmRhdGEubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmlzUGFyZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIubXNnKFwi5pWw5o2u5Yqg6L295aSx6LSlIVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xvc2UoKVxuICAgICAgICB9XG4gICAgICAgIG9wdHMuZXJyb3I9ZnVuY3Rpb24oKXsgICAgICBcbiAgICAgICAgICAgIGNsb3NlKClcbiAgICAgICAgIH1cbiAgICAgICAgUHJvbG9nLnN5bmNBamF4KG9wdHMpO1xuXG4gICAgICAgIHJldHVybiBvYmpcbiAgICB9XG5cbiAgICBcblxuXG4gICAgZnVuY3Rpb24gRXhwYW5kKGV2ZW50LCB0cmVlSWQsIHRyZWVOb2RlKSB7XG4gICAgICAgIC8v5aaC5p6c5piv5LiA57qn54i26I+c5Y2VXG4gICAgICAgIGNvbnNvbGUubG9nKHRyZWVJZClcbiAgICAgICAgaWYgKCF0cmVlTm9kZS50SWQpIHtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5nZXRaVHJlZU9iaih0cmVlSWQpO1xuICAgICAgICAgICAgdmFyIE5PZGVzID0gb2JqLmdldE5vZGVzKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gTk9kZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGQgPSBOT2Rlc1trZXldXG4gICAgICAgICAgICAgICAgaWYgKHRkLnRJZCAhPSB0cmVlTm9kZS50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmV4cGFuZE5vZGUodGQsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmV4cGFuZE5vZGUodGQsIHRydWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfVxuXG5cbiAgICB2YXIgcGxnWnRyZWUgPSBmdW5jdGlvbiAoZWxlLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgICAgICBpbml0QWpheDpudWxsLFxuICAgICAgICAgICAgc2tpbjogXCJcIixcbiAgICAgICAgICAgIHRvb2xCYXI6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbEJhcjI6e1xuICAgICAgICAgICAgICAgIGlzU2hvdzpmYWxzZSxcbiAgICAgICAgICAgICAgICBidG46bnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW5kZXJlcjogbnVsbCxcbiAgICAgICAgICAgIHNldERhdGE6bnVsbCxcbiAgICAgICAgICAgIGlzRXhwYW5kOmZhbHNlLFxuICAgICAgICAgICAgc2V0dGluZzoge1xuICAgICAgICAgICAgICAgIHRyZWVJZDogUHJvbG9nLmNyZWF0ZVJhbmRvbUlkKCksXG4gICAgICAgICAgICAgICAgdmlldzoge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE11bHRpOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzaW1wbGVEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZEtleTogXCJtZW51SWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBJZEtleTogXCJwYXJlbnRNZW51SWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RQSWQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdpZCcsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB7XG4gICAgICAgICAgICAgICAgIC8vIG9uRXhwYW5kOiBFeHBhbmQsXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGVsZSwgb3B0LCBvYmplY3Q7XG4gICAgICAgIC8v6I635Y+W5pWw5o2u5YWl5Y+jXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBvcHQgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIF90aGlzLm9wdHMgPSAkLmV4dGVuZCh0cnVlLCBjb25maWcsIG9wdCk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdC5zZXR0aW5nICYmIG9wdC5zZXR0aW5nLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0LnNldHRpbmcuY2FsbGJhY2sub25FeHBhbmQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3B0cy5zZXR0aW5nLmNhbGxiYWNrLm9uRXhwYW5kID0gZnVuY3Rpb24gKGV2ZW50LCB0cmVlSWQsIHRyZWVOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXhwYW5kLmJpbmQoX3RoaXMpKGV2ZW50LCB0cmVlSWQsIHRyZWVOb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHQuc2V0dGluZy5jYWxsYmFjay5vbkV4cGFuZChldmVudCwgdHJlZUlkLCB0cmVlTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgIGlmKCAhX3RoaXMub3B0cy5zZXREYXRlICYmX3RoaXMub3B0cy5pbml0QWpheCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIF90aGlzLm9wdHMuc2V0RGF0YSA9IGdldERhdGEoX3RoaXMub3B0cy5pbml0QWpheCk7XG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBlbGUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICBvcHQgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5vcHRzLnJlbmRlcmVyICYmIF90aGlzLnJlbmRlclRvKHRoaXMub3B0cy5yZW5kZXJlcilcblxuICAgICAgICAvL+axgueItue6p2RpdueahOmrmOW6puWAvFxuICAgIFxuICAgIFxuICAgICAgICBzZXRUaW1lb3V0KHdpbmRvdy5vbnJlc2l6ZT1mdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHBPYmo9ICQoXCIjXCIrX3RoaXMub3B0cy5yZW5kZXJlcik7XG4gICAgICAgICAgICB2YXIgdG9vbGJhckJ0bkhlaWdodD0wO1xuICAgICAgICAgICAgaWYoX3RoaXMudG9vbGJhckJ0bjIpe1xuICAgICAgICAgICAgICAgIHRvb2xiYXJCdG5IZWlnaHQ9IF90aGlzLnRvb2xiYXJCdG4yLmhlaWdodCgpO1xuXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcGFyZW50SGVpZ2h0PSBwYXJzZUludChwT2JqLnBhcmVudCgpLmhlaWdodCgpLXRvb2xiYXJCdG5IZWlnaHQpO1xuICAgICAgICAgICAgcE9iai5maW5kKFwiLnp0cmVlXCIpLmNzcyh7XCJ3aWR0aFwiOlwiMTAwJVwiLFwiaGVpZ2h0XCI6cGFyZW50SGVpZ2h0LFwib3ZlcmZsb3cteVwiOiBcImF1dG9cIixcInBhZGluZy1ib3R0b21cIjpcIjIwcHhcIn0pXG4gICAgICAgIH0sMClcbiAgICAgICAgXG4gICBcblxuICAgIH07XG5cbiAgICAvL+WFi+mahnRyZWUg55qE5pa55rOVXG4gICAgZm9yICh2YXIga2V5IGluIHRyZWUpIHtcbiAgICAgICAgcGxnWnRyZWUucHJvdG90eXBlW2tleV0gPSB0cmVlW2tleV07XG4gICAgfVxuXG4gICAgcGxnWnRyZWUucHJvdG90eXBlLnJlbmRlclRvID0gZnVuY3Rpb24gKGVsZSkge1xuICAgIFx0JChcIiNcIiArIGVsZSkuZW1wdHkoKTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5vcHRzLnNraW4gJiYgJChcIiNcIiArIGVsZSkuYWRkQ2xhc3ModGhpcy5vcHRzLnNraW4pO1xuXG4gICAgICAgIHZhciBvYmpVbCA9ICQoXCI8dWw+XCIsIHtcbiAgICAgICAgICAgIGNsYXNzOiBcInp0cmVlXCIsXG4gICAgICAgICAgICBpZDogX3RoaXMub3B0cy5zZXR0aW5nLnRyZWVJZFxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudHJlZU9iaiA9IHRoaXMuaW5pdChvYmpVbCwgdGhpcy5vcHRzLnNldHRpbmcsIHRoaXMub3B0cy5zZXREYXRhKTtcbiAgICAgICAgLy/pu5jorqTlsZXlvIDnrKzkuIDkuKroj5zljZVcbiAgICAgICAgdGhpcy5vcHRzLmlzRXhwYW5kJiYgdGhpcy50cmVlT2JqLmV4cGFuZE5vZGUodGhpcy50cmVlT2JqLmdldE5vZGVzKClbMF0sIHRydWUsIGZhbHNlLCB0cnVlLHRydWUpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdHMudG9vbEJhcikge1xuICAgICAgICAgICAgX3RoaXMudG9vbGJhckJ0biA9IGJ0bkdyb3VwKF90aGlzKTtcbiAgICAgICAgICAgICQoXCIjXCIgKyBlbGUpLmFwcGVuZChfdGhpcy50b29sYmFyQnRuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRzLnRvb2xCYXIyLmlzU2hvdyAmJiB0aGlzLm9wdHMudG9vbEJhcjIuYnRuJiZ0aGlzLm9wdHMudG9vbEJhcjIuYnRuLmxlbmd0aD4wKSB7XG4gICAgICAgICAgICBfdGhpcy50b29sYmFyQnRuMiA9IGJ0bkdyb3VwMihfdGhpcyk7XG4gICAgICAgICAgICAkKFwiI1wiICsgZWxlKS5hcHBlbmQoX3RoaXMudG9vbGJhckJ0bjIpO1xuICAgICAgICB9XG5cblxuICAgICAgICAgICAgJChcIiNcIiArIGVsZSkuYXBwZW5kKG9ialVsKTtcblxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfTtcbiAgICB2YXIgbmV3Q291bnQgPSAxO1xuXG4gICAvKiAgcGxnWnRyZWUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcblxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgLy8gIHZhciB0b29sYmFyQnRuID0gYnRuR3JvdXAoKTtcbiAgICAgICAgdmFyIHpUcmVlID0gdGhpcy50cmVlT2JqO1xuICAgICAgICBpZihldmVudE5hbWU9PVwiYWRkVHJlZU5vZGVDbGlja1wiKXtcbiAgICAgICAgICAgIHZhciBhZGRCdG4gPSB0aGlzLnRvb2xiYXJCdG4uY2hpbGRyZW4oKS5lcSgyKTtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGFkZEJ0bi5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBub2RlcyA9IHpUcmVlLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICAgIHZhciB0cmVlTm9kZSA9IG5vZGVzO1xuICAgICAgICAgICAgY2FsbGJhY2soZXZlbnQsIHpUcmVlLCB0cmVlTm9kZSlcblxuICAgICAgICB9KVxuXG4gICAgICAgIH1lbHNlIGlmKGV2ZW50TmFtZT09XCJkZWxUcmVlTm9kZUNsaWNrXCIpe1xuICAgICAgICAgICAgdmFyIGRlbEJ0biA9IHRoaXMudG9vbGJhckJ0bi5jaGlsZHJlbigpLmVxKDApO1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgZGVsQnRuLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIG5vZGVzID0gelRyZWUuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgdmFyIHRyZWVOb2RlID0gbm9kZXM7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudCwgelRyZWUsIHRyZWVOb2RlKTtcbiAgICAgICAgfSlcblxuICAgICAgICB9ZWxzZSBpZihldmVudE5hbWU9PVwiZWRpdFRyZWVOb2RlQ2xpY2tcIil7XG4gICAgICAgICAgICB2YXIgZGVsQnRuID0gdGhpcy50b29sYmFyQnRuLmNoaWxkcmVuKCkuZXEoMSk7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBkZWxCdG4uY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGVzID0gelRyZWUuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgICAgIHZhciB0cmVlTm9kZSA9IG5vZGVzO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50LCB6VHJlZSwgdHJlZU5vZGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICB9OyAqL1xuXG4gICAgdmFyIG5vZGVPYmogPSB7XG4gICAgICAgIGlkOiBQcm9sb2cuY3JlYXRlUmFuZG9tSWQoKSxcbiAgICAgICAgbmFtZTogXCLmlrDoj5zljZVcIixcbiAgICAgICAgc3lzdGVtSWQ6IG51bGwsXG4gICAgICAgIG1lbnVJZDogXCJtMDBcIiArIFByb2xvZy5jcmVhdGVSYW5kb21JZCgpLFxuICAgICAgICBwYXJlbnRNZW51SWQ6IG51bGwsXG4gICAgICAgIG9wZXJhdGVUeXBlOiAwLFxuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgZW5hYmxlOiB0cnVlLFxuICAgICAgICBsZWFmOiBmYWxzZSxcbiAgICAgICAgcGF0aDogXCJcIixcbiAgICAgICAgc29ydDogMCxcblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBidG5Hcm91cDIoX3RoaXMpe1xuICAgICAgICB2YXIgb2JqPV90aGlzLm9wdHMudG9vbEJhcjIuYnRuO1xuICAgICAgICB2YXIgYnRuID0gJChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sYmFyIGxheXVpLXJvdyBsYXl1aS1jb2wtc3BhY2UxMCBjbFwiPlxuICAgICAgICAgJHtvYmoubWFwKGZ1bmN0aW9uKGl0ZW0pe1xuXG4gICAgICAgICAgIHJldHVybmA8ZGl2IGNsYXNzPVwiaG9vayBsYXl1aS1jb2wtbWQkezEyL29iai5sZW5ndGh9XCI+XG4gICAgICAgICAgICA8YSBjbGFzcz1cImxheXVpLWJ0biAke2l0ZW0uc2tpbj9pdGVtLnNraW46Jyd9XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCIke2l0ZW0uaWNvbn1cIj48L2k+JHtpdGVtLnRleHR9PC9hPlxuICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgIH0pLmpvaW4oXCJcIil9ICAgXG4gICAgICAgIFxuICAgICAgPC9kaXY+YCk7XG4gICAgICB2YXIgelRyZWUgPSBfdGhpcy50cmVlT2JqO1xuXG4gICAgICBvYmouZm9yRWFjaChmdW5jdGlvbihpdGVtLGluZGV4KXtcbiAgICAgICAgYnRuLmZpbmQoXCIuaG9va1wiKS5lcShpbmRleCkuZmluZCgnYScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIG5vZGVzID0gelRyZWUuZ2V0U2VsZWN0ZWROb2RlcygpO1xuICAgICAgICAgICAgdmFyIHRyZWVOb2RlID0gbm9kZXM7XG4gICAgICAgICAgICBpdGVtLkV2ZW50Q2FsbGJhY2sgJiZpdGVtLkV2ZW50Q2FsbGJhY2soZXZlbnQsIHpUcmVlLCB0cmVlTm9kZSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgXG5cbiAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuIGJ0blxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnRuR3JvdXAoX3RoaXMpIHtcbiAgICBcbiAgICAgICAgICAgICAgICAgdmFyIGJ0biA9ICQoYFxuXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sYmFyIGxheXVpLXJvdyBsYXl1aS1jb2wtc3BhY2UxMCBjbFwiPlxuXG5cbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxheXVpLWNvbC1tZDRcIj5cbiAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsYXl1aS1idG4gbGF5dWktYnRuLXByaW1hcnlcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLWRlbGV0ZVwiPjwvaT7liKDpmaRcbiAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXl1aS1jb2wtbWQ0XCI+XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICA8YSBjbGFzcz1cImxheXVpLWJ0biBsYXl1aS1idG4tcHJpbWFyeVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiA+XG4gICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibGF5dWktaWNvbiBsYXl1aS1pY29uLWVkaXRcIj48L2k+57yW6L6RPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGF5dWktY29sLW1kNFwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxheXVpLWJ0biAgbGF5dWktYnRuLW5vcm1hbFwiICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImxheXVpLWljb24gbGF5dWktaWNvbi1hZGQtMVwiPjwvaT7lop7liqBcbiAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgIFxuICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICBgKTtcblxuICAgICAgICByZXR1cm4gYnRuXG4gICAgfVxuXG5cbiAgICAvL+a3u+WKoOiPnOWNlVxuICAgIGZ1bmN0aW9uIGFkZChldmVudCkge1xuICAgICAgICB2YXIgelRyZWUgPSB0aGlzLnRyZWVPYmo7XG4gICAgICAgIHZhciBub2RlcyA9IHpUcmVlLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgdmFyIHRyZWVOb2RlID0gbm9kZXNbMF07XG4gICAgICAgIG5vZGVPYmoucGFyZW50TWVudUlkID0gdHJlZU5vZGUubWVudUlkO1xuICAgICAgICB0cmVlTm9kZSA9IHpUcmVlLmFkZE5vZGVzKHRyZWVOb2RlLCBub2RlT2JqKTtcbiAgICAgICAgelRyZWUuc2VsZWN0Tm9kZSh0cmVlTm9kZVswXSk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWwoZXZlbnQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzKVxuICAgICAgICB2YXIgelRyZWUgPSB0aGlzLnRyZWVPYmo7XG5cbiAgICB9XG5cbiAgICB3aW5kb3cuUGxnWnRyZWUgPSBwbGdadHJlZVxuXG5cbn0pKGpRdWVyeSk7IiwiRGF0ZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKGZtdCkgeyAvL2F1dGhvcjogbWVpenogXHJcbiAgdmFyIG8gPSB7XHJcbiAgICBcIk0rXCI6IHRoaXMuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9IFxyXG4gICAgXCJkK1wiOiB0aGlzLmdldERhdGUoKSwgLy/ml6UgXHJcbiAgICBcImgrXCI6IHRoaXMuZ2V0SG91cnMoKSwgLy/lsI/ml7YgXHJcbiAgICBcIm0rXCI6IHRoaXMuZ2V0TWludXRlcygpLCAvL+WIhiBcclxuICAgIFwicytcIjogdGhpcy5nZXRTZWNvbmRzKCksIC8v56eSIFxyXG4gICAgXCJxK1wiOiBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6piBcclxuICAgIFwiU1wiOiB0aGlzLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSIFxyXG4gIH07XHJcbiAgaWYgKC8oeSspLy50ZXN0KGZtdCkpIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKHRoaXMuZ2V0RnVsbFllYXIoKSArIFwiXCIpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aCkpO1xyXG4gIGZvciAodmFyIGsgaW4gbylcclxuICAgIGlmIChuZXcgUmVnRXhwKFwiKFwiICsgayArIFwiKVwiKS50ZXN0KGZtdCkpIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKFJlZ0V4cC4kMS5sZW5ndGggPT0gMSkgPyAob1trXSkgOiAoKFwiMDBcIiArIG9ba10pLnN1YnN0cigoXCJcIiArIG9ba10pLmxlbmd0aCkpKTtcclxuICByZXR1cm4gZm10O1xyXG59O1xyXG5cclxuLy8g5aKe5by6Y29kZeeahOWBpeWjruaAp++8jOS4u+imgeaYr+WFtuS7lueUqOS4jeWIsGRodG1s5o+S5Lu255qE5paH5Lu277yM5LiN5YaN6ZyA6KaB5byV5YWl6L+Z5Liq5o+S5Lu25LqGXHJcbmlmKCEoIHR5cGVvZiBkaHRtbFhDYWxlbmRhck9iamVjdCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWRodG1sWENhbGVuZGFyT2JqZWN0KSl7XHRcdFxyXG4gIGRodG1sWENhbGVuZGFyT2JqZWN0LnByb3RvdHlwZS5sYW5nRGF0YVtcImNoXCJdID0ge1xyXG4gICAgZGF0ZWZvcm1hdDogJyVZLSVtLSVkJyxcclxuICAgIG1vbnRoZXNGTmFtZXM6IFtcIjHmnIhcIiwnMuaciCcsJzPmnIgnLFwiNOaciFwiLCc15pyIJywnNuaciCcsXCI35pyIXCIsJzjmnIgnLCc55pyIJyxcIjEw5pyIXCIsJzEx5pyIJywnMTLmnIgnXSxcclxuICAgIG1vbnRoZXNTTmFtZXM6IFtcIjHmnIhcIiwnMuaciCcsJzPmnIgnLFwiNOaciFwiLCc15pyIJywnNuaciCcsXCI35pyIXCIsJzjmnIgnLCc55pyIJyxcIjEw5pyIXCIsJzEx5pyIJywnMTLmnIgnXSxcclxuICAgIGRheXNGTmFtZXM6IFtcIuaYn+acn+WkqVwiLFwi5pif5pyf5LiAXCIsXCLmmJ/mnJ/kuoxcIixcIuaYn+acn+S4iVwiLFwi5pif5pyf5ZubXCIsXCLmmJ/mnJ/kupRcIixcIuaYn+acn+WFrVwiXSxcclxuICAgIGRheXNTTmFtZXM6IFtcIuaXpVwiLFwi5LiAXCIsXCLkuoxcIixcIuS4iVwiLFwi5ZubXCIsXCLkupRcIixcIuWFrVwiXSxcclxuICAgIHdlZWtzdGFydDpcIuWRqOaXpVwiLFxyXG4gICAgd2Vla25hbWU6IFwi5pif5pyfXCIsXHJcbiAgICB0b2RheTogXCLku4rlpKlcIixcclxuICAgIGNsZWFyOiBcIua4hemZpFwiXHJcbiAgfVxyXG4gIGRodG1sWENhbGVuZGFyT2JqZWN0LnByb3RvdHlwZS5sYW5nID0gXCJjaFwiO1xyXG59O1xyXG5cclxuXHJcblxyXG52YXIgUHJvbG9nID0ge307XHJcbnZhciBHcmlkQmFzZVBhdGg9XCIvcHJvbG9ndWkvY29tcG9uZW50cy9QbGdHcmlkL2NvZGViYXNlL2ltYWdlc1wiO1xyXG52YXIgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImF1dGhvcml6YXRpb25cIik7XHJcblxyXG4vL+iOt+WPluWFg+e0oOeahOe6teWdkOaghyBcclxuUHJvbG9nLmdldFRvcCA9IGZ1bmN0aW9uKGUpIHtcclxuXHR2YXIgb2Zmc2V0ID0gZS5vZmZzZXRUb3A7XHJcblx0aWYgKGUub2Zmc2V0UGFyZW50ICE9IG51bGwpIHtcclxuXHRcdG9mZnNldCArPSBQcm9sb2cuZ2V0VG9wKGUub2Zmc2V0UGFyZW50KTtcclxuXHR9XHJcblx0O1xyXG5cdHJldHVybiBvZmZzZXQ7XHJcbn1cclxuLy8g6I635Y+W5YWD57Sg55qE5qiq5Z2Q5qCHXHJcblByb2xvZy5nZXRMZWZ0ID0gZnVuY3Rpb24oZSkge1xyXG5cdHZhciBvZmZzZXQgPSBlLm9mZnNldExlZnQ7XHJcblx0aWYgKGUub2Zmc2V0UGFyZW50ICE9IG51bGwpIHtcclxuXHRcdG9mZnNldCArPSBQcm9sb2cuZ2V0TGVmdChlLm9mZnNldFBhcmVudCk7XHJcblx0fVxyXG5cdDtcclxuXHRyZXR1cm4gb2Zmc2V0O1xyXG59XHJcblxyXG5Qcm9sb2cuaGFzSnNvbiA9IGZ1bmN0aW9uKGpzb25BcnJheSxqc29uKXtcclxuXHRmb3IodmFyIGk9MDtpPGpzb25BcnJheS5sZW5ndGg7aSsrKXtcclxuXHRcdHZhciBiID0gdHJ1ZTtcclxuXHRcdGZvcih2YXIga2V5IGluIGpzb25BcnJheVtpXSl7XHJcblx0XHRcdFx0aWYoanNvbkFycmF5W2ldW2tleV0gIT0ganNvbltrZXldKXtcclxuXHRcdFx0XHRcdGIgPSBmYWxzZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmKGIpXHJcblx0XHRcdHJldHVybiBpO1xyXG5cdH1cclxuXHRyZXR1cm4gLTE7XHJcbn1cclxuXHJcblxyXG5Qcm9sb2cuYWpheCA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG5cdHZhciBwZGVmYXVsdCA9IHtcclxuXHRcdHRpbWVvdXQ6MzAwMDAsXHJcblx0XHRkYXRhVHlwZTpcImpzb25cIlxyXG5cdH1cclxuXHR2YXIgb3B0ID0gJC5leHRlbmQodHJ1ZSxwZGVmYXVsdCxvcHRpb25zKTtcclxuXHRvcHQuZXJyb3IgPSBmdW5jdGlvbihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pe1xyXG5cdFx0bGF5ZXIubXNnKHRleHRTdGF0dXMpO1xyXG5cdFx0aWYob3B0aW9ucy5lcnJvcilcclxuXHRcdFx0b3B0aW9ucy5lcnJvcihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pO1xyXG5cdH1cclxuXHRvcHQuYmVmb3JlU2VuZCA9IGZ1bmN0aW9uICh4aHIpIHtcclxuXHQgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIHRva2VuKTsgXHJcblx0ICAgICAgIGlmKG9wdGlvbnMuYmVmb3JlU2VuZCl7XHJcblx0ICAgIFx0ICAgb3B0aW9ucy5iZWZvcmVTZW5kKHhocik7XHJcblx0ICAgICAgIH1cclxuXHR9XHJcblx0JC5hamF4KG9wdCk7XHJcbn1cclxuXHJcblByb2xvZy5zeW5jQWpheCA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG5cdHZhciBwZGVmYXVsdCA9IHtcclxuXHRcdFx0dGltZW91dDozMDAwMFx0XHJcblx0XHR9XHJcblx0dmFyIG9wdCA9ICQuZXh0ZW5kKHRydWUsIHBkZWZhdWx0LCBvcHRpb25zKTtcclxuXHRvcHQuZXJyb3IgPSBmdW5jdGlvbihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pe1xyXG5cdFx0bGF5ZXIubXNnKHRleHRTdGF0dXMpO1xyXG5cdFx0aWYob3B0aW9ucy5lcnJvcilcclxuXHRcdFx0b3B0aW9ucy5lcnJvcihYTUxIdHRwUmVxdWVzdCwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pO1xyXG5cdH1cclxuXHRvcHQuYXN5bmMgPSBmYWxzZTtcclxuXHRvcHQuYmVmb3JlU2VuZCA9IGZ1bmN0aW9uICh4aHIpIHtcclxuXHQgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBdXRob3JpemF0aW9uXCIsIHRva2VuKTsgXHJcblx0ICAgICAgIGlmKG9wdGlvbnMuYmVmb3JlU2VuZCl7XHJcblx0ICAgIFx0ICAgb3B0aW9ucy5iZWZvcmVTZW5kKHhocik7XHJcblx0ICAgICAgIH1cclxuXHR9XHJcblx0ICAgXHJcblx0JC5hamF4KG9wdCk7XHJcbn1cclxuXHJcblByb2xvZy5nZXRGb3JtQnlJZCA9IGZ1bmN0aW9uKHN5c3RlbUlkLG1lbnVJZCxmb3JtSWQpIHtcclxuXHRcclxuXHR2YXIgbXlmb3JtID1udWxsO1xyXG5cdFxyXG5cdHZhciBkYXRhID0gUHJvbG9nLmdldEpzb25EYXRhKFwiL2phcGkvc3lzZm9ybTIvZm9ybVwiLFwiR0VUXCIse3N5c3RlbUlkOnN5c3RlbUlkLG1lbnVJZDptZW51SWQsZm9ybUlkOmZvcm1JZCxpZDpzeXN0ZW1JZCtcIl9cIittZW51SWQrXCJfXCIrZm9ybUlkfSk7XHJcblx0aWYoZGF0YSE9bnVsbCAmJiBkYXRhLnN1Y2Nlc3M9PXRydWUpe1xyXG5cdFx0XHJcblx0XHRpZihkYXRhLmRhdGEhPW51bGwgJiYgZGF0YS5kYXRhLmZpZWxkcyE9bnVsbCl7XHJcblx0XHRcdG15Zm9ybSA9IG5ldyBQcm9sb2dGb3JtKCk7XHJcblx0XHRcdHZhciBmb3JtZGF0YSA9IEpTT04ucGFyc2UoZGF0YS5kYXRhLmZpZWxkcyk7XHJcblx0XHRcdG15Zm9ybS5pbml0KGZvcm1kYXRhKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsYXllci5tc2coXCLmnKrlrprkuYnooajljZXlhoXlrrlcIik7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblx0cmV0dXJuIG15Zm9ybTtcclxufTtcclxuXHJcblByb2xvZy5jcmVhdGVSYW5kb21JZCA9IGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkrTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cigyLDUpO1xyXG59XHJcblxyXG5Qcm9sb2cubG9hZGluZyA9IGZ1bmN0aW9uKGVsKXtcclxuICAgIFxyXG5cdHZhciBsb2FkaW5nID0gUGxnRGlhbG9nLmxvYWRpbmcoKTtcclxuXHQvL2xheXVpLWxheWVyMTRcclxuXHQkKFwiI2xheXVpLWxheWVyLXNoYWRlXCIrbG9hZGluZykuYXBwZW5kVG8oXCIjXCIrZWwpO1xyXG5cdCQoXCIjbGF5dWktbGF5ZXJcIitsb2FkaW5nKS5hcHBlbmRUbyhcIiNcIitlbCk7XHJcblx0JChcIiNsYXl1aS1sYXllclwiK2xvYWRpbmcpLmNzcyhcImxlZnRcIixcIjUwJVwiKTtcclxuXHQkKFwiI2xheXVpLWxheWVyXCIrbG9hZGluZykuY3NzKFwibWFyZ2luLWxlZnRcIixcIi05MHB4XCIpO1xyXG5cdCQoXCIjbGF5dWktbGF5ZXJcIitsb2FkaW5nKS5jc3MoXCJ0b3BcIiwyMDArXCJweFwiKTtcclxuXHRyZXR1cm4gbG9hZGluZztcclxufVxyXG5cclxuUHJvbG9nLmNsb3NlTG9hZGluZyA9IGZ1bmN0aW9uKGlkKXtcclxuXHRsYXllci5jbG9zZShpZCk7XHJcbn1cclxuXHJcblByb2xvZy5sb2FkaW5nMj1mdW5jdGlvbigpIHtcclxuICAgIHZhciBpbmRleCA9IFBsZ0RpYWxvZy5sb2FkKDIsIHtcclxuICAgICAgICBzaGFkZTogWzAuNiwgJyNmZmYnXSAvLzAuMemAj+aYjuW6pueahOeZveiJsuiDjOaZr1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgUGxnRGlhbG9nLmNsb3NlKGluZGV4KVxyXG4gICAgfVxyXG59XHJcblxyXG4vKlxyXG4qIEBtZXRob2Qg5Yig6ZmkIFBsZ0dyaWQg6KGM5pWw5o2uXHJcbiogQHBhcmFtIGdyaWQgLSBncmlk5o6n5Lu2XHJcbiogQHBhcmFtIHVybCB7c3RyaW5nfSAtIOaVsOaNruaOpeWPo+WcsOWdgFxyXG4qIEBwYXJhbSB0eXBlIHtzdHJpbmd9IC0g5pWw5o2u5o6l5Y+j6K+35rGC57G75Z6L77yM5Li656m65pe26buY6K6kcG9zdFxyXG4qIEBwYXJhbSBjb250ZW50dHlwZSB7c3RyaW5nfSAtIOaVsOaNruaOpeWPo+ivt+axgiBjb250ZW50VHlwZSDnsbvlnovvvIzkuLrnqbrml7bpu5jorqRhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcclxuKiBAcGFyYW0gcGFyYW0ge29iamVjdH0gLSDor7fmsYLlj4LmlbDlkI0ge1wiaWRcIjowfVxyXG4qIEBhdXRob3Igaml3XHJcbiogQGRlcHJlY2F0ZWQg5Yig6ZmkUGxnR3JpZOmAieS4reihjOaVsOaNru+8jOWIoOmZpOaIkOWKn+WQjnJlbG9hZFxyXG4qL1xyXG5cclxuUHJvbG9nLmRlbEdyaWRSb3dEYXRhID0gZnVuY3Rpb24gKGdyaWQsdXJsLHR5cGUsY29udGVudHR5cGUscGFyYW0sbXVsdGlzZWxlY3Qpe1xyXG4gICAgaWYobXVsdGlzZWxlY3Q9PT1mYWxzZSkge1xyXG4gICAgICAgIGlmIChncmlkLmdldFNlbGVjdGVkUm93SWQoKSA9PSBudWxsICYmIHBhcmFtLmxlbmd0aDwxKSB7XHJcbiAgICAgICAgICAgIFBsZ0RpYWxvZy5tc2coXCLor7fpgInmi6nooYwhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgaWYoZ3JpZC5nZXRDaGVja2VkSWRzKCkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBQbGdEaWFsb2cubXNnKFwi6K+36YCJ5oup6KGMIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBQbGdEaWFsb2cuY29uZmlybSgn5piv5ZCm5Yig6Zmk5ZCX77yfJywge1xyXG4gICAgICAgIHRpdGxlOiAn5Yig6Zmk5o+Q56S6JyxcclxuICAgICAgICBidG46IFsn56Gu5a6aJywgJ+WPlua2iCddLFxyXG4gICAgICAgIHpJbmRleDpsYXllci56SW5kZXhcclxuICAgIH0sIGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIFBsZ0RpYWxvZy5jbG9zZShpbmRleCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlPT09XCJcIikgdHlwZT1cInBvc3RcIjtcclxuICAgICAgICBpZiAoY29udGVudHR5cGU9PT1cIlwiKSBjb250ZW50dHlwZT1cImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiO1xyXG5cclxuICAgICAgICBsYXllci5tc2coXCLmlbDmja7lpITnkIbkuK0uLi5cIik7XHJcbiAgICAgICAgUHJvbG9nLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6dXJsLFxyXG4gICAgICAgICAgICB0eXBlOnR5cGUsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBjb250ZW50dHlwZSxcclxuICAgICAgICAgICAgZGF0YTpwYXJhbSxcclxuICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRpZih0eXBlb2YgZGF0YSAhPSBcIm9iamVjdFwiKSBkYXRhPUpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLnN1Y2Nlc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY2xvc2VBbGwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLG9mZnNldDogXCJhdXRvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLGlkOiAnbGF5ZXJFcnJvcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgLGFyZWE6W1wiNTAwcHhcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLHRpdGxlOlwi6ZSZ6K+v5o+Q56S6XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLGNvbnRlbnQ6ICc8ZGl2IHN0eWxlPVwicGFkZGluZzogMTBweDtcIj4nKyQucGFyc2VKU09OKGRhdGEpLm1lc3NhZ2UrJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgLGJ0bjogJ+WFs+mXrSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLGJ0bkFsaWduOiAncidcclxuICAgICAgICAgICAgICAgICAgICAgICAgLHNoYWRlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICx5ZXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jbG9zZUFsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKCl7IH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufSIsImxheXVpLmRlZmluZSgnZm9ybScsIGZ1bmN0aW9uIChleHBvcnRzKSB7XHJcbiAgdmFyICQgPSBsYXl1aS4kLFxyXG4gICAgZm9ybSA9IGxheXVpLmZvcm0sXHJcbiAgICBoaW50ID0gbGF5dWkuaGludCgpLFxyXG4gICAgLy8g5a2X56ym5bi46YePXHJcbiAgICBNT0RfTkFNRSA9ICdzZWxlY3RQbHVzJyxcclxuICAgIFNFTEVDVCA9ICdsYXl1aS1mb3JtLXNlbGVjdCcsXHJcbiAgICBTRUxFQ1RFRCA9ICdsYXl1aS1mb3JtLXNlbGVjdGVkJyxcclxuXHJcbiAgICBzZWxlY3RQbHVzID0ge1xyXG4gICAgICBpbmRleDogbGF5dWkuc2VsZWN0UGx1cyA/IGxheXVpLnNlbGVjdFBsdXMuaW5kZXggOiAwLFxyXG5cclxuICAgICAgLy8g6K6+572u5YWo5bGA6aG5XHJcbiAgICAgIHNldDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC5jb25maWcgPSAkLmV4dGVuZCh7fSwgdGhhdC5jb25maWcsIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g5LqL5Lu255uR5ZCsXHJcbiAgICAgIG9uOiBmdW5jdGlvbiAoZXZlbnRzLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBsYXl1aS5vbmV2ZW50LmNhbGwodGhpcywgTU9EX05BTUUsIGV2ZW50cywgY2FsbGJhY2spO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaTjeS9nOW9k+WJjeWunuS+i1xyXG4gICAgdGhpc0lucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgIG9wdGlvbnMgPSB0aGF0LmNvbmZpZztcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8g6I635Y+W5pWw5o2uXHJcbiAgICAgICAgZ2V0Q2hlY2tlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoYXQuZ2V0Q2hlY2tlZC5jYWxsKHRoYXQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g6YWN572u5pWw5o2uXHJcbiAgICAgICAgY29uZmlnOiBvcHRpb25zXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g5p6E6YCg5ZmoXHJcbiAgICBDbGFzcyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgdGhhdC5pbmRleCA9ICsrc2VsZWN0UGx1cy5pbmRleDtcclxuICAgICAgdGhhdC5jb25maWcgPSAkLmV4dGVuZCh7fSwgdGhhdC5jb25maWcsIHNlbGVjdFBsdXMuY29uZmlnLCBvcHRpb25zKTtcclxuICAgICAgdGhhdC5yZW5kZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5riy5p+TaW5wdXRUYWdzXHJcbiAgICByZW5kZXJJbnB1dFRhZ3MgPSBmdW5jdGlvbihlbCwgZGF0YSl7XHJcbiAgICAgIFxyXG4gICAgICB2YXIgdGVtU3RyID0gJyc7XHJcbiAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbih2YWwpe1xyXG4gICAgICAgIHRlbVN0ciArPSBgPHNwYW4+XHJcbiAgICAgICAgICA8ZW0+JHt2YWx9PC9lbT5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIj7DlzwvYnV0dG9uPlxyXG4gICAgICAgIDwvc3Bhbj5gO1xyXG4gICAgICAgIFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoZWwpLnNpYmxpbmdzKCcucGxnLXNlbGVjdC10YWdzJykuaHRtbCh0ZW1TdHIpO1xyXG4gICAgfTtcclxuXHJcbiAgLy/pu5jorqTphY3nva5cclxuICBDbGFzcy5wcm90b3R5cGUuY29uZmlnID0ge1xyXG4gICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgIHZhbHVlU2VwYXJhdG9yOiAnLycsXHJcbiAgICBsYWJlbFNlcGFyYXRvcjogJyAgLS0tICAnLFxyXG5cclxuICAgIGRhdGE6IFtdLFxyXG4gICAgdmFsdWVOYW1lOiAndGl0bGUnLFxyXG4gICAgbGFiZWw6IFtdLFxyXG4gICAgdmFsdWVzOiBbXSxcclxuXHJcbiAgICB1cmw6ICcnLFxyXG4gICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgIHdoZXJlOiAnJyxcclxuICAgIGNvbnRlbnRUeXBlOiAnJyxcclxuICAgIGhlYWRlcnM6ICcnLFxyXG4gICAgcmVzcG9uc2U6ICdkYXRhJyxcclxuICAgIHBhcnNlRGF0YTogbnVsbCxcclxuXHJcbiAgICBjb25maWc6IHtcclxuICAgICAgY2hlY2tlZE5hbWU6ICdTRUxFQ1RQTFVTX0NIRUNLRUQnLFxyXG4gICAgICBpbmRleE5hbWU6ICdTRUxFQ1RQTFVTX0lOREVYJ1xyXG4gICAgfSxcclxuXHJcbiAgICBlcnJvcjogJydcclxuXHJcbiAgfTtcclxuICAvL+a4suafk+inhuWbvlxyXG4gIENsYXNzLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgIG9wdGlvbnMgPSB0aGF0LmNvbmZpZztcclxuICAgIFxyXG4gICAgdHlwZW9mIChvcHRpb25zLmVsKSA9PT0gJ3N0cmluZycgPyBvcHRpb25zLmVsID0gJChvcHRpb25zLmVsKTogb3B0aW9ucy5lbDtcclxuICAgIC8vIOa4suafk+WFg+e0oFxyXG4gICAgb3B0aW9ucy5yZUVsZW0gPSAkKCc8ZGl2IGNsYXNzPVwibGF5dWktdW5zZWxlY3QgbGF5dWktZm9ybS1zZWxlY3RcIj4nICtcclxuICAgICAgJzxkaXYgY2xhc3M9XCJsYXl1aS1zZWxlY3QtdGl0bGVcIj4nICtcclxuICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi6K+36YCJ5oupXCIgdmFsdWU9XCJcIiByZWFkb25seT1cIlwiIGNsYXNzPVwibGF5dWktaW5wdXQgbGF5dWktdW5zZWxlY3RcIj4nICtcclxuICAgICAgJzxpIGNsYXNzPVwibGF5dWktZWRnZVwiPjwvaT4nICtcclxuICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAnPGRsIGNsYXNzPVwibGF5dWktYW5pbSBsYXl1aS1hbmltLXVwYml0XCI+JyArXHJcbiAgICAgICc8ZGQgbGF5LXZhbHVlPVwiXCIgY2xhc3M9XCJsYXl1aS1zZWxlY3QtdGlwcyBsYXl1aS1oaWRlXCI+6K+36YCJ5oupPC9kZD4nICtcclxuICAgICAgJzwvZGw+JyArXHJcbiAgICAgICc8L2Rpdj4nKTtcclxuXHJcbiAgICAvLyDkuovku7ZcclxuICAgIG9wdGlvbnMucmVFbGVtLmZpbmQoJy5sYXl1aS1zZWxlY3QtdGl0bGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAhJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcyhTRUxFQ1RFRCkgPyAkKGRvY3VtZW50KS5maW5kKCcuJyArIFNFTEVDVCkucmVtb3ZlQ2xhc3MoU0VMRUNURUQpIDogXCJcIjtcclxuICAgICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcyhTRUxFQ1RFRCk7XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICgkKGUudGFyZ2V0KS5wYXJlbnRzKCcuJyArIFNFTEVDVCkubGVuZ3RoIDw9IDApICYmIChvcHRpb25zLnJlRWxlbS5oYXNDbGFzcyhTRUxFQ1RFRCkpID8gb3B0aW9ucy5yZUVsZW0ucmVtb3ZlQ2xhc3MoU0VMRUNURUQpOiBcIlwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgIUFycmF5LmlzQXJyYXkob3B0aW9ucy52YWx1ZXMpID8gb3B0aW9ucy52YWx1ZXMgPSBbb3B0aW9ucy52YWx1ZXNdIDogXCJcIjtcclxuXHJcbiAgICAvLyDmn6Xmib4g6KGo5Y2V55qEIGZpbHRlclxyXG4gICAgb3B0aW9ucy5maWx0ZXIgPSBvcHRpb25zLmVsLnBhcmVudHMoJy5sYXl1aS1mb3JtJykuYXR0cignbGF5LWZpbHRlcicpO1xyXG5cclxuICAgIG9wdGlvbnMuZWwuYXBwZW5kKG9wdGlvbnMucmVFbGVtKTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy51cmwpIHsgLy8g6I635Y+W5ZCO56uv5pWw5o2uXHJcbiAgICAgIHRoaXMucHVsbERhdGEoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoYXQucmVuZGVyRGF0YSgpOyAvLyDmlbDmja7muLLmn5NcclxuICAgIH1cclxuXHJcbiAgICBvcHRpb25zLmVsLm9uKCdjbGljaycsICcubGF5dWktc2VsZWN0LXRpdGxlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygn5Zyo5q2k5aSE5byA5aeLJylcclxuICAgICAgdmFyICR0aXRsZSA9ICQodGhpcyksXHJcbiAgICAgICAgJGRkMCA9ICR0aXRsZS5uZXh0KCkuZmluZCgnZGQnKS5lcSgwKTtcclxuXHJcbiAgICAgIGlmICghJGRkMC5oYXNDbGFzcygnbGF5dWktaGlkZScpKSB7XHJcbiAgICAgICAgJGRkMC5hZGRDbGFzcygnbGF5dWktaGlkZScpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAkdGl0bGUuZmluZCgnaW5wdXQnKS52YWwob3B0aW9ucy52YWx1ZXMuam9pbihvcHRpb25zLnZhbHVlU2VwYXJhdG9yKSk7XHJcbiAgICB9KVxyXG5cclxuICB9XHJcblxyXG4gIENsYXNzLnByb3RvdHlwZS5wdWxsRGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcyxcclxuICAgICAgb3B0aW9ucyA9IHRoYXQuY29uZmlnO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogb3B0aW9ucy5tZXRob2QgfHwgJ2dldCcsXHJcbiAgICAgIHVybDogb3B0aW9ucy51cmwsXHJcbiAgICAgIGNvbnRlbnRUeXBlOiBvcHRpb25zLmNvbnRlbnRUeXBlLFxyXG4gICAgICBkYXRhOiBvcHRpb25zLndoZXJlIHx8IHt9LFxyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMgfHwge30sXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAvL+WmguaenOacieaVsOaNruino+aekOeahOWbnuiwg++8jOWImeiOt+W+l+WFtui/lOWbnueahOaVsOaNrlxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5wYXJzZURhdGEgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIHJlcyA9IG9wdGlvbnMucGFyc2VEYXRhKHJlcykgfHwgcmVzW29wdGlvbnMucmVzcG9uc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlpoLmnpzmmK/mlbDnu4TvvIzliJnopobnm5ZvcHRpb25zLmRhdGFcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpKSB7XHJcbiAgICAgICAgICBvcHRpb25zLmRhdGEgPSB0aGF0LmZvcm1hdERhdGEocmVzKTtcclxuICAgICAgICAgIG9wdGlvbnMuZXJyb3IgPSAnJztcclxuICAgICAgICAgIHRoYXQucmVuZGVyRGF0YSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvcHRpb25zLmVycm9yID0gJ+aVsOaNruagvOW8j+S4jeWvuSc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKGUsIG0pIHtcclxuICAgICAgICBvcHRpb25zLmVycm9yID0gJ+aVsOaNruaOpeWPo+ivt+axguW8guW4uO+8micgKyBtO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvLyDmoLzlvI/ljJbmlbDmja5cclxuICBDbGFzcy5wcm90b3R5cGUuZm9ybWF0RGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXMsXHJcbiAgICAgIG9wdGlvbnMgPSB0aGF0LmNvbmZpZyxcclxuICAgICAgdmFsdWVOYW1lID0gb3B0aW9ucy52YWx1ZU5hbWUsXHJcbiAgICAgIHZhbHVlcyA9IG9wdGlvbnMudmFsdWVzLFxyXG4gICAgICBjaGVja2VkTmFtZSA9IG9wdGlvbnMuY29uZmlnLmNoZWNrZWROYW1lLFxyXG4gICAgICBpbmRleE5hbWUgPSBvcHRpb25zLmNvbmZpZy5pbmRleE5hbWU7XHJcblxyXG4gICAgbGF5dWkuZWFjaChkYXRhLCBmdW5jdGlvbiAoaSwgaXRlbSkge1xyXG4gICAgICBpZiAodHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgZGF0YVtpXSA9IHtcclxuICAgICAgICAgIHRpdGxlOiBpdGVtXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGRhdGFbaV1baW5kZXhOYW1lXSA9IGk7XHJcbiAgICAgIGlmICghZGF0YVtpXVtjaGVja2VkTmFtZV0pIGRhdGFbaV1bY2hlY2tlZE5hbWVdID0gZmFsc2U7XHJcbiAgICAgIGxheXVpLmVhY2godmFsdWVzLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKGRhdGFbaV1bdmFsdWVOYW1lXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgIGRhdGFbaV1bY2hlY2tlZE5hbWVdID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICAgIHZhbHVlcy5zcGxpY2UoMCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8g5riy5p+T5pWw5o2uXHJcbiAgQ2xhc3MucHJvdG90eXBlLnJlbmRlckRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICBvcHRpb25zID0gdGhhdC5jb25maWcsXHJcbiAgICAgIHR5cGUgPSBvcHRpb25zLnR5cGUsXHJcbiAgICAgIGlkID0gdGhhdC5pbmRleCxcclxuICAgICAgZGF0YSA9IGRhdGEgPyB0aGF0LmZvcm1hdERhdGEoZGF0YSkgOiB0aGF0LmZvcm1hdERhdGEob3B0aW9ucy5kYXRhKSxcclxuXHJcbiAgICBpdGVtcyA9IHtcclxuXHJcbiAgICAgIC8vIOWkmumAiVxyXG4gICAgICBjaGVja2JveDogZnVuY3Rpb24gKGNvbmZpZywgZGF0YSwgaWQpIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgQ0xBU1NOQU1FID0gJ2xheXVpLWZvcm0tY2hlY2tib3gnLFxyXG4gICAgICAgICAgQ0hFQ0tFRCA9ICdsYXl1aS1mb3JtLWNoZWNrZWQnLFxyXG5cclxuICAgICAgICAgIGVsID0gY29uZmlnLnJlRWxlbS5maW5kKCdkbCcpLFxyXG4gICAgICAgICAgdmFsdWVOYW1lID0gY29uZmlnLnZhbHVlTmFtZSxcclxuICAgICAgICAgIGNoZWNrZWROYW1lID0gY29uZmlnLmNvbmZpZy5jaGVja2VkTmFtZSxcclxuICAgICAgICAgIGluZGV4TmFtZSA9IGNvbmZpZy5jb25maWcuaW5kZXhOYW1lLFxyXG4gICAgICAgICAgdmFsdWVzID0gY29uZmlnLnZhbHVlcyxcclxuICAgICAgICAgIGxhYmVsID0gY29uZmlnLmxhYmVsLFxyXG4gICAgICAgICAgZmlsdGVyID0gY29uZmlnLmZpbHRlcixcclxuICAgICAgICAgIGxhYmVsU2VwYXJhdG9yID0gY29uZmlnLmxhYmVsU2VwYXJhdG9yLFxyXG4gICAgICAgICAgdmFsdWVTZXBhcmF0b3IgPSBjb25maWcudmFsdWVTZXBhcmF0b3IsXHJcblxyXG4gICAgICAgICAgc3VtID0gMDtcclxuXHJcblxyXG4gICAgICAgIC8vIOa3u+WKoOmAiemhuSAgIFhYWCwg5q2k5aSE5Y+v5Lul5L2/55So5LiA5qyhc3Ry77yM5Y+v5Lul6IqC55yB5LiA5qyhZG9t55qE5pON5L2cXHJcbiAgICAgICAgZWwuYXBwZW5kKCQoJzxkZCBsYXktdmFsdWU9XCLlhajpgIlcIj48L2RkPicpKTtcclxuICAgICAgICBsYXl1aS5lYWNoKGRhdGEsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgICAgICBlbC5hcHBlbmQoJCgnPGRkIGxheS12YWx1ZT1cIicgKyBpdGVtW3ZhbHVlTmFtZV0gKyAnXCI+PC9kZD4nKSk7XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIHZhciBhbGxFbGUgPSBlbC5maW5kKCdkZCcpLmVxKDEpO1xyXG5cclxuICAgICAgICAvLyDmt7vliqDlpJrpgInmoYZcclxuXHJcbiAgICAgICAgYWxsRWxlLm5leHRBbGwoKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgdmFyICRkZCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGl0ZW0gPSBkYXRhW2luZGV4XSxcclxuICAgICAgICAgICAgbGF5dWlWYWx1ZSA9IGl0ZW1bdmFsdWVOYW1lXSxcclxuICAgICAgICAgICAgdGl0bGUgPSBsYXl1aVZhbHVlO1xyXG4gICAgICAgICAgaWYgKGxhYmVsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGl0bGUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsYXl1aS5lYWNoKGxhYmVsLCBmdW5jdGlvbiAoaSwgbikge1xyXG4gICAgICAgICAgICAgIHRpdGxlICs9IGl0ZW1bbl07XHJcbiAgICAgICAgICAgICAgaSA8IChsYWJlbC5sZW5ndGggLSAxKSA/IHRpdGxlICs9ICBsYWJlbFNlcGFyYXRvcjogJyc7XHJcbiAgICAgICAgICAgICAgLy8gaSA8IChsYWJlbC5sZW5ndGggLSAxKSA/ICh0aXRsZSArPSAgKGxhYmVsU2VwYXJhdG9yICsgJzwvc3Bhbj4nKSk6ICcnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGNoZWNrYm94ID0gJCgnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCInICsgTU9EX05BTUUgKyAnY2hlY2tib3gnICsgaWQgKyAnXCIgIHl3LWluZGV4PVwiJyArIGl0ZW1baW5kZXhOYW1lXSArICdcIiBsYXktc2tpbj1cInByaW1hcnlcIiB0aXRsZT1cIicgKyB0aXRsZSArICdcIiBsYXl1aS12YWx1ZT1cIicgKyBsYXl1aVZhbHVlICsgJ1wiPicpO1xyXG5cclxuICAgICAgICAgIGlmIChpdGVtW2NoZWNrZWROYW1lXSkge1xyXG4gICAgICAgICAgICBjaGVja2JveC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKGxheXVpVmFsdWUpO1xyXG4gICAgICAgICAgICBzdW0rKztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICRkZC5odG1sKGNoZWNrYm94KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB2YXIgYWxsY2hlY2tib3ggPSAkKCc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgIHNlbGVjdHBsdXMtYWxsICBsYXktc2tpbj1cInByaW1hcnlcIiB0aXRsZT1cIuWFqOmAiVwiIGxheXVpLXZhbHVlPVwi5YWo6YCJXCI+Jyk7XHJcbiAgICAgICAgc3VtID09PSBkYXRhLmxlbmd0aCA/IGFsbGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKSA6IFwiXCI7XHJcbiAgICAgICAgYWxsRWxlLmh0bWwoYWxsY2hlY2tib3gpO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZygn5byA5ZCv5LqG5Yid5aeL5YyW5qih5byPJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvbmZpZy50YWdzQ29udGFpbmVyJyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY29uZmlnKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnY29uZmlnLnRhZ3NDb250YWluZXInKTtcclxuXHJcbiAgICAgICAgcmVuZGVySW5wdXRUYWdzKGNvbmZpZy5lbCwgdmFsdWVzKTtcclxuICAgICAgICBhbGxFbGUucGFyZW50KCkucHJldigpLmZpbmQoJ2lucHV0JykudmFsKHZhbHVlcy5qb2luKHZhbHVlU2VwYXJhdG9yKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g5re75Yqg5LqL5Lu2XHJcbiAgICAgICAgYWxsRWxlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgdmFyICRhbGwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBjaGVja2VkID0gZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnREQnID8gJGFsbC5maW5kKCcuJyArIENMQVNTTkFNRSkudG9nZ2xlQ2xhc3MoQ0hFQ0tFRCkuaGFzQ2xhc3MoQ0hFQ0tFRCkgOiAkYWxsLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcpO1xyXG5cclxuICAgICAgICAgIC8vIOemgeatouS4i+aLieahhuaUtuWbnlxyXG4gICAgICAgICAgJGFsbC5wYXJlbnRzKCcuJyArIFNFTEVDVCkuYWRkQ2xhc3MoU0VMRUNURUQpO1xyXG5cclxuICAgICAgICAgIC8vIOiuvue9rumAieS4reeKtuaAgSBcclxuICAgICAgICAgICRhbGwuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJywgY2hlY2tlZCk7XHJcblxyXG4gICAgICAgICAgJGFsbC5uZXh0QWxsKCkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkZCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIGNoZWNrZWQgPyBkZC5maW5kKCcuJyArIENMQVNTTkFNRSkuYWRkQ2xhc3MoQ0hFQ0tFRCkgOiBkZC5maW5kKCcuJyArIENMQVNTTkFNRSkucmVtb3ZlQ2xhc3MoQ0hFQ0tFRCk7XHJcbiAgICAgICAgICAgIGRkLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWQpO1xyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAvLyDmmL7npLrpgInkuK3mlbDmja5cclxuICAgICAgICAgIGxheXVpLmV2ZW50LmNhbGwoJGFsbCwgTU9EX05BTUUsICdjaGVja2JveCcgKyAnKCcgKyBNT0RfTkFNRSArICcpJywge1xyXG4gICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCIsXHJcbiAgICAgICAgICAgIGVsZTogJGFsbCxcclxuICAgICAgICAgICAgZWxlQ2hlY2tlZDogY2hlY2tlZCxcclxuICAgICAgICAgICAgaXNBbGw6IGNoZWNrZWRcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+S6i+S7tueahOebkeWQrC4uLi4nKTtcclxuICAgICAgICBjb25maWcuZWwuc2libGluZ3MoJy5wbGctc2VsZWN0LXRhZ3MnKS5vbignY2xpY2snLCAnLmNsb3NlJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygn6Kem5Y+R54K55Ye75LqL5Lu2Li4uJyk7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfop6blj5Hngrnlh7vkuovku7YuLi4nKVxyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJCh0aGlzKS5zaWJsaW5ncygnZW0nKS5odG1sKCkpO1xyXG4gICAgICAgICAgLy8gaWYoZWwuZmluZCgnLmxheXVpLWZvcm0tc2VsZWN0JykuaGFzQ2xhc3MoJ2xheXVpLWZvcm0tc2VsZWN0ZWQnKSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgLy8g5q2k5aSE6ZyA6KaB5Yik5pat5b2T5YmN55qEc2VsZWN0IGNoZWNrYm945piv5ZCm5bGV5byA77yM5aaC5p6c5bGV5byA5YiZ77yM56ys5LiA5qyh54K55Ye755qE5piv5YWz6ZetXHJcblxyXG4gICAgICAgICAgdmFyIGN1cnJlbnRIdG1sID0gJCh0aGlzKS5zaWJsaW5ncygnZW0nKS5odG1sKCk7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyggdHlwZW9mIGFsbEVsZS5uZXh0QWxsKCkpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYWxsRWxlLm5leHRBbGwoKSk7XHJcbiAgICAgICAgICB2YXIgc2VsZWN0TGlzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFsbEVsZS5uZXh0QWxsKCkpO1xyXG4gICAgICAgICAgc2VsZWN0TGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaW5kKXtcclxuICAgICAgICAgICAgaWYodmFsLmlubmVyVGV4dCA9PT0gY3VycmVudEh0bWwpe1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjdXJyZW50SHRtbDo6JyArIGN1cnJlbnRIdG1sKTtcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaW5kOjonICsgaW5kKTtcclxuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn56uL5Y2z5omn6KGM55qE5LqL5Lu2Li4uLicpO1xyXG4gICAgICAgICAgICAgIGVsLmZpbmQoJ2RkJykuZXEoaW5kICsgMikub2ZmKCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn56uL5Y2z5omn6KGM55qE5LqL5Lu2Jyk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaW5kZXg6OicgKyAkKHRoaXMpLmluZGV4KCkpO1xyXG4gICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5pbmRleCgpID09PSAoaW5kICsgMikpe1xyXG4gICAgICAgICAgICAgICAgICB2YXIgJGRkID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgY2hlY2tlZCA9IGV2ZW50LnRhcmdldC5ub2RlTmFtZSA9PT0gJ0REJyA/ICRkZC5maW5kKCcuJyArIENMQVNTTkFNRSkudG9nZ2xlQ2xhc3MoQ0hFQ0tFRCkuaGFzQ2xhc3MoQ0hFQ0tFRCkgOiAkZGQuZmluZCgnaW5wdXQnKS5wcm9wKCdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCflh7rlj5Hngrnlh7vkuovku7YnKTtcclxuICAgICAgICAgICAgICAgICAgLy8g56aB5q2i5LiL5ouJ5qGG5pS25ZueXHJcbiAgICAgICAgICAgICAgICAgICRkZC5wYXJlbnRzKCcuJyArIFNFTEVDVCkuYWRkQ2xhc3MoU0VMRUNURUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgLy8g6K6+572u6YCJ5Lit54q25oCBXHJcbiAgICAgICAgICAgICAgICAgICRkZC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBjaGVja2VkKTtcclxuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJzIyMjInKTtcclxuICAgICAgICAgICAgICAgICAgLy8g5Yik5pat5YWo6YCJXHJcbiAgICAgICAgICAgICAgICAgIHZhciAkYWxsID0gJGRkLnBhcmVudHMoJ2RsJykuZmluZCgnZGQnKS5lcSgxKSxcclxuICAgICAgICAgICAgICAgICAgICAkZGRzID0gJGFsbC5uZXh0QWxsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc3VtID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICRkZHMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnKSA/IHN1bSsrIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCcxMTExJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoc3VtID09PSAkZGRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCflhajpgIknKTtcclxuICAgICAgICAgICAgICAgICAgICAkYWxsLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICRhbGwuZmluZCgnLicgKyBDTEFTU05BTUUpLmFkZENsYXNzKENIRUNLRUQpO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfpnZ7lhajpgIknKTtcclxuICAgICAgICAgICAgICAgICAgICAkYWxsLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkYWxsLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS5yZW1vdmVDbGFzcyhDSEVDS0VEKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnMDAwMDAnKTtcclxuICAgICAgICAgICAgICAgICAgLy8g5pi+56S66YCJ5Lit5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgIGxheXVpLmV2ZW50LmNhbGwoJGFsbCwgTU9EX05BTUUsICdjaGVja2JveCcgKyAnKCcgKyBNT0RfTkFNRSArICcpJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBlbGU6ICRkZCxcclxuICAgICAgICAgICAgICAgICAgICBlbGVDaGVja2VkOiBjaGVja2VkLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQWxsOiAoc3VtID09PSAkZGRzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYWFhYWEnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICB9KS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhbGxFbGUubmV4dEFsbCgpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbmV4dEFsbCgp5q2k5aSE5piv54K55Ye75LqL5Lu2Jyk7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCQodGhpcykpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ25leHRBbGwoKeatpOWkhOaYr+eCueWHu+S6i+S7ticpO1xyXG5cclxuICAgICAgICAgIHZhciAkZGQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBjaGVja2VkID0gZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnREQnID8gJGRkLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS50b2dnbGVDbGFzcyhDSEVDS0VEKS5oYXNDbGFzcyhDSEVDS0VEKSA6ICRkZC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgICAvLyDnpoHmraLkuIvmi4nmoYbmlLblm55cclxuICAgICAgICAgICRkZC5wYXJlbnRzKCcuJyArIFNFTEVDVCkuYWRkQ2xhc3MoU0VMRUNURUQpO1xyXG5cclxuICAgICAgICAgIC8vIOiuvue9rumAieS4reeKtuaAgVxyXG4gICAgICAgICAgJGRkLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWQpO1xyXG5cclxuICAgICAgICAgIC8vIOWIpOaWreWFqOmAiVxyXG4gICAgICAgICAgdmFyICRhbGwgPSAkZGQucGFyZW50cygnZGwnKS5maW5kKCdkZCcpLmVxKDEpLFxyXG4gICAgICAgICAgICAkZGRzID0gJGFsbC5uZXh0QWxsKCksXHJcbiAgICAgICAgICAgIHN1bSA9IDA7XHJcbiAgICAgICAgICAkZGRzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcpID8gc3VtKysgOiAnJztcclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgaWYgKHN1bSA9PT0gJGRkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJGFsbC5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgJGFsbC5maW5kKCcuJyArIENMQVNTTkFNRSkuYWRkQ2xhc3MoQ0hFQ0tFRCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkYWxsLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJGFsbC5maW5kKCcuJyArIENMQVNTTkFNRSkucmVtb3ZlQ2xhc3MoQ0hFQ0tFRCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8g5pi+56S66YCJ5Lit5pWw5o2uXHJcbiAgICAgICAgICBsYXl1aS5ldmVudC5jYWxsKCRhbGwsIE1PRF9OQU1FLCAnY2hlY2tib3gnICsgJygnICsgTU9EX05BTUUgKyAnKScsIHtcclxuICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxyXG4gICAgICAgICAgICBlbGU6ICRkZCxcclxuICAgICAgICAgICAgZWxlQ2hlY2tlZDogY2hlY2tlZCxcclxuICAgICAgICAgICAgaXNBbGw6IChzdW0gPT09ICRkZHMubGVuZ3RoKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g5riy5p+T5aSa6YCJ5qGGXHJcbiAgICAgICAgLy8gZWwubmV4dCgpLmZpbmQoJ2RsJykuYWRkQ2xhc3MoJ3l3LXNlbGVjdFBsdXMnKTtcclxuICAgICAgICBmb3JtLnJlbmRlcignY2hlY2tib3gnLCBmaWx0ZXIpO1xyXG5cclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOWNlemAiVxyXG4gICAgICByYWRpbzogZnVuY3Rpb24gKGNvbmZpZywgZGF0YSwgaWQpIHtcclxuICAgICAgICB2YXIgQ0xBU1NOQU1FID0gJ2xheXVpLWZvcm0tcmFkaW8nLFxyXG4gICAgICAgICAgQ0hFQ0tFRCA9ICdsYXl1aS1mb3JtLXJhZGlvZWQnLFxyXG4gICAgICAgICAgSUNPTiA9IFsnJiN4ZTY0MzsnLCAnJiN4ZTYzZjsnXSxcclxuICAgICAgICAgIENIRUNLRURfSUNPTiA9ICdsYXl1aS1hbmltLXNjYWxlU3ByaW5nJyxcclxuXHJcbiAgICAgICAgICBlbElEID0gY29uZmlnLmVsLFxyXG4gICAgICAgICAgZWwgPSBjb25maWcucmVFbGVtLmZpbmQoJ2RsJyksXHJcbiAgICAgICAgICB2YWx1ZU5hbWUgPSBjb25maWcudmFsdWVOYW1lLFxyXG4gICAgICAgICAgY2hlY2tlZE5hbWUgPSBjb25maWcuY29uZmlnLmNoZWNrZWROYW1lLFxyXG4gICAgICAgICAgaW5kZXhOYW1lID0gY29uZmlnLmNvbmZpZy5pbmRleE5hbWUsXHJcbiAgICAgICAgICBjaGVja2VkRGF0YSA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtW2NoZWNrZWROYW1lXSA9PT0gdHJ1ZTtcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgdmFsdWVzID0gY29uZmlnLnZhbHVlcyxcclxuICAgICAgICAgIGxhYmVsID0gY29uZmlnLmxhYmVsLFxyXG4gICAgICAgICAgZmlsdGVyID0gY29uZmlnLmZpbHRlcixcclxuICAgICAgICAgIGxhYmVsU2VwYXJhdG9yID0gY29uZmlnLmxhYmVsU2VwYXJhdG9yLFxyXG4gICAgICAgICAgdmFsdWVTZXBhcmF0b3IgPSBjb25maWcudmFsdWVTZXBhcmF0b3I7XHJcblxyXG5cclxuICAgICAgICAvLyDmt7vliqDpgInpoblcclxuICAgICAgICBsYXl1aS5lYWNoKGRhdGEsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgICAgICBlbC5hcHBlbmQoJzxkZCBsYXktdmFsdWU9XCInICsgaXRlbVt2YWx1ZU5hbWVdICsgJ1wiPjwvZGQ+Jyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBmb3JtLnJlbmRlcignc2VsZWN0Jywgb3B0aW9ucy5maWx0ZXIpO1xyXG5cclxuXHJcbiAgICAgICAgLy8g5riy5p+T5Y2V6YCJ5qGGXHJcbiAgICAgICAgZWwuZmluZCgnZGQnKS5lcSgwKS5uZXh0QWxsKCkuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgIHZhciAkZGQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBpdGVtID0gZGF0YVtpbmRleF0sXHJcbiAgICAgICAgICAgIGxheXVpVmFsdWUgPSBpdGVtW3ZhbHVlTmFtZV0sXHJcbiAgICAgICAgICAgIHRpdGxlID0gbGF5dWlWYWx1ZTtcclxuICAgICAgICAgIGlmIChsYWJlbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRpdGxlID0gXCJcIjtcclxuICAgICAgICAgICAgbGF5dWkuZWFjaChsYWJlbCwgZnVuY3Rpb24gKGksIG4pIHtcclxuICAgICAgICAgICAgICB0aXRsZSArPSBpdGVtW25dO1xyXG4gICAgICAgICAgICAgIGkgPCAobGFiZWwubGVuZ3RoIC0gMSkgPyB0aXRsZSArPSBsYWJlbFNlcGFyYXRvciA6ICcnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBkZCA9ICQoJzxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiJyArIE1PRF9OQU1FICsgJ3JhZGlvJyArIGlkICsgJ1wiICB5dy1pbmRleD1cIicgKyBpdGVtW2luZGV4TmFtZV0gKyAnXCIgbGF5LXNraW49XCJwcmltYXJ5XCIgdGl0bGU9XCInICsgdGl0bGUgKyAnXCIgbGF5dWktdmFsdWU9XCInICsgbGF5dWlWYWx1ZSArICdcIj4nKTtcclxuXHJcbiAgICAgICAgICBpZiAoY2hlY2tlZERhdGEubGVuZ3RoID4gMCAmJiBjaGVja2VkRGF0YVswXVtpbmRleE5hbWVdID09PSBpdGVtW2luZGV4TmFtZV0pIHtcclxuICAgICAgICAgICAgZGQucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICB2YWx1ZXMucHVzaChsYXl1aVZhbHVlKTtcclxuICAgICAgICAgICAgJGRkLnBhcmVudCgpLnByZXYoKS5maW5kKCdpbnB1dCcpLnZhbCh2YWx1ZXMuam9pbih2YWx1ZVNlcGFyYXRvcikpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAkZGQuaHRtbChkZCk7XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIC8vIGVsLm5leHQoKS5maW5kKCdkbCcpLmFkZENsYXNzKCd5dy1zZWxlY3RQbHVzJyk7XHJcbiAgICAgICAgZm9ybS5yZW5kZXIoJ3JhZGlvJywgZmlsdGVyKTtcclxuXHJcbiAgICAgICAgLy8g5LqL5Lu2XHJcbiAgICAgICAgZWwuZmluZCgnZGQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgIHZhciAkZGQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgJGRkLmZpbmQoJy4nICsgQ0xBU1NOQU1FKS5hZGRDbGFzcyhDSEVDS0VEKS5maW5kKCdpJykuYWRkQ2xhc3MoQ0hFQ0tFRF9JQ09OKS5odG1sKElDT05bMF0pO1xyXG4gICAgICAgICAgJGRkLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAgICAgJGRkLnNpYmxpbmdzKCkuZmluZCgnLicgKyBDTEFTU05BTUUpLnJlbW92ZUNsYXNzKENIRUNLRUQpLmZpbmQoJ2knKS5yZW1vdmVDbGFzcyhDSEVDS0VEX0lDT04pLmh0bWwoSUNPTlsxXSk7XHJcbiAgICAgICAgICAkZGQuc2libGluZ3MoKS5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAvLyDmmL7npLrpgInkuK3mlbDmja5cclxuICAgICAgICAgIGxheXVpLmV2ZW50LmNhbGwoJGRkLCBNT0RfTkFNRSwgJ3JhZGlvJyArICcoJyArIE1PRF9OQU1FICsgJyknLCB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwicmFkaW9cIixcclxuICAgICAgICAgICAgZWxlOiAkZGQsXHJcbiAgICAgICAgICAgIGVsZUNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGlzQWxsOiBmYWxzZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOmAieaLqeaXtuinpuWPkeeahOS6i+S7tlxyXG4gICAgbGF5dWkub25ldmVudC5jYWxsKHRoYXQsIE1PRF9OQU1FLCB0eXBlICsgJygnICsgTU9EX05BTUUgKyAnKScsIHRoYXQuY2hlY2tlZC5iaW5kKHRoYXQpKTtcclxuXHJcbiAgICBpdGVtc1t0eXBlXSA/IGl0ZW1zW3R5cGVdKG9wdGlvbnMsIGRhdGEsIGlkKSA6IGhpbnQuZXJyb3IoJ+S4jeaUr+aMgeeahCcgKyB0eXBlICsgJ+ihqOWNlea4suafkycpO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIOmAieS4reaVsOaNruWkhOeQhlxyXG4gIENsYXNzLnByb3RvdHlwZS5jaGVja2VkID0gZnVuY3Rpb24gKHJlcykge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICBvcHRpb25zID0gdGhhdC5jb25maWcsXHJcbiAgICAgIGRhdGEgPSBvcHRpb25zLmRhdGEsXHJcbiAgICAgIGNoZWNrZWROYW1lID0gb3B0aW9ucy5jb25maWcuY2hlY2tlZE5hbWUsXHJcbiAgICAgIHR5cGUgPSByZXMudHlwZSxcclxuICAgICAgaXNBbGwgPSByZXMuaXNBbGwsXHJcbiAgICAgIGVsZSA9IHJlcy5lbGUsXHJcbiAgICAgIGVsZUNoZWNrZWQgPSByZXMuZWxlQ2hlY2tlZCxcclxuICAgICAgZmlsdGVyID0gb3B0aW9ucy5lbC5hdHRyKCdsYXktZmlsdGVyJyk7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09ICdjaGVja2JveCcpIHtcclxuICAgICAgb3B0aW9ucy52YWx1ZXMgPSBbXTtcclxuICAgICAgZWxlLnBhcmVudHMoJ2RsJykuZmluZCgnW3R5cGU9XCJjaGVja2JveFwiXScpLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICB2YXIgJGRkID0gJCh0aGlzKSxcclxuICAgICAgICAgIHl3SW5kZXggPSAkZGQuYXR0cigneXctaW5kZXgnKSxcclxuICAgICAgICAgIGNoZWNrZWQgPSAkZGQucHJvcCgnY2hlY2tlZCcpO1xyXG4gICAgICAgIHl3SW5kZXggPyBkYXRhW3l3SW5kZXhdW2NoZWNrZWROYW1lXSA9IGNoZWNrZWQgOiBcIlwiO1xyXG4gICAgICAgIGNoZWNrZWQgJiYgeXdJbmRleCA/IG9wdGlvbnMudmFsdWVzLnB1c2goJGRkLmF0dHIoJ2xheXVpLXZhbHVlJykpIDogXCJcIjtcclxuICAgICAgfSlcclxuXHJcbiAgICAgIC8vIOatpOWkhOWBmmlucHV05qGG55qE5riy5p+T5Yqf6IO9XHJcbiAgICAgIHJlbmRlcklucHV0VGFncyhjb25maWcuZWwsIG9wdGlvbnMudmFsdWVzKTtcclxuICAgICAgZWxlLnBhcmVudCgpLnByZXYoKS5maW5kKCdpbnB1dCcpLnZhbChvcHRpb25zLnZhbHVlcy5qb2luKG9wdGlvbnMudmFsdWVTZXBhcmF0b3IpKTtcclxuXHJcblxyXG4gICAgICBsYXl1aS5ldmVudC5jYWxsKGVsZSwgTU9EX05BTUUsIE1PRF9OQU1FICsgJygnICsgZmlsdGVyICsgJyknLCB7XHJcbiAgICAgICAgY2hlY2tlZDogZWxlQ2hlY2tlZCxcclxuICAgICAgICBpc0FsbDogaXNBbGwsXHJcbiAgICAgICAgdmFsdWVzOiBvcHRpb25zLnZhbHVlcyxcclxuICAgICAgICBjaGVja2VkRGF0YTogZGF0YS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgIHJldHVybiBpdGVtW2NoZWNrZWROYW1lXSA9PT0gdHJ1ZTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBlbGU6IGVsZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyYWRpbycpIHtcclxuXHJcbiAgICAgIHZhciBpbmRleCA9IGVsZS5maW5kKCdpbnB1dCcpLmF0dHIoJ3l3LWluZGV4JyksXHJcbiAgICAgICAgdmFsdWUgPSBlbGUuZmluZCgnaW5wdXQnKS5hdHRyKCdsYXl1aS12YWx1ZScpO1xyXG5cclxuICAgICAgb3B0aW9ucy52YWx1ZXMgPSBbdmFsdWVdO1xyXG4gICAgICBlbGUucGFyZW50KCkucHJldigpLmZpbmQoJ2lucHV0JykudmFsKHZhbHVlKTtcclxuXHJcbiAgICAgIGxheXVpLmVhY2goZGF0YSwgZnVuY3Rpb24gKGksIGl0ZW0pIHtcclxuICAgICAgICBpdGVtW2NoZWNrZWROYW1lXSA9IGZhbHNlO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgZGF0YVtpbmRleF1bY2hlY2tlZE5hbWVdID0gdHJ1ZTtcclxuXHJcbiAgICAgIGxheXVpLmV2ZW50LmNhbGwoZWxlLCBNT0RfTkFNRSwgTU9EX05BTUUgKyAnKCcgKyBmaWx0ZXIgKyAnKScsIHtcclxuICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgY2hlY2tlZERhdGE6IGRhdGFbaW5kZXhdLFxyXG4gICAgICAgIGVsZTogZWxlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIC8vIOiOt+WPlumAieS4reaVsOaNrlxyXG4gIENsYXNzLnByb3RvdHlwZS5nZXRDaGVja2VkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzLFxyXG4gICAgICBvcHRpb25zID0gdGhhdC5jb25maWcsXHJcbiAgICAgIGRhdGEgPSBvcHRpb25zLmRhdGEsXHJcbiAgICAgIGNoZWNrZWROYW1lID0gb3B0aW9ucy5jb25maWcuY2hlY2tlZE5hbWU7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsdWVzOiBvcHRpb25zLnZhbHVlcyxcclxuICAgICAgZGF0YTogZGF0YS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gaXRlbVtjaGVja2VkTmFtZV0gPT09IHRydWU7XHJcbiAgICAgIH0pXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8g5qC45b+D5YWl5Y+jXHJcbiAgc2VsZWN0UGx1cy5yZW5kZXIgPSBmdW5jdGlvbiAob3B0aW9ucywgdGFnc0NvbnRhaW5lcikge1xyXG5cclxuICAgIHZhciBpbnMgPSBuZXcgQ2xhc3Mob3B0aW9ucywgdGFnc0NvbnRhaW5lcik7XHJcbiAgICByZXR1cm4gdGhpc0lucy5jYWxsKGlucyk7XHJcbiAgfTtcclxuXHJcbiAgZXhwb3J0cygnc2VsZWN0UGx1cycsIHNlbGVjdFBsdXMpO1xyXG5cclxufSkiXX0=
