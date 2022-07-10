<template>
  <NCard title="About"> </NCard>
  <NButton @click="handleTestClick">Test</NButton>
</template>

<script lang="ts" setup>
import { ipcRenderer } from "electron";
import { NCard, NButton, useMessage } from "naive-ui";

import { useSettings } from "../stores/settings";
const settings = useSettings();
const message = useMessage();

function handleTestClick() {
  settings.save();
  // ipcRenderer
  //   .invoke("file:test", ['test'])
  //   .then((res) => {
  //     message.success("Test pass");
  //     message.info(res.data)
  //   })
  //   .catch((err) => {
  //     message.error("Test error");
  //   })
}
</script>
