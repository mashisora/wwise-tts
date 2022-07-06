<script lang="ts" setup>
import { ref, h, computed } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { MenuInst, MenuOption } from "naive-ui";
import { useOsTheme, darkTheme, lightTheme } from "naive-ui";

const theme = computed(() =>
  useOsTheme().value === "dark" ? darkTheme : lightTheme
);

const route = useRoute();

const menuRef = ref<MenuInst | null>(null);
const menuUpdate = () => {
  menuRef.value?.showOption(route.name as any);
};
const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: "/" }, "Home"),
    key: "home",
  },
  {
    label: () => h(RouterLink, { to: "/speech" }, "Speech"),
    key: "speech",
  },
  {
    label: "Settings",
    children: [
      {
        label: () => h(RouterLink, { to: "/settings/azure" }, "Azure"),
        key: "settings-azure",
      },
      {
        label: () => h(RouterLink, { to: "/settings/wwise" }, "Wwise"),
        key: "settings-wwise",
      },
    ],
  },
  {
    label: () => h(RouterLink, { to: "/about" }, "About"),
    key: "about",
  },
];
</script>

<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
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
                <n-layout-sider bordered>
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
                  <n-menu
                    ref="menuRef"
                    :value="route.name"
                    :options="menuOptions"
                    :accordion="true"
                    @load="menuUpdate"
                  />
                </n-layout-sider>
                <n-layout-content content-style="padding: 24px">
                  <RouterView></RouterView>
                </n-layout-content>
              </n-layout>
              <n-layout-footer
                bordered
                position="absolute"
                style="height: 20px"
              >
                {{ route.name }}
              </n-layout-footer>
            </n-layout>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
