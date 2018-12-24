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
            [0,2,1,2,2,2],
            [0,0,1,1,2,2],
            [2,0,1,1,0,2] 
        ],
        actualWinConditions: [],
        currentState: null,
        time: 0,
        turn: 0,
        sideChosen: false,
        winner: null
    },
    getters: {
        turn(state) {
            return state.turn;
        },
        fieldIsFull(state) {
            if(state.currentState !== null) {
                const cs = state.currentState,
            resArr = [];
            for(let i = 0; i < 3; i++) {
                    resArr.push(cs[i][0]);
                    resArr.push(cs[i][1]);
                    resArr.push(cs[i][2]);
            }
            return resArr.every(x => {
                return x !== null;
            });
            } else {
                return 'Not applicable';
            }
            
        },
        winner(state) {
            return state.winner;
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
        },
        deleteDeadlock(state, index) {
            state.actualWinConditions.splice(index, 1);
        },
        setWinner(state, winner) {
            state.winner = winner;
        },
        syncTime(state, time) {
            state.time = time;
        }
    },
    actions: {
        gameStarted(store) {
            store.commit('startGame');
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
                throw new Error(`Wrong type of symbol was sent to action! - ${options.chosenSymbol}|${options.row}|${options.cell}`);
            }
        },
        /* Action removes winning combinations that no longer lead to victory,
        made for lowering calculations around checking winconditions.
        In case of 3x3 field it doesn't lead to resources saving. */ 
        deleteDeadlocks(store) {
                store.getters.actualWinConditions.forEach(element => {
                    const bool = store.getters.transformedCondition(element);
                    if(bool.some(x => x === true) && bool.some (x => x === false)) {
                        store.commit('deleteDeadlock', store.getters.actualWinConditions.indexOf(element));
                    }
                })
        },
        checkWinConditions(store, symbol) {
            const conditions = store.getters.actualWinConditions;
            if(symbol === 'X') {
                conditions.forEach(element => {
                    const bool = store.getters.transformedCondition(element);
                    if(bool.every(x => x === true)) {
                        store.dispatch('gameFinished', 'CROSSES');
                    }
                    /* If clearing list of possible winning combinations needed */
                    store.dispatch('deleteDeadlocks'); 
                });
            }
            if(symbol === 'O') {
                conditions.forEach(element => {
                    const bool = store.getters.transformedCondition(element);
                    if(bool.every(x => x === false)) {
                        store.dispatch('gameFinished', 'NOUGHTS');
                    } 
                });
                /* If clearing list of possible winning combinations needed */
                store.dispatch('deleteDeadlocks');
            }
        },
        /* Currently works in intellectual mode: game will be finished with DRAW result
        if not all cells are filled but there's no more possible winning combinations */
        checkForDraw(store) {
            if((store.getters.fieldIsFull && (store.getters.winner === null)) || !store.getters.actualWinConditions.length) {
                store.dispatch('gameFinished', 'NO ONE');
            }
        },
        turnFinished(store, symbol) {
            if(store.getters.turn >= 4) {
                store.dispatch('checkWinConditions', symbol);
            }
            if(store.getters.turn >= 7) store.dispatch('checkForDraw');
            store.commit('countTurn');
        },
        gameFinished(store, winner) {
            store.commit('setWinner', winner);
            
        },
        syncTime(store, time) {
            store.commit('syncTime', time);
        },
        sideChosen(store) {
            store.commit('chooseSide');
        }
    }
};