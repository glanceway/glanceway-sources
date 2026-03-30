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
  type: "js";
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

function getLatestVersionDir(sourcePath: string): {
  version: string;
  versionPath: string;
} | null {
  const versionDirs = fs
    .readdirSync(sourcePath)
    .filter((d) => fs.statSync(path.join(sourcePath, d)).isDirectory())
    .sort((a, b) => {
      const aParts = a.split(".").map(Number);
      const bParts = b.split(".").map(Number);
      for (let i = 0; i < 3; i++) {
        if ((aParts[i] || 0) !== (bParts[i] || 0)) {
          return (bParts[i] || 0) - (aParts[i] || 0);
        }
      }
      return 0;
    });

  if (versionDirs.length === 0) return null;

  return {
    version: versionDirs[0],
    versionPath: path.join(sourcePath, versionDirs[0]),
  };
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
    if (!fs.statSync(namespacePath).isDirectory()) continue;

    const sourceNames = fs.readdirSync(namespacePath);

    for (const sourceName of sourceNames) {
      const sourcePath = path.join(namespacePath, sourceName);
      if (!fs.statSync(sourcePath).isDirectory()) continue;

      const latest = getLatestVersionDir(sourcePath);
      if (!latest) continue;

      const sourceId = `${namespace}/${sourceName}`;
      const versions = getVersionsFromDist(namespace, sourceName);

      if (versions.length === 0) {
        console.log(`  ⚠️  No built versions for ${sourceId}, skipping`);
        continue;
      }

      const manifestPath = path.join(latest.versionPath, "manifest.yaml");
      if (!fs.existsSync(manifestPath)) continue;

      try {
        const content = fs.readFileSync(manifestPath, "utf-8");
        const manifest = parseYaml(content);

        const sourceVersions: SourceVersion[] = versions.map((version) => ({
          version,
          download_url: `https://github.com/${GITHUB_REPO}/raw/refs/heads/${GITHUB_BRANCH}/dist/${namespace}/${sourceName}/${version === latest.version ? "latest" : version}.gwsrc`,
          changelog:
            version === manifest.version ? manifest.changelog : undefined,
        }));

        const entry: SourceEntry = {
          id: sourceId,
          name: manifest.name || sourceName,
          description: manifest.description || "",
          author: manifest.author || namespace,
          author_url: manifest.author_url,
          category: manifest.category || "Other",
          tags: manifest.tags || [],
          type: "js",
          latest_version: versions[0],
          source_url: `https://github.com/${GITHUB_REPO}/tree/${GITHUB_BRANCH}/sources/${namespace}/${sourceName}`,
          versions: sourceVersions,
        };
        if (manifest.spec != null) entry.spec = manifest.spec;
        if (manifest.min_app_version != null)
          entry.min_app_version = manifest.min_app_version;
        sources.push(entry);
      } catch (error) {
        console.error(`Error parsing ${manifestPath}:`, error);
      }
    }
  }

  // Sort sources by name
  sources.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

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
