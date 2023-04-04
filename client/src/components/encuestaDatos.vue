<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import get from "../services/get";
import insert from "../services/insert";
import pop from "../components/popup";

const router = useRouter();

const empresas = ref([]);
const empresaSelected = ref([""]);

if (true) {
  const temp = {};
  Promise.all([get.getEmpresas(temp)]).then(() => (empresas.value = temp.data));
}

function selectEmpresa(e) {
  empresaSelected.value = empresas.value.filter(
    (emp) => emp.nombreEmpresa == e.target.value
  );
  if (empresaSelected.value.length < 1) empresaSelected.value = [""];
}

function borrarBusqueda(e) {
  empresaSelected.value = [""];
  document.getElementById("buscador").value = "";
}

function comenzarEncuesta(e) {
  e.preventDefault();
  let idEmpresa;

  // comprueba que los inputs no esten vacios
  let isEmpty = false;
  document
    .querySelectorAll(".formEmpresa")
    .forEach((element) => (isEmpty = element.value.trim() == "" || isEmpty));

  if (isEmpty) {
    pop.createPopup("Debe llenar todos los campos.", (e) =>
      e.target.parentElement.parentElement.remove()
    );
    return;
  }

  if (empresaSelected.value[0] == "") {
    // en caso de ser empresa nueva, se insertara el siguiente body
    const data = Object.fromEntries(
      new FormData(document.querySelector("#form")).entries()
    );
    let temp = {};
    Promise.all([
      insert.insertTabla(`/Empresas`, JSON.parse(JSON.stringify(data)), temp),
    ])
      .then(() => {
        console.log(`insertado`);
      })
      .catch((e) => {
        console.log(e.message);
      });

    Promise.all([get.getLatest(temp, "empresa")])
      .then(() => {
        idEmpresa = Object.values(temp)[0].idEmpresa;
        insertarEncuesta(idEmpresa);
      })
      .catch((e) => {
        console.log(e.message);
      });
  } else {
    idEmpresa = empresaSelected.value[0].idEmpresa;
    insertarEncuesta(idEmpresa);
  }
}

const insertarEncuesta = (idEmpresa) => {
  let temp = {};
  let idEncuesta;
  const date = new Date
  Promise.all([get.getLatest(temp, "encuesta")])
    .then(() => {
      idEncuesta = Object.values(temp)[0].idEncuesta + 1;
    })
    .catch((e) => console.log(e.message));

  const body = {
    idEncuesta: idEncuesta,
    idEmpresa: idEmpresa,
    fecha: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
    comentarios: "",
  };
  Promise.all([insert.insertTabla("/Encuestas", body, temp)]).then(() => {
    console.log(temp);
    console.log("nueva encuesta creada");
    console.log("ruteando a encuesta...");
    router.push(`/encuesta/${idEncuesta}`);
  }).catch((e) => console.log(e.message));;
};
</script>

<template>
  <fieldset>
    <legend>Busque aquí su empresa</legend>
    <form class="form" @submit="(e) => e.preventDefault()">
      <input
        type="text"
        :placeholder="
          empresas.length > 0
            ? 'Escriba aqui para buscar...'
            : 'No se encontro ningun valor'
        "
        id="buscador"
        list="buscar"
        @input="selectEmpresa"
      />
      <datalist id="buscar">
        <template v-for="empresa in empresas">
          <option :value="empresa.nombreEmpresa">
            {{ empresa.nombreEmpresa }}
          </option>
        </template>
      </datalist>
    </form>
    <button
      class="boton boton-eliminar"
      v-if="empresaSelected[0] !== ''"
      @click="(e) => borrarBusqueda(e)"
    >
      Borrar resultado
    </button>
  </fieldset>
  <fieldset>
    <legend>O llene el siguiente formulario:</legend>
    <form class="form" id="form">
      <label for="nombreEmpresa" class="form-item">
        Nombre de la empresa:
      </label>
      <input
        type="text"
        name="nombreEmpresa"
        :value="empresaSelected[0].nombreEmpresa"
        class="form-item formEmpresa"
        :disabled="empresaSelected[0] !== ''"
        required
      />
      <label for="correo" class="form-item">Correo electrónico:</label>
      <input
        type="text"
        name="correo"
        :value="empresaSelected[0].correo"
        class="form-item formEmpresa"
        :disabled="empresaSelected[0] !== ''"
        required
      />
      <label for="correo" class="form-item">Nombre del contacto:</label>
      <input
        type="text"
        name="nombreContacto"
        :value="empresaSelected[0].nombreContacto"
        class="form-item formEmpresa"
        :disabled="empresaSelected[0] !== ''"
        required
      />

      <button class="boton" @click="(e) => comenzarEncuesta(e)">
        Proceder a las preguntas
      </button>
    </form>
  </fieldset>
</template>

<style scoped>
fieldset > input {
  width: 100%;
}
</style>