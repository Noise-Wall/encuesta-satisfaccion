<script setup>
import { ref, onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";

// declarar route para obtener parametros
const route = useRoute();

// obtener la informacion almacenada en el history state
let currentState = Object.entries(history.state).splice(
  6,
  Object.entries(history.state).length
);
console.log(currentState);
</script>


<template>
  <section>
    <p>Editar {{ route.params.categoria }}</p>

    <template v-for="item in currentState">
      <label :for="item[0]">{{ item[0] }}</label>
      <input type="text" :name="item[0]" :value="item[1]" />
    </template>

    <router-link to="/">Regresar</router-link>
  </section>
</template>