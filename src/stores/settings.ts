import { defineStore } from "pinia";

export const useAzureSettings = defineStore("azureSettings", {
  state: () => {
    return {
      key: null,
      region: null,
    };
  },
});

export const useWwiseSettings = defineStore("wwiseSettings", {
  state: () => {
    return {
      url: "ws://127.0.0.1:8080/waapi",
    };
  },
});
