import { defineStore } from "pinia";

interface Status {
  azure: {
    connected: boolean
  };
  wwise: {
    connected: boolean;
  }
}

export const useStatus = defineStore("status", {
  state: (): Status => {
    return {
      azure: {
        connected: false,
      },
      wwise: {
        connected: false,
      }
    }
  }
})
