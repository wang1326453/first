// document.addEventListener('DOMContentLoaded', function() {
//     var tbody = document.body
//     var width = tbody.clientWidth
//     var height = tbody.clientHeight
//     window.parent.postMessage({
//         height: height,
//         width: width
//     }, '*')
// }, false)

$(document).ready(function (){
    
    //getIframHeight();
    //加载通知公告列表
    showTongzhi();
    //获取应用列表

    //我的待办
    getTableShichang();
    //政策文件表格加载
    getZhengceList();
    //点击我的待办头部标签加载表格
    $('.head2').click(function (e) {
        daibanTabChange(this.id);
    });
    $('.head1').click(function (e) {
        daibanTabChange(this.id);
    });
    //点击我的应用标签切换
    $('.yingyong_btn1').click(function (e){
        appTagChange(this.id);
    });
    $('.yingyong_btn2').click(function (e){
        appTagChange(this.id);
    });

    //问题查询按钮
    $('#inout_que_btn').on('click',senQusMsg);

    //输入问题
    $('#ques_input').on('keyup',function (){
        this.value=this.value.replace( /^\s*/, '')
        numAndBtnState(inputState);
    })
    var inputState=true;
    $('#ques_input').on('compositionstart',function (){
        inputState=false;
    })
    $('#ques_input').on('compositionend',function (){
        inputState=true;
    })

    $('#ques_input').on('input',numAndBtnState(inputState))


    
    
})
/*加载通知公告列表*/
function showTongzhi(){
    /*$.ajax({
        url:"",    //请求的url地址
        dataType:"json",   //返回格式为json
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        data:{"id":"value"},    //参数值
        type:"POST",   //请求方式
        beforeSend:function(){
            //请求前的处理
        },
        success:function(req){
            //请求成功时处理
        },
        complete:function(){
            //请求完成的处理
        },
        error:function(){
            //请求出错处理
        }
    })*/
    let data=gonggaoList;
    $('#gonggao').html('');
    for (let i=0;i<data.length;i++){
        $('#gonggao').append('<li><div class="span-f gonggaoLi_f"><span>'+data[i].msg+'</span></div><span class="span-e">1996-02-13</span></li>');
    }

}

/*修改计数和按钮状态*/
function numAndBtnState(state){
    setTimeout(function (){
        if (state){
            //改变num
            $('#input_num1').html($('#ques_input').val().length);
            //改变按钮状态
            if ($('#ques_input').val().length>0){
                $('#inout_que_btn').attr('disabled',false);
                $('#inout_que_btn').removeClass('question_btn');
                $('#inout_que_btn').addClass('question_btn1');
            }else {
                $('#inout_que_btn').attr('disabled',true);
                $('#inout_que_btn').removeClass('question_btn1');
                $('#inout_que_btn').addClass('question_btn');
            }
        }
    },0)
}
/*点击发送按钮查询问题*/
function senQusMsg(){
    let inputInfo=$('#ques_input').val();
    //像后端发送信息成功后
    /*$.ajax({

    })*/
    $('#talk_info').append('<div class="talk_div2"><div class="mine_img flo_r"></div>' +
        '<div class="talk_text mine_text_radiu flo_r">' +inputInfo+
        '</div>')
    $('#ques_input').val('');
    $('#input_num1').html('0');
    console.log($('#talk_info').prop('scrollHeight'));
    $('#talk_info').scrollTop($('#talk_info').prop('scrollHeight'));
    $('#inout_que_btn').attr('disabled',true);
    $('#inout_que_btn').removeClass('question_btn1');
    $('#inout_que_btn').addClass('question_btn');
}


