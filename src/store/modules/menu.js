export default {
    namespaced: true,
    state: {
        options: [
            {
                value: 'START',
                id: 1
            },
            {
                value: 'OPTIONS',
                id: 2
            },
            {
                value: 'RESTART',
                id: 3
            }

        ]
    },
    getters: {
        options(state) {
            return state.options;
        }
    },
    mutations: {

    },
    actions: {
        
    }
};