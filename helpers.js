    function addInput(inputPos, canvas, id) {
        if (inputPos) {
            var input = document.createElement('input');
            $(input).css('top', inputPos.y - 5 + 'px').css('left', inputPos.x - 20 + 'px');
            $(input).addClass('length-input')
                .attr('type', 'number')
                .attr('min', '1')
                .attr('value', 100)
                .attr('id', 'input' + id);
            canvas.after(input);
        }

    }

    function addVertexHandler(canvas, posX, posY, ctx) {
        var handler = document.createElement('div');
        var quantity = $('.handler').length;

        $(handler).addClass('handler').attr('vertex', quantity);
        $(handler).css('left', posX + 'px')
            .css('top', posY + 'px')
        canvas.after(handler);

        $(handler).draggable({
            start: function() {
                $(handler).css('cursor', 'none');
            },
            drag: function(event, ui) {
                vertexes[$(handler).attr('vertex')].x = ui.position.left;
                vertexes[$(handler).attr('vertex')].y = ui.position.top;
                redrawCanvas(ctx, canvas);
            },
            stop: function() {
                $(handler).css('cursor', 'pointer');
            }
        });

    }

    function redrawCanvas(ctx, canvas) {
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
