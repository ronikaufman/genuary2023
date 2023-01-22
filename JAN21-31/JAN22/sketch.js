/*
Genuary 2023
JAN.23 "Shadows"
By Roni Kaufman
https://ronikaufman.github.io
*/

let s = 16, n = 48;
const N_FRAMES = 300;
let palette = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];

function setup() {
    createCanvas(n*s, n*s);
    noStroke();
    textSize(s*1.6);
    textAlign(CENTER, CENTER);
    textFont("monospace");
}

function draw() {
    background("#050505");

    translate(width/2, height/2);

    let t = TAU*(frameCount%N_FRAMES)/N_FRAMES;
    let range = 320;
    let bulb = [range*cos(t), range*sin(t)];
    let r = 120 + sin(2*t)*60;

    for (let i = -n/2; i < n/2; i++) {
        let x = s*(i+1/2);
        for (let j = -n/2; j < n/2; j++) {
            let y = s*(j+1/2);
            let distToCenter = mag(x, y);
            let distToBulb = dist(x, y, bulb[0], bulb[1]);
            let intersects = circleLineIntersection(x, y, bulb[0], bulb[1], r);
            if (distToCenter < r) {
                let col = ~~(map(atan2(y, x) + 3*t, -PI, PI, 0, palette.length) + 4*distToCenter/r)%palette.length;
                fill(palette[col]);
            } else if ((intersects && distToBulb < range) || (!intersects)) {
                fill("#fffbe6");
            } else {
                noFill();
            }
            text("●", x, y);
        }
    }
}

// detect if the line going through (x1, y1) and (x2, y2) intersects with the circle centered at (0, 0) and of radius r
// returns true if intersects or is tangent, false otherwise
// adapted from https://mathworld.wolfram.com/Circle-LineIntersection.html
function circleLineIntersection(x1, y1, x2, y2, r) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let dr = sqrt(sq(dx) + sq(dy));
    let D = x1*y2 - x2*y1;

    let discriminant = sq(r)*sq(dr) - sq(D);
    return discriminant >= 0;
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN22.gif", N_FRAMES, {delay: 0, units: "frames"});
    }
}