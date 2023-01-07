/*
Genuary 2023
JAN.7 "Sample a color palette from your favorite movie/album cover"
By Roni Kaufman
https://ronikaufman.github.io
*/

let mediumFont, semiboldFont;
let poem, m, n, sx, sy, margin = 5;

function preload() {
    mediumFont = loadFont("./fonts/VictorMono-Medium.ttf");
    semiboldFont = loadFont("./fonts/VictorMono-Bold.ttf");
    poem = loadStrings("./JAN01-10/JAN07/poem.txt");
}

function setup() {
    textSize(32);
    textFont(mediumFont);
    textAlign(LEFT, TOP);

    m = 0;
    for (let line of poem) {
        let l = line.length;
        if (l > m) m = l;
    }
    m += 4;
    n = poem.length*2+3;
    sx = textWidth("a"), sy = sx * 2.6;

    createCanvas(sx*m + margin, sy*n + margin);
    noStroke();
    noLoop();
}

function draw() {
    background("#fffbe6");

    fill("#62b6de");
    let y = margin/2+2;
    for (let j = 0; j < n; j++) {
        let x = margin/2;
        for (let i = 0; i < m; i++) {
            let line = poem[lineIndex(j)];
            if (checkIfBackground(i, j, line)) {
                let c = random(["╱", "╲"]);
                text(c, x, y);
            }
            x += sx;
        }
        y += sy;
    }

    filter(BLUR, 2);

    textFont(semiboldFont);
    y = margin/2+2;
    for (let j = 0; j < n; j++) {
        let x = margin/2;
        for (let i = 0; i < m; i++) {
            let line = poem[lineIndex(j)];
            if (lineIndex(j) == 2) {
                fill("#fc8405");
            } else {
                fill("#62b6de");
            }
            if (!checkIfBackground(i, j, line)) {
                let c = line[i-2];
                text(c, x, y);
            }
            x += sx;
        }
        y += sy;
    }
}

function lineIndex(j) {
    return floor((j-1)/2);
}

function checkIfBackground(i, j, line) {
    return (i < 2 || i > m-3 || j < 2 || j > n-3 || j % 2 == 1 || i > line.length+1);
}