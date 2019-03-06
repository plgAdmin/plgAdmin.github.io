




;(function($){
	
	$.fn.initPlgGrid = function(options){
		var pg = new plgGrid(options);
		var id = $(this).attr("id");
		pg.renderTo(id);
		return pg;
	}
	
	var plgGrid = function(options){
		
		var plgGrid_default = {
			title:'',
      renderer:"",
      columns:[],
      multiselect:false,
      url:"data.json",
      type:"get",
      pageNum:"pageNum",
      pageSize:"pageSize",
			params:{pageSize:10,pageNum:1}, //字符串或json
			contentType:"application/x-www-form-urlencoded",
			page:true,
			imagePath:"../../../assets/PlgGrid/",
			totalCount:"totalCount",
			toolbar:[],
			formData:[],
			pagebar:{
	   			buttons:[],
	   			type:'full' //full simple min
	   		}
	　　	}
		
		var opts;
		opts =  $.extend({},plgGrid_default,options); //合并成新对象，则是新的属性列表
		this.opts = opts;
		
		var panel;
		var laypage;
		var panelId,pageBarId,gridId,toolBarId,pageBarPanelId,gridTitleId,colsetingId;
		var mygrid;
		var toolBarForm;
		var gridForm;
		var myFormData;
		var formDisableFields;
		var beforeDialogOpenEvent;
		var afterDialogOpenEvent;
		var loadingId;
		
		var columnArray;
		var headerArray;
		var hidenArray;
		
		var pageButtons = new Array();
		
		var rand= Prolog.createRandomId();
		var pageNum = opts.params.pageNum?opts.params.pageNum:plgGrid_default.params.pageNum;
		var pageSize = opts.params.pageSize?opts.params.pageSize:plgGrid_default.params.pageSize;
		var rownum=1;
		
		var containerId;
		var loadDataCallback;//加载完数据的回调，在loaddata或reload方法中设置
    
    
		function renderTo(id){
			containerId = id;
			$("#"+containerId).empty();
			colsetingId = id+"-colsetting-"+rand;
			panelId = id+"-panel-"+rand;
			toolBarId = id +"-toolbar-"+rand;
			pageBarPanelId = id+"-pagebar-panel-"+rand;
			pageBarId = id+"-pagebar-"+rand;
			gridId = id+"-panel-grid-"+rand;
			gridTitleId = id+"-panel-grid-title-"+rand;
			//顶级dom对象
			createPanel();
			$("#"+id).append(panel);
			//创建表格
      createGrid(gridId);
      setDefaultsMethods();
      console.log('mygrid>>>>>');
      console.log(mygrid);
      console.log('mygrid>>>>>');

			//初始化表格
			mygrid.init();      //finishes initialization and renders the grid on the page 
			
			//创建工具条
			createToolBar(panel);

			//创建新建、编辑表单
			createForm();
			
			
			setTimeout(function(){
				resetSize();
			},300);
			
			$("#"+containerId).addClass("grid-container-full");
		}
		
		//高度计算
		function resetSize(){
			var containerHeight = $("#"+containerId).height();
			var pheight = containerHeight-50;
			var theight = $("#"+toolBarId).height()?$("#"+toolBarId).height():0;
			var titleheight = $("#"+gridTitleId).height()?$("#"+gridTitleId).height():0;
			var pageBarPanelHeight = $("#"+pageBarPanelId).height()?$("#"+pageBarPanelId).height():0;
			var h = pheight-theight-titleheight-pageBarPanelHeight;
			
			$("#"+gridId+" .gridbox").css("min-height",h+"px");
			$("#"+gridId+" .gridbox").css("height",h+"px");
			
			$("#"+gridId+" .objbox").css("min-height",(h-20)+"px");
			$("#"+gridId+" .objbox").css("height",(h-20)+"px");
			$("#"+panelId).css("height","auto");
		}
		/**
		 * 创建面板
		 */
		function createPanel(){
			
			panel = document.createElement("div");
			panel.className="plg-grid-panel";
			panel.setAttribute("id",panelId);
			
			if(opts.title && opts.title!=""){
				var gridTitleDiv = document.createElement("div");
				gridTitleDiv.className="plg-grid-title";
				gridTitleDiv.setAttribute("id",gridTitleId);
				gridTitleDiv.innerHTML=opts.title;
				panel.appendChild(gridTitleDiv);
			}
			
			if(opts.toolbar && opts.toolbar.length>0){
				var toolBarDiv = document.createElement("div");
				toolBarDiv.setAttribute("id",toolBarId);
				toolBarDiv.className="plg-toolbar";
				panel.appendChild(toolBarDiv);
			}
			
			
			
			var gridDiv = document.createElement("div");
			gridDiv.setAttribute("id",gridId);
			gridDiv.className="plg-grid";
			panel.appendChild(gridDiv);
			
			
			if(opts.page==true){
				
				var pageBarPanel = document.createElement("div");
				pageBarPanel.className="plg-grid-pagebar";
				pageBarPanel.setAttribute("id",pageBarPanelId);
				
				createPageBarButton(pageBarPanel);
				
				if(opts.page){
					var pageBarDiv = document.createElement("div");
					pageBarDiv.setAttribute("id",pageBarId);
					pageBarPanel.appendChild(pageBarDiv);
				}
				
				panel.appendChild(pageBarPanel);
				
				//createPageBar(pageBarId,0,1);
			}
		
		}
		
		//创建分页条按钮
		function createPageBarButton(parentEl){
			if(opts.pagebar && opts.pagebar.buttons && opts.pagebar.buttons.length>0){
				for(var i=0;i<opts.pagebar.buttons.length;i++){
					var bop = opts.pagebar.buttons[i];
					var btn = document.createElement("button");
					btn.className="layui-btn pagebar-button layui-btn-disabled " + (bop.className!=null?bop.className:"");
					btn.innerHTML = bop.text;
					
					if(bop.name)
						btn.setAttribute("name",bop.name);
					
					parentEl.appendChild(btn);
					pageButtons.push(btn);
				}
			}
		}
		//绑定分页条按钮事件
		this.attachPageBarEvent = function(callback){
			$("#"+pageBarPanelId).on("click",".pagebar-button",function(){
				var _this = $(this);
				if(_this.hasClass("layui-btn-disabled"))
					return;
				var name = _this.attr("name");
				var ids = mygrid.getCheckedRows(1);
				callback(name,ids);
			});
		}
		
		//改变分页条按钮是否可用
		function changePageBtnStatus(){
			var ch = mygrid.getCheckedRows(1);
   			if(ch!=null && ch!=""){
   				for(var j=0;j<pageButtons.length;j++){
   					var btn =$(pageButtons[j]);
   					if(btn.hasClass("layui-btn-disabled")){
   						btn.removeClass("layui-btn-disabled");
   					}
   				}
   			}else{
   				for(var j=0;j<pageButtons.length;j++){
   					var btn =$(pageButtons[j]);
   					if(!btn.hasClass("layui-btn-disabled")){
   						btn.addClass("layui-btn-disabled");
   					}
   				}
   			}
		}
		
		
		function createToolBar(panel){
			if(opts.toolbar && opts.toolbar.length){
				toolBarForm = new PlgForm({renderer:toolBarId,items:opts.toolbar});
				$("#"+toolBarId).addClass("plg-toolbar");
			}
		}
		
		function createForm(){
			if(opts.formData!=null){
				gridForm = new PlgForm({items: opts.formData});
				formDisableFields = new Array();
				for(var i=0;i<opts.formData.length;i++){
					setEditable(opts.formData[i]);
				}
			}
		}
		
		function setEditable(opt){
			if(opt.editable!=null && opt.editable==false){
				formDisableFields.push(opt.name);
			}
			if(opt.list && opt.list.length>0){
				for(var i=0;i<opt.list.length;i++){
					setEditable(opt.list[i]);
				}
			}
		}
		
		this.showDialog = function(type,title,width,height,requestParams,isMultipleRow){

			if(beforeDialogOpenEvent){
				beforeDialogOpenEvent(type,title,width,height,requestParams);
			}
			
			var _this=this;
			if(gridForm == null){
				PlgDialog.msg("未设置表单");
				return;
			}
			//type=0 add type=1 edit
			if(type==1){
				if(!_this.getSelectedRowId()){
					PlgDialog.msg("请选择行!");
					return;
				}
			}
			
			var winoptions = {
					title: title,
					//skin: 'layui-layer-lan',
					closeBtn:1,
					type:1,
					resize:true,
					tipsMore:true,
					btn:["保存","重置","取消"],
					btn1:function(index, layero){

            //console.log('用户点击了保存');
            //console.log('获取的表单数据....');
            //console.log(gridForm.getFormData());
            //console.log('获取的表单数据....');
						if(gridForm.validate()==false){
							return;
						}
						
						var loading = PlgDialog.msg('数据加载中...', {icon: 16,shade: 0.8,time:0});
            var dp;
            
						// //console.log(gridForm.getFormData())
						if(isMultipleRow){
							dp=new Array();
							dp.push(gridForm.getFormData());
						}else {
							dp = gridForm.getFormData();
            }


            // 由于checkbox传递的值是选中了一个，单独传递的，所以在显示出传递给后台需要加工。
            var checkoutList = [];  // 获取checkout列表中的数据
            if(opts.formData && opts.formData.length > 1){
              opts.formData.map(function(val){
                if('label' === val.type){
                  //console.log(val.type);
                  val.list.map(function(value){
                    checkoutList.push(value.name);
                  });
                }
              })
              
              checkoutList = checkoutList.filter(function(val){
                return val;
              })
            }
            // 
            var userInputData = gridForm.getFormData();

						if(requestParams.contentType!=null && requestParams.contentType.indexOf('application/json')>-1){
							requestParams.data = JSON.stringify(dp);
						}else{
							requestParams.data = dp;
            }
     
			requestParams.success=function(data){
				if(data.success){
  					_this.reload();
  					PlgDialog.close(index);
  				}else{
  					////console.log(data);
  					PlgDialog.msg(data.message);
  				}
  				PlgDialog.close(loading);
            }
            
           

						Prolog.ajax(requestParams);
					},
					btn2:function(index, layero){
						gridForm.clear();
						return false;
					},
					btn3:function(index, layero){
						PlgDialog.close(index);
					},
					area: [width+'px', height+'px'],
					content: '<div id="'+panelId+'-win-form-1"></div>',
					success: function (layero, index) {
						gridForm.renderTo(panelId+'-win-form-1');
						if(type==1){
							//gridForm.setFormData(_this.getSelectedRowData());
							setFormData(gridForm,_this.getSelectedRowData());
							for(var k=0;k<formDisableFields.length;k++){
								gridForm.disableItem(formDisableFields[k]);
							}
						}else{
							for(var k=0;k<formDisableFields.length;k++){
								gridForm.enableItem(formDisableFields[k]);
							}
						}
						
						if(afterDialogOpenEvent){
							afterDialogOpenEvent(gridForm);
						}
					}
			};
			
			if(type==1){
				winoptions.btn=["保存","取消"];
				winoptions.btn2 = winoptions.btn3;
				winoptions.btn3=null;
			}
			
			PlgDialog.open(winoptions);
			
		}
		
		function setFormData(plgform,data){
			var items = plgform.getFormData();
			for (var key in items) {
				items[key] = data[key];
		    }
			plgform.setFormData(items);
		}
		/**
		 * 创建分页组件
		 * @param {Object} id
		 */
		function createPageBar(id,totalCount,curr){
			if(opts.page==false)
				return;
			pageSize = pageSize==null?0:pageSize;
			totalCount = totalCount==null?0:totalCount;
			$("#"+id).empty();
			laypage = layui.laypage;
			var layout = [ 'prev', 'page', 'next', 'limit', 'refresh', 'skip','count'];
			if(opts.pagebar && opts.pagebar.type=="simple"){
				//简化功能
				layout= [ 'prev','page', 'next', 'refresh', 'count'];
			}else if(opts.pagebar && opts.pagebar.type=="min"){
				//简化功能
				layout=[ 'prev', 'next','count'];
			}
			
			var page00= laypage.render({
			    elem: id,
			    count: totalCount,
			    limit:pageSize,
			    curr:curr,
			    limits:[5,10,20,30,50,100,200,500,1000],
			    groups:5,
			    theme:"plg",
			    prev:'<i class="layui-icon layui-icon-left"></i>',
			    next:'<i class="layui-icon layui-icon-right"></i>',
			    layout: layout,
			    jump: pageJump
			});
		}
		
		//分页跳转事件
		function pageJump(obj,first){
			pageNum = obj.curr;
	    	pageSize = obj.limit;
	    	if(!first)
	    		reload();
		}
		
		function createGrid(id){
			
			mygrid = new dhtmlXGridObject(id);
      
      
			//mygrid.setSkin("web");
			var imp = opts.imagePath==null?GridBasePath:opts.imagePath;
			if(imp && imp.length>0){
				imp = imp.substr(imp.length-1,1)!="/"?imp+"/":imp;
				mygrid.setImagePath(imp);
			}
        
      console.log('optsoptsoptsopts');
      console.log(opts);
      console.log('optsoptsoptsopts');
			
   		
   			//[{id:"",name:"",type:'',sort:'',align:'',width:'',hidden:false,default:"",renderer:}]
         var cdata = opts.columns.slice(0);
         

         console.log('cdatacdatacdata');
         console.log(cdata);
         console.log('cdatacdatacdata');
   			
   			columnArray = new Array();
   			headerArray = new Array();
   			hidenArray = new Array();
			var widthArray = new Array();
			var alignArray = new Array();
			var headerAlignArray = new Array();
			var typeArray = new Array();
			var typeArray = new Array();
			var sortArray = new Array();
			
			
			columnArray.push("chbx000");
			headerArray.push("<a href='javascript:void(0);' class='plg-grid-first-col'><i class='layui-icon layui-icon-component'></i></a>");
			headerAlignArray.push("text-align:center");
			widthArray.push("30");
			alignArray.push("center");
			typeArray.push("ro");
			sortArray.push("int");
			hidenArray.push(false);
			
			if(opts.multiselect){
        console.log('>>>>>>>>>>>>>>>支持多选');
				columnArray.push("chbx001");
				
				//headerArray.push("<input class='plg-grid-second-col' type='checkbox' />");
				//headerArray.push('#master_checkbox');
				headerArray.push('<img src="'+mygrid._imgURL+'dhxgrid_web/item_chk0.gif" class="plg-grid-second-col" title="">');
				//../../prologui/assets/PlgGrid/
				////console.log(mygrid._imgURL);
				
				headerAlignArray.push("text-align:center");
				widthArray.push("28");
				alignArray.push("center");
				typeArray.push("ch");
				sortArray.push("na");
				hidenArray.push(false);
			}
				
				
			sortArray.push("str");
			//unshift()
			for(var i=0;i<cdata.length;i++){
				columnArray.push(cdata[i].id);
				headerArray.push(cdata[i].name==null?cdata[i].id:cdata[i].name);
				widthArray.push(cdata[i].width == null ? "*":cdata[i].width);
				
				alignArray.push(cdata[i].align==null ? "left":cdata[i].align);
				headerAlignArray.push(cdata[i].align==null ? "text-align:left":"text-align:"+cdata[i].align);
				
				typeArray.push(cdata[i].type==null?"ro":cdata[i].type);
				sortArray.push(cdata[i].sort==null?"str":cdata[i].sort);
				
				if(cdata[i].hidden){
					hidenArray.push(true);
					if(opts.multiselect)
						mygrid.setColumnHidden(i+2,true);
					else
						mygrid.setColumnHidden(i+1,true);
				}else
					hidenArray.push(false);
			}
      
      console.log('headerAlignArray.....');
      console.log(headerAlignArray);
      console.log('headerAlignArray.....');
      console.log('alignArray.........');
      console.log(alignArray.join(','));
      console.log('alignArray.........');
			
			mygrid.setColumnIds(columnArray.toString());
			
			mygrid.setHeader(headerArray.toString(),null,headerAlignArray);
			////console.log(headerAlignArray);
			////console.log(headerArray);
			
			mygrid.setInitWidths(widthArray.toString());          //the widths of columns
	        
	    // mygrid.setColAlign(alignArray.toString());       //the alignment of columns
	    mygrid.setColAlign(alignArray.join(','));       //the alignment of columns
	        
      mygrid.setColTypes(typeArray.toString());                //the types of columns
      mygrid.setColSorting(sortArray.toString());          //the sorting types
      
      if(opts.filters){
        if(opts.multiselect)
          mygrid.attachHeader(",,"+opts.filters.toString());
        else
          mygrid.attachHeader(","+opts.filters.toString());
      }
      
      mygrid.enableMultiselect(opts.multiselect);
      mygrid.enableAutoHeight(false);
      mygrid.enableRowsHover(true,"plg-grid-hover");
      //mygrid.enableHeaderMenu("true");
			   
			mygrid.opts = opts;

	       	mygrid.attachEvent("onAfterSorting", function(index,type,direction){
	       		resetSize();
	        });
	       	mygrid.attachEvent("onResizeEnd", function(obj){resetSize();});
	       	
	       	mygrid.attachEvent("onCheck", function(rId,cInd,state){
	       		if(cInd==1 && opts.multiselect){
	       			changePageBtnStatus();
	       			//控制选择操作
       				var ch = $("#"+panelId+" .plg-grid-second-col");
       				var cstr = ch.attr("src");
       				if(mygrid.getAllRowIds(",").split(",").length == mygrid.getCheckedRows(1).split(",").length){
	       				ch.attr("src",cstr.replaceAll("chk0","chk1"));
       				}else{
       					ch.attr("src",cstr.replaceAll("chk1","chk0"));
       				}
	       			return true;
	       		}
	       		return true;
	       	});
	       	
	       	mygrid.attachEvent("onHeaderClick", function(ind,obj){
	       		if(ind==0){
	       			showColsSettingDialog("#"+panelId+" .plg-grid-first-col i");
	       			return false;
	       		}else if(ind==1){
	       			if(opts.multiselect){
	       				var ch = $("#"+panelId+" .plg-grid-second-col");
	       				var cstr = ch.attr("src");
	       				if(cstr.indexOf("chk0")>-1){
	       					checkAll(true);
	       					ch.attr("src",cstr.replaceAll("chk0","chk1"));
	       				}else{
	       					checkAll(false);
	       					ch.attr("src",cstr.replaceAll("chk1","chk0"));
	       				}
	       				event.stopPropagation()
	       			}
	       			return true;
	       		}else{
	       			return true;
	       		}
	       	});
		}
		
		//设置全选或全不选
		function checkAll(b){
			var count=mygrid.getRowsNum();
			var k = b?1:0;
			for(var i=0;i<count;i++){
				mygrid.cellByIndex(i, 1).setValue(k);
			}
			changePageBtnStatus();
		}
		
		function loadData(data,callback){
			
			if(data){
				loadingId = showLoading();
				parseData(data);
				closeLoading();
				return;
			}
			if(callback){
				loadDataCallback = callback;
			}
			
			var _this = this;
			loadingId = showLoading();
			
			if(opts.url==null || opts.url=="")
				return;
			
			var pp = opts.params;
			
			////console.log(pp);	
			if(opts.page){
				if(typeof pp =="object"){
					pp[opts.pageNum]=pageNum;
					pp[opts.pageSize]=pageSize;
				}else{
					var ppobj = JSON.parse(pp);
					ppobj[opts.pageNum]=pageNum;
					ppobj[opts.pageSize]=pageSize;
					pp = JSON.stringify(ppobj);
				}
			}
			
			Prolog.ajax({
				url:opts.url,
				type:opts.type,
				data:pp,
				contentType:opts.contentType,
				success:function(da){
					parseData(da);
					closeLoading();
					if(loadDataCallback){
						loadDataCallback(true);
					}
				},
				error:function(){
					closeLoading();
					if(loadDataCallback)
						loadDataCallback(false);
				}
			});
		}
		
		function converData(data){
			var gridrows = new Array();
    		var colArray = opts.columns;
    		var v;
    		for(var i=0;i<data.length;i++){
	    		var rd = data[i];
	    		var row = new Array();
	    		
	    		if(opts.multiselect){
	    			row.push(rownum);
	    			row.push(0);
	    		}else{
	    			row.push(rownum);
	    		}
	    		rownum = rownum+1;	
	    		
	    		for(var j=0;j<colArray.length;j++){
					var col = colArray[j].id;
					if(colArray[j].render){
						v = colArray[j].render(rd[col],rd);
						if(v)
							row.push(v);
						else
							row.push(rd[col]);
					}else
						row.push(rd[col]);
	    		}
	    		
	    		gridrows.push({id:rd[colArray[0].id],data:row,userdata:{data:rd}});
	    		
	    	}
	    	return {rows:gridrows};
		}
		
		function reload(data,callback){
			mygrid.clearAll();
			loadData(data,callback);
		}
    
  /**
   *将API返回的数据解析，将JSON字符串解析成Object
   *
   * @param {*} da
   * @returns
   */
  function parseData(da){
			
			if(typeof da != "object")
				da = JSON.parse(da);
			
			if(da.success!=null && da.success==false){
					closeLoading();
		    		PlgDialog.msg(da.message);
		    		return;
			}
			
			if(!da.data || da.data==""){
				PlgDialog.msg("数据为空");
				return;
			}
			
			var ldata;
			if(!da.data.list){
				ldata = da.data;
			}else{
				ldata = da.data.list;
			}
        rownum = (pageNum-1)*pageSize+1;
        

	    	try{
	    		mygrid.parse(converData(ldata),"json");
	    		changePageBtnStatus();
				resetSize();
	    	}catch(ex){
	    		PlgDialog.msg("数据错误！");
	    		return;
	    	}
			
			
			if(opts.page){
				createPageBar(pageBarId,da.data[opts.totalCount],pageNum);
			}
			//清空全选框
			if(opts.multiselect){
				var ch = $("#"+panelId+" .plg-grid-second-col");
				var cstr = ch.attr("src");
   				ch.attr("src",cstr.replaceAll("chk1","chk0"));
			}
   				
		}
		
	
		this.getElement = function(){
			return panel;
		}
		
		this.renderTo = function(id){
			renderTo(id);
			return this;
		}
		
		this.getGrid = function(id){
			return mygrid;
		}
		this.loadData = function(data,callback){
			loadData(data,callback);
		}
		this.getParams = function(){
			return opts.params;
		}
		this.setParams = function(params){
			opts.params = params;
			pageSize = params.pageSize?params.pageSize:pageSize;
			pageNum = params.pageNum?params.pageNum:pageNum;
		}
		this.reload = function(data){
			reload(data);
		}
    
    // 勾选的状态
		this.getCheckedIds = function(){
			return mygrid.getCheckedRows(1);
		}
    
    // 此处是选中之后背景色变化调用的这个方法
		this.getSelectedRowId = function(){
			return mygrid.getSelectedRowId();
		}
		
		this.getSelectedRowData = function(name){
			var rid = mygrid.getSelectedRowId();
			if(!name)
				return mygrid.getUserData(rid,"data");
			else{
				return mygrid.getUserData(rid,"data")[name];
			}
		}
		
		this.getRowData = function(rowId,fields){
			if(fields==null || fields.length==0)
				return  mygrid.getUserData(rowId,"data");
			else if(Array.isArray(fields)){
				var data={};
				for(var i=0;i<fields.length;i++){
					data[fields[i]] = mygrid.getUserData(rowId,"data")[fields[i]];
				}
				return data;
			}else{
				return  mygrid.getUserData(rowId,"data")[fields];
			}
		}
		
		this.getSelectedCellIndex = function(){
			return mygrid.getSelectedCellIndex();
		}
		this.getRowId = function(rowIndex){
			return mygrid.getRowId(rowIndex);
		}
		this.getRowIndex = function(rowId){
			return mygrid.getRowIndex(rowId);
		}
		
		this.getCellObject = function(rowId,colIndex){
			return mygrid.cells(rowId, colIndex);
		}
		this.getCellValue = function(rowId,colIndex){
			return mygrid.cells(rowId, colIndex).getValue();
		}
		
		this.getCellObject2 = function(rowIndex,colIndex){
			return mygrid.cells2(rowIndex, colIndex);
		}
		this.getCellValue2 = function(rowIndex,colIndex){
			return mygrid.cells2(rowIndex, colIndex).getValue();
		}
		
		/**
		 * 设置单元格值
		 */
		this.setCellValue = function(rowId,colIndex,value){
			var cell = mygrid.cells(rowId, colIndex);
			cell.setValue(value);
			var cname = columnArray[colIndex];
			var data = mygrid.getUserData(rowId,"data");
			if(data==null || data==""){
				data = {};
			}
			data[cname] = value;
			mygrid.setUserData(rowId,"data",data);
		}
		
		/**
		 * row_data为json对象
		 */
		this.addRow = function(rowId,row_data){
			var rdarray=[];
			rdarray.push(mygrid.getRowsNum()+1);
			var start=1;
			if(opts.multiselect){
				rdarray.push(0);
				start=2;
			}
			for(var i=start;i<columnArray.length;i++){
				var t = row_data[columnArray[i]];
				rdarray.push(t?t:"");
			}
			mygrid.addRow(rowId,rdarray.toString());
			mygrid.setUserData(rowId,"data",row_data);
		}
		
		this.getColumnsNum = function(){
			return mygrid.getColumnsNum();
		}
		
		
		this.getGridForm = function(){
			return gridForm;
		}
		
		this.getToolBarForm = function(){
			return toolBarForm;
		}
		
		this.setColWidth = function(colIndex,width){
			mygrid.setColWidth(colIndex,width.toString());
		}
		
		
		this.setColumnColor = function(array){
			mygrid.setColumnColor(array.toString());
		}
		
		this.setColumnHidden = function(colIndex,isHidden){
      
			mygrid.setColumnHidden(colIndex,isHidden);
		}
		
		this.setRowHidden = function(rowId,isHidden){
			mygrid.setRowHidden(rowId,isHidden);
		}
		this.selectRowById = function(rowId){
			mygrid.selectRowById(rowId);
		}
		
		this.resetSize = resetSize;
		
		this.on = function(eventName,callback){
			if(eventName=="beforeDialogOpen"){
				beforeDialogOpenEvent = callback;
			}else if(eventName=="afterDialogOpen"){
				afterDialogOpenEvent = callback;
			}else if(eventName=="onAfterSorting"){
				mygrid.attachEvent(eventName, function(index,type,direction){
					resetSize();
					callback(index,type,direction);
				});
			}else if(eventName=="onResizeEnd"){
				mygrid.attachEvent(eventName, function(obj){resetSize();callback(obj);});
			}else if(eventName=="onCheck"){
				
				mygrid.attachEvent(eventName, function(rId,cInd,state){
					if(cInd==1 && opts.multiselect){
		       			changePageBtnStatus();
		       		}
					callback(rId,cInd,state);
				});
			}else
				mygrid.attachEvent(eventName, callback);
			
		}
		
		this.attachEvent = this.on;
		
		this.attachToolBarEvent = function(eventName,callback){
			toolBarForm.on(eventName, callback);
		}
		
		this.splitAt = function(colIndex){
			mygrid.splitAt(colIndex);
			for(var i=0;i<hidenArray.length;i++){
				if(hidenArray[i])
					mygrid.setColumnHidden(i,true);
			}
		}
		
		var loadingEl;
		var showLoading = function(){
			loadingEl = PlgDialog.load(1,{anim:5,shade:[0.6,'#fff'],success:function(layero, index){
				$("#layui-layer"+index).appendTo("#"+gridId+" .objbox");
				$("#layui-layer-shade"+index).appendTo("#"+gridId+" .objbox");
			}});
			
			
		}
	
		var closeLoading = function(){
			PlgDialog.close(loadingEl);
		}
		
		this.showLoading = showLoading;
    this.closeLoading = closeLoading;
    
    var self = this;
    function setDefaultsMethods() {
      for(var key in mygrid){
        
        if(key.indexOf('_') === -1 && typeof mygrid[key] === 'function'){
          
          if(!self[key]){
            self[key] = mygrid[key];
          }
        }

      }
    }
		
		var colsSettinIndex;
		function showColsSettingDialog(selector){
			var html='<div class="layui-form plg-clsset-form" >';
			var k = opts.multiselect?2:1;
			for(var i=k;i<columnArray.length;i++){
				html += '<div class="layui-form-item plg-clsset-item"><input type="checkbox"  lay-filter="plgclssetitem" index='+i+' name="'+columnArray[i]+'" lay-skin="primary" title="'+headerArray[i]+'" '+(hidenArray[i]?'':'checked')+'></div>';
			}
			html +='<div style="clear:both;margin:0px;height:1px;">&nbsp;</div>';
			html +='</div>';
			//mygrid.setColumnHidden(i+2,true);
			colsSettinIndex = PlgDialog.tips(html,selector, {
				  tips: [3, '#fff'],
				  time: 0,
				  shade:0.001,
				  shadeClose:true,
				  success:function(){
					  layui.form.render("checkbox");
					  layui.form.on('checkbox(plgclssetitem)', function(data){
						  var ind = $(data.elem).attr("index");
						  if(data.elem.checked){
							  mygrid.setColumnHidden(ind,false);
							  hidenArray[ind] = false;
						  }else{
							  mygrid.setColumnHidden(ind,true);
							  hidenArray[ind] = true;
						  }
					}); 
					  
					  
				  }
			});
		}
		
		//this.show
		
		if(opts.renderer && opts.renderer!=""){
			renderTo(opts.renderer);
		}
	}
	
	//columns:[{id:"",name:"",type:'',sort:'',align:'',width:'',hidden:false,default:"",renderer:}]
	
	window.PlgGrid = plgGrid;
	
})(jQuery);
