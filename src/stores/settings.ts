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
  }
});
