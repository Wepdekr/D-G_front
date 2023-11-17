var token = window.sessionStorage.getItem('token');

var intervalID = null;

var Room = {
    state : null, // 初始态房间
    lexicon_id : 0, // 初始词库
    member: null,
    ready: null,
    owner: null,
    room_id : window.sessionStorage.getItem("room_id"),
    isOwner: false,
    totalPlayer: 0,
    readyPlayer: 0,
    unreadyPlayer: 0,
    self_ready: false, // 自己是否准备好了
    startFlag: false, // 房间是否开始
    getRoomState: function(){
        var formData = new FormData;
        var xhr = new XMLHttpRequest();
        xhr.open("GET",SERVER_ADDR+'/room'+'?'+'token='+token+'&'+'room_id='+window.sessionStorage.getItem("room_id"),false);
        xhr.send();
        if(xhr.readyState == 4 && xhr.status == 200){
            var data = JSON.parse(xhr.responseText);
            if(data.status_code == 200){
                // 获取成功
                this.state = data.state;
                if(this.state)
                    this.startFlag = true; // 房间已开始
                this.lexicon_id = data.lexicon_id;
                this.member = data.member.split(',');
                this.ready = data.ready.split(',');
                this.owner = data.owner;
                if(this.owner == window.sessionStorage.getItem("username")){
                    this.isOwner = true;
                }
                else{
                    this.isOwner = false;
                }
                this.self_ready = data.self_ready;
            }
            else if(data.status_code == 404 && this.state != null){ // 房间解散
                clearInterval(intervalID);
                alert("房间已被解散，退出中");
                window.location.replace("join.html");
            }
            else if(data.status_code == 404){
                clearInterval(intervalID);
                alert("房间不存在，返回中……");
                window.location.replace("join.html");
            }
            else{
                clearInterval(intervalID);
                alert(data.msg);
            }
        }
        else if(xhr.status == 403){
            clearInterval(intervalID);
            alert("登录状态异常，请重新登录");
            window.location.replace("login.html");
        }
    },
    updateRoomMemberReadyStatus: function(){
        console.log("!",this);
        console.log(this.member);
        this.totalPlayer = this.member.length;
        this.readyPlayer = 0;
        this.unreadyPlayer = 0;
        for(let i=0; i<this.totalPlayer;i++){
            if(this.ready[i] == '1'){
                this.readyPlayer++;
            }
            else{
                this.unreadyPlayer++;
            }
        }
    },
    refreshTitle: function(){
        console.log(this.self_ready);
        if(this.self_ready){
            document.title = "已准备 - ("+this.readyPlayer+"/"+this.totalPlayer+")";
        }
        else{
            document.title.innerText = "游戏房间 - 未准备";
        }
    },
    refreshLexiconSelect: function(){
        var selectedLexiconOption = document.querySelector("option:checked");
        selectedLexiconOption.setAttribute("selected", false);
        var needSelectLexicon = document.getElementById("lexiconSelect").querySelectorAll("option")[Number(this.lexicon_id)];
        needSelectLexicon.setAttribute("selected", true);
    },
    refreshRoomID: function(){
        var idArea = document.getElementById("room_id-display");
        idArea.innerText = this.room_id;
    },
    refreshCounterBox: function(){
        var counterBox = document.querySelector(".counter-box>p");
        counterBox.innerText = this.readyPlayer+"/"+this.totalPlayer+"已准备";
        if(this.readyPlayer == this.totalPlayer)
            counterBox.innerText += "\n等待房主开始游戏……";
    },
    refreshClickable: function(){
        if(this.isOwner){
            document.getElementById("lexiconSelect").removeAttribute("disabled");
            document.getElementById("startButton").removeAttribute("disabled");
            document.getElementById("disbandButton").removeAttribute("disabled");
            document.getElementById("prepareButton").setAttribute("disabled", true);
            document.getElementById("exitButton").setAttribute("disabled", true);
        }
        else{
            document.getElementById("lexiconSelect").setAttribute("disabled", true);
            document.getElementById("startButton").setAttribute("disabled", true);
            document.getElementById("disbandButton").setAttribute("disabled", true);
            document.getElementById("prepareButton").removeAttribute("disabled");
            document.getElementById("exitButton").removeAttribute("disabled");
        }
    },
    refreshReadyButton: function(){
        if(this.self_ready){
            document.getElementById("prepareButton").innerText = "取消准备";
        }  
        else{
            document.getElementById("prepareButton").innerText = "准备";
        }
    },
    createMemberLi: function(member_name, ready_state){
        var li = document.createElement("li");
        var name = document.createElement("p");
        name.innerText = member_name;
        var ready = document.createElement("p");
        ready.innerText = ready_state;
        li.appendChild(name);
        li.appendChild(ready);
        return li;
    },
    refreshPlayerList: function(){
        var playerUl = document.getElementById("player-ul");
        playerUl.innerHTML = "";
        for(let i=0;i<this.member.length;i++){
            playerUl.appendChild(this.createMemberLi(this.member[i],this.ready[i]));
        }
    },
    refreshDisplay: function(){
        this.refreshTitle();
        this.refreshLexiconSelect();
        this.refreshRoomID();
        this.refreshCounterBox();
        this.refreshClickable();
        this.refreshReadyButton();
        this.refreshPlayerList();
    },
    checkStartStatus: function(){
        if(this.startFlag){
            clearInterval(intervalID);
            alert("游戏开始！正在启动游戏……");
            window.location.replace("game.html");
        }
    },
    updateRoomState: function(){
        this.getRoomState();
        this.updateRoomMemberReadyStatus();
        this.checkStartStatus();
    }
};

