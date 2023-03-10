<script>
export default {
    props: {
        tableTitulos: Array,
        tableColumnas: String,
        tableData: Array,
        funcEditar: Function,
        funcEliminar: Function,
        inEditMode: Boolean,
    },
}
</script>

<template>
    <div class="panel-tabla" :class="tableColumnas">
        <div class="item-tabla item-tabla-head" v-for="titulo in tableTitulos">{{ titulo }}
        </div>
        <div class="item-tabla item-tabla-head"></div>
        <template v-for="(parent, index) in tableData">
            <div class="item-tabla" v-for="child in parent">{{ child }}</div>
            <div class="item-tabla actions">
                <i class="fa-solid fa-file-pen" 
                :data-key="index"
                :data-value="Object.values(parent)[0]" 
                @click="funcEditar"></i>
                <i class="fa-solid fa-trash-can"
                :data-key="index"
                :data-value="Object.values(parent)[0]" 
                @click="funcEliminar"></i>
                <template></template>
            </div>
        </template>
    </div>
</template>