<template>
  <AzureSettings style="margin-bottom: 16px" />
  <WwiseSettings style="margin-bottom: 16px" />
  <NCard>
    <NSpace justify="end">
      <NButton
        @click="handleOpenFolderClick"
      >
        Open Folder
      </NButton>
      <NButton
        type="info"
        @click="handleSaveClick"
      >
        Save
      </NButton>
    </NSpace>
  </NCard>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { NCard, NButton, NSpace } from "naive-ui";
import { useMessage } from "naive-ui";

import { useSettings } from "../stores/settings";

import AzureSettings from "../components/settings/AzureSettings.vue";
import WwiseSettings from "../components/settings/WwiseSettings.vue";
import { ipcRenderer } from "electron";

const settings = useSettings();
const message = useMessage();

onMounted(() => {
  settings.load();
})

function handleOpenFolderClick() {
  ipcRenderer.invoke("file:openUserData").catch();
}

function handleSaveClick() {
  settings.save().then((res) => {
    message.success("Settings Saved");
  }).catch((err) => {
    message.error("Save Error");
  });
}
</script>
