<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <footer>
    <div class="line"></div>
    <span>
      <p>® 2023 Laquin MR, S.A. de C.V.</p>
    </span>
  </footer>
</template>

<style scoped>
span {
  display: flex;
  flex-direction: row;
  gap: 50px;
}
</style>