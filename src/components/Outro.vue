<template>
<div class='outro-slidescreen'>
    {{currentSlide}}
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
        'GAME FINISHED!',
        'PLACEHOLDER',
        'WINS',
        'THE',
        'GAME!',      
      ],
      frequency: 1000,
      counter: 0
    }
  },
  methods: {
    slideshow() {
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
    endOfSlides() {
      this.$router.push('/results');
    }
  },
  mounted() {
    this.slides[this.slides.indexOf('PLACEHOLDER')] = this.winner;
    this.slideshow();
  }
}
</script>

<style>
.outro-slidescreen {
  font-size: 128px;
  color: red;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>