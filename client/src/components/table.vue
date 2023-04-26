<script setup>
import { useRouter } from "vue-router";
import del from "../services/delete.js";
import pop from "./popup";
const router = useRouter();

const props = defineProps({
  tablaTitulos: Array,
  tablaColumnas: String,
  tablaData: Object,
});

function parametros(string) {
  switch (string) {
    case "idEmpresa":
      return "empresa";
    case "idCategoria":
      return "categoria";
    case "idPregunta":
      return "pregunta";
    case "idEncuesta":
      return "encuesta";
    case "idRespuesta":
      return "respuesta";
    default:
      console.log("Categoria invalida");
      return;
  }
}
// routes to editView with data passed through states
function edit(id, object) {
  const data = object;
  router.push({
    name: "editar",
    state: data,
    params: { categoria: parametros(Object.keys(object)[0]), id: id },
  });
}

async function eliminar(id, object) {
  const params = parametros(Object.keys(object)[0]);
  console.log(params);
  if (params === "encuesta") {
    await del.deleteTabla(`/respuestas/delete/group/${id}`);
  } else {
    await del.deleteTabla(`/${params}s/delete/${id}`);
  }
}

function confirmarBorrado(id, object) {
  console.log("confirmar borrado");
  const data = Object.entries(object);

  const display = `<h3>Atención</h3> 
  
  <b>${parametros(Object.keys(object)[0])==="encuesta"?"Se borrarán todos los datos de la siguiente encuesta, incluyendo las respuestas:":"Se borrará el siguiente dato:"}</b> <br>
  <br>${data[0][0]}: ${data[0][1]}
  <br>${data[1][0]}: ${data[1][1]}

  <br><br>Para continuar, clic en el boton de Aceptar.
  `;

  pop.createPopup(
    display,
    async (e) => {
      await eliminar(id, object)
        .then(() => {
          e.target.parentElement.parentElement.remove();
          window.location.reload();
        })
        .catch((e) => console.log(e.message));
    },
    "boton-eliminar"
  );
}
</script>

<template>
  <div class="panel-tabla" :class="tablaColumnas">
    <!-- render de titulos -->
    <div class="item-tabla item-tabla-head" v-for="titulo in tablaTitulos">
      {{ titulo }}
    </div>
    <div class="item-tabla item-tabla-head"></div>
    <!-- render de datos -->
    <template v-for="(parent, index) in tablaData">
      <div class="item-tabla" v-for="child in parent">
        {{ child }}
      </div>
      <div class="item-tabla actions">
        <i
          class="fa-solid fa-file-pen"
          @click="edit(Object.values(parent)[0], parent)"
        ></i>
        <i
          class="fa-solid fa-eye"
          v-if="parametros(Object.keys(parent)[0]) === 'encuesta'"
          @click="router.push(`/admin/encuesta/${Object.values(parent)[0]}`)"
        ></i>
        <i
          class="fa-solid fa-trash-can"
          @click="confirmarBorrado(Object.values(parent)[0], parent)"
        ></i>
      </div>
    </template>
  </div>
</template>

<style>
.actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>