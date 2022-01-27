<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from './components/index.vue'

export default {
  name: 'Weather',
  components: {
    Index
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

  *,
  *::after,
  *::before {
    margin:0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
    font-family: 'Orbitron', sans-serif;
  }
</style>
