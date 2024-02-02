import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto-gen-sidebar.mjs";	// 改成自己的路径

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docs-demo/',
  head:[["link", {rel: "icon", href: "/logo.png"}]],
  title: "MrZnnBlog",
  description: "逆流而上",
  themeConfig: {
    outlineTitle: "文章目录",
    outline: [2, 6],
    logo: "/logo.png",
    nav: [
      { text: '家', link: '/' },
      { 
        text: '前端',
        items: [
          {text: 'react', link: '/front-end/react/'}
        ]
      },
      { 
        text: '语言',
        items: [
          {text: 'go', link: '/langages/go/'}
        ]
      },
      {text: '后端', link: '/back-end/postgres/'},
      { 
        text: '杂记',
        items: [
          {text: 'markdown', link: '/other/markdown/'}
        ]
      }
    ],

    sidebar: { 
      "/front-end/react": set_sidebar("/front-end/react/"),
      "/langages/go": set_sidebar("/langages/go/"),  
      "/back-end/postgres": set_sidebar("/back-end/postgres/"),
      "/other/markdown": set_sidebar("/other/markdown/"),
    },

    // sidebar: false, // 关闭侧边栏
    // aside: "left", // 设置右侧侧边栏在左侧显示

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MrZnn' }
    ],

    footer: {
      copyright: "Copyright@ 2023-present My Name"
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档"
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除条件查询",
            footer: {
              selectText: "选择",
              navigateText: "切换"
            },
          },
        },
      },
    },

  }
})


