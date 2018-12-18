<template>
<div>
  <div v-if='gameStarted'>
    {{currentSlide}}
  </div>
  <button @click="slideshow"
          v-else
          class="btn btn-primary">Start game</button>
</div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        'HELLO',
        'WELCOME',
        'TO',
        'TIC',
        'TAC',
        'TOE!'      
      ],
      frequency: 1000,
      counter: 0,
      gameStarted: false
    }
  },
  methods: {
    slideshow() {
      this.gameStarted = true;
      const self = this
      let timer = setTimeout(function tick() {
        if(self.counter >= self.slides.length) return;
        if(self.counter == self.slides.length - 4) self.frequency /= 2;
        self.counter++;
        timer = setTimeout(tick, self.frequency)
      }, self.frequency);
    }
  },
  computed: {
    currentSlide() {
      return this.slides[this.counter];
    }

  }
}
</script>

<style>

</style>