function refreshState(){
    Room.updateRoomState();
    Room.refreshDisplay();
}

window.onload = function(){
    intervalID = setInterval(refreshState, 100);
    
    document.getElementById("lexiconSelect").addEventListener("change", function(){
        var selected_option = document.getElementById("lexiconSelect").value;
        var formData = new FormData();
        formData.append("token", token);
        formData.append("lexicon_id",selected_option);
        formData.append("room_id",Room.room_id);
        var xhr = new XMLHttpRequest();
        xhr.open("POST",SERVER_ADDR+ '/lexicon');
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.status_code == 200){
                    // 修改成功
                }
                else{
                    alert(data.msg);
                }
            }
            else if(xhr.status == 403){
                alert("登录状态异常，请重新登录");
            }
        }
    });
    
    document.getElementById("prepareButton").addEventListener("click", function(){
        var formData = new FormData();
        formData.append("token", token);
        formData.append("room_id",Room.room_id);
        var xhr = new XMLHttpRequest();
        xhr.open("POST",SERVER_ADDR+ '/start');
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.status_code == 200){
                    // 准备成功
                }
                else{
                    alert(data.msg);
                }
            }
            else if(xhr.status == 403){
                alert("登录状态异常，请重新登录");
            }
        }
    });

    document.getElementById("startButton").addEventListener("click", function(){
        var formData = new FormData();
        formData.append("token", token);
        formData.append("room_id",Room.room_id);
        var xhr = new XMLHttpRequest();
        xhr.open("POST",SERVER_ADDR+ '/start');
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.status_code == 200){
                    // 开始成功
                }
                else{
                    alert(data.msg);
                }
            }
            else if(xhr.status == 403){
                alert("登录状态异常，请重新登录");
            }
        }
    });

    document.getElementById("exitButton").addEventListener("click", function(){
        var formData = new FormData();
        formData.append("token", token);
        formData.append("room_id",Room.room_id);
        var xhr = new XMLHttpRequest();
        xhr.open("POST",SERVER_ADDR+ '/exit');
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.status_code == 200){
                    clearInterval(intervalID);
                    alert(data.msg);// 成功退出
                    window.location.replace("join.html");
                }
                else{
                    alert(data.msg);
                }
            }
            else if(xhr.status == 403){
                alert("登录状态异常，请重新登录");
            }
        }
    });

    document.getElementById("disbandButton").addEventListener("click", function(){
        var formData = new FormData();
        formData.append("token", token);
        formData.append("room_id",Room.room_id);
        var xhr = new XMLHttpRequest();
        xhr.open("POST",SERVER_ADDR+ '/exit');
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.status_code == 200){
                    clearInterval(intervalID);
                    alert(data.msg);// 成功解散
                    window.location.replace("join.html");
                }
                else{
                    alert(data.msg);
                }
            }
            else if(xhr.status == 403){
                alert("登录状态异常，请重新登录");
            }
        }
    });    
}