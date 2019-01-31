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