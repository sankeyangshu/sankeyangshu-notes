<template>
  <Layout>
    <template #doc-top>
      <Progress />
    </template>
    <template #aside-outline-before>
      <Avatar />
    </template>
    <template #home-hero-before>
      <HomeHero />
    </template>
    <template #home-hero-after>
      <Page />
    </template>
  </Layout>
  <CopyWright />
</template>

<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme';
import Progress from './Progress.vue';
import Avatar from './Avatar.vue';
import HomeHero from './HomeHero.vue';
import Page from './Page.vue';
import CopyWright from './CopyWright.vue';

const { Layout } = DefaultTheme;
</script>
