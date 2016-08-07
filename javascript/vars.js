'use strict '

// options
var opts = {
    ballRadius: 20,
    ballColor: 'red',
    textColor: 'black',
    angleColor: 'blue',
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
var time = 0;
var initialBall;
var ball;
var cliffHeight = 500;
var stepSize = 1000;

var lastFrame = null;
var running = false;
