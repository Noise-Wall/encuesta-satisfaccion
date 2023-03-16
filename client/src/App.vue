<script setup>
// functions & libraries
import { ref } from 'vue'
import { RouterView, RouterLink } from "vue-router"

// components & views
import Navbar from './components/navbar.vue'

const navTitulo=ref('Portal de Administrador');
</script>

<template>
    <Navbar :navTitulo="navTitulo"/>
    <h1 class="whitespace">Encuesta de Satisfaccion</h1>
    <main>
        <RouterView/>
    </main>
</template>