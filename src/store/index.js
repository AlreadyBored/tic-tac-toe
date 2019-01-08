import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import menu from './modules/menu.js';
import playfield from './modules/playfield_separated.js';
import settings from './modules/settings';
import state from './modules/state';

export const store = new Vuex.Store({
    modules: {
        menu,
        playfield,
        settings,
        state
    },
    strict: process.env.NODE_ENV !== 'production'
});