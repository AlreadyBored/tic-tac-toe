<template>
  <div>
  <div class='results-slidescreen'>
    <div>Game: <span class="res-value"> {{cnt+ 1}}</span></div>
    <div>Score is <span class="res-value">{{score[1]}} : {{score[2]}}</span></div>
    <div v-html='leadership'></div>
    <div>Last game winner: <span class="res-value">{{winner}}</span></div>
    <div>Time spent: <span class="res-value">{{time}} seconds</span></div>
    <div>Turns made: <span class="res-value">{{turns}}</span></div>
  </div>
  <div @click='restart'
          class="btn-start">Restart</div>
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
        return `Leader is <span class="res-value">${this.players[0].name}</span>`;
      } else if (this.score[2] > this.score[1]) {
        return `Leader is <span class="res-value">${this.players[1].name}</span>`;
      } else {
        throw new Error('Error in leader identification!');
      }      
    }
  }
}
</script>

<style>
.results-slidescreen {
  font-size: 48px;
  color: red;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.res-value {
  font-size: 48px;
  color: black;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.btn-start {
  font-size: 64px;
  color: green;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  cursor: pointer;
}
</style>
