import { defineStore } from "pinia";

interface AzureSettings {
  key: string | null;
  region: string | null;
}

interface WwiseSettings {
  url: string | null;
}

export const useAzureSettings = defineStore("azureSettings", {
  state: (): AzureSettings => {
    return {
      key: null,
      region: null,
    };
  },
});

export const useWwiseSettings = defineStore("wwiseSettings", {
  state: (): WwiseSettings => {
    return {
      url: "ws://127.0.0.1:8080/waapi",
    };
  },
});
