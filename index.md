---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "MrZnnBlog"
  text: ""
  tagline: 逆流而上
  image:
    src: /background.png
    alt: 背景图
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---
<script setup lang="ts">
import confetti from "canvas-confetti";

/* 纸屑 */
confetti({
  particleCount: 100,
  spread: 170,
  origin: { y: 0.6 },
});
</script>
