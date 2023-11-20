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
        var curTime = new Date().getTime() / 1000;
        var diffTime = gameRoom.end_time - curTime;
        var diffDate = new Date(diffTime*1000);
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
        if(gameRoom.is_finished){
            clearInterval(mainLoopHandler);
            alert('本局答题完成，将开始投票……');
            window.location.replace("vote.html");
        }
    }
    refreshDisplay();
}

function InitMainLoop(){
    mainLoopHandler = setInterval(MainLoop, 10);
}

addLoadEvent(InitMainLoop);