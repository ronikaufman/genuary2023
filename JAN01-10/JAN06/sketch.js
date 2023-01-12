/*
Genuary 2023
JAN.6 "Steal Like An Artist"
By Roni Kaufman
https://ronikaufman.github.io
*/

let myFont;
let sourceCode, data, n, sx, sy, margin = 5;

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
    sourceCode = loadStrings("./JAN01-10/JAN06/sketch.js");
}

function setup() {
    n = sourceCode.length;
    data = [];
    for (let i = 0; i < n; i++) {
        let line = [];
        for (let j = 0; j < n; j++) {
            let l = sourceCode[i][j];
            if (l == undefined) l = " ";
            line.push(l);
        }
        data.push(line);
    }

    textFont(myFont, 12);
    textAlign(LEFT, TOP);
    sx = textWidth("a"), sy = sx * 2;

    createCanvas(n*sx + margin, n*sy + margin);
    frameRate(10);
    noStroke();
}

function draw() {
    background("#fffbe6");

    let f0 = 10;
    if (frameCount > f0) {
        let i0 = max(n - 2 - frameCount + f0, -1);
        for (let i = n - 2; i > i0; i--) {
            for (let j = 0; j < n; j++) {
                let l = data[i][j];
                if (l != " " && random() < 2/3) {
                    if (data[i + 1][j] == " ") {
                        data[i][j] = " ";
                        data[i + 1][j] = l;
                    } else if (j > 0 && data[i + 1][j - 1] == " ") {
                        data[i][j] = " ";
                        data[i + 1][j - 1] = l;
                    } else if (j < n - 1 && data[i + 1][j + 1] == " ") {
                        data[i][j] = " ";
                        data[i + 1][j + 1] = l;
                    }
                }
            }
        }
    }

    let y = margin / 2;
    for (let line of data) {
        let x = margin / 2;
        for (let letter of line) {
            text(letter, x, y);
            x += sx;
        }
        y += sy;
    }
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN06.gif", 200, {delay: 0, units: "frames"});
    }
}