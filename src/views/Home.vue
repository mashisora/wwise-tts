<template>
  <NCard title="README">
    <code>- step 1</code>
    <p>进入 Settings 页面输入 Microsoft Cognitive Services 的 Key 和 Region 并连接</p>
    <code>- step 2</code>
    <p>确认 WWAPI URL 是否正确，如未修改过可直接点击连接</p>
    <code>- step 3</code>
    <p>进入 Speech 页面开始使用</p>
    <code>- Tips</code>
    <p>点击 Import 时，将语音导入到 Wwise 当前选中目标下</p>
    <p>星号标记项目为必填项</p>
    <p>Settings 页面最下方可以保存设置，目前为明文保存，注意信息安全</p>
  </NCard>
</template>

<script lang="ts" setup>
import { NCard } from 'naive-ui';
</script>
