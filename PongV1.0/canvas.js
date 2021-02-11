// Pong Game made by Nnevalti github : https://github.com/Nnevalti
//
// Amélioration :
// dy et dx de la balle (aléatoire)
// Velocity de la ballle qui l'accelère a chaque collision avec les paddles
// Collision avec les paddles - À améliorer
// Permettre aux joueurs de sélectionner un score max
//  

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var scoreBoard = document.getElementById('scoreBoard');
var result = document.getElementById('result');
var animateLoopId;

canvas.width = 1000;
canvas.height = 400;

var neonEffect = 0.05;
var firstNeon = 10;
var secondNeon = 20;
var neonColor = 0;
var colorChange = 1;

var playerOne;
var playerTwo;
var ball;

var newScore = false;
var start;

var playerOneScore;
var playerTwoScore;
var maxScore = 10;

// Create the paddle and the ball
function createGameElement()
{
    playerOne = {};
    playerTwo = {};
    ball = {};
    playerOne = new playerPaddle(10, canvas.height /2, 4, 10, 120);
    playerTwo = new playerPaddle(canvas.width - 20, canvas.height /2, 4, 10, 120);
    ball = new Ball(canvas.width /2, canvas.height /2, 15, 4);
    
}

function displayGameElement()
{
    
}

// display the score displayed
function displayScoreBoard()
{
    scoreBoard.innerText = playerOneScore +" | "+ playerTwoScore;
    if(playerOneScore == 10){
        cancelAnimationFrame(animateLoopId);
        result.innerText = "Player One Win";
    } else if ( playerTwoScore == 10){
        cancelAnimationFrame(animateLoopId);
        result.innerText = "Player Two Win";
    }
}

function animateBorder()
{
    canvas.style.boxShadow = "inset 0 0 5px #fff,\
                            inset 0 0 "+ firstNeon +"px rgb(127, 0, "+ neonColor +"),\
                            inset 0 0 "+ secondNeon +"px rgb(127, 0, "+ neonColor +"),\
                            0 0 5px #fff,\
                            0 0 "+ firstNeon +"px rgb(127, 0, "+ neonColor +")";
    firstNeon += neonEffect;
    secondNeon += neonEffect;
    neonColor += colorChange;
    if (firstNeon <= 10 || firstNeon >= 30)
        neonEffect *= -1;
    if (neonColor < 1 || neonColor > 254)
        colorChange *= -1;
}

function wait(ms){
    if (end < start + ms)
      end = new Date().getTime();
    else
        newScore = false;
 }

// Animation function
function animate()
{
    animateLoopId = requestAnimationFrame(animate);
    animateBorder();
    movePlayers(pressedKeys);
    if (newScore == true)
        wait(500);
    else
        ball.animate();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerOne.draw();
    playerTwo.draw();
    ball.draw();
}

// Initialize the game
function init()
{
    createGameElement();
    playerOneScore = 0;
    playerTwoScore = 0;
    displayScoreBoard();
    animate();
}

// Array that store the state of the key
var pressedKeys = [];

//Set the down keys value to true when pressed
document.addEventListener('keydown', function(evt){
    
    if(evt.keyCode == 90)
    {
        pressedKeys["oneUp"] = true;
    }
    if(evt.keyCode == 83)
    {
        pressedKeys["oneDown"] = true;
    }
    if(evt.keyCode == 40)
    {
        pressedKeys["twoDown"] = true;   
    }
    if(evt.keyCode == 38)
    {
        pressedKeys["twoUp"] = true;
    }
});

//Set the down keys value to false when unpressed
document.addEventListener('keyup', function(evt){
    
    if(evt.keyCode == 90)
    {
        pressedKeys["oneUp"] = false;
    }
    if(evt.keyCode == 83)
    {
        pressedKeys["oneDown"] = false;
    }
    if(evt.keyCode == 40)
    {
        pressedKeys["twoDown"] = false;
    }
    if(evt.keyCode == 38)
    {
        pressedKeys["twoUp"] = false;
    }
});

// Is called while at least one key is pressed (keydown event) varify which keys are pressed simultaneaously
function movePlayers(pressedKeys){
    if(pressedKeys["oneUp"]){
        playerOne.moveUp();
    }
    if(pressedKeys["oneDown"]){
        playerOne.moveDown();
    }
    if(pressedKeys["twoUp"]){
        playerTwo.moveUp(); 
    }
    if(pressedKeys["twoDown"]){
        playerTwo.moveDown();
    }
}

// Collision between two boxes AABB (Go google it) ;)
function collisionFirstPlayer(ball, paddle)
{
    if (ball.x + ball.velocity.dx <= paddle.x + paddle.width
        && ball.y + ball.velocity.dy >= paddle.y
        && ball.y + ball.velocity.dy <= paddle.y + paddle.height)
        return true;
    else
        return false;
}
function collisionSecondPlayer(ball, paddle)
{
    if (ball.x + ball.side + ball.velocity.dx >= paddle.x
        && ball.y + ball.velocity.dy >= paddle.y
        && ball.y + ball.velocity.dy <= paddle.y + paddle.height)
        return true;
    else
        return false;
}

// Player paddle Object
function playerPaddle(x, y, dy, width, height)
{
    this.x = x;
    this.y = y - (height/2);
    this.dy = dy;
    this.width = width;
    this.height = height;

    this.draw = function(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    this.moveUp = function()
    {
        if(this.y > 0){
            this.y = this.y - this.dy;
            this.draw();
        }
    }

    this.moveDown = function()
    {
        if(this.y + this.height < canvas.height){
            this.y = this.y + this.dy;
            this.draw();
        }
    }
}

// Ball object
function Ball(x, y, side, speed)
{
    this.x = x;
    this.y = y;
    this.side = side;
    this.speed = speed;
    this.velocity = {dx: speed, dy: speed};

    this.draw = function()
    {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.side, this.side);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    this.reset = function()
    {
        this.x = canvas.width /2;
        this.y = canvas.height / 2;
    }

    this.animate = function()
    {
        this.x += this.velocity.dx;
        this.y += this.velocity.dy;

        // Collision on axis Y border  of the board game
        if(this.y <= 0 || this.y + this.side >= canvas.height)
        {
            this.velocity.dy = -this.velocity.dy;
        }

        //Collision with Players
        if(collisionFirstPlayer(ball, playerOne))
        {
            this.velocity.dx = -this.velocity.dx;
        }
        if(collisionSecondPlayer(ball, playerTwo))
        {
            this.velocity.dx = -this.velocity.dx;
        }

        // Goal Player two
        if(this.x <= 0)
        {   
            playerTwoScore++;
            displayScoreBoard();
            this.reset();
            newScore = true;
            start = new Date().getTime();
            end = start;
        }
        //Goal player one
        if(this.x + this.side >= canvas.width)
        {
            playerOneScore++;
            displayScoreBoard();
            this.reset();
            newScore = true;
            start = new Date().getTime();
            end = start;
        }
    }
}

init();
