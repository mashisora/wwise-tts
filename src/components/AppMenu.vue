<template>
  <NSpace justify="center" style="padding: 24px">
    <NAvatar
      :size="96"
      :style="{
        color: 'white',
        backgroundColor: 'black',
        fontSize: '60px',
      }"
      >X
    </NAvatar>
  </NSpace>
  <NMenu :value="route.path" :options="menuOptions" />
</template>

<script lang="ts" setup>
import { h, Component } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { NSpace, NIcon, NAvatar, NMenu, MenuOption } from 'naive-ui';
import Settings16Regular from '@vicons/fluent/Settings16Regular';
import Home16Regular from '@vicons/fluent/Home16Regular';
import Speaker216Regular from '@vicons/fluent/Speaker216Regular';
import Info16Regular from '@vicons/fluent/Info16Regular';

const route = useRoute();
const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};
const renderLink = (path: string, text: string) => {
  return () => h(RouterLink, { to: path }, () => text);
};

const menuOptions: MenuOption[] = [
  {
    label: renderLink('/', 'Home'),
    key: '/',
    icon: renderIcon(Home16Regular),
  },
  {
    label: renderLink('/speech', 'Speech'),
    key: '/speech',
    icon: renderIcon(Speaker216Regular),
  },
  {
    label: renderLink('/settings', 'Settings'),
    key: '/settings',
    icon: renderIcon(Settings16Regular),
  },
  {
    label: renderLink('/about', 'About'),
    key: '/about',
    icon: renderIcon(Info16Regular),
  },
];
</script>
