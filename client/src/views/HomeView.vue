<script setup>
import { ref } from 'vue';
import encuestaInfo from '../components/encuestaInfo.vue'
import encuestaDatos from '../components/encuestaDatos.vue'

const comenzado = ref(false)
function comenzar() {
    console.log("comenzar")
    comenzado.value = true
}
</script>

<template>
    <encuestaInfo :comenzar="comenzar" v-if="!comenzado"/>
    <encuestaDatos v-else/>
</template>