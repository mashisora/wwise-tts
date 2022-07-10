import { defineStore } from "pinia";

export const useAzureInfo = defineStore("azureInfo", {
  state: () => {
    return {
      voices: [],
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
