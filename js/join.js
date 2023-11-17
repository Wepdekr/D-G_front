window.onload = function(){
    var token = window.sessionStorage.getItem('token');
    var roomNumberInput = document.getElementById("roomNumber");

    document.getElementById("enterRoomButton").addEventListener("click",function(){
        if(!roomNumberInput.checkValidity()){
            alert("请输入合法的八位小写字母房间号");
            return;
        }
        var roomNumber = roomNumberInput.value;
        var formData = new FormData();
        formData.append('room_id',roomNumber);
        formData.append('token',token);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", SERVER_ADDR + '/join');
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.status_code == 200){ // 加入成功
                    alert(data.msg);
                    window.sessionStorage.setItem('room_id', roomNumber);
                    window.location.replace('room.html');
                }
                else{
                    alert(data.msg);
                }
            }
        }
    });

    document.getElementById("createRoomButton").addEventListener("click", function(){
        var selected_option = document.getElementById("lexiconSelect").value;
        if(selected_option == "0"){
            alert("创建房间前请选择词库"); // TODO 在线获取词库列表和自定义词库
            return;
        }
        var formData = new FormData();
        formData.append("token", token);
        formData.append("lexicon_id",selected_option);
        var xhr = new XMLHttpRequest();
        xhr.open("POST",SERVER_ADDR+ '/room');
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.status_code == 200){
                    alert(data.msg); // 创建成功
                    var room_id = data.room_id;
                    window.sessionStorage.setItem("room_id", room_id);
                    window.location.replace("room.html");
                }
                else{
                    alert(data.msg);
                }
            }
        }
    });
}