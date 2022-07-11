<template>
  <NCard title="Wwise Settings">
    <NForm ref="formRef" :rules="formRules" :model="settings">
      <NFormItem path="url" label="WAAPI URL">
        <NInput
          ref="urlInputRef"
          v-model:value="settings.url"
          :disabled="status.isConnected"
        />
      </NFormItem>
      <NSpace justify="end">
        <NButton
          :disabled="status.isConnected"
          @click="handleResetClick"
        >
          Reset
        </NButton>
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
import { NCard, NForm, NFormItem, NInput, NSpace, NButton } from "naive-ui";
import { InputInst, FormInst, FormRules, FormItemRule } from "naive-ui";

import { useStatus } from "../../stores/status";
import { useSettings } from "../../stores/settings";

const status = useStatus().wwise;
const settings = useSettings().wwise;
const message = useMessage();

const urlInputRef = ref<InputInst | null>(null)
const formRef = ref<FormInst | null>(null)
const formRules: FormRules = {
  url: {
    validator (rule: FormItemRule, value: string) {
      if (!value) {
        return new Error('Please input WAAPI URL')
      }
      return true
    },
    trigger: ['input', 'blur', 'focus']
  }
}

function handleResetClick() {
  settings.url = "ws://127.0.0.1:8080/waapi";
  urlInputRef.value?.focus();
}

function handleDisconnectClick() {
  status.isConnected = false;
  message.info("Disconnected");
}

function handleConnectClick() {
  formRef.value?.validate((err) => {
    if (!err) {
      _connect();
    } else {
      message.error('Invalid information')
    }
  })
}

function _connect() {
  const url = settings.url;
  const args = [url];
  ipcRenderer
    .invoke("wwise:getInfo", args)
    .then((res) => {
      status.isConnected = true;
      message.success(`${res.displayName} ${res.version.displayName}`);
    })
    .catch((err) => {
      message.error("Cannot connect to Wwise");
    });
}
</script>
