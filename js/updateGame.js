function freshRound(){
    window.location.reload();
}

function readyCurrentRound(){
    console.log('enter ready state');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 
        SEVER_ADDR + '/ready'+'?'+'token='+gameRoom.token+'&'+'room_id='+gameRoom.room_id+'&'+'round='+gameRoom.round, false);
    xhr.send();
    if(xhr.readyState == 4 && xhr.status == 200){
        var data = JSON.parse(xhr.responseText);
        if(data.status_code == 200){
            console.log(data.msg);
            return true;
        }
        else{
            console.log(data.msg);
            return false;
        }
    }
    else if(xhr.status == 403){
        clearInterval(mainLoopHandler);
        alert("登录状态异常，请重新登录");
        window.location.replace("login.html");
    }
    return false;
}

function roundStateQuery(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 
        SEVER_ADDR + '/ready'+'?'+'token='+gameRoom.token+'&'+'room_id='+gameRoom.room_id, false);
    xhr.send();
    if(xhr.readyState == 4 && xhr.status == 200){
        var data = JSON.parse(xhr.responseText);
        if(data.status_code == 200){
            console.log(data.msg);
            if(gameRoom.round != 0 && gameRoom.round != data.round)
                freshRound();
            gameRoom.round = data.round;
            gameRoom.round_state = data.round_state;
            gameRoom.submit_num = data.submit_num;
            gameRoom.start_time = data.start_time;
            gameRoom.ready_num = data.ready_num;
            gameRoom.is_ready = data.is_ready;
            gameRoom.is_submit = data.is_submit;
        }
        else{
            console.log(data.msg);
        }
    }
    else if(xhr.status == 403){
        clearInterval(mainLoopHandler);
        alert("登录状态异常，请重新登录");
        window.location.replace("login.html");
    }
}

function getCurrentQues(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 
        SEVER_ADDR + '/work'+'?'+'token='+gameRoom.token+'&'+'room_id='+gameRoom.room_id+'&'+'round='+gameRoom.round, false);
    xhr.send();
    if(xhr.readyState == 4 && xhr.status == 200){
        var data = JSON.parse(xhr.responseText);
        if(data.status_code == 200){
            if(data.type == 1){
                gameRoom.ques_type = data.type;
                gameRoom.ques = data.word;
            }
            else{
                gameRoom.ques_type = data.type;
                gameRoom.ques = data.img;
            }
            return true;
        }
        else{
            console.log(data.msg);
            return false;
        }
    }
    else if(xhr.status == 403){
        clearInterval(mainLoopHandler);
        alert("登录状态异常，请重新登录");
        window.location.replace("login.html");
    }
    return false;
}

function submitCurrentWork(){
    if(gameRoom.ques_type == null){
        console.log('未获取问题');
        return false;
    }
    var formData = new FormData();
    formData.append('token',gameRoom.token);
    formData.append('room_id',gameRoom.room_id);
    formData.append('round',gameRoom.round);
    if(gameRoom.ques_type == 1){ // 问题是文字
        var img = document.getElementById("paintArea").toDataURL();
        formData.append('img',img);
        formData.append('is_word',0);
    }
    else{
        var ans = document.getElementById("answerInput").value;
        formData.append('word',ans);
        formData.append('is_word',1);
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST",SERVER_ADDR + '/submit',false);
    xhr.send(formData);
    if(xhr.readyState == 4 && xhr.status == 200){
        var data = JSON.parse(xhr.responseText);
        if(data.status == 200){
            // 提交成功
            console.log(data.msg);
            return true;
        }
        else{
            console.log(data.msg);
            return false;
        }
    }
    else if(xhr.status == 403){
        clearInterval(mainLoopHandler);
        alert("登录状态异常，请重新登录");
        window.location.replace("login.html");
    }
    return false;
}


function roundInit(){
    gameRoom.ques_type = null;
    gameRoom.ques = null;
    gameRoom.work = null;
}