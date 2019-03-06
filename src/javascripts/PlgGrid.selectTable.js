
function eXcell_selectTable(cell){                                    //excell name is defined here
    if (cell){                                                     //default pattern, just copy it
				this.cell = cell;
				this.grid = this.cell.parentNode.grid;
				this.cell.selectTable = null;
				this.cellIndex = cell.cellIndex;
				this.cellColumnId = this.grid.columnIds[this.cellIndex];
				this.active = false;
			}
			this.setValue=function(val){
				if(val==null)
					return;
				var row_id=this.cell.parentNode.idd; 
				var ddd = this.cell.parentNode;
				//debug;
				//console.log(ddd);
				var data = this.grid.getUserData(row_id,"data");
				if(data==null || data==""){
					data = {};
				}

				if(typeof val == "object"){
					this.setCValue(val.text);
					this.cell.selectTable_value = val.value;
					this.cell.selectTable_text = val.text;
				}else{
					try{
						var jo = JSON.parse(val);
						this.setCValue(jo.text);
						var tv = jo.value;
						if(typeof tv =="object")
							tv = JSON.stringify(tv);
						this.cell.selectTable_value = tv;
						this.cell.selectTable_text = jo.text;
					}catch(e){
						this.setCValue(val);
						this.cell.selectTable_value = val;
						this.cell.selectTable_text = val;
					}
				}

				data[this.cellColumnId] = val;
				this.grid.setUserData(row_id,"data",data);
																								
			}

			this.getValue=function(){
					return this.cell.selectTable_value || ""; // get value
			}

		this.edit=function(){
			var cv = this.cell.selectTable_value;
			var ct = this.cell.selectTable_text;
			var opts = this.grid.opts;
			var columnOpt;
			for(var i=0;i<opts.columns.length;i++){
				if(opts.columns[i].id==this.cellColumnId){
					columnOpt=opts.columns[i];
					break;
				}
			}
			var table = columnOpt.table;

			this.cell.innerHTML="<div id='selectTable_xcell_00001'></div>";
			var _this = this;
			
			if(table.beforeLoad){
				var beforeCall = table.beforeLoad;
				beforeCall(table);
			}

			var opts ={
				renderer : "selectTable_xcell_00001",
				items : [
				{type:"settings",position:"label-left",labelWidth:0,inputWidth:35},
				{type:"selectTable",table: table, fieldText: columnOpt.fieldText, fieldValue: columnOpt.fieldValue, name:this.cellColumnId, label:"",placeholder:'单击选择',
				listener:
					{
						"afterClose":function(txt,value,plgGrid){
							_this.cell.innerHTML="";
							_this.setValue({"text":txt,"value":value});
							_this.active=false;
							if(columnOpt.listener && columnOpt.listener.afterClose){
								var cb1 = columnOpt.listener.afterClose;
								cb1(txt,value,plgGrid);
							}
						},
						"init":function(grid){
							_this.active=true;
							if(columnOpt.listener && columnOpt.listener.init){
								var cb2 = columnOpt.listener.init;
								cb2(grid);
							}
						},
						"afterSelect":function(isSelected,selectId,sgrid){
							if(columnOpt.listener && columnOpt.listener.afterSelect){
								var cb3 = columnOpt.listener.afterSelect;
								cb3(isSelected,selectId,sgrid);
							}
						}
					}
				}]
			};
			var frm = new PlgForm(opts);
			this.cell.selectTable = frm;
			if(cv!=null && ct !=null){
				frm.getDForm().setData(this.cellColumnId,ct,cv);
			}
			
    }
    this.detach=function(){
			if(!this.active)
				this.cell.innerHTML="";
			return false;
    }
}
eXcell_selectTable.prototype = new eXcell;    // nests all other methods from base class
