/*
Genuary 2023
JAN.29 "Maximalism"
By Roni Kaufman
https://ronikaufman.github.io
*/

const N_FRAMES = 200;
let s = 16, n = 32, ratio = 1.25;
let charset = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMéèÉÈýÝúùÚÙíìÍÌóòÓÒáàÁÀêëÊËÿûÛüÜîÎïÏôÔöÖâÂäÄõÕãÃ1234567890";
let palette = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
}

function setup() {
    createCanvas(n*s, n*s*ratio);
    noStroke();
    textSize(s*1.25);
    textAlign(LEFT, TOP);
    textFont(myFont);
    frameRate(10);
    
    charset = shuffle(charset.split(""));
}

function draw() {
    background("#050505");
    let t = TAU*(frameCount%N_FRAMES)/N_FRAMES;

    for (let x = 0; x < width; x += s) {
        for (let y = 0; y < height; y += s*ratio) {
            let noice = loopNoise(x+s/2, y+s/2, t);

            let colIdx = ~~(5*palette.length*noice)%palette.length;
            fill(palette[colIdx]);

            let charIdx = ~~(charset.length*noice);
            text(charset[charIdx], x, y);
        }
    }
}

function loopNoise(x, y, theta) {
    let offset = 1000, sc = 1/750; //sc = scale

    return noise(
        offset + ((x+offset)*sc)*cos(theta),
        offset + ((x+offset)*sc/ratio)*sin(theta),
        y*sc
    );
}

function keyPressed() {
    if (key === 's') {
        saveGif("JAN29.gif", N_FRAMES, {delay: 0, units: "frames"});
    }
}