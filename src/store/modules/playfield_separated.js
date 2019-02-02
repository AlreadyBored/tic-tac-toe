import axios from 'axios';
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
        currentState: {
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
        score: {
            1: 0,
            2: 0
        },
        time: null,
        winner: null,
        turns: null,
        players: []
    },
    getters: {     
        winner(state) {
            return state.winner;
        },
        time(state) {
            return state.time;
        },
        initialState(state) {
            return state.initialState;
        },
        currentState(state) {
            return state.currentState;
        },
        initialWinConditions(state) {
            return state.initialWinConditions;
        },
        turns(state) {
            return state.turns;
        },
        players(state) {
           return state.players; 
        },
        score(state) {
            return state.score;
        }
    },
    mutations: {      
        setTime(state, time) {
            state.time = time;
        },
        setTurns(state, turns) {
            state.turns = turns;
        },
        setWinner(state, winner) {
            state.winner = winner;
        },
        addPlayer(state, player) {
            state.players.push(player);
        },
        restartGame(state) {
            state.time = null;
            state.winner = null;
            state.turns = null;
        },
        set_state(state, resObj) {
            state.currentState[resObj.row][resObj.cell] = resObj.symbol;
        }
    },
    actions: {
        gameFinished(store, options) {
            let winner;
            if(options.winner) {
                winner = options.winner;
            } else {
                (options.turns - 1) % 2 === 0 ? winner = store.getters.players[0].name
            : winner = store.getters.players[1].name;
            }            
            store.commit('setWinner', winner);
            store.commit('setTime', options.time);
            store.commit('setTurns', options.turns);
        },
        getPlayer(store, player) {
            store.commit('addPlayer', player);
        },
        restartGame(store) {
            store.commit('restartGame');
        },
        getSymbol(store, payload) {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:1337',
                data: {
                    row: payload.row,
                    cell: payload.cell,
                    symbol: payload.symbol
                }
            })
            .then(response => {
                store.commit('set_state', JSON.parse(response.data.split('???')[0]));
            })
        }
    }
};