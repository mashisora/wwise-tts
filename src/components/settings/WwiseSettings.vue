<template>
  <NCard title="Wwise Settings">
    <NForm ref="wwiseSettingsRef" :model="wwiseSettings">
      <NFormItem label="WAAPI URL" path="url">
        <NInput
          :disabled="wwiseSettings.status"
          v-model:value="wwiseSettings.url"
        />
      </NFormItem>
    </NForm>
    <NSpace justify="end">
      <NButton
        :disabled="wwiseSettings.status"
        @click="wwiseSettings.$reset()"
      >
        Reset
      </NButton>
      <NButton
        type="error"
        ghost
        :disabled="!wwiseSettings.status"
        @click="handleDisconnectClick"
      >
        Disconnect
      </NButton>
      <NButton
        type="primary"
        :disabled="wwiseSettings.status"
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
import { useWwiseSettings } from "../../stores/settings";
import { useMessage, NCard, NForm, NFormItem, NInput, NSpace, NButton } from "naive-ui";
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
