// Player paddle Object
function playerPaddle(x, y, dy, width, height, isAI, clvl)
{
    this.x = x;
    this.y = y - (height/2);
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.keyUp = false;
    this.keyDown = false;
    this.clvl = clvl;
    this.isAI = isAI;

    this.top;
    this.bottom;
    this.left;
    this.right;
    
    this.draw = function()
    {
        drawRect(this.x, this.y, this.width, this.height, 'white');
    }
    
    this.update = function()
    {
        if (this.isAI)
        {
            if(this.y < 0)
                this.y = 0;
            else if (this.y + this.height > canvas.height)
                this.y = canvas.height - this.height;
            else
                this.y += (ball.y - (this.y + this.height/2)) * this.clvl;
        }
        else
        {
            if(this.keyUp)
            {
                if(this.y > 0)
                    this.y -= this.dy;
                else
                    this.y = 0;
            }
            if(this.keyDown)
            {
                if(this.y + this.height < canvas.height)
                    this.y += this.dy;
                else
                    this.y = canvas.height - this.height;
            }
        }
    }
}