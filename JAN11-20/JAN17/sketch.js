/*
Genuary 2023
JAN.17 "A grid inside a grid inside a grid"
By Roni Kaufman
https://ronikaufman.github.io
*/

let s = 20, probFactor;

function setup() {
    createCanvas(33*s, 33*s);
    noStroke();
    textSize(s*0.7);
    textAlign(CENTER, CENTER);
    noLoop();
    probFactor = random(1/2, 3/4);
}

function draw() {
    background("#050505");
    makeCompo(s, s, width-2*s, height-2*s, 4, 1);
}

function makeCompo(x, y, w, h, n, prob) {
    if (n == 0 || random() > prob) {
        let c = random(["🟦", "🟥", "🟨", "⬜"]);
        for (let x1 = x; x1 < x+w; x1 += s) {
            for (let y1 = y; y1 < y+h; y1 += s) {
                push();
                translate(x1+s/2, y1+s/2);
                rotate(random(TAU));
                text(c, 0, 0);
                pop();
            }
        }
        return;
    }
    let wHalf = (w-s)/2, hHalf = (h-s)/2, newProb = prob*probFactor;
    makeCompo(x, y, wHalf, hHalf, n-1, newProb);
    makeCompo(x+wHalf+s, y, wHalf, hHalf, n-1, newProb);
    makeCompo(x, y+hHalf+s, wHalf, hHalf, n-1, newProb);
    makeCompo(x+wHalf+s, y+hHalf+s, wHalf, hHalf, n-1, newProb);
}