<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  tablaTitulos: Array,
  tablaColumnas: String,
  tablaData: Array,
});
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
          @click="router.push(`/edit/${Object.values(parent)[0]}`)"
        ></i>
        <i
          class="fa-solid fa-trash-can"
          @click="router.push(`/eliminar/${Object.values(parent)[0]}`)"
        ></i>
      </div>
    </template>
  </div>
</template>