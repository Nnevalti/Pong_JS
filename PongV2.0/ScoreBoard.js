function scoreBoard()
{
    this.draw = function()
    {
        drawText(P1_Score, canvas.width/4, canvas.height/10, 'white');
        drawText(P2_Score, 3*(canvas.width/4), canvas.height/10, 'white');
    }
}