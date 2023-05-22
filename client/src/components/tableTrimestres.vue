<script setup>
const props = defineProps({
    respuestas: Array,
})

function getPromedio(arr) {
    let resultado = arr.reduce((count, respuesta) => count + respuesta.valor, 0);
    return resultado / arr.length
}

function formatoMes(date) {
    const d = new Date(date)
    return new Intl.DateTimeFormat("es", { month: "long", timezone: "America/Mazatlan" }).format(d)
}

function formatoFecha(date) {
    return new Intl.DateTimeFormat("es", { day: "numeric", month: "numeric", year: "numeric" }).format(date)
}
</script>

<template>
    <div class="panel-tabla tabla-col2">
        <div class="item-tabla item-tabla-head full"><slot>Trimestre</slot></div>
        <div class="item-tabla item-tabla-head">Valor</div>
        <div class="item-tabla item-tabla-head">Fecha</div>
        
        <template v-for="respuesta, indexR in respuestas" :key="indexR">
            <!-- <div class="item-tabla full"
                v-if="indexR === 0 || new Date(respuestas[indexR - 1].fecha).getMonth() !== new Date(respuesta.fecha).getMonth()">
                Mes de {{ formatoMes(respuesta.fecha) }}
            </div> -->
            <div class="item-tabla">{{ respuesta.valor }}</div>
            <div class="item-tabla">{{ formatoFecha(new Date(respuesta.fecha))
            }}
            </div>
        </template>
        <div class="item-tabla full">{{ 'Promedio: ' + getPromedio(respuestas) }}</div>
    </div>
</template>

<style scoped>
.full {
    grid-column: 1 / -1;
}
</style>