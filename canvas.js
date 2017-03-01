var rectangleDim = 5;
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
            addVertexBuffor(canvas, relX, relY);

            //add vertex to array
            vertexes.push({
                x: relX,
                y: relY
            });


        } else {
            //ends drawing when closing a polygon
            canvas.unbind("click");


        }
        //redraw polygon
        redrawCanvas(ctx, canvas);
    });
    $('#draw-panels-btn').on('click', function() {
        var arr = vertexes.map(function(element) {
            return element.x;
        });

        var index = arr.indexOf(Math.min.apply(null, arr));

        var ALength = $('#input' + index).val();
        var BLength = $('#input' + (index + 2) % 4).val();
        var panelsHorizontally = Math.floor(ALength / panelWidth);
        var panelsVertically = Math.floor(BLength / panelHeight);
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(vertexes[index].x, vertexes[index].y);
        ctx.lineTo(vertexes[index].x + panelWidth, vertexes[index].y + panelHeight);
        ctx.stroke();

    })
    $('#clear-canvas-btn').on('click', function () {
        vertexes = [];
        ctx.clearRect(0, 0, 700, 700);
        $('.buffor').remove();
        $('.length-input').remove();
        ctx.drawImage(backgroundImg, 0, 0);
    })


});
