<template>
  <div id="app">
    <Intro></Intro>
    <Menu></Menu>
    <Playfield></Playfield>
    <Outro></Outro>
    <Results></Results>
    <Settings></Settings>
  </div>
</template>

<script>
import Intro from './components/Intro.vue';
import Outro from './components/Outro.vue';
import Menu from './components/Menu.vue';
import Playfield from './components/Playfield.vue';
import Results from './components/Results.vue';
import Settings from './components/Settings.vue';


export default {
  name: 'app',
  components: {
    Intro,
    Menu,
    Playfield,
    Outro,
    Results,
    Settings
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