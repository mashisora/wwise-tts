<script lang="ts" setup>
import { ref, computed } from "vue";
import { useMessage } from "naive-ui";
import { FormInst, FormRules, FormItemRule } from "naive-ui";

const wwiseSettingsRef = ref<FormInst | null>(null);
const wwiseSettingsValue = ref({
  url: null,
});

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
function handleValidateClick(e: MouseEvent) {
  e.preventDefault();
  wwiseSettingsRef.value?.validate((errors) => {
    if (!errors) {
      message.success("好");
    } else {
      console.log(errors);
      message.error("不好");
    }
  });
}
</script>

<template>
  <h1>Wwise Settings</h1>
  <n-form
    ref="wwiseSettingsRef"
    :model="wwiseSettingsValue"
    :rules="wwiseSettingsRules"
  >
    <n-form-item label="WAAPI URL" path="url">
      <n-input v-model:value="wwiseSettingsValue.url" />
    </n-form-item>

    <n-space justify="end">
      <n-button @click="handleValidateClick"> Default </n-button>
      <n-button @click="handleValidateClick"> Test </n-button>
      <n-button type="primary" @click="handleValidateClick"> Connect </n-button>
    </n-space>
  </n-form>

  <!-- debug -->
  <p>{{ wwiseSettingsValue.url }}</p>
  <!-- debug -->
</template>
