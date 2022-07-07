<script lang="ts" setup>
import { useWwiseSettings, useAzureSettings } from "../stores/settings";

const azureSettings = useAzureSettings();
const wwiseSettings = useWwiseSettings();
</script>

<template>
  <n-card title="Azure">
    <p>{{ azureSettings.key }}</p>
    <p>{{ azureSettings.region }}</p>
  </n-card>
  <n-card title="Wwise">
    <p>{{ wwiseSettings.url }}</p>
  </n-card>
</template>
