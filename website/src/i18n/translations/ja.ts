import type { TranslationKey } from "./en";

const ja: Record<TranslationKey, string> = {
  // Hero
  "hero.title": "すべてを一目で",
  "hero.description": "macOS メニューバーに常駐する軽量アプリ。Hacker News、GitHub、Reddit、RSS フィード、株価、暗号資産など、気になる情報をひと目で確認できます。",
  "hero.tagline": "邪魔しない、溢れさせない。",
  "hero.download": "Get on Mac App Store",
  "hero.comingSoon": "近日公開",
  "hero.browseSources": "ソースを探す",

  // App Preview
  "appPreview.title": "実際に見てみよう",
  "appPreview.subtitle": "あなたが気になるすべてが、メニューバーから一目で。",

  // Features section
  "features.title": "メニューバーに、無限の可能性",
  "features.subtitle": "単なる情報アグリゲーターではなく、Mac のためのプログラマブルな情報レイヤー。",
  "features.browseSources": "ソースを探す",
  "features.communitySources.title": "あらゆる情報ソース",
  "features.communitySources.description": "ニュース、金融、開発者ツールなど——ソースストアからワンクリックでインストールできるソースが揃っています。",
  "features.aiCreate.title": "AI でソースを作成",
  "features.aiCreate.description": "Glanceway スキルを AI アシスタントに追加し、必要なデータを説明するだけで、インポート可能なソースが生成されます。",
  "features.aiCreate.link": "スキルを取得",
  "features.aiCreate.linkDocs": "Skill File",
  "features.aiCreate.linkCli": "CLI",
  "features.aiCreate.prompt1": "Hacker News の人気記事を表示するソースを作成して",
  "features.aiCreate.prompt2": "メニューバーでビットコインの価格更新を見たい",
  "features.aiCreate.prompt3": "会社のステータスページ API 用のソースを作って",
  "features.aiCreate.step1": "AI アシスタントに Glanceway スキルを追加",
  "features.aiCreate.codeCommand": "npx skills add glanceway/skills",
  "features.aiCreate.step2": "欲しいデータを説明",
  "features.aiCreate.step3": "生成された .gwsrc ファイルを Glanceway にインポート",
  "features.aiReading.title": "AI 閲覧と要約",
  "features.aiReading.description": "Glanceway MCP サーバーをインストールして、AI アシスタントでソースの閲覧、アイテムの読み取り、要約の生成ができます。",
  "features.aiReading.linkDesktop": "Claude Desktop",
  "features.aiReading.linkCode": "Claude Code",
  "features.aiReading.codeCommand": "claude mcp add glanceway -- npx -y glanceway-mcp",
  "features.aiReading.chatUser": "Summarize unread Hacker News items in Glanceway.",
  "features.aiReading.chatStatus": "Used Glanceway integration, used a tool",
  "features.aiReading.chatResponse": "Here's a summary of your unread Hacker News feed, grouped by theme:<br/><br/><b>Top Stories (by points)</b><br/>The biggest discussion today is a Mastodon post asking whether to walk or drive 50 meters to a car wash — a humorous AI overthinking scenario that racked up 968 points and 621 comments...",
  "features.rss.title": "RSS サポート",
  "features.rss.description": "ネイティブ RSS/Atom サポート。フィード URL を貼り付けるか、RSSHub / rss.app で数千のフィードにアクセス。",
  "features.rss.linkRsshub": "RSSHub を探索",
  "features.rss.linkRssApp": "rss.app を探索",

  // CTA
  "cta.title": "最新情報を逃さない準備はできましたか？",
  "cta.description": "Glanceway をダウンロードして、メニューバーをパーソナル情報ハブに。",

  // Sources section
  "sources.title": "ソース",
  "sources.subtitle": "コミュニティが作成したソース。ワンクリックでインストール。",
  "sources.pageTitle": "ソース",
  "sources.pageSubtitle": "コミュニティが作成した Glanceway のソースを探してインストール。Hacker News、GitHub Trending、Reddit、Product Hunt、株価、暗号資産、RSS など。",
  "sources.rssNote": "RSS フィード URL の直接インポートにも対応しています。以下のプラットフォームで数千のルートを探索できます",
  "sources.submitSource": "ソースを投稿",
  "sources.buildSource": "ソースを作成",
  "sources.emptyTitle": "このカテゴリにはまだソースがありません",
  "sources.emptySubtitle": "最初の作成者になりましょう！",

  // Categories
  "category.All": "すべて",
  "category.Developer": "開発者",
  "category.News": "ニュース",
  "category.Social": "ソーシャル",
  "category.Finance": "ファイナンス",
  "category.Entertainment": "エンタメ",
  "category.Productivity": "仕事効率化",
  "category.Other": "その他",

  // Source detail
  "detail.allSources": "すべてのソース",
  "detail.install": "Glanceway にインストール",
  "detail.download": "ダウンロード",
  "detail.configuration": "設定項目",
  "detail.sourceCode": "ソースコード",
  "detail.by": "作成者",

  // Config table headers
  "config.name": "名前",
  "config.key": "キー",
  "config.type": "タイプ",
  "config.required": "必須",
  "config.default": "デフォルト",
  "config.description": "説明",
  "config.yes": "はい",
  "config.no": "いいえ",

  // Nav
  "nav.sources": "ソース",

  // Footer
  "footer.copyright": "© {year} Glanceway",

  // Language switcher
  "language.label": "言語",

  // SEO
  "seo.homeTitle": "Glanceway — メニューバー情報ハブ | RSS・ニュース・カスタムフィード",
  "seo.keywords": "macOS メニューバー,RSS リーダー,ニュース,株価,仮想通貨,GitHub,開発者,ダッシュボード,通知,Qiita,情報収集,テック,ニュースアプリ",
};

export default ja;
