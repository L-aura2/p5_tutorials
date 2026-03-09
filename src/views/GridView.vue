<script setup>
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { packman } from '../scripts/packman.js'

const sketchContainer = ref(null)
let p5Instance = null
let direction = "right"
const sketch = (p) => {

  const CELLSIZE = 30;
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
    packman(p);

  }
}

onMounted(() => {
  if (sketchContainer.value) {
    p5Instance = new p5(sketch, sketchContainer.value)
  }})
</script>

<template>
  <div class="exercise-container">
    <h2>Grid</h2>
    <div ref="sketchContainer" class="sketch-container"></div>
  </div>
</template>

<style scoped>
exercise-container {
  padding: 20px;
}

.sketch-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

}
</style>
