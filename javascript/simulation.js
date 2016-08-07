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

    recalculate(delta) {
        this.position.add(this.velocity.clone().scale(delta));
        this.velocity.add(this.acceleration.clone().scale(delta));
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

function tick(delta) {
    if(typeof delta == 'undefined') {
        delta = 0;
    }

    time += delta;
    delta = delta / 1000;

    if(ball.position.y <= 0) {
        return;
    }
    if(time > 0) ball.recalculate(delta);
    clearScreen();
    ball.redraw();

    updateText();

    if(ball.position.y <= 0) {
        stopSimulation();
    }
}

function step() {
    var now = new Date().getTime();

    if(lastFrame == null) {
        lastFrame = now;
        next();
        return;
    }

    var delta = now - lastFrame;
    lastFrame = now;

    if(stopTime != 0 && time + delta > stopTime) {
        delta = stopTime - time;
        tick(delta);
        stopSimulation();
        return;
    }

    tick(delta);
    next();
}

function startSimulation() {
    lastFrame = null;
    setup();
    running = true;
    next();
}

function next() {
    if(running) window.requestAnimationFrame(step);
}

function stopSimulation() {
    running = false;
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
        time = 0;
    }
}

function reset() {
    recalculateInitial();
    setup(true);
    stopSimulation();
    tick(0);
}

recalculateInitial();
setup(true);
