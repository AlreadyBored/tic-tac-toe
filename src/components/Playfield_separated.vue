<template>
  <div>
    <template v-if='sideChosen'>
    <Timer :time='time'
           :end="endTimer"
           @timer-tick='countTime'></Timer>
    <table class='table table-bordered playfield'>
      <tbody>
        <tr v-for="(row, indexRow) in currentState" 
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
    </template>
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
import Timer from "./Timer.vue";

export default {
  data() {
    return {
      chosenSymbol: null,
      endTimer: null,
      actualWinConditions: [],
      /* actualWinConditions: [
            [0,0,0,1,0,2],
            [1,0,1,1,1,2],
            [0,0,1,0,2,0],
            [0,1,1,1,2,1],
            [2,0,2,1,2,2],
            [0,2,1,2,2,2],
            [0,0,1,1,2,2],
            [2,0,1,1,0,2] 
      ], */
      currentState: null,
      /* currentState: {
            0: {
                0: null,
                1: null,
                2: null
            },
            1: {
                0: null,
                1: null,
                2: null
            },
            2: {
                0: null,
                1: null,
                2: null
            }
        }, */
      time: 0,
      turn: 0,
      sideChosen: false
    };
  },
  computed: {
    ...mapGetters("playfield", {
      initialState: "initialState",
      initialWinConditions: 'initialWinConditions',
      winner: 'winner'
    }),
    figure(row, cell) {
      return (row, cell) => {
        switch (this.currentState[row][cell]) {
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
    },
    fieldIsFull() {
      if (this.currentState !== null) {
        const cs = this.currentState,
        resArr = [];
        for (let i = 0; i < 3; i++) {
          resArr.push(cs[i][0]);
          resArr.push(cs[i][1]);
          resArr.push(cs[i][2]);
        }
        return resArr.every(x => {
          return x !== null;
        });
      } else {
        return "Not applicable";
      }
    },
    adressUsed() {
      return adress => this.currentState[adress.row][adress.cell] === null ? false : true;
    },
    transformedCondition() {
     return params => {
        const boolCondition = [
         this.currentState[params[0]][params[1]],
         this.currentState[params[2]][params[3]],
         this.currentState[params[4]][params[5]]
        ];
      return boolCondition;
      }
    }
  },
  methods: {
    ...mapActions('playfield', {
      gameFinished: 'gameFinished',
      syncTime: 'syncTime'
    }),
    countTime() {
      this.time++;
    },
    startGame() {
      this.currentState = JSON.parse(JSON.stringify(this.initialState));
      this.actualWinConditions = JSON.parse(JSON.stringify(this.initialWinConditions));
    },
    drawX(adress) {
      this.currentState[adress.row][adress.cell] = true;
    },
    drawO(adress) {
      this.currentState[adress.row][adress.cell] = false;
    },
    countTurn() {
      this.turn++;
    },
    deleteDeadlock(index) {
      this.actualWinConditions.splice(index, 1);
    },
    chooseSide(e) {
      const target = e.target;
      if (target.tagName !== "SPAN") return;
      if (target.classList.contains("symbol-cross")) {
        this.chosenSymbol = "X";
      }
      if (target.classList.contains("symbol-circle")) {
        this.chosenSymbol = "O";
      }
      this.sideChosen = true;
      this.endTimer = false;
    },
    symbolSent(options) {
      if (this.adressUsed({
          row: options.row,
          cell: options.cell
        }))  return;
      switch (this.chosenSymbol) {
        case "X":
          this.drawX({
            row: options.row,
            cell: options.cell
          });
          break;

        case "O":
          this.drawO({
            row: options.row,
            cell: options.cell
          });
          break;

        default:
          throw new Error(
            `Wrong type of symbol was sent! - ${
              options.chosenSymbol
            }|${options.row}|${options.cell}`
          );
      }
    },
    /* Action removes winning combinations that no longer lead to victory,
        made for lowering calculations around checking winconditions.
        In case of 3x3 field it doesn't lead to resources saving. */
    deleteDeadlocks() {
     this.actualWinConditions.forEach(element => {
        const bool = this.transformedCondition(element);
        if (bool.some(x => x === true) && bool.some(x => x === false)) {
          this.deleteDeadlock(this.actualWinConditions.indexOf(element));
        }
      });
    },
    checkWinConditions() {
      const conditions = this.actualWinConditions;
      if (this.chosenSymbol === "X") {
        conditions.forEach(element => {
          const bool = this.transformedCondition(element);
          if (bool.every(x => x === true)) {
            this.gameFinished("CROSSES");
          }
          /* If cleaning of list of possible winning combinations needed */
          this.deleteDeadlocks();
        });
      }
      if (this.chosenSymbol === "O") {
        conditions.forEach(element => {
          const bool = this.transformedCondition(element);
          if (bool.every(x => x === false)) {
            this.gameFinished("NOUGHTS");
          }
          /* If cleaning of list of possible winning combinations needed */
          this.deleteDeadlocks();
        });
      }
    },
    /* Currently works in intellectual mode: game will be finished with DRAW result
        if not all cells are filled but there's no more possible winning combinations */
    checkForDraw() {
      if ((this.fieldIsFull && this.winner === null) ||
        !this.actualWinConditions.length) {
        this.gameFinished("NO ONE");
      }
    },
    turnFinished() {
      if (this.turn >= 4) {
        this.checkWinConditions();
      }
      if (this.turn >= 7) this.checkForDraw();
      this.countTurn();
    },
    switchSymbol() {
      this.chosenSymbol === "O"
        ? (this.chosenSymbol = "X")
        : (this.chosenSymbol = "O");
    },
    drawSymbol(row, cell) {
      this.symbolSent({
        row,
        cell
      });
      this.turnFinished();
      this.switchSymbol();
    }
  },
  watch: {
    winner() {
        this.$router.push("/end");
    }
  },
  beforeMount() {
    this.startGame();
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
