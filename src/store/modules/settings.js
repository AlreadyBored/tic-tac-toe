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
                    name: 'Black',
                    value: 'black'
                }
            ],
            nought: [
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
                    name: 'Black',
                    value: 'black'
                }
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
        },
        possibleColors(state) {
            return state.possibleColors;
        },
        colorsArr(state) {
            const arrCross = [],
            arrNought = [];

            for(let i = 0; i < state.possibleColors.cross.length; i++) {
                   arrCross.push(state.possibleColors.cross[i].value);
            }

            for(let i = 0; i < state.possibleColors.nought.length; i++) {
                arrNought.push(state.possibleColors.nought[i].value);
            }
            return {
                cross: arrCross,
                nought: arrNought
            }
        } 
        
    },
    mutations: {
        set_X(state, color) {
            state.xView.color = color;
        },
        set_O(state, color) {
            state.oView.color = color;
        }
    },
    actions: {
        getSettings(store, options) {
            store.commit('set_X', options.colors.colorX);
            store.commit('set_O', options.colors.colorO);           
        }
    }
};