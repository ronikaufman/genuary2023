/*
Genuary 2023
JAN.15 "Sine waves"
By Roni Kaufman
https://ronikaufman.github.io
*/

let myFont, piDigits;
let s = 8;
let palette = ["#fffbe6", "#b3dce0", "#62b6de", "#2b67af"];
let N_FRAMES = 150;

function preload() {
    myFont = loadFont("./fonts/VictorMono-SemiBold.ttf");
    piDigits = loadStrings("./JAN11-20/JAN15/pi.txt");
}

function setup() {
    createCanvas(600, 600);
    noStroke();
    textFont(myFont);
    textSize(s*1.5);
    textAlign(CENTER, CENTER);
    piDigits = piDigits[0];
}

function draw() {
    background("#050505");

    let t = TAU*(frameCount%N_FRAMES)/N_FRAMES;

    let rMax = 240;
    let i = 0;
    for (let y = 0; y < height; y += s*1.5) {
        for (let x = 0; x < width; x += s) {
            let r = mag(x-width/2, y-height/2);

            if (sq(r) < sq(rMax)) {
                let col = ~~(sin(x/30-t)/1.5+y/30-0.5)%palette.length;
                fill(palette[col]);
                text(piDigits[i++], x, y);
            }
        }
    }
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN15.gif", N_FRAMES, {delay: 0, units: "frames"});
    }
}
  