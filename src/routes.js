import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Intro from './components/Intro.vue';
import Outro from './components/Outro.vue';
import Menu from './components/Menu.vue';
import Playfield from './components/Playfield_separated.vue';
import Results from './components/Results.vue';
import Settings from './components/Settings.vue';

/* import {store} from './store'; */

const routes = [
    {
        path: '',
        redirect: {
            name: 'intro'
        }
    },
    {
        name: 'intro',
        path: '/intro',
        component: Intro
    },
    {
        path: '/menu',
        component: Menu
    },
    {
        path: '/game',
        component: Playfield
    },
    {
        path: '/settings',
        component: Settings
    },
    {
        path: '/end',
        component: Outro
    },
    {
        path: '/results',
        component: Results
    }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
})