<script setup>
import { ref } from 'vue'
import get from '../services/get'

const empresas = ref([])
const empresaSelected = ref([''])

if (true) {
    const temp = {}
    Promise.all([get.getEmpresas(temp)]).then(() => empresas.value = temp.data)
}

function selectEmpresa(e) {
    empresaSelected.value = empresas.value.filter(emp => emp.nombreEmpresa == e.target.value)
    if (empresaSelected.value.length < 1) empresaSelected.value = [""]
}

function borrarBusqueda(e) {
    empresaSelected.value = [''];
    document.getElementById('buscador').value = '';
}

function comenzarEncuesta(e) {
    e.preventDefault();
    let data;
    if (empresaSelected.value[0] == "") {
        data = Object.fromEntries(new FormData(document.querySelector("#form")).entries())
    }
    else data = empresaSelected.value
    console.log(data)
}

</script>

<template>
    <fieldset>
        <legend>
            Busque aquí su empresa
        </legend>
        <form class="form" @submit="e => e.preventDefault()">

            <input type="text"
                :placeholder="empresas.length > 0 ? 'Escriba aqui para buscar...' : 'No se encontro ningun valor'"
                id="buscador" list="buscar" @input="selectEmpresa">
            <datalist id="buscar">
                <template v-for="empresa in empresas">
                    <option :value="empresa.nombreEmpresa">{{ empresa.nombreEmpresa }}</option>
                </template>
            </datalist>
        </form>
        <button class="boton boton-eliminar" v-if="empresaSelected[0] !== ''" @click="(e) => borrarBusqueda(e)">Borrar
            resultado</button>
    </fieldset>
    <fieldset>
        <legend>O llene el siguiente formulario:</legend>
        <form class="form" id="form">

            <label for="nombreEmpresa" class="form-item">
                Nombre de la empresa:
            </label>
            <input type="text" name="nombreEmpresa" :value="empresaSelected[0].nombreEmpresa" class="form-item"
                :disabled="empresaSelected[0] !== ''" required>
            <label for="correo" class="form-item">Correo electrónico:</label>
            <input type="text" name="correo" :value="empresaSelected[0].correo" class="form-item"
                :disabled="empresaSelected[0] !== ''" required>
            <label for="correo" class="form-item">Nombre del contacto:</label>
            <input type="text" name="nombreContacto" :value="empresaSelected[0].nombreContacto" class="form-item"
                :disabled="empresaSelected[0] !== ''" required>

            <button class="boton" @click="e => comenzarEncuesta(e)">Proceder a las preguntas</button>
        </form>
    </fieldset>
</template>

<style scoped>fieldset>input {
    width: 100%;
}</style>