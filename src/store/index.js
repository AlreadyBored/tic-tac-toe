import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Field from './modules/field.js';

export const store = new Vuex.store({
    modules: {
        Field
    },
    strict: process.env.NODE_ENV !== 'production'
});