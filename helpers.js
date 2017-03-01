    function addInput(inputPos, canvas) {
        if (inputPos) {
            var input = document.createElement('input');
            $(input).css('top', inputPos.y - 5 + 'px').css('left', inputPos.x - 15 + 'px');
            $(input).addClass('length-input').attr('type', 'number').attr('min', '0').attr('value', 1);
            canvas.after(input);
        }

    }

    function addVertexBuffor(canvas, posX, posY) {
        var buffor = document.createElement('div');
        $(buffor).addClass('buffor');

        $(buffor).css('left', posX - rectangleDim / 2 + 'px')
            .css('top', posY - rectangleDim / 2 + 'px')
            .css('width', rectangleDim + 'px')
            .css('height', rectangleDim + 'px');

        canvas.after(buffor);

    }

    function redrawCanvas(ctx) {
        ctx.clearRect(0, 0, 700, 700);
        ctx.beginPath();
        ctx.strokeStyle = "#FFDC00";
        ctx.fillStyle = "rgba(255,220,0,0.5)"
        ctx.moveTo(vertexes[0].x, vertexes[0].y);
        ctx.drawImage(backgroundImg, 0, 0);
        for (var i = 1; i < vertexes.length; i++) {
            ctx.lineTo(vertexes[i].x, vertexes[i].y);

        }
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
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

    function getHalfLinePoint(pointA, pointB, last) {
        if (pointA === undefined || pointB === undefined) {
            return false;
        }
        var halfPoint = {};
        halfPoint.x = (pointA.x + pointB.x) / 2;
        halfPoint.y = (pointA.y + pointB.y) / 2;
        return halfPoint;
    }
