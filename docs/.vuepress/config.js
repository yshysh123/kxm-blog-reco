module.exports = {
  title: "凯小默的博客",
  base: '/kxm_blog/',
  description: 'THE PHILOSOPHERS HAVE ONLY INTERPRETED THE WORLD IN VARIOUS WAYS;THE POINT HOWEVER IS TO CHANGE IT.',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    // 更多配置可以参考 https://github.com/vuejs/vuepress/blob/master/packages/docs/docs/.vuepress/config.js
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    nav: [
      { text: '主页', link: '/', icon: 'reco-home' },
      { text: '最新', link: '/timeLine/', icon: 'reco-date' },
      { text: '导航', link: '/guide/', icon: 'reco-other' },
      {
        text: '关于我',
        icon: 'reco-message',
        items: [
          { text: 'CSDN', link: 'https://blog.csdn.net/kaimo313', icon: 'reco-csdn' },
          { text: '掘金', link: 'https://juejin.im/user/5a7a741ff265da4e9f6f8cec/posts', icon: 'reco-juejin' },
          { text: 'GitHub', link: 'https://github.com/kaimo313', icon: 'reco-github' },
        ]
      }
    ],
    // 博客设置
    blogConfig: {
      category: {
        location: 4, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认 “分类”
      },
      tag: {
        location: 4, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    },
    logo: '/logo.jpg',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: 'auto',
    // 最后更新时间
    lastUpdated: '上次更新时间',
    date_format: 'yyyy-MM-dd HH:mm:ss',
    // 作者
    author: 'kaimo',
    // 备案号
    // record: 'xxx',
    // 项目开始时间
    startYear: '2019',
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    valineConfig: {
      appId: 'P01Nfz0QvaEXdVPoRY3gzeso-gzGzoHsz',// your appId
      appKey: 'GDGhJqwnRA5JIkXGQQmqUcaX', // your appKey
      placeholder: 'ヾﾉ≧∀≦)o来啊，我们一起嘤嘤嘤！！！'
    }
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ['@vuepress/pwa', {
      undatePopup: {
        message: '发现新内容可用',
        buttonText: '刷新'
      }
    }],
    '@vuepress/medium-zoom',
    'flowchart'
  ]
}  
