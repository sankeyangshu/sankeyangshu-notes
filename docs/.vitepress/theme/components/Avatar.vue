<template>
  <VPTeamMembers size="small" :members="members" />
</template>

<script lang="ts" setup>
import { VPTeamMembers } from 'vitepress/theme';
import email from '/email.svg?raw';

const members = [
  {
    avatar: '/avatar.png',
    name: 'sankeyangshu',
    title: 'Blogger',
    links: [
      { icon: 'github', link: 'https://github.com/sankeyangshu' },
      {
        icon: { svg: email },
        link: 'mailto:1260323835@qq.com',
      },
    ],
  },
];
</script>
