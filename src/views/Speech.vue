<template>
  {{ speechConfig.fileName }}
  <n-card title="Text to Speech">
    <n-form ref="speechConfigRef" :model="speechConfig">
      <n-form-item path="key" label="Text">
        <n-input v-model:value="speechConfig.text" type="textarea" />
      </n-form-item>
      <n-form-item path="voice" label="Voice">
        <n-select
          v-model:value="speechConfig.voice"
          :options="voices"
          filterable
        />
      </n-form-item>
      <n-form-item path="format" label="Format">
        <n-select v-model:value="speechConfig.format" :options="formats" />
      </n-form-item>
      <n-form-item path="fileName" label="File Name">
        <n-input-group>
          <n-input v-model:value="speechConfig.fileName" />
          <n-input-group-label>.wav</n-input-group-label>
        </n-input-group>
      </n-form-item>
      <n-space justify="end">
        <n-button
          :loading="synthesizeLoadingRef"
          @click="handleSynthesizeClick"
        >
          Synthesize
        </n-button>
        <n-button @click="handlePlayClick"> Play </n-button>
        <n-button type="primary" @click="handleImportClick"> Import </n-button>
      </n-space>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { FormInst } from "naive-ui";
import { useSpeechConfig, useAzureInfo } from "../stores/speech";
import { useAzureSettings, useWwiseSettings } from "../stores/settings";
import { useMessage } from "naive-ui";
import { ipcRenderer } from "electron";

const speechConfigRef = ref<FormInst | null>(null);
const synthesizeLoadingRef = ref(false);

const speechConfig = useSpeechConfig();
const azureInfo = useAzureInfo();
const azureSettings = useAzureSettings();
const wwiseSettings = useWwiseSettings();

const voices = azureInfo.voices.map((item) => ({
  label: item.LocalName,
  value: item.ShortName,
}));
const formats = azureInfo.formats;

const message = useMessage();

function handleSynthesizeClick() {
  synthesizeLoadingRef.value = true;
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
        synthesizeLoadingRef.value = false;
        message.success("Audio synthesize successful");
      })
      .catch((err) => {
        synthesizeLoadingRef.value = false;
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
