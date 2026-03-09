<script setup>
import { onMounted, ref } from 'vue'
import p5 from 'p5'

const sketchContainer = ref(null)
let p5Instance = null


onMounted(() => {
  if (sketchContainer.value) {
    p5Instance = new p5(sketch, sketchContainer.value)
  }})
</script>

<template>
  <div class="exercise-container">
    <h2>Pacman</h2>
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
