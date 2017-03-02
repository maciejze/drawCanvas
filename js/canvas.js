(function($) {
    $.fn.drawOnCanvas = function(config) {

        //canvas initialization
        var c = document.getElementById(this.attr('id'));
        var ctx = c.getContext("2d");
        var canvas = this;
        var offset = canvas.offset();

        var vertexes = [];
        ctx.strokeStyle = "#FFDC00";
        ctx.fillStyle = "rgba(255,220,0,0.5)";

        var backgroundImg = new Image();
        backgroundImg.src = config.imageUrl;
        backgroundImg.onload = function() {
            drawImage()
        };

        //click to draw event
        canvas.on('click', function(e) {
            var relX = e.pageX - offset.left;
            var relY = e.pageY - offset.top;
            if (vertexes.length < 4) {
                //add draggable handler and add vertex to array
                addVertexHandler(relX, relY);
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

        $('#' + config.clearBtnId).on('click', function() {
            clearCanvas(true);
            $('.handler').remove();
            $('.length-input').remove();
            drawImage();
        })

        function drawImage() {
            ctx.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height, 0, 0, canvas.width(), canvas.height());
        }

        function clearCanvas(clearVertexes) {
            if(clearVertexes){
                vertexes = [];
                $('.canvas-vertex-handler').remove();
            }
            $('.canvas-length-input').remove();
            ctx.clearRect(0, 0, canvas.width(), canvas.height());
        }

        function addInput(inputPos, id) {
            if (inputPos) {
                var input = document.createElement('input');
                $(input).addClass('canvas-length-input')
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
            var quantity = $('.canvas-vertex-handler').length;
            $(handler).addClass('canvas-vertex-handler')
                .attr('vertex', quantity)
                .css('left', posX + 'px')
                .css('top', posY + 'px');

            canvas.after(handler);

            $(handler).draggable({
                drag: function(event, ui) {
                    vertexes[$(handler).attr('vertex')].x = ui.position.left;
                    vertexes[$(handler).attr('vertex')].y = ui.position.top;
                    redrawCanvas();
                }
            });

        }

        function redrawCanvas() {

            clearCanvas(false);
            drawImage();
            //redraw polygon and fill it with background
            ctx.beginPath();
            ctx.moveTo(vertexes[0].x, vertexes[0].y);

            for (var i = 1; i < vertexes.length; i++) {
                ctx.lineTo(vertexes[i].x, vertexes[i].y);
            }

            ctx.lineTo(vertexes[0].x, vertexes[0].y);
            ctx.stroke();
            ctx.closePath();
            ctx.fill();

            //draw input
            if (vertexes.length > 1) {
                addInput(getHalfLinePoint(0));
                addInput(getHalfLinePoint(1));
            }

        }

        function getHalfLinePoint(lineIdx) {

            var pointA = vertexes[lineIdx];
            var pointB = vertexes[lineIdx + 1];
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
