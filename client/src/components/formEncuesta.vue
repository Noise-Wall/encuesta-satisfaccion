<script setup>
const props = defineProps({
  currentState: Array,
  catData: Array,
});
</script>

<template>
  <label :for="currentState[0][0]" class="form-item">ID Encuesta</label>
  <input
    type="text"
    class="form-item"
    :name="currentState[0][0]"
    :value="currentState[0][1]"
  />
  <label :for="currentState[1][0]" class="form-item"
    >Fecha</label
  >
  <input
    type="date"
    class="form-item"
    :name="currentState[1][0]"
    :value="currentState[1][1]"
    required
  />
  <label :for="currentState[2][0]" class="form-item">Comentarios</label>
<textarea :name="currentState[2][0]" cols="30" rows="10">{{ currentState[2][1] }}</textarea>

  <label :for="currentState[3][0]" class="form-item">Empresa</label>
  <select name="idEmpresa">
      <template v-for="cat in catData">
        <option :value="Object.values(cat)[0]" :selected="Object.values(cat)[1]===currentState[3][1]">
            {{ Object.values(cat)[1] }}
        </option>
    </template>
</select>
</template>