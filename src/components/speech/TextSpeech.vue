<template>
  <NForm ref="formRef" :rules="formRules" :model="config">
    <NFormItem path="text" label="Text">
      <NInput v-model:value="config.text" type="textarea" />
    </NFormItem>
    <NFormItem path="voice" label="Voice">
      <NSelect v-model:value="config.voice" :options="voiceOptions.voices" filterable />
    </NFormItem>
    <NFormItem path="role" label="Role" v-if="voiceOptions.roles.length">
      <NSelect v-model:value="config.role" :options="voiceOptions.roles" filterable clearable />
    </NFormItem>
    <NFormItem path="style" label="Style" v-if="voiceOptions.styles.length">
      <NSelect v-model:value="config.style" :options="voiceOptions.styles" filterable clearable />
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
    <NCollapse>
      <NCollapseItem title="Advanced">
        <NFormItem path="pitch" label="Pitch">
          <NRadioGroup v-model:value="config.pitch">
            <NRadioButton
              v-for="pitchConstant in azureInfo.pitchConstants"
              :key="pitchConstant.value"
              :value="pitchConstant.value"
              :label="pitchConstant.label"
            />
          </NRadioGroup>
        </NFormItem>
        <NFormItem path="rate" label="Rate">
          <NRadioGroup v-model:value="config.rate">
            <NRadioButton
              v-for="rateConstant in azureInfo.rateConstants"
              :key="rateConstant.value"
              :value="rateConstant.value"
              :label="rateConstant.label"
            />
          </NRadioGroup>
        </NFormItem>
        <NFormItem path="volume" label="Volume">
          <NSlider v-model:value="config.volume" :min="0" :max="100" :step="0.1" />
        </NFormItem>
      </NCollapseItem>
    </NCollapse>
    <NSpace justify="end">
      <NButton :loading="loadingRef" :disabled="!status.azure.isConnected" @click="handlePlayClick"> Play </NButton>
      <NButton type="primary" :disabled="!status.wwise.isConnected" @click="handleImportClick"> Import </NButton>
    </NSpace>
  </NForm>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ipcRenderer } from 'electron';
import { useMessage } from 'naive-ui';
import {
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NInputGroupLabel,
  NSelect,
  NSlider,
  NSpace,
  NButton,
  NRadioGroup,
  NRadioButton,
  NCollapse,
  NCollapseItem,
} from 'naive-ui';
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
  text: null,
  voice: null,
  role: null,
  style: null,
  format: 'Riff48Khz16BitMonoPcm',
  fileName: null,
  pitch: 'default',
  rate: 'default',
  volume: 100,
});
const voiceOptions = computed(() => {
  config.value.role = null;
  config.value.style = null;
  const voice = config.value.voice;
  const voiceInfo = azureInfo.voices.find((item) => item.shortName === config.value.voice);

  return {
    voices: azureInfo.voices.map((item) => ({
      label: `${item.locale.substring(3, 5)} - ${item.localName}`,
      value: item.shortName,
    })),
    roles:
      voice === 'zh-CN-XiaomoNeural' ||
      voice === 'zh-CN-XiaoxuanNeural' ||
      voice === 'zh-CN-YunxiNeural' ||
      voice === 'zh-CN-YunyeNeural'
        ? azureInfo.roles
        : [],
    styles: voiceInfo
      ? voiceInfo.styleList.map((item) => ({
          label: item,
          value: item,
        }))
      : [],
  };
});

// Form Validator
const formRef = ref<FormInst | null>(null);
const formRules: FormRules = {
  text: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('Please input text');
      }
      return true;
    },
    trigger: ['input', 'blur'],
  },
  voice: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      return value ? true : new Error('Please select a voice');
    },
    trigger: ['blur'],
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
      'msspeech:synthesizeAudio',
      settings.azure.key,
      settings.azure.region,
      config.value.text,
      config.value.voice,
      config.value.role,
      config.value.style,
      config.value.format,
      config.value.fileName,
      config.value.pitch,
      config.value.rate,
      config.value.volume,
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
