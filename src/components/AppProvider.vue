<template>
  <NConfigProvider :theme="theme">
    <NGlobalStyle />
    <NLoadingBarProvider>
      <NMessageProvider>
        <NNotificationProvider>
          <NDialogProvider>
            <slot></slot>
          </NDialogProvider>
        </NNotificationProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import {
  NConfigProvider,
  NGlobalStyle,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  useOsTheme,
  darkTheme,
} from "naive-ui";

const osTheme = useOsTheme();
const theme = computed(() => (osTheme.value === "dark" ? darkTheme : null));
</script>

<style>
body {
  overflow: hidden;
}
</style>
