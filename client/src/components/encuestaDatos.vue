<script setup>
import { ref } from 'vue'
import get from '../services/get'

const empresas = ref([])
const empresaSelected = ref([])

if (true) {
    const temp = {}
    Promise.all([get.getEmpresas(temp)]).then(() => empresas.value = temp.data)
}
const filter = (ev) => {empresaSelected.value = empresas.value.filter((empresa) => {
    empresa.nombreEmpresa !== ev.target.value })
    console.log(empresaSelected.value)}
</script>

<template>
    <fieldset>
        <legend>
            Busque aquí su empresa
        </legend>
        <input type="text" @change="filter"
            :placeholder="empresas.length > 0 ? 'Escriba aqui para buscar...' : 'No se encontro ningun valor'"
            list="buscar">
        <datalist id="buscar">
            <template v-for="empresa in empresas">
                <option :value="empresa.nombreEmpresa">{{ empresa.nombreEmpresa }}</option>
            </template>
        </datalist>
    </fieldset>
    {{ empresaSelected }}
    <fieldset>
        <legend>O llene el siguiente formulario:</legend>
        <label for="nombreEmpresa">
            Nombre de la empresa:
        </label>
        <input type="text" name="nombreEmpresa" :value="''">
    </fieldset>
    <h1>datos</h1>
</template>

<style scoped>
fieldset>input {
    width: 100%;
}
</style>