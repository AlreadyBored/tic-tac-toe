export default {
    namespaced: true,
    state: {
        initialState: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
        currentState: 'dasdas',
        time: 0,
        chosenSymbol: null,
        xTurns: null
    },
    getters: {
        currentState(state) {
            return state.currentState;
        },
        time(state) {
            return state.time;
        },
        chosenSymbol(state) {
            return state.chosenSymbol;
        },
        xTurns(state) {
            return state.xTurns;
        },
    },
    mutations: {

    },
    actions: {
        
    }
};