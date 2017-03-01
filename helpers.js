    function addInput(inputPos, canvas, id) {
        if (inputPos) {
            var input = document.createElement('input');
            $(input).css('top', inputPos.y - 5 + 'px').css('left', inputPos.x - 20 + 'px');
            $(input).addClass('length-input')
                .attr('type', 'number')
                .attr('min', '1')
                .attr('value', 100)
                .attr('id','input' + id );
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

    function redrawCanvas(ctx, canvas, id) {
        $('.length-input').remove();
        ctx.clearRect(0, 0, 700, 700);
        ctx.beginPath();
        ctx.strokeStyle = "#FFDC00";
        ctx.fillStyle = "rgba(255,220,0,0.5)";
        ctx.moveTo(vertexes[0].x, vertexes[0].y);
        ctx.drawImage(backgroundImg, 0, 0);
        for (var i = 1; i < vertexes.length; i++) {
            ctx.lineTo(vertexes[i].x, vertexes[i].y);

        }
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
        if (vertexes.length > 1) {
            for (i = 0; i < vertexes.length - 1; i++) {
                addInput(getHalfLinePoint(vertexes[i], vertexes[i + 1]), canvas, i);
            }
            addInput(getHalfLinePoint(vertexes[vertexes.length - 1], vertexes[0]), canvas, i);
        }

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
