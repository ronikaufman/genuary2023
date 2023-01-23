/*
Genuary 2023
JAN.23 "More Moiré"
By Roni Kaufman
https://ronikaufman.github.io
*/

const N_FRAMES = 90;
let palette = ["#f9d531", "#fc8405", "#ef562f", "#f589a3", "#62b6de", "#2b67af"];

function setup() {
    createCanvas(600, 600);
    noStroke();
    textSize(30);
    textAlign(CENTER, CENTER);
    textFont("monospace");
}

function draw() {
    background("#fffbe6");

    let t = (frameCount%N_FRAMES)/N_FRAMES;

    let n = 60, r = 48;
    for (let i = 0; i < palette.length; i++) {
        let offset = (3*(i+1)) * (i % 2 == 0 ? 1 : -1);
        
        fill("#050505");
        for (let j = 0; j < n; j++) {
            let theta = j*TAU/n;
            let x = r*cos(theta) + width/2;
            let y = r*sin(theta) + height/2;
            push();
            translate(x, y);
            rotate(theta+PI/2);
            text("|", 0, 0);
            pop();
        }

        fill(palette[i]);
        for (let j = 0; j < n+offset; j++) {
            let theta = (j+t)*TAU/(n+offset);
            let x = r*cos(theta) + width/2;
            let y = r*sin(theta) + height/2;
            push();
            translate(x, y);
            rotate(theta+PI/2+PI/15);
            text("|", 0, 0);
            pop();
        }
        
        n += 60;
        r += 40;
    }
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN23.gif", N_FRAMES, {delay: 0, units: "frames"});
    }
}