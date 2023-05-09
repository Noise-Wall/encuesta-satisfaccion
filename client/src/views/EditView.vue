<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import get from "../services/get";
import ins from "../services/insert";
import upd from "../services/update";
import login from "../services/login";
import pop from "../components/popup.js"

// componentes de formulario de edicion
import FormPregunta from "../components/formPregunta.vue";
import FormEncuesta from "../components/formEncuesta.vue";
import Form from "../components/form.vue";

// declarar route para obtener parametros
const route = useRoute();
const router = useRouter();

const isLogin = ref("false");

// control de autorizacion
onMounted(() => {
  if (!route.fullPath.startsWith(login.validateRoute(route)))
    router.push("/login");
  else isLogin.value = true;
});

// obtener la informacion almacenada en el history state,
// si no hay informacion previa (se va a agregar), se agregan solo los campos de titulos.
const modo = ref("");

let currentState;
if (Object.entries(history.state).length < 7) {
  modo.value = "Agregar";
  currentState = computed(() => {
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
          ["idCategoria", ""],
          ["contenidoCategoria", ""],
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
      case "usuario":
        return [
          ["idUsuario", ""],
          ["nombreUsuario", ""],
        ];
    }
  });
} else {
  modo.value = "Editar";
  currentState = Object.entries(history.state).splice(
    6,
    Object.entries(history.state).length
  );
}

// obtener informacion extra, e.g. la lista de categorias cuando se modifiquen las preguntas, la lista de empresas al modificar las encuestas
const extraData = ref({});
async function extraDataGet() {
  if (route.params.categoria === "pregunta") {
    extraData.value = await get.getTabla("/categorias").catch((e) => e.message);
  } else if (route.params.categoria === "encuesta") {
    extraData.value = await get.getTabla("/empresas").catch((e) => e.message);
  }
}
extraDataGet();

async function insertarData() {
  // Se recaba la informacion del formulario y se acomoda
  // en un objeto con FormData API
  let data = Object.fromEntries(
    new FormData(document.querySelector("#form")).entries()
  );
  // filtra la id si no se introdujo ningun parametro
  if (Object.values(data)[0] == "") data = Object.fromEntries(Object.entries(data).filter((key, val) => val !== 0))

  if (route.params.categoria === "usuario") {
    console.log("validando...")
    const res = await validarContrasena(data)
    if (res > 300) {pop.createPopup("La contraseña anterior no es válida."); return}
    console.log("validado")
  }

  // se prepara la ruta y se envia la informacion
  if (modo.value === "Editar") {
    const url = `/${route.params.categoria}s/update/${route.params.id}`;

    await upd.updateTabla(url, data)
      .then((res) => {
        console.log(res)
        console.log(`actualizado`);
        router.push("/admin");
      })
      .catch((e) => {
        console.log(e.message);
      });
  } else {
    const url = `/${route.params.categoria}s`
    await ins.insertTabla(url, data)
      .then((res) => {
        console.log(res)
        console.log(`insertado`);
        router.push("/admin");
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
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
    case "usuario":
      return ["ID Usuario", "Nombre de Usuario", "Contraseña", "Confirmar Contraseña", "Contraseña anterior"];
  }
});

async function validarContrasena(data) {
  const confirmar = document.getElementById('confirmarContrasena').value
  let result = 404;
  let previa = null;
  if (modo.value === 'Editar') {
    previa = document.getElementById('previaContrasena').value
  }
  if (confirmar !== data.contrasena) pop.createPopup("Las contraseñas no son iguales.")
  else result = 202;

  if (previa) await login.check({ idUsuario: data.idUsuario, nombreUsuario: data.nombreUsuario, contrasena: previa }).then(res => {
    result = res.status;
  })
  return result;
}
</script>

<template>
  <section v-if="isLogin">
    <p>{{ modo }} {{ route.params.categoria }}</p>
    <form class="form" id="form" @change="e => e.preventDefault()">
      <FormPregunta v-if="route.params.categoria === 'pregunta'" :currentState="currentState"
        :catData="Object.values(extraData)[0]" />
      <FormEncuesta v-else-if="route.params.categoria === 'encuesta'" :currentState="currentState"
        :empData="Object.values(extraData)[0]" />
      <Form v-else :currentState="currentState" :titulos="titulosArray" />
    </form>
    <button class="boton" @click="insertarData">
      Agregar {{ route.params.categoria }}
    </button>
    <p><router-link to="/admin">Regresar</router-link></p>
  </section>
</template>

<style scoped>
button {
  margin-top: 20px;
  font-size: 1rem;
}
</style>