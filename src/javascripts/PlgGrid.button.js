
function eXcell_button(cell){ //the eXcell name is defined here
	if (cell){                // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){}  //read-only cell doesn't have edit method
    this.isDisabled = function(){ return true; } // the cell is read-only, so it's always in the disabled state
    this.setValue=function(val){
    	 var row_id=this.cell.parentNode.idd; 
    	 //修改^resourc_editClick,删除^resourc_deleteClick
    	 var row_data = JSON.stringify(this.grid.getUserData(row_id,"data"));
    	// //console.log(row_data);
    	 row_data = row_data.replaceAll("'","");
    	 val = val.replaceAll(",",";");
    	 var btns = val.split(";");
    	 var str="";
    	 for(var k=0;k<btns.length;k++){
    		 var btnstr = btns[k];
    		 var btnv = btnstr.substring(0,btnstr.indexOf("^"));
    		 var btnevent = btnstr.substring(btnstr.indexOf("^")+1);
    		 
    		 str += "<div class='plg-divider plg-divider-vertical'></div><a class='' href='javascript:void(0);' onclick='"+btnevent+"(\""+row_id+"\","+row_data+")' >"+btnv+"</a>";
    	 }
    	 str = str.substring(str.indexOf("<a"));
        this.setCValue(str,val); 
    }
}
eXcell_button.prototype = new eXcell;// nests all other methods from the base class
