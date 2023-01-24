/*
Genuary 2023
JAN.24 "Textile"
By Roni Kaufman
https://ronikaufman.github.io
*/

let s = 40, m = 12, n = 6, ratio = 2.7;

function setup() {
    createCanvas(m*s, n*s*ratio);
    noStroke();
    textSize(s*2.41);
    textAlign(LEFT, TOP);
    textFont("monospace");
    noLoop();
}

function draw() {
    background(255, 0, 0)

    let palette = ["#fffbe6", "#050505"]
    let colors = shuffle(["#abcd5e", "#14976b", "#b3dce0", "#62b6de", "#2b67af", "#f9d531"]);
    let nColors = random([1, 2, 3]);
    for (let i = 0; i < nColors; i++) {
        palette.push(colors[i]);
    }

    translate(0, s/3);
    for (let x = 0; x < width; x += s) {
        for (let y = 0; y < height; y += s*ratio) {
            fill(random(palette));
            text("█", x, y);
            fill(random(palette));
            if (random() < 1/2) {
                text("▓", x, y);
            } else {
                text("░", x, y);
            }
        }
    }
}