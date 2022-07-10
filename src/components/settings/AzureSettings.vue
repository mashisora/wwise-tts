<template>
  <NCard title="Azure Settings">
    <NForm ref="formRef" :rules="formRules" :model="settings">
      <NFormItem path="key" label="Key">
        <NInput
          v-model:value="settings.key"
          :disabled="status.isConnected"
        />
      </NFormItem>
      <NFormItem path="region" label="Region">
        <NSelect
          v-model:value="settings.region"
          :options="azureInfo.regions"
          :disabled="status.isConnected"
          filterable
        />
      </NFormItem>
      <NSpace justify="end">
        <NButton
          type="error"
          ghost
          :disabled="!status.isConnected"
          @click="handleDisconnectClick"
        >
          Disconnect
        </NButton>
        <NButton
          type="primary"
          :loading="loadingRef"
          :disabled="status.isConnected"
          @click="handleConnectClick"
        >
          Connect
        </NButton>
      </NSpace>
    </NForm>
  </NCard>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ipcRenderer } from "electron";
import { useMessage } from "naive-ui";
import { NCard, NForm, NFormItem, NInput, NSelect, NSpace, NButton } from "naive-ui";
import { FormInst, FormRules, FormItemRule } from "naive-ui";

import { useStatus } from "../../stores/status";
import { useSettings } from "../../stores/settings";
import { useAzureInfo } from "../../stores/azureInfo";

const status = useStatus().azure
const settings = useSettings().azure;
const azureInfo = useAzureInfo();

const message = useMessage();
const loadingRef = ref(false);

const formRef = ref<FormInst | null>(null)
const formRules: FormRules = {
  key: {
    validator (rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('Please input azure cognitive services key')
      }
      return true
    },
    trigger: ['input', 'blur']
  },
  region: {
    validator (rule: FormItemRule, value: string) {
      return value ? true : new Error('Please select a region');
    },
    trigger: ['blur']
  }
} 

function handleDisconnectClick() {
  status.isConnected = false;
  message.info("Disconnected");
}

function handleConnectClick() {
  formRef.value?.validate((err) => {
    if (!err) {
      _connect();
      _saveConfig();
    } else {
      message.error('Invalid information')
    }
  })
}

function _connect() {
  loadingRef.value = true;
  const key = settings.key;
  const region = settings.region;
  const args = [key, region];
  ipcRenderer.invoke("msspeech:getVoices", args)
    .then((res) => {
      const voices = res.map((item: any) => ({
        label: item.localName,
        value: item.shortName,
      }));
      azureInfo.voices = voices;
      status.isConnected = true;
      message.success("Connect Successful");
    })
    .catch((err) => {
      message.error("Connect Failed");
    })
    .then(() => {
      loadingRef.value = false;
    });
}

function _saveConfig() {

}
</script>
