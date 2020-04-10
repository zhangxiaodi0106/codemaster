
$.ajax({
    url: 'https://cnodejs.org/api/v1/topics',
    type: 'get',
    dataType: 'json',
    success: function(datas){
        console.log(datas);
        //alert(datas.data[2].title);
        var text='';
        for(var i=0;i<datas.data.length;i++)
        {
            var author_name=datas.data[i].author.loginname;
            var title=datas.data[i].title;
            var id=datas.data[i].id;
            var reply_count=datas.data[i].reply_count;
            var visit_count=datas.data[i].visit_count;
            var tab=datas.data[i].tab;
            var top=datas.data[i].top;
            var sort;
            var color="#e5e5e5";
            var post_modified=datas.data[i].last_reply_at;
            if(tab=="share")
            {
                if(top==false)
                {
                    sort="分享";
                }
                else
                {
                    sort="置顶";
                    color="#80bd01";
                    
                }
            }
            else sort="问答";
            function handlePublishTimeDesc(post_modified){
                // 拿到当前时间戳和发布时的时间戳，然后得出时间戳差
                var curTime = new Date();
                var postTime = new Date(post_modified);
                var timeDiff = curTime.getTime() - postTime.getTime();
            
                // 单位换算
                var min = 60 * 1000;
                var hour = min * 60;
                var day = hour * 24;
                var week = day * 7;
 
                // 计算发布时间距离当前时间的周、天、时、分
                var exceedWeek = Math.floor(timeDiff/week);
                var exceedDay = Math.floor(timeDiff/day);
                var exceedHour = Math.floor(timeDiff/hour);
                var exceedMin = Math.floor(timeDiff/min);
 
                // 最后判断时间差到底是属于哪个区间，然后return
                if(exceedWeek > 0){
                    return post_modified;                    
                }else{
                    if(exceedDay < 7 && exceedDay > 0){
                        return exceedDay + '天前';
                    }else{
                        if(exceedHour < 24 && exceedHour > 0){
                            return exceedHour + '小時前';
                        }else{
                            return exceedMin + '分鐘前';
                        }
                    }
                }
            };
            //alert(handlePublishTimeDesc(post_modified));
            text+='<div class="article"><a href="https://cnodejs.org/user/'+author_name+'" class="author_name" title="'+author_name+'">'+author_name+'</a>\
            <p title="回复数">'+reply_count+'/</p><p title="点击数">'+visit_count+'</p><p style="color: white;background-color:'+color+';">'+sort+'</p>\
            <a class="title" title='+title+' href="https://cnodejs.org/topic/'+id+'">'+title+'</a><p class="last_active_time">'+handlePublishTimeDesc(post_modified)+'<p></div>';
            
        }
        var article_box=document.getElementById("article_box")
        article_box.innerHTML=text;
        },
    error:function(){
        alert("失败了");
    }    
    });


