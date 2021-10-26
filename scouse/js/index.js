// var browserVersion=window.navigator.userAgent.toUpperCase();
// var isOpera=browserVersion.indexOf("OPERA") >-1 ? true : false;
// var isFireFox=browserVersion.indexOf("FIREFOX") >-1 ? true : false;
// var isChrome=browserVersion.indexOf("CHROME") >-1 ? true : false;
// var isSaFari=browserVersion.indexOf("SAFARI") >-1 ? true : false;
// var isIE =(!!window.ActiveXObject || "AxtiveXObject" in window);
// var isIE9More = (! -[1, ]==false);



var tag_Obj={
    'tag1':{'className1':'icon-list1','className2':'icon-list1-ch','url':'firstPage.html'},
    'tag2':{'className1':'icon-list2','className2':'icon-list2-ch','url':''},
    'tag3':{'className1':'icon-list3','className2':'icon-list3-ch','url':''},
    'tag4':{'className1':'icon-list4','className2':'icon-list4-ch','url':''},
    'tag5':{'className1':'icon-list5','className2':'icon-list5-ch','url':''},
    'tag6':{'className1':'icon-list6','className2':'icon-list6-ch','url':''},
    'tag7':{'className1':'icon-list7','className2':'icon-list7-ch','url':'appPage.html'}
};

$(document).ready(function (){
    
    $('.icon_magin').click(function (e){
        //跳转且改变颜色
        loadPage_Iframe(this.id)
    })
    resize()
});
$(window).resize(function (){
    /*$('#inHtml').scrollTop(0);*/
    resize();
})
function resize() {
    if($(window).width()>1920){
        $(".bgckground").addClass('bgckground_width');
    }else{
        $(".bgckground").removeClass('bgckground_width');
    }
}
/*加载网页*/
function loadPage_Iframe(id){
    if ($('#'+id).hasClass('text_color2')){//点击黄色标签

    }else if ($('#'+id).hasClass('text_color1')){//点击白色标签
        //alert($('.text_color2')[0].id);
        let temp=$('.text_color2');
        var yellowId=temp[0].id;
        //去除选中样式
        $('#'+yellowId).removeClass(tag_Obj[yellowId].className2);
        $('#'+yellowId).removeClass('text_color2');
        $('#'+yellowId).addClass('text_color1');
        $('#'+yellowId).addClass(tag_Obj[yellowId].className1)
        //添加选中样式
        $('#'+id).removeClass(tag_Obj[id].className1);
        $('#'+id).removeClass('text_color1');
        $('#'+id).addClass('text_color2');
        $('#'+id).addClass(tag_Obj[id].className2)
    }else {
        console.log('出错了')
    }
    //加载iframe页
    $('#inHtml').attr('src',tag_Obj[id].url)
}

/*获取iframe高度*/
function getIframHeight(){
    // alert('asd');
    // var iframeHeight = $("#inHtml").contents().find("body").height();
    // $("#inHtml").height(iframeHeight);

    // var ifm = document.getElementById("inHtml");
    // var subWeb = document.frames ? document.frames["inHtml"].document : ifm.document;
    // if (ifm != null && subWeb != null) {
    //     ifm.height = subWeb.body.scrollHeight;
    //     ifm.width = subWeb.body.scrollWidth;
    // }
    
    // try{
    //     var ifm = document.getElementById('inHtml');
    //     var bHeight=0;
    //     if(isChrome==false && isSaFari == false)
    //         bHeight=ifm.contentWindow.document.body.scrollHeight;
        
    //     var dHeight=0;
    //     if(isFireFox == true)
    //         dHeight=ifm.contentWindow.document.documentElement.offsetHeight+2;
    //     else if(isIE==false && isOpera==false){
    //         dHeight=ifm.contentWindow.document.documentElement.scrollHeight
    //     }else if(isIE==true && isIE9More){//ie9
    //         var heightDeviation=bHeight-eval("window.IE9MoreRealHeight"+"inHtml");
    //         if(heightDeviation){
    //             bHeight +=3
    //         }else if(heightDeviation !=3){
    //             eval("window.IE9MoreRealHeight"+"inHtml"+"="+bHeight);
    //             bHeight += 3;
    //         }
    //     }else
    //         bHeight += 3;
            
    //         var height = Math.max(bHeight,dHeight);
    //         if(height<300) height=300;
    //         ifm.style.height="300px";
        
    // }catch{

    // }
    
    var ifm = document.getElementById("inHtml");
    console.log(ifm);
    console.log($("#inHtml"));
    console.log($("#inHtml").contents().find("body"));
    console.log($("#inHtml").contents().find("body").html());
     console.log(this);
    
    
}
var frame = document.getElementById('inHtml')
window.addEventListener('message', function(e) {
    var a =e.data['height'];
    var b = e.data['width'];
    $('.ifm').height(a+'px');
    // $('.ifm').width(b+'px');
    // frame.height = 2213 ;
    // frame.width = e.data['width'] + 'px'
})