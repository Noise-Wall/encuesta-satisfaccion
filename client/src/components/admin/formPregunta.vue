<script setup>
const props = defineProps({
  currentState: Array,
  catData: Object,
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
      <option
        :value="cat.idCategoria"
        :selected="cat.idCategoria === currentState[2][1]"
      >
        {{ cat.contenidoCategoria }}
      </option>
    </template>
  </select>
  <label :for="currentState[3][0]" class="form-item">Habilitar pregunta:</label>
  <span class="radio" @click="e=>e.target.firstElementChild.checked=true">
    <input
      type="radio"
      name="deshabilitada"
      value="0"
      :checked="currentState[3][1] === 0 || currentState[3][1] === ''"
      required
    />
    Deshabilitada 
  </span>
  <span class="radio" @click="e=>e.target.firstElementChild.checked=true">
    <input
      type="radio"
      name="deshabilitada"
      value="1"
      :checked="currentState[3][1] === 1"
      required
    />
    Habilitada 
  </span>
</template>