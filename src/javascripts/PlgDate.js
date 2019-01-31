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