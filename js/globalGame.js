var gameRoom = {
    room_id : window.sessionStorage.getItem("room_id"), 
    token : window.sessionStorage.getItem("token"),
    username : window.sessionStorage.getItem("username"),
    round : 0,
    round_state : -1,
    submit_num: 0,
    start_time: 0,
    ready_num: 0,
    is_ready: false,
    is_submit: false,
    is_finished : false,
    end_time: 0,
    remain_minute : 0,
    remain_second : 0,
    ques_type: null,
    ques: null,
    work: null,
};

var mainLoopHandler = null;

const STATE2_TIMEOUT = 60000;