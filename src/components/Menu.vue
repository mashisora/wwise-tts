<template>
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
</template>

<script lang="ts" setup>
import { h, Component } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { NIcon, MenuOption } from "naive-ui";
import Settings16Regular from "@vicons/fluent/Settings16Regular";
import Home16Regular from "@vicons/fluent/Home16Regular";
import Speaker216Regular from "@vicons/fluent/Speaker216Regular";
import Info16Regular from "@vicons/fluent/Info16Regular";

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