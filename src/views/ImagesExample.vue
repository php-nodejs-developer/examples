<template>
  <img :src="random" alt="random">
  <img src="@/assets/bubbles.jpg" alt="bubbles">
  <img :src="require(`../assets/${summer}`)" :alt="summer">
</template>
<script>
export default {
  data() {
    return {
      summer: 'summer.jpg',
      random: 'https://picsum.photos/1000/1000'
    }
  }
}
</script>
<style>
img {
  width: 30%;
  height: 50vh;
  object-fit: cover;
}
</style>