<template>
  <div>
    <Timer></Timer>
    <table class='table table-bordered playfield' v-if='sideChosen'>
      <tbody>
        <tr v-for="(row, indexRow) in state" 
            :key="`r${indexRow}`">
          <td v-for="(cell, indexCell) in row"
              @click='drawSymbol(indexRow, indexCell)' 
              :key="`c${indexCell}`"
              class='my-cell'>
              {{figure(indexRow, indexCell)}}
              </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!sideChosen"
         class='prompt-symbol' 
          @click="chooseSide"> 
      Choose your side!
      <hr>
      <span class="symbol-cross">X</span><span class='symbol-circle'>O</span>
      </div>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Timer from './Timer.vue';

export default {
  data() {
    return {
      chosenSymbol: null,
      timeToSync: false
    }
  },
  computed: {
    ...mapGetters("playfield", {
      state: "currentState",
      sideChosen: 'sideChosen',
      winner: 'winner'
    }),
    figure(row, cell) {
      return (row, cell) => {
        switch (this.state[row][cell]) {
          case null:
            return "";
            break;

          case true:
            return "X";
            break;

          case false:
            return "O";
            break;

          default:
            throw new Error("Wrong cell adress and/or value");
        }
      };
    }
  },
  methods: {
    ...mapActions('playfield', {
      gameStarted: 'gameStarted',
      sendSide: 'sideChosen',
      symbolSent: 'symbolSent',
      turnFinished: 'turnFinished'
    }),
    chooseSide(e) {
      const target = e.target;
      if(target.tagName !== 'SPAN') return;
      if(target.classList.contains('symbol-cross')) {
        this.chosenSymbol = 'X';
      }
      if(target.classList.contains('symbol-circle')) {
        this.chosenSymbol = 'O';
      }
      this.sendSide();
    },
    switchSymbol() {
      this.chosenSymbol === 'O' ? 
      this.chosenSymbol = 'X' :
      this.chosenSymbol = 'O'
    },
    drawSymbol(row, cell) {
      this.symbolSent({
        row,
        cell,
        chosenSymbol: this.chosenSymbol
      });
      this.turnFinished(this.chosenSymbol);
      this.switchSymbol();      
    } 
  },
  watch: {
    winner() {
      setTimeout(() => {
        this.$router.push('/end');
      });
    }
  },
  mounted() {
    this.gameStarted()
  },
  components: {
    Timer
  }
};
</script>

<style>
.playfield {
  cursor: pointer;
  user-select: none;
}
.my-cell {
  height: 90px;
  width: 60px;
}
.symbol-cross {
  cursor: pointer;
  text-align: left;
  font-size: 48px;
  color: red;
}

.symbol-circle {
  cursor: pointer;
  text-align: right;
  font-size: 48px;
  color: blue;
}
</style>
