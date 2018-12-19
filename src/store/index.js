import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import menu from './modules/menu.js';
import playfield from './modules/playfield.js';

export const store = new Vuex.Store({
    modules: {
        menu,
        playfield
    },
    strict: process.env.NODE_ENV !== 'production'
});