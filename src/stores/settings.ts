import { toRaw } from 'vue';
import { ipcRenderer } from 'electron';
import { defineStore } from 'pinia';

interface Settings {
  azure: {
    key: string | null;
    region: string | null;
  };
  wwise: {
    url: string | null;
  };
}

export const useSettings = defineStore('settings', {
  state: (): Settings => {
    return {
      azure: {
        key: null,
        region: null,
      },
      wwise: {
        url: 'ws://127.0.0.1:8080/waapi',
      },
    };
  },
  actions: {
    async save() {
      const data = toRaw(this.$state);
      ipcRenderer.invoke('file:writeJson', 'settings', data);
    },
    async load() {
      ipcRenderer
        .invoke('file:readJson', 'settings')
        .then((res) => {
          this.$patch(res);
        })
        .catch(() => {
          this.save().catch();
        });
    },
  },
});
