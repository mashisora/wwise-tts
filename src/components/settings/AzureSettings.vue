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
        <n-select
          v-model:value="azureSettings.region"
          :options="regions"
          filterable
        />
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
const azureInfo = useAzureInfo();
const azureSettingsRef = ref<FormInst | null>(null);

const regions = azureInfo.regions;

const message = useMessage();
const loadingRef = ref(false);

function handleApplyClick() {
  const key = azureSettings.key;
  const region = azureSettings.region;

  if (key && region) {
    loadingRef.value = true;
    axios
      .get("/cognitiveservices/voices/list", {
        baseURL: `https://${region}.tts.speech.microsoft.com`,
        headers: {
          "Ocp-Apim-Subscription-Key": key,
        },
      })
      .then((res) => {
        azureInfo.voices = res.data;
        message.success("Get voice list successful");
      })
      .catch((err) => {
        message.error("Get voice list failed");
      })
      .then(() => {
        loadingRef.value = false;
      });
  } else {
    message.error("Please input key and select region");
  }
}
</script>
