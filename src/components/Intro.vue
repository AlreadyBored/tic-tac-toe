<template>
<div>
  <div v-if='gameStarted'
       class='intro-slidescreen'>
    {{currentSlide}}
  </div>
  <div @click="slideshow"
          v-if='!gameStarted'
          class="btn-start">Start game</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      slides: ["HELLO", "WELCOME", "TO", "TIC", "TAC", "TOE!"],
      frequency: 800,
      counter: 0,
      gameStarted: false
    };
  },
  methods: {
    slideshow() {
      this.gameStarted = true;
      const self = this;
      let timer = setTimeout(function tick() {
        if (self.endOfSlides) return;
        if (self.counter == self.slides.length - 4) self.frequency /= 2;
        self.counter++;
        timer = setTimeout(tick, self.frequency);
      }, self.frequency);
    }
  },
  computed: {
    currentSlide() {
      return this.slides[this.counter];
    },
    endOfSlides() {
      return this.counter >= this.slides.length ? true : false;
    }
  },
  watch: {
    endOfSlides() {
      this.$router.push("/menu");
    }
  }
};
</script>

<style>
.intro-slidescreen {
  min-width: fit-content;
  font-size: 128px;
  color: red;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.btn-start {
  font-size: 64px;
  color: green;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  cursor: pointer;
}
.btn-start:hover {
  opacity: 0.5;
}
</style>