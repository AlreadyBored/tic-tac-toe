export default {
    namespaced: true,
    state: {
        options: [
            {
                value: 'START',
                path: '/game',
                id: 1
            },
            {
                value: 'OPTIONS',
                path: '/settings',
                id: 2
            },
            {
                value: 'RESTART',
                path: '/intro',
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