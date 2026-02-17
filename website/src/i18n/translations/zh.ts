import type { TranslationKey } from "./en";

const zh: Record<TranslationKey, string> = {
  // Hero
  "hero.title": "一瞥",
  "hero.description":
    "一款轻量级 macOS 菜单栏应用，让你随时掌握重要动态——开发者资讯、社交动态、提醒通知等",
  "hero.tagline": "不打扰，不过载",
  "hero.download": "前往 Mac App Store",
  "hero.comingSoon": "即将发布",
  "hero.browseSources": "浏览信息源",

  // App Preview
  "appPreview.title": "看看实际效果",
  "appPreview.subtitle": "你关心的一切，菜单栏一瞥即达。",

  // Features section
  "features.title": "你的菜单栏，无限可能",
  "features.subtitle": "不只是信息聚合器——为你的 Mac 打造的可编程感知层。",
  "features.browseSources": "浏览信息源",
  "features.communitySources.title": "丰富的信息源",
  "features.communitySources.description": "新闻、财经、开发者工具等——预置信息源，从信息源商店一键安装。",
  "features.aiCreate.title": "用 AI 创建信息源",
  "features.aiCreate.description": "将 Glanceway 技能添加到你的 AI 编程助手，描述你需要的数据，即可获得可直接导入的信息源。",
  "features.aiCreate.link": "获取技能",
  "features.aiCreate.prompt1": "创建一个显示 Hacker News 热门文章的信息源",
  "features.aiCreate.prompt2": "我想在菜单栏看到比特币价格更新",
  "features.aiCreate.prompt3": "为我公司的状态页 API 构建一个信息源",
  "features.aiCreate.step1": "下载 Glanceway 技能",
  "features.aiCreate.step2": "添加到 Claude Code / Cursor / Windsurf",
  "features.aiCreate.step3": "描述你想要的内容——导入生成的 .gwsrc 文件",
  "features.aiReading.title": "AI 阅读与摘要",
  "features.aiReading.description": "安装 Glanceway MCP 服务器，让你的 AI 助手浏览信息源、阅读内容并生成摘要。",
  "features.aiReading.link": "安装 MCP 服务器",
  "features.aiReading.chatUser": "Summarize unread Hacker News items in Glanceway.",
  "features.aiReading.chatStatus": "Used Glanceway integration, used a tool",
  "features.aiReading.chatResponse": "Here's a summary of your unread Hacker News feed, grouped by theme:<br/><br/><b>Top Stories (by points)</b><br/>The biggest discussion today is a Mastodon post asking whether to walk or drive 50 meters to a car wash — a humorous AI overthinking scenario that racked up 968 points and 621 comments...",
  "features.rss.title": "支持 RSS",
  "features.rss.description": "原生 RSS/Atom 支持。粘贴任意订阅链接，或使用 RSSHub 获取数千种订阅源。",
  "features.rss.linkRsshub": "探索 RSSHub",

  // CTA
  "cta.title": "准备好保持同步了吗？",
  "cta.description": "下载 Glanceway，把你的菜单栏变成个人信息中枢。",

  // Sources section
  "sources.title": "信息源",
  "sources.subtitle": "社区构建的信息源，一键安装。",
  "sources.pageTitle": "信息源",
  "sources.pageSubtitle": "浏览并安装社区构建的 Glanceway 信息源。",
  "sources.rssNote": "也支持直接导入 RSS 订阅链接。在以下平台探索数千种路由",
  "sources.submitSource": "提交信息源",
  "sources.buildSource": "开发信息源",
  "sources.emptyTitle": "该分类暂无信息源",
  "sources.emptySubtitle": "成为第一个构建者吧！",

  // Categories
  "category.All": "全部",
  "category.Developer": "开发者",
  "category.News": "新闻",
  "category.Social": "社交",
  "category.Finance": "财经",
  "category.Entertainment": "娱乐",
  "category.Productivity": "效率",
  "category.Other": "其他",

  // Source detail
  "detail.allSources": "所有信息源",
  "detail.install": "安装到 Glanceway",
  "detail.download": "下载",
  "detail.configuration": "配置项",
  "detail.sourceCode": "源代码",
  "detail.by": "作者",

  // Config table headers
  "config.name": "名称",
  "config.key": "键",
  "config.type": "类型",
  "config.required": "必填",
  "config.default": "默认值",
  "config.description": "描述",
  "config.yes": "是",
  "config.no": "否",

  // Nav
  "nav.sources": "信息源",

  // Footer
  "footer.copyright": "© {year} Glanceway",

  // Language switcher
  "language.label": "语言",
};

export default zh;
