import type { TranslationKey } from "./en";

const hi: Record<TranslationKey, string> = {
  // Hero
  "hero.title": "सब कुछ एक नज़र में",
  "hero.description": "एक हल्का macOS मेन्यू बार ऐप जो आपको ज़रूरी चीज़ों से अपडेट रखता है — डेवलपर समाचार, सोशल फ़ीड, अलर्ट, और बहुत कुछ।",
  "hero.tagline": "कोई भटकाव नहीं, कोई ओवरलोड नहीं।",
  "hero.download": "Get on Mac App Store",
  "hero.comingSoon": "जल्द आ रहा है",
  "hero.browseSources": "सोर्स देखें",

  // App Preview
  "appPreview.title": "इसे काम करते देखें",
  "appPreview.subtitle": "आपकी सभी ज़रूरी जानकारी, मेन्यू बार से बस एक नज़र दूर।",

  // Features section
  "features.title": "आपका मेन्यू बार, असीमित संभावनाएं",
  "features.subtitle": "सिर्फ़ एक सूचना एग्रीगेटर नहीं — आपके Mac के लिए एक प्रोग्रामेबल अवेयरनेस लेयर।",
  "features.browseSources": "सोर्स देखें",
  "features.communitySources.title": "हर चीज़ के लिए सोर्स",
  "features.communitySources.description": "समाचार, वित्त, डेवलपर टूल्स और भी बहुत कुछ — सोर्स स्टोर से इंस्टॉल के लिए तैयार पूर्व-निर्मित सोर्स।",
  "features.aiCreate.title": "AI से सोर्स बनाएं",
  "features.aiCreate.description": "अपने AI कोडिंग असिस्टेंट में Glanceway स्किल जोड़ें, बताएं कि आपको कौन सा डेटा चाहिए और इंपोर्ट के लिए तैयार सोर्स पाएं।",
  "features.aiCreate.link": "स्किल प्राप्त करें",
  "features.aiCreate.prompt1": "Hacker News की टॉप स्टोरीज़ दिखाने वाला सोर्स बनाओ",
  "features.aiCreate.prompt2": "मैं मेन्यू बार में बिटकॉइन मूल्य अपडेट देखना चाहता हूं",
  "features.aiCreate.prompt3": "मेरी कंपनी के स्टेटस पेज API के लिए एक सोर्स बनाओ",
  "features.aiCreate.step1": "Glanceway स्किल डाउनलोड करें",
  "features.aiCreate.step2": "Claude Code / Cursor / Windsurf में जोड़ें",
  "features.aiCreate.step3": "बताएं आप क्या चाहते हैं — जनरेट की गई .gwsrc फ़ाइल इंपोर्ट करें",
  "features.aiReading.title": "AI पठन और सारांश",
  "features.aiReading.description": "Glanceway MCP सर्वर इंस्टॉल करें ताकि आपका AI असिस्टेंट सोर्स ब्राउज़ कर सके, आइटम पढ़ सके और सारांश बना सके।",
  "features.aiReading.link": "MCP सर्वर इंस्टॉल करें",
  "features.aiReading.chatUser": "Summarize unread Hacker News items in Glanceway.",
  "features.aiReading.chatStatus": "Used Glanceway integration, used a tool",
  "features.aiReading.chatResponse": "Here's a summary of your unread Hacker News feed, grouped by theme:<br/><br/><b>Top Stories (by points)</b><br/>The biggest discussion today is a Mastodon post asking whether to walk or drive 50 meters to a car wash — a humorous AI overthinking scenario that racked up 968 points and 621 comments...",
  "features.rss.title": "RSS समर्थन",
  "features.rss.description": "नेटिव RSS/Atom समर्थन। कोई भी फ़ीड URL पेस्ट करें या RSSHub से हज़ारों फ़ीड्स एक्सेस करें।",
  "features.rss.linkRsshub": "RSSHub खोजें",

  // CTA
  "cta.title": "अपडेट रहने के लिए तैयार हैं?",
  "cta.description": "Glanceway डाउनलोड करें और अपने मेन्यू बार को एक निजी सूचना केंद्र में बदलें।",

  // Sources section
  "sources.title": "सोर्स",
  "sources.subtitle": "समुदाय द्वारा बनाए गए सोर्स। एक क्लिक में इंस्टॉल करें।",
  "sources.pageTitle": "सोर्स",
  "sources.pageSubtitle": "Glanceway के लिए समुदाय द्वारा बनाए गए सोर्स ब्राउज़ करें और इंस्टॉल करें।",
  "sources.rssNote": "RSS फ़ीड URL सीधे इंपोर्ट करने का भी समर्थन करता है। हज़ारों रूट्स खोजें",
  "sources.submitSource": "सोर्स सबमिट करें",
  "sources.buildSource": "सोर्स बनाएं",
  "sources.emptyTitle": "इस श्रेणी में अभी कोई सोर्स नहीं है",
  "sources.emptySubtitle": "पहला सोर्स बनाने वाले बनें!",

  // Categories
  "category.All": "सभी",
  "category.Developer": "डेवलपर",
  "category.News": "समाचार",
  "category.Social": "सोशल",
  "category.Finance": "वित्त",
  "category.Entertainment": "मनोरंजन",
  "category.Productivity": "उत्पादकता",
  "category.Other": "अन्य",

  // Source detail
  "detail.allSources": "सभी सोर्स",
  "detail.install": "Glanceway में इंस्टॉल करें",
  "detail.download": "डाउनलोड",
  "detail.configuration": "कॉन्फ़िगरेशन",
  "detail.sourceCode": "सोर्स कोड",
  "detail.by": "द्वारा",

  // Config table headers
  "config.name": "नाम",
  "config.key": "कुंजी",
  "config.type": "प्रकार",
  "config.required": "आवश्यक",
  "config.default": "डिफ़ॉल्ट",
  "config.description": "विवरण",
  "config.yes": "हाँ",
  "config.no": "नहीं",

  // Nav
  "nav.sources": "सोर्स",

  // Footer
  "footer.copyright": "© {year} Glanceway",

  // Language switcher
  "language.label": "भाषा",
};

export default hi;
