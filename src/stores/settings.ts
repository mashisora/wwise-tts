import { ipcRenderer } from "electron";
import { defineStore } from "pinia";

interface Settings {
  azure: {
    key: string | null;
    region: string | null;
  },
  wwise: {
    url: string | null;
  }
}

export const useSettings = defineStore("settings", {
  state: (): Settings => {
    return {
      azure: {
        key: null,
        region: null,
      },
      wwise: {
        url: "ws://127.0.0.1:8080/waapi",
      }
    };
  },
  actions: {
    save() {
      const fileName = "settings";
      const data = JSON.stringify(this.$state);
      const args = [fileName, data];
      ipcRenderer
        .invoke("file:writeJson", args)
        .then((res) => {
        })
        .catch((err) => {
        })
    },
    load() {
      const fileName = "settings";
      const args = [fileName];
      ipcRenderer
        .invoke("file:readJson", args)
        .then((res) => {
          this.$state = JSON.parse(res);
        })
        .catch((err) => {
          //this.save();
        })
    }
  }
});
