<template>
<div>
  <div v-if='gameStarted'>
    {{currentSlide}}
  </div>
  <button @click="slideshow"
          v-else
          class="btn btn-primary">End game</button>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  computed: {
    currentSlide() {
      return this.slides[this.counter];
    },
    endOfSlides() {
      return this.counter >= this.slides.length ? true: false;
    },
    ...mapGetters('playfield', {
      winner: 'winner'
    })
  },
  data() {
    return {
      slides: [
        'CONGRATULATIONS!',
        'PLACEHOLDER',
        'WIN',
        'THE',
        'GAME!',      
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
        if(self.endOfSlides) return;
        if(self.counter == self.slides.length - 4) self.frequency /= 2;
        self.counter++;
        timer = setTimeout(tick, self.frequency)
      }, self.frequency);
    }
  },
  watch: {
    winner(value) {
      this.slides[this.slides.indexOf('PLACEHOLDER')] = value;
    }
  }
}
</script>

<style>
</style>