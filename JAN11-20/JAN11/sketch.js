/*
Genuary 2023
JAN.11 "Suprematism"
By Roni Kaufman
https://ronikaufman.github.io
*/

let m = 64, n = 32, sx, sy;

function setup() {
    textSize(24);
    textAlign(LEFT, TOP);
    textFont("monospace")
    sx = textWidth("█")*0.626, sy = sx*1.7;

    createCanvas(sx*m, sy*n);
    noLoop();
    noStroke();
}

function draw() {
    background("#fffbe6");
    fill("#050505");

    for (let x = 0; x < width; x += sx) {
        for (let y = 0; y < height; y += sy) {
            let c, offset = 0;
            let theta = atan2(y-height/3, x-width/2)+4*PI/3;
            if (theta > TAU - PI/6 || theta < PI/2) {
                c = "▓";
                if (random() < 1/6) {
                    c = "█";
                }
            } else if (theta < 7*PI/6) {
                c = "▒";
            } else {
                c = "░";
                if (random() < 1/6) {
                    c = "█";
                }
            }

            theta = atan2(y-2*height/3, x-width/2)+PI/3;
            if (theta > PI/2 && theta < 7*PI/6) c = "▒";

            let d = max(abs(x-width/2), abs(y-height/3));
            if (d < 8*sx) c = " ";
            if (d < 5*sx) c = "█";

            if (abs(x - 42*sx) < sx/10 && abs(y - 24*sy) < sy/10) {
                c = "🪑";
                offset = -sx/4;
            }
            text(c, x+offset+random([-1, 1])*0.2, y+sy*0.75+random([-1, 1])*0.2);
        }
    }
}