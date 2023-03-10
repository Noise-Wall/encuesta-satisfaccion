<script>
// components
import Navbar from './components/navbar.vue';
import Table from './components/table.vue';
import PopupEdit from './components/popupEdit.vue';
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
      jsonData: [],
      editMode: false,
      editData: []
    }
  },
  // componentes externos
  components: {
    Navbar, Table, PopupEdit
  },
  // funciones
  methods: {
    async setCategoria(e) {
      this.categoria = e.target.innerHTML
      this.jsonData = [];
      switch (this.categoria) {
        case "Empresas":
          servEmpresas.getEmpresas(this)
          this.tableColumnas = 'tabla-col5'
          this.tableTitulos = ['ID', 'Nombre Empresa', 'Nombre Contacto', 'Correo']
          return;
        case "Categorias":
          servCategorias.getCategorias(this)
          this.tableColumnas = 'tabla-col3'
          this.tableTitulos = ['ID', 'Categoria']
          return;
        case "Preguntas":
          servPreguntas.getPreguntas(this);
          this.tableColumnas = 'tabla-col5'
          this.tableTitulos = ['ID', 'Contenido Pregunta', 'ID Categoria', 'Habilitada']
          return;
        case "Encuestas":
          servEncuestas.getEncuestas(this)
          this.tableColumnas = 'tabla-col5'
          this.tableTitulos = ['ID', 'Fecha', 'Comentarios', 'ID Empresa']
          return;
        case "Respuestas":
          servRespuestas.getRespuestas(this)
          this.tableColumnas = 'tabla-col3'
          this.tableTitulos = ['ID', 'Valor']
          return;
        case "Resultados":
          servResultados.getResultados(this)
          this.tableColumnas = 'tabla-col4'
          this.tableTitulos = ['','','']
          return;
      }
    },
    editar(e) {
      this.editMode = true;
      this.editData = JSON.parse(JSON.stringify(this.jsonData))[e.target.dataset.key];
    },
    eliminar(e) {
      console.log(e.target.id)
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
      <!-- Presenta la tabla si toda la informacion ha sido cargada -->
      <template 
      v-if="Object.keys(jsonData).length>0">
      <Table 
      :tableTitulos="tableTitulos" 
      :tableColumnas="tableColumnas"
      :tableData="jsonData"
      :funcEditar="editar"
      :funcEliminar="eliminar"/>

      <button class="boton"><h1>+</h1></button>
      </template>
      <!-- De otra manera, presenta una animacion de carga -->
      <template v-else>
        <div class="cargando"></div>
        <p>Cargando...</p>
      </template>
    </section>
  </main>
  <template v-if="editMode">
  <PopupEdit 
  :closeEdit="() => this.editMode = !this.editMode"
  :tableData="this.editData"
    />
  </template>
</template>
<style scoped></style>
