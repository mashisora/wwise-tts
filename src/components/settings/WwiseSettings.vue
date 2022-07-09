<template>
  <NCard title="Wwise Settings">
    <NFormItem label="WAAPI URL">
      <NInput
        v-model:value="settings.url"
        :disabled="status.isConnected"
      />
    </NFormItem>
    <NSpace justify="end">
      <NButton
        :disabled="status.isConnected"
        @click="handleResetClick"
      >
        Reset
      </NButton>
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
        :disabled="status.isConnected"
        @click="handleConnectClick"
      >
        Connect
      </NButton>
    </NSpace>
  </NCard>
</template>

<script lang="ts" setup>
import { useMessage, NCard, NFormItem, NInput, NSpace, NButton } from "naive-ui";
import { ipcRenderer } from "electron";

import { useStatus } from "../../stores/status";
import { useSettings } from "../../stores/settings";

const status = useStatus().wwise;
const settings = useSettings().wwise;
const message = useMessage();

function handleResetClick() {
  settings.url = "ws://127.0.0.1:8080/waapi";
}

function handleDisconnectClick() {
  status.isConnected = false;
  message.info("Disconnected");
}

function handleConnectClick() {
  const url = settings.url;
  if (url) {
    const args = [url];
    ipcRenderer
      .invoke("wwise:getInfo", args)
      .then((res) => {
        status.isConnected = true;
        message.success(`${res.displayName} ${res.version.displayName}`);
      })
      .catch((err) => {
        message.error("Cannot connect to Wwise");
      });
  }
}
</script>
