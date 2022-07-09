<template>
  <AppProvider>
    <n-layout position="absolute">
      <Watermark></Watermark>
      <n-layout has-sider position="absolute" style="bottom: 20px">
        <n-layout-sider bordered width="200" >
          <n-scrollbar>
            <Menu></Menu>
          </n-scrollbar>
        </n-layout-sider>
        <n-scrollbar>
          <n-layout-content content-style="padding: 24px">
            <RouterView></RouterView>
          </n-layout-content>
        </n-scrollbar>
      </n-layout>
      <n-layout-footer bordered position="absolute" style="height: 20px">
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
