<script setup>
import { ref } from 'vue'

function sacarPromedio(array) {
  let sum = 0;
  console.log(array)
  for (let i = 0; i < array.length; i++) {
    sum += array[i].valor
  }
  return sum / array.length
}


const props = defineProps({
  resultados: Object,
  datos: Object,
});
</script>


<template>
  <div class="intro" id="intro">
    <span>
      <img src="../../public/img/logo.png" alt="logo" class="logo" />
      <h3 style="text-align: right">Encuesta de Satisfacción al Cliente</h3>
    </span>
    <p class="estimado">
      Estimado cliente, nos dirigimos a usted para solicitarle la realización
      del siguiente cuestionario con el propósito de ajustarnos mejor a sus
      necesidades. Su opinión es de gran importancia para nosotros.
    </p>
    <div style="display: flex; justify-content: space-between">
      <label>EMPRESA: {{ datos.Encuesta.nombreEmpresa.toUpperCase() }}</label>
      <label>FECHA:
        {{
          new Intl.DateTimeFormat("es", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(datos.Encuesta.fecha)).toUpperCase()
        }}</label>
    </div>
    <div>
      <label>NOMBRE DEL CONTACTO: {{ datos.Encuesta.nombreContacto.toUpperCase() }}</label>
    </div>
    <div>
      <label>CORREO ELECTRÓNICO: {{ datos.Encuesta.correo.toUpperCase() }}</label>
    </div>
    <p class="continuacion">
      1- A continuación se suministrará una serie de preguntas con el propósito de
      mejorar nuestra calidad de servicio, favor de marcar la opción que
      corresponda a su opinión.
    </p>
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
    <template v-for="(fila, index) in resultados.Respuesta" :key="index">
      <div class="item-tabla full"
        v-if="!resultados.Respuesta[index - 1] || resultados.Respuesta[index - 1].contenidoCategoria !== fila.contenidoCategoria">
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
    <div class="item-tabla full half blanco">{{ sacarPromedio(resultados.Respuesta) }}</div>
    <div class="item-tabla full blanco">2.-Si desea realizar alguna observación sobre el servicio que no hayamos
      contemplado en la encuesta háganos el favor de compartirla:</div>
    <div class="item-tabla full blanco">
      {{
        datos.Encuesta.comentarios || "No hubo observaciones adicionales."
      }}
    </div>
  </div>
  <div class="intro nomargin">
    <p>
      Criterios de Evaluación son los siguientes: Excelente (10 puntos), Bueno (8 puntos), Regular
      (6 puntos), Malo (4 puntos) y Pésimo (2 puntos), se suman los resultados y se saca un promedio.<br />
      Criterio de <b>Aceptación:</b> calificación promedio mayor / igual a 7.<br />
      Criterio de <b>Rechazo:</b> calificación promedio menor a 7
    </p>
  </div>
  <div class="intro">
    <span>
      <label>Ref: PGE-AD-004</label>
      <label>LAQUIN MR S.A. DE C.V.</label>
      <label>F 068</label>
    </span>
    <span>
      <label></label>
      <label>R 04</label>
    </span>
  </div>
</template>

<style scoped>
@import '../../public/css/estilosSumario.css'
</style>