// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Ball(x, y, velX, velY, color, radius) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.radius = radius;
}

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
}

function get_rand_color() {
    var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while (color.length < 6) {
        color = "0" + color;
    }
    return "#" + color;
}

let balls = new Array(50);

function createManyBalls() {
    for (i = 0; i < balls.length; i++) {
        const color = get_rand_color();
        const newBall = new Ball(random(0, width), random(0, height), random(-7, 7), random(-7, 7), color, random(10, 40));

        while (newBall.velY === 0 || newBall.velX === 0) {
            newBall.velY = random(-7, 7);
            newBall.velX = random(-7, 7);
        }

        balls[i] = newBall;
    }
}

createManyBalls();


Ball.prototype.move = function () {

    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
        this.velX *= -1;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
        this.velY *= -1;
    }

    if (this.velY === 0 && this.velX === 0) {
        this.velY = random(1, 3);
        this.velX = random(1, 3);
    }

    this.x += this.velX;
    this.y += this.velY;
}

function moveBalls() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].move();
    }

    requestAnimationFrame(moveBalls);
}

moveBalls();

