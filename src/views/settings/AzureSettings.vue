<template>
  <h1>Azure Settings</h1>

  <n-form ref="azureSettingsRef" :model="azureSettingsValue">
    <n-form-item path="key" label="Key">
      <n-input
        v-model:value="azureSettingsValue.key"
        type="password"
        show-password-on="mousedown"
        @keydown.enter.prevent
      />
    </n-form-item>
    <n-form-item path="region" label="Region">
      <n-select v-model:value="azureSettingsValue.region" :options="regions" />
    </n-form-item>
  </n-form>
  <n-space justify="end">
    <n-button> Test </n-button>
    <n-button type="primary"> Connect </n-button>
  </n-space>

  <!-- debug -->
  <p>{{ azureSettingsValue.key }}</p>
  <p>{{ azureSettingsValue.region }}</p>
  <!-- debug -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FormInst } from "naive-ui";
const azureSettingsRef = ref<FormInst | null>(null);
const azureSettingsValue = ref({
  key: null,
  region: null,
});

const regions = [
  {
    label: "East Asia",
    value: "eastasia",
  },
  {
    label: "Southeast Asia",
    value: "southeastasia",
  },
  {
    label: "Japan East",
    value: "japaneast",
  },
  {
    label: "Japan West",
    value: "japanwest",
  },
  {
    label: "Korea Central",
    value: "koreacentral",
  },
];
</script>
