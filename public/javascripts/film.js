$(document).ready(function () {
    var pagesize=10000/8;
    var page=1;//当前所在页面
    var pagecount=1;

    /*初始化*/
    //给每一项都变值
    $(".pagination").find('li').each(function () {
        if($(this).index()!=0&&$(this).index()!=8){
            $(this).children("a").text($(this).index()+(pagecount-1)*7);
        }
    });
    $(".pagination").find('li').eq(1).children("a").addClass('active');
    $.ajax({
        url:"http://127.0.0.1:3000/film",
        type:"POST",
        dataType:"json",
        data:{
            left:'0',
            right:'7'
        },
        success:function (data) {
            data=resolveResult(data);
            for(var i=0;i<data.length;++i){
                $("img")[i].src=data[i].poster;
                $("a")[i].innerText=data[i].title;
                $("p")[i].innerText=data[i].pubdate[0]+"("+data[i].countries[0]+")";
                for(var j=0;j<data[i].casts.length;++j){
                        $("p")[i].innerText+="/"+data[i].casts[j].name;
                }
                if(data[i].rating.rating_people.length!=0)
                    markStar(parseFloat(data[i].rating.average),parseInt(data[i].rating.rating_people),i);
                else
                    markStar(0,0,i);
            }
        },
        error:function (e) {
          console.log("error");
        }
    });
    /*初始化结束*/
    $(".pagination").on("click","li",function(){
        var a=$(this).children("a");
        switch($(this).index()){
            case 0:
                if(pagecount==1)
                    break;
                pagecount--;
                //给每一项都变值
                $(".pagination").find('li').each(function () {
                    if($(this).index()!=0&&$(this).index()!=8){
                        $(this).children("a").text($(this).index()+(pagecount-1)*7);
                    }
                });
                $(".pagination").find('li').eq(page-pagecount*7).children("a").removeClass();
                $(".pagination").find('li').eq(1).children("a").addClass('active');
                page=(pagecount-1)*7+1;
                $.ajax({
                    url:"http://127.0.0.1:3000/film",
                    type:"POST",
                    data:{
                        left:(page-1)*8,
                        right:(page-1)*8+7
                    },
                    dataType:"json",
                    success:function(data){
                        data=resolveResult(data);
                        for(var i=0;i<data.length;++i){
                            $("img")[i].src=data[i].poster;
                            $("a")[i].innerText=data[i].title;
                            $("p")[i].innerText=data[i].pubdate[0]+"("+data[i].countries[0]+")";
                            for(var j=0;j<data[i].casts.length;++j){
                                $("p")[i].innerText+="/"+data[i].casts[j].name;
                            }
                            if(data[i].rating.rating_people.length!=0)
                                markStar(parseFloat(data[i].rating.average),parseInt(data[i].rating.rating_people),i);
                            else
                                markStar(0,0,i);
                        }
                    },
                    error:function (e) {
                        console.log("error");
                    }
                });
                break;
            case 8:
                if(pagecount==pagesize/7+1)
                    break;
                pagecount++;
                //给每一项都变值
                $(".pagination").find('li').each(function () {
                    if($(this).index()!=0&&$(this).index()!=8){
                        if($(this).index()+(pagecount-1)*7<=pagesize)
                            $(this).children("a").text($(this).index()+(pagecount-1)*7);
                        else
                            $(this).children("a").innerText="";
                    }
                });
                $(".pagination").find('li').eq(page-(pagecount-2)*7).children("a").removeClass();
                $(".pagination").find('li').eq(1).children("a").addClass('active');
                page=(pagecount-1)*7+1;
                $.ajax({
                    url:"http://127.0.0.1:3000/film",
                    type:"POST",
                    data:{
                        left:(page-1)*8,
                        right:(page-1)*8+7
                    },
                    dataType:"json",
                    success:function(data){
                        data=resolveResult(data);
                        for(var i=0;i<data.length;++i){
                            $("img")[i].src=data[i].poster;
                            $("a")[i].innerText=data[i].title;
                            $("p")[i].innerText=data[i].pubdate[0]+"("+data[i].countries[0]+")";
                            for(var j=0;j<data[i].casts.length;++j){
                                $("p")[i].innerText+="/"+data[i].casts[j].name;
                            }
                            if(data[i].rating.rating_people.length!=0)
                                markStar(parseFloat(data[i].rating.average),parseInt(data[i].rating.rating_people),i);
                            else
                                markStar(0,0,i);
                        }
                    },
                    error:function (e) {
                        console.log("error");
                    }
                });
                break;
            default:
                if(!a.hasClass("active")) {
                    $(".pagination").find('li').eq(page - (pagecount - 1) * 7).children("a").removeClass();
                    page = parseInt(a.text());
                    a.addClass("active");
                    $.ajax({
                        url:"http://127.0.0.1:3000/film",
                        type:"POST",
                        data:{
                            left:(page-1)*8,
                            right:(page-1)*8+7
                        },
                        dataType:"json",
                        success:function(data){
                            data=resolveResult(data);
                            for(var i=0;i<data.length;++i){
                                $("img")[i].src=data[i].poster;
                                $("a")[i].innerText=data[i].title;
                                $("p")[i].innerText=data[i].pubdate[0]+"("+data[i].countries[0]+")";
                                for(var j=0;j<data[i].casts.length;++j){
                                    $("p")[i].innerText+="/"+data[i].casts[j].name;
                                }
                                if(data[i].rating.rating_people.length!=0)
                                    markStar(parseFloat(data[i].rating.average),parseInt(data[i].rating.rating_people),i);
                                else
                                    markStar(0,0,i);
                            }
                        },
                        error:function (e) {
                            console.log("error");
                        }
                    });
                }
                break;
        }
    });
    //标题点击事件
    $(".filmtitle").each(function (i,a) {
        $(a).on('click',function(){
            console.log(i);
            window.open(getURL((page-1)*8+i,"/filmDetail"));
        });
    })
});
//评分函数 average代表得分，ratingPeople代表打分人数，position代表是第几组
function markStar(average,ratingPeople,position) {
    var fullStar=Math.floor(Math.round(average)/2);
    var halfStar=Math.round(average)%2;
    for(var i=0;i<fullStar;i++){
        $("span")[position*7+i].className="star full";
    }
    for(var i=0;i<halfStar;i++){
        $("span")[position*7+fullStar+i].className="star half";
    }
    for(var i=0;i<5-halfStar-fullStar;i++){
        $("span")[position*7+fullStar+halfStar+i].className="star empty";
    }
    $("span")[position*7+5].innerText=average;
    $("span")[position*7+6].innerText=ratingPeople+"评价";
}
function getURL(dataNumber,url) {
    return url+"?"+"number="+dataNumber;
}

function resolveResult(data) {
    var finalresult=[];
    for(var i=0;i<data.length;++i){
        finalresult.push(JSON.parse(data[i].filmjson));
    }
    return finalresult;
}

