<script setup>
import get from '../services/get'
import insert from '../services/insert'
import update from '../services/update'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import pop from '../components/popup'

const route = useRoute()
const router = useRouter()

let preguntas = ref([])
let categorias = ref([])
let confirmado = ref(false);

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

const getData = () => {
    confirmado.value = false
    let data = []
    let form = document.querySelectorAll('form')

    // do insert multiple rows in one query
    form.forEach(form => {
        let temp = Object.fromEntries(new FormData(form).entries())
        let valor = Object.values(temp)[1] || null

        if (!valor) {
            return null
        }

        data.push({
            idPregunta: temp.idPregunta,
            valor: valor,
            idEncuesta: route.params.id,
        })
    })
    return data
}

const insertComentario = () => {
    const comentario = document.getElementById('comentarios').value
    if (comentario === "") return
    let temp = {}

    Promise.all([update.updateTabla(`/encuestas/update/${route.params.id}`, { comentarios: comentario }, temp)]).then(() => console.log(temp.data)).catch((e) => console.log(e))
}

const contestarEncuesta = () => {
    const data = getData()

    if (data.length < 1) return 'Debe llenar todos los campos.'

    let temp = {}

    insertComentario()

    data.forEach(element => {
        Promise.all([insert.insertTabla('/respuestas', element, temp)]).then(() => {
            console.log(temp.data)
        }).catch((e) => {
            console.log(e)
        })
    })

    return 'Encuesta contestada exitosamente.'
}

const terminarEncuesta = (e) => {
    router.push('/')
    e.target.parentElement.parentElement.remove()
}

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
            <div class="info">
                <p>Los criterios de evaluación son los siguientes: </p>
                <p> Excelente (10 puntos), Bueno (8 puntos), Regular (6 puntos), Malo (4 puntos) y Pésimo (2 puntos); se
                    suman los resultados y se saca un promedio.</p>
            </div>

            <div class="panel-tabla">

                <template v-for="(item, indexP) in preguntas" :key="indexP">

                    <template v-for="cat in categorias" :key="cat.idCategoria">
                        <template v-if="cat.idCategoria === item.idCategoria">
                            <div class="item-encuesta item-encuesta-head" v-if="indexP === 0">
                                {{ cat.contenidoCategoria }}
                            </div>
                            <div class="item-encuesta item-encuesta-head"
                                v-else-if="preguntas[indexP].idCategoria !== preguntas[indexP - 1].idCategoria">
                                {{ cat.contenidoCategoria }}
                            </div>
                        </template>
                    </template>

                    <fieldset>
                        <legend>
                            {{ item.contenidoPregunta }}
                        </legend>
                        <form>
                            <input type="hidden" name="idPregunta" :value="item.idPregunta">
                            <span><input type="radio" value="10" :name="`valor${indexP}`">Excelente</span>
                            <span><input type="radio" value="8" :name="`valor${indexP}`">Bueno</span>
                            <span><input type="radio" value="6" :name="`valor${indexP}`">Regular</span>
                            <span><input type="radio" value="4" :name="`valor${indexP}`">Malo</span>
                            <span><input type="radio" value="2" :name="`valor${indexP}`">Pésimo</span>

                        </form>
                    </fieldset>
                </template>
                <div class="item-encuesta item-encuesta-head">Comentarios (Opcional)</div>
                <fieldset>
                    <legend>Si desea realizar alguna observación sobre el servicio que no hayamos contemplado en la
                        encuesta, compártalo a continuación:</legend>
                    <textarea name="comentarios" rows="4" placeholder="Comparta su opinión (opcional)..."
                        id="comentarios"></textarea>
                </fieldset>
            </div>

            <button class="boton terminar" v-if="!confirmado" @click="confirmado = true">
                <h1>Terminar encuesta</h1>
            </button>
            <button v-else class="boton terminar" @click="pop.createPopup(contestarEncuesta(), e => terminarEncuesta(e))">
                <h1>Clic de nuevo para confirmar</h1>
            </button>
        </template>
    </section>
    <section>
        <router-link to="/"><button class="boton">Regresar</button></router-link>
    </section>
</template>

<style scoped>
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

fieldset {
    padding: 20px;
    margin: 10px 25px;
    display: flex;
}

fieldset>form {
    width: 100%;
    height: 100%;
    display: inherit;
    justify-content: space-around;
}

fieldset>form>span>input[type="radio"] {
    cursor: pointer;
    margin: 10px;
}

.terminar {
    background-color: #339033;
    border-radius: 0 0 10px 10px;
}

.info {
    border: 1px solid lightgray;
    border-radius: 5px;
    box-shadow: 0 3px 5px var(--shadow);
    padding: 10px 25px;
    margin: 15px 25px;
    font-family: "Source Serif Pro", serif;
}

textarea {
    resize: none;
    margin: 10px;
    width: 100%;
}
</style>