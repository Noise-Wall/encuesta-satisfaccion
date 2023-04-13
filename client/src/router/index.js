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
            path: "/encuesta/:id",
            name: "encuesta",
            component: ()=>import("../views/EncuestaView.vue")
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
        },
        {
            path: "/admin/encuesta/:id",
            name: "encuesta",
            params: true,
            component: ()=>import("../views/SumarioView.vue")
        },
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: (()=>import("../views/404View.vue"))
        }
    ]
})

export default router