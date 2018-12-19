<template>
  <div>
  <div>
    {{currentSlide}}
  </div>
  <button class='btn btn-primary'
          @click='slideshow'>AAA</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        'VuePractice repository',
        'In collaboration with ACME Corp.',
        'PRESENTS',
        'TIC-TAC-TOE!'
      ],
      currentSlide: '',
      slidesCounter: 0
    }
  },
  methods: {
    changeSlide() {
      this.currentSlide = this.slides[this.slidesCounter]
    },
    promiseRecursiveSetTimeout() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });      
    },
    slideshow() {
      this.promiseRecursiveSetTimeout()
      .then()
      .then()
      .then()
      .then()
    }
  }
}
</script>

<style>

</style>
