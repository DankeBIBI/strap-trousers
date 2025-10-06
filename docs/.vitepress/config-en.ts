import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Strap-Trousers',
  description: 'A JavaScript library focused on simplifying API request encapsulation',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Guide', link: '/en/guide/' },
      { text: 'API Reference', link: '/en/api/' }
    ],

    sidebar: {
      '/en/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/guide/' },
            { text: 'Installation', link: '/en/guide/installation' },
            { text: 'Quick Start', link: '/en/guide/getting-started' }
          ]
        },
        {
          text: 'Core Features',
          items: [
            { text: 'StrawApi', link: '/en/guide/straw-api' },
            { text: 'StrawPlus', link: '/en/guide/straw-plus' },
            { text: 'EaseApi (Deprecated)', link: '/en/guide/ease-api' }
          ]
        },
        {
          text: 'Utility Functions',
          items: [
            { text: 'Overview', link: '/en/guide/utils/' },
            { text: 'Data Processing', link: '/en/guide/utils/data' },
            { text: 'String Processing', link: '/en/guide/utils/format' },
            { text: 'Array Operations', link: '/en/guide/utils/array' },
            { text: 'Object Operations', link: '/en/guide/utils/object' },
            { text: 'Time Processing', link: '/en/guide/utils/time' },
            { text: 'ID Generation', link: '/en/guide/utils/id' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/strap-trousers' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Strap-Trousers'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})