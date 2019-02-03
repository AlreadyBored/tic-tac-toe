<template>
  <div>
  <div class='results-slidescreen'>
    <div>Game {{cnt + 1}}</div>
    <div>Score is {{score[1]}} : {{score[2]}}</div>
    <div>{{leadership}}</div>
    <div>Last game winner: {{winner}}</div>
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
      players: 'players',
      winner: 'winner',
      turns: 'turns',
      score: 'score'
    }),
    ...mapGetters('state', {
      cnt: 'runsCnt'
    }),
    leadership() {
      if(this.score[1] === this.score[2]) {
        return 'Score is equal';
      } else if (this.score[1] > this.score[2]) {
        return `Leader is ${this.players[0].name}`;
      } else if (this.score[2] > this.score[1]) {
        return `Leader is ${this.players[1].name}`;
      } else {
        throw new Error('Error in leader identification!');
      }      
    }
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
