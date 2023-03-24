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
            path: "/login",
            name: "login",
            component: ()=>import("../views/LoginView.vue")
        },
        {
            path: "/admin",
            name: "admin",
            component: ()=>import("../views/AdminView.vue")
        },
        {
            path: "/admin/editar/:categoria/:id",
            name: "editar",
            params: true,
            component: ()=>import("../views/EditView.vue"),
        },
        {
            path: "/admin/agregar/:categoria",
            name: "agregar",
            params: true,
            component: ()=>import("../views/EditView.vue"),
        },
        {
            path: "/admin/eliminar/:categoria/:id",
            name: "eliminar",
            params: true,
            component: ()=>import("../views/AdminView.vue")
        }
    ]
})

export default router