<template>
  <n-card title="Wwise Settings">
    <n-form
      ref="wwiseSettingsRef"
      :model="wwiseSettings"
      :rules="wwiseSettingsRules"
    >
      <n-form-item label="WAAPI URL" path="url">
        <n-input v-model:value="wwiseSettings.url" />
      </n-form-item>
      <n-space justify="end">
        <n-button @click="wwiseSettings.$reset()"> Reset </n-button>
        <n-button type="primary" @click="handleApplyClick"> Apply </n-button>
      </n-space>
    </n-form>

    <!-- debug -->
    <p>{{ wwiseSettings.url }}</p>
    <!-- debug -->
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FormInst, FormRules, FormItemRule } from "naive-ui";
import { useWwiseSettings } from "../../stores/settings";
import { ipcRenderer } from "electron";
import { useMessage } from "naive-ui";

const wwiseSettings = useWwiseSettings();
const wwiseSettingsRef = ref<FormInst | null>(null);

// TODO: find a better pattern
const wwiseSettingsRules: FormRules = {
  url: {
    validator(rule: FormItemRule, value: string) {
      if (value && !/^\d*$/.test(value)) {
        return new Error("年龄应该为整数");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
};
const message = useMessage();

function handleApplyClick(e: MouseEvent) {
  e.preventDefault();
  message.success("Success");
}
</script>
