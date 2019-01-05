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
        time: 0,
        winner: null
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
        initialWinConditions(state) {
            return state.initialWinConditions;
        }
    },
    mutations: {      
        syncTime(state, time) {
            state.time = time;
        },
        setWinner(state, winner) {
            state.winner = winner;
        }
    },
    actions: {
        gameFinished(store, winner) {
            store.commit('setWinner', winner);
        },
        syncTime(store, time) {
            store.commit('syncTime', time);
        }
    }
};