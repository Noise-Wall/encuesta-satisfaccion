<script>
// components
import Navbar from './components/navbar.vue'
export default {
  // variables
  data() {
    return {
      msg: 'Portal de administrador',
      categoria: ''
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
    }
  }
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
    </section>
  </main>
</template>
<style scoped></style>
