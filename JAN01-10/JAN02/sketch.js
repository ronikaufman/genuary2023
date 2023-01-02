/*
Genuary 2023
JAN.2 "Made in 10 minutes"
By Roni Kaufman
https://ronikaufman.github.io
*/

let myFont;

let margin = 75;
let r = 150;
let palette = ["#abcd5e", "#29ac9f", "#14976b", "#b3dce0", "#62b6de", "#2b67af", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
}

function setup() {
    createCanvas(500, 500);
    noStroke();
    textFont(myFont);
    textSize(r);
    textAlign(CENTER, CENTER);
    shuffle(palette, true);
}

function draw() {
    background("#fffbe6");
    
    let circles = [];
    for (let i = 0; i < 100; i++) {
        let newC = generateCircle();
        if (canAdd(newC, circles)) {
            drawCircle(newC, circles.length);
            circles.push(newC);
        }
        if (circles.length == 10) {
            noLoop();
        }
    }

    r--;
}

function generateCircle() {
    let x = random(margin, width-margin);
    let y = random(margin, height-margin);
    let pos = createVector(x, y);
    let newCircle = {
      r: r,
      pos: pos
    };
    return newCircle;
  }
  
  function canAdd(newC, circles) {
    for (let c of circles) {
      if (c.pos.dist(newC.pos) < c.r + newC.r) {
        return false;
      }
    }
    return true;
  }
  
  function drawCircle(c, i) {
    push();
    fill(palette[i]);
    translate(c.pos.x, c.pos.y);
    rotate(random(TAU));
    text(str(i), 0, 0);
    pop();
  }