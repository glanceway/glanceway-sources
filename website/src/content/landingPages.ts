export interface FAQ {
  question: string;
  answer: string;
}

export interface LandingSection {
  heading: string;
  body: string[]; // paragraphs
}

export interface LandingPageContent {
  title: string; // <title>, keyword-first
  description: string; // meta description
  h1: string;
  hero: string; // hero paragraph after H1
  sections: LandingSection[];
  faqs: FAQ[];
  relatedSourceIds: string[]; // source ids for internal linking
  categorySlug?: string; // optional category page to link to
  ctaHeading: string;
  ctaBody: string;
}

type LocaleContent = Record<string, LandingPageContent>;

export const landingPages: Record<string, LocaleContent> = {
  "mac-menu-bar-rss-reader": {
    en: {
      title: "Mac menu bar RSS reader — Glanceway",
      description:
        "Read any RSS or Atom feed from your macOS menu bar. Glanceway is a lightweight menu bar RSS reader — paste a feed URL and items refresh on their own.",
      h1: "The Mac menu bar RSS reader, reimagined",
      hero:
        "Glanceway turns your macOS menu bar into a native RSS reader. Paste any RSS or Atom feed URL and the latest items show up in a clean dropdown list — titles, summaries, timestamps, one click to open. No browser tab, no email digest, no \"catch up later\" pile.",
      sections: [
        {
          heading: "Native RSS support — paste a URL and go",
          body: [
            "Glanceway reads RSS/Atom feeds out of the box. Add a feed URL in settings, pick a refresh interval, and the app handles fetching, parsing, de-duplication, and sorting for you. Items stream into your menu bar as soon as they appear in the feed.",
            "Because it lives in the menu bar, there's nothing to open and nothing to dismiss. You glance when you want, read when you have a minute, and ignore the rest. It's the oldest, best content-delivery protocol, back in the form it was always meant to have.",
          ],
        },
        {
          heading: "Thousands of feeds via RSSHub and rss.app",
          body: [
            "Most modern sites no longer expose RSS directly. That's why Glanceway plays well with RSSHub and rss.app — two services that turn almost any website or social feed into a proper RSS URL. Twitter/X accounts, YouTube channels, Substack newsletters, Mastodon timelines, public Telegram channels, GitHub releases — all readable as RSS, all at home in your menu bar.",
            "Browse RSSHub's route catalog, pick what you want, paste the URL into Glanceway, done.",
          ],
        },
        {
          heading: "More than RSS — community sources too",
          body: [
            "If a site doesn't expose RSS (and even RSSHub can't reach it), Glanceway has a second way in: community-built sources. These are small JavaScript or YAML modules that fetch data from any HTTP API or WebSocket and emit items in the same format as RSS. Developers have already built sources for Hacker News, Reddit, GitHub notifications, stock quotes, crypto prices, and more — all installable in one click.",
            "The result: one menu bar app, one consistent reading experience, whether the source is a classic RSS feed or a custom API integration.",
          ],
        },
      ],
      faqs: [
        {
          question: "Does Glanceway support RSS and Atom feeds?",
          answer:
            "Yes. Glanceway has native RSS and Atom support built in. Paste any feed URL in the app settings and items appear in your menu bar automatically.",
        },
        {
          question: "Can I read Twitter, YouTube, or Substack in the menu bar?",
          answer:
            "Yes — via RSSHub or rss.app, which provide RSS feeds for sites that don't expose one directly. Grab the feed URL from their catalog, paste it into Glanceway, and it reads like any other feed.",
        },
        {
          question: "How often does Glanceway refresh RSS feeds?",
          answer:
            "The refresh interval is configurable per source in Glanceway's settings. The app handles fetching, parsing, and de-duplication in the background.",
        },
        {
          question: "Is Glanceway a menu bar app or a full reader?",
          answer:
            "It lives entirely in the menu bar. Click the icon to browse items in a dropdown; click an item to open it. There is no separate window to manage.",
        },
        {
          question: "Is Glanceway free?",
          answer:
            "Yes — Glanceway is free to download. All core features, including native RSS support, the community source store, the AI skill, and the MCP integration, work in the free tier. The free tier caps how many sources you can install at the same time; upgrading to Pro removes that limit.",
        },
      ],
      relatedSourceIds: [
        "codytseng/hacker-news",
        "codytseng/reddit",
        "codytseng/github-trending",
        "codytseng/dev-to",
      ],
      categorySlug: "news",
      ctaHeading: "Ready for a menu bar that reads for you?",
      ctaBody:
        "Install Glanceway, paste your first RSS URL, and turn your macOS menu bar into a quiet, always-on reader.",
    },
  },

  "menu-bar-news-reader-mac": {
    en: {
      title: "Menu bar news reader for Mac — Glanceway",
      description:
        "A macOS menu bar news reader that aggregates financial news, world headlines, breaking updates, and niche feeds into one glance-friendly dropdown.",
      h1: "A news reader that lives in your menu bar",
      hero:
        "Glanceway is a macOS menu bar news reader. It pulls headlines from the sources you pick — financial wires, world events, spaceflight launches, earthquake alerts — and shows them as a compact, glance-friendly list. No tabs, no digests, no notification popups you can't dismiss.",
      sections: [
        {
          heading: "News sources, one click away",
          body: [
            "Every news source is a small installable module. Pick the ones that match what you actually read: Finnhub market headlines, Spaceflight News, Wall Street CN, Jin10 breaking-news wires, CLS Telegraph, Dev.to for developer news. Each source runs on its own refresh schedule, and items are merged into a single sorted list.",
            "When something breaks, it's already in your menu bar. When nothing breaks, nothing distracts you.",
          ],
        },
        {
          heading: "Why a menu bar news reader beats a tab",
          body: [
            "Open a news site and you're negotiating: cookie banner, paywall, autoplay video, three ads, a \"for you\" algorithm. Open your menu bar and you see a clean list of titles and summaries, sorted by time, from the exact sources you trust. That's the whole pitch.",
            "You stay in the app you're already in. You spend 10 seconds instead of 10 minutes. You skim, not doomscroll.",
          ],
        },
        {
          heading: "Pair it with RSS for a complete picture",
          body: [
            "News sources cover the big stuff. For everything else — a favorite newsletter, a niche blog, a company's release feed — paste an RSS URL into Glanceway and it gets read the same way, alongside your news. The app doesn't care whether a feed is RSS, a custom API source, or a WebSocket stream; it all lands in the same menu bar list.",
          ],
        },
      ],
      faqs: [
        {
          question: "What news sources does Glanceway support?",
          answer:
            "Anything installable from the community source store — financial wires, world news, spaceflight, earthquakes, developer news, and more. You can also paste any RSS or Atom URL directly.",
        },
        {
          question: "Can I read Chinese-language finance news?",
          answer:
            "Yes. Wall Street CN (华尔街见闻), Jin10 (金十), and CLS Telegraph (财联社) are all available as sources, each with realtime breaking-news updates.",
        },
        {
          question: "How does Glanceway handle many sources at once?",
          answer:
            "Each source runs independently on its own refresh schedule. Glanceway merges, de-duplicates, and sorts items into a single list so you never see the same story twice.",
        },
        {
          question: "Does it send push notifications?",
          answer:
            "Glanceway is glance-first — items appear in your menu bar for you to read when you want. Notification behavior can be configured per source in the app.",
        },
      ],
      relatedSourceIds: [
        "codytseng/finnhub-news",
        "codytseng/spaceflight-news",
        "codytseng/wallstreetcn",
        "codytseng/jin10",
        "codytseng/cls-telegraph",
        "codytseng/earthquake-usgs",
      ],
      categorySlug: "news",
      ctaHeading: "Read less, learn more",
      ctaBody:
        "Install Glanceway and replace your news-tab doomscroll with a 10-second menu bar glance.",
    },
  },

  "github-notifications-menu-bar": {
    en: {
      title: "GitHub notifications in the Mac menu bar — Glanceway",
      description:
        "See GitHub notifications, PR reviews, issue mentions, and CI failures in your macOS menu bar. Install the GitHub Notifications source in Glanceway.",
      h1: "GitHub notifications in your macOS menu bar",
      hero:
        "Stop chasing the GitHub tab. The GitHub Notifications source for Glanceway streams pull-request reviews, issue mentions, CI failures, and @you pings straight into your macOS menu bar — one glance to triage, one click to open.",
      sections: [
        {
          heading: "Triage PRs and reviews from your menu bar",
          body: [
            "Open the menu bar. Glance at the list. See the three PRs waiting on your review, the one issue you were mentioned in, and the CI failure on your last push. Click the one that matters. Done.",
            "The rest of GitHub can wait. Glanceway doesn't try to be a GitHub client — it gives you the signal layer you actually need, out of your editor's way.",
          ],
        },
        {
          heading: "How the GitHub notifications source works",
          body: [
            "Install the GitHub Notifications source in one click, paste a personal access token with the notifications scope, and pick a refresh interval. Glanceway polls the GitHub API, turns each notification into a menu bar item with title, repo, reason, and timestamp, and opens the right page in your browser when you click it.",
            "For repo discovery, pair it with GitHub Trending (top repos per day/week/language) and you've got a minimal GitHub dashboard that takes zero screen real estate.",
          ],
        },
        {
          heading: "More than GitHub — one place for everything you watch",
          body: [
            "Glanceway is a menu bar feed reader, so GitHub notifications live next to Hacker News, Lobsters, Reddit, your RSS feeds, and your stock ticker. All the feeds that used to live in twenty browser tabs, consolidated into one menu bar dropdown you can ignore until you can't.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do I need a GitHub personal access token?",
          answer:
            "Yes — Glanceway reads notifications through the GitHub API, which requires a token with the notifications scope. The token is stored locally in Glanceway's settings and never leaves your Mac.",
        },
        {
          question: "Does it support GitHub Enterprise?",
          answer:
            "The default source points at github.com. GitHub Enterprise support depends on whether the source exposes a base-URL config field — check the source detail page to see its current options.",
        },
        {
          question: "Can I filter which notifications show up?",
          answer:
            "The source reads whatever the GitHub API returns for your configured notification settings. For finer filtering, tune your GitHub notification subscriptions — Glanceway will reflect whatever the API exposes.",
        },
        {
          question: "What about CI status and deployments?",
          answer:
            "GitHub Actions failures come through as notifications when configured on the repo. Pair with the GitHub Trending source for discovery, and build your own custom source via the Glanceway AI skill if you need a bespoke CI dashboard.",
        },
      ],
      relatedSourceIds: [
        "codytseng/github-notifications",
        "codytseng/github-trending",
        "codytseng/hacker-news",
        "codytseng/lobsters",
      ],
      categorySlug: "developer",
      ctaHeading: "Ship more, chase tabs less",
      ctaBody:
        "Install Glanceway, add the GitHub Notifications source, and give your menu bar the one feed that actually belongs in your workflow.",
    },
  },

  "hacker-news-menu-bar": {
    en: {
      title: "Hacker News in the Mac menu bar — Glanceway",
      description:
        "Read Hacker News top stories from your macOS menu bar with Glanceway. One-click install, auto-refresh, glance-friendly list UI.",
      h1: "Hacker News in your macOS menu bar",
      hero:
        "The Hacker News source for Glanceway puts the HN front page in your Mac menu bar. Top stories, points, comment counts, author, domain — all in a clean dropdown. Click to open, or just skim. The world's best tech news, minus the tab tax.",
      sections: [
        {
          heading: "One source, three ways to read HN",
          body: [
            "The Hacker News source supports front-page stories, newest, and Ask/Show HN streams — pick what you want in the source config. Items refresh on a schedule you control; each one opens the discussion page or the linked article with a click.",
            "If you want a second opinion on the same stories, add the Lobsters source next to it. Both lists sit in the same menu bar dropdown, sorted by time and de-duplicated.",
          ],
        },
        {
          heading: "Why glance-reading beats tab-reading",
          body: [
            "Opening news.ycombinator.com is a commitment: the comments, the rabbit holes, the next story, the next next story. By the time you come up for air, an hour's gone.",
            "A menu bar list changes the math. You see the ten items you'd see on the front page, minus the interaction. You skim, open the one you actually care about, and go back to work. Same content, a tenth of the overhead.",
          ],
        },
        {
          heading: "Pair it with the rest of your dev stack",
          body: [
            "Hacker News in Glanceway is at its best next to GitHub notifications, Lobsters, Reddit /r/programming, dev.to, and an RSS feed or two. The whole developer attention layer, reduced to one menu bar icon.",
          ],
        },
      ],
      faqs: [
        {
          question: "Which Hacker News endpoint does the source use?",
          answer:
            "The source reads from the public Hacker News API. No account or API key is required.",
        },
        {
          question: "Can I see Show HN or Ask HN specifically?",
          answer:
            "Yes — the source config lets you pick the front-page, newest, or Ask/Show stream.",
        },
        {
          question: "Does clicking open the article or the comments?",
          answer:
            "Each item links to the HN discussion page by default; the linked article is one extra click from there. The behavior is controlled by the source implementation.",
        },
        {
          question: "How many stories does it show?",
          answer:
            "As many as the HN API returns for the chosen stream — typically the top 30-ish for the front page. Glanceway displays them in your menu bar sorted by score or time.",
        },
      ],
      relatedSourceIds: [
        "codytseng/hacker-news",
        "codytseng/lobsters",
        "codytseng/reddit",
        "codytseng/dev-to",
      ],
      categorySlug: "developer",
      ctaHeading: "HN without the rabbit hole",
      ctaBody:
        "Install Glanceway, add the Hacker News source, and glance at the front page without losing the afternoon.",
    },
  },

  "reddit-menu-bar": {
    en: {
      title: "Reddit in the Mac menu bar — Glanceway",
      description:
        "Read your favorite subreddits from your macOS menu bar with Glanceway's Reddit source. Configure subreddits, sort, and refresh, all in one click.",
      h1: "Reddit in your macOS menu bar",
      hero:
        "The Reddit source for Glanceway turns any list of subreddits into a menu bar feed. Pick your subs, pick a sort (hot, new, top), and Glanceway streams the latest posts — titles, subreddits, scores, comment counts — into a dropdown you can skim in seconds.",
      sections: [
        {
          heading: "Multi-subreddit, multi-sort",
          body: [
            "The Reddit source takes a comma-separated list of subreddits and a sort order. That means you can watch /r/programming, /r/selfhosted, and /r/MacOS in parallel, all merged into one time-sorted list. Swap the sort to 'top' when you want the week's best, or 'new' when you want realtime.",
            "Items link back to the Reddit discussion page so you can open the threads you actually care about without loading the whole subreddit.",
          ],
        },
        {
          heading: "Why not just open Reddit?",
          body: [
            "Opening reddit.com is a time sink. The home feed, the \"popular\" tab, the \"for you\" recommendations — you came to read one post and thirty minutes later you're arguing about keyboards. A menu bar list forces a different shape: glance, open one, leave.",
            "Because Glanceway is your feed reader for everything, Reddit sits next to Hacker News, your RSS subs, and whatever else you watch. One dropdown, one reading habit.",
          ],
        },
        {
          heading: "Pair with RSS for private subs and filtered views",
          body: [
            "Reddit exposes RSS for individual subreddits and even for specific search/filter URLs. If you want a custom view the built-in source doesn't cover, append .rss to any subreddit URL, paste it into Glanceway's RSS config, and you've got it.",
          ],
        },
      ],
      faqs: [
        {
          question: "Does the Reddit source require a login?",
          answer:
            "No — it reads Reddit's public endpoints, so no Reddit account or OAuth token is required for public subreddits.",
        },
        {
          question: "Can I watch multiple subreddits at once?",
          answer:
            "Yes. The source accepts a comma-separated list of subreddits and fetches them in parallel, then merges the results into one sorted list.",
        },
        {
          question: "Can I sort by hot, new, or top?",
          answer:
            "Yes — the sort order is a config field on the Reddit source.",
        },
        {
          question: "Will this work with private or quarantined subs?",
          answer:
            "The source reads public Reddit endpoints, so private/quarantined subs are not supported by default. For those, use Reddit's own RSS with authentication.",
        },
      ],
      relatedSourceIds: [
        "codytseng/reddit",
        "codytseng/hacker-news",
        "codytseng/product-hunt",
        "codytseng/v2ex",
      ],
      categorySlug: "social",
      ctaHeading: "Subs without the scroll",
      ctaBody:
        "Install Glanceway, add the Reddit source, and fit your subs into the corner of your screen instead of the middle of your day.",
    },
  },

  "crypto-price-menu-bar": {
    en: {
      title: "Crypto price in the Mac menu bar — Glanceway",
      description:
        "Watch Bitcoin, Ethereum, and any crypto price from your macOS menu bar with Glanceway's CoinGecko source. Multi-coin, multi-currency, always on.",
      h1: "Crypto prices in your macOS menu bar",
      hero:
        "The CoinGecko source for Glanceway puts live crypto prices in your Mac menu bar. Bitcoin, Ethereum, Solana, any coin on CoinGecko — pick the list, pick the currency, and watch the market move without opening a single tab.",
      sections: [
        {
          heading: "Any coin, any currency",
          body: [
            "The CoinGecko source accepts a comma-separated list of coin IDs and a display currency. Track five tokens or fifty; display in USD, EUR, JPY, CNY, or any CoinGecko-supported quote currency. Items show name, symbol, price, and 24-hour change, sorted however you prefer.",
            "Refresh interval is configurable per source, so you can run it tight for day-trading or loose for casual watching.",
          ],
        },
        {
          heading: "More than spot prices — pair with news",
          body: [
            "Price without context is just numbers. Pair the CoinGecko source with the Wall Street CN, Jin10, or CLS Telegraph breaking-news sources and you've got prices + narrative in the same menu bar dropdown. When BTC moves 3% in five minutes, you'll see the headline that caused it.",
          ],
        },
        {
          heading: "Why a menu bar ticker beats an exchange tab",
          body: [
            "Keeping Coinbase or Binance open all day is a distraction machine — the whole page is designed to make you trade. A menu bar price strip is the opposite: minimal, out of the way, one click to the exchange if you actually need it.",
            "And because Glanceway is a general-purpose menu bar reader, your crypto prices live next to whatever else you watch: work notifications, news, RSS, whatever. No context switch.",
          ],
        },
      ],
      faqs: [
        {
          question: "Does the CoinGecko source require an API key?",
          answer:
            "CoinGecko's public API is free and doesn't require a key for normal usage. Check the source detail page for any rate-limiting caveats.",
        },
        {
          question: "Which currencies are supported?",
          answer:
            "Any fiat or crypto quote currency supported by CoinGecko — USD, EUR, GBP, JPY, CNY, BTC, ETH, and many more. Pick the one you want in the source config.",
        },
        {
          question: "How many coins can I track at once?",
          answer:
            "The source accepts a comma-separated list of coin IDs. You can track many — the practical limit is API rate limits and menu bar real estate, not the source itself.",
        },
        {
          question: "Does this work for stock prices too?",
          answer:
            "The CoinGecko source is crypto-only. For stocks, use the Stock Price source (US markets) or the CN Stock Price source (Chinese A-shares) — both are installable the same way.",
        },
      ],
      relatedSourceIds: [
        "codytseng/coingecko-crypto",
        "codytseng/stock-price",
        "codytseng/cn-stock-price",
        "codytseng/wallstreetcn",
      ],
      categorySlug: "finance",
      ctaHeading: "Watch the market, not the tab",
      ctaBody:
        "Install Glanceway, add the CoinGecko source, and put BTC, ETH, and your whole bag in the menu bar where they belong.",
    },
  },

  "stock-ticker-menu-bar": {
    en: {
      title: "Stock ticker in the Mac menu bar — Glanceway",
      description:
        "A macOS menu bar stock ticker: live US and Chinese stock quotes, plus breaking financial news, all from Glanceway community sources.",
      h1: "A stock ticker for your Mac menu bar",
      hero:
        "Glanceway turns your macOS menu bar into a live stock ticker. Add the Stock Price source for US markets, the CN Stock Price source for A-shares, and Finnhub for breaking news — all three stream into one dropdown, right next to the clock.",
      sections: [
        {
          heading: "US and Chinese markets, same menu bar",
          body: [
            "The Stock Price source covers US-listed equities: AAPL, MSFT, TSLA, whatever tickers you follow. Add them as a comma-separated list, pick a refresh interval, and Glanceway streams price, change, and percent move into the menu bar.",
            "For Chinese A-shares and Hong Kong listings, the CN Stock Price source does the same thing against the Chinese market data endpoints. Both can run in parallel — watch your US tech basket and your 沪深300 at the same time.",
          ],
        },
        {
          heading: "Prices plus the news that moves them",
          body: [
            "A ticker alone answers \"what,\" not \"why.\" Pair Stock Price with Finnhub News for US market headlines, or with Wall Street CN / Jin10 / CLS Telegraph for the Chinese breaking-news wires that actually move A-shares. All the signals you'd normally juggle across three tabs, in one menu bar list.",
          ],
        },
        {
          heading: "Built to stay out of your way",
          body: [
            "Glanceway is glance-first by design: click the icon, scan the list, click the one row that matters. You're never pulled into an app — the menu bar is just a surface for the signal, not an environment you get stuck in. That's the whole difference between a \"stock app\" and a ticker.",
          ],
        },
      ],
      faqs: [
        {
          question: "Which markets does the Stock Price source cover?",
          answer:
            "The default Stock Price source targets US markets. For Chinese A-shares and HK listings, use the dedicated CN Stock Price source — both are community-installable.",
        },
        {
          question: "Can I watch multiple tickers?",
          answer:
            "Yes. Both stock sources accept a comma-separated list of ticker symbols and fetch them in parallel.",
        },
        {
          question: "How fresh are the quotes?",
          answer:
            "Refresh interval is configurable per source. The actual data latency depends on the upstream provider — read each source's detail page for specifics.",
        },
        {
          question: "Does this replace a real trading app?",
          answer:
            "No. Glanceway is a glance layer — it shows prices and news but doesn't place trades. Use it alongside your broker app, not instead of it.",
        },
      ],
      relatedSourceIds: [
        "codytseng/stock-price",
        "codytseng/cn-stock-price",
        "codytseng/finnhub-news",
        "codytseng/wallstreetcn",
        "codytseng/jin10",
      ],
      categorySlug: "finance",
      ctaHeading: "Your menu bar, your ticker",
      ctaBody:
        "Install Glanceway, add your tickers, and watch the market without opening a single trading app.",
    },
  },

  "best-mac-menu-bar-apps-2026": {
    en: {
      title: "Best Mac menu bar apps for 2026 — a glance-first guide",
      description:
        "What makes a menu bar app worth installing in 2026? A look at the category, what to avoid, and why glance-first information aggregators are the sweet spot.",
      h1: "The best Mac menu bar apps for 2026",
      hero:
        "Your macOS menu bar is the most valuable pixel real estate you own. It's always visible, it survives every fullscreen app, and it's one click from anything. So which apps actually deserve a spot there in 2026? Here's how we think about it — and where Glanceway fits.",
      sections: [
        {
          heading: "Three kinds of menu bar apps",
          body: [
            "Menu bar apps tend to fall into three buckets. System utilities (iStat Menus, Bartender, Rectangle) extend the OS itself — system stats, window management, icon grouping. Single-purpose widgets (Itsycal, One Thing, Menu Bar Calendar) do one small thing and do it well. And information aggregators — the youngest category — turn the menu bar into a glance-first feed reader.",
            "The first two are solved problems; most people already have favorites. The third category is where the interesting work is happening in 2026, and it's where Glanceway plays.",
          ],
        },
        {
          heading: "What to look for in a menu bar information app",
          body: [
            "A good menu bar reader is glance-first: you click the icon, scan the list, and either act on one item or dismiss the whole dropdown. It should read many sources, not just one. It should respect your attention (no notification bombing). It should stay lightweight — no Electron, no hundreds of MB of RAM.",
            "And critically, it should be extensible. The list of things you want in your menu bar changes over time, and a good app lets you add or remove sources in seconds without uninstalling anything.",
          ],
        },
        {
          heading: "Why Glanceway, specifically",
          body: [
            "Glanceway is a macOS menu bar feed reader built around community-installable sources. It ships with native RSS/Atom support and a source store covering Hacker News, Reddit, GitHub notifications, stock quotes, crypto prices, news wires, and more. Every source is installable in one click, configurable in settings, and automatically refreshed.",
            "If a source you want doesn't exist, you can build one in JavaScript or YAML, or use the Glanceway AI skill to generate one from a natural-language prompt. The whole thing is designed to be the single menu bar app that replaces a folder of one-off utilities.",
          ],
        },
        {
          heading: "What Glanceway is not",
          body: [
            "Glanceway is not a script runner — if you want to pipe arbitrary shell output into your menu bar, xbar and SwiftBar are better fits for that job. It's also not a system stats tool — for CPU, RAM, and network graphs, iStat Menus is still the standard. Glanceway is for information items: news, notifications, prices, feeds. Browseable lists, not single-number readouts.",
          ],
        },
      ],
      faqs: [
        {
          question: "What's the best menu bar app for reading news in 2026?",
          answer:
            "For aggregating many news sources into one glance-friendly list, Glanceway's menu bar news reader is a strong pick — it supports RSS, community news sources, and per-source refresh schedules.",
        },
        {
          question: "What about system stats?",
          answer:
            "iStat Menus remains the default for CPU, GPU, network, temperature, and battery stats. Glanceway doesn't compete in that category.",
        },
        {
          question: "Is there a free menu bar reader?",
          answer:
            "Glanceway is free to download. All core features — RSS, community sources, AI skill, MCP integration — are available in the free tier. The free tier caps how many sources you can install simultaneously; Pro unlocks that limit.",
        },
        {
          question: "How many menu bar apps is too many?",
          answer:
            "Menu bar real estate is finite, especially on MacBooks with notches. The answer we've landed on: one good aggregator plus two or three single-purpose utilities beats ten one-offs. That's the whole argument for Glanceway.",
        },
      ],
      relatedSourceIds: [
        "codytseng/hacker-news",
        "codytseng/github-notifications",
        "codytseng/coingecko-crypto",
        "codytseng/stock-price",
      ],
      ctaHeading: "Rebuild your menu bar around signal, not chrome",
      ctaBody:
        "Install Glanceway, browse the community source store, and keep only the feeds that actually earn their spot.",
    },
  },
};

// ------------------------------------------------------------
// zh (简体中文) landing pages — natively written, not translated.
// Each page is shipped only in zh; slugs don't overlap with en.
// ------------------------------------------------------------

landingPages["v2ex-menubar"] = {
  zh: {
    title: "V2EX 菜单栏阅读器 for Mac — Glanceway",
    description:
      "在 Mac 菜单栏里刷 V2EX 热门主题。Glanceway 提供 V2EX 数据源，一键安装、自动刷新，告别频繁切换浏览器。",
    h1: "把 V2EX 放进你的 Mac 菜单栏",
    hero:
      "Glanceway 的 V2EX 数据源让你在 macOS 菜单栏里直接看 V2EX 最新主题。标题、节点、回复数一目了然，一键点开原帖。不用再为了「看一眼有没有新帖」而专门打开一个浏览器标签。",
    sections: [
      {
        heading: "V2EX 菜单栏的正确打开方式",
        body: [
          "V2EX 是程序员和数字生活爱好者高频光顾的中文社区，但它也是典型的「一不小心就滑走半小时」的网站。把它钉在菜单栏上，问题就变了——点一下图标，扫一眼十条新主题，点开真正有意思的那一条，然后回去写代码。",
          "Glanceway 会按你设定的间隔自动拉取 V2EX，主题同步到菜单栏下拉列表里，按时间排序、自动去重。你的注意力不被动辄几百条评论的帖子绑架，信息流回到你这一边。",
        ],
      },
      {
        heading: "一个菜单栏，装下所有你想看的源",
        body: [
          "Glanceway 不只是 V2EX 阅读器，它是一个通用的菜单栏 feed 聚合器。你可以同时加上 Hacker News、GitHub 通知、A 股行情、华尔街见闻快讯——所有信息都汇总到同一个下拉列表，按时间排序，共用一个「我要看」的动作。",
          "想加新源？从社区源商店一键安装；想要自己造源？用 Glanceway 的 AI skill 一句话生成。菜单栏成了你的个人信息中枢。",
        ],
      },
      {
        heading: "为什么菜单栏比浏览器标签更合适",
        body: [
          "浏览器标签是个「承诺」：一旦打开，就默认你要读完这整个网站。菜单栏是个「瞥一眼」：它只占屏幕最边上的一小块，你点开扫完就关掉，没有心理负担。对 V2EX 这种内容更新快、但单条内容不长的社区来说，这种节奏才刚刚好。",
        ],
      },
    ],
    faqs: [
      {
        question: "V2EX 数据源需要登录吗？",
        answer:
          "不需要。该数据源读取 V2EX 的公开 API，不需要 V2EX 账号或 token。",
      },
      {
        question: "可以自定义刷新间隔吗？",
        answer:
          "可以。Glanceway 的每个数据源都能单独设定刷新间隔，你可以让 V2EX 一分钟拉一次，也可以十分钟拉一次，按自己的节奏来。",
      },
      {
        question: "除了 V2EX 还有哪些中文社区源？",
        answer:
          "目前社区源商店里有华尔街见闻、金十数据、财联社电报、A 股行情等中文源；V2EX 是面向技术社区的代表。如果你想要的平台暂时没有，可以用 AI skill 自己生成。",
      },
      {
        question: "Glanceway 收费吗？",
        answer:
          "Glanceway 下载免费。核心功能（RSS 支持、社区源商店、AI skill、MCP 集成等）在免费版全部可用。免费版唯一的限制是可同时安装的数据源数量，升级到 Pro 即可解锁上限。",
      },
    ],
    relatedSourceIds: [
      "codytseng/v2ex",
      "codytseng/hacker-news",
      "codytseng/github-trending",
      "codytseng/lobsters",
    ],
    categorySlug: "social",
    ctaHeading: "让 V2EX 住进菜单栏",
    ctaBody:
      "安装 Glanceway，添加 V2EX 数据源，把你一天的多次「看一眼 V2EX」动作塞回屏幕角落。",
  },
};

landingPages["a-shares-menubar"] = {
  zh: {
    title: "Mac 菜单栏 A 股行情看盘 — Glanceway",
    description:
      "在 Mac 菜单栏里实时看 A 股、港股、沪深 300 行情。Glanceway 的 CN 股票数据源一键安装，自己挑持仓代码。",
    h1: "Mac 菜单栏 A 股行情看盘工具",
    hero:
      "开着交易所 App 上班容易误操作，关了又错过行情。Glanceway 的中文 A 股数据源把你的自选股实时价格塞进 Mac 菜单栏——现价、涨跌、涨跌幅一行一条，要看一眼就一眼，不需要打开任何 App。",
    sections: [
      {
        heading: "自选股、指数、沪深两市一起看",
        body: [
          "CN 股票数据源接受逗号分隔的股票代码列表——不管是单只个股、几支自选股，还是上证指数、深成指、沪深 300，都能一起跟。每只代码对应菜单栏里的一行，按你想要的方式排序。",
          "搭配美股 Stock Price 数据源一起用，你就能在同一个下拉列表里同时盯 A 股和美股，不用在多个 App 之间切来切去。",
        ],
      },
      {
        heading: "价格要有，新闻也要有",
        body: [
          "光看数字看不出故事。把 A 股行情和华尔街见闻、金十数据、财联社电报等中文财经快讯源一起装上，Glanceway 会把价格变动和引发变动的消息汇总到同一个菜单栏下拉列表。某只票突然跳水的时候，你第一眼看到的就是相关的那条快讯。",
        ],
      },
      {
        heading: "菜单栏看盘，不是另一个炒股 App",
        body: [
          "市面上不缺功能繁复的炒股软件——K 线、分时、资金流向一应俱全，但也正因为如此，它们非常抢注意力。菜单栏看盘的价值恰恰相反：它只回答「现在多少钱、涨了多少」这一个问题，把剩下的时间还给你。真正要下单的时候再打开券商 App，两者分工。",
        ],
      },
    ],
    faqs: [
      {
        question: "支持哪些市场？",
        answer:
          "CN 股票源面向 A 股、港股等中国市场行情；美股请使用单独的 Stock Price 数据源。两者可以并行运行。",
      },
      {
        question: "行情数据有延迟吗？",
        answer:
          "延迟取决于上游数据提供方以及你设定的刷新间隔。具体请查看数据源详情页说明。",
      },
      {
        question: "可以设置持仓代码列表吗？",
        answer:
          "可以。数据源的配置字段接受用逗号分隔的股票代码，把你的自选股全部粘进去即可。",
      },
      {
        question: "能直接下单吗？",
        answer:
          "不能。Glanceway 是一个看一眼的信息层，负责把行情和新闻放进菜单栏，下单请走你的券商 App。",
      },
    ],
    relatedSourceIds: [
      "codytseng/cn-stock-price",
      "codytseng/stock-price",
      "codytseng/wallstreetcn",
      "codytseng/jin10",
      "codytseng/cls-telegraph",
    ],
    categorySlug: "finance",
    ctaHeading: "把行情钉在菜单栏",
    ctaBody:
      "安装 Glanceway，加上中文 A 股数据源和财经快讯源，让你的菜单栏成为最轻的那块看盘屏。",
  },
};

landingPages["china-finance-news-menubar"] = {
  zh: {
    title: "中文财经快讯菜单栏 for Mac — Glanceway",
    description:
      "华尔街见闻、金十数据、财联社电报一起塞进 Mac 菜单栏。Glanceway 多个中文财经快讯源可一键安装，实时聚合显示。",
    h1: "中文财经快讯，全部汇进 Mac 菜单栏",
    hero:
      "Glanceway 支持华尔街见闻、金十数据、财联社电报等中文财经快讯数据源。三个源可以同时运行，按时间排序合并到一个菜单栏下拉列表里——你不用在三个 App 或三个浏览器标签之间来回切换，也不会错过任何一条能动市场的消息。",
    sections: [
      {
        heading: "把三家快讯合在一起看",
        body: [
          "华尔街见闻偏深度和宏观叙事，金十数据擅长实时财经数据点，财联社电报则是 A 股盘口风向标——这三家在中文财经圈各有侧重，也各有不可替代的位置。Glanceway 把它们全部接进菜单栏，按发布时间排序、自动去重，你只要扫一眼就知道「最近有没有大事」。",
          "重要的是，你随时可以增减。只装一家也行，三家都装也行；哪家在某段时间噪音太大就关掉，哪家出了精品就加回来。菜单栏只是一个可配置的信号层。",
        ],
      },
      {
        heading: "快讯配上行情，完整的决策参考",
        body: [
          "快讯只告诉你「发生了什么」，不告诉你「价格怎么动」。把 A 股行情数据源一起装上，你就能在同一个菜单栏下拉里同时看到行情和驱动行情的消息。盘中出现大幅波动的时候，你第一眼看到的不只是数字，还有刚刚引发这波波动的那条电报。",
        ],
      },
      {
        heading: "一个菜单栏，多个信息流",
        body: [
          "Glanceway 不只为财经用户设计。同一个菜单栏里，你可以让财经快讯和 GitHub 通知、Hacker News、自己订阅的 RSS 源并列存在——它们全部以同样的方式呈现：标题、摘要、时间戳、一键打开。信息获取的动作被压缩成「点一下看一眼」。",
        ],
      },
    ],
    faqs: [
      {
        question: "这三个源可以同时运行吗？",
        answer:
          "可以。Glanceway 原生支持多源并行运行，每个源独立刷新、独立配置，最终合并到一个菜单栏下拉列表里。",
      },
      {
        question: "需要账号或付费订阅吗？",
        answer:
          "这些中文财经源读取的是公开电报/快讯内容，不需要任何 App 内的付费订阅。具体请查看每个数据源详情页。",
      },
      {
        question: "推送速度跟得上盘中吗？",
        answer:
          "每个数据源的刷新间隔在 Glanceway 设置里单独可调，最短频率受上游接口速率限制约束。快讯类源一般可以做到接近实时。",
      },
      {
        question: "可以和美股新闻一起用吗？",
        answer:
          "可以。美股相关的 Finnhub News 源与中文快讯源并行运行没有冲突，Glanceway 会统一按时间排序展示。",
      },
    ],
    relatedSourceIds: [
      "codytseng/wallstreetcn",
      "codytseng/jin10",
      "codytseng/cls-telegraph",
      "codytseng/cn-stock-price",
      "codytseng/finnhub-news",
    ],
    categorySlug: "news",
    ctaHeading: "把中文财经圈装进菜单栏",
    ctaBody:
      "安装 Glanceway，添加华尔街见闻、金十、财联社三个源，一个下拉列表看完中文财经圈。",
  },
};

landingPages["rss-reader-menubar"] = {
  zh: {
    title: "Mac 菜单栏 RSS 订阅阅读器 — Glanceway",
    description:
      "把任意 RSS/Atom 源塞进 Mac 菜单栏。Glanceway 原生支持 RSS，也能通过 RSSHub 接入微信公众号、B 站、微博等非 RSS 站点。",
    h1: "Mac 菜单栏里的 RSS 订阅阅读器",
    hero:
      "Glanceway 让你的 macOS 菜单栏变成一个原生的 RSS 阅读器。贴一条 RSS 或 Atom URL，最新文章就会出现在菜单栏的下拉列表里——标题、摘要、时间戳，一键点开。不需要另开浏览器，也不需要专门的阅读器 App。",
    sections: [
      {
        heading: "原生 RSS 支持，贴链接就用",
        body: [
          "Glanceway 内建 RSS/Atom 解析。你只需要在设置里添加订阅地址，选好刷新间隔，剩下的取回、解析、去重、排序都由 App 处理。新文章一出现就自动推到菜单栏里。",
          "因为它住在菜单栏，所以不占任何窗口空间。看的时候点一下，不看的时候它不会闪动提醒你。这才是 RSS 这种古老又高效的内容协议本来该有的样子。",
        ],
      },
      {
        heading: "通过 RSSHub 订阅几乎任何中文网站",
        body: [
          "今天的中文网站里，主动提供 RSS 的已经不多——微信公众号、微博、B 站、知乎、即刻、各类新闻站，都把 RSS 藏起来了。但 RSSHub 几乎把这些站全部重新「RSS 化」了：你在 RSSHub 的路由列表里找到想订阅的栏目，拿到一条 RSS URL，贴进 Glanceway，就能像订阅任何博客一样订阅它们。",
          "公众号更新、B 站 UP 主新投稿、微博某个话题热度、GitHub 某个项目 release、Steam 愿望单降价——只要 RSSHub 覆盖得到，你就能把它们全都塞进菜单栏。",
        ],
      },
      {
        heading: "不只是 RSS——社区数据源同源",
        body: [
          "有些站 RSSHub 也接不了，Glanceway 给你留了第二条路：社区数据源。这是一些小小的 JavaScript 或 YAML 模块，能访问任何 HTTP API 或 WebSocket，按照 RSS 的格式把数据抛给 Glanceway。官方社区源商店已经覆盖了 V2EX、A 股行情、华尔街见闻等多个中文场景，一键安装。",
          "一个 App，一套阅读习惯——不管内容来自 RSS 还是自定义 API，你的菜单栏只有一种使用方式。",
        ],
      },
    ],
    faqs: [
      {
        question: "Glanceway 支持 RSS 2.0 和 Atom 吗？",
        answer:
          "都支持。你只需要把 RSS 或 Atom 的 URL 贴进设置，文章就会自动出现在菜单栏里。",
      },
      {
        question: "可以订阅微信公众号、B 站、微博吗？",
        answer:
          "可以——通过 RSSHub。去 RSSHub 的路由列表找到你想要的栏目，复制生成的 RSS URL，贴进 Glanceway 就行，后面的使用体验和订阅普通博客完全一样。",
      },
      {
        question: "多久刷新一次？",
        answer:
          "每个订阅源的刷新间隔在 Glanceway 设置里单独可调，快的慢的混着用都没问题。",
      },
      {
        question: "是一个菜单栏 App 还是独立阅读器？",
        answer:
          "完整活在菜单栏里。点击图标弹出下拉，点击文章打开原文，没有单独的窗口要管理。",
      },
    ],
    relatedSourceIds: [
      "codytseng/v2ex",
      "codytseng/wallstreetcn",
      "codytseng/hacker-news",
      "codytseng/github-trending",
    ],
    categorySlug: "news",
    ctaHeading: "把你的 RSS 订阅收进菜单栏",
    ctaBody:
      "安装 Glanceway，贴上第一条 RSS URL，让菜单栏成为你一直开着的阅读器。",
  },
};

landingPages["best-mac-menubar-apps-2026"] = {
  zh: {
    title: "2026 年最好用的 Mac 菜单栏 App 推荐 — Glanceway",
    description:
      "2026 年值得放进 Mac 菜单栏的 App 有哪些？本文讨论菜单栏 App 的三大类别，以及什么是一款合格的菜单栏信息聚合器。",
    h1: "2026 年最好用的 Mac 菜单栏 App",
    hero:
      "Mac 菜单栏是你屏幕上最珍贵的几颗像素——永远可见，不被全屏应用遮挡，距离任何操作都只有一次点击。2026 年，哪些 App 配得上住在那儿？奴才按类别聊一聊，然后告诉你 Glanceway 站在其中哪个位置。",
    sections: [
      {
        heading: "菜单栏 App 的三大类",
        body: [
          "大致可以分三类。第一类是系统增强类——iStat Menus、Bartender、Rectangle——它们直接扩展 macOS 本身：系统监控、菜单栏整理、窗口管理。第二类是单一功能小工具——Itsycal、One Thing、Menu Bar Calendar——小而精，一个 App 做一件事做到极致。第三类最新也最有趣：信息聚合器。它把菜单栏变成一个「一眼就能看」的 feed 阅读器。",
          "前两类基本是解决过的问题，大家都有自己的常驻选择。2026 年的看点主要在第三类——Glanceway 正是这一类的代表。",
        ],
      },
      {
        heading: "一款合格的菜单栏信息 App 应该做到什么",
        body: [
          "第一，glance-first——点一下图标、扫一遍列表，要么点进某一条，要么直接关掉。第二，能接多种来源，不是一家网站的专属客户端。第三，尊重注意力——不用红点炸你，不强行推送。第四，轻量——没有 Electron，不吃内存。",
          "还有最关键的一条：可扩展。你想看的东西会随时间变化，好的 App 要让你几秒就能加一个新源或移除一个旧源，而不是卸了装、装了卸。",
        ],
      },
      {
        heading: "为什么是 Glanceway",
        body: [
          "Glanceway 是一个面向社区数据源的 macOS 菜单栏 feed 阅读器。它原生支持 RSS/Atom，同时带一个社区源商店——V2EX、Hacker News、GitHub 通知、A 股行情、华尔街见闻、加密货币价格，全部一键安装，各自独立刷新。",
          "如果你想要的源不存在，你可以用 JavaScript 或 YAML 自己写一个；或者直接用 Glanceway AI skill 一句话生成一个。整个 App 的定位很清楚：成为那个「替你把零碎的小工具都收进菜单栏」的中枢。",
        ],
      },
      {
        heading: "Glanceway 不是什么",
        body: [
          "Glanceway 不是脚本菜单栏工具——如果你想把任意 shell 脚本的输出塞进菜单栏当状态指示器，xbar 和 SwiftBar 更适合你。它也不是系统监控工具——CPU/内存/网络速度的实时图表，iStat Menus 仍然是那个标杆。Glanceway 负责的是「信息条目」：新闻、通知、行情、订阅。可以浏览的列表，而不是单一数字读数。",
        ],
      },
    ],
    faqs: [
      {
        question: "2026 年中文用户看新闻最好的菜单栏 App 是哪个？",
        answer:
          "对于想把多个中文财经/新闻源汇总到一个菜单栏下拉列表的用户，Glanceway 是一个不错的选择——它支持 RSS，也有现成的华尔街见闻、金十、财联社等社区源。",
      },
      {
        question: "系统监控呢？",
        answer:
          "iStat Menus 仍然是 CPU、GPU、网络、温度、电池监控的事实标准，Glanceway 不涉及这个领域。",
      },
      {
        question: "有免费的菜单栏阅读器吗？",
        answer:
          "Glanceway 本身下载免费——RSS、社区源、AI skill、MCP 集成等核心功能在免费版全部可用。免费版唯一的限制是可同时安装的数据源数量，Pro 版解锁这个上限。其他单一功能的菜单栏小工具也大多提供免费版本。",
      },
      {
        question: "菜单栏 App 装多少个合适？",
        answer:
          "菜单栏空间有限，尤其是带刘海的 MacBook 更紧张。奴才的答案是：一个好的聚合器 + 两三个单一功能工具，比十个一次性小工具要好用。",
      },
    ],
    relatedSourceIds: [
      "codytseng/v2ex",
      "codytseng/wallstreetcn",
      "codytseng/cn-stock-price",
      "codytseng/hacker-news",
    ],
    ctaHeading: "把你的菜单栏按「信号」重新装一遍",
    ctaBody:
      "安装 Glanceway，浏览社区源商店，只留下那些真正配得上菜单栏一格的源。",
  },
};

// ------------------------------------------------------------
// zh-tw (繁體中文) landing pages — natively written for 臺灣市場.
// ------------------------------------------------------------

landingPages["ptt-menubar"] = {
  "zh-tw": {
    title: "Mac 選單列 PTT 熱門文章閱讀器 — Glanceway",
    description:
      "在 Mac 選單列裡直接看 PTT 熱門文章。Glanceway 的 PTT 資料源一鍵安裝、自動刷新，看一眼就能掌握鄉民最近在聊什麼。",
    h1: "把 PTT 放進你的 Mac 選單列",
    hero:
      "Glanceway 的 PTT 資料源讓你在 macOS 選單列下拉裡直接看 PTT 熱門文章。標題、看板、推文數一目了然，點一下就進去看原文。不必再為了「看一眼有沒有新文」而專門開瀏覽器分頁。",
    sections: [
      {
        heading: "PTT 選單列，鄉民的正確姿勢",
        body: [
          "PTT 一不小心就容易看掉半個下午——八卦、股票、科技，每個板都有自己的坑。把 PTT 熱門文章釘在選單列上，問題就變了：點一下圖示、掃十筆新貼、只點真的值得看的那一則，然後回去工作。",
          "Glanceway 會按你設定的間隔自動拉取 PTT 熱門，文章同步到選單列下拉裡，依時間排序、自動去重。刷 PTT 的動作被壓縮成幾秒，不再占用整段時間。",
        ],
      },
      {
        heading: "一個選單列，裝下所有你想看的內容",
        body: [
          "Glanceway 不只是 PTT 閱讀器——它是一個通用的選單列 feed 聚合工具。你可以同時加上 Hacker News、GitHub 通知、美股行情、RSS 訂閱，所有內容都會匯到同一個下拉列表裡，依時間排序，共用同一套「我要看」的動作。",
          "想加新的來源？從社群源商店一鍵安裝；想自己造源？用 Glanceway 的 AI skill 一句話生成。選單列成了你的個人資訊中樞。",
        ],
      },
      {
        heading: "為什麼選單列比瀏覽器分頁更適合 PTT",
        body: [
          "瀏覽器分頁是一種「承諾」：一旦打開，就默認你要把整個 PTT 看完。選單列則是「瞥一眼」：它只占螢幕最邊邊一小塊，點開掃完就關掉，沒有心理負擔。對 PTT 這種節奏快、單篇不長的平台來說，這種使用方式剛剛好。",
        ],
      },
    ],
    faqs: [
      {
        question: "PTT 資料源需要登入嗎？",
        answer:
          "不需要。該資料源讀取 PTT 的公開熱門文章列表，不需要 PTT 帳號。",
      },
      {
        question: "可以自訂刷新間隔嗎？",
        answer:
          "可以。Glanceway 每個資料源都能單獨設定刷新間隔，一分鐘、十分鐘都行。",
      },
      {
        question: "支援哪些看板？",
        answer:
          "預設抓取 PTT 熱門看板的熱門文章；具體支援範圍請查看資料源詳情頁。",
      },
      {
        question: "Glanceway 要付費嗎？",
        answer:
          "Glanceway 下載免費。核心功能（RSS 支援、社群源商店、AI skill、MCP 整合等）在免費版全部可用。免費版唯一的限制是可同時安裝的資料源數量，升級到 Pro 即可解鎖上限。",
      },
    ],
    relatedSourceIds: [
      "codytseng/ptt",
      "codytseng/hacker-news",
      "codytseng/reddit",
      "codytseng/v2ex",
    ],
    categorySlug: "social",
    ctaHeading: "把 PTT 收進選單列",
    ctaBody:
      "安裝 Glanceway，加上 PTT 資料源，讓你刷八卦板的動作從「一整個下午」變成「幾秒鐘」。",
  },
  zh: {
    title: "Mac 菜单栏 PTT 热门文章阅读器 — Glanceway",
    description:
      "在 Mac 菜单栏里直接看 PTT 热门文章。Glanceway 的 PTT 数据源一键安装、自动刷新。",
    h1: "把 PTT 放进你的 Mac 菜单栏",
    hero:
      "Glanceway 的 PTT 数据源让你在 macOS 菜单栏下拉里直接看 PTT 热门文章——标题、看板、推文数一目了然，点一下就进去看原文。",
    sections: [
      {
        heading: "PTT 菜单栏阅读",
        body: [
          "把 PTT 热门钉在菜单栏上：点一下图标，扫十条新帖，只点真正值得看的那一条，然后回去工作。Glanceway 按设定间隔自动拉取，自动去重，按时间排序。",
        ],
      },
    ],
    faqs: [
      {
        question: "PTT 数据源需要登录吗？",
        answer: "不需要，读取的是公开热门列表。",
      },
    ],
    relatedSourceIds: [
      "codytseng/ptt",
      "codytseng/v2ex",
      "codytseng/hacker-news",
      "codytseng/reddit",
    ],
    categorySlug: "social",
    ctaHeading: "把 PTT 收进菜单栏",
    ctaBody: "安装 Glanceway，加上 PTT 数据源，菜单栏即 PTT 阅读器。",
  },
};

// rss-reader-menubar already defined above with zh; add zh-tw variant.
landingPages["rss-reader-menubar"]["zh-tw"] = {
  title: "Mac 選單列 RSS 訂閱閱讀器 — Glanceway",
  description:
    "把任何 RSS/Atom 來源塞進 Mac 選單列。Glanceway 原生支援 RSS，也能透過 RSSHub 接入巴哈、Mobile01、YouTube 頻道等非 RSS 站點。",
  h1: "Mac 選單列裡的 RSS 訂閱閱讀器",
  hero:
    "Glanceway 讓你的 macOS 選單列變成一個原生的 RSS 閱讀器。貼一條 RSS 或 Atom URL，最新文章就會出現在選單列下拉裡——標題、摘要、時間戳記，點一下就開。不用另外開瀏覽器，也不用專門的閱讀器 App。",
  sections: [
    {
      heading: "原生 RSS 支援，貼連結就能用",
      body: [
        "Glanceway 內建 RSS/Atom 解析。你只要在設定裡加上訂閱網址，選好刷新間隔，後面的抓取、解析、去重、排序都交給 App 處理。新文章一出就自動推到選單列。",
        "因為它常駐選單列，不占視窗空間。想看的時候點一下，不想看的時候它也不會閃燈提醒你。這才是 RSS 這種古老又高效的內容協議本來該有的樣子。",
      ],
    },
    {
      heading: "透過 RSSHub 訂閱幾乎任何網站",
      body: [
        "今天的網站主動提供 RSS 的已經越來越少——巴哈姆特、Mobile01、YouTube 頻道、IG 用戶、Telegram 頻道，這些全都沒有內建 RSS。但 RSSHub 幾乎把它們都「RSS 化」了：你在 RSSHub 的路由清單裡找到想訂閱的欄目，拿到一條 RSS URL，貼進 Glanceway，就能像訂閱普通部落格一樣訂閱它們。",
      ],
    },
    {
      heading: "不只 RSS——社群資料源同源",
      body: [
        "有些網站連 RSSHub 都接不到，Glanceway 給你留了第二條路：社群資料源。它們是小的 JavaScript 或 YAML 模組，可以去任何 HTTP API 拉資料，再以 RSS 的格式交給 Glanceway。你在同一個選單列下拉裡同時看得到 RSS 訂閱和自訂 API 來源，體驗完全一致。",
      ],
    },
  ],
  faqs: [
    {
      question: "Glanceway 支援 RSS 2.0 和 Atom 嗎？",
      answer:
        "都支援。把 RSS 或 Atom 的 URL 貼進設定，文章就會自動出現在選單列裡。",
    },
    {
      question: "可以訂閱巴哈、Mobile01、YouTube 嗎？",
      answer:
        "可以——透過 RSSHub。去 RSSHub 路由清單找到你要的欄目，複製產生的 RSS URL，貼進 Glanceway 就行，使用體驗和訂閱一般部落格完全一樣。",
    },
    {
      question: "多久刷新一次？",
      answer:
        "每個訂閱源的刷新間隔在 Glanceway 設定裡可以單獨調整，快慢混著用都沒問題。",
    },
    {
      question: "是選單列 App 還是獨立閱讀器？",
      answer:
        "完全住在選單列裡。點圖示彈出下拉，點文章打開原文，沒有另外的視窗要管。",
    },
  ],
  relatedSourceIds: [
    "codytseng/ptt",
    "codytseng/hacker-news",
    "codytseng/github-trending",
    "codytseng/dev-to",
  ],
  categorySlug: "news",
  ctaHeading: "把你的 RSS 訂閱收進選單列",
  ctaBody:
    "安裝 Glanceway，貼上第一條 RSS URL，讓選單列成為你一直開著的閱讀器。",
};

// best-mac-menubar-apps-2026 already defined with zh; add zh-tw variant.
landingPages["best-mac-menubar-apps-2026"]["zh-tw"] = {
  title: "2026 年最好用的 Mac 選單列 App 推薦 — Glanceway",
  description:
    "2026 年值得放進 Mac 選單列的 App 有哪些？本文聊選單列 App 的三大類別，以及什麼才算一款合格的選單列資訊聚合器。",
  h1: "2026 年最好用的 Mac 選單列 App",
  hero:
    "Mac 選單列是你螢幕上最珍貴的那幾顆像素——永遠可見、不被全螢幕 App 遮住、距離任何操作都只有一次點擊。2026 年，哪些 App 配得上住在那兒？奴才按類別聊一聊，然後告訴你 Glanceway 站在其中哪個位置。",
  sections: [
    {
      heading: "選單列 App 的三大類",
      body: [
        "大致分三類。第一類是系統增強——iStat Menus、Bartender、Rectangle——它們直接擴展 macOS 本身：系統監控、選單列整理、視窗管理。第二類是單一功能小工具——Itsycal、One Thing、Menu Bar Calendar——小而精，一個 App 做一件事做到極致。第三類最新也最有意思：資訊聚合器。它把選單列變成一個「瞄一眼就能看」的 feed 閱讀器。",
        "前兩類基本是已經解決的問題，大家都有自己的常駐選擇。2026 年的看點主要在第三類——Glanceway 正是這一類的代表。",
      ],
    },
    {
      heading: "一款合格的選單列資訊 App 應該做到什麼",
      body: [
        "第一，glance-first——點一下圖示、掃一遍清單，要麼點進某一則，要麼直接關掉。第二，能接多種來源，不是某家網站的專屬客戶端。第三，尊重注意力——不用紅點轟炸，不強制推送。第四，輕量——不要 Electron，不吃記憶體。",
        "還有最關鍵的一條：可擴展。你想看的東西會隨時間變化，好的 App 要讓你幾秒就能加一個新的來源或移除一個舊的，而不是裝了卸、卸了裝。",
      ],
    },
    {
      heading: "為什麼選 Glanceway",
      body: [
        "Glanceway 是一款面向社群資料源的 macOS 選單列 feed 閱讀器。它原生支援 RSS/Atom，同時附帶一個社群源商店——PTT、Hacker News、GitHub 通知、美股行情、加密貨幣價格，全部一鍵安裝、各自獨立刷新。",
        "如果你想要的來源不存在，你可以用 JavaScript 或 YAML 自己寫一個；或直接用 Glanceway AI skill 一句話生出一個。整個 App 的定位很清楚：成為那個「把零碎的小工具都收進選單列」的中樞。",
      ],
    },
    {
      heading: "Glanceway 不是什麼",
      body: [
        "Glanceway 不是腳本選單列工具——如果你想把任意 shell 腳本的輸出塞進選單列當狀態指示器，xbar 和 SwiftBar 更適合你。它也不是系統監控工具——CPU／記憶體／網路速度的即時圖表，iStat Menus 仍然是那個標竿。Glanceway 負責的是「資訊條目」：新聞、通知、行情、訂閱。可以瀏覽的清單，而不是單一數字讀數。",
      ],
    },
  ],
  faqs: [
    {
      question: "2026 年臺灣用戶看 PTT 熱門最好的選單列 App 是哪個？",
      answer:
        "想把 PTT 熱門文章塞進選單列，Glanceway 有現成的 PTT 資料源，一鍵安裝就能用。",
    },
    {
      question: "系統監控怎麼辦？",
      answer:
        "iStat Menus 仍然是 CPU、GPU、網路、溫度、電池監控的事實標準，Glanceway 不涉及這一塊。",
    },
    {
      question: "有免費的選單列閱讀器嗎？",
      answer:
        "Glanceway 本身下載免費——RSS、社群資料源、AI skill、MCP 整合等核心功能在免費版全部可用。免費版唯一的限制是可同時安裝的資料源數量，Pro 版解鎖這個上限。其他單一功能的選單列小工具也大多提供免費版本。",
    },
    {
      question: "選單列 App 裝多少個合適？",
      answer:
        "選單列空間有限，尤其是有瀏海的 MacBook 更緊張。奴才的答案是：一個好的聚合器 + 兩三個單一功能工具，比十個一次性小工具要好用。",
    },
  ],
  relatedSourceIds: [
    "codytseng/ptt",
    "codytseng/hacker-news",
    "codytseng/stock-price",
    "codytseng/github-notifications",
  ],
  ctaHeading: "把你的選單列按「信號」重新裝一遍",
  ctaBody:
    "安裝 Glanceway，瀏覽社群源商店，只留下那些真正配得上選單列一格的來源。",
};

export function getLandingPage(
  slug: string,
  locale: string,
): LandingPageContent | undefined {
  const page = landingPages[slug];
  if (!page) return undefined;
  return page[locale] ?? page.en;
}

export const landingPageSlugs = Object.keys(landingPages);
