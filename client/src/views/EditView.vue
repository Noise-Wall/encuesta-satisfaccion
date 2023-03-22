<script setup>
import { ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import update from "../services/update";

// declarar route para obtener parametros
const route = useRoute();
const router = useRouter();

// obtener la informacion almacenada en el history state
let currentState = Object.entries(history.state).splice(
  6,
  Object.entries(history.state).length
);
console.log(currentState);

async function actualizar() {
  // Se recaba la informacion del formulario y se acomoda
  // en un objeto con FormData API
  let data = Object.fromEntries(
    new FormData(document.querySelector("#form")).entries()
  );

  console.log(JSON.stringify(data));
  const temp = {}

  Promise.all([
    update.updateTabla(
      `/${route.params.categoria}s/update/${route.params.id}`,JSON.parse(JSON.stringify(data)), temp)
  ])
    .then(() => {
      console.log(temp.data)
      console.log("actualizado");
      router.push("/");
    })
    .catch((e) => {
      console.log(e.message);
    });
}
</script>

<template>
  <section>
    <p>Editar {{ route.params.categoria }}</p>
    <form class="form" id="form">
      <template v-for="item in currentState">
        <label :for="item[0]" :class="'form-item'">{{ item[0] }}</label>
        <input
          type="text"
          :name="item[0]"
          :value="item[1]"
          :class="'form-item'"
        />
      </template>
    </form>
    <button class="boton" @click="actualizar">
      Actualizar {{ route.params.categoria }}
    </button>
    <p><router-link to="/">Regresar</router-link></p>
  </section>
</template>

<style scoped>
button {
  margin-top: 20px;
  font-size: 1rem;
}
</style>