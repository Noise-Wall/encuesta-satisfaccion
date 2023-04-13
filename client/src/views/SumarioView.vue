<script setup>
import get from '../services/get'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

const route = useRoute()
const router = useRouter()


const resultados = ref([])
const datos = ref([])
const loading = ref(true)

const getResultados = () => {
    let temp = {}
    Promise.all([get.getEncuestaResults(temp, route.params.id)])
        .then(() => {
            resultados.value = temp.data || []
        })
        .catch((e) => console.log(e.message))
}

const getDatos = () => {
    let temp = {}
    Promise.all([get.getEncuestaDatos(temp, route.params.id)])
        .then((a) => {
            datos.value = temp.data || []
        })
        .catch((e) => console.log(e.message))
}

const createPDF = () => {
    const doc = new jsPDF('p', 'mm')
    const section = document.getElementById('intro').parentElement
    section.style.border = '0px'
    const options = {
        backgroundColor: null,
        // logging: false,
        scale: 0.9,
        windowWidth: 855,
    }
    html2canvas(section, options).then(function (canvas2) {
        const imgData = canvas2.toDataURL('image/png')
        doc.addImage(imgData, 'PNG', 10, 0)
        doc.save("test.pdf")
    })
}

onMounted(() => {
    setTimeout(() => { loading.value = false }, 3000)
})

getResultados()
getDatos()
</script>

<template>
    <section>
        <template v-if="datos.length >= 1">
            <div class="intro" id="intro" v-if="datos.length >= 1">
                <span>
                    <img src="../../public/img/logo.png" alt="logo" class="logo">
                    <h3 style="text-align:right;">Encuesta de Satisfacción al Cliente</h3>
                </span>
                <p>
                    Estimado cliente, nos dirigimos a usted para solicitarle la realización del
                    siguiente cuestionario con el propósito de ajustarnos mejor a sus
                    necesidades. Su opinión es de gran importancia para nosotros.
                </p>
                <div style="display:flex; justify-content: space-between;">
                    <label>Empresa: {{ datos[0].nombreEmpresa }}</label>
                    <label>Fecha: {{ new Intl.DateTimeFormat("es", {
                        year: "numeric",
                        month: "numeric", day: "numeric"
                    }).format(new Date(datos[0].fecha)) }}</label>
                </div>
                <div>
                    <label>Nombre del contacto: {{ datos[0].nombreContacto }}</label>
                </div>
                <div>
                    <label>Correo electrónico: {{ datos[0].correo }}</label>
                </div>
                <p style="margin-bottom: -10px;">
                    A continuación se suministrará una serie de preguntas con el propósito de
                    mejorar nuestra calidad de servicio, favor de marcar la opción que
                    corresponda a su opinión.
                </p>
            </div>
        </template>
        <template v-if="resultados.length < 1 && loading">
            <p class="cargando"></p>
            <p>Cargando...</p>
        </template>
        <template v-else-if="resultados.length < 1">
            <p>Esta encuesta no tiene ninguna pregunta o respuesta.</p>
            <button class="boton boton-eliminar">Eliminar encuesta</button>
        </template>
        <div class="panel-tabla tabla-col6" id="Resultados" v-else>
            <div class="item-tabla item-tabla-head">Preguntas</div>
            <div class="item-tabla item-tabla-head">Excelente</div>
            <div class="item-tabla item-tabla-head">Bueno</div>
            <div class="item-tabla item-tabla-head">Regular</div>
            <div class="item-tabla item-tabla-head">Malo</div>
            <div class="item-tabla item-tabla-head">Pésimo</div>
            <template v-for="(fila, index) in resultados" :key="index">
                <div v-if="index === 0" class="item-tabla full">{{ fila.contenidoCategoria }}</div>
                <div v-else-if="resultados[index].contenidoCategoria !== resultados[index - 1].contenidoCategoria"
                    class="item-tabla full">{{ fila.contenidoCategoria }}</div>

                <div class="item-tabla item-tabla-text">
                    {{ fila.contenidoPregunta }}
                </div>
                <div class="item-tabla">
                    <i class="fa fa-check" v-if="fila.valor === 10"></i>
                </div>
                <div class="item-tabla">
                    <i class="fa fa-check" v-if="fila.valor === 8"></i>
                </div>
                <div class="item-tabla">
                    <i class="fa fa-check" v-if="fila.valor === 6"></i>
                </div>
                <div class="item-tabla">
                    <i class="fa fa-check" v-if="fila.valor === 4"></i>
                </div>
                <div class="item-tabla">
                    <i class="fa fa-check" v-if="fila.valor === 2"></i>
                </div>
            </template>
            <div class="item-tabla full">Observaciones adicionales:</div>
            <div class="item-tabla full" style="background-color: white; ">
                {{ datos[0].comentarios || 'No hubo observaciones adicionales.' }}
            </div>
            
            <button class="boton" data-html2canvas-ignore @click="createPDF">Exportar a PDF</button>
        </div>
        <div class="intro">
                <span>
                    <label>Ref: PGE-AD-004</label>
                    <label>LAQUIN MR S.A. DE C.V.</label>
                    <label>F 068</label>
                </span>
                <span>
                    <label></label>
                    <label>R 04</label>
                    
                </span>
            </div>
    </section>
    <section>
        <button class="boton" @click="router.push('/admin')">Regresar</button>
    </section>
</template>

<style scoped>
.item-tabla {
    border-radius: 0px;
    color: black;
    font-size: 0.85rem;
}

.item-tabla-head {
    background-color: rgb(125, 125, 255);
    border-top: 0px;
    font-weight: bold;
}

.item-tabla-text {
    text-align: left;
}

.full {
    grid-column: 1 / -1;
    text-align: left;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 2px;
    background-color: lightgray;
}

.panel-tabla>.boton {
    grid-column: 1 / -1;
}

.intro {
    padding: 35px;
    font-size: 0.85rem;
    text-align: justify;
}

.intro p,
.intro h3,
.intro label {
    color: black;
    font-weight: bold;
}

.intro p {
    text-indent: 35px;
}

.intro h3 {
    font-size: 1rem;
    font-weight: bolder;
}

.intro span {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.intro .logo {
    height: 70px;
}
</style>