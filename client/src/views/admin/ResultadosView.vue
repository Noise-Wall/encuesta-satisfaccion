<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import jsPDF from "jspdf";
import autoTable, { Table } from "jspdf-autotable";
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
});

const preguntas = ref([]);
const respuestas = ref([]);

const tablaExport = ref([]);

async function getPreguntas() {
  await get
    .getTabla("/preguntas")
    .then((result) => {
      preguntas.value = result.Pregunta;
    })
    .catch((e) => console.log(e));
}
getPreguntas();

async function getRespuestas(e) {
  e.target.innerHTML = "Exportando...";
  const idPregunta = document.getElementById("id").value;
  const fecha = document.getElementById("fecha").value;
  const trimestres = [];

  if (fecha && !isNaN(fecha)) {
    for (let i = 1; i <= 4; i++) {
      await get
        .getTabla(`/preguntas/respuestas/${idPregunta}/${fecha}/${i}`)
        .then((result) => {
          trimestres.push(result.Pregunta);
        })
        .catch((e) => console.log(e));
    }
    // Se obtiene un arreglo con el maximo de valores disponibles
    let csv = getLargestIndex(trimestres);

    // Formato vertical de los datos
    trimestres.forEach((trimestre) => {
      for (let i = 0; i < csv.length; i++) {
        if (trimestre[i]) {
          csv[i].push(
            `\"${trimestre[i].valor}\",\"${formatoFecha(
              new Date(trimestre[i].fecha)
            )}\"`
          );
        } else csv[i].push("\"\",\"\"");
      }
    });

    // Se anexan promedios al fondo
    let promedios = trimestres.map(trimestre => `\"${getPromedio(trimestre)}\",\"\"`)
    csv.push(promedios)

    // Se prepara el documento csv
    const headerString = `\"${fecha}\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"\n\"C1\",\"\","C2\",\"\","C3\",\"\","C4\",\"\"\n`
    const csvString =
      "data:text/csv;charset=utf-8," + headerString + csv.map((e) => e.join(",")).join("\n");

    // Se exporta
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = encodeURI(csvString)
    a.download = `${fecha}.csv`;
    a.click();

    // respuestas.value = trimestres
    e.target.innerHTML = "Generar tabla";
    return;
  }
}

async function generateTabla() {
  tablaExport.value = [];
  const doc = new jsPDF();
  respuestas.value.forEach((res) => {
    const list = [];
    res.forEach((e) => {
      list.push(Object.values(e));
    });
    tablaExport.value.push(list);
  });
  console.log(tablaExport.value);

  return;

  // autoTable(doc, { columns: [{header: "Valor", dataKey: "valor"}, {header: "Fecha", dataKey: "fecha"}],body: tablaExport.value })

  const a = document.createElement("a");
  a.target = "_blank";
  // a.href=encodeUri
  a.href = doc.output("bloburl");
  a.click();
}

function getLargestIndex(array) {
  let length = 0;
  let newArray = [];
  array.forEach(
    (item) => (length = item.length > length ? item.length : length)
  );
  for (let i = 0; i < length; i++) {
    newArray.push([]);
  }
  return newArray;
}

function getPromedio(arr) {
    let resultado = arr.reduce((count, respuesta) => count + respuesta.valor, 0);
    return (resultado / arr.length).toFixed(2)
}

function formatoFecha(date) {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
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
    <form class="form" id="form">
      <label for="id">Seleccionar pregunta:</label>
      <select name="id" id="id">
        <option v-for="pregunta in preguntas" :value="pregunta.idPregunta">
          {{ pregunta.contenidoPregunta }}
        </option>
      </select>
      <label for="fecha">Seleccionar periodo:</label>
      <input
        type="number"
        name="fecha"
        min="2000"
        max="2100"
        value="2023"
        id="fecha"
      />
    </form>

    <div v-if="respuestas.length > 0" class="flex-tablas">
      <TableTrimestres
        :respuestas="respuestas[0]"
        v-if="respuestas[0].length > 0"
        >Trimestre 1</TableTrimestres
      >
      <TableTrimestres
        :respuestas="respuestas[1]"
        v-if="respuestas[1].length > 0"
        >Trimestre 2</TableTrimestres
      >
      <TableTrimestres
        :respuestas="respuestas[2]"
        v-if="respuestas[2].length > 0"
        >Trimestre 3</TableTrimestres
      >
      <TableTrimestres
        :respuestas="respuestas[3]"
        v-if="respuestas[3].length > 0"
        >Trimestre 4</TableTrimestres
      >
    </div>
    <button class="boton" @click="generateCsv" v-if="respuestas.length > 0">
      Exportar
    </button>

    <button class="boton" @click="(e) => getRespuestas(e)">
      Generar tabla y exportar
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