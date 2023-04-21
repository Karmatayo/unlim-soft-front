import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            // component: () => import("@/views/NotFound.vue")
        },
        {
            path: '/',
            name: 'home',
            component: () => import("@/pages/HomePage.vue")
        },
        {
            path: '/test',
            name: 'test',
            component: () => import("@/pages/TestPage.vue")
        }
    ],
});