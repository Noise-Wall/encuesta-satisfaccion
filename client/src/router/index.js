import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
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
            params: true,
            component: ()=>import("../views/admin/AdminView.vue")
        },
        {
            path: "/admin/editar/:categoria/:id",
            name: "editar",
            params: true,
            component: ()=>import("../views/admin/EditView.vue"),
        },
        {
            path: "/admin/agregar/:categoria",
            name: "agregar",
            params: true,
            component: ()=>import("../views/admin/EditView.vue"),
        },
        {
            path: "/admin/eliminar/:categoria/:id",
            name: "eliminar",
            params: true,
            component: ()=>import("../views/admin/AdminView.vue")
        },
        {
            path: "/admin/encuestas",
            name: "resumen",
            params: true,
            component: ()=>import("../views/admin/ResultadosSelectView.vue")
        },
        {
            path: "/admin/pregunta",
            name: "preguntas",
            component: ()=>import("../views/admin/ResultadosView.vue")
        },
        {
            path: "/encuesta/:id",
            name: "encuesta",
            component: ()=>import("../views/encuesta/EncuestaView.vue")
        },
        {
            path: "/encuesta/error",
            name: "errorEncuesta",
            component: ()=>import("../views/encuesta/404EncuestaView.vue")
        },
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: (()=>import("../views/404View.vue"))
        }
    ]
})

export default router