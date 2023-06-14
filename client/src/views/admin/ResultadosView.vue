<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import jsPDF from "jspdf";
import get from "../../services/get";
import login from "../../services/login";

// componentes
import TableTrimestres from "../../components/admin/tableTrimestres.vue";

// declarar route para obtener parametros
const route = useRoute();
const router = useRouter();

const isLogin = ref("false");
const isTimeout = ref("false");

function runTimeout() {
  isTimeout.value = false;
  setTimeout(() => (isTimeout.value = true), 3000);
}

// control de autorizacion
onMounted(() => {
  if (!route.fullPath.startsWith(login.validateRoute(route)))
    router.push("/login");
  else isLogin.value = true;

  runTimeout();
  getPreguntas();
  getRespuestas();
});

const preguntas = ref([]);
const respuestas = ref([]);
const year = computed(() => (route.query.year ? route.query.year : null));

watch(year, () => {
  getRespuestas();
});

async function getPreguntas() {
  await get
    .getTabla("/preguntas")
    .then((result) => {
      preguntas.value = result.Pregunta;
    })
    .catch((err) => console.log(err.message));
}

async function getRespuestas() {
  respuestas.value = []
  await get
    .getTabla(`/resultados/data/${year.value}`)
    .then((result) => {
      const respuestasArr = Object.values(result.Data).sort((a, b) => {
        return new Date(a[1].fecha) > new Date(b[1].fecha);
      });

      respuestas.value = respuestasArr;
    })
    .catch((err) => console.log(err.message));
  // console.log(respuestasPorTrimestre(4));
}

function respuestasPorTrimestre(trimestre = 0) {
  let inicio = new Date(`${year.value}-01-01`);
  let fin;
  switch (trimestre) {
    case 1:
      fin = new Date(`${year.value}-04-01`);
      break;
    case 2:
      inicio = new Date(`${year.value}-04-01`);
      fin = new Date(`${year.value}-07-01`);
      break;
    case 3:
      inicio = new Date(`${year.value}-07-01`);
      fin = new Date(`${year.value}-10-01`);
      break;
    case 4:
      inicio = new Date(`${year.value}-10-01`);
      fin = new Date(`${parseInt(year.value) + 1}-01-01`);
      break;
  }
  // Object.values(respuestas.value).forEach(respuesta => console.log(respuesta))
  return Object.values(respuestas.value).filter(
    (respuesta) =>
      new Date(respuesta[1].fecha) >= inicio &&
      new Date(respuesta[1].fecha) < fin
  );
}
// respuestasPorTrimestre(1);
async function exportarXLSX(e) {
  e.target.innerHTML = "Exportando...";
  e.target.disabled = true
  await get
    .getXLSX(`/resultados/${year.value}`, `encuesta-${year.value}.xlsx`)
    .then(() => {
      e.target.innerHTML = "Exportar a archivo Excel";
      e.target.disabled = false
    })
    .catch((err) => console.log(err));
}

function getPromedio(arr) {
  let count = 0
  for (let i in arr) {
    count += arr[i]
  }
  return (count / arr.length).toFixed(2);
}

function formatoFecha(date) {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
}

function tablaColumnas(data) {
  const length = Object.values(data).length;
  console.log("length:", length);

  return "2fr ".padEnd((length + 2) * 4, "1fr ");
}
</script>

