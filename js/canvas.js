$(document).ready(function() {

    //canvas initialization
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var strokeColor = '#FFDC00';
    ctx.strokeStyle = strokeColor;

    var backgroundImg = new Image();
    backgroundImg.src = "images/house.jpg";
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

    $('#clear-canvas-btn').on('click', function () {
        vertexes = [];
        ctx.clearRect(0, 0, 700, 700);
        $('.handler').remove();
        $('.length-input').remove();
        ctx.drawImage(backgroundImg, 0, 0);
    })


});