/*我的常用与我的应用之间切换*/
function appTagChange(id){
    if ($('#'+id).attr('class')=='yingyong_btn1'){
        $('.yingyong_btn2').addClass('yingyong_btn1');
        $('.yingyong_btn2').removeClass('yingyong_btn2');
        $('#'+id).addClass('yingyong_btn2');
        $('#'+id).removeClass('yingyong_btn1');
        getAppList(id)
    }
}
/*获取应用列表*/
function getAppList(id){
    let temtData;
    if(id=='app_aways'){
        temtData=appList_aways;
    }else if (id=='app_mine') {
        temtData=appList_mine;
    }else {
        return null;
    }
    innerHtml_appDiv(temtData);
}
/*将httml拼接进去*/
function innerHtml_appDiv(data){
    $('#app_area').html('');
    if (data.length>6){
        for (let i=0;i<6;i++){
            $('#app_area').append('<div class="col-md-6 btn_app">' +'<div class="app">'+data[i].appName+'</div></div>');
        }
    }else {
        for (let i=0;i<data.length;i++){
            $('#app_area').append('<div class="col-md-6 btn_app">' +'<div class="app">'+data[i].appName+'</div></div>');
        }
    }

}
/*点击我的代办头部标签*/
function daibanTabChange(id){
    if ($('#'+id).attr('class')=='head1'){
        getTableShichang()
    }else {
        $('.head1').addClass('head2');
        $('.head1').removeClass('head1');
        $('#'+id).removeClass('head2');
        $('#'+id).addClass('head1');
        getTableShichang()
    }

}
/*获取我的代办表格*/
function getTableShichang(){
    $('#shichang').bootstrapTable({
        url:null,
        queryParams:function (p){

        },
        data:shichangList,
        columns:[{
            field: 'number',
            title: '序号',
            width:5 ,
            align:'center',
            switchable:false,
            formatter:function(value,row,index){
                return index+1;//这样的话每翻一页都会重新从1开始，
            }
        },{
            field:'id',
            title:'id',
            visible:false

        },{
            field:'name',
            align:'left',
            title:'任务名称',
            cellStyle: function (){
                return {
                    css:{
                        'min-width':'260px',
                        'white-space':'nowrap',
                        'text-overflow':'ellipsis',
                        'overflow':'hidden',
                        'max-width':'300px'
                }
                }
            }
        },{
            field:'date',
            align:'center',
            title:'送达时间',
            cellStyle: function (){
                return {css:{'min-width':'110px'}}
            }
        },{
            field:'id',
            align:'center',
            title:'操作',
            formatter:function (value, row, index){
                return "<button class='bt_table'>办理进度</button>"
            },
            cellStyle: function (){
                return {css:{'min-width':'110px'}}
            }
        },{
            field:'state',
            align:'center',
            title:'是否查看',
            formatter:function (value,row,index){
                if (value==1){
                    return "<text style='color: #3591D1 ;font-weight: bold'>是</text>"
                }else {
                    return "<text style='color: #FB8466;font-weight: bold'>否</text>"
                }
            },
            cellStyle: function (){
                return {css:{'min-width':'100px'}}
            }
        }]
    })
}
/*获取政策文件表格*/
function getZhengceList(){
    $('#zhengce').bootstrapTable({
        url:null,
        queryParams:function (p){

        },
        data:zhengceList,
        columns:[{
            field: 'number',
            title: '序号',
            width:4 ,
            align:'center',
            switchable:false,
            formatter:function(value,row,index){
                return index+1;//这样的话每翻一页都会重新从1开始，
            }
        },{
            field:'id',
            title:'id',
            visible:false

        },{
            field:'name',
            align:'left',
            title:'文件名称',
            cellStyle: function (){
                return {
                    css:{
                        'min-width':'20px',
                        'white-space':'nowrap',
                        'text-overflow':'ellipsis',
                        'overflow':'hidden',
                        'max-width':'280px'

                    }
                }
            }

        },{
            field:'date',
            align:'center',
            title:'发布时间',
            cellStyle: function (){
                return {css:{'color':'#AAADB2','min-width':'110px'}}
            }
        },{
            field:'typeName',
            align:'center',
            title:'主题分类',
            cellStyle: function (){
                return {css:{'color':'#3591D1','font-weight':'bold','min-width':'95px'}}
            }
        },{
            field:'bumenName',
            align:'center',
            title:'发布部门',
            cellStyle: function (){
                return {css:{'color':'#565E6A','min-width':'95px'}}
            }
        },{
            field:'id',
            align:'center',
            title:'操作',
            width: '80px',
            formatter:function (value, row, index){
                return "<a class='down_load'><i></i>下载</a>"
            },
            cellStyle: function (){
                return {css:{'min-width':'55px'}}
            }
        }]
    })
}





