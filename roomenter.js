document.addEventListener('DOMContentLoaded', () => {
    // 检查房号是否存在
    function check_room_number(value) {
        return 1;
    }
    
    
    const enterroomcontainer = document.querySelector('.enterroom-container');
    const roomcontainer = document.querySelector('.room-container');
    const enterroomButton = document.getElementById('enterroomButton');
    const roomNumberInput = document.getElementById('roomNumber');
    const creatroomButton = document.getElementById('creatroomButton');

    enterroomButton.addEventListener('click', () =>{
        const number = roomNumberInput.value;
        const regex = /^\d{6}$/; // 使用正则表达式匹配6位数字
        if(regex.test(number) == 0)
        {
            alert('房间号不合法！');
        }
        else if(check_room_number(number)==0)
        {
            alert('房间号不存在！');
        }
        else
        {
            const now_username = localStorage.getItem('now_username');
            addPlayer(now_username);

            enterroomcontainer.classList.remove('active');
            roomcontainer.classList.add('active');
            //换页
        }
    });

    const enterchooseSelect = document.getElementById('enterchooseSelect');
    creatroomButton.addEventListener('click', () =>{
        const theme = enterchooseSelect.value;
        if(theme == "请选择词库")
        {
            alert('请选择词库');
        }
        else
        {
            //alert(theme);
            enterroomcontainer.classList.remove('active');
            roomcontainer.classList.add('active');
            //alert('2'+theme);
            modiselet(theme);

            const now_username = localStorage.getItem('now_username');

            addPlayer(now_username);

            
        }
    });


});