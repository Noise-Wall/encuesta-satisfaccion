<script setup>
import { ref, computed } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import get from "../services/get";
import insert from "../services/insert";
import update from "../services/update";

// componentes de formulario de edicion
import FormPregunta from "../components/formPregunta.vue";
import FormEncuesta from "../components/formEncuesta.vue";
import Form from "../components/form.vue";

// declarar route para obtener parametros
const route = useRoute();
const router = useRouter();

// obtener la informacion almacenada en el history state
const modo = ref('');

let currentState;
if (Object.entries(history.state).length < 7) {
  modo.value = "Agregar"
  currentState = computed(()=> {
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
  }})
} else {
  modo.value = "Editar"
  currentState = Object.entries(history.state).splice(
    6,
    Object.entries(history.state).length
  );
}

// obtener informacion extra, e.g. la lista de categorias cuando se modifiquen las preguntas, la lista de empresas al modificar las encuestas
const extraData = ref([]);
if (route.params.categoria === "pregunta") {
  const temp = {};
  Promise.all([get.getCategorias(temp)]).then(
    () => (extraData.value = temp.data)
  );
} else if (route.params.categoria === "encuesta") {
  const temp = {};
  Promise.all([get.getEmpresas(temp)]).then(
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

async function agregar () {
  // similar a la funcion actualizar 
  let data = Object.fromEntries(
    new FormData(document.querySelector("#form")).entries()
  );

  const temp = {};

  // Se recaba la informacion
  Promise.all([
    insert.insertTabla(
      `/${route.params.categoria}s`,
      JSON.parse(JSON.stringify(data)),
      temp
    ),
  ])
    .then(() => {
      console.log(`insertado`);
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
    <p>{{modo}} {{ route.params.categoria }}</p>
    <form class="form" id="form">
      <FormPregunta
        v-if="route.params.categoria === 'pregunta'"
        :currentState="currentState"
        :catData="extraData"
      />
      <FormEncuesta
        v-else-if="route.params.categoria === 'encuesta'"
        :currentState="currentState"
        :catData="extraData"
      />
      <Form v-else :currentState="currentState" :titulos="titulosArray" />
    </form>
    <button v-if="modo=='Editar'" class="boton" @click="actualizar">
      Actualizar {{ route.params.categoria }}
    </button>
    <button v-else class="boton" @click="agregar">Agregar {{ route.params.categoria }}</button>
    <p><router-link to="/">Regresar</router-link></p>
  </section>
</template>

<style scoped>
button {
  margin-top: 20px;
  font-size: 1rem;
}
</style>