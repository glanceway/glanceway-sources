import type { TranslationKey } from "./en";

const ko: Record<TranslationKey, string> = {
  // Hero
  "hero.title": "한눈에 모든 것을",
  "hero.description": "Hacker News, GitHub, Reddit, RSS 피드, 주식 시세, 암호화폐 등을 한눈에 볼 수 있는 가벼운 macOS 메뉴 바 앱입니다.",
  "hero.tagline": "방해 없이, 부담 없이.",
  "hero.download": "Get on Mac App Store",
  "hero.comingSoon": "곧 출시",
  "hero.browseSources": "소스 둘러보기",

  // App Preview
  "appPreview.title": "직접 확인해 보세요",
  "appPreview.subtitle": "관심 있는 모든 것을 메뉴 바에서 한눈에.",

  // Features section
  "features.title": "메뉴 바에 무한한 가능성을",
  "features.subtitle": "단순한 정보 수집기가 아닌, Mac을 위한 프로그래밍 가능한 인식 레이어.",
  "features.browseSources": "소스 둘러보기",
  "features.communitySources.title": "모든 것을 위한 소스",
  "features.communitySources.description": "뉴스, 금융, 개발자 도구 등 — 소스 스토어에서 바로 설치할 수 있는 사전 구축 소스가 준비되어 있습니다.",
  "features.aiCreate.title": "AI로 소스 만들기",
  "features.aiCreate.description": "AI 어시스턴트에 Glanceway 스킬을 추가하고 원하는 데이터를 설명하면, 바로 가져올 수 있는 소스를 받을 수 있습니다.",
  "features.aiCreate.link": "스킬 받기",
  "features.aiCreate.linkDocs": "Skill File",
  "features.aiCreate.linkCli": "CLI",
  "features.aiCreate.prompt1": "Hacker News 인기 글을 보여주는 소스를 만들어줘",
  "features.aiCreate.prompt2": "메뉴 바에서 비트코인 가격 업데이트를 보고 싶어",
  "features.aiCreate.prompt3": "우리 회사 상태 페이지 API용 소스를 만들어줘",
  "features.aiCreate.step1": "AI 어시스턴트에 Glanceway 스킬 추가",
  "features.aiCreate.codeCommand": "npx skills add glanceway/skills",
  "features.aiCreate.step2": "원하는 데이터를 설명",
  "features.aiCreate.step3": "생성된 .gwsrc 파일을 Glanceway에 가져오기",
  "features.aiReading.title": "AI 읽기 및 요약",
  "features.aiReading.description": "Glanceway MCP 서버를 설치하여 AI 어시스턴트로 소스를 탐색하고, 항목을 읽고, 요약을 생성하세요.",
  "features.aiReading.linkDesktop": "Claude Desktop",
  "features.aiReading.linkCode": "Claude Code",
  "features.aiReading.codeCommand": "claude mcp add glanceway -- npx -y glanceway-mcp",
  "features.aiReading.chatUser": "Summarize unread Hacker News items in Glanceway.",
  "features.aiReading.chatStatus": "Used Glanceway integration, used a tool",
  "features.aiReading.chatResponse": "Here's a summary of your unread Hacker News feed, grouped by theme:<br/><br/><b>Top Stories (by points)</b><br/>The biggest discussion today is a Mastodon post asking whether to walk or drive 50 meters to a car wash — a humorous AI overthinking scenario that racked up 968 points and 621 comments...",
  "features.rss.title": "RSS 지원",
  "features.rss.description": "네이티브 RSS/Atom 지원. 피드 URL을 붙여넣거나 RSSHub / rss.app을 사용해 수천 개의 피드에 접근하세요.",
  "features.rss.linkRsshub": "RSSHub 탐색",
  "features.rss.linkRssApp": "rss.app 탐색",

  // CTA
  "cta.title": "최신 정보를 놓치고 싶지 않으신가요?",
  "cta.description": "Glanceway를 다운로드하고 메뉴 바를 개인 정보 허브로 만드세요.",

  // Sources section
  "sources.title": "소스",
  "sources.subtitle": "커뮤니티가 만든 소스를 클릭 한 번으로 설치하세요.",
  "sources.pageTitle": "소스",
  "sources.pageSubtitle": "커뮤니티가 만든 Glanceway 소스를 탐색하고 설치하세요 — Hacker News, GitHub Trending, Reddit, Product Hunt, 주식 시세, 암호화폐, RSS 등.",
  "sources.rssNote": "RSS 피드 URL을 직접 가져올 수도 있습니다. 다양한 라우트를 확인해 보세요:",
  "sources.submitSource": "소스 제출하기",
  "sources.buildSource": "소스 만들기",
  "sources.emptyTitle": "이 카테고리에는 아직 소스가 없습니다",
  "sources.emptySubtitle": "첫 번째로 만들어 보세요!",

  // Categories
  "category.All": "전체",
  "category.Developer": "개발자",
  "category.News": "뉴스",
  "category.Social": "소셜",
  "category.Finance": "금융",
  "category.Entertainment": "엔터테인먼트",
  "category.Productivity": "생산성",
  "category.Other": "기타",

  // Source detail
  "detail.allSources": "모든 소스",
  "detail.install": "Glanceway에 설치",
  "detail.download": "다운로드",
  "detail.configuration": "설정",
  "detail.sourceCode": "소스 코드",
  "detail.by": "제작자:",

  // Config table headers
  "config.name": "이름",
  "config.key": "키",
  "config.type": "유형",
  "config.required": "필수",
  "config.default": "기본값",
  "config.description": "설명",
  "config.yes": "예",
  "config.no": "아니오",

  // Nav
  "nav.sources": "소스",

  // Footer
  "footer.copyright": "© {year} Glanceway",

  // Language switcher
  "language.label": "언어",

  // SEO
  "seo.homeTitle": "Glanceway — macOS 메뉴 바 정보 허브 | RSS, 뉴스 및 맞춤 피드",
  "seo.sourcesTitle": "Glanceway 소스 — macOS 메뉴 바를 위한 데이터 피드",
  "seo.keywords": "macOS 메뉴 바,RSS 리더,뉴스,주식,암호화폐,GitHub,개발자,대시보드,알림,정보수집,테크,뉴스 앱",
};

export default ko;
