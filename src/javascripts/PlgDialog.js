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