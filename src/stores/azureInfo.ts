import { defineStore } from 'pinia';
import { MenuOption, RadioButtonProps } from 'naive-ui';

interface Voice {
  locale: string;
  localName: string;
  shortName: string;
  styleList: string[];
}

interface AzureInfo {
  voices: Voice[];
  regions: MenuOption[];
  formats: MenuOption[];
  roles: MenuOption[];
  pitchConstants: RadioButtonProps[];
  rateConstants: RadioButtonProps[];
}

export const useAzureInfo = defineStore('azureInfo', {
  state: (): AzureInfo => {
    return {
      voices: [],
      regions: [
        {
          label: 'Japan East',
          value: 'japaneast',
        },
        {
          label: 'Japan West',
          value: 'japanwest',
        },
        {
          label: 'Korea Central',
          value: 'koreacentral',
        },
        {
          label: 'East Asia',
          value: 'eastasia',
        },
        {
          label: 'Southeast Asia',
          value: 'southeastasia',
        },
        {
          label: 'East US',
          value: 'eastus',
        },
      ],
      formats: [
        {
          label: 'RIFF-48KHz-16Bit-Mono-PCM',
          value: 'Riff48Khz16BitMonoPcm',
        },
        {
          label: 'RIFF-44.1KHz-16Bit-Mono-PCM',
          value: 'Riff44100Hz16BitMonoPcm',
        },
      ],
      roles: [
        {
          label: 'Girl',
          value: 'Girl',
        },
        {
          label: 'Boy',
          value: 'Boy',
        },
        {
          label: 'YoungAdultFemale',
          value: 'YoungAdultFemale',
        },
        {
          label: 'YoungAdultMale',
          value: 'YoungAdultMale',
        },
        {
          label: 'OlderAdultFemale',
          value: 'OlderAdultFemale',
        },
        {
          label: 'OlderAdultMale',
          value: 'OlderAdultMale',
        },
        {
          label: 'SeniorFemale',
          value: 'SeniorFemale',
        },
        {
          label: 'SeniorMale',
          value: 'SeniorMale',
        },
      ],
      pitchConstants: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Very Low',
          value: 'x-low',
        },
        {
          label: 'Low',
          value: 'low',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'High',
          value: 'high',
        },
        {
          label: 'Very High',
          value: 'x-high',
        },
      ],
      rateConstants: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Very Slow',
          value: 'x-slow',
        },
        {
          label: 'Slow',
          value: 'slow',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Fast',
          value: 'fast',
        },
        {
          label: 'Very Fast',
          value: 'x-fast',
        },
      ],
    };
  },
});
