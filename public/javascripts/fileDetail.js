$(document).ready(function () {
    var number=getQueryString("number","");
    $.ajax({
        url:"http://127.0.0.1:3000/filmDetail",
        type:"POST",
        data:{
            id:number
        },
        dataType:"json",
        success:function (data) {
            data=resolveData(data);
            init(data);
            mark(data);
            if(data.rating.rating_people.length!=0)
            markStar(parseFloat(data.rating.average),parseInt(data.rating.rating_people));
            else
                markStar(0,0);
        }
    })
});
function getQueryString(name,url) {
    url=url||window.location.search.substr(1);
    console.log(url.split('='));
    return url.split('=')[1];
}
function init(data){
    $("img")[0].src=data.poster;
    $("p").eq(0).text(data.title+" ("+data.year+")");
    $("p").eq(1).text("导演： "+data.directors[0].name);
    var casts="";
    for(var i=0;i<data.casts.length-1;i++){
        casts+=data.casts[i].name+"/ ";
    }
    $("p").eq(2).text("主演： "+casts+data.casts[data.casts.length-1].name);
    var genres="";
    for(var i=0;i<data.genres.length-1;i++){
        genres+=data.genres[i]+"/ ";
    }
    $("p").eq(3).text("类型： "+genres+data.genres[data.genres.length-1]);
    var countries="";
    for(var i=0;i<data.countries.length-1;i++)
        countries+=data.countries[i]+"/ ";
    $("p").eq(4).text("制片国家/地区: "+countries+data.countries[data.countries.length-1]);
    var languages="";
    for(var i=0;i<data.languages.length-1;i++)
        languages+=data.languages[i]+"/ ";
    $("p").eq(5).text("语言: "+languages+data.languages[data.languages.length-1]);
    var pubdate="";
    for(var i=0;i<data.pubdate.length-1;i++)
        pubdate+=data.pubdate[i]+"/";
    $("p").eq(6).text("上映日期: "+pubdate+data.pubdate[data.pubdate.length-1]);
    var aka="";
    for(var i=0;i<data.aka.length-1;i++)
        aka+=data.aka[i]+"/ ";
    $("p").eq(7).text("又名: "+aka+data.aka[data.aka.length-1]);
    $(".filmSummary").text(data.title.split(" ")[0]+"的剧情简介 · · · · · ·");
    $("p").eq(8).text("  "+data.summary);
}
function mark(data) {
    $("h").eq(1).text(data.rating.average);
    for(var i=0;i<data.rating.stars.length;i++)
        $(".percent").eq(i).text((5-i) + "星:  " + data.rating.stars[i] + "%");
}
function markStar(average,ratingPeople){
    var fullStar=Math.floor(Math.round(average)/2);
    var halfStar=Math.round(average)%2;
    for(var i=0;i<fullStar;i++){
        $("span")[i].className="star full";
    }
    for(var i=0;i<halfStar;i++){
        $("span")[fullStar+i].className="star half";
    }
    for(var i=0;i<5-halfStar-fullStar;i++){
        $("span")[fullStar+halfStar+i].className="star empty";
    }
    $("span")[5].innerText=ratingPeople+"人评价";
}

function resolveData(data){
    return JSON.parse(data[0].filmjson);
}
