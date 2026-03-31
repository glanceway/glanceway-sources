import type { TranslationKey } from "./en";

const fr: Record<TranslationKey, string> = {
  // Hero
  "hero.title": "Tout en un coup d'\u0153il",
  "hero.description": "Une application légère dans la barre de menus de macOS qui agrège Hacker News, GitHub, Reddit, flux RSS, cours de bourse, crypto et plus — tout en un coup d'œil.",
  "hero.tagline": "Sans distractions, sans surcharge.",
  "hero.download": "Get on Mac App Store",
  "hero.comingSoon": "Bientôt disponible",
  "hero.browseSources": "Parcourir les sources",

  // App Preview
  "appPreview.title": "Voyez-le en action",
  "appPreview.subtitle": "Tout ce qui vous intéresse, à portée de clic dans votre barre de menus.",

  // Features section
  "features.title": "Votre barre de menus, des possibilités infinies",
  "features.subtitle": "Plus qu'un agrégateur d'informations — une couche de perception programmable pour votre Mac.",
  "features.browseSources": "Parcourir les sources",
  "features.communitySources.title": "Des sources pour tout",
  "features.communitySources.description": "Actualités, finance, outils de développement et plus — des sources prêtes à installer depuis le Source Store.",
  "features.aiCreate.title": "Créer des sources avec l'IA",
  "features.aiCreate.description": "Ajoutez le skill Glanceway à votre assistant IA, décrivez les données souhaitées et obtenez une source prête à importer.",
  "features.aiCreate.link": "Obtenir le Skill",
  "features.aiCreate.linkDocs": "Skill File",
  "features.aiCreate.linkCli": "CLI",
  "features.aiCreate.prompt1": "Crée une source qui affiche les articles populaires de Hacker News",
  "features.aiCreate.prompt2": "Je veux voir les mises à jour du prix du Bitcoin dans ma barre de menus",
  "features.aiCreate.prompt3": "Construis une source pour l'API de la page de statut de mon entreprise",
  "features.aiCreate.step1": "Ajouter le Skill Glanceway à votre assistant IA",
  "features.aiCreate.codeCommand": "npx skills add glanceway/skills",
  "features.aiCreate.step2": "Décrivez les données souhaitées",
  "features.aiCreate.step3": "Importez le fichier .gwsrc généré dans Glanceway",
  "features.aiReading.title": "Lecture et résumé par IA",
  "features.aiReading.description": "Installez le serveur MCP Glanceway pour permettre à votre assistant IA de parcourir les sources, lire les éléments et générer des résumés.",
  "features.aiReading.linkDesktop": "Claude Desktop",
  "features.aiReading.linkCode": "Claude Code",
  "features.aiReading.codeCommand": "claude mcp add glanceway -- npx -y glanceway-mcp",
  "features.aiReading.chatUser": "Summarize unread Hacker News items in Glanceway.",
  "features.aiReading.chatStatus": "Used Glanceway integration, used a tool",
  "features.aiReading.chatResponse": "Here's a summary of your unread Hacker News feed, grouped by theme:<br/><br/><b>Top Stories (by points)</b><br/>The biggest discussion today is a Mastodon post asking whether to walk or drive 50 meters to a car wash — a humorous AI overthinking scenario that racked up 968 points and 621 comments...",
  "features.rss.title": "Support RSS",
  "features.rss.description": "Support natif RSS/Atom. Collez une URL de flux ou utilisez RSSHub pour accéder à des milliers de flux.",
  "features.rss.linkRsshub": "Explorer RSSHub",

  // CTA
  "cta.title": "Prêt à rester informé ?",
  "cta.description": "Téléchargez Glanceway et transformez votre barre de menus en hub d'information personnel.",

  // Sources section
  "sources.title": "Sources",
  "sources.subtitle": "Des sources créées par la communauté. Un clic pour installer.",
  "sources.pageTitle": "Sources",
  "sources.pageSubtitle": "Parcourez et installez des sources créées par la communauté pour Glanceway — Hacker News, GitHub Trending, Reddit, Product Hunt, cours de bourse, prix crypto, RSS et plus.",
  "sources.rssNote": "Prend également en charge l'import direct d'URLs de flux RSS. Explorez des milliers de routes sur",
  "sources.submitSource": "Proposer une source",
  "sources.buildSource": "Créer une source",
  "sources.emptyTitle": "Aucune source dans cette catégorie pour le moment",
  "sources.emptySubtitle": "Soyez le premier à en créer une !",

  // Categories
  "category.All": "Toutes",
  "category.Developer": "Développement",
  "category.News": "Actualités",
  "category.Social": "Social",
  "category.Finance": "Finance",
  "category.Entertainment": "Divertissement",
  "category.Productivity": "Productivité",
  "category.Other": "Autres",

  // Source detail
  "detail.allSources": "Toutes les sources",
  "detail.install": "Installer dans Glanceway",
  "detail.download": "Télécharger",
  "detail.configuration": "Configuration",
  "detail.sourceCode": "Code source",
  "detail.by": "par",

  // Config table headers
  "config.name": "Nom",
  "config.key": "Clé",
  "config.type": "Type",
  "config.required": "Requis",
  "config.default": "Défaut",
  "config.description": "Description",
  "config.yes": "Oui",
  "config.no": "Non",

  // Nav
  "nav.sources": "Sources",

  // Footer
  "footer.copyright": "© {year} Glanceway",

  // Language switcher
  "language.label": "Langue",

  // SEO
  "seo.homeTitle": "Glanceway — Hub Barre de Menus macOS | RSS, Actus & flux personnalisé",
  "seo.keywords": "macOS barre de menus,lecteur RSS,actualités,bourse,crypto,GitHub,développeur,agrégateur,flux personnalisé,technologie",
};

export default fr;
