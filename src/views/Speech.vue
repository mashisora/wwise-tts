<template>
  {{ speechConfig.fileName }}
  <NCard title="Text to Speech">
    <NFormItem label="Text">
      <NInput v-model:value="speechConfig.text" type="textarea" />
    </NFormItem>
    <NFormItem label="Voice">
      <NSelect
        v-model:value="speechConfig.voice"
        :options="azureInfo.voices"
        filterable
      />
    </NFormItem>
    <NFormItem label="Format">
      <NSelect
        v-model:value="speechConfig.format"
        :options="azureInfo.formats"
      />
    </NFormItem>
    <NFormItem label="File Name">
      <NInputGroup>
        <NInput v-model:value="speechConfig.fileName" />
        <NInputGroupLabel>.wav</NInputGroupLabel>
      </NInputGroup>
    </NFormItem>
    <NSpace justify="end">
      <NButton
        :loading="loadingRef"
        :disabled="!status.azure.isConnected"
        @click="handleSynthesizeClick"
      >
        Synthesize
      </NButton>
      <NButton disabled @click="handlePlayClick"> Play(WIP) </NButton>
      <NButton
        type="primary"
        :disabled="!status.wwise.isConnected"
        @click="handleImportClick"
      >
        Import
      </NButton>
    </NSpace>
  </NCard>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useMessage, NCard, NFormItem, NInput, NInputGroup, NInputGroupLabel, NSelect, NSpace, NButton } from "naive-ui";
import { ipcRenderer } from "electron";

import { useSpeechConfig, useAzureInfo } from "../stores/speech";

import { useStatus } from "../stores/status";
import { useSettings } from "../stores/settings";
const status = useStatus();
const settings = useSettings();


const loadingRef = ref(false);

const speechConfig = useSpeechConfig();
const azureInfo = useAzureInfo();


const message = useMessage();

function handleSynthesizeClick() {
  loadingRef.value = true;
  const key = settings.azure.key;
  const region = settings.azure.region;
  const text = speechConfig.text;
  const voice = speechConfig.voice;
  const format = speechConfig.format;
  const fileName = speechConfig.fileName;

  if (key && region && text && voice && format && fileName) {
    const args = [key, region, text, voice, format, fileName];
    ipcRenderer
      .invoke("msspeech:synthesizeAudio", args)
      .then((res) => {
        loadingRef.value = false;
        message.success("Audio synthesize successful");
      })
      .catch((err) => {
        loadingRef.value = false;
        message.error("Audio synthesize error");
      });
  }
}

function handlePlayClick() {}

function handleImportClick() {
  const url = settings.wwise.url;
  const fileName = speechConfig.fileName;

  if (url && fileName) {
    const args = [url, fileName];
    ipcRenderer
      .invoke("wwise:importAudio", args)
      .then((res) => {
        message.success("Import successful");
      })
      .catch((err) => {
        message.error("Import error");
      });
  } else {
    message.error("Please input file name");
  }
}
</script>
