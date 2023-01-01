/*
Genuary 2023
JAN.1 "Perfect loop / Infinite loop / endless GIFs"
By Roni Kaufman
https://ronikaufman.github.io
*/

// parameters for the font
let myFont;
let fontHeight = 1.5, s, n = 32;

let palette = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
}

function setup() {
    noStroke();
    textFont(myFont);
    textSize(24);
    textAlign(LEFT, TOP);
    s = textWidth("A")*1.1;
    createCanvas(s*n, s*n*fontHeight);
}

function draw() {
    background("#050505");
    
    let chars = ":-=+*#%@%#*+=-:.";
    let t = frameCount/10;
    let x = 0, y0 = s*(1-fontHeight);
    for (let i = 0; i < n; i++) {
        let y = y0;
        for (let j = 0; j < n; j++) {
            let d = dist(x+s/2, y+s*fontHeight/2-y0, width/2, height/2)/20;
            let idxColor = ~~abs(d + t);
            fill(palette[idxColor%palette.length]);
            let idxChar = ~~abs(d - t);
            text(chars[idxChar%chars.length], x, y);
            y += s*fontHeight;
        }
        x += s;
    }
}