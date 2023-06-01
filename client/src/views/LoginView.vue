<script setup>
import login from "../services/login";
import { createPopup } from "../components/popup";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

async function inicioSesion(e) {
  e.target.value = "Autenticando...";
  let data = Object.fromEntries(
    new FormData(document.querySelector("#form")).entries()
  );

  console.log(`Autenticando usuario ${data.nombreUsuario}...`);

  if (data.nombreUsuario.trim() === "" || data.contrasena.trim() === "") {
    createPopup("Debe llenar todos los campos.", (f) =>
      f.target.parentElement.parentElement.remove()
    );
    e.target.value = "Iniciar sesión";
    return;
  }

  try {
    await login.login(data).then((result) => {
      if (result.status >= 400) {
        console.log(result);
        const mensaje =
          result.data.message ||
          "Ha habido un error al intentar iniciar sesión. Inténtalo de nuevo.";
        createPopup(mensaje);
        e.target.value = "Iniciar sesión";
        return;
      }
      router.push("/admin");
    });
  } catch (error) {
    console.log(error.message);
    createPopup(error.message);
    e.target.value = "Iniciar sesión";
    return;
  }
}

function mostrarContrasena(e) {
  const current = e.target.previousElementSibling.type;
  if (current === "password") {
    e.target.previousElementSibling.type = "text";
    e.target.classList.remove("fa-eye");
    e.target.classList.add("fa-eye-slash");
  }
  if (current === "text") {
    e.target.previousElementSibling.type = "password";
    e.target.classList.remove("fa-eye-slash");
    e.target.classList.add("fa-eye");
  }
}

if (!route.fullPath.startsWith(login.validateRoute(route))) console.log(false);
</script>
<template>
  <section>
    <p>Inicie sesión para continuar.</p>
    <form class="form" id="form">
      <label for="usuario" class="form-item">Usuario: </label>
      <input type="text" name="nombreUsuario" class="form-item" />
      <label for="contrasena" class="form-item">Contraseña: </label>
      <span class="password">
        <input type="password" name="contrasena" class="form-item" />
        <i class="fa-solid fa-eye" @click="(e) => mostrarContrasena(e)"></i>
      </span>
    </form>
    <input
      type="submit"
      value="Iniciar sesión"
      class="boton"
      @click="(e) => inicioSesion(e)"
    />
  </section>
</template>