function addPlayer(add_playername) {
    const playerName = add_playername;
    //alert("a:"+playerName);
    //const playerName = document.getElementById('add-player-name').value;
    if (playerName) {
        const playerList = document.getElementById('player-ul');
        const li = document.createElement('li');
        li.textContent = playerName;
        const statusSpan = document.createElement('span');
        statusSpan.textContent = "未准备";
        li.appendChild(statusSpan);
        playerList.appendChild(li);
        document.getElementById('player-name').value = '';
    }
}

function deletePlayer(del_playerName) {
    //const playerName = del_playerName;
    const playerName = document.getElementById('del-player-name').value;

    const playerList = document.getElementById('player-ul');
    const listItems = playerList.getElementsByTagName('li');
    
    for (let i = 0; i < listItems.length; i++) {

        var listname = listItems[i].textContent.replace("已准备", "").trim(); 
        listname = listname.replace("未准备", "").trim(); 

        if (listname === playerName) {
            playerList.removeChild(listItems[i]);
            break; 
        }
    }
}

function revPlayer(playerName) {
    const playerList = document.getElementById('player-ul');
    const listItems = playerList.getElementsByTagName('li');
    
    for (let i = 0; i < listItems.length; i++) {

        var listname = listItems[i].textContent.replace("已准备", "").trim(); 
        listname = listname.replace("未准备", "").trim(); 

        if (listname === playerName) {
            const statusSpan = listItems[i].getElementsByTagName('span')[0];
            if (statusSpan.textContent === "未准备")
                statusSpan.textContent = "已准备";
            else
            statusSpan.textContent = "未准备";
            break; 
        }
    }
}

prepareButton.addEventListener('click', () => {
    const now_username = localStorage.getItem('now_username');
    revPlayer(now_username);
});

startButton.addEventListener('click', () => {
    const roomcontainer = document.querySelector('.room-container');
    const gamecontainer = document.querySelector('.game-container');
    roomcontainer.classList.remove('active');
    gamecontainer.classList.add('active');
});

function modiselet(theme) {
    const roomchooseSelect = document.getElementById('roomchooseSelect');
    roomchooseSelect.value = theme;
}

