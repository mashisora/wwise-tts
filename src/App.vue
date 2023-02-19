<script setup lang="ts">
import { computed } from 'vue';
import { NForm, NFormItem, NSelect, NInput, NSpace, NButton, NCollapse, NCollapseItem } from 'naive-ui';

import { NConfigProvider, NNotificationProvider, NGlobalStyle, useOsTheme, darkTheme } from 'naive-ui';
import { AzureRegions } from './lib/azure';

import TheSettings from './components/TheSettings.vue';

const osTheme = useOsTheme();
const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null));

const options = AzureRegions.map((item) => {
  return {
    label: item.name,
    value: item.id,
  };
});
</script>

<template>
  <header>Azure TTS to Wwise</header>

  <main>
    <NConfigProvider :theme="theme">
      <NGlobalStyle />
      <NNotificationProvider>
        <NSpace justify="center">
          <NSpace vertical size="large">
            <TheSettings />
            <NForm ref="main" style="width: 400px">
              <NFormItem path="text" label="Text">
                <NInput type="textarea" :autosize="{ minRows: 3 }" />
              </NFormItem>

              <NFormItem path="voice" label="Voice">
                <NSelect :options="options" />
              </NFormItem>

              <NFormItem path="role" label="Voice Role">
                <NSelect :options="options" />
              </NFormItem>

              <NFormItem path="style" label="Voice Style">
                <NSelect :options="options" />
              </NFormItem>
              <NSpace vertical>
                <NButton style="width: 100%">Play</NButton>
                <NButton type="info" style="width: 100%">Download</NButton>
                <NButton type="primary" style="width: 100%">Import</NButton>
              </NSpace>
            </NForm>
          </NSpace>
        </NSpace>
      </NNotificationProvider>
    </NConfigProvider>
  </main>
</template>
