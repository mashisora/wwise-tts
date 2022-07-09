<template>
  <NCard title="Azure Settings">
      <NFormItem label="Key">
        <NInput
          v-model:value="settings.key"
          :disabled="status.isConnected"
        />
      </NFormItem>
      <NFormItem label="Region">
        <NSelect
          v-model:value="settings.region"
          :options="azureInfo.regions"
          :disabled="status.isConnected"
          filterable
        />
      </NFormItem>
    <NSpace justify="end">
      <NButton
        type="error"
        ghost
        :disabled="!status.isConnected"
        @click="handleDisconnectClick"
      >
        Disconnect
      </NButton>
      <NButton
        type="primary"
        :loading="loadingRef"
        :disabled="status.isConnected"
        @click="handleConnectClick"
      >
        Connect
      </NButton>
    </NSpace>
  </NCard>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useMessage, NCard, NFormItem, NInput, NSelect, NSpace, NButton } from "naive-ui";
import { ipcRenderer } from "electron";

import { useStatus } from "../../stores/status";
import { useSettings } from "../../stores/settings";
import { useAzureInfo } from "../../stores/speech";

const status = useStatus().azure
const settings = useSettings().azure;
const azureInfo = useAzureInfo();

const message = useMessage();
const loadingRef = ref(false);

function handleDisconnectClick() {
  azureInfo.voices = [];
  status.isConnected = false;
  message.info("Disconnected");
}
function handleConnectClick() {
  const key = settings.key;
  const region = settings.region;

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
        status.isConnected = true;
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
