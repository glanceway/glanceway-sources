module.exports = async (api) => {
  const token = api.config.get("GITHUB_TOKEN");
  const repository = api.config.get("REPOSITORY");

  async function fetchData() {
    const url = repository
      ? `https://api.github.com/repos/${repository}/notifications?per_page=100`
      : "https://api.github.com/notifications?per_page=100";

    const response = await api.fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok || !response.json) {
      throw new Error(
        `Failed to fetch GitHub notifications (HTTP ${response.status})`,
      );
    }

    const items = response.json
      .map((item) => {
        const itemUrl = item.subject.url
          ? item.subject.url
              .replace("api.github.com/repos", "github.com")
              .replace("/pulls/", "/pull/")
              .replace("/issues/", "/issues/")
          : null;

        if (!itemUrl) {
          return null;
        }

        return {
          id: item.id,
          title: item.subject.title,
          subtitle: item.repository.full_name,
          url: itemUrl,
          timestamp: item.updated_at,
          notify: true,
        };
      })
      .filter(Boolean);

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
