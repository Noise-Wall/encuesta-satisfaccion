<script setup>
    const props = defineProps({
        navTitulo: String,
    })
</script>

<template>
    <nav>
        <div>
        <img src="/img/logo.png" alt="logo" class="logo">
        <h1>{{navTitulo}}</h1>
        </div>
    </nav>
</template>
