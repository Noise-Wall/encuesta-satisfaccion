<script setup>
const props = defineProps({
    currentState: Array,
    catData: Array,

})
</script>

<template>
    <template v-for="item in currentState">
        <label :for="item[0]" :class="'form-item'">{{ item[0] }}</label>
        <select v-if="(item[0] === 'idCategoria')" name="idCategoria">
            <template v-for="cat in extraData">
                <option :value="Object.values(cat)[0]">{{ Object.values(cat)[1] }}</option>
            </template>
        </select>
        <template v-else-if="item[0] === 'deshabilitada'">
            <span>
                <input type="radio" name="deshabilitada" value="0"> Deshabilitada
            </span>
            <span>
                <input type="radio" name="deshabilitada" value="1"> Habilitada
            </span>
        </template>
        <input v-else type="text" :name="item[0]" :value="item[1]" :class="'form-item'" />
    </template>
</template>