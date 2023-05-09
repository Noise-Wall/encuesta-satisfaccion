<script setup>
import get from "../services/get";
import del from "../services/delete";
import pop from "../components/popup"
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import TablaResumen from "../components/tableResumen.vue";

const route = useRoute();
const router = useRouter();

const isTimeout = ref(false);
const isCanvas = ref(false);

const resultados = ref({});
const datos = ref({});
const resultadosLength = ref(0);
const datosLength = ref(0);

const getResultados = async () => {
  await get
    .getTabla(`/respuestas/group/${route.params.id}`)
    .then((res) => {
      resultados.value = res;
      resultadosLength.value = Object.values(resultados.value.Respuesta).length;
    })
    .catch((e) => console.log(e.message));
};

const getDatos = async () => {
  await get
    .getTabla(`/encuestas/datos/${route.params.id}`)
    .then((res) => {
      datos.value = res;
      datosLength.value = Object.values(datos.value.Encuesta).length;
    })
    .catch((e) => console.log(e.message));
};

function createPDF() {
  isCanvas.value = true
  const doc = new jsPDF("p", "px");
  const section = document.getElementById("intro").parentElement;
  section.parentElement.style.backgroundColor = "#fcfcfc";
  // section.style.backgroundColor = "#fcfcfc";
  section.style.border = "0px";
  section.style.boxShadow = "none";
  const options = {
    // allowTaint: true,
    scale: 1,
    windowWidth: 795,
    removeContainer: true,
  };
  html2canvas(section, options).then(function (canvas2) {
    const imgData = canvas2.toDataURL("image/png");
    isCanvas.value = false
    doc.addImage(imgData, "PNG", 20, 10);
    // doc.fill()
    doc.save(`${datos.value.Encuesta[0].nombreEmpresa.replace(" ", "-")}_${datos.value.Encuesta[0].fecha.replace(" ", "-")}.pdf`);
  });
}

async function eliminar() {
  const id = route.params.id
  try {
    try {
      await del.deleteTabla(`/respuestas/delete/group/${id}`)
      await del.deleteTabla(`/encuestas/delete/${id}`)
    } catch (err) {
      pop.createPopup(err.message)
    }
    pop.createPopup("Encuesta eliminada.", e => {
      router.push('/admin'); e.target.parentElement.parentElement.remove()
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  setTimeout(() => {
    isTimeout.value = true;
  }, 3000);
  getResultados();
  getDatos();
});
</script>

<template>
  <section>
    <template v-if="datos && datosLength > 0 && resultados && resultadosLength">
      <TablaResumen :resultados="resultados" :datos="datos" />
      <button class="boton boton-terminar" data-html2canvas-ignore @click="createPDF" :disabled="isCanvas">
        {{ isCanvas ? 'Exportando...' : 'Exportar a PDF' }}
      </button>
    </template>
    <template v-else-if="!isTimeout && (datosLength < 1 || resultadosLength < 1)">
      <p class="cargando"></p>
      <p>Cargando...</p>
    </template>
    <template v-else-if="!datos || datosLength < 1">
      <p>La encuesta que intenta acceder no existe.</p>
    </template>
    <template v-else>
      <p>La encuesta que intenta acceder no tiene ningún valor.</p>
      <button class="boton boton-eliminar" @click="eliminar">Eliminar encuesta</button>
    </template>
  </section>
  <section>
    <button class="boton" @click="router.push('/admin')">Regresar</button>
  </section>
</template>