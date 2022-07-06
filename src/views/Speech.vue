<script lang="ts" setup>
import { ref } from "vue";
import { FormInst } from "naive-ui";
const text = ref("");
const speechRef = ref<FormInst | null>(null);
const speechValue = ref({
  text: null,
  voice: null,
});

const voices = [
  {
    label: "10:28",
    value: "10:28",
  },
  {
    label: "10:29",
    value: "10:29",
  },
  {
    label: "10:30",
    value: "10:30",
  },
];
</script>

<template>
  <h1>Text to Speech</h1>
  <span>{{ text }}</span>

  <n-form ref="speechRef" :model="speechValue">
    <n-form-item path="key" label="Text">
      <n-input v-model:value="text" type="textarea" />
    </n-form-item>
    <n-form-item path="region" label="Voice">
      <n-select v-model:value="speechValue.voice" :options="voices" />
    </n-form-item>
    <n-space justify="end">
      <n-button> Convert </n-button>
      <n-button> Play </n-button>
      <n-button type="primary"> Import </n-button>
    </n-space>
  </n-form>

  <p>{{ speechValue.text }}</p>
  <p>{{ speechValue.voice }}</p>
</template>
