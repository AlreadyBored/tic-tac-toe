export default {
    namespaced: true,
    state: {
        possibleColors: {
            cross: [
                {
                    name: 'Red',
                    value: 'red'
                },
                {
                    name: 'Blue',
                    value: 'blue'
                },
                {
                    name: 'Green',
                    value: 'green'
                },
                {
                    name: 'Red',
                    value: 'red'
                },
            ],
            nought: [
                {red: 'Red'},
                {blue: 'Blue'},
                {green: 'Green'},
                {black: 'Black'}
            ],
        },
        xView: {
            color: 'black'
        },
        oView: {
            color: 'black'
        }
    },
    getters: {
        xView(state) {
            return state.xView;
        },
        oView(state) {
            return state.oView;
        }
    },
    mutations: {
        set_X(state) {

        },
        set_O(state) {

        }
    },
    actions: {
        getX(store, options) {

        },
        getO(store, options) {

        }
    }
};