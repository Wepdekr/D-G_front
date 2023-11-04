(function () {
    //定义客户端
    var Client = {
        isFirstConnect: true,
        // 服务器地址
        host: "http://localhost:8000",
        //当前用户
        user: { uname: null },
        //游戏信息
        gameInfo: {
            users: null,
            room_id: null,
            round: null,
            word: null,
        },
    };
    // 1 Post 提交画作图片
    Client.submitDraw = function (imageData) {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log("提交画作成功");
                console.log(xhr.responseText);
            }
        };
        console.log(imageData);
        xhr.open("POST", this.host + "/submit_draw", true);
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        var sendData =
            "is_word=0" +
            "&img=" +
            imageData +
            "&room_id=" +
            this.gameInfo.room_id +
            "&round=" +
            this.gameInfo.round;
        xhr.send(sendData);
    };
    // 2 Post 提交文字 Guess
    Client.submitDraw = function (wordData) {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log("提交Guess成功");
                console.log(xhr.responseText);
            }
        };
        console.log(wordData);
        xhr.open("POST", this.host + "/submit_guess", true);
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        var sendData =
            "is_word=1" +
            "&word=" +
            wordData +
            "&room_id=" +
            this.gameInfo.room_id +
            "&round=" +
            this.gameInfo.round;
        xhr.send(sendData);
    };
    // 3 Get  获得画作图片
    Client.getDraw = function () {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log("获得画作成功");
                console.log(xhr.responseText);
                //TODO 获得化作进行猜测
            }
        };
        var sendData =
            "room_id=" +
            this.gameInfo.room_id +
            "&round=" +
            this.gameInfo.round +
            "&username=" +
            this.user.uname;
        xhr.open("GET", this.host + "/get_draw" + "?" + sendData, true);
        xhr.send();
    };
    // 4 Get  获得文字进行绘画
    Client.getWord = function () {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log("获得文字成功");
                console.log(xhr.responseText);
                //TODO: 获得文字后，开始绘画
            }
        };
        var sendData =
            "room_id=" +
            this.gameInfo.room_id +
            "&round=" +
            this.gameInfo.round +
            "&username=" +
            this.user.uname;
        xhr.open("GET", this.host + "/get_word" + "?" + sendData, true);
        xhr.send();
    };
    // 5 Get  获得当前轮数
    Client.getRound = function () {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log("获得当前轮数成功");
                console.log(xhr.responseText);
                // TODO 展示当前轮数
            }
        };
        var sendData = "room_id=" + this.gameInfo.room_id;
        xhr.open("GET", this.host + "/get_word" + "?" + sendData, true);
        xhr.send();
    };
    // 6 Post 提交投票
    Client.submitVote = function (voteData) {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log("提交投票成功");
                console.log(xhr.responseText);
            }
        };
        console.log(voteData);
        xhr.open("POST", this.host + "/submit_vote", true);
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        var sendData = "room_id=" + this.gameInfo.room_id +
            "&username=" + this.user.uname +
            "&result=" + voteData;
        xhr.send(sendData);
    };
    // 7 Get  获得投票结果
    Client.getVote = function () {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log("获得投票结果成功");
                console.log(xhr.responseText);
                // TODO 展示投票结果
            }
        };
        var sendData = "room_id=" + this.gameInfo.room_id;
        xhr.open("GET", this.host + "/get_vote" + "?" + sendData, true);
        xhr.send();
    };
    window.Client = Client;
})();
