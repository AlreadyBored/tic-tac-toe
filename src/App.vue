<template>
  <div id="app">
    <Intro></Intro>
    <Menu></Menu>
    <Playfield></Playfield>
  </div>
</template>

<script>
import Intro from './components/Intro.vue';
import Menu from './components/Menu.vue';
import Playfield from './components/Playfield.vue';

export default {
  name: 'app',
  components: {
    Intro,
    Menu,
    Playfield
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>