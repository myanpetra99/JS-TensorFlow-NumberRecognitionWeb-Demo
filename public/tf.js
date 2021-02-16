
    var model;
    async function loadModel() {
        model = await tf.loadLayersModel('https://raw.githubusercontent.com/myanpetra99/NumberRecognitionWeb/main/public/jsmodel/model.json');
    }
 
    function init(container, width, height, fillColor) {
        var canvas = createCanvas(container, width, height);
        var ctx = canvas.context;
        //define a custom fillCircle method
        ctx.fillCircle = function (x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.moveTo(x, y);
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };
        ctx.clearTo = function (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height); 
        };
        ctx.clearTo(fillColor || "#ffffff");
     
        // bind mouse events
        canvas.node.onmousemove = function (e) {
            if (!canvas.isDrawing) {
            return;
            }
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var radius = 3; // or whatever
            var fillColor = '#000000';
            ctx.fillCircle(x, y, radius, fillColor);
        };
        canvas.node.onmousedown = function (e) {
            canvas.isDrawing = true;
        };
        canvas.node.onmouseup = function (e) {
            canvas.isDrawing = false;
            recogniseNumber()
        };
        loadModel();
        }
     
        function predict(tfImage) {
            var output = model.predict(tfImage);
            var result = Array.from(output.dataSync());
            console.log('Output is : ', Array.from(output.dataSync()));
            var maxPossibility = result.reduce(function(a,b){return Math.max(a,b)});
            console.log(maxPossibility);
            document.getElementById('prediction').innerHTML =  '<p>'
                + result.indexOf(maxPossibility).toString() +' With probability : '+maxPossibility+'%'+ '</p>'
        }
    
        function recogniseNumber() {
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
     
            // console.log(ctx.getImageData(0,0, 100, 100));
            var imageData = ctx.getImageData(0, 0, 100, 100);
            var tfImage = tf.browser.fromPixels(imageData, 1);
     
            //Resize to 28X28
            var tfResizedImage = tf.image.resizeBilinear(tfImage, [28,28]);
            //Since white is 255 black is 0 so need to revert the values
            //so that white is 0 and black is 255
            tfResizedImage = tf.cast(tfResizedImage, 'float32');
            tfResizedImage = tf.abs(tfResizedImage.sub(tf.scalar(255)))
                .div(tf.scalar(255)).flatten();
            tfResizedImage = tfResizedImage.reshape([-1, 28,28]);
     
            //Make another dimention as the model expects
            console.log(tfResizedImage.dataSync());
            predict(tfResizedImage);
        }   

init(container, 100, 100, '#ffffff');
    
document.getElementById('clear').addEventListener('click', clear);
