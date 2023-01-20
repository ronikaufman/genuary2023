/*
Genuary 2023
JAN.20 "Art Deco"
By Roni Kaufman
https://ronikaufman.github.io
*/

let s, n;

const variables = ["A", "B"];
const constants = ["F", "+", "−"];
const axioms = "A";
const rules = ["+BF−AFA−FB+", "−AF+BFB+FA−"];
const angle = Math.PI/2;

function setup() {
    createCanvas(600, 600);
    n = random([3, 4, 5])
    s = width/(2**n+2);
    textAlign(LEFT, TOP);
    textFont("monospace");
    textSize(s);
    noLoop();
    noStroke();
}

function draw() {
    background("#050505");
    fill("#f9d531");
    let str = rewrite(n, axioms);
    translate(3*s/2, 3*s/2);
    turtle(str, s);
}
  
// start: starting string
// n: number of rewrites
function rewrite(n, start) {
    let str = start;
    while (n-- > 0) {
        let i = 0;
        while (i < str.length) {
            let v = variables.indexOf(str[i]);
            if (v !== -1) {
                let r = rules[v];
                str = str.slice(0, i) + r + str.slice(i+1);
                i += r.length;
            } else {
                // it's a constant
                i++;
            }
        }
    }
    return str;
    }

// str: instruction
// s: how much "move forward" is
function turtle(str, s) {
    for (let i of str.split("")) {
        switch (i) {
            case "F":
            text("▔", 0, 0);
            text("▔", 0, -s/3);
            text("▔", 0, s/3);
            translate(s, 0);
            break;
        case "+":
            rotate(angle);
            break;
        case "−":
            rotate(-angle);
            break;
        }
    }
}