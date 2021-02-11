function Net(width, height)
{
    this.x = canvas.width/2 - width/2;
    this.y = 0;
    this.width = width;
    this.height = height;

    this.draw = function()
    {
        for (let i = 0 ;i <= canvas.height; i += 30)
        {
            drawRect(this.x, this.y + i, this.width, this.height, 'white');
        }
    }
}