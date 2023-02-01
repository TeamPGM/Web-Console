import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const indexChildren: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/app/dashboard.vue')
    },
    {
        path: '/shell',
        name: 'shell',
        component: () => import('../views/app/shell.vue')
    },
    {
        path: '/replace',
        name: 'replace',
        component: () => import('../views/app/replace.vue')
    },
    {
        path: '/ignore',
        name: 'ignore',
        component: () => import('../views/app/ignore.vue')
    },
    {
        path: '/plugin',
        name: 'plugin',
        component: () => import('../views/app/plugin.vue')
    },
    {
        path: '/shop',
        name: 'shop',
        component: () => import('../views/app/shop.vue')
    }
]

const routes: Array<RouteRecordRaw> = [
    {
        path: '/main',
        name: 'main',
        component: () => import('../views/main/main.vue'),
        children: indexChildren
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export {
    indexChildren
}

export default router
