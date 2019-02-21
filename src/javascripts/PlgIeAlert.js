(function(){

    function PlgIeAlert() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
     /*    Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E) */
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE||isIE11) {
            var obody=document.getElementsByTagName("body")[0];
            obody.innerHTML=IEhtml()
            return false

        } else if(isEdge) {
       
            return;//edge
        }else{
            return;//不是ie浏览器
        }
    }
    
    function IEhtml(){
        return['<div class="ieReg"><div class="banler"><div class="ie_content"><div class="topbar"><i class="ie_img"></i><span style="color:#cc6600">尊敬的用户：</span>您当前浏览器版本过低，本站功能可能无法正常浏览，请使用或下载以下几种推荐浏览器已达到最佳效果。</div><ul class="bro_list"><li><i class="chrome"></i><p>谷歌浏览器</p></li><li><i class="fires"></i><p>火狐浏览器</p></li><li><i class="Safari"></i><p>Safari苹果浏览器</p></li><li><i class="Edge"></i><p>Microsoft Edge</p></li></ul></div></div><div class="ie_content n_2"></div></div>'].join("");;   
    }
    
    window.onload=function(){
        PlgIeAlert()
    }
    
})()

