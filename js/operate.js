function initBoldSelectDisplay(){
    // var boldSelectArea = document.getElementById("bold-select-container");
    var brushWidth = [4, 8, 16, 32];
    for(let i=0;i<brushWidth.length;i++){
        // var width_button = document.createElement("div");
        // width_button.style.backgroundColor = "black";
        // width_button.style.width = brushWidth[i]+"px";
        // width_button.style.height = brushWidth[i]+"px";
        // width_button.setAttribute("id",brushWidth[i]+"-"+"widthButton");
        // boldSelectArea.appendChild(width_button);
        var width_button = document.getElementById(brushWidth[i]+"-"+"widthButton");
        width_button.addEventListener("click", function(){
            window.Painter.setBrushWidth(brushWidth[i]);
        })
    }
}

function initColorSelectDisplay(){
    var colorSelectArea = document.getElementById("palette-container");
    var bColor = [
        "#000000",
        "#999999",
        "#FFFFFF",
        "#FF0000",
        "#FF9900",
        "#FFFF00",
        "#008000",
        "#00CCFF",
        "#0099FF",
        "#FF33CC",
        "#CC66FF",
        "#FFCCCC",
        "#6633FF",
        "#CCFFCC",
    ];
    for(let i=0;i<bColor.length;i++){
        // var color = document.createElement("div");
        // color.style.backgroundColor = bColor[i];
        // color.style.width = "10px";
        // color.style.height = "10px";
        // color.setAttribute("id",bColor[i]+"-"+"colorButton");
        // colorSelectArea.appendChild(color);
        var color = document.getElementById(bColor[i]+"-"+"colorButton");
        color.addEventListener("click", function(){
            window.Painter.setBrushColor(bColor[i]);
        })
    }
}

function initButtonAction(){
    var clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click",function(){
        window.Painter.clear();
    });
    
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function(){
        var ans = document.getElementById("answerInput").value;
        // 提交给后端
        submitCurrentWork();
        console.log(ans);
    })

    var imgButton = document.getElementById("uploadImgButton");
    imgButton.addEventListener("click",function(){
        var img = document.getElementById("paintArea").toDataURL();
        // 提交给后端
        submitCurrentWork();
        console.log(img);
    });
}

addLoadEvent(initBoldSelectDisplay);
addLoadEvent(initColorSelectDisplay);
addLoadEvent(initButtonAction);