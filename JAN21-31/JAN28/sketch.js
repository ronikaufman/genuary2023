/*
Genuary 2023
JAN.28 "Generative poetry"
By Roni Kaufman
https://ronikaufman.github.io
*/

const api_key = "put_your_key_here";
let words = [], permutations = [];

function preload() {
    myFont = loadFont("./fonts/VictorMono-Medium.ttf");
}

function setup() {
    createCanvas(594, 841);
    noStroke();
    textSize(16);
    textFont(myFont);
    textAlign(CENTER, TOP);

    let types = ["noun", "verb", "adjective", "adverb"];
    for (let t of types) {
        let url = "https://api.api-ninjas.com/v1/randomword?type=" + t;
        fetch(url, {
            method: "GET",
            headers: {"X-Api-Key": api_key}
        }).then(response => {
            return response.json();
        }).then(response => {
            words.push(response.word);
        });
    }
}

function draw() {
    if (words.length == 4) {
        heap_algo(words, words.length);
        //shuffle(permutations, true);

        let poem = [];
        for (let i = 0; i < permutations.length; i++) {
            let perm = permutations[i];
            let line = "";
            for (let j = 0; j < perm.length; j++) {
                let word = perm[j];
                if (j == 0) word = word[0].toUpperCase() + word.substr(1);
                line += word;
                if (j < perm.length-1) line += " ";
            }
            if (i % 6 == 5) line += ".";
            else line += ",";
            poem.push(line);
            if (i % 6 == 5) poem.push("");
        }

        background("#fffbe6");
        fill("#050505");

        let sx = textWidth("a");
        let sy = sx*2.25;

        let y = (height-poem.length*sy)/2;
        for (let line of poem) {
            text(line, width/2, y);
            y += sy;
        }

        noLoop();
    }
}

function heap_algo(arr, n) {
    if (n == 1) {
        permutations.push(arr);
        return;
    }
    heap_algo(arr, n-1);
    for (let i = 0; i < n-1; i++) {
        heap_algo(swap(arr, i, n-1), n-1);
    }
}

function swap(arr, i, j) {
    let copy = [...arr];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    return copy;
}