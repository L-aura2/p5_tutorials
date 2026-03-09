<script setup>
import { onMounted, ref } from 'vue'
import p5 from 'p5'

const pacmanContainer = ref(null)
const ghostsContainer = ref(null)
const gridContainer = ref(null)
let pacmanInstance = null
let ghostsInstance = null
let gridInstance = null
let direction = "right"

const pacmanSketch = (p) => {
  const packman = () => {
    p.noStroke();
    p.fill(255, 255, 0);
    let biteSize = p.PI / 16;
    let startAngle = biteSize * p.sin(p.frameCount * 0.1) + biteSize;
    let endAngle = p.TWO_PI - startAngle;
    if (direction === "down") {
      startAngle += p.HALF_PI;
      endAngle += p.HALF_PI;
    } else if (direction === "left") {
      startAngle += p.PI;
      endAngle += p.PI;
    } else if (direction === "up") {
      startAngle += 3 * p.HALF_PI;
      endAngle += 3 * p.HALF_PI;
    }
    p.arc(125, 125, 140, 140, startAngle, endAngle, p.PIE); // Smaller size

    p.fill(0);
    let x = 125;
    let y = 100;
    if (direction === "down" || direction === "up") {
      x = 100;
      y = 125;
    }
    p.arc(x, y, 20, 20, 0, p.PI + p.PI);

    if (p.keyIsPressed === true) {
      if (p.key === 'z') {
        direction = "up";
      } else if (p.key === 'q') {
        direction = "left"
      } else if (p.key === 's') {
        direction = "down"
      } else if (p.key === 'd') {
        direction = "right"
      }
    }
  }

  p.setup = function () {
    p.createCanvas(400, 300)
  }

  p.draw = function () {
    p.background(0)
    packman();
  }
}

const ghostsSketch = (p) => {
  const spook = (color = 'red', x = 0, y = 0, size = 1) => {
    p.push();
    p.translate(x, y);
    p.scale(size);
    p.noStroke();
    p.fill(color);
    p.circle(90, 50, 80);
    p.rect(50, 50, 80, 60);
    p.arc(65, 110, 30, 30, 0, p.PI);
    p.arc(90, 110, 30, 30, 0, p.PI);
    p.arc(115, 110, 30, 30, 0, p.PI);

    p.fill(255);
    p.circle(75, 50, 30);
    p.circle(105, 50, 30);

    let valueX = p.norm(p.mouseX, 0, 400);
    let valueY = p.norm(p.mouseY, 0, 300);

    let xE1 = p.constrain(p.map(valueX, 0, 1, 65, 85), 70, 80);
    let xE2 = p.constrain(p.map(valueX, 0, 1, 95, 115), 100, 110);
    let yE1 = p.constrain(p.map(valueY, 0, 1, 40, 65), 45, 55);
    let yE2 = p.constrain(p.map(valueY, 0, 1, 40, 65), 45, 55);

    p.fill(0);
    p.circle(xE1, yE1, 20);
    p.circle(xE2, yE2, 20);

    p.noFill();
    p.stroke(0);
    p.arc(90, 65, 30, 30, p.PI * 0.25 , p.PI * 0.75);
    p.pop();
  }

  p.setup = function () {
    p.createCanvas(400, 300)
  }

  p.draw = function () {
    p.background(0)
    spook();
    spook('green', 100, 0, 0.8);
    spook('pink', 200, 0, 0.9);
    spook('purple', 0, 120, 0.9);
  }
}

const gridSketch = (p) => {

  const CELLSIZE = 14;
  const ROWS = 21;
  const COLS = 21;
  const WIDTH = CELLSIZE * COLS;
  const HEIGHT = CELLSIZE * ROWS;
  // 0 = dot, 1 = wall, 2 = energize, 3 = empty
  const MAP_TEMPLATE = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,2,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,2,1],
    [1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,3,1,1,1,3,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,3,3,3,3,3,3,3,3,3,1,0,1,1,1,1],
    [1,1,1,1,0,1,3,1,1,3,3,3,1,1,3,1,0,1,1,1,1],
    [3,3,3,3,0,3,3,1,3,3,3,3,3,1,3,3,0,3,3,3,3],
    [1,1,1,1,0,1,3,1,1,1,1,1,1,1,3,1,0,1,1,1,1],
    [1,1,1,1,0,1,3,3,3,3,3,3,3,3,3,1,0,1,1,1,1],
    [1,1,1,1,0,1,3,1,1,1,1,1,1,1,3,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1],
    [1,2,0,1,0,0,0,0,0,0,3,0,0,0,0,0,0,1,0,2,1],
    [1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]

  const genGrid = () => {
    p.noStroke();
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cellValue = MAP_TEMPLATE[row][col];
        const x = col * CELLSIZE;
        const y = row * CELLSIZE;
        if (cellValue === 1) {
          p.fill(0, 0, 255); // Blue walls
          p.square(x, y, CELLSIZE);
        } else if (cellValue === 0) {
          p.fill(255); // White dots
          p.circle(x + CELLSIZE / 2, y + CELLSIZE / 2, 5);
        } else if (cellValue === 2) {
          p.fill(255, 0, 255); // Magenta energizers
          p.circle(x + CELLSIZE / 2, y + CELLSIZE / 2, 10);
        }
      }
    }

  }


  p.setup = function () {
    p.createCanvas(WIDTH, HEIGHT)
  }

  p.draw = function () {
    p.background(0)
    genGrid();
  }
}

onMounted(() => {
  if (pacmanContainer.value) {
    pacmanInstance = new p5(pacmanSketch, pacmanContainer.value)
  }
  if (ghostsContainer.value) {
    ghostsInstance = new p5(ghostsSketch, ghostsContainer.value)
  }
  if (gridContainer.value) {
    gridInstance = new p5(gridSketch, gridContainer.value)
  }
})
</script>

<template>
  <div class="demo-container">
    <h2>Pacman Demo</h2>
    <div class="canvases">
      <div>
        <h3>Pacman</h3>
        <div ref="pacmanContainer" class="sketch-container"></div>
      </div>
      <div>
        <h3>Ghosts</h3>
        <div ref="ghostsContainer" class="sketch-container"></div>
      </div>
      <div>
        <h3>Grid</h3>
        <div ref="gridContainer" class="sketch-container"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  padding: 20px;
}

.canvases {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.sketch-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
