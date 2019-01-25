<template>
  <div>
    <template v-if='sideChosen'>
    <div>
      <ul class='stats'>
        <li><div class='stats-turn'>Turns made: {{turn}}</div></li>
        <li><Timer :time='time'
                   :end="endTimer"
                   @timer-tick='countTime'
                   class="stats-timer"></Timer></li>
        <li><div class='stats-player'>{{currentPlayer}} turns!</div></li>
      </ul>
      </div>
    
    <table class='table table-bordered playfield'>
      <tbody>
        <tr v-for="(row, indexRow) in currentState" 
            :key="`r${indexRow}`">
          <td v-for="(cell, indexCell) in row"
              @click='drawSymbol(indexRow, indexCell)' 
              :key="`c${indexCell}`"
              class='my-cell'
              :style='settingsSymbol(indexRow, indexCell)'>
              {{figure(indexRow, indexCell)}}
              </td>
        </tr>
      </tbody>
    </table>
    </template>
    <div v-if="!sideChosen"
         class='prompt-symbol' 
          @click="chooseSide"> 
      {{currentPlayer}} choose your side!
      <hr>
      <span class="symbol-cross"
            :style="this.xClass">X</span>
      <span class='symbol-circle'
            :style='this.oClass'>O</span>
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
      currentState: null,
      time: 0,
      turn: 0,
      sideChosen: false
    };
  },
  computed: {
    ...mapGetters("playfield", {
      initialState: "initialState",
      initialWinConditions: 'initialWinConditions',
      winner: 'winner',
      players: 'players'
    }),
    ...mapGetters('settings', {
      xClass: 'xView',
      oClass: 'oView',
      intellectualComputing: 'intMode',
      endOnDraw: 'drawMode'
    }),
    currentPlayer() {
      if(this.turn % 2 === 0) {
        return this.players[0].name;
      } else {
        return this.players[1].name;
      }
    },
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
    },
    settingsSymbol() {
      return (row, cell) => {
        switch(this.currentState[row][cell]) {
          case null:
          return false;
          break;

          case true:
          return this.xClass;
          break;

          case false:
          return this.oClass;
          break;
        }
      }
    }
  },
  methods: {
    ...mapActions('playfield', {
      gameFinished: 'gameFinished',
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
      this.countTurn();
      this.switchSymbol();
    },
    drawO(adress) {
      this.currentState[adress.row][adress.cell] = false;
      this.countTurn();
      this.switchSymbol();      
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
    /* symbol O - seeking for true, X - seeking for false, values reversed
    because symbol switches after previous succesful draw*/
    checkWinConditions() {
      const conditions = this.actualWinConditions;
      if (this.chosenSymbol === "O") {
        conditions.forEach(element => {
          const bool = this.transformedCondition(element);
          if (bool.every(x => x === true)) {
            this.gameFinished({
              time: this.time,
              turns: this.turn
            });
          }
        });
        /* If cleaning of list of possible winning combinations needed */
        if(this.intellectualComputing) this.deleteDeadlocks();        
      }
      if (this.chosenSymbol === "X") {
        conditions.forEach(element => {
          const bool = this.transformedCondition(element);
          if (bool.every(x => x === false)) {
            this.gameFinished( {
              time: this.time,
              turns: this.turn
            });
          }
        });
        /* If cleaning of list of possible winning combinations needed */
        if(this.intellectualComputing) this.deleteDeadlocks();   
      }
    },
    /* Currently works in intellectual mode: game will be finished with DRAW result
        if not all cells are filled but there's no more possible winning combinations */
    checkForDraw() {
      if ((this.fieldIsFull && this.winner === null) ||
        !this.actualWinConditions.length) {
        this.gameFinished( {
          winner: 'NO ONE',
          time: this.time,
          turns: this.turn
        });
      }
    },
    turnFinished() {
      if (this.turn >= 3) this.checkWinConditions();
      if(this.endOnDraw) this.checkForDraw();
      if (this.turn >= 9) this.checkForDraw();
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
    }
  },
  watch: {
    winner() {
        this.endTimer = true;
        setTimeout(() => {
          this.$router.push("/end");
        });        
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

.stats {
  list-style: none;
}
.playfield {
  cursor: pointer;
  user-select: none;
}
.my-cell {
  vertical-align: middle !important;
  font-size: 32px;
  height: 100px;
  width: 80px;
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
