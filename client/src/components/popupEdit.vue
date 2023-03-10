<script>
    export default {
        props: {
            closeEdit: Function,
            tableTitulos: Array,
            tableData: Object,
        }
    }
</script>

<template>
    <div class="blur-pantalla">
        <div class="panel">
            <div class="x" @click="closeEdit">x</div>
            <div class="contenido">
                <template v-if="tableData">
                    {{ tableData }}
                </template>
            </div>
        </div>
    </div>
</template>

<style>
.blur-pantalla {
    position:fixed;
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
    height: 40vh;
    border: 1px solid var(--colorlaquin);
    border-radius: 15px;
    padding: 15px;
    background-color: white;
    align-items: center;
}

.contenido {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.x {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--colorDarkGray);
    background-color: rgba(120,120,220,0.6);
    text-align: center;
    position:relative;
    float: right;
    top: -30px;
    right: -30px;
}

.x:hover {
    opacity: 60%;
    color: lightgray;
}

.x:active {
    color:orange;
    border: 2px solid white;
}
</style>