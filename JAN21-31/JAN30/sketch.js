/*
Genuary 2023
JAN.30 "Minimalism"
By Roni Kaufman
https://ronikaufman.github.io
*/

const N_FRAMES = 1000;
let s = 16, n = 32, ratio = 1.25;

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
}

function setup() {
    createCanvas(n*s, n*s*ratio);
    noStroke();
    textSize(s*1.25);
    textAlign(LEFT, TOP);
    textFont(myFont);
    frameRate(20);
}

function draw() {
    background("#050505");
    fill("#fffbe6");

    let t = TAU*(frameCount%N_FRAMES)/N_FRAMES;

    for (let x = 0; x < width; x += s) {
        for (let y = 0; y < height; y += s*ratio) {
            let noice = loopNoise(x+s/2, y+s/2, t);
            if (floor(noice*32) % 2 == 0) text("*", x, y);
        }
    }
}

function loopNoise(x, y, theta) {
    let offset = 1000, sc = 1/750; //sc = scale

    return noise(
        offset + ((x+offset)*sc)*cos(theta),
        offset + ((x+offset)*sc/ratio)*sin(theta),
        y*sc
    );
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN30.gif", N_FRAMES, {delay: 0, units: "frames"});
    }
}