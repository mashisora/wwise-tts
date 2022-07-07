import { defineStore } from "pinia";

interface SpeechConfig {
  text: string | null;
  voice: string | null;
  format: string | null;
  fileName: string | null;
}

export const useSpeechConfig = defineStore("speechConfig", {
  state: (): SpeechConfig => {
    return {
      text: null,
      voice: null,
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
      regions: [
        {
          label: "Japan East",
          value: "japaneast",
        },
        {
          label: "Japan West",
          value: "japanwest",
        },
        {
          label: "Korea Central",
          value: "koreacentral",
        },
        {
          label: "East Asia",
          value: "eastasia",
        },
        {
          label: "Southeast Asia",
          value: "southeastasia",
        },
      ],
      formats: [
        {
          label: "RIFF-8KHz-16Bit-Mono-PCM",
          value: "Riff8Khz16BitMonoPcm",
        },
        {
          label: "RIFF-16KHz-16Bit-Mono-PCM",
          value: "Riff16Khz16BitMonoPcm",
        },
        {
          label: "RIFF-24KHz-16Bit-Mono-PCM",
          value: "Riff24Khz16BitMonoPcm",
        },
        {
          label: "RIFF-48KHz-16Bit-Mono-PCM",
          value: "Riff48Khz16BitMonoPcm",
        },
        {
          label: "RIFF-22.05KHz-16Bit-Mono-PCM",
          value: "Riff22050Hz16BitMonoPcm",
        },
        {
          label: "RIFF-44.1KHz-16Bit-Mono-PCM",
          value: "Riff44100Hz16BitMonoPcm",
        },
      ],
    };
  },
});
