/*
Genuary 2023
JAN.9 "Plants"
By Roni Kaufman
https://ronikaufman.github.io
*/

let myFont;

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
}

function setup() {
    createCanvas(600, 600);
    noLoop();
    angleMode(DEGREES);
    noStroke();
    textFont(myFont);
    textAlign(CENTER, CENTER);
}

function draw() {
    background("#fffbe6");
    let margin = 50;
  
    let inter = 15;
    let circles = [];
    for (let i = 0; i < 5000; i++) {
      let r = 50;
      let x = random(margin+r, width-margin-r);
      let y = random(margin+r, height-margin-r);
      let newCircle = {
        center: createVector(x, y),
        r: r
      };
      let canAdd = true;
      for (let c of circles) {
        if (c.center.dist(newCircle.center) < c.r + newCircle.r + inter) {
          canAdd = false;
          break;
        }
      }
      if (canAdd) {
        let canGrow;
        do {
          newCircle.r++;
          canGrow = true;
          for (let c of circles) {
            if (c.center.dist(newCircle.center) < c.r + newCircle.r + inter) {
              canGrow = false;
              break;
            }
          }
          if (x - newCircle.r < margin || x + newCircle.r > width - margin || y - newCircle.r < margin || y + newCircle.r > height - margin) {
            canGrow = false;
          }
          if (newCircle.r > 75) {
            canGrow = false;
          }
        } while (canGrow)
        circles.push(newCircle);
      }
    }
  
    circles.sort((e1, e2) => (e1.center.y - e2.center.y));
    for (let c of circles) {
      fill("#14976b");
      for (let y = c.center.y; y < height; y += 10) {
        push();
        translate(c.center.x, y);
        rotate(random(-6, 6));
        textSize(32);
        text("|", 0, 0);
        if (random() < 0.2) {
          let a = random([-1, 1]);
          rotate(a*random(150, 160));
          text("|", a*4, 0);
        }
        pop();
      }
      sunflower(c.center.x, c.center.y, 2*c.r);
    }
}
  
function sunflower(x0, y0, d) {
    fill(random(["#ef562f", "#fc8405", "#f9d531"]));
    for (let theta = 0; theta < 360; theta += 360/42) {
      let r = d/4;
      let x = x0 + r*cos(theta);
      let y = y0 + r*sin(theta);
      push();
      translate(x + random(-d/60, d/60), y + random(-d/60, d/60));
      rotate(theta + random(-3, 3) + 90);
      textSize(d*3/4);
      text("|", 0, 0);
      pop();
    }
  
    fill("#050505");
    rect(x0, y0, d/10);
    let c = d/60;
    for (let i = 0; i < 100; i++) {
      let theta = i * 137.5;
      let r = c * sqrt(i);
      let x = x0 + r*cos(theta);
      let y = y0 + r*sin(theta);
      push();
      translate(x, y);
      rotate(theta + 90);
      textSize(d/4);
      text("|", 0, 0);
      pop();
    }
}