window.onload = function() {
    document.getElementById("loginButton").addEventListener("click", function(){
        var username = document.getElementById("loginUsername").value;
        var password = document.getElementById("loginPassword").value;
        var formData = new FormData();
        formData.append('username',username);
        formData.append('password',password);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", SERVER_ADDR+"/login");
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText);
                if(data.status_code == 200){
                    alert(data.msg);
                    window.sessionStorage.setItem("token",data.token);
                    window.location.replace("join.html");
                }
                else{
                    alert(data.msg);
                }
            }
        }
    });

    document.getElementById("returnButton").addEventListener("click", function(){
        window.location.replace("index.html");
    });
}

