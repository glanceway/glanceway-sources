import * as fs from "fs";
import * as path from "path";
import { parse as parseYaml } from "yaml";

// GitHub repository info - update these for your repo
const GITHUB_REPO = "glanceway/glanceway-sources";
const GITHUB_BRANCH = "master";

interface SourceMetadata {
  name: string;
  description: string;
  authorName: string;
  authorUrl?: string;
  category: string;
  tags?: string[];
  type: "JS" | "YAML";
  path: string;
  version: string;
  downloadUrl: string;
  installUrl: string;
}

function parseAuthor(
  author: unknown,
  authorUrl?: unknown,
): { name: string; url?: string } {
  const name = typeof author === "string" ? author : "Unknown";
  const url = typeof authorUrl === "string" ? authorUrl : undefined;
  return { name, url };
}

const SOURCES_DIR = path.join(process.cwd(), "sources");
const DIST_DIR = path.join(process.cwd(), "dist");
const README_PATH = path.join(process.cwd(), "README.md");

function getLatestVersion(author: string, sourceName: string): string | null {
  const distPath = path.join(DIST_DIR, author, sourceName);

  if (!fs.existsSync(distPath)) {
    return null;
  }

  const files = fs.readdirSync(distPath);
  const versions: string[] = [];

  for (const file of files) {
    const match = file.match(/^(\d+\.\d+\.\d+)\.gwsrc$/);
    if (match) {
      versions.push(match[1]);
    }
  }

  if (versions.length === 0) {
    return null;
  }

  // Sort versions in descending order and return the latest
  versions.sort((a, b) => {
    const aParts = a.split(".").map(Number);
    const bParts = b.split(".").map(Number);
    for (let i = 0; i < 3; i++) {
      if (aParts[i] !== bParts[i]) {
        return bParts[i] - aParts[i];
      }
    }
    return 0;
  });

  return versions[0];
}

function scanSources(): SourceMetadata[] {
  const sources: SourceMetadata[] = [];

  if (!fs.existsSync(SOURCES_DIR)) {
    console.log("No sources directory found");
    return sources;
  }

  const namespaces = fs.readdirSync(SOURCES_DIR);

  for (const namespace of namespaces) {
    const namespacePath = path.join(SOURCES_DIR, namespace);
    const stat = fs.statSync(namespacePath);

    if (!stat.isDirectory()) continue;

    const entries = fs.readdirSync(namespacePath);

    for (const entry of entries) {
      const entryPath = path.join(namespacePath, entry);
      const entryStat = fs.statSync(entryPath);

      if (entryStat.isDirectory()) {
        // JS source - look for manifest.yaml
        const manifestPath = path.join(entryPath, "manifest.yaml");
        if (fs.existsSync(manifestPath)) {
          try {
            const content = fs.readFileSync(manifestPath, "utf-8");
            const manifest = parseYaml(content);
            const author = parseAuthor(
              manifest.author || namespace,
              manifest.author_url,
            );

            const latestVersion = getLatestVersion(namespace, entry);
            const version = latestVersion || manifest.version || "1.0.0";
            const downloadUrl = `https://github.com/${GITHUB_REPO}/raw/refs/heads/${GITHUB_BRANCH}/dist/${namespace}/${entry}/latest.gwsrc`;
            const installUrl = `glanceway://install?url=${encodeURIComponent(downloadUrl)}`;

            sources.push({
              name: manifest.name || entry,
              description: manifest.description || "",
              authorName: author.name,
              authorUrl: author.url,
              category: manifest.category || "Other",
              tags: manifest.tags || [],
              type: "JS",
              path: `sources/${namespace}/${entry}`,
              version,
              downloadUrl,
              installUrl,
            });
          } catch (error) {
            console.error(`Error parsing ${manifestPath}:`, error);
          }
        }
      } else if (entry.endsWith(".yaml") || entry.endsWith(".yml")) {
        // YAML source
        try {
          const content = fs.readFileSync(entryPath, "utf-8");
          const manifest = parseYaml(content);
          const sourceName = entry.replace(/\.ya?ml$/, "");
          const author = parseAuthor(
            manifest.author || namespace,
            manifest.author_url,
          );

          const latestVersion = getLatestVersion(namespace, sourceName);
          const version = latestVersion || manifest.version || "1.0.0";
          const downloadUrl = `https://github.com/${GITHUB_REPO}/raw/refs/heads/${GITHUB_BRANCH}/dist/${namespace}/${sourceName}/latest.gwsrc`;
          const installUrl = `glanceway://install?url=${encodeURIComponent(downloadUrl)}`;

          sources.push({
            name: manifest.name || sourceName,
            description: manifest.description || "",
            authorName: author.name,
            authorUrl: author.url,
            category: manifest.category || "Other",
            tags: manifest.tags || [],
            type: "YAML",
            path: `sources/${namespace}/${entry}`,
            version,
            downloadUrl,
            installUrl,
          });
        } catch (error) {
          console.error(`Error parsing ${entryPath}:`, error);
        }
      }
    }
  }

  return sources;
}

function groupByCategory(
  sources: SourceMetadata[],
): Map<string, SourceMetadata[]> {
  const groups = new Map<string, SourceMetadata[]>();

  for (const source of sources) {
    const category = source.category;
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)!.push(source);
  }

  // Sort categories alphabetically, but put "Other" at the end
  const sortedGroups = new Map<string, SourceMetadata[]>();
  const categories = Array.from(groups.keys()).sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });

  for (const category of categories) {
    // Sort sources within category by name
    const categorySources = groups.get(category)!;
    categorySources.sort((a, b) => a.name.localeCompare(b.name));
    sortedGroups.set(category, categorySources);
  }

  return sortedGroups;
}

function generateReadme(sources: SourceMetadata[]): string {
  const grouped = groupByCategory(sources);

  let content = `# Glanceway Sources

Community information sources for [Glanceway](https://glanceway.app).

`;

  if (sources.length === 0) {
    content += `## Sources

No sources available yet. Be the first to contribute!

`;
  } else {
    content += `## Sources

`;

    for (const [category, categorySources] of grouped) {
      content += `### ${category}

`;

      for (const source of categorySources) {
        const description = source.description.replace(/\n/g, " ").trim();
        const authorDisplay = source.authorUrl
          ? `[${source.authorName}](${source.authorUrl})`
          : source.authorName;

        content += `- **[${source.name}](${source.path})** by ${authorDisplay} - ${description} [[Download](${source.downloadUrl})]\n`;
      }

      content += "\n";
    }
  }

  content += `## How to Install

### One-Click Install

Click the "Install" button on the [Glanceway Sources](https://glanceway.app/#sources) website to install a source directly into the app.

### Manual Install

1. Download a source file (**.gwsrc**)
2. Right-click the Glanceway menu bar icon and select **Manage Sources**
3. Click the **+** button and choose **Import from File**
4. Select the downloaded file

## How to Contribute

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on submitting your own information source.

## Development

See the [development documentation](./docs/README.md) to learn how to create sources:

- [YAML Source Development](./docs/yaml-source.md)
- [JS Source Development](./docs/js-source.md)

## License

MIT
`;

  return content;
}

function main() {
  console.log("Scanning sources...");
  const sources = scanSources();
  console.log(`Found ${sources.length} sources`);

  console.log("Generating README...");
  const readme = generateReadme(sources);

  fs.writeFileSync(README_PATH, readme);
  console.log("README.md generated successfully");
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
