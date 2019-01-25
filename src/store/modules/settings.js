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
        },
        intMode: false,
        drawMode: false
    },
    getters: {
        xView(state) {
            return state.xView;
        },
        oView(state) {
            return state.oView;
        },
        intMode(state) {
            return state.intMode;
        },
        drawMode(state) {
            return state.drawMode;
        },
        possibleColors(state) {
            return state.possibleColors;
        },
        settings(state) {
            return {
                colX: state.xView.color,
                colO: state.oView.color,
                flags: {
                    int: state.intMode,
                    draw: state.drawMode
                }
            }
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
        },
        set_modes(state, modes) {
            state.drawMode = modes.intMode;
            state.intMode = modes.drawMode;
        }
    },
    actions: {
        getSettings(store, options) {
            store.commit('set_X', options.colors.colorX);
            store.commit('set_O', options.colors.colorO);
            store.commit('set_modes', options.flags);           
        }
    }
};