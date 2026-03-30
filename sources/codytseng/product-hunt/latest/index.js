module.exports = async (api) => {
  const token = api.config.get("API_TOKEN");

  async function fetchData() {
    const query = `{
      posts(order: RANKING) {
        edges {
          node {
            id
            name
            tagline
            url
            votesCount
            createdAt
          }
        }
      }
    }`;

    const response = await api.fetch("https://api.producthunt.com/v2/api/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok || !response.json) {
      throw new Error(`Failed to fetch Product Hunt posts (HTTP ${response.status})`);
    }

    api.emit(
      response.json.data.posts.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.name,
        subtitle: edge.node.tagline,
        url: edge.node.url,
        timestamp: edge.node.createdAt,
      })),
    );
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
