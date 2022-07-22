<template>
  <NCard>
    <NTabs type="line" animated>
      <NTabPane name="text" tab="Text">
        <TextSpeech />
      </NTabPane>
      <NTabPane name="ssml" tab="SSML">
        <SsmlSpeech />
      </NTabPane>
    </NTabs>
  </NCard>
</template>

<script lang="ts" setup>
import { NCard, NTabs, NTabPane } from 'naive-ui';

import TextSpeech from '../components/speech/TextSpeech.vue';
import SsmlSpeech from '../components/speech/SsmlSpeech.vue';
</script>
