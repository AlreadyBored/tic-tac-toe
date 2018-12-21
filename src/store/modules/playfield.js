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
        initialWinConditions: [
            [0,0,0,1,0,2],
            [1,0,1,1,1,2],
            [0,0,1,0,2,0],
            [0,1,1,1,2,1],
            [2,0,2,1,2,2],
            [2,0,2,1,2,2],
            [0,0,1,1,2,2],
            [2,0,1,1,0,2] 
        ],
        actualWinConditions: [],
        currentState: null,
        time: 0,
        turn: 0,
        sideChosen: false
    },
    getters: {
        turn(state) {
            return state.turn;
        },
        currentState(state) {
            return state.currentState;
        },
        time(state) {
            return state.time;
        },
        sideChosen(state) {
            return state.sideChosen;
        },
        actualWinConditions(state) {
            return state.actualWinConditions;
        },
        adressUsed: state => adress => {
            return state.currentState[adress.row][adress.cell] === null ?
            false : true;
        },
        transformedCondition: state => condition => {
            const currentState = state.getters.currentState,
            boolCondition = [
                currentState[condition[0]][condition[1]],
                currentState[condition[2]][condition[3]],
                currentState[condition[4]][condition[5]]
            ];
            let excludeFlag;
            let 
            for(let key of boolCondition) {
                const res = 0;
                if()
            }
            return {
                
            }
        }
    },
    mutations: {
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
        }
    },
    actions: {
        gameStarted(store) {
            store.commit('startGame');
            store.commit('chooseSide');
        },
        symbolSent(store, options) {
            if(store.getters.adressUsed({
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
        },
        checkWinConditions(store, symbol) {
            const conditions = store.getters.actualWinConditions;
            if(symbol === 'X') {
                for(let i = 0; i < conditions; i++) {
                    
                }
            }
        },
        turnFinished(store, symbol) {
            
            if(store.getters.turn > 3) {
                store.dispatch('checkWinConditions', symbol);
            }
            store.commit('countTurn');
        }
    }
};