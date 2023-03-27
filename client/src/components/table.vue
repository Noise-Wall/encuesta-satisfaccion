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
        <i class="fa-solid fa-trash-can" @click="confirmarBorrado(Object.values(parent)[0], parent)"></i>
      </div>
    </template>
  </div>
</template>

<style>
.blur-pantalla {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel {
  width: 55vw;
  height: max-content;
  border: 1px solid var(--colorlaquin);
  border-radius: 15px;
  padding: 15px;
  background-color: white;
  align-items: center;
}

.x {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--colorDarkGray);
  background-color: rgba(120, 120, 220, 0.6);
  text-align: center;
  position: relative;
  float: right;
  top: -30px;
  right: -30px;
}

.x:hover {
  opacity: 60%;
  color: lightgray;
}

.x:active {
  color: orange;
  border: 2px solid white;
}

.boton-eliminar {
  background-color: darkred;
  border-top: darkred;
  border-radius: 10px;
  margin: 10px 0;
}
</style>