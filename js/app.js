// Enemies our player must avoid
var Enemy = function(x, y) {
    // enemy object initial x axis postion and y axis positon  
    this.x = x;
    this.y = y;

    // This speed of enemy object
    this.speed = ((Math.random() * 300 )+10)

    // The image/sprite for our enemies, this uses
    this.sprite = 'images/enemy-bug.png';
};


// Movement for enemy object
Enemy.prototype.update = function(dt) {

    //Check enemy is out of screen and in this our Canvas width is 505
    if(this.x > 505){
        this.x = 0;
    }else{
        this.x += this.speed * dt;
    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check enemy collide with player 
Enemy.prototype.checkCollision = function(player){
     if(Math.abs(this.x - player.x) < 75 && Math.abs(this.y - player.y) < 60){
        alert("Oh Try again");
        player.reset();
     }   
}

//  Player of game 
var Player = function(){
    // Inital player positon is fixed to center
    this.x = 202;
    this.y = 400;
    this.score = 0;

    //The image/sprite of our player
    this.sprite = 'images/char-boy.png';

}

// Draw the player on the screen
Player.prototype.render = function(){
    // Player Image 
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)

    // Player Score
   ctx.font = "20px Arial";
   ctx.fillStyle = "red";
   ctx.fillText("Score : "+this.score, 410,80); 
}

Player.prototype.update = function(dt){
    //When player reched water, reset the player
    if(this.y < 0) 
    { 
        this.score++;
        this.reset(); 
    }
}

Player.prototype.reset = function(){
    this.x = 202;
    this.y = 400;
}

Player.prototype.restart = function(){
    this.reset();
    this.score = 0; 
}
// Handling Action on Player 
Player.prototype.handleInput = function(keyCode){

     if(keyCode == "left" && this.x > 10){
        this.x -= 101;
     }else if (keyCode == "right" && this.x < 400){
        this.x += 101;
     }else if (keyCode == "up" && this.y > 0){
        this.y -= 81;
     }else if (keyCode == "down" && this.y < 400){
        this.y += 81;
     }

};

// Timer for game
var Timer = function(){
    this.startTime = Date.now();
    this.timeRemaining = 60;
}

Timer.prototype.render = function(){
       // Player Score
   ctx.font = "20px Arial";
   ctx.fillStyle = "red";
   ctx.fillText("Time remaining : "+this.timeRemaining, 10,80); 

}

// Timer tracking method
Timer.prototype.update =  function(player){
   this.timeRemaining = 10 - (Math.floor((Date.now() - this.startTime) / 1000));
   if(this.timeRemaining == 0){
          var  r = confirm("Your score is "+player.score+"\n Do you want to play again");
          if(r == true){
             this.startTime = Date.now();
             player.score = 0;
             return true;
          }else{
             ctx.font = "40px Arial";
             ctx.fillStyle = "black";
             ctx.fillText(" Game over ", 200,200); 
             return false;
          }
   }
   else{
    return true;
   }
}


var allEnemies = [];
allEnemies.push(new Enemy(0,60));
allEnemies.push(new Enemy(0,150));
allEnemies.push(new Enemy(0,230));

var player = new Player();

var timer = new Timer();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
