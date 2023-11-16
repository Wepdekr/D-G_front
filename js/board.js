function board_init(){
    var Painter = {
        ctx: null,
        w: 0,
        h: 0,
        x: 0,
        y: 0,
        status: -1, //状态-1:初始或结束状态，0:开始画,1:画画中
        setBGColor: function (color) {
            this.ctx.fillStyle = color || "white";
            this.ctx.fillRect(0, 0, this.w, this.h);
        },
        setBrushColor: function (color) {
            this.bColor = color || "black";
            this.ctx.strokeStyle = this.bColor;
        },
        setBrushWidth: function (width) {
            this.bWidth = width || 1;
            this.ctx.lineWidth = this.bWidth;
        },
        fire: function (eventName, param) {
            if (this[eventName]) {
                this[eventName](param);
            }
        },
        onStartDraw: function (data) {
            this.status = 0;
            this.ctx.beginPath();
            this.ctx.moveTo(data.x, data.y);
        },
        onDrawing: function (data) {
            this.status = 1;
            this.ctx.lineTo(data.x, data.y);
            this.ctx.stroke();   
        },
        onDrawEnd: function () {
            this.status = -1;
        },
        mouseMovehandler: function(e){
            var xx = e.offsetX, yy = e.offsetY;
            this.fire("onDrawing", {x: xx, y: yy});
            this.x = xx;
            this.y = yy;
        },
        initCanvas: function(){
            var canvas = document.getElementById("paintArea");
            canvas.addEventListener("mousedown", function(e){
                console.log('!', this);
                e.preventDefault();
                this.x = e.offsetX;
                this.y = e.offsetY;
                this.fire("onStartDraw",{x: this.x, y: this.y});
                let handler = this.mouseMovehandler.bind(this);
                canvas.addEventListener("mousemove", handler);
                canvas.addEventListener("mouseup", function(){
                    canvas.removeEventListener("mousemove", handler);
                    this.fire("onDrawEnd");
                }.bind(this));
            }.bind(this))
        },
        init: function() {
            var canvas = document.getElementById("paintArea");
            this.ctx = canvas.getContext("2d");
            this.w = canvas.width;
            this.h = canvas.height;
            this.setBGColor();
            this.setBrushColor();
            this.setBrushWidth();
            this.ctx.lineCap = "round";
            this.ctx.lineJoin = "round";
            this.initCanvas();
        }
    }
    Painter.init();
}

addLoadEvent(board_init);