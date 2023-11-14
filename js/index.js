window.onload = function(){
    window.sessionStorage.clear();

    document.getElementById("startButton").addEventListener("click",function(){
        window.location.replace("login.html");
    })

    document.getElementById("registButton").addEventListener("click",function(){
        window.location.replace("regist.html");
    })
}