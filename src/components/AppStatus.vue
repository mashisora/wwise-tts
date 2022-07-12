<template>
  <!-- Path: {{ route.path }} -->
  <span>Azure: {{ status.azure.isConnected ? 'Connected' : 'Disconnected' }}</span>
  <span>Wwise: {{ status.wwise.isConnected ? 'Connected' : 'Disconnected' }}</span>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

import { useStatus } from '../stores/status';

// const route = useRoute();
const status = useStatus();
</script>
