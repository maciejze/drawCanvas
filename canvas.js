var rectangleDim = 10;
var vertexes = [];
var polygon = [];
$(document).ready(function() {
    //canvas initialization
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var strokeColor = '#FFDC00';
    ctx.strokeStyle = strokeColor;

    var img = new Image();
    img.src = "house.jpg";
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    };

    var canvas = $('#myCanvas');
    var offset = canvas.offset();

    //click to draw event
    canvas.on('click', function(e) {

        var relX = e.pageX - offset.left;
        var relY = e.pageY - offset.top;

        if (!isInRectangle(relX, relY, vertexes).inside) {

            //draw line
            ctx.lineTo(relX, relY);
            ctx.stroke();

            //draw rectangle
            addVertexBuffor(canvas, relX, relY);
            // ctx.rect(relX - rectangleDim / 2, relY - rectangleDim / 2, rectangleDim, rectangleDim);
            ctx.moveTo(relX, relY);
            ctx.stroke();

            //add vertex to array
            vertexes.push({
                x: relX,
                y: relY
            });




            //adds input to middle of line
            addInput(getHalfLinePoint(vertexes[vertexes.length - 1], vertexes[vertexes.length - 2]), canvas);

        } else {
            var x = isInRectangle(relX, relY, vertexes).rect.x;
            var y = isInRectangle(relX, relY, vertexes).rect.y;
            ctx.lineTo(x, y);
            ctx.stroke();
            canvas.unbind("click");

            ctx.strokeStyle = 'transparent';
            ctx.fillStyle = "rgba(255, 220, 0, 0.7)";;
            ctx.beginPath();
            ctx.moveTo(vertexes[0].x, vertexes[0].y);

            for (var i = 1; i < vertexes.length ; i++) {
                ctx.lineTo(vertexes[i].x, vertexes[i].y);

            }
            ctx.closePath();
            ctx.fill();

            //adds input to middle of line
            addInput(getHalfLinePoint(vertexes[vertexes.length - 1], vertexes[0]), canvas);
        }
    });

});
