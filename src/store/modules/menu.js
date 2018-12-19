export default {
    namespaced: true,
    state: {
        menuParts: [
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
        menuParts() {
            return state.menuParts;
        }
    },
    mutations: {

    },
    actions: {
        
    }
};