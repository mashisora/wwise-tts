<template>
  <n-card title="Wwise Settings">
    <n-form ref="wwiseSettingsRef" :model="wwiseSettings">
      <n-form-item label="WAAPI URL" path="url">
        <n-input v-model:value="wwiseSettings.url" />
      </n-form-item>
    </n-form>
    <n-space justify="end">
      <n-button @click="wwiseSettings.$reset()"> Reset </n-button>
      <n-button type="primary" @click="handleApplyClick"> Apply </n-button>
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
function handleApplyClick(e: MouseEvent) {
  if (wwiseSettings.url) {
    ipcRenderer
      .invoke("wwise:getInfo")
      .then((res) => {
        message.success(`${res.displayName} ${res.version.displayName}`);
      })
      .catch((err) => {
        message.error("cannot connect to Wwise");
      });
  }
}
</script>
