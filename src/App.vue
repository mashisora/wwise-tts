<template>
  <AppProvider>
    <NLayout position="absolute">
      <!-- <Watermark /> -->
      <NLayout has-sider position="absolute" style="bottom: 22px">
        <NLayoutSider bordered width="200" :native-scrollbar="false">
          <AppMenu />
        </NLayoutSider>
        <NLayoutContent content-style="padding: 24px" :native-scrollbar="false">
          <RouterView v-slot="{ Component }">
            <KeepAlive>
              <component :is="Component" />
            </KeepAlive>
          </RouterView>
        </NLayoutContent>
      </NLayout>
      <NLayoutFooter bordered position="absolute" style="height: 22px">
        <AppStatus />
      </NLayoutFooter>
    </NLayout>
  </AppProvider>
</template>

<script lang="ts" setup>
import { KeepAlive } from 'vue';
import { NLayout, NLayoutSider, NLayoutContent, NLayoutFooter } from 'naive-ui';
import AppProvider from './components/AppProvider.vue';
import AppMenu from './components/AppMenu.vue';
import AppStatus from './components/AppStatus.vue';
import Watermark from './components/Watermark.vue';
</script>
