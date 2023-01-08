/*
Genuary 2023
JAN.8 "Signed Distance Functions"
By Roni Kaufman
https://ronikaufman.github.io
*/

let myFont;
let m, n, sx, sy, margin = 5;
const N_FRAMES = 128;

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
}

function setup() {
    m = 80, n = 40;
    textFont(myFont, 16);
    textAlign(LEFT, TOP);
    sx = textWidth("a"), sy = sx * 2;

    createCanvas(m*sx + margin, n*sy + margin);
    frameRate(10);
    noStroke();
}

function draw() {
    background("#050505");

    let palette = ["#f9d531", "#ef562f", "#2b67af"];
    let t = TAU*(frameCount%N_FRAMES)/N_FRAMES;

    let y = margin/2-2;
    for (let j = 0; j < n; j++) {
        let x = margin/2;
        for (let i = 0; i < m; i++) {
            let px = 2*x/width-1, py = y*2/height-1; // normalize
            let c = " ";
            let r = 0.3;
            for (let i = 0; i < palette.length; i++) {
                let sd = sdf(px, py, r, t);
                if (sd < 0) {
                    c = str(i+1);
                    fill(palette[i]);
                }
                r += 0.2;
                t *= -1;
            }
            
            text(c, x, y);
            x += sx;
        }
        y += sy;
    }
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN08.gif", N_FRAMES, {delay: 0, units: "frames"});
    }
}

function sdf(px, py, r, t) {
    let hexagon =  sdHexagon(px*cos(t) - py*sin(t), px*sin(t) + py*cos(t), r);
    return abs(hexagon) - 0.06;
}

// adapted from https://iquilezles.org/articles/distfunctions2d/
function sdHexagon(px, py, r) {
    let kx = -0.866025404, ky = 0.5, kz = 0.577350269;
    px = abs(px);
    py = abs(py);
    let w = kx * px + ky * py;  
    px -= 2*min(w, 0)*kx;
    py -= 2*min(w, 0)*ky; 
    px -= constrain(px, -kz*r, kz*r);
    py -= r;
    let d = mag(px, py) * Math.sign(py);
    return d;
}