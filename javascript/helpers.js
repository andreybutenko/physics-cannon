'use strict'

// trig degrees

function sinDeg(deg) {
    return Math.sin(deg / 180 * Math.PI);
}

function cosDeg(deg) {
    return Math.cos(deg / 180 * Math.PI);
}

// scale dimensions to fit in canvas, if necessary

function scale(x, coord) {
    if(coord == 'x') {
        var scaleFactor = (x < opts.width) ?
            1 : // if x is less than pixel width of canvas
            opts.width / x - 50; // if x is greater than pixel width of canvas
        return x * scaleFactor + 100;
    }
    else {
        var scaleFactor = (x < opts.height) ?
            1 : // if x is less than pixel height of canvas
            opts.height / x - 50; // if x is greater than pixel height of canvas
        return opts.height - (x * scaleFactor + 50);
    }
}

// model for vector

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    scale(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    }
}

// related to text showing formulas

function updateText() {
    setText('#t', ticks);

    setText('#x', ball.position.x);
    setText('#x0', initialBall.position.x);
    setText('#x-calc', initialBall.position.x + initialBall.velocity.x * ticks + 0.5 * initialBall.acceleration.x * Math.pow(ticks, 2));

    setText('#y', ball.position.y);
    setText('#y0', initialBall.position.y);
    setText('#y-calc', initialBall.position.y + initialBall.velocity.y * ticks + 0.5 * initialBall.acceleration.y * Math.pow(ticks, 2));

    setText('#vx', ball.velocity.x);
    setText('#vx0', initialBall.velocity.x);
    setText('#vx-calculated', initialBall.velocity.x + initialBall.acceleration.x * ticks);

    setText('#vy',  (ball.velocity.y).toFixed(3));
    setText('#vy0',initialBall.velocity.y);
    setText('#vy-calculated', initialBall.velocity.y + initialBall.acceleration.y * ticks);

    setText('#ax', ball.acceleration.x);
    setText('#ax0', initialBall.acceleration.x);

    setText('#ay', ball.acceleration.y);
    setText('#ay0', initialBall.acceleration.y);

    setTextbox('#angle', angle);
    setTextbox('#velocity', initialVelocity);
    setTextbox('#height', cliffHeight);
}

function setText(query, text) {
    if(typeof text == 'number') text = text.toFixed(2);
    var elements = document.querySelectorAll(query);
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = String(text);
    }
}

function setTextbox(query, text) {
    var elements = document.querySelectorAll(query);
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = String(text);
    }
}

// clear

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = opts.textColor;
    ctx.fillStyle = opts.textColor;

    var continueTicks = true;
    for(var i = 0; i <= 10; i++) {
        ctx.beginPath();
        var y = scale(i * 500 / 10, 'y');
        ctx.moveTo(scale(-10, 'x'), y);
        if(i == 0) ctx.lineTo(opts.width, y);
        else ctx.lineTo(scale(0, 'x'), y);
        ctx.stroke();

        ctx.font = '16px monospace';
        ctx.fillText(i * 500 / 10 + 'm', scale(-60, 'x'), y + 8);
    }

    var i = -1;
    var continueTicks = true;
    while(continueTicks) {
        i++;
        ctx.beginPath();
        var x = scale(i * 500 / 10, 'x');
        if(i % 2 == 0) ctx.moveTo(x, scale(-30, 'y'));
        else ctx.moveTo(x, scale(-10, 'y'));
        if(i == 0) ctx.lineTo(x, 0);
        else ctx.lineTo(x, scale(0, 'y'));
        ctx.stroke();

        if(i % 2 == 0) {
            ctx.font = '16px monospace';
            ctx.fillText(i * 500 / 10 + 'm', x + 5, scale(-26, 'y'));
        }

        if((i + 1) * 500 / 10 > opts.width) {
            continueTicks = false;
        }
    }

    var length = 60;
    ctx.strokeStyle = opts.angleColor;
    ctx.fillStyle = opts.angleColor;
    ctx.moveTo(scale(0, 'x'), scale(cliffHeight, 'y'));
    ctx.lineTo(scale(length * cosDeg(angle), 'x'), scale(cliffHeight + length * sinDeg(angle), 'y'));

    ctx.stroke();
}

// calculate initial acceleration

function recalculateInitial() {
    velocity.x = initialVelocity * cosDeg(angle);
    velocity.y = initialVelocity * sinDeg(angle);
    setup(true);
    tick();
}

// controls

document.getElementById('play-btn').addEventListener('click', function playBtnClick() { startSimulation(); });
document.getElementById('pause-btn').addEventListener('click', function pauseBtnClick() { stopSimulation(); });
document.getElementById('step-btn').addEventListener('click', function stepBtnClick() { setup(); tick(); });
document.getElementById('reset-btn').addEventListener('click', function stepBtnClick() { setup(true); tick(); });
document.getElementById('angle').addEventListener('keyup', function stepBtnClick() { angle = parseInt(document.getElementById('angle').value) || 0; recalculateInitial(); });
document.getElementById('velocity').addEventListener('keyup', function stepBtnClick() { initialVelocity = parseInt(document.getElementById('velocity').value) || 0; recalculateInitial(); });
document.getElementById('height').addEventListener('keyup', function stepBtnClick() { cliffHeight = parseInt(document.getElementById('height').value) || 0; setup(true); tick(); });