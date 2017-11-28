var canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.getElementById('main-body').appendChild(canvas);



var ctx = canvas.getContext('2d');
ctx.moveTo(10,10);
ctx.lineTo(200,100);
ctx.stroke();