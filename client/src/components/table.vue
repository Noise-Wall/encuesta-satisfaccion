<script setup>
import del from "../services/delete.js"
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  tablaTitulos: Array,
  tablaColumnas: String,
  tablaData: Array,
});

function parametros(string) {
  switch (string) {
    case 'idEmpresa':
      return 'empresa'
    case 'idCategoria':
      return 'categoria'
    case 'idPregunta':
      return 'pregunta'
    case 'idEncuesta':
      return 'encuesta'
    case 'idRespuesta':
      return 'respuesta'
    default:
      console.log('Categoria invalida')
      return
  }
}
// routes to editView with data passed through states
function edit(key, object) {
  const data = object
  router.push({
    name: "editar",
    state: data,
    params: { categoria: parametros(Object.keys(object)[0]), id: key },
  });
}

function eliminar(key, object) {
  const params = parametros(Object.keys(object)[0])
  const temp = {}
  console.log(`/${params}s/delete/${key}`)
  del.deleteTabla(`/${params}s/delete/${key}`, temp)

}

function confirmarBorrado(key, object) {
  console.log('confirmar borrado')
  const data = Object.entries(object)

  const popupBlur = document.createElement('div')
  popupBlur.classList.add("blur-pantalla")
  const popupPanel = document.createElement('div')
  popupPanel.classList.add("panel")
  const x = document.createElement('div')
  x.classList.add('x')
  x.innerHTML = 'x'

  const btn = document.createElement('button')
  btn.classList.add('boton')
  btn.classList.add('boton-eliminar')
  btn.innerHTML = "Aceptar"

  btn.addEventListener('click', (e)=>{
    Promise.all([eliminar(key, object)]).then(()=> {
      e.target.parentElement.parentElement.remove();
    })
  })

  x.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.remove()
  })
  
  popupPanel.appendChild(x)
  popupPanel.insertAdjacentHTML("beforeend", `<h3>Atención</h3> Se borrará el siguiente dato: <br>
  <br>${data[0][0]}: ${data[0][1]}
  <br>${data[1][0]}: ${data[1][1]}
  <br><br>Para continuar, clic en el boton de Aceptar.
  `)
  popupPanel.appendChild(btn)

  popupBlur.appendChild(popupPanel)
  document.body.appendChild(popupBlur)
}
</script>

<template>
  <div class="panel-tabla" :class="tablaColumnas">
    <div class="item-tabla item-tabla-head" v-for="titulo in tablaTitulos">
      {{ titulo }}
    </div>
    <div class="item-tabla item-tabla-head"></div>
    <template v-for="(parent, index) in tablaData">
      <div class="item-tabla" v-for="child in parent">
        {{ child }}
      </div>
      <div class="item-tabla actions">
        <i class="fa-solid fa-file-pen" @click="edit(Object.values(parent)[0], parent)"></i>
        <i class="fa-solid fa-eye" v-if="parametros(Object.keys(parent)[0]) === 'encuesta'"></i>
        <i class="fa-solid fa-trash-can" @click="confirmarBorrado(Object.values(parent)[0], parent)"></i>

      </div>
    </template>
  </div>
</template>

<style>
.actions{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>