var bots_count = 50;
var bot_size = 40;


var bots = [];
var powers = ['rock', 'paper', 'scissors'];
var powerImages = [];
var rect_height = 5;
var gameOver = false;
var winner = '';

function setup() {
    createCanvas(windowWidth - 50, windowHeight - 50);
    powerImages = [loadImage('img/rock.png'), loadImage('img/paper.png'), loadImage('img/scissors.png')];

    for (var i = 0; i < bots_count; i++) {
        var new_bot = new Bot(random(windowWidth - 50), random(windowHeight - 50 - (rect_height * 3)), bot_size, powers, powerImages, windowWidth - 50, windowHeight - 50 - (rect_height * 3));
        bots.push(new_bot);
    }
}

function draw() {
    background(81);
    var rockCount = 0;
    var paperCount = 0;
    var scissorsCount = 0;
    for (var i = 0; i < bots_count; i++) {
        if (!gameOver) {
            bots[i].update();
        }
        bots[i].display();
        bots[i].checkBoundaryCollision();
        for (var j = 0; j < bots_count; j++) {
            if (i != j) {
                bots[i].checkCollision(bots[j]);
            }
        }
        switch (bots[i].power) {
            case 'rock':
                rockCount++;
                break;
            case 'paper':
                paperCount++;
                break;
            case 'scissors':
                scissorsCount++;
                break;
        }
    }

    if(gameOver){
        fill(255);
        textSize(100);
        textAlign(CENTER);
        text("Winner is " + winner, (windowWidth - 50) / 2, (windowHeight - 50) / 2);
    }

    fill(255, 0, 0);
    rect(0, windowHeight - 50 - rect_height, getRectWidth(rockCount, 'rock'), rect_height);
    fill(0, 0, 255);
    rect(0, windowHeight - 50 - rect_height * 2, getRectWidth(paperCount, 'paper'), rect_height);
    fill(0, 255, 0);
    rect(0, windowHeight - 50 - rect_height * 3, getRectWidth(scissorsCount, 'scissors'), rect_height);
}

function getRectWidth(value, who) {
    var per = value * 100 / bots_count;
    if(per == 100){
        gameOver = true;
        winner = who;
    }
    return per * (windowWidth - 50) / 100;
}