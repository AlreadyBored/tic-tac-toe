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
            nick: [
                {
                    name: 'Red',
                    value: 'red'
                },
                {
                    name: 'Orange',
                    value: 'orange'
                },
                {
                    name: 'Cyan',
                    value: 'cyan'
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
        possibleTextSize: [
            {
                name: '32 pixels',
                value: '32px'
            },
            {
                name: '38 pixels',
                value: '38px'
            },
            {
                name: '42 pixels',
                value: '42px'
            }
        ],
        xView: {
            color: 'black'
        },
        oView: {
            color: 'black'
        },
        nicknameView: {
            'font-size': '32px',
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
        nicknameView(state) {
            return state.nicknameView;
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
        possibleTextSize(state) {
            return state.possibleTextSize;
        },
        settings(state) {
            return {
                colX: state.xView.color,
                colO: state.oView.color,
                flags: {
                    int: state.intMode,
                    draw: state.drawMode
                },
                nick: {
                    'font-size': state.nicknameView['font-size'],
                    color: state.nicknameView.color,
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
        },
        set_nick(state, nick) {
            state.nicknameView['font-size'] = nick['font-size'];
            state.nicknameView.color = nick.color;
        }
    },
    actions: {
        getSettings(store, options) {
            store.commit('set_X', options.colors.colorX);
            store.commit('set_O', options.colors.colorO);
            store.commit('set_modes', options.flags);
            store.commit('set_nick', options.nick);           
        }
    }
};