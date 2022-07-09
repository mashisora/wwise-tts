<template>
  <n-card title="Azure Settings">
    <n-form ref="azureSettingsRef" :model="azureSettings">
      <n-form-item path="key" label="Key">
        <n-input
          v-model:value="azureSettings.key"
          type="password"
          show-password-on="mousedown"
          :disabled="azureSettings.status"
        />
      </n-form-item>
      <n-form-item path="region" label="Region">
        <n-select
          v-model:value="azureSettings.region"
          :options="azureInfo.regions"
          :disabled="azureSettings.status"
          filterable
        />
      </n-form-item>
    </n-form>
    <n-space justify="end">
      <n-button
        type="error"
        ghost
        :disabled="!azureSettings.status"
        @click="handleDisconnectClick"
      >
        Disconnect
      </n-button>
      <n-button
        type="primary"
        :loading="loadingRef"
        :disabled="azureSettings.status"
        @click="handleConnectClick"
      >
        Connect
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
import { ipcRenderer } from "electron";

const azureSettings = useAzureSettings();
const azureInfo = useAzureInfo();
const azureSettingsRef = ref<FormInst | null>(null);

const message = useMessage();
const loadingRef = ref(false);

function handleDisconnectClick() {
  azureInfo.voices = [];
  azureSettings.status = false;
  message.info("Disconnected");
}
function handleConnectClick() {
  const key = azureSettings.key;
  const region = azureSettings.region;

  if (key && region) {
    loadingRef.value = true;
    const args = [key, region];
    ipcRenderer.invoke("msspeech:getVoices", args)
      .then((res) => {
        const voices = res.map((item: any) => ({
          label: item.localName,
          value: item.shortName,
        }));
        azureInfo.voices = voices;
        azureSettings.status = true;
        message.success("Connect Successful");
      })
      .catch((err) => {
        message.error("Connect Failed");
      })
      .then(() => {
        loadingRef.value = false;
      });
  } else {
    message.error("Please input key and select region");
  }
}

// Another implement using Microsoft REST API
//
// axios
//   .get("/cognitiveservices/voices/list", {
//     baseURL: `https://${region}.tts.speech.microsoft.com`,
//     headers: {
//       "Ocp-Apim-Subscription-Key": key,
//     },
//   })
//   .then((res) => {
//     const data = res.data;
//     const voices = data.map((item: any) => ({
//       label: item.LocalName,
//       value: item.ShortName,
//     }));
//     azureInfo.voices = voices;
//     azureSettings.status = true;
//     message.success("Connect Successful");
//   })
//   .catch((err) => {
//     message.error("Connect Failed");
//   })
//   .then(() => {
//     loadingRef.value = false;
//   });
</script>
