var token = window.sessionStorage.getItem('token');
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
            else{
                alert("未知错误，获取房间信息失败");
            }
        }
        else if(xhr.status == 403){
            alert("登录状态异常，请重新登录");
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
        if(this.self_ready){
            document.getElementsByTagName("title").innerText = "已准备 - ("+this.readyPlayer+"/"+this.totalPlayer+")";
        }
        else{
            document.getElementsByTagName("title").innerText = "游戏房间 - 未准备";
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
    refreshDisplay: function(){
        this.refreshTitle();
        this.refreshLexiconSelect();
        Room.refreshRoomID();
    },
    updateRoomState: function(){
        this.getRoomState();
        this.updateRoomMemberReadyStatus();
    }
};

function refreshState(){

}

window.onload = function(){
    Room.updateRoomState();
    // Room.getRoomState();
    // console.log(Room);
    // Room.updateRoomState();
    // console.log(Room);
    // Room.refreshCounterBox();
}