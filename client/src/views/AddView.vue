<script setup>
import { ref, computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import get from "../services/get";

// componentes
import Form from "../components/form.vue";
import FormPregunta from "../components/formPregunta.vue";

const route = useRoute();
const state = computed(() => {
  switch (route.params.categoria) {
    case "empresa":
      return [
        ["idEmpresa", ""],
        ["nombreEmpresa", ""],
        ["nombreContacto", ""],
        ["correo", ""],
      ];
    case "categoria":
      return [
        ["idCategoría", ""],
        ["contenidoCategoría", ""],
      ];
    case "pregunta":
      return [
        ["idPregunta", ""],
        ["contenidoPregunta", ""],
        ["idCategoria", ""],
        ["deshabilitada", ""],
      ];
    case "encuesta":
      return [
        ["idEncuesta", ""],
        ["fecha", ""],
        ["comentarios", ""],
        ["idEmpresa", ""],
      ];
    case "respuesta":
      return [
        ["ID Respuesta", ""],
        ["Valor", ""],
      ];
  }
});
const titulos = computed(() => {
  switch (route.params.categoria) {
    case "empresa":
      return [
        "ID Empresa",
        "Nombre de la empresa",
        "Nombre contacto",
        "Correo electrónico",
      ];
    case "categoria":
      return ["ID Categoría", "Contenido de la categoría"];
    case "encuesta":
      return ["ID Encuesta", "Fecha de la encuesta", "Comentarios", "Empresa"];
    case "respuesta":
      return ["ID Respuesta", "Valor"];
  }
});

const extraData = ref([]);
if (route.params.categoria === "pregunta") {
  const temp = {};
  Promise.all([get.getCategorias(temp)]).then(
    () => (extraData.value = temp.data)
  );
}
</script>


<template>
  <section>
    <p>Agregar {{ route.params.categoria }}</p>
    <form class="form" id="form">
      <FormPregunta
        v-if="route.params.categoria === 'pregunta'"
        :currentState="state"
        :catData="extraData"
      />
      <Form v-else :currentState="state" :titulos="titulos" />
    </form>
    <button class="boton">Agregar {{ route.params.categoria }}</button>
    <p><router-link to="/">Regresar</router-link></p>
  </section>
</template>

<style scoped>
button {
  margin-top: 20px;
  font-size: 1rem;
}
</style>