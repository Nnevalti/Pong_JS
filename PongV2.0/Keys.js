//Set the down keys value to true when pressed
function handlePlayersKeysUp(evt)
{
    if(evt.keyCode == 83)
    {
        if (!noPlayer)
            P1.keyDown = true;
    }    
    if(evt.keyCode == 90)
    {
        if (!noPlayer)
            P1.keyUp = true;
    }
    if(evt.keyCode == 40)
    {
        if (!noPlayer && multiPlayer)
            P2.keyDown = true;
    }
    if(evt.keyCode == 38)
    {
        if (!noPlayer && multiPlayer)
            P2.keyUp = true;
    }
}

function handlePlayersKeysDown(evt)
{
    if(evt.keyCode == 83)
    {
        P1.keyDown = false;
    }
    if(evt.keyCode == 90)
    {
        P1.keyUp = false;
    }
    if(evt.keyCode == 40)
    {
        P2.keyDown = false;
    }
    if(evt.keyCode == 38)
    {
        P2.keyUp = false;
    }
}

// All menu controls that can be used when not in game
function handleUIKeys(evt)
{
    if (evt.keyCode == 13) // Enter
    {
        // resetting start (var for frames)
        start = Date.now();
        // reset Game Element to default
        resetGame();
        // Set the bool gameStart to true
        gameStart = true;
    }
    if (evt.keyCode == 96 ||evt.keyCode == 48) // 0 : NoP Game mode
    {
        P1.isAI = true;
        P2.isAI = true;
        noPlayer = true;
    }
    else if (evt.keyCode == 97 || evt.keyCode == 49) // 1 : 1P Game mode
    {
        noPlayer = false;
        multiPlayer = false;
        P1.isAI = false;
        P2.isAI = true;
    }
    else if (evt.keyCode == 98 || evt.keyCode == 50) // 2 : 2P Game mode
    {
        noPlayer = false;
        multiPlayer = true;
        P1.isAI = false;
        P2.isAI = false;
    }
}

document.addEventListener('keydown', function(evt)
{
    if (gameStart)
    {
        handlePlayersKeysUp(evt);
        if (evt.keyCode == 27) // Esc : quit the current game
        {
            resetGame();
            gameStart = false;
        }
    }
    else
        handleUIKeys(evt);    
});

//Set the down keys value to false when unpressed
document.addEventListener('keyup', function(evt)
{
    if (gameStart)
        handlePlayersKeysDown(evt);
});