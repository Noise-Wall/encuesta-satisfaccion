import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: ()=>import("../views/HomeView.vue")
        },
        {
            path: "/editar/:categoria/:id",
            name: "editar",
            params: true,
            component: ()=>import("../views/EditView.vue"),
        },
        {
            path: "/agregar/:categoria",
            name: "agregar",
            params: true,
            component: ()=>import("../views/EditView.vue"),
        },
        {
            path: "/eliminar/:categoria/:id",
            name: "eliminar",
            params: true,
            component: ()=>import("../views/HomeView.vue")
        }
    ]
})

export default router