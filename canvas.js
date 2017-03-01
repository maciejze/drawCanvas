var rectangleDim = 10;
var vertexes = [];
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

        if (!isInRectangle(relX, relY, vertexes).inside) {
            //draw rectangle
            addVertexBuffor(canvas, relX, relY);
            //add vertex to array
            vertexes.push({
                x: relX,
                y: relY
            });
            //adds input to middle of line
            addInput(getHalfLinePoint(vertexes[vertexes.length - 1], vertexes[vertexes.length - 2]), canvas);

        } else {
            //ends drawing when closing a polygon
            canvas.unbind("click");

            //adds input to middle of line
            addInput(getHalfLinePoint(vertexes[vertexes.length - 1], vertexes[0]), canvas);
        }
        //redraw polygon
        redrawCanvas(ctx);
    });

    $('#perspective-btn').on('click', function() {
        canvas.on('click', function(e) {
            // 
            // var relX = e.pageX - offset.left;
            // var relY = e.pageY - offset.top;
            // ctx.moveTo(relX, relY);
            // ctx.strokeStyle = "black";
            // ctx.lineTo(relX, relY);
            // ctx.stroke();

        });
    });

});
