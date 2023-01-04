/*
Genuary 2023
JAN.3 "Glitch Art"
By Roni Kaufman
https://ronikaufman.github.io
*/

let myFont;
const N_FRAMES = 150;
let str = "YES";

function preload() {
    myFont = loadFont("./fonts/VictorMono-BoldOblique.ttf");
}

function setup() {
    createCanvas(500, 500);
}

function draw() {
    background("#050505");

    let t = (frameCount%N_FRAMES)/N_FRAMES;
    let glitchAmount = pow((1-cos(t*TAU))/2, 10)/2;
    let nDivs = 1+~~(64*glitchAmount);

    let colors = ["#f9d531", "#fffbe6"];
    
    if (t == 0.5) {
        if (str == "YES") str = "NO";
        else str = "YES";
    }
    
    for (let i = 0; i < colors.length; i++) {
        let buff = createGraphics(width, height);
        buff.noStroke();
        buff.fill(colors[i]);
        buff.textFont(myFont, 192);
        buff.textAlign(CENTER, CENTER);
        let offset = i*4;
        buff.text(str, width/2 + offset, height/2 - offset - 28);
        let buffGlitched = glitchIt(buff, glitchAmount, nDivs);
    
        image(buffGlitched, 0, 0);
    
        buff.remove();
        buffGlitched.remove();
    }
}

function glitchIt(img, amount, nDivs) {
    let grph = createGraphics(img.width, img.height);
    let bh = img.height/nDivs;
    for (let y = 0; y < img.height; y += bh) {
        let xOffset = random(-amount, amount)*img.width;
        grph.image(img, xOffset, y, img.width, bh, 0, y, img.width, bh);
    }
    return grph;
}

function keyPressed() {
    if (key === 's') {
        frameCount = 0;
        saveGif("JAN03.gif", N_FRAMES*4, {delay:0, units: "frames"});
    }
}