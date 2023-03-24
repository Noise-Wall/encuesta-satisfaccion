<script setup>
// functions & libraries
import { ref } from 'vue'
import { RouterView, RouterLink, useRoute } from "vue-router"

// components & views
import Navbar from './components/navbar.vue'

const route = useRoute();
console.log(route.fullPath)

let navTitulo=ref('')
if(!route.fullPath.startsWith('/admin')) {
    navTitulo.value = "Encuesta de Satisfacción"
}
else {
    navTitulo.value='Portal de Administrador';
}
</script>

<template>
    <Navbar :navTitulo="navTitulo"/>
    <h1 class="whitespace">Encuesta de Satisfaccion</h1>
    <main>
        <RouterView/>
    </main>
</template>