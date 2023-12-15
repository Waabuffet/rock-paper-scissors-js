class Bot {
    constructor(x, y, size, powers, powerImages, wBoudary, hBoudary, whichPower) {
        this.position = new p5.Vector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.mult(3);
        this.size = size;
        this.r = size / 2;
        this.m = this.r * 0.1;
        this.powers = powers;
        this.powerImages = powerImages;
        this.power = powers[whichPower];
        this.img = powerImages[whichPower];
        this.wBoudary = wBoudary;
        this.hBoudary = hBoudary;
    }
    update() {
        this.position.add(this.velocity);
    }
    switch(index) {
        this.power = this.powers[index];
        this.img = this.powerImages[index];
    }

    checkBoundaryCollision() {
        if (this.position.x > this.wBoudary - this.r) {
            this.position.x = this.wBoudary - this.r;
            this.velocity.x *= -1;
        } else if (this.position.x < this.r) {
            this.position.x = this.r;
            this.velocity.x *= -1;
        } else if (this.position.y > this.hBoudary - this.r) {
            this.position.y = this.hBoudary - this.r;
            this.velocity.y *= -1;
        } else if (this.position.y < this.r) {
            this.position.y = this.r;
            this.velocity.y *= -1;
        }
    }

    checkCollision(other) {
        // Get distances between the bots components
        let distanceVect = p5.Vector.sub(other.position, this.position);

        // Calculate magnitude of the vector separating the bots
        let distanceVectMag = distanceVect.mag();

        // Minimum distance before they are touching
        let minDistance = this.r + other.r;

        if (distanceVectMag < minDistance) {
            this.color = color(255, 0, 0);
            other.color = color(255, 0, 0);
            if (this.power == 'rock' && other.power == 'scissors') {
                other.switch(this.powers.indexOf('rock'));
            } else if (this.power == 'paper' && other.power == 'rock') {
                other.switch(this.powers.indexOf('paper'));
            } else if (this.power == 'scissors' && other.power == 'paper') {
                other.switch(this.powers.indexOf('scissors'));
            }
        }
        return this.power;
    }

    display() {
        image(this.img, this.position.x - (this.size / 2), this.position.y - (this.size / 2), this.size, this.size);
    }
}