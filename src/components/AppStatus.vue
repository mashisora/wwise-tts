<template>
Path: {{ route.path }}
Azure: {{ status.azure.isConnected ? "Connected" : "Disconnected" }}
Wwise: {{ status.wwise.isConnected ? "Connected" : "Disconnected" }}
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

import { useStatus } from "../stores/status";

const route = useRoute();
const status = useStatus();
</script>