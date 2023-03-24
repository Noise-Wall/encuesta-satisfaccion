<script setup>
const props = defineProps({
    comenzar: Function,
})
</script>

<template>
    <section id="info">
        <h3>Encuesta de Satisfacción al Cliente</h3>
        <p>
            Estimado cliente, nos dirigimos a usted para solicitarle la realización del
            siguiente cuestionario con el propósito de ajustarnos mejor a sus
            necesidades. Su opinión es de gran importancia para nosotros.
        </p>
        <p>
            A continuación se suministrará una serie de preguntas con el propósito de
            mejorar nuestra calidad de servicio, favor de marcar la opción que
            corresponda a su opinión.
        </p>
        <button class="boton" @click="comenzar">Comenzar encuesta</button>
    </section>
</template>

<style scoped>
#info>h3 {
    text-align: center;
}

#info>p {
    text-align: justify;
}

#info {
    padding: 40px;
    min-height: 70vh;
}
</style>