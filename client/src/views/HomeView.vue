<script setup>
import { ref } from 'vue'

const categoria = ref('');
function setCategoria (e) {
    categoria.value = e.target.innerHTML
    console.log(categoria.value)
}
</script>

<template>
    <section>
    <p>Seleccionar una categoría:</p>
    <ul class="menu">
        <li @click="setCategoria">Preguntas</li>
        <li @click="setCategoria">Categorias</li>
        <li @click="setCategoria">Empresas</li>
        <li @click="setCategoria">Encuestas</li>
        <li @click="setCategoria">Respuestas</li>
    </ul>
    </section>
    <section v-if="categoria.value">
        <h1>{{ categoria.value }}</h1>
    </section>
</template>