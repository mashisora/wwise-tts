<template>
  <AppProvider>
    <n-layout position="absolute">
      <Watermark></Watermark>
      <n-layout has-sider position="absolute" style="bottom: 22px">
        <n-layout-sider bordered width="200" :native-scrollbar="false">
          <Menu></Menu>
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px" :native-scrollbar="false">
          <RouterView></RouterView>
        </n-layout-content>
      </n-layout>
      <n-layout-footer bordered position="absolute" style="height: 22px">
        <Status></Status>
      </n-layout-footer>
    </n-layout>
  </AppProvider>
</template>

<script lang="ts" setup>
import AppProvider from "./components/AppProvider.vue";
import Menu from "./components/Menu.vue";
import Status from "./components/Status.vue";
import Watermark from "./components/Watermark.vue";
</script>
