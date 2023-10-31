import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: 'index',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/layout'),
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('../views/list'),
            },
            {
                path: 'index',
                name: 'index',
                component: () => import('../views/index'),
            },
            {
                path: 'detail',
                name: 'detail',
                component: () => import('../views/detail'),
                props({query}) {
                    return {data: query.data}
                }
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
