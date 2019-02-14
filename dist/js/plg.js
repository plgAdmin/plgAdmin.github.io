/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	module.exports = __webpack_require__(13);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	;
	(function($) {

	    $.fn.initPlgCard = function(options) {
	        var pg = new PlgCard(options);
	        var id = $(this).attr("id");
	        pg.renderTo(id);
	        return pg;
	    }

	    var PlgCard = function(options) {
	        if (!options || !options.renderer) return;

	        /**
	         * htmlFragment  html代码片段
	         * config 默认的配置文件
	         */
	        var htmlFragment, config;

	        config = {};
	        // config = Object.assign(config, options.config);
	        config = $.extend({}, config, options.config);

	        var factory = {
	            _style: config.style,
	            _data: config.data || '',
	            _strTitle: function() {
	                return '<div class="plg-card-components"> \
	                  <div class="plg-card-header-container">\
	                  <fieldset><legend>';
	            },
	            _strHead: function() {
	                return '<div class="plg-card-group">';
	            },
	            _strTitleHead: function() {
	                return '</legend></fieldset></div><div class="plg-card-group">';
	            },
	            _strFooter: function() {
	                return '</div>';
	            },
	            _strFooter: function() {
	                return '</div></div>';
	            },
	            generateOneTemplate: function(data) {
	                var self = this,
	                    temFragment = '';

	                data.forEach(function(val) {
	                    temFragment += `
	                <div class="plg-card">
	                  <div class="plg-card-body">
	                    <div class="plg-card-no">${val.cardNo}</div>
	                    <div class="plg-card-main">${val.cardName}</div>
	                   </div>
	  
	                   <ul class="plg-card-btn-group">
	              `;
	                    var temBtns = '';
	                    val.btn.forEach(function(value) {
	                        temBtns += `
	                <li>${value.text}</li>
	              `;
	                    })
	                    temFragment += temBtns;
	                    temFragment += `
	                </ul>
	              </div>
	            `;
	                })

	                return temFragment;
	            },
	            oneTemplate: function() {

	                var self = this,
	                    temFragment = '';

	                self._data.forEach(function(val) {
	                    temFragment += `
	                <div class="plg-card">
	                  <div class="plg-card-body">
	                    <div class="plg-card-no">${val.cardNo}</div>
	                    <div class="plg-card-main">${val.cardName}</div>
	                   </div>
	  
	                   <ul class="plg-card-btn-group">
	              `;
	                    var temBtns = '';
	                    val.btn.forEach(function(value) {
	                        temBtns += `
	                <li>${value.text}</li>
	              `;
	                    })
	                    temFragment += temBtns;
	                    temFragment += `
	                </ul>
	              </div>
	            `;
	                })

	                return self._strHead() + temFragment + self._strFooter();

	            },
	            twoTemplate: function() {
	                // return 'twoTemplate';
	                var self = this,
	                    temFragment = '';

	                self._data.forEach(function(val) {
	                    temFragment += `
	                <div class="plg-card">
	                  <div class="plg-card-body primary">
	                    ${val.cardName}
	                   </div>
	  
	                   <ul class="plg-card-btn-group">
	              `;
	                    var temBtns = '';
	                    val.btn.forEach(function(value) {
	                        temBtns += `
	                <li>${value.text}</li>
	              `;
	                    })
	                    temFragment += temBtns;
	                    temFragment += `
	                </ul>
	              </div>
	            `;
	                })

	                return self._strHead() + temFragment + self._strFooter();
	            },
	            threeTemplate: function() {
	                // return 'threeTemplate';
	                var self = this,
	                    temFragment = '';

	                self._data.forEach(function(val) {
	                    temFragment += `
	                <div class="plg-card">
	                  <div class="plg-card-body primary">
	                    ${val.cardName}
	                   </div>
	  
	                   <ul class="plg-card-btn-group">
	              `;
	                    var temBtns = '';
	                    val.btn.forEach(function(value) {
	                        temBtns += `
	                <li>${value.text}</li>
	              `;
	                    })
	                    temFragment += temBtns;
	                    temFragment += `
	                </ul>
	              </div>
	            `;
	                })

	                return self._strHead() + temFragment + self._strFooter();

	            },
	            addTemplate: function() {

	                return `<div class="plg-card plg-add">
	                  <div class="layui-icon layui-icon-add-1 "></div>
	                </div>`;
	            },
	            oneTitleTemplate: function() {
	                var self = this,
	                    temFragment = '';

	                self._data.forEach(function(val) {
	                    temFragment += `<div class="plg-card-components"><div class="plg-card-header-container">
	                <fieldset><legend>
	                ${val.title}
	                <legend><fieldset></div>`;

	                    temFragment += self._strHead();
	                    temFragment += self.generateOneTemplate(val.dataList);
	                    temFragment += self._strFooter();
	                    temFragment += `</div>`;

	                });

	                return temFragment;

	            },
	            oneTitleAddTemplate: function() {
	                var self = this,
	                    temFragment = '';

	                if(!self._data || self._data.length < 1){
	                    return false;
	                }

	                self._data.forEach(function(val) {
	                    temFragment += `<div class="plg-card-components"><div class="plg-card-header-container">
	                <fieldset><legend>
	                ${val.title}
	                <legend><fieldset></div>`;

	                    temFragment += self._strHead();
	                    temFragment += self.generateOneTemplate(val.dataList);
	                    temFragment += self.addTemplate();
	                    temFragment += self._strFooter();
	                    temFragment += `</div>`;

	                });

	                return temFragment;

	            },
	            // 向外暴露出最后的模版样式
	            getHtmlFragment: function() {
	                var self = this;
	                var attrName = self._style + 'Template';
	                return self[attrName] ? self[attrName]() : new Error('不存在这个方法');
	            }
	        }
	        // //console.log(factory.getHtmlFragment());

	        this.on = function(eventname, callback) {

	            var ROUTINE_OPERATION = ['one', 'two', 'three'],
	                COMPLEX_OPERATION = ['oneTitle', 'twoTitle', 'threeTitle',
	                    'oneTitleAdd', 'twoTitleAdd', 'threeTitleAdd'];

	            // 此处多了一个oneTitle类型
	            if (config && config.style !== 'add'
	                && eventname && eventname == 'click') {

	                if (ROUTINE_OPERATION.includes(config.style)) {
	                    $('#' + options.renderer).on('click', 'li', function(e) {

	                        var temIndex = $(this).closest(".plg-card").index();
	                        var cardNo = config.data[temIndex].cardNo;
	                        var call_back_fn = config.data[temIndex].btn[$(this).index()].fn;

	                        callback && callback(cardNo, call_back_fn);

	                    })
	                }
	                if (COMPLEX_OPERATION.includes(config.style)) {
	                   
	                    $('#' + options.renderer).off('click').on('click', 'li', function(e) {

	                        var groupIndex = $(this).closest(".plg-card-components").index(),
	                            temIndex = $(this).closest(".plg-card").index(),
	                            currentData = config.data[groupIndex].dataList[temIndex],
	                            cardNo, call_back_fn;

	                        cardNo = currentData.cardNo;
	                        call_back_fn = currentData.btn[$(this).index()].fn;

	                        var title = config.data[groupIndex].title;
	                       
	                        if (title) {
	                            callback && callback(cardNo, call_back_fn, title);
	                        } else {
	                            callback && callback(cardNo, call_back_fn);
	                        }

	                    });

	                    $('#' + options.renderer).on('click', '.plg-add', function(e) {

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
	            if (config && config.style === 'add'
	                && eventname && eventname == 'click') {
	                $('#' + options.renderer).on('click', '.plg-card', function(e) {

	                    callback && callback();

	                })
	            }

	        }

	        this.renderTo = function(id) {
	            $('#' + id).append(factory.getHtmlFragment());
	        }

	        if (options.renderer) {

	            this.renderTo(options.renderer);

	        }

	    }

	    window.PlgCard = PlgCard;

	} (jQuery));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	;
	(function ($) {

	  $.fn.initPlgCardList = function (options) {
	    var pg = new PlgCardList(options);
	    var id = $(this).attr("id");
	    pg.renderTo(id);
	    return pg;
	  }

	  var PlgCardList = function (options) {
	    if (!options) {
	      return false;
	    };

	    /**
	     * htmlFragment  html代码片段
	     * config 默认的配置文件
	     */
	    var htmlFragment, config;
	    config = {
	      isShowAdd: true   // 默认显示
	    }

	    config = Object.assign({}, config, options.data);

	    var factory = {
	      _data: config || '',
	      _strTitle: function () {
	        var self = this;
	        var temStr = '';

	        temStr += `<div class="plg-zone-container">
	        <div class="plg-zone-header">
	          <div class="plg-title"><i class="layui-icon layui-icon-location"></i>
	          ${ self._data.zoneName }</div>`;
	        
	        if(self._data.isShowAdd){
	          temStr += `<div class="plg-add">
	            <button class="layui-btn layui-btn-normal" data-zoneid=${self._data.zoneId} name="plg-add">
	              <i class="layui-icon">&#xe654;</i>
	              添加
	            </button>
	          </div>`;
	        }

	        temStr += `</div>
	          <div class="plg-customer-list">
	          <ul class="layui-row">`;

	        return temStr;
	      },
	      _strCellStart: function () {
	        return `<li class="layui-col-lg3 layui-col-md4 layui-col-sm6 
	        layui-col-xs12">
	        <div class="plg-cell">`;
	      },
	      _strCellHead: function (head) {
	        return `<div class="plg-customer-name">
	          <i class="plg-badge-dot"></i>${ head }
	        </div>`;
	      },
	      _strCellBody: function (des) {
	        return `<div class="plg-customer-des">${ des }</div>`;
	      },
	      _strCellFooter: function (obj) {

	        // console.log(obj);
	        // debugger;
	        var temFragment ='';
	        temFragment += `<div class="plg-customer-other">
	          <div class="plg-cutomer-no">编号:<span>${ obj.useNo }</span></div>`;

	        var operatFnLength = Object.keys(obj.btns).length;
	        var temStr = '';
	        if(operatFnLength > 0){
	          temStr += `<div class="plg-cutomer-operating" data-id=${obj.id}>`;
	          var item;
	          for(item in obj.btns){
	            temStr += `<span class="plg-${item}">${obj.btns[item]}</span>`;
	          }
	          temStr += `</div>`;
	        } else {
	          console.error('用户配置的操作为空');
	        }
	        temFragment += temStr;
	        temFragment += '</div>';
	      
	        return temFragment;
	      },
	      _strCellEnd: function(){
	        return `</div>
	        </li>`;
	      },
	      _strFooter: function () {
	        return `</ul>
	          </div>
	        </div>`;
	      },
	      // 向外暴露出最后的模版样式
	      getHtmlFragment: function () {
	        var self = this;
	        var temFragment = '';

	        if(self._data.customerList && self._data.customerList.length > 0){
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
	    }

	    PlgCardList.prototype.cuson =function(){

	    }
	    // 当eventName为add的时候，index 是一个function，callback为空
	    this.on = function (eventname, callback) {
	      var self = this;
	      if(eventname === 'add'){
	       
	        self.event.find('.plg-add').eq(0).on('click', function(){
	          
	          var currentId = $(this).find('.layui-btn').eq(0).data('zoneid');
	         
	          callback && callback(currentId);
	        });
	        return;
	      } else {
	        if(self.event.find('.plg-' + eventname).length){
	          self.event.find('.plg-' + eventname).on('click', function(){

	            var currentId = $(this).closest('.plg-cutomer-operating').data('id');
	            callback && callback(currentId);

	          })
	        } else {
	          console.error('绑定的事件不存在::' + eventname);
	        }
	      }

	      
	    }

	    this.renderTo = function (id) {

	      this.event = factory.getHtmlFragment();

	      $('#' + id).append(this.event);
	    }

	    if (options.renderer) {
	      this.renderTo(options.renderer);
	    }

	  }

	  window.PlgCardList = PlgCardList;

	}(jQuery));

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	;
	(function ($, layui) {

	  //PlgTabs.js
	  layui.use(["layer"], function () {
	    var layer = layui.layer;

	    layer.config({
	      anim: 0, //默认动画风格
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
	        btn1: function (index, layero) {
	          PlgDialog.close(index);
	        },
	        btn2: function (index, layero) {
	          PlgDialog.close(index);
	        },
	        area: ['300px', '300px'],
	        content: '<div id="xx-win-dd-1"></div>',
	        success: function (layero, index) {
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
	        btn1: function (index, layero) {
	          var id = plgGrid.getSelectedRowId();
	          if (!id) {
	            layer.msg("为选择数据");
	            return;
	          }

	          var record = plgGrid.getSelectedRowData();

	          if (callback)
	            callback(id, record);

	          PlgDialog.close(index);
	        },
	        btn2: function (index, layero) {
	          PlgDialog.close(index);
	        },
	        area: [opts.width + 'px', opts.height + 'px'],
	        content: '<div id="' + panelId + '-win-grid-1"></div>',
	        success: function (layero, index) {
	          plgGrid.renderTo(panelId + '-win-grid-1');
	          plgGrid.loadData();
	          plgGrid.on("onRowDblClicked", function (rid, ind) {
	            var record = plgGrid.getUserData(rid, "data");;
	            if (callback)
	              callback(rid, record);

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
	        PlgDialog.close(index)
	      }
	    }
	    

	    
	    window.PlgDialog = plgDialog;

	  });



	})(jQuery, layui);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	(function($, layui){
	  $.fn.initPlgInputTags = function (options) {
	    var pg = new plgInputTags(options);
	    var id = $(this).attr("id");
	    pg.renderTo(id);
	    return pg;
	  }

	  var plgInputTags = function (params){
	    var self = this;
	   
	    var classMain = {
	      checkboxName: '',
	      layFilter: '',
	      data: null,
	      dom: null,
	      tagsId: 'tags-' + Prolog.createRandomId(),
	      meunPanelThis: null,
	      setDefaultValue: function(data) {

	        if(!(data && data.length > 0)){
	          console.error('用户传递进来的数据不是数组');
	          return false;
	        }

	        data.map(function(val){

	          if(!val.hasOwnProperty('checked')){
	            val.checked = false;
	          }

	        })

	        this.data = data;

	      },
	      wrapTemplate: function(){
	        var self = this;
	        var temTemplate = '';
	        
	        temTemplate += `<div class="layui-form-item">
	        <label class="layui-form-label">原始复选框</label>
	        <div class="layui-input-block">`;

	        self.data.forEach(function(val){
	          temTemplate += `<input type="checkbox" 
	          name="${self.checkboxName}[${val.alias}]" 
	          lay-skin="primary" lay-filter="${self.layFilter}" 
	          title="${val.text}" ${ val.checked ? 'checked=""' : ''} />
	          <div class="layui-unselect layui-form-checkbox ${ val.checked ? 'layui-form-checked' : ''}" 
	          lay-skin="primary"><span>${val.text}</span>
	          <i class="layui-icon layui-icon-ok"></i></div>
	          `;
	        });

	        temTemplate += `</div>
	          </div>
	          <div class="layui-form-item">
	          <label class="layui-form-label">已经选中</label>
	          <div class="layui-input-block tags" id="${self.tagsId}"></div>
	          </div>
	        `;

	        return temTemplate;
	      }
	    }
	    
	    // 设置默认值, checked, 默认false
	    // var data = params.data;
	    if(!params.checkboxName || !params.layFilter){
	      console.error('请设置checkout的名字,该名字将会是您获取form名称的key');
	      return false;
	    }
	    classMain.checkboxName = params.checkboxName;
	    // classMain.layFilter = params.layFilter;
	    classMain.setDefaultValue(params.data);
	    this.tagsId = classMain.tagsId;
	    this.layFilter = classMain.layFilter = params.layFilter || 'plg-' + Prolog.createRandomId();
	    
	    this.wrapTamplate = $(classMain.wrapTemplate());

	    if(params.renderer) {
	      self.renderTo(params.renderer);
	    }
	  }

	  plgInputTags.prototype.renderTo = function(targetId){
	    var self = this;
	    var $targetId = $('#' + targetId);
	    var $tagsId = $targetId.find("#" + self.tagsId);

	    $targetId.append(self.wrapTamplate);
	    
	    var form = layui.form;
	    form.render();
	  
	    var tagList = []; // 用户标签列表
	    
	    var inputTags = {
	      init: function() {
	        var temObj = {};
	        var checkboxList = $targetId.find(
	          ".layui-form-checked"
	        );
	        if (checkboxList.length) {
	          temObj = {
	            value: checkboxList.siblings("input").attr("title"),
	            name: checkboxList.siblings("input").attr("name")
	          };
	        }
	  
	        if (JSON.stringify(temObj) !== "{}") {
	          tagList.push(temObj);
	          tagList.forEach(function(v) {
	            inputTags.add(v);
	          });
	        }
	      },
	      add: function(temObj) {
	        var temTempalte = `<span>
	          <em name="${temObj.name}">${temObj.value}</em>
	          <button type="button" class="close">×</button>
	        </span>`;
	        
	        $('#' + self.tagsId).append(temTempalte);
	  
	        var temInputHidden = `<input type="hidden" name="${temObj.name}" 
	          value="${temObj.value}"/>`;
	          $targetId.after(temInputHidden);
	  
	        if (tagList.indexOf(temObj) === -1) {
	          tagList.push(temObj);
	        }
	      },
	      
	      del: function(temObj) {
	        
	        // console.log('del temObj before');
	        // console.log(tagList);
	        // console.log('del temObj before');
	        // console.log('del tagList event');
	        // console.log(temObj);
	        // console.log('del temObj event');

	        // 从tagList删除temObj
	        if (tagList && tagList.length > 0) {
	          tagList.forEach(function(val, ind) {
	            if (val.name === temObj.name) {
	              tagList.splice(ind, 1);
	            }
	          });
	        }
	        // 操作完成之后就启动重新渲染
	  
	        // 2. 删除tags中的标签  TODO:: 此做法有点对DOM的重新渲染影响比较大
	        // $('#inputTags').find('name='+ temObj.name).parent('span').remove();
	        $("#" + self.tagsId).empty();
	        var temTempalte = "";
	        if (tagList && tagList.length > 0) {
	          tagList.forEach(function(val, ind) {
	            temTempalte += `<span><em name="${val.name}">${
	              val.value
	            }</em><button type="button" class="close">×</button></span>`;
	          });
	        }
	        $("#" + self.tagsId).append(temTempalte);
	  
	        // 3. 删除input hidden中的标签节点
	        $("#" + self.targetId)
	          .find('input[name="' + temObj.name + '"]')
	          .remove();
	      }
	    };
	  
	    inputTags.init();
	    
	    form.on("checkbox("+ self.layFilter +")", function(data) {
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
	      }
	      // <span><em>标题一</em><button type="button" class="close">×</button></span>
	    });
	  
	    $targetId.find("#" + self.tagsId).on("click", ".close", function(e) {
	      var temJqueryObj = $(this).siblings("em");
	      var temObj = {
	        value: temJqueryObj.html(),
	        name: temJqueryObj.attr("name")
	      };
	     
	      inputTags.del(temObj);
	  
	      // 1. 清空checkbox 中选中的，修改状态。重新触发被删除的tags
	      var checkedList = self.wrapTamplate.find(
	        ".layui-form-checkbox"
	      );
	      // 将类数组转化为数组
	      checkedList = Array.prototype.slice.call(checkedList);
	  
	      if (checkedList && checkedList.length > 0) {
	        checkedList.forEach(function(val, ind) {
	          var temHtml = $($(val).find("span")[0]).html();
	          if (temObj.value === temHtml) {
	            self.wrapTamplate.find('.layui-form-checkbox')
	              .eq(ind).trigger("click");
	          }
	        });
	      }
	    });
	  }

	  window.PlgInputTags = plgInputTags;
	}(jQuery, layui));

/***/ }),
/* 6 */
/***/ (function(module, exports) {

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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	;(function ($, layui) {
	  $.fn.PlgSelectPlusTags = function (options) {
	    return new plgSelectPlusTags(options);

	};

	  var temp = function(){
	    return `<div class="layui-input-block plg-select-tags"></div>`
	  }

	  var plgSelectPlusTags = function (options) {
	    
	    this.render(options);

	  };

	  plgSelectPlusTags.prototype.render = function(options){
	    $('#' + options.renderer).after(temp());
	    options.el = '#' + options.renderer;
	    delete options.renderer;
	    return layui.selectPlus.render(options);
	  }
	  
	  window.PlgSelectPlusTags = plgSelectPlusTags;
	  

	})(jQuery, layui);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	;(function ($) {
	    var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
	    //此处收录了375个多音字
	   var oMultiDiff={"19969":"DZ","19975":"WM","19988":"QJ","20048":"YL","20056":"SC","20060":"NM","20094":"QG","20127":"QJ","20167":"QC","20193":"YG","20250":"KH","20256":"ZC","20282":"SC","20285":"QJG","20291":"TD","20314":"YD","20340":"NE","20375":"TD","20389":"YJ","20391":"CZ","20415":"PB","20446":"YS","20447":"SQ","20504":"TC","20608":"KG","20854":"QJ","20857":"ZC","20911":"PF","20504":"TC","20608":"KG","20854":"QJ","20857":"ZC","20911":"PF","20985":"AW","21032":"PB","21048":"XQ","21049":"SC","21089":"YS","21119":"JC","21242":"SB","21273":"SC","21305":"YP","21306":"QO","21330":"ZC","21333":"SDC","21345":"QK","21378":"CA","21397":"SC","21414":"XS","21442":"SC","21477":"JG","21480":"TD","21484":"ZS","21494":"YX","21505":"YX","21512":"HG","21523":"XH","21537":"PB","21542":"PF","21549":"KH","21571":"E","21574":"DA","21588":"TD","21589":"O","21618":"ZC","21621":"KHA","21632":"ZJ","21654":"KG","21679":"LKG","21683":"KH","21710":"A","21719":"YH","21734":"WOE","21769":"A","21780":"WN","21804":"XH","21834":"A","21899":"ZD","21903":"RN","21908":"WO","21939":"ZC","21956":"SA","21964":"YA","21970":"TD","22003":"A","22031":"JG","22040":"XS","22060":"ZC","22066":"ZC","22079":"MH","22129":"XJ","22179":"XA","22237":"NJ","22244":"TD","22280":"JQ","22300":"YH","22313":"XW","22331":"YQ","22343":"YJ","22351":"PH","22395":"DC","22412":"TD","22484":"PB","22500":"PB","22534":"ZD","22549":"DH","22561":"PB","22612":"TD","22771":"KQ","22831":"HB","22841":"JG","22855":"QJ","22865":"XQ","23013":"ML","23081":"WM","23487":"SX","23558":"QJ","23561":"YW","23586":"YW","23614":"YW","23615":"SN","23631":"PB","23646":"ZS","23663":"ZT","23673":"YG","23762":"TD","23769":"ZS","23780":"QJ","23884":"QK","24055":"XH","24113":"DC","24162":"ZC","24191":"GA","24273":"QJ","24324":"NL","24377":"TD","24378":"QJ","24439":"PF","24554":"ZS","24683":"TD","24694":"WE","24733":"LK","24925":"TN","25094":"ZG","25100":"XQ","25103":"XH","25153":"PB","25170":"PB","25179":"KG","25203":"PB","25240":"ZS","25282":"FB","25303":"NA","25324":"KG","25341":"ZY","25373":"WZ","25375":"XJ","25384":"A","25457":"A","25528":"SD","25530":"SC","25552":"TD","25774":"ZC","25874":"ZC","26044":"YW","26080":"WM","26292":"PB","26333":"PB","26355":"ZY","26366":"CZ","26397":"ZC","26399":"QJ","26415":"ZS","26451":"SB","26526":"ZC","26552":"JG","26561":"TD","26588":"JG","26597":"CZ","26629":"ZS","26638":"YL","26646":"XQ","26653":"KG","26657":"XJ","26727":"HG","26894":"ZC","26937":"ZS","26946":"ZC","26999":"KJ","27099":"KJ","27449":"YQ","27481":"XS","27542":"ZS","27663":"ZS","27748":"TS","27784":"SC","27788":"ZD","27795":"TD","27812":"O","27850":"PB","27852":"MB","27895":"SL","27898":"PL","27973":"QJ","27981":"KH","27986":"HX","27994":"XJ","28044":"YC","28065":"WG","28177":"SM","28267":"QJ","28291":"KH","28337":"ZQ","28463":"TL","28548":"DC","28601":"TD","28689":"PB","28805":"JG","28820":"QG","28846":"PB","28952":"TD","28975":"ZC","29100":"A","29325":"QJ","29575":"SL","29602":"FB","30010":"TD","30044":"CX","30058":"PF","30091":"YSP","30111":"YN","30229":"XJ","30427":"SC","30465":"SX","30631":"YQ","30655":"QJ","30684":"QJG","30707":"SD","30729":"XH","30796":"LG","30917":"PB","31074":"NM","31085":"JZ","31109":"SC","31181":"ZC","31192":"MLB","31293":"JQ","31400":"YX","31584":"YJ","31896":"ZN","31909":"ZY","31995":"XJ","32321":"PF","32327":"ZY","32418":"HG","32420":"XQ","32421":"HG","32438":"LG","32473":"GJ","32488":"TD","32521":"QJ","32527":"PB","32562":"ZSQ","32564":"JZ","32735":"ZD","32793":"PB","33071":"PF","33098":"XL","33100":"YA","33152":"PB","33261":"CX","33324":"BP","33333":"TD","33406":"YA","33426":"WM","33432":"PB","33445":"JG","33486":"ZN","33493":"TS","33507":"QJ","33540":"QJ","33544":"ZC","33564":"XQ","33617":"YT","33632":"QJ","33636":"XH","33637":"YX","33694":"WG","33705":"PF","33728":"YW","33882":"SR","34067":"WM","34074":"YW","34121":"QJ","34255":"ZC","34259":"XL","34425":"JH","34430":"XH","34485":"KH","34503":"YS","34532":"HG","34552":"XS","34558":"YE","34593":"ZL","34660":"YQ","34892":"XH","34928":"SC","34999":"QJ","35048":"PB","35059":"SC","35098":"ZC","35203":"TQ","35265":"JX","35299":"JX","35782":"SZ","35828":"YS","35830":"E","35843":"TD","35895":"YG","35977":"MH","36158":"JG","36228":"QJ","36426":"XQ","36466":"DC","36710":"JC","36711":"ZYG","36767":"PB","36866":"SK","36951":"YW","37034":"YX","37063":"XH","37218":"ZC","37325":"ZC","38063":"PB","38079":"TD","38085":"QY","38107":"DC","38116":"TD","38123":"YD","38224":"HG","38241":"XTC","38271":"ZC","38415":"YE","38426":"KH","38461":"YD","38463":"AE","38466":"PB","38477":"XJ","38518":"YT","38551":"WK","38585":"ZC","38704":"XS","38739":"LJ","38761":"GJ","38808":"SQ","39048":"JG","39049":"XJ","39052":"HG","39076":"CZ","39271":"XT","39534":"TD","39552":"TD","39584":"PB","39647":"SB","39730":"LG","39748":"TPB","40109":"ZQ","40479":"ND","40516":"HG","40536":"HG","40583":"QJ","40765":"YQ","40784":"QJ","40840":"YK","40863":"QJG"};
	    //参数,中文字符串
	    //返回值:拼音首字母串数组
	    function makePy(str) {
	        if (typeof (str) != "string")
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

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	;
	(function ($) {


	    var strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
	    //此处收录了375个多音字
	   var oMultiDiff={"19969":"DZ","19975":"WM","19988":"QJ","20048":"YL","20056":"SC","20060":"NM","20094":"QG","20127":"QJ","20167":"QC","20193":"YG","20250":"KH","20256":"ZC","20282":"SC","20285":"QJG","20291":"TD","20314":"YD","20340":"NE","20375":"TD","20389":"YJ","20391":"CZ","20415":"PB","20446":"YS","20447":"SQ","20504":"TC","20608":"KG","20854":"QJ","20857":"ZC","20911":"PF","20504":"TC","20608":"KG","20854":"QJ","20857":"ZC","20911":"PF","20985":"AW","21032":"PB","21048":"XQ","21049":"SC","21089":"YS","21119":"JC","21242":"SB","21273":"SC","21305":"YP","21306":"QO","21330":"ZC","21333":"SDC","21345":"QK","21378":"CA","21397":"SC","21414":"XS","21442":"SC","21477":"JG","21480":"TD","21484":"ZS","21494":"YX","21505":"YX","21512":"HG","21523":"XH","21537":"PB","21542":"PF","21549":"KH","21571":"E","21574":"DA","21588":"TD","21589":"O","21618":"ZC","21621":"KHA","21632":"ZJ","21654":"KG","21679":"LKG","21683":"KH","21710":"A","21719":"YH","21734":"WOE","21769":"A","21780":"WN","21804":"XH","21834":"A","21899":"ZD","21903":"RN","21908":"WO","21939":"ZC","21956":"SA","21964":"YA","21970":"TD","22003":"A","22031":"JG","22040":"XS","22060":"ZC","22066":"ZC","22079":"MH","22129":"XJ","22179":"XA","22237":"NJ","22244":"TD","22280":"JQ","22300":"YH","22313":"XW","22331":"YQ","22343":"YJ","22351":"PH","22395":"DC","22412":"TD","22484":"PB","22500":"PB","22534":"ZD","22549":"DH","22561":"PB","22612":"TD","22771":"KQ","22831":"HB","22841":"JG","22855":"QJ","22865":"XQ","23013":"ML","23081":"WM","23487":"SX","23558":"QJ","23561":"YW","23586":"YW","23614":"YW","23615":"SN","23631":"PB","23646":"ZS","23663":"ZT","23673":"YG","23762":"TD","23769":"ZS","23780":"QJ","23884":"QK","24055":"XH","24113":"DC","24162":"ZC","24191":"GA","24273":"QJ","24324":"NL","24377":"TD","24378":"QJ","24439":"PF","24554":"ZS","24683":"TD","24694":"WE","24733":"LK","24925":"TN","25094":"ZG","25100":"XQ","25103":"XH","25153":"PB","25170":"PB","25179":"KG","25203":"PB","25240":"ZS","25282":"FB","25303":"NA","25324":"KG","25341":"ZY","25373":"WZ","25375":"XJ","25384":"A","25457":"A","25528":"SD","25530":"SC","25552":"TD","25774":"ZC","25874":"ZC","26044":"YW","26080":"WM","26292":"PB","26333":"PB","26355":"ZY","26366":"CZ","26397":"ZC","26399":"QJ","26415":"ZS","26451":"SB","26526":"ZC","26552":"JG","26561":"TD","26588":"JG","26597":"CZ","26629":"ZS","26638":"YL","26646":"XQ","26653":"KG","26657":"XJ","26727":"HG","26894":"ZC","26937":"ZS","26946":"ZC","26999":"KJ","27099":"KJ","27449":"YQ","27481":"XS","27542":"ZS","27663":"ZS","27748":"TS","27784":"SC","27788":"ZD","27795":"TD","27812":"O","27850":"PB","27852":"MB","27895":"SL","27898":"PL","27973":"QJ","27981":"KH","27986":"HX","27994":"XJ","28044":"YC","28065":"WG","28177":"SM","28267":"QJ","28291":"KH","28337":"ZQ","28463":"TL","28548":"DC","28601":"TD","28689":"PB","28805":"JG","28820":"QG","28846":"PB","28952":"TD","28975":"ZC","29100":"A","29325":"QJ","29575":"SL","29602":"FB","30010":"TD","30044":"CX","30058":"PF","30091":"YSP","30111":"YN","30229":"XJ","30427":"SC","30465":"SX","30631":"YQ","30655":"QJ","30684":"QJG","30707":"SD","30729":"XH","30796":"LG","30917":"PB","31074":"NM","31085":"JZ","31109":"SC","31181":"ZC","31192":"MLB","31293":"JQ","31400":"YX","31584":"YJ","31896":"ZN","31909":"ZY","31995":"XJ","32321":"PF","32327":"ZY","32418":"HG","32420":"XQ","32421":"HG","32438":"LG","32473":"GJ","32488":"TD","32521":"QJ","32527":"PB","32562":"ZSQ","32564":"JZ","32735":"ZD","32793":"PB","33071":"PF","33098":"XL","33100":"YA","33152":"PB","33261":"CX","33324":"BP","33333":"TD","33406":"YA","33426":"WM","33432":"PB","33445":"JG","33486":"ZN","33493":"TS","33507":"QJ","33540":"QJ","33544":"ZC","33564":"XQ","33617":"YT","33632":"QJ","33636":"XH","33637":"YX","33694":"WG","33705":"PF","33728":"YW","33882":"SR","34067":"WM","34074":"YW","34121":"QJ","34255":"ZC","34259":"XL","34425":"JH","34430":"XH","34485":"KH","34503":"YS","34532":"HG","34552":"XS","34558":"YE","34593":"ZL","34660":"YQ","34892":"XH","34928":"SC","34999":"QJ","35048":"PB","35059":"SC","35098":"ZC","35203":"TQ","35265":"JX","35299":"JX","35782":"SZ","35828":"YS","35830":"E","35843":"TD","35895":"YG","35977":"MH","36158":"JG","36228":"QJ","36426":"XQ","36466":"DC","36710":"JC","36711":"ZYG","36767":"PB","36866":"SK","36951":"YW","37034":"YX","37063":"XH","37218":"ZC","37325":"ZC","38063":"PB","38079":"TD","38085":"QY","38107":"DC","38116":"TD","38123":"YD","38224":"HG","38241":"XTC","38271":"ZC","38415":"YE","38426":"KH","38461":"YD","38463":"AE","38466":"PB","38477":"XJ","38518":"YT","38551":"WK","38585":"ZC","38704":"XS","38739":"LJ","38761":"GJ","38808":"SQ","39048":"JG","39049":"XJ","39052":"HG","39076":"CZ","39271":"XT","39534":"TD","39552":"TD","39584":"PB","39647":"SB","39730":"LG","39748":"TPB","40109":"ZQ","40479":"ND","40516":"HG","40536":"HG","40583":"QJ","40765":"YQ","40784":"QJ","40840":"YK","40863":"QJG"};
	    //参数,中文字符串
	    //返回值:拼音首字母串数组
	    function makePy(str) {
	        if (typeof (str) != "string")
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

/***/ }),
/* 10 */
/***/ (function(module, exports) {

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

/***/ }),
/* 11 */
/***/ (function(module, exports) {

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

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	Date.prototype.format = function (fmt) { //author: meizz 
	  var o = {
	    "M+": this.getMonth() + 1, //月份 
	    "d+": this.getDate(), //日 
	    "h+": this.getHours(), //小时 
	    "m+": this.getMinutes(), //分 
	    "s+": this.getSeconds(), //秒 
	    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	    "S": this.getMilliseconds() //毫秒 
	  };
	  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	  for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	  return fmt;
	};

	// 增强code的健壮性，主要是其他用不到dhtml插件的文件，不再需要引入这个插件了
	if(!( typeof dhtmlXCalendarObject === 'undefined' || !dhtmlXCalendarObject)){		
	  dhtmlXCalendarObject.prototype.langData["ch"] = {
	    dateformat: '%Y-%m-%d',
	    monthesFNames: ["1月",'2月','3月',"4月",'5月','6月',"7月",'8月','9月',"10月",'11月','12月'],
	    monthesSNames: ["1月",'2月','3月',"4月",'5月','6月',"7月",'8月','9月',"10月",'11月','12月'],
	    daysFNames: ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],
	    daysSNames: ["日","一","二","三","四","五","六"],
	    weekstart:"周日",
	    weekname: "星期",
	    today: "今天",
	    clear: "清除"
	  }
	  dhtmlXCalendarObject.prototype.lang = "ch";
	};



	var Prolog = {};
	var GridBasePath="/prologui/components/PlgGrid/codebase/images";
	var token = localStorage.getItem("authorization");

	//获取元素的纵坐标 
	Prolog.getTop = function(e) {
		var offset = e.offsetTop;
		if (e.offsetParent != null) {
			offset += Prolog.getTop(e.offsetParent);
		}
		;
		return offset;
	}
	// 获取元素的横坐标
	Prolog.getLeft = function(e) {
		var offset = e.offsetLeft;
		if (e.offsetParent != null) {
			offset += Prolog.getLeft(e.offsetParent);
		}
		;
		return offset;
	}

	Prolog.hasJson = function(jsonArray,json){
		for(var i=0;i<jsonArray.length;i++){
			var b = true;
			for(var key in jsonArray[i]){
					if(jsonArray[i][key] != json[key]){
						b = false;
						break;
					}
			}
			if(b)
				return i;
		}
		return -1;
	}


	Prolog.ajax = function(options){
		var pdefault = {
			timeout:30000,
			dataType:"json"
		}
		var opt = $.extend(true,pdefault,options);
		opt.error = function(XMLHttpRequest, textStatus, errorThrown){
			layer.msg(textStatus);
			if(options.error)
				options.error(XMLHttpRequest, textStatus, errorThrown);
		}
		opt.beforeSend = function (xhr) {
		       xhr.setRequestHeader("Authorization", token); 
		       if(options.beforeSend){
		    	   options.beforeSend(xhr);
		       }
		}
		$.ajax(opt);
	}

	Prolog.syncAjax = function(options){
		var pdefault = {
				timeout:30000	
			}
		var opt = $.extend(true, pdefault, options);
		opt.error = function(XMLHttpRequest, textStatus, errorThrown){
			layer.msg(textStatus);
			if(options.error)
				options.error(XMLHttpRequest, textStatus, errorThrown);
		}
		opt.async = false;
		opt.beforeSend = function (xhr) {
		       xhr.setRequestHeader("Authorization", token); 
		       if(options.beforeSend){
		    	   options.beforeSend(xhr);
		       }
		}
		   
		$.ajax(opt);
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

	Prolog.loading = function(el){
	    
		var loading = PlgDialog.loading();
		//layui-layer14
		$("#layui-layer-shade"+loading).appendTo("#"+el);
		$("#layui-layer"+loading).appendTo("#"+el);
		$("#layui-layer"+loading).css("left","50%");
		$("#layui-layer"+loading).css("margin-left","-90px");
		$("#layui-layer"+loading).css("top",200+"px");
		return loading;
	}

	Prolog.closeLoading = function(id){
		layer.close(id);
	}

	Prolog.loading2=function() {
	    var index = PlgDialog.load(2, {
	        shade: [0.6, '#fff'] //0.1透明度的白色背景
	    });

	    return function(){
	        PlgDialog.close(index)
	    }
	}

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

	Prolog.delGridRowData = function (grid,url,type,contenttype,param,multiselect){
	    if(multiselect===false) {
	        if (grid.getSelectedRowId() == null && param.length<1) {
	            PlgDialog.msg("请选择行!");
	            return;
	        }
	    }else{
	        if(grid.getCheckedIds() == null) {
	            PlgDialog.msg("请选择行!");
	            return;
	        }
	    }

	    PlgDialog.confirm('是否删除吗？', {
	        title: '删除提示',
	        btn: ['确定', '取消'],
	        zIndex:layer.zIndex
	    }, function (index) {
	        PlgDialog.close(index);

	        if (type==="") type="post";
	        if (contenttype==="") contenttype="application/x-www-form-urlencoded";

	        layer.msg("数据处理中...");
	        Prolog.ajax({
	            url:url,
	            type:type,
	            contentType: contenttype,
	            data:param,
	            success:function(data){
					if(typeof data != "object") data=JSON.parse(data);
	                if(data.success){
	                    grid.reload();
	                    layer.closeAll();
	                }
	                else{
	                    layer.open({
	                        type: 1
	                        ,offset: "auto"
	                        ,id: 'layerError'
	                        ,area:["500px"]
	                        ,title:"错误提示"
	                        ,content: '<div style="padding: 10px;">'+$.parseJSON(data).message+'</div>'
	                        ,btn: '关闭'
	                        ,btnAlign: 'r'
	                        ,shade: 0
	                        ,yes: function(){
	                            layer.closeAll();
	                        }
	                    });
	                }
	            },
	            error:function(){ }
	        });

	    });
	}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

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
	      set: function (options) {
	        var that = this;
	        that.config = $.extend({}, that.config, options);
	        return that;
	      },

	      // 事件监听
	      on: function (events, callback) {
	        return layui.onevent.call(this, MOD_NAME, events, callback);
	      }
	    },

	    // 操作当前实例
	    thisIns = function () {
	      var that = this,
	        options = that.config;

	      return {
	        // 获取数据
	        getChecked: function () {
	          return that.getChecked.call(that);
	        },
	        // 配置数据
	        config: options
	      }
	    },

	    // 构造器
	    Class = function (options) {
	      var that = this;
	      that.index = ++selectPlus.index;
	      that.config = $.extend({}, that.config, selectPlus.config, options);
	      that.render();
	    },

	    // 渲染inputTags
	    renderInputTags = function(el, data){
	      
	      var temStr = '';
	      data.forEach(function(val){
	        temStr += `<span>
	          <em>${val}</em>
	          <button type="button" class="close">×</button>
	        </span>`;
	        
	      });

	      $(el).siblings('.plg-select-tags').html(temStr);
	    };

	  //默认配置
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

	  };
	  //渲染视图
	  Class.prototype.render = function () {
	    var that = this,
	      options = that.config;
	    
	    typeof (options.el) === 'string' ? options.el = $(options.el): options.el;
	    // 渲染元素
	    options.reElem = $('<div class="layui-unselect layui-form-select">' +
	      '<div class="layui-select-title">' +
	      '<input type="text" placeholder="请选择" value="" readonly="" class="layui-input layui-unselect">' +
	      '<i class="layui-edge"></i>' +
	      '</div>' +
	      '<dl class="layui-anim layui-anim-upbit">' +
	      '<dd lay-value="" class="layui-select-tips layui-hide">请选择</dd>' +
	      '</dl>' +
	      '</div>');

	    // 事件
	    options.reElem.find('.layui-select-title').on('click', function (e) {
	      !$(this).parent().hasClass(SELECTED) ? $(document).find('.' + SELECT).removeClass(SELECTED) : "";
	      $(this).parent().toggleClass(SELECTED);
	    });
	    $(document).on('click', function (e) {
	      ($(e.target).parents('.' + SELECT).length <= 0) && (options.reElem.hasClass(SELECTED)) ? options.reElem.removeClass(SELECTED): "";
	    });

	    !Array.isArray(options.values) ? options.values = [options.values] : "";

	    // 查找 表单的 filter
	    options.filter = options.el.parents('.layui-form').attr('lay-filter');

	    options.el.append(options.reElem);

	    if (options.url) { // 获取后端数据
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
	    })

	  }

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
	      success: function (res) {
	        //如果有数据解析的回调，则获得其返回的数据
	        if (typeof options.parseData === 'function') {
	          res = options.parseData(res) || res[options.response];
	        }
	        // 如果是数组，则覆盖options.data
	        if (Array.isArray(res)) {
	          options.data = that.formatData(res);
	          options.error = '';
	          that.renderData();
	        } else {
	          options.error = '数据格式不对';
	        }
	      },
	      error: function (e, m) {
	        options.error = '数据接口请求异常：' + m;
	      }
	    });

	  }

	  // 格式化数据
	  Class.prototype.formatData = function (data) {
	    var that = this,
	      options = that.config,
	      valueName = options.valueName,
	      values = options.values,
	      checkedName = options.config.checkedName,
	      indexName = options.config.indexName;

	    layui.each(data, function (i, item) {
	      if (typeof item !== 'object') {
	        data[i] = {
	          title: item
	        }
	      }
	      data[i][indexName] = i;
	      if (!data[i][checkedName]) data[i][checkedName] = false;
	      layui.each(values, function (index, value) {
	        if (data[i][valueName] === value) {
	          data[i][checkedName] = true;
	        }
	      })
	    });
	    values.splice(0);

	    return data;
	  }


	  // 渲染数据
	  Class.prototype.renderData = function (data) {
	    var that = this,
	      options = that.config,
	      type = options.type,
	      id = that.index,
	      data = data ? that.formatData(data) : that.formatData(options.data),

	    items = {

	      // 多选
	      checkbox: function (config, data, id) {
	        
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

	          sum = 0;


	        // 添加选项   XXX, 此处可以使用一次str，可以节省一次dom的操作
	        el.append($('<dd lay-value="全选"></dd>'));
	        layui.each(data, function (i, item) {
	          el.append($('<dd lay-value="' + item[valueName] + '"></dd>'));
	        })


	        var allEle = el.find('dd').eq(1);

	        // 添加多选框

	        allEle.nextAll().each(function (index) {
	          var $dd = $(this),
	            item = data[index],
	            layuiValue = item[valueName],
	            title = layuiValue;
	          if (label.length > 0) {
	            title = "";
	            layui.each(label, function (i, n) {
	              title += item[n];
	              i < (label.length - 1) ? title +=  labelSeparator: '';
	              // i < (label.length - 1) ? (title +=  (labelSeparator + '</span>')): '';
	            })
	          }
	          var checkbox = $('<input type="checkbox" name="' + MOD_NAME + 'checkbox' + id + '"  yw-index="' + item[indexName] + '" lay-skin="primary" title="' + title + '" layui-value="' + layuiValue + '">');

	          if (item[checkedName]) {
	            checkbox.prop('checked', true);
	            values.push(layuiValue);
	            sum++;
	          }
	          $dd.html(checkbox);
	        })

	        var allcheckbox = $('<input type="checkbox"  selectplus-all  lay-skin="primary" title="全选" layui-value="全选">');
	        sum === data.length ? allcheckbox.prop('checked', true) : "";
	        allEle.html(allcheckbox);

	        // console.log('开启了初始化模式');
	        // console.log('config.tagsContainer');
	        // console.log(config);
	        // console.log('config.tagsContainer');

	        renderInputTags(config.el, values);
	        allEle.parent().prev().find('input').val(values.join(valueSeparator));
	        
	        // 添加事件
	        allEle.on('click', function (event) {
	          var $all = $(this),
	            checked = event.target.nodeName === 'DD' ? $all.find('.' + CLASSNAME).toggleClass(CHECKED).hasClass(CHECKED) : $all.find('input').prop('checked');

	          // 禁止下拉框收回
	          $all.parents('.' + SELECT).addClass(SELECTED);

	          // 设置选中状态 
	          $all.find('input').prop('checked', checked);

	          $all.nextAll().each(function () {
	            var dd = $(this);
	            checked ? dd.find('.' + CLASSNAME).addClass(CHECKED) : dd.find('.' + CLASSNAME).removeClass(CHECKED);
	            dd.find('input').prop('checked', checked);
	          })

	          // 显示选中数据
	          layui.event.call($all, MOD_NAME, 'checkbox' + '(' + MOD_NAME + ')', {
	            type: "checkbox",
	            ele: $all,
	            eleChecked: checked,
	            isAll: checked
	          });

	        })
	       
	        // console.log('事件的监听....');
	        config.el.siblings('.plg-select-tags').on('click', '.close', function(e){
	          // console.log('触发点击事件...');
	          // console.log(this);
	          // console.log('触发点击事件...')
	          // console.log($(this).siblings('em').html());
	          // if(el.find('.layui-form-select').hasClass('layui-form-selected')){
	            
	          // }
	          // 此处需要判断当前的select checkbox是否展开，如果展开则，第一次点击的是关闭

	          var currentHtml = $(this).siblings('em').html();
	          // console.log( typeof allEle.nextAll());
	          // console.log(allEle.nextAll());
	          var selectList = Array.prototype.slice.call(allEle.nextAll());
	          selectList.forEach(function(val, ind){
	            if(val.innerText === currentHtml){
	              // console.log('currentHtml::' + currentHtml);
	              // console.log('ind::' + ind);
	              // console.log('立即执行的事件....');
	              el.find('dd').eq(ind + 2).off().on('click', function(event){
	                // console.log(event.target);
	                // event.stopPropagation();
	                
	                // console.log('立即执行的事件');
	                // console.log('index::' + $(this).index());
	                if($(this).index() === (ind + 2)){
	                  var $dd = $(this),
	                  checked = event.target.nodeName === 'DD' ? $dd.find('.' + CLASSNAME).toggleClass(CHECKED).hasClass(CHECKED) : $dd.find('input').prop('checked');
	                  // console.log('出发点击事件');
	                  // 禁止下拉框收回
	                  $dd.parents('.' + SELECT).addClass(SELECTED);

	                  // 设置选中状态
	                  $dd.find('input').prop('checked', checked);
	                  // console.log('2222');
	                  // 判断全选
	                  var $all = $dd.parents('dl').find('dd').eq(1),
	                    $dds = $all.nextAll(),
	                    sum = 0;

	                  $dds.each(function () {
	                    $(this).find('input').prop('checked') ? sum++ : '';
	                  })
	                  // console.log('1111');

	                  if (sum === $dds.length) {
	                    // console.log('全选');
	                    $all.find('input').prop('checked', true);
	                    $all.find('.' + CLASSNAME).addClass(CHECKED);
	                  } else {
	                    // console.log('非全选');
	                    $all.find('input').prop('checked', false);
	                    $all.find('.' + CLASSNAME).removeClass(CHECKED);
	                  }
	                  // console.log('00000');
	                  // 显示选中数据
	                  layui.event.call($all, MOD_NAME, 'checkbox' + '(' + MOD_NAME + ')', {
	                    type: "checkbox",
	                    ele: $dd,
	                    eleChecked: checked,
	                    isAll: (sum === $dds.length)
	                  });

	                  // console.log('aaaaa');
	                }



	              }).trigger('click');
	            }
	          })
	        });

	        allEle.nextAll().on('click', function (e) {
	          // console.log('nextAll()此处是点击事件');
	          // console.log(this);
	          // console.log($(this));
	          // console.log('nextAll()此处是点击事件');

	          var $dd = $(this),
	            checked = event.target.nodeName === 'DD' ? $dd.find('.' + CLASSNAME).toggleClass(CHECKED).hasClass(CHECKED) : $dd.find('input').prop('checked');

	          // 禁止下拉框收回
	          $dd.parents('.' + SELECT).addClass(SELECTED);

	          // 设置选中状态
	          $dd.find('input').prop('checked', checked);

	          // 判断全选
	          var $all = $dd.parents('dl').find('dd').eq(1),
	            $dds = $all.nextAll(),
	            sum = 0;
	          $dds.each(function () {
	            $(this).find('input').prop('checked') ? sum++ : '';
	          })

	          if (sum === $dds.length) {
	            $all.find('input').prop('checked', true);
	            $all.find('.' + CLASSNAME).addClass(CHECKED);
	          } else {
	            $all.find('input').prop('checked', false);
	            $all.find('.' + CLASSNAME).removeClass(CHECKED);
	          }

	          // 显示选中数据
	          layui.event.call($all, MOD_NAME, 'checkbox' + '(' + MOD_NAME + ')', {
	            type: "checkbox",
	            ele: $dd,
	            eleChecked: checked,
	            isAll: (sum === $dds.length)
	          });
	        })

	        // 渲染多选框
	        // el.next().find('dl').addClass('yw-selectPlus');
	        form.render('checkbox', filter);

	      },

	      // 单选
	      radio: function (config, data, id) {
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
	          valueSeparator = config.valueSeparator;


	        // 添加选项
	        layui.each(data, function (i, item) {
	          el.append('<dd lay-value="' + item[valueName] + '"></dd>');
	        })
	        form.render('select', options.filter);


	        // 渲染单选框
	        el.find('dd').eq(0).nextAll().each(function (index) {
	          var $dd = $(this),
	            item = data[index],
	            layuiValue = item[valueName],
	            title = layuiValue;
	          if (label.length > 0) {
	            title = "";
	            layui.each(label, function (i, n) {
	              title += item[n];
	              i < (label.length - 1) ? title += labelSeparator : '';
	            })
	          }

	          var dd = $('<input type="radio" name="' + MOD_NAME + 'radio' + id + '"  yw-index="' + item[indexName] + '" lay-skin="primary" title="' + title + '" layui-value="' + layuiValue + '">');

	          if (checkedData.length > 0 && checkedData[0][indexName] === item[indexName]) {
	            dd.prop('checked', true);
	            values.push(layuiValue);
	            $dd.parent().prev().find('input').val(values.join(valueSeparator))
	          }
	          $dd.html(dd);
	        })


	        // el.next().find('dl').addClass('yw-selectPlus');
	        form.render('radio', filter);

	        // 事件
	        el.find('dd').on('click', function (event) {
	          var $dd = $(this);
	          $dd.find('.' + CLASSNAME).addClass(CHECKED).find('i').addClass(CHECKED_ICON).html(ICON[0]);
	          $dd.find('input').prop('checked', true);
	          $dd.siblings().find('.' + CLASSNAME).removeClass(CHECKED).find('i').removeClass(CHECKED_ICON).html(ICON[1]);
	          $dd.siblings().find('input').prop('checked', false);
	          // 显示选中数据
	          layui.event.call($dd, MOD_NAME, 'radio' + '(' + MOD_NAME + ')', {
	            type: "radio",
	            ele: $dd,
	            eleChecked: true,
	            isAll: false
	          });
	        })
	      }


	    };

	    // 选择时触发的事件
	    layui.onevent.call(that, MOD_NAME, type + '(' + MOD_NAME + ')', that.checked.bind(that));

	    items[type] ? items[type](options, data, id) : hint.error('不支持的' + type + '表单渲染');

	  }

	  // 选中数据处理
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
	      })

	      // 此处做input框的渲染功能
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
	      })

	      data[index][checkedName] = true;

	      layui.event.call(ele, MOD_NAME, MOD_NAME + '(' + filter + ')', {
	        value: value,
	        checkedData: data[index],
	        ele: ele
	      });
	    }

	  }

	  // 获取选中数据
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
	  }

	  // 核心入口
	  selectPlus.render = function (options, tagsContainer) {

	    var ins = new Class(options, tagsContainer);
	    return thisIns.call(ins);
	  };

	  exports('selectPlus', selectPlus);

	})

/***/ })
/******/ ]);