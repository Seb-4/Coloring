var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = document.getElementById("img");

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img, 0, 0, img.width, img.height);
var points = [];
var x = 1;
var y = 1;


function getColor() {
    var data = ctx.getImageData(x, y, 1, 1).data;
    
    var r = data[0];
    var g = data[1];
    var b = data[2];
    
    var color = [r, g, b];
    
    if (points.includes(color) == false) {
        points.push(color);
    }
    
    console.log(data);
    console.log(r, g, b, color, points);
    
    if (x==img.width) {
        x = 1;
        y += 1;
    }
    else {
        x += 1;
    }
}

while (x != img.width && y != img.height) {
    getColor();
}