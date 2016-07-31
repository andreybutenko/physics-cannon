'use strict '

// options
var opts = {
    ballRadius: 20,
    ballColor: 'red',
    textColor: 'black',
    angleColor: 'blue',
    fps: 5,
    width: window.innerWidth,
    height: 600,
    initialAngle: 0,
    initialVelocity: 20
};

// reference to the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// resize
canvas.width = opts.width;
canvas.height = opts.height;

// variables
var timer;
var angle = opts.initialAngle;
var initialVelocity = opts.initialVelocity;
var velocity = { x: 0, y: 0 };
var ticks = 0;
var initialBall;
var ball;
var cliffHeight = 500;