<template>
  <section v-if="preguntas.length < 1 && !isTimeout">
    <div class="cargando"></div>
    <p>Cargando...</p>
  </section>
  <section v-else-if="preguntas.length < 1 && isTimeout">
    Hubo un error al conectar al servicio. Intente de nuevo.
  </section>
  <section v-else>
    <form class="form" id="form" @submit="(e) => e.preventDefault()">
      <label for="fecha">Seleccionar periodo:</label>
      <input
        type="number"
        name="fecha"
        min="2000"
        max="2200"
        id="fecha"
        @load="(e) => { e.target.value = new Date().getFullYear()}"
        @change="
          (e) => {
            router.push(`/admin/resultados?year=${e.target.value}`);
          }
        "
      />
    </form>

  <template v-if="Object.values(respuestas).length > 0">
    <div
      
      class="panel-tabla"
      :style="`grid-template-columns: ${tablaColumnas(respuestas[0][0])};`"
    >
      <div class="item-tabla item-tabla-head">1er Trimestre</div>
      <div class="item-tabla item-tabla-head" v-for="(campos, p) in respuestas[0][0]" :index="p">P{{p}}</div>
      <div class="item-tabla item-tabla-head">Prom.</div>
      <template
        v-for="(respuesta, index) in respuestasPorTrimestre(1)"
        :key="index"
      >
        <div class="item-tabla" v-if="!respuesta[0].hasOwnProperty('fecha')">
          Encuesta {{ index + 1 }}
        </div>
        <div
          class="item-tabla"
          v-if="!respuesta[0].hasOwnProperty('fecha')"
          v-for="entry in Object.values(respuesta[0])"
        >
          {{ entry }}
        </div>
        <div class="item-tabla">{{ getPromedio(Object.values(respuesta[0])) }}</div>
      </template>
    </div>
    <div
      class="panel-tabla"
      :style="`grid-template-columns: ${tablaColumnas(respuestas[0][0])};`"
    >
      <div class="item-tabla item-tabla-head">2° Trimestre</div>
      <div class="item-tabla item-tabla-head" v-for="(campos, p) in respuestas[0][0]" :index="p">P{{p}}</div>
      <div class="item-tabla item-tabla-head">Prom.</div>
      <template
        v-for="(respuesta, index) in respuestasPorTrimestre(2)"
        :key="index"
      >
        <div class="item-tabla" v-if="!respuesta[0].hasOwnProperty('fecha')">
          Encuesta {{ index + 1 }}
        </div>
        <div
          class="item-tabla"
          v-if="!respuesta[0].hasOwnProperty('fecha')"
          v-for="entry in Object.values(respuesta[0])"
        >
          {{ entry }}
        </div>
        <div class="item-tabla">{{ getPromedio(Object.values(respuesta[0])) }}</div>
      </template>
    </div>
    <div
      class="panel-tabla"
      :style="`grid-template-columns: ${tablaColumnas(respuestas[0][0])};`"
    >
      <div class="item-tabla item-tabla-head">3° Trimestre</div>
      <div class="item-tabla item-tabla-head" v-for="(campos, p) in respuestas[0][0]" :index="p">P{{p}}</div>
      <div class="item-tabla item-tabla-head">Prom.</div>
      <template
        v-for="(respuesta, index) in respuestasPorTrimestre(3)"
        :key="index"
      >
        <div class="item-tabla" v-if="!respuesta[0].hasOwnProperty('fecha')">
          Encuesta {{ index + 1 }}
        </div>
        <div
          class="item-tabla"
          v-if="!respuesta[0].hasOwnProperty('fecha')"
          v-for="entry in Object.values(respuesta[0])"
        >
          {{ entry }}
        </div>
        <div class="item-tabla">{{ getPromedio(Object.values(respuesta[0])) }}</div>
      </template>
    </div>
    <div
      class="panel-tabla"
      :style="`grid-template-columns: ${tablaColumnas(respuestas[0][0])};`"
    >
      <div class="item-tabla item-tabla-head">4° Trimestre</div>
      <div class="item-tabla item-tabla-head" v-for="(campos, p) in respuestas[0][0]" :index="p">P{{p}}</div>
      <div class="item-tabla item-tabla-head">Prom.</div>
      <template
        v-for="(respuesta, index) in respuestasPorTrimestre(4)"
        :key="index"
      >
        <div class="item-tabla" v-if="!respuesta[0].hasOwnProperty('fecha')">
          Encuesta {{ index + 1 }}
        </div>
        <div
          class="item-tabla"
          v-if="!respuesta[0].hasOwnProperty('fecha')"
          v-for="entry in Object.values(respuesta[0])"
        >
          {{ entry }}
        </div>
        <div class="item-tabla">{{ getPromedio(Object.values(respuesta[0])) }}</div>
      </template>
    </div>
    </template>

    <p v-else> No se encontraron encuestas en este año.</p>
    <button class="boton" @click="(e) => exportarXLSX(e)">
      Exportar a archivo Excel
    </button>
  </section>
  <section>
    <button class="boton" @click="router.push('/admin')">Regresar</button>
  </section>
</template>

<style scoped>
.flex-tablas {
  display: flex;
  flex-direction: row;
  flex: auto;
  gap: 10px;
  margin: 10px;
}
</style>