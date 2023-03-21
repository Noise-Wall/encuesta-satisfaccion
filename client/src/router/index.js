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
            path: "/edit/:categoria/:id",
            name: "edit",
            params: true,
            component: ()=>import("../views/EditView.vue"),
        },
    ]
})

export default router