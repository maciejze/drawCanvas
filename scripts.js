$(document).ready(function() {
    //canvas initialization
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var strokeColor = '#ff0000';
    ctx.strokeStyle = strokeColor;

    var img = new Image();
    img.src = "house.jpg";
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    };

    var vertexes = [];
    var canvas = $('#myCanvas');
    var rectangleDim = 20;
    var offset = canvas.offset();

    //click to draw event
    canvas.on('click', function(e) {

        var relX = e.pageX - offset.left;
        var relY = e.pageY - offset.top;

        if (!isInRectangle(relX, relY).inside) {
            //draw line
            ctx.lineTo(relX, relY);
            ctx.stroke();

            //draw rectangle
            ctx.rect(relX - rectangleDim / 2, relY - rectangleDim / 2, rectangleDim, rectangleDim);
            ctx.moveTo(relX, relY);
            ctx.stroke();

            //add vertex to array
            vertexes.push({
                x: relX,
                y: relY
            });

            //adds input to middle of line
            addInput(getHalfLinePoint(vertexes[vertexes.length - 1], vertexes[vertexes.length - 2]));

        } else {
            var x = isInRectangle(relX, relY).rect.x;
            var y = isInRectangle(relX, relY).rect.y;
            ctx.lineTo(x, y);
            ctx.stroke();
            canvas.unbind("click");

            //adds input to middle of line
            addInput(getHalfLinePoint(vertexes[vertexes.length - 1], vertexes[0]));

        }




    });


    function addInput(inputPos) {
        if (inputPos) {
            var input = document.createElement('input');
            $(input).css('top', inputPos.y - 9 + 'px').css('left', inputPos.x - 15 + 'px');
            $(input).addClass('length-input').attr('type', 'number');
            canvas.after(input);
        }

    }

    function isInRectangle(x, y) {
        for (var i = 0; i < vertexes.length; i++) {

            if (Math.abs(vertexes[i].x - x) < rectangleDim / 2 && Math.abs(vertexes[i].y - y) < rectangleDim / 2) {
                return {
                    inside: true,
                    rect: vertexes[i]
                };
            }
        }
        return {
            inside: false
        };
    }

    function getHalfLinePoint(pointA, pointB) {
        if (pointA === undefined || pointB === undefined) {
            return false;
        }
        var halfPoint = {};
        halfPoint.x = (pointA.x + pointB.x) / 2;
        halfPoint.y = (pointA.y + pointB.y) / 2;
        return halfPoint;
    }

});
