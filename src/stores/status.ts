import { defineStore } from 'pinia';

interface Status {
  azure: {
    isConnected: boolean;
  };
  wwise: {
    isConnected: boolean;
  };
}

export const useStatus = defineStore('status', {
  state: (): Status => {
    return {
      azure: {
        isConnected: false,
      },
      wwise: {
        isConnected: false,
      },
    };
  },
});
