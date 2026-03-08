<script setup>
import { onMounted, ref } from 'vue'
import p5 from 'p5'

const sketchContainer = ref(null)
let p5Instance = null
let direction = "right"
const sketch = (p) => {
  p.setup = function () {
    p.createCanvas(800, 600)
  }

  p.draw = function () {
    p.background(0)
    p.fill(255);
    p.arc(50, 50, 80, 80, 0, p.PI + p.HALF_PI);
    p.arc(50, 150, 80, 80, 0, p.PI + p.HALF_PI, p.PIE);
    p.arc(150, 50, 80, 80, 0, p.PI + p.QUARTER_PI);
    p.arc(250, 50, 80, 80, 0, p.PI + p.TWO_PI);
    p.arc(350, 50, 80, 80, 0, p.PI + p.QUARTER_PI, p.OPEN);
    p.arc(450, 50, 80, 80, 0, p.PI + p.HALF_PI, p.OPEN);
    p.arc(450, 150, 80, 80, 0, p.PI + p.HALF_PI, p.CHORD);
    p.arc(550, 55, 80, 80, p.HALF_PI, p.PI);
    p.arc(550, 55, 80, 80, 250,  p.QUARTER_PI, p.PI);




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
    p.arc(250, 250, 280, 280, startAngle, endAngle, p.PIE);

    p.fill(0);
    let x = 250;
    let y = 200;
    if (direction === "down" || direction === "up") {
      x = 200;
      y = 250;
    }
    p.arc(x, y, 40, 40, 0, p.PI + p.PI);


    //p.textAlign(CENTER);
    p.textSize(16);
    p.text(direction, 500, 500);

    if (p.keyIsPressed === true) {
      if (p.key === 'z') {
        direction = "up";
      } else if (p.key === 'q') {
        direction = "left"
      }
      else if (p.key === 's') {
        direction = "down"
      }
      else if (p.key === 'd') {
        direction = "right"
      }

  }
}}

onMounted(() => {
  if (sketchContainer.value) {
    p5Instance = new p5(sketch, sketchContainer.value)
  }})
</script>

<template>
  <div class="exercise-container">
    <h2>Packman</h2>
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
