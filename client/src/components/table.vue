<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { deleteTabla } from "../services/delete.js";
import pop from "./popup";

const route = useRoute();
const router = useRouter();
const params = ref(route.query.cat.toLowerCase());

console.log(params.value);

const props = defineProps({
  tablaTitulos: Array,
  tablaColumnas: String,
  tablaData: Object,
});

// routes to editView with data passed through states
function edit(id, object) {
  const data = object;
  router.push({
    name: "editar",
    state: data,
    params: {
      categoria: params.value,
      id: id,
    },
  });
}

async function eliminar(id, object) {
  const categoriasValidas = [
    "empresas",
    "categorias",
    "preguntas",
    "encuestas",
    "usuarios",
  ];

  if (!categoriasValidas.includes(params.value)) {
    console.log("Error: categoría inválida. Cancelando eliminación.");
    return;
  }

  if (params.value === "encuestas") {
    try {
      await deleteTabla(`/respuestas/delete/group/${id}`);
    } catch (err) {
      pop.createPopup(err.message);
      return;
    }
  }
  try {
    await deleteTabla(`/${params.value}/delete/${id}`);
  } catch (err) {
    pop.createPopup(err.message);
    return;
  }
}

function confirmarBorrado(id, object) {
  console.log("confirmar borrado");
  const data = Object.entries(object);

  const display = `<h3>Atención</h3> 
  
  <b>${
    params.value === "encuestas"
      ? "Se borrarán todos los datos de la siguiente encuesta, incluyendo las respuestas:"
      : "Se borrará el siguiente dato:"
  }</b> <br>
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
          router.push(`/admin?cat=${route.query.cat}&page=1`);
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
          v-if="params === 'encuestas'"
          @click="router.push(`/admin/${params}/${Object.values(parent)[0]}`)"
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

.item-tabla {
  word-wrap: break-word;
  max-height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>