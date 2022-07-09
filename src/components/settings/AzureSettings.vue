<template>
  <NCard title="Azure Settings">
    <NForm ref="azureSettingsRef" :model="azureSettings">
      <NFormItem path="key" label="Key">
        <NInput
          v-model:value="azureSettings.key"
          type="password"
          show-password-on="mousedown"
          :disabled="azureSettings.status"
        />
      </NFormItem>
      <NFormItem path="region" label="Region">
        <NSelect
          v-model:value="azureSettings.region"
          :options="azureInfo.regions"
          :disabled="azureSettings.status"
          filterable
        />
      </NFormItem>
      </NForm>
    <NSpace justify="end">
      <NButton
        type="error"
        ghost
        :disabled="!azureSettings.status"
        @click="handleDisconnectClick"
      >
        Disconnect
      </NButton>
      <NButton
        type="primary"
        :loading="loadingRef"
        :disabled="azureSettings.status"
        @click="handleConnectClick"
      >
        Connect
      </NButton>
    </NSpace>
  </NCard>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FormInst } from "naive-ui";
import { useAzureSettings } from "../../stores/settings";
import { useAzureInfo } from "../../stores/speech";
import { useMessage, NCard, NForm, NFormItem, NInput, NSelect, NSpace, NButton } from "naive-ui";
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
</script>
