<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Tabla from "../components/table.vue";
import get from "../services/get";

const router = useRouter();

const categoria = ref("");
let jsonData = ref([]);
const queryCompletada = ref(false)
const tablaColumnas = ref("");
let tablaTitulos = ref([]);

async function setCategoria(e) {
  const temp = {};
  queryCompletada.value = false;
  categoria.value = e.target.innerHTML;
  jsonData.value = [];

  switch (categoria.value) {
    case "Empresas":
      Promise.all([get.getEmpresas(temp)]).then(
        () => {
          jsonData.value = temp.data
          queryCompletada.value = true
        }
      );
      tablaColumnas.value = "tabla-col5";
      tablaTitulos.value = [
        "ID",
        "Nombre Empresa",
        "Nombre Contacto",
        "Correo",
      ];
      return;
    case "Categorias":
      Promise.all([get.getCategorias(temp)]).then(
        () => {
          jsonData.value = temp.data
          queryCompletada.value = true
        }
      );
      tablaColumnas.value = "tabla-col3";
      tablaTitulos.value = ["ID", "Contenido"];
      return;
    case "Preguntas":
      Promise.all([get.getPreguntas(temp)]).then(
        () => {
          jsonData.value = temp.data
          queryCompletada.value = true
        }
      );
      tablaColumnas.value = "tabla-col5";
      tablaTitulos.value = ["ID", "Contenido", "Categoria", "Habilitada"];
      return;
    case "Encuestas":
      Promise.all([get.getEncuestas(temp)]).then(
        () => {
          jsonData.value = temp.data
          queryCompletada.value = true
        }
      );
      tablaColumnas.value = "tabla-col5";
      tablaTitulos.value = ["ID", "Fecha", "Comentarios", "Empresa"];
      return;
    case "Respuestas":
      Promise.all([get.getRespuestas(temp)]).then(
        () => {
          jsonData.value = temp.data
          queryCompletada.value = true
        }
      );
      tablaColumnas.value = "tabla-col5";
      tablaTitulos.value = ["ID", "Valor", "ID Pregunta", "ID Encuesta"];
      return;
    default:
      categoria.value = "";
      return;
  }
}

function agregar() {
  router.push({
    name: "agregar",
    params: { categoria: categoria.value.toLowerCase().slice(0, -1) },
  });
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
  <section v-if="categoria">
    <p :style="'font-weight: bold;'" id="categoriaLabel">{{ categoria }}</p>
    <template v-if="jsonData.length > 0">
      <Tabla :tablaTitulos="tablaTitulos" :tablaColumnas="tablaColumnas" :tablaData="jsonData" />
    </template>
    <template v-else>
      <div class="cargando"></div>
      <p>Cargando...</p>
    </template>
    <button class="boton" @click="agregar">
      <h1>+</h1>
    </button>
  </section>
  <section>
    <button class="boton" @click="router.push('/')">Regresar al inicio</button>
  </section>
</template>