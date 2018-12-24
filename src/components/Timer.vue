<template>
<div>
  Time: {{time}}
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  data() {
    return {
      time: 0,
      end: false
    };
  },
  methods: {
    ...mapActions('playfield', {
      sendTime: 'syncTime'
    }),
    startTimer() {
      const self = this;
      let timer = setTimeout(function tick() {
        if(self.end) return;
        self.time++;
        timer = setTimeout(tick, 1000);
      }, 1000);
    }
  },
  computed: {
    ...mapGetters('playfield', {
      gameStarted: 'sideChosen',
      winner: 'winner'
    })
  },
  watch: {
    gameStarted() {
      this.startTimer();
    },
    timeToSync() {
      this.sendTime(this.time);   
      this.end = true;
    }
  }
};
</script>

<style>
</style>