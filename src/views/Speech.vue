<template>
  <n-card title="Text to Speech">
    <n-form ref="speechRef" :model="speech">
      <n-form-item path="key" label="Text">
        <n-input v-model:value="speech.text" type="textarea" />
      </n-form-item>
      <n-form-item path="voice" label="Voice">
        <n-select v-model:value="speech.voice" :options="voices" filterable />
      </n-form-item>
      <n-form-item path="format" label="Format">
        <n-select v-model:value="speech.format" :options="formats" />
      </n-form-item>
      <n-form-item path="fileName" label="File Name">
        <n-input v-model:value="speech.fileName" />
      </n-form-item>

      <!-- <n-form-item path="speed" label="Speed(WIP)">
        <n-grid x-gap="12" cols="5">
          <n-grid-item span="4" style="padding: 5px">
            <n-slider
              v-model:value="speech.speed"
              :min="0.5"
              :max="2"
              :step="0.01"
            />
          </n-grid-item>
          <n-grid-item>
            <n-input v-model:value="speech.speed" size="small" />
          </n-grid-item>
        </n-grid>
      </n-form-item>
      <n-form-item path="pitch" label="Pitch(WIP)">
        <n-grid x-gap="12" cols="5">
          <n-grid-item span="4" style="padding: 5px">
            <n-slider
              v-model:value="speech.pitch"
              :min="0.5"
              :max="2"
              :step="0.01"
            />
          </n-grid-item>
          <n-grid-item>
            <n-input v-model:value="speech.pitch" size="small" />
          </n-grid-item>
        </n-grid>
      </n-form-item> -->

      <n-space justify="end">
        <n-button
          :loading="synthesizeLoadingRef"
          @click="handleSynthesizeClick"
        >
          Synthesize
        </n-button>
        <n-button> Play </n-button>
        <n-button type="primary" strong> Import </n-button>
      </n-space>
    </n-form>
  </n-card>

  <p>{{ speech.text }}</p>
  <p>{{ speech.voice }}</p>
  <p>{{ speech.format }}</p>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { FormInst } from "naive-ui";
import { useSpeech, useAzureInfo } from "../stores/speech";
import { useAzureSettings } from "../stores/settings";
import { useMessage } from "naive-ui";
import { ipcRenderer } from "electron";
import { removeAllListeners } from "process";

const speechRef = ref<FormInst | null>(null);
const synthesizeLoadingRef = ref(false);

const speech = useSpeech();
const azureInfo = useAzureInfo();
const azureSettings = useAzureSettings();

const voices = azureInfo.voices.map((item) => ({
  label: item.LocalName,
  value: item.ShortName,
}));
const formats = azureInfo.formats.map((item) => ({
  label: item,
  value: item,
}));

const message = useMessage();
function handleSynthesizeClick() {
  synthesizeLoadingRef.value = true;
  ipcRenderer.send("msspeech:synthesizeAudio", [
    azureSettings.key,
    azureSettings.region,
    speech.text,
    speech.voice,
    speech.format,
    speech.fileName,
  ]);
}

// ipcRenderer
//   .invoke("msspeech:synthesizeAudio", [
//     azureSettings.key,
//     azureSettings.region,
//     speech.text,
//     speech.voice,
//     speech.format,
//     speech.fileName,
//   ])
//   .then((res) => {
//     console.log(res);
//     synthesizeLoadingRef.value = false;
//     message.success("Synthesize Success");
//   })
//   .catch((err) => {
//     synthesizeLoadingRef.value = false;
//     message.error("ERR");
//   });
</script>
