export default {
    namespaced: true,
    state: {
        runsCnt: 0
    },
    getters: {
        runsCnt(state) {
            return state.runsCnt;
        }
    },
    mutations: {
        increaseCnt(state) {
            state.runsCnt++;
        }
    },
    actions: {
        newRun(store) {
            store.commit('increaseCnt');
        }
    }
};