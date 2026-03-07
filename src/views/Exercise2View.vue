<script setup>
import { onMounted, ref } from 'vue'
import p5 from 'p5'

const sketchContainer = ref(null)
let p5Instance = null

const sketch = (p) => {
  p.setup = function() {
    p.createCanvas(800, 600)
  }

  p.draw = function() {
    p.background(220)


    p.line(p.mouseX, 0, p.mouseX, 100)

    p.stroke(255, 0, 0) // Red color
    p.fill(255, 0, 0, 100) // Semi-transparent red
    p.text('Hello, p5.js!', 50, 50)
    p.square(300, 200, 100)
    //p.circle(150, 300, 100)
    p.fill(0, 255, 0, 100) // Semi-transparent green
    p.text('text', 200, 200)
    p.stroke(0, 0, 0, 0)
    p.circle(250, 300, 100)


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
    <h2>Exercise 2</h2>
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
