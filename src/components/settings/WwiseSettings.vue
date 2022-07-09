<template>
  <n-card title="Wwise Settings">
    <n-form ref="wwiseSettingsRef" :model="wwiseSettings">
      <n-form-item label="WAAPI URL" path="url">
        <n-input
          :disabled="wwiseSettings.status"
          v-model:value="wwiseSettings.url"
        />
      </n-form-item>
    </n-form>
    <n-space justify="end">
      <n-button
        :disabled="wwiseSettings.status"
        @click="wwiseSettings.$reset()"
      >
        Reset
      </n-button>
      <n-button
        type="error"
        ghost
        :disabled="!wwiseSettings.status"
        @click="handleDisconnectClick"
      >
        Disconnect
      </n-button>
      <n-button
        type="primary"
        :disabled="wwiseSettings.status"
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
import { useWwiseSettings } from "../../stores/settings";
import { useMessage } from "naive-ui";
import { ipcRenderer } from "electron";

const wwiseSettings = useWwiseSettings();
const wwiseSettingsRef = ref<FormInst | null>(null);

const message = useMessage();

function handleDisconnectClick() {
  wwiseSettings.status = false;
  message.info("Disconnected");
}

function handleConnectClick() {
  const url = wwiseSettings.url;
  if (url) {
    const args = [url];
    ipcRenderer
      .invoke("wwise:getInfo", args)
      .then((res) => {
        wwiseSettings.status = true;
        message.success(`${res.displayName} ${res.version.displayName}`);
      })
      .catch((err) => {
        message.error("Cannot connect to Wwise");
      });
  }
}
</script>
