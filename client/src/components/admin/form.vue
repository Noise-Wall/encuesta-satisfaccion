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

function mostrarContrasena(e) {
  const current = e.target.previousElementSibling.type
  if (current === "password") {
    e.target.previousElementSibling.type = "text"
    e.target.classList.remove("fa-eye")
    e.target.classList.add("fa-eye-slash")
  }
  if (current === "text") {
    e.target.previousElementSibling.type = "password"
    e.target.classList.remove("fa-eye-slash")
    e.target.classList.add("fa-eye")
  }
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
    <span class="password">
      <input type="password" name="contrasena" class="form-item"
        :placeholder="isUsuarioEdit ? 'En caso de querer cambiar contraseña' : 'Campo obligatorio'">
      <i class="fa-solid fa-eye" @click="e => mostrarContrasena(e)"></i>
    </span>
    <label for="confirmarContrasena">Confirmar contraseña{{ isUsuarioEdit ? ' nueva' : '' }}</label>
    <span class="password">
      <input type="password" id="confirmarContrasena" class="form-item"
        :placeholder="isUsuarioEdit ? '' : 'Campo obligatorio'">
      <i class="fa-solid fa-eye" @click="e => mostrarContrasena(e)"></i>
    </span>
    <template v-if="isUsuarioEdit">
      <label for="previaContrasena">Introducir previa contraseña</label>
      <span class="password">
        <input type="password" id="previaContrasena" class="form-item">
        <i class="fa-solid fa-eye" @click="e => mostrarContrasena(e)"></i>
      </span>
    </template>
  </template>
</template>