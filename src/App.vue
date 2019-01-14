<template>
  <div id="app">
    <transition name='slide' mode='out-in'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>



export default {
  mounted() {
    this.$router.push('/intro');
  }
}
</script>

<style>
#app {
  border: 2px solid black;
  width: 60%;
  height: 50%;
  margin: 60px auto 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.slide-enter {

}

.slide-enter-active {
  animation: slideIn 0.5s;
}

.slide-enter-to {

}

.slide-leave {

}

.slide-leave-active {
  animation: slideOut 0.5s;
}

.slide-leave-to {

}

@keyframes slideIn {
  from{transform: rotateY(90deg);}
  to{transform: rotateY(0deg);}
}

@keyframes slideOut  {
  from{transform: rotateY(0deg);}
  to{transform: rotateY(90deg);}
}
</style>