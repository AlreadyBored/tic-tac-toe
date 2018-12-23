import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import menu from './modules/menu.js';
import playfield from './modules/playfield.js';
import options from './modules/options';
import state from './modules/state';

export const store = new Vuex.Store({
    modules: {
        menu,
        playfield,
        options,
        state
    },
    strict: process.env.NODE_ENV !== 'production'
});