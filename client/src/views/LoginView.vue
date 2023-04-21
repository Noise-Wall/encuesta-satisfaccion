<script setup>
import login from '../services/login';
import pop from '../components/popup'

function inicioSesion(e) {
    let data = Object.fromEntries(
        new FormData(document.querySelector("#form")).entries()
    )
    console.log(data)

    if (data.nombreUsuario.trim() === '' || data.contrasena.trim() === '') {
        pop.createPopup('Debe llenar todos los campos.', (f) =>
            f.target.parentElement.parentElement.remove())
        return;
    }

    try {
        login(data)
    } catch (error) {
        console.log(error.message)
    }
}
</script>
<template>
    <section>
        <p>Inicie sesión para continuar.</p>
        <form class="form" id="form">
            <label for="usuario" class="form-item">Usuario: </label>
            <input type="text" name="nombreUsuario" class="form-item">
            <label for="contrasena" class="form-item">Contraseña: </label>
            <input type="password" name="contrasena" class="form-item">
        </form>
        <input type="submit" value="Iniciar sesion" class="boton" @click="(e) => inicioSesion(e)">
    </section>
</template>