var gonggaoList=[{'id':1,'msg':'自治区市场监管同和施工i数据放到工i数据市场监工i数管同和管同和施工i数据放到工i数据市场监工i数管同和施工施工i数据放据放到','time':'1996-02-13'},
    {'id':2,'msg':'自治区市场监管同放到','time':'1996-02-13'},
    {'id':3,'msg':'自治区市场监管同和施工i数据放到','time':'1996-02-13'},
    {'id':4,'msg':'自治区市场监管同和施工i数据i数管同和施工i数据放到工i数据市场监工i数管同和管同和施工i数据放到工i数据市场监工i数管同和施工施工i数据i数管同和施工i数据放到工i数据市场监工i数管同和管同和施工i数据放到工i数据市场监工i数管同和施工施工i数据放到管同和施工i数据放','time':'1996-02-13'},
    {'id':5,'msg':'自治区市场监管同和施工i数据放到工i数据市场监工i数管同和管同和施工i数据放到工i数据市场监工i数管同和施工施工i数据放据放到','time':'1996-02-13'},
    {'id':6,'msg':'自治区市场监管同和施工i数据放到工i数据市场监工i数管同和管同和施工i数据放到工i数据市场监工i数管同和施工施工i数据放据放到','time':'1996-02-13'},
    {'id':7,'msg':'自治区市场监管同和施工i数据放到工i数据市场监工i数管同和管同和施工i数据放到工i数据市场监工i数管同和施工施工i数据放据放到','time':'1996-02-13'},
]


var appList_mine=[
    {
        'appId':0,'appName':'市场监管综合业务管理系统'
    },
    {
        'appId':1,'appName':'宁夏三品一械广告审查系统'
    },
    {
        'appId':2,'appName':'宁夏行政审批与公共服务系统'
    },
    {
        'appId':3,'appName':'市场监管业务综合管理系统'
    },
    {
        'appId':4,'appName':'宁夏三品一械广告审查系统'
    },
    {
        'appId':5,'appName':'宁夏行政审批与公共服务系统'
    },
    {
        'appId':6,'appName':'宁夏行政审批与公共服务系统45'
    },
    {
        'appId':7,'appName':'宁夏三品一械广告审查系统421'
    },
    {
        'appId':8,'appName':'不知道什么系统'
    }
]

var appList_aways=[
    {
        'appId':0,'appName':'市场监管综合业务管理系统'
    },
    {
        'appId':1,'appName':'宁夏三品一械广告审查系统'
    },
    {
        'appId':2,'appName':'宁夏行政审批与公共服务系统'
    }
]



var shichangList=[
    {
    'id':1, 'name':'银川市市场监管局关于组织开展测试长度问题','date':'2018-10-11','state':0
    },
    {
        'id':2, 'name':'银川市市场监管局关于组织开展要居中还是要靠左侧呢要居中还是要靠左侧呢','date':'2018-10-11','state':0
    },
    {
        'id':3, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','state':0
    },
    {
        'id':4, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','state':1
    },
    {
        'id':5, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','state':0
    },
    {
        'id':4, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','state':1
    },
    {
        'id':5, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','state':0
    }
]

var zhengceList=[
    {
        'id':1, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','type':1,'typeName':'政务督查','bumenId':105,'bumenName':'政务督查'
    },
    {
        'id':2, 'name':'银川市市场监管局关于组织开展银川市市场监管局关于组织开展','date':'2018-10-11','type':2,'typeName':'电子政务','bumenId':107,'bumenName':'电子政务'
    },
    {
        'id':3, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','type':2,'typeName':'电子政务','bumenId':107,'bumenName':'电子政务'
    },
    {
        'id':4, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','type':3,'typeName':'食品监督','bumenId':112,'bumenName':'食品监督'
    },
    {
        'id':5, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','type':4,'typeName':'药品监督','bumenId':100,'bumenName':'药品监督'
    },
    {
        'id':6, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','type':2,'typeName':'电子政务','bumenId':107,'bumenName':'电子政务'
    },
    {
        'id':7, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','type':3,'typeName':'食品监督','bumenId':112,'bumenName':'食品监督'
    },
    {
        'id':8, 'name':'银川市市场监管局关于组织开展','date':'2018-10-11','type':4,'typeName':'药品监督','bumenId':100,'bumenName':'药品监督'
    }
]

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function (params) {
        var tbody = document.body
    var width = tbody.clientWidth
    var height = tbody.clientHeight
    window.parent.postMessage({
        height: height,
        width: width
    }, '*')
    },200)
}, false)
