///////////////////////////////////////////////////////////////
//////////////////////////WINDOW HANDLES
///////////////////////////////////////////////////////////////
var created = false;

window.addEventListener("resize", Resize);
window.onload = Resize;
setInterval(Update, 20);


///////////////////////////////////////////////////////////////
//////////////////////////GLOBAL
///////////////////////////////////////////////////////////////
var niceColour = '#444';
var pointsArray = [];
var pointsVelocities = [];

var resizeRespawnThreshold = 200;

var maxNumPoints = 70;
var numPoints = 0;
var distanceForLine = 250;

var speed = 0.05;
var maxVelocity = 0.5;
var clickMoveInvPower = 5;


function Update(e)
{
    ///////////////////////////////////////////////////////////////
    //////////////////////////GLOBAL
    ///////////////////////////////////////////////////////////////
    var canvas = document.getElementById('background');
    var ctx = canvas.getContext('2d'); 
    var i = 0;//loop
    
    ///////////////////////////////////////////////////////////////
    //////////////////////////CREATION
    ///////////////////////////////////////////////////////////////
    if(created == false)
    {
        var numPointsToCreate = maxNumPoints;
        if(canvas.width < canvas.height)
        {
            numPointsToCreate = maxNumPoints / 1;
        }
        
        for(i = 0; i < numPointsToCreate; i++)
        {
            var randomX = Math.floor(Math.random() * canvas.width);
            var randomY = Math.floor(Math.random() * canvas.height);
            pointsArray[i] = [randomX, randomY];
            pointsVelocities[i] = [0,0];
        }
        numPoints = numPointsToCreate;
        created = true;
    }
    
    ///////////////////////////////////////////////////////////////
    //////////////////////////UPDATE
    ///////////////////////////////////////////////////////////////
    for(i = 0; i < numPoints; i++)
    {
        var direction = Math.random();

        if(direction < 0.2)
            pointsVelocities[i][0] += speed;
        else if(direction < 0.4)
            pointsVelocities[i][0] -= speed;
        else if(direction < 0.6)
            pointsVelocities[i][1] += speed;
        else if(direction < 0.8)
            pointsVelocities[i][1] -= speed;

        //Wall Bounce
        if(pointsArray[i][0] >= canvas.width)
        {
            pointsArray[i][0] = canvas.width;
            pointsVelocities[i][0] -= 1.0;
        }
        if(pointsArray[i][0] <= 0)
        {
            pointsArray[i][0] = 0;
            pointsVelocities[i][0] += 1.0;
        }
        if(pointsArray[i][1] >= canvas.height)
        {
            pointsArray[i][1] = canvas.height;
            pointsVelocities[i][1] -= 1.0;
        }
        if(pointsArray[i][1] <= 0)
        {
            pointsArray[i][1] = 0;
            pointsVelocities[i][1] += 1.0;
        }
        
        //Cap Max Velocity
        if(pointsVelocities[i][0] >= maxVelocity)pointsVelocities[i][0] = maxVelocity;
        if(pointsVelocities[i][0] <= -maxVelocity)pointsVelocities[i][0] = -maxVelocity;
        if(pointsVelocities[i][1] >= maxVelocity)pointsVelocities[i][1] = maxVelocity;
        if(pointsVelocities[i][1] <= -maxVelocity)pointsVelocities[i][1] = -maxVelocity;
    }
    
    for(i = 0; i < numPoints; i++)
    {
        pointsArray[i][0] += pointsVelocities[i][0];
        pointsArray[i][1] += pointsVelocities[i][1];
    }
    
    ///////////////////////////////////////////////////////////////
    //////////////////////////DRAW
    ///////////////////////////////////////////////////////////////
    ctx.clearRect (0, 0, ctx.canvas.width, ctx.canvas.height);
    
    var allowRender = true;
    if( canvas.width < 400 || canvas.height < 300)
    {
        allowRender = false;
    }
    
    if(allowRender)
    {
        for(i = 0; i < numPoints; i++)
        {
            drawPoint(ctx, pointsArray[i], 3);

            for(var j = i; j < numPoints; j++)
            {
                var distanceBetweenPoints = distanceCheck(pointsArray[i], pointsArray[j]);
                var distanceForLineSq = distanceForLine * distanceForLine;
                if(distanceBetweenPoints < distanceForLineSq)
                {
                    var a1 = 1-(distanceBetweenPoints/distanceForLineSq);
                    var opacity = a1*a1 * 2;

                    drawLineBetweenPoints(ctx, pointsArray[i], pointsArray[j], opacity);
                }
            }
        }
    }
}

function Resize()
{
    var canvas = document.getElementById('background');
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    
    var oldWidth = canvas.width;
    var oldHeight = canvas.height;
    
    var newWidth = rect.width * dpr;
    var newHeight = rect.height * dpr;
    
    if(Math.abs(newWidth - oldWidth) > resizeRespawnThreshold ||
       Math.abs(newHeight - oldHeight) > resizeRespawnThreshold)
    {
        created = false;
    }
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    var ctx = canvas.getContext('2d');

    ctx.scale(dpr, dpr);
    
    Update();
}

///////////////////////////////////////////////////////////////
//////////////////////////UTILITY
///////////////////////////////////////////////////////////////
function distanceCheck(pointOne, pointTwo) {
    var dist_points = (pointOne[0] - pointTwo[0]) * (pointOne[0] - pointTwo[0]) + (pointOne[1] - pointTwo[1]) * (pointOne[1] - pointTwo[1]);

    return dist_points;
}    
    
function drawPoint(ctx, point, size)
{
    ctx.beginPath();
    ctx.arc(point[0], point[1], size, 0, 2 * Math.PI, false);
    ctx.fillStyle = niceColour;
    ctx.fill();
}

function drawLineBetweenPoints(ctx, pointOne, pointTwo, opacity)
{
    ctx.globalAlpha = opacity;
    
    ctx.beginPath();
    ctx.moveTo(pointOne[0], pointOne[1]);
    ctx.lineTo(pointTwo[0], pointTwo[1]);
    ctx.strokeStyle = niceColour;
    ctx.lineWidth = 1;
    ctx.stroke()
    
    ctx.globalAlpha = 1;
}
