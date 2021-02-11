// Pong Game made by Nnevalti : https://github.com/Nnevalti
// I'll be commenting most of the code, so that the curious people 
// reading this can understand what i've done
// If you spot any bugs or you think there is room for an improvment
// feel free to fork the project and add your own commentary
// For this project i chose to use canvas JS

// First we create our canvas and set the context to a 2D plane
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mode0 = document.getElementById("NoP");
var mode1 = document.getElementById("1P");
var mode2 = document.getElementById("2P");
// Game parameters
var computerLevel = 0.1;
// Canvas spec
canvas.width = 1000;
canvas.height = 500;
var gameStart = false;
var noPlayer;
var multiPlayer;

// Initialize the game
// Create the paddle and the ball
P1 = new playerPaddle(10, canvas.height /2, 4, 20, 120, false, computerLevel);
P2 = new playerPaddle(canvas.width - 30, canvas.height /2, 4, 20, 120, true, computerLevel);
ball = new Ball(canvas.width /2, canvas.height /2, 15, 4, 0.5);
net = new Net(10, 20);
scoreBoard = new scoreBoard();
// Score and Scoreboard declarations
var result = document.getElementById('result');
var P1_Score = 0;
var P2_Score = 0;
var maxScore = 10;

// Neon effect for the border
var neonEffect = 0.01;
var firstNeon = 10;
var secondNeon = 20;
var neonColor = 0;
var colorChange = 1;

// I used this bit of a code and tweaked it for my game to calculate frameRate and lag
// https://stackoverflow.com/questions/25612452/html5-canvas-game-loop-delta-time-calculations/25628203
var frameRate = 120; //Set the frame rate
var start; //Get the start time
var current = 0;
var elapsed = 0;
var frameDuration = 1000 / frameRate; //Set the frame duration in milliseconds
var lag = 0; //Initialize the lag offset
// I added this part to display frames while playing
var second = 0;
var frame = 0;
var fps = 0;
var pFrame = document.getElementById("frame");

// Update the objects to :
// Calculate new posistions
// Detect collision
function update()
{
    frame += 1;
    P1.update();
    P2.update();
    ball.update();
    if(P1_Score >= maxScore){
        gameStart = false;
        result.innerText = "Player One Win";
    } else if ( P2_Score >= maxScore){
        gameStart = false;
        result.innerText = "Player Two Win";
    }
}

function resetGame()
{
    P1_Score = 0;
    P2_Score = 0;
    ball.reset();
}

// Cheap neon animation for the canvas border
function animateNeon()
{
    canvas.style.boxShadow = "inset 0 0 5px #fff,\
                            inset 0 0 "+ firstNeon +"px rgb(127, 0, "+ neonColor +"),\
                            inset 0 0 "+ secondNeon +"px rgb(127, 0, "+ neonColor +"),\
                            0 0 5px #fff,\
                            0 0 "+ firstNeon +"px rgb(127, 0, "+ neonColor +")";
    // Every frame I shift the color between red/purple and blue
    // I also increase and decrease the shadow blur radius to 
    // give it a little bit more vibes
    firstNeon += neonEffect;
    secondNeon += neonEffect;
    neonColor += colorChange;
    if (firstNeon <= 10 || firstNeon >= 30)
        neonEffect *= -1;
    if (neonColor < 1 || neonColor > 254)
        colorChange *= -1;
}

// This function is like my Picasso
// First we clear the canvas
// Then we call the draw functions of every object to display a new
// frame in the canvas
function render()
{
    fps += 1;
    animateNeon();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scoreBoard.draw();
    net.draw();
    P1.draw();
    P2.draw();
    ball.draw();
}

// For my UI I just changed the colors based on the mode you've selected
// PlayerVsCOM being the default mode
function UI()
{
    mode0.style.color = 'white';
    mode1.style.color = 'white';
    mode2.style.color = 'white';
    if (noPlayer)
        mode0.style.color = "rgb(127, 0, "+ neonColor +")";
    else if (!multiPlayer)
        mode1.style.color = "rgb(127, 0, "+ neonColor +")";
    else
        mode2.style.color = "rgb(127, 0, "+ neonColor +")";
}

// This is the game
// First we used timestamp to calculate the elapsed time
// and the frames
// Every one second (1000ms) it display the frames count in the UI
// Then it uses the frameduration variable to determine if the programm
// needs to call update
// I decided not to use lagOffset but maybe i'll try later
function Pong()
{
    current = Date.now();
    elapsed = current - start;
    start = current;
    lag += elapsed;
    while (lag >= frameDuration)
    {  
        update();
        lag -= frameDuration;
    }
    second += elapsed;
    if (second >= 1000)
    {
        second -= 1000;
        pFrame.innerText ="Frame Rate : " + frame + " / FPS : " + fps;
        frame = 0;
        fps = 0;
    }
}

// This is my game Loop wherre I handle whether we are in the menu or in the game
function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (gameStart)
    {
       Pong();
    }
    else
    {
       UI();
    }
    render();
}

gameLoop();