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