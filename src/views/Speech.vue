<template>
  <NCard title="Text to Speech">
    <NForm ref="formRef" :rules="formRules" :model="speechConfig">
      <NFormItem path="text" label="Text">
        <NInput
          v-model:value="speechConfig.text"
          type="textarea"
        />
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
    </NForm>
  </NCard>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ipcRenderer } from "electron";
import { useMessage } from "naive-ui";
import { NCard, NForm, NFormItem, NInput, NInputGroup, NInputGroupLabel, NSelect, NSpace, NButton } from "naive-ui";
import { FormInst, FormRules, FormItemRule } from "naive-ui";

import { useSpeechConfig, useAzureInfo } from "../stores/speech";

import { useStatus } from "../stores/status";
import { useSettings } from "../stores/settings";

const status = useStatus();
const settings = useSettings();
const speechConfig = useSpeechConfig();
const azureInfo = useAzureInfo();

const message = useMessage();
const loadingRef = ref(false);

const formRef = ref<FormInst | null>(null)
const formRules: FormRules = {
  text: {
    validator (rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('Please input text')
      }
      return true
    },
    trigger: ['input', 'blur']
  },
  voice: {
    validator (rule: FormItemRule, value: string) {
      return value ? true : new Error('Please select a voice');
    },
    trigger: ['blur']
  },
  format: {
    validator (rule: FormItemRule, value: string) {
      return value ? true : new Error('Please select a format');
    },
    trigger: ['blur']
  },
  fileName: {
    key: "import",
    validator (rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('Please input a file name')
      } else if (!/^[a-zA-Z0-9._-]+$/g.test(value)) {
        return new Error('Please input a valid file name')
      }
      return true
    },
    trigger: ['input', 'blur']
  }
}

function handleSynthesizeClick() {
  formRef.value?.validate((err) => {
    if(!err) {
      _synthesize();
    } else {
      message.error('Invalid information')
    }
  })
}

function handlePlayClick() {}

function handleImportClick() {
  formRef.value?.validate((err) => {
    if(!err) {
      _import();
    } else {
      message.error('Invalid information')
    }
  },
  (rule) => (rule?.key === 'import'))
}

function _synthesize() {
  loadingRef.value = true;
  const key = settings.azure.key;
  const region = settings.azure.region;
  const text = speechConfig.text;
  const voice = speechConfig.voice;
  const format = speechConfig.format;
  const fileName = speechConfig.fileName;
  const args = [key, region, text, voice, format, fileName];
  ipcRenderer
    .invoke("msspeech:synthesizeAudio", args)
    .then((res) => {
      message.success("Audio synthesize successful");
    })
    .catch((err) => {
      message.error("Audio synthesize error");
    })
    .then(() => {
      loadingRef.value = false;
    });
}

function _import() {
  const url = settings.wwise.url;
  const fileName = speechConfig.fileName;
  const args = [url, fileName];
  ipcRenderer
    .invoke("wwise:importAudio", args)
    .then((res) => {
      message.success("Import successful");
    })
    .catch((err) => {
      message.error("Import faild");
    });
}
</script>
