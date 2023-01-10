/*
Genuary 2023
JAN.10 "Generative music"
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(400, 600);
    noLoop();
    noStroke();
    textSize(20);
    textAlign(LEFT, TOP);
}

function draw() {
    background("#fffbe6");

    let sx = 20, sy = sx*3/4;
    let y = sy*2.33;

    while (y < height-2*sy) {
        let x = sx;
        while (x < width-sx) {
            let noteIdx = ~~(noise(x/20, y)*7)-1;
            for (let i = 0; i < 5; i++) {
                let offset = 0;
                fill("#050505");
                let c = "—";
                if (i == noteIdx) {
                    fill(random(["#abcd5e", "#29ac9f", "#14976b", "#b3dce0", "#62b6de", "#2b67af", "#f589a3", "#ef562f", "#fc8405", "#f9d531"]));
                    if (random() < 1/2) {
                        c = "♬";
                        offset = sx/16;
                    } else {
                        c = "♪";
                        offset = sx/4;
                    }
                }
                text(c, x+offset, y+i*sy);
            }
            x += sx;
        }
        y += 6*sy;
    }
}