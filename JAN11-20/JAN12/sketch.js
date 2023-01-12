/*
Genuary 2023
JAN.12 "Tessellation"
By Roni Kaufman
https://ronikaufman.github.io
*/

let n = 32, s;
let palettes = [
    ["#abcd5e", "#29ac9f", "#14976b", "#f9d531"],
    ["#f589a3", "#ef562f", "#fc8405", "#f9d531"]
], palette;
let charset = ["🞔", "🞕", "🞖"];

function setup() {
    createCanvas(600, 600);
    noLoop();
    noStroke();

    palette = random(palettes);
    
    textAlign(LEFT, TOP);
    textFont("monospace");
    s = width/n;
    let fontSize = 1;
    while (textWidth(charset[0]) < s) {
        fontSize += 0.5;
        textSize(fontSize);
    }
}

function draw() {
    background("#050505");

    if (random() < 1/2) subDivA(0, 0, n, 0, n, n, 0, n);
    else subDivB(0, n, 0, 0, n, 0, n, n);
}

function subDivA(x1, y1, x2, y2, x3, y3, x4, y4) {
    if (abs(x2-x1) < 2 && abs(y2-y1) < 2) {
        fill(random(palette));
        let x = min(x1, x2, x3, x4)*s;
        let y = min(y1, y2, y3, y4)*s;
        text(random(charset), x, y);
        return;
    }
    let x12 = (x1+x2)/2, y12 = (y1+y2)/2;
    let x23 = (x2+x3)/2, y23 = (y2+y3)/2;
    let x34 = (x3+x4)/2, y34 = (y3+y4)/2;
    let x41 = (x4+x1)/2, y41 = (y4+y1)/2;
    let x5 = (x12+x34)/2, y5 = (y12+y34)/2;

    subDivB(x41, y41, x5, y5, x12, y12, x1, y1);
    subDivA(x12, y12, x2, y2, x23, y23, x5, y5);
    subDivA(x23, y23, x5, y5, x34, y34, x3, y3);
    subDivB(x34, y34, x4, y4, x41, y41, x5, y5);
}

function subDivB(x1, y1, x2, y2, x3, y3, x4, y4) {
    if (abs(x2-x1) < 2 && abs(y2-y1) < 2) {
        return;
    }
    let x12 = (x1+x2)/2, y12 = (y1+y2)/2;
    let x23 = (x2+x3)/2, y23 = (y2+y3)/2;
    let x34 = (x3+x4)/2, y34 = (y3+y4)/2;
    let x41 = (x4+x1)/2, y41 = (y4+y1)/2;
    let x5 = (x12+x34)/2, y5 = (y12+y34)/2;

    subDivB(x41, y41, x5, y5, x12, y12, x1, y1);
    subDivB(x12, y12, x2, y2, x23, y23, x5, y5);
    subDivA(x23, y23, x5, y5, x34, y34, x3, y3);
    subDivA(x34, y34, x4, y4, x41, y41, x5, y5);
}