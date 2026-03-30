function parseArticles(html, board) {
  const articles = [];
  const entries = html.split('<div class="r-ent">');
  for (let i = 1; i < entries.length; i++) {
    const entry = entries[i];

    const hrefMatch = entry.match(/href="([^"]+)"/);
    const titleMatch = entry.match(/<a[^>]*>([^<]+)<\/a>/);
    const authorMatch = entry.match(
      /<div class="author">([^<]*)<\/div>/,
    );
    const nrecMatch = entry.match(
      /<span class="hl [^"]*">([^<]+)<\/span>/,
    );
    const dateMatch = entry.match(/<div class="date">\s*([^<]+)\s*<\/div>/);

    if (!hrefMatch || !titleMatch) continue;

    const href = hrefMatch[1];
    const title = titleMatch[1].trim();
    const author = authorMatch ? authorMatch[1].trim() : "";
    const nrec = nrecMatch ? nrecMatch[1].trim() : "0";
    const date = dateMatch ? dateMatch[1].trim() : "";

    const idMatch = href.match(/\/([^/]+)\.html$/);
    const id = idMatch ? idMatch[1] : href;

    articles.push({
      id,
      title,
      subtitle: `${board} · ${nrec} 推 · ${author}${date ? " · " + date : ""}`,
      url: `https://www.ptt.cc${href}`,
    });
  }
  return articles;
}

module.exports = async (api) => {
  const boards = api.config.get("BOARD") ?? [];
  const defaultBoards = [
    "Gossiping",
    "Stock",
    "Tech_Job",
    "NBA",
    "LoL",
    "Baseball",
    "C_Chat",
    "movie",
    "HatePolitics",
    "car",
  ];
  const targetBoards = boards.length > 0 ? boards : defaultBoards;

  async function fetchData() {
    await Promise.allSettled(
      targetBoards.map(async (board) => {
        const res = await api.fetch(
          `https://www.ptt.cc/bbs/${encodeURIComponent(board)}/index.html`,
          {
            headers: { Cookie: "over18=1" },
          },
        );
        if (res.ok && res.text) {
          const articles = parseArticles(res.text, board);
          if (articles.length > 0) {
            api.emit(articles);
          }
        }
      }),
    );
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
