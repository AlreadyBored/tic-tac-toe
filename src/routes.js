import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Intro from './components/Intro.vue';
import Outro from './components/Outro.vue';
import Menu from './components/Menu.vue';
import Playfield from './components/Playfield_separated.vue';
import Results from './components/Results.vue';
import Settings from './components/Settings.vue';
import Authorization from './components/Authorization.vue';

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
        name: 'authorization',
        path: '/auth',
        component: Authorization
    },
    {
        name: 'menu',
        path: '/menu',
        component: Menu
    },
    {
        name: 'game',
        path: '/game',
        component: Playfield
    },
    {
        name: 'settings',
        path: '/settings',
        component: Settings
    },
    {
        name: 'outro',
        path: '/end',
        component: Outro
    },
    {
        name: 'results',
        path: '/results',
        component: Results
    }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
})