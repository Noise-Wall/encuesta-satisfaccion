<script>
// components
import Navbar from './components/navbar.vue';
import servMain from './services/servMain'
import servEmpresas from './services/servEmpresas'
import servCategorias from './services/servCategorias'
import servPreguntas from './services/servPreguntas'
import servEncuestas from './services/servEncuestas'
import servRespuestas from './services/servRespuestas'
import servResultados from './services/servQA'

export default {
  // variables
  data() {
    return {
      msg: 'Portal de administrador',
      categoria: '',
      jsonData: {},
    }
  },
  // componentes externos
  components: {
    Navbar
  },
  // funciones
  methods: {
    setCategoria(e) {
      this.categoria = e.target.innerHTML
      switch (this.categoria) {
        case "Empresas":
          this.getEmpresas()
          return;
        case "Categorias":
          this.getCategorias()
          return;
        case "Preguntas":
          this.getPreguntas()
          return;
        case "Encuestas":
          this.getEncuestas()
          return;
        case "Respuestas":
          this.getRespuestas()
          return;
        case "Resultados":
          this.getResultados()
          return;
      }
    },
    async getAll() {
      const res = await servMain.getAll()
      this.jsonData = res.data
    },
    async getEmpresas() {
      const res = await servEmpresas.getEmpresas()
      this.jsonData = res.data
    },
    async getCategorias() {
      const res = await servCategorias.getCategorias()
      this.jsonData = res.data
    },
    async getPreguntas() {
      const res = await servPreguntas.getPreguntas()
      this.jsonData = res.data
    },
    async getEncuestas() {
      const res = await servEncuestas.getEncuestas()
      this.jsonData = res.data
    },
    async getRespuestas() {
      const res = await servRespuestas.getRespuestas()
      this.jsonData = res.data
    },
    async getResultados() {
      const res = await servResultados.getResultados()
      this.jsonData = res.data
    },
  },
}
</script>

<template>
  <Navbar :navTitulo="msg" />
  <h1 class="whitespace">Portal de administrador</h1>
  <main>
    <section>
      <p>Seleccionar una categoría:</p>
      <ul class="menu">
        <li @click="setCategoria">Preguntas</li>
        <li @click="setCategoria">Categorias</li>
        <li @click="setCategoria">Empresas</li>
        <li @click="setCategoria">Encuestas</li>
        <li @click="setCategoria">Respuestas</li>
      </ul>

    </section>
    <section v-if="categoria">
      <p>{{ categoria }}</p>
      <ul>
        <span v-for="entry in jsonData">
          <li v-for="children in entry">
            {{ children }}
          </li>
        </span>
      </ul>
      <!-- <p>{{ jsonData }}</p> -->
    </section>
  </main>
</template>
<style scoped></style>
