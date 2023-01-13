/*
Genuary 2023
JAN.13 "Something you’ve always wanted to learn"
By Roni Kaufman
https://ronikaufman.github.io
*/

// Aldous-Broder algorithm

let n = 16, k = 2*n+1, s;
let fontSize;
let cells = [], walls = [], cellPositions = [];
let nVisited = 0, current;

function setup() {
    createCanvas(500, 500);
    noStroke();
    
    textAlign(TOP, LEFT);
    textFont("monospace");
    s = width/(k+4);
    fontSize = 1;
    while (textWidth("┼") < s) {
        fontSize += 0.5;
        textSize(fontSize);
    }

    for (let i = 0; i < n; i++) {
        let line = [];
        for (let j = 0; j < n; j++) {
            line.push(new Cell(2*i+1, 2*j+1));
            cellPositions.push([2*i+1, 2*j+1]);
        }
        cells.push(line);
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i > 0) cells[i][j].neighbors.push(cells[i-1][j]);
            if (j > 0) cells[i][j].neighbors.push(cells[i][j-1]);
            if (i < n-1) cells[i][j].neighbors.push(cells[i+1][j]);
            if (j < n-1) cells[i][j].neighbors.push(cells[i][j+1]);
        }
    }

    current = random(random(cells));
    current.visited = true;

    for (let i = 0; i < k; i++) {
        let line = [];
        for (let j = 0; j < k; j++) {
            let putWall = (i % 2 == 0) || (j % 2 == 0);
            line.push(putWall);
        }
        walls.push(line);
    }
    walls[0][1] = false;
    walls[k-1][k-2] = false;
}

function draw() {
    drawWalls();

    let randNeighbor = random(current.neighbors);
    if (!randNeighbor.visited) {
        randNeighbor.visited = true;
        nVisited++;
        walls[(current.i+randNeighbor.i)/2][(current.j+randNeighbor.j)/2] = false;
    }
    current = randNeighbor;

    if (nVisited == n*n-1) {
        shuffle(cellPositions, true);
        let emojis = ["👻", "🦎", "🐝", "🗺️", "🐁", "👑", "🐉", "🦉", "💎", "⚔️", "🕷️", "🧚", "🦇", "🗝️", "☠️", "🧟", "🦋", "🐍", "🦚", "🍀", "🌈", "🍎", "🎲", "🧭", "💰", "🕯️", "🛡️", "🎁", "🔍", "❤️", "🚾", "🃏"];
        for (let i = 0; i < emojis.length; i++) {
            textAlign(CENTER, CENTER);
            textSize(fontSize*3/4);
            let x = (cellPositions[i][0]+2.5)*s, y = (cellPositions[i][1]+2.5)*s;
            text(emojis[i], x, y);
        }
        
        noLoop();
    }
}

function Cell(i, j) {
    this.i = j;
    this.j = i;
    this.visited = false;
    this.neighbors = [];
}

function drawWalls() {
    background("#2b67af");
    fill("#fffbe6");

    for (let i = 0; i < k; i++) {
        for (let j = 0; j < k; j++) {
            if (walls[i][j]) {
                let c;
                let west = (i > 0) && (walls[i-1][j]);
                let east = (i < k-1) && (walls[i+1][j]);
                let north = (j > 0) && (walls[i][j-1]);
                let south = (j < k-1) && (walls[i][j+1]);
                if (west && east && north && south) c = "┼";
                if (!west && east && north && south) c = "├";
                if (west && !east && north && south) c = "┤";
                if (west && east && !north && south) c = "┬";
                if (west && east && north && !south) c = "┴";
                if (!west && !east && north && south) c = "│";
                if (!west && east && !north && south) c = "┌";
                if (!west && east && north && !south) c = "└";
                if (west && !east && !north && south) c = "┐";
                if (west && !east && north && !south) c = "┘";
                if (west && east && !north && !south) c = "─";
                if (!west && !east && !north && south) c = "╷";
                if (!west && !east && north && !south) c = "╵";
                if (!west && east && !north && !south) c = "╶";
                if (west && !east && !north && !south) c = "╴";
                text(c, (i+2)*s, (j+3)*s);
            }
        }
    }
}