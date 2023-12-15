var bots_count = 50;
var bot_size = 40;
var speed = 3;


var bots = [];
var powers = ['rock', 'paper', 'scissors'];
var initPowers = {
    rock: Math.floor(bots_count / 3),
    paper: Math.floor(bots_count / 3),
    scissors: Math.floor(bots_count / 3),
}
var powerImages = [];
var rect_height = 5;
var gameOver = false;
var winner = '';
var margin = 20;
var bots_real_count = 0;

function setup() {
    createCanvas(windowWidth - margin, windowHeight - margin);
    powerImages = [loadImage('img/rock.png'), loadImage('img/paper.png'), loadImage('img/scissors.png')];

    bots_real_count = initPowers.rock + initPowers.paper + initPowers.scissors;
    for (var i = 0; i < bots_real_count; i++) {
        bots.push(new Bot(random(windowWidth - margin), random(windowHeight - margin - (rect_height * 3)), bot_size, powers, powerImages, windowWidth - margin, windowHeight - margin - (rect_height * 3), getInitPower(), speed));
    }
    console.log('done')
}

function getInitPower(){
    var whichPowerIndex = Math.floor(random(Object.keys(initPowers).length));
    var whichPower = Object.keys(initPowers)[whichPowerIndex];
    initPowers[whichPower]--;
    if(initPowers[whichPower] == 0){
        delete initPowers[whichPower];
    }
    return whichPowerIndex;
}

function draw() {
    background(81);
    var rockCount = 0;
    var paperCount = 0;
    var scissorsCount = 0;
    for (var i = 0; i < bots_real_count; i++) {
        if (!gameOver) {
            bots[i].update();
        }
        bots[i].display();
        bots[i].checkBoundaryCollision();
        for (var j = 0; j < bots_real_count; j++) {
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
        text("Winner is " + winner, (windowWidth - margin) / 2, (windowHeight - margin) / 2);
    }

    fill(255, 0, 0);
    rect(0, windowHeight - margin - rect_height, getRectWidth(rockCount, 'rock'), rect_height);
    fill(0, 0, 255);
    rect(0, windowHeight - margin - rect_height * 2, getRectWidth(paperCount, 'paper'), rect_height);
    fill(0, 255, 0);
    rect(0, windowHeight - margin - rect_height * 3, getRectWidth(scissorsCount, 'scissors'), rect_height);
    fill(0);
    line(0, windowHeight - margin - rect_height * 3, windowWidth, windowHeight - margin - rect_height * 3);
}

function getRectWidth(value, who) {
    var per = value * 100 / bots_real_count;
    if(per == 100){
        gameOver = true;
        winner = who;
    }
    return per * (windowWidth - margin) / 100;
}