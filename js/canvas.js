(function($) {
    $.fn.drawOnCanvas = function(imageUrl) {
        //canvas initialization
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.strokeStyle = '#FFDC00';
        var vertexes = [];
        var backgroundImg = new Image();
        backgroundImg.src = imageUrl;
        backgroundImg.onload = function() {
            drawImage()
        };

        var canvas = $('#myCanvas');
        var offset = canvas.offset();

        //click to draw event
        canvas.on('click', function(e) {

            var relX = e.pageX - offset.left;
            var relY = e.pageY - offset.top;
            if (vertexes.length < 4) {

                //draw rectangle
                addVertexHandler(relX, relY);

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
            redrawCanvas();
        });

        $('#clear-canvas-btn').on('click', function() {
            vertexes = [];
            ctx.clearRect(0, 0, canvas.width(), canvas.height());
            $('.handler').remove();
            $('.length-input').remove();
            drawImage();
        })

        function drawImage() {
            ctx.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height, 0, 0, c.width, c.height);
        }

        function addInput(inputPos, id) {
            if (inputPos) {
                var input = document.createElement('input');
                $(input).addClass('length-input')
                    .attr('type', 'number')
                    .attr('min', '1')
                    .attr('value', 100)
                    .attr('id', 'input' + id)
                    .css('top', inputPos.y + 'px')
                    .css('left', inputPos.x + 'px');

                canvas.after(input);
            }

        }

        function addVertexHandler(posX, posY) {
            var handler = document.createElement('div');
            var quantity = $('.handler').length;
            console.log('vertex handler pos', posX, posY)
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

        function redrawCanvas() {
            //clear canvas
            $('.length-input').remove();
            ctx.clearRect(0, 0, canvas.width(), canvas.height());
            ctx.beginPath();
            ctx.strokeStyle = "#FFDC00";
            ctx.fillStyle = "rgba(255,220,0,0.5)";

            //redraw polygon
            ctx.moveTo(vertexes[0].x, vertexes[0].y);
            console.log('canvas line start', vertexes[0].x, vertexes[0].y);
            drawImage()

            for (var i = 1; i < vertexes.length; i++) {
                console.log('canvas line to', vertexes[i].x, vertexes[i].y);
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
    }
})(jQuery)
