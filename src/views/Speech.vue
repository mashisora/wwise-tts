<template>
  {{ speechConfig.fileName }}
  <NCard title="Text to Speech">
    <NForm ref="speechConfigRef" :model="speechConfig">
      <NFormItem path="key" label="Text">
        <NInput v-model:value="speechConfig.text" type="textarea" />
      </NFormItem>
      <NFormItem path="voice" label="Voice">
        <NSelect
          v-model:value="speechConfig.voice"
          :options="azureInfo.voices"
          filterable
        />
      </NFormItem>
      <NFormItem path="format" label="Format">
        <NSelect
          v-model:value="speechConfig.format"
          :options="azureInfo.formats"
        />
      </NFormItem>
      <NFormItem path="fileName" label="File Name">
        <NInputGroup>
          <NInput v-model:value="speechConfig.fileName" />
          <NInputGroupLabel>.wav</NInputGroupLabel>
        </NInputGroup>
      </NFormItem>
      <NSpace justify="end">
        <NButton
          :loading="loadingRef"
          :disabled="!azureSettings.status"
          @click="handleSynthesizeClick"
        >
          Synthesize
        </NButton>
        <NButton disabled @click="handlePlayClick"> Play(WIP) </NButton>
        <NButton
          type="primary"
          :disabled="!wwiseSettings.status"
          @click="handleImportClick"
        >
          Import
        </NButton>
      </NSpace>
    </NForm>
  </NCard>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { FormInst } from "naive-ui";
import { useSpeechConfig, useAzureInfo } from "../stores/speech";
import { useAzureSettings, useWwiseSettings } from "../stores/settings";
import { useMessage, NCard, NForm, NFormItem, NInput, NInputGroup, NInputGroupLabel, NSelect, NSpace, NButton } from "naive-ui";
import { ipcRenderer } from "electron";

const speechConfigRef = ref<FormInst | null>(null);
const loadingRef = ref(false);

const speechConfig = useSpeechConfig();
const azureInfo = useAzureInfo();
const azureSettings = useAzureSettings();
const wwiseSettings = useWwiseSettings();

const message = useMessage();

function handleSynthesizeClick() {
  loadingRef.value = true;
  const key = azureSettings.key;
  const region = azureSettings.region;
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
  const url = wwiseSettings.url;
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
  }
}
</script>
