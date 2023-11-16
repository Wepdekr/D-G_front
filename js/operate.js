function initBoldSelectDisplay(){
    var boldSelectArea = document.getElementById("bold-select-container");
    var brushWidth = [4, 8, 16, 32];
    for(let i=0;i<brushWidth.length;i++){
        var width_button = document.createElement("div");
        width_button.style.backgroundColor = "black";
        width_button.style.width = brushWidth[i]+"px";
        width_button.style.height = brushWidth[i]+"px";
        width_button.setAttribute("id",brushWidth[i]+"-"+"widthButton");
        boldSelectArea.appendChild(width_button);
        width_button.addEventListener("click", function(){
            window.Painter.setBrushWidth(brushWidth[i]);
        })
    }
}

function initButtonAction(){
    var clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click",function(){
        window.Painter.clear();
    });
}

addLoadEvent(initBoldSelectDisplay);
addLoadEvent(initButtonAction);