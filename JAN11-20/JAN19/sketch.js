/*
Genuary 2023
JAN.18 "A grid inside a grid inside a grid"
By Roni Kaufman
https://ronikaufman.github.io
*/

const N_FRAMES = 120;
let s = 16, n = 48;
let myFont;
let balls = [], nBalls = 15;
let v0;

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
}

function setup() {
    createCanvas(n*s, n*s);
    noStroke();
    textSize(s*1.1);
    textAlign(LEFT, TOP);
    textFont(myFont);
    fill("#fffbe6");

    for (let i = 0; i < nBalls; i++) {
        let sp = random(5, 10);
        let t0 = random(TAU);
        let r = random(20, 25);
        balls.push(new Ball(width/2, height/2, sp, t0, r));
    }
    v0 = createVector(width/2, height/2);
}

function draw() {
    background("#050505");
    
    let charset = "@%#*+=-:·:-=+*#%@";

    let t = TAU*(frameCount%N_FRAMES)/N_FRAMES;
    for (let x = 0; x < width; x += s) {
        for (let y = 0; y < height; y += s) {
            let v = createVector(x+s/2, y+s/2);
            let sum = 0;
            for (let b of balls) {
                let d = v.dist(b.pos);
                sum += b.r/d;
            }
            let charIdx = constrain(~~(sum*charset.length), 0, 2*charset.length)%charset.length;
            text(charset[charIdx], x, y);
        }
    }

    for (let b of balls) b.update(t);
}

function Ball(x, y, sp, t0, r) {
    this.pos = createVector(x, y);
    this.theta = random(TAU);
    this.sp = sp;
    this.t0 = t0
    this.r = r;

    this.update = function(t) {
        this.vel = p5.Vector.fromAngle(this.theta, sin(this.t0 + t)*this.sp);
        this.pos.add(this.vel);
    }
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN19.gif", N_FRAMES, {delay: 0, units: "frames"});
    }
}