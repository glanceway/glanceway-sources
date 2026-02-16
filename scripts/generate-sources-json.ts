import * as fs from "fs";
import * as path from "path";
import { parse as parseYaml } from "yaml";

const SOURCES_DIR = path.join(process.cwd(), "sources");
const DIST_DIR = path.join(process.cwd(), "dist");
const OUTPUT_PATH = path.join(process.cwd(), "sources.json");

// GitHub repository info - update these for your repo
const GITHUB_REPO = "glanceway/glanceway-sources";
const GITHUB_BRANCH = "master";

interface SourceVersion {
  version: string;
  download_url: string;
  changelog?: string;
}

interface SourceEntry {
  id: string;
  name: string;
  description: string;
  author: string;
  author_url?: string;
  category: string;
  tags: string[];
  type: "js" | "yaml";
  latest_version: string;
  source_url: string;
  versions: SourceVersion[];
  spec?: number;
  min_app_version?: string;
}

interface SourcesJson {
  schema_version: number;
  updated_at: string;
  sources: SourceEntry[];
}

function getVersionsFromDist(author: string, sourceName: string): string[] {
  const distPath = path.join(DIST_DIR, author, sourceName);

  if (!fs.existsSync(distPath)) {
    return [];
  }

  const files = fs.readdirSync(distPath);
  const versions: string[] = [];

  for (const file of files) {
    // Match version patterns like "1.0.0.gwsrc"
    const match = file.match(/^(\d+\.\d+\.\d+)\.gwsrc$/);
    if (match) {
      versions.push(match[1]);
    }
  }

  // Sort versions in descending order (newest first)
  return versions.sort((a, b) => {
    const aParts = a.split(".").map(Number);
    const bParts = b.split(".").map(Number);
    for (let i = 0; i < 3; i++) {
      if (aParts[i] !== bParts[i]) {
        return bParts[i] - aParts[i];
      }
    }
    return 0;
  });
}

function scanSources(): SourceEntry[] {
  const sources: SourceEntry[] = [];

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
            const sourceId = `${namespace}/${entry}`;
            const versions = getVersionsFromDist(namespace, entry);

            if (versions.length === 0) {
              console.log(`  ⚠️  No built versions for ${sourceId}, skipping`);
              continue;
            }

            const sourceVersions: SourceVersion[] = versions.map((version) => ({
              version,
              download_url: `https://github.com/${GITHUB_REPO}/raw/refs/heads/${GITHUB_BRANCH}/dist/${namespace}/${entry}/${version}.gwsrc`,
              changelog:
                version === manifest.version ? manifest.changelog : undefined,
            }));

            const jsEntry: SourceEntry = {
              id: sourceId,
              name: manifest.name || entry,
              description: manifest.description || "",
              author: manifest.author || namespace,
              author_url: manifest.author_url,
              category: manifest.category || "Other",
              tags: manifest.tags || [],
              type: "js",
              latest_version: versions[0],
              source_url: `https://github.com/${GITHUB_REPO}/tree/${GITHUB_BRANCH}/sources/${namespace}/${entry}`,
              versions: sourceVersions,
            };
            if (manifest.spec != null) jsEntry.spec = manifest.spec;
            if (manifest.min_app_version != null)
              jsEntry.min_app_version = manifest.min_app_version;
            sources.push(jsEntry);
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
          const sourceId = `${namespace}/${sourceName}`;
          const versions = getVersionsFromDist(namespace, sourceName);

          if (versions.length === 0) {
            console.log(`  ⚠️  No built versions for ${sourceId}, skipping`);
            continue;
          }

          const sourceVersions: SourceVersion[] = versions.map((version) => ({
            version,
            download_url: `https://github.com/${GITHUB_REPO}/raw/refs/heads/${GITHUB_BRANCH}/dist/${namespace}/${sourceName}/${version}.gwsrc`,
            changelog:
              version === manifest.version ? manifest.changelog : undefined,
          }));

          const yamlEntry: SourceEntry = {
            id: sourceId,
            name: manifest.name || sourceName,
            description: manifest.description || "",
            author: manifest.author || namespace,
            author_url: manifest.author_url,
            category: manifest.category || "Other",
            tags: manifest.tags || [],
            type: "yaml",
            latest_version: versions[0],
            source_url: `https://github.com/${GITHUB_REPO}/tree/${GITHUB_BRANCH}/sources/${namespace}/${entry}`,
            versions: sourceVersions,
          };
          if (manifest.spec != null) yamlEntry.spec = manifest.spec;
          if (manifest.min_app_version != null)
            yamlEntry.min_app_version = manifest.min_app_version;
          sources.push(yamlEntry);
        } catch (error) {
          console.error(`Error parsing ${entryPath}:`, error);
        }
      }
    }
  }

  // Sort sources by name
  sources.sort((a, b) => a.name.localeCompare(b.name));

  return sources;
}

function main() {
  console.log("🔍 Scanning sources...\n");
  const sources = scanSources();

  if (sources.length === 0) {
    console.log("No sources with built versions found");
    return;
  }

  console.log(`\nFound ${sources.length} source(s) with built versions`);

  const output: SourcesJson = {
    schema_version: 1,
    updated_at: new Date().toISOString(),
    sources,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n");
  console.log(`\n✅ Generated sources.json with ${sources.length} source(s)`);
}

main();
