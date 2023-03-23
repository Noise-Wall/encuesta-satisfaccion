<script setup>
import { ref, computed } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import update from "../services/update";
import get from "../services/get";

// componentes de formulario de edicion
import FormPregunta from "../components/formPregunta.vue";
import Form from "../components/form.vue";

// declarar route para obtener parametros
const route = useRoute();
const router = useRouter();

// obtener la informacion almacenada en el history state
let currentState = Object.entries(history.state).splice(
  6,
  Object.entries(history.state).length
);

// obtener informacion extra, e.g. la lista de categorias cuando se modifiquen las preguntas, la lista de empresas al modificar las encuestas
const extraData = ref([]);
if (route.params.categoria === "pregunta") {
  const temp = {};
  Promise.all([get.getCategorias(temp)]).then(
    () => (extraData.value = temp.data)
  );
}

async function actualizar() {
  // Se recaba la informacion del formulario y se acomoda
  // en un objeto con FormData API
  let data = Object.fromEntries(
    new FormData(document.querySelector("#form")).entries()
  );

  const temp = {};

  // Se recaba la informacion
  Promise.all([
    update.updateTabla(
      `/${route.params.categoria}s/update/${route.params.id}`,
      JSON.parse(JSON.stringify(data)),
      temp
    ),
  ])
    .then(() => {
      console.log(`actualizado`);
      router.push("/");
    })
    .catch((e) => {
      console.log(e.message);
    });
}

const titulosArray = computed(() => {
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
      return ['ID Respuesta','Valor'];
  }
});
</script>

<template>
  <section>
    <p>Editar {{ route.params.categoria }}</p>
    <form class="form" id="form">
      <FormPregunta
        v-if="route.params.categoria === 'pregunta'"
        :currentState="currentState"
        :catData="extraData"
      />
      <Form v-else :currentState="currentState" :titulos="titulosArray" />
    </form>
    <button class="boton" @click="actualizar">
      Actualizar {{ route.params.categoria }}
    </button>
    <p><router-link to="/">Regresar</router-link></p>
  </section>
</template>

<style scoped>
button {
  margin-top: 20px;
  font-size: 1rem;
}
</style>