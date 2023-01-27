/*
Genuary 2023
JAN.27 "In the style of Hilma Af Klint"
By Roni Kaufman
https://ronikaufman.github.io
*/

const N_FRAMES = 100;
let s = 16, m = 32, n = 48;

function setup() {
    createCanvas(m*s, n*s);

    noStroke();
    textSize(s*1.5);
    textAlign(LEFT, TOP);
    textFont("monospace");
}

function draw() {
    background("#050505");

    let t = TAU*(frameCount%N_FRAMES)/N_FRAMES;

    let ratio = 0.95;
    let palette = ["#ef562f", "#fc8405", "#f9d531", "#abcd5e", "#62b6de", "#2b67af", "#f589a3"];

    let x0 = s/2;
    let xC = width/2, yC = height-m*s;
    let nRays = 20;
    for (let y = 0; y < width; y += s) {
        for (let x = x0%s; x < width; x += s) {
            let d = dist(x+s/2, y+s/2, xC, yC);
            let theta = (atan2(y+s/2-yC, x+s/2-xC)+PI+PI/nRays)%(2*TAU/nRays);
            if (d > 200) noFill();
            else fill("#b3dce0");
            if (d < 160) {
                fill("#14976b");
                if (theta < TAU/nRays) {
                    fill("#f9d531");
                }
            }
            if (d < 90 + sin(t)*20) {
                fill("#f9d531");
            }
            text("▲", x, y);
            text("▼", x, y-s*(2-ratio));
        }
        x0 += s/2;
    }

    x0 = 0;
    let y = height-s;
    for (let i = m; i > 1; i--) {
        let x = x0;
        for (let j = 0; j < i; j++) {
            let col = round(map(j, 0, i-1, 0, palette.length-1));
            fill(palette[col]);
            
            text("▲", x, y);
            text("▼", x, y+s*ratio);
            x += s;
        }
        x0 += s/2;
        y -= s;
    }
    fill("#fffbe6");
    text("▲", x0, y);
    fill(palette[~~(palette.length/2)]);
    text("▼", x0, y+s*ratio);
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN27.gif", N_FRAMES, {delay: 0, units: "frames"});
    }
}