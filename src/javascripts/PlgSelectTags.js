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