<template>
  <div class="g-page">
    <p class="w1">{{ msg }}</p>
    <p class="w2">{{ msg }}</p>
    <p>{{ msg }}</p>
    <Child />
  </div>
</template>

<script lang="ts" setup>
import Child from "./Child.vue";

import { ref } from "vue";

const msg = ref("wenye");
</script>

<style lang="less" scoped>
.g-page {
  background-color: #ccc;

  .w1 {
    display: flex;
    color: red;
  }

  p {
    background-color: yellow;
  }
}
</style>
