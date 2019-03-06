
//* 栅格块行
dhtmlXForm.prototype.items.row = {
  _index: false,
  render: function (item, data) {

    item._type = "row";
    
    
    item.className="row_"+data.position+(typeof (data.className) == "string" ? " " + data.className : "");

    item._enabled = true;
		item._checked = true; 
    var _self = this,
      cid = "dhxId_row" + Prolog.createRandomId();

    var rowDiv = document.createElement("div");
    
    rowDiv.id= item._cid =cid; 
    rowDiv.className="cl";
    if (data.style) rowDiv.style.cssText = data.style;


    if( !isNaN(data.width)){
      item._width = data.width+"px";
    }else{
      item._width= "100%"
    }
   
    rowDiv.style.width= item._width ;
    item.parentNode.style.cssText = "width:100%; "
    item.parentNode.parentNode.style.float = "none";
    item.parentNode.parentNode.style.clear = "both";
    item.appendChild(rowDiv);
    if (data.hidden == true) this.hide(item);
    if (data.disabled == true) this.userDisable(item);
    
    item._addSubListNode = function() {
      var t = document.createElement("DIV");
	    t._custom_css = "_row_list";
      t._ofsNested = 0;
      setTimeout(function(){
        t.childNodes[0].setAttribute("class","layui-row");

      },0)
      this.childNodes[0].appendChild(t);
			return t;
    }
    
 
    return this;
  },
  
  destruct: function (item) {
    item.innerHTML = "";
  },
  setValue: function (item) {},
  getValue: function (item) {},
  enable: function (itme) {

  },
  disable: function (itme) {

  },
  getText: function (itme) {

  },
  getWidth:function(){

  }
}
