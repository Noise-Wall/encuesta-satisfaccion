<script setup>
import get from "../services/get";
import ins from "../services/insert";
import upd from "../services/update";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import pop from "../components/popup";

const route = useRoute();
const router = useRouter();

const isTimeout = ref(false);
const existe = ref(true);
const contestada = ref(false);

onMounted(() => {
  setTimeout(() => (isTimeout.value = true), 3000);
  encuestaExiste().then(() => {
    if (!existe.value) {
      console.error("La encuesta no existe");
      router.push("/encuesta/error");
    }
  });
  encuestaContestada().then(() => {
    if (contestada.value) {
      console.error("La encuesta ya ha sido contestada");
      router.push("/encuesta/error");
    }
  });
});

const preguntas = ref({});
const categorias = ref({});
const preguntasLength = ref(0);
const categoriasLength = ref(0);

let confirmado = ref(false);

async function encuestaExiste() {
  await get
    .getTabla(`/encuestas/${route.params.id}`)
    .then((res) => {
      existe.value = res.Encuesta.length > 0;
    })
    .catch((e) => console.error(e));
}

async function encuestaContestada() {
  await get
    .getTabla(`/respuestas/group/${route.params.id}`)
    .then((res) => {
      contestada.value = res.Respuesta.length > 0;
    })
    .catch((e) => console.error(e));
}

async function getPreguntas() {
  await get
    .getTabla("/preguntas/enabled")
    .then((res) => {
      preguntas.value = res.Pregunta;
      preguntasLength.value = Object.values(preguntas.value).length;
    })
    .catch((e) => console.log(e));
}

async function getCategorias() {
  await get
    .getTabla("/categorias")
    .then((res) => {
      categorias.value = res.Categoria;
      categoriasLength.value = Object.values(categorias.value).length;
    })
    .catch((e) => console.log(e));
}

function colectarRespuestas() {
  // este metodo colecta todas las respuestas de la
  // encuesta y regresa nulo si alguna pregunta no esta respondida.
  confirmado.value = false;
  let data = [];
  let form = document.querySelectorAll("form");

  form.forEach((form) => {
    let temp = Object.fromEntries(new FormData(form).entries());
    let valor = Object.values(temp)[1] || null;

    if (!valor) {
      return [];
    }

    data.push({
      idPregunta: temp.idPregunta,
      valor: valor,
      idEncuesta: route.params.id,
    });
  });
  return data;
}

async function insertComentario() {
  const comentario = document.getElementById("comentarios").value;
  if (comentario === "") return;

  await upd
    .updateTabla(`/encuestas/update/${route.params.id}`, {
      comentarios: comentario,
    })
    .then((res) => console.log(res))
    .catch((e) => {
      console.log(e);
      pop.createPopup(
        "Hubo un error al subir la información. Intente de nuevo."
      );
      return;
    });
}

async function contestarEncuesta() {
  const data = colectarRespuestas();

  if (data.length < 1) {
    pop.createPopup("Debe llenar todos los campos.");
    return;
  }

  await insertComentario();

  data.forEach(async (element) => {
    await ins
      .insertTabla("/respuestas", element)
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
        pop.createPopup(
          "Hubo un error al subir la información. Intente de nuevo."
        );
        return;
      });
  });

  pop.createPopup(
    "Encuesta contestada exitosamente.",
    e => terminarEncuesta(e),
    "terminar"
  );
}

const terminarEncuesta = (e) => {
  router.push("/");
  e.target.parentElement.parentElement.remove();
};

getPreguntas();
getCategorias();
</script>

<template>
  <section>
    <template v-if="preguntasLength < 1 && !isTimeout">
      <div class="cargando"></div>
      <p>Cargando...</p>
    </template>
    <template v-else-if="preguntasLength < 1">
      <p>Lo sentimos. No se han encontrado preguntas.</p>
    </template>
    <template v-else>
      <div class="info">
        <p>Los criterios de evaluación son los siguientes:</p>
        <p>
          Excelente (10 puntos), Bueno (8 puntos), Regular (6 puntos), Malo (4
          puntos) y Pésimo (2 puntos); se suman los resultados y se saca un
          promedio.
        </p>
      </div>

      <div class="panel-tabla">
        <template v-for="(item, indexP) in preguntas" :key="indexP">
          <template v-for="cat in categorias" :key="cat.idCategoria">
            <template v-if="cat.idCategoria === item.idCategoria">
              <div class="item-encuesta item-encuesta-head" v-if="indexP === 0">
                {{ cat.contenidoCategoria }}
              </div>
              <div
                class="item-encuesta item-encuesta-head"
                v-else-if="
                  preguntas[indexP].idCategoria !==
                  preguntas[indexP - 1].idCategoria
                "
              >
                {{ cat.contenidoCategoria }}
              </div>
            </template>
          </template>

          <fieldset>
            <legend>
              {{ item.contenidoPregunta }}
            </legend>
            <form>
              <input type="hidden" name="idPregunta" :value="item.idPregunta" />
              <span
                ><input
                  type="radio"
                  value="10"
                  :name="`valor${indexP}`"
                />Excelente</span
              >
              <span
                ><input
                  type="radio"
                  value="8"
                  :name="`valor${indexP}`"
                />Bueno</span
              >
              <span
                ><input
                  type="radio"
                  value="6"
                  :name="`valor${indexP}`"
                />Regular</span
              >
              <span
                ><input
                  type="radio"
                  value="4"
                  :name="`valor${indexP}`"
                />Malo</span
              >
              <span
                ><input
                  type="radio"
                  value="2"
                  :name="`valor${indexP}`"
                />Pésimo</span
              >
            </form>
          </fieldset>
        </template>
        <div class="item-encuesta item-encuesta-head">
          Comentarios (Opcional)
        </div>
        <fieldset>
          <legend>
            Si desea realizar alguna observación sobre el servicio que no
            hayamos contemplado en la encuesta, compártalo a continuación:
          </legend>
          <textarea
            name="comentarios"
            rows="4"
            placeholder="Comparta su opinión (opcional)..."
            id="comentarios"
          ></textarea>
        </fieldset>
      </div>

      <button
        class="boton terminar"
        v-if="!confirmado"
        @click="confirmado = true"
      >
        <h1>Terminar encuesta</h1>
      </button>
      <button v-else class="boton terminar" @click="contestarEncuesta()">
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

fieldset > form {
  width: 100%;
  height: 100%;
  display: inherit;
  justify-content: space-around;
}

fieldset > form > span > input[type="radio"] {
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