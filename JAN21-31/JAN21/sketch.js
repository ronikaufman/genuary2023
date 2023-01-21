/*
Genuary 2023
JAN.21 "Persian Rug"
By Roni Kaufman
https://ronikaufman.github.io
*/

let s = 8, n = 64, ratio = 1.5;

function setup() {
    createCanvas(n*s*ratio, n*s);
    noStroke();
    textSize(s*1.5);
    textAlign(CENTER, CENTER);
    textFont("monospace");
    
    noLoop();
}

function draw() {
    background("#050505");
    translate(s/8, 0);

    let colors = shuffle(["#14976b", "#2b67af", "#ef562f"]);
    let zs = shuffle([7, 9]);

    for (let i = 0; i < n; i++) {
        let x = s*i*ratio;
        for (let j = 0; j < n; j++) {
            let y = s*j;
            push();
            translate(x+ratio*s/2, y+s/2);
            rotate(PI/2);
            if (((i*j) - (j^i)) % 3 == 0) {
                fill("#b3dce0");
                text("█", 0, 0);
            }
            if ((i ^ j) % zs[0] == 0) {
                fill(colors[0]);
                text("▓", 0, 0);
            }
            
            if ((i ^ j) % zs[1] == 0) {
                fill(colors[1]);
                text("░", 0, 0);
            }
            pop();
        }
    }
}