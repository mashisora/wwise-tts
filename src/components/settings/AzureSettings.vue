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
      <n-button type="primary" :loading="loadingRef" @click="handleApplyClick">
        Apply
      </n-button>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FormInst } from "naive-ui";
import { useAzureSettings } from "../../stores/settings";
import { useAzureInfo } from "../../stores/speech";
import { useMessage } from "naive-ui";
import axios from "axios";

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

const message = useMessage();
const loadingRef = ref(false);
function handleApplyClick() {
  if (azureSettings.key && azureSettings.region) {
    loadingRef.value = true;
    axios
      .get("/cognitiveservices/voices/list", {
        baseURL: `https://${azureSettings.region}.tts.speech.microsoft.com`,
        headers: {
          "Ocp-Apim-Subscription-Key": azureSettings.key,
        },
      })
      .then((res) => {
        azureInfo.voices = res.data;
        message.success("SUCCESS");
      })
      .catch((err) => {
        message.error("Faild");
      })
      .then(() => {
        loadingRef.value = false;
      });
  } else {
    message.error("VOID");
  }
}

const azureInfo = useAzureInfo();
</script>
