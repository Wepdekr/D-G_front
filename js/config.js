const SERVER_ADDR = "http://192.168.163.190:8000";

// sessionStorage 记录
// token 全局的登录token
// room_id 加入成功后的房间号
// username 登录成功的用户名

function addLoadEvent(func){
    var oldOnload = window.onload;
    if(typeof oldOnload == "function"){
        window.onload = function(){
            oldOnload();
            func();
        };
    }
    else{
        window.onload = func;
    }
}