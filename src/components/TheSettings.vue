<script setup lang="ts">
import { NForm, NFormItem, NSelect, NInput, NCollapse, NCollapseItem } from 'naive-ui';
import { onBeforeMount, ref } from 'vue';
import { AzureRegions } from '../lib/azure';

const options = AzureRegions.map((item) => {
  return {
    label: item.name,
    value: item.id,
  };
});

const region = ref<string>();
const key = ref<string>();
const url = ref<string>();
const expandedNames = ref<string[]>();

const saveValue = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

onBeforeMount(() => {
  region.value = window.localStorage.getItem('region') || undefined;
  key.value = window.localStorage.getItem('key') || undefined;
  url.value = window.localStorage.getItem('url') || undefined;

  if (region.value && key.value && url.value) {
    expandedNames.value = [];
  } else {
    expandedNames.value = ['settings'];
  }
});
</script>

<template>
  {{ region }}
  {{ key }}
  {{ url }}
  {{ expandedNames }}
  <NCollapse v-model:expanded-names="expandedNames">
    <NCollapseItem name="settings" title="Settings">
      <NForm ref="settings">
        <NFormItem path="region" label="Azure Region">
          <NSelect :options="options" v-model:value="region" @update:value="(value) => saveValue('region', value)" />
        </NFormItem>

        <NFormItem path="key" label="Azure Cognitive Service API Key">
          <NInput type="password" v-model:value="key" @update:value="(value) => saveValue('key', value)" />
        </NFormItem>

        <NFormItem path="url" label="WAAPI HTTP URL">
          <NInput default-value="ws://127.0.0.1:8080/waapi" v-model:value="url" @update:value="(value) => saveValue('url', value)" />
        </NFormItem>
      </NForm>
    </NCollapseItem>
  </NCollapse>
</template>
