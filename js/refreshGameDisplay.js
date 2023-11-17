function refreshTitle(){
    document.title = '游戏进行中 - 第'+gameRoom.round+'轮';
}

function refreshOperateArea(){
    if(gameRoom.ques_type == null)
        return;
    if(gameRoom.ques_type == 1){ // 题目是词语
        document.getElementById("area-for-txt").style.display = "none";
    }
    else{ // 题目是图片
        document.getElementById("area-for-img").style.display = "none";
    }
}

function refreshPaintArea(){
    if(gameRoom.ques_type == null)
        return;
    if(gameRoom.ques_type == 0){
        var Img = new Image();
        Img.src = gameRoom.ques;
        Img.onload = function(){
            window.Painter.ctx.drawImage(Img, 0, 0, window.Painter.w, window.Painter.h);
        };
        Object.freeze(document.getElementById("paintArea"));
    }
}

function refreshHintArea(){
    var remain = document.getElementById("remain-time");
    remain.innerText = gameRoom.remain_minute + ':' + gameRoom.remain_second;
    if(gameRoom.ques_type == null)
        return;
    if(gameRoom.ques_type == 1){
        var word = document.getElementById("text-hint");
        word.innerText = gameRoom.ques;
    }
}

function refreshDisplay(){
    refreshTitle();
    refreshOperateArea();
    refreshPaintArea();
    refreshHintArea();
}