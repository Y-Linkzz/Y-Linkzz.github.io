module.exports = {
    title: 'ylinkzz',
    description: 'Just playing around.',
    base: "/",
    head: [['link', { rel: 'icon', href: '/logo.svg' }]],// 添加网站图标
    themeConfig: {
        siteTitle: "Y-LINK",
        logo: '/logo.svg',
        nav: [
            { text: '首页', link: '/' },
            { text: '文章', link: '/articles/' },
        ],
        sidebar: {
            'articles': [{
                text: '前端',
                collapsible: true,    //是不是可以动态展开
                collapsed: true,      //默认是不是展开
                items: [
                    { text: '概况', link: '/articles/' },
                    { text: 'Vue', link: '/articles/vue' },
                ]
            }],
        },
        socialLinks: [{ icon: "github", link: "https://github.com/Y-Linkzz/Y-Linkzz.github.io" }],
    }
}