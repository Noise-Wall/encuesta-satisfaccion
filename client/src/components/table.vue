<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  tablaTitulos: Array,
  tablaColumnas: String,
  tablaData: Array,
});

// routes to editView with data passed through states
function edit(key, object) {
  let categoria;
  switch (Object.keys(object)[0]) {
    case 'idEmpresa':
      categoria = 'empresa'
      break;
    case 'idCategoria':
      categoria = 'categoria'
      break;
    case 'idPregunta':
      categoria = 'pregunta'
      break;
    case 'idEncuesta':
      categoria = 'encuesta'
      break;
    case 'idRespuesta':
      categoria = 'respuesta'
      break;
    default:
      console.log('Categoria invalida')
      return
  }
  const data = object
  router.push({
    name: "editar",
    state: data,
    params: { categoria: categoria, id: key },
  });
}
</script>

<template>
  <div class="panel-tabla" :class="tablaColumnas">
    <div class="item-tabla item-tabla-head" v-for="titulo in tablaTitulos">
      {{ titulo }}
    </div>
    <div class="item-tabla item-tabla-head"></div>
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
          class="fa-solid fa-trash-can"
          @click="router.push(`/eliminar/${Object.values(parent)[0]}`)"
        ></i>
      </div>
    </template>
  </div>
</template>