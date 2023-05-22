<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Tabla from "../components/table.vue";
import get from "../services/get";
import login from "../services/login";

const route = useRoute();
const router = useRouter();

// variables para renderizar contenido
const isLogin = ref(false);
const isTimeout = ref(false);
const mensaje = ref("");

// codigo que corre al montarse la pagina
onMounted(() => {
  // redirecciona a la vista de login si no hay token de autorizacion.
  if (!route.fullPath.startsWith(login.validateRoute(route)))
    router.push("/login");
  else isLogin.value = true;
});

// variables de informacion
const jsonData = ref([]);
const jsonDataLength = ref(0);
const categoria = ref("");
const tablaColumnas = ref("");
const tablaTitulos = ref([]);

async function setCategoria(e) {
  categoria.value = e.target.innerHTML;
  jsonDataLength.value = 0;
  jsonData.value = [];
  runTimeout();

  // switch (categoria.value) {
  jsonData.value = await get.getTabla(`/${categoria.value.toLowerCase()}`);
  // Promise.all([get.getEmpresas(temp)]).then(() => {
  //   jsonData.value = temp.data;
  // });
  jsonDataLength.value = Object.values(jsonData.value)[0].length;
  if (categoria.value === "Categorias" || categoria.value === "Usuarios") tablaColumnas.value = "tabla-col3";
  else tablaColumnas.value = "tabla-col5";

  switch (categoria.value) {
    case "Empresas":
      tablaTitulos.value = [
        "ID",
        "Nombre Empresa",
        "Nombre Contacto",
        "Correo",
      ];
      break;
    case "Categorias":
      tablaTitulos.value = ["ID", "Contenido"];
      break;

    case "Preguntas":
      tablaTitulos.value = ["ID", "Contenido", "Categoria", "Habilitada"];
      break;

    case "Encuestas":
      tablaTitulos.value = ["ID", "Fecha", "Comentarios", "Empresa"];
      break;

    case "Usuarios":
      tablaTitulos.value = ["ID", "Usuario"];
      break;

    default:
      categoria.value = "";
  }
}

function agregar() {
  router.push({
    name: "agregar",
    params: { categoria: categoria.value.toLowerCase().slice(0, -1) },
  });
}

function runTimeout() {
  isTimeout.value = false;
  setTimeout(() => (isTimeout.value = true), 3000);
}

async function logout() {
  await login
    .logout()
    .then(() => router.push("/"))
}
</script>

<template>
  <section v-if="isLogin">
    <p>Seleccionar una categoría:</p>
    <ul class="menu">
      <li @click="setCategoria">Preguntas</li>
      <li @click="setCategoria">Categorias</li>
      <li @click="setCategoria">Empresas</li>
      <li @click="setCategoria">Encuestas</li>
      <li @click="setCategoria">Usuarios</li>
    </ul>
  </section>
  <section v-if="categoria">
    <p :style="'font-weight: bold;'" id="categoriaLabel">{{ categoria }}</p>


    <template v-if="jsonData && jsonDataLength > 0">
      <div v-if="categoria === 'Preguntas'" class="vista-nueva" @click="router.push('/admin/pregunta')">
        <i class="fa-solid fa-chart-simple"></i>
        <p>Ir a resultados</p>
      </div>
      <Tabla :tablaTitulos="tablaTitulos" :tablaColumnas="tablaColumnas" :tablaData="Object.values(jsonData)[0]" />
      <button class="boton" @click="agregar">
        <h1>+</h1>
      </button>
    </template>
    <template v-else-if="!isTimeout">
      <div class="cargando"></div>
      <p>Cargando...</p>
    </template>
    <template v-else>
      <p>No se encontró ningún valor.</p>
      <button class="boton" @click="agregar">
        <h1>+</h1>
      </button>
    </template>
  </section>
  <section>
    <button class="boton" @click="logout">Cerrar sesión</button>
  </section>
</template>

<style scoped>
.vista-nueva {
  width: 75%;
  margin: 25px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: var(--color2);
  cursor: pointer;
}

.vista-nueva:hover {
  border: 3px solid orange;
  margin: 22px auto;
}

.vista-nueva:hover>* {
  color: rgb(95, 226, 90);
  text-decoration: underline;
}

.vista-nueva:active {
  border: 3px solid rgb(95, 226, 90);
}
.vista-nueva:active>* {
  color: orange;
}

.vista-nueva>.fa-solid {
  margin: 0 10px;
}
</style>