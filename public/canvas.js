function createCanvas(parent, width, height) {
    var canvas = {};
    canvas.node = document.createElement('canvas');
    canvas.node.setAttribute('id', 'canvas');
   // canvas.node.setAttribute('tabindex', '1');
    canvas.node.style.border = 'thin solid black'
    canvas.context = canvas.node.getContext('2d');
    canvas.node.width = width || 100;
    canvas.node.height = height || 100;
    parent.appendChild(canvas.node);
    return canvas;
}


function clear() {
    console.log('clear canvas');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearTo('#ffffff');
    document.getElementById('prediction').innerHTML = '';
}


var container = document.getElementById('canvas-container');


