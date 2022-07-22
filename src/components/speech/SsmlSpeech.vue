<template>
  <NForm ref="formRef" :rules="formRules" :model="config">
    <NFormItem path="ssml" label="SSML">
      <NInput v-model:value="config.ssml" type="textarea" />
    </NFormItem>
    <NFormItem path="format" label="Format">
      <NSelect v-model:value="config.format" :options="azureInfo.formats" />
    </NFormItem>
    <NFormItem path="fileName" label="File Name">
      <NInputGroup>
        <NInput v-model:value="config.fileName" />
        <NInputGroupLabel>.wav</NInputGroupLabel>
      </NInputGroup>
    </NFormItem>
    <NSpace justify="end">
      <NButton :loading="loadingRef" :disabled="!status.azure.isConnected" @click="handlePlayClick"> Play </NButton>
      <NButton type="primary" :disabled="!status.wwise.isConnected" @click="handleImportClick"> Import </NButton>
    </NSpace>
  </NForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ipcRenderer } from 'electron';
import { useMessage } from 'naive-ui';
import { NForm, NFormItem, NInput, NInputGroup, NInputGroupLabel, NSelect, NSpace, NButton } from 'naive-ui';
import { FormInst, FormRules, FormItemRule } from 'naive-ui';

import { useStatus } from '../../stores/status';
import { useSettings } from '../../stores/settings';
import { useAzureInfo } from '../../stores/azureInfo';

const status = useStatus();
const settings = useSettings();
const azureInfo = useAzureInfo();
const message = useMessage();

const loadingRef = ref(false);
const config = ref({
  ssml: null,
  format: 'Riff48Khz16BitMonoPcm',
  fileName: null,
});

// Form Validator
const formRef = ref<FormInst | null>(null);
const formRules: FormRules = {
  ssml: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('Please input SSML');
      }
      return true;
    },
    trigger: ['input', 'blur'],
  },
  format: {
    required: true,
  },
  fileName: {
    required: true,
    key: 'import',
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('Please input a file name');
      } else if (!/^[a-zA-Z0-9._-]+$/g.test(value)) {
        return new Error('Please input a valid file name');
      }
      return true;
    },
    trigger: ['input', 'blur'],
  },
};

// Button Handler
function handlePlayClick() {
  formRef.value?.validate((err) => {
    if (!err) {
      _synthesize();
    } else {
      message.error('Invalid information');
    }
  });
}

function handleImportClick() {
  formRef.value?.validate(
    (err) => {
      if (!err) {
        _import();
      } else {
        message.error('Invalid information');
      }
    },
    (rule) => rule?.key === 'import',
  );
}

function _synthesize() {
  loadingRef.value = true;
  ipcRenderer
    .invoke(
      'msspeech:synthesizeAudioSsml',
      settings.azure.key,
      settings.azure.region,
      config.value.ssml,
      config.value.format,
      config.value.fileName,
    )
    .then((res) => {
      const base64 = Buffer.from(res).toString('base64');
      const audio = new Audio('data:audio/wav;base64,' + base64);
      audio.play();
      message.success('Audio synthesize successful');
    })
    .catch(() => {
      message.error('Audio synthesize error');
    })
    .finally(() => {
      loadingRef.value = false;
    });
}

function _import() {
  ipcRenderer
    .invoke('wwise:importAudio', settings.wwise.url, config.value.fileName)
    .then(() => {
      message.success('Import successful');
    })
    .catch(() => {
      message.error('Import faild');
    });
}
</script>
