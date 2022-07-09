<template>
{{ route.name }}
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute()
</script>