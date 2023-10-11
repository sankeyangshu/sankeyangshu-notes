import { defineConfig } from 'vitepress';
import { nav } from './config/nav';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: '三棵杨树',
  description: '编程笔记、读书笔记、生活感悟、游戏评测',
  lastUpdated: false, // 最近更新时间
  head: [
    [
      'meta',
      {
        name: 'author',
        content: 'sankeyangshu',
      },
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: 'Home',
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Home of sankeyangshu',
      },
    ],
  ],

  themeConfig: {
    outline: [2, 3],
    // https://vitepress.dev/reference/default-theme-config
    nav,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sankeyangshu/sankeyangshu-notes',
      },
    ],

    search: {
      provider: 'local',
    },
  },
});
