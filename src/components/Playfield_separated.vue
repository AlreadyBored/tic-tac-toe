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
import Timer from "./Timer.vue";

export default {
  data() {
    return {
      chosenSymbol: null,
      timeToSync: false,
      actualWinConditions: [],
      currentState: null,
      time: 0,
      turn: 0,
      sideChosen: false,
      winner: null
    };
  },
  computed: {
    ...mapGetters("playfield", {
      state: "currentState",
      sideChosen: "sideChosen",
      winner: "winner"
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
    },
    fieldIsFull(state) {
      if (state.currentState !== null) {
        const cs = state.currentState,
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
    adressUsed: state => adress => {
      return state.currentState[adress.row][adress.cell] === null
        ? false
        : true;
    },
    transformedCondition: getters => params => {
      const currentState = getters.currentState,
        boolCondition = [
          currentState[params[0]][params[1]],
          currentState[params[2]][params[3]],
          currentState[params[4]][params[5]]
        ];
      return boolCondition;
    }
  },
  methods: {
    ...mapActions("playfield", {
      gameStarted: "gameStarted",
      sendSide: "sideChosen",
      symbolSent: "symbolSent",
      turnFinished: "turnFinished"
    }),
    startGame(state) {
      state.currentState = state.initialState;
      state.actualWinConditions = state.initialWinConditions;
    },
    chooseSide(state) {
      state.sideChosen = true;
    },
    drawX(state, adress) {
      state.currentState[adress.row][adress.cell] = true;
    },
    drawO(state, adress) {
      state.currentState[adress.row][adress.cell] = false;
    },
    countTurn(state) {
      state.turn++;
    },
    deleteDeadlock(state, index) {
      state.actualWinConditions.splice(index, 1);
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
      this.sendSide();
    },
    symbolSent(store, options) {
      if (
        store.getters.adressUsed({
          row: options.row,
          cell: options.cell
        })
      )
        return;
      switch (options.chosenSymbol) {
        case "X":
          store.commit("drawX", {
            row: options.row,
            cell: options.cell
          });
          break;

        case "O":
          store.commit("drawO", {
            row: options.row,
            cell: options.cell
          });
          break;

        default:
          throw new Error(
            `Wrong type of symbol was sent to action! - ${
              options.chosenSymbol
            }|${options.row}|${options.cell}`
          );
      }
    },
    /* Action removes winning combinations that no longer lead to victory,
        made for lowering calculations around checking winconditions.
        In case of 3x3 field it doesn't lead to resources saving. */

    deleteDeadlocks(store) {
      store.getters.actualWinConditions.forEach(element => {
        const bool = store.getters.transformedCondition(element);
        if (bool.some(x => x === true) && bool.some(x => x === false)) {
          store.commit(
            "deleteDeadlock",
            store.getters.actualWinConditions.indexOf(element)
          );
        }
      });
    },
    checkWinConditions(store, symbol) {
      const conditions = store.getters.actualWinConditions;
      if (symbol === "X") {
        conditions.forEach(element => {
          const bool = store.getters.transformedCondition(element);
          if (bool.every(x => x === true)) {
            store.dispatch("gameFinished", "CROSSES");
          }
          /* If clearing list of possible winning combinations needed */
          store.dispatch("deleteDeadlocks");
        });
      }
      if (symbol === "O") {
        conditions.forEach(element => {
          const bool = store.getters.transformedCondition(element);
          if (bool.every(x => x === false)) {
            store.dispatch("gameFinished", "NOUGHTS");
          }
        });
        /* If clearing list of possible winning combinations needed */
        store.dispatch("deleteDeadlocks");
      }
    },
    /* Currently works in intellectual mode: game will be finished with DRAW result
        if not all cells are filled but there's no more possible winning combinations */
    checkForDraw(store) {
      if (
        (store.getters.fieldIsFull && store.getters.winner === null) ||
        !store.getters.actualWinConditions.length
      ) {
        store.dispatch("gameFinished", "NO ONE");
      }
    },
    turnFinished(store, symbol) {
      if (store.getters.turn >= 4) {
        store.dispatch("checkWinConditions", symbol);
      }
      if (store.getters.turn >= 7) store.dispatch("checkForDraw");
      store.commit("countTurn");
    },
    switchSymbol() {
      this.chosenSymbol === "O"
        ? (this.chosenSymbol = "X")
        : (this.chosenSymbol = "O");
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
        this.$router.push("/end");
      });
    }
  },
  mounted() {
    this.gameStarted();
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
