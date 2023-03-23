<script setup>
const props = defineProps({
  currentState: Array,
  titulos: Array,
});
</script>


<template>
  <template v-for="(item, index) in currentState">
    <label :for="item[0]" :class="'form-item'">{{ titulos[index] }}</label>
    <input type="text" :name="item[0]" :value="item[1]" :class="'form-item'" 
    :required="!item[0].startsWith('id')"
    :placeholder="!item[0].startsWith('id') ? 'Campo obligatorio' : ''"
    />
  </template>
</template>