<script setup>
const props = defineProps({
  currentState: Array,
  catData: Array,
});
</script>

<template>
  <label :for="currentState[0][0]" class="form-item">ID Pregunta</label>
  <input
    type="text"
    class="form-item"
    :name="currentState[0][0]"
    :value="currentState[0][1]"
  />
  <label :for="currentState[1][0]" class="form-item"
    >Contenido de la pregunta</label
  >
  <input
    type="text"
    class="form-item"
    :name="currentState[1][0]"
    :value="currentState[1][1]"
    required
  />
  <label :for="currentState[2][0]" class="form-item">Categoría</label>
  <select name="idCategoria">
    <template v-for="cat in catData">
      <option :value="Object.values(cat)[0]">
        {{ Object.values(cat)[1] }}
      </option>
    </template>
  </select>
  <label :for="currentState[3][0]" class="form-item">Habilitar pregunta:</label>
  <span>
    <input type="radio" name="deshabilitada" value="0" :checked="currentState[3][1]===0" required/> Deshabilitada
  </span>
  <span>
    <input type="radio" name="deshabilitada" value="1" :checked="currentState[3][1]===1" required/> Habilitada
  </span>
</template>