<script setup>
</script>

<template>
  <h1>You did it!</h1>
  <ul class="nav">
    <li>  <RouterLink to="/">Home</RouterLink>
    </li>
    <li>  <RouterLink to="/exercise-2">Exercise 2</RouterLink>
    </li>
    <li> <RouterLink to="/packman">Packman</RouterLink></li>
    <li> <RouterLink to="/spook">Spook</RouterLink></li>
  </ul>
  <RouterView></RouterView>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 10px;
  list-style-type: none;
  padding: 0;
}

</style>
