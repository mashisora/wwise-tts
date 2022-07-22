<template>
  <span>Azure: {{ status.azure.isConnected ? 'Connected' : 'Disconnected' }}</span>
  <span> | </span>
  <span>Wwise: {{ status.wwise.isConnected ? 'Connected' : 'Disconnected' }}</span>
</template>

<script lang="ts" setup>
import { useStatus } from '../stores/status';

const status = useStatus();
</script>
