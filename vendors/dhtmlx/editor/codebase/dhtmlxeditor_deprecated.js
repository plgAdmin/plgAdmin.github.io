/*
Product Name: dhtmlxEditor 
Version: 5.1.0 
Edition: Standard 
License: content of this file is covered by DHTMLX Commercial or enterpri. Usage outside GPL terms is prohibited. To obtain Commercial or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

window.dhtmlxAjax={get:function(a,c,b){if(b){return dhx4.ajax.getSync(a)}else{dhx4.ajax.get(a,c)}},post:function(a,b,d,c){if(c){return dhx4.ajax.postSync(a,b)}else{dhx4.ajax.post(a,b,d)}},getSync:function(a){return dhx4.ajax.getSync(a)},postSync:function(a,b){return dhx4.ajax.postSync(a,b)}};dhtmlXToolbarObject.prototype.loadXML=function(a,b){this.loadStruct(a,b)};dhtmlXToolbarObject.prototype.loadXMLString=function(b,a){this.loadStruct(b,a)};dhtmlXToolbarObject.prototype.setIconPath=function(a){this.setIconsPath(a)};