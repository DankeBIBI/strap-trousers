import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'Strap-Trousers',
    description: '轻松封装接口的JavaScript库',
    
    locales: {
      root: {
        label: '简体中文',
        lang: 'zh-CN'
      },
      en: {
        label: 'English',
        lang: 'en-US',
        link: '/en/',
        themeConfig: require('./config-en').default.themeConfig
      }
    },
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/' },
            { text: 'API', link: '/api/' },
            { text: '更新日志', link: '/changelog/' }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '开始',
                    items: [
                        { text: '介绍', link: '/guide/' },
                        { text: '安装', link: '/guide/installation' },
                        { text: '快速开始', link: '/guide/getting-started' }
                    ]
                },
                {
                    text: '核心功能',
                    items: [
                        { text: 'StrawApi', link: '/guide/straw-api' },
                        { text: 'StrawPlus', link: '/guide/straw-plus' },
                        { text: 'EaseApi (已废弃)', link: '/guide/ease-api' }
                    ]
                },
                {
                    text: '工具函数',
                    items: [
                        { text: '数据处理', link: '/guide/utils/data' },
                        { text: '数组操作', link: '/guide/utils/array' },
                        { text: '对象操作', link: '/guide/utils/object' },
                        { text: '时间处理', link: '/guide/utils/time' },
                        { text: '字符串处理', link: '/guide/utils/format' }
                    ]
                }
            ],
            '/api/': [
                {
                    text: 'API参考',
                    items: [
                        { text: '配置选项', link: '/api/config' },
                        { text: '请求方法', link: '/api/methods' },
                        { text: '工具函数', link: '/api/utils' }
                    ]
                }
            ]
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/DankeBIBI/strap-trousers' }
        ],
        footer: {
            message: 'MIT Licensed',
            copyright: 'Copyright © 2023 DANKEBIBI'
        }
    },
    markdown: {
        theme: {
            light: 'github-light',
            dark: 'github-dark'
        }
    }
})