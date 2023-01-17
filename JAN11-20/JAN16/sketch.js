/*
Genuary 2023
JAN.16 "Sine waves"
By Roni Kaufman
https://ronikaufman.github.io
*/

let s = 5;
let N_FRAMES = 360;

function setup() {
    createCanvas(600, 500);
    noStroke();
    textSize(s*4);
    textAlign(CENTER, CENTER);
    textFont("monospace");
    frameRate(24);

    background("#fffbe6");
}

function draw() {
    background("#fffbe624");

    fill("#050505");
    let theta = TWO_PI*(frameCount%N_FRAMES)/N_FRAMES;
    for (let x = s/2; x < width; x += s) {
        for (let y = 3*s/4; y < height; y += s) {
            let nse;
            if (x < width/2) {
                nse = loopNoise(x, y, theta);
            } else {
                nse = loopNoise(width - x, y, theta);
            }
            if (nse < 0.4) {
                text("◉", x, y);
            }
        }
    }
}

function loopNoise(x, y, theta) {
    let offset = 10, sc = 1/100; //sc = scale

    return noise(
        offset + (x*sc)*cos(theta),
        offset + (x*sc)*sin(theta),
        y*sc
    );
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN16.gif", N_FRAMES, {delay: 0, units: "frames"});
    }
}