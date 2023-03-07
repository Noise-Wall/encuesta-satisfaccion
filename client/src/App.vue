<script>
// components
import Navbar from './components/navbar.vue';
import TableHead from './components/tableHead.vue';
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
      tableTitulos: [], 
      tableColumnas: '',
      jsonData: {},
    }
  },
  // componentes externos
  components: {
    Navbar, TableHead,
  },
  // funciones
  methods: {
    async setCategoria(e) {
      this.categoria = e.target.innerHTML
      switch (this.categoria) {
        case "Empresas":
          servEmpresas.getEmpresas(this)
          this.tableColumnas = 'tabla-col4'
          this.tableTitulos = ['ID', 'Nombre Empresa', 'Nombre Contacto', 'Correo']
          return;
        case "Categorias":
          servCategorias.getCategorias(this)
          this.tableColumnas = 'tabla-col2'
          this.tableTitulos = ['ID', 'Categoria']
          return;
        case "Preguntas":
          servPreguntas.getPreguntas(this);
          this.tableColumnas = 'tabla-col4'
          this.tableTitulos = ['ID', 'Contenido Pregunta', 'ID Categoria', 'Habilitada']
          return;
        case "Encuestas":
          servEncuestas.getEncuestas(this)
          this.tableColumnas = 'tabla-col4'
          this.tableTitulos = ['ID', 'Fecha', 'Comentarios', 'ID Empresa']
          return;
        case "Respuestas":
          servRespuestas.getRespuestas(this)
          this.tableColumnas = 'tabla-col2'
          this.tableTitulos = ['ID', 'Valor']
          return;
        case "Resultados":
          servResultados.getResultados(this)
          this.tableColumnas = 'tabla-col3'
          this.tableTitulos = ['','','']
          return;
      }
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
      <p :style="'font-weight:bold;'">{{ categoria }}</p>
      <TableHead 
      :tableTitulos="tableTitulos" 
      :tableColumnas="tableColumnas"
      :tableData="jsonData"/>

      <button class="boton"><h1>+</h1></button>
    </section>
  </main>
</template>
<style scoped></style>
