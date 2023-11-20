var voteState = {
    room_id : window.sessionStorage.getItem('room_id'),
    token: window.sessionStorage.getItem('token'),
    username: window.sessionStorage.getItem('username'),
    show_type: null,
    show_text: null,
    show_img: null,
    approval: null,
    disapproval: null,
    vote_num: null,
    is_vote: null,
    ques_id: null,
    is_finish: null,
    ques_count: 0,
    current_type: null
}

var voteLoopHandler = null;

function jumpToFinal(){
    window.location.replace("final.html");
}

function updateVoteState(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 
        SERVER_ADDR + '/vote'+'?'+'token='+voteState.token+'&'+'room_id='+voteState.room_id, false);
    xhr.send();
    if(xhr.readyState == 4 && xhr.status == 200){
        var data = JSON.parse(xhr.responseText);
        if(data.status_code == 200){
            if(data.is_finish){
                clearInterval(voteLoopHandler);
                alert("投票全部完成");
                setTimeout(jumpToFinal, 25000);
            }
            else{
                voteState.show_type = data.show_type;
                if(voteState.show_type == 1){
                    voteState.show_text = data.show_text;
                    voteState.show_img = null;
                }
                else{
                    voteState.show_img = data.show_img;
                    voteState.show_text = null;
                }
                voteState.approval = data.approval;
                voteState.disapproval = data.disapproval;
                voteState.vote_num = data.vote_num;
                voteState.is_vote = data.is_vote;
                if(voteState.ques_id != null && voteState.ques_id != data.ques_id)
                    voteState.ques_count++;
                voteState.ques_id = data.ques_id;
                voteState.is_finish = data.is_finish;
            }
        }
        else{
            console.log(data.msg);
        }
    }
    else if(xhr.status == 403){
        clearInterval(voteLoopHandler);
        alert("登录状态异常，请重新登录");
        window.location.replace("login.html");
    }
}

function refreshVoteArea(){
    if(voteState.is_vote == null)
        return;
    if(voteState.is_vote){
        document.getElementById("approveButton").setAttribute("disabled", true);
        document.getElementById("disapproveButton").setAttribute("disabled", true);
    }
    else{
        document.getElementById("approveButton").removeAttribute("disabled");
        document.getElementById("disapproveButton").removeAttribute("disabled");
    }
}

function refreshTitle(){
    document.title = '投票进行中 - 第'+voteState.ques_count+'个问题';
}

function refreshStatusArea(){
    var status = document.getElementById("vote-status");
    status.innerText = '已投票人数：'+voteState.vote_num+'\n'+'同意人数：'+voteState.approval+'\n'+'反对人数：'+voteState.disapproval;

    var hint = document.getElementById('vote-hint');
    if(voteState.is_vote){
        hint.innerText = '已成功投票！投票结果为：';
    }
    else{
        hint.innerText = '点击按钮对该问题做出投票';
    }
}

function refreshShow(){
    if(voteState.show_type == null)
        return;
    var canvas = document.getElementById('show_board');
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    if(voteState.show_type == 1){ // 展示文字
        if(voteState.current_type == 0 || voteState.current_type == null){
            ctx.current_type = 1;
            console.log("draw!");
            ctx.clearRect(0, 0, width, height);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "40px Georgia";
            ctx.fillText(voteState.show_text, width/2, height/2);
        }
    }
    else{
        if(voteState.current_type == 1 || voteState.current_type == null){
            ctx.current_type = 0;
            console.log("draw?");
            ctx.clearRect(0, 0, width, height);
            var Img = new Image();
            Img.src = voteState.show_img;
            Img.onload = function(){
                ctx.drawImage(Img, 0, 0, width, height);
            };
        }
    }
}

function refreshDisplay(){
    refreshVoteArea();
    refreshTitle();
    refreshStatusArea();
    refreshShow();
}

function mainLoop(){
    updateVoteState();
    refreshDisplay();
}


function initMainLoop(){
    voteLoopHandler = setInterval(mainLoop, 10);
}

function submitVote(result){
    var formData = new FormData();
    formData.append("token",voteState.token);
    formData.append("room_id",voteState.room_id);
    formData.append("ques_id",voteState.ques_id);
    formData.append("result",result);
    var xhr = new XMLHttpRequest();
    xhr.open("POST",SERVER_ADDR + '/vote');
    xhr.send(formData);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var data = JSON.parse(xhr.responseText);
            if(data.status_code == 200){
                console.log(data.msg);
            }
            else{
                console.log(data.msg);
            }
        }
        else if(xhr.status == 403){
            clearInterval(voteLoopHandler);
            alert("登录状态异常，请重新登录");
            window.location.replace("login.html");
        }
    }
}

function addAction(){
    var approvalButton = document.getElementById("approveButton");
    approvalButton.addEventListener("click", function(){
        // 投赞成票
        submitVote(1);
        var result = document.getElementById("vote-result");
        result.innerText = '赞成！'
    });

    var disapprovalButton = document.getElementById("disapproveButton");
    disapprovalButton.addEventListener("click", function(){
        // 投反对票
        submitVote(0);
        var result = document.getElementById("vote-result");
        result.innerText = '反对！'
    });
}

addLoadEvent(addAction);
addLoadEvent(initMainLoop);