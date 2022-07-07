<script lang="ts" setup>
import { ref, h, Component } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { NIcon, MenuOption } from "naive-ui";
import Settings16Regular from "@vicons/fluent/Settings16Regular";
import Home16Regular from "@vicons/fluent/Home16Regular";
import Speaker216Regular from "@vicons/fluent/Speaker216Regular";
import Info16Regular from "@vicons/fluent/Info16Regular";
import AppProvider from "./components/AppProvider.vue";

const route = useRoute();
const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};
const renderLink = (path: string, text: string) => {
  return () => h(RouterLink, { to: path }, () => text);
};

const menuOptions: MenuOption[] = [
  {
    label: renderLink("/", "Home"),
    key: "home",
    icon: renderIcon(Home16Regular),
  },
  {
    label: renderLink("/speech", "Speech"),
    key: "speech",
    icon: renderIcon(Speaker216Regular),
  },
  {
    label: renderLink("/settings", "Settings"),
    key: "settings",
    icon: renderIcon(Settings16Regular),
  },
  {
    label: renderLink("/about", "About"),
    key: "about",
    icon: renderIcon(Info16Regular),
  },
];
</script>

<template>
  <AppProvider>
    <n-layout position="absolute">
      <!-- dev -->
      <n-watermark
        content="Demo Version"
        cross
        fullscreen
        :font-size="16"
        :line-height="16"
        :width="384"
        :height="384"
        :x-offset="12"
        :y-offset="60"
        :rotate="-15"
      />
      <!-- dev -->
      <n-layout has-sider position="absolute" style="bottom: 20px">
        <n-layout-sider bordered width="200">
          <n-space justify="center" style="padding: 24px">
            <n-avatar
              :size="96"
              :style="{
                color: 'white',
                backgroundColor: 'black',
                fontSize: '60px',
              }"
              >X
            </n-avatar>
          </n-space>
          <n-menu :value="route.name" :options="menuOptions" />
        </n-layout-sider>
        <n-scrollbar>
          <n-layout-content content-style="padding: 24px">
            <RouterView></RouterView>
          </n-layout-content>
        </n-scrollbar>
      </n-layout>
      <n-layout-footer bordered position="absolute" style="height: 20px">
        {{ route.name }}
      </n-layout-footer>
    </n-layout>
  </AppProvider>
</template>
