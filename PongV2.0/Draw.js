function drawRect(x, y, w, h, color)
{
    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor="rgb(127, 0, "+ neonColor +")";
    ctx.shadowBlur=firstNeon + 10;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
}

function drawCircle(x, y, r, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawText(text, x, y, color)
{   
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = "45px Montserrat";
    ctx.fillText(text, x, y);
    ctx.restore();

}