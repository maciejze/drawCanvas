    function addInput(inputPos, canvas) {
        if (inputPos) {
            var input = document.createElement('input');
            $(input).css('top', inputPos.y - 9 + 'px').css('left', inputPos.x - 15 + 'px');
            $(input).addClass('length-input').attr('type', 'number');
            canvas.after(input);
        }

    }

    function addVertexBuffor(canvas, posX, posY){
        var buffor = document.createElement('div');
        $(buffor).addClass('buffor');
        $(buffor).css('left', posX - 5 + 'px').css('top', posY - 5 + 'px');
        canvas.after(buffor);

    }

    function isInRectangle(x, y, vertexes) {
        var rectangleDim = 10;
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
