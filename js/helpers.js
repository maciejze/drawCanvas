    function addInput(inputPos, canvas, id) {
        if (inputPos) {
            var input = document.createElement('input');
            $(input).addClass('length-input')
                .attr('type', 'number')
                .attr('min', '1')
                .attr('value', 100)
                .attr('id', 'input' + id)
                .css('top', inputPos.y  + 'px')
                .css('left', inputPos.x  + 'px');
                
            canvas.after(input);
        }

    }

    function addVertexHandler(canvas, posX, posY, ctx) {
        var handler = document.createElement('div');
        var quantity = $('.handler').length;

        $(handler).addClass('handler')
            .attr('vertex', quantity)
            .css('left', posX + 'px')
            .css('top', posY + 'px');

        canvas.after(handler);

        $(handler).draggable({
            drag: function(event, ui) {
                vertexes[$(handler).attr('vertex')].x = ui.position.left;
                vertexes[$(handler).attr('vertex')].y = ui.position.top;
                redrawCanvas(ctx, canvas);
            }
        });

    }

    function redrawCanvas(ctx, canvas) {
        //clear canvas
        $('.length-input').remove();
        ctx.clearRect(0, 0, 700, 700);
        ctx.beginPath();
        ctx.strokeStyle = "#FFDC00";
        ctx.fillStyle = "rgba(255,220,0,0.5)";

        //redraw polygon
        ctx.moveTo(vertexes[0].x, vertexes[0].y);
        ctx.drawImage(backgroundImg, 0, 0);

        for (var i = 1; i < vertexes.length; i++) {
            ctx.lineTo(vertexes[i].x, vertexes[i].y);
        }

        ctx.lineTo(vertexes[0].x, vertexes[0].y);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
        //draw input
        if (vertexes.length > 1) {
            addInput(getHalfLinePoint(vertexes[0], vertexes[1]), canvas, 0);
            addInput(getHalfLinePoint(vertexes[1], vertexes[2]), canvas, 1);
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
