---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
sidebar: false

hero:
  name: '三棵杨树'
  text: 'Welcome to my Programming World'
  tagline: 编程笔记、读书笔记、生活感悟、游戏评测
  actions:
    - theme: brand
      text: Get Started
      link: /web/vue/
    - theme: alt
      text: View on GitHub
      link: https://github.com/sankeyangshu

features:
  - icon: ⚡
    title: VitePress
    details: 该笔记基于 VitePress 默认主题编写
  - icon: 🔌
    title: 不定期
    details: 更新一些自己的开源APP和编程笔记
  - icon: 🎮
    title: 可能
    details: 还会更新一些游戏评测或者开发的小游戏
  - icon: 🦾
    title: Live
    details: 从来没有真正的绝境，只有心灵的迷途！
  - icon: 🛠
    title: Gadget
    details: 如果有遇到好用的工具也会记录分享一下的
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(
    315deg,
    #42d392 25%,
    #647eff
  );
  --vp-home-hero-image-background-image: linear-gradient(
    -45deg,
    #41b88380 30%,
    #35495e80
  );
  --vp-home-hero-image-filter: blur(30px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>
