function MainLoop(){
    roundStateQuery();
    if(gameRoom.round_state == -1){
        roundInit();
    }
    if(gameRoom.round_state == 0 && gameRoom.is_ready == false){
        if(!readyCurrentRound()){
            console.log("准备失败，重试中……");
        }
    }
    if(gameRoom.round_state == 1){
        if(gameRoom.ques_type == null){
            if(!getCurrentQues()){
                console.log("获取题目失败，重试中");
            }
        }
        // 获取本轮ques
        gameRoom.end_time = gameRoom.start_time + STATE2_TIMEOUT;
        var curTime = new Date().getTime();
        var diffTime = gameRoom.end_time - curTime;
        var diffDate = new Date(diffTime);
        gameRoom.remain_minute = diffDate.getMinutes();
        gameRoom.remain_second = diffDate.getSeconds();
    }
    if(gameRoom.round_state == 2 && gameRoom.is_submit == false){
        if(!submitCurrentWork()){
            console.log("自动提交失败，重试中……");
        }
    }
    if(gameRoom.round_state == 3){
        roundInit();
    }
    refreshDisplay();
}

function InitMainLoop(){
    mainLoopHandler = setInterval(MainLoop, 10);
}

addLoadEvent(InitMainLoop);