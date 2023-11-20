const SERVER_ADDR = "http://10.255.31.177:8000";

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