'use strict'

class Ball {
    constructor() {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
    }

    setPosition(vector) {
        this.position = vector;
    }

    setVelocity(vector) {
        this.velocity = vector;
    }

    setAcceleration(vector) {
        this.acceleration = vector;
    }

    recalculate() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    redraw() {
        ctx.beginPath();
        ctx.arc(
            scale(this.position.x, 'x'), // x center
            scale(this.position.y, 'y'), // y center
            opts.ballRadius, // radius
            0, 2 * Math.PI, false); // misc
        ctx.fillStyle = opts.ballColor;
        ctx.fill();
    }
}



function tick() {
    if(ball.position.y <= 0) {
        return;
    }
    
    ticks++;
    if(ticks > 0) ball.recalculate();
    clearScreen();
    ball.redraw();

    updateText();

    if(ball.position.y <= 0) {
        stopSimulation();
    }
}

function startSimulation() {
    setup();
    timer = setInterval(tick, 1000 / opts.fps);
}

function stopSimulation() {
    clearInterval(timer);
}

function setup(force) {
    if(ball == null || force) {
        ball = new Ball();
        ball.setPosition(new Vector(0, cliffHeight));
        ball.setVelocity(new Vector(velocity.x, velocity.y));
        ball.setAcceleration(new Vector(0, -9.81));

        initialBall = new Ball();
        initialBall.setPosition(ball.position.clone());
        initialBall.setVelocity(ball.velocity.clone());
        initialBall.setAcceleration(ball.acceleration.clone());
        ticks = -1;
    }
}

recalculateInitial();
setup(true);
tick();
