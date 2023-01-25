/*
Genuary 2023
JAN.25 "Yayoi Kusama"
By Roni Kaufman
https://ronikaufman.github.io
*/

let s = 50, m = 12, n = 16;

function setup() {
  if (random() < 1/2) {
    s *= 2;
    m /= 2;
    n /= 2;
  }

  createCanvas(m*s, n*s);
  noLoop();
}

function draw() {
  let palette1 = shuffle(["#fffbe6", "#050505"]);
  let palette2 = shuffle(["#ef562f", "#f9d531"]);
  let i = random([0, 1]), flipBackground = random() < 1/2, flipColors = !flipBackground && random() < 1/2;
    
  for (let x = 0; x < width; x += s) {
    for (let y = 0; y < height; y += s) {
      let col1 = palette1[i%2], col2 = palette2[0];
      if (flipBackground) col1 = palette1[0], col2 = palette2[0];
      if (flipColors || (flipBackground && i % 2 == 0)) [col1, col2] = [col2, col1];
      let tile = generateTile(random([4, 6, 8, 10, 12]), col1, col2);
      image(tile, x, y);
      i++;
    }
    i++;
  }
}

function generateTile(r, backCol, dotCol) {
  let grph = createGraphics(s, s);
  grph.background(backCol);
  grph.noStroke();
  grph.fill(dotCol);
  grph.textFont("monospace");
  grph.textAlign(CENTER, CENTER);

  let circles = [];
  for (let i = 0; i < 5000; i++) {
    let newC = generateCircle(r*random(3/4, 5/4));
    if (canAdd(newC, circles)) {
      grph.textSize(3*newC.r);
      grph.text("●", newC.pos.x, newC.pos.y);
      circles.push(newC);
    }
  }

  return grph;
}

function generateCircle(r) {
  let x = random(0, s);
  let y = random(0, s);
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