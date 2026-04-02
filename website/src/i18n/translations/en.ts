const en = {
  // Hero
  "hero.title": "Everything at a glance",
  "hero.description": "A lightweight macOS menu bar app that aggregates Hacker News, GitHub, Reddit, RSS feeds, stock prices, crypto, and more — all in one glance.",
  "hero.tagline": "No distractions, no overload.",
  "hero.download": "Get on Mac App Store",
  "hero.comingSoon": "Coming Soon",
  "hero.browseSources": "Browse Sources",

  // App Preview
  "appPreview.title": "See it in action",
  "appPreview.subtitle": "Everything you care about, one glance away from your menu bar.",

  // Features section
  "features.title": "Your menu bar, infinite possibilities",
  "features.subtitle": "More than an information aggregator — a programmable awareness layer for your Mac.",
  "features.browseSources": "Browse Sources",
  "features.communitySources.title": "Sources for Everything",
  "features.communitySources.description": "News, finance, developer tools, and more — pre-built sources ready to install from the Source Store.",
  "features.aiCreate.title": "Create Sources with AI",
  "features.aiCreate.description": "Add the Glanceway skill to your AI agent, describe what data you want, and get a ready-to-import source.",
  "features.aiCreate.link": "Get the Skill",
  "features.aiCreate.linkDocs": "Skill File",
  "features.aiCreate.linkCli": "CLI",
  "features.aiCreate.prompt1": "Create a source that shows Hacker News top stories",
  "features.aiCreate.prompt2": "I want to see Bitcoin price updates in my menu bar",
  "features.aiCreate.prompt3": "Build a source for my company's status page API",
  "features.aiCreate.step1": "Add the Glanceway Skill to your AI agent",
  "features.aiCreate.codeCommand": "npx skills add glanceway/skills",
  "features.aiCreate.step2": "Describe what data you want",
  "features.aiCreate.step3": "Import the generated .gwsrc file into Glanceway",
  "features.aiReading.title": "AI Reading & Summarization",
  "features.aiReading.description": "Install the Glanceway MCP server to let your AI assistant browse sources, read items, and generate summaries.",
  "features.aiReading.linkDesktop": "Claude Desktop",
  "features.aiReading.linkCode": "Claude Code",
  "features.aiReading.codeCommand": "claude mcp add glanceway -- npx -y glanceway-mcp",
  "features.aiReading.chatUser": "Summarize unread Hacker News items in Glanceway.",
  "features.aiReading.chatStatus": "Used Glanceway integration, used a tool",
  "features.aiReading.chatResponse": "Here's a summary of your unread Hacker News feed, grouped by theme:<br/><br/><b>Top Stories (by points)</b><br/>The biggest discussion today is a Mastodon post asking whether to walk or drive 50 meters to a car wash — a humorous AI overthinking scenario that racked up 968 points and 621 comments...",
  "features.rss.title": "RSS Support",
  "features.rss.description": "Native RSS/Atom support. Paste any feed URL or use RSSHub / rss.app to access thousands of feeds.",
  "features.rss.linkRsshub": "Explore RSSHub",
  "features.rss.linkRssApp": "Explore rss.app",

  // CTA
  "cta.title": "Ready to stay in the loop?",
  "cta.description": "Download Glanceway and turn your menu bar into a personal information hub.",

  // Sources section
  "sources.title": "Sources",
  "sources.subtitle": "Community-built sources. One click to install.",
  "sources.pageTitle": "Sources",
  "sources.pageSubtitle": "Browse and install community-built sources for Glanceway — Hacker News, GitHub Trending, Reddit, Product Hunt, stock quotes, crypto prices, RSS, and more.",
  "sources.rssNote": "Also supports importing RSS feed URLs directly. Explore thousands of routes on",
  "sources.submitSource": "Submit a Source",
  "sources.buildSource": "Build a Source",
  "sources.emptyTitle": "No sources in this category yet",
  "sources.emptySubtitle": "Be the first to build one!",

  // Categories
  "category.All": "All",
  "category.Developer": "Developer",
  "category.News": "News",
  "category.Social": "Social",
  "category.Finance": "Finance",
  "category.Entertainment": "Entertainment",
  "category.Productivity": "Productivity",
  "category.Other": "Other",

  // Source detail
  "detail.allSources": "All sources",
  "detail.install": "Install in Glanceway",
  "detail.download": "Download",
  "detail.configuration": "Configuration",
  "detail.sourceCode": "Source Code",
  "detail.by": "by",

  // Config table headers
  "config.name": "Name",
  "config.key": "Key",
  "config.type": "Type",
  "config.required": "Required",
  "config.default": "Default",
  "config.description": "Description",
  "config.yes": "Yes",
  "config.no": "No",

  // Nav
  "nav.sources": "Sources",

  // Footer
  "footer.copyright": "© {year} Glanceway",

  // Language switcher
  "language.label": "Language",

  // SEO
  "seo.homeTitle": "Glanceway — macOS Menu Bar Info Hub | RSS, News & Custom Feeds",
  "seo.sourcesTitle": "Glanceway Sources — macOS Menu Bar Plugins & Data Feeds",
  "seo.keywords": "macOS menu bar,RSS reader,news aggregator,Hacker News,GitHub,Reddit,stock ticker,crypto,developer tools,dashboard,notification,custom feeds,information hub",
} as const;

export type TranslationKey = keyof typeof en;
export default en;
