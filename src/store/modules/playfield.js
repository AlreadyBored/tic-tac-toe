export default {
    namespaced: true,
    state: {
        initialState: {
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
        },
        winConditions: [
            
        ],
        currentState: null,
        time: 0,
        sideChosen: false
    },
    getters: {
        currentState(state) {
            return state.currentState;
        },
        time(state) {
            return state.time;
        },
        sideChosen(state) {
            return state.sideChosen
        },
        adressUsed(state, adress) {
            return state.currentState[adress.row][adress.cell] === null ?
            false : true;
        }
    },
    mutations: {
        startGame(state) {
            state.currentState = state.initialState;
        },
        chooseSide(state) {
            state.sideChosen = true;
        },
        drawX(state, adress) {
            state.currentState[adress.row][adress.cell] = true;
        },
        drawO(state, adress) {
            state.currentState[adress.row][adress.cell] = false;
        }
    },
    actions: {
        gameStarted(store) {
            store.commit('chooseSide');
            store.commit('startGame');
        },
        symbolSent({store, context}, options) {
            if(context.getters.adressUsed({
                row: options.row,
                cell: options.cell
            })) return;
            switch(options.chosenSymbol) {
                case 'X':
                store.commit('drawX', {
                    row: options.row,
                    cell: options.cell
                });
                break;

                case 'O':
                store.commit('drawO', {
                    row: options.row,
                    cell: options.cell
                })
                break;

                default:
                throw new Error(`Wrong type of symbol was sent to acton! - ${options.chosenSymbol}|${options.row}|${options.cell}`);
            }
            
        }
    }
};