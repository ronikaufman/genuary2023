/*
Genuary 2023
JAN.31 "Deliberately break one of your previous images, take one of your previous works and ruin it. / Alternatively, remix one of your previous works."
By Roni Kaufman
https://ronikaufman.github.io
*/

// parameters for the font
let myFont;
let fontHeight = 4/3, s, n = 33;
const N_FRAMES = 99;

let palette = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
}

function setup() {
    noStroke();
    textFont(myFont);
    textSize(24);
    textAlign(LEFT, TOP);
    s = textWidth("A")*4/3;
    createCanvas(s*n, s*n*fontHeight);
}

function draw() {
    background("#050505");
    
    let chars = "·-=+*#%@";
    let t = 8*(frameCount%N_FRAMES)/N_FRAMES;
    let x = 0, y0 = s*(1-fontHeight);
    for (let i = 0; i < n; i++) {
        let y = y0;
        for (let j = 0; j < n; j++) {
            let idx = 8*(atan2(y+s/2-height/2, x+s/2-width/2)*3 + PI)/TAU + dist(x+s/2, y+s/2, width/2, height/2)/33;
            let idxColor = ~~abs(idx - t + 24);
            fill(palette[idxColor%8]);
            let idxChar = ~~abs(idx - t + 24);
            text(chars[idxChar%8], x, y);
            y += s*fontHeight;
        }
        x += s;
    }
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN31.gif", N_FRAMES, {delay: 0, units: "frames"});
    }
}