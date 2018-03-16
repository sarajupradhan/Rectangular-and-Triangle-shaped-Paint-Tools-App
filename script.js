// Declare canvas, context, dragStartPoint, imgData variables.
var canvas,
    ctx,
    dragging = false,
    dragStartPoint,
    imgData;
 
function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

// Using getImageData function get the previous data and store in imgData variable.
function copy() {
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Put previous data using putImageData function.
function paste() {
    ctx.putImageData(imgData, 0, 0);
}
  
  // Draw the Rectangular using Mouse Coordinates.
function drawRect(position) {

    ctx.beginPath();
    ctx.rect(position.x, position.y, dragStartPoint.x - position.x, dragStartPoint.y - position.y);
    ctx.fill();
} 

// Draw the Triangle using Mouse Coordinates.
  function drawTriangle(position)
 {   var coordinates = [],
        angle = 100,
        sides = 3,

        radius = Math.sqrt(Math.pow((dragStartPoint.x - position.x), 2) + Math.pow((dragStartPoint.x - position.x), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartPoint.x + radius * Math.cos(angle), y: dragStartPoint.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    } 

         ctx.beginPath();
    ctx.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        ctx.lineTo(coordinates[index].x, coordinates[index].y);
    }

    ctx.closePath();
     ctx.fill();
 }
      
 // Using draw function decide which shape user want to draw and default will be Rectangular.
     function draw(position) {

      var  shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
    if (shape === "rect") {
        drawRect(position);
    }
    
    if (shape === "tri") {
        drawTriangle(position);
    }
    
}
  //randomColor function is helps to generate different color in everytime but randomaly.
  function randomColor( )
  {  
    var r = Math.round(Math.random( )*256);
    var g = Math.round(Math.random( )*256);
    var b = Math.round(Math.random( )*256);

    return 'rgb( ' + r + ',' + g + ',' + b + ')';

  }

 // Using dragstart, drag, and dragStop function we find out where the  starting position, drag interval, and 
 // end position of the Mouse and it takes event as a perameter,
function dragStart(event) {
    dragging = true;
    dragStartPoint = getCanvasCoordinates(event);
    copy();
}

function drag(event) {
    var position;
    if (dragging === true) {
        paste();
        position = getCanvasCoordinates(event);
        ctx.fillStyle = randomColor( );
        draw(position);
    }
}

function dragStop(event) {
    dragging = false;
    paste();
    ctx.fillStyle = randomColor( );
    var position = getCanvasCoordinates(event);
    draw(position);
}  
// Find the canvas element using getElementById function,
// Using addEventListener function attack a click event to the Documents, when the User clicks anywhere in the Documents,
// Clear all the canvas elements using clearRect function.
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
   
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    document.getElementById("clear").addEventListener('mousedown',function(){
    ctx.clearRect(0,0,canvas.width, canvas.height); 
});  

}

window.addEventListener('load', init, false);
