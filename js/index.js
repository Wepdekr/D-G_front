window.onload = function(){
    document.getElementById("startButton").addEventListener("click",function(){
        initCookie();
        window.location.replace("login.html");
    })

    document.getElementById("registButton").addEventListener("click",function(){
        window.location.replace("regist.html");
    })
}