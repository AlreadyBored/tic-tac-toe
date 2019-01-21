<template>
  <div>
  <div class='results-slidescreen'>
    <div>Game {{cnt + 1}}</div>
    <div>Winner: {{winner}}</div>
    <div>Time spent: {{time}} seconds</div>
    <div>Turns made: {{turns}}</div>
  </div>
  <button @click='restart'
          class="btn btn-success">Restart</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  methods: {
    restart() {
      this.$store.dispatch('state/newRun');
      this.$store.dispatch('playfield/restartGame');
      this.$router.push('/intro');
    }
  },
  computed: {
    ...mapGetters('playfield', {
      time: 'time',
      winner: 'winner',
      turns: 'turns'
    }),
    ...mapGetters('state', {
      cnt: 'runsCnt'
    })
  }
}
</script>

<style>
.results-slidescreen {
  font-size: 64px;
  color: red;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
