import type { TranslationKey } from "./en";

const zhTw: Record<TranslationKey, string> = {
  // Hero
  "hero.title": "一瞥",
  "hero.description":
    "一款輕量級 macOS 選單列應用程式，讓你隨時掌握重要動態——開發者資訊、社群動態、提醒通知等",
  "hero.tagline": "不干擾，不過載",
  "hero.download": "Get on Mac App Store",
  "hero.comingSoon": "即將發布",
  "hero.browseSources": "瀏覽資料來源",

  // App Preview
  "appPreview.title": "看看實際效果",
  "appPreview.subtitle": "你關心的一切，選單列一瞥即達。",

  // Features section
  "features.title": "你的選單列，無限可能",
  "features.subtitle": "不只是資訊聚合器——為你的 Mac 打造的可程式化感知層。",
  "features.browseSources": "瀏覽資料來源",
  "features.communitySources.title": "豐富的資料來源",
  "features.communitySources.description": "新聞、財經、開發者工具等——預置資料來源，從來源商店一鍵安裝。",
  "features.aiCreate.title": "用 AI 建立資料來源",
  "features.aiCreate.description": "將 Glanceway 技能加入你的 AI 程式設計助手，描述你需要的資料，即可取得可直接匯入的資料來源。",
  "features.aiCreate.link": "取得技能",
  "features.aiCreate.prompt1": "建立一個顯示 Hacker News 熱門文章的資料來源",
  "features.aiCreate.prompt2": "我想在選單列看到比特幣價格更新",
  "features.aiCreate.prompt3": "為我公司的狀態頁 API 建立一個資料來源",
  "features.aiCreate.step1": "下載 Glanceway 技能",
  "features.aiCreate.step2": "加入 Claude Code / Cursor / Windsurf",
  "features.aiCreate.step3": "描述你想要的內容——匯入產生的 .gwsrc 檔案",
  "features.aiReading.title": "AI 閱讀與摘要",
  "features.aiReading.description": "安裝 Glanceway MCP 伺服器，讓你的 AI 助手瀏覽資料來源、閱讀內容並產生摘要。",
  "features.aiReading.link": "安裝 MCP 伺服器",
  "features.aiReading.chatUser": "Summarize the unread Hacker News in Glanceway.",
  "features.aiReading.chatStatus": "Used Glanceway integration, used a tool",
  "features.aiReading.chatResponse": "Here's a summary of your unread Hacker News feed, grouped by theme:<br/><br/><b>Top Stories (by points)</b><br/>The biggest discussion today is a Mastodon post asking whether to walk or drive 50 meters to a car wash — a humorous AI overthinking scenario that racked up 968 points and 621 comments...",
  "features.rss.title": "支援 RSS",
  "features.rss.description": "原生 RSS/Atom 支援。貼上任意訂閱連結，或使用 RSSHub 取得數千種訂閱源。",
  "features.rss.linkRsshub": "探索 RSSHub",

  // CTA
  "cta.title": "準備好保持同步了嗎？",
  "cta.description": "下載 Glanceway，把你的選單列變成個人資訊中樞。",

  // Sources section
  "sources.title": "資料來源",
  "sources.subtitle": "社群建置的資料來源，一鍵安裝。",
  "sources.pageTitle": "資料來源",
  "sources.pageSubtitle": "瀏覽並安裝社群建置的 Glanceway 資料來源。",
  "sources.rssNote": "也支援直接匯入 RSS 訂閱連結。在以下平台探索數千種路由",
  "sources.submitSource": "提交資料來源",
  "sources.buildSource": "開發資料來源",
  "sources.emptyTitle": "此分類尚無資料來源",
  "sources.emptySubtitle": "成為第一個建置者吧！",

  // Categories
  "category.All": "全部",
  "category.Developer": "開發者",
  "category.News": "新聞",
  "category.Social": "社群",
  "category.Finance": "財經",
  "category.Entertainment": "娛樂",
  "category.Productivity": "生產力",
  "category.Other": "其他",

  // Source detail
  "detail.allSources": "所有資料來源",
  "detail.install": "安裝到 Glanceway",
  "detail.download": "下載",
  "detail.configuration": "設定項目",
  "detail.sourceCode": "原始碼",
  "detail.by": "作者",

  // Config table headers
  "config.name": "名稱",
  "config.key": "鍵",
  "config.type": "類型",
  "config.required": "必填",
  "config.default": "預設值",
  "config.description": "描述",
  "config.yes": "是",
  "config.no": "否",

  // Nav
  "nav.sources": "資料來源",

  // Footer
  "footer.copyright": "© {year} Glanceway",

  // Language switcher
  "language.label": "語言",
};

export default zhTw;
