<script setup>
// functions & libraries
import { ref } from 'vue'
import { RouterView, RouterLink, useRoute, useRouter } from "vue-router"

const route = useRoute()
// components & views
import Navbar from './components/navbar.vue'

let navTitulo = ref('')
if (route.fullPath.startsWith('/admin')) {
    navTitulo.value = 'Portal de Administrador';
}
else if (route.fullPath.startsWith('/login')) {
    console.log(document.cookie)
    console.log(token.getToken('token'))
    navTitulo.value = 'Portal de Administrador';
}
else {
    navTitulo.value = "Encuesta de Satisfacción"
}
</script>

<template>
    <Navbar :navTitulo="navTitulo" />
    <h1 class="whitespace">Encuesta de Satisfaccion</h1>
    <main>
        <RouterView />
    </main>
</template>