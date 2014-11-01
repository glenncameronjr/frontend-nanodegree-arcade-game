// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.enemyY = [60,145,230];
    this.x = this.startPosX();
    this.y = this.startPosY();

}

Enemy.prototype.startPosX = function() {
    var startX = -(Math.round(Math.random()*400));
    return startX;
}

Enemy.prototype.startPosY = function() {
    var startY = this.enemyY[Math.round(Math.random()*2)];
    return startY;
}


Enemy.prototype.reset = function() {
//to take care of the bug's speed and to ensure it is random as well as it's starting position
    this.x+=300*dt;
    this.x = this.startPosX();
    this.y = this.startPosY();

}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 500){
        this.x+=200*dt;
    }
    else{
        this.x = this.startPosX();
        this.y = this.startPosY();
        this.x+=300*dt;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.playerX = 0;
    this.x = this.startPosX();
    this.y = this.startPosY();
    this.blood = 'images/blood.png';
    
    

}

Player.prototype.startPosX = function() {
    var startX = 200;
    return startX;
}

Player.prototype.startPosY = function() {
    var startY = 430;
    return startY;
}
Player.prototype.move = function() {
    this.loc++;
};

Player.prototype.update = function(dt) {


}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 430;
}

Player.prototype.handleInput = function(key) {
   switch(key) {
        case 'left':
            if(this.x > 0)
            this.x-=100;
            break;
        case 'up':
            if(this.y > 100)
            this.y-=95;
            break;
        case 'right':
            if(this.x < 400)
            this.x+=100;
            break;
        case 'down':
            if(this.y < 400)
            this.y+=95;
            break;
        default:
            return;
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];


var player = new Player();

//background music
var snd = new Audio("sound/overworld.mp3");
snd.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

snd.play()

//splay sound
var hitSound = new Audio("sound/splat.mp3");

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

//this doesnt do anything... WHY?
function checkCollisions() {
    for (enemy in allEnemies){
        if ((player.x - allEnemies[enemy].x < 50 && player.y - allEnemies[enemy].y < 50) && (player.x - allEnemies[enemy].x > -50 && player.y - allEnemies[enemy].y > -50)){
            //ctx.drawImage('images/blood.png',10,10);
           // add blood and sound.
            hitSound.play();
            player.reset();
        }
    }
}


