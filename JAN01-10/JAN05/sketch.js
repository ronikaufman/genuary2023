/*
Genuary 2023
JAN.5 "Debug view"
By Roni Kaufman
https://ronikaufman.github.io
*/

let myFont;
let methods;
let trace = [];
let indent, timestamp;

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
    methods = loadStrings("./JAN01-10/JAN05/methods.txt")
}

function setup() {
    createCanvas(600, 600);
    frameRate(5);
    noStroke();
    textSize(18);
    textFont(myFont);
    textAlign(LEFT, TOP);
    
    indent = 0;
    timestamp = ~~random(10000, 100000);
    for (let i = 0; i < 25; i++) {
        let c = generateCall();
        trace.push(c);
    }
}

function draw() {
    background("#050505");

    let y = 0;
    for (let c of trace) {
        let x = 0;
        let str = " [" + c.timestamp + "] ";
        fill("#14976b");
        text(str, x, y);
        x += textWidth(str);
        str = "  ".repeat(c.indent) + c.method;
        fill("#abcd5e");
        text(str, x, y);
        x += textWidth(str);
        fill("#fffbe6");
        text(" @sketch.js:" + c.line, x, y);
        
        y += 24;
    }

    trace.shift();
    let c = generateCall();
    trace.push(c);
}

function generateCall() {
    let c = {
        method: random(methods),
        indent: indent,
        timestamp: timestamp++,
        line: ~~random(1000)
    };
    let r = random();
    if (r < 1/3 && indent < 6) indent++;
    if (r > 2/3 && indent > 1) indent--;
    return c;
}

function keyPressed() {
    if (key === 's') {
        frameCount = 0;
        saveGif("JAN05.gif", 180, {delay: 0, units: "frames"});
    }
}