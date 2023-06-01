<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Tabla from "../../components/admin/table.vue";
import get from "../../services/get";
import login from "../../services/login";
import { jsPDF } from "jspdf";
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

  getDatos();
});

// variables de informacion
const jsonData = ref([]);
const jsonDataLength = ref(0);
const categoria = computed(() => (route.query.cat ? route.query.cat : ""));
const pagina = computed(() => (route.query.page ? route.query.page : ""));
const tablaColumnas = ref("");
const tablaTitulos = ref([]);
const paginado = ref(0);

watch(categoria, getDatos);
watch(pagina, getDatos);

async function getDatos() {
  const categoriasValidas = [
    "Preguntas",
    "Categorias",
    "Empresas",
    "Encuestas",
    "Usuarios",
  ];
  jsonDataLength.value = 0;
  runTimeout();
  tablaColumnas.value =
    route.query.cat == "Usuarios" || route.query.cat == "Categorias"
      ? "tabla-col3"
      : "tabla-col5";
  tablaTitulos.value = (() => {
    switch (route.query.cat) {
      case "Empresas":
        return ["ID", "Nombre Empresa", "Nombre Contacto", "Correo"];
      case "Categorias":
        return ["ID", "Contenido"];
      case "Preguntas":
        return ["ID", "Contenido", "Categoria", "Habilitada"];
      case "Encuestas":
        return ["ID", "Fecha", "Comentarios", "Empresa"];
      case "Usuarios":
        return ["ID", "Usuario"];
      default:
        return "";
    }
  })();
  try {
    if (categoria.value && categoriasValidas.includes(categoria.value)) {
      await get
        .getTabla(`/${categoria.value.toLowerCase()}?count=yes`)
        .then((result) => {
          paginado.value = Math.ceil(Object.values(result)[0][0].count / 10);
        });
      await get
        .getTabla(`/${categoria.value.toLowerCase()}?page=${route.query.page}`)
        .then((result) => {
          jsonData.value = result;
          jsonDataLength.value = Object.values(result)[0].length;
        });
    }
  } catch (e) {
    console.log(e.message);
  }
}

function setCategoria(e) {
  router.push(`/admin?cat=${e.target.innerHTML.trim()}&page=1`);
}

function agregar() {
  router.push({
    name: "agregar",
    params: { categoria: categoria.value.toLowerCase() },
  });
}

function runTimeout() {
  isTimeout.value = false;
  setTimeout(() => (isTimeout.value = true), 5000);
}

async function logout() {
  await login.logout().then(() => router.push("/"));
}
</script>

<template>
  <section v-if="isLogin">
    <p>Seleccionar una categoría:</p>
    <ul class="menu">
      <li
        @click="setCategoria"
        :class="route.query.cat === 'Preguntas' ? 'active' : ''"
      >
        Preguntas
      </li>
      |
      <li
        @click="setCategoria"
        :class="route.query.cat === 'Categorias' ? 'active' : ''"
      >
        Categorias
      </li>
      |
      <li
        @click="setCategoria"
        :class="route.query.cat === 'Empresas' ? 'active' : ''"
      >
        Empresas
      </li>
      |
      <li
        @click="setCategoria"
        :class="route.query.cat === 'Encuestas' ? 'active' : ''"
      >
        Encuestas
      </li>
      |
      <li
        @click="setCategoria"
        :class="route.query.cat === 'Usuarios' ? 'active' : ''"
      >
        Usuarios
      </li>
    </ul>
  </section>
  <section v-if="categoria">
    <p :style="'font-weight: bold;'" id="categoriaLabel">{{ categoria }}</p>

    <template v-if="jsonData && jsonDataLength > 0">
      <div
        v-if="categoria === 'Preguntas'"
        class="vista-nueva"
        @click="router.push('/admin/pregunta')"
      >
        <i class="fa-solid fa-chart-simple"></i>
        <p>Ir a resultados</p>
      </div>
      <div
        v-if="categoria === 'Encuestas'"
        class="vista-nueva"
        @click="router.push('/admin/encuestas')"
      >
        <i class="fa-solid fa-chart-simple"></i>
        <p>Generar resultados de encuestas</p>
      </div>
      <div class="paginado" v-if="paginado > 1">
        Ir a página:
        <p
          v-for="i in parseInt(paginado)"
          :class="route.query.page == i ? 'paginado-active' : ''"
          @click="
            (e) =>
              router.push(
                `/admin?cat=${route.query.cat}&page=${e.target.innerHTML}`
              )
          "
        >
          {{ i }}
        </p>
      </div>
      <Tabla
        :tablaTitulos="tablaTitulos"
        :tablaColumnas="tablaColumnas"
        :tablaData="Object.values(jsonData)[0]"
      />
      <button class="boton" @click="agregar">
        <h1>+</h1>
      </button>
      <button class="boton" @click="exportar">
        <h1>Exportar</h1>
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

.vista-nueva:hover > * {
  color: var(--verdesuave);
  text-decoration: underline;
}

.vista-nueva:active {
  border: 3px solid var(--color2);
}
.vista-nueva:active > * {
  color: orange;
}

.vista-nueva > .fa-solid {
  margin: 0 10px;
}

.paginado {
  width: max-content;
  margin: auto;
  padding: 10px 30px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 2px solid var(--colorlaquin);
  border-radius: 5px;
}

.paginado > p {
  color: green;
  cursor: pointer;
  font-size: 1.25em;
  margin: 0 auto;
  width: 1.25em;
  text-align: center;
  background-color: var(--color2);
  border-radius: 10px;
}

.paginado > p:hover {
  color: orange;
  text-decoration: underline;
  border: 2px solid orange;
}

.paginado > p:active {
  color: var(--colorlaquin);
  text-decoration: underline;
  border: 2px solid var(--colorlaquin);
}

.paginado-active {
  color: orange;
  text-decoration: underline;
  border: 2px solid orange;
}
</style>