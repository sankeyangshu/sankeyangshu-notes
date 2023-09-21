import { defineConfig } from 'vitepress';
import { nav } from './config/nav';
import { sidebar } from './config/sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: '三棵杨树',
  description: '编程笔记、读书笔记、生活感悟、游戏评测',
  srcDir: 'src',
  outDir: './dist',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sankeyangshu/sankeyangshu-notes',
      },
    ],

    footer: {
      copyright: 'Copyright © 2023 sankeyangshu',
    },

    search: {
      provider: 'local',
    },
  },
});
