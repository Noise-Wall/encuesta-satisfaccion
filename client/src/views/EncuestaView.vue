<script setup>
import get from '../services/get'
import { ref, computed } from 'vue'

let preguntas = ref([])
let categorias = ref([])
let last = ref(0)
let current = ref(0)

const getPreguntas = () => {
    let temp = {}
    Promise.all([get.getPreguntasHabilitadas(temp)])
        .then(() => preguntas.value = temp.data)
        .catch((e) => console.log(e))
}
const getCategorias = () => {
    let temp = {}
    Promise.all([get.getCategorias(temp)])
        .then(() => categorias.value = temp.data)
        .catch((e) => console.log(e))
}

// cambiar a funcion recursiva
/* const printCategoria = (id) => {
    if (lastPrintedValue.value !== id) {
        return true
    }
    return false
} */

function setLast(value) {
    last.value = value
}
function setCurrent(value) {
    current.value = value
}

const filteredCategoria = computed(() => {
    console.log('filter')
    return categorias.value.filter(cat => Object.entries(cat)[0][1] === current.value);
})

getCategorias()
getPreguntas()
</script>

<template>
    <section>
        <template v-if="categorias.length < 1">
            <div class="cargando"></div>
            <p>Cargando...</p>
        </template>
        <template v-else-if="categorias.length < 1 && preguntas.length < 1">
            <p>Lo sentimos. No se han encontrado preguntas.</p>
        </template>
        <template v-else>
            <p>template de encuesta</p>
            <div class="panel-tabla">

                <template v-for="item in preguntas" :key="item.idPregunta">

                    <template v-for="cat in categorias" :key="cat.idCategoria">
                        <div class="item-encuesta item-encuesta-head"
                            v-if="cat.idCategoria === item.idCategoria && item.idCategoria !== last.value">
                            {{ cat.contenidoCategoria }}
                        </div>
                    </template>
                    {{ setLast(item.idCategoria) }}

                    <div class="item-encuesta">{{ item.contenidoPregunta }} 
                    </div>
                </template>
            </div>

        </template>

    </section>
    <section>
        <router-link to="/"><button class="boton">Regresar</button></router-link>
    </section>
</template>

<style>
.item-encuesta {
    display: inline-grid;
    text-align: left;
    align-items: center;
    padding: 10px;
    border: 1px solid rgba(150, 150, 150, 0.4);
    gap: 3px;
    border-radius: 5px;
}

.item-encuesta-head {
    border-top: 5px solid rgba(7, 200, 222, 0.7);
    text-align: center;
    font-family: "Source Serif Pro", serif;
    color: white;
    background-color: var(--colorDarkGray);
    min-height: 45px;
    padding: 5px 10px;
}
</style>