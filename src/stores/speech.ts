import { defineStore } from "pinia";

export const useSpeech = defineStore("speechData", {
  state: () => {
    return {
      text: null,
      voice: null,
      speed: 1,
      pitch: 1,
      format: null,
      fileName: null,
    };
  },
});

interface voice {
  Name: string;
  DisplayName: string;
  LocalName: string;
  ShortName: string;
  Gender: string;
  Locale: string;
  StyleList: string[];
  SampleRateHertz: string;
  VoiceType: string;
  Status: string;
}

export const useAzureInfo = defineStore("azureInfo", {
  state: () => {
    return {
      voices: [] as voice[],
      languages: [] as string[],
      formats: ["Riff16Khz16BitMonoPcm"],
    };
  },
});
