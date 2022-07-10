<template>
  <AzureSettings style="margin-bottom: 16px" />
  <WwiseSettings />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useSettings } from "../stores/settings";

import AzureSettings from "../components/settings/AzureSettings.vue";
import WwiseSettings from "../components/settings/WwiseSettings.vue";

onMounted(() => {
  const settings = useSettings()
  settings.load();
})
</script>
