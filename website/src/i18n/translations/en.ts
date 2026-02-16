const en = {
  // Hero
  "hero.title": "Everything at a glance",
  "hero.description": "A lightweight macOS menu bar app that keeps you updated with what matters — developer news, social feeds, alerts, and more.",
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
  "features.stayInformed.title": "Stay Informed",
  "features.stayInformed.description": "Hacker News, Reddit, Product Hunt — trending content delivered to your menu bar.",
  "features.monitorMarkets.title": "Monitor Markets",
  "features.monitorMarkets.description": "Stock quotes, crypto prices, and financial news available when you need them.",
  "features.devToolkit.title": "Developer Toolkit",
  "features.devToolkit.description": "GitHub notifications, trending repos, npm packages, and StackOverflow in one place.",
  "features.trackEverything.title": "Track Everything",
  "features.trackEverything.description": "Earthquake alerts, spaceflight news, TV schedules — follow what you care about.",
  "features.buildYourOwn.title": "Build Your Own",
  "features.buildYourOwn.description": "Write a few lines of YAML or JavaScript to create your own source.",
  "features.buildYourOwn.link": "Read the docs",
  "features.rssAndBeyond.title": "RSS & Beyond",
  "features.rssAndBeyond.description": "Native RSS/Atom support. Use with RSSHub to access thousands of feeds.",
  "features.rssAndBeyond.link": "Explore RSSHub",
  "features.browseSources": "Browse Sources",

  // AI Integration
  "ai.createSource.title": "Create Sources with AI",
  "ai.createSource.description": "Add the Glanceway skill to your AI assistant and describe what data you want — it generates a ready-to-import source file.",
  "ai.createSource.link": "Get the Skill",
  "ai.mcp.title": "Read & Summarize",
  "ai.mcp.description": "Install the Glanceway MCP extension to let your AI assistant browse sources, read items, and generate summaries.",
  "ai.mcp.link": "Install Extension",

  // CTA
  "cta.title": "Ready to stay in the loop?",
  "cta.description": "Download Glanceway and turn your menu bar into a personal information hub.",

  // Sources section
  "sources.title": "Sources",
  "sources.subtitle": "Community-built sources. One click to install.",
  "sources.pageTitle": "Sources",
  "sources.pageSubtitle": "Browse and install community-built sources for Glanceway.",
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
} as const;

export type TranslationKey = keyof typeof en;
export default en;
