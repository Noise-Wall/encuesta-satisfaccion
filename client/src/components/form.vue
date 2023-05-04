<script setup>
import { ref } from 'vue'

const props = defineProps({
  currentState: Array,
  titulos: Array,
});

const isUsuarioEdit = ref(true)

function setUsuarioEdit(string) {
  isUsuarioEdit.value = string !== ""
  return ""
}
</script>


<template>
  {{ setUsuarioEdit(currentState[1][1]) }}
  <template v-for="(item, index) in currentState">
    <label :for="item[0]" :class="'form-item'">{{ titulos[index] }}</label>
    <input type="text" :name="item[0]" :value="item[1]" :class="'form-item'" :required="!item[0].startsWith('id')"
      :placeholder="!item[0].startsWith('id') ? 'Campo obligatorio' : ''" />
  </template>
  <template v-if="titulos[0].toLowerCase().includes('usuario')">
    <label for="contrasena">Contraseña{{ isUsuarioEdit ? ' nueva' : '' }}</label>
    <input type="password" name="contrasena" class="form-item"
      :placeholder="isUsuarioEdit ? 'En caso de querer cambiar contraseña' : 'Campo obligatorio'">
    <label for="confirmarContrasena">Confirmar contraseña{{ isUsuarioEdit ? ' nueva' : '' }}</label>
    <input type="password" id="confirmarContrasena" class="form-item"
      :placeholder="isUsuarioEdit ? 'En caso de querer cambiar contraseña' : 'Campo obligatorio'">
    <template v-if="isUsuarioEdit">
      <label for="previaContrasena">Introducir previa contraseña</label>
      <input type="password" id="previaContrasena" class="form-item" placeholder="En caso de querer cambiar contraseña">
    </template>
  </template>
</template>