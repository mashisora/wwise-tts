<template>
  <n-card title="Azure Settings">
    <n-form ref="azureSettingsRef" :model="azureSettings">
      <n-form-item path="key" label="Key">
        <n-input
          v-model:value="azureSettings.key"
          type="password"
          show-password-on="mousedown"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="region" label="Region">
        <n-select v-model:value="azureSettings.region" :options="regions" />
      </n-form-item>
    </n-form>
    <n-space justify="end">
      <n-button @click="azureSettings.$reset()"> Reset </n-button>
      <n-button type="primary" @click=""> Apply </n-button>
    </n-space>

    <!-- debug -->
    <p>{{ azureSettings.key }}</p>
    <p>{{ azureSettings.region }}</p>
    <!-- debug -->
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FormInst, FormRules, FormItemRule } from "naive-ui";
import { useAzureSettings } from "../../stores/settings";
import { ipcRenderer } from "electron";
import { useMessage } from "naive-ui";

const azureSettings = useAzureSettings();
const azureSettingsRef = ref<FormInst | null>(null);

const regions = [
  {
    label: "Japan East",
    value: "japaneast",
  },
  {
    label: "Japan West",
    value: "japanwest",
  },
];
</script>
