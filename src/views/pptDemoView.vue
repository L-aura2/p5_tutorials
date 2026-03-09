<script setup>
import { onMounted, ref } from 'vue'
import p5 from 'p5'

const sketchContainer = ref(null)
let p5Instance = null

const sketch = (p) => {
  p.setup = function () {
    p.createCanvas(800, 600)
  }
  p.draw = function () {
    p.background(220)
    p.fill(255, 0, 0, 100); // Semi-transparent red
    p.rect(50, 50, 200, 150);
    p.line(300, 50, 500, 200);
    p.point(600, 100);
    p.ellipse(100, 300, 100, 50);
    p.triangle(400, 300, 450, 350, 350, 350);
    p.text('text', 500, 300);
  }

}

onMounted(() => {
  if (sketchContainer.value) {
    p5Instance = new p5(sketch, sketchContainer.value)
  }
})
</script>

<template>
  <div class="exercise-container">
    <h2>ppt Demo</h2>
    <div ref="sketchContainer" class="sketch-container"></div>
  </div>
</template>

<style scoped>
.exercise-container {
  padding: 20px;
}

.sketch-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

}
</style>
