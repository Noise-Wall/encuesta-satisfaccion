<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import get from "../../services/get";

import TablaResumen from "../../components/admin/tableResumen.vue";

const route = useRoute();
const router = useRouter();

const isCanvas = ref(false);
const isTimeout = ref(false);
const encuestas = ref([]);
const encuestaSelected = computed(() =>
  route.query.id ? route.query.id : null
);
const resultados = ref([]);
const resultadosLength = computed(() =>
  resultados.value ? resultados.value.length : 0
);
const datos = ref([]);

onMounted(() => {
  runTimeout();
  getEncuestas();
  if (route.query.id && !isNaN(route.query.id)) {
    getResultados();
    getDatos();
  }
});

watch(encuestaSelected, () => {
  getResultados();
  getDatos();
});

async function getEncuestas() {
  await get.getTabla(`/encuestas`).then((result) => {
    encuestas.value = result.Encuesta;
  });
}

async function getResultados() {
  await get.getTabla(`/respuestas/group/${route.query.id}`).then((result) => {
    resultados.value = Object.values(result)[0];
  });
}

async function getDatos() {
  await get
    .getTabla(`/encuestas/datos/${route.query.id}`)
    .then((result) => (datos.value = Object.values(result)[0]));
}

async function getPDF() {
  await get
    .getPDF(`/encuestas/export/pdf/${route.query.id}`, `Encuesta-${new Intl.DateTimeFormat("es", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }).format(new Date(datos.value.fecha))}.pdf`)
    .catch((e) => console.log(e));
}

function runTimeout() {
  isTimeout.value = false;
  setTimeout(() => (isTimeout.value = true), 5000);
}
</script>

<template>
  <section v-if="encuestas.length < 1 && !isTimeout">
    <div class="cargando"></div>
    <p>Cargando...</p>
  </section>
  <section v-else-if="encuestas.length < 1 && isTimeout">
    Hubo un error al conectar al servicio. Intente de nuevo.
  </section>
  <section v-else>
    <form class="form" id="form">
      <label for="id">Seleccionar encuesta:</label>
      <select
        name="id"
        id="id"
        @change="(e) => router.push(`${route.path}?id=${e.target.value}`)"
      >
        <option value="null">Seleccionar encuesta...</option>
        <option
          v-for="encuesta in encuestas"
          :value="encuesta.idEncuesta"
          :selected="encuesta.idEncuesta == encuestaSelected ? true : false"
        >
          {{
            `Encuesta del ` +
            new Intl.DateTimeFormat("es", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }).format(new Date(encuesta.fecha))
          }}
        </option>
      </select>
    </form>
  </section>
  <section v-if="resultadosLength > 0 && Object.values(datos).length > 0">
    <TablaResumen :resultados="resultados" :datos="datos" />
    <button
      class="boton boton-terminar"
      data-html2canvas-ignore
      @click="getPDF"
      :disabled="isCanvas"
    >
      {{ isCanvas ? "Exportando..." : "Exportar a PDF" }}
    </button>
  </section>

  <section>
    <button class="boton" @click="router.push('/admin')">Regresar</button>
  </section>
</template>