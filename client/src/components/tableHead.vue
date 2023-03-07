<script>
export default {
    props: {
        tableTitulos: Array,
        tableColumnas: String,
        tableData: Array,
    }
}
</script>

<template>
    <div class="panel-tabla" :class="tableColumnas">
        <div class="item-tabla item-tabla-head" v-for="titulo in tableTitulos">{{ titulo }}
        </div>
        <template v-for="parent in tableData">
            <template v-for="child in parent">
                <div class="item-tabla" v-for="grandchild in child">{{ grandchild }}</div>
            </template>
        </template>
    </div>
</template>