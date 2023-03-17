<script setup>
import { ref } from "vue";
import Tabla from "../components/table.vue";
import Empresas from "../services/servEmpresas";
import Categorias from "../services/servCategorias";
import Preguntas from "../services/servPreguntas";
import Encuestas from "../services/servEncuestas";
import Respuestas from "../services/servRespuestas";

const categoria = ref("");
let jsonData = ref([]);
const tablaColumnas = ref("");
let tablaTitulos = ref([]);

async function setCategoria(e) {
  const temp = {};

  categoria.value = e.target.innerHTML;
  jsonData.value = [];

  switch (categoria.value) {
    case "Empresas":
      Promise.all([Empresas.getEmpresas(temp)]).then(
        () => (jsonData.value = temp.data)
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
      Promise.all([Categorias.getCategorias(temp)]).then(
        () => (jsonData.value = temp.data)
      );
      tablaColumnas.value = "tabla-col3";
      tablaTitulos.value = ["ID", "Contenido"];
      return;
    case "Preguntas":
      Promise.all([Preguntas.getPreguntas(temp)]).then(
        () => (jsonData.value = temp.data)
      );
      tablaColumnas.value = "tabla-col5";
      tablaTitulos.value = [
        "ID",
        "Contenido",
        "Categoria",
        "Habilitada",
      ];
      return;
    case "Encuestas":
    Promise.all([Encuestas.getEncuestas(temp)]).then(
        () => (jsonData.value = temp.data)
      );
      tablaColumnas.value = "tabla-col5";
      tablaTitulos.value = ["ID", "Fecha", "Comentarios","Empresa"];
      return;
    case "Respuestas":
        Promise.all([Respuestas.getRespuestas(temp)]).then(
        () => (jsonData.value = temp.data)
      );
      tablaColumnas.value = "tabla-col3";
      tablaTitulos.value = ["ID", "Valor"];
      return;
    case "Resultados":
      return;
  }
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
    <p :style="'font-weight: bold;'">{{ categoria }}</p>
    <template v-if="jsonData.length > 0">
      <Tabla
        :tablaTitulos="tablaTitulos"
        :tablaColumnas="tablaColumnas"
        :tablaData="jsonData"
      />
    </template>
    <template v-else>
      <div class="cargando"></div>
      <p>Cargando...</p>
    </template>
  </section>
</template>