<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import get from "../services/get";
import ins from "../services/insert";
import pop from "../components/popup";

const router = useRouter();
const isTimeout = ref(false);
onMounted(() => setTimeout(() => (isTimeout.value = true), 10000));

const empresas = ref({});
const empresaSelected = ref([""]);

async function getEmpresas() {
  await get
    .getTabla("/empresas")
    .then((result) => {
      if (result.message) {
        empresas.value = null;
        return;
      };
      empresas.value = result
    })
    .catch((e) => {
      console.log(e.message)
      isTimeout.value = true
    });
}

function selectEmpresa(e) {
  empresaSelected.value = Object.values(empresas.value.Empresa).filter(
    (emp) => emp.nombreEmpresa == e.target.value
  );
  if (empresaSelected.value.length < 1) empresaSelected.value = [""];
}

function borrarBusqueda(e) {
  empresaSelected.value = [""];
  document.getElementById("buscador").value = "";
}

async function comenzarEncuesta(e) {
  e.preventDefault();
  let idEmpresa;

  // comprueba que los inputs no esten vacios
  let isEmpty = false;
  document
    .querySelectorAll(".formEmpresa")
    .forEach((element) => (isEmpty = element.value.trim() == "" || isEmpty));

  if (isEmpty) {
    pop.createPopup("Debe llenar todos los campos.");
    return;
  }

  if (empresaSelected.value[0] == "") {
    // en caso de ser empresa nueva, se insertara el siguiente body
    const data = Object.fromEntries(
      new FormData(document.querySelector("#form")).entries()
    );
    await ins
      .insertTabla("/Empresas", data)
      .then((res) => {
        console.log(res);
        console.log(`insertado`);
      })
      .catch((e) => {
        console.log(e.message);
      });

    await get
      .getTabla("/latest/empresa")
      .then((result) => {
        idEmpresa = Object.values(result)[0].idEmpresa;
      })
      .catch((e) => {
        console.log(e.message);
      });
  } else {
    idEmpresa = empresaSelected.value[0].idEmpresa;
  }
  await insertarEncuesta(idEmpresa);
}

async function insertarEncuesta(idEmpresa) {
  const date = new Date();
  const idEncuesta = await get
    .getTabla("/latest/encuesta")
    .catch((e) => console.log(e.message));

  console.log(idEncuesta.length)

  const body = {
    idEncuesta: idEncuesta.length>0 ? idEncuesta[0].idEncuesta + 1 : 1,
    idEmpresa: idEmpresa,
    fecha: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    comentarios: "",
  };

  await ins
    .insertTabla("/encuestas", body)
    .then((res) => {
      console.log(res);
      console.log("nueva encuesta creada");
      console.log("ruteando a encuesta...");
      router.push(`/encuesta/${body.idEncuesta}`);
    })
    .catch((e) => console.log(e.message));
}
getEmpresas();
</script>

<template>
  <fieldset v-if="empresas">
    <legend>Busque aquí su empresa</legend>
    <form class="form" @submit="(e) => e.preventDefault()">
      <input
        type="text"
        placeholder="Escriba aqui para buscar..."
        id="buscador"
        list="buscar"
        @input="selectEmpresa"
        :disabled="empresaSelected[0] !== ''"
      />
      <datalist id="buscar">
        <template v-for="empresa in empresas.Empresa">
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
  <div v-else-if="!isTimeout">
    <div class="cargando"></div>
    <p style="text-align: center">
      Cargando aplicación... Esto puede tardar unos momentos.
    </p>
  </div>
  <div v-else><p style="text-align: center">Intente de nuevo para ver empresas existentes.</p></div>
  <fieldset>
    <legend>{{empresas?'O l':'L'}}lene el siguiente formulario:</legend>
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