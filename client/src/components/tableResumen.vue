<script setup>
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
    <p>
      Estimado cliente, nos dirigimos a usted para solicitarle la realización
      del siguiente cuestionario con el propósito de ajustarnos mejor a sus
      necesidades. Su opinión es de gran importancia para nosotros.
    </p>
    <div style="display: flex; justify-content: space-between">
      <label>Empresa: {{ datos.Encuesta[0].nombreEmpresa }}</label>
      <label
        >Fecha:
        {{
          new Intl.DateTimeFormat("es", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(datos.Encuesta[0].fecha))
        }}</label
      >
    </div>
    <div>
      <label>Nombre del contacto: {{ datos.Encuesta[0].nombreContacto }}</label>
    </div>
    <div>
      <label>Correo electrónico: {{ datos.Encuesta[0].correo }}</label>
    </div>
    <p style="margin-bottom: -10px">
      A continuación se suministrará una serie de preguntas con el propósito de
      mejorar nuestra calidad de servicio, favor de marcar la opción que
      corresponda a su opinión.
    </p>
  </div>
  <div class="panel-tabla tabla-col6" id="Resultados">
    <div class="item-tabla item-tabla-head">Preguntas</div>
    <div class="item-tabla item-tabla-head">Excelente</div>
    <div class="item-tabla item-tabla-head">Bueno</div>
    <div class="item-tabla item-tabla-head">Regular</div>
    <div class="item-tabla item-tabla-head">Malo</div>
    <div class="item-tabla item-tabla-head">Pésimo</div>
    <template v-for="(fila, index) in resultados.Respuesta" :key="index">
      <div class="item-tabla item-tabla-text">
        {{ fila.contenidoPregunta }}
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
    </template>
    <div class="item-tabla full">Observaciones adicionales:</div>
    <div class="item-tabla full" style="background-color: white">
      {{
        datos.Encuesta[0].comentarios || "No hubo observaciones adicionales."
      }}
    </div>
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
.item-tabla {
  border-radius: 0px;
  color: black;
  font-size: 0.85rem;
}

.item-tabla-head {
  background-color: rgb(125, 125, 255);
  border-top: 0px;
  font-weight: bold;
}

.item-tabla-text {
  text-align: left;
}

.full {
  grid-column: 1 / -1;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 2px;
  background-color: lightgray;
}

.panel-tabla > .boton {
  grid-column: 1 / -1;
}

.intro {
  padding: 35px;
  font-size: 0.85rem;
  text-align: justify;
}

.intro p,
.intro h3,
.intro label {
  color: black;
  font-weight: bold;
}

.intro p {
  text-indent: 35px;
}

.intro h3 {
  font-size: 1rem;
  font-weight: bolder;
}

.intro span {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.intro .logo {
  height: 70px;
}
</style>