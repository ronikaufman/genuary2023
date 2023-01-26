/*
Genuary 2023
JAN.26 "My kid could have made that"
By Roni Kaufman
https://ronikaufman.github.io
*/

let particles = [];
let n = 100;
let colors;
let squiggliness = 1/200;

function setup() {
    createCanvas(594, 841);
    noStroke();
    colors = ["#abcd5e", "#29ac9f", "#14976b", "#b3dce0", "#62b6de", "#2b67af", "#f589a3", "#ef562f", "#fc8405", "#f9d531"];
    background("#fffbe6");
    createParticles();
}

function draw() {
    for (let p of particles) {
        p.draw();
        p.move();
    }

    if (frameCount > 1000) noLoop();
}

function createParticles() {
    particles = [];
    for (let i = 0; i < n; i++) {
        let x = random(width);
        let y = random(height);
        let s = random(5, 15);
        let c = random(colors);
        particles.push(new Particle(x, y, s, c));
    }
}

function Particle(x, y, size, col) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;
  
    this.move = function() {
        let theta = noise(this.x * squiggliness, this.y * squiggliness, frameCount/100)*PI*frameCount/100;
        let v = p5.Vector.fromAngle(theta);
        this.x += v.x;
        this.y += v.y;
		if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
		    this.x = random(width);
		    this.y = random(height);
		}
    }
  
    this.draw = function() {
        fill(this.col+"dd");
        textSize(this.size);
        text("░", this.x, this.y);
    }
}
   