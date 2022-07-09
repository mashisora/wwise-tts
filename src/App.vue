<template>
  <AppProvider>
    <n-layout position="absolute">
      <Watermark />
      <n-layout has-sider position="absolute" style="bottom: 22px">
        <n-layout-sider bordered width="200" :native-scrollbar="false">
          <AppMenu />
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px" :native-scrollbar="false">
          <RouterView />
        </n-layout-content>
      </n-layout>
      <n-layout-footer bordered position="absolute" style="height: 22px">
        <AppStatus />
      </n-layout-footer>
    </n-layout>
  </AppProvider>
</template>

<script lang="ts" setup>
import AppProvider from "./components/AppProvider.vue";
import AppMenu from "./components/AppMenu.vue";
import AppStatus from "./components/AppStatus.vue";
import Watermark from "./components/Watermark.vue";
</script>
