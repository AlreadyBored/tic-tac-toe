import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: ''
    }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
})