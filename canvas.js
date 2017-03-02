var rectangleDim = 10;
var vertexes = [];
var panelWidth = 10;
var panelHeight = 30;
var backgroundImg = new Image();
backgroundImg.src = "house.jpg";
$(document).ready(function() {
    //canvas initialization
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var strokeColor = '#FFDC00';
    ctx.strokeStyle = strokeColor;

    var img = new Image();
    backgroundImg.src = "house.jpg";
    backgroundImg.onload = function() {
        ctx.drawImage(backgroundImg, 0, 0);
    };

    var canvas = $('#myCanvas');
    var offset = canvas.offset();

    //click to draw event
    canvas.on('click', function(e) {

        var relX = e.pageX - offset.left;
        var relY = e.pageY - offset.top;
        if (vertexes.length < 4) {

            //draw rectangle
            addVertexHandler(canvas, relX, relY, ctx);

            //add vertex to array
            vertexes.push({
                x: relX,
                y: relY
            });


        } else {
            //ends drawing when last vertex is placed
            canvas.unbind("click");


        }
        //redraw polygon
        redrawCanvas(ctx, canvas);
    });
    $('#draw-panels-btn').on('click', function() {
        var arr = vertexes.map(function(element) {
            return element.x;
        });

        //var index = arr.indexOf(Math.min.apply(null, arr));
        var aLength = 33;
        var bLength = 'ss';
        var trueALength = $('#input0').val();
        var trueBLength =  $('#input1').val();

        //console.log(trueALength, trueBLength);
        scaleA = trueALength / getLineLength(vertexes[0], vertexes[1]);
        scaleB =  trueBLength / getLineLength(vertexes[1], vertexes[2]);

        var scaledPanelWidth = panelWidth / scaleA;
        console.log(scaledPanelWidth, getLineLength(vertexes[0], vertexes[1]) / scaledPanelWidth);


    })
    $('#clear-canvas-btn').on('click', function () {
        vertexes = [];
        ctx.clearRect(0, 0, 700, 700);
        $('.handler').remove();
        $('.length-input').remove();
        ctx.drawImage(backgroundImg, 0, 0);
    })


});
