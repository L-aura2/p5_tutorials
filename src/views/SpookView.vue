<script setup>
import { onMounted, ref } from 'vue'
import p5 from 'p5'

const sketchContainer = ref(null)
let p5Instance = null
let direction = "right"
const sketch = (p) => {
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

    let valueX = p.norm(p.mouseX, 400, 800);
    let valueY = p.norm(p.mouseY, 300, 600);

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
    p.createCanvas(800, 600);
  }

  p.draw = function () {
    p.background(0);
    spook();
    spook('green', 150, 150, 0.8);
    spook('pink', 250, 30, 1.2);
    spook('purple', 400, 200);
  }
}

onMounted(() => {
  if (sketchContainer.value) {
    p5Instance = new p5(sketch, sketchContainer.value)
  }})
</script>

<template>
  <div class="exercise-container">
    <h2>Spook</h2>
    <p>BOEEEHHHHH</p>
    <div ref="sketchContainer" class="sketch-container"></div>
  </div>
</template>

<style scoped>
exercise-container {
  padding: 20px;
}

.sketch-container {
  display: flex;
  //justify-content: center;
  align-items: center;
  margin-top: 20px;

}
</style>
