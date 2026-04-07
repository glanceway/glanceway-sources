import type { TranslationKey } from "./en";

const ar: Record<TranslationKey, string> = {
  // Hero
  "hero.title": "كل شيء بنظرة واحدة",
  "hero.description": "تطبيق خفيف لشريط القوائم في macOS يجمع Hacker News وGitHub وReddit وتغذيات RSS وأسعار الأسهم والعملات الرقمية وأدوات المطورين والمزيد. أنشئ مصادر مخصصة باستخدام الذكاء الاصطناعي أو البرمجة.",
  "hero.tagline": "بلا تشتيت، بلا إرهاق.",
  "hero.download": "Get on Mac App Store",
  "hero.comingSoon": "قريبًا",
  "hero.browseSources": "تصفّح المصادر",

  // App Preview
  "appPreview.title": "شاهده قيد التشغيل",
  "appPreview.subtitle": "كل ما يهمك، بنظرة واحدة من شريط القوائم.",

  // Features section
  "features.title": "شريط القوائم الخاص بك، إمكانيات لا حدود لها",
  "features.subtitle": "أكثر من مُجمّع معلومات — طبقة وعي قابلة للبرمجة لجهاز Mac الخاص بك.",
  "features.browseSources": "تصفّح المصادر",
  "features.communitySources.title": "مصادر لكل شيء",
  "features.communitySources.description": "أخبار، مالية، أدوات المطورين والمزيد — مصادر جاهزة للتثبيت من متجر المصادر.",
  "features.aiCreate.title": "أنشئ مصادر بالذكاء الاصطناعي",
  "features.aiCreate.description": "أضف مهارة Glanceway إلى مساعد الذكاء الاصطناعي، صف البيانات التي تريدها واحصل على مصدر جاهز للاستيراد.",
  "features.aiCreate.link": "احصل على المهارة",
  "features.aiCreate.linkDocs": "Skill File",
  "features.aiCreate.linkCli": "CLI",
  "features.aiCreate.prompt1": "أنشئ مصدرًا يعرض أبرز مقالات Hacker News",
  "features.aiCreate.prompt2": "أريد رؤية تحديثات سعر البيتكوين في شريط القوائم",
  "features.aiCreate.prompt3": "ابنِ مصدرًا لواجهة API صفحة حالة شركتي",
  "features.aiCreate.step1": "أضف مهارة Glanceway إلى مساعد الذكاء الاصطناعي",
  "features.aiCreate.codeCommand": "npx skills add glanceway/skills",
  "features.aiCreate.step2": "صف البيانات التي تريدها",
  "features.aiCreate.step3": "استورد ملف .gwsrc المُنشأ إلى Glanceway",
  "features.aiReading.title": "القراءة والتلخيص بالذكاء الاصطناعي",
  "features.aiReading.description": "ثبّت خادم Glanceway MCP ليتمكن مساعد الذكاء الاصطناعي من تصفّح المصادر وقراءة العناصر وإنشاء الملخصات.",
  "features.aiReading.linkDesktop": "Claude Desktop",
  "features.aiReading.linkCode": "Claude Code",
  "features.aiReading.codeCommand": "claude mcp add glanceway -- npx -y glanceway-mcp",
  "features.aiReading.chatUser": "Summarize unread Hacker News items in Glanceway.",
  "features.aiReading.chatStatus": "Used Glanceway integration, used a tool",
  "features.aiReading.chatResponse": "Here's a summary of your unread Hacker News feed, grouped by theme:<br/><br/><b>Top Stories (by points)</b><br/>The biggest discussion today is a Mastodon post asking whether to walk or drive 50 meters to a car wash — a humorous AI overthinking scenario that racked up 968 points and 621 comments...",
  "features.rss.title": "دعم RSS",
  "features.rss.description": "دعم أصلي لـ RSS/Atom. الصق أي رابط تغذية أو استخدم RSSHub / rss.app للوصول إلى آلاف التغذيات.",
  "features.rss.linkRsshub": "استكشاف RSSHub",
  "features.rss.linkRssApp": "استكشاف rss.app",

  // CTA
  "cta.title": "مستعد لتبقى على اطّلاع؟",
  "cta.description": "حمّل Glanceway وحوّل شريط القوائم إلى مركز معلومات شخصي.",

  // Sources section
  "sources.title": "المصادر",
  "sources.subtitle": "مصادر بناها المجتمع. تثبيت بنقرة واحدة.",
  "sources.pageTitle": "المصادر",
  "sources.pageSubtitle": "تصفّح وثبّت مصادر بناها المجتمع لـ Glanceway — Hacker News وGitHub Trending وReddit وProduct Hunt وأسعار الأسهم والعملات الرقمية وRSS والمزيد.",
  "sources.rssNote": "يدعم أيضًا استيراد روابط RSS مباشرةً. استكشف آلاف المسارات على",
  "sources.submitSource": "أضف مصدرًا",
  "sources.buildSource": "إنشاء مصدر",
  "sources.emptyTitle": "لا توجد مصادر في هذا التصنيف بعد",
  "sources.emptySubtitle": "كن أول من يبني واحدًا!",

  // Categories
  "category.All": "الكل",
  "category.Developer": "المطورون",
  "category.News": "الأخبار",
  "category.Social": "اجتماعي",
  "category.Finance": "المالية",
  "category.Entertainment": "الترفيه",
  "category.Productivity": "الإنتاجية",
  "category.Other": "أخرى",

  // Source detail
  "detail.allSources": "جميع المصادر",
  "detail.install": "تثبيت في Glanceway",
  "detail.download": "تحميل",
  "detail.configuration": "الإعدادات",
  "detail.sourceCode": "الشيفرة المصدرية",
  "detail.by": "بواسطة",

  // Config table headers
  "config.name": "الاسم",
  "config.key": "المفتاح",
  "config.type": "النوع",
  "config.required": "مطلوب",
  "config.default": "القيمة الافتراضية",
  "config.description": "الوصف",
  "config.yes": "نعم",
  "config.no": "لا",

  // Nav
  "nav.sources": "المصادر",

  // Footer
  "footer.copyright": "© {year} Glanceway",

  // Language switcher
  "language.label": "اللغة",

  // SEO
  "seo.homeTitle": "مركز المعلومات في شريط القوائم macOS — RSS والأخبار والمصادر المخصصة | Glanceway",
  "seo.sourcesTitle": "مصادر شريط القوائم macOS — Hacker News وGitHub وRSS والمزيد | Glanceway",
  "seo.keywords": "macOS شريط القوائم,قارئ RSS,أخبار,أسهم,عملات رقمية,GitHub,مطور,لوحة معلومات,مجمع,تقنية",

  // Related sources
  "related.title": "مصادر ذات صلة",

};

export default ar;
