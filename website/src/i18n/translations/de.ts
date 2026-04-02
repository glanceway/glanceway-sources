import type { TranslationKey } from "./en";

const de: Record<TranslationKey, string> = {
  // Hero
  "hero.title": "Alles auf einen Blick",
  "hero.description": "Eine schlanke macOS-Menüleisten-App, die Hacker News, GitHub, Reddit, RSS-Feeds, Aktienkurse, Krypto und mehr aggregiert — alles auf einen Blick.",
  "hero.tagline": "Keine Ablenkungen, keine Reizüberflutung.",
  "hero.download": "Get on Mac App Store",
  "hero.comingSoon": "Demnächst verfügbar",
  "hero.browseSources": "Quellen durchsuchen",

  // App Preview
  "appPreview.title": "Sieh es in Aktion",
  "appPreview.subtitle": "Alles, was dich interessiert — ein Blick in die Menüleiste genügt.",

  // Features section
  "features.title": "Deine Menüleiste, unendliche Möglichkeiten",
  "features.subtitle": "Mehr als ein Informationsaggregator — eine programmierbare Wahrnehmungsebene für deinen Mac.",
  "features.browseSources": "Quellen durchsuchen",
  "features.communitySources.title": "Quellen für alles",
  "features.communitySources.description": "Nachrichten, Finanzen, Entwickler-Tools und mehr — vorgefertigte Quellen zum Installieren aus dem Source Store.",
  "features.aiCreate.title": "Quellen mit KI erstellen",
  "features.aiCreate.description": "Füge den Glanceway-Skill zu deinem KI-Assistenten hinzu, beschreibe die gewünschten Daten und erhalte eine importfertige Quelle.",
  "features.aiCreate.link": "Skill herunterladen",
  "features.aiCreate.linkDocs": "Skill File",
  "features.aiCreate.linkCli": "CLI",
  "features.aiCreate.prompt1": "Erstelle eine Quelle, die Hacker News Top-Stories anzeigt",
  "features.aiCreate.prompt2": "Ich möchte Bitcoin-Preisupdates in meiner Menüleiste sehen",
  "features.aiCreate.prompt3": "Erstelle eine Quelle für die Statusseiten-API meines Unternehmens",
  "features.aiCreate.step1": "Glanceway-Skill zum KI-Assistenten hinzufügen",
  "features.aiCreate.codeCommand": "npx skills add glanceway/skills",
  "features.aiCreate.step2": "Beschreibe, welche Daten du möchtest",
  "features.aiCreate.step3": "Importiere die generierte .gwsrc-Datei in Glanceway",
  "features.aiReading.title": "KI-Lesen & Zusammenfassung",
  "features.aiReading.description": "Installiere den Glanceway-MCP-Server, damit dein KI-Assistent Quellen durchsuchen, Einträge lesen und Zusammenfassungen erstellen kann.",
  "features.aiReading.linkDesktop": "Claude Desktop",
  "features.aiReading.linkCode": "Claude Code",
  "features.aiReading.codeCommand": "claude mcp add glanceway -- npx -y glanceway-mcp",
  "features.aiReading.chatUser": "Summarize unread Hacker News items in Glanceway.",
  "features.aiReading.chatStatus": "Used Glanceway integration, used a tool",
  "features.aiReading.chatResponse": "Here's a summary of your unread Hacker News feed, grouped by theme:<br/><br/><b>Top Stories (by points)</b><br/>The biggest discussion today is a Mastodon post asking whether to walk or drive 50 meters to a car wash — a humorous AI overthinking scenario that racked up 968 points and 621 comments...",
  "features.rss.title": "RSS-Unterstützung",
  "features.rss.description": "Native RSS/Atom-Unterstützung. Füge eine Feed-URL ein oder nutze RSSHub / rss.app für tausende Feeds.",
  "features.rss.linkRsshub": "RSSHub entdecken",
  "features.rss.linkRssApp": "rss.app entdecken",

  // CTA
  "cta.title": "Bereit, immer auf dem Laufenden zu bleiben?",
  "cta.description": "Lade Glanceway herunter und verwandle deine Menüleiste in einen persönlichen Info-Hub.",

  // Sources section
  "sources.title": "Quellen",
  "sources.subtitle": "Von der Community erstellte Quellen. Ein Klick zur Installation.",
  "sources.pageTitle": "Quellen",
  "sources.pageSubtitle": "Durchsuche und installiere von der Community erstellte Quellen für Glanceway — Hacker News, GitHub Trending, Reddit, Product Hunt, Aktienkurse, Krypto-Preise, RSS und mehr.",
  "sources.rssNote": "Unterstützt auch den direkten Import von RSS-Feed-URLs. Entdecke tausende Routen auf",
  "sources.submitSource": "Quelle einreichen",
  "sources.buildSource": "Quelle erstellen",
  "sources.emptyTitle": "Noch keine Quellen in dieser Kategorie",
  "sources.emptySubtitle": "Sei der Erste, der eine erstellt!",

  // Categories
  "category.All": "Alle",
  "category.Developer": "Entwickler",
  "category.News": "Nachrichten",
  "category.Social": "Soziales",
  "category.Finance": "Finanzen",
  "category.Entertainment": "Unterhaltung",
  "category.Productivity": "Produktivität",
  "category.Other": "Sonstiges",

  // Source detail
  "detail.allSources": "Alle Quellen",
  "detail.install": "In Glanceway installieren",
  "detail.download": "Herunterladen",
  "detail.configuration": "Konfiguration",
  "detail.sourceCode": "Quellcode",
  "detail.by": "von",

  // Config table headers
  "config.name": "Name",
  "config.key": "Schlüssel",
  "config.type": "Typ",
  "config.required": "Erforderlich",
  "config.default": "Standard",
  "config.description": "Beschreibung",
  "config.yes": "Ja",
  "config.no": "Nein",

  // Nav
  "nav.sources": "Quellen",

  // Footer
  "footer.copyright": "© {year} Glanceway",

  // Language switcher
  "language.label": "Sprache",

  // SEO
  "seo.homeTitle": "Glanceway — macOS Menüleisten-Hub | RSS, News & eigene Feeds",
  "seo.sourcesTitle": "Glanceway Quellen — Datenfeeds für Ihre macOS Menüleiste",
  "seo.keywords": "macOS Menüleiste,RSS Reader,Nachrichten,Aktien,Krypto,GitHub,Entwickler,Dashboard,Aggregator,Ticker,Technologie",
};

export default de;
