/*
Genuary 2023
JAN.18 "A grid inside a grid inside a grid"
By Roni Kaufman
https://ronikaufman.github.io
*/

const N_FRAMES = 120;
let s = 24, n = 16, margin = 4;
let startTiles, endTiles;

function setup() {
    createCanvas((n+2*margin)*s, (n+2*margin)*s);
    noStroke();
    textSize(s*0.8);
    textAlign(CENTER, CENTER);

    initTiles();
}

function draw() {
    background("#fffbe6");

    let t = (frameCount%N_FRAMES)/N_FRAMES;
    t = easeInOutQuart(t);

    if (t == 0) {
        [endTiles, startTiles] = [startTiles, endTiles];
    }

    for (let i = 0; i < sq(n); i++) {
        let a = startTiles[i];
        let b = endTiles[i];
        let x = lerp(a.x, b.x, t);
        let y = lerp(a.y, b.y, t);
        let rot = lerp(a.rot, b.rot, t);
        let c = a.char;

        push();
        translate(x, y);
        rotate(rot);
        text(c, 0, 0);
        pop();
    }
}

function initTiles() {
    startTiles = [];
    endTiles = [];
    for (let i = 0; i < n; i++) {
        let x = (margin+i+1/2)*s;
        for (let j = 0; j < n; j++) {
            let y = (margin+j+1/2)*s;
            let c = random(["🟦", "🟥", "🟨", "⬜"]);
            let xOffset = random(-1, 1)*(margin-1/2)*s;
            let yOffset = random(-1, 1)*(margin-1/2)*s;
            let rot = random(-PI, PI);

            startTiles.push({
                x: x - xOffset,
                y: y - yOffset,
                rot: -rot,
                char: c
            });

            endTiles.push({
                x: x + xOffset,
                y: y + yOffset,
                rot: rot,
                char: c
            });
        }
    }
}

// source: https://easings.net
function easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

function keyPressed() {
    if (key === 's') {
        initTiles();
        saveGif("JAN18.gif", 2*N_FRAMES, {delay: 0, units: "frames"});
    }
}