/*
Genuary 2023
JAN.14 "Aesemic"
By Roni Kaufman
https://ronikaufman.github.io
*/

let charset = ["◧", "◨", "◢", "◣", "◤", "◥", "◫", "▣", "▤", "▥", "▧", "▨"];
let s;
let margin = 50;

function setup() {
    createCanvas(420, 594);
    textAlign(CENTER, CENTER);
    textFont("monospace");
    s = 15;
    textSize(s*1.2);
    noLoop();
    noStroke();
}

function draw() {
    background("#fffbe6");

    fill("#2b67af");
    let y = margin;
    while (y < height-margin-s) {
        let maxLines = min(6, (height-margin - y)/s);
        y = makeParagraph(y, maxLines);
        y += s;
    }
}

function makeParagraph(y, maxLines) {
    let nLines = ~~random(2, maxLines);
    for (let i = 0; i < nLines; i++) {
        let xMax = (i < nLines-1) ? width-margin-s : random(width/4, width-margin-s);
        makeLine(xMax, y);
        y += s*1.1;
    }
    return y;
}

function makeLine(xMax, y) {
    let canBeSpace = false;
    for (let x = margin; x < xMax; x += s) {
        canBeSpace = makeLetter(x, y, canBeSpace);
    }
}

function makeLetter(x, y, canBeSpace) {
    if (random() < 1/5 && canBeSpace) return false;
    
    let nChars = random([1, 2, 2]), prevChar;
    for (let i = 0; i < nChars; i++) {
        fill(random(["#050505", "#050505", "#2b67af", "#ef562f"]));
        let newChar = random(charset);
        while ((newChar == "◧" && prevChar == "◨") || (newChar == "◨" && prevChar == "◧") || (newChar == "◥" && prevChar == "◣") || (newChar == "◣" && prevChar == "◥") || (newChar == "◤" && prevChar == "◢") || (newChar == "◢" && prevChar == "◤")) {
            newChar = random(charset);
        }
        text(newChar, x+s/2, y+s/2);
        prevChar = newChar;
    }

    return true;
}