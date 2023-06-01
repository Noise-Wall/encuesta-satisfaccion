<script setup>
import { ref } from 'vue'

function sacarPromedio(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i].valor
  }
  return sum / array.length
}

const props = defineProps({
  resultados: Array,
  datos: Object,
});
</script>


<template>
    <div style="display: flex; justify-content: space-between">
      <label>EMPRESA: {{ datos.nombreEmpresa.toUpperCase() }}</label>
      <label>FECHA:
        {{
          new Intl.DateTimeFormat("es", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(datos.fecha)).toUpperCase()
        }}</label>
    </div>
    <div>
      <label>NOMBRE DEL CONTACTO: {{ datos.nombreContacto.toUpperCase() }}</label>
    </div>
    <div>
      <label>CORREO ELECTRÓNICO: {{ datos.correo.toUpperCase() }}</label>
    </div>

  <div class="panel-tabla tabla-col8" id="Resultados">
    <div class="item-tabla item-tabla-head">Preguntas</div>
    <div class="item-tabla item-tabla-head">Excelente (10)</div>
    <div class="item-tabla item-tabla-head">Bueno (8)</div>
    <div class="item-tabla item-tabla-head">Regular (6)</div>
    <div class="item-tabla item-tabla-head">Malo (4)</div>
    <div class="item-tabla item-tabla-head">Pésimo (2)</div>
    <div class="item-tabla item-tabla-head">N/A</div>
    <div class="item-tabla item-tabla-head">CALIFICACIÓN POR ATRIBUTO</div>
    <template v-for="(fila, index) in resultados" :key="index">
      <div class="item-tabla full"
        v-if="!resultados[index - 1] || resultados[index - 1].contenidoCategoria !== fila.contenidoCategoria">
        {{ fila.contenidoCategoria.toUpperCase() }}
      </div>
      <div class="item-tabla item-tabla-text">
        {{ index + 1 }}- {{ fila.contenidoPregunta }}
      </div>
      <div class="item-tabla">
        <i class="fa fa-check" v-if="fila.valor === 10"></i>
      </div>
      <div class="item-tabla">
        <i class="fa fa-check" v-if="fila.valor === 8"></i>
      </div>
      <div class="item-tabla">
        <i class="fa fa-check" v-if="fila.valor === 6"></i>
      </div>
      <div class="item-tabla">
        <i class="fa fa-check" v-if="fila.valor === 4"></i>
      </div>
      <div class="item-tabla">
        <i class="fa fa-check" v-if="fila.valor === 2"></i>
      </div>
      <div class="item-tabla">
        <i class="fa fa-check" v-if="fila.valor === null"></i>
      </div>
      <div class="item-tabla">
        {{ fila.valor }}
      </div>
    </template>
    <div class="item-tabla" style="font-weight: bold; text-align: left">
      CALIFICACIÓN (PROMEDIO)
    </div>
    <div class="item-tabla full half blanco">{{ sacarPromedio(resultados) }}</div>
    <div class="item-tabla full blanco">2.-Si desea realizar alguna observación sobre el servicio que no hayamos
      contemplado en la encuesta háganos el favor de compartirla:</div>
    <div class="item-tabla full blanco">
      {{
        datos.comentarios || "No hubo observaciones adicionales."
      }}
    </div>
  </div>

</template>

<style scoped>
@import '../../../public/css/estilosSumario.css'
</style>