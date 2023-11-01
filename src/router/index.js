import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/pedidos', //caminho que será acessado a rota
        name: 'Pedidos', // nome do componente
        component: () => import(/* webpackChunkName: "pedidos" */ '../views/Pedidos.vue')
    },
    {
        path: '/iframe',
        name: 'iframe',
        component: () => import(/* webpackChunkName: "pedidos" */ '../views/Iframe.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
