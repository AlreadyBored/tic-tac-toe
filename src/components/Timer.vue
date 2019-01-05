<template>
<div>
  Time: {{time}}
</div>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      required: true
    },
    end: {
      type: Boolean || null,
      required: true
    }
  },
  methods: {
    startTimer() {
      const self = this;
      let timer = setTimeout(function tick() {
        if(self.end) return;
        self.$emit('timer-tick');
        timer = setTimeout(tick, 1000);
      }, 1000);
    },
  },
  mounted() {
    this.startTimer();
  }
};
</script>

<style>
</style>