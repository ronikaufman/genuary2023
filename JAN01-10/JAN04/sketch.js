/*
Genuary 2023
JAN.4 "Intersections"
By Roni Kaufman
https://ronikaufman.github.io
*/

let myFont;

function preload() {
    myFont = loadFont("./fonts/VictorMono-SemiBold.ttf");
}

function setup() {
    createCanvas(500, 1000);
    noStroke();
    textFont(myFont);
    textSize(24);
    noLoop();
}

function draw() {
    background("#050505");
    background("#fffbe6")

    let artAdjs = shuffle(["poetical", "creative", "audiovisual", "aesthetic", "interactive", "plastic", "abstract", "baroque", "dada", "postmodern"]);
    let artFields = shuffle(["design", "writing", "photography", "art", "paint", "sketching", "animation", "illustration", "music", "typography"]);
    let techAdjs = shuffle(["computational", "algorithmic", "digital", "binary", "cyber", "internet", "generative", "neural", "software", "electrical"]);
    let techFields = shuffle(["coding", "technology", "science", "AI", "compiler", "machine", "networking", "data", "CPU", "development"]);
    // all these arrays 👆 must have the same length
    let n = artAdjs.length;

    let adjectives = [];
    let fields = [];
    for (let i = 0; i < n; i++) {
        adjectives.push(artAdjs[i], techAdjs[i]);
        fields.push(techFields[i], artFields[i]);
    }
    
    let cols = ["#2b67af", "#ef562f"];

    let wGap = textWidth(" ");
    let hGap = wGap*3.6;
    let y = height/2 - (n-1/2)*hGap - 5;
    for (let i = 0; i < 2*n; i++) {
        fill(cols[i%2]);
        textAlign(RIGHT, CENTER);
        text(adjectives[i], width/2 - wGap/2, y);
    
        fill(cols[1 - i%2]);
        textAlign(LEFT, CENTER);
        text(fields[i], width/2 + wGap/2, y);

        y += hGap;
    }
}