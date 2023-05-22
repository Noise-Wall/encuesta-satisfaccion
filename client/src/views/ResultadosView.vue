<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import get from "../services/get";
import login from "../services/login";
import pop from "../components/popup.js"

// componentes
import TableTrimestres from "../components/tableTrimestres.vue"

// declarar route para obtener parametros
const route = useRoute();
const router = useRouter();

const isLogin = ref("false");
const isTimeout = ref("false")

function runTimeout() {
    isTimeout.value = false;
    setTimeout(() => (isTimeout.value = true), 3000);
}

// control de autorizacion
onMounted(() => {
    if (!route.fullPath.startsWith(login.validateRoute(route)))
        router.push("/login");
    else isLogin.value = true;

    runTimeout()
});

const preguntas = ref([])
const respuestas = ref([])

async function getPreguntas() {
    await get.getTabla("/preguntas").then((result) => {
        preguntas.value = result.Pregunta
    }).catch(e => console.log(e))
}
getPreguntas()

async function getRespuestas(e) {
    e.target.innerHTML = 'Generando...'
    const idPregunta = document.getElementById("id").value;
    const fecha = document.getElementById("fecha").value;
    const trimestres = []

    if (fecha && !isNaN(fecha)) {
        for (let i = 1; i <= 4; i++) {
            await get.getTabla(`/preguntas/respuestas/${idPregunta}/${fecha}/${i}`).then(result => {
                trimestres.push(result.Pregunta)
            }).catch(e => console.log(e))
        }
        respuestas.value = trimestres
        console.log(respuestas.value)
        e.target.innerHTML = 'Generar tabla'
        return
    }

    await get.getTabla(`/preguntas/respuestas/${idPregunta}`).then(result => {
        respuestas.value = result.Pregunta
    }).catch(e => console.log(e))
    e.target.innerHTML = 'Generar tabla'
}

async function generateTabla() {
    const doc = new jsPDF()
    let list = []
    for (let res in respuestas.value) {
        console.log(res)
        list.push(JSON.parse(JSON.stringify(respuestas.value[res])))
    }
    console.log(list)
    autoTable(doc, { body: list })
    
    const a = document.createElement("a")
    a.target ="_blank"
    a.href = doc.output('bloburl')
    a.click()
}
</script>

<template>
    <section v-if="preguntas.length < 1 && !isTimeout">
        <div class="cargando"></div>
        <p>Cargando...</p>
    </section>
    <section v-else-if="preguntas.length < 1 && isTimeout">Hubo un error al conectar al servicio. Intente de nuevo.
    </section>
    <section v-else>
        <form class="form" id="form">
            <label for="id">Seleccionar pregunta:</label>
            <select name="id" id="id">
                <option v-for="pregunta in preguntas" :value="pregunta.idPregunta">{{ pregunta.contenidoPregunta }}
                </option>
            </select>
            <label for="fecha">Seleccionar periodo:</label>
            <input type="number" name="fecha" min="2000" max="2100" value="2023" id="fecha">
        </form>

        <div v-if="respuestas.length > 0" class="flex-tablas">
            <TableTrimestres :respuestas="respuestas[0]" v-if="respuestas[0].length > 0">Trimestre 1</TableTrimestres> 
            <TableTrimestres :respuestas="respuestas[1]" v-if="respuestas[1].length > 0">Trimestre 2</TableTrimestres> 
            <TableTrimestres :respuestas="respuestas[2]" v-if="respuestas[2].length > 0">Trimestre 3</TableTrimestres> 
            <TableTrimestres :respuestas="respuestas[3]" v-if="respuestas[3].length > 0">Trimestre 4</TableTrimestres>

        </div>
        <button class="boton" @click="generateTabla" v-if="respuestas.length>0">Exportar</button>

        <button class="boton" @click="e => getRespuestas(e)">Generar tabla</button>
    </section>
    <section>
        <button class="boton" @click="router.push('/admin')">Regresar</button>
    </section>
</template>

<style scoped>
.flex-tablas {
    display: flex;
    flex-direction: row;
    flex: auto;
    gap: 10px;
    margin: 10px;
}
</style>