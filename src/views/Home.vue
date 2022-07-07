<script lang="ts" setup>
import { useWwiseSettings, useAzureSettings } from "../stores/settings";

const azureSettings = useAzureSettings();
const wwiseSettings = useWwiseSettings();
</script>

<template>
  <n-card title="README">
    <p>草稿阶段，没写文档</p>
    <p>bug很多，也不太好用</p>
    <p>使用前进入设置页输入 key 和 region 连接至 Azure</p>
    <p>并测试 Wwise 连通性</p>
  </n-card>
</template>
