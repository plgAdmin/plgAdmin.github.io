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