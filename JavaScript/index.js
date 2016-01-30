$(function(){
    var box = $('.box');
    var copy = $(".copy");
    var canvas = $("canvas");
    var cobj =canvas[0].getContext("2d");

    //canvas.attr({
    //    height:copy.height(),
    //    width:copy.width()
    //})
    /* 菜单列表的打开与收缩 */
    $(".hasson").hover(function(){
        $(this).find(".son").finish();
        $(this).find(".son").fadeIn(200);
    },function(){
        $(this).find(".son").fadeOut(200);
    })

    /* 传参 调用 */
    var obj=new shape(copy[0],canvas[0],cobj);
    obj.draw();

    /* 图形 选择 */
    $(".shapes:first").find(".son li").click(function(){
        obj.shapes = $(this).attr("data-role");
        if($(this).attr("data-role")!="pen"){
            obj.draw();
        }else{
            obj.pen();
        }

    })

    /* 画图 方式 */
    $(".type:first").find(".son li").click(function(){
        obj.type = $(this).attr("data-role");
        obj.draw();
    })

    /* 边框 颜色 填充 */
    $(".pencolor:first").find("input").click(function(){
        var that = $(this);
       $(this).blur(function(){
            obj.strokeStyle = that.val();
        });
    })

    /* 填充 颜色 */
    $(".bgcolor:first").find("input").click(function(){
        var that = $(this);
       $(this).blur(function(){
            obj.fillStyle = that.val();
        });
    })

    /* 边框粗细选择 */
    $(".lineWidth:first").find(".son li").click(function(){
        obj.lineWidth = Number($(this).attr("data-role"));
        obj.draw();
    })


    /* 撤销 */  /* 下载 */
    $(".guanli").find(".son li").click(function(){
        if($(this).attr("data-role")=="chexiao"){
            if(obj.arr.length>1){
                obj.arr.pop();
                obj.cobj.putImageData(obj.arr[obj.arr.length-1],0,0);
            }
        }else if($(this).attr("data-role")=="onload"){
            if(obj.arr.length>0){
                var yes=window.confirm("是否要保存");
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
                }
            }
            obj.history=[];
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
        }else if($(this).attr("data-role")=="looked"){
            location.href=(canvas[0].toDataURL().replace("data:img"))
        }else{

        }
    })

    /* 橡皮 */

    $(".xpsize li").click(function(){
        var w=$(this).attr("data-role");
        var h=$(this).attr("data-role");
        $(".zi").css({lineHeight:w+"px",fontSize:w+"px",fontWeight:600})
        obj.xp($(".xp"),w,h)
    })

    /* 选择 */
    $(".xuanze").click(function(){
        obj.select($(".selectArry"));
    })


    $("body").css({"background":"url(./images/da/app.png) no-repeat center center","background-size":"cover"})


    var ree=[],cee=[];
    function huanse(url,num){
        $("body").css({"background":"url("+url+") no-repeat center center","background-size":"cover"})
        $(".hasson").css({background:ree[num],color:cee[num]});
    }
    var nums = 0 ;
    $(".zhuti").click(function(){
        nums++;
        if(nums==6){nums=0;}
        $(".gx").css("display","none");
        $($(".gx")[nums]).css("display","block");
    })
    $(document).mousedown(function(e){
        e.preventDefault();
    })
})