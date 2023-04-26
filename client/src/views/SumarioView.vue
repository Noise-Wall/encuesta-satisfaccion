<script setup>
import get from "../services/get";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import TablaResumen from "../components/tableResumen.vue";

const route = useRoute();
const router = useRouter();

const isTimeout = ref(false);

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
      // console.log(res.Encuesta[0])
      datos.value = res;
      datosLength.value = Object.values(datos.value.Encuesta).length;
    })
    .catch((e) => console.log(e.message));
};

function createPDF() {
  const doc = new jsPDF("p", "mm");
  const section = document.getElementById("intro").parentElement;
  section.style.border = "0px";
  const options = {
    backgroundColor: null,
    // logging: false,
    scale: 0.9,
    windowWidth: 855,
  };
  html2canvas(section, options).then(function (canvas2) {
    const imgData = canvas2.toDataURL("image/png");
    doc.addImage(imgData, "PNG", 10, 0);
    doc.save("test.pdf");
  });
}

async function eliminar() {
  const id = route.params.id
  await del.deleteTabla(`/${params}s/delete/${id}`);
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
      <button
        class="boton boton-terminar"
        data-html2canvas-ignore
        @click="createPDF"
      >
        Exportar a PDF
      </button>
    </template>
    <template
      v-else-if="!isTimeout && (datosLength < 1 || resultadosLength < 1)"
    >
      <p class="cargando"></p>
      <p>Cargando...</p></template
    >
    <template v-else-if="!datos || datosLength < 1">
      <p>La encuesta que intenta acceder no existe.</p>
    </template>
    <template v-else>
      <p>La encuesta que intenta acceder no tiene ningún valor.</p>
      <button class="boton boton-eliminar">Eliminar encuesta</button>
    </template>
  </section>
  <section>
    <button class="boton" @click="router.push('/admin')">Regresar</button>
  </section>
</template>