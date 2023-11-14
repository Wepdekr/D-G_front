window.onload = function(){
    document.getElementById("registerSubmitButton").addEventListener("click", function(){
        var username = document.getElementById('registerUsername').value;
        var password = document.getElementById('registerPassword').value;
        var comfirmpassword = document.getElementById('registerComfirmPassword').value;

        if (password == comfirmpassword) {

            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            xhr.open("POST",SERVER_ADDR+"/user");
            xhr.send(formData);
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    var data = JSON.parse(xhr.responseText);
                    console.log(data);
                    if(data.status_code == 200){
                        alert(data.msg);
                        window.location.replace("login.html");
                    }
                    else{
                        alert(data.msg);
                    }
                }
            }

            // 清空输入字段
            document.getElementById('registerUsername').value = '';
            document.getElementById('registerPassword').value = '';
            document.getElementById('registerComfirmPassword').value = '';
        } else {
            alert('注册失败，请检查两次密码是否输入相同！');
        }
    });

    document.getElementById("returnButton").addEventListener("click",function(){
        window.location.replace("index.html");
    });
}