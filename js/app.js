// Enemies our player must avoid
var Enemy = function(x, y) {
    // enemy object initial x axis postion and y axis positon  
    this.x = x;
    this.y = y;

    // This speed of enemy object
    this.speed = ((Math.random() * 200 )+10)

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


var allEnemies = [];
allEnemies.push(new Enemy(0,60));
allEnemies.push(new Enemy(0,150));
allEnemies.push(new Enemy(0,230));






// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
