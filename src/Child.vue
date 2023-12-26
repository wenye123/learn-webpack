<template>
  <div class="m-child">count: {{ count }}</div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";

const count = ref(0);

const index = setInterval(() => {
  count.value += 1;
}, 1000);

onBeforeUnmount(() => {
  clearInterval(index);
});
</script>

<style lang="less" scoped>
.m-child {
  color: #000;
}
</style>
