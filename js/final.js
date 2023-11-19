var token = window.sessionStorage.getItem("token");
var room_id = window.sessionStorage.getItem("room_id");

function addAction(){
    var button = document.getElementById("leave-button");
    button.addEventListener('click', function(){
        var formData = new FormData();
        formData.append('token',token);
        formData.append('room_id',room_id);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", SERVER_ADDR + "/leave");
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.status_code == 200){
                    alert("成功退出房间");
                    window.location.replace("join.html");
                }
                else{
                    console.log(data.msg);
                }
            }
            else if(xhr.status == 403){
                alert("登录状态异常，请重新登录");
                window.location.replace("login.html");
            }
        }
    });
}

addLoadEvent(addAction